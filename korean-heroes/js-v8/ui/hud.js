// js-v8/ui/hud.js
// 한국사 영웅전 v8 · 전투 HUD
// 상단바: 턴/아군|적/날씨/설정/카메라
// 하단 유닛 패널: 포트레이트 + 이름 + Lv + HP/MP/XP 바 + 액션 버튼
// 미니맵: 80x80 Canvas (아군 녹점, 적 적점, 지형 약식)
//
// export:
//   initHUD(container)
//   updateHUD(state)
//   showUnitPanel(unit, options)
//   hideUnitPanel()
//   setMinimap(unitsFn, mapFn)
//   onAction(cb)  // cb({action, unit})
//   onCameraChange(cb)
//   onSettings(cb)
//   getHudConfig() / setHudConfig(partial)  // 노이즈 요소 표시 토글
//
// HUD 다이어트(미니멀 영걸전): 상단 카메라 버튼·아군/적 카운터는 노이즈로 보고 기본 비표시.
//   카메라 선택은 ⚙ 설정에서 그대로 가능하므로 기능 손실 없음.
//   필수(턴·날씨·HP/MP/XP·액션·행동큐)는 항상 유지. 모든 토글은 display 제어만 — DOM 삭제 없음.

import portraitsData from '../data/portraits_data.js';
import { getPortraitSVG as _getPortraitSVG } from './portrait_art.js';

// 날씨 아이콘 — OS 이모지는 기종마다 모양이 달라져 게임 아트로 부적합(감사 싸구려 #2).
// 인라인 SVG로 통일한다.
const WEATHER_ICON = {
  clear: '<svg viewBox="0 0 24 24" class="v8-wx"><circle cx="12" cy="12" r="5" fill="#ffd24a"/>'
       + '<g stroke="#ffd24a" stroke-width="2" stroke-linecap="round">'
       + '<path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1"/></g></svg>',
  rain:  '<svg viewBox="0 0 24 24" class="v8-wx"><path d="M7 15a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.4 1.6A3.4 3.4 0 0 1 17.5 15z" fill="#c8d8e8"/>'
       + '<g stroke="#7ab8ff" stroke-width="2" stroke-linecap="round"><path d="M8 17.5l-1 3M12.5 17.5l-1 3M17 17.5l-1 3"/></g></svg>',
  snow:  '<svg viewBox="0 0 24 24" class="v8-wx"><g stroke="#dff0ff" stroke-width="2" stroke-linecap="round">'
       + '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/></g></svg>',
  fog:   '<svg viewBox="0 0 24 24" class="v8-wx"><g stroke="#c8c8c0" stroke-width="2.4" stroke-linecap="round">'
       + '<path d="M4 8h16M3 12h14M6 16h15M4 20h12"/></g></svg>',
};

// 미니맵 타일 색 — maps.json tileLegend의 이름 기준
const MINIMAP_COLOR = {
  plain:          '#5c7a44',
  grass:          '#44632f',
  forest:         '#27431f',
  mountain:       '#6b6055',
  wall:           '#6b6055',
  water:          '#33608f',
  road:           '#b09a72',
  sindansu:       '#d8b840',
  sacred:         '#d8b840',
  building_floor: '#8b6b3a',
  village:        '#8b6b3a',
};

const CAMERA_LABEL = {
  tactical: '택티컬',
  character: '캐릭터',
  squad: '분대'
};

// 노이즈 요소 표시 토글 — 기본값은 미니멀(영걸전 톤).
//   showCameraToggle: 상단 카메라 버튼 + 드롭다운 (설정 ⚙에서 카메라 변경 가능하므로 기본 off)
//   showUnitCount: 상단 "아군 N / 적 N" 카운터 (과잉 정보, 기본 off)
//   showMinimap: 우측 미니맵 (전술 정보로 유용, 기본 on)
const HUD_CONFIG = {
  showCameraToggle: false,
  showUnitCount: true,   // 2026-07-17 개편: 전투 병력 수는 핵심 정보 (대화/마을에선 씬 클래스로 숨김)
  showMinimap: true
};

