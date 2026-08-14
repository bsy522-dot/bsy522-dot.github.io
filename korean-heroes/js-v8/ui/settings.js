// js-v8/ui/settings.js
// 한국사 영웅전 v8 · 설정 메뉴
// 03_CAMERA_MODES §8 UI 목업 반영.
//  - 카메라 모드 라디오 (택티컬/캐릭터/분대)
//  - 자동 컷인 전환 체크박스
//  - BGM/SFX 볼륨 슬라이더 (0~100)
//  - 언어 (ko 고정, 확장 슬롯)
//  - [저장] / [취소]
//
// localStorage key: history-rpg-settings-v8
//
// export:
//   openSettings(opts)
//   closeSettings()
//   getSettings()
//   saveSettings(partial)
//   onSettingsChange(cb)

import { audio } from '../core/audio.js';

const STORAGE_KEY = 'history-rpg-settings-v8';

const DEFAULT_SETTINGS = {
  cameraMode: 'tactical',   // tactical | character | squad
  autoCutin: true,          // 컷인 시 자동 캐릭터 전환
  bgmVolume: 50,            // 0-100
  sfxVolume: 70,
  language: 'ko',
  cameraLocked: false,      // EP.1 잠금 여부 (외부 주입)
  battleDisplay: 'squad'    // 'single' | 'squad' — 전투 표시 모드 (fullloop-3d 분대 포메이션)
};

let _cache = null;
let _overlay = null;
let _changeCb = null;

function _load() {
  if (_cache) return _cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const d = raw ? JSON.parse(raw) : {};
    _cache = { ...DEFAULT_SETTINGS, ...d };
  } catch (e) {
    _cache = { ...DEFAULT_SETTINGS };
  }
  return _cache;
}

function _persist() {
  if (!_cache) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_cache));
  } catch (e) { /* ignore */ }
}

// ─────────────────────────────────────────────
export function getSettings() {
  return { ..._load() };
}

export function saveSettings(partial) {
  _cache = { ..._load(), ...partial };
  _persist();
  // 오디오 즉시 반영
  audio.setBGMVolume((_cache.bgmVolume || 0) / 100);
  audio.setSFXVolume((_cache.sfxVolume || 0) / 100);
  if (_changeCb) {
    try { _changeCb(_cache); } catch (e) { console.error('[settings] changeCb err', e); }
  }
}

export function onSettingsChange(cb) { _changeCb = cb; }

