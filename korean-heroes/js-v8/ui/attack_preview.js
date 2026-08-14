// js-v8/ui/attack_preview.js
// 한국사 영웅전 v8 · 공격 미리보기 HTML 오버레이 (영걸전 톤)
// ────────────────────────────────────────────────────────
// 타게팅 단계에서 커서가 사거리 내 적에 올라가면 예상 데미지를 띄운다.
// 영걸전(코에이) 전투 예측창 톤: 좌(공격자)·우(대상) 미니 정보 + 큰 예상 데미지 +
// 대상 HP 변화 바 + 크리 확률 + (가능 시) 예상 반격.
//
// 절대 규칙:
//   · attack.js의 순수 calcPreview()만 호출 — 상태(hp/mp/buffs) 변경 0.
//   · calcPreview 부재/실패 시에도 오버레이만 숨기고 게임은 정상 (graceful degradation).
//   · z-index 460 — 컷인(500) 아래, HUD(100~200) 위.
//
// API:
//   initAttackPreview(container?)              · 1회 생성 (idempotent)
//   showAttackPreview({ attacker, target, skill?, weather?, map? })
//   hideAttackPreview()
//
// cutin.js와 동일한 포트레이트 해석(PNG image → SVG → emoji) 규칙을 따른다.

import { calcPreview } from '../battle/attack.js';

// 원소별 포인트 색상 (cutin.js와 동일 팔레트)
const ELEMENT_COLORS = {
  fire:    '#ff6a2a',
  thunder: '#ffd700',
  water:   '#4aa0ff',
  wind:    '#6adc8a',
  holy:    '#fff2a0',
  slash:   '#ffffff',
};

// 타입 상성 라벨 (영걸전 톤: 유리/불리/-)
const TYPE_BADGE = {
  adv:  { text: '유리', color: '#6adc8a' },
  dis:  { text: '불리', color: '#ff6666' },
  none: { text: '',     color: '#b8a888' },
};

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
let _root = null;
let _refs = null;
let _stylesInjected = false;

// ─────────────────────────────────────────────
// 포트레이트 주입 (cutin.js와 동일 인터페이스 — v8.html에서 등록)
// ─────────────────────────────────────────────
/** 포트레이트 데이터(JSON/ESM) 주입 */
export function registerPortraits(portraitsData) {
  _portraitMap = portraitsData || null;
}

/** SVG 일러스트 getter 주입 — getter(id) -> svg string | null */
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
  try { return _portraitSvgGetter(id) || null; } catch (e) { return null; }
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

/** PNG image 우선 → SVG → emoji fallback (cutin.js paintPortrait와 동일 규칙) */
function paintPortrait(el, unit) {
  if (!el) return;
  const img = resolveImage(unit);
  if (img) {
    el.innerHTML = `<img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px;display:block">`;
    el.classList.add('v8-ap-portrait-img');
    return;
  }
  const svg = resolveSVG(unit);
  if (svg) {
    el.innerHTML = svg;
    el.classList.add('v8-ap-portrait-img');
  } else {
    el.textContent = resolveEmoji(unit);
    el.classList.remove('v8-ap-portrait-img');
  }
}

function resolveName(unit) { return unit?.name || unit?.nm || unit?.id || '???'; }
function resolveHp(unit) {
  const hp  = unit?.hp ?? unit?.tr ?? 0;
  const mhp = unit?.mhp ?? unit?.mt ?? Math.max(1, hp);
  return { hp, mhp };
}

