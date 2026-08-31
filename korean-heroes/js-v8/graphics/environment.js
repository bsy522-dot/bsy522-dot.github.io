// js-v8/graphics/environment.js
// 전장/마을/천계 배경 환경 — 하늘 돔 + 지평선 스커트 + 원경 산 실루엣 + 구름.
// 맵이 검은 허공에 떠 보이는 문제를 해소한다 (영걸전식 "화면 가득한 세계").
//
// export:
//   buildEnvironment(theme, opts) → THREE.Group  (userData.type='environment')
//   ENV_THEMES
//
// theme: 'dawn'(전투 새벽) | 'day'(마을 낮) | 'heaven'(천계 황금) | 'sunset'(천계 노을)
// opts:  { centerX, centerZ, mapRadius } — 맵 중심 월드좌표(기본 0,0)와
//        맵 반경(대각선 절반, 월드 유닛). mapRadius 안쪽에는 스케너리를 두지 않는다.
//
// 주의: 하늘/원경 재질은 fog 미적용(material.fog=false) — 엔진 fog(far 55)에
// 삼켜지지 않게 한다. 산/구름은 절반만 fog 적용해 깊이감을 낸다.

import * as THREE from 'three';

export const ENV_THEMES = {
  dawn: {
    // skyBottom은 지면 톤과 일치 — 모바일 세로 전투에서 화면 하단에 돔 하부가
    // 보라 띠로 비치던 문제 (5단계 비서B 검증 지적)
    skyTop: 0x2a2050, skyHorizon: 0xd88a4a, skyBottom: 0x2f3a26,
    ground: 0x4a5a38, groundFar: 0x2c3626,
    mountain: 0x3a2e48, mountainFar: 0x2a2240,
    cloud: 0xf0d8c0, cloudOpacity: 0.85,
    sun: { color: 0xffc060, y: 26, dist: 95, size: 7 },
    fog: { color: 0x54405a, near: 26, far: 90 },
    scenery: {
      trunk: 0x4a3220, canopy: 0x2c4426, canopyAlt: 0x1f3320,
      rock: 0x54494a, patch: 0x415030, patchAlt: 0x55603a, hill: 0x44543a,
    },
  },
  day: {
    // skyBottom은 지면 톤과 일치시킨다 — 직교 카메라에서는 화면 하단 픽셀의
    // 시선이 카메라 뒤쪽에서 지면과 만나 클리핑되므로, 지면이 아니라 돔 하부가
    // 비친다. 하늘색이면 "정체불명의 파란 띠"로 보인다 (2026-08-31 감사 B4).
    skyTop: 0x4a78b8, skyHorizon: 0xbfe0ee, skyBottom: 0x53703e,
    ground: 0x5a7a42, groundFar: 0x3c5230,
    mountain: 0x4a6858, mountainFar: 0x64809a,
    cloud: 0xffffff, cloudOpacity: 0.92,
    sun: { color: 0xfff4cc, y: 40, dist: 100, size: 6 },
    fog: { color: 0x9ec0d8, near: 30, far: 100 },
    scenery: {
      trunk: 0x6b4226, canopy: 0x2f5a22, canopyAlt: 0x40702c,
      rock: 0x7c7468, patch: 0x4e6c3a, patchAlt: 0x688a4a, hill: 0x51713c,
    },
  },
  heaven: {
    // 과노출 방지 — bloom+ACES에서 하얗게 타지 않도록 채도/명도 절제
    skyTop: 0x54408a, skyHorizon: 0xd8a860, skyBottom: 0xb08048,
    ground: null,   // 천계는 땅 대신 구름바다
    groundFar: null,
    mountain: 0x7a58a8, mountainFar: 0x9878bc,
    cloud: 0x9a8c74, cloudOpacity: 0.92,
    sun: { color: 0xf0d890, y: 30, dist: 90, size: 7 },
    fog: { color: 0x9a7848, near: 20, far: 70 },
  },
  sunset: {
    skyTop: 0x48286a, skyHorizon: 0xd87848, skyBottom: 0x984830,
    ground: null,
    groundFar: null,
    mountain: 0x5a3458, mountainFar: 0x744878,
    cloud: 0xc8a488, cloudOpacity: 0.92,
    sun: { color: 0xe08040, y: 14, dist: 80, size: 9 },
    fog: { color: 0x804838, near: 20, far: 70 },
  },
};

