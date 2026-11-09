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
  return R(x, y, w, h, { r: 4, f: B.ink, sw: 2 }) + R(x + 4, y + 5, w - 8, h - 9, { r: 1, f: fill, s: 'none', sw: 0 }) + C(x + w / 2, y + 2.6, 0.9, '#6b7688', 'none', 0)
    + P(`M${x - 7} ${y + h + 1} L${x + w + 7} ${y + h + 1} L${x + w + 2} ${y + h + 8} L${x - 2} ${y + h + 8} Z`, '#dfe3ea') + R(x + w / 2 - w * 0.1, y + h + 1, w * 0.2, 2.4, { r: 1, f: '#b7bfcc', s: 'none', sw: 0 });
};
const phoneI = (x, y, w = 24, h = 42, fill = B.blueWash) => R(x, y, w, h, { r: Math.max(5, w * 0.2), f: B.ink, sw: 2 }) + R(x + 3, y + 6, w - 6, h - 12, { r: 2, f: fill, s: 'none', sw: 0 })
  + `<rect x="${x + w / 2 - w * 0.14}" y="${y + 2.2}" width="${w * 0.28}" height="1.8" rx=".9" fill="#5b6577"/><rect x="${x + w / 2 - w * 0.18}" y="${y + h - 4}" width="${w * 0.36}" height="1.6" rx=".8" fill="#8a94a6"/>`;
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
const houseI = (x, y, w = 70, f = B.butter) => {
  // Real-looking house: tiled roof + chimney, cream siding, door with knob, paned window (chat 52). Box: w wide, 60*w/70 tall.
  const s = w / 70, wall = f === B.butter ? '#fdf0cf' : f;
  const g = `<rect x="47" y="3" width="9" height="18" fill="#b5654a" stroke="${B.ink}" stroke-width="2"/><rect x="45" y="1" width="13" height="4" rx="1" fill="#8f4a34" stroke="${B.ink}" stroke-width="1.6"/>`
    + `<rect x="7" y="24" width="56" height="36" fill="${wall}" stroke="${B.ink}" stroke-width="2.2"/>`
    + [31, 38, 45, 52].map((yy) => `<line x1="8" y1="${yy}" x2="62" y2="${yy}" stroke="#e6d4a8" stroke-width="1.2"/>`).join('')
    + `<path d="M-3 28 L35 1 L73 28 Z" fill="#d06b45" stroke="${B.ink}" stroke-width="2.2" stroke-linejoin="round"/>`
    + `<path d="M9 19 L61 19 M20 11 L50 11" stroke="#a9502f" stroke-width="1.5"/>`
    + `<rect x="13" y="37" width="14" height="23" rx="1.5" fill="${B.blue}" stroke="${B.ink}" stroke-width="2"/><circle cx="24" cy="49" r="1.4" fill="${B.amber}"/><rect x="15.5" y="40" width="9" height="7" rx="1" fill="#4f7fbf"/>`
    + `<rect x="35" y="33" width="21" height="16" rx="1.5" fill="#cfe3f7" stroke="${B.ink}" stroke-width="2"/><path d="M45.5 33 L45.5 49 M35 41 L56 41" stroke="${B.ink}" stroke-width="1.6"/><path d="M37 46 L42 36" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/><rect x="33" y="49" width="25" height="3" rx="1" fill="${B.card}" stroke="${B.ink}" stroke-width="1.4"/>`
    + `<rect x="11" y="59" width="18" height="3" rx="1" fill="${B.grey}" stroke="${B.ink}" stroke-width="1.2"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s.toFixed(3)})">${g}</g>`;
};
const satI = (x, y, s = 1) => {
  // Real-looking satellite (chat 52): gold-foil body, gridded solar panels on struts, dish facing Earth, antenna. ~64s wide.
  const panel = (px) => `<rect x="${px}" y="-6.5" width="21" height="13" rx="1" fill="#2c4f8c" stroke="${B.ink}" stroke-width="1.6"/>`
    + [1, 2, 3].map((k) => `<line x1="${px + k * 5.25}" y1="-6" x2="${px + k * 5.25}" y2="6" stroke="#8fb0dc" stroke-width=".8"/>`).join('')
    + `<line x1="${px + 0.5}" y1="0" x2="${px + 20.5}" y2="0" stroke="#8fb0dc" stroke-width=".8"/>`;
  const g = `<line x1="-12" y1="0" x2="12" y2="0" stroke="${B.ink}" stroke-width="2"/>` + panel(-33) + panel(12)
    + `<rect x="-8" y="-9" width="16" height="18" rx="2" fill="#e8b94a" stroke="${B.ink}" stroke-width="1.8"/><path d="M-6 -4 L-2 -6 L1 -2 L5 -5 M-5 3 L-1 1 L2 5 L6 2" stroke="#f8e3a3" stroke-width="1.2" fill="none"/>`
    + `<line x1="3" y1="-9" x2="6" y2="-16" stroke="${B.ink}" stroke-width="1.4"/><circle cx="6" cy="-16.5" r="1.6" fill="${B.ink}"/>`
    + `<path d="M-7 10 Q0 18 7 10 Z" fill="#f1f3f6" stroke="${B.ink}" stroke-width="1.5"/><line x1="0" y1="11" x2="0" y2="15.5" stroke="${B.ink}" stroke-width="1.2"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`;
};

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
  const lb = (x, a, c) => lab(x, 186, a, { size: 13, c: B.ink }) + (c ? lab(x, 202, c, { size: 13, c: B.ink }) : '');
  let b = T(230, 24, 'Thousands of separate networks, all speaking TCP/IP', { size: 15 }) + lab(230, 46, 'No single owner runs the whole Internet.', { size: 13 });
  // the trip, drawn first so the pictures sit on top of it
  b += P('M80 140 L384 140', 'none', HOT, 3.4).replace('M80 140 L384 140', 'M80 140 L290 140 Q298 140 302 164 L342 164 Q346 140 356 140 L384 140');
  b += houseI(12, 96, 70) + lb(47, 'your home', 'LAN');
  // local ISP office with a sign and a mast
  b += L(160, 84, 160, 62, B.ink, 2.2) + wifiArcs(160, 64, AIR, 0.7);
  b += R(108, 84, 64, 72, { r: 3, f: B.blueWash, sw: 2.2 }) + R(114, 90, 52, 18, { r: 3, f: B.blue, s: B.ink, sw: 1.6 }) + T(140, 104, 'ISP', { size: 13, c: '#fff' });
  [0, 1, 2].forEach((c) => [116, 132].forEach((y) => { b += R(116 + c * 17, y, 11, 10, { r: 1, f: '#fff', s: B.ink, sw: 1.2 }); }));
  b += lb(140, 'local ISP');
  // national backbone: a big rack of network gear
  b += R(196, 88, 68, 68, { r: 4, f: '#3b4659', sw: 2.2 });
  [0, 1, 2, 3].forEach((k) => { b += R(202, 94 + k * 15, 56, 11, { r: 1.5, f: '#4f5b70', s: 'none', sw: 0 }); for (let p = 0; p < 6; p++) b += R(205 + p * 7, 97 + k * 15, 4.5, 5, { r: 0.5, f: '#1e2636', s: 'none', sw: 0 }); b += C(252, 99.5 + k * 15, 1.8, k === 2 ? B.amber : '#5fd38a', 'none', 0); });
  b += lb(230, 'national', 'backbone');
  // the sea with the cable running under it
  b += `<path d="M286 146 Q295 141 304 146 T322 146 T340 146 T358 146 L358 176 Q322 180 286 176 Z" fill="#9cc3ea" fill-opacity=".72" stroke="none"/>` + P('M286 146 Q295 141 304 146 T322 146 T340 146 T358 146', 'none', B.blue, 2);
  b += lb(322, 'undersea', 'cable');
  b += serverI(384, 92, 38, 62) + serverI(412, 100, 38, 62) + lb(416, 'servers', 'abroad');
  return svgWrap(460, 212, 'The Internet is a network of networks. Data goes from your home LAN to your local ISP, to big national networks, through an undersea cable, to servers abroad. Thousands of separate networks all use TCP/IP, and no single owner runs the whole thing.', b);
}


