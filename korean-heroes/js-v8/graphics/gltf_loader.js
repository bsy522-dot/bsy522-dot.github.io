// js-v8/graphics/gltf_loader.js
// 한국사 영웅전 v8 · GLTF 자산 로더 (Phase B 인프라)
// .glb 캐싱 로드 + 깊은 복제 인스턴스 반환.
// Draco (메쉬 압축) + KTX2 (텍스처 압축) 지원 → gltf-transform CLI로 최적화된 자산 호환.
// 자산이 없으면 null 반환 → 호출처가 기존 박스 폴백 사용 (점진적 마이그레이션).

import * as THREE from 'three';
import { GLTFLoader }    from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader }   from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader }    from 'three/addons/loaders/KTX2Loader.js';
import { SkeletonUtils } from 'three/addons/utils/SkeletonUtils.js';

const ASSETS_BASE = './assets/models/';
const DRACO_PATH  = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';
const KTX2_PATH   = 'https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/';

let _loader = null;
const _cache    = new Map();      // key → 원본 Object3D (템플릿)
const _manifest = { models: {} };
let   _manifestLoaded = false;

// ─────────────────────────────────────────────
// 내부 — 로더 셋업 (싱글톤)
// ─────────────────────────────────────────────
function getLoader(renderer) {
  if (_loader) return _loader;

  const draco = new DRACOLoader();
  draco.setDecoderPath(DRACO_PATH);

  const ktx2 = new KTX2Loader();
  ktx2.setTranscoderPath(KTX2_PATH);
  if (renderer) ktx2.detectSupport(renderer);

  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  loader.setKTX2Loader(ktx2);

  _loader = loader;
  return loader;
}

// ─────────────────────────────────────────────
// 매니페스트 로드
// ─────────────────────────────────────────────
export async function loadManifest(force = false) {
  if (_manifestLoaded && !force) return _manifest;
  try {
    const res = await fetch(ASSETS_BASE + 'manifest.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('manifest 404');
    const json = await res.json();
    _manifest.version = json.version || 1;
    _manifest.models  = json.models  || {};
    _manifestLoaded = true;
    return _manifest;
  } catch (e) {
    console.warn('[gltf_loader] manifest 로드 실패 — 박스 폴백 모드 (정상):', e.message);
    _manifest.models = {};
    _manifestLoaded = true;
    return _manifest;
  }
}

// ─────────────────────────────────────────────
// 단일 모델 로드 (key → 깊은 복제본)
// 매니페스트에 없거나 파일 없으면 null → 호출처가 박스 폴백
// ─────────────────────────────────────────────
export async function loadModel(key, renderer = null) {
  if (!_manifestLoaded) await loadManifest();

  const entry = _manifest.models[key];
  if (!entry || !entry.file) return null;

  if (_cache.has(key)) return cloneTemplate(_cache.get(key), entry);

  const path = ASSETS_BASE + entry.file;
  try {
    const loader = getLoader(renderer);
    const gltf = await loader.loadAsync(path);
    const root = gltf.scene || gltf.scenes?.[0];
    if (!root) throw new Error('빈 glTF');

    // 그림자 활성화 (재질은 GLB 기본값 유지, 단 castShadow/receiveShadow만 강제)
    root.traverse((o) => {
      if (o.isMesh) {
        o.castShadow    = true;
        o.receiveShadow = true;
      }
    });

    _cache.set(key, root);
    return cloneTemplate(root, entry);
  } catch (e) {
    console.warn(`[gltf_loader] '${key}' 로드 실패 — 박스 폴백:`, e.message);
    return null;
  }
}

// ─────────────────────────────────────────────
// 깊은 복제 — 스킨드 메쉬는 SkeletonUtils, 일반은 clone(true)
// 매니페스트의 scale/offset 적용
// ─────────────────────────────────────────────
function cloneTemplate(template, entry) {
  let hasSkin = false;
  template.traverse((o) => { if (o.isSkinnedMesh) hasSkin = true; });
  const inst = hasSkin ? SkeletonUtils.clone(template) : template.clone(true);

  if (entry.scale) {
    if (typeof entry.scale === 'number') inst.scale.setScalar(entry.scale);
    else if (Array.isArray(entry.scale))  inst.scale.set(entry.scale[0], entry.scale[1], entry.scale[2]);
  }
  if (entry.offset && Array.isArray(entry.offset)) {
    inst.position.set(entry.offset[0], entry.offset[1], entry.offset[2]);
  }
  if (entry.rotationY !== undefined) inst.rotation.y = entry.rotationY;

  return inst;
}

// ─────────────────────────────────────────────
// 일괄 프리로드
// ─────────────────────────────────────────────
export async function preloadAll(renderer = null) {
  await loadManifest();
  const keys = Object.keys(_manifest.models);
  await Promise.all(keys.map((k) => loadModel(k, renderer)));
  return keys.length;
}

// ─────────────────────────────────────────────
// 등록 여부 (호출처가 분기 결정에 사용)
// ─────────────────────────────────────────────
export function hasModel(key) {
  return !!(_manifest.models[key]?.file);
}

// ─────────────────────────────────────────────
// 통계 (디버그)
// ─────────────────────────────────────────────
export function stats() {
  return {
    cached:   _cache.size,
    declared: Object.keys(_manifest.models).length,
    loaded:   _manifestLoaded,
  };
}
