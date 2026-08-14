// js-v8/battle/skills.js
// 한국사 영웅전 v8 · 스킬 디스패처
// 02_BATTLE_SYSTEM §4 10가지 type:
//   single / aoe_area / multi / heal_single / heal_area
//   buff_def / buff_mov / buff_eva / buff_area / debuff_area / revive / charge

import { executeAttack, executeHeal, executeRevive } from './attack.js';
import { manhattan, calcAttackRange } from './movement.js';

// ─────────────────────────────────────────────
// getSkillRange(caster, skill, map) → { tiles, targeting }
// 대상 후보 타일 (사거리 내, 맵 안)
// ─────────────────────────────────────────────
export function getSkillRange(caster, skill, map) {
  const rng = skill?.rng ?? 1;
  const tiles = [];
  const h = map?.terrain?.length || 0;
  const w = map?.terrain?.[0]?.length || 0;
  for (let dy = -rng; dy <= rng; dy++) {
    for (let dx = -rng; dx <= rng; dx++) {
      const d = Math.abs(dx) + Math.abs(dy);
      if (d > rng) continue;
      const x = caster.x + dx, y = caster.y + dy;
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      if (skill?.targeting?.startsWith('self') && d !== 0 && skill.targeting !== 'self_area') continue;
      tiles.push({ x, y, dist: d });
    }
  }
  return { tiles, targeting: skill?.targeting || 'single' };
}

// ─────────────────────────────────────────────
// getAoeTiles(center, radius, map) — 스킬 중심점 기준 반경
// ─────────────────────────────────────────────
export function getAoeTiles(center, radius, map) {
  const tiles = [];
  const h = map?.terrain?.length || 0;
  const w = map?.terrain?.[0]?.length || 0;
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const d = Math.abs(dx) + Math.abs(dy);
      if (d > radius) continue;
      const x = center.x + dx, y = center.y + dy;
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      tiles.push({ x, y });
    }
  }
  return tiles;
}

// 타일 점유 유닛 찾기
function unitsInTiles(units, tiles) {
  const keys = new Set(tiles.map((t) => `${t.x},${t.y}`));
  return units.filter((u) => u.hp > 0 && keys.has(`${u.x},${u.y}`));
}

