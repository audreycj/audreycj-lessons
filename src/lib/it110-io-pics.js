// IT 110 Input and output devices pictures (chat 43). Same style as it110-app-pics.js: clean SVG strings;
// the page wraps real-world scenes in roughen() if wanted; mechanism pictures stay clean.
// No logos or brand artwork: generic devices only. Orange = input, blue = output (matches the page legend).
import { B, T, R, ARROW, svgWrap } from './it110-illus.js';
import { L, C, P, phone } from './it110-os-pics.js';

const IN = B.orange, OUT = B.blue, PALE = '#eef1f5';
const tag = (x, y, n, c) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="#fff" stroke-width="1.6"/>` + T(x, y + 4, String(n), { size: 11, c: '#fff', w: 900 });
const lab = (x, y, s, o = {}) => T(x, y, s, { size: o.size ?? 13, w: o.w ?? 700, a: o.a ?? 'start', c: o.c ?? B.soft });
const lead = (x1, y1, x2, y2) => L(x1, y1, x2, y2, B.greyInk, 1.2);
/** Grid of small key rectangles inside (x, y, w, h). */
const keys = (x, y, w, h, rows, cols, f = B.grey) => {
  let b = ''; const kw = w / cols, kh = h / rows;
  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) b += R(x + k * kw + 0.8, y + r * kh + 0.8, kw - 1.6, kh - 1.6, { r: 1, f, s: 'none', sw: 0 });
  return b;
};

/* ---------- small device icons (about 40 x 32, top-left at x, y) ---------- */
const kbd = (x, y) => R(x, y + 6, 44, 22, { r: 3, f: B.card, sw: 1.8 }) + keys(x + 3, y + 9, 38, 13, 3, 8) + R(x + 13, y + 23, 18, 3, { r: 1, f: B.grey, s: 'none', sw: 0 });
const mouseI = (x, y) => {
  const m = x + 20;
  return P(`M${m} ${y} C${m + 13} ${y} ${m + 14} ${y + 14} ${m + 13} ${y + 22} C${m + 12} ${y + 32} ${m - 12} ${y + 32} ${m - 13} ${y + 22} C${m - 14} ${y + 14} ${m - 13} ${y} ${m} ${y} Z`, B.card, B.ink, 1.8)
    + L(m, y + 1, m, y + 11, B.ink, 1.4) + L(m - 13, y + 11, m + 13, y + 11, B.ink, 1.4) + R(m - 2, y + 3, 4, 6, { r: 2, f: B.ink, s: 'none', sw: 0 });
};
const micI = (x, y) => {
  const m = x + 20;
  return R(m - 6, y, 12, 20, { r: 6, f: B.grey, sw: 1.8 }) + P(`M${m - 11} ${y + 11} Q${m - 11} ${y + 26} ${m} ${y + 26} Q${m + 11} ${y + 26} ${m + 11} ${y + 11}`, 'none', B.ink, 1.8)
    + L(m, y + 26, m, y + 31, B.ink, 1.8) + L(m - 7, y + 31, m + 7, y + 31, B.ink, 1.8);
};
const monI = (x, y) => R(x, y, 42, 26, { r: 3, f: B.ink, sw: 1.8 }) + R(x + 3, y + 3, 36, 20, { r: 1, f: B.blueWash, s: 'none', sw: 0 }) + L(x + 21, y + 26, x + 21, y + 31, B.ink, 2) + L(x + 12, y + 31, x + 30, y + 31, B.ink, 2);
const printerI = (x, y) => R(x + 9, y, 22, 9, { r: 1, f: B.card, sw: 1.4 }) + R(x, y + 7, 40, 16, { r: 3, f: B.grey, sw: 1.8 }) + R(x + 9, y + 19, 22, 13, { r: 1, f: B.card, sw: 1.4 })
  + L(x + 13, y + 25, x + 27, y + 25, B.line, 1.4) + L(x + 13, y + 29, x + 24, y + 29, B.line, 1.4);
const spkI = (x, y) => R(x + 9, y, 22, 32, { r: 3, f: B.ink, sw: 1.8 }) + C(x + 20, y + 9, 4, B.grey, B.grey, 1) + C(x + 20, y + 22, 7, B.grey, B.grey, 1) + C(x + 20, y + 22, 2.5, B.ink, B.ink, 1);
const chip = (cx, cy, s = 44) => {
  let b = ''; const h = s / 2;
  for (let i = 0; i < 5; i++) {
    const o = -h + 6 + i * (s - 12) / 4;
    b += L(cx + o, cy - h - 6, cx + o, cy - h, B.ink, 2) + L(cx + o, cy + h, cx + o, cy + h + 6, B.ink, 2) + L(cx - h - 6, cy + o, cx - h, cy + o, B.ink, 2) + L(cx + h, cy + o, cx + h + 6, cy + o, B.ink, 2);
  }
  return b + R(cx - h, cy - h, s, s, { r: 4, f: B.ink, sw: 2 }) + R(cx - h + 8, cy - h + 8, s - 16, s - 16, { r: 2, f: B.blueMid, s: 'none', sw: 0 }) + T(cx, cy + 5, 'CPU', { size: 12, w: 900 });
};

/* ---------- Part 1 ---------- */
/** Input -> process -> output, with three devices in each outer column. */
export function ipoPic() {
  const col = (x, title, f, c) => R(x, 8, 126, 190, { r: 10, f, s: c, sw: 2 }) + `<path d="M${x} 38 V18 Q${x} 8 ${x + 10} 8 H${x + 116} Q${x + 126} 8 ${x + 126} 18 V38 Z" fill="${c}"/>` + T(x + 63, 29, title, { size: 14, c: '#fff', w: 900 });
  let b = col(4, 'INPUT', B.orangeWash, IN) + col(152, 'PROCESS', PALE, B.soft) + col(300, 'OUTPUT', B.blueWash, OUT);
  b += kbd(10, 50) + lab(60, 71, 'keyboard') + mouseI(12, 98) + lab(60, 119, 'mouse') + micI(12, 146) + lab(60, 167, 'microphone');
  b += chip(215, 100) + T(215, 160, 'The CPU works', { size: 13, w: 700, c: B.soft }) + T(215, 177, 'on the data', { size: 13, w: 700, c: B.soft });
  b += monI(308, 52) + lab(358, 71, 'screen') + printerI(309, 98) + lab(358, 119, 'printer') + spkI(309, 146) + lab(358, 167, 'speaker');
  b += ARROW(133, 104, 148, 104, B.ink, 3) + ARROW(281, 104, 296, 104, B.ink, 3);
  return svgWrap(430, 206, 'Input, process, output. Keyboard, mouse, and microphone send data in. The CPU works on it. The screen, printer, and speaker give results out.', b);
}

/** Four devices that do both: the input part ringed in orange, the output part ringed in blue. */
export function bothDevices() {
  const ring = (x, y, w, h, c, r = 8) => R(x, y, w, h, { r, f: 'none', s: c, sw: 2.5, dash: '5 4' });
  let b = R(118, 4, 12, 12, { r: 3, f: IN, s: 'none', sw: 0 }) + lab(134, 15, 'input part') + R(236, 4, 12, 12, { r: 3, f: OUT, s: 'none', sw: 0 }) + lab(252, 15, 'output part');
  // touchscreen phone
  b += phone(33, 34, 44, 84, B.blueWash) + ring(28, 30, 54, 92, OUT, 10) + C(59, 78, 7, B.orangeWash, IN, 2.5) + C(59, 78, 13, 'none', IN, 1.5);
  // headset
  b += P('M137 80 Q137 38 165 38 Q193 38 193 80', 'none', B.ink, 4) + R(129, 70, 16, 30, { r: 6, f: B.ink, sw: 2 }) + R(185, 70, 16, 30, { r: 6, f: B.ink, sw: 2 })
    + ring(124, 65, 26, 40, OUT) + ring(180, 65, 26, 40, OUT) + P('M137 98 Q139 118 162 118', 'none', B.ink, 3) + C(166, 118, 5, B.grey, B.ink, 1.8) + C(166, 118, 11, 'none', IN, 2.5);
  // multifunction printer: scanner lid in, printed page out
  b += R(237, 50, 76, 10, { r: 2, f: B.grey, sw: 1.8 }) + R(235, 60, 80, 40, { r: 5, f: B.card, sw: 2 }) + R(251, 92, 48, 24, { r: 1, f: B.card, sw: 1.6 })
    + L(257, 100, 291, 100, B.line, 1.6) + L(257, 106, 285, 106, B.line, 1.6) + ring(231, 44, 88, 22, IN) + ring(245, 87, 60, 34, OUT);
  // smart speaker: mic holes on top in, grille out
  b += R(361, 48, 48, 72, { r: 14, f: B.ink, sw: 2 }) + [377, 385, 393].map((x) => C(x, 57, 1.8, B.orange, 'none', 0)).join('');
  for (let r = 0; r < 5; r++) for (let k = 0; k < 5; k++) b += C(371 + k * 7, 76 + r * 8, 1.6, '#55617a', 'none', 0);
  b += ring(356, 45, 58, 22, IN) + ring(356, 70, 58, 54, OUT);
  b += T(55, 150, 'Touchscreen', { size: 13, w: 800 }) + T(165, 150, 'Headset', { size: 13, w: 800 }) + T(275, 150, 'Multifunction', { size: 13, w: 800 }) + T(275, 166, 'printer', { size: 13, w: 800 }) + T(385, 150, 'Smart speaker', { size: 13, w: 800 });
  return svgWrap(440, 172, 'Four devices with an input part in orange and an output part in blue: a touchscreen phone, a headset, a multifunction printer, and a smart speaker.', b);
}

/** A laptop in an online class, with numbered parts: 1-3 input (orange), 4-5 output (blue). */
export function onlineClass() {
  let s = R(70, 30, 200, 128, { r: 8, f: B.ink, sw: 2 }) + R(80, 42, 180, 108, { r: 2, f: B.blueWash, s: 'none', sw: 0 });
  const shirts = [B.orange, B.green, B.blue, B.amber];
  [[82, 44], [172, 44], [82, 98], [172, 98]].forEach(([x, y], i) => {
    s += R(x, y, 86, 50, { r: 3, f: B.card, s: 'none', sw: 0 }) + `<path d="M${x + 29} ${y + 50} Q${x + 29} ${y + 33} ${x + 43} ${y + 33} Q${x + 57} ${y + 33} ${x + 57} ${y + 50} Z" fill="${shirts[i]}"/>` + C(x + 43, y + 21, 9, B.skin, B.ink, 1.4);
  });
  s += C(170, 36, 2.8, '#6b7688', 'none', 0) + C(157, 36, 1.3, B.grey, 'none', 0) + C(183, 36, 1.3, B.grey, 'none', 0);
  s += P('M60 158 H280 L306 186 H34 Z', B.grey, B.ink, 2) + keys(86, 162, 168, 14, 2, 14, '#b9c2cf') + R(140, 178, 60, 5, { r: 2, f: '#b9c2cf', s: 'none', sw: 0 });
  for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) { s += C(52 + k * 5, 166 + r * 5, 1.2, B.ink, 'none', 0) + C(284 + k * 5, 166 + r * 5, 1.2, B.ink, 'none', 0); }
  s += lead(126, 14, 167, 34) + tag(118, 12, 1, IN) + lead(214, 14, 184, 34) + tag(222, 12, 2, IN) + lead(170, 186, 170, 202) + tag(170, 206, 3, IN);
  s += lead(28, 96, 82, 96) + tag(20, 96, 4, OUT) + lead(26, 186, 52, 172) + tag(20, 192, 5, OUT);
  return svgWrap(320, 218, 'A laptop in an online class. Camera, microphone, and keyboard are input. Screen and speakers are output.', s);
}

/* ---------- Part 2: keyboards ---------- */
const cap = (y1, y2) => P(`M34 ${y1} H86 L96 ${y2} H24 Z`, B.card, B.ink, 2);
const sheets = (y) => R(14, y, 92, 5, { r: 1, f: B.blueMid, sw: 1.3 }) + R(14, y + 8, 92, 5, { r: 1, f: B.blueMid, sw: 1.3 }) + R(10, y + 18, 100, 7, { r: 2, f: B.grey, sw: 1.3 });
/** Inside a membrane key. */
export function keyMembrane() {
  const b = sheets(86) + P('M36 85 Q38 52 60 50 Q82 52 84 85', B.butter, B.ink, 2) + cap(20, 48)
    + lead(94, 34, 118, 34) + lab(122, 38, 'keycap') + lead(80, 64, 118, 64) + lab(122, 68, 'rubber dome') + lead(106, 92, 118, 92) + lab(122, 92, 'contact') + lab(122, 107, 'sheets');
  return svgWrap(230, 118, 'Inside a membrane key: a keycap, a rubber dome under it, and contact sheets at the bottom.', b);
}
/** Inside a scissor-switch key: thinner, with crossed scissor parts around the dome. */
export function keyScissor() {
  const b = sheets(86) + P('M46 85 Q47 64 60 63 Q73 64 74 85', B.butter, B.ink, 2) + L(24, 56, 96, 82, B.blue, 3.4) + L(24, 82, 96, 56, B.blue, 3.4) + cap(36, 52)
    + lead(95, 44, 118, 44) + lab(122, 48, 'keycap') + lead(92, 62, 118, 62) + lab(122, 66, 'scissor parts') + lead(70, 78, 118, 80) + lab(122, 84, 'rubber dome') + lead(106, 94, 118, 98) + lab(122, 102, 'contact sheets', { size: 12.5 });
  return svgWrap(230, 118, 'Inside a scissor-switch key: a thin keycap on two crossed plastic parts, with a small rubber dome and contact sheets under it.', b);
}
/** Inside a mechanical key: its own switch with a stem, a spring, and metal contacts. */
export function keyMech() {
  let b = R(10, 102, 100, 8, { r: 2, f: B.greenWash, sw: 1.3 }) + R(30, 60, 60, 40, { r: 3, f: PALE, sw: 2 });
  b += P('M60 63 l-8 4 l16 4 l-16 4 l16 4 l-16 4 l16 4 l-16 4 l8 4', 'none', B.ink, 1.8) + L(78, 96, 78, 70, B.amber, 3) + L(84, 96, 84, 74, B.amber, 3);
  b += R(54, 47, 12, 15, { r: 1, f: B.orange, sw: 1.6 }) + cap(20, 48);
  b += lead(94, 34, 118, 34) + lab(122, 38, 'keycap') + lead(66, 54, 118, 54) + lab(122, 58, 'stem') + lead(68, 78, 118, 78) + lab(122, 82, 'spring') + lead(86, 92, 118, 104) + lab(122, 106, 'metal') + lab(122, 121, 'contacts');
  return svgWrap(230, 126, 'Inside a mechanical key: the keycap sits on a stem, inside its own switch with a spring and metal contacts.', b);
}

/** QWERTY, AZERTY, QWERTZ: the first six letter keys give each layout its name. */
export function layoutRows() {
  let b = '';
  ['QWERTYUIOP', 'AZERTYUIOP', 'QWERTZUIOP'].forEach((row, r) => {
    const y = 8 + r * 42;
    b += T(4, y + 21, row.slice(0, 6), { size: 14, w: 900, a: 'start', c: B.orangeInk });
    [...row].forEach((ch, k) => { b += R(88 + k * 29, y, 27, 30, { r: 4, f: k < 6 ? B.orangeWash : B.card, s: k < 6 ? IN : B.ink, sw: 1.6 }) + T(101.5 + k * 29, y + 20, ch, { size: 14, w: 800 }); });
  });
  return svgWrap(380, 128, 'The top letter row of three keyboard layouts: QWERTY, AZERTY, and QWERTZ. Each is named after its first six letter keys.', b);
}

/** Phone on-screen keyboard. */
export function kbOnscreen() {
  const inner = R(82, 22, 56, 16, { r: 6, f: B.blueMid, s: 'none', sw: 0 }) + T(110, 34, 'Hello po!', { size: 9, c: '#fff', w: 800 })
    + R(76, 64, 68, 50, { r: 2, f: B.card, s: 'none', sw: 0 }) + keys(78, 66, 64, 34, 3, 8) + R(92, 102, 36, 8, { r: 2, f: B.grey, s: 'none', sw: 0 }) + C(122, 76, 6, B.orangeWash, IN, 2);
  return svgWrap(220, 130, 'A phone with an on-screen keyboard. A finger taps a key picture on the screen.', phone(70, 4, 80, 122, PALE, inner));
}
/** Wireless keyboard and its small USB receiver. */
export function kbWireless() {
  let b = R(8, 40, 140, 56, { r: 6, f: B.card, sw: 2 }) + keys(14, 46, 128, 36, 4, 12) + R(48, 84, 60, 7, { r: 2, f: B.grey, s: 'none', sw: 0 });
  b += P('M156 56 Q162 66 156 76', 'none', B.blueMid, 2.4) + P('M164 50 Q174 66 164 82', 'none', B.blueMid, 2.4);
  b += R(180, 54, 16, 26, { r: 3, f: B.ink, sw: 1.6 }) + R(183, 80, 10, 10, { r: 1, f: B.grey, sw: 1.4 });
  b += T(186, 110, 'USB receiver', { size: 12, w: 700, c: B.soft });
  return svgWrap(230, 120, 'A wireless keyboard sends signals through the air to a small USB receiver.', b);
}
/** Split ergonomic keyboard: two angled halves. */
export function kbErgo() {
  const half = (x) => R(x, 40, 92, 52, { r: 8, f: B.card, sw: 2 }) + keys(x + 6, 46, 80, 40, 4, 6);
  const b = `<g transform="rotate(-10 58 66)">${half(12)}</g><g transform="rotate(10 162 66)">${half(116)}</g>`;
  return svgWrap(220, 120, 'A split ergonomic keyboard: two halves angled apart so the wrists stay straighter.', b);
}

/* ---------- Part 2: mouse and touchpad ---------- */
const mouseBottom = (inner) => P('M80 14 C112 14 116 52 114 92 C112 128 48 128 46 92 C44 52 48 14 80 14 Z', B.card, B.ink, 2.2) + inner;
/** Old ball mouse, seen from below. */
export function ballMouse() {
  return svgWrap(160, 130, 'An old mouse seen from below: a rubber ball sits in a hole underneath.', mouseBottom(C(80, 82, 24, B.ink, B.ink, 2) + C(80, 82, 19, '#9aa6b8', 'none', 0) + C(73, 75, 5, '#d4dbe5', 'none', 0)));
}
/** Optical mouse, seen from below: a small window with a light. */
export function opticalBottom() {
  return svgWrap(160, 130, 'An optical mouse seen from below: no ball, only a small window with a red light.', mouseBottom(C(80, 82, 16, 'rgba(226,83,62,.18)', 'none', 0) + R(71, 73, 18, 18, { r: 3, f: B.ink, sw: 1.6 }) + C(80, 82, 4, '#e2533e', 'none', 0)));
}
/** How an optical mouse works, numbered 1-4 for the list beside it. */
export function opticalSteps() {
  const dots = (ox) => [[8, 9], [22, 6], [31, 18], [12, 26], [26, 31], [5, 34], [34, 4]].map(([x, y]) => C(ox + x, 48 + y, 2.4, B.soft, 'none', 0)).join('');
  let b = L(8, 132, 222, 132, B.ink, 2.4) + `<path d="M8 133 H222 V140 H8 Z" fill="${B.grey}"/>`;
  b += `<path d="M86 124 L76 132 L112 132 L100 124 Z" fill="#e2533e" opacity=".25"/>`;
  b += P('M24 128 C24 84 72 70 120 72 C162 74 192 100 194 128 Z', B.card, B.ink, 2.2) + R(88, 116, 10, 8, { r: 2, f: '#e2533e', sw: 1.4 }) + R(104, 114, 14, 10, { r: 2, f: B.ink, sw: 1.4 });
  b += lead(93, 118, 70, 102) + tag(62, 98, 1, IN) + lead(111, 116, 140, 102) + tag(148, 98, 2, IN);
  // snapshots: the same speckles, shifted as the mouse moves
  b += R(236, 40, 44, 44, { r: 4, f: '#f6f1e6', sw: 1.6 }) + dots(242) + R(296, 40, 44, 44, { r: 4, f: '#f6f1e6', sw: 1.6 }) + dots(296);
  b += ARROW(282, 62, 294, 62, B.soft, 2) + tag(288, 24, 3, IN) + T(288, 100, 'compare', { size: 12, w: 700, c: B.soft });
  // screen with the pointer moving
  b += R(244, 112, 92, 58, { r: 4, f: B.ink, sw: 2 }) + R(249, 117, 82, 48, { r: 1, f: B.blueWash, s: 'none', sw: 0 }) + L(290, 170, 290, 178, B.ink, 2.4) + L(276, 178, 304, 178, B.ink, 2.4);
  b += P('M300 128 l0 16 l4 -4 l3 7 l3 -1.5 l-3 -7 l6 0 Z', '#fff', B.ink, 1.4) + `<path d="M268 136 l0 16 l4 -4 l3 7 l3 -1.5 l-3 -7 l6 0 Z" fill="none" stroke="${B.greyInk}" stroke-width="1.2" stroke-dasharray="2 2"/>` + ARROW(282, 150, 297, 150, OUT, 2) + tag(346, 140, 4, OUT);
  return svgWrap(360, 186, 'How an optical mouse works: 1 a light shines on the desk, 2 a sensor takes quick pictures, 3 it compares them to find the movement, 4 the pointer moves the same way.', b);
}
/** Touchpad gestures: tap, two-finger scroll, pinch or spread. */
export function padGestures() {
  let b = '';
  [10, 130, 250].forEach((x) => { b += R(x, 8, 100, 72, { r: 8, f: PALE, sw: 2 }); });
  b += C(60, 44, 7, B.orangeWash, IN, 2.4) + C(60, 44, 14, 'none', IN, 1.4);
  b += C(168, 44, 7, B.orangeWash, IN, 2.4) + C(186, 44, 7, B.orangeWash, IN, 2.4) + ARROW(206, 44, 206, 16, B.ink, 2) + ARROW(206, 44, 206, 72, B.ink, 2);
  b += C(290, 54, 7, B.orangeWash, IN, 2.4) + C(310, 34, 7, B.orangeWash, IN, 2.4) + ARROW(284, 60, 268, 74, B.ink, 2) + ARROW(316, 28, 332, 14, B.ink, 2);
  b += T(60, 102, 'tap: click', { size: 13, w: 800 }) + T(180, 102, 'two fingers:', { size: 13, w: 800 }) + T(180, 118, 'scroll', { size: 13, w: 800 }) + T(300, 102, 'pinch or spread:', { size: 13, w: 800 }) + T(300, 118, 'zoom', { size: 13, w: 800 });
  return svgWrap(360, 124, 'Three touchpad gestures: tap with one finger to click, slide two fingers to scroll, and pinch or spread two fingers to zoom.', b);
}

/* ---------- Part 2: touchscreens, stylus, trackball ---------- */
const finger = (x, tip) => P(`M${x - 12} 0 V${tip - 12} Q${x - 12} ${tip} ${x} ${tip} Q${x + 12} ${tip} ${x + 12} ${tip - 12} V0`, B.skin, B.ink, 2);
/** Resistive: pressing bends the top layer down to touch the bottom layer. */
export function touchResistive() {
  let b = R(10, 72, 200, 6, { r: 1, f: B.blueMid, sw: 1.4 }) + [30, 55, 160, 185].map((x) => C(x, 62, 2, B.greyInk, 'none', 0)).join('');
  b += P('M10 50 H78 Q94 50 98 62 Q104 72 110 62 Q114 50 130 50 H210', 'none', B.blue, 4) + C(104, 70, 3.5, IN, 'none', 0);
  b += R(10, 96, 200, 24, { r: 2, f: B.ink, sw: 1.6 }) + T(110, 113, 'screen picture', { size: 11, c: '#fff', w: 700 }) + finger(104, 64);
  b += lab(140, 42, 'top layer bends') + lab(140, 90, 'bottom layer');
  return svgWrap(260, 126, 'Resistive touchscreen: a finger presses the flexible top layer down until it touches the bottom layer.', b);
}
/** Capacitive: a finger on the glass changes the electrical field of a grid under it. */
export function touchCapacitive() {
  let b = R(10, 56, 240, 10, { r: 2, f: '#e8f1fb', sw: 1.6 }) + L(10, 79, 250, 79, B.blueMid, 1.6);
  for (let x = 20; x <= 240; x += 20) b += R(x - 3, 76, 6, 6, { r: 1, f: B.blue, s: 'none', sw: 0 });
  b += `<path d="M112 80 Q124 60 136 80 M100 80 Q124 46 148 80" fill="none" stroke="${IN}" stroke-width="2" stroke-dasharray="4 3"/>`;
  b += R(10, 102, 240, 24, { r: 2, f: B.ink, sw: 1.6 }) + T(130, 119, 'screen picture', { size: 11, c: '#fff', w: 700 }) + finger(124, 55);
  b += lab(160, 48, 'glass') + lab(160, 97, 'sensor grid', { size: 12 });
  return svgWrap(260, 130, 'Capacitive touchscreen: a finger touches the glass and changes the electrical field of a sensor grid under it. Nothing bends.', b);
}
const pen = (x, y, digital) => `<g transform="translate(${x} ${y}) rotate(-55)">` + (digital
  ? P('M0 0 L14 -4 L14 4 Z', B.ink, B.ink, 1.4) + R(14, -6, 92, 12, { r: 4, f: B.ink, sw: 1.6 }) + R(38, -8, 12, 3, { r: 1, f: B.greyInk, s: 'none', sw: 0 })
  : R(5, -6, 96, 12, { r: 6, f: B.grey, sw: 1.8 }) + C(2, 0, 6, '#55617a', B.ink, 1.6)) + '</g>';
/** Basic stylus: a soft tip acts like a fingertip. */
export function stylusBasic() {
  const b = R(6, 96, 208, 18, { r: 4, f: B.blueWash, sw: 1.6 }) + C(110, 96, 7, 'none', IN, 1.6) + C(110, 96, 13, 'none', IN, 1.2) + pen(110, 92, false);
  return svgWrap(220, 120, 'A basic stylus with a soft rounded tip tapping a touchscreen.', b);
}
/** Digital (active) pen: fine tip, and pressing harder makes a thicker line. */
export function stylusDigital() {
  const b = R(6, 70, 208, 44, { r: 4, f: B.blueWash, sw: 1.6 }) + P('M16 98 Q60 86 112 92 L112 98 Q60 92 16 99 Z', B.ink, B.ink, 0.8) + pen(114, 94, true);
  return svgWrap(220, 120, 'A digital pen with a fine tip drawing a line that gets thicker as the user presses harder.', b);
}
const topMouse = (x, f = B.card, dash = '') => `<path d="M${x} 46 C${x + 16} 46 ${x + 18} 66 ${x + 17} 80 C${x + 16} 96 ${x - 16} 96 ${x - 17} 80 C${x - 18} 66 ${x - 16} 46 ${x} 46 Z" fill="${f}" stroke="${dash ? B.greyInk : B.ink}" stroke-width="2"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
/** A mouse: the whole device moves across the desk. */
export function mouseMoves() {
  const b = R(4, 30, 192, 80, { r: 8, f: '#f6f1e6', s: 'none', sw: 0 }) + topMouse(48, 'none', '4 4') + topMouse(146) + L(146, 47, 146, 62, B.ink, 1.4) + ARROW(72, 70, 120, 70, IN, 3);
  return svgWrap(200, 116, 'A mouse slides across the desk: the whole device moves.', b);
}
/** A trackball: the base stays put and only the ball turns. */
export function trackballPic() {
  const b = R(46, 58, 108, 46, { r: 22, f: B.grey, sw: 2 }) + C(100, 62, 26, B.blueMid, B.ink, 2) + C(92, 54, 6, '#cfe0f5', 'none', 0)
    + P('M78 30 Q100 16 122 30', 'none', IN, 3) + ARROW(116, 25, 123, 31, IN, 3) + R(56, 92, 16, 6, { r: 2, f: B.ink, s: 'none', sw: 0 }) + R(128, 92, 16, 6, { r: 2, f: B.ink, s: 'none', sw: 0 });
  return svgWrap(200, 116, 'A trackball: the base stays still on the desk, and only the ball on top turns.', b);
}

