// IT 110 Network and Internet security, Lesson 2 pictures (chat 55): malware, scams, personal safety, reporting.
// Same detailed doodle kit as Lesson 1 (it110-sec-pics.js). Made-up names only: PeraBank, PeraPay, KapeMati, ShopMati.
import { B, T, R, ARROW, svgWrap } from './it110-illus.js';
import { L, C, P, HOT, AIR, wifi2, check, cross, bubble, bubbleUp, GLOSS, blob, ground, spark, dot, person2, hacker2, laptop2, phone2, padlock2, shield2, envelope2, server2, coin, screenLines, globe, router2, label } from './it110-sec-pics.js';

/* ---------- small pieces ---------- */
// a malware "bug": red beetle with legs and feelers (center x, y)
const bug = (x, y, s = 1, c = B.red) => {
  const S = (v) => v * s;
  let g = [-1, 1].map((d) => [-6, 0, 6].map((dy) => P(`M${x + d * S(7)} ${y + S(dy)} L${x + d * S(14)} ${y + S(dy - 3)}`, 'none', B.ink, 1.8)).join('')).join('');
  g += P(`M${x - S(3)} ${y - S(9)} Q${x - S(6)} ${y - S(16)} ${x - S(10)} ${y - S(16)} M${x + S(3)} ${y - S(9)} Q${x + S(6)} ${y - S(16)} ${x + S(10)} ${y - S(16)}`, 'none', B.ink, 1.6);
  g += `<ellipse cx="${x}" cy="${y + S(2)}" rx="${S(8)}" ry="${S(10)}" fill="${c}" stroke="${B.ink}" stroke-width="1.8"/>`;
  g += C(x, y - S(8), S(4.6), '#2b3446', B.ink, 1.6) + L(x, y - S(4), x, y + S(11), B.ink, 1.4);
  g += C(x - S(3.6), y, S(1.6), B.ink, 'none', 0) + C(x + S(3.6), y + S(5), S(1.6), B.ink, 'none', 0) + P(`M${x - S(5)} ${y - S(4)} Q${x - S(3)} ${y - S(6)} ${x - S(1)} ${y - S(5)}`, 'none', GLOSS, 1.4);
  return g;
};
// a document with folded corner and text lines
const doc = (x, y, w = 40, h = 52, f = '#fff', lines = '#c9d2df') => {
  let g = P(`M${x} ${y} L${x + w - 12} ${y} L${x + w} ${y + 12} L${x + w} ${y + h} L${x} ${y + h} Z`, f, B.ink, 2) + P(`M${x + w - 12} ${y} L${x + w - 12} ${y + 12} L${x + w} ${y + 12}`, '#e4e9f1', B.ink, 1.6);
  for (let k = 0; k < 4; k++) if (y + 20 + k * 8 < y + h - 4) g += L(x + 6, y + 20 + k * 8, x + w - 7 - (k % 2) * 8, y + 20 + k * 8, lines, 2.4);
  return g;
};
// a spiky virus particle
const virusDot = (x, y, r = 7, c = '#c2453b') => {
  let g = '';
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; g += L(x + Math.cos(a) * r, y + Math.sin(a) * r, x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4), B.ink, 1.6) + C(x + Math.cos(a) * (r + 5), y + Math.sin(a) * (r + 5), 1.6, c, B.ink, 1); }
  return g + C(x, y, r, c, B.ink, 1.8) + C(x - r * 0.3, y - r * 0.2, r * 0.22, 'rgba(255,255,255,0.5)', 'none', 0);
};
// a QR code (deterministic pattern), top-left (x, y), size w
const qr = (x, y, w = 40) => {
  const n = 9, c = w / n; let g = R(x - 3, y - 3, w + 6, w + 6, { r: 3, f: '#fff', sw: 1.6 });
  const corner = (cx, cy) => R(x + cx * c, y + cy * c, 3 * c, 3 * c, { r: 1, f: B.ink, s: 'none', sw: 0 }) + R(x + cx * c + c * 0.7, y + cy * c + c * 0.7, c * 1.6, c * 1.6, { r: 0.5, f: '#fff', s: 'none', sw: 0 }) + R(x + cx * c + c, y + cy * c + c, c, c, { r: 0, f: B.ink, s: 'none', sw: 0 });
  g += corner(0, 0) + corner(6, 0) + corner(0, 6);
  const on = [[4, 0], [4, 1], [3, 2], [5, 2], [4, 3], [0, 4], [2, 4], [3, 4], [6, 4], [8, 4], [1, 5], [4, 5], [7, 5], [3, 6], [5, 6], [8, 6], [4, 7], [6, 7], [3, 8], [5, 8], [7, 8], [8, 8]];
  return g + on.map(([i, j]) => R(x + i * c, y + j * c, c, c, { r: 0, f: B.ink, s: 'none', sw: 0 })).join('');
};
// a CCTV camera on a bracket (x, y = mount point on the wall)
const cctv = (x, y, s = 1) => {
  const S = (v) => v * s;
  return R(x - S(3), y - S(10), S(6), S(20), { r: 2, f: '#c8ced8', sw: 1.6 }) + L(x, y, x + S(10), y + S(4), B.ink, 3)
    + `<g transform="rotate(14 ${x + S(10)} ${y + S(4)})">` + R(x + S(6), y - S(4), S(34), S(16), { r: S(4), f: '#f4f6f9', sw: 2 }) + R(x + S(36), y - S(2), S(8), S(12), { r: 2, f: '#2b3446', sw: 1.6 }) + C(x + S(40), y + S(4), S(2.6), '#6aa0e0', 'none', 0) + C(x + S(12), y + S(1), S(1.6), B.red, 'none', 0) + '</g>';
};
// a flat TV on a stand
const tv = (x, y, w = 60) => {
  const h = w * 0.58;
  return R(x, y, w, h, { r: 4, f: '#2b3446', sw: 2 }) + R(x + 3, y + 3, w - 6, h - 6, { r: 2, f: '#3b5f93', s: 'none', sw: 0 }) + P(`M${x + w * 0.55} ${y + 3} L${x + w * 0.75} ${y + 3} L${x + w * 0.45} ${y + h - 3} L${x + w * 0.25} ${y + h - 3} Z`, 'rgba(255,255,255,0.14)', 'none', 0)
    + L(x + w / 2, y + h, x + w / 2, y + h + 7, B.ink, 3) + L(x + w / 2 - 12, y + h + 8, x + w / 2 + 12, y + h + 8, B.ink, 3);
};
// a desktop PC (monitor + tower)
const pc2 = (x, y, w = 56, content = null) => {
  const h = w * 0.62;
  let g = R(x, y, w, h, { r: 4, f: '#2b3446', sw: 2 }) + R(x + 4, y + 4, w - 8, h - 8, { r: 2, f: '#e8f0fb', s: 'none', sw: 0 });
  if (content) g += content(x + 4, y + 4, w - 8, h - 8);
  g += L(x + w / 2, y + h, x + w / 2, y + h + 7, B.ink, 3) + R(x + w / 2 - 14, y + h + 6, 28, 5, { r: 2, f: '#c8ced8', sw: 1.6 });
  return g;
};
// a red alert badge with "!" (center)
const alertBadge = (x, y, s = 1) => C(x, y, 9 * s, B.red, B.ink, 1.6) + T(x, y + 4.5 * s, '!', { size: 13 * s, c: '#fff' });
// a small speech bubble with text (tail down to tx, ty)
const say = (x, y, w, txt, tx, ty, f = '#fff', c = B.ink, size = 12) => bubble(x, y, w, size + 14, tx, ty, f) + T(x + w / 2, y + size + 4, txt, { size, w: 700, c });
// a gift box (x, y top-left)
const gift = (x, y, w = 56, h = 40, f = '#e86f5a') => R(x, y + 10, w, h, { r: 4, f, sw: 2 }) + R(x - 4, y, w + 8, 14, { r: 4, f, sw: 2 }) + R(x + w / 2 - 6, y, 12, h + 10, { r: 0, f: B.amber, sw: 1.8 })
  + P(`M${x + w / 2} ${y} Q${x + w / 2 - 18} ${y - 18} ${x + w / 2 - 6} ${y - 2} M${x + w / 2} ${y} Q${x + w / 2 + 18} ${y - 18} ${x + w / 2 + 6} ${y - 2}`, B.amber, B.ink, 1.8) + R(x + 3, y + 3, w * 0.3, 4, { r: 2, f: GLOSS, s: 'none', sw: 0 });
