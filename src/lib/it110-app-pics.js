// IT 110 Application software pictures (chat 42). Same style as it110-os-pics.js: clean SVG strings;
// the page wraps real-world scenes in roughen() for the hand-drawn look, and keeps mechanism pictures clean.
// No logos or real app artwork: generic symbols only.
import { B, T, R, ARROW, svgWrap } from './it110-illus.js';
import { L, C, P, phone, laptop3, appIcon, tapHand, person } from './it110-os-pics.js';

/* ---------- small helpers ---------- */
/** App icon with more symbols than appIcon: pay, photo, class, video, map (falls back to appIcon). */
function icon(x, y, sz, kind, f) {
  const base = ['chat', 'music', 'doc', 'game'];
  if (base.includes(kind)) return appIcon(x, y, sz, kind, f);
  let b = R(x, y, sz, sz, { r: sz * 0.24, f, sw: 1.5 });
  const cx = x + sz / 2, cy = y + sz / 2, u = sz / 30;
  if (kind === 'pay') b += T(cx, cy + 7 * u, '₱', { size: 19 * u, c: '#fff', w: 900 });
  if (kind === 'photo') b += P(`M${cx - 10 * u} ${cy + 8 * u} L${cx - 3 * u} ${cy - 2 * u} L${cx + 2 * u} ${cy + 4 * u} L${cx + 5 * u} ${cy} L${cx + 10 * u} ${cy + 8 * u} Z`, '#fff', '#fff', 1) + `<circle cx="${cx + 5 * u}" cy="${cy - 7 * u}" r="${2.6 * u}" fill="#fff"/>`;
  if (kind === 'class') b += P(`M${cx - 11 * u} ${cy - 2 * u} L${cx} ${cy - 8 * u} L${cx + 11 * u} ${cy - 2 * u} L${cx} ${cy + 4 * u} Z`, '#fff', '#fff', 1) + P(`M${cx - 6 * u} ${cy + 1 * u} V${cy + 7 * u} Q${cx} ${cy + 11 * u} ${cx + 6 * u} ${cy + 7 * u} V${cy + 1 * u}`, '#fff', '#fff', 1);
  if (kind === 'video') b += P(`M${cx - 5 * u} ${cy - 8 * u} L${cx + 8 * u} ${cy} L${cx - 5 * u} ${cy + 8 * u} Z`, '#fff', '#fff', 1);
  if (kind === 'map') b += P(`M${cx} ${cy + 10 * u} Q${cx - 9 * u} ${cy - 1 * u} ${cx - 7 * u} ${cy - 5 * u} A7.5 7.5 0 1 1 ${cx + 7 * u} ${cy - 5 * u} Q${cx + 9 * u} ${cy - 1 * u} ${cx} ${cy + 10 * u} Z`, '#fff', '#fff', 1) + `<circle cx="${cx}" cy="${cy - 4 * u}" r="${2.6 * u}" fill="${f}"/>`;
  return b;
}
/** Padlock centered at (x, y) (top of the body); open = shackle lifted. */
const lock = (x, y, open = false, f = B.amber) =>
  P(open ? `M${x - 8} ${y - 6} V${y - 16} A8 8 0 0 1 ${x + 8} ${y - 16} V${y}` : `M${x - 8} ${y} V${y - 9} A8 8 0 0 1 ${x + 8} ${y - 9} V${y}`, 'none', B.ink, 3)
  + R(x - 13, y, 26, 20, { r: 3, f, sw: 2 }) + `<circle cx="${x}" cy="${y + 9}" r="2.6" fill="${B.ink}"/>`;
/** A document icon with a folded corner (w 30, h 38) and an extension tag. */
const doc = (x, y, f = B.card, tag = '', tf = B.blue) =>
  P(`M${x} ${y} H${x + 21} L${x + 30} ${y + 9} V${y + 38} H${x} Z`, f, B.ink, 1.8) + P(`M${x + 21} ${y} V${y + 9} H${x + 30}`, 'none', B.ink, 1.4)
  + [0, 1, 2].map((i) => L(x + 5, y + 14 + i * 6, x + 24, y + 14 + i * 6, '#9aa6b8', 1.3)).join('')
  + (tag ? R(x + 3, y + 28, 24, 9, { r: 2, f: tf, s: 'none', sw: 0 }) + T(x + 15, y + 35, tag, { size: 7, c: '#fff' }) : '');
const txt = (x, y, html, size = 13, a = 'start') => `<text x="${x}" y="${y}" font-family="Nunito, system-ui, sans-serif" font-size="${size}" font-weight="700" fill="${B.ink}" text-anchor="${a}">${html}</text>`;

/* ---------- Part 1 ---------- */
/** Small clean picture for the cloud Peek: servers inside a cloud, reached by a laptop and a phone. */
export function cloudPic() {
  let b = P('M50 70 Q30 66 34 46 Q38 28 60 32 Q66 10 94 14 Q114 2 132 18 Q156 12 166 32 Q190 32 190 54 Q194 72 172 74 Z', B.blueWash, B.ink, 2);
  [72, 102, 132].forEach((x) => { b += R(x, 30, 24, 36, { r: 2, f: B.ink, sw: 1.4 }) + [0, 1, 2].map((i) => L(x + 5, 38 + i * 9, x + 19, 38 + i * 9, B.blueMid, 1.6)).join('') + `<circle cx="${x + 19}" cy="${60}" r="1.6" fill="#7ee08a"/>`; });
  b += R(30, 112, 54, 34, { r: 3, f: B.card, sw: 1.8 }) + P('M24 148 L90 148 L86 154 L28 154 Z', B.grey, B.ink, 1.4) + R(150, 106, 26, 46, { r: 5, f: B.card, sw: 1.8 });
  b += L(68, 108, 92, 76, B.soft, 1.6, ' stroke-dasharray="4 4"') + L(160, 104, 140, 76, B.soft, 1.6, ' stroke-dasharray="4 4"');
  b += T(112, 98, 'Internet', { size: 11, w: 700, c: B.soft });
  return svgWrap(220, 160, 'A cloud with three servers inside it. A laptop and a phone connect to it over the Internet.', b);
}

export function phoneApps() {
  const kinds = [['chat', B.blue], ['pay', B.blueInk], ['photo', B.orange], ['music', B.green], ['doc', B.blue], ['game', B.red], ['class', B.green], ['video', B.orange], ['map', B.amber]];
  let inner = '';
  kinds.forEach(([k, f], i) => { inner += icon(34 + (i % 3) * 31, 34 + Math.floor(i / 3) * 40, 26, k, f); });
  let b = phone(20, 10, 112, 214, B.blueWash, inner) + tapHand(80, 87, 0.62);
  b += T(250, 26, 'Each app does one job for you', { size: 12.5, c: B.blueInk });
  [['chat', B.blue, 'Chat with friends'], ['pay', B.blueInk, 'Send money'], ['photo', B.orange, 'Edit a photo'], ['doc', B.blue, 'Write a report']].forEach(([k, f, s], i) => {
    const y = 48 + i * 44;
    b += icon(164, y, 32, k, f) + T(206, y + 21, s, { size: 13, w: 700, a: 'start' });
  });
  return svgWrap(350, 234, 'A phone full of app icons, with a finger tapping one. Each app does one job: chat with friends, send money, edit a photo, write a report.', b);
}

/* ---------- Part 2 ---------- */
export function licensePic() {
  let b = T(86, 22, 'The company keeps', { size: 13.5, c: B.blueInk }) + T(268, 22, 'You get', { size: 13.5, c: B.orangeInk });
  b += R(22, 46, 128, 96, { r: 8, f: '#1d2840', sw: 2 });
  ['#8fb0dc', '#f7dd9f', '#8fb0dc', '#c9d6ea', '#f7dd9f'].forEach((c, i) => { b += L(34 + (i % 2) * 12, 66 + i * 14, 34 + (i % 2) * 12 + [70, 54, 62, 40, 66][i], 66 + i * 14, c, 3); });
  b += lock(140, 54, false);
  b += T(86, 164, 'the program code and', { size: 12, w: 700, c: B.soft }) + T(86, 181, 'the right to sell copies', { size: 12, w: 700, c: B.soft });
  b += ARROW(160, 94, 196, 94, B.soft, 2.2) + T(178, 84, 'rules', { size: 10.5, w: 700, c: B.soft });
  b += R(204, 40, 128, 84, { r: 8, f: B.butter, sw: 2 }) + T(268, 62, 'LICENSE', { size: 13 }) + L(222, 70, 314, 70, B.ink, 1.2);
  b += T(268, 90, 'Use it on 1 computer', { size: 11, w: 700 }) + T(268, 108, 'Do not copy or resell', { size: 11, w: 700 });
  b += R(226, 140, 84, 28, { r: 14, f: B.blue, sw: 2 }) + T(268, 159, 'I agree', { size: 12.5, c: '#fff' });
  b += tapHand(304, 156, 0.5);
  b += T(175, 222, 'Tapping "I agree" = accepting the EULA', { size: 11, w: 700, c: B.soft });
  return svgWrap(350, 232, 'The company keeps the program code, locked, and the right to sell copies. You get a license card with rules: use it on one computer, do not copy or resell. Tapping I agree means you accept the EULA.', b);
}
export function ownScale() {
  const kinds = [['Commercial', '', false, 'pay', B.orangeInk], ['Shareware', '', false, 'try, then pay', B.orangeInk], ['Freeware', '', false, 'free', B.green], ['Open', 'source', true, 'free', B.green], ['Public', 'domain', true, 'free', B.green]];
  let b = T(180, 20, 'From most locked to most open', { size: 13.5, c: B.blueInk });
  b += L(24, 120, 330, 120, B.soft, 2) + ARROW(320, 120, 340, 120, B.soft, 2);
  kinds.forEach(([n1, n2, open, cost, cc], i) => {
    const x = 40 + i * 70;
    b += lock(x, 62, open, open ? B.greenWash : B.amber);
    b += T(x, 104, cost, { size: 11.5, c: cc });
    b += `<circle cx="${x}" cy="120" r="4.5" fill="${B.blue}"/>`;
    b += T(x, 142, n1, { size: 11.5 }) + (n2 ? T(x, 157, n2, { size: 11.5 }) : '');
  });
  b += T(110, 182, 'code hidden', { size: 11, w: 700, c: B.soft }) + T(285, 182, 'code open to all', { size: 11, w: 700, c: B.soft });
  b += L(18, 170, 202, 170, B.line, 1.4) + L(248, 170, 342, 170, B.line, 1.4);
  return svgWrap(360, 192, 'Five kinds of software on a line from most locked to most open. Commercial: pay, code hidden. Shareware: try, then pay. Freeware: free, code hidden. Open source: free, code open. Public domain: free, code open, no rules.', b);
}

