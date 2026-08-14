// js-v8/ui/dialogue.js
// 한국사 영웅전 v8 · 대사 시스템
// 하단 20~22% 높이 대사 박스 · 금색 테두리 · 타이핑 효과 30ms/글자
// 화자 이름 금색 + 포트레이트 이모지 (portraits.json).
//
// export:
//   showDialogue(lines, onComplete)  → Promise<void>
//   hideDialogue()
//   class DialogueRunner

import portraitsData from '../data/portraits_data.js';
import { getPortraitSVG } from './portrait_art.js';

const TYPE_SPEED_MS = 30;
let _el = null;
let _current = null;

// 대화 표시 중 화면 전체 탭 진행에서 제외할 인터랙티브 요소
// (버튼/메뉴/디패드/설정/오버레이 위 탭은 대화 진행으로 처리하지 않음)
const INTERACTIVE_GUARD_SELECTOR = [
  'button', 'a', 'input', 'select', 'textarea', 'label',
  '[role="button"]',
  '#v8-hud',
  '#v8-dpad-root',
  '.v8-overlay',
].join(',');

function _ensureBigPortraitStyles() {
  if (document.getElementById('v8-dlg-bp-style')) return;
  const s = document.createElement('style');
  s.id = 'v8-dlg-bp-style';
  s.textContent = `
    #v8-dlg-bigportrait {
      position: fixed;
      left: 5vw;
      top: 18vh;
      width: clamp(170px, 32vw, 360px);
      height: clamp(220px, 40vw, 460px);
      z-index: 210; /* turn-banner(200), dialogue(100) 위 */
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(120px, 24vw, 280px);
      border-radius: 22px;
      border: 4px solid #c4956a;
      background:
        radial-gradient(circle at 30% 25%, rgba(255,220,150,0.55), rgba(120,70,30,0.4) 45%, rgba(40,20,10,0.92) 100%),
        linear-gradient(180deg, rgba(80,50,20,0.4) 0%, rgba(20,10,4,0.7) 100%);
      box-shadow:
        0 0 40px rgba(255,170,60,.55),
        0 0 80px rgba(255,140,40,.3),
        inset 0 0 30px rgba(0,0,0,.4),
        0 14px 36px rgba(0,0,0,.7);
      transition: transform .4s cubic-bezier(.2,.9,.3,1.1), opacity .4s ease, border-color .3s;
      transform: translateX(-40px) scale(0.85);
      opacity: 0;
      filter: drop-shadow(0 8px 18px rgba(0,0,0,.7));
      visibility: hidden;
    }
    #v8-dlg-bigportrait.v8-show {
      transform: translateX(0) scale(1);
      opacity: 1;
      visibility: visible;
    }
    /* portrait 안 광택 */
    #v8-dlg-bigportrait::before {
      content: '';
      position: absolute;
      inset: 8px;
      border-radius: 16px;
      border: 1.5px solid rgba(255,220,150,0.35);
      pointer-events: none;
    }
    /* 이름 라벨 — 카드 하단 안쪽(overflow:hidden에 잘리지 않게 내부 배치) */
    #v8-dlg-bigportrait .v8-bp-name {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      z-index: 2;
      text-align: center;
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(16px, 2.6vw, 26px);
      font-weight: 900;
      color: var(--bp-color, #ffd700);
      letter-spacing: 5px;
      text-shadow: 0 2px 8px #000, 0 0 14px rgba(255,180,40,.8);
      padding: 22px 8px 8px;
      background: linear-gradient(180deg, rgba(10,6,2,0) 0%, rgba(10,6,2,0.75) 55%, rgba(10,6,2,0.92) 100%);
      pointer-events: none;
      border-radius: 0 0 18px 18px;
    }
    #v8-dlg-bigportrait .v8-bp-art {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; border-radius: 18px;
    }
    #v8-dlg-bigportrait .v8-bp-art > svg { width: 100%; height: 100%; }
    #v8-dlg-bigportrait .v8-bp-art > img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    /* 3D 무대 컴팩트 모드 — 무대가 보이도록 초상을 좌하단 소형으로 */
    #v8-dlg-bigportrait.v8-compact {
      top: auto;
      bottom: calc(24% + 20px);
      left: 3vw;
      width: clamp(110px, 17vw, 190px);
      height: clamp(140px, 21vw, 240px);
      font-size: clamp(70px, 12vw, 140px);
    }
    @media (max-width: 720px) {
      #v8-dlg-bigportrait.v8-compact {
        bottom: calc(28% + 16px);
        width: clamp(96px, 26vw, 150px);
        height: clamp(120px, 32vw, 190px);
      }
    }
    @media (max-width: 720px) {
      #v8-dlg-bigportrait {
        left: 4vw; top: 12vh;
        width: clamp(140px, 38vw, 220px);
        height: clamp(180px, 48vw, 280px);
        font-size: clamp(100px, 28vw, 180px);
      }
      #v8-dlg-bigportrait .v8-bp-name { font-size: clamp(14px, 4vw, 20px); letter-spacing: 3px; }
    }
    /* SVG 모드 — 일러스트가 박스를 채움 */
    #v8-dlg-bigportrait.v8-svg-art {
      font-size: 0;
      padding: 0;
      overflow: hidden;
    }
    #v8-dlg-bigportrait.v8-svg-art > svg {
      width: 100% !important;
      height: 100% !important;
      border-radius: 18px;
    }
  `;
  document.head.appendChild(s);
}

