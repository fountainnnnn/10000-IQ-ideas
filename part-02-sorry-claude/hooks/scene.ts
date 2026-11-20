// The backdrop shown while Claude apologizes. Pure vector: the app refuses
// pictures in a backdrop. The crying Claude is pinned to the left, the sign and
// the floating apologies to the right, away from the chat column and the prompt.

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const RAIN = Array.from({ length: 46 }, (_, i) => {
  const x = Math.round(rand(i) * 1600)
  const y = Math.round(rand(i + 100) * 1000) - 1000
  const dur = (1.4 + rand(i + 200) * 1.2).toFixed(2)
  const delay = (-rand(i + 300) * 3).toFixed(2)
  return `<path class="rain" style="animation-duration:${dur}s;animation-delay:${delay}s" d="M${x} ${y} l-10 46"/>`
}).join('')

const SORRIES = ['sorry', "i'm so sorry", 'forgive me', 'I have failed you', 'please', 'it was my fault', 'sorry sorry sorry', 'I read the file wrong']
const WORDS = SORRIES.map((w, i) => {
  const x = 980 + Math.round(rand(i + 400) * 200)
  const size = 26 + Math.round(rand(i + 500) * 18)
  return `<text class="word" style="animation-delay:${-i * 1.25}s" x="${x}" y="760" font-size="${size}">${w}</text>`
}).join('')

