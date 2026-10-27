// Illustrations for ITC 120 lessons.
// Sketch style (hand-drawn) = real-life examples. Clean style = the data structures themselves.
import { Sketch, C } from './sketch.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ---------------- Sketch: real-life examples ---------------- */

/** A phone's file manager showing nested folders. */
export function phoneFiles() {
  const s = new Sketch(320, 340, 11);
  s.round(40, 8, 240, 324, 26, { fill: C.card, sw: 2.4 });
  s.round(52, 36, 216, 270, 8, { fill: C.paper, sw: 1.4, stroke: C.soft });
  s.round(130, 16, 60, 10, 5, { fill: C.ink, sw: 1 });
  s.text(160, 62, 'Files', { font: 'body', size: 16, weight: 800 });
  s.line(62, 72, 258, 72, { sw: 1, stroke: C.soft });
  const rows = [['Internal storage', 0, C.amber], ['DCIM', 1], ['Camera', 2], ['Screenshots', 2], ['Download', 1], ['Documents', 1]];
  rows.forEach(([name, lvl, fill], i) => {
    const y = 100 + i * 34, x = 64 + lvl * 24;
    s.path(`M${x} ${y - 13} L${x} ${y - 17} L${x + 9} ${y - 17} L${x + 11} ${y - 13} Z`, { fill: fill || C.butter, sw: 1.4 });
    s.rect(x, y - 13, 22, 15, { fill: fill || C.butter, sw: 1.4 });
    s.text(x + 30, y, name, { font: 'body', size: 14, weight: lvl ? 600 : 800, anchor: 'start' });
    if (lvl) s.line(x - 12, y - 6, x - 3, y - 6, { sw: 1.2, stroke: C.soft });
  });
  s.line(76, 108, 76, 236, { sw: 1.2, stroke: C.soft });
  s.line(100, 142, 100, 202, { sw: 1.2, stroke: C.soft });
  s.text(160, 326, 'tap a folder to open what is inside', { size: 13, color: C.soft, weight: 400 });
  return s.svg('A phone file manager: Internal storage holds DCIM, Download, and Documents. DCIM holds Camera and Screenshots.');
}

/** The same folders drawn as a tree. */
export function folderTree() {
  const s = new Sketch(340, 336, 12);
  const F = { root: [185, 30], DCIM: [80, 140], Download: [190, 140], Documents: [290, 140], Camera: [35, 248], Screenshots: [125, 248] };
  const edges = [['root', 'DCIM'], ['root', 'Download'], ['root', 'Documents'], ['DCIM', 'Camera'], ['DCIM', 'Screenshots']];
  for (const [a, b] of edges) s.line(F[a][0], F[a][1] + (a === 'root' ? 62 : 56), F[b][0], F[b][1] - 2, { sw: 2 });
  s.folder(F.root[0] - 28, F.root[1], 'Internal storage', { w: 56, h: 40, fill: C.amber, size: 14 });
  for (const k of ['DCIM', 'Download', 'Documents', 'Camera', 'Screenshots']) {
    s.folder(F[k][0] - 23, F[k][1], k, { fill: k === 'DCIM' ? C.orangeWash : C.butter, size: 13 });
  }
  s.text(78, 40, 'the root', { color: C.orange, size: 17 });
  s.arrow(110, 36, 148, 46, { stroke: C.orange, sw: 1.6 });
  s.text(6, 160, 'parent', { color: C.teal, size: 15, anchor: 'start', rotate: -6 });
  s.text(80, 326, 'children of DCIM', { color: C.teal, size: 15 });
  s.path('M14 304 Q80 314 146 304', { stroke: C.teal, sw: 1.5 });
  s.text(255, 222, 'no folders inside:', { color: C.soft, size: 13, weight: 400 });
  s.text(255, 238, 'leaves', { color: C.soft, size: 15 });
  return s.svg('The same folders as a tree: Internal storage at the top; DCIM, Download, and Documents below it; Camera and Screenshots below DCIM.');
}

