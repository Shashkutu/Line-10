// Line 10 — a Video.js v10 skin that turns the timeline into a metro line.
//
// Chapters are stations, the playhead is a train, the title and next stop
// clatter on a split-flap departure board, and playback speed is the service
// you ride (Local, Express, Rapid…).
//
// Usage:
//   <line10-player src="video.mp4" poster="poster.jpg" title="Studio North"
//                  chapters="stations.vtt" storyboard="storyboard.vtt"
//                  captions="captions.vtt" line="#ffb000" number="10"></line10-player>
//   <line10-player playback-id="MUX_PLAYBACK_ID" chapters="stations.vtt"></line10-player>
//
// Everything interactive (state, keyboard, focus, labels, menus, announcements)
// comes from Video.js components. The few lines of script here only draw the
// stations and drive the departure board, both purely visual (aria-hidden).

import '@videojs/html/video/player';
import '@videojs/html/ui/container';
import '@videojs/html/ui/poster';
import '@videojs/html/ui/title';
import '@videojs/html/ui/controls';
import '@videojs/html/ui/controls-content';
import '@videojs/html/ui/controls-group';
import '@videojs/html/ui/play-button';
import '@videojs/html/ui/seek-button';
import '@videojs/html/ui/mute-button';
import '@videojs/html/ui/volume-popover';
import '@videojs/html/ui/volume-slider';
import '@videojs/html/ui/time-slider';
import '@videojs/html/ui/time-slider-chapters';
import '@videojs/html/ui/time-slider-chapter-title';
import '@videojs/html/ui/slider-track';
import '@videojs/html/ui/slider-buffer';
import '@videojs/html/ui/slider-fill';
import '@videojs/html/ui/slider-thumb';
import '@videojs/html/ui/slider-preview';
import '@videojs/html/ui/slider-thumbnail';
import '@videojs/html/ui/slider-value';
import '@videojs/html/ui/time';
import '@videojs/html/ui/time-group';
import '@videojs/html/ui/time-separator';
import '@videojs/html/ui/menu';
import '@videojs/html/ui/menu-content';
import '@videojs/html/ui/menu-radio-item';
import '@videojs/html/ui/menu-radio-group';
import '@videojs/html/ui/menu-item';
import '@videojs/html/ui/menu-item-indicator';
import '@videojs/html/ui/menu-group-label';
import '@videojs/html/ui/playback-rate-radio-group';
import '@videojs/html/ui/quality-radio-group';
import '@videojs/html/ui/playback-rate-button';
import '@videojs/html/ui/captions-button';
import '@videojs/html/ui/pip-button';
import '@videojs/html/ui/fullscreen-button';
import '@videojs/html/ui/tooltip';
import '@videojs/html/ui/tooltip-group';
import '@videojs/html/ui/tooltip-label';
import '@videojs/html/ui/tooltip-shortcut';
import '@videojs/html/ui/buffering-indicator';
import '@videojs/html/ui/seek-indicator';
import '@videojs/html/ui/seek-indicator-value';
import '@videojs/html/ui/status-indicator';
import '@videojs/html/ui/status-indicator-value';
import '@videojs/html/ui/volume-indicator';
import '@videojs/html/ui/volume-indicator-fill';
import '@videojs/html/ui/volume-indicator-value';
import '@videojs/html/ui/hotkey';
import '@videojs/html/ui/gesture';
import '@videojs/html/ui/status-announcer';
import '@videojs/html/ui/error-dialog';
import '@videojs/html/ui/dialog-backdrop';
import '@videojs/html/ui/dialog-popup';
import '@videojs/html/ui/dialog-title';
import '@videojs/html/ui/dialog-description';
import '@videojs/html/ui/dialog-close';

import { icons as i } from './icons.js';

// Playback speed, named like the services on a metro line.
export const SERVICES = { 0.5: 'Slow', 0.75: 'Night', 1: 'Local', 1.25: 'Limited', 1.5: 'Express', 2: 'Rapid' };
const RATES = '0.5 0.75 1 1.25 1.5 2';   // shown fastest at the top (the list is flipped in CSS)
// Viewer settings, remembered between videos and visits.
const PREFS = {
  boardSize: [['full', 'Full'], ['compact', 'Compact'], ['off', 'Hidden']],
  boardPos: [['right', 'Top right'], ['left', 'Top left']],
  boardStyle: [['solid', 'Solid'], ['glass', 'Glass'], ['clear', 'No panel']],
  boardFlip: [['on', 'Flip letters'], ['off', 'Instant']],
  capSize: [['xl', 'Extra large'], ['l', 'Large'], ['m', 'Medium'], ['s', 'Small'], ['xs', 'Extra small']],
  capColor: [['white', 'White'], ['yellow', 'Yellow'], ['line', 'Line colour']],
  capBg: [['100', 'Solid'], ['75', '75%'], ['50', '50%'], ['25', '25%'], ['0', 'Transparent']],
  capEdge: [['thick', 'Thick'], ['medium', 'Medium'], ['thin', 'Thin'], ['none', 'None']],
  capShadow: [['glow', 'All around'], ['br', 'Down-right ↘'], ['b', 'Down ↓'], ['bl', 'Down-left ↙'], ['off', 'Off']],
  capBrackets: [['square', '[ ]'], ['round', '( )'], ['double', '“ ”'], ['single', '‘ ’'], ['none', 'No brackets']],
};
const BOARD_ROWS = [['boardSize', 'Size'], ['boardPos', 'Position'], ['boardStyle', 'Style'], ['boardFlip', 'Letters']];
const CAPTION_ROWS = [['capSize', 'Text size'], ['capColor', 'Text colour'], ['capBg', 'Background'], ['capEdge', 'Outline'], ['capShadow', 'Shadow'], ['capBrackets', 'Brackets']];
const DEFAULTS = {
  boardSize: 'full', boardPos: 'left', boardStyle: 'glass', boardFlip: 'on',
  capSize: 'm', capColor: 'white', capBg: '75', capEdge: 'none', capShadow: 'off', capBrackets: 'square',
  volume: 1, muted: false, rate: 1, captions: false,
};
const BRACKETS = { square: ['[', ']'], round: ['(', ')'], double: ['“', '”'], single: ['‘', '’'], none: ['', ''] };
const KEY = 'line10:prefs';
const loadPrefs = () => { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULTS }; } };
const savePrefs = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* private mode */ } };

