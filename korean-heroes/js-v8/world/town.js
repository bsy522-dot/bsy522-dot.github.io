// js-v8/world/town.js
// 한국사 영웅전 v8 · 탐험 씬 빌더
// 비서B P1 수정 (2026-04-17): buildings.js가 test_graphics.html에서만
// 쓰여 본편 dead code였다는 지적을 받아 본편 exploration 씬에 연결.
//
// export:
//   buildTown(mapData, scene)  → { townGroup, buildingList, npcList }
//   movePlayer(playerMesh, unit, map, dx, dy) → bool (이동 성공여부)
//   nearestInteractable(playerPos, interactables, maxTile=1.5) → obj|null

import * as THREE from 'three';
import {
  buildTileMap, gridToWorld, TILE_SIZE, TILE_BASE_H, PASSABLE
} from '../graphics/terrain.js';
import {
  buildHut, buildShop, buildTower, buildDolmen, buildGodTree,
  buildCampfire, buildFence, buildFenceGate, buildAltar
} from '../graphics/buildings.js';

// ─────────────────────────────────────────────
// icon 문자열 → builder 함수 매핑
// maps.json buildings[].icon 값과 대응
// ─────────────────────────────────────────────
const BUILDING_BUILDERS = {
  hut:            buildHut,
  house:          buildHut,
  tent:           buildShop,  // 상점 텐트/차양
  shop:           buildShop,
  hall:           buildTower, // 회의장 = 돌탑/망루 느낌
  tower:          buildTower,
  dolmen:         buildDolmen,
  tree_sacred:    buildGodTree,
  sindansu:       buildGodTree,
  tree:           buildGodTree,
  // ★ fullloop-3d 이식 (2026-04-17): 거대 신단수 + 작은 모닥불 + 성문
  sindansu_big:   (opts = {}) => buildGodTree({ ...opts, scale: 1.8, sacred: true }),
  campfire:       buildCampfire,
  campfire_small: (opts = {}) => {
    const g = buildCampfire(opts);
    g.scale.setScalar(0.75);
    return g;
  },
  fence:          buildFence,
  fence_gate:     buildFenceGate,
  altar:          buildAltar,
};

/**
 * 마을 씬 전체 구축.
 * @param {Object} mapData - maps.json[mapId] 엔트리
 * @returns {{ townGroup: THREE.Group, buildingList: Array, npcList: Array }}
 *   buildingList/npcList 엔트리 = { id, mesh, gx, gy, trigger, data }
 */
export function buildTown(mapData) {
  const townGroup = new THREE.Group();
  townGroup.name = 'town_' + (mapData.id || 'unknown');

  // 1) 타일맵
  const tileMap = buildTileMap(mapData.terrain);
  townGroup.add(tileMap);

  const buildingList = [];
  const npcList = [];

  // 2) 건물 배치
  (mapData.buildings || []).forEach((b) => {
    const fn = BUILDING_BUILDERS[b.icon] || buildHut;
    const mesh = fn({ buildingData: b });
    // 건물 중심 = b.x,b.y (이미 좌상단) + 폭/2
    const cx = b.x + (b.w || 1) / 2 - 0.5;
    const cy = b.y + (b.h || 1) / 2 - 0.5;
    const w = gridToWorld(cx, cy);
    mesh.position.set(w.x, TILE_BASE_H, w.z);
    // 건물 스케일: fence류는 등신 유지, 일반 건물은 1.4, 신단수 sindansu_big은 자체 scale 적용됨
    if (b.icon === 'fence' || b.icon === 'fence_gate') {
      mesh.scale.setScalar(1.0);
    } else if (b.icon === 'campfire_small' || b.icon === 'campfire') {
      mesh.scale.setScalar(1.0);
    } else if (b.icon === 'sindansu_big') {
      // 이미 scale 1.8이 내부 적용됨 — 건물 크기 살짝 증가
      mesh.scale.setScalar(1.0);
    } else {
      mesh.scale.setScalar(1.4);
    }
    mesh.userData = {
      ...mesh.userData,
      type: 'building',
      buildingId: b.id,
      buildingName: b.name,
      gx: cx, gy: cy,
      trigger: b.trigger,
      data: b,
    };
    townGroup.add(mesh);

    // 건물 머리 위 안내 표식 (진입 가능 표시) — 신단수/모닥불은 표식 생략
    const noMark = (b.icon === 'sindansu_big' || b.icon === 'campfire' || b.icon === 'campfire_small' || b.id?.startsWith('fence_'));
    if (!noMark) {
      const mark = _makeInteractionMark('#ffd700');
      mark.position.set(w.x, TILE_BASE_H + 1.6, w.z);
      mark.userData = { type: 'interaction_mark', for: b.id };
      townGroup.add(mark);
      buildingList.push({ id: b.id, mesh, gx: cx, gy: cy, trigger: b.trigger, data: b, mark });
    } else {
      buildingList.push({ id: b.id, mesh, gx: cx, gy: cy, trigger: b.trigger, data: b, mark: null });
    }
  });

  // 3) 외곽 자동 울타리 (autoFence=true) — fullloop-3d 스타일 외곽 경계
  if (mapData.autoFence) {
    const W = mapData.width;
    const H = mapData.height;
    // 외곽 테두리 4변에 fence 배치 (각 타일마다 1개)
    // 코너는 기둥만 하나, 변은 짧은 fence 세그먼트
    for (let gx = 0; gx < W; gx++) {
      for (let gy = 0; gy < H; gy++) {
        const onEdge = (gx === 0 || gx === W - 1 || gy === 0 || gy === H - 1);
        if (!onEdge) continue;
        // 남쪽 가운데 2칸은 대문 경로 — 빈틈(게이트 위치)
        // ep1_town: gate at (8,8) — 남쪽(y=11)의 x=5,6 열은 열려있게
        const isSouthGate = (gy === H - 1 && (gx === 5 || gx === 6));
        if (isSouthGate) continue;

        const fence = buildFence({ length: 1.0, segments: 2, height: 0.55, beams: 1 });
        const w = gridToWorld(gx, gy);
        fence.position.set(w.x, TILE_BASE_H, w.z);
        // 세로 변은 90도 회전
        if (gx === 0 || gx === W - 1) fence.rotation.y = Math.PI / 2;
        fence.userData = { type: 'fence_perimeter', gx, gy };
        townGroup.add(fence);
      }
    }
  }

  return { townGroup, buildingList, npcList, tileMap };
}

