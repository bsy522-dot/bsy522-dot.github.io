// squad_cam.js — 분대 후방 추적 PerspectiveCamera (FOV 60)
// fullloop-3d.html 원형. 분대 중심+진군방향 기반 후방/상부.
//
// export:
//   createSquadCam(opts)
//   updateSquadCam(cam, squadObjs, forwardVec, opts)

import * as THREE from 'three';

const DEFAULTS = {
  fov: 60,
  near: 0.1,
  far: 200,
  back: 5,      // 후방 거리
  up: 3.5,      // 상부 높이
  lookUp: 1,    // 시선 중심 상부 오프셋
  lerp: 0.12
};

export function createSquadCam(opts = {}) {
  const cfg = Object.assign({}, DEFAULTS, opts);
  const cam = new THREE.PerspectiveCamera(
    cfg.fov, window.innerWidth / window.innerHeight, cfg.near, cfg.far
  );
  cam.userData._squad = { cfg, lastForward: new THREE.Vector3(0, 0, 1) };
  cam.position.set(0, cfg.up, -cfg.back);
  cam.lookAt(0, cfg.lookUp, 0);
  return { cam };
}

/**
 * 분대 카메라 업데이트.
 * squadObjs: THREE.Object3D[] — 분대원. position만 사용.
 * forwardVec: THREE.Vector3 — 진군 방향 (정규화되지 않아도 됨, 내부에서 정규화)
 */
export function updateSquadCam(cam, squadObjs, forwardVec, opts = {}) {
  const s = cam.userData._squad;
  if (!s) return;
  const cfg = s.cfg;

  // squad center
  const center = new THREE.Vector3();
  let n = 0;
  if (squadObjs && squadObjs.length > 0) {
    for (const o of squadObjs) {
      if (o && o.position) { center.add(o.position); n++; }
    }
    if (n > 0) center.divideScalar(n);
  }

  // forward 갱신 (0이면 이전 값 유지)
  const fwd = s.lastForward.clone();
  if (forwardVec && forwardVec.lengthSq() > 0.0001) {
    fwd.copy(forwardVec).setY(0).normalize();
    s.lastForward.copy(fwd);
  }

  // target position: center - forward*back + up
  const back = fwd.clone().multiplyScalar(-cfg.back);
  const target = center.clone().add(back).add(new THREE.Vector3(0, cfg.up, 0));

  cam.position.lerp(target, cfg.lerp);
  cam.lookAt(center.clone().add(new THREE.Vector3(0, cfg.lookUp, 0)));

  const a = window.innerWidth / window.innerHeight;
  if (Math.abs(cam.aspect - a) > 0.001) {
    cam.aspect = a;
    cam.updateProjectionMatrix();
  }
}
