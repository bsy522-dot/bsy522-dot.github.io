// js-v8/ui/action_queue.js
// 한국사 영웅전 v8 · 행동 순서 큐 (영걸전 좌측 portrait 리스트)
// 다음 행동 가능한 유닛(hp>0 && !acted)을 spd 내림차순 정렬해 좌측에 표시.
// 현재 행동자(selected)는 활성 테두리.

import portraitsData from '../data/portraits_data.js';
import { getPortraitSVG } from './portrait_art.js';

let _root = null;
let _items = [];

const STYLES = `
#v8-action-queue {
  position: fixed;
  left: 12px;
  top: 196px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
  font-family: 'Noto Serif KR', serif;
}
.v8-aq-title {
  color: #c4956a;
  font-size: 11px;
  letter-spacing: 4px;
  margin-left: 4px;
  text-shadow: 0 1px 2px #000;
}
.v8-aq-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 6px 3px 3px;
  background: linear-gradient(90deg, rgba(40,20,8,.78), rgba(20,10,4,.5));
  border: 1.5px solid #6b4226;
  border-radius: 22px 6px 6px 22px;
  min-width: 132px;
  box-shadow: 0 2px 6px rgba(0,0,0,.4);
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.v8-aq-item.v8-active {
  border-color: #ffd700;
  box-shadow: 0 0 14px rgba(255,180,40,.55), 0 2px 6px rgba(0,0,0,.5);
  transform: translateX(6px) scale(1.04);
}
.v8-aq-item.v8-acted {
  opacity: 0.45;
  filter: grayscale(0.7);
}
.v8-aq-item.v8-enemy {
  background: linear-gradient(90deg, rgba(60,12,12,.78), rgba(20,6,6,.5));
  border-color: #6b2828;
}
.v8-aq-portrait {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  border-radius: 50%;
  border: 2px solid;
  background: rgba(0,0,0,.3);
  flex-shrink: 0;
}
.v8-aq-info { flex: 1; min-width: 0; }
.v8-aq-name {
  color: #ffe2a6;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px #000;
}
.v8-aq-item.v8-enemy .v8-aq-name { color: #ffb0b0; }
.v8-aq-hp {
  height: 4px;
  background: #1a1208;
  border-radius: 2px;
  margin-top: 2px;
  overflow: hidden;
}
.v8-aq-hp-fill {
  height: 100%;
  background: linear-gradient(90deg, #3acc40, #5ae050);
  transition: width .35s ease, background .25s ease;
}
.v8-aq-hp-fill.v8-low { background: linear-gradient(90deg, #e04020, #ff7040); }
.v8-aq-hp-fill.v8-mid { background: linear-gradient(90deg, #e0c020, #ffe060); }

@media (max-width: 720px) {
  #v8-action-queue { left: 6px; top: 162px; gap: 4px; }
  .v8-aq-item { min-width: 100px; padding: 2px 5px 2px 2px; }
  .v8-aq-portrait { width: 28px; height: 28px; font-size: 16px; }
  .v8-aq-name { font-size: 11px; }
  .v8-aq-title { font-size: 10px; letter-spacing: 2px; }
}
`;

function _ensureStyles() {
  if (document.getElementById('v8-aq-style')) return;
  const s = document.createElement('style');
  s.id = 'v8-aq-style';
  s.textContent = STYLES;
  document.head.appendChild(s);
}

export function initActionQueue() {
  if (_root) return _root;
  _ensureStyles();
  _root = document.createElement('div');
  _root.id = 'v8-action-queue';
  _root.innerHTML = `<div class="v8-aq-title">행동 순서</div><div id="v8-aq-list"></div>`;
  document.body.appendChild(_root);
  return _root;
}

export function updateActionQueue(units, opts = {}) {
  if (!_root) initActionQueue();
  const list = _root.querySelector('#v8-aq-list');
  list.innerHTML = '';
  _items = [];

  const activeId = opts.activeId || null;
  const max = opts.max ?? 6;

  // 살아있는 유닛 → spd 내림차순 → 행동완료는 뒤
  const living = (units || []).filter(u => u.hp > 0);
  const sorted = living.slice().sort((a, b) => {
    if (!!a.acted !== !!b.acted) return a.acted ? 1 : -1;
    return (b.spd || 0) - (a.spd || 0);
  }).slice(0, max);

  for (const u of sorted) {
    const p = portraitsData[u.portraitId || u.id] || { emoji: '🧍', color: '#888' };
    const item = document.createElement('div');
    item.className = 'v8-aq-item' + (u.team === 'enemy' ? ' v8-enemy' : '') +
      (u.acted ? ' v8-acted' : '') + (u.id === activeId ? ' v8-active' : '');

    const por = document.createElement('div');
    por.className = 'v8-aq-portrait';
    por.style.borderColor = p.color;
    por.style.background = p.bgColor || 'rgba(0,0,0,.3)';
    // ★ 2026-07-17: 고품질 SVG 초상 우선, 없으면 emoji
    const svg = getPortraitSVG(u.portraitId || u.id);
    if (svg) {
      por.innerHTML = svg;
      por.style.overflow = 'hidden';
      por.style.borderRadius = '50%';
    } else {
      por.textContent = p.emoji;
    }

    const info = document.createElement('div');
    info.className = 'v8-aq-info';
    const name = document.createElement('div');
    name.className = 'v8-aq-name';
    name.textContent = u.name || u.id || '—';

    const hpBar = document.createElement('div');
    hpBar.className = 'v8-aq-hp';
    const hpFill = document.createElement('div');
    const pct = Math.max(0, Math.min(1, (u.hp || 0) / (u.mhp || u.hp || 1)));
    hpFill.className = 'v8-aq-hp-fill' + (pct <= 0.25 ? ' v8-low' : (pct <= 0.5 ? ' v8-mid' : ''));
    hpFill.style.width = (pct * 100) + '%';
    hpBar.appendChild(hpFill);

    info.appendChild(name);
    info.appendChild(hpBar);
    item.appendChild(por);
    item.appendChild(info);
    list.appendChild(item);
    _items.push({ unit: u, el: item });
  }
}

export function setActionQueueActive(unit) {
  if (!_root) return;
  for (const it of _items) {
    it.el.classList.toggle('v8-active', it.unit === unit);
  }
}

export function hideActionQueue() {
  if (_root) _root.style.display = 'none';
}
export function showActionQueue() {
  if (_root) _root.style.display = '';
}
