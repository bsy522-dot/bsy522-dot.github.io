// js-v8/battle/attack.js
// 한국사 영웅전 v8 · 공격 처리 / 데미지 공식 / 반격
// 02_BATTLE_SYSTEM §2 공식 정확 구현.
//
// 공식:
//   base = skill ? skill.dmg : atk + atkMod(weather)
//   if (skill.element && target.weakTo == element) base *= 1.25
//   dmg = max(1, base - def - terrainDef) + randInt(0,5)
//   crit 10% → *1.5
//   typeAdv → *1.5 / *0.75 / *1
//
// 명중/회피 개념 없음 — 모든 공격은 항상 명중 (확률 변수는 크리·데미지 분산뿐).
// 반격: 근접(rng=1) + 생존 + 사거리 안이면 자동 반격 (dmg-2)

import { manhattan, terrainDefBonus } from './movement.js';
import { grantXP } from './xp_level.js';

// ─────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────
const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// 유닛 타입 상성 (가위바위보)
//   보병 > 궁병, 궁병 > 기마병, 기마병 > 보병
//   신장/풍백/우사/운사 계열은 중립(1.0)
const TYPE_ADV = {
  '보병':   { '궁병': 1.5, '기마병': 0.75 },
  '궁병':   { '기마병': 1.5, '보병': 0.75 },
  '기마병': { '보병': 1.5, '궁병': 0.75 },
};

export function typeAdv(atkType, defType) {
  const row = TYPE_ADV[atkType];
  if (!row) return 1.0;
  return row[defType] ?? 1.0;
}

// 버프/디버프 스탯 적용
function effectiveAtk(unit) {
  let atk = unit.atk || 0;
  if (unit.buffs) for (const b of unit.buffs) {
    if (b.type === 'buff_atk' || b.type === 'buff_area') atk = Math.floor(atk * (1 + (b.mod || 0)));
  }
  return atk;
}

function effectiveDef(unit) {
  let def = unit.def || 0;
  if (unit.buffs) for (const b of unit.buffs) {
    if (b.type === 'buff_def' || b.type === 'buff_area') def = Math.floor(def * (1 + (b.mod || 0)));
  }
  return def;
}

// ─────────────────────────────────────────────
// calcDamage — pure function
// ─────────────────────────────────────────────
export function calcDamage(attacker, target, skill, weather, map) {
  const atkMod = (weather?.atkMod) || 0;
  const tile = map?.terrain?.[target.y]?.[target.x];
  const tDef = terrainDefBonus(tile);

  let base;
  if (skill) {
    // 스킬은 dmg 또는 (pw * atk) 중 더 큰 값
    const byDmg = skill.dmg || 0;
    const byPw  = Math.floor(effectiveAtk(attacker) * (skill.pw || 1.0));
    base = Math.max(byDmg, byPw);
  } else {
    base = effectiveAtk(attacker) + atkMod;
  }

  // 원소 약점
  if (skill?.element && target.weakTo === skill.element) base = Math.floor(base * 1.25);

  // 날씨: 비일 때 불 데미지 -30%
  if (weather?.id === 'rain' && skill?.element === 'fire') base = Math.floor(base * 0.7);

  let dmg = Math.max(1, base - effectiveDef(target) - tDef) + randInt(0, 5);

  // 크리티컬 10%
  const crit = randInt(1, 10) === 1;
  if (crit) dmg = Math.floor(dmg * 1.5);

  // 타입 어드밴티지
  const tMod = typeAdv(attacker.unitType, target.unitType);
  dmg = Math.floor(dmg * tMod);

  return { dmg: Math.max(1, dmg), crit, typeMod: tMod, element: skill?.element || 'slash' };
}

// ─────────────────────────────────────────────
// 반격 판정
// ─────────────────────────────────────────────
export function canCounter(defender, attacker) {
  if (defender.hp <= 0) return false;
  if ((defender.rng || 1) < manhattan(defender, attacker)) return false;
  return true;
}

// ─────────────────────────────────────────────
// calcPreview — 완전 순수 (부수효과 0, 무작위 0)
//   calcDamage는 randInt(0,5) 분산 + 10% 크리로 호출마다 결과가 달라
//   미리보기엔 부적합 → 동일 공식을 결정적으로 풀어 "예상 범위"를 돌려준다.
//   반환: { min, max, crit, critPct, typeMod, element, counter? }
//     min/max  : 데미지 분산(+0~5) 양 끝 (크리 미적용 평타값)
//     critPct  : 크리티컬 확률(%) — calcDamage의 randInt(1,10)===1 기반 10%
//     counter  : 근접 평타 시 예상 반격 { min, max } (스킬은 반격 없음)
// ─────────────────────────────────────────────
function _baseDamage(attacker, target, skill, weather, map) {
  // calcDamage의 결정적 부분만 추출 (randInt/crit 제외)
  const atkMod = (weather?.atkMod) || 0;
  const tile = map?.terrain?.[target.y]?.[target.x];
  const tDef = terrainDefBonus(tile);

  let base;
  if (skill) {
    const byDmg = skill.dmg || 0;
    const byPw  = Math.floor(effectiveAtk(attacker) * (skill.pw || 1.0));
    base = Math.max(byDmg, byPw);
  } else {
    base = effectiveAtk(attacker) + atkMod;
  }

  if (skill?.element && target.weakTo === skill.element) base = Math.floor(base * 1.25);
  if (weather?.id === 'rain' && skill?.element === 'fire') base = Math.floor(base * 0.7);

  // 분산 전 코어 데미지 (randInt(0,5) 이전)
  return Math.max(1, base - effectiveDef(target) - tDef);
}

