// js-v8/graphics/terrain.js
// 한국사 영웅전 v8 · 타일/지형 빌더
// 01_GRAPHICS_STANDARD §4 엄수: 타일 Box 높이 ≥ 0.2

import * as THREE from 'three';
import { MAT } from './materials.js';

// ─────────────────────────────────────────────
// 타일 상수
// ─────────────────────────────────────────────
export const TILE_SIZE = 1.1;
export const TILE_BASE_H = 0.22;  // ★ 최소 0.2 이상 (01_GRAPHICS_STANDARD)

// 타일 타입 (숫자) — maps.json tileLegend와 동일 정렬 ★ 비서B P0-1 수정 (2026-04-17)
export const TILE = {
  PLAIN:    0, // 평지
  GRASS:    1, // 풀 (진한 녹지)
  FOREST:   2, // 숲
  MOUNTAIN: 3, // 산
  WATER:    4, // 물
  ROAD:     5, // 길
  SINDANSU: 6, // 신단수 (제단)
};

// 타일별 추가 높이 — 인덱스 0~6
const EXTRA_H = [0.00, 0.00, 0.06, 0.30, -0.08, 0.00, 0.00];

// 타일별 재질 — 인덱스 0~6
// ★ 2026-07-17: 산 전용 어두운 암석 재질 — MAT.stone(밝은 회백)이 전구처럼 하얗게
//   빛나던 문제. 실루엣이 어두워야 전장 가독성이 산다.
const MTN_MAT = new THREE.MeshStandardMaterial({ color: 0x6b6055, roughness: 1.0, metalness: 0.0 });
const SNOW_MAT = new THREE.MeshStandardMaterial({ color: 0xb8b2a8, roughness: 1.0, metalness: 0.0 });

const TILE_MAT = [
  MAT.grass,      // 0 PLAIN
  MAT.grassDark,  // 1 GRASS
  MAT.grass,      // 2 FOREST (바닥, 트리는 장식)
  MTN_MAT,        // 3 MOUNTAIN
  MAT.dirt,       // 4 WATER (바닥, 수면은 장식)
  MAT.path,       // 5 ROAD
  MAT.dirt,       // 6 SINDANSU (바닥 흙, 신단수는 장식)
];

export const PASSABLE = (t) => t !== TILE.MOUNTAIN && t !== TILE.WATER;

// ─────────────────────────────────────────────
// Geometry 캐시
// ─────────────────────────────────────────────
const _cache = {
  tileBase: new THREE.BoxGeometry(TILE_SIZE, TILE_BASE_H, TILE_SIZE),
  waterTop: new THREE.PlaneGeometry(TILE_SIZE * 0.96, TILE_SIZE * 0.96),
  trunk:    new THREE.CylinderGeometry(0.08, 0.10, 0.45, 10),
  canopy:   new THREE.SphereGeometry(0.28, 10, 8),
  rockBig:  new THREE.ConeGeometry(0.40, 0.70, 10),
  rockTip:  new THREE.ConeGeometry(0.18, 0.18, 10),
  stoneSm:  new THREE.DodecahedronGeometry(0.12, 0),
  pebble:   new THREE.SphereGeometry(0.05, 8, 8),
  godTrunk: new THREE.CylinderGeometry(0.18, 0.22, 1.4, 12),
  godLeaf:  new THREE.SphereGeometry(0.45, 14, 10),
};

