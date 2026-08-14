// js-v8/core/audio.js
// 한국사 영웅전 v8 · Web Audio API 기반 AudioManager
// allinone AudioManager 이식 + ADSR 엔벨로프 + 펜타토닉 확장.
// v6 "삑삑 MIDI 하드코딩" 금지. BGM 4종 / SFX 8종.
//
// 사용:
//   import { audio } from './core/audio.js';
//   audio.init();                 // 최초 1회 (터치/클릭 핸들러 안에서)
//   audio.playBGM('battle');
//   audio.playSFX('hit');
//   audio.setBGMVolume(0.7); audio.setSFXVolume(0.8);
//   audio.mute(true);

const STORAGE_KEY = 'history-rpg-audio-v8';

// 한국 전통 펜타토닉 (궁상각치우) - 반음 간격 [0,2,4,7,9]
// 2옥타브 확장: [0,2,4,7,9, 12,14,16,19,21]
const PENTA_INTERVALS = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];

// BGM 트랙 스펙: 각 트랙은 멜로디 시퀀스(노트 인덱스 + 길이 박자).
// ADSR 엔벨로프 공통: A=0.02, D=0.10, S=0.6, R=0.30
const BGM_TRACKS = {
  // 타이틀 — 평화 (sine, 낮은 템포, 장조)
  title: {
    baseFreq: 261.63,     // C4
    tempo: 0.55,
    waveform: 'sine',
    melody: [
      [0,1],[2,1],[4,1],[2,1],
      [3,1],[4,1],[2,1],[0,2],
      [4,1],[5,1],[7,1],[5,1],
      [4,1],[2,1],[0,1],[2,2]
    ],
    bassFreq: 130.81,     // C3
    bass: [0, 0, 4, 2],
    loop: true
  },
  // 전투 — 긴박 (sawtooth, 빠른 템포, 단조적 느낌)
  battle: {
    baseFreq: 220.0,      // A3
    tempo: 0.26,
    waveform: 'sawtooth',
    melody: [
      [0,1],[2,1],[4,1],[3,1],
      [1,1],[4,1],[2,1],[0,1],
      [3,1],[1,1],[4,1],[2,1],
      [0,1],[3,1],[4,2],[1,1]
    ],
    bassFreq: 110.0,      // A2
    bass: [0, 0, 3, 4],
    loop: true
  },
  // 보스 — 웅장 (triangle + 긴 음가, 저음 강조)
  boss: {
    baseFreq: 196.0,      // G3
    tempo: 0.40,
    waveform: 'triangle',
    melody: [
      [0,2],[3,1],[4,1],
      [2,2],[5,1],[7,1],
      [4,2],[3,1],[5,1],
      [0,2],[4,1],[2,2]
    ],
    bassFreq: 98.0,       // G2
    bass: [0, 4, 3, 0],
    loop: true
  },
  // 마을/평화 — 목가 (triangle, 느린 템포, 장조) ★ 2026-07-07 QA: story의 bgm:"peace"가
  // 트랙 미정의로 마을이 무음이던 버그 수정
  peace: {
    baseFreq: 293.66,     // D4
    tempo: 0.60,
    waveform: 'triangle',
    melody: [
      [0,2],[2,1],[4,1],
      [5,2],[4,1],[2,1],
      [0,1],[2,1],[4,2],
      [2,1],[4,1],[0,2]
    ],
    bassFreq: 146.83,     // D3
    bass: [0, 4, 5, 4],
    loop: true
  },
  // 승리 — 개선 (sine, 상승형, 짧게 끝남)
  victory: {
    baseFreq: 329.63,     // E4
    tempo: 0.30,
    waveform: 'sine',
    melody: [
      [0,1],[2,1],[4,1],[5,1],
      [7,2],[5,1],[7,1],
      [9,3],[7,1]
    ],
    bassFreq: 164.81,
    bass: [0, 4, 7],
    loop: true
  }
};