export function calcPreview(attacker, target, skill, weather, map) {
  if (!attacker || !target) return null;

  const tMod = typeAdv(attacker.unitType, target.unitType);
  const core = _baseDamage(attacker, target, skill, weather, map);

  // 데미지 분산 +randInt(0,5) → min=core, max=core+5
  const min = Math.max(1, Math.floor(core * tMod));
  const max = Math.max(1, Math.floor((core + 5) * tMod));

  const out = {
    min, max,
    crit: false,            // 미리보기는 크리 확정 표기 안 함
    critPct: 10,            // randInt(1,10)===1 → 10%
    typeMod: tMod,
    element: skill?.element || 'slash',
  };

  // 예상 반격 (근접 평타, 타겟이 한 방에 죽지 않는다는 가정 하의 상한 시나리오)
  //   실제 executeAttack은 killed가 아닐 때만 반격 → 미리보기는 "가능성"만 표시
  if (!skill && canCounter(target, attacker)) {
    const cCore = _baseDamage(target, attacker, null, weather, map);
    const cMod  = typeAdv(target.unitType, attacker.unitType);
    // 반격은 -2 (executeAttack 라인 142)
    const cMin = Math.max(1, Math.floor(cCore * cMod) - 2);
    const cMax = Math.max(1, Math.floor((cCore + 5) * cMod) - 2);
    out.counter = { min: cMin, max: cMax };
  }

  return out;
}

// ─────────────────────────────────────────────
// executeAttack(attacker, target, skill, context) — async
// context: { map, weather, onHit?(), onCounter?(), onComplete?() }
//   — 애니 타이밍은 context.hooks 통해 외부 렌더와 동기화
// ─────────────────────────────────────────────
export async function executeAttack(attacker, target, skill, context = {}) {
  if (!attacker || !target || attacker.hp <= 0 || target.hp <= 0) {
    context.onComplete?.();
    return { aborted: true };
  }

  const result = {
    attacker: attacker.id || attacker.name,
    target:   target.id || target.name,
    skill:    skill?.id || null,
    hits: [],
  };

  // MP 소모
  if (skill?.mp) attacker.mp = Math.max(0, attacker.mp - skill.mp);

  // multi 스킬 N회
  const hitCount = (skill?.type === 'multi') ? (skill.h || 1) : 1;

  for (let i = 0; i < hitCount; i++) {
    const calc = calcDamage(attacker, target, skill, context.weather, context.map);
    target.hp = Math.max(0, target.hp - calc.dmg);
    result.hits.push(calc);
    await context.onHit?.(attacker, target, calc, i);
    if (target.hp <= 0) break;
  }

  // XP
  const xpGain = skill ? 15 : 10;
  const killed = target.hp <= 0;
  grantXP(attacker, xpGain + (killed ? 50 : 0), context);
  result.xp = xpGain + (killed ? 50 : 0);
  result.killed = killed;

  // 반격 (스킬이 아니고, 타겟 생존, 사거리 내일 때)
  if (!killed && !skill && canCounter(target, attacker)) {
    const ccalc = calcDamage(target, attacker, null, context.weather, context.map);
    ccalc.dmg = Math.max(1, ccalc.dmg - 2);  // 반격 -2
    attacker.hp = Math.max(0, attacker.hp - ccalc.dmg);
    result.counter = ccalc;
    await context.onCounter?.(target, attacker, ccalc);
    grantXP(attacker, 5, context);  // 위험 회피 +5
  }

  context.onComplete?.(result);
  return result;
}

// ─────────────────────────────────────────────
// 힐
// ─────────────────────────────────────────────
export function executeHeal(caster, target, skill, context = {}) {
  if (skill?.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
  const amount = Math.floor((skill.amount || 20) * (skill.pw || 1.0));
  const before = target.hp;
  target.hp = Math.min(target.mhp || 999, target.hp + amount);
  const actual = target.hp - before;
  grantXP(caster, 15, context);
  context.onHeal?.(caster, target, actual);
  return { actual, amount };
}

// ─────────────────────────────────────────────
// 부활 (heal_single_dead type)
// ─────────────────────────────────────────────
export function executeRevive(caster, target, skill, context = {}) {
  if (target.hp > 0) return { aborted: true };
  if (skill?.mp) caster.mp = Math.max(0, caster.mp - skill.mp);
  const pct = skill.rpct || 0.5;
  target.hp = Math.floor(target.mhp * pct);
  grantXP(caster, 30, context);
  context.onRevive?.(caster, target, target.hp);
  return { hp: target.hp };
}
