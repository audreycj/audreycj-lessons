// IT 110 pictures (chat 41). Kept apart from illus.js so ITC 120 pages never change when IT 110 grows.
// Sketch style (Rough.js) = real-life scenes. Clean style (plain SVG strings) = how the computer does it.
// IT 110 palette: one main blue (muted denim) + one warm accent (soft tangerine), both at the same mid
// strength, with light washes of each. Same rules as global.css body.theme-it110.
import { Sketch } from './sketch.js';

export const B = {
  ink: '#18233a', soft: '#3b4659', paper: '#fbfaf6', card: '#ffffff', line: '#c9d2df',
  blue: '#275a9c', blueMid: '#8fb0dc', blueWash: '#dfe9f6', blueInk: '#1c4479',
  orange: '#e27b3e', orangeWash: '#fbe2d2', orangeInk: '#a64a1c',
  amber: '#eeb04a', butter: '#f7dd9f', green: '#3f8a5a', greenWash: '#dcefe2',
  red: '#b23a33', redWash: '#f8dcd8', grey: '#d9dee6', greyInk: '#6b7688', skin: '#e9c3a0', hair: '#2a2420',
};
export const r1 = (svg) => svg.replace(/(\d+\.\d)\d+/g, '$1');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- small helpers for the clean pictures ---------- */
export const T = (x, y, str, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.mono ? '&quot;IBM Plex Mono&quot;, monospace' : 'Nunito, system-ui, sans-serif'}" font-size="${o.size ?? 14}" font-weight="${o.w ?? 800}" fill="${o.c ?? B.ink}" text-anchor="${o.a ?? 'middle'}">${esc(str)}</text>`;
export const R = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 8}" fill="${o.f ?? B.card}" stroke="${o.s ?? B.ink}" stroke-width="${o.sw ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
export const ARROW = (x1, y1, x2, y2, c = B.ink, sw = 2.4) => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 9;
  const p = (s) => `${(x2 - L * Math.cos(a + s)).toFixed(1)} ${(y2 - L * Math.sin(a + s)).toFixed(1)}`;
  return `<path d="M${x1} ${y1} L${x2} ${y2} M${p(-0.5)} L${x2} ${y2} L${p(0.5)}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
export const svgWrap = (w, h, label, body) => `<svg class="clean" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;

/* ---------- course page header doodles (muted, like dsDoodles) ---------- */
export function pcDoodles() {
  const s = new Sketch(365, 210, 410);
  const ink = '#5f6b80', o = { stroke: ink, sw: 1.5, rough: 1.2, bow: 1 };
  const MU = { blue: '#a9c1e4', orange: '#ebb08e', amber: '#ecd08f', wash: '#e6edf7' };
  const hat = (c) => ({ ...o, fill: c, fillStyle: 'hachure', gap: 3.6, fw: 1.4 });
  // laptop
  s.rect(22, 28, 92, 60, { ...o, fill: MU.wash });
  s.rect(30, 36, 76, 44, hat(MU.blue));
  s.path('M10 92 L126 92 L118 102 L18 102 Z', o);
  // phone
  s.round(150, 22, 38, 70, 7, { ...o, fill: MU.wash });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) s.rect(157 + j * 14, 34 + i * 15, 10, 10, i === 1 && j === 0 ? hat(MU.orange) : o);
  // gear (system software)
  s.circle(245, 52, 44, { ...o, fill: MU.wash });
  s.circle(245, 52, 16, hat(MU.amber));
  for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; s.line(245 + 22 * Math.cos(a), 52 + 22 * Math.sin(a), 245 + 30 * Math.cos(a), 52 + 30 * Math.sin(a), { ...o, sw: 3 }); }
  // cloud + wifi
  s.path('M300 78 Q290 60 308 56 Q312 36 334 44 Q350 36 354 56 Q366 62 356 78 Z', { ...o, fill: MU.wash });
  // printer
  s.rect(26, 140, 80, 36, { ...o, fill: MU.wash });
  s.rect(40, 122, 52, 20, o);
  s.rect(40, 170, 52, 26, hat(MU.amber));
  // window with an app
  s.rect(140, 122, 108, 72, o);
  s.line(140, 136, 248, 136, o);
  s.rect(150, 144, 40, 40, hat(MU.orange));
  s.line(198, 150, 238, 150, o); s.line(198, 162, 238, 162, o); s.line(198, 174, 226, 174, o);
  // chip
  s.rect(286, 128, 52, 52, { ...o, fill: MU.wash });
  s.rect(298, 140, 28, 28, hat(MU.blue));
  for (let k = 0; k < 3; k++) { const d = 138 + k * 16; s.line(276, d, 286, d, o); s.line(338, d, 348, d, o); s.line(296 + k * 16 - 6, 118, 296 + k * 16 - 6, 128, o); s.line(296 + k * 16 - 6, 180, 296 + k * 16 - 6, 190, o); }
  return r1(s.svg('Doodles: a laptop, a phone with apps, a gear, a cloud, a printer, an app window, and a computer chip.', 'head-art'));
}