/* ================= Parts 3-4 (chat 44) ================= */
import { person } from './it110-os-pics.js';
const OK = B.green, NO = B.red, BOX = '#e6c79c', BOXD = '#b98d55', LASER = '#e2533e', COPPER = '#c07a3a';
const check = (x, y, c = OK) => C(x, y, 11, c, 'none', 0) + P(`M${x - 5} ${y} L${x - 1.5} ${y + 4} L${x + 5.5} ${y - 4}`, 'none', '#fff', 2.6);
const cross = (x, y) => C(x, y, 11, NO, 'none', 0) + P(`M${x - 4.5} ${y - 4.5} L${x + 4.5} ${y + 4.5} M${x + 4.5} ${y - 4.5} L${x - 4.5} ${y + 4.5}`, 'none', '#fff', 2.6);
/** Arcs around (cx, cy), facing angle ang (radians), at distances ds: radio or sound waves. */
const waves = (cx, cy, ang, ds, c = IN, w = 2.4, sp = 0.55) => ds.map((d) => {
  const p = (s) => `${(cx + d * Math.cos(ang + s)).toFixed(1)} ${(cy + d * Math.sin(ang + s)).toFixed(1)}`;
  return P(`M${p(-sp)} A${d} ${d} 0 0 1 ${p(sp)}`, 'none', c, w);
}).join('');
const BAR_W = [2, 1, 1, 2, 3, 1, 1, 1, 2, 2, 1, 3, 1, 1, 2, 1, 1, 2, 3, 1, 1, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1, 1];
/** A 1D barcode drawing (not a real code) in (x, y, w, h). */
const bars = (x, y, w, h, c = B.ink) => {
  const tot = BAR_W.reduce((a, k) => a + k, 0), u = w / tot; let d = '', cx = x;
  BAR_W.forEach((k, i) => { if (i % 2 === 0) d += `M${cx.toFixed(1)} ${y}h${(k * u).toFixed(1)}v${h}h-${(k * u).toFixed(1)}Z`; cx += k * u; });
  return `<path d="${d}" fill="${c}"/>`;
};
/** A QR-code-looking drawing (finder squares + fixed random modules; not a real code). */
const qr = (x, y, s, c = B.ink) => {
  const n = 21, u = s / n; let d = '', seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const fin = (r, k) => {
    for (const [r0, k0] of [[0, 0], [0, 14], [14, 0]]) {
      const a = r - r0, b = k - k0;
      if (a >= -1 && a <= 7 && b >= -1 && b <= 7) { if (a < 0 || a > 6 || b < 0 || b > 6) return 0; return Math.min(a, b, 6 - a, 6 - b) === 1 ? 0 : 1; }
    }
    return -1;
  };
  for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) {
    const f = fin(r, k);
    if (f === -1 ? rnd() < 0.47 : f === 1) d += `M${(x + k * u).toFixed(1)} ${(y + r * u).toFixed(1)}h${u.toFixed(2)}v${u.toFixed(2)}h-${u.toFixed(2)}Z`;
  }
  return R(x - u * 2, y - u * 2, s + u * 4, s + u * 4, { r: 2, f: '#fff', s: B.line, sw: 1 }) + `<path d="${d}" fill="${c}" shape-rendering="crispEdges"/>`;
};
/** Handheld reader, nose (window) pointing left at (x, y). */
const gun = (x, y) => P(`M${x} ${y - 11} H${x + 48} Q${x + 58} ${y - 11} ${x + 58} ${y - 1} V${y + 3} Q${x + 58} ${y + 13} ${x + 48} ${y + 13} H${x + 42} L${x + 48} ${y + 46} Q${x + 49} ${y + 52} ${x + 42} ${y + 52} H${x + 34} Q${x + 29} ${y + 52} ${x + 28} ${y + 46} L${x + 24} ${y + 13} H${x} Z`, B.grey, B.ink, 2)
  + R(x - 2, y - 8, 4, 18, { r: 1, f: LASER, s: 'none', sw: 0 }) + P(`M${x + 24} ${y + 18} q-7 4 -2 12`, 'none', B.ink, 2);