// ─────────────────────────────────────────────
// UI 열기
// opts.cameraLocked: 카메라 선택 비활성 (EP.1)
// opts.onSave / opts.onCancel
export function openSettings(opts = {}) {
  closeSettings();
  const s = _load();
  const camLocked = opts.cameraLocked ?? s.cameraLocked ?? false;

  const overlay = document.createElement('div');
  overlay.className = 'v8-overlay';

  const modal = document.createElement('div');
  modal.className = 'v8-modal';
  modal.id = 'v8-settings';

  modal.innerHTML = `
    <h2>⚙ 설정</h2>

    <h3>카메라 모드 ${camLocked ? '<span style="color:#a22;font-size:12px">(EP.1 잠김)</span>' : ''}</h3>
    <div class="v8-settings-row">
      <input type="radio" name="v8-cam" id="v8-cam-t" value="tactical" ${s.cameraMode === 'tactical' ? 'checked' : ''} ${camLocked ? 'disabled' : ''}>
      <label for="v8-cam-t">택티컬 (전체 파악)</label>
    </div>
    <div class="v8-settings-row">
      <input type="radio" name="v8-cam" id="v8-cam-c" value="character" ${s.cameraMode === 'character' ? 'checked' : ''} ${camLocked ? 'disabled' : ''}>
      <label for="v8-cam-c">캐릭터 (몰입감)</label>
    </div>
    <div class="v8-settings-row">
      <input type="radio" name="v8-cam" id="v8-cam-s" value="squad" ${s.cameraMode === 'squad' ? 'checked' : ''} ${camLocked ? 'disabled' : ''}>
      <label for="v8-cam-s">분대 (진군감)</label>
    </div>

    <h3>자동 전환</h3>
    <div class="v8-settings-row">
      <input type="checkbox" id="v8-auto-cutin" ${s.autoCutin ? 'checked' : ''}>
      <label for="v8-auto-cutin">컷인 시 캐릭터 카메라 자동 전환</label>
    </div>

    <h3>전투 표시 모드</h3>
    <div class="v8-settings-row">
      <input type="radio" name="v8-battle-display" id="v8-bd-squad" value="squad" ${s.battleDisplay === 'squad' ? 'checked' : ''}>
      <label for="v8-bd-squad">분대 (리더 1 + 병사 9) — fullloop-3d 진군감</label>
    </div>
    <div class="v8-settings-row">
      <input type="radio" name="v8-battle-display" id="v8-bd-single" value="single" ${s.battleDisplay === 'single' ? 'checked' : ''}>
      <label for="v8-bd-single">단일 (유닛 1체) — 경량 퍼포먼스</label>
    </div>

    <h3>오디오</h3>
    <div class="v8-settings-row">
      <label for="v8-bgm-vol" style="width:42px">BGM</label>
      <input type="range" id="v8-bgm-vol" min="0" max="100" step="1" value="${s.bgmVolume}">
      <span class="v8-vol-val" id="v8-bgm-val">${s.bgmVolume}%</span>
    </div>
    <div class="v8-settings-row">
      <label for="v8-sfx-vol" style="width:42px">SFX</label>
      <input type="range" id="v8-sfx-vol" min="0" max="100" step="1" value="${s.sfxVolume}">
      <span class="v8-vol-val" id="v8-sfx-val">${s.sfxVolume}%</span>
    </div>

    <h3>언어</h3>
    <div class="v8-settings-row">
      <select id="v8-lang">
        <option value="ko" ${s.language === 'ko' ? 'selected' : ''}>한국어</option>
        <option value="en" disabled>English (추후 지원)</option>
      </select>
    </div>

    <div class="v8-row-buttons">
      <button class="v8-btn" data-cancel>취소</button>
      <button class="v8-btn v8-primary" data-save>저장</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  _overlay = overlay;

  // 볼륨 슬라이더 실시간 반영 (미리듣기)
  const bgmSlider = modal.querySelector('#v8-bgm-vol');
  const bgmVal = modal.querySelector('#v8-bgm-val');
  bgmSlider.addEventListener('input', () => {
    bgmVal.textContent = `${bgmSlider.value}%`;
    audio.setBGMVolume(bgmSlider.value / 100);
  });
  const sfxSlider = modal.querySelector('#v8-sfx-vol');
  const sfxVal = modal.querySelector('#v8-sfx-val');
  sfxSlider.addEventListener('input', () => {
    sfxVal.textContent = `${sfxSlider.value}%`;
    audio.setSFXVolume(sfxSlider.value / 100);
    audio.playSFX('click');
  });

  // 배경 클릭 시 취소 (모달 바깥)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) _cancel();
  });

  modal.querySelector('[data-save]').addEventListener('click', () => {
    const cam = modal.querySelector('input[name="v8-cam"]:checked')?.value || s.cameraMode;
    const auto = modal.querySelector('#v8-auto-cutin').checked;
    const bgm = parseInt(bgmSlider.value, 10);
    const sfx = parseInt(sfxSlider.value, 10);
    const lang = modal.querySelector('#v8-lang').value;
    const bd = modal.querySelector('input[name="v8-battle-display"]:checked')?.value || s.battleDisplay;
    const newSettings = {
      cameraMode: cam,
      autoCutin: auto,
      bgmVolume: bgm,
      sfxVolume: sfx,
      language: lang,
      cameraLocked: camLocked,
      battleDisplay: bd
    };
    saveSettings(newSettings);
    audio.playSFX('click');
    closeSettings();
    if (opts.onSave) opts.onSave(_cache);
  });

  const _cancel = () => {
    // 볼륨 원복
    audio.setBGMVolume(s.bgmVolume / 100);
    audio.setSFXVolume(s.sfxVolume / 100);
    closeSettings();
    if (opts.onCancel) opts.onCancel();
  };
  modal.querySelector('[data-cancel]').addEventListener('click', _cancel);

  // ESC 닫기
  const onKey = (e) => {
    if (e.key === 'Escape') { _cancel(); window.removeEventListener('keydown', onKey); }
  };
  window.addEventListener('keydown', onKey);
  overlay._onKeyHandler = onKey;

  return overlay;
}

export function closeSettings() {
  if (_overlay && _overlay.parentElement) {
    if (_overlay._onKeyHandler) window.removeEventListener('keydown', _overlay._onKeyHandler);
    _overlay.parentElement.removeChild(_overlay);
  }
  _overlay = null;
}

// 초기화 시 저장된 볼륨을 audio 모듈에 반영
(function initAudioFromSettings() {
  const s = _load();
  audio.setBGMVolume((s.bgmVolume || 0) / 100);
  audio.setSFXVolume((s.sfxVolume || 0) / 100);
})();