/* ---------- System software lesson ---------- */

/** Sketch: the software layers, side by side with the school canteen. */
export function softwareLayers() {
  const s = new Sketch(360, 372, 411);
  s.text(92, 22, 'In a computer', { font: 'body', size: 14, weight: 800, color: B.blue });
  s.text(272, 22, 'In the school canteen', { font: 'body', size: 14, weight: 800, color: B.orangeInk });
  const rows = [
    { y: 34, fill: B.butter, L: ['You, the user'], Ls: 'tap, type, talk', Rt: ['Student'], Rs: 'orders food' },
    { y: 118, fill: B.orangeWash, L: ['Application', 'software'], Ls: 'Canva, games, chat', Rt: ['Food stalls'], Rs: 'what you came for' },
    { y: 202, fill: B.blueWash, L: ['System software'], Ls: 'OS + utilities', Rt: ['Manager and', 'cleaners'], Rs: 'keep it running' },
    { y: 286, fill: '#ebe6dc', L: ['Hardware'], Ls: 'CPU, RAM, storage', Rt: ['Kitchen and', 'stoves'], Rs: 'where work is done' },
  ];
  const H = 78;
  rows.forEach((r) => {
    s.round(6, r.y, 348, H, 10, { fill: r.fill, sw: 1.8 });
    s.line(182, r.y + 10, 182, r.y + H - 10, { sw: 1.4, dash: '5 5', single: true, stroke: B.greyInk });
    const put = (x, lines, sub) => {
      const top = r.y + (lines.length === 1 ? 34 : 26);
      lines.forEach((l, i) => s.text(x, top + i * 17, l, { font: 'body', size: 14, weight: 800, anchor: 'start' }));
      s.text(x, top + lines.length * 17 + 1, sub, { font: 'body', size: 12, weight: 600, anchor: 'start', color: B.soft });
    };
    put(62, r.L, r.Ls);
    put(238, r.Rt, r.Rs);
  });
  // doodles, left column (x = 34) and right column (x = 212)
  const person = (x, cy, shirt) => { s.round(x - 11, cy - 2, 22, 24, 8, { fill: shirt, sw: 1.6 }); s.circle(x, cy - 12, 17, { fill: B.skin, sw: 1.6 }); s.path(`M${x - 8} ${cy - 17} Q${x} ${cy - 25} ${x + 8} ${cy - 17}`, { sw: 3, stroke: B.hair, single: true }); };
  let cy = 34 + 39;
  person(30, cy, B.blueMid); s.round(40, cy - 4, 9, 15, 2, { fill: B.ink, sw: 1.2 });
  person(208, cy, B.orange); s.line(190, cy + 6, 228, cy + 6, { sw: 3 }); s.ellipse(220, cy + 1, 14, 7, { fill: B.card, sw: 1.4 });
  cy = 118 + 39;
  [[-16, -16, B.orange], [2, -16, B.blue], [-16, 2, B.amber], [2, 2, B.green]].forEach(([dx, dy, f]) => s.round(34 + dx, cy + dy, 14, 14, 3, { fill: f, sw: 1.4 }));
  s.rect(188, cy - 18, 42, 10, { fill: B.orange, sw: 1.5 }); s.rect(188, cy - 8, 42, 24, { fill: B.card, sw: 1.5 }); s.ellipse(200, cy + 2, 12, 6, { fill: B.butter, sw: 1.2 }); s.ellipse(218, cy + 2, 12, 6, { fill: B.amber, sw: 1.2 });
  cy = 202 + 39;
  s.circle(34, cy, 30, { fill: B.card, sw: 1.6 }); s.circle(34, cy, 11, { fill: B.blueMid, sw: 1.4 });
  for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; s.line(34 + 15 * Math.cos(a), cy + 15 * Math.sin(a), 34 + 21 * Math.cos(a), cy + 21 * Math.sin(a), { sw: 3.2, single: true }); }
  person(204, cy, B.blue); s.rect(214, cy - 4, 12, 16, { fill: B.butter, sw: 1.3 });
  cy = 286 + 39;
  s.rect(21, cy - 13, 26, 26, { fill: B.grey, sw: 1.6 }); s.rect(28, cy - 6, 12, 12, { fill: B.blueMid, sw: 1.2 });
  for (let k = 0; k < 3; k++) { const d = cy - 7 + k * 7; s.line(14, d, 21, d, { sw: 1.4, single: true }); s.line(47, d, 54, d, { sw: 1.4, single: true }); }
  s.rect(188, cy - 2, 42, 20, { fill: B.grey, sw: 1.5 }); s.circle(199, cy + 8, 9, { fill: B.card, sw: 1.2 }); s.circle(219, cy + 8, 9, { fill: B.card, sw: 1.2 }); s.rect(190, cy - 18, 20, 15, { fill: B.blueMid, sw: 1.4 });
  return r1(s.svg('Four layers, top to bottom. In a computer: you, the user (tap, type, talk); application software (Canva, games, chat); system software (the OS and utility programs); hardware (CPU, RAM, storage). In the school canteen: the student who orders food; the food stalls, which are what you came for; the manager and the cleaners, who keep it running; the kitchen and stoves, where the work is done.'));
}