// ─────────────────────────────────────────────
// AudioManager
// ─────────────────────────────────────────────
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    this.convolver = null;    // reverb (optional)
    this.currentBGMId = null;
    this.bgmTimeout = null;
    this.bgmOscillators = [];
    this.initialized = false;
    this.muted = false;
    // 기본 볼륨
    this.bgmVolume = 0.5;     // 0~1
    this.sfxVolume = 0.7;

    // localStorage 로드
    this._loadPrefs();

    // 모바일 최초 터치 언락 바인딩
    this._unlockBound = false;
    this._bindUnlock();
  }

  _loadPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.bgmVolume === 'number') this.bgmVolume = Math.max(0, Math.min(1, d.bgmVolume));
        if (typeof d.sfxVolume === 'number') this.sfxVolume = Math.max(0, Math.min(1, d.sfxVolume));
        if (typeof d.muted === 'boolean') this.muted = d.muted;
      }
    } catch (e) { /* ignore */ }
  }

  _savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        bgmVolume: this.bgmVolume,
        sfxVolume: this.sfxVolume,
        muted: this.muted
      }));
    } catch (e) { /* ignore */ }
  }

  _bindUnlock() {
    if (this._unlockBound) return;
    this._unlockBound = true;
    const unlock = () => {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      window.removeEventListener('touchstart', unlock, true);
      window.removeEventListener('mousedown', unlock, true);
      window.removeEventListener('keydown', unlock, true);
    };
    window.addEventListener('touchstart', unlock, true);
    window.addEventListener('mousedown', unlock, true);
    window.addEventListener('keydown', unlock, true);
  }

  init() {
    if (this.initialized) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) { console.warn('[audio] Web Audio API not supported'); return; }
      this.ctx = new Ctx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : 1;
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = this.bgmVolume;
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.masterGain);

      // 리버브 대체: 간단한 2채널 딜레이 피드백 (공간감)
      try {
        const delay = this.ctx.createDelay(1.0);
        delay.delayTime.value = 0.09;
        const fb = this.ctx.createGain();
        fb.gain.value = 0.18;
        delay.connect(fb);
        fb.connect(delay);
        const dWet = this.ctx.createGain();
        dWet.gain.value = 0.12;
        delay.connect(dWet);
        dWet.connect(this.masterGain);
        this.delayNode = delay;
        this.delayWet = dWet;
      } catch (e) {
        this.delayNode = null;
      }

      this.initialized = true;
    } catch (e) {
      console.warn('[audio] init failed', e);
    }
  }

  // 펜타토닉 주파수 계산
  _pentaFreq(base, idx) {
    const semis = PENTA_INTERVALS[((idx % PENTA_INTERVALS.length) + PENTA_INTERVALS.length) % PENTA_INTERVALS.length];
    return base * Math.pow(2, semis / 12);
  }

  // ADSR 노트 스케줄
  _scheduleNote(startTime, durSec, freq, waveform, destGain, peakGain = 0.3) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = waveform;
    osc.frequency.value = freq;

    const A = 0.02;
    const D = 0.10;
    const S = 0.6;
    const R = Math.min(0.30, Math.max(0.05, durSec * 0.25));
    const sustainLevel = peakGain * S;

    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(peakGain, startTime + A);
    env.gain.linearRampToValueAtTime(sustainLevel, startTime + A + D);
    // Sustain hold
    const releaseStart = Math.max(startTime + A + D, startTime + durSec - R);
    env.gain.setValueAtTime(sustainLevel, releaseStart);
    env.gain.linearRampToValueAtTime(0.0001, startTime + durSec);

    osc.connect(env);
    env.connect(destGain);
    // 약간의 공간감 — 딜레이에도 매우 약한 send
    if (this.delayNode) {
      const send = this.ctx.createGain();
      send.gain.value = 0.05;
      env.connect(send);
      send.connect(this.delayNode);
    }

    osc.start(startTime);
    osc.stop(startTime + durSec + 0.05);

    return osc;
  }

  // BGM 재생
  playBGM(trackId) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    const track = BGM_TRACKS[trackId];
    if (!track) { console.warn('[audio] unknown BGM', trackId); return; }

    // 이미 같은 곡 재생 중이면 패스
    if (this.currentBGMId === trackId && this.bgmTimeout) return;

    this.stopBGM();
    this.currentBGMId = trackId;

    const playLoop = () => {
      if (this.currentBGMId !== trackId) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const now = this.ctx.currentTime + 0.02;
      const { baseFreq, tempo, waveform, melody, bass, bassFreq } = track;

      // 1단계: 멜로디
      let cursor = 0;
      melody.forEach(([noteIdx, beats]) => {
        const freq = this._pentaFreq(baseFreq, noteIdx);
        const dur = beats * tempo;
        this._scheduleNote(now + cursor, dur * 0.95, freq, waveform, this.bgmGain, 0.18);
        cursor += dur;
      });

      // 2단계: 저음 (있다면, 4박 반복)
      if (bass && bassFreq) {
        let bCursor = 0;
        const totalBeats = cursor;
        let bi = 0;
        while (bCursor < totalBeats - tempo * 0.01) {
          const noteIdx = bass[bi % bass.length];
          const freq = this._pentaFreq(bassFreq, noteIdx);
          const dur = tempo * 4; // 긴 베이스
          this._scheduleNote(now + bCursor, Math.min(dur, totalBeats - bCursor) * 0.98, freq, 'triangle', this.bgmGain, 0.10);
          bCursor += dur;
          bi++;
        }
      }

      const totalMs = cursor * 1000;
      if (track.loop) {
        this.bgmTimeout = setTimeout(playLoop, Math.max(200, totalMs - 20));
      }
    };

    playLoop();
  }

  stopBGM() {
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
    this.currentBGMId = null;
    // 진행중 오실레이터는 자체 stop으로 끝남 (짧게 꼬리)
  }

  // SFX 재생 — 8종
  playSFX(id) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    const now = this.ctx.currentTime + 0.001;

    switch (id) {
      case 'hit': {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'square'; o.frequency.value = 160;
        o.frequency.linearRampToValueAtTime(70, now + 0.12);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.45, now + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        o.connect(g); g.connect(this.sfxGain);
        o.start(now); o.stop(now + 0.2);
        this._noiseBurst(now, 0.06, 0.12);
        break;
      }
      case 'skill': {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = 420;
        o.frequency.exponentialRampToValueAtTime(900, now + 0.22);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.33, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        o.connect(g); g.connect(this.sfxGain);
        o.start(now); o.stop(now + 0.4);
        break;
      }
      case 'heal': {
        // 상승 3화음
        [523.25, 659.25, 783.99].forEach((f, i) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'sine'; o.frequency.value = f;
          const t0 = now + i * 0.07;
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(0.22, t0 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
          o.connect(g); g.connect(this.sfxGain);
          o.start(t0); o.stop(t0 + 0.45);
        });
        break;
      }
      case 'death': {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = 220;
        o.frequency.exponentialRampToValueAtTime(55, now + 0.45);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.35, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        o.connect(g); g.connect(this.sfxGain);
        o.start(now); o.stop(now + 0.55);
        break;
      }
      case 'click': {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = 720;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.18, now + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        o.connect(g); g.connect(this.sfxGain);
        o.start(now); o.stop(now + 0.1);
        break;
      }
      case 'levelup': {
        // 상승 아르페지오
        [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'sine'; o.frequency.value = f;
          const t0 = now + i * 0.10;
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(0.28, t0 + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
          o.connect(g); g.connect(this.sfxGain);
          o.start(t0); o.stop(t0 + 0.4);
        });
        break;
      }
      case 'victory': {
        // 승리 팡파레
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = i < 2 ? 'triangle' : 'sine';
          o.frequency.value = f;
          const t0 = now + i * 0.13;
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(0.30, t0 + 0.025);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.55);
          o.connect(g); g.connect(this.sfxGain);
          o.start(t0); o.stop(t0 + 0.6);
        });
        break;
      }
      case 'crit': {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'square'; o.frequency.value = 320;
        o.frequency.exponentialRampToValueAtTime(640, now + 0.04);
        o.frequency.exponentialRampToValueAtTime(120, now + 0.22);
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.52, now + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        o.connect(g); g.connect(this.sfxGain);
        o.start(now); o.stop(now + 0.32);
        this._noiseBurst(now, 0.04, 0.16);
        break;
      }
      default:
        console.warn('[audio] unknown SFX', id);
    }
  }

  // 노이즈 버스트 — hit/crit 타격감
  _noiseBurst(startTime, peak, dur) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(peak, startTime);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);
    src.connect(g); g.connect(this.sfxGain);
    src.start(startTime);
  }

  setBGMVolume(v) {
    this.bgmVolume = Math.max(0, Math.min(1, v));
    if (this.bgmGain) this.bgmGain.gain.value = this.bgmVolume;
    this._savePrefs();
  }

  setSFXVolume(v) {
    this.sfxVolume = Math.max(0, Math.min(1, v));
    if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume;
    this._savePrefs();
  }

  getBGMVolume() { return this.bgmVolume; }
  getSFXVolume() { return this.sfxVolume; }

  mute(onoff) {
    this.muted = !!onoff;
    if (this.masterGain) this.masterGain.gain.value = this.muted ? 0 : 1;
    this._savePrefs();
  }

  isMuted() { return this.muted; }
}

// 싱글턴 — 편의 import
export const audio = new AudioManager();
