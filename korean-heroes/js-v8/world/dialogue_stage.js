// js-v8/world/dialogue_stage.js
// 대화 씬 3D 무대 — "얼굴만 나오는 검은 화면" 대신 영걸전처럼
// 캐릭터들이 실제 3D 무대 위에 서서 대화한다.
//
// export:
//   buildDialogueStage({ background, cast, unitsData }) → stage
//     stage = { group, center:{x,z}, actors:Map<id,mesh>, camSize,
//               focus(speakerId), tick(elapsedSec), dispose(scene) }
//
// background 키 → 무대 종류:
//   heaven_clouds  천계(황금 구름)   heaven_sunset 천계(노을)
//   council_hall   회의장(모닥불)    sinsi_dawn/sinsi_sunset/기타 들판
//
// cast: [{ id, name }] — 등장 순서대로. 첫 번째가 호스트(좌측), 나머지 우측 호.

import * as THREE from 'three';
import { buildUnit, tintUnit, faceTowards } from '../graphics/unit_builder.js';
import { buildEnvironment } from '../graphics/environment.js';
import { buildGodTree, buildAltar, buildCampfire, tickCampfire, buildTower } from '../graphics/buildings.js';

const BG_MAP = {
  heaven_clouds: { env: 'heaven', set: 'heaven' },
  heaven_sunset: { env: 'sunset', set: 'heaven' },
  council_hall:  { env: 'day',    set: 'council' },
  sinsi_dawn:    { env: 'dawn',   set: 'field' },
  sinsi_sunset:  { env: 'sunset', set: 'field' },
  taebaek_descent: { env: 'sunset', set: 'field' },
  asadal_founding: { env: 'dawn',  set: 'field' },
};

// 유닛 정의가 없는 대화 전용 인물 (환인·NPC 등)
const EXTRA_DEFS = {
  hwanin: { name: '환인', isLeader: true, colors: { armor: '#e8dcc0', cape: '#ffd700', flag: '#ffe9a0' } },
  ungnyeo_fallback: { name: '웅녀', colors: { armor: '#8a4a6a', cape: '#c45a8a', flag: '#d46aa0' } },
  villager: { name: '주민', colors: { armor: '#7a6a4a', cape: '#9a8a6a', flag: '#b0a080' } },
};

function findUnitDef(id, unitsData) {
  if (!unitsData) return null;
  for (const groupKey of ['ep1_allies', 'ep2_allies', 'ep1_enemies', 'ep2_enemies']) {
    const grp = unitsData[groupKey];
    if (grp && grp[id]) return { ...grp[id], _group: groupKey };
  }
  return null;
}

// 바닥 무대 세트
// PMREM 환경광 + ACES + bloom에서 밝은 알베도는 하얗게 탄다 — 감광 헬퍼
function dimGroup(g, factor) {
  g.traverse((o) => {
    if (o.isMesh && o.material && o.material.color) {
      o.material = o.material.clone();
      o.material.color.multiplyScalar(factor);
    }
  });
}

function buildStageSet(setKind) {
  const g = new THREE.Group();

  if (setKind === 'heaven') {
    // 황금빛 구름 단상 (bloom 과노출 방지 — 어두운 황토 톤)
    const plat = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 5.0, 0.5, 36),
      new THREE.MeshStandardMaterial({ color: 0xa08e70, roughness: 0.9, metalness: 0.0 })
    );
    plat.position.y = -0.25;
    plat.receiveShadow = true;
    g.add(plat);
    // 단상 가장자리 작은 구름 봉우리
    const puffMat = new THREE.MeshStandardMaterial({ color: 0x968868, roughness: 1.0 });
    for (let i = 0; i < 10; i++) {
      const ang = (i / 10) * Math.PI * 2;
      const s = 0.5 + (i % 3) * 0.22;
      const puff = new THREE.Mesh(new THREE.SphereGeometry(s, 10, 7), puffMat);
      puff.scale.y = 0.5;
      puff.position.set(Math.cos(ang) * 4.4, -0.1, Math.sin(ang) * 4.4);
      g.add(puff);
    }
    // 뒤편 하늘 제단 (감광)
    const altar = buildAltar({});
    altar.position.set(0, 0, -2.6);
    altar.scale.setScalar(1.35);
    dimGroup(altar, 0.62);
    g.add(altar);
  } else if (setKind === 'council') {
    // 회의장 — 나무 바닥 + 중앙 모닥불 + 뒤편 망루
    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(4.0, 4.0, 0.24, 28),
      new THREE.MeshStandardMaterial({ color: 0x8a6a42, roughness: 1.0 })
    );
    floor.position.y = -0.12;
    floor.receiveShadow = true;
    g.add(floor);
    const fire = buildCampfire({});
    fire.position.set(0, 0, 0.4);
    g.add(fire);
    g.userData._campfire = fire;
    const tower = buildTower({});
    tower.position.set(0, 0, -3.0);
    tower.scale.setScalar(1.5);
    g.add(tower);
  } else {
    // 들판 — 풀 단상 + 신단수
    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.8, 0.3, 32),
      new THREE.MeshStandardMaterial({ color: 0x5a7a3c, roughness: 1.0 })
    );
    floor.position.y = -0.15;
    floor.receiveShadow = true;
    g.add(floor);
    const tree = buildGodTree({ sacred: true, scale: 1.4 });
    tree.position.set(0, 0, -2.6);
    g.add(tree);
  }
  return g;
}

