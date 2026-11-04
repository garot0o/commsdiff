history.scrollRestoration = 'manual';
const V = 9; // bump when audio files change, so browsers don't replay old clips
const D = window.D;
const app = document.getElementById('app'), root = document.documentElement;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ACCENT = {cs2:'#E8C15A',valorant:'#FF6B7E',apex:'#47CDB8',overwatch:'#F58F4A',rivals:'#B58CF0',basics:'#7DB3E8'};
const MEANING = {One:'Один',Two:'Двое',Three:'Трое',Last:'Последний',Palace:'на паласе','B apps':'на квартирах B',Mid:'на миде',Long:'на лонге',Window:'в окне',Low:'мало ХП',Lit:'подбит','One AWP':'один со снайперкой','Smoke up':'смоук стоит',Rushing:'идут рашем','Fall back':'откатываемся',Push:'давим',Rotate:'перекидываемся',Hold:'держим позицию','A main':'на A мейне','B long':'на B лонге',Heaven:'на хевене',Garage:'в гараже','Hit 90':'попал на 90','No dash':'рывка нет','Op up':'есть Оператор','No util':'умений нет','Ult ready':'ульта готова','60':'60 градусов','150':'150 градусов','240':'240 градусов','330':'330 градусов',Cracked:'щит сломан','One shot':'на один выстрел',Knocked:'нокнут','High ground':'на высоте','Push now':'давим сейчас',Reset:'отходим и лечимся','Take high ground':'занимаем высоту'};
const COL_RU = {'How many':'Сколько','Where':'Где',"What's happening":'Что происходит','What we do':'Что делаем'};

/* The site animates even when Windows animation effects are off; the header button is the opt-out. */
const store = {get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let fxOn = store.get('fx') !== 'off';
const fxBtn = document.getElementById('fx');
function applyFx() { root.classList.toggle('calm', !fxOn); fxBtn.setAttribute('aria-pressed', fxOn); fxBtn.lastChild.textContent = fxOn ? 'Snow on' : 'Snow off'; }
fxBtn.onclick = () => { fxOn = !fxOn; store.set('fx', fxOn ? 'on' : 'off'); applyFx(); };

/* smooth scrolling and the progress bar */
const lenis = window.Lenis ? new Lenis({duration: 1.15, smoothWheel: true, easing: t => 1 - Math.pow(1 - t, 3.2)}) : null;
const bar = document.getElementById('bar'), toTop = document.getElementById('toTop');
toTop.onclick = () => { lenis && fxOn ? lenis.scrollTo(0, {duration: .75, force: true}) : scrollTo({top: 0, behavior: 'instant'}); };
function frame(t) {
  if (lenis) lenis.raf(t);
  const h = document.documentElement.scrollHeight - innerHeight, y = scrollY;
  bar.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
  toTop.classList.toggle('on', y > innerHeight * .6);
  const ht = document.querySelector('.htitle'); if (ht && y < innerHeight * 1.2 && fxOn && innerWidth > 860) { ht.style.transform = `translateY(${-y * .1}px)`; ht.style.opacity = Math.max(0, 1 - y / (innerHeight * .75)); }
  parallax(); drawGlow();
  requestAnimationFrame(frame);
}
function scrollTo2(el) { lenis ? lenis.scrollTo(el, {offset: -14, duration: 1.5}) : el.scrollIntoView(); }

/* snow: three depths, drifts with the mouse */
const cv = document.getElementById('snow'), cx = cv.getContext('2d'); let flakes = [], wind = 0, windTo = 0;
const mk = any => { const z = Math.random(); return {x: Math.random() * innerWidth, y: any ? Math.random() * innerHeight : -8, z, r: .9 + z * 2.5, s: .25 + z * .95, p: Math.random() * 6.3, a: .3 + z * .55}; };
function sizeSnow() { const r = Math.min(devicePixelRatio || 1, 1.5); cv.width = innerWidth * r; cv.height = innerHeight * r; cx.setTransform(r, 0, 0, r, 0, 0);
  const n = Math.round(Math.min(150, innerWidth / 11)); flakes = [...Array(n)].map(() => mk(true)); }
function snow() {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  if (fxOn && !document.hidden) { wind += (windTo - wind) * .02; windTo *= .992;
    for (const f of flakes) { f.p += .012; f.y += f.s; f.x += Math.sin(f.p) * .42 + wind * (.4 + f.z);
      if (f.y > innerHeight + 8) Object.assign(f, mk(false)); if (f.x > innerWidth + 8) f.x = -8; if (f.x < -8) f.x = innerWidth + 8;
      cx.beginPath(); cx.fillStyle = `rgba(255,255,255,${f.a})`; cx.arc(f.x, f.y, f.r, 0, 6.3); cx.fill(); } }
  requestAnimationFrame(snow);
}
addEventListener('resize', sizeSnow);

/* soft light under the cursor, sticker tilt, hero parallax */
const glow = document.getElementById('glow'); let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my, px = 0, py = 0, lastX = mx;
addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; mx = e.clientX; my = e.clientY; windTo += (mx - lastX) * .0035; windTo = Math.max(-2.2, Math.min(2.2, windTo)); lastX = mx; glow.style.opacity = fxOn ? 1 : 0;
  const st = e.target.closest && e.target.closest('.st'); if (st && !st.disabled && fxOn) { const r = st.getBoundingClientRect(); st.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 16 + 'deg'); st.style.setProperty('--rx', -((e.clientY - r.top) / r.height - .5) * 16 + 'deg'); } }, {passive: true});
