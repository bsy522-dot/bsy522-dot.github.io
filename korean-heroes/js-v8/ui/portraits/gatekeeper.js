export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="gk-bg" cx="50%" cy="38%" r="85%">
      <stop offset="0%" stop-color="#e2e2e2"/>
      <stop offset="45%" stop-color="#b8b8b8"/>
      <stop offset="100%" stop-color="#5f5f63"/>
    </radialGradient>
    <radialGradient id="gk-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f4f0e6" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#e8e2d2" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#e8e2d2" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gk-leather" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#8d6a3f"/>
      <stop offset="55%" stop-color="#75542f"/>
      <stop offset="100%" stop-color="#573b1f"/>
    </linearGradient>
    <linearGradient id="gk-tunic" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#6d6d74"/>
      <stop offset="60%" stop-color="#54545a"/>
      <stop offset="100%" stop-color="#3f3f45"/>
    </linearGradient>
    <linearGradient id="gk-blade" x1="0" y1="0" x2="1" y2="0.2">
      <stop offset="0%" stop-color="#eef0f2"/>
      <stop offset="45%" stop-color="#b9bec4"/>
      <stop offset="100%" stop-color="#7c8288"/>
    </linearGradient>
    <linearGradient id="gk-shaft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a5794a"/>
      <stop offset="50%" stop-color="#845c33"/>
      <stop offset="100%" stop-color="#5e3f20"/>
    </linearGradient>
    <radialGradient id="gk-vig" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="72%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1c1c20" stop-opacity="0.5"/>
    </radialGradient>
  </defs>

  <rect width="240" height="320" fill="url(#gk-bg)"/>

  <!-- 목책 문 모티프 (은은한 배경) -->
  <g opacity="0.22" fill="#3c3c40">
    <path d="M14 108 L22 92 L30 108 L30 320 L14 320 Z"/>
    <path d="M210 108 L218 92 L226 108 L226 320 L210 320 Z"/>
    <rect x="10" y="112" width="220" height="10" rx="2"/>
    <path d="M44 156 L50 140 L56 156 L56 320 L44 320 Z"/>
    <path d="M70 168 L76 152 L82 168 L82 320 L70 320 Z"/>
    <path d="M158 168 L164 152 L170 168 L170 320 L158 320 Z"/>
    <path d="M184 156 L190 140 L196 156 L196 320 L184 320 Z"/>
    <rect x="36" y="196" width="66" height="8" rx="2"/>
    <rect x="138" y="196" width="66" height="8" rx="2"/>
  </g>
  <ellipse cx="120" cy="130" rx="104" ry="102" fill="url(#gk-glow)"/>

  <!-- 장창 -->
  <g>
    <path d="M52 320 L44 320 L57 90 L65 90 Z" fill="#3a2a16"/>
    <path d="M51 318 L46 318 L58 92 L63 92 Z" fill="url(#gk-shaft)"/>
    <path d="M59 300 L61 120" stroke="#c69a63" stroke-width="1.6" opacity="0.8"/>
    <rect x="54" y="76" width="14" height="18" rx="3" fill="#8a8f96" stroke="#33363b" stroke-width="2"/>
    <path d="M61 74 C 46 56, 47 32, 60 8 C 73 32, 75 56, 61 74 Z" fill="url(#gk-blade)" stroke="#33363b" stroke-width="2.4"/>
    <path d="M60 14 L61 70" stroke="#6d7379" stroke-width="1.8"/>
    <path d="M56 30 C 53 44, 54 56, 58 66" stroke="#f6f8fa" stroke-width="1.6" fill="none" opacity="0.9"/>
    <path d="M55 100 C 53 108, 52 114, 53 120 M60 101 C 59 109, 59 115, 60 121 M66 100 C 68 108, 69 114, 68 120" stroke="#a03028" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M56 101 C 55 107, 54 112, 55 117" stroke="#c8504a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <rect x="53" y="93" width="16" height="8" rx="3" fill="#7c2620" stroke="#33363b" stroke-width="1.6"/>
  </g>

  <!-- 몸통 실루엣 -->
  <path d="M30 320 C 34 262, 52 232, 86 218 C 98 212, 106 206, 110 198 L 132 198 C 136 206, 144 212, 156 218 C 190 232, 206 262, 210 320 Z"
        fill="url(#gk-tunic)" stroke="#23201c" stroke-width="3"/>
  <path d="M156 218 C 178 228, 194 250, 202 278 L 210 320 L 168 320 C 170 280, 166 246, 156 218 Z" fill="#35353b" opacity="0.6"/>
  <path d="M86 218 C 72 224, 60 236, 52 254 C 62 242, 76 232, 92 226 Z" fill="#83838c" opacity="0.7"/>

  <!-- 목 -->
  <path d="M108 172 C 108 184, 106 191, 102 196 C 110 205, 132 205, 140 196 C 135 191, 133 184, 133 172 Z" fill="#eab884" stroke="#23201c" stroke-width="2.6"/>
  <path d="M108 174 C 110 184, 121 189, 133 184 C 133 180, 133 176, 133 172 L 108 172 Z" fill="#c98f5e" opacity="0.85"/>

  <!-- 저고리 깃 -->
  <path d="M110 196 C 108 216, 100 232, 88 242 L 106 250 C 116 239, 122 226, 124 210 Z" fill="#77777f" stroke="#23201c" stroke-width="2.2"/>
  <path d="M132 196 C 134 216, 142 232, 154 242 L 136 250 C 126 239, 120 226, 118 210 Z" fill="#68686f" stroke="#23201c" stroke-width="2.2"/>
  <path d="M111 199 C 109 216, 102 230, 92 240 M131 199 C 133 216, 140 230, 150 240" stroke="#c9c9ce" stroke-width="2.2" fill="none"/>

  <!-- 가죽 흉갑 -->
  <path d="M78 248 C 100 238, 142 238, 164 248 L 170 320 L 72 320 Z" fill="url(#gk-leather)" stroke="#23201c" stroke-width="3"/>
  <path d="M76 268 L 166 268 M74 290 L 168 290" stroke="#4a3018" stroke-width="2.6"/>
  <g stroke="#3c2712" stroke-width="1.8">
    <path d="M90 252 L90 264 M108 248 L108 264 M126 247 L126 264 M144 249 L144 264"/>
    <path d="M84 272 L84 286 M102 272 L102 286 M120 272 L120 286 M138 272 L138 286 M156 272 L156 286"/>
    <path d="M90 294 L90 308 M108 294 L108 308 M126 294 L126 308 M144 294 L144 308"/>
  </g>
  <path d="M80 250 C 100 241, 144 241, 160 246 L 158 252 C 140 246, 100 247, 82 254 Z" fill="#a8845a" opacity="0.85"/>
  <path d="M150 252 L 164 252 L 169 316 L 156 316 Z" fill="#452c14" opacity="0.5"/>
  <rect x="112" y="242" width="18" height="10" rx="3" fill="#9c7748" stroke="#3c2712" stroke-width="1.8"/>

  <!-- 왼팔 소매 (견갑 아래) -->
  <path d="M64 244 C 72 236, 82 231, 92 231 C 96 240, 93 250, 85 258 L 71 262 C 65 257, 62 251, 64 244 Z" fill="url(#gk-tunic)" stroke="#23201c" stroke-width="2.4"/>

  <!-- 어깨 가죽 견갑 -->
  <path d="M62 234 C 72 218, 92 212, 104 216 C 102 230, 94 242, 80 248 C 70 246, 64 242, 62 234 Z" fill="url(#gk-leather)" stroke="#23201c" stroke-width="2.6"/>
  <path d="M68 226 C 78 217, 92 214, 101 218" stroke="#a8845a" stroke-width="2.4" fill="none"/>
  <path d="M180 234 C 170 218, 150 212, 138 216 C 140 230, 148 242, 162 248 C 172 246, 178 242, 180 234 Z" fill="url(#gk-leather)" stroke="#23201c" stroke-width="2.6"/>
  <path d="M174 230 C 164 219, 150 216, 141 219" stroke="#5c3f22" stroke-width="2.4" fill="none"/>
  <path d="M162 248 C 152 241, 145 231, 141 220" stroke="#3c2712" stroke-width="1.6" fill="none" opacity="0.7"/>

  <!-- 창 잡은 손 -->
  <path d="M46 246 C 44 236, 50 230, 60 230 C 70 230, 76 236, 75 246 C 74 254, 68 258, 60 258 C 52 258, 47 253, 46 246 Z" fill="#eab884" stroke="#23201c" stroke-width="2.6"/>
  <path d="M50 236 L 72 236 M49 242 L 73 242 M50 248 L 72 248" stroke="#b57845" stroke-width="1.8"/>
  <path d="M47 250 C 52 256, 66 257, 72 251" stroke="#c98f5e" stroke-width="1.8" fill="none"/>
  <path d="M44 258 L 76 258 L 74 268 L 46 268 Z" fill="#75542f" stroke="#23201c" stroke-width="2.2"/>

  <!-- 얼굴 -->
  <path d="M92 128 C 92 106, 102 92, 121 91 C 141 92, 150 106, 150 127 C 150 146, 144 159, 133 169 C 127 176, 117 178, 110 174 C 100 168, 93 148, 92 128 Z"
        fill="#f2c493" stroke="#23201c" stroke-width="2.8"/>
  <path d="M144 118 C 148 132, 145 150, 135 164 C 131 170, 126 174, 121 175 C 128 176, 134 173, 139 166 C 147 155, 151 138, 148 122 Z" fill="#d19a66" opacity="0.9"/>
  <path d="M96 116 C 94 128, 96 142, 102 154 C 98 140, 97 128, 99 116 Z" fill="#ffdcae" opacity="0.9"/>

  <!-- 귀 -->
  <path d="M147 128 C 154 124, 157 130, 154 138 C 152 144, 148 146, 145 144 Z" fill="#eab884" stroke="#23201c" stroke-width="2.2"/>
  <path d="M150 132 C 152 133, 152 137, 149 140" stroke="#b57845" stroke-width="1.6" fill="none"/>

  <!-- 상투 + 머리카락 -->
  <path d="M112 74 C 109 62, 114 53, 122 53 C 130 53, 135 62, 132 74 Z" fill="#26262c" stroke="#141418" stroke-width="2.2"/>
  <path d="M110 71 L 134 71 L 132 81 L 112 81 Z" fill="#5b4630" stroke="#141418" stroke-width="1.8"/>
  <path d="M90 122 C 86 96, 98 76, 121 74 C 144 76, 155 96, 152 122 C 150 110, 146 103, 141 99 C 143 106, 143 112, 142 116 C 138 106, 132 100, 124 98 C 115 100, 106 106, 101 116 C 100 110, 101 104, 103 99 C 97 104, 92 111, 90 122 Z"
        fill="#26262c" stroke="#141418" stroke-width="2.6"/>
  <path d="M104 84 C 110 79, 118 77, 126 78" stroke="#4b4b56" stroke-width="2.4" fill="none" opacity="0.9"/>

  <!-- 머리띠 -->
  <path d="M91 108 C 100 100, 140 100, 151 108 L 151 118 C 140 109, 100 109, 91 118 Z" fill="#8a6a48" stroke="#23201c" stroke-width="2.2"/>
  <path d="M93 108 C 104 102, 138 102, 149 108" stroke="#b08d5f" stroke-width="2.2" fill="none"/>

  <!-- 눈썹 (성실·다부짐) -->
  <path d="M96 124 C 102 120, 110 119, 115 121" stroke="#1d1d22" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  <path d="M126 121 C 131 119, 139 120, 144 124" stroke="#1d1d22" stroke-width="3.2" fill="none" stroke-linecap="round"/>

  <!-- 눈 -->
  <path d="M98 133 C 102 129, 110 129, 113 133 C 110 137, 102 137, 98 133 Z" fill="#fdfaf4" stroke="#23201c" stroke-width="1.8"/>
  <circle cx="106" cy="133" r="3.1" fill="#2a2018"/>
  <circle cx="105" cy="132" r="1.1" fill="#ffffff"/>
  <path d="M127 133 C 130 129, 138 129, 142 133 C 138 137, 131 137, 127 133 Z" fill="#fdfaf4" stroke="#23201c" stroke-width="1.8"/>
  <circle cx="134" cy="133" r="3.1" fill="#2a2018"/>
  <circle cx="133" cy="132" r="1.1" fill="#ffffff"/>
  <path d="M98 130 C 103 127, 110 127, 114 130 M126 130 C 131 127, 138 127, 143 130" stroke="#23201c" stroke-width="1.6" fill="none"/>

  <!-- 코 -->
  <path d="M118 132 C 117 140, 115 146, 112 150 C 114 153, 118 153, 120 151" stroke="#a06a3a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M120 151 C 122 152, 124 151, 125 149" stroke="#c98f5e" stroke-width="1.6" fill="none" stroke-linecap="round"/>

  <!-- 입 (옅은 미소) -->
  <path d="M106 160 C 112 165, 122 165, 128 159" stroke="#7c3a26" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M110 166 C 114 168, 120 168, 124 166" stroke="#c98f5e" stroke-width="1.6" fill="none" stroke-linecap="round"/>

  <!-- 볼 홍조 -->
  <ellipse cx="101" cy="148" rx="6" ry="3.4" fill="#e0906a" opacity="0.4"/>
  <ellipse cx="138" cy="147" rx="5.4" ry="3.2" fill="#e0906a" opacity="0.35"/>

  <rect width="240" height="320" fill="url(#gk-vig)"/>
</svg>`;