/** A linked list as a train: each car (node) carries cargo (data) and one hook (next). */
export function train() {
  const s = new Sketch(360, 200, 21);
  const cars = [[18, '10'], [133, '20'], [248, '30']];
  cars.forEach(([x, v], i) => {
    s.round(x, 62, 92, 50, 8, { fill: i === 0 ? C.tealWash : C.card, sw: 2.2 });
    s.rect(x + 26, 72, 40, 30, { fill: C.butter, sw: 1.6 });
    s.text(x + 46, 94, v, { font: 'body', size: 18, weight: 800 });
    s.circle(x + 22, 120, 16, { fill: C.ink, sw: 1 });
    s.circle(x + 70, 120, 16, { fill: C.ink, sw: 1 });
    if (i < 2) { s.line(x + 92, 96, x + 115, 96, { sw: 2.6, stroke: C.orange }); s.circle(x + 104, 96, 9, { stroke: C.orange, sw: 2 }); }
  });
  s.text(64, 28, 'head', { color: C.teal, size: 17 });
  s.arrow(64, 34, 64, 58, { stroke: C.teal, sw: 1.6 });
  s.text(205, 28, 'data = the cargo', { color: C.ink, size: 15 });
  s.arrow(190, 34, 180, 70, { sw: 1.4 });
  s.text(122, 168, 'next = the hook', { color: C.orange, size: 16 });
  s.arrow(122, 152, 120, 106, { stroke: C.orange, sw: 1.6 });
  s.text(294, 162, 'no hook after it:', { color: C.soft, size: 13, weight: 400 });
  s.text(294, 180, 'next is null', { color: C.soft, size: 15 });
  return s.svg('A linked list as a train: three cars carrying 10, 20, and 30. Each car is hooked to the one behind it. The last car has no hook: its next is null.');
}

/** A small round face for the guessing game. mood: 'think' | 'sly' | 'happy'. */
function face(s, cx, cy, r, fill, mood = 'think') {
  s.circle(cx, cy, r * 2, { fill, sw: 1.8 });
  const e = r * 0.36;
  if (mood === 'sly') { s.line(cx - e - 3, cy - 3, cx - e + 3, cy - 2, { sw: 2, single: true }); s.line(cx + e - 3, cy - 2, cx + e + 3, cy - 3, { sw: 2, single: true }); }
  else { s.circle(cx - e, cy - 3, 3.2, { fill: C.ink, sw: 0.6 }); s.circle(cx + e, cy - 3, 3.2, { fill: C.ink, sw: 0.6 }); }
  if (mood === 'happy' || mood === 'sly') s.path(`M${cx - e} ${cy + 4} Q${cx + (mood === 'sly' ? 4 : 0)} ${cy + r * 0.55} ${cx + e} ${cy + 3}`, { sw: 1.8, single: true });
  else s.line(cx - e * 0.6, cy + 6, cx + e * 0.6, cy + 5, { sw: 1.8, single: true });
  s.ellipse(cx - r * 0.62, cy + 4, 7, 4, { fill: C.pink, stroke: 'none', sw: 0.1 });
  s.ellipse(cx + r * 0.62, cy + 4, 7, 4, { fill: C.pink, stroke: 'none', sw: 0.1 });
}

/** A speech bubble with a tail on the left or right bottom corner. */
function speech(s, x, y, w, h, side, fill, text, color = C.ink) {
  s.round(x, y, w, h, 14, { fill, sw: 1.6, rough: 0.5 });
  const tx = side === 'right' ? x + w - 26 : x + 26, dir = side === 'right' ? 1 : -1;
  s.path(`M${tx - 8 * dir} ${y + h - 1} L${tx + 14 * dir} ${y + h + 12} L${tx + 6 * dir} ${y + h - 1}`, { fill, sw: 1.6, rough: 0.4 });
  s.line(tx - 7 * dir, y + h - 1, tx + 5 * dir, y + h - 1, { stroke: fill, sw: 3, rough: 0, single: true });
  s.text(x + w / 2, y + h / 2 + 5, text, { font: 'body', size: 14, weight: 800, color });
}

/** A thought cloud: a scalloped outline, plus little bubbles trailing toward the thinker. trail: [[x, y, d], ...] */
function cloud(s, x, y, w, h, fill, trail = []) {
  const pts = [], step = 30;
  const nx = Math.max(2, Math.round(w / step)), ny = Math.max(1, Math.round(h / step));
  for (let i = 0; i < nx; i++) pts.push([x + (w * i) / nx, y]);
  for (let i = 0; i < ny; i++) pts.push([x + w, y + (h * i) / ny]);
  for (let i = 0; i < nx; i++) pts.push([x + w - (w * i) / nx, y + h]);
  for (let i = 0; i < ny; i++) pts.push([x, y + h - (h * i) / ny]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i <= pts.length; i++) {
    const [px, py] = pts[i % pts.length], [ox, oy] = pts[i - 1];
    const r = Math.hypot(px - ox, py - oy) * 0.62;
    d += ` A${r} ${r} 0 0 1 ${px} ${py}`;
  }
  s.path(d + ' Z', { fill, sw: 1.6, rough: 0.5 });
  for (const [cx, cy, dd] of trail) s.circle(cx, cy, dd, { fill, sw: 1.4, rough: 0.5 });
}

