export default `<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="hwBg" cx="50%" cy="38%" r="85%">
      <stop offset="0%" stop-color="#6a1c0c"/>
      <stop offset="55%" stop-color="#38100a"/>
      <stop offset="100%" stop-color="#1a0605"/>
    </radialGradient>
    <radialGradient id="hwGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb050" stop-opacity="0.5"/>
      <stop offset="55%" stop-color="#ff8030" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ff8030" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hwVig" cx="50%" cy="46%" r="72%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="72%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.5"/>
    </radialGradient>
    <linearGradient id="hwArmor" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#a83828"/>
      <stop offset="55%" stop-color="#8a2a2a"/>
      <stop offset="100%" stop-color="#5e1712"/>
    </linearGradient>
    <linearGradient id="hwFlameA" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#d84315"/>
      <stop offset="45%" stop-color="#ff9020"/>
      <stop offset="100%" stop-color="#ffe680"/>
    </linearGradient>
    <linearGradient id="hwBlade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8a5a1a"/>
      <stop offset="45%" stop-color="#f0c860"/>
      <stop offset="60%" stop-color="#fff2c0"/>
      <stop offset="100%" stop-color="#b8862a"/>
    </linearGradient>
  </defs>

  <rect width="240" height="320" fill="url(#hwBg)"/>

  <!-- background flame motif (subtle) -->
  <path d="M2,320 C14,268 0,238 20,196 C34,238 26,272 44,320 Z" fill="#ff7a28" opacity="0.09"/>
  <path d="M238,320 C226,266 240,236 222,194 C208,238 216,272 198,320 Z" fill="#ff7a28" opacity="0.09"/>
  <path d="M28,254 C22,228 32,214 26,192 C40,208 40,232 46,252 Z" fill="#ff7a28" opacity="0.07"/>
  <circle cx="118" cy="118" r="86" fill="none" stroke="#ffb050" stroke-opacity="0.15" stroke-width="8"/>
  <circle cx="118" cy="118" r="72" fill="none" stroke="#ffd080" stroke-opacity="0.10" stroke-width="2"/>
  <ellipse cx="118" cy="122" rx="108" ry="118" fill="url(#hwGlow)"/>

  <!-- embers -->
  <circle cx="58" cy="70" r="2.2" fill="#ffb050" opacity="0.7"/>
  <circle cx="182" cy="46" r="1.8" fill="#ffcf70" opacity="0.7"/>
  <circle cx="44" cy="148" r="1.5" fill="#ff9a3c" opacity="0.6"/>
  <circle cx="210" cy="140" r="2.0" fill="#ffb050" opacity="0.55"/>
  <circle cx="70" cy="34" r="1.4" fill="#ffe08a" opacity="0.7"/>
  <circle cx="160" cy="26" r="1.6" fill="#ffcf70" opacity="0.6"/>
  <circle cx="30" cy="102" r="1.8" fill="#ff9a3c" opacity="0.5"/>

  <!-- cloak silhouette -->
  <path d="M30,320 C28,256 52,206 92,192 L148,192 C188,206 212,256 210,320 Z" fill="#2c0a0a" stroke="#180404" stroke-width="2"/>
  <path d="M38,218 C30,204 34,192 30,180 C44,188 52,200 54,212 Z" fill="#2c0a0a" stroke="#180404" stroke-width="1.5"/>
  <path d="M202,214 C210,200 206,190 210,178 C196,186 188,198 186,210 Z" fill="#2c0a0a" stroke="#180404" stroke-width="1.5"/>

  <!-- torso armor -->
  <path d="M44,320 C42,258 60,210 92,196 C100,192 104,190 112,190 L128,190 C136,190 142,193 150,197 C182,212 198,260 196,320 Z" fill="url(#hwArmor)" stroke="#240707" stroke-width="2.5"/>
  <path d="M150,197 C182,212 198,260 196,320 L166,320 C170,266 164,226 148,204 Z" fill="#4e120e" opacity="0.75"/>
  <path d="M92,196 C74,206 62,232 56,262 C64,240 76,220 96,210 Z" fill="#c05038" opacity="0.55"/>
  <!-- lamellar rows -->
  <path d="M52,282 C82,270 158,270 188,282" fill="none" stroke="#3c0e0a" stroke-width="2.5"/>
  <path d="M50,304 C82,290 160,290 192,304" fill="none" stroke="#3c0e0a" stroke-width="2.5"/>
  <circle cx="70" cy="277" r="1.7" fill="#d9a038"/><circle cx="94" cy="272" r="1.7" fill="#d9a038"/>
  <circle cx="120" cy="271" r="1.7" fill="#d9a038"/><circle cx="146" cy="272" r="1.7" fill="#d9a038"/>
  <circle cx="170" cy="277" r="1.7" fill="#d9a038"/>
  <circle cx="68" cy="298" r="1.7" fill="#d9a038"/><circle cx="94" cy="292" r="1.7" fill="#d9a038"/>
  <circle cx="120" cy="291" r="1.7" fill="#d9a038"/><circle cx="146" cy="292" r="1.7" fill="#d9a038"/>
  <circle cx="172" cy="298" r="1.7" fill="#d9a038"/>
  <!-- chest emblem -->
  <circle cx="120" cy="245" r="22" fill="#5e1410" stroke="#d9a038" stroke-width="2.5"/>
  <circle cx="120" cy="245" r="22" fill="none" stroke="#240707" stroke-width="1" opacity="0.6"/>
  <path d="M120,229 C112,239 109,249 114,258 C116,252 119,250 118,244 C122,252 128,253 126,260 C133,254 133,241 126,235 C126,240 123,240 122,236 C121,233 121,231 120,229 Z" fill="url(#hwFlameA)" stroke="#8a5a1a" stroke-width="1"/>

  <!-- collar -->
  <path d="M94,198 Q120,212 148,196 L152,208 Q120,226 90,210 Z" fill="#4a100c" stroke="#240707" stroke-width="2"/>
  <path d="M93,204 Q120,219 149,202" fill="none" stroke="#d9a038" stroke-width="1.5" opacity="0.85"/>

  <!-- left pauldron (viewer left) -->
  <path d="M36,220 C40,200 60,190 82,196 C90,210 88,226 80,234 C60,240 42,236 36,220 Z" fill="url(#hwArmor)" stroke="#240707" stroke-width="2.2"/>
  <path d="M38,224 C52,236 68,238 79,231" fill="none" stroke="#d9a038" stroke-width="2" opacity="0.9"/>
  <path d="M42,204 C52,196 66,194 78,199" fill="none" stroke="#c05038" stroke-width="2.5" opacity="0.7"/>
  <path d="M40,238 C52,248 68,250 78,244 C80,252 76,262 68,266 C52,268 42,258 40,238 Z" fill="#7a2018" stroke="#240707" stroke-width="2.2"/>
  <path d="M44,252 C54,260 66,261 74,256" fill="none" stroke="#d9a038" stroke-width="1.6" opacity="0.8"/>
  <path d="M56,196 C50,186 54,176 52,166 C58,174 60,180 64,172 C66,182 62,190 64,196 Z" fill="#f57f17" stroke="#a83808" stroke-width="1"/>
  <path d="M57,193 C54,186 56,180 55,174 C59,180 59,184 61,180 C62,187 59,191 60,194 Z" fill="#ffd54f"/>

  <!-- right pauldron -->
  <path d="M204,216 C200,198 182,190 160,196 C152,210 154,226 162,234 C182,240 198,232 204,216 Z" fill="url(#hwArmor)" stroke="#240707" stroke-width="2.2"/>
  <path d="M202,220 C188,232 172,234 163,228" fill="none" stroke="#d9a038" stroke-width="2" opacity="0.9"/>
  <path d="M196,202 C186,195 172,193 162,198" fill="none" stroke="#c05038" stroke-width="2.5" opacity="0.6"/>
  <path d="M184,196 C190,186 186,176 188,166 C182,174 180,180 176,172 C174,182 178,190 176,196 Z" fill="#f57f17" stroke="#a83808" stroke-width="1"/>
  <!-- right forearm -->
  <path d="M158,230 C164,244 168,250 166,258 L192,258 C192,248 186,238 176,230 Z" fill="url(#hwArmor)" stroke="#240707" stroke-width="2"/>

  <!-- spear (behind hand, in front of shoulder) -->
  <g transform="rotate(7 190 160)">
    <rect x="186" y="46" width="8" height="290" fill="#4a1a10" stroke="#240707" stroke-width="1.5"/>
    <rect x="187.5" y="46" width="2.2" height="290" fill="#8a4830" opacity="0.85"/>
    <!-- flame aura around blade -->
    <path d="M181,54 C172,40 174,22 180,8 C182,18 186,20 185,10 C190,22 187,40 189,52 Z" fill="#ff9020" opacity="0.5"/>
    <path d="M199,50 C208,36 206,20 201,6 C199,16 195,18 196,9 C191,22 193,38 192,50 Z" fill="#ff9020" opacity="0.5"/>
    <!-- blade -->
    <path d="M190,2 C198,14 201,34 196,52 L190,58 L184,52 C179,34 182,14 190,2 Z" fill="url(#hwBlade)" stroke="#6a4210" stroke-width="1.5"/>
    <path d="M190,6 L190,53" stroke="#fff2c0" stroke-width="1"/>
    <rect x="184.5" y="56" width="11" height="12" rx="2" fill="#d9a038" stroke="#6a4210" stroke-width="1.2"/>
    <!-- red tassel -->
    <path d="M185,68 C170,78 164,98 170,114 C176,102 180,90 184,80 Z" fill="#c62828" stroke="#7a1010" stroke-width="1"/>
    <path d="M195,68 C208,80 212,98 206,112 C201,100 196,88 192,78 Z" fill="#c62828" stroke="#7a1010" stroke-width="1"/>
    <path d="M187,68 C183,84 182,98 186,110 C188,96 191,82 193,68 Z" fill="#e53935" stroke="#7a1010" stroke-width="1"/>
  </g>

  <!-- gripping fist -->
  <ellipse cx="180" cy="251" rx="14" ry="15" fill="#a83828" stroke="#240707" stroke-width="2"/>
  <rect x="167" y="239" width="25" height="6.5" rx="3.2" fill="#b84a3a" stroke="#3c0e0a" stroke-width="1.2"/>
  <rect x="166" y="246.5" width="26" height="6.5" rx="3.2" fill="#a83828" stroke="#3c0e0a" stroke-width="1.2"/>
  <rect x="166" y="254" width="26" height="6.5" rx="3.2" fill="#b84a3a" stroke="#3c0e0a" stroke-width="1.2"/>
  <rect x="168" y="261.5" width="23" height="6" rx="3" fill="#a83828" stroke="#3c0e0a" stroke-width="1.2"/>
  <circle cx="172" cy="243" r="1.6" fill="#d9a038"/>

  <!-- neck -->
  <path d="M104,160 L104,198 C112,206 128,206 136,198 L136,156 C126,168 114,168 104,160 Z" fill="#e8a878" stroke="#5a2a18" stroke-width="1.5"/>
  <path d="M104,160 L104,176 C114,182 128,180 136,172 L136,156 C126,168 114,168 104,160 Z" fill="#b87048" opacity="0.8"/>

  <!-- head -->
  <path d="M86,112 C84,140 90,158 102,168 C108,173 118,172 126,166 C138,156 144,138 142,110 C140,90 128,80 113,80 C97,80 88,94 86,112 Z" fill="#f2b184" stroke="#4a2010" stroke-width="2"/>
  <!-- face shading -->
  <path d="M142,110 C144,138 138,156 126,166 C132,152 136,132 134,110 C134,98 130,88 122,83 C134,85 141,96 142,110 Z" fill="#c87850" opacity="0.75"/>
  <path d="M88,116 C90,104 96,94 106,90 C98,98 94,108 93,120 Z" fill="#ffd0a8" opacity="0.6"/>
  <path d="M98,148 C102,154 110,156 116,154 C112,160 104,160 98,155 Z" fill="#c87850" opacity="0.5"/>
  <!-- ear -->
  <path d="M84,126 C79,124 78,132 82,138 C85,142 88,140 88,134 Z" fill="#e8a878" stroke="#5a2a18" stroke-width="1.2"/>
  <!-- fierce brows -->
  <path d="M88,119 L108,126 L107,131 L87,124 Z" fill="#3a0d08"/>
  <path d="M122,126 L144,116 L146,121 L123,131 Z" fill="#3a0d08"/>
  <!-- eyes -->
  <path d="M92,132 L106,129 L104,136 L94,136 Z" fill="#fff0dc"/>
  <circle cx="100" cy="132.5" r="3" fill="#ff9a20" stroke="#a83808" stroke-width="1"/>
  <circle cx="100" cy="132.5" r="1.3" fill="#1a0602"/>
  <path d="M91,131 L107,128" stroke="#2a0a06" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M122,129 L138,126 L136,134 L124,134 Z" fill="#fff0dc"/>
  <circle cx="130" cy="130.5" r="3.2" fill="#ff9a20" stroke="#a83808" stroke-width="1"/>
  <circle cx="130" cy="130.5" r="1.4" fill="#1a0602"/>
  <path d="M121,128 L139,125" stroke="#2a0a06" stroke-width="2.2" stroke-linecap="round"/>
  <!-- nose -->
  <path d="M116,124 C113,134 110,142 108,148" fill="none" stroke="#b06840" stroke-width="2"/>
  <path d="M106,150 Q111,153 117,151" fill="none" stroke="#8a4828" stroke-width="1.6" stroke-linecap="round"/>
  <!-- mouth: grim -->
  <path d="M99,161 C104,158 116,158 122,160" fill="none" stroke="#6a2418" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M97,160 L100,163" stroke="#6a2418" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M124,159 L121,162" stroke="#6a2418" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M104,166 Q112,168 118,165" fill="none" stroke="#c87850" stroke-width="1.4" opacity="0.8"/>
  <!-- flame mark under left eye -->
  <path d="M94,141 C92,145 92,148 94,151 C95,148 96,147 95,145 C97,148 99,147 98,144 C97,142 95,142 94,141 Z" fill="#a02818" opacity="0.9"/>

  <!-- hair: dark root cap + jagged fringe -->
  <path d="M80,120 C74,84 92,60 114,56 C138,54 152,76 148,118 L143,112 C143,90 132,80 114,80 C98,82 89,96 86,116 Z" fill="#7a1a0e" stroke="#3a0c06" stroke-width="2"/>
  <path d="M84,118 L94,100 L100,112 L110,96 L118,110 L128,97 L136,110 L143,100 L146,116 L146,84 L84,84 Z" fill="#7a1a0e"/>

  <!-- flame hair: outer tongues -->
  <g stroke="#7a1408" stroke-width="1.5">
    <path d="M82,110 C66,100 58,80 64,56 C70,72 78,74 76,58 C84,72 88,92 85,112 Z" fill="#c8401a"/>
    <path d="M94,90 C86,60 96,38 92,12 C104,28 106,44 112,32 C118,48 112,66 116,86 Z" fill="#c8401a"/>
    <path d="M114,84 C114,52 128,36 122,4 C136,24 134,44 144,32 C148,54 138,70 140,90 Z" fill="#c8401a"/>
    <path d="M138,96 C152,74 168,70 184,50 C176,72 184,76 194,68 C186,92 166,106 148,114 Z" fill="#c8401a"/>
  </g>
  <!-- mid -->
  <path d="M84,104 C72,96 68,82 72,64 C76,76 82,78 80,66 C86,80 88,94 86,106 Z" fill="#f57f17"/>
  <path d="M96,86 C92,62 100,46 97,24 C106,38 106,52 111,42 C114,58 110,70 113,84 Z" fill="#f57f17"/>
  <path d="M118,82 C118,56 128,44 124,18 C134,34 132,50 139,42 C142,58 134,70 136,86 Z" fill="#f57f17"/>
  <path d="M142,96 C152,80 164,76 176,60 C172,78 178,80 186,74 C180,90 164,102 150,108 Z" fill="#f57f17"/>
  <path d="M86,116 C78,124 76,136 80,146 C83,138 87,132 87,124 Z" fill="#f57f17"/>
  <!-- inner -->
  <path d="M100,80 C98,62 104,50 101,36 C108,48 106,58 111,50 C112,62 108,72 110,80 Z" fill="#ffb020"/>
  <path d="M122,78 C122,56 130,48 127,30 C134,44 131,54 137,48 C138,62 132,70 133,80 Z" fill="#ffb020"/>
  <path d="M146,98 C154,86 162,82 170,70 C168,82 173,84 178,80 C173,90 160,98 152,104 Z" fill="#ffb020"/>
  <path d="M82,102 C76,94 74,84 76,72 C79,80 83,82 82,74 C86,84 86,94 85,102 Z" fill="#ffb020"/>
  <!-- core -->
  <path d="M103,76 C102,62 106,54 104,44 C109,52 107,60 111,54 C112,64 107,72 108,78 Z" fill="#ffe680"/>
  <path d="M125,74 C125,58 130,52 128,38 C133,48 130,58 134,54 C135,64 130,70 130,76 Z" fill="#ffe680"/>
  <path d="M150,96 C156,88 162,84 168,76 C166,84 170,86 173,83 C169,90 158,96 153,100 Z" fill="#ffe680"/>

  <rect width="240" height="320" fill="url(#hwVig)"/>
</svg>`;
