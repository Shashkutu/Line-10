import './line10/line10.js';

const frame = document.getElementById('frame');
const picks = [...document.querySelectorAll('.line-pick')];
const note = document.getElementById('line-note');

function ride(btn, { autoplay = false, start = NaN } = {}) {
  const d = btn.dataset;
  const color = btn.style.getPropertyValue('--c').trim();
  const ink = btn.style.getPropertyValue('--ink').trim();
  picks.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  document.documentElement.style.setProperty('--page-line', color);

  const pipWin = window.documentPictureInPicture?.window;
  const old = frame.querySelector('line10-player') || pipWin?.document.querySelector('line10-player');
  old?.querySelector('video, mux-video')?.pause?.();
  pipWin?.close();

  const p = document.createElement('line10-player');
  const set = (k, v) => v && p.setAttribute(k, v);
  set('src', d.src);
  set('playback-id', d.playbackId);
  set('poster', d.poster);
  set('title', d.title);
  set('captions', d.captions);
  set('chapters', d.chapters);
  set('storyboard', d.storyboard);
  set('number', d.number);
  set('line', color);
  set('ratio', d.ratio);
  // at the terminus, the player offers a change to the next line
  const next = picks[(picks.indexOf(btn) + 1) % picks.length];
  set('next-title', next.querySelector('.pick-text b').textContent);
  set('next-number', next.dataset.number);
  set('next-line', next.style.getPropertyValue('--c').trim());
  if (autoplay) p.setAttribute('autoplay', '');
  if (Number.isFinite(start)) p.setAttribute('start', String(start));
  p.style.setProperty('--media-accent-text-color', ink);
  frame.classList.toggle('is-vertical', Boolean(d.ratio));
  note.textContent = d.note || '';
  note.hidden = !d.note;
  p.addEventListener('line10:next', changeHere);
  frame.replaceChildren(p);
  setLineInUrl(picks.indexOf(btn));
}
// the address carries the line, so a "copy link to this stop" opens the same line
function setLineInUrl(k) {
  try {
    const u = new URL(location.href);
    if (k > 0) u.searchParams.set('line', String(k)); else u.searchParams.delete('line');
    history.replaceState(history.state, '', u);
  } catch { /* file:// or sandboxed */ }
}

const board = (b, opts) => ride(b, opts);
picks.forEach((b) => b.addEventListener('click', () => board(b)));
// "Change here for…" on the terminus card (heard on the player itself, so it also works from a PiP window)
function changeHere() {
  const now = picks.findIndex((b) => b.getAttribute('aria-pressed') === 'true');
  board(picks[(now + 1) % picks.length], { autoplay: true });
  paint(current().style.getPropertyValue('--c').trim(), { fromPick: true });
  frame.querySelector('line10-player .l10')?.focus({ preventScroll: true });
}
frame.querySelector('line10-player')?.addEventListener('line10:next', changeHere);

// open the line a link points to (?line=2); a plain link opens the first line
const params = new URLSearchParams(location.search);
const linked = params.has('line') ? Number(params.get('line')) : 0;
if (Number.isInteger(linked) && linked > 0 && picks[linked]) ride(picks[linked], { start: parseFloat(params.get('t') ?? params.get('sec')) });
else if (params.has('line')) setLineInUrl(0);
// a link's time (?t=25, or ?sec=25) is used once, by the first player; later line changes start from the top
if (params.has('t') || params.has('sec')) {
  try { const u = new URL(location.href); u.searchParams.delete('t'); u.searchParams.delete('sec'); history.replaceState(history.state, '', u); } catch { /* sandboxed */ }
}
try { Object.keys(localStorage).filter((k) => k.startsWith('line10:')).forEach((k) => localStorage.removeItem(k)); } catch { /* private mode */ }   // nothing is kept between visits

// ---------- "Put it on your site": paint the line, copy the code ----------
const swatches = [...document.querySelectorAll('.swatch[data-c]')];
const anyColour = document.getElementById('any-colour');
const codeEl = document.getElementById('embed-code');
const copyBtn = document.getElementById('copy-code');
const BASE = 'https://me.aleex.workers.dev/assets/line10';
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
// dark or light lettering on the line colour
const inkFor = (hex) => {
  const [r, g, b] = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  // pick whichever text colour reads better on it: dark (#14110a, luminance ~0.0057) or white (1)
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (L + 0.05) / (0.0057 + 0.05) >= 1.05 / (L + 0.05) ? '#14110a' : '#ffffff';
};
const current = () => picks.find((b) => b.getAttribute('aria-pressed') === 'true') || picks[0];
let stationsAttr = '';                                 // set by the stations editor below
let colour = current().style.getPropertyValue('--c').trim();

