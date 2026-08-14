// js-v8/graphics/materials.js
// 한국사 영웅전 v8 · 표준 재질 팔레트
// 01_GRAPHICS_STANDARD §3 엄수. MeshBasicMaterial 사용 절대 금지.

import * as THREE from 'three';

// ─────────────────────────────────────────────
// MAT — 표준 재질 팔레트 (read-only singleton)
// 모든 모듈은 MAT.XXX를 재사용해 드로우콜 절감.
// ─────────────────────────────────────────────
export const MAT = {
  // ── 인체 ──
  skin:       new THREE.MeshStandardMaterial({ color: 0xd0a080, roughness: 0.7,  metalness: 0.0 }),
  hair:       new THREE.MeshStandardMaterial({ color: 0x1a0a00, roughness: 0.9,  metalness: 0.0 }),

  // ── 갑옷/의복 ──
  armor:      new THREE.MeshStandardMaterial({ color: 0xb5651d, roughness: 0.45, metalness: 0.55 }),
  armorEnemy: new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.60, metalness: 0.70 }),
  cloth:      new THREE.MeshStandardMaterial({ color: 0x8a6a3a, roughness: 0.85, metalness: 0.0 }),
  clothEnemy: new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.90, metalness: 0.0 }),
  leather:    new THREE.MeshStandardMaterial({ color: 0x5a3a1a, roughness: 0.80, metalness: 0.0 }),
  linen:      new THREE.MeshStandardMaterial({ color: 0xc8b88a, roughness: 0.90, metalness: 0.0 }),

  // ── 금속 ──
  bronze:     new THREE.MeshStandardMaterial({ color: 0xcd7f32, roughness: 0.20, metalness: 0.90 }),
  bronzeDark: new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.35, metalness: 0.75 }),
  iron:       new THREE.MeshStandardMaterial({ color: 0x5a5a5a, roughness: 0.40, metalness: 0.85 }),
  silver:     new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 0.25, metalness: 0.90 }),

  // ── 건축 재료 ──
  wood:       new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9,  metalness: 0.0 }),
  woodDark:   new THREE.MeshStandardMaterial({ color: 0x3a2510, roughness: 0.95, metalness: 0.0 }),
  thatch:     new THREE.MeshStandardMaterial({ color: 0x9b8b3a, roughness: 0.95, metalness: 0.0 }),
  stone:      new THREE.MeshStandardMaterial({ color: 0x7a7a7a, roughness: 0.95, metalness: 0.05 }),
  stoneDark:  new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.95, metalness: 0.05 }),

  // ── 지형 ──
  grass:      new THREE.MeshStandardMaterial({ color: 0x4a7030, roughness: 0.90, metalness: 0.0 }),
  grassDark:  new THREE.MeshStandardMaterial({ color: 0x2d4a1a, roughness: 0.90, metalness: 0.0 }),
  path:       new THREE.MeshStandardMaterial({ color: 0x9a8060, roughness: 0.85, metalness: 0.0 }),
  dirt:       new THREE.MeshStandardMaterial({ color: 0x8b6b3a, roughness: 0.90, metalness: 0.0 }),
  sand:       new THREE.MeshStandardMaterial({ color: 0xd9c48a, roughness: 0.85, metalness: 0.0 }),
  snow:       new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.50, metalness: 0.0 }),

  // ── 물 (반투명) ──
  water:      new THREE.MeshStandardMaterial({
    color: 0x3a6aa0, roughness: 0.20, metalness: 0.10,
    transparent: true, opacity: 0.85,
  }),

  // ── 깃발 (발광) ──
  flag_ally:  new THREE.MeshStandardMaterial({
    color: 0xffd700, roughness: 0.7, metalness: 0.0,
    emissive: 0x442200, emissiveIntensity: 0.2,
    side: THREE.DoubleSide,
  }),
  flag_enemy: new THREE.MeshStandardMaterial({
    color: 0x8a2020, roughness: 0.7, metalness: 0.0,
    emissive: 0x220000, emissiveIntensity: 0.15,
    side: THREE.DoubleSide,
  }),

  // ── 장식 ──
  leaves:     new THREE.MeshStandardMaterial({ color: 0x2d5a1a, roughness: 0.80, metalness: 0.0 }),
  leavesDark: new THREE.MeshStandardMaterial({ color: 0x1a3a10, roughness: 0.85, metalness: 0.0 }),
  fire:       new THREE.MeshStandardMaterial({
    color: 0xff8020, roughness: 0.4, metalness: 0.0,
    emissive: 0xff4400, emissiveIntensity: 0.9,
  }),
  ember:      new THREE.MeshStandardMaterial({
    color: 0xffaa40, roughness: 0.5, metalness: 0.0,
    emissive: 0xff6600, emissiveIntensity: 0.6,
  }),

  // ── 하이라이트 (MeshBasicMaterial 금지 — MeshStandard + emissive로 대체) ──
  highlightMove: new THREE.MeshStandardMaterial({
    color: 0x3399ff, roughness: 1.0, metalness: 0.0,
    emissive: 0x1155cc, emissiveIntensity: 0.6,
    transparent: true, opacity: 0.35,
    depthWrite: false, side: THREE.DoubleSide,
  }),
  highlightAttack: new THREE.MeshStandardMaterial({
    color: 0xff3333, roughness: 1.0, metalness: 0.0,
    emissive: 0xaa1111, emissiveIntensity: 0.6,
    transparent: true, opacity: 0.40,
    depthWrite: false, side: THREE.DoubleSide,
  }),
  highlightSkill: new THREE.MeshStandardMaterial({
    color: 0xaa55ff, roughness: 1.0, metalness: 0.0,
    emissive: 0x5511aa, emissiveIntensity: 0.6,
    transparent: true, opacity: 0.40,
    depthWrite: false, side: THREE.DoubleSide,
  }),
  highlightHover: new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 1.0, metalness: 0.0,
    emissive: 0x888888, emissiveIntensity: 0.3,
    transparent: true, opacity: 0.15,
    depthWrite: false, side: THREE.DoubleSide,
  }),
};

// ─────────────────────────────────────────────
// 팔레트 헥스값 (MAT 외에서 컬러 참조용)
// ─────────────────────────────────────────────
export const PALETTE = {
  BG_BATTLE:  0x1a1428,  // 01_GRAPHICS_STANDARD 배경 기본
  BG_TOWN:    0x2a2438,
  BG_BOSS:    0x1a0818,
  FOG_BATTLE: 0x1a0e08,
  FOG_TOWN:   0x2a2438,
  FOG_BOSS:   0x1a0818,

  ALLY:       0xcd7f32,
  ENEMY:      0x43464b,

  GOLD:       0xffd700,
  CRIMSON:    0x8b2020,
};

// ─────────────────────────────────────────────
// QA helper — 런타임 검증용
// ─────────────────────────────────────────────
export function assertStandardMaterials() {
  const bad = [];
  for (const [k, v] of Object.entries(MAT)) {
    if (!(v instanceof THREE.MeshStandardMaterial)) {
      bad.push(`${k}: ${v?.type || 'unknown'}`);
    }
  }
  if (bad.length) {
    console.error('[QA:materials] 비-Standard 재질 감지:', bad);
    throw new Error('materials.js QA fail: non-StandardMaterial');
  }
  return true;
}