function _ensureElement() {
  if (_el) return _el;
  _ensureBigPortraitStyles();

  // 큰 화자 portrait (배경 일러스트 역할) — 내부에 아트 컨테이너 + 이름표
  const bp = document.createElement('div');
  bp.id = 'v8-dlg-bigportrait';
  bp.innerHTML = '<div class="v8-bp-art"></div><div class="v8-bp-name"></div>';
  document.body.appendChild(bp);

  const el = document.createElement('div');
  el.id = 'v8-dialogue';
  el.innerHTML = `
    <div class="v8-dlg-head">
      <div class="v8-dlg-portrait" id="v8-dlg-portrait">📜</div>
      <div class="v8-dlg-speaker" id="v8-dlg-speaker">—</div>
    </div>
    <div class="v8-dlg-text" id="v8-dlg-text"></div>
    <div class="v8-dlg-next" id="v8-dlg-next">▼ 터치하여 계속</div>
  `;
  document.body.appendChild(el);
  _el = el;
  return el;
}

export class DialogueRunner {
  constructor(lines, onComplete, opts = {}) {
    this.lines = Array.isArray(lines) ? lines : [];
    this.onComplete = onComplete;
    this.opts = opts;   // { onLine(line, index), compactPortrait }
    this.index = -1;
    this.charIdx = 0;
    this.typing = false;
    this.el = _ensureElement();
    this.portraitEl = this.el.querySelector('#v8-dlg-portrait');
    this.speakerEl = this.el.querySelector('#v8-dlg-speaker');
    this.textEl = this.el.querySelector('#v8-dlg-text');
    this.nextEl = this.el.querySelector('#v8-dlg-next');
    this.typingTimer = null;
    this._onClick = this._onClick.bind(this);
    this._onKey = this._onKey.bind(this);
    this._onDocTap = this._onDocTap.bind(this);
    this.disposed = false;
  }

  start() {
    if (this.lines.length === 0) {
      this._finish();
      return;
    }
    _current = this;
    this.el.classList.add('v8-visible');
    if (this.opts.compactPortrait) {
      const bp = document.getElementById('v8-dlg-bigportrait');
      if (bp) bp.classList.add('v8-compact');
    }
    // 대화 표시 중에는 화면 어디를 탭해도 진행 — 단, 버튼/메뉴/dpad/설정 등
    // 인터랙티브 요소 위 탭은 제외(INTERACTIVE_GUARD_SELECTOR로 가드).
    // bubble 단계에 document에서 잡으므로, canvas 등 하위 핸들러가 먼저 실행되어
    // isDialogueActive()로 양보한 뒤에야 대화가 진행된다.
    document.addEventListener('click', this._onDocTap);
    window.addEventListener('keydown', this._onKey);
    this._advance();
  }

