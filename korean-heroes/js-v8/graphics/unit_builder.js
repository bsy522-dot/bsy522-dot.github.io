// js-v8/graphics/unit_builder.js
// 한국사 영웅전 v8 · 캐릭터 메시 빌더
// 01_GRAPHICS_STANDARD §5 규격 엄수:
//   · 다리 Cylinder(r=.05, h=.22, seg≥8) · cloth
//   · 몸통 Box(.28, .34, .20) · armor
//   · 팔  Cylinder(r=.04, h=.24, seg≥8) · armor
//   · 머리 Sphere(r=.11, seg 12,10) · skin
//   · 투구 Cone(r=.07, h=.08, seg≥10) · bronze (리더 only)
//   · 비파형 동검 ExtrudeGeometry · bronze
//   · 방패 ExtrudeGeometry · wood+bronzeDark
//   · 깃발 Cone+Plane · flag_ally/enemy (리더 only)
//   · 전체 스케일 ≈ 0.65 (휴먼 1.0 대비)

import * as THREE from 'three';
import { MAT } from './materials.js';

// ─────────────────────────────────────────────
// 비파형 동검 Shape (재사용 singleton)
// ─────────────────────────────────────────────
function makeMandolinSwordShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.16);
  s.quadraticCurveTo( 0.048, 0.11,  0.042, 0.02);
  s.quadraticCurveTo( 0.030,-0.02,  0.016,-0.08);
  s.lineTo( 0.010,-0.16);
  s.lineTo(-0.010,-0.16);
  s.lineTo(-0.016,-0.08);
  s.quadraticCurveTo(-0.030,-0.02, -0.042, 0.02);
  s.quadraticCurveTo(-0.048, 0.11,  0, 0.16);
  return s;
}

function makeLeafShieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.13);
  s.quadraticCurveTo( 0.09, 0.085,  0.075, 0);
  s.quadraticCurveTo( 0.065,-0.085, 0,   -0.13);
  s.quadraticCurveTo(-0.065,-0.085,-0.075, 0);
  s.quadraticCurveTo(-0.09, 0.085,  0,    0.13);
  return s;
}