// a heart
const heart = (x, y, s = 1, f = '#e86f8a') => P(`M${x} ${y + 9 * s} C${x - 14 * s} ${y - 1 * s} ${x - 9 * s} ${y - 12 * s} ${x} ${y - 4 * s} C${x + 9 * s} ${y - 12 * s} ${x + 14 * s} ${y - 1 * s} ${x} ${y + 9 * s} Z`, f, B.ink, 1.6);
// an e-wallet card shown on a phone screen (content callback)
const walletScreen = (amt, c = B.blueInk) => (x, y, w, h) => R(x + 3, y + 3, w - 6, h * 0.34, { r: 4, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + h * 0.18 + 3, 'PeraPay', { size: Math.max(7, w * 0.16), c: '#fff' }) + T(x + w / 2, y + h * 0.62, amt, { size: Math.max(8, w * 0.2), c, mono: true });
// a chat line inside a screen
const chatLines = (cols) => (x, y, w, h) => cols.map((c, k) => R(x + (k % 2 ? w * 0.3 : 4), y + 5 + k * (h / cols.length), w * 0.62, h / cols.length - 5, { r: 4, f: c, s: 'none', sw: 0 })).join('');

/* ================= DOODLES FOR DEFINITION BOXES ================= */
/** A detailed doodle beside a definition. 160 x 120. Same size as Lesson 1's defPic. */
export function threatDef(kind) {
  let b = '', alt = '';
  switch (kind) {
    case 'sabotage':
      b = blob(84, 62, 68, 50, '#fbe7da') + ground(84, 112, 58) + laptop2(40, 34, 80, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#1f2a3d', s: 'none', sw: 0 }) + P(`M${x + w * 0.55} ${y} L${x + w * 0.45} ${y + h * 0.4} L${x + w * 0.62} ${y + h * 0.55} L${x + w * 0.5} ${y + h}`, 'none', '#e8f0fb', 1.6) + P(`M${x + w * 0.45} ${y + h * 0.4} L${x + w * 0.2} ${y + h * 0.3} M${x + w * 0.62} ${y + h * 0.55} L${x + w * 0.9} ${y + h * 0.7}`, 'none', '#e8f0fb', 1.4) + T(x + w * 0.24, y + h * 0.82, 'ERROR', { size: 7.5, c: '#ff8f80', mono: true }));
      b += bug(128, 30, 0.95) + bug(30, 92, 0.75) + spark(26, 26, 0.9, B.red) + dot(140, 94, 2.4, B.red);
      alt = 'A laptop with a cracked, broken screen showing ERROR, with malware bugs crawling around it.'; break;
    case 'bot':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 62) + laptop2(52, 64, 56, (x, y, w, h) => T(x + w / 2, y + h * 0.62, 'zzz', { size: 9, c: B.soft, mono: true }));
      b += bug(98, 70, 0.6) + hacker2(126, 18, 0.5) + P('M118 40 Q96 30 84 58', 'none', B.red, 2, ' stroke-dasharray="4 4"') + ARROW(88, 50, 84, 60, B.red, 2);
      b += say(10, 16, 70, 'obey!', 52, 50, '#fdeee9', B.red, 12);
      alt = 'A sleeping laptop secretly infected with a bug, taking orders from a hooded stranger: a bot.'; break;
    case 'malware':
      b = blob(80, 62, 66, 50, '#fbe7da') + ground(80, 112, 50) + doc(46, 22, 54, 74, '#fff') + bug(96, 70, 1.25) + spark(132, 28, 1, B.red) + dot(34, 30, 2.6, B.red) + dot(140, 98, 2.2, B.amber);
      alt = 'A big red bug sitting on a computer file: malicious software.'; break;
    case 'dos':
      b = blob(80, 62, 70, 50, '#fbe7da') + ground(98, 112, 40) + server2(80, 32, 38, 72);
      b += [[12, 22], [8, 50], [14, 78], [42, 14], [40, 92]].map(([x, y]) => envelope2(x, y, 26, 18) + ARROW(x + 28, y + 9, 76, 68, '#c2453b', 1.6)).join('');
      b += alertBadge(122, 30) + P('M124 52 q4 6 0 10', 'none', B.blueMid, 2) + T(98, 22, 'BUSY', { size: 11, c: B.red, mono: true });
      alt = 'A server flooded by many messages at once, with a red alert sign and the word BUSY.'; break;
    case 'deface':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 62) + R(24, 18, 112, 82, { r: 6, f: '#fff', sw: 2 }) + R(24, 18, 112, 14, { r: 6, f: '#dfe3ea', sw: 2 }) + [0, 1, 2].map((k) => C(32 + k * 7, 25, 2, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('');
      b += R(32, 40, 50, 8, { r: 2, f: B.blueWash, s: 'none', sw: 0 }) + R(32, 54, 96, 4, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 }) + R(32, 62, 80, 4, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 });
      b += P('M36 92 Q50 70 66 84 T100 74 T130 82', 'none', '#d4422f', 5) + T(82, 82, 'HACKED', { size: 15, c: '#b23a33' }) + spark(140, 20, 1, B.red);
      alt = 'A website with HACKED spray-painted across it in red: website defacement.'; break;
    case 'breach':
      b = blob(80, 62, 70, 50, '#fbe7da') + ground(64, 112, 44);
      b += `<ellipse cx="64" cy="30" rx="30" ry="9" fill="#dfe9f6" stroke="${B.ink}" stroke-width="2"/>` + P('M34 30 L34 90 Q64 104 94 90 L94 30', '#c9d8ee', B.ink, 2) + P('M34 50 Q64 62 94 50 M34 70 Q64 82 94 70', 'none', B.ink, 1.6) + `<ellipse cx="64" cy="30" rx="30" ry="9" fill="#dfe9f6" stroke="${B.ink}" stroke-width="2"/>`;
      b += P('M94 66 L104 60 L100 70 Z', B.red, B.ink, 1.4) + [[112, 46], [126, 62], [112, 80]].map(([x, y], k) => R(x, y, 26, 14, { r: 2, f: '#fff', sw: 1.4 }) + L(x + 4, y + 5, x + 20, y + 5, '#b7c7e0', 2) + L(x + 4, y + 9, x + 15, y + 9, '#b7c7e0', 2)).join('') + spark(140, 26, 0.9, B.red);
      alt = 'A database leaking records out through a crack in its side: a data breach.'; break;
    case 'idtheft':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 62) + R(22, 26, 96, 62, { r: 7, f: '#fff', sw: 2 }) + R(22, 26, 96, 15, { r: 7, f: B.blue, sw: 2 }) + T(70, 37.5, 'ID CARD', { size: 9, c: '#fff' });
      b += R(30, 48, 28, 32, { r: 3, f: B.blueWash, sw: 1.4 }) + L(64, 54, 108, 54, B.line, 3) + L(64, 64, 100, 64, B.line, 3) + T(86, 80, 'Mia Santos', { size: 9.5, w: 700, c: B.ink });
      b += hacker2(44, 44, 0.42) + R(30, 48, 28, 32, { r: 3, f: 'none', s: B.red, sw: 2 }) + person2(138, 40, 0.6, { shirt: B.green, sad: true }) + T(152, 30, '?', { size: 18, c: B.red });
      alt = 'Mia\'s ID card with a stranger\'s face on it, while the real Mia looks on, confused.'; break;
    case 'social':
      b = blob(80, 62, 70, 50, '#fbe7da') + ground(78, 112, 64) + hacker2(54, 26, 0.84);
      b += C(84, 50, 15, '#fff4c7', B.ink, 2) + C(79, 47, 1.8, B.ink, 'none', 0) + C(89, 47, 1.8, B.ink, 'none', 0) + P('M77 55 Q84 61 91 55', 'none', B.ink, 1.8) + L(84, 65, 84, 82, B.ink, 2.4);
      b += person2(132, 30, 0.72, { shirt: B.blue }) + say(98, 4, 58, 'Bank?', 130, 26, '#fff', B.blueInk, 12);
      alt = 'A stranger hides his face behind a friendly smiling mask to fool a person into trusting him.'; break;
    case 'phishing':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(84, 112, 50) + P('M34 6 L34 46', 'none', B.ink, 1.6) + P('M34 46 L34 58 Q34 70 46 70 Q56 70 56 60', 'none', '#8a94a6', 3) + P('M56 60 L52 62', 'none', '#8a94a6', 3);
      b += envelope2(60, 54, 70, 46) + R(84, 70, 34, 13, { r: 3, f: '#fff', s: B.red, sw: 1.6 }) + T(101, 80, '****', { size: 10, c: B.red, mono: true });
      b += P('M10 102 Q30 94 50 102 T90 102 T130 102 T160 102', 'none', '#8fb0dc', 2.4) + spark(140, 28, 1, B.blueMid) + T(130, 20, 'bait', { size: 11, c: B.soft });
      alt = 'A fishing hook with an email on it, holding a password as bait: phishing.'; break;
    case 'pharming':
      b = blob(80, 62, 72, 50, '#fbe7da') + ground(80, 112, 64) + R(10, 14, 140, 24, { r: 12, f: '#f1f3f6', s: '#b7bfcc', sw: 1.6 }) + T(80, 31, 'perabank.ph', { size: 11, c: B.ink, mono: true });
      b += ARROW(56, 40, 40, 66, B.green, 2) + R(14, 68, 34, 24, { r: 4, f: '#e3f3e9', s: B.green, sw: 1.6, dash: '4 3' }) + T(31, 84, 'real', { size: 10, c: B.green }) + cross(46, 66, 0.55);
      b += P('M104 40 Q120 52 116 66', 'none', B.red, 2.2) + ARROW(118, 58, 116, 68, B.red, 2.2) + R(86, 70, 60, 34, { r: 5, f: '#fff', s: B.red, sw: 2 }) + T(116, 84, 'FAKE', { size: 10, c: B.red }) + T(116, 98, 'look-alike', { size: 9, w: 700, c: B.soft });
      alt = 'The right web address is typed, but the trip is secretly sent to a fake look-alike site instead of the real one.'; break;
    case 'spoofing':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(64, 112, 34) + phone2(42, 14, 46, 90, (x, y, w, h) => R(x, y, w, h, { r: 6, f: '#2f3d55', s: 'none', sw: 0 }) + T(x + w / 2, y + 16, 'PeraBank', { size: 8.5, c: '#fff' }) + T(x + w / 2, y + 27, 'calling…', { size: 7, w: 600, c: '#c9d3e3' }) + C(x + 10, y + h - 12, 6, '#d4422f', 'none', 0) + C(x + w - 10, y + h - 12, 6, '#3f9a5f', 'none', 0));
      b += hacker2(124, 30, 0.62) + P('M106 70 Q96 64 92 60', 'none', '#4a5266', 3) + say(100, 4, 56, 'fake ID', 124, 28, '#fdeee9', B.red, 11);
      alt = 'A phone shows PeraBank calling, but the real caller is a hooded stranger: spoofing.'; break;
    case 'cert':
      b = blob(80, 62, 70, 50, '#dcefe2') + ground(80, 112, 58) + R(26, 18, 100, 76, { r: 4, f: '#fffdf4', sw: 2 }) + R(31, 23, 90, 66, { r: 2, f: 'none', s: '#d9ad35', sw: 1.4 });
      b += T(76, 38, 'CERTIFICATE', { size: 9.5, c: B.ink }) + T(76, 52, 'perabank.ph', { size: 9, w: 700, c: B.blueInk, mono: true }) + L(44, 64, 108, 64, B.line, 2) + L(44, 72, 96, 72, B.line, 2);
      b += C(116, 88, 13, B.amber, B.ink, 2) + C(116, 88, 8, 'none', '#c98a1c', 1.4) + P('M108 98 L104 112 L112 108 L116 114 L118 100 M122 98 L128 112 L120 108', B.red, B.ink, 1.4) + padlock2(132, 30, false, B.green, 0.55);
      alt = 'A certificate for perabank.ph with a gold seal and a green padlock: a digital certificate.'; break;
    case 'signature':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(76, 112, 54) + doc(40, 14, 72, 92, '#fff') + P('M50 84 Q58 70 64 82 T78 78 T92 80', 'none', B.blue, 2.2) + L(48, 90, 100, 90, B.ink, 1.2);
      b += C(112, 82, 15, '#c2453b', B.ink, 2) + C(112, 82, 9, 'none', '#8f2a24', 1.4) + T(112, 86.5, '✓', { size: 12, c: '#fff' }) + spark(130, 24, 0.9);
      alt = 'A document signed at the bottom, with a red seal that shows who signed it and that it was not changed: a digital signature.'; break;
    case 'bully':
      b = blob(80, 62, 70, 50, '#fbe7da') + ground(52, 112, 34) + phone2(28, 18, 48, 90, chatLines(['#f8c9c2', '#f8c9c2', '#f8c9c2', '#f8c9c2']));
      b += [[82, 8, 'loser'], [82, 42, 'lol'], [82, 76, 'ew']].map(([x, y, t]) => say(x, y, 46, t, x + 8, y + 30, '#fdeee9', B.red, 11)).join('') + person2(146, 52, 0.52, { shirt: B.blue, sad: true });
      alt = 'A phone filling with mean messages while a classmate looks sad: cyberbullying.'; break;
    case 'stalk':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 62) + R(18, 18, 92, 80, { r: 8, f: '#eaf1e4', sw: 2 }) + P('M18 50 L110 44 M50 18 L58 98 M18 80 L110 74', 'none', '#fff', 5) + P('M18 50 L110 44 M50 18 L58 98 M18 80 L110 74', 'none', '#cfd8c4', 1.2);
      b += [[32, 86], [44, 72], [60, 60], [76, 48]].map(([x, y]) => C(x, y, 3.2, B.red, 'none', 0)).join('') + P('M86 26 C86 16 100 16 100 26 C100 34 93 40 93 44 C93 40 86 34 86 26 Z', B.red, B.ink, 1.6) + C(93, 26, 3, '#fff', 'none', 0);
      b += hacker2(136, 28, 0.6);
      alt = 'A map with a trail of red dots ending at a location pin, watched by a hooded stranger: cyberstalking.'; break;
    case 'sextortion':
      b = blob(80, 62, 70, 50, '#fbe7da') + ground(52, 112, 34) + phone2(28, 20, 48, 88, (x, y, w, h) => R(x + 4, y + 6, w - 8, h * 0.5, { r: 4, f: '#c9d3e3', s: 'none', sw: 0 }) + T(x + w / 2, y + h * 0.36, 'private', { size: 7.5, w: 700, c: B.soft }));
      b += padlock2(40, 52, false, B.amber, 0.7) + say(84, 18, 70, 'Pay me or', 92, 50, '#fdeee9', B.red, 11) + say(84, 50, 70, 'I\'ll share', 92, 82, '#fdeee9', B.red, 11) + hacker2(134, 78, 0.4);
      alt = 'A locked private photo on a phone and threatening messages: pay me or I will share it.'; break;
    case 'doxx':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 62) + R(18, 14, 124, 88, { r: 6, f: '#d8b48a', sw: 2 }) + R(30, 24, 66, 62, { r: 3, f: '#fff', sw: 1.6 }) + C(63, 22, 3.4, B.red, B.ink, 1.2);
      b += C(46, 42, 8, B.skin, B.ink, 1.4) + T(78, 40, 'Bea', { size: 9, c: B.ink }) + T(36, 62, 'Home: Purok 3…', { size: 7.5, w: 700, a: 'start', c: B.red }) + T(36, 74, 'Cell: 09•••', { size: 7.5, w: 700, a: 'start', c: B.red });
      b += R(104, 30, 30, 22, { r: 2, f: '#fff4c7', sw: 1.4 }) + C(119, 28, 3, B.blue, B.ink, 1) + T(119, 46, 'LOOK', { size: 7.5, c: B.red }) + R(102, 62, 32, 26, { r: 2, f: '#fff', sw: 1.4 }) + C(118, 60, 3, B.amber, B.ink, 1) + P('M108 80 L114 72 L120 78 L126 70', 'none', B.blue, 1.6);
      alt = 'A public board with Bea\'s photo, home address, and phone number pinned for everyone to see: doxxing.'; break;
    case 'wifisec':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(56, 112, 44) + router2(22, 84, 70) + wifi2(57, 70, AIR, 1.1);
      b += padlock2(46, 34, false, B.green, 0.62) + R(100, 22, 52, 22, { r: 4, f: '#fff', s: B.line, sw: 1.4 }) + T(126, 37, 'hello', { size: 10.5, c: B.ink, mono: true }) + ARROW(126, 48, 126, 62, B.soft, 1.8);
      b += R(100, 66, 52, 22, { r: 4, f: '#fdeee9', s: B.red, sw: 1.4 }) + T(126, 81, 'x7#qZ', { size: 10.5, c: B.red, mono: true }) + T(126, 104, 'scrambled', { size: 10, w: 700, c: B.soft });
      alt = 'A router with Wi-Fi waves and a green padlock. The word hello is scrambled into x7#qZ before it travels through the air.'; break;
    default:
      b = blob(80, 60, 60, 44, '#e3ecf8');
  }
  return svgWrap(160, 120, alt, b).replace('class="clean"', 'class="clean def-pic"');
}