document.addEventListener('pointerout', e => { const st = e.target.closest && e.target.closest('.st'); if (st) { st.style.setProperty('--rx', '0deg'); st.style.setProperty('--ry', '0deg'); } });
function drawGlow() { gx += (mx - gx) * .07; gy += (my - gy) * .07; glow.style.transform = `translate3d(${gx}px,${gy}px,0)`; }
function parallax() { px += ((mx / innerWidth - .5) - px) * .05; py += ((my / innerHeight - .5) - py) * .05; if (!fxOn || innerWidth < 860) return;
  document.querySelectorAll('.ht:not(.drag)').forEach(h => { const d = +h.dataset.depth; h.style.translate = `${px * d}px ${py * d}px`; }); }

/* small sparkle when a sticker is pressed */
function sparks(x, y, count = 12, spread = 80) { if (!fxOn) return;
  for (let i = 0; i < count; i++) { const s = document.createElement('i'); s.className = 'spark'; s.style.cssText = `left:${x}px;top:${y}px;background:${['#EFE9E1','#FFB547','#EFE9E1','#EA4656'][i % 4]}`; document.body.append(s);
    const a = Math.random() * 6.3, r = spread * (.5 + Math.random()); s.animate([{transform: 'translate(-50%,-50%) scale(1)', opacity: 1}, {transform: `translate(calc(-50% + ${Math.cos(a) * r}px),calc(-50% + ${Math.sin(a) * r + 24}px)) scale(.15)`, opacity: 0}], {duration: 800 + Math.random() * 520, easing: 'cubic-bezier(.16,1,.3,1)'}).onfinish = () => s.remove(); } }

/* audio: pre-rendered neural clips, browser speech only as a fallback */
let cur = null, curBtn = null, queue = [];
function stop() { if (cur) { cur.onerror = cur.onended = null; cur.pause(); cur = null; } queue = []; try { speechSynthesis.cancel(); } catch (e) {} if (curBtn) { curBtn.classList.remove('playing'); curBtn = null; } }
function speakNext() {
  if (!queue.length) { cur = null; if (curBtn) curBtn.classList.remove('playing'); curBtn = null; return; }
  const t = queue.shift(), a = new Audio('audio/' + D.slug(t) + '.mp3?v=' + V);
  cur = a;
  a.onended = speakNext;
  const fail = () => { if (a !== cur) return; try { const u = new SpeechSynthesisUtterance(D.say[t] || t); u.lang = 'en-US'; u.onend = speakNext; speechSynthesis.speak(u); } catch (e) { speakNext(); } };
  a.onerror = fail;
  a.play().catch(e => { if (e.name !== 'AbortError') fail(); });
}
function play(parts, btn) { stop(); queue = [].concat(parts); curBtn = btn || null; if (btn) btn.classList.add('playing'); speakNext(); }
const sticker = (t, extra = '') => `<button class="st" data-say="${esc(t)}" ${extra} aria-label="Hear: ${esc(t)}"><i><b></b><b></b><b></b></i>${esc(t)}</button>`;
document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b) { play(b.dataset.say, b); sparks(e.clientX, e.clientY); } });