/* ================= INTERNET page, chat 51: bigger redraws + new pictures ================= */
const personI = (x, y, s = 1, c = B.blue) => C(x, y, 6 * s, c, 'none', 0) + P(`M${x - 9 * s} ${y + 22 * s} Q${x - 9 * s} ${y + 8 * s} ${x} ${y + 8 * s} Q${x + 9 * s} ${y + 8 * s} ${x + 9 * s} ${y + 22 * s} Z`, c, 'none', 0);
const bars = (x, y, n, on = B.green) => [0, 1, 2, 3].map((k) => R(x + k * 7, y - 6 - k * 5, 5, 6 + k * 5, { r: 1, f: k < n ? on : '#d3d9e2', s: 'none', sw: 0 })).join('');
const gear = (cx, cy, r, f = B.amber) => { let d = ''; for (let k = 0; k < 16; k++) { const a = (k * Math.PI) / 8, rr = k % 2 ? r * 0.72 : r; d += (k ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1) + ' '; } return P(d + 'Z', f, B.ink, 1.8) + C(cx, cy, r * 0.3, B.card, B.ink, 1.6); };
const ICONS51 = {
  // timeline
  arpanet: () => [[12, 13], [36, 13], [12, 35], [36, 35]].map(([x, y], i, a) => '').join('') + P('M12 13 L36 13 L36 35 L12 35 Z M12 13 L36 35', 'none', B.ink, 2) + [[12, 13], [36, 13], [12, 35], [36, 35]].map(([x, y]) => R(x - 7, y - 5, 14, 10, { r: 2, f: B.blueWash, sw: 1.8 })).join(''),
  tcpip: () => R(2, 12, 17, 24, { r: 6, f: B.blueWash, s: B.blue, sw: 2 }) + R(29, 12, 17, 24, { r: 6, f: B.greenWash, s: B.green, sw: 2 }) + L(17, 24, 31, 24, HOT, 4) + C(24, 24, 4, B.card, HOT, 2.2) + C(10, 19, 2, B.blue, 'none', 0) + C(10, 29, 2, B.blue, 'none', 0) + C(38, 19, 2, B.green, 'none', 0) + C(38, 29, 2, B.green, 'none', 0),
  web: () => R(3, 7, 42, 34, { r: 4, f: B.card, sw: 2 }) + R(3, 7, 42, 9, { r: 4, f: B.blueWash, sw: 2 }) + C(8.5, 11.5, 1.6, HOT, 'none', 0) + C(24, 29, 8, B.blueWash, B.blue, 1.8) + P('M16 29 L32 29 M24 21 Q19 29 24 37 M24 21 Q29 29 24 37', 'none', B.blue, 1.4),
  free: () => P('M16 22 L16 14 Q16 4 26 6 Q32 8 32 14', 'none', B.green, 3) + R(10, 22, 28, 20, { r: 3, f: B.green, s: 'none', sw: 0 }) + C(24, 30, 3, '#fff', 'none', 0) + L(24, 31, 24, 37, '#fff', 2.4),
  ph: () => P('M3 34 Q12 26 20 34 T36 30', 'none', B.blue, 2.6) + P('M36 31 Q26 18 29 11 Q36 2 43 11 Q46 18 36 31 Z', B.red, B.ink, 1.6) + C(36, 13, 3.2, '#fff', 'none', 0) + L(3, 40, 30, 40, B.blueMid, 2, DASH),
  business: () => R(6, 6, 22, 38, { r: 2, f: B.grey, sw: 2 }) + [0, 1, 2, 3].map((k) => R(10, 11 + k * 8, 5, 4, { r: 0.5, f: B.blueMid, s: 'none', sw: 0 }) + R(19, 11 + k * 8, 5, 4, { r: 0.5, f: B.blueMid, s: 'none', sw: 0 })).join('') + C(36, 33, 9, B.amber, B.ink, 1.8) + T(36, 37.5, '₱', { size: 12, c: B.ink }),
  sat: () => satI(24, 13, 0.62) + L(24, 22, 19, 33, B.blue, 1.8, ' stroke-dasharray="3 3"') + P('M9 38 Q19 31 29 38 Z', B.grey, B.ink, 1.8) + L(19, 38, 19, 44, B.ink, 2) + L(13, 44, 25, 44, B.ink, 2),
  // community
  users: () => personI(12, 14, 0.9, B.blueMid) + personI(36, 14, 0.9, B.amber) + personI(24, 20, 1.1, B.blue),
  isp: () => L(12, 30, 8, 16, B.ink, 2.6) + L(36, 30, 40, 16, B.ink, 2.6) + R(5, 29, 38, 15, { r: 5, f: B.blueWash, sw: 2 }) + [0, 1, 2, 3].map((k) => C(13 + k * 7, 36.5, 2, k === 3 ? B.amber : B.green, 'none', 0)).join('') + wifiArcs(24, 22, AIR, 0.62),
  infra: () => towerI(16, 4, 30) + P('M2 42 Q10 36 18 42 T34 42 T48 42', 'none', B.blue, 2.6) + R(30, 18, 14, 8, { r: 2, f: B.ink, s: 'none', sw: 0 }) + L(37, 26, 37, 38, B.ink, 2),
  content: () => R(4, 8, 40, 30, { r: 4, f: B.card, sw: 2 }) + P('M19 16 L19 30 L31 23 Z', HOT, 'none', 0) + L(10, 43, 38, 43, B.line, 2.4),
  cloudapp: () => cloudP(24, 28, 0.36, B.blueWash, B.blue) + R(16, 22, 16, 12, { r: 2, f: '#3b4659', s: 'none', sw: 0 }) + L(19, 26, 27, 26, '#9fb0c8', 1.6) + L(19, 30, 27, 30, '#9fb0c8', 1.6),
  makers: () => phoneI(4, 6, 20, 36) + gear(33, 28, 11),
  gov: () => P('M4 16 L24 5 L44 16 Z', B.blueWash, B.ink, 2) + [9, 18, 27, 36].map((x) => R(x, 18, 4, 18, { r: 0.5, f: B.card, sw: 1.4 })).join('') + R(4, 37, 40, 6, { r: 1, f: B.grey, sw: 1.8 }),
  // censorship
  child: () => P('M24 4 L41 10 L41 24 Q41 38 24 45 Q7 38 7 24 L7 10 Z', B.greenWash, B.green, 2.2) + personI(24, 18, 0.85, B.green),
  illegal: () => R(9, 9, 30, 30, { r: 6, f: B.card, sw: 2.2 }) + [[16, 16], [32, 16], [24, 24], [16, 32], [32, 32]].map(([x, y]) => C(x, y, 2.6, B.ink, 'none', 0)).join('') + L(6, 42, 42, 6, B.red, 3.6),
  whole: () => [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => R(4 + c * 14 + (r % 2 ? 7 : 0) - (r % 2 && c === 2 ? 7 : 0), 8 + r * 9, r % 2 && c === 2 ? 7 : 13, 8, { r: 1, f: B.redWash, s: B.red, sw: 1.2 })).join('')).join(''),
};
const ICO51_ALT = { arpanet: 'four linked computers', tcpip: 'two networks joined', web: 'a web page', free: 'an open padlock', ph: 'a cable reaching a map pin', business: 'an office building and a coin', sat: 'a satellite and a dish', users: 'people', isp: 'a home router', infra: 'a cell tower and a cable', content: 'a video', cloudapp: 'a cloud with a server', makers: 'a phone and a gear', gov: 'a government building', child: 'a shield around a child', illegal: 'a crossed-out gambling die', whole: 'a wall' };
/** Small icons for the Internet page (timeline, community cards, censorship). */
export function ico51(kind) { return icoWrap(ICO51_ALT[kind] || kind, ICONS51[kind]()); }

