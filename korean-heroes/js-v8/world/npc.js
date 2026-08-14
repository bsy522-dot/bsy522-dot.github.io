// js-v8/world/npc.js
// 한국사 영웅전 v8 · NPC 메시 빌더
// buildUnit(unit_builder.js)을 재사용하되, NPC는 acted/전투 상태가 없으므로
// 간이 wrapper로 노출. 머리 위 느낌표(!) 상호작용 마크도 부착.

import * as THREE from 'three';
import { buildUnit } from '../graphics/unit_builder.js';
import { gridToWorld, TILE_BASE_H } from '../graphics/terrain.js';
import portraitsData from '../data/portraits_data.js';

// 포트레이트 color → 망토 느낌 커스텀은 unit_builder가 material 싱글톤이라
// 쉽게 안 됨. NPC 구별은 머리 위 "말풍선 콘" 색상으로 표현.

/**
 * NPC 메시 빌드.
 * @param {Object} npcData - maps.json npcs 엔트리 + {triggers}
 *   { id, name, x, y, portrait, triggers }
 * @returns {THREE.Group} group (position은 외부에서 grid→world로 배치)
 */
export function buildNPC(npcData) {
  const g = new THREE.Group();
  g.name = 'npc_' + npcData.id;

  // 본체 — 리더 아닌 아군 스타일 (간이 마을 주민)
  const body = buildUnit({ isAlly: true, isLeader: false, unitData: npcData });
  // NPC는 조금 작게
  body.scale.setScalar(0.9);
  g.add(body);

  // 느낌표 표식 (머리 위)
  const portraitInfo = portraitsData[npcData.portrait] || { color: '#ffd700' };
  const markColor = portraitInfo.color || '#ffd700';
  const mark = _buildExclamation(markColor);
  mark.position.y = 1.4;
  g.add(mark);

  g.userData = {
    type: 'npc',
    npcId: npcData.id,
    npcName: npcData.name,
    portrait: npcData.portrait,
    trigger: npcData.triggers,
    data: npcData,
    _mark: mark,
    _t0: Math.random() * 6.28,
  };
  return g;
}

function _buildExclamation(color = '#ffd700') {
  const g = new THREE.Group();

  // '!' 막대 (세로)
  const barGeo = new THREE.BoxGeometry(0.08, 0.25, 0.08);
  const barMat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.7,
    metalness: 0.3,
    roughness: 0.4,
  });
  const bar = new THREE.Mesh(barGeo, barMat);
  bar.position.y = 0.14;
  g.add(bar);

  // '!' 점 (아래 구)
  const dotGeo = new THREE.SphereGeometry(0.055, 10, 8);
  const dot = new THREE.Mesh(dotGeo, barMat);
  dot.position.y = -0.05;
  g.add(dot);

  g.userData = { type: 'npc_mark' };
  return g;
}

/**
 * 매 프레임 호출 — 느낌표가 살짝 바운스 + 회전.
 */
export function tickNPCMark(npcGroup, elapsed) {
  const ud = npcGroup.userData;
  if (!ud || !ud._mark) return;
  const t = elapsed + (ud._t0 || 0);
  ud._mark.position.y = 1.4 + Math.sin(t * 3) * 0.08;
  ud._mark.rotation.y = t * 1.2;
}

/**
 * NPC 그리드 좌표에 배치.
 */
export function placeNPC(npcMesh, gx, gy) {
  const w = gridToWorld(gx, gy);
  npcMesh.position.set(w.x, TILE_BASE_H, w.z);
}

/**
 * 플레이어가 이 NPC를 바라보도록.
 */
export function faceNPCTowardsPlayer(npcMesh, playerMesh) {
  if (!npcMesh || !playerMesh) return;
  const tx = playerMesh.position.x;
  const tz = playerMesh.position.z;
  npcMesh.lookAt(tx, npcMesh.position.y, tz);
}
