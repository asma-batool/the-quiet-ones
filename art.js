/* ============================================================
   THE QUIET ONES — art, drawn in SVG
   Characters are drawn at origin (0,0) = bottom centre, facing the
   viewer, roughly 300–450 units tall. Scenes are 1600 x 900.
   Hardware shapes follow the real spacecraft; the faces are the
   storybook part.
   ============================================================ */

const INK = '#2b2440';

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function sparkle(x, y, r, cls = '', fill = '#fff') {
  return `<path class="${cls}" fill="${fill}" d="M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r} Z"/>`;
}

function face(x, y, s = 1, mood = 'happy') {
  const ex = 22 * s;
  let eyes;
  if (mood === 'calm' || mood === 'rest') {
    eyes = `<path d="M${x - ex - 9 * s},${y} q${9 * s},${7 * s} ${18 * s},0 M${x + ex - 9 * s},${y} q${9 * s},${7 * s} ${18 * s},0" stroke="${INK}" stroke-width="${3.4 * s}" fill="none" stroke-linecap="round"/>`;
  } else {
    eyes = `<g class="blink"><ellipse cx="${x - ex}" cy="${y}" rx="${6.5 * s}" ry="${8.5 * s}" fill="${INK}"/><ellipse cx="${x + ex}" cy="${y}" rx="${6.5 * s}" ry="${8.5 * s}" fill="${INK}"/><circle cx="${x - ex + 2.3 * s}" cy="${y - 3.2 * s}" r="${2.5 * s}" fill="#fff"/><circle cx="${x + ex + 2.3 * s}" cy="${y - 3.2 * s}" r="${2.5 * s}" fill="#fff"/></g>`;
  }
  let mouth;
  if (mood === 'wow') mouth = `<ellipse cx="${x}" cy="${y + 17 * s}" rx="${5 * s}" ry="${6.5 * s}" fill="${INK}"/>`;
  else if (mood === 'rest') mouth = `<path d="M${x - 6 * s},${y + 15 * s} q${6 * s},${4 * s} ${12 * s},0" stroke="${INK}" stroke-width="${3 * s}" fill="none" stroke-linecap="round"/>`;
  else mouth = `<path d="M${x - 9 * s},${y + 13 * s} q${9 * s},${10 * s} ${18 * s},0" stroke="${INK}" stroke-width="${3.2 * s}" fill="none" stroke-linecap="round"/>`;
  const blush = `<ellipse cx="${x - ex - 11 * s}" cy="${y + 11 * s}" rx="${8 * s}" ry="${5 * s}" fill="#ff8fa3" opacity=".55"/><ellipse cx="${x + ex + 11 * s}" cy="${y + 11 * s}" rx="${8 * s}" ry="${5 * s}" fill="#ff8fa3" opacity=".55"/>`;
  return `<g class="face">${blush}${eyes}${mouth}</g>`;
}

/* Position lives on the outer <g>; animation classes go on an inner <g>,
   because a CSS transform animation would override the SVG transform attribute. */