/** The 1-to-100 guessing game, as a conversation: Migs guesses, Bea knows the answer. */
export function guessing() {
  const BH = 262, TOP = 236;
  const s = new Sketch(360, TOP + 4 * BH + 4, 31);
  const X = (v) => 30 + (v - 1) * 3, W = 3;
  // Level 1: Bea's secret thought, in a cloud above her head
  cloud(s, 22, 18, 232, 52, C.card, [[64, 96, 12], [56, 110, 7]]);
  s.text(138, 41, 'psst... the answer is 68.', { font: 'body', size: 15, weight: 800, color: '#b4461a' });
  s.text(138, 60, "But Migs doesn't know that!", { font: 'body', size: 14, weight: 600, color: '#b4461a' });
  // Level 2: the two people
  face(s, 46, 142, 20, C.orangeWash, 'sly');
  s.text(46, 182, 'Bea', { font: 'body', size: 14, weight: 800 });
  s.text(46, 197, 'knows the number', { font: 'body', size: 11, weight: 600, color: C.soft });
  face(s, 314, 142, 20, C.tealWash, 'think');
  s.text(314, 182, 'Migs', { font: 'body', size: 14, weight: 800 });
  s.text(314, 197, 'guesses', { font: 'body', size: 11, weight: 600, color: C.soft });
  // Level 3: legend
  s.rect(30, 214, 26, 12, { fill: C.orange, fillStyle: 'hachure', gap: 3.5, sw: 0.1, stroke: 'none' });
  s.text(62, 225, '= ruled out', { font: 'body', size: 13, anchor: 'start', color: C.soft, weight: 600 });
  s.rect(176, 214, 26, 12, { fill: C.tealWash, sw: 1.2, stroke: C.teal, rough: 0.5 });
  s.text(208, 225, '= still possible', { font: 'body', size: 13, anchor: 'start', color: C.soft, weight: 600 });
  const rounds = [
    { g: 50, from: [1, 100], cut: [1, 50], say: 'Too low! Go higher!', think: ['So it must be 51 to 100.', "I'll try the middle."] },
    { g: 75, from: [51, 100], cut: [75, 100], say: 'Too high! Go lower!', think: ['So it must be 51 to 74.', "I'll try the middle again."] },
    { g: 62, from: [51, 74], cut: [51, 62], say: 'Too low! Go higher!', think: ['Only 63 to 74 left.', "I'll try 68."] },
    { g: 68, from: [63, 74], cut: null, say: 'Yes! You got it!', think: ['Found it in just', '4 guesses!'] },
  ];
  rounds.forEach((r, i) => {
    const y0 = TOP + 16 + i * BH;           // divider line
    s.line(14, y0, 346, y0, { sw: 1, stroke: '#cdd7d8', rough: 0.4 });
    const y = y0 + 24;                        // content starts well below the divider
    s.text(14, y + 6, `Guess ${i + 1}`, { font: 'body', size: 11, weight: 800, color: C.soft, anchor: 'start' });
    // Migs asks (right), Bea answers (left)
    speech(s, 214, y + 4, 120, 32, 'right', C.tealWash, `Is it ${r.g}?`);
    speech(s, 26, y + 52, 190, 32, 'left', r.cut ? C.orangeWash : C.butter, r.say, r.cut ? '#b4461a' : C.teal);
    // the number line
    const by = y + 104;
    s.rect(X(1), by, X(100) + W - X(1), 14, { fill: '#e7eaea', sw: 1.1, stroke: C.soft, rough: 0.5 });
    s.rect(X(r.from[0]), by, X(r.from[1]) + W - X(r.from[0]), 14, { fill: C.tealWash, sw: 1.5, stroke: C.teal, rough: 0.6 });
    if (r.cut) s.rect(X(r.cut[0]), by, X(r.cut[1]) + W - X(r.cut[0]), 14, { fill: C.orange, fillStyle: 'hachure', gap: 3.5, sw: 0.1, stroke: 'none' });
    s.line(X(r.g) + 1.5, by - 5, X(r.g) + 1.5, by + 19, { stroke: r.cut ? C.orange : C.teal, sw: 2.6 });
    s.text(X(r.g) + 1.5, by + 32, String(r.g), { font: 'body', size: 12, weight: 800, color: C.soft });
    s.text(X(1), by + 32, '1', { font: 'body', size: 11, color: C.soft, weight: 600 });
    s.text(X(100), by + 32, '100', { font: 'body', size: 11, color: C.soft, weight: 600 });
    // Migs thinks (a thought cloud, with bubbles trailing to his side)
    const cy = by + 50;
    cloud(s, 92, cy, 214, 48, r.cut ? C.card : C.butter, [[318, cy + 52, 10], [330, cy + 64, 6]]);
    s.text(199, cy + 21, r.think[0], { font: 'body', size: 14, weight: 800, color: r.cut ? C.ink : C.teal });
    s.text(199, cy + 39, r.think[1], { font: 'body', size: 14, weight: 700, color: r.cut ? C.soft : C.teal });
  });
  return s.svg('The guessing game as a conversation. Bea secretly picks 68. Migs asks: is it 50? Too low. 75? Too high. 62? Too low. 68? Yes. Each answer rules out part of the 1 to 100 range, so he finds it in 4 guesses.');
}