const screen = (x, y, w, h) => R(x, y, w, h, { r: 5, f: B.ink, sw: 2 }) + R(x + 6, y + 6, w - 12, h - 16, { r: 2, f: B.blueWash, s: 'none', sw: 0 }) + L(x + w / 2, y + h, x + w / 2, y + h + 10, B.ink, 2.4) + L(x + w / 2 - 22, y + h + 10, x + w / 2 + 22, y + h + 10, B.ink, 2.4);
const fp = (cx, cy, dots = false) => {
  let b = R(cx - 30, cy - 38, 60, 80, { r: 29, f: B.skin, sw: 1.8 });
  for (let i = 1; i <= 6; i++) b += P(`M${cx - i * 4} ${cy + 10 + (i % 2) * 5} V${cy} A${i * 4} ${i * 5} 0 0 1 ${cx + i * 4} ${cy} V${cy + 12 - (i % 2) * 4}`, 'none', '#9a6a45', 1.6);
  if (dots) [[-8, -12], [12, -20], [16, 4], [-14, 8], [4, 14]].forEach(([dx, dy]) => { b += C(cx + dx, cy + dy, 4, IN, '#fff', 1.4); });
  return b;
};

/* ---------- Part 3 ---------- */
/** Checkout: reader -> barcode -> number -> computer shows name and price. Tags 1-4. */
export function barcodeSteps() {
  let b = R(14, 74, 110, 92, { r: 6, f: BOX, s: BOXD, sw: 2 }) + T(69, 95, 'Canned tuna', { size: 12, w: 800, c: '#5a3d17' });
  b += R(28, 104, 82, 50, { r: 2, f: '#fff', s: B.line, sw: 1 }) + bars(34, 108, 70, 32) + T(69, 150, '4 800016 123456', { size: 8, w: 700, mono: true });
  b += `<path d="M150 101 L104 110 L104 140 Z" fill="${LASER}" opacity=".22"/>` + L(150, 101, 104, 125, LASER, 1.6) + gun(150, 100);
  b += ARROW(218, 100, 282, 100, IN, 3) + T(250, 90, '4800016123456', { size: 9, w: 700, mono: true, c: B.soft });
  b += screen(292, 46, 140, 92) + T(362, 80, 'Canned tuna', { size: 14 }) + T(362, 106, '35.00', { size: 17, w: 900, c: B.blueInk });
  b += tag(198, 80, 1, IN) + tag(128, 86, 2, IN) + tag(250, 116, 3, IN) + tag(362, 34, 4, OUT);
  return svgWrap(440, 176, 'Scanning a barcode at the checkout: 1 the cashier points the reader at the barcode, 2 its light reads the pattern of lines, 3 it sends the product number to the computer, 4 the computer shows the item name and price.', b);
}
/** 1D barcode (data along one line) vs. QR code (data across and down). */
export function barQr() {
  let b = T(100, 22, '1D barcode', { size: 15, w: 900 }) + bars(30, 44, 140, 72) + T(100, 132, '4 800016 123456', { size: 11, w: 700, mono: true });
  b += ARROW(30, 152, 170, 152, IN, 2.6) + T(100, 178, 'data along one line', { size: 13, w: 700, c: B.soft });
  b += T(300, 22, 'QR code (a 2D barcode)', { size: 15, w: 900 }) + qr(258, 44, 84);
  b += ARROW(252, 152, 348, 152, IN, 2.6) + ARROW(364, 40, 364, 132, IN, 2.6) + T(300, 178, 'data across and down', { size: 13, w: 700, c: B.soft });
  return svgWrap(400, 188, 'A 1D barcode stores data along one line of bars. A QR code is a 2D barcode: it stores data across and down a square. Drawings, not real codes.', b);
}
/** RFID: the reader sends radio waves; the tag (chip + coil) answers with its ID. */
export function rfidPic() {
  let b = T(50, 30, 'reader', { size: 13 }) + R(18, 42, 64, 96, { r: 10, f: B.grey }) + waves(50, 80, -Math.PI / 2, [8, 15], B.ink, 2, 0.8) + C(50, 86, 3.5, B.ink, 'none', 0) + C(50, 120, 4, OK, 'none', 0);
  b += waves(84, 92, 0, [22, 42, 62], IN, 2.6) + T(150, 34, 'radio waves', { size: 13, c: B.orangeInk });
  b += T(299, 30, 'tag: chip + coil, inside a card', { size: 13 }) + R(214, 44, 170, 100, { r: 10, f: B.card });
  for (let i = 0; i < 4; i++) b += R(226 + i * 7, 54 + i * 7, 146 - i * 14, 80 - i * 14, { r: 6, f: 'none', s: COPPER, sw: 1.5 });
  b += R(290, 85, 18, 18, { r: 2, f: B.ink, sw: 1 });
  b += ARROW(208, 162, 92, 162, IN, 2.4) + T(150, 154, 'the tag answers: ID 0451', { size: 12, w: 700, c: B.soft });
  return svgWrap(400, 172, 'RFID: the reader sends out radio waves. The tag, a tiny chip with a coil antenna inside a card, answers with its ID number.', b);
}
/** Toll gate scene (roughen on the page): RFID sticker on the windshield, reader above the lane, gate opens. */
export function tollGate() {
  let b = L(6, 170, 414, 170, B.ink, 2) + R(226, 26, 188, 14, { r: 3, f: B.blueMid }) + L(406, 40, 406, 170, B.ink, 3);
  b += R(244, 40, 30, 16, { r: 3, f: B.grey }) + C(259, 48, 3, OK, 'none', 0) + T(259, 18, 'reader', { size: 13 });
  b += R(334, 92, 56, 78, { r: 4, f: B.card }) + R(344, 102, 36, 24, { r: 2, f: B.blueWash, sw: 1.6 }) + T(362, 84, 'gate opens', { size: 13 });
  b += L(334, 140, 290, 84, B.ink, 9) + L(334, 140, 290, 84, '#fff', 5.5) + `<line x1="334" y1="140" x2="290" y2="84" stroke="${B.red}" stroke-width="5.5" stroke-dasharray="8 8"/>` + C(334, 140, 5, B.ink, B.ink, 1);
  b += P('M30 154 V134 Q30 124 42 122 L86 118 L112 96 Q116 92 124 92 L162 92 Q170 92 176 98 L198 120 Q206 124 206 134 V154 Z', B.blueMid, B.ink, 2.2);
  b += P('M93 118 L114 99 H140 V118 Z', B.blueWash, B.ink, 1.6) + P('M146 99 H162 Q166 99 170 103 L186 118 H146 Z', B.blueWash, B.ink, 1.6);
  b += R(170, 106, 10, 7, { r: 1, f: IN, s: B.ink, sw: 1 });
  b += C(68, 156, 14, B.ink, B.ink, 2) + C(68, 156, 5, B.grey, B.grey, 1) + C(172, 156, 14, B.ink, B.ink, 2) + C(172, 156, 5, B.grey, B.grey, 1);
  b += waves(256, 58, Math.atan2(48, -78), [16, 32, 48], IN, 2.4, 0.45);
  b += T(108, 66, 'RFID sticker', { size: 13, c: B.orangeInk }) + lead(132, 72, 170, 106);
  return svgWrap(420, 180, 'An RFID toll gate: a reader above the lane reads the RFID sticker on the car windshield, and the gate opens without cash.', b);
}
/** Line of sight: a barcode reader cannot read a code inside a closed box; RFID can. */
export function lineOfSight() {
  const box = (ox, inner) => R(ox + 18, 70, 100, 84, { r: 4, f: BOX, s: BOXD, sw: 2 }) + L(ox + 18, 84, ox + 118, 84, BOXD, 1.5) + inner;
  let b = T(110, 24, 'Barcode reader', { size: 14, w: 900 }) + box(0, R(40, 100, 56, 36, { r: 2, f: 'none', s: B.greyInk, sw: 1.4, dash: '4 3' }) + `<g opacity=".35">${bars(46, 106, 44, 24)}</g>`);
  b += `<path d="M140 101 L118 94 L118 110 Z" fill="${LASER}" opacity=".3"/>` + gun(140, 100) + cross(182, 50) + T(110, 182, 'must see the code', { size: 13, w: 700, c: B.soft });
  b += T(330, 24, 'RFID reader', { size: 14, w: 900 }) + box(220, R(262, 104, 52, 30, { r: 3, f: 'none', s: B.greyInk, sw: 1.4, dash: '4 3' }) + R(282, 113, 12, 12, { r: 2, f: B.ink, s: 'none', sw: 0 }));
  b += waves(358, 101, Math.PI, [14, 30, 46, 62], IN, 2.4, 0.45) + gun(360, 100) + check(402, 50) + T(330, 182, 'reads it through the box', { size: 13, w: 700, c: B.soft });
  return svgWrap(440, 192, 'Line of sight: a barcode reader cannot read a barcode hidden inside a closed box. An RFID reader can read a tag inside the box, because radio waves pass through cardboard.', b);
}
/** How a biometric reader works: capture, features, template, compare. Tags 1-4. */
export function bioSteps() {
  let b = fp(60, 84) + fp(170, 84, true);
  b += R(240, 52, 80, 66, { r: 6, f: B.card }) + ['12, 47', '83, 05', '61, 29'].map((s, i) => T(280, 75 + i * 17, s, { size: 13, w: 700, mono: true })).join('');
  const mini = (x) => R(x, 56, 34, 48, { r: 4, f: B.card, sw: 1.6 }) + [0, 1, 2].map((i) => R(x + 6, 64 + i * 12, 22, 5, { r: 2, f: B.grey, s: 'none', sw: 0 })).join('');
  b += mini(352) + mini(396) + T(391, 86, '=', { size: 16, w: 900 }) + check(391, 124);
  b += ARROW(98, 84, 126, 84, B.ink, 2.4) + ARROW(206, 84, 234, 84, B.ink, 2.4) + ARROW(324, 84, 346, 84, B.ink, 2.4);
  ['capture', 'find features', 'make a template', 'compare'].forEach((s, i) => { b += tag([60, 170, 280, 391][i], 18, i + 1, IN) + T([60, 170, 280, 391][i], 152, s, { size: 13 }) + T([60, 170, 280, 391][i], 168, ['sensor records it', 'key points', 'list of numbers', 'new vs. saved'][i], { size: 12, w: 700, c: B.soft }); });
  return svgWrap(440, 176, 'How a biometric reader works: 1 capture a sample, 2 find the key features, 3 turn them into a template, a list of numbers, 4 compare it with the saved template.', b);
}
/** Verify (1:1) vs. identify (1:N). */
export function verifyIdentify() {
  const card = (x, y, w, h, name, hi) => R(x, y, w, h, { r: 5, f: hi ? B.orangeWash : B.card, s: hi ? IN : B.ink, sw: hi ? 2.4 : 1.6 }) + T(x + w / 2, y + h / 2 + 5, name, { size: 13 });
  let b = T(110, 22, 'Verify (1:1)', { size: 15, w: 900 }) + T(110, 42, '"Is this really Ana?"', { size: 12, w: 700, c: B.soft });
  b += person(36, 84, B.orange) + ARROW(56, 100, 96, 100, B.ink, 2.4) + card(104, 80, 84, 40, 'Ana', true) + check(146, 146) + T(110, 182, 'checks 1 saved record', { size: 12, w: 700, c: B.soft });
  b += T(330, 22, 'Identify (1:N)', { size: 15, w: 900 }) + T(330, 42, '"Who is this?"', { size: 12, w: 700, c: B.soft });
  b += person(254, 84, B.orange) + ARROW(274, 100, 310, 100, B.ink, 2.4);
  ['Ana', 'Ben', 'Carlo', 'Dina'].forEach((n, i) => { b += card(318, 54 + i * 26, 84, 22, n, i === 1); });
  b += check(414, 91) + T(330, 182, 'searches many saved records', { size: 12, w: 700, c: B.soft });
  return svgWrap(440, 192, 'Verify, one to one: the reader compares you with one saved record, Ana. Identify, one to many: it searches many saved records to find who you are, Ben.', b);
}
/** Face ID dot map vs. a flat camera picture that a printed photo can fool. */
export function faceDots() {
  const face = (cx, cy, rx, ry, dots) => {
    let b = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${B.skin}" stroke="${B.ink}" stroke-width="1.8"/>` + P(`M${cx - rx + 2} ${cy - ry * 0.35} Q${cx} ${cy - ry * 1.35} ${cx + rx - 2} ${cy - ry * 0.35}`, B.hair, B.hair, 1);
    b += C(cx - rx * 0.36, cy - 2, 2.6, B.ink, 'none', 0) + C(cx + rx * 0.36, cy - 2, 2.6, B.ink, 'none', 0) + P(`M${cx - 7} ${cy + ry * 0.45} Q${cx} ${cy + ry * 0.55} ${cx + 7} ${cy + ry * 0.45}`, 'none', B.ink, 1.6);
    if (dots) for (let y = cy - ry + 10; y < cy + ry; y += 8) for (let x = cx - rx + 4; x < cx + rx; x += 8) { const k = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (k < 0.82) b += C(x + ((y / 8) % 2) * 3, y, 1.4, LASER, 'none', 0); }
    return b;
  };
  let b = T(105, 22, 'Face ID: 3D dot map', { size: 14, w: 900 }) + phone(16, 60, 34, 66, B.blueWash);
  b += `<path d="M50 80 L104 52 L104 144 L50 98 Z" fill="${LASER}" opacity=".1"/>` + face(140, 98, 36, 46, true) + T(105, 180, 'measures the 3D shape', { size: 12, w: 700, c: B.soft });
  b += T(315, 22, 'Flat camera picture', { size: 14, w: 900 }) + phone(226, 60, 34, 66, B.blueWash);
  b += R(300, 46, 82, 106, { r: 2, f: '#fff', sw: 1.6 }) + face(341, 99, 28, 36, false) + T(341, 146, 'printed photo', { size: 10, w: 700, c: B.greyInk });
  b += `<path d="M260 80 L300 62 L300 136 L260 98 Z" fill="${B.blueMid}" opacity=".25"/>` + T(315, 180, 'a photo can fool it more easily', { size: 12, w: 700, c: B.soft });
  return svgWrap(420, 190, 'Face ID shines thousands of invisible dots on the face to measure its 3D shape. A face unlock that only compares a flat camera picture is easier to fool with a printed photo.', b);
}
/** Paper -> scanner -> image file -> OCR (text) or OMR (marks). */
export function paperData() {
  let b = R(8, 58, 56, 78, { r: 2, f: '#fff', sw: 1.8 }) + [70, 78, 86].map((y) => L(16, y, 56, y, B.line, 2)).join('') + C(22, 104, 4.5, '#fff', B.ink, 1.3) + C(36, 104, 4.5, B.ink, B.ink, 1.3) + C(50, 104, 4.5, '#fff', B.ink, 1.3) + L(16, 120, 46, 120, B.line, 2);
  b += T(36, 156, 'paper', { size: 13 }) + ARROW(70, 98, 92, 98, B.ink, 2.4);
  b += R(98, 74, 84, 10, { r: 3, f: B.card, sw: 1.8 }) + R(98, 84, 84, 32, { r: 4, f: B.grey }) + L(106, 96, 174, 96, '#7fbbe8', 3) + T(140, 156, 'scanner', { size: 13 });
  b += ARROW(188, 98, 210, 98, B.ink, 2.4);
  b += P('M216 60 H254 L266 72 V136 H216 Z', B.card, B.ink, 1.8) + P('M254 60 V72 H266', 'none', B.ink, 1.4) + R(222, 80, 38, 30, { r: 2, f: B.blueWash, sw: 1.2 }) + P('M224 108 L236 92 L246 102 L252 96 L258 108 Z', B.green, 'none', 0) + T(241, 128, '.jpg', { size: 11, w: 700, mono: true });
  b += T(241, 156, 'image file', { size: 13 }) + ARROW(272, 90, 298, 64, B.ink, 2.2) + ARROW(272, 106, 298, 132, B.ink, 2.2);
  b += R(304, 28, 148, 62, { r: 8, f: B.orangeWash, s: IN }) + T(378, 48, 'OCR reads the letters', { size: 12, w: 900, c: B.orangeInk }) + R(314, 60, 128, 22, { r: 3, f: '#fff', s: B.line, sw: 1 }) + T(320, 76, 'Mati City is in…', { size: 13, w: 700, a: 'start' }) + L(432, 64, 432, 79, B.ink, 1.6);
  b += R(304, 108, 148, 62, { r: 8, f: B.orangeWash, s: IN }) + T(378, 128, 'OMR checks the marks', { size: 12, w: 900, c: B.orangeInk });
  b += ['A', 'B', 'C', 'D'].map((s, i) => C(322 + i * 18, 152, 6.5, i === 1 ? B.ink : '#fff', B.ink, 1.4)).join('') + T(424, 157, 'B', { size: 15, w: 900, c: B.blueInk }) + ARROW(394, 152, 412, 152, B.soft, 1.8);
  return svgWrap(460, 178, 'From paper to data: the scanner makes a picture of the page. OCR then reads the letters into editable text. OMR checks which bubble is shaded and records the answer.', b);
}
/* scanner kinds: small cards, 170 x 110 */
export function scanFlatbed() {
  const b = R(16, 14, 138, 12, { r: 4, f: B.card }) + R(16, 30, 138, 70, { r: 6, f: B.grey }) + R(26, 38, 118, 54, { r: 2, f: '#cfe6f7', sw: 1.4 }) + R(40, 44, 56, 42, { r: 1, f: '#fff', sw: 1.4 }) + [52, 60, 68, 76].map((y) => L(46, y, 90, y, B.line, 2)).join('');
  return svgWrap(170, 110, 'A flatbed scanner from above: the lid is open and a page lies face down on the glass.', b);
}
export function scanSheetfed() {
  const b = P('M58 52 L70 12 H118 L110 52 Z', '#fff', B.ink, 1.6) + P('M50 52 L62 18 H110 L102 52 Z', '#fff', B.ink, 1.6) + R(28, 50, 114, 40, { r: 8, f: B.grey }) + R(46, 62, 78, 5, { r: 2, f: B.ink, s: 'none', sw: 0 })
    + P('M46 90 H124 L132 104 H38 Z', '#fff', B.ink, 1.6) + ARROW(150, 16, 150, 58, IN, 2.4);
  return svgWrap(170, 110, 'A sheet-fed scanner: a stack of pages goes in at the top and comes out at the bottom, one by one.', b);
}
export function scanPortable() {
  const b = R(58, 18, 54, 44, { r: 1, f: '#fff', sw: 1.6 }) + [28, 36, 44].map((y) => L(64, y, 104, y, B.line, 2)).join('') + R(22, 56, 126, 24, { r: 11, f: B.grey }) + R(54, 60, 62, 4, { r: 2, f: B.ink, s: 'none', sw: 0 }) + C(132, 68, 3, OK, 'none', 0);
  return svgWrap(170, 96, 'A portable scanner: a small, light bar that a page feeds through. Easy to carry in a bag.', b);
}
export function scanHandheld() {
  const b = R(20, 20, 112, 84, { r: 2, f: '#fff', sw: 1.6 }) + [32, 42, 52, 62, 72, 82, 92].map((y) => L(30, y, 122, y, B.line, 2)).join('') + R(58, 12, 26, 96, { r: 9, f: B.grey }) + L(64, 20, 64, 100, LASER, 2) + ARROW(92, 58, 146, 58, IN, 2.6);
  return svgWrap(170, 112, 'A handheld scanner: you slide the wand across the page by hand.', b);
}
export function scanMfp() {
  const b = R(24, 26, 122, 14, { r: 4, f: B.card }) + R(24, 40, 122, 50, { r: 6, f: B.grey }) + R(112, 50, 24, 14, { r: 2, f: B.blueWash, sw: 1.2 }) + R(46, 70, 60, 6, { r: 2, f: B.ink, s: 'none', sw: 0 }) + P('M48 76 H104 L108 100 H44 Z', '#fff', B.ink, 1.6) + L(54, 86, 96, 86, B.line, 2) + L(54, 93, 90, 93, B.line, 2);
  return svgWrap(170, 110, 'A multifunction printer: a scanner lid on top and a printer below, in one machine.', b);
}
/* OCR and OMR in real life: two cards */
export function omrSheet() {
  let b = R(30, 6, 110, 112, { r: 3, f: '#fff', sw: 1.6 }) + T(85, 22, 'ANSWER SHEET', { size: 10, w: 900 });
  [1, 0, 3, 2, 1].forEach((k, r) => { b += T(42, 42 + r * 17, `${r + 1}.`, { size: 10, w: 800 }); for (let i = 0; i < 4; i++) b += C(60 + i * 20, 38 + r * 17, 6, i === k ? B.ink : '#fff', B.ink, 1.2); });
  return svgWrap(170, 124, 'A shaded answer sheet: one bubble is shaded in each row. An OMR reader checks which bubbles are marked.', b);
}
export function ocrPhone() {
  let b = phone(56, 4, 58, 116, '#fff');
  [24, 36, 48, 72, 84, 96].forEach((y) => { b += L(64, y, 106, y, B.line, 3); });
  b += R(62, 55, 46, 12, { r: 2, f: B.orangeWash, s: IN, sw: 1.4 }) + L(66, 61, 104, 61, B.soft, 3) + R(98, 36, 44, 18, { r: 9, f: B.ink, s: 'none', sw: 0 }) + T(120, 49, 'Copy', { size: 11, c: '#fff' });
  return svgWrap(170, 124, 'A phone camera app finds the text in a photo. One line is selected and a Copy button appears.', b);
}
/* three kinds of fingerprint sensors (Group 4): cards 170 x 120; finger() is from Part 2 */
const fpGlass = (y) => R(14, y, 142, 8, { r: 1, f: '#cfe6f7', sw: 1.4 });
export function fpOptical() {
  const b = finger(85, 52) + fpGlass(52) + R(70, 92, 30, 16, { r: 3, f: B.ink, sw: 1 }) + C(85, 100, 4, B.blueMid, 'none', 0) + R(28, 96, 14, 8, { r: 2, f: B.amber, sw: 1 })
    + ARROW(38, 94, 74, 64, B.amber, 2) + ARROW(96, 64, 88, 90, B.amber, 2) + T(36, 116, 'light', { size: 10, w: 800, c: B.soft }) + T(85, 120, 'camera', { size: 10, w: 800, c: B.soft });
  return svgWrap(170, 124, 'Optical fingerprint sensor: a light shines up at the finger on the glass, and a tiny camera takes a picture of the ridges.', b);
}
export function fpCapacitive() {
  let b = finger(85, 58);
  for (let i = 0; i < 9; i++) b += R(22 + i * 14, 62, 11, 11, { r: 1, f: i > 1 && i < 7 ? IN : B.grey, s: B.ink, sw: 1 });
  b += R(16, 76, 138, 10, { r: 2, f: B.ink, sw: 1 }) + T(85, 104, 'tiny metal plates sense', { size: 10, w: 800, c: B.soft }) + T(85, 116, 'the skin’s charge', { size: 10, w: 800, c: B.soft });
  return svgWrap(170, 124, 'Capacitive fingerprint sensor: a grid of tiny plates senses the small electrical charge where the skin’s ridges touch.', b);
}
export function fpUltrasonic() {
  const b = finger(85, 44) + R(14, 44, 142, 10, { r: 1, f: B.ink, sw: 1.4 }) + R(18, 46, 134, 6, { r: 1, f: B.blueWash, s: 'none', sw: 0 }) + R(60, 96, 50, 10, { r: 2, f: B.grey, sw: 1.4 })
    + waves(85, 96, -Math.PI / 2, [12, 22, 32], IN, 2.2, 0.6) + T(85, 120, 'sound pulses, under the screen', { size: 10, w: 800, c: B.soft });
  return svgWrap(170, 124, 'Ultrasonic fingerprint sensor: under the screen, it sends sound pulses up to the finger and maps the ridges from the echoes.', b);
}

