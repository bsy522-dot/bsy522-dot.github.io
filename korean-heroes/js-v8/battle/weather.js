// js-v8/battle/weather.js
// 한국사 영웅전 v8 · 날씨 시스템
// 02_BATTLE_SYSTEM §9:
//   맑음 · 비(불데미지 -30%, 이속-1) · 눈(공-2, 이속-1) · 안개(시야 3칸)

export const WEATHER = {
  clear: {
    id: 'clear',
    name: '맑음',
    atkMod: 0,
    movMod: 0,
    visibility: Infinity,
    elementMod: {},
    ambient: '#ffe0a0',
  },
  rain: {
    id: 'rain',
    name: '비',
    atkMod: 0,
    movMod: -1,
    visibility: Infinity,
    elementMod: { fire: 0.7 },  // 불 데미지 -30%
    ambient: '#6a7a9a',
  },
  snow: {
    id: 'snow',
    name: '눈',
    atkMod: -2,
    movMod: -1,
    visibility: Infinity,
    elementMod: {},
    ambient: '#d0e0ff',
  },
  fog: {
    id: 'fog',
    name: '안개',
    atkMod: 0,
    movMod: 0,
    visibility: 3,
    elementMod: {},
    ambient: '#888888',
  },
};

// ─────────────────────────────────────────────
// applyWeather(id, state?) → weather object
// state에 current weather를 기록, 나중에 calcDamage가 참조
// ─────────────────────────────────────────────
export function applyWeather(id, state) {
  const w = WEATHER[id] || WEATHER.clear;
  if (state) state.weather = w;
  return w;
}

export function getWeather(id) {
  return WEATHER[id] || WEATHER.clear;
}
