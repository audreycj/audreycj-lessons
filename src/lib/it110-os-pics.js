// IT 110 System software pictures, round 2 (chat 41, her feedback: more visual breaks, more detailed and fun).
// Clean SVG built from small drawing helpers. Brand COLORS only (no logos are drawn: logos are the companies' artwork).
import { Sketch } from './sketch.js';
import rough from 'roughjs';

/** Hand-drawn version of a clean picture (her note, chat 41: use the ITC 120 sketch style where it helps).
 *  Redraws rect/circle/ellipse/line/path shapes with Rough.js (same seed every build); text, tiny shapes (< 10 units),
 *  fill-only shapes, and dashed lines stay crisp so labels and small details read clearly. */
export function roughen(svg, seed = 31) {
  const g = rough.generator();
  let n = 0;
  const num = (el, k) => { const m = el.match(new RegExp(` ${k}="([-\\d.]+)"`)); return m ? parseFloat(m[1]) : 0; };
  const str = (el, k) => { const m = el.match(new RegExp(` ${k}="([^"]*)"`)); return m ? m[1] : undefined; };
  const draw = (el, make) => {
    const stroke = str(el, 'stroke'), fill = str(el, 'fill');
    if (!stroke || stroke === 'none' || / stroke-dasharray=/.test(el)) return el;
    const o = { seed: seed * 100 + (++n), roughness: 0.9, bowing: 0.7, stroke, strokeWidth: num(el, 'stroke-width') || 2,
      fill: fill && fill !== 'none' ? fill : undefined, fillStyle: 'solid', preserveVertices: true };
    const d = make(o);
    if (!d) return el;
    return g.toPaths(d).map((q) => `<path d="${q.d}" stroke="${q.stroke}" stroke-width="${q.strokeWidth}" fill="${q.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  };
  svg = svg.replace(/<rect [^>]*\/>/g, (el) => draw(el, (o) => {
    const x = num(el, 'x'), y = num(el, 'y'), w = num(el, 'width'), h = num(el, 'height'), r = Math.min(num(el, 'rx'), w / 2, h / 2);
    if (w < 10 || h < 10) return null;
    if (r < 3) return g.rectangle(x, y, w, h, o);
    return g.path(`M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`, o);
  }));
  svg = svg.replace(/<circle [^>]*\/>/g, (el) => draw(el, (o) => (num(el, 'r') < 5 ? null : g.circle(num(el, 'cx'), num(el, 'cy'), num(el, 'r') * 2, o))));
  svg = svg.replace(/<ellipse [^>]*\/>/g, (el) => draw(el, (o) => g.ellipse(num(el, 'cx'), num(el, 'cy'), num(el, 'rx') * 2, num(el, 'ry') * 2, o)));
  svg = svg.replace(/<line [^>]*\/>/g, (el) => draw(el, (o) => (Math.hypot(num(el, 'x2') - num(el, 'x1'), num(el, 'y2') - num(el, 'y1')) < 10 ? null : g.line(num(el, 'x1'), num(el, 'y1'), num(el, 'x2'), num(el, 'y2'), { ...o, disableMultiStroke: true }))));
  svg = svg.replace(/<path d="([^"]+)" [^>]*\/>/g, (el, d) => draw(el, (o) => g.path(d, o)));
  svg = svg.replace('class="clean"', 'class="clean is-sketch"');
  return r1(svg);
}
import { B, T, R, ARROW, svgWrap, r1 } from './it110-illus.js';

/* ---------- drawing helpers ---------- */
const L = (x1, y1, x2, y2, c = B.ink, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
const C = (cx, cy, r, f = B.card, s = B.ink, w = 2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${s}" stroke-width="${w}"/>`;
const P = (d, f = 'none', s = B.ink, w = 2) => `<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
/** Laptop: screen box at (x, y, w, h) with `inner` drawn on top, keyboard base under it. */
const laptop = (x, y, w, h, fill, inner = '') =>
  R(x, y, w, h, { r: 5, f: B.ink, sw: 2 }) + R(x + 4, y + 4, w - 8, h - 8, { r: 2, f: fill, s: 'none', sw: 0 }) + inner
  + P(`M${x - 8} ${y + h + 2} L${x + w + 8} ${y + h + 2} L${x + w + 2} ${y + h + 10} L${x - 2} ${y + h + 10} Z`, B.grey);
/** Phone: body at (x, y, w, h), screen inset. */
const phone = (x, y, w, h, fill, inner = '') => R(x, y, w, h, { r: 7, f: B.ink, sw: 2 }) + R(x + 3, y + 7, w - 6, h - 14, { r: 2, f: fill, s: 'none', sw: 0 }) + inner;
/** Folder icon. */
const folder = (x, y, w = 34, f = B.butter) => P(`M${x} ${y + 5} V${y} H${x + w * 0.4} L${x + w * 0.5} ${y + 5} Z`, f, B.ink, 1.6) + R(x, y + 5, w, w * 0.62, { r: 2, f, sw: 1.6 });
/** Small app tile with a letter. */
const tile = (x, y, s, f, letter = '', c = '#fff') => R(x, y, s, s, { r: s * 0.24, f, sw: 1.4 }) + (letter ? T(x + s / 2, y + s * 0.68, letter, { size: s * 0.5, c }) : '');
/** A tiny person: head + shirt. */
const person = (x, y, shirt) => `<path d="M${x - 11} ${y + 30} Q${x - 11} ${y + 12} ${x} ${y + 12} Q${x + 11} ${y + 12} ${x + 11} ${y + 30} Z" fill="${shirt}" stroke="${B.ink}" stroke-width="1.6"/>` + C(x, y + 4, 8, B.skin, B.ink, 1.6) + P(`M${x - 7} ${y + 1} Q${x} ${y - 7} ${x + 7} ${y + 1}`, 'none', B.hair, 3);
const GOLD = '#c99a2e', PCB = '#2f7d55';

/* ---------- Part 2: the six OS jobs (small pictures, 240 x 130) ---------- */
export function fnBoot() {
  let b = C(30, 64, 20, B.orangeWash, B.orange, 2.6) + P('M23 57 A10 10 0 1 0 37 57 M30 51 V63', 'none', B.orange, 2.6);
  b += ARROW(54, 64, 70, 64, B.soft, 2);
  b += laptop(78, 34, 66, 46, '#1d2840', [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = (k * Math.PI) / 4; return `<circle cx="${111 + 9 * Math.cos(a)}" cy="${57 + 9 * Math.sin(a)}" r="${1.4 + k * 0.25}" fill="#c9d6ea"/>`; }).join(''));
  b += ARROW(156, 64, 168, 64, B.soft, 2);
  b += laptop(174, 34, 60, 46, '#6f97d0', R(178, 38, 52, 38, { r: 1, f: '#8fb0dc', s: 'none', sw: 0 }) + T(204, 58, '7:30', { size: 13, c: '#fff' }) + R(194, 64, 20, 6, { r: 3, f: '#ffffff', s: 'none', sw: 0 }));
  b += T(30, 112, 'press', { size: 12, w: 700, c: B.soft }) + T(111, 112, 'loading the OS', { size: 12, w: 700, c: B.soft }) + T(204, 112, 'ready', { size: 12, w: 700, c: B.soft });
  return svgWrap(246, 124, 'Press the power button, the screen shows a loading circle while the OS loads, then the lock screen shows the time.', b);
}
export function fnFiles() {
  let b = R(10, 12, 70, 26, { r: 5, f: B.blueWash, sw: 1.6 }) + T(45, 30, 'This PC', { size: 12 });
  b += L(24, 38, 24, 102, B.soft, 1.6) + L(24, 58, 38, 58, B.soft, 1.6) + L(24, 98, 38, 98, B.soft, 1.6);
  b += folder(40, 46, 26) + T(72, 62, 'Documents', { size: 11.5, a: 'start' });
  b += folder(40, 86, 26) + T(72, 102, 'Pictures', { size: 11.5, a: 'start' });
  b += L(136, 58, 150, 58, B.soft, 1.6) + L(150, 34, 150, 82, B.soft, 1.6) + L(150, 34, 160, 34, B.soft, 1.6) + L(150, 82, 160, 82, B.soft, 1.6);
  b += folder(162, 24, 22, B.amber) + T(190, 38, 'IT 110', { size: 11.5, a: 'start' });
  b += R(162, 68, 18, 24, { r: 2, f: B.card, sw: 1.4 }) + L(166, 76, 176, 76, B.blue, 1.4) + L(166, 81, 176, 81, B.blue, 1.4) + L(166, 86, 173, 86, B.blue, 1.4);
  b += T(186, 84, 'report.docx', { size: 11, a: 'start', w: 700 });
  return svgWrap(258, 116, 'A folder tree: This PC holds Documents and Pictures; Documents holds an IT 110 folder and a file called report.docx.', b);
}
export function fnDevices() {
  let b = '';
  const spots = [[40, 26, 'Keyboard'], [200, 26, 'Printer'], [40, 98, 'Mouse'], [200, 98, 'Wi-Fi']];
  spots.forEach(([x, y]) => { b += L(120, 62, x, y, B.blueMid, 2.4); });
  spots.forEach(([x, y]) => { const mx = 120 + (x - 120) * 0.42, my = 62 + (y - 62) * 0.42; b += R(mx - 17, my - 8, 34, 16, { r: 8, f: B.greenWash, s: B.green, sw: 1.3 }) + T(mx, my + 4, 'driver', { size: 9.5, c: B.green }); });
  b += C(120, 62, 22, B.blue, B.ink, 2) + T(120, 67, 'OS', { size: 14, c: '#fff' });
  // keyboard
  b += R(14, 14, 52, 22, { r: 3, f: B.grey, sw: 1.6 }) + [0, 1, 2, 3, 4].map((i) => R(18 + i * 9.5, 18, 7, 6, { r: 1, f: B.card, sw: 0.8 })).join('') + R(24, 27, 32, 5, { r: 1, f: B.card, sw: 0.8 });
  // printer
  b += printer3(178, 12, 0.36, false);
  // mouse
  b += `<ellipse cx="40" cy="100" rx="11" ry="15" fill="${B.grey}" stroke="${B.ink}" stroke-width="1.6"/>` + L(40, 85, 40, 95, B.ink, 1.3);
  // wifi
  b += P('M184 98 Q200 84 216 98', 'none', B.ink, 2.2) + P('M189 104 Q200 94 211 104', 'none', B.ink, 2.2) + C(200, 110, 2.6, B.ink, B.ink, 1);
  b += T(40, 52, 'keyboard', { size: 10.5, w: 700, c: B.soft }) + T(200, 52, 'printer', { size: 10.5, w: 700, c: B.soft }) + T(64, 122, 'mouse', { size: 10.5, w: 700, c: B.soft }) + T(200, 124, 'Wi-Fi', { size: 10.5, w: 700, c: B.soft });
  return svgWrap(240, 130, 'The OS in the middle connects to a keyboard, a printer, a mouse, and Wi-Fi, each through its own driver.', b);
}
export function fnSecurity() {
  let b = phone(16, 10, 60, 108, '#5a7fb8', T(46, 40, '7:30', { size: 14, c: '#fff' }) + C(46, 82, 14, 'none', '#fff', 1.6)
    + P('M40 82 Q40 74 46 74 Q52 74 52 82 M43 88 Q44 80 46 80 Q49 80 49 88', 'none', '#fff', 1.4));
  b += R(100, 48, 40, 34, { r: 5, f: B.amber, sw: 2 }) + P('M108 48 V38 Q108 26 120 26 Q132 26 132 38 V48', 'none', B.ink, 3) + C(120, 62, 4, B.ink, B.ink, 1) + L(120, 64, 120, 72, B.ink, 2.4);
  b += T(120, 104, '••••••', { size: 16, c: B.soft });
  b += person(176, 22, B.blue) + person(210, 22, B.orange);
  b += T(193, 70, 'Ana', { size: 11, c: B.blueInk }) + T(193, 84, 'or Ben?', { size: 11, c: B.orangeInk });
  b += T(193, 108, 'user accounts', { size: 11, w: 700, c: B.soft });
  return svgWrap(240, 124, 'Security: a phone lock screen with a fingerprint reader, a padlock and a password, and two user accounts, Ana and Ben.', b);
}




/* ---------- Part 3: faster processing ---------- */
export function multithreadPic() {
  let b = R(8, 6, 334, 120, { r: 8, f: B.card, sw: 2 }) + R(8, 6, 334, 22, { r: 8, f: '#185ABD', sw: 2 }) + T(175, 22, 'Word: report.docx', { size: 12, c: '#fff' });
  b += T(22, 50, 'I like computr class.', { size: 15, a: 'start', w: 600 }) + `<rect x="189" y="40" width="2" height="16" fill="${B.ink}"/>`;
  b += P('M84 56 q3 -4 6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0', 'none', B.red, 1.6);
  b += R(22, 72, 148, 44, { r: 6, f: B.blueWash, s: B.blue, sw: 1.6 }) + T(96, 90, 'Thread 1', { size: 12, c: B.blueInk }) + T(96, 106, 'shows your typing', { size: 11, w: 600 });
  b += R(180, 72, 150, 44, { r: 6, f: B.redWash, s: B.red, sw: 1.6 }) + T(255, 90, 'Thread 2', { size: 12, c: B.red }) + T(255, 106, 'checks spelling', { size: 11, w: 600 });
  return svgWrap(350, 132, 'A Word window. You type "I like computr class." Thread 1 shows your typing while thread 2, at the same time, checks spelling and draws a red line under "computr".', b);
}
export function multiprocPic() {
  const core = (x, y, f, txt) => R(x, y, 46, 46, { r: 5, f: '#c9d1dd', sw: 1.6 }) + R(x + 5, y + 5, 36, 36, { r: 3, f, sw: 1.2 }) + T(x + 23, y + 27, txt, { size: 8.5, c: '#fff' });
  let b = T(86, 18, 'Multiprocessing', { size: 13, c: B.blueInk }) + T(86, 34, 'different tasks', { size: 11, w: 600, c: B.soft });
  b += core(34, 46, '#1DB954', 'music') + core(90, 46, '#0866FF', 'chat') + core(34, 100, B.orange, 'game') + core(90, 100, B.amber, 'scan');
  b += L(175, 12, 175, 156, B.greyInk, 1.4, ' stroke-dasharray="5 5"');
  b += T(264, 18, 'Parallel processing', { size: 13, c: B.orangeInk }) + T(264, 34, 'one big task, split', { size: 11, w: 600, c: B.soft });
  // film strip
  b += R(196, 44, 136, 26, { r: 2, f: B.ink, sw: 1.4 });
  for (let i = 0; i < 4; i++) { b += R(200 + i * 33, 49, 29, 16, { r: 1, f: ['#8fb0dc', '#f7dd9f', '#fbe2d2', '#dcefe2'][i], s: 'none', sw: 0 }) + T(214 + i * 33, 61, String(i + 1), { size: 10 }); b += ARROW(214 + i * 33, 74, 214 + i * 33, 92, B.soft, 1.6); }
  for (let i = 0; i < 4; i++) b += R(196 + i * 34, 96, 30, 30, { r: 4, f: '#c9d1dd', sw: 1.4 }) + R(201 + i * 34, 101, 20, 20, { r: 2, f: B.orange, sw: 1 }) + T(211 + i * 34, 115, String(i + 1), { size: 10, c: '#fff' });
  b += T(264, 146, '4 cores export 1 video', { size: 11, w: 700, c: B.soft });
  return svgWrap(350, 160, 'Multiprocessing: four cores run four different tasks: music, chat, a game, and a virus scan. Parallel processing: one video is split into four parts, and four cores export one part each at the same time.', b);
}
export function memPic() {
  const segs = [['OS', 2, '#9aa6b8', B.ink], ['Chrome', 3, '#DB4437', '#fff'], ['Word', 1.5, '#185ABD', '#fff'], ['Spotify', 1.5, '#1DB954', '#fff']];
  let b = T(10, 20, 'RAM: 8 GB, full', { size: 12.5, a: 'start' });
  let x = 10;
  segs.forEach(([n, g, f, c]) => { const w = g * 40; b += R(x, 28, w, 32, { r: 0, f, sw: 1.4 }) + T(x + w / 2, 49, n, { size: 11, c }); x += w; });
  b += R(10, 28, 320, 32, { r: 3, f: 'none', sw: 2.2 });
  b += T(10, 104, 'Storage (SSD)', { size: 12.5, a: 'start' });
  b += R(10, 112, 320, 32, { r: 3, f: '#e9ecf1', sw: 2 }) + R(14, 116, 96, 24, { r: 3, f: B.card, s: B.orange, sw: 2, dash: '5 3' }) + T(62, 132, 'Canva (2 GB)', { size: 11, c: B.orangeInk }) + T(220, 132, 'your files...', { size: 11, w: 600, c: B.greyInk });
  b += ARROW(150, 66, 90, 108, B.orange, 2.2) + T(158, 82, 'no room in RAM, so it', { size: 11, a: 'start', c: B.orangeInk }) + T(158, 96, 'goes to virtual memory', { size: 11, a: 'start', c: B.orangeInk });
  return svgWrap(340, 152, 'RAM of 8 GB is full: the OS, Chrome, Word, and Spotify each have their own part. Canva has no room, so the OS keeps it in virtual memory on the SSD.', b);
}
export function bufferPic() {
  let b = R(10, 6, 330, 110, { r: 8, f: '#1f2738' }) + P('M160 40 L160 76 L190 58 Z', '#fff', 'none', 0);
  b += R(24, 92, 302, 6, { r: 3, f: '#4a5570', s: 'none', sw: 0 }) + R(24, 92, 170, 6, { r: 3, f: '#9fb4d3', s: 'none', sw: 0 }) + R(24, 92, 96, 6, { r: 3, f: B.orange, s: 'none', sw: 0 }) + C(120, 95, 6, '#fff', 'none', 0);
  b += T(70, 140, 'watched', { size: 11.5, c: B.orangeInk }) + T(157, 140, 'buffered', { size: 11.5, c: B.blueInk }) + T(262, 140, 'not loaded yet', { size: 11.5, c: B.greyInk });
  b += L(70, 102, 70, 128, B.orange, 1.4) + L(157, 102, 157, 128, B.blue, 1.4) + L(262, 102, 262, 128, B.greyInk, 1.4);
  return svgWrap(350, 148, 'A video player progress bar: the part you watched, then the buffered part already loaded and waiting in memory, then the part not loaded yet.', b);
}

/** Virtual memory: desk (RAM) and floor (storage), books in each app's brand colors (sketch). */
export function deskFloor() {
  const s = new Sketch(356, 286, 412);
  const book = (x, y, w, h, f, name, tc, sym) => {
    s.rect(x, y, w, h, { fill: f, sw: 1.6 });
    s.line(x + 6, y + 3, x + 6, y + h - 3, { sw: 1.2, stroke: 'rgba(0,0,0,0.35)', single: true });
    sym(x + w / 2 + 3, y + h * 0.4);
    s.text(x + w / 2 + 3, y + h - 9, name, { font: 'body', size: 11, weight: 800, color: tc });
  };
  // symbols (generic, not logos)
  const globe = (cx, cy) => { s.circle(cx, cy, 20, { fill: '#fff', sw: 1.4 }); s.circle(cx, cy, 8, { fill: '#4285F4', sw: 1.2 }); };
  const page = (cx, cy) => { s.rect(cx - 8, cy - 10, 16, 20, { fill: '#fff', sw: 1.2 }); [-4, 0, 4].forEach((d) => s.line(cx - 5, cy + d, cx + 5, cy + d, { sw: 1.2, single: true, stroke: '#185ABD' })); };
  const note = (cx, cy) => { s.circle(cx - 4, cy + 6, 8, { fill: '#191414', sw: 1 }); s.line(cx, cy + 6, cx, cy - 9, { sw: 2, stroke: '#191414', single: true }); s.line(cx, cy - 9, cx + 7, cy - 5, { sw: 2, stroke: '#191414', single: true }); };
  const brush = (cx, cy) => { s.line(cx - 7, cy + 7, cx + 5, cy - 5, { sw: 3, stroke: '#fff', single: true }); s.circle(cx + 6, cy - 6, 6, { fill: '#fff', sw: 1 }); };
  const pad = (cx, cy) => { s.round(cx - 11, cy - 6, 22, 12, 5, { fill: '#fff', sw: 1.2 }); s.line(cx - 6, cy, cx - 2, cy, { sw: 1.6, single: true }); s.circle(cx + 5, cy, 3, { fill: B.red, sw: 0.8 }); };
  // desk
  s.rect(14, 106, 214, 14, { fill: '#c9a77c', sw: 1.8 });
  s.line(28, 120, 28, 214, { sw: 3 }); s.line(214, 120, 214, 214, { sw: 3 });
  s.text(121, 26, 'Desk = RAM', { font: 'body', size: 14, weight: 800, color: B.blue });
  // Chrome: red / yellow / green stripes
  s.rect(22, 38, 64, 68, { fill: '#DB4437', sw: 1.6 });
  s.rect(22, 61, 64, 22, { fill: '#F4B400', sw: 0.1, stroke: '#F4B400' }); s.rect(22, 83, 64, 23, { fill: '#0F9D58', sw: 0.1, stroke: '#0F9D58' });
  s.rect(22, 38, 64, 68, { sw: 1.6 });
  globe(57, 56); s.text(57, 98, 'Chrome', { font: 'body', size: 11, weight: 800, color: '#fff' });
  book(92, 38, 64, 68, '#185ABD', 'Word', '#fff', page);
  book(162, 38, 60, 68, '#1DB954', 'Spotify', '#191414', note);
  // floor
  s.line(6, 232, 350, 232, { sw: 2, stroke: B.greyInk });
  // Canva: teal to purple (two-tone)
  s.raw('<defs><linearGradient id="cvaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00C4CC"/><stop offset="0.55" stop-color="#4d6fe0"/><stop offset="1" stop-color="#7D2AE8"/></linearGradient></defs>');
  s.rect(232, 194, 92, 38, { fill: 'url(#cvaG)', sw: 1.6 });
  brush(254, 213); s.text(296, 218, 'Canva', { font: 'body', size: 12, weight: 800, color: '#fff' });
  s.rect(240, 158, 80, 36, { fill: '#2b2d6e', sw: 1.6 }); s.rect(240, 158, 80, 8, { fill: '#d9a63c', sw: 1.2 });
  pad(260, 180); s.text(298, 186, 'Game', { font: 'body', size: 12, weight: 800, color: '#f7dd9f' });
  s.text(280, 252, 'Floor = storage', { font: 'body', size: 13, weight: 800, color: B.orangeInk });
  s.text(280, 269, '(virtual memory)', { font: 'body', size: 12, weight: 700, color: B.orangeInk });
  // student
  s.circle(300, 84, 26, { fill: B.skin, sw: 1.6 });
  s.path('M288 76 Q300 62 312 76', { sw: 4, stroke: B.hair, single: true });
  s.round(284, 98, 32, 46, 10, { fill: B.blue, sw: 1.6 });
  s.text(121, 252, 'fast to reach, but small', { font: 'body', size: 12.5, weight: 700, color: B.soft });
  return r1(s.svg('A small study desk holds three open books in their apps\' colors: Chrome (red, yellow, green), Word (blue), and Spotify (green). The desk is RAM: fast to reach, but small. Two more books, Canva (teal and purple) and a game, sit on the floor beside the student. The floor is storage used as virtual memory: more room, but slower to reach.'));
}

/* ---------- Part 4: comparing operating systems ---------- */
export function cliGui() {
  let b = '';
  // CLI laptop
  let cli = '';
  [['C:\\Users\\ana>', ' dir', '#7ee08a'], ['  Documents', '', '#9fb4d3'], ['  Pictures', '', '#9fb4d3'], ['C:\\Users\\ana>', ' cd Pictures', '#7ee08a'], ['C:\\...\\Pictures>', '', '#7ee08a']]
    .forEach(([p, cmd, c], i) => { cli += `<text x="18" y="${38 + i * 15}" font-family="&quot;IBM Plex Mono&quot;, monospace" font-size="9.5" font-weight="500"><tspan fill="${c}">${p}</tspan><tspan fill="#ffffff">${cmd}</tspan></text>`; });
  cli += `<rect x="118" y="${38 + 4 * 15 - 9}" width="6" height="11" fill="#fff"/>`;
  b += laptop(10, 18, 154, 104, '#111827', cli);
  b += T(87, 152, 'CLI: you type commands', { size: 12.5 }) + T(87, 168, 'exact words, no pictures', { size: 11, w: 600, c: B.soft });
  // GUI laptop
  let gui = P('M190 90 Q230 50 270 74 Q300 92 336 58 L336 114 L190 114 Z', '#8fb0dc', 'none', 0);
  gui += R(214, 30, 116, 70, { r: 3, f: B.card, sw: 1.4 }) + R(214, 30, 116, 12, { r: 3, f: '#e6edf7', sw: 1.4 }) + T(242, 39, 'Pictures', { size: 8.5 });
  gui += [0, 1, 2].map((i) => R(222 + i * 36, 50, 28, 22, { r: 2, f: ['#f7dd9f', '#dcefe2', '#fbe2d2'][i], sw: 1 }) + P(`M${224 + i * 36} 70 l8 -8 l6 5 l6 -9 l6 12`, 'none', B.soft, 1)).join('');
  gui += [0, 1, 2].map((i) => T(236 + i * 36, 84, ['beach', 'class', 'pet'][i], { size: 7.5, w: 700 })).join('');
  gui += folder(194, 32, 14) + folder(194, 56, 14, B.orangeWash);
  gui += R(186, 108, 154, 10, { r: 0, f: '#f1f4f8', s: 'none', sw: 0 }) + [0, 1, 2, 3].map((i) => R(240 + i * 12, 109, 8, 8, { r: 2, f: [B.blue, B.amber, B.orange, B.green][i], s: 'none', sw: 0 })).join('');
  gui += P('M300 86 L300 102 L304 98 L307 105 L310 104 L307 97 L312 97 Z', '#fff', B.ink, 1.2);
  b += laptop(186, 18, 154, 104, B.blueWash, gui);
  b += T(263, 152, 'GUI: you point and tap', { size: 12.5 }) + T(263, 168, 'windows, icons, menus', { size: 11, w: 600, c: B.soft });
  return svgWrap(350, 176, 'Two laptops. Left: a command-line interface, a black screen where you type dir to list Documents and Pictures, then cd Pictures to open it. Right: a graphical user interface with a wallpaper, folder icons, a Pictures window showing photo thumbnails, a taskbar, and a mouse pointer.', b);
}

/** OS characteristics as small pictures: single vs multiuser, open source vs proprietary. */
export function osTraits() {
  let b = T(86, 18, 'Single-user', { size: 12.5, c: B.blueInk }) + laptop(46, 28, 80, 52, B.blueWash, '') + person(86, 40, B.orange);
  b += T(264, 18, 'Multiuser (server)', { size: 12.5, c: B.orangeInk });
  b += R(244, 28, 40, 66, { r: 3, f: '#2a3550' }) + [0, 1, 2, 3].map((i) => R(250, 34 + i * 15, 28, 10, { r: 1, f: '#3f4d6b', s: 'none', sw: 0 }) + C(273, 39 + i * 15, 1.8, B.green, 'none', 0)).join('');
  [[204, 34], [204, 80], [324, 34], [324, 80]].forEach(([x, y], i) => { b += L(x < 264 ? x + 12 : x - 12, y + 14, x < 264 ? 244 : 284, 60, B.blueMid, 1.6) + person(x, y, [B.blue, B.orange, B.green, B.amber][i]); });
  b += L(175, 10, 175, 220, B.greyInk, 1.4, ' stroke-dasharray="5 5"');
  b += T(86, 136, 'Proprietary', { size: 12.5, c: B.blueInk });
  b += R(56, 146, 60, 46, { r: 4, f: '#2a3550' }) + R(74, 160, 24, 20, { r: 3, f: B.amber, sw: 1.6 }) + P('M79 160 V154 Q79 147 86 147 Q93 147 93 154 V160', 'none', B.ink, 2.2);
  b += T(86, 210, 'code kept secret', { size: 11, w: 700, c: B.soft });
  b += T(264, 136, 'Open source', { size: 12.5, c: B.orangeInk });
  b += R(222, 146, 84, 46, { r: 4, f: '#111827' }) + T(232, 162, 'int main()', { size: 9, mono: true, a: 'start', c: '#7ee08a', w: 500 }) + T(232, 176, '  print(..)', { size: 9, mono: true, a: 'start', c: '#fff', w: 500 });
  b += person(326, 150, B.green) + T(264, 210, 'anyone can read it', { size: 11, w: 700, c: B.soft });
  return svgWrap(350, 222, 'Single-user: one person on one laptop. Multiuser: four people use one server at the same time. Proprietary: the code is locked away. Open source: anyone can read the code.', b);
}

/** Personal computers and servers with their OSs (brand-free drawings of the screens). */
export function pcServers() {
  let b = '';
  // Windows laptop: centered taskbar
  let w = R(14, 12, 104, 64, { r: 0, f: '#5b8fd6', s: 'none', sw: 0 }) + P('M14 60 Q50 30 80 46 Q100 56 118 34 L118 66 L14 66 Z', '#7fb0ea', 'none', 0) + R(14, 66, 104, 10, { r: 0, f: '#eef3fa', s: 'none', sw: 0 }) + [0, 1, 2, 3, 4].map((i) => R(44 + i * 9, 68, 6, 6, { r: 1.5, f: [B.blue, B.amber, B.orange, B.green, B.blueMid][i], s: 'none', sw: 0 })).join('');
  b += laptop(10, 8, 112, 72, '#5b8fd6', w) + T(66, 106, 'Windows', { size: 13 }) + T(66, 121, 'most PCs', { size: 10.5, w: 600, c: B.soft });
  // Mac: menu bar + dock
  let m = R(128, 12, 104, 64, { r: 0, f: '#e9a27f', s: 'none', sw: 0 }) + P('M128 76 Q160 40 196 58 Q214 66 232 44 L232 76 Z', '#c97d6a', 'none', 0) + R(128, 12, 104, 6, { r: 0, f: '#f6efe9', s: 'none', sw: 0 }) + R(152, 64, 56, 10, { r: 4, f: 'rgba(255,255,255,0.75)', s: 'none', sw: 0 }) + [0, 1, 2, 3, 4].map((i) => R(156 + i * 10, 66, 7, 6, { r: 1.5, f: [B.blue, B.green, B.orange, B.amber, B.red][i], s: 'none', sw: 0 })).join('');
  b += '<g transform="translate(18 0)">' + laptop(124, 8, 112, 72, '#e9a27f', m) + '</g>' + '<g transform="translate(18 0)">' + T(180, 106, 'macOS', { size: 13 }) + T(180, 121, 'Macs only', { size: 10.5, w: 600, c: B.soft }) + '</g>';
  // Chromebook: browser window
  let c = R(242, 12, 104, 64, { r: 0, f: '#f1f4f8', s: 'none', sw: 0 }) + R(246, 16, 96, 8, { r: 2, f: '#dfe5ee', s: 'none', sw: 0 }) + R(250, 28, 88, 8, { r: 4, f: B.card, s: B.line, sw: 1 }) + R(250, 40, 40, 28, { r: 2, f: B.blueWash, s: 'none', sw: 0 }) + [0, 1, 2].map((i) => R(296, 42 + i * 9, 40, 4, { r: 2, f: '#c9d2df', s: 'none', sw: 0 })).join('');
  b += '<g transform="translate(36 0)">' + laptop(238, 8, 112, 72, '#f1f4f8', c) + T(294, 106, 'ChromeOS', { size: 13 }) + T(294, 121, 'Chromebooks', { size: 10.5, w: 600, c: B.soft }) + '</g>';
  // Linux desktop monitor (bottom row shifted to the middle)
  b += '<g transform="translate(20 0)">';
  let lx = R(30, 146, 120, 72, { r: 0, f: '#2f3b33', s: 'none', sw: 0 }) + R(30, 146, 120, 8, { r: 0, f: '#1d241f', s: 'none', sw: 0 }) + R(46, 162, 88, 46, { r: 3, f: '#111827', s: '#556', sw: 1 }) + T(52, 178, '$ sudo apt', { size: 8.5, mono: true, a: 'start', c: '#7ee08a', w: 500 }) + T(52, 192, '  install vlc', { size: 8.5, mono: true, a: 'start', c: '#fff', w: 500 });
  b += R(24, 140, 132, 84, { r: 5, f: B.ink }) + lx + P('M80 224 L76 236 M100 224 L104 236 M66 238 L114 238', 'none', B.ink, 2.4);
  b += T(90, 258, 'Linux', { size: 13 }) + T(90, 273, 'free, open source', { size: 10.5, w: 600, c: B.soft });
  // server racks
  for (let r = 0; r < 2; r++) {
    const x = 196 + r * 72;
    b += R(x, 136, 60, 104, { r: 4, f: '#2a3550' });
    for (let i = 0; i < 6; i++) b += R(x + 6, 142 + i * 16, 48, 12, { r: 1, f: '#3f4d6b', s: 'none', sw: 0 }) + C(x + 46, 148 + i * 16, 2, i % 2 ? B.green : B.amber, 'none', 0) + L(x + 10, 148 + i * 16, x + 30, 148 + i * 16, '#8fa0bd', 1.2);
  }
  b += T(262, 258, 'Servers', { size: 13 }) + T(262, 273, 'Linux, Windows Server, UNIX', { size: 10.5, w: 600, c: B.soft }) + '</g>';
  return svgWrap(394, 282, 'Five computers with their operating systems: a Windows laptop with a taskbar in the middle; a Mac with a menu bar on top and a dock at the bottom; a Chromebook showing a browser; a Linux desktop with a terminal command; and server racks that run Linux, Windows Server, or UNIX.', b);
}

/** Devices other than computers that need an OS. */
export function otherDevices() {
  const cell = (x, y, label, os) => T(x, y + 104, label, { size: 12 }) + os.split('|').map((o, i) => T(x, y + 119 + i * 13, o, { size: 10.5, w: 700, c: B.blueInk })).join('');
  let b = '';
  // phone
  b += phone(42, 14, 40, 74, B.blueWash, [0, 1].map((i) => [0, 1].map((j) => tile(50 + j * 13, 26 + i * 13, 10, [B.orange, B.blue, B.green, B.amber][i * 2 + j])).join('')).join('')) + cell(62, 0, 'Phone', 'Android, iOS,|HarmonyOS');
  // watch
  b += R(168, 14, 20, 18, { r: 3, f: B.grey, sw: 1.4 }) + R(168, 70, 20, 18, { r: 3, f: B.grey, sw: 1.4 }) + R(158, 28, 40, 46, { r: 10, f: B.ink }) + T(178, 56, '7:30', { size: 11, c: '#fff' }) + cell(178, 0, 'Smartwatch', 'watchOS,|Wear OS');
  // TV
  b += R(244, 20, 92, 56, { r: 4, f: B.ink }) + R(248, 24, 84, 48, { r: 2, f: '#6f97d0', s: 'none', sw: 0 }) + [0, 1, 2].map((i) => R(254 + i * 26, 46, 22, 16, { r: 2, f: [B.orange, B.green, B.amber][i], s: 'none', sw: 0 })).join('') + L(274, 76, 268, 86, B.ink, 2.4) + L(306, 76, 312, 86, B.ink, 2.4) + cell(290, 0, 'Smart TV', 'Google TV, Tizen,|webOS');
  // second row, moved down a little
  b += '<g transform="translate(0 14)">';
  // console controller
  b += P('M30 160 Q24 182 36 186 Q46 188 54 176 L70 176 Q78 188 88 186 Q100 182 94 160 Q90 148 76 150 L48 150 Q34 148 30 160 Z', B.grey, B.ink, 1.8) + L(42, 166, 52, 166, B.ink, 2.4) + L(47, 161, 47, 171, B.ink, 2.4) + C(80, 162, 3.2, B.orange, B.ink, 1) + C(87, 169, 3.2, B.blue, B.ink, 1) + cell(62, 114, 'Game console', 'its own OS');
  // car dashboard
  b += P('M114 198 L114 166 Q116 150 136 148 L220 148 Q240 150 242 166 L242 198 Z', '#3b4659', B.ink, 1.8)
    + R(150, 153, 66, 40, { r: 3, f: '#eef1e6', sw: 1.6 })
    + P('M150 166 H216 M150 182 H216 M168 153 V193 M196 153 V193', 'none', '#ffffff', 3.2) + R(200, 156, 12, 8, { r: 1, f: '#cfe6c4', s: 'none', sw: 0 }) + R(153, 185, 12, 6, { r: 1, f: '#cfe6c4', s: 'none', sw: 0 })
    + P('M160 190 L168 182 L168 166 L196 166 L196 158', 'none', '#1a73e8', 3.4) + P('M155 193 L160 184 L165 193 L160 190 Z', '#1a73e8', '#fff', 1)
    + P('M196 160 C190 150 192 146 196 146 C200 146 202 150 196 160 Z', B.red, B.ink, 1) + `<circle cx="196" cy="149.5" r="1.4" fill="#fff"/>`
    + R(152, 155, 22, 7, { r: 2, f: '#1f5a38', s: 'none', sw: 0 }) + T(163, 160.6, '↱ 200 m', { size: 5, c: '#fff' })
    + C(130, 190, 13, 'none', '#c9d1dd', 3.2) + L(118, 190, 142, 190, '#c9d1dd', 2.4) + C(130, 190, 3.5, '#c9d1dd', 'none', 0)
    + cell(178, 114, 'Car dashboard', 'Android|Automotive');
  // ATM
  b += R(262, 140, 56, 60, { r: 4, f: B.blueMid }) + R(270, 148, 40, 22, { r: 2, f: '#1d2840', sw: 1.2 }) + R(274, 176, 24, 4, { r: 1, f: B.ink, s: 'none', sw: 0 }) + [0, 1, 2].map((i) => R(272 + i * 12, 184, 9, 8, { r: 1, f: B.card, sw: 0.8 })).join('') + cell(290, 114, 'ATM, router', 'embedded OS');
  b += '</g>';
  return svgWrap(356, 280, 'Six devices that need an operating system: a phone (Android, iOS, HarmonyOS), a smartwatch (watchOS, Wear OS), a smart TV (Google TV, Tizen, webOS), a game console (its own OS), a car dashboard (Android Automotive), and an ATM or router (an embedded OS).', b);
}

/* ---------- Part 5 and 6 ---------- */
export function utilityKit() {
  const tileBox = (x, y, name, draw) => R(x, y, 104, 74, { r: 10, f: B.card, s: B.line, sw: 1.6 }) + draw(x + 52, y + 30) + T(x + 52, y + 64, name, { size: 11.5 });
  const items = [
    ['File manager', (x, y) => folder(x - 16, y - 14, 32)],
    ['Search', (x, y) => C(x - 4, y - 4, 11, B.blueWash, B.ink, 2.4) + L(x + 4, y + 4, x + 14, y + 14, B.ink, 3.4)],
    ['Disk cleanup', (x, y) => L(x + 12, y - 16, x - 2, y + 4, '#8a5a2b', 3) + P(`M${x - 2} ${y + 2} L${x - 16} ${y + 10} L${x - 8} ${y + 18} L${x + 4} ${y + 8} Z`, B.amber, B.ink, 1.6)],
    ['Optimizer', (x, y) => [0, 1, 2, 3].map((i) => R(x - 24 + i * 12, y - 8, 10, 16, { r: 1, f: i < 2 ? B.blue : B.blueMid, sw: 1.2 })).join('') + ARROW(x - 24, y + 14, x + 22, y + 14, B.soft, 1.4)],
    ['Uninstaller', (x, y) => R(x - 11, y - 10, 22, 26, { r: 2, f: B.grey, sw: 1.6 }) + L(x - 15, y - 12, x + 15, y - 12, B.ink, 2.4) + R(x - 5, y - 17, 10, 5, { r: 1, f: B.grey, sw: 1.4 }) + L(x - 4, y - 4, x - 4, y + 11, B.ink, 1.4) + L(x + 4, y - 4, x + 4, y + 11, B.ink, 1.4)],
    ['Backup', (x, y) => P(`M${x - 18} ${y + 8} Q${x - 24} ${y - 6} ${x - 10} ${y - 8} Q${x - 6} ${y - 20} ${x + 6} ${y - 14} Q${x + 20} ${y - 14} ${x + 18} ${y} Q${x + 24} ${y + 8} ${x + 14} ${y + 10} Z`, B.blueWash, B.ink, 1.8) + ARROW(x, y + 6, x, y - 8, B.blue, 2)],
    ['Antivirus', (x, y) => P(`M${x} ${y - 18} L${x + 15} ${y - 12} V${y} Q${x + 15} ${y + 12} ${x} ${y + 18} Q${x - 15} ${y + 12} ${x - 15} ${y} V${y - 12} Z`, B.greenWash, B.ink, 2) + P(`M${x - 6} ${y} L${x - 1} ${y + 5} L${x + 7} ${y - 5}`, 'none', B.green, 2.6)],
    ['Compression', (x, y) => R(x - 12, y - 14, 24, 30, { r: 2, f: B.butter, sw: 1.6 }) + [0, 1, 2, 3].map((i) => R(x - 2, y - 12 + i * 6, 4, 4, { r: 0, f: i % 2 ? B.card : B.ink, s: 'none', sw: 0 })).join('') + T(x, y + 13, 'ZIP', { size: 7.5 })],
    ['Diagnostics', (x, y) => R(x - 22, y - 14, 44, 28, { r: 3, f: '#111827', sw: 1.6 }) + P(`M${x - 18} ${y} H${x - 8} L${x - 4} ${y - 9} L${x + 2} ${y + 9} L${x + 6} ${y} H${x + 18}`, 'none', '#7ee08a', 1.8)],
  ];
  let b = '';
  items.forEach(([n, d], i) => { b += tileBox(6 + (i % 3) * 116, 6 + Math.floor(i / 3) * 84, n, d); });
  return svgWrap(352, 260, 'Nine utility programs as icons: file manager (folder), search (magnifying glass), disk cleanup (broom), optimizer (blocks put in order), uninstaller (trash can), backup (cloud with an up arrow), antivirus (shield with a check), compression (ZIP file), and diagnostics (a heartbeat line on a screen).', b);
}

/* ---------- Round 3 (chat 41, her feedback): realistic devices, clearer boot, kernel, cores, future scenes ---------- */

/** Realistic open laptop seen from the front and a little above: screen with bezel + keyboard deck with keys and touchpad.
 *  o.power = true lights up the power key (top-right key); o.hot = orange screen frame. Returns { svg, bottom }. */
function laptop3(x, y, w, inner = '', fill = B.blueWash, o = {}) {
  const h = w * 0.6, y2 = y + h, dh = w * 0.2;
  let s = R(x, y, w, h, { r: 6, f: B.ink, s: o.hot ? B.orange : B.ink, sw: o.hot ? 3.2 : 2 }) + R(x + 5, y + 5, w - 10, h - 10, { r: 2, f: fill, s: 'none', sw: 0 }) + inner
    + `<circle cx="${x + w / 2}" cy="${y + 2.6}" r="1.2" fill="#8a94a6"/>`;
  s += P(`M${x} ${y2} L${x + w} ${y2} L${x + w + w * 0.1} ${y2 + dh} L${x - w * 0.1} ${y2 + dh} Z`, '#d9dee6', B.ink, 2);
  for (let r = 0; r < 3; r++) {
    const yr = y2 + dh * (0.1 + r * 0.19), inset = (w * 0.1 * (yr - y2)) / dh, xl = x - inset + w * 0.035, xr = x + w + inset - w * 0.035, kw = (xr - xl) / 11;
    for (let i = 0; i < 11; i++) {
      const pw = o.power && r === 0 && i === 10;
      s += `<rect x="${(xl + i * kw + 0.7).toFixed(1)}" y="${yr.toFixed(1)}" width="${(kw - 1.4).toFixed(1)}" height="${(dh * 0.14).toFixed(1)}" rx="1" fill="${pw ? B.orange : '#f4f6f9'}" stroke="${pw ? B.orangeInk : '#8a94a6'}" stroke-width="${pw ? 1.4 : 0.7}"/>`;
    }
  }
  s += `<rect x="${(x + w / 2 - w * 0.13).toFixed(1)}" y="${(y2 + dh * 0.68).toFixed(1)}" width="${(w * 0.26).toFixed(1)}" height="${(dh * 0.24).toFixed(1)}" rx="2" fill="#eceff4" stroke="#8a94a6" stroke-width="0.8"/>`;
  return s;
}
/** Realistic inkjet printer: paper in the back tray, a printed page coming out of the front, a small screen and buttons. s = scale. */
function printer3(x, y, s = 1, printed = true) {
  const k = (v) => +(v * s).toFixed(1);
  let b = P(`M${x + k(28)} ${y + k(18)} L${x + k(36)} ${y - k(16)} L${x + k(84)} ${y - k(16)} L${x + k(92)} ${y + k(18)} Z`, '#fff', B.ink, 1.6);
  b += L(x + k(44), y - k(8), x + k(78), y - k(8), '#c9d2df', 1.2) + L(x + k(42), y, x + k(80), y, '#c9d2df', 1.2);
  b += R(x, y + k(14), k(120), k(50), { r: 8, f: '#e3e7ee', sw: 2 }) + L(x + k(6), y + k(28), x + k(114), y + k(28), '#9aa6b8', 1.4);
  b += R(x + k(84), y + k(34), k(26), k(11), { r: 2, f: '#1d2840', sw: 1.2 });
  b += `<circle cx="${x + k(90)}" cy="${y + k(53)}" r="${k(2.6)}" fill="${B.green}"/><circle cx="${x + k(100)}" cy="${y + k(53)}" r="${k(2.6)}" fill="#9aa6b8"/>`;
  b += R(x + k(14), y + k(50), k(66), k(6), { r: 1, f: '#3b4659', s: 'none', sw: 0 });
  if (printed) b += R(x + k(20), y + k(54), k(54), k(22), { r: 1, f: '#fff', sw: 1.4 }) + L(x + k(26), y + k(62), x + k(66), y + k(62), B.blue, 1.2) + L(x + k(26), y + k(68), x + k(58), y + k(68), B.blue, 1.2);
  return b;
}
/** A hand with the index finger tapping at (fx, fy). */
/** A cartoon pointing hand: index finger up, other fingers curled, thumb tucked. Fingertip at (fx, fy); sc = size. */
const HAND = 'M-6 8 Q-6 0 0 0 Q6 0 6 8 L6 34 Q9 29 14 30 Q19 31 19 37 Q22 33 27 35 Q31 37 30 43 Q33 41 36 44 Q38 48 36 54 L34 64 Q31 76 18 78 L2 78 Q-10 77 -13 66 L-15 54 Q-22 46 -20 40 Q-18 35 -12 38 L-6 44 Z';
const pointHand = (fx, fy, sc = 1) => `<g transform="translate(${fx} ${fy}) scale(${sc})">` + P(HAND, B.skin, B.ink, 1.8 / sc)
  + P('M13 31 Q11.5 36 13 41 M26 35.5 Q24.5 40 26 45 M-3 6 Q0 3.5 3 6', 'none', '#b98a66', 1.3 / sc) + '</g>';
const tapHand = (fx, fy, sc = 0.8) => C(fx, fy, 9, 'none', B.orange, 1.6) + C(fx, fy, 15, 'none', B.orange, 1.1) + pointHand(fx, fy + 2, sc);
/** App icon with a simple symbol: chat, music, doc, game, photo. */
function appIcon(x, y, sz, kind, f) {
  let b = R(x, y, sz, sz, { r: sz * 0.24, f, sw: 1.5 });
  const cx = x + sz / 2, cy = y + sz / 2, u = sz / 30;
  if (kind === 'chat') b += P(`M${cx - 9 * u} ${cy - 6 * u} H${cx + 9 * u} V${cy + 5 * u} H${cx - 2 * u} L${cx - 7 * u} ${cy + 10 * u} V${cy + 5 * u} H${cx - 9 * u} Z`, '#fff', '#fff', 1);
  if (kind === 'music') b += C(cx - 3 * u, cy + 6 * u, 4 * u, '#fff', '#fff', 1) + L(cx + 1 * u, cy + 6 * u, cx + 1 * u, cy - 9 * u, '#fff', 2.4) + L(cx + 1 * u, cy - 9 * u, cx + 8 * u, cy - 5 * u, '#fff', 2.4);
  if (kind === 'doc') b += R(cx - 7 * u, cy - 10 * u, 14 * u, 20 * u, { r: 1, f: '#fff', s: 'none', sw: 0 }) + [0, 1, 2].map((i) => L(cx - 4 * u, cy - 5 * u + i * 5 * u, cx + 4 * u, cy - 5 * u + i * 5 * u, f, 1.4)).join('');
  if (kind === 'game') b += R(cx - 10 * u, cy - 5 * u, 20 * u, 11 * u, { r: 5 * u, f: '#fff', s: 'none', sw: 0 }) + L(cx - 6 * u, cy, cx - 2 * u, cy, f, 1.6) + `<circle cx="${cx + 5 * u}" cy="${cy}" r="${2 * u}" fill="${f}"/>`;
  return b;
}

/* Part 2: job cards */
export function fnInterface() {
  let b = laptop3(14, 16, 120, R(36, 28, 80, 46, { r: 3, f: B.card, sw: 1.3 }) + L(36, 37, 116, 37, B.ink, 1.2) + `<circle cx="41" cy="32.5" r="2" fill="${B.red}"/>`
    + folder(44, 44, 16) + folder(68, 44, 16) + folder(92, 44, 16) + tile(22, 26, 9, B.amber) + tile(22, 40, 9, B.orange) + tile(22, 54, 9, B.blue)
    + P('M104 58 L104 74 L108 70 L111 77 L114 76 L111 69 L117 69 Z', B.card, B.ink, 1.3));
  b += phone(166, 8, 58, 104, B.blueWash, [0, 1, 2].map((i) => [0, 1, 2].map((j) => tile(174 + j * 15, 20 + i * 16, 11, [B.orange, B.blue, B.green, B.amber, B.red, B.blueMid, B.green, B.orange, B.blue][i * 3 + j])).join('')).join(''));
  b += tapHand(196, 60);
  b += T(74, 136, 'click with a mouse', { size: 11, w: 700, c: B.soft }) + T(196, 136, 'tap with a finger', { size: 11, w: 700, c: B.soft });
  return svgWrap(246, 142, 'A laptop screen with a window of folders, icons, and a mouse pointer: you click. A phone screen of app icons with a finger tapping one: you tap.', b);
}
export function fnPrograms() {
  let b = appIcon(8, 6, 30, 'chat', '#0866FF') + appIcon(48, 6, 30, 'music', '#1DB954') + appIcon(88, 6, 30, 'doc', '#185ABD');
  b += T(23, 48, 'Chat', { size: 10.5 }) + T(63, 48, 'Music', { size: 10.5 }) + T(103, 48, 'Docs', { size: 10.5 });
  b += R(38, 62, 52, 46, { r: 5, f: '#c9d1dd' }) + R(48, 71, 32, 28, { r: 3, f: '#aab4c4', s: '#7a8698', sw: 1.2 }) + T(64, 89, 'CPU', { size: 11 });
  for (let k = 0; k < 3; k++) { const d = 70 + k * 14; b += L(32, d, 38, d, B.ink, 1.4) + L(90, d, 96, d, B.ink, 1.4); }
  b += ARROW(23, 54, 42, 66, B.soft, 1.6) + ARROW(63, 54, 63, 60, B.soft, 1.6) + ARROW(103, 54, 86, 66, B.soft, 1.6);
  b += T(76, 128, 'apps take turns on the CPU', { size: 10, w: 700, c: B.soft });
  b += T(196, 12, 'RAM, shared out', { size: 11.5 });
  const segs = [['OS', 24, '#9aa6b8', B.ink], ['Chat', 18, '#0866FF', '#fff'], ['Music', 18, '#1DB954', '#fff'], ['Docs', 18, '#185ABD', '#fff'], ['free', 22, B.card, B.greyInk]];
  let y = 20;
  segs.forEach(([n, hh, f, c]) => { b += R(154, y, 84, hh, { r: 0, f, sw: 1.3 }) + T(196, y + hh / 2 + 4, n, { size: 11, c }); y += hh; });
  b += R(154, 20, 84, 100, { r: 3, f: 'none', sw: 2.2 });
  return svgWrap(246, 134, 'Three apps, Chat, Music, and Docs, take turns on the CPU. RAM is shared out: the OS, Chat, Music, and Docs each get their own part, and some is still free.', b);
}

/** Device driver: a program inside the laptop that turns Windows' request into the printer's own codes. */
export function driverPic() {
  const win = R(26, 26, 118, 62, { r: 3, f: B.card, sw: 1.4 }) + R(26, 26, 118, 12, { r: 3, f: B.green, sw: 1.4 }) + T(85, 35.5, 'Printer driver', { size: 8.5, c: '#fff' })
    + T(85, 54, '"Print page 1"', { size: 9.5, c: B.ink }) + T(85, 66, '↓ translating', { size: 8.5, c: B.green }) + T(85, 80, '1B 40 1B 69...', { size: 8.5, mono: true, w: 600 });
  let b = laptop3(20, 18, 130, win, B.blueWash);
  b += P('M168 120 Q200 150 232 128', 'none', B.ink, 2.6) + R(162, 112, 10, 10, { r: 2, f: '#9aa6b8', sw: 1.2 });
  b += R(176, 146, 92, 18, { r: 9, f: B.greenWash, s: B.green, sw: 1.3 }) + T(222, 159, '1B 40 1B 69...', { size: 9.5, mono: true, c: B.green });
  b += printer3(228, 66, 1.0);
  b += T(85, 186, 'Laptop (running Windows)', { size: 12, w: 700, c: B.soft }) + T(288, 186, 'Printer', { size: 12, w: 700, c: B.soft });
  return svgWrap(356, 196, 'A laptop running Windows. On its screen, a printer driver window turns "Print page 1" into the printer\'s own codes, 1B 40 1B 69. The codes travel along the cable to an inkjet printer, which prints the page.', b);
}



/** Multitasking on a 4-core CPU: 6 apps, each core still takes turns. */
export function multitaskPic() {
  const apps = [['Spotify', '#1DB954', '#fff'], ['Messenger', '#0866FF', '#fff'], ['Chrome', '#DB4437', '#fff'], ['Download', B.amber, B.ink], ['Game', '#6f4a9e', '#fff'], ['Canva', '#00C4CC', B.ink]];
  let b = T(62, 16, 'CPU with 4 cores', { size: 12 });
  b += R(10, 24, 104, 104, { r: 6, f: '#c9d1dd' });
  for (let k = 0; k < 5; k++) { const d = 34 + k * 21; b += L(4, d, 10, d, B.ink, 1.4) + L(114, d, 120, d, B.ink, 1.4); }
  [[18, 32], [64, 32], [18, 78], [64, 78]].forEach(([x, y], i) => { b += R(x, y, 42, 42, { r: 3, f: '#aab4c4', s: '#7a8698', sw: 1.4 }) + T(x + 21, y + 19, 'Core', { size: 9.5 }) + T(x + 21, y + 32, String(i + 1), { size: 11 }); });
  const rows = [[0, 1, 0, 1, 0, 1, 0, 1], [2, 3, 2, 3, 2, 3, 2, 3], [4, 4, 5, 4, 4, 5, 4, 4], [5, 2, 1, 5, 2, 1, 5, 2]];
  rows.forEach((r, i) => {
    const y = 30 + i * 25;
    b += T(140, y + 15, String(i + 1), { size: 11, c: B.soft });
    r.forEach((k, j) => { b += R(150 + j * 24, y, 24, 20, { r: 0, f: apps[k][1], sw: 1 }); });
    b += R(150, y, 192, 20, { r: 2, f: 'none', sw: 1.8 });
  });
  b += T(140, 26, 'core', { size: 9, c: B.soft });
  b += ARROW(150, 138, 342, 138, B.soft, 1.6) + T(246, 152, 'time (each slice: a split second)', { size: 10, w: 700, c: B.soft });
  apps.forEach(([n, f, c], i) => { const x = 10 + (i % 3) * 114, y = 166 + Math.floor(i / 3) * 24; b += R(x, y, 106, 19, { r: 9.5, f, sw: 1.2 }) + T(x + 53, y + 13.5, n, { size: 10.5, c }); });
  return svgWrap(352, 214, 'A CPU with 4 cores runs 6 apps: Spotify, Messenger, Chrome, a download, a game, and Canva. Each core can do one thing at a time, so each core switches between a few apps in tiny time slices. Core 1 switches between Spotify and Messenger, core 2 between Chrome and the download, and so on.', b);
}

/* Part 6: four scenes */
export function futAI() {
  const scr = R(22, 16, 116, 66, { r: 2, f: '#f6f8fc', s: 'none', sw: 0 })
    + R(42, 22, 94, 16, { r: 8, f: B.blue, s: 'none', sw: 0 }) + T(89, 33, 'Find my IT 110 report', { size: 7.5, c: '#fff' })
    + R(26, 44, 92, 32, { r: 8, f: B.card, s: B.blueMid, sw: 1.2 }) + T(72, 57, '✦ Found it:', { size: 8, c: B.orangeInk }) + T(72, 70, 'report.docx', { size: 8, c: B.ink });
  let b = laptop3(16, 10, 128, scr, '#f6f8fc');
  b += person(196, 44, B.orange) + R(170, 76, 52, 6, { r: 3, f: '#c9a77c', s: B.ink, sw: 1.2 });
  b += R(166, 10, 66, 26, { r: 10, f: B.card, sw: 1.4 }) + T(199, 27, 'Just ask!', { size: 10.5, c: B.blueInk });
  return svgWrap(240, 134, 'A student types "Find my IT 110 report" to an AI assistant built into the laptop, and it answers: Found it, report.docx.', b);
}
export function futCloud() {
  let b = P('M76 62 Q58 60 60 44 Q62 28 82 30 Q90 8 118 14 Q140 4 156 24 Q182 22 182 44 Q182 62 160 62 Z', B.blueWash, B.ink, 2);
  b += R(92, 30, 20, 26, { r: 2, f: B.card, sw: 1.4 }) + L(96, 38, 108, 38, B.blue, 1.2) + L(96, 44, 108, 44, B.blue, 1.2) + L(96, 50, 104, 50, B.blue, 1.2);
  b += R(124, 32, 30, 22, { r: 2, f: '#f7dd9f', sw: 1.4 }) + P('M127 52 l8 -8 l6 5 l6 -8 l5 11', 'none', B.soft, 1.2);
  b += L(84, 64, 58, 84, B.blueMid, 1.8, ' stroke-dasharray="4 4"') + L(160, 64, 190, 84, B.blueMid, 1.8, ' stroke-dasharray="4 4"');
  b += laptop3(18, 86, 70, R(41, 94, 12, 16, { r: 1, f: B.card, sw: 1 }), B.blueWash);
  b += phone(176, 84, 32, 54, B.blueWash, R(186, 100, 12, 16, { r: 1, f: B.card, sw: 1 }));
  b += T(54, 158, 'at school', { size: 10.5, w: 700, c: B.soft }) + T(192, 158, 'at home', { size: 10.5, w: 700, c: B.soft });
  return svgWrap(240, 164, 'A report and a photo are saved in the cloud. The same file opens on a laptop at school and on a phone at home.', b);
}
export function futDevices() {
  let b = phone(14, 18, 52, 96, '#24324d', person(40, 34, B.orange) + T(40, 80, 'Mama', { size: 10, c: '#fff' }) + C(40, 98, 7, B.green, 'none', 0) + T(40, 101.5, '✆', { size: 9, c: '#fff' }));
  b += T(40, 12, 'ring ring!', { size: 10, c: B.orangeInk });
  b += ARROW(72, 66, 98, 66, B.orange, 2.2);
  b += laptop3(108, 30, 104, R(126, 44, 68, 30, { r: 4, f: B.card, sw: 1.2 }) + T(160, 56, 'Call from Mama', { size: 7.5 }) + R(146, 61, 28, 9, { r: 4.5, f: B.green, s: 'none', sw: 0 }) + T(160, 68, 'Answer', { size: 6.5, c: '#fff' }), B.blueWash);
  b += R(216, 24, 18, 8, { r: 2, f: B.grey, sw: 1 }) + R(212, 32, 26, 28, { r: 7, f: B.ink }) + T(225, 50, '✆', { size: 12, c: B.green }) + R(216, 60, 18, 8, { r: 2, f: B.grey, sw: 1 });
  b += T(120, 134, 'answer on your phone, laptop, or watch', { size: 10.5, w: 700, c: B.soft });
  return svgWrap(248, 140, 'Mama calls the phone. The same call also pops up on the laptop with an Answer button, and on the smartwatch.', b);
}

/** Kernel (round 5): roomy layers. Apps / OS with the kernel at its core / hardware, with SOFTWARE and HARDWARE brackets. */
export function kernelPic() {
  let b = T(14, 16, 'Apps (you open these)', { size: 12, a: 'start', c: B.orangeInk });
  b += appIcon(50, 26, 40, 'chat', '#0866FF') + appIcon(158, 26, 40, 'doc', '#185ABD') + appIcon(266, 26, 40, 'game', '#6f4a9e');
  b += R(10, 88, 306, 126, { r: 12, f: B.blueWash, s: B.blue, sw: 2 }) + T(24, 110, 'Operating system', { size: 13, a: 'start', c: B.blueInk });
  b += R(88, 128, 180, 56, { r: 10, f: B.orangeWash, s: B.orange, sw: 2.6 }) + T(178, 152, 'Kernel', { size: 16, c: B.orangeInk }) + T(178, 172, 'the core of the OS', { size: 11.5, w: 700, c: B.soft });
  b += ARROW(178, 70, 178, 124, B.orange, 2.4) + T(188, 84, '"Save my file"', { size: 11, a: 'start', c: B.orangeInk });
  // hardware
  b += R(40, 240, 56, 52, { r: 5, f: '#c9d1dd' }) + R(51, 250, 34, 32, { r: 3, f: '#aab4c4', s: '#7a8698', sw: 1.2 }) + T(68, 270, 'CPU', { size: 11 });
  for (let k = 0; k < 3; k++) { const d = 249 + k * 16; b += L(33, d, 40, d, B.ink, 1.4) + L(96, d, 103, d, B.ink, 1.4); }
  b += R(124, 252, 116, 28, { r: 2, f: PCB }) + [0, 1, 2, 3, 4].map((i) => R(131 + i * 21, 257, 16, 13, { r: 1, f: '#1f2329', s: 'none', sw: 0 })).join('');
  for (let i = 0; i < 15; i++) b += L(129 + i * 7.3, 275, 129 + i * 7.3, 279, GOLD, 2);
  b += R(256, 254, 60, 24, { r: 2, f: '#24324d' }) + R(263, 259, 28, 14, { r: 1, f: '#e6edf7', s: 'none', sw: 0 });
  b += T(68, 310, 'CPU', { size: 11.5, w: 700, c: B.soft }) + T(182, 300, 'RAM', { size: 11.5, w: 700, c: B.soft }) + T(286, 298, 'SSD', { size: 11.5, w: 700, c: B.soft });
  b += ARROW(130, 186, 76, 236, B.orange, 1.8) + ARROW(178, 186, 182, 248, B.orange, 1.8) + ARROW(226, 186, 282, 250, B.orange, 1.8);
  b += P('M322 6 h6 v208 h-6', 'none', B.greyInk, 1.6) + P('M322 228 h6 v90 h-6', 'none', B.greyInk, 1.6);
  b += `<text x="344" y="110" transform="rotate(90 344 110)" font-family="Nunito, system-ui, sans-serif" font-size="11" font-weight="800" fill="${B.blueInk}" text-anchor="middle" letter-spacing="1.5">SOFTWARE</text>`;
  b += `<text x="344" y="273" transform="rotate(90 344 273)" font-family="Nunito, system-ui, sans-serif" font-size="11" font-weight="800" fill="${B.soft}" text-anchor="middle" letter-spacing="1.5">HARDWARE</text>`;
  return svgWrap(356, 322, 'Three layers. On top, apps: a chat app, a document app, and a game. In the middle, the operating system, with the kernel at its core; the rest of the OS is the interface, settings, and file manager. At the bottom, the hardware: CPU, RAM, and SSD. The document app asks "Save my file"; the kernel gives the orders to the CPU, RAM, and SSD. Apps and the OS, including the kernel, are software. Only the bottom layer is hardware.', b);
}

/** Booting (round 6): two layouts in one. Phones: laptop on top, motherboard below. Wide screens: laptop on the left,
 *  a BIGGER motherboard on the right (same drawing, scaled 1.25). CSS shows one (.bp-narrow / .bp-wide, global.css). step 0..4 */
function bootLaptop(step, x0 = 0, y0 = 0) {
    let inner = '';
  if (step === 1) inner = C(180, 50, 12, 'none', '#c9d6ea', 2.4) + T(180, 86, 'checking hardware', { size: 10, c: '#c9d6ea', w: 700 });
  if (step === 2 || step === 3) inner = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = (k * Math.PI) / 4 + step; return `<circle cx="${(180 + 12 * Math.cos(a)).toFixed(1)}" cy="${(52 + 12 * Math.sin(a)).toFixed(1)}" r="${(1.5 + k * 0.32).toFixed(1)}" fill="#c9d6ea"/>`; }).join('') + T(180, 88, step === 2 ? 'finding the OS' : 'loading the OS', { size: 10, c: '#c9d6ea', w: 700 });
  if (step === 4) inner = P('M105 86 Q140 54 175 74 Q210 92 255 58 L255 99 L105 99 Z', '#8fb0dc', 'none', 0) + T(180, 46, '7:30', { size: 22, c: '#fff' }) + T(180, 62, 'Friday', { size: 10, c: '#fff', w: 700 }) + R(156, 72, 48, 13, { r: 6.5, f: '#ffffff', s: 'none', sw: 0 }) + T(180, 82, 'Log in', { size: 9, c: B.blueInk });
  const scr = step === 0 ? '#0f1626' : step < 4 ? '#1d2840' : '#6f97d0';
  let b = laptop3(100, 8, 160, inner, scr, { power: step === 0, hot: step === 4 });
  b += T(306, 112, 'power', { size: 11, w: 800, c: step === 0 ? B.orangeInk : B.soft }) + T(306, 125, 'button', { size: 11, w: 800, c: step === 0 ? B.orangeInk : B.soft });
  b += ARROW(288, 112, 272, 111, step === 0 ? B.orange : B.soft, 1.8);
  return `<g transform="translate(${x0} ${y0})">` + b + '</g>';
}
function bootBoard(step) {
  const hot = (on) => (on ? { s: B.orange, sw: 3.2 } : { s: B.ink, sw: 2 });
  let b = '';
  // motherboard: two roomy rows
  b += R(10, 162, 340, 196, { r: 12, f: '#d6eadb', s: B.green, sw: 2.2 }) + T(180, 184, 'Motherboard: the main circuit board', { size: 12.5, c: '#1f5a38' });
  b += P('M100 222 H140 M212 230 H300 V286 M66 246 V286', 'none', '#a8cfb2', 2.2);
  // row 1: BIOS chip, CPU
  b += R(30, 206, 72, 34, { r: 3, f: '#2b2f3a', ...hot(step === 1 || step === 2) }) + T(66, 228, 'BIOS', { size: 11, c: '#e6edf7' });
  for (let k = 0; k < 6; k++) b += L(36 + k * 12, 200, 36 + k * 12, 206, '#6b7688', 1.8) + L(36 + k * 12, 240, 36 + k * 12, 246, '#6b7688', 1.8);
  b += T(66, 262, 'BIOS / UEFI chip', { size: 10.5, w: 800, c: '#1f5a38' });
  b += R(142, 198, 70, 64, { r: 6, f: '#c9d1dd', ...hot(step === 1 || step >= 3) }) + R(154, 209, 46, 42, { r: 3, f: '#aab4c4', s: '#7a8698', sw: 1.2 }) + T(177, 235, 'CPU', { size: 13 });
  // row 2: SSD (left), RAM (right)
  b += R(30, 292, 124, 30, { r: 3, f: '#24324d', ...hot(step === 2 || step === 3) });
  for (let i = 0; i < 6; i++) b += L(144, 296 + i * 4.2, 151, 296 + i * 4.2, GOLD, 2);
  b += R(92, 298, 40, 18, { r: 3, f: step === 3 ? B.butter : B.blueWash, s: B.blue, sw: 1.3 }) + T(112, 311, 'OS', { size: 10.5, c: B.blueInk });
  b += T(92, 342, 'SSD (storage)', { size: 10.5, w: 800, c: '#1f5a38' });
  b += R(176, 290, 162, 34, { r: 2, f: PCB, ...hot(step >= 3) }) + [0, 1, 2, 3, 4, 5, 6].map((i) => R(182 + i * 22, 295, 16, 14, { r: 1, f: '#1f2329', s: 'none', sw: 0 })).join('');
  for (let i = 0; i < 21; i++) b += L(180 + i * 7.6, 318, 180 + i * 7.6, 322, GOLD, 2.2);
  if (step >= 3) b += R(180, 294, 70, 18, { r: 3, f: B.butter, s: B.ink, sw: 1.3 }) + T(215, 307, 'OS kernel', { size: 10.5 });
  if (step >= 4) b += R(256, 294, 62, 18, { r: 3, f: B.greenWash, s: B.green, sw: 1.3 }) + T(287, 307, 'drivers', { size: 10.5, c: B.green });
  b += T(257, 342, 'RAM', { size: 10.5, w: 800, c: '#1f5a38' });
  if (step === 1) b += ARROW(104, 223, 138, 223, B.orange, 3);
  if (step === 2) b += ARROW(66, 266, 66, 288, B.orange, 3);
  if (step === 3) b += ARROW(134, 307, 172, 307, B.orange, 3);
  if (step === 4) b += ARROW(240, 286, 206, 266, B.orange, 3);
    return b;
}
export function bootPic(step) {
  const labels = [
    'A laptop with its power key lit up, and the motherboard inside the laptop with the BIOS chip, CPU, SSD that holds the OS, and RAM.',
    'The CPU runs the BIOS or UEFI firmware on its chip, which checks the hardware. The screen says checking hardware.',
    'The firmware looks for the OS on the SSD. The screen shows a loading circle.',
    'The OS kernel is copied from the SSD into RAM.',
    'The OS loads drivers into RAM, the CPU runs them, and the laptop screen shows the log-in screen.',
  ];
  const zoomN = L(84, 138, 12, 162, B.greyInk, 1.4, ' stroke-dasharray="5 4"') + L(276, 138, 348, 162, B.greyInk, 1.4, ' stroke-dasharray="5 4"') + T(180, 152, 'inside the laptop', { size: 11, w: 800, c: B.greyInk });
  const narrow = svgWrap(360, 362, labels[step], bootLaptop(step) + zoomN + bootBoard(step)).replace('class="clean"', 'class="clean bp-narrow"');
  // wide: laptop shifted left/down (its drawing spans x 84..330, y 8..138), board scaled 1.25 to the right
  const wideZoom = L(176, 48, 300, 10, B.greyInk, 1.4, ' stroke-dasharray="5 4"') + L(194, 178, 300, 251, B.greyInk, 1.4, ' stroke-dasharray="5 4"') + T(256, 118, 'inside the', { size: 11, w: 800, c: B.greyInk }) + T(256, 132, 'laptop', { size: 11, w: 800, c: B.greyInk });
  const wide = svgWrap(732, 262, labels[step], bootLaptop(step, -84, 40) + wideZoom + `<g transform="translate(300 8) scale(1.25) translate(-10 -162)">` + bootBoard(step) + '</g>').replace('class="clean"', 'class="clean bp-wide"');
  return narrow + wide;
}

export function futSecurity() {
  let b = phone(16, 8, 76, 116, B.card, T(54, 30, 'Sign in', { size: 10 }) + T(54, 42, 'with a passkey', { size: 8.5, w: 700, c: B.soft }) + T(54, 54, 'no password!', { size: 8.5, w: 700, c: B.green })
    + C(54, 82, 16, B.blueWash, B.blue, 1.6) + P('M46 84 Q46 72 54 72 Q62 72 62 84 M50 90 Q50 76 54 76 Q58 76 58 90', 'none', B.blue, 1.4));
  b += pointHand(54, 92, 0.72);
  b += laptop3(122, 30, 104, P('M174 44 L190 50 V62 Q190 74 174 80 Q158 74 158 62 V50 Z', B.greenWash, B.ink, 1.8) + P('M167 61 L172 67 L182 56', 'none', B.green, 2.4), B.blueWash);
  b += T(174, 128, 'security update', { size: 10, w: 700, c: B.soft }) + T(174, 141, 'installed by itself', { size: 10, w: 700, c: B.soft });
  return svgWrap(240, 156, 'A phone asks to sign in with a passkey, no password: a finger touches the fingerprint reader. A laptop shows a green shield: a security update installed by itself.', b);
}

// chat 42 exports (shared with it110-app-pics.js)
export { laptop3, printer3, appIcon, pointHand, tapHand, L, C, P, laptop, phone, folder, tile, person };
