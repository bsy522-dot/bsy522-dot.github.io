// js-v8/core/engine.js
// 한국사 영웅전 v8 · Three.js r160 엔진 뼈대
// 01_GRAPHICS_STANDARD §1 엄수. WebGLRenderer + ACES + PCFSoft + sRGB.

import * as THREE from 'three';
import { setupComposer } from '../graphics/postprocess.js';
import { setupEnvironment } from '../graphics/lighting.js';

// ─────────────────────────────────────────────
// 전역 State — 게임 상태머신
// 다른 모듈이 import 해서 사용.
// ─────────────────────────────────────────────
export const State = {
  mode: 'title',   // 'title' | 'explore' | 'battle' | 'dialogue' | 'menu'
  turn: 1,
  debug: false,
  // 런타임 시 engine.init()이 주입
  scene: null,
  renderer: null,
  camera: null,
  clock: null,
  animQueue: [],    // [ (dt) => boolean ]  — true면 큐에서 제거
  updateCallbacks: [], // [ (dt, elapsed) => void ] — 매 프레임 실행
};

// 진단용: 전역 에러 핸들러(korean-rpg-v8.html)가 State.mode를 읽을 수 있도록
// 같은 객체 참조를 window에 노출. 읽기 전용 가정 — 외부에서 변경하지 말 것.
if (typeof window !== 'undefined') {
  window.__v8State = State;
}

// ─────────────────────────────────────────────
// Debug overlay (FPS + 폴리곤 카운터)
// ─────────────────────────────────────────────
function makeDebugOverlay() {
  const el = document.createElement('div');
  el.id = 'v8-debug';
  // 모바일 우상단 메뉴(설정) 가림 방지 — 우하단으로 이동, 작게.
  el.style.cssText = [
    'position:fixed','bottom:6px','right:6px','z-index:9999',
    'font-family:"Noto Serif KR",monospace','font-size:10px',
    'color:#ffd700','background:rgba(0,0,0,.55)',
    'padding:3px 7px','border-radius:4px','pointer-events:none',
    'white-space:pre','line-height:1.35','opacity:.85',
  ].join(';');
  el.textContent = 'FPS —\nTRI —';
  document.body.appendChild(el);
  return el;
}

// ─────────────────────────────────────────────
// 엔진 초기화
// opts:
//   containerEl?: DOMElement (default body)
//   bgColor?:    number (default 0x1a1428)
//   fog?:        {color, near, far}
//   pixelRatioCap?: number (default 2)
//   debug?:      bool
// ─────────────────────────────────────────────
export function initEngine(opts = {}) {
  const container = opts.containerEl || document.body;
  const bgColor   = opts.bgColor ?? 0x1a1428;
  const fogCfg    = opts.fog ?? { color: bgColor, near: 15, far: 45 };
  const pxCap     = opts.pixelRatioCap ?? 2;
  const debug     = opts.debug ?? false;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor);
  if (fogCfg) {
    scene.fog = new THREE.Fog(fogCfg.color, fogCfg.near, fogCfg.far);
  }

  // Renderer — 01_GRAPHICS_STANDARD §1 필수값 전부 적용
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pxCap));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Camera — Perspective (Agent B가 camera/ 에서 교체/보강)
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 200);
  camera.position.set(14, 11, 14);
  camera.lookAt(0, 0, 0);

  // ─── 후처리 컴포저 (Bloom + Outline + FXAA + Output) ───
  // 디스크 0, 즉시 비주얼 향상
  const composerHandle = setupComposer(renderer, scene, camera, opts.composer || {});

  // ─── PMREM 환경맵 (메탈/유리 재질 광택) ───
  // RoomEnvironment 사용 — HDR 파일 없이 즉시 동작, 디스크 0
  setupEnvironment(scene, renderer).catch((e) => {
    console.warn('[engine] PMREM environment 적용 실패 (무시):', e);
  });

  // Resize handler
  const onResize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    if (camera.isPerspectiveCamera) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    } else if (camera.isOrthographicCamera) {
      // 프리셋 복원은 camera 매니저 몫이지만 기본 폴백
      const a = w / h;
      const sz = (camera.top + -camera.bottom) / 2;
      camera.left   = -sz * a;
      camera.right  =  sz * a;
      camera.top    =  sz;
      camera.bottom = -sz;
      camera.updateProjectionMatrix();
    }
  };
  window.addEventListener('resize', onResize);

  // Clock
  const clock = new THREE.Clock();

  // Debug overlay
  const debugEl = debug ? makeDebugOverlay() : null;
  let fpsAccum = 0, fpsFrames = 0, fpsText = '—';

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Anim queue (연속 실행: 여러 애니가 동시에 돌 수 있도록)
    if (State.animQueue.length) {
      for (let i = State.animQueue.length - 1; i >= 0; i--) {
        const done = State.animQueue[i](dt, elapsed);
        if (done) State.animQueue.splice(i, 1);
      }
    }

    // User update callbacks
    for (const cb of State.updateCallbacks) {
      try { cb(dt, elapsed); } catch (e) { console.error('[engine] update cb err', e); }
    }

    // 가설1 방어: State.camera가 일시적으로 falsy인 프레임이 생기면 local camera로 fallback.
    // composerHandle/renderPass가 어떤 이유로 사라지면 setCamera 호출을 건너뛰고 warn만.
    const cam = State.camera || camera;
    if (composerHandle && composerHandle.renderPass) {
      if (composerHandle.renderPass.camera !== cam) {
        if (cam) {
          composerHandle.setCamera(cam);
        } else if (!window.__v8WarnedNullCam) {
          window.__v8WarnedNullCam = true;
          console.warn('[engine] State.camera and local camera both falsy — skip setCamera');
        }
      }
    } else if (!window.__v8WarnedNullComposer) {
      window.__v8WarnedNullComposer = true;
      console.warn('[engine] composerHandle missing — skip setCamera');
    }
    composerHandle.composer.render(dt);

    // Debug HUD
    if (debugEl) {
      fpsAccum += dt; fpsFrames++;
      if (fpsAccum >= 0.5) {
        fpsText = (fpsFrames / fpsAccum).toFixed(0);
        fpsAccum = 0; fpsFrames = 0;
      }
      const info = renderer.info.render;
      debugEl.textContent =
        `FPS ${fpsText}\n` +
        `TRI ${info.triangles.toLocaleString()}\n` +
        `CALL ${info.calls}\n` +
        `MODE ${State.mode}`;
    }
  }
  animate();

  // Inject into State
  State.scene = scene;
  State.renderer = renderer;
  State.camera = camera;
  State.clock = clock;
  State.debug = debug;
  State.debugEl = debugEl;
  State.composer = composerHandle.composer;
  State.composerHandle = composerHandle;

  return State;
}

// ─────────────────────────────────────────────
// 외부 편의: animation queue 등록
// ─────────────────────────────────────────────
export function queueAnim(fn)       { State.animQueue.push(fn); }
export function onUpdate(fn)        { State.updateCallbacks.push(fn); }
export function setMode(mode)       { State.mode = mode; }
export function setCamera(cam)      { State.camera = cam; }
export function toggleDebug(force)  {
  const v = force !== undefined ? !!force : !State.debug;
  State.debug = v;
  if (v && !State.debugEl) State.debugEl = makeDebugOverlay();
  else if (!v && State.debugEl) {
    State.debugEl.remove(); State.debugEl = null;
  }
}
