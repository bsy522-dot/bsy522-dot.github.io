export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="tmBg" cx="50%" cy="38%" r="78%">
      <stop offset="0%" stop-color="#f8ecd0"/>
      <stop offset="55%" stop-color="#e8d0a8"/>
      <stop offset="100%" stop-color="#c49a64"/>
    </radialGradient>
    <radialGradient id="tmHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff6dc" stop-opacity="0.9"/>
      <stop offset="65%" stop-color="#f4dcac" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#f4dcac" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tmRobe" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7e5836"/>
      <stop offset="55%" stop-color="#6a4a2a"/>
      <stop offset="100%" stop-color="#4e3418"/>
    </linearGradient>
    <linearGradient id="tmApron" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eee3ca"/>
      <stop offset="100%" stop-color="#c6b18c"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="240" height="320" fill="url(#tmBg)"/>

  <g opacity="0.09" fill="#4e3418">
    <path d="M30 42 h12 v11 c9 3 14 11 14 21 c0 13 -9 21 -20 21 c-11 0 -20 -8 -20 -21 c0 -10 5 -18 14 -21 z"/>
    <path d="M198 26 h10 v10 c8 3 12 10 12 18 c0 12 -8 19 -17 19 c-9 0 -17 -7 -17 -19 c0 -8 4 -15 12 -18 z"/>
    <path d="M206 208 h9 v9 c7 3 11 9 11 16 c0 11 -7 17 -15.5 17 c-8.5 0 -15.5 -6 -15.5 -17 c0 -7 4 -13 11 -16 z"/>
  </g>
  <g opacity="0.10" stroke="#4e3418" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M66 96 c-6 -9 6 -13 0 -22 c-5 -8 5 -12 1 -19"/>
    <path d="M176 108 c6 -9 -6 -13 0 -22 c5 -8 -5 -12 -1 -19"/>
  </g>
  <ellipse cx="120" cy="142" rx="106" ry="118" fill="url(#tmHalo)"/>

  <path d="M103 160 C103 180 102 190 97 199 L139 199 C134 190 133 180 133 160 Z" fill="#dca678" stroke="#8a5a32" stroke-width="2"/>
  <path d="M103 166 C110 176 126 176 133 166 L133 182 C125 188 111 188 103 182 Z" fill="#b87c4e" opacity="0.7"/>

  <path d="M18 320 C22 256 50 208 90 196 L120 191 L150 196 C190 208 218 256 222 320 Z" fill="url(#tmRobe)" stroke="#3c2410" stroke-width="2.5"/>
  <g stroke-linecap="round" fill="none">
    <path d="M54 240 C64 226 76 214 90 208" stroke="#4a3016" stroke-width="2" opacity="0.75"/>
    <path d="M188 242 C178 228 166 216 152 209" stroke="#4a3016" stroke-width="2" opacity="0.75"/>
    <path d="M42 264 C50 250 60 240 72 232" stroke="#8c6440" stroke-width="2" opacity="0.8"/>
    <path d="M200 266 C192 252 182 242 170 234" stroke="#3c2410" stroke-width="2" opacity="0.6"/>
  </g>

  <path d="M146 195 L114 230 L106 221 L136 192 Z" fill="#54381a" stroke="#3c2410" stroke-width="2"/>
  <path d="M142 197 L112 225" stroke="#f0e6d0" stroke-width="4" fill="none"/>
  <path d="M92 196 L140 252 L152 242 L104 191 Z" fill="#54381a" stroke="#3c2410" stroke-width="2"/>
  <path d="M97 199 L143 246" stroke="#f0e6d0" stroke-width="5" fill="none"/>

  <path d="M50 320 L55 262 C82 250 158 250 185 262 L190 320 Z" fill="url(#tmApron)" stroke="#3c2410" stroke-width="2.5"/>
  <path d="M55 262 C82 250 158 250 185 262 L184 272 C158 261 82 261 56 272 Z" fill="#d9c8a4" stroke="#3c2410" stroke-width="2"/>
  <g stroke="#ab9268" stroke-width="2" opacity="0.8" fill="none" stroke-linecap="round">
    <path d="M84 278 C82 292 82 306 84 318"/>
    <path d="M120 276 C120 290 120 304 120 318"/>
    <path d="M156 278 C158 292 158 306 156 318"/>
  </g>
  <g>
    <ellipse cx="70" cy="267" rx="7" ry="5.5" fill="#e6d8b8" stroke="#3c2410" stroke-width="2"/>
    <path d="M70 271 C66 280 60 285 55 287" stroke="#3c2410" stroke-width="2" fill="none"/>
    <path d="M70 271 C64 279 59 283 55 286" stroke="#d9c8a4" stroke-width="3" fill="none"/>
  </g>

  <g>
    <path d="M10 320 C10 294 22 280 42 280 C62 280 74 294 74 320 Z" fill="#8a5c34" stroke="#3c2410" stroke-width="2.5"/>
    <path d="M33 280 C33 272 35 266 35 260 L49 260 C49 266 51 272 51 280 Z" fill="#7a4e2a" stroke="#3c2410" stroke-width="2"/>
    <rect x="29" y="252" width="26" height="9" rx="4" fill="#96683c" stroke="#3c2410" stroke-width="2"/>
    <path d="M20 306 C20 292 26 286 32 284" stroke="#b48454" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9"/>
    <path d="M62 310 C64 298 60 290 54 286" stroke="#5c3a1c" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M32 268 L52 268" stroke="#c8a058" stroke-width="3"/>
  </g>

  <g>
    <path d="M186 282 C180 272 190 264 184 254 C178 244 188 236 184 228" stroke="#fffdf4" stroke-width="4" opacity="0.8" fill="none" stroke-linecap="round"/>
    <path d="M206 282 C212 272 202 264 208 254 C214 244 204 238 208 230" stroke="#fffdf4" stroke-width="3.5" opacity="0.6" fill="none" stroke-linecap="round"/>
    <path d="M168 294 L226 294 C224 309 213 318 197 318 C181 318 170 309 168 294 Z" fill="#ece0c4" stroke="#3c2410" stroke-width="2.5"/>
    <ellipse cx="197" cy="294" rx="29" ry="7" fill="#f8f1dc" stroke="#c0aa80" stroke-width="2"/>
    <path d="M172 304 C176 311 184 315 192 316" stroke="#c6b08a" stroke-width="2.5" fill="none" opacity="0.85"/>
  </g>

  <ellipse cx="119" cy="52" rx="12" ry="10" fill="#2e1c10" stroke="#1a0e06" stroke-width="2"/>
  <path d="M112 47 C116 42 124 42 127 47" stroke="#5a4632" stroke-width="2" fill="none"/>
  <path d="M104 52 L136 50" stroke="#c89858" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M76 110 C74 74 94 56 119 56 C144 56 164 74 162 110 C160 96 148 84 119 84 C90 84 78 96 76 110 Z" fill="#2e1c10" stroke="#1a0e06" stroke-width="2"/>
  <path d="M88 78 C94 72 102 68 110 66" stroke="#6e5c48" stroke-width="2.5" fill="none" opacity="0.8"/>
  <path d="M146 80 C140 74 134 70 128 67" stroke="#6e5c48" stroke-width="2" fill="none" opacity="0.6"/>

  <path d="M79 128 C72 124 70 132 73 139 C75 145 80 145 81 140 Z" fill="#dca678" stroke="#8a5a32" stroke-width="2"/>
  <path d="M158 124 C169 117 173 128 169 139 C166 148 159 150 156 145 Z" fill="#e0a878" stroke="#8a5a32" stroke-width="2"/>
  <path d="M162 130 C166 130 166 137 163 140" stroke="#a06a3c" stroke-width="1.8" fill="none"/>

  <path d="M78 118 C78 96 92 82 118 82 C146 82 160 96 160 120 C160 142 154 158 142 170 C133 179 122 183 112 182 C98 180 86 168 82 152 C79 141 78 130 78 118 Z" fill="#edc292" stroke="#4a2c14" stroke-width="2.5"/>
  <path d="M160 120 C160 143 153 160 141 171 C149 156 152 140 150 116 C154 111 158 113 160 120 Z" fill="#c98f5e" opacity="0.5"/>
  <ellipse cx="103" cy="110" rx="17" ry="7" fill="#f8dcae" opacity="0.55"/>
  <ellipse cx="96" cy="140" rx="8" ry="11" fill="#f8dcae" opacity="0.3"/>

  <path d="M75 110 C82 91 98 83 119 83 C140 83 156 91 163 110 L163 120 C154 105 140 97 119 97 C98 97 84 105 75 120 Z" fill="#f2e8d2" stroke="#3c2410" stroke-width="2"/>
  <path d="M88 92 C92 96 94 102 94 108" stroke="#c9b890" stroke-width="2" fill="none" opacity="0.9"/>
  <path d="M142 90 C140 95 139 100 140 106" stroke="#c9b890" stroke-width="2" fill="none" opacity="0.9"/>
  <path d="M161 102 C172 97 178 104 172 111 C180 112 178 122 169 120 C163 118 159 111 161 102 Z" fill="#e6dcc4" stroke="#3c2410" stroke-width="2"/>
  <path d="M170 119 C175 127 173 135 167 139" stroke="#3c2410" stroke-width="2" fill="none"/>
  <path d="M169 119 C173 126 172 133 167 137" stroke="#e6dcc4" stroke-width="3" fill="none"/>

  <path d="M96 106 C108 102 128 102 140 105" stroke="#c48a58" stroke-width="1.5" fill="none" opacity="0.75"/>
  <path d="M99 112 C110 109 127 109 137 111" stroke="#c48a58" stroke-width="1.5" fill="none" opacity="0.6"/>

  <path d="M86 118 C93 110 104 109 111 113" stroke="#33200e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M128 112 C136 107 147 108 154 114" stroke="#33200e" stroke-width="5" fill="none" stroke-linecap="round"/>

  <path d="M90 132 C96 123 106 123 111 131" stroke="#241206" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M129 130 C135 121 146 121 151 129" stroke="#241206" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M93 137 C98 134 105 134 109 137" stroke="#b8865a" stroke-width="1.6" fill="none"/>
  <path d="M132 135 C137 132 144 132 148 135" stroke="#b8865a" stroke-width="1.6" fill="none"/>
  <path d="M86 130 C83 128 81 125 80 122" stroke="#b8865a" stroke-width="1.6" fill="none"/>
  <path d="M155 128 C158 126 160 123 161 120" stroke="#b8865a" stroke-width="1.6" fill="none"/>

  <ellipse cx="89" cy="147" rx="10" ry="6" fill="#d97f57" opacity="0.42"/>
  <ellipse cx="147" cy="144" rx="10" ry="6" fill="#d97f57" opacity="0.42"/>

  <path d="M117 128 C114 136 111 142 109 147" stroke="#c48a58" stroke-width="2" fill="none"/>
  <ellipse cx="111" cy="152" rx="10" ry="7.5" fill="#e8ae7e"/>
  <ellipse cx="111" cy="152" rx="10" ry="7.5" fill="#e09468" opacity="0.55"/>
  <path d="M101 152 C101 157 105 160 111 160 C118 160 121 156 121 151" stroke="#b87a4a" stroke-width="2" fill="none"/>
  <ellipse cx="105" cy="157" rx="2" ry="1.5" fill="#8a5230"/>
  <ellipse cx="117" cy="156" rx="2" ry="1.5" fill="#8a5230"/>
  <ellipse cx="108" cy="149" rx="3" ry="2" fill="#f8dcae" opacity="0.8"/>

  <path d="M100 157 C94 163 92 169 93 173" stroke="#b8865a" stroke-width="1.8" fill="none"/>
  <path d="M124 156 C130 162 132 168 131 172" stroke="#b8865a" stroke-width="1.8" fill="none"/>

  <path d="M94 166 C104 160 122 159 134 163 C132 176 122 184 112 184 C102 184 95 176 94 166 Z" fill="#7c3424" stroke="#3c2410" stroke-width="2"/>
  <path d="M96 166 C106 161 122 160 132 164 C131 169 128 171 124 171 C114 172 104 172 100 171 C97 170 96 168 96 166 Z" fill="#fbf4e4"/>
  <path d="M104 161 L104 171 M113 160 L113 172 M122 160 L122 171" stroke="#d9c9a8" stroke-width="1"/>
  <ellipse cx="113" cy="179" rx="10" ry="4.5" fill="#b3554a"/>

  <path d="M98 161 C103 157 109 156 112 157" stroke="#3a2412" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M117 156 C121 155 128 156 133 159" stroke="#3a2412" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M99 181 C106 189 120 189 128 179" stroke="#a06a3e" stroke-width="2" fill="none" opacity="0.7"/>
  <g fill="#5c3a1c" opacity="0.5">
    <circle cx="99" cy="176" r="1"/>
    <circle cx="103" cy="184" r="1"/>
    <circle cx="112" cy="188" r="1"/>
    <circle cx="122" cy="186" r="1"/>
    <circle cx="129" cy="178" r="1"/>
    <circle cx="95" cy="169" r="1"/>
    <circle cx="134" cy="170" r="1"/>
  </g>
</svg>`;