/** Clean: print spooling. step 0..3 */
export function spoolPic(step) {
  const queue = [['Report', 'Poster', 'Quiz'], ['Poster', 'Quiz'], ['Quiz'], []][step];
  const printing = [null, 'Report', 'Poster', 'Quiz'][step];
  let b = '';
  // computer
  b += R(10, 30, 96, 66, { r: 6, f: B.blueWash, s: B.ink }) + `<path d="M40 96 L36 110 M76 96 L80 110 M28 112 L88 112" stroke="${B.ink}" stroke-width="2.4" stroke-linecap="round"/>`;
  b += T(58, 58, step === 0 ? 'Print x3' : 'Still free:', { size: 13 }) + T(58, 78, step === 0 ? 'sent!' : 'you type on', { size: 12, w: 600, c: B.soft });
  b += T(58, 134, 'Your computer', { size: 12.5, w: 700, c: B.soft });
  // queue
  b += R(122, 20, 110, 130, { r: 8, f: B.card, s: B.blue, sw: 2, dash: '6 5' }) + T(177, 40, 'Print queue', { size: 13, c: B.blueInk }) + T(177, 56, '(on storage)', { size: 11.5, w: 600, c: B.soft });
  queue.forEach((q, i) => { b += R(136, 66 + i * 26, 82, 22, { r: 4, f: B.butter, s: B.ink, sw: 1.5 }) + T(177, 81 + i * 26, `${i + 1}. ${q}`, { size: 12.5 }); });
  if (!queue.length) b += T(177, 100, 'empty', { size: 13, w: 700, c: B.greyInk });
  b += T(177, 168, 'first in, first out', { size: 12, w: 700, c: B.soft });
  b += ARROW(108, 62, 118, 62, B.blue, 2.6) + ARROW(236, 80, 252, 80, B.blue, 2.6);
  // printer
  b += R(258, 36, 92, 30, { r: 4, f: B.grey }) + R(256, 64, 96, 40, { r: 6, f: B.grey }) + R(272, 100, 64, 40, { r: 2, f: printing ? B.card : B.grey, s: B.ink, sw: 1.6 });
  if (printing) b += T(304, 124, printing, { size: 12.5, c: B.orangeInk });
  b += `<circle cx="338" cy="80" r="5" fill="${printing ? B.green : B.greyInk}"/>`;
  b += T(304, 162, printing ? 'printing...' : 'waiting', { size: 12.5, w: 700, c: B.soft });
  const labels = [
    'You print three files. They go into the print queue on the storage drive right away, so your computer is free again.',
    'The printer takes the first file, Report. You keep typing while it prints.',
    'Report is done. The printer takes the next one, Poster.',
    'Poster is done. Quiz, the last one, is printing. The queue is empty.',
  ];
  return svgWrap(360, 180, labels[step], b);
}

/* ---------- Application software lesson ---------- */

