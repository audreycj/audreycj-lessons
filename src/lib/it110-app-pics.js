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
  const kinds = [['Commercial', '', false, '₱ pay', B.orangeInk], ['Shareware', '', false, 'try, then ₱', B.orangeInk], ['Freeware', '', false, 'free', B.green], ['Open', 'source', true, 'free', B.green], ['Public', 'domain', true, 'free', B.green]];
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
