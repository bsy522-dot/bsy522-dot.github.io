// js-v8/graphics/environment.js
// 전장/마을/천계 배경 환경 — 하늘 돔 + 지평선 스커트 + 원경 산 실루엣 + 구름.
// 맵이 검은 허공에 떠 보이는 문제를 해소한다 (영걸전식 "화면 가득한 세계").
//
// export:
//   buildEnvironment(theme, opts) → THREE.Group  (userData.type='environment')
//   ENV_THEMES
//
// theme: 'dawn'(전투 새벽) | 'day'(마을 낮) | 'heaven'(천계 황금) | 'sunset'(천계 노을)
// opts:  { centerX, centerZ }  — 맵 중심 월드좌표 (기본 0,0)
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
  },
  day: {
    skyTop: 0x4a78b8, skyHorizon: 0xbfe0ee, skyBottom: 0x88a8c8,
    ground: 0x5a7a42, groundFar: 0x3c5230,
    mountain: 0x4a6858, mountainFar: 0x64809a,
    cloud: 0xffffff, cloudOpacity: 0.92,
    sun: { color: 0xfff4cc, y: 40, dist: 100, size: 6 },
    fog: { color: 0x9ec0d8, near: 30, far: 100 },
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
function buildMountainRing(t, seedBase) {
  const g = new THREE.Group();
  const matNear = new THREE.MeshBasicMaterial({ color: t.mountain, fog: false, transparent: true, opacity: 0.95, depthWrite: false });
  const matFar = new THREE.MeshBasicMaterial({ color: t.mountainFar, fog: false, transparent: true, opacity: 0.8, depthWrite: false });
  // 결정적 의사난수 (Math.random 금지 규율은 워크플로용이지만, 재현성 위해 시드 사용)
  let seed = seedBase;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const ringDefs = [
    { r: 58, n: 16, hMin: 7, hMax: 15, wMin: 9, wMax: 16, mat: matNear, y: -0.5 },
    { r: 82, n: 13, hMin: 12, hMax: 24, wMin: 15, wMax: 26, mat: matFar, y: -0.5 },
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

  g.add(buildSkyDome(t));
  g.add(buildSunDisc(t));
  g.add(buildMountainRing(t, seed + 11));
  g.add(buildSkyClouds(t, seed + 37));
  if (t.ground != null) {
    g.add(buildGroundSkirt(t));
  } else {
    g.add(buildCloudSea(t, seed + 53));
  }

  g.position.set(cx, 0, cz);

  // 씬 fog 조정치를 userData로 노출 — 호출측에서 State.scene.fog에 반영
  g.userData.fog = t.fog;
  return g;
}