// 하늘 돔 — 정점 색으로 상→지평선 그라데이션 (unlit)
function buildSkyDome(t) {
  const R = 130;
  const geo = new THREE.SphereGeometry(R, 32, 18);
  const top = new THREE.Color(t.skyTop);
  const hor = new THREE.Color(t.skyHorizon);
  const bot = new THREE.Color(t.skyBottom);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / R; // -1..1
    if (y >= 0) {
      // 지평선(0)→천정(1): horizon → top, 지평선 부근을 넓게
      c.lerpColors(hor, top, Math.pow(Math.min(1, y * 1.35), 0.75));
    } else {
      c.lerpColors(hor, bot, Math.min(1, -y * 2.2));
    }
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true, side: THREE.BackSide, fog: false,
    depthWrite: false,
  });
  const m = new THREE.Mesh(geo, mat);
  m.renderOrder = -100;
  return m;
}

// 태양/광원 원반 + 글로우
function buildSunDisc(t) {
  const g = new THREE.Group();
  const s = t.sun;
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(s.size, 24),
    new THREE.MeshBasicMaterial({ color: s.color, fog: false, transparent: true, opacity: 0.95, depthWrite: false })
  );
  const glow = new THREE.Mesh(
    new THREE.CircleGeometry(s.size * 2.4, 24),
    new THREE.MeshBasicMaterial({ color: s.color, fog: false, transparent: true, opacity: 0.22, depthWrite: false })
  );
  // 카메라 기본 방향(+x,+z에서 내려다봄)의 반대편 하늘에 배치
  g.add(glow); g.add(disc);
  g.position.set(-s.dist * 0.5, s.y, -s.dist);
  g.lookAt(0, 0, 0);
  g.children.forEach(ch => { ch.renderOrder = -95; });
  return g;
}

// 원경 산 실루엣 링 — 불규칙한 원뿔들
function buildMountainRing(t, seedBase, opts = {}) {
  const g = new THREE.Group();
  const matNear = new THREE.MeshBasicMaterial({ color: t.mountain, fog: false, transparent: true, opacity: 0.95, depthWrite: false });
  const matFar = new THREE.MeshBasicMaterial({ color: t.mountainFar, fog: false, transparent: true, opacity: 0.8, depthWrite: false });
  // 결정적 의사난수 (Math.random 금지 규율은 워크플로용이지만, 재현성 위해 시드 사용)
  let seed = seedBase;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  // ★ 2026-08-31: 반지름을 맵 크기에 맞춰 당긴다. 고정 58/82는 세로 화면
  //   택티컬 시야(±35 유닛) 밖이라 한 번도 보이지 않았다 (감사 B4).
  const near = Math.max(46, (opts.inner || 0) + 34);
  const ringDefs = [
    { r: near, n: 18, hMin: 7, hMax: 15, wMin: 9, wMax: 16, mat: matNear, y: -0.5 },
    { r: near * 1.45, n: 14, hMin: 12, hMax: 24, wMin: 15, wMax: 26, mat: matFar, y: -0.5 },
  ];
  for (const rd of ringDefs) {
    for (let i = 0; i < rd.n; i++) {
      const ang = (i / rd.n) * Math.PI * 2 + rand() * 0.5;
      const h = rd.hMin + rand() * (rd.hMax - rd.hMin);
      const w = rd.wMin + rand() * (rd.wMax - rd.wMin);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(w, h, 5), rd.mat);
      cone.position.set(Math.cos(ang) * rd.r, rd.y + h / 2 - 0.6, Math.sin(ang) * rd.r);
      cone.rotation.y = rand() * Math.PI;
      cone.renderOrder = -90;
      g.add(cone);
    }
  }
  return g;
}

// 지평선 스커트 — 맵 주변을 채우는 큰 원판 (lit, fog 적용)
function buildGroundSkirt(t) {
  const g = new THREE.Group();
  const near = new THREE.Mesh(
    new THREE.CircleGeometry(60, 48),
    new THREE.MeshStandardMaterial({ color: t.ground, roughness: 1.0, metalness: 0.0 })
  );
  near.rotation.x = -Math.PI / 2;
  near.position.y = -0.06;
  near.receiveShadow = true;
  const far = new THREE.Mesh(
    new THREE.CircleGeometry(110, 48),
    new THREE.MeshBasicMaterial({ color: t.groundFar, fog: false })
  );
  far.rotation.x = -Math.PI / 2;
  far.position.y = -0.12;
  far.renderOrder = -98;
  g.add(far); g.add(near);
  return g;
}

