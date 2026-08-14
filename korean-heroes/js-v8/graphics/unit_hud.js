// js-v8/graphics/unit_hud.js
// 한국사 영웅전 v8 · 유닛 머리 위 HP 바 + 이름 빌보드 (영걸전 스타일)
// CanvasTexture + Sprite — 항상 카메라를 향함, depthTest off라 가려지지 않음.

import * as THREE from 'three';

const _state = new WeakMap(); // unit → { canvas, ctx, tex, sprite, lastHp, lastMhp, lastActed }
const CANVAS_W = 256;
const CANVAS_H = 80;

function _drawBar(ctx, unit) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // 배경 패널
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath();
  const r = 10;
  const x = 6, y = 4, w = CANVAS_W - 12, h = CANVAS_H - 8;
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y,     x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x,     y + h, r);
  ctx.arcTo(x,     y + h, x,     y,     r);
  ctx.arcTo(x,     y,     x + w, y,     r);
  ctx.closePath();
  ctx.fill();

  // 이름 (아군: 황금, 적군: 적색)
  const isAlly = unit.team === 'ally';
  ctx.fillStyle = isAlly ? '#ffe066' : '#ff8a8a';
  ctx.font = 'bold 26px "Noto Serif KR", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#000';
  ctx.shadowBlur = 4;
  ctx.fillText(unit.name || unit.id || '—', CANVAS_W / 2, 24);
  ctx.shadowBlur = 0;

  // HP 바
  const hp = Math.max(0, unit.hp || 0);
  const mhp = Math.max(1, unit.mhp || unit.hp || 1);
  const pct = Math.max(0, Math.min(1, hp / mhp));

  const bx = 22, by = 46, bw = CANVAS_W - 44, bh = 18;
  // 트랙
  ctx.fillStyle = '#1a1208';
  ctx.fillRect(bx, by, bw, bh);
  // 채움 (HP에 따라 색)
  const c = pct > 0.5 ? '#3acc40' : (pct > 0.25 ? '#e0c020' : '#e04020');
  ctx.fillStyle = c;
  ctx.fillRect(bx, by, bw * pct, bh);
  // 외곽선
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(bx, by, bw, bh);

  // HP 숫자
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px "Noto Serif KR", serif';
  ctx.shadowColor = '#000';
  ctx.shadowBlur = 3;
  ctx.fillText(`${hp}/${mhp}`, CANVAS_W / 2, by + bh / 2 + 1);
  ctx.shadowBlur = 0;

  // 행동완료 표시 (회색 마스크)
  if (unit.acted) {
    ctx.fillStyle = 'rgba(40,40,40,0.55)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = '#bbb';
    ctx.font = 'bold 13px "Noto Serif KR", serif';
    ctx.fillText('행동완료', CANVAS_W / 2, CANVAS_H - 12);
  }
}

export function attachUnitHud(unit) {
  if (!unit || !unit.mesh) return null;
  detachUnitHud(unit); // 중복 방지

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;

  const mat = new THREE.SpriteMaterial({
    map: tex,
    depthTest: false,
    transparent: true,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.4, 0.44, 1.0);
  sprite.position.set(0, 1.35, 0); // 캐릭터 머리 약간 위
  sprite.renderOrder = 100;
  sprite.userData = { type: 'unitHud' };

  unit.mesh.add(sprite);
  unit._hud = sprite;

  _drawBar(ctx, unit);
  tex.needsUpdate = true;

  _state.set(unit, {
    canvas, ctx, tex, sprite,
    lastHp: unit.hp, lastMhp: unit.mhp, lastActed: !!unit.acted,
  });
  return sprite;
}

export function refreshUnitHud(unit) {
  const s = _state.get(unit);
  if (!s) return;
  if (
    s.lastHp === unit.hp &&
    s.lastMhp === unit.mhp &&
    s.lastActed === !!unit.acted
  ) return;
  s.lastHp = unit.hp;
  s.lastMhp = unit.mhp;
  s.lastActed = !!unit.acted;
  _drawBar(s.ctx, unit);
  s.tex.needsUpdate = true;
}

export function detachUnitHud(unit) {
  if (!unit || !unit._hud) return;
  const s = _state.get(unit);
  if (s) {
    if (s.sprite.parent) s.sprite.parent.remove(s.sprite);
    s.tex.dispose();
    s.sprite.material.dispose();
    _state.delete(unit);
  }
  unit._hud = null;
}

export function refreshAllHuds(units) {
  if (!units) return;
  for (const u of units) {
    if (u.hp <= 0) {
      if (u._hud) detachUnitHud(u);
      continue;
    }
    if (!u._hud && u.mesh) attachUnitHud(u);
    else refreshUnitHud(u);
  }
}
