export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="sry-bg" cx="50%" cy="36%" r="85%">
      <stop offset="0%" stop-color="#ecdfbf"/>
      <stop offset="40%" stop-color="#ccb992"/>
      <stop offset="72%" stop-color="#93805f"/>
      <stop offset="100%" stop-color="#433525"/>
    </radialGradient>
    <radialGradient id="sry-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff6da" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#f0e0b4" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f0e0b4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sry-skin" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#a58e6d"/>
      <stop offset="55%" stop-color="#7d6a52"/>
      <stop offset="100%" stop-color="#5a4936"/>
    </linearGradient>
    <linearGradient id="sry-rock" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7d6a50"/>
      <stop offset="100%" stop-color="#4e3f2e"/>
    </linearGradient>
    <linearGradient id="sry-root" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7a5a36"/>
      <stop offset="100%" stop-color="#46331e"/>
    </linearGradient>
    <radialGradient id="sry-eye" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#fff3c4"/>
      <stop offset="45%" stop-color="#ffd984"/>
      <stop offset="100%" stop-color="#d99a2e"/>
    </radialGradient>
    <radialGradient id="sry-vin" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#1e1408" stop-opacity="0"/>
      <stop offset="74%" stop-color="#1e1408" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1e1408" stop-opacity="0.55"/>
    </radialGradient>
  </defs>

  <rect width="240" height="320" fill="url(#sry-bg)"/>

  <!-- 배경 산맥 문양 -->
  <path d="M0 208 L26 138 L48 176 L74 112 L98 168 L128 104 L156 162 L184 122 L212 178 L240 140 L240 232 L0 232 Z" fill="#5b4a38" opacity="0.20"/>
  <path d="M0 236 L40 160 L70 204 L110 142 L146 198 L182 150 L214 196 L240 164 L240 256 L0 256 Z" fill="#453626" opacity="0.28"/>
  <path d="M6 96 L30 68 L52 94 L76 60" stroke="#6a5940" stroke-width="1.6" fill="none" opacity="0.28"/>
  <path d="M164 62 L188 88 L212 58 L234 88" stroke="#6a5940" stroke-width="1.6" fill="none" opacity="0.28"/>

  <!-- 후광 -->
  <ellipse cx="116" cy="128" rx="106" ry="98" fill="url(#sry-glow)"/>

  <!-- 어깨 · 상체 (바위) -->
  <path d="M6 320 L10 262 Q22 232 58 216 Q82 206 92 200 L148 200 Q160 208 186 218 Q220 232 230 262 L234 320 Z" fill="url(#sry-rock)" stroke="#241a10" stroke-width="2.5"/>
  <path d="M18 268 L44 230 L72 244 L58 286 L26 292 Z" fill="#84715a" stroke="#3a2d20" stroke-width="1.2"/>
  <path d="M34 252 L46 262 L42 276" stroke="#3a2d20" stroke-width="1.2" fill="none" opacity="0.8"/>
  <path d="M12 300 L26 292 L58 286 L64 306 L52 320 L14 320 Z" fill="#4c3d2d" stroke="#3a2d20" stroke-width="1"/>
  <path d="M158 216 L196 226 L206 246 L168 232 Z" fill="#84715a" stroke="#3a2d20" stroke-width="1.2"/>
  <path d="M196 258 L188 270 L194 282" stroke="#3a2d20" stroke-width="1.2" fill="none" opacity="0.8"/>
  <path d="M168 232 L206 246 L216 284 L186 292 L162 262 Z" fill="#7c684c" stroke="#3a2d20" stroke-width="1.2"/>
  <path d="M186 292 L216 284 L228 320 L182 320 Z" fill="#4c3d2d" stroke="#3a2d20" stroke-width="1"/>
  <path d="M30 236 Q40 228 52 230 Q46 240 36 242 Q30 240 30 236 Z" fill="#5d7040" opacity="0.9"/>
  <path d="M188 238 Q198 234 206 240 Q200 248 190 246 Z" fill="#556638" opacity="0.9"/>

  <!-- 목 -->
  <path d="M94 174 L92 212 L148 212 L146 174 Z" fill="#6b593f" stroke="#241a10" stroke-width="2"/>
  <path d="M96 176 L96 208" stroke="#4a3a28" stroke-width="2" opacity="0.6"/>

  <!-- 나무뿌리 어깨 (왼쪽) -->
  <path d="M102 198 Q56 200 40 224 Q32 240 36 256 L60 246 Q60 226 78 214 Q90 206 106 208 Z" fill="url(#sry-root)" stroke="#2a1c10" stroke-width="2"/>
  <path d="M42 226 Q22 246 24 276 Q25 296 18 308 Q36 302 40 278 Q42 252 52 238 Z" fill="#5f4527" stroke="#2a1c10" stroke-width="1.8"/>
  <path d="M58 246 Q46 270 50 298 Q52 312 46 320 L66 320 Q70 300 66 272 Q64 254 70 242 Z" fill="#6b4e2c" stroke="#2a1c10" stroke-width="1.8"/>
  <path d="M76 216 Q72 236 80 258 Q84 268 80 280 Q92 270 90 250 Q88 232 92 214 Z" fill="#54401f" stroke="#2a1c10" stroke-width="1.6"/>
  <path d="M46 230 Q34 250 33 274" stroke="#8a6a42" stroke-width="1.8" fill="none" opacity="0.8"/>
  <path d="M60 250 Q54 272 57 296" stroke="#8a6a42" stroke-width="1.6" fill="none" opacity="0.7"/>

  <!-- 나무뿌리 어깨 (오른쪽) -->
  <path d="M138 198 Q184 200 200 224 Q208 240 204 256 L180 246 Q180 226 162 214 Q150 206 134 208 Z" fill="url(#sry-root)" stroke="#2a1c10" stroke-width="2"/>
  <path d="M198 226 Q218 246 216 276 Q215 296 222 308 Q204 302 200 278 Q198 252 188 238 Z" fill="#5f4527" stroke="#2a1c10" stroke-width="1.8"/>
  <path d="M182 246 Q194 270 190 298 Q188 312 194 320 L174 320 Q170 300 174 272 Q176 254 170 242 Z" fill="#6b4e2c" stroke="#2a1c10" stroke-width="1.8"/>
  <path d="M164 216 Q168 236 160 258 Q156 268 160 280 Q148 270 150 250 Q152 232 148 214 Z" fill="#54401f" stroke="#2a1c10" stroke-width="1.6"/>
  <path d="M194 230 Q206 250 207 274" stroke="#8a6a42" stroke-width="1.8" fill="none" opacity="0.8"/>
  <path d="M180 250 Q186 272 183 296" stroke="#8a6a42" stroke-width="1.6" fill="none" opacity="0.7"/>
  <circle cx="52" cy="238" r="2.6" fill="#3a2a16"/>
  <circle cx="190" cy="236" r="2.6" fill="#3a2a16"/>

  <!-- 어깨 위 소나무 -->
  <path d="M205 208 L196 228 L214 228 Z" fill="#3d5230" stroke="#23301a" stroke-width="1"/>
  <path d="M205 218 L194 240 L216 240 Z" fill="#33452a" stroke="#23301a" stroke-width="1"/>
  <rect x="203" y="240" width="4" height="7" fill="#46331e"/>

  <!-- 머리 (바위 봉우리) -->
  <path d="M70 152 L66 118 L74 92 L88 72 L100 58 L110 74 L122 52 L136 72 L146 62 L158 88 L166 116 L162 152 L150 180 L130 196 L98 194 L78 174 Z" fill="url(#sry-skin)" stroke="#241a10" stroke-width="2.5"/>
  <!-- 만년설 봉우리 -->
  <path d="M92 68 L100 58 L108 71 L102 75 L96 73 Z" fill="#e8e2d2" stroke="#b8ad97" stroke-width="0.8"/>
  <path d="M114 66 L122 52 L131 65 L124 71 L118 70 Z" fill="#efe9d9" stroke="#b8ad97" stroke-width="0.8"/>
  <path d="M141 69 L146 62 L152 74 L146 77 Z" fill="#e2dccb" stroke="#b8ad97" stroke-width="0.8"/>
  <!-- 얼굴 면 분할 (명/중/암) -->
  <path d="M78 96 L96 78 L122 74 L148 84 L154 100 L128 94 L100 96 L82 104 Z" fill="#ab9573" opacity="0.9"/>
  <path d="M70 150 L66 118 L74 92 L80 96 L72 122 L74 148 Z" fill="#b9a37d" opacity="0.75"/>
  <path d="M154 100 L160 118 L158 148 L148 152 L150 120 Z" fill="#57462f" opacity="0.85"/>
  <path d="M128 152 L150 150 L146 172 L132 176 Z" fill="#6b5840" opacity="0.8"/>
  <path d="M80 152 L96 152 L94 170 L84 168 Z" fill="#97815f" opacity="0.8"/>
  <!-- 바위 균열 -->
  <path d="M90 84 L96 96 L92 108" stroke="#3e3226" stroke-width="1.3" fill="none" opacity="0.8"/>
  <path d="M140 92 L136 104 L142 114" stroke="#3e3226" stroke-width="1.3" fill="none" opacity="0.8"/>
  <path d="M152 152 L146 164 L150 172" stroke="#3e3226" stroke-width="1.2" fill="none" opacity="0.7"/>

  <!-- 돌 눈두덩 (분노한 인상) -->
  <path d="M74 130 L98 120 L112 124 L126 120 L152 128 L156 142 L128 134 L112 138 L96 134 L72 142 Z" fill="#6b5741" stroke="#241a10" stroke-width="1.5"/>
  <path d="M74 142 L96 136 L108 140 L96 150 L78 150 Z" fill="#3e3226" opacity="0.85"/>
  <path d="M116 140 L128 136 L152 144 L148 154 L122 150 Z" fill="#3e3226" opacity="0.85"/>
  <!-- 이끼 눈썹 -->
  <path d="M76 128 Q84 118 98 121 Q104 124 110 123 Q104 130 92 129 Q82 132 76 128 Z" fill="#66794a" stroke="#33421f" stroke-width="1"/>
  <path d="M116 122 Q124 116 138 120 Q148 122 154 129 Q144 132 132 128 Q122 128 116 122 Z" fill="#5d7040" stroke="#33421f" stroke-width="1"/>

  <!-- 눈 (호박빛 정령안) -->
  <ellipse cx="94" cy="148" rx="11" ry="7" fill="#2c2318"/>
  <ellipse cx="136" cy="146" rx="12" ry="7.5" fill="#2c2318"/>
  <circle cx="94.5" cy="148" r="6" fill="#ffdb7a" opacity="0.25"/>
  <circle cx="136.5" cy="146" r="6.4" fill="#ffdb7a" opacity="0.25"/>
  <circle cx="94.5" cy="148" r="3.4" fill="url(#sry-eye)"/>
  <circle cx="136.5" cy="146" r="3.7" fill="url(#sry-eye)"/>
  <circle cx="94.7" cy="148.4" r="1.1" fill="#7a4a10"/>
  <circle cx="136.7" cy="146.4" r="1.2" fill="#7a4a10"/>
  <circle cx="93.4" cy="146.6" r="0.8" fill="#fff2c0"/>
  <circle cx="135.4" cy="144.6" r="0.8" fill="#fff2c0"/>

  <!-- 코 (각진 바위코) -->
  <path d="M112 126 L105 158 L100 166 L106 172 L118 170 L122 163 L116 126 Z" fill="#8d7859" stroke="#3a2d20" stroke-width="1.2"/>
  <path d="M112 128 L107 158 L112 166 L115 128 Z" fill="#ab9573"/>
  <ellipse cx="105" cy="167" rx="2.4" ry="1.5" fill="#33281c"/>
  <ellipse cx="116.5" cy="166" rx="2.6" ry="1.6" fill="#33281c"/>
  <path d="M102 172 Q112 176 120 171 L118 175 Q111 178 103 175 Z" fill="#4a3a2a" opacity="0.6"/>

  <!-- 이끼 콧수염 (입 가리지 않게 위로) -->
  <path d="M101 172 Q90 172 84 179 Q90 183 98 181 Q102 177 104 173 Z" fill="#5d7040" stroke="#33421f" stroke-width="1"/>
  <path d="M121 171 Q133 171 141 178 Q134 182 124 180 Q120 176 119 172 Z" fill="#66794a" stroke="#33421f" stroke-width="1"/>

  <!-- 입 (굳게 다문 찌푸림) -->
  <path d="M100 185 Q115 179 131 184" stroke="#1e1408" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M99 185 L95 190" stroke="#1e1408" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M131 184 L135 189" stroke="#1e1408" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M103 189 Q115 193 127 189" stroke="#a08a6c" stroke-width="1.6" fill="none" opacity="0.75"/>
  <!-- 구레나룻 이끼 -->
  <path d="M76 150 Q70 162 76 172 Q82 178 90 178 Q84 164 84 152 Z" fill="#556638" stroke="#33421f" stroke-width="1"/>
  <path d="M158 148 Q164 162 158 172 Q152 178 146 178 Q152 164 152 150 Z" fill="#4c5c32" stroke="#33421f" stroke-width="1"/>

  <!-- 이끼 수염 (3층 셰이딩) -->
  <path d="M78 166 Q68 198 72 232 Q74 260 82 278 Q88 268 92 282 Q100 296 106 284 Q112 298 120 298 Q128 296 132 284 Q138 296 144 280 Q148 270 152 278 Q160 258 162 230 Q164 196 156 166 Q150 186 128 194 L100 193 Q84 184 78 166 Z" fill="#3c4a2a" stroke="#23301a" stroke-width="2"/>
  <path d="M84 176 Q78 202 82 228 Q86 252 94 264 Q98 252 104 264 Q110 274 116 264 Q122 276 128 264 Q134 272 140 256 Q146 240 148 222 Q152 198 146 176 Q136 190 118 191 Q98 190 84 176 Z" fill="#556638"/>
  <path d="M92 182 Q100 192 112 192 Q104 200 94 196 Q88 190 92 182 Z" fill="#728a4a"/>
  <path d="M146 180 Q140 192 128 193 Q136 202 146 197 Q152 190 146 180 Z" fill="#728a4a"/>
  <path d="M100 210 Q110 216 122 212 Q116 224 104 222 Q98 216 100 210 Z" fill="#6a8144"/>
  <path d="M128 214 Q136 210 142 204 Q144 216 136 222 Q128 222 128 214 Z" fill="#6a8144"/>
  <path d="M96 236 Q100 250 96 264" stroke="#728a4a" stroke-width="2" fill="none" opacity="0.8"/>
  <path d="M118 240 Q120 256 117 272" stroke="#728a4a" stroke-width="2" fill="none" opacity="0.8"/>
  <path d="M140 234 Q142 248 138 262" stroke="#6a8144" stroke-width="1.8" fill="none" opacity="0.8"/>
  <path d="M108 228 Q106 244 108 258" stroke="#4c5c32" stroke-width="1.8" fill="none" opacity="0.9"/>
  <path d="M130 230 Q132 244 129 258" stroke="#4c5c32" stroke-width="1.8" fill="none" opacity="0.9"/>

  <!-- 비네트 -->
  <rect width="240" height="320" fill="url(#sry-vin)"/>
</svg>`;
