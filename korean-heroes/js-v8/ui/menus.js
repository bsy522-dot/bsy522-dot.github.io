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

  let html = `<h2>📦 인벤토리</h2>`;
  if (items.length === 0) {
    html += `<p style="color:#b8a888">아이템이 없습니다.</p>`;
  } else {
    html += `<div class="v8-item-grid">`;
    items.forEach((it, i) => {
      html += `
        <div class="v8-item-card" data-idx="${i}">
          <div class="v8-item-icon">${it.icon || '📦'}</div>
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

  let html = `<h2>🎒 아이템 사용</h2>`;
  if (items.length === 0) {
    html += `<p style="color:#b8a888">사용 가능한 아이템이 없습니다.</p>`;
  } else {
    html += `<div class="v8-item-grid">`;
    items.forEach((it, i) => {
      html += `
        <div class="v8-item-card" data-idx="${i}">
          <div class="v8-item-icon">${it.icon || '🧪'}</div>
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