let _root = null;
let _actionCb = null;
let _cameraCb = null;
let _settingsCb = null;
let _minimapCanvas = null;
let _minimapUnitsFn = null;  // () => [{x,y,team}]
let _minimapMapFn = null;    // () => { w, h, tiles: [[type,...],...] }
let _currentUnit = null;
let _selectedAction = null;
let _camLock = false;  // EP.1 Tactical 잠금 표시용

// ─────────────────────────────────────────────
export function initHUD(container) {
  if (_root) return _root;
  const c = container || document.body;

  // 외부 CSS 자동 로드 (styles.css가 없으면)
  _ensureStyles();

  const root = document.createElement('div');
  root.id = 'v8-hud';
  root.innerHTML = `
    <div id="v8-hud-top">
      <div class="v8-slot">
        <span class="v8-turn" id="v8-turn-badge">턴 <span id="v8-turn-num">1</span> · <span id="v8-turn-side">아군 턴</span></span>
        <span class="v8-turn" id="v8-ally-count"><b class="v8-cnt-ally">아군 0</b> <i>vs</i> <b class="v8-cnt-enemy">적 0</b></span>
        <span class="v8-turn" id="v8-objective"></span>
        <span class="v8-turn" id="v8-location"></span>
      </div>
      <div class="v8-slot">
        <span class="v8-weather" id="v8-weather" title="날씨">☀️</span>
        <button id="v8-btn-settings" type="button" aria-label="설정">⚙</button>
        <button id="v8-cam-toggle" type="button">카메라: 택티컬 ▼</button>
      </div>
    </div>
    <div id="v8-cam-dropdown">
      <div class="v8-cam-item" data-cam="tactical">택티컬 (전체 파악)</div>
      <div class="v8-cam-item" data-cam="character">캐릭터 (몰입)</div>
      <div class="v8-cam-item" data-cam="squad">분대 (진군)</div>
    </div>
    <canvas id="v8-minimap" width="80" height="80"></canvas>
    <div id="v8-unit-panel" role="region" aria-label="유닛 정보 패널">
      <div class="v8-unit-head">
        <div class="v8-unit-portrait" id="v8-up-portrait">🧍</div>
        <div>
          <div class="v8-unit-name" id="v8-up-name">—</div>
          <div class="v8-unit-lv" id="v8-up-lv">Lv.1</div>
        </div>
      </div>
      <div class="v8-bars">
        <div class="v8-bar"><span class="v8-bar-label">HP</span>
          <div class="v8-bar-track"><div class="v8-bar-fill hp-full" id="v8-up-hp-fill" style="width:100%"></div></div>
          <span class="v8-bar-val" id="v8-up-hp-val">0/0</span>
        </div>
        <div class="v8-bar"><span class="v8-bar-label">MP</span>
          <div class="v8-bar-track"><div class="v8-bar-fill mp" id="v8-up-mp-fill" style="width:100%"></div></div>
          <span class="v8-bar-val" id="v8-up-mp-val">0/0</span>
        </div>
        <div class="v8-bar"><span class="v8-bar-label">XP</span>
          <div class="v8-bar-track"><div class="v8-bar-fill xp" id="v8-up-xp-fill" style="width:0%"></div></div>
          <span class="v8-bar-val" id="v8-up-xp-val">0/100</span>
        </div>
      </div>
      <div class="v8-actions">
        <button class="v8-action-btn v8-atk" data-act="attack">공격</button>
        <button class="v8-action-btn v8-skl" data-act="skill">스킬 ▾</button>
        <button class="v8-action-btn v8-itm" data-act="item">아이템</button>
        <button class="v8-action-btn v8-wait" data-act="wait">대기</button>
      </div>
    </div>
  `;
  c.appendChild(root);
  _root = root;
  _minimapCanvas = root.querySelector('#v8-minimap');

  // 이벤트 바인딩
  root.querySelector('#v8-btn-settings').addEventListener('click', () => {
    if (_settingsCb) _settingsCb();
  });

  const camBtn = root.querySelector('#v8-cam-toggle');
  const camDd = root.querySelector('#v8-cam-dropdown');
  camBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (_camLock) return;
    camDd.classList.toggle('v8-open');
  });
  document.addEventListener('click', (e) => {
    if (!camDd.contains(e.target) && e.target !== camBtn) camDd.classList.remove('v8-open');
  });
  camDd.querySelectorAll('.v8-cam-item').forEach(item => {
    item.addEventListener('click', () => {
      const mode = item.dataset.cam;
      camDd.classList.remove('v8-open');
      camBtn.textContent = `카메라: ${CAMERA_LABEL[mode]} ▼`;
      [...camDd.children].forEach(c => c.classList.remove('v8-active'));
      item.classList.add('v8-active');
      if (_cameraCb) _cameraCb(mode);
    });
  });

  // 액션 버튼
  root.querySelectorAll('.v8-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.act;
      _selectedAction = act;
      if (_actionCb) _actionCb({ action: act, unit: _currentUnit, btn });
    });
  });

  // 키보드 1/2/3 (카메라 토글도 camera/switcher에서 처리하지만, HUD 표시 동기화)
  window.addEventListener('keydown', (e) => {
    if (_camLock) return;
    const m = { '1': 'tactical', '2': 'character', '3': 'squad' }[e.key];
    if (m) {
      const item = camDd.querySelector(`[data-cam="${m}"]`);
      if (item) item.click();
    }
  });

  // 노이즈 요소 초기 표시 상태 반영 (실패해도 HUD 자체는 정상 동작)
  _applyHudConfig();

  return root;
}