/* reveal on scroll with a stagger, split big titles into letters */
let io;
function reveal() { if (io) io.disconnect(); io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin: '0px 0px -7% 0px', threshold: .08});
  document.querySelectorAll('[data-r]').forEach(el => { const sib = [...el.parentElement.children].filter(c => c.hasAttribute('data-r')); el.style.setProperty('--d', Math.min(sib.indexOf(el), 10) * .075 + 's'); io.observe(el); }); }
const letters = s => [...s].map((c, i) => c === ' ' ? ' ' : `<span class="ltr" style="--d:${(.12 + i * .045).toFixed(3)}s;--m:0">${esc(c)}</span>`).join('');

/* page change: two gradient panels sweep across, the new page loads behind them */
const wipeA = document.querySelector('#wipe b:nth-child(1)'), wipeB = document.querySelector('#wipe b:nth-child(2)'); let wiping = false, ready = false;
const GAMES = Object.keys(D.games);
document.getElementById('nav').innerHTML = GAMES.map(k => `<a href="#/${k}">${D.games[k].name}</a>`).join('') + '<a href="#/basics">Basics</a>';
function draw() {
  const k = location.hash.replace(/^#\/?/, '');
  stop();
  root.dataset.g = D.games[k] ? k : k === 'basics' ? 'basics' : 'home';
  if (D.games[k]) game(k); else if (k === 'basics') basics(); else home();
  document.querySelectorAll('#nav a').forEach(a => a.getAttribute('href') === '#/' + k ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  if (lenis) lenis.scrollTo(0, {immediate: true, force: true}); scrollTo({top: 0, behavior: 'instant'});
  reveal();
}
const wipeBox = document.getElementById('wipe');
const settled = a => Promise.race([a.finished.catch(() => {}), new Promise(r => setTimeout(r, 1400))]);
async function route() {
  if (!ready || !fxOn || wiping) { ready = true; draw(); return; }
  wiping = true;
  wipeBox.style.display = 'block';
  try {
    const opt = {duration: 620, easing: 'cubic-bezier(.65,0,.15,1)', fill: 'forwards'};
    wipeB.animate([{transform: 'translateY(102%)'}, {transform: 'translateY(0)'}], opt);
    await settled(wipeA.animate([{transform: 'translateY(102%)'}, {transform: 'translateY(0)'}], {...opt, delay: 90}));
    draw();
    const out = {duration: 760, easing: 'cubic-bezier(.65,0,.15,1)', fill: 'forwards'};
    wipeA.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-102%)'}], out);
    await settled(wipeB.animate([{transform: 'translateY(0)'}, {transform: 'translateY(-102%)'}], {...out, delay: 90}));
  } finally {
    wipeA.getAnimations().concat(wipeB.getAnimations()).forEach(a => a.cancel());
    wipeBox.style.display = 'none';
    wiping = false;
  }
}
addEventListener('hashchange', route);

/* home */
function home() {
  document.title = 'Comms Diff: English callouts for competitive games';
  const line = 'There is one enemy on the balcony and he has very little health.';
  const ticker = D.hero.concat(D.games.cs2.groups[1].items.slice(0, 3).map(i => [i[0], '', i[1]]), D.games.apex.groups[1].items.slice(0, 2).map(i => [i[0], '', i[1]]));
  const tick = ticker.map(h => `<span><b>${esc(h[0])}</b><em>${esc(h[2])}</em></span>`).join('');
  app.innerHTML = `
  <section class="board" id="board"><div class="htitle"><h1 aria-label="Speak ranked">${letters('Speak')}<br>${letters('ranked')}</h1><p class="sub">Говори как в ранкеде: короткие фразы на английском</p></div>
    <p class="hint"><span class="mouse">Drag the stickers around. </span>Tap one to hear it.<span class="ru"><span class="mouse">Двигай наклейки мышкой. </span>Нажми, чтобы услышать и увидеть перевод.</span></p></section>
  <div class="mq" aria-hidden="true"><div>${tick}${tick}</div></div>
  <section class="band" id="slowS"><p class="slowcap" data-r>You have about one second before the moment is gone. School English needs more than that.<span class="ru">У тебя есть примерно секунда, потом момент упущен. Школьному английскому нужно больше.</span></p>
    <p class="slow" id="slow">${line.split(' ').map(w => `<span>${w}</span>`).join(' ')}</p>
    <p class="slowru">«На балконе один враг, и у него очень мало здоровья». Так правильно, но слишком долго.</p>
    <div class="fast" id="fast">${sticker('Last palace, low')}<p>Same information. Your team hears it in time.<span class="ru">«Последний на паласе, мало ХП». Смысл тот же, а команда успевает услышать.</span></p></div></section>
  <section class="band" style="padding-top:0"><div class="panel" id="bld" data-r></div></section>
  <section class="list"><h2 data-r>Pick your game. Each one speaks differently.<span class="ru">Выбери игру. В каждой говорят по-своему.</span></h2>
    ${GAMES.map(k => `<a class="gm" data-r style="--h:${ACCENT[k]}" href="#/${k}"><b>${D.games[k].name}</b><div>${D.games[k].tagline}<span>${D.tagRu[k]}</span></div></a>`).join('')}
    <a class="gm" data-r style="--h:${ACCENT.basics}" href="#/basics"><b>Basics</b><div>The call formula, chat words and what to say when you are lost.<span>Основы: формула колла, слова из чата и что сказать, если растерялся.</span></div></a></section>`;
  heroStickers(); builder('cs2', document.getElementById('bld'));
  const words = [...document.querySelectorAll('#slow span')];
  new IntersectionObserver((en, o) => { if (!en[0].isIntersecting) return; o.disconnect();
    words.forEach((w, i) => setTimeout(() => w.classList.add('gone'), 550 + i * 150));
    setTimeout(() => document.getElementById('fast')?.classList.add('on'), 550 + words.length * 150 + 200);
  }, {threshold: .5}).observe(document.getElementById('slow'));
}
const SPOTS = [[.40,.02,-5,26],[.70,.05,4,-34],[.47,.20,3,18],[.80,.24,-6,-22],[.27,.28,-3,40],[.64,.34,7,30],[.03,.05,6,-44],[.03,.22,-7,24],[.86,.44,-4,-16]];
function heroStickers() {
  const b = document.getElementById('board'); let z = 10;
  D.hero.forEach(([t, g, ru], i) => {
    const [x, y, r, depth] = SPOTS[i], d = document.createElement('div');
    d.className = 'ht'; d.tabIndex = 0; d.dataset.depth = depth; d.setAttribute('role', 'button'); d.setAttribute('aria-label', `${t}, ${g}. Hear it and see the translation`);
    d.style.cssText = `left:${x*100}%;top:${y*100}%;--r:${r}deg;--bob:${6 + (i % 4) * 1.3}s`;
    d.innerHTML = `<span class="flo" style="animation-delay:-${i * .9}s"><span class="in"><span class="fc">${esc(t)}<small>${g}</small></span><span class="fc bk">${esc(ru)}</span></span></span>`;
    b.append(d);
    setTimeout(() => d.classList.add('on'), 250 + i * 130);
    let sx, sy, ox = 0, oy = 0, moved = false, down = false;
    const tap = () => { d.classList.toggle('flip'); d.classList.contains('flip') ? play(t) : stop(); };
    d.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sy = e.clientY; moved = false; if (e.pointerType === 'mouse') { d.setPointerCapture(e.pointerId); d.classList.add('drag'); d.style.zIndex = ++z; d.style.transition = 'transform .12s linear,opacity .9s'; } });
    d.addEventListener('pointermove', e => { if (!d.classList.contains('drag')) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.hypot(dx, dy) > 4) moved = true; d.style.transform = `translate(${ox+dx}px,${oy+dy}px) rotate(${r + dx/50}deg) scale(1.06)`; });
    const up = e => { if (!down) return; down = false; const dx = e.clientX - sx, dy = e.clientY - sy;
      if (d.classList.contains('drag')) { d.classList.remove('drag'); if (moved) { ox += dx; oy += dy; } d.style.transition = 'transform 1s var(--glide)'; d.style.transform = `translate(${ox}px,${oy}px) rotate(${r}deg)`; }
      if (!moved && Math.hypot(dx, dy) < 10) { tap(); sparks(e.clientX, e.clientY, 14, 100); } };
    d.addEventListener('pointerup', up); d.addEventListener('pointercancel', () => { down = false; d.classList.remove('drag'); });
    d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
  });
}