function place(markup, x, y, s = 1, extra = '') {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g ${extra}>${markup}</g></g>`;
}

/* ---------- shared defs ---------- */
const DEFS = `
<defs>
  <clipPath id="lensClip"><circle cx="1040" cy="450" r="282"/></clipPath>
  <linearGradient id="gNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1033"/><stop offset=".65" stop-color="#232a66"/><stop offset="1" stop-color="#3b3f86"/></linearGradient>
  <linearGradient id="gSpace" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070a22"/><stop offset="1" stop-color="#191e4d"/></linearGradient>
  <linearGradient id="gMoonSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05061a"/><stop offset="1" stop-color="#171b40"/></linearGradient>
  <linearGradient id="gMoonGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9b6bf"/><stop offset="1" stop-color="#7d7a88"/></linearGradient>
  <linearGradient id="gMoonGround2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9f9ca8"/><stop offset="1" stop-color="#6a6776"/></linearGradient>
  <linearGradient id="gMarsSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c9a0"/><stop offset="1" stop-color="#e0a477"/></linearGradient>
  <linearGradient id="gMarsSunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b4a7a"/><stop offset=".55" stop-color="#c58b78"/><stop offset="1" stop-color="#e7b48c"/></linearGradient>
  <linearGradient id="gMarsGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d27a48"/><stop offset="1" stop-color="#9b4a28"/></linearGradient>
  <linearGradient id="gMarsGround2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c06a3c"/><stop offset="1" stop-color="#8a3f22"/></linearGradient>
  <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset=".55" stop-color="#e9b84a"/><stop offset="1" stop-color="#c88f2c"/></linearGradient>
  <linearGradient id="gSilver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8fb"/><stop offset="1" stop-color="#b9c0cd"/></linearGradient>
  <linearGradient id="gSolar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3e58a8"/><stop offset="1" stop-color="#22336e"/></linearGradient>
  <radialGradient id="gMirror" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#bfe0ff"/><stop offset="1" stop-color="#6d86b8"/></radialGradient>
  <radialGradient id="gMoonFace" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#fbf7ea"/><stop offset=".7" stop-color="#ddd8cf"/><stop offset="1" stop-color="#bdb6ad"/></radialGradient>
  <radialGradient id="gGlow"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
  <radialGradient id="gGreenGlow"><stop offset="0" stop-color="#7dffbf" stop-opacity=".9"/><stop offset="1" stop-color="#7dffbf" stop-opacity="0"/></radialGradient>
  <radialGradient id="gEarth" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#7fc8ff"/><stop offset="1" stop-color="#2b6cc4"/></radialGradient>
  <radialGradient id="gMars" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#ffb07a"/><stop offset="1" stop-color="#c4562c"/></radialGradient>
  <radialGradient id="gStar" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe6"/><stop offset=".55" stop-color="#ffd86b"/><stop offset="1" stop-color="#ff9f43"/></radialGradient>
  <radialGradient id="gNebulaA"><stop offset="0" stop-color="#8a6cff" stop-opacity=".35"/><stop offset="1" stop-color="#8a6cff" stop-opacity="0"/></radialGradient>
  <radialGradient id="gNebulaB"><stop offset="0" stop-color="#3fd6c6" stop-opacity=".25"/><stop offset="1" stop-color="#3fd6c6" stop-opacity="0"/></radialGradient>
  <radialGradient id="gMarsGlow"><stop offset=".4" stop-color="#ff8a5c" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a5c" stop-opacity="0"/></radialGradient>
  <radialGradient id="gStarGlow"><stop offset=".55" stop-color="#ffd86b" stop-opacity=".45"/><stop offset="1" stop-color="#ffd86b" stop-opacity="0"/></radialGradient>
  <radialGradient id="gDust" cx=".5" cy=".6" r=".7"><stop offset="0" stop-color="#e8a56d" stop-opacity=".25"/><stop offset="1" stop-color="#c9773f" stop-opacity=".85"/></radialGradient>
  <filter id="fPaper" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 .95  0 0 0 0 .85  0 0 0 .32 -.12"/>
  </filter>
  <filter id="fBlur"><feGaussianBlur stdDeviation="14"/></filter>
</defs>`;

/* ---------- backgrounds ---------- */
function stars(n, seed, w = 1600, h = 900, minR = .8, maxR = 2.6) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, rad = minR + r() * r() * (maxR - minR);
    const delay = (r() * 4).toFixed(2), op = (.45 + r() * .55).toFixed(2);
    out += `<circle class="tw" style="animation-delay:-${delay}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}" fill="#fff" opacity="${op}"/>`;
  }
  for (let i = 0; i < Math.max(2, n / 40); i++) out += sparkle(r() * w, r() * h * .8, 7 + r() * 6, 'tw', '#fff');
  return out;
}

function moonDisc(cx, cy, R, withGlow = true) {
  const craters = [[-.35, -.25, .16], [.25, -.38, .1], [.32, .12, .2], [-.15, .35, .13], [-.45, .2, .08], [.05, -.05, .07], [.55, -.1, .06]];
  return `${withGlow ? `<circle cx="${cx}" cy="${cy}" r="${R * 1.9}" fill="url(#gGlow)"/>` : ''}
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gMoonFace)"/>
  ${craters.map(([a, b, c]) => `<circle cx="${cx + a * R}" cy="${cy + b * R}" r="${c * R}" fill="#c9c2b6" opacity=".7"/><circle cx="${cx + a * R + c * R * .15}" cy="${cy + b * R + c * R * .15}" r="${c * R * .75}" fill="#d9d3c8" opacity=".6"/>`).join('')}
  <path d="M${cx - R * .55},${cy - R * .55} q${R * .3},${-R * .2} ${R * .6},${-R * .22}" stroke="#fff" stroke-width="${R * .05}" fill="none" stroke-linecap="round" opacity=".55"/>`;
}

function earthDisc(cx, cy, R) {
  return `<circle cx="${cx}" cy="${cy}" r="${R * 1.35}" fill="#5fb0ff" opacity=".12"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gEarth)"/>
  <path d="M${cx - R * .5},${cy - R * .35} q${R * .25},${-R * .2} ${R * .45},0 q${R * .1},${R * .25} -${R * .1},${R * .45} q-${R * .25},${R * .1} -${R * .35},-${R * .1} Z" fill="#7bd389"/>
  <path d="M${cx + R * .15},${cy + R * .05} q${R * .3},-${R * .15} ${R * .5},${R * .1} q0,${R * .35} -${R * .3},${R * .45} q-${R * .2},-${R * .15} -${R * .2},-${R * .55} Z" fill="#7bd389"/>
  <path d="M${cx - R * .7},${cy + R * .3} q${R * .4},-${R * .12} ${R * .8},${R * .05}" stroke="#fff" stroke-width="${R * .07}" fill="none" stroke-linecap="round" opacity=".75"/>
  <path d="M${cx - R * .2},${cy - R * .75} q${R * .4},-${R * .1} ${R * .7},${R * .1}" stroke="#fff" stroke-width="${R * .06}" fill="none" stroke-linecap="round" opacity=".7"/>`;
}

function marsDisc(cx, cy, R, glow = true) {
  return `${glow ? `<circle cx="${cx}" cy="${cy}" r="${R * 2.2}" fill="url(#gMarsGlow)"/>` : ''}<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gMars)"/>
  <ellipse cx="${cx - R * .2}" cy="${cy + R * .15}" rx="${R * .35}" ry="${R * .15}" fill="#a8432a" opacity=".5"/>
  <ellipse cx="${cx}" cy="${cy - R * .82}" rx="${R * .35}" ry="${R * .12}" fill="#fff" opacity=".8"/>`;
}

function nightSky(seed = 1) {
  return `<rect width="1600" height="900" fill="url(#gNight)"/>${stars(150, seed, 1600, 650)}`;
}

function moonSurface(o = {}) {
  const seed = o.seed || 3;
  return `<rect width="1600" height="900" fill="url(#gMoonSky)"/>${stars(160, seed, 1600, 560)}
  ${o.earth !== false ? earthDisc(o.earthX || 1340, o.earthY || 170, o.earthR || 62) : ''}
  <path d="M0,600 C200,560 360,590 540,565 C760,535 900,585 1100,560 C1300,540 1450,575 1600,555 L1600,900 L0,900 Z" fill="url(#gMoonGround2)"/>
  <path d="M0,660 C260,630 500,670 760,640 C1040,610 1280,660 1600,630 L1600,900 L0,900 Z" fill="url(#gMoonGround)"/>
  <ellipse cx="260" cy="760" rx="120" ry="22" fill="#8c8996" opacity=".6"/><ellipse cx="270" cy="756" rx="95" ry="14" fill="#a9a6b2" opacity=".7"/>
  <ellipse cx="1350" cy="800" rx="160" ry="28" fill="#8c8996" opacity=".55"/><ellipse cx="1360" cy="795" rx="125" ry="18" fill="#a9a6b2" opacity=".7"/>
  <ellipse cx="900" cy="845" rx="70" ry="12" fill="#8c8996" opacity=".5"/>
  <circle cx="520" cy="700" r="9" fill="#7d7a88"/><circle cx="1120" cy="690" r="6" fill="#7d7a88"/><circle cx="640" cy="820" r="12" fill="#7d7a88"/>
  ${o.footprints ? footprints(o.footprints) : ''}`;
}

function footprints([x, y, n = 6, dx = 46, dy = 6]) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const fx = x + i * dx, fy = y + i * dy + (i % 2 ? 14 : 0);
    out += `<ellipse cx="${fx}" cy="${fy}" rx="13" ry="6" fill="#6f6c7a" opacity=".7"/><path d="M${fx - 9},${fy} h18" stroke="#5c5967" stroke-width="2" opacity=".6"/>`;
  }
  return out;
}

function marsSurface(o = {}) {
  const sky = o.sunset ? 'url(#gMarsSunset)' : 'url(#gMarsSky)';
  const sun = o.sunset
    ? `<circle cx="1180" cy="430" r="90" fill="#bfe3ff" opacity=".35"/><circle cx="1180" cy="430" r="26" fill="#eaf6ff"/>`
    : `<circle cx="1300" cy="150" r="70" fill="#fff4dc" opacity=".35"/><circle cx="1300" cy="150" r="30" fill="#fff8e8"/>`;
  return `<rect width="1600" height="900" fill="${sky}"/>${sun}
  ${o.crater ? `<path d="M0,520 C180,470 320,505 480,480 C600,462 700,500 820,490 C1000,470 1180,505 1320,470 C1450,440 1530,480 1600,470 L1600,620 L0,620 Z" fill="#b8693f" opacity=".75"/>` : ''}
  <path d="M0,560 C220,520 380,560 600,535 C820,510 1020,555 1240,530 C1400,512 1500,540 1600,525 L1600,900 L0,900 Z" fill="url(#gMarsGround2)"/>
  <path d="M0,640 C280,610 520,655 820,625 C1100,598 1340,645 1600,615 L1600,900 L0,900 Z" fill="url(#gMarsGround)"/>
  <path d="M120,700 q60,-30 120,0 M980,760 q60,-25 120,0 M1380,690 q50,-20 100,0" stroke="#e39a68" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>
  <ellipse cx="380" cy="760" rx="34" ry="18" fill="#7f3a1f"/><ellipse cx="372" cy="754" rx="24" ry="11" fill="#a8532e"/>
  <ellipse cx="1220" cy="820" rx="46" ry="22" fill="#7f3a1f"/><ellipse cx="1210" cy="812" rx="32" ry="13" fill="#a8532e"/>
  <ellipse cx="760" cy="700" rx="16" ry="8" fill="#7f3a1f"/><ellipse cx="1480" cy="760" rx="20" ry="10" fill="#7f3a1f"/>`;
}

function deepSpace(seed = 9) {
  return `<rect width="1600" height="900" fill="url(#gSpace)"/>
  <ellipse cx="300" cy="250" rx="420" ry="260" fill="url(#gNebulaA)"/>
  <ellipse cx="1300" cy="680" rx="460" ry="280" fill="url(#gNebulaB)"/>
  ${stars(230, seed)}`;
}

function paper() { return `<rect width="1600" height="900" filter="url(#fPaper)" pointer-events="none"/>`; }

function karachiSkyline() {
  const r = rng(42); let b = '';
  let x = -20;
  while (x < 1620) {
    const w = 70 + r() * 110, h = 120 + r() * 210;
    b += `<rect x="${x.toFixed(0)}" y="${(700 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#1c2152"/>`;
    for (let wy = 700 - h + 18; wy < 680; wy += 30) for (let wx = x + 12; wx < x + w - 18; wx += 24)
      if (r() > .62) b += `<rect class="win" style="animation-delay:-${(r() * 9).toFixed(1)}s" x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="10" height="13" rx="2" fill="#ffd27a" opacity="${(.55 + r() * .45).toFixed(2)}"/>`;
    x += w + 6;
  }
  const mosque = `<g fill="#171b47">
    <rect x="300" y="470" width="14" height="230"/><path d="M292,470 h30 l-15,-36 z"/><circle cx="307" cy="430" r="4" fill="#ffd27a"/>
    <rect x="520" y="470" width="14" height="230"/><path d="M512,470 h30 l-15,-36 z"/><circle cx="527" cy="430" r="4" fill="#ffd27a"/>
    <path d="M340,600 C340,520 400,490 417,480 C434,490 494,520 494,600 Z"/><rect x="330" y="598" width="174" height="102"/>
    <rect x="414" y="460" width="6" height="22"/></g>`;
  return b + mosque;
}

function rooftop(o = {}) {
  return `${nightSky(o.seed || 5)}
  ${o.moon !== false ? `<g class="float-slow">${moonDisc(o.moonX || 1180, o.moonY || 230, o.moonR || 150)}</g>` : ''}
  ${o.skyExtra || ''}
  ${karachiSkyline()}
  <rect x="0" y="690" width="1600" height="210" fill="#3b3466"/>
  <rect x="0" y="690" width="1600" height="18" fill="#4b4380"/>
  <path d="M0,760 H1600" stroke="#2e2853" stroke-width="3" opacity=".6"/>
  <g transform="translate(150 560)">
    <rect x="0" y="40" width="130" height="150" rx="22" fill="#262150"/><ellipse cx="65" cy="40" rx="65" ry="20" fill="#352f68"/><rect x="50" y="20" width="30" height="14" rx="4" fill="#262150"/>
    <rect x="12" y="60" width="10" height="110" rx="5" fill="#423b7c" opacity=".7"/>
    <rect x="170" y="80" width="110" height="110" rx="20" fill="#262150"/><ellipse cx="225" cy="80" rx="55" ry="17" fill="#352f68"/>
  </g>
  <path d="M1400,690 v-60 h120 v60" stroke="#262150" stroke-width="8" fill="none"/>
  <path d="M1380,640 C1430,620 1490,660 1560,630" stroke="#ffe6a6" stroke-width="2" fill="none" opacity=".5"/>
  ${[1395, 1425, 1455, 1485, 1515, 1545].map((x, i) => `<circle class="tw" style="animation-delay:-${i * .6}s" cx="${x}" cy="${636 + (i % 2) * 6}" r="5" fill="#ffd27a"/>`).join('')}`;
}

function telescope(x, y, angle = -32) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0,-120 L-55,0 M0,-120 L55,0 M0,-120 L8,0" stroke="#8d86b8" stroke-width="8" stroke-linecap="round"/>
    <g transform="translate(0 -125) rotate(${angle})">
      <rect x="-70" y="-22" width="170" height="44" rx="14" fill="#5ec3d6" class="ol"/>
      <rect x="95" y="-28" width="34" height="56" rx="8" fill="#3b95ad" class="ol"/>
      <rect x="-92" y="-14" width="26" height="28" rx="6" fill="#2b2440"/>
      <circle cx="0" cy="0" r="10" fill="#f2a541"/>
    </g></g>`;
}

