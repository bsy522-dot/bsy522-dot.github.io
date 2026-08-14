// js-v8/ui/cutin.js
// 한국사 영웅전 v8 · 전투 컷인 HTML 오버레이
// 원본 korean-rpg-3d.html:682-713 드라마틱 컷인 UX 이식.
//
// 구조:
//   Phase 1 (0-300ms)   : 좌/우 슬라이드 인 + 배경 암막
//   Phase 2 (300-900ms) : 공격자/피격자 shake + 스킬명 펄스
//   Phase 3 (900-1500ms): 데미지 숫자 팝업 + 크리티컬
//   Phase 4 (1500-1800ms): 페이드 아웃
//
// API:
//   new CutinOverlay(container)
//   await overlay.play({ attacker, target, dmg, skillName, crit, element })
//   overlay.destroy()
//
// 원본 스펙 ≈1500ms 보존 + 페이드 여유 300ms.

const ELEMENT_COLORS = {
  fire:    '#ff6a2a',
  thunder: '#ffd700',
  water:   '#4aa0ff',
  wind:    '#6adc8a',
  holy:    '#fff2a0',
  slash:   '#ffffff',
};

// 유닛 타입별 fallback 이모지
const UNIT_TYPE_EMOJI = {
  '보병':   '⚔️',
  '궁병':   '🏹',
  '기마병': '🐎',
  '신장':   '👑',
  '풍백':   '🌬️',
  '우사':   '🌧️',
  '운사':   '☁️',
  '승려':   '🙏',
  '샤먼':   '🔮',
};

let _portraitMap = null;
let _portraitSvgGetter = null;

/** 포트레이트 JSON 주입 (korean-rpg-v8.html에서 로드 후 등록) */
export function registerPortraits(portraitsData) {
  _portraitMap = portraitsData || null;
}

/** SVG 일러스트 getter 주입 — getter(id) -> svg string | null
 *  (portrait_art.js의 getPortraitSVG를 v8.html에서 등록) */
export function registerPortraitArt(getter) {
  _portraitSvgGetter = (typeof getter === 'function') ? getter : null;
}

function resolvePortraitId(unit) {
  if (!unit) return null;
  return unit.portrait || unit.portraitId || unit.id || null;
}

function resolveSVG(unit) {
  if (!_portraitSvgGetter) return null;
  const id = resolvePortraitId(unit);
  if (!id) return null;
  return _portraitSvgGetter(id) || null;
}

function resolveEmoji(unit) {
  if (!unit) return '❓';
  if (unit.emoji) return unit.emoji;
  const id = resolvePortraitId(unit);
  if (id && _portraitMap && _portraitMap[id]?.emoji) return _portraitMap[id].emoji;
  if (unit.unitType && UNIT_TYPE_EMOJI[unit.unitType]) return UNIT_TYPE_EMOJI[unit.unitType];
  return unit.team === 'enemy' ? '👹' : '⚔️';
}

function resolveImage(unit) {
  if (!unit) return null;
  const id = resolvePortraitId(unit);
  if (id && _portraitMap && _portraitMap[id]?.image) return _portraitMap[id].image;
  return null;
}

/** PNG(애니메이션급 25종) 우선 → SVG → emoji fallback */
function paintPortrait(el, unit) {
  if (!el) return;
  const img = resolveImage(unit);
  if (img) {
    el.innerHTML = `<img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:14px;display:block">`;
    el.classList.add('v8-cutin-portrait-svg');
    return;
  }
  const svg = resolveSVG(unit);
  if (svg) {
    el.innerHTML = svg;
    el.classList.add('v8-cutin-portrait-svg');
  } else {
    el.textContent = resolveEmoji(unit);
    el.classList.remove('v8-cutin-portrait-svg');
  }
}

function resolveName(unit) {
  return unit?.name || unit?.nm || unit?.id || '???';
}
function resolveTitle(unit) {
  return unit?.title || unit?.ti || '';
}
function resolveHp(unit) {
  const hp = unit?.hp ?? unit?.tr ?? 0;
  const mhp = unit?.mhp ?? unit?.mt ?? hp;
  return { hp, mhp };
}

export class CutinOverlay {
  constructor(container) {
    if (!container) throw new Error('CutinOverlay: container required');
    this.container = container;
    this.el = null;
    this._playing = false;
    this._build();
  }

  _build() {
    if (this.el) return;
    const root = document.createElement('div');
    root.id = 'v8-cutin';
    root.className = 'v8-cutin-hidden';
    root.innerHTML = `
      <div class="v8-cutin-bg"></div>
      <div class="v8-cutin-left">
        <div class="v8-cutin-portrait"></div>
        <div class="v8-cutin-name"></div>
        <div class="v8-cutin-info"></div>
      </div>
      <div class="v8-cutin-center">
        <div class="v8-cutin-skill"></div>
        <div class="v8-cutin-vs">⚔</div>
      </div>
      <div class="v8-cutin-right">
        <div class="v8-cutin-portrait"></div>
        <div class="v8-cutin-name"></div>
        <div class="v8-cutin-info"></div>
      </div>
      <div class="v8-cutin-damage">
        <span class="v8-dmg-value"></span>
        <span class="v8-dmg-crit">CRITICAL!</span>
      </div>
    `;
    this.container.appendChild(root);
    this.el = root;

    this._left     = root.querySelector('.v8-cutin-left');
    this._right    = root.querySelector('.v8-cutin-right');
    this._lPort    = this._left.querySelector('.v8-cutin-portrait');
    this._lName    = this._left.querySelector('.v8-cutin-name');
    this._lInfo    = this._left.querySelector('.v8-cutin-info');
    this._rPort    = this._right.querySelector('.v8-cutin-portrait');
    this._rName    = this._right.querySelector('.v8-cutin-name');
    this._rInfo    = this._right.querySelector('.v8-cutin-info');
    this._skill    = root.querySelector('.v8-cutin-skill');
    this._dmgRoot  = root.querySelector('.v8-cutin-damage');
    this._dmgVal   = root.querySelector('.v8-dmg-value');
    this._dmgCrit  = root.querySelector('.v8-dmg-crit');
  }