// 근경 스케너리 — 맵 바깥 들판을 채우는 나무·바위·둔덕·풀밭 얼룩.
//
// 왜 필요한가: 직교 택티컬 카메라는 세로 화면에서 맵 폭에 맞춰 줌아웃하므로
// 12칸 맵이라도 세로로 70유닛 가까이가 보인다. 원경 산 링(r 58~82)은 이 시야
// 밖이라, 맵 주변은 지면 원판의 단색 초록만 남아 "만들다 만 화면"으로 읽혔다
// (2026-08-31 감사 B4: 화면 60~70%가 단색 공백).
// 맵 반경 바로 바깥부터 시야 끝까지를 채워 세계가 이어져 보이게 한다.
//
// 성능: 종류별 InstancedMesh 1개 = 드로우콜 6개. 좌표는 시드 기반 결정론.
function buildNearScenery(t, seedBase, inner, outer) {
  const sc = t.scenery;
  const g = new THREE.Group();
  if (!sc) return g;

  let seed = seedBase;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  // inner ~ outer 사이 고리에 균등 분포 (면적 보정)
  const ringPos = () => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(inner * inner + rand() * (outer * outer - inner * inner));
    return { x: Math.cos(a) * r, z: Math.sin(a) * r, r };
  };

  const dummy = new THREE.Object3D();
  const put = (mesh, i, x, y, z, sx, sy, sz, ry) => {
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, ry, 0);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  };

  // ── 들판 얼룩 (색이 다른 납작 원판) — 단색 평면 깨기 ──
  {
    const N = 30;
    const geo = new THREE.CircleGeometry(1, 12);
    geo.rotateX(-Math.PI / 2);
    const mats = [
      new THREE.MeshStandardMaterial({ color: sc.patch, roughness: 1.0, metalness: 0.0 }),
      new THREE.MeshStandardMaterial({ color: sc.patchAlt, roughness: 1.0, metalness: 0.0 }),
    ];
    for (let k = 0; k < 2; k++) {
      const im = new THREE.InstancedMesh(geo, mats[k], N);
      for (let i = 0; i < N; i++) {
        const p = ringPos();
        const s = 2.4 + rand() * 6.5;
        put(im, i, p.x, -0.045 + k * 0.004, p.z, s, 1, s * (0.6 + rand() * 0.7), rand() * 3.14);
      }
      im.receiveShadow = true;
      im.instanceMatrix.needsUpdate = true;
      g.add(im);
    }
  }

  // ── 둔덕 (납작 구체) — 지면 기복 ──
  {
    const N = 12;
    const im = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 10, 7),
      new THREE.MeshStandardMaterial({ color: sc.hill, roughness: 1.0, metalness: 0.0 }),
      N
    );
    for (let i = 0; i < N; i++) {
      const p = ringPos();
      const s = 3.0 + rand() * 5.5;
      put(im, i, p.x, -s * 0.16, p.z, s, s * 0.22, s * (0.7 + rand() * 0.6), rand() * 3.14);
    }
    im.castShadow = false; im.receiveShadow = true;
    im.instanceMatrix.needsUpdate = true;
    g.add(im);
  }

  // ── 나무 (줄기 + 잎 2색) ──
  {
    const N = 130;
    const trunkIM = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.09, 0.13, 0.7, 6),
      new THREE.MeshStandardMaterial({ color: sc.trunk, roughness: 1.0, metalness: 0.0 }),
      N
    );
    const leafGeo = new THREE.ConeGeometry(0.52, 1.15, 7);
    const leafA = new THREE.InstancedMesh(
      leafGeo, new THREE.MeshStandardMaterial({ color: sc.canopy, roughness: 1.0, metalness: 0.0 }), N
    );
    const leafB = new THREE.InstancedMesh(
      leafGeo, new THREE.MeshStandardMaterial({ color: sc.canopyAlt, roughness: 1.0, metalness: 0.0 }), N
    );
    let na = 0, nb = 0;
    const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < N; i++) {
      const p = ringPos();
      // 멀수록 크게 — 원근 없는 직교에서도 깊이감이 나도록
      const s = 0.85 + rand() * 0.7 + Math.min(1.1, (p.r - inner) / Math.max(1, outer - inner)) * 0.9;
      const ry = rand() * 3.14;
      put(trunkIM, i, p.x, 0.35 * s, p.z, s, s, s, ry);
      const useA = rand() < 0.55;
      const tgt = useA ? leafA : leafB;
      const idx = useA ? na++ : nb++;
      put(tgt, idx, p.x, (0.70 + 0.58) * s, p.z, s, s * (0.85 + rand() * 0.5), s, ry);
    }
    for (let i = na; i < N; i++) leafA.setMatrixAt(i, hidden);
    for (let i = nb; i < N; i++) leafB.setMatrixAt(i, hidden);
    for (const m of [trunkIM, leafA, leafB]) {
      m.castShadow = true;
      m.instanceMatrix.needsUpdate = true;
      g.add(m);
    }
  }

  // ── 바위 ──
  {
    const N = 26;
    const im = new THREE.InstancedMesh(
      new THREE.DodecahedronGeometry(0.5, 0),
      new THREE.MeshStandardMaterial({ color: sc.rock, roughness: 1.0, metalness: 0.0 }),
      N
    );
    for (let i = 0; i < N; i++) {
      const p = ringPos();
      const s = 0.6 + rand() * 1.5;
      put(im, i, p.x, s * 0.32, p.z, s, s * 0.75, s, rand() * 3.14);
    }
    im.castShadow = true;
    im.instanceMatrix.needsUpdate = true;
    g.add(im);
  }

  return g;
}