let count = 0;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const clock = (t) => { t = Math.max(0, Math.floor(t || 0)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tooltips: the label comes from the control itself (Play, Mute…); the keys are drawn as key caps.
const kbd = (keys) => keys.map((k) => `<kbd class="l10-key">${k}</kbd>`).join('');
// side 'left' / 'right' = the tooltip sits above the button and grows to the left / right, so it
// stays inside the player at either end of the bar. Each tooltip has its own id (its own anchor).
const tip = (id, keys = [], { label = '', delay = '', side = 'top' } = {}) => `
  <media-tooltip id="${id}-tip" trigger="${id}" side="${side === 'left' || side === 'right' ? 'top' : side}" align="${side === 'top' ? 'center' : 'start'}" class="l10-pop l10-tip${side === 'left' ? ' l10-tip-end' : side === 'top' ? ' l10-tip-mid' : ''}"${delay ? ` delay="${delay}"` : ''}>
    <media-tooltip-label>${label}</media-tooltip-label>
    ${keys.length ? `<span class="l10-keys">${kbd(keys)}</span>` : ''}
  </media-tooltip>`;

// A settings menu: a list of rows, each opening its own page of choices.
const settingsMenu = (id, menuId, title, rows, cls, side = 'top', align = 'end') => `
  <media-menu id="${menuId}" side="${side}" align="${align}" class="l10-pop l10-menu l10-setmenu ${cls}">
    <media-menu-content class="l10-menu-content">
      <span class="l10-menu-label" aria-hidden="true">${title}</span>
      ${prefPages(id, 'pg-', rows)}
    </media-menu-content>
  </media-menu>`;
// rows that each open a page of choices (used by the board menu, the caption menu and the small-player menu)
const prefPages = (id, pre, rows) => `
      ${rows.map(([k, label]) => `
      <media-menu-item commandfor="${id(pre + k)}" class="l10-menu-item l10-menu-nav">
        <span class="l10-menu-text">${label}</span>
        <span class="l10-menu-value" data-for="${k}"></span>
        ${i.chevron('l10-menu-chev')}
      </media-menu-item>
      <media-menu-content class="l10-menu-content" id="${id(pre + k)}">
        <media-menu-item class="l10-menu-item l10-menu-back">${i.back2('l10-menu-chev')}<span class="l10-menu-text">${label}</span></media-menu-item>
        <media-menu-radio-group class="l10-menu-group" data-pref="${k}" aria-label="${label}">
          ${PREFS[k].map(([v, name]) => `
          <media-menu-radio-item class="l10-menu-item" value="${v}">
            <span class="l10-menu-dot" aria-hidden="true"></span>
            <span data-part="label" class="l10-menu-text">${name}</span>
            <media-menu-item-indicator force-mount class="l10-menu-check">${i.check()}</media-menu-item-indicator>
          </media-menu-radio-item>`).join('')}
        </media-menu-radio-group>
      </media-menu-content>`).join('')}`;

const rateGroup = (cls = '') => `
                    <media-playback-rate-radio-group class="l10-menu-group ${cls}" rates="${RATES}" aria-label="Service">
                      <media-menu-group-label class="l10-menu-label">Service</media-menu-group-label>
                      <template>
                        <media-menu-radio-item class="l10-menu-item">
                          <span class="l10-menu-dot" aria-hidden="true"></span>
                          <span data-part="label" class="l10-menu-text"></span>
                          <media-menu-item-indicator force-mount class="l10-menu-check">${i.check()}</media-menu-item-indicator>
                        </media-menu-radio-item>
                      </template>
                    </media-playback-rate-radio-group>`;
const qualityGroup = () => `
                    <media-quality-radio-group class="l10-menu-group l10-qgroup">
                      <template>
                        <media-menu-radio-item class="l10-menu-item">
                          <span class="l10-menu-dot" aria-hidden="true"></span>
                          <span data-part="label" class="l10-menu-text"></span>
                          <span data-part="badge" class="l10-menu-badge"></span>
                          <media-menu-item-indicator force-mount class="l10-menu-check">${i.check()}</media-menu-item-indicator>
                        </media-menu-radio-item>
                      </template>
                    </media-quality-radio-group>`;
// small players: one Settings button holds everything except play, skip, volume, time and fullscreen
const navRow = (id, page, cls, icon, label) => `
      <media-menu-item commandfor="${id(page)}" class="l10-menu-item l10-menu-nav ${cls}">
        ${icon}<span class="l10-menu-text">${label}</span><span class="l10-menu-value" data-m="${cls}"></span>${i.chevron('l10-menu-chev')}
      </media-menu-item>`;
const backRow = (label) => `<media-menu-item class="l10-menu-item l10-menu-back">${i.back2('l10-menu-chev')}<span class="l10-menu-text">${label}</span></media-menu-item>`;
const moreMenu = (id) => `
  <media-menu id="${id('more-menu')}" side="top" align="end" class="l10-pop l10-menu l10-setmenu l10-moremenu">
    <span class="l10-more-cue" aria-hidden="true">${i.chevron()}</span>
    <media-menu-content class="l10-menu-content">
      <span class="l10-menu-label" aria-hidden="true">Settings</span>
      ${navRow(id, 'm-st', 'l10-m-st', i.stations('l10-menu-ico'), 'Stations')}
      <media-menu-content class="l10-menu-content" id="${id('m-st')}">${backRow('Stations')}<div class="l10-menu-group l10-stlist"></div></media-menu-content>
      <media-menu-item class="l10-menu-item l10-m-next">${i.nextStop('l10-menu-ico')}<span class="l10-menu-text">Next stop</span><span class="l10-menu-value" data-m="l10-m-next"></span></media-menu-item>
      ${navRow(id, 'm-svc', 'l10-m-svc', i.service('l10-menu-ico'), 'Speed')}
      <media-menu-content class="l10-menu-content l10-flip-list" id="${id('m-svc')}">${backRow('Speed')}${rateGroup()}</media-menu-content>
      ${navRow(id, 'm-q', 'l10-m-q', i.quality('l10-menu-ico'), 'Quality')}
      <media-menu-content class="l10-menu-content l10-flip-list" id="${id('m-q')}">${backRow('Quality')}${qualityGroup()}</media-menu-content>
      <media-menu-item class="l10-menu-item l10-m-cc">${i.ccOff('l10-menu-ico')}<span class="l10-menu-text">Captions</span><span class="l10-menu-value" data-m="l10-m-cc"></span></media-menu-item>
      ${navRow(id, 'm-cs', 'l10-m-cs', i.captionStyle('l10-menu-ico'), 'Caption style')}
      <media-menu-content class="l10-menu-content l10-cspage" id="${id('m-cs')}" data-show="list">${backRow('Caption style')}
        <div class="l10-csview" data-view="list">${CAPTION_ROWS.map(([k, label]) => `
          <media-menu-item class="l10-menu-item l10-menu-nav l10-csrow" data-k="${k}">
            <span class="l10-menu-text">${label}</span><span class="l10-menu-value" data-for="${k}"></span>${i.chevron('l10-menu-chev')}
          </media-menu-item>`).join('')}
        </div>${CAPTION_ROWS.map(([k, label]) => `
        <div class="l10-csview" data-view="${k}" hidden>
          <media-menu-item class="l10-menu-item l10-menu-back l10-csback">${i.back2('l10-menu-chev')}<span class="l10-menu-text">${label}</span></media-menu-item>
          <div class="l10-menu-group" role="group" aria-label="${label}">${PREFS[k].map(([v, name]) => `
            <media-menu-item class="l10-menu-item l10-csopt" data-k="${k}" data-v="${v}">
              <span class="l10-menu-dot" aria-hidden="true"></span><span class="l10-menu-text">${name}</span><span class="l10-menu-check" aria-hidden="true">${i.check()}</span>
            </media-menu-item>`).join('')}
          </div>
        </div>`).join('')}
      </media-menu-content>
      <media-menu-item class="l10-menu-item l10-m-pip">${i.pipIn('l10-menu-ico')}<span class="l10-menu-text l10-m-pip-text">Picture-in-picture</span></media-menu-item>
    </media-menu-content>
  </media-menu>`;

// Mux thumbnails come in any width: phones get a small one, big screens the sharp one
const POSTER_SIZES = '(max-width: 1180px) 100vw, 1140px';
const posterSrcset = (url) => (/image\.mux\.com\/.+[?&]width=\d+/.test(url)
  ? [640, 960, 1280].map((w) => `${url.replace(/([?&]width=)\d+/, `$1${w}`)} ${w}w`).join(', ') : '');
const posterImg = (url, first) => {
  const set = posterSrcset(url);
  return `<img src="${esc(url)}"${set ? ` srcset="${esc(set)}" sizes="${POSTER_SIZES}"` : ''}${first ? ' fetchpriority="high"' : ''} alt="">`;
};

function template(o) {
  const n = ++count;
  const id = (name) => `l10-${n}-${name}`;
  const tracks = `
      ${o.captions ? `<track kind="captions" srclang="en" label="English" src="${esc(o.captions)}">` : ''}
      ${o.chapters ? `<track kind="chapters" srclang="en" label="Stations" src="${esc(o.chapters)}" default>` : ''}`;
  const media = o.playbackId
    ? `<mux-video src="https://stream.mux.com/${esc(o.playbackId)}.m3u8" playsinline preload="metadata" crossorigin="anonymous">${tracks}</mux-video>`
    : `<video src="${esc(o.src)}" playsinline preload="metadata" crossorigin="anonymous">${tracks}
      ${o.storyboard ? `<track kind="metadata" label="thumbnails" src="${esc(o.storyboard)}" default>` : ''}</video>`;
  const style = [o.line ? `--l10-line:${esc(o.line)}` : '', o.ratio ? `aspect-ratio:${esc(o.ratio)}` : ''].filter(Boolean).join(';');
  const num = esc(o.number || '10');

  return `
<video-player class="l10-player" ${o.title ? `content-title="${esc(o.title)}"` : ''}>
  <media-container class="l10" data-preset="video"${style ? ` style="${style}"` : ''}>
    ${media}
    <media-poster class="l10-poster">${o.poster ? posterImg(o.poster, n === 1) : ''}</media-poster>

    <media-controls class="l10-controls">
      <media-controls-content class="l10-content">
        <media-tooltip-group delay="500">

          <!-- Departure board. The tiles are visual only: the title is announced by media-title, times by media-time. -->
          <div class="l10-board">
            <div class="l10-board-body" aria-hidden="true">
              <div class="l10-board-head">
                <span class="l10-badge">${num}</span>
                <span class="l10-board-title"></span>
              </div>
              <div class="l10-board-rows">
                <div class="l10-board-row l10-row-now" data-badge="${num}"><span class="l10-board-label">Now</span><span class="l10-flaps" data-flap="now" data-len="13"></span></div>
                <div class="l10-board-row l10-row-next"><span class="l10-board-label">Next</span><span class="l10-flaps" data-flap="next" data-len="13"></span><span class="l10-flaps l10-eta" data-flap="eta" data-len="4"></span></div>
              </div>
            </div>
            <button type="button" class="l10-gear" id="${id('gear')}" commandfor="${id('board-menu')}" aria-label="Departure board settings" aria-haspopup="menu">${i.gear()}</button>
          </div>
          ${tip(id('gear'), [], { label: 'Departure board settings', side: 'bottom' })}
          ${settingsMenu(id, id('board-menu'), 'Departure board', BOARD_ROWS, 'l10-boardmenu', 'bottom', 'start')}
          <media-title class="l10-sr"></media-title>

          <media-controls-group class="l10-center">
            <media-seek-button seconds="-5" class="l10-btn l10-ghost l10-cseek" id="${id('back')}">${i.back()}</media-seek-button>
            ${tip(id('back'), ['←', 'J'])}
            <media-play-button class="l10-btn l10-play l10-cplay" id="${id('cplay')}">
              ${i.restart('l10-i-restart')}${i.play('l10-i-play')}${i.pause('l10-i-pause')}
            </media-play-button>
            ${tip(id('cplay'), ['Space', 'K'])}
            <media-seek-button seconds="5" class="l10-btn l10-ghost l10-cseek" id="${id('fwd')}">${i.fwd()}</media-seek-button>
            ${tip(id('fwd'), ['→', 'L'])}
          </media-controls-group>

          <div class="l10-panel">
            <div class="l10-route">
              <div class="l10-stations" aria-hidden="true"></div>
              <media-time-slider class="l10-slider" thumb-alignment="center">
                <media-time-slider-chapters class="l10-chapters">
                  <template>
                    <div class="l10-seg">
                      <media-slider-track class="l10-track">
                        <media-slider-buffer class="l10-buffer"></media-slider-buffer>
                        <media-slider-fill class="l10-fill"></media-slider-fill>
                      </media-slider-track>
                    </div>
                  </template>
                </media-time-slider-chapters>
                <media-slider-thumb class="l10-train"><span class="l10-train-car" aria-hidden="true"><i></i><i></i><i></i></span></media-slider-thumb>
                <media-slider-preview class="l10-sign" overflow="clamp">
                  <span class="l10-sign-card">
                    <media-slider-thumbnail class="l10-sign-img"></media-slider-thumbnail>
                    <span class="l10-sign-text">
                      <span class="l10-sign-top"><span class="l10-badge l10-badge-sm" aria-hidden="true">${num}</span><media-slider-value type="pointer" class="l10-sign-time"></media-slider-value></span>
                      <media-time-slider-chapter-title class="l10-sign-name"></media-time-slider-chapter-title>
                    </span>
                  </span>
                </media-slider-preview>
                <span class="l10-pole" aria-hidden="true"></span>
              </media-time-slider>
            </div>

            <media-controls-group class="l10-row">
              <media-controls-group class="l10-group">
                <media-play-button class="l10-btn l10-play l10-rplay" id="${id('play')}">
                  ${i.restart('l10-i-restart')}${i.play('l10-i-play')}${i.pause('l10-i-pause')}
                </media-play-button>
                ${tip(id('play'), ['Space', 'K'], { side: 'right' })}
                <media-seek-button seconds="-5" class="l10-btn l10-rseek" id="${id('rback')}">${i.back()}</media-seek-button>
                ${tip(id('rback'), ['←', 'J'], { side: 'right' })}
                <media-seek-button seconds="5" class="l10-btn l10-rseek" id="${id('rfwd')}">${i.fwd()}</media-seek-button>
                ${tip(id('rfwd'), ['→', 'L'], { side: 'right' })}
                <media-mute-button class="l10-btn l10-mute" id="${id('mute')}" commandfor="${id('vol')}">
                  ${i.volOff('l10-i-off')}${i.vol1('l10-i-v1')}${i.vol2('l10-i-v2')}${i.vol3('l10-i-v3')}
                </media-mute-button>
                <media-volume-popover open-on-hover delay="100" close-delay="300" side="top" class="l10-pop l10-volume" id="${id('vol')}">
                  <media-volume-slider class="l10-vslider" orientation="vertical" thumb-alignment="edge">
                    <media-slider-track class="l10-vtrack"><media-slider-fill class="l10-vfill"></media-slider-fill></media-slider-track>
                    <media-slider-thumb class="l10-vthumb"></media-slider-thumb>
                  </media-volume-slider>
                  <!-- after 2 s of hovering, a hint explains the control and its keys -->
                  <span class="l10-vol-hint" aria-hidden="true"><b>Volume</b><span>${kbd(['M'])} mute</span><span>${kbd(['↑', '↓'])} louder / quieter</span><span>Drag or click the fader</span></span>
                </media-volume-popover>
                <media-time-group class="l10-time">
                  <media-time type="current" class="l10-time-now"></media-time>
                  <media-time-separator class="l10-time-sep"></media-time-separator>
                  <media-time type="duration" class="l10-time-dur"></media-time>
                  <media-time type="remaining" class="l10-time-left"></media-time>
                </media-time-group>
              </media-controls-group>

              <media-controls-group class="l10-group l10-group-end">
                <button type="button" class="l10-btn l10-stbtn" id="${id('st')}" commandfor="${id('st-menu')}" aria-label="All stations" aria-haspopup="menu" data-off>${i.stations()}</button>
                ${tip(id('st'), [], { label: 'All stations', side: 'left' })}
                <media-menu id="${id('st-menu')}" side="top" align="end" class="l10-pop l10-menu l10-stmenu">
                  <media-menu-content class="l10-menu-content">
                    <span class="l10-menu-label" aria-hidden="true">Stations</span>
                    <div class="l10-menu-group l10-stlist"></div>
                  </media-menu-content>
                </media-menu>
                <button type="button" class="l10-btn l10-pill l10-nextstop" id="${id('next')}" aria-keyshortcuts="]" hidden>
                  ${i.nextStop()}<span class="l10-pill-text">Next stop</span>
                </button>
                ${tip(id('next'), ['[', ']'], { label: 'Jump to the next station', side: 'left' })}
                <media-playback-rate-button class="l10-btn l10-pill l10-service" id="${id('svc')}" commandfor="${id('svc-menu')}" rates="${RATES}">
                  ${i.service()}<span class="l10-pill-text l10-service-name" aria-hidden="true">Local</span><span class="l10-service-rate" aria-hidden="true">1×</span>
                </media-playback-rate-button>
                ${tip(id('svc'), ['&lt;', '&gt;'], { label: 'Speed', side: 'left' })}
                <media-menu id="${id('svc-menu')}" side="top" align="end" class="l10-pop l10-menu l10-flip-list">
                  <media-menu-content class="l10-menu-content">
                    ${rateGroup()}
                  </media-menu-content>
                </media-menu>
                <button type="button" class="l10-btn l10-pill l10-quality" id="${id('q')}" commandfor="${id('q-menu')}" aria-label="Quality" aria-haspopup="menu" data-off><span class="l10-pill-text l10-quality-name">Auto</span></button>
                ${tip(id('q'), [], { label: 'Quality', side: 'left' })}
                <media-menu id="${id('q-menu')}" side="top" align="end" class="l10-pop l10-menu l10-qmenu l10-flip-list">
                  <media-menu-content class="l10-menu-content">
                    <span class="l10-menu-label" aria-hidden="true">Quality</span>
                    ${qualityGroup()}
                  </media-menu-content>
                </media-menu>
                <media-captions-button class="l10-btn l10-cc" id="${id('cc')}">${i.ccOff('l10-i-cc-off')}${i.ccOn('l10-i-cc-on')}</media-captions-button>
                ${tip(id('cc'), ['C'], { side: 'left' })}
                <button type="button" class="l10-btn l10-capset" id="${id('capset')}" commandfor="${id('capset-menu')}" aria-label="Caption style" aria-haspopup="menu">${i.captionStyle()}</button>
                ${tip(id('capset'), [], { label: 'Caption style', side: 'left' })}
                <media-pip-button class="l10-btn l10-pip" id="${id('pip')}">${i.pipIn('l10-i-pip-in')}${i.pipOut('l10-i-pip-out')}</media-pip-button>
                ${tip(id('pip'), ['I'], { side: 'left' })}
                ${settingsMenu(id, id('capset-menu'), 'Caption style', CAPTION_ROWS, 'l10-capmenu')}
                <button type="button" class="l10-btn l10-more" id="${id('more')}" aria-keyshortcuts="S" commandfor="${id('more-menu')}" aria-label="Settings" aria-haspopup="menu">${i.settings()}</button>
                ${tip(id('more'), ['S'], { label: 'Settings', side: 'left' })}
                ${moreMenu(id)}
                <media-fullscreen-button class="l10-btn l10-fs" id="${id('fs')}">${i.fsIn('l10-i-fs-in')}${i.fsOut('l10-i-fs-out')}</media-fullscreen-button>
                ${tip(id('fs'), ['F'], { side: 'left' })}
              </media-controls-group>
            </media-controls-group>
          </div>
        </media-tooltip-group>
      </media-controls-content>
    </media-controls>

    <!-- Shown while the controls are hidden: "Now arriving" as the train pulls into a station. -->
    <!-- Captions are drawn here (not by the browser) so they can step up above the line when the controls show. -->
    <div class="l10-captions" aria-hidden="true"><span class="l10-cap-text"></span></div>

    <div class="l10-arrival" aria-hidden="true"><span class="l10-badge l10-badge-sm">${num}</span><span><small>Now arriving</small><b class="l10-arrival-name"></b></span></div>

    <!-- Buffering: the train is held between two stops until the signal clears. -->
    <media-buffering-indicator class="l10-buffering">
      <span class="l10-hold" aria-hidden="true">
        <span class="l10-hold-track"><span class="l10-hold-train"><i></i><i></i><i></i></span></span>
        <span class="l10-hold-text">Held at a signal</span>
      </span>
    </media-buffering-indicator>

    <!-- The end of the line: ride again, or change here for the next line the page offers. -->
    <div class="l10-endcard" role="group" aria-label="End of the line">
      <span class="l10-term-tag">Terminus</span>
      <b class="l10-term-name"></b>
      <div class="l10-term-actions">
        <button type="button" class="l10-term-btn l10-term-next" hidden>
          <span class="l10-badge l10-term-badge"></span>
          <span class="l10-term-label"><small>Change here for</small><b class="l10-term-next-name"></b></span>
          ${i.chevron('l10-term-arrow')}
        </button>
        <button type="button" class="l10-term-btn l10-term-again">${i.restart()}<span>Ride again</span></button>
      </div>
    </div>

    <div class="l10-indicators" aria-hidden="true">
      <media-seek-indicator class="l10-ind"><media-seek-indicator-value class="l10-ind-value"></media-seek-indicator-value></media-seek-indicator>
      <media-volume-indicator class="l10-ind l10-ind-vol">
        <span class="l10-ind-gauge"><media-volume-indicator-fill class="l10-ind-fill"></media-volume-indicator-fill></span>
        <media-volume-indicator-value class="l10-ind-value"></media-volume-indicator-value>
      </media-volume-indicator>
      <media-status-indicator class="l10-ind"><media-status-indicator-value class="l10-ind-value"></media-status-indicator-value></media-status-indicator>
    </div>

    <media-hotkey keys="Space" action="togglePaused"></media-hotkey>
    <media-hotkey keys="k" action="togglePaused"></media-hotkey>
    <media-hotkey keys="m" action="toggleMuted"></media-hotkey>
    <media-hotkey keys="ArrowRight" action="seekStep" value="5"></media-hotkey>
    <media-hotkey keys="ArrowLeft" action="seekStep" value="-5"></media-hotkey>
    <media-hotkey keys="l" action="seekStep" value="5"></media-hotkey>
    <media-hotkey keys="j" action="seekStep" value="-5"></media-hotkey>
    <media-hotkey keys="ArrowUp" action="volumeStep" value="0.05"></media-hotkey>
    <media-hotkey keys="ArrowDown" action="volumeStep" value="-0.05"></media-hotkey>
    <media-hotkey keys="0-9" action="seekToPercent"></media-hotkey>
    <media-hotkey keys="Home" action="seekToPercent" value="0"></media-hotkey>
    <media-hotkey keys="End" action="seekToPercent" value="100"></media-hotkey>
    <media-hotkey keys="&gt;" action="speedUp"></media-hotkey>
    <media-hotkey keys="&lt;" action="speedDown"></media-hotkey>
    <media-hotkey keys="f" action="toggleFullscreen"></media-hotkey>
    <media-hotkey keys="c" action="toggleSubtitles"></media-hotkey>
    ${'documentPictureInPicture' in window ? '' : '<media-hotkey keys="i" action="togglePictureInPicture"></media-hotkey>'}

    <media-gesture type="tap" action="toggleControls" pointer="touch"></media-gesture>
    <media-gesture type="doubletap" action="seekStep" value="-5" region="left"></media-gesture>
    <media-gesture type="doubletap" action="toggleFullscreen" region="center"></media-gesture>
    <media-gesture type="doubletap" action="seekStep" value="5" region="right"></media-gesture>

    <media-status-announcer class="l10-sr"></media-status-announcer>
    <div class="l10-sr l10-sr-board" aria-live="polite" aria-atomic="true"></div>

    <media-error-dialog>
      <media-dialog-backdrop class="l10-backdrop"></media-dialog-backdrop>
      <media-dialog-popup class="l10-dialog">
        <span class="l10-dialog-tag" aria-hidden="true">Service notice</span>
        <media-dialog-title class="l10-dialog-title"></media-dialog-title>
        <p class="l10-dialog-help">This train can't run right now. Check your connection and try again.</p>
        <media-dialog-description class="l10-dialog-text"></media-dialog-description>
        <media-dialog-close class="l10-btn l10-pill l10-dialog-close"></media-dialog-close>
      </media-dialog-popup>
    </media-error-dialog>
  </media-container>
</video-player>`;
}

// ---- split-flap departure board ----------------------------------------
const FLAP_CHARS = 'ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789';
function setFlaps(el, text) {
  const len = Number(el.dataset.len) || text.length;
  const target = String(text).toUpperCase().slice(0, len).padEnd(len, ' ');
  if (el.dataset.text === target) return;
  const first = !el.children.length;
  if (first) el.innerHTML = Array.from({ length: len }, () => '<span class="l10-tile"><span> </span></span>').join('');
  el.dataset.text = target;
  const calm = first || reduced() || el.closest('.l10')?.dataset.boardFlip === 'off';
  [...el.children].forEach((tile, k) => {
    const face = tile.firstElementChild;
    const to = target[k];
    clearTimeout(tile._t);
    if (face.textContent === to) return;
    if (calm) { face.textContent = to; return; }
    // a few random letters clatter past before the right one lands, left to right
    let steps = to === ' ' ? 1 : 2 + ((k * 7) % 3);
    const tick = () => {
      tile.classList.remove('l10-flip'); void tile.offsetWidth; tile.classList.add('l10-flip');
      face.textContent = steps > 1 ? FLAP_CHARS[(Math.random() * FLAP_CHARS.length) | 0] : to;
      if (--steps > 0) tile._t = setTimeout(tick, 70);
    };
    tile._t = setTimeout(tick, k * 28);
  });
}

class Line10Player extends HTMLElement {
  static observedAttributes = ['line', 'next-title', 'next-number', 'next-line'];
  attributeChangedCallback(name, _old, value) {
    if (this.dataset.ready == null) return;
    if (name === 'line') this.querySelector('.l10')?.style.setProperty('--l10-line', value || '');
    else this.#offerNext?.();
  }

  connectedCallback() {
    if (this.dataset.ready != null) return;
    this.dataset.ready = '';
    const a = (k) => this.getAttribute(k);
    const title = a('title') || '';
    if (a('playback-id')) import('@videojs/html/media/mux-video');
    const early = this.querySelector('img.l10-preposter');   // a poster the page already showed
    this.innerHTML = template({
      src: a('src'), poster: a('poster'), title: a('title'), captions: a('captions'), chapters: a('chapters'),
      storyboard: a('storyboard'), playbackId: a('playback-id'), line: a('line'), number: a('number'), ratio: a('ratio'),
    });
    this.removeAttribute('title');
    // keep the very same image the page painted first, so nothing reloads or flashes
    const slot = this.querySelector('.l10-poster img');
    if (early && slot) { early.classList.remove('l10-preposter'); slot.replaceWith(early); }
    // with Mux, wait until <mux-video> is a real element so its text tracks and renditions exist
    if (a('playback-id')) customElements.whenDefined('mux-video').then(() => this.#wire(title));
    else this.#wire(title);
  }

  // a player taken off the page for good lets go of its page-level listeners and timers
  // (moving it into a picture-in-picture window and back does not count)
  #off = null;
  #offerNext = null;
  disconnectedCallback() {
    setTimeout(() => { if (!this.isConnected) { this.#off?.abort(); this.#off = null; } }, 0);
  }

  #wire(title) {
    const off = this.#off = new AbortController();
    const whileAlive = { signal: off.signal };
    const $ = (s) => this.querySelector(s);
    const root = $('.l10');
    const media = root.querySelector('video, mux-video');
    const stationsEl = $('.l10-stations');
    const nextBtn = $('.l10-nextstop');
    const stBtn = $('.l10-stbtn');
    const stLists = [...root.querySelectorAll('.l10-stlist')];
    const srBoard = $('.l10-sr-board');
    const svcName = $('.l10-service-name');
    const arrival = $('.l10-arrival');
    const flaps = { now: $('[data-flap="now"]'), next: $('[data-flap="next"]'), eta: $('[data-flap="eta"]') };
    $('.l10-board-title').textContent = title;
    let stations = [];
    let current = -1;
    let drawn = '';

    // service names in the menu ("Express · 1.5×")
    for (const group of root.querySelectorAll('media-playback-rate-radio-group')) {
      group.formatRate = (r) => SERVICES[r] || `${r}×`;
      // the speed is drawn next to each name; give screen readers both
      const nameItems = () => group.querySelectorAll('media-menu-radio-item[data-rate]').forEach((el) => {
        const r = Number(el.dataset.rate);
        el.setAttribute('aria-label', `${SERVICES[r] || 'Custom'}, ${r} times speed`);
      });
      new MutationObserver(nameItems).observe(group, { childList: true, subtree: true, attributeFilter: ['data-rate'] });
      nameItems();
    }

    const readStations = () => {
      const track = [...(media.textTracks || [])].find((t) => t.kind === 'chapters');
      if (!track) return;
      if (track.mode === 'disabled') track.mode = 'hidden';
      const cues = [...(track.cues || [])];
      const dur = media.duration;
      if (!cues.length || !Number.isFinite(dur) || dur <= 0) return;
      const next = cues.map((c) => ({ start: c.startTime, end: c.endTime, name: c.text.trim() }));
      const sig = JSON.stringify([dur, next]);
      if (sig === drawn) return;          // cuechange fires at every station; only redraw when the route changes
      drawn = sig;
      stations = next;
      stationsEl.innerHTML = stations.map((s, k) => `
        <span class="l10-stop${k === stations.length - 1 ? ' l10-terminus' : ''}${k === 0 ? ' l10-origin' : ''}" style="--at:${(s.start / dur) * 100}%">
          <span class="l10-dot"></span><span class="l10-name">${esc(s.name)}</span>
        </span>`).join('') + '<span class="l10-endcap"></span>';
      root.style.setProperty('--l10-stops', stations.length);
      const stHTML = stations.map((s, k) => `
        <media-menu-item class="l10-menu-item l10-st-item" data-k="${k}">
          <span class="l10-menu-dot" aria-hidden="true"></span>
          <span class="l10-menu-text">${esc(s.name)}</span>
          <span class="l10-st-time">${clock(s.start)}</span>
        </media-menu-item>`).join('');
      stLists.forEach((l) => { l.innerHTML = stHTML; });
      stBtn.toggleAttribute('data-off', stations.length < 2);
      $('.l10-m-st').toggleAttribute('data-off', stations.length < 2);
      $('.l10-m-next').toggleAttribute('data-off', stations.length < 2);
      layoutNames();
      nextBtn.hidden = stations.length < 2;
      current = -1;
      update();
    };

    const update = () => {
      const t = media.currentTime || 0;
      const dur = media.duration || 0;
      const ended = media.ended || Boolean(dur && t >= dur - 0.05);
      if (root.hasAttribute('data-terminus') !== ended) {      // the end-of-the-line card
        root.toggleAttribute('data-terminus', ended);
        $('.l10-term-name').textContent = stations[stations.length - 1]?.name || title.split(/[—–-]/)[0].trim() || '';
      }
      if (!stations.length) {
        setFlaps(flaps.now, title.split(/[—–-]/)[0].trim() || 'Line 10');
        setFlaps(flaps.next, dur ? 'Terminus' : '');
        setFlaps(flaps.eta, dur ? clock(dur - t) : '');
        return;
      }
      let k = stations.findIndex((s) => t >= s.start && t < s.end);
      if (k < 0) k = t >= stations[stations.length - 1].start ? stations.length - 1 : 0;
      const stops = stationsEl.querySelectorAll('.l10-stop');
      stops.forEach((el, j) => { el.dataset.state = j < k ? 'passed' : j === k ? 'current' : 'ahead'; });
      const next = stations[k + 1];
      setFlaps(flaps.now, ended ? 'Terminus' : stations[k].name);
      setFlaps(flaps.next, ended ? 'Change here' : next ? next.name : 'Terminus');
      setFlaps(flaps.eta, ended ? '' : clock((next ? next.start : dur) - t));
      nextBtn.setAttribute('aria-label', next ? `Next stop: ${next.name}` : 'Last stop reached');
      nextBtn.toggleAttribute('data-last', !next);
      if (k !== current) {
        // "Now arriving" — only while the controls are out of the way and the train is moving
        if (current !== -1 && !media.paused && !ended) {
          $('.l10-arrival-name').textContent = stations[k].name;
          arrival.classList.remove('l10-show'); void arrival.offsetWidth; arrival.classList.add('l10-show');
        }
        current = k;
        layoutNames();
        stLists.forEach((l) => l.querySelectorAll('.l10-st-item').forEach((el, j) => el.toggleAttribute('data-current', j === k)));
        // the board is visual; screen readers hear the same news here
        srBoard.textContent = ended ? 'Terminus.' : `Now at ${stations[k].name}.${next ? ` Next: ${next.name}.` : ' Last stop.'}`;
      }
    };

    // Station names: keep each label inside the line, and when two would
    // overlap hide the less important one (current > next > the rest).
    const layoutNames = () => {
      const stops = [...stationsEl.querySelectorAll('.l10-stop')];
      if (!stops.length) return;
      const W = stationsEl.clientWidth;
      if (!W) return;
      const boxes = stops.map((el, k) => {
        const name = el.querySelector('.l10-name');
        const w = name.offsetWidth;
        const x = (stations[k].start / (media.duration || 1)) * W;
        const left = Math.min(Math.max(x - w / 2, -4), W - w + 4);
        name.style.setProperty('--shift', `${Math.round(left - x)}px`);
        return { el, k, left, right: left + w };
      });
      const rank = (b) => { const s = b.el.dataset.state; return s === 'current' ? 0 : b.k === current + 1 ? 1 : b.k === stations.length - 1 ? 2 : b.k === 0 ? 3 : 4; };
      // two rows of names: if a name won't fit next to its neighbours it drops to the
      // second row; only when both rows are full is it hidden
      const rows = [[], []];
      const hits = (row, b) => row.some((o) => b.left < o.right + 12 && b.right + 12 > o.left);
      [...boxes].sort((a, b) => rank(a) - rank(b) || a.k - b.k).forEach((b) => {
        const r = !hits(rows[0], b) ? 0 : !hits(rows[1], b) ? 1 : -1;
        b.el.toggleAttribute('data-crowded', r < 0);
        b.el.style.setProperty('--row', r < 0 ? 0 : r);
        if (r >= 0) rows[r].push(b);
      });
      root.toggleAttribute('data-two-rows', rows[1].length > 0);
    };
    new ResizeObserver(() => layoutNames()).observe(stationsEl);

    const jump = (dir) => {
      if (!stations.length) return;
      const t = media.currentTime;
      if (dir > 0) { const n = stations.find((s) => s.start > t + 0.25); media.currentTime = n ? n.start : media.duration; }
      else { const p = [...stations].reverse().find((s) => s.start < t - 1.5); media.currentTime = p ? p.start : 0; }
    };
    nextBtn.addEventListener('click', () => jump(1));
    stLists.forEach((l) => l.addEventListener('select', (e) => {
      const it = e.target.closest('.l10-st-item');
      if (it) media.currentTime = stations[Number(it.dataset.k)].start;
    }));
    // the centre play/skip buttons repeat the ones in the bar: keep them for the mouse
    // and touch, but out of the tab order and the screen-reader tree
    const center = $('.l10-center');
    center.setAttribute('aria-hidden', 'true');
    const untab = () => center.querySelectorAll('.l10-btn').forEach((b) => { if (b.getAttribute('tabindex') !== '-1') b.setAttribute('tabindex', '-1'); });
    untab();
    new MutationObserver(untab).observe(center, { subtree: true, attributes: true, attributeFilter: ['tabindex'] });
    // [ and ] move between stations, like "previous / next stop"
    root.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea, [role="menu"]') || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === ']' || e.key === 'n') { jump(1); e.preventDefault(); }
      if (e.key === '[' || e.key === 'p') { jump(-1); e.preventDefault(); }
    });

    const onRate = () => { svcName.textContent = SERVICES[media.playbackRate] || 'Custom'; $('.l10-service-rate').textContent = `${media.playbackRate}×`; };

    // ---- remembered settings ----
    const prefs = loadPrefs();
    let drawCaptions = () => {};
    let previewUntil = 0, previewTimer = 0, syncing = false;
    if (prefs.board && !prefs.boardSize) prefs.boardSize = prefs.board;
    if (prefs.boardPos === 'center') prefs.boardPos = 'left';   // older saved setting
    const LOOK = { boardSize: 'board', boardPos: 'boardPos', boardStyle: 'boardStyle', boardFlip: 'boardFlip', capSize: 'capsize', capColor: 'capcolor', capBg: 'capbg', capEdge: 'capedge', capShadow: 'capshadow' };
    const applyLook = () => {
      for (const [k, attr] of Object.entries(LOOK)) root.dataset[attr] = prefs[k] ?? DEFAULTS[k];
      root.querySelectorAll('.l10-menu-value[data-for]').forEach((el) => {
        const k = el.dataset.for;
        el.textContent = (PREFS[k].find(([v]) => v === prefs[k]) || [])[1] || '';
      });
      syncing = true;
      root.querySelectorAll('media-menu-radio-group[data-pref]').forEach((g) => { const v = prefs[g.dataset.pref] ?? DEFAULTS[g.dataset.pref]; if (g.value !== v) g.value = v; });
      syncing = false;
      boardMenu.setAttribute('align', prefs.boardPos === 'right' ? 'end' : prefs.boardPos === 'center' ? 'center' : 'start');
      drawCaptions();
    };
    const boardMenu = $('.l10-boardmenu');
    const setPref = (k, v) => {
      prefs[k] = v; savePrefs(prefs);
      if (k.startsWith('cap')) previewUntil = Date.now() + 2600;   // show a sample caption
      applyLook();
      if (k.startsWith('cap')) { clearTimeout(previewTimer); previewTimer = setTimeout(() => drawCaptions(), 2700); }
    };
    root.querySelectorAll('media-menu-radio-group[data-pref]').forEach((g) => {
      g.value = prefs[g.dataset.pref] ?? DEFAULTS[g.dataset.pref];
      g.addEventListener('value-change', (e) => {
        if (syncing || prefs[g.dataset.pref] === e.detail.value) return;
        setPref(g.dataset.pref, e.detail.value);
      });
    });
    // the small-player menu: Caption style opens a list of rows, each row its own list of choices
    // (drawn inside one page, since the player's menus go two levels deep)
    const csPage = $('.l10-cspage');
    const markCs = () => csPage.querySelectorAll('.l10-csopt').forEach((o) => {
      const on = (prefs[o.dataset.k] ?? DEFAULTS[o.dataset.k]) === o.dataset.v;
      o.toggleAttribute('data-checked', on);
      o.setAttribute('aria-label', `${o.querySelector('.l10-menu-text').textContent}${on ? ', selected' : ''}`);
    });
    const showCs = (k) => {
      csPage.dataset.show = k;
      csPage.querySelectorAll('.l10-csview').forEach((v) => { v.hidden = v.dataset.view !== k; });
      markCs();
      const first = csPage.querySelector(`.l10-csview[data-view="${k}"] ${k === 'list' ? '.l10-csrow' : '.l10-csopt[data-checked]'}`);
      requestAnimationFrame(() => first?.focus({ preventScroll: true }));
      csPage.scrollTop = 0;
      navSync();
    };
    csPage.addEventListener('select', (e) => {
      const t = e.target.closest('.l10-csrow, .l10-csback, .l10-csopt');
      if (!t) return;
      e.preventDefault();
      if (t.classList.contains('l10-csrow')) showCs(t.dataset.k);
      else if (t.classList.contains('l10-csback')) showCs('list');
      else { setPref(t.dataset.k, t.dataset.v); markCs(); }
    });

    // volume, mute, speed and captions carry over to the next video and the next visit
    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      if (Number.isFinite(prefs.volume)) media.volume = Math.min(1, Math.max(0, prefs.volume));
      media.muted = Boolean(prefs.muted);
      if (prefs.rate && SERVICES[prefs.rate]) { media.playbackRate = prefs.rate; media.defaultPlaybackRate = prefs.rate; }
      restoreCaptions();
    };
    const restoreCaptions = () => {
      const caps = [...(media.textTracks || [])].filter((x) => x.kind === 'captions' || x.kind === 'subtitles');
      const t = caps.find((x) => x.label === 'English') || caps[0];
      if (t && prefs.captions && t.mode !== 'showing') t.mode = 'showing';
    };
    media.addEventListener('loadedmetadata', restore);
    if (media.readyState >= 1) restore();
    media.addEventListener('volumechange', () => {
      if (!restored) return;
      prefs.volume = media.volume; prefs.muted = media.muted; savePrefs(prefs);
    });
    media.addEventListener('ratechange', () => {
      if (!restored) return;
      prefs.rate = media.playbackRate; savePrefs(prefs);
    });
    // remember captions on/off only when the viewer switches them (button or C key),
    // not when a stream adds its own tracks
    let ccTouched = 0;
    const touchCC = () => { ccTouched = Date.now(); };
    $('.l10-cc').addEventListener('click', touchCC);
    root.addEventListener('keydown', (e) => { if (e.key === 'c' || e.key === 'C') touchCC(); });
    media.textTracks?.addEventListener?.('change', () => {
      if (!restored || Date.now() - ccTouched > 1500) return;
      prefs.captions = [...media.textTracks].some((x) => (x.kind === 'captions' || x.kind === 'subtitles') && x.mode === 'showing');
      savePrefs(prefs);
    });

    // volume icon: muted / 1 wave (1–33) / 2 waves (34–65) / 3 waves (66–100)
    const muteBtn = $('.l10-mute');
    const volLevel = () => {
      const v = Math.round(media.volume * 100);
      muteBtn.dataset.level = media.muted || v === 0 ? '0' : v <= 33 ? '1' : v <= 65 ? '2' : '3';
    };
    media.addEventListener('volumechange', volLevel);
    volLevel();

    // dragging the train: hold the video still so no sound blips play while you scrub
    const slider = $('.l10-slider');
    let resumeAfterDrag = false;
    slider.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      resumeAfterDrag = !media.paused;
      if (resumeAfterDrag) media.pause();
      const done = () => {
        win.removeEventListener('pointerup', done, true);
        win.removeEventListener('pointercancel', done, true);
        if (resumeAfterDrag) { resumeAfterDrag = false; setTimeout(() => media.play().catch(() => {}), 0); }
      };
      const win = slider.ownerDocument.defaultView || window;   // the PiP window when popped out
      win.addEventListener('pointerup', done, true);
      win.addEventListener('pointercancel', done, true);
    });

    // the browser draws captions too; inside <mux-video> our page styles can't reach,
    // so hide that native copy there as well (our overlay draws them instead)
    const hideNativeCues = () => {
      const sr = media.shadowRoot;
      if (!sr || sr.querySelector('style[data-l10]')) return;
      const st = document.createElement('style');
      st.dataset.l10 = '';
      st.textContent = 'video::cue{color:transparent!important;background:transparent!important;text-shadow:none!important}';
      sr.appendChild(st);
    };
    hideNativeCues();
    if (media.localName.includes('-')) customElements.whenDefined(media.localName).then(hideNativeCues);
    media.addEventListener('loadedmetadata', hideNativeCues);

    // ---- captions overlay ----
    const capBox = $('.l10-captions');
    const capText = $('.l10-cap-text');
    const isCap = (t) => t.kind === 'captions' || t.kind === 'subtitles';
    drawCaptions = () => {
      const t = [...(media.textTracks || [])].find((x) => isCap(x) && x.mode === 'showing');
      const [o, c] = BRACKETS[prefs.capBrackets] || BRACKETS.square;
      const live = t ? [...(t.activeCues || [])]
        .map((cue) => (cue.text || '').replace(/<[^>]+>/g, '').replace(/\[([^\]]*)\]/g, (_, x) => `${o}${x.trim()}${c}`))
        .join('\n') : '';
      const text = Date.now() < previewUntil ? `${o ? `${o}music${c} ` : ''}Captions will look like this` : live;
      capText.textContent = text;
      capBox.toggleAttribute('data-empty', !text);
    };
    const hookCaptions = (t) => { if (isCap(t) && !t._l10) { t._l10 = true; t.addEventListener('cuechange', drawCaptions); } };
    [...(media.textTracks || [])].forEach(hookCaptions);
    media.textTracks?.addEventListener?.('addtrack', (e) => { hookCaptions(e.track); if (restored) restoreCaptions(); });
    // when a stream brings its own auto-generated captions and we also have a
    // hand-checked caption file, always show ours
    const preferOwn = () => {
      const caps = [...(media.textTracks || [])].filter(isCap);
      const own = caps.find((t) => t.label === 'English');
      if (!own || caps.length < 2) return;
      for (const t of caps) if (t !== own && t.mode === 'showing') { t.mode = 'disabled'; own.mode = 'showing'; }
    };
    media.textTracks?.addEventListener?.('change', () => { preferOwn(); drawCaptions(); });
    // quality: the button appears when the stream has several renditions (Mux HLS).
    // "Auto" lets the stream adapt to the connection; a picked height is remembered.
    const qBtn = $('.l10-quality');
    const qName = $('.l10-quality-name');
    const qGroups = [...root.querySelectorAll('.l10-qgroup')];
    const qGroup = qGroups[0];
    const heightOf = (el) => parseInt(el.querySelector('[data-part~="label"]')?.textContent, 10) || 0;
    const isAuto = (x) => /auto/i.test(x.querySelector('[data-part~="label"]')?.textContent || x.textContent);
    const qAll = () => [...qGroup.querySelectorAll('media-menu-radio-item')];
    const qItems = () => qAll().filter((x) => !isAuto(x));
    const qAuto = () => qAll().find(isAuto);
    // switch right away instead of waiting for the already-buffered video to run out
    const applyNow = () => setTimeout(() => {
      const e = media.engine;
      if (e && e.manualLevel >= 0 && e.currentLevel !== e.manualLevel) e.currentLevel = e.manualLevel;
    }, 30);
    const playingHeight = () => {
      const e = media.engine;
      const lv = e?.levels?.[e.currentLevel];
      return lv?.height || media.videoHeight || 0;
    };
    let qPicked = false;
    let autoPick = false;
    let qLabel = '';
    const syncQuality = () => {
      const items = qItems();
      qBtn.toggleAttribute('data-off', items.length < 2);
      const on = qAll().find((x) => x.getAttribute('aria-checked') === 'true');
      const auto = on && isAuto(on);
      const h = auto ? playingHeight() : on ? heightOf(on) : 0;
      qLabel = auto ? (h ? `Auto · ${h}p` : 'Auto') : h ? `${h}p` : '…';
      qName.textContent = auto ? 'Auto' : qLabel;
      qBtn.dataset.top = h >= 2160 ? '4K' : h >= 1440 ? '2K' : h >= 720 ? 'HD' : h ? 'SD' : '';
    };
    media.addEventListener('resize', syncQuality);           // Auto moved to another rendition
    media.addEventListener('timeupdate', () => { if (qName.textContent === 'Auto') syncQuality(); });
    // start on the saved height, or on Auto
    let qTries = 0;
    const qTimer = setInterval(() => {
      if (qPicked || ++qTries > 40) { clearInterval(qTimer); return; }
      const items = qItems();
      if (items.length < 2 || media.readyState < 1) return;
      let pick = qAuto();
      if (typeof prefs.quality === 'number') {
        const fits = items.filter((x) => heightOf(x) <= prefs.quality);
        pick = fits.length ? fits.reduce((a, b) => (heightOf(b) > heightOf(a) ? b : a)) : items[0];
      }
      qPicked = true;
      if (!pick || pick.getAttribute('aria-checked') === 'true') return;
      autoPick = true;
      pick.click();
      autoPick = false;
      applyNow();
    }, 400);
    for (const g of qGroups) {
      new MutationObserver(syncQuality).observe(g, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-checked'] });
      g.addEventListener('value-change', (e) => {
        applyNow();
        if (autoPick) return;                       // only remember what the viewer chose
        qPicked = true;
        const v = String(e.detail?.value);
        const on = qItems().find((x) => x.getAttribute('data-rendition') === v);
        if (!on && /auto|^-1$/i.test(v)) { prefs.quality = 'auto'; savePrefs(prefs); return; }
        const height = on ? heightOf(on) : parseInt(v, 10);
        if (height) { prefs.quality = height; savePrefs(prefs); }
      });
    }
    syncQuality();

    // the speed and quality lists are drawn upside down (fastest / sharpest on top),
    // so the up and down arrow keys are swapped to match what you see
    root.querySelectorAll('.l10-flip-list').forEach((menu) => menu.addEventListener('keydown', (e) => {
      if (e._l10 || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
      e.stopImmediatePropagation(); e.preventDefault();
      const ev = new KeyboardEvent('keydown', { key: e.key === 'ArrowUp' ? 'ArrowDown' : 'ArrowUp', bubbles: true, cancelable: true, composed: true });
      ev._l10 = true;
      e.target.dispatchEvent(ev);
    }, true));

    // volume keys while the controls are hidden: show only the volume bubble
    const controlsEl = $('.l10-controls');
    const quiet = (on) => root.toggleAttribute('data-quiet', on);
    const onQuietKey = (e) => {
      if (!root.isConnected) return;
      const doc = root.ownerDocument;
      if (e.currentTarget !== doc) return;
      const a = doc.activeElement;
      if (a && a !== doc.body && !root.contains(a)) return;
      const vol = e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'm' || e.key === 'M';
      if (vol && e.target.closest?.('media-time-slider, media-volume-slider, [role="menu"]')) return;
      if (vol && (!controlsEl.hasAttribute('data-visible') || root.hasAttribute('data-quiet'))) quiet(true);
      else if (!vol) quiet(false);
    };
    document.addEventListener('keydown', onQuietKey, { capture: true, signal: off.signal });
    root.addEventListener('pointermove', () => quiet(false));
    root.addEventListener('pointerdown', () => quiet(false));
    new MutationObserver(() => { if (!controlsEl.hasAttribute('data-visible')) quiet(false); })
      .observe(controlsEl, { attributes: true, attributeFilter: ['data-visible'] });

    // the caption style button only shows when the video has captions
    const capBtn = $('.l10-capset');
    const syncCapBtn = () => { capBtn.toggleAttribute('data-off', ![...(media.textTracks || [])].some(isCap)); };
    media.textTracks?.addEventListener?.('addtrack', syncCapBtn);
    media.textTracks?.addEventListener?.('removetrack', syncCapBtn);
    syncCapBtn();
    media.addEventListener('loadedmetadata', syncCapBtn);
    media.addEventListener('loadeddata', syncCapBtn);
    media.textTracks?.addEventListener?.('change', syncCapBtn);
    // streamed tracks can arrive late, so keep checking for a little while
    let capChecks = 0;
    const capTimer = setInterval(() => { syncCapBtn(); if (++capChecks > 20 || !capBtn.hasAttribute('data-off')) clearInterval(capTimer); }, 750);
    // ---- picture-in-picture ----
    // Chrome / Edge: the whole player pops out (Document Picture-in-Picture),
    // so captions, the line and the board ride along. Elsewhere the browser's
    // own PiP is used, and its native captions are switched on while it is open.
    const dpip = window.documentPictureInPicture;
    const pipBtn = $('.l10-pip');
    const host = this;
    let pipWin = null;
    const openDocPip = async () => {
      const r = root.getBoundingClientRect();
      const w = await dpip.requestWindow({ width: Math.max(400, Math.round(r.width * 0.55)), height: Math.max(225, Math.round(r.width * 0.55 * r.height / r.width)) });
      pipWin = w;
      const d = w.document;
      const base = d.createElement('base');
      base.href = document.baseURI;          // relative URLs in copied styles (fonts) keep working
      d.head.append(base);
      for (const n of document.querySelectorAll('link[rel="stylesheet"], style')) {
        if (n.localName === 'link') { const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = n.href; d.head.append(l); }
        else d.head.append(n.cloneNode(true));
      }
      d.title = document.title;
      d.body.className = 'l10-pip-body';
      const ph = document.createElement('div');
      ph.className = 'l10-pip-placeholder';
      ph.style.aspectRatio = `${r.width} / ${r.height}`;
      ph.innerHTML = '<span>Riding in picture-in-picture</span><button type="button">Bring it back</button>';
      ph.querySelector('button').addEventListener('click', () => w.close());
      const playing = !media.paused;
      host.before(ph);
      d.body.append(host);
      root.toggleAttribute('data-docpip', true);
      if (playing && media.paused) media.play().catch(() => {});
      root.focus({ preventScroll: true });   // keys work in the little window straight away
      d.addEventListener('keydown', onQuietKey, true);
      w.addEventListener('pagehide', () => {
        const still = !media.paused;
        root.toggleAttribute('data-docpip', false);
        pipWin = null;
        if (ph.isConnected) { ph.replaceWith(host); if (still && media.paused) media.play().catch(() => {}); }
        else { media.pause(); host.remove(); }   // the page moved on (another line was picked)
      }, { once: true });
    };
    let dpipFailed = false;
    const nativePip = () => {
      const doc = media.ownerDocument;
      if (doc.pictureInPictureElement) return doc.exitPictureInPicture().catch(() => {});
      return (media.requestPictureInPicture || media.nativeEl?.requestPictureInPicture?.bind(media.nativeEl))?.call(media).catch(() => {});
    };
    const togglePip = () => {
      if (pipWin) { pipWin.close(); return; }
      if (dpipFailed || media.ownerDocument.pictureInPictureElement) { nativePip(); return; }
      openDocPip().catch(() => { dpipFailed = true; nativePip(); });   // e.g. an embedded browser without PiP windows
    };
    if (dpip) {
      pipBtn.addEventListener('click', (e) => { e.stopImmediatePropagation(); e.preventDefault(); togglePip(); }, true);
      root.addEventListener('keydown', (e) => {
        if ((e.key === 'i' || e.key === 'I') && !e.altKey && !e.ctrlKey && !e.metaKey && !e.target.closest('input, textarea')) { e.preventDefault(); togglePip(); }
      });
    }
    // native PiP (Safari, Firefox, fallback): let the browser draw the captions in the little window
    const nativeCues = (on) => {
      const st = media.shadowRoot?.querySelector('style[data-l10]');
      if (st?.sheet) st.sheet.disabled = on;
      root.toggleAttribute('data-native-cues', on);
    };
    media.addEventListener('enterpictureinpicture', () => nativeCues(true));
    media.addEventListener('leavepictureinpicture', () => nativeCues(false));
    media.addEventListener('webkitpresentationmodechanged', () => nativeCues(media.webkitPresentationMode === 'picture-in-picture'));

    // ---- phones: fullscreen turns the video sideways, like a video app ----
    // (Android Chrome and most phone browsers; iPhones use their own video player, which rotates with the phone)
    const touchPhone = () => matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 600;
    let locked = false;
    const onFs = () => {
      const doc = root.ownerDocument;
      const el = doc.fullscreenElement || doc.webkitFullscreenElement;
      const mine = Boolean(el && (el === root || el.contains(root) || root.contains(el)));
      const so = screen.orientation;
      if (mine && touchPhone() && so?.lock) {
        const w = media.videoWidth || 16, h = media.videoHeight || 9;
        so.lock(w >= h ? 'landscape' : 'portrait').then(() => { locked = true; }).catch(() => {});
      } else if (!mine && locked) {
        locked = false;
        try { so?.unlock?.(); } catch { /* not supported */ }
      }
    };
    document.addEventListener('fullscreenchange', onFs, whileAlive);
    document.addEventListener('webkitfullscreenchange', onFs, whileAlive);

    // right-hand tooltips line their right edge up with their button, whatever its width
    root.querySelectorAll('media-tooltip.l10-tip-end').forEach((t) => {
      const trig = root.querySelector(`#${CSS.escape(t.getAttribute('trigger'))}`);
      if (!trig) return;
      const fit = () => t.style.setProperty('--l10-anchor-w', `${trig.offsetWidth}px`);
      trig.addEventListener('pointerenter', fit);
      trig.addEventListener('focus', fit);
    });

    // ---- small players: the Settings menu ----
    const moreBtn = $('.l10-more');
    const mVal = (k, v) => { const el = root.querySelector(`[data-m="${k}"]`); if (el) el.textContent = v; };
    const ccBtn = $('.l10-cc');
    const showingCap = () => [...(media.textTracks || [])].some((x) => isCap(x) && x.mode === 'showing');
    // arrow keys should skip rows this screen size doesn't show
    const navSync = () => root.querySelectorAll('.l10-moremenu media-menu-item').forEach((it) => {
      const off = it.hasAttribute('data-off') || Boolean(it.closest('.l10-csview[hidden]'))
        || (getComputedStyle(it).display === 'none' && !it.closest('media-menu-content[hidden]'));
      it.toggleAttribute('data-hidden', off);
    });
    const syncMore = () => {
      // never taller than the room above the button (short screens, big zoom)
      const room = Math.floor(moreBtn.getBoundingClientRect().top - 12);
      $('.l10-moremenu').style.setProperty('--l10-more-room', `${Math.max(160, room)}px`);
      const nextEl = root.querySelector('.l10-nextstop');
      mVal('l10-m-st', stations[current]?.name || '');
      mVal('l10-m-next', (nextEl.getAttribute('aria-label') || '').replace(/^Next stop: /, ''));
      $('.l10-m-next').toggleAttribute('data-disabled', nextEl.hasAttribute('data-last'));
      mVal('l10-m-svc', `${SERVICES[media.playbackRate] || 'Custom'} · ${media.playbackRate}×`);
      mVal('l10-m-q', qLabel);
      $('.l10-m-q').toggleAttribute('data-off', qBtn.hasAttribute('data-off'));
      mVal('l10-m-cc', showingCap() ? 'On' : 'Off');
      $('.l10-m-cc').toggleAttribute('data-off', capBtn.hasAttribute('data-off'));
      $('.l10-m-cs').toggleAttribute('data-off', capBtn.hasAttribute('data-off'));
      const inPip = Boolean(pipWin || media.ownerDocument.pictureInPictureElement);
      $('.l10-m-pip-text').textContent = inPip ? 'Exit picture-in-picture' : 'Picture-in-picture';
      $('.l10-m-pip').toggleAttribute('data-off', !dpip && !document.pictureInPictureEnabled);
      navSync();
    };
    // "there's more below": a themed cue at the bottom of the menu while a page can scroll further
    const moreMenuEl = $('.l10-moremenu');
    const cue = () => {
      // the pages sit side by side in the menu; the one showing is the one that may scroll
      const page = [...moreMenuEl.children].find((c) => c.localName === 'media-menu-content' && !c.hidden && !c.hasAttribute('data-child-open'));
      const below = page ? page.scrollTop + page.clientHeight < page.scrollHeight - 2 : false;
      moreMenuEl.toggleAttribute('data-more-below', below);
    };
    moreMenuEl.addEventListener('scroll', cue, true);
    moreMenuEl.addEventListener('click', () => { setTimeout(cue, 60); setTimeout(cue, 360); });
    moreMenuEl.addEventListener('keydown', () => setTimeout(cue, 60));
    new MutationObserver(() => requestAnimationFrame(cue)).observe(moreMenuEl, { attributes: true, subtree: true, attributeFilter: ['data-open', 'hidden', 'data-show'] });
    // S opens Settings (when the player is small enough to have it)
    root.addEventListener('keydown', (e) => {
      if ((e.key !== 's' && e.key !== 'S') || e.altKey || e.ctrlKey || e.metaKey || e.target.closest('input, textarea, [role="menu"]')) return;
      if (!moreBtn.offsetParent) return;
      e.preventDefault();
      syncMore(); showCs('list');
      moreBtn.focus();
      moreBtn.click();
    });
    moreBtn.addEventListener('pointerdown', syncMore);
    moreBtn.addEventListener('keydown', syncMore);
    moreBtn.addEventListener('click', syncMore);
    moreBtn.addEventListener('click', () => showCs('list'));
    $('.l10-m-cs').addEventListener('click', () => showCs('list'), true);
    media.addEventListener('ratechange', syncMore);
    media.textTracks?.addEventListener?.('change', syncMore);
    media.addEventListener('timeupdate', () => { if (moreBtn.getAttribute('aria-expanded') === 'true') syncMore(); });
    // picking a station, a speed or a quality is the end of the errand: close the whole menu
    const closeMore = () => setTimeout(() => { if (moreBtn.getAttribute('aria-expanded') === 'true') moreBtn.click(); }, 120);
    $('.l10-moremenu').addEventListener('select', (e) => { if (e.target.closest('.l10-st-item')) closeMore(); });
    $('.l10-moremenu').querySelectorAll('media-playback-rate-radio-group, media-quality-radio-group')
      .forEach((g) => g.addEventListener('value-change', closeMore));
    $('.l10-m-next').addEventListener('select', () => jump(1));
    $('.l10-m-cc').addEventListener('select', () => { ccBtn.click(); setTimeout(syncMore, 50); });
    $('.l10-m-pip').addEventListener('select', () => { if (dpip) togglePip(); else nativePip(); });

    off.signal.addEventListener('abort', () => { clearInterval(qTimer); clearInterval(capTimer); clearTimeout(previewTimer); });

    applyLook();
    // the captions sit just above the panel while the controls are out
    const panel = $('.l10-panel');
    new ResizeObserver(() => root.style.setProperty('--l10-panel-h', `${panel.offsetHeight}px`)).observe(panel);

    media.addEventListener('timeupdate', update);
    media.addEventListener('seeked', update);
    media.addEventListener('ended', update);

    // ---- the terminus card ----
    const term = $('.l10-endcard');
    const termNext = $('.l10-term-next');
    // dark or light lettering, whichever reads on the next line's colour
    const inkFor = (hex) => {
      const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim());
      if (!m) return '#14110a';
      const [r, g, b] = [0, 2, 4].map((k) => parseInt(m[1].slice(k, k + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.32 ? '#14110a' : '#ffffff';
    };
    this.#offerNext = () => {
      const name = this.getAttribute('next-title');
      termNext.hidden = !name;
      if (!name) return;
      const color = this.getAttribute('next-line') || '';
      $('.l10-term-next-name').textContent = name;
      $('.l10-term-badge').textContent = this.getAttribute('next-number') || '';
      termNext.style.setProperty('--l10-next', color || 'var(--l10-line)');
      termNext.style.setProperty('--l10-next-ink', color ? inkFor(color) : 'var(--l10-line-ink)');
      termNext.setAttribute('aria-label', `Change here for ${name}`);
    };
    this.#offerNext();
    termNext.addEventListener('click', () => this.dispatchEvent(new CustomEvent('line10:next', { bubbles: true })));
    $('.l10-term-again').addEventListener('click', () => {
      if (!media.ended) media.currentTime = 0;
      media.play().catch(() => {});
      root.focus({ preventScroll: true });
    });
    // Replaying a stream: the browser jumps back to the start, but while that seek is still
    // loading it can decide the video is "still ended" and pause it again. If a replay gets
    // paused like that before it ever starts playing, start it again once the seek lands.
    let wasEnded = false;
    let replayAt = 0;
    media.addEventListener('ended', () => { wasEnded = true; });
    media.addEventListener('play', () => { if (wasEnded) replayAt = performance.now(); });
    media.addEventListener('playing', () => { wasEnded = false; replayAt = 0; });
    media.addEventListener('pause', () => {
      if (!replayAt || performance.now() - replayAt > 4000) return;
      replayAt = 0;
      const again = () => media.play().catch(() => {});
      if (media.seeking) media.addEventListener('seeked', again, { once: true }); else again();
    });
    if (this.hasAttribute('autoplay')) {
      const go = () => media.play().catch(() => {});
      if (media.readyState >= 2) go(); else media.addEventListener('canplay', go, { once: true });
    }
    media.addEventListener('ratechange', onRate);
    media.addEventListener('loadedmetadata', readStations);
    media.addEventListener('durationchange', readStations);
    const hook = (track) => { if (track.kind === 'chapters') { if (track.mode === 'disabled') track.mode = 'hidden'; track.addEventListener('cuechange', readStations); } };
    [...(media.textTracks || [])].forEach(hook);
    media.textTracks?.addEventListener?.('addtrack', (e) => { hook(e.track); setTimeout(readStations, 200); });
    root.querySelectorAll('track[kind="chapters"]').forEach((tr) => tr.addEventListener('load', readStations));
    setTimeout(readStations, 400);
    update();
  }
}
if (!customElements.get('line10-player')) customElements.define('line10-player', Line10Player);