function embedText() {
  const d = current().dataset;
  return [
    `<link rel="stylesheet" href="${BASE}/line10.css">`,
    `<script type="module" src="${BASE}/line10-player.js"></script>`,
    '',
    '<line10-player',
    `  playback-id="${d.playbackId}"`,
    `  title="${d.title}"`,
    stationsAttr ? `  stations="${stationsAttr}"` : '  chapters="chapters.vtt"',
    '  captions="captions.en.vtt"',
    `  number="${d.number}"`,
    `  line="${colour}"></line10-player>`,
  ].join('\n');
}
function drawCode() {
  codeEl.innerHTML = esc(embedText())
    .replace(/ ([a-z-]+)=/g, ' <span class="a">$1</span>=')
    .replace(/&lt;(\/?)([a-z0-9-]+)/g, '&lt;$1<span class="t">$2</span>')
    .replace(`"${colour}"`, `"<span class="hl">${colour}</span>"`);
}
function paint(c, { fromPick = false } = {}) {
  colour = c.toLowerCase();
  const ink = inkFor(colour);
  document.documentElement.style.setProperty('--page-line', colour);
  const p = frame.querySelector('line10-player') || window.documentPictureInPicture?.window?.document.querySelector('line10-player');
  if (p && !fromPick) { p.setAttribute('line', colour); p.style.setProperty('--media-accent-text-color', ink); }
  swatches.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.c === colour)));
  anyColour.value = colour;
  drawCode();
}
swatches.forEach((s) => s.addEventListener('click', () => paint(s.dataset.c)));
anyColour.addEventListener('input', () => paint(anyColour.value));
copyBtn.addEventListener('click', async () => {
  const text = embedText();
  try { await navigator.clipboard.writeText(text); }
  catch {                                   // older browsers / no clipboard permission
    const t = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(t); t.select(); document.execCommand('copy'); t.remove();
  }
  copyBtn.textContent = 'Copied';
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1600);
});
// picking another line shows that line's own colour and code
picks.forEach((b) => b.addEventListener('click', () => paint(b.style.getPropertyValue('--c').trim(), { fromPick: true })));
paint(colour, { fromPick: true });