/* ---------- Part 4 ---------- */
export function camPhone() {
  const b = R(56, 6, 58, 100, { r: 10, f: B.ink }) + R(63, 14, 28, 44, { r: 8, f: '#2c3a55', sw: 1.4 }) + C(77, 26, 7, '#0e1424', B.grey, 2) + C(77, 45, 7, '#0e1424', B.grey, 2) + C(101, 22, 3.5, B.butter, 'none', 0);
  return svgWrap(170, 112, 'The back of a smartphone with two camera lenses and a flash.', b);
}
export function camWebcam() {
  const b = R(20, 46, 130, 60, { r: 5, f: B.ink }) + R(26, 52, 118, 46, { r: 2, f: B.blueWash, s: 'none', sw: 0 }) + person(85, 62, B.blueMid) + R(76, 38, 18, 12, { r: 2, f: B.ink, sw: 1 })
    + R(52, 10, 66, 30, { r: 15, f: B.ink }) + C(85, 25, 10, '#0e1424', B.grey, 2.5) + C(108, 25, 2.5, OK, 'none', 0);
  return svgWrap(170, 112, 'A USB webcam clipped on top of a monitor, for video calls and online classes.', b);
}
export function camDslr() {
  const b = P('M24 38 H58 L66 26 H104 L112 38 H146 Q150 38 150 42 V96 Q150 100 146 100 H24 Q20 100 20 96 V42 Q20 38 24 38 Z', B.ink, B.ink, 2) + R(120, 30, 16, 8, { r: 2, f: B.greyInk, sw: 1 })
    + C(85, 70, 27, '#2c3a55', B.grey, 3) + C(85, 70, 17, '#0e1424', B.greyInk, 2) + C(79, 64, 4, '#5b6f94', 'none', 0);
  return svgWrap(170, 112, 'A DSLR or mirrorless camera with a large lens that can be changed.', b);
}
/** Inside a digital camera: light -> lens -> image sensor -> processor -> file. Tags 1-4. */
export function camSteps() {
  let b = R(92, 40, 278, 104, { r: 12, f: '#f1f4f8', s: B.greyInk, sw: 1.6, dash: '6 4' }) + T(231, 162, 'inside the camera', { size: 11, w: 700, c: B.greyInk });
  b += C(24, 42, 11, B.amber, B.ink, 1.6) + R(44, 96, 8, 30, { r: 1, f: '#8a5a32', sw: 1.4 }) + C(48, 86, 18, B.green, B.ink, 1.6);
  b += L(68, 80, 124, 74, B.amber, 2.2) + L(68, 104, 124, 108, B.amber, 2.2) + L(136, 74, 196, 104, B.amber, 2.2) + L(136, 108, 196, 78, B.amber, 2.2);
  b += P('M130 60 Q144 91 130 122 Q116 91 130 60 Z', '#cfe6f7', B.ink, 2) + T(130, 136, 'lens', { size: 13 });
  b += R(196, 64, 40, 54, { r: 2, f: '#33425f' }) + keys(199, 67, 34, 48, 6, 5, B.blueMid) + T(210, 136, 'image sensor', { size: 13 });
  b += ARROW(240, 91, 266, 91, B.ink, 2.2) + chip(302, 91, 42) + T(304, 136, 'processor', { size: 13 }) + ARROW(334, 91, 388, 91, B.ink, 2.2);
  b += P('M392 62 H428 L440 74 V122 H392 Z', B.card, B.ink, 1.8) + R(398, 80, 36, 26, { r: 2, f: B.blueWash, sw: 1.2 }) + P('M400 104 L410 90 L418 98 L424 92 L432 104 Z', B.green, 'none', 0) + T(416, 138, 'photo file', { size: 13 });
  b += tag(70, 64, 1, IN) + tag(130, 50, 2, IN) + tag(216, 50, 3, IN) + tag(302, 52, 4, IN);
  return svgWrap(450, 170, 'How a digital camera works: 1 light from the scene enters, 2 the lens focuses it, 3 the image sensor turns the light into electrical charges, 4 the processor turns them into pixels and saves a photo file.', b);
}
/** A small photo, and a zoom into one corner that shows its pixels. */
export function pixelZoom() {
  const hill = (x) => 102 - 34 * Math.sin(((x - 16) / 150) * Math.PI);
  let pts = ''; for (let x = 16; x <= 166; x += 5) pts += ` L${x} ${hill(x).toFixed(1)}`;
  let b = R(16, 34, 150, 100, { r: 2, f: B.blueWash, sw: 0, s: 'none' }) + C(46, 58, 11, B.amber, 'none', 0) + `<path d="M16 134${pts.replace(' L', ' L')} L166 134 Z" fill="${B.green}"/>` + R(16, 34, 150, 100, { r: 2, f: 'none', sw: 2 });
  const zx = 116, zy = 60, zs = 26, n = 8, cs = 20, gx = 210, gy = 24;
  b += R(zx, zy, zs, zs, { r: 1, f: 'none', s: IN, sw: 2.5 }) + L(zx + zs, zy, gx, gy, IN, 1.2, ' stroke-dasharray="4 3"') + L(zx + zs, zy + zs, gx, gy + n * cs, IN, 1.2, ' stroke-dasharray="4 3"');
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const px = zx + ((i + 0.5) * zs) / n, py = zy + ((j + 0.5) * zs) / n;
    b += R(gx + i * cs, gy + j * cs, cs, cs, { r: 0, f: py > hill(px) ? B.green : B.blueWash, s: '#fff', sw: 1 });
  }
  b += R(gx, gy, n * cs, n * cs, { r: 0, f: 'none', s: IN, sw: 2.5 }) + T(91, 156, 'a photo', { size: 13 }) + T(gx + 80, 204, 'zoomed in: each square is one pixel', { size: 13 });
  return svgWrap(430, 214, 'A small photo of a hill and the sun, and a zoom into one corner: the picture is made of tiny colored squares called pixels.', b);
}
/** The same curved edge at three video resolutions (simplified). */
export function videoRes() {
  let b = '';
  [[6, '480p'], [9, '720p'], [14, '1080p']].forEach(([n, name], k) => {
    const ox = 14 + k * 146, s = 120, cs = s / n;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const x = (i + 0.5) * cs, y = s - (j + 0.5) * cs; if (x * x + y * y < 100 * 100) b += R(ox + i * cs, 10 + j * cs, cs + 0.3, cs + 0.3, { r: 0, f: B.blueMid, s: 'none', sw: 0 }); }
    b += R(ox, 10, s, s, { r: 2, f: 'none', sw: 1.6 }) + T(ox + 60, 152, name, { size: 15, w: 900 });
  });
  return svgWrap(450, 162, 'The same curved edge, zoomed in, at 480p, 720p, and 1080p. More rows of pixels make the edge smoother and sharper. Simplified.', b);
}
/** Where a moving ball is shown during one second: 4 frames vs. 8 frames (simplified). */
export function frameRate() {
  let b = T(20, 24, '4 frames: big jumps, looks jumpy', { size: 13, a: 'start' }) + L(20, 56, 440, 56, B.line, 2);
  for (let i = 0; i < 4; i++) { const x = 32 + i * 132; b += C(x, 56, 12, IN, B.ink, 1.6) + T(x, 88, String(i + 1), { size: 11, w: 800, c: B.greyInk }); }
  b += T(20, 118, '8 frames: small steps, looks smoother', { size: 13, a: 'start' }) + L(20, 150, 440, 150, B.line, 2);
  for (let i = 0; i < 8; i++) { const x = 32 + i * 56.6; b += C(x, 150, 12, IN, B.ink, 1.6) + T(x, 182, String(i + 1), { size: 11, w: 800, c: B.greyInk }); }
  return svgWrap(460, 190, 'A ball moving across the screen in one second. With 4 frames it jumps in big steps. With 8 frames it moves in small steps, so the motion looks smoother. Simplified.', b);
}
/** Microphone: sound waves -> diaphragm -> signal -> converter -> digital. Tags 1-4 for the list beside it. */
export function micSteps() {
  let b = C(26, 90, 16, B.skin, B.ink, 1.8) + P('M11 88 Q14 70 30 73 Q40 75 42 84', B.hair, B.hair, 2) + C(34, 86, 1.8, B.ink, 'none', 0) + P('M34 97 Q38 94 41 97', 'none', B.ink, 1.6) + waves(44, 90, 0, [14, 26, 38], B.amber, 2.4);
  b += R(96, 46, 82, 88, { r: 34, f: '#f1f4f8', s: B.ink, sw: 2 }) + P('M120 62 Q128 90 120 118', 'none', IN, 3.5) + P('M128 62 Q136 90 128 118', 'none', IN, 1.2) + ARROW(138, 90, 150, 90, B.soft, 1.6) + ARROW(116, 90, 106, 90, B.soft, 1.6);
  b += P('M182 90 q8 -18 16 0 t16 0 t16 0 t16 0 t16 0', 'none', B.blue, 2.6) + ARROW(262, 90, 274, 90, B.blue, 2.6);
  b += R(280, 66, 58, 48, { r: 4, f: B.ink }) + T(309, 95, 'ADC', { size: 13, c: '#fff' }) + ARROW(342, 90, 360, 90, B.ink, 2.4) + T(400, 86, '0101', { size: 17, w: 800, mono: true }) + T(400, 108, '1100', { size: 17, w: 800, mono: true });
  b += tag(64, 54, 1, IN) + tag(124, 34, 2, IN) + tag(222, 60, 3, IN) + tag(309, 52, 4, IN);
  return svgWrap(440, 150, 'How a microphone works: 1 your voice makes sound waves, 2 they push the diaphragm back and forth, 3 the movement becomes an electrical signal, 4 a converter chip turns it into digital data.', b);
}
export function micDynamic() {
  let b = waves(8, 66, 0, [12, 22], B.amber, 2.2) + P('M44 30 Q54 66 44 102', 'none', IN, 3.5) + R(94, 48, 64, 36, { r: 3, f: B.red, sw: 1.8 }) + T(126, 71, 'magnet', { size: 11, c: '#fff' });
  for (let i = 0; i < 5; i++) b += `<ellipse cx="${60 + i * 8}" cy="66" rx="4" ry="22" fill="none" stroke="${COPPER}" stroke-width="2"/>`;
  b += L(48, 66, 56, 66, B.ink, 2) + T(44, 118, 'diaphragm', { size: 11, w: 800, c: B.soft }) + T(80, 34, 'coil', { size: 11, w: 800, c: B.soft });
  return svgWrap(170, 124, 'Inside a dynamic microphone: the diaphragm moves a coil of wire near a magnet, which makes the signal.', b);
}
export function micCondenser() {
  const b = waves(8, 66, 0, [12, 22], B.amber, 2.2) + P('M58 30 Q64 66 58 102', 'none', IN, 2) + R(84, 30, 10, 72, { r: 2, f: B.greyInk, sw: 1.6 })
    + T(72, 50, '+', { size: 13, c: B.blueInk }) + T(72, 74, '+', { size: 13, c: B.blueInk }) + T(72, 98, '+', { size: 13, c: B.blueInk })
    + T(52, 118, 'thin film', { size: 11, w: 800, c: B.soft }) + T(124, 118, 'back plate', { size: 11, w: 800, c: B.soft }) + T(132, 66, 'the charge', { size: 11, w: 800, c: B.soft }) + T(132, 80, 'changes', { size: 11, w: 800, c: B.soft });
  return svgWrap(170, 124, 'Inside a condenser microphone: a very thin film moves near a back plate, and the electrical charge between them changes.', b);
}
export function micUsb() {
  let b = R(60, 8, 30, 54, { r: 15, f: B.grey, sw: 2 }); for (let y = 18; y < 54; y += 7) b += L(64, y, 86, y, B.greyInk, 1.2);
  b += L(75, 62, 75, 84, B.ink, 3) + R(50, 84, 50, 8, { r: 4, f: B.ink, sw: 1 }) + P('M100 88 Q118 88 120 72', 'none', B.ink, 2) + R(114, 58, 12, 14, { r: 2, f: B.greyInk, sw: 1.4 }) + T(120, 52, 'USB', { size: 10, w: 900, c: B.soft });
  return svgWrap(150, 100, 'A USB microphone on a desk stand, with a cable that plugs into a computer.', b);
}
export function micLav() {
  const b = P('M20 98 L40 20 L75 44 L110 20 L130 98 Z', B.blueMid, B.ink, 2) + P('M40 20 L75 60 L110 20', 'none', B.ink, 2) + R(58, 46, 12, 18, { r: 6, f: B.ink, sw: 1 }) + R(56, 62, 16, 6, { r: 1, f: B.greyInk, sw: 1 }) + P('M64 68 Q60 84 66 98', 'none', B.ink, 1.6);
  return svgWrap(150, 100, 'A lavalier microphone: a tiny mic clipped to a shirt collar.', b);
}
export function micHeadset() {
  const b = P('M40 60 Q40 12 75 12 Q110 12 110 60', 'none', B.ink, 4) + R(28, 52, 22, 32, { r: 8, f: B.ink }) + R(100, 52, 22, 32, { r: 8, f: B.ink }) + P('M40 80 Q48 98 76 94', 'none', B.ink, 3) + C(80, 93, 6, IN, B.ink, 1.6);
  return svgWrap(150, 100, 'A headset: headphones with a small microphone on an arm close to the mouth.', b);
}
export function micBuiltin() {
  const b = R(20, 12, 110, 72, { r: 5, f: B.ink }) + R(26, 22, 98, 56, { r: 2, f: B.blueWash, s: 'none', sw: 0 }) + C(75, 17, 2.2, B.greyInk, 'none', 0)
    + C(56, 17, 1.4, B.grey, 'none', 0) + C(94, 17, 1.4, B.grey, 'none', 0) + C(56, 17, 6, 'none', IN, 1.8) + C(94, 17, 6, 'none', IN, 1.8) + P('M12 84 H138 L132 94 H18 Z', B.grey, B.ink, 2);
  return svgWrap(150, 100, 'A laptop: tiny microphone holes beside the webcam at the top of the screen are circled.', b);
}
/** Speech recognition (what was said) vs. speaker recognition (who said it). */
export function speechSpeaker() {
  const side = (ox, said, title, ask, inner) => {
    let b = T(ox + 110, 22, title, { size: 15, w: 900 }) + R(ox + 52, 36, 126, 30, { r: 12, f: B.card, sw: 1.6 }) + P(`M${ox + 62} 66 L${ox + 50} 82 L${ox + 76} 66`, B.card, B.ink, 1.6) + R(ox + 63, 64, 12, 3, { r: 0, f: B.card, s: 'none', sw: 0 });
    b += T(ox + 115, 56, said, { size: 12, w: 800 }) + person(ox + 36, 88, B.orange) + ARROW(ox + 62, 132, ox + 112, 132, IN, 2.6);
    b += phone(ox + 122, 84, 66, 100, '#fff', inner) + T(ox + 110, 204, ask, { size: 13, w: 900, c: B.orangeInk });
    return b;
  };
  let b = side(0, '"Set an alarm"', 'Speech recognition', 'WHAT was said?', R(130, 104, 50, 34, { r: 6, f: B.orangeWash, s: 'none', sw: 0 }) + T(155, 118, 'Set an', { size: 11 }) + T(155, 132, 'alarm', { size: 11 }));
  b += side(220, '"This is Ana."', 'Speaker recognition', 'WHO is speaking?', person(375, 100, B.orangeWash) + T(375, 152, 'Ana', { size: 13 }) + check(375, 168));
  return svgWrap(440, 212, 'Speech recognition works out what was said and types it: Set an alarm. Speaker recognition works out who is speaking: Ana.', b);
}