/* ---------- characters ---------- */
function zoya(o = {}) {
  const pose = o.pose || 'stand', mood = o.mood || 'happy';
  const skin = '#b97a56', hair = '#251a20', kurta = '#f2a541', shalwar = '#fff1db', dupatta = '#36b3a6';
  const hairBack = `<path d="M-78,-280 C-90,-200 -88,-150 -70,-120 L70,-120 C88,-150 90,-200 78,-280 Z" fill="${hair}"/>`;
  const head = `<circle cx="0" cy="-282" r="74" fill="${skin}" class="ol"/>`;
  const bangs = `<path d="M-76,-285 C-74,-360 74,-372 78,-285 C62,-300 40,-330 18,-316 C6,-338 -30,-336 -42,-314 C-56,-326 -70,-310 -76,-285 Z" fill="${hair}"/>
    <g transform="translate(46 -330) rotate(15)">${sparkle(0, 0, 14, '', '#ffd54d')}</g>`;
  if (pose === 'sit') {
    return `<g class="char zoya">${hairBack}
      <path d="M-62,-150 C-70,-100 -66,-60 -40,-20 L60,-20 C80,-60 70,-110 62,-150 Q0,-170 -62,-150 Z" fill="${kurta}" class="ol"/>
      <path d="M-50,-90 C-30,-130 30,-130 60,-90 L70,-20 L-56,-20 Z" fill="${shalwar}" class="ol"/>
      <path d="M-44,-120 Q0,-80 52,-118" stroke="${skin}" stroke-width="20" fill="none" stroke-linecap="round"/>
      <path d="M-60,-160 Q0,-120 64,-162 L58,-140 Q0,-104 -54,-138 Z" fill="${dupatta}"/>
      <ellipse cx="-34" cy="-14" rx="26" ry="11" fill="#8a4b2e"/><ellipse cx="44" cy="-14" rx="26" ry="11" fill="#8a4b2e"/>
      <g transform="translate(0 70)">${head}${face(0, -270, 1.05, mood)}${bangs}</g></g>`;
  }
  const armL = `<path d="M-50,-205 Q-72,-160 -62,-120" stroke="${kurta}" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="-62" cy="-114" r="12" fill="${skin}"/>`;
  const armR = pose === 'wave'
    ? `<g class="wave-arm"><path d="M50,-205 Q86,-238 96,-292" stroke="${kurta}" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="98" cy="-302" r="13" fill="${skin}"/></g>`
    : `<path d="M50,-205 Q72,-160 62,-120" stroke="${kurta}" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="62" cy="-114" r="12" fill="${skin}"/>`;
  return `<g class="char zoya">${hairBack}
    <path d="M-40,-112 L-48,-14 L-10,-14 L-4,-112 Z M40,-112 L48,-14 L10,-14 L4,-112 Z" fill="${shalwar}" class="ol"/>
    <ellipse cx="-30" cy="-9" rx="22" ry="9" fill="#8a4b2e"/><ellipse cx="30" cy="-9" rx="22" ry="9" fill="#8a4b2e"/>
    <path d="M-50,-212 Q-62,-150 -72,-98 L72,-98 Q62,-150 50,-212 Q0,-232 -50,-212 Z" fill="${kurta}" class="ol"/>
    <circle cx="-30" cy="-150" r="4" fill="#fff3c4"/><circle cx="10" cy="-130" r="4" fill="#fff3c4"/><circle cx="34" cy="-165" r="4" fill="#fff3c4"/><circle cx="-12" cy="-178" r="4" fill="#fff3c4"/><circle cx="40" cy="-118" r="4" fill="#fff3c4"/>
    <path d="M-52,-214 Q0,-176 54,-216 L60,-196 Q0,-150 -58,-194 Z" fill="${dupatta}"/>
    <path d="M56,-200 Q72,-150 64,-108" stroke="${dupatta}" stroke-width="16" fill="none" stroke-linecap="round"/>
    ${armL}${armR}${head}${face(0, mood === 'up' ? -292 : -270, 1.05, mood === 'up' ? 'happy' : mood)}${bangs}</g>`;
}

function echo(o = {}) {
  let cells = '';
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++)
    cells += `<circle cx="${-85.5 + c * 19}" cy="${-266 + r * 19}" r="7.8" fill="url(#gMirror)"/>`;
  return `<g class="char echo">
    <path d="M-70,-40 L-112,-2 M70,-40 L112,-2 M0,-40 L0,-4" stroke="#8a93a6" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="-114" cy="-2" rx="20" ry="7" fill="#6f7890"/><ellipse cx="114" cy="-2" rx="20" ry="7" fill="#6f7890"/>
    <g transform="rotate(-4 0 -150)">
      <rect x="-112" y="-292" width="224" height="262" rx="18" fill="url(#gSilver)" class="ol"/>
      <rect x="-99" y="-280" width="198" height="198" rx="10" fill="#8e9bb6"/>
      ${cells}
      ${face(0, -58, 1.05, o.mood || 'happy')}
    </g>
    <g class="glint">${sparkle(78, -262, 26, 'pulse')}</g>
  </g>`;
}

function eagle(o = {}) {
  let ladder = '';
  for (let i = 0; i < 8; i++) ladder += `<path d="M${-122 + i * 4},${-232 + i * 26} h34" stroke="#d7dce6" stroke-width="5" stroke-linecap="round"/>`;
  return `<g class="char eagle">
    <g stroke="#9aa3b5" stroke-width="11" stroke-linecap="round" fill="none"><path d="M-188,-170 L-300,-14 M-150,-95 L-300,-14 M188,-170 L300,-14 M150,-95 L300,-14"/></g>
    <ellipse cx="-300" cy="-6" rx="48" ry="12" fill="#cfd4de" class="ol"/><ellipse cx="300" cy="-6" rx="48" ry="12" fill="#cfd4de" class="ol"/>
    <path class="ol" d="M-150,-272 L150,-272 L196,-226 L196,-120 L150,-88 L-150,-88 L-196,-120 L-196,-226 Z" fill="url(#gGold)"/>
    <path d="M-170,-104 L170,-104 L150,-88 L-150,-88 Z" fill="#4a4566"/>
    <path d="M-130,-250 l30,40 l-10,50 M150,-250 l-20,45 l25,35 M-40,-150 l35,20 l30,-25 M20,-250 l-25,30 l20,25" stroke="#fff5cf" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>
    <rect x="-150" y="-286" width="110" height="16" rx="5" fill="#cfd4de" class="ol"/>
    <g stroke="#9aa3b5" stroke-width="11" stroke-linecap="round"><path d="M-130,-90 L-104,-14 M-60,-90 L-86,-14"/></g>
    <path d="M-124,-270 L-108,-24 M-88,-270 L-72,-24" stroke="#d7dce6" stroke-width="6" stroke-linecap="round"/>${ladder}
    <ellipse cx="-95" cy="-6" rx="46" ry="12" fill="#cfd4de" class="ol"/>
    ${face(60, -190, 1.25, o.mood || 'happy')}
  </g>`;
}

