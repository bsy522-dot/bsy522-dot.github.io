// js-v8/battle/turn_manager.js
// 한국사 영웅전 v8 · 턴 매니저 (상태머신)
// 02_BATTLE_SYSTEM §1 루프:
//   ally_select → ally_move → ally_action → [cutin] → finishAction
//   → (모든 아군 acted ? enemy : ally_select)
//   → enemy → turn++ → ally_select
//
// Pure logic + EventTarget. 렌더링은 호출측이 phase change 리스너로 처리.

import { State } from '../core/engine.js';
import { evaluateObjective, hasObjective } from './objectives.js';

// ─────────────────────────────────────────────
// Phase 상수
// ─────────────────────────────────────────────
export const PHASE = {
  IDLE:          'idle',
  ALLY_SELECT:   'ally_select',
  ALLY_MOVE:     'ally_move',
  ALLY_ACTION:   'ally_action',
  ALLY_TARGETING:'ally_targeting',
  CUTIN:         'cutin',
  ENEMY:         'enemy',
  VICTORY:       'victory',
  DEFEAT:        'defeat',
};

// ─────────────────────────────────────────────
// TurnManager
//   - ctx: { allies: [unit], enemies: [unit], map, weather?, difficulty? }
//   - 사용: const tm = new TurnManager(ctx); tm.addEventListener('phase', fn); tm.start();
// ─────────────────────────────────────────────
export class TurnManager extends EventTarget {
  constructor(ctx = {}) {
    super();
    this.ctx = ctx;
    this.turn = 1;
    this.currentPhase = PHASE.IDLE;
    this.selectedUnit = null;
    this.side = 'ally';  // 'ally' | 'enemy'
    this._stopped = false;
  }

  // ── lifecycle ──────────────────────────────
  start() {
    this._stopped = false;
    this.turn = 1;
    this.resetActed('ally');
    this.resetActed('enemy');
    this._setPhase(PHASE.ALLY_SELECT);
    this._dispatch('turn', { turn: this.turn, side: this.side });
  }

  stop() { this._stopped = true; }

  // ── phase control ──────────────────────────
  _setPhase(phase, extra = {}) {
    if (this._stopped) return;
    const prev = this.currentPhase;
    this.currentPhase = phase;
    this._dispatch('phase', { from: prev, to: phase, ...extra });
  }

  _dispatch(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }

  // ── 아군 유닛 선택 ──
  selectUnit(unit) {
    if (this.currentPhase !== PHASE.ALLY_SELECT) return false;
    if (!unit || unit.team !== 'ally' || unit.hp <= 0 || unit.acted) return false;
    this.selectedUnit = unit;
    this._setPhase(PHASE.ALLY_MOVE, { unit });
    return true;
  }

  // ── 유닛 이동 확정 ──
  confirmMove(unit, newPos) {
    if (this.currentPhase !== PHASE.ALLY_MOVE) return false;
    if (unit !== this.selectedUnit) return false;
    unit.x = newPos.x; unit.y = newPos.y;
    this._setPhase(PHASE.ALLY_ACTION, { unit });
    return true;
  }

  // ── 액션 시작 (공격/스킬/아이템) → targeting phase ──
  beginTargeting(actionType, payload = {}) {
    if (this.currentPhase !== PHASE.ALLY_ACTION) return false;
    this._setPhase(PHASE.ALLY_TARGETING, { actionType, ...payload });
    return true;
  }

  // ── 액션 완료 / 대기 ──
  endUnitTurn() {
    if (this.selectedUnit) {
      this.selectedUnit.acted = true;
      this.selectedUnit = null;
    }
    // 승패 체크
    const v = this.checkVictory();
    if (v === 'victory') { this._setPhase(PHASE.VICTORY); return; }
    if (v === 'defeat')  { this._setPhase(PHASE.DEFEAT);  return; }

    // 모든 아군 acted?
    const pending = this._pendingOf('ally');
    if (pending.length === 0) {
      this._beginEnemyTurn();
    } else {
      this._setPhase(PHASE.ALLY_SELECT);
    }
  }

