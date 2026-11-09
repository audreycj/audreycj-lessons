// IT 110 Networks + Internet pictures (chat 49). Clean SVG strings, same palette and helpers as the other IT 110 files.
// Real-life scenes may be wrapped in roughen() by the page; mechanism pictures stay clean. No logos: generic devices only.
// Example IP addresses use the ranges set aside for examples (192.0.2.x, 203.0.113.x) or private home ranges (192.168.x.x).
import { B, T, R, ARROW, svgWrap } from './it110-illus.js';

const L = (x1, y1, x2, y2, c = B.ink, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
const C = (cx, cy, r, f = B.card, s = B.ink, w = 2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${s}" stroke-width="${w}"/>`;
const P = (d, f = 'none', s = B.ink, w = 2) => `<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const lab = (x, y, s, o = {}) => T(x, y, s, { size: o.size ?? 12, w: o.w ?? 700, a: o.a ?? 'middle', c: o.c ?? B.soft });
const DASH = ' stroke-dasharray="5 5"';
const WIRE = B.ink, AIR = B.blue, HOT = B.orange;

/* ---------- small device icons (x, y = top-left) ---------- */
const laptopI = (x, y, w = 56, fill = B.blueWash) => {
  const h = Math.round(w * 0.62);
  return R(x, y, w, h, { r: 4, f: B.ink, sw: 2 }) + R(x + 4, y + 4, w - 8, h - 8, { r: 1, f: fill, s: 'none', sw: 0 })
    + P(`M${x - 6} ${y + h + 1} L${x + w + 6} ${y + h + 1} L${x + w} ${y + h + 8} L${x} ${y + h + 8} Z`, B.grey);
};
const phoneI = (x, y, w = 24, h = 42, fill = B.blueWash) => R(x, y, w, h, { r: 5, f: B.ink, sw: 2 }) + R(x + 3, y + 6, w - 6, h - 12, { r: 1, f: fill, s: 'none', sw: 0 });
const pcI = (x, y, w = 50, fill = B.blueWash) => R(x, y, w, w * 0.66, { r: 3, f: B.ink, sw: 2 }) + R(x + 4, y + 4, w - 8, w * 0.66 - 8, { r: 1, f: fill, s: 'none', sw: 0 })
  + L(x + w / 2, y + w * 0.66, x + w / 2, y + w * 0.66 + 8) + L(x + w / 2 - 12, y + w * 0.66 + 9, x + w / 2 + 12, y + w * 0.66 + 9, B.ink, 2.4);
const printerI = (x, y) => R(x + 10, y, 32, 12, { r: 1, f: B.card, sw: 1.6 }) + R(x, y + 10, 52, 24, { r: 5, f: B.grey, sw: 2 }) + R(x + 10, y + 30, 32, 10, { r: 1, f: B.card, sw: 1.6 }) + C(x + 44, y + 18, 2.4, B.green, 'none', 0);
const tvI = (x, y, w = 64) => R(x, y, w, w * 0.6, { r: 3, f: B.ink, sw: 2 }) + R(x + 4, y + 4, w - 8, w * 0.6 - 8, { r: 1, f: '#5a7fb8', s: 'none', sw: 0 }) + L(x + 10, y + w * 0.6, x + 6, y + w * 0.6 + 7) + L(x + w - 10, y + w * 0.6, x + w - 6, y + w * 0.6 + 7);
const routerI = (x, y, w = 70) => L(x + 12, y, x + 6, y - 18, B.ink, 3) + L(x + w - 12, y, x + w - 6, y - 18, B.ink, 3)
  + R(x, y, w, 22, { r: 7, f: B.blueWash, sw: 2 }) + [0, 1, 2, 3].map((k) => C(x + 16 + k * 12, y + 11, 2.6, k === 3 ? B.amber : B.green, 'none', 0)).join('');
const switchI = (x, y, w = 96, n = 6) => R(x, y, w, 20, { r: 4, f: B.grey, sw: 2 }) + Array.from({ length: n }, (_, k) => R(x + 8 + k * ((w - 16) / n), y + 6, (w - 16) / n - 4, 9, { r: 1, f: B.ink, s: 'none', sw: 0 })).join('');
const serverI = (x, y, w = 40, h = 58) => R(x, y, w, h, { r: 4, f: '#3b4659', sw: 2 }) + [0, 1, 2].map((k) => L(x + 6, y + 12 + k * 16, x + w - 14, y + 12 + k * 16, '#9fb0c8', 2) + C(x + w - 8, y + 12 + k * 16, 2.4, B.green, 'none', 0)).join('');
const cloudP = (cx, cy, s = 1, f = B.card, st = B.ink) => P(`M${cx - 52 * s} ${cy + 18 * s} Q${cx - 70 * s} ${cy - 2 * s} ${cx - 44 * s} ${cy - 10 * s} Q${cx - 40 * s} ${cy - 34 * s} ${cx - 12 * s} ${cy - 28 * s} Q${cx + 6 * s} ${cy - 46 * s} ${cx + 30 * s} ${cy - 26 * s} Q${cx + 62 * s} ${cy - 28 * s} ${cx + 56 * s} ${cy} Q${cx + 72 * s} ${cy + 14 * s} ${cx + 50 * s} ${cy + 18 * s} Z`, f, st, 2);
const wifiArcs = (x, y, c = AIR, s = 1) => [8, 15, 22].map((r) => P(`M${x - r * 0.75 * s} ${y - r * 0.6 * s} A${r * s} ${r * s} 0 0 1 ${x + r * 0.75 * s} ${y - r * 0.6 * s}`, 'none', c, 2.2)).join('') + C(x, y, 2.4 * s, c, 'none', 0);
const towerI = (x, y, h = 90) => P(`M${x - 16} ${y + h} L${x} ${y} L${x + 16} ${y + h}`, 'none', B.ink, 2.4) + [0.3, 0.55, 0.8].map((t) => L(x - 16 * t, y + h * t, x + 16 * t, y + h * t, B.ink, 1.6)).join('')
  + R(x - 4, y + 4, 8, 16, { r: 2, f: B.grey, sw: 1.6 });
const dishI = (x, y, flip = false) => { const d = flip ? -1 : 1; return P(`M${x} ${y - 16} Q${x + 14 * d} ${y} ${x} ${y + 16}`, B.grey, B.ink, 2) + L(x + 2 * d, y, x + 14 * d, y, B.ink, 1.6) + C(x + 15 * d, y, 2.4, B.ink, 'none', 0); };
const houseI = (x, y, w = 70, f = B.butter) => P(`M${x} ${y + 26} L${x + w / 2} ${y} L${x + w} ${y + 26}`, f, B.ink, 2) + R(x + 6, y + 24, w - 12, 36, { r: 2, f: B.card, sw: 2 });
const satI = (x, y, s = 1) => R(x - 7 * s, y - 7 * s, 14 * s, 14 * s, { r: 2, f: B.grey, sw: 1.6 }) + R(x - 30 * s, y - 5 * s, 20 * s, 10 * s, { r: 1, f: B.blueMid, sw: 1.4 }) + R(x + 10 * s, y - 5 * s, 20 * s, 10 * s, { r: 1, f: B.blueMid, sw: 1.4 });

/* ================= COMPUTER NETWORKS ================= */

/** A home network: router in the middle, wired and wireless devices, line to the Internet. */
export function netHome() {
  let b = cloudP(200, 34, 0.62, B.blueWash) + T(200, 40, 'Internet', { size: 13, c: B.blueInk });
  b += L(200, 50, 200, 104, WIRE, 2.4);
  b += routerI(165, 108) + lab(258, 124, 'router', { size: 12, w: 800, c: B.ink, a: 'start' });
  // wireless: laptop, phone, TV
  b += laptopI(30, 50) + lab(58, 102, 'laptop (Wi-Fi)');
  b += phoneI(338, 46) + lab(350, 102, 'phone (Wi-Fi)');
  b += tvI(318, 176, 60) + lab(348, 228, 'smart TV (Wi-Fi)');
  b += L(160, 112, 92, 74, AIR, 2.2, DASH) + L(240, 112, 334, 72, AIR, 2.2, DASH) + L(238, 128, 320, 180, AIR, 2.2, DASH);
  // wired: desktop and printer
  b += pcI(28, 172) + lab(53, 226, 'desktop (cable)');
  b += printerI(160, 182) + lab(186, 238, 'printer (cable)');
  b += L(170, 130, 80, 178, WIRE, 2.4) + L(195, 130, 186, 182, WIRE, 2.4);
  // legend
  b += L(250, 252, 276, 252, WIRE, 2.4) + lab(280, 256, 'cable', { a: 'start', size: 11 }) + L(318, 252, 344, 252, AIR, 2.2, DASH) + lab(348, 256, 'wireless', { a: 'start', size: 11 });
  return svgWrap(400, 264, 'A home network. A router in the middle connects to the Internet. A laptop, a phone, and a smart TV connect to it wirelessly (dashed lines). A desktop and a printer connect with cables (solid lines).', b);
}

/* topology helpers */
const node = (x, y, f = B.card, s = B.ink) => R(x - 13, y - 9, 26, 18, { r: 3, f, s, sw: 2 });
const X = (x, y) => L(x - 7, y - 7, x + 7, y + 7, B.red, 3.4) + L(x - 7, y + 7, x + 7, y - 7, B.red, 3.4);
const OFF = '#e4e7ec';
/** One topology. kind: star | bus | ring | mesh. brk = one cable is cut (red X), lost devices turn grey. */
export function topo(kind, brk = false) {
  let b = '';
  const cx = 90, cy = 66;
  if (kind === 'star') {
    const pts = [[30, 22], [150, 22], [20, 100], [160, 100], [90, 122]];
    pts.forEach(([x, y], i) => { b += L(cx, cy, x, y, brk && i === 1 ? OFF : WIRE, 2.2); });
    if (brk) b += X(120, 44);
    pts.forEach(([x, y], i) => { b += node(x, y, brk && i === 1 ? OFF : B.card, brk && i === 1 ? '#a3abb8' : B.ink); });
    b += R(cx - 22, cy - 11, 44, 22, { r: 5, f: B.blueWash, sw: 2 }) + T(cx, cy + 5, 'switch', { size: 11, c: B.blueInk });
  } else if (kind === 'bus') {
    b += R(8, 66, 8, 12, { r: 1, f: B.ink, sw: 1 }) + R(164, 66, 8, 12, { r: 1, f: B.ink, sw: 1 });
    if (!brk) b += L(14, 72, 166, 72, WIRE, 3.4);
    else b += L(14, 72, 70, 72, OFF, 3.4) + L(84, 72, 166, 72, OFF, 3.4) + X(77, 72);
    [[34, 28], [90, 28], [146, 28], [60, 114], [118, 114]].forEach(([x, y]) => { b += L(x, y < 72 ? y + 9 : y - 9, x, 72, brk ? OFF : WIRE, 2) + node(x, y, brk ? OFF : B.card, brk ? '#a3abb8' : B.ink); });
  } else if (kind === 'ring') {
    const n = 6, r = 48, pts = Array.from({ length: n }, (_, k) => [cx + r * Math.cos(-Math.PI / 2 + k * 2 * Math.PI / n), cy + r * Math.sin(-Math.PI / 2 + k * 2 * Math.PI / n)].map((v) => Math.round(v)));
    pts.forEach(([x, y], k) => { const [x2, y2] = pts[(k + 1) % n]; b += (brk && k === 1) ? L(x, y, x2, y2, OFF, 2.2) : ARROW(x + (x2 - x) * 0.25, y + (y2 - y) * 0.25, x + (x2 - x) * 0.75, y + (y2 - y) * 0.75, brk ? '#a3abb8' : WIRE, 2.2) + L(x, y, x2, y2, brk ? OFF : WIRE, 1.2); });
    if (brk) b += X((pts[1][0] + pts[2][0]) / 2, (pts[1][1] + pts[2][1]) / 2);
    pts.forEach(([x, y]) => { b += node(x, y, brk ? OFF : B.card, brk ? '#a3abb8' : B.ink); });
  } else {
    const pts = [[90, 18], [158, 58], [132, 118], [48, 118], [22, 58]];
    pts.forEach(([x, y], i) => pts.forEach(([x2, y2], j) => { if (j > i) { const cut = brk && i === 0 && j === 2; b += L(x, y, x2, y2, cut ? OFF : WIRE, 1.8); } }));
    if (brk) b += X(111, 68);
    if (brk) b += P('M90 18 L158 58 L132 118', 'none', HOT, 3.4);
    pts.forEach(([x, y]) => { b += node(x, y); });
  }
  const names = { star: 'Star', bus: 'Bus', ring: 'Ring', mesh: 'Mesh' };
  const say = brk ? { star: 'Only that one device is cut off.', bus: 'The main cable is cut: everyone is cut off.', ring: 'The ring is broken: data cannot go around.', mesh: 'Data takes another path (orange).' }[kind] : '';
  return svgWrap(180, 140, `${names[kind]} topology${brk ? ' with one cable cut. ' + say : ''}`, b);
}

/** Client-server vs. peer-to-peer, side by side. */
export function cliServP2p() {
  let b = T(100, 18, 'Client-server', { size: 14 }) + T(300, 18, 'Peer-to-peer (P2P)', { size: 14 });
  b += serverI(80, 30) + lab(100, 104, 'server: gives', { size: 11, c: B.blueInk });
  [[16, 130], [76, 140], [136, 130]].forEach(([x, y]) => { b += L(100, 88, x + 24, y, AIR, 2) + laptopI(x, y, 48); });
  b += lab(100, 186, 'clients: ask and receive', { size: 11 });
  b += L(200, 30, 200, 186, B.line, 1.6, DASH);
  const p = [[240, 40], [330, 40], [240, 130], [330, 130]];
  p.forEach(([x, y], i) => p.forEach(([x2, y2], j) => { if (j > i) b += L(x + 24, y + 15, x2 + 24, y2 + 15, HOT, 2); }));
  p.forEach(([x, y]) => { b += laptopI(x, y, 48); });
  b += lab(300, 186, 'each one gives AND asks', { size: 11 });
  return svgWrap(400, 196, 'Left, client-server: one server gives files and services to three client laptops. Right, peer-to-peer: four laptops connect to each other directly; each one both shares and uses.', b);
}


/** VPN: an encrypted tunnel through the public Internet to a private network. */
export function vpnTunnel() {
  let b = laptopI(16, 70, 58) + lab(45, 128, 'you, at home');
  b += cloudP(200, 86, 1.12, '#f1f3f6', '#9aa5b6') + lab(200, 42, 'the public Internet', { size: 11.5 });
  b += R(80, 82, 236, 22, { r: 11, f: B.greenWash, s: B.green, sw: 2.4 });
  b += R(190, 76, 20, 16, { r: 3, f: B.green, s: 'none', sw: 0 }) + P('M194 77 L194 70 Q200 62 206 70 L206 77', 'none', B.green, 2.6);
  b += T(200, 118, 'encrypted tunnel (VPN)', { size: 12, c: B.green });
  b += R(318, 54, 70, 74, { r: 4, f: B.blueWash, sw: 2 }) + [0, 1, 2].map((r) => [0, 1].map((c) => R(328 + c * 30, 64 + r * 20, 20, 12, { r: 1, f: B.card, sw: 1.4 })).join('')).join('');
  b += lab(353, 146, 'school or company', { size: 11 }) + lab(353, 160, 'network (intranet)', { size: 11 });
  return svgWrap(400, 170, 'A VPN. A laptop at home connects to a school or company network through an encrypted green tunnel that passes through the public Internet.', b);
}


/** Analog wave vs. digital signal. */
export function analogDigital() {
  let b = T(12, 20, 'Analog', { size: 14, a: 'start', c: B.blueInk }) + lab(76, 20, 'a smooth wave that changes continuously', { a: 'start', size: 11 });
  let d = 'M14 62';
  for (let x = 14; x <= 346; x += 4) d += ` L${x} ${(62 - 26 * Math.sin((x - 14) / 22)).toFixed(1)}`;
  b += P(d, 'none', B.blue, 2.6) + L(14, 62, 346, 62, B.line, 1);
  b += T(12, 116, 'Digital', { size: 14, a: 'start', c: B.orangeInk }) + lab(76, 116, 'only two states: off (0) and on (1)', { a: 'start', size: 11 });
  const bits = [1, 0, 1, 1, 0, 0, 1, 0];
  let s = `M14 ${bits[0] ? 130 : 170}`;
  bits.forEach((v, i) => { const y = v ? 130 : 170; s += ` L${14 + i * 41} ${y} L${14 + (i + 1) * 41} ${y}`; });
  b += P(s, 'none', HOT, 2.6);
  bits.forEach((v, i) => { b += T(34 + i * 41, 192, String(v), { size: 14, mono: true, c: B.ink }); });
  return svgWrap(360, 200, 'Top: an analog signal is a smooth wave. Bottom: a digital signal jumps between two levels, standing for the bits 1 0 1 1 0 0 1 0.', b);
}










/* ===== chat 50: icons for cards and tables (small, clean, 48 x 48) ===== */
const icoWrap = (label, body) => `<svg class="clean ico" viewBox="0 0 48 48" role="img" aria-label="${label}">${body}</svg>`;
const envelope = (x, y, w = 28, h = 20, f = B.card) => R(x, y, w, h, { r: 3, f, sw: 2 }) + P(`M${x + 2} ${y + 3} L${x + w / 2} ${y + h * 0.6} L${x + w - 2} ${y + 3}`, 'none', B.ink, 2);
const folderI = (x, y, w = 30, h = 22, f = B.butter) => P(`M${x} ${y + 4} L${x} ${y + h} L${x + w} ${y + h} L${x + w} ${y + 6} L${x + w * 0.45} ${y + 6} L${x + w * 0.35} ${y} L${x + 2} ${y} Z`, f, B.ink, 2);
const lockI = (x, y, s = 1, c = B.green) => P(`M${x - 6 * s} ${y} L${x - 6 * s} ${y - 6 * s} Q${x} ${y - 14 * s} ${x + 6 * s} ${y - 6 * s} L${x + 6 * s} ${y}`, 'none', c, 2.4) + R(x - 9 * s, y, 18 * s, 13 * s, { r: 2, f: c, s: 'none', sw: 0 });
const ICONS = {
  // purposes of a network
  internet: () => C(24, 24, 17, B.blueWash, B.blue, 2) + P('M7 24 L41 24 M24 7 Q14 24 24 41 M24 7 Q34 24 24 41', 'none', B.blue, 1.8),
  printer: () => R(14, 8, 20, 10, { r: 1, f: B.card, sw: 1.8 }) + R(6, 16, 36, 18, { r: 4, f: B.grey, sw: 2 }) + R(14, 28, 20, 13, { r: 1, f: B.card, sw: 1.8 }) + L(18, 33, 30, 33, B.line, 1.6) + C(36, 22, 2.2, B.green, 'none', 0),
  files: () => folderI(4, 16, 22, 17) + folderI(24, 16, 22, 17, B.blueWash) + ARROW(16, 10, 34, 10, HOT, 2),
  chat: () => R(4, 6, 28, 18, { r: 6, f: B.blueWash, s: B.blue, sw: 2 }) + P('M10 24 L8 31 L17 24', B.blueWash, B.blue, 2) + R(18, 22, 26, 17, { r: 6, f: B.orangeWash, s: HOT, sw: 2 }) + P('M38 39 L40 45 L32 39', B.orangeWash, HOT, 2),
  together: () => R(10, 4, 28, 38, { r: 3, f: B.card, sw: 2 }) + [12, 18, 24, 30].map((y) => L(15, y, 33, y, B.line, 2)).join('') + P('M30 22 L30 33 L33 30 L36 35', 'none', HOT, 2) + P('M16 26 L16 37 L19 34 L22 39', 'none', B.blue, 2),
  software: () => [0, 1, 2].map((k) => R(4 + k * 14, 14, 12, 10, { r: 2, f: B.blueWash, sw: 1.6 }) + L(10 + k * 14, 24, 10 + k * 14, 30, B.ink, 1.6)).join('') + L(10, 30, 38, 30, B.ink, 1.6) + L(24, 30, 24, 36) + R(14, 36, 20, 8, { r: 2, f: B.butter, sw: 1.6 }),
  // uses of networks
  phone: () => phoneI(14, 4, 20, 38) + [0, 1, 2].map((k) => L(36 + k * 4, 18 - k * 4, 36 + k * 4, 22, B.blue, 2.4)).join(''),
  map: () => P('M4 12 L16 8 L30 12 L44 8 L44 38 L30 42 L16 38 L4 42 Z', B.greenWash, B.ink, 1.8) + P('M16 8 L16 38 M30 12 L30 42', 'none', B.line, 1.6) + P('M24 30 Q15 20 18 15 Q24 8 30 15 Q33 20 24 30 Z', B.red, B.ink, 1.6) + C(24, 17, 3, '#fff', 'none', 0),
  pay: () => phoneI(6, 6, 20, 36) + R(24, 20, 20, 13, { r: 2, f: B.amber, sw: 1.8 }) + L(24, 25, 44, 25, B.ink, 2) + ARROW(28, 14, 40, 14, B.green, 2),
  classes: () => laptopI(2, 8, 44) + C(24, 16, 4, B.skin, 'none', 0) + P('M17 26 Q24 19 31 26', B.blue, 'none', 0),
  cctv: () => P('M6 14 L32 8 L36 20 L10 26 Z', B.card, B.ink, 2) + C(34, 15, 3, B.ink, 'none', 0) + L(20, 24, 22, 34, B.ink, 2.4) + L(14, 38, 30, 38, B.ink, 2.4) + C(40, 10, 2, B.red, 'none', 0),
  smart: () => P('M18 24 Q18 12 28 12 Q38 12 38 24 Q38 30 33 34 L33 38 L23 38 L23 34 Q18 30 18 24 Z', B.amber, B.ink, 2) + L(24, 42, 32, 42, B.ink, 2.4) + phoneI(2, 18, 14, 26) + P('M8 12 Q12 8 16 12', 'none', AIR, 2) + P('M5 9 Q12 2 19 9', 'none', AIR, 2),
  stream: () => tvI(4, 8, 40) + P('M20 14 L20 26 L30 20 Z', '#fff', 'none', 0),
  doctor: () => laptopI(2, 8, 44) + R(20, 12, 8, 14, { r: 1, f: B.red, s: 'none', sw: 0 }) + R(17, 15, 14, 8, { r: 1, f: B.red, s: 'none', sw: 0 }),
  // wired vs wireless rows
  speed: () => P('M6 34 A18 18 0 0 1 42 34', 'none', B.ink, 2.4) + P('M9 26 A16 16 0 0 1 16 18', 'none', B.green, 4) + P('M32 18 A16 16 0 0 1 39 26', 'none', B.red, 4) + L(24, 34, 33, 21, HOT, 3) + C(24, 34, 3.4, B.ink, 'none', 0),
  move: () => C(22, 9, 4.5, B.ink, 'none', 0) + P('M22 15 L20 28 L13 40 M20 28 L28 40 M21 18 L13 24 M21 18 L30 22', 'none', B.ink, 3) + ARROW(32, 32, 44, 32, HOT, 2.2),
  setup: () => C(18, 24, 12, 'none', B.ink, 2.6) + C(18, 24, 6, 'none', B.ink, 2.6) + P('M30 24 Q36 24 36 32 L36 38', 'none', B.ink, 2.6) + R(32, 37, 8, 8, { r: 1, f: B.blueWash, sw: 1.6 }),
  security: () => lockI(24, 22, 1.5),
  // bandwidth units
  dialup: () => P('M8 18 Q8 8 24 8 Q40 8 40 18 L34 20 L32 15 L16 15 L14 20 Z', B.grey, B.ink, 2) + R(10, 22, 28, 18, { r: 4, f: B.butter, sw: 2 }) + C(24, 31, 5, B.card, B.ink, 1.6),
  homenet: () => routerI(6, 26, 36),
  bignet: () => serverI(6, 4, 17, 40) + serverI(26, 4, 17, 40),
  // protocols
  http: () => R(4, 8, 40, 32, { r: 4, f: B.card, sw: 2 }) + R(4, 8, 40, 9, { r: 4, f: B.blueWash, sw: 2 }) + C(9, 12.5, 1.6, HOT, 'none', 0) + lockI(24, 29, 0.75),
  dns: () => R(8, 4, 30, 40, { r: 3, f: B.blueWash, sw: 2 }) + L(14, 4, 14, 44, B.ink, 2) + [0, 1, 2, 3].map((k) => R(38, 7 + k * 9, 6, 7, { r: 1, f: [HOT, B.amber, B.green, B.blueMid][k], s: B.ink, sw: 1 }) + L(19, 12 + k * 9, 33, 12 + k * 9, B.line, 2)).join(''),
  smtp: () => envelope(4, 16) + ARROW(34, 26, 46, 26, HOT, 2.4),
  imap: () => P('M6 28 L14 14 L34 14 L42 28 L42 40 L6 40 Z', B.blueWash, B.ink, 2) + P('M6 28 L16 28 L19 33 L29 33 L32 28 L42 28', 'none', B.ink, 2) + ARROW(24, 2, 24, 22, HOT, 2.4),
  ftp: () => folderI(4, 14, 28, 24) + ARROW(38, 40, 38, 14, B.green, 2.4) + ARROW(45, 14, 45, 40, B.blue, 2.4),
  // standards
  ethernet: () => R(16, 4, 16, 14, { r: 1, f: B.ink, sw: 0, s: 'none' }) + R(12, 16, 24, 20, { r: 2, f: '#e8f0fb', s: B.ink, sw: 2 }) + [0, 1, 2, 3, 4, 5].map((k) => L(15 + k * 3.6, 18, 15 + k * 3.6, 24, B.amber, 1.4)).join('') + R(20, 36, 8, 8, { r: 1, f: B.ink, s: 'none', sw: 0 }),
  wifi: () => wifiArcs(24, 38, AIR, 1.5),
  bluetooth: () => C(14, 22, 8, B.card, B.ink, 2) + L(16, 29, 18, 40, B.ink, 3) + C(34, 22, 8, B.card, B.ink, 2) + L(32, 29, 30, 40, B.ink, 3),
  cellular: () => towerI(24, 10, 34) + P('M10 14 Q6 20 10 26 M38 14 Q42 20 38 26', 'none', AIR, 2),
  nfc: () => R(4, 18, 24, 16, { r: 3, f: B.blueWash, sw: 2 }) + R(4, 22, 24, 3, { r: 0, f: B.ink, s: 'none', sw: 0 }) + phoneI(28, 6, 16, 30) + P('M24 10 Q28 14 24 18', 'none', HOT, 2),
};
const ICO_ALT = { internet: 'globe', printer: 'printer', files: 'two folders', chat: 'chat bubbles', together: 'shared document', software: 'one license for many computers', phone: 'phone with signal', map: 'map pin', pay: 'paying with a phone', classes: 'video class on a laptop', cctv: 'CCTV camera', smart: 'smart home', stream: 'streaming on a TV', doctor: 'doctor video call', speed: 'speed meter', move: 'person walking', setup: 'coil of cable', security: 'padlock', dialup: 'old dial-up modem and phone', homenet: 'home router', bignet: 'servers', http: 'browser with a lock', dns: 'address book', smtp: 'email going out', imap: 'inbox receiving email', ftp: 'folder upload and download', ethernet: 'Ethernet plug', wifi: 'Wi-Fi signal', bluetooth: 'wireless earbuds', cellular: 'cell tower', nfc: 'card tapped on a phone' };
/** A small icon for a card or a table row. */
export function ico(kind) { return icoWrap(ICO_ALT[kind] || kind, ICONS[kind]()); }

/** Wired vs. wireless: the same router, two ways to connect. */
export function wiredWireless() {
  let b = T(110, 24, 'Wired: a cable', { size: 17, c: B.ink }) + T(350, 24, 'Wireless: through the air', { size: 17, c: B.blueInk });
  b += pcI(30, 70, 70) + L(65, 116, 65, 128) + L(48, 128, 82, 128, B.ink, 3);
  b += P('M100 100 Q140 100 140 150 L140 170', 'none', WIRE, 4) + routerI(108, 172, 64);
  b += lab(110, 230, 'Ethernet cable to the router', { size: 14 });
  b += L(230, 40, 230, 236, B.line, 1.6, DASH);
  b += routerI(318, 172, 64) + wifiArcs(350, 166, AIR, 1.4);
  b += laptopI(262, 64, 70) + phoneI(410, 56, 28, 50);
  b += P('M318 160 Q300 130 300 116', 'none', AIR, 2.6).replace('/>', DASH + '/>') + P('M384 160 Q410 130 420 112', 'none', AIR, 2.6).replace('/>', DASH + '/>');
  b += lab(350, 230, 'Wi-Fi signal from the router', { size: 14 });
  return svgWrap(460, 244, 'Wired: a desktop connects to the router with an Ethernet cable. Wireless: a laptop and a phone connect to a router through a Wi-Fi signal in the air.', b);
}

/** Intranet, extranet, and the public: who can get in. */
export function orgNets() {
  let b = R(130, 30, 200, 190, { r: 14, f: B.blueWash, s: B.blue, sw: 3 }) + T(230, 56, 'Intranet', { size: 17, c: B.blueInk }) + lab(230, 76, 'for the school\'s own people', { size: 13.5 });
  b += serverI(210, 92, 40, 56) + lab(230, 168, 'internal site: forms,', { size: 13 }) + lab(230, 184, 'announcements', { size: 13 });
  b += laptopI(146, 96, 46) + laptopI(268, 96, 46) + L(192, 112, 210, 112, WIRE, 2) + L(250, 112, 268, 112, WIRE, 2);
  // door for partners (extranet)
  b += R(322, 92, 16, 52, { r: 2, f: B.orange, s: B.orangeInk, sw: 2 }) + lockI(330, 112, 0.6, '#fff');
  b += laptopI(360, 98, 50) + ARROW(356, 118, 342, 118, HOT, 2.6);
  b += T(392, 168, 'Extranet', { size: 16, c: B.orangeInk }) + lab(392, 186, 'approved partner', { size: 13 }) + lab(392, 202, 'logs in', { size: 13 });
  // public, blocked
  b += laptopI(26, 100, 50) + L(80, 120, 124, 120, '#a3abb8', 2.4, DASH) + X(104, 120);
  b += T(52, 168, 'The public', { size: 15, c: B.greyInk }) + lab(52, 186, 'cannot get in', { size: 13 });
  return svgWrap(460, 230, 'An intranet is a private network only for an organization\'s own people, with an internal site for forms and announcements. An extranet opens part of it to approved partners, who log in through a locked door. The public cannot get in.', b);
}

/** Wi-Fi bands: lower frequency reaches farther, higher frequency is faster. */
export function wifiBands() {
  const rows = [
    ['2.4 GHz', 0.95, B.green, 'reaches farthest, best through walls', 'slower, more crowded'],
    ['5 GHz', 0.68, B.blue, 'faster, shorter reach', 'most phones and laptops can use it'],
    ['6 GHz', 0.45, HOT, 'fastest, least crowded, shortest reach', 'only Wi-Fi 6E and Wi-Fi 7 devices'],
  ];
  let b = routerI(14, 116, 60) + lab(44, 156, 'router', { size: 13.5 });
  rows.forEach(([n, f, c, a1, a2], i) => {
    const y = 20 + i * 84;
    b += R(96, y, 70, 26, { r: 13, f: c, s: 'none', sw: 0 }) + T(131, y + 18, n, { size: 14, c: '#fff' });
    b += R(176, y + 7, 270 * f, 12, { r: 6, f: c, s: 'none', sw: 0 }).replace('/>', ' opacity="0.35"/>') + ARROW(176 + 270 * f - 6, y + 13, 180 + 270 * f, y + 13, c, 2.6);
    b += lab(96, y + 44, a1, { a: 'start', size: 13.5, c: B.ink }) + lab(96, y + 60, a2, { a: 'start', size: 12.5 });
  });
  return svgWrap(460, 266, 'Wi-Fi bands. 2.4 GHz reaches farthest and passes through walls best, but is slower and more crowded. 5 GHz is faster with a shorter reach. 6 GHz is the fastest and least crowded with the shortest reach, and only Wi-Fi 6E and Wi-Fi 7 devices can use it.', b);
}

/* ===== chat 50 redraws (bigger text, more room) ===== */

/** Network sizes as nested boxes: PAN inside LAN inside MAN inside WAN. */
export function netSizes() {
  const box = (x, y, w, h, f, name, ex, c) => R(x, y, w, h, { r: 16, f, s: c, sw: 2.6 }) + T(x + 18, y + 30, name, { size: 17, a: 'start', c }) + lab(x + 18, y + 52, ex, { a: 'start', size: 14 });
  let b = box(6, 6, 448, 380, '#f3f6fb', 'WAN · wide area network', 'a country or the world (the Internet is the biggest)', B.blueInk);
  b += box(30, 80, 400, 296, '#e8eef8', 'MAN · metropolitan area network', 'a city, like Mati City', B.blue);
  b += box(54, 154, 352, 212, B.butter, 'LAN · local area network', 'a home, a school, the DOrSU campus', B.orangeInk);
  b += box(78, 228, 304, 128, B.orangeWash, 'PAN · personal area network', 'around one person', HOT);
  b += phoneI(170, 290, 22, 40) + C(222, 312, 9, B.card) + C(248, 312, 9, B.card) + R(272, 296, 22, 30, { r: 6, f: B.ink, sw: 1.6 }) + R(276, 302, 14, 18, { r: 3, f: B.blueWash, s: 'none', sw: 0 });
  b += lab(232, 346, 'phone + earbuds + watch', { size: 13 });
  return svgWrap(460, 392, 'Network sizes as boxes inside boxes. The smallest, a PAN, is around one person, like a phone with earbuds and a watch. A LAN covers a home or a campus. A MAN covers a city like Mati. A WAN covers a country or the world; the Internet is the biggest WAN.', b);
}

/** Bandwidth as pipes: in one second, each dot = 1 million bits. */
export function bandwidthPipe() {
  const pipe = (y, h, rows, label) => {
    const x0 = 30, len = 300, rx = 9;
    let s = `<path d="M${x0} ${y} L${x0 + len} ${y} A${rx} ${h / 2} 0 0 1 ${x0 + len} ${y + h} L${x0} ${y + h} A${rx} ${h / 2} 0 0 1 ${x0} ${y} Z" fill="${B.blueWash}" stroke="${B.blue}" stroke-width="2.2"/>`;
    s += `<ellipse cx="${x0}" cy="${y + h / 2}" rx="${rx}" ry="${h / 2}" fill="#c9d9ef" stroke="${B.blue}" stroke-width="2.2"/>`;
    const gap = h / rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < 10; c++) s += C(70 + c * 24, y + gap * (r + 0.5), Math.min(5.5, gap * 0.36), HOT, 'none', 0);
    return s + T(356, y + h / 2 + 6, label, { size: 17, a: 'start', c: B.blueInk });
  };
  let b = pipe(20, 20, 1, '10 Mbps');
  b += pipe(64, 150, 10, '100 Mbps');
  b += lab(230, 244, 'In one second. Each dot = 1 million bits.', { size: 14, c: B.ink });
  return svgWrap(460, 256, 'Bandwidth as pipes. In one second, a 10 Mbps connection carries 10 dots, and a 100 Mbps connection carries 100 dots, where each dot is one million bits. The wider pipe moves ten times as many bits each second.', b);
}

/** Serial vs. parallel transmission: the letter A (01000001), sender to receiver. */
export function serialParallel() {
  const bits = ['0', '1', '0', '0', '0', '0', '0', '1'];
  const bit = (x, y, v) => R(x, y, 24, 22, { r: 4, f: v === '1' ? B.orange : B.blueWash, s: v === '1' ? B.orangeInk : B.blue, sw: 1.6 }) + T(x + 12, y + 16.5, v, { size: 14, mono: true, c: v === '1' ? '#fff' : B.blueInk });
  const ends = (y1) => pcI(8, y1, 54) + lab(35, y1 + 62, 'sender', { size: 13 }) + pcI(398, y1, 54) + lab(425, y1 + 62, 'receiver', { size: 13 });
  let b = T(230, 22, 'Serial: one wire, one bit after another', { size: 16 });
  b += ends(44) + L(62, 62, 398, 62, B.ink, 3);
  [...bits].reverse().forEach((v, i) => { b += bit(92 + i * 30, 51, v); });
  b += ARROW(342, 62, 390, 62, HOT, 3);
  b += lab(230, 130, 'like one lane: the bits line up and go one at a time', { size: 13.5 });
  b += L(10, 146, 450, 146, B.line, 1.4, DASH);
  b += T(230, 174, 'Parallel: 8 wires, all 8 bits at once', { size: 16 });
  b += ends(236);
  bits.forEach((v, i) => { const y = 192 + i * 26; b += L(62, y + 11, 398, y + 11, B.ink, 1.8) + bit(206, y, v) + ARROW(246, y + 11, 300, y + 11, HOT, 2); });
  b += lab(230, 414, 'like 8 lanes side by side: fast, but needs many wires', { size: 13.5 });
  return svgWrap(460, 424, 'Serial transmission sends the 8 bits of the letter A, 01000001, one after another on one wire from sender to receiver. Parallel transmission sends all 8 bits at the same time on 8 wires side by side.', b);
}

/** Simplex, half-duplex, full-duplex. */
export function duplex() {
  const radio = (x, y) => R(x, y, 60, 36, { r: 7, f: B.butter, sw: 2 }) + C(x + 19, y + 18, 11, B.card, B.ink, 1.8) + L(x + 36, y + 11, x + 52, y + 11) + L(x + 36, y + 18, x + 52, y + 18) + L(x + 36, y + 25, x + 52, y + 25);
  const walkie = (x, y) => L(x + 9, y, x + 9, y - 16, B.ink, 3) + R(x, y, 26, 46, { r: 4, f: B.grey, sw: 2 }) + R(x + 5, y + 7, 16, 12, { r: 1, f: B.blueWash, sw: 1.2 });
  let b = '';
  const row = (y, name, how, ex, left, right, arrows) => { b += T(12, y + 6, name, { size: 18, a: 'start', c: B.blueInk }) + lab(12, y + 28, how, { a: 'start', size: 14, c: B.ink }) + lab(12, y + 48, ex, { a: 'start', size: 14, c: B.greyInk }) + left + right + arrows; };
  row(24, 'Simplex', 'one way only', 'radio broadcast', towerI(246, 6, 64), radio(380, 28), ARROW(272, 46, 370, 46, HOT, 3));
  row(130, 'Half-duplex', 'both ways, one at a time', 'walkie-talkie ("Over!")', walkie(244, 124), walkie(404, 124), ARROW(278, 138, 396, 138, HOT, 3) + ARROW(396, 162, 278, 162, '#c3cad6', 3) + lab(337, 190, 'wait your turn', { size: 13 }));
  row(236, 'Full-duplex', 'both ways at the same time', 'phone or video call', phoneI(246, 222, 28, 48), phoneI(406, 222, 28, 48), ARROW(282, 236, 398, 236, HOT, 3) + ARROW(398, 260, 282, 260, HOT, 3));
  return svgWrap(460, 290, 'Three ways data can flow. Simplex: one way only, like a radio broadcast from a tower to a radio. Half-duplex: both ways but one at a time, like walkie-talkies. Full-duplex: both ways at once, like a phone call.', b);
}

/* packet switching (StepShow): bigger routers, packets, and text */
const RT = [[170, 66], [290, 66], [170, 190], [290, 190], [230, 128]];
const LINKS = [[0, 1], [2, 3], [0, 4], [1, 4], [2, 4], [3, 4], [0, 2], [1, 3]];
const PCOL = [HOT, B.blue, B.green];
const pkt = (x, y, n, c) => R(x - 22, y - 13, 44, 26, { r: 5, f: c, s: '#fff', sw: 1.6 }) + T(x, y + 6, `${n}/3`, { size: 15, c: '#fff' });
function grid(hl = []) {
  let s = LINKS.map(([a, z]) => L(RT[a][0], RT[a][1], RT[z][0], RT[z][1], '#c3cad6', 2.4)).join('');
  hl.forEach(([pts, c, dash]) => { s += P('M' + pts.map((i) => (typeof i === 'number' ? RT[i] : i).join(' ')).join(' L'), 'none', c, 5).replace('/>', dash ? DASH + '/>' : '/>'); });
  return s + RT.map(([x, y]) => C(x, y, 14, B.blueWash, B.blue, 2.4)).join('');
}
const ends = () => laptopI(8, 106, 66) + lab(41, 170, 'Ana', { size: 15, c: B.ink }) + lab(41, 186, '(sender)', { size: 13 }) + laptopI(386, 106, 66) + lab(419, 170, 'Ben', { size: 15, c: B.ink }) + lab(419, 186, '(receiver)', { size: 13 });
const A = [74, 128], Zp = [386, 128];
/** step 0..4 of packet switching; step 5 = circuit switching (one path reserved). */
export function packetPic(step) {
  let b = '';
  const note = (s) => T(230, 236, s, { size: 15, w: 700, c: B.soft });
  if (step === 5) {
    b += grid([[[A, 0, 1, Zp], HOT, true]]) + ends() + note('One path is reserved for the whole call, even during silence.');
    return svgWrap(460, 250, 'Circuit switching: one path from Ana to Ben through the network is reserved, shown in dashed orange, for the whole call.', b);
  }
  b += grid(step === 2 ? [[[A, 0, 1, Zp], PCOL[0]], [[A, 4, Zp], PCOL[1]], [[A, 2, 3, Zp], PCOL[2]]] : []) + ends();
  if (step === 0) b += R(70, 14, 170, 32, { r: 16, f: B.card, sw: 2 }) + T(155, 36, 'Happy birthday!', { size: 16 }) + note('Routers (blue circles) connect Ana and Ben.');
  if (step === 1) { [['Happy', 0], ['birth', 1], ['day!', 2]].forEach(([w, k]) => { b += pkt(30, 18 + k * 30, k + 1, PCOL[k]) + lab(58, 23 + k * 30, `"${w}"`, { a: 'start', size: 14, c: B.ink }); }); b += note('Each packet has a number and Ben\'s address.'); }
  if (step === 2) { b += pkt(230, 48, 1, PCOL[0]) + pkt(262, 112, 2, PCOL[1]) + pkt(230, 208, 3, PCOL[2]); b += lab(230, 248, 'Each packet takes its own route.', { size: 15, w: 700 }); }
  if (step === 3) { b += pkt(419, 38, 2, PCOL[1]) + pkt(419, 70, 3, PCOL[2]) + lab(419, 100, 'arrived', { size: 12.5, c: B.green }) + L(304, 128, 384, 128, '#c3cad6', 2.4, DASH) + pkt(326, 128, 1, PCOL[0]) + ARROW(350, 128, 380, 128, PCOL[0], 2.6) + lab(322, 162, 'still on the way', { size: 12.5, c: B.orangeInk }); b += note('They can arrive out of order: 2, 3, then 1.'); }
  if (step === 4) { b += pkt(340, 30, 1, PCOL[0]) + pkt(388, 30, 2, PCOL[1]) + pkt(436, 30, 3, PCOL[2]) + R(312, 54, 144, 32, { r: 16, f: B.card, sw: 2 }) + T(384, 76, 'Happy birthday!', { size: 15 }); b += note('Ben\'s computer puts them back in order.'); }
  const alt = ['Ana wants to send the message Happy birthday to Ben. Between them is a network of routers.', 'The message is cut into 3 packets, numbered 1/3, 2/3, 3/3.', 'Each packet travels its own route through the routers: orange on top, blue through the middle, green at the bottom.', 'The packets arrive at Ben out of order: 2, 3, then 1.', 'Ben\'s computer puts the packets back in order 1, 2, 3, and the message reads Happy birthday again.'][step];
  return svgWrap(460, 254, alt, b);
}

/** Fiber optic cable cut open: jacket, strength fibers, coating, cladding, core with light. */
export function fiberLight() {
  const y = 120;
  // layers, each shorter so the inner ones show (like a stripped cable)
  let b = R(10, y - 40, 150, 80, { r: 10, f: '#3b4659', s: B.ink, sw: 2 });
  for (let k = 0; k < 9; k++) b += P(`M150 ${y - 30 + k * 7.5} Q170 ${y - 34 + k * 7.5} 196 ${y - 28 + k * 7.5}`, 'none', '#e6c34a', 2);
  b += R(150, y - 22, 110, 44, { r: 4, f: '#cfd6e0', s: B.ink, sw: 1.8 });
  b += R(250, y - 15, 200, 30, { r: 4, f: '#dfe9f6', s: B.blue, sw: 1.8 });
  b += R(250, y - 6, 200, 12, { r: 2, f: '#ffffff', s: B.blueMid, sw: 1.4 });
  let d = `M252 ${y}`; for (let x = 266, up = true; x <= 446; x += 18, up = !up) d += ` L${x} ${up ? y - 4.5 : y + 4.5}`;
  b += P(d, 'none', HOT, 2.4) + C(458, y, 7, B.amber, B.orangeInk, 1.4) + P(`M466 ${y - 8} L476 ${y - 14} M468 ${y} L480 ${y} M466 ${y + 8} L476 ${y + 14}`, 'none', B.amber, 2);
  const tag = (x1, y1, x2, y2, t1, t2, a = 'middle') => ARROW(x1, y1, x2, y2, B.soft, 1.6) + lab(x1, y1 + (y1 < y2 ? -24 : 16), t1, { size: 14, c: B.ink, a }) + (t2 ? lab(x1, y1 + (y1 < y2 ? -8 : 32), t2, { size: 12.5, a }) : '');
  b += tag(70, 50, 70, 80, 'outer jacket', 'protects the cable');
  b += tag(172, 196, 174, 150, 'strength fibers', 'stop it from stretching');
  b += tag(205, 50, 205, 98, 'coating', 'cushions the glass');
  b += tag(338, 196, 338, 135, 'cladding', 'bounces light back in');
  b += tag(392, 50, 392, 114, 'core', 'thin glass: carries light');
  return svgWrap(490, 236, 'A fiber optic cable cut open. From the outside in: an outer jacket that protects it, strength fibers that stop it from stretching, a coating that cushions the glass, the cladding that bounces light back in, and the thin glass core where the light travels, bouncing along.', b);
}

/** How far each wireless kind reaches (rough idea, not to scale). */
export function wirelessReach() {
  const icons = [
    (x, y) => R(x + 8, y, 18, 40, { r: 5, f: B.grey, sw: 2 }) + C(x + 17, y + 9, 3, B.red, 'none', 0) + [0, 1, 2].map((k) => R(x + 12, y + 17 + k * 7, 10, 4, { r: 1, f: B.ink, s: 'none', sw: 0 })).join(''),
    (x, y) => C(x + 10, y + 14, 8, B.card, B.ink, 2) + L(x + 12, y + 21, x + 14, y + 34, B.ink, 3) + C(x + 28, y + 14, 8, B.card, B.ink, 2) + L(x + 26, y + 21, x + 24, y + 34, B.ink, 3),
    (x, y) => routerI(x, y + 26, 36) + wifiArcs(x + 18, y + 22, AIR, 0.6),
    (x, y) => towerI(x + 17, y, 40),
    (x, y) => satI(x + 17, y + 20, 0.6),
  ];
  const rows = [
    ['Infrared', 'a few meters, needs a clear line', 'TV remote', 0.1],
    ['Bluetooth', 'usually about a room', 'earbuds, speakers', 0.2],
    ['Wi-Fi', 'a home or one floor', 'home and campus Wi-Fi', 0.36],
    ['Cellular', 'kilometers, tower to tower', 'mobile data (4G, 5G)', 0.66],
    ['Satellite', 'a whole region, from space', 'remote islands, ships', 1],
  ];
  let b = '';
  rows.forEach(([n, how, ex, f], i) => {
    const y = 12 + i * 70, c = i < 2 ? HOT : B.blue;
    b += icons[i](8, y + 4) + T(62, y + 20, n, { size: 16, a: 'start' });
    b += R(150, y + 7, 300 * f, 18, { r: 9, f: i < 2 ? B.orangeWash : B.blueWash, s: c, sw: 2 });
    b += lab(62, y + 44, how, { a: 'start', size: 14, c: B.ink }) + lab(62, y + 61, ex, { a: 'start', size: 13 });
  });
  return svgWrap(460, 362, 'How far each kind of wireless reaches, from shortest to longest: infrared, a few meters with a clear line, like a TV remote; Bluetooth, about a room; Wi-Fi, a home or one floor; cellular, kilometers between towers; satellite, a whole region from space.', b);
}

/** Microwave towers need line of sight; a satellite relays signals far away. Two stacked panels. */
export function microwaveSat() {
  let b = T(14, 26, 'Microwave', { size: 18, a: 'start', c: B.blueInk }) + lab(124, 26, 'towers must "see" each other (line of sight)', { a: 'start', size: 14, c: B.ink });
  b += P('M6 170 Q120 120 230 170 Q340 128 454 170', '#dcefe2', B.green, 1.8);
  b += towerI(70, 60, 96) + dishI(80, 80) + towerI(390, 60, 96) + dishI(380, 80, true);
  b += L(98, 80, 362, 80, HOT, 3, DASH) + lab(230, 70, 'straight beam', { size: 13.5 });
  b += L(10, 190, 450, 190, B.line, 1.4, DASH);
  b += T(14, 222, 'Satellite', { size: 18, a: 'start', c: B.blueInk }) + lab(110, 222, 'up to space, then down far away', { a: 'start', size: 14, c: B.ink });
  b += satI(230, 258, 1.7);
  b += P('M6 400 Q230 370 454 400', '#dfe9f6', B.blue, 1.8) + lab(230, 412, 'sea, mountains, or far islands in between', { size: 13 });
  b += L(58, 376, 58, 398, B.ink, 3) + L(402, 376, 402, 398, B.ink, 3) + dishI(60, 360) + dishI(400, 360, true) + ARROW(76, 346, 206, 270, HOT, 3) + ARROW(254, 270, 384, 346, HOT, 3);
  return svgWrap(460, 422, 'Top: two microwave towers with dishes send a straight beam to each other; they must see each other, with no hill in between. Bottom: a dish sends a signal up to a satellite, which sends it down to a dish far away, across sea or mountains.', b);
}

/** TCP and IP: two jobs. Stacked so text stays big. */
export function tcpIp() {
  let b = R(6, 6, 448, 176, { r: 12, f: B.orangeWash, s: HOT, sw: 2.4 }) + T(24, 38, 'TCP', { size: 22, a: 'start', c: B.orangeInk }) + lab(86, 37, 'cuts, numbers, and checks', { size: 15, a: 'start', c: B.ink });
  b += R(24, 62, 128, 54, { r: 6, f: B.card, sw: 1.8 }) + P('M32 106 L60 80 L80 98 L98 84 L144 108', B.greenWash, B.green, 2) + C(124, 76, 6, B.amber, 'none', 0) + lab(88, 134, 'a photo you send', { size: 13.5 });
  b += ARROW(162, 89, 200, 89, B.ink, 2.4);
  [0, 1, 2].forEach((k) => { b += R(210 + k * 64, 74, 56, 30, { r: 5, f: PCOL[k], s: 'none', sw: 0 }) + T(238 + k * 64, 95, `${k + 1}/3`, { size: 15, c: '#fff' }); });
  b += lab(210, 136, 'Missing a packet? Ask for it again.', { size: 14, a: 'start', c: B.orangeInk }) + lab(210, 158, 'All here? Put them back in order.', { size: 14, a: 'start', c: B.orangeInk });
  b += R(6, 196, 448, 160, { r: 12, f: B.blueWash, s: B.blue, sw: 2.4 }) + T(24, 228, 'IP', { size: 22, a: 'start', c: B.blueInk }) + lab(62, 227, 'addresses and delivers', { size: 15, a: 'start', c: B.ink });
  b += R(24, 246, 220, 94, { r: 8, f: B.card, sw: 1.8 }) + R(24, 246, 220, 26, { r: 8, f: PCOL[0], s: 'none', sw: 0 }) + T(134, 265, 'packet 1/3', { size: 14, c: '#fff' });
  b += T(36, 298, 'To: 203.0.113.5', { size: 14, a: 'start', mono: true, w: 600 }) + T(36, 324, 'From: 192.0.2.7', { size: 14, a: 'start', mono: true, w: 600 });
  b += routerI(320, 296, 64) + ARROW(250, 300, 312, 300, B.ink, 2.2);
  b += lab(352, 330, 'Routers read the', { size: 13.5, c: B.blueInk }) + lab(352, 346, '"To" address', { size: 13.5, c: B.blueInk });
  return svgWrap(460, 362, 'TCP and IP share the work. TCP cuts a photo into numbered packets, checks that all arrive, asks again for missing ones, and puts them in order. IP puts a To and From address on each packet so routers can pass it along.', b);
}

/** Typical home setup, top to bottom: ISP line, modem/ONT, router, devices. */
export function homeSetup() {
  const tag = (x, y, n) => C(x, y, 13, HOT, '#fff', 2) + T(x, y + 5.5, String(n), { size: 15, c: '#fff', w: 900 });
  let b = cloudP(90, 58, 0.8, B.blueWash) + T(90, 64, 'Internet', { size: 16, c: B.blueInk }) + lab(90, 104, 'from your ISP', { size: 13.5 });
  b += L(150, 58, 196, 58, WIRE, 3.4) + lab(173, 46, 'fiber', { size: 13 });
  b += R(198, 34, 84, 46, { r: 7, f: B.card, sw: 2.2 }) + [0, 1, 2].map((k) => C(216 + k * 14, 57, 3.4, B.green, 'none', 0)).join('') + lab(240, 100, 'modem', { size: 15, w: 800, c: B.ink }) + lab(240, 118, '(ONT for fiber)', { size: 13 });
  b += L(282, 58, 326, 58, WIRE, 3.4);
  b += routerI(330, 48, 90) + wifiArcs(375, 20, AIR, 0.9) + lab(375, 100, 'router', { size: 15, w: 800, c: B.ink }) + lab(375, 118, '+ switch + Wi-Fi', { size: 13 });
  b += L(330, 72, 316, 72, WIRE, 3) + P('M316 72 Q300 72 300 110 Q300 150 120 160 L112 204', 'none', WIRE, 3) + pcI(76, 206, 70) + lab(111, 278, 'desktop (cable)', { size: 13.5 });
  b += L(366, 128, 280, 208, AIR, 2.4, DASH) + L(392, 128, 410, 202, AIR, 2.4, DASH);
  b += laptopI(226, 210, 76) + lab(264, 278, 'laptop (Wi-Fi)', { size: 13.5 }) + phoneI(394, 206, 32, 56) + lab(410, 278, 'phone (Wi-Fi)', { size: 13.5 });
  b += tag(90, 16, 1) + tag(240, 18, 2) + tag(442, 60, 3) + tag(40, 222, 4);
  return svgWrap(460, 290, 'A typical home setup: 1, the Internet comes from your ISP over a fiber line; 2, a modem (called an ONT for fiber) turns the signal into data; 3, a router, with a built-in switch and Wi-Fi, shares the connection; 4, a desktop connects with a cable, a laptop and a phone with Wi-Fi.', b);
}

/** A switch sends data only to the right device; a router connects networks. Two stacked panels. */
export function switchRouter() {
  let b = T(14, 26, 'Switch', { size: 18, a: 'start', c: B.blueInk }) + lab(86, 26, 'inside one network', { a: 'start', size: 15, c: B.ink });
  b += pcI(40, 52, 60) + T(24, 80, 'A', { size: 15, c: B.orangeInk }) + L(100, 72, 160, 72, HOT, 3.4);
  b += switchI(160, 62, 130, 6) + lab(225, 104, 'switch', { size: 13.5 });
  [['B', 330, false, 40], ['C', 330, true, 108]].forEach(([n, x, on, y]) => { b += L(290, 72, x, y + 20, on ? HOT : '#c3cad6', on ? 3.4 : 2.4) + pcI(x, y, 56, on ? B.orangeWash : '#eef1f5') + T(x + 70, y + 26, n, { size: 15, c: on ? B.orangeInk : B.greyInk }); });
  b += lab(150, 156, 'A sends to C: only C gets it.', { size: 14, c: B.ink });
  b += L(10, 178, 450, 178, B.line, 1.4, DASH);
  b += T(14, 210, 'Router', { size: 18, a: 'start', c: B.blueInk }) + lab(86, 210, 'between networks', { a: 'start', size: 15, c: B.ink });
  b += R(14, 236, 120, 76, { r: 12, f: '#fdf3e3', s: B.amber, sw: 2.2 }) + houseI(44, 244, 60, B.butter) + lab(74, 330, 'your home network', { size: 13.5 });
  b += routerI(190, 276, 80) + lab(230, 330, 'router', { size: 14, w: 800, c: B.ink });
  b += cloudP(380, 250, 0.62, B.blueWash) + T(380, 255, 'ISP', { size: 15, c: B.blueInk }) + cloudP(380, 314, 0.62, B.blueWash) + T(380, 319, 'Internet', { size: 13.5, c: B.blueInk });
  b += L(134, 286, 190, 286, WIRE, 2.6) + L(270, 282, 340, 254, HOT, 3.4) + L(270, 292, 340, 312, '#c3cad6', 2.4);
  b += lab(230, 356, 'It picks the path for each packet.', { size: 14, c: B.ink });
  return svgWrap(460, 366, 'Top: a switch connects devices inside one network; when computer A sends to C, only C receives it. Bottom: a router sits between your home network and other networks like your ISP, and picks the path for each packet.', b);
}

/* ================= THE INTERNET AND THE WEB ================= */

/** The Internet as a network of networks, home to a server abroad. */
export function netOfNets() {
  let b = houseI(8, 60, 64) + lab(40, 140, 'your home LAN', { size: 10.5 });
  b += R(92, 72, 64, 40, { r: 8, f: B.blueWash, s: B.blue, sw: 2 }) + T(124, 97, 'ISP', { size: 13, c: B.blueInk }) + lab(124, 140, 'local ISP', { size: 10.5 });
  b += R(176, 72, 64, 40, { r: 8, f: B.blueWash, s: B.blue, sw: 2 }) + T(208, 92, 'big', { size: 11, c: B.blueInk }) + T(208, 105, 'networks', { size: 11, c: B.blueInk }) + lab(208, 140, 'national backbone', { size: 10.5 });
  b += P('M246 120 Q262 112 278 120 T310 120', 'none', B.blue, 2) + P('M246 128 Q262 120 278 128 T310 128', 'none', B.blue, 2);
  b += lab(278, 162, 'undersea cable', { size: 10.5 });
  b += serverI(330, 58, 36, 54) + serverI(352, 66, 36, 54) + lab(360, 140, 'servers abroad', { size: 10.5 });
  b += L(72, 92, 92, 92, HOT, 3) + L(156, 92, 176, 92, HOT, 3) + P('M240 92 Q250 92 256 110', 'none', HOT, 3) + P('M304 110 Q312 92 330 88', 'none', HOT, 3);
  b += T(200, 26, 'Thousands of separate networks, all speaking TCP/IP', { size: 12.5 });
  b += lab(200, 44, 'No single owner runs the whole Internet.', { size: 11 });
  return svgWrap(400, 172, 'The Internet is a network of networks. Data goes from your home LAN to your local ISP, to big national networks, through an undersea cable, to servers abroad. Thousands of separate networks all use TCP/IP, and no single owner runs the whole thing.', b);
}

/** IPv4 vs. IPv6 address anatomy. */
export function ipAnatomy() {
  let b = T(10, 20, 'IPv4', { size: 15, a: 'start', c: B.blueInk }) + lab(56, 20, '4 numbers, each 0 to 255, with dots', { a: 'start', size: 11 });
  ['192', '0', '2', '53'].forEach((n, i) => { b += R(10 + i * 76, 32, 60, 32, { r: 6, f: B.blueWash, s: B.blue, sw: 1.8 }) + T(40 + i * 76, 54, n, { size: 15, mono: true, w: 700 }); if (i < 3) b += T(78 + i * 76, 56, '.', { size: 20, w: 900 }); });
  b += lab(10, 84, '32 bits: about 4.3 billion addresses. Not enough today.', { a: 'start', size: 11 });
  b += T(10, 116, 'IPv6', { size: 15, a: 'start', c: B.orangeInk }) + lab(56, 116, 'groups of hexadecimal digits, with colons', { a: 'start', size: 11 });
  b += R(10, 128, 300, 32, { r: 6, f: B.orangeWash, s: HOT, sw: 1.8 }) + T(160, 150, '2001:db8::53', { size: 15, mono: true, w: 700 });
  b += lab(10, 180, '128 bits: about 340 undecillion (340 followed by 36 zeros).', { a: 'start', size: 11 });
  return svgWrap(350, 190, 'IPv4 address 192.0.2.53: four numbers from 0 to 255 separated by dots, 32 bits, about 4.3 billion possible addresses. IPv6 address 2001:db8::53: hexadecimal groups separated by colons, 128 bits, about 340 undecillion addresses.', b);
}

/** DNS lookup, step 0..3. */
export function dnsPic(step) {
  const hl = (on) => (on ? HOT : '#c3cad6');
  let b = phoneI(10, 60, 48, 70, B.card) + T(34, 90, 'dorsu.', { size: 9.5, mono: true, w: 600 }) + T(34, 102, 'edu.ph', { size: 9.5, mono: true, w: 600 }) + lab(34, 148, 'your phone', { size: 10.5 });
  b += R(160, 14, 92, 56, { r: 8, f: B.butter, s: B.amber, sw: 2 }) + T(206, 38, 'DNS server', { size: 12 }) + lab(206, 56, 'the "phone book"', { size: 10 });
  b += serverI(320, 80, 40, 56) + lab(340, 152, 'web server', { size: 10.5 }) + lab(340, 166, '(203.0.113.10)', { size: 10, c: B.greyInk });
  if (step >= 1) b += ARROW(58, 74, 156, 46, hl(step === 1), 2.4);
  if (step === 1) b += R(50, 16, 106, 22, { r: 4, f: B.card, sw: 1.2 }) + T(103, 31, 'IP of dorsu.edu.ph?', { size: 9.5 });
  if (step >= 2) b += ARROW(156, 60, 58, 88, hl(step === 2), 2.4);
  if (step === 2) b += R(76, 96, 96, 22, { r: 4, f: B.card, sw: 1.2 }) + T(124, 111, 'It is 203.0.113.10', { size: 9.5 });
  if (step >= 3) b += ARROW(58, 116, 314, 116, HOT, 2.4) + ARROW(314, 128, 58, 128, B.blue, 2.4) + lab(186, 110, 'Please send the page.', { size: 10 }) + lab(186, 146, 'Here it is!', { size: 10, c: B.blueInk });
  const alt = ['You type dorsu.edu.ph on your phone. Your phone needs the IP address of that name.', 'Your phone asks a DNS server: what is the IP address of dorsu.edu.ph?', 'The DNS server answers with the IP address, here the example 203.0.113.10.', 'Your phone contacts the web server at that IP address, and the server sends the page back.'][step];
  return svgWrap(380, 176, alt, b);
}

/** Parts of a domain name, read right to left. */
export function domainParts() {
  const parts = [['www', 'host name', '(the web server)', B.greyInk, '#eef1f5'], ['dorsu', 'the school\'s', 'own name', B.blueInk, B.blueWash], ['edu', 'kind of group', '(education)', B.green, B.greenWash], ['ph', 'country code', '(Philippines)', B.orangeInk, B.orangeWash]];
  let b = '', x = 14;
  const ws = [70, 92, 70, 60];
  parts.forEach(([t, a, c, ink, f], i) => {
    b += R(x, 18, ws[i], 36, { r: 6, f, s: ink, sw: 2 }) + T(x + ws[i] / 2, 42, t, { size: 17, mono: true, w: 700, c: ink });
    b += lab(x + ws[i] / 2, 74, a, { size: 10.5, c: ink }) + lab(x + ws[i] / 2, 88, c, { size: 10, c: B.soft });
    if (i < 3) b += T(x + ws[i] + 7, 46, '.', { size: 22, w: 900 });
    x += ws[i] + 14;
  });
  b += ARROW(350, 112, 30, 112, B.soft, 1.8) + lab(190, 130, 'read from right to left: big group → smaller → one site', { size: 11 });
  return svgWrap(370, 140, 'The domain name www.dorsu.edu.ph in four parts. ph is the country code for the Philippines. edu is the kind of group, education. dorsu is the school\'s own name. www is the host name of the web server. Read it from right to left, from the biggest group to one site.', b);
}

/** GEO vs LEO satellites (not to scale). */
export function geoLeo() {
  let b = P('M0 196 Q200 150 400 196 L400 210 L0 210 Z', '#dcefe2', B.green, 2) + lab(330, 205, 'Earth', { size: 11, c: B.green });
  b += P('M10 150 Q200 104 390 150', 'none', B.blueMid, 1.4).replace('/>', DASH + '/>');
  [70, 150, 250, 330].forEach((x) => { b += satI(x, 152 - (x === 150 || x === 250 ? 21 : 6), 0.55); });
  b += lab(392, 118, 'LEO: below 1,000 km', { size: 11, c: B.blueInk, a: 'end' });
  b += satI(200, 30, 0.8) + lab(214, 62, 'GEO: about 35,786 km up', { size: 11, c: B.orangeInk, a: 'start' });
  b += houseI(176, 164, 30, B.butter);
  b += L(196, 162, 200, 40, HOT, 2, DASH) + L(186, 162, 150, 136, B.blue, 2.4);
  b += lab(80, 24, 'not to scale', { size: 10, c: B.greyInk });
  return svgWrap(400, 212, 'Satellites for Internet. Low Earth orbit, LEO, satellites fly below 1,000 kilometers, many of them close to Earth. A geostationary, GEO, satellite sits about 35,786 kilometers up, so the signal travels much farther. Not to scale.', b);
}

/** Cookies: first-party (remembers you) and third-party (follows you). */
export function cookiePic() {
  const cookie = (x, y) => C(x, y, 9, '#d9a35b', '#8a5a22', 1.6) + C(x - 3, y - 2, 1.6, '#5a3412', 'none', 0) + C(x + 3, y + 3, 1.6, '#5a3412', 'none', 0) + C(x + 3, y - 4, 1.2, '#5a3412', 'none', 0);
  const win = (x, y, w, title, inner = '') => R(x, y, w, 58, { r: 5, f: B.card, sw: 1.8 }) + R(x, y, w, 14, { r: 5, f: B.blueWash, s: 'none', sw: 0 }) + T(x + w / 2, y + 11, title, { size: 9.5, mono: true, w: 600 }) + inner;
  let b = T(10, 18, '1 · A site remembers you (first-party cookie)', { size: 12, a: 'start' });
  b += win(10, 28, 130, 'shop.example', lab(75, 66, 'Welcome back, Ana!', { size: 10, c: B.blueInk }) + lab(75, 80, 'Cart: 2 items', { size: 10 }));
  b += ARROW(146, 56, 222, 56, B.ink, 1.8) + cookie(184, 46) + lab(184, 76, 'saved in your', { size: 9.5 }) + lab(184, 87, 'browser', { size: 9.5 });
  b += laptopI(240, 34, 70) + cookie(275, 52);
  b += T(10, 122, '2 · An ad company follows you (third-party cookie)', { size: 12, a: 'start' });
  b += win(10, 132, 110, 'news.example', R(30, 152, 70, 26, { r: 3, f: B.orangeWash, s: HOT, sw: 1.4 }) + lab(65, 169, 'ad', { size: 10, c: B.orangeInk }));
  b += win(150, 132, 110, 'recipes.example', R(170, 152, 70, 26, { r: 3, f: B.orangeWash, s: HOT, sw: 1.4 }) + lab(205, 169, 'same ad co.', { size: 9.5, c: B.orangeInk }));
  b += ARROW(100, 186, 300, 206, HOT, 1.6) + ARROW(240, 186, 300, 200, HOT, 1.6);
  b += R(300, 182, 92, 40, { r: 6, f: B.orangeWash, s: HOT, sw: 1.6 }) + lab(346, 199, 'Ana likes news', { size: 9.5, c: B.orangeInk }) + lab(346, 212, 'and cooking', { size: 9.5, c: B.orangeInk });
  return svgWrap(400, 228, 'Top: a shopping site saves a small cookie file in your browser, so next time it says Welcome back, Ana, and remembers your cart. Bottom: the same ad company appears on a news site and a recipe site, so its third-party cookie lets it learn that Ana likes news and cooking.', b);
}
