// js-v8/battle/objectives.js
// 한국사 영웅전 v8 · 승리/패배 조건(objective) 평가기
// 02_BATTLE_SYSTEM 승리조건 확장:
//   기존 turn_manager.checkVictory()는 전멸(annihilation)만 판정했다.
//   영걸전류 SRPG처럼 "N턴 생존 / 거점 도달 / 보스 격파 / 요인 보호"
//   같은 비전멸 조건을 데이터(map.objective)로 선언할 수 있게 한다.
//
// 설계 원칙(보수적·폴백우선):
//   - objective가 없으면(undefined/null) 호출측이 기존 전멸 로직을 쓰도록
//     이 모듈은 절대 호출되지 않거나, 호출돼도 안전한 기본값을 돌려준다.
//   - 어떤 조건이든 "아군 전멸 = 패배"는 공통 바닥선(hard floor)으로 유지한다.
//   - 무한 전투 방지: survive_turns는 턴 상한이 곧 승리, reach/defeat/protect는
//     map.turnLimit(선택)을 받아 상한 초과 시 명확히 패배 처리한다.
//
// Pure logic. three.js·DOM 의존 없음. HTML은 progressText만 HUD/배너에 표시.

// ─────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────
function _alive(arr) {
  return Array.isArray(arr) && arr.some((u) => u && u.hp > 0);
}

function _findById(arr, id) {
  if (!Array.isArray(arr) || id == null) return null;
  return arr.find((u) => u && u.id === id) || null;
}

// ─────────────────────────────────────────────
// evaluateObjective(objective, ctx)
//   objective: maps.json의 map.objective 필드 (없으면 null/undefined)
//     { type, turns?, unitId?, targetId?, x?, y?, label?, turnLimit? }
//     지원 type:
//       - 'annihilate'    : (기본) 적 전멸 = 승, 아군 전멸 = 패
//       - 'survive_turns' : turns 턴을 버티면 승 (그 전 아군 전멸 = 패)
//       - 'reach_tile'    : 지정 유닛(unitId, 기본=아군 리더)이 (x,y) 도달 = 승
//       - 'defeat_target' : 지정 적(targetId) 격파 = 승
//       - 'protect_unit'  : 지정 유닛(unitId)이 쓰러지면 패, 적 전멸하면 승
//   ctx: { allies, enemies, turn }  (turn은 현재 턴 번호, 1-base)
//
//   반환: { win:boolean, lose:boolean, progressText:string }
//     - objective 미지정/미인식 시: win/lose 모두 false, progressText '' →
//       호출측이 기존 전멸 로직으로 폴백하면 된다(안전).
// ─────────────────────────────────────────────
export function evaluateObjective(objective, ctx = {}) {
  const none = { win: false, lose: false, progressText: '' };

  // objective 없으면 안전 폴백(호출측이 전멸 판정을 쓰도록)
  if (!objective || typeof objective !== 'object') return none;

  const allies = ctx.allies || [];
  const enemies = ctx.enemies || [];
  const turn = Number.isFinite(ctx.turn) ? ctx.turn : 1;
  const type = objective.type || 'annihilate';

  // 공통 바닥선: 아군이 전멸하면 어떤 조건이든 패배
  const alliesGone = !_alive(allies);

  switch (type) {
    // ── 전멸(기본) ─────────────────────────────
    case 'annihilate': {
      if (!_alive(enemies)) return { win: true, lose: false, progressText: '적 전멸!' };
      if (alliesGone) return { win: false, lose: true, progressText: '아군 전멸…' };
      return { win: false, lose: false, progressText: objective.label || '적을 모두 물리쳐라' };
    }

    // ── N턴 생존 ───────────────────────────────
    case 'survive_turns': {
      const need = Math.max(1, objective.turns | 0);
      if (alliesGone) return { win: false, lose: true, progressText: '아군 전멸…' };
      // 적까지 전멸시키면 조기 승리(영걸전 관용)
      if (!_alive(enemies)) return { win: true, lose: false, progressText: '적 전멸 — 시련 통과!' };
      // turn이 목표 턴에 도달하면 승리(해당 턴을 버텨냄)
      if (turn >= need) return { win: true, lose: false, progressText: `${need}턴 생존 — 시련 통과!` };
      const remain = need - turn;
      return {
        win: false, lose: false,
        progressText: objective.label || `${need}턴까지 버텨라 (남은 ${remain}턴)`,
      };
    }

    // ── 거점 도달 ──────────────────────────────
    case 'reach_tile': {
      // unitId 미지정 시 아군 리더(없으면 첫 아군)
      const mover = objective.unitId
        ? _findById(allies, objective.unitId)
        : (allies.find((u) => u && u.isLeader && u.hp > 0) || allies.find((u) => u && u.hp > 0));
      if (alliesGone) return { win: false, lose: true, progressText: '아군 전멸…' };
      // 지정 유닛이 쓰러졌다면 도달 불가 → 패배
      if (objective.unitId && (!mover || mover.hp <= 0)) {
        return { win: false, lose: true, progressText: '지정 유닛이 쓰러졌다…' };
      }
      if (mover && mover.hp > 0 && mover.x === objective.x && mover.y === objective.y) {
        return { win: true, lose: false, progressText: '거점 도달 — 돌파 성공!' };
      }
      // 무한전투 방지: 턴 상한 초과 시 패배(선택)
      if (objective.turnLimit && turn > objective.turnLimit) {
        return { win: false, lose: true, progressText: '시간 초과…' };
      }
      return { win: false, lose: false, progressText: objective.label || '거점으로 진격하라' };
    }

    // ── 보스(특정 적) 격파 ─────────────────────
    case 'defeat_target': {
      const target = _findById(enemies, objective.targetId);
      if (alliesGone) return { win: false, lose: true, progressText: '아군 전멸…' };
      // 대상이 이미 없거나 쓰러졌으면 승리
      if (!target || target.hp <= 0) {
        return { win: true, lose: false, progressText: '적장 격파 — 승리!' };
      }
      return {
        win: false, lose: false,
        progressText: objective.label || `적장 ${target.name || ''}을(를) 쓰러뜨려라`,
      };
    }

    // ── 요인 보호 ──────────────────────────────
    case 'protect_unit': {
      const ward = _findById(allies, objective.unitId);
      // 보호 대상이 쓰러지면 즉시 패배
      if (!ward || ward.hp <= 0) {
        return { win: false, lose: true, progressText: '보호 대상을 잃었다…' };
      }
      if (alliesGone) return { win: false, lose: true, progressText: '아군 전멸…' };
      // 적 전멸하면 승리
      if (!_alive(enemies)) return { win: true, lose: false, progressText: '적 전멸 — 보호 성공!' };
      // 턴 상한 도달 시 보호에 성공한 것으로 간주(선택)
      if (objective.turnLimit && turn >= objective.turnLimit) {
        return { win: true, lose: false, progressText: '버텨냈다 — 보호 성공!' };
      }
      return {
        win: false, lose: false,
        progressText: objective.label || `${ward.name || '아군'}을(를) 지켜라`,
      };
    }

    // ── 미인식 type: 안전 폴백 ──────────────────
    default:
      return none;
  }
}

// objective가 비전멸 조건인지(호출측 폴백 판단용 헬퍼)
export function hasObjective(map) {
  return !!(map && map.objective && typeof map.objective === 'object' && map.objective.type);
}
