export default `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <defs>
    <linearGradient id="un_bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a4460"/>
      <stop offset="0.55" stop-color="#3c1f2c"/>
      <stop offset="1" stop-color="#160a10"/>
    </linearGradient>
    <radialGradient id="un_glow" cx="0.5" cy="0.32" r="0.6">
      <stop offset="0" stop-color="#ffd0e0" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="#8a4a6a" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#8a4a6a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="un_skin" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="#f0c69a"/>
      <stop offset="0.5" stop-color="#cf9868"/>
      <stop offset="1" stop-color="#96603c"/>
    </linearGradient>
    <linearGradient id="un_robe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6e4630"/>
      <stop offset="0.55" stop-color="#4a2d1e"/>
      <stop offset="1" stop-color="#24140c"/>
    </linearGradient>
    <linearGradient id="un_hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#453530"/>
      <stop offset="0.5" stop-color="#1e1616"/>
      <stop offset="1" stop-color="#0a0707"/>
    </linearGradient>
    <linearGradient id="un_bone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4e9c8"/>
      <stop offset="0.55" stop-color="#c7a878"/>
      <stop offset="1" stop-color="#6e4f2c"/>
    </linearGradient>
    <radialGradient id="un_vin" cx="0.5" cy="0.4" r="0.75">
      <stop offset="0" stop-color="#0a0508" stop-opacity="0"/>
      <stop offset="0.72" stop-color="#0a0508" stop-opacity="0"/>
      <stop offset="1" stop-color="#0a0508" stop-opacity="0.55"/>
    </radialGradient>
    <clipPath id="un_fc">
      <path d="M 86 94 C 86 70 99 55 119 55 C 139 55 152 71 152 96 C 152 116 147 134 137 147 C 129 156 109 156 100 147 C 90 136 86 114 86 94 Z"/>
    </clipPath>
  </defs>

  <rect width="240" height="320" fill="url(#un_bg)"/>
  <ellipse cx="120" cy="104" rx="112" ry="104" fill="url(#un_glow)"/>

  <g opacity="0.15" stroke="#ffd0e0" fill="none">
    <circle cx="120" cy="104" r="86" stroke-width="2.5"/>
    <circle cx="120" cy="104" r="74" stroke-width="1.2"/>
  </g>

  <g opacity="0.14" fill="#5c6b3a">
    <g transform="translate(26,36) rotate(-12)">
      <path d="M0 40 C -2 24 2 10 0 0 C 6 10 8 22 6 34 Z"/>
      <path d="M0 30 C -10 26 -16 16 -16 6 C -8 10 -2 18 0 26 Z"/>
      <path d="M0 30 C 10 26 16 16 16 6 C 8 10 2 18 0 26 Z"/>
      <path d="M0 18 C -8 15 -12 8 -12 0 C -6 4 -2 10 0 16 Z"/>
      <path d="M0 18 C 8 15 12 8 12 0 C 6 4 2 10 0 16 Z"/>
    </g>
    <g transform="translate(214,48) rotate(14) scale(0.85)">
      <path d="M0 40 C -2 24 2 10 0 0 C 6 10 8 22 6 34 Z"/>
      <path d="M0 30 C -10 26 -16 16 -16 6 C -8 10 -2 18 0 26 Z"/>
      <path d="M0 30 C 10 26 16 16 16 6 C 8 10 2 18 0 26 Z"/>
    </g>
  </g>

  <g opacity="0.13" fill="#c98f5e">
    <g transform="translate(24,120) rotate(-10)">
      <ellipse cx="0" cy="0" rx="8" ry="6"/>
      <circle cx="-8" cy="-9" r="2.6"/>
      <circle cx="-2.5" cy="-12" r="2.8"/>
      <circle cx="3.5" cy="-12" r="2.8"/>
      <circle cx="9" cy="-9" r="2.6"/>
    </g>
    <g transform="translate(40,168) rotate(8) scale(0.8)">
      <ellipse cx="0" cy="0" rx="8" ry="6"/>
      <circle cx="-8" cy="-9" r="2.6"/>
      <circle cx="-2.5" cy="-12" r="2.8"/>
      <circle cx="3.5" cy="-12" r="2.8"/>
      <circle cx="9" cy="-9" r="2.6"/>
    </g>
    <g transform="translate(216,132) rotate(10) scale(0.9)">
      <ellipse cx="0" cy="0" rx="8" ry="6"/>
      <circle cx="-8" cy="-9" r="2.6"/>
      <circle cx="-2.5" cy="-12" r="2.8"/>
      <circle cx="3.5" cy="-12" r="2.8"/>
      <circle cx="9" cy="-9" r="2.6"/>
    </g>
    <g transform="translate(200,178) rotate(-6) scale(0.8)">
      <ellipse cx="0" cy="0" rx="8" ry="6"/>
      <circle cx="-8" cy="-9" r="2.6"/>
      <circle cx="-2.5" cy="-12" r="2.8"/>
      <circle cx="3.5" cy="-12" r="2.8"/>
      <circle cx="9" cy="-9" r="2.6"/>
    </g>
  </g>

  <path d="M 14 320 C 16 268 32 234 62 212 C 78 202 96 190 104 176 L 104 172 L 134 172 C 142 190 158 202 176 212 C 208 234 224 268 226 320 Z"
        fill="url(#un_robe)" stroke="#160a06" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 14 320 C 16 270 32 236 62 214 C 70 208 78 203 86 198 C 68 218 54 252 48 320 Z" fill="#7a5138" opacity="0.55"/>
  <path d="M 226 320 C 224 270 208 236 178 214 C 172 209 166 205 160 200 C 178 220 192 254 198 320 Z" fill="#0e0704" opacity="0.6"/>
  <g stroke="#1c1008" stroke-width="1.6" fill="none" opacity="0.7">
    <path d="M 66 240 C 62 264 59 292 59 318"/>
    <path d="M 176 236 C 182 260 186 290 187 318"/>
    <path d="M 86 222 C 82 250 80 286 80 318"/>
    <path d="M 156 220 C 160 246 163 282 164 318"/>
  </g>

  <path d="M 132 172 L 148 180 L 108 278 L 90 270 Z" fill="#3a2417" stroke="#160a06" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M 106 172 L 90 180 L 130 280 L 148 272 Z" fill="#5a3a26" stroke="#160a06" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M 134 175 L 146 180 L 118 240 L 108 236 Z" fill="#24140c" opacity="0.5"/>
  <g stroke="#e9ddc4" stroke-width="1.8" fill="none" opacity="0.85">
    <path d="M 130 173 L 145 180"/>
    <path d="M 108 173 L 93 180"/>
  </g>

  <path d="M 106 147 L 104 176 C 111 182 127 182 134 176 L 132 147 C 125 156 113 156 106 147 Z" fill="url(#un_skin)" stroke="#160a06" stroke-width="1.8"/>
  <path d="M 108 149 L 107 173" stroke="#8a5a38" stroke-width="1.6" opacity="0.5"/>

  <g opacity="0.9" transform="translate(92,184) rotate(-18)">
    <path d="M0 26 C -1 16 1 7 0 0 C 4 7 5 15 4 22 Z" fill="#5c6b3a" stroke="#33421f" stroke-width="0.6"/>
    <path d="M0 18 C -6 15 -9 9 -9 3 C -5 6 -1 11 0 15 Z" fill="#66794a" stroke="#33421f" stroke-width="0.6"/>
    <path d="M0 18 C 6 15 9 9 9 3 C 5 6 1 11 0 15 Z" fill="#556638" stroke="#33421f" stroke-width="0.6"/>
  </g>

  <path d="M 96 182 Q 119 200 141 182" stroke="#241408" stroke-width="2.2" fill="none"/>
  <g stroke="#140a06" stroke-width="1.3" fill="url(#un_bone)">
    <g transform="translate(104,187) scale(0.5)">
      <ellipse cx="0" cy="0" rx="8" ry="6"/>
      <circle cx="-8" cy="-9" r="2.6"/>
      <circle cx="-2.5" cy="-12" r="2.8"/>
      <circle cx="3.5" cy="-12" r="2.8"/>
      <circle cx="9" cy="-9" r="2.6"/>
    </g>
    <g transform="translate(134,187) scale(0.5)">
      <ellipse cx="0" cy="0" rx="8" ry="6"/>
      <circle cx="-8" cy="-9" r="2.6"/>
      <circle cx="-2.5" cy="-12" r="2.8"/>
      <circle cx="3.5" cy="-12" r="2.8"/>
      <circle cx="9" cy="-9" r="2.6"/>
    </g>
  </g>
  <g stroke="#140a06" stroke-width="2" fill="url(#un_bone)">
    <g transform="translate(119,201) scale(1.15)">
      <ellipse cx="0" cy="0" rx="10.5" ry="7.5"/>
      <circle cx="-10" cy="-11" r="3.4"/>
      <circle cx="-3.2" cy="-15" r="3.6"/>
      <circle cx="4.2" cy="-15" r="3.6"/>
      <circle cx="11" cy="-11" r="3.4"/>
    </g>
  </g>
  <g transform="translate(119,201) scale(1.15)" fill="#6e4f2c" opacity="0.6" stroke="none">
    <circle cx="-10" cy="-11" r="1.3"/>
    <circle cx="-3.2" cy="-15" r="1.4"/>
    <circle cx="4.2" cy="-15" r="1.4"/>
    <circle cx="11" cy="-11" r="1.3"/>
  </g>
  <circle cx="119" cy="202" r="2.3" fill="#4a361c" opacity="0.75"/>

  <g>
    <path d="M 121 222 C 128 242 128 266 122 290 C 120 294 116 294 115 289 C 112 266 113 242 118 222 Z" fill="#8a4a6a" stroke="#3a1c2c" stroke-width="1.3"/>
    <path d="M 121 222 C 116 244 116 268 120 292 C 122 296 126 295 126 290 C 127 266 126 242 124 222 Z" fill="#6a3450" stroke="#3a1c2c" stroke-width="1.3"/>
    <path d="M 119 218 C 106 214 97 220 99 229 C 101 236 113 234 119 224 Z" fill="#9a5878" stroke="#3a1c2c" stroke-width="1.3"/>
    <path d="M 119 218 C 132 214 141 220 139 229 C 137 236 125 234 119 224 Z" fill="#7a3e5e" stroke="#3a1c2c" stroke-width="1.3"/>
    <circle cx="119" cy="220" r="4.2" fill="#5a2c46" stroke="#3a1c2c" stroke-width="1"/>
  </g>

  <path d="M 86 94 C 86 70 99 55 119 55 C 139 55 152 71 152 96 C 152 116 147 134 137 147 C 129 156 109 156 100 147 C 90 136 86 114 86 94 Z"
        fill="url(#un_skin)" stroke="#160a06" stroke-width="2"/>
  <g clip-path="url(#un_fc)">
    <path d="M 86 55 L 104 55 C 96 82 97 120 108 150 L 84 150 Z" fill="#96603c" opacity="0.45"/>
    <ellipse cx="133" cy="90" rx="20" ry="26" fill="#f7dcb6" opacity="0.4"/>
    <path d="M 95 106 C 98 114 103 118 108 119 L 107 124 C 100 122 95 116 91 108 Z" fill="#96603c" opacity="0.35"/>
    <path d="M 122 108 C 128 114 134 116 140 115 L 140 120 C 132 121 125 117 120 111 Z" fill="#96603c" opacity="0.3"/>
    <path d="M 90 130 C 92 138 96 144 101 148 L 97 152 C 91 147 87 140 85 132 Z" fill="#7a4a2c" opacity="0.4"/>
  </g>

  <path d="M 150 96 C 158 91 161 102 155 113 C 152 119 148 118 147 111 Z" fill="url(#un_skin)" stroke="#160a06" stroke-width="1.3"/>
  <path d="M 152 98 C 155 99 155 106 152 110" fill="none" stroke="#8a5a38" stroke-width="1.1"/>

  <path d="M 92 102 C 99 96 111 95 116 99" fill="none" stroke="#160c08" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M 122 99 C 128 95 138 96 143 101" fill="none" stroke="#160c08" stroke-width="3" stroke-linecap="round"/>

  <path d="M 94 116 C 98 111 110 111 115 116 C 110 121 98 121 94 116 Z" fill="#f4e6d4"/>
  <circle cx="104.5" cy="116" r="4.4" fill="#3a2412"/>
  <circle cx="104.5" cy="116" r="2" fill="#0d0704"/>
  <circle cx="103" cy="114.3" r="1.1" fill="#fff"/>
  <path d="M 94 115.5 C 98 110.5 110 110.5 115 115.5" fill="none" stroke="#140a06" stroke-width="2" stroke-linecap="round"/>
  <path d="M 96 120 C 100 122.5 108 122.5 113 120" fill="none" stroke="#8a5a38" stroke-width="1" opacity="0.6"/>

  <path d="M 123 114.5 C 127 110 136 109.5 141 113.5 C 137 118 127 118.5 123 114.5 Z" fill="#f4e6d4"/>
  <circle cx="132" cy="114.3" r="3.8" fill="#3a2412"/>
  <circle cx="132" cy="114.3" r="1.7" fill="#0d0704"/>
  <circle cx="130.7" cy="112.8" r="0.9" fill="#fff"/>
  <path d="M 123 114 C 127 109.3 136 109 141 113" fill="none" stroke="#140a06" stroke-width="1.9" stroke-linecap="round"/>

  <path d="M 118 107 C 116 118 114 128 112 135 C 112 139 115 141 119 140" fill="none" stroke="#8a5a38" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M 113 138 C 111.5 141 113 143.5 116 143" fill="none" stroke="#8a5a38" stroke-width="1.3"/>
  <ellipse cx="112" cy="140.5" rx="1.8" ry="1.2" fill="#5a341c" opacity="0.7"/>
  <path d="M 117 109 C 115.5 118 114.5 127 114.5 133" fill="none" stroke="#f7dcb6" stroke-width="1.5" opacity="0.7"/>

  <path d="M 100 152 Q 115 148 129 152" stroke="#4a2416" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M 99 152 L 96 156" stroke="#4a2416" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 129 152 L 132 156" stroke="#4a2416" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 103 155 Q 115 159 126 155" stroke="#c07a56" stroke-width="1.8" fill="none" opacity="0.7"/>

  <ellipse cx="96" cy="130" rx="9" ry="6" fill="#d97a5a" opacity="0.22"/>
  <ellipse cx="136" cy="128" rx="8" ry="5.5" fill="#d97a5a" opacity="0.2"/>

  <path d="M 100 147 C 109 152 129 152 137 147 C 132 150 122 152 119 152 C 112 152 104 150 100 147 Z" fill="#5a341c" opacity="0.3"/>

  <path d="M 72 96 C 70 58 92 28 119 28 C 146 28 168 58 166 98 L 152 96 C 152 71 139 55 119 55 C 99 55 86 70 86 94 L 72 96 Z"
        fill="url(#un_hair)" stroke="#0a0505" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 78 62 C 90 42 104 32 119 32 C 108 40 96 54 90 74 Z" fill="#453530" opacity="0.5"/>

  <path d="M 86 94 C 80 112 82 133 92 149 C 87 139 82 122 83 104 C 83 100 84 97 86 94 Z" fill="url(#un_hair)" stroke="#0a0505" stroke-width="1.4"/>
  <path d="M 152 96 C 158 110 158 126 154 138 C 161 137 167 142 166 150 C 165 158 156 163 148 160 C 142 158 140 150 143 142 C 138 128 140 110 148 98 C 149 97 151 96 152 96 Z"
        fill="url(#un_hair)" stroke="#0a0505" stroke-width="1.5" stroke-linejoin="round"/>
  <g stroke="#3a2e28" stroke-width="0.8" fill="none" opacity="0.5">
    <path d="M 153 104 C 156 114 156 124 153 134"/>
    <path d="M 147 143 C 151 145 158 145 162 149"/>
  </g>
  <path d="M 154 150 L 171 145" stroke="#7a5636" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  <circle cx="172" cy="144.7" r="1.7" fill="#c7a878" stroke="#5a4326" stroke-width="0.7"/>

  <path d="M 91 100 C 88 116 89 132 95 146" stroke="#5a4640" stroke-width="1" fill="none" opacity="0.5"/>
  <path d="M 148 102 C 151 116 150 132 145 146" stroke="#5a4640" stroke-width="1" fill="none" opacity="0.5"/>
  <g stroke="#5a4640" stroke-width="0.9" fill="none" opacity="0.45">
    <path d="M 100 38 C 96 44 94 52 94 58"/>
    <path d="M 119 32 L 119 54"/>
    <path d="M 138 38 C 142 44 144 52 144 58"/>
  </g>

  <rect width="240" height="320" fill="url(#un_vin)"/>
</svg>`;