// ─────────────────────────────────────────────
// 스타일 주입 (자급자족 — 별도 CSS 파일 의존 0)
//   styles.css/cutin.css 토큰과 동일 팔레트. 실패해도 throw 안 함.
// ─────────────────────────────────────────────
function _injectStyles() {
  if (_stylesInjected) return;
  if (document.getElementById('v8-ap-styles')) { _stylesInjected = true; return; }
  const css = `
#v8-attack-preview {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.96);
  z-index: 460;
  pointer-events: none;
  display: none;
  align-items: stretch;
  gap: 10px;
  padding: 12px 14px;
  background: linear-gradient(180deg, rgba(20,16,32,0.94), rgba(10,8,20,0.96));
  border: 2px solid #C4956A;
  border-radius: 12px;
  box-shadow: 0 8px 34px rgba(0,0,0,0.66), inset 0 0 18px rgba(255,215,0,0.08);
  font-family: 'Noto Serif KR', serif;
  color: #f0e6d0;
  opacity: 0;
  transition: opacity .14s ease, transform .14s ease;
  max-width: 92vw;
}
#v8-attack-preview.v8-ap-show {
  display: flex;
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

#v8-attack-preview .v8-ap-side {
  display: flex; flex-direction: column; align-items: center;
  min-width: 92px; max-width: 120px;
}
#v8-attack-preview .v8-ap-portrait {
  width: 64px; height: 64px;
  display: flex; align-items: center; justify-content: center;
  font-size: 40px; line-height: 1;
  background: #0a0814;
  border: 2px solid rgba(196,149,106,0.7);
  border-radius: 8px;
  overflow: hidden;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
}
#v8-attack-preview .v8-ap-portrait.v8-ap-portrait-img { font-size: 0; }
#v8-attack-preview .v8-ap-portrait.v8-ap-portrait-img svg,
#v8-attack-preview .v8-ap-portrait.v8-ap-portrait-img img {
  width: 100%; height: 100%; display: block; object-fit: cover;
}
#v8-attack-preview .v8-ap-name {
  font-size: 14px; font-weight: 900;
  margin-top: 5px; text-align: center;
  text-shadow: 0 2px 6px rgba(0,0,0,0.8);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 112px;
}
#v8-attack-preview .v8-ap-sub {
  font-size: 11px; color: #b8a888; margin-top: 2px; text-align: center;
}
#v8-attack-preview .v8-ap-hpbar {
  width: 100px; height: 9px; margin-top: 6px;
  background: rgba(0,0,0,0.55);
  border: 1px solid #5a4320; border-radius: 3px;
  overflow: hidden; position: relative;
}
/* 잔여 HP (예상 피해 적용 후) */
#v8-attack-preview .v8-ap-hpbar .v8-ap-hp-after {
  position: absolute; top: 0; left: 0; bottom: 0;
  background: #4a2; transition: width .15s;
}
/* 깎이는 구간 (after~before, 붉은 잔상) */
#v8-attack-preview .v8-ap-hpbar .v8-ap-hp-loss {
  position: absolute; top: 0; bottom: 0;
  background: rgba(200,50,50,0.7);
}
#v8-attack-preview .v8-ap-hpbar.v8-ap-hp-lethal .v8-ap-hp-loss {
  background: rgba(255,60,60,0.85);
}
#v8-attack-preview .v8-ap-hptext {
  font-size: 11px; color: #b8a888; margin-top: 3px;
}
#v8-attack-preview .v8-ap-hptext b { color: #f0e6d0; }
#v8-attack-preview .v8-ap-hptext .v8-ap-lethal { color: #ff5555; font-weight: 900; }

/* 중앙 — 예상 데미지 큰 숫자 */
#v8-attack-preview .v8-ap-center {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-width: 132px; padding: 0 6px;
}
#v8-attack-preview .v8-ap-arrow {
  font-size: 22px; color: #C4956A; line-height: 1;
  text-shadow: 0 0 10px rgba(0,0,0,0.8);
}
#v8-attack-preview .v8-ap-skill {
  font-size: 13px; font-weight: 600; margin-bottom: 2px;
  color: var(--v8-ap-elem, #ffffff);
  text-shadow: 0 0 8px var(--v8-ap-elem, #ffffff), 0 1px 4px #000;
  letter-spacing: 1px;
}
#v8-attack-preview .v8-ap-dmg {
  font-size: 40px; font-weight: 900; line-height: 1.05;
  color: #ffffff;
  text-shadow: 0 0 16px var(--v8-ap-elem, #ffffff), 0 3px 8px #000;
  letter-spacing: 1px;
}
#v8-attack-preview .v8-ap-dmg small { font-size: 18px; opacity: 0.85; }
#v8-attack-preview .v8-ap-meta {
  display: flex; gap: 8px; margin-top: 5px;
  font-size: 11px; color: #b8a888; align-items: center;
}
#v8-attack-preview .v8-ap-crit { color: #ffd700; font-weight: 600; }
#v8-attack-preview .v8-ap-type { font-weight: 600; }
#v8-attack-preview .v8-ap-counter {
  margin-top: 6px; font-size: 11px;
  color: #ff8a6a; text-align: center;
}
#v8-attack-preview .v8-ap-counter b { color: #ffb088; font-weight: 900; }

/* 모바일 */
@media (max-width: 640px) {
  #v8-attack-preview { padding: 9px 10px; gap: 6px; }
  #v8-attack-preview .v8-ap-side { min-width: 72px; }
  #v8-attack-preview .v8-ap-portrait { width: 50px; height: 50px; font-size: 30px; }
  #v8-attack-preview .v8-ap-name { font-size: 12px; max-width: 84px; }
  #v8-attack-preview .v8-ap-hpbar { width: 78px; }
  #v8-attack-preview .v8-ap-center { min-width: 100px; }
  #v8-attack-preview .v8-ap-dmg { font-size: 30px; }
  #v8-attack-preview .v8-ap-dmg small { font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  #v8-attack-preview { transition: opacity .12s ease; transform: translate(-50%, -50%); }
  #v8-attack-preview.v8-ap-show { transform: translate(-50%, -50%); }
}
`;
  try {
    const style = document.createElement('style');
    style.id = 'v8-ap-styles';
    style.textContent = css;
    document.head.appendChild(style);
    _stylesInjected = true;
  } catch (e) {
    console.warn('[attack_preview] style inject failed', e);
  }
}

