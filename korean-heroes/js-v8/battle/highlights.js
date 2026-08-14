// js-v8/battle/highlights.js
// 한국사 영웅전 v8 · 이동/공격/스킬 범위 시각화
// 반투명 타일 Mesh. MAT.highlightMove/Attack/Skill 재사용.
//
// 주의: 이 모듈은 battle/ 내에서 유일하게 Three.js mesh를 만든다 (지시사항 예외).

import * as THREE from 'three';
import { MAT } from '../graphics/materials.js';
import { TILE_SIZE, TILE_BASE_H, gridToWorld } from '../graphics/terrain.js';
import { State } from '../core/engine.js';

// ─────────────────────────────────────────────
// Geometry 캐시 (드로우콜 절감)
// ─────────────────────────────────────────────
const _geo = new THREE.PlaneGeometry(TILE_SIZE * 0.92, TILE_SIZE * 0.92);

// 활성 하이라이트 그룹 추적 (clearHighlights용)
const _active = new Set();

function _mkGroup(kind) {
  const g = new THREE.Group();
  g.userData = { type: 'highlight', kind };
  _active.add(g);
  return g;
}

function _tileMesh(mat, x, z, yOffset = 0.01) {
  const m = new THREE.Mesh(_geo, mat);
  m.rotation.x = -Math.PI / 2;
  const w = gridToWorld(x, z);
  m.position.set(w.x, TILE_BASE_H + yOffset, w.z);
  return m;
}

// ─────────────────────────────────────────────
// showMoveRange(tiles, scene?) → Group
// tiles: [{x,y,cost?}]
// ─────────────────────────────────────────────
export function showMoveRange(tiles, scene = State.scene) {
  if (!scene) return null;
  const g = _mkGroup('move');
  g.userData.kind = 'move';
  for (const t of tiles) {
    g.add(_tileMesh(MAT.highlightMove, t.x, t.y, 0.02));
  }
  scene.add(g);
  return g;
}

// ─────────────────────────────────────────────
// showAttackRange(tiles, scene?) → Group
// ─────────────────────────────────────────────
export function showAttackRange(tiles, scene = State.scene) {
  if (!scene) return null;
  const g = _mkGroup('attack');
  for (const t of tiles) {
    g.add(_tileMesh(MAT.highlightAttack, t.x, t.y, 0.03));
  }
  scene.add(g);
  return g;
}

// ─────────────────────────────────────────────
// showSkillRange(tiles, scene?)
// ─────────────────────────────────────────────
export function showSkillRange(tiles, scene = State.scene) {
  if (!scene) return null;
  const g = _mkGroup('skill');
  for (const t of tiles) {
    g.add(_tileMesh(MAT.highlightSkill, t.x, t.y, 0.035));
  }
  scene.add(g);
  return g;
}

// ─────────────────────────────────────────────
// showHoverTile(x, y, scene?)
// ─────────────────────────────────────────────
export function showHoverTile(x, y, scene = State.scene) {
  if (!scene) return null;
  const g = _mkGroup('hover');
  g.add(_tileMesh(MAT.highlightHover, x, y, 0.04));
  scene.add(g);
  return g;
}

// ─────────────────────────────────────────────
// clearHighlights(scene?, kind?)
//   kind 지정 시 해당 kind만 제거 (예: 'move')
// ─────────────────────────────────────────────
export function clearHighlights(scene = State.scene, kind = null) {
  if (!scene) return;
  const toRemove = [];
  for (const g of _active) {
    if (kind && g.userData?.kind !== kind) continue;
    scene.remove(g);
    toRemove.push(g);
  }
  toRemove.forEach((g) => _active.delete(g));
}

export function removeHighlight(group) {
  if (!group) return;
  if (group.parent) group.parent.remove(group);
  _active.delete(group);
}
