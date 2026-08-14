// switcher.js — 카메라 3모드 스위처
//
// 기본 전략: "활성 카메라 변경". 세 카메라(+컷인)를 모두 유지, 렌더 시
// switcher.activeCam만 사용. Ortho↔Perspective 간 Position/lookAt은
// 전환 전 동일 지점을 조준하도록 내부적으로 보정.
//
// export:
//   CameraSwitcher (class)

import * as THREE from 'three';
import { createTacticalCam, updateTacticalCam, bindTacticalInputs } from './tactical_cam.js';
import { createCharacterCam, updateCharacterCam } from './character_cam.js';
import { createSquadCam, updateSquadCam } from './squad_cam.js';
import { setupCutinCam, updateCutinCam } from './cutin_cam.js';

const STORAGE_KEY = 'history-rpg-cam-default';

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export class CameraSwitcher {
  /**
   * @param {THREE.WebGLRenderer} renderer
   * @param {THREE.Scene} scene
   * @param {Object} opts
   *   opts.initialMode: 'tactical' | 'character' | 'squad'
   *   opts.lockMode: 강제 고정 (EP.1 Tactical 잠금용)
   *   opts.squadObjs / characterTarget / forwardVec 등 참조는 setSources로 전달
   */
  constructor(renderer, scene, opts = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.lockMode = opts.lockMode || null;

    // 3모드 카메라 생성
    const t = createTacticalCam(opts.tactical || {});
    this.tactical = t.cam;
    this.tacticalState = t.state;
    this.character = createCharacterCam(opts.character || {}).cam;
    this.squad = createSquadCam(opts.squad || {}).cam;
    this.cutin = null; // 필요 시 lazy

    // 씬에 전부 추가 (활성/비활성 토글)
    scene.add(this.tactical);
    scene.add(this.character);
    scene.add(this.squad);

    // 입력 바인딩 (Tactical만)
    this.tacticalUnbind = bindTacticalInputs(this.tactical, renderer, this.tacticalState);

    // 데이터 소스 (외부에서 setSources로 주입)
    this.sources = {
      characterTarget: null,  // THREE.Object3D
      squadObjs: [],          // THREE.Object3D[]
      forwardVec: new THREE.Vector3(0, 0, 1),
      obstacles: []
    };

    // 로컬스토리지에서 기본 모드 로드
    let defaultMode = opts.initialMode || 'tactical';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['tactical', 'character', 'squad'].includes(saved)) {
        defaultMode = saved;
      }
    } catch (e) {}

    this.current = this.lockMode || defaultMode;
    this.activeCam = this._camFor(this.current);

    // 전환 상태
    this.transition = null; // { from, to, start, duration, onDone }

    // 컷인 상태
    this.cutinActive = false;
    this.cutinAttacker = null;
    this.cutinTarget = null;
    this.preCutinMode = null;
    this.autoCutinEnabled = true;

    // 단축키 1/2/3
    this._onKey = (e) => {
      if (e.key === '1') this.switchTo('tactical');
      else if (e.key === '2') this.switchTo('character');
      else if (e.key === '3') this.switchTo('squad');
    };
    window.addEventListener('keydown', this._onKey);
  }

  _camFor(mode) {
    if (mode === 'tactical') return this.tactical;
    if (mode === 'character') return this.character;
    if (mode === 'squad') return this.squad;
    if (mode === 'cutin') return this.cutin;
    return this.tactical;
  }

  /**
   * 외부 데이터 소스 설정.
   * @param {{characterTarget, squadObjs, forwardVec, obstacles}} sources
   */
  setSources(sources) {
    if (sources.characterTarget !== undefined) this.sources.characterTarget = sources.characterTarget;
    if (sources.squadObjs !== undefined) this.sources.squadObjs = sources.squadObjs;
    if (sources.forwardVec !== undefined) this.sources.forwardVec = sources.forwardVec;
    if (sources.obstacles !== undefined) this.sources.obstacles = sources.obstacles;
  }

  /**
   * 모드 고정 (null = 해제)
   */
  setLockMode(mode) {
    this.lockMode = mode;
    if (mode && this.current !== mode) this.switchTo(mode, 400, { force: true });
  }

  /**
   * 모드 전환 (easeInOutCubic 600ms 보간).
   * 내부적으로 activeCam을 토글하지만, 전환 중엔 "전환용 임시 카메라"가
   * 시작 카메라에서 목표 카메라 위치/쿼터니온으로 lerp/slerp.
   * Ortho/Perspective 교차 시엔 activeCam을 직접 바꾸고 lookAt만 동기화.
   */
  async switchTo(mode, duration = 600, opts = {}) {
    if (!['tactical', 'character', 'squad'].includes(mode)) return;
    if (this.lockMode && !opts.force && mode !== this.lockMode) return;
    if (mode === this.current && !opts.force) return;

    const fromMode = this.current;
    const fromCam = this._camFor(fromMode);
    const toCam = this._camFor(mode);

    // 목표 카메라를 현재 씬 상태로 선제 업데이트 (올바른 타겟 위치로)
    this._updateCam(toCam, mode);

    // 시작 위치/쿼터니온 저장
    const startPos = fromCam.position.clone();
    const startQuat = fromCam.quaternion.clone();
    const endPos = toCam.position.clone();
    const endQuat = toCam.quaternion.clone();

    // Ortho↔Perspective 전환 시: 시작/목표 카메라가 다른 타입.
    // 공통 전략 = "목표 카메라"를 시작 카메라의 position/quaternion에서 출발시켜
    // lerp로 제자리(endPos/endQuat)까지 이동. 전환 직후 activeCam = toCam.
    this.activeCam = toCam;
    this.current = mode;

    const start = performance.now();
    return new Promise(resolve => {
      this.transition = {
        toCam, endPos, endQuat, startPos, startQuat,
        start, duration,
        onDone: () => { this.transition = null; resolve(); }
      };
    });
  }

  enableAutoCutin(attacker, target, duration = 500) {
    if (!this.autoCutinEnabled) return Promise.resolve();
    this.cutinActive = true;
    this.cutinAttacker = attacker;
    this.cutinTarget = target;
    this.preCutinMode = this.current;

    if (!this.cutin) {
      this.cutin = setupCutinCam(attacker, target);
      this.scene.add(this.cutin);
    } else {
      updateCutinCam(this.cutin, attacker, target);
    }

    // 보간 없이 즉시 컷인 (드라마틱 컷). 필요 시 duration으로 Lerp 가능하지만
    // 스펙: 컷인은 "자동 전환+복귀"가 핵심.
    this.activeCam = this.cutin;
    this.current = 'cutin';
    return Promise.resolve();
  }

  async disableAutoCutin(duration = 600) {
    if (!this.cutinActive) return;
    this.cutinActive = false;
    const backTo = this.preCutinMode || 'tactical';
    this.current = backTo;
    await this.switchTo(backTo, duration, { force: true });
    this.cutinAttacker = null;
    this.cutinTarget = null;
  }

  setDefaultMode(mode) {
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
  }

  getDefaultMode() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  /**
   * 매 프레임 호출. deltaTime 단위 ms.
   */
  update(deltaTimeMs) {
    // 컷인 타겟 추적
    if (this.cutinActive && this.cutin && this.cutinAttacker && this.cutinTarget) {
      updateCutinCam(this.cutin, this.cutinAttacker, this.cutinTarget);
    }

    // 3모드 카메라 갱신 — 전환 중인 toCam은 제외 (보간이 덮어써야 하므로)
    const skipCam = this.transition ? this.transition.toCam : null;
    if (this.tactical !== skipCam) updateTacticalCam(this.tactical, this.tacticalState);
    if (this.character !== skipCam && this.sources.characterTarget) {
      updateCharacterCam(this.character, this.sources.characterTarget, { obstacles: this.sources.obstacles });
    }
    if (this.squad !== skipCam && this.sources.squadObjs && this.sources.squadObjs.length > 0) {
      updateSquadCam(this.squad, this.sources.squadObjs, this.sources.forwardVec);
    }

    // 전환 보간
    if (this.transition) {
      const tr = this.transition;
      const t = Math.min(1, (performance.now() - tr.start) / tr.duration);
      const e = easeInOutCubic(t);
      tr.toCam.position.lerpVectors(tr.startPos, tr.endPos, e);
      const q = new THREE.Quaternion().slerpQuaternions(tr.startQuat, tr.endQuat, e);
      tr.toCam.quaternion.copy(q);
      if (t >= 1) {
        tr.onDone();
      }
    }
  }

  _updateCam(cam, mode) {
    if (mode === 'tactical') updateTacticalCam(this.tactical, this.tacticalState);
    else if (mode === 'character' && this.sources.characterTarget) {
      updateCharacterCam(this.character, this.sources.characterTarget, { obstacles: this.sources.obstacles });
    } else if (mode === 'squad' && this.sources.squadObjs) {
      updateSquadCam(this.squad, this.sources.squadObjs, this.sources.forwardVec);
    }
  }

  dispose() {
    if (this.tacticalUnbind) this.tacticalUnbind();
    window.removeEventListener('keydown', this._onKey);
    this.scene.remove(this.tactical);
    this.scene.remove(this.character);
    this.scene.remove(this.squad);
    if (this.cutin) this.scene.remove(this.cutin);
  }
}