/* ================= KINDS OF MALWARE (fn-card pictures) ================= */
/** One card picture per kind of malware. 220 x 120. */
export function malwarePic(kind) {
  let b = '', alt = '';
  if (kind === 'virus') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 80) + doc(26, 26, 46, 62) + virusDot(64, 70, 8) + doc(150, 26, 46, 62, '#fff');
    b += P('M80 52 Q110 28 140 52', 'none', B.red, 2.2, ' stroke-dasharray="5 4"') + ARROW(132, 46, 142, 54, B.red, 2.2) + virusDot(186, 72, 6) + person2(108, 54, 0.5, { shirt: B.green }) + say(84, 6, 54, 'open', 104, 52, '#fff', B.soft, 11);
    alt = 'A virus rides inside a file. When a person opens the file, the virus copies itself into another file.';
  } else if (kind === 'worm') {
    b = blob(110, 62, 88, 48, '#e3ecf8') + ground(110, 110, 84) + pc2(14, 30, 56, screenLines()) + pc2(150, 30, 56, screenLines());
    b += P('M70 78 Q110 98 150 78', 'none', '#6b7a94', 3);
    const wx = 96, wy = 86; b += P(`M${wx - 24} ${wy} q8 -13 16 0 t16 0 t16 0`, 'none', '#e8a0a8', 9) + C(wx + 27, wy - 1, 6.5, '#e8a0a8', B.ink, 1.4) + C(wx + 29, wy - 3, 1.5, B.ink, 'none', 0);
    b += bug(42, 34, 0.55) + bug(178, 34, 0.55) + T(110, 20, 'no help needed', { size: 11.5, c: B.soft });
    alt = 'A worm crawls along the network cable from one computer to the next by itself, infecting both.';
  } else if (kind === 'trojan') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(100, 110, 60) + gift(62, 46, 74, 52, '#5f8fd0') + T(99, 84, 'FREE', { size: 13, c: '#fff' }) + T(99, 97, 'GAME', { size: 11, c: '#fff' });
    b += bug(150, 48, 0.85) + P('M136 60 Q140 56 142 54', 'none', B.ink, 1.4) + T(176, 96, 'hiding', { size: 11, c: B.red }) + T(176, 110, 'inside', { size: 11, c: B.red }) + spark(40, 30, 1);
    alt = 'A gift box labeled FREE GAME with a malware bug sneaking out of it: a Trojan horse.';
  } else if (kind === 'ransom') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 76) + laptop2(52, 18, 116, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#7a1f1a', s: 'none', sw: 0 }) + T(x + w / 2, y + 11, 'FILES LOCKED', { size: 9.5, c: '#fff', mono: true }) + T(x + w / 2, y + h - 8, 'Pay ₱ to unlock', { size: 9.5, c: '#ffd2c7', mono: true }));
    b += padlock2(100, 47, false, B.amber, 0.6) + doc(16, 60, 26, 34, '#fff') + doc(178, 60, 26, 34, '#fff') + padlock2(20, 82, false, B.amber, 0.45) + padlock2(182, 82, false, B.amber, 0.45);
    alt = 'A laptop screen says FILES LOCKED, pay to unlock, with padlocks on every file.';
  } else if (kind === 'spyware') {
    b = blob(110, 62, 86, 48, '#e3ecf8') + ground(110, 110, 80) + laptop2(30, 30, 92, screenLines());
    b += [0, 1, 2, 3].map((k) => R(46 + k * 16, 102, 12, 9, { r: 2, f: '#fff', sw: 1.2 })).join('') + T(52, 109, 'p', { size: 8, c: B.ink, mono: true }) + T(68, 109, 'a', { size: 8, c: B.ink, mono: true }) + T(84, 109, 's', { size: 8, c: B.ink, mono: true }) + T(100, 109, 's', { size: 8, c: B.ink, mono: true });
    b += `<ellipse cx="160" cy="46" rx="26" ry="15" fill="#fff" stroke="${B.ink}" stroke-width="2"/>` + C(160, 46, 9, '#5c7fb3', B.ink, 1.6) + C(160, 46, 4, B.ink, 'none', 0) + C(163, 43, 1.8, '#fff', 'none', 0);
    b += P('M136 64 Q150 84 128 100', 'none', B.red, 1.8, ' stroke-dasharray="4 4"') + R(150, 76, 56, 22, { r: 4, f: '#fdeee9', s: B.red, sw: 1.6 }) + T(178, 91, 'pass…', { size: 11, c: B.red, mono: true });
    alt = 'A hidden eye watches the keys being typed on a laptop and secretly records the password.';
  } else {
    b = blob(110, 62, 86, 48, '#dcefe2') + ground(90, 112, 40) + phone2(64, 10, 56, 102, (x, y, w, h) => [0, 1, 2, 3, 4, 5].map((k) => R(x + 5 + (k % 3) * (w - 10) / 3, y + 6 + Math.floor(k / 3) * 22, (w - 10) / 3 - 4, 16, { r: 4, f: ['#8fb0dc', '#9fd3ae', '#f2c48a', '#c9b3e6', '#f8c9c2', '#e8b94a'][k], s: 'none', sw: 0 })).join('') + R(x + 5, y + 54, (w - 10) / 3 - 4, 16, { r: 4, f: '#c2453b', s: B.ink, sw: 1.2 }) + T(x + 5 + ((w - 10) / 3 - 4) / 2, y + 66, 'APK', { size: 6.5, c: '#fff' }));
    b += bug(150, 64, 0.75) + P('M138 64 L104 70', 'none', B.red, 1.6, ' stroke-dasharray="3 3"') + T(168, 100, 'fake app', { size: 11.5, c: B.red }) + R(4, 40, 52, 40, { r: 6, f: '#fff', sw: 1.6 }) + T(30, 56, 'Install', { size: 9.5, c: B.ink }) + T(30, 70, 'anyway?', { size: 9.5, c: B.red });
    alt = 'A phone with a red fake app (an APK file from outside the app store) that hides a malware bug.';
  }
  return svgWrap(220, 120, alt, b);
}

