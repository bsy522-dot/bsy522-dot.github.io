// js-v8/ui/menus.js
// 한국사 영웅전 v8 · 메뉴 UI 모음
//  - 인벤토리 패널
//  - 전투 중 아이템 선택 UI
//  - 승리/패배 결과 화면
//  - 에피소드 선택 화면
//  - 경량 타이틀 (전투 종료 후 복귀용)
//
// export:
//   showInventory(items, onUse?)
//   showItemSelect(items, onPick?)
//   showVictory(summary)
//   showDefeat(summary)
//   showEpisodeSelect(episodes, onPick)
//   showTitleLite(onStart)
//   closeAllOverlays()

import portraitsData from '../data/portraits_data.js';

let _currentOverlay = null;

function _makeOverlay() {
  const o = document.createElement('div');
  o.className = 'v8-overlay';
  return o;
}

function _showOverlay(node, opts = {}) {
  closeAllOverlays();
  const o = _makeOverlay();
  o.appendChild(node);
  if (opts.onBackdrop) {
    o.addEventListener('click', (e) => {
      if (e.target === o) opts.onBackdrop();
    });
  }
  document.body.appendChild(o);
  _currentOverlay = o;
  return o;
}


// ─────────────────────────────────────────────
// 아이템 아이콘 — OS 이모지는 기종마다 모양이 달라 게임 아트로 부적합(감사 싸구려 #2).
// items.json의 icon 이름(potion_red / herb_green / sword_bronze ...)을 인라인 SVG로 그린다.
// ─────────────────────────────────────────────
const ITEM_SVG = {
  potion_red: '<svg viewBox="0 0 32 32"><rect x="13" y="3" width="6" height="5" rx="1" fill="#c9a26a"/>'
    + '<path d="M12 8h8v4l4 7a6 6 0 0 1-5 9h-6a6 6 0 0 1-5-9l4-7z" fill="#b8332f"/>'
    + '<path d="M11 19h10a6 6 0 0 1-5 9 6 6 0 0 1-5-9z" fill="#e0574f"/></svg>',
  herb_green: '<svg viewBox="0 0 32 32"><path d="M16 29V13" stroke="#5a3a1a" stroke-width="2.4" fill="none"/>'
    + '<path d="M16 14C10 14 6 10 6 5c6 0 10 4 10 9z" fill="#2f5a22"/>'
    + '<path d="M16 17c6 0 10-4 10-9-6 0-10 4-10 9z" fill="#40702c"/></svg>',
  sword_bronze: '<svg viewBox="0 0 32 32"><path d="M16 2l3 5v13h-6V7z" fill="#cd7f32"/>'
    + '<rect x="9" y="20" width="14" height="3" rx="1.5" fill="#8b5a2b"/>'
    + '<rect x="14.5" y="23" width="3" height="7" rx="1.5" fill="#8b5a2b"/></svg>',
  sword_divine: '<svg viewBox="0 0 32 32"><path d="M16 1l3.4 6v14h-6.8V7z" fill="#ffd700"/>'
    + '<rect x="8" y="21" width="16" height="3" rx="1.5" fill="#b8860b"/>'
    + '<rect x="14.5" y="24" width="3" height="7" rx="1.5" fill="#b8860b"/></svg>',
  mirror_bronze: '<svg viewBox="0 0 32 32"><circle cx="16" cy="14" r="10" fill="#cd7f32"/>'
    + '<circle cx="16" cy="14" r="6.5" fill="#f0e0b0"/><rect x="14.5" y="24" width="3" height="6" fill="#8b5a2b"/></svg>',
  bell_bronze: '<svg viewBox="0 0 32 32"><path d="M16 4a8 8 0 0 1 8 8v8H8v-8a8 8 0 0 1 8-8z" fill="#cd7f32"/>'
    + '<rect x="6" y="20" width="20" height="3" rx="1.5" fill="#8b5a2b"/><circle cx="16" cy="26" r="2.6" fill="#8b5a2b"/></svg>',
  divine_seal: '<svg viewBox="0 0 32 32"><rect x="5" y="5" width="22" height="22" rx="3" fill="#8b5a2b"/>'
    + '<rect x="9" y="9" width="14" height="14" rx="2" fill="#ffd700"/></svg>',
  bow: '<svg viewBox="0 0 32 32"><path d="M9 3a20 20 0 0 1 0 26" stroke="#6b4226" stroke-width="3" fill="none"/>'
    + '<path d="M9 3l14 13L9 29" stroke="#c9a26a" stroke-width="1.6" fill="none"/></svg>',
  armor: '<svg viewBox="0 0 32 32"><path d="M16 3l10 4v9c0 7-4 11-10 13C10 27 6 23 6 16V7z" fill="#8a6a3a"/>'
    + '<path d="M16 7l6 2.5V16c0 4.4-2.4 7.2-6 8.6-3.6-1.4-6-4.2-6-8.6V9.5z" fill="#c9a26a"/></svg>',
  default: '<svg viewBox="0 0 32 32"><rect x="5" y="9" width="22" height="17" rx="2" fill="#8b5a2b"/>'
    + '<rect x="3" y="6" width="26" height="5" rx="1.5" fill="#c9a26a"/>'
    + '<rect x="14" y="9" width="4" height="17" fill="#6b4226"/></svg>',
};