// ─────────────────────────────────────────────
// initAttackPreview — 1회 생성 (idempotent)
// ─────────────────────────────────────────────
export function initAttackPreview(container) {
  if (_root) return _root;
  _injectStyles();

  const c = container || document.body;
  const root = document.createElement('div');
  root.id = 'v8-attack-preview';
  root.setAttribute('role', 'status');
  root.setAttribute('aria-live', 'polite');
  root.innerHTML = `
    <div class="v8-ap-side v8-ap-attacker">
      <div class="v8-ap-portrait"></div>
      <div class="v8-ap-name"></div>
      <div class="v8-ap-sub"></div>
    </div>
    <div class="v8-ap-center">
      <div class="v8-ap-skill"></div>
      <div class="v8-ap-arrow">▶</div>
      <div class="v8-ap-dmg"></div>
      <div class="v8-ap-meta">
        <span class="v8-ap-type"></span>
        <span class="v8-ap-crit"></span>
      </div>
      <div class="v8-ap-counter"></div>
    </div>
    <div class="v8-ap-side v8-ap-target">
      <div class="v8-ap-portrait"></div>
      <div class="v8-ap-name"></div>
      <div class="v8-ap-hpbar">
        <div class="v8-ap-hp-after"></div>
        <div class="v8-ap-hp-loss"></div>
      </div>
      <div class="v8-ap-hptext"></div>
    </div>
  `;

  try { c.appendChild(root); } catch (e) {
    console.warn('[attack_preview] mount failed', e);
    return null;
  }
  _root = root;

  const aSide = root.querySelector('.v8-ap-attacker');
  const tSide = root.querySelector('.v8-ap-target');
  _refs = {
    aPort:  aSide.querySelector('.v8-ap-portrait'),
    aName:  aSide.querySelector('.v8-ap-name'),
    aSub:   aSide.querySelector('.v8-ap-sub'),
    tPort:  tSide.querySelector('.v8-ap-portrait'),
    tName:  tSide.querySelector('.v8-ap-name'),
    hpBar:  tSide.querySelector('.v8-ap-hpbar'),
    hpAfter:tSide.querySelector('.v8-ap-hp-after'),
    hpLoss: tSide.querySelector('.v8-ap-hp-loss'),
    hpText: tSide.querySelector('.v8-ap-hptext'),
    skill:  root.querySelector('.v8-ap-skill'),
    dmg:    root.querySelector('.v8-ap-dmg'),
    type:   root.querySelector('.v8-ap-type'),
    crit:   root.querySelector('.v8-ap-crit'),
    counter:root.querySelector('.v8-ap-counter'),
  };
  return root;
}

