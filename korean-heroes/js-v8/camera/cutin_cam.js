// cutin_cam.js — 전투 컷인 전용 PerspectiveCamera (FOV 45, 망원 드라마틱)
// 03_CAMERA_MODES §7 기준.
//
// export:
//   setupCutinCam(attacker, target, opts) — PerspectiveCamera 반환
//   updateCutinCam(cam, attacker, target)

import * as THREE from 'three';

const DEFAULTS = {
  fov: 45,
  near: 0.1,
  far: 200,
  sideScale: 2.5,
  up: 1.5
};

export function setupCutinCam(attacker, target, opts = {}) {
  const cfg = Object.assign({}, DEFAULTS, opts);
  const cam = new THREE.PerspectiveCamera(
    cfg.fov, window.innerWidth / window.innerHeight, cfg.near, cfg.far
  );
  cam.userData._cutin = { cfg };
  updateCutinCam(cam, attacker, target);
  return cam;
}

export function updateCutinCam(cam, attacker, target) {
  if (!attacker || !target) return;
  const s = cam.userData._cutin;
  if (!s) return;
  const cfg = s.cfg;

  const aPos = attacker.position ? attacker.position : attacker;
  const tPos = target.position ? target.position : target;

  const mid = aPos.clone().lerp(tPos, 0.5);
  const dirAT = new THREE.Vector3().subVectors(tPos, aPos);
  // 수평 사이드 (y축 외적)
  let side = new THREE.Vector3().crossVectors(dirAT, new THREE.Vector3(0, 1, 0));
  if (side.lengthSq() < 0.0001) side.set(1, 0, 0);
  side.normalize().multiplyScalar(cfg.sideScale);

  cam.position.copy(mid).add(side).add(new THREE.Vector3(0, cfg.up, 0));
  cam.lookAt(mid);

  const a = window.innerWidth / window.innerHeight;
  if (Math.abs(cam.aspect - a) > 0.001) {
    cam.aspect = a;
    cam.updateProjectionMatrix();
  }
}
