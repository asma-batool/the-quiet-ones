/* ============================================================
   THE QUIET ONES — sounds + interactions
   Every interaction: lives in the page (big buttons on phones),
   animates the SVG in the stage, never blocks "Next", and jumps
   straight to the result when motion is reduced.
   ============================================================ */

const SFX = {
  ctx: null, on: true,
  ac() { if (!this.on) return null; try { this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)(); if (this.ctx.state === 'suspended') this.ctx.resume(); return this.ctx; } catch (e) { return null; } },
  tone(f1, f2, dur, type = 'sine', vol = .07, delay = 0) {
    const c = this.ac(); if (!c) return;
    const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .05);
  },
  laser() { this.tone(1400, 300, .35, 'square', .04); },
  ding() { this.tone(880, 0, .5, 'sine', .08); this.tone(1320, 0, .6, 'sine', .06, .12); },
  pop() { this.tone(520, 880, .12, 'sine', .06); },
  rumble() {
    const c = this.ac(); if (!c) return;
    const len = c.sampleRate * 1.2, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'lowpass'; f.frequency.value = 140; g.gain.value = .5; s.buffer = buf; s.connect(f).connect(g).connect(c.destination); s.start();
  },
  whirr(dur) {
    const c = this.ac(); if (!c) return null;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
    o.type = 'sawtooth'; o.frequency.value = 95; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.025, t + .3);
    g.gain.setValueAtTime(.025, t + dur - .4); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .1);
  }
};

function mkBtn(label, cls = 'act-btn pulse-btn') { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = label; return b; }
function mkReadout() { const r = document.createElement('div'); r.className = 'readout'; r.setAttribute('aria-live', 'polite'); return r; }
function tween(dur, step, done, reduced) {
  if (reduced) { step(1); done && done(); return () => {}; }
  let raf, t0 = performance.now(), dead = false;
  const f = (now) => { if (dead) return; const p = Math.min(1, (now - t0) / dur); step(p); if (p < 1) raf = requestAnimationFrame(f); else done && done(); };
  raf = requestAnimationFrame(f);
  return () => { dead = true; cancelAnimationFrame(raf); };
}
const easeInOut = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