// A spiky sunburst head in Claude's coral (an original shape, not the logo).
function burst(cx: number, cy: number, n: number, rIn: number, rOut: number): string {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? rIn : rOut
    const a = (Math.PI * i) / n - Math.PI / 2
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`)
  }
  return pts.join(' ')
}
const HEAD = burst(200, 210, 11, 78, 112)

const DROPS = [0, 1, 2, 3, 4].map(
  i => `<circle class="drop" style="animation-delay:${(-i * 0.37).toFixed(2)}s" cx="${188 + (i % 2) * 24}" cy="300" r="7"/>`,
).join('')

export const SORRY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#121a28"/><stop offset="1" stop-color="#2a3850"/>
  </linearGradient>
  <linearGradient id="spot" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff6dc" stop-opacity=".02"/><stop offset="1" stop-color="#fff6dc" stop-opacity=".22"/>
  </linearGradient>
</defs>
<style>
  .rain { stroke: #9fb6d6; stroke-width: 2; stroke-linecap: round; opacity: .45; animation: rain 2s linear infinite; }
  @keyframes rain { from { transform: translate(0, 0) } to { transform: translate(-220px, 2000px) } }
  .spot { animation: spot 6s ease-in-out infinite; }
  @keyframes spot { 0%, 100% { opacity: .75 } 50% { opacity: 1 } }
  .sob { transform-box: fill-box; transform-origin: 50% 100%; animation: sob 1.1s ease-in-out infinite; }
  @keyframes sob { 0%, 100% { transform: scale(1, 1) } 40% { transform: scale(1.02, .975) } }
  .beg { animation: beg .9s ease-in-out infinite; }
  @keyframes beg { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
  .tear { stroke: #8fd0ff; stroke-width: 7; stroke-linecap: round; fill: none; stroke-dasharray: 14 12; animation: tear .5s linear infinite; }
  @keyframes tear { to { stroke-dashoffset: -26 } }
  .drop { fill: #8fd0ff; animation: drop 1.8s ease-in infinite; }
  @keyframes drop { 0% { transform: translateY(0); opacity: 1 } 90% { opacity: 1 } 100% { transform: translateY(170px); opacity: 0 } }
  .puddle { fill: #7fb2d6; opacity: .45; transform-box: fill-box; transform-origin: 50% 50%; animation: puddle 4s ease-in-out infinite; }
  @keyframes puddle { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.12, 1.06) } }
  .word { fill: #ffd9c7; font-family: 'Marker Felt','Chalkboard SE','Comic Sans MS',cursive; opacity: 0; animation: word 10s ease-out infinite; }
  @keyframes word { 0% { opacity: 0; transform: translateY(0) } 15% { opacity: .9 } 80% { opacity: .5 } 100% { opacity: 0; transform: translateY(-560px) } }
  .sign { transform-box: fill-box; transform-origin: 50% 100%; animation: sway 5s ease-in-out infinite; }
  @keyframes sway { 0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(2deg) } }
</style>
<rect width="1600" height="1000" fill="url(#sky)"/>
<path class="spot" d="M1250 0 L1420 0 L1600 1000 L1060 1000 Z" fill="url(#spot)"/>
${RAIN}
${WORDS}
<!-- the sign, top right -->
<svg x="1180" y="0" width="420" height="430" viewBox="0 0 600 620" preserveAspectRatio="xMaxYMin meet">
  <g class="sign">
    <rect x="290" y="300" width="14" height="300" fill="#6b4b26"/>
    <rect x="160" y="170" width="280" height="160" rx="8" fill="#c9a26b" stroke="#6b4b26" stroke-width="5"/>
    <text x="300" y="235" text-anchor="middle" font-size="40" fill="#3a2a1a" font-family="'Marker Felt','Chalkboard SE','Comic Sans MS',cursive">PLEASE</text>
    <text x="300" y="290" text-anchor="middle" font-size="40" fill="#3a2a1a" font-family="'Marker Felt','Chalkboard SE','Comic Sans MS',cursive">FORGIVE ME</text>
  </g>
</svg>
<!-- crying Claude, pinned bottom right -->
<svg x="1170" y="430" width="430" height="560" viewBox="0 0 400 500" preserveAspectRatio="xMaxYMax meet">
  <ellipse class="puddle" cx="200" cy="478" rx="150" ry="18"/>
  <g class="sob">
    <ellipse cx="140" cy="452" rx="62" ry="24" fill="#c86a4d" stroke="#7a3320" stroke-width="5"/>
    <ellipse cx="260" cy="452" rx="62" ry="24" fill="#c86a4d" stroke="#7a3320" stroke-width="5"/>
    <ellipse cx="200" cy="370" rx="86" ry="92" fill="#d97757" stroke="#7a3320" stroke-width="6"/>
    <polygon points="${HEAD}" fill="#d97757" stroke="#7a3320" stroke-width="10" stroke-linejoin="round"/>
    <polygon points="${HEAD}" fill="#d97757" stroke="#d97757" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="200" cy="212" r="74" fill="#f0a283"/>
    <path d="M152 190 L186 172 M248 190 L214 172" stroke="#4a1d10" stroke-width="7" stroke-linecap="round"/>
    <path d="M158 210 q16 14 32 0 M210 210 q16 14 32 0" stroke="#4a1d10" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M172 262 q28 -30 56 0 q-28 14 -56 0 Z" fill="#5a1f12"/>
    <path class="tear" d="M166 222 Q160 250 168 300"/>
    <path class="tear" d="M234 222 Q240 250 232 300"/>
    <ellipse cx="150" cy="240" rx="14" ry="8" fill="#ff9b8a" opacity=".6"/>
    <ellipse cx="250" cy="240" rx="14" ry="8" fill="#ff9b8a" opacity=".6"/>
  </g>
  ${DROPS}
  <g class="beg">
    <path d="M128 340 Q150 300 190 294 M272 340 Q250 300 210 294" stroke="#7a3320" stroke-width="16" stroke-linecap="round" fill="none"/>
    <path d="M128 340 Q150 300 190 294 M272 340 Q250 300 210 294" stroke="#d97757" stroke-width="9" stroke-linecap="round" fill="none"/>
    <circle cx="200" cy="292" r="22" fill="#e88a68" stroke="#7a3320" stroke-width="5"/>
    <path d="M200 272 L200 312" stroke="#7a3320" stroke-width="4"/>
  </g>
</svg>
</svg>`
