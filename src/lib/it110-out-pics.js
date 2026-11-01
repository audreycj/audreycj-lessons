// IT 110 Output devices pictures (chat 45). Same style as it110-io-pics.js: clean SVG strings;
// the page wraps real-world scenes in roughen() if wanted; mechanism pictures stay clean.
// No logos or brand artwork: generic devices only. Blue = output, orange = input (matches the page legend).
import { B, T, R, ARROW, svgWrap } from './it110-illus.js';
import { L, C, P, laptop3, printer3 } from './it110-os-pics.js';

const OUT = B.blue, PALE = '#eef1f5';
const tag = (x, y, n, c = OUT) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="#fff" stroke-width="1.6"/>` + T(x, y + 4, String(n), { size: 11, c: '#fff', w: 900 });
const lab = (x, y, s, o = {}) => T(x, y, s, { size: o.size ?? 12, w: o.w ?? 700, a: o.a ?? 'middle', c: o.c ?? B.soft });
/** A plain screen: dark frame with a white inside. */
const screen = (x, y, w, h, fill = '#fff') => R(x, y, w, h, { r: 6, f: B.ink, sw: 2 }) + R(x + 5, y + 5, w - 10, h - 10, { r: 2, f: fill, s: 'none', sw: 0 });
/** Sine wave path from x0, width w, middle y, amplitude a, wavelength wl; flip = opposite wave. */
const wave = (x0, w, y, a, wl, c, sw = 2.6, flip = false) => {
  let d = '';
  for (let x = 0; x <= w; x += 2) d += (x ? ' L' : 'M') + (x0 + x) + ' ' + (y - (flip ? -1 : 1) * a * Math.sin((2 * Math.PI * x) / wl)).toFixed(1);
  return P(d, 'none', c, sw);
};

/* ---------- Part 1: display specs ---------- */
/** Screen size: measured diagonally, corner to corner. */
export function screenSize() {
  let b = laptop3(70, 16, 220, '', B.blueWash);
  b += ARROW(180, 84, 84, 138, OUT, 2.6) + ARROW(180, 84, 276, 30, OUT, 2.6);
  b += R(146, 71, 68, 26, { r: 13, f: '#fff', s: OUT, sw: 2 }) + T(180, 89, '13.6 in', { size: 14, c: B.blueInk });
  b += lab(180, 226, 'Measured corner to corner, across the screen.');
  return svgWrap(360, 236, 'A laptop screen with an arrow from the bottom-left corner to the top-right corner, labeled 13.6 inches.', b);
}

/** Choosing a "resolution" on a Mac: same pixels, different size of things. */
export function resChoice() {
  const x1 = 14, x2 = 226, y = 34, w = 190, h = 124;
  let b = T(x1 + w / 2, 22, 'Larger text', { size: 14 }) + T(x2 + w / 2, 22, 'More space', { size: 14 });
  b += screen(x1, y, w, h) + screen(x2, y, w, h);
  // larger text: one big window, big lines
  b += R(x1 + 14, y + 14, 162, 96, { r: 4, f: B.card, s: OUT, sw: 1.6 }) + R(x1 + 15, y + 15, 160, 14, { r: 3, f: B.blueWash, s: 'none', sw: 0 });
  for (let i = 0; i < 4; i++) b += R(x1 + 24, y + 38 + i * 17, 120 - i * 18, 8, { r: 2, f: B.grey, s: 'none', sw: 0 });
  b += T(x1 + 156, y + 100, 'Aa', { size: 20, c: OUT });
  // more space: two smaller windows, thin lines
  for (const wx of [x2 + 12, x2 + 96]) {
    b += R(wx, y + 14, 80, 96, { r: 3, f: B.card, s: OUT, sw: 1.2 }) + R(wx + 1, y + 15, 78, 8, { r: 2, f: B.blueWash, s: 'none', sw: 0 });
    for (let i = 0; i < 8; i++) b += R(wx + 7, y + 29 + i * 9, 60 - (i % 3) * 12, 3.5, { r: 1, f: B.grey, s: 'none', sw: 0 });
    b += T(wx + 66, y + 104, 'Aa', { size: 10, c: OUT });
  }
  b += lab(215, 182, 'The same screen with the same pixels: only the size of things changes.');
  return svgWrap(430, 192, 'Two copies of the same laptop screen. Larger text: one big window with big letters. More space: two small windows with small letters.', b);
}

/** Refresh rate: a ball crossing the screen in 1/15 of a second, at 60 Hz and 120 Hz. */
export function refreshPic() {
  const x0 = 84, span = 336;
  const row = (y, n, name, sub) => {
    let s = T(40, y + 26, name, { size: 15, c: B.blueInk }) + lab(40, y + 42, sub, { size: 10 });
    const bw = span / n;
    for (let k = 0; k < n; k++) {
      const x = x0 + k * bw;
      s += R(x + 2, y, bw - 4, 52, { r: 4, f: PALE, s: B.line, sw: 1.2 });
      s += C(x + bw / 2, y + 26, 8, OUT, B.blueInk, 1.5);
    }
    return s;
  };
  let b = row(14, 4, '60 Hz', '4 updates') + row(80, 8, '120 Hz', '8 updates');
  b += ARROW(x0, 150, x0 + span, 150, B.soft, 2) + L(x0, 144, x0, 156, B.soft, 2) + lab(x0 + span / 2, 170, 'The ball crosses the screen in 1/15 of a second.');
  b += lab(215, 186, 'Each box is one screen update. More updates: smoother motion.', { size: 11 });
  return svgWrap(430, 194, 'A ball crossing the screen. At 60 Hz the screen updates 4 times in 1/15 of a second; at 120 Hz it updates 8 times, so the ball moves in smaller jumps.', b);
}

/** Hz and fps: a 30 fps video on a 60 Hz screen shows each frame twice. */
export function hzFps() {
  const x0 = 100;
  let b = T(46, 50, 'Video', { size: 14 }) + lab(46, 66, '30 fps', { size: 11 }) + T(46, 140, 'Screen', { size: 14 }) + lab(46, 156, '60 Hz', { size: 11 });
  const pos = [0.25, 0.5, 0.75];
  ['A', 'B', 'C'].forEach((ch, i) => {
    const fx = x0 + i * 108;
    b += R(fx, 28, 100, 46, { r: 4, f: B.card, s: B.ink, sw: 1.8 }) + T(fx + 16, 46, ch, { size: 14 }) + C(fx + 100 * pos[i], 56, 7, OUT, B.blueInk, 1.2);
    for (let j = 0; j < 2; j++) {
      const bx = x0 + (2 * i + j) * 54;
      b += L(fx + 50, 74, bx + 24, 116, B.greyInk, 1.4);
      b += R(bx, 118, 48, 40, { r: 4, f: B.blueWash, s: OUT, sw: 1.4 }) + T(bx + 24, 144, ch, { size: 15, c: B.blueInk });
    }
  });
  b += lab(215, 184, 'Each frame is shown twice: still only 3 different pictures.');
  return svgWrap(430, 194, 'Video frames A, B, C at 30 fps. The 60 Hz screen shows A, A, B, B, C, C: each frame twice.', b);
}

/** Brightness: lower in a dark room, higher outdoors. */
export function brightPic() {
  let b = R(6, 8, 204, 150, { r: 10, f: '#26314a', s: B.ink, sw: 2 }) + R(220, 8, 204, 150, { r: 10, f: '#fff4d3', s: B.ink, sw: 2 });
  b += P('M40 30 A14 14 0 1 0 56 50 A11 11 0 1 1 40 30 Z', '#f3e3a6', '#f3e3a6', 1);
  b += laptop3(54, 50, 110, '', '#7f93b5');
  b += C(394, 36, 13, B.amber, B.amber, 1);
  for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; b += L(394 + 18 * Math.cos(a), 36 + 18 * Math.sin(a), 394 + 25 * Math.cos(a), 36 + 25 * Math.sin(a), B.amber, 2.4); }
  b += laptop3(266, 50, 110, '', '#ffffff');
  b += T(108, 180, 'Dark room: lower brightness', { size: 12 }) + lab(108, 195, 'easier on the eyes', { size: 11 });
  b += T(322, 180, 'Outdoors: higher brightness', { size: 12 }) + lab(322, 195, 'so you can still see the screen', { size: 11 });
  return svgWrap(430, 202, 'Left: a dim screen in a dark room. Right: a bright screen outdoors in the sun.', b);
}

/* ---------- Part 2: how screens make pictures ---------- */
/** LCD (backlight + liquid crystals + color filters) vs OLED (each pixel makes its own light). */
export function lcdOled() {
  const cell = 40, cols = [B.red, B.green, B.blue];
  const col = (x0, title, sub, isLcd) => {
    let s = T(x0 + 104, 18, title, { size: 16 }) + lab(x0 + 104, 34, sub, { size: 11 });
    const seen = isLcd ? [B.red, '#3a3f4a', B.blue] : [B.red, '#000000', B.blue];
    for (let i = 0; i < 3; i++) s += R(x0 + i * cell + 3, 46, cell - 6, 22, { r: 3, f: seen[i], s: B.ink, sw: 1.2 });
    s += lab(x0 + 126, 61, 'you see', { a: 'start', size: 11 });
    if (isLcd) {
      for (let i = 0; i < 3; i++) s += R(x0 + i * cell, 86, cell, 24, { r: 2, f: [B.redWash, B.greenWash, B.blueWash][i], s: B.ink, sw: 1.2 });
      for (let i = 0; i < 3; i++) {
        const open = i !== 1;
        s += R(x0 + i * cell, 128, cell, 24, { r: 2, f: open ? '#fff' : B.ink, s: B.ink, sw: 1.2 });
        if (open) for (let k = 1; k < 4; k++) s += L(x0 + i * cell + k * 10, 131, x0 + i * cell + k * 10, 149, B.line, 1.2);
      }
      s += R(x0, 170, 3 * cell, 24, { r: 3, f: B.butter, s: B.ink, sw: 1.2 });
      for (let k = 0; k < 6; k++) s += C(x0 + 10 + k * 20, 182, 3.5, B.amber, B.orangeInk, 1);
      for (let i = 0; i < 3; i++) {
        const cx = x0 + i * cell + cell / 2;
        s += ARROW(cx, 168, cx, 154, B.amber, 2);
        if (i !== 1) s += ARROW(cx, 126, cx, 112, B.amber, 2) + ARROW(cx, 84, cx, 70, cols[i], 2.4);
      }
      s += lab(x0 + 126, 102, 'color filters', { a: 'start', size: 11 }) + lab(x0 + 126, 144, 'liquid crystals', { a: 'start', size: 11 }) + lab(x0 + 126, 186, 'LED backlight', { a: 'start', size: 11 });
      s += lab(x0 + 104, 216, 'Crystals open or block the light.', { size: 11 }) + lab(x0 + 104, 231, 'Blocked: dark, but a little light leaks.', { size: 11 });
    } else {
      s += R(x0, 86, 3 * cell, 24, { r: 2, f: '#f4f8fd', s: B.ink, sw: 1.2 });
      const px = [B.red, '#000000', B.blue];
      for (let i = 0; i < 3; i++) s += R(x0 + i * cell, 128, cell, 24, { r: 2, f: px[i], s: B.ink, sw: 1.2 });
      s += T(x0 + 60, 145, 'off', { size: 11, c: '#fff' });
      for (const i of [0, 2]) { const cx = x0 + i * cell + cell / 2; s += ARROW(cx, 126, cx, 112, cols[i], 2.4) + ARROW(cx, 84, cx, 70, cols[i], 2.4); }
      s += R(x0, 170, 3 * cell, 24, { r: 3, f: 'none', s: B.greyInk, sw: 1.4, dash: '5 4' }) + lab(x0 + 60, 186, 'no backlight', { size: 11, c: B.greyInk });
      s += lab(x0 + 126, 102, 'glass', { a: 'start', size: 11 }) + lab(x0 + 126, 144, 'organic pixels', { a: 'start', size: 11 });
      s += lab(x0 + 104, 216, 'Each pixel glows by itself.', { size: 11 }) + lab(x0 + 104, 231, 'Off pixel: no light, true black.', { size: 11 });
    }
    return s;
  };
  let b = col(12, 'LCD', 'light comes from a backlight', true) + L(234, 14, 234, 232, B.line, 1.4) + col(252, 'OLED', 'each pixel makes its own light', false);
  return svgWrap(476, 240, 'LCD: an LED backlight shines through liquid crystals, which open or block the light, then through color filters. OLED: each pixel glows by itself and an off pixel is black. There is no backlight.', b);
}

/** How a 3LCD projector makes a color picture. */
export function proj3lcd() {
  let b = C(34, 100, 15, B.butter, B.amber, 2);
  for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; b += L(34 + 19 * Math.cos(a), 100 + 19 * Math.sin(a), 34 + 25 * Math.cos(a), 100 + 25 * Math.sin(a), B.amber, 2); }
  const cols = [B.red, B.green, B.blue], ys = [57, 105, 153];
  for (let i = 0; i < 3; i++) {
    b += ARROW(62, 100, 124, ys[i], cols[i], 2.4);
    b += R(128, ys[i] - 17, 16, 34, { r: 2, f: '#fff', s: cols[i], sw: 2.4 });
  }
  b += ARROW(148, 57, 204, 82, B.red, 2.4) + ARROW(148, 105, 192, 105, B.green, 2.4) + ARROW(148, 153, 204, 128, B.blue, 2.4);
  b += R(196, 80, 50, 50, { r: 3, f: PALE, s: B.ink, sw: 2 }) + L(196, 80, 246, 130, B.greyInk, 1.4) + L(246, 80, 196, 130, B.greyInk, 1.4);
  b += ARROW(250, 105, 276, 105, B.ink, 2.6);
  b += `<path d="M296 94 L428 26 L428 184 L296 116 Z" fill="${B.blueMid}" opacity="0.35"/>`;
  b += `<ellipse cx="288" cy="105" rx="7" ry="26" fill="#e8f0fb" stroke="${B.ink}" stroke-width="2"/>`;
  b += R(428, 22, 14, 166, { r: 2, f: '#fff', s: B.ink, sw: 2 });
  b += R(431, 60, 8, 26, { r: 1, f: B.red, s: 'none', sw: 0 }) + R(431, 92, 8, 26, { r: 1, f: B.green, s: 'none', sw: 0 }) + R(431, 124, 8, 26, { r: 1, f: B.blue, s: 'none', sw: 0 });
  b += lab(34, 200, 'lamp') + lab(136, 200, '3 small LCDs') + lab(221, 200, 'prism') + lab(288, 200, 'lens') + lab(448, 200, 'screen', { a: 'end' });
  return svgWrap(452, 210, 'The lamp light is split into red, green, and blue. Each color goes through its own small LCD panel. A prism combines them, and a lens projects the color picture onto a screen.', b);
}

/* ---------- Part 3: printers ---------- */
/** Printers: impact vs nonimpact, with examples. */
export function printerTree() {
  let b = R(160, 6, 120, 34, { r: 8, f: B.ink, s: B.ink, sw: 2 }) + T(220, 29, 'Printers', { size: 15, c: '#fff' });
  b += L(220, 40, 110, 70, B.ink, 2) + L(220, 40, 330, 70, B.ink, 2);
  b += R(32, 70, 156, 50, { r: 8, f: B.butter, sw: 2 }) + T(110, 92, 'Impact', { size: 15 }) + lab(110, 110, 'something strikes the page', { size: 11 });
  b += R(244, 70, 172, 50, { r: 8, f: B.blueWash, s: OUT, sw: 2 }) + T(330, 92, 'Nonimpact', { size: 15, c: B.blueInk }) + lab(330, 110, 'nothing strikes the page', { size: 11 });
  b += L(110, 120, 110, 150, B.ink, 2) + R(68, 150, 84, 30, { r: 15, f: '#fff', sw: 1.8 }) + T(110, 170, 'dot matrix', { size: 12 });
  [['inkjet', 258], ['laser', 330], ['thermal', 402]].forEach(([n, x]) => {
    b += L(330, 120, x, 150, OUT, 2) + R(x - 32, 150, 64, 30, { r: 15, f: '#fff', s: OUT, sw: 1.8 }) + T(x, 170, n, { size: 12, c: B.blueInk });
  });
  return svgWrap(440, 188, 'Printers are grouped into impact printers, where something strikes the page (dot matrix), and nonimpact printers, where nothing strikes the page (inkjet, laser, thermal).', b);
}

/** Dot matrix: pins hit the ribbon; dots form letters; multipart forms. */
export function dotMatrix() {
  let b = R(14, 40, 54, 56, { r: 4, f: B.grey, sw: 2 }) + T(41, 116, 'print head', { size: 11, w: 700, c: B.soft });
  [50, 58, 66, 74, 82].forEach((y, i) => { b += L(68, y, i === 2 ? 104 : 96, y, B.ink, 2.2); });
  b += R(100, 24, 8, 88, { r: 2, f: '#3b4659', s: 'none', sw: 0 }) + R(110, 18, 10, 100, { r: 1, f: '#fff', sw: 1.4 });
  b += C(115, 66, 2.6, B.ink, B.ink, 1) + C(115, 50, 2.6, B.ink, B.ink, 1) + C(115, 82, 2.6, B.ink, B.ink, 1);
  b += T(104, 12, 'ink ribbon', { size: 11, w: 700, c: B.soft }) + T(126, 132, 'paper', { size: 11, w: 700, c: B.soft });
  const A = ['01110', '10001', '10001', '11111', '10001', '10001', '10001'];
  A.forEach((row, r) => [...row].forEach((v, c) => { b += `<circle cx="${174 + c * 10}" cy="${34 + r * 10}" r="3.3" fill="${v === '1' ? B.ink : '#dde3ea'}"/>`; }));
  b += T(194, 116, 'dots form letters', { size: 11, w: 700, c: B.soft });
  const tints = ['#fff', '#fde3e3', '#fff3c4', '#dfe9f6'];
  for (let i = 3; i >= 0; i--) b += R(262 + i * 10, 20 + i * 9, 110, 84, { r: 2, f: tints[i], sw: 1.4 });
  for (let k = 0; k < 5; k++) b += L(274, 38 + k * 12, 274 + 80 - (k % 2) * 24, 38 + k * 12, B.blue, 1.4);
  b += T(332, 150, '1 original + 3 copies', { size: 12 }) + lab(332, 166, 'in one go (multipart form)', { size: 11 });
  b += T(80, 150, 'Pins hit the ribbon.', { size: 12 }) + lab(80, 166, 'Each hit leaves an ink dot.', { size: 11 });
  return svgWrap(420, 176, 'A dot matrix print head pushes a pin against an ink ribbon, leaving a dot on the paper. Dots form the letter A. Because it presses hard, it prints an original and 3 copies at once.', b);
}

/** Inkjet (tiny drops of liquid ink) vs laser (toner on a drum, melted on by heat). */
export function inkjetLaser() {
  let b = T(105, 18, 'Inkjet', { size: 15 }) + T(332, 18, 'Laser', { size: 15 }) + L(218, 8, 218, 200, B.line, 1.4);
  // inkjet
  b += ARROW(100, 34, 50, 34, B.greyInk, 1.8) + ARROW(110, 34, 160, 34, B.greyInk, 1.8);
  b += R(70, 42, 70, 34, { r: 4, f: B.grey, sw: 2 }) + T(105, 64, 'print head', { size: 10, w: 700, c: B.soft });
  for (let k = 0; k < 5; k++) b += R(78 + k * 12, 76, 6, 5, { r: 1, f: B.ink, s: 'none', sw: 0 });
  const drop = (x, y, c) => P(`M${x} ${y - 5} Q${x + 4} ${y + 1} ${x} ${y + 4} Q${x - 4} ${y + 1} ${x} ${y - 5} Z`, c, c, 1);
  [[81, 96, '#2aa7c9'], [93, 110, '#d23f8a'], [105, 92, '#e8c21c'], [117, 118, '#2aa7c9'], [129, 102, B.ink]].forEach(([x, y, c]) => { b += drop(x, y, c); });
  b += R(30, 136, 150, 12, { r: 1, f: '#fff', sw: 1.4 });
  [['#2aa7c9', 50], ['#d23f8a', 64], ['#e8c21c', 78], [B.ink, 92]].forEach(([c, x]) => { b += C(x, 142, 3.5, c, c, 1); });
  b += T(105, 176, 'Sprays tiny drops of', { size: 12 }) + T(105, 192, 'liquid ink', { size: 12 });
  // laser
  b += R(236, 34, 50, 22, { r: 3, f: B.ink, sw: 1.6 }) + T(261, 49, 'laser', { size: 11, c: '#fff' });
  b += L(286, 50, 306, 70, B.red, 2.4) + C(330, 92, 32, '#e3e7ee', B.ink, 2) + T(330, 96, 'drum', { size: 11, w: 700, c: B.soft });
  b += R(370, 40, 50, 28, { r: 3, f: '#3b4659', s: B.ink, sw: 1.6 }) + T(395, 58, 'toner', { size: 11, c: '#fff' }) + ARROW(380, 70, 362, 86, '#3b4659', 1.8);
  for (let k = 0; k < 7; k++) { const a = 0.15 + k * 0.28; b += `<circle cx="${(330 + 34 * Math.cos(a)).toFixed(1)}" cy="${(92 + 34 * Math.sin(a)).toFixed(1)}" r="2" fill="${B.ink}"/>`; }
  b += R(240, 128, 190, 10, { r: 1, f: '#fff', sw: 1.4 }) + L(250, 133, 300, 133, B.ink, 2.4);
  b += C(408, 121, 8, B.redWash, B.red, 2) + C(408, 145, 8, B.redWash, B.red, 2) + T(408, 168, 'heat', { size: 11, w: 700, c: B.red });
  b += ARROW(280, 152, 340, 152, B.greyInk, 1.8) + lab(310, 166, 'paper moves', { size: 10 });
  b += T(332, 184, 'Toner powder sticks to the drum,', { size: 12 }) + T(332, 200, 'then heat melts it onto the paper', { size: 12 });
  return svgWrap(440, 208, 'Inkjet: a print head moves across the page and sprays tiny drops of liquid ink. Laser: a laser marks a drum, toner powder sticks to the marks, moves to the paper, and heated rollers melt it on.', b);
}

/** Thermal: direct thermal (special paper darkens) vs thermal transfer (ribbon ink melts onto a label). */
export function thermalTwo() {
  const heaters = (x) => { let s = ''; for (let k = 0; k < 6; k++) s += R(x + 12 + k * 17, 60, 8, 4, { r: 1, f: B.red, s: 'none', sw: 0 }); return s; };
  let b = T(110, 18, 'Direct thermal', { size: 14 }) + T(330, 18, 'Thermal transfer', { size: 14 }) + L(220, 8, 220, 200, B.line, 1.4);
  b += R(50, 32, 120, 28, { r: 4, f: B.grey, sw: 2 }) + T(110, 51, 'hot printhead', { size: 11, w: 700, c: B.soft }) + heaters(50);
  b += R(30, 70, 160, 18, { r: 1, f: '#fff', sw: 1.4 });
  for (let k = 0; k < 3; k++) b += R(38 + k * 16, 76, 11, 6, { r: 1, f: '#3b4659', s: 'none', sw: 0 });
  b += P('M84 102 H136 V158 L131 163 L126 158 L121 163 L116 158 L111 163 L106 158 L101 163 L96 158 L91 163 L84 158 Z', '#fff', B.ink, 1.4);
  for (let k = 0; k < 4; k++) b += L(91, 114 + k * 10, 128 - (k % 2) * 12, 114 + k * 10, '#3b4659', 1.6);
  b += T(110, 184, 'Heat darkens special paper.', { size: 12 }) + lab(110, 199, 'No ink. Receipts can fade.', { size: 11 });
  b += R(270, 32, 120, 28, { r: 4, f: B.grey, sw: 2 }) + T(330, 51, 'hot printhead', { size: 11, w: 700, c: B.soft }) + heaters(270);
  b += R(254, 66, 152, 8, { r: 1, f: '#3b4659', s: 'none', sw: 0 }) + lab(410, 73, 'ribbon', { a: 'start', size: 10 });
  b += R(258, 80, 144, 18, { r: 3, f: '#fff', sw: 1.4 });
  [264, 268, 274, 277, 283, 289, 292, 298].forEach((x, i) => { b += R(x, 83, i % 3 === 0 ? 3 : 1.6, 12, { r: 0, f: B.ink, s: 'none', sw: 0 }); });
  b += R(304, 106, 52, 58, { r: 4, f: '#fff', sw: 1.4 }) + C(330, 114, 3, '#fff', B.ink, 1.2);
  [312, 315, 320, 323, 328, 333, 336, 341, 344].forEach((x, i) => { b += R(x, 124, i % 3 === 0 ? 3 : 1.6, 24, { r: 0, f: B.ink, s: 'none', sw: 0 }); });
  b += T(330, 184, 'Heat melts ink from a ribbon', { size: 12 }) + lab(330, 199, 'onto a label. It lasts long.', { size: 11 });
  return svgWrap(452, 206, 'Direct thermal: a hot printhead darkens special paper, making receipts with no ink. Thermal transfer: the hot printhead melts ink from a ribbon onto a label, such as a long-lasting barcode label.', b);
}

/** 3D printing: one thin layer at a time. */
export function print3d() {
  let b = '';
  for (let i = 0; i < 5; i++) {
    const x = 4 + i * 87, n = i + 1, top = 130 - 10 * n;
    b += L(x + 8, 130, x + 76, 130, B.ink, 3);
    for (let k = 0; k < n; k++) b += R(x + 17, 130 - 10 * (k + 1), 50, 10, { r: 2, f: k === n - 1 && i < 4 ? B.amber : B.blueMid, s: B.ink, sw: 1.2 });
    if (i < 4) {
      b += L(x + 42, top - 34, x + 42, top - 52, B.orange, 2.4) + R(x + 30, top - 34, 24, 22, { r: 3, f: '#3b4659', s: B.ink, sw: 1.4 });
      b += P(`M${x + 36} ${top - 12} L${x + 48} ${top - 12} L${x + 42} ${top - 3} Z`, B.grey, B.ink, 1.4);
    }
    b += lab(x + 42, 150, i < 4 ? 'step ' + n : 'done!', { size: 12, c: i < 4 ? B.soft : B.green, w: 800 });
  }
  b += lab(220, 172, 'The nozzle adds one thin layer at a time (newest layer in yellow).');
  return svgWrap(440, 180, 'Five steps of 3D printing: the nozzle adds one thin layer of plastic at a time until the object is done.', b);
}

/** Printer specs: ppm (how fast) and dpi (how sharp). */
export function ppmDpi() {
  let b = T(105, 18, 'ppm: how fast?', { size: 14 }) + T(332, 18, 'dpi: how sharp?', { size: 14 }) + L(220, 8, 220, 196, B.line, 1.4);
  b += printer3(16, 60, 1);
  b += R(170, 48, 12, 6, { r: 2, f: B.grey, sw: 1.4 }) + C(176, 80, 24, '#fff', B.ink, 2) + L(176, 80, 176, 63, B.ink, 2) + L(176, 80, 189, 87, OUT, 2);
  b += lab(176, 122, '1 minute', { size: 11 });
  b += T(105, 166, 'Pages printed in one minute', { size: 12 }) + lab(105, 182, 'example: "up to 30 ppm"', { size: 11 });
  b += C(282, 84, 40, '#fff', B.ink, 2) + C(386, 84, 40, '#fff', B.ink, 2);
  for (let k = 0; k < 10; k++) { const a = (k / 10) * 2 * Math.PI; b += `<circle cx="${(282 + 22 * Math.cos(a)).toFixed(1)}" cy="${(84 + 22 * Math.sin(a)).toFixed(1)}" r="4.6" fill="${B.ink}"/>`; }
  for (let k = 0; k < 40; k++) { const a = (k / 40) * 2 * Math.PI; b += `<circle cx="${(386 + 22 * Math.cos(a)).toFixed(1)}" cy="${(84 + 22 * Math.sin(a)).toFixed(1)}" r="1.9" fill="${B.ink}"/>`; }
  b += lab(282, 142, 'fewer dots', { size: 11 }) + lab(386, 142, 'more dots', { size: 11 });
  b += T(334, 166, 'Dots that fit in one inch', { size: 12 }) + lab(334, 182, 'more dots: finer detail, smoother edges', { size: 11 });
  return svgWrap(440, 192, 'Left: a printer and a stopwatch: ppm is pages printed in one minute. Right: a letter O printed with few big dots looks rough; with many small dots it looks smooth: that is dpi.', b);
}

/* ---------- Part 4: audio output ---------- */
/** Inside a speaker: signal -> voice coil -> cone -> sound waves. */
export function speakerSteps() {
  let b = P('M8 115 Q16 103 24 115 T40 115 T56 115', 'none', OUT, 2.4) + L(56, 115, 100, 115, B.ink, 2) + lab(32, 140, 'signal', { size: 11 });
  b += R(58, 84, 42, 62, { r: 4, f: '#5b6577', sw: 2 }) + T(79, 120, 'magnet', { size: 10, c: '#fff' });
  b += R(100, 98, 30, 34, { r: 3, f: B.amber, sw: 2 });
  for (let k = 0; k < 4; k++) b += L(106 + k * 6, 99, 106 + k * 6, 131, B.orangeInk, 1.4);
  b += lab(118, 76, 'voice coil', { size: 11 });
  b += P('M130 100 L208 40 L208 190 L130 130 Z', B.blueWash, B.ink, 2) + R(204, 36, 8, 158, { r: 3, f: B.grey, sw: 1.6 });
  b += lab(150, 210, 'cone (diaphragm)', { size: 11 });
  [[234, 22], [258, 36], [282, 50]].forEach(([x, a]) => { b += P(`M${x} ${115 - a} Q${x + a * 0.55} 115 ${x} ${115 + a}`, 'none', OUT, 2.6); });
  b += lab(270, 210, 'sound waves', { size: 11 });
  b += tag(32, 96, 1) + tag(115, 148, 2) + tag(166, 115, 3) + tag(318, 115, 4);
  return svgWrap(340, 218, 'Inside a speaker: (1) the electrical signal goes to the voice coil, (2) the coil pushes and pulls against the magnet, (3) the attached cone vibrates, (4) the cone pushes the air into sound waves.', b);
}

/** Noise cancelling: noise + anti-noise = much less noise. */
export function ancWaves() {
  let b = R(4, 18, 128, 92, { r: 8, f: PALE, s: B.line, sw: 1.4 }) + R(156, 18, 128, 92, { r: 8, f: B.blueWash, s: OUT, sw: 1.4 }) + R(308, 18, 128, 92, { r: 8, f: '#fff', s: B.line, sw: 1.4 });
  b += wave(12, 112, 64, 26, 56, B.greyInk) + wave(164, 112, 64, 26, 56, OUT, 2.6, true) + wave(316, 112, 64, 4, 56, B.greyInk, 2.2);
  b += T(144, 72, '+', { size: 26, c: B.soft }) + T(296, 72, '=', { size: 26, c: B.soft });
  b += T(68, 132, 'outside noise', { size: 12 }) + T(220, 132, 'anti-noise', { size: 12, c: B.blueInk }) + lab(220, 147, '(made by the headphones)', { size: 10 });
  b += T(372, 132, 'what you hear', { size: 12 }) + lab(372, 147, 'much less noise', { size: 10 });
  b += lab(220, 172, 'Where the noise goes up, the anti-noise goes down. Some noise remains.', { size: 11 });
  return svgWrap(440, 180, 'Outside noise plus an opposite wave called anti-noise gives a much smaller wave: you hear much less noise, but some remains.', b);
}

/** Two people pushing a swing from opposite sides at the same time (roughen on the page). */
export function swingSketch() {
  let b = L(40, 176, 150, 20, B.soft, 3) + L(260, 176, 150, 20, B.soft, 3) + L(150, 22, 140, 134, B.greyInk, 1.6) + L(150, 22, 160, 134, B.greyInk, 1.6);
  b += R(130, 134, 40, 8, { r: 2, f: B.amber, s: B.ink, sw: 1.6 });
  const kid = (x, shirt) => P(`M${x - 19} 172 Q${x - 19} 140 ${x} 140 Q${x + 19} 140 ${x + 19} 172 Z`, shirt, B.ink, 1.8) + C(x, 124, 13, B.skin, B.ink, 1.8) + P(`M${x - 13} 122 Q${x - 12} 108 ${x} 108 Q${x + 12} 108 ${x + 13} 122 Q${x} 115 ${x - 13} 122 Z`, B.hair, B.hair, 1.4);
  b += kid(92, B.blue) + kid(208, B.orange);
  b += ARROW(110, 150, 128, 140, B.blue, 2.6) + ARROW(190, 150, 172, 140, B.orange, 2.6);
  b += lab(150, 198, 'The pushes cancel: the swing barely moves.', { size: 12 });
  return svgWrap(300, 206, 'Two people push a swing from opposite sides at the same time. The pushes cancel, so the swing barely moves.', b);
}
