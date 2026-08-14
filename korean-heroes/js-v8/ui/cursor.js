// js-v8/ui/cursor.js
// 한국사 영웅전 v8 · 영걸전식 타일 커서 (십자키 이동)
// ────────────────────────────────────────────────────────
// 사용:
//   import { initCursor, moveCursor, getCursor, setCursor, hideCursor, showCursor } from './ui/cursor.js';
//   initCursor(scene, map, { onMove: (x,y)=>{ panTacticalTo(...) } });
//   moveCursor('right');  // ↑↓←→
//   const {x,y} = getCursor();

import * as THREE from 'three';
import { TILE_SIZE, TILE_BASE_H, gridToWorld } from '../graphics/terrain.js';

let _scene = null;
let _map   = null;
let _mesh  = null;
let _state = { x: 0, y: 0, visible: true };
let _onMove = null;
let _t0 = 0;

function _build() {
  const geo = new THREE.RingGeometry(0.40, 0.55, 24);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide,
    depthWrite: false,
    depthTest: false,
  });
  const ring = new THREE.Mesh(geo, mat);
  ring.rotation.x = -Math.PI / 2;
  ring.renderOrder = 100;

  // 안쪽 채움 (반투명 흰색) — 시인성 강화
  const innerGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.78, TILE_SIZE * 0.78);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xffe070,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    depthTest: false,
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.rotation.x = -Math.PI / 2;
  inner.position.y = -0.001;
  inner.renderOrder = 99;

  const grp = new THREE.Group();
  grp.add(inner);
  grp.add(ring);
  grp.userData = { type: 'cursor' };
  return grp;
}

function _place() {
  if (!_mesh) return;
  const w = gridToWorld(_state.x, _state.y);
  _mesh.position.set(w.x, TILE_BASE_H + 0.05, w.z);
}

export function initCursor(scene, map, opts = {}) {
  _scene  = scene;
  _map    = map;
  _onMove = opts.onMove || null;
  if (_mesh) {
    _scene.add(_mesh);
    _place();
    return;
  }
  _mesh = _build();
  _scene.add(_mesh);
  _state.x = opts.startX ?? Math.floor((map?.width  ?? 8) / 2);
  _state.y = opts.startY ?? Math.floor((map?.height ?? 8) / 2);
  _t0 = performance.now();
  _place();
}

export function disposeCursor() {
  if (_mesh && _scene) _scene.remove(_mesh);
  _mesh = null;
}

export function getCursor() { return { x: _state.x, y: _state.y }; }

export function setCursor(x, y, fire = true) {
  if (!_map) return;
  const w = _map.width  ?? 16;
  const h = _map.height ?? 16;
  _state.x = Math.max(0, Math.min(w - 1, x));
  _state.y = Math.max(0, Math.min(h - 1, y));
  _place();
  if (fire && _onMove) _onMove(_state.x, _state.y);
}

export function moveCursor(dir) {
  const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
  const dy = dir === 'up'   ? -1 : dir === 'down'  ? 1 : 0;
  setCursor(_state.x + dx, _state.y + dy, true);
}

export function hideCursor() {
  _state.visible = false;
  if (_mesh) _mesh.visible = false;
}

export function showCursor() {
  _state.visible = true;
  if (_mesh) _mesh.visible = true;
}

// 매 프레임 호출 — pulse + slow rotation
export function tickCursor(dt) {
  if (!_mesh || !_state.visible) return;
  const t = (performance.now() - _t0) / 1000;
  _mesh.rotation.z = t * 0.6;
  const pulse = 0.85 + Math.sin(t * 3.5) * 0.15;
  if (_mesh.children[1]) _mesh.children[1].material.opacity = pulse;
}
