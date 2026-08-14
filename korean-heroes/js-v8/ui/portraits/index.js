// js-v8/ui/portraits/index.js
// 고품질 초상 SVG barrel — 2026-07-17 초상 전면 재제작 (워크플로 산출물).
// portrait_art.js 가 이 모듈을 우선 조회하고, 없으면 기존 ART로 폴백한다.
// (EP2 8종 완성 시 이 파일에 추가)

import cheonmujang from './cheonmujang.js';
import gatekeeper from './gatekeeper.js';
import hwanin from './hwanin.js';
import hwanwoong from './hwanwoong.js';
import hwashin from './hwashin.js';
import merchant from './merchant.js';
import noigong from './noigong.js';
import pungbaek from './pungbaek.js';
import sanryeong from './sanryeong.js';
import sujang from './sujang.js';
import tavern_master from './tavern_master.js';
import traveler from './traveler.js';
import unsa from './unsa.js';
import usa from './usa.js';
import dangun from './dangun.js';
import ungnyeo from './ungnyeo.js';
import sinha_general from './sinha_general.js';
import hojok_chief from './hojok_chief.js';
import hojok_warrior from './hojok_warrior.js';
import hojok_archer from './hojok_archer.js';
import hojok_rider from './hojok_rider.js';
import hojok_shaman from './hojok_shaman.js';

const PORTRAITS = {
  cheonmujang, gatekeeper, hwanin, hwanwoong, hwashin, merchant,
  noigong, pungbaek, sanryeong, sujang, tavern_master, traveler, unsa, usa,
  dangun, ungnyeo, sinha_general,
  hojok_chief, hojok_warrior, hojok_archer, hojok_rider, hojok_shaman,
};

export default PORTRAITS;