/* ---------- Part 3 ---------- */
export function appWindow() {
  let b = R(8, 8, 244, 232, { r: 6, f: B.card, sw: 2 });
  b += `<path d="M14 8 H246 Q252 8 252 14 V32 H8 V14 Q8 8 14 8 Z" fill="${B.blue}" stroke="${B.ink}" stroke-width="2"/>` + T(118, 25, 'Report.docx - Word', { size: 11.5, c: '#fff' });
  b += L(214, 20, 222, 20, '#fff', 1.6) + R(228, 15, 8, 8, { r: 1, f: 'none', s: '#fff', sw: 1.4 }) + L(240, 15, 247, 24, '#fff', 1.6) + L(247, 15, 240, 24, '#fff', 1.6);
  [['File', 26], ['Home', 66], ['Insert', 112], ['Layout', 162]].forEach(([n, x], i) => { b += T(x, 47, n, { size: 11, c: i === 1 ? B.blue : B.soft }); });
  b += L(52, 52, 80, 52, B.blue, 3);
  b += R(8, 53, 244, 40, { r: 0, f: B.blueWash, sw: 1.4 });
  b += R(18, 60, 20, 26, { r: 3, f: B.amber, sw: 1.4 }) + R(23, 57, 10, 6, { r: 1, f: B.grey, sw: 1.2 });
  b += R(48, 59, 62, 13, { r: 2, f: B.card, sw: 1.2 }) + T(52, 69, 'Nunito  12', { size: 8.5, w: 700, a: 'start' });
  ['B', 'I', 'U'].forEach((ch, i) => { b += R(48 + i * 17, 75, 14, 14, { r: 2, f: B.card, sw: 1 }) + T(55 + i * 17, 86, ch, { size: 10 }); });
  [0, 1, 2].forEach((k) => { [0, 1, 2].forEach((j) => { b += L(124 + k * 20, 63 + j * 6, 124 + k * 20 + [14, 10, 14][j] - (k === 1 ? 0 : 0), 63 + j * 6, B.soft, 1.4); }); });
  b += R(8, 93, 244, 147, { r: 0, f: B.grey, s: 'none', sw: 0 }) + L(8, 93, 252, 93, B.ink, 1.4);
  b += R(26, 102, 150, 134, { r: 1, f: '#fff', sw: 1.2 });
  b += L(40, 118, 120, 118, B.blue, 3);
  [130, 140, 150, 160, 176, 186, 196].forEach((y, i) => { b += L(40, y, i === 3 || i === 6 ? 110 : 160, y, '#9aa6b8', 1.4); });
  b += R(135, 129, 112, 84, { r: 6, f: 'rgba(24,35,58,0.18)', s: 'none', sw: 0 });
  b += R(130, 124, 112, 84, { r: 6, f: B.card, sw: 2 }) + `<path d="M136 124 H236 Q242 124 242 130 V142 H130 V130 Q130 124 136 124 Z" fill="${B.blueWash}" stroke="${B.ink}" stroke-width="1.6"/>` + T(186, 137, 'Print', { size: 11 });
  b += T(140, 162, 'Copies: 1', { size: 10.5, w: 700, a: 'start' });
  b += R(140, 180, 44, 18, { r: 4, f: B.blue, sw: 1.2 }) + T(162, 193, 'Print', { size: 10, c: '#fff' }) + R(190, 180, 44, 18, { r: 4, f: B.card, sw: 1.2 }) + T(212, 193, 'Cancel', { size: 10 });
  const lab = (y, t1, t2, tx) => ARROW(266, y, tx, y, B.orange, 2) + T(270, y + 4, t1, { size: 12.5, a: 'start', c: B.orangeInk }) + (t2 ? T(270, y + 19, t2, { size: 10.5, w: 700, a: 'start', c: B.soft }) : '');
  b += lab(20, 'Title bar', '', 254) + lab(46, 'Tabs', '', 190) + lab(76, 'Ribbon', 'the commands', 254) + lab(150, 'Dialog box', 'asks for choices', 244) + lab(224, 'Document', 'your work', 178);
  return svgWrap(362, 248, 'A word processor window. At the top, the title bar shows the file name, Report.docx. Below it are the tabs File, Home, Insert, and Layout, and the ribbon with the commands, such as Paste, Bold, Italic, Underline, and alignment. The document page fills the middle. A small Print dialog box asks how many copies.', b);
}
export function saveCard() {
  let b = T(8, 38, 'Save', { size: 13, a: 'start', c: B.blueInk }) + T(8, 104, 'Save As', { size: 13, a: 'start', c: B.orangeInk });
  b += doc(70, 12, B.card, 'DOCX') + T(85, 64, 'Report.docx', { size: 10, w: 700 });
  b += ARROW(108, 32, 140, 32, B.soft, 2);
  b += doc(150, 12, B.card, 'DOCX') + T(165, 64, 'Report.docx', { size: 10, w: 700 }) + C(182, 12, 8, B.greenWash, B.green, 1.6) + P('M178 12 L181 15 L186 9', 'none', B.green, 2.2);
  b += T(222, 30, 'same', { size: 10.5, w: 700, c: B.soft }) + T(222, 43, 'file', { size: 10.5, w: 700, c: B.soft });
  b += doc(70, 80, B.card, 'DOCX') + T(85, 132, 'Report.docx', { size: 10, w: 700 });
  b += ARROW(108, 100, 140, 100, B.soft, 2);
  b += doc(150, 80, B.orangeWash, 'PDF', B.orange) + T(165, 132, 'Report.pdf', { size: 10, w: 700, c: B.orangeInk });
  b += T(222, 98, 'a new', { size: 10.5, w: 700, c: B.soft }) + T(222, 111, 'copy', { size: 10.5, w: 700, c: B.soft });
  return svgWrap(246, 140, 'Save: Report.docx is updated and stays the same file. Save As: Report.docx stays, and a new copy, Report.pdf, is made.', b);
}
export function clipCard() {
  const page = (x, y, word) => R(x, y, 60, 70, { r: 2, f: B.card, sw: 1.8 }) + L(x + 8, y + 14, x + 52, y + 14, '#9aa6b8', 1.3)
    + (word ? R(x + 6, y + 24, 30, 14, { r: 2, f: B.butter, s: 'none', sw: 0 }) + T(x + 21, y + 35, 'Mati', { size: 10.5 }) : '') + L(x + 8, y + 48, x + 52, y + 48, '#9aa6b8', 1.3) + L(x + 8, y + 58, x + 40, y + 58, '#9aa6b8', 1.3);
  let b = page(10, 52, true) + page(176, 52, true);
  b += R(98, 12, 50, 62, { r: 5, f: B.amber, sw: 2 }) + R(112, 6, 22, 11, { r: 3, f: B.grey, sw: 1.6 }) + R(104, 24, 38, 42, { r: 1, f: '#fff', sw: 1.2 }) + T(123, 50, 'Mati', { size: 11 });
  b += ARROW(56, 62, 94, 40, B.blue, 2.2) + T(58, 40, 'Copy', { size: 11.5, c: B.blueInk });
  b += ARROW(152, 40, 190, 62, B.orange, 2.2) + T(190, 40, 'Paste', { size: 11.5, c: B.orangeInk });
  b += T(123, 92, 'clipboard', { size: 11, w: 700, c: B.soft });
  b += T(40, 138, 'one file', { size: 10.5, w: 700, c: B.soft }) + T(206, 138, 'another file', { size: 10.5, w: 700, c: B.soft });
  return svgWrap(246, 144, 'Copy puts the word Mati on the clipboard. Paste puts it into another file. Cut works the same way, but it also removes the word from the first file.', b);
}
export function editCard() {
  const row = (y, label, lc, html) => T(8, y + 4, label, { size: 11.5, a: 'start', c: lc }) + R(84, y - 16, 156, 30, { r: 5, f: B.card, s: B.line, sw: 1.4 }) + html;
  let b = row(24, 'Original', B.soft, txt(92, 28, 'Mati is a city.'));
  b += row(72, 'Editing', B.orangeInk, txt(92, 76, `Mati is a <tspan fill="${B.orange}" font-weight="900">big</tspan> city.`));
  b += row(120, 'Formatting', B.blueInk, `<text x="92" y="126" font-family="Nunito, system-ui, sans-serif" font-size="16" font-weight="900" fill="${B.blue}">Mati is a city.</text>`);
  b += T(162, 98, 'the words changed', { size: 10, w: 700, c: B.orangeInk }) + T(162, 146, 'only the look changed', { size: 10, w: 700, c: B.blueInk });
  return svgWrap(246, 152, 'Original: Mati is a city. Editing adds the word big, so the words change. Formatting makes the same sentence bold, bigger, and blue, so only the look changes.', b);
}

/* ---------- Part 4 ---------- */
export function formatLevels() {
  let b = R(20, 12, 196, 240, { r: 2, f: B.card, sw: 2 }) + R(36, 28, 164, 206, { r: 0, f: 'none', s: B.greyInk, sw: 1, dash: '4 4' });
  b += T(118, 52, 'My Trip to Dahican', { size: 14, c: B.blue, w: 900 });
  [72, 82, 92, 102].forEach((y, i) => { b += L(44, y, i === 3 ? 130 : 192, y, '#7d889a', 1.6); });
  b += P('M196 70 C212 70 212 84 196 84', 'none', B.orange, 2) + ARROW(200, 84, 194, 84, B.orange, 2);
  [124, 140, 156].forEach((y) => { b += `<circle cx="50" cy="${y}" r="2.8" fill="${B.ink}"/>` + L(60, y, 168, y, '#7d889a', 1.6); });
  [178, 188].forEach((y, i) => { b += L(i ? 86 : 64, y, i ? 150 : 172, y, '#7d889a', 1.6); });
  b += T(118, 228, '1', { size: 11, w: 700 });
  const lab = (y, t1, t2, t3, tx, ty) => ARROW(232, ty ?? y - 4, tx, ty ?? y - 4, B.orange, 1.8) + T(236, y, t1, { size: 12.5, a: 'start', c: B.orangeInk })
    + T(236, y + 15, t2, { size: 10.5, w: 700, a: 'start', c: B.soft }) + (t3 ? T(236, y + 28, t3, { size: 10.5, w: 700, a: 'start', c: B.soft }) : '');
  b += lab(48, 'Character', 'font, size,', 'bold, color', 212, 46);
  b += lab(100, 'Word wrap', 'no Enter needed', '', 214, 78);
  b += lab(140, 'Paragraph', 'bullets, alignment,', 'spacing', 172, 140);
  b += lab(196, 'Page', 'margins, size,', 'page numbers', 202, 206);
  return svgWrap(350, 262, 'A page from a word processor. Character formatting: the title is bold, bigger, and blue. Word wrap: a long line moves to the next line by itself. Paragraph formatting: a bulleted list and a centered paragraph. Page formatting: the dashed margins and the page number.', b);
}
export function cellGrid() {
  const x0 = 38, y0 = 34, cw = 56, rh = 26, cols = ['A', 'B', 'C', 'D', 'E'];
  const vals = { 'D2': '200', 'D3': '216', 'D4': '250', 'D5': '270' };
  let b = R(x0 + cw, 8, cw, 26, { r: 0, f: B.orangeWash, s: 'none', sw: 0 }) + R(12, y0 + 3 * rh, 26, rh, { r: 0, f: B.orangeWash, s: 'none', sw: 0 });
  b += R(x0 + cw, y0 + 3 * rh, cw, rh, { r: 0, f: B.orangeWash, s: 'none', sw: 0 });
  b += R(x0 + 3 * cw, y0 + rh, cw, rh * 4, { r: 0, f: B.blueWash, s: 'none', sw: 0 });
  for (let i = 0; i <= 5; i++) b += L(x0 + i * cw, 8, x0 + i * cw, y0 + 6 * rh, B.line, 1.2);
  for (let j = 0; j <= 6; j++) b += L(12, y0 + j * rh, x0 + 5 * cw, y0 + j * rh, B.line, 1.2);
  b += L(12, 8, x0 + 5 * cw, 8, B.line, 1.2) + L(12, 8, 12, y0 + 6 * rh, B.line, 1.2);
  cols.forEach((c, i) => { b += T(x0 + i * cw + cw / 2, 26, c, { size: 13, c: i === 1 ? B.orangeInk : B.soft }); });
  for (let j = 1; j <= 6; j++) b += T(25, y0 + (j - 1) * rh + 18, String(j), { size: 12, c: j === 4 ? B.orangeInk : B.soft });
  Object.entries(vals).forEach(([a, v]) => { const j = +a.slice(1); b += T(x0 + 3 * cw + cw - 8, y0 + (j - 1) * rh + 18, v, { size: 12, w: 700, a: 'end', mono: true }); });
  b += `<rect x="${x0 + cw}" y="${y0 + 3 * rh}" width="${cw}" height="${rh}" fill="none" stroke="${B.orange}" stroke-width="3"/>` + T(x0 + cw + cw / 2, y0 + 3 * rh + 18, 'B4', { size: 13, c: B.orangeInk, mono: true });
  b += `<rect x="${x0 + 3 * cw}" y="${y0 + rh}" width="${cw}" height="${rh * 4}" fill="none" stroke="${B.blue}" stroke-width="3"/>`;
  b += T(x0 + cw + cw / 2 - 4, 210, 'Cell B4 = column B, row 4', { size: 12, c: B.orangeInk });
  b += T(x0 + 3 * cw + cw / 2 + 24, 210, 'Range D2:D5', { size: 12, c: B.blueInk });
  return svgWrap(330, 220, 'A spreadsheet grid with columns A to E and rows 1 to 6. The cell at column B, row 4 is outlined in orange and named B4. The cells D2, D3, D4, and D5 are outlined together in blue: that group is the range D2:D5.', b);
}

