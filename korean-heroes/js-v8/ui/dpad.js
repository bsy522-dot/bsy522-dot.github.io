// js-v8/ui/dpad.js
// 한국사 영웅전 v8 · 영걸전식 D-pad + A/B/L/R 버튼 (모바일 + 키보드 동시)
// ────────────────────────────────────────────────────────
// 사용:
//   import { initDPad, onDPadInput } from './ui/dpad.js';
//   initDPad();
//   onDPadInput((cmd) => {
//     // cmd: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'l' | 'r' | 'menu'
//   });
//
// 키보드 매핑:
//   ↑↓←→ : up/down/left/right
//   Z / Enter : a (결정)
//   X / Escape: b (취소)
//   Q : l (이전 유닛)
//   E : r (다음 유닛)
//   Space : menu (대기/턴종료)

const STYLE = `
#v8-dpad-root {
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 250;
  font-family: 'Noto Serif KR', serif;
  user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;
  display: none;
}
#v8-dpad-root.v8-dpad-on { display: block; }

/* ─── 가상 조이스틱 ─── */
#v8-joystick {
  position: absolute;
  left: 18px; bottom: 26px;
  width: 150px; height: 150px;
  pointer-events: auto;
  touch-action: none;
}
#v8-joystick .v8-joy-base {
  position: absolute; inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 32%, rgba(80,55,25,.85), rgba(20,12,4,.85) 70%),
    radial-gradient(circle at center, rgba(255,215,0,.07) 0%, transparent 60%);
  border: 3px solid rgba(196,149,106,.85);
  box-shadow:
    0 6px 16px rgba(0,0,0,.55),
    inset 0 -4px 12px rgba(0,0,0,.5),
    inset 0 0 24px rgba(0,0,0,.35);
}
#v8-joystick .v8-joy-base::after {
  /* 4방향 가이드 ▲▼◀▶ — 가상 십자 */
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 50% 12%, rgba(255,215,0,.35) 0 3px, transparent 4px),
    radial-gradient(circle at 50% 88%, rgba(255,215,0,.35) 0 3px, transparent 4px),
    radial-gradient(circle at 12% 50%, rgba(255,215,0,.35) 0 3px, transparent 4px),
    radial-gradient(circle at 88% 50%, rgba(255,215,0,.35) 0 3px, transparent 4px);
  pointer-events: none;
}
#v8-joystick .v8-joy-stick {
  position: absolute;
  left: 50%; top: 50%;
  width: 64px; height: 64px;
  margin: -32px 0 0 -32px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, #ffe890 0%, #c4956a 50%, #6b4226 100%);
  border: 3px solid #ffd700;
  box-shadow:
    0 4px 10px rgba(0,0,0,.55),
    inset 0 -3px 6px rgba(0,0,0,.4),
    inset 0 3px 6px rgba(255,255,255,.25);
  transition: transform .12s ease-out, background .1s;
  pointer-events: none;
}
#v8-joystick.v8-joy-active .v8-joy-stick {
  transition: none;
  background: radial-gradient(circle at 30% 30%, #fff5b0 0%, #ffd700 50%, #8a5a18 100%);
}
#v8-joystick .v8-joy-arrow {
  position: absolute;
  width: 20px; height: 20px;
  font-size: 16px; line-height: 1;
  color: #ffd700; opacity: 0; pointer-events: none;
  text-shadow: 0 0 8px #ffae20;
  transition: opacity .15s;
}
#v8-joystick .v8-joy-arrow.v8-on { opacity: 1; }
#v8-joystick .v8-joy-arr-up    { left: calc(50% - 10px); top: -8px; }
#v8-joystick .v8-joy-arr-down  { left: calc(50% - 10px); bottom: -8px; transform: rotate(180deg); }
#v8-joystick .v8-joy-arr-left  { left: -8px; top: calc(50% - 10px); transform: rotate(-90deg); }
#v8-joystick .v8-joy-arr-right { right: -8px; top: calc(50% - 10px); transform: rotate(90deg); }

#v8-dpad-ab {
  position: absolute;
  right: 14px; bottom: 22px;
  width: 156px; height: 130px;
  pointer-events: auto;
}
#v8-dpad-ab .v8-dpad-ab-btn {
  position: absolute;
  width: 64px; height: 64px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 900;
  font-family: 'Noto Serif KR', serif;
  cursor: pointer;
  border: 3px solid;
  box-shadow: 0 4px 10px rgba(0,0,0,.5), inset 0 -3px 6px rgba(0,0,0,.4);
  transition: transform .08s;
}
#v8-dpad-ab .v8-dpad-ab-btn:active,
#v8-dpad-ab .v8-dpad-ab-btn.v8-press {
  transform: scale(0.92);
}
#v8-dpad-ab .v8-dpad-a {
  right: 0; bottom: 0;
  background: radial-gradient(circle at 30% 30%, #6adc8a, #2a8a3a);
  border-color: #d8ffd8; color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,.6);
}
#v8-dpad-ab .v8-dpad-b {
  left: 0; top: 0;
  background: radial-gradient(circle at 30% 30%, #ff7a7a, #aa2828);
  border-color: #ffd8d8; color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,.6);
}
#v8-dpad-ab .v8-dpad-ab-label {
  position: absolute;
  font-size: 9px; color: #c4956a; letter-spacing: 1px;
  text-shadow: 0 1px 2px #000;
  pointer-events: none;
}

#v8-dpad-shoulder {
  position: absolute;
  left: 14px; right: 14px; top: 48px;  /* 상단 HUD 바(44px)와 겹치지 않게 */
  display: flex; justify-content: space-between;
  pointer-events: none;
}
#v8-dpad-shoulder .v8-dpad-sb {
  pointer-events: auto;
  width: 56px; height: 28px;
  background: linear-gradient(180deg, rgba(60,40,18,.92), rgba(20,12,4,.92));
  border: 2px solid #c4956a;
  border-radius: 14px;
  color: #ffd700;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,.5);
  transition: transform .08s, background .1s;
}
#v8-dpad-shoulder .v8-dpad-sb:active,
#v8-dpad-shoulder .v8-dpad-sb.v8-press {
  transform: scale(0.93);
  background: linear-gradient(180deg, #ffd700, #c4956a);
  color: #20100a;
}

/* 줌 +/- 버튼 — 우측 중앙 (A·B 위) */
#v8-dpad-zoom {
  position: absolute;
  right: 14px; bottom: 168px;
  display: flex; flex-direction: column; gap: 6px;
  pointer-events: auto;
}
#v8-dpad-zoom .v8-dpad-zb {
  width: 44px; height: 44px;
  background: radial-gradient(circle at 30% 30%, rgba(60,40,18,.95), rgba(20,12,4,.85));
  border: 2px solid #c4956a;
  border-radius: 50%;
  color: #ffd700;
  font-size: 22px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.5);
  transition: transform .08s, background .1s;
}
#v8-dpad-zoom .v8-dpad-zb:active,
#v8-dpad-zoom .v8-dpad-zb.v8-press {
  transform: scale(0.92);
  background: radial-gradient(circle at 30% 30%, #ffd700, #c4956a);
  color: #20100a;
}

#v8-dpad-menu {
  position: absolute;
  left: 50%; bottom: 20px; transform: translateX(-50%);
  pointer-events: auto;
  padding: 8px 22px;
  background: linear-gradient(180deg, rgba(60,40,18,.92), rgba(20,12,4,.92));
  border: 2px solid #c4956a;
  border-radius: 18px;
  color: #ffd700;
  font-size: 12px; font-weight: 700;
  letter-spacing: 3px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,.5);
  transition: transform .08s, background .1s;
}
#v8-dpad-menu:active,
#v8-dpad-menu.v8-press {
  transform: translateX(-50%) scale(0.93);
  background: linear-gradient(180deg, #ffd700, #c4956a);
  color: #20100a;
}

@media (min-width: 900px) and (hover: hover) and (pointer: fine) {
  /* PC 데스크톱은 키보드만 — D-pad 자동 숨김. URL ?dpad=1 강제 토글 */
  #v8-dpad-root.v8-dpad-mobile-only { display: none; }
}
`;