  _onKey(e) {
    // Space/Enter/화살표로 진행
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
      e.preventDefault();
      this._onClick();
    } else if (e.key === 'Escape') {
      this._finish();
    }
  }

  _onClick() {
    if (this.disposed) return;
    if (this.typing) {
      // 타이핑 중이면 스킵 → 즉시 전체 표시
      this._skipTyping();
    } else {
      this._advance();
    }
  }

  // 화면 전체 탭 진행 — 대화 표시 중 + 인터랙티브 요소가 아닐 때만
  _onDocTap(e) {
    if (this.disposed) return;
    if (!this.el.classList.contains('v8-visible')) return;
    const t = e && e.target;
    if (t && t.closest && t.closest(INTERACTIVE_GUARD_SELECTOR)) return;
    this._onClick();
  }

  _advance() {
    this.index++;
    if (this.index >= this.lines.length) {
      this._finish();
      return;
    }
    const line = this.lines[this.index];
    const pid = line.speakerId || line.portrait;
    const p = (pid && portraitsData[pid]) || { emoji: '📜', color: '#888' };
    this.portraitEl.textContent = p.emoji;
    this.portraitEl.style.borderColor = p.color;
    this.speakerEl.textContent = line.speaker || (pid ? pid : '');
    this.speakerEl.style.color = p.color && p.color !== '#888' ? p.color : '#FFD700';

    // 큰 화자 portrait 갱신 (영걸전 스타일 일러스트 영역)
    // 우선순위: PNG image > SVG > emoji fallback
    const bp = document.getElementById('v8-dlg-bigportrait');
    if (bp) {
      const artEl = bp.querySelector('.v8-bp-art');
      const nameEl = bp.querySelector('.v8-bp-name');
      if (line.text && pid && artEl) {
        // 큰 초상 우선순위: PNG(애니메이션급 25종) > SVG > emoji
        if (p.image) {
          artEl.innerHTML = `<img src="${p.image}" alt="${pid}">`;
          bp.classList.add('v8-svg-art');
        } else {
          const svg = getPortraitSVG(pid);
          if (svg) {
            artEl.innerHTML = svg;
            bp.classList.add('v8-svg-art');
          } else {
            artEl.innerHTML = '';
            artEl.textContent = p.emoji;
            bp.classList.remove('v8-svg-art');
          }
        }
        if (nameEl) nameEl.textContent = line.speaker || pid;
        bp.style.setProperty('--bp-color', p.color || '#ffd700');
        bp.style.borderColor = p.color || '#c4956a';
        bp.classList.add('v8-show');
      } else {
        bp.classList.remove('v8-show');
      }
    }

    // 외부 훅 — 3D 무대 화자 강조/카메라 팬 등
    if (this.opts.onLine) {
      try { this.opts.onLine(line, this.index); } catch (e) { console.error('[dialogue] onLine err', e); }
    }

    this.textEl.textContent = '';
    this.nextEl.classList.remove('v8-ready');
    this._startTyping(line.text || '');
  }

  _startTyping(fullText) {
    this.typing = true;
    this.charIdx = 0;
    const step = () => {
      if (!this.typing || this.disposed) return;
      this.charIdx++;
      this.textEl.textContent = fullText.slice(0, this.charIdx);
      if (this.charIdx >= fullText.length) {
        this.typing = false;
        this.nextEl.classList.add('v8-ready');
        return;
      }
      this.typingTimer = setTimeout(step, TYPE_SPEED_MS);
    };
    // 첫 글자 즉시
    step();
  }

  _skipTyping() {
    if (this.typingTimer) { clearTimeout(this.typingTimer); this.typingTimer = null; }
    this.typing = false;
    const line = this.lines[this.index];
    this.textEl.textContent = line ? (line.text || '') : '';
    this.nextEl.classList.add('v8-ready');
  }

  _finish() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.typingTimer) { clearTimeout(this.typingTimer); this.typingTimer = null; }
    this.el.classList.remove('v8-visible');
    const bp = document.getElementById('v8-dlg-bigportrait');
    if (bp) { bp.classList.remove('v8-show'); bp.classList.remove('v8-compact'); }
    document.removeEventListener('click', this._onDocTap);
    window.removeEventListener('keydown', this._onKey);
    if (_current === this) _current = null;
    if (this.onComplete) {
      try { this.onComplete(); } catch (e) { console.error('[dialogue] onComplete err', e); }
    }
  }

  /** 외부에서 강제 종료 */
  abort() { this._finish(); }
}

// ─────────────────────────────────────────────
// 편의 함수 — Promise 반환
export function showDialogue(lines, onComplete) {
  if (_current) _current.abort();
  return new Promise(resolve => {
    const r = new DialogueRunner(lines, () => {
      if (onComplete) onComplete();
      resolve();
    });
    r.start();
  });
}

export function hideDialogue() {
  if (_current) _current.abort();
}

export function isDialogueActive() {
  return !!_current;
}
