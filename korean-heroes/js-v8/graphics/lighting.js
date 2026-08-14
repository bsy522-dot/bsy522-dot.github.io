// js-v8/graphics/lighting.js
// 한국사 영웅전 v8 · 조명 프리셋 3종 (전투/마을/보스)
// 01_GRAPHICS_STANDARD §2 엄수. AmbientLight intensity ≥ 0.45 강제.

import * as THREE from 'three';

// ─────────────────────────────────────────────
// 내부 유틸 — 씬의 모든 기존 라이트 제거
// ─────────────────────────────────────────────
function clearLights(scene) {
  const toRemove = [];
  scene.traverse((o) => {
    if (o.isLight) toRemove.push(o);
  });
  toRemove.forEach((l) => {
    if (l.parent) l.parent.remove(l);
    if (l.dispose) l.dispose();
  });
}

function setupShadowCamera(light, halfSize = 14) {
  light.castShadow = true;
  light.shadow.mapSize.set(2048, 2048);
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 60;
  light.shadow.camera.left = -halfSize;
  light.shadow.camera.right = halfSize;
  light.shadow.camera.top = halfSize;
  light.shadow.camera.bottom = -halfSize;
  light.shadow.bias = -0.0008;
  light.shadow.normalBias = 0.02;
}

// ─────────────────────────────────────────────
// Preset 1: 전투 — "일몰 신성"
// AmbientLight 0.55 (퇴화 방지: fullloop-3d의 0.35 금지)
// ─────────────────────────────────────────────
export function applyBattleLight(scene) {
  clearLights(scene);

  const ambient = new THREE.AmbientLight(0xffeedd, 0.55);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffaa66, 1.1);
  sun.position.set(10, 20, 10);
  setupShadowCamera(sun, 14);
  scene.add(sun);

  const hemi = new THREE.HemisphereLight(0xffaa77, 0x332211, 0.35);
  scene.add(hemi);

  return { ambient, sun, hemi, preset: 'battle' };
}

// ─────────────────────────────────────────────
// Preset 2: 마을 — "낮 햇살"
// AmbientLight 0.70 — 밝고 명랑
// ─────────────────────────────────────────────
export function applyTownLight(scene) {
  clearLights(scene);

  const ambient = new THREE.AmbientLight(0xffffff, 0.70);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff2cc, 1.0);
  sun.position.set(15, 25, 10);
  setupShadowCamera(sun, 16);
  scene.add(sun);

  const hemi = new THREE.HemisphereLight(0xbfe3ff, 0x445533, 0.40);
  scene.add(hemi);

  return { ambient, sun, hemi, preset: 'town' };
}

// ─────────────────────────────────────────────
// Preset 3: 보스/엔딩 — "황금 드라마"
// AmbientLight 0.45 (최소 기준선), 림라이트 추가
// ─────────────────────────────────────────────
export function applyBossLight(scene) {
  clearLights(scene);

  const ambient = new THREE.AmbientLight(0xffe4a0, 0.45);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffd56a, 1.4);
  key.position.set(8, 18, 6);
  setupShadowCamera(key, 14);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x6a8aff, 0.4);
  rim.position.set(-10, 10, -8);
  // 림라이트는 그림자 생략 (퍼포먼스)
  scene.add(rim);

  const hemi = new THREE.HemisphereLight(0xffd580, 0x2a1030, 0.30);
  scene.add(hemi);

  return { ambient, key, rim, hemi, preset: 'boss' };
}

// ─────────────────────────────────────────────
// 프리셋 스위처
// ─────────────────────────────────────────────
export const LIGHT_PRESETS = {
  battle: applyBattleLight,
  town:   applyTownLight,
  boss:   applyBossLight,
};

export function applyLightPreset(scene, name) {
  const fn = LIGHT_PRESETS[name];
  if (!fn) {
    console.warn(`[lighting] 알 수 없는 프리셋 "${name}", battle로 폴백`);
    return applyBattleLight(scene);
  }
  return fn(scene);
}

// ─────────────────────────────────────────────
// PMREM 환경맵 (메탈/유리 재질 광택, HDR 없이도 즉시 동작)
// — engine.js initEngine 직후 1회 호출
// ─────────────────────────────────────────────
let _envCached = null;
export async function setupEnvironment(scene, renderer, opts = {}) {
  if (_envCached && opts.reuse !== false) {
    scene.environment = _envCached;
    return _envCached;
  }
  // 동적 import — RoomEnvironment는 Three.js examples에 포함, 추가 다운로드 0
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new RoomEnvironment();
  const envTex   = pmrem.fromScene(envScene, opts.sigma ?? 0.04).texture;
  scene.environment = envTex;
  _envCached = envTex;

  pmrem.dispose();
  return envTex;
}

// ─────────────────────────────────────────────
// QA helper
// ─────────────────────────────────────────────
export function assertLightStandard(scene) {
  let ambientIntensity = 0;
  scene.traverse((o) => {
    if (o.isAmbientLight) ambientIntensity = Math.max(ambientIntensity, o.intensity);
  });
  if (ambientIntensity < 0.45) {
    console.error(`[QA:lighting] AmbientLight intensity ${ambientIntensity} < 0.45 (퇴화)`);
    throw new Error('lighting.js QA fail: ambient intensity too low');
  }
  return true;
}