/* call builder */
function builder(start, host) {
  host.innerHTML = `<div class="bhead"><div><h2>Build a call</h2><p>Four short pieces in the same order, every time. Pick one from each column and listen.<span class="ru">Собери колл: четыре коротких части всегда в одном порядке. Выбери по одной из каждой колонки и послушай.</span></p></div><div class="seg" id="seg" role="group" aria-label="Game">${Object.keys(D.builder).map(k => `<button data-g="${k}" aria-pressed="false">${D.builder[k].name}</button>`).join('')}</div></div><div class="cols" id="cols"></div><div class="out" aria-live="polite"><div><b id="callT"></b><p id="callR"></p></div><button class="st" id="callP"><i><b></b><b></b><b></b></i>Hear this call</button></div>`;
  const seg = host.querySelector('#seg'), cols = host.querySelector('#cols'); let g = start, sel = [];
  const update = () => {
    const c = D.builder[g].cols.map((col, i) => col[1][sel[i]]);
    const t = host.querySelector('#callT'); t.textContent = c.map((x, n) => n ? x.replace(/^[A-Z][a-z]/, m => m.toLowerCase()) : x).join(', '); t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop');
    host.querySelector('#callR').textContent = c.map(x => MEANING[x] || x).join(', ');
    host.querySelector('#callP').onclick = e => { play(c, e.currentTarget); sparks(e.clientX, e.clientY); };
    cols.querySelectorAll('.opt').forEach(o => o.setAttribute('aria-pressed', sel[+o.dataset.c] === +o.dataset.i));
  };
  const load = k => { g = k; sel = [0, 0, 0, 0];
    seg.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.g === k));
    cols.innerHTML = D.builder[k].cols.map((c, ci) => `<div><h3>${c[0]}</h3><small>${COL_RU[c[0]]}</small><div class="opts">${c[1].map((o, oi) => `<button class="st opt" data-c="${ci}" data-i="${oi}"><span>${esc(o)}<small>${esc(MEANING[o] || '')}</small></span></button>`).join('')}</div></div>`).join('');
    update(); };
  seg.addEventListener('click', e => { const b = e.target.closest('button'); if (b) load(b.dataset.g); });
  cols.addEventListener('click', e => { const b = e.target.closest('.opt'); if (!b) return; sel[+b.dataset.c] = +b.dataset.i; update(); });
  load(start);
}