/** Sketch: installed app vs cloud app. */
export function installedCloud() {
  const s = new Sketch(350, 250, 413);
  s.text(84, 22, 'Installed', { font: 'body', size: 15, weight: 800, color: B.blue });
  s.text(262, 22, 'Cloud-based', { font: 'body', size: 15, weight: 800, color: B.orangeInk });
  // laptop with app inside
  s.rect(24, 52, 120, 76, { fill: B.blueWash, sw: 1.8 });
  s.path('M10 132 L158 132 L148 146 L20 146 Z', { fill: B.grey, sw: 1.8 });
  s.round(58, 66, 52, 46, 6, { fill: B.blue, sw: 1.6 });
  s.text(84, 96, 'App', { font: 'body', size: 14, weight: 800, color: '#fff' });
  s.text(84, 172, 'The program is stored', { font: 'body', size: 12.5, weight: 700, color: B.soft });
  s.text(84, 189, 'and runs on your device.', { font: 'body', size: 12.5, weight: 700, color: B.soft });
  s.text(84, 214, 'Works offline', { font: 'body', size: 12.5, weight: 800, color: B.green });
  // cloud with app, phone and laptop below
  s.path('M206 82 Q192 58 218 52 Q224 28 252 38 Q272 26 286 46 Q312 44 312 66 Q326 78 306 88 Z', { fill: B.orangeWash, sw: 1.8 });
  s.round(240, 50, 44, 30, 6, { fill: B.orange, sw: 1.5 });
  s.text(262, 70, 'App', { font: 'body', size: 13, weight: 800, color: '#fff' });
  s.rect(200, 112, 62, 40, { fill: B.card, sw: 1.6 }); s.line(200, 122, 262, 122, { sw: 1.3, single: true });
  s.round(286, 104, 28, 50, 5, { fill: B.card, sw: 1.6 });
  s.line(232, 108, 246, 90, { sw: 1.5, dash: '4 4', single: true }); s.line(300, 102, 286, 90, { sw: 1.5, dash: '4 4', single: true });
  s.text(262, 172, 'It runs on a server; you', { font: 'body', size: 12.5, weight: 700, color: B.soft });
  s.text(262, 189, 'open it in a browser or app.', { font: 'body', size: 12.5, weight: 700, color: B.soft });
  s.text(262, 214, 'Needs internet', { font: 'body', size: 12.5, weight: 800, color: B.orangeInk });
  s.line(175, 40, 175, 230, { sw: 1.4, dash: '5 5', single: true, stroke: B.greyInk });
  return r1(s.svg('Installed: the app is stored and runs on your own laptop, and it works offline. Cloud-based: the app runs on a server in the cloud; you open it from a laptop browser or a phone, and it needs internet.'));
}

/** Clean: a database table with a field, a record, and the primary key marked. */
export function dbTable() {
  const cols = [['Student ID', 92], ['Last name', 82], ['First name', 82], ['Course', 66]];
  const rows = [['2026-0101', 'Abad', 'Ana', 'BSIT'], ['2026-0102', 'Bautista', 'Ben', 'BSIT'], ['2026-0103', 'Cruz', 'Cara', 'BSCS'], ['2026-0104', 'Dela Cruz', 'Dan', 'BSIT']];
  const x0 = 14, y0 = 52, rh = 30;
  let b = '', x = x0;
  const xs = cols.map(([, w]) => { const v = x; x += w; return v; });
  const W = x - x0;
  // field highlight (Last name column) and record highlight (row 2)
  b += `<rect x="${xs[1]}" y="${y0}" width="${cols[1][1]}" height="${rh * 5}" fill="${B.blueWash}"/>`;
  b += `<rect x="${x0}" y="${y0 + rh * 2}" width="${W}" height="${rh}" fill="${B.orangeWash}"/>`;
  b += `<rect x="${x0}" y="${y0}" width="${W}" height="${rh}" fill="${B.grey}"/>`;
  cols.forEach(([n, w], i) => { b += T(xs[i] + w / 2, y0 + 20, n, { size: 12 }); });
  rows.forEach((r, j) => r.forEach((v, i) => { b += T(xs[i] + cols[i][1] / 2, y0 + rh * (j + 1) + 20, v, { size: 12, w: i === 0 ? 700 : 600, mono: i === 0 }); }));
  for (let j = 0; j <= 5; j++) b += `<line x1="${x0}" y1="${y0 + j * rh}" x2="${x0 + W}" y2="${y0 + j * rh}" stroke="${B.ink}" stroke-width="${j === 0 || j === 5 ? 2 : 1}"/>`;
  [...xs, x0 + W].forEach((v, i) => { b += `<line x1="${v}" y1="${y0}" x2="${v}" y2="${y0 + 5 * rh}" stroke="${B.ink}" stroke-width="${i === 0 || i === 4 ? 2 : 1}"/>`; });
  b += `<rect x="${xs[1]}" y="${y0}" width="${cols[1][1]}" height="${rh * 5}" fill="none" stroke="${B.blue}" stroke-width="3"/>`;
  b += `<rect x="${x0}" y="${y0 + rh * 2}" width="${W}" height="${rh}" fill="none" stroke="${B.orange}" stroke-width="3"/>`;
  b += T(xs[1] + cols[1][1] / 2, y0 - 10, 'Field (a column)', { size: 13, c: B.blueInk });
  b += T(x0 + 2, 16, 'Primary key', { size: 13, c: B.green, a: 'start' });
  b += ARROW(x0 + 40, 22, x0 + 40, y0 - 3, B.green, 2);
  b += T(x0 + W / 2, y0 + rh * 5 + 26, 'Orange row = a record (everything about Ben)', { size: 13, c: B.orangeInk });
  return svgWrap(350, 240, 'A Students table with four fields: Student ID, Last name, First name, and Course, and four records. The Last name column is marked as a field. The row for Ben Bautista is marked as a record. The Student ID column is the primary key.', b);
}