/* ---------- Part 5 ---------- */
export function dbShared() {
  let b = '';
  [['Registrar', 60, B.blue], ['Cashier', 175, B.orange], ['Dean', 290, B.green]].forEach(([n, x, sh]) => {
    b += person(x, 8, sh) + R(x - 26, 44, 52, 32, { r: 4, f: B.ink, sw: 1.8 }) + R(x - 22, 48, 44, 24, { r: 1, f: B.blueWash, s: 'none', sw: 0 })
      + [0, 1, 2].map((i) => L(x - 16, 54 + i * 6, x + 16, 54 + i * 6, B.blueMid, 1.4)).join('')
      + P(`M${x - 32} 78 L${x + 32} 78 L${x + 28} 84 L${x - 28} 84 Z`, B.grey, B.ink, 1.6) + T(x, 102, n, { size: 12 });
  });
  b += ARROW(80, 110, 140, 146, B.soft, 2) + ARROW(140, 146, 80, 110, B.soft, 2);
  b += ARROW(175, 110, 175, 134, B.soft, 2) + ARROW(175, 134, 175, 110, B.soft, 2);
  b += ARROW(270, 110, 210, 146, B.soft, 2) + ARROW(210, 146, 270, 110, B.soft, 2);
  b += P('M138 146 V196 A37 11 0 0 0 212 196 V146', B.blueWash, B.ink, 2) + `<ellipse cx="175" cy="146" rx="37" ry="11" fill="${B.blueMid}" stroke="${B.ink}" stroke-width="2"/>`;
  b += T(175, 176, 'Student', { size: 12, c: B.blueInk }) + T(175, 191, 'records', { size: 12, c: B.blueInk });
  b += T(175, 228, 'One database, shared by everyone at the same time', { size: 11.5, w: 700, c: B.soft });
  return svgWrap(350, 236, 'The registrar, the cashier, and the dean each use a computer connected to one database of student records. All three read and update it at the same time.', b);
}
export function slideShow() {
  let b = R(150, 12, 196, 118, { r: 3, f: B.card, sw: 2.2 }) + L(248, 130, 248, 146, B.ink, 2) + L(226, 146, 270, 146, B.ink, 2);
  b += R(160, 22, 176, 98, { r: 2, f: B.blueWash, s: 'none', sw: 0 });
  b += T(176, 46, 'Input devices', { size: 15, c: B.blueInk, a: 'start', w: 900 });
  [62, 80, 98].forEach((y, i) => { b += `<circle cx="180" cy="${y}" r="3" fill="${B.orange}"/>` + L(190, y, 190 + [56, 48, 62][i], y, B.soft, 2); });
  b += R(272, 58, 52, 34, { r: 6, f: B.card, sw: 1.6 }) + R(292, 50, 12, 10, { r: 2, f: B.grey, sw: 1.2 }) + L(298, 66, 298, 76, B.ink, 1.4);
  b += T(248, 164, 'Slide show: full screen', { size: 11.5, w: 700, c: B.soft });
  b += `<g transform="translate(70 34) scale(2)">` + person(0, 0, B.orange) + L(-5, 30, -6, 46, B.ink, 1.6) + L(5, 30, 6, 46, B.ink, 1.6) + '</g>';
  b += L(90, 72, 158, 52, B.soft, 2.2);
  b += T(70, 140, 'speaker', { size: 11.5, w: 700, c: B.soft });
  b += laptop3(24, 158, 104, R(30, 164, 56, 34, { r: 1, f: B.card, s: B.ink, sw: 1 }) + T(58, 178, 'Slide 3', { size: 8, w: 800, c: B.ink }) + R(90, 164, 32, 20, { r: 1, f: B.card, s: B.ink, sw: 1 })
    + T(106, 196, '12:04', { size: 9, w: 800, c: '#fff' }) + R(30, 202, 92, 14, { r: 1, f: B.butter, s: 'none', sw: 0 }) + L(34, 209, 110, 209, B.soft, 1.2), '#2b3650');
  b += T(150, 196, 'Presenter view:', { size: 12.5, a: 'start', c: B.orangeInk }) + T(150, 213, 'notes, the next slide,', { size: 11, w: 700, a: 'start', c: B.soft }) + T(150, 228, 'and a timer only you see', { size: 11, w: 700, a: 'start', c: B.soft });
  return svgWrap(350, 252, 'A speaker points at a projector screen showing a slide titled Input devices with three bullet points and a picture. On the speaker\'s laptop, presenter view shows the current slide, the next slide, a timer, and speaker notes that only the speaker sees.', b);
}
export function transAnim() {
  const slide = (x, y, w, h, title, f = B.card) => R(x, y, w, h, { r: 4, f, sw: 1.8 }) + L(x + 10, y + 14, x + w * 0.6, y + 14, B.blue, 3) + T(x + w / 2, y + h - 12, title, { size: 10.5, w: 700, c: B.soft });
  let b = T(12, 18, 'Transition: the effect BETWEEN slides', { size: 12.5, a: 'start', c: B.blueInk });
  b += slide(14, 30, 96, 60, 'Slide 1') + slide(186, 30, 96, 60, 'Slide 2');
  b += R(176, 36, 96, 60, { r: 4, f: 'none', s: B.blueMid, sw: 1.4, dash: '4 4' });
  b += ARROW(118, 60, 168, 60, B.blue, 2.2) + T(143, 80, 'fade', { size: 10.5, w: 700, c: B.blueInk });
  b += T(12, 124, 'Animation: the effect on ONE object in a slide', { size: 12.5, a: 'start', c: B.orangeInk });
  b += slide(14, 136, 168, 88, 'Slide 2');
  b += R(30, 168, 26, 22, { r: 3, f: 'none', s: B.orange, sw: 1.2, dash: '3 3' }) + R(66, 164, 26, 22, { r: 3, f: 'none', s: B.orange, sw: 1.2, dash: '3 3' });
  b += R(108, 158, 40, 32, { r: 4, f: B.orangeWash, sw: 2 }) + P('M114 184 L124 172 L130 178 L134 174 L142 184 Z', B.orange, B.orange, 1);
  b += ARROW(44, 196, 124, 196, B.orange, 2);
  b += T(196, 172, 'Only the picture', { size: 11, w: 700, a: 'start', c: B.soft }) + T(196, 187, 'flies in. The rest', { size: 11, w: 700, a: 'start', c: B.soft }) + T(196, 202, 'of the slide stays.', { size: 11, w: 700, a: 'start', c: B.soft });
  return svgWrap(350, 232, 'Transition: Slide 1 fades into Slide 2, an effect between slides. Animation: inside one slide, only the picture flies in from the left while the rest of the slide stays.', b);
}

/* ---------- Part 6 ---------- */
export function pixelVector() {
  let b = T(175, 18, 'The same circle, zoomed in', { size: 13, c: B.blueInk });
  const n = 12, s = 10, x0 = 22, y0 = 34, rr = 5.4;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const dx = i + 0.5 - n / 2, dy = j + 0.5 - n / 2, d = Math.hypot(dx, dy);
    if (d <= rr) b += `<rect x="${x0 + i * s}" y="${y0 + j * s}" width="${s - 0.8}" height="${s - 0.8}" fill="${d > rr - 1 ? B.blueMid : B.blue}"/>`;
    else b += `<rect x="${x0 + i * s}" y="${y0 + j * s}" width="${s - 0.8}" height="${s - 0.8}" fill="#eef2f7"/>`;
  }
  b += T(82, 176, 'Image (pixels)', { size: 12.5, c: B.blueInk }) + T(82, 193, 'tiny squares: blocky', { size: 10.5, w: 700, c: B.soft }) + T(82, 207, 'when you zoom in', { size: 10.5, w: 700, c: B.soft });
  b += C(266, 94, 58, B.orangeWash, B.orange, 3);
  [[266, 36], [324, 94], [266, 152], [208, 94]].forEach(([x, y]) => { b += `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="#fff" stroke="${B.ink}" stroke-width="1.4"/>`; });
  b += L(240, 36, 292, 36, B.greyInk, 1.2, ' stroke-dasharray="3 3"') + `<circle cx="240" cy="36" r="2.5" fill="${B.greyInk}"/><circle cx="292" cy="36" r="2.5" fill="${B.greyInk}"/>`;
  b += T(266, 176, 'Vector (shapes)', { size: 12.5, c: B.orangeInk }) + T(266, 193, 'points and curves: sharp', { size: 10.5, w: 700, c: B.soft }) + T(266, 207, 'at any size', { size: 10.5, w: 700, c: B.soft });
  return svgWrap(350, 216, 'The same circle zoomed in. On the left, a photo-style image made of tiny squares called pixels looks blocky. On the right, a vector drawing made of points and curves stays smooth and sharp at any size.', b);
}
export function mediaKit() {
  const tileBox = (x, y, name, draw) => R(x, y, 104, 74, { r: 10, f: B.card, s: B.line, sw: 1.6 }) + draw(x + 52, y + 30) + T(x + 52, y + 64, name, { size: 11.5 });
  const items = [
    ['Image editing', (x, y) => R(x - 20, y - 15, 40, 30, { r: 3, f: B.blueWash, sw: 1.8 }) + P(`M${x - 16} ${y + 11} L${x - 5} ${y - 3} L${x + 2} ${y + 5} L${x + 7} ${y} L${x + 16} ${y + 11} Z`, B.green, B.ink, 1.2) + `<circle cx="${x + 9}" cy="${y - 7}" r="3.5" fill="${B.amber}"/>`],
    ['Drawing (vector)', (x, y) => P(`M${x} ${y - 18} L${x + 10} ${y + 2} L${x} ${y + 14} L${x - 10} ${y + 2} Z`, B.orangeWash, B.ink, 1.8) + L(x, y - 4, x, y + 14, B.ink, 1.4) + `<circle cx="${x}" cy="${y - 1}" r="2.6" fill="${B.ink}"/>`],
    ['CAD and 3D', (x, y) => P(`M${x} ${y - 16} L${x + 16} ${y - 8} V${y + 10} L${x} ${y + 18} L${x - 16} ${y + 10} V${y - 8} Z`, B.blueWash, B.ink, 1.8) + P(`M${x - 16} ${y - 8} L${x} ${y} L${x + 16} ${y - 8} M${x} ${y} V${y + 18}`, 'none', B.ink, 1.6)],
    ['Audio editing', (x, y) => [4, 10, 16, 8, 20, 12, 6, 14, 9, 4].map((h, i) => L(x - 22 + i * 5, y - h / 2, x - 22 + i * 5, y + h / 2, B.blue, 2.6)).join('')],
    ['Video editing', (x, y) => R(x - 18, y - 8, 36, 24, { r: 2, f: B.ink, sw: 1.6 }) + P(`M${x - 18} ${y - 8} L${x - 16} ${y - 18} L${x + 20} ${y - 12} L${x + 18} ${y - 8} Z`, B.card, B.ink, 1.6) + P(`M${x - 4} ${y - 2} L${x + 6} ${y + 4} L${x - 4} ${y + 10} Z`, '#fff', '#fff', 1)],
    ['Media player', (x, y) => C(x, y, 17, B.orange, B.ink, 1.8) + P(`M${x - 5} ${y - 8} L${x + 9} ${y} L${x - 5} ${y + 8} Z`, '#fff', '#fff', 1)],
  ];
  let b = '';
  items.forEach(([n, d], i) => { b += tileBox(6 + (i % 3) * 116, 6 + Math.floor(i / 3) * 84, n, d); });
  return svgWrap(352, 172, 'Six kinds of graphics and multimedia apps as icons: image editing (a photo), drawing (a pen tip), CAD and 3D (a cube), audio editing (a sound wave), video editing (a movie clapper), and media player (a play button).', b);
}