function surveyor(o = {}) {
  return `<g class="char surveyor">
    <g stroke="#9aa3b5" stroke-width="10" stroke-linecap="round"><path d="M-50,-150 L-190,-10 M50,-150 L190,-10 M0,-140 L30,-8"/></g>
    <ellipse cx="-192" cy="-5" rx="34" ry="10" fill="#cfd4de" class="ol"/><ellipse cx="192" cy="-5" rx="34" ry="10" fill="#cfd4de" class="ol"/><ellipse cx="32" cy="-3" rx="26" ry="8" fill="#cfd4de" class="ol"/>
    <path d="M-100,-150 L100,-150 L0,-118 Z" fill="none" stroke="#b9c0cd" stroke-width="7" stroke-linejoin="round"/>
    <rect x="0" y="-410" width="10" height="200" fill="#9aa3b5"/>
    <g transform="rotate(-16 5 -410)"><rect x="-95" y="-440" width="200" height="62" rx="6" fill="url(#gSolar)" class="ol"/>
      <path d="M-45,-440 v62 M5,-440 v62 M55,-440 v62 M-95,-409 h200" stroke="#7d93d6" stroke-width="2"/></g>
    <g transform="rotate(14 5 -380)"><rect x="-30" y="-372" width="80" height="26" rx="4" fill="#e3e6ec" class="ol"/></g>
    <rect x="-66" y="-222" width="132" height="84" rx="14" fill="#eef1f5" class="ol"/>
    <rect x="72" y="-206" width="54" height="44" rx="8" fill="#d9dee6" class="ol"/>
    <g transform="translate(-96 -238)"><rect x="-20" y="-10" width="40" height="56" rx="10" fill="#d9dee6" class="ol"/><path d="M-22,-10 L22,-10 L14,-34 L-14,-34 Z" fill="#9fb6d8" class="ol"/><circle cx="0" cy="20" r="9" fill="${INK}"/></g>
    ${o.dusty ? '<circle cx="-30" cy="-200" r="5" fill="#a8a296" opacity=".7"/><circle cx="40" cy="-160" r="4" fill="#a8a296" opacity=".7"/><circle cx="96" cy="-190" r="4" fill="#a8a296" opacity=".7"/>' : ''}
    ${face(0, -184, .95, o.mood || 'happy')}
  </g>`;
}

function astronaut(o = {}) {
  const step = o.step ? 'class="walk"' : '';
  return `<g class="char astronaut" ${step}>
    <path d="M-34,-110 L-40,-14 L-6,-14 L-4,-110 Z M34,-110 L40,-14 L6,-14 L4,-110 Z" fill="#f4f5f8" class="ol"/>
    <ellipse cx="-24" cy="-10" rx="22" ry="10" fill="#c9ced8" class="ol"/><ellipse cx="24" cy="-10" rx="22" ry="10" fill="#c9ced8" class="ol"/>
    <rect x="-62" y="-236" width="40" height="110" rx="12" fill="#dfe3ea" class="ol"/>
    <rect x="-46" y="-232" width="92" height="128" rx="30" fill="#f4f5f8" class="ol"/>
    <rect x="-22" y="-196" width="44" height="30" rx="6" fill="#cfd4de" class="ol"/><circle cx="-10" cy="-181" r="4" fill="#ff7a6b"/><circle cx="6" cy="-181" r="4" fill="#4fc3f7"/>
    <path d="M-44,-210 Q-70,-170 -60,-130 M44,-210 Q${o.wave ? '80,-250 86,-284' : '70,-170 60,-130'}" stroke="#f4f5f8" stroke-width="26" fill="none" stroke-linecap="round"/>
    <circle cx="0" cy="-286" r="58" fill="#f4f5f8" class="ol"/>
    <rect x="-42" y="-318" width="84" height="58" rx="26" fill="#f2b84b" class="ol"/>
    <path d="M-30,-306 q16,-10 30,-6" stroke="#fff6d6" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>`;
}

function lrv(o = {}) {
  const wheel = (x) => `<g transform="translate(${x} -54)"><g class="wheel">
    <circle r="54" fill="#c3c9d4" class="ol"/><circle r="42" fill="none" stroke="#8a93a6" stroke-width="6" stroke-dasharray="7 6"/>
    <path d="M-30,-30 L30,30 M30,-30 L-30,30" stroke="#a3abb9" stroke-width="5"/><circle r="13" fill="#6f7890"/></g></g>
    <path d="M${x - 66},-60 A66 66 0 0 1 ${x + 66},-60" stroke="#e1e5ec" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  return `<g class="char lrv">
    ${wheel(-168)}${wheel(168)}
    <rect x="-236" y="-118" width="472" height="24" rx="10" fill="#a3abb9" class="ol"/>
    <rect x="-238" y="-170" width="68" height="52" rx="8" fill="#d9dee6" class="ol"/>
    <g fill="#6a86c2" class="ol"><rect x="-140" y="-176" width="74" height="58" rx="12"/><rect x="-46" y="-176" width="74" height="58" rx="12"/>
    <rect x="-150" y="-226" width="20" height="58" rx="8"/><rect x="-56" y="-226" width="20" height="58" rx="8"/></g>
    <rect x="96" y="-206" width="112" height="90" rx="18" fill="#eef1f5" class="ol"/>
    ${face(152, -164, .8, o.mood || 'happy')}
    <path d="M200,-206 L222,-318" stroke="#9aa3b5" stroke-width="8" stroke-linecap="round"/>
    <path d="M168,-318 Q222,-370 276,-318 Z" fill="#f2f4f8" class="ol"/><path d="M222,-318 L222,-356 M196,-322 L210,-352 M248,-322 L234,-352" stroke="#c3c9d4" stroke-width="3"/>
    <path d="M110,-206 L96,-292" stroke="#9aa3b5" stroke-width="5"/><path d="M90,-292 l12,-8 l-12,-8 l12,-8" stroke="#9aa3b5" stroke-width="4" fill="none"/>
    <rect x="226" y="-200" width="34" height="24" rx="5" fill="#d9dee6" class="ol"/>
  </g>`;
}

function seismo(o = {}) {
  let pleats = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; pleats += `<path d="M0,-8 L${(Math.cos(a) * 165).toFixed(1)},${(-8 + Math.sin(a) * 32).toFixed(1)}" stroke="#c9cfdb" stroke-width="2"/>`; }
  return `<g class="char seismo">
    <ellipse cx="0" cy="-8" rx="170" ry="34" fill="url(#gSilver)" class="ol"/>${pleats}
    <rect x="-60" y="-160" width="120" height="150" rx="10" fill="url(#gSilver)" class="ol"/>
    <ellipse cx="0" cy="-160" rx="60" ry="16" fill="#f7f8fb" class="ol"/>
    <rect x="-60" y="-60" width="120" height="14" fill="#c9cfdb"/>
    ${face(0, -108, 1, o.mood || 'happy')}
  </g>`;
}

function oppy(o = {}) {
  const mood = o.mood || 'happy';
  const w = (x, back = false) => `<g transform="translate(${x} ${back ? -44 : -34})"><g class="wheel"><circle r="${back ? 28 : 34}" fill="${back ? '#7d8597' : '#a3abb9'}" class="ol"/><circle r="${back ? 10 : 12}" fill="#5d6577"/><path d="M0,-${back ? 22 : 27} V-${back ? 12 : 15} M0,${back ? 12 : 15} V${back ? 22 : 27} M-${back ? 22 : 27},0 H-${back ? 12 : 15} M${back ? 12 : 15},0 H${back ? 22 : 27}" stroke="#5d6577" stroke-width="4"/></g></g>`;
  const eyes = mood === 'rest'
    ? `<path d="M64,-356 q13,9 26,0 M100,-356 q13,9 26,0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<g class="blink"><circle cx="77" cy="-356" r="14" fill="${INK}"/><circle cx="113" cy="-356" r="14" fill="${INK}"/><circle cx="81" cy="-361" r="4.5" fill="#fff"/><circle cx="117" cy="-361" r="4.5" fill="#fff"/></g>`;
  return `<g class="char oppy">
    ${w(-130, true)}${w(20, true)}${w(150, true)}
    <path d="M-150,-34 L-80,-96 L0,-34 M-80,-96 L60,-112 L150,-34" stroke="#8a93a6" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${w(-150)}${w(0)}${w(150)}
    <rect x="-112" y="-170" width="224" height="72" rx="12" fill="url(#gGold)" class="ol"/>
    <path d="M-262,-190 L242,-190 L272,-164 L-232,-164 Z" fill="url(#gSolar)" class="ol"/>
    <path d="M-180,-190 L-150,-164 M-90,-190 L-60,-164 M0,-190 L30,-164 M90,-190 L120,-164 M180,-190 L210,-164" stroke="#7d93d6" stroke-width="2"/>
    ${o.dusty ? '<path d="M-262,-190 L242,-190 L272,-164 L-232,-164 Z" fill="#d79a6a" opacity=".75"/>' : ''}
    <ellipse cx="-70" cy="-208" rx="34" ry="12" fill="#eef1f5" class="ol"/><rect x="-74" y="-200" width="8" height="12" fill="#9aa3b5"/>
    <path d="M-160,-190 L-160,-262" stroke="#9aa3b5" stroke-width="5"/><circle cx="-160" cy="-266" r="7" fill="#eef1f5" class="ol"/>
    <path d="M112,-140 L180,-112 L176,-72" stroke="#9aa3b5" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="176" cy="-66" r="16" fill="#d9dee6" class="ol"/>
    <rect x="88" y="-330" width="16" height="142" fill="#d9dee6" class="ol"/>
    <rect x="46" y="-388" width="100" height="62" rx="20" fill="#f4f5f8" class="ol"/>
    <ellipse cx="60" cy="-334" rx="9" ry="5" fill="#ff8fa3" opacity=".6"/><ellipse cx="132" cy="-334" rx="9" ry="5" fill="#ff8fa3" opacity=".6"/>
    ${eyes}
    <path d="M88,-339 q8,${mood === 'rest' ? 3 : 7} 16,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>`;
}

