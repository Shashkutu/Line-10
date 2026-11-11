// Line 10 pictograms: 24px grid, 2px rounded strokes, drawn like transit signage.
// Every icon is decorative; accessible names come from the Video.js components.
const svg = (body, cls = '') =>
  `<svg class="l10-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  play: (c) => svg('<path class="l10-solid" d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.2-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z"/>', c),
  pause: (c) => svg('<rect class="l10-solid" x="6.5" y="5" width="4" height="14" rx="1.2"/><rect class="l10-solid" x="13.5" y="5" width="4" height="14" rx="1.2"/>', c),
  restart: (c) => svg('<path d="M5 12a7 7 0 1 0 2.05-4.95"/><path d="M5 4.5V8h3.5"/>', c),
  // skip icons: a circular arrow with the seconds drawn in its centre
  back: (c, n = 5) => svg(`<path d="M12 4.6a7.4 7.4 0 1 1-6.9 4.8"/><path d="M12 2l-3 2.6 3 2.6"/><text class="l10-solid l10-skipnum" x="12" y="15.3" text-anchor="middle">${n}</text>`, c),
  fwd: (c, n = 5) => svg(`<path d="M12 4.6a7.4 7.4 0 1 0 6.9 4.8"/><path d="M12 2l3 2.6-3 2.6"/><text class="l10-solid l10-skipnum" x="12" y="15.3" text-anchor="middle">${n}</text>`, c),
  nextStop: (c) => svg('<path d="M3.5 12h10"/><path d="M10 8l4 4-4 4"/><circle cx="18.5" cy="12" r="2.6"/>', c),
  // speaker + 1, 2 or 3 waves (volume 1–33, 34–65, 66–100); crossed out when muted
  vol1: (c) => svg('<path class="l10-solid" d="M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z"/><path d="M14.2 9.6a3.4 3.4 0 0 1 0 4.8"/>', c),
  vol2: (c) => svg('<path class="l10-solid" d="M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z"/><path d="M14.2 9.6a3.4 3.4 0 0 1 0 4.8M16.8 7.2a6.8 6.8 0 0 1 0 9.6"/>', c),
  vol3: (c) => svg('<path class="l10-solid" d="M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z"/><path d="M14.2 9.6a3.4 3.4 0 0 1 0 4.8M16.8 7.2a6.8 6.8 0 0 1 0 9.6M19.4 4.8a10.2 10.2 0 0 1 0 14.4"/>', c),
  volOff: (c) => svg('<path class="l10-solid" d="M3 9.6v4.8a1 1 0 0 0 1 1h2.4l3.8 3.2a.8.8 0 0 0 1.3-.6V6a.8.8 0 0 0-1.3-.6L6.4 8.6H4a1 1 0 0 0-1 1z"/><path d="M15 9.5l5 5M20 9.5l-5 5"/>', c),
  ccOff: (c) => svg('<rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M10.2 10.3a2.3 2.3 0 1 0 0 3.4M16.7 10.3a2.3 2.3 0 1 0 0 3.4"/>', c),
  ccOn: (c) => svg('<rect class="l10-solid" x="3" y="5.5" width="18" height="13" rx="3"/><path class="l10-knock" d="M10.2 10.3a2.3 2.3 0 1 0 0 3.4M16.7 10.3a2.3 2.3 0 1 0 0 3.4"/>', c),
  pipIn: (c) => svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><rect class="l10-solid" x="12" y="11.5" width="6.5" height="5" rx="1"/>', c),
  pipOut: (c) => svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M8 13l4-4M8 9.5V13h3.5"/>', c),
  fsIn: (c) => svg('<path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15"/>', c),
  fsOut: (c) => svg('<path d="M9 4v3.5A1.5 1.5 0 0 1 7.5 9H4M20 9h-3.5A1.5 1.5 0 0 1 15 7.5V4M15 20v-3.5a1.5 1.5 0 0 1 1.5-1.5H20M4 15h3.5A1.5 1.5 0 0 1 9 16.5V20"/>', c),
  service: (c) => svg('<path d="M3 12h18"/><circle class="l10-solid" cx="7" cy="12" r="2.4"/><circle cx="17" cy="12" r="2.4"/>', c),
  stations: (c) => svg('<path d="M7 4v16"/><circle class="l10-solid" cx="7" cy="6" r="2.2"/><circle cx="7" cy="12" r="2.2" fill="currentColor"/><circle cx="7" cy="18" r="2.2"/><path d="M12 6h8M12 12h8M12 18h5"/>', c),
  captionStyle: (c) => svg('<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><text class="l10-solid l10-aa" x="12" y="15.4" text-anchor="middle">Aa</text>', c),
  quality: (c) => svg('<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><text class="l10-solid l10-aa" x="12" y="15.4" text-anchor="middle">HD</text>', c),
  settings: (c) => svg('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>', c),
  gear: (c) => svg('<path d="M18.80 10.34 L21.20 10.61 L21.20 13.39 L18.80 13.66 L17.98 15.63 L19.48 17.52 L17.52 19.48 L15.63 17.98 L13.66 18.80 L13.39 21.20 L10.61 21.20 L10.34 18.80 L8.37 17.98 L6.48 19.48 L4.52 17.52 L6.02 15.63 L5.20 13.66 L2.80 13.39 L2.80 10.61 L5.20 10.34 L6.02 8.37 L4.52 6.48 L6.48 4.52 L8.37 6.02 L10.34 5.20 L10.61 2.80 L13.39 2.80 L13.66 5.20 L15.63 6.02 L17.52 4.52 L19.48 6.48 L17.98 8.37Z"/><circle cx="12" cy="12" r="3"/>', c),
  chevron: (c) => svg('<path d="M9.5 6l6 6-6 6"/>', c),
  back2: (c) => svg('<path d="M14.5 6l-6 6 6 6"/>', c),
  check: (c) => svg('<path d="M5 12.5l4.2 4.2L19 7"/>', c),
};
