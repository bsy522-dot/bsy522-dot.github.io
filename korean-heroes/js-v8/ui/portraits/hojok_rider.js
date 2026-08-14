export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="hj-bg" cx="50%" cy="38%" r="85%">
      <stop offset="0%" stop-color="#f2ddb9"/>
      <stop offset="42%" stop-color="#d5a869"/>
      <stop offset="75%" stop-color="#7a5236"/>
      <stop offset="100%" stop-color="#241408"/>
    </radialGradient>
    <radialGradient id="hj-glow" cx="50%" cy="48%" r="50%">
      <stop offset="0%" stop-color="#fbeecb" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#e8caa0" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#e8caa0" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hj-leather" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#8a5c3a"/>
      <stop offset="50%" stop-color="#5a3a2a"/>
      <stop offset="100%" stop-color="#301d10"/>
    </linearGradient>
    <linearGradient id="hj-bronze" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#d8b56e"/>
      <stop offset="55%" stop-color="#a8813f"/>
      <stop offset="100%" stop-color="#63451f"/>
    </linearGradient>
    <linearGradient id="hj-mane" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#5c3324"/>
      <stop offset="55%" stop-color="#33201a"/>
      <stop offset="100%" stop-color="#160e0b"/>
    </linearGradient>
    <linearGradient id="hj-fur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2e6cd"/>
      <stop offset="55%" stop-color="#d7c199"/>
      <stop offset="100%" stop-color="#a08a5f"/>
    </linearGradient>
    <linearGradient id="hj-blade" x1="0" y1="0" x2="1" y2="0.2">
      <stop offset="0%" stop-color="#eef0f2"/>
      <stop offset="45%" stop-color="#b9bec4"/>
      <stop offset="100%" stop-color="#787e85"/>
    </linearGradient>
    <linearGradient id="hj-shaft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a5794a"/>
      <stop offset="50%" stop-color="#805a31"/>
      <stop offset="100%" stop-color="#563a1e"/>
    </linearGradient>
    <radialGradient id="hj-vig" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="72%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#160d06" stop-opacity="0.52"/>
    </radialGradient>
  </defs>

  <rect width="240" height="320" fill="url(#hj-bg)"/>

  <!-- 말발굽 모티프 (은은한 배경) -->
  <g opacity="0.16" fill="#301d10">
    <path d="M31 47 C29 30, 41 17, 57 17 C73 17, 84 30, 82 47 L82 59 C82 63, 78 63, 78 59 L78 46 C78 34, 69 25, 57 25 C45 25, 36 34, 36 46 L36 59 C36 63, 32 63, 31 59 Z" transform="rotate(-12 57 40)"/>
    <path d="M31 47 C29 30, 41 17, 57 17 C73 17, 84 30, 82 47 L82 59 C82 63, 78 63, 78 59 L78 46 C78 34, 69 25, 57 25 C45 25, 36 34, 36 46 L36 59 C36 63, 32 63, 31 59 Z" transform="translate(122 -8) rotate(14 57 40) scale(0.85)"/>
    <path d="M31 47 C29 30, 41 17, 57 17 C73 17, 84 30, 82 47 L82 59 C82 63, 78 63, 78 59 L78 46 C78 34, 69 25, 57 25 C45 25, 36 34, 36 46 L36 59 C36 63, 32 63, 31 59 Z" transform="translate(-24 218) rotate(8 57 40) scale(1.05)"/>
    <path d="M31 47 C29 30, 41 17, 57 17 C73 17, 84 30, 82 47 L82 59 C82 63, 78 63, 78 59 L78 46 C78 34, 69 25, 57 25 C45 25, 36 34, 36 46 L36 59 C36 63, 32 63, 31 59 Z" transform="translate(138 226) rotate(-18 57 40) scale(0.9)"/>
    <path d="M31 47 C29 30, 41 17, 57 17 C73 17, 84 30, 82 47 L82 59 C82 63, 78 63, 78 59 L78 46 C78 34, 69 25, 57 25 C45 25, 36 34, 36 46 L36 59 C36 63, 32 63, 31 59 Z" transform="translate(52 -30) rotate(4 57 40) scale(0.7)"/>
  </g>
  <ellipse cx="120" cy="132" rx="104" ry="104" fill="url(#hj-glow)"/>

  <!-- 짧은 창 (몸 뒤편) -->
  <g>
    <path d="M188 320 L180 320 L192 108 L200 108 Z" fill="#2c1c10"/>
    <path d="M187 318 L182 318 L193 110 L198 110 Z" fill="url(#hj-shaft)"/>
    <path d="M195 300 L196 130" stroke="#c69a63" stroke-width="1.5" opacity="0.75"/>
    <rect x="183" y="96" width="14" height="16" rx="3" fill="#8a8f96" stroke="#241a12" stroke-width="2"/>
    <path d="M190 94 C 178 80, 178 60, 190 40 C 202 60, 202 80, 190 94 Z" fill="url(#hj-blade)" stroke="#241a12" stroke-width="2.2"/>
    <path d="M190 46 L190 90" stroke="#6d7379" stroke-width="1.6"/>
    <path d="M186 56 C 184 66, 185 76, 188 84" stroke="#f6f8fa" stroke-width="1.4" fill="none" opacity="0.85"/>
  </g>

  <!-- 말갈기 장식 (투구 아래로 흘러내려 목·어깨 뒤로 사라짐) -->
  <path d="M100 64 C 76 92, 70 128, 84 162 C 90 180, 85 198, 92 214 L 150 212 C 142 196, 146 178, 138 162 C 126 132, 130 96, 150 66 Z" fill="url(#hj-mane)" stroke="#12090a" stroke-width="2"/>
  <path d="M112 68 C 92 96, 88 128, 100 158 C 105 176, 100 194, 107 210 L 140 208 C 133 194, 137 178, 130 162 C 120 136, 124 100, 140 72 Z" fill="#4a2a1f" opacity="0.55"/>
  <path d="M120 74 C 106 98, 104 126, 113 152" stroke="#8a5a3e" stroke-width="2.2" fill="none" opacity="0.65"/>
  <path d="M96 80 C 91 88, 92 96, 97 103" stroke="#6b3f2c" stroke-width="1.6" fill="none" opacity="0.5"/>
  <path d="M142 78 C 147 86, 146 95, 140 102" stroke="#6b3f2c" stroke-width="1.6" fill="none" opacity="0.5"/>

  <!-- 몸통 실루엣 (가죽 갑주) -->
  <path d="M30 320 C 34 260, 52 230, 86 216 C 98 210, 106 204, 110 196 L 132 196 C 136 204, 144 210, 156 216 C 190 230, 206 260, 210 320 Z"
        fill="url(#hj-leather)" stroke="#1c1108" stroke-width="3"/>
  <path d="M156 216 C 178 226, 194 248, 202 276 L 210 320 L 168 320 C 170 278, 166 244, 156 216 Z" fill="#241508" opacity="0.55"/>
  <path d="M86 216 C 72 222, 60 234, 52 252 C 62 240, 76 230, 92 224 Z" fill="#8f6440" opacity="0.65"/>

  <!-- 목 -->
  <path d="M108 172 C 108 184, 106 191, 102 196 C 110 205, 132 205, 140 196 C 135 191, 133 184, 133 172 Z" fill="#e2b17c" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M108 174 C 110 184, 121 189, 133 184 C 133 180, 133 176, 133 172 L 108 172 Z" fill="#bd8455" opacity="0.85"/>

  <!-- 모피 망토 깃 (부족 장식) -->
  <path d="M68 210 C 90 196, 152 196, 174 210 C 178 222, 174 236, 164 240 C 142 226, 98 226, 76 240 C 66 236, 64 222, 68 210 Z"
        fill="url(#hj-fur)" stroke="#1c1108" stroke-width="2.6"/>
  <path d="M76 214 C 72 220, 73 227, 78 231 M92 208 C 89 216, 90 224, 95 229 M108 204 C 106 213, 107 222, 111 227 M132 204 C 134 213, 133 222, 129 227 M148 208 C 151 216, 150 224, 145 229 M164 214 C 168 220, 167 227, 162 231"
        stroke="#9a835a" stroke-width="1.6" fill="none" opacity="0.8"/>

  <!-- 가죽 흉갑 -->
  <path d="M80 246 C 100 238, 142 238, 162 246 L 168 320 L 74 320 Z" fill="url(#hj-leather)" stroke="#1c1108" stroke-width="3"/>
  <path d="M78 266 L 164 266 M76 288 L 166 288" stroke="#241508" stroke-width="2.4"/>
  <g fill="#c8a565" stroke="#1c1108" stroke-width="1.2">
    <circle cx="92" cy="252" r="2.6"/><circle cx="110" cy="249" r="2.6"/><circle cx="130" cy="249" r="2.6"/><circle cx="148" cy="252" r="2.6"/>
    <circle cx="86" cy="277" r="2.6"/><circle cx="106" cy="276" r="2.6"/><circle cx="134" cy="276" r="2.6"/><circle cx="154" cy="277" r="2.6"/>
    <circle cx="92" cy="302" r="2.6"/><circle cx="118" cy="302" r="2.6"/><circle cx="144" cy="302" r="2.6"/>
  </g>
  <path d="M82 248 C 100 241, 142 241, 158 246 L 156 253 C 140 247, 100 247, 84 254 Z" fill="#8f6440" opacity="0.8"/>

  <!-- 오른팔 소매 -->
  <path d="M158 232 C 168 224, 180 220, 190 222 C 192 232, 187 244, 176 252 L 162 254 C 156 248, 154 240, 158 232 Z" fill="url(#hj-leather)" stroke="#1c1108" stroke-width="2.4"/>

  <!-- 어깨 모피 견갑 (창 든 쪽) -->
  <path d="M160 226 C 170 210, 190 204, 200 210 C 200 224, 192 236, 178 242 C 168 240, 162 234, 160 226 Z" fill="url(#hj-fur)" stroke="#1c1108" stroke-width="2.4"/>
  <path d="M166 220 C 174 213, 186 210, 194 213" stroke="#a08a5f" stroke-width="2" fill="none"/>

  <!-- 왼팔 소매 -->
  <path d="M60 236 C 68 226, 80 221, 90 222 C 94 232, 90 244, 80 252 L 66 254 C 60 248, 57 242, 60 236 Z" fill="url(#hj-leather)" stroke="#1c1108" stroke-width="2.4"/>

  <!-- 창 잡은 손 -->
  <path d="M168 240 C 166 230, 172 224, 182 224 C 192 224, 198 230, 197 240 C 196 248, 190 252, 182 252 C 174 252, 169 247, 168 240 Z" fill="#e2b17c" stroke="#1c1108" stroke-width="2.4"/>
  <path d="M172 230 L 194 230 M171 236 L 195 236 M172 242 L 193 242" stroke="#bd8455" stroke-width="1.6"/>

  <!-- 얼굴 -->
  <path d="M90 130 C 90 105, 101 89, 121 88 C 142 89, 152 104, 151 128 C 150 148, 143 163, 132 173 C 126 180, 116 181, 109 177 C 98 170, 91 149, 90 130 Z"
        fill="#e2b17c" stroke="#1c1108" stroke-width="2.8"/>
  <path d="M144 118 C 149 133, 146 152, 135 166 C 131 172, 126 176, 121 177 C 129 178, 135 175, 140 168 C 149 156, 152 138, 148 121 Z" fill="#b9835a" opacity="0.9"/>
  <path d="M96 116 C 94 129, 96 144, 103 156 C 99 141, 97 128, 99 116 Z" fill="#f6d9ab" opacity="0.9"/>

  <!-- 귀 -->
  <path d="M146 130 C 153 126, 157 132, 154 141 C 152 147, 148 149, 145 146 Z" fill="#e2b17c" stroke="#1c1108" stroke-width="2.2"/>
  <path d="M149 132 C 151 134, 151 138, 148 141" stroke="#bd8455" stroke-width="1.5" fill="none"/>

  <!-- 청동 투구 -->
  <path d="M86 116 C 83 87, 99 64, 121 63 C 143 64, 159 87, 156 117 C 151 100, 143 90, 133 86 C 138 96, 139 106, 136 112 C 130 98, 124 92, 118 91 C 110 93, 103 100, 100 113 C 99 105, 100 96, 104 88 C 93 93, 86 103, 86 116 Z"
        fill="url(#hj-bronze)" stroke="#1c1108" stroke-width="2.8"/>
  <path d="M92 109 C 101 101, 141 101, 150 109 L 150 120 C 141 111, 101 111, 92 120 Z" fill="#734f22" stroke="#1c1108" stroke-width="2"/>
  <path d="M93 109 C 103 103, 139 103, 149 109" stroke="#e6c98a" stroke-width="1.8" fill="none" opacity="0.8"/>
  <g fill="#e6c98a" opacity="0.85"><circle cx="99" cy="94" r="1.8"/><circle cx="121" cy="86" r="1.8"/><circle cx="143" cy="94" r="1.8"/></g>

  <!-- 코 가리개(비갑) -->
  <path d="M116 91 L127 91 L124 130 L119 130 Z" fill="#4a3216" stroke="#1c1108" stroke-width="1.8"/>
  <path d="M121 93 L120 127" stroke="#d8b56e" stroke-width="1.2" opacity="0.7"/>

  <!-- 볼 가리개 -->
  <path d="M89 118 C 80 125, 76 140, 81 156 C 85 162, 91 164, 96 160 C 89 149, 87 132, 93 120 Z" fill="url(#hj-bronze)" stroke="#1c1108" stroke-width="2.4"/>
  <path d="M152 121 C 158 128, 159 140, 154 152 C 151 158, 146 160, 142 157 C 148 147, 150 133, 146 122 Z" fill="url(#hj-bronze)" stroke="#1c1108" stroke-width="2.4"/>

  <!-- 눈썹 (사납게 찌푸림, 콧등 쪽으로 낮게 몰림) -->
  <path d="M94 116 C 100 112, 108 113, 116 124" stroke="#1c1006" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M126 124 C 134 113, 142 112, 148 116" stroke="#1c1006" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M117 120 L119 127 M123 120 L121 127" stroke="#1c1006" stroke-width="1.3" opacity="0.55" stroke-linecap="round"/>

  <!-- 흉터 -->
  <path d="M100 113 L93 141" stroke="#eec9a0" stroke-width="1.8" opacity="0.75" stroke-linecap="round"/>
  <path d="M99 113 L92 141" stroke="#8a5638" stroke-width="1" opacity="0.5" stroke-linecap="round"/>

  <!-- 눈 (매섭게) -->
  <path d="M97 133 C 101 130, 109 130, 112 133 C 109 137, 101 137, 97 133 Z" fill="#fdf6ea" stroke="#1c1108" stroke-width="1.8"/>
  <circle cx="105" cy="133" r="2.9" fill="#241004"/>
  <circle cx="104" cy="132" r="1" fill="#ffffff"/>
  <path d="M127 133 C 130 130, 138 130, 142 133 C 138 137, 131 137, 127 133 Z" fill="#fdf6ea" stroke="#1c1108" stroke-width="1.8"/>
  <circle cx="134" cy="133" r="2.9" fill="#241004"/>
  <circle cx="133" cy="132" r="1" fill="#ffffff"/>
  <path d="M97 130 C 102 127, 109 127, 113 130 M126 130 C 131 127, 139 127, 143 130" stroke="#1c1108" stroke-width="1.6" fill="none"/>

  <!-- 코 -->
  <path d="M118 132 C 117 141, 114 147, 111 151 C 113 154, 118 154, 120 152" stroke="#8a5638" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M120 152 C 122 153, 124 152, 125 150" stroke="#bd8455" stroke-width="1.6" fill="none" stroke-linecap="round"/>

  <!-- 콧수염 (짙고 억센, 아래로 처짐) -->
  <path d="M110 152 C 115 149, 126 149, 131 152 L 129 156 C 124 154, 117 154, 112 156 Z" fill="#241610" stroke="#0e0805" stroke-width="0.8"/>
  <path d="M111 154 C 104 156, 96 161, 91 168 C 97 165, 105 161, 112 158 Z" fill="#241610" stroke="#0e0805" stroke-width="0.8"/>
  <path d="M130 154 C 137 156, 145 161, 150 168 C 144 165, 136 161, 129 158 Z" fill="#241610" stroke="#0e0805" stroke-width="0.8"/>
  <path d="M96 159 C 100 157, 104 156, 108 156 M133 156 C 137 156, 141 157, 145 159" stroke="#4a332a" stroke-width="1" opacity="0.5" fill="none"/>

  <!-- 입 (굳게 다문 사나운 표정) -->
  <path d="M103 165 C 109 159, 123 159, 130 164" stroke="#4a2214" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M105 168 C 111 172, 121 172, 127 168" stroke="#8a5638" stroke-width="1.2" opacity="0.6" fill="none" stroke-linecap="round"/>

  <!-- 턱 (억센 그림자) -->
  <path d="M100 172 C 108 178, 132 178, 140 172 C 134 182, 122 187, 116 187 C 110 187, 105 181, 100 172 Z" fill="#b9835a" opacity="0.4"/>
  <g fill="#8a5638" opacity="0.3"><circle cx="106" cy="174" r="0.9"/><circle cx="114" cy="179" r="0.9"/><circle cx="123" cy="180" r="0.9"/><circle cx="131" cy="177" r="0.9"/><circle cx="136" cy="173" r="0.9"/></g>

  <!-- 볼 홍조 (풍상에 그을림) -->
  <ellipse cx="100" cy="148" rx="6" ry="3.4" fill="#a05c34" opacity="0.35"/>
  <ellipse cx="139" cy="147" rx="5.4" ry="3.2" fill="#a05c34" opacity="0.3"/>

  <rect width="240" height="320" fill="url(#hj-vig)"/>
</svg>`;
