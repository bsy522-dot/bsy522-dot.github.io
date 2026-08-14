export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="ha-bg" cx="50%" cy="38%" r="85%">
      <stop offset="0%" stop-color="#f4e9cd"/>
      <stop offset="45%" stop-color="#ddccaa"/>
      <stop offset="100%" stop-color="#6c5a38"/>
    </radialGradient>
    <radialGradient id="ha-glow" cx="50%" cy="46%" r="50%">
      <stop offset="0%" stop-color="#fdeecb" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#e8caa0" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#e8caa0" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ha-leather" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#7a5c3e"/>
      <stop offset="55%" stop-color="#4a3a2a"/>
      <stop offset="100%" stop-color="#2a2014"/>
    </linearGradient>
    <linearGradient id="ha-skin" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#eab784"/>
      <stop offset="45%" stop-color="#cf9760"/>
      <stop offset="100%" stop-color="#a2703f"/>
    </linearGradient>
    <linearGradient id="ha-fur" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e8862a"/>
      <stop offset="55%" stop-color="#c2661c"/>
      <stop offset="100%" stop-color="#8a4512"/>
    </linearGradient>
    <linearGradient id="ha-strap" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9a7048"/>
      <stop offset="50%" stop-color="#7a5230"/>
      <stop offset="100%" stop-color="#4a3018"/>
    </linearGradient>
    <linearGradient id="ha-bow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a5794a"/>
      <stop offset="50%" stop-color="#805a31"/>
      <stop offset="100%" stop-color="#563a1e"/>
    </linearGradient>
    <linearGradient id="ha-fletch" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c96a48"/>
      <stop offset="55%" stop-color="#973a26"/>
      <stop offset="100%" stop-color="#6a2416"/>
    </linearGradient>
    <linearGradient id="ha-metal" x1="0" y1="0" x2="1" y2="0.2">
      <stop offset="0%" stop-color="#eef0f2"/>
      <stop offset="45%" stop-color="#b9bec4"/>
      <stop offset="100%" stop-color="#787e85"/>
    </linearGradient>
    <radialGradient id="ha-vig" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="72%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1c130a" stop-opacity="0.52"/>
    </radialGradient>
  </defs>

  <rect width="240" height="320" fill="url(#ha-bg)"/>

  <!-- 화살촉 모티프 (은은한 배경) -->
  <g opacity="0.16" fill="#4a3a2a">
    <g transform="translate(28,26) rotate(-14)">
      <path d="M13 0 L25 42 L13 84 L1 42 Z"/>
      <path d="M13 0 L13 84" stroke="#2a2014" stroke-width="1.4" fill="none"/>
    </g>
    <g transform="translate(196,10) rotate(18) scale(0.8)">
      <path d="M13 0 L25 42 L13 84 L1 42 Z"/>
      <path d="M13 0 L13 84" stroke="#2a2014" stroke-width="1.4" fill="none"/>
    </g>
    <g transform="translate(14,238) rotate(8) scale(0.92)">
      <path d="M13 0 L25 42 L13 84 L1 42 Z"/>
      <path d="M13 0 L13 84" stroke="#2a2014" stroke-width="1.4" fill="none"/>
    </g>
    <g transform="translate(206,236) rotate(-16) scale(0.86)">
      <path d="M13 0 L25 42 L13 84 L1 42 Z"/>
      <path d="M13 0 L13 84" stroke="#2a2014" stroke-width="1.4" fill="none"/>
    </g>
    <g transform="translate(112,-18) rotate(4) scale(0.6)">
      <path d="M13 0 L25 42 L13 84 L1 42 Z"/>
      <path d="M13 0 L13 84" stroke="#2a2014" stroke-width="1.4" fill="none"/>
    </g>
  </g>
  <ellipse cx="120" cy="132" rx="106" ry="104" fill="url(#ha-glow)"/>

  <!-- 화살통 (몸 뒤편, 어깨 위로 삐져나옴) -->
  <g>
    <path d="M172 214 C169 168,173 118,182 82 C184 73,197 73,200 82 C206 116,206 164,201 212 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.6"/>
    <path d="M173 132 C181 127,193 127,200 132" stroke="#241608" stroke-width="3"/>
    <path d="M172 172 C180 167,194 167,201 172" stroke="#241608" stroke-width="3"/>
    <ellipse cx="191" cy="80" rx="11" ry="5" fill="#2a2014" stroke="#1c1108" stroke-width="1.6"/>
    <line x1="183" y1="79" x2="178" y2="34" stroke="url(#ha-bow)" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="191" y1="77" x2="191" y2="25" stroke="url(#ha-bow)" stroke-width="2.6" stroke-linecap="round"/>
    <line x1="199" y1="79" x2="204" y2="36" stroke="url(#ha-bow)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M178 34 L172 46 L178 40 L184 47 Z" fill="url(#ha-fletch)" stroke="#1c1108" stroke-width="1.2"/>
    <path d="M191 25 L184 38 L191 32 L198 38 Z" fill="url(#ha-fletch)" stroke="#1c1108" stroke-width="1.2"/>
    <path d="M204 36 L198 48 L204 42 L210 48 Z" fill="url(#ha-fletch)" stroke="#1c1108" stroke-width="1.2"/>
  </g>

  <!-- 짧은 활 (몸 앞, 대각선) -->
  <g>
    <path d="M18 320 C 18 276, 30 234, 52 208 C 66 192, 82 166, 90 138" stroke="#201810" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M18 320 C 18 276, 30 234, 52 208 C 66 192, 82 166, 90 138" stroke="url(#ha-bow)" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M90 138 C 99 128, 110 124, 120 132" stroke="#201810" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M90 138 C 99 128, 110 124, 120 132" stroke="url(#ha-bow)" stroke-width="4.6" fill="none" stroke-linecap="round"/>
    <path d="M24 316 L 116 132" stroke="#f2ead2" stroke-width="2" opacity="0.92" fill="none"/>
  </g>

  <!-- 몸통 실루엣 (가죽 조끼) -->
  <path d="M28 320 C 32 260, 52 228, 88 214 C 100 208, 108 202, 112 194 L 130 194 C 134 202, 142 208, 154 214 C 190 228, 210 260, 214 320 Z"
        fill="url(#ha-leather)" stroke="#1c1108" stroke-width="3"/>
  <path d="M154 214 C 178 224, 196 248, 204 278 L 214 320 L 172 320 C 174 280, 170 246, 154 214 Z" fill="#20140a" opacity="0.55"/>
  <path d="M88 214 C 74 220, 60 232, 52 250 C 62 238, 78 228, 94 222 Z" fill="#8f6440" opacity="0.6"/>

  <!-- 목 -->
  <path d="M108 172 C 108 184, 106 191, 102 196 C 110 205, 132 205, 140 196 C 135 191, 133 184, 133 172 Z" fill="url(#ha-skin)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M108 174 C 110 184, 121 189, 133 184 C 133 180, 133 176, 133 172 L 108 172 Z" fill="#b9814f" opacity="0.85"/>

  <!-- 가죽 조끼 앞깃 -->
  <path d="M112 194 C 108 214, 100 230, 86 240 L 104 248 C 114 237, 120 224, 122 208 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M130 194 C 132 214, 140 230, 152 240 L 134 248 C 124 237, 118 224, 116 208 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M113 197 C 109 214, 102 228, 92 238 M129 197 C 133 214, 140 228, 150 238" stroke="#a3835a" stroke-width="1.8" fill="none" opacity="0.7"/>

  <!-- 가죽 흉갑 -->
  <path d="M78 246 C 100 236, 142 236, 164 246 L 170 320 L 72 320 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="3"/>
  <path d="M76 268 L 166 268 M74 290 L 168 290" stroke="#2a1a0e" stroke-width="2.4"/>
  <g stroke="#1c1108" stroke-width="1.6">
    <path d="M90 250 L90 264 M108 248 L108 264 M126 247 L126 264 M144 249 L144 264"/>
    <path d="M84 272 L84 286 M102 272 L102 286 M120 272 L120 286 M138 272 L138 286 M156 272 L156 286"/>
  </g>
  <path d="M80 248 C 100 240, 142 240, 160 245 L 158 251 C 140 246, 100 246, 82 253 Z" fill="#a3835a" opacity="0.8"/>

  <!-- 화살통 멜빵 (가슴 크로스 스트랩) -->
  <path d="M84 244 L 148 320 L 134 320 L 76 250 Z" fill="url(#ha-strap)" stroke="#1c1108" stroke-width="1.8"/>
  <path d="M90 244 L 154 320" stroke="#3a2414" stroke-width="1.2" opacity="0.6"/>

  <!-- 어깨 모피 장식 (부족 표식) -->
  <path d="M148 206 C 166 200, 188 208, 196 228 C 200 244, 194 258, 178 262 C 168 250, 156 238, 148 226 Z" fill="url(#ha-fur)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M156 210 L162 226 M167 208 L174 230 M178 212 L186 236" stroke="#241408" stroke-width="3" stroke-linecap="round" opacity="0.8"/>

  <!-- 왼팔 소매 -->
  <path d="M64 244 C 72 236, 82 231, 92 231 C 96 240, 93 250, 85 258 L 71 262 C 65 257, 62 251, 64 244 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.4"/>

  <!-- 왼쪽 가죽 견갑 -->
  <path d="M62 234 C 72 218, 92 212, 104 216 C 102 230, 94 242, 80 248 C 70 246, 64 242, 62 234 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M68 226 C 78 217, 92 214, 101 218" stroke="#a3835a" stroke-width="2.2" fill="none"/>

  <!-- 활 잡은 손 -->
  <path d="M46 246 C 44 236, 50 230, 60 230 C 70 230, 76 236, 75 246 C 74 254, 68 258, 60 258 C 52 258, 47 253, 46 246 Z" fill="url(#ha-skin)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M50 236 L 72 236 M49 242 L 73 242 M50 248 L 72 248" stroke="#b57845" stroke-width="1.8"/>
  <path d="M47 250 C 52 256, 66 257, 72 251" stroke="#c98f5e" stroke-width="1.8" fill="none"/>
  <path d="M44 258 L 76 258 L 74 268 L 46 268 Z" fill="#5a4028" stroke="#1c1108" stroke-width="2.2"/>

  <!-- 얼굴 -->
  <path d="M91 129 C 91 105, 102 90, 121 89 C 142 90, 152 105, 151 127 C 151 147, 144 161, 133 171 C 127 178, 116 180, 108 175 C 98 169, 92 149, 91 129 Z"
        fill="url(#ha-skin)" stroke="#1c1108" stroke-width="2.8"/>
  <path d="M145 118 C 149 133, 146 152, 135 166 C 131 172, 126 176, 121 177 C 129 178, 135 175, 140 168 C 149 156, 152 138, 148 121 Z" fill="#9a663c" opacity="0.85"/>
  <path d="M96 116 C 94 129, 96 144, 103 156 C 99 141, 97 128, 99 116 Z" fill="#f6d9ab" opacity="0.85"/>

  <!-- 귀 -->
  <path d="M147 129 C 154 125, 158 131, 155 140 C 153 146, 149 148, 146 145 Z" fill="url(#ha-skin)" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M150 133 C 152 134, 152 138, 149 141" stroke="#9a663c" stroke-width="1.5" fill="none"/>

  <!-- 가죽 두건 -->
  <path d="M87 118 C 82 88, 98 62, 121 60 C 145 62, 160 88, 155 118 C 154 102, 147 90, 138 85 C 141 94, 141 103, 139 110 C 132 96, 124 89, 121 88 C 112 89, 104 96, 100 110 C 98 103, 98 94, 101 85 C 92 90, 85 102, 87 118 Z"
        fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M96 96 C 102 84, 112 78, 122 78 C 108 82, 100 90, 96 100 Z" fill="#3a2c1c" opacity="0.6"/>

  <!-- 두건 모피 안감 -->
  <path d="M89 108 C 100 100, 142 100, 153 108 L 153 120 C 142 110, 100 110, 89 120 Z" fill="url(#ha-fur)" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M91 108 C 103 102, 139 102, 151 108" stroke="#f2e6cd" stroke-width="1.8" fill="none" opacity="0.7"/>
  <path d="M96 106 L100 113 M104 104 L108 112 M114 103 L118 111 M126 103 L130 111 M136 104 L140 112 M144 106 L148 113" stroke="#8a6a3c" stroke-width="1.1" fill="none" opacity="0.5"/>

  <!-- 두건 옆자락 -->
  <path d="M84 120 C 78 140, 76 162, 82 182 C 86 196, 92 206, 100 212 C 94 196, 90 178, 88 158 C 86 142, 84 130, 84 120 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M158 120 C 164 140, 166 162, 160 182 C 156 196, 150 206, 142 212 C 148 196, 152 178, 154 158 C 156 142, 158 130, 158 120 Z" fill="url(#ha-leather)" stroke="#1c1108" stroke-width="2.2"/>

  <!-- 두건 끈 + 화살촉 장식 -->
  <path d="M112 190 C 112 197, 116 201, 121 202 C 126 201, 130 197, 130 190" stroke="#2a2014" stroke-width="2.2" fill="none"/>
  <circle cx="121" cy="200" r="3" fill="#2a2014" stroke="#1c1108" stroke-width="1"/>
  <path d="M121 203 L119 214" stroke="#2a2014" stroke-width="1.6"/>
  <path d="M115 214 L123 210 L131 214 L123 228 Z" fill="url(#ha-metal)" stroke="#1c1108" stroke-width="1.4"/>
  <path d="M123 210 L123 228" stroke="#5c6268" stroke-width="1" opacity="0.7"/>

  <!-- 눈썹 (경계하는 인상) -->
  <path d="M95 124 C 101 115, 111 112, 118 119" stroke="#1c1108" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M125 118 C 132 112, 142 114, 147 124" stroke="#1c1108" stroke-width="3.4" fill="none" stroke-linecap="round"/>

  <!-- 흉터 -->
  <path d="M93 117 L88 137" stroke="#eec9a0" stroke-width="1.6" opacity="0.7" stroke-linecap="round"/>
  <path d="M92 117 L87 137" stroke="#8a5638" stroke-width="0.9" opacity="0.5" stroke-linecap="round"/>

  <!-- 눈 (매서운 사냥꾼의 눈) -->
  <path d="M98 132 C 102 129, 110 129, 113 132 C 110 136, 102 136, 98 132 Z" fill="#fdf6ea" stroke="#1c1108" stroke-width="1.8"/>
  <circle cx="106" cy="132" r="2.8" fill="#2a1a08"/>
  <circle cx="105" cy="131" r="1" fill="#ffffff"/>
  <path d="M128 132 C 131 129, 138 129, 141 132 C 138 135, 131 135, 128 132 Z" fill="#fdf6ea" stroke="#1c1108" stroke-width="1.8"/>
  <circle cx="134" cy="132" r="2.5" fill="#2a1a08"/>
  <circle cx="133" cy="131" r="0.9" fill="#ffffff"/>
  <path d="M97 129 C 103 125, 110 125, 114 129 M127 128 C 132 124, 139 125, 143 129" stroke="#1c1108" stroke-width="1.6" fill="none"/>

  <!-- 코 -->
  <path d="M118 131 C 117 140, 114 146, 111 150 C 113 153, 118 153, 120 151" stroke="#8a5638" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M120 151 C 122 152, 124 151, 125 149" stroke="#c98f5e" stroke-width="1.5" fill="none" stroke-linecap="round"/>

  <!-- 부족 문양 (볼 안료) -->
  <path d="M132 137 C 128 147, 124 156, 119 163" stroke="#7a3420" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.6"/>
  <path d="M137 141 C 133 150, 129 158, 125 165" stroke="#7a3420" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.42"/>

  <!-- 입 (굳게 다문) -->
  <path d="M104 161 C 111 162, 122 162, 129 160" stroke="#5a2c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M107 165 C 113 166, 121 166, 126 164" stroke="#8a4a30" stroke-width="1.4" fill="none" stroke-linecap="round"/>

  <!-- 수염 자국 -->
  <g stroke="#3a2414" stroke-width="1" opacity="0.25" stroke-linecap="round">
    <path d="M99 156 L101 159 M104 162 L106 165 M112 168 L114 170 M122 168 L124 170 M130 162 L132 165 M136 155 L138 158"/>
  </g>

  <!-- 볼 그을림 -->
  <ellipse cx="100" cy="147" rx="6" ry="3.2" fill="#a05c34" opacity="0.32"/>

  <rect width="240" height="320" fill="url(#ha-vig)"/>
</svg>`;
