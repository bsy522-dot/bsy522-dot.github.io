// js-v8/graphics/postprocess.js
// 한국사 영웅전 v8 · 후처리 파이프라인
// Bloom (황금 빛) + Outline (만화체 윤곽선) + FXAA + Output (ACES sRGB).
// SSAO는 옵션 (모바일 무거움 → 기본 OFF).
// 01_GRAPHICS_STANDARD §1 톤매핑 보존.

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

// ─────────────────────────────────────────────
// 후처리 컴포저 셋업
// 반환: { composer, setCamera(cam), selectObjects(objs), setBloom(s,r,t), dispose() }
// ─────────────────────────────────────────────
export function setupComposer(renderer, scene, camera, opts = {}) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const composer = new EffectComposer(renderer);
  composer.setSize(w, h);
  composer.setPixelRatio(renderer.getPixelRatio());

  // 1) Render base
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 2) Outline — 만화체 (역사 만화 톤과 부합)
  const outlinePass = new OutlinePass(new THREE.Vector2(w, h), scene, camera);
  outlinePass.edgeStrength    = opts.outlineStrength    ?? 2.0;
  outlinePass.edgeGlow        = opts.outlineGlow        ?? 0.0;
  outlinePass.edgeThickness   = opts.outlineThickness   ?? 1.0;
  outlinePass.pulsePeriod     = 0;
  outlinePass.visibleEdgeColor.set(opts.outlineColor ?? '#ffd700'); // 황금
  outlinePass.hiddenEdgeColor.set('#000000');
  composer.addPass(outlinePass);

  // 3) Bloom — 황금 빛 (모닥불·갑옷·깃발 emissive 강조)
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    opts.bloomStrength  ?? 0.45,
    opts.bloomRadius    ?? 0.55,
    opts.bloomThreshold ?? 0.85,
  );
  composer.addPass(bloomPass);

  // 4) FXAA — 안티앨리어싱 보강 (Bloom 뒤)
  const fxaaPass = new ShaderPass(FXAAShader);
  const px = renderer.getPixelRatio();
  fxaaPass.material.uniforms['resolution'].value.set(1 / (w * px), 1 / (h * px));
  composer.addPass(fxaaPass);

  // 5) Output — ACES 톤매핑 + sRGB 출력 (renderer 설정 보존)
  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // ─── 리사이즈 ───
  const onResize = () => {
    const W = window.innerWidth, H = window.innerHeight;
    const PX = renderer.getPixelRatio();
    composer.setSize(W, H);
    bloomPass.setSize(W, H);
    outlinePass.setSize(W, H);
    fxaaPass.material.uniforms['resolution'].value.set(1 / (W * PX), 1 / (H * PX));
  };
  window.addEventListener('resize', onResize);

  // ─── 핸들 ───
  return {
    composer,
    renderPass,
    outlinePass,
    bloomPass,
    fxaaPass,
    outputPass,

    setCamera(newCam) {
      if (!newCam) return;
      renderPass.camera   = newCam;
      outlinePass.renderCamera = newCam;
    },

    selectObjects(objs) {
      outlinePass.selectedObjects = Array.isArray(objs) ? objs : (objs ? [objs] : []);
    },

    setBloom(strength, radius, threshold) {
      if (strength  !== undefined) bloomPass.strength  = strength;
      if (radius    !== undefined) bloomPass.radius    = radius;
      if (threshold !== undefined) bloomPass.threshold = threshold;
    },

    dispose() {
      window.removeEventListener('resize', onResize);
      composer.dispose?.();
    },
  };
}