// ─────────────────────────────────────────────
// 노이즈 요소(상단 카메라 버튼·아군/적 카운터·미니맵) display 토글.
// DOM은 삭제하지 않고 display만 제어 → 다른 코드의 querySelector 참조가 깨지지 않음.
function _applyHudConfig() {
  if (!_root) return;
  try {
    const camBtn = _root.querySelector('#v8-cam-toggle');
    const camDd = _root.querySelector('#v8-cam-dropdown');
    if (camBtn) camBtn.style.display = HUD_CONFIG.showCameraToggle ? '' : 'none';
    if (camDd && !HUD_CONFIG.showCameraToggle) camDd.classList.remove('v8-open');

    const allyCount = _root.querySelector('#v8-ally-count');
    if (allyCount) allyCount.style.display = HUD_CONFIG.showUnitCount ? '' : 'none';

    const minimap = _root.querySelector('#v8-minimap');
    if (minimap) minimap.style.display = HUD_CONFIG.showMinimap ? '' : 'none';
  } catch (e) {
    console.warn('[hud] applyHudConfig failed', e);
  }
}

function _ensureStyles() {
  if (document.querySelector('link[data-v8-ui-styles]')) return;
  // 동일 디렉토리 styles.css 자동 로드 (import.meta.url 기반)
  try {
    const url = new URL('./styles.css', import.meta.url).href;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-v8-ui-styles', '1');
    document.head.appendChild(link);
  } catch (e) {
    console.warn('[hud] styles auto-load failed', e);
  }
}

// ─────────────────────────────────────────────
// HUD 상단 갱신 — state: { turn, side, weather, allyAlive, enemyAlive, camMode, camLocked }
export function updateHUD(state) {
  if (!_root) return;
  if (state.turn !== undefined) _root.querySelector('#v8-turn-num').textContent = state.turn;
  if (state.side !== undefined) {
    const sideEl = _root.querySelector('#v8-turn-side');
    sideEl.textContent = state.side === 'ally' ? '아군 턴' : '적군 턴';
    sideEl.classList.toggle('v8-side-enemy', state.side !== 'ally');
  }
  if (state.weather !== undefined) {
    _root.querySelector('#v8-weather').innerHTML = WEATHER_ICON[state.weather] || WEATHER_ICON.clear;
  }
  // 아군/적 생존 수
  if (state.allyAlive !== undefined || state.enemyAlive !== undefined) {
    const a = _root.querySelector('#v8-ally-count .v8-cnt-ally');
    const e = _root.querySelector('#v8-ally-count .v8-cnt-enemy');
    if (a && state.allyAlive !== undefined) a.textContent = `아군 ${state.allyAlive}`;
    if (e && state.enemyAlive !== undefined) e.textContent = `적 ${state.enemyAlive}`;
  }
  // 승리 조건 / 위치 라벨
  if (state.objective !== undefined) {
    const ob = _root.querySelector('#v8-objective');
    if (ob) ob.textContent = state.objective ? `⚑ ${state.objective}` : '';
  }
  if (state.location !== undefined) {
    const lc = _root.querySelector('#v8-location');
    if (lc) lc.textContent = state.location || '';
  }
  // 상단 카메라 버튼/드롭다운 — 노이즈로 분류, 표시될 때만 갱신 (_camLock 상태는 항상 추적)
  if (state.camLocked !== undefined) _camLock = !!state.camLocked;
  if (HUD_CONFIG.showCameraToggle) {
    if (state.camMode !== undefined) {
      const btn = _root.querySelector('#v8-cam-toggle');
      if (btn) btn.textContent = `카메라: ${CAMERA_LABEL[state.camMode] || state.camMode} ${_camLock ? '🔒' : '▼'}`;
      _root.querySelectorAll('#v8-cam-dropdown .v8-cam-item').forEach(c => {
        c.classList.toggle('v8-active', c.dataset.cam === state.camMode);
      });
    }
    if (state.camLocked !== undefined) {
      const btn = _root.querySelector('#v8-cam-toggle');
      if (btn) {
        btn.style.opacity = _camLock ? '0.6' : '1';
        btn.style.cursor = _camLock ? 'not-allowed' : 'pointer';
      }
    }
  }
  _drawMinimap();
}