export function buildDialogueStage({ background, cast, unitsData }) {
  const kind = BG_MAP[background] || { env: 'day', set: 'field' };
  const group = new THREE.Group();
  group.userData = { type: 'dialogueStage', background };

  // 환경(하늘·원경) + 무대 세트
  const env = buildEnvironment(kind.env, {});
  group.add(env);
  const set = buildStageSet(kind.set);
  group.add(set);

  // ── 배우 배치 ─────────────────────────────
  // 카메라 azimuth = π/4 기준: 화면 오른쪽 ≈ 월드 (1,0,-1)/√2
  const RIGHT = new THREE.Vector3(1, 0, -1).normalize();
  const actors = new Map();
  const actorAnim = new Map(); // id → { hopT }
  const castArr = (cast || []).slice(0, 5);

  const host = castArr[0];
  const guests = castArr.slice(1);

  const placeActor = (c, pos, faceDir) => {
    const def = findUnitDef(c.id, unitsData) || EXTRA_DEFS[c.id] ||
      { ...EXTRA_DEFS.villager, name: c.name };
    const isAlly = def._group ? !def._group.includes('enemies') : true;
    const mesh = buildUnit({
      isAlly,
      isLeader: def.isLeader !== undefined ? !!def.isLeader : true,
      unitData: { id: c.id, name: def.name || c.name },
    });
    tintUnit(mesh, def.colors);
    mesh.scale.setScalar(1.3);
    mesh.position.copy(pos);
    mesh.lookAt(pos.x + faceDir.x, pos.y, pos.z + faceDir.z);
    group.add(mesh);
    actors.set(c.id, mesh);
    actorAnim.set(c.id, { hopT: 1 });
  };

  if (host) {
    const hostPos = RIGHT.clone().multiplyScalar(-1.25);
    hostPos.y = 0;
    placeActor(host, hostPos, RIGHT);
  }
  guests.forEach((c, i) => {
    // 우측에 호(arc) 배치 — 1명이면 정면 맞은편, 여럿이면 부챗살
    const spread = guests.length > 1 ? (i - (guests.length - 1) / 2) * 0.85 : 0;
    const pos = RIGHT.clone().multiplyScalar(1.25 + Math.abs(spread) * 0.25);
    // 화면 안쪽(카메라 쪽 대각)으로 벌리기
    const DEPTH = new THREE.Vector3(1, 0, 1).normalize();
    pos.add(DEPTH.clone().multiplyScalar(spread));
    pos.y = 0;
    placeActor(c, pos, RIGHT.clone().multiplyScalar(-1));
  });

  // ── 화자 스포트 링 ────────────────────────
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.34, 0.46, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffd24a, emissive: 0xffae20, emissiveIntensity: 1.2,
      roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.95,
      side: THREE.DoubleSide, depthWrite: false,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  ring.visible = false;
  ring.renderOrder = 50;
  group.add(ring);

  let focusedId = null;

  const stage = {
    group,
    actors,
    center: { x: 0, z: 0 },
    camSize: castArr.length >= 4 ? 4.4 : 3.4,

    /** 현재 대사 화자 강조 — 링 이동 + 짧은 홉 */
    focus(speakerId) {
      const mesh = actors.get(speakerId);
      if (!mesh) { ring.visible = false; focusedId = null; return null; }
      ring.visible = true;
      ring.position.x = mesh.position.x;
      ring.position.z = mesh.position.z;
      focusedId = speakerId;
      const anim = actorAnim.get(speakerId);
      if (anim) anim.hopT = 0;
      // 나머지는 화자를 바라본다
      for (const [id, m] of actors) {
        if (id !== speakerId) faceTowards(m, mesh.position);
      }
      return mesh.position;
    },

    /** 매 프레임 — elapsed 초 */
    tick(elapsed) {
      // 화자 홉
      for (const [id, anim] of actorAnim) {
        if (anim.hopT < 1) {
          anim.hopT = Math.min(1, anim.hopT + 0.055);
          const m = actors.get(id);
          if (m) m.position.y = Math.sin(anim.hopT * Math.PI) * 0.22;
        }
      }
      // 링 펄스
      if (ring.visible) {
        ring.material.opacity = 0.75 + Math.sin(elapsed * 5) * 0.2;
        ring.rotation.z = elapsed * 0.8;
      }
      // 모닥불
      if (set.userData._campfire) tickCampfire(set.userData._campfire, elapsed);
    },

    dispose(scene) {
      if (group.parent) scene.remove(group);
      ring.geometry.dispose();
      ring.material.dispose();
    },

    fog: env.userData.fog || null,
  };

  return stage;
}
