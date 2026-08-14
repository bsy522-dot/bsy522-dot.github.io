export default `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <defs>
    <linearGradient id="hw_bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5a4420"/>
      <stop offset="1" stop-color="#26190a"/>
    </linearGradient>
    <radialGradient id="hw_glow" cx="0.5" cy="0.34" r="0.62">
      <stop offset="0" stop-color="#ffe8a0" stop-opacity="0.65"/>
      <stop offset="0.55" stop-color="#e8c065" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#e8c065" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hw_gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4d876"/>
      <stop offset="0.55" stop-color="#d9a83c"/>
      <stop offset="1" stop-color="#8a6a2a"/>
    </linearGradient>
    <linearGradient id="hw_robe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#faf6ec"/>
      <stop offset="1" stop-color="#ddd3bc"/>
    </linearGradient>
    <clipPath id="hw_fc">
      <path d="M 87 92 C 87 70 99 56 117 56 C 136 56 149 70 149 94 C 149 114 144 132 134 144 C 127 152 111 153 103 145 C 93 135 87 112 87 92 Z"/>
    </clipPath>
    <clipPath id="hw_ac">
      <path d="M 102 197 L 134 197 L 121 258 Z"/>
    </clipPath>
  </defs>

  <rect width="240" height="320" fill="url(#hw_bg)"/>
  <rect width="240" height="320" fill="url(#hw_glow)"/>

  <g opacity="0.16" stroke="#ffde8a" fill="none">
    <circle cx="120" cy="108" r="84" stroke-width="3"/>
    <circle cx="120" cy="108" r="72" stroke-width="1.5"/>
    <g stroke-width="2.5">
      <line x1="120" y1="20" x2="120" y2="8"/>
      <line x1="164" y1="32" x2="170" y2="21"/>
      <line x1="76" y1="32" x2="70" y2="21"/>
      <line x1="196" y1="64" x2="207" y2="58"/>
      <line x1="44" y1="64" x2="33" y2="58"/>
    </g>
  </g>

  <g opacity="0.13" fill="#ffdf8f">
    <g>
      <path d="M 34 216 C 24 218 20 226 20 236 L 20 244 L 48 244 L 48 236 C 48 226 44 218 34 216 Z"/>
      <circle cx="34" cy="248" r="3"/>
      <path d="M 30 212 C 30 209 38 209 38 212 L 38 216 L 30 216 Z"/>
    </g>
    <g>
      <path d="M 206 216 C 196 218 192 226 192 236 L 192 244 L 220 244 L 220 236 C 220 226 216 218 206 216 Z"/>
      <circle cx="206" cy="248" r="3"/>
      <path d="M 202 212 C 202 209 210 209 210 212 L 210 216 L 202 216 Z"/>
    </g>
  </g>
  <g opacity="0.11" fill="#ffdf8f">
    <g transform="rotate(-16 40 250)">
      <path d="M 40 188 L 47 208 L 44 268 L 40 282 L 36 268 L 33 208 Z"/>
      <rect x="29" y="268" width="22" height="7" rx="2"/>
      <rect x="37" y="275" width="6" height="24"/>
      <circle cx="40" cy="302" r="4.5"/>
    </g>
    <g transform="rotate(16 200 250)">
      <path d="M 200 188 L 207 208 L 204 268 L 200 282 L 196 268 L 193 208 Z"/>
      <rect x="189" y="268" width="22" height="7" rx="2"/>
      <rect x="197" y="275" width="6" height="24"/>
      <circle cx="200" cy="302" r="4.5"/>
    </g>
  </g>

  <path d="M 16 320 C 18 274 30 244 58 228 C 74 219 92 210 100 202 L 100 190 L 136 190 C 144 210 164 219 180 228 C 208 244 220 274 224 320 Z"
        fill="url(#hw_robe)" stroke="#2a1c0c" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 16 320 C 18 274 30 244 58 228 C 66 223 74 219 82 215 C 64 234 50 264 46 320 Z" fill="#c3b697" opacity="0.85"/>
  <path d="M 224 320 C 220 274 208 244 180 228 C 174 224 168 221 162 218 C 180 236 192 266 196 320 Z" fill="#efe8d6" opacity="0.7"/>
  <g stroke="#b3a586" stroke-width="2" fill="none" opacity="0.8">
    <path d="M 70 252 C 66 274 63 296 63 318"/>
    <path d="M 176 248 C 182 270 186 294 187 318"/>
    <path d="M 88 236 C 84 262 82 292 82 318"/>
    <path d="M 158 234 C 162 258 165 288 166 318"/>
  </g>

  <path d="M 102 197 L 134 197 L 121 258 Z" fill="url(#hw_gold)" stroke="#2a1c0c" stroke-width="1.5"/>
  <g clip-path="url(#hw_ac)" stroke="#6a4e1c" stroke-width="1.2" fill="none">
    <path d="M 100 212 C 112 218 126 218 138 212"/>
    <path d="M 102 224 C 113 230 125 230 136 224"/>
    <path d="M 105 236 C 114 241 124 241 133 236"/>
    <path d="M 109 248 C 116 252 122 252 129 248"/>
  </g>

  <path d="M 132 194 L 146 201 L 104 308 L 88 300 Z" fill="#f4efe2" stroke="#2a1c0c" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M 130 199 L 134 201 L 94 302 L 90 300 Z" fill="#c9a040"/>
  <path d="M 104 194 L 90 201 L 136 312 L 152 304 Z" fill="#f4efe2" stroke="#2a1c0c" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M 106 199 L 102 201 L 146 306 L 150 304 Z" fill="#c9a040"/>

  <path d="M 118 258 L 121 284 M 124 258 L 121 284" stroke="#6a4e1c" stroke-width="1.5" fill="none"/>
  <g stroke="#2a1c0c" stroke-width="1.5">
    <circle cx="121" cy="290" r="19" fill="url(#hw_gold)"/>
    <circle cx="121" cy="290" r="12" fill="#e8bc50" stroke-width="1.2"/>
    <circle cx="121" cy="290" r="4.5" fill="#8a6a2a" stroke="#6a4e1c" stroke-width="1"/>
  </g>
  <g stroke="#6a4e1c" stroke-width="1.3" fill="none">
    <line x1="121" y1="276" x2="121" y2="271.5"/>
    <line x1="121" y1="304" x2="121" y2="308.5"/>
    <line x1="107" y1="290" x2="102.5" y2="290"/>
    <line x1="135" y1="290" x2="139.5" y2="290"/>
    <line x1="111" y1="280" x2="108" y2="277"/>
    <line x1="131" y1="280" x2="134" y2="277"/>
    <line x1="111" y1="300" x2="108" y2="303"/>
    <line x1="131" y1="300" x2="134" y2="303"/>
  </g>

  <path d="M 104 166 L 104 200 C 110 206 128 206 134 200 L 134 162 C 126 173 112 173 104 166 Z"
        fill="#e8b183" stroke="#2a1c0c" stroke-width="1.5"/>
  <path d="M 104 166 L 104 182 C 114 189 126 188 134 179 L 134 162 C 126 173 112 173 104 166 Z" fill="#bd8050"/>

  <path d="M 87 92 C 87 70 99 56 117 56 C 136 56 149 70 149 94 C 149 114 144 132 134 144 C 127 152 111 153 103 145 C 93 135 87 112 87 92 Z"
        fill="#e8b183" stroke="#2a1c0c" stroke-width="1.8"/>
  <g clip-path="url(#hw_fc)">
    <path d="M 80 56 L 101 56 C 95 84 96 122 106 152 L 80 152 Z" fill="#c4854f" opacity="0.55"/>
    <ellipse cx="131" cy="90" rx="20" ry="24" fill="#f6d4a6" opacity="0.45"/>
    <path d="M 96 104 C 99 110 103 113 108 114 L 108 118 C 102 117 97 112 94 106 Z" fill="#c4854f" opacity="0.4"/>
    <path d="M 121 104 C 126 110 132 112 138 111 L 138 115 C 131 116 124 112 120 107 Z" fill="#c4854f" opacity="0.35"/>
  </g>

  <path d="M 148 94 C 156 89 159 100 153 111 C 150 117 146 116 145 109 Z" fill="#e8b183" stroke="#2a1c0c" stroke-width="1.4"/>
  <path d="M 150 96 C 153 97 153 104 150 108" fill="none" stroke="#9c6136" stroke-width="1.2"/>

  <path d="M 88 98 C 86 122 90 144 99 156 C 105 164 109 172 112 180 C 115 172 120 164 126 156 C 136 144 150 124 149 98 C 145 112 140 120 133 127 C 128 132 124 138 121 142 C 118 145 114 146 111 144 C 108 141 104 134 100 128 C 94 121 90 110 88 98 Z"
        fill="#221913" stroke="#150e08" stroke-width="1.5" stroke-linejoin="round"/>
  <g stroke="#463622" stroke-width="1.2" fill="none" opacity="0.9">
    <path d="M 96 116 C 98 132 102 146 108 158"/>
    <path d="M 128 120 C 124 134 119 148 114 160"/>
    <path d="M 112 146 C 112 156 112 164 112 172"/>
    <path d="M 92 106 C 94 120 98 134 103 144"/>
    <path d="M 137 112 C 133 126 127 140 120 152"/>
  </g>

  <path d="M 91 89 C 96 83 104 82 109 85 L 110 91 C 104 88 97 89 93 93 Z" fill="#241a10"/>
  <path d="M 119 85 C 126 81 135 82 141 88 L 139 93 C 133 88 126 87 120 91 Z" fill="#241a10"/>

  <path d="M 93 97 C 97 94 103 94 107 96 C 104 100 96 100 93 97 Z" fill="#f4ece0"/>
  <circle cx="101" cy="97" r="2.6" fill="#2c1a0c"/>
  <circle cx="101" cy="97" r="1.2" fill="#000"/>
  <circle cx="100" cy="96" r="0.7" fill="#fff"/>
  <path d="M 93 96.5 C 97 93 103 93 107 95.5" fill="none" stroke="#180f06" stroke-width="2" stroke-linecap="round"/>

  <path d="M 120 97 C 125 93.5 133 93.5 138 96 C 134 100.5 124 100.5 120 97 Z" fill="#f4ece0"/>
  <circle cx="129" cy="96.5" r="3" fill="#2c1a0c"/>
  <circle cx="129" cy="96.5" r="1.4" fill="#000"/>
  <circle cx="128" cy="95.5" r="0.8" fill="#fff"/>
  <path d="M 120 96.5 C 125 92.5 133 92.5 138 95.5" fill="none" stroke="#180f06" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M 122 100.5 C 127 102 133 101.5 137 99" fill="none" stroke="#c4854f" stroke-width="1"/>

  <path d="M 111 91 C 109 100 107 108 106 114 C 106 118 108 121 112 120" fill="none" stroke="#9c6136" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 105 117 C 103.5 119.5 105 121.5 108 121" fill="none" stroke="#9c6136" stroke-width="1.4"/>
  <path d="M 109 96 C 106 104 104.5 111 104.5 115 L 108 117 C 106.5 111 108 102 111 95 Z" fill="#c4854f" opacity="0.45"/>
  <path d="M 112.5 95 C 111.5 102 110.5 108 110.5 112" fill="none" stroke="#f6d4a6" stroke-width="1.8" opacity="0.7"/>

  <path d="M 104 133 C 110 135 116 135 121 132.5" fill="none" stroke="#5c2f1c" stroke-width="2" stroke-linecap="round"/>
  <path d="M 107 138.5 C 111 140.5 117 140.5 120 138" fill="none" stroke="#c4854f" stroke-width="1.4" opacity="0.85"/>

  <path d="M 98 127 C 104 119 121 119 127 127 C 123 131 117 127.5 112.5 127.5 C 108 127.5 102 131 98 127 Z" fill="#201812"/>
  <path d="M 102 124 C 106 121 110 120.5 112 121 M 123 124 C 119 121 116 120.5 113.5 121" fill="none" stroke="#463622" stroke-width="1"/>

  <path d="M 86 82 C 88 92 90 100 93 106 C 88 100 85 92 84 84 Z" fill="#221913"/>
  <path d="M 150 84 C 148 92 146 98 143 104 C 148 99 150 92 151 84 Z" fill="#221913"/>

  <g>
    <path d="M 86 74 C 72 68 60 54 54 32 C 58 38 64 42 68 42 C 64 34 62 26 62 18 C 68 26 74 32 80 34 C 78 26 78 18 80 10 C 86 20 92 32 93 44 C 94 54 92 64 88 72 Z"
          fill="url(#hw_gold)" stroke="#2a1c0c" stroke-width="1.5" stroke-linejoin="round"/>
    <g stroke="#8a6a2a" stroke-width="1.1" fill="none">
      <path d="M 87 68 C 76 60 66 46 60 30"/>
      <path d="M 88 62 C 80 50 74 38 72 24"/>
      <path d="M 90 56 C 86 44 84 32 84 18"/>
    </g>
    <path d="M 150 74 C 164 68 176 54 182 32 C 178 38 172 42 168 42 C 172 34 174 26 174 18 C 168 26 162 32 156 34 C 158 26 158 18 156 10 C 150 20 144 32 143 44 C 142 54 144 64 148 72 Z"
          fill="url(#hw_gold)" stroke="#2a1c0c" stroke-width="1.5" stroke-linejoin="round"/>
    <g stroke="#8a6a2a" stroke-width="1.1" fill="none">
      <path d="M 149 68 C 160 60 170 46 176 30"/>
      <path d="M 148 62 C 156 50 162 38 164 24"/>
      <path d="M 146 56 C 150 44 152 32 152 18"/>
    </g>
  </g>

  <path d="M 88 68 C 88 46 100 34 118 34 C 136 34 148 46 148 68 C 132 60 104 60 88 68 Z"
        fill="url(#hw_gold)" stroke="#2a1c0c" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M 92 60 C 96 46 106 38 118 38 C 124 38 130 40 134 44 C 128 42 120 42 112 45 C 102 48 95 54 92 60 Z" fill="#f4d876" opacity="0.75"/>
  <path d="M 84 68 C 100 60 136 60 152 68 L 152 82 C 136 73 100 73 84 82 Z"
        fill="url(#hw_gold)" stroke="#2a1c0c" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M 84 68 C 100 60 136 60 152 68 L 152 71 C 136 63 100 63 84 71 Z" fill="#f4d876" opacity="0.8"/>

  <g stroke="#6a4e1c" stroke-width="1">
    <circle cx="100" cy="72.5" r="2.8" fill="#fff0c0"/>
    <circle cx="118" cy="67.5" r="2.8" fill="#fff0c0"/>
    <circle cx="136" cy="72.5" r="2.8" fill="#fff0c0"/>
    <circle cx="100" cy="73" r="0.9" fill="#6a4e1c" stroke="none"/>
    <circle cx="118" cy="68" r="0.9" fill="#6a4e1c" stroke="none"/>
    <circle cx="136" cy="73" r="0.9" fill="#6a4e1c" stroke="none"/>
  </g>

  <line x1="118" y1="60" x2="118" y2="54" stroke="#6a4e1c" stroke-width="2"/>
  <circle cx="118" cy="47" r="7" fill="#ffedb0" stroke="#6a4e1c" stroke-width="1.5"/>
  <circle cx="118" cy="47" r="3" fill="#d9a83c" stroke="#6a4e1c" stroke-width="0.8"/>
</svg>`;
