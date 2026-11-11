import './line10/line10.js';

const frame = document.getElementById('frame');
const picks = [...document.querySelectorAll('.line-pick')];
const note = document.getElementById('line-note');

function ride(btn, { autoplay = false } = {}) {
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
  p.style.setProperty('--media-accent-text-color', ink);
  frame.classList.toggle('is-vertical', Boolean(d.ratio));
  note.textContent = d.note || '';
  note.hidden = !d.note;
  p.addEventListener('line10:next', changeHere);
  frame.replaceChildren(p);
}

const board = (b, opts) => {
  ride(b, opts);
  try { localStorage.setItem('line10:line', String(picks.indexOf(b))); } catch { /* private mode */ }
};
picks.forEach((b) => b.addEventListener('click', () => board(b)));
// "Change here for…" on the terminus card (heard on the player itself, so it also works from a PiP window)
function changeHere() {
  const now = picks.findIndex((b) => b.getAttribute('aria-pressed') === 'true');
  board(picks[(now + 1) % picks.length], { autoplay: true });
  paint(current().style.getPropertyValue('--c').trim(), { fromPick: true });
  frame.querySelector('line10-player .l10')?.focus({ preventScroll: true });
}
frame.querySelector('line10-player')?.addEventListener('line10:next', changeHere);

// come back to the line you were on
let saved = 0;
try { saved = Number(localStorage.getItem('line10:line')) || 0; } catch { /* private mode */ }
if (saved > 0 && picks[saved]) ride(picks[saved]);

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
