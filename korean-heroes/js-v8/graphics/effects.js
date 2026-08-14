// js-v8/graphics/effects.js
// 한국사 영웅전 v8 · 파티클/카메라셰이크/데미지 팝업
// 모든 파티클 Mesh는 MeshStandardMaterial + emissive.

import * as THREE from 'three';
import { MAT, PALETTE } from './materials.js';
import { State, queueAnim } from '../core/engine.js';

// ─────────────────────────────────────────────
// spawnLevelUpParticles(pos, scene?)
//   황금빛 스파크가 위로 솟구침 (1.2초)
// ─────────────────────────────────────────────
export function spawnLevelUpParticles(pos, scene = State.scene) {
  if (!scene) return;
  const group = new THREE.Group();
  group.position.copy(pos);
  scene.add(group);

  const N = 20;
  const parts = [];
  const geo = new THREE.SphereGeometry(0.05, 8, 8);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffe060, roughness: 0.3, metalness: 0.0,
    emissive: 0xffaa00, emissiveIntensity: 1.2,
    transparent: true, opacity: 1,
  });

  for (let i = 0; i < N; i++) {
    const m = new THREE.Mesh(geo, mat.clone());
    const ang = (i / N) * Math.PI * 2;
    const r = 0.15 + Math.random() * 0.1;
    m.position.set(Math.cos(ang) * r, 0.1, Math.sin(ang) * r);
    m.userData._v = new THREE.Vector3(
      Math.cos(ang) * 0.4,
      1.8 + Math.random() * 0.6,
      Math.sin(ang) * 0.4
    );
    group.add(m);
    parts.push(m);
  }

  const life = 1.2;
  let t = 0;
  queueAnim((dt) => {
    t += dt;
    const k = t / life;
    for (const p of parts) {
      p.position.addScaledVector(p.userData._v, dt);
      p.userData._v.y -= 2.5 * dt;
      p.material.opacity = Math.max(0, 1 - k);
      p.scale.setScalar(1 + k * 1.5);
    }
    if (t >= life) {
      scene.remove(group);
      parts.forEach((p) => p.material.dispose());
      geo.dispose();
      return true;
    }
    return false;
  });
}

// ─────────────────────────────────────────────
// spawnHitParticle(pos, element = 'slash' | 'fire' | 'ice' | 'thunder')
// ─────────────────────────────────────────────
const ELEM_COLOR = {
  slash:   { c: 0xffffff, e: 0xaaaaaa },
  fire:    { c: 0xff7030, e: 0xff3300 },
  ice:     { c: 0x90d0ff, e: 0x3080ff },
  thunder: { c: 0xffe040, e: 0xffaa00 },
  holy:    { c: 0xffd700, e: 0xffaa00 },
};

export function spawnHitParticle(pos, element = 'slash', scene = State.scene) {
  if (!scene) return;
  const cfg = ELEM_COLOR[element] || ELEM_COLOR.slash;

  const group = new THREE.Group();
  group.position.copy(pos);
  scene.add(group);

  const N = 10;
  const parts = [];
  const geo = new THREE.SphereGeometry(0.04, 8, 8);

  for (let i = 0; i < N; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: cfg.c, roughness: 0.3, metalness: 0.0,
      emissive: cfg.e, emissiveIntensity: 1.0,
      transparent: true, opacity: 1,
    });
    const m = new THREE.Mesh(geo, mat);
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const sp = 1.5 + Math.random();
    m.userData._v = new THREE.Vector3(
      Math.sin(theta) * Math.cos(phi) * sp,
      Math.abs(Math.cos(theta)) * sp + 0.5,
      Math.sin(theta) * Math.sin(phi) * sp
    );
    group.add(m);
    parts.push(m);
  }

  const life = 0.6;
  let t = 0;
  queueAnim((dt) => {
    t += dt;
    const k = t / life;
    for (const p of parts) {
      p.position.addScaledVector(p.userData._v, dt);
      p.userData._v.y -= 3 * dt;
      p.material.opacity = Math.max(0, 1 - k);
    }
    if (t >= life) {
      scene.remove(group);
      parts.forEach((p) => p.material.dispose());
      geo.dispose();
      return true;
    }
    return false;
  });
}

// ─────────────────────────────────────────────
// cameraShake(camera, intensity=0.2, duration=0.35)
// ─────────────────────────────────────────────
export function cameraShake(camera = State.camera, intensity = 0.2, duration = 0.35) {
  if (!camera) return;
  const origin = camera.position.clone();
  let t = 0;
  queueAnim((dt) => {
    t += dt;
    const k = 1 - t / duration;
    if (k <= 0) {
      camera.position.copy(origin);
      return true;
    }
    const rx = (Math.random() - 0.5) * intensity * k;
    const ry = (Math.random() - 0.5) * intensity * k;
    const rz = (Math.random() - 0.5) * intensity * k;
    camera.position.set(origin.x + rx, origin.y + ry, origin.z + rz);
    return false;
  });
}

// ─────────────────────────────────────────────
// damageNumber(worldPos, text, color)
//   2D HUD 텍스트를 world → screen 좌표 투영해 팝업
//   (CSS 요소로 구현 — Canvas 텍스처 부담 회피)
// ─────────────────────────────────────────────
let _dmgContainer = null;
function ensureDmgContainer() {
  if (_dmgContainer) return _dmgContainer;
  _dmgContainer = document.createElement('div');
  _dmgContainer.id = 'v8-dmg-layer';
  _dmgContainer.style.cssText = [
    'position:fixed','top:0','left:0','width:100%','height:100%',
    'pointer-events:none','z-index:40','overflow:hidden',
    'font-family:"Noto Serif KR",serif',
  ].join(';');
  document.body.appendChild(_dmgContainer);
  return _dmgContainer;
}

export function damageNumber(worldPos, text, color = '#ff4444', opts = {}) {
  if (!State.camera || !State.renderer) return;
  const container = ensureDmgContainer();

  const v = worldPos.clone().project(State.camera);
  const x = (v.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-v.y * 0.5 + 0.5) * window.innerHeight;

  const el = document.createElement('div');
  el.textContent = text;
  const sz = opts.size || 56;
  el.style.cssText = [
    'position:absolute',
    `left:${x}px`, `top:${y}px`,
    'transform:translate(-50%,-50%) scale(0.4)',
    `color:${color}`,
    `font-size:${sz}px`, 'font-weight:900',
    'letter-spacing:1px',
    'text-shadow:0 2px 0 #000, 0 0 14px rgba(0,0,0,.85), 0 0 24px rgba(255,80,40,.55)',
    '-webkit-text-stroke:2px #000',
    'transition:transform .9s cubic-bezier(.2,.8,.3,1), opacity .9s ease-out',
    'will-change:transform,opacity','opacity:1',
  ].join(';');
  container.appendChild(el);

  // 애니메이션 — 살짝 튀어오른 뒤 위로 솟구치며 페이드
  requestAnimationFrame(() => {
    el.style.transform = 'translate(-50%, -50%) scale(1.4)';
  });
  setTimeout(() => {
    el.style.transform = 'translate(-50%, -160%) scale(1.0)';
    el.style.opacity = '0';
  }, 80);
  setTimeout(() => el.remove(), 1000);
}

export function critNumber(worldPos, text) {
  damageNumber(worldPos, `${text}!`, '#ffe060', { size: 76 });
}

export function healNumber(worldPos, text) {
  damageNumber(worldPos, `+${text}`, '#7affb0', { size: 50 });
}
