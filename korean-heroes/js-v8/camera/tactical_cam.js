// tactical_cam.js — OrthographicCamera 기반 택티컬 아이소메트릭 뷰
// 3d.html / squad-3d.html 원형. 45도 상부, 휠 줌, Y축 드래그 회전, WASD 팬
// 모바일: 1지 드래그 팬, 2지 핀치 줌, 2지 회전.
//
// export:
//   createTacticalCam(opts)
//   updateTacticalCam(cam, state)
//   bindTacticalInputs(cam, renderer, state)

import * as THREE from 'three';

const DEFAULTS = {
  camSize: 12,
  camSizeMin: 3,
  camSizeMax: 28,        // 큰 맵도 한눈에 — 영걸전 전장 조망
  position: new THREE.Vector3(14, 11, 14),
  target: new THREE.Vector3(0, 0, 0),
  panSpeed: 0.08,
  rotateSpeed: 0.008,
  wheelSpeed: 0.012,     // 휠 1tick 당 더 큰 줌 (큰 max 대응)
  pinchSpeed: 0.04,      // 모바일 핀치도 빠르게
  near: 0.1,
  far: 300
};

function aspect() {
  return window.innerWidth / window.innerHeight;
}

/**
 * 새로운 Tactical OrthographicCamera 생성.
 * state 객체도 함께 반환하여 update/input에서 공유.
 */
export function createTacticalCam(opts = {}) {
  const cfg = Object.assign({}, DEFAULTS, opts);
  const a = aspect();
  const cam = new THREE.OrthographicCamera(
    -cfg.camSize * a, cfg.camSize * a,
    cfg.camSize, -cfg.camSize,
    cfg.near, cfg.far
  );
  cam.position.copy(cfg.position);
  cam.lookAt(cfg.target);

  // 상태 저장 — cam 객체에 attach
  const state = {
    mode: 'tactical',
    camSize: cfg.camSize,
    camSizeMin: cfg.camSizeMin,
    camSizeMax: cfg.camSizeMax,
    target: cfg.target.clone(),
    // 구면 좌표계로 회전/거리 제어 (Y축 회전 중심)
    azimuth: Math.atan2(cfg.position.x - cfg.target.x, cfg.position.z - cfg.target.z), // Y축 회전각
    elevation: Math.atan2(cfg.position.y - cfg.target.y,
      Math.hypot(cfg.position.x - cfg.target.x, cfg.position.z - cfg.target.z)), // 고정
    distance: cfg.position.distanceTo(cfg.target),
    // 키보드 상태
    keys: { W: false, A: false, S: false, D: false, Q: false, E: false, Plus: false, Minus: false },
    cfg
  };
  cam.userData._tactical = state;
  updateTacticalCam(cam, state);
  return { cam, state };
}

/**
 * 매 프레임 호출. 키보드 입력 반영 + projection matrix 갱신.
 * state 객체는 createTacticalCam에서 받은 것.
 */
export function updateTacticalCam(cam, state) {
  if (!state) state = cam.userData._tactical;
  if (!state) return;
  const s = state;

  // 키보드 팬 (카메라 로컬 축 기준 — 화면 좌표)
  const pan = new THREE.Vector3();
  const forward = new THREE.Vector3().subVectors(s.target, cam.position);
  forward.y = 0; forward.normalize();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(-1);

  if (s.keys.W) pan.add(forward);
  if (s.keys.S) pan.sub(forward);
  if (s.keys.A) pan.sub(right);
  if (s.keys.D) pan.add(right);
  if (pan.lengthSq() > 0) {
    pan.normalize().multiplyScalar(s.cfg.panSpeed * s.camSize * 0.3);
    s.target.add(pan);
  }

  // Q/E 회전
  if (s.keys.Q) s.azimuth += 0.02;
  if (s.keys.E) s.azimuth -= 0.02;

  // +/- 줌
  if (s.keys.Plus) s.camSize = Math.max(s.camSizeMin, s.camSize - 0.1);
  if (s.keys.Minus) s.camSize = Math.min(s.camSizeMax, s.camSize + 0.1);

  // 구면 좌표 → 카메라 위치
  const horiz = Math.cos(s.elevation) * s.distance;
  const y = Math.sin(s.elevation) * s.distance;
  cam.position.set(
    s.target.x + Math.sin(s.azimuth) * horiz,
    s.target.y + y,
    s.target.z + Math.cos(s.azimuth) * horiz
  );
  cam.lookAt(s.target);

  // Ortho projection 갱신
  const a = aspect();
  cam.left = -s.camSize * a;
  cam.right = s.camSize * a;
  cam.top = s.camSize;
  cam.bottom = -s.camSize;
  cam.updateProjectionMatrix();
}

/**
 * 입력 바인딩. (마우스/휠/키보드/터치)
 * 모든 리스너는 renderer.domElement에 붙이며, 키보드는 window.
 * unbind 함수 반환.
 */
