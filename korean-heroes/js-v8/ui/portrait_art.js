// js-v8/ui/portrait_art.js
// 한국사 영웅전 v8 · 인물 SVG 일러스트 (영걸전 톤)
// emoji 대신 stylized SVG 초상 — 환인/환웅/풍백/우사/운사/단군/웅녀/해설 등

const SIZE = 'viewBox="0 0 200 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:14px"';

// ─────────────────────────────────────────────
// 공통 부속
// ─────────────────────────────────────────────
const sunRays = (cx, cy, r1, r2, color, count = 12) => {
  let s = `<g transform="translate(${cx},${cy})" opacity="0.55" stroke="${color}" stroke-width="1.6">`;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    s += `<line x1="${Math.cos(a)*r1}" y1="${Math.sin(a)*r1}" x2="${Math.cos(a)*r2}" y2="${Math.sin(a)*r2}"/>`;
  }
  return s + '</g>';
};
const face = (cx, cy, r, skin) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${skin}" stroke="#8a5a2a" stroke-width="1"/>`;
const eyes = (cx, cy, dx = 9, ey = 0) => `
  <ellipse cx="${cx-dx}" cy="${cy+ey}" rx="2.2" ry="1.4" fill="#000"/>
  <ellipse cx="${cx+dx}" cy="${cy+ey}" rx="2.2" ry="1.4" fill="#000"/>
  <path d="M${cx-13} ${cy-5} Q${cx-dx} ${cy-9} ${cx-3} ${cy-5}" stroke="#3a1a08" fill="none" stroke-width="1.5"/>
  <path d="M${cx+3} ${cy-5} Q${cx+dx} ${cy-9} ${cx+13} ${cy-5}" stroke="#3a1a08" fill="none" stroke-width="1.5"/>
`;
const mouth = (cx, cy, w = 8) => `<path d="M${cx-w} ${cy} Q${cx} ${cy+3} ${cx+w} ${cy}" stroke="#5a2a1a" fill="none" stroke-width="1.6" stroke-linecap="round"/>`;