/** Phone contacts stored in a BST, ordered alphabetically, with the search path for one name. */
export function namesBst(find = 'Ocampo') {
  const N = { Mendoza: [180, 30], Garcia: [92, 98], Reyes: [268, 98], Bautista: [46, 166], Lim: [138, 166], Ocampo: [222, 166], Santos: [314, 166] };
  const E = [['Mendoza', 'Garcia'], ['Mendoza', 'Reyes'], ['Garcia', 'Bautista'], ['Garcia', 'Lim'], ['Reyes', 'Ocampo'], ['Reyes', 'Santos']];
  const path = ['Mendoza', 'Reyes', 'Ocampo'];
  const on = (a, b) => path.includes(a) && path.includes(b);
  let s = `<svg class="objbox" viewBox="0 0 360 246" style="max-width:24rem" role="img" aria-label="Contact names stored in a BST: Mendoza at the root; Garcia and Reyes; then Bautista, Lim, Ocampo, Santos. Searching for Ocampo goes Mendoza, Reyes, Ocampo.">`;
  for (const [a, b] of E) s += `<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" stroke="${on(a, b) ? C.orange : C.ink}" stroke-width="${on(a, b) ? 4.5 : 2}"/>`;
  for (const [k, [x, y]] of Object.entries(N)) {
    const hit = k === find, p = path.includes(k);
    s += `<rect x="${x - 40}" y="${y - 14}" width="80" height="28" rx="14" fill="${hit ? C.butter : p ? C.tealWash : C.card}" stroke="${C.ink}" stroke-width="${hit ? 3 : 2}"/>`;
    s += `<text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="13" font-weight="800" fill="${C.ink}">${k}</text>`;
  }
  const hand = (y, t) => `<text x="180" y="${y}" text-anchor="middle" font-family="Kalam, cursive" font-size="15" font-weight="700" fill="${C.orange}">${t}</text>`;
  s += hand(212, 'Find Ocampo: O comes after M → go right.') + hand(232, 'O comes before R → go left. Found!');
  return s + '</svg>';
}

