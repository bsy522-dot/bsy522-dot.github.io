// js-v8/graphics/buildings.js
// 한국사 영웅전 v8 · 건축물 빌더 (NO 마리오)
// 01_GRAPHICS_STANDARD §6 엄수. 모두 MeshStandard + 그림자.

import * as THREE from 'three';
import { MAT } from './materials.js';

// ─────────────────────────────────────────────
// Hut — 초가 오두막 (둥근 벽 + 원뿔 지붕)
// ─────────────────────────────────────────────
export function buildHut(opts = {}) {
  const g = new THREE.Group();
  const wall = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.44, 0.42, 12),
    MAT.dirt
  );
  wall.position.y = 0.21;
  wall.castShadow = true; wall.receiveShadow = true;
  g.add(wall);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.58, 0.45, 12),
    MAT.thatch
  );
  roof.position.y = 0.65;
  roof.castShadow = true;
  g.add(roof);

  // 문
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.26, 0.04),
    MAT.woodDark
  );
  door.position.set(0, 0.15, 0.44);
  g.add(door);

  // 굴뚝 연기 기둥 (지붕 꼭대기 살짝 튀어나옴)
  const chim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 0.12, 8),
    MAT.stone
  );
  chim.position.set(0.12, 0.92, 0);
  g.add(chim);

  g.userData = { type: 'building', kind: 'hut', ...opts };
  return g;
}

// ─────────────────────────────────────────────
// Shop — 오두막 + 차양 + 상점 깃발
// ─────────────────────────────────────────────
export function buildShop(opts = {}) {
  const g = new THREE.Group();
  const hut = buildHut();
  g.add(hut);

  // 차양 (지붕 연장)
  const canopy = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.04, 0.3),
    MAT.wood
  );
  canopy.position.set(0, 0.5, 0.55);
  canopy.rotation.x = -0.25;
  canopy.castShadow = true;
  g.add(canopy);

  // 차양 기둥 2개
  for (const dx of [-0.28, 0.28]) {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.40, 8),
      MAT.wood
    );
    pole.position.set(dx, 0.2, 0.66);
    pole.castShadow = true;
    g.add(pole);
  }

  // 상점 깃발 (빨간 — 식별용, flag 재질은 발광이 강해 레드 피함)
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.7, 8),
    MAT.wood
  );
  pole.position.set(0.32, 0.85, 0);
  g.add(pole);
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.22, 0.14),
    MAT.flag_ally
  );
  flag.position.set(0.44, 1.08, 0);
  flag.rotation.y = Math.PI / 2;
  g.add(flag);

  g.userData = { type: 'building', kind: 'shop', ...opts };
  return g;
}

// ─────────────────────────────────────────────
// Tower — 돌탑 (3단 적재)
// ─────────────────────────────────────────────
export function buildTower(opts = {}) {
  const g = new THREE.Group();

  const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.35, 0.60), MAT.stone);
  b1.position.y = 0.175; b1.castShadow = true; b1.receiveShadow = true;

  const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.30, 0.44), MAT.stone);
  b2.position.y = 0.35 + 0.15; b2.castShadow = true;

  const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), MAT.stoneDark);
  b3.position.y = 0.80; b3.castShadow = true;
  b3.rotation.y = 0.2;

  // 꼭대기 꼭지
  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.10, 0.22, 10),
    MAT.bronze
  );
  tip.position.y = 1.05;
  g.add(b1, b2, b3, tip);

  g.userData = { type: 'building', kind: 'tower', ...opts };
  return g;
}

// ─────────────────────────────────────────────
// Dolmen — 고인돌 (다리 2개 + 덮개)
// ─────────────────────────────────────────────
export function buildDolmen(opts = {}) {
  const g = new THREE.Group();

  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.46, 0.30), MAT.stone);
  leg1.position.set(-0.22, 0.23, 0); leg1.castShadow = true; leg1.receiveShadow = true;

  const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.46, 0.30), MAT.stone);
  leg2.position.set( 0.22, 0.23, 0); leg2.castShadow = true; leg2.receiveShadow = true;

  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.14, 0.48), MAT.stoneDark);
  cap.position.set(0, 0.53, 0);
  cap.rotation.y = 0.08;
  cap.castShadow = true;

  g.add(leg1, leg2, cap);
  g.userData = { type: 'building', kind: 'dolmen', ...opts };
  return g;
}