function ingenuity(o = {}) {
  const lower = o.broken
    ? `<path d="M-150,-214 Q0,-226 150,-214 Q0,-202 -150,-214 Z" fill="#3a3f5a" class="ol"/>`
    : `<ellipse cx="0" cy="-214" rx="160" ry="10" fill="#3a3f5a" class="ol"/>`;
  const upper = o.broken
    ? `<path d="M-160,-252 Q0,-264 60,-252 Q0,-240 -160,-252 Z" fill="#3a3f5a" class="ol"/><path d="M60,-252 L96,-232 L108,-200" stroke="#3a3f5a" stroke-width="9" fill="none" stroke-linecap="round" class="ol"/>`
    : `<ellipse cx="0" cy="-252" rx="160" ry="10" fill="#3a3f5a" class="ol"/>`;
  const piece = o.broken ? `<path d="M150,-6 L250,-14" stroke="#3a3f5a" stroke-width="10" stroke-linecap="round"/>` : '';
  return `<g class="char ingenuity">
    <g stroke="#c9ced8" stroke-width="6" stroke-linecap="round"><path d="M-36,-92 L-96,-4 M36,-92 L96,-4 M-14,-92 L-40,-2 M14,-92 L40,-2"/></g>
    <circle cx="-96" cy="-4" r="7" fill="#9aa3b5"/><circle cx="96" cy="-4" r="7" fill="#9aa3b5"/><circle cx="-40" cy="-2" r="6" fill="#9aa3b5"/><circle cx="40" cy="-2" r="6" fill="#9aa3b5"/>
    <rect x="-50" y="-162" width="100" height="74" rx="16" fill="#eef1f5" class="ol"/>
    <rect x="-50" y="-112" width="100" height="18" fill="url(#gGold)"/>
    ${face(0, -138, .82, o.mood || 'happy')}
    <rect x="-6" y="-306" width="12" height="148" fill="#9aa3b5"/>
    <g class="rotorA">${lower}</g>
    <g class="rotorB">${upper}</g>${piece}
    <circle cx="0" cy="-214" r="10" fill="#6f7890"/><circle cx="0" cy="-252" r="10" fill="#6f7890"/>
    <rect x="-52" y="-326" width="104" height="20" rx="5" fill="url(#gSolar)" class="ol"/>
  </g>`;
}

function pioneer(o = {}) {
  /* centre origin */
  return `<g class="char pioneer">
    <path d="M-40,40 L-280,140 M40,40 L280,140" stroke="#9aa3b5" stroke-width="9" stroke-linecap="round"/>
    <g transform="translate(-290 146) rotate(23)"><rect x="-40" y="-16" width="80" height="32" rx="8" fill="#6f7890" class="ol"/><path d="M-26,-16 v-12 M-8,-16 v-12 M10,-16 v-12 M28,-16 v-12 M-26,16 v12 M-8,16 v12 M10,16 v12 M28,16 v12" stroke="#6f7890" stroke-width="4"/></g>
    <g transform="translate(290 146) rotate(-23)"><rect x="-40" y="-16" width="80" height="32" rx="8" fill="#6f7890" class="ol"/><path d="M-26,-16 v-12 M-8,-16 v-12 M10,-16 v-12 M28,-16 v-12 M-26,16 v12 M-8,16 v12 M10,16 v12 M28,16 v12" stroke="#6f7890" stroke-width="4"/></g>
    <path d="M0,150 L0,360" stroke="#9aa3b5" stroke-width="4"/><rect x="-10" y="356" width="20" height="16" rx="4" fill="#d9dee6"/>
    <polygon points="0,70 70,105 70,175 0,210 -70,175 -70,105" fill="url(#gGold)" class="ol"/>
    <circle cx="0" cy="0" r="152" fill="url(#gSilver)" class="ol"/>
    <circle cx="0" cy="0" r="120" fill="none" stroke="#d3d8e2" stroke-width="3"/><circle cx="0" cy="0" r="82" fill="none" stroke="#d3d8e2" stroke-width="3"/>
    <path d="M-100,-100 L0,-58 L100,-100 M0,-58 L0,-150" stroke="#b9c0cd" stroke-width="4" fill="none"/>
    <circle cx="0" cy="-58" r="14" fill="#cfd4de" class="ol"/>
    ${face(0, 36, 1.3, o.mood || 'happy')}
    <g transform="translate(118 128) rotate(-12)"><rect x="-34" y="-22" width="68" height="44" rx="5" fill="url(#gGold)" class="ol"/>
      <path d="M-22,-8 h44 M-22,2 h30 M-22,12 h38" stroke="#a37624" stroke-width="2.5"/></g>
    ${sparkle(150, 100, 14, 'pulse', '#fff8d6')}
  </g>`;
}

function kepler(o = {}) {
  return `<g class="char kepler"><g transform="rotate(-14)">
    <rect x="-82" y="-210" width="164" height="300" rx="22" fill="url(#gSilver)" class="ol"/>
    <path d="M-82,-190 L82,-246 L82,-200 L-82,-150 Z" fill="#e7eaf0" class="ol"/>
    <ellipse cx="0" cy="-210" rx="70" ry="18" fill="#1b1f3b"/>
    <rect x="90" y="-150" width="66" height="250" rx="10" fill="url(#gSolar)" class="ol"/>
    <path d="M90,-90 h66 M90,-30 h66 M90,30 h66 M123,-150 v250" stroke="#7d93d6" stroke-width="2"/>
    <polygon points="-100,90 100,90 120,120 100,150 -100,150 -120,120" fill="url(#gGold)" class="ol"/>
    ${face(0, -50, 1.25, o.mood || 'happy')}
  </g></g>`;
}

