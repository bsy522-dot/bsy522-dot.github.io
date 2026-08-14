export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="hs-bg" cx="50%" cy="36%" r="82%">
      <stop offset="0%" stop-color="#f2e6fa"/>
      <stop offset="40%" stop-color="#ccbbdd"/>
      <stop offset="100%" stop-color="#23172e"/>
    </radialGradient>
    <radialGradient id="hs-glow" cx="50%" cy="46%" r="50%">
      <stop offset="0%" stop-color="#f6ecff" stop-opacity="0.82"/>
      <stop offset="65%" stop-color="#ceb4e2" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#ceb4e2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hs-robe" x1="0" y1="0" x2="1" y2="0.25">
      <stop offset="0%" stop-color="#6d5280"/>
      <stop offset="45%" stop-color="#3a2a4a"/>
      <stop offset="100%" stop-color="#1c1424"/>
    </linearGradient>
    <linearGradient id="hs-hair" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#56505f"/>
      <stop offset="45%" stop-color="#2b2732"/>
      <stop offset="100%" stop-color="#100d16"/>
    </linearGradient>
    <radialGradient id="hs-skin" cx="40%" cy="34%" r="85%">
      <stop offset="0%" stop-color="#e9c69c"/>
      <stop offset="55%" stop-color="#c99a6c"/>
      <stop offset="100%" stop-color="#8a6042"/>
    </radialGradient>
    <linearGradient id="hs-bone" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f2e8d4"/>
      <stop offset="55%" stop-color="#d6c4a0"/>
      <stop offset="100%" stop-color="#a4906c"/>
    </linearGradient>
    <linearGradient id="hs-fur" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#d89a54"/>
      <stop offset="50%" stop-color="#b0722c"/>
      <stop offset="100%" stop-color="#6a4016"/>
    </linearGradient>
    <linearGradient id="hs-cord" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7a4a3a"/>
      <stop offset="50%" stop-color="#55302a"/>
      <stop offset="100%" stop-color="#2a1612"/>
    </linearGradient>
    <radialGradient id="hs-vig" cx="50%" cy="42%" r="76%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="72%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#150c1e" stop-opacity="0.5"/>
    </radialGradient>
    <g id="hs-charm">
      <path d="M0 -40 L0 40" stroke="#f0e2ff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M0 -28 L-14 -40 M0 -28 L14 -40" stroke="#f0e2ff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M0 -6 L-16 6 M0 -6 L16 6" stroke="#f0e2ff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="0" cy="28" r="7" fill="none" stroke="#f0e2ff" stroke-width="4"/>
    </g>
  </defs>

  <rect width="240" height="320" fill="url(#hs-bg)"/>

  <!-- 부적 모티프 (은은한 배경) -->
  <use href="#hs-charm" transform="translate(204,50) rotate(10) scale(0.5)" opacity="0.16"/>
  <use href="#hs-charm" transform="translate(26,238) rotate(-10) scale(0.4)" opacity="0.13"/>
  <circle cx="120" cy="118" r="72" fill="none" stroke="#f0e2ff" stroke-width="1.3" stroke-dasharray="3 7" opacity="0.16"/>
  <circle cx="120" cy="118" r="92" fill="none" stroke="#f0e2ff" stroke-width="1" stroke-dasharray="2 9" opacity="0.1"/>

  <ellipse cx="116" cy="122" rx="92" ry="98" fill="url(#hs-glow)"/>

  <!-- 뼈 지팡이 (배경, 로브에 일부 가려짐) -->
  <g>
    <path d="M56 320 L48 320 L60 158 L68 158 Z" fill="#1c1420"/>
    <path d="M55 318 L50 318 L59 160 L64 160 Z" fill="url(#hs-bone)"/>
    <path d="M62 300 L61 175" stroke="#8a7a5a" stroke-width="1.2" opacity="0.6"/>
    <g stroke="#4a3020" stroke-width="2.2">
      <path d="M48 250 L60 256"/>
      <path d="M46 258 L58 264"/>
      <path d="M44 266 L56 272"/>
    </g>
    <!-- 작은 짐승 두개골 장식 -->
    <path d="M40 158 Q32 148 36 136 Q40 124 56 122 Q72 124 74 138 Q75 150 66 158 Q56 166 46 158 Z" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="1.8"/>
    <ellipse cx="46" cy="139" rx="3.2" ry="4" fill="#160e08"/>
    <ellipse cx="63" cy="139" rx="3.2" ry="4" fill="#160e08"/>
    <path d="M52 148 L55 153 L58 148" fill="none" stroke="#4a3a24" stroke-width="1.3"/>
    <path d="M32 132 Q22 116 30 100" fill="none" stroke="url(#hs-bone)" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M74 132 Q86 116 80 98" fill="none" stroke="url(#hs-bone)" stroke-width="4.5" stroke-linecap="round"/>
    <!-- 깃털 -->
    <path d="M38 162 L26 190 L33 187 L44 166 Z" fill="#e6e0d4" stroke="#0a0810" stroke-width="1.1"/>
    <path d="M31 172 L37 170 M28 179 L34 177" stroke="#0a0810" stroke-width="1.1"/>
    <path d="M70 162 L80 192 L73 189 L64 166 Z" fill="#d8d0c0" stroke="#0a0810" stroke-width="1.1"/>
    <!-- 부적 종이 -->
    <g transform="rotate(-18 44 180)">
      <rect x="40" y="168" width="7" height="24" rx="1" fill="#f2ecd8" stroke="#8a7a58" stroke-width="1"/>
      <path d="M42 174 L46 178 L42 182 L46 186" fill="none" stroke="#b5432c" stroke-width="1.3" stroke-linecap="round"/>
    </g>
  </g>

  <!-- 로브 실루엣 -->
  <path d="M28 320 C 32 262, 50 231, 84 217 C 97 211, 105 205, 109 197 L 131 197 C 135 205, 143 211, 156 217 C 190 231, 208 262, 212 320 Z" fill="url(#hs-robe)" stroke="#160e1e" stroke-width="3"/>
  <path d="M156 217 C 178 227, 196 250, 204 278 L 212 320 L 170 320 C 172 280, 166 246, 156 217 Z" fill="#160e1e" opacity="0.55"/>
  <path d="M84 217 C 70 223, 58 235, 50 253 C 60 241, 74 231, 90 225 Z" fill="#8a6a98" opacity="0.55"/>
  <g fill="none" stroke="#140c1a" stroke-width="1.8" opacity="0.5">
    <path d="M82 224 Q74 264 78 318"/>
    <path d="M156 226 Q166 262 164 318"/>
    <path d="M118 258 Q116 288 118 318"/>
  </g>

  <!-- 목 -->
  <path d="M107 172 C 107 184, 105 191, 101 196 C 109 205, 131 205, 139 196 C 134 191, 132 184, 132 172 Z" fill="url(#hs-skin)" stroke="#5c3a20" stroke-width="2.4"/>
  <path d="M107 174 C 109 184, 120 189, 132 184 C 132 180, 132 176, 132 172 L 107 172 Z" fill="#a4744e" opacity="0.7"/>

  <!-- 어깨 + 호피 견장 -->
  <path d="M133 209 C 147 205, 165 209, 177 221 C 185 235, 185 249, 177 257 C 163 249, 147 239, 133 225 Z" fill="url(#hs-skin)" stroke="#160e1e" stroke-width="2.2"/>
  <path d="M147 213 C 161 213, 175 221, 183 235 C 177 225, 163 217, 149 216 Z" fill="#7a5638" opacity="0.5"/>
  <path d="M147 205 C 158 200, 168 199, 176 203 L182 195 L184 205 L192 200 L191 211 L199 209 L195 222 C 199 240, 193 256, 177 260 C 167 248, 155 236, 147 224 Z" fill="url(#hs-fur)" stroke="#160e1e" stroke-width="2.4"/>
  <path d="M155 209 L161 225 M166 207 L173 229 M177 211 L185 235 M187 219 L193 241 M160 214 L165 226 M172 218 L177 232 M183 224 L189 238" stroke="#2a1810" stroke-width="2.6" stroke-linecap="round" opacity="0.8"/>
  <path d="M181 249 C 187 255, 189 263, 185 269 C 179 265, 175 257, 177 249 Z" fill="url(#hs-fur)" stroke="#160e1e" stroke-width="1.8"/>

  <!-- 뼈·이빨 목걸이 + 해골 펜던트 -->
  <path d="M111 245 C 111 253, 115 259, 121 261 C 127 259, 131 253, 131 245" fill="none" stroke="#4a3018" stroke-width="2"/>
  <g fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="1">
    <ellipse cx="98" cy="243" rx="3.6" ry="4.6"/>
    <ellipse cx="107" cy="249" rx="3.6" ry="4.6"/>
    <ellipse cx="135" cy="249" rx="3.6" ry="4.6"/>
    <ellipse cx="144" cy="243" rx="3.6" ry="4.6"/>
  </g>
  <g>
    <path d="M121 253 Q133 253 133 265 Q133 275 121 277 Q109 275 109 265 Q109 253 121 253 Z" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="1.6"/>
    <ellipse cx="116" cy="263" rx="2.6" ry="3.2" fill="#1c140c"/>
    <ellipse cx="126" cy="263" rx="2.6" ry="3.2" fill="#1c140c"/>
    <path d="M119 270 L121 273 L123 270" fill="none" stroke="#4a3a24" stroke-width="1.1"/>
    <path d="M114 276 L115 280 M118 277 L118.5 281 M123 277 L123 281 M127 276 L127 280" stroke="#4a3a24" stroke-width="1"/>
  </g>

  <!-- 가슴 부적 문양 (자수) -->
  <g fill="none" stroke="#b5432c" stroke-width="2.2" stroke-linecap="round" opacity="0.8">
    <path d="M121 288 L121 315"/>
    <path d="M121 293 L110 286 M121 293 L132 286"/>
    <path d="M121 303 L108 310 M121 303 L134 310"/>
  </g>

  <!-- 귀 -->
  <path d="M148 111 Q162 109 160 124 Q158 138 146 140 Z" fill="url(#hs-skin)" stroke="#5c3a20" stroke-width="2.1"/>
  <circle cx="153" cy="129" r="2.1" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="0.9"/>
  <path d="M153 131 L153 139" stroke="#4a3a24" stroke-width="1.1"/>

  <!-- 얼굴 -->
  <path d="M80 105 Q78 79 98 68 Q122 57 143 73 Q157 86 155 114 Q154 137 142 156 Q128 173 110 172 Q95 169 87 148 Q81 129 80 105 Z" fill="url(#hs-skin)" stroke="#5c3a20" stroke-width="2.4"/>
  <path d="M143 95 Q151 122 139 151 Q131 164 116 170 Q133 157 137 134 Q141 114 137 93 Z" fill="#a4744e" opacity="0.6"/>
  <ellipse cx="100" cy="89" rx="14" ry="8" fill="#f6dcb4" opacity="0.4"/>

  <!-- 재로 그린 의식용 문양 (해골형 눈가·이마) -->
  <g fill="none" stroke="#ede3d6" stroke-width="2.8" stroke-linecap="round" opacity="0.85">
    <path d="M89 126 Q98 132 107 126"/>
    <path d="M97 132 L95 138"/>
    <path d="M119 119 Q128 124 136 118"/>
    <path d="M127 125 L129 131"/>
  </g>
  <path d="M111 74 L107 100" stroke="#ede3d6" stroke-width="3.6" stroke-linecap="round" opacity="0.6"/>
  <path d="M107 100 L104 107 M107 100 L110 106" stroke="#ede3d6" stroke-width="2" stroke-linecap="round" opacity="0.5"/>

  <!-- 눈썹 (사나운 인상) -->
  <path d="M113 108 L141 90 L144 95 L117 112 Z" fill="#171018"/>
  <path d="M101 109 L81 95 L79 100 L100 113 Z" fill="#171018"/>

  <!-- 눈 (예리하고 계산적인) -->
  <path d="M114 106 Q125 100 137 106" fill="none" stroke="#a4744e" stroke-width="1.3"/>
  <path d="M113 111 Q124 105 138 111" fill="none" stroke="#0c0810" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M116 116 Q125 119 135 115" fill="none" stroke="#5c3a20" stroke-width="1.2"/>
  <circle cx="126" cy="112.5" r="3" fill="#241a30"/>
  <circle cx="126" cy="112.5" r="1.3" fill="#040308"/>
  <circle cx="127.2" cy="111.2" r="0.7" fill="#eee6f4"/>
  <path d="M83 111 Q90 106 99 111" fill="none" stroke="#0c0810" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M85 116 Q91 118 97 115" fill="none" stroke="#5c3a20" stroke-width="1.2"/>
  <circle cx="91" cy="112.5" r="2.6" fill="#241a30"/>
  <circle cx="91" cy="112.5" r="1.1" fill="#040308"/>

  <!-- 코 -->
  <path d="M106 103 Q98 121 94 136" fill="none" stroke="#a4744e" stroke-width="1.9"/>
  <path d="M94 136 Q89 142 96 144 Q103 146 105 140" fill="none" stroke="#5c3a20" stroke-width="1.9" stroke-linecap="round"/>
  <ellipse cx="103" cy="141" rx="1.7" ry="1" fill="#4a3018" opacity="0.7"/>

  <!-- 입 (냉소적으로 다문) -->
  <path d="M99 151 Q111 147 121 150 Q111 153 99 151 Z" fill="#8a5238" opacity="0.5"/>
  <path d="M98 153 Q109 157 123 150" fill="none" stroke="#4a2418" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M103 158 Q111 161 118 157" fill="none" stroke="#c48a60" stroke-width="1.3" opacity="0.8"/>
  <path d="M99 153 L98 157 L101 154 Z" fill="#f0e6d4"/>
  <path d="M97 152 Q92 155 95 160" fill="none" stroke="#2a140e" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>

  <!-- 턱 음영 -->
  <path d="M96 148 Q102 158 112 164 Q104 168 96 162 Z" fill="#7a5230" opacity="0.4"/>

  <!-- 거친 머리 -->
  <path d="M78 107 Q68 73 92 59 Q116 47 140 57 Q162 67 158 97 Q156 117 148 131 Q150 109 144 97 Q146 85 136 77 Q140 89 135 97 Q130 78 114 76 Q98 74 90 87 Q84 94 84 111 Q80 111 78 107 Z" fill="url(#hs-hair)" stroke="#0a0810" stroke-width="2.3"/>
  <path d="M114 74 Q101 88 105 101 Q110 88 121 78 Z" fill="#1c1824" opacity="0.85"/>
  <g fill="none" stroke="#1c1824" stroke-width="1.5" opacity="0.8">
    <path d="M80 99 Q72 105 74 115"/>
    <path d="M150 95 Q158 101 156 111"/>
  </g>

  <!-- 상투 + 뼈 비녀 + 깃털 -->
  <path d="M109 57 Q106 39 119 37 Q132 39 129 55 Q124 48 119 48 Q113 50 109 57 Z" fill="#14111a" stroke="#0a0810" stroke-width="1.8"/>
  <path d="M103 43 L139 35" stroke="url(#hs-bone)" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="103" cy="43" r="2.4" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="0.9"/>
  <circle cx="139" cy="35" r="2.4" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="0.9"/>
  <path d="M131 41 L145 23 L139 25 L129 45 Z" fill="#e6e0d4" stroke="#0a0810" stroke-width="1.1"/>
  <path d="M134 31 L140 29 M132 36 L138 34" stroke="#0a0810" stroke-width="1.1"/>

  <!-- 관자놀이 뼈구슬 장식 -->
  <g>
    <path d="M78 90 L76 104" stroke="url(#hs-cord)" stroke-width="1.6"/>
    <circle cx="76" cy="106" r="2.1" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="0.8"/>
    <circle cx="75" cy="113" r="1.7" fill="url(#hs-bone)" stroke="#4a3a24" stroke-width="0.8"/>
  </g>

  <!-- 신비한 부유 입자 -->
  <g fill="#e6d4f5" opacity="0.5">
    <circle cx="198" cy="72" r="1.6"/>
    <circle cx="30" cy="96" r="1.3"/>
    <circle cx="206" cy="120" r="1.1"/>
  </g>

  <rect width="240" height="320" fill="url(#hs-vig)"/>
</svg>`;