/** The Internet today: five small pictures for the feature cards. */
export function todayPic(kind) {
  let b = '', alt = '';
  if (kind === 'huge') {
    b = T(110, 22, 'about 6 billion online', { size: 16, c: B.blueInk });
    for (let k = 0; k < 8; k++) b += personI(19 + k * 26, 44, 1.05, k < 6 ? B.blue : '#c3cad6');
    b += lab(110, 98, 'about 3 of every 4 people', { size: 14, c: B.ink });
    alt = 'Eight people, six of them colored in: about 3 of every 4 people, about 6 billion, were online in 2025.';
  } else if (kind === 'unequal') {
    const bld = (x, y, w, h, f) => { let o = R(x, y, w, h, { r: 2, f, sw: 1.8 }); for (let yy = y + 6; yy < y + h - 8; yy += 9) for (let xx = x + 4; xx + 4 <= x + w - 3; xx += 7) o += R(xx, yy, 4, 5, { r: 0.6, f: '#fff3c4', s: 'none', sw: 0 }); return o; };
    b = bld(14, 34, 22, 48, '#aab5c6') + bld(38, 20, 26, 62, '#7f9cc4') + bld(66, 44, 20, 38, '#aab5c6') + bars(68, 32, 4);
    b += houseI(128, 22, 50, B.butter) + bars(184, 32, 1, B.red);
    b += T(110, 66, '≠', { size: 22, c: B.soft });
    b += lab(50, 98, 'city', { size: 13.5, c: B.ink }) + lab(50, 114, 'fast', { size: 14, c: B.green }) + lab(160, 98, 'far barangay', { size: 13.5, c: B.ink }) + lab(160, 114, 'slow', { size: 14, c: B.red });
    alt = 'A city with full signal bars next to a far barangay house with one bar: speed and signal are not equal everywhere.';
  } else if (kind === 'mobile') {
    b = phoneI(88, 8, 44, 80) + bars(98, 40, 4) + T(110, 64, '5G', { size: 15, c: B.blueInk }) + wifiArcs(160, 40, AIR, 0.9) + wifiArcs(60, 40, AIR, 0.9);
    b += lab(110, 108, 'most people go online on a phone', { size: 13.5, c: B.ink });
    alt = 'A phone with signal bars and 5G: most people go online mainly on a phone.';
  } else if (kind === 'cloud') {
    b = cloudP(110, 34, 0.7, B.blueWash, B.blue) + [86, 112].map((x) => R(x, 14, 22, 34, { r: 3, f: '#3b4659', sw: 1.6 }) + [22, 30, 38].map((y) => L(x + 4, y, x + 14, y, '#9fb0c8', 1.6) + C(x + 18, y, 1.6, B.green, 'none', 0)).join('')).join('');
    b += ARROW(80, 54, 46, 76, HOT, 2.2) + ARROW(140, 54, 172, 76, HOT, 2.2) + phoneI(30, 78, 20, 34) + laptopI(160, 82, 44);
    alt = 'Servers inside a cloud send files and videos down to a phone and a laptop.';
  } else if (kind === 'owner') {
    const box = (x, y, t) => R(x, y, 72, 26, { r: 6, f: B.card, s: B.blue, sw: 1.8 }) + T(x + 36, y + 18, t, { size: 13, c: B.blueInk });
    b = L(46, 21, 110, 60, B.blueMid, 2) + L(174, 21, 110, 60, B.blueMid, 2) + L(46, 99, 110, 60, B.blueMid, 2) + L(174, 99, 110, 60, B.blueMid, 2);
    b += box(10, 8, 'ISP') + box(138, 8, 'school') + box(10, 86, 'company') + box(138, 86, 'gov\'t');
    b += C(110, 60, 24, B.orangeWash, HOT, 2) + T(110, 65, 'TCP/IP', { size: 12.5, c: B.orangeInk });
    alt = 'Networks of an ISP, a school, a company, and the government all link through TCP/IP. None of them owns the whole Internet.';
  }
  return svgWrap(220, 118, alt, b);
}