// ─────────────────────────────────────────────
// 유닛 패널
export function showUnitPanel(unit, opts = {}) {
  if (!_root || !unit) return;
  _currentUnit = unit;
  const panel = _root.querySelector('#v8-unit-panel');
  panel.classList.add('v8-visible');
  // 하단 조작 버튼이 패널을 피해 올라가도록 (styles.css .v8-panel-open)
  document.body.classList.add('v8-panel-open');

  const portrait = portraitsData[unit.portraitId || unit.id] || { emoji: '🧍', color: '#888' };
  const pEl = _root.querySelector('#v8-up-portrait');
  // ★ 2026-07-17: 고품질 SVG 초상 우선, 없으면 emoji
  {
    let svg = null;
    try { svg = _getPortraitSVG ? _getPortraitSVG(unit.portraitId || unit.id) : null; } catch (e) { svg = null; }
    if (svg) {
      pEl.innerHTML = svg;
      pEl.style.overflow = 'hidden';
    } else {
      pEl.textContent = portrait.emoji;
    }
  }
  pEl.style.borderColor = portrait.color;

  _root.querySelector('#v8-up-name').textContent = unit.name || unit.id || '—';
  _root.querySelector('#v8-up-lv').textContent = `Lv.${unit.level || 1} · ${unit.class || ''}`;

  const hp = unit.hp ?? 0, hpMax = unit.hpMax ?? unit.maxHp ?? 1;
  const mp = unit.mp ?? 0, mpMax = unit.mpMax ?? unit.maxMp ?? 1;
  const xp = unit.xp ?? 0, xpMax = unit.xpMax ?? 100;

  const hpPct = Math.max(0, Math.min(100, (hp / hpMax) * 100));
  const hpFill = _root.querySelector('#v8-up-hp-fill');
  hpFill.style.width = `${hpPct}%`;
  hpFill.classList.toggle('hp-full', hpPct > 30);
  hpFill.classList.toggle('hp-low', hpPct <= 30);
  _root.querySelector('#v8-up-hp-val').textContent = `${hp}/${hpMax}`;

  const mpPct = Math.max(0, Math.min(100, (mp / mpMax) * 100));
  _root.querySelector('#v8-up-mp-fill').style.width = `${mpPct}%`;
  _root.querySelector('#v8-up-mp-val').textContent = `${mp}/${mpMax}`;

  const xpPct = Math.max(0, Math.min(100, (xp / xpMax) * 100));
  _root.querySelector('#v8-up-xp-fill').style.width = `${xpPct}%`;
  _root.querySelector('#v8-up-xp-val').textContent = `${xp}/${xpMax}`;

  // 액션 버튼 활성/비활성
  const actions = opts.actions || ['attack', 'skill', 'item', 'wait'];
  _root.querySelectorAll('.v8-action-btn').forEach(btn => {
    const act = btn.dataset.act;
    const active = actions.includes(act);
    btn.disabled = !active || (unit.acted === true);
    btn.style.display = active ? '' : 'none';
  });
}