// ---------- "Try this": tick off the clever parts as visitors find them ----------
const tries = document.querySelector('.tries');
const triesCount = document.getElementById('tries-count');
const found = new Set();                              // fresh on every visit: nothing is saved
const drawTries = () => {
  const items = [...tries.querySelectorAll('[data-try]')];
  items.forEach((li) => {
    const on = found.has(li.dataset.try);
    li.classList.toggle('done', on);
    li.querySelector('.vh').textContent = on ? ' (done)' : ' (not yet)';
  });
  const n = items.filter((li) => found.has(li.dataset.try)).length;
  triesCount.textContent = n === items.length ? 'You rode the whole line' : `${n} of ${items.length} found`;
  tries.classList.toggle('all', n === items.length);
};
const tick = (k) => {
  if (found.has(k)) return;
  found.add(k);
  drawTries();
};
// phones have no N key: there the hint points at the Next stop button in Settings
if (/Android|iPhone|iPad|iPod|Mobile|SamsungBrowser/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1) || matchMedia('(hover: none) and (pointer: coarse)').matches) {
  tries.querySelector('[data-try="next"] > span:not(.vh)').textContent = 'Jump to the next stop';
}
drawTries();
let lastInput = -Infinity;                           // a speed or board change only counts when the visitor made it
frame.addEventListener('pointerdown', (e) => {
  lastInput = performance.now();
  if (e.target.closest?.('.l10-slider')) tick('drag');
}, true);
frame.addEventListener('keydown', (e) => {
  lastInput = performance.now();
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.target.closest?.('.l10-slider') && /^Arrow/.test(e.key)) tick('drag');
  if ((e.key === 'n' || e.key === 'N' || e.key === ']') && !e.target.closest?.('input, textarea')) tick('next');
}, true);
frame.addEventListener('click', (e) => {
  if (e.target.closest?.('.l10-nextstop, .l10-m-next')) tick('next');
}, true);
frame.addEventListener('ratechange', () => { if (performance.now() - lastInput < 2000) tick('speed'); }, true);
// the board's look changed by the visitor (a real change of value: other settings re-apply these unchanged)
new MutationObserver((list) => {
  if (performance.now() - lastInput > 2000) return;
  if (list.some((m) => m.oldValue !== m.target.getAttribute(m.attributeName))) tick('board');
}).observe(frame, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-board', 'data-board-pos', 'data-board-style', 'data-board-flip'] });
frame.addEventListener('line10:share', () => tick('share'));
frame.addEventListener('line10:captions', (e) => { if (e.detail?.on) tick('captions'); });
frame.addEventListener('line10:fullscreen', () => tick('fullscreen'));
new MutationObserver((list) => {
  if (list.some((m) => m.target.hasAttribute?.('data-terminus'))) tick('end');
}).observe(frame, { subtree: true, attributes: true, attributeFilter: ['data-terminus'] });

// ---------- "Make your own stations": edit the line live ----------
const seList = document.getElementById('se-list');
const seAdd = document.getElementById('se-add');
const seReset = document.getElementById('se-reset');
const seMsg = document.getElementById('se-msg');
const seLine = document.getElementById('se-line');
const NAME_MAX = 13, MIN_STOPS = 2, MAX_STOPS = 12;
let rows = [];                                       // [{ d: '013', name: 'Eilean Donan' }]: the time as typed digits
let original = [];
let duration = 0;
let edited = false;
const fmt = (sec) => { sec = Math.max(0, Math.round(sec)); return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`; };
// The time box is a little timer you type into: digits fill in from the left and the colon is added for
// you (1 → 1:00, 11 → 1:10, 111 → 1:11, 1111 → 11:11); what isn't typed yet shows in grey.
const digitsOf = (clockText) => String(clockText).replace(/\D/g, '').slice(0, 4);
const fromDigits = (d) => {
  if (!d) return { typed: '', rest: '0:00', sec: NaN };
  if (d.length === 1) return { typed: d, rest: ':00', sec: Number(d) * 60 };
  if (d.length === 2) return { typed: `${d[0]}:${d[1]}`, rest: '0', sec: Number(d[0]) * 60 + Number(d[1]) * 10 };
  if (d.length === 3) return { typed: `${d[0]}:${d.slice(1)}`, rest: '', sec: Number(d[0]) * 60 + Number(d.slice(1)) };
  return { typed: `${d.slice(0, 2)}:${d.slice(2)}`, rest: '', sec: Number(d.slice(0, 2)) * 60 + Number(d.slice(2)) };
};
// the tens of seconds can't go past 5 (no 1:70)
const fine = (d) => !((d.length === 2 || d.length === 3) && Number(d[1]) > 5) && !(d.length === 4 && Number(d[2]) > 5);
const secs = (d) => fromDigits(d).sec;
const player = () => frame.querySelector('line10-player');
const escAttr = (x) => String(x).replace(/[&"<>;]/g, (c) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;', ';': ',' })[c]);

function drawRows() {
  seList.innerHTML = rows.map((r, k) => `
    <li class="se-row">
      <span class="se-field se-clock"><span class="se-ghost" aria-hidden="true"><span class="se-typed">${fromDigits(r.d).typed}</span><span class="se-rest">${fromDigits(r.d).rest}</span></span><input class="se-time" value="${fromDigits(r.d).typed}" inputmode="numeric" pattern="[0-9:]*" autocomplete="off" spellcheck="false"
        aria-label="Stop ${k + 1} time, minutes and seconds" placeholder=""${k === 0 ? ' readonly title="The first stop is where the ride starts"' : ''}></span>
      <span class="se-field"><input class="se-name" value="${escAttr(r.name)}" maxlength="${NAME_MAX}" autocomplete="off"
        aria-label="Stop ${k + 1} name"><span class="se-count${r.name.length >= NAME_MAX ? ' full' : ''}" aria-hidden="true">${r.name.length}/${NAME_MAX}</span></span>
      <button type="button" class="se-del" aria-label="Remove ${escAttr(r.name || `stop ${k + 1}`)}"${rows.length <= MIN_STOPS ? ' disabled' : ''}><i aria-hidden="true"></i></button>
    </li>`).join('');
  seAdd.disabled = rows.length >= MAX_STOPS;
  seReset.disabled = !edited;
}

// check the rows; apply the good ones to the player
function apply() {
  let bad = '';
  let last = -1;
  const good = [];
  seList.querySelectorAll('.se-row').forEach((li, k) => {
    const r = rows[k];
    const t = k === 0 ? 0 : secs(r.d);
    const tIn = li.querySelector('.se-time');
    const nIn = li.querySelector('.se-name');
    let tBad = false;
    if (!Number.isFinite(t)) { tBad = true; bad ||= `Stop ${k + 1} needs a time.`; }
    else if (t <= last) { tBad = true; bad ||= `Stop ${k + 1} has to come after ${fmt(last)}.`; }
    else if (duration && t >= duration) { tBad = true; bad ||= `Stop ${k + 1} is past the end of the video (${fmt(duration)}).`; }
    const nBad = !r.name.trim();
    if (nBad) bad ||= `Stop ${k + 1} needs a name.`;
    tIn.setAttribute('aria-invalid', String(tBad));
    nIn.setAttribute('aria-invalid', String(nBad));
    if (!tBad) last = t;
    if (!tBad && !nBad) good.push(`${fmt(t)} ${r.name.trim().replace(/;/g, ',')}`);
  });
  seMsg.textContent = bad || (edited ? `The line now has ${good.length} stops.` : '');
  seMsg.classList.toggle('bad', Boolean(bad));
  if (!edited) return;
  stationsAttr = good.join('; ');
  const p = player();
  if (p && good.length >= MIN_STOPS) p.setAttribute('stations', stationsAttr);
  drawCode();
}

let applyT = 0;
seList.addEventListener('input', (e) => {
  const li = e.target.closest('.se-row');
  if (!li) return;
  const k = [...seList.children].indexOf(li);
  if (e.target.classList.contains('se-time')) {
    let d = digitsOf(e.target.value);
    while (d && !fine(d)) d = d.slice(0, -1);         // a digit that would make 1:70 isn't taken
    rows[k].d = d;
    drawClock(li, d);
  }
  if (e.target.classList.contains('se-name')) {
    rows[k].name = e.target.value.slice(0, NAME_MAX);
    const c = li.querySelector('.se-count');
    c.textContent = `${rows[k].name.length}/${NAME_MAX}`;
    c.classList.toggle('full', rows[k].name.length >= NAME_MAX);
    li.querySelector('.se-del').setAttribute('aria-label', `Remove ${rows[k].name || `stop ${k + 1}`}`);
  }
  edited = true;
  seReset.disabled = false;
  clearTimeout(applyT);
  applyT = setTimeout(apply, 200);
});
// show the typed part, the grey rest of 0:00, and keep the caret at the end of what was typed
function drawClock(li, d) {
  const f = fromDigits(d);
  const box = li.querySelector('.se-time');
  box.value = f.typed;
  li.querySelector('.se-typed').textContent = f.typed;
  li.querySelector('.se-rest').textContent = f.rest;
  if (document.activeElement === box) box.setSelectionRange(f.typed.length, f.typed.length);
}
// leaving the box finishes the time: 1 → 1:00, 1:1 → 1:10
seList.addEventListener('focusout', (e) => {
  if (!e.target.classList?.contains('se-time') || e.target.readOnly) return;
  const li = e.target.closest('.se-row');
  const k = [...seList.children].indexOf(li);
  const d = rows[k].d;
  if (d.length === 1 || d.length === 2) { rows[k].d = d.padEnd(3, '0'); drawClock(li, rows[k].d); apply(); }
});
// clicking into the box puts the caret after the digits (typing always continues from the left)
seList.addEventListener('focusin', (e) => {
  if (!e.target.classList?.contains('se-time')) return;
  const v = e.target.value.length;
  requestAnimationFrame(() => e.target.setSelectionRange(v, v));
});
seList.addEventListener('click', (e) => {
  const del = e.target.closest('.se-del');
  if (!del || del.disabled) return;
  const k = [...seList.children].indexOf(del.closest('.se-row'));
  const gone = rows[k].name;
  rows.splice(k, 1);
  if (k === 0) rows[0].d = '000';                   // the next stop becomes the start of the line
  edited = true;
  drawRows();
  apply();
  seMsg.textContent = `Removed ${gone || 'the stop'}. ${seMsg.textContent}`;
  (seList.children[Math.min(k, rows.length - 1)]?.querySelector('.se-name') || seAdd).focus();
});
seAdd.addEventListener('click', () => {
  if (rows.length >= MAX_STOPS) return;
  const lastT = (rows.length ? secs(rows[rows.length - 1].d) : 0) || 0;
  const end = duration || lastT + 20;
  rows.push({ d: digitsOf(fmt(Math.min(end - 1, lastT + Math.max(2, (end - lastT) / 2)))), name: 'New stop' });
  edited = true;
  drawRows();
  apply();
  const n = seList.lastElementChild.querySelector('.se-name');
  n.focus(); n.select();
});
seReset.addEventListener('click', () => {
  rows = original.map((r) => ({ ...r }));
  edited = false;
  stationsAttr = '';
  player()?.removeAttribute('stations');
  drawRows();
  apply();
  seMsg.textContent = 'Back to the original stations.';
  drawCode();
  seList.querySelector('.se-name')?.focus();
});
// each line brings its own stations: the editor starts from them (a new line starts fresh)
frame.addEventListener('line10:stations', (e) => {
  if (e.detail.fromAttribute) { duration = e.detail.duration; return; }
  duration = e.detail.duration;
  original = e.detail.stations.map((x) => ({ d: digitsOf(fmt(x.start)), name: x.name.slice(0, 40) }));
  rows = original.map((r) => ({ ...r }));
  edited = false;
  stationsAttr = '';
  seLine.textContent = `${current().querySelector('.pick-text b').textContent.toUpperCase()} · STATIONS`;
  drawRows();
  apply();
  drawCode();
});