let _root  = null;
let _cb    = null;
let _isOn  = false;
let _keyHandler = null;

function _press(el) {
  if (!el) return;
  el.classList.add('v8-press');
  setTimeout(() => el.classList.remove('v8-press'), 90);
}

function _emit(cmd) {
  if (typeof _cb === 'function') _cb(cmd);
}

function _bindButton(el, cmd, repeatable = false) {
  if (!el) return;
  let interval = null;
  const trigger = (e) => {
    e.preventDefault();
    _press(el);
    _emit(cmd);
    if (repeatable) {
      // 길게 누르면 반복 (200ms 후 80ms 간격)
      clearTimeout(el._repeatTimer);
      el._repeatTimer = setTimeout(() => {
        interval = setInterval(() => _emit(cmd), 80);
      }, 220);
    }
  };
  const release = () => {
    clearTimeout(el._repeatTimer);
    if (interval) { clearInterval(interval); interval = null; }
  };
  el.addEventListener('touchstart', trigger, { passive: false });
  el.addEventListener('touchend',   release);
  el.addEventListener('touchcancel',release);
  el.addEventListener('mousedown',  trigger);
  el.addEventListener('mouseup',    release);
  el.addEventListener('mouseleave', release);
}

function _buildUI() {
  const css = document.createElement('style');
  css.id = 'v8-dpad-style';
  css.textContent = STYLE;
  document.head.appendChild(css);

  const root = document.createElement('div');
  root.id = 'v8-dpad-root';
  // 데스크톱은 자동 숨김 (?dpad=1 로 강제 표시)
  const params = new URLSearchParams(location.search);
  if (params.get('dpad') !== '1') root.classList.add('v8-dpad-mobile-only');
  root.innerHTML = `
    <div id="v8-dpad-shoulder">
      <div class="v8-dpad-sb v8-dpad-l" title="이전 유닛 (Q)">‹ L</div>
      <div class="v8-dpad-sb v8-dpad-r" title="다음 유닛 (E)">R ›</div>
    </div>
    <div id="v8-joystick">
      <div class="v8-joy-base"></div>
      <div class="v8-joy-arrow v8-joy-arr-up">▲</div>
      <div class="v8-joy-arrow v8-joy-arr-down">▲</div>
      <div class="v8-joy-arrow v8-joy-arr-left">▲</div>
      <div class="v8-joy-arrow v8-joy-arr-right">▲</div>
      <div class="v8-joy-stick"></div>
    </div>
    <div id="v8-dpad-zoom">
      <div class="v8-dpad-zb v8-dpad-zin"  title="줌인 (+)">+</div>
      <div class="v8-dpad-zb v8-dpad-zout" title="줌아웃 (−)">−</div>
    </div>
    <div id="v8-dpad-ab">
      <div class="v8-dpad-ab-btn v8-dpad-b">B</div>
      <div class="v8-dpad-ab-btn v8-dpad-a">A</div>
    </div>
    <div id="v8-dpad-menu" title="대기/턴종료 (Space)">대기</div>
  `;
  document.body.appendChild(root);

  _bindButton(root.querySelector('.v8-dpad-a'),     'a',     false);
  _bindButton(root.querySelector('.v8-dpad-b'),     'b',     false);
  _bindButton(root.querySelector('.v8-dpad-l'),     'l',     false);
  _bindButton(root.querySelector('.v8-dpad-r'),     'r',     false);
  _bindButton(root.querySelector('.v8-dpad-zin'),   'zin',   true);
  _bindButton(root.querySelector('.v8-dpad-zout'),  'zout',  true);
  _bindButton(root.querySelector('#v8-dpad-menu'),  'menu',  false);

  _bindJoystick(root.querySelector('#v8-joystick'));

  return root;
}