/* game pages */
const arrow = '<svg viewBox="0 0 44 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M2 11c10-4 22-4 38-1M31 3l9 7-9 8"/></svg>';
const ruTitle = t => D.heads[t] || '';
const rows = items => `<div class="rows">${items.map(i => `<div class="row" data-r>${sticker(i[0])}<div><span class="tr">${esc(i[1])}</span>${D.how[i[0]] ? `<span class="how">${esc(D.how[i[0]])}</span>` : ''}</div></div>`).join('')}</div>`;
function game(k) {
  const g = D.games[k]; document.title = `${g.name} callouts | Comms Diff`;
  const secs = [], add = (id, title, html) => secs.push({id, title, html});
  add('phrases', g.groups[0].t, rows(g.groups[0].items));
  g.groups.slice(1).forEach((x, i) => add('p' + i, x.t, rows(x.items)));
  if (g.compass) add('compass', 'Compass drill', `<div class="panel cmp" id="cmp" data-r></div>`);
  if (g.maps) add('maps', 'Maps', `<div class="maps">${g.maps.map((m, i) => `<button class="mp" data-r data-map="${i}" aria-label="Open ${m} map"><img loading="lazy" src="maps/${m}.${g.mapExt}" alt="${m} map with English position names"><b>${m === 'dust2' ? 'Dust 2' : m}</b></button>`).join('')}</div><p class="src">Map images: <a href="${g.mapUrl}" rel="noopener">${g.mapSource}</a>. Learn five places first: both sites, mid and two main entrances.<br>Для начала выучи пять мест: оба плента, мид и два главных входа.</p>`);
  if (g.radar) add('radar', 'Radar with English names?', `<div class="panel note" data-r><p>Don't swap the game files.</p><p>In CS:GO you could replace the radar images. CS2 has no official support for that, and VAC checks game files on Valve servers. I found no safe guide, so it isn't worth risking your account.<span class="ru">Не подменяй файлы игры. В CS:GO картинки радара можно было заменить, а в CS2 официальной поддержки нет, и VAC проверяет файлы. Безопасной инструкции я не нашёл, так что рисковать аккаунтом не стоит.</span></p><p><strong>What works without risk</strong><span class="ru">Что работает без риска</span></p><ul><li>Switch the game to English: Steam, CS2, Properties, General, Language.<span>Поставь английский: Steam, CS2, Свойства, Общие, Язык.</span></li><li>Keep a map from this page on your phone or second screen.<span>Держи карту с этой страницы на телефоне или втором экране.</span></li><li>Walk the map offline with bots and say the places out loud.<span>Походи по карте с ботами и называй места вслух.</span></li><li>Search the Steam Workshop for "callouts" practice maps.<span>Поищи в Мастерской Steam тренировочные карты по слову callouts.</span></li><li>Turn off radar rotation in the settings.<span>Отключи вращение радара в настройках.</span></li></ul></div>`);
  if (g.fixes) add('fix', 'Say it right', `<div class="rows">${g.fixes.map(f => `<div class="row fix" data-r><s>${esc(f[0])}<small>так не говорят</small></s>${arrow}${sticker(f[1])}<div><span class="tr">${esc(f[2])}</span>${D.how[f[1]] ? `<span class="how">${esc(D.how[f[1]])}</span>` : ''}</div></div>`).join('')}</div>`);
  if (g.sayit) add('say', 'How it sounds', `<div class="says">${g.sayit.map(w => `<div data-r>${sticker(w[0])}<span>${esc(w[1])}</span></div>`).join('')}</div>`);
  add('quiz', 'Quick quiz', `<div class="panel qz" id="qz" data-r></div>`);
  const jumps = [['phrases', 'Phrases', 'Фразы']].concat(g.compass ? [['compass', 'Compass drill', 'Компас']] : [], g.maps ? [['maps', 'Maps', 'Карты']] : [], g.fixes ? [['fix', 'Say it right', 'Ошибки']] : [], [['say', 'How it sounds', 'Произношение'], ['quiz', 'Quiz', 'Квиз']]);
  app.innerHTML = `<section class="ghead"><div class="cluster">${g.groups.concat(g.groups).slice(0, 3).map((x, i) => sticker(x.items[i === 2 ? 1 : 0][0], `style="--tilt:${[-6, 5, -3][i]}deg;--bob:${6 + i * 1.4}s;animation-delay:-${i}s"`)).join('')}</div><h1 class="${g.name.length > 9 ? 'long' : g.name.length > 4 ? 'mid' : ''}" aria-label="${g.name}">${letters(g.name)}</h1><p class="lead" data-r>${g.tagline}</p><p class="leadru" data-r>${D.tagRu[k]}</p><div class="jump" data-r>${jumps.map(j => `<button data-to="${j[0]}">${j[1]} <span style="opacity:.7">${j[2]}</span></button>`).join('')}</div></section>` +
    secs.map(s => `<section class="sec" id="s-${s.id}"><div class="sech" data-r><h2>${s.title}</h2><span>${ruTitle(s.title)}</span></div><div>${s.html}</div></section>`).join('');
  app.querySelector('.jump').addEventListener('click', e => { const b = e.target.closest('button'); if (b) scrollTo2(document.getElementById('s-' + b.dataset.to)); });
  app.querySelectorAll('.mp').forEach(b => b.onclick = () => openMap(g, +b.dataset.map));
  quiz(k, g, document.getElementById('qz'));
  if (g.compass) compass(document.getElementById('cmp'));
}