/** A new enrollee's ID being inserted into the registrar's BST of student IDs. */
export function idInsert() {
  const D = 100; // everything below the computer is shifted down by this much
  const s = new Sketch(340, 438 + D, 53);
  // The new student says hello (top); the registrar's computer sits well below the speech bubble
  face(s, 44, 54, 20, C.orangeWash, 'happy');
  s.text(44, 94, 'Joy', { font: 'body', size: 14, weight: 800 });
  s.text(44, 109, 'new enrollee', { font: 'body', size: 11, weight: 600, color: C.soft });
  speech(s, 84, 10, 156, 32, 'left', C.orangeWash, 'I just enrolled!');
  // Monitor: bezel, screen, title bar, then the stand (nudged down for space under the speech bubble)
  s.raw('<g transform="translate(0 12)">');
  s.round(96, 70, 230, 128, 8, { fill: '#3b4a4e', sw: 2 });
  s.rect(106, 80, 210, 108, { fill: C.card, sw: 1.2, rough: 0.4 });
  s.rect(106, 80, 210, 20, { fill: C.teal, sw: 1.2, rough: 0.4 });
  for (const [i, f] of [[0, '#f6d6d0'], [1, C.butter], [2, C.tealWash]]) s.circle(116 + i * 11, 90, 6, { fill: f, sw: 0.8, rough: 0.3 });
  s.text(220, 95, 'DOrSU Registrar', { font: 'body', size: 11, weight: 800, color: '#fff' });
  s.text(211, 122, 'Add new student', { font: 'body', size: 13, weight: 800 });
  s.text(118, 141, 'Student ID', { font: 'body', size: 10, weight: 700, color: C.soft, anchor: 'start' });
  s.rect(118, 146, 116, 24, { fill: C.paper, sw: 1.4, rough: 0.5 });
  s.text(126, 163, '2025180', { font: 'mono', size: 14, weight: 600, anchor: 'start' });
  s.rect(242, 146, 62, 24, { fill: C.teal, sw: 1.4, rough: 0.5 });
  s.text(273, 163, 'Add', { font: 'body', size: 13, weight: 800, color: '#fff' });
  s.path('M199 198 L223 198 L227 214 L195 214 Z', { fill: '#3b4a4e', sw: 1.6, rough: 0.4 });
  s.round(167, 213, 88, 9, 4, { fill: '#3b4a4e', sw: 1.6, rough: 0.4 });
  s.raw('</g>');
  s.raw(`<g transform="translate(0 ${D})">`);
  s.line(16, 140, 324, 140, { sw: 1, stroke: '#cdd7d8', rough: 0.4 });
  s.text(170, 166, 'behind the screen: where does 2025180 go?', { size: 15, color: C.teal });
  // The BST of IDs, with the path and the empty spot
  const P = { a: [170, 204, '2025150'], b: [78, 256, '2025075'], c: [262, 256, '2025230'], d: [42, 306, '2025010'] };
  s.line(170, 216, 78, 244, { sw: 1.8 });
  s.line(170, 216, 262, 244, { sw: 3.2, stroke: C.orange });
  s.line(78, 268, 46, 294, { sw: 1.8 });
  s.line(262, 268, 222, 296, { sw: 3.2, stroke: C.orange });
  for (const [k, [x, y, t]] of Object.entries(P)) {
    s.round(x - 38, y - 12, 76, 24, 12, { fill: k === 'a' || k === 'c' ? C.tealWash : C.card, sw: 1.8, rough: 0.5 });
    s.text(x, y + 5, t, { font: 'body', size: 13, weight: 800 });
  }
  s.raw(`<rect x="182" y="296" width="80" height="26" rx="13" fill="${C.butter}" stroke="${C.orange}" stroke-width="2.4" stroke-dasharray="6 4"/>`);
  s.text(222, 314, '2025180', { font: 'body', size: 13, weight: 800, color: '#b4461a' });
  s.text(222, 344, 'empty spot: it goes here!', { size: 15, color: C.orange });
  // The two checks, written out (body font: the hand font's 5 looks like S)
  s.round(16, 366, 308, 62, 10, { fill: C.paper, sw: 1.2, stroke: C.soft, rough: 0.5 });
  s.text(28, 390, '1. 2025180 > 2025150 → go right', { font: 'body', size: 13, weight: 700, anchor: 'start' });
  s.text(28, 414, '2. 2025180 < 2025230 → go left: empty!', { font: 'body', size: 13, weight: 700, anchor: 'start' });
  s.raw('</g>');
  return s.svg('Joy, a new enrollee, is added to the registrar system with ID 2025180. Behind the screen, the IDs are in a BST. 2025180 is larger than the root 2025150, so go right to 2025230. It is smaller than 2025230, so go left, and that spot is empty. 2025180 is attached there as a new leaf.');
}

/* ---------------- Clean: one object in memory ---------------- */

/**
 * A TreeNode object drawn as a box: data on top, left and right slots below.
 * o: { data, left, right ('null' | value | ''), hl: 'data'|'left'|'right'|'all', blueprint, name }
 */