/* ---------- chat 42 round 3: piracy sketch + four word processors ---------- */
/** Roughen this one: a student downloads a "cracked" app, and malware crawls out of the laptop. */
export function piracyPic() {
  const bug = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` + `<ellipse cx="0" cy="0" rx="9" ry="12" fill="${B.red}" stroke="${B.ink}" stroke-width="1.6"/>`
    + C(0, -14, 5.5, B.red, B.ink, 1.4) + L(-9, -4, -17, -9, B.ink, 1.6) + L(9, -4, 17, -9, B.ink, 1.6) + L(-9, 4, -17, 8, B.ink, 1.6) + L(9, 4, 17, 8, B.ink, 1.6)
    + L(0, -11, 0, 11, B.ink, 1.2) + '</g>';
  const inner = R(28, 28, 132, 16, { r: 2, f: B.card, s: 'none', sw: 0 }) + T(94, 40, 'free-apps-download.xyz', { size: 8.5, w: 700, c: B.soft })
    + R(36, 52, 116, 38, { r: 4, f: B.redWash, sw: 1.4 }) + T(94, 67, 'FREE! Full version', { size: 10, c: B.red }) + T(94, 82, 'Photoshop_crack.exe', { size: 9, w: 700, mono: true });
  let b = laptop3(22, 18, 144, inner, B.blueWash, { hot: true });
  b += bug(180, 70, 0.9) + bug(200, 128, 0.75) + bug(168, 150, 0.6);
  b += P('M168 82 Q174 76 172 70', 'none', B.red, 1.4, ) ;
  b += T(268, 52, 'What you get:', { size: 12.5, c: B.ink });
  b += R(222, 64, 116, 40, { r: 6, f: B.redWash, sw: 1.6 }) + T(280, 81, 'Hidden malware', { size: 11.5, c: B.red }) + T(280, 96, 'steals your data', { size: 10, w: 700, c: B.soft });
  b += R(222, 114, 116, 40, { r: 6, f: B.butter, sw: 1.6 }) + T(280, 131, 'Breaking the law', { size: 11.5, c: B.orangeInk }) + T(280, 146, 'no license (RA 8293)', { size: 10, w: 700, c: B.soft });
  b += R(222, 164, 116, 40, { r: 6, f: B.grey, sw: 1.6 }) + T(280, 181, 'No updates', { size: 11.5 }) + T(280, 196, 'no security fixes', { size: 10, w: 700, c: B.soft });
  return svgWrap(350, 214, 'A laptop shows a website offering a free full version, Photoshop_crack.exe. Red bugs crawl out of the laptop. What you really get: hidden malware that steals your data, breaking the law with no license under RA 8293, and no updates or security fixes.', b);
}

/** Four word processors, drawn simply (no logos): different looks, the same parts. */
export function wpFour() {
  const W = 165, H = 112;
  const page = (x, y, w, h) => R(x, y, w, h, { r: 1, f: '#fff', sw: 1.2 }) + L(x + 8, y + 10, x + w * 0.6, y + 10, B.ink, 2.2)
    + [18, 25, 32, 39, 46].filter((d) => d < h - 4).map((d, i) => L(x + 8, y + d, x + w - (i === 4 ? 30 : 8), y + d, '#9aa6b8', 1.2)).join('');
  const biu = (x, y) => ['B', 'I', 'U'].map((c, i) => R(x + i * 13, y, 11, 11, { r: 2, f: B.card, sw: 0.9 }) + T(x + i * 13 + 5.5, y + 8.6, c, { size: 7.5 })).join('');
  const frame = (x, y) => R(x, y, W, H, { r: 5, f: '#e9edf3', sw: 1.8 });
  const name = (x, y, n, sub) => T(x + W / 2, y + H + 16, n, { size: 12 }) + T(x + W / 2, y + H + 30, sub, { size: 10, w: 700, c: B.soft });
  let b = '';
  // 1. Word: colored title bar, ribbon tabs, ribbon
  let x = 4, y = 6;
  b += frame(x, y) + `<path d="M${x + 5} ${y} H${x + W - 5} Q${x + W} ${y} ${x + W} ${y + 5} V${y + 14} H${x} V${y + 5} Q${x} ${y} ${x + 5} ${y} Z" fill="#2b579a" stroke="${B.ink}" stroke-width="1.8"/>`;
  ['File', 'Home', 'Insert', 'Layout'].forEach((t, i) => { b += T(x + 18 + i * 34, y + 24, t, { size: 7.5, c: i === 1 ? '#2b579a' : B.soft }); });
  b += R(x, y + 28, W, 20, { r: 0, f: '#f3f5f8', sw: 1 }) + biu(x + 8, y + 32) + page(x + 30, y + 54, W - 60, H - 58) + name(x, y, 'Microsoft Word', 'installed + web');
  // 2. LibreOffice Writer: plain title bar, menu words, icon toolbar
  x = 181;
  b += frame(x, y) + `<path d="M${x + 5} ${y} H${x + W - 5} Q${x + W} ${y} ${x + W} ${y + 5} V${y + 14} H${x} V${y + 5} Q${x} ${y} ${x + 5} ${y} Z" fill="#c9d2df" stroke="${B.ink}" stroke-width="1.8"/>`;
  ['File', 'Edit', 'View', 'Insert', 'Format'].forEach((t, i) => { b += T(x + 14 + i * 30, y + 24, t, { size: 7.5, c: B.soft }); });
  b += R(x, y + 28, W, 18, { r: 0, f: '#f3f5f8', sw: 1 }) + [0, 1, 2, 3].map((i) => R(x + 6 + i * 13, y + 31, 10, 11, { r: 1, f: ['#1c99d1', B.amber, B.greenWash, B.blueWash][i], sw: 0.8 })).join('') + biu(x + 62, y + 31) + page(x + 30, y + 52, W - 60, H - 56) + name(x, y, 'LibreOffice Writer', 'installed, free');
  // 3. Google Docs: browser tab + address bar, title, toolbar, Share button
  x = 4; y = 160;
  b += frame(x, y) + R(x + 6, y - 6, 52, 12, { r: 3, f: '#fff', sw: 1.2 }) + R(x + 6, y + 8, W - 12, 10, { r: 5, f: '#fff', sw: 1 }) + T(x + 12, y + 16, 'docs.google.com', { size: 7, w: 700, a: 'start', c: B.soft });
  b += R(x + 8, y + 22, 12, 15, { r: 2, f: '#4285f4', sw: 1 }) + T(x + 26, y + 32, 'Untitled document', { size: 8, w: 800, a: 'start' }) + R(x + W - 36, y + 23, 30, 13, { r: 6, f: '#c2e7ff', sw: 1 }) + T(x + W - 21, y + 32.5, 'Share', { size: 7, c: B.ink });
  b += R(x + 6, y + 41, W - 12, 15, { r: 7, f: '#eef3fc', sw: 0.9 }) + biu(x + 50, y + 43) + page(x + 30, y + 60, W - 60, H - 64) + name(x, y, 'Google Docs', 'cloud: runs in a browser');
  // 4. Apple Pages: three window dots, toolbar, page + Format sidebar on the right
  x = 181;
  b += frame(x, y) + R(x, y, W, 22, { r: 5, f: '#f3f5f8', sw: 1.8 }) + [['#ff5f57', 0], ['#febc2e', 1], ['#28c840', 2]].map(([c, i]) => `<circle cx="${x + 10 + i * 9}" cy="${y + 11}" r="3" fill="${c}"/>`).join('')
    + [0, 1, 2, 3].map((i) => R(x + 52 + i * 18, y + 6, 12, 10, { r: 2, f: '#fff', sw: 0.8 })).join('');
  b += page(x + 10, y + 30, 96, H - 34) + R(x + 114, y + 26, 46, H - 30, { r: 3, f: '#fff', sw: 1 }) + T(x + 137, y + 38, 'Format', { size: 7.5, c: '#e8821e' }) + ['B', 'I', 'U'].map((c, i) => R(x + 118 + i * 13, y + 46, 11, 11, { r: 2, f: B.card, sw: 0.9 }) + T(x + 123.5 + i * 13, y + 54.6, c, { size: 7.5 })).join('');
  b += name(x, y, 'Apple Pages', 'installed on Mac, iPhone, iPad');
  return svgWrap(350, 314, 'Four word processors drawn side by side: Microsoft Word with a ribbon, LibreOffice Writer with menus and a toolbar, Google Docs in a web browser, and Apple Pages with a Format sidebar. Each has a white page in the middle and Bold, Italic, Underline buttons.', b);
}

/* ---------- chat 42 round 4: app-window anatomies with numbered tags (legend is HTML in the page) ---------- */
const CAT = { word: '#2b579a', sheet: '#217346', db: '#a4373a', slides: '#d4651a', media: '#7a4ea3' };
const tag = (x, y, n, c) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="#fff" stroke-width="1.6"/>` + T(x, y + 4, String(n), { size: 11, c: '#fff', w: 900 });
const ttl = (x, w, c, h = 20) => `<path d="M${x + 6} 4 H${x + w - 6} Q${x + w} 4 ${x + w} 10 V${4 + h} H${x} V10 Q${x} 4 ${x + 6} 4 Z" fill="${c}" stroke="none"/>`;
const t8 = (x, y, s, o = {}) => T(x, y, s, { size: o.size ?? 8, w: o.w ?? 700, a: o.a ?? 'start', c: o.c ?? B.soft, mono: o.mono });
const biuS = (x, y, s = 11) => ['B', 'I', 'U'].map((ch, i) => R(x + i * (s + 2), y, s, s, { r: 2, f: '#fff', sw: 0.9 }) + T(x + i * (s + 2) + s / 2, y + s * 0.78, ch, { size: s * 0.68, w: 900 })).join('');
const alignS = (x, y) => [0, 1, 2, 3].map((k) => [0, 1, 2].map((j) => { const w = [[9, 6, 9], [9, 5, 9], [9, 6, 9], [9, 9, 9]][k][j]; const x0 = k === 1 ? x + k * 13 + (9 - w) / 2 : k === 2 ? x + k * 13 + 9 - w : x + k * 13; return L(x0, y + j * 3.5, x0 + w, y + j * 3.5, B.soft, 1.1); }).join('')).join('');
const tabsRow = (x0, y, names, active, c, size = 8.2, k = 4.3, gap = 7) => {
  let x = x0, s = '', pos = {};
  names.forEach((n) => { const w = n.length * k + gap + (active[0] === n ? 4 : 0); pos[n] = [x, x + w - gap]; s += t8(x, y, n, { size, c: active.includes(n) ? c : B.soft, w: active.includes(n) ? 900 : 700 }); if (active[0] === n) s += L(x, y + 4, x + w - gap, y + 4, c, 2.2); x += w; });
  return { s, pos };
};
const pageLines = (x, y, w, h, c = B.ink) => R(x, y, w, h, { r: 0, f: '#fff', sw: 0.8 }) + L(x + 14, y + 14, x + w * 0.55, y + 14, c, 3)
  + [26, 36, 46, 56, 66, 76, 86].filter((d) => d < h - 6).map((d, i) => L(x + 14, y + d, x + w - (i % 4 === 3 ? 50 : 14), y + d, '#9aa6b8', 1.3)).join('');
const frameEnd = (w, h) => R(4, 4, w - 8, h - 8, { r: 6, f: 'none', sw: 1.8 });

export function wpWord() {
  const c = CAT.word;
  let b = R(4, 4, 312, 212, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, 312, c) + T(160, 18, 'Report.docx - Word', { size: 9.5, c: '#fff' });
  b += R(12, 9, 9, 9, { r: 1.5, f: 'none', s: '#fff', sw: 1.2 }) + L(272, 14, 280, 14, '#fff', 1.4) + `<rect x="286" y="10" width="8" height="8" fill="none" stroke="#fff" stroke-width="1.2"/>` + L(299, 10, 307, 18, '#fff', 1.4) + L(307, 10, 299, 18, '#fff', 1.4);
  const tr = tabsRow(10, 36, ['File', 'Home', 'Insert', 'Draw', 'Design', 'Layout', 'References', 'Review', 'View'], ['Home'], c, 8, 4.2, 7.5);
  b += tr.s;
  b += `<rect x="4" y="42" width="312" height="46" fill="#f3f5f8"/>` + L(4, 42, 316, 42, B.line, 1) + L(4, 88, 316, 88, B.line, 1);
  b += R(12, 47, 20, 24, { r: 2, f: B.amber, sw: 1.1 }) + `<rect x="17" y="44" width="10" height="6" rx="1" fill="${B.grey}" stroke="${B.ink}" stroke-width="1"/>` + t8(22, 83, 'Clipboard', { size: 6.5, a: 'middle' });
  b += L(42, 46, 42, 84, B.line, 1);
  b += R(48, 47, 56, 12, { r: 1, f: '#fff', sw: 0.9 }) + t8(51, 56, 'Calibri', { size: 7.5, c: B.ink }) + R(106, 47, 18, 12, { r: 1, f: '#fff', sw: 0.9 }) + t8(115, 56, '11', { size: 7.5, c: B.ink, a: 'middle' });
  b += biuS(48, 63) + T(97, 72, 'A', { size: 9.5, w: 900 }) + `<rect x="92" y="74" width="11" height="2.5" fill="${B.red}"/>`  + t8(86, 83, 'Font', { size: 6.5, a: 'middle' });
  b += L(130, 46, 130, 84, B.line, 1);
  b += [0, 1, 2].map((j) => `<circle cx="138" cy="${50 + j * 4}" r="1.3" fill="${B.ink}"/>` + L(141, 50 + j * 4, 150, 50 + j * 4, B.soft, 1.1)).join('') + [0, 1, 2].map((j) => t8(156, 51.5 + j * 4, String(j + 1), { size: 4.5, c: B.ink }) + L(160, 50 + j * 4, 169, 50 + j * 4, B.soft, 1.1)).join('');
  b += alignS(136, 64) + t8(158, 83, 'Paragraph', { size: 6.5, a: 'middle' });
  b += L(190, 46, 190, 84, B.line, 1);
  [['Normal', 'AaBbCc'], ['No Spacing', 'AaBbCc'], ['Heading 1', 'AaBb']].forEach(([n, s], i) => { const x = 196 + i * 40; b += R(x, 47, 36, 26, { r: 2, f: '#fff', sw: 0.8 }) + T(x + 18, 60, s, { size: i === 2 ? 9 : 7.5, w: 700, c: i === 2 ? c : B.ink }) + T(x + 18, 69, n, { size: 5.5, w: 700, c: B.soft }); });
  b += t8(254, 83, 'Styles', { size: 6.5, a: 'middle' });
  b += `<rect x="4" y="88" width="312" height="8" fill="#fff"/>` + [...Array(26)].map((_, i) => L(60 + i * 8, i % 2 ? 93 : 91, 60 + i * 8, 95, '#9aa6b8', 0.8)).join('');
  b += `<rect x="4" y="96" width="312" height="102" fill="#e6e9ee"/>` + pageLines(60, 102, 200, 96, c);
  b += `<rect x="4" y="198" width="312" height="14" fill="#f3f5f8"/>` + L(4, 198, 316, 198, B.line, 1) + t8(12, 208, 'Page 1 of 1  ·  152 words  ·  English (Philippines)', { size: 6.8 });
  b += L(232, 205, 282, 205, '#9aa6b8', 1.2) + `<circle cx="257" cy="205" r="3" fill="${B.soft}"/>` + t8(310, 208, '100%', { size: 6.8, a: 'end' });
  b += frameEnd(320, 220);
  b += tag(300, 31, 1, c) + tag(117, 69, 2, c) + tag(248, 116, 3, c);
  return svgWrap(320, 220, 'Microsoft Word: a blue title bar with the file name, tabs from File to View, the Home ribbon with Clipboard, Font, Paragraph, and Styles groups, a ruler, the page, and a status bar with the page and word count. Number 1 marks the tabs, 2 the formatting buttons, 3 the page.', b);
}
export function wpWriter() {
  const c = CAT.word;
  let b = R(4, 4, 312, 212, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, 312, '#dfe3e8') + T(160, 18, 'Report.odt - LibreOffice Writer', { size: 9, c: B.ink });
  b += L(272, 14, 280, 14, B.ink, 1.3) + `<rect x="286" y="10" width="8" height="8" fill="none" stroke="${B.ink}" stroke-width="1.1"/>` + L(299, 10, 307, 18, B.ink, 1.3) + L(307, 10, 299, 18, B.ink, 1.3);
  b += tabsRow(10, 36, ['File', 'Edit', 'View', 'Insert', 'Format', 'Styles', 'Table', 'Tools', 'Window', 'Help'], [], c, 7.8, 4.2, 7).s;
  b += `<rect x="4" y="42" width="312" height="34" fill="#f3f5f8"/>` + L(4, 42, 316, 42, B.line, 1) + L(4, 59, 316, 59, B.line, 0.8) + L(4, 76, 316, 76, B.line, 1);
  ['#5b8fd6', '#eeb04a', '#2b579a', '#9aa6b8', '#b23a33', '#9aa6b8', '#9aa6b8', '#eeb04a', '#3f8a5a', '#5b8fd6', '#9aa6b8', '#2f7d55', '#e27b3e', '#7a4ea3'].forEach((f, i) => { b += `<rect x="${10 + i * 15 + (i > 4 ? 6 : 0) + (i > 9 ? 6 : 0)}" y="46" width="10" height="9" rx="1.5" fill="${f}" stroke="${B.ink}" stroke-width="0.6"/>`; });
  b += R(10, 62, 84, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(13, 70, 'Default Paragraph Style', { size: 6.3, c: B.ink }) + R(98, 62, 62, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(101, 70, 'Liberation Serif', { size: 6.3, c: B.ink });
  b += R(164, 62, 16, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(172, 70, '12', { size: 6.3, c: B.ink, a: 'middle' }) + biuS(186, 62, 10) + alignS(228, 64);
  b += `<rect x="4" y="76" width="292" height="8" fill="#fff"/>` + [...Array(25)].map((_, i) => L(52 + i * 8, i % 2 ? 81 : 79, 52 + i * 8, 83, '#9aa6b8', 0.8)).join('');
  b += `<rect x="4" y="84" width="292" height="114" fill="#e6e9ee"/>` + pageLines(50, 90, 200, 108, c);
  b += `<rect x="296" y="76" width="20" height="122" fill="#f3f5f8"/>` + L(296, 76, 296, 198, B.line, 1) + [0, 1, 2, 3].map((i) => `<rect x="301" y="${84 + i * 16}" width="10" height="10" rx="2" fill="${['#9aa6b8', '#5b8fd6', '#eeb04a', '#3f8a5a'][i]}" stroke="${B.ink}" stroke-width="0.6"/>`).join('');
  b += `<rect x="4" y="198" width="312" height="14" fill="#f3f5f8"/>` + L(4, 198, 316, 198, B.line, 1) + t8(12, 208, 'Page 1 of 1  ·  152 words, 870 characters  ·  English (Philippines)', { size: 6.6 }) + t8(310, 208, '100%', { size: 6.6, a: 'end' });
  b += frameEnd(320, 220);
  b += tag(304, 31, 1, c) + tag(288, 66, 2, c) + tag(238, 108, 3, c);
  return svgWrap(320, 220, 'LibreOffice Writer: a title bar with the file name, a menu bar from File to Help, a toolbar of icons, a formatting toolbar with the paragraph style, font, size, Bold, Italic, Underline, and alignment, a ruler, the page, a sidebar on the right, and a status bar. Number 1 marks the menus, 2 the formatting buttons, 3 the page.', b);
}
export function wpDocs() {
  const c = CAT.word;
  let b = R(4, 4, 312, 212, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, 312, '#dfe3e8', 18);
  b += `<path d="M12 22 V12 Q12 8 16 8 H122 Q126 8 126 12 V22 Z" fill="#fff" stroke="none"/>` + `<rect x="18" y="11" width="7" height="9" rx="1" fill="#4285f4"/>` + t8(30, 18.5, 'Report - Google Docs', { size: 7.5, c: B.ink }) + t8(118, 18.5, '×', { size: 8, a: 'middle' }) + t8(136, 19, '+', { size: 10, c: B.ink });
  b += `<rect x="4" y="22" width="312" height="18" fill="#fff"/>` + t8(12, 34, '←  →  ↻', { size: 8, c: B.soft }) + `<rect x="48" y="25" width="262" height="12" rx="6" fill="#eef1f5"/>` + t8(57, 34, 'docs.google.com/document/d/...', { size: 6.8 });
  b += L(4, 40, 316, 40, B.line, 1);
  b += `<rect x="12" y="45" width="12" height="16" rx="2" fill="#4285f4"/>` + [0, 1, 2].map((i) => L(15, 50 + i * 3.5, 21, 50 + i * 3.5, '#fff', 1)).join('') + t8(30, 53, 'Report', { size: 10, w: 800, c: B.ink });
  b += tabsRow(30, 64, ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help'], [], c, 7.6, 4, 7).s;
  b += R(234, 43, 46, 14, { r: 7, f: '#c2e7ff', sw: 0.9 }) + T(257, 53, 'Share', { size: 8, c: B.ink }) + `<circle cx="298" cy="50" r="7.5" fill="${B.orange}"/>` + T(298, 53.5, 'A', { size: 8.5, c: '#fff' });
  b += R(10, 70, 300, 16, { r: 8, f: '#edf2fa', s: 'none', sw: 0 }) + t8(18, 81, '↶  ↷', { size: 8.5, c: B.ink }) + t8(44, 81, '100%', { size: 7, c: B.ink }) + L(66, 73, 66, 83, B.line, 1) + t8(71, 81, 'Normal text', { size: 7, c: B.ink })
    + L(114, 73, 114, 83, B.line, 1) + t8(119, 81, 'Arial', { size: 7, c: B.ink }) + L(142, 73, 142, 83, B.line, 1) + t8(147, 81, '−   11   +', { size: 7, c: B.ink }) + L(182, 73, 182, 83, B.line, 1) + biuS(187, 72, 10) + T(230, 81, 'A', { size: 8.5, w: 900 }) + `<rect x="226" y="82" width="9" height="2" fill="${B.ink}"/>` + alignS(244, 74);
  b += `<rect x="4" y="88" width="312" height="8" fill="#fff"/>` + [...Array(26)].map((_, i) => L(60 + i * 8, i % 2 ? 93 : 91, 60 + i * 8, 95, '#9aa6b8', 0.8)).join('');
  b += `<rect x="4" y="96" width="312" height="116" fill="#eef1f5"/>` + pageLines(60, 102, 200, 110, c);
  b += frameEnd(320, 220);
  b += tag(300, 78, 2, c) + tag(86, 48, 1, c) + tag(248, 116, 3, c);
  return svgWrap(320, 220, 'Google Docs in a web browser: a browser tab and the address docs.google.com, the document name, a menu bar from File to Help, a Share button, a toolbar with zoom, the text style, font, size, Bold, Italic, Underline, and alignment, a ruler, and the page. Number 1 marks the menus, 2 the formatting buttons, 3 the page.', b);
}
export function wpPages() {
  const c = CAT.word;
  let b = R(4, 4, 312, 212, { r: 8, f: '#fff', s: 'none', sw: 0 }) + ttl(4, 312, '#ececec', 40);
  b += [['#ff5f57', 0], ['#febc2e', 1], ['#28c840', 2]].map(([f, i]) => `<circle cx="${15 + i * 10}" cy="13" r="3.4" fill="${f}"/>`).join('') + T(160, 15, 'Report', { size: 8.5, w: 800 });
  ['View', 'Zoom', 'Table', 'Chart', 'Text', 'Shape', 'Media', 'Share', 'Format', 'Document'].forEach((n, i) => {
    const x = 26 + i * 29.5, on = n === 'Format';
    b += `<rect x="${x - 7}" y="21" width="14" height="10" rx="2.5" fill="${on ? '#f6c793' : '#fff'}" stroke="${B.soft}" stroke-width="0.7"/>` + T(x, 40, n, { size: 6, w: 700, c: on ? B.orangeInk : B.soft });
  });
  b += L(4, 44, 316, 44, B.line, 1) + `<rect x="4" y="44" width="200" height="168" fill="#e5e5e5"/>` + pageLines(26, 52, 156, 160, c);
  b += `<rect x="204" y="44" width="112" height="168" fill="#f6f6f6"/>` + L(204, 44, 204, 212, B.line, 1);
  b += R(212, 50, 96, 14, { r: 4, f: '#e3e3e3', s: 'none', sw: 0 }) + R(213, 51, 32, 12, { r: 3, f: '#fff', sw: 0.6 }) + T(229, 60, 'Style', { size: 7, w: 800 }) + T(260, 60, 'Layout', { size: 7, w: 700, c: B.soft }) + T(290, 60, 'More', { size: 7, w: 700, c: B.soft });
  b += R(212, 70, 96, 14, { r: 3, f: '#fff', sw: 0.7 }) + t8(217, 80, 'Body', { size: 8, w: 800, c: B.ink }) + t8(302, 80, '⌄', { size: 8, a: 'end' });
  b += t8(212, 96, 'Font', { size: 7.5, w: 800, c: B.ink }) + R(212, 100, 96, 12, { r: 2, f: '#fff', sw: 0.7 }) + t8(216, 109, 'Helvetica Neue', { size: 6.8, c: B.ink });
  b += R(212, 115, 58, 12, { r: 2, f: '#fff', sw: 0.7 }) + t8(216, 124, 'Regular', { size: 6.8, c: B.ink }) + R(274, 115, 34, 12, { r: 2, f: '#fff', sw: 0.7 }) + t8(278, 124, '11 pt', { size: 6.8, c: B.ink });
  b += biuS(212, 131, 11) + `<rect x="256" y="131" width="22" height="11" rx="2" fill="${B.ink}"/>`;
  b += t8(212, 160, 'Alignment', { size: 7.5, w: 800, c: B.ink }) + alignS(212, 165);
  b += t8(212, 190, 'Spacing', { size: 7.5, w: 800, c: B.ink }) + R(212, 194, 96, 12, { r: 2, f: '#fff', sw: 0.7 }) + t8(216, 203, '1.0 - Single', { size: 6.8, c: B.ink });
  b += R(4, 4, 312, 212, { r: 8, f: 'none', sw: 1.8 });
  b += tag(296, 136, 2, c) + tag(300, 14, 1, c) + tag(170, 66, 3, c);
  return svgWrap(320, 220, 'Apple Pages on a Mac: three window buttons, a toolbar with View, Zoom, Table, Chart, Text, Shape, Media, Share, Format, and Document, the page on a gray background, and the Format sidebar on the right with the paragraph style Body, the font, size, Bold, Italic, Underline, alignment, and spacing. Number 1 marks the toolbar, 2 the formatting buttons, 3 the page.', b);
}

/** A page with real text: character, paragraph, and page formatting, word wrap, and the ¶ marks. Tags 1-4 (legend in HTML). */
export function formatPage() {
  const c = CAT.word, pil = '#8fa6c8';
  const line = (x, y, html, o = {}) => `<text x="${x}" y="${y}" font-family="Nunito, system-ui, sans-serif" font-size="${o.size ?? 10}" font-weight="${o.w ?? 600}" fill="${o.c ?? B.ink}" text-anchor="${o.a ?? 'start'}">${html}</text>`;
  const pm = `<tspan fill="${pil}" font-weight="700">¶</tspan>`;
  let b = R(10, 8, 280, 334, { r: 2, f: '#fff', sw: 1.8 }) + R(42, 44, 216, 262, { r: 0, f: 'none', s: B.greyInk, sw: 1, dash: '4 4' });
  b += line(150, 30, 'Trip Report · IT 1A', { size: 8.5, c: B.greyInk, a: 'middle', w: 700 });
  b += line(150, 72, `My Trip to Dahican${pm}`, { size: 15, w: 900, c, a: 'middle' });
  b += line(62, 96, 'Last summer, our class visited');
  b += line(46, 110, `<tspan font-weight="900" fill="${B.orangeInk}">Dahican Beach</tspan> in Mati City. The sand`);
  b += line(46, 124, 'was white, and the waves were perfect');
  b += line(46, 138, `for <tspan font-style="italic">skimboarding</tspan>.${pm}`);
  ['Swimming', 'Skimboarding', 'Watching the sunset'].forEach((s, i) => { b += line(54, 162 + i * 15, '•', { w: 900 }) + line(64, 162 + i * 15, `${s}${pm}`); });
  b += line(150, 222, `We will come back next year!${pm}`, { a: 'middle' });
  b += ARROW(26, 262, 12, 262, B.greyInk, 1.2) + ARROW(26, 262, 40, 262, B.greyInk, 1.2);
  b += line(150, 328, '1', { size: 9, a: 'middle', c: B.greyInk, w: 700 });
  b += tag(26, 30, 4, c) + tag(26, 106, 1, c) + tag(274, 92, 3, c) + tag(26, 174, 2, c) + tag(26, 218, 2, c) + tag(274, 324, 4, c) + tag(26, 70, 1, c);
  return svgWrap(300, 350, 'A page about a trip to Dahican. The header Trip Report, IT 1A sits in the top margin and the page number 1 in the bottom margin. The title is big, bold, blue, and centered. The words Dahican Beach are bold and orange, and skimboarding is in italics. The first paragraph wraps onto four lines, with a paragraph mark only at its end. Three bullet points and a centered last line follow. Dashed lines show the margins.', b);
}

/** Spreadsheet window (Excel-like) with numbered parts. */
export function sheetWindow() {
  const c = CAT.sheet, W = 340, H = 274;
  let b = R(4, 4, W - 8, H - 8, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, W - 8, c) + T(W / 2, 18, 'Sales.xlsx - Excel', { size: 9.5, c: '#fff' });
  b += L(290, 14, 298, 14, '#fff', 1.4) + `<rect x="304" y="10" width="8" height="8" fill="none" stroke="#fff" stroke-width="1.2"/>` + L(317, 10, 325, 18, '#fff', 1.4) + L(325, 10, 317, 18, '#fff', 1.4);
  b += tabsRow(10, 36, ['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'], ['Home'], c, 8, 4.2, 8).s;
  b += `<rect x="4" y="42" width="${W - 8}" height="30" fill="#f3f5f8"/>` + L(4, 42, W - 4, 42, B.line, 1) + L(4, 72, W - 4, 72, B.line, 1);
  b += R(12, 46, 16, 20, { r: 2, f: B.amber, sw: 1 }) + R(36, 47, 46, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(39, 55.5, 'Calibri', { size: 6.8, c: B.ink }) + R(84, 47, 16, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(92, 55.5, '11', { size: 6.8, c: B.ink, a: 'middle' }) + biuS(36, 60, 9);
  b += L(108, 46, 108, 68, B.line, 1) + alignS(114, 50) + [0, 1, 2].map((i) => `<rect x="${168 + i * 13}" y="47" width="10" height="10" fill="#fff" stroke="${B.soft}" stroke-width="0.8"/>`).join('') + t8(168, 66, '$  %  ,', { size: 7, c: B.ink });
  b += L(214, 46, 214, 68, B.line, 1) + t8(222, 56, 'Σ AutoSum', { size: 7, c: B.ink }) + t8(222, 66, 'Sort & Filter', { size: 7, c: B.ink });
  b += R(8, 76, 40, 15, { r: 1, f: '#fff', sw: 0.9 }) + t8(28, 87, 'D2', { size: 8, c: B.ink, a: 'middle', w: 800 }) + T(62, 87, 'fx', { size: 8.5, w: 800, c: B.soft }) + R(74, 76, W - 82, 15, { r: 1, f: '#fff', sw: 0.9 }) + t8(80, 87, '=B2*C2', { size: 8.5, c: B.ink, mono: true });
  const cols = [['', 22], ['A', 82], ['B', 56], ['C', 48], ['D', 64], ['E', 56]];
  let x = 6; const xs = cols.map(([, w]) => { const v = x; x += w; return v; });
  const y0 = 96, rh = 15, rows = [['Item', 'Price (₱)', 'Sold', 'Sales (₱)'], ['Pandesal', '4', '50', '200'], ['Pancit canton', '18', '12', '216'], ['3-in-1 coffee', '10', '25', '250'], ['Egg', '9', '30', '270'], ['Total', '', '117', '936'], ['', '', '', ''], ['', '', '', '']];
  b += `<rect x="6" y="${y0}" width="${x - 6}" height="${rh}" fill="#eef1f5"/><rect x="6" y="${y0}" width="22" height="${rh * 9}" fill="#eef1f5"/>` + `<rect x="${xs[4]}" y="${y0}" width="64" height="${rh}" fill="#cfe5d8"/><rect x="6" y="${y0 + rh * 2}" width="22" height="${rh}" fill="#cfe5d8"/>`;
  for (let j = 0; j <= 9; j++) b += L(6, y0 + j * rh, x, y0 + j * rh, '#d5dbe4', 0.8);
  [...xs, x].forEach((v) => { b += L(v, y0, v, y0 + rh * 9, '#d5dbe4', 0.8); });
  cols.forEach(([n], i) => { if (n) b += T(xs[i] + cols[i][1] / 2, y0 + 11, n, { size: 8, w: 800, c: i === 4 ? c : B.soft }); });
  for (let j = 1; j <= 8; j++) b += T(17, y0 + j * rh + 11, String(j), { size: 7.5, w: 800, c: j === 2 ? c : B.soft });
  rows.forEach((r, j) => r.forEach((v, i) => { if (!v) return; const num = i > 0 && j > 0; b += t8(num ? xs[i + 1] + cols[i + 1][1] - 5 : xs[i + 1] + 4, y0 + (j + 1) * rh + 11, v, { size: 7.8, c: B.ink, w: j === 0 || j === 5 ? 800 : 600, a: num ? 'end' : 'start' }); }));
  b += `<rect x="${xs[4]}" y="${y0 + rh * 2}" width="64" height="${rh}" fill="none" stroke="${c}" stroke-width="2.4"/><rect x="${xs[4] + 61}" y="${y0 + rh * 3 - 3}" width="5" height="5" fill="${c}" stroke="#fff" stroke-width="0.8"/>`;
  b += `<rect x="4" y="${y0 + rh * 9}" width="${W - 8}" height="${H - 4 - (y0 + rh * 9)}" fill="#f3f5f8"/>` + L(4, y0 + rh * 9, W - 4, y0 + rh * 9, B.line, 1);
  const ys = y0 + rh * 9;
  b += t8(12, ys + 12, '◀ ▶', { size: 7 }) + `<rect x="34" y="${ys}" width="42" height="17" fill="#fff"/>` + L(34, ys + 16, 76, ys + 16, c, 2.2) + t8(55, ys + 12, 'Sheet1', { size: 7.8, w: 900, c, a: 'middle' }) + t8(98, ys + 12, 'Sheet2', { size: 7.8, a: 'middle' }) + t8(124, ys + 12.5, '+', { size: 10, c: B.ink });
  b += t8(12, ys + 30, 'Ready', { size: 7 }) + t8(W - 12, ys + 30, '100%', { size: 7, a: 'end' }) + L(4, ys + 19, W - 4, ys + 19, B.line, 0.8);
  b += frameEnd(W, H);
  b += tag(318, 58, 1, c) + tag(8, 76, 2, c) + tag(318, 84, 3, c) + tag(17, y0 + 7, 4, c) + tag(xs[5] + 14, y0 + rh * 2 + 7, 5, c) + tag(146, ys + 8, 6, c);
  return svgWrap(W, H, 'A spreadsheet window like Excel, for Aling Nena\'s sales. A green title bar says Sales.xlsx. Below are tabs from File to View and the Home ribbon. The name box says D2 and the formula bar shows =B2*C2. The grid has column letters A to E and row numbers 1 to 8, with Item, Price, Sold, and Sales, and a Total row. Cell D2 is selected with a thick green border and shows 200. At the bottom are sheet tabs, Sheet1 and Sheet2.', b);
}

/** Presentation window (PowerPoint-like) with numbered parts. */
export function slideWindow() {
  const c = CAT.slides, W = 340, H = 244;
  let b = R(4, 4, W - 8, H - 8, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, W - 8, c) + T(W / 2, 18, 'Report.pptx - PowerPoint', { size: 9.5, c: '#fff' });
  b += L(290, 14, 298, 14, '#fff', 1.4) + `<rect x="304" y="10" width="8" height="8" fill="none" stroke="#fff" stroke-width="1.2"/>` + L(317, 10, 325, 18, '#fff', 1.4) + L(325, 10, 317, 18, '#fff', 1.4);
  const tr = tabsRow(10, 36, ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'View'], ['Home', 'Transitions', 'Animations'], c, 8, 4.2, 8.5);
  b += tr.s;
  b += `<rect x="4" y="42" width="${W - 8}" height="30" fill="#f3f5f8"/>` + L(4, 42, W - 4, 42, B.line, 1) + L(4, 72, W - 4, 72, B.line, 1);
  b += R(10, 45, 26, 24, { r: 2, f: '#fff', sw: 0.9 }) + R(15, 48, 16, 10, { r: 1, f: '#fbe2d2', sw: 0.6 }) + t8(23, 66, 'New Slide', { size: 5.2, c: B.ink, a: 'middle' });
  b += R(44, 47, 46, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(47, 55.5, 'Calibri', { size: 6.8, c: B.ink }) + R(92, 47, 16, 11, { r: 1, f: '#fff', sw: 0.8 }) + t8(100, 55.5, '28', { size: 6.8, c: B.ink, a: 'middle' }) + biuS(44, 60, 9);
  b += L(116, 46, 116, 68, B.line, 1) + alignS(122, 50) + L(176, 46, 176, 68, B.line, 1);
  b += `<rect x="184" y="49" width="12" height="10" fill="#fff" stroke="${B.ink}" stroke-width="1"/><circle cx="208" cy="54" r="5.5" fill="#fff" stroke="${B.ink}" stroke-width="1"/><path d="M218 59 L224 49 L230 59 Z" fill="#fff" stroke="${B.ink}" stroke-width="1"/>` + t8(207, 67, 'Shapes', { size: 6.5, a: 'middle' });
  b += `<rect x="4" y="72" width="66" height="146" fill="#f3f5f8"/>` + L(70, 72, 70, 218, B.line, 1);
  [0, 1, 2].forEach((i) => { const y = 80 + i * 40; b += t8(12, y + 12, String(i + 1), { size: 8, c: B.ink, w: 800 }) + R(20, y, 44, 25, { r: 1, f: '#fff', s: i === 1 ? c : B.soft, sw: i === 1 ? 2.2 : 0.8 }) + L(24, y + 7, 46, y + 7, B.ink, 1.6) + L(24, y + 13, 58, y + 13, '#9aa6b8', 1) + L(24, y + 18, 54, y + 18, '#9aa6b8', 1); });
  b += `<rect x="70" y="72" width="${W - 74}" height="128" fill="#e6e9ee"/>`;
  b += R(92, 78, 216, 118, { r: 1, f: '#fff', sw: 1 }) + T(106, 104, 'Input devices', { size: 14, w: 900, a: 'start', c: B.ink });
  [124, 142, 160].forEach((y, i) => { b += `<circle cx="110" cy="${y - 3}" r="2.4" fill="${c}"/>` + t8(118, y, ['Keyboard', 'Mouse', 'Microphone'][i], { size: 9, c: B.ink, w: 600 }); });
  b += R(232, 116, 62, 52, { r: 3, f: '#fbe2d2', s: 'none', sw: 0 }) + P('M252 126 Q252 116 263 116 Q274 116 274 126 V146 Q274 158 263 158 Q252 158 252 146 Z', '#fff', B.ink, 1.3) + L(263, 116, 263, 132, B.ink, 1.1) + L(252, 132, 274, 132, B.ink, 1.1);
  b += `<rect x="70" y="200" width="${W - 74}" height="18" fill="#fff"/>` + L(70, 200, W - 4, 200, B.line, 1) + t8(80, 212, 'Click to add notes', { size: 7.5 });
  b += `<rect x="4" y="218" width="${W - 8}" height="22" fill="#f3f5f8"/>` + L(4, 218, W - 4, 218, B.line, 1) + t8(12, 232, 'Slide 2 of 3  ·  English (Philippines)', { size: 7 }) + t8(206, 232, 'Notes', { size: 7, c: B.ink });
  b += `<rect x="236" y="224" width="12" height="9" fill="#fff" stroke="${B.soft}" stroke-width="0.8"/><rect x="254" y="224" width="12" height="9" fill="#fff" stroke="${B.soft}" stroke-width="0.8"/>`
    + `<rect x="272" y="223" width="14" height="11" rx="1" fill="${c}"/><path d="M277 225.5 L283 228.5 L277 231.5 Z" fill="#fff"/>`;
  b += frameEnd(W, H);
    b += tag(322, 32, 1, c) + tag(62, 128, 2, c) + tag(296, 88, 3, c) + tag(318, 209, 4, c) + tag(300, 229, 5, c);
  return svgWrap(W, H, 'A presentation window like PowerPoint. An orange title bar says Report.pptx. Below are tabs including Design, Transitions, Animations, and Slide Show, and the Home ribbon with New Slide, font, and shapes. On the left are three slide thumbnails, with slide 2 selected. In the middle, slide 2 is being edited: the title Input devices, three bullets, and a picture of a mouse. Below the slide is the notes pane, Click to add notes. The status bar says Slide 2 of 3 and has the Slide Show button.', b);
}

/** Database vs. DBMS: you and your apps, the DBMS (software), the database (data). */
export function dbmsPic() {
  const c = CAT.db;
  let b = T(54, 20, 'You and your apps', { size: 11.5, c: B.ink }) + T(180, 20, 'DBMS (software)', { size: 11.5, c }) + T(310, 20, 'Database (data)', { size: 11.5, c });
  b += R(14, 32, 80, 52, { r: 4, f: B.ink, sw: 1.6 }) + R(18, 36, 72, 44, { r: 1, f: '#fff', s: 'none', sw: 0 }) + t8(22, 46, 'Student form', { size: 7, c, w: 900 })
    + [['ID', '2026-0102'], ['Name', 'Ben Bautista'], ['Course', 'BSIT']].map(([k, v], i) => t8(22, 57 + i * 9, k, { size: 6.5 }) + R(44, 50 + i * 9, 42, 8, { r: 1, f: '#f3f5f8', s: 'none', sw: 0 }) + t8(46, 56.5 + i * 9, v, { size: 6, c: B.ink })).join('')
    + P('M6 86 L102 86 L96 92 L12 92 Z', B.grey, B.ink, 1.4);
  b += R(10, 110, 88, 46, { r: 10, f: B.butter, sw: 1.6 }) + T(54, 128, 'Query:', { size: 10.5, c: B.ink }) + T(54, 145, 'all BSIT 1A', { size: 10.5, w: 700 });
  b += T(54, 178, 'type in, ask,', { size: 10.5, w: 700, c: B.soft }) + T(54, 192, 'and update', { size: 10.5, w: 700, c: B.soft });
  b += R(122, 34, 116, 160, { r: 10, f: '#f6e3e3', s: c, sw: 2 });
  b += `<g transform="translate(180 60)">` + [0, 45, 90, 135].map((a) => `<rect x="-3.5" y="-15" width="7" height="30" rx="1.5" fill="${c}" transform="rotate(${a})"/>`).join('') + `<circle r="11" fill="${c}"/><circle r="4.5" fill="#f6e3e3"/></g>`;
  ['stores the data', 'finds it (queries)', 'checks the rules', 'controls access', 'backs it up'].forEach((s, i) => { b += `<circle cx="134" cy="${92 + i * 20}" r="2.6" fill="${c}"/>` + t8(141, 96 + i * 20, s, { size: 10, c: B.ink }); });
  b += T(180, 214, 'MySQL, Access, Oracle', { size: 10, w: 700, c: B.soft });
  b += ARROW(100, 104, 118, 104, B.soft, 2) + ARROW(118, 114, 100, 114, B.soft, 2) + ARROW(242, 104, 262, 104, B.soft, 2) + ARROW(262, 114, 242, 114, B.soft, 2);
  b += P('M266 44 V186 A44 11 0 0 0 354 186 V44', '#f6e3e3', B.ink, 2) + `<ellipse cx="310" cy="44" rx="44" ry="11" fill="#e8c3c3" stroke="${B.ink}" stroke-width="2"/>`;
  const mini = (y, name, cols) => R(278, y, 64, 44, { r: 2, f: '#fff', sw: 1.2 }) + `<rect x="278" y="${y}" width="64" height="11" fill="${c}"/>` + T(310, y + 8.5, name, { size: 7.5, c: '#fff', w: 900 })
    + t8(281, y + 19, cols, { size: 5.8, c: B.ink, w: 800 }) + [27, 35, 43].map((d) => L(278, y + d - 6, 342, y + d - 6, '#d5dbe4', 0.8)).join('') + L(278, y + 21, 342, y + 21, B.ink, 0.8);
  b += mini(66, 'Students', 'ID   Name   Course') + mini(130, 'Enrollments', 'ID   Subject   Grade');
  b += L(296, 110, 296, 130, c, 1.6, ' stroke-dasharray="3 3"') + t8(300, 124, 'linked by ID', { size: 6.5, c });
  b += T(312, 214, 'tables of related data', { size: 9.5, w: 700, c: B.soft });
  return svgWrap(368, 224, 'On the left, you and your apps: a student form on a laptop and a query, all BSIT 1A. In the middle, the DBMS, the software: it stores the data, finds it with queries, checks the rules, controls who sees it, and backs it up. Examples: MySQL, Microsoft Access, Oracle. On the right, the database, the data: a Students table and an Enrollments table, linked by ID.', b);
}

/* ---------- Part 7: other application software (small scenes, roughen them) ---------- */
export function othWeb() {
  let b = R(10, 8, 220, 112, { r: 6, f: '#fff', sw: 2 }) + `<path d="M16 8 H224 Q230 8 230 14 V26 H10 V14 Q10 8 16 8 Z" fill="${B.grey}" stroke="${B.ink}" stroke-width="2"/>` + R(18, 12, 60, 14, { r: 3, f: '#fff', sw: 1.2 });
  b += R(18, 32, 204, 12, { r: 6, f: '#eef1f5', sw: 1 }) + t8(26, 41, 'mail.example.com', { size: 7.5 });
  b += R(24, 56, 58, 40, { r: 3, f: B.blueWash, sw: 1.8 }) + P('M24 56 L53 80 L82 56', 'none', B.ink, 1.8);
  [56, 72, 88, 104].forEach((y, i) => { b += `<circle cx="100" cy="${y + 2}" r="3" fill="${[B.blue, B.orange, B.green, B.blueMid][i]}"/>` + L(108, y, 150, y, B.ink, 2) + L(108, y + 6, 212, y + 6, '#9aa6b8', 1.4); });
  return svgWrap(240, 128, 'A web browser with an email inbox: an envelope and four messages.', b);
}
export function othComm() {
  const tiles = [[B.blue, 26], [B.orange, 66], [B.green, 26], [B.amber, 66]].map(([sh, x], i) => { const y = i < 2 ? 26 : 50; return R(x, y, 38, 22, { r: 2, f: '#2b3650', s: 'none', sw: 0 }) + `<g transform="translate(${x + 19} ${y + 3}) scale(0.6)">${person(0, 0, sh)}</g>`; }).join('');
  let b = laptop3(18, 16, 104, tiles, '#1d2840');
  b += R(148, 20, 82, 30, { r: 12, f: B.blue, sw: 1.6 }) + L(160, 31, 216, 31, '#fff', 2) + L(160, 39, 196, 39, '#fff', 2) + P('M160 50 L156 60 L170 50', B.blue, B.ink, 1.4);
  b += R(158, 70, 72, 26, { r: 12, f: B.grey, sw: 1.6 }) + L(170, 83, 216, 83, B.soft, 2) + P('M218 96 L224 104 L208 96', B.grey, B.ink, 1.4);
  return svgWrap(240, 124, 'A video call with four people on a laptop, and two chat bubbles.', b);
}
export function othEdu() {
  const inner = R(26, 26, 88, 18, { r: 2, f: B.green, s: 'none', sw: 0 }) + T(70, 39, 'IT 110', { size: 9, c: '#fff' }) + [0, 1].map((i) => R(30, 50 + i * 14, 80, 11, { r: 2, f: '#fff', s: 'none', sw: 0 }) + `<circle cx="37" cy="${55.5 + i * 14}" r="2.6" fill="${B.green}"/>` + L(43, 55.5 + i * 14, 92, 55.5 + i * 14, B.soft, 1.3)).join('');
  let b = laptop3(20, 20, 100, inner, B.blueWash);
  b += P('M150 52 L190 34 L230 52 L190 70 Z', B.ink, B.ink, 1.6) + P('M168 60 V78 Q190 90 212 78 V60', B.blueMid, B.ink, 1.6) + L(228, 52, 228, 76, B.amber, 2) + `<circle cx="228" cy="78" r="3" fill="${B.amber}"/>`;
  return svgWrap(240, 124, 'A class page on a laptop with two assignments, and a graduation cap.', b);
}
export function othNotes() {
  let b = R(24, 10, 112, 108, { r: 4, f: '#fff', sw: 2 }) + [0, 1, 2, 3, 4].map((i) => `<circle cx="24" cy="${22 + i * 22}" r="4" fill="${B.paper}" stroke="${B.ink}" stroke-width="1.4"/>`).join('');
  b += L(40, 28, 104, 28, B.ink, 2.4);
  [46, 66, 86, 106].forEach((y, i) => { b += R(40, y - 9, 10, 10, { r: 2, f: '#fff', sw: 1.4 }) + (i < 2 ? P(`M41 ${y - 4} L44 ${y - 1} L49 ${y - 8}`, 'none', B.green, 2) : '') + L(56, y - 4, 124 - (i % 2) * 18, y - 4, '#9aa6b8', 1.6); });
  b += R(150, 26, 74, 70, { r: 2, f: B.butter, sw: 1.8 }) + L(160, 44, 214, 44, B.ink, 1.6) + L(160, 56, 206, 56, B.soft, 1.4) + L(160, 68, 210, 68, B.soft, 1.4) + L(160, 80, 196, 80, B.soft, 1.4);
  return svgWrap(240, 124, 'A notebook page with a checklist, two items checked, and a yellow sticky note.', b);
}
export function othPay() {
  const inner = R(86, 16, 68, 32, { r: 4, f: B.blue, s: 'none', sw: 0 }) + T(120, 28, 'Balance', { size: 7.5, c: '#fff', w: 700 }) + T(120, 42, '₱1,250', { size: 10.5, c: '#fff', w: 900 })
    + [['Send', 0], ['Pay bills', 1], ['Load', 2], ['Save', 3]].map(([n, i]) => { const x = 98 + (i % 2) * 44, y = 62 + Math.floor(i / 2) * 26; return `<circle cx="${x}" cy="${y}" r="7" fill="${[B.blue, B.orange, B.green, B.amber][i]}"/>` + T(x, y + 16, n, { size: 6.5, w: 800 }); }).join('');
  let b = phone(80, 6, 80, 116, '#fff', inner);
  b += C(196, 80, 16, B.amber, B.ink, 1.8) + T(196, 85, '₱', { size: 14, w: 900, c: B.ink }) + C(214, 100, 13, B.butter, B.ink, 1.6);
  b += P('M30 52 H60 M50 42 L60 52 L50 62', 'none', B.green, 2.4) + P('M60 86 H30 M40 76 L30 86 L40 96', 'none', B.orange, 2.4);
  return svgWrap(240, 128, 'A payment app on a phone showing a balance and buttons to send, pay bills, buy load, and save, with coins and arrows for money in and out.', b);
}
export function othDtp() {
  let b = P('M20 24 Q70 14 120 24 V116 Q70 106 20 116 Z', '#fff', B.ink, 2) + P('M120 24 Q170 14 220 24 V116 Q170 106 120 116 Z', '#fff', B.ink, 2);
  b += L(30, 36, 108, 36, B.ink, 4) + L(30, 46, 90, 46, B.orange, 2.4);
  [0, 1].forEach((k) => { [58, 66, 74, 82, 90, 98].forEach((y) => { b += L(30 + k * 42, y, 66 + k * 42, y, '#9aa6b8', 1.4); }); });
  b += R(132, 32, 76, 46, { r: 2, f: B.blueWash, sw: 1.4 }) + P('M136 74 L156 52 L170 66 L180 58 L204 74 Z', B.blue, B.ink, 1.2) + `<circle cx="192" cy="44" r="5" fill="${B.amber}"/>`;
  [88, 96, 104].forEach((y) => { b += L(132, y, 208, y, '#9aa6b8', 1.4); });
  return svgWrap(240, 128, 'An open magazine: a headline and two columns of text on the left page, a big picture and text on the right page.', b);
}
export function othPm() {
  let b = R(8, 8, 224, 112, { r: 6, f: '#eef2f7', sw: 2 });
  [['To do', 2, B.orange], ['Doing', 1, B.blue], ['Done', 2, B.green]].forEach(([n, k, f], i) => {
    const x = 16 + i * 72;
    b += R(x, 16, 64, 96, { r: 4, f: '#fff', s: B.line, sw: 1.2 }) + T(x + 32, 30, n, { size: 10, c: f });
    for (let j = 0; j < k; j++) b += R(x + 6, 38 + j * 24, 52, 18, { r: 3, f: i === 2 ? B.greenWash : '#fff', sw: 1.2 }) + `<rect x="${x + 6}" y="${38 + j * 24}" width="4" height="18" fill="${f}"/>` + L(x + 14, 47 + j * 24, x + (i === 2 ? 40 : 50), 47 + j * 24, B.soft, 1.4) + (i === 2 ? P(`M${x + 44} ${47 + j * 24} L${x + 47} ${50 + j * 24} L${x + 53} ${43 + j * 24}`, 'none', B.green, 1.8) : '');
  });
  return svgWrap(240, 128, 'A task board with three columns: To do, Doing, and Done, with task cards in each.', b);
}

/* ---------- chat 42 round 6: image editor + video editor windows (purple tags, legend in HTML) ---------- */
export function imgWindow() {
  const c = CAT.media, W = 340, H = 240;
  let b = R(4, 4, W - 8, H - 8, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, W - 8, '#3a3f4b') + T(W / 2, 18, 'Dahican.jpg @ 100% - Image editor', { size: 9, c: '#fff' });
  b += L(290, 14, 298, 14, '#fff', 1.4) + `<rect x="304" y="10" width="8" height="8" fill="none" stroke="#fff" stroke-width="1.2"/>` + L(317, 10, 325, 18, '#fff', 1.4) + L(325, 10, 317, 18, '#fff', 1.4);
  b += tabsRow(10, 35, ['File', 'Edit', 'Image', 'Layer', 'Select', 'Filter', 'View', 'Window', 'Help'], [], c, 7.8, 4.2, 8.5).s;
  b += `<rect x="4" y="40" width="${W - 8}" height="16" fill="#eef0f4"/>` + L(4, 40, W - 4, 40, B.line, 1) + L(4, 56, W - 4, 56, B.line, 1);
  b += `<circle cx="14" cy="48" r="4" fill="${B.ink}"/>` + t8(24, 51, 'Size: 25 px', { size: 7, c: B.ink }) + t8(80, 51, 'Opacity: 100%', { size: 7, c: B.ink }) + t8(146, 51, 'Mode: Normal', { size: 7, c: B.ink });
  b += `<rect x="4" y="56" width="26" height="${H - 60}" fill="#e3e6ec"/>` + L(30, 56, 30, H - 4, B.line, 1);
  const tool = (i, d) => { const y = 61 + i * 17, cx = 17, cy = y + 7; return `<rect x="10" y="${y}" width="14" height="14" rx="2" fill="${i === 4 ? '#e6dcf2' : '#fff'}" stroke="${i === 4 ? c : B.soft}" stroke-width="${i === 4 ? 1.4 : 0.7}"/>` + d(cx, cy); };
  b += tool(0, (x, y) => L(x - 4, y, x + 4, y, B.ink, 1.1) + L(x, y - 4, x, y + 4, B.ink, 1.1));
  b += tool(1, (x, y) => `<rect x="${x - 4}" y="${y - 3}" width="8" height="6" fill="none" stroke="${B.ink}" stroke-width="0.9" stroke-dasharray="1.5 1.2"/>`);
  b += tool(2, (x, y) => `<path d="M${x - 4} ${y} Q${x - 4} ${y - 4} ${x} ${y - 4} Q${x + 4} ${y - 4} ${x + 4} ${y} Q${x + 3} ${y + 3} ${x} ${y + 2} L${x - 2} ${y + 4}" fill="none" stroke="${B.ink}" stroke-width="0.9"/>`);
  b += tool(3, (x, y) => `<path d="M${x - 2} ${y - 5} V${y + 2} H${x + 5} M${x - 5} ${y - 2} H${x + 2} V${y + 5}" fill="none" stroke="${B.ink}" stroke-width="1"/>`);
  b += tool(4, (x, y) => L(x + 4, y - 4, x - 1, y + 1, '#8a5a2b', 1.4) + `<circle cx="${x - 2}" cy="${y + 2.5}" r="2" fill="${c}"/>`);
  b += tool(5, (x, y) => `<rect x="${x - 4}" y="${y - 2}" width="8" height="5" rx="1" fill="#f6c7d4" stroke="${B.ink}" stroke-width="0.8" transform="rotate(-30 ${x} ${y})"/>`);
  b += tool(6, (x, y) => T(x, y + 3.5, 'T', { size: 9, w: 900 }));
  b += tool(7, (x, y) => `<circle cx="${x - 1}" cy="${y - 1}" r="3" fill="none" stroke="${B.ink}" stroke-width="1"/>` + L(x + 1.5, y + 1.5, x + 4.5, y + 4.5, B.ink, 1.3));
  b += `<rect x="9" y="${H - 34}" width="11" height="11" fill="${B.blue}" stroke="${B.ink}" stroke-width="0.8"/><rect x="15" y="${H - 28}" width="11" height="11" fill="#fff" stroke="${B.ink}" stroke-width="0.8"/>` + `<rect x="9" y="${H - 34}" width="11" height="11" fill="${B.blue}" stroke="${B.ink}" stroke-width="0.8"/>`;
  b += `<rect x="30" y="56" width="216" height="${H - 60}" fill="#c9ccd3"/>`;
  b += `<rect x="44" y="66" width="188" height="130" fill="#9ec9f0"/><circle cx="196" cy="92" r="13" fill="${B.amber}"/><rect x="44" y="128" width="188" height="24" fill="#3d7fbf"/>`
    + `<path d="M44 140 Q80 134 116 140 T188 140 T232 138" fill="none" stroke="#fff" stroke-width="1.6"/><rect x="44" y="152" width="188" height="44" fill="#f1d9a6"/>`
    + `<path d="M70 196 Q74 168 66 146 M66 146 Q54 140 46 146 M66 146 Q76 136 88 142 M66 146 Q64 134 72 128" fill="none" stroke="#2f7d55" stroke-width="2.4" stroke-linecap="round"/>`;
  b += `<text x="138" y="110" text-anchor="middle" font-family="Nunito, system-ui, sans-serif" font-size="17" font-weight="900" fill="#fff" stroke="${B.ink}" stroke-width="0.8">Dahican!</text>`;
  b += `<rect x="178" y="74" width="36" height="36" fill="none" stroke="${B.ink}" stroke-width="1" stroke-dasharray="3 2"/>`;
  b += t8(36, H - 10, '100%  ·  1920 × 1080 px', { size: 6.8, c: B.ink });
  b += `<rect x="246" y="56" width="${W - 250}" height="${H - 60}" fill="#f3f5f8"/>` + L(246, 56, 246, H - 4, B.line, 1) + t8(254, 70, 'Layers', { size: 8.5, c: B.ink, w: 900 });
  [['Text', 'T'], ['Brightness', ''], ['Background', 'bg']].forEach(([n, k], i) => {
    const y = 78 + i * 28, on = i === 0;
    b += `<rect x="250" y="${y}" width="${W - 258}" height="24" rx="2" fill="${on ? '#ece3f5' : '#fff'}" stroke="${on ? c : B.line}" stroke-width="${on ? 1.3 : 0.8}"/>`
      + `<ellipse cx="258" cy="${y + 12}" rx="4" ry="2.6" fill="none" stroke="${B.ink}" stroke-width="0.9"/><circle cx="258" cy="${y + 12}" r="1.2" fill="${B.ink}"/>`
      + (k === 'bg' ? `<rect x="266" y="${y + 4}" width="22" height="16" fill="#9ec9f0"/><rect x="266" y="${y + 13}" width="22" height="7" fill="#f1d9a6"/>` : k === 'T' ? `<rect x="266" y="${y + 4}" width="22" height="16" fill="#fff" stroke="${B.soft}" stroke-width="0.6"/>` + T(277, y + 16, 'T', { size: 9, w: 900 }) : `<rect x="266" y="${y + 4}" width="22" height="16" fill="#fff" stroke="${B.soft}" stroke-width="0.6"/><circle cx="277" cy="${y + 12}" r="5" fill="${B.ink}"/><path d="M277 ${y + 7} A5 5 0 0 1 277 ${y + 17} Z" fill="#fff"/>`)
      + t8(292, y + 15, n, { size: 6.6, c: B.ink });
  });
  b += t8(254, H - 12, '+  New layer', { size: 7, c: B.soft });
  b += frameEnd(W, H);
  b += tag(296, 31, 1, c) + tag(232, 48, 2, c) + tag(40, 76, 3, c) + tag(222, 186, 4, c) + tag(322, 66, 5, c) + tag(38, H - 24, 6, c);
  return svgWrap(W, H, 'An image editor like Photoshop or GIMP, editing a photo of Dahican beach. At the top is the menu bar from File to Help, and an options bar with brush size 25 px and opacity 100%. On the left is the toolbox: move, select, lasso, crop, brush, eraser, text, and zoom, with the color squares below. In the middle is the canvas: the beach photo with the word Dahican! on it. On the right is the Layers panel: Text, Brightness, and Background.', b);
}
export function vidWindow() {
  const c = CAT.media, W = 340, H = 244;
  let b = R(4, 4, W - 8, H - 8, { r: 6, f: '#fff', s: 'none', sw: 0 }) + ttl(4, W - 8, '#20242c') + T(150, 18, 'My vlog - Video editor', { size: 9, c: '#fff' });
  b += R(274, 7, 52, 14, { r: 7, f: c, s: '#fff', sw: 1 }) + T(300, 17.5, 'Export', { size: 8, c: '#fff', w: 900 });
  b += `<rect x="4" y="24" width="120" height="104" fill="#eef0f4"/>` + t8(10, 36, 'Media', { size: 8.5, c: B.ink, w: 900 });
  const thumb = (x, y, k) => {
    let s = `<rect x="${x}" y="${y}" width="34" height="22" rx="2" fill="${['#9ec9f0', '#f1d9a6', '#3d7fbf', '#e9c3a0', '#2f7d55', '#ece3f5'][k]}" stroke="${B.soft}" stroke-width="0.7"/>`;
    if (k === 5) s += T(x + 17, y + 16, '♪', { size: 11, c, w: 900 }); else s += `<rect x="${x}" y="${y + 14}" width="34" height="8" fill="${k % 2 ? '#3d7fbf' : '#f1d9a6'}"/>`;
    return s + t8(x + 33, y + 30, ['0:08', '0:15', '0:21', '0:05', '0:12', '1:30'][k], { size: 5.8, a: 'end', c: B.soft });
  };
  [0, 1, 2, 3, 4, 5].forEach((k) => { b += thumb(10 + (k % 3) * 38, 42 + Math.floor(k / 3) * 40, k); });
  b += `<rect x="124" y="24" width="${W - 128}" height="104" fill="#1d2028"/>`;
  b += `<rect x="150" y="32" width="160" height="78" fill="#9ec9f0"/><circle cx="282" cy="52" r="9" fill="${B.amber}"/><rect x="150" y="76" width="160" height="16" fill="#3d7fbf"/><rect x="150" y="92" width="160" height="18" fill="#f1d9a6"/>`;
  b += `<text x="230" y="66" text-anchor="middle" font-family="Nunito, system-ui, sans-serif" font-size="14" font-weight="900" fill="#fff" stroke="${B.ink}" stroke-width="0.7">Day 1!</text>`;
  b += `<path d="M156 116 L156 124 L163 120 Z" fill="#fff"/>` + t8(170, 123, '00:12 / 01:30', { size: 7, c: '#fff', mono: true }) + L(232, 120, 304, 120, '#6b7688', 2) + L(232, 120, 244, 120, c, 2);
  b += `<rect x="4" y="128" width="${W - 8}" height="${H - 132}" fill="#f3f5f8"/>` + L(4, 128, W - 4, 128, B.line, 1);
  b += `<rect x="4" y="128" width="22" height="${H - 132}" fill="#e3e6ec"/>`;
  ['0:00', '0:15', '0:30', '0:45', '1:00', '1:15'].forEach((t, i) => { const x = 30 + i * 50; b += L(x, 134, x, 142, '#9aa6b8', 0.9) + t8(x + 2, 140, t, { size: 5.8 }); });
  [...Array(30)].forEach((_, i) => { b += L(30 + i * 10, 138, 30 + i * 10, 142, '#c9d2df', 0.6); });
  b += t8(15, 160, 'T', { size: 8, c: B.ink, a: 'middle', w: 900 }) + t8(15, 186, 'V', { size: 8, c: B.ink, a: 'middle', w: 900 }) + t8(15, 218, 'A', { size: 8, c: B.ink, a: 'middle', w: 900 });
  b += `<rect x="130" y="150" width="70" height="14" rx="3" fill="${c}"/>` + t8(136, 160, 'Text: Day 1!', { size: 6.8, c: '#fff' });
  [[30, 96, '#9ec9f0'], [98, 170, '#f1d9a6'], [172, 230, '#3d7fbf'], [232, 300, '#e9c3a0']].forEach(([x1, x2, f]) => {
    b += `<rect x="${x1}" y="${172}" width="${x2 - x1 - 1}" height="24" rx="2" fill="${f}" stroke="${B.ink}" stroke-width="0.8"/>` + [0, 1, 2].map((k) => `<rect x="${x1 + 3 + k * 12}" y="175" width="10" height="7" fill="#fff" opacity="0.6"/>`).join('');
  });
  b += `<rect x="30" y="204" width="290" height="26" rx="2" fill="#dcefe2" stroke="${B.green}" stroke-width="0.9"/>` + t8(34, 212, '♪ music.mp3', { size: 6.2, c: B.green });
  [...Array(56)].forEach((_, i) => { const h = 3 + Math.abs(Math.sin(i * 1.7)) * 7; b += L(34 + i * 5, 222 - h / 2, 34 + i * 5, 222 + h / 2, B.green, 1.2); });
  b += L(90, 132, 90, 234, B.red, 1.8) + `<path d="M85 130 H95 V135 L90 140 L85 135 Z" fill="${B.red}"/>`;
  b += frameEnd(W, H);
  b += tag(110, 32, 1, c) + tag(322, 38, 2, c) + tag(322, 160, 3, c) + tag(104, 158, 4, c) + tag(262, 14, 5, c);
  return svgWrap(W, H, 'A video editor like CapCut or Premiere Pro. At the top left is the media panel with video clips and a music file. At the top right, the preview plays the video, now at 00:12 of 01:30, showing a beach scene with the text Day 1!. At the bottom is the timeline: a text track, a video track with four clips, and an audio track with the music waveform. A red playhead marks the current moment. The Export button is at the top right.', b);
}
