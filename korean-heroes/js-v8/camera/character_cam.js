// character_cam.js — 3인칭 오버숄더 PerspectiveCamera (FOV 50)
// 3d-epic.html 원형. target.quaternion 기준 오프셋 적용, lerp 0.15.
// raycast로 벽 충돌 시 카메라 앞당김.
//
// export:
//   createCharacterCam(opts)
//   updateCharacterCam(cam, targetObj, opts)

import * as THREE from 'three';

const DEFAULTS = {
  fov: 62,                                  // 시야 넓힘 — 맵이 더 보이게
  near: 0.1,
  far: 250,
  offset: new THREE.Vector3(-4, 8, -10),    // 뒤-위-옆 — 멀리 + 위 (영걸전 조감)
  lookAtOffset: new THREE.Vector3(0, 0.6, 0),
  lerp: 0.15,
  collisionMargin: 0.3
};

export function createCharacterCam(opts = {}) {
  const cfg = Object.assign({}, DEFAULTS, opts);
  const cam = new THREE.PerspectiveCamera(
    cfg.fov, window.innerWidth / window.innerHeight, cfg.near, cfg.far
  );
  cam.userData._character = { cfg, lastTarget: new THREE.Vector3() };
  cam.position.set(5, 3, 5);
  cam.lookAt(0, 0.8, 0);
  return { cam };
}

/**
 * 매 프레임 호출.
 * targetObj: THREE.Object3D (position + quaternion 필요)
 * opts.obstacles: Raycast 대상 Object3D 배열 (선택). 있으면 벽 충돌 시 카메라 앞당김.
 */
export function updateCharacterCam(cam, targetObj, opts = {}) {
  if (!targetObj) return;
  const s = cam.userData._character;
  if (!s) return;
  const cfg = s.cfg;

  // 월드 오프셋 계산 (target quaternion 적용)
  const worldOffset = cfg.offset.clone().applyQuaternion(targetObj.quaternion);
  const desired = targetObj.position.clone().add(worldOffset);

  // raycast로 벽 충돌 검사
  if (opts.obstacles && opts.obstacles.length > 0) {
    const origin = targetObj.position.clone().add(cfg.lookAtOffset);
    const dir = desired.clone().sub(origin);
    const dist = dir.length();
    if (dist > 0.001) {
      dir.normalize();
      const ray = new THREE.Raycaster(origin, dir, 0, dist);
      const hits = ray.intersectObjects(opts.obstacles, true);
      if (hits.length > 0) {
        const hit = hits[0].distance;
        const safe = Math.max(cfg.collisionMargin, hit - cfg.collisionMargin);
        desired.copy(origin).addScaledVector(dir, safe);
      }
    }
  }

  // 부드러운 추적
  cam.position.lerp(desired, cfg.lerp);
  const lookTarget = targetObj.position.clone().add(cfg.lookAtOffset);
  cam.lookAt(lookTarget);

  // 리사이즈 반영
  const a = window.innerWidth / window.innerHeight;
  if (Math.abs(cam.aspect - a) > 0.001) {
    cam.aspect = a;
    cam.updateProjectionMatrix();
  }

  s.lastTarget.copy(lookTarget);
}