/** Censorship: how much gets blocked, from narrow to broad. level 1..3 */
export function censorPic(level) {
  const n = [1, 4, 12][level - 1], ic = ['child', 'illegal', 'whole'][level - 1];
  let b = `<g transform="translate(4 18) scale(1.75)">${ICONS51[ic]()}</g>`;
  for (let k = 0; k < 12; k++) {
    const x = 104 + (k % 4) * 30, y = 14 + Math.floor(k / 4) * 26, on = k < n;
    b += R(x, y, 24, 20, { r: 3, f: on ? B.redWash : B.card, s: on ? B.red : B.line, sw: 1.6 });
    b += on ? L(x + 6, y + 5, x + 18, y + 15, B.red, 2.2) + L(x + 18, y + 5, x + 6, y + 15, B.red, 2.2) : L(x + 5, y + 7, x + 19, y + 7, B.blueMid, 2) + L(x + 5, y + 13, x + 15, y + 13, B.line, 2);
  }
  b += lab(162, 112, ['one kind of content', 'a list of websites', 'whole big services'][level - 1], { size: 14, c: B.red });
  return svgWrap(230, 120, ['Narrow: only one kind of illegal content is blocked; one tile of twelve is crossed out.', 'Middle: a list of websites is blocked; four tiles of twelve are crossed out.', 'Broad: whole services are blocked; all twelve tiles are crossed out.'][level - 1], b);
}

