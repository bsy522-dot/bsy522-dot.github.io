export default `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <defs>
    <radialGradient id="tvBg" cx="50%" cy="38%" r="78%">
      <stop offset="0%" stop-color="#f5ead0"/>
      <stop offset="55%" stop-color="#ddccaa"/>
      <stop offset="100%" stop-color="#b3a077"/>
    </radialGradient>
    <radialGradient id="tvGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff4d6" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#f2e2b8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f2e2b8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="tvVig" cx="50%" cy="42%" r="80%">
      <stop offset="0%" stop-color="#2e2416" stop-opacity="0"/>
      <stop offset="72%" stop-color="#2e2416" stop-opacity="0"/>
      <stop offset="100%" stop-color="#2e2416" stop-opacity="0.42"/>
    </radialGradient>
    <linearGradient id="tvHat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#dcbc7c"/>
      <stop offset="55%" stop-color="#b8935a"/>
      <stop offset="100%" stop-color="#8f6c3c"/>
    </linearGradient>
    <linearGradient id="tvRobe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6e5c48"/>
      <stop offset="55%" stop-color="#5a4a3a"/>
      <stop offset="100%" stop-color="#40332a"/>
    </linearGradient>
    <linearGradient id="tvSkin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7c5a3c"/>
      <stop offset="42%" stop-color="#c79868"/>
      <stop offset="100%" stop-color="#b78655"/>
    </linearGradient>
    <linearGradient id="tvShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#322416" stop-opacity="0.95"/>
      <stop offset="36%" stop-color="#3c2c1c" stop-opacity="0.85"/>
      <stop offset="62%" stop-color="#453222" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="240" height="320" fill="url(#tvBg)"/>

  <path d="M-14 320 L 34 320 C 46 262 22 232 54 180 C 64 163 58 140 68 118 L 58 113 C 45 140 52 160 38 185 C 8 233 32 262 -14 320 Z" fill="#cfbb8f" opacity="0.55"/>
  <g fill="#8a7653" opacity="0.4">
    <ellipse cx="18" cy="292" rx="3.2" ry="5.4" transform="rotate(-18 18 292)"/>
    <ellipse cx="30" cy="274" rx="3.2" ry="5.4" transform="rotate(-12 30 274)"/>
    <ellipse cx="24" cy="250" rx="3" ry="5" transform="rotate(-20 24 250)"/>
    <ellipse cx="37" cy="232" rx="3" ry="5" transform="rotate(-10 37 232)"/>
    <ellipse cx="34" cy="208" rx="2.6" ry="4.4" transform="rotate(-22 34 208)"/>
    <ellipse cx="47" cy="192" rx="2.6" ry="4.4" transform="rotate(-8 47 192)"/>
    <ellipse cx="50" cy="168" rx="2.2" ry="3.8" transform="rotate(-20 50 168)"/>
    <ellipse cx="60" cy="152" rx="2.2" ry="3.8" transform="rotate(-6 60 152)"/>
  </g>
  <g fill="#8a7653" opacity="0.28">
    <ellipse cx="203" cy="70" rx="2.2" ry="3.6" transform="rotate(24 203 70)"/>
    <ellipse cx="212" cy="56" rx="2.2" ry="3.6" transform="rotate(30 212 56)"/>
    <ellipse cx="217" cy="40" rx="2" ry="3.2" transform="rotate(24 217 40)"/>
    <ellipse cx="226" cy="27" rx="2" ry="3.2" transform="rotate(30 226 27)"/>
  </g>
  <path d="M156 96 C 176 84 198 78 226 76" stroke="#c3ae82" stroke-width="8" fill="none" opacity="0.4" stroke-linecap="round"/>

  <ellipse cx="118" cy="118" rx="102" ry="100" fill="url(#tvGlow)"/>
  <g fill="#fff2cc" opacity="0.35">
    <circle cx="52" cy="86" r="1.6"/>
    <circle cx="196" cy="132" r="1.4"/>
    <circle cx="208" cy="96" r="1.1"/>
    <circle cx="36" cy="140" r="1.2"/>
  </g>

  <path d="M6 320 C 14 272 34 248 60 236 C 78 227 88 216 92 204 L 148 204 C 152 218 166 228 184 236 C 210 248 228 272 236 320 Z" fill="url(#tvRobe)" stroke="#241a12" stroke-width="3"/>
  <path d="M148 206 C 153 219 166 229 184 237 C 209 248 226 272 234 318 L 170 318 C 173 272 163 240 150 224 Z" fill="#382c22" opacity="0.75"/>
  <path d="M60 237 C 78 228 88 217 92 205 L 104 205 C 96 227 84 239 66 249 C 46 261 33 285 27 318 L 10 318 C 17 275 36 249 60 237 Z" fill="#7d6a52" opacity="0.6"/>

  <path d="M100 203 L 120 236 L 140 202 Z" fill="#cfc0a0" stroke="#241a12" stroke-width="2"/>
  <path d="M141 203 C 133 226 121 244 103 258 L 92 242 C 110 230 124 218 130 203 Z" fill="#6a5a46" stroke="#241a12" stroke-width="2.2"/>
  <path d="M137 203 C 129 224 118 240 102 252" stroke="#d9cdb4" stroke-width="3.6" fill="none"/>
  <path d="M97 203 C 108 228 128 250 156 266 L 146 284 C 116 264 96 238 87 209 Z" fill="#54453a" stroke="#241a12" stroke-width="2.2"/>
  <path d="M100 205 C 111 229 130 250 152 264" stroke="#e4d9bd" stroke-width="3.6" fill="none"/>

  <path d="M64 240 C 96 264 128 288 158 318" stroke="#33261a" stroke-width="10" fill="none"/>
  <path d="M66 242 C 96 265 126 288 154 314" stroke="#5c4630" stroke-width="3" fill="none" opacity="0.8"/>

  <g transform="rotate(9 178 284)">
    <rect x="162" y="270" width="32" height="28" fill="#75634d" stroke="#241a12" stroke-width="1.6"/>
    <rect x="162" y="270" width="32" height="28" fill="none" stroke="#c9b892" stroke-width="1.2" stroke-dasharray="4 3"/>
  </g>
  <g transform="rotate(-7 52 300)">
    <rect x="40" y="290" width="24" height="22" fill="#4c3e30" stroke="#241a12" stroke-width="1.5"/>
    <rect x="40" y="290" width="24" height="22" fill="none" stroke="#b3a37e" stroke-width="1.1" stroke-dasharray="3 3"/>
  </g>
  <path d="M148 210 l6 -4 4 6 6 -5 4 6 6 -4" stroke="#8d795e" stroke-width="1.4" fill="none" opacity="0.8"/>

  <path d="M76 126 L 48 320" stroke="#2e2214" stroke-width="10" stroke-linecap="round"/>
  <path d="M76 126 L 48 320" stroke="#c2a05e" stroke-width="6.4" stroke-linecap="round"/>
  <path d="M74.5 130 L 49 314" stroke="#e0c584" stroke-width="1.8" opacity="0.8"/>
  <g fill="#8a6c3a" stroke="#5c4622" stroke-width="0.8">
    <ellipse cx="71.3" cy="160" rx="4.6" ry="1.7" transform="rotate(-8 71.3 160)"/>
    <ellipse cx="65.5" cy="200" rx="4.6" ry="1.7" transform="rotate(-8 65.5 200)"/>
    <ellipse cx="59.7" cy="240" rx="4.6" ry="1.7" transform="rotate(-8 59.7 240)"/>
    <ellipse cx="53.7" cy="282" rx="4.6" ry="1.7" transform="rotate(-8 53.7 282)"/>
  </g>

  <path d="M28 320 C 28 290 36 268 52 258 L 80 266 C 70 288 66 302 64 320 Z" fill="#5a4a3a" stroke="#241a12" stroke-width="3"/>
  <path d="M30 316 C 32 292 40 272 52 262" stroke="#7d6a52" stroke-width="2.4" fill="none" opacity="0.7"/>
  <path d="M50 259 l5 6 5 -6 5 6 5 -6 5 6 5 -5" stroke="#7d6a52" stroke-width="1.4" fill="none" opacity="0.9"/>

  <ellipse cx="58" cy="250" rx="11" ry="13.5" fill="#c2946a" stroke="#241a12" stroke-width="2.2"/>
  <path d="M49 242 q9 -3 17 1 M49 249 q9 -3 18 1 M50 257 q8 -3 16 1" stroke="#8a6448" stroke-width="1.5" fill="none"/>
  <ellipse cx="66" cy="245" rx="4" ry="6" fill="#c99b6e" stroke="#241a12" stroke-width="1.6" transform="rotate(18 66 245)"/>

  <path d="M104 174 L 103 206 C 113 216 128 216 136 204 L 134 172 C 127 181 114 182 104 174 Z" fill="#b98a5e" stroke="#241a12" stroke-width="2"/>
  <path d="M104 174 C 114 182 127 181 134 172 L 135 190 C 122 197 110 195 104 187 Z" fill="#7c5638" opacity="0.85"/>

  <path d="M88 100 C 84 126 85 150 93 164 C 99 174 105 180 113 182 C 126 181 139 170 145 156 C 151 142 153 120 150 100 Z" fill="url(#tvSkin)" stroke="#241a12" stroke-width="2.5"/>
  <path d="M145 156 C 139 170 126 181 113 182 C 127 176 137 166 141 152 C 145 138 147 118 146 102 L 150 100 C 153 120 151 142 145 156 Z" fill="#8a6040" opacity="0.55"/>
  <path d="M95 148 C 99 157 104 163 110 167" stroke="#9a7048" stroke-width="1.5" fill="none" opacity="0.65"/>
  <path d="M141 146 C 137 155 132 161 126 166" stroke="#8a6040" stroke-width="1.4" fill="none" opacity="0.6"/>

  <path d="M87 106 L 151 104 L 149 132 C 145 139 134 143 118 143 C 103 143 92 139 88 132 Z" fill="#453222" opacity="0.82"/>

  <path d="M90 121 L 110 116" stroke="#120b05" stroke-width="2.6" fill="none"/>
  <path d="M122 116 L 144 119" stroke="#120b05" stroke-width="2.6" fill="none"/>
  <path d="M90 119 L 110 114" stroke="#6a4c2e" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M122 114 L 144 117" stroke="#6a4c2e" stroke-width="1" fill="none" opacity="0.7"/>

  <ellipse cx="100" cy="129" rx="8.5" ry="5" fill="#ffb84d" opacity="0.18"/>
  <ellipse cx="133" cy="128" rx="9" ry="5" fill="#ffb84d" opacity="0.18"/>
  <path d="M92 129 L 108 125.5 L 106.5 132 L 94 132.5 Z" fill="#f4e8d0"/>
  <path d="M124 127.5 L 142 125.5 L 141 132 L 126 132.5 Z" fill="#f4e8d0"/>
  <circle cx="101" cy="128.8" r="3" fill="#e8a83c"/>
  <circle cx="101" cy="128.8" r="1.4" fill="#1a1008"/>
  <circle cx="99.9" cy="127.6" r="0.8" fill="#ffffff"/>
  <circle cx="133.5" cy="128.6" r="3.2" fill="#e8a83c"/>
  <circle cx="133.5" cy="128.6" r="1.5" fill="#1a1008"/>
  <circle cx="132.3" cy="127.3" r="0.8" fill="#ffffff"/>
  <path d="M91 127 L 109 123.5" stroke="#150d06" stroke-width="2.2" fill="none"/>
  <path d="M123 125.5 L 143 123.8" stroke="#150d06" stroke-width="2.2" fill="none"/>
  <path d="M94 133 L 106 132.6" stroke="#3a281a" stroke-width="1.2" fill="none" opacity="0.8"/>
  <path d="M126 133 L 140 132.4" stroke="#3a281a" stroke-width="1.2" fill="none" opacity="0.8"/>

  <path d="M117 132 C 113 140 110 147 107 152 C 105 156 107 159 111 159" stroke="#7a5432" stroke-width="2" fill="none"/>
  <path d="M111 159 C 114 160 118 160 121 158" stroke="#8a6040" stroke-width="1.5" fill="none"/>
  <path d="M119 134 C 116 141 113 148 111 152" stroke="#e8c49a" stroke-width="1.2" fill="none" opacity="0.7"/>

  <path d="M100 165 C 106 169 118 169 125 164 L 125 167 C 117 172 106 172 100 168 Z" fill="#3a281a" opacity="0.32"/>
  <path d="M99 167 C 106 170 116 170 124 166" stroke="#5a3018" stroke-width="2.4" fill="none"/>
  <path d="M104 173 C 110 175 118 174 122 171" stroke="#9a6a42" stroke-width="1.4" fill="none" opacity="0.7"/>

  <g stroke="#4a3420" stroke-width="1" opacity="0.55">
    <path d="M100 174 l2 3 M106 177 l1 3 M112 179 l1 3 M118 177 l2 3 M124 173 l2 2 M129 169 l2 2 M96 168 l2 3 M133 163 l2 2"/>
    <path d="M102 160 l2 2 M120 159 l2 2"/>
  </g>

  <path d="M112 26 C 84 38 52 82 34 106 C 62 116 88 120 116 120 C 146 120 174 110 198 98 C 176 76 140 40 112 26 Z" fill="url(#tvHat)" stroke="#241a12" stroke-width="3"/>
  <path d="M112 30 C 96 38 78 58 64 80 C 84 63 100 46 114 34 Z" fill="#ecd196" opacity="0.55"/>
  <path d="M34 106 C 62 116 88 120 116 120 C 146 120 174 110 198 98 C 174 107 146 113 116 113 C 86 113 60 111 34 106 Z" fill="#6a4e2c" opacity="0.75"/>
  <g stroke="#8a6a3c" stroke-width="1.2" opacity="0.6">
    <path d="M110 34 L 48 103 M111 34 L 66 111 M112 34 L 86 116 M113 34 L 106 118 M114 34 L 126 118 M115 34 L 146 114 M116 34 L 166 108 M115 33 L 186 100"/>
  </g>
  <path d="M74 78 C 96 89 132 89 154 76" stroke="#8a6a3c" stroke-width="1.3" fill="none" opacity="0.55"/>
  <path d="M56 95 C 88 107 142 107 178 92" stroke="#8a6a3c" stroke-width="1.3" fill="none" opacity="0.55"/>
  <circle cx="112" cy="28" r="3.6" fill="#7a5c32" stroke="#241a12" stroke-width="1.6"/>

  <path d="M72 116 C 76 148 90 172 108 187" stroke="#7a4032" stroke-width="2.4" fill="none"/>
  <path d="M158 111 C 151 140 139 168 119 186" stroke="#7a4032" stroke-width="2.4" fill="none"/>
  <circle cx="114" cy="188" r="3" fill="#7a4032" stroke="#241a12" stroke-width="1"/>
  <path d="M112 190 L 110 200 M116 190 L 118 199" stroke="#7a4032" stroke-width="1.8" fill="none"/>

  <rect width="240" height="320" fill="url(#tvVig)"/>
</svg>`;
