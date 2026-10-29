// Illustrations for ITC 120 lessons.
// Sketch style (hand-drawn) = real-life examples. Clean style = the data structures themselves.
import { Sketch, C } from './sketch.js';
import { fromSpec } from './bst.js';
import { layout } from './tree.js';

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

/* ---------------- Clean: walk around the tree (traversals) ---------------- */

const ORDER_COLOR = { pre: C.orange, in: C.teal, post: C.amber };
let tourId = 0;
/**
 * The "walk around the tree" picture: a dashed route circles the tree, starting at the root's left side.
 * Every node has three spots on the route: its left side (L), its bottom (B), and its right side (R).
 * o: { spec, order: 'pre'|'in'|'post' (numbered dot on L, B, or R of every node), marks: [[value, 'L'|'B'|'R'|'T', text, color, textColor]],
 *      route (default true), bad: [values] (red ring), label }
 */
export function tourFig(o) {
  const root = fromSpec(o.spec), Lay = layout(root), R = 17, D = 26, M = 12;
  const at = (n, side) => { const p = Lay.pos[n.id]; return { L: [p.x - D, p.y], B: [p.x, p.y + D], R: [p.x + D, p.y], T: [p.x, p.y - D - 2] }[side]; };
  const pts = [];
  (function walk(n) {
    const p = Lay.pos[n.id];
    pts.push(at(n, 'L'));
    if (n.l) walk(n.l); else pts.push([p.x - 19, p.y + 19]);
    pts.push(at(n, 'B'));
    if (n.r) walk(n.r); else pts.push([p.x + 19, p.y + 19]);
    pts.push(at(n, 'R'));
  })(root);
  const f = (v) => Math.round(v * 10) / 10;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  const W = Lay.w + M * 2, H = Lay.h + M * 2 + 4, id = 'tour' + tourId++;
  const all = []; (function w(n) { if (!n) return; all.push(n); w(n.l); w(n.r); })(root);
  const by = Object.fromEntries(all.map((n) => [String(n.v), n]));
  let s = `<svg class="objbox tourfig" viewBox="${-M} ${-M} ${W} ${H}" style="max-width:${Math.round(W * 1.2)}px" role="img" aria-label="${esc(o.label || 'A route around the tree')}">`;
  s += `<defs><marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${C.soft}"/></marker></defs>`;
  for (const n of all) for (const k of [n.l, n.r]) if (k) { const a = Lay.pos[n.id], b = Lay.pos[k.id]; s += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${C.ink}" stroke-width="2"/>`; }
  if (o.route !== false) s += `<path d="${d}" fill="none" stroke="${C.soft}" stroke-width="1.8" stroke-dasharray="5 4" stroke-linecap="round" marker-end="url(#${id})"/>`;
  const bad = new Set((o.bad || []).map(String));
  for (const n of all) {
    const p = Lay.pos[n.id], isBad = bad.has(String(n.v));
    s += `<circle cx="${p.x}" cy="${p.y}" r="${R}" fill="${isBad ? '#f6d6d0' : C.card}" stroke="${isBad ? C.red : C.ink}" stroke-width="${isBad ? 3 : 2}"/>`;
    s += `<text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="800" fill="${C.ink}">${esc(n.v)}</text>`;
  }
  const dot = ([x, y], text, color, tc = '#fff') => {
    const w = Math.max(19, String(text).length * 8 + 9);
    return `<rect x="${x - w / 2}" y="${y - 9.5}" width="${w}" height="19" rx="9.5" fill="${color}" stroke="#fff" stroke-width="1.5"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="12.5" font-weight="800" fill="${tc}">${esc(text)}</text>`;
  };
  if (o.order) {
    const side = { pre: 'L', in: 'B', post: 'R' }[o.order], out = [];
    (function w(n) { if (!n) return; if (o.order === 'pre') out.push(n); w(n.l); if (o.order === 'in') out.push(n); w(n.r); if (o.order === 'post') out.push(n); })(root);
    out.forEach((n, i) => (s += dot(at(n, side), i + 1, ORDER_COLOR[o.order], o.order === 'post' ? C.ink : '#fff')));
  }
  for (const [v, side, text, color, tc] of o.marks || []) s += dot(at(by[String(v)], side), text, color || C.orange, tc || '#fff');
  if (o.route !== false && o.ends !== false) {
    const [sx, sy] = at(root, 'L'), [ex, ey] = at(root, 'R');
    s += `<text x="${sx - 14}" y="${sy - 4}" text-anchor="end" font-family="Kalam, cursive" font-size="14" font-weight="700" fill="${C.soft}">start</text>`;
    s += `<text x="${ex + 14}" y="${ey - 4}" text-anchor="start" font-family="Kalam, cursive" font-size="14" font-weight="700" fill="${C.soft}">end</text>`;
  }
  return s + '</svg>';
}

/* ---------------- Sketch: two folder jobs, two orders ---------------- */

/** Copying a folder (pre-order: the folder first) vs. deleting it (post-order: the folder last). */
export function folderJobs() {
  const s = new Sketch(340, 492, 61);
  const panel = (y0, title, sub, nums, color, note) => {
    s.round(8, y0, 324, 234, 12, { fill: C.card, sw: 1.4, stroke: C.soft, rough: 0.5 });
    s.text(170, y0 + 28, title, { font: 'body', size: 16, weight: 800, color });
    s.text(170, y0 + 48, sub, { font: 'body', size: 12, weight: 700, color: C.soft });
    const F = { top: [170, y0 + 66], a: [95, y0 + 150], b: [245, y0 + 150] };
    s.line(156, y0 + 127, 100, y0 + 148, { sw: 1.8 });
    s.line(184, y0 + 127, 240, y0 + 148, { sw: 1.8 });
    s.folder(F.top[0] - 26, F.top[1], 'Grade 2', { w: 52, h: 38, fill: C.amber, size: 13 });
    s.folder(F.a[0] - 23, F.a[1], 'Quizzes', { fill: C.butter, size: 13 });
    s.folder(F.b[0] - 23, F.b[1], 'Exams', { fill: C.butter, size: 13 });
    const badge = ([x, y], n) => { s.circle(x - 38, y + 16, 26, { fill: color, sw: 1.4, rough: 0.4 }); s.text(x - 38, y + 21, String(n), { font: 'body', size: 14, weight: 800, color: '#fff' }); };
    badge(F.top, nums[0]); badge(F.a, nums[1]); badge(F.b, nums[2]);
    s.text(170, y0 + 222, note, { size: 15, color });
  };
  panel(4, 'Copy a folder: pre-order', 'make the folder, then copy what is inside', [1, 2, 3], C.orange, 'Grade 2 comes first');
  panel(254, 'Delete a folder: post-order', 'empty it first, then remove the folder', [3, 1, 2], C.teal, 'Grade 2 comes last');
  return s.svg('Two jobs on the same folders. Copying Grade 2 (pre-order): 1 make Grade 2, 2 copy Quizzes, 3 copy Exams. Deleting Grade 2 (post-order): 1 delete Quizzes, 2 delete Exams, 3 delete Grade 2, which is now empty.');
}

/* ---------------- Sketch: course header doodles (ITC 120 page) ---------------- */

/** Hand-drawn, muted doodles of the course's structures, so they sit quietly beside the title. */
export function dsDoodles() {
  const s = new Sketch(365, 210, 120);
  const ink = '#5b6b6e', o = { stroke: ink, sw: 1.5, rough: 1.2, bow: 1 };
  const MU = { orange: '#e9a27f', amber: '#e8c57a', teal: '#a9cfc9', butter: '#f3e3b8', wash: '#e4efed' };
  const hat = (c) => ({ ...o, fill: c, fillStyle: 'hachure', gap: 3.6, fw: 1.4 });
  const ar = (x1, y1, x2, y2) => s.arrow(x1, y1, x2, y2, { ...o, sw: 1.3, head: 5 });
  // array
  for (let i = 0; i < 4; i++) s.rect(8 + i * 24, 20, 24, 24, i === 2 ? hat(MU.orange) : o);
  // linked list
  for (const x of [122, 166, 210]) { s.rect(x, 21, 20, 22, { ...o, fill: MU.wash }); s.rect(x + 20, 21, 10, 22, o); }
  s.line(231, 41, 239, 23, o);
  ar(147, 32, 162, 32); ar(191, 32, 206, 32);
  // map: key -> value
  for (const y of [14, 38]) { s.rect(268, y, 24, 18, hat(MU.amber)); s.rect(316, y, 40, 18, o); ar(296, y + 9, 311, y + 9); }
  // stack
  s.path('M12 102 L12 172 L68 172 L68 102', o);
  s.rect(18, 151, 44, 15, o); s.rect(18, 133, 44, 15, o); s.rect(18, 115, 44, 15, hat(MU.amber));
  // queue
  s.line(88, 124, 176, 124, o); s.line(88, 160, 176, 160, o);
  s.rect(96, 131, 22, 22, o); s.rect(123, 131, 22, 22, o); s.rect(150, 131, 22, 22, hat(MU.orange));
  ar(180, 142, 194, 142);
  // tree
  for (const [a, b, c, d] of [[240, 106, 221, 134], [240, 106, 259, 134], [221, 134, 211, 162], [221, 134, 231, 162]]) s.line(a, b, c, d, o);
  s.circle(240, 106, 18, { ...o, fill: MU.orange }); s.circle(221, 134, 16, { ...o, fill: '#fff' }); s.circle(259, 134, 16, { ...o, fill: '#fff' });
  s.circle(211, 162, 14, { ...o, fill: '#fff' }); s.circle(231, 162, 14, { ...o, fill: MU.butter });
  // graph
  for (const [a, b, c, d] of [[296, 110, 346, 104], [296, 110, 322, 142], [346, 104, 322, 142], [322, 142, 302, 172], [322, 142, 352, 168], [302, 172, 352, 168]]) s.line(a, b, c, d, o);
  for (const [x, y, f] of [[296, 110, '#fff'], [346, 104, MU.teal], [322, 142, '#fff'], [302, 172, '#fff'], [352, 168, MU.teal]]) s.circle(x, y, 14, { ...o, fill: f });
  // labels: hand font for words; body font for the index numbers (Kalam's digits are hard to read)
  ['0', '1', '2', '3'].forEach((t, i) => s.text(20 + i * 24, 59, t, { font: 'body', size: 11, weight: 700, color: ink }));
  for (const [x, y, t] of [[56, 84, 'array'], [181, 84, 'linked list'], [312, 84, 'map'], [40, 199, 'stack'], [132, 199, 'queue'], [232, 199, 'tree'], [324, 199, 'graph']]) s.text(x, y, t, { size: 16, color: ink });
  return s.svg('Small hand-drawn sketches of the structures in this course: array, linked list, map, stack, queue, tree, and graph', 'head-art');
}

/* ---------------- Traversals: why we need them ---------------- */

/** Four everyday jobs that must touch every node once: list, count, copy, delete. */
export function travJobs() {
  const s = new Sketch(340, 424, 71);
  const DARK = '#a8650f';
  const panel = (x0, y0, title, color, kind, result, cap) => {
    s.round(x0, y0, 162, 196, 12, { fill: C.card, sw: 1.4, stroke: C.soft, rough: 0.5 });
    s.text(x0 + 81, y0 + 24, title, { font: 'body', size: 15, weight: 800, color });
    const cx = x0 + 81, P = [[cx, y0 + 54], [cx - 42, y0 + 104], [cx + 42, y0 + 104]];
    s.line(P[0][0] - 8, P[0][1] + 14, P[1][0] + 6, P[1][1] - 16, { sw: 1.6 });
    s.line(P[0][0] + 8, P[0][1] + 14, P[2][0] - 6, P[2][1] - 16, { sw: 1.6 });
    P.forEach(([x, y], i) => {
      if (kind === 'num') { s.round(x - 22, y - 13, 44, 26, 6, { fill: C.tealWash, sw: 1.5, rough: 0.6 }); s.text(x, y + 5, ['1042', '1017', '1088'][i], { font: 'body', size: 12, weight: 800 }); }
      else if (kind === 'person') { s.circle(x, y - 6, 15, { fill: C.butter, sw: 1.5 }); s.path(`M${x - 11} ${y + 14} Q${x} ${y - 2} ${x + 11} ${y + 14} Z`, { fill: C.orangeWash, sw: 1.5 }); }
      else { s.folder(x - 16, y - 14, '', { w: 32, h: 26, fill: i ? C.butter : C.amber }); if (kind === 'del') { s.line(x - 12, y - 10, x + 12, y + 12, { stroke: C.red, sw: 2.4, single: true }); s.line(x + 12, y - 10, x - 12, y + 12, { stroke: C.red, sw: 2.4, single: true }); } }
    });
    s.arrow(cx, y0 + 124, cx, y0 + 140, { stroke: color, sw: 1.8, head: 7 });
    result(cx, y0 + 160);
    s.text(cx, y0 + 186, cap, { font: 'body', size: 12, weight: 700, color: C.soft });
  };
  panel(4, 4, 'Show a list', C.teal, 'num', (x, y) => { s.rect(x - 62, y - 14, 124, 24, { fill: C.paper, sw: 1.3, rough: 0.6 }); s.text(x, y + 3, '1017, 1042, 1088', { font: 'body', size: 12, weight: 800 }); }, 'print every patient number');
  panel(174, 4, 'Count', C.orange, 'person', (x, y) => { s.text(x, y + 4, '3 students', { font: 'body', size: 15, weight: 800, color: C.orange }); }, 'count every student');
  panel(4, 206, 'Save a copy', DARK, 'folder', (x, y) => { s.folder(x - 30, y - 14, '', { w: 26, h: 20, fill: C.butter }); s.folder(x - 22, y - 8, '', { w: 26, h: 20, fill: C.amber }); s.text(x + 10, y + 7, 'copied', { font: 'body', size: 13, weight: 800, color: DARK, anchor: 'start' }); }, 'back up everything inside');
  panel(174, 206, 'Delete', C.red, 'del', (x, y) => { s.rect(x - 10, y - 10, 20, 22, { fill: C.card, sw: 1.6 }); s.line(x - 14, y - 12, x + 14, y - 12, { sw: 1.8 }); s.text(x + 18, y + 7, 'all gone', { font: 'body', size: 13, weight: 800, color: C.red, anchor: 'start' }); }, 'remove everything inside');
  s.text(170, 418, 'Every job: visit every node, exactly once.', { size: 17, color: C.teal });
  return s.svg('Four jobs that touch every node of a tree once. Show a list: print every patient number (1017, 1042, 1088). Count: count every student (3 students). Save a copy: back up a folder and everything inside. Delete: remove a folder and everything inside.');
}

/** Three everyday trees: phone folders, a family tree, and an online shop's categories. */
export function everydayTrees() {
  const s = new Sketch(340, 204, 72);
  const tree = (x0, title, labels, draw) => {
    const cx = x0 + 55;
    s.text(cx, 20, title, { font: 'body', size: 13, weight: 800 });
    const P = [[cx, 48], [cx - 30, 134], [cx + 30, 134]];
    s.line(cx - 6, 86, P[1][0] + 4, 116, { sw: 1.5 }); s.line(cx + 6, 86, P[2][0] - 4, 116, { sw: 1.5 });
    P.forEach(([x, y], i) => { draw(x, y, i); s.text(x, y + 30, labels[i], { font: 'body', size: 12, weight: 700 }); });
  };
  tree(2, 'Phone folders', ['Files', 'DCIM', 'Docs'], (x, y, i) => s.folder(x - 14, y - 12, '', { w: 28, h: 22, fill: i ? C.butter : C.amber }));
  tree(116, 'Family tree', ['Lola', 'Mama', 'Tito'], (x, y, i) => { s.circle(x, y - 3, 22, { fill: i ? C.butter : C.orangeWash, sw: 1.5 }); s.circle(x - 3, y - 5, 2, { fill: C.ink, sw: 1 }); s.circle(x + 3, y - 5, 2, { fill: C.ink, sw: 1 }); s.path(`M${x - 4} ${y + 1} Q${x} ${y + 5} ${x + 4} ${y + 1}`, { sw: 1.2 }); });
  tree(228, 'Online shop', ['All', 'Gadgets', 'Shoes'], (x, y, i) => { s.path(`M${x - 16} ${y - 10} H${x + 8} L${x + 16} ${y} L${x + 8} ${y + 10} H${x - 16} Z`, { fill: i ? C.tealWash : C.teal, sw: 1.5 }); s.circle(x + 7, y, 4, { fill: C.card, sw: 1 }); });
  s.text(170, 198, 'a root at the top, branches, and leaves', { size: 15, color: C.soft });
  return s.svg('Three everyday trees. Phone folders: Files holds DCIM and Docs. A family tree: Lola, with her children Mama and Tito. An online shop: All, split into Gadgets and Shoes.');
}

/** Clean: an array and a linked list have one way forward; a binary tree has two ways down and needs a way back up. */
export function routesPic() {
  const T = C.teal, O = C.orange, ink = C.ink, soft = C.soft;
  const lab = (x, y, t, c = ink, a = 'start', sz = 15, w = 800, f = 'Nunito, sans-serif') => `<text x="${x}" y="${y}" text-anchor="${a}" font-family='${f}' font-size="${sz}" font-weight="${w}" fill="${c}">${esc(t)}</text>`;
  const head = (id, c) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 1L9 5L0 9z" fill="${c}"/></marker>`;
  const card = (y, h, title, color, side) => `<rect x="4" y="${y}" width="332" height="${h}" rx="12" fill="#fff" stroke="#d9dedb" stroke-width="1.5"/>` + lab(18, y + 24, title, color, 'start', 15) + lab(322, y + 24, side, soft, 'end', 12, 700);
  let s = `<svg class="objbox" viewBox="0 0 340 452" role="img" aria-label="An array and a linked list have only one way forward. A binary tree node has two ways down: go down one side, come back up, then go down the other side."><defs>${head('rpT', T)}${head('rpO', O)}</defs>`;
  s += card(4, 104, 'Array', T, 'one way forward');
  [5, 8, 2, 9].forEach((v, i) => { s += `<rect x="${40 + i * 50}" y="38" width="50" height="36" fill="${i ? '#fff' : C.tealWash}" stroke="${ink}" stroke-width="1.8"/>` + lab(65 + i * 50, 62, String(v), ink, 'middle', 15); });
  s += `<path d="M58 90 H226" stroke="${T}" stroke-width="2.2" fill="none" marker-end="url(#rpT)"/>` + lab(246, 95, 'i++', T, 'start', 14, 600, '"IBM Plex Mono", monospace');
  s += card(116, 104, 'Linked list', T, 'one way forward');
  [10, 20, 30].forEach((v, i) => { const x = 34 + i * 86; s += `<rect x="${x}" y="150" width="52" height="34" rx="7" fill="${i ? '#fff' : C.tealWash}" stroke="${ink}" stroke-width="1.8"/>` + lab(x + 26, 173, String(v), ink, 'middle', 15); s += `<path d="M${x + 54} 167 H${x + (i < 2 ? 83 : 79)}" stroke="${T}" stroke-width="2.2" marker-end="url(#rpT)"/>`; });
  s += lab(292, 172, 'null', soft, 'start', 13, 700);
  s += lab(170, 208, 'current = current.next', T, 'middle', 12, 600, '"IBM Plex Mono", monospace');
  s += card(228, 216, 'Binary tree', O, 'TWO ways down');
  const A = [170, 282], B = [94, 368], Cc = [246, 368];
  s += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${ink}" stroke-width="1.8"/><line x1="${A[0]}" y1="${A[1]}" x2="${Cc[0]}" y2="${Cc[1]}" stroke="${ink}" stroke-width="1.8"/>`;
  s += `<path d="M148 284 Q 96 300 80 344" stroke="${O}" stroke-width="2.2" fill="none" marker-end="url(#rpO)"/>`;
  s += `<path d="M118 358 Q 158 336 160 302" stroke="${O}" stroke-width="2.2" fill="none" stroke-dasharray="5 4" marker-end="url(#rpO)"/>`;
  s += `<path d="M192 284 Q 244 300 260 344" stroke="${O}" stroke-width="2.2" fill="none" marker-end="url(#rpO)"/>`;
  for (const [p, t, f] of [[A, 'A', C.butter], [B, 'B', '#fff'], [Cc, 'C', '#fff']]) s += `<circle cx="${p[0]}" cy="${p[1]}" r="19" fill="${f}" stroke="${ink}" stroke-width="1.8"/>` + lab(p[0], p[1] + 5, t, ink, 'middle', 15);
  const badge = (x, y, n, t, a) => `<circle cx="${x}" cy="${y}" r="9" fill="${O}"/>` + lab(x, y + 4, n, '#fff', 'middle', 11, 800) + lab(a === 'end' ? x - 13 : x + 13, y + 4, t, O, a, 12, 800);
  s += badge(80, 300, '1', 'down', 'end') + badge(178, 346, '2', 'back up', 'start') + badge(260, 300, '3', 'down', 'start');
  s += lab(170, 412, 'Finish one side, come back up,', soft, 'middle', 13, 700) + lab(170, 429, 'then do the other side.', soft, 'middle', 13, 700);
  return s + '</svg>';
}

/** Clean: which kinds of trees each traversal works on. */
export function treeKinds() {
  const ink = C.ink, soft = C.soft, OK = '#0e6b63', NO = C.red;
  const lab = (x, y, t, c = ink, a = 'start', sz = 13, w = 800) => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Nunito, sans-serif" font-size="${sz}" font-weight="${w}" fill="${c}">${esc(t)}</text>`;
  const node = (x, y, t, f = '#fff') => `<circle cx="${x}" cy="${y}" r="15" fill="${f}" stroke="${ink}" stroke-width="1.6"/>` + lab(x, y + 5, t, ink, 'middle', 13);
  const edge = (a, b) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${ink}" stroke-width="1.6"/>`;
  const verdict = (x, y, rows) => rows.map(([name, ok, color], i) => `<rect x="${x}" y="${y + i * 27 - 16}" width="154" height="23" rx="5" fill="${ok ? '#fff' : '#f6e1de'}" stroke="${ok ? '#d9dedb' : NO}" stroke-width="1.2"/>` + lab(x + 8, y + i * 27, name, color, 'start', 13) + lab(x + 146, y + i * 27, ok ? '✓ works' : '✗ no', ok ? OK : NO, 'end', 12)).join('');
  const P = [['Pre-order', '#b4461a'], ['In-order', '#0a5650'], ['Post-order', '#7a5200']];
  const card = (y, h, title, sub) => `<rect x="4" y="${y}" width="332" height="${h}" rx="12" fill="#fff" stroke="#d9dedb" stroke-width="1.5"/>` + lab(16, y + 23, title, ink, 'start', 15) + lab(16, y + 41, sub, soft, 'start', 12, 700);
  let s = `<svg class="objbox" viewBox="0 0 340 512" role="img" aria-label="Any tree: pre-order and post-order work; in-order does not, because a node with three children has no single in-between spot. Binary tree: all three work. BST: all three work, and in-order comes out sorted.">`;
  s += card(4, 168, '1. Any tree', 'a node may have 3 or more children');
  const r1 = [82, 72], k1 = [[36, 130], [82, 130], [128, 130]];
  k1.forEach((k) => (s += edge(r1, k))); s += node(...r1, 'P', C.butter); ['X', 'Y', 'Z'].forEach((t, i) => (s += node(...k1[i], t)));
  s += lab(82, 160, 'write P between which two?', NO, 'middle', 11, 700);
  s += verdict(172, 86, [[P[0][0], true, P[0][1]], [P[1][0], false, P[1][1]], [P[2][0], true, P[2][1]]]);
  s += card(180, 156, '2. Binary tree', 'at most 2 children: a left and a right');
  const r2 = [82, 248], k2 = [[46, 304], [118, 304]];
  k2.forEach((k) => (s += edge(r2, k))); s += node(...r2, 'A', C.butter) + node(...k2[0], 'B') + node(...k2[1], 'C');
  s += lab(46, 328, 'left', soft, 'middle', 11, 700) + lab(118, 328, 'right', soft, 'middle', 11, 700);
  s += verdict(172, 262, P.map(([n, c]) => [n, true, c]));
  s += card(344, 164, '3. BST', 'a binary tree, so all three work');
  const r3 = [82, 412], k3 = [[46, 468], [118, 468]];
  k3.forEach((k) => (s += edge(r3, k))); s += node(...r3, '20', C.butter) + node(...k3[0], '10') + node(...k3[1], '30');
  s += verdict(172, 422, P.map(([n, c]) => [n, true, c]));
  s += lab(172, 498, 'bonus: in-order = 10, 20, 30', OK, 'start', 12, 800);
  return s + '</svg>';
}

/* ---------------- Sketches: recursion lesson ---------------- */

/** A wobbly, hand-drawn speech bubble whose tail points at the speaker (tip). baseX = where the tail leaves the bubble. */
function sayBubble(s, x, y, w, lines, fill, stroke, tip, baseX, size = 12) {
  const lh = size + 3, h = lines.length * lh + 13;
  s.round(x, y, w, h, 11, { fill, stroke, sw: 1.8, rough: 1.3, bow: 1.4 });
  const ey = tip[1] < y ? y : y + h, mx = (baseX + tip[0]) / 2, my = (ey + tip[1]) / 2;
  s.path(`M${baseX - 7} ${ey} Q${mx - 4} ${my} ${tip[0]} ${tip[1]} Q${mx + 5} ${my} ${baseX + 7} ${ey}`, { fill, stroke, sw: 1.8, rough: 0.9 });
  s.line(baseX - 5, ey, baseX + 5, ey, { stroke: fill, sw: 4.5, rough: 0, single: true });
  lines.forEach((t, i) => s.text(x + w / 2, y + size + 7 + i * lh, t, { font: 'body', size, weight: 800 }));
}

/** A line at the registrar's window: questions go forward, answers come back (+1 each). Each answer bubble matches its speaker's shirt. */
export function pilaLine() {
  const s = new Sketch(340, 380, 83);
  const xs = [80, 141, 210, 290], names = ['Ana', 'Bea', 'Migs', 'You'];
  const shirts = [C.tealWash, C.orangeWash, C.sky, C.butter];
  const edges = [C.teal, C.orange, '#4f86b8', C.amber];
  s.text(150, 16, 'Going forward: each person asks the one ahead', { font: 'body', size: 13, weight: 800, color: C.orange });
  s.rect(8, 92, 36, 96, { fill: C.sky, sw: 1.6 });
  s.line(8, 140, 44, 140, { sw: 1.2, single: true });
  s.text(4, 86, 'Registrar', { font: 'body', size: 11, weight: 800, anchor: 'start' });
  sayBubble(s, 112, 28, 222, ['How many are in front of you?'], shirts[3], edges[3], [293, 104], 302, 13);
  xs.forEach((x, i) => {
    s.path(`M${x - 21} 190 Q${x - 19} 154 ${x} 151 Q${x + 19} 154 ${x + 21} 190 Z`, { fill: shirts[i], stroke: edges[i], sw: 1.8 });
    face(s, x, 130, 16, '#e3b38c', i === 3 ? 'happy' : 'think');
    s.path(`M${x - 16} ${128} Q${x - 15} ${108} ${x} ${110} Q${x + 15} ${108} ${x + 16} ${128} Q${x + 8} ${116} ${x} ${117} Q${x - 8} ${116} ${x - 16} ${128} Z`, { fill: C.ink, sw: 1, rough: 0.4 });
    s.text(x, 204, names[i], { font: 'body', size: 13, weight: 800 });
    if (i > 0) s.curve(x - 14, 104, xs[i - 1] + 14, 104, 14, { stroke: C.orange, sw: 2, head: 7 });
    if (i < 3) s.curve(x + 12, 219, xs[i + 1] - 12, 219, 5, { stroke: C.teal, sw: 2, head: 6 });
  });
  // Answers: two staggered rows, so every tail reaches its own speaker without crossing another bubble
  sayBubble(s, 22, 234, 104, ["No one's in", 'front of me.'], shirts[0], edges[0], [80, 211], 76);
  sayBubble(s, 148, 234, 132, ['There are 2 people', 'in front of me.'], shirts[2], edges[2], [210, 211], 212);
  sayBubble(s, 64, 290, 136, ["There's 1 person", 'in front of me.'], shirts[1], edges[1], [141, 211], 137);
  sayBubble(s, 208, 290, 126, ['Hm, so there must', 'be 3 people in', 'front of me!'], shirts[3], edges[3], [290, 211], 298);
  s.text(170, 372, 'Coming back: each person adds 1 to the answer', { font: 'body', size: 13, weight: 800, color: C.teal });
  return s.svg('A line of four people at the registrar\'s window: Ana in front, then Bea, Migs, and you at the back. You ask Migs how many are in front of him; Migs asks Bea; Bea asks Ana. Ana says: no one\'s in front of me. Bea says: there\'s 1 person in front of me. Migs says: there are 2 people in front of me. You think: so there must be 3 people in front of me.');
}

/** Cooking adobo, then the phone rings, then a knock: newest task on top, only the top one is done. */
export function adoboStack() {
  const s = new Sketch(340, 262, 91);
  s.text(170, 20, 'Your tasks (newest on top)', { font: 'body', size: 15, weight: 800 });
  const card = (y, label, status, fill, stroke, icon) => {
    s.round(36, y, 268, 52, 9, { fill, stroke, sw: 2, rough: 0.6 });
    icon(68, y + 26);
    s.text(98, y + 32, label, { font: 'body', size: 15, weight: 800, anchor: 'start' });
    s.text(292, y + 32, status, { font: 'body', size: 12, weight: 800, color: C.soft, anchor: 'end' });
  };
  card(40, 'Answer the door', 'doing now', C.orangeWash, C.orange, (x, y) => { s.rect(x - 11, y - 18, 22, 36, { fill: C.tealWash, sw: 1.6 }); s.circle(x + 5, y + 2, 4, { fill: C.ink, sw: 0.8 }); });
  card(100, 'Phone call', 'paused', C.butter, C.amber, (x, y) => { s.round(x - 9, y - 17, 18, 34, 4, { fill: C.sky, sw: 1.6 }); s.line(x - 3, y + 11, x + 3, y + 11, { sw: 1.6, single: true }); });
  card(160, 'Cooking adobo', 'paused', C.butter, C.amber, (x, y) => { s.rect(x - 15, y - 4, 30, 18, { fill: C.soft, sw: 1.6 }); s.ellipse(x, y - 5, 36, 9, { fill: C.soft, sw: 1.6 }); s.path(`M${x - 5} ${y - 12} q-4 -6 0 -10 M${x + 5} ${y - 12} q-4 -6 0 -10`, { sw: 1.4, single: true }); });
  s.text(170, 238, 'Finish the top task first. Then the one below it', { font: 'body', size: 13, weight: 800, color: C.teal });
  s.text(170, 256, 'continues where you paused it.', { font: 'body', size: 13, weight: 800, color: C.teal });
  return s.svg('Three task cards stacked, newest on top: Answer the door (doing now), Phone call (paused), Cooking adobo (paused). Finish the top task first; then the one below continues where you paused it.');
}

/** Listing a Documents folder: it has folders inside (recursive case); ITC120 and Photos have none (base case). */
export function docsFolders() {
  const s = new Sketch(340, 262, 97);
  const GREEN = '#2e7d4f', BLUE = '#2f6fa8';
  const box = (x, y, w, h, name, fill) => {
    s.path(`M${x} ${y} L${x} ${y - 14} L${x + name.length * 8 + 18} ${y - 14} L${x + name.length * 8 + 26} ${y} Z`, { fill, sw: 1.6 });
    s.rect(x, y, w, h, { fill, sw: 1.6 });
    s.text(x + 8, y - 2, name, { font: 'body', size: 13, weight: 800, anchor: 'start' });
  };
  const file = (x, y, name) => { s.rect(x, y, name.length * 7.4 + 14, 22, { fill: C.card, sw: 1.2, rough: 0.5 }); s.text(x + 7, y + 16, name, { font: 'mono', size: 11, weight: 600, anchor: 'start' }); };
  box(8, 26, 324, 228, 'Documents', C.sky);
  file(20, 40, 'resume.pdf');
  s.text(322, 50, 'has folders inside:', { font: 'body', size: 12, weight: 800, color: BLUE, anchor: 'end' });
  s.text(322, 66, 'recursive case', { font: 'body', size: 12, weight: 800, color: BLUE, anchor: 'end' });
  box(20, 96, 146, 146, 'ITC120', C.butter);
  file(30, 108, 'Lesson1.pdf'); file(30, 136, 'Lesson2.pdf');
  box(176, 96, 146, 146, 'Photos', C.butter);
  file(186, 108, 'selfie.jpg');
  for (const x of [93, 249]) {
    s.text(x, 210, 'no folders inside:', { font: 'body', size: 12, weight: 800, color: GREEN });
    s.text(x, 228, 'base case', { font: 'body', size: 12, weight: 800, color: GREEN });
  }
  return s.svg('The Documents folder holds resume.pdf and two folders, ITC120 and Photos, so it uses the rule again on each one (recursive case). ITC120 holds Lesson1.pdf and Lesson2.pdf, and Photos holds selfie.jpg. They have no folders inside, so they just list their files (base case).');
}

/* ---------------- Sketch: BST deletion lesson ---------------- */

/** Hook for BST deletion: a purok leader leaves the org chart. No one under her / one member under him / two teams under her. */
export function leaderLeaves() {
  const s = new Sketch(340, 522, 113);
  const card = (cx, y, name, fill, o = {}) => {
    s.round(cx - 33, y, 66, 26, 7, { fill, stroke: o.stroke || C.ink, sw: 1.7, rough: 0.7 });
    s.text(cx, y + 18, name, { font: 'body', size: 13, weight: 800 });
    // thin single-stroke cross, so the name still shows through
    if (o.gone) { s.line(cx - 27, y + 4, cx + 27, y + 22, { stroke: C.red, sw: 1.3, single: true }); s.line(cx - 27, y + 22, cx + 27, y + 4, { stroke: C.red, sw: 1.3, single: true }); }
  };
  const link = (x1, y1, x2, y2) => s.line(x1, y1, x2, y2, { sw: 1.6, single: true });
  const head = (y, t) => s.text(10, y, t, { font: 'body', size: 13.5, weight: 800, anchor: 'start', color: C.teal });
  const note = (x, y, lines) => lines.forEach((t, i) => s.text(x, y + i * 16, t, { font: 'body', size: 12, weight: 700, anchor: 'start' }));
  const divider = (y) => s.line(10, y, 330, y, { sw: 1, stroke: C.soft, rough: 0.6, single: true });
  s.text(170, 18, 'When a purok leader leaves', { font: 'body', size: 15, weight: 800 });
  // 1. No one under her: just remove the card. (links are 22 long; about 24 of space above and below each divider)
  let y = 34;
  head(y + 6, '1. No one under her');
  card(80, y + 20, 'Kapitan', C.sky); link(80, y + 46, 80, y + 68); card(80, y + 68, 'Liza', C.pink, { gone: true });
  note(160, y + 46, ['Liza leaves. No one is', 'under her, so we just', 'remove her card.']);
  divider(152);
  // 2. One member under him: the member moves up.
  y = 176;
  head(y + 6, '2. One member under him');
  card(80, y + 20, 'Kapitan', C.sky); link(80, y + 46, 80, y + 68); card(80, y + 68, 'Ben', C.pink, { gone: true });
  link(80, y + 94, 80, y + 116); card(80, y + 116, 'Joy', C.tealWash, { stroke: C.teal });
  s.curve(116, y + 129, 116, y + 81, 16, { stroke: C.teal, sw: 2, head: 7 });
  note(160, y + 66, ['Ben leaves. Joy, the only', 'member under him,', 'moves up into his place.']);
  divider(342);
  // 3. Two teams under her: keep the post, someone else fills it.
  y = 366;
  head(y + 6, '3. Two teams under her');
  card(100, y + 20, 'Kapitan', C.sky); link(100, y + 46, 100, y + 68); card(100, y + 68, 'Rosa', C.pink, { gone: true });
  link(92, y + 94, 60, y + 116); link(108, y + 94, 140, y + 116);
  card(60, y + 116, 'Team A', C.butter); card(140, y + 116, 'Team B', C.butter);
  note(186, y + 50, ['Rosa leaves. Two teams', 'are under her, but', 'there is one post.', 'Keep the post, and', 'someone else fills it.']);
  return s.svg('When a purok leader leaves, three things can happen. 1: Liza leaves and no one is under her, so we just remove her card. 2: Ben leaves and Joy, the only member under him, moves up into his place. 3: Rosa leaves and two teams are under her, but there is only one post, so we keep the post and someone else fills it.');
}

/** Red-black "lining up" analogy: shortest line (all black), longest line (black, red, ...), and a forbidden red-red pair. */
export function schoolLines() {
  const s = new Sketch(340, 318, 47);
  const rows = [
    { title: 'Shortest line: all black, 3 students', shirts: 'BBB', color: C.ink },
    { title: 'Longest line: 6 students = 2 × 3', shirts: 'BRBRBR', color: C.ink },
    { title: 'Not allowed: two reds side by side', shirts: 'BRRB', color: C.red },
  ];
  rows.forEach((row, r) => {
    const top = 6 + r * 104, base = top + 92;
    s.text(170, top + 14, row.title, { font: 'body', size: 13, weight: 800, color: row.color });
    s.text(19, base - 30, 'front', { font: 'body', size: 10, weight: 800, color: C.soft });
    [...row.shirts].forEach((c, i) => {
      const x = 56 + i * 46, k = 11 / 16, cy = base - 44;
      const fill = c === 'B' ? C.ink : C.red;
      s.path(`M${x - 16} ${base} Q${x - 15} ${base - 27} ${x} ${base - 31} Q${x + 15} ${base - 27} ${x + 16} ${base} Z`, { fill, stroke: fill, sw: 1.6 });
      s.text(x, base - 9, c, { font: 'body', size: 12, weight: 800, color: '#fff' });
      face(s, x, cy, 11, '#e3b38c', 'happy');
      s.path(`M${x - 16 * k} ${cy - 2 * k} Q${x - 15 * k} ${cy - 22 * k} ${x} ${cy - 20 * k} Q${x + 15 * k} ${cy - 22 * k} ${x + 16 * k} ${cy - 2 * k} Q${x + 8 * k} ${cy - 14 * k} ${x} ${cy - 13 * k} Q${x - 8 * k} ${cy - 14 * k} ${x - 16 * k} ${cy - 2 * k} Z`, { fill: C.ink, sw: 1, rough: 0.4 });
    });
    if (r === 2) s.ellipse(56 + 1.5 * 46, base - 30, 110, 74, { stroke: C.red, sw: 1.4, single: true });
  });
  // Rough.js writes ~15 decimals per number; 1 decimal looks the same and cuts the size a lot (phones on mobile data).
  return s.svg('Three lines of students. Shortest line: 3 students, all in black shirts. Longest line: 6 students, alternating black, red, black, red, black, red, still with 3 black shirts, so it is 2 times as long. Not allowed: a line where two red-shirt students stand side by side, circled in red. Every line starts with a black shirt at the front.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** AVL hook: a Mati pedicab, front vs back (the real way they become unbalanced).
 *  Left: top view (front at the top): driver front-left, front seat beside him, two back benches facing each other.
 *  Right: side view (front on the right). Before: 4 at the back, front seat empty -> tilts backward (front wheel lifts,
 *  bottom nearly scrapes, back wheels strained). After: the orange passenger moved to the front seat -> level. */
export function pedicabTilt() {
  const s = new Sketch(340, 430, 61);
  const top = (x, y, face, shirt, edge) => {   // a person seen from above; face = 'up' | 'left' | 'right'
    const side = face !== 'up';
    s.ellipse(x, y, side ? 13 : 26, side ? 26 : 13, { fill: shirt, stroke: edge, sw: 1.4 });
    const dx = face === 'right' ? 3 : face === 'left' ? -3 : 0, dy = face === 'up' ? -3 : 0;
    s.circle(x + dx, y + dy, 13, { fill: C.ink, sw: 1 });
  };
  const blue = '#4f86b8';
  [0, 1].forEach((p) => {
    const T = p * 215;
    s.text(170, T + 16, p ? 'After: one moved to the front seat' : 'Before: everyone at the back', { font: 'body', size: 13, weight: 800, color: p ? C.teal : C.red });
    // top view
    s.text(95, T + 36, '▲ front', { font: 'body', size: 10, weight: 800, color: C.soft });
    s.round(20, T + 42, 150, 162, 14, { fill: C.red, sw: 2 });
    s.rect(30, T + 50, 40, 52, { fill: C.sky, stroke: blue, sw: 1.4 });                     // driver's seat
    top(50, T + 74, 'up', C.butter, C.amber);
    s.text(50, T + 98, 'driver', { font: 'body', size: 9, weight: 800, color: C.ink });
    s.rect(78, T + 64, 82, 38, { fill: C.tealWash, stroke: C.teal, sw: 1.4 });              // front seat
    if (p) top(119, T + 86, 'up', C.orangeWash, C.orange);
    else s.text(119, T + 88, 'front seat', { font: 'body', size: 9, weight: 700, color: C.teal });
    s.rect(30, T + 110, 130, 86, { fill: C.paper, stroke: C.ink, sw: 1.2 });               // back floor
    s.rect(32, T + 112, 26, 82, { fill: C.tealWash, stroke: C.teal, sw: 1.3 });            // left bench
    s.rect(132, T + 112, 26, 82, { fill: C.tealWash, stroke: C.teal, sw: 1.3 });           // right bench
    top(45, T + 132, 'right', C.tealWash, C.teal);
    top(45, T + 174, 'right', C.pink, C.red);
    top(145, T + 132, 'left', C.sky, blue);
    if (p) {
      s.circle(145, T + 174, 16, { stroke: C.orange, sw: 1.2, single: true, fill: 'none' });  // empty spot
      // thick orange arrow with a white halo so it stands out on red/teal/blue (checked in a plain render)
      s.curve(128, T + 172, 112, T + 98, 12, { stroke: '#fff', sw: 7, head: 11, single: true });
      s.curve(128, T + 172, 112, T + 98, 12, { stroke: C.orange, sw: 3.5, head: 11, single: true });
    } else top(145, T + 174, 'left', C.orangeWash, C.orange);
    // side view from the passenger side (front on the right): back of the cab closed with a window,
    // front of the cab open (front seat and the driver beyond it visible), motorcycle front wheel ahead.
    const gy = T + 180, rw = 232;
    s.text(262, T + 40, p ? 'Level!' : 'Tilts back!', { font: 'body', size: 14, weight: 800, color: p ? C.teal : C.red });
    s.text(262, T + 54, p ? 'nobody got off' : 'bottom nearly scrapes,', { font: 'body', size: 10, weight: 700, color: p ? C.teal : C.red });
    if (!p) s.text(262, T + 67, 'back wheels strained', { font: 'body', size: 10, weight: 700, color: C.red });
    if (!p) s.raw(`<g transform="rotate(-11 ${rw} ${gy})">`);
    s.line(324, gy - 11, 318, gy - 56, { sw: 2.2 });                                         // motorcycle fork
    s.circle(318, gy - 58, 8, { fill: C.butter, sw: 1.2 });                                  // headlight
    s.circle(324, gy - 11, 22, { fill: C.ink, sw: 1 });                                      // motorcycle front wheel
    // driver on the far side, seated on the motorcycle seat beside the front seat (checked in a plain render)
    s.path(`M300 ${gy - 30} L316 ${gy - 30} L319 ${gy - 44} L312 ${gy - 44} Z`, { fill: C.soft, stroke: C.ink, sw: 1 }); // motorcycle body
    s.round(286, gy - 37, 26, 7, 3, { fill: C.ink, sw: 1 });                                 // motorcycle seat
    s.path(`M290 ${gy - 37} Q291 ${gy - 57} 299 ${gy - 59} Q307 ${gy - 57} 308 ${gy - 37} Z`, { fill: C.butter, stroke: C.amber, sw: 1.3 }); // shirt
    s.circle(299, gy - 66, 12, { fill: C.ink, sw: 1 });                                      // head
    s.round(297, gy - 44, 18, 7, 3, { fill: '#8a6d4b', stroke: C.ink, sw: 1 });             // thigh, forward
    s.round(309, gy - 41, 6, 18, 3, { fill: '#8a6d4b', stroke: C.ink, sw: 1 });             // shin, down to the footrest
    s.line(304, gy - 50, 316, gy - 52, { stroke: C.amber, sw: 2.4 });                        // arm
    s.line(314, gy - 56, 320, gy - 50, { sw: 2 });                                           // handlebar
    s.rect(266, gy - 58, 8, 30, { fill: C.soft, stroke: C.ink, sw: 1.1 });                  // front seat back
    s.rect(266, gy - 32, 30, 8, { fill: C.soft, stroke: C.ink, sw: 1.1 });                  // front seat cushion
    if (p) {                                                                                  // orange passenger, facing front
      s.path(`M268 ${gy - 30} Q267 ${gy - 52} 278 ${gy - 55} Q288 ${gy - 52} 288 ${gy - 30} Z`, { fill: C.orangeWash, stroke: C.orange, sw: 1.4 });
      s.circle(279, gy - 63, 14, { fill: C.ink, sw: 1 });
      s.round(272, gy - 37, 24, 9, 4, { fill: '#4f86b8', stroke: C.ink, sw: 1 });              // lap (thigh)
      s.round(288, gy - 34, 8, 20, 3, { fill: '#4f86b8', stroke: C.ink, sw: 1 });              // shin, feet behind the sill
    }
    s.path(`M262 ${gy - 24} L322 ${gy - 24} L322 ${gy - 12} L262 ${gy - 12} Z`, { fill: C.red, stroke: C.ink, sw: 1.4 }); // low front sill
    // closed back
    s.path(`M200 ${gy - 12} L200 ${gy - 76} L262 ${gy - 76} L262 ${gy - 12} Z`, { fill: C.paper, sw: 1.8 });
    s.rect(206, gy - 70, 50, 24, { fill: C.sky, stroke: C.ink, sw: 1.2 });                  // back window
    const heads = p ? [[238, C.sky, blue]] : [[222, C.sky, blue], [242, C.orangeWash, C.orange]];
    heads.forEach(([x, f2, e2]) => { s.path(`M${x - 8} ${gy - 46} Q${x - 7} ${gy - 55} ${x} ${gy - 56} Q${x + 7} ${gy - 55} ${x + 8} ${gy - 46} Z`, { fill: f2, stroke: e2, sw: 1.1 }); s.circle(x, gy - 61, 11, { fill: C.ink, sw: 0.8 }); });
    s.path(`M200 ${gy - 12} L200 ${gy - 42} L262 ${gy - 42} L262 ${gy - 12} Z`, { fill: C.red, stroke: C.ink, sw: 1.5 });
    s.line(202, gy - 32, 260, gy - 32, { stroke: '#fff', sw: 3, single: true });
    s.line(322, gy - 24, 322, gy - 82, { sw: 2 });                                            // front roof post
    s.path(`M196 ${gy - 76} L196 ${gy - 86} Q200 ${gy - 90} 210 ${gy - 90} L322 ${gy - 90} Q328 ${gy - 88} 326 ${gy - 80} L196 ${gy - 76} Z`, { fill: C.ink, sw: 1.3 }); // black canvas roof
    s.circle(rw, gy - 11, 22, { fill: C.ink, sw: 1 });                                         // cab wheel (back)
    if (!p) s.raw('</g>');
    s.line(186, gy, 330, gy, { stroke: C.soft, sw: 1.2, single: true });
    if (!p) for (const [x1, y1, x2, y2] of [[196, gy - 2, 188, gy - 8], [200, gy - 1, 196, gy - 11], [205, gy - 1, 206, gy - 11]]) s.line(x1, y1, x2, y2, { stroke: C.red, sw: 1.3, single: true });
    s.text(206, gy + 14, 'back', { font: 'body', size: 10, weight: 700, color: C.soft });
    s.text(312, gy + 14, 'front', { font: 'body', size: 10, weight: 700, color: C.soft });
  });
  return s.svg('A Mati pedicab, twice. Each time, a top view on the left, front at the top: the driver sits at the front left with the front seat beside him, and at the back two benches face each other. A side view from the passenger side is on the right, front on the right: the back of the cab is closed with a window, the front is open, showing the front seat and the driver beyond it. Before: all four passengers, one in orange, sit on the back benches and the front seat is empty; from the side, the pedicab tilts backward, its front wheel lifts, its bottom nearly scrapes the road, and the back wheels are strained. After: the passenger in orange has moved to the front seat; from the side, it is level. Nobody got off.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Four everyday IT graphs: a home network, friends on social media, a map with travel minutes, and web pages with links. */
export function graphsInIT() {
  const s = new Sketch(340, 504, 73);
  const BLUE = '#2f6fa8', DARK = '#a8650f';
  // line from a to b, trimmed ta units at a and tb units at b
  const seg = (a, b, ta, tb, o = {}, arrow = false) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const p = [a[0] + ux * ta, a[1] + uy * ta, b[0] - ux * tb, b[1] - uy * tb].map((v) => Math.round(v * 10) / 10);
    return arrow ? s.arrow(...p, o) : s.line(...p, o);
  };
  const panel = (x0, y0, title, color, l1, l2) => {
    s.round(x0, y0, 164, 230, 12, { fill: C.card, sw: 1.4, stroke: C.soft, rough: 0.5 });
    s.text(x0 + 82, y0 + 24, title, { font: 'body', size: 15, weight: 800, color });
    s.text(x0 + 82, y0 + 200, l1, { font: 'body', size: 12, weight: 700, color: C.soft });
    s.text(x0 + 82, y0 + 217, l2, { font: 'body', size: 12, weight: 700, color: C.soft });
  };
  const label = (x, y, t) => s.text(x, y, t, { font: 'body', size: 12, weight: 700 });

  // 1. Home network: four devices linked to one Wi-Fi router
  {
    const x0 = 4, y0 = 4;
    panel(x0, y0, 'Computer network', C.teal, 'vertices: devices', 'edges: cables or Wi-Fi');
    const R = [x0 + 82, y0 + 112];
    const D = [[x0 + 34, y0 + 60, 'laptop'], [x0 + 130, y0 + 60, 'phone'], [x0 + 34, y0 + 146, 'printer'], [x0 + 130, y0 + 146, 'tablet']];
    D.forEach(([x, y]) => seg([x, y], R, 20, 22, { sw: 1.6, stroke: C.teal }));
    s.line(R[0] - 8, R[1] - 10, R[0] - 12, R[1] - 24, { sw: 1.5 }); s.line(R[0] + 8, R[1] - 10, R[0] + 12, R[1] - 24, { sw: 1.5 });
    s.round(R[0] - 20, R[1] - 10, 40, 20, 5, { fill: C.tealWash, sw: 1.6, rough: 0.6 });
    [-8, 0, 8].forEach((d) => s.circle(R[0] + d, R[1], 3, { fill: C.teal, sw: 0.8 }));
    label(R[0], R[1] + 26, 'router');
    D.forEach(([x, y, n]) => {
      if (n === 'laptop') { s.rect(x - 15, y - 14, 30, 20, { fill: C.sky, sw: 1.5, rough: 0.6 }); s.path(`M${x - 19} ${y + 6} H${x + 19} L${x + 16} ${y + 11} H${x - 16} Z`, { fill: C.butter, sw: 1.4 }); }
      else if (n === 'phone') { s.round(x - 9, y - 16, 18, 30, 4, { fill: C.sky, sw: 1.5, rough: 0.6 }); s.circle(x, y + 9, 3, { fill: C.card, sw: 0.8 }); }
      else if (n === 'printer') { s.rect(x - 9, y - 16, 18, 10, { fill: C.card, sw: 1.3, rough: 0.5 }); s.round(x - 16, y - 7, 32, 16, 4, { fill: C.butter, sw: 1.5, rough: 0.6 }); s.rect(x - 9, y + 5, 18, 9, { fill: C.card, sw: 1.3, rough: 0.5 }); }
      else { s.round(x - 15, y - 13, 30, 24, 4, { fill: C.sky, sw: 1.5, rough: 0.6 }); }
      label(x, y + 30, n);
    });
  }

  // 2. Social media: friendships; Bea is a friend of two of your friends
  {
    const x0 = 172, y0 = 4;
    panel(x0, y0, 'Social media', C.orange, 'vertices: people', 'edges: friendships');
    const P = { You: [x0 + 38, y0 + 72], Ana: [x0 + 126, y0 + 72], Migs: [x0 + 38, y0 + 146], Bea: [x0 + 126, y0 + 146] };
    [['You', 'Ana'], ['You', 'Migs'], ['Ana', 'Bea'], ['Migs', 'Bea']].forEach(([a, b]) => seg(P[a], P[b], 24, 24, { sw: 1.8, stroke: C.orange }));
    const a = P.You, b = P.Bea, L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
    s.raw(`<line x1="${(a[0] + ux * 24).toFixed(1)}" y1="${(a[1] + uy * 24).toFixed(1)}" x2="${(b[0] - ux * 24).toFixed(1)}" y2="${(b[1] - uy * 24).toFixed(1)}" stroke="${C.soft}" stroke-width="1.6" stroke-dasharray="5 5" stroke-linecap="round"/>`);
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    s.circle(m[0], m[1], 22, { fill: C.paper, sw: 1.3, stroke: C.soft });
    s.text(m[0], m[1] + 6, '?', { font: 'body', size: 16, weight: 800, color: C.soft });
    Object.entries(P).forEach(([n, [x, y]], i) => {
      const shirt = [C.orangeWash, C.tealWash, C.sky, C.pink][i];
      s.circle(x, y - 8, 18, { fill: C.butter, sw: 1.5 });
      s.path(`M${x - 13} ${y + 14} Q${x} ${y - 4} ${x + 13} ${y + 14} Z`, { fill: shirt, sw: 1.5 });
      label(x, i < 2 ? y - 24 : y + 30, n);
    });
  }

  // 3. Map: places joined by roads, with travel minutes (made-up)
  {
    const x0 = 4, y0 = 242;
    panel(x0, y0, 'Maps and delivery', DARK, 'vertices: places', 'edges: roads (minutes)');
    const P = { Home: [x0 + 36, y0 + 74], School: [x0 + 128, y0 + 74], Market: [x0 + 36, y0 + 150], Beach: [x0 + 128, y0 + 150] };
    const roads = [['Home', 'School', 10], ['Home', 'Market', 6], ['Market', 'Beach', 7], ['School', 'Beach', 4]];
    roads.forEach(([a, b]) => seg(P[a], P[b], 16, 16, { sw: 4, stroke: '#d9cfb8', single: true }));
    roads.forEach(([a, b, w]) => {
      const m = [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2];
      s.circle(m[0], m[1], 22, { fill: C.card, sw: 1.3, stroke: DARK });
      s.text(m[0], m[1] + 5, String(w), { font: 'body', size: 13, weight: 800, color: DARK });
    });
    Object.entries(P).forEach(([n, [x, y]], i) => {
      s.path(`M${x} ${y + 10} C${x - 4} ${y + 2} ${x - 11} ${y - 3} ${x - 11} ${y - 10} A11 11 0 1 1 ${x + 11} ${y - 10} C${x + 11} ${y - 3} ${x + 4} ${y + 2} ${x} ${y + 10} Z`, { fill: C.orangeWash, sw: 1.5, stroke: C.red });
      s.circle(x, y - 10, 7, { fill: C.card, sw: 1 });
      label(x, i < 2 ? y - 27 : y + 28, n);
    });
  }

  // 4. The web: pages and one-way links (arrows)
  {
    const x0 = 172, y0 = 242;
    panel(x0, y0, 'The web', BLUE, 'vertices: pages', 'edges: links (one way)');
    const P = { Home: [x0 + 82, y0 + 74], News: [x0 + 34, y0 + 148], Enroll: [x0 + 130, y0 + 148] };
    [['Home', 'News'], ['Home', 'Enroll'], ['News', 'Enroll']].forEach(([a, b]) => seg(P[a], P[b], 26, 30, { sw: 1.8, stroke: BLUE, head: 9 }, true));
    Object.entries(P).forEach(([n, [x, y]]) => {
      s.rect(x - 15, y - 19, 30, 38, { fill: C.card, sw: 1.5, rough: 0.6 });
      s.rect(x - 15, y - 19, 30, 8, { fill: C.sky, sw: 1.2, rough: 0.4 });
      [-3, 4, 11].forEach((d, i) => s.line(x - 9, y + d, x + (i === 2 ? 3 : 9), y + d, { sw: 1, stroke: C.soft, single: true }));
      label(x, n === 'Home' ? y - 26 : y + 34, n);
    });
  }

  s.text(170, 498, 'Same idea every time: things + connections', { size: 16, color: C.teal });
  return s.svg('Four graphs from IT. Computer network: a laptop, phone, printer, and tablet each linked to one Wi-Fi router. Social media: You are friends with Ana and Migs; both are friends with Bea, so the app asks "You may know Bea?". Maps and delivery: Home, School, Market, and Beach joined by roads marked with travel minutes 10, 6, 7, and 4. The web: the Home page links to News and Enroll, and News links to Enroll; links are one-way arrows.').replace(/(\d+\.\d)\d+/g, '$1');
}

/* ---------------- BFS lesson, Part 1 (chat 10) ---------------- */

/** Clean: a tree (one root, no cycles) vs a graph with a cycle, and the "seen" fix. */
export function treeVsGraph() {
  const T = C.teal, O = C.orange, R = C.red, ink = C.ink, soft = C.soft;
  const lab = (x, y, t, c = ink, a = 'middle', sz = 13, w = 700, f = 'Nunito, sans-serif') => `<text x="${x}" y="${y}" text-anchor="${a}" font-family='${f}' font-size="${sz}" font-weight="${w}" fill="${c}">${esc(t)}</text>`;
  const node = (x, y, t, fill = '#fff', stroke = ink) => `<circle cx="${x}" cy="${y}" r="14" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>` + lab(x, y + 5, t, ink, 'middle', 14, 800);
  const edge = (a, b, c = ink, extra = '') => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="1.8"${extra}/>`;
  const card = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#fff" stroke="#d9dedb" stroke-width="1.5"/>`;
  const head = (id, c) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0 1L9 5L0 9z" fill="${c}"/></marker>`;
  let s = `<svg class="objbox" viewBox="0 0 340 456" role="img" aria-label="A tree has one root and no cycles, so a traversal always ends. A graph has no root and can have a cycle: A, B, C, D, then back to A, again and again forever. The fix: keep a seen list. At D, the next vertex is A, but A is already seen, so it is skipped and the traversal ends."><defs>${head('tgO', O)}</defs>`;

  // Tree card
  s += card(4, 4, 164, 250) + lab(18, 30, 'Tree', T, 'start', 15, 800);
  const P = { A: [86, 70], B: [50, 122], C: [122, 122], D: [30, 174], E: [70, 174], F: [142, 174] };
  for (const [a, b] of [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F']]) s += edge(P[a], P[b]);
  for (const [k, [x, y]] of Object.entries(P)) s += node(x, y, k, k === 'A' ? C.butter : '#fff');
  s += lab(106, 58, 'root', O, 'start', 12, 800);
  s += lab(86, 220, 'one root: start here', soft, 'middle', 12) + lab(86, 238, 'no cycles: paths end', soft, 'middle', 12);

  // Graph card
  s += card(172, 4, 164, 250) + lab(186, 30, 'Graph', O, 'start', 15, 800);
  const G = { A: [214, 72], B: [294, 72], C: [294, 152], D: [214, 152] };
  for (const [a, b] of [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']]) s += edge(G[a], G[b]);
  for (const [k, [x, y]] of Object.entries(G)) s += node(x, y, k);
  // circling arrow in the middle of the cycle
  s += `<path d="M254 88 A 24 24 0 1 1 231 118" fill="none" stroke="${O}" stroke-width="2.2" marker-end="url(#tgO)"/>`;
  s += lab(254, 194, 'A, B, C, D, A, B, C, D, …', R, 'middle', 12, 800);
  s += lab(254, 220, 'no root: start anywhere', soft, 'middle', 12) + lab(254, 238, 'cycles: can loop forever', soft, 'middle', 12);

  // Fix card
  s += card(4, 266, 332, 178) + lab(18, 292, 'The fix: remember what you have seen', T, 'start', 15, 800);
  const F = { A: [44, 330], B: [118, 330], C: [118, 400], D: [44, 400] };
  for (const [a, b] of [['A', 'B'], ['B', 'C'], ['C', 'D']]) s += edge(F[a], F[b], T, ' stroke-width="2.4"');
  s += edge([44, 386], [44, 344], soft, ' stroke-dasharray="4 4"');
  for (const [k, [x, y]] of Object.entries(F)) s += node(x, y, k, k === 'D' ? C.orangeWash : C.tealWash, k === 'D' ? O : T);
  s += `<circle cx="44" cy="365" r="9" fill="#fff" stroke="${R}" stroke-width="1.6"/>` + lab(44, 370, '✗', R, 'middle', 13, 800);
  s += `<rect x="156" y="314" width="168" height="30" rx="7" fill="${C.tealWash}" stroke="${T}" stroke-width="1.4"/>`;
  s += lab(166, 334, 'seen:', T, 'start', 13, 800) + lab(208, 334, 'A ✓  B ✓  C ✓  D ✓', ink, 'start', 13, 700);
  s += lab(158, 370, 'At D, the next vertex is A.', ink, 'start', 12.5) + lab(158, 390, 'A is already seen: skip it.', R, 'start', 12.5, 800) + lab(158, 410, 'Each vertex is visited once.', ink, 'start', 12.5);
  return s + '</svg>';
}

/** Clean: the Part 3 graph (city) sorted into BFS levels from A, with the queue order underneath. */
export function bfsWaves() {
  const ink = C.ink, soft = C.soft;
  const lab = (x, y, t, c = ink, a = 'middle', sz = 13, w = 700) => `<text x="${x}" y="${y}" text-anchor="${a}" font-family='Nunito, sans-serif' font-size="${sz}" font-weight="${w}" fill="${c}">${esc(t)}</text>`;
  const band = ['#fdeee6', '#fdf5e0', '#e9f4f2', '#e9f1f8'];
  const box = [C.orangeWash, C.butter, C.tealWash, C.sky];
  const col = [C.orange, '#a8650f', C.teal, '#2f6fa8'];
  const sub = ['the start', '1 edge', '2 edges', '3 edges'];
  const xs = [4, 87, 170, 253, 336], top = 44, bot = 262;
  const curve = (x, up = true) => up ? `L${x} ${top} Q${x + 16} ${(top + bot) / 2} ${x} ${bot}` : `L${x} ${bot} Q${x + 16} ${(top + bot) / 2} ${x} ${top}`;
  let s = `<svg class="objbox" viewBox="0 0 340 356" role="img" aria-label="The graph from Part 3 sorted into levels from A. Level 0: A. Level 1, one edge away: B and D. Level 2, two edges away: C and E. Level 3, three edges away: F and G. The queue holds them in the same order: A, then B D, then C E, then F G.">`;
  s += lab(170, 28, 'BFS from A: one wave at a time', ink, 'middle', 15, 800);
  for (let i = 0; i < 4; i++) {
    const L = xs[i], Rr = xs[i + 1];
    const left = i === 0 ? `M${L} ${bot} L${L} ${top}` : `M${L} ${bot} Q${L + 16} ${(top + bot) / 2} ${L} ${top}`;
    const right = i === 3 ? `L${Rr} ${top} L${Rr} ${bot}` : `L${Rr} ${top} Q${Rr + 16} ${(top + bot) / 2} ${Rr} ${bot}`;
    s += `<path d="${left} ${right} Z" fill="${band[i]}"/>`;
    const cx = (L + Rr) / 2 + (i ? 4 : 0);
    s += lab(cx, 66, 'Level ' + i, col[i], 'middle', 14, 800) + lab(cx, 82, sub[i], soft, 'middle', 11.5, 700);
  }
  for (const x of xs.slice(1, 4)) s += `<path d="M${x} ${top} Q${x + 16} ${(top + bot) / 2} ${x} ${bot}" fill="none" stroke="${soft}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
  s += `<rect x="4" y="${top}" width="332" height="${bot - top}" rx="10" fill="none" stroke="#d9dedb" stroke-width="1.5"/>`;
  const P = { A: [46, 180], B: [130, 130], D: [130, 228], C: [214, 122], E: [214, 206], F: [297, 138], G: [297, 230] };
  const lvl = { A: 0, B: 1, D: 1, C: 2, E: 2, F: 3, G: 3 };
  for (const [a, b] of [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['D', 'E'], ['C', 'F'], ['E', 'F'], ['E', 'G'], ['F', 'G']]) s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="${soft}" stroke-width="1.8"/>`;
  for (const [k, [x, y]] of Object.entries(P)) s += `<circle cx="${x}" cy="${y}" r="16" fill="${box[lvl[k]]}" stroke="${col[lvl[k]]}" stroke-width="2"/>` + lab(x, y + 5, k, ink, 'middle', 15, 800);
  // queue strip
  s += lab(4, 290, 'The queue gets them in the same order:', soft, 'start', 12.5, 800);
  const groups = [['A'], ['B', 'D'], ['C', 'E'], ['F', 'G']];
  let x = 15;
  groups.forEach((g, i) => {
    const gx = x;
    for (const v of g) { s += `<rect x="${x}" y="300" width="40" height="32" fill="${box[i]}" stroke="${ink}" stroke-width="1.6"/>` + lab(x + 20, 322, v, ink, 'middle', 15, 800); x += 40; }
    s += lab((gx + x) / 2, 350, 'L' + i, col[i], 'middle', 12, 800);
    x += 10;
  });
  return s + '</svg>';
}

/** Sketch: news spreading through a block of houses, each house numbered by the wave that reaches it. */
export function newsWaves() {
  const s = new Sketch(340, 296, 41);
  const wall = { 1: '#f5bf45', 2: '#5dbcad', 3: '#8db3e6' };
  const roof = '#d9cfb8';
  const cx = (c) => 38 + 66 * c, by = (r) => 70 + 82 * r;
  for (let r = 0; r < 3; r++) s.line(6, by(r) + 1, 334, by(r) + 1, { sw: 1.2, stroke: C.soft, rough: 0.6 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
    const x = cx(c), y = by(r), d = Math.abs(c - 2) + Math.abs(r - 1), you = d === 0;
    s.path(`M${x - 25} ${y - 30} L${x} ${y - 52} L${x + 25} ${y - 30} Z`, { fill: you ? C.orange : roof, sw: 1.6 });
    s.rect(x - 20, y - 30, 40, 30, { fill: you ? C.orangeWash : wall[d], sw: 1.6, rough: 0.8 });
    if (you) s.text(x, y - 10, 'You', { font: 'body', size: 13, weight: 800, color: C.ink });
    else { s.circle(x, y - 15, 20, { fill: C.card, sw: 1.2 }); s.text(x, y - 10, String(d), { font: 'body', size: 13, weight: 800 }); }
  }
  // first wave: you tell your next-door neighbors (orange)
  const O = { stroke: C.orange, sw: 2.4, head: 8 };
  s.arrow(148, by(1) - 18, 126, by(1) - 18, O).arrow(192, by(1) - 18, 214, by(1) - 18, O);
  s.arrow(170, by(1) - 54, 170, by(0) + 4, O).arrow(170, by(1) + 4, 170, by(2) - 54, O);
  // second wave: one neighbor passes it on (amber)
  const A = { stroke: '#c98a1c', sw: 2.2, head: 8 };
  s.arrow(258, by(1) - 18, 280, by(1) - 18, A);
  s.arrow(236, by(1) - 54, 236, by(0) + 4, A).arrow(236, by(1) + 4, 236, by(2) - 54, A);
  // legend
  [['0', 'level 0', C.orangeWash], ['1', 'level 1', wall[1]], ['2', 'level 2', wall[2]], ['3', 'level 3', wall[3]]].forEach(([n, t, f], i) => {
    const x = 14 + i * 82;
    s.rect(x, 268, 20, 18, { fill: f, sw: 1.3, rough: 0.6 });
    s.text(x + 10, 282, n, { font: 'body', size: 12, weight: 800 });
    s.text(x + 28, 282, t, { font: 'body', size: 13, weight: 700, anchor: 'start', color: C.soft });
  });
  return s.svg('A block of 15 houses in three rows, with your house in the middle (level 0: you already know the news). Your four next-door houses are marked 1 (level 1): they hear the news first (orange arrows from your house). Houses two steps away are marked 2, and the four corner houses, three steps away, are marked 3. Amber arrows show one of your neighbors passing the news on to its own neighbors.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: three places BFS shows up in IT (friend suggestions, fewest hops, web crawler). */
export function bfsInIT() {
  const s = new Sketch(340, 664, 53);
  const BLUE = '#2f6fa8', DARK = '#a8650f';
  const seg = (a, b, ta, tb, o = {}, arrow = false) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const p = [a[0] + ux * ta, a[1] + uy * ta, b[0] - ux * tb, b[1] - uy * tb].map((v) => Math.round(v * 10) / 10);
    return arrow ? s.arrow(...p, o) : s.line(...p, o);
  };
  const panel = (y0, h, title, color, note) => {
    s.round(4, y0, 332, h, 12, { fill: C.card, sw: 1.4, stroke: C.soft, rough: 0.5 });
    s.text(18, y0 + 28, title, { font: 'body', size: 15, weight: 800, color, anchor: 'start' });
    s.text(170, y0 + h - 16, note, { font: 'body', size: 12, weight: 700, color: C.soft });
  };
  const t = (x, y, str, o = {}) => s.text(x, y, str, { font: 'body', size: 12, weight: 700, ...o });

  // 1. People you may know
  {
    const y0 = 4;
    panel(y0, 204, 'People you may know', C.orange, 'Bea and Carlo are friends of your friends (level 2).');
    const P = { You: [42, y0 + 106, 0], Ana: [126, y0 + 78, 1], Migs: [126, y0 + 138, 1], Bea: [210, y0 + 78, 2], Carlo: [210, y0 + 138, 2] };
    [['You', 'Ana'], ['You', 'Migs'], ['Ana', 'Bea'], ['Migs', 'Bea'], ['Migs', 'Carlo']].forEach(([a, b]) => seg(P[a], P[b], 20, 20, { sw: 1.8, stroke: C.orange }));
    const shirt = [C.orangeWash, C.tealWash, C.sky];
    Object.entries(P).forEach(([n, [x, y, l]]) => {
      s.circle(x, y - 8, 16, { fill: C.butter, sw: 1.5 });
      s.path(`M${x - 12} ${y + 13} Q${x} ${y - 4} ${x + 12} ${y + 13} Z`, { fill: shirt[l], sw: 1.5 });
      t(x, n === 'You' ? y + 30 : (y < y0 + 100 ? y - 22 : y + 30), n);
      t(n === 'You' ? x - 15 : x + 15, y + 12, 'L' + l, { size: 10.5, weight: 800, color: C.teal, anchor: n === 'You' ? 'end' : 'start' });
    });
    s.round(252, y0 + 66, 74, 86, 8, { fill: C.orangeWash, sw: 1.3, stroke: C.orange, rough: 0.5 });
    t(289, y0 + 88, 'Suggested', { size: 12, weight: 800, color: C.orange });
    t(289, y0 + 114, 'Bea  +', { size: 13 });
    t(289, y0 + 138, 'Carlo  +', { size: 13 });
  }

  // 2. Fewest hops in a network
  {
    const y0 = 220;
    panel(y0, 208, 'Fewest hops', C.teal, 'One link = one hop. BFS finds the fewest hops.');
    const PC = [36, y0 + 104], SV = [304, y0 + 104];
    const top = [[122, y0 + 70], [214, y0 + 70]], low = [[104, y0 + 140], [170, y0 + 140], [236, y0 + 140]];
    [PC, ...top, SV].forEach((p, i, a) => i && seg(a[i - 1], p, 22, 22, { sw: 3.2, stroke: C.teal }));
    [PC, ...low, SV].forEach((p, i, a) => i && seg(a[i - 1], p, 22, 22, { sw: 1.6, stroke: '#9aa7a8' }));
    for (const [x, y] of [...top, ...low]) {
      s.round(x - 17, y - 9, 34, 18, 5, { fill: C.tealWash, sw: 1.4, rough: 0.6 });
      [-7, 0, 7].forEach((d) => s.circle(x + d, y, 3, { fill: C.teal, sw: 0.7 }));
    }
    s.rect(PC[0] - 15, PC[1] - 14, 30, 20, { fill: C.sky, sw: 1.5, rough: 0.6 });
    s.path(`M${PC[0] - 19} ${PC[1] + 6} H${PC[0] + 19} L${PC[0] + 16} ${PC[1] + 11} H${PC[0] - 16} Z`, { fill: C.butter, sw: 1.4 });
    t(PC[0], PC[1] + 30, 'your PC');
    s.rect(SV[0] - 12, SV[1] - 20, 24, 40, { fill: C.card, sw: 1.5, rough: 0.6 });
    [-10, 0, 10].forEach((d) => s.line(SV[0] - 7, SV[1] + d, SV[0] + 7, SV[1] + d, { sw: 1.2, single: true }));
    t(SV[0], SV[1] + 36, 'server');
    t(168, y0 + 52, '3 hops ✓', { size: 13, weight: 800, color: C.teal });
    t(170, y0 + 164, '4 hops', { size: 12, color: C.soft });
  }

  // 3. Web crawler
  {
    const y0 = 440;
    panel(y0, 220, 'Web crawler', DARK, 'It visits pages 1 link away, then 2 links away.');
    const page = (x, y, f) => {
      s.path(`M${x - 11} ${y - 14} H${x + 5} L${x + 11} ${y - 8} V${y + 14} H${x - 11} Z`, { fill: f, sw: 1.4, rough: 0.6 });
      [-3, 3, 9].forEach((d) => s.line(x - 6, y + d, x + 6, y + d, { sw: 1, single: true, stroke: C.soft }));
    };
    const L0 = [40, y0 + 104], L1 = [[126, y0 + 64], [126, y0 + 104], [126, y0 + 144]], L2 = [[214, y0 + 64], [214, y0 + 104], [214, y0 + 144]];
    L1.forEach((p) => seg(L0, p, 18, 18, { sw: 1.6, stroke: DARK, head: 7 }, true));
    [[0, 0], [0, 1], [1, 1], [2, 2]].forEach(([a, b]) => seg(L1[a], L2[b], 16, 17, { sw: 1.4, stroke: C.soft, head: 7 }, true));
    page(...L0, C.butter); L1.forEach((p) => page(...p, C.orangeWash)); L2.forEach((p) => page(...p, C.sky));
    t(40, y0 + 176, 'level 0', { size: 11.5, color: C.soft });
    t(126, y0 + 176, 'level 1', { size: 11.5, color: C.soft });
    t(214, y0 + 176, 'level 2', { size: 11.5, color: C.soft });
    // crawler bot
    const bx = 290, byy = y0 + 102;
    s.line(bx, byy - 22, bx, byy - 32, { sw: 1.4 }); s.circle(bx, byy - 34, 6, { fill: C.orange, sw: 1.2 });
    s.round(bx - 20, byy - 22, 40, 32, 8, { fill: C.tealWash, sw: 1.6, rough: 0.6 });
    s.circle(bx - 8, byy - 7, 7, { fill: C.ink, sw: 0.8 }); s.circle(bx + 8, byy - 7, 7, { fill: C.ink, sw: 0.8 });
    t(bx, byy + 28, 'crawler', { size: 12 });
  }
  return s.svg('Three places BFS is used in IT. People you may know: You are friends with Ana and Migs (level 1); Bea and Carlo are their friends (level 2), so the app suggests Bea and Carlo. Fewest hops: from your PC to a server, the top route through 2 routers takes 3 hops and the bottom route through 3 routers takes 4 hops; BFS finds the 3-hop route. Web crawler: a robot starts at one page, collects the 3 pages it links to (level 1), then the pages those link to (level 2).').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: a canteen line = a queue (served at the front, join at the rear). */
export function canteenLine() {
  const s = new Sketch(340, 212, 29);
  s.line(4, 150, 336, 150, { sw: 1.4, stroke: C.soft, rough: 0.6 });
  s.text(31, 86, 'Canteen', { size: 15, color: C.ink });
  s.rect(6, 96, 50, 54, { fill: C.butter, sw: 1.6, rough: 0.8 });
  s.rect(12, 104, 38, 10, { fill: C.orangeWash, sw: 1.1, rough: 0.6 });
  const shirts = [C.orangeWash, C.tealWash, C.sky, C.pink];
  const person = (x, f, n, dashed = false) => {
    s.circle(x, 98, 22, { fill: C.butter, sw: 1.5 });
    s.path(`M${x - 16} 148 Q${x - 15} 112 ${x} 112 Q${x + 15} 112 ${x + 16} 148 Z`, { fill: f, sw: 1.5 });
    if (n) s.text(x, 140, n, { font: 'body', size: 13, weight: 800 });
  };
  [96, 146, 196, 246].forEach((x, i) => person(x, shirts[i], String(i + 1)));
  person(310, C.card, '');
  s.text(310, 140, 'new', { font: 'body', size: 11, weight: 800, color: C.teal });
  s.text(96, 64, 'front', { font: 'body', size: 13, weight: 800, color: C.orange });
  s.text(246, 64, 'rear', { font: 'body', size: 13, weight: 800, color: C.teal });
  s.arrow(80, 124, 62, 124, { stroke: C.orange, sw: 2.4, head: 8 });
  s.arrow(292, 124, 266, 124, { stroke: C.teal, sw: 2.4, head: 8 });
  s.text(76, 178, 'served first, leaves', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(76, 196, 'the front = dequeue', { font: 'body', size: 12.5, weight: 800, color: C.orange });
  s.text(264, 178, 'joins at the rear', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(264, 196, '= enqueue', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  return s.svg('A canteen line of four students numbered 1 to 4. Student 1 at the front is served first and leaves: that is dequeue. A new student joins at the rear, behind student 4: that is enqueue.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean stepper pictures: ONE queue changing during BFS from A on the city graph (lab colors). For StepShow. */
export function queueSteps() {
  const ink = C.ink, soft = C.soft, T = C.teal, O = C.orange;
  const lab = (x, y, t, c = ink, a = 'middle', sz = 13, w = 700) => `<text x="${x}" y="${y}" text-anchor="${a}" font-family='Nunito, sans-serif' font-size="${sz}" font-weight="${w}" fill="${c}">${esc(t)}</text>`;
  const P = { A: [46, 58], B: [128, 28], D: [128, 88], C: [212, 24], E: [212, 74], F: [296, 34], G: [296, 90] };
  const E = [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['D', 'E'], ['C', 'F'], ['E', 'F'], ['E', 'G'], ['F', 'G']];
  const lvl = { A: 0, B: 1, D: 1, C: 2, E: 2, F: 3, G: 3 };
  // [visiting, queue after, newly added, visited so far, sentence]
  const S = [
    [null, 'A', 'A', '', 'Start: tick <b>A</b> on the seen list (✓) and put it in the queue. This is the <b>only</b> queue BFS uses.'],
    ['A', 'BD', 'BD', 'A', '<b>A</b> leaves the front (we visit A). Its neighbors B and D have no ✓ yet, so tick <b>B</b> and <b>D</b> and add them at the rear.'],
    ['B', 'DCE', 'CE', 'AB', '<b>B</b> leaves the front. Its neighbors: A already has a ✓, so skip it. C and E do not, so tick <b>C</b> and <b>E</b> and add them at the rear, <b>behind D</b>.'],
    ['D', 'CE', '', 'ABD', '<b>D</b> leaves the front. Its neighbors A and E both have a ✓ already, so nothing joins.'],
    ['C', 'EF', 'F', 'ABDC', '<b>C</b> leaves the front. B has a ✓; F does not, so tick <b>F</b> and add it at the rear.'],
    ['E', 'FG', 'G', 'ABDCE', '<b>E</b> leaves the front. B, D, and F have a ✓; only G does not, so tick <b>G</b> and add it at the rear.'],
    ['F', 'G', '', 'ABDCEF', '<b>F</b> leaves the front. C, E, and G all have a ✓, so nothing joins.'],
    ['G', '', '', 'ABDCEFG', '<b>G</b> leaves the front. Nothing joins, and the queue is <b>empty</b>, so BFS is done. Visit order: A, B, D, C, E, F, G.'],
  ];
  return S.map(([cur, q, add, done, say]) => {
    let s = `<svg class="objbox" viewBox="0 0 340 290" role="img" aria-label="${esc(say.replace(/<[^>]+>/g, ''))}">`;
    // mini graph in lab colors
    for (const [a, b] of E) s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#b9c3c2" stroke-width="1.6"/>`;
    for (const [k, [x, y]] of Object.entries(P)) {
      const st = k === cur ? 'cur' : done.includes(k) ? 'done' : q.includes(k) ? 'q' : 'new';
      const fill = { cur: O, done: T, q: C.tealWash, new: '#fff' }[st], stroke = { cur: O, done: T, q: T, new: '#9aa7a8' }[st];
      s += `<circle cx="${x}" cy="${y}" r="13" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>` + lab(x, y + 5, k, st === 'cur' || st === 'done' ? '#fff' : ink, 'middle', 13, 800);
    }
    // the one queue
    const X = 92, W = 46, Y = 140;
    s += lab(X - 2, Y + 58, 'front', O, 'start', 12, 800) + lab(X + 3 * W + 70, Y + 58, 'rear', T, 'end', 12, 800);
    s += `<rect x="${X - 6}" y="${Y - 4}" width="${3 * W + 12 + 74}" height="44" rx="8" fill="#fff" stroke="${soft}" stroke-width="1.6"/>`;
    s += lab(X + (3 * W + 86) / 2 - 6, Y + 58, 'the queue', soft, 'middle', 11.5, 700);
    if (!q) s += lab(X + 8, Y + 25, 'empty', soft, 'start', 13, 800);
    [...q].forEach((v, j) => {
      const isNew = add.includes(v);
      s += `<rect x="${X + j * W}" y="${Y}" width="${W - 4}" height="36" rx="5" fill="${C.tealWash}" stroke="${T}" stroke-width="${isNew ? 2.4 : 1.6}"/>` + lab(X + j * W + (W - 4) / 2, Y + 24, v, ink, 'middle', 15, 800);
      if (isNew) s += lab(X + j * W + (W - 4) / 2, Y - 10, 'new', T, 'middle', 11, 800);
    });
    if (add) s += `<path d="M334 ${Y + 18} H${X + 3 * W + 78}" stroke="${T}" stroke-width="2.2"/><path d="M${X + 3 * W + 78} ${Y + 18} l8 -5 v10 z" fill="${T}"/>`;
    if (cur) {
      s += `<rect x="10" y="${Y}" width="42" height="36" rx="5" fill="${O}" stroke="${O}" stroke-width="1.6"/>` + lab(31, Y + 24, cur, '#fff', 'middle', 15, 800);
      s += `<path d="M${X - 10} ${Y + 18} H58" stroke="${O}" stroke-width="2.2"/><path d="M56 ${Y + 18} l9 -5 v10 z" fill="${O}"/>`;
      s += lab(31, Y - 10, 'visit', O, 'middle', 12, 800);
    }
    s += lab(18, 224, 'Visited: ' + (done ? [...done].join(', ') : '(none yet)'), ink, 'start', 13, 800);
    // the seen list: ticked the moment a vertex joins the queue
    const seen = done + q + (cur && !done.includes(cur) ? cur : '');
    s += lab(18, 262, 'Seen:', T, 'start', 13, 800);
    [...'ABCDEFG'].forEach((v, i) => {
      const x = 66 + i * 38, on = seen.includes(v), nw = add.includes(v);
      s += `<rect x="${x}" y="242" width="34" height="30" rx="5" fill="${on ? C.tealWash : '#fff'}" stroke="${on ? T : '#c3cbca'}" stroke-width="${nw ? 2.6 : 1.4}"/>`;
      s += lab(x + 11, 262, v, on ? ink : '#9aa7a8', 'middle', 13, 800) + (on ? lab(x + 25, 262, '✓', T, 'middle', 12, 800) : '');
      if (nw) s += lab(x + 17, 286, 'new ✓', T, 'middle', 9.5, 800);
    });
    return { pic: s + '</svg>', say };
  });
}










/* ---- DFS pictures (dfs lesson). Clean style for the graph, sketch for the folder example. ---- */
const dfsLab = (x, y, t, c = C.ink, a = 'middle', sz = 13, w = 700) => `<text x="${x}" y="${y}" text-anchor="${a}" font-family='Nunito, sans-serif' font-size="${sz}" font-weight="${w}" fill="${c}">${esc(t)}</text>`;
const dfsCityPos = { A: [50, 50], B: [170, 40], C: [290, 55], D: [45, 185], E: [165, 150], F: [290, 175], G: [190, 228] };
const dfsCityEdges = [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['C', 'F'], ['D', 'E'], ['E', 'F'], ['E', 'G'], ['F', 'G']];
const dfsHead = (x1, y1, x2, y2, col, L = 9) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return `<path d="M${x2 - L * Math.cos(a - 0.45)} ${y2 - L * Math.sin(a - 0.45)} L${x2} ${y2} L${x2 - L * Math.cos(a + 0.45)} ${y2 - L * Math.sin(a + 0.45)}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
};
/** Straight arrow from node a to node b, trimmed so it starts/ends at the circle edges. */
const dfsEdgeArrow = (P, a, b, col, r = 17, sw = 3) => {
  const [x1, y1] = P[a], [x2, y2] = P[b], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
  const sx = x1 + ux * (r + 2), sy = y1 + uy * (r + 2), ex = x2 - ux * (r + 3), ey = y2 - uy * (r + 3);
  return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>` + dfsHead(sx, sy, ex, ey, col);
};
/** Dashed curved arrow from node a back to node b (bend = sideways bulge). */
const dfsBackArrow = (P, a, b, bend, col = C.teal, r = 17) => {
  const [x1, y1] = P[a], [x2, y2] = P[b], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
  const mx = (x1 + x2) / 2 - uy * bend, my = (y1 + y2) / 2 + ux * bend;
  const s1 = Math.atan2(my - y1, mx - x1), s2 = Math.atan2(my - y2, mx - x2);
  const sx = x1 + Math.cos(s1) * (r + 3), sy = y1 + Math.sin(s1) * (r + 3), ex = x2 + Math.cos(s2) * (r + 4), ey = y2 + Math.sin(s2) * (r + 4);
  return `<path d="M${sx} ${sy} Q${mx} ${my} ${ex} ${ey}" fill="none" stroke="${col}" stroke-width="2.4" stroke-dasharray="6 4" stroke-linecap="round"/>` + dfsHead(mx, my, ex, ey, col);
};
const dfsNode = (x, y, k, fill, stroke, r = 17) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` + dfsLab(x, y + 5, k, C.ink, 'middle', 15, 800);
const dfsShift = (dx, dy) => Object.fromEntries(Object.entries(dfsCityPos).map(([k, [x, y]]) => [k, [x + dx, y + dy]]));

/** Clean: DFS from A on the city graph: deep arrows, every back-up step, visit order strip. */
export function dfsDive() {
  const P = dfsShift(0, 48), O = C.orange, T = C.teal;
  let s = `<svg class="objbox" viewBox="0 0 340 414" role="img" aria-label="DFS from A on the main example graph. Orange arrows go deeper: A to B, B to C, C to F, F to E, E to D. D is a dead end, so a dashed arrow backs up to E. E goes deeper to G, another dead end, so DFS backs up to E again. Then dashed arrows back up from E to F, F to C, C to B, and B to A, where DFS ends. Visit order: A, B, C, F, E, D, G.">`;
  s += dfsLab(170, 24, 'DFS from A: go deep, then back up', C.ink, 'middle', 15, 800);
  for (const [a, b] of dfsCityEdges) s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#c9d0cd" stroke-width="1.6"/>`;
  for (const [a, b] of [['A', 'B'], ['B', 'C'], ['C', 'F'], ['F', 'E'], ['E', 'D'], ['E', 'G']]) s += dfsEdgeArrow(P, a, b, O);
  s += dfsBackArrow(P, 'D', 'E', 30) + dfsBackArrow(P, 'G', 'E', 30);
  for (const [a, b] of [['E', 'F'], ['F', 'C'], ['C', 'B'], ['B', 'A']]) s += dfsBackArrow(P, a, b, -22);
  for (const [k, [x, y]] of Object.entries(P)) s += dfsNode(x, y, k, k === 'A' ? C.butter : C.tealWash, k === 'A' ? '#a8650f' : T);
  s += dfsLab(P.A[0], P.A[1] - 24, 'start and end', '#a8650f', 'middle', 12, 800);
  s += dfsLab(P.D[0], P.D[1] + 34, 'dead end!', C.red, 'middle', 12.5, 800) + dfsLab(P.D[0], P.D[1] + 49, 'back up to E', T, 'middle', 12, 800);
  s += dfsLab(P.G[0] + 26, P.G[1] + 6, 'dead end!', C.red, 'start', 12.5, 800);
  s += dfsLab(170, 312, 'Then nothing new is left: back up E → F → C → B → A.', T, 'middle', 12.5, 800);
  const ly = 342;
  s += `<line x1="14" y1="${ly}" x2="44" y2="${ly}" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` + dfsHead(14, ly, 46, ly, O) + dfsLab(54, ly + 4, 'go deeper', C.ink, 'start', 12.5, 800);
  s += `<line x1="170" y1="${ly}" x2="200" y2="${ly}" stroke="${T}" stroke-width="2.4" stroke-dasharray="6 4"/>` + dfsHead(170, ly, 202, ly, T) + dfsLab(210, ly + 4, 'back up', C.ink, 'start', 12.5, 800);
  s += dfsLab(14, 372, 'Visit order:', C.soft, 'start', 12.5, 800);
  'ABCFEDG'.split('').forEach((v, i) => { const x = 98 + i * 33; s += `<rect x="${x}" y="357" width="30" height="28" rx="4" fill="${C.card}" stroke="${C.ink}" stroke-width="1.5"/>` + dfsLab(x + 15, 376, v, C.ink, 'middle', 14, 800) + dfsLab(x + 15, 402, String(i + 1), C.soft, 'middle', 11, 700); });
  return s + '</svg>';
}

/** Sketch: opening folders deep first. Orange = open (go deeper), teal dashed = Back. */
export function folderDive() {
  const s = new Sketch(340, 368, 53);
  const F = { Documents: [147, 22], ITC120: [60, 114], Photos: [234, 114], 'Week 9': [14, 208], 'Week 10': [110, 208] };
  const top = (k) => [F[k][0] + 23, F[k][1] - 4], below = (k) => [F[k][0] + 23, F[k][1] + 58];
  const O = { stroke: C.orange, sw: 2.4, head: 8, single: true, rough: 0.5 };
  const B = { stroke: C.teal, sw: 2.2, head: 8, single: true, rough: 0.4, dash: '6 5' };
  const open = (a, b) => { const [x1, y1] = below(a), [x2, y2] = top(b); s.arrow(x1, y1, x2, y2, O); };
  open('Documents', 'ITC120'); open('Documents', 'Photos'); open('ITC120', 'Week 9'); open('ITC120', 'Week 10');
  // Back: from the child's top corner to the parent's side, bulging outward
  s.curve(16, 204, 54, 132, 20, B);        // Week 9 -> ITC120
  s.curve(150, 204, 112, 132, -20, B);     // Week 10 -> ITC120
  s.curve(64, 110, 140, 40, -24, B);       // ITC120 -> Documents
  s.curve(276, 110, 200, 40, 24, B);       // Photos -> Documents
  for (const [k, [x, y]] of Object.entries(F)) s.folder(x, y, k, { fill: k === 'Documents' ? C.amber : C.butter });
  const order = { Documents: 1, ITC120: 2, 'Week 9': 3, 'Week 10': 4, Photos: 5 };
  for (const [k, n] of Object.entries(order)) { const [x, y] = F[k]; s.circle(x + 52, y + 4, 22, { fill: C.orangeWash, sw: 1.4 }); s.text(x + 52, y + 9, String(n), { font: 'body', size: 13, weight: 800 }); }
  for (const k of ['Week 9', 'Week 10', 'Photos']) s.text(F[k][0] + 23, F[k][1] + 66, '(empty)', { font: 'body', size: 11.5, weight: 700, color: C.soft });
  // path box while inside Week 9
  s.round(194, 206, 140, 84, 10, { fill: C.card, sw: 1.5, rough: 0.6 });
  s.text(264, 226, 'Inside Week 9:', { font: 'body', size: 12, weight: 800, color: C.soft });
  s.text(264, 246, 'Documents ›', { font: 'body', size: 13, weight: 800 });
  s.text(264, 263, 'ITC120 ›', { font: 'body', size: 13, weight: 800 });
  s.text(264, 280, 'Week 9', { font: 'body', size: 13, weight: 800, color: C.orange });
  // legend
  s.arrow(16, 312, 46, 312, O);
  s.text(54, 316, 'open (go deeper)', { font: 'body', size: 12.5, weight: 800, anchor: 'start' });
  s.arrow(186, 312, 216, 312, B);
  s.text(224, 316, 'Back (go back up)', { font: 'body', size: 12.5, weight: 800, anchor: 'start' });
  s.text(170, 344, 'Back remembers the way you came, newest first:', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(170, 362, 'that is a stack.', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  return s.svg('Folders opened deep first: 1 Documents, 2 ITC120, 3 Week 9. Week 9 is empty, so Back returns to ITC120, which opens 4 Week 10. Week 10 is empty, so Back returns to ITC120, then Back again to Documents, which opens 5 Photos. Photos is empty, so Back returns to Documents. While inside Week 9, the path reads Documents, ITC120, Week 9.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: DFS from A at D (a dead end). The stack is the path. Two stacks: before and after popping D. */
export function stackIsPath() {
  const P = dfsShift(2, 34), O = C.orange, T = C.teal;
  const path = ['A', 'B', 'C', 'F', 'E', 'D'];
  let s = `<svg class="objbox" viewBox="0 0 340 690" role="img" aria-label="DFS from A, at the moment it reaches D. The path A, B, C, F, E, D is drawn thick. Before: the stack, bottom to top, holds A, B, C, F, E, D, the same path, with D on top. D is a dead end, so pop D. After the pop, the stack holds A, B, C, F, E, and the new top is E, the vertex DFS came from.">`;
  s += dfsLab(170, 22, 'The stack is the path you are on', C.ink, 'middle', 15, 800);
  for (const [a, b] of dfsCityEdges) s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#c9d0cd" stroke-width="1.6"/>`;
  for (let i = 0; i + 1 < path.length; i++) { const [a, b] = [P[path[i]], P[path[i + 1]]]; s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${T}" stroke-width="5" stroke-linecap="round"/>`; }
  for (const [k, [x, y]] of Object.entries(P)) s += k === 'D' ? dfsNode(x, y, k, O, O) : path.includes(k) ? dfsNode(x, y, k, C.tealWash, T) : dfsNode(x, y, k, C.card, '#9aa5a2');
  s += dfsLab(P.D[0] - 2, P.D[1] + 36, 'you are here', O, 'start', 12.5, 800);
  s += dfsLab(P.G[0] + 24, P.G[1] + 5, 'not visited yet', C.soft, 'start', 12, 700);
  s += `<line x1="8" y1="314" x2="332" y2="314" stroke="#d9dedb" stroke-width="1.5"/>`;
  const bw = 64, bh = 34, base = 616;
  const col = (cx, items, head, l1, l2, c2) => {
    const x = cx - bw / 2, n = items.length, topY = base - n * bh;
    let o = dfsLab(cx, base + 28, head, C.ink, 'middle', 14, 800);
    o += `<path d="M${x - 6} ${topY - 14} L${x - 6} ${base + 4} L${x + bw + 6} ${base + 4} L${x + bw + 6} ${topY - 14}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    items.forEach((v, i) => { const y = base - (i + 1) * bh, isTop = i === n - 1;
      o += `<rect x="${x}" y="${y}" width="${bw}" height="${bh - 4}" rx="4" fill="${isTop ? O : C.tealWash}" stroke="${isTop ? O : T}" stroke-width="1.8"/>` + dfsLab(cx, y + 21, v, isTop ? C.card : C.ink, 'middle', 15, 800); });
    // label above, then a real arrow down to the top box
    const ly = topY - 70;
    o += dfsLab(cx, ly, l1, C.ink, 'middle', 12.5, 800) + dfsLab(cx, ly + 16, l2, c2, 'middle', 12.5, 800);
    o += `<line x1="${cx}" y1="${ly + 26}" x2="${cx}" y2="${topY - 22}" stroke="${c2}" stroke-width="2.2" stroke-linecap="round"/>` + dfsHead(cx, ly + 26, cx, topY - 20, c2, 8);
    return o;
  };
  s += col(84, path, 'Before', 'top = D, where you are', 'dead end, so pop D', O);
  s += col(256, path.slice(0, 5), 'After the pop', 'new top = E, the', 'vertex you came from', T);
  // pop arrow between the two stacks
  s += `<line x1="132" y1="510" x2="200" y2="510" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` + dfsHead(132, 510, 203, 510, O);
  s += dfsLab(166, 498, 'pop D', O, 'middle', 13, 800);
  s += dfsLab(170, 676, 'Bottom to top, each stack is the path from A.', C.soft, 'middle', 12.5, 800);
  return s + '</svg>';
}

/** Clean: the same moment (DFS from A has just visited D) in two stack routines. */
export function dfsTwoWays() {
  const O = C.orange, T = C.teal, G = '#9aa5a2';
  let s = `<svg class="objbox" viewBox="0 0 340 352" role="img" aria-label="The same moment in two stack routines, right after DFS from A visits D. Our way: the stack holds A, B, C, F, E, D, the path from A to D. Push-all way: the stack holds D, E, G, G from bottom to top. D and E are already visited and will be skipped, and G is in it twice. It is a to-do list, not a path.">`;
  s += dfsLab(170, 22, 'Just visited D: what is on each stack?', C.ink, 'middle', 15, 800);
  const bw = 64, bh = 32, base = 286;
  const col = (cx, items, head, sub) => {
    const x = cx - bw / 2, n = items.length;
    let o = dfsLab(cx, 52, head, C.ink, 'middle', 14, 800) + dfsLab(cx, 69, sub, C.soft, 'middle', 12, 700);
    o += `<path d="M${x - 6} ${base - 6 * bh - 12} L${x - 6} ${base + 4} L${x + bw + 6} ${base + 4} L${x + bw + 6} ${base - 6 * bh - 12}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    items.forEach(([v, kind, tag], i) => { const y = base - (i + 1) * bh;
      const fill = kind === 'top' ? O : kind === 'stale' ? '#eef0ef' : C.tealWash, st = kind === 'top' ? O : kind === 'stale' ? G : T;
      o += `<rect x="${x}" y="${y}" width="${bw}" height="${bh - 4}" rx="4" fill="${fill}" stroke="${st}" stroke-width="1.8"${kind === 'stale' ? ' stroke-dasharray="5 3"' : ''}/>` + dfsLab(cx, y + 20, v, kind === 'top' ? C.card : kind === 'stale' ? '#6b7774' : C.ink, 'middle', 15, 800);
      if (tag) o += dfsLab(x + bw + 12, y + 19, tag, kind === 'stale' ? C.red : T, 'start', 11.5, 800);
    });
    return o;
  };
  s += col(70, [['A'], ['B'], ['C'], ['F'], ['E'], ['D', 'top']], 'Our way', 'this course');
  s += col(220, [['D', 'stale', 'visited: skip'], ['E', 'stale', 'visited: skip'], ['G', 'todo', 'to do'], ['G', 'todo', 'again!']], 'Push-all way', 'some books');
  s += dfsLab(70, 316, 'the path A → … → D', T, 'middle', 12.5, 800);
  s += dfsLab(244, 316, 'a to-do list, not a path', C.red, 'middle', 12.5, 800);
  s += dfsLab(170, 342, 'Both end with the same visit order here: A B C F E D G.', C.soft, 'middle', 12, 700);
  return s + '</svg>';
}

/** Sketch: where DFS is used: a maze (dead end, back up) and tasks waiting in a circle. */
export function dfsInIT() {
  const s = new Sketch(340, 584, 61);
  const O = { stroke: C.orange, sw: 2.6, head: 8, single: true, rough: 0.5 };
  const B = { stroke: C.teal, sw: 2.2, head: 8, single: true, rough: 0.4, dash: '6 5' };
  // Panel 1: maze game with a cat (pink + purple + yellow). Wide hallways; one fork: up = dead end, down = goal.
  // Lanes: try-1 paws (purple) on one side, the dashed back-up on the other side, try-2 paws (pink) in the middle.
  const PU = '#8a5cc7', PK = '#e0559a', YE = '#f5c93d';
  s.round(4, 6, 332, 294, 12, { fill: C.card, sw: 1.5, stroke: C.soft, rough: 0.6 });
  s.text(18, 30, 'Solving a maze', { font: 'body', size: 15, weight: 800, anchor: 'start' });
  const FX = 132, FY = 150, TOP = 88, BOT = 212;
  const halls = [`M62 ${FY} L${FX} ${FY}`, `M${FX} ${FY} L${FX} ${TOP} L250 ${TOP}`, `M${FX} ${FY} L${FX} ${BOT} L300 ${BOT}`];
  s.raw(halls.map((d) => `<path d="${d}" fill="none" stroke="${PU}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>`).join('')
    + halls.map((d) => `<path d="${d}" fill="none" stroke="#fff3c4" stroke-width="33" stroke-linecap="round" stroke-linejoin="round"/>`).join(''));
  // walk along a polyline, every `gap` units, offset sideways by `lane`; calls f(x, y, angle)
  const along = (pts, gap, lane, from, to, f) => {
    // even spacing on each straight part, and one paw exactly on every corner (turned halfway round the bend)
    // shift the whole path into its lane first (corners mitred), so spacing is measured along the lane the paws walk in
    const dir = (p, q) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / L, (q[1] - p[1]) / L]; };
    pts = pts.map((p, i) => { const u = i ? dir(pts[i - 1], p) : null, v = i < pts.length - 1 ? dir(p, pts[i + 1]) : null;
      const nx = (u ? -u[1] : 0) + (v ? -v[1] : 0), ny = (u ? u[0] : 0) + (v ? v[0] : 0); return [p[0] + nx * lane, p[1] + ny * lane]; });
    lane = 0;
    const segs = [];
    for (let i = 0; i + 1 < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], L = Math.hypot(x2 - x1, y2 - y1); segs.push({ x1, y1, ux: (x2 - x1) / L, uy: (y2 - y1) / L, L }); }
    segs.forEach((g, i) => {
      const a = i === 0 ? from : 0, b = i === segs.length - 1 ? g.L - to : g.L, n = Math.max(1, Math.round((b - a) / gap));
      for (let k = i === 0 ? 0 : 1; k <= n; k++) {
        const d = a + (b - a) * k / n, x = g.x1 + g.ux * d, y = g.y1 + g.uy * d;
        if (k === n && i < segs.length - 1) { const h = segs[i + 1];
          f(x - (g.uy + h.uy) * lane, y + (g.ux + h.ux) * lane, Math.atan2(g.uy + h.uy, g.ux + h.ux) * 180 / Math.PI);
        } else f(x - g.uy * lane, y + g.ux * lane, Math.atan2(g.uy, g.ux) * 180 / Math.PI);
      }
    });
  };
  const paw = (col) => (x, y, a) => s.raw(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a + 90})" fill="${col}"><ellipse cx="0" cy="1.6" rx="3.6" ry="3"/><circle cx="-3.6" cy="-2.5" r="1.5"/><circle cx="0" cy="-3.9" r="1.5"/><circle cx="3.6" cy="-2.5" r="1.5"/></g>`);
  const try1 = [[62, FY], [FX, FY], [FX, TOP], [250, TOP]], try2 = [[FX, FY], [FX, BOT], [300, BOT]];
  along(try1, 17, -6, 14, 14, paw(PU));
  along(try2, 17, 0, 20, 30, paw(PK));
  // back up: dashed purple in the other lane, from the dead end back to the fork
  const back = [[250 - 12, TOP + 8], [FX + 8, TOP + 8], [FX + 8, FY - 14]];
  s.raw(`<path d="M${back.map((p) => p.join(' ')).join(' L')}" fill="none" stroke="${PU}" stroke-width="2.4" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<path d="M${FX + 3} ${FY - 21} L${FX + 8} ${FY - 13} L${FX + 13} ${FY - 21}" fill="none" stroke="${PU}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`);
  // dead end and goal
  s.raw(`<path d="M${250 + 2} ${TOP - 7} l12 12 M${250 + 14} ${TOP - 7} l-12 12" stroke="${C.red}" stroke-width="3" stroke-linecap="round"/>`);
  s.raw(`<path d="M296 ${BOT + 12} L296 ${BOT - 12}" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M296 ${BOT - 12} L310 ${BOT - 7} L296 ${BOT - 2} Z" fill="${PK}"/>`);
  s.text(299, BOT - 26, 'Goal!', { font: 'body', size: 12.5, weight: 800, color: PK });
  s.text(FX + 30, FY + 4, '← fork', { font: 'body', size: 12, weight: 800, color: C.soft });
  // numbered steps, each beside the start of its part
  const badge = (x, y, n, col) => { s.raw(`<circle cx="${x}" cy="${y}" r="10" fill="${col}"/>`); s.text(x, y + 4.5, String(n), { font: 'body', size: 12.5, weight: 800, color: C.card }); };
  badge(FX - 34, TOP + 22, 1, PU); badge(282, TOP, 2, C.red); badge(196, TOP + 32, 3, PU); badge(FX - 34, BOT - 22, 4, PK);
  // the cat at the start: same drawing as the cat on Audrey's personal site (orange face, thick outline, stripes, big eyes), scaled down
  const kx = 32, ky = 151, outline = 'M38 98 C33 70 40 40 54 22 C68 28 83 40 93 50 C111 46 129 46 147 50 C157 40 172 28 186 22 C200 40 207 70 202 98 C214 114 212 150 180 162 C150 172 90 172 60 162 C28 150 26 114 38 98 Z';
  s.raw(`<g transform="translate(${kx} ${ky}) scale(0.23) translate(-120 -100)"><clipPath id="mazecat"><path d="${outline}"/></clipPath>`
    + `<path d="${outline}" fill="#ffb072"/><g clip-path="url(#mazecat)"><path d="M108 52 L111 72 M120 50 L120 72 M132 52 L129 72" stroke="#d9773a" stroke-width="6" stroke-linecap="round"/></g>`
    + `<path d="${outline}" fill="none" stroke="#6e2a2a" stroke-width="7" stroke-linejoin="round"/>`
    + `<path d="M42 110 L12 104 M42 124 L12 128 M198 110 L228 104 M198 124 L228 128" stroke="#6e2a2a" stroke-width="5" stroke-linecap="round"/>`
    + `<ellipse cx="70" cy="128" rx="13" ry="7" fill="#f7a1a8" opacity=".9"/><ellipse cx="170" cy="128" rx="13" ry="7" fill="#f7a1a8" opacity=".9"/>`
    + `<ellipse cx="91" cy="109" rx="8.5" ry="10.5" fill="#4a1d1d"/><ellipse cx="155" cy="109" rx="8.5" ry="10.5" fill="#4a1d1d"/>`
    + `<circle cx="94" cy="105" r="2.6" fill="#fff"/><circle cx="158" cy="105" r="2.6" fill="#fff"/>`
    + `<path d="M110 122 q5 8 10 1 q5 7 10 -1" fill="none" stroke="#4a1d1d" stroke-width="4.5" stroke-linecap="round"/></g>`);
  s.text(kx, 120, 'Start', { font: 'body', size: 12.5, weight: 800, color: PU });
  const key = (x, y, n, col, t) => { badge(x, y - 4, n, col); s.text(x + 14, y, t, { font: 'body', size: 12.5, weight: 700, anchor: 'start' }); };
  key(22, 262, 1, PU, 'Try one way (up).'); key(184, 262, 2, C.red, 'Dead end!');
  key(22, 286, 3, PU, 'Back up to the fork.'); key(184, 286, 4, PK, 'Try the next way.');
  // Panel 2: tasks waiting in a circle
  const y0 = 314;
  s.round(4, y0, 332, 264, 12, { fill: C.card, sw: 1.5, stroke: C.soft, rough: 0.6 });
  s.text(18, y0 + 26, 'Finding a cycle in a project plan', { font: 'body', size: 15, weight: 800, anchor: 'start' });
  const card = (cx, cy, name, job) => { s.round(cx - 46, cy - 24, 92, 48, 8, { fill: C.butter, sw: 1.6, rough: 0.6 }); s.text(cx, cy - 4, name, { font: 'body', size: 13.5, weight: 800 }); s.text(cx, cy + 14, job, { font: 'body', size: 12, weight: 700, color: C.soft }); };
  const A = [170, y0 + 70], Bc = [266, y0 + 176], Cc = [74, y0 + 176];
  card(...A, 'Task A', 'Design'); card(...Bc, 'Task B', 'Build'); card(...Cc, 'Task C', 'Test');
  const W = { stroke: C.ink, sw: 2, head: 8, single: true, rough: 0.5 };
  s.curve(214, y0 + 86, 262, y0 + 148, -18, W).curve(218, y0 + 190, 122, y0 + 190, -14, W).curve(80, y0 + 148, 126, y0 + 86, -18, W);
  s.text(300, y0 + 122, 'waits for', { font: 'body', size: 11.5, weight: 700, color: C.soft });
  s.text(170, y0 + 226, 'waits for', { font: 'body', size: 11.5, weight: 700, color: C.soft });
  s.text(40, y0 + 122, 'waits for', { font: 'body', size: 11.5, weight: 700, color: C.soft });
  s.text(170, y0 + 140, 'stuck!', { font: 'body', size: 14, weight: 800, color: C.red });
  s.text(170, y0 + 156, 'no task can start', { font: 'body', size: 11.5, weight: 700, color: C.red });
  s.text(170, y0 + 250, 'DFS finds it: it reaches a task that is still on its stack.', { font: 'body', size: 11.5, weight: 700, color: C.soft });
  return s.svg('Two places DFS is used. Solving a maze: from Start, try one hallway to its end; at a dead end, back up and try the next hallway, until you reach the Exit. Finding a cycle in a project plan: Task A waits for Task B, B waits for C, and C waits for A, so no task can start. DFS finds this because it reaches a task that is still on its stack.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: the same graph, BFS order vs DFS order (badges = visit order, thick edges = how each vertex was reached). */
export function bfsVsDfs() {
  const lv = { A: 0, B: 1, D: 1, C: 2, E: 2, F: 3, G: 3 };
  const lvFill = [C.orangeWash, C.butter, C.tealWash, C.sky], lvStroke = [C.orange, '#a8650f', C.teal, '#2f6fa8'];
  const panel = (y0, title, sub, order, treeEdges, col, nodeStyle, foot) => {
    const P = dfsShift(0, y0 + 48);
    let s = `<rect x="3" y="${y0}" width="334" height="330" rx="12" fill="${C.card}" stroke="#d9dedb" stroke-width="1.5"/>`;
    s += dfsLab(16, y0 + 24, title, col, 'start', 15, 800) + dfsLab(324, y0 + 24, sub, C.soft, 'end', 12.5, 800);
    for (const [a, b] of dfsCityEdges) s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#c9d0cd" stroke-width="1.6"/>`;
    for (const [a, b] of treeEdges) s += dfsEdgeArrow(P, a, b, col, 17, 2.6);
    for (const [k, [x, y]] of Object.entries(P)) {
      const [f, st] = nodeStyle(k); s += dfsNode(x, y, k, f, st);
      const n = order.indexOf(k) + 1;
      const bx = k === 'D' ? x - 15 : x + 15; s += `<circle cx="${bx}" cy="${y - 15}" r="9.5" fill="${col}"/>` + dfsLab(bx, y - 11, String(n), C.card, 'middle', 11.5, 800);
    }
    s += dfsLab(16, y0 + 318, foot, C.ink, 'start', 12.5, 800);
    return s;
  };
  let s = `<svg class="objbox" viewBox="0 0 340 680" role="img" aria-label="The same graph searched two ways from A. BFS, wide first with a queue, visits A, B, D, C, E, F, G: level by level. DFS, deep first with a stack, visits A, B, C, F, E, D, G: it follows one path down, backs up at dead ends, then goes on to G.">`;
  s += panel(4, 'BFS: wide first', 'uses a queue', 'ABDCEFG', [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['C', 'F'], ['E', 'G']], C.orange,
    (k) => [lvFill[lv[k]], lvStroke[lv[k]]], 'Order: A B D C E F G (level by level)');
  s += panel(346, 'DFS: deep first', 'uses a stack', 'ABCFEDG', [['A', 'B'], ['B', 'C'], ['C', 'F'], ['F', 'E'], ['E', 'D'], ['E', 'G']], C.teal,
    () => [C.tealWash, C.teal], 'Order: A B C F E D G (one path, then back up)');
  return s + '</svg>';
}

/** Clean: one graph, two correct BFS orders and a wrong one; boxes colored by level so the wrong one breaks the pattern. */
export function bfsOrders() {
  const fill = [C.orangeWash, C.butter, C.tealWash], stroke = [C.orange, '#a8650f', C.teal];
  const lv = { A: 0, B: 1, C: 1, D: 2, E: 2 };
  const P = { A: [62, 132], B: [170, 92], C: [170, 172], D: [278, 92], E: [278, 172] };
  let s = `<svg class="objbox" viewBox="0 0 340 556" role="img" aria-label="BFS from A on a small graph: A connects to B and C, B connects to D, C connects to E. Level 0 is A, level 1 is B and C, level 2 is D and E. Correct: A, B, C, D, E, the alphabetical order. Also correct: A, C, B, E, D, taking C first, so C's neighbor E also comes first. Wrong: A, B, D, C, E, because D is 2 edges away but comes before C, which is 1 edge away.">`;
  s += dfsLab(170, 24, 'BFS from A: which orders are correct?', C.ink, 'middle', 15, 800);
  const xs = [8, 116, 224, 332], names = ['Level 0', 'Level 1', 'Level 2'];
  for (let i = 0; i < 3; i++) { s += `<rect x="${xs[i]}" y="40" width="${xs[i + 1] - xs[i]}" height="170" fill="${fill[i]}" opacity="0.55"/>` + dfsLab((xs[i] + xs[i + 1]) / 2, 60, names[i], stroke[i], 'middle', 13, 800); }
  s += `<rect x="8" y="40" width="324" height="170" rx="10" fill="none" stroke="#d9dedb" stroke-width="1.5"/>`;
  for (const [a, b] of [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E']]) s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="${C.soft}" stroke-width="1.8"/>`;
  for (const [k, [x, y]] of Object.entries(P)) s += dfsNode(x, y, k, fill[lv[k]], stroke[lv[k]]);
  const row = (y, ok, order, l1, l2) => {
    let o = `<rect x="8" y="${y}" width="324" height="88" rx="10" fill="${ok ? C.card : '#fbeceb'}" stroke="${ok ? C.teal : C.red}" stroke-width="1.6"/>`;
    o += dfsLab(30, y + 36, ok ? '✓' : '✗', ok ? C.teal : C.red, 'middle', 22, 800);
    order.split('').forEach((v, i) => { const x = 56 + i * 40;
      o += `<rect x="${x}" y="${y + 14}" width="34" height="32" rx="5" fill="${fill[lv[v]]}" stroke="${stroke[lv[v]]}" stroke-width="1.8"/>` + dfsLab(x + 17, y + 36, v, C.ink, 'middle', 15, 800); });
    if (!ok) o += `<path d="M${56 + 2 * 40 - 4} ${y + 10} L${56 + 2 * 40 + 38} ${y + 10} L${56 + 2 * 40 + 38} ${y + 50} L${56 + 2 * 40 - 4} ${y + 50} Z" fill="none" stroke="${C.red}" stroke-width="2.2" stroke-dasharray="5 3"/>`;
    o += dfsLab(56, y + 66, l1, ok ? C.ink : C.red, 'start', 12.5, 800) + dfsLab(56, y + 81, l2, C.soft, 'start', 12, 700);
    return o;
  };
  s += row(224, true, 'ABCDE', 'Correct: alphabetical (B before C)', 'the order most answer keys expect');
  s += row(320, true, 'ACBED', 'Also correct: C first, so C’s E comes first too', 'still nearest first, level by level');
  s += row(416, false, 'ABDCE', 'Wrong: D (level 2) came before C (level 1)', 'that is going deep, not wide');
  s += dfsLab(170, 530, 'A rule like “alphabetical” just picks one correct order.', C.soft, 'middle', 12, 700);
  return s + '</svg>';
}

/* ---------------- Sets lesson (chat 12) ---------------- */
const setChip = (s, x, y, w, label, fill, stroke, size = 13) => {
  s.round(x, y, w, 22, 8, { fill, stroke, sw: 1.6 });
  s.text(x + w / 2, y + 16, label, { font: 'body', size, weight: 800 });
};
const setDot = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;

/** Sketch: the same four adds go into a list (keeps the 2nd Ana) and into a set (ignores it). */
export function setVsList() {
  const s = new Sketch(340, 272, 121);
  s.text(170, 18, 'We add: Ana, Ben, Ana, Carla', { font: 'body', size: 14, weight: 800 });
  [['Ana', 66, 44], ['Ben', 118, 44], ['Ana', 170, 44], ['Carla', 222, 56]].forEach(([n, x, w], i) =>
    setChip(s, x, 28, w, n, i === 2 ? C.orangeWash : C.butter, i === 2 ? C.orange : C.ink));
  s.arrow(120, 58, 88, 82, { sw: 1.8, head: 7 });
  s.arrow(220, 58, 252, 82, { sw: 1.8, head: 7 });
  s.text(85, 98, 'In a list', { font: 'body', size: 15, weight: 800 });
  s.text(85, 113, '(like an array)', { font: 'body', size: 11, weight: 700, color: C.soft });
  ['Ana', 'Ben', 'Ana', 'Carla'].forEach((n, i) => {
    const y = 122 + i * 30;
    s.rect(50, y, 90, 26, { fill: i === 2 ? C.orangeWash : C.card, stroke: i === 2 ? C.orange : C.ink, sw: 1.6 });
    s.text(95, y + 18, n, { font: 'body', size: 14, weight: 800 });
  });
  s.text(85, 260, 'Ana is in it twice', { font: 'body', size: 12, weight: 800, color: C.orange });
  s.text(255, 98, 'In a set', { font: 'body', size: 15, weight: 800 });
  s.text(255, 113, '(no duplicates)', { font: 'body', size: 11, weight: 700, color: C.soft });
  s.ellipse(255, 170, 140, 96, { fill: C.tealWash, stroke: C.teal, sw: 2 });
  s.text(226, 154, 'Ana', { font: 'body', size: 15, weight: 800 });
  s.text(284, 168, 'Ben', { font: 'body', size: 15, weight: 800 });
  s.text(244, 198, 'Carla', { font: 'body', size: 15, weight: 800 });
  setChip(s, 188, 230, 44, 'Ana', C.orangeWash, C.orange);
  s.line(192, 232, 228, 250, { stroke: C.red, sw: 2.2, single: true });
  s.line(228, 232, 192, 250, { stroke: C.red, sw: 2.2, single: true });
  s.text(240, 239, 'already in,', { font: 'body', size: 12, weight: 800, color: C.red, anchor: 'start' });
  s.text(240, 253, 'so ignored', { font: 'body', size: 12, weight: 800, color: C.red, anchor: 'start' });
  return s.svg('We add Ana, Ben, Ana, Carla. In a list, all four are kept, so Ana is in it twice. In a set, Ana, Ben, and Carla are kept once each; the second Ana is crossed out: already in, so ignored.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: order matters in a list but not in a set; a list has item [0], a set has no positions (you ask "Is Ana in it?"). */
export function setOrder() {
  const s = new Sketch(340, 360, 151);
  const boxes = (x, y, names, fill = C.card) => names.forEach((n, i) => {
    s.rect(x + i * 46, y, 46, 26, { fill, sw: 1.5 });
    s.text(x + i * 46 + 23, y + 18, n, { font: 'body', size: 13, weight: 800 });
  });
  const blob = (cx, cy, t) => { s.ellipse(cx, cy, 140, 40, { fill: C.tealWash, stroke: C.teal, sw: 1.8 }); s.text(cx, cy + 5, t, { font: 'body', size: 13, weight: 800 }); };
  s.text(16, 20, '1. In a list, order matters', { font: 'body', size: 14, weight: 800, anchor: 'start' });
  boxes(14, 32, ['Ana', 'Ben', 'Carla']);
  s.text(170, 52, '≠', { font: 'body', size: 26, weight: 800, color: C.red });
  boxes(188, 32, ['Carla', 'Ana', 'Ben']);
  s.text(170, 82, 'two different lists', { font: 'body', size: 12, weight: 800, color: C.red });
  s.text(16, 116, '2. In a set, order does not matter', { font: 'body', size: 14, weight: 800, anchor: 'start' });
  blob(84, 146, 'Ana, Ben, Carla');
  s.text(170, 155, '=', { font: 'body', size: 26, weight: 800, color: C.teal });
  blob(256, 146, 'Carla, Ana, Ben');
  s.text(170, 184, 'the same set: same names, and that is all that counts', { font: 'body', size: 12, weight: 800, color: C.teal });
  s.line(16, 200, 324, 200, { stroke: C.soft, sw: 1.2, single: true, dash: '5 5' });
  s.text(16, 222, '3. Asking for "item [0]" (the first item)', { font: 'body', size: 14, weight: 800, anchor: 'start' });
  boxes(14, 236, ['Ana', 'Ben', 'Carla']);
  ['[0]', '[1]', '[2]'].forEach((t, i) => s.text(37 + i * 46, 278, t, { font: 'mono', size: 12, weight: 600, color: C.soft }));
  s.text(83, 304, 'item [0] is Ana ✓', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.text(83, 320, 'Every item has a place.', { font: 'body', size: 12, weight: 700, color: C.soft });
  blob(256, 250, 'Ana, Ben, Carla');
  s.text(256, 286, 'item [0]? ✗ no places', { font: 'body', size: 12.5, weight: 800, color: C.red });
  s.text(256, 312, 'Instead, you ask:', { font: 'body', size: 12, weight: 700, color: C.soft });
  s.text(256, 330, '"Is Ana in it?" Yes ✓', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  return s.svg('Three rows. 1: In a list, Ana, Ben, Carla and Carla, Ana, Ben are two different lists. 2: In a set, Ana, Ben, Carla equals Carla, Ana, Ben: the same set. 3: In a list, every item has a place, so item [0] is Ana. A set has no places, so you cannot ask for item [0]; instead you ask: Is Ana in it? Yes.').replace(/(\d+\.\d)\d+/g, '$1');
}

/* Clean mini Venn pictures for the Part 2 exam traps (one per trap). */
let trapN = 0;
function trapVenn(cx, cy, r, d, shade, vals) {
  const id = 'tv' + trapN++, a = cx - d / 2, b = cx + d / 2, F = '#e8662e';
  let s = `<defs><clipPath id="${id}cb"><circle cx="${b}" cy="${cy}" r="${r}"/></clipPath>`
    + `<mask id="${id}nb"><rect x="0" y="0" width="340" height="400" fill="#fff"/><circle cx="${b}" cy="${cy}" r="${r}" fill="#000"/></mask>`
    + `<mask id="${id}na"><rect x="0" y="0" width="340" height="400" fill="#fff"/><circle cx="${a}" cy="${cy}" r="${r}" fill="#000"/></mask></defs>`;
  if (shade[0]) s += `<circle cx="${a}" cy="${cy}" r="${r}" fill="${F}" fill-opacity="0.32" mask="url(#${id}nb)"/>`;
  if (shade[1]) s += `<circle cx="${a}" cy="${cy}" r="${r}" fill="${F}" fill-opacity="0.32" clip-path="url(#${id}cb)"/>`;
  if (shade[2]) s += `<circle cx="${b}" cy="${cy}" r="${r}" fill="${F}" fill-opacity="0.32" mask="url(#${id}na)"/>`;
  s += `<circle cx="${a}" cy="${cy}" r="${r}" fill="none" stroke="#1b2a2e" stroke-width="2"/><circle cx="${b}" cy="${cy}" r="${r}" fill="none" stroke="#1b2a2e" stroke-width="2"/>`;
  s += sT(a - r + 6, cy - r + 4, 'A', { size: 13, w: 800, fill: '#37474a' }) + sT(b + r - 6, cy - r + 4, 'B', { size: 13, w: 800, fill: '#37474a' });
  const xs = [(a - r + (b - r)) / 2, cx, (b + r + (a + r)) / 2];
  vals.forEach((v, i) => { if (v) s += sT(xs[i], cy + 5, v, { mono: true, size: 12, w: 700 }); });
  return s;
}
const trapSvg = (h, label, body) => `<svg class="objbox trap-pic" viewBox="0 0 340 ${h}" role="img" aria-label="${label}">${body}</svg>`;
const V = ['1 2 3', '4 5', '6 7'];

export function setTrapPic(n) {
  if (n === 1) return trapSvg(130, 'Two Venn diagrams of A = 1 to 5 and B = 4 to 7. Left: only the part of A outside B is shaded: A minus B = 1, 2, 3. Right: only the part of B outside A is shaded: B minus A = 6, 7. They are not equal.',
    trapVenn(82, 58, 44, 52, [1, 0, 0], V) + sT(170, 66, '≠', { size: 28, fill: '#b23a33' }) + trapVenn(258, 58, 44, 52, [0, 0, 1], V)
    + sT(82, 122, 'A − B = {1, 2, 3}', { size: 13 }) + sT(258, 122, 'B − A = {6, 7}', { size: 13 }));
  if (n === 2) return trapSvg(130, 'Venn diagram of 1, 2 union 2, 3, all shaded: 1 only in A, 2 in the middle, 3 only in B. The answer 1, 2, 3 is correct; 1, 2, 2, 3 is crossed out, because 2 is written only once.',
    trapVenn(92, 58, 44, 52, [1, 1, 1], ['1', '2', '3']) + sT(92, 122, '{1, 2} ∪ {2, 3}', { size: 13 })
    + `<rect x="196" y="22" width="128" height="30" rx="7" fill="#e3f1ef" stroke="#0e6b63" stroke-width="2"/>` + sT(260, 43, '✓ {1, 2, 3}', { mono: true, size: 13, w: 700, fill: '#0b544e' })
    + `<rect x="196" y="64" width="128" height="30" rx="7" fill="#f8dcd8" stroke="#b23a33" stroke-width="2" stroke-dasharray="5 4"/>` + sT(260, 85, '✗ {1, 2, 2, 3}', { mono: true, size: 13, w: 700, fill: '#b23a33' })
    + `<line x1="214" y1="79" x2="306" y2="79" stroke="#b23a33" stroke-width="1.8"/>` + sT(260, 116, '2 is written only once', { size: 11.5, w: 700, fill: '#37474a' }));
  if (n === 3) return trapSvg(130, 'A = 1, 2 and B = 1, 2 drawn as one circle (same values), nothing shaded. A minus B leaves nothing, so the answer is the empty set, written as empty braces or the symbol for the empty set.',
    `<circle cx="82" cy="58" r="44" fill="#fbfaf6" stroke="#1b2a2e" stroke-width="2"/>` + sT(38, 18, 'A, B', { size: 13, w: 800, fill: '#37474a' })
    + sT(82, 63, '1  2', { mono: true, size: 13, w: 700 }) + sT(82, 122, 'A = {1, 2}, B = {1, 2}', { size: 13 })
    + `<line x1="140" y1="58" x2="186" y2="58" stroke="#1b2a2e" stroke-width="2"/><path d="M178 52 L187 58 L178 64" fill="none" stroke="#1b2a2e" stroke-width="2"/>`
    + sT(262, 46, 'A − B: nothing left', { size: 13 }) + sT(262, 74, '= { }  or  ∅', { mono: true, size: 15, w: 700, fill: '#b4461a' }) + sT(262, 100, 'the empty set', { size: 12, w: 700, fill: '#37474a' }));
  return trapSvg(130, 'Venn diagram of A = 1 to 5 and B = 4 to 7 with both outer parts shaded and the middle (4, 5) not shaded: A symmetric difference B = 1, 2, 3, 6, 7, which equals A union B minus A intersect B, and A minus B union B minus A.',
    trapVenn(82, 58, 44, 52, [1, 0, 1], V) + sT(82, 122, 'A △ B = {1, 2, 3, 6, 7}', { size: 13 })
    + sT(200, 40, '= (A ∪ B) − (A ∩ B)', { size: 13, anchor: 'start' }) + sT(200, 62, 'all, minus the middle', { size: 11.5, w: 700, fill: '#37474a', anchor: 'start' })
    + sT(200, 90, '= (A − B) ∪ (B − A)', { size: 13, anchor: 'start' }) + sT(200, 112, 'the two outer parts', { size: 11.5, w: 700, fill: '#37474a', anchor: 'start' }));
}

/** Sketch: a sari-sari store. Outside you can only ask (the ADT); inside, each store arranges its stock its own way. */
export function adtStore() {
  const s = new Sketch(340, 362, 133);
  s.text(170, 18, 'What you can ask vs. how it is built', { font: 'body', size: 14, weight: 800 });
  // store front
  s.rect(160, 56, 160, 106, { fill: '#f1e2c2', sw: 1.8 });
  s.rect(162, 32, 156, 24, { fill: C.butter, sw: 1.8 });
  s.text(240, 49, 'Sari-sari store', { font: 'body', size: 13, weight: 800 });
  s.rect(180, 68, 120, 68, { fill: C.sky, sw: 1.6 });
  s.circle(240, 100, 28, { fill: '#e3b38c', sw: 1.4 });
  s.raw(setDot(235, 98, 1.6, C.ink) + setDot(245, 98, 1.6, C.ink));
  for (let x = 195; x <= 285; x += 15) s.line(x, 68, x, 136, { stroke: C.soft, sw: 1, single: true, rough: 0.3 });
  [91, 114].forEach((y) => s.line(180, y, 300, y, { stroke: C.soft, sw: 1, single: true, rough: 0.3 }));
  s.rect(176, 136, 128, 8, { fill: '#c99b62', sw: 1.4 });
  // customer
  s.path('M48 172 Q50 142 70 140 Q90 142 92 172 Z', { fill: C.tealWash, stroke: C.teal, sw: 1.8 });
  s.circle(70, 122, 30, { fill: '#e3b38c', sw: 1.4 });
  s.raw(setDot(64, 121, 1.6, C.ink) + setDot(76, 121, 1.6, C.ink));
  s.path('M58 80 L70 104 L76 80 Z', { fill: C.tealWash, stroke: C.teal, sw: 1.6 });
  s.round(14, 38, 128, 44, 10, { fill: C.tealWash, stroke: C.teal, sw: 1.6 });
  s.text(78, 56, 'Do you have', { font: 'body', size: 13, weight: 800 });
  s.text(78, 73, 'Coke?', { font: 'body', size: 13, weight: 800 });
  s.path('M232 172 L240 146 L250 172 Z', { fill: C.butter, stroke: C.amber, sw: 1.6 });
  s.round(192, 170, 112, 28, 9, { fill: C.butter, stroke: C.amber, sw: 1.6 });
  s.text(248, 189, 'Yes, we have!', { font: 'body', size: 13, weight: 800 });
  // the questions = the ADT
  s.text(170, 222, 'Outside: you can only ask or ask for changes', { font: 'body', size: 12.5, weight: 800, color: C.orange });
  [['contains?', 26, 90], ['add', 125, 90], ['remove', 224, 90]].forEach(([t, x, w]) => {
    s.round(x, 230, w, 24, 8, { fill: C.orangeWash, stroke: C.orange, sw: 1.6 });
    s.text(x + w / 2, 247, t, { font: 'mono', size: 13, weight: 600 });
  });
  s.line(16, 268, 324, 268, { stroke: C.soft, sw: 1.2, single: true, dash: '5 5' });
  s.text(170, 288, 'Inside (hidden): each store does it its own way', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  // store 1: sorted shelves
  s.rect(26, 298, 128, 40, { fill: '#f1e2c2', sw: 1.6 });
  s.line(26, 318, 154, 318, { sw: 1.4, single: true });
  const cols = ['#d9534f', C.amber, C.teal, C.orange, '#4f86b8', C.butter];
  for (let i = 0; i < 6; i++) { s.rect(32 + i * 20, 302, 14, 14, { fill: cols[i], sw: 1, rough: 0.6 }); s.rect(32 + i * 20, 321, 14, 15, { fill: cols[5 - i], sw: 1, rough: 0.6 }); }
  s.text(90, 354, 'Store 1: shelves, A to Z', { font: 'body', size: 12, weight: 800 });
  // store 2: bins
  [['A–F', 190], ['G–M', 234], ['N–Z', 278]].forEach(([t, x], i) => {
    s.rect(x, 304, 38, 34, { fill: C.sky, sw: 1.6 });
    s.text(x + 19, 300, t, { font: 'body', size: 11, weight: 800, color: C.soft });
    s.rect(x + 7, 318, 10, 14, { fill: cols[i], sw: 1, rough: 0.6 });
    s.rect(x + 21, 322, 10, 10, { fill: cols[i + 3], sw: 1, rough: 0.6 });
  });
  s.text(253, 354, 'Store 2: bins by letter', { font: 'body', size: 12, weight: 800 });
  return s.svg('A customer asks a sari-sari store: Do you have Coke? The owner answers: Yes, we have! Outside, a customer can only ask: contains, add, remove. Inside, hidden from the customer, each store arranges its stock its own way: store 1 uses shelves sorted A to Z, store 2 uses bins by first letter.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: ID taps at the door (Ana twice) become an attendance list with each name once; three uses of sets in IT. */
export function attendanceSet() {
  const s = new Sketch(340, 330, 141);
  s.text(112, 18, 'ID taps at the door', { font: 'body', size: 14, weight: 800 });
  s.rect(10, 30, 44, 96, { fill: '#c99b62', sw: 1.8 });
  s.raw(setDot(46, 80, 2.4, C.ink));
  s.rect(60, 62, 16, 26, { fill: C.soft, stroke: C.ink, sw: 1.4 });
  s.raw(setDot(68, 70, 2.6, '#5cc98a'));
  [['7:58  Ana', 0], ['8:01  Ben', 0], ['8:02  Ana', 1], ['8:05  Carla', 0]].forEach(([t, dup], i) => {
    const y = 30 + i * 26;
    s.round(86, y, 112, 22, 7, { fill: dup ? C.orangeWash : C.card, stroke: dup ? C.orange : C.ink, sw: 1.5 });
    s.text(94, y + 16, t, { font: 'mono', size: 12, weight: 600, anchor: 'start' });
  });
  s.text(142, 152, 'Ana tapped twice', { font: 'body', size: 12, weight: 800, color: C.orange });
  s.arrow(204, 80, 236, 80, { sw: 1.8, head: 7 });
  s.rect(242, 26, 88, 112, { fill: C.card, sw: 1.8 });
  s.rect(270, 20, 32, 12, { fill: C.soft, sw: 1.4 });
  s.text(286, 52, 'Attendance', { font: 'body', size: 13, weight: 800 });
  ['Ana', 'Ben', 'Carla'].forEach((n, i) => {
    s.text(256, 76 + i * 22, '✓', { font: 'body', size: 14, weight: 800, color: C.teal, anchor: 'start' });
    s.text(272, 76 + i * 22, n, { font: 'body', size: 14, weight: 800, anchor: 'start' });
  });
  s.text(286, 156, 'each name once', { font: 'body', size: 12, weight: 800, color: C.teal });
  s.line(16, 172, 324, 172, { stroke: C.soft, sw: 1.2, single: true, dash: '5 5' });
  s.text(170, 192, 'Sets in IT', { font: 'body', size: 14, weight: 800 });
  [14, 120, 226].forEach((x) => s.round(x, 200, 100, 122, 10, { fill: C.card, sw: 1.4 }));
  // card 1: unique visitors
  s.text(64, 218, 'Website visits', { font: 'body', size: 12, weight: 800 });
  s.rect(24, 226, 80, 44, { fill: C.paper, sw: 1.4 });
  s.line(24, 234, 104, 234, { sw: 1.2, single: true });
  ['A', 'B', 'A', 'A'].forEach((l, i) => {
    const x = 38 + i * 17;
    s.raw(`<circle cx="${x}" cy="253" r="7" fill="${l === 'A' ? C.orangeWash : C.sky}" stroke="${C.ink}" stroke-width="1.2"/>`);
    s.text(x, 257, l, { font: 'body', size: 10, weight: 800 });
  });
  s.text(64, 292, '4 visits, but', { font: 'body', size: 12, weight: 700 });
  s.text(64, 308, '2 unique people', { font: 'body', size: 12, weight: 800, color: C.teal });
  // card 2: tags
  s.text(170, 218, 'Tags on a post', { font: 'body', size: 12, weight: 800 });
  s.rect(130, 226, 80, 40, { fill: C.sky, sw: 1.4 });
  s.path('M134 262 L156 240 L172 256 L184 246 L206 262 Z', { fill: C.tealWash, stroke: C.teal, sw: 1.2, rough: 0.6 });
  s.round(130, 274, 36, 18, 6, { fill: C.butter, sw: 1.2 });
  s.text(148, 287, '#dsa', { font: 'body', size: 11, weight: 800 });
  s.round(170, 274, 42, 18, 6, { fill: C.butter, sw: 1.2 });
  s.text(191, 287, '#mati', { font: 'body', size: 11, weight: 800 });
  s.text(170, 308, 'each tag once', { font: 'body', size: 12, weight: 800, color: C.teal });
  // card 3: in both classes
  s.text(276, 218, 'Two class lists', { font: 'body', size: 12, weight: 800 });
  s.circle(262, 250, 46, { fill: C.tealWash, stroke: C.teal, sw: 1.5 });
  s.circle(290, 250, 46, { fill: C.sky, stroke: '#4f86b8', sw: 1.5 });
  s.ellipse(276, 250, 16, 38, { fill: C.orangeWash, stroke: C.orange, sw: 1.2, rough: 0.5 });
  s.text(276, 292, 'Who is in both?', { font: 'body', size: 12, weight: 700 });
  s.text(276, 308, 'A ∩ B', { font: 'body', size: 12, weight: 800, color: C.teal });
  return s.svg('Left: students tap their IDs at the door: 7:58 Ana, 8:01 Ben, 8:02 Ana again, 8:05 Carla. Right: the attendance list shows Ana, Ben, and Carla, each name once. Below, three uses of sets in IT: website visits (4 visits, 2 unique visitors), tags on a post (each tag once), and two class lists (who is in both: A intersect B).').replace(/(\d+\.\d)\d+/g, '$1');
}

/* Clean pictures for the sets lesson (data structures, not real life). */
const sT = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.mono ? '&quot;IBM Plex Mono&quot;, monospace' : 'Nunito, system-ui, sans-serif'}" font-size="${o.size ?? 14}" font-weight="${o.w ?? 800}" fill="${o.fill ?? '#1b2a2e'}" text-anchor="${o.anchor ?? 'middle'}"${o.it ? ' font-style="italic"' : ''}>${t}</text>`;

/** A ⊆ B: circle A inside circle B. */
export function subsetPic() {
  let s = `<svg class="objbox" viewBox="0 0 340 210" role="img" aria-label="Circle B holds Ana, Ben, Carla, and Dan. A smaller circle A inside it holds Ana and Ben. Every value of A is also in B, so A is a subset of B.">`;
  s += `<ellipse cx="128" cy="110" rx="112" ry="88" fill="#e3f1ef" stroke="#0e6b63" stroke-width="2.5"/>`;
  s += `<circle cx="92" cy="114" r="44" fill="#fce9e0" stroke="#e8662e" stroke-width="2.5"/>`;
  s += sT(30, 36, 'B', { size: 20, fill: '#0b544e' }) + sT(92, 86, 'A', { size: 18, fill: '#b4461a' });
  s += sT(92, 112, 'Ana') + sT(92, 134, 'Ben') + sT(186, 96, 'Carla') + sT(186, 136, 'Dan');
  s += sT(296, 84, 'A ⊆ B', { size: 22, fill: '#b4461a' });
  s += sT(296, 112, 'Every value', { size: 13, w: 700 }) + sT(296, 130, 'of A is', { size: 13, w: 700 }) + sT(296, 148, 'also in B.', { size: 13, w: 700 });
  return s + '</svg>';
}

/** Peek picture: the Set interface and the three classes that implement it. */
export function interfacePic() {
  let s = `<svg class="objbox" viewBox="0 0 320 196" role="img" aria-label="A card labeled Set, interface, lists add, contains, remove, and size, with no code inside. Three boxes below, HashSet, LinkedHashSet, and TreeSet, each point up to it with the word implements.">`;
  s += `<rect x="60" y="6" width="200" height="82" rx="8" fill="#fdf1cf" stroke="#1b2a2e" stroke-width="2"/>`;
  s += sT(160, 28, 'Set  (interface)', { mono: true, size: 14, w: 700 });
  s += sT(160, 50, 'add  contains', { mono: true, size: 13, w: 600, fill: '#37474a' }) + sT(160, 68, 'remove  size', { mono: true, size: 13, w: 600, fill: '#37474a' });
  s += sT(160, 84, 'no code inside', { size: 11, w: 700, fill: '#b4461a', it: true });
  [[8, 92, 'HashSet'], [110, 108, 'LinkedHashSet'], [228, 84, 'TreeSet']].forEach(([x, w, t]) => {
    const cx = x + w / 2;
    s += `<line x1="${cx}" y1="146" x2="${(cx + 160) / 2}" y2="96" stroke="#0e6b63" stroke-width="2"/>`;
    s += `<path d="M${(cx + 160) / 2} 90 l-6 10 h12 Z" transform="rotate(${(Math.atan2(96 - 146, (cx + 160) / 2 - cx) * 180) / Math.PI + 90} ${(cx + 160) / 2} 96)" fill="#fff" stroke="#0e6b63" stroke-width="1.8"/>`;
    s += `<rect x="${x}" y="146" width="${w}" height="40" rx="8" fill="#e3f1ef" stroke="#0e6b63" stroke-width="2"/>`;
    s += sT(cx, 171, t, { mono: true, size: 13, w: 700 });
  });
  s += sT(118, 134, 'implements', { size: 12, w: 800, fill: '#0b544e' });
  return s + '</svg>';
}

/** Peek picture: a class is a blueprint; `new` makes objects from it. */
export function classPic() {
  let s = `<svg class="objbox" viewBox="0 0 320 150" role="img" aria-label="A blueprint labeled class HashSet, with its data and the code for its methods. Two arrows labeled new HashSet make two objects: present, holding Ana and Carla, and tags, holding dsa and mati.">`;
  s += `<rect x="6" y="18" width="124" height="96" rx="8" fill="#dbe8f5" stroke="#2f6fa8" stroke-width="2"/>`;
  s += sT(68, 40, 'class HashSet', { mono: true, size: 13, w: 700, fill: '#1f4f7a' });
  s += sT(68, 64, 'its data', { size: 12, w: 700, fill: '#37474a' }) + sT(68, 82, 'code for add,', { size: 12, w: 700, fill: '#37474a' }) + sT(68, 98, 'contains, ...', { size: 12, w: 700, fill: '#37474a' });
  [[14, 'present', '{Ana, Carla}'], [84, 'tags', '{#dsa, #mati}']].forEach(([y, n, v]) => {
    const a = Math.atan2(y + 24 - 66, 58), hd = (k) => `${(190 - 9 * Math.cos(a + k)).toFixed(1)} ${(y + 24 - 9 * Math.sin(a + k)).toFixed(1)}`;
    s += `<path d="M132 66 L190 ${y + 24} M${hd(0.5)} L190 ${y + 24} L${hd(-0.5)}" fill="none" stroke="#e8662e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<rect x="194" y="${y}" width="120" height="48" rx="8" fill="#fce9e0" stroke="#e8662e" stroke-width="2"/>`;
    s += sT(254, y + 20, n, { mono: true, size: 13, w: 700 }) + sT(254, y + 39, v, { mono: true, size: 12, w: 600, fill: '#37474a' });
  });
  s += sT(160, 144, 'One blueprint, many objects', { size: 12, w: 800, fill: '#0b544e' });
  return s + '</svg>';
}

/* ---------------- maps (chat 13) ---------------- */
const mapPic = (w, h, label, body) => `<svg class="objbox map-pic" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
const mapBox = (x, y, w, h, fill, stroke, sw = 2, rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const mapArrow = (x1, y1, x2, y2, col = '#1b2a2e', sw = 2.2) => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 9, p = (k) => `${(x2 - L * Math.cos(a + k)).toFixed(1)} ${(y2 - L * Math.sin(a + k)).toFixed(1)}`;
  return `<path d="M${x1} ${y1} L${x2} ${y2} M${p(0.5)} L${x2} ${y2} L${p(-0.5)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** Sketch: the sari-sari price list is a map (item = key, price = value). */
export function priceList() {
  const s = new Sketch(340, 324, 141);
  s.text(170, 20, 'The price list is a map', { font: 'body', size: 15, weight: 800 });
  s.rect(26, 34, 288, 214, { fill: '#fffdf5', sw: 1.8 });
  s.line(196, 40, 196, 242, { stroke: C.soft, sw: 1.2, single: true, rough: 0.4 });
  s.text(110, 60, 'Item (key)', { font: 'body', size: 14, weight: 800, color: C.teal });
  s.text(255, 60, 'Price (value)', { font: 'body', size: 14, weight: 800, color: C.orange });
  s.line(34, 72, 306, 72, { stroke: C.ink, sw: 1.4, single: true, rough: 0.4 });
  const rows = [['coffee sachet', null], ['pancit canton', '₱18'], ['egg', '₱9'], ['banana', '₱9']];
  rows.forEach(([k, v], i) => {
    const y = 104 + i * 38;
    s.line(34, y + 14, 306, y + 14, { stroke: '#c9d6d4', sw: 1, single: true, rough: 0.3 });
    s.text(44, y, k, { font: 'body', size: 15, weight: 700, anchor: 'start' });
    if (v) s.text(255, y, v, { font: 'body', size: 15, weight: 800 });
  });
  // coffee: old price crossed out, new price in red pen
  s.text(232, 104, '₱10', { font: 'body', size: 15, weight: 700, color: C.soft });
  s.line(216, 99, 249, 97, { stroke: C.red, sw: 1.4, single: true });
  s.text(280, 104, '₱12', { font: 'body', size: 15, weight: 800, color: C.red });
  // repeated value bracket
  s.path('M290 166 Q302 166 302 176 L302 204 Q302 214 290 214', { stroke: C.orange, sw: 1.8, single: true });
  s.text(170, 270, 'Each item is written once.', { font: 'body', size: 12.5, weight: 800, color: C.red });
  s.text(170, 289, 'A new price replaces the old one.', { font: 'body', size: 12.5, weight: 800, color: C.red });
  s.text(170, 312, 'Egg and banana are both ₱9: values can repeat.', { font: 'body', size: 12.5, weight: 800, color: C.orange });
  return s.svg('A sari-sari store price list with two columns, item (the key) and price (the value): coffee sachet, old price 10 pesos crossed out and 12 pesos written in red; pancit canton 18 pesos; egg 9 pesos; banana 9 pesos. Each item is written once and a new price replaces the old one. Egg and banana share the same price: values can repeat.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: put on a key that is already there replaces its value. */
export function putReplace() {
  let b = sT(170, 22, 'map.put("A1", "Andy")', { mono: true, size: 14, w: 700 });
  const table = (x, title, rows, hot) => {
    let t = sT(x + 70, 50, title, { size: 14, w: 800, fill: '#0b544e' });
    t += mapBox(x, 60, 140, 84, '#fff', '#1b2a2e');
    t += `<rect x="${x + 1}" y="61" width="138" height="26" rx="5" fill="#e3f1ef"/>`;
    t += `<line x1="${x + 60}" y1="60" x2="${x + 60}" y2="144" stroke="#1b2a2e" stroke-width="1.5"/>`;
    t += `<line x1="${x}" y1="87" x2="${x + 140}" y2="87" stroke="#1b2a2e" stroke-width="1.5"/><line x1="${x}" y1="115" x2="${x + 140}" y2="115" stroke="#c9d6d4" stroke-width="1.5"/>`;
    t += sT(x + 30, 79, 'key', { size: 12, w: 800, fill: '#0b544e' }) + sT(x + 100, 79, 'value', { size: 12, w: 800, fill: '#b4461a' });
    rows.forEach(([k, v], i) => {
      const y = 106 + i * 28;
      if (i === hot) t += `<rect x="${x + 62}" y="${y - 17}" width="76" height="24" rx="4" fill="#fce9e0" stroke="#e8662e" stroke-width="1.8"/>`;
      t += sT(x + 30, y, k, { mono: true, size: 13, w: 700 }) + sT(x + 100, y, v, { mono: true, size: 13, w: 700, fill: i === hot ? '#b4461a' : '#1b2a2e' });
    });
    return t;
  };
  b += table(8, 'Before', [['A1', 'Ana'], ['B2', 'Ben']], -1);
  b += table(192, 'After', [['A1', 'Andy'], ['B2', 'Ben']], 0);
  b += mapArrow(154, 102, 186, 102, '#e8662e', 2.6);
  b += sT(78, 166, '2 entries', { size: 13, w: 700, fill: '#37474a' }) + sT(262, 166, 'still 2 entries', { size: 13, w: 700, fill: '#37474a' });
  b += sT(262, 188, 'put returns "Ana"', { size: 13, w: 800, fill: '#b4461a' });
  b += sT(170, 214, 'Same key: the value is replaced. No second A1.', { size: 13, w: 800 });
  return mapPic(340, 226, 'Before: a map with A1 to Ana and B2 to Ben, 2 entries. After map.put of A1, Andy: A1 now points to Andy, B2 to Ben, still 2 entries. put returns Ana, the old value. Same key: the value is replaced, with no second A1.', b);
}

/** Clean: the two steps, key -> hashCode -> bucket index (CAT -> 66486 -> 6). */
export function hashFlow() {
  let b = mapBox(120, 8, 100, 36, '#e3f1ef', '#0e6b63', 2.2) + sT(170, 32, '"CAT"', { mono: true, size: 16, w: 700 });
  b += mapArrow(170, 46, 170, 92);
  b += sT(184, 64, 'Step 1: hashCode()', { size: 13, w: 800, anchor: 'start', fill: '#0b544e' });
  b += sT(184, 82, 'h = 31 × h + code', { mono: true, size: 12, w: 600, anchor: 'start', fill: '#37474a' });
  b += mapBox(115, 96, 110, 36, '#fdf1cf', '#1b2a2e', 2) + sT(170, 120, '66486', { mono: true, size: 16, w: 700 });
  const bx = (i) => 18 + i * 19;
  b += mapArrow(160, 134, bx(6) + 9.5, 176, '#e8662e', 2.4);
  b += sT(184, 152, 'Step 2: & 15', { size: 13, w: 800, anchor: 'start', fill: '#b4461a' });
  b += sT(184, 170, '(keep the last 4 bits)', { size: 12, w: 700, anchor: 'start', fill: '#37474a' });
  for (let i = 0; i < 16; i++) {
    const hot = i === 6;
    b += `<rect x="${bx(i)}" y="180" width="17" height="26" rx="3" fill="${hot ? '#e8662e' : '#fff'}" stroke="${hot ? '#b4461a' : '#1b2a2e'}" stroke-width="${hot ? 2 : 1.4}"/>`;
    b += sT(bx(i) + 8.5, 198, String(i), { size: 10, w: 800, fill: hot ? '#fff' : '#37474a' });
  }
  b += sT(170, 226, 'buckets 0 to 15', { size: 12, w: 700, fill: '#37474a' });
  b += sT(170, 248, 'put and get both go straight to bucket 6.', { size: 13, w: 800 });
  return mapPic(340, 258, 'The key CAT goes through step 1, hashCode, using h = 31 times h plus code, and becomes 66486. Step 2, and 15, keeps the last 4 bits and gives bucket 6 out of buckets 0 to 15. put and get both go straight to bucket 6.', b);
}


/** Clean: chaining. Bucket 0 holds Aa -> BB; get("BB") compares keys along the chain. */
export function chainPic() {
  const arrowF = (x1, y, x2, col = '#37474a') => `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="${col}" stroke-width="2" stroke-linecap="round"/><path d="M${x2} ${y} L${x2 - 9} ${y - 5} L${x2 - 9} ${y + 5} Z" fill="${col}"/>`;
  const ent = (x, y, k, v, hot) => mapBox(x, y, 104, 26, hot ? '#fce9e0' : '#e3f1ef', hot ? '#e8662e' : '#0e6b63', 1.8, 4)
    + `<line x1="${x + 42}" y1="${y}" x2="${x + 42}" y2="${y + 26}" stroke="${hot ? '#e8662e' : '#0e6b63'}" stroke-width="1.4"/>`
    + sT(x + 21, y + 18, k, { mono: true, size: 12, w: 700 }) + sT(x + 73, y + 18, v, { mono: true, size: 12, w: 600, fill: '#37474a' });
  let b = sT(170, 20, 'get("BB"): go to bucket 0, walk its chain', { size: 13, w: 800 });
  const rows = [[0, [['Aa', 'first'], ['BB', 'second']]], [1, []], [2, []], ['…'], [6, [['CAT', 'Puspin']]], ['…'], [12, [['DOG', 'Aspin']]], ['…'], [15, []]];
  const BX = 18, BW = 40, E1 = 90, E2 = 222, Y0 = 58, RH = 30;
  b += sT(E1 + 52, 50, '✗ not BB', { size: 12, w: 800, fill: '#b23a33' }) + sT(E2 + 52, 50, '✓ found', { size: 12, w: 800, fill: '#b4461a' });
  b += sT(BX + BW / 2, 50, 'bucket', { size: 11, w: 800, fill: '#37474a' });
  rows.forEach((r, i) => {
    const y = Y0 + i * RH;
    if (r[0] === '…') { b += `<rect x="${BX}" y="${y}" width="${BW}" height="${RH}" fill="#fff" stroke="#c9d6d4" stroke-width="1.4" stroke-dasharray="4 3"/>` + sT(BX + BW / 2, y + 20, '⋮', { size: 14, w: 800, fill: '#8a9a9c' }); return; }
    const [n, chain] = r, hot = n === 0;
    b += `<rect x="${BX}" y="${y}" width="${BW}" height="${RH}" fill="${hot ? '#e8662e' : '#fff'}" stroke="#1b2a2e" stroke-width="1.6"/>` + sT(BX + BW / 2, y + 20, String(n), { size: 13, w: 800, fill: hot ? '#fff' : '#1b2a2e' });
    const cy = y + RH / 2;
    if (!chain.length) b += sT(BX + BW + 14, cy + 4, 'empty', { size: 12, w: 700, fill: '#8a9a9c', anchor: 'start' });
    chain.forEach(([k, v], j) => {
      const x = j === 0 ? E1 : E2;
      b += arrowF(j === 0 ? BX + BW + 4 : E1 + 106, cy, x - 3) + ent(x, cy - 13, k, v, hot && j === 1);
    });
  });
  b += sT(170, Y0 + rows.length * RH + 26, 'Aa and BB share bucket 0 (a collision). Both are kept.', { size: 12.5, w: 800, fill: '#0b544e' });
  return mapPic(340, Y0 + rows.length * RH + 38, 'Buckets of a HashMap with chaining. Bucket 0 holds a chain: Aa to first, then BB to second. Bucket 6 holds CAT to Puspin, bucket 12 holds DOG to Aspin, others are empty. get BB goes to bucket 0, checks Aa: not BB, then BB: found. Aa and BB share bucket 0, a collision, and both are kept.', b);
}

/** Clean: finding a grade in a list (by position, check one by one) vs a map (by key, one jump). */
export function posVsKey() {
  const ids = [['2025-0012', '89'], ['2025-0047', '92'], ['2025-0101', '89'], ['2025-0150', '85']];
  let b = sT(170, 20, 'Where is the grade of 2025-0101?', { size: 14, w: 800 });
  b += sT(18, 50, 'In a list: by position', { size: 13, w: 800, anchor: 'start', fill: '#0b544e' });
  ids.forEach(([id, g], i) => {
    const x = 18 + i * 77, hit = i === 2;
    b += sT(x + 36, 70, `[${i}]`, { mono: true, size: 12, w: 700, fill: '#37474a' });
    b += mapBox(x, 76, 72, 44, hit ? '#fce9e0' : '#fff', hit ? '#e8662e' : '#1b2a2e', hit ? 2.2 : 1.6, 5);
    b += sT(x + 36, 94, id, { mono: true, size: 10.5, w: 600, fill: '#37474a' }) + sT(x + 36, 113, g, { mono: true, size: 13, w: 700 });
    if (i < 3) b += `<circle cx="${x + 36}" cy="138" r="11" fill="${hit ? '#e8662e' : '#fff'}" stroke="${hit ? '#b4461a' : '#b23a33'}" stroke-width="1.6"/>` + sT(x + 36, 143, String(i + 1), { size: 12, w: 800, fill: hit ? '#fff' : '#b23a33' });
    if (i < 2) b += sT(x + 56, 143, '✗', { size: 13, w: 800, fill: '#b23a33' });
  });
  b += sT(228, 143, '✓', { size: 14, w: 800, fill: '#b4461a' });
  b += sT(170, 170, 'You don\'t know its position, so check one by one.', { size: 12.5, w: 700, fill: '#37474a' });
  b += `<line x1="16" y1="186" x2="324" y2="186" stroke="#c9d6d4" stroke-width="1.5" stroke-dasharray="5 5"/>`;
  b += sT(18, 210, 'In a map: by key', { size: 13, w: 800, anchor: 'start', fill: '#b4461a' });
  const tx = 168;
  b += mapBox(tx, 220, 154, 120, '#fff', '#1b2a2e', 1.8, 6);
  b += `<rect x="${tx + 1}" y="221" width="152" height="22" rx="5" fill="#e3f1ef"/><line x1="${tx}" y1="243" x2="${tx + 154}" y2="243" stroke="#1b2a2e" stroke-width="1.4"/><line x1="${tx + 96}" y1="220" x2="${tx + 96}" y2="340" stroke="#1b2a2e" stroke-width="1.4"/>`;
  b += sT(tx + 48, 237, 'key', { size: 12, w: 800, fill: '#0b544e' }) + sT(tx + 125, 237, 'value', { size: 12, w: 800, fill: '#b4461a' });
  ids.forEach(([id, g], i) => {
    const y = 243 + i * 24, hit = i === 2;
    if (hit) b += `<rect x="${tx + 2}" y="${y + 1}" width="150" height="22" rx="3" fill="#fce9e0" stroke="#e8662e" stroke-width="1.8"/>`;
    b += sT(tx + 48, y + 17, id, { mono: true, size: 12, w: 600 }) + sT(tx + 125, y + 17, g, { mono: true, size: 13, w: 700, fill: hit ? '#b4461a' : '#1b2a2e' });
  });
  b += sT(80, 284, 'get("2025-0101")', { mono: true, size: 12, w: 700, fill: '#b4461a' });
  b += mapArrow(128, 291, tx - 2, 291, '#e8662e', 2.4);
  b += sT(80, 306, 'one jump', { size: 12, w: 800, fill: '#b4461a' });
  b += sT(170, 364, 'Ask by the key you know. No counting positions.', { size: 12.5, w: 700, fill: '#37474a' });
  return mapPic(340, 376, 'Where is the grade of 2025-0101? In a list, by position: four boxes, [0] 2025-0012 89, [1] 2025-0047 92, [2] 2025-0101 89, [3] 2025-0150 85. You do not know its position, so you check one by one: 1 not it, 2 not it, 3 found. In a map, by key: a key and value table with the same four students; get 2025-0101 goes straight to its row and finds 89 in one jump.', b);
}

/** Clean: 67868 & 15 bit by bit; only the last 4 bits survive (1100 = 12). */
export function andBits() {
  const bits = (67868).toString(2), n = bits.length, W = 16, x0 = 340 - 8 - n * W;
  let b = sT(170, 18, '67868 & 15, bit by bit', { size: 14, w: 800 });
  b += `<rect x="${x0 + (n - 4) * W - 3}" y="28" width="${4 * W + 6}" height="114" rx="6" fill="#fce9e0" stroke="#e8662e" stroke-width="1.8"/>`;
  const row = (y, label, str, mode) => {
    let t = sT(x0 - 8, y + 17, label, { mono: true, size: 12.5, w: 700, anchor: 'end' });
    [...str].forEach((c, i) => {
      const last = i >= n - 4, dim = mode !== 'num' && !last;
      t += `<rect x="${x0 + i * W + 1}" y="${y}" width="${W - 2}" height="24" rx="3" fill="#fff" stroke="${dim ? '#c9d6d4' : '#1b2a2e'}" stroke-width="1.2"/>`;
      t += sT(x0 + i * W + W / 2, y + 17, c, { mono: true, size: 13, w: last ? 800 : 600, fill: dim ? '#9aa8aa' : (last ? '#b4461a' : '#1b2a2e') });
    });
    return t;
  };
  b += row(34, '67868', bits, 'num');
  b += row(66, '& 15', '0'.repeat(n - 4) + '1111', 'mask');
  b += `<line x1="${x0}" y1="98" x2="${x0 + n * W}" y2="98" stroke="#1b2a2e" stroke-width="2"/>`;
  b += row(108, '=', '0'.repeat(n - 4) + bits.slice(-4), 'res');
  ['8', '4', '2', '1'].forEach((p, i) => { b += sT(x0 + (n - 4 + i) * W + W / 2, 160, p, { size: 12, w: 800, fill: '#0b544e' }); });
  b += sT(x0 + (n - 4) * W - 8, 160, 'worth:', { size: 12, w: 700, anchor: 'end', fill: '#0b544e' });
  b += sT(170, 186, 'A 1 stays only where BOTH rows have a 1.', { size: 12.5, w: 700, fill: '#37474a' });
  b += sT(170, 206, '15 has 1s only in the last 4 places, so only they survive.', { size: 12.5, w: 700, fill: '#37474a' });
  b += sT(170, 230, '1100 = 8 + 4 = 12, so the bucket is 12.', { size: 13, w: 800, fill: '#b4461a' });
  return mapPic(340, 242, '67868 in binary is 1 0000 1001 0001 1100. Below it, 15 in binary: all zeros except 1111 at the end. AND them bit by bit: a 1 stays only where both rows have a 1, so only the last 4 bits survive: 1100. Those places are worth 8, 4, 2, 1, so 1100 = 8 + 4 = 12, bucket 12.', b);
}

/** Sketch: the faculty pigeonholes, with a made-up office rule (add letter places, then remainder ÷ 16). Tan -> 35 -> slot 3. */
export function pigeonWall() {
  const s = new Sketch(340, 392, 152);
  s.text(170, 20, '16 pigeonholes, one rule', { font: 'body', size: 15, weight: 800 });
  const env = (x, y, w, h, fill = '#fff', name = '') => {
    s.rect(x, y, w, h, { fill, sw: 1.5, rough: 0.7 });
    s.path(`M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}`, { sw: 1.3, single: true, rough: 0.5 });
    if (name) s.text(x + w / 2, y + h - 5, name, { font: 'body', size: 12, weight: 800 });
  };
  env(8, 52, 66, 40, '#fff', 'to: Tan');
  s.arrow(78, 72, 96, 72, { sw: 1.8 });
  s.round(100, 32, 232, 112, 10, { fill: C.butter, stroke: C.amber, sw: 1.8 });
  s.text(216, 50, "The office's rule", { font: 'body', size: 13, weight: 800 });
  s.text(110, 70, '1. Add up the letters\' alphabet places:', { font: 'body', size: 11.5, weight: 700, anchor: 'start', color: C.soft });
  s.text(216, 88, 'T 20 + A 1 + N 14 = 35', { font: 'mono', size: 13, weight: 700 });
  s.text(110, 108, '2. Divide by 16 and keep the remainder:', { font: 'body', size: 11.5, weight: 700, anchor: 'start', color: C.soft });
  s.text(216, 128, '35 ÷ 16 = 2 remainder 3', { font: 'mono', size: 13, weight: 700, color: C.orange });
  const X = 62, Y = 176, W = 54, H = 44;
  s.rect(X - 6, Y - 6, W * 4 + 12, H * 4 + 12, { fill: '#c99b62', sw: 1.8 });
  for (let i = 0; i < 16; i++) {
    const x = X + (i % 4) * W, y = Y + Math.floor(i / 4) * H, hot = i === 3;
    s.rect(x + 2, y + 2, W - 4, H - 4, { fill: hot ? C.orangeWash : '#f4ead8', stroke: hot ? C.orange : C.ink, sw: hot ? 2.2 : 1.3, rough: 0.6 });
    s.text(x + 11, y + 16, String(i), { font: 'body', size: 11, weight: 800, color: hot ? C.orange : C.soft });
    if ([6, 9, 13].includes(i)) s.rect(x + 20, y + 19, 24, 17, { fill: '#eef3f2', sw: 1.3, rough: 0.6 });
    if (hot) env(x + 18, y + 18, 28, 19, '#fff');
  }
  s.arrow(262, 146, 254, Y + 14, { stroke: C.orange, sw: 2.4, single: true });
  s.text(300, 166, 'slot 3', { font: 'body', size: 13, weight: 800, color: C.orange });
  s.text(170, 372, 'Looking for Tan\'s mail later? Same rule, same slot 3.', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  return s.svg('A letter to Tan goes through the office rule. Step 1: add each letter\'s place in the alphabet: T 20 + A 1 + N 14 = 35. Step 2: divide by 16 and keep the remainder: 35 divided by 16 is 2 remainder 3. So the letter goes into slot 3 of a wall of 16 pigeonholes numbered 0 to 15. Looking for Tan\'s mail later: same rule, same slot 3.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: the string "DOG" as characters in order, with index and character code. */
export function strChars() {
  let b = sT(170, 20, 'The string "DOG"', { size: 14, w: 800 });
  b += sT(84, 48, 'index', { size: 12, w: 700, anchor: 'end', fill: '#37474a' }) + sT(84, 84, 'char', { size: 12, w: 700, anchor: 'end', fill: '#0b544e' }) + sT(84, 124, 'code', { size: 12, w: 700, anchor: 'end', fill: '#b4461a' });
  [['D', 68], ['O', 79], ['G', 71]].forEach(([c, k], i) => {
    const x = 100 + i * 74;
    b += sT(x + 30, 48, String(i), { mono: true, size: 13, w: 700, fill: '#37474a' });
    b += mapBox(x, 58, 60, 38, '#e3f1ef', '#0e6b63', 2, 6) + sT(x + 30, 85, `'${c}'`, { mono: true, size: 18, w: 700 });
    b += mapArrow(x + 30, 98, x + 30, 108, '#b4461a', 1.6) + sT(x + 30, 126, String(k), { mono: true, size: 15, w: 700, fill: '#b4461a' });
  });
  b += sT(170, 154, 'A string is characters in order.', { size: 12.5, w: 700, fill: '#37474a' });
  b += sT(170, 174, 'Each character is stored as a number: its code.', { size: 12.5, w: 700, fill: '#37474a' });
  return mapPic(340, 184, 'The string DOG is three characters in order: D at index 0, O at index 1, G at index 2. The computer stores each character as a number, its code: D is 68, O is 79, G is 71.', b);
}

/** Clean: h as a running total for "CAT" (start 0; each row: 31 x h + code). */
export function hornerPic() {
  const T = '#0b544e', O = '#b4461a';
  let b = sT(170, 18, 'Building the hash code of "CAT"', { size: 14, w: 800 });
  b += sT(170, 38, 'teal = h so far   ·   orange = this character\'s code', { size: 11.5, w: 700, fill: '#37474a' });
  b += sT(196, 70, 'Start:', { size: 13, w: 800, anchor: 'end' });
  b += mapBox(212, 50, 112, 30, '#e3f1ef', '#0e6b63', 2, 6) + sT(268, 71, 'h = 0', { mono: true, size: 14, w: 700, fill: T });
  const rows = [['C', 67, 0, 67], ['A', 65, 67, 2142], ['T', 84, 2142, 66486]];
  rows.forEach(([c, k, before, after], i) => {
    const y = 104 + i * 58;
    b += mapArrow(232, y - 22, 124, y + 3, '#0e6b63', 1.6);
    b += `<circle cx="30" cy="${y + 15}" r="17" fill="#fce9e0" stroke="#e8662e" stroke-width="2"/>` + sT(30, y + 21, c, { mono: true, size: 16, w: 700 });
    b += `<text x="56" y="${y + 21}" font-family="monospace" font-size="13.5" font-weight="700" fill="#1b2a2e">31 × <tspan fill="${T}">${before.toLocaleString('en-US')}</tspan> + <tspan fill="${O}">${k}</tspan></text>`;
    b += mapBox(212, y, 112, 30, '#e3f1ef', '#0e6b63', 2, 6) + sT(268, y + 21, '= ' + after.toLocaleString('en-US'), { mono: true, size: 14, w: 700, fill: T });
  });
  b += sT(170, 300, 'No characters left, so the hash code is 66,486.', { size: 13, w: 800, fill: O });
  return mapPic(340, 312, 'Building the hash code of CAT. Start: h = 0. Character C, code 67: 31 times 0 plus 67 = 67. Character A, code 65: 31 times 67 plus 65 = 2,142. Character T, code 84: 31 times 2,142 plus 84 = 66,486. Each new h is carried down into the next row. No characters left, so the hash code is 66,486.', b);
}

/** Clean mini pictures for the hashCode exam traps. */
export function mapTrapPic(n) {
  const card = (x, y, w, h, ok) => mapBox(x, y, w, h, ok ? '#e3f1ef' : '#fbe4e1', ok ? '#0e6b63' : '#b23a33', 2, 8);
  let b = '', H = 0, label = '';
  if (n === 1) {
    H = 124; label = 'CAT has codes 67, 65, 84 and hash code 66,486. cat has codes 99, 97, 116 and hash code 98,262. Different hash codes.';
    [[8, 'CAT', '67 65 84', '66,486'], [190, 'cat', '99 97 116', '98,262']].forEach(([x, w, c, h]) => {
      b += card(x, 8, 142, 104, true) + sT(x + 71, 34, `"${w}"`, { mono: true, size: 17, w: 700 });
      b += sT(x + 71, 60, 'codes ' + c, { mono: true, size: 12, w: 600, fill: '#b4461a' }) + sT(x + 71, 96, h, { mono: true, size: 16, w: 700, fill: '#0b544e' });
      b += sT(x + 71, 78, 'hash code', { size: 11, w: 700, fill: '#37474a' });
    });
    b += sT(170, 68, '≠', { size: 30, w: 800, fill: '#b23a33' });
  } else if (n === 2) {
    H = 118; label = 'First character of DOG. Wrong: 31 times 68 = 2,108, the first code was multiplied. Right: h starts at 0, so 31 times 0 plus 68 = 68.';
    b += card(8, 8, 156, 100, false) + sT(86, 32, '✗ Wrong', { size: 13, w: 800, fill: '#b23a33' }) + sT(86, 62, '31 × 68', { mono: true, size: 15, w: 700 }) + sT(86, 84, '= 2,108', { mono: true, size: 15, w: 700, fill: '#b23a33' });
    b += card(176, 8, 156, 100, true) + sT(254, 32, '✓ Right', { size: 13, w: 800, fill: '#0b544e' }) + sT(254, 62, '31 × 0 + 68', { mono: true, size: 15, w: 700 }) + sT(254, 84, '= 68', { mono: true, size: 15, w: 700, fill: '#0b544e' });
    b += sT(86, 101, 'first code multiplied', { size: 10.5, w: 700, fill: '#37474a' }) + sT(254, 101, 'h starts at 0', { size: 10.5, w: 700, fill: '#37474a' });
  } else {
    H = 156; label = 'An odometer at 99999 plus 1 rolls over to 00000. A Java int at 2,147,483,647, its largest value, plus 1 wraps around to minus 2,147,483,648, its most negative value.';
    const odo = (x, y, d, col) => [...d].map((c, i) => mapBox(x + i * 22, y, 20, 28, '#1b2a2e', '#1b2a2e', 1, 3) + sT(x + i * 22 + 10, y + 20, c, { mono: true, size: 15, w: 700, fill: col })).join('');
    b += sT(170, 18, 'Odometer', { size: 12.5, w: 800, fill: '#37474a' });
    b += odo(18, 28, '99999', '#fff') + mapArrow(134, 42, 196, 42, '#e8662e', 2.2) + sT(165, 34, '+1', { size: 13, w: 800, fill: '#b4461a' }) + odo(210, 28, '00000', '#f8dc95');
    b += sT(170, 86, 'Java int', { size: 12.5, w: 800, fill: '#37474a' });
    b += mapBox(8, 96, 132, 32, '#e3f1ef', '#0e6b63', 2, 6) + sT(74, 117, '2,147,483,647', { mono: true, size: 13, w: 700 });
    b += mapArrow(144, 112, 186, 112, '#e8662e', 2.2) + sT(165, 104, '+1', { size: 13, w: 800, fill: '#b4461a' });
    b += mapBox(190, 96, 142, 32, '#fbe4e1', '#b23a33', 2, 6) + sT(261, 117, '−2,147,483,648', { mono: true, size: 13, w: 700, fill: '#b23a33' });
    b += sT(74, 146, 'largest int', { size: 11, w: 700, fill: '#37474a' }) + sT(261, 146, 'most negative int', { size: 11, w: 700, fill: '#37474a' });
  }
  return `<svg class="objbox trap-pic" viewBox="0 0 340 ${H}" role="img" aria-label="${label}">${b}</svg>`;
}

/* ---------------- Intro to DSA pictures (chat 14) ---------------- */
const introPic = (w, h, label, body) => `<svg class="objbox intro-pic" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;

/** Sketch: four everyday things that are data structures in disguise (stack, queue, tree, graph). */
export function expertFour() {
  const s = new Sketch(340, 404, 151);
  const panel = (x, y, title, tag) => {
    s.round(x, y, 160, 190, 10, { fill: '#fffdf5', sw: 1.6 });
    s.text(x + 80, y + 24, title, { font: 'body', size: 14, weight: 800 });
    s.text(x + 80, y + 178, tag, { font: 'body', size: 15, weight: 800, color: C.teal });
  };
  // 1. Recent apps = stack
  panel(6, 6, 'Recent apps', '= a stack');
  s.text(86, 50, 'last opened, on top', { font: 'body', size: 12, weight: 800, color: C.orange });
  [['Chat', C.orangeWash, C.orange], ['Notes', C.sky, C.ink], ['Camera', C.sky, C.ink], ['Music', C.sky, C.ink]].forEach(([n, f, k], i) => {
    s.round(30, 60 + i * 26, 112, 23, 5, { fill: f, sw: i === 0 ? 2.2 : 1.6, stroke: k });
    s.text(86, 76 + i * 26, n, { font: 'body', size: 13, weight: 800 });
  });
  // 2. Canteen line = queue
  panel(174, 6, 'Canteen line', '= a queue');
  s.rect(196, 38, 116, 20, { fill: C.butter, sw: 1.6 });
  s.text(254, 53, 'COUNTER', { font: 'body', size: 12, weight: 800 });
  [0, 1, 2, 3].forEach((i) => {
    const cy = 76 + i * 23;
    s.circle(214, cy, 15, { fill: i === 0 ? C.orangeWash : C.pink, sw: 1.6 });
    s.path(`M204 ${cy + 13} Q214 ${cy + 4} 224 ${cy + 13}`, { sw: 1.6 });
  });
  s.text(232, 81, 'served first', { font: 'body', size: 12, weight: 800, anchor: 'start', color: C.orange });
  s.text(232, 150, 'joins at the', { font: 'body', size: 12, weight: 700, anchor: 'start', color: C.soft });
  s.text(232, 164, 'back', { font: 'body', size: 12, weight: 700, anchor: 'start', color: C.soft });
  // 3. Folders = tree
  panel(6, 206, 'Folders', '= a tree');
  s.folder(66, 238, 'Documents', { w: 40, h: 30, size: 12.5 });
  s.line(86, 288, 46, 302, { sw: 1.6 });
  s.line(86, 288, 126, 302, { sw: 1.6 });
  s.folder(26, 304, 'ITC 120', { w: 40, h: 30, size: 12.5 });
  s.folder(106, 304, 'Photos', { w: 40, h: 30, size: 12.5 });
  // 4. Facebook friends = graph (profile pictures, blue header like a friends list)
  panel(174, 206, '', '= a graph');
  s.round(174, 206, 160, 32, 10, { fill: '#1877f2', sw: 1.6 });
  s.rect(175, 224, 158, 14, { fill: '#1877f2', sw: 0, stroke: '#1877f2' });
  s.text(254, 228, 'Facebook friends', { font: 'body', size: 13.5, weight: 800, color: '#ffffff' });
  const P = { Ana: [226, 262], Ben: [286, 260], Cy: [256, 300], Dan: [224, 340], Eva: [288, 338] };
  [['Ana', 'Ben'], ['Ana', 'Cy'], ['Ben', 'Cy'], ['Cy', 'Dan'], ['Cy', 'Eva'], ['Ben', 'Eva'], ['Ana', 'Dan']].forEach(([a, b]) => s.line(...P[a], ...P[b], { sw: 1.6, stroke: '#8fb4e8' }));
  Object.entries(P).forEach(([k, [x, y]]) => {
    s.circle(x, y, 30, { fill: '#e7f0fd', sw: 1.8, stroke: '#1877f2' });
    s.circle(x, y - 4, 10, { fill: '#8fa9c9', sw: 0, stroke: '#8fa9c9' });
    s.path(`M${x - 9} ${y + 12} Q${x} ${y} ${x + 9} ${y + 12}`, { fill: '#8fa9c9', sw: 0, stroke: '#8fa9c9' });
    s.text(x + (x < 240 ? -18 : 18), y + 5, k, { font: 'body', size: 12, weight: 800, anchor: x < 240 ? 'end' : 'start' });
  });
  return s.svg('Four everyday things. Recent apps: Chat, the app opened last, sits on top of Notes, Camera, and Music, so it is a stack. Canteen line: four people line up at the counter; the first is served first and new people join at the back, so it is a queue. Folders: Documents holds ITC 120 and Photos, so it is a tree. Facebook friends: five profile pictures (Ana, Ben, Cy, Dan, Eva) linked in a web of friendships, so it is a graph.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: data (loose slips) vs a data structure (a class list). */
export function dataSlips() {
  const s = new Sketch(340, 258, 152);
  s.text(80, 22, 'Data', { font: 'body', size: 15, weight: 800 });
  s.text(258, 22, 'Data structure', { font: 'body', size: 15, weight: 800, color: C.teal });
  const slip = (cx, cy, ang, t) => {
    const w = 52, h = 28, a = (ang * Math.PI) / 180, c = Math.cos(a), si = Math.sin(a);
    const pts = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([x, y]) => `${(cx + x * c - y * si).toFixed(1)} ${(cy + x * si + y * c).toFixed(1)}`);
    s.path(`M${pts.join(' L')} Z`, { fill: '#fffdf5', sw: 1.5 });
    s.text(cx, cy + 5, t, { font: 'body', size: 13.5, weight: 800, rotate: ang });
  };
  slip(44, 64, -12, 'Ana'); slip(112, 58, 9, '85'); slip(76, 104, 4, 'Cruz');
  slip(36, 146, 10, '92'); slip(108, 136, -8, 'Ben'); slip(84, 178, -5, '88');
  s.arrow(150, 120, 182, 120, { stroke: C.orange, sw: 2.4 });
  s.rect(190, 40, 140, 152, { fill: '#fffdf5', sw: 1.8 });
  s.text(260, 62, 'Class list', { font: 'body', size: 13, weight: 800, color: C.teal });
  s.line(196, 72, 324, 72, { sw: 1.3, single: true, rough: 0.4 });
  s.text(222, 92, 'Name', { font: 'body', size: 12.5, weight: 800, color: C.soft });
  s.text(296, 92, 'Score', { font: 'body', size: 12.5, weight: 800, color: C.soft });
  s.line(266, 76, 266, 186, { stroke: C.soft, sw: 1.1, single: true, rough: 0.4 });
  [['Ana', '92'], ['Ben', '85'], ['Cruz', '88']].forEach(([n, v], i) => {
    const y = 122 + i * 26;
    s.text(222, y, n, { font: 'body', size: 14, weight: 700 });
    s.text(296, y, v, { font: 'body', size: 14, weight: 800 });
  });
  s.text(80, 222, 'Loose facts, no order.', { font: 'body', size: 12.5, weight: 800, color: C.red });
  s.text(80, 240, "Which score is Ana's?", { font: 'body', size: 12.5, weight: 800, color: C.red });
  s.text(260, 222, 'Arranged in rows:', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.text(260, 240, "Ana's score is beside her.", { font: 'body', size: 12.5, weight: 800, color: C.teal });
  return s.svg("Left, data: six loose slips of paper (Ana, 85, Cruz, 92, Ben, 88) in no order, so you cannot tell which score is Ana's. Right, a data structure: the same facts arranged in a class list with Name and Score columns: Ana 92, Ben 85, Cruz 88, so Ana's score is beside her name.").replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: spices dumped in one box vs a labeled spice rack. */
export function spiceRack() {
  const s = new Sketch(340, 262, 153);
  s.text(84, 22, 'Bad fit: one big box', { font: 'body', size: 13, weight: 800, color: C.red });
  s.text(259, 22, 'Good fit: a labeled rack', { font: 'body', size: 13, weight: 800, color: C.teal });
  // box with a jumble of jars
  s.path('M14 90 L154 90 L146 196 L22 196 Z', { fill: '#e9d3b0', sw: 1.8 });
  const jar = (x, y, f, tilt = 0) => {
    const d = `M${x} ${y} l${22 + tilt} ${-tilt / 2} l${-tilt / 3} 34 l-22 ${tilt / 2} Z`;
    s.path(d, { fill: f, sw: 1.5 });
  };
  jar(30, 64, C.orangeWash, 6); jar(58, 56, C.sky, -4); jar(86, 60, C.butter, 8); jar(112, 54, C.pink, -6);
  jar(44, 84, C.tealWash, -8); jar(74, 82, C.pink, 5); jar(100, 86, C.sky, -3);
  s.path('M14 90 L154 90 L146 196 L22 196 Z', { fill: '#e9d3b0', sw: 1.8 });
  s.text(84, 150, 'salt?', { font: 'body', size: 18, weight: 800, color: C.red });
  s.text(84, 226, '✗ Dig through everything', { font: 'body', size: 12.5, weight: 800, color: C.red });
  s.text(84, 244, 'just to find salt', { font: 'body', size: 12.5, weight: 800, color: C.red });
  // rack
  s.rect(182, 44, 154, 160, { fill: '#fffdf5', sw: 1.8 });
  [118, 196].forEach((y) => s.line(182, y, 336, y, { sw: 2.4 }));
  const labels = [['Chili', 'Laurel', 'Pepper'], ['Salt', 'Sugar', 'Garlic']];
  labels.forEach((row, r) => row.forEach((n, i) => {
    const x = 186 + i * 50, y = r === 0 ? 70 : 148, hot = n === 'Salt';
    s.round(x, y, 46, 48, 5, { fill: hot ? C.orangeWash : C.tealWash, sw: hot ? 2.4 : 1.5, stroke: hot ? C.orange : C.ink });
    s.text(x + 23, y + 30, n, { font: 'body', size: 12, weight: 800 });
  }));
  s.text(260, 226, '✓ Grab the salt', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.text(260, 244, 'in seconds', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  return s.svg('Bad fit: spice jars dumped in one big box; you dig through everything just to find salt. Good fit: a labeled spice rack with two shelves (Chili, Laurel, Pepper; Salt, Sugar, Garlic); you grab the salt in seconds.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: linear (one row, first to last) vs non-linear (a tree and a graph). */
export function familiesPic() {
  let b = sT(170, 22, 'Linear: one after another', { size: 15, w: 800, fill: '#0b544e' });
  [19, 3, 42, 7, 56].forEach((v, i) => {
    const x = 16 + i * 64;
    b += mapBox(x, 40, 46, 38, '#e3f1ef', '#0e6b63', 2.2) + sT(x + 23, 65, v, { mono: true, size: 15, w: 700 });
    if (i < 4) b += mapArrow(x + 48, 59, x + 62, 59, '#1b2a2e', 2);
  });
  b += sT(39, 98, 'first', { size: 13, w: 800, fill: '#37474a' }) + sT(295, 98, 'last', { size: 13, w: 800, fill: '#37474a' });
  b += sT(170, 122, 'One natural order: start at the first, end at the last.', { size: 12.5, w: 700, fill: '#37474a' });
  b += `<line x1="10" y1="140" x2="330" y2="140" stroke="#c9d6d4" stroke-width="1.5" stroke-dasharray="6 5"/>`;
  b += sT(170, 166, 'Non-linear: branches or a network', { size: 15, w: 800, fill: '#b4461a' });
  const node = (x, y, t) => `<circle cx="${x}" cy="${y}" r="15" fill="#fce9e0" stroke="#e8662e" stroke-width="2.2"/>` + sT(x, y + 5, t, { size: 14, w: 800 });
  const ln = (a, b2) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b2[0]}" y2="${b2[1]}" stroke="#1b2a2e" stroke-width="2"/>`;
  const T = { A: [84, 196], B: [44, 250], C: [124, 250], D: [20, 300], E: [68, 300] };
  b += ln(T.A, T.B) + ln(T.A, T.C) + ln(T.B, T.D) + ln(T.B, T.E);
  b += Object.entries(T).map(([k, [x, y]]) => node(x, y, k)).join('');
  const G = { P: [208, 200], Q: [296, 196], R: [252, 246], S: [204, 296], U: [304, 290] };
  b += ln(G.P, G.Q) + ln(G.P, G.R) + ln(G.Q, G.R) + ln(G.R, G.S) + ln(G.R, G.U) + ln(G.Q, G.U) + ln(G.P, G.S);
  b += Object.entries(G).map(([k, [x, y]]) => node(x, y, k)).join('');
  b += sT(84, 340, 'tree: branches', { size: 13, w: 800, fill: '#37474a' }) + sT(256, 340, 'graph: a network', { size: 13, w: 800, fill: '#37474a' });
  b += sT(170, 366, 'No single order: you choose a route to visit all.', { size: 12.5, w: 700, fill: '#37474a' });
  return introPic(340, 378, 'Linear: five boxes 19, 3, 42, 7, 56 in a row joined by arrows, from first to last; one natural order. Non-linear: a tree (A has children B and C; B has children D and E) and a graph (P, Q, R, S, U joined in a web with loops). There is no single order, so you choose a route to visit them all.', b);
}

/** Sketch: an algorithm is like a recipe (sinangag): input, exact steps in order, it ends, output. */
export function recipeCard() {
  const s = new Sketch(340, 404, 155);
  s.text(170, 20, 'Input', { font: 'body', size: 14, weight: 800, color: C.teal });
  [['3 cups rice', 100, 34], ['4 garlic cloves', 230, 34], ['2 tbsp oil', 100, 64], ['1 tsp salt', 230, 64]].forEach(([t, x, y]) => {
    s.round(x - 54, y - 4, 108, 26, 13, { fill: C.tealWash, sw: 1.5 });
    s.text(x, y + 14, t, { font: 'body', size: 12.5, weight: 800 });
  });
  s.arrow(170, 96, 170, 118, { stroke: C.soft, sw: 2 });
  s.rect(26, 124, 288, 172, { fill: '#fffdf5', sw: 1.8 });
  s.text(170, 150, 'Sinangag (garlic fried rice)', { font: 'body', size: 14.5, weight: 800, color: C.orange });
  s.line(40, 160, 300, 160, { stroke: C.soft, sw: 1.2, single: true, rough: 0.4 });
  ['1. Mince the garlic.', '2. Fry it in the oil until golden.', '3. Add the rice. Stir for 5 minutes.', '4. Add the salt. Stir. Done!'].forEach((t, i) => {
    s.text(42, 184 + i * 26, t, { font: 'body', size: 13, weight: 700, anchor: 'start' });
  });
  s.text(170, 286, 'Exact steps, in order, and it ends.', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.arrow(170, 302, 170, 324, { stroke: C.soft, sw: 2 });
  s.path('M120 344 Q170 396 220 344 Z', { fill: C.card, sw: 1.8 });
  s.ellipse(170, 344, 100, 16, { fill: C.butter, sw: 1.6 });
  [[150, 340], [166, 346], [184, 341], [196, 347], [158, 348]].forEach(([x, y]) => s.circle(x, y, 4, { fill: C.amber, sw: 1 }));
  s.text(236, 358, 'Output:', { font: 'body', size: 13.5, weight: 800, anchor: 'start', color: C.teal });
  s.text(236, 376, 'sinangag!', { font: 'body', size: 13.5, weight: 800, anchor: 'start' });
  return s.svg('A recipe as an algorithm. Input: 3 cups rice, 4 garlic cloves, 2 tablespoons oil, 1 teaspoon salt. Recipe card for sinangag (garlic fried rice): 1. Mince the garlic. 2. Fry it in the oil until golden. 3. Add the rice and stir for 5 minutes. 4. Add the salt, stir, done. Exact steps, in order, and it ends. Output: a plate of sinangag.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: an algorithm as a machine; each of its parts shows one of the five traits (find the highest score). */
export function traitsPic() {
  const s = new Sketch(340, 400, 173);
  const tag = (x, y, n, name, col, note, size = 13.5) => {
    s.circle(x, y - 5, 20, { fill: col, stroke: col, sw: 1.3 });
    s.text(x, y, String(n), { font: 'body', size: 12.5, weight: 800, color: '#ffffff' });
    s.text(x + 15, y, name, { font: 'body', size, weight: 800, anchor: 'start', color: col });
    if (note) s.text(x + 15, y + 18, note, { font: 'body', size: 12, weight: 700, anchor: 'start', color: C.soft });
  };
  // 1 Input: scores drop into a funnel
  tag(18, 30, 1, 'Input', '#0e6b63', 'scores go in');
  [92, 75, 88].forEach((v, i) => { s.round(112 + i * 40, 14, 34, 26, 7, { fill: C.tealWash, stroke: C.teal, sw: 1.5 }); s.text(129 + i * 40, 32, String(v), { font: 'mono', size: 13.5, weight: 700 }); });
  s.path('M118 52 L222 52 L188 80 L152 80 Z', { fill: '#cfd8d8', sw: 1.8 });
  s.rect(152, 80, 36, 24, { fill: '#cfd8d8', sw: 1.6 });
  s.arrow(170, 44, 170, 70, { stroke: C.soft, sw: 1.8, head: 7 });
  // 4 Finiteness: a stop light on top
  tag(254, 30, 4, 'Finiteness', '#b23a33', 'it stops', 13);
  s.rect(278, 66, 10, 38, { fill: C.ink, sw: 1.2 });
  s.round(266, 54, 34, 26, 8, { fill: C.ink, sw: 1.5 });
  s.circle(283, 67, 18, { fill: C.red, stroke: C.red, sw: 1 });
  s.text(283, 71, 'STOP', { font: 'body', size: 7.5, weight: 800, color: '#ffffff' });
  // the machine
  s.round(16, 104, 308, 214, 14, { fill: '#fbefd0', sw: 2.2 });
  s.rect(16, 104, 308, 30, { fill: C.teal, stroke: C.teal, sw: 1.5 });
  s.text(170, 124, 'Algorithm: find the highest score', { font: 'body', size: 13.5, weight: 800, color: '#ffffff' });
  // 3 Definiteness: the instruction card
  s.rect(30, 144, 166, 104, { fill: '#ffffff', sw: 1.6 });
  ['• highest = first score', '• next score > highest?', 'yes: keep it', '• no scores left? stop'].forEach((t, i) => s.text(i === 2 ? 52 : 38, 166 + i * 22, t, { font: 'body', size: 12, weight: 700, anchor: 'start' }));
  // 5 Effectiveness: simple gears
  const gear = (cx, cy, r, col) => {
    for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; s.line(cx + r * Math.cos(a), cy + r * Math.sin(a), cx + (r + 6) * Math.cos(a), cy + (r + 6) * Math.sin(a), { stroke: C.ink, sw: 4, single: true, rough: 0.3 }); }
    s.circle(cx, cy, r * 2, { fill: col, sw: 1.8 });
    s.circle(cx, cy, r * 0.6, { fill: '#ffffff', sw: 1.4 });
  };
  gear(240, 172, 18, C.amber); gear(285, 198, 13, C.orangeWash); gear(246, 226, 14, C.tealWash);
  s.line(26, 258, 314, 258, { stroke: C.soft, sw: 1.2, single: true, rough: 0.4 });
  tag(38, 282, 3, 'Definiteness', '#b4461a', 'exact, clear steps', 13);
  tag(200, 282, 5, 'Effectiveness', '#2e7d4f', 'simple steps', 12.5);
  // 2 Output: the tray
  s.rect(146, 318, 48, 14, { fill: '#9aa8aa', sw: 1.5 });
  s.round(146, 340, 48, 28, 7, { fill: C.orangeWash, stroke: C.orange, sw: 1.8 });
  s.text(170, 360, '92', { font: 'mono', size: 15, weight: 700 });
  s.path('M120 372 L220 372 L208 388 L132 388 Z', { fill: '#cfd8d8', sw: 1.6 });
  tag(18, 356, 2, 'Output', '#2f6fa8', '92 comes out');
  return s.svg('An algorithm drawn as a machine, find the highest score. 1 Input: the scores 92, 75, 88 drop into a funnel. 3 Definiteness: inside is an instruction card with exact steps: highest = first score; is the next score greater than highest? if yes, keep it; no scores left? stop. 5 Effectiveness: simple gears, small simple steps. 4 Finiteness: a red STOP light on top: it stops. 2 Output: 92 comes out onto a tray.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: the same three steps, in words (algorithm) and in Java (program). */
export function algoVsProg() {
  let b = mapBox(20, 10, 300, 112, '#e3f1ef', '#0e6b63', 2.2, 8);
  b += sT(170, 34, 'Algorithm: the steps, in words', { size: 14.5, w: 800, fill: '#0b544e' });
  ['1. Ask for two numbers.', '2. Add them.', '3. Show the result.'].forEach((t, i) => { b += sT(40, 60 + i * 22, t, { size: 13.5, w: 700, anchor: 'start' }); });
  b += mapArrow(170, 126, 170, 160, '#e8662e', 2.6);
  b += sT(182, 148, 'written in Java', { size: 13, w: 800, anchor: 'start', fill: '#b4461a' });
  b += mapBox(20, 166, 300, 128, '#1b2a2e', '#1b2a2e', 2, 8);
  b += sT(170, 188, 'Program: code a computer can run', { size: 13.5, w: 800, fill: '#f8dc95' });
  [['int a = in.nextInt();', '1'], ['int b = in.nextInt();', '1'], ['int sum = a + b;', '2'], ['System.out.println(sum);', '3']].forEach(([t, k], i) => {
    const y = 214 + i * 22;
    b += sT(36, y, t, { mono: true, size: 12.5, w: 600, anchor: 'start', fill: '#ffffff' });
    b += `<circle cx="298" cy="${y - 4}" r="9" fill="#e8662e"/>` + sT(298, y + 1, k, { size: 12, w: 800, fill: '#fff' });
  });
  return introPic(340, 302, 'Top: the algorithm, the steps in words: 1. Ask for two numbers. 2. Add them. 3. Show the result. An arrow labeled written in Java leads to the program: int a = in.nextInt(); int b = in.nextInt(); (step 1), int sum = a + b; (step 2), System.out.println(sum); (step 3).', b);
}

/** Clean: programming is the whole loop; coding is one step of it. */
export function progCycle() {
  const st = [['Define', 170, 34], ['Plan', 282, 88], ['Code', 282, 192], ['Test', 170, 246], ['Debug', 58, 192], ['Improve', 58, 88]];
  let b = '';
  for (let i = 0; i < st.length; i++) {
    const [, x1, y1] = st[i], [, x2, y2] = st[(i + 1) % st.length];
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const sx = x1 + (dx / L) * 34, sy = y1 + (dy / L) * 22, ex = x2 - (dx / L) * 40, ey = y2 - (dy / L) * 24;
    b += mapArrow(+sx.toFixed(1), +sy.toFixed(1), +ex.toFixed(1), +ey.toFixed(1), '#0e6b63', 2.2);
  }
  st.forEach(([n, x, y]) => {
    const hot = n === 'Code';
    b += mapBox(x - 42, y - 16, 84, 32, hot ? '#fce9e0' : '#e3f1ef', hot ? '#e8662e' : '#0e6b63', hot ? 2.8 : 2, 16);
    b += sT(x, y + 5, n, { size: 14, w: 800, fill: hot ? '#b4461a' : '#0b544e' });
  });
  b += sT(170, 116, 'Programming', { size: 15, w: 800, fill: '#0b544e' }) + sT(170, 134, '= the whole loop', { size: 13, w: 700, fill: '#37474a' });
  b += sT(170, 168, 'Coding', { size: 15, w: 800, fill: '#b4461a' }) + sT(170, 186, '= one step', { size: 13, w: 700, fill: '#37474a' });
  return introPic(340, 272, 'A loop of six steps: Define, Plan, Code, Test, Debug, Improve, then back to Define. Programming is the whole loop; coding (highlighted) is one step of it.', b);
}

/** Clean: the four lesson labels (same colors as the chips under each lesson title), plus how a lesson gets two. */
export function dsAlgoPic() {
  let b = '';
  const chips = { ds: ['Data structure', '#d7ece9', '#0e6b63', '#0b4f49'], algo: ['Algorithm', '#fbdccc', '#e8662e', '#8a3510'], adt: ['Abstract data type (ADT)', '#f8dc95', '#c98a1c', '#5c3f05'], tech: ['Technique', '#ffffff', '#37474a', '#1b2a2e'] };
  const chip = (x, y, k, size = 14) => { const [t, bg, bd, fg] = chips[k], w = Math.round(t.length * size * 0.56 + 22); return { w, svg: mapBox(x, y, w, 26, bg, bd, 1.8, 13) + sT(x + w / 2, y + 18, t, { size, w: 800, fill: fg }) }; };
  const arr = (x, y, hot = -1) => [19, 3, 42, 7].map((v, i) => mapBox(x + i * 34, y, 34, 32, i === hot ? '#fce9e0' : '#e3f1ef', i === hot ? '#e8662e' : '#0e6b63', 2, 3) + sT(x + i * 34 + 17, y + 21, v, { mono: true, size: 13.5, w: 700 })).join('');
  const card = (y, h, k, cap, dashed = false) => {
    b += dashed ? `<rect x="6" y="${y}" width="328" height="${h}" rx="10" fill="#f6f9fc" stroke="#2f6fa8" stroke-width="1.8" stroke-dasharray="7 5"/>` : mapBox(6, y, 328, h, '#fff', '#c9d6d4', 1.5, 10);
    if (k) b += chip(18, y + 14, k).svg;
    cap.forEach((t, i) => { b += sT(20, y + 64 + i * 18, t, { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' }); });
  };
  let y = 6;
  card(y, 100, 'ds', ['stores the data']);
  b += arr(186, y + 30) + [0, 1, 2, 3].map((i) => sT(203 + i * 34, y + 80, i, { mono: true, size: 12, w: 600, fill: '#37474a' })).join('');
  y += 122;
  card(y, 112, 'algo', ['steps that work on a', 'data structure, such as', 'finding the largest']);
  b += [0, 1, 2, 3].map((i) => sT(203 + i * 34, y + 38, '✓', { size: 15, w: 800, fill: '#2e7d4f' })).join('');
  b += arr(186, y + 46, 2) + sT(254, y + 96, 'largest: 42', { size: 13, w: 800, fill: '#b4461a' });
  y += 134;
  card(y, 158, null, [], true);
  b += sT(18, y + 28, 'Both: one lesson, two labels', { size: 15.5, w: 800, anchor: 'start', fill: '#2f6fa8' });
  const c1 = chip(18, y + 40, 'ds', 13), c2 = chip(18 + c1.w + 8, y + 40, 'algo', 13);
  b += c1.svg + c2.svg + sT(26 + c1.w + c2.w + 10, y + 58, 'e.g. Arrays', { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' });
  b += arr(18, y + 84) + sT(86, y + 142, 'the structure', { size: 12.5, w: 700, fill: '#37474a' });
  b += sT(172, y + 107, '+', { size: 20, w: 800, fill: '#2f6fa8' });
  ['access', 'traverse', 'insert', 'delete'].forEach((t, k) => { const cx = 190 + (k % 2) * 72, cy = y + 72 + Math.floor(k / 2) * 30; b += mapBox(cx, cy, 66, 24, '#fbdccc', '#e8662e', 1.5, 12) + sT(cx + 33, cy + 17, t, { size: 12, w: 800, fill: '#8a3510' }); });
  b += sT(258, y + 142, 'the steps that use it', { size: 12.5, w: 700, fill: '#37474a' });
  y += 180;
  card(y, 120, 'adt', ['says WHAT it can do,', 'not HOW it is stored']);
  b += mapBox(204, y + 48, 120, 62, '#fff8e6', '#c98a1c', 1.8, 6);
  b += sT(264, y + 68, 'A set can:', { size: 13, w: 800, fill: '#5c3f05' }) + sT(264, y + 86, 'add · remove', { size: 12.5, w: 700 }) + sT(264, y + 103, 'contains', { size: 12.5, w: 700 });
  y += 142;
  card(y, 112, 'tech', ['a way to build many', 'algorithms, such as', 'recursion']);
  b += mapBox(196, y + 44, 96, 30, '#fff', '#37474a', 2, 6) + sT(244, y + 64, 'count(n)', { mono: true, size: 13, w: 700 });
  b += `<path d="M292 ${y + 59} H314 V${y + 26} H244 V${y + 35}" fill="none" stroke="#e8662e" stroke-width="2.2" stroke-linejoin="round"/>` + mapArrow(244, y + 30, 244, y + 42, '#e8662e', 2.2);
  b += sT(244, y + 96, 'calls itself', { size: 12.5, w: 800, fill: '#b4461a' });
  y += 112;
  return introPic(340, y + 6, 'The four labels under each lesson title, in the same colors. Data structure: an array holding 19, 3, 42, 7 at indexes 0 to 3; it stores the data. Algorithm: steps that work on a data structure, such as finding the largest: check every value; largest: 42. Both: one lesson can get two labels, Data structure and Algorithm, for example Arrays: the array plus the steps that use it (access, traverse, insert, delete). Abstract data type (ADT): says what it can do, not how it is stored; a set can add, remove, and check contains. Technique: a way to build many algorithms, such as recursion: a method count(n) that calls itself.', b);
}

/* ---------------- Programming refresher pictures (chat 14) ---------------- */

/** Sketch: four variables as labeled boxes (name tag on top, value inside, type below). */
export function varBoxes() {
  const s = new Sketch(340, 168, 161);
  [['name', '"Ana"', 'String'], ['score', '92', 'int'], ['average', '85.0', 'double'], ['passed', 'true', 'boolean']].forEach(([n, v, t], i) => {
    const x = 8 + i * 83;
    s.round(x + 8, 14, 64, 26, 6, { fill: C.butter, sw: 1.5 });
    s.text(x + 40, 32, n, { font: 'mono', size: 12.5, weight: 700 });
    s.line(x + 40, 40, x + 40, 52, { sw: 1.5 });
    s.path(`M${x} 60 L${x + 80} 60 L${x + 76} 120 L${x + 4} 120 Z`, { fill: '#e9d3b0', sw: 1.8 });
    s.path(`M${x} 60 L${x + 12} 50 L${x + 68} 50 L${x + 80} 60`, { fill: '#d9bf95', sw: 1.5 });
    s.text(x + 40, 96, v, { font: 'mono', size: 15, weight: 700 });
    s.text(x + 40, 144, t, { font: 'body', size: 13, weight: 800, color: C.teal });
  });
  s.text(170, 164, 'name tag on top · value inside · type below', { font: 'body', size: 12, weight: 700, color: C.soft });
  return s.svg('Four boxes, each with a name tag and a value: name holds "Ana" (type String), score holds 92 (int), average holds 85.0 (double), passed holds true (boolean). Name tag on top, value inside, type below.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: x = x + 2 in two steps (work out the right side, then store on the left). */
export function assignPic() {
  let b = sT(170, 26, 'x = x + 2', { mono: true, size: 18, w: 700 });
  b += mapBox(10, 44, 320, 108, '#fff', '#c9d6d4', 1.5, 10);
  b += sT(30, 72, 'Step 1: work out the right side', { size: 14, w: 800, fill: '#b4461a', anchor: 'start' });
  b += sT(66, 124, 'x + 2', { mono: true, size: 17, w: 700 }) + mapArrow(104, 118, 138, 118, '#37474a', 2);
  b += sT(182, 124, '5 + 2', { mono: true, size: 17, w: 700 }) + mapArrow(220, 118, 254, 118, '#37474a', 2);
  b += sT(282, 126, '7', { mono: true, size: 22, w: 700, fill: '#b4461a' });
  b += sT(124, 144, 'x is 5 right now', { size: 12, w: 700, fill: '#37474a' });
  b += mapBox(10, 210, 320, 150, '#fff', '#c9d6d4', 1.5, 10);
  b += sT(30, 238, 'Step 2: store it in x', { size: 14, w: 800, fill: '#0b544e', anchor: 'start' });
  b += mapBox(240, 280, 84, 60, '#e3f1ef', '#0e6b63', 2.4, 6) + sT(228, 316, 'x', { mono: true, size: 16, w: 700, anchor: 'end' });
  b += sT(262, 318, '5', { mono: true, size: 18, w: 700, fill: '#37474a' }) + `<line x1="252" y1="322" x2="272" y2="302" stroke="#b23a33" stroke-width="2.4"/>`;
  b += sT(302, 320, '7', { mono: true, size: 22, w: 700, fill: '#b4461a' });
  b += sT(30, 282, 'Before: x holds 5.', { size: 13.5, w: 700, anchor: 'start' });
  b += sT(30, 308, 'After: x holds 7.', { size: 13.5, w: 800, anchor: 'start', fill: '#b4461a' });
  b += sT(30, 334, 'The old 5 is replaced.', { size: 13, w: 700, anchor: 'start', fill: '#37474a' });
  b += mapArrow(282, 140, 282, 274, '#e8662e', 2.8);
  b += sT(272, 188, 'store', { size: 13.5, w: 800, fill: '#b4461a', anchor: 'end' });
  return introPic(340, 370, 'x = x + 2 in two steps. Step 1, work out the right side: x is 5 right now, so x + 2 becomes 5 + 2 becomes 7. A long arrow labeled store carries the 7 down to step 2, store it in x: the box named x had 5; the 5 is crossed out and 7 is written in. Before, x holds 5; after, x holds 7; the old 5 is replaced.', b);
}

/** Clean: if/else as a flowchart, with score 92 following the YES path. */
export function condFlow() {
  let b = sT(170, 20, 'score is 92', { size: 13.5, w: 800, fill: '#37474a' });
  b += mapArrow(170, 28, 170, 44, '#1b2a2e', 2);
  b += `<path d="M170 46 L250 86 L170 126 L90 86 Z" fill="#fff8e6" stroke="#f0a93b" stroke-width="2.4"/>`;
  b += sT(170, 92, 'score >= 75 ?', { mono: true, size: 13.5, w: 700 });
  b += mapArrow(250, 86, 268, 140, '#e8662e', 2.8) + sT(276, 108, 'YES', { size: 13, w: 800, fill: '#b4461a', anchor: 'start' });
  b += mapArrow(90, 86, 72, 140, '#9aa5a6', 2) + sT(64, 108, 'NO', { size: 13, w: 800, fill: '#6b7778', anchor: 'end' });
  b += mapBox(196, 144, 140, 40, '#fce9e0', '#e8662e', 2.6, 8) + sT(266, 169, 'passed = true;', { mono: true, size: 13, w: 700 });
  b += mapBox(4, 144, 140, 40, '#f3f5f5', '#9aa5a6', 1.8, 8) + sT(74, 169, 'passed = false;', { mono: true, size: 13, w: 700, fill: '#6b7778' });
  b += sT(170, 210, 'Only one path runs. 92 >= 75 is true, so YES.', { size: 12.5, w: 700, fill: '#37474a' });
  return introPic(340, 220, 'A flowchart. score is 92. Diamond: score >= 75? The YES arrow, highlighted, leads to passed = true. The NO arrow, gray, leads to passed = false. Only one path runs; 92 >= 75 is true, so YES.', b);
}

/** Clean: the for loop round by round, then the stop. */
export function loopPic() {
  let b = '';
  [0, 1, 2, 3].forEach((i) => {
    const x = 6 + i * 84;
    b += mapBox(x, 10, 74, 92, '#e3f1ef', '#0e6b63', 2, 8);
    b += sT(x + 37, 30, 'Round ' + (i + 1), { size: 12.5, w: 800, fill: '#0b544e' });
    b += sT(x + 37, 56, 'i = ' + i, { mono: true, size: 14, w: 700 });
    b += sT(x + 37, 76, i + ' < 4 ✓', { mono: true, size: 12, w: 600, fill: '#2e7d4f' });
    b += sT(x + 37, 94, 'prints ' + i, { size: 12, w: 800, fill: '#b4461a' });
    if (i < 3) b += sT(x + 79, 120, 'i++', { mono: true, size: 12, w: 700, fill: '#37474a' });
  });
  b += mapBox(60, 136, 220, 44, '#fbe3e1', '#b23a33', 2, 8);
  b += sT(170, 156, 'i = 4:  4 < 4 is false', { mono: true, size: 13, w: 700, fill: '#b23a33' });
  b += sT(170, 173, 'the loop stops', { size: 12.5, w: 800, fill: '#b23a33' });
  b += sT(170, 204, 'Same lines every round; only i changes.', { size: 12.5, w: 700, fill: '#37474a' });
  return introPic(340, 214, 'The loop round by round. Round 1: i = 0, 0 < 4 is true, prints 0. Round 2: i = 1, prints 1. Round 3: i = 2, prints 2. Round 4: i = 3, prints 3. i++ between rounds. Then i = 4: 4 < 4 is false, so the loop stops. Same lines every round; only i changes.', b);
}

/** Sketch: a method as a small machine: larger(3, 8) gives back 8. */
export function methodMachine() {
  const s = new Sketch(340, 222, 165);
  s.text(170, 20, 'larger(3, 8)', { font: 'mono', size: 15, weight: 700 });
  // inputs
  s.round(108, 34, 64, 30, 15, { fill: C.tealWash, sw: 1.6 }); s.text(140, 54, 'a = 3', { font: 'mono', size: 13, weight: 700 });
  s.round(200, 34, 64, 30, 15, { fill: C.tealWash, sw: 1.6 }); s.text(232, 54, 'b = 8', { font: 'mono', size: 13, weight: 700 });
  s.arrow(140, 66, 150, 88, { sw: 1.8, stroke: C.teal }); s.arrow(232, 66, 194, 88, { sw: 1.8, stroke: C.teal });
  // machine
  s.round(90, 92, 160, 70, 10, { fill: C.butter, sw: 2 });
  s.text(170, 120, 'larger', { font: 'mono', size: 16, weight: 700 });
  s.text(170, 142, 'keeps the bigger one', { font: 'body', size: 12, weight: 700, color: C.soft });
  s.circle(108, 104, 8, { fill: C.orange, sw: 1.2 }); s.circle(232, 104, 8, { fill: C.teal, sw: 1.2 });
  s.rect(156, 162, 28, 14, { fill: '#d9bf95', sw: 1.6 });
  s.arrow(170, 178, 170, 196, { sw: 2, stroke: C.orange });
  s.round(146, 196, 48, 24, 12, { fill: C.orangeWash, sw: 1.8, stroke: C.orange }); s.text(170, 213, '8', { font: 'mono', size: 14, weight: 700 });
  s.text(14, 50, 'Inputs', { font: 'body', size: 13, weight: 800, anchor: 'start', color: C.teal });
  s.text(14, 66, '(parameters)', { font: 'body', size: 12, weight: 700, anchor: 'start', color: C.soft });
  s.text(210, 206, 'Output', { font: 'body', size: 13, weight: 800, anchor: 'start', color: C.orange });
  s.text(266, 206, '(return)', { font: 'body', size: 12, weight: 700, anchor: 'start', color: C.soft });
  return s.svg('A method as a machine. larger(3, 8): inputs (parameters) a = 3 and b = 8 go into a machine named larger that keeps the bigger one. The output (return value) 8 comes out at the bottom.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: an array as a row of numbered school lockers; arr[2] opens locker 2. */
export function lockerRow() {
  const s = new Sketch(340, 214, 166);
  s.text(170, 20, 'arr[2] opens locker 2', { font: 'body', size: 14, weight: 800, color: C.orange });
  [19, 3, 42, 7, 56].forEach((v, i) => {
    const x = 20 + i * 62, hot = i === 2;
    s.rect(x, 34, 56, 130, { fill: hot ? '#fff8e6' : C.sky, sw: 1.8 });
    s.round(x + 16, 42, 24, 20, 3, { fill: C.card, sw: 1.4 });
    s.text(x + 28, 57, i, { font: 'body', size: 14, weight: 800 });
    if (hot) {
      s.path(`M${x + 56} 34 L${x + 72} 42 L${x + 72} 156 L${x + 56} 164 Z`, { fill: C.sky, sw: 1.6 });
      s.round(x + 8, 92, 40, 30, 4, { fill: C.orangeWash, sw: 2, stroke: C.orange });
      s.text(x + 28, 113, v, { font: 'mono', size: 15, weight: 700 });
    } else {
      [80, 88, 96].forEach((y) => s.line(x + 14, y, x + 42, y, { sw: 1.2, stroke: C.soft, single: true }));
      s.text(x + 28, 140, v, { font: 'mono', size: 13, weight: 700, color: C.soft });
    }
  });
  s.text(170, 186, 'Number plate = index (starts at 0).', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.text(170, 204, 'Locker 2 is the third locker. Inside: 42.', { font: 'body', size: 12.5, weight: 800, color: C.soft });
  return s.svg('An array as five school lockers numbered 0 to 4, holding 19, 3, 42, 7, 56. arr[2] opens locker 2, the third locker, and inside is 42. The number plate is the index, starting at 0.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: the variable total over time while the loop runs. */
export function traceFilm() {
  let b = sT(170, 20, 'What happens to total', { size: 14, w: 800 });
  const vals = [['start', '0'], ['i = 1', '1'], ['i = 2', '3'], ['i = 3', '6']];
  vals.forEach(([lab, v], i) => {
    const x = 10 + i * 84;
    b += sT(x + 30, 46, lab, { mono: true, size: 12.5, w: 700, fill: '#37474a' });
    b += mapBox(x, 54, 60, 46, i === 3 ? '#fce9e0' : '#e3f1ef', i === 3 ? '#e8662e' : '#0e6b63', 2.2, 6) + sT(x + 30, 84, v, { mono: true, size: 18, w: 700 });
    if (i < 3) { b += mapArrow(x + 62, 77, x + 82, 77, '#1b2a2e', 2); b += sT(x + 72, 118, '+' + (i + 1), { mono: true, size: 13, w: 700, fill: '#b4461a' }); }
  });
  b += sT(306, 124, 'prints 6', { size: 13, w: 800, fill: '#b4461a' });
  b += sT(170, 150, 'A trace table writes down each of these boxes as a row.', { size: 12.5, w: 700, fill: '#37474a' });
  return introPic(340, 160, 'The variable total over time: it starts at 0; when i = 1 it becomes 1 (+1); when i = 2 it becomes 3 (+2); when i = 3 it becomes 6 (+3); then the program prints 6. A trace table writes each of these as a row.', b);
}

/** Clean: primitive vs non-primitive; non-primitive splits into linear and non-linear. */
export function taxoPic() {
  const box = (x, y, w, h, fill, stroke, sw = 2.2) => mapBox(x, y, w, h, fill, stroke, sw, 8);
  const ln = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} V${(y1 + y2) / 2} H${x2} V${y2}" fill="none" stroke="#37474a" stroke-width="2"/>`;
  let b = box(95, 8, 150, 40, '#1b2a2e', '#1b2a2e') + sT(170, 33, 'Data structures', { size: 15, w: 800, fill: '#fff' });
  b += ln(170, 48, 62, 76) + ln(170, 48, 230, 76);
  b += box(8, 76, 108, 52, '#f3f5f5', '#6b7778') + sT(62, 98, 'Primitive', { size: 14.5, w: 800, fill: '#37474a' }) + sT(62, 118, 'one value each', { size: 12, w: 700, fill: '#37474a' });
  b += box(150, 76, 160, 52, '#fff3c9', '#c98a12') + sT(230, 98, 'Non-primitive', { size: 14.5, w: 800, fill: '#7a5208' }) + sT(230, 118, 'many values', { size: 12, w: 700, fill: '#7a5208' });
  b += mapBox(8, 140, 108, 246, '#fbfbfb', '#c9d0d1', 1.2, 8);
  let y = 160;
  [['whole numbers', ['byte', 'short', 'int', 'long']], ['decimals', ['float', 'double']], ['true or false', ['boolean']], ['one character', ['char']]].forEach(([g, items]) => {
    b += sT(62, y, g, { size: 12, w: 800, fill: '#6b7778' }); y += 18;
    items.forEach((t) => { b += sT(62, y, t, { mono: true, size: 13, w: 700 }); y += 17; });
    y += 8;
  });
  b += ln(230, 128, 180, 158) + ln(230, 128, 284, 158);
  b += box(128, 158, 104, 40, '#e3f1ef', '#0e6b63') + sT(180, 184, 'Linear', { size: 14.5, w: 800, fill: '#0b544e' });
  b += box(240, 158, 92, 40, '#fce9e0', '#e8662e') + sT(286, 184, 'Non-linear', { size: 14, w: 800, fill: '#b4461a' });
  ['array', 'stack', 'queue', 'linked list'].forEach((t, i) => { b += sT(180, 222 + i * 20, t, { size: 13, w: 700 }); });
  ['tree', 'graph'].forEach((t, i) => { b += sT(286, 222 + i * 20, t, { size: 13, w: 700 }); });
  b += `<rect x="122" y="66" width="214" height="240" rx="12" fill="none" stroke="#c98a12" stroke-width="1.6" stroke-dasharray="6 5"/>`;
  b += sT(229, 326, 'This course: the', { size: 12.5, w: 800, fill: '#7a5208' }) + sT(229, 343, 'non-primitive ones', { size: 12.5, w: 800, fill: '#7a5208' });
  return introPic(340, 394, 'A family tree of data structures. Data structures split into primitive (one value each) and non-primitive (many values). Java has eight primitive types: whole numbers byte, short, int, long; decimals float, double; true or false boolean; one character char. Non-primitive splits again into two kinds: linear (array, stack, queue, linked list) and non-linear (tree, graph). A dashed box around the non-primitive side says: this course is about the non-primitive ones.', b);
}

/* ---------------- Arrays lesson pictures (chat 15) ---------------- */

/** Clean helper: one array row (cell width w) with index numbers; kinds: '', 'moved', 'new', 'off', 'gone', 'hot', 'seen'. */
function arrRow(x0, y, vals, kinds = [], idx = true, w = 52) {
  const st = { '': ['#ffffff', '#1b2a2e', '#1b2a2e'], moved: ['#f8dc95', '#1b2a2e', '#1b2a2e'], new: ['#fbdccc', '#e8662e', '#1b2a2e'], off: ['#eef2f2', '#9aa8aa', '#9aa8aa'], gone: ['#fbe3e1', '#b23a33', '#b23a33'], hot: ['#e8662e', '#b4461a', '#ffffff'], seen: ['#d7ece9', '#0e6b63', '#1b2a2e'] };
  const fs = w < 44 ? 13.5 : 15;
  return vals.map((v, i) => {
    const [f, s, t] = st[kinds[i] || ''], x = x0 + i * w;
    const dash = kinds[i] === 'off' ? ' stroke-dasharray="5 4"' : '';
    return `<rect x="${x}" y="${y}" width="${w}" height="40" fill="${f}" stroke="${s}" stroke-width="2"${dash}/>` + (v === '' || v == null ? '' : sT(x + w / 2, y + 26, v, { mono: true, size: fs, w: 700, fill: t })) + (idx ? sT(x + w / 2, y + 58, i, { mono: true, size: 12.5, w: 600, fill: '#37474a' }) : '');
  }).join('');
}
/** Clean helper: curved move arrow over a row, from cell a to cell b, with a numbered badge (n = '' for none) and a solid head. */
function moveArc(x0, y, a, b, n, col = '#e8662e', w = 52) {
  const x1 = x0 + a * w + w / 2, x2 = x0 + b * w + w / 2, mx = (x1 + x2) / 2, top = y - (w < 44 ? 36 : 50), pk = (y - 3 + top) / 2;
  const dir = Math.sign(x2 - x1), sx = x1 + dir * 6, ex = x2 - dir * 6, ey = y - 3;
  const ang = Math.atan2(ey - top, ex - mx), L = 10, hp = (k) => `${(ex - L * Math.cos(ang + k)).toFixed(1)} ${(ey - L * Math.sin(ang + k)).toFixed(1)}`;
  const bx = ex - 6 * Math.cos(ang), by = ey - 6 * Math.sin(ang);
  let out = `<path d="M${sx} ${ey} Q${mx} ${top} ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/><path d="M${ex} ${ey} L${hp(0.42)} L${hp(-0.42)} Z" fill="${col}"/>`;
  if (n !== '') out += `<circle cx="${mx}" cy="${pk}" r="10.5" fill="${col}" stroke="#fbfaf6" stroke-width="2"/>` + sT(mx, pk + 4.5, n, { size: 12.5, w: 800, fill: '#ffffff' });
  return out;
}
/** Clean helper: solid-headed straight arrow. */
function solidArrow(x1, y1, x2, y2, col = '#37474a', sw = 2.4) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 10, p = (k) => `${(x2 - L * Math.cos(a + k)).toFixed(1)} ${(y2 - L * Math.sin(a + k)).toFixed(1)}`;
  const bx = (x2 - 6 * Math.cos(a)).toFixed(1), by = (y2 - 6 * Math.sin(a)).toFixed(1);
  return `<path d="M${x1} ${y1} L${bx} ${by}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" fill="none"/><path d="M${x2} ${y2} L${p(0.42)} L${p(-0.42)} Z" fill="${col}"/>`;
}
/** Clean helper: the array's name to the left of a row, like "marks". */
const arrName = (x, y, t) => sT(x, y + 26, t, { mono: true, size: 14, w: 700, anchor: 'end', fill: '#0b544e' });

/** Sketch: a piso-net shop: a fixed row of numbered units, one user each (unit number = index, user = value). */
export function pisonetPic() {
  const s = new Sketch(340, 316, 181);
  s.text(170, 22, 'A piso-net shop', { font: 'body', size: 15, weight: 800, color: C.orange });
  const names = ['Ana', 'Ben', 'Cris', 'Dan', 'Eli'], shirts = [C.teal, C.orange, C.amber, '#2f6fa8', C.red];
  s.rect(8, 148, 324, 14, { fill: '#d9bf95', sw: 1.8 });
  names.forEach((n, i) => {
    const x = 14 + i * 64;
    s.round(x + 16, 38, 24, 22, 6, { fill: C.butter, sw: 1.5 });
    s.text(x + 28, 55, String(i), { font: 'body', size: 15, weight: 800 });
    s.round(x + 4, 66, 48, 36, 4, { fill: C.sky, sw: 1.8 });
    s.line(x + 28, 102, x + 28, 116, { sw: 2 });
    s.line(x + 18, 116, x + 38, 116, { sw: 2 });
    s.rect(x + 8, 124, 40, 22, { fill: '#9aa8aa', sw: 1.5 });
    s.circle(x + 40, 135, 7, { fill: C.amber, sw: 1 });
    s.path(`M${x + 10} 214 Q${x + 10} 190 ${x + 28} 188 Q${x + 46} 190 ${x + 46} 214 Z`, { fill: shirts[i], sw: 1.6 });
    s.circle(x + 28, 178, 20, { fill: '#6b4a2f', sw: 1.5 });
    s.text(x + 28, 234, n, { font: 'body', size: 13, weight: 800 });
  });
  s.text(14, 264, 'Each unit has a number: that is the index.', { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  s.text(14, 284, 'One user per unit: one value per slot.', { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  s.text(14, 304, 'The row of units is fixed: the length is fixed.', { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  return s.svg('A piso-net shop: five computer units in a fixed row, numbered 0 to 4 on top, each with a one-peso coin slot. One user sits at each unit: Ana, Ben, Cris, Dan, Eli. Each unit number is like an index, each user is like the value in a slot, and the row of units is fixed, like an array\'s length.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: the four operations, one small drawing each. */
export function fourOpsPic() {
  const x0 = 128, w = 40;
  let b = '';
  const panel = (i, title, col, l1, l2) => {
    const y = 6 + i * 112;
    b += mapBox(6, y, 328, 104, '#fff', '#c9d6d4', 1.5, 10);
    b += sT(18, y + 30, title, { size: 15.5, w: 800, anchor: 'start', fill: col });
    b += sT(18, y + 54, l1, { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' }) + sT(18, y + 72, l2, { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' });
    return y;
  };
  let y = panel(0, 'Access', '#b4461a', 'get one value', 'by its index');
  b += sT(x0 + 2.5 * w, y + 24, 'arr[2]', { mono: true, size: 13, w: 700, fill: '#b4461a' }) + solidArrow(x0 + 2.5 * w, y + 30, x0 + 2.5 * w, y + 46, '#e8662e');
  b += arrRow(x0, y + 50, [19, 3, 42, 7, 56], ['', '', 'hot'], false, w);
  y = panel(1, 'Traverse', '#0b544e', 'visit every', 'value, in order');
  b += arrRow(x0, y + 18, [19, 3, 42, 7, 56], ['seen', 'seen', 'seen', 'seen', 'seen'], false, w);
  b += solidArrow(x0 + 10, y + 78, x0 + 5 * w - 6, y + 78, '#0e6b63') + sT(x0 + 2.5 * w, y + 96, 'index 0, 1, 2, 3, 4', { mono: true, size: 12, w: 600, fill: '#0b544e' });
  y = panel(2, 'Insert', '#2f6fa8', 'add a value', 'at a position');
  b += mapBox(x0 + 2 * w + 4, y + 10, 32, 24, '#fbdccc', '#e8662e', 1.8, 6) + sT(x0 + 2.5 * w, y + 27, '25', { mono: true, size: 13, w: 700 }) + solidArrow(x0 + 2.5 * w, y + 36, x0 + 2.5 * w, y + 52, '#e8662e');
  b += arrRow(x0, y + 56, [10, 20, 25, 30, 40], ['', '', 'new', 'moved', 'moved'], false, w);
  b += sT(x0 + 3 * w, y + 50, '→', { size: 14, w: 800, fill: '#7a5208' }) + sT(x0 + 4 * w, y + 50, '→', { size: 14, w: 800, fill: '#7a5208' });
  y = panel(3, 'Delete', '#b23a33', 'remove a value', 'at a position');
  b += mapBox(x0 + w + 4, y + 10, 32, 24, '#fbe3e1', '#b23a33', 1.8, 6) + sT(x0 + 1.5 * w, y + 27, '20', { mono: true, size: 13, w: 700, fill: '#b23a33' }) + solidArrow(x0 + 1.5 * w, y + 52, x0 + 1.5 * w, y + 37, '#b23a33');
  b += arrRow(x0, y + 56, [10, 25, 30, 40, ''], ['', 'moved', 'moved', 'moved', 'off'], false, w);
  b += [1, 2, 3].map((k) => sT(x0 + (k + 1) * w, y + 50, '←', { size: 14, w: 800, fill: '#7a5208' })).join('');
  return introPic(340, 458, 'The four operations. Access: get one value by its index: arr[2] points straight at 42. Traverse: visit every value in order, index 0, 1, 2, 3, 4. Insert: add a value at a position: 25 drops into slot 2 and 30 and 40 move right. Delete: remove the value at a position: 20 is lifted out of slot 1 and 25, 30, 40 move left.', b);
}

/** Sketch: where each operation shows up: registrar list, sari-sari shelf, print queue. */
export function opsWhere() {
  const s = new Sketch(340, 392, 191);
  const label = (y, t, l1, chip) => {
    s.text(150, y + 30, t, { font: 'body', size: 14.5, weight: 800, anchor: 'start' });
    s.text(150, y + 50, l1, { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
    s.round(148, y + 62, chip.length * 7.2 + 18, 24, 12, { fill: C.orangeWash, stroke: C.orange, sw: 1.4 });
    s.text(157, y + 79, chip, { font: 'body', size: 12.5, weight: 800, anchor: 'start', color: '#8a3510' });
  };
  // 1. registrar list
  s.rect(22, 14, 96, 106, { fill: '#ffffff', sw: 1.8 });
  s.rect(52, 8, 36, 12, { fill: C.amber, sw: 1.4 });
  ['001 Ana', '002 Ben', '003 Cris', '004 Dan'].forEach((t, i) => s.text(32, 42 + i * 20, t, { font: 'mono', size: 11.5, weight: 600, anchor: 'start' }));
  s.circle(110, 60, 26, { stroke: C.orange, sw: 2.4 });
  s.line(119, 69, 130, 82, { stroke: C.orange, sw: 3 });
  label(12, "Registrar's student list", '5,000 students in ID order', 'access + traversal');
  // 2. sari-sari shelf
  const y2 = 138;
  s.rect(16, y2 + 10, 110, 96, { fill: '#e9d3b0', sw: 1.8 });
  s.line(16, y2 + 58, 126, y2 + 58, { sw: 1.8 });
  [[24, 'sky'], [46, 'pink'], [68, 'butter'], [90, 'sky']].forEach(([x, c], i) => s.rect(x, y2 + 26, 16, 30, { fill: C[c], sw: 1.4 }));
  [[26, 'butter'], [50, 'pink'], [74, 'tealWash']].forEach(([x, c]) => s.circle(x + 6, y2 + 88, 20, { fill: C[c], sw: 1.4 }));
  s.arrow(4, y2 + 4, 22, y2 + 22, { stroke: C.teal, sw: 2.2 });
  s.text(4, y2 - 2, 'in', { font: 'body', size: 12, weight: 800, anchor: 'start', color: C.teal });
  s.arrow(110, y2 + 96, 132, y2 + 118, { stroke: C.red, sw: 2.2 });
  s.text(134, y2 + 128, 'out', { font: 'body', size: 12, weight: 800, anchor: 'start', color: C.red });
  label(y2, 'Sari-sari store inventory', 'stock comes in, items go out', 'insert + delete');
  // 3. print queue
  const y3 = 270;
  s.rect(84, y3 + 30, 46, 40, { fill: '#cfd8d8', sw: 1.8 });
  s.rect(92, y3 + 18, 30, 14, { fill: '#ffffff', sw: 1.4 });
  [0, 1, 2].forEach((i) => { s.rect(6 + i * 23, y3 + 40, 20, 26, { fill: '#ffffff', sw: 1.4 }); s.line(10 + i * 23, y3 + 48, 22 + i * 23, y3 + 48, { sw: 1, single: true }); s.line(10 + i * 23, y3 + 55, 22 + i * 23, y3 + 55, { sw: 1, single: true }); });
  s.arrow(70, y3 + 53, 83, y3 + 53, { stroke: C.soft, sw: 2 });
  s.text(10, y3 + 86, 'back', { font: 'body', size: 11.5, weight: 800, anchor: 'start', color: C.soft });
  s.text(82, y3 + 86, 'front', { font: 'body', size: 11.5, weight: 800, anchor: 'start', color: C.soft });
  label(y3, 'Office print queue', 'join at back, leave at front', 'insert + delete (ends)');
  return s.svg("Where the operations show up. A registrar's list of students in ID order (001 Ana, 002 Ben, 003 Cris, 004 Dan) with a magnifying glass: mostly access and traversal. A sari-sari store shelf with stock coming in and items going out: mostly insert and delete. An office print queue, papers lined up from the back to the front of the printer: insert and delete, at the ends.").replace(/(\d+\.\d)\d+/g, '$1');
}

/** Clean: how Java finds slot 2: address = start + i × slot size. */
export function addrPic() {
  const x0 = 62, w = 54;
  let b = sT(6, 24, 'index', { size: 12, w: 800, anchor: 'start', fill: '#37474a' });
  b += [0, 1, 2, 3, 4].map((i) => sT(x0 + i * w + w / 2, 24, i, { mono: true, size: 13, w: 700, fill: '#37474a' })).join('');
  b += arrName(56, 34, 'marks') + arrRow(x0, 34, [14, 28, 35, 49, 60], ['', '', 'hot'], false, w);
  b += sT(6, 100, 'address', { size: 12, w: 800, anchor: 'start', fill: '#37474a' });
  b += [0, 1, 2, 3, 4].map((i) => sT(x0 + i * w + w / 2, 100, 1000 + 4 * i, { mono: true, size: 12.5, w: 700, fill: i === 2 ? '#b4461a' : '#0b544e' })).join('');
  b += `<path d="M${x0 + w / 2} 110 Q${x0 + w * 1.5} 142 ${x0 + w * 2.5 - 4} 114" fill="none" stroke="#e8662e" stroke-width="2.4"/>` + solidArrow(x0 + w * 2.5 - 10, 120, x0 + w * 2.5 - 2, 110, '#e8662e');
  b += mapBox(14, 148, 312, 30, '#fff8e6', '#c98a12', 1.8, 15) + sT(170, 168, 'start + 2 × 4 = 1000 + 8 = 1008', { mono: true, size: 12.5, w: 700, fill: '#7a5208' });
  b += sT(170, 202, 'Each int takes 4 bytes, so addresses go up by 4.', { size: 12.5, w: 700, fill: '#37474a' });
  return introPic(340, 214, 'The array marks holds 14, 28, 35, 49, 60 at indexes 0 to 4. Under each slot is its memory address: 1000, 1004, 1008, 1012, 1016. Slot 2 is found with one calculation: start + 2 × 4 = 1000 + 8 = 1008. Each int slot takes 4 bytes, so the addresses go up by 4.', b);
}

/** Clean: why highest must not start at 0: freezer temperatures are all negative. */
export function zeroTrapPic() {
  const x0 = 106, w = 54;
  let b = sT(170, 22, 'Freezer temperatures (°C)', { size: 14.5, w: 800 });
  b += arrName(100, 34, 'temps') + arrRow(x0, 34, [-5, -2, -8], [], true, w);
  b += mapBox(6, 110, 328, 76, '#fdf1f0', '#b23a33', 1.8, 10);
  b += sT(18, 134, 'highest = 0', { mono: true, size: 13.5, w: 700, anchor: 'start', fill: '#b23a33' });
  b += sT(18, 154, 'No temperature is > 0,', { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' }) + sT(18, 172, 'so it never changes.', { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' });
  b += mapBox(224, 118, 96, 40, '#fbe3e1', '#b23a33', 2, 8) + sT(272, 144, '0 ✗', { mono: true, size: 15, w: 700, fill: '#b23a33' });
  b += sT(272, 176, 'not in the list!', { size: 11.5, w: 800, fill: '#b23a33' });
  b += mapBox(6, 196, 328, 76, '#eef7f5', '#0e6b63', 1.8, 10);
  b += sT(18, 220, 'highest = temps[0]', { mono: true, size: 13.5, w: 700, anchor: 'start', fill: '#0b544e' });
  b += sT(18, 240, 'Starts at -5. Then -2 > -5,', { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' }) + sT(18, 258, 'so highest becomes -2.', { size: 12.5, w: 700, anchor: 'start', fill: '#37474a' });
  b += mapBox(224, 212, 96, 44, '#d7ece9', '#0e6b63', 2, 8) + sT(272, 240, '-2 ✓', { mono: true, size: 15, w: 700, fill: '#0b544e' });
  return introPic(340, 280, 'Freezer temperatures in degrees Celsius: temps holds -5, -2, -8. Starting with highest = 0: no temperature is greater than 0, so highest never changes and the answer is 0, which is not even in the list. Starting with highest = temps[0]: it starts at -5, then -2 is greater than -5, so highest becomes -2, the right answer.', b);
}

/** Clean: access is one jump; insert at the front moves every value. */
export function costPic() {
  const x0 = 40;
  let b = mapBox(6, 6, 328, 150, '#eef7f5', '#0e6b63', 1.8, 10);
  b += sT(18, 32, 'Access arr[3]: one jump', { size: 15, w: 800, anchor: 'start', fill: '#0b544e' });
  b += `<path d="M${x0 - 14} 62 Q${x0 + 90} 34 ${x0 + 3.5 * 52 - 4} 78" fill="none" stroke="#0e6b63" stroke-width="2.4"/>` + solidArrow(x0 + 3.5 * 52 - 8, 72, x0 + 3.5 * 52, 82, '#0e6b63');
  b += arrRow(x0, 86, [10, 20, 30, 40, ''], ['', '', '', 'seen', 'off'], false);
  b += sT(170, 146, '500 values? Still one jump.', { size: 12.5, w: 800, fill: '#0b544e' });
  b += mapBox(6, 166, 328, 172, '#fdf4ee', '#e8662e', 1.8, 10);
  b += sT(18, 192, 'Insert at the front: all move', { size: 15, w: 800, anchor: 'start', fill: '#b4461a' });
  b += moveArc(x0, 262, 3, 4, 1) + moveArc(x0, 262, 2, 3, 2) + moveArc(x0, 262, 1, 2, 3) + moveArc(x0, 262, 0, 1, 4);
  b += arrRow(x0, 262, [10, 20, 30, 40, ''], ['', '', '', '', 'off'], false);
  b += sT(170, 322, '4 values: 4 moves. 500 values: 500 moves.', { size: 12.5, w: 800, fill: '#b4461a' });
  return introPic(340, 344, 'Top: access arr[3] is one jump straight to slot 3, and with 500 values it is still one jump. Bottom: inserting 5 at the front of 10, 20, 30, 40 moves every value one slot right, starting from the end: 4 values need 4 moves, and 500 values need 500 moves.', b);
}

/** Clean: traversal visits every slot once, in order, then stops. */
export function traversePic() {
  const x0 = 62, w = 54;
  let b = [0, 1, 2, 3, 4].map((i) => `<circle cx="${x0 + i * w + w / 2}" cy="22" r="11" fill="#0e6b63"/>` + sT(x0 + i * w + w / 2, 27, i + 1, { size: 12.5, w: 800, fill: '#fff' })).join('');
  b += sT(6, 27, 'visit', { size: 12, w: 800, anchor: 'start', fill: '#0b544e' });
  b += arrName(56, 40, 'marks') + arrRow(x0, 40, [78, 85, 91, 74, 88], ['seen', 'seen', 'seen', 'seen', 'seen'], true, w);
  b += solidArrow(x0 + 8, 116, x0 + 5 * w - 4, 116, '#0e6b63');
  b += sT(x0 + 2.5 * w, 140, 'i = 0 → 1 → 2 → 3 → 4', { mono: true, size: 13, w: 700, fill: '#0b544e' });
  b += sT(170, 166, 'Then i = 5 is not < 5 (the length), so the loop stops.', { size: 12.5, w: 700, fill: '#37474a' });
  return introPic(340, 178, 'Traversing marks (78, 85, 91, 74, 88): each slot is visited once, in order, visits 1 to 5 at indexes 0 to 4, as i goes 0, 1, 2, 3, 4. Then i = 5 is not less than 5, the length, so the loop stops.', b);
}

/* Walkthrough pictures: 8 slots (capacity 8), narrow cells. */
const WX = 18, WW = 38;
function walkPic(vals, size, kinds = {}, o = {}) {
  const k = vals.map((v, i) => kinds[i] || (i >= size ? 'off' : ''));
  let b = '';
  if (o.chip) b += mapBox(WX + o.chip[0] * WW + 3, 8, WW - 6, 26, '#fbdccc', '#e8662e', 1.8, 6) + sT(WX + o.chip[0] * WW + WW / 2, 26, o.chip[1], { mono: true, size: 13, w: 700 });
  if (o.arc) b += moveArc(WX, 92, o.arc[0], o.arc[1], '', '#e8662e', WW);
  b += arrRow(WX, 92, vals, k, true, WW);
  if (o.i != null) b += `<path d="M${WX + o.i * WW + WW / 2} 158 l-7 10 h14 Z" fill="#e8662e"/>` + sT(WX + o.i * WW + WW / 2, 186, 'i', { mono: true, size: 14, w: 700, fill: '#b4461a' });
  b += sT(330, 186, `size = ${size}`, { mono: true, size: 12.5, w: 700, anchor: 'end', fill: '#0b544e' });
  return introPic(340, 196, o.alt || 'Array with capacity 8.', b);
}

export const arrInsertCode = String.raw`int[] arr = new int[8];      // capacity 8, fixed
int size = 4;                // 10, 20, 30, 40 are stored
// insert value v at index k
for (int i = size; i > k; i--) {
  arr[i] = arr[i - 1];       // move one slot right
}
arr[k] = v;
size++;`;

/** CodeWalk steps: insert v = 25 at k = 2 into 10, 20, 30, 40 (capacity 8). */
export function arrInsertSteps() {
  const c = (s) => `<code>${s}</code>`, E = [null, null, null, null, null, null, null, null];
  const A = (...v) => [...v, ...E].slice(0, 8);
  const s = [];
  s.push({ lines: [1], pic: walkPic(E, 0, {}, { alt: 'Eight empty slots, indexes 0 to 7.' }), vars: [['arr.length', '= 8']], say: `Java makes an array with <b>8 slots</b>. Its length (capacity) is fixed: it will always be 8.` });
  s.push({ lines: [2], pic: walkPic(A(10, 20, 30, 40), 4, {}, { alt: '10, 20, 30, 40 in slots 0 to 3. Slots 4 to 7 are not counted.' }), vars: [['size', '= 4']], say: `Slots 0 to 3 hold 10, 20, 30, 40, so ${c('size')} is 4. Slots 4 to 7 are not counted (dashed).` });
  s.push({ lines: [3], pic: walkPic(A(10, 20, 30, 40), 4, { 2: 'hot' }, { chip: [2, 25], alt: 'We want 25 at index 2.' }), vars: [['k', '= 2'], ['v', '= 25']], say: `We want to insert ${c('v')} = 25 at index ${c('k')} = 2. Slot 2 is taken by 30, so 30 and 40 must move right first.` });
  const loop = [[4, [10, 20, 30, 40, 40], 'Yes'], [3, [10, 20, 30, 30, 40], 'Yes']];
  let cur = A(10, 20, 30, 40);
  const done = {};
  for (const [i, after] of loop) {
    s.push({ lines: [4], pic: walkPic(cur, 4, { ...done }, { i, chip: [2, 25], alt: `i is ${i}.` }), vars: [['i', `= ${i}`], ['k', '= 2']], say: `${i === 4 ? `The loop starts at ${c('i = size')}, which is 4: the <b>end</b>.` : `${c('i--')} makes ${c('i')} = 3.`} Is ${c(`${i} > 2`)}? <b>Yes</b>, so the loop body runs.` });
    done[i] = 'moved';
    cur = A(...after);
    s.push({ lines: [5], pic: walkPic(cur, 4, { ...done }, { i, arc: [i - 1, i], chip: [2, 25], alt: `${cur[i]} copied from slot ${i - 1} to slot ${i}.` }), vars: [['i', `= ${i}`]], say: `${c(`arr[${i}] = arr[${i - 1}];`)} copies ${cur[i]} from slot ${i - 1} into slot ${i}.${i === 3 ? ' Slot 2 still shows 30 too: that old copy gets covered next.' : ' Slot 4 was free, so nothing is lost.'}` });
  }
  s.push({ lines: [4], pic: walkPic(cur, 4, { 3: 'moved', 4: 'moved' }, { i: 2, chip: [2, 25], alt: 'i is 2, the loop stops.' }), vars: [['i', '= 2'], ['k', '= 2']], say: `${c('i--')} makes ${c('i')} = 2. Is ${c('2 > 2')}? <b>No</b>, so the loop stops. Slot 2 is ready for the new value.` });
  cur = A(10, 20, 25, 30, 40);
  s.push({ lines: [7], pic: walkPic(cur, 4, { 2: 'new', 3: 'moved', 4: 'moved' }, { alt: '25 is in slot 2.' }), vars: [['k', '= 2'], ['v', '= 25']], say: `${c('arr[k] = v;')} puts 25 into slot 2, on top of the old copy of 30.` });
  s.push({ lines: [8], pic: walkPic(cur, 5, { 2: 'new', 3: 'moved', 4: 'moved' }, { alt: '10, 20, 25, 30, 40, size 5.' }), vars: [['size', '= 5']], say: `${c('size++;')} One more value is counted: ${c('size')} is 5. Result: 10, 20, 25, 30, 40. <b>2 values moved.</b>` });
  return s;
}

export const arrDeleteCode = String.raw`// delete the value at index k
for (int i = k; i < size - 1; i++) {
  arr[i] = arr[i + 1];       // move one slot left
}
size--;`;

/** CodeWalk steps: delete index k = 1 from 10, 20, 25, 30, 40 (size 5, capacity 8). */
export function arrDeleteSteps() {
  const c = (s) => `<code>${s}</code>`, A = (...v) => [...v, null, null, null, null, null, null, null, null].slice(0, 8);
  const s = [];
  let cur = A(10, 20, 25, 30, 40);
  s.push({ lines: [1], pic: walkPic(cur, 5, { 1: 'gone' }, { alt: '10, 20, 25, 30, 40; 20 at index 1 is to be deleted.' }), vars: [['k', '= 1'], ['size', '= 5']], say: `We delete the value at index ${c('k')} = 1: the <b>20</b>. Every value after it must move one slot left to close the gap.` });
  const done = {};
  for (const i of [1, 2, 3]) {
    s.push({ lines: [2], pic: walkPic(cur, 5, { ...done, ...(i === 1 ? { 1: 'gone' } : {}) }, { i, alt: `i is ${i}.` }), vars: [['i', `= ${i}`], ['size - 1', '= 4']], say: `${i === 1 ? `The loop starts at ${c('i = k')}, which is 1: the <b>gap</b>.` : `${c('i++')} makes ${c('i')} = ${i}.`} Is ${c(`${i} < 4`)}? <b>Yes</b>, so the loop body runs.` });
    cur = cur.slice(); cur[i] = cur[i + 1]; done[i] = 'moved';
    s.push({ lines: [3], pic: walkPic(cur, 5, { ...done }, { i, arc: [i + 1, i], alt: `${cur[i]} copied from slot ${i + 1} to slot ${i}.` }), vars: [['i', `= ${i}`]], say: `${c(`arr[${i}] = arr[${i + 1}];`)} copies ${cur[i]} from slot ${i + 1} into slot ${i}${i === 1 ? ', on top of the 20. The 20 is gone' : ''}.` });
  }
  s.push({ lines: [2], pic: walkPic(cur, 5, { ...done }, { i: 4, alt: 'i is 4, the loop stops.' }), vars: [['i', '= 4'], ['size - 1', '= 4']], say: `${c('i++')} makes ${c('i')} = 4. Is ${c('4 < 4')}? <b>No</b>, so the loop stops. (Slot 4 has nothing after it to copy.)` });
  s.push({ lines: [5], pic: walkPic(cur, 4, { ...done }, { alt: '10, 25, 30, 40, size 4; slot 4 holds an old 40, not counted.' }), vars: [['size', '= 4']], say: `${c('size--;')} ${c('size')} is 4. Slot 4 still holds an old copy of 40, but it is beyond ${c('size')}, so it is not counted (dashed). Result: 10, 25, 30, 40. <b>3 values moved.</b>` });
  return s;
}

/** Clean: the mistake: shifting right from the FRONT covers 40 before it moves. */
export function wrongOrderPic() {
  const x0 = 40;
  let b = sT(170, 22, 'Wrong: moving 30 first', { size: 15, w: 800, fill: '#b23a33' });
  b += sT(20, 50, 'Start', { size: 13.5, w: 800, anchor: 'start', fill: '#37474a' });
  b += moveArc(x0, 112, 2, 3, 1, '#b23a33');
  b += arrRow(x0, 112, [10, 20, 30, 40, ''], ['', '', '', '', 'off'], false);
  b += sT(20, 186, 'After move 1', { size: 13.5, w: 800, anchor: 'start', fill: '#37474a' });
  b += moveArc(x0, 248, 3, 4, 2, '#b23a33');
  b += arrRow(x0, 248, [10, 20, 30, 30, ''], ['', '', '', 'gone', 'off'], false);
  b += sT(196, 306, '40 was covered up!', { size: 12.5, w: 800, fill: '#b23a33' });
  b += sT(20, 340, 'After move 2, then 25', { size: 13.5, w: 800, anchor: 'start', fill: '#37474a' });
  b += arrRow(x0, 352, [10, 20, 25, 30, 30], ['', '', 'new', '', 'gone'], false);
  b += sT(170, 416, '40 is lost. Fix: start from the end (move 40 first).', { size: 12.5, w: 800, fill: '#0b544e' });
  return introPic(340, 428, 'The mistake of shifting from the front. Start: 10, 20, 30, 40, then an empty slot. Move 1: 30 is copied into slot 3, on top of 40, so 40 is covered up. Move 2: slot 3 now holds 30, so 30 is copied into slot 4. Then 25 goes into slot 2: the result is 10, 20, 25, 30, 30, and 40 is lost. Fix: start from the end and move 40 first.', b);
}

/* ---- Linked lists (chat 16, round 4): roomy pictures in the arrays/maps style ---- */
const rDefs = '<defs>' + [['k', '#1b2a2e'], ['r', '#b23a33'], ['o', '#e8662e'], ['t', '#0e6b63']].map(([n, c]) => `<marker id="rm-${n}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`).join('') + '</defs>';
const rC = { k: '#1b2a2e', r: '#b23a33', o: '#e8662e', t: '#0e6b63' };
const R = { D: 36, N: 20, H: 40 };
const rW = R.D + R.N;
const rSlot = (i) => 10 + i * 94;
const rDot = (x) => x + R.D + R.N / 2;
const rArrow = (d, c = 'k', w = 2.2, dash) => `<path d="${d}" fill="none" stroke="${rC[c]}" stroke-width="${w}"${dash ? ' stroke-dasharray="5 4"' : ''} marker-end="url(#rm-${c})"/>`;
const rBox = (x, y, v, o = {}) => {
  const st = o.lost ? rC.r : rC.k, dash = o.lost ? ' stroke-dasharray="6 4"' : '';
  return `<rect x="${x}" y="${y}" width="${R.D}" height="${R.H}" fill="${o.fill ?? '#fff'}" stroke="${st}" stroke-width="2.2"${dash}/>` +
    `<rect x="${x + R.D}" y="${y}" width="${R.N}" height="${R.H}" fill="#fff" stroke="${st}" stroke-width="2.2"${dash}/>` +
    sT(x + R.D / 2, y + 26, v, { mono: true, size: 16, w: 700, fill: o.lost ? rC.r : (o.ink ?? rC.k) }) +
    `<circle cx="${rDot(x)}" cy="${y + R.H / 2}" r="3.4" fill="${st}"/>`;
};
const rLink = (xa, xb, y, c = 'k', o = {}) => rArrow(`M${rDot(xa)} ${y + R.H / 2} H${xb - 2}`, c, o.w ?? 2.2, o.dash);
const rNullDown = (x, y, c = 'k') => rArrow(`M${rDot(x)} ${y + R.H / 2} V${y + R.H + 22}`, c, 2, c === 'r') + sT(rDot(x), y + R.H + 38, 'null', { mono: true, size: 13, w: 600, fill: c === 'r' ? rC.r : '#4f5f62' });
const rVars = (x, y, names) => names.map(([n, fill], i) => sT(x + R.D / 2, y - 26 - i * 17, n, { mono: true, size: 13.5, w: 700, fill })).join('') +
  (names.length ? rArrow(`M${x + R.D / 2} ${y - 21} V${y - 3}`, names[0][1] === '#b4461a' ? 'o' : 't', 2) : '');
const rPic = (w, h, label, body, cls = 'intro-pic') => `<svg class="objbox ${cls}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${rDefs}${body}</svg>`;
const HEAD = '#0b544e', NEW = '#b4461a';


export const llFrontCode = String.raw`Node newNode = new Node(5);
newNode.next = head;   // step 1
head = newNode;        // step 2`;

/** CodeWalk steps: insert 5 at the beginning of 10 -> 20 -> 30. */
export function llFrontSteps() {
  const y = 64, X = [0, 1, 2, 3].map(rSlot);
  const pic = (st, alt) => {
    let b = rVars(X[0], y, st.v5) + rVars(X[1], y, st.v10);
    b += rBox(X[0], y, '5', { fill: '#fbdccc' });
    if (st.link) b += rLink(X[0], X[1], y, 'o', { w: 3 }); else b += rNullDown(X[0], y);
    [10, 20, 30].forEach((v, i) => { b += rBox(X[i + 1], y, String(v)); if (i < 2) b += rLink(X[i + 1], X[i + 2], y); });
    b += rNullDown(X[3], y);
    return rPic(384, 150, alt, b);
  };
  const H = ['head', HEAD], N = ['newNode', NEW];
  return [
    { lines: [1], pic: pic({ v5: [N], v10: [H] }, 'The list 10, 20, 30 with head on 10. A new node 5, which newNode refers to, sits on its own; its next is null.'), vars: [['newNode', '→ 5']],
      say: '<code>new</code> makes node 5. Its <code>next</code> is <code>null</code>, so it is <b>not connected</b> to the list yet. <code>head</code> still refers to 10.' },
    { lines: [2], pic: pic({ v5: [N], v10: [H], link: true }, 'Node 5 now points to 10. head still refers to 10.'), vars: [['newNode.next', '→ 10']],
      say: '<b>Step 1:</b> <code>newNode.next = head;</code> copies head\'s reference, so 5 now points to <b>10</b> (orange arrow). Nothing is lost: <code>head</code> still refers to 10 too.' },
    { lines: [3], pic: pic({ v5: [['head', '#b4461a'], N], v10: [], link: true }, 'head now refers to 5. The list is 5, 10, 20, 30, null.'), vars: [['head', '→ 5']],
      say: '<b>Step 2:</b> <code>head = newNode;</code> moves <code>head</code> to node 5. The list is now <b>5 → 10 → 20 → 30</b>. Two references changed. No value moved.' },
  ];
}


/* ---- Linked lists (round 4): real-life sketches ---- */
const kid = (s, x, y, shirt, o = {}) => {
  const st = o.ghost ? { stroke: '#9aa8aa', dash: '5 4', single: true } : {};
  s.path(`M${x - 14} ${y + 44} Q${x - 14} ${y + 16} ${x} ${y + 14} Q${x + 14} ${y + 16} ${x + 14} ${y + 44} Z`, { fill: o.ghost ? '#eef1f0' : shirt, sw: 1.6, ...st });
  s.circle(x, y, 24, { fill: o.ghost ? '#f3f3f1' : '#e8b48a', sw: 1.5, ...st });
  if (!o.ghost) s.path(`M${x - 12} ${y - 1} Q${x - 11} ${y - 15} ${x} ${y - 13} Q${x + 11} ${y - 15} ${x + 12} ${y - 1} Q${x + 3} ${y - 8} ${x - 12} ${y - 1} Z`, { fill: '#3b2a20', sw: 1.1 });
  if (o.name) s.text(x, y + 62, o.name, { font: 'body', size: 13, weight: 800, color: o.ghost ? '#9aa8aa' : C.ink });
};
const note = (s, x, y, w, t, fill = C.butter) => { s.round(x, y, w, 24, 6, { fill, sw: 1.3 }); s.text(x + w / 2, y + 17, t, { font: 'body', size: 12, weight: 800 }); };
const sTitle = (s, y, t, color) => s.text(14, y, t, { font: 'body', size: 14, weight: 800, anchor: 'start', color });
const sSay = (s, y, t, color = C.soft) => s.text(14, y, t, { font: 'body', size: 12.5, weight: 700, anchor: 'start', color });
const shrink = (svg) => svg.replace(/(\d+\.\d)\d+/g, '$1');



/** Safe insert order: monkey bars. */
export function llBarsPic() {
  const s = new Sketch(340, 318, 523);
  s.round(6, 6, 160, 248, 10, { fill: '#eef6f4', sw: 1.2, stroke: '#c9d6d4' });
  s.round(174, 6, 160, 248, 10, { fill: '#fbeeee', sw: 1.2, stroke: '#ebc9c6' });
  s.text(86, 30, '✓ Grab, then let go', { font: 'body', size: 13.5, weight: 800, color: C.teal });
  s.text(254, 30, '✗ Let go first', { font: 'body', size: 13.5, weight: 800, color: C.red });
  for (const ox of [0, 168]) {
    s.line(ox + 14, 56, ox + 158, 56, { sw: 3, stroke: '#7a8b8e' });
    for (const rx of [32, 68, 104, 140]) s.circle(ox + rx, 56, 8, { fill: '#9aa8aa', sw: 1.2 });
  }
  // safe kid: one hand on bar 2, other hand on bar 3
  s.line(76, 98, 68, 60, { sw: 2.4 }); s.line(96, 98, 104, 60, { sw: 2.4 });
  kid(s, 86, 112, C.orange);
  s.line(80, 156, 76, 186, { sw: 2.2 }); s.line(92, 156, 96, 186, { sw: 2.2 });
  s.round(108, 66, 52, 22, 5, { fill: C.butter, sw: 1.2 }); s.text(134, 81, '1 grab', { font: 'body', size: 11.5, weight: 800 });
  s.round(14, 66, 50, 22, 5, { fill: C.tealWash, sw: 1.2 }); s.text(39, 81, '2 let go', { font: 'body', size: 11.5, weight: 800 });
  s.text(86, 220, 'Still holding on:', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.text(86, 238, 'safe!', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  // falling kid
  kid(s, 254, 150, C.orange);
  s.line(244, 156, 230, 130, { sw: 2.2 }); s.line(264, 156, 278, 128, { sw: 2.2 });
  s.line(248, 194, 240, 214, { sw: 2.2 }); s.line(260, 194, 270, 212, { sw: 2.2 });
  s.line(222, 98, 222, 116, { sw: 1.6, stroke: C.red, single: true }); s.line(286, 96, 286, 114, { sw: 1.6, stroke: C.red, single: true });
  s.text(254, 110, '!', { font: 'body', size: 22, weight: 800, color: C.red });
  s.line(186, 228, 322, 228, { sw: 2, stroke: '#9b7b55' });
  s.text(254, 246, 'Nothing to hold: you fall.', { font: 'body', size: 12, weight: 800, color: C.red });
  sSay(s, 282, 'Insert 25 between 20 and 30: first 25 → 30 (grab),');
  sSay(s, 302, 'then 20 → 25 (let go). Never let go first.');
  return shrink(s.svg('Monkey bars. Left, correct: a child grabs the next bar first, then lets go of the old one, and stays safe. Right, wrong: a child lets go first and falls, with nothing to hold. Inserting 25 between 20 and 30: first 25 points to 30 (grab), then 20 points to 25 (let go). Never let go first.', 'll-pic'));
}


/** The three kinds: one-way street, two-way street, loop route. */
export function llRoadsPic() {
  const s = new Sketch(340, 380, 745);
  const road = (y) => s.rect(14, y, 312, 34, { fill: '#cfd8d6', sw: 1.4, stroke: '#7a8b8e' });
  sTitle(s, 22, 'Singly: a one-way street', C.teal);
  road(36);
  [60, 140, 220].forEach((x) => s.arrow(x, 53, x + 46, 53, { sw: 2.4, single: true }));
  s.round(250, 4, 76, 22, 3, { fill: C.ink, sw: 1 }); s.text(288, 19, 'ONE WAY →', { font: 'body', size: 11, weight: 800, color: '#fff' });
  sSay(s, 94, 'Forward only. To go back, start over from the head.');
  sTitle(s, 128, 'Doubly: a two-way street', C.orange);
  road(140);
  s.line(20, 157, 320, 157, { sw: 1.6, stroke: '#fff', dash: '10 8', single: true });
  [60, 180].forEach((x) => s.arrow(x, 149, x + 46, 149, { sw: 2.2, single: true }));
  [150, 270].forEach((x) => s.arrow(x, 166, x - 46, 166, { sw: 2.2, single: true, stroke: '#2f6fa8' }));
  sSay(s, 198, 'Next and back. Like a photo viewer.');
  sTitle(s, 232, 'Circular: a loop route', '#2f6fa8');
  s.round(60, 248, 220, 92, 40, { sw: 9, stroke: '#cfd8d6' });
  s.round(60, 248, 220, 92, 40, { sw: 1.4, stroke: '#7a8b8e' });
  s.arrow(130, 248, 190, 248, { sw: 2.4, single: true }); s.arrow(280, 280, 280, 310, { sw: 2.4, single: true });
  s.arrow(210, 340, 150, 340, { sw: 2.4, single: true }); s.arrow(60, 310, 60, 280, { sw: 2.4, single: true });
  s.line(98, 256, 98, 274, { sw: 1.8 }); s.path('M98 256 L116 261 L98 266 Z', { fill: C.orange, sw: 1 });
  s.text(100, 290, 'start', { font: 'body', size: 11.5, weight: 800, color: C.orange });
  s.text(186, 316, 'comes back to the start', { font: 'body', size: 12.5, weight: 800, color: '#2f6fa8' });
  sSay(s, 368, 'No end: a loop needs a rule for when to stop.');
  return shrink(s.svg('Three kinds of linked list as roads. Singly: a one-way street, forward only; to go back, start over from the head. Doubly: a two-way street, next and back, like a photo viewer. Circular: a loop route that comes back to the start; it has no end, so a loop needs a rule for when to stop.', 'll-pic'));
}


/* ---- Roomy box pictures (arrays style) ---- */
const aCell = (x, y, v, o = {}) => `<rect x="${x}" y="${y}" width="54" height="40" fill="${o.fill ?? '#fff'}" stroke="${o.dash ? '#9aa8aa' : '#1b2a2e'}" stroke-width="2.2"${o.dash ? ' stroke-dasharray="5 4"' : ''}/>` + (v === '' ? '' : sT(x + 27, y + 26, v, { mono: true, size: 16, w: 700 }));
const panel = (y, h, fill, line) => `<rect x="8" y="${y}" width="324" height="${h}" rx="10" fill="${fill}" stroke="${line}" stroke-width="1.5"/>`;

/** Part 1: the array's weakness. */
export function llWeakPic() {
  let b = sT(170, 22, 'Insert 25 at index 2 of an array', { size: 14.5, w: 800, fill: '#0b544e' });
  b += sT(14, 64, 'Before', { size: 12.5, w: 800, fill: '#37474a', anchor: 'start' });
  [10, 20, 30, 40, ''].forEach((v, i) => { b += aCell(62 + i * 54, 40, String(v), { dash: v === '' }); });
  [0, 1, 2, 3, 4].forEach((i) => { b += sT(89 + i * 54, 96, String(i), { mono: true, size: 12, w: 700, fill: '#b4461a' }); });
  b += sT(14, 164, 'After', { size: 12.5, w: 800, fill: '#37474a', anchor: 'start' });
  [10, 20, 25, 30, 40].forEach((v, i) => { b += aCell(62 + i * 54, 140, String(v), { fill: i === 2 ? '#fbdccc' : i > 2 ? '#f8dc95' : undefined }); });
  const arc = (i, n) => rArrow(`M${62 + (i - 1) * 54 + 30} 136 Q ${62 + (i - 0.5) * 54 + 27} 112, ${62 + i * 54 + 24} 136`, 'o', 2.4) + `<circle cx="${62 + (i - 0.5) * 54 + 27}" cy="117" r="9" fill="#e8662e"/>` + sT(62 + (i - 0.5) * 54 + 27, 121, n, { size: 11.5, w: 800, fill: '#fff' });
  b += arc(4, '1') + arc(3, '2');
  b += sT(170, 210, '30 and 40 had to move (40 first).', { size: 13, w: 800, fill: '#b4461a' });
  b += sT(170, 230, 'More values after the gap = more moves.', { size: 12.5, w: 700, fill: '#37474a' });
  return rPic(340, 242, 'Insert 25 at index 2 of an array. Before: 10, 20, 30, 40, and an empty slot. After: 10, 20, 25, 30, 40. 40 moved first, then 30. More values after the gap means more moves.', b);
}




/** Part 7: the three kinds as node pictures, one panel each. */
export function llKindsPic() {
  const X = [0, 1, 2].map((i) => 26 + i * 88);
  let b = panel(8, 112, '#fff', '#dfe6e4') + sT(22, 32, 'Singly: next only', { size: 14, w: 800, fill: '#0b544e', anchor: 'start' });
  let y = 64; b += rVars(X[0], y, []);
  ['A', 'B', 'C'].forEach((v, i) => { b += rBox(X[i], y, v); if (i < 2) b += rLink(X[i], X[i + 1], y); });
  b += rArrow(`M${rDot(X[2])} ${y + 20} H${rDot(X[2]) + 30}`) + sT(rDot(X[2]) + 36, y + 25, 'null', { mono: true, size: 13, w: 600, fill: '#4f5f62', anchor: 'start' });
  b += panel(130, 140, '#fff', '#dfe6e4') + sT(22, 154, 'Doubly: prev and next', { size: 14, w: 800, fill: '#b4461a', anchor: 'start' });
  y = 178;
  const D = [30, 130, 230];
  ['A', 'B', 'C'].forEach((v, i) => {
    const x = D[i];
    b += `<rect x="${x}" y="${y}" width="20" height="40" fill="#fff" stroke="#1b2a2e" stroke-width="2.2"/><rect x="${x + 20}" y="${y}" width="36" height="40" fill="#fff" stroke="#1b2a2e" stroke-width="2.2"/><rect x="${x + 56}" y="${y}" width="20" height="40" fill="#fff" stroke="#1b2a2e" stroke-width="2.2"/>` + sT(x + 38, y + 26, v, { mono: true, size: 16, w: 700 }) +
      `<circle cx="${x + 10}" cy="${y + 28}" r="3.4" fill="#2f6fa8"/><circle cx="${x + 66}" cy="${y + 12}" r="3.4" fill="#1b2a2e"/>`;
  });
  b += `<marker id="rm-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#2f6fa8"/></marker>`;
  for (let i = 0; i < 2; i++) b += rArrow(`M${D[i] + 66} ${y + 12} H${D[i + 1] - 2}`) + `<path d="M${D[i + 1] + 10} ${y + 28} H${D[i] + 78}" fill="none" stroke="#2f6fa8" stroke-width="2.2" marker-end="url(#rm-b)"/>`;
  b += `<path d="M${D[0] + 10} ${y + 28} V${y + 58}" fill="none" stroke="#2f6fa8" stroke-width="2" marker-end="url(#rm-b)"/>` + sT(D[0] + 10, y + 74, 'null', { mono: true, size: 12.5, w: 600, fill: '#4f5f62' });
  b += rArrow(`M${D[2] + 66} ${y + 12} H${D[2] + 84} V${y + 58}`) + sT(D[2] + 84, y + 74, 'null', { mono: true, size: 12.5, w: 600, fill: '#4f5f62' });
  b += sT(120, y + 74, 'prev', { size: 12.5, w: 800, fill: '#2f6fa8', anchor: 'start' }) + sT(200, y + 74, 'next', { size: 12.5, w: 800, fill: '#1b2a2e', anchor: 'start' });
  b += `<line x1="104" y1="${y + 68}" x2="114" y2="${y + 68}" stroke="#2f6fa8" stroke-width="2"/><line x1="184" y1="${y + 68}" x2="194" y2="${y + 68}" stroke="#1b2a2e" stroke-width="2"/>`;
  b += panel(282, 140, '#fff', '#dfe6e4') + sT(22, 306, 'Circular: back to the first', { size: 14, w: 800, fill: '#2f6fa8', anchor: 'start' });
  y = 326;
  ['A', 'B', 'C'].forEach((v, i) => { b += rBox(X[i], y, v); if (i < 2) b += rLink(X[i], X[i + 1], y); });
  b += `<marker id="rm-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#2f6fa8"/></marker>`;
  b += `<path d="M${rDot(X[2])} ${y + 20} H${rDot(X[2]) + 26} V${y + 70} H${X[0] + 18} V${y + 44}" fill="none" stroke="#2f6fa8" stroke-width="2.6" marker-end="url(#rm-c)"/>`;
  b += sT(170, y + 88, 'no null anywhere', { size: 12.5, w: 700, fill: '#37474a' });
  return rPic(340, 430, 'Singly: A points to B, B to C, C to null; next only. Doubly: each node has prev, data, next; next arrows go forward to null, blue prev arrows go back to null. Circular: A to B to C, and C points back to A; there is no null anywhere.', b);
}

/* ---- CodeWalks (one roomy picture per step) ---- */
const lostTag = (t) => sT(rSlot(2) + 28, 64 + R.H + 40, t, { size: 13, w: 800, fill: rC.r });

export const llSwapCode = String.raw`Node newNode = new Node(5);
head = newNode;        // WRONG: done first
newNode.next = head;`;
export function llSwapSteps() {
  const y = 64, X = [0, 1, 2, 3].map(rSlot);
  const pic = (st, alt) => {
    let b = rVars(X[0], y, st.v5) + rVars(X[1], y, st.v10) + rBox(X[0], y, '5', { fill: '#fbdccc' });
    if (st.self) b += rArrow(`M${rDot(X[0])} ${y + 20} C ${rDot(X[0]) + 28} ${y + 20}, ${rDot(X[0]) + 24} ${y + 76}, ${X[0] + 24} ${y + 76} C ${X[0] + 4} ${y + 76}, ${X[0] + 8} ${y + 58}, ${X[0] + 14} ${y + 44}`, 'o', 3);
    else b += rNullDown(X[0], y);
    [10, 20, 30].forEach((v, i) => { b += rBox(X[i + 1], y, String(v), { lost: st.lost }); if (i < 2) b += rLink(X[i + 1], X[i + 2], y, st.lost ? 'r' : 'k', { dash: st.lost }); });
    b += rNullDown(X[3], y, st.lost ? 'r' : 'k');
    if (st.lost) b += sT(X[2] + 28, y + 70, 'lost: nothing refers to 10', { size: 13, w: 800, fill: rC.r });
    return rPic(384, 160, alt, b);
  };
  const H = ['head', HEAD], N = ['newNode', NEW];
  return [
    { lines: [1], pic: pic({ v5: [N], v10: [H] }, 'The list 10, 20, 30 with head on 10, and a new node 5 on its own.'), vars: [['newNode', '→ 5']], say: 'Same start as before: node 5 exists, but it is not connected yet.' },
    { lines: [2], pic: pic({ v5: [['head', '#b23a33'], N], v10: [], lost: true }, 'head moved to 5 first. Nothing refers to 10 now, so 10, 20, and 30 are lost.'), vars: [['head', '→ 5']], say: '<b>Wrong order:</b> <code>head</code> moves first. Now <b>nothing</b> refers to node 10, so 10, 20, and 30 are lost (red, dashed).' },
    { lines: [3], pic: pic({ v5: [['head', '#b23a33'], N], v10: [], lost: true, self: true }, 'newNode.next = head makes 5 point to itself. The old list is still lost.'), vars: [['newNode.next', '→ 5 (itself)']], say: '<code>head</code> is already 5, so <code>newNode.next = head;</code> makes 5 point to <b>itself</b>. <code>printList(head)</code> prints 5 -&gt; 5 -&gt; 5 … forever.' },
  ];
}

export const llAfterCode = String.raw`// current refers to node 20
Node newNode = new Node(25);
newNode.next = current.next;   // step 1
current.next = newNode;        // step 2`;
export function llAfterSteps() {
  const y = 64, ly = 140, X = [0, 1, 2, 3].map(rSlot);
  const pic = (step, alt) => {
    let b = rVars(X[0], y, [['head', HEAD]]) + rVars(X[1], y, [['current', NEW]]);
    b += rBox(X[0], y, '10') + rLink(X[0], X[1], y) + rBox(X[1], y, '20', { fill: '#fbdccc' }) + rBox(X[3], y, '30') + rNullDown(X[3], y);
    if (step < 3) b += rLink(X[1], X[3], y);
    else b += rArrow(`M${rDot(X[1])} ${y + 20} C ${rDot(X[1]) + 24} ${y + 20}, ${X[2] - 22} ${ly + 20}, ${X[2] - 3} ${ly + 20}`, 'o', 3);
    if (step >= 1) {
      b += rBox(X[2], ly, '25', { fill: '#fbdccc' }) + sT(X[2] + 28, ly + R.H + 18, 'newNode', { mono: true, size: 13, w: 700, fill: NEW });
      if (step === 1) b += rArrow(`M${rDot(X[2])} ${ly + 20} H${rDot(X[2]) + 30}`) + sT(rDot(X[2]) + 36, ly + 25, 'null', { mono: true, size: 13, w: 600, fill: '#4f5f62', anchor: 'start' });
      else b += rArrow(`M${rDot(X[2])} ${ly + 20} C ${rDot(X[2]) + 22} ${ly + 20}, ${X[3] + 10} ${ly - 10}, ${X[3] + 16} ${y + R.H + 3}`, step === 2 ? 'o' : 'k', step === 2 ? 3 : 2.2);
    }
    return rPic(384, 206, alt, b);
  };
  return [
    { lines: [1], pic: pic(0, 'The list 10, 20, 30. head refers to 10 and current refers to 20.'), vars: [['current', '→ 20']], say: 'Start with <b>10 → 20 → 30</b>. We already have <code>current</code> on node 20, so no search is needed.' },
    { lines: [2], pic: pic(1, 'A new node 25 below the list, between 20 and 30. Its next is null.'), vars: [['newNode', '→ 25']], say: 'Make node 25. It waits <b>below</b> its spot: not connected yet.' },
    { lines: [3], pic: pic(2, '25 now points to 30. 20 still points to 30 too.'), vars: [['newNode.next', '→ 30']], say: '<b>Step 1:</b> <code>current.next</code> is the arrow stored in node 20, which points to 30. Copy it: <b>25 → 30</b>. Nothing is lost: 20 still points to 30.' },
    { lines: [4], pic: pic(3, '20 now points to 25, and 25 points to 30. The list is 10, 20, 25, 30.'), vars: [['current.next', '→ 25']], say: '<b>Step 2:</b> now 20 points to 25. The list is <b>10 → 20 → 25 → 30</b>. Two links changed. No value moved.' },
  ];
}

export const llBypassCode = String.raw`// previous refers to node 20
previous.next = previous.next.next;`;
export function llBypassSteps() {
  const y = 64, ly = 140, X = [0, 1, 2, 3].map(rSlot);
  const pic = (step, alt) => {
    let b = rVars(X[0], y, [['head', HEAD]]) + rVars(X[1], y, [['previous', NEW]]);
    b += rBox(X[0], y, '10') + rLink(X[0], X[1], y) + rBox(X[1], y, '20', { fill: '#fbdccc' }) + rBox(X[3], y, '30') + rNullDown(X[3], y);
    if (step < 2) {
      b += rBox(X[2], y, '25') + rLink(X[1], X[2], y) + rLink(X[2], X[3], y);
      if (step === 1) {
        b += `<rect x="${X[2] - 4}" y="${y - 4}" width="${rW + 8}" height="${R.H + 8}" rx="5" fill="none" stroke="#2f6fa8" stroke-width="2.4"/><rect x="${X[3] - 4}" y="${y - 4}" width="${rW + 8}" height="${R.H + 8}" rx="5" fill="none" stroke="#e8662e" stroke-width="2.4"/>`;
        b += sT(X[2] + 28, y - 14, 'previous.next', { mono: true, size: 12.5, w: 700, fill: '#2f6fa8' });
        b += sT(334, y - 34, 'previous.next.next', { mono: true, size: 12.5, w: 700, fill: '#b4461a', anchor: 'end' });
      }
    } else {
      b += rBox(X[2], ly, '25', { lost: true }) + rArrow(`M${rDot(X[2])} ${ly + 20} C ${rDot(X[2]) + 22} ${ly + 20}, ${X[3] + 10} ${ly - 10}, ${X[3] + 16} ${y + R.H + 3}`, 'r', 2, true);
      b += sT(X[2] + 28, ly + R.H + 20, 'out of the list', { size: 13, w: 800, fill: rC.r });
      b += rLink(X[1], X[3], y, 'o', { w: 3 });
    }
    return rPic(384, step === 2 ? 210 : 150, alt, b);
  };
  return [
    { lines: [1], pic: pic(0, 'The list 10, 20, 25, 30. previous refers to 20.'), vars: [['previous', '→ 20']], say: 'Start with <b>10 → 20 → 25 → 30</b>. To delete 25, we need the node <b>before</b> it: <code>previous</code> is on 20.' },
    { lines: [2], pic: pic(1, 'previous.next is 25 (blue). previous.next.next is 30 (orange).'), vars: [['previous.next', '→ 25'], ['previous.next.next', '→ 30']], say: '<b>Read the right side first.</b> Start at <code>previous</code> and follow one arrow: 25 (blue). Follow two arrows: <b>30</b> (orange).' },
    { lines: [2], pic: pic(2, '20 now points straight to 30. Node 25 drops out of the list.'), vars: [['previous.next', '→ 30']], say: 'Store 30 in <code>previous.next</code>: 20 now points straight to <b>30</b>. Node 25 is out of the list. The list is <b>10 → 20 → 30</b>.' },
  ];
}

export const llStuckCode = String.raw`Node current = head;
while (current != null) {
  System.out.print(current.data + " -> ");
  // forgot: current = current.next;
}`;
export function llStuckSteps() {
  const y = 70, X = [0, 1, 2].map(rSlot);
  const pic = (out, alt) => {
    let b = rVars(X[0], y, [['current', NEW], ['head', HEAD]]);
    [10, 20, 30].forEach((v, i) => { b += rBox(X[i], y, String(v), { fill: i === 0 ? '#fbdccc' : undefined }); if (i < 2) b += rLink(X[i], X[i + 1], y); });
    b += rArrow(`M${rDot(X[2])} ${y + 20} H${rDot(X[2]) + 30}`) + sT(rDot(X[2]) + 36, y + 25, 'null', { mono: true, size: 13, w: 600, fill: '#4f5f62', anchor: 'start' });
    b += `<rect x="10" y="146" width="320" height="40" rx="6" fill="#1b2a2e"/>` + sT(22, 171, out || ' ', { mono: true, size: 14, w: 700, fill: '#f8dc95', anchor: 'start' });
    b += sT(14, 139, 'Output', { size: 11.5, w: 800, fill: '#4f5f62', anchor: 'start' });
    return rPic(384, 196, alt, b);
  };
  return [
    { lines: [1], pic: pic('', 'current and head both refer to node 10. No output yet.'), vars: [['current', '→ 10']], say: '<code>current</code> starts at node 10, like before.' },
    { lines: [2], pic: pic('', 'current is node 10, not null.'), vars: [['current != null', 'true']], say: 'Is <code>current</code> null? No, it is node 10. Enter the loop.' },
    { lines: [3], pic: pic('10 -> ', 'Prints 10.'), vars: [['current.data', '= 10']], say: 'Print 10. Now the loop should move <code>current</code>, but that line is <b>missing</b>.' },
    { lines: [2], pic: pic('10 -> ', 'current is still node 10.'), vars: [['current', '→ 10 (still)']], say: 'Check again: <code>current</code> is <b>still node 10</b>. Nothing moved it, so it is not null. Loop again.' },
    { lines: [3, 2], pic: pic('10 -> 10 -> 10 -> 10 -> …', 'It prints 10 again and again, forever.'), vars: [['current', '→ 10 forever']], say: 'Print 10 again, check again, print again… <b>forever</b>. 20 and 30 are never visited. Fix: put <code>current = current.next;</code> back inside the loop.' },
  ];
}

/** Sketch: a treasure hunt around school. */
export function llHuntPic() {
  const s = new Sketch(340, 340, 216);
  s.text(170, 22, 'A treasure hunt at school', { font: 'body', size: 15, weight: 800, color: C.orange });
  const card = (x, y, t, msg, place, fill) => {
    s.round(x, y, 118, 58, 8, { fill, sw: 1.7 });
    s.text(x + 59, y + 21, t, { font: 'body', size: 13, weight: 800 });
    s.text(x + 59, y + 44, msg, { font: 'hand', size: 15, color: C.soft });
    s.text(x + 59, y + 76, place, { font: 'body', size: 12, weight: 700, color: C.teal });
  };
  card(12, 42, 'Clue 1', 'Next: canteen', 'at the flagpole', C.butter);
  card(210, 42, 'Clue 2', 'Next: mango tree', 'at the canteen', C.card);
  card(12, 160, 'Clue 3', 'Next: library', 'under the mango tree', C.card);
  card(210, 160, 'Clue 4', 'The end!', 'at the library', C.pink);
  const o = { stroke: C.orange, sw: 2.2, single: true, dash: '7 6' };
  s.arrow(134, 71, 204, 71, o);
  s.arrow(222, 128, 130, 160, o);
  s.arrow(134, 189, 204, 189, o);
  s.rect(292, 252, 36, 22, { fill: '#b7793f', sw: 1.6 });
  s.path('M292 252 Q310 236 328 252 Z', { fill: '#c98a4b', sw: 1.6 });
  s.rect(306, 256, 8, 8, { fill: C.amber, sw: 1 });
  s.text(14, 284, 'Clue 1 is where you start: like head.', { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  s.text(14, 304, 'Each clue says where the next one is: like next.', { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  s.text(14, 324, '"The end!" means no more clues: like null.', { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  return s.svg('A treasure hunt at school. Clue 1 at the flagpole says: next, canteen. Clue 2 at the canteen says: next, mango tree. Clue 3 under the mango tree says: next, library. Clue 4 at the library says: the end, beside a treasure chest. Dashed arrows go from clue to clue. Clue 1 is where you start, like head; each clue says where the next one is, like next; the end means no more clues, like null.', 'll-pic').replace(/(\d+\.\d)\d+/g, '$1');
}

/* ---- Linked lists (round 6): her feedback of Oct 29 ---- */
const tsp = (parts, x, y, o = {}) => `<text x="${x}" y="${y}" font-family="Nunito, system-ui, sans-serif" font-size="${o.size ?? 13}" font-weight="700" fill="#37474a" text-anchor="${o.anchor ?? 'start'}">` +
  parts.map(([t, c, mono]) => c ? `<tspan fill="${c}" font-weight="800"${mono ? ' font-family="&quot;IBM Plex Mono&quot;, monospace"' : ''}>${t}</tspan>` : `<tspan>${t}</tspan>`).join('') + '</text>';
const COL = { head: '#0e6b63', nul: '#b23a33', data: '#b4461a', next: '#2f6fa8' };

/** Part 1: a linked list, then one node up close (colored terms). */
export function llDefPic() {
  let b = panel(8, 168, '#fff', '#c9d6d4') + sT(22, 34, 'A linked list', { size: 15, w: 800, fill: HEAD, anchor: 'start' });
  const y = 88, xs = [22, 112, 202];
  b += rVars(xs[0], y, [['head', COL.head]]);
  ['A', 'B', 'C'].forEach((v, i) => { b += rBox(xs[i], y, v, { fill: v === 'B' ? '#fbdccc' : undefined }); if (i < 2) b += rLink(xs[i], xs[i + 1], y); });
  b += rArrow(`M${rDot(xs[2])} ${y + 20} H${rDot(xs[2]) + 34}`, 'r') + sT(rDot(xs[2]) + 40, y + 25, 'null', { mono: true, size: 14, w: 700, fill: COL.nul, anchor: 'start' });
  b += tsp([['head', COL.head, 1], [' refers to the first node.']], 22, 150) + tsp([['null', COL.nul, 1], [' means no next node: the end.']], 22, 168);
  b += panel(188, 176, '#fdf1ea', '#f0c2a8') + sT(22, 214, 'One node, up close (B)', { size: 15, w: 800, fill: NEW, anchor: 'start' });
  const bx = 56, by = 234;
  b += `<rect x="${bx}" y="${by}" width="110" height="52" fill="#fbdccc" stroke="#1b2a2e" stroke-width="2.4"/><rect x="${bx + 110}" y="${by}" width="70" height="52" fill="#d6e6f2" stroke="#1b2a2e" stroke-width="2.4"/>`;
  b += sT(bx + 55, by + 34, 'B', { mono: true, size: 22, w: 700 }) + `<circle cx="${bx + 145}" cy="${by + 26}" r="4.5" fill="#1b2a2e"/>`;
  b += rArrow(`M${bx + 145} ${by + 26} H${bx + 230}`) + sT(bx + 244, by + 31, 'C', { mono: true, size: 16, w: 700, fill: '#9aa8aa' });
  b += sT(bx + 55, by + 76, 'data', { mono: true, size: 15, w: 700, fill: COL.data }) + sT(bx + 55, by + 95, 'the value', { size: 12.5, w: 700, fill: '#37474a' });
  b += sT(bx + 145, by + 76, 'next', { mono: true, size: 15, w: 700, fill: COL.next }) + sT(bx + 145, by + 95, 'where to find', { size: 12.5, w: 700, fill: '#37474a' }) + sT(bx + 145, by + 111, 'the next node', { size: 12.5, w: 700, fill: '#37474a' });
  return rPic(340, 372, 'Top: a linked list. head refers to the first node, A. A points to B, B points to C, and C points to null, which means no next node: the end. Bottom: node B up close. It has two parts: data, the value B, and next, which tells where to find the next node, C.', b);
}

/** Part 1: seat plan (array) vs a train (linked list). */
export function llTrainPic() {
  const s = new Sketch(340, 436, 912);
  sTitle(s, 22, 'Seat plan: like an array', C.teal);
  ['Ana', 'Ben', 'Cris', 'Dan'].forEach((n, i) => {
    const x = 52 + i * 78;
    s.round(x - 11, 34, 22, 20, 5, { fill: C.butter, sw: 1.3 }); s.text(x, 49, String(i), { font: 'body', size: 13, weight: 800 });
    kid(s, x, 74, [C.teal, C.orange, C.amber, '#2f6fa8'][i]);
    s.rect(x - 20, 116, 40, 8, { fill: '#c98a4b', sw: 1.4 }); s.line(x - 16, 124, x - 16, 140, { sw: 1.6 }); s.line(x + 16, 124, x + 16, 140, { sw: 1.6 });
    s.text(x, 158, n, { font: 'body', size: 13, weight: 800 });
  });
  sSay(s, 186, 'Seat 2? Walk straight to it. One step.');
  s.line(14, 212, 326, 212, { stroke: '#dfe6e4', sw: 1.4, single: true });
  sTitle(s, 244, 'A train: like a linked list', C.orange);
  const y = 280;
  // engine
  s.rect(12, y + 10, 62, 40, { fill: C.teal, sw: 1.8 }); s.rect(46, y - 10, 28, 22, { fill: C.teal, sw: 1.6 }); s.rect(52, y - 4, 16, 12, { fill: C.sky, sw: 1.2 });
  s.rect(20, y - 2, 10, 14, { fill: '#555', sw: 1.2 });
  [26, 60].forEach((cx) => s.circle(cx, y + 54, 14, { fill: '#555', sw: 1.4 }));
  s.text(43, y + 82, 'engine', { font: 'body', size: 12, weight: 800, color: C.teal });
  const cars = [[94, C.butter, 'car 1'], [178, C.pink, 'car 2'], [262, C.sky, 'car 3']];
  cars.forEach(([x, fill, nm]) => {
    s.rect(x, y + 6, 62, 44, { fill, sw: 1.8 });
    [x + 8, x + 34].forEach((wx) => s.rect(wx, y + 14, 20, 14, { fill: '#fff', sw: 1.2 }));
    [x + 14, x + 48].forEach((cx) => s.circle(cx, y + 54, 14, { fill: '#555', sw: 1.4 }));
    s.text(x + 31, y + 82, nm, { font: 'body', size: 12, weight: 800 });
  });
  [[74, 94], [156, 178], [240, 262]].forEach(([a, b2]) => { s.line(a, y + 38, b2, y + 38, { stroke: C.orange, sw: 3, single: true }); s.circle(b2 - 3, y + 38, 6, { fill: C.orange, sw: 1 }); });
  s.line(324, y + 38, 334, y + 38, { stroke: C.red, sw: 3, single: true }); s.path(`M334 ${y + 38} q4 0 4 6 q0 6 -5 6`, { stroke: C.red, sw: 2.4, single: true });
  s.text(304, y - 12, 'empty hook', { font: 'body', size: 11.5, weight: 800, color: C.red });
  s.text(170, y - 12, 'hooks', { font: 'body', size: 11.5, weight: 800, color: C.orange });
  sSay(s, 384, 'The engine is like head. Each hook is like next.');
  sSay(s, 403, 'The empty hook at the end is like null.');
  sSay(s, 422, 'To reach car 3, go car by car.');
  return shrink(s.svg('Top: a seat plan, like an array. Ana, Ben, Cris, and Dan sit on chairs numbered 0 to 3; to reach seat 2, walk straight to it. Bottom: a train, like a linked list: an engine pulling car 1, car 2, and car 3, each hooked only to the next car. The engine is like head, each hook is like next, and the last car\'s empty hook is like null. To reach car 3, go car by car.', 'll-pic'));
}

/** Part 6: unhook car 2; car 1 is hooked to car 3. */
export function llTrainSkipPic() {
  const s = new Sketch(340, 256, 1013);
  sTitle(s, 22, 'Take car 2 out of the train', C.orange);
  const y = 110;
  const car = (x, yy, fill, nm, ghost) => {
    const o = ghost ? { stroke: '#9aa8aa', dash: '5 4', single: true } : {};
    s.rect(x, yy, 62, 44, { fill: ghost ? '#f3f3f1' : fill, sw: 1.8, ...o });
    [x + 8, x + 34].forEach((wx) => s.rect(wx, yy + 8, 20, 14, { fill: '#fff', sw: 1.2, ...o }));
    [x + 14, x + 48].forEach((cx) => s.circle(cx, yy + 48, 14, { fill: ghost ? '#ddd' : '#555', sw: 1.4, ...o }));
    s.text(x + 31, yy + 76, nm, { font: 'body', size: 12, weight: 800, color: ghost ? '#9aa8aa' : C.ink });
  };
  car(20, y, C.butter, 'car 1'); car(139, y - 60, C.pink, 'car 2 (out)', true); car(258, y, C.sky, 'car 3');
  s.path(`M82 ${y + 32} Q170 ${y + 70} 258 ${y + 32}`, { stroke: C.orange, sw: 3, single: true });
  s.circle(255, y + 32, 6, { fill: C.orange, sw: 1 });
  s.text(170, y + 92, 'new hook: car 1 → car 3', { font: 'body', size: 12.5, weight: 800, color: C.orange });
  sSay(s, 226, 'Only car 1\'s hook changes.'); sSay(s, 244, 'Car 2 is no longer in the train.');
  return shrink(s.svg('Take car 2 out of the train. Car 2 is lifted out, drawn faded. Car 1 now hooks straight to car 3. Only car 1\'s hook changes, and car 2 is no longer in the train.', 'll-pic'));
}

/** Part 2: Node b = a vs new Node: one person with two names vs twins. */
export function llNamesPic() {
  const s = new Sketch(340, 290, 1114);
  s.round(6, 6, 160, 278, 10, { fill: '#eef6f4', sw: 1.2, stroke: '#c9d6d4' });
  s.round(174, 6, 160, 278, 10, { fill: '#fdf1ea', sw: 1.2, stroke: '#f0c2a8' });
  s.text(86, 30, 'Node b = a;', { font: 'mono', size: 13, weight: 700 }); s.text(86, 48, 'b.data = 9;', { font: 'mono', size: 12, weight: 700, color: C.orange });
  s.text(254, 30, 'Node b = new Node(5);', { font: 'mono', size: 11.5, weight: 700 }); s.text(254, 48, 'b.data = 9;', { font: 'mono', size: 12, weight: 700, color: C.orange });
  const tag = (x, y, t) => { s.round(x - 16, y - 16, 32, 24, 5, { fill: C.tealWash, sw: 1.4, stroke: C.teal }); s.text(x, y + 1, t, { font: 'mono', size: 14, weight: 700, color: C.teal }); };
  const person = (x, y, shirt, num) => { kid(s, x, y, shirt); s.text(x, y + 38, num, { font: 'body', size: 13, weight: 800, color: '#fff' }); };
  tag(56, 76, 'a'); tag(116, 76, 'b'); person(86, 128, C.orange, '9');
  s.arrow(60, 84, 76, 108, { stroke: C.orange, sw: 2.2, single: true }); s.arrow(112, 84, 96, 108, { stroke: C.orange, sw: 2.2, single: true });
  s.text(86, 204, 'one person,', { font: 'body', size: 12.5, weight: 800, color: C.teal }); s.text(86, 220, 'two names', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  s.text(86, 250, 'his shirt: 5 → 9', { font: 'body', size: 12, weight: 800, color: C.orange }); s.text(86, 268, 'a.data is 9 too', { font: 'body', size: 12, weight: 800, color: C.orange });
  tag(214, 76, 'a'); tag(294, 76, 'b'); person(214, 128, C.teal, '5'); person(294, 128, C.orange, '9');
  s.arrow(214, 86, 214, 108, { stroke: C.orange, sw: 2.2, single: true }); s.arrow(294, 86, 294, 108, { stroke: C.orange, sw: 2.2, single: true });
  s.text(254, 204, 'two people,', { font: 'body', size: 12.5, weight: 800, color: C.orange }); s.text(254, 220, 'one name each', { font: 'body', size: 12.5, weight: 800, color: C.orange });
  s.text(254, 250, 'only b\'s shirt: 5 → 9', { font: 'body', size: 12, weight: 800, color: C.orange }); s.text(254, 268, 'a.data stays 5', { font: 'body', size: 12, weight: 800, color: C.teal });
  return shrink(s.svg('Left, Node b = a: the name tags a and b both point to one person, whose shirt number is the data. After b.data = 9, his shirt changes from 5 to 9, so a.data is 9 too, because it is one person with two names. Right, Node b = new Node(5): a and b point to two different people, both starting with 5. After b.data = 9, only the shirt of b changes from 5 to 9, and a.data stays 5.', 'll-pic'));
}

/** Part 3: access the 3rd node. */
export function llAccessPic() {
  const X = [22, 118, 214], y = 96;
  let b = sT(170, 22, 'Access: get the 3rd node', { size: 15, w: 800, fill: NEW });
  b += rVars(X[0], y, [['head', HEAD]]);
  [10, 20, 30].forEach((v, i) => { b += rBox(X[i], y, String(v), { fill: i === 2 ? '#e8662e' : undefined, ink: i === 2 ? '#fff' : undefined }); if (i < 2) b += rLink(X[i], X[i + 1], y); });
  b += rArrow(`M${rDot(X[2])} ${y + 20} H${rDot(X[2]) + 34}`) + sT(rDot(X[2]) + 40, y + 25, 'null', { mono: true, size: 13, w: 600, fill: '#4f5f62', anchor: 'start' });
  ['1st', '2nd', '3rd'].forEach((t, i) => { b += sT(X[i] + 28, y + 62, t, { size: 13, w: 800, fill: i === 2 ? NEW : '#37474a' }); });
  const hop = (x1, x2, t) => rArrow(`M${x1} ${y - 4} Q ${(x1 + x2) / 2} ${y - 40}, ${x2} ${y - 6}`, 'o', 2.4) + sT((x1 + x2) / 2, y - 30, t, { size: 12, w: 800, fill: NEW });
  b += hop(X[0] + 40, X[1] + 18, 'hop 1') + hop(X[1] + 40, X[2] + 18, 'hop 2');
  b += sT(170, y + 100, 'Start at head (the 1st node). 2 hops later: the 3rd. Stop.', { size: 12.5, w: 700, fill: '#37474a' });
  return rPic(340, 210, 'Access: to get the 3rd node of 10, 20, 30, start at head on the 1st node, 10. Hop 1 reaches the 2nd node, 20. Hop 2 reaches the 3rd node, 30. Stop there.', b);
}

/** Part 3: traversal visits every node, then stops at null. */
export function llTravPic() {
  const X = [22, 118, 214], y = 74;
  let b = sT(170, 22, 'Traversal: visit every node', { size: 15, w: 800, fill: HEAD });
  b += rVars(X[0], y, [['head', HEAD]]);
  [10, 20, 30].forEach((v, i) => { b += rBox(X[i], y, String(v), { fill: '#d7ece9' }); if (i < 2) b += rLink(X[i], X[i + 1], y); });
  b += rArrow(`M${rDot(X[2])} ${y + 20} H${rDot(X[2]) + 34}`) + sT(rDot(X[2]) + 40, y + 25, 'null', { mono: true, size: 13, w: 600, fill: '#4f5f62', anchor: 'start' });
  ['print 10', 'print 20', 'print 30'].forEach((t, i) => { b += `<rect x="${X[i] - 4}" y="${y + 52}" width="64" height="24" rx="12" fill="#d7ece9"/>` + sT(X[i] + 28, y + 69, t, { size: 12, w: 800, fill: HEAD }); });
  b += `<rect x="${rDot(X[2]) + 26}" y="${y + 52}" width="52" height="24" rx="12" fill="#f6d6d0"/>` + sT(rDot(X[2]) + 52, y + 69, 'stop', { size: 12, w: 800, fill: '#b23a33' });
  b += sT(170, y + 112, 'Visit a node, follow next, repeat. Stop at null.', { size: 12.5, w: 700, fill: '#37474a' });
  return rPic(340, 198, 'Traversal: start at head and visit every node of 10, 20, 30: print 10, print 20, print 30. After 30 comes null, so stop.', b);
}

/** Part 3: null as a reference value vs printed text. */
export function llNullPic() {
  const X = [16, 96, 176], y = 92;
  let b = panel(8, 180, '#eef6f4', '#c9d6d4') + sT(22, 32, 'null as a value:  current != null', { size: 14, w: 800, fill: HEAD, anchor: 'start' });
  [10, 20, 30].forEach((v, i) => { b += rBox(X[i], y, String(v)); if (i < 2) b += rLink(X[i], X[i + 1], y); });
  b += rArrow(`M${rDot(X[2])} ${y + 20} H${X[2] + 80}`) + `<rect x="${X[2] + 84}" y="${y}" width="${R.D + R.N}" height="${R.H}" rx="4" fill="none" stroke="#9aa8aa" stroke-width="2" stroke-dasharray="5 4"/>`;
  b += sT(X[2] + 112, y + 25, 'none', { size: 12, w: 800, fill: '#9aa8aa' });
  b += sT(X[2] + 112, y - 26, 'current', { mono: true, size: 13.5, w: 700, fill: NEW }) + rArrow(`M${X[2] + 112} ${y - 21} V${y - 3}`, 'o', 2);
  b += tsp([['After 30, ', 0], ['current', NEW, 1], [' is ', 0], ['null', COL.nul, 1], [': it refers to no node.', 0]], 22, 160, { size: 12.5 });
  b += tsp([['So ', 0], ['current != null', HEAD, 1], [' is false, and the loop stops.', 0]], 22, 178, { size: 12.5 });
  b += panel(200, 140, '#fdf1ea', '#f0c2a8') + sT(22, 224, 'null as text:  println("null")', { size: 14, w: 800, fill: NEW, anchor: 'start' });
  b += `<rect x="22" y="240" width="296" height="40" rx="6" fill="#1b2a2e"/>` + sT(36, 266, '10 -> 20 -> 30 -> ', { mono: true, size: 14, w: 700, fill: '#f8dc95', anchor: 'start' }) + sT(212, 266, 'null', { mono: true, size: 14, w: 700, fill: '#f8dc95', anchor: 'start' }) + `<rect x="206" y="249" width="46" height="24" rx="4" fill="none" stroke="#e8662e" stroke-width="2.2"/>`;
  b += tsp([['After the loop, the program just types the', 0]], 22, 306, { size: 12.5 }) + tsp([['four letters ', 0], ['n u l l', NEW, 1], [' to show where the list ends.', 0]], 22, 324, { size: 12.5 });
  return rPic(340, 348, 'Top: null as a value. The list 10, 20, 30; after 30 there is no node, drawn as a dashed empty box, and current points there: current is null, it refers to no node, so current != null is false and the loop stops. Bottom: null as text. The output 10 -> 20 -> 30 -> null; after the loop, the program just types the four letters n u l l to show where the list ends.', b);
}

/** Part 2: Node first = new Node(10); three numbered steps. */
export function llNewPic() {
  let b = sT(170, 24, 'Node first = new Node(10);', { mono: true, size: 15, w: 700 });
  const NX = 206;
  const node = (y, d, n) => `<rect x="${NX}" y="${y}" width="64" height="44" fill="#fbdccc" stroke="#1b2a2e" stroke-width="2.2"/><rect x="${NX + 64}" y="${y}" width="56" height="44" fill="#d6e6f2" stroke="#1b2a2e" stroke-width="2.2"/>` +
    sT(NX + 32, y - 6, 'data', { size: 11.5, w: 800, fill: COL.data }) + sT(NX + 92, y - 6, 'next', { size: 11.5, w: 800, fill: COL.next }) +
    (d ? sT(NX + 32, y + 29, d, { mono: true, size: 17, w: 700 }) : '') + (n ? sT(NX + 92, y + 28, n, { mono: true, size: 13, w: 700, fill: COL.nul }) : '');
  const step = (y, n, title, l1, l2, fill, line) => panel(y, 84, fill, line) + `<circle cx="32" cy="${y + 26}" r="13" fill="#e8662e"/>` + sT(32, y + 31, n, { size: 14, w: 800, fill: '#fff' }) +
    sT(52, y + 31, title, { size: 14, w: 800, fill: NEW, anchor: 'start' }) + sT(22, y + 56, l1, { size: 12.5, w: 700, fill: '#37474a', anchor: 'start' }) + sT(22, y + 73, l2, { size: 12.5, w: 700, fill: '#37474a', anchor: 'start' });
  const down = (y) => rArrow(`M170 ${y} V${y + 20}`, 'o', 2.6);
  b += step(40, '1', 'new', 'makes an empty', 'node in memory', '#fff', '#dfe6e4') + node(64, '', '');
  b += down(126);
  b += step(150, '2', 'constructor', 'stores 10 in data,', 'null in next', '#fff', '#dfe6e4') + node(174, '10', 'null');
  b += down(236);
  b += step(260, '3', '=', 'stores the', 'reference in first', '#fdf1ea', '#f0c2a8') + node(284, '10', 'null');
  b += `<rect x="118" y="292" width="52" height="28" rx="6" fill="#d7ece9" stroke="#0e6b63" stroke-width="2"/>` + sT(144, 311, 'first', { mono: true, size: 13.5, w: 700, fill: HEAD }) + rArrow(`M171 306 H${NX - 3}`, 'o', 2.6);
  return rPic(340, 352, 'Node first = new Node(10), in three numbered steps with arrows between them. Step 1: new makes an empty node in memory. Step 2: the constructor stores 10 in data and null in next. Step 3: the equals sign stores the reference in first, drawn as an arrow from first to the node.', b);
}

/** Part 7 trap: circular describes the loop, not the number of links. */
export function llCircPic() {
  const X = [40, 136, 232];
  let b = panel(8, 150, '#fff', '#dfe6e4') + sT(22, 32, 'Circular singly: next only', { size: 14, w: 800, fill: '#2f6fa8', anchor: 'start' });
  let y = 56;
  ['A', 'B', 'C'].forEach((v, i) => { b += rBox(X[i], y, v); if (i < 2) b += rLink(X[i], X[i + 1], y); });
  b += rArrow(`M${rDot(X[2])} ${y + 20} H${rDot(X[2]) + 30} V${y + 74} H${X[0] + 18} V${y + 44}`, 'o', 2.6);
  b += sT(170, y + 92, 'C → back to A', { size: 12.5, w: 800, fill: NEW });
  b += panel(170, 196, '#fff', '#dfe6e4') + sT(22, 194, 'Circular doubly: prev and next', { size: 14, w: 800, fill: '#2f6fa8', anchor: 'start' });
  y = 254;
  const D = [40, 136, 232];
  b += `<marker id="rm-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#2f6fa8"/></marker>`;
  ['A', 'B', 'C'].forEach((v, i) => {
    const x = D[i];
    b += `<rect x="${x}" y="${y}" width="18" height="40" fill="#d6e6f2" stroke="#1b2a2e" stroke-width="2.2"/><rect x="${x + 18}" y="${y}" width="32" height="40" fill="#fff" stroke="#1b2a2e" stroke-width="2.2"/><rect x="${x + 50}" y="${y}" width="18" height="40" fill="#fff" stroke="#1b2a2e" stroke-width="2.2"/>` + sT(x + 34, y + 26, v, { mono: true, size: 16, w: 700 }) +
      `<circle cx="${x + 9}" cy="${y + 28}" r="3.4" fill="#2f6fa8"/><circle cx="${x + 59}" cy="${y + 12}" r="3.4" fill="#1b2a2e"/>`;
  });
  for (let i = 0; i < 2; i++) b += rArrow(`M${D[i] + 59} ${y + 12} H${D[i + 1] - 2}`) + `<path d="M${D[i + 1] + 9} ${y + 28} H${D[i] + 70}" fill="none" stroke="#2f6fa8" stroke-width="2.2" marker-end="url(#rm-b)"/>`;
  b += rArrow(`M${D[2] + 59} ${y + 12} H${D[2] + 84} V${y + 66} H${D[0] + 26} V${y + 44}`, 'o', 2.4);
  b += `<path d="M${D[0] + 9} ${y + 28} H${D[0] - 18} V${y - 30} H${D[2] + 52} V${y - 4}" fill="none" stroke="#2f6fa8" stroke-width="2.4" marker-end="url(#rm-b)"/>`;
  b += sT(170, y - 36, 'A.prev → back to C', { size: 12.5, w: 800, fill: '#2f6fa8' });
  b += sT(170, y + 84, 'C.next → back to A', { size: 12.5, w: 800, fill: NEW });
  b += sT(170, 392, 'Both loop back, so both are circular.', { size: 13, w: 800, fill: '#37474a' });
  return rPic(340, 404, 'Circular singly: A to B to C, and C\'s next goes back to A; each node has next only. Circular doubly: each node has prev and next; C\'s next goes back to A, and A\'s prev goes back to C. Both loop back, so both are circular.', b);
}

/** The real cost: house numbers vs directions (more room around the divider). */
export function llStreetPic() {
  const s = new Sketch(340, 392, 634);
  const house = (x, y, roof, label) => {
    s.path(`M${x - 4} ${y + 20} L${x + 22} ${y} L${x + 48} ${y + 20} Z`, { fill: roof, sw: 1.5 });
    s.rect(x, y + 20, 44, 34, { fill: '#fff', sw: 1.5 });
    s.rect(x + 16, y + 34, 12, 20, { fill: '#c98a4b', sw: 1.2 });
    if (label) { s.round(x + 8, y + 22, 28, 12, 3, { fill: C.butter, sw: 1 }); s.text(x + 22, y + 32, label, { font: 'body', size: 10, weight: 800 }); }
  };
  sTitle(s, 22, 'With house numbers: like an array', C.teal);
  [['1', 14], ['2', 70], ['3', 126]].forEach(([n, x]) => house(x, 78, C.pink, n));
  s.text(204, 120, '…', { font: 'body', size: 20, weight: 800 });
  house(262, 78, C.orange, '500');
  s.rect(8, 134, 324, 12, { fill: '#cfd8d6', sw: 1, stroke: '#9aa8aa' });
  s.curve(36, 70, 282, 70, -36, { stroke: C.teal, sw: 2.6, single: true });
  s.text(160, 46, 'go straight to #500', { font: 'body', size: 12.5, weight: 800, color: C.teal });
  sSay(s, 172, 'One trip, no matter how long the street is.');
  s.line(14, 198, 326, 198, { stroke: '#dfe6e4', sw: 1.4, single: true });
  sTitle(s, 232, 'With directions only: like a linked list', C.orange);
  [14, 76, 138, 200].forEach((x, i) => { house(x, 274, C.sky); if (i < 3) s.curve(x + 36, 272, x + 72, 272, -16, { stroke: C.orange, sw: 2, single: true }); });
  s.text(276, 318, '… #500', { font: 'body', size: 14, weight: 800 });
  [1, 2, 3].forEach((n, i) => s.text(68 + i * 62, 256, String(n), { font: 'body', size: 11.5, weight: 800, color: C.orange }));
  s.rect(8, 330, 324, 12, { fill: '#cfd8d6', sw: 1, stroke: '#9aa8aa' });
  sSay(s, 364, 'Each house only says which house is next.'); sSay(s, 382, 'You must ask at every house on the way.');
  return shrink(s.svg('Top: houses with numbers, like an array: 1, 2, 3, then house 500. You can go straight to number 500 in one trip, no matter how long the street is. Bottom: houses with directions only, like a linked list: each house only says which house is next, so you ask at every house, 1, 2, 3, and so on, until you reach number 500.', 'll-pic'));
}


/* ---- Stacks and queues (chat 17): plates sketch + push/pop and enqueue/dequeue walkthroughs ---- */

/** Sketch: a pile of clean plates after a handaan. push = put on top, pop = take the top, peek = look. */
export function platesPic() {
  const s = new Sketch(340, 352, 517);
  s.text(170, 24, 'Clean plates after a handaan', { font: 'body', size: 15, weight: 800 });
  const plate = (cx, cy, o = {}) => {
    s.ellipse(cx, cy, 128, 24, { fill: o.fill ?? C.card, sw: 1.7, stroke: o.stroke ?? C.ink, ...(o.ghost ? { dash: '5 4', single: true } : {}) });
    s.ellipse(cx, cy - 1, 78, 11, { fill: o.inner ?? C.sky, sw: 1, stroke: o.stroke ?? C.ink, single: true });
  };
  // table and the pile (bottom first)
  s.line(40, 284, 300, 284, { sw: 2, stroke: C.soft, rough: 0.6 });
  s.rect(60, 284, 220, 10, { fill: C.butter, sw: 1.4, rough: 0.6 });
  [266, 250, 234, 218].forEach((y) => plate(170, y));
  s.text(170, 312, 'bottom: first plate in', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  // top label
  s.arrow(296, 210, 240, 216, { stroke: C.orange, sw: 2.2, head: 8 });
  s.text(300, 206, 'top', { font: 'body', size: 14, weight: 800, color: C.orange, anchor: 'start' });
  // push: a plate comes down onto the top (left)
  plate(84, 112, { fill: C.tealWash });
  s.curve(84, 128, 128, 200, -24, { stroke: C.teal, sw: 2.4, head: 9 });
  s.text(84, 62, 'push', { font: 'mono', size: 16, weight: 700, color: C.teal });
  s.text(84, 82, 'put a plate on top', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  // pop: the top plate is lifted off (right)
  plate(256, 112, { fill: C.orangeWash, inner: C.card });
  s.curve(214, 204, 256, 128, -24, { stroke: C.orange, sw: 2.4, head: 9 });
  s.text(256, 62, 'pop', { font: 'mono', size: 16, weight: 700, color: C.orange });
  s.text(256, 82, 'take the top plate', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(170, 336, 'You never pull a plate from the middle or the bottom.', { font: 'body', size: 12.5, weight: 800, color: C.red });
  return s.svg('A pile of four clean plates on a table after a handaan. On the left, push: a new plate is put down on the top of the pile. On the right, pop: the top plate is lifted off. The top plate is marked top; the bottom plate went in first. You never pull a plate from the middle or the bottom.').replace(/(\d+\.\d)\d+/g, '$1');
}

/* Stack walkthrough pictures: the array data drawn as a COLUMN (index 0 at the bottom), top pointer on the right. */
const SKX = 128, SKW = 84, SKH = 44, SKY0 = 136; // cell i top edge = SKY0 - i * SKH (i = 0 is the bottom cell)
const skCellY = (i) => SKY0 - i * SKH;
function stackPic(cells, top, o = {}) {
  const st = { '': ['#ffffff', '#1b2a2e', '#1b2a2e'], hot: ['#e8662e', '#b4461a', '#ffffff'], seen: ['#d7ece9', '#0e6b63', '#1b2a2e'], off: ['#eef2f2', '#9aa8aa', '#8a9799'] };
  let b = sT(SKX + SKW / 2, 22, 'data', { mono: true, size: 14, w: 700, fill: '#0b544e' });
  b += sT(SKX - 14, 22, 'index', { size: 12, w: 800, anchor: 'end', fill: '#37474a' });
  cells.forEach((v, i) => {
    const k = (o.kinds && o.kinds[i]) || (i > top ? 'off' : ''), [f, s, t] = st[k], y = skCellY(i);
    const dash = k === 'off' ? ' stroke-dasharray="5 4"' : '';
    b += `<rect x="${SKX}" y="${y}" width="${SKW}" height="${SKH}" fill="${f}" stroke="${s}" stroke-width="2"${dash}/>`;
    b += sT(SKX + SKW / 2, y + 28, v, { mono: true, size: 16, w: 700, fill: t });
    b += sT(SKX - 14, y + 28, i, { mono: true, size: 13, w: 600, anchor: 'end', fill: '#37474a' });
  });
  // the -1 spot under the bottom cell
  const yM1 = skCellY(-1);
  b += sT(SKX - 14, yM1 + 24, '-1', { mono: true, size: 13, w: 600, anchor: 'end', fill: '#8a9799' });
  b += `<line x1="${SKX}" y1="${yM1 + 18}" x2="${SKX + SKW}" y2="${yM1 + 18}" stroke="#9aa8aa" stroke-width="1.6" stroke-dasharray="3 4"/>`;
  // top pointer
  const py = top >= 0 ? skCellY(top) + SKH / 2 : yM1 + 18;
  b += solidArrow(SKX + SKW + 58, py, SKX + SKW + 6, py, '#e8662e');
  b += sT(SKX + SKW + 64, py - 3, 'top', { mono: true, size: 14, w: 700, anchor: 'start', fill: '#b4461a' });
  b += sT(SKX + SKW + 64, py + 15, `= ${top}`, { mono: true, size: 13, w: 700, anchor: 'start', fill: '#b4461a' });
  if (o.note) b += sT(170, 234, o.note, { size: 12.5, w: 800, fill: '#4f5f62' });
  // footer: stack contents + returned value
  const items = cells.slice(0, top + 1);
  b += sT(14, 268, o.foot ?? `stack (bottom → top): ${items.length ? items.join(', ') : 'empty'}`, { size: 12.5, w: 800, anchor: 'start', fill: '#0b544e' });
  if (o.ret != null) b += mapBox(214, 250, 116, 28, '#fbdccc', '#e8662e', 1.8, 6) + sT(272, 269, `returns ${o.ret}`, { mono: true, size: 13, w: 700, fill: '#b4461a' });
  if (o.err) b += mapBox(80, 216, 180, 28, '#fbe3e1', '#b23a33', 1.8, 6) + sT(170, 235, 'IllegalStateException', { mono: true, size: 12, w: 700, fill: '#b23a33' });
  return introPic(340, 286, o.alt || 'The stack array drawn as a column.', b);
}

export const stackWalkCode = String.raw`void push(int value) {
  if (isFull()) {
    throw new IllegalStateException("Stack overflow: full.");
  }
  top++;                 // 1. move top up one cell
  data[top] = value;     // 2. store the value there
}

int pop() {
  if (isEmpty()) {
    throw new IllegalStateException("Stack underflow: empty.");
  }
  int value = data[top]; // 1. save the top value
  top--;                 // 2. move top down one cell
  return value;
}

int peek() {
  if (isEmpty()) {
    throw new IllegalStateException("Stack underflow: empty.");
  }
  return data[top];      // look only; top does not change
}`;

/** CodeWalk steps on a new ArrayStack(3): push(4), push(9), pop(), peek(), push(2), push(7), push(8) (overflow). */
export function stackWalkSteps() {
  const c = (t) => `<code>${t}</code>`;
  return [
    { lines: [1], pic: stackPic([0, 0, 0], -1, { alt: 'A new stack: top is -1. All three cells hold 0, but all are above top, so the stack is empty.' }), vars: [['value', '= 4'], ['top', '= -1']],
      say: `The stack was just made with ${c('new ArrayStack(3)')}, so ${c('top')} is -1: empty. The three cells hold Java's default 0, but they are all <b>above top</b> (dashed), so none of them is part of the stack. Now ${c('s.push(4)')} runs.` },
    { lines: [5, 6], pic: stackPic([4, 0, 0], 0, { kinds: { 0: 'hot' }, alt: 'push 4: top moved from -1 to 0, and 4 is stored in cell 0.' }), vars: [['top', '= 0'], ['data[0]', '= 4']],
      say: `${c('isFull()')} is false (-1 is not 2), so the two steps run. ${c('top++;')} moves ${c('top')} from -1 to <b>0</b>, then ${c('data[top] = value;')} stores 4 in cell 0. This is why ${c('top')} starts at -1: one step up lands on the first cell.` },
    { lines: [1], pic: stackPic([4, 0, 0], 0, { alt: 'The stack holds 4 in cell 0; top is 0. Cells 1 and 2 hold 0 but are not part of the stack.' }), vars: [['value', '= 9'], ['top', '= 0']],
      say: `Now ${c('s.push(9)')} runs. The stack is 4. Cells 1 and 2 still hold 0, but they are <b>above top</b> (dashed), so they are not part of the stack.` },
    { lines: [2], pic: stackPic([4, 0, 0], 0, { alt: 'isFull: top 0 is not the last index 2.' }), vars: [['top', '= 0'], ['data.length - 1', '= 2']],
      say: `${c('isFull()')} checks ${c('top == data.length - 1')}: is 0 equal to 2? <b>No</b>, there is room, so the ${c('throw')} line is skipped.` },
    { lines: [5], pic: stackPic([4, 0, 0], 1, { kinds: { 1: 'seen' }, foot: 'halfway through push: 9 is not stored yet', alt: 'top moved up to 1. Cell 1 still holds 0.' }), vars: [['top', '= 1']],
      say: `<b>Step 1:</b> ${c('top++;')} moves ${c('top')} up one cell, to 1. Cell 1 is now the top spot, but it still holds the old 0.` },
    { lines: [6], pic: stackPic([4, 9, 0], 1, { kinds: { 1: 'hot' }, alt: '9 stored in cell 1. Stack: 4, 9.' }), vars: [['data[1]', '= 9']],
      say: `<b>Step 2:</b> ${c('data[top] = value;')} stores 9 in cell 1. The stack is now <b>4, 9</b>, and size is ${c('top + 1')} = 2.` },
    { lines: [9, 10], pic: stackPic([4, 9, 0], 1, { alt: 'pop is called. top is 1, so the stack is not empty.' }), vars: [['top', '= 1']],
      say: `Now ${c('s.pop()')} runs. ${c('isEmpty()')} checks ${c('top == -1')}: is 1 equal to -1? <b>No</b>, so there is something to pop.` },
    { lines: [13], pic: stackPic([4, 9, 0], 1, { kinds: { 1: 'seen' }, alt: 'value saves 9 from cell 1.' }), vars: [['value', '= 9']],
      say: `<b>Step 1:</b> ${c('int value = data[top];')} saves 9, the top item, in ${c('value')}. Nothing has changed in the array yet.` },
    { lines: [14], pic: stackPic([4, 9, 0], 0, { note: '9 is still in cell 1, but it is above top', alt: 'top moved down to 0. 9 is still in cell 1 but above top, so it is not in the stack.' }), vars: [['top', '= 0']],
      say: `<b>Step 2:</b> ${c('top--;')} moves ${c('top')} down to 0. The 9 is <b>still in cell 1</b>, but it is above ${c('top')}, so it is not part of the stack any more.` },
    { lines: [15], pic: stackPic([4, 9, 0], 0, { ret: 9, alt: 'pop returns 9. The stack is 4.' }), vars: [['returns', '9']],
      say: `${c('return value;')} sends 9 back. The stack is <b>4</b>. (If the program does not print or store the 9, it is still removed.)` },
    { lines: [18, 22], pic: stackPic([4, 9, 0], 0, { kinds: { 0: 'seen' }, ret: 4, alt: 'peek returns 4 from cell 0. top stays 0.' }), vars: [['top', '= 0 (same)']],
      say: `${c('s.peek()')}: the stack is not empty, so ${c('return data[top];')} sends back 4. There is no ${c('top--')}, so <b>nothing changes</b>. That is the whole difference from ${c('pop')}.` },
    { lines: [5, 6], pic: stackPic([4, 2, 0], 1, { kinds: { 1: 'hot' }, alt: 'push 2: top 1, 2 written over the old 9.' }), vars: [['top', '= 1'], ['data[1]', '= 2']],
      say: `${c('s.push(2)')}: there is room, so ${c('top++')} makes top 1, and 2 is stored in cell 1, <b>writing over the old 9</b>. The stack is 4, 2.` },
    { lines: [5, 6], pic: stackPic([4, 2, 7], 2, { kinds: { 2: 'hot' }, alt: 'push 7: top 2, the stack is full.' }), vars: [['top', '= 2']],
      say: `${c('s.push(7)')}: top becomes 2 and 7 goes in cell 2, the last cell. The stack is 4, 2, 7, and it is <b>full</b>: ${c('top == data.length - 1')} is now true.` },
    { lines: [2, 3], pic: stackPic([4, 2, 7], 2, { err: true, alt: 'push 8 on a full stack: isFull is true, so push throws an IllegalStateException.' }), vars: [['top', '= 2'], ['data.length - 1', '= 2']],
      say: `${c('s.push(8)')}: ${c('isFull()')} is <b>true</b>, so line 3 throws the exception <b>"Stack overflow: full."</b> and push stops. Nothing changes: no cell 3 exists to write into.` },
  ];
}

/* Queue walkthrough pictures: nodes in the linked-lists style (rBox), front / rear / newNode labels. */
const QX = [44, 186];
function qLabels(x, y, names) {
  // names: [[text, color, arrowKey]], stacked upward from the node
  return names.map(([n, fill], i) => sT(x + R.D / 2, y - 28 - i * 18, n, { mono: true, size: 13.5, w: 700, fill })).join('') +
    (names.length ? rArrow(`M${x + R.D / 2} ${y - 22} V${y - 3}`, names[0][2], 2) : '');
}
const QF = ['front', '#0b544e', 't'], QR = ['rear', '#1b2a2e', 'k'], QN = ['newNode', '#b4461a', 'o'];
function queuePic(st, alt) {
  // st: { nodes: [{ v, i, lost, fill }], link: bool, front: i|null, rear: i|null, nn: i|null, nullF, nullR, gone: i, note }
  const y = 84;
  let b = '';
  for (const n of st.nodes) {
    const x = QX[n.i], names = [];
    if (st.front === n.i) names.push(QF);
    if (st.rear === n.i) names.push(QR);
    if (st.nn === n.i) names.push(QN);
    b += qLabels(x, y, names);
    b += rBox(x, y, String(n.v), { fill: n.fill, lost: n.lost });
  }
  const has = (i) => st.nodes.some((n) => n.i === i);
  if (st.link) b += rLink(QX[0], QX[1], y, st.linkNew ? 'o' : 'k', { w: st.linkNew ? 3 : 2.2 });
  for (const n of st.nodes) if (!(st.link && n.i === 0)) b += rNullDown(QX[n.i], y);
  if (st.gone != null) b += sT(QX[st.gone] + rW / 2, y + R.H + 56, 'left the queue', { size: 11.5, w: 800, fill: '#b23a33' });
  // null references written on the right
  let ny = 40;
  if (st.front === null) { b += sT(330, ny, 'front = null', { mono: true, size: 13, w: 700, anchor: 'end', fill: '#b23a33' }); ny += 20; }
  if (st.rear === null) { b += sT(330, ny, 'rear = null', { mono: true, size: 13, w: 700, anchor: 'end', fill: '#b23a33' }); ny += 20; }
  if (!has(0) && !has(1) && st.front === null && st.rear === null) b += sT(170, 120, '(no nodes)', { size: 13, w: 700, fill: '#8a9799', it: true });
  if (st.note) b += mapBox(10, 186, 320, 30, st.noteBad ? '#fbe3e1' : '#fff8e6', st.noteBad ? '#b23a33' : '#c98a12', 1.8, 6) + sT(170, 206, st.note, { size: 12.5, w: 800, fill: st.noteBad ? '#b23a33' : '#7a5208' });
  if (st.ret != null) b += mapBox(10, 186, 116, 28, '#fbdccc', '#e8662e', 1.8, 6) + sT(68, 205, `returns ${st.ret}`, { mono: true, size: 13, w: 700, fill: '#b4461a' });
  return rPic(340, 224, alt, b);
}

export const queueWalkCode = String.raw`void enqueue(int value) {
  Node newNode = new Node(value);
  if (isEmpty()) {
    front = newNode;       // the only node is both
    rear = newNode;        // the front and the rear
  } else {
    rear.next = newNode;   // 1. old rear refers to new node
    rear = newNode;        // 2. rear refers to the new node
  }
  count++;
}

int dequeue() {
  if (isEmpty()) {
    throw new IllegalStateException("Queue underflow: empty.");
  }
  int value = front.data;  // 1. save the front value
  front = front.next;      // 2. front moves to the next node
  if (front == null) {     // 3. the queue became empty,
    rear = null;           //    so rear must be cleared too
  }
  count--;
  return value;
}`;

/** CodeWalk steps: empty queue, enqueue(7), enqueue(8), dequeue(), dequeue() (module Figure 6.2). */
export function queueWalkSteps() {
  const c = (t) => `<code>${t}</code>`;
  const N7 = { v: 7, i: 0 }, N8 = { v: 8, i: 1 };
  const new7 = { ...N7, fill: '#fbdccc' }, new8 = { ...N8, fill: '#fbdccc' }, lost7 = { ...N7, lost: true }, lost8 = { ...N8, lost: true };
  return [
    { lines: [2], pic: queuePic({ nodes: [new7], front: null, rear: null, nn: 0 }, 'An empty queue: front and rear are null. A new node 7 is made; newNode refers to it.'), vars: [['count', '= 0']],
      say: `The queue starts empty: ${c('front')} and ${c('rear')} are ${c('null')}. ${c('enqueue(7)')} first makes a new node holding 7. ${c('newNode')} refers to it; its ${c('next')} is ${c('null')}.` },
    { lines: [3], pic: queuePic({ nodes: [new7], front: null, rear: null, nn: 0 }, 'isEmpty is true because front is null.'), vars: [['isEmpty()', 'true']],
      say: `${c('isEmpty()')} checks ${c('front == null')}: <b>true</b>, so the first branch runs.` },
    { lines: [4], pic: queuePic({ nodes: [new7], front: 0, rear: null, nn: 0 }, 'front now refers to node 7.'), vars: [['front', '→ 7']],
      say: `${c('front = newNode;')} The new node is the front: it will leave next.` },
    { lines: [5], pic: queuePic({ nodes: [new7], front: 0, rear: 0, nn: 0 }, 'rear also refers to node 7.'), vars: [['rear', '→ 7']],
      say: `${c('rear = newNode;')} It is also the rear: the one that joined last. With one node, <b>front and rear refer to the same node</b>.` },
    { lines: [10], pic: queuePic({ nodes: [N7], front: 0, rear: 0 }, 'count is 1. The queue is 7.'), vars: [['count', '= 1']],
      say: `${c('count++;')} The queue is <b>7</b>, and ${c('count')} is 1.` },
    { lines: [2, 3], pic: queuePic({ nodes: [N7, new8], front: 0, rear: 0, nn: 1 }, 'enqueue 8: a new node 8. front is not null, so the else branch runs.'), vars: [['isEmpty()', 'false']],
      say: `${c('enqueue(8)')}: a new node holding 8 is made. ${c('front')} is not ${c('null')}, so ${c('isEmpty()')} is <b>false</b> and the ${c('else')} branch runs.` },
    { lines: [7], pic: queuePic({ nodes: [N7, new8], front: 0, rear: 0, nn: 1, link: true, linkNew: true }, 'The old rear, node 7, now points to node 8.'), vars: [['rear.next', '→ 8']],
      say: `<b>Step 1:</b> ${c('rear.next = newNode;')} The old rear (7) now points to 8 (orange arrow). 8 is connected behind 7.` },
    { lines: [8, 10], pic: queuePic({ nodes: [N7, N8], front: 0, rear: 1, link: true }, 'rear moved to node 8. The queue is 7, 8.'), vars: [['rear', '→ 8'], ['count', '= 2']],
      say: `<b>Step 2:</b> ${c('rear = newNode;')} moves ${c('rear')} to 8, the new last node, and ${c('count++')} makes 2. The queue is <b>7, 8</b> (front to rear).` },
    { lines: [14, 17], pic: queuePic({ nodes: [{ ...N7, fill: '#d7ece9' }, N8], front: 0, rear: 1, link: true }, 'dequeue: the queue is not empty; value saves 7.'), vars: [['value', '= 7']],
      say: `${c('dequeue()')}: the queue is not empty. <b>Step 1:</b> ${c('int value = front.data;')} saves 7, the front value.` },
    { lines: [18], pic: queuePic({ nodes: [lost7, N8], front: 1, rear: 1, link: true, gone: 0 }, 'front moved to node 8. Node 7 has left the queue.'), vars: [['front', '→ 8']],
      say: `<b>Step 2:</b> ${c('front = front.next;')} moves ${c('front')} to 8. Node 7 is no longer reachable from ${c('front')}: it has <b>left the queue</b> (red dashed).` },
    { lines: [19, 22, 23], pic: queuePic({ nodes: [N8], front: 1, rear: 1, ret: 7 }, 'front is not null, so rear stays. dequeue returns 7. The queue is 8.'), vars: [['count', '= 1'], ['returns', '7']],
      say: `${c('front')} is not ${c('null')}, so the ${c('if')} is skipped and ${c('rear')} stays on 8. ${c('count')} becomes 1, and 7 is returned. The queue is <b>8</b>.` },
    { lines: [17], pic: queuePic({ nodes: [{ ...N8, fill: '#d7ece9' }], front: 1, rear: 1 }, 'dequeue again: value saves 8.'), vars: [['value', '= 8']],
      say: `${c('dequeue()')} again. ${c('value')} saves 8, the front value.` },
    { lines: [18], pic: queuePic({ nodes: [lost8], front: null, rear: 1, gone: 1, note: 'front says empty, but rear still refers to 8!', noteBad: true }, 'front is now null, but rear still refers to node 8, which has left the queue.'), vars: [['front', '= null']],
      say: `${c('front = front.next;')} Node 8's ${c('next')} is ${c('null')}, so ${c('front')} becomes ${c('null')}. But ${c('rear')} <b>still refers to node 8</b>, which has left the queue. The two disagree.` },
    { lines: [19, 20], pic: queuePic({ nodes: [], front: null, rear: null }, 'front is null, so rear is set to null too. Both are null.'), vars: [['rear', '= null']],
      say: `<b>Step 3:</b> ${c('front == null')} is <b>true</b>, so ${c('rear = null;')} runs. Now both say the queue is empty.` },
    { lines: [22, 23], pic: queuePic({ nodes: [], front: null, rear: null, ret: 8 }, 'count is 0, and dequeue returns 8. The queue is empty.'), vars: [['count', '= 0'], ['returns', '8']],
      say: `${c('count--')} makes 0, and 8 is returned. The queue is <b>empty</b>, just like at the start.` },
  ];
}


/* ---- Stacks (chat 18): her four picture requests (definition, rule on an array, underflow/overflow, where you see LIFO) ---- */

/** Clean: the definition. A, B, C, D pushed into a column with ONE open end; in-order vs out-order. */
export function stkDefPic() {
  const X = 128, W = 84, H = 42, Y0 = 246; // item i (0 = A, bottom) top edge = Y0 - i * 46
  let b = sT(170, 26, 'A, B, C, D were pushed in that order', { size: 15, w: 800, fill: '#0b544e' });
  b += solidArrow(150, 42, 150, 96, '#0e6b63') + sT(142, 66, 'push', { mono: true, size: 14, w: 700, anchor: 'end', fill: '#0e6b63' });
  b += solidArrow(190, 96, 190, 42, '#e8662e') + sT(198, 66, 'pop', { mono: true, size: 14, w: 700, anchor: 'start', fill: '#b4461a' });
  b += sT(X + W + 14, 98, 'open end', { size: 12.5, w: 800, anchor: 'start', fill: '#4f5f62' });
  b += `<path d="M${X - 4} 100 V${Y0 + H + 4} H${X + W + 4} V100" fill="none" stroke="#1b2a2e" stroke-width="3" stroke-linejoin="round"/>`;
  const ins = ['1st', '2nd', '3rd', '4th'], outs = ['4th', '3rd', '2nd', '1st'];
  ['A', 'B', 'C', 'D'].forEach((v, i) => {
    const y = Y0 - i * 46, isTop = i === 3;
    b += mapBox(X, y, W, H, isTop ? '#fbdccc' : '#ffffff', isTop ? '#e8662e' : '#1b2a2e', 2, 4);
    b += sT(X + W / 2, y + 28, v, { mono: true, size: 18, w: 700, fill: isTop ? '#b4461a' : '#1b2a2e' });
    b += sT(X - 16, y + 27, `in: ${ins[i]}`, { size: 13, w: 800, anchor: 'end', fill: '#0e6b63' });
    if (isTop) {
      b += sT(X + W + 16, y + 19, 'top', { mono: true, size: 14, w: 700, anchor: 'start', fill: '#b4461a' });
      b += sT(X + W + 16, y + 37, `out: ${outs[i]}`, { size: 13, w: 800, anchor: 'start', fill: '#b4461a' });
    } else b += sT(X + W + 16, y + 27, `out: ${outs[i]}`, { size: 13, w: 800, anchor: 'start', fill: '#b4461a' });
  });
  b += sT(170, 314, 'closed bottom: nothing goes in or out here', { size: 12.5, w: 700, fill: '#4f5f62' });
  b += sT(170, 336, 'Last in (D) is the first out.', { size: 14, w: 800, fill: '#b4461a' });
  return introPic(340, 346, 'A stack drawn as a column with one open end at the top and a closed bottom. A, B, C, D were pushed in that order, so A is at the bottom and D is the top. push puts an item in through the open top, and pop takes the top item out. On the left, the order they went in: A 1st, B 2nd, C 3rd, D 4th. On the right, the order pop takes them out: D 1st, C 2nd, B 3rd, A 4th. Last in, first out.', b);
}

/** Clean: a stack is a RULE on an array. Top: any index. Bottom: the same cells as a column; only the top end is used. */
export function stkRulePic() {
  const pan = (y, h, fill, line) => `<rect x="8" y="${y}" width="324" height="${h}" rx="10" fill="${fill}" stroke="${line}" stroke-width="1.5"/>`;
  const vals = [4, 9, 2, 0, 0];
  let b = pan(8, 152, '#ffffff', '#c9d6d4') + sT(22, 34, 'An ordinary array: any cell', { size: 15, w: 800, fill: '#0b544e', anchor: 'start' });
  vals.forEach((v, i) => {
    const x = 36 + i * 54;
    b += solidArrow(x + 27, 50, x + 27, 72, '#37474a', 2);
    b += mapBox(x, 76, 54, 40, '#ffffff', '#1b2a2e', 2, 0) + sT(x + 27, 102, v, { mono: true, size: 16, w: 700 });
    b += sT(x + 27, 132, i, { mono: true, size: 13, w: 600, fill: '#37474a' });
  });
  b += sT(170, 152, 'You may read or change any index, like data[3].', { size: 12.5, w: 700, fill: '#37474a' });
  // the same cells, with the stack rule
  b += pan(168, 280, '#fdf1ea', '#f0c2a8') + sT(22, 194, 'ArrayStack: the same array + top', { size: 15, w: 800, fill: '#b4461a', anchor: 'start' });
  b += sT(22, 213, 'turned up as a column: index 0 at the bottom', { size: 12.5, w: 700, fill: '#4f5f62', anchor: 'start' });
  const CX = 96, CW = 70, CH = 38, cy = (i) => 374 - i * CH; // cell i top edge
  vals.forEach((v, i) => {
    const y = cy(i), off = i > 2, isTop = i === 2;
    b += `<rect x="${CX}" y="${y}" width="${CW}" height="${CH}" fill="${off ? '#eef2f2' : isTop ? '#fbdccc' : '#ffffff'}" stroke="${off ? '#9aa8aa' : isTop ? '#e8662e' : '#1b2a2e'}" stroke-width="2"${off ? ' stroke-dasharray="5 4"' : ''}/>`;
    b += sT(CX + CW / 2, y + 25, v, { mono: true, size: 16, w: 700, fill: off ? '#8a9799' : isTop ? '#b4461a' : '#1b2a2e' });
    b += sT(CX - 12, y + 25, i, { mono: true, size: 13, w: 600, anchor: 'end', fill: '#37474a' });
  });
  b += solidArrow(206, cy(3) + 19, CX + CW + 6, cy(3) + 19, '#0e6b63') + sT(212, cy(3) + 24, 'push puts it here', { size: 13, w: 800, anchor: 'start', fill: '#0e6b63' });
  b += solidArrow(206, cy(2) + 19, CX + CW + 6, cy(2) + 19, '#e8662e') + sT(212, cy(2) + 15, 'top = 2:', { size: 13, w: 800, anchor: 'start', fill: '#b4461a' }) + sT(212, cy(2) + 32, 'pop and peek', { size: 13, w: 800, anchor: 'start', fill: '#b4461a' });
  const by1 = cy(1) + 4, by2 = cy(0) + CH - 4;
  b += `<path d="M${CX + CW + 8} ${by1} H${CX + CW + 16} V${by2} H${CX + CW + 8}" fill="none" stroke="#b23a33" stroke-width="2" stroke-linejoin="round"/>`;
  b += sT(196, by1 + 18, 'hands off:', { size: 13, w: 800, anchor: 'start', fill: '#b23a33' }) + sT(196, by1 + 36, 'no reaching into', { size: 13, w: 700, anchor: 'start', fill: '#b23a33' }) + sT(196, by1 + 54, 'the middle', { size: 13, w: 700, anchor: 'start', fill: '#b23a33' });
  b += sT(170, 436, 'Same cells. The rule decides what you may do.', { size: 13, w: 800, fill: '#1b2a2e' });
  return introPic(340, 456, 'Top panel: an array with five cells holding 4, 9, 2, 0, 0 at indexes 0 to 4. Arrows point into every cell: you may read or change any index. Bottom panel: ArrayStack, the same array with top and the stack rule, turned up as a column with index 0 at the bottom. 4, 9, 2 are the stack and top is 2, the index of the top item, used by pop and peek. push puts a new item in cell 3, the next cell up. Cells 3 and 4 are dashed because they are above the top. Cells 0 and 1 are hands off: no reaching into the middle. Same cells; the rule decides what you may do.', b);
}

/** Sketch: underflow (empty shelf, nothing to pop) and overflow (shelf full to the top, no room to push). */
export function stkFlowPic() {
  const s = new Sketch(340, 412, 618);
  const plate = (cx, cy, o = {}) => {
    s.ellipse(cx, cy, o.w ?? 112, 20, { fill: o.fill ?? C.card, sw: 1.6, stroke: o.stroke ?? C.ink, ...(o.dash ? { dash: o.dash, single: true } : {}) });
    if (!o.dash) s.ellipse(cx, cy - 1, (o.w ?? 112) * 0.6, 9, { fill: C.sky, sw: 1, single: true });
  };
  const shelf = (y0) => {
    s.rect(36, y0 + 44, 156, 112, { fill: '#fff7e6', sw: 2.2, rough: 0.7 });
    s.line(30, y0 + 156, 198, y0 + 156, { sw: 3.2, rough: 0.5 });
  };
  // Underflow
  s.round(6, 6, 328, 196, 10, { fill: '#fffdf8', sw: 1.2, stroke: '#d9cbb4', rough: 0.5 });
  s.text(18, 32, 'Underflow: the stack is empty', { font: 'body', size: 15, weight: 800, anchor: 'start', color: C.red });
  shelf(6);
  plate(114, 142, { dash: '5 4', stroke: '#9aa8aa', fill: 'none' });
  s.text(114, 118, 'no plates left', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.curve(178, 128, 250, 84, -20, { stroke: C.orange, sw: 2.2, single: true, dash: '6 5' });
  s.text(272, 66, 'pop()', { font: 'mono', size: 15, weight: 700, color: C.orange });
  s.text(272, 112, 'Nothing', { font: 'body', size: 14, weight: 800, color: C.red });
  s.text(272, 130, 'to take!', { font: 'body', size: 14, weight: 800, color: C.red });
  s.text(18, 188, 'In code: pop() or peek() when top == -1', { font: 'body', size: 13, weight: 800, anchor: 'start', color: C.soft });
  // Overflow
  const y0 = 210;
  s.round(6, y0, 328, 196, 10, { fill: '#fffdf8', sw: 1.2, stroke: '#d9cbb4', rough: 0.5 });
  s.text(18, y0 + 26, 'Overflow: the stack is full', { font: 'body', size: 15, weight: 800, anchor: 'start', color: C.red });
  shelf(y0);
  [y0 + 144, y0 + 128, y0 + 112, y0 + 96, y0 + 80, y0 + 64].forEach((y) => plate(114, y));
  plate(272, y0 + 76, { w: 96, fill: C.tealWash });
  s.text(272, y0 + 52, 'push(x)', { font: 'mono', size: 15, weight: 700, color: C.teal });
  s.arrow(232, y0 + 98, 200, y0 + 108, { stroke: C.teal, sw: 2.2, single: true, dash: '6 5' });
  s.text(272, y0 + 118, 'No room!', { font: 'body', size: 14, weight: 800, color: C.red });
  s.text(272, y0 + 140, 'the shelf has a', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(272, y0 + 157, 'fixed size', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(18, y0 + 182, 'In code: push(x) when top == data.length - 1', { font: 'body', size: 13, weight: 800, anchor: 'start', color: C.soft });
  return s.svg('Two panels. Top, underflow: an empty shelf with no plates left; trying to pop gets nothing to take. In code: pop or peek when top is -1. Bottom, overflow: the shelf is full of plates up to the shelf above; a new plate for push does not fit: no room. In code: push when top equals data.length minus 1.').replace(/(\d+\.\d)\d+/g, '$1');
}

/** Sketch: three places LIFO fits: Undo, the Back button, reversing the word MATI. */
export function stkLifoPic() {
  const s = new Sketch(340, 562, 731);
  const pan = (y, h, title, sub) => {
    s.round(6, y, 328, h, 10, { fill: '#fffdf8', sw: 1.2, stroke: '#d9cbb4', rough: 0.5 });
    s.text(18, y + 26, title, { font: 'body', size: 15, weight: 800, anchor: 'start', color: C.teal });
    s.text(18, y + 45, sub, { font: 'body', size: 12.5, weight: 700, anchor: 'start', color: C.soft });
  };
  const card = (x, y, w, t, top) => {
    s.round(x, y, w, 28, 5, { fill: top ? C.orangeWash : C.card, sw: 1.6, stroke: top ? C.orange : C.ink });
    s.text(x + w / 2, y + 19, t, { font: 'body', size: 13, weight: 800, color: top ? '#b4461a' : C.ink });
  };
  // 1. Undo
  pan(6, 168, 'Undo', 'Each change is pushed. Undo pops the newest one.');
  card(20, 128, 150, 'typed "Hello"');
  card(20, 96, 150, 'made it bold');
  card(20, 64, 150, 'deleted a line', true);
  s.round(230, 70, 88, 36, 8, { fill: C.butter, sw: 1.8 });
  s.text(274, 94, 'Undo', { font: 'body', size: 15, weight: 800 });
  s.arrow(176, 78, 222, 86, { stroke: C.orange, sw: 2.2 });
  s.text(274, 128, 'brings back', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(274, 146, 'the deleted line', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  // 2. Back button
  pan(182, 190, 'The Back button', 'Each page you open is pushed. Back pops it.');
  card(20, 336, 150, 'search results');
  card(20, 304, 150, 'DOrSU website');
  card(20, 272, 150, 'ITC 120 page');
  card(20, 240, 150, 'Stacks lesson', true);
  s.round(230, 246, 88, 36, 8, { fill: C.butter, sw: 1.8 });
  s.path('M246 264 L256 256 L256 272 Z', { fill: C.ink, sw: 1.2 });
  s.text(284, 270, 'Back', { font: 'body', size: 15, weight: 800 });
  s.arrow(176, 254, 222, 262, { stroke: C.orange, sw: 2.2 });
  s.text(274, 304, 'You are back', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  s.text(274, 322, 'on ITC 120 page', { font: 'body', size: 12.5, weight: 700, color: C.soft });
  // 3. Reversing a word
  pan(380, 176, 'Reversing a word', 'Push the letters of MATI, then pop them all.');
  s.text(66, 478, 'M A T I', { font: 'mono', size: 19, weight: 700 });
  s.text(66, 500, 'push M, A, T, I', { font: 'body', size: 12.5, weight: 700, color: C.teal });
  ['M', 'A', 'T', 'I'].forEach((v, i) => {
    const y = 522 - i * 26, top = i === 3;
    s.rect(150, y, 40, 24, { fill: top ? C.orangeWash : C.card, sw: 1.6, stroke: top ? C.orange : C.ink });
    s.text(170, y + 18, v, { font: 'mono', size: 15, weight: 700, color: top ? '#b4461a' : C.ink });
  });
  s.curve(100, 458, 146, 452, -14, { stroke: C.teal, sw: 2.2 });
  s.curve(194, 452, 240, 458, -14, { stroke: C.orange, sw: 2.2 });
  s.text(276, 478, 'I T A M', { font: 'mono', size: 19, weight: 700, color: '#b4461a' });
  s.text(276, 500, 'pop 4 times', { font: 'body', size: 12.5, weight: 700, color: '#b4461a' });
  s.text(276, 520, 'reversed!', { font: 'body', size: 12.5, weight: 800, color: C.soft });
  return s.svg('Three places where the newest item comes out first. Undo: three changes are piled up: typed Hello, made it bold, deleted a line on top. Undo takes the top one first, so the deleted line comes back. The Back button: pages piled up: search results, DOrSU website, ITC 120 page, and the Stacks lesson on top. Back takes the top page off, so you are back on the ITC 120 page. Reversing a word: push the letters M, A, T, I, then pop four times: they come out I, T, A, M, the word reversed.').replace(/(\d+\.\d)\d+/g, '$1');
}