/** IPv4 vs. IPv6 address anatomy, with the home-address analogy. */
export function ipAnatomy() {
  let b = houseI(14, 8, 62) + R(84, 30, 120, 30, { r: 6, f: B.butter, s: B.amber, sw: 1.8 }) + T(144, 50, 'Purok 3, Mati', { size: 13 });
  b += T(230, 50, '≈', { size: 22, c: B.soft });
  b += laptopI(260, 18, 62) + R(334, 30, 118, 30, { r: 6, f: B.blueWash, s: B.blue, sw: 1.8 }) + T(393, 50, '192.0.2.53', { size: 14, mono: true, w: 700, c: B.blueInk });
  b += lab(230, 88, 'A home address tells the rider where to deliver.', { size: 13 }) + lab(230, 106, 'An IP address tells the network where to send packets.', { size: 13 });
  // IPv4 panel
  b += R(6, 120, 448, 124, { r: 10, f: '#f1f6fc', s: B.blue, sw: 1.6 });
  b += T(20, 146, 'IPv4', { size: 18, a: 'start', c: B.blueInk }) + lab(70, 146, '4 numbers, separated by dots', { a: 'start', size: 13.5 });
  ['192', '0', '2', '53'].forEach((v, i) => { const x = 24 + i * 108; b += R(x, 158, 84, 38, { r: 7, f: B.card, s: B.blue, sw: 2 }) + T(x + 42, 184, v, { size: 20, mono: true, w: 700 }) + lab(x + 42, 212, '0 to 255', { size: 12.5, c: B.greyInk }); if (i < 3) b += T(x + 96, 190, '.', { size: 26, w: 900 }); });
  b += lab(230, 234, '32 bits: about 4.3 billion addresses, fewer than the devices online today', { size: 12.5, c: B.blueInk });
  // IPv6 panel
  b += R(6, 258, 448, 120, { r: 10, f: '#fdf3ec', s: HOT, sw: 1.6 });
  b += T(20, 284, 'IPv6', { size: 18, a: 'start', c: B.orangeInk }) + lab(70, 284, 'groups of hexadecimal digits, separated by colons', { a: 'start', size: 13.5 });
  const g6 = [['2001', 96], [':', 18], ['db8', 80], ['::', 50], ['53', 60]];
  let x = 54;
  g6.forEach(([v, w]) => { if (v === ':') b += T(x + w / 2, 324, ':', { size: 22, w: 900 }); else if (v === '::') b += C(x + w / 2, 317, 20, B.orangeWash, HOT, 2) + T(x + w / 2, 324, '::', { size: 20, mono: true, w: 700, c: B.orangeInk }); else b += R(x, 298, w, 38, { r: 7, f: B.card, s: HOT, sw: 2 }) + T(x + w / 2, 324, v, { size: 20, mono: true, w: 700 }); x += w + 12; });
  b += lab(330, 356, ':: = groups of zeros left out', { size: 12.5, c: B.orangeInk, a: 'start' }).replace('x="330"', 'x="246"');
  b += lab(230, 372, '128 bits: about 340 undecillion (340 followed by 36 zeros)', { size: 12.5, c: B.orangeInk });
  return svgWrap(460, 384, 'Like a home address tells a rider where to deliver, an IP address tells the network where to send packets. IPv4 address 192.0.2.53: four numbers from 0 to 255 separated by dots, 32 bits, about 4.3 billion addresses, fewer than the devices online today. IPv6 address 2001:db8::53: groups of hexadecimal digits separated by colons; the double colon means groups of zeros were left out; 128 bits, about 340 undecillion addresses.', b);
}