export function bindTacticalInputs(cam, renderer, state) {
  if (!state) state = cam.userData._tactical;
  const s = state;
  const dom = renderer.domElement;

  // --- Mouse ---
  let dragging = false;
  let lastX = 0, lastY = 0;
  let dragButton = 0;

  function onMouseDown(e) {
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    dragButton = e.button;
    e.preventDefault();
  }
  function onMouseMove(e) {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;

    if (dragButton === 2 || e.shiftKey) {
      // 우클릭 또는 Shift+좌클릭 → Y축 회전
      s.azimuth -= dx * s.cfg.rotateSpeed;
      // X축(고도) 회전은 범위 제한
      s.elevation = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, s.elevation - dy * s.cfg.rotateSpeed * 0.5));
    } else {
      // 좌클릭 드래그 → 팬
      const panScale = s.camSize * 0.003;
      const forward = new THREE.Vector3().subVectors(s.target, cam.position);
      forward.y = 0; forward.normalize();
      const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(-1);
      s.target.addScaledVector(right, -dx * panScale);
      s.target.addScaledVector(forward, dy * panScale);
    }
  }
  function onMouseUp() { dragging = false; }

  function onWheel(e) {
    e.preventDefault();
    s.camSize = Math.max(s.camSizeMin, Math.min(s.camSizeMax, s.camSize + e.deltaY * s.cfg.wheelSpeed));
  }

  function onContextMenu(e) { e.preventDefault(); }

  // --- Keyboard ---
  function onKeyDown(e) {
    const k = e.key.toLowerCase();
    if (k === 'w') s.keys.W = true;
    else if (k === 'a') s.keys.A = true;
    else if (k === 's') s.keys.S = true;
    else if (k === 'd') s.keys.D = true;
    else if (k === 'q') s.keys.Q = true;
    else if (k === 'e') s.keys.E = true;
    else if (k === '+' || k === '=') s.keys.Plus = true;
    else if (k === '-' || k === '_') s.keys.Minus = true;
  }
  function onKeyUp(e) {
    const k = e.key.toLowerCase();
    if (k === 'w') s.keys.W = false;
    else if (k === 'a') s.keys.A = false;
    else if (k === 's') s.keys.S = false;
    else if (k === 'd') s.keys.D = false;
    else if (k === 'q') s.keys.Q = false;
    else if (k === 'e') s.keys.E = false;
    else if (k === '+' || k === '=') s.keys.Plus = false;
    else if (k === '-' || k === '_') s.keys.Minus = false;
  }

  // --- Touch ---
  let touches = [];
  let lastPinchDist = 0;
  let lastTwoAngle = 0;
  let lastTouchMid = null;

  function getTouchMid(ts) {
    return { x: (ts[0].clientX + ts[1].clientX) / 2, y: (ts[0].clientY + ts[1].clientY) / 2 };
  }
  function getPinchDist(ts) {
    return Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY);
  }
  function getTwoAngle(ts) {
    return Math.atan2(ts[1].clientY - ts[0].clientY, ts[1].clientX - ts[0].clientX);
  }

  function onTouchStart(e) {
    touches = Array.from(e.touches);
    if (touches.length === 1) {
      lastX = touches[0].clientX; lastY = touches[0].clientY;
    } else if (touches.length === 2) {
      lastPinchDist = getPinchDist(touches);
      lastTwoAngle = getTwoAngle(touches);
      lastTouchMid = getTouchMid(touches);
    }
    e.preventDefault();
  }
  function onTouchMove(e) {
    touches = Array.from(e.touches);
    if (touches.length === 1) {
      // 1지 드래그 → 팬
      const dx = touches[0].clientX - lastX;
      const dy = touches[0].clientY - lastY;
      lastX = touches[0].clientX; lastY = touches[0].clientY;
      const panScale = s.camSize * 0.003;
      const forward = new THREE.Vector3().subVectors(s.target, cam.position);
      forward.y = 0; forward.normalize();
      const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(-1);
      s.target.addScaledVector(right, -dx * panScale);
      s.target.addScaledVector(forward, dy * panScale);
    } else if (touches.length === 2) {
      // 2지 → 핀치 줌 + 회전
      const dist = getPinchDist(touches);
      const ang = getTwoAngle(touches);
      const dDist = dist - lastPinchDist;
      let dAng = ang - lastTwoAngle;
      // 각도 wrap
      if (dAng > Math.PI) dAng -= Math.PI * 2;
      if (dAng < -Math.PI) dAng += Math.PI * 2;

      s.camSize = Math.max(s.camSizeMin, Math.min(s.camSizeMax, s.camSize - dDist * s.cfg.pinchSpeed));
      s.azimuth += dAng;

      lastPinchDist = dist;
      lastTwoAngle = ang;
    }
    e.preventDefault();
  }
  function onTouchEnd(e) {
    touches = Array.from(e.touches);
    if (touches.length === 1) {
      lastX = touches[0].clientX; lastY = touches[0].clientY;
    }
  }

  // --- Resize ---
  function onResize() { updateTacticalCam(cam, s); }

  // Attach
  dom.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  dom.addEventListener('wheel', onWheel, { passive: false });
  dom.addEventListener('contextmenu', onContextMenu);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  dom.addEventListener('touchstart', onTouchStart, { passive: false });
  dom.addEventListener('touchmove', onTouchMove, { passive: false });
  dom.addEventListener('touchend', onTouchEnd);
  window.addEventListener('resize', onResize);

  // unbind
  return function unbind() {
    dom.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    dom.removeEventListener('wheel', onWheel);
    dom.removeEventListener('contextmenu', onContextMenu);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    dom.removeEventListener('touchstart', onTouchStart);
    dom.removeEventListener('touchmove', onTouchMove);
    dom.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('resize', onResize);
  };
}