// ─────────────────────────────────────────────
// executeSkill(caster, skillId, targets, context)
//   context: { skillDef, map, weather, allUnits, onAnim?, onComplete? }
//   targets: 스킬 타겟 (배열이면 그대로, 단일이면 1개)
// ─────────────────────────────────────────────
export async function executeSkill(caster, skillId, targets, context = {}) {
  const skill = context.skillDef || context.skillsDb?.[skillId];
  if (!skill) {
    console.warn('[skills] unknown skill', skillId);
    context.onComplete?.();
    return { aborted: true };
  }

  // MP 체크
  if ((caster.mp || 0) < (skill.mp || 0)) {
    context.onComplete?.();
    return { aborted: 'no_mp' };
  }

  const type = skill.type;
  const targetArr = Array.isArray(targets) ? targets : [targets].filter(Boolean);

  const result = { skill: skillId, type, hits: [] };

  switch (type) {
    case 'single': {
      for (const t of targetArr) {
        const r = await executeAttack(caster, t, skill, context);
        result.hits.push(r);
      }
      break;
    }
    case 'aoe_area': {
      // 중심 타겟 기준 반경
      const center = targetArr[0];
      if (!center) break;
      const tiles = getAoeTiles(center, skill.rad || 1, context.map);
      const enemies = (context.allUnits || []).filter((u) => u.team !== caster.team);
      const victims = unitsInTiles(enemies, tiles);

      // MP는 한 번만 소모
      if (skill.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
      const skillNoMp = { ...skill, mp: 0 };
      for (const v of victims) {
        const r = await executeAttack(caster, v, skillNoMp, context);
        result.hits.push(r);
      }
      break;
    }
    case 'multi': {
      for (const t of targetArr) {
        const r = await executeAttack(caster, t, skill, context);
        result.hits.push(r);
      }
      break;
    }
    case 'heal_single': {
      for (const t of targetArr) {
        const r = executeHeal(caster, t, skill, context);
        result.hits.push(r);
      }
      break;
    }
    case 'heal_area': {
      const tiles = getAoeTiles(caster, skill.rad || 1, context.map);
      const allies = (context.allUnits || []).filter((u) => u.team === caster.team);
      const healed = unitsInTiles(allies, tiles);
      if (skill.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
      const skillNoMp = { ...skill, mp: 0 };
      for (const h of healed) {
        const r = executeHeal(caster, h, skillNoMp, context);
        result.hits.push(r);
      }
      break;
    }
    case 'buff_def':
    case 'buff_mov':
    case 'buff_eva':
    case 'buff_atk': {
      if (skill.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
      applyBuff(caster, {
        type,
        turns: (skill.duration || 2) + 1,  // 현재 턴 포함
        mod: (skill.pw || 1.0) - 1.0,      // 예: pw=1.5 → +50%
      });
      result.buff = type;
      break;
    }
    case 'buff_area': {
      if (skill.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
      const tiles = getAoeTiles(caster, skill.rad || 1, context.map);
      const allies = (context.allUnits || []).filter((u) => u.team === caster.team);
      const tgts = unitsInTiles(allies, tiles);
      for (const t of tgts) {
        const mods = skill.buff || { atk: 0.3 };
        for (const [stat, val] of Object.entries(mods)) {
          applyBuff(t, { type: `buff_${stat}`, turns: (skill.duration || 3) + 1, mod: val });
        }
      }
      result.buffed = tgts.length;
      break;
    }
    case 'debuff_area': {
      if (skill.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
      const center = targetArr[0] || caster;
      const tiles = getAoeTiles(center, skill.rad || 1, context.map);
      const enemies = (context.allUnits || []).filter((u) => u.team !== caster.team);
      const victims = unitsInTiles(enemies, tiles);

      // 데미지도 있으면 적용
      if (skill.dmg) {
        const skillNoMp = { ...skill, mp: 0, type: 'aoe_area' };
        for (const v of victims) {
          const r = await executeAttack(caster, v, skillNoMp, context);
          result.hits.push(r);
        }
      }
      // 디버프 부착
      const db = skill.debuff;
      if (db) {
        for (const v of victims) {
          applyBuff(v, { type: `debuff_${db.stat}`, turns: (db.duration || 2) + 1, mod: -Math.abs(db.value || 2) });
        }
      }
      break;
    }
    case 'revive': {
      const t = targetArr[0];
      if (t) {
        const r = executeRevive(caster, t, skill, context);
        result.hits.push(r);
      }
      break;
    }
    case 'charge': {
      // 돌진: 단일 대상 + 기절(1턴 행동불가)
      for (const t of targetArr) {
        const r = await executeAttack(caster, t, skill, context);
        if (skill.stun && t.hp > 0) {
          applyBuff(t, { type: 'debuff_stun', turns: 2, mod: 1 });
        }
        result.hits.push(r);
      }
      break;
    }
    default:
      console.warn('[skills] unhandled type', type);
  }

  context.onComplete?.(result);
  return result;
}

// ─────────────────────────────────────────────
// 버프 부착 / 중복 처리
// ─────────────────────────────────────────────
export function applyBuff(unit, buff) {
  if (!unit.buffs) unit.buffs = [];
  // 같은 type 갱신
  const idx = unit.buffs.findIndex((b) => b.type === buff.type);
  if (idx >= 0) unit.buffs[idx] = { ...buff };
  else unit.buffs.push({ ...buff });
}

export function hasBuff(unit, type) {
  return !!(unit.buffs && unit.buffs.some((b) => b.type === type));
}

export function isStunned(unit) {
  return hasBuff(unit, 'debuff_stun');
}