/** DNS lookup, step 0..3 (bigger). */
export function dnsPic(step) {
  const hl = (on) => (on ? HOT : '#c3cad6');
  let b = phoneI(20, 104, 64, 104, B.card) + T(52, 150, 'dorsu.', { size: 12.5, mono: true, w: 700 }) + T(52, 166, 'edu.ph', { size: 12.5, mono: true, w: 700 }) + lab(52, 230, 'your phone', { size: 14, c: B.ink });
  b += R(166, 12, 134, 66, { r: 10, f: B.butter, s: B.amber, sw: 2 }) + T(233, 40, 'DNS server', { size: 16 }) + lab(233, 62, 'the "phone book"', { size: 13 });
  b += serverI(376, 118, 52, 80) + lab(402, 220, 'web server', { size: 14, c: B.ink }) + lab(402, 238, '203.0.113.10', { size: 13, c: B.greyInk });
  if (step >= 1) b += ARROW(86, 112, 164, 58, hl(step === 1), 2.8);
  if (step === 1) b += R(6, 18, 150, 50, { r: 8, f: B.card, s: HOT, sw: 1.6 }) + T(81, 39, 'What is the IP', { size: 13.5 }) + T(81, 58, 'of dorsu.edu.ph?', { size: 13.5 });
  if (step >= 2) b += ARROW(200, 80, 90, 138, hl(step === 2), 2.8);
  if (step === 2) b += R(196, 100, 166, 34, { r: 8, f: B.card, s: HOT, sw: 1.6 }) + T(279, 122, 'It is 203.0.113.10', { size: 13.5 });
  if (step >= 3) b += ARROW(90, 172, 368, 172, HOT, 2.8) + ARROW(368, 196, 90, 196, B.blue, 2.8) + lab(229, 162, 'Please send the page.', { size: 13.5, c: B.orangeInk }) + lab(229, 216, 'Here it is!', { size: 13.5, c: B.blueInk });
  const alt = ['You type dorsu.edu.ph on your phone. Your phone needs the IP address of that name.', 'Your phone asks a DNS server: what is the IP address of dorsu.edu.ph?', 'The DNS server answers with the IP address, here the example 203.0.113.10.', 'Your phone contacts the web server at that IP address, and the server sends the page back.'][step];
  return svgWrap(460, 248, alt, b);
}

/** Parts of a domain name, read right to left, with the mailing-address analogy. */
export function domainParts() {
  const parts = [['www', 'host name', '(the web server)', B.greyInk, '#eef1f5', 'house'], ['dorsu', 'own name', '(the school)', B.blueInk, B.blueWash, 'city'], ['edu', 'kind of group', '(education)', B.green, B.greenWash, 'province'], ['ph', 'country code', '(Philippines)', B.orangeInk, B.orangeWash, 'country']];
  const ws = [88, 112, 88, 76];
  let b = '', x = 21;
  parts.forEach(([t, a, c, ink, f, an], i) => {
    const cx = x + ws[i] / 2;
    b += R(x, 14, ws[i], 50, { r: 8, f, s: ink, sw: 2.2 }) + T(cx, 47, t, { size: 23, mono: true, w: 700, c: ink });
    b += lab(cx, 88, a, { size: 14, c: ink }) + lab(cx, 106, c, { size: 12.5, c: B.soft });
    b += R(x + 4, 194, ws[i] - 8, 30, { r: 15, f, s: ink, sw: 1.6 }) + T(cx, 214, an, { size: 13.5, c: ink });
    if (i < 3) b += T(x + ws[i] + 9, 52, '.', { size: 28, w: 900 }) + T(x + ws[i] + 9, 214, '‹', { size: 18, c: B.soft });
    x += ws[i] + 18;
  });
  b += ARROW(436, 130, 24, 130, B.soft, 2) + lab(230, 152, 'Read from right to left: big group → smaller group → one site', { size: 13.5, c: B.ink });
  b += lab(230, 182, 'Like a mailing address, from the biggest place to one house:', { size: 13 });
  return svgWrap(460, 234, 'The domain name www.dorsu.edu.ph in four parts. ph is the country code for the Philippines. edu is the kind of group, education. dorsu is the school\'s own name. www is the host name of the web server. Read it from right to left, from the biggest group to one site, like a mailing address: country, province, city, house.', b);
}

