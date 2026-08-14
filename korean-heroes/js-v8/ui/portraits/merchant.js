export default `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <defs>
    <radialGradient id="mch_bg" cx="50%" cy="36%" r="80%">
      <stop offset="0%" stop-color="#f8ecd2"/>
      <stop offset="50%" stop-color="#ecd6a4"/>
      <stop offset="100%" stop-color="#9a7838"/>
    </radialGradient>
    <linearGradient id="mch_robe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b08c44"/>
      <stop offset="60%" stop-color="#8a6a2a"/>
      <stop offset="100%" stop-color="#5f4718"/>
    </linearGradient>
    <linearGradient id="mch_hat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2c47c"/>
      <stop offset="100%" stop-color="#a5803a"/>
    </linearGradient>
    <radialGradient id="mch_bundle" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="#6d8095"/>
      <stop offset="55%" stop-color="#4a5d75"/>
      <stop offset="100%" stop-color="#2e3c4c"/>
    </radialGradient>
    <linearGradient id="mch_skin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4d0a6"/>
      <stop offset="100%" stop-color="#dcab78"/>
    </linearGradient>
  </defs>

  <rect width="240" height="320" fill="url(#mch_bg)"/>

  <!-- yeopjeon coin pattern (subtle) -->
  <g fill="none" stroke="#6d5220" opacity="0.15">
    <g stroke-width="5"><circle cx="34" cy="54" r="22"/><rect x="26" y="46" width="16" height="16"/></g>
    <g stroke-width="4"><circle cx="206" cy="62" r="17"/><rect x="200" y="56" width="12" height="12"/></g>
    <g stroke-width="5"><circle cx="214" cy="240" r="23"/><rect x="206" y="232" width="16" height="16"/></g>
    <g stroke-width="4"><circle cx="22" cy="266" r="18"/><rect x="16" y="260" width="12" height="12"/></g>
    <g stroke-width="3"><circle cx="200" cy="146" r="12"/><rect x="196" y="142" width="8" height="8"/></g>
  </g>
  <circle cx="118" cy="130" r="100" fill="#fff3d6" opacity="0.35"/>

  <!-- jige poles behind left shoulder -->
  <g stroke="#2b1d0c" stroke-width="2.5">
    <path d="M 20,250 L 32,128 L 41,129 L 30,252 Z" fill="#7a5230"/>
    <path d="M 58,252 L 64,140 L 73,142 L 68,254 Z" fill="#6a4526"/>
  </g>
  <!-- bojagi pack bundle -->
  <g stroke="#202c38" stroke-width="3">
    <path d="M 44,164 C 40,156 44,148 52,148 C 58,148 62,153 61,159 C 68,155 76,159 76,167 C 76,172 72,176 67,176 C 82,184 92,202 90,224 C 88,250 68,266 42,264 C 16,262 0,244 2,218 C 4,194 20,178 42,178 C 38,174 40,167 44,164 Z" fill="url(#mch_bundle)"/>
    <path d="M 48,160 L 54,178 L 60,166" fill="none" stroke="#2c3a48" stroke-width="2"/>
    <path d="M 8,206 C 24,194 56,190 84,202" fill="none" stroke="#2c3a48" stroke-width="2"/>
    <path d="M 4,228 C 22,216 58,212 88,226" fill="none" stroke="#2c3a48" stroke-width="2"/>
    <path d="M 16,248 C 34,240 60,238 80,246" fill="none" stroke="#2c3a48" stroke-width="2"/>
  </g>
  <path d="M 22,190 C 32,182 50,180 60,186 C 50,194 32,196 22,190 Z" fill="#7d90a4" opacity="0.65"/>

  <!-- torso / jeogori -->
  <path d="M 22,320 L 26,276 C 32,244 58,226 90,216 L 104,210 C 113,205 127,205 136,210 L 150,216 C 182,226 206,244 212,276 L 216,320 Z" fill="url(#mch_robe)" stroke="#2b1d0c" stroke-width="3"/>
  <path d="M 28,276 C 34,248 56,232 86,221 L 98,216 C 88,230 80,254 78,278 L 74,320 L 24,320 Z" fill="#c9a45a" opacity="0.35"/>
  <path d="M 210,276 C 204,248 184,232 156,221 L 144,216 C 154,232 162,256 164,280 L 168,320 L 214,320 Z" fill="#3f3210" opacity="0.4"/>
  <path d="M 96,246 C 94,270 94,296 96,320" fill="none" stroke="#5f4718" stroke-width="2" opacity="0.7"/>
  <path d="M 148,250 C 150,272 151,296 151,320" fill="none" stroke="#5f4718" stroke-width="2" opacity="0.7"/>
  <!-- pack strap across chest -->
  <path d="M 80,220 C 100,248 116,284 124,320 L 102,320 C 94,286 80,254 62,232 Z" fill="#4a3212" stroke="#2b1d0c" stroke-width="2.5"/>
  <path d="M 82,226 C 98,250 110,282 117,312" fill="none" stroke="#6d5220" stroke-width="2"/>
  <!-- collar (crossed git) -->
  <path d="M 100,212 C 108,228 120,244 136,258 L 152,242 C 136,230 124,220 116,208 Z" fill="#e8dcc0" stroke="#2b1d0c" stroke-width="2.5"/>
  <path d="M 138,210 C 130,226 118,240 104,252 L 90,236 C 104,227 116,218 124,207 Z" fill="#f2ead4" stroke="#2b1d0c" stroke-width="2.5"/>

  <!-- neck -->
  <path d="M 103,162 L 103,200 C 112,210 128,210 136,198 L 136,160 Z" fill="#dcab78" stroke="#2b1d0c" stroke-width="2.5"/>
  <path d="M 103,166 C 114,178 126,178 136,166 L 136,160 L 103,160 Z" fill="#a9784a"/>

  <!-- head -->
  <g>
    <path d="M 84,120 C 84,94 98,80 118,80 C 140,80 152,94 152,120 C 151,141 144,158 128,168 C 115,174 99,166 91,148 C 87,139 84,129 84,120 Z" fill="url(#mch_skin)" stroke="#2b1d0c" stroke-width="3"/>
    <!-- side shading (light from upper left) -->
    <path d="M 142,96 C 149,106 152,116 151,126 C 150,144 143,158 128,167 C 124,169 120,169 116,168 C 131,158 139,142 141,124 C 142,114 142,104 142,96 Z" fill="#c08c58" opacity="0.5"/>
    <path d="M 91,148 C 96,158 107,166 117,165 C 111,169 101,168 95,160 C 93,156 92,152 91,148 Z" fill="#c08c58" opacity="0.4"/>
    <!-- ear -->
    <path d="M 149,122 C 157,118 161,126 155,134 C 152,138 148,138 147,134 Z" fill="#e5b585" stroke="#2b1d0c" stroke-width="2.5"/>
    <path d="M 151,125 C 154,125 154,130 151,131" fill="none" stroke="#a9784a" stroke-width="1.5"/>
    <!-- sideburns tucked by ears -->
    <path d="M 85,112 C 84,122 86,132 90,140 C 92,134 92,120 91,110 Z" fill="#3a2812"/>
    <path d="M 146,110 C 148,118 148,126 146,133 C 150,126 151,116 150,108 Z" fill="#3a2812"/>
    <!-- brows: viewer-left raised (sly) -->
    <path d="M 94,109 C 99,101 110,99 116,104 C 110,103 100,105 96,111 Z" fill="#33230f"/>
    <path d="M 126,110 C 132,106 141,106 146,111 C 141,110 132,110 128,113 Z" fill="#33230f"/>
    <!-- eyes: half-lidded crescents, pupils to the side -->
    <path d="M 96,119 C 100,115 109,115 113,119 C 109,123 100,123 96,119 Z" fill="#fdf6e8" stroke="#2a1a0a" stroke-width="1.5"/>
    <circle cx="103" cy="119" r="3.2" fill="#2e1c0c"/>
    <circle cx="102" cy="118" r="1" fill="#fff" opacity="0.8"/>
    <path d="M 94,118 C 99,113 110,113 114,118" fill="none" stroke="#2a1a0a" stroke-width="2.4"/>
    <path d="M 127,120 C 131,116 139,116 143,120 C 139,124 131,124 127,120 Z" fill="#fdf6e8" stroke="#2a1a0a" stroke-width="1.5"/>
    <circle cx="133" cy="120" r="3.2" fill="#2e1c0c"/>
    <circle cx="132" cy="119" r="1" fill="#fff" opacity="0.8"/>
    <path d="M 125,119 C 130,114 140,114 144,119" fill="none" stroke="#2a1a0a" stroke-width="2.4"/>
    <!-- crow's feet -->
    <path d="M 92,122 C 90,124 89,126 89,129" fill="none" stroke="#b07f52" stroke-width="1.5"/>
    <path d="M 146,121 C 148,123 149,126 149,129" fill="none" stroke="#b07f52" stroke-width="1.5"/>
    <!-- nose (3/4 left) -->
    <path d="M 119,117 C 116,126 113,134 110,140 C 113,144 118,145 122,143" fill="none" stroke="#8a5f38" stroke-width="2.2"/>
    <path d="M 110,140 C 108,141 107,142 107,143" fill="none" stroke="#5c3c20" stroke-width="1.8"/>
    <path d="M 121,137 C 124,139 125,141 124,143" fill="none" stroke="#b07f52" stroke-width="1.5"/>
    <!-- sly smirk, curled up on viewer-right -->
    <path d="M 102,151 C 110,157 123,157 133,148 C 128,156 112,160 102,151 Z" fill="#7a3c28" stroke="#2a1a0a" stroke-width="1.8"/>
    <path d="M 133,148 C 135,146 137,145 138,143" fill="none" stroke="#2a1a0a" stroke-width="1.8"/>
    <path d="M 108,160 C 114,163 122,162 127,158" fill="none" stroke="#b07f52" stroke-width="1.6"/>
    <!-- thin mustache + chin tuft -->
    <path d="M 107,147 C 104,149 101,152 100,156 C 103,152 106,150 109,149 Z" fill="#3a2812"/>
    <path d="M 126,146 C 130,147 133,150 134,154 C 132,150 129,148 125,148 Z" fill="#3a2812"/>
    <path d="M 112,167 C 116,170 121,170 125,166 C 123,173 115,173 112,167 Z" fill="#3a2812"/>
    <!-- cheek warmth -->
    <ellipse cx="98" cy="134" rx="6" ry="4" fill="#d98a5a" opacity="0.3"/>
    <ellipse cx="140" cy="133" rx="5" ry="4" fill="#d98a5a" opacity="0.25"/>
  </g>

  <!-- paeraengi hat, low on the brow -->
  <g>
    <path d="M 118,34 C 146,34 166,56 168,86 L 68,86 C 70,56 90,34 118,34 Z" fill="url(#mch_hat)" stroke="#2b1d0c" stroke-width="3"/>
    <path d="M 84,48 C 96,40 110,36 122,37 C 104,40 92,46 84,54 Z" fill="#f0dca0" opacity="0.8"/>
    <path d="M 76,66 C 100,57 136,57 160,66" fill="none" stroke="#8a6a2a" stroke-width="1.8" opacity="0.8"/>
    <path d="M 72,76 C 100,66 136,66 164,76" fill="none" stroke="#8a6a2a" stroke-width="1.8" opacity="0.8"/>
    <path d="M 100,36 C 96,50 94,66 94,84" fill="none" stroke="#8a6a2a" stroke-width="1.5" opacity="0.6"/>
    <path d="M 136,36 C 140,50 142,66 142,84" fill="none" stroke="#8a6a2a" stroke-width="1.5" opacity="0.6"/>
    <ellipse cx="118" cy="88" rx="66" ry="14" fill="#c9a45a" stroke="#2b1d0c" stroke-width="3"/>
    <path d="M 56,86 C 78,79 158,79 180,86 C 158,83 78,83 56,86 Z" fill="#e2c47c"/>
    <ellipse cx="118" cy="90" rx="48" ry="8" fill="#7a5c22" opacity="0.55"/>
    <!-- fluffy cotton bobbles (bobusang mark) -->
    <g stroke="#2b1d0c" stroke-width="2.5">
      <path d="M 94,46 C 88,46 85,40 89,36 C 87,31 92,26 97,28 C 99,23 107,23 109,28 C 114,26 118,31 116,36 C 120,40 117,46 111,46 C 108,50 97,50 94,46 Z" fill="#f5f0e0"/>
      <path d="M 122,40 C 117,40 115,34 118,31 C 117,26 122,22 126,24 C 128,20 135,21 136,25 C 140,24 143,29 141,33 C 144,36 141,41 137,41 C 134,44 125,44 122,40 Z" fill="#efe8d4"/>
    </g>
    <circle cx="95" cy="33" r="3.5" fill="#ffffff" opacity="0.9"/>
    <circle cx="123" cy="29" r="2.8" fill="#ffffff" opacity="0.9"/>
  </g>

  <!-- abacus with gripping hand, lower right -->
  <g transform="rotate(-8 176 264)">
    <!-- sleeve + wrist behind frame -->
    <path d="M 158,326 C 158,306 168,292 184,288 L 206,290 C 220,298 226,312 227,330 Z" fill="url(#mch_robe)" stroke="#2b1d0c" stroke-width="3"/>
    <path d="M 168,322 C 170,308 176,298 186,293" fill="none" stroke="#5f4718" stroke-width="2"/>
    <path d="M 186,290 L 188,278 L 204,278 L 205,292 Z" fill="#e8b988" stroke="#8a5f38" stroke-width="2"/>
    <!-- frame -->
    <rect x="136" y="238" width="76" height="48" rx="5" fill="#6b4520" stroke="#2b1d0c" stroke-width="3"/>
    <rect x="142" y="244" width="64" height="36" fill="#c9a45a" stroke="#3a2812" stroke-width="1.5"/>
    <rect x="142" y="255" width="64" height="3.5" fill="#4a2f12"/>
    <g stroke="#8a6a2a" stroke-width="1.5">
      <line x1="149" y1="244" x2="149" y2="280"/>
      <line x1="162" y1="244" x2="162" y2="280"/>
      <line x1="175" y1="244" x2="175" y2="280"/>
      <line x1="188" y1="244" x2="188" y2="280"/>
      <line x1="200" y1="244" x2="200" y2="280"/>
    </g>
    <g fill="#a05a1c" stroke="#3a2812" stroke-width="1">
      <ellipse cx="149" cy="249" rx="4.6" ry="3.4"/><ellipse cx="162" cy="249" rx="4.6" ry="3.4"/><ellipse cx="175" cy="249" rx="4.6" ry="3.4"/><ellipse cx="188" cy="249" rx="4.6" ry="3.4"/><ellipse cx="200" cy="249" rx="4.6" ry="3.4"/>
      <ellipse cx="149" cy="264" rx="4.6" ry="3.4"/><ellipse cx="162" cy="264" rx="4.6" ry="3.4"/><ellipse cx="175" cy="264" rx="4.6" ry="3.4"/><ellipse cx="188" cy="264" rx="4.6" ry="3.4"/><ellipse cx="200" cy="264" rx="4.6" ry="3.4"/>
      <ellipse cx="149" cy="272" rx="4.6" ry="3.4"/><ellipse cx="162" cy="272" rx="4.6" ry="3.4"/><ellipse cx="175" cy="272" rx="4.6" ry="3.4"/><ellipse cx="188" cy="272" rx="4.6" ry="3.4"/><ellipse cx="200" cy="272" rx="4.6" ry="3.4"/>
    </g>
    <g fill="#d98a3a" opacity="0.8">
      <circle cx="147" cy="248" r="1.2"/><circle cx="160" cy="248" r="1.2"/><circle cx="173" cy="248" r="1.2"/><circle cx="186" cy="248" r="1.2"/><circle cx="198" cy="248" r="1.2"/>
    </g>
    <!-- thumb gripping over front of frame -->
    <path d="M 208,270 C 214,262 220,262 221,269 C 222,276 216,283 208,284 C 203,284 201,279 204,275 Z" fill="#e8b988" stroke="#8a5f38" stroke-width="2"/>
    <path d="M 206,275 C 209,272 213,271 216,272" fill="none" stroke="#c08c58" stroke-width="1.4"/>
  </g>
</svg>`;