// ─────────────────────────────────────────────
// showAttackPreview — 예상 데미지 계산(순수) 후 표시
//   opt: { attacker, target, skill?, weather?, map? }
//   계산만 한다 — 어떤 유닛 상태도 변경하지 않음.
// ─────────────────────────────────────────────
export function showAttackPreview(opt = {}) {
  // graceful: 초기화 안 됐으면 자동 init 시도, 그래도 실패면 조용히 종료
  if (!_root) {
    try { initAttackPreview(); } catch (e) { /* noop */ }
    if (!_root || !_refs) return;
  }
  const { attacker, target, skill = null, weather = null, map = null } = opt;
  if (!attacker || !target) { hideAttackPreview(); return; }

  let pv;
  try {
    pv = calcPreview(attacker, target, skill, weather, map);
  } catch (e) {
    console.warn('[attack_preview] calcPreview failed', e);
    hideAttackPreview();
    return;
  }
  if (!pv) { hideAttackPreview(); return; }

  const color = ELEMENT_COLORS[pv.element] || ELEMENT_COLORS.slash;
  _root.style.setProperty('--v8-ap-elem', color);

  // 좌: 공격자
  paintPortrait(_refs.aPort, attacker);
  _refs.aName.textContent = resolveName(attacker);
  _refs.aName.style.color = (attacker.team === 'ally') ? '#FFD700' : '#ff6666';
  _refs.aSub.textContent = `[${attacker.unitType || ''}]`.replace('[]', '');

  // 우: 대상
  paintPortrait(_refs.tPort, target);
  _refs.tName.textContent = resolveName(target);
  _refs.tName.style.color = (target.team === 'ally') ? '#FFD700' : '#ff6666';

  // 중앙: 스킬명 + 예상 데미지 범위
  _refs.skill.textContent = skill?.name ? `${skill.name}` : '';
  _refs.skill.style.display = skill?.name ? '' : 'none';

  const { min, max } = pv;
  // 범위가 동일하면 단일 숫자, 다르면 min~max
  if (min === max) {
    _refs.dmg.textContent = `${min}`;
  } else {
    _refs.dmg.innerHTML = `${min}<small>~${max}</small>`;
  }

  // 타입 상성 배지
  let badge = TYPE_BADGE.none;
  if (pv.typeMod > 1.0) badge = TYPE_BADGE.adv;
  else if (pv.typeMod < 1.0) badge = TYPE_BADGE.dis;
  if (badge.text) {
    _refs.type.textContent = badge.text;
    _refs.type.style.color = badge.color;
    _refs.type.style.display = '';
  } else {
    _refs.type.style.display = 'none';
  }

  // 크리 확률
  _refs.crit.textContent = pv.critPct > 0 ? `치명타 ${pv.critPct}%` : '';
  _refs.crit.style.display = pv.critPct > 0 ? '' : 'none';

  // 대상 HP 변화 바 (최대 예상 피해 기준 — 위험 직관)
  const { hp, mhp } = resolveHp(target);
  const safeMhp = Math.max(1, mhp);
  const afterMin = Math.max(0, hp - max);   // 최대 피해 시 잔여
  const beforePct = Math.max(0, Math.min(100, (hp / safeMhp) * 100));
  const afterPct  = Math.max(0, Math.min(100, (afterMin / safeMhp) * 100));
  _refs.hpAfter.style.width = `${afterPct}%`;
  _refs.hpLoss.style.left   = `${afterPct}%`;
  _refs.hpLoss.style.width  = `${Math.max(0, beforePct - afterPct)}%`;

  const lethal = afterMin <= 0;            // 최대 피해로 격파 가능
  _refs.hpBar.classList.toggle('v8-ap-hp-lethal', lethal);
  if (lethal) {
    _refs.hpText.innerHTML = `HP <b>${hp}</b>/${mhp} <span class="v8-ap-lethal">격파 가능</span>`;
  } else {
    _refs.hpText.innerHTML = `HP <b>${hp}</b>/${mhp} → <b>${afterMin}~${Math.max(0, hp - min)}</b>`;
  }

  // 예상 반격 (근접 평타에서만 calcPreview가 채워줌)
  if (pv.counter) {
    const c = pv.counter;
    const cText = (c.min === c.max) ? `${c.min}` : `${c.min}~${c.max}`;
    _refs.counter.innerHTML = `반격 예상 <b>${cText}</b>`;
    _refs.counter.style.display = '';
  } else {
    _refs.counter.textContent = '';
    _refs.counter.style.display = 'none';
  }

  _root.classList.add('v8-ap-show');
}

// ─────────────────────────────────────────────
// hideAttackPreview
// ─────────────────────────────────────────────
export function hideAttackPreview() {
  if (!_root) return;
  _root.classList.remove('v8-ap-show');
}

// 디버그용
export function _getRoot() { return _root; }
