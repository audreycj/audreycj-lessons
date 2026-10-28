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
