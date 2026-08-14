export default `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <defs>
    <linearGradient id="dg_bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5a4718"/>
      <stop offset="1" stop-color="#1c1608"/>
    </linearGradient>
    <radialGradient id="dg_glow" cx="0.5" cy="0.32" r="0.6">
      <stop offset="0" stop-color="#ffe6a0" stop-opacity="0.6"/>
      <stop offset="0.55" stop-color="#d9b054" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#d9b054" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="dg_wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9a26a"/>
      <stop offset="0.55" stop-color="#8a6636"/>
      <stop offset="1" stop-color="#4a3218"/>
    </linearGradient>
    <linearGradient id="dg_bronze" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0d890"/>
      <stop offset="0.5" stop-color="#c9a052"/>
      <stop offset="1" stop-color="#6b4e1c"/>
    </linearGradient>
    <linearGradient id="dg_fur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a89478"/>
      <stop offset="0.5" stop-color="#6b5540"/>
      <stop offset="1" stop-color="#362718"/>
    </linearGradient>
    <linearGradient id="dg_tunic" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a5a34"/>
      <stop offset="1" stop-color="#3c2a14"/>
    </linearGradient>
    <clipPath id="dg_fc">
      <path d="M 87 92 C 87 70 99 56 117 56 C 136 56 149 70 149 94 C 149 114 144 132 134 144 C 127 152 111 153 103 145 C 93 135 87 112 87 92 Z"/>
    </clipPath>
    <clipPath id="dg_pc">
      <path d="M 60 198 C 48 202 42 216 44 234 C 46 254 52 272 62 286 L 84 284 C 78 264 74 246 76 228 C 78 214 84 204 96 198 C 86 194 70 194 60 198 Z"/>
    </clipPath>
  </defs>

  <rect width="240" height="320" fill="url(#dg_bg)"/>
  <rect width="240" height="320" fill="url(#dg_glow)"/>

  <g opacity="0.13" stroke="#f0d9a0" fill="none">
    <path d="M 46 74 C 68 42 172 42 194 74" stroke-width="2"/>
    <g stroke-width="2">
      <line x1="120" y1="24" x2="120" y2="10"/>
      <line x1="80" y1="34" x2="72" y2="22"/>
      <line x1="160" y1="34" x2="168" y2="22"/>
    </g>
  </g>

  <g opacity="0.14" stroke="#f0d9a0" fill="#f0d9a0" stroke-width="2">
    <g transform="translate(26,308) rotate(-14)">
      <path d="M0,0 L4,-96" fill="none"/>
      <path d="M1,-18 L-20,-30" fill="none"/>
      <ellipse cx="-24" cy="-33" rx="8" ry="4" transform="rotate(-30 -24 -33)"/>
      <path d="M2,-40 L24,-52" fill="none"/>
      <ellipse cx="28" cy="-55" rx="8" ry="4" transform="rotate(30 28 -55)"/>
      <path d="M3,-62 L-18,-74" fill="none"/>
      <ellipse cx="-22" cy="-77" rx="7" ry="3.5" transform="rotate(-30 -22 -77)"/>
    </g>
    <g transform="translate(214,308) rotate(14) scale(-1,1)">
      <path d="M0,0 L4,-96" fill="none"/>
      <path d="M1,-18 L-20,-30" fill="none"/>
      <ellipse cx="-24" cy="-33" rx="8" ry="4" transform="rotate(-30 -24 -33)"/>
      <path d="M2,-40 L24,-52" fill="none"/>
      <ellipse cx="28" cy="-55" rx="8" ry="4" transform="rotate(30 28 -55)"/>
      <path d="M3,-62 L-18,-74" fill="none"/>
      <ellipse cx="-22" cy="-77" rx="7" ry="3.5" transform="rotate(-30 -22 -77)"/>
    </g>
  </g>

  <path d="M 16 320 C 18 274 30 244 58 228 C 74 219 92 210 100 202 L 100 190 L 136 190 C 144 210 164 219 180 228 C 208 244 220 274 224 320 Z"
        fill="url(#dg_tunic)" stroke="#2a1c0c" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 16 320 C 18 274 30 244 58 228 C 66 223 74 219 82 215 C 64 234 50 264 46 320 Z" fill="#2c1e10" opacity="0.75"/>
  <path d="M 224 320 C 220 274 208 244 180 228 C 174 224 168 221 162 218 C 180 236 192 266 196 320 Z" fill="#8a6a40" opacity="0.55"/>
  <g stroke="#2c1c0e" stroke-width="1.4" fill="none" opacity="0.6">
    <path d="M 108 216 C 105 250 104 284 105 318"/>
    <path d="M 150 214 C 154 248 156 284 157 318"/>
    <path d="M 130 212 C 130 246 131 282 132 318"/>
  </g>

  <path d="M 68 206 C 78 188 98 178 120 178 C 142 178 162 188 172 206 C 160 216 146 222 132 224 L 120 214 L 108 224 C 94 222 80 216 68 206 Z"
        fill="url(#dg_fur)" stroke="#221810" stroke-width="1.6" stroke-linejoin="round"/>
  <g stroke="#241a10" stroke-width="1.1" fill="none" opacity="0.7">
    <path d="M 78 198 C 82 205 86 211 92 216"/>
    <path d="M 92 190 C 96 198 100 206 106 213"/>
    <path d="M 148 190 C 144 198 140 206 134 213"/>
    <path d="M 162 198 C 158 205 154 211 148 216"/>
  </g>

  <g>
    <path d="M 152.8 262.2 L 90 205 L 147.2 267.8 Z" fill="url(#dg_bronze)" stroke="#2a1c0c" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M 150 265 L 92 207" stroke="#f8ecc4" stroke-width="1" opacity="0.7"/>
    <line x1="159" y1="256" x2="141" y2="274" stroke="#4a3814" stroke-width="6" stroke-linecap="round"/>
    <line x1="159" y1="256" x2="141" y2="274" stroke="#8a6a2a" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="150" y1="265" x2="167" y2="282" stroke="#3c2a14" stroke-width="9" stroke-linecap="round"/>
    <g stroke="#1c130a" stroke-width="1" opacity="0.8">
      <line x1="154" y1="269" x2="159" y2="264"/>
      <line x1="158" y1="273" x2="163" y2="268"/>
      <line x1="162" y1="277" x2="167" y2="272"/>
    </g>
    <circle cx="171" cy="286" r="7" fill="url(#dg_bronze)" stroke="#2a1c0c" stroke-width="1.4"/>
  </g>

  <path d="M 104 152 L 104 200 C 110 206 128 206 134 200 L 134 148 C 126 158 112 158 104 152 Z"
        fill="#e8b183" stroke="#2a1c0c" stroke-width="1.5"/>
  <path d="M 104 152 L 104 182 C 114 189 126 188 134 179 L 134 148 C 126 158 112 158 104 152 Z" fill="#bd8050"/>
  <path d="M 108 200 Q 118 209 130 200" stroke="#2c1c0e" stroke-width="1.5" fill="none"/>
  <circle cx="118" cy="210" r="3.6" fill="url(#dg_bronze)" stroke="#2a1c0c" stroke-width="1"/>

  <g>
    <path d="M 60 198 C 48 202 42 216 44 234 C 46 254 52 272 62 286 L 84 284 C 78 264 74 246 76 228 C 78 214 84 204 96 198 C 86 194 70 194 60 198 Z"
          fill="url(#dg_fur)" stroke="#221810" stroke-width="1.6" stroke-linejoin="round"/>
    <g clip-path="url(#dg_pc)" stroke="#241a10" stroke-width="1.3" fill="none" opacity="0.85">
      <path d="M 50 210 C 56 214 60 220 62 228"/>
      <path d="M 48 226 C 55 230 60 236 63 244"/>
      <path d="M 47 244 C 54 248 59 254 62 262"/>
      <path d="M 50 262 C 57 266 62 272 66 278"/>
      <path d="M 66 206 C 70 214 72 222 73 230"/>
      <path d="M 70 224 C 73 234 74 244 74 254"/>
    </g>
    <g clip-path="url(#dg_pc)" fill="#c9b896" opacity="0.5">
      <path d="M 46 220 C 50 222 53 226 54 231 C 50 229 46 226 44 222 Z"/>
      <path d="M 48 252 C 52 254 56 259 57 264 C 52 262 48 258 46 253 Z"/>
    </g>
    <path d="M 62 282 C 58 288 56 294 58 300 L 66 300 C 65 294 66 288 68 283 Z" fill="#5a4632" stroke="#221810" stroke-width="1.3"/>
    <g stroke="#1a120a" stroke-width="1.4" stroke-linecap="round">
      <line x1="59" y1="299" x2="57" y2="306"/>
      <line x1="63" y1="300" x2="62" y2="307"/>
      <line x1="67" y1="299" x2="67" y2="306"/>
    </g>
  </g>
  <g>
    <ellipse cx="65" cy="203" rx="15" ry="13" fill="url(#dg_fur)" stroke="#221810" stroke-width="1.6"/>
    <circle cx="55" cy="192" r="6.5" fill="url(#dg_fur)" stroke="#221810" stroke-width="1.4"/>
    <circle cx="75" cy="190" r="6.5" fill="url(#dg_fur)" stroke="#221810" stroke-width="1.4"/>
    <circle cx="55" cy="193" r="3" fill="#4a3a28"/>
    <circle cx="75" cy="191" r="3" fill="#4a3a28"/>
    <path d="M 50 205 C 40 207 33 213 34 220 C 38 223 46 220 52 212 Z" fill="#8a7358" stroke="#221810" stroke-width="1.3"/>
    <path d="M 56 210 C 54 213 54 216 56 218" stroke="#150e08" stroke-width="1.2" fill="none"/>
    <circle cx="35" cy="219" r="1.8" fill="#150e08"/>
  </g>

  <path d="M 87 92 C 87 70 99 56 117 56 C 136 56 149 70 149 94 C 149 114 144 132 134 144 C 127 152 111 153 103 145 C 93 135 87 112 87 92 Z"
        fill="#e8b183" stroke="#2a1c0c" stroke-width="1.8"/>
  <g clip-path="url(#dg_fc)">
    <path d="M 80 56 L 101 56 C 95 84 96 122 106 152 L 80 152 Z" fill="#c4854f" opacity="0.5"/>
    <ellipse cx="131" cy="90" rx="20" ry="24" fill="#f6d4a6" opacity="0.45"/>
    <path d="M 100 128 C 106 138 118 140 130 130 C 124 138 112 140 103 134 Z" fill="#c4854f" opacity="0.3"/>
  </g>

  <path d="M 148 94 C 156 89 159 100 153 111 C 150 117 146 116 145 109 Z" fill="#e8b183" stroke="#2a1c0c" stroke-width="1.4"/>
  <path d="M 150 96 C 153 97 153 104 150 108" fill="none" stroke="#9c6136" stroke-width="1.2"/>
  <circle cx="150" cy="101" r="2.6" fill="none" stroke="url(#dg_bronze)" stroke-width="1.6"/>

  <path d="M 86 82 C 88 92 90 100 93 106 C 88 100 85 92 84 84 Z" fill="#1a130c"/>
  <path d="M 150 84 C 148 92 146 98 143 104 C 148 99 150 92 151 84 Z" fill="#1a130c"/>

  <path d="M 91 91 C 97 83 105 81 111 85 L 110 88 C 104 85 97 87 93 91 Z" fill="#241a10"/>
  <path d="M 122 85 C 129 80 137 80 142 86 L 140 89 C 134 84 127 84 123 89 Z" fill="#241a10"/>

  <path d="M 93 97 C 97 94 103 94 107 96 C 104 100 96 100 93 97 Z" fill="#f4ece0"/>
  <circle cx="101" cy="97" r="2.6" fill="#2c1a0c"/>
  <circle cx="101" cy="97" r="1.2" fill="#000"/>
  <circle cx="100" cy="96" r="0.7" fill="#fff"/>
  <path d="M 93 96.5 C 97 93 103 93 107 95.5" fill="none" stroke="#120b05" stroke-width="2" stroke-linecap="round"/>
  <path d="M 94 100 C 98 101.5 103 101 106 99" fill="none" stroke="#c4854f" stroke-width="1"/>

  <path d="M 120 97 C 125 93.5 133 93.5 138 96 C 134 100.5 124 100.5 120 97 Z" fill="#f4ece0"/>
  <circle cx="129" cy="96.5" r="3" fill="#2c1a0c"/>
  <circle cx="129" cy="96.5" r="1.4" fill="#000"/>
  <circle cx="128" cy="95.5" r="0.8" fill="#fff"/>
  <path d="M 120 96.5 C 125 92.5 133 92.5 138 95.5" fill="none" stroke="#120b05" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M 122 100.5 C 127 102 133 101.5 137 99" fill="none" stroke="#c4854f" stroke-width="1"/>

  <path d="M 111 91 C 109 100 107 108 106 114 C 106 118 108 121 112 120" fill="none" stroke="#9c6136" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 105 117 C 103.5 119.5 105 121.5 108 121" fill="none" stroke="#9c6136" stroke-width="1.4"/>
  <path d="M 109 96 C 106 104 104.5 111 104.5 115 L 108 117 C 106.5 111 108 102 111 95 Z" fill="#c4854f" opacity="0.45"/>
  <path d="M 112.5 95 C 111.5 102 110.5 108 110.5 112" fill="none" stroke="#f6d4a6" stroke-width="1.8" opacity="0.7"/>

  <path d="M 103 135 C 109 133 116 133 121 135" fill="none" stroke="#5c2f1c" stroke-width="2" stroke-linecap="round"/>
  <path d="M 106 138.5 C 111 140 117 140 121 138.5" fill="none" stroke="#c4854f" stroke-width="1.4" opacity="0.85"/>

  <path d="M 83 102 C 80 72 96 46 118 46 C 140 46 156 72 153 102 C 151 84 144 68 133 60 C 137 70 137 80 133 88 C 126 74 118 66 108 64 C 112 72 112 80 108 87 C 100 76 92 72 84 75 C 87 84 87 93 83 102 Z"
        fill="#1a130c" stroke="#0f0a05" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M 87 82 C 89 92 90 100 92 106" fill="none" stroke="#3a2c1c" stroke-width="1.6"/>
  <path d="M 150 80 C 148 90 147 98 145 104" fill="none" stroke="#3a2c1c" stroke-width="1.6"/>

  <path d="M 84 71 C 100 63 136 63 152 71 L 152 78 C 136 71 100 71 84 78 Z"
        fill="url(#dg_wood)" stroke="#2a1c0c" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M 84 71 C 100 63 136 63 152 71 L 152 74 C 136 66 100 66 84 74 Z" fill="#e0bd80" opacity="0.7"/>

  <g stroke="#4a3218" stroke-width="1">
    <circle cx="98" cy="74.5" r="2.6" fill="#e0bd80"/>
    <circle cx="138" cy="74.5" r="2.6" fill="#e0bd80"/>
    <circle cx="98" cy="75" r="0.8" fill="#4a3218" stroke="none"/>
    <circle cx="138" cy="75" r="0.8" fill="#4a3218" stroke="none"/>
  </g>
  <circle cx="118" cy="66" r="4" fill="url(#dg_bronze)" stroke="#2a1c0c" stroke-width="1.2"/>

  <g stroke="#4a3218" stroke-width="2.2" fill="none" stroke-linecap="round">
    <path d="M 118 58 L 118 10"/>
    <path d="M 118 42 L 106 32"/>
    <path d="M 118 42 L 130 32"/>
    <path d="M 118 25 L 108 17"/>
    <path d="M 118 25 L 128 17"/>
  </g>
  <g fill="#e8c065" stroke="#4a3218" stroke-width="1">
    <circle cx="106" cy="32" r="3"/>
    <circle cx="130" cy="32" r="3"/>
    <circle cx="108" cy="17" r="2.6"/>
    <circle cx="128" cy="17" r="2.6"/>
    <circle cx="118" cy="9" r="3.2"/>
  </g>

  <g stroke="#4a3218" stroke-width="2" fill="none" stroke-linecap="round">
    <path d="M 98 60 C 90 46 82 30 76 12"/>
    <path d="M 90 40 L 78 34"/>
    <path d="M 82 22 L 70 18"/>
  </g>
  <g fill="#e8c065" stroke="#4a3218" stroke-width="1">
    <circle cx="78" cy="34" r="2.6"/>
    <circle cx="70" cy="18" r="2.4"/>
    <circle cx="76" cy="12" r="2.8"/>
  </g>

  <g stroke="#4a3218" stroke-width="2" fill="none" stroke-linecap="round">
    <path d="M 138 60 C 146 46 154 30 160 12"/>
    <path d="M 146 40 L 158 34"/>
    <path d="M 154 22 L 166 18"/>
  </g>
  <g fill="#e8c065" stroke="#4a3218" stroke-width="1">
    <circle cx="158" cy="34" r="2.6"/>
    <circle cx="166" cy="18" r="2.4"/>
    <circle cx="160" cy="12" r="2.8"/>
  </g>
</svg>`;
