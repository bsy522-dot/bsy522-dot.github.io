// js-v8/battle/ai.js
// 한국사 영웅전 v8 · 적 AI
// 02_BATTLE_SYSTEM §5:
//   Easy   — 30% 대기
//   Normal — 기본 (최근접 아군 → 사거리 내 공격, 아군 HP<40% 힐 우선)
//   Hard   — 체력 낮은 아군 우선 + 포메이션 유지

import { calcMoveRange, findPath, manhattan } from './movement.js';
import { executeAttack, calcDamage } from './attack.js';
import { executeSkill, isStunned } from './skills.js';

// ─────────────────────────────────────────────
// 아군 타겟 선정
// ─────────────────────────────────────────────
function pickTarget(enemy, allies, difficulty) {
  const alive = allies.filter((a) => a.hp > 0);
  if (!alive.length) return null;

  if (difficulty === 'hard') {
    // 체력 낮은 순 우선
    alive.sort((a, b) => (a.hp / a.mhp) - (b.hp / b.mhp));
    return alive[0];
  }
  // Easy/Normal: 가장 가까운 아군
  alive.sort((a, b) => manhattan(enemy, a) - manhattan(enemy, b));
  return alive[0];
}

// 사거리 내 아군
function targetsInRange(enemy, allies) {
  return allies.filter((a) => a.hp > 0 && manhattan(enemy, a) <= (enemy.rng || 1));
}

// 힐 가능 아군 (HP<40%)
function needsHeal(enemies, thresholdPct = 0.4) {
  return enemies.filter((e) => e.hp > 0 && (e.hp / e.mhp) < thresholdPct);
}

// 이동 범위 중 타겟에 가장 가까운 타일
function bestMoveTowards(enemy, target, map, allUnits) {
  const range = calcMoveRange(enemy, map, allUnits);
  if (!range.length) return null;
  range.sort((a, b) => {
    const da = manhattan(a, target);
    const db = manhattan(b, target);
    if (da !== db) return da - db;
    return a.cost - b.cost;
  });
  return range[0];
}

// 포메이션 점수 (Hard 모드) — 동료와의 거리 가중 보정
function formationBonus(pos, myTeam) {
  let score = 0;
  for (const u of myTeam) {
    if (u.hp <= 0) continue;
    const d = Math.abs(pos.x - u.x) + Math.abs(pos.y - u.y);
    if (d === 1) score += 3;
    else if (d === 2) score += 1;
  }
  return score;
}

// ─────────────────────────────────────────────
// enemyTurn(enemyUnits, allUnits, map, difficulty, context)
//   context: { weather, onAnim?, skillsDb? }
// ─────────────────────────────────────────────
export async function enemyTurn(enemyUnits, allUnits, map, difficulty = 'normal', context = {}) {
  const allies = allUnits.filter((u) => u.team === 'ally');
  const actingEnemies = enemyUnits.filter((e) => e.hp > 0);

  for (const e of actingEnemies) {
    if (e.hp <= 0) continue;
    if (isStunned(e)) continue;

    // Easy 대기 30%
    if (difficulty === 'easy' && Math.random() < 0.3) continue;

    // 1) 힐 체크 (스킬 DB 있을 때만)
    const sicks = needsHeal(actingEnemies);
    if (sicks.length && context.skillsDb) {
      const healSkill = (e.skills || [])
        .map((id) => context.skillsDb[id])
        .find((s) => s && (s.type === 'heal_single' || s.type === 'heal_area') && (e.mp || 0) >= (s.mp || 0));
      if (healSkill) {
        const nearest = sicks.find((s) => manhattan(e, s) <= (healSkill.rng || 0));
        if (nearest) {
          await executeSkill(e, healSkill.id, [nearest], {
            ...context, skillDef: healSkill, map, allUnits,
          });
          e.acted = true;
          continue;
        }
      }
    }

    // 2) 타겟 선정
    let target = pickTarget(e, allies, difficulty);
    if (!target) { e.acted = true; continue; }

    // 영걸전 톤 — 행동 직전 카메라 포커스 (호스트가 카메라 lerp 처리)
    await context.onAnim?.('focus', e, { x: e.x, y: e.y });

    // 3) 이미 사거리 내?
    if (manhattan(e, target) <= (e.rng || 1)) {
      await _doAttackOrSkill(e, target, actingEnemies, allUnits, map, context);
      e.acted = true;
      continue;
    }

    // 4) 이동 후 공격 시도
    const move = bestMoveTowards(e, target, map, allUnits);
    if (move && (move.x !== e.x || move.y !== e.y)) {
      e.x = move.x; e.y = move.y;
      await context.onAnim?.('move', e, move);
    }
    // 이동 후 재체크
    if (manhattan(e, target) <= (e.rng || 1)) {
      await _doAttackOrSkill(e, target, actingEnemies, allUnits, map, context);
    }
    e.acted = true;
  }
}

// 공격 or 스킬 선택
async function _doAttackOrSkill(enemy, target, enemies, allUnits, map, context) {
  const skillsDb = context.skillsDb;
  // 강력한 스킬이 있으면 우선 (Normal/Hard)
  if (skillsDb && enemy.skills?.length) {
    const viable = enemy.skills
      .map((id) => skillsDb[id])
      .filter((s) => s && (enemy.mp || 0) >= (s.mp || 0) && s.type !== 'heal_single' && s.type !== 'heal_area')
      .filter((s) => manhattan(enemy, target) <= (s.rng || 1));
    if (viable.length && Math.random() < 0.6) {
      const pick = viable[Math.floor(Math.random() * viable.length)];
      await executeSkill(enemy, pick.id, [target], {
        ...context, skillDef: pick, map, allUnits,
      });
      return;
    }
  }
  // 평타
  await executeAttack(enemy, target, null, { ...context, map });
}

export { pickTarget, bestMoveTowards };