/**
 * 상호작용 마크 (황금 콘) — 머리 위 플로팅.
 */
export function _makeInteractionMark(color = '#ffd700') {
  const g = new THREE.Group();
  const geo = new THREE.ConeGeometry(0.12, 0.22, 8);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.6,
    metalness: 0.2,
    roughness: 0.4,
  });
  const cone = new THREE.Mesh(geo, mat);
  cone.rotation.x = Math.PI; // 끝이 아래
  g.add(cone);
  g.userData = { _t0: Math.random() * 6.28 };
  return g;
}

/**
 * 상호작용 마크 애니메이션 (살짝 바운스)
 */
export function tickInteractionMark(mark, elapsed) {
  const t0 = mark.userData?._t0 || 0;
  mark.position.y = mark.position.y; // base는 외부 설정. 단순 회전+상하
  mark.children[0].position.y = Math.sin((elapsed + t0) * 3) * 0.08;
  mark.rotation.y = (elapsed + t0) * 1.2;
}

/**
 * 플레이어 그리드 이동 시도.
 * @param {Object} unit - {x, y}
 * @param {Object} map - mapData
 * @param {Array} npcList - 충돌 검사용 (npcs at (x,y))
 * @param {number} dx, dy  — -1,0,1
 * @returns {boolean} 성공 여부
 */
export function tryMovePlayer(unit, map, buildingList, npcList, dx, dy) {
  const nx = unit.x + dx;
  const ny = unit.y + dy;
  if (nx < 0 || ny < 0 || nx >= map.width || ny >= map.height) return false;

  // autoFence: 외곽 테두리 이동 차단 (단, 남쪽 gate 위치 2칸은 열림)
  if (map.autoFence) {
    const W = map.width, H = map.height;
    const onEdge = (nx === 0 || nx === W - 1 || ny === 0 || ny === H - 1);
    // 남쪽 가운데 2칸은 대문 통로 (town.js autoFence 배치와 일치)
    const isSouthGate = (ny === H - 1 && (nx === 5 || nx === 6));
    if (onEdge && !isSouthGate) return false;
  }

  // 타일 통행 가능?
  const tileType = map.terrain[ny][nx];
  if (!PASSABLE(tileType)) return false;

  // NPC/건물과 겹치면 이동 불가 (근접만 허용)
  if (buildingList.some(b => _overlapBuilding(b.data, nx, ny))) return false;
  if (npcList.some(n => n.gx === nx && n.gy === ny)) return false;

  unit.x = nx;
  unit.y = ny;
  return true;
}

function _overlapBuilding(b, nx, ny) {
  const x0 = b.x, y0 = b.y;
  const x1 = b.x + (b.w || 1) - 1;
  const y1 = b.y + (b.h || 1) - 1;
  return nx >= x0 && nx <= x1 && ny >= y0 && ny <= y1;
}

/**
 * 플레이어 위치에서 상호작용 가능한 대상 중 가장 가까운 것 반환.
 * 거리 <= maxTile (기본 1.5) 범위만 인정.
 *
 * @param {Object} player - {x, y}
 * @param {Array} list - [{id, gx, gy, trigger, ...}, ...]
 * @returns {Object|null}
 */
export function nearestInteractable(player, list, maxTile = 1.5) {
  let best = null;
  let bestD = Infinity;
  for (const it of list) {
    const dx = (it.gx - player.x);
    const dy = (it.gy - player.y);
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d <= maxTile && d < bestD) {
      bestD = d; best = it;
    }
  }
  return best;
}

/**
 * 그리드 좌표 → 월드 좌표 (Y = TILE_BASE_H).
 */
export function placeAtGrid(mesh, gx, gy, yOffset = 0) {
  const w = gridToWorld(gx, gy);
  mesh.position.set(w.x, TILE_BASE_H + yOffset, w.z);
}

/**
 * 탐험 씬 전체 정리 — GameState.terrain3d 처럼 town group 전체 제거.
 */
export function clearTown(scene, townGroup, npcMeshes = []) {
  if (townGroup && townGroup.parent) scene.remove(townGroup);
  for (const m of npcMeshes) {
    if (m && m.parent) m.parent.remove(m);
  }
}