// ─────────────────────────────────────────────
// 인물별 SVG
// ─────────────────────────────────────────────
const ART = {
  // 환인 — 하늘의 아버지, 황금 후광, 흰 수염, 천관
  hwanin: `<svg ${SIZE}>
    <defs>
      <radialGradient id="bg-hwanin" cx="50%" cy="35%" r="80%">
        <stop offset="0%" stop-color="#fff5d0"/>
        <stop offset="40%" stop-color="#ffba50"/>
        <stop offset="100%" stop-color="#5a2c00"/>
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-hwanin)"/>
    ${sunRays(100, 95, 50, 92, '#fff8b0', 16)}
    <ellipse cx="100" cy="270" rx="80" ry="14" fill="#3a1a00" opacity="0.5"/>
    <!-- 도포 -->
    <path d="M55 158 Q50 200 52 270 L148 270 Q150 200 145 158 Q120 150 100 150 Q80 150 55 158 Z" fill="#e8b860" stroke="#8a5018" stroke-width="1.5"/>
    <path d="M100 158 L100 268" stroke="#8a5018" stroke-width="2"/>
    <circle cx="100" cy="180" r="6" fill="#cd7f32" stroke="#5a3000" stroke-width="1"/>
    <!-- 머리 -->
    ${face(100, 108, 32, '#fde0b8')}
    <!-- 천관 (관) -->
    <path d="M68 88 L100 56 L132 88 Z" fill="#cd7f32" stroke="#5a3000" stroke-width="1.5"/>
    <rect x="64" y="86" width="72" height="9" fill="#a06020" stroke="#5a3000" stroke-width="1"/>
    <circle cx="100" cy="62" r="4" fill="#ffd700"/>
    <!-- 흰 수염 -->
    <path d="M82 130 Q90 170 100 175 Q110 170 118 130" fill="#f0f0f0" stroke="#bbb" stroke-width="1"/>
    <path d="M86 138 Q100 165 114 138" fill="#fff" opacity="0.7"/>
    ${eyes(100, 110)}
    <!-- 콧수염 흰 -->
    <path d="M88 124 Q100 128 112 124" stroke="#ccc" stroke-width="2" fill="none"/>
  </svg>`,

  // 환웅 — 청년 천왕, 청동 헬멧, 어깨 갑옷, 망토
  hwanwoong: `<svg ${SIZE}>
    <defs>
      <linearGradient id="bg-hwanwoong" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5a3a8a"/>
        <stop offset="60%" stop-color="#2a1a40"/>
        <stop offset="100%" stop-color="#1a0820"/>
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-hwanwoong)"/>
    ${sunRays(100, 90, 48, 80, '#ffd060', 12)}
    <!-- 망토 (붉은) -->
    <path d="M40 160 L20 270 L80 270 L70 165" fill="#aa2020" opacity="0.85"/>
    <path d="M160 160 L180 270 L120 270 L130 165" fill="#aa2020" opacity="0.85"/>
    <!-- 갑옷 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#c4956a" stroke="#5a3a1a" stroke-width="1.5"/>
    <!-- 어깨 보호대 -->
    <ellipse cx="58" cy="160" rx="14" ry="9" fill="#cd7f32" stroke="#5a3000" stroke-width="1"/>
    <ellipse cx="142" cy="160" rx="14" ry="9" fill="#cd7f32" stroke="#5a3000" stroke-width="1"/>
    <!-- 가슴 단추 3개 -->
    <circle cx="100" cy="180" r="5" fill="#cd7f32" stroke="#5a3000"/>
    <circle cx="100" cy="200" r="5" fill="#cd7f32" stroke="#5a3000"/>
    <circle cx="100" cy="220" r="5" fill="#cd7f32" stroke="#5a3000"/>
    <!-- 머리 -->
    ${face(100, 110, 30, '#f4cea8')}
    <!-- 청동 헬멧 -->
    <path d="M70 95 Q70 60 100 50 Q130 60 130 95" fill="#cd7f32" stroke="#5a3000" stroke-width="1.5"/>
    <ellipse cx="100" cy="50" rx="5" ry="14" fill="#aa6020"/>
    <path d="M100 36 Q97 30 100 22 Q103 30 100 36" fill="#aa2020"/>
    <!-- 머리카락 (검은 앞머리) -->
    <path d="M75 100 Q90 90 100 92 Q110 90 125 100" fill="#1a0a00"/>
    ${eyes(100, 112)}
    ${mouth(100, 128, 6)}
  </svg>`,

  // 풍백 — 바람 신장, 푸른 도포, 머리에 깃털
  pungbaek: `<svg ${SIZE}>
    <defs>
      <linearGradient id="bg-pung" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a6080"/>
        <stop offset="100%" stop-color="#0a1a2a"/>
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-pung)"/>
    <!-- 바람 흐름선 -->
    <path d="M0 80 Q60 70 130 90 T200 100" stroke="#9bd0ff" fill="none" stroke-width="1.5" opacity="0.6"/>
    <path d="M0 130 Q70 120 150 145 T200 155" stroke="#9bd0ff" fill="none" stroke-width="1.5" opacity="0.5"/>
    <path d="M0 200 Q80 195 160 215 T200 225" stroke="#9bd0ff" fill="none" stroke-width="1.5" opacity="0.4"/>
    <!-- 도포 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#3a5a8a" stroke="#1a3050" stroke-width="1.5"/>
    <path d="M100 158 L100 268" stroke="#1a3050" stroke-width="2"/>
    <!-- 어깨 -->
    <path d="M55 160 L70 158 L65 175 Z" fill="#5a7aaa"/>
    <path d="M145 160 L130 158 L135 175 Z" fill="#5a7aaa"/>
    <!-- 머리 -->
    ${face(100, 112, 30, '#e8c098')}
    <!-- 머리카락 (긴) -->
    <path d="M70 100 Q72 85 80 75 Q90 70 100 72 Q110 70 120 75 Q128 85 130 100 Q135 130 132 145 L130 142 Q128 130 128 110 Q72 130 72 142 L70 145 Q65 130 70 100 Z" fill="#1a1810"/>
    <!-- 깃털 (3개) -->
    <path d="M75 70 Q72 50 75 42 Q78 50 78 70 Z" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <path d="M100 60 Q97 35 100 25 Q103 35 103 60 Z" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <path d="M125 70 Q122 50 125 42 Q128 50 128 70 Z" fill="#fff" stroke="#aaa" stroke-width="1"/>
    ${eyes(100, 114)}
    ${mouth(100, 130, 5)}
  </svg>`,

  // 우사 — 비 신장, 회푸른 도포, 우산모자
  usa: `<svg ${SIZE}>
    <defs>
      <linearGradient id="bg-usa" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#506a8a"/>
        <stop offset="100%" stop-color="#0a1828"/>
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-usa)"/>
    <!-- 빗줄기 -->
    ${[20,40,60,80,100,120,140,160,180].map(x => `<line x1="${x}" y1="20" x2="${x-8}" y2="60" stroke="#a8d0ff" stroke-width="1.2" opacity="0.55"/>`).join('')}
    ${[15,55,95,135,175].map(x => `<line x1="${x}" y1="60" x2="${x-8}" y2="100" stroke="#a8d0ff" stroke-width="1.2" opacity="0.45"/>`).join('')}
    <!-- 도포 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#506680" stroke="#202c40" stroke-width="1.5"/>
    <path d="M100 158 L100 268" stroke="#202c40" stroke-width="2"/>
    <!-- 머리 -->
    ${face(100, 116, 28, '#dab895')}
    <!-- 삿갓 (우산모자) -->
    <ellipse cx="100" cy="86" rx="48" ry="14" fill="#3a4a5a" stroke="#1a2030" stroke-width="1.5"/>
    <path d="M52 86 Q100 60 148 86" fill="#5a6a7a" stroke="#1a2030" stroke-width="1.5"/>
    <ellipse cx="100" cy="86" rx="6" ry="3" fill="#1a2030"/>
    ${eyes(100, 118)}
    ${mouth(100, 134, 5)}
  </svg>`,

  // 운사 — 구름 신장, 흰 도포, 구름 모티프
  unsa: `<svg ${SIZE}>
    <defs>
      <linearGradient id="bg-unsa" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#a0a8b8"/>
        <stop offset="100%" stop-color="#2a3040"/>
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-unsa)"/>
    <!-- 구름 패턴 -->
    <ellipse cx="40" cy="60" rx="22" ry="10" fill="#fff" opacity="0.55"/>
    <ellipse cx="55" cy="58" rx="18" ry="9" fill="#fff" opacity="0.5"/>
    <ellipse cx="160" cy="80" rx="26" ry="11" fill="#fff" opacity="0.5"/>
    <ellipse cx="175" cy="78" rx="14" ry="8" fill="#fff" opacity="0.45"/>
    <ellipse cx="100" cy="35" rx="30" ry="9" fill="#fff" opacity="0.4"/>
    <!-- 도포 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#e8e8f0" stroke="#5a5a6a" stroke-width="1.5"/>
    <path d="M100 158 L100 268" stroke="#5a5a6a" stroke-width="2"/>
    <!-- 구름 무늬 (가슴) -->
    <ellipse cx="90" cy="190" rx="10" ry="5" fill="#bcc4d4" opacity="0.7"/>
    <ellipse cx="110" cy="200" rx="12" ry="6" fill="#bcc4d4" opacity="0.7"/>
    <!-- 머리 -->
    ${face(100, 112, 30, '#e0c8a8')}
    <!-- 머리카락 (회색) -->
    <path d="M70 100 Q72 75 100 70 Q128 75 130 100 L128 105 Q100 90 72 105 Z" fill="#5a5a6a"/>
    <!-- 띠 -->
    <ellipse cx="100" cy="80" rx="32" ry="5" fill="#cccdd0" stroke="#5a5a6a"/>
    ${eyes(100, 114)}
    ${mouth(100, 130, 5)}
  </svg>`,

  // 단군 — 청년 왕, 황금 도포, 왕관
  dangun: `<svg ${SIZE}>
    <defs>
      <radialGradient id="bg-dangun" cx="50%" cy="35%" r="80%">
        <stop offset="0%" stop-color="#fff0c0"/>
        <stop offset="50%" stop-color="#aa7020"/>
        <stop offset="100%" stop-color="#3a1800"/>
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-dangun)"/>
    ${sunRays(100, 90, 50, 86, '#ffd700', 14)}
    <!-- 도포 (황금) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#e0a830" stroke="#5a3a08" stroke-width="1.5"/>
    <!-- 가슴 자수 (태극) -->
    <circle cx="100" cy="200" r="14" fill="#cd1f1f" stroke="#5a0808"/>
    <path d="M100 186 Q86 200 100 214 Q114 200 100 186 Z" fill="#1a3aaa"/>
    <circle cx="100" cy="193" r="3" fill="#cd1f1f"/>
    <circle cx="100" cy="207" r="3" fill="#1a3aaa"/>
    <!-- 머리 -->
    ${face(100, 112, 30, '#f4cea8')}
    <!-- 왕관 (5점) -->
    <path d="M68 88 L72 64 L82 80 L92 56 L100 78 L108 56 L118 80 L128 64 L132 88 Z" fill="#ffd700" stroke="#5a3a08" stroke-width="1.5"/>
    <rect x="68" y="86" width="64" height="6" fill="#cd9020" stroke="#5a3a08"/>
    <circle cx="100" cy="68" r="4" fill="#cd1f1f"/>
    <!-- 검은 머리 -->
    <path d="M75 102 Q90 95 100 96 Q110 95 125 102" fill="#0a0500"/>
    ${eyes(100, 114)}
    ${mouth(100, 130, 6)}
  </svg>`,

  // 웅녀 — 분홍 한복, 머리장식 꽃
  ungnyeo: `<svg ${SIZE}>
    <defs>
      <linearGradient id="bg-ung" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffb0c8"/>
        <stop offset="100%" stop-color="#5a2030"/>
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-ung)"/>
    <!-- 꽃잎 흩날림 -->
    ${[[30,80],[170,60],[60,180],[150,200],[90,40],[120,140]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ffe0e8" opacity="0.7"/>`).join('')}
    <!-- 한복 치마 (분홍) -->
    <path d="M50 175 Q40 220 45 270 L155 270 Q160 220 150 175 Q120 165 100 165 Q80 165 50 175 Z" fill="#e890a8" stroke="#5a2030" stroke-width="1.5"/>
    <!-- 저고리 (옅은 분홍) -->
    <path d="M60 158 L60 178 Q80 175 100 175 Q120 175 140 178 L140 158 Q120 152 100 152 Q80 152 60 158 Z" fill="#fadce4" stroke="#aa5060" stroke-width="1.5"/>
    <!-- 옷고름 (붉은 끈) -->
    <path d="M100 160 L100 180 M95 165 L105 165" stroke="#cd1f1f" stroke-width="2"/>
    <!-- 머리 -->
    ${face(100, 110, 30, '#fadcb8')}
    <!-- 검은 머리 (가르마) -->
    <path d="M70 95 Q72 70 100 65 Q128 70 130 95 L128 100 Q100 78 72 100 Z" fill="#1a0808"/>
    <path d="M100 65 L100 95" stroke="#3a1808" stroke-width="1"/>
    <!-- 머리장식 (꽃) -->
    <g transform="translate(80,72)">
      <circle r="6" fill="#ffd0e0" stroke="#aa5060"/>
      <circle r="3" fill="#cd1f1f"/>
    </g>
    <g transform="translate(120,72)">
      <circle r="5" fill="#ffd0e0" stroke="#aa5060"/>
      <circle r="2" fill="#cd1f1f"/>
    </g>
    ${eyes(100, 112, 8)}
    <!-- 입술 (붉은) -->
    <path d="M93 130 Q100 134 107 130" stroke="#cd1f1f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- 볼 (분홍) -->
    <ellipse cx="83" cy="120" rx="4" ry="2" fill="#ff90a8" opacity="0.7"/>
    <ellipse cx="117" cy="120" rx="4" ry="2" fill="#ff90a8" opacity="0.7"/>
  </svg>`,

  // 해설 — 두루마리 + 붓
  narrator: `<svg ${SIZE}>
    <defs>
      <linearGradient id="bg-nar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a3a4a"/>
        <stop offset="100%" stop-color="#0a0a18"/>
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-nar)"/>
    <!-- 두루마리 -->
    <rect x="30" y="80" width="140" height="140" rx="6" fill="#f0e0c0" stroke="#5a3a1a" stroke-width="2"/>
    <line x1="40" y1="120" x2="160" y2="120" stroke="#8a5a2a" stroke-width="1.2"/>
    <line x1="40" y1="140" x2="160" y2="140" stroke="#8a5a2a" stroke-width="1.2"/>
    <line x1="40" y1="160" x2="160" y2="160" stroke="#8a5a2a" stroke-width="1.2"/>
    <line x1="40" y1="180" x2="160" y2="180" stroke="#8a5a2a" stroke-width="1.2"/>
    <line x1="40" y1="200" x2="160" y2="200" stroke="#8a5a2a" stroke-width="1.2"/>
    <!-- 두루마리 양쪽 봉 -->
    <rect x="22" y="76" width="14" height="148" fill="#aa6020" stroke="#5a3000" stroke-width="1.5" rx="3"/>
    <rect x="164" y="76" width="14" height="148" fill="#aa6020" stroke="#5a3000" stroke-width="1.5" rx="3"/>
    <!-- 한자 (古/史) -->
    <text x="100" y="160" font-size="64" font-weight="900" fill="#3a1a08" text-anchor="middle" font-family="'Noto Serif KR', serif">史</text>
    <!-- 붓 -->
    <line x1="160" y1="240" x2="120" y2="200" stroke="#5a3000" stroke-width="3"/>
    <ellipse cx="118" cy="198" rx="4" ry="8" fill="#1a0a00" transform="rotate(-45 118 198)"/>
  </svg>`,

  // ── EP.1 적군 ────────────────────────────────────

  // 천무장 — 하늘의 장수, 붉은 갑옷, 큰 검
  cheonmujang: `<svg ${SIZE}>
    <defs><linearGradient id="bg-chm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6a1a1a"/><stop offset="100%" stop-color="#1a0606"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-chm)"/>
    <path d="M30 80 L40 60 M170 80 L160 60 M100 30 L100 50" stroke="#ff6060" stroke-width="2" opacity="0.5"/>
    <!-- 큰 검 (좌측) -->
    <rect x="38" y="100" width="6" height="120" fill="#c0c0c8" stroke="#3a3a4a" stroke-width="1"/>
    <rect x="32" y="98" width="18" height="6" fill="#5a3a1a" stroke="#2a1a08"/>
    <path d="M41 220 L36 232 L46 232 Z" fill="#2a1a08"/>
    <!-- 망토 -->
    <path d="M50 160 L30 270 L75 270 L70 165" fill="#5a1010" opacity="0.85"/>
    <path d="M150 160 L170 270 L125 270 L130 165" fill="#5a1010" opacity="0.85"/>
    <!-- 갑옷 (붉은) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#8a2a2a" stroke="#3a0808" stroke-width="1.5"/>
    <ellipse cx="58" cy="160" rx="14" ry="9" fill="#5a1818" stroke="#2a0808"/>
    <ellipse cx="142" cy="160" rx="14" ry="9" fill="#5a1818" stroke="#2a0808"/>
    <path d="M85 175 L100 205 L115 175 Z" fill="#3a0808"/>
    <!-- 머리 -->
    ${face(100, 110, 30, '#d8a888')}
    <!-- 투구 (흑금) -->
    <path d="M68 95 Q70 55 100 48 Q130 55 132 95" fill="#2a1808" stroke="#0a0400" stroke-width="1.5"/>
    <path d="M70 88 L80 76 L90 84 L100 70 L110 84 L120 76 L130 88" fill="#6a3010" stroke="#2a1000" stroke-width="1"/>
    <ellipse cx="100" cy="48" rx="4" ry="10" fill="#cd1f1f"/>
    <!-- 콧수염 (붉은) -->
    <path d="M85 124 Q100 134 115 124" stroke="#3a0808" stroke-width="3" fill="none"/>
    <path d="M88 132 Q100 140 112 132" stroke="#3a0808" stroke-width="2" fill="none"/>
    <!-- 사나운 눈 -->
    <path d="M82 110 L98 112 M118 112 L102 110" stroke="#1a0808" stroke-width="2"/>
    <ellipse cx="90" cy="113" rx="2" ry="1.5" fill="#cd1f1f"/>
    <ellipse cx="110" cy="113" rx="2" ry="1.5" fill="#cd1f1f"/>
  </svg>`,

  // 뇌공 — 천둥 궁수, 청흑 갑옷, 활
  noigong: `<svg ${SIZE}>
    <defs><linearGradient id="bg-noi" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a3050"/><stop offset="100%" stop-color="#050818"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-noi)"/>
    <!-- 번개 -->
    <path d="M40 30 L48 60 L40 65 L52 100" stroke="#ffd700" stroke-width="2.5" fill="none"/>
    <path d="M160 35 L154 65 L162 70 L150 105" stroke="#ffd700" stroke-width="2" fill="none"/>
    <!-- 활 (우측) -->
    <path d="M155 90 Q175 160 155 230" stroke="#3a1a00" stroke-width="4" fill="none"/>
    <line x1="155" y1="92" x2="155" y2="228" stroke="#aaa" stroke-width="0.8"/>
    <!-- 갑옷 (가죽) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#3a4a5a" stroke="#0a1828" stroke-width="1.5"/>
    <path d="M70 170 L100 165 L130 170 L130 200 L100 200 L70 200 Z" fill="#1a2838" opacity="0.7"/>
    <!-- 어깨 가죽끈 -->
    <path d="M100 152 L70 200" stroke="#5a3a1a" stroke-width="3"/>
    <path d="M100 152 L130 200" stroke="#5a3a1a" stroke-width="3"/>
    <!-- 머리 -->
    ${face(100, 112, 28, '#c89878')}
    <!-- 머리띠 (천) -->
    <rect x="68" y="98" width="64" height="8" fill="#3a1010" stroke="#1a0404"/>
    <!-- 검은 머리 (긴) -->
    <path d="M70 106 Q72 80 100 76 Q128 80 130 106 L130 145 Q120 130 100 130 Q80 130 70 145 Z" fill="#0a0500"/>
    <!-- 화살통 (등 뒤) -->
    <rect x="48" y="155" width="10" height="38" fill="#4a3018" stroke="#1a0a00"/>
    <line x1="51" y1="148" x2="51" y2="156" stroke="#aaa" stroke-width="1"/>
    <line x1="55" y1="146" x2="55" y2="156" stroke="#aaa" stroke-width="1"/>
    ${eyes(100, 114, 8)}
    <path d="M88 132 Q100 130 112 132" stroke="#3a1010" stroke-width="2" fill="none"/>
  </svg>`,

  // 화신 — 불의 신장, 적황 도포, 화염 머리
  hwashin: `<svg ${SIZE}>
    <defs><radialGradient id="bg-hws" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ffaa30"/><stop offset="60%" stop-color="#aa2010"/><stop offset="100%" stop-color="#1a0500"/>
    </radialGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hws)"/>
    <!-- 불꽃 흩날림 -->
    ${[[30,60],[170,80],[60,30],[140,40],[20,140],[180,150]].map(([x,y]) =>
      `<path d="M${x} ${y} Q${x-3} ${y-8} ${x} ${y-14} Q${x+3} ${y-8} ${x} ${y}" fill="#ffaa30" opacity="0.7"/>`).join('')}
    <!-- 도포 (적황) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#cd4020" stroke="#5a1808" stroke-width="1.5"/>
    <path d="M55 165 L145 165 L140 200 L60 200 Z" fill="#ff6020" opacity="0.5"/>
    <!-- 화염 자수 -->
    <path d="M85 195 Q90 215 100 220 Q110 215 115 195" fill="#ffd060" opacity="0.7"/>
    <!-- 머리 -->
    ${face(100, 116, 28, '#f4b888')}
    <!-- 화염 머리카락 -->
    <path d="M68 100 Q70 70 80 60 Q85 50 95 60 Q100 40 105 60 Q115 50 120 60 Q130 70 132 100 L130 105 Q100 80 70 105 Z" fill="#cd2010"/>
    <path d="M75 95 Q80 70 90 65 L95 70 Q90 80 80 100" fill="#ffaa30" opacity="0.8"/>
    <path d="M125 95 Q120 70 110 65 L105 70 Q110 80 120 100" fill="#ffaa30" opacity="0.8"/>
    <!-- 빨간 눈 -->
    <ellipse cx="91" cy="118" rx="2.5" ry="1.5" fill="#ff3030"/>
    <ellipse cx="109" cy="118" rx="2.5" ry="1.5" fill="#ff3030"/>
    <path d="M82 113 Q91 109 100 113 M100 113 Q109 109 118 113" stroke="#3a0808" fill="none" stroke-width="1.5"/>
    ${mouth(100, 134, 6)}
  </svg>`,

  // 산령 — 산의 영령, 회갈 갑옷, 돌덩이
  sanryeong: `<svg ${SIZE}>
    <defs><linearGradient id="bg-san" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5a4a3a"/><stop offset="100%" stop-color="#1a1208"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-san)"/>
    <!-- 산 실루엣 -->
    <path d="M0 110 L40 70 L80 100 L120 60 L160 95 L200 75 L200 280 L0 280 Z" fill="#2a2010" opacity="0.5"/>
    <!-- 돌 갑옷 (회갈) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#5a4a38" stroke="#1a1208" stroke-width="2"/>
    <!-- 돌 패턴 -->
    <path d="M65 170 L78 175 L72 188 L60 183 Z" fill="#7a6a4a" stroke="#3a2818"/>
    <path d="M122 170 L138 175 L132 188 L120 183 Z" fill="#7a6a4a" stroke="#3a2818"/>
    <path d="M82 195 L98 200 L92 215 L78 210 Z" fill="#7a6a4a" stroke="#3a2818"/>
    <path d="M105 200 L120 198 L120 213 L102 213 Z" fill="#7a6a4a" stroke="#3a2818"/>
    <!-- 머리 (반쯤 돌) -->
    ${face(100, 114, 30, '#9a8a6a')}
    <path d="M70 100 Q70 60 100 56 Q130 60 130 100 L130 110 Q115 95 100 95 Q85 95 70 110 Z" fill="#3a2a18"/>
    <!-- 이끼 (녹색) -->
    <ellipse cx="80" cy="78" rx="6" ry="3" fill="#3a5a2a" opacity="0.7"/>
    <ellipse cx="120" cy="80" rx="5" ry="2" fill="#3a5a2a" opacity="0.7"/>
    <ellipse cx="92" cy="65" rx="4" ry="2" fill="#3a5a2a" opacity="0.6"/>
    <!-- 노란 눈 (영기) -->
    <ellipse cx="91" cy="116" rx="2.5" ry="2" fill="#ffd060"/>
    <ellipse cx="109" cy="116" rx="2.5" ry="2" fill="#ffd060"/>
    <path d="M82 112 Q91 108 100 112 M100 112 Q109 108 118 112" stroke="#1a0a00" fill="none" stroke-width="1.5"/>
    <path d="M88 134 L100 136 L112 134" stroke="#1a0a00" fill="none" stroke-width="2"/>
  </svg>`,

  // 수장 — 물의 궁수, 청록 갑옷, 활
  sujang: `<svg ${SIZE}>
    <defs><linearGradient id="bg-suj" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a4060"/><stop offset="100%" stop-color="#050818"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-suj)"/>
    <!-- 물결 -->
    <path d="M0 70 Q50 60 100 70 T200 70" stroke="#4aa0ff" stroke-width="1.8" fill="none" opacity="0.6"/>
    <path d="M0 100 Q50 90 100 100 T200 100" stroke="#4aa0ff" stroke-width="1.5" fill="none" opacity="0.5"/>
    <path d="M0 130 Q50 120 100 130 T200 130" stroke="#4aa0ff" stroke-width="1.2" fill="none" opacity="0.4"/>
    <!-- 활 -->
    <path d="M155 90 Q175 160 155 230" stroke="#1a3a4a" stroke-width="4" fill="none"/>
    <line x1="155" y1="92" x2="155" y2="228" stroke="#a8d0ff" stroke-width="0.8"/>
    <!-- 갑옷 (청록) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#2a5a7a" stroke="#0a2030" stroke-width="1.5"/>
    <!-- 비늘 패턴 -->
    ${[[80,180],[100,180],[120,180],[90,195],[110,195],[80,210],[100,210],[120,210]].map(([x,y]) =>
      `<path d="M${x-6} ${y} Q${x} ${y-5} ${x+6} ${y} Q${x} ${y+3} ${x-6} ${y}" fill="#3a7a9a" opacity="0.7"/>`).join('')}
    <!-- 머리 -->
    ${face(100, 112, 28, '#b8c8d8')}
    <!-- 푸른 머리 -->
    <path d="M70 102 Q72 78 100 72 Q128 78 130 102 Q132 130 130 145 L128 142 Q120 130 100 130 Q80 130 72 142 L70 145 Q68 130 70 102 Z" fill="#1a3a5a"/>
    <!-- 머리띠 (조개) -->
    <path d="M75 95 Q100 88 125 95" stroke="#a8d0ff" stroke-width="2" fill="none"/>
    <ellipse cx="100" cy="92" rx="6" ry="3" fill="#fff" stroke="#a8d0ff"/>
    ${eyes(100, 114, 8)}
    <path d="M88 132 Q100 130 112 132" stroke="#1a3a5a" stroke-width="2" fill="none"/>
  </svg>`,

  // ── EP.2 ────────────────────────────────────────

  // 신하장군 — 황금 기마장군
  sinha_general: `<svg ${SIZE}>
    <defs><linearGradient id="bg-shg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5a4a1a"/><stop offset="100%" stop-color="#1a1000"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-shg)"/>
    ${sunRays(100, 90, 45, 80, '#ffd700', 10)}
    <!-- 창 (좌측) -->
    <line x1="42" y1="90" x2="42" y2="245" stroke="#5a3a1a" stroke-width="3"/>
    <path d="M42 90 L36 76 L48 76 Z" fill="#c0c0c8" stroke="#3a3a4a"/>
    <rect x="38" y="98" width="8" height="6" fill="#aa2010"/>
    <!-- 망토 -->
    <path d="M55 160 L35 270 L75 270 L70 165" fill="#5a3010" opacity="0.85"/>
    <path d="M145 160 L165 270 L125 270 L130 165" fill="#5a3010" opacity="0.85"/>
    <!-- 갑옷 (황금) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#aa8a30" stroke="#3a2810" stroke-width="1.5"/>
    <ellipse cx="58" cy="160" rx="14" ry="9" fill="#cd9020" stroke="#5a3a08"/>
    <ellipse cx="142" cy="160" rx="14" ry="9" fill="#cd9020" stroke="#5a3a08"/>
    <!-- 가슴 자수 (사슴) -->
    <path d="M92 195 L108 195 L100 218 Z" fill="#5a3a08"/>
    <circle cx="100" cy="195" r="3" fill="#cd1f1f"/>
    <!-- 머리 -->
    ${face(100, 110, 30, '#e0b890')}
    <!-- 투구 (장식) -->
    <path d="M68 95 Q70 56 100 50 Q130 56 132 95" fill="#5a3a08" stroke="#1a1000" stroke-width="1.5"/>
    <path d="M88 50 L100 30 L112 50 Z" fill="#cd1f1f" stroke="#5a0808"/>
    <ellipse cx="100" cy="56" rx="6" ry="14" fill="#aa6020"/>
    <!-- 콧수염 -->
    <path d="M85 124 L100 130 L115 124" stroke="#1a0808" stroke-width="3" fill="none"/>
    ${eyes(100, 112)}
    <path d="M90 138 Q100 142 110 138" stroke="#5a3a08" stroke-width="2" fill="none"/>
  </svg>`,

  // 호족 부족장 — 범가죽 갑옷, 호랑이 머리장식
  hojok_chief: `<svg ${SIZE}>
    <defs><linearGradient id="bg-hjc" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5a2010"/><stop offset="100%" stop-color="#1a0500"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hjc)"/>
    <!-- 으르렁 -->
    <path d="M30 30 L45 50 M170 35 L155 55" stroke="#cd6020" stroke-width="2" opacity="0.5"/>
    <!-- 큰 검 (좌측) -->
    <rect x="38" y="100" width="6" height="120" fill="#c0c0c8" stroke="#3a3a4a" stroke-width="1"/>
    <rect x="32" y="98" width="18" height="6" fill="#5a3a1a" stroke="#2a1a08"/>
    <path d="M41 220 L36 232 L46 232 Z" fill="#2a1a08"/>
    <!-- 갑옷 (범가죽 - 주황+검은줄무늬) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#cd7020" stroke="#3a1808" stroke-width="1.5"/>
    <!-- 호랑이 줄무늬 -->
    <path d="M60 175 Q70 180 78 175 Q80 190 70 195 Q62 188 60 175 Z" fill="#1a0a00" opacity="0.7"/>
    <path d="M125 178 Q132 185 140 180 Q142 195 132 200 Q124 192 125 178 Z" fill="#1a0a00" opacity="0.7"/>
    <path d="M85 200 Q95 210 105 205 L100 220 Q90 218 85 200 Z" fill="#1a0a00" opacity="0.7"/>
    <path d="M110 215 Q120 220 130 215 L125 230 Q115 228 110 215 Z" fill="#1a0a00" opacity="0.7"/>
    <!-- 머리 -->
    ${face(100, 112, 30, '#d8a878')}
    <!-- 호랑이 머리장식 (모자) -->
    <path d="M65 95 Q70 50 100 45 Q130 50 135 95 L135 105 Q120 90 100 90 Q80 90 65 105 Z" fill="#cd6020" stroke="#3a1808" stroke-width="1.5"/>
    <!-- 호랑이 귀 -->
    <path d="M70 60 L78 45 L88 60 Z" fill="#cd6020" stroke="#3a1808"/>
    <path d="M130 60 L122 45 L112 60 Z" fill="#cd6020" stroke="#3a1808"/>
    <ellipse cx="80" cy="55" rx="3" ry="4" fill="#fff"/>
    <ellipse cx="120" cy="55" rx="3" ry="4" fill="#fff"/>
    <!-- 머리장식 줄무늬 -->
    <path d="M75 70 L85 78 M115 70 L125 78 M95 50 L105 58" stroke="#1a0a00" stroke-width="2"/>
    <!-- 사나운 눈 -->
    <path d="M82 110 L98 113 M118 113 L102 110" stroke="#1a0a00" stroke-width="2"/>
    <ellipse cx="90" cy="114" rx="2.5" ry="1.8" fill="#ffaa20"/>
    <ellipse cx="110" cy="114" rx="2.5" ry="1.8" fill="#ffaa20"/>
    <!-- 송곳니 입 -->
    <path d="M85 132 L100 142 L115 132" stroke="#1a0a00" stroke-width="2" fill="#3a1010"/>
    <path d="M93 138 L93 144 M107 138 L107 144" stroke="#fff" stroke-width="1.5"/>
  </svg>`,

  // 호족 전사 — 가죽 갑옷, 곤봉
  hojok_warrior: `<svg ${SIZE}>
    <defs><linearGradient id="bg-hjw" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a2818"/><stop offset="100%" stop-color="#0a0500"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hjw)"/>
    <!-- 곤봉 -->
    <rect x="40" y="100" width="8" height="120" fill="#5a3a1a" stroke="#2a1a08" stroke-width="1"/>
    <ellipse cx="44" cy="100" rx="14" ry="18" fill="#3a2010" stroke="#1a0a00"/>
    <circle cx="40" cy="92" r="3" fill="#3a2010"/>
    <circle cx="48" cy="95" r="3" fill="#3a2010"/>
    <circle cx="42" cy="105" r="2.5" fill="#3a2010"/>
    <!-- 가죽 갑옷 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#5a3818" stroke="#1a0a00" stroke-width="1.5"/>
    <path d="M65 175 L100 170 L135 175 L130 200 L100 195 L70 200 Z" fill="#3a2008" opacity="0.7"/>
    <!-- 가죽끈 -->
    <line x1="65" y1="200" x2="135" y2="200" stroke="#1a0a00" stroke-width="2"/>
    <line x1="65" y1="220" x2="135" y2="220" stroke="#1a0a00" stroke-width="2"/>
    <!-- 머리 -->
    ${face(100, 112, 28, '#c89878')}
    <!-- 머리띠 (가죽) -->
    <rect x="68" y="98" width="64" height="6" fill="#3a1808" stroke="#1a0a00"/>
    <!-- 검은 머리 -->
    <path d="M72 104 Q75 80 100 76 Q125 80 128 104" fill="#1a0500"/>
    <!-- 험한 인상 -->
    <path d="M82 109 L98 112 M118 112 L102 109" stroke="#1a0500" stroke-width="2"/>
    ${eyes(100, 116, 8)}
    <path d="M85 134 L100 138 L115 134" stroke="#1a0500" stroke-width="2" fill="none"/>
    <!-- 흉터 -->
    <line x1="78" y1="105" x2="92" y2="125" stroke="#8a3010" stroke-width="1.5"/>
  </svg>`,

  // 호족 궁수 — 가벼운 가죽, 활
  hojok_archer: `<svg ${SIZE}>
    <defs><linearGradient id="bg-hja" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a2a18"/><stop offset="100%" stop-color="#0a0500"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hja)"/>
    <!-- 활 -->
    <path d="M155 80 Q178 160 155 240" stroke="#3a1a00" stroke-width="4" fill="none"/>
    <line x1="155" y1="82" x2="155" y2="238" stroke="#aaa" stroke-width="0.8"/>
    <!-- 가죽 외투 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#6a4a28" stroke="#1a0a00" stroke-width="1.5"/>
    <path d="M55 160 L75 200 L65 270" stroke="#3a2010" stroke-width="2" fill="none"/>
    <!-- 화살통 -->
    <rect x="50" y="155" width="10" height="40" fill="#3a2010" stroke="#1a0a00"/>
    <line x1="53" y1="148" x2="53" y2="156" stroke="#aaa" stroke-width="1"/>
    <line x1="57" y1="146" x2="57" y2="156" stroke="#aaa" stroke-width="1"/>
    <!-- 머리 -->
    ${face(100, 112, 28, '#d8a880')}
    <!-- 두건 -->
    <path d="M68 100 Q70 65 100 60 Q130 65 132 100 L130 105 Q100 88 70 105 Z" fill="#5a3818" stroke="#2a1808" stroke-width="1.5"/>
    <path d="M68 100 L60 130 L72 130" fill="#5a3818" stroke="#2a1808"/>
    ${eyes(100, 114, 8)}
    <path d="M88 132 Q100 130 112 132" stroke="#3a1808" stroke-width="2" fill="none"/>
    <!-- 깃털 (모자) -->
    <path d="M118 75 Q120 55 124 50 Q128 55 126 78" fill="#7a4818" stroke="#3a1808"/>
  </svg>`,

  // 호족 기마 — 말 위, 창
  hojok_rider: `<svg ${SIZE}>
    <defs><linearGradient id="bg-hjr" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5a3a18"/><stop offset="100%" stop-color="#1a0a00"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hjr)"/>
    <!-- 먼지 -->
    <ellipse cx="60" cy="245" rx="40" ry="6" fill="#aa8050" opacity="0.4"/>
    <ellipse cx="140" cy="250" rx="35" ry="5" fill="#aa8050" opacity="0.4"/>
    <!-- 말 머리 (좌측 하단) -->
    <ellipse cx="40" cy="225" rx="22" ry="14" fill="#5a3010" stroke="#2a1000" stroke-width="1.5"/>
    <ellipse cx="28" cy="218" rx="6" ry="5" fill="#3a1808"/>
    <ellipse cx="36" cy="220" rx="2" ry="1.5" fill="#fff"/>
    <path d="M50 215 L62 200 Q66 218 58 230" fill="#1a0a00"/>
    <!-- 창 (긴) -->
    <line x1="160" y1="40" x2="115" y2="180" stroke="#5a3a1a" stroke-width="3"/>
    <path d="M160 40 L168 30 L155 26 Z" fill="#c0c0c8" stroke="#3a3a4a"/>
    <!-- 갑옷 -->
    <path d="M55 160 Q50 200 55 250 L145 250 Q150 200 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#7a5028" stroke="#2a1808" stroke-width="1.5"/>
    <ellipse cx="58" cy="160" rx="13" ry="8" fill="#aa7038" stroke="#5a3018"/>
    <ellipse cx="142" cy="160" rx="13" ry="8" fill="#aa7038" stroke="#5a3018"/>
    <!-- 망토 -->
    <path d="M50 175 L70 250 L40 260 L30 250 Z" fill="#5a2010" opacity="0.85"/>
    <!-- 머리 -->
    ${face(100, 110, 28, '#d8a880')}
    <!-- 투구 -->
    <path d="M70 95 Q72 60 100 55 Q128 60 130 95" fill="#3a2010" stroke="#1a0a00" stroke-width="1.5"/>
    <ellipse cx="100" cy="58" rx="4" ry="10" fill="#aa3010"/>
    <path d="M70 88 L80 82 L90 88 L100 78 L110 88 L120 82 L130 88" stroke="#1a0a00" stroke-width="1" fill="none"/>
    ${eyes(100, 112)}
    <path d="M88 130 L100 134 L112 130" stroke="#1a0a00" stroke-width="2" fill="none"/>
  </svg>`,

  // 호족 샤먼 — 깃털 두건, 지팡이
  hojok_shaman: `<svg ${SIZE}>
    <defs><linearGradient id="bg-hjs" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a2050"/><stop offset="100%" stop-color="#0a0418"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hjs)"/>
    <!-- 영기 -->
    ${[[40,50],[160,55],[30,120],[170,130],[50,90],[150,95]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="2.5" fill="#a070ff" opacity="0.7"/>`).join('')}
    <!-- 지팡이 -->
    <line x1="42" y1="80" x2="42" y2="245" stroke="#3a2018" stroke-width="3"/>
    <circle cx="42" cy="76" r="8" fill="#a070ff" stroke="#5a2080" stroke-width="1.5"/>
    <circle cx="42" cy="76" r="3" fill="#fff" opacity="0.8"/>
    <!-- 도포 (보라) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#5a3a7a" stroke="#1a0828" stroke-width="1.5"/>
    <!-- 토템 -->
    <circle cx="100" cy="195" r="14" fill="#3a1808" stroke="#1a0500" stroke-width="1.5"/>
    <text x="100" y="202" font-size="18" fill="#ffd060" text-anchor="middle" font-family="'Noto Serif KR', serif">巫</text>
    <!-- 어깨 (뼈 장식) -->
    <ellipse cx="58" cy="160" rx="12" ry="7" fill="#cdc8a8"/>
    <ellipse cx="142" cy="160" rx="12" ry="7" fill="#cdc8a8"/>
    <!-- 머리 -->
    ${face(100, 116, 28, '#c89878')}
    <!-- 깃털 두건 -->
    <path d="M70 100 Q72 70 100 65 Q128 70 130 100 L130 110 Q100 90 70 110 Z" fill="#3a1808" stroke="#1a0500" stroke-width="1.5"/>
    <!-- 깃털들 -->
    <path d="M75 65 Q70 40 72 30 Q76 40 80 65 Z" fill="#aa3030" stroke="#5a1010"/>
    <path d="M100 55 Q97 25 100 15 Q103 25 103 55 Z" fill="#fff" stroke="#aaa"/>
    <path d="M125 65 Q130 40 128 30 Q124 40 120 65 Z" fill="#aa3030" stroke="#5a1010"/>
    <!-- 페인트 (얼굴 줄) -->
    <line x1="92" y1="105" x2="92" y2="135" stroke="#aa3030" stroke-width="2"/>
    <line x1="108" y1="105" x2="108" y2="135" stroke="#aa3030" stroke-width="2"/>
    <ellipse cx="91" cy="118" rx="2.2" ry="1.5" fill="#a070ff"/>
    <ellipse cx="109" cy="118" rx="2.2" ry="1.5" fill="#a070ff"/>
    ${mouth(100, 138, 6)}
  </svg>`,

  // ── 마을 NPC ────────────────────────────────────

  // 마을 어른 — 흰 수염, 베이지 한복, 따뜻한 흙빛
  elder: `<svg ${SIZE}>
    <defs><linearGradient id="bg-elder" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e0d0c0"/><stop offset="100%" stop-color="#5a4838"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-elder)"/>
    <!-- 한복 도포 (바랜 베이지) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#cdb898" stroke="#6a5238" stroke-width="1.5"/>
    <path d="M100 158 L100 268" stroke="#6a5238" stroke-width="2"/>
    <!-- 옷고름 -->
    <path d="M95 162 L95 195 M85 175 L95 170" stroke="#8a6840" stroke-width="2"/>
    <!-- 띠 -->
    <rect x="55" y="225" width="90" height="8" fill="#a08868" stroke="#5a4828"/>
    <!-- 머리 -->
    ${face(100, 110, 30, '#e8c8a8')}
    <!-- 흰 머리카락 (성긴 정수리) -->
    <path d="M75 95 Q78 78 100 75 Q122 78 125 95 L123 100 Q100 88 77 100 Z" fill="#e8e4dc" stroke="#aaa" stroke-width="0.8"/>
    <!-- 갓 (검은 갓) -->
    <ellipse cx="100" cy="74" rx="44" ry="8" fill="#1a1208" stroke="#0a0500" stroke-width="1.2"/>
    <path d="M76 74 Q100 56 124 74 L122 76 Q100 62 78 76 Z" fill="#2a1808" stroke="#0a0500" stroke-width="1.2"/>
    <!-- 주름 (이마) -->
    <path d="M82 100 Q100 96 118 100" stroke="#8a6a4a" fill="none" stroke-width="0.8" opacity="0.7"/>
    <path d="M85 106 Q100 103 115 106" stroke="#8a6a4a" fill="none" stroke-width="0.8" opacity="0.6"/>
    <!-- 흰 수염 (긴) -->
    <path d="M80 132 Q88 175 100 182 Q112 175 120 132" fill="#f4f0e8" stroke="#bbb" stroke-width="1"/>
    <path d="M86 142 Q100 172 114 142" fill="#fff" opacity="0.7"/>
    <!-- 흰 콧수염 -->
    <path d="M86 124 Q100 128 114 124" stroke="#d8d0c4" stroke-width="2.5" fill="none"/>
    <!-- 자상한 눈 (살짝 처진) -->
    <ellipse cx="91" cy="113" rx="2" ry="1.3" fill="#000"/>
    <ellipse cx="109" cy="113" rx="2" ry="1.3" fill="#000"/>
    <path d="M82 110 Q91 106 100 110" stroke="#5a3a2a" fill="none" stroke-width="1.2"/>
    <path d="M100 110 Q109 106 118 110" stroke="#5a3a2a" fill="none" stroke-width="1.2"/>
    <!-- 눈가 주름 -->
    <path d="M78 116 L84 118 M122 116 L116 118" stroke="#8a6a4a" stroke-width="0.8" opacity="0.7"/>
  </svg>`,

  // 사냥꾼 — 녹색 가죽 조끼, 활, 구릿빛 얼굴
  hunter: `<svg ${SIZE}>
    <defs><linearGradient id="bg-hunter" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a8c0a0"/><stop offset="100%" stop-color="#1a2818"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-hunter)"/>
    <!-- 나뭇잎 (배경) -->
    ${[[30,60],[170,80],[20,180],[180,160]].map(([x,y]) =>
      `<path d="M${x} ${y} Q${x+6} ${y-8} ${x+10} ${y} Q${x+6} ${y+8} ${x} ${y} Z" fill="#3a5a2a" opacity="0.55"/>`).join('')}
    <!-- 활 (우측) -->
    <path d="M155 90 Q175 160 155 230" stroke="#3a2010" stroke-width="3.5" fill="none"/>
    <line x1="155" y1="92" x2="155" y2="228" stroke="#cdc0a8" stroke-width="0.8"/>
    <!-- 가죽 끈 (어깨 활끈) -->
    <line x1="155" y1="95" x2="80" y2="160" stroke="#5a3818" stroke-width="2.5"/>
    <!-- 가죽 조끼 (녹색) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#4a6838" stroke="#1a2810" stroke-width="1.5"/>
    <!-- 안쪽 셔츠 (어두운 갈색) -->
    <path d="M85 160 L100 170 L115 160 L115 200 L85 200 Z" fill="#3a2818" opacity="0.85"/>
    <!-- 가죽끈 (가슴) -->
    <line x1="68" y1="180" x2="132" y2="180" stroke="#3a2010" stroke-width="2"/>
    <line x1="68" y1="200" x2="132" y2="200" stroke="#3a2010" stroke-width="2"/>
    <!-- 어깨 가죽 패치 -->
    <ellipse cx="58" cy="160" rx="13" ry="8" fill="#5a7848" stroke="#1a2810"/>
    <ellipse cx="142" cy="160" rx="13" ry="8" fill="#5a7848" stroke="#1a2810"/>
    <!-- 머리 -->
    ${face(100, 112, 28, '#c89060')}
    <!-- 어두운 머리카락 (헝클어진) -->
    <path d="M70 102 Q72 75 100 70 Q128 75 130 102 L128 108 Q115 88 100 92 Q85 88 72 108 Z" fill="#2a1808"/>
    <path d="M78 78 L82 70 M95 70 L98 62 M112 72 L116 64" stroke="#2a1808" stroke-width="2"/>
    <!-- 머리띠 (가죽) -->
    <rect x="70" y="100" width="60" height="5" fill="#5a3818" stroke="#2a1808"/>
    <!-- 깃털 -->
    <path d="M125 80 Q130 60 134 55 Q132 65 130 85" fill="#5a7848" stroke="#2a3818"/>
    <!-- 거친 얼굴 (수염 그루터기) -->
    <path d="M82 130 Q100 134 118 130 L118 138 Q100 142 82 138 Z" fill="#2a1808" opacity="0.3"/>
    ${eyes(100, 114, 8)}
    ${mouth(100, 132, 6)}
    <!-- 흉터 (볼) -->
    <line x1="118" y1="118" x2="124" y2="128" stroke="#7a3020" stroke-width="1.2"/>
  </svg>`,

  // 상인 — 황금색 조끼, 통통한 친절한 얼굴, 미소
  shopkeeper: `<svg ${SIZE}>
    <defs><radialGradient id="bg-shop" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#fff0cc"/><stop offset="60%" stop-color="#cd9020"/><stop offset="100%" stop-color="#3a2008"/>
    </radialGradient></defs>
    <rect width="200" height="280" fill="url(#bg-shop)"/>
    <!-- 동전 흩날림 -->
    ${[[30,70],[170,60],[40,150],[160,170],[25,210]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="4" fill="#ffd700" stroke="#aa7020" stroke-width="0.8" opacity="0.85"/>`).join('')}
    <!-- 도포 (속) -->
    <path d="M55 165 Q50 215 55 270 L145 270 Q150 215 145 165 Q120 157 100 157 Q80 157 55 165 Z" fill="#e8d098" stroke="#6a4818" stroke-width="1.5"/>
    <!-- 황금 조끼 (위) -->
    <path d="M62 165 L62 240 Q70 245 100 245 Q130 245 138 240 L138 165 Q120 158 100 158 Q80 158 62 165 Z" fill="#e0a830" stroke="#5a3a08" stroke-width="1.5"/>
    <!-- 조끼 깃 -->
    <path d="M62 165 L100 195 L138 165" fill="none" stroke="#5a3a08" stroke-width="1.5"/>
    <!-- 동전 가슴 단추 -->
    <circle cx="100" cy="200" r="5" fill="#ffd700" stroke="#5a3a08"/>
    <circle cx="100" cy="220" r="5" fill="#ffd700" stroke="#5a3a08"/>
    <!-- 허리 전대 (돈주머니 끈) -->
    <rect x="62" y="232" width="76" height="8" fill="#aa7020" stroke="#5a3a08"/>
    <!-- 머리 (통통한 둥근) -->
    ${face(100, 114, 33, '#fadcb8')}
    <!-- 통통한 볼 -->
    <ellipse cx="78" cy="124" rx="6" ry="4" fill="#ffc090" opacity="0.7"/>
    <ellipse cx="122" cy="124" rx="6" ry="4" fill="#ffc090" opacity="0.7"/>
    <!-- 갓 (낮은 둥근 모자) -->
    <ellipse cx="100" cy="85" rx="38" ry="10" fill="#8a5818" stroke="#3a2008" stroke-width="1.2"/>
    <path d="M70 85 Q100 64 130 85" fill="#aa7020" stroke="#3a2008" stroke-width="1.2"/>
    <circle cx="100" cy="68" r="4" fill="#ffd700" stroke="#5a3a08"/>
    <!-- 짧은 검은 머리 -->
    <path d="M75 100 Q90 95 100 96 Q110 95 125 100" fill="#3a2010"/>
    <!-- 친근한 눈 (반달) -->
    <path d="M85 113 Q91 117 97 113" stroke="#1a0a00" fill="none" stroke-width="2" stroke-linecap="round"/>
    <path d="M103 113 Q109 117 115 113" stroke="#1a0a00" fill="none" stroke-width="2" stroke-linecap="round"/>
    <!-- 환한 미소 -->
    <path d="M86 136 Q100 146 114 136" stroke="#5a2a1a" fill="#ffc090" stroke-width="1.8"/>
    <path d="M88 138 Q100 144 112 138" fill="#fff" opacity="0.85"/>
    <!-- 작은 콧수염 -->
    <path d="M90 128 Q100 131 110 128" stroke="#3a2010" stroke-width="2" fill="none"/>
  </svg>`,

  // 주막 주인 — 갈색 앞치마, 환한 미소, 호탕한 중년
  tavern_master: `<svg ${SIZE}>
    <defs><linearGradient id="bg-tav" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e8d0a8"/><stop offset="100%" stop-color="#4a2a10"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-tav)"/>
    <!-- 술병/술잔 -->
    <ellipse cx="35" cy="220" rx="10" ry="14" fill="#5a3818" stroke="#2a1808" stroke-width="1.2"/>
    <rect x="32" y="195" width="6" height="14" fill="#5a3818" stroke="#2a1808"/>
    <ellipse cx="35" cy="220" rx="6" ry="4" fill="#cd8030" opacity="0.6"/>
    <ellipse cx="165" cy="225" rx="9" ry="6" fill="#cd8030" stroke="#5a3818" stroke-width="1.2"/>
    <!-- 안쪽 옷 (탁한 갈색) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#7a5028" stroke="#2a1808" stroke-width="1.5"/>
    <!-- 갈색 앞치마 (위) -->
    <path d="M70 160 L70 270 L130 270 L130 160 Q115 158 100 158 Q85 158 70 160 Z" fill="#8a5828" stroke="#3a1808" stroke-width="1.5"/>
    <!-- 앞치마 끈 (어깨로) -->
    <line x1="78" y1="160" x2="75" y2="178" stroke="#3a1808" stroke-width="2.5"/>
    <line x1="122" y1="160" x2="125" y2="178" stroke="#3a1808" stroke-width="2.5"/>
    <!-- 앞치마 주머니 -->
    <rect x="85" y="215" width="30" height="20" fill="#6a3818" stroke="#3a1808" stroke-width="1.2"/>
    <!-- 앞치마 얼룩 -->
    <ellipse cx="105" cy="195" rx="8" ry="4" fill="#3a1808" opacity="0.5"/>
    <!-- 머리 (큰 둥근) -->
    ${face(100, 112, 32, '#f0c898')}
    <!-- 통통한 턱 -->
    <ellipse cx="100" cy="138" rx="22" ry="10" fill="#f0c898" stroke="#8a5a2a" stroke-width="0.8"/>
    <!-- 뒤로 빗은 검은 머리 -->
    <path d="M70 96 Q72 75 100 72 Q128 75 130 96 L128 102 Q100 86 72 102 Z" fill="#1a0a00"/>
    <!-- 머릿수건 (붉은) -->
    <rect x="68" y="92" width="64" height="6" fill="#8a3010" stroke="#3a1010" stroke-width="0.8"/>
    <!-- 풍성한 콧수염 (호쾌) -->
    <path d="M78 128 Q88 138 100 134 Q112 138 122 128" stroke="#2a1008" stroke-width="3.5" fill="#3a1808"/>
    <path d="M82 124 Q90 130 100 128 Q110 130 118 124" stroke="#2a1008" stroke-width="2" fill="none"/>
    <!-- 호쾌한 눈 (반달 미소) -->
    <path d="M82 113 Q90 117 98 113" stroke="#1a0a00" fill="none" stroke-width="2" stroke-linecap="round"/>
    <path d="M102 113 Q110 117 118 113" stroke="#1a0a00" fill="none" stroke-width="2" stroke-linecap="round"/>
    <!-- 활짝 웃는 입 -->
    <path d="M84 142 Q100 152 116 142" stroke="#3a1808" fill="#cd6020" stroke-width="2"/>
    <path d="M86 143 L114 143" stroke="#fff" stroke-width="2.5"/>
    <!-- 붉은 볼 (술기운) -->
    <ellipse cx="76" cy="124" rx="5" ry="3" fill="#cd5040" opacity="0.55"/>
    <ellipse cx="124" cy="124" rx="5" ry="3" fill="#cd5040" opacity="0.55"/>
  </svg>`,

  // 도구상 상인 — 모래빛 도포, 도구 주머니, 마른 얼굴
  merchant: `<svg ${SIZE}>
    <defs><linearGradient id="bg-merc" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e0c898"/><stop offset="100%" stop-color="#4a3818"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-merc)"/>
    <!-- 도구 (망치/낫 실루엣) -->
    <line x1="28" y1="100" x2="28" y2="160" stroke="#3a2010" stroke-width="2.5"/>
    <rect x="22" y="92" width="14" height="10" fill="#5a4030" stroke="#2a1808"/>
    <path d="M172 110 Q180 120 175 145 L170 142 Q170 122 168 112 Z" fill="#8a8080" stroke="#3a3030" stroke-width="1.2"/>
    <line x1="172" y1="110" x2="172" y2="160" stroke="#3a2010" stroke-width="2.5"/>
    <!-- 도포 (모래빛) -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#c8a878" stroke="#5a3818" stroke-width="1.5"/>
    <path d="M100 158 L100 268" stroke="#5a3818" stroke-width="2"/>
    <!-- 허리띠 -->
    <rect x="55" y="220" width="90" height="8" fill="#7a5028" stroke="#3a1808"/>
    <!-- 도구 주머니 (좌) -->
    <rect x="62" y="225" width="22" height="28" fill="#8a6038" stroke="#3a2008" stroke-width="1.2"/>
    <line x1="62" y1="235" x2="84" y2="235" stroke="#3a2008" stroke-width="1"/>
    <!-- 도구 주머니 (우) -->
    <rect x="116" y="225" width="22" height="28" fill="#8a6038" stroke="#3a2008" stroke-width="1.2"/>
    <line x1="116" y1="235" x2="138" y2="235" stroke="#3a2008" stroke-width="1"/>
    <!-- 주머니 밖으로 도구 끝 -->
    <line x1="70" y1="225" x2="68" y2="218" stroke="#5a4030" stroke-width="2"/>
    <line x1="78" y1="225" x2="80" y2="216" stroke="#5a4030" stroke-width="2"/>
    <line x1="128" y1="225" x2="130" y2="218" stroke="#5a4030" stroke-width="2"/>
    <!-- 머리 (마른 갸름한) -->
    ${face(100, 112, 26, '#dab890')}
    <!-- 마른 광대 (그림자) -->
    <path d="M78 122 Q82 128 84 134" stroke="#a08060" fill="none" stroke-width="1" opacity="0.5"/>
    <path d="M122 122 Q118 128 116 134" stroke="#a08060" fill="none" stroke-width="1" opacity="0.5"/>
    <!-- 짧은 흑발 (가르마) -->
    <path d="M76 100 Q80 78 100 75 Q120 78 124 100 L122 105 Q100 90 78 105 Z" fill="#2a1808"/>
    <path d="M100 75 L98 100" stroke="#1a0a00" stroke-width="1"/>
    <!-- 머릿수건 (얇은 회색) -->
    <rect x="74" y="98" width="52" height="4" fill="#8a7858" stroke="#3a2818"/>
    <!-- 영악한 가는 눈 -->
    <path d="M84 113 L94 113" stroke="#1a0a00" stroke-width="2"/>
    <path d="M106 113 L116 113" stroke="#1a0a00" stroke-width="2"/>
    <ellipse cx="89" cy="113" rx="1.5" ry="1.2" fill="#000"/>
    <ellipse cx="111" cy="113" rx="1.5" ry="1.2" fill="#000"/>
    <!-- 가는 콧수염 -->
    <path d="M90 126 Q100 128 110 126" stroke="#2a1808" stroke-width="1.5" fill="none"/>
    <!-- 살짝 비뚤어진 입 -->
    <path d="M90 134 Q100 138 112 134" stroke="#3a1808" fill="none" stroke-width="1.6" stroke-linecap="round"/>
    <!-- 염소 수염 (턱) -->
    <path d="M97 138 Q98 145 100 148 Q102 145 103 138" fill="#2a1808" stroke="#1a0a00" stroke-width="0.8"/>
  </svg>`,

  // 나그네 — 후드 망토, 먼지 묻은 얼굴, 신비한 미소
  traveler: `<svg ${SIZE}>
    <defs><linearGradient id="bg-trav" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c8b088"/><stop offset="100%" stop-color="#2a1808"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-trav)"/>
    <!-- 멀리 산 실루엣 (지나온 길) -->
    <path d="M0 200 L40 175 L80 195 L120 170 L160 190 L200 175 L200 280 L0 280 Z" fill="#3a2818" opacity="0.45"/>
    <!-- 먼지 -->
    ${[[30,150],[170,160],[60,90],[140,80]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="2" fill="#cdb898" opacity="0.55"/>`).join('')}
    <!-- 망토 (긴, 양쪽으로 드리워짐) -->
    <path d="M40 175 L20 270 L80 270 L70 175" fill="#5a3818" stroke="#2a1808" stroke-width="1.5"/>
    <path d="M160 175 L180 270 L120 270 L130 175" fill="#5a3818" stroke="#2a1808" stroke-width="1.5"/>
    <!-- 가운데 도포 (탁한 갈색) -->
    <path d="M55 165 Q50 215 55 270 L145 270 Q150 215 145 165 Q120 157 100 157 Q80 157 55 165 Z" fill="#7a5838" stroke="#2a1808" stroke-width="1.5"/>
    <!-- 망토 잠금 (둥근 청동) -->
    <circle cx="100" cy="170" r="6" fill="#8a6028" stroke="#3a2008" stroke-width="1.5"/>
    <circle cx="100" cy="170" r="2.5" fill="#cd9020"/>
    <!-- 등에 멘 짐 (어깨 위로 끈) -->
    <line x1="78" y1="165" x2="75" y2="200" stroke="#3a2008" stroke-width="2"/>
    <line x1="122" y1="165" x2="125" y2="200" stroke="#3a2008" stroke-width="2"/>
    <!-- 머리 -->
    ${face(100, 116, 28, '#cda080')}
    <!-- 후드 (반쯤 내려진) -->
    <path d="M62 100 Q60 70 100 60 Q140 70 138 100 L138 130 Q132 110 130 110 L70 110 Q68 110 62 130 Z" fill="#3a2010" stroke="#1a0a00" stroke-width="1.5"/>
    <!-- 후드 그림자 (얼굴 위쪽) -->
    <path d="M72 108 Q72 100 100 98 Q128 100 128 108 L128 116 Q100 108 72 116 Z" fill="#1a0a00" opacity="0.4"/>
    <!-- 헝클어진 머리 -->
    <path d="M78 110 Q82 100 95 105 Q105 100 118 108" stroke="#2a1808" stroke-width="1.5" fill="#3a2010"/>
    <!-- 먼지 묻은 얼굴 (옅은 그림자) -->
    <ellipse cx="85" cy="130" rx="6" ry="2" fill="#5a3818" opacity="0.3"/>
    <ellipse cx="115" cy="130" rx="6" ry="2" fill="#5a3818" opacity="0.3"/>
    <!-- 신비로운 눈 (한쪽만 살짝 보이게) -->
    <ellipse cx="91" cy="120" rx="2.2" ry="1.4" fill="#1a0a00"/>
    <ellipse cx="109" cy="120" rx="2.2" ry="1.4" fill="#1a0a00"/>
    <path d="M82 117 Q91 114 100 117" stroke="#3a1808" fill="none" stroke-width="1.2"/>
    <path d="M100 117 Q109 114 118 117" stroke="#3a1808" fill="none" stroke-width="1.2"/>
    <!-- 반쪽 미소 (수수께끼) -->
    <path d="M92 138 Q100 142 110 137" stroke="#3a1808" fill="none" stroke-width="1.8" stroke-linecap="round"/>
    <!-- 얇은 수염 그루터기 -->
    <path d="M84 138 Q100 140 116 138" stroke="#2a1808" stroke-width="0.8" opacity="0.5" fill="none"/>
  </svg>`,

  // 문지기 — 회색 가죽 갑옷, 투구, 무표정
  gatekeeper: `<svg ${SIZE}>
    <defs><linearGradient id="bg-gate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a0a0a0"/><stop offset="100%" stop-color="#202020"/>
    </linearGradient></defs>
    <rect width="200" height="280" fill="url(#bg-gate)"/>
    <!-- 성문 기둥 (배경) -->
    <rect x="10" y="30" width="14" height="240" fill="#3a3a3a" opacity="0.5"/>
    <rect x="176" y="30" width="14" height="240" fill="#3a3a3a" opacity="0.5"/>
    <path d="M10 30 L24 30 L100 16 L176 30 L190 30" stroke="#5a5a5a" stroke-width="2" fill="none" opacity="0.5"/>
    <!-- 창 (좌측) -->
    <line x1="42" y1="60" x2="42" y2="245" stroke="#3a2818" stroke-width="3"/>
    <path d="M42 60 L36 44 L48 44 Z" fill="#c0c0c8" stroke="#3a3a4a" stroke-width="1"/>
    <rect x="38" y="68" width="8" height="5" fill="#5a3818"/>
    <!-- 회색 가죽 갑옷 -->
    <path d="M55 160 Q50 210 55 270 L145 270 Q150 210 145 160 Q120 152 100 152 Q80 152 55 160 Z" fill="#6a6a6a" stroke="#1a1a1a" stroke-width="1.5"/>
    <!-- 가죽 판 (가슴 패널) -->
    <path d="M75 168 L100 162 L125 168 L125 215 L100 220 L75 215 Z" fill="#4a4a4a" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 리벳 (가죽 못) -->
    ${[[80,175],[120,175],[80,205],[120,205],[100,168],[100,212]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="1.8" fill="#8a8a8a" stroke="#2a2a2a" stroke-width="0.6"/>`).join('')}
    <!-- 어깨 보호대 -->
    <ellipse cx="58" cy="160" rx="14" ry="9" fill="#5a5a5a" stroke="#1a1a1a"/>
    <ellipse cx="142" cy="160" rx="14" ry="9" fill="#5a5a5a" stroke="#1a1a1a"/>
    <!-- 허리띠 -->
    <rect x="55" y="225" width="90" height="8" fill="#3a3a3a" stroke="#1a1a1a"/>
    <rect x="96" y="223" width="8" height="12" fill="#8a8a8a" stroke="#1a1a1a"/>
    <!-- 머리 -->
    ${face(100, 114, 28, '#c0a888')}
    <!-- 투구 (회색 강철) -->
    <path d="M65 100 Q65 55 100 48 Q135 55 135 100" fill="#5a5a5a" stroke="#1a1a1a" stroke-width="1.5"/>
    <!-- 투구 정수리 장식 -->
    <ellipse cx="100" cy="50" rx="4" ry="10" fill="#3a3a3a"/>
    <path d="M100 38 L100 28" stroke="#3a3a3a" stroke-width="2"/>
    <!-- 투구 측면 -->
    <path d="M65 100 L62 130 L72 130 L75 105 Z" fill="#4a4a4a" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M135 100 L138 130 L128 130 L125 105 Z" fill="#4a4a4a" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 투구 앞 가로띠 -->
    <rect x="65" y="98" width="70" height="5" fill="#3a3a3a" stroke="#1a1a1a"/>
    <!-- 코 가드 (얼굴 가운데 세로) -->
    <rect x="98" y="100" width="4" height="22" fill="#5a5a5a" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 무표정한 눈 -->
    <ellipse cx="89" cy="114" rx="2" ry="1.3" fill="#1a1a1a"/>
    <ellipse cx="111" cy="114" rx="2" ry="1.3" fill="#1a1a1a"/>
    <path d="M82 111 L96 111" stroke="#1a1a1a" stroke-width="1.5"/>
    <path d="M104 111 L118 111" stroke="#1a1a1a" stroke-width="1.5"/>
    <!-- 굳게 다문 입 -->
    <path d="M88 134 L112 134" stroke="#3a2818" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
};

// ─────────────────────────────────────────────
// API
// ─────────────────────────────────────────────
// 2026-07-17 초상 전면 재제작 — portraits/ 고품질판 우선, 기존 ART 폴백
import PORTRAITS_HQ from './portraits/index.js';

export function getPortraitSVG(id) {
  if (!id) return null;
  return PORTRAITS_HQ[id] || ART[id] || null;
}

export function hasPortraitArt(id) {
  return !!(PORTRAITS_HQ[id] || ART[id]);
}