/* map viewer */
const box = document.getElementById('box'), boxImg = document.getElementById('boxImg'); let mg, mi;
let mapY = 0;
function openMap(g, i) { mg = g; mapY = scrollY; showMap(i); box.showModal(); if (lenis) lenis.stop(); }
box.addEventListener('close', () => { if (lenis) { lenis.start(); lenis.scrollTo(mapY, {immediate: true, force: true}); } scrollTo({top: mapY, behavior: 'instant'}); });
function showMap(i) { mi = (i + mg.maps.length) % mg.maps.length; boxImg.src = `maps/${mg.maps[mi]}.${mg.mapExt}`; boxImg.alt = `${mg.maps[mi]} map with English position names`; boxImg.style.animation = 'none'; void boxImg.offsetWidth; boxImg.style.animation = ''; }
document.getElementById('boxClose').onclick = () => box.close();
document.getElementById('boxPrev').onclick = () => showMap(mi - 1);
document.getElementById('boxNext').onclick = () => showMap(mi + 1);
box.addEventListener('click', e => { if (e.target === box) box.close(); });
box.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') showMap(mi - 1); if (e.key === 'ArrowRight') showMap(mi + 1); });

/* quiz */
function quiz(k, g, host) {
  let i = 0, score = 0;
  const q = () => {
    if (i === g.quiz.length) { const all = score === g.quiz.length; host.innerHTML = `<p class="score">${score} of ${g.quiz.length}</p><p class="why">${all ? 'Clean round. Now say one of these out loud in your next match.' : 'Read the phrases above again and try one more round.'}</p><p class="whyr">${all ? 'Чистый раунд. Теперь скажи одну из этих фраз в следующей катке.' : 'Перечитай фразы выше и попробуй ещё раз.'}</p><button class="plain" id="again">Play again / Ещё раз</button>`; host.querySelector('#again').onclick = () => { i = 0; score = 0; q(); }; if (all) { const r = host.getBoundingClientRect(); sparks(r.left + r.width / 3, r.top + 80, 44, 240); } return; }
    const c = g.quiz[i], r = D.quizRu[k][i];
    host.innerHTML = `<p class="qn">Question ${i + 1} of ${g.quiz.length} / Вопрос ${i + 1} из ${g.quiz.length}</p><p class="qq">${esc(c.q)}</p><p class="qr">${esc(r.q)}</p><div class="qo">${c.o.map((o, n) => `<div class="qw"><button class="st" data-n="${n}" style="--tilt:${[-.8,.6,-.4][n % 3]}deg">${esc(o)}</button><span class="qt">${esc(r.o[n])}</span></div>`).join('')}</div><div id="after"></div>`;
    host.querySelector('.qo').addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.disabled) return;
      const n = +b.dataset.n, ok = n === c.a; if (ok) { score++; sparks(e.clientX, e.clientY, 20, 130); }
      host.querySelectorAll('.qo button').forEach((x, m) => { x.disabled = true; x.classList.add(m === c.a ? 'right' : m === n ? 'wrong' : 'dim'); });
      host.querySelectorAll('.qt').forEach((t, m) => setTimeout(() => t.classList.add('on'), m * 110));
      host.querySelector('#after').innerHTML = `<p class="why">${ok ? 'Right. ' : 'Not this one. '}${esc(c.w)}</p><p class="whyr">${ok ? 'Верно. ' : 'Не то. '}${esc(r.w)}</p><button class="plain" id="next">${i + 1 === g.quiz.length ? 'See my score / Мой счёт' : 'Next question / Дальше'}</button>`;
      host.querySelector('#next').onclick = () => { i++; q(); };
    });
  };
  q();
}

