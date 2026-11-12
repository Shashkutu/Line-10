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
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.32 ? '#14110a' : '#ffffff';
};
const current = () => picks.find((b) => b.getAttribute('aria-pressed') === 'true') || picks[0];
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
    '  chapters="chapters.vtt"',
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