export function hideUnitPanel() {
  if (!_root) return;
  _root.querySelector('#v8-unit-panel').classList.remove('v8-visible');
  document.body.classList.remove('v8-panel-open');
  _currentUnit = null;
  _selectedAction = null;
}

// ─────────────────────────────────────────────
// 미니맵
export function setMinimap(unitsFn, mapFn) {
  _minimapUnitsFn = unitsFn;
  _minimapMapFn = mapFn;
  _drawMinimap();
}

function _drawMinimap() {
  if (!_minimapCanvas) return;
  if (!HUD_CONFIG.showMinimap) return;  // 숨김 상태면 그리지 않음 (canvas는 DOM에 유지)
  const ctx = _minimapCanvas.getContext('2d');
  const W = _minimapCanvas.width, H = _minimapCanvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = false;

  const map = _minimapMapFn ? _minimapMapFn() : null;
  const units = _minimapUnitsFn ? _minimapUnitsFn() : [];

  const mw = (map && map.w) || 10;
  const mh = (map && map.h) || 10;
  const tw = W / mw, th = H / mh;

  // 지형 — ★ 2026-08-31: plain/grass가 전부 기본 남색으로 떨어져 "검은 사각형에
  //   갈색 십자"로만 보이던 문제(감사 싸구려 #7). 타일 종류별 색을 모두 채운다.
  if (map && map.tiles) {
    for (let y = 0; y < mh; y++) {
      for (let x = 0; x < mw; x++) {
        const t = map.tiles[y] && map.tiles[y][x];
        const color = MINIMAP_COLOR[t] || MINIMAP_COLOR.plain;
        ctx.fillStyle = color;
        ctx.fillRect(x * tw, y * th, Math.ceil(tw), Math.ceil(th));
      }
    }
  } else {
    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(0, 0, W, H);
  }

  // 유닛 점
  units.forEach(u => {
    if (u.hp !== undefined && u.hp <= 0) return;
    ctx.fillStyle = u.team === 'ally' ? '#4a2' : '#a22';
    const cx = (u.x + 0.5) * tw;
    const cy = (u.y + 0.5) * th;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(2, Math.min(tw, th) / 2), 0, Math.PI * 2);
    ctx.fill();
    if (u.isLeader) {
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  });

  // 테두리
  ctx.strokeStyle = '#8B6B3D';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
}

// ─────────────────────────────────────────────
// 이벤트 등록
export function onAction(cb) { _actionCb = cb; }
export function onCameraChange(cb) { _cameraCb = cb; }
export function onSettings(cb) { _settingsCb = cb; }

// ─────────────────────────────────────────────
// HUD 노이즈 요소 표시 설정 (미니멀 토글)
//   getHudConfig() → 현재 설정 사본
//   setHudConfig({ showCameraToggle, showUnitCount, showMinimap }) → 부분 갱신 후 즉시 반영
// ─────────────────────────────────────────────
// 씬 모드별 HUD 구성 — 영걸전식.
//   battle:      턴·병력·승리조건·미니맵 전부 표시
//   exploration: 위치 라벨 + 미니맵만 (턴/병력 숨김)
//   dialogue:    상단바·미니맵 전부 숨김 (무대에 집중)
//   title:       전부 숨김
export function setHUDScene(sceneMode) {
  if (!_root) return;
  _root.classList.remove('v8-scene-battle', 'v8-scene-exploration', 'v8-scene-dialogue', 'v8-scene-title');
  _root.classList.add(`v8-scene-${sceneMode}`);
}

export function getHudConfig() { return { ...HUD_CONFIG }; }
export function setHudConfig(partial) {
  if (partial && typeof partial === 'object') {
    if (partial.showCameraToggle !== undefined) HUD_CONFIG.showCameraToggle = !!partial.showCameraToggle;
    if (partial.showUnitCount !== undefined) HUD_CONFIG.showUnitCount = !!partial.showUnitCount;
    if (partial.showMinimap !== undefined) HUD_CONFIG.showMinimap = !!partial.showMinimap;
  }
  _applyHudConfig();
  if (HUD_CONFIG.showMinimap) _drawMinimap();  // 재노출 시 즉시 갱신
  return { ...HUD_CONFIG };
}

// 디버그용
export function _getRoot() { return _root; }