/* Apex compass drill */
function compass(host) {
  const ticks = [...Array(36)].map((_, i) => { const a = i * 10 * Math.PI / 180, big = i % 9 === 0, r1 = big ? 150 : 166, r2 = 182; return `<line x1="${200 + r1 * Math.sin(a)}" y1="${200 - r1 * Math.cos(a)}" x2="${200 + r2 * Math.sin(a)}" y2="${200 - r2 * Math.cos(a)}" stroke="#EFE9E1" stroke-opacity="${big ? 1 : .55}" stroke-width="${big ? 6 : 3}" stroke-linecap="round"/>`; }).join('');
  host.innerHTML = `<svg viewBox="0 0 400 400" id="dial" role="img" aria-label="Compass. Click the ring where the bearing should be.">
        <circle cx="200" cy="200" r="194" fill="#17161A" stroke="#47CDB8" stroke-width="5"/>${ticks}
    <text class="tk" x="200" y="84">N 0</text><text class="tk" x="316" y="200">E 90</text><text class="tk" x="200" y="316">S 180</text><text class="tk" x="84" y="200">W 270</text>
    <g class="needle" id="ans" style="opacity:0"><line x1="200" y1="200" x2="200" y2="30" stroke="#7DF5A8" stroke-width="5" stroke-dasharray="3 11" stroke-linecap="round"/></g>
    <g class="needle" id="ndl" style="opacity:0"><line x1="200" y1="200" x2="200" y2="30" stroke="#FFB547" stroke-width="7" stroke-linecap="round"/><circle cx="200" cy="30" r="12" fill="#FFB547"/></g>
    <circle cx="200" cy="200" r="10" fill="#EFE9E1"/></svg>
    <div><p class="target" id="tgt"></p><p class="res" id="res" aria-live="polite"></p><button class="plain" id="nx">New enemy / Новый враг</button></div>`;
  const dial = host.querySelector('#dial'), ndl = host.querySelector('#ndl'), ans = host.querySelector('#ans'), tgt = host.querySelector('#tgt'), res = host.querySelector('#res'); let bearing, done;
  const fresh = () => { bearing = Math.floor(Math.random() * 24) * 15; done = false; tgt.textContent = `Enemy, ${bearing}`; res.innerHTML = 'Click the ring where this enemy is. North is 0, and numbers grow clockwise.<span>Нажми на кольцо там, где стоит враг. Север равен 0, числа растут по часовой стрелке.</span>'; ndl.style.opacity = 0; ans.style.opacity = 0; };
  dial.addEventListener('click', e => { if (done) return; const r = dial.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    const a = (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360, off = Math.round(Math.min(Math.abs(a - bearing), 360 - Math.abs(a - bearing)));
    done = true; ndl.style.opacity = 1; ndl.style.transform = `rotate(${a}deg)`; ans.style.opacity = 1; ans.style.transform = `rotate(${bearing}deg)`;
    if (off <= 15) sparks(e.clientX, e.clientY, 18, 110);
    const deg = off === 1 ? 'degree' : 'degrees';
    res.innerHTML = off === 0 ? 'Perfect call, right on target.<span>Идеально, точно в цель.</span>' : off <= 15 ? `Good call, only ${off} ${deg} off.<span>Отлично, ошибка всего ${off}°.</span>` : `${off} ${deg} off. The dotted line shows ${bearing}.<span>Ошибка ${off}°. Пунктир показывает ${bearing}.</span>`; });
  host.querySelector('#nx').onclick = fresh; fresh();
}

/* basics */
function basics() {
  document.title = 'Basics | Comms Diff';
  const st = [['How many','Сколько','Say the number first, so your team knows the danger.','Сначала число, чтобы команда понимала опасность.','"Two" (двое)'],['Where','Где','Use the name of the place, or a bearing in Apex.','Название места, а в Apex градусы.','"B apps" (квартиры B)'],["What's happening",'Что происходит','Only what changes the decision.','Только то, что влияет на решение.','"One AWP" (один со снайперкой)'],['What we do','Что делаем','Finish with the plan, if there is one.','В конце план, если он есть.','"Fall back" (откатываемся)']];
  app.innerHTML = `<section class="ghead"><h1 class="mid" aria-label="Basics">${letters('Basics')}</h1><p class="lead" data-r>A good call takes one or two seconds. Articles and "he is going to" only slow you down.</p><p class="leadru" data-r>Основы. Хороший колл длится одну-две секунды. Артикли и длинные конструкции только мешают.</p></section>
   <section class="sec"><div class="sech" data-r><h2>The formula</h2><span>Формула</span></div><div><ol class="steps">${st.map(s => `<li data-r><b>${s[0]}</b><small>${s[1]}</small><span>${s[2]}</span><span class="ru">${s[3]}</span><em>${s[4]}</em></li>`).join('')}</ol><p class="rule" data-r>Every game has its own slang, so don't carry it across. Saying something with a mistake still beats saying nothing.</p><p class="ruler" data-r>У каждой игры свой сленг, не переноси его между играми. Сказать с ошибкой всё равно лучше, чем промолчать.</p></div></section>
   <section class="sec"><div class="sech" data-r><h2>Chat words</h2><span>Слова из чата</span></div>${rows(D.chat)}</section>
   <section class="sec"><div class="sech" data-r><h2>When you are lost</h2><span>Если ты растерялся</span></div>${rows(D.survival)}</section>`;
}
document.querySelector('.skip').onclick = e => { e.preventDefault(); app.focus(); };
sizeSnow(); snow(); applyFx(); route(); requestAnimationFrame(frame);