const INTERACTIONS = {
  laser(c) {
    const b = mkBtn('Fire the laser!'), out = mkReadout();
    c.actions.append(b, out);
    const $ = s => c.svg.querySelector(s);
    const outL = $('#beamOut'), backL = $('#beamBack'), hit = $('#hitGlow'), box = $('#timerBox'), txt = $('#timerText');
    const len = Math.hypot(1272 - 420, 500 - 215);
    let stop = () => {};
    b.onclick = (e) => {
      e.stopPropagation(); b.disabled = true; b.classList.remove('pulse-btn'); out.textContent = '';
      SFX.laser();
      [outL, backL].forEach(l => { l.setAttribute('stroke-dasharray', len); l.setAttribute('stroke-dashoffset', len); l.setAttribute('opacity', 1); });
      box.setAttribute('opacity', 1); hit.setAttribute('opacity', 0);
      stop = tween(2500, p => {
        const t = p * 2.5;
        txt.textContent = t.toFixed(2) + ' s';
        if (p < .5) outL.setAttribute('stroke-dashoffset', len * (1 - p / .5));
        else {
          outL.setAttribute('stroke-dashoffset', 0); hit.setAttribute('opacity', 1);
          backL.setAttribute('stroke-dashoffset', len * (1 - (p - .5) / .5));
        }
      }, () => {
        txt.textContent = '2.50 s'; SFX.ding();
        out.textContent = 'Back in 2.5 seconds! The light zoomed to the Moon and back: about 768,800 km.';
        b.disabled = false; b.textContent = 'Fire again!';
        setTimeout(() => { [outL, backL, hit].forEach(l => l && l.setAttribute('opacity', 0)); }, 1200);
      }, c.reduced);
    };
    return () => stop();
  },

  quake(c) {
    const b = mkBtn('Make a moonquake!'), out = mkReadout();
    c.actions.append(b, out);
    const line = c.svg.querySelector('#seisLine'); let stop = () => {};
    const draw = (amp, ph) => {
      let pts = [];
      for (let i = 0; i <= 70; i++) { const x = 30 + i * 8; const env = Math.exp(-Math.pow((x - 230) / 170, 2)); pts.push(`${x},${(140 + Math.sin(i * 1.7 + ph) * amp * env * (0.6 + 0.4 * Math.sin(i * .5))).toFixed(1)}`); }
      line.setAttribute('points', pts.join(' '));
    };
    b.onclick = (e) => {
      e.stopPropagation(); b.classList.remove('pulse-btn'); out.textContent = '';
      SFX.rumble();
      c.stage.classList.remove('shake'); void c.stage.offsetWidth; c.stage.classList.add('shake');
      stop = tween(2200, p => draw(70 * (1 - p), p * 40), () => {
        draw(0, 0);
        out.textContent = 'Rumble felt it! The Moon is so dry that real moonquakes can keep shaking for a long time, a bit like a ringing bell.';
        b.textContent = 'Another one!';
      }, c.reduced);
    };
    return () => { stop(); c.stage.classList.remove('shake'); };
  },

  odometer(c) {
    const b = mkBtn('Drive, Oppy!'), out = mkReadout();
    c.actions.append(b, out);
    const path = c.svg.querySelector('#track'), rover = c.svg.querySelector('#marathonRover');
    const L = path.getTotalLength(); let stop = () => {};
    const fin = path.getPointAtLength(L * 42.2 / 45.16), banner = c.svg.querySelector('#finishBanner');
    if (banner) banner.setAttribute('transform', `translate(${(fin.x - 60).toFixed(0)} ${(fin.y + 6).toFixed(0)})`);
    b.onclick = (e) => {
      e.stopPropagation(); b.disabled = true; b.classList.remove('pulse-btn');
      let marathon = false;
      stop = tween(6500, p => {
        const q = easeInOut(p), pt = path.getPointAtLength(L * q);
        rover.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
        const km = 45.16 * q;
        if (km >= 42.2 && !marathon) { marathon = true; SFX.pop(); }
        out.textContent = `${km.toFixed(2)} km${marathon ? '  – marathon done!' : ''}`;
      }, () => {
        SFX.ding(); out.textContent = '45.16 km! Longer than a marathon (42.2 km), driven slowly and carefully over 14 years.';
        b.disabled = false; b.textContent = 'Drive again!';
      }, c.reduced);
    };
    return () => stop();
  },

  flights(c) {
    const b = mkBtn('Fly, Ingenuity!'), out = mkReadout();
    c.actions.append(b, out);
    const body = c.svg.querySelector('#ingBody'), shadow = c.svg.querySelector('#ingShadow'); let stop = () => {}, t1;
    b.onclick = (e) => {
      e.stopPropagation(); b.disabled = true; b.classList.remove('pulse-btn');
      c.svg.classList.add('spinning'); body.classList.add('lifted'); shadow.setAttribute('rx', 90); shadow.setAttribute('opacity', .2);
      SFX.whirr(6);
      let saidPlan = false;
      stop = tween(5600, p => {
        const n = Math.max(1, Math.round(72 * easeInOut(p)));
        if (n >= 5 && !saidPlan) { saidPlan = true; }
        out.textContent = n < 6 ? `Flight ${n}${n === 5 ? ': that was the whole plan!' : ''}` : `Flight ${n}… keep going!`;
      }, () => {
        SFX.ding(); out.textContent = '72 flights! That’s more than 14 times the plan.';
        t1 = setTimeout(() => { body.classList.remove('lifted'); shadow.setAttribute('rx', 150); shadow.setAttribute('opacity', .35); setTimeout(() => c.svg.classList.remove('spinning'), 1200); }, 600);
        b.disabled = false; b.textContent = 'Fly again!';
      }, c.reduced);
    };
    return () => { stop(); clearTimeout(t1); };
  },

  transit(c) {
    const wrap = document.createElement('label'); wrap.style.cssText = 'display:flex;flex-direction:column;gap:4px;font-weight:800;';
    wrap.textContent = 'Slide the planet across the star';
    const sl = document.createElement('input'); sl.type = 'range'; sl.min = 0; sl.max = 100; sl.value = 0; sl.className = 'slider'; sl.id = 'transitSlider';
    wrap.append(sl);
    const play = mkBtn('Play it for me', 'act-btn secondary'), out = mkReadout();
    c.actions.append(wrap, play, out);
    const $ = s => c.svg.querySelector(s);
    const planet = $('#transitPlanet'), star = $('#bigStar'), glow = $('#starGlow'), curve = $('#lightCurve'), dot = $('#lcDot');
    const R = 150, r = 34, sx = 1000;
    const area = (d) => { if (d >= R + r) return 0; if (d <= R - r) return Math.PI * r * r; const a = r * r * Math.acos((d * d + r * r - R * R) / (2 * d * r)), b2 = R * R * Math.acos((d * d + R * R - r * r) / (2 * d * R)), cc = .5 * Math.sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R)); return a + b2 - cc; };
    const seen = new Map(); let dipSeen = false, stop = () => {};
    const update = (v) => {
      const x = 760 + v * 4.8, dip = area(Math.abs(x - sx)) / (Math.PI * R * R);
      planet.setAttribute('cx', x.toFixed(1)); star.setAttribute('opacity', (1 - dip * 5).toFixed(3)); glow.setAttribute('opacity', (.18 - dip * 2).toFixed(3));
      seen.set(Math.round(v), dip);
      const pts = [...seen.entries()].sort((a, b) => a[0] - b[0]).map(([k, d]) => `${(30 + k * 5)},${(90 + d * 1600).toFixed(1)}`);
      curve.setAttribute('points', pts.join(' '));
      dot.setAttribute('cx', 30 + v * 5); dot.setAttribute('cy', (90 + dip * 1600).toFixed(1));
      if (dip > 0) { dipSeen = true; out.textContent = 'The line dips: the star got dimmer. A planet is passing!'; }
      else if (dipSeen) out.textContent = 'That dip is how Kepler found planets it could not see.';
      else out.textContent = 'Move the planet in front of the star.';
    };
    sl.addEventListener('input', () => update(+sl.value));
    sl.addEventListener('click', e => e.stopPropagation());
    play.onclick = (e) => { e.stopPropagation(); stop(); stop = tween(4500, p => { sl.value = p * 100; update(p * 100); }, null, c.reduced); };
    update(0);
    return () => stop();
  },

  map(c) {
    const b = mkBtn('Open the map'); b.onclick = (e) => { e.stopPropagation(); c.api.openMap(); };
    c.actions.append(b); return () => {};
  }
};