export function nodeBox(o = {}) {
  const W = 300, H = 186, x = 60, y = 34, w = 180;
  const dash = o.blueprint ? ' stroke-dasharray="6 5"' : '';
  const hlf = (k) => (o.hl === k || o.hl === 'all' || (o.hl === 'kids' && k !== 'data') ? C.butter : o.blueprint ? C.paper : C.card);
  const val = (v) => (v === '' || v == null ? '' : esc(v));
  const slot = (v) => (v === 'null' ? `<tspan font-family='"IBM Plex Mono", monospace' font-size="14" fill="${C.soft}">null</tspan>` : val(v));
  let s = `<svg class="objbox" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label || 'A TreeNode object')}">`;
  s += `<text x="${W / 2}" y="22" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="700" fill="${C.soft}">${esc(o.name || (o.blueprint ? 'TreeNode: the blueprint' : 'a TreeNode object'))}</text>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="52" fill="${hlf('data')}" stroke="${C.ink}" stroke-width="2.5"${dash}/>`;
  s += `<rect x="${x}" y="${y + 52}" width="${w / 2}" height="56" fill="${hlf('left')}" stroke="${C.ink}" stroke-width="2.5"${dash}/>`;
  s += `<rect x="${x + w / 2}" y="${y + 52}" width="${w / 2}" height="56" fill="${hlf('right')}" stroke="${C.ink}" stroke-width="2.5"${dash}/>`;
  const lab = (lx, ly, t) => `<text x="${lx}" y="${ly}" text-anchor="middle" font-family='"IBM Plex Mono", monospace' font-size="12" fill="${C.teal}" font-weight="600">${t}</text>`;
  s += lab(x + w / 2, y + 17, 'data') + lab(x + w / 4, y + 70, 'left') + lab(x + 3 * w / 4, y + 70, 'right');
  const big = (bx, by, t) => `<text x="${bx}" y="${by}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="20" font-weight="800" fill="${C.ink}">${t}</text>`;
  s += big(x + w / 2, y + 42, val(o.data)) + big(x + w / 4, y + 96, slot(o.left)) + big(x + 3 * w / 4, y + 96, slot(o.right));
  if (o.note) s += `<text x="${W / 2}" y="${H - 14}" text-anchor="middle" font-family="Kalam, cursive" font-size="15" font-weight="700" fill="${C.orange}">${esc(o.note)}</text>`;
  return s + '</svg>';
}

/** A student ID lookup app, with the BST it uses behind the screen. */
export function idLookup() {
  const s = new Sketch(340, 382, 41);
  s.round(20, 8, 300, 152, 10, { fill: C.card, sw: 2.2 });
  s.rect(32, 20, 276, 128, { fill: C.paper, sw: 1.2, stroke: C.soft, rough: 0.6 });
  s.path('M6 162 L334 162 L318 180 L22 180 Z', { fill: '#dfe4e4', sw: 2 });
  s.text(170, 44, 'Student ID lookup', { font: 'body', size: 15, weight: 800 });
  s.rect(48, 56, 170, 30, { fill: C.card, sw: 1.6, rough: 0.6 });
  s.text(58, 77, '2025230', { font: 'mono', size: 15, weight: 600, anchor: 'start' });
  s.rect(226, 56, 70, 30, { fill: C.teal, sw: 1.6, rough: 0.6 });
  s.text(261, 76, 'Search', { font: 'body', size: 14, weight: 800, color: '#fff' });
  s.rect(48, 98, 248, 34, { fill: C.tealWash, sw: 1.4, stroke: C.teal, rough: 0.6 });
  s.text(60, 120, '✓ 2025230 is in the system.', { font: 'body', size: 14, weight: 700, anchor: 'start', color: C.teal });
  s.line(20, 208, 320, 208, { sw: 1, stroke: '#cdd7d8', rough: 0.4 });
  s.text(170, 240, 'behind the screen: a BST of student IDs', { size: 16, color: C.teal });
  const P = { a: [170, 280, '2025150'], b: [82, 324, '2025075'], c: [258, 324, '2025230'], d: [44, 358, '2025010'] };
  s.line(170, 292, 82, 312, { sw: 1.8 });
  s.line(170, 292, 258, 312, { sw: 3, stroke: C.orange });
  s.line(82, 336, 52, 346, { sw: 1.8 });
  for (const [k, [x, y, t]] of Object.entries(P)) {
    s.round(x - 38, y - 12, 76, 24, 12, { fill: k === 'c' ? C.butter : k === 'a' ? C.orangeWash : C.card, sw: 1.8, rough: 0.5 });
    s.text(x, y + 5, t, { font: 'body', size: 13, weight: 800 });
  }
  s.text(296, 278, 'start here', { size: 13, color: C.orange });
  return s.svg('A student ID lookup app. The user searches for 2025230 and it is found. Behind the screen, the IDs are stored in a BST: 2025150 at the root, 2025075 on its left with 2025010 below, and 2025230 on its right.');
}

/* ---------------- Clean: general trees with highlights ---------------- */