/** GEO vs LEO satellites (not to scale), with typical delays. */
export function geoLeo() {
  let b = `<defs><linearGradient id="gl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3edf9"/><stop offset="1" stop-color="#fbfdff"/></linearGradient><linearGradient id="gl-earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0ad"/><stop offset="1" stop-color="#5f9e72"/></linearGradient></defs>`;
  b += `<rect x="0" y="0" width="460" height="300" rx="10" fill="url(#gl-sky)"/>`;
  b += P('M0 258 Q230 206 460 258', 'none', '#cfe3f7', 12);
  b += P('M0 262 Q230 214 460 262 L460 300 L0 300 Z', 'url(#gl-earth)', '#3f7a52', 2) + lab(420, 290, 'Earth', { size: 13, c: '#fff' });
  b += P('M8 214 Q230 160 452 214', 'none', B.blueMid, 1.6).replace('/>', DASH + '/>');
  // you: a house with a dish on the roof
  b += L(236, 207, 136, 58, HOT, 2.6, DASH) + L(240, 208, 312, 196, B.blue, 3);
  b += houseI(184, 200, 60) + lab(214, 290, 'you', { size: 13, c: '#fff' });
  b += `<g transform="translate(238 214) rotate(-18) scale(1.4)"><line x1="0" y1="0" x2="0" y2="7" stroke="${B.ink}" stroke-width="2"/><path d="M-9 -6 Q0 6 9 -6 Z" fill="#f1f3f6" stroke="${B.ink}" stroke-width="1.6"/><path d="M5 -3 L0 -12" stroke="${B.ink}" stroke-width="1.3"/><rect x="-2" y="-14.5" width="4" height="4" rx="1" fill="${B.ink}"/></g>`;
  [[52, 202], [150, 187], [318, 188], [412, 202]].forEach(([x, y]) => { b += satI(x, y, 0.72); });
  b += satI(130, 44, 1.15);
  b += T(184, 30, 'GEO: about 35,786 km up', { size: 15, a: 'start', c: B.orangeInk }) + lab(184, 50, 'one satellite covers a huge area', { size: 13, a: 'start' }) + R(184, 60, 196, 26, { r: 13, f: B.orangeWash, s: HOT, sw: 1.6 }) + T(282, 78, 'reply in about 0.6 s', { size: 13.5, c: B.orangeInk });
  b += T(452, 118, 'LEO: below 1,000 km', { size: 15, a: 'end', c: B.blueInk }) + lab(452, 138, 'many satellites, moving', { size: 13, a: 'end' }) + R(300, 148, 152, 26, { r: 13, f: B.blueWash, s: B.blue, sw: 1.6 }) + T(376, 166, 'reply in under 0.1 s', { size: 13.5, c: B.blueInk });
  b += lab(8, 128, 'not to scale:', { size: 12.5, a: 'start', c: B.greyInk }) + lab(8, 144, 'GEO is dozens of', { size: 12.5, a: 'start', c: B.greyInk }) + lab(8, 160, 'times higher', { size: 12.5, a: 'start', c: B.greyInk });
  return svgWrap(460, 300, 'Satellites for Internet, not to scale. A house with a dish on its roof talks to a GEO satellite about 35,786 kilometers up; one covers a huge area, but a reply takes about 0.6 seconds. LEO satellites fly below 1,000 kilometers, many of them moving across the sky; a reply takes under 0.1 seconds. GEO is dozens of times higher than LEO.', b);
}