// ─── 가상 조이스틱 — 잡고 돌리면 그 방향으로 그리드 이동 ───
function _bindJoystick(joy) {
  if (!joy) return;
  const stick = joy.querySelector('.v8-joy-stick');
  const arrows = {
    up: joy.querySelector('.v8-joy-arr-up'),
    down: joy.querySelector('.v8-joy-arr-down'),
    left: joy.querySelector('.v8-joy-arr-left'),
    right: joy.querySelector('.v8-joy-arr-right'),
  };
  const STEP_MS = 180;     // 같은 방향 반복 간격
  const DEAD    = 14;      // 데드존(px)
  const MAX     = 50;      // 스틱 최대 변위(px)
  let active = false;
  let cx = 0, cy = 0;
  let curDir = null;
  let lastEmit = 0;
  let rafId = null;

  function _setArrow(dir) {
    for (const k of Object.keys(arrows)) arrows[k].classList.toggle('v8-on', k === dir);
  }
  function _dirOf(dx, dy) {
    const len = Math.hypot(dx, dy);
    if (len < DEAD) return null;
    // 4방향 — 큰 축이 우선
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    return dy > 0 ? 'down' : 'up';
  }
  function _onMoveTick() {
    rafId = null;
    if (!active || !curDir) return;
    const now = performance.now();
    if (now - lastEmit >= STEP_MS) {
      _emit(curDir);
      lastEmit = now;
    }
    rafId = requestAnimationFrame(_onMoveTick);
  }
  function _begin(x, y) {
    active = true;
    joy.classList.add('v8-joy-active');
    const r = joy.getBoundingClientRect();
    cx = r.left + r.width / 2;
    cy = r.top  + r.height / 2;
    _move(x, y, true);
  }
  function _move(x, y, immediate = false) {
    if (!active) return;
    let dx = x - cx;
    let dy = y - cy;
    const len = Math.hypot(dx, dy);
    if (len > MAX) { dx = dx * MAX / len; dy = dy * MAX / len; }
    stick.style.transform = `translate(${dx}px, ${dy}px)`;
    const dir = _dirOf(dx, dy);
    _setArrow(dir);
    if (dir !== curDir) {
      curDir = dir;
      if (dir) {
        _emit(dir);
        lastEmit = performance.now();
        if (!rafId) rafId = requestAnimationFrame(_onMoveTick);
      }
    } else if (dir && immediate) {
      // 첫 입력 즉시 emit
      lastEmit = performance.now();
      if (!rafId) rafId = requestAnimationFrame(_onMoveTick);
    }
  }
  function _end() {
    active = false;
    curDir = null;
    joy.classList.remove('v8-joy-active');
    stick.style.transform = '';
    _setArrow(null);
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  joy.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const t = e.changedTouches[0];
    _begin(t.clientX, t.clientY);
  }, { passive: false });
  joy.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const t = e.changedTouches[0];
    _move(t.clientX, t.clientY);
  }, { passive: false });
  joy.addEventListener('touchend',    _end);
  joy.addEventListener('touchcancel', _end);

  joy.addEventListener('mousedown', (e) => {
    e.preventDefault();
    _begin(e.clientX, e.clientY);
    const onMove = (ev) => _move(ev.clientX, ev.clientY);
    const onUp = () => {
      _end();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });
}