/* small cameo machines (bottom origin) */
function viking() {
  return `<g class="char viking">
    <g stroke="#9aa3b5" stroke-width="8" stroke-linecap="round"><path d="M-60,-70 L-120,-6 M60,-70 L120,-6 M0,-66 L0,-4"/></g>
    <ellipse cx="-122" cy="-4" rx="24" ry="7" fill="#cfd4de" class="ol"/><ellipse cx="122" cy="-4" rx="24" ry="7" fill="#cfd4de" class="ol"/>
    <polygon points="-80,-130 80,-130 100,-100 80,-66 -80,-66 -100,-100" fill="#eef1f5" class="ol"/>
    <rect x="-70" y="-162" width="34" height="34" rx="6" fill="#6f7890" class="ol"/><rect x="36" y="-162" width="34" height="34" rx="6" fill="#6f7890" class="ol"/>
    <path d="M10,-130 L28,-230" stroke="#9aa3b5" stroke-width="7"/><ellipse cx="28" cy="-240" rx="50" ry="16" fill="#f4f5f8" class="ol" transform="rotate(-12 28 -240)"/>
    ${face(-8, -100, .75, 'happy')}</g>`;
}
function sojourner() {
  return `<g class="char sojourner">
    ${[-56, 0, 56].map(x => `<circle cx="${x}" cy="-18" r="18" fill="#a3abb9" class="ol"/><circle cx="${x}" cy="-18" r="6" fill="#5d6577"/>`).join('')}
    <path d="M-56,-18 L-28,-48 L0,-18 M-28,-48 L40,-50 L56,-18" stroke="#8a93a6" stroke-width="5" fill="none"/>
    <rect x="-66" y="-82" width="132" height="40" rx="8" fill="#e3e6ec" class="ol"/>
    <rect x="-72" y="-94" width="144" height="14" rx="4" fill="url(#gSolar)" class="ol"/>
    <path d="M50,-94 L58,-140" stroke="#9aa3b5" stroke-width="4"/><circle cx="58" cy="-142" r="5" fill="#eef1f5"/>
    ${face(0, -64, .6, 'happy')}</g>`;
}
function phoenix(o = {}) {
  const deca = (cx) => { let p = ''; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; p += `${(cx + Math.cos(a) * 74).toFixed(1)},${(-100 + Math.sin(a) * 30).toFixed(1)} `; } return `<polygon points="${p}" fill="url(#gSolar)" class="ol"/>`; };
  return `<g class="char ${o.insight ? 'insight' : 'phoenix'}">
    <g stroke="#9aa3b5" stroke-width="7" stroke-linecap="round"><path d="M-40,-66 L-80,-4 M40,-66 L80,-4 M0,-66 L0,-4"/></g>
    ${deca(-140)}${deca(140)}
    <rect x="-64" y="-126" width="128" height="62" rx="12" fill="url(#gGold)" class="ol"/>
    <rect x="-56" y="-140" width="112" height="16" rx="5" fill="#eef1f5" class="ol"/>
    <path d="M64,-110 L120,-160 L160,-90" stroke="#d9dee6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${o.insight ? '<path d="M150,-4 C150,-70 270,-70 270,-4 Z" fill="url(#gSilver)" class="ol"/>' : '<rect x="150" y="-98" width="22" height="14" rx="3" fill="#cfd4de" class="ol"/>'}
    ${face(0, -96, .7, 'happy')}</g>`;
}
function near() {
  return `<g class="char near">
    <rect x="-150" y="-50" width="90" height="90" rx="6" fill="url(#gSolar)" class="ol"/><rect x="60" y="-50" width="90" height="90" rx="6" fill="url(#gSolar)" class="ol"/>
    <rect x="-45" y="-165" width="90" height="90" rx="6" fill="url(#gSolar)" class="ol"/><rect x="-45" y="75" width="90" height="90" rx="6" fill="url(#gSolar)" class="ol"/>
    <polygon points="-38,-62 38,-62 62,-38 62,38 38,62 -38,62 -62,38 -62,-38" fill="url(#gGold)" class="ol"/>
    ${face(0, 0, .85, 'happy')}</g>`;
}
function dawn() {
  return `<g class="char dawn">
    <rect x="-330" y="-26" width="270" height="52" rx="6" fill="url(#gSolar)" class="ol"/><rect x="60" y="-26" width="270" height="52" rx="6" fill="url(#gSolar)" class="ol"/>
    <path d="M-240,-26 v52 M-150,-26 v52 M150,-26 v52 M240,-26 v52" stroke="#7d93d6" stroke-width="2"/>
    <rect x="-60" y="-55" width="120" height="110" rx="12" fill="url(#gGold)" class="ol"/>
    <circle cx="0" cy="-74" r="26" fill="#f4f5f8" class="ol"/>
    ${face(0, 0, .9, 'happy')}</g>`;
}

const PORTRAITS = {
  zoya:      { fn: () => zoya(), vb: '-88 -368 176 176' },
  echo:      { fn: () => echo(), vb: '-100 -165 200 160' },
  eagle:     { fn: () => eagle(), vb: '-60 -280 240 240' },
  surveyor:  { fn: () => surveyor(), vb: '-120 -300 240 240' },
  lrv:       { fn: () => lrv(), vb: '50 -260 210 210' },
  seismo:    { fn: () => seismo(), vb: '-110 -200 220 220' },
  oppy:      { fn: () => oppy(), vb: '6 -410 180 180' },
  ingenuity: { fn: () => ingenuity(), vb: '-170 -340 340 340' },
  pioneer:   { fn: () => pioneer(), vb: '-170 -170 340 340' },
  kepler:    { fn: () => kepler(), vb: '-170 -260 340 340' },
  viking:    { fn: () => viking(), vb: '-140 -260 280 280' },
  sojourner: { fn: () => sojourner(), vb: '-90 -150 180 180' },
  spirit:    { fn: () => oppy(), vb: '6 -410 180 180' },
  phoenix:   { fn: () => phoenix(), vb: '-230 -190 460 220' },
  insight:   { fn: () => phoenix({ insight: true }), vb: '-230 -190 520 220' },
  near:      { fn: () => near(), vb: '-170 -180 340 360' },
  dawn:      { fn: () => dawn(), vb: '-340 -120 680 240' },
  narrator:  { fn: () => `${sparkle(0, 0, 60, '', '#ffd54d')}`, vb: '-80 -80 160 160' }
};

function portraitSVG(id) {
  const p = PORTRAITS[id] || PORTRAITS.narrator;
  return `<svg viewBox="${p.vb}" aria-hidden="true" focusable="false">${p.fn()}</svg>`;
}

/* ---------- scenes ---------- */
const clickable = (id, inner) => `<g class="hit" data-card="${id}" tabindex="0" role="button" aria-label="Open ${CARDS[id].name}’s card">${inner}</g>`;