/* ================= SCAM CARDS ================= */
/** One card picture per kind of online scam. 220 x 120. */
export function scamPic(kind) {
  let b = '', alt = '';
  if (kind === 'shop') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 80) + phone2(20, 12, 60, 100, (x, y, w, h) => R(x + 4, y + 4, w - 8, h * 0.42, { r: 4, f: '#dfe3ea', s: 'none', sw: 0 }) + R(x + w * 0.32, y + 10, w * 0.36, h * 0.3, { r: 5, f: '#2b3446', s: 'none', sw: 0 }) + T(x + w / 2, y + h * 0.58, '₱2,999', { size: 10, c: B.red, mono: true }) + T(x + w / 2, y + h * 0.7, 'was ₱45,000', { size: 7, w: 700, c: B.soft }) + R(x + 6, y + h * 0.78, w - 12, 12, { r: 6, f: B.orange, s: 'none', sw: 0 }) + T(x + w / 2, y + h * 0.78 + 9, 'Reserve', { size: 7, c: '#fff' }));
    b += say(90, 16, 124, 'Send ₱500 deposit', 98, 48, '#fdeee9', B.red, 11) + say(90, 54, 124, 'No meetups, no COD', 98, 86, '#fdeee9', B.red, 11);
    alt = 'A phone shows a new phone for only ₱2,999. The seller asks for a deposit first and refuses meetups or cash on delivery.';
  } else if (kind === 'task') {
    b = blob(110, 62, 86, 48, '#e3ecf8') + ground(110, 110, 80) + phone2(20, 12, 60, 100, (x, y, w, h) => [0, 1, 2].map((k) => R(x + 5, y + 6 + k * 26, w - 10, 20, { r: 4, f: '#fff', s: '#c9d2df', sw: 1 }) + T(x + 13, y + 20 + k * 26, '♥', { size: 10, c: '#e86f8a' }) + T(x + w - 9, y + 20 + k * 26, '+₱50', { size: 8, a: 'end', c: B.green, mono: true })).join(''));
    b += say(90, 14, 124, 'Earn ₱1,500 a day!', 98, 46, '#e3f3e9', B.green, 11) + say(90, 54, 124, 'Top up ₱3,000 first', 98, 86, '#fdeee9', B.red, 11);
    alt = 'A phone pays a few pesos for liking videos. Then the scammer asks for a big top-up before you can withdraw.';
  } else if (kind === 'invest') {
    b = blob(110, 62, 86, 48, '#dcefe2') + ground(110, 110, 80) + R(18, 16, 92, 80, { r: 6, f: '#fff', sw: 2 }) + P('M28 84 L48 74 L64 78 L84 50 L100 26', 'none', B.green, 3) + ARROW(92, 36, 100, 26, B.green, 3);
    b += T(64, 104, 'Double in 7 days!', { size: 11, c: B.green }) + coin(136, 44, 12) + coin(154, 60, 12) + coin(172, 44, 12) + T(156, 96, 'guaranteed?', { size: 12, c: B.red });
    alt = 'A chart that only goes up and coins: an offer to double your money in 7 days, "guaranteed".';
  } else if (kind === 'love') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 80) + phone2(20, 12, 60, 100, (x, y, w, h) => C(x + w / 2, y + 22, 13, '#f2c48a', 'none', 0) + T(x + w / 2, y + 48, '"Alex"', { size: 9, c: B.ink }) + R(x + 6, y + 56, w - 12, 10, { r: 4, f: '#f8d6de', s: 'none', sw: 0 }) + R(x + 6, y + 70, w - 18, 10, { r: 4, f: '#f8d6de', s: 'none', sw: 0 }));
    b += heart(104, 30, 1.1) + heart(122, 18, 0.7) + say(90, 46, 124, 'Need ₱20k for a visa', 98, 78, '#fdeee9', B.red, 11) + hacker2(186, 82, 0.34);
    alt = 'A sweet online "Alex" with hearts asks for money for a visa; the real person behind it is a stranger.';
  } else if (kind === 'mule') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 80) + person2(40, 26, 0.84, { shirt: B.green }) + phone2(66, 50, 36, 62, walletScreen('₱90k', B.red));
    b += say(102, 10, 114, 'Rent your account?', 112, 44, '#fff', B.ink, 11) + T(160, 66, '₱1,000/week', { size: 11.5, c: B.green }) + hacker2(160, 72, 0.42) + P('M104 84 L140 86', 'none', B.red, 2, ' stroke-dasharray="4 4"') + ARROW(130, 86, 142, 86, B.red, 2);
    alt = 'A stranger offers ₱1,000 a week to "rent" a student\'s e-wallet. Stolen money passes through her account: she becomes a money mule.';
  } else {
    b = blob(110, 62, 86, 48, '#e3ecf8') + ground(110, 110, 80) + phone2(20, 10, 64, 104, (x, y, w, h) => R(x, y, w, h, { r: 6, f: '#2f3d55', s: 'none', sw: 0 }) + C(x + w / 2, y + h * 0.36, 16, '#e9c3a0', 'none', 0) + P(`M${x + w / 2 - 16} ${y + h * 0.33} Q${x + w / 2} ${y + h * 0.1} ${x + w / 2 + 16} ${y + h * 0.33}`, '#5a4636', 'none', 0) + T(x + w / 2, y + h * 0.75, '"Invest now!"', { size: 7.5, c: '#fff' }));
    b += [[30, 40], [70, 34], [46, 72]].map(([x, y]) => R(x, y, 6, 6, { r: 1, f: 'rgba(120,200,255,0.55)', s: 'none', sw: 0 })).join('');
    b += R(96, 22, 110, 70, { r: 8, f: '#fff', sw: 1.8 }) + T(151, 42, 'AI-made', { size: 12, c: B.red }) + T(151, 60, 'fake face', { size: 11, w: 700, c: B.soft }) + T(151, 78, 'and voice', { size: 11, w: 700, c: B.soft }) + spark(196, 16, 0.9, B.red);
    alt = 'A video of a famous-looking person saying "Invest now!", with glitches: an AI-made fake face and voice (a deepfake).';
  }
  return svgWrap(220, 120, alt, b);
}

