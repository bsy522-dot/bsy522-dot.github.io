// js-v8/world/squad.js
// 한국사 영웅전 v8 · 분대 포메이션 (fullloop-3d 스타일 이식)
// 2026-04-17 agent: "환웅 3부대 vs 풍백·우사·운사" 느낌 재현.
//
// 유닛 1개 = 리더 1체 + 병사 N체 (기본 9명, 3x3 격자)
// HP 비율에 따라 병사 수 조정(visible toggle):
//   HP ≥ 70%: 9명 전원 visible
//   HP 30~70%: 6명 visible
//   HP < 30%: 3명 visible
//
// export:
//   buildSquad({ isAlly, isLeader, unitData, size }) → THREE.Group
//   updateSquadCasualties(squadGroup, hpRatio)
//
// 01_GRAPHICS_STANDARD 준수:
//   - 리더는 buildUnit(isLeader=true, scale=1.0)
//   - 병사는 buildUnit(isLeader=false, scale=0.78) — 약간 작게
//   - 타일 크기 1.1 기준 오프셋 0.30

import * as THREE from 'three';
import { buildUnit } from '../graphics/unit_builder.js';

// 3x3 병사 배치 오프셋 (리더는 중앙 (0,0), 병사 9명이 주변 3x3)
// 리더(L)와 병사(B) 위치:
//   B B B
//   B L B
//   B B B
// 리더는 전열 센터에 위치하고 주변 9명 소대 감 구현.
// 여기서는 L을 "center"에 두고 소대원 9명을 8방향+1추가로 배치해
// "리더 1 + 소대 9 = 10체" 규모감을 낸다.
//
// 스폰 순서 (HP 감소 시 뒤에서부터 사라짐 → 후미부터 전사):
const SQUAD_OFFSETS_9 = [
  // 앞줄 3 (리더 기준 전방 z < 0)
  { dx: -0.30, dz: -0.30 },
  { dx:  0.00, dz: -0.36 },
  { dx:  0.30, dz: -0.30 },
  // 좌우 측면
  { dx: -0.36, dz:  0.00 },
  { dx:  0.36, dz:  0.00 },
  // 뒷줄 대각 (후열)
  { dx: -0.30, dz:  0.30 },
  { dx:  0.30, dz:  0.30 },
  // 최후미 2명
  { dx: -0.12, dz:  0.42 },
  { dx:  0.12, dz:  0.42 },
];

const VISIBLE_COUNT = {
  FULL:    9,   // HP ≥ 70%
  MID:     6,   // 30~70%
  LOW:     3,   // < 30%
  CRITICAL: 1,  // 거의 전멸
};

/**
 * 분대 빌더 — 리더 + 병사 N명을 Group으로 반환.
 *
 * @param {Object} opts
 * @param {boolean} opts.isAlly
 * @param {boolean} opts.isLeader - 이 파라미터는 항상 리더를 구성하므로 일반적으로 true.
 *   squad는 "유닛 하나 = 분대 하나" 전제이므로 내부적으로 리더 1체는 자동 포함.
 * @param {Object}  opts.unitData - 원 유닛 데이터 (userData로 부착)
 * @param {number}  opts.size - 병사 수 (기본 9)
 * @param {number}  opts.soldierScale - 병사 스케일 (기본 0.78)
 * @returns {THREE.Group}
 */
export function buildSquad(opts = {}) {
  const {
    isAlly = true,
    unitData = null,
    size = 9,
    soldierScale = 0.78,
  } = opts;

  const group = new THREE.Group();

  // 리더 (중앙)
  const leader = buildUnit({ isAlly, isLeader: true, unitData });
  leader.position.set(0, 0, 0);
  group.add(leader);

  // 병사 N명
  const soldiers = [];
  const N = Math.min(size, SQUAD_OFFSETS_9.length);
  for (let i = 0; i < N; i++) {
    const off = SQUAD_OFFSETS_9[i];
    const s = buildUnit({ isAlly, isLeader: false, unitData: null });
    s.position.set(off.dx, 0, off.dz);
    s.scale.setScalar(soldierScale);
    // 병사 방향: 리더와 동일 정면 (아군 +x/+z 쪽으로 향하도록)
    group.add(s);
    soldiers.push(s);
  }

  group.userData = {
    type: 'squad',
    isAlly,
    isLeader: true,
    leader,
    soldiers,
    unitData,
    _currentVisible: N,
  };

  return group;
}

/**
 * HP 비율에 따라 병사 visible 토글.
 * 전사한 병사는 후미부터 사라짐(앞열 유지).
 *
 * @param {THREE.Group} squadGroup - buildSquad 결과
 * @param {number} hpRatio - 0~1
 */
export function updateSquadCasualties(squadGroup, hpRatio) {
  const ud = squadGroup.userData;
  if (!ud || !ud.soldiers) return;

  const total = ud.soldiers.length;
  let visibleCount;
  if (hpRatio >= 0.70) visibleCount = total;
  else if (hpRatio >= 0.30) visibleCount = Math.min(total, 6);
  else if (hpRatio > 0.0) visibleCount = Math.min(total, 3);
  else visibleCount = 0; // 전멸(리더는 별도 사망 애니)

  if (visibleCount === ud._currentVisible) return;

  // 앞열부터 채우고 후미 사라짐
  for (let i = 0; i < total; i++) {
    const alive = i < visibleCount;
    ud.soldiers[i].visible = alive;
  }
  ud._currentVisible = visibleCount;
}

/**
 * 설정값 조회 — localStorage에서 전투 표시 모드 확인.
 * 'squad' | 'single' (기본 'squad' — EP.1 fullloop-3d 분위기)
 */
export function getBattleDisplayMode() {
  try {
    const raw = localStorage.getItem('history-rpg-settings-v8');
    if (!raw) return 'squad';
    const s = JSON.parse(raw);
    return s.battleDisplay === 'single' ? 'single' : 'squad';
  } catch (e) {
    return 'squad';
  }
}