function _bindKeyboard() {
  _keyHandler = (e) => {
    if (!_isOn) return;
    // 입력 폼이 활성이면 무시
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    let cmd = null;
    switch (e.key) {
      case 'ArrowUp':    cmd = 'up'; break;
      case 'ArrowDown':  cmd = 'down'; break;
      case 'ArrowLeft':  cmd = 'left'; break;
      case 'ArrowRight': cmd = 'right'; break;
      case 'Enter':
      case 'z': case 'Z': cmd = 'a'; break;
      case 'Escape':
      case 'x': case 'X': cmd = 'b'; break;
      case 'q': case 'Q': cmd = 'l'; break;
      case 'e': case 'E': cmd = 'r'; break;
      case ' ':           cmd = 'menu'; break;
      case '+': case '=': cmd = 'zin';  break;
      case '-': case '_': cmd = 'zout'; break;
      default: return;
    }
    // 다이얼로그가 활성이면 dialogue가 Space/Enter 처리하도록 양보
    if (window.isDialogueActive && window.isDialogueActive()) return;
    e.preventDefault();
    _emit(cmd);
    // 시각 피드백 (해당 버튼/조이스틱 화살표)
    const map = {
      up: '.v8-joy-arr-up', down: '.v8-joy-arr-down', left: '.v8-joy-arr-left', right: '.v8-joy-arr-right',
      a: '.v8-dpad-a', b: '.v8-dpad-b', l: '.v8-dpad-l', r: '.v8-dpad-r',
      zin: '.v8-dpad-zin', zout: '.v8-dpad-zout',
      menu: '#v8-dpad-menu',
    };
    const sel = map[cmd];
    if (sel && _root) {
      const el = _root.querySelector(sel);
      if (el && el.classList.contains('v8-joy-arrow')) {
        el.classList.add('v8-on');
        setTimeout(() => el.classList.remove('v8-on'), 160);
      } else {
        _press(el);
      }
    }
  };
  // capture 단계 X — bubble 단계에서 잡아 dialogue 등 우선 핸들러 양보
  window.addEventListener('keydown', _keyHandler, false);
}

export function initDPad() {
  if (_root) return;
  _root = _buildUI();
  _bindKeyboard();
}

export function onDPadInput(cb) { _cb = cb; }

export function showDPad() {
  if (!_root) return;
  _root.classList.add('v8-dpad-on');
  _isOn = true;
}

export function hideDPad() {
  if (!_root) return;
  _root.classList.remove('v8-dpad-on');
  _isOn = false;
}

export function isDPadOn() { return _isOn; }
