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