/* ================= BIG FIGURES ================= */
/** A botnet: one botherder sends orders to infected devices, which all attack one website. 480 x 300. */
export function botnetPic() {
  let b = blob(240, 150, 234, 140, '#f6f8fb') + ground(66, 138, 52) + ground(420, 220, 50);
  b += laptop2(30, 82, 72, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#1f2a3d', s: 'none', sw: 0 }) + T(x + 5, y + 14, '> attack', { size: 9, a: 'start', c: '#ff8f80', mono: true }) + T(x + 5, y + 26, '> go', { size: 9, a: 'start', c: '#ff8f80', mono: true }));
  b += hacker2(66, 6, 0.8) + label(66, 172, 'botherder', '#a6461f', '#fbe7da');
  const bots = [[176, 26, 'pc'], [176, 116, 'phone'], [176, 206, 'cam'], [272, 66, 'tv'], [272, 166, 'router']];
  bots.forEach(([x, y]) => { b += P(`M108 110 Q${(108 + x) / 2} ${y + 20} ${x - 6} ${y + 20}`, 'none', '#d78a6a', 1.8, ' stroke-dasharray="5 5"'); });
  bots.forEach(([x, y, k]) => {
    b += R(x - 6, y - 4, 76, 62, { r: 10, f: '#fff', s: '#c9d2df', sw: 1.6 });
    if (k === 'pc') b += pc2(x + 6, y + 2, 50, screenLines());
    if (k === 'phone') b += phone2(x + 18, y, 26, 48, screenLines());
    if (k === 'cam') b += cctv(x + 6, y + 22, 1);
    if (k === 'tv') b += tv(x + 6, y + 6, 52);
    if (k === 'router') b += router2(x + 4, y + 30, 56);
    b += bug(x + 62, y + 4, 0.55);
    b += P(`M${x + 70} ${y + 28} Q${(x + 70 + 390) / 2} ${y + 40} 386 ${150 + (y - 116) * 0.25}`, 'none', B.red, 2);
    b += ARROW(374, 150 + (y - 116) * 0.25 - 1, 386, 150 + (y - 116) * 0.25, B.red, 2);
  });
  b += server2(394, 108, 44, 98) + alertBadge(444, 108, 1.2) + label(420, 252, 'target website', B.red, '#fdeee9');
  b += T(222, 296, 'bots: infected devices that obey the botherder', { size: 13, w: 700, c: B.soft });
  return svgWrap(480, 304, 'A botherder at a laptop sends orders to five infected devices: a computer, a phone, a CCTV camera, a smart TV, and a router. Each has a malware bug. All five then send traffic to one target website, which shows a red alert.', b);
}

/** Denial of service, with a canteen analogy. Top: a normal day. Bottom: a flood of fake orders. 480 x 340. */
export function ddosPic() {
  let b = '';
  const row = (y, flood) => {
    let g = R(10, y, 460, 156, { r: 16, f: flood ? '#fdf1ec' : '#eef6f1', s: flood ? '#e3b3a3' : '#b9dcc5', sw: 1.6 });
    g += label(84, y + 28, flood ? 'Denial of service' : 'A normal day', flood ? B.red : B.green, '#fff', 13);
    g += server2(398, y + 36, 44, 92) + ground(420, y + 138, 34);
    if (!flood) {
      g += person2(100, y + 52, 0.78, { shirt: B.blue }) + phone2(126, y + 86, 24, 42, screenLines());
      g += person2(220, y + 52, 0.78, { shirt: B.orange }) + phone2(246, y + 86, 24, 42, screenLines());
      g += P(`M152 ${y + 104} Q200 ${y + 152} 300 ${y + 132} Q350 ${y + 120} 384 ${y + 100}`, 'none', B.green, 2.4) + ARROW(374, y + 106, 386, y + 99, B.green, 2.4) + ARROW(272, y + 100, 386, y + 82, B.green, 2.4) + check(444, y + 40, 0.9);
      g += T(270, y + 30, 'orders come in, pages load', { size: 12.5, w: 700, c: '#2f6b45' });
    } else {
      for (let i = 0; i < 12; i++) { const x = 24 + (i % 6) * 36, yy = y + 46 + Math.floor(i / 6) * 38; g += L(x + 26, yy + 12, 386, y + 46 + (i % 6) * 7, 'rgba(194,69,59,0.45)', 1.4); }
      for (let i = 0; i < 12; i++) { const x = 24 + (i % 6) * 36, yy = y + 46 + Math.floor(i / 6) * 38; g += R(x, yy, 26, 24, { r: 5, f: '#fff', s: '#c2453b', sw: 1.4 }) + bug(x + 13, yy + 12, 0.4); }
      g += person2(316, y + 84, 0.6, { shirt: B.blue, sad: true }) + C(352, y + 96, 8, 'none', '#c9d2df', 3) + P(`M352 ${y + 88} A8 8 0 0 1 360 ${y + 96}`, 'none', B.blue, 3);
      g += T(316, y + 151, 'real user: still loading…', { size: 12, w: 700, c: B.soft });
      g += alertBadge(444, y + 40, 1.1) + T(118, y + 140, 'thousands of fake requests', { size: 12.5, w: 700, c: '#9c2f28' });
    }
    return g;
  };
  b = row(6, false) + row(176, true);
  return svgWrap(480, 340, 'Top: on a normal day, two students send orders and the server answers. Bottom: in a denial of service attack, many infected devices flood the server with fake requests, so a real student\'s page keeps loading.', b);
}

/** The 3-2-1 backup rule. 480 x 250. */
export function backupPic() {
  let b = blob(240, 120, 232, 112, '#f6f8fb');
  const col = (x, n, t1, t2) => R(x, 14, 140, 228, { r: 14, f: '#fff', s: '#c9d2df', sw: 1.6 }) + T(x + 70, 62, n, { size: 40, c: B.blue }) + T(x + 70, 210, t1, { size: 14, c: B.ink }) + T(x + 70, 230, t2, { size: 12.5, w: 700, c: B.soft });
  b += col(10, '3', '3 copies', 'the file + 2 backups') + col(170, '2', '2 kinds of storage', 'e.g., laptop + drive') + col(330, '1', '1 copy away', 'cloud or another place');
  b += doc(38, 82, 28, 38) + doc(68, 82, 28, 38) + doc(98, 82, 28, 38) + P('M44 132 L120 132', 'none', 'none', 0);
  b += laptop2(186, 88, 56, screenLines()) + R(262, 92, 30, 42, { r: 5, f: '#3b4659', sw: 2 }) + R(268, 98, 18, 6, { r: 2, f: '#6b7a94', s: 'none', sw: 0 }) + C(277, 124, 2.4, B.green, 'none', 0) + L(242, 120, 262, 118, B.ink, 2);
  b += P('M372 132 Q362 132 362 120 Q362 106 378 106 Q382 90 400 92 Q414 82 428 96 Q446 96 446 114 Q446 132 430 132 Z', '#e8f0fb', B.ink, 2) + ARROW(400, 154, 400, 136, B.blue, 2.4) + T(400, 170, 'synced', { size: 11, w: 700, c: B.soft });
  return svgWrap(480, 250, 'The 3-2-1 backup rule: keep 3 copies of important files, on 2 kinds of storage (such as a laptop and an external drive), with 1 copy in another place, such as the cloud.', b);
}

/** The phishing family: email, text, call, and QR code. 480 x 330. */
export function phishFamilyPic() {
  let b = '';
  const panel = (x, y, name, sub) => R(x, y, 226, 156, { r: 14, f: '#fff', s: '#c9d2df', sw: 1.6 }) + label(x + 113, y + 140, name, B.blueInk, '#e3ecf8', 13) + T(x + 113, y + 24, sub, { size: 12, w: 700, c: B.soft });
  b += panel(8, 6, 'phishing', 'by email') + panel(246, 6, 'smishing', 'by text (SMS)') + panel(8, 172, 'vishing', 'by voice call') + panel(246, 172, 'quishing', 'by QR code');
  b += envelope2(58, 44, 84, 56) + R(112, 70, 70, 22, { r: 4, f: '#fff', s: B.red, sw: 1.6 }) + T(147, 85, 'Verify now', { size: 10.5, c: B.red }) + alertBadge(150, 46);
  b += phone2(310, 36, 44, 84, (x, y, w, h) => R(x + 3, y + 4, w - 8, h * 0.6, { r: 5, f: '#fff', s: '#c9d2df', sw: 1 }) + L(x + 7, y + 14, x + w - 10, y + 14, '#b7c7e0', 2.4) + L(x + 7, y + 22, x + w - 14, y + 22, '#b7c7e0', 2.4) + T(x + w / 2 - 2, y + 36, 'link', { size: 7.5, c: B.red }));
  b += say(362, 44, 98, 'Account locked!', 362, 82, '#fdeee9', B.red, 11);
  b += phone2(56, 204, 44, 84, (x, y, w, h) => R(x, y, w, h, { r: 6, f: '#2f3d55', s: 'none', sw: 0 }) + T(x + w / 2, y + 16, 'Bank?', { size: 8, c: '#fff' }) + C(x + w / 2, y + h - 12, 6, '#3f9a5f', 'none', 0));
  b += say(110, 208, 112, 'Read me the OTP', 116, 246, '#fdeee9', B.red, 11) + P('M110 262 q8 -6 0 -12 M118 266 q12 -10 0 -20', 'none', B.blueMid, 2);
  b += R(292, 204, 70, 84, { r: 4, f: '#fff4c7', sw: 1.8 }) + T(327, 218, 'PARKING', { size: 8.5, c: B.ink }) + qr(307, 226, 40) + R(302, 221, 50, 50, { r: 2, f: 'rgba(255,255,255,0)', s: B.red, sw: 1.8, dash: '4 3' });
  b += T(414, 226, 'sticker', { size: 11, c: B.red }) + T(414, 240, 'over the', { size: 11, c: B.red }) + T(414, 254, 'real code', { size: 11, c: B.red }) + ARROW(392, 244, 364, 254, B.red, 2);
  return svgWrap(480, 334, 'Four kinds of phishing: phishing by email ("Verify now"), smishing by text message ("Account locked!"), vishing by phone call ("Read me the OTP"), and quishing by a fake QR code sticker placed over the real one on a parking sign.', b);
}

/** What does this post give away? A social-media post with four numbered clues. 480 x 340. */
export function oversharePic() {
  let b = blob(240, 170, 232, 160, '#f6f8fb');
  b += R(70, 10, 300, 320, { r: 16, f: '#fff', sw: 2 }) + C(98, 38, 14, '#f2c48a', B.ink, 1.6) + T(120, 36, 'Bea Reyes', { size: 13, a: 'start', c: B.ink }) + T(120, 52, '📍 Home, Purok 3, Dahican', { size: 11, w: 700, a: 'start', c: B.soft });
  b += R(84, 64, 272, 190, { r: 6, f: '#cfe3f3', s: 'none', sw: 0 }) + P('M84 210 L356 210 L356 254 L84 254 Z', '#d8e6c8', 'none', 0);
  b += R(232, 120, 104, 90, { r: 2, f: '#f3e6d0', sw: 1.6 }) + P('M224 122 L284 84 L344 122 Z', '#b9583f', B.ink, 1.6) + R(296, 160, 22, 50, { r: 1, f: '#8a5a3a', sw: 1.4 }) + R(246, 142, 30, 24, { r: 1, f: '#cfe3f3', sw: 1.4 });
  b += R(248, 124, 28, 14, { r: 2, f: '#fff', sw: 1.2 }) + T(262, 135, '27', { size: 10, c: B.ink });
  b += person2(150, 104, 1.1, { shirt: '#f4f6f9' }) + R(140, 160, 20, 26, { r: 2, f: '#fff', s: B.blue, sw: 1.4 }) + R(140, 160, 20, 7, { r: 2, f: B.blue, s: 'none', sw: 0 }) + L(150, 150, 140, 160, B.blue, 1.4) + L(150, 150, 160, 160, B.blue, 1.4);
  b += T(84, 276, '"First day of class! So excited 😊"', { size: 12.5, w: 700, a: 'start', c: B.ink }) + T(84, 296, '#BSIT1A #DOrSU', { size: 12, w: 700, a: 'start', c: B.blue });
  const pin = (x, y, n) => C(x, y, 12, B.orange, B.ink, 2) + T(x, y + 5, String(n), { size: 13, c: '#fff' });
  b += pin(56, 46, 1) + pin(400, 128, 2) + pin(118, 176, 3) + pin(400, 288, 4);
  b += P('M68 46 L84 48', 'none', B.orange, 2) + P('M388 128 L280 132', 'none', B.orange, 2) + P('M130 176 L140 172', 'none', B.orange, 2) + P('M388 288 L190 294', 'none', B.orange, 2);
  return svgWrap(480, 340, 'A social media post by Bea with four numbered clues: 1, a location tag that says Home and names her purok; 2, her house number behind her; 3, her school ID on a lanyard; 4, a caption and hashtags that name her school and section.', b);
}

/** If you were scammed: four steps, in order. 480 x 236. */
export function reportPic() {
  let b = '';
  const step = (x, n, t1, t2) => R(x, 8, 110, 220, { r: 14, f: '#fff', s: '#c9d2df', sw: 1.6 }) + C(x + 20, 30, 13, B.orange, B.ink, 2) + T(x + 20, 35, String(n), { size: 14, c: '#fff' }) + T(x + 55, 192, t1, { size: 12.5, c: B.ink }) + T(x + 55, 210, t2, { size: 12.5, c: B.ink });
  b += step(6, 1, 'Call your bank', 'or e-wallet') + step(124, 2, 'Report to', 'hotline 1326') + step(242, 3, 'Change your', 'passwords') + step(360, 4, 'Keep proof:', 'screenshots');
  b += phone2(38, 56, 46, 88, walletScreen('FROZEN', B.red)) + padlock2(62, 128, false, B.amber, 0.6);
  b += phone2(156, 56, 46, 88, (x, y, w, h) => R(x, y, w, h, { r: 6, f: '#2f3d55', s: 'none', sw: 0 }) + T(x + w / 2, y + 22, '1326', { size: 12, c: '#fff', mono: true }) + T(x + w / 2, y + 36, 'calling…', { size: 7, w: 600, c: '#c9d3e3' }) + C(x + w / 2, y + h - 12, 7, '#d4422f', 'none', 0));
  b += R(262, 64, 70, 30, { r: 15, f: '#f1f3f6', s: '#b7bfcc', sw: 1.4 }) + [0, 1, 2, 3, 4, 5].map((k) => C(276 + k * 9, 79, 2.8, B.ink, 'none', 0)).join('') + shield2(297, 100, 0.55, B.greenWash) + check(312, 112, 0.7);
  b += [0, 1, 2].map((k) => R(382 + k * 10, 60 + k * 10, 50, 80, { r: 5, f: '#fff', sw: 1.6 }) + R(386 + k * 10, 66 + k * 10, 42, 20, { r: 3, f: B.blueWash, s: 'none', sw: 0 }) + L(388 + k * 10, 96 + k * 10, 424 + k * 10, 96 + k * 10, B.line, 2.4) + L(388 + k * 10, 104 + k * 10, 416 + k * 10, 104 + k * 10, B.line, 2.4)).join('');
  [116, 234, 352].forEach((x) => { b += ARROW(x, 118, x + 8, 118, B.orange, 2.4); });
  return svgWrap(480, 236, 'Four steps after a scam: 1, call your bank or e-wallet to freeze the account; 2, report to hotline 1326; 3, change your passwords; 4, keep proof such as screenshots.', b);
}

/* ================= "PICTURE THIS" SCENES (chat 55, round 4) ================= */
// a girl: long hair behind the head, then the kit's person
const girl = (x, y, s = 1, o = {}) => P(`M${x - 18 * s} ${y + 14 * s} Q${x - 22 * s} ${y + 40 * s} ${x - 16 * s} ${y + 50 * s} L${x + 16 * s} ${y + 50 * s} Q${x + 22 * s} ${y + 40 * s} ${x + 18 * s} ${y + 14 * s} Z`, o.hair ?? B.hair, B.ink, 1.8) + person2(x, y, s, o);
const moonWin = (x, y) => R(x, y, 50, 44, { r: 4, f: '#24365a', sw: 2 }) + C(x + 34, y + 14, 8, '#fff4c7', 'none', 0) + C(x + 38, y + 11, 7, '#24365a', 'none', 0) + C(x + 12, y + 10, 1.4, '#fff', 'none', 0) + C(x + 20, y + 30, 1.2, '#fff', 'none', 0) + L(x + 25, y, x + 25, y + 44, B.ink, 1.6) + L(x, y + 22, x + 50, y + 22, B.ink, 1.6);
/** A drawing for a "Picture this" sticky note. 240 x 160. kind: paolo, lea, shop, mia, bea. */
export function scenePic(kind) {
  let b = '', alt = '';
  if (kind === 'paolo') {
    b = blob(120, 82, 112, 72, '#e3ecf8') + ground(76, 152, 60) + moonWin(10, 10);
    b += girl(76, 64, 0.95, { shirt: B.green }) + phone2(92, 104, 30, 52, chatLines(['#dfe9f6', '#f8c9c2']));
    b += say(70, 8, 106, 'Borrow ₱500?', 104, 44, '#fff', B.ink, 12) + T(124, 62, 'from "Paolo"', { size: 10.5, w: 700, c: B.soft });
    b += laptop2(160, 96, 70, (x, y, w, h) => R(x + 4, y + 4, w - 8, h - 8, { r: 2, f: '#fff', s: 'none', sw: 0 }) + C(x + 14, y + h / 2, 6, '#f2c48a', 'none', 0) + T(x + w / 2 + 6, y + h / 2 + 3, 'Paolo', { size: 8.5, c: B.ink })) + hacker2(196, 34, 0.62);
    alt = 'At night, Jessa reads a message from "Paolo" asking to borrow ₱500. Behind it, a hooded stranger is using Paolo\'s account on a laptop.';
  } else if (kind === 'lea') {
    b = R(4, 6, 112, 148, { r: 10, f: '#fdf1ec', s: '#e3b3a3', sw: 1.4 }) + R(124, 6, 112, 148, { r: 10, f: '#eef3fb', s: '#b7c7e0', sw: 1.4 });
    b += C(18, 20, 10, B.orange, B.ink, 1.6) + T(18, 24.5, '1', { size: 12, c: '#fff' }) + C(138, 20, 10, B.blue, B.ink, 1.6) + T(138, 24.5, '2', { size: 12, c: '#fff' });
    b += girl(46, 56, 0.8, { shirt: '#f4f6f9' }) + phone2(54, 92, 26, 46, chatLines(['#dfe9f6', '#f8c9c2', '#dfe9f6'])) + person2(94, 66, 0.62, { shirt: B.blue }) + T(94, 60, '?', { size: 13, c: B.soft });
    b += T(60, 148, 'opens his chats', { size: 10.5, w: 700, c: '#9c2f28' });
    b += pc2(150, 38, 60, (x, y, w, h) => R(x + 2, y + 2, w - 4, 8, { r: 1, f: B.orange, s: 'none', sw: 0 }) + T(x + w / 2, y + 9, 'MY SHOP', { size: 6, c: '#fff' }) + R(x + 4, y + 13, 14, 10, { r: 1, f: '#f2c48a', s: 'none', sw: 0 }) + R(x + 21, y + 13, 14, 10, { r: 1, f: '#9fd3ae', s: 'none', sw: 0 }) + R(x + 38, y + 13, 10, 10, { r: 1, f: '#c9b3e6', s: 'none', sw: 0 }));
    b += girl(206, 76, 0.62, { shirt: '#7a8aa3' }) + R(140, 112, 86, 6, { r: 2, f: '#c8a27a', sw: 1.4 }) + R(146, 98, 18, 14, { r: 2, f: '#d8b48a', sw: 1.2 }) + T(180, 148, 'office PC, own shop', { size: 10.5, w: 700, c: B.blueInk });
    alt = 'Two panels. 1: Lea holds her seatmate\'s phone and reads his chats while he looks confused. 2: An office clerk uses the office computer to run her own online shop.';
  } else if (kind === 'shop') {
    b = blob(120, 82, 114, 70, '#fbe7da') + T(120, 152, 'by evening, every computer is locked', { size: 11, w: 700, c: '#9c2f28' });
    b += girl(28, 50, 0.7, { shirt: B.orange }) + R(6, 112, 228, 8, { r: 2, f: '#c8a27a', sw: 1.6 });
    b += pc2(54, 62, 56, (x, y, w, h) => R(x + 3, y + 7, w - 6, 13, { r: 2, f: '#fff', s: '#c9d2df', sw: 1 }) + T(x + w / 2, y + 16.5, 'FINAL.exe', { size: 7, c: B.ink, mono: true }));
    b += R(104, 98, 7, 14, { r: 2, f: B.blue, sw: 1.4 }) + R(105.5, 94, 4, 5, { r: 1, f: '#c8ced8', sw: 1 });
    [[118, 62], [178, 62]].forEach(([x, y]) => { b += pc2(x, y, 56, (px, py, w, h) => R(px, py, w, h, { r: 0, f: '#7a1f1a', s: 'none', sw: 0 }) + T(px + w / 2, py + h - 5, 'PAY ₱', { size: 7.5, c: '#ffd2c7', mono: true })) + padlock2(x + 20, y + 4, false, B.amber, 0.42); });
    b += bug(168, 52, 0.5) + bug(228, 52, 0.5);
    alt = 'At a computer shop, a student plugs in a USB flash drive and opens Project_FINAL.exe. The other computers turn red, locked, asking for payment.';
  } else if (kind === 'mia') {
    b = blob(120, 82, 112, 72, '#e3ecf8') + ground(62, 152, 50) + girl(56, 56, 0.95, { shirt: B.blue, sad: true }) + phone2(70, 98, 36, 54, (x, y, w, h) => R(x + 2, y + 6, w - 4, 18, { r: 3, f: '#fdeee9', s: 'none', sw: 0 }) + T(x + w / 2, y + 18, 'LOCKED', { size: 6.5, c: B.red }));
    b += say(108, 8, 124, 'Verify now: link', 116, 42, '#fdeee9', B.red, 11);
    b += phone2(170, 56, 50, 92, (x, y, w, h) => R(x + 2, y + 4, w - 4, h * 0.36, { r: 4, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 18, 'PeraPay', { size: 8, c: '#fff' }) + T(x + w / 2, y + 30, 'balance', { size: 6.5, w: 600, c: '#dfe9f6' }) + T(x + w / 2, y + h * 0.58, '₱8,450', { size: 8.5, c: B.soft, mono: true }) + L(x + 8, y + h * 0.56, x + w - 8, y + h * 0.5, B.red, 2) + T(x + w / 2, y + h * 0.8, '₱0', { size: 13, c: B.red, mono: true }));
    b += T(138, 136, '10 min', { size: 10, w: 700, c: B.soft }) + T(138, 148, 'later', { size: 10, w: 700, c: B.soft }) + ARROW(112, 116, 164, 104, B.red, 2);
    alt = 'Mia, worried, taps a "LOCKED! Verify now" link on her phone. Ten minutes later, her PeraPay balance drops from ₱8,450 to ₱0.';
  } else {
    b = blob(120, 82, 112, 72, '#fbe7da') + ground(68, 152, 54);
    b += R(160, 70, 70, 62, { r: 2, f: '#f3e6d0', sw: 1.6 }) + P('M152 72 L195 40 L238 72 Z', '#b9583f', B.ink, 1.6) + R(198, 98, 18, 34, { r: 1, f: '#8a5a3a', sw: 1.4 }) + R(168, 84, 22, 18, { r: 1, f: '#cfe3f3', sw: 1.4 }) + R(170, 74, 16, 9, { r: 1, f: '#fff', sw: 1 }) + T(178, 81.5, '27', { size: 7, c: B.ink });
    b += girl(60, 58, 0.9, { shirt: B.green, sad: true }) + phone2(76, 98, 32, 54, chatLines(['#f8c9c2', '#f8c9c2', '#f8c9c2']));
    b += say(96, 6, 132, '"Nice house. Purok 3?"', 112, 40, '#fdeee9', B.red, 11) + hacker2(132, 64, 0.5) + T(132, 60, 'unknown', { size: 9, w: 700, c: B.soft });
    alt = 'Bea looks worried at her phone. A comment from an unknown account says "Nice house. Purok 3?" Behind her is her house with its number, and a hooded stranger watching.';
  }
  return svgWrap(240, 160, alt, b).replace('class="clean"', 'class="clean def-pic scene-pic"');
}
