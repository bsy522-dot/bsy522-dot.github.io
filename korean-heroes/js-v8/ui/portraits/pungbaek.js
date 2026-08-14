export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="pbBg" cx="50%" cy="38%" r="78%">
      <stop offset="0%" stop-color="#d8ecf4"/>
      <stop offset="35%" stop-color="#9cc2d2"/>
      <stop offset="70%" stop-color="#4d7385"/>
      <stop offset="100%" stop-color="#22363f"/>
    </radialGradient>
    <radialGradient id="pbGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f2fbff" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#cfe8f2" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#cfe8f2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="pbRobe" x1="0" y1="0" x2="1" y2="0.2">
      <stop offset="0%" stop-color="#54808f"/>
      <stop offset="45%" stop-color="#3a5a6a"/>
      <stop offset="100%" stop-color="#243f4c"/>
    </linearGradient>
    <linearGradient id="pbHair" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#40626f"/>
      <stop offset="45%" stop-color="#1e3440"/>
      <stop offset="100%" stop-color="#0d181f"/>
    </linearGradient>
    <radialGradient id="pbSkin" cx="40%" cy="35%" r="85%">
      <stop offset="0%" stop-color="#f8e2bc"/>
      <stop offset="60%" stop-color="#eec99b"/>
      <stop offset="100%" stop-color="#cfa06f"/>
    </radialGradient>
  </defs>

  <rect width="240" height="320" fill="url(#pbBg)"/>

  <g fill="none" stroke="#e9f5f9" opacity="0.30">
    <path d="M52 62 q-20 -5 -23 13 q-3 16 13 18 q13 2 16 -9 q2 -9 -7 -11 q-8 -1 -9 6" stroke-width="2.4"/>
    <path d="M204 84 q14 -4 16 9 q2 11 -9 13 q-9 1 -11 -6 q-1 -6 5 -8" stroke-width="2"/>
    <path d="M26 196 q-14 -3 -16 9 q-2 11 9 13 q9 1 11 -7 q1 -6 -5 -7" stroke-width="2"/>
    <path d="M216 220 q16 -4 18 10 q2 12 -10 14 q-10 1 -12 -7 q-1 -7 6 -9" stroke-width="2.2"/>
  </g>
  <g fill="none" stroke="#dff0f6" opacity="0.20" stroke-width="2">
    <path d="M-8 120 Q70 100 130 118 T252 102"/>
    <path d="M-8 160 Q60 148 118 158 T252 148"/>
    <path d="M-8 60 Q80 44 150 60 T252 46"/>
  </g>

  <ellipse cx="118" cy="122" rx="92" ry="98" fill="url(#pbGlow)"/>

  <!-- streaming hair blown left (behind) -->
  <path d="M96 66 Q60 44 22 46 Q56 56 74 66 Q58 70 44 82 Q78 74 98 78 Z" fill="#24404c" stroke="#0a1216" stroke-width="1.6"/>
  <path d="M86 84 Q48 72 12 82 Q42 84 60 93 Q36 98 16 112 Q52 104 76 101 Q68 94 72 88 Z" fill="#1c3038" stroke="#0a1216" stroke-width="1.6"/>
  <path d="M88 126 Q58 132 30 152 Q60 146 78 147 Q68 154 60 166 Q86 154 98 142 Z" fill="#16262e" stroke="#0a1216" stroke-width="1.6"/>
  <path d="M156 94 Q178 90 194 76 Q182 94 170 101 Q180 103 192 102 Q172 112 156 107 Z" fill="#1c3038" stroke="#0a1216" stroke-width="1.6"/>

  <!-- wind-blown robe tails -->
  <path d="M64 220 Q32 208 6 224 Q30 228 42 240 Q22 246 10 264 Q44 256 60 240 Z" fill="#2c4a58" stroke="#101d24" stroke-width="2"/>
  <path d="M176 218 Q210 208 234 228 Q212 231 200 242 Q222 250 232 266 Q198 256 182 238 Z" fill="#223c48" stroke="#101d24" stroke-width="2"/>

  <!-- neck -->
  <path d="M102 156 Q101 178 100 192 Q120 204 140 192 Q138 178 138 154 Q122 172 102 156 Z" fill="#dcb488" stroke="#7a4a26" stroke-width="2"/>
  <path d="M102 156 Q120 174 138 154 L138 168 Q120 186 102 170 Z" fill="#b9855a" opacity="0.7"/>

  <!-- robe body -->
  <path d="M28 320 L28 296 Q34 242 62 218 Q88 197 118 195 Q150 197 176 218 Q206 240 212 294 L212 320 Z" fill="url(#pbRobe)" stroke="#101d24" stroke-width="3"/>
  <path d="M28 296 Q34 242 62 218 Q74 208 88 202 Q66 228 56 260 Q50 288 50 320 L28 320 Z" fill="#628ea0" opacity="0.55"/>
  <path d="M176 218 Q206 240 212 294 L212 320 L188 320 Q188 248 162 222 Z" fill="#1e333e" opacity="0.8"/>
  <g fill="none" stroke="#16262e" stroke-width="2" opacity="0.55">
    <path d="M84 222 Q76 262 80 318"/>
    <path d="M158 224 Q168 260 166 318"/>
    <path d="M120 258 Q118 288 120 318"/>
  </g>

  <!-- collar: under band, white inner edge, over band -->
  <path d="M152 196 Q136 216 124 238 L138 246 Q150 222 164 202 Z" fill="#20655e" stroke="#14262c" stroke-width="2"/>
  <path d="M94 198 Q108 222 128 244 L134 237 Q114 216 102 194 Z" fill="#eef4ee"/>
  <path d="M86 200 Q100 224 120 246 L132 234 Q110 214 98 194 Z" fill="#2b8a80" stroke="#14262c" stroke-width="2"/>

  <!-- chest wind emblem -->
  <path d="M106 282 q0 -16 16 -16 q16 0 16 16 q0 12 -12 12 q-10 0 -10 -10 q0 -8 8 -8 q5 0 6 5" fill="none" stroke="#7fd0c8" stroke-width="2.5" opacity="0.85"/>

  <!-- ear -->
  <path d="M150 110 Q164 108 162 123 Q160 137 148 139 Z" fill="#e8c294" stroke="#7a4a26" stroke-width="2"/>

  <!-- face -->
  <path d="M82 108 Q80 82 100 71 Q124 60 144 76 Q158 88 156 116 Q155 138 144 156 Q130 172 112 172 Q97 170 89 150 Q83 132 82 108 Z" fill="url(#pbSkin)" stroke="#5f3a1e" stroke-width="2.5"/>
  <path d="M144 98 Q152 124 140 152 Q132 164 118 170 Q134 158 138 136 Q142 116 138 96 Z" fill="#c89a6a" opacity="0.6"/>
  <ellipse cx="102" cy="92" rx="15" ry="9" fill="#fcecd0" opacity="0.45"/>

  <!-- brows: sharp, inner low -->
  <path d="M116 110 L142 97 L143 101 L118 114 Z" fill="#14222a"/>
  <path d="M104 111 L85 102 L84 106 L103 115 Z" fill="#14222a"/>
  <path d="M110 107 L108 115" stroke="#b98a5c" stroke-width="1.5"/>

  <!-- eyes: narrow, keen -->
  <path d="M117 109 Q127 104 137 109" fill="none" stroke="#b98a5c" stroke-width="1.5"/>
  <path d="M116 114 Q126 108 138 114" fill="none" stroke="#101c24" stroke-width="3" stroke-linecap="round"/>
  <path d="M118 119 Q127 122 136 118" fill="none" stroke="#5a3a20" stroke-width="1.4"/>
  <circle cx="127" cy="115.5" r="3.2" fill="#16323a"/>
  <circle cx="127" cy="115.5" r="1.5" fill="#050a0d"/>
  <circle cx="128.2" cy="114.2" r="0.8" fill="#e8f4f8"/>
  <path d="M86 114 Q93 109 102 114" fill="none" stroke="#101c24" stroke-width="3" stroke-linecap="round"/>
  <path d="M88 119 Q94 121 100 118" fill="none" stroke="#5a3a20" stroke-width="1.4"/>
  <circle cx="94" cy="115.5" r="2.8" fill="#16323a"/>
  <circle cx="94" cy="115.5" r="1.3" fill="#050a0d"/>

  <!-- nose -->
  <path d="M108 106 Q102 122 99 136" fill="none" stroke="#c1946a" stroke-width="2"/>
  <path d="M99 136 Q95 141 101 143 Q107 145 109 140" fill="none" stroke="#7a4a26" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="107" cy="141" rx="1.8" ry="1.1" fill="#8a5630" opacity="0.7"/>

  <!-- mouth: firm, slightly stern -->
  <path d="M104 152 Q114 149 124 151 Q114 154 104 152 Z" fill="#b97a5a" opacity="0.5"/>
  <path d="M103 154 Q112 157 125 152" fill="none" stroke="#6e3a28" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M108 158 Q115 161 122 157" fill="none" stroke="#d9a075" stroke-width="1.4" opacity="0.8"/>
  <path d="M110 165 Q115 168 121 165" fill="none" stroke="#c1946a" stroke-width="1.4" opacity="0.6"/>

  <!-- hair mass + fringe -->
  <path d="M80 110 Q72 76 96 62 Q118 50 142 59 Q164 69 160 100 Q158 120 150 134 Q152 112 146 100 Q148 88 138 80 Q142 92 137 100 Q132 81 116 79 Q100 77 92 90 Q86 97 86 114 Q82 114 80 110 Z" fill="url(#pbHair)" stroke="#0a1216" stroke-width="2.5"/>
  <path d="M116 77 Q103 91 107 104 Q112 91 123 81 Z" fill="#1c3038" opacity="0.9"/>
  <!-- topknot + teal band + pin -->
  <path d="M112 60 Q109 42 122 40 Q135 42 132 58 Q127 51 122 51 Q116 53 112 60 Z" fill="#16262e" stroke="#0a1216" stroke-width="2"/>
  <path d="M111 58 Q122 51 133 57 L131 63 Q122 57 113 63 Z" fill="#3fae9e" stroke="#0a1216" stroke-width="1.5"/>
  <path d="M132 49 L148 42" stroke="#cdd8dc" stroke-width="2.5" stroke-linecap="round"/>
  <g fill="none" opacity="0.7">
    <path d="M94 70 Q112 59 134 65" stroke="#5d8496" stroke-width="2"/>
    <path d="M90 82 Q104 72 122 74" stroke="#48707f" stroke-width="1.6"/>
  </g>

  <!-- foreground wind streaks -->
  <g fill="none" stroke="#dff0f6" stroke-linecap="round">
    <path d="M-6 252 Q60 238 122 250 T248 238" stroke-width="2.6" opacity="0.35"/>
    <path d="M-6 292 Q70 280 130 290 T248 280" stroke-width="2" opacity="0.22"/>
    <path d="M150 196 Q190 188 224 196 q-12 4 -18 10" stroke-width="2" opacity="0.3"/>
  </g>
</svg>`;
