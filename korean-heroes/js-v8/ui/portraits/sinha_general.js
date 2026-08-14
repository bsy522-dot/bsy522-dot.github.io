export default `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <defs>
    <radialGradient id="sng_bg" cx="50%" cy="42%" r="78%">
      <stop offset="0%" stop-color="#8a7540"/>
      <stop offset="45%" stop-color="#6a5a2a"/>
      <stop offset="100%" stop-color="#1a140a"/>
    </radialGradient>
    <radialGradient id="sng_glow" cx="50%" cy="48%" r="50%">
      <stop offset="0%" stop-color="#ffeab0" stop-opacity="0.30"/>
      <stop offset="70%" stop-color="#c9a24a" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#c9a24a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sng_bronze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b89552"/>
      <stop offset="55%" stop-color="#7a6428"/>
      <stop offset="100%" stop-color="#362a10"/>
    </linearGradient>
    <linearGradient id="sng_scale" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a9863f"/>
      <stop offset="55%" stop-color="#6a5a2a"/>
      <stop offset="100%" stop-color="#2e2410"/>
    </linearGradient>
    <linearGradient id="sng_trim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f5dd8a"/>
      <stop offset="55%" stop-color="#c9a24a"/>
      <stop offset="100%" stop-color="#7a5a20"/>
    </linearGradient>
    <linearGradient id="sng_spearblade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f5e6a8"/>
      <stop offset="35%" stop-color="#d4af5a"/>
      <stop offset="65%" stop-color="#9a7a2e"/>
      <stop offset="100%" stop-color="#5a4416"/>
    </linearGradient>
    <linearGradient id="sng_wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7a4a30"/>
      <stop offset="55%" stop-color="#4a2e1c"/>
      <stop offset="100%" stop-color="#241408"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="240" height="320" fill="url(#sng_bg)"/>
  <circle cx="118" cy="150" r="106" fill="url(#sng_glow)"/>
  <path d="M14,262 Q116,44 230,168" fill="none" stroke="#fff0c0" stroke-opacity="0.08" stroke-width="9" stroke-linecap="round"/>
  <path d="M26,84 Q140,206 226,54" fill="none" stroke="#fff0c0" stroke-opacity="0.06" stroke-width="6" stroke-linecap="round"/>
  <circle cx="118" cy="150" r="90" fill="none" stroke="#e0b45c" stroke-opacity="0.05" stroke-width="5"/>
  <path d="M40,50 L48,30 L56,50 L48,70 Z" fill="none" stroke="#fff0c0" stroke-opacity="0.06" stroke-width="1.5"/>
  <path d="M190,80 L196,64 L202,80 L196,96 Z" fill="none" stroke="#fff0c0" stroke-opacity="0.05" stroke-width="1.5"/>
  <path d="M28,232 L34,218 L40,232 L34,246 Z" fill="none" stroke="#fff0c0" stroke-opacity="0.05" stroke-width="1.5"/>

  <path d="M150,300 L164,296 L210,44 L198,47 Z" fill="url(#sng_wood)" stroke="#140b06" stroke-width="2"/>
  <path d="M156,290 L204,50" fill="none" stroke="#8a5a3a" stroke-width="1.5" stroke-opacity="0.5"/>
  <ellipse cx="198" cy="62" rx="8" ry="3" fill="url(#sng_trim)" stroke="#140b06" stroke-width="1" transform="rotate(-77 198 62)"/>
  <ellipse cx="186" cy="100" rx="8" ry="3" fill="url(#sng_trim)" stroke="#140b06" stroke-width="1" transform="rotate(-77 186 100)"/>
  <path d="M192,50 L206,8 L218,52 L206,78 Z" fill="url(#sng_spearblade)" stroke="#140b06" stroke-width="2"/>
  <path d="M206,14 L206,72" fill="none" stroke="#fff3cc" stroke-width="1.5" stroke-opacity="0.5"/>
  <path d="M196,48 L206,16" fill="none" stroke="#fff3cc" stroke-width="1" stroke-opacity="0.35"/>

  <path d="M34,320 L40,254 Q58,226 118,224 Q178,226 196,254 L202,320 Z" fill="url(#sng_scale)" stroke="#1c1608" stroke-width="2.5"/>

  <path d="M42,262 Q52,252 62,262 Q72,252 82,262 Q92,252 102,262 Q112,252 122,262 Q132,252 142,262 Q152,252 162,262 Q172,252 182,262 Q190,255 194,259 L194,270 Q184,262 174,270 Q164,262 154,270 Q144,262 134,270 Q124,262 114,270 Q104,262 94,270 Q84,262 74,270 Q64,262 54,270 Q46,264 42,268 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="1.3"/>
  <path d="M38,282 Q48,272 58,282 Q68,272 78,282 Q88,272 98,282 Q108,272 118,282 Q128,272 138,282 Q148,272 158,282 Q168,272 178,282 Q188,274 198,278 L198,292 Q188,284 178,292 Q168,284 158,292 Q148,284 138,292 Q128,284 118,292 Q108,284 98,292 Q88,284 78,292 Q68,284 58,292 Q48,286 38,290 Z" fill="url(#sng_scale)" stroke="#1c1608" stroke-width="1.3"/>
  <path d="M36,300 Q46,293 56,300 Q66,293 76,300 Q86,293 96,300 Q106,293 116,300 Q126,293 136,300 Q146,293 156,300 Q166,293 176,300 Q186,295 200,298 L200,320 L36,320 Z" fill="#3a2c10" stroke="#140e04" stroke-width="1.3"/>

  <path d="M118,248 L111,268 L118,304 L125,268 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="1.5"/>

  <path d="M78,244 Q82,214 118,210 Q154,214 158,244 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M84,232 Q118,212 152,232" fill="none" stroke="#f0dfa0" stroke-width="2" stroke-opacity="0.7"/>
  <circle cx="118" cy="227" r="5" fill="#f0dfa0" stroke="#1c1608" stroke-width="1.2"/>
  <circle cx="118" cy="227" r="2" fill="#7a5a20"/>

  <path d="M103,183 L103,216 Q118,226 133,213 L133,181 Q120,198 103,183 Z" fill="#d9a26e" stroke="#5c3a20" stroke-width="1.5"/>
  <path d="M103,185 Q120,200 133,183 L133,198 Q118,211 103,200 Z" fill="#a9744a" fill-opacity="0.7"/>

  <path d="M10,262 Q10,214 58,208 Q90,206 94,232 L92,252 Q60,236 24,258 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M12,258 Q48,234 90,250" fill="none" stroke="#f0dfa0" stroke-width="2" stroke-opacity="0.85"/>
  <path d="M6,292 Q8,248 50,240 Q84,236 92,258 L90,276 Q56,258 20,286 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M8,288 Q50,262 90,274" fill="none" stroke="#f0dfa0" stroke-width="2" stroke-opacity="0.85"/>
  <path d="M4,320 Q6,282 44,272 Q78,268 88,290 L88,320 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M20,222 Q30,216 40,222 Q50,216 60,222" fill="none" stroke="#1c1608" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="52" cy="222" r="2.5" fill="#f0dfa0" stroke="#1c1608" stroke-width="0.8"/>
  <path d="M12,260 Q12,216 58,209" fill="none" stroke="#e0b498" stroke-width="2.5" stroke-opacity="0.3"/>

  <path d="M230,262 Q230,214 182,208 Q150,206 146,232 L148,252 Q180,236 216,258 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M228,258 Q192,234 150,250" fill="none" stroke="#f0dfa0" stroke-width="2" stroke-opacity="0.85"/>
  <path d="M234,292 Q232,248 190,240 Q156,236 148,258 L150,276 Q184,258 220,286 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M232,288 Q190,262 150,274" fill="none" stroke="#f0dfa0" stroke-width="2" stroke-opacity="0.85"/>
  <path d="M236,320 Q234,282 196,272 Q162,268 152,290 L152,320 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M180,222 Q190,216 200,222 Q210,216 220,222" fill="none" stroke="#1c1608" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="186" cy="222" r="2.5" fill="#f0dfa0" stroke="#1c1608" stroke-width="0.8"/>

  <path d="M92,108 L91,140 Q92,166 103,180 Q111,190 117,191 Q136,187 147,163 Q152,146 151,107 Z" fill="#d9a26e" stroke="#5c3a20" stroke-width="1.5"/>
  <path d="M94,120 Q92,150 101,177 L97,175 Q91,150 93,120 Z" fill="#4a3020" fill-opacity="0.45"/>
  <path d="M148,113 Q149,148 140,171 Q133,183 122,189 L126,182 Q138,172 144,150 Q147,132 147,113 Z" fill="#f0c090" fill-opacity="0.45"/>
  <path d="M96,169 Q104,187 116,191 Q129,186 140,166 Q142,175 133,186 Q123,195 113,194 Q100,190 94,177 Z" fill="#4a3020" fill-opacity="0.35"/>
  <path d="M92,113 Q118,105 148,113 L148,124 Q118,114 92,124 Z" fill="#7a4a2c" fill-opacity="0.5"/>

  <path d="M92,129 Q100,124 106,131 L105,137 Q100,130 92,131 Z" fill="#241408"/>
  <path d="M150,128 Q138,122 128,130 L129,136 Q139,128 150,130 Z" fill="#241408"/>
  <path d="M99,143 Q103,140 107,142 Q103,146 99,143 Z" fill="#f2ece0" stroke="#3a2416" stroke-width="0.8"/>
  <circle cx="103" cy="142.3" r="1.9" fill="#34231a"/>
  <circle cx="103" cy="142.3" r="0.9" fill="#120b07"/>
  <circle cx="102.3" cy="141.6" r="0.5" fill="#ffffff"/>
  <path d="M98,142 Q103,138.5 108,141" fill="none" stroke="#241408" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M129,141 Q138,137 148,140 Q138,145 129,141 Z" fill="#f2ece0" stroke="#3a2416" stroke-width="1"/>
  <circle cx="139" cy="140.5" r="2.7" fill="#34231a"/>
  <circle cx="139" cy="140.5" r="1.3" fill="#120b07"/>
  <circle cx="138" cy="139.6" r="0.65" fill="#ffffff"/>
  <path d="M128,140 Q138,135 149,139" fill="none" stroke="#241408" stroke-width="2.6" stroke-linecap="round"/>

  <path d="M119,131 L109,158" fill="none" stroke="#b07a4c" stroke-width="2"/>
  <path d="M118,133 L108,158 Q106,162 102,163 L108,148 Z" fill="#a9744a" fill-opacity="0.5"/>
  <path d="M105,161 Q109,166 116,163" fill="none" stroke="#5c3624" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M96,150 Q98,158 102,163" fill="none" stroke="#a9744a" stroke-width="1.2" stroke-opacity="0.5"/>
  <path d="M143,148 Q140,158 133,166" fill="none" stroke="#8a5a38" stroke-width="1.3" stroke-opacity="0.55"/>

  <path d="M96,167 Q104,163 109,166 Q114,163 122,167 Q116,171 109,169 Q102,171 96,167 Z" fill="#2a1a10" stroke="#140b06" stroke-width="0.8"/>
  <path d="M96,167 Q90,172 88,178" fill="none" stroke="#2a1a10" stroke-width="2" stroke-linecap="round"/>
  <path d="M122,167 Q129,172 132,179" fill="none" stroke="#2a1a10" stroke-width="2" stroke-linecap="round"/>
  <path d="M101,178 Q109,181 118,178" fill="none" stroke="#5c3020" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M104,183 Q110,185 116,183" fill="none" stroke="#a9744a" stroke-width="1.2" stroke-opacity="0.5"/>
  <path d="M95,173 Q103,189 116,192 Q129,188 139,170 Q136,181 126,189 Q116,194 106,192 Q97,188 95,173 Z" fill="#241408" fill-opacity="0.18"/>

  <path d="M74,112 L72,148 Q74,166 85,174 L92,169 L91,116 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M91,118 L91,167" fill="none" stroke="#f0dfa0" stroke-width="1.3" stroke-opacity="0.7"/>
  <path d="M166,112 L168,153 Q166,171 154,179 L145,173 L147,116 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2"/>
  <path d="M147,118 L146,171" fill="none" stroke="#f0dfa0" stroke-width="1.3" stroke-opacity="0.7"/>

  <path d="M74,114 Q68,48 119,42 Q170,48 166,114 Q152,102 119,101 Q88,102 74,114 Z" fill="url(#sng_bronze)" stroke="#1c1608" stroke-width="2.5"/>
  <path d="M76,110 Q72,56 117,44" fill="none" stroke="#f0e6b0" stroke-width="2.5" stroke-opacity="0.35"/>
  <path d="M119,42 L119,100" fill="none" stroke="#4a3818" stroke-width="2" stroke-opacity="0.8"/>

  <path d="M97,46 Q119,34 141,46 L141,54 Q119,44 97,54 Z" fill="url(#sng_trim)" stroke="#1c1608" stroke-width="1.3"/>
  <path d="M115,40 Q113,28 119,20 Q125,28 123,40 Z" fill="url(#sng_trim)" stroke="#1c1608" stroke-width="1.3"/>
  <circle cx="119" cy="20" r="4" fill="#f5dd8a" stroke="#1c1608" stroke-width="1"/>

  <path d="M74,114 Q119,96 166,114 L166,122 Q119,105 74,122 Z" fill="url(#sng_trim)" stroke="#1c1608" stroke-width="1.2"/>
  <circle cx="86" cy="106" r="1.8" fill="#f5dd8a"/>
  <circle cx="102" cy="100" r="1.8" fill="#f5dd8a"/>
  <circle cx="137" cy="100" r="1.8" fill="#f5dd8a"/>
  <circle cx="154" cy="106" r="1.8" fill="#f5dd8a"/>
</svg>`;