/** Parse "A(B(D,E),C)" and place nodes: leaves left to right, parents centered over children. */
export function genLayout(spec, GX = 44, GY = 58, R = 16, P = 26) {
  let i = 0; const all = [];
  const parse = () => {
    let t = ''; while (i < spec.length && !'(),'.includes(spec[i])) t += spec[i++];
    const n = { id: t.trim(), kids: [] };
    if (spec[i] === '(') { i++; for (;;) { const k = parse(); k.parent = n; n.kids.push(k); if (spec[i] === ',') { i++; continue; } if (spec[i] === ')') { i++; break; } } }
    return n;
  };
  const root = parse(); let leaf = 0;
  (function place(n, d) { all.push(n); n.d = d; n.y = P + R + d * GY; if (!n.kids.length) { n.x = P + R + leaf++ * GX; return; } n.kids.forEach((k) => place(k, d + 1)); n.x = (n.kids[0].x + n.kids[n.kids.length - 1].x) / 2; })(root, 0);
  const W = P * 2 + R * 2 + (leaf - 1) * GX, H = P * 2 + R * 2 + Math.max(...all.map((n) => n.d)) * GY;
  const by = Object.fromEntries(all.map((n) => [n.id, n]));
  return { root, all, by, W, H, R };
}

/**
 * Draw a general tree with colored paths and numbered steps.
 * o: { spec, focus (id), paths: [{ ids: [...], color, nums: true }], faded: [[a,b], ...] (dashed edges), notes: [{x,y,text,color,anchor}], extraW, extraH, label }
 */
export function pathTree(o) {
  const L = genLayout(o.spec), R = L.R, W = L.W + (o.extraW || 0), H = L.H + (o.extraH || 0), dx = (o.shiftX || 0);
  const onPath = {};
  (o.paths || []).forEach((p) => p.ids.slice(1).forEach((id, k) => (onPath[p.ids[k] + '-' + id] = { color: p.color, n: p.nums ? k + 1 : null })));
  const faded = new Set((o.faded || []).map(([a, b]) => a + '-' + b));
  let s = `<svg class="objbox pathtree" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label || 'Tree diagram')}" style="max-width:${Math.round(W * 1.15)}px">`;
  for (const n of L.all) for (const k of n.kids) {
    const e = onPath[n.id + '-' + k.id], f = faded.has(n.id + '-' + k.id);
    s += `<line x1="${n.x + dx}" y1="${n.y}" x2="${k.x + dx}" y2="${k.y}" stroke="${e ? e.color : f ? '#9aa8aa' : C.ink}" stroke-width="${e ? 5 : 2}" stroke-linecap="round"${f ? ' stroke-dasharray="5 5"' : ''}/>`;
  }
  for (const n of L.all) {
    const isF = n.id === o.focus, onAny = (o.paths || []).find((p) => p.ids.includes(n.id));
    const fill = isF ? C.orange : onAny ? (onAny.wash || C.butter) : C.card;
    s += `<circle cx="${n.x + dx}" cy="${n.y}" r="${R}" fill="${fill}" stroke="${isF ? '#b4461a' : C.ink}" stroke-width="${isF ? 3 : 2}"/>`;
    s += `<text x="${n.x + dx}" y="${n.y + 5}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="800" fill="${isF ? '#fff' : C.ink}">${esc(n.id)}</text>`;
  }
  for (const n of L.all) for (const k of n.kids) {
    const e = onPath[n.id + '-' + k.id];
    if (e && e.n) {
      const mx = (n.x + k.x) / 2 + dx, my = (n.y + k.y) / 2;
      // A plain number beside the edge (on the side away from the line), with a white outline so it stays readable on the grid.
      const ex = k.x - n.x, ey = k.y - n.y, len = Math.hypot(ex, ey) || 1;
      let ox = (ey / len) * 14, oy = (-ex / len) * 14;
      if (ox < 0 && Math.abs(ex) < 1) { ox = -ox; }
      s += `<text x="${mx + (ex === 0 ? 14 : ox)}" y="${my + (ex === 0 ? 0 : oy) + 6}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="17" font-weight="800" fill="${e.color}" stroke="#fff" stroke-width="4" paint-order="stroke">${e.n}</text>`;
    }
  }
  for (const t of o.notes || []) s += `<text x="${t.x}" y="${t.y}" text-anchor="${t.anchor || 'middle'}" font-family="Kalam, cursive" font-size="${t.size || 15}" font-weight="700" fill="${t.color || C.ink}">${esc(t.text)}</text>`;
  return s + '</svg>';
}

/* ---------------- Clean: a list node next to a tree node ---------------- */