// ─────────────────────────────────────────────
// buildTile(type, x, z)  — 하나의 타일 Group
//   x,z: 그리드 좌표 (월드 좌표로 변환됨)
// ─────────────────────────────────────────────
export function buildTile(type, x, z) {
  const g = new THREE.Group();
  const wx = x * TILE_SIZE + TILE_SIZE / 2;
  const wz = z * TILE_SIZE + TILE_SIZE / 2;
  g.position.set(wx, 0, wz);

  const extra = EXTRA_H[type] || 0;
  const totalH = TILE_BASE_H + Math.max(0, extra);

  // ── 베이스 블록 ── (높이가 달라질 때는 새 Geometry, 평지는 캐시)
  const geo = extra > 0
    ? new THREE.BoxGeometry(TILE_SIZE, totalH, TILE_SIZE)
    : _cache.tileBase;
  const base = new THREE.Mesh(geo, TILE_MAT[type] || MAT.grass);
  base.position.y = totalH / 2;
  base.receiveShadow = true;
  base.userData = { type: 'tile', tileType: type, gx: x, gz: z };
  g.add(base);

  // ── 장식 ──
  switch (type) {
    case TILE.FOREST: {
      const trunk = new THREE.Mesh(_cache.trunk, MAT.wood);
      trunk.position.y = totalH + 0.22;
      trunk.castShadow = true;
      g.add(trunk);

      const canopy = new THREE.Mesh(_cache.canopy, MAT.leaves);
      canopy.position.y = totalH + 0.60;
      canopy.castShadow = true;
      g.add(canopy);

      // 하부 덤불
      const bush = new THREE.Mesh(_cache.canopy, MAT.leavesDark);
      bush.scale.set(0.6, 0.5, 0.6);
      bush.position.set(0.22, totalH + 0.15, 0.15);
      bush.castShadow = true;
      g.add(bush);
      break;
    }
    case TILE.MOUNTAIN: {
      const rock = new THREE.Mesh(_cache.rockBig, MTN_MAT);
      rock.position.y = totalH + 0.35;
      rock.castShadow = true;
      g.add(rock);

      // ★ 2026-07-17: 눈덮개가 bloom에 가로등처럼 빛나던 문제 — 무광 회백으로
      const snow = new THREE.Mesh(_cache.rockTip, SNOW_MAT);
      snow.position.y = totalH + 0.75;
      g.add(snow);

      // 잔돌
      const sm = new THREE.Mesh(_cache.stoneSm, MAT.stoneDark);
      sm.position.set(-0.28, totalH + 0.08, 0.22);
      sm.castShadow = true;
      g.add(sm);
      break;
    }
    case TILE.WATER: {
      const water = new THREE.Mesh(_cache.waterTop, MAT.water);
      water.rotation.x = -Math.PI / 2;
      water.position.y = TILE_BASE_H + 0.005;  // 살짝 위
      water.userData.type = 'water';
      g.add(water);

      // 물결 — 작은 돌
      const p = new THREE.Mesh(_cache.pebble, MAT.stone);
      p.position.set(0.2, TILE_BASE_H + 0.02, -0.15);
      g.add(p);
      break;
    }
    case TILE.ROAD: {
      // 길 — 발자국 패턴 (작은 돌 2개)
      const p1 = new THREE.Mesh(_cache.pebble, MAT.stoneDark);
      p1.position.set(-0.18, totalH + 0.025, -0.1);
      const p2 = new THREE.Mesh(_cache.pebble, MAT.stoneDark);
      p2.position.set( 0.18, totalH + 0.025,  0.1);
      g.add(p1, p2);
      break;
    }
    case TILE.SINDANSU: {
      const trunk = new THREE.Mesh(_cache.godTrunk, MAT.wood);
      trunk.position.y = totalH + 0.70;
      trunk.castShadow = true;
      g.add(trunk);

      // 여러 층 잎 (큰 Sphere 3개)
      const leaf1 = new THREE.Mesh(_cache.godLeaf, MAT.leaves);
      leaf1.position.y = totalH + 1.55;
      leaf1.castShadow = true;
      const leaf2 = new THREE.Mesh(_cache.godLeaf, MAT.leavesDark);
      leaf2.scale.set(0.8, 0.8, 0.8);
      leaf2.position.set(0.25, totalH + 1.30, 0.10);
      const leaf3 = new THREE.Mesh(_cache.godLeaf, MAT.leavesDark);
      leaf3.scale.set(0.75, 0.75, 0.75);
      leaf3.position.set(-0.22, totalH + 1.35, -0.08);
      g.add(leaf1, leaf2, leaf3);
      break;
    }
    case TILE.GRASS: {
      // 풀 타일 — 작은 풀 포기 2~3개 (pebble 재사용 + leavesDark material)
      for (let i = 0; i < 2; i++) {
        const tuft = new THREE.Mesh(_cache.pebble, MAT.leavesDark);
        tuft.scale.set(1.0, 1.6, 1.0);
        tuft.position.set(
          (i === 0 ? -0.22 : 0.18),
          totalH + 0.04,
          (i === 0 ? 0.14 : -0.18)
        );
        g.add(tuft);
      }
      break;
    }
  }

  return g;
}

// ─────────────────────────────────────────────
// buildTileMap(map2d) — 2D 배열 전체를 Group 하나로
// ─────────────────────────────────────────────
export function buildTileMap(map2d) {
  const g = new THREE.Group();
  for (let z = 0; z < map2d.length; z++) {
    for (let x = 0; x < map2d[z].length; x++) {
      g.add(buildTile(map2d[z][x], x, z));
    }
  }
  g.userData = { type: 'tileMap', map: map2d };
  return g;
}

// ─────────────────────────────────────────────
// 그리드↔월드 헬퍼
// ─────────────────────────────────────────────
export function gridToWorld(gx, gz) {
  return {
    x: gx * TILE_SIZE + TILE_SIZE / 2,
    z: gz * TILE_SIZE + TILE_SIZE / 2,
  };
}
