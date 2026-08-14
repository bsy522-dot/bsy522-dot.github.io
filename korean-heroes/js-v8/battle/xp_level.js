// js-v8/battle/xp_level.js
// 한국사 영웅전 v8 · XP/레벨업 시스템
// 02_BATTLE_SYSTEM §3:
//   XP 100 도달 시 레벨업 → HP+3, ATK+2, DEF+1, MP+2
//   일반타격 +10 / 격파 +50 / 스킬 +15 / 힐 +15 / 반격피격 +5

import { spawnLevelUpParticles } from '../graphics/effects.js';
import { gridToWorld } from '../graphics/terrain.js';

// XP 기준값 (레벨당)
const XP_THRESHOLD = 100;

// 레벨업 스탯 증가
const LVL_GAIN = { mhp: 3, atk: 2, def: 1, mmp: 2 };

// ─────────────────────────────────────────────
// grantXP(unit, amount, context?)
// ─────────────────────────────────────────────
export function grantXP(unit, amount, context = {}) {
  if (!unit || unit.hp <= 0) return 0;
  unit.xp = (unit.xp || 0) + amount;
  unit.level = unit.level || 1;

  let leveled = 0;
  while (unit.xp >= XP_THRESHOLD) {
    unit.xp -= XP_THRESHOLD;
    tryLevelUp(unit, context);
    leveled++;
    if (leveled > 5) break;  // 한 번에 과다 레벨업 방지
  }
  return amount;
}

// ─────────────────────────────────────────────
// tryLevelUp(unit, context)
//   HP+3, ATK+2, DEF+1, MP+2  + 레벨업 이펙트
// ─────────────────────────────────────────────
export function tryLevelUp(unit, context = {}) {
  unit.level = (unit.level || 1) + 1;
  unit.mhp = (unit.mhp || unit.hp) + LVL_GAIN.mhp;
  unit.hp  = Math.min(unit.mhp, unit.hp + LVL_GAIN.mhp);
  unit.atk = (unit.atk || 0) + LVL_GAIN.atk;
  unit.def = (unit.def || 0) + LVL_GAIN.def;
  unit.mmp = (unit.mmp || unit.mp) + LVL_GAIN.mmp;
  unit.mp  = Math.min(unit.mmp, (unit.mp || 0) + LVL_GAIN.mmp);

  // 이펙트
  try {
    if (context.suppressFx) {
      // sim 모드
    } else if (unit.mesh?.position) {
      spawnLevelUpParticles(unit.mesh.position);
    } else if (typeof unit.x === 'number') {
      const w = gridToWorld(unit.x, unit.y);
      spawnLevelUpParticles({ x: w.x, y: 0.5, z: w.z, copy(){return this;} });
    }
  } catch (e) { /* headless/test 환경에선 그냥 패스 */ }

  context.onLevelUp?.(unit);
  return unit.level;
}

// XP 다음 레벨까지 필요량
export function xpToNext(unit) {
  return XP_THRESHOLD - (unit.xp || 0);
}

export { XP_THRESHOLD, LVL_GAIN };