// ─────────────────────────────────────────────
// GodTree — 신단수 (큰 나무, 제단)
// opts.scale: 전체 스케일 (기본 1.0). 환인 상징 중심용은 1.8 권장.
// opts.sacred: true면 금색 리본 장식(천) 4가닥 추가
// ─────────────────────────────────────────────
export function buildGodTree(opts = {}) {
  const g = new THREE.Group();
  const scale = opts.scale || 1.0;
  const sacred = !!opts.sacred;

  // 제단 돌
  const altar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.60, 0.12, 16),
    MAT.stone
  );
  altar.position.y = 0.06; altar.receiveShadow = true;
  g.add(altar);

  // 줄기
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.20, 1.6, 12),
    MAT.wood
  );
  trunk.position.y = 0.92; trunk.castShadow = true;
  g.add(trunk);

  // 잎 — 여러 Sphere
  const leafGeo = new THREE.SphereGeometry(0.50, 14, 10);
  const l1 = new THREE.Mesh(leafGeo, MAT.leaves);
  l1.position.y = 1.85; l1.castShadow = true;
  const l2 = new THREE.Mesh(leafGeo, MAT.leavesDark);
  l2.scale.setScalar(0.7);
  l2.position.set(0.35, 1.65, 0.15); l2.castShadow = true;
  const l3 = new THREE.Mesh(leafGeo, MAT.leavesDark);
  l3.scale.setScalar(0.75);
  l3.position.set(-0.30, 1.70, -0.20); l3.castShadow = true;
  g.add(l1, l2, l3);

  // sacred: 금색 리본(신목 장식) — 환인 상징 전용
  if (sacred) {
    const ribbonMat = MAT.flag_ally; // 금색 발광
    const ribbonGeo = new THREE.PlaneGeometry(0.10, 0.55);
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * Math.PI * 2;
      const rb = new THREE.Mesh(ribbonGeo, ribbonMat);
      rb.position.set(
        Math.cos(ang) * 0.18,
        1.30,
        Math.sin(ang) * 0.18
      );
      rb.rotation.y = ang;
      rb.rotation.z = 0.08;
      g.add(rb);
    }
    // 꼭대기 금색 구(신성 표시)
    const topOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 10),
      MAT.flag_ally
    );
    topOrb.position.y = 2.40;
    g.add(topOrb);
  }

  if (scale !== 1.0) g.scale.setScalar(scale);

  g.userData = { type: 'building', kind: 'godTree', sacred, scale, ...opts };
  return g;
}

// ─────────────────────────────────────────────
// Altar — 환인 제단 (신단수 외의 대안, 기단 + 돌기둥 3개 + 금색 장식)
// ─────────────────────────────────────────────
export function buildAltar(opts = {}) {
  const g = new THREE.Group();

  // 기단 (2단)
  const base1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 1.0), MAT.stone);
  base1.position.y = 0.06; base1.receiveShadow = true; base1.castShadow = true;
  g.add(base1);

  const base2 = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.10, 0.78), MAT.stoneDark);
  base2.position.y = 0.17; base2.receiveShadow = true; base2.castShadow = true;
  g.add(base2);

  // 돌기둥 3개 (삼각 배치)
  const pillarGeo = new THREE.CylinderGeometry(0.08, 0.10, 0.55, 10);
  for (let i = 0; i < 3; i++) {
    const ang = (i / 3) * Math.PI * 2 + 0.3;
    const p = new THREE.Mesh(pillarGeo, MAT.stone);
    p.position.set(Math.cos(ang) * 0.24, 0.49, Math.sin(ang) * 0.24);
    p.castShadow = true;
    g.add(p);
  }

  // 금색 장식 (제단 위 구)
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 12, 10),
    MAT.flag_ally
  );
  orb.position.y = 0.90;
  g.add(orb);

  g.userData = { type: 'building', kind: 'altar', ...opts };
  return g;
}

// ─────────────────────────────────────────────
// Campfire — 모닥불 (깜빡이는 PointLight 포함)
// ─────────────────────────────────────────────
export function buildCampfire(opts = {}) {
  const g = new THREE.Group();

  // 장작 ('X'자로 두 개)
  const log1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.40, 8),
    MAT.wood
  );
  log1.rotation.z = Math.PI / 2;
  log1.rotation.x = 0.3;
  log1.position.y = 0.05; log1.castShadow = true;

  const log2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.40, 8),
    MAT.wood
  );
  log2.rotation.z = Math.PI / 2;
  log2.rotation.y = Math.PI / 2;
  log2.rotation.x = 0.3;
  log2.position.y = 0.05; log2.castShadow = true;

  // 불꽃 (원뿔)
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.14, 0.30, 10),
    MAT.fire
  );
  flame.position.y = 0.25;
  g.add(log1, log2, flame);

  // 불빛
  const light = new THREE.PointLight(0xff7733, 0.8, 3.0, 2.0);
  light.position.y = 0.4;
  g.add(light);

  // 깜빡임 userData에 저장 — engine 루프에서 참조 가능
  g.userData = {
    type: 'building',
    kind: 'campfire',
    flickerable: true,
    _flame: flame,
    _light: light,
    _t0: Math.random() * 10,
    ...opts,
  };
  return g;
}