const ART = {
  title: () => `${rooftop({ moonX: 1060, moonY: 300, moonR: 210 })}
    <g class="glint-moon">${sparkle(1000, 300, 22, 'pulse', '#9dffcf')}</g>
    ${place(telescope(0, 0, -30), 1270, 760, .9)}
    ${place(zoya({ mood: 'up' }), 1420, 790, .55)}`,

  chapter1: () => `${nightSky(11)}<g class="float-slow">${moonDisc(800, 430, 220)}</g>`,
  chapter2: () => `${moonSurface({ seed: 12, earthX: 800, earthY: 260, earthR: 90 })}`,
  chapter3: () => `${deepSpace(13)}<g class="float-slow">${marsDisc(800, 420, 200)}</g>`,
  chapter4: () => `${deepSpace(14)}<g class="float-slow">${place(pioneer(), 800, 420, .7)}</g>`,
  chapter5: () => `${rooftop({ moonX: 800, moonY: 260, moonR: 170, seed: 15 })}`,

  rooftop: () => `${rooftop()}
    ${place(telescope(0, 0, -34), 900, 770, 1)}
    ${place(zoya({ mood: 'up' }), 700, 800, .95)}`,

  moonGlint: () => `<rect width="1600" height="900" fill="url(#gSpace)"/>${stars(120, 21)}
    <g class="float-slow">${moonDisc(800, 470, 380)}</g>
    <circle cx="700" cy="360" r="70" fill="url(#gGreenGlow)" class="pulse"/>
    ${sparkle(700, 360, 34, 'pulse', '#ffffff')}`,

  echoIntro: () => `${moonSurface({ seed: 22, footprints: [520, 790, 7] })}
    ${place(eagle({ mood: 'happy' }), 330, 660, .62)}
    ${clickable('echo', place(echo({ mood: 'happy' }), 980, 760, 1.25, 'class="bob"'))}`,

  laser: () => `<rect width="1600" height="900" fill="url(#gSpace)"/>${stars(200, 23)}
    ${earthDisc(260, 690, 220)}
    <g transform="translate(400 520) rotate(38)"><path d="M-36,0 A36 36 0 0 1 36,0 Z" fill="#eef1f5" class="ol"/><rect x="-44" y="0" width="88" height="22" rx="4" fill="#cfd4de" class="ol"/><rect x="-6" y="-44" width="12" height="20" fill="#9aa3b5"/></g>
    <g class="float-slow">${moonDisc(1330, 230, 150)}</g>
    <g id="echoOnMoon">${place(echo({}), 1270, 260, .22)}</g>
    <line id="beamOut" x1="420" y1="500" x2="1272" y2="215" stroke="#5dffb0" stroke-width="7" stroke-linecap="round" opacity="0"/>
    <line id="beamBack" x1="1272" y1="215" x2="420" y2="500" stroke="#b6ffd9" stroke-width="4" stroke-linecap="round" opacity="0"/>
    <circle id="hitGlow" cx="1272" cy="215" r="70" fill="url(#gGreenGlow)" opacity="0"/>
    <g id="timerBox" opacity="0"><rect x="620" y="60" width="360" height="96" rx="24" fill="#0e1235" stroke="#5dffb0" stroke-width="3"/>
      <text id="timerText" x="800" y="124" text-anchor="middle" class="svg-num" fill="#c9ffe6" font-size="52">0.00 s</text></g>`,

  measure: () => `<rect width="1600" height="900" fill="url(#gSpace)"/>${stars(180, 24)}
    ${earthDisc(230, 470, 170)}
    <g class="float-slow">${moonDisc(1390, 450, 110, false)}</g>
    ${place(echo({}), 1350, 400, .2)}
    <path d="M420,470 H1260" stroke="#ffd54d" stroke-width="5" stroke-dasharray="14 14" class="march"/>
    <path d="M420,440 v60 M1260,440 v60" stroke="#ffd54d" stroke-width="5"/>
    <rect x="610" y="370" width="460" height="74" rx="22" fill="#0e1235" stroke="#ffd54d" stroke-width="3"/>
    <text x="840" y="420" text-anchor="middle" class="svg-num" fill="#ffe7a1" font-size="40">384,400 km</text>
    <g transform="translate(1260 560)"><path d="M0,0 h70" stroke="#9dffcf" stroke-width="6" stroke-linecap="round"/><path d="M58,-12 L74,0 L58,12" stroke="#9dffcf" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="0" y="52" class="svg-label" fill="#c9ffe6" font-size="30">+3.8 cm a year</text></g>`,

  eagleScene: () => `${moonSurface({ seed: 31, footprints: [980, 800, 6, 50, -4] })}
    ${clickable('eagle', place(eagle({}), 760, 780, 1.05, 'class="bob-slow"'))}
    ${place(echo({}), 1330, 790, .55)}`,

  surveyorAlone: () => `${moonSurface({ seed: 32, earthX: 260, earthY: 160 })}
    <ellipse cx="800" cy="790" rx="520" ry="90" fill="#8c8996" opacity=".55"/><ellipse cx="800" cy="780" rx="460" ry="64" fill="#a9a6b2"/>
    ${clickable('surveyor', place(surveyor({ mood: 'calm', dusty: true }), 800, 800, 1.3))}`,

  surveyorVisit: () => `${moonSurface({ seed: 33, earthX: 260, earthY: 160 })}
    <ellipse cx="760" cy="800" rx="520" ry="90" fill="#8c8996" opacity=".55"/><ellipse cx="760" cy="790" rx="460" ry="64" fill="#a9a6b2"/>
    ${clickable('surveyor', place(surveyor({ mood: 'wow', dusty: true }), 600, 810, 1.2))}
    ${place(astronaut({ step: true }), 1120, 730, .78)}
    ${place(astronaut({ wave: true }), 1340, 700, .72)}
    ${footprints([1180, 760, 4, 60, 8])}`,

  lrvScene: () => `${moonSurface({ seed: 34 })}
    <path d="M-20,830 C300,820 500,760 700,770" stroke="#77737f" stroke-width="10" fill="none" stroke-dasharray="4 10" opacity=".8"/>
    <path d="M-20,860 C300,850 500,790 700,800" stroke="#77737f" stroke-width="10" fill="none" stroke-dasharray="4 10" opacity=".8"/>
    ${clickable('lrv', place(lrv({}), 900, 800, 1.15, 'class="bob-slow"'))}`,

  seismoScene: () => `${moonSurface({ seed: 35 })}
    ${clickable('seismo', place(seismo({}), 520, 780, 1.35))}
    <g transform="translate(860 230)"><rect x="0" y="0" width="620" height="220" rx="26" fill="#0e1235" stroke="#c5b8ff" stroke-width="3"/>
      <text x="30" y="46" class="svg-label" fill="#e4dcff" font-size="28">Rumble’s shake line</text>
      <path d="M30,140 H590" stroke="#3d3a6a" stroke-width="2"/>
      <polyline id="seisLine" points="30,140 590,140" stroke="#c5b8ff" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g>
    <path d="M610,770 C700,760 760,800 860,780" stroke="#c9cfdb" stroke-width="4" fill="none"/>
    <g transform="translate(860 700)"><rect x="0" y="0" width="120" height="90" rx="10" fill="#d9dee6" class="ol"/><rect x="0" y="-12" width="120" height="16" rx="4" fill="#4a4566"/><path d="M90,-12 L100,-90" stroke="#9aa3b5" stroke-width="5"/></g>`,

  toMars: () => `${moonSurface({ seed: 41, earth: false })}
    <g class="float-slow">${marsDisc(1240, 220, 58)}</g>
    <path d="M700,560 C900,420 1060,320 1180,250" stroke="#ffb07a" stroke-width="4" stroke-dasharray="10 14" fill="none" class="march" opacity=".8"/>
    ${clickable('echo', place(echo({ mood: 'happy' }), 560, 760, 1.05, 'class="bob"'))}`,

  oppyScene: () => `${marsSurface({})}
    <path d="M-40,820 C200,790 380,800 560,770" stroke="#8a3f22" stroke-width="12" stroke-dasharray="6 12" fill="none" opacity=".6"/>
    <path d="M-40,850 C200,820 380,830 560,800" stroke="#8a3f22" stroke-width="12" stroke-dasharray="6 12" fill="none" opacity=".6"/>
    ${clickable('oppy', place(oppy({}), 820, 800, 1.3, 'class="bob-slow"'))}`,

  blueberries: () => `${marsSurface({})}
    ${place(oppy({}), 380, 820, .9)}
    <circle cx="1040" cy="450" r="290" fill="#b85d33" class="ol" stroke-width="10"/>
    <circle cx="1040" cy="450" r="290" fill="none" stroke="#f7f1e3" stroke-width="16"/>
    <g clip-path="url(#lensClip)">
      <path d="M760,380 C900,340 1100,400 1320,350 L1320,760 L760,760 Z" fill="#a14e2a"/>
      ${(() => { const r = rng(77); let s = ''; for (let i = 0; i < 26; i++) { const x = 820 + r() * 440, y = 260 + r() * 400, R = 14 + r() * 14; if ((x - 1040) ** 2 + (y - 450) ** 2 < 255 ** 2) s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${R.toFixed(0)}" fill="#6f7f9e"/><circle cx="${(x - R * .3).toFixed(0)}" cy="${(y - R * .3).toFixed(0)}" r="${(R * .35).toFixed(0)}" fill="#c5d2ea" opacity=".8"/>`; } return s; })()}
    </g>
    <path d="M1240,690 L1420,860" stroke="#f7f1e3" stroke-width="34" stroke-linecap="round"/>
    <path d="M560,700 C700,640 760,600 800,560" stroke="#9aa3b5" stroke-width="10" fill="none" stroke-linecap="round"/>
    <text x="1040" y="130" text-anchor="middle" class="svg-label" fill="#fff3e3" font-size="34">Real “blueberries” are smaller than peas</text>`,

  marathon: () => `${marsSurface({})}
    <path id="track" d="M180,800 C300,640 520,840 720,690 C900,560 1060,760 1260,640 C1340,590 1390,610 1440,590" stroke="#7a361b" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="2 16" opacity=".8"/>
    <g id="finishBanner" transform="translate(1340 600)"><path d="M0,0 V-150 M120,0 V-150" stroke="#f7f1e3" stroke-width="8"/><rect x="-6" y="-170" width="132" height="58" rx="10" fill="#f7f1e3" class="ol"/>
      <text x="60" y="-133" text-anchor="middle" class="svg-label" fill="${INK}" font-size="24">42.2 km</text></g>
    <g id="marathonRover" transform="translate(180 800)">${place(oppy({}), 0, 0, .34)}</g>`,

  dustStorm: () => `${marsSurface({})}
    <rect width="1600" height="900" fill="url(#gDust)"/>
    <g class="dust-drift">${(() => { const r = rng(88); let s = ''; for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 1700).toFixed(0)}" cy="${(r() * 900).toFixed(0)}" r="${(2 + r() * 6).toFixed(1)}" fill="#f3c69a" opacity="${(.3 + r() * .5).toFixed(2)}"/>`; return s; })()}</g>
    <path d="M-100,300 C200,240 400,360 700,300 S1200,240 1700,300" stroke="#f3c69a" stroke-width="40" fill="none" opacity=".25" class="dust-drift"/>
    ${clickable('oppy', place(oppy({ mood: 'rest', dusty: true }), 800, 800, 1.25))}`,

  ingenuityFly: () => `${marsSurface({ crater: true })}
    <ellipse id="ingShadow" cx="800" cy="800" rx="150" ry="20" fill="#7a361b" opacity=".35"/>
    ${clickable('ingenuity', `<g id="ingBody"><g class="hover">${place(ingenuity({}), 800, 640, 1.25)}</g></g>`)}`,

  ingenuityRest: () => `${marsSurface({ sunset: true })}
    <path d="M500,800 C640,760 960,760 1100,800" fill="#c06a3c" stroke="#d98a58" stroke-width="6"/>
    ${clickable('ingenuity', place(ingenuity({ broken: true, mood: 'happy' }), 800, 790, 1.05))}`,

  marsFamily: () => `${marsSurface({})}
    <ellipse cx="1010" cy="790" rx="170" ry="30" fill="#f7f1e3" opacity=".75"/>
    ${clickable('viking', place(viking(), 175, 760, .9))}
    ${clickable('sojourner', place(sojourner(), 410, 770, 1.1))}
    ${clickable('spirit', place(oppy({}), 660, 790, .58))}
    ${clickable('phoenix', place(phoenix(), 1010, 780, .78))}
    ${clickable('insight', place(phoenix({ insight: true }), 1350, 790, .68))}
    ${[['Viking 1', 175], ['Sojourner', 410], ['Spirit', 660], ['Phoenix', 1010], ['InSight', 1360]].map(([t, x]) => `<g transform="translate(${x} 860)"><rect x="-${t.length * 9 + 22}" y="-30" width="${t.length * 18 + 44}" height="46" rx="23" fill="#fff6e8" class="ol"/><text x="0" y="3" text-anchor="middle" class="svg-label" fill="${INK}" font-size="26">${t}</text></g>`).join('')}`,

  pioneerScene: () => `${deepSpace(51)}
    <g transform="translate(260 260)"><circle r="150" fill="#e8c39e"/><path d="M-148,-40 Q0,-60 148,-40 M-150,0 Q0,-14 150,0 M-145,44 Q0,30 145,44" stroke="#c48a5e" stroke-width="18" fill="none"/><ellipse cx="50" cy="60" rx="30" ry="16" fill="#d0643e"/></g>
    ${clickable('pioneer', place(pioneer({}), 1040, 400, .95, 'class="drift"'))}`,

  keplerScene: () => `${deepSpace(52)}
    ${clickable('kepler', place(kepler({}), 330, 520, .95, 'class="bob-slow"'))}
    <circle id="starGlow" cx="1000" cy="330" r="260" fill="url(#gStarGlow)" opacity="1"/>
    <circle id="bigStar" cx="1000" cy="330" r="150" fill="url(#gStar)"/>
    <circle id="transitPlanet" cx="760" cy="330" r="34" fill="#2c3a7a" stroke="#8fb6ff" stroke-width="4"/>
    <g transform="translate(740 600)"><rect x="0" y="0" width="560" height="220" rx="24" fill="#0e1235" stroke="#ffd56b" stroke-width="3"/>
      <text x="26" y="44" class="svg-label" fill="#ffe7a1" font-size="26">Star brightness</text>
      <path d="M30,90 H530" stroke="#3d3a6a" stroke-width="2" stroke-dasharray="6 8"/>
      <polyline id="lightCurve" points="" stroke="#ffd56b" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <circle id="lcDot" cx="30" cy="90" r="8" fill="#fff"/></g>`,

  wanderers: () => `${deepSpace(53)}
    <g transform="translate(400 560)"><path d="M-260,-30 C-250,-140 -100,-150 -20,-100 C60,-60 120,-160 230,-110 C320,-70 300,60 200,90 C100,120 40,40 -40,70 C-140,110 -270,90 -260,-30 Z" fill="#a9927a" class="ol"/>
      <circle cx="-150" cy="-20" r="26" fill="#8f7a64"/><circle cx="160" cy="0" r="20" fill="#8f7a64"/><circle cx="40" cy="30" r="12" fill="#8f7a64"/></g>
    ${clickable('near', place(near(), 420, 400, .62))}
    <g transform="translate(1180 470)"><circle r="190" fill="#9b958f" class="ol"/><circle cx="-60" cy="-40" r="34" fill="#87817b"/><circle cx="70" cy="60" r="24" fill="#87817b"/>
      <circle cx="30" cy="-30" r="12" fill="#ffffff"/><circle cx="46" cy="-22" r="6" fill="#ffffff"/>${sparkle(30, -30, 20, 'pulse', '#ffffff')}</g>
    <ellipse cx="1180" cy="470" rx="320" ry="110" fill="none" stroke="#8fb6ff" stroke-width="3" stroke-dasharray="8 12" opacity=".6"/>
    ${clickable('dawn', place(dawn(), 1240, 210, .5, 'class="bob"'))}
    <text x="400" y="770" text-anchor="middle" class="svg-label" fill="#f7f1e3" font-size="30">Eros (asteroid)</text>
    <text x="1180" y="790" text-anchor="middle" class="svg-label" fill="#f7f1e3" font-size="30">Ceres (dwarf planet)</text>`,

  rooftopThink: () => `${rooftop({ moonX: 1160, moonY: 230 })}
    ${place(telescope(0, 0, -34), 1040, 770, 1)}
    ${place(zoya({ mood: 'calm' }), 760, 800, .95)}`,

  skyLights: () => `${rooftop({ moonX: 520, moonY: 240, moonR: 150, skyExtra: `<g class="float-slow">${marsDisc(1240, 220, 70)}</g>
      ${[[480, 220], [560, 270], [440, 290], [600, 200], [520, 320]].map(([x, y], i) => `<g class="tw" style="animation-delay:-${i * .7}s">${sparkle(x, y, 22, '', '#9dffcf')}</g>`).join('')}
      ${[[1220, 200], [1270, 240], [1200, 250], [1250, 180], [1290, 210], [1230, 270], [1180, 220]].map(([x, y], i) => `<g class="tw" style="animation-delay:-${i * .5}s">${sparkle(x, y, 17, '', '#fff3b0')}</g>`).join('')}
      ${[[200, 120], [1450, 380], [900, 90], [1500, 120]].map(([x, y], i) => `<g class="tw" style="animation-delay:-${i * .9}s">${sparkle(x, y, 12, '', '#b8c4ff')}</g>`).join('')}` })}
    ${place(zoya({ mood: 'up' }), 840, 800, .85)}`,

  goodnight: () => `${rooftop({ moonX: 1120, moonY: 250, moonR: 170 })}
    <circle cx="1060" cy="220" r="60" fill="url(#gGreenGlow)" class="pulse"/>${sparkle(1060, 220, 26, 'pulse', '#ffffff')}
    ${place(telescope(0, 0, -32), 560, 770, 1)}
    ${place(zoya({ pose: 'wave' }), 820, 800, .98)}`,

  end: () => `${rooftop({ moonX: 800, moonY: 300, moonR: 200, seed: 61 })}
    <circle cx="740" cy="250" r="60" fill="url(#gGreenGlow)" class="pulse"/>${sparkle(740, 250, 24, 'pulse', '#ffffff')}
    ${place(zoya({ pose: 'wave' }), 1300, 790, .6)}`
};

function sceneSVG(artId, alt) {
  const body = (ART[artId] || ART.chapter1)();
  return `<svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${(alt || '').replace(/"/g, '&quot;')}">
    <g class="world">${body}</g>${paper()}</svg>`;
}