// Geometry 캐시 (드로우콜 절감)
const _cache = {
  leg:    new THREE.CylinderGeometry(0.05, 0.05, 0.22, 10),
  body:   new THREE.BoxGeometry(0.28, 0.34, 0.20),
  arm:    new THREE.CylinderGeometry(0.04, 0.04, 0.24, 10),
  head:   new THREE.SphereGeometry(0.11, 14, 12),   // ★ 12,10 최소 초과
  hair:   new THREE.SphereGeometry(0.115, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  helmet: new THREE.ConeGeometry(0.11, 0.12, 12),   // seg 12 (10 이상)
  sword:  new THREE.ExtrudeGeometry(makeMandolinSwordShape(), { depth: 0.018, bevelEnabled: false }),
  shield: new THREE.ExtrudeGeometry(makeLeafShieldShape(),    { depth: 0.025, bevelEnabled: false }),
  btn:    new THREE.SphereGeometry(0.022, 8, 8),
  pole:   new THREE.CylinderGeometry(0.012, 0.012, 0.5, 8),
  flag:   new THREE.PlaneGeometry(0.18, 0.12),
  cape:   new THREE.PlaneGeometry(0.28, 0.28),
};

// ─────────────────────────────────────────────
// buildUnit({ isAlly, isLeader, unitData })
//   unitData: (optional) {id, nm, emoji, …} — userData로 부착
// ─────────────────────────────────────────────
export function buildUnit({ isAlly = true, isLeader = false, unitData = null } = {}) {
  const g = new THREE.Group();

  const armorMat  = isAlly ? MAT.armor  : MAT.armorEnemy;
  const clothMat  = isAlly ? MAT.cloth  : MAT.clothEnemy;
  const capeMat   = isAlly ? MAT.flag_ally : MAT.flag_enemy;

  // ── 다리 2개 ──
  const l1 = new THREE.Mesh(_cache.leg, clothMat);
  l1.position.set(-0.07, 0.11, 0);
  l1.castShadow = true;
  const l2 = l1.clone();
  l2.position.x = 0.07;
  g.add(l1, l2);

  // ── 몸통 ──
  const body = new THREE.Mesh(_cache.body, armorMat);
  body.position.y = 0.40;
  body.castShadow = true;
  body.userData.part = 'armor';
  g.add(body);

  // ── 리더 구리 단추 ──
  if (isLeader) {
    for (let i = 0; i < 3; i++) {
      const btn = new THREE.Mesh(_cache.btn, MAT.bronze);
      btn.position.set(0, 0.30 + i * 0.08, 0.11);
      btn.castShadow = true;
      g.add(btn);
    }
  }

  // ── 팔 2개 ──
  const a1 = new THREE.Mesh(_cache.arm, armorMat);
  a1.position.set(-0.19, 0.40, 0);
  a1.rotation.z = 0.18;
  a1.castShadow = true;
  const a2 = a1.clone();
  a2.position.x = 0.19;
  a2.rotation.z = -0.18;
  a1.userData.part = 'armor';
  a2.userData.part = 'armor';
  g.add(a1, a2);

  // ── 머리 ──
  const head = new THREE.Mesh(_cache.head, MAT.skin);
  head.position.y = 0.66;
  head.castShadow = true;
  g.add(head);

  // ── 머리카락 (반구) ──
  const hair = new THREE.Mesh(_cache.hair, MAT.hair);
  hair.position.y = 0.68;
  g.add(hair);

  // ── 투구 (리더 only) ──
  if (isLeader) {
    const helm = new THREE.Mesh(_cache.helmet, MAT.bronze);
    helm.position.y = 0.81;
    helm.castShadow = true;
    g.add(helm);
  }

  // ── 비파형 동검 (오른손) ──
  const sword = new THREE.Mesh(_cache.sword, MAT.bronze);
  sword.position.set(0.24, 0.44, 0);
  sword.rotation.z = -0.35;
  sword.castShadow = true;
  g.add(sword);

  // ── 방패 (왼손) — 아군은 wood+bronzeDark, 적군은 iron ──
  const shield = new THREE.Mesh(_cache.shield, isAlly ? MAT.bronzeDark : MAT.iron);
  shield.position.set(-0.22, 0.42, 0);
  shield.rotation.y = Math.PI / 2;
  shield.castShadow = true;
  g.add(shield);

  // ── 망토 (리더만) ──
  if (isLeader) {
    const cape = new THREE.Mesh(_cache.cape, capeMat);
    cape.position.set(0, 0.44, -0.12);
    cape.rotation.x = 0.15;
    cape.userData.part = 'cape';
    g.add(cape);
  }

  // ── 깃발 (리더만) ──
  if (isLeader) {
    const pole = new THREE.Mesh(_cache.pole, MAT.wood);
    pole.position.set(0.08, 0.68, -0.14);
    g.add(pole);

    const flag = new THREE.Mesh(_cache.flag, capeMat);
    flag.position.set(0.19, 0.86, -0.14);
    flag.userData.part = 'flag';
    g.add(flag);
  }

  // ── 전체 스케일: 0.65 ──
  g.scale.set(1.0, 1.0, 1.0); // (부품 치수에 스케일 이미 반영되어 있음 — 최종 휴먼 약 0.9 단위)
  // 원하는 경우 외부에서 group.scale.setScalar(0.65) 가능

  // userData
  g.userData = {
    type: 'unit',
    isAlly, isLeader,
    ...(unitData ? { unitData } : {}),
  };

  return g;
}

// ─────────────────────────────────────────────
// "acted" 상태 표현 — 회색 반투명
// ─────────────────────────────────────────────
export function setUnitActed(unitGroup, acted) {
  // ★ 비서B P0-2 수정 (2026-04-17): 싱글톤 재질 오염 방지.
  // 최초 1회 이 유닛 전용으로 material.clone() 한 뒤 캐시.
  unitGroup.traverse((o) => {
    if (o.isMesh && o.material) {
      if (!o.userData._matCloned) {
        o.material = Array.isArray(o.material)
          ? o.material.map((m) => m.clone())
          : o.material.clone();
        o.userData._matCloned = true;
      }
      const apply = (m) => { m.transparent = true; m.opacity = acted ? 0.45 : 1.0; m.needsUpdate = true; };
      if (Array.isArray(o.material)) o.material.forEach(apply); else apply(o.material);
    }
  });
}

// ─────────────────────────────────────────────
// 유닛 바라보기 헬퍼 (근접 적 중심)
// ─────────────────────────────────────────────
export function faceTowards(unitGroup, worldVec3) {
  unitGroup.lookAt(worldVec3.x, unitGroup.position.y, worldVec3.z);
}

// ─────────────────────────────────────────────
// 유닛 개별 색 입히기 — units.json colors {armor, cape, flag} 반영.
// setUnitActed와 같은 규약(_matCloned)으로 싱글톤 재질을 오염시키지 않는다.
// ─────────────────────────────────────────────
export function tintUnit(unitGroup, colors) {
  if (!colors) return;
  unitGroup.traverse((o) => {
    if (!o.isMesh || !o.material || !o.userData.part) return;
    const hex = colors[o.userData.part] || (o.userData.part === 'cape' ? colors.flag : null);
    if (!hex) return;
    if (!o.userData._matCloned) {
      o.material = Array.isArray(o.material)
        ? o.material.map((m) => m.clone())
        : o.material.clone();
      o.userData._matCloned = true;
    }
    const apply = (m) => { m.color.set(hex); m.needsUpdate = true; };
    if (Array.isArray(o.material)) o.material.forEach(apply); else apply(o.material);
  });
}