/* A browser window drawn like a real one (chat 52): title bar with window buttons and a tab, address bar with a padlock. */
const browserWin = (x, y, w, h, url, tab) => {
  let b = R(x, y, w, h, { r: 8, f: '#fff', sw: 2 });
  b += `<path d="M${x + 1} ${y + 24} L${x + 1} ${y + 8} Q${x + 1} ${y + 1} ${x + 8} ${y + 1} L${x + w - 8} ${y + 1} Q${x + w - 1} ${y + 1} ${x + w - 1} ${y + 8} L${x + w - 1} ${y + 24} Z" fill="#dfe5ee"/>`;
  b += R(x + 1, y + 24, w - 2, 22, { r: 0, f: '#f6f8fb', s: 'none', sw: 0 }) + L(x + 1, y + 46, x + w - 1, y + 46, '#c9d2df', 1.4);
  b += [['#ec6a5e', 11], ['#f4bf4f', 21], ['#61c554', 31]].map(([c, dx]) => C(x + dx, y + 12, 3.6, c, 'none', 0)).join('');
  const tw = Math.min(96, w - 54);
  b += `<path d="M${x + 42} ${y + 25} L${x + 42} ${y + 10} Q${x + 42} ${y + 5} ${x + 47} ${y + 5} L${x + 37 + tw} ${y + 5} Q${x + 42 + tw} ${y + 5} ${x + 42 + tw} ${y + 10} L${x + 42 + tw} ${y + 25} Z" fill="#f6f8fb"/>`;
  b += T(x + 50, y + 19.5, tab, { size: 12, w: 700, a: 'start', c: B.soft });
  b += P(`M${x + 14} ${y + 31} L${x + 10} ${y + 35} L${x + 14} ${y + 39} M${x + 22} ${y + 31} L${x + 26} ${y + 35} L${x + 22} ${y + 39}`, 'none', '#8a94a6', 1.6);
  b += R(x + 34, y + 28, w - 42, 15, { r: 7.5, f: '#fff', s: '#c9d2df', sw: 1.2 });
  b += R(x + 41, y + 34.5, 7, 5.5, { r: 1, f: '#6b7688', s: 'none', sw: 0 }) + P(`M${x + 42.5} ${y + 34.5} L${x + 42.5} ${y + 32.5} Q${x + 44.5} ${y + 29.5} ${x + 46.5} ${y + 32.5} L${x + 46.5} ${y + 34.5}`, 'none', '#6b7688', 1.3);
  b += T(x + 53, y + 39.5, url, { size: 12, mono: true, w: 500, a: 'start', c: B.ink });
  return b;
};
/** Cookies: first-party (remembers you) and third-party (follows you), stacked. */
export function cookiePic() {
  const cookie = (x, y, s = 1) => C(x, y, 11 * s, '#d9a35b', '#8a5a22', 1.8) + C(x - 4 * s, y - 3 * s, 2 * s, '#5a3412', 'none', 0) + C(x + 4 * s, y + 4 * s, 2 * s, '#5a3412', 'none', 0) + C(x + 4 * s, y - 5 * s, 1.5 * s, '#5a3412', 'none', 0);
  let b = T(10, 22, '1 · A site remembers you', { size: 16, a: 'start' }) + lab(214, 22, '(first-party cookie)', { size: 13.5, a: 'start', c: B.blueInk });
  b += browserWin(10, 36, 200, 126, 'shop.example', 'Shop');
  b += T(110, 104, 'Welcome back, Ana!', { size: 14.5, c: B.blueInk });
  b += P('M66 124 L71 124 L76 140 L92 140 L96 129 L73 129', 'none', B.ink, 2) + C(79, 145, 2.2, B.ink, 'none', 0) + C(90, 145, 2.2, B.ink, 'none', 0) + C(96, 122, 7, HOT, 'none', 0) + T(96, 126, '2', { size: 10, c: '#fff' }) + lab(108, 138, 'Cart: 2 items', { size: 13.5, a: 'start' });
  b += ARROW(218, 100, 322, 100, B.ink, 2.2) + cookie(270, 80) + lab(270, 122, 'saved in', { size: 13 }) + lab(270, 138, 'your browser', { size: 13 });
  // laptop with the cookie kept in its browser
  b += R(336, 54, 108, 72, { r: 6, f: B.ink, sw: 2 }) + R(342, 60, 96, 60, { r: 2, f: '#f6f8fb', s: 'none', sw: 0 }) + R(342, 60, 96, 11, { r: 2, f: '#dfe5ee', s: 'none', sw: 0 }) + [0, 1, 2].map((k) => C(347 + k * 6, 65.5, 1.8, ['#ec6a5e', '#f4bf4f', '#61c554'][k], 'none', 0)).join('') + C(390, 57, 1, '#6b7688', 'none', 0);
  b += cookie(390, 96, 1.05);
  b += P('M324 127 L456 127 L448 138 L332 138 Z', '#dfe3ea') + R(375, 127, 30, 3, { r: 1.2, f: '#b7bfcc', s: 'none', sw: 0 });
  b += L(10, 176, 450, 176, B.line, 1.6, DASH);
  b += T(10, 206, '2 · An ad company follows you', { size: 16, a: 'start' }) + lab(266, 206, '(third-party cookie)', { size: 13.5, a: 'start', c: B.orangeInk });
  [[14, 'news.example', 'News'], [250, 'recipes.example', 'Recipes']].forEach(([x, u, t]) => {
    const y = 220, w = 196;
    b += browserWin(x, y, w, 134, u, t);
    b += R(x + 12, y + 56, 110, 8, { r: 2, f: '#aab5c6', s: 'none', sw: 0 }) + R(x + 12, y + 70, 150, 6, { r: 2, f: '#dfe3ea', s: 'none', sw: 0 });
    b += R(x + 12, y + 84, w - 24, 40, { r: 5, f: B.orangeWash, s: HOT, sw: 1.8 }) + R(x + 18, y + 96, 26, 16, { r: 3, f: HOT, s: 'none', sw: 0 }) + T(x + 31, y + 108.5, 'Ad', { size: 12, c: '#fff' });
    b += T(x + 112, y + 109, 'same ad company', { size: 13, c: B.orangeInk });
  });
  b += ARROW(112, 356, 194, 392, HOT, 2) + ARROW(348, 356, 266, 392, HOT, 2) + cookie(132, 378, 0.72) + cookie(328, 378, 0.72);
  b += R(100, 394, 260, 54, { r: 8, f: B.orangeWash, s: HOT, sw: 2 }) + T(230, 416, 'The ad company\'s notes:', { size: 13.5, c: B.orangeInk }) + T(230, 437, 'Ana likes news and cooking', { size: 14, c: B.ink });
  return svgWrap(460, 456, 'Top: a shopping site saves a small cookie file in your browser, so next time it says Welcome back, Ana, and remembers your cart. Bottom: the same ad company shows ads on a news site and a recipe site, so its third-party cookie lets it note that Ana likes news and cooking.', b);
}
