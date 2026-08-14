// js-v8/graphics/unit_async.js
// 한국사 영웅전 v8 · Phase B/E — 비동기 유닛 빌더 wrapper
// unit_builder.js (동기, 박스 메시) + gltf_loader.js (비동기 .glb)을 통합.
// modelKey가 있고 .glb가 등록되어 있으면 .glb 로드, 그 외엔 박스 폴백.
//
// 호출처 (Phase E 검증 시점):
//   import { buildUnitAsync } from './graphics/unit_async.js';
//   const g = await buildUnitAsync({ isAlly: true, isLeader: true,
//                                    unitData: { id: 'hwanoong', modelKey: 'hwanoong' } });
//   scene.add(g);

import * as THREE from 'three';
import { buildUnit } from './unit_builder.js';
import { hasModel, loadModel, loadManifest } from './gltf_loader.js';

// ─────────────────────────────────────────────
// buildUnitAsync — 단일 유닛 비동기 생성
// ─────────────────────────────────────────────
export async function buildUnitAsync(opts = {}) {
  const { isAlly = true, isLeader = false, unitData = null } = opts;

  if (unitData?.modelKey) {
    await loadManifest();
    if (hasModel(unitData.modelKey)) {
      try {
        const model = await loadModel(unitData.modelKey);
        if (model) {
          const g = new THREE.Group();
          g.add(model);
          g.userData = { isAlly, isLeader, unitData, source: 'glb' };
          return g;
        }
      } catch (e) {
        console.warn(`[unit_async] '${unitData.modelKey}' .glb 로드 실패 → 박스 폴백:`, e);
      }
    }
  }

  // 폴백 — 동기 buildUnit (박스 메시)
  const g = buildUnit(opts);
  if (g.userData == null) g.userData = {};
  g.userData.source = g.userData.source || 'box';
  return g;
}

// ─────────────────────────────────────────────
// buildSquadAsync — 분대 일괄 (Promise.all)
// ─────────────────────────────────────────────
export async function buildSquadAsync(unitDataList, isAlly = true) {
  const list = Array.isArray(unitDataList) ? unitDataList : [];
  return Promise.all(list.map((u, i) =>
    buildUnitAsync({ isAlly, isLeader: i === 0, unitData: u })
  ));
}

// ─────────────────────────────────────────────
// 워밍업 — 첫 호출 지연 방지 (옵션, 게임 시작 시 호출 권장)
// ─────────────────────────────────────────────
export async function warmupAssets() {
  await loadManifest();
}