  _beginEnemyTurn() {
    this.side = 'enemy';
    this.resetActed('enemy');
    this._setPhase(PHASE.ENEMY);
    this._dispatch('turn', { turn: this.turn, side: 'enemy' });
  }

  endEnemyTurn() {
    const v = this.checkVictory();
    if (v === 'victory') { this._setPhase(PHASE.VICTORY); return; }
    if (v === 'defeat')  { this._setPhase(PHASE.DEFEAT);  return; }

    // 버프 턴 경감
    this._tickBuffs();
    // 신단수 힐 등 특수 타일 효과
    this._applySpecialTiles();

    // 아군 턴 시작
    this.turn++;
    this.side = 'ally';
    this.resetActed('ally');
    this._setPhase(PHASE.ALLY_SELECT);
    this._dispatch('turn', { turn: this.turn, side: 'ally' });
  }

  // ── 전투 상태 ──
  // map.objective가 있으면 비전멸 조건(생존/도달/격파/보호)을 우선 평가하고,
  // 없으면 기존 전멸 판정으로 폴백한다(호환성 보장).
  // 평가 중 예외가 나면 안전하게 전멸 로직으로 떨어진다(graceful degradation).
  checkVictory() {
    const alive = (arr) => arr.some((u) => u.hp > 0);
    const map = this.ctx && this.ctx.map;

    // ── objective 기반 판정 ──
    if (hasObjective(map)) {
      try {
        const res = evaluateObjective(map.objective, {
          allies: this.ctx.allies,
          enemies: this.ctx.enemies,
          turn: this.turn,
        });
        // progressText는 HTML이 턴배너/HUD에 표시할 수 있게 보관(선택적 소비)
        this.lastProgressText = res.progressText || '';
        if (res.win)  return 'victory';
        if (res.lose) return 'defeat';
        return null;
      } catch (e) {
        // objective 평가 실패 시 기존 전멸 로직으로 폴백
        console.warn('[objective] 평가 실패 — 전멸 폴백:', e);
      }
    }

    // ── 기존 전멸 판정(폴백/기본) ──
    if (!alive(this.ctx.enemies)) return 'victory';
    if (!alive(this.ctx.allies))  return 'defeat';
    return null;
  }

  // ── helpers ──
  resetActed(team) {
    const arr = team === 'ally' ? this.ctx.allies : this.ctx.enemies;
    for (const u of arr) if (u.hp > 0) u.acted = false;
  }

  _pendingOf(team) {
    const arr = team === 'ally' ? this.ctx.allies : this.ctx.enemies;
    return arr.filter((u) => u.hp > 0 && !u.acted);
  }

  _tickBuffs() {
    const all = [...this.ctx.allies, ...this.ctx.enemies];
    for (const u of all) {
      if (!u.buffs || !u.buffs.length) continue;
      u.buffs = u.buffs.filter((b) => {
        b.turns -= 1;
        return b.turns > 0;
      });
    }
  }

  _applySpecialTiles() {
    const map = this.ctx.map;
    if (!map || !map.specialTiles) return;
    for (const st of map.specialTiles) {
      if (!st.effect) continue;
      // 신단수: 아군이 인접(맨해튼 1) 시 HP+N
      const units = st.effect.team === 'ally' ? this.ctx.allies : this.ctx.enemies;
      for (const u of units) {
        if (u.hp <= 0) continue;
        const d = Math.abs(u.x - st.x) + Math.abs(u.y - st.y);
        if (d <= 1 && st.effect.heal) {
          u.hp = Math.min(u.mhp, u.hp + st.effect.heal);
          this._dispatch('special_heal', { unit: u, amount: st.effect.heal, tile: st });
        }
      }
    }
  }
}