// Campfire 애니메이션 틱 — 외부에서 매 프레임 호출
export function tickCampfire(group, elapsed) {
  const ud = group.userData;
  if (!ud?.flickerable) return;
  const t = elapsed + ud._t0;
  const s = 0.85 + Math.sin(t * 9) * 0.08 + Math.sin(t * 23) * 0.04;
  ud._flame.scale.setScalar(s);
  ud._light.intensity = 0.6 + Math.sin(t * 7) * 0.2 + Math.sin(t * 17) * 0.1;
}

// ─────────────────────────────────────────────
// Fence — 울타리 (fullloop-3d 스타일: 팔각 기둥 3개 + 가로목 1~2개)
// opts.length: 울타리 한 세그먼트 길이 (타일 크기에 맞추기)
// opts.segments: 기둥 개수 - 1 (기본 2 → 기둥 3개)
// opts.height: 기둥 높이 (기본 0.55 — fullloop-3d는 0.55~.70)
// opts.beams: 가로목 개수 (기본 1 — fullloop-3d는 1개)
// ─────────────────────────────────────────────
export function buildFence(opts = {}) {
  const length   = opts.length   ?? 1.0;
  const segments = opts.segments ?? 2;
  const height   = opts.height   ?? 0.55;
  const beams    = opts.beams    ?? 1;
  const g = new THREE.Group();

  // 기둥: 팔각 (seg 8) — fullloop-3d는 5각이지만 표준은 ≥ 8
  const postGeo = new THREE.CylinderGeometry(0.05, 0.07, height, 8);
  const postMat = MAT.woodDark;

  for (let i = 0; i <= segments; i++) {
    const post = new THREE.Mesh(postGeo, postMat);
    // 기둥 높이 랜덤 변주 (fullloop-3d 느낌)
    const h = height + (Math.random() - 0.5) * 0.12;
    post.scale.y = h / height;
    const px = (i / segments - 0.5) * length;
    post.position.set(px, h / 2, 0);
    post.castShadow = true;
    g.add(post);
  }

  // 가로목 — fullloop-3d는 상단 1개만 (세로 두 줄이면 수직강조)
  const beamGeo = new THREE.BoxGeometry(length, 0.06, 0.07);
  const beamMat = MAT.wood;
  if (beams >= 1) {
    const b1 = new THREE.Mesh(beamGeo, beamMat);
    b1.position.y = height * 0.85;
    b1.castShadow = true;
    g.add(b1);
  }
  if (beams >= 2) {
    const b2 = new THREE.Mesh(beamGeo, beamMat);
    b2.position.y = height * 0.45;
    b2.castShadow = true;
    g.add(b2);
  }

  g.userData = { type: 'building', kind: 'fence', length, segments, ...opts };
  return g;
}

// ─────────────────────────────────────────────
// FenceGate — 성문 (기둥 2개 큰 것 + 상단 빗장)
// fullloop-3d의 "gate" 타일 스타일
// ─────────────────────────────────────────────
export function buildFenceGate(opts = {}) {
  const g = new THREE.Group();

  // 큰 기둥 2개 (좌우)
  const poleGeo = new THREE.CylinderGeometry(0.08, 0.10, 0.85, 8);
  for (const dx of [-0.42, 0.42]) {
    const p = new THREE.Mesh(poleGeo, MAT.woodDark);
    p.position.set(dx, 0.42, 0);
    p.castShadow = true;
    g.add(p);
  }

  // 상단 빗장 (가로목 두꺼운 것)
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(1.00, 0.10, 0.10),
    MAT.wood
  );
  beam.position.y = 0.82;
  beam.castShadow = true;
  g.add(beam);

  // 양 끝 장식 (금속 마감)
  for (const dx of [-0.48, 0.48]) {
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.12, 0.12),
      MAT.bronzeDark
    );
    cap.position.set(dx, 0.82, 0);
    g.add(cap);
  }

  g.userData = { type: 'building', kind: 'fence_gate', ...opts };
  return g;
}