function itemIcon(it) {
  if (!it) return ITEM_SVG.default;
  const key = it.iconName || it.icon;
  if (typeof key === 'string' && ITEM_SVG[key]) return ITEM_SVG[key];
  if (typeof key === 'string' && /^[a-z_]+$/.test(key)) {
    for (const k of Object.keys(ITEM_SVG)) if (key.startsWith(k.split('_')[0])) return ITEM_SVG[k];
  }
  return ITEM_SVG.default;
}

const BAG_SVG = '<svg viewBox="0 0 32 32" class="v8-h2-icon"><path d="M8 11h16l-1.5 17H9.5z" fill="#8b5a2b"/>'
  + '<path d="M12 11V8a4 4 0 0 1 8 0v3" stroke="#c9a26a" stroke-width="2.2" fill="none"/></svg>';

export function closeAllOverlays() {
  if (_currentOverlay && _currentOverlay.parentElement) {
    _currentOverlay.parentElement.removeChild(_currentOverlay);
  }
  _currentOverlay = null;
}

// ─────────────────────────────────────────────
// 인벤토리 (탐색 중 메뉴)
// items: [{ id, name, icon, qty, desc, usable }]
export function showInventory(items = [], onUse = null) {
  const modal = document.createElement('div');
  modal.className = 'v8-modal';
  modal.id = 'v8-inventory';

  let html = `<h2>${BAG_SVG} 인벤토리</h2>`;
  if (items.length === 0) {
    html += `<p style="color:#b8a888">아이템이 없습니다.</p>`;
  } else {
    html += `<div class="v8-item-grid">`;
    items.forEach((it, i) => {
      html += `
        <div class="v8-item-card" data-idx="${i}">
          <div class="v8-item-icon">${itemIcon(it)}</div>
          <div class="v8-item-name">${it.name || it.id}</div>
          <div class="v8-item-qty">×${it.qty ?? 1}</div>
          ${it.desc ? `<div class="v8-item-desc">${it.desc}</div>` : ''}
        </div>`;
    });
    html += `</div>`;
  }
  html += `<div class="v8-row-buttons"><button class="v8-btn" data-close>닫기</button></div>`;
  modal.innerHTML = html;

  modal.querySelectorAll('.v8-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx, 10);
      const it = items[idx];
      if (onUse && it && it.usable !== false) {
        onUse(it);
        closeAllOverlays();
      }
    });
  });
  modal.querySelector('[data-close]').addEventListener('click', closeAllOverlays);
  _showOverlay(modal);
  return modal;
}

// ─────────────────────────────────────────────
// 전투 중 아이템 선택 (더 콤팩트)
export function showItemSelect(items = [], onPick = null) {
  const modal = document.createElement('div');
  modal.className = 'v8-modal';
  modal.style.minWidth = '260px';

  let html = `<h2>${BAG_SVG} 아이템 사용</h2>`;
  if (items.length === 0) {
    html += `<p style="color:#b8a888">사용 가능한 아이템이 없습니다.</p>`;
  } else {
    html += `<div class="v8-item-grid">`;
    items.forEach((it, i) => {
      html += `
        <div class="v8-item-card" data-idx="${i}">
          <div class="v8-item-icon">${itemIcon(it)}</div>
          <div class="v8-item-name">${it.name || it.id}</div>
          <div class="v8-item-qty">×${it.qty ?? 1}</div>
        </div>`;
    });
    html += `</div>`;
  }
  html += `<div class="v8-row-buttons"><button class="v8-btn" data-close>취소</button></div>`;
  modal.innerHTML = html;

  modal.querySelectorAll('.v8-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx, 10);
      const it = items[idx];
      if (onPick) onPick(it);
      closeAllOverlays();
    });
  });
  modal.querySelector('[data-close]').addEventListener('click', () => {
    if (onPick) onPick(null);
    closeAllOverlays();
  });
  _showOverlay(modal);
  return modal;
}

