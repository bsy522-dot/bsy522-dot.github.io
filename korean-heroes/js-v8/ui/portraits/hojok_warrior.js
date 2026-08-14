export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="hw-bg" cx="50%" cy="38%" r="85%">
      <stop offset="0%" stop-color="#f2d9bd"/>
      <stop offset="45%" stop-color="#ddbbaa"/>
      <stop offset="100%" stop-color="#6e4530"/>
    </radialGradient>
    <radialGradient id="hw-glow" cx="50%" cy="46%" r="50%">
      <stop offset="0%" stop-color="#ffe8c2" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#e8b878" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#e8b878" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hw-leather" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#6e4a3a"/>
      <stop offset="55%" stop-color="#4a2a2a"/>
      <stop offset="100%" stop-color="#2a1610"/>
    </linearGradient>
    <linearGradient id="hw-strap" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9a7048"/>
      <stop offset="50%" stop-color="#7a5230"/>
      <stop offset="100%" stop-color="#4a3018"/>
    </linearGradient>
    <linearGradient id="hw-skin" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#eab784"/>
      <stop offset="45%" stop-color="#cf9760"/>
      <stop offset="100%" stop-color="#a2703f"/>
    </linearGradient>
    <linearGradient id="hw-fur" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e8862a"/>
      <stop offset="55%" stop-color="#c2661c"/>
      <stop offset="100%" stop-color="#8a4512"/>
    </linearGradient>
    <linearGradient id="hw-stone" x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0%" stop-color="#d8d9db"/>
      <stop offset="45%" stop-color="#a3a4a8"/>
      <stop offset="100%" stop-color="#5c5d61"/>
    </linearGradient>
    <linearGradient id="hw-wood" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8a5a34"/>
      <stop offset="50%" stop-color="#6b4526"/>
      <stop offset="100%" stop-color="#3c2515"/>
    </linearGradient>
    <radialGradient id="hw-vig" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="72%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1c1410" stop-opacity="0.52"/>
    </radialGradient>
    <g id="hw-claw">
      <path d="M0 0 C 10 30, 8 70, -4 110" stroke="#7a2418" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M18 4 C 28 34, 25 74, 12 118" stroke="#7a2418" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M36 10 C 45 38, 42 78, 28 124" stroke="#7a2418" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
  </defs>

  <rect width="240" height="320" fill="url(#hw-bg)"/>

  <!-- 발톱자국 모티프 (은은한 배경) -->
  <use href="#hw-claw" transform="translate(158,18) rotate(18)" opacity="0.17"/>
  <use href="#hw-claw" transform="translate(6,190) rotate(-6) scale(0.85)" opacity="0.13"/>
  <ellipse cx="120" cy="132" rx="106" ry="104" fill="url(#hw-glow)"/>

  <!-- 돌도끼 (배경, 몸통에 일부 가려짐) -->
  <g>
    <path d="M50 320 L42 320 L54 108 L62 108 Z" fill="#241408"/>
    <path d="M49 318 L44 318 L55 110 L60 110 Z" fill="url(#hw-wood)"/>
    <path d="M58 300 L59 130" stroke="#c69a63" stroke-width="1.4" opacity="0.7"/>
    <path d="M36 66 L52 44 L74 40 L90 58 L94 84 L82 106 L60 118 L42 108 L30 90 Z" fill="url(#hw-stone)" stroke="#2a2a2e" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M55 52 L70 76 M78 60 L64 90 M45 80 L66 100 M84 76 L68 98" stroke="#6e6f73" stroke-width="1.4" fill="none" opacity="0.75"/>
    <path d="M46 92 C 40 100, 38 108, 41 118 M53 96 C 49 105, 48 112, 50 120 M60 98 C 58 106, 58 113, 60 119" stroke="#6e4a2a" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <rect x="44" y="99" width="20" height="10" rx="3" fill="#5c3d22" stroke="#241408" stroke-width="1.6" transform="rotate(-6 54 104)"/>
  </g>

  <!-- 몸통 실루엣 (가죽 갑옷) -->
  <path d="M30 320 C 34 262, 52 232, 86 218 C 98 212, 106 206, 110 198 L 132 198 C 136 206, 144 212, 156 218 C 190 232, 206 262, 210 320 Z"
        fill="url(#hw-leather)" stroke="#1c1108" stroke-width="3"/>
  <path d="M156 218 C 178 228, 194 250, 202 278 L 210 320 L 168 320 C 170 280, 166 246, 156 218 Z" fill="#20130c" opacity="0.55"/>
  <path d="M86 218 C 72 224, 60 236, 52 254 C 62 242, 76 232, 92 226 Z" fill="#8a6248" opacity="0.6"/>

  <!-- 목 -->
  <path d="M108 172 C 108 184, 106 191, 102 196 C 110 205, 132 205, 140 196 C 135 191, 133 184, 133 172 Z" fill="#e0a978" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M108 174 C 110 184, 121 189, 133 184 C 133 180, 133 176, 133 172 L 108 172 Z" fill="#b9814f" opacity="0.85"/>

  <!-- 맨어깨 + 호피 견갑 (오른쪽) -->
  <path d="M134 210 C 148 206, 166 210, 178 222 C 186 236, 186 250, 178 258 C 164 250, 148 240, 134 226 Z" fill="url(#hw-skin)" stroke="#1c1108" stroke-width="2.4"/>
  <path d="M144 214 C 158 214, 172 222, 180 236 C 174 226, 160 218, 146 217 Z" fill="#8a5a34" opacity="0.5"/>
  <path d="M148 206 C 166 200, 188 208, 196 228 C 200 244, 194 258, 178 262 C 168 250, 156 238, 148 226 Z" fill="url(#hw-fur)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M156 210 L162 226 M167 208 L174 230 M178 212 L186 236 M188 220 L194 242" stroke="#241408" stroke-width="3.4" stroke-linecap="round" opacity="0.85"/>
  <path d="M182 250 C 188 256, 190 264, 186 270 C 180 266, 176 258, 178 250 Z" fill="url(#hw-fur)" stroke="#1c1108" stroke-width="2"/>
  <path d="M181 254 L187 266" stroke="#241408" stroke-width="2.4" opacity="0.8"/>

  <!-- 가죽 흉갑 -->
  <path d="M80 246 C 100 236, 142 236, 162 246 L 168 320 L 74 320 Z" fill="url(#hw-leather)" stroke="#1c1108" stroke-width="3"/>
  <path d="M78 266 L 164 266 M76 288 L 166 288" stroke="#2a1810" stroke-width="2.6"/>
  <g stroke="#241408" stroke-width="1.8">
    <path d="M92 250 L92 262 M110 246 L110 262 M128 245 L128 262 M146 247 L146 262"/>
    <path d="M86 270 L86 284 M104 270 L104 284 M122 270 L122 284 M140 270 L140 284 M158 270 L158 284"/>
    <path d="M92 292 L92 306 M110 292 L110 306 M128 292 L128 306 M146 292 L146 306"/>
  </g>
  <path d="M82 248 C 102 239, 142 239, 158 244 L 156 250 C 140 244, 102 245, 84 252 Z" fill="#9a7048" opacity="0.85"/>
  <!-- 교차 어깨끈 -->
  <path d="M90 244 L 150 320 L 138 320 L 84 252 Z" fill="url(#hw-strap)" stroke="#1c1108" stroke-width="2"/>
  <path d="M96 244 L 154 320" stroke="#3a2414" stroke-width="1.4" opacity="0.6"/>
  <!-- 발톱 목걸이 -->
  <path d="M102 243 C 110 250, 134 250, 141 243" fill="none" stroke="#3a2414" stroke-width="1.8"/>
  <path d="M115 249 C 118 254, 119 261, 116 268 C 113 266, 112 260, 113 254 C 114 251, 114 249, 115 249 Z" fill="#eee7d6" stroke="#1c1108" stroke-width="1.4"/>
  <path d="M127 250 C 130 256, 131 263, 127 271 C 124 269, 123 262, 124 256 C 125 252, 126 250, 127 250 Z" fill="#e2d9c4" stroke="#1c1108" stroke-width="1.4"/>

  <!-- 왼팔 소매(가죽) -->
  <path d="M64 244 C 72 236, 82 231, 92 231 C 96 240, 93 250, 85 258 L 71 262 C 65 257, 62 251, 64 244 Z" fill="url(#hw-leather)" stroke="#1c1108" stroke-width="2.4"/>

  <!-- 왼쪽 가죽 견갑 -->
  <path d="M62 234 C 72 218, 92 212, 104 216 C 102 230, 94 242, 80 248 C 70 246, 64 242, 62 234 Z" fill="url(#hw-leather)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M68 226 C 78 217, 92 214, 101 218" stroke="#9a7048" stroke-width="2.2" fill="none"/>

  <!-- 도끼 잡은 손 -->
  <path d="M44 246 C 42 236, 48 230, 58 230 C 68 230, 74 236, 73 246 C 72 254, 66 258, 58 258 C 50 258, 45 253, 44 246 Z" fill="url(#hw-skin)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M48 236 L 70 236 M47 242 L 71 242 M48 248 L 70 248" stroke="#8a5a34" stroke-width="1.8"/>
  <path d="M45 250 C 50 256, 64 257, 70 251" stroke="#b9814f" stroke-width="1.8" fill="none"/>
  <path d="M42 258 L 74 258 L 72 268 L 44 268 Z" fill="#7a5230" stroke="#1c1108" stroke-width="2.2"/>

  <!-- 얼굴 -->
  <path d="M92 128 C 92 105, 103 90, 122 89 C 143 90, 152 105, 152 127 C 152 147, 146 160, 135 170 C 128 178, 117 179, 109 174 C 99 168, 93 148, 92 128 Z"
        fill="url(#hw-skin)" stroke="#1c1108" stroke-width="2.8"/>
  <path d="M145 118 C 149 133, 146 151, 136 165 C 132 171, 127 175, 121 176 C 129 177, 135 174, 140 167 C 148 156, 152 139, 149 122 Z" fill="#9a663c" opacity="0.85"/>
  <path d="M97 116 C 95 128, 97 142, 103 154 C 99 140, 98 128, 100 116 Z" fill="#f4c896" opacity="0.85"/>

  <!-- 발톱 문신 (뺨) -->
  <g opacity="0.8">
    <path d="M132 118 C 129 132, 126 146, 121 158" stroke="#6e2016" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M139 122 C 136 136, 133 149, 128 161" stroke="#6e2016" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M146 128 C 143 140, 140 152, 135 162" stroke="#6e2016" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 귀 -->
  <path d="M149 129 C 156 125, 159 131, 156 139 C 154 145, 150 147, 147 145 Z" fill="url(#hw-skin)" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M152 133 C 154 134, 154 138, 151 141" stroke="#9a663c" stroke-width="1.6" fill="none"/>

  <!-- 거친 머리 + 머리띠 -->
  <path d="M88 120 C 82 92, 96 66, 122 62 C 148 66, 162 92, 156 120 C 155 106, 149 96, 143 90 C 146 98, 146 106, 144 112 C 138 100, 129 92, 120 90 C 110 92, 101 100, 96 112 C 94 106, 94 98, 97 90 C 91 96, 87 106, 88 120 Z"
        fill="#231913" stroke="#100a06" stroke-width="2.6"/>
  <path d="M96 96 C 102 84, 112 78, 122 78 C 108 82, 100 90, 96 100 Z" fill="#403026" opacity="0.7"/>
  <path d="M118 66 C 112 74, 108 82, 108 90 C 116 84, 118 76, 118 66 Z" fill="#100a06" opacity="0.6"/>
  <path d="M134 68 C 140 76, 143 84, 142 92 C 135 85, 132 76, 134 68 Z" fill="#100a06" opacity="0.6"/>
  <path d="M100 66 L94 50 L110 64 Z" fill="#231913"/>
  <path d="M117 60 L121 42 L129 58 Z" fill="#1a120d"/>
  <path d="M134 64 L142 48 L146 66 Z" fill="#231913"/>
  <path d="M90 110 C 100 102, 144 102, 154 110 L 154 120 C 144 111, 100 111, 90 120 Z" fill="#6e4a2a" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M92 110 C 104 104, 140 104, 152 110" stroke="#9a7048" stroke-width="2" fill="none"/>
  <path d="M116 108 L 128 108 L 124 90 Z" fill="#eae4d6" stroke="#1c1108" stroke-width="1.8"/>

  <!-- 눈썹 (사나운 V자 인상) -->
  <path d="M93 116 C 102 117, 113 121, 120 128" stroke="#100a06" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M124 128 C 131 121, 142 117, 151 116" stroke="#100a06" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M119 121 C 119 124, 120 127, 121 130" stroke="#1c1108" stroke-width="1.6" fill="none" opacity="0.65"/>
  <path d="M125 121 C 125 124, 124 127, 123 130" stroke="#1c1108" stroke-width="1.6" fill="none" opacity="0.65"/>

  <!-- 눈 (매서운) -->
  <path d="M98 133 C 102 129, 111 128, 114 132 C 111 137, 102 137, 98 133 Z" fill="#f4ede0" stroke="#1c1108" stroke-width="1.8"/>
  <circle cx="107" cy="133" r="3" fill="#20120a"/>
  <circle cx="106" cy="132" r="1" fill="#ffffff"/>
  <path d="M128 132 C 131 128, 140 127, 144 131 C 140 136, 131 136, 128 132 Z" fill="#f4ede0" stroke="#1c1108" stroke-width="1.8"/>
  <circle cx="136" cy="132" r="3" fill="#20120a"/>
  <circle cx="135" cy="131" r="1" fill="#ffffff"/>
  <path d="M97 129 C 103 124, 111 124, 115 129 M127 128 C 133 123, 141 124, 145 129" stroke="#1c1108" stroke-width="1.8" fill="none"/>

  <!-- 코 (넓고 강인함) -->
  <path d="M119 132 C 117 141, 114 148, 110 152 C 113 156, 119 156, 122 153" stroke="#8a5628" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M122 153 C 125 154, 128 152, 129 150" stroke="#c98f5e" stroke-width="1.6" fill="none" stroke-linecap="round"/>

  <!-- 입 (굳게 다문) -->
  <path d="M104 164 C 111 167, 124 167, 132 163" stroke="#5c261c" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M108 163 C 114 165, 122 165, 128 162" stroke="#2a1410" stroke-width="1.3" fill="none" opacity="0.55"/>
  <path d="M106 160 C 114 158, 122 158, 130 160" stroke="#2a1410" stroke-width="1.2" fill="none" opacity="0.45"/>

  <!-- 턱 음영 -->
  <path d="M100 152 C 106 162, 116 170, 126 170 C 118 174, 108 172, 100 164 Z" fill="#6e4426" opacity="0.4"/>

  <rect width="240" height="320" fill="url(#hw-vig)"/>
</svg>`;