// 구름바다 (천계) — 겹친 납작 구체 무리
function buildCloudSea(t, seedBase) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: t.cloud, roughness: 1.0, metalness: 0.0,
    transparent: true, opacity: t.cloudOpacity,
  });
  let seed = seedBase;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let ring = 0; ring < 3; ring++) {
    const r0 = 8 + ring * 14;
    const n = 10 + ring * 6;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + rand();
      const rr = r0 + rand() * 8;
      const s = 2.2 + rand() * 3.4 + ring * 1.2;
      const puff = new THREE.Mesh(new THREE.SphereGeometry(s, 10, 7), mat);
      puff.scale.y = 0.32;
      puff.position.set(Math.cos(ang) * rr, -1.4 - ring * 0.5 - rand() * 0.8, Math.sin(ang) * rr);
      g.add(puff);
    }
  }
  return g;
}

// 하늘 떠다니는 구름 몇 점
function buildSkyClouds(t, seedBase) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    color: t.cloud, fog: false, transparent: true, opacity: 0.55, depthWrite: false,
  });
  let seed = seedBase;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 7; i++) {
    const cl = new THREE.Group();
    const nPuff = 3 + Math.floor(rand() * 3);
    for (let p = 0; p < nPuff; p++) {
      const s = 2.0 + rand() * 2.6;
      const puff = new THREE.Mesh(new THREE.SphereGeometry(s, 8, 6), mat);
      puff.scale.y = 0.4;
      puff.position.set(p * s * 1.1 - nPuff * s * 0.5, rand() * 0.8, rand() * 1.6);
      puff.renderOrder = -85;
      cl.add(puff);
    }
    const ang = rand() * Math.PI * 2;
    const r = 45 + rand() * 35;
    cl.position.set(Math.cos(ang) * r, 16 + rand() * 14, Math.sin(ang) * r);
    g.add(cl);
  }
  return g;
}

/**
 * 배경 환경 구축. 반환 그룹을 scene.add 하고, 씬 전환 시 scene.remove 하면 된다.
 * 엔진 fog/배경색도 테마에 맞춰 조정한다 (State는 호출측이 넘김).
 */
export function buildEnvironment(theme, opts = {}) {
  const t = ENV_THEMES[theme] || ENV_THEMES.dawn;
  const cx = opts.centerX || 0;
  const cz = opts.centerZ || 0;
  const seed = (theme.length * 7919 + 12345) | 0;

  const g = new THREE.Group();
  g.userData = { type: 'environment', theme };

  // 맵 반경(월드 유닛) — 근경 스케너리가 맵을 덮지 않도록 여기서부터 배치한다.
  const inner = Math.max(6, (opts.mapRadius || 9) + 1.6);

  g.add(buildSkyDome(t));
  g.add(buildSunDisc(t));
  g.add(buildMountainRing(t, seed + 11, { inner }));
  g.add(buildSkyClouds(t, seed + 37));
  if (t.ground != null) {
    g.add(buildGroundSkirt(t));
    g.add(buildNearScenery(t, seed + 71, inner, Math.max(inner + 12, 33)));
  } else {
    g.add(buildCloudSea(t, seed + 53));
  }

  g.position.set(cx, 0, cz);

  // 씬 fog 조정치를 userData로 노출 — 호출측에서 State.scene.fog에 반영
  g.userData.fog = t.fog;
  return g;
}