// ─────────────────────────────────────────────
// 승리 결과
// summary: { xpGains: [{unitId, name, beforeXp, afterXp, beforeLv, afterLv, leveledUp}], rewards, onNext }
export function showVictory(summary = {}) {
  const modal = document.createElement('div');
  modal.className = 'v8-modal';

  let gainsHtml = '';
  (summary.xpGains || []).forEach(g => {
    const p = portraitsData[g.unitId] || { emoji: '🧍' };
    const lvTxt = g.leveledUp
      ? `<span class="v8-levelup">Lv.${g.beforeLv} → Lv.${g.afterLv} ✨</span>`
      : `Lv.${g.afterLv || g.beforeLv}`;
    gainsHtml += `
      <div class="v8-xp-row">
        <span>${p.emoji} ${g.name || g.unitId}</span>
        <span>+${(g.afterXp - g.beforeXp) || 0} XP · ${lvTxt}</span>
      </div>`;
  });

  let rewardsHtml = '';
  if (summary.rewards && summary.rewards.length > 0) {
    rewardsHtml = `<h3>보상</h3>`;
    summary.rewards.forEach(r => {
      rewardsHtml += `<div class="v8-xp-row"><span>${r.icon || '🎁'} ${r.name || r.id}</span><span>×${r.qty || 1}</span></div>`;
    });
  }

  modal.innerHTML = `
    <div class="v8-result">
      <div class="v8-result-title">승리!</div>
    </div>
    <div class="v8-xp-gain">${gainsHtml || '<p style="text-align:center;color:#b8a888">전투 종료</p>'}</div>
    ${rewardsHtml}
    <div class="v8-row-buttons">
      <button class="v8-btn v8-primary" data-next>다음 ▶</button>
    </div>
  `;
  modal.querySelector('[data-next]').addEventListener('click', () => {
    closeAllOverlays();
    if (summary.onNext) summary.onNext();
  });
  _showOverlay(modal);
  return modal;
}

// ─────────────────────────────────────────────
export function showDefeat(summary = {}) {
  const modal = document.createElement('div');
  modal.className = 'v8-modal';
  modal.innerHTML = `
    <div class="v8-result">
      <div class="v8-result-title defeat">패배</div>
      <p style="color:#b8a888;margin:14px 0">${summary.message || '진형이 무너졌습니다...'}</p>
    </div>
    <div class="v8-row-buttons">
      <button class="v8-btn" data-title>타이틀</button>
      <button class="v8-btn v8-primary" data-retry>재도전</button>
    </div>
  `;
  modal.querySelector('[data-retry]').addEventListener('click', () => {
    closeAllOverlays();
    if (summary.onRetry) summary.onRetry();
  });
  modal.querySelector('[data-title]').addEventListener('click', () => {
    closeAllOverlays();
    if (summary.onTitle) summary.onTitle();
  });
  _showOverlay(modal);
  return modal;
}

// ─────────────────────────────────────────────
// 에피소드 선택
// episodes: [{ id, title, subtitle, era, locked? }]
export function showEpisodeSelect(episodes = [], onPick = null) {
  const modal = document.createElement('div');
  modal.className = 'v8-modal';

  let html = `<h2>에피소드 선택</h2><div class="v8-episode-list">`;
  episodes.forEach(ep => {
    html += `
      <div class="v8-episode-card ${ep.locked ? 'v8-locked' : ''}" data-id="${ep.id}">
        <div class="v8-episode-title">${ep.locked ? '🔒 ' : ''}EP.${(ep.id || '').replace(/^ep/,'')} · ${ep.title || ''}</div>
        <div class="v8-episode-subtitle">${ep.subtitle || ''} ${ep.era ? `· ${ep.era}` : ''}</div>
      </div>`;
  });
  html += `</div><div class="v8-row-buttons"><button class="v8-btn" data-close>닫기</button></div>`;
  modal.innerHTML = html;

  modal.querySelectorAll('.v8-episode-card').forEach(card => {
    if (card.classList.contains('v8-locked')) return;
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      closeAllOverlays();
      if (onPick) onPick(id);
    });
  });
  modal.querySelector('[data-close]').addEventListener('click', closeAllOverlays);
  _showOverlay(modal);
  return modal;
}

// ─────────────────────────────────────────────
// 경량 타이틀 (전투 종료 복귀용)
export function showTitleLite(onStart) {
  const modal = document.createElement('div');
  modal.className = 'v8-modal';
  modal.innerHTML = `
    <div class="v8-result">
      <div class="v8-result-title">한국사 영웅전</div>
      <p style="color:#b8a888;margin:8px 0 20px">고조선의 서막</p>
    </div>
    <div class="v8-row-buttons" style="justify-content:center">
      <button class="v8-btn v8-primary" data-start>시작</button>
    </div>
  `;
  modal.querySelector('[data-start]').addEventListener('click', () => {
    closeAllOverlays();
    if (onStart) onStart();
  });
  _showOverlay(modal);
  return modal;
}