export function listNodePic() {
  const box = (x, y, t, fill = C.card) => `<rect x="${x}" y="${y}" width="46" height="40" fill="${fill}" stroke="${C.ink}" stroke-width="2.2"/><text x="${x + 23}" y="${y + 26}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="17" font-weight="800" fill="${C.ink}">${t}</text>`;
  let s = `<svg class="objbox" viewBox="0 0 300 150" role="img" aria-label="A linked-list node: data 10 and one next arrow pointing to the node after it">`;
  s += `<defs><marker id="ahk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.ink}"/></marker></defs>`;
  s += box(40, 50, '10', C.butter) + `<rect x="86" y="50" width="34" height="40" fill="${C.card}" stroke="${C.ink}" stroke-width="2.2"/><circle cx="103" cy="70" r="4" fill="${C.ink}"/>`;
  s += `<path d="M103 70 H190" stroke="${C.ink}" stroke-width="2.2" marker-end="url(#ahk)"/>` + box(194, 50, '20') + `<rect x="240" y="50" width="34" height="40" fill="${C.card}" stroke="${C.ink}" stroke-width="2.2"/>`;
  const lab = (x, y, t, c = C.teal) => `<text x="${x}" y="${y}" text-anchor="middle" font-family='"IBM Plex Mono", monospace' font-size="12" font-weight="600" fill="${c}">${t}</text>`;
  s += lab(63, 40, 'data') + lab(103, 40, 'next') + lab(150, 120, 'one link: forward', C.orange);
  return s + '</svg>';
}
export function treeNodePic() {
  let s = `<svg class="objbox" viewBox="0 0 300 190" role="img" aria-label="A tree node: data 50, a left arrow down to 30 and a right arrow down to 70">`;
  s += `<defs><marker id="ahk2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.ink}"/></marker></defs>`;
  s += `<rect x="100" y="22" width="100" height="34" fill="${C.butter}" stroke="${C.ink}" stroke-width="2.2"/><text x="150" y="45" text-anchor="middle" font-family="Nunito, sans-serif" font-size="17" font-weight="800" fill="${C.ink}">50</text>`;
  s += `<rect x="100" y="56" width="50" height="30" fill="${C.card}" stroke="${C.ink}" stroke-width="2.2"/><rect x="150" y="56" width="50" height="30" fill="${C.card}" stroke="${C.ink}" stroke-width="2.2"/>`;
  s += `<circle cx="125" cy="71" r="4" fill="${C.ink}"/><circle cx="175" cy="71" r="4" fill="${C.ink}"/>`;
  s += `<path d="M125 71 L72 128" stroke="${C.ink}" stroke-width="2.2" marker-end="url(#ahk2)"/><path d="M175 71 L228 128" stroke="${C.ink}" stroke-width="2.2" marker-end="url(#ahk2)"/>`;
  const kid = (x, t) => `<rect x="${x - 30}" y="130" width="60" height="30" fill="${C.card}" stroke="${C.ink}" stroke-width="2.2"/><text x="${x}" y="151" text-anchor="middle" font-family="Nunito, sans-serif" font-size="16" font-weight="800" fill="${C.ink}">${t}</text>`;
  s += kid(66, '30') + kid(234, '70');
  const lab = (x, y, t, c = C.teal, a = 'middle') => `<text x="${x}" y="${y}" text-anchor="${a}" font-family='"IBM Plex Mono", monospace' font-size="12" font-weight="600" fill="${c}">${t}</text>`;
  s += lab(150, 15, 'data') + lab(96, 76, 'left', C.teal, 'end') + lab(204, 76, 'right', C.teal, 'start') + lab(150, 182, 'two links: both point down', C.orange);
  return s + '</svg>';
}

/** A linked list of 7 values: finding 80 checks every node, one by one. */
export function listSearchPic() {
  const vals = [20, 30, 40, 50, 60, 70, 80];
  let s = `<svg class="objbox" viewBox="0 0 370 96" style="max-width:26rem" role="img" aria-label="A linked list 20, 30, 40, 50, 60, 70, 80. Finding 80 checks all 7 nodes.">`;
  s += `<defs><marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.ink}"/></marker></defs>`;
  vals.forEach((v, i) => {
    const x = 8 + i * 51, last = i === vals.length - 1;
    s += `<rect x="${x}" y="34" width="38" height="32" rx="4" fill="${last ? C.butter : C.tealWash}" stroke="${C.ink}" stroke-width="2"/>`;
    s += `<text x="${x + 19}" y="55" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="800" fill="${C.ink}">${v}</text>`;
    s += `<text x="${x + 19}" y="24" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="800" fill="${C.orange}">${i + 1}</text>`;
    if (!last) s += `<line x1="${x + 38}" y1="50" x2="${x + 50}" y2="50" stroke="${C.ink}" stroke-width="1.8" marker-end="url(#ahs)"/>`;
  });
  s += `<text x="185" y="88" text-anchor="middle" font-family="Kalam, cursive" font-size="14" font-weight="700" fill="${C.soft}">orange numbers = the order of the checks</text>`;
  return s + '</svg>';
}