  /**
   * @param {object} opt
   * @param {object} opt.attacker    { name, title, hp, mhp, emoji?, id?, team? }
   * @param {object} opt.target      동일
   * @param {number} opt.dmg
   * @param {string} [opt.skillName='공격']
   * @param {boolean} [opt.crit=false]
   * @param {string}  [opt.element='slash']
   */
  async play(opt = {}) {
    if (!this.el) return;
    if (this._playing) return; // 중복 트리거 방지
    this._playing = true;
    try {
      const {
        attacker, target,
        dmg = 0,
        skillName = '공격',
        crit = false,
        element = 'slash',
      } = opt;

      const atkName = resolveName(attacker);
      const tgtName = resolveName(target);
      const atkIsAlly = attacker?.team === 'ally';
      const { hp: aHp, mhp: aMhp } = resolveHp(attacker);
      const { hp: tHp, mhp: tMhp } = resolveHp(target);

      // 색상 포인트
      const color = ELEMENT_COLORS[element] || ELEMENT_COLORS.slash;
      this._skill.style.setProperty('--v8-elem-color', color);
      this._skill.textContent = `${skillName}!`;

      // 좌측=공격자, 우측=피격자 (SVG 우선)
      paintPortrait(this._lPort, attacker);
      this._lName.textContent = atkName;
      this._lName.style.color = atkIsAlly ? '#FFD700' : '#ff6666';
      this._lInfo.textContent = `[${attacker?.unitType || ''}] ${resolveTitle(attacker)}`.trim();

      paintPortrait(this._rPort, target);
      this._rName.textContent = tgtName;
      this._rName.style.color = atkIsAlly ? '#ff6666' : '#FFD700';
      this._rInfo.textContent = `[${target?.unitType || ''}] ${resolveTitle(target)}`.trim();

      // 데미지 초기 hidden
      this._dmgVal.textContent = '';
      this._dmgCrit.classList.toggle('v8-dmg-crit-on', !!crit);
      this._dmgRoot.classList.remove('v8-dmg-pop');

      // 모든 애니메이션 리셋
      this._left.classList.remove('v8-slide-in-left', 'v8-shake');
      this._right.classList.remove('v8-slide-in-right', 'v8-shake');
      this.el.classList.remove('v8-cutin-hidden', 'v8-cutin-fadeout');

      // 강제 reflow (애니 재시작용)
      void this.el.offsetWidth;

      // ── Phase 1 (0-300ms): 슬라이드 인 ─────────────
      this._left.classList.add('v8-slide-in-left');
      this._right.classList.add('v8-slide-in-right');

      // ── Phase 2 (300-900ms): shake ─────────────────
      await _delay(300);
      this._left.classList.add('v8-shake');
      this._right.classList.add('v8-shake');

      // ── Phase 3 (900-1500ms): 데미지 팝업 ──────────
      await _delay(600);
      this._left.classList.remove('v8-shake');
      this._right.classList.remove('v8-shake');
      this._dmgVal.textContent = `-${Math.max(0, dmg | 0)}`;
      this._dmgRoot.classList.add('v8-dmg-pop');
      this._dmgRoot.style.setProperty('--v8-elem-color', color);
      this._dmgVal.style.color = crit ? '#ff3333' : '#ffffff';
      this._dmgVal.style.transform = crit ? 'scale(1.2)' : 'scale(1)';

      // 생존/전멸 병력 힌트: 우측 하단 info 업데이트
      const tNewHp = Math.max(0, tHp - (dmg | 0));
      if (tMhp > 0) {
        this._rInfo.textContent =
          `[${target?.unitType || ''}] ${resolveTitle(target)} · 병력 ${tNewHp}/${tMhp}`.trim();
      }
      if (tNewHp <= 0) {
        this._skill.textContent = `${tgtName} 전멸!`;
      }

      // ── Phase 4 (1500-1800ms): 페이드 아웃 ─────────
      await _delay(600);
      this.el.classList.add('v8-cutin-fadeout');
      await _delay(300);

      // 종료
      this.el.classList.add('v8-cutin-hidden');
      this.el.classList.remove('v8-cutin-fadeout');
      this._left.classList.remove('v8-slide-in-left');
      this._right.classList.remove('v8-slide-in-right');
      this._dmgRoot.classList.remove('v8-dmg-pop');
    } finally {
      this._playing = false;
    }
  }

  destroy() {
    if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
    this.el = null;
  }
}

function _delay(ms) { return new Promise(r => setTimeout(r, ms)); }
