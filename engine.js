/* ============================================================
   THE QUIET ONES — scene engine
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const stage = $('#stage'), page = $('#page'), nextBtn = $('#nextBtn'), backBtn = $('#backBtn');
  const bar = $('#bar'), progText = $('#progText'), chapterLabel = $('#chapterLabel');
  const reduced = () => document.documentElement.classList.contains('calm') || matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(k, d) { try { const v = localStorage.getItem('quietones:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('quietones:' + k, JSON.stringify(v)); } catch (e) {} }
  };

  const S = {
    i: 0, line: 0, cleanup: () => {},
    met: new Set(store.get('met', [])),
    voice: store.get('voice', false), sfx: store.get('sfx', true), big: store.get('big', false), calm: store.get('calm', false),
    lastFocus: null
  };
  SFX.on = S.sfx;
  document.documentElement.classList.toggle('big-text', S.big);
  document.documentElement.classList.toggle('calm', S.calm);

  const chapterStart = n => SCENES.findIndex(s => s.type === 'chapter' && s.ch === n);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- voice ---------- */
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices(); } catch (e) { voices = []; } }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function pickVoice() {
    const en = voices.filter(v => /^en/i.test(v.lang));
    return en.find(v => /en-GB/i.test(v.lang) && /female|libby|sonia|serena|kate|google uk/i.test(v.name)) || en.find(v => /en-(GB|IN)/i.test(v.lang)) || en[0] || null;
  }
  function speak(text, who) {
    if (!S.voice || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/…/g, '...'));
      const v = pickVoice(); if (v) u.voice = v;
      const p = (CHARS[who] && CHARS[who].voice) || { pitch: 1, rate: 1 };
      u.pitch = p.pitch; u.rate = p.rate * 0.95;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function hush() { try { speechSynthesis.cancel(); } catch (e) {} }

  /* ---------- progress ---------- */
  function setProgress() {
    const pct = S.i / (SCENES.length - 1) * 100;
    bar.style.width = pct.toFixed(1) + '%';
    const sc = SCENES[S.i];
    progText.textContent = sc.ch ? `Chapter ${sc.ch} of ${CHAPTERS.length}` : (sc.type === 'end' ? 'The end' : '');
    $('.progress').setAttribute('aria-valuenow', Math.round(pct));
  }

  /* ---------- rendering ---------- */
  function renderStage(sc) {
    stage.innerHTML = sceneSVG(sc.type === 'chapter' ? CHAPTERS[sc.ch - 1].art : sc.art, sc.type === 'chapter' ? `Chapter ${sc.ch}: ${CHAPTERS[sc.ch - 1].title}` : sc.alt);
    const svg = stage.querySelector('svg');
    svg.classList.add('scene-in');
    stage.classList.remove('shake');
    stage.classList.toggle('wide', !!sc.wide);
    /* make the whole outline of each tappable character a tap target, not just its painted parts */
    svg.querySelectorAll('.hit').forEach(g => {
      try {
        const b = g.getBBox(), r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('x', b.x - 10); r.setAttribute('y', b.y - 10); r.setAttribute('width', b.width + 20); r.setAttribute('height', b.height + 20);
        r.setAttribute('fill', 'transparent'); g.insertBefore(r, g.firstChild);
      } catch (e) {}
    });
  }

  function render(i, line = 0) {
    S.cleanup(); S.cleanup = () => {}; hush();
    S.i = Math.max(0, Math.min(SCENES.length - 1, i));
    const sc = SCENES[S.i];
    S.line = sc.lines ? Math.max(0, Math.min(sc.lines.length - 1, line)) : 0;
    document.body.classList.toggle('on-title', sc.type === 'title');
    renderStage(sc);
    const ch = sc.ch ? CHAPTERS[sc.ch - 1] : null;
    chapterLabel.textContent = ch ? `Chapter ${ch.n} · ${ch.title}` : 'The Quiet Ones';
    try { history.replaceState(null, '', ch ? `#chapter-${ch.n}` : location.pathname + location.search); } catch (e) {}
    if (sc.type === 'title') renderTitle();
    else if (sc.type === 'chapter') renderChapter(sc);
    else if (sc.type === 'end') renderEnd();
    else showLine();
    backBtn.disabled = S.i === 0;
    nextBtn.querySelector('.lbl').textContent = sc.type === 'end' ? 'Read again' : 'Next';
    setProgress();
    store.set('pos', S.i);
  }

  function renderTitle() {
    page.className = 'page title-page';
    page.innerHTML = `
      <div class="title-text"><h1>The Quiet Ones</h1>
      <p>A bedtime story about the robots and spacecraft we left on the Moon, on Mars and in deep space, and what they taught us.</p>
      <div class="meta">For ages 7 to 12 · About 10 minutes · Can be read aloud</div></div>
      <div class="actions">
        <button class="act-btn pulse-btn" id="startBtn" type="button">Start the story</button>
        <button class="act-btn secondary" id="titleMap" type="button">Explore the map</button>
        <button class="act-btn secondary" id="titleAbout" type="button">For parents and teachers</button>
      </div>`;
    $('#startBtn').onclick = (e) => { e.stopPropagation(); SFX.pop(); render(1); };
    $('#titleMap').onclick = (e) => { e.stopPropagation(); openMap(); };
    $('#titleAbout').onclick = (e) => { e.stopPropagation(); openAbout(); };
  }

  function renderChapter(sc) {
    const ch = CHAPTERS[sc.ch - 1];
    page.className = 'page title-page chapter-page';
    page.innerHTML = `<div class="kicker">Chapter ${ch.n} of ${CHAPTERS.length}</div><h2>${esc(ch.title)}</h2>`;
    speak(`Chapter ${ch.n}. ${ch.title}.`, 'narrator');
  }

  function renderEnd() {
    page.className = 'page title-page';
    page.innerHTML = `
      <div class="title-text"><h1>The End</h1>
      <p>Abandoned, but not forgotten. You met ${S.met.size} of ${Object.keys(CARDS).length} quiet explorers tonight.</p></div>
      <div class="actions">
        <button class="act-btn pulse-btn" id="endMap" type="button">Open the map</button>
        <button class="act-btn secondary" id="endAgain" type="button">Read it again</button>
        <button class="act-btn secondary" id="endAbout" type="button">For parents and teachers</button>
      </div>`;
    $('#endMap').onclick = (e) => { e.stopPropagation(); openMap(); };
    $('#endAgain').onclick = (e) => { e.stopPropagation(); render(1); };
    $('#endAbout').onclick = (e) => { e.stopPropagation(); openAbout(); };
    speak('The end. Abandoned, but not forgotten.', 'narrator');
  }

  function showLine() {
    S.cleanup(); S.cleanup = () => {};
    const sc = SCENES[S.i], ln = sc.lines[S.line], who = CHARS[ln.who] || CHARS.narrator;
    page.className = 'page';
    page.style.setProperty('--who', who.color);
    const portrait = ln.who === 'narrator' ? '' : `<div class="portrait ${ln.who}" aria-hidden="true">${portraitSVG(ln.who)}</div>`;
    page.innerHTML = `
      ${portrait}
      <div class="speaker">${who.name ? `<span class="tag">${esc(who.name)}</span>` : '<span class="tag">Fun fact</span>'}</div>
      <p class="line fade" aria-live="polite">${esc(ln.text)}</p>
      <div class="actions" id="actions"></div>
      ${sc.card ? `<button class="card-btn" id="cardBtn" type="button">${esc(CARDS[sc.card].name)}’s card</button>` : ''}`;
    if (!portrait) page.querySelector('.speaker').style.gridColumn = '1 / -1';
    if (!portrait) page.querySelector('.line').style.gridColumn = '1 / -1';
    if (sc.card) { markMet(sc.card); $('#cardBtn').onclick = (e) => { e.stopPropagation(); openCard(sc.card); }; }
    const actions = $('#actions');
    if (ln.act && INTERACTIONS[ln.act]) {
      S.cleanup = INTERACTIONS[ln.act]({ svg: stage.querySelector('svg'), stage, actions, reduced: reduced(), api: { openMap, openCard } });
    }
    if (ln.cards) {
      ln.cards.forEach(id => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
        b.innerHTML = `<span class="mini" aria-hidden="true">${portraitSVG(id)}</span>${esc(CARDS[id].name)}`;
        b.onclick = (e) => { e.stopPropagation(); openCard(id); };
        actions.append(b);
      });
    }
    speak(ln.text, ln.who);
  }

  function markMet(id) { if (!S.met.has(id)) { S.met.add(id); store.set('met', [...S.met]); } }

  /* ---------- navigation ---------- */
  function next() {
    const sc = SCENES[S.i];
    if (sc.type === 'end') { render(1); return; }
    if (sc.lines && S.line < sc.lines.length - 1) { S.line++; showLine(); return; }
    render(S.i + 1);
  }
  function back() {
    const sc = SCENES[S.i];
    if (sc.lines && S.line > 0) { S.line--; showLine(); return; }
    if (S.i === 0) return;
    const prev = SCENES[S.i - 1];
    render(S.i - 1, prev.lines ? prev.lines.length - 1 : 0);
  }
  nextBtn.onclick = () => { SFX.ac(); next(); };
  backBtn.onclick = back;

  stage.addEventListener('click', (e) => {
    const hit = e.target.closest('.hit');
    if (hit) { openCard(hit.dataset.card); return; }
    if (SCENES[S.i].type === 'title') return;
    next();
  });
  stage.addEventListener('keydown', (e) => {
    const hit = e.target.closest && e.target.closest('.hit');
    if (hit && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openCard(hit.dataset.card); }
  });
  let tx = null, ty = null;
  stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (tx == null) return; const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { e.preventDefault(); dx < 0 ? next() : back(); }
  });
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.overlay.open')) { if (e.key === 'Escape') closeOverlays(); return; }
    if (e.target.matches('input, textarea')) return;
    if (e.key === 'ArrowRight' || (e.key === ' ' && !e.target.matches('button, [role=button]'))) { e.preventDefault(); if (SCENES[S.i].type !== 'title') next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); back(); }
  });

  /* ---------- overlays ---------- */
  const ov = $('#overlay'), sheet = $('#sheet');
  function openSheet(html, cls = '') {
    S.lastFocus = document.activeElement;
    sheet.className = 'sheet ' + cls;
    sheet.innerHTML = `<button class="close-x" type="button" aria-label="Close">×</button>${html}`;
    ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false');
    sheet.querySelector('.close-x').onclick = closeOverlays;
    setTimeout(() => sheet.querySelector('.close-x').focus(), 30);
  }
  function closeOverlays() {
    ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true');
    if (S.lastFocus && S.lastFocus.focus) S.lastFocus.focus();
  }
  ov.addEventListener('click', (e) => { if (e.target === ov) closeOverlays(); });
  ov.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = [...sheet.querySelectorAll('button, a, input, [tabindex="0"]')].filter(x => !x.disabled);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  function openCard(id) {
    const c = CARDS[id]; if (!c) return;
    markMet(id); SFX.pop(); hush();
    const color = (CHARS[id] && CHARS[id].color) || '#c9c3d8';
    openSheet(`
      <div class="card-head" style="--who:${color}">
        <div class="card-art" aria-hidden="true">${portraitSVG(id)}</div>
        <div><h2 id="sheetTitle">${esc(c.name)}</h2><p class="card-real">${esc(c.real)}</p>
        <span class="status ${c.status}">${esc(c.statusText)}</span></div>
      </div>
      <div class="facts-grid">
        <div class="fact-box"><b>Where now</b><span>${esc(c.where)}</span></div>
        <div class="fact-box"><b>When</b><span>${esc(c.when)}</span></div>
        <div class="fact-box"><b>How big</b><span>${esc(c.size)}</span></div>
      </div>
      <h3>What it did</h3>
      <ul>${c.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      <a class="real-link" href="${c.link.href}" target="_blank" rel="noopener">See real photos: ${esc(c.link.label)} ↗</a>`, 'card-sheet');
    sheet.setAttribute('aria-labelledby', 'sheetTitle');
    if (S.voice) speak(`${c.name}. ${c.statusText}. ${c.facts.join(' ')}`, 'narrator');
  }

  function openMap() {
    hush();
    const total = Object.keys(CARDS).length;
    const dots = { moon: '#d9d6df', mars: '#e07a45', space: '#8fb6ff' };
    openSheet(`
      <h2 id="sheetTitle">Map of the Quiet Ones</h2>
      <p class="map-intro">You have met ${S.met.size} of ${total}. Tap anyone to open their card.</p>
      ${MAP_GROUPS.map(g => `<section class="map-group"><h3><span class="dot" style="background:${dots[g.place]}"></span>${g.title}</h3>
        <div class="map-grid">${g.ids.map(id => `<button type="button" class="map-item ${S.met.has(id) ? 'met' : ''}" data-id="${id}">
          <span class="mini" aria-hidden="true">${portraitSVG(id)}</span>${esc(CARDS[id].name)}<small>${esc(CARDS[id].statusText)}</small></button>`).join('')}</div></section>`).join('')}`, 'map-sheet');
    sheet.querySelectorAll('.map-item').forEach(b => b.onclick = () => openCard(b.dataset.id));
  }

  function openAbout() {
    hush();
    openSheet(`
      <h2 id="sheetTitle">For parents and teachers</h2>
      <p><b>The Quiet Ones</b> is an interactive bedtime story for children aged about 7 to 12. It takes around 10 minutes. Zoya, a girl in Karachi, meets the machines people left on the Moon, on Mars and in deep space, and learns what each one discovered.</p>
      <h3>What children learn</h3>
      <ul>
        <li>Why robots went first: to test the ground, scout, and do science where people cannot go yet.</li>
        <li>Real discoveries: the Moon drifting away, moonquakes, water on ancient Mars, flying on Mars, finding planets around other stars.</li>
        <li>That a mission ending is not failure. Quiet machines are still part of how we learn.</li>
      </ul>
      <h3>How to use it</h3>
      <ul>
        <li>Tap the picture or press Next to turn the page. Swipe on phones. Arrow keys work too.</li>
        <li>Turn on <b>Read to me</b> for younger readers. Each character has its own voice.</li>
        <li>Tap a machine in a picture, or its card button, for real facts and a link to NASA’s own pages and photos.</li>
        <li>Try the experiments: fire a laser at the Moon, make a moonquake, fly Ingenuity, find a planet.</li>
      </ul>
      <h3>Accuracy and sources</h3>
      <p>Every fact was checked against NASA mission pages and the NASA Space Science Data Coordinated Archive (<a href="https://nssdc.gsfc.nasa.gov/" target="_blank" rel="noopener">nssdc.gsfc.nasa.gov</a>). The machines are drawn to match the real hardware; the faces are the storybook part. Echo, Buggy and Rumble are our nicknames; Oppy is the real nickname NASA’s team used.</p>
      <h3>How it was made</h3>
      <p>Made for the NASA Space Apps Challenge 2026, challenge “Abandoned but not Forgotten”. All art is drawn in code (SVG); no photos or AI-generated images are used. The story and code were written with help from Claude, an AI assistant. This is a student project and is not endorsed by NASA.</p>`, 'about-sheet');
  }

  function openMenu() {
    hush();
    openSheet(`
      <h2 id="sheetTitle">Menu</h2>
      <div class="menu-list">
        ${CHAPTERS.map(c => `<button type="button" data-ch="${c.n}"><span class="num">${c.n}</span>${esc(c.title)}</button>`).join('')}
        <button type="button" data-go="map"><span class="num">★</span>Map of the Quiet Ones</button>
        <button type="button" data-go="about"><span class="num">i</span>For parents and teachers</button>
        <button type="button" data-go="start"><span class="num">↺</span>Back to the start</button>
      </div>
      <div class="toggles" role="group" aria-label="Settings">
        <button type="button" class="pill" data-t="voice" aria-pressed="${S.voice}">Read to me</button>
        <button type="button" class="pill" data-t="sfx" aria-pressed="${S.sfx}">Sound effects</button>
        <button type="button" class="pill" data-t="big" aria-pressed="${S.big}">Bigger text</button>
        <button type="button" class="pill" data-t="calm" aria-pressed="${S.calm}">Less movement</button>
      </div>`, 'menu-sheet');
    sheet.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => { closeOverlays(); render(chapterStart(+b.dataset.ch)); });
    sheet.querySelector('[data-go=map]').onclick = openMap;
    sheet.querySelector('[data-go=about]').onclick = openAbout;
    sheet.querySelector('[data-go=start]').onclick = () => { closeOverlays(); render(0); };
    sheet.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { toggle(b.dataset.t); b.setAttribute('aria-pressed', S[b.dataset.t]); });
  }

  function toggle(k) {
    S[k] = !S[k]; store.set(k, S[k]);
    if (k === 'sfx') SFX.on = S.sfx;
    if (k === 'big') document.documentElement.classList.toggle('big-text', S.big);
    if (k === 'calm') document.documentElement.classList.toggle('calm', S.calm);
    if (k === 'voice') { $('#voiceBtn').setAttribute('aria-pressed', S.voice); if (S.voice) { const sc = SCENES[S.i]; if (sc.lines) speak(sc.lines[S.line].text, sc.lines[S.line].who); } else hush(); }
  }

  $('#menuBtn').onclick = openMenu;
  $('#voiceBtn').onclick = () => toggle('voice');
  $('#voiceBtn').setAttribute('aria-pressed', S.voice);

  /* ---------- start ---------- */
  window.QO = { render, next, back, openCard, openMap, openAbout, openMenu, closeOverlays, count: SCENES.length, scenes: SCENES };
  const m = /^#chapter-(\d)$/.exec(location.hash);
  if (m && chapterStart(+m[1]) >= 0) render(chapterStart(+m[1]));
  else render(0);
  if (location.hash === '#map') openMap();
})();
