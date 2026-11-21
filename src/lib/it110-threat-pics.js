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
      // redrawn chat 57: the bot looks normal (a page is open), a bug hides on it, and the botherder steers it with a remote control
      b = blob(80, 64, 70, 48, '#e3ecf8') + ground(54, 113, 46) + laptop2(16, 48, 76, screenLines()) + bug(22, 52, 0.62);
      b += hacker2(134, 34, 0.56) + R(104, 62, 13, 22, { r: 3, f: '#3b4659', sw: 1.6 }) + C(110.5, 70, 2.6, B.red, 'none', 0) + R(107, 76, 7, 3, { r: 1, f: '#c8ced8', s: 'none', sw: 0 }) + L(110.5, 62, 110.5, 52, B.ink, 1.8) + C(110.5, 51, 2, B.red, 'none', 0);
      b += [6, 12, 18].map((r) => P(`M${104 - r * 0.6} ${51 - r * 0.8} A${r} ${r} 0 0 0 ${104 - r * 0.6} ${51 + r * 0.8}`, 'none', B.red, 2)).join('');
      b += label(54, 32, 'bot', B.red, '#fdeee9', 11) + label(126, 24, 'botherder', '#a6461f', '#fbe7da', 9.5);
      alt = 'A laptop that looks normal, with a web page open, has a hidden malware bug on it. A hooded botherder controls it from far away with a remote control. The laptop is a bot.'; break;
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
      b += T(80, 86, 'HACKED', { size: 17, c: '#c0392b' }) + P('M38 94 Q56 88 74 93 T112 92 T128 90', 'none', '#d4422f', 3) + spark(140, 20, 1, B.red);
      alt = 'A website with HACKED spray-painted across it in red: website defacement.'; break;
    case 'breach':
      b = blob(80, 62, 70, 50, '#fbe7da') + ground(64, 112, 44);
      b += `<ellipse cx="64" cy="30" rx="30" ry="9" fill="#dfe9f6" stroke="${B.ink}" stroke-width="2"/>` + P('M34 30 L34 90 Q64 104 94 90 L94 30', '#c9d8ee', B.ink, 2) + P('M34 50 Q64 62 94 50 M34 70 Q64 82 94 70', 'none', B.ink, 1.6) + `<ellipse cx="64" cy="30" rx="30" ry="9" fill="#dfe9f6" stroke="${B.ink}" stroke-width="2"/>`;
      b += P('M94 66 L104 60 L100 70 Z', B.red, B.ink, 1.4) + [[112, 46], [126, 62], [112, 80]].map(([x, y], k) => R(x, y, 26, 14, { r: 2, f: '#fff', sw: 1.4 }) + L(x + 4, y + 5, x + 20, y + 5, '#b7c7e0', 2) + L(x + 4, y + 9, x + 15, y + 9, '#b7c7e0', 2)).join('') + spark(140, 26, 0.9, B.red);
      alt = 'A database leaking records out through a crack in its side: a data breach.'; break;
    case 'idtheft':
      // redrawn chat 58: a hooded thief holds up Mia's ID card and says he is Mia; the real Mia is shocked
      b = blob(80, 64, 72, 50, '#e3ecf8') + ground(80, 113, 66) + hacker2(48, 40, 0.86);
      b += R(20, 74, 64, 40, { r: 5, f: '#fff', sw: 2 }) + R(20, 74, 64, 11, { r: 5, f: B.blue, sw: 2 }) + T(52, 82.5, 'ID CARD', { size: 7.5, c: '#fff' });
      b += R(25, 89, 19, 21, { r: 2, f: B.blueWash, sw: 1.2 }) + `<clipPath id="idtPh"><rect x="25" y="89" width="19" height="21"/></clipPath><g clip-path="url(#idtPh)">` + girl(34.5, 90.5, 0.42, { shirt: B.green }) + '</g>';
      b += T(64, 98, 'Mia', { size: 9.5, c: B.ink }) + T(64, 107, 'Santos', { size: 7.5, w: 700, c: B.soft }) + C(19, 96, 4.5, B.skin, B.ink, 1.4) + C(85, 96, 4.5, B.skin, B.ink, 1.4);
      b += say(6, 8, 70, "I'm Mia!", 44, 40, '#fdeee9', B.red, 12);
      b += girl(130, 42, 0.8, { shirt: B.green, sad: true }) + T(104, 66, '?', { size: 18, c: B.red }) + label(124, 22, 'real Mia', '#2f7a4b', '#e6f4ea', 9.5);
      alt = 'A hooded thief holds up Mia\'s ID card and says "I\'m Mia!", while the real Mia looks on, shocked: identity theft.'; break;
    case 'social':
      // redrawn chat 58: a stranger holds a smiling face mask over his face (pretends to be a friendly bank worker); the person trusts him and hands over a key
      b = blob(80, 64, 72, 50, '#fbe7da') + ground(80, 113, 66) + hacker2(50, 28, 0.88);
      b += L(38, 64, 27, 90, '#8a5a3a', 3) + C(26, 91, 4.8, B.skin, B.ink, 1.4);
      b += `<ellipse cx="50" cy="51" rx="15" ry="17" fill="#fff4c7" stroke="${B.ink}" stroke-width="2"/>` + P('M36 46 Q36 31 50 32 Q64 31 64 46 Q57 40 50 41 Q43 40 36 46 Z', B.hair, B.ink, 1.6);
      b += C(44.5, 51, 1.9, B.ink, 'none', 0) + C(55.5, 51, 1.9, B.ink, 'none', 0) + P('M43 57 Q50 64 57 57', 'none', B.ink, 1.8) + C(40, 57, 2.4, '#f2a8a0', 'none', 0) + C(60, 57, 2.4, '#f2a8a0', 'none', 0);
      b += R(34, 86, 32, 11, { r: 3, f: '#fff', s: B.blue, sw: 1.4 }) + T(50, 94.5, 'PeraBank', { size: 6.5, c: B.blueInk });
      b += girl(132, 42, 0.78, { shirt: B.blue }) + key2R(86, 96, 0.6) + say(92, 6, 66, 'Sure!', 120, 38, '#fff', B.blueInk, 12);
      b += label(50, 20, 'stranger', '#a6461f', '#fbe7da', 9.5);
      alt = 'A stranger holds a friendly smiling face mask over his own face and wears a fake PeraBank badge. A trusting person says "Sure!" and hands him a key: social engineering.'; break;
    case 'phishing':
      // redrawn chat 58: a fishing line comes down into the water; on its hook hangs a fake email (the bait); a fish (the victim) swims toward it
      b = R(0, 34, 160, 86, { r: 0, f: '#e3ecf8', s: 'none', sw: 0 }) + P('M0 34 Q20 28 40 34 T80 34 T120 34 T160 34', 'none', '#8fb0dc', 2.4);
      b += L(64, 0, 64, 40, B.ink, 1.4) + P('M64 40 L64 50 Q64 60 56 60 Q49 60 49 53', 'none', '#7d8799', 2.6) + P('M49 53 L52 56', 'none', '#7d8799', 2.6);
      b += L(64, 46, 64, 50, B.ink, 1.2) + envelope2(40, 50, 50, 34) + R(44, 72, 42, 12, { r: 3, f: '#fff', s: B.red, sw: 1.4 }) + T(65, 81, 'Verify now', { size: 7, c: B.red });
      b += P('M140 82 L152 72 L152 92 Z', B.orange, B.ink, 1.6) + `<ellipse cx="118" cy="82" rx="24" ry="14" fill="${B.orange}" stroke="${B.ink}" stroke-width="2"/>`;
      b += P('M110 70 Q118 64 126 70', 'none', B.ink, 1.4) + P('M118 96 Q124 102 128 96', B.orange, B.ink, 1.4) + C(102, 78, 3, '#fff', B.ink, 1.2) + C(101.5, 78, 1.4, B.ink, 'none', 0) + P('M94 84 Q98 86 96 88', 'none', B.ink, 1.6) + P('M108 88 Q114 92 120 90', 'none', 'rgba(255,255,255,0.5)', 1.6);
      b += C(88, 70, 2.4, 'none', '#8fb0dc', 1.4) + C(85, 62, 1.6, 'none', '#8fb0dc', 1.2) + label(118, 109, 'you', '#a6461f', '#fff', 9.5);
      b += label(22, 58, 'bait', B.red, '#fdeee9', 9.5) + T(120, 20, 'scammer’s line', { size: 9.5, w: 700, c: B.soft });
      alt = 'A fishing line from a scammer goes down into the water. On its hook hangs a fake email that says Verify now, which is the bait. A fish labeled you swims toward it: phishing.'; break;
    case 'pharming':
      // redrawn chat 58: the right address is typed, but at the fork a hidden criminal pulls a switch, so the trip goes to a fake site that looks the same
      {
        const site = (x, y, fake) => R(x, y, 58, 38, { r: 5, f: '#fff', s: fake ? B.red : '#b7bfcc', sw: fake ? 2 : 1.6 }) + R(x, y, 58, 12, { r: 5, f: fake ? B.blue : '#a9b8d0', s: 'none', sw: 0 }) + T(x + 29, y + 9.5, 'PeraBank', { size: 7.5, c: '#fff' })
          + L(x + 8, y + 20, x + 50, y + 20, fake ? '#c9d2df' : '#e1e6ed', 3) + L(x + 8, y + 27, x + 40, y + 27, fake ? '#c9d2df' : '#e1e6ed', 3) + R(x + 16, y + 29, 26, 6, { r: 2, f: fake ? B.blue : '#c9d3e3', s: 'none', sw: 0 });
        b = R(10, 6, 140, 22, { r: 11, f: '#fff', s: '#b7bfcc', sw: 1.6 }) + T(74, 21.5, 'perabank.ph', { size: 10.5, c: B.ink, mono: true }) + L(116, 11, 116, 23, B.blue, 1.6) + check(138, 17, 0.5);
        b += L(80, 28, 80, 44, B.ink, 2.2) + `<path d="M80 44 Q60 48 40 60" fill="none" stroke="#b7bfcc" stroke-width="2" stroke-dasharray="4 3"/>` + cross(56, 50, 0.45) + P('M80 44 Q100 48 118 58', 'none', B.red, 2.4) + ARROW(110, 54, 120, 60, B.red, 2.4);
        b += site(10, 56, false) + site(92, 56, true);
        b += hacker2(80, 62, 0.34) + L(86, 70, 81, 46, '#8a5a3a', 2.4) + C(80.6, 45, 2.6, B.red, B.ink, 1);
        b += label(39, 111, 'real site', B.greyInk, '#fff', 8.5) + label(121, 111, 'fake copy', B.red, '#fdeee9', 8.5);
      }
      alt = 'The correct address perabank.ph is typed. At the fork, a hidden criminal pulls a switch, so the trip goes to a fake copy of the PeraBank site instead of the real site: pharming.'; break;
    case 'spoofing':
      // redrawn chat 58: the real caller is a hooded stranger, but a fake name tag "PeraBank" is attached on the way, so your phone shows PeraBank calling
      b = blob(80, 62, 74, 50, '#e3ecf8') + ground(34, 94, 24) + hacker2(34, 32, 0.6) + phone2(44, 56, 15, 26, null, '#2f3d55');
      b += P('M62 66 Q82 72 100 60', 'none', B.ink, 2) + ARROW(92, 64, 102, 59, B.ink, 2);
      b += `<g transform="rotate(-6 78 44)">` + R(56, 36, 46, 16, { r: 4, f: '#fff', s: B.red, sw: 1.6, dash: '3 2' }) + T(79, 47.5, 'PeraBank', { size: 8.5, c: B.blueInk }) + '</g>' + T(79, 30, 'fake name', { size: 8, c: B.red });
      b += phone2(106, 12, 46, 82, (x, y, w, h) => C(x + w / 2, y + 12, 7, '#5d6b85', 'none', 0) + T(x + w / 2, y + 30, 'PeraBank', { size: 8, c: '#fff' }) + T(x + w / 2, y + 40, 'calling…', { size: 6.5, w: 600, c: '#c9d3e3' })
        + C(x + 10, y + h - 8, 5.5, '#d4422f', 'none', 0) + C(x + w - 10, y + h - 8, 5.5, '#3f9a5f', 'none', 0), '#2f3d55');
      b += label(38, 111, 'real caller', '#a6461f', '#fbe7da', 8.5) + label(121, 111, 'your screen', B.blueInk, '#e3ecf8', 8.5);
      alt = 'The real caller is a hooded stranger. A fake name, PeraBank, is attached to his call, so your phone screen shows PeraBank calling: spoofing.'; break;
    case 'cert':
      // chat 59: closer to a real certificate viewer
      b = blob(80, 62, 70, 50, '#dcefe2') + ground(70, 112, 56) + R(14, 12, 112, 94, { r: 6, f: '#fff', sw: 2 }) + R(14, 12, 112, 18, { r: 6, f: '#e4e9f1', sw: 2 }) + `<rect x="15" y="22" width="110" height="7" fill="#e4e9f1"/>` + T(70, 25, 'Certificate', { size: 9.5, w: 800, c: B.ink });
      b += T(22, 44, 'Issued to', { size: 8, w: 600, a: 'start', c: B.greyInk }) + T(22, 56, 'perabank.ph', { size: 9.5, w: 800, a: 'start', c: B.blueInk }) + T(22, 72, 'Issued by', { size: 8, w: 600, a: 'start', c: B.greyInk }) + T(22, 84, 'TrustSeal CA', { size: 9.5, w: 800, a: 'start', c: B.ink }) + T(22, 98, 'Valid until 2027', { size: 8, w: 600, a: 'start', c: B.greyInk });
      b += padlock2(128, 40, false, B.green, 0.62) + check(146, 44, 0.62);
      alt = 'A certificate window: issued to perabank.ph, issued by TrustSeal CA, valid until 2027, beside a green padlock with a check mark.'; break;
    case 'signature':
      // chat 59: a signed PDF page as a reader app shows it
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 54) + R(32, 8, 96, 100, { r: 4, f: '#fff', sw: 2 }) + R(33, 9, 94, 18, { r: 3, f: '#e3f3e9', s: 'none', sw: 0 }) + C(43, 18, 5.5, B.green, 'none', 0) + P('M40.5 18 L42.5 20 L46 16', 'none', '#fff', 1.6) + T(52, 21.5, 'Signed, valid', { size: 8.5, w: 800, a: 'start', c: '#2a6643' });
      b += L(42, 38, 118, 38, B.line, 2.4) + L(42, 47, 108, 47, B.line, 2.4) + L(42, 56, 114, 56, B.line, 2.4);
      b += R(40, 66, 80, 34, { r: 3, f: '#f4f8ff', s: '#8fb0dc', sw: 1.2 }) + P('M44 90 C47 80 50 70 53 72 C55 75 50 88 55 88 C58 88 59 82 61 82 C63 82 62 88 65 88 C68 87 69 81 72 82 C74 84 72 88 75 87 M45 95 Q58 92 74 94', 'none', B.blue, 1.5) + T(78, 79, 'Digitally', { size: 7.5, w: 700, a: 'start', c: B.ink }) + T(78, 88, 'signed by', { size: 7.5, w: 700, a: 'start', c: B.ink }) + T(78, 97, 'Ana Cruz', { size: 7.5, w: 800, a: 'start', c: B.blueInk });
      alt = 'A PDF page with a green bar at the top that says signed, valid, and a signature box at the bottom that says digitally signed by Ana Cruz.'; break;
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
      b += padlock2(40, 52, false, B.amber, 0.7) + say(82, 16, 76, 'Pay me, or', 90, 48, '#fdeee9', B.red, 10.5) + say(82, 50, 76, 'I\'ll share', 90, 82, '#fdeee9', B.red, 10.5) + hacker2(134, 78, 0.4);
      alt = 'A locked private photo on a phone and threatening messages: pay me or I will share it.'; break;
    case 'doxx':
      b = blob(80, 62, 70, 50, '#e3ecf8') + ground(80, 112, 62) + R(18, 14, 124, 88, { r: 6, f: '#d8b48a', sw: 2 }) + R(26, 22, 78, 66, { r: 3, f: '#fff', sw: 1.6 }) + C(65, 21, 3.4, B.red, B.ink, 1.2);
      b += C(42, 40, 8, B.skin, B.ink, 1.4) + T(56, 43, 'Bea', { size: 9.5, a: 'start', c: B.ink }) + T(31, 64, 'Home: Purok 3', { size: 8, w: 700, a: 'start', c: B.red }) + T(31, 78, 'Cell: 0917…', { size: 8, w: 700, a: 'start', c: B.red });
      b += R(108, 28, 28, 22, { r: 2, f: '#fff4c7', sw: 1.4 }) + C(122, 26, 3, B.blue, B.ink, 1) + T(122, 44, 'LOOK', { size: 7.5, c: B.red }) + R(108, 60, 28, 26, { r: 2, f: '#fff', sw: 1.4 }) + C(122, 58, 3, B.amber, B.ink, 1) + P('M112 80 L118 72 L124 78 L130 70', 'none', B.blue, 1.6);
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
    b = blob(110, 62, 86, 48, '#dcefe2') + ground(90, 112, 40) + phone2(64, 10, 56, 102, (x, y, w, h) => [0, 1, 2, 3, 4, 5].map((k) => R(x + 5 + (k % 3) * (w - 10) / 3, y + 6 + Math.floor(k / 3) * 22, (w - 10) / 3 - 4, 16, { r: 4, f: ['#8fb0dc', '#9fd3ae', '#f2c48a', '#c9b3e6', '#f8c9c2', '#e8b94a'][k], s: 'none', sw: 0 })).join('') + R(x + 5, y + 54, 2 * (w - 10) / 3 - 4, 16, { r: 4, f: '#c2453b', s: B.ink, sw: 1.2 }) + T(x + 5 + (2 * (w - 10) / 3 - 4) / 2, y + 66, 'APK', { size: 8, c: '#fff' }));
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
    b = blob(110, 62, 86, 48, '#dcefe2') + ground(110, 110, 80) + R(18, 8, 92, 78, { r: 6, f: '#fff', sw: 2 }) + P('M28 74 L48 64 L64 68 L84 40 L100 18', 'none', B.green, 3) + ARROW(92, 28, 100, 18, B.green, 3);
    b += T(64, 104, 'Double in 7 days!', { size: 11, c: B.green }) + coin(136, 44, 12) + coin(154, 60, 12) + coin(172, 44, 12) + T(156, 96, 'guaranteed?', { size: 12, c: B.red });
    alt = 'A chart that only goes up and coins: an offer to double your money in 7 days, "guaranteed".';
  } else if (kind === 'love') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 80) + phone2(20, 12, 60, 100, (x, y, w, h) => C(x + w / 2, y + 22, 13, '#f2c48a', 'none', 0) + T(x + w / 2, y + 48, '"Alex"', { size: 9, c: B.ink }) + R(x + 6, y + 56, w - 12, 10, { r: 4, f: '#f8d6de', s: 'none', sw: 0 }) + R(x + 6, y + 70, w - 18, 10, { r: 4, f: '#f8d6de', s: 'none', sw: 0 }));
    b += heart(104, 30, 1.1) + heart(122, 18, 0.7) + say(90, 46, 124, 'Need ₱20k for a visa', 98, 78, '#fdeee9', B.red, 11) + hacker2(186, 82, 0.34);
    alt = 'A sweet online "Alex" with hearts asks for money for a visa; the real person behind it is a stranger.';
  } else if (kind === 'mule') {
    b = blob(110, 62, 86, 48, '#fbe7da') + ground(110, 110, 80) + person2(40, 26, 0.84, { shirt: B.green }) + phone2(62, 48, 46, 66, walletScreen('₱90k', B.red));
    b += say(102, 10, 114, 'Rent your account?', 112, 44, '#fff', B.ink, 11) + T(160, 66, '₱1,000/week', { size: 11.5, c: B.green }) + hacker2(160, 72, 0.42) + P('M110 84 L140 86', 'none', B.red, 2, ' stroke-dasharray="4 4"') + ARROW(130, 86, 142, 86, B.red, 2);
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
// botnetPic: redrawn in chat 57, see the story pictures block at the end of this file.

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
      g += T(270, y + 30, 'real requests: pages load', { size: 12.5, w: 700, c: '#2f6b45' });
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
  return svgWrap(480, 340, 'Top: on a normal day, two students send requests and the server answers. Bottom: in a denial of service attack, many infected devices flood the server with fake requests, so a real student\'s page keeps loading.', b);
}

/** The 3-2-1 backup rule. 480 x 250. */
// backupPic: redrawn in chat 57, see the end of this file.

/** A clean speech bubble drawn as ONE path, so the tail always joins the body (chat 58). Tail on the left side, pointing left at (x - 11, ty). */
const sayL = (x, y, w, lines, c = B.red, f = '#fdeee9', size = 12, ty = null) => {
  const h = 14 + lines.length * (size + 5), r = 10, t = ty ?? y + h / 2;
  const d = `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${t + 7} L${x - 11} ${t} L${x} ${t - 7} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
  return `<path d="${d}" fill="${f}" stroke="${B.ink}" stroke-width="1.8" stroke-linejoin="round"/>` + lines.map((ln, k) => T(x + w / 2, y + 7 + (k + 1) * (size + 5) - 4, ln, { size, c })).join('');
};

/** The phishing family (restyled chat 58, round 6, to match backupPic): equal soft cards; in every card the name, the channel, the device
 *  (same size, same centre line, soft shadow) and one caption sit on the same baselines. 480 x 632. */
export function phishFamilyPic() {
  let b = '';
  const CW = 228, CH = 180, X = [6, 246];
  const card = (x, y, w, name, sub, cap) => R(x, y, w, CH, { r: 16, f: '#f3f6fa', s: 'none', sw: 0 })
    + T(x + w / 2, y + 30, name, { size: 15, c: B.blueInk }) + T(x + w / 2, y + 48, sub, { size: 11.5, w: 700, c: B.soft })
    + T(x + w / 2, y + 166, cap, { size: 11, w: 700, c: '#9c2f28' });
  const head = (y, t) => T(240, y, t, { size: 12.5, c: B.ink });
  // screens
  const mailScr = (x, y, w, h) => R(x, y, w, 11, { r: 0, f: '#dfe3ea', s: 'none', sw: 0 }) + T(x + 5, y + 8.5, 'Inbox', { size: 7.5, a: 'start', c: B.soft })
    + T(x + 5, y + 22, 'From: PeraBank', { size: 8, a: 'start', c: B.ink }) + L(x + 5, y + 28, x + w - 18, y + 28, '#c9d2df', 2.4)
    + R(x + w / 2 - 25, y + h - 16, 50, 12, { r: 3, f: B.red, s: 'none', sw: 0 }) + T(x + w / 2, y + h - 7.2, 'Verify now', { size: 7.5, c: '#fff' });
  const smsScr = (x, y, w, h) => T(x + w / 2, y + 8, 'PeraBank', { size: 7.5, c: B.ink }) + L(x + 3, y + 13, x + w - 3, y + 13, '#c9d2df', 1)
    + R(x + 4, y + 19, w - 12, 36, { r: 6, f: '#dfe3ea', s: 'none', sw: 0 }) + L(x + 9, y + 27, x + w - 15, y + 27, '#9aa6b8', 2) + L(x + 9, y + 34, x + w - 19, y + 34, '#9aa6b8', 2)
    + T(x + 9, y + 48, 'tap link', { size: 7, a: 'start', c: B.blue }) + L(x + 9, y + 50, x + 34, y + 50, B.blue, 1);
  const callScr = (x, y, w, h) => C(x + w / 2, y + 15, 10, '#5d6b85', 'none', 0) + C(x + w / 2, y + 12, 3.6, '#8a97b0', 'none', 0) + P(`M${x + w / 2 - 6} ${y + 23} Q${x + w / 2} ${y + 16} ${x + w / 2 + 6} ${y + 23}`, '#8a97b0', 'none', 0)
    + T(x + w / 2, y + 37, 'PeraBank', { size: 8, c: '#fff' }) + T(x + w / 2, y + 47, 'calling…', { size: 6.5, w: 600, c: '#c9d3e3' })
    + C(x + 11, y + h - 9, 6, '#d4422f', 'none', 0) + C(x + w - 11, y + h - 9, 6, '#3f9a5f', 'none', 0);
  const y1 = 32, y2 = 222, band = 142; // band = the shared ground line (device bottoms) inside each card
  b += head(20, 'Four types named after HOW the fake message reaches you');
  b += card(X[0], y1, CW, 'phishing', 'by email', '“Verify your account now.”') + card(X[1], y1, CW, 'smishing', 'by text message (SMS)', '“Account locked! Tap the link.”');
  b += card(X[0], y2, CW, 'vishing', 'by voice call', '“Please read me the OTP.”') + card(X[1], y2, CW, 'quishing', 'by QR code', 'A fake sticker covers the real code.');
  const cx = (k) => X[k] + CW / 2;
  // 1 laptop
  b += ground(cx(0), y1 + band, 60) + laptop2(cx(0) - 50, y1 + 62, 100, mailScr);
  // 2 phone
  b += ground(cx(1), y1 + band, 36) + phone2(cx(1) - 25, y1 + 58, 50, 84, smsScr);
  // 3 phone (call), with two small sound waves
  b += ground(cx(0), y2 + band, 36) + phone2(cx(0) - 25, y2 + 58, 50, 84, callScr, '#2f3d55') + P(`M${cx(0) + 34} ${y2 + 90} q5 6 0 12 M${cx(0) + 41} ${y2 + 85} q9 11 0 22`, 'none', B.blueMid, 2);
  // 4 parking sign with a sticker stuck over the code (peeling corner)
  { const sx = cx(1) - 40, sy = y2 + 58;
    b += ground(cx(1), y2 + band, 46) + R(sx, sy, 80, 84, { r: 5, f: '#fff4c7', sw: 1.8 }) + T(cx(1), sy + 15, 'PARKING', { size: 9.5, c: B.ink }) + T(cx(1), sy + 77, 'Pay here', { size: 8, w: 700, c: B.soft });
    b += `<g transform="rotate(-4 ${cx(1)} ${sy + 43})">` + R(cx(1) - 25, sy + 21, 50, 46, { r: 2, f: '#fff', s: '#c9b98f', sw: 1.2 }) + qr(cx(1) - 18, sy + 25, 36) + P(`M${cx(1) + 25} ${sy + 55} L${cx(1) + 13} ${sy + 67} L${cx(1) + 25} ${sy + 67} Z`, '#e8dcc0', '#c9b98f', 1) + '</g>'; }
  // spear phishing
  const y3 = 446, W3 = 468;
  b += head(y3 - 12, 'One type named after WHO it targets');
  b += card(6, y3, W3, 'spear phishing', 'a message made for one person or group', 'The email uses her real name, her job, and her boss’s name.');
  b += ground(92, y3 + band, 62) + R(30, y3 + 66, 124, 72, { r: 8, f: '#fff', sw: 1.8 }) + T(92, y3 + 80, 'public profile', { size: 8.5, w: 700, c: B.soft }) + L(36, y3 + 85, 148, y3 + 85, '#e4e8ee', 1);
  b += C(54, y3 + 109, 13, B.blueWash, B.ink, 1.6) + `<clipPath id="spAva"><circle cx="54" cy="${y3 + 109}" r="12"/></clipPath><g clip-path="url(#spAva)">` + girl(54, y3 + 98, 0.44, { shirt: B.green }) + '</g>';
  b += T(74, y3 + 104, 'Ana Cruz', { size: 10, a: 'start', c: B.ink }) + T(74, y3 + 116, 'Cashier, Mati School', { size: 7.5, w: 700, a: 'start', c: B.soft }) + T(74, y3 + 127, 'Boss: Dir. Reyes', { size: 7.5, w: 700, a: 'start', c: B.soft });
  b += ARROW(164, y3 + 102, 186, y3 + 102, '#8a94a6', 2);
  b += ground(240, y3 + band, 60) + laptop2(190, y3 + 62, 100, (x, y, w, h) => T(x + 5, y + 11, 'From: Dir. Reyes', { size: 8, a: 'start', c: B.ink }) + L(x + 4, y + 15, x + w - 4, y + 15, '#c9d2df', 1) + T(x + 5, y + 27, 'Hi Ana, please pay', { size: 7.5, w: 700, a: 'start', c: B.ink }) + T(x + 5, y + 37, 'this supplier today.', { size: 7.5, w: 700, a: 'start', c: B.ink }));
  b += ARROW(298, y3 + 102, 320, y3 + 102, '#8a94a6', 2);
  b += ground(372, y3 + band, 32) + girl(372, y3 + 66, 0.9, { shirt: B.green });
  return svgWrap(480, 632, 'The phishing family. Four types are named after how the fake message reaches you: phishing by email ("Verify your account now"), smishing by text message ("Account locked! Tap the link"), vishing by voice call ("Please read me the OTP"), and quishing by a fake QR code sticker that covers the real code on a parking sign. Spear phishing is named after who it targets: the scammer reads Ana\'s public profile, then sends her an email that seems to come from her boss and uses her real name.', b);
}

/** What does this post give away? A social-media post with four numbered clues. 480 x 340. */
export function oversharePic() {
  // chat 59: realistic post card and a detailed house
  let b = blob(240, 170, 232, 160, '#f6f8fb');
  b += R(70, 10, 300, 320, { r: 16, f: '#fff', sw: 2 }) + avatar(98, 38, 14, B.hair) + T(120, 36, 'Bea Reyes', { size: 13, a: 'start', c: B.ink });
  b += P('M121 47 C121 43 128 43 128 47 C128 50 124.5 53 124.5 54 C124.5 53 121 50 121 47 Z', B.red, 'none', 0) + T(132, 53, 'Home, Purok 3, Dahican', { size: 11, w: 700, a: 'start', c: B.soft }) + T(352, 40, '···', { size: 14, w: 800, c: B.greyInk });
  b += R(84, 64, 272, 190, { r: 6, f: '#cfe3f3', s: 'none', sw: 0 }) + P('M84 214 L356 214 L356 254 L84 254 Z', '#d8e6c8', 'none', 0);
  b += '<ellipse cx="130" cy="86" rx="20" ry="7" fill="#fff" opacity="0.9"/><ellipse cx="148" cy="82" rx="14" ry="7" fill="#fff" opacity="0.9"/>';
  b += houseD(200, 76, 146);
  b += girl(150, 104, 1.1, { shirt: '#f4f6f9' });
  // school ID on a lanyard (chat 59: looks like a real ID card)
  b += P('M141 146 L148 152 M159 146 L152 152', 'none', '#1f4f8f', 2.6) + R(146, 150, 8, 5, { r: 1.5, f: '#b7bfcc', s: B.ink, sw: 0.9 });
  const ix = 135, iy = 154, iw = 30, ih = 41;
  b += R(ix, iy, iw, ih, { r: 3, f: '#fff', s: 'none', sw: 0 });
  b += `<path d="M${ix} ${iy + 12} L${ix} ${iy + 3} Q${ix} ${iy} ${ix + 3} ${iy} L${ix + iw - 3} ${iy} Q${ix + iw} ${iy} ${ix + iw} ${iy + 3} L${ix + iw} ${iy + 12} Z" fill="#1f4f8f"/>` + R(ix + 11.5, iy + 2, 7, 2.2, { r: 1.1, f: '#fff', s: 'none', sw: 0 }) + T(ix + iw / 2, iy + 10.5, 'DOrSU', { size: 5.8, w: 800, c: '#fff' });
  // ID photo: a small portrait (hair, face, shoulders)
  const px = ix + 3, py = iy + 15;
  b += R(px, py, 11, 13, { r: 1, f: '#dfe9f6', s: 'none', sw: 0 }) + `<path d="M${px + 1.5} ${py + 13} L${px + 1.5} ${py + 6} Q${px + 5.5} ${py + 0.5} ${px + 9.5} ${py + 6} L${px + 9.5} ${py + 13} Z" fill="${B.hair}"/>`;
  b += `<ellipse cx="${px + 5.5}" cy="${py + 6.6}" rx="2.6" ry="3.1" fill="${B.skin}"/>` + `<path d="M${px + 1.5} ${py + 13} Q${px + 5.5} ${py + 9.2} ${px + 9.5} ${py + 13} Z" fill="#f4f6f9" stroke="#9aa6b8" stroke-width="0.5"/>`;
  b += R(ix + 16, iy + 16, 11, 2, { r: 1, f: B.ink, s: 'none', sw: 0 }) + R(ix + 16, iy + 21, 9, 1.6, { r: 0.8, f: '#9aa6b8', s: 'none', sw: 0 }) + R(ix + 16, iy + 25, 10, 1.6, { r: 0.8, f: '#9aa6b8', s: 'none', sw: 0 });
  b += [0, 2, 3, 5, 7, 8, 10, 12, 13, 15, 17, 18, 20, 22].map((k) => `<rect x="${ix + 4 + k}" y="${iy + 30}" width="${k % 3 ? 0.8 : 1.3}" height="4.5" fill="${B.ink}"/>`).join('');
  b += `<path d="M${ix} ${iy + 36} L${ix + iw} ${iy + 36} L${ix + iw} ${iy + ih - 3} Q${ix + iw} ${iy + ih} ${ix + iw - 3} ${iy + ih} L${ix + 3} ${iy + ih} Q${ix} ${iy + ih} ${ix} ${iy + ih - 3} Z" fill="${B.amber}"/>`;
  b += R(ix, iy, iw, ih, { r: 3, f: 'none', s: B.ink, sw: 1.4 });
  b += T(84, 276, '"First day of class! So excited 😊"', { size: 12.5, w: 700, a: 'start', c: B.ink }) + T(84, 296, '#BSIT1A #DOrSU', { size: 12, w: 700, a: 'start', c: B.blue });
  const pin = (x, y, n) => C(x, y, 12, B.orange, B.ink, 2) + T(x, y + 5, String(n), { size: 13, c: '#fff' });
  b += pin(400, 50, 1) + pin(400, 182, 2) + pin(118, 176, 3) + pin(400, 288, 4);
  b += P('M388 50 L268 50', 'none', B.orange, 2) + P('M388 182 L332 184', 'none', B.orange, 2) + P('M130 176 L135 176', 'none', B.orange, 2) + P('M388 288 L190 294', 'none', B.orange, 2);
  return svgWrap(480, 340, 'A social media post by Bea with four numbered clues: 1, a location tag that says Home and names her purok; 2, her house number behind her; 3, her school ID on a lanyard; 4, a caption and hashtags that name her school and section.', b);
}

/** If you were scammed: four steps, in order. 480 x 236. */
// reportPic: redrawn in chat 57, see the end of this file.

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

/* =====================================================================
   Lesson 1 "What it really is" pictures (chat 56): what each safeguard looks like in real life.
   One detailed drawing per safeguard, 480 wide. Panels: soft tinted cards with a small caption.
   ===================================================================== */
import { key2 as key2R, fingerprint2 as fpR, server2 as serverR, car2 } from './it110-sec-pics.js';
// soft blocks, no outline (the card around the picture is the only frame). tone: n = neutral, hw = hardware blue, sw = software green (same as the tag chips)
const TONE = { n: '#f1f4f8', hw: '#e6eef9', sw: '#e3f1e8' };
const panel = (x, y, w, h, tone = 'n') => R(x, y, w, h, { r: 14, f: TONE[tone] ?? TONE.n, s: 'none', sw: 0 });
// small chip in the same colors as the page's tag chips
const tagChip = (cx, y, kind) => { const t = kind === 'hw' ? ['Hardware', '#d6e4f7', '#1c4479'] : ['Software', '#d2ebdc', '#2a6643']; return R(cx - 44, y, 88, 24, { r: 12, f: t[1], s: t[2], sw: 1.4 }) + T(cx, y + 16.5, t[0], { size: 12.5, w: 800, c: t[2] }); };
const cap = (x, y, txt, c = B.soft) => T(x, y, txt, { size: 13, w: 700, c });
const winBar = (x, y, w, title, f = '#dfe9f6') => R(x, y, w, 22, { r: 8, f, sw: 2 }) + `<rect x="${x + 2}" y="${y + 12}" width="${w - 4}" height="9" fill="${f}"/>` + [0, 1, 2].map((k) => C(x + 12 + k * 10, y + 11, 3, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('') + (title ? T(x + w / 2 + 12, y + 15.5, title, { size: 11, w: 700, c: B.blueInk }) : '');
const pill = (x, y, w, txt, f, c) => R(x, y, w, 22, { r: 11, f, s: c, sw: 1.4 }) + T(x + w / 2, y + 15.5, txt, { size: 11.5, w: 700, c });
// a pointing hand (chat 56, redrawn): index finger straight up, the other fingers curled into the palm, thumb tucked on the
// left. One smooth outline, like a real hand. Fingertip at (x, y); about 80*s tall.
const fingerTap = (x, y, s = 1) => {
  const S = (v) => (v * s).toFixed(1);
  let g = `<g transform="translate(${x} ${y})">`;
  g += `<path d="M${S(-8)} ${S(8)} Q${S(-8)} 0 0 0 Q${S(8)} 0 ${S(8)} ${S(8)} L${S(8)} ${S(38)} Q${S(10)} ${S(34)} ${S(15)} ${S(34)} Q${S(20)} ${S(34)} ${S(20.5)} ${S(39)} Q${S(23)} ${S(36)} ${S(27)} ${S(37.5)} Q${S(30.5)} ${S(39)} ${S(30)} ${S(44)} Q${S(33)} ${S(44)} ${S(33.5)} ${S(49)} L${S(33.5)} ${S(60)} Q${S(33)} ${S(78)} ${S(16)} ${S(80)} L${S(2)} ${S(80)} Q${S(-10)} ${S(79)} ${S(-12)} ${S(67)} L${S(-12)} ${S(58)} Q${S(-20)} ${S(55)} ${S(-20.5)} ${S(48)} Q${S(-20)} ${S(42)} ${S(-14.5)} ${S(42.5)} Q${S(-10)} ${S(43.5)} ${S(-8)} ${S(48)} Z" fill="${B.skin}" stroke="${B.ink}" stroke-width="2" stroke-linejoin="round"/>`;
  g += `<path d="M${S(-4.5)} ${S(3)} Q0 ${S(1.2)} ${S(4.5)} ${S(3)} L${S(4.5)} ${S(10)} Q0 ${S(12)} ${S(-4.5)} ${S(10)} Z" fill="#f6dcc8" stroke="rgba(24,35,58,0.35)" stroke-width="1.1"/>`;
  g += `<path d="M${S(-4)} ${S(24)} Q0 ${S(25.5)} ${S(4)} ${S(24)} M${S(10)} ${S(45)} Q${S(14)} ${S(47)} ${S(19)} ${S(45)} M${S(21)} ${S(49)} Q${S(25)} ${S(51)} ${S(29)} ${S(49)} M${S(-12)} ${S(58)} Q${S(-9)} ${S(56)} ${S(-6)} ${S(52)}" fill="none" stroke="rgba(24,35,58,0.4)" stroke-width="1.3" stroke-linecap="round"/>`;
  return g + '</g>';
};
// a tap ripple (two rings) around a point
const tapRing = (x, y, r = 12, c = B.green) => C(x, y, r, 'none', c, 2) + `<circle cx="${x}" cy="${y}" r="${r + 7}" fill="none" stroke="${c}" stroke-width="1.6" opacity="0.45"/>`;
const rack = (x, y, w, h) => {
  let g = R(x, y, w, h, { r: 6, f: '#2b3446', sw: 2 }) + R(x + 6, y + 6, w - 12, h - 12, { r: 3, f: '#1d2433', s: 'none', sw: 0 });
  g += L(x + 10, y + 8, x + 10, y + h - 8, '#56607a', 1.2) + L(x + w - 10, y + 8, x + w - 10, y + h - 8, '#56607a', 1.2);
  return g;
};
// a rack-mounted box: rows of ports and LEDs. hot = highlighted (the box we talk about)
const rackUnit = (x, y, w, h, hot = false, txt = '') => {
  let g = R(x, y, w, h, { r: 3, f: hot ? '#e27b3e' : '#56607a', s: B.ink, sw: hot ? 2 : 1.4 }) + R(x + 2, y + 2, w - 4, 3, { r: 1.5, f: 'rgba(255,255,255,0.3)', s: 'none', sw: 0 });
  const n = Math.floor((w - (txt ? 70 : 20)) / 9);
  for (let k = 0; k < n; k++) g += R(x + w - 12 - k * 9, y + h / 2 - 3, 6, 6, { r: 1, f: '#1d2433', s: 'none', sw: 0 });
  g += `<circle cx="${x + 8}" cy="${y + h / 2}" r="2" fill="${hot ? '#b9f5c8' : B.green}"/>`;
  if (txt) g += T(x + 14, y + h / 2 + 4, txt, { size: 10.5, w: 800, a: 'start', c: hot ? '#fff' : '#d9dee6' });
  return g;
};

/** "What it really is" drawings. kind: acl, bio, passkey, firewall, ips, encrypt, vpn, https. 480 wide. */
export function realPic(kind) {
  let b = '', alt = '', H = 250;
  if (kind === 'acl') {
    // left: office door with a card reader
    b = panel(8, 8, 226, 234) + panel(246, 8, 226, 234);
    b += R(30, 36, 88, 174, { r: 4, f: '#c9a27a', sw: 2 }) + R(38, 44, 72, 66, { r: 3, f: '#d8b590', s: '#8a6a48', sw: 1.4 }) + R(38, 118, 72, 84, { r: 3, f: '#d8b590', s: '#8a6a48', sw: 1.4 });
    b += R(42, 54, 64, 20, { r: 3, f: '#fff', s: B.ink, sw: 1.4 }) + T(74, 67.5, 'STAFF ONLY', { size: 8.5, c: B.red }) + C(104, 130, 4, '#8a94a6', B.ink, 1.6) + L(20, 210, 222, 210, B.ink, 2);
    // reader on the wall, card held flat against it, signal arcs
    b += R(148, 96, 36, 56, { r: 6, f: '#2b3446', sw: 2 }) + R(154, 104, 24, 24, { r: 4, f: '#3b4659', s: '#56607a', sw: 1 }) + C(166, 140, 4, B.green, B.ink, 1.2);
    b += R(156, 84, 50, 32, { r: 5, f: '#fff', sw: 2 }) + R(156, 84, 50, 9, { r: 5, f: B.blue, sw: 2 }) + `<rect x="158" y="89" width="46" height="5" fill="${B.blue}"/>` + C(169, 104, 6, B.skin, B.ink, 1.2) + L(180, 101, 198, 101, '#b7c7e0', 2.2) + L(180, 108, 194, 108, '#b7c7e0', 2.2);
    b += [8, 15].map((r) => P(`M${212} ${100 - r} A${r} ${r} 0 0 1 ${212} ${100 + r}`, 'none', B.green, 2.2)).join('');
    b += label(178, 52, 'tap your card', '#2f6b45', '#fff', 11);
    b += cap(121, 234, 'ID card reader at a door');
    // right: login screen
    b += laptop2(282, 62, 156, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#eef3fb', s: 'none', sw: 0 }) + T(x + w / 2, y + 16, 'School portal', { size: 11, w: 800, c: B.blueInk })
      + R(x + 16, y + 24, w - 32, 16, { r: 4, f: '#fff', s: B.line, sw: 1.2 }) + T(x + 22, y + 35.5, '2025-01234', { size: 9.5, w: 700, a: 'start', c: B.ink, mono: true })
      + R(x + 16, y + 46, w - 32, 16, { r: 4, f: '#fff', s: B.line, sw: 1.2 }) + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => C(x + 25 + k * 9, y + 54, 2.4, B.ink, 'none', 0)).join('')
      + R(x + w / 2 - 26, y + 68, 52, 15, { r: 7.5, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 78.5, 'Log in', { size: 9.5, w: 800, c: '#fff' }));
    b += cap(359, 212, 'Login screen:', B.ink) + cap(359, 230, 'username + password');
    b += C(240, 150, 15, '#fff', B.ink, 1.8) + T(240, 154.5, 'OR', { size: 11.5, w: 800, c: B.ink });
    alt = 'Two real access control systems: an ID card reader on a staff-only office door, where you tap your card, and a school portal login screen asking for a username and password.';
  } else if (kind === 'bio') {
    b = panel(8, 8, 226, 234) + panel(246, 8, 226, 234);
    // left: phone with an in-screen fingerprint spot and a finger
    b += phone2(78, 20, 86, 150, (x, y, w, h) => R(x, y, w, h, { r: 8, f: '#1f2a44', s: 'none', sw: 0 }) + T(x + w / 2, y + 30, '9:41', { size: 22, w: 700, c: '#fff' }) + T(x + w / 2, y + 46, 'Tuesday', { size: 10, w: 600, c: '#c9d5e6' }) + C(x + w / 2, y + h - 34, 17, 'rgba(143,176,220,0.25)', '#8fb0dc', 1.4), '#1f2a44');
    b += `<g opacity="0.95">${fpR(121, 140, 0.6, '#8fb0dc')}</g>` + fingerTap(121, 142, 0.95);
    b += cap(121, 234, 'Fingerprint sensor on a phone');
    // right: laptop with a face scan frame
    b += laptop2(282, 44, 156, (x, y, w, h) => {
      let g = R(x, y, w, h, { r: 0, f: '#eef3fb', s: 'none', sw: 0 });
      const cx = x + w / 2, cy = y + h / 2 + 2;
      g += `<ellipse cx="${cx}" cy="${cy + 4}" rx="17" ry="21" fill="${B.skin}" stroke="${B.ink}" stroke-width="1.6"/>` + P(`M${cx - 17} ${cy} Q${cx - 18} ${cy - 20} ${cx} ${cy - 18} Q${cx + 18} ${cy - 20} ${cx + 17} ${cy} Q${cx + 8} ${cy - 10} ${cx - 17} ${cy} Z`, B.hair, B.ink, 1.4) + C(cx - 6, cy + 4, 1.8, B.ink, 'none', 0) + C(cx + 6, cy + 4, 1.8, B.ink, 'none', 0) + P(`M${cx - 4} ${cy + 13} Q${cx} ${cy + 16} ${cx + 4} ${cy + 13}`, 'none', B.ink, 1.4);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => { const px = cx + dx * 30, py = cy + 4 + dy * 32; g += P(`M${px} ${py - dy * 10} L${px} ${py} L${px - dx * 10} ${py}`, 'none', B.green, 3); });
      return g;
    });
    b += C(360, 47, 3, '#5fae6b', 'none', 0) + pill(306, 152, 108, 'Face recognized', B.greenWash, B.green);
    b += cap(359, 234, 'Face scan on a laptop camera');
    alt = 'Two real biometric readers: a finger touching the fingerprint spot on a phone screen, and a laptop camera recognizing a face, with green corner marks and the words Face recognized.';
  } else if (kind === 'passkey') {
    b = panel(8, 8, 464, 234);
    // laptop with website waiting
    b += laptop2(34, 40, 176, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#fff', s: 'none', sw: 0 }) + R(x + 6, y + 5, w - 12, 13, { r: 6.5, f: '#f1f3f6', s: '#b7bfcc', sw: 1 }) + T(x + 14, y + 14.5, 'perabank.com.ph', { size: 8.5, w: 700, a: 'start', c: B.ink })
      + T(x + w / 2, y + 36, 'PeraBank', { size: 12, w: 800, c: B.blueInk }) + R(x + 24, y + 46, w - 48, 20, { r: 10, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 59.5, 'Sign in with a passkey', { size: 9.5, w: 800, c: '#fff' })
      + T(x + w / 2, y + 82, 'Check your phone...', { size: 9, w: 700, c: B.soft }));
    b += P('M218 96 Q246 70 274 92', 'none', B.blue, 2.4, ' stroke-dasharray="5 4"') + ARROW(266, 86, 276, 94, B.blue, 2.4);
    // phone with the prompt
    b += phone2(284, 16, 124, 184, (x, y, w, h) => {
      let g = R(x, y, w, h, { r: 10, f: '#dfe6f0', s: 'none', sw: 0 });
      g += R(x + 6, y + 20, w - 12, 144, { r: 12, f: '#fff', s: '#c9d2df', sw: 1.2 });
      g += key2R(x + w / 2 - 16, y + 38, 0.62, B.amber);
      g += T(x + w / 2, y + 66, 'Sign in to', { size: 10.5, w: 700, c: B.ink }) + T(x + w / 2, y + 81, 'perabank.com.ph', { size: 10.5, w: 800, c: B.blueInk }) + T(x + w / 2, y + 96, 'with your passkey?', { size: 10.5, w: 700, c: B.ink });
      g += `<g>${fpR(x + w / 2, y + 130, 0.62, B.blue)}</g>`;
      return g;
    });
    b += fingerTap(346, 154, 0.66);
    b += label(122, 206, '1. the website asks', B.blueInk, '#fff', 12) + label(346, 230, '2. your phone answers', B.blueInk, '#fff', 12);
    b += spark(430, 40, 1) + spark(256, 140, 0.8, B.blueMid);
    alt = 'A passkey login: on a laptop, the PeraBank website at perabank.com.ph shows Sign in with a passkey. The phone pops up a box asking Sign in to perabank.com.ph with your passkey, and the user touches the fingerprint sensor. Nothing is typed.';
    H = 250;
  } else if (kind === 'firewall') {
    const pw = 148;
    b = panel(8, 8, pw, 234, 'hw') + panel(166, 8, pw, 234, 'hw') + panel(324, 8, pw, 234, 'sw');
    // 1 company: firewall box in a rack
    b += rack(34, 26, 96, 140) + rackUnit(44, 38, 76, 18) + rackUnit(44, 62, 76, 22, true, 'FIREWALL') + rackUnit(44, 90, 76, 18) + rackUnit(44, 114, 76, 18) + rackUnit(44, 138, 76, 18);
    b += T(82, 214, 'a box in a', { size: 12.5, w: 700, c: B.soft }) + T(82, 230, 'company server room', { size: 12.5, w: 700, c: B.soft });
    // 2 home: router
    b += router2(196, 104, 88) + R(214, 136, 52, 8, { r: 3, f: '#c8ced8', sw: 1.4 }) + wifi2(240, 86, AIR, 0.95) + shield2(270, 44, 0.42, '#fbe2d2');
    b += T(240, 214, 'built into every', { size: 12.5, w: 700, c: B.soft }) + T(240, 230, 'home router', { size: 12.5, w: 700, c: B.soft });
    // 3 software: a settings window
    b += R(338, 30, 120, 132, { r: 8, f: '#fff', sw: 2 }) + winBar(338, 30, 120, '') + T(398, 70, 'Firewall', { size: 13, w: 800, c: B.ink });
    b += shield2(398, 78, 0.38, B.greenWash) + R(368, 118, 60, 22, { r: 11, f: B.green, s: B.ink, sw: 1.6 }) + C(416, 129, 8, '#fff', B.ink, 1.4) + T(386, 133, 'ON', { size: 11, w: 800, c: '#fff' });
    b += T(398, 154, 'Private network', { size: 9.5, w: 700, c: B.soft });
    b += tagChip(398, 174, 'sw') + T(398, 214, 'in Windows', { size: 12.5, w: 700, c: B.soft }) + T(398, 230, 'and macOS', { size: 12.5, w: 700, c: B.soft });
    b += tagChip(82, 174, 'hw') + tagChip(240, 174, 'hw');
    alt = 'Three real firewalls: a firewall box in a company server rack, with cables in and out (hardware); a home router, which has a simple firewall built in (hardware); and a Firewall settings window switched ON in Windows or macOS (software).';
  } else if (kind === 'ips') {
    // chat 56 redraw: the two common setups on top, a realistic security dashboard below.
    H = 384;
    const unit = (x, y, w, txt, hot) => R(x, y, w, 22, { r: 3, f: hot ? '#e27b3e' : '#56607a', s: B.ink, sw: 1.6 }) + R(x + 2, y + 2, w - 4, 3, { r: 1.5, f: 'rgba(255,255,255,0.3)', s: 'none', sw: 0 }) + `<circle cx="${x + 8}" cy="${y + 11}" r="2" fill="${hot ? '#b9f5c8' : B.green}"/>` + T(x + 15, y + 15, txt, { size: 10, w: 800, a: 'start', c: '#fff' }) + [0, 1, 2, 3].slice(0, w > 120 ? 4 : 2).map((k) => R(x + w - 12 - k * 8, y + 8, 5, 6, { r: 1, f: '#1d2433', s: 'none', sw: 0 })).join('');
    b = panel(8, 8, 228, 112) + panel(244, 8, 228, 112);
    b += T(122, 28, 'All in one box', { size: 12.5, w: 800, c: B.ink }) + unit(40, 46, 164, 'FIREWALL + IPS', true) + T(122, 92, 'a "next-generation firewall"', { size: 11, w: 700, c: B.soft }) + T(122, 107, 'does both jobs', { size: 11, w: 700, c: B.soft });
    b += T(358, 28, 'Two separate boxes', { size: 12.5, w: 800, c: B.ink }) + unit(262, 46, 92, 'FIREWALL', false) + ARROW(356, 57, 370, 57, B.ink, 2) + unit(372, 46, 88, 'IPS', true) + T(358, 92, 'the IPS sits right behind', { size: 11, w: 700, c: B.soft }) + T(358, 107, 'the firewall', { size: 11, w: 700, c: B.soft });
    // dashboard on a wide monitor
    const mx = 14, my = 132, mw = 392, mh = 200;
    b += R(mx, my, mw, mh, { r: 8, f: '#2b3446', sw: 2 }) + R(mx + 6, my + 6, mw - 12, mh - 12, { r: 4, f: '#f7f9fc', s: 'none', sw: 0 });
    const sx = mx + 6, sy = my + 6, sw = mw - 12;
    b += R(sx, sy, sw, 18, { r: 0, f: '#1f2a44', s: 'none', sw: 0 }) + T(sx + 8, sy + 12.5, 'Threat dashboard', { size: 9.5, w: 800, a: 'start', c: '#fff' }) + T(sx + sw - 8, sy + 12.5, 'Last 24 hours', { size: 8.5, w: 700, a: 'end', c: '#b7c7e0' });
    // three number tiles
    [['Blocked today', '1,284', B.green], ['Alerts', '37', '#c98a1c'], ['Critical', '3', B.red]].forEach(([l, v, c], i) => { const tx = sx + 8 + i * 62; b += R(tx, sy + 24, 56, 34, { r: 4, f: '#fff', s: '#d3dae5', sw: 1 }) + T(tx + 6, sy + 35, l, { size: 7, w: 700, a: 'start', c: B.soft }) + T(tx + 6, sy + 52, v, { size: 13, w: 800, a: 'start', c }); });
    // attacks-per-hour chart
    const cx0 = sx + 200, cy0 = sy + 24, cw = 170, ch = 34, pts = [6, 8, 5, 9, 7, 12, 10, 28, 14, 9, 11, 8];
    b += R(cx0, cy0, cw, ch, { r: 4, f: '#fff', s: '#d3dae5', sw: 1 }) + T(cx0 + 6, cy0 + 10, 'Attacks per hour', { size: 7, w: 700, a: 'start', c: B.soft });
    b += P('M' + pts.map((v, i) => `${(cx0 + 8 + i * (cw - 16) / (pts.length - 1)).toFixed(1)} ${(cy0 + ch - 4 - v * 0.75).toFixed(1)}`).join(' L'), 'none', B.red, 1.6);
    // event table
    const ty = sy + 66, cols = [8, 46, 118, 258];
    b += R(sx + 6, ty, sw - 12, 14, { r: 2, f: '#e3e8f0', s: 'none', sw: 0 }) + ['Time', 'From', 'What happened', 'Action'].map((h, i) => T(sx + cols[i] + 4, ty + 10, h, { size: 7.5, w: 800, a: 'start', c: B.ink })).join('');
    const rows = [['14:02', '203.0.113.45', '200 login tries on one account', 'BLOCKED', B.red], ['14:00', '198.51.100.7', 'Scan for open doors (ports)', 'BLOCKED', B.red], ['13:57', '192.0.2.88', 'Known attack on old router bug', 'BLOCKED', B.red], ['13:55', '10.0.4.21', 'Staff PC: big upload at night', 'ALERT', '#c98a1c'], ['13:51', '198.51.100.23', 'Normal web traffic', 'ALLOWED', B.green]];
    rows.forEach((r, k) => { const yy = ty + 16 + k * 19; if (k % 2) b += R(sx + 6, yy, sw - 12, 19, { r: 0, f: '#eef2f7', s: 'none', sw: 0 });
      b += T(sx + cols[0] + 4, yy + 12.5, r[0], { size: 7.5, w: 700, a: 'start', c: B.soft, mono: true }) + T(sx + cols[1] + 4, yy + 12.5, r[1], { size: 7.5, w: 700, a: 'start', c: B.soft, mono: true }) + T(sx + cols[2] + 4, yy + 12.5, r[2], { size: 8, w: 700, a: 'start', c: B.ink });
      b += R(sx + cols[3], yy + 4, 52, 12, { r: 6, f: r[4], s: 'none', sw: 0 }) + T(sx + cols[3] + 26, yy + 13, r[3], { size: 7, w: 800, c: '#fff' }); });
    b += R(mx + mw / 2 - 12, my + mh, 24, 12, { r: 1, f: '#3b4659', sw: 1.6 }) + R(mx + mw / 2 - 50, my + mh + 11, 100, 7, { r: 3, f: '#9aa5b6', sw: 1.6 });
    // IT staff member at the desk
    b += person2(442, 236, 0.8, { shirt: B.green }) + R(412, 304, 60, 8, { r: 2, f: '#d9b98c', sw: 1.6 }) + T(442, 334, 'IT team', { size: 11.5, w: 700, c: B.soft });
    b += T(210, 376, 'Each line is one event the IPS saw, and what it did about it.', { size: 11.5, w: 700, c: B.soft });
    alt = 'Top: the two common IPS setups. All in one box: a next-generation firewall that does both jobs. Two separate boxes: a firewall, then a separate IPS right behind it. Bottom: a security dashboard watched by the IT team. Number tiles show 1,284 blocked today, 37 alerts, and 3 critical. A chart shows attacks per hour with one spike. An event list shows: 200 login tries on one account, blocked; a scan for open ports, blocked; a known attack on an old router bug, blocked; a staff PC making a big upload at night, alert; normal web traffic, allowed.';
  } else if (kind === 'encrypt') {
    b = panel(8, 8, 220, 234) + panel(238, 8, 234, 234);
    // chat app with E2EE note
    b += phone2(56, 18, 124, 196, (x, y, w, h) => {
      let g = R(x, y, w, h, { r: 10, f: '#f4f6f9', s: 'none', sw: 0 }) + R(x, y, w, 22, { r: 0, f: '#fff', s: 'none', sw: 0 }) + C(x + 14, y + 11, 6, '#9fd3ae', 'none', 0) + T(x + 26, y + 15, 'Ana', { size: 10.5, w: 800, a: 'start', c: B.ink });
      g += R(x + 8, y + 30, w - 16, 34, { r: 7, f: '#fff3c4', s: '#d9ad35', sw: 1 }) + padlock2(x + 13, y + 42, false, B.amber, 0.4) + T(x + 34, y + 44, 'End-to-end', { size: 10, w: 800, a: 'start', c: '#7a5a0c' }) + T(x + 34, y + 57, 'encrypted', { size: 10, w: 800, a: 'start', c: '#7a5a0c' });
      g += R(x + 8, y + 74, 62, 20, { r: 9, f: '#fff', s: B.line, sw: 1 }) + T(x + 14, y + 88, 'Kita tayo?', { size: 9, w: 700, a: 'start', c: B.ink });
      g += R(x + w - 74, y + 102, 66, 20, { r: 9, f: '#cfe0f6', s: 'none', sw: 0 }) + T(x + w - 68, y + 116, 'Sige, 5pm!', { size: 9, w: 700, a: 'start', c: B.ink });
      g += R(x + 6, y + h - 22, w - 12, 16, { r: 8, f: '#fff', s: B.line, sw: 1 });
      return g;
    });
    b += cap(118, 234, 'Turned on in chat apps');
    // nothing to install: three places already encrypted
    b += T(355, 36, 'Already built in:', { size: 13, w: 800, c: B.ink });
    const rows = [[60, 'wifi'], [118, 'https'], [176, 'phone']];
    rows.forEach(([y, k]) => {
      b += R(254, y, 202, 46, { r: 10, f: '#fff', s: '#d3dae5', sw: 1.4 });
      if (k === 'wifi') b += wifi2(280, y + 34, AIR, 0.72) + T(302, y + 20, 'Wi-Fi (WPA2/WPA3)', { size: 11.5, w: 800, a: 'start', c: B.ink }) + T(302, y + 36, 'phone to router', { size: 10.5, w: 600, a: 'start', c: B.soft });
      if (k === 'https') b += R(266, y + 14, 28, 18, { r: 9, f: '#f1f3f6', s: '#b7bfcc', sw: 1.2 }) + padlock2(273, y + 21, false, B.green, 0.42) + T(302, y + 20, 'HTTPS websites', { size: 11.5, w: 800, a: 'start', c: B.ink }) + T(302, y + 36, 'browser to website', { size: 10.5, w: 600, a: 'start', c: B.soft });
      if (k === 'phone') b += phone2(270, y + 6, 18, 34, null, '#1f2a44') + T(302, y + 20, 'Locked phones', { size: 11.5, w: 800, a: 'start', c: B.ink }) + T(302, y + 36, 'files on the device', { size: 10.5, w: 600, a: 'start', c: B.soft });
    });
    b += T(355, 236, 'nothing to install', { size: 12.5, w: 700, c: B.soft });
    alt = 'Encryption in real life: a chat app with the note Messages are end-to-end encrypted, and three places where encryption is already built in with nothing to install: Wi-Fi with WPA2 or WPA3, HTTPS websites, and locked phones.';
  } else if (kind === 'vpn') {
    // chat 56 redraw: a realistic VPN app (left) and a labeled path (right): you -> café Wi-Fi -> VPN server -> the Internet.
    H = 290;
    b = panel(8, 8, 182, 274) + panel(198, 8, 274, 274);
    b += phone2(30, 16, 138, 236, (x, y, w, h) => {
      let g = R(x, y, w, h, { r: 12, f: '#f7f9fc', s: 'none', sw: 0 });
      g += T(x + 10, y + 16, 'SafeLink VPN', { size: 11, w: 800, a: 'start', c: B.blueInk }) + C(x + w - 14, y + 12, 6, '#dfe9f6', 'none', 0) + T(x + w - 14, y + 15.5, '⚙', { size: 8, w: 700, c: B.soft });
      // big connect button
      const cx = x + w / 2, cy = y + 66;
      g += C(cx, cy, 36, '#e3f1e8', 'none', 0) + C(cx, cy, 27, B.green, B.ink, 1.6) + P(`M${cx} ${cy - 13} L${cx} ${cy - 2} M${cx - 9} ${cy - 8} A12 12 0 1 0 ${cx + 9} ${cy - 8}`, 'none', '#fff', 3);
      g += T(cx, y + 120, 'Connected', { size: 13, w: 800, c: B.green }) + T(cx, y + 134, '00:12:45', { size: 9.5, w: 700, c: B.soft, mono: true });
      // location row
      g += R(x + 8, y + 142, w - 16, 26, { r: 7, f: '#fff', s: B.line, sw: 1 }) + C(x + 21, y + 155, 6, '#e06c5a', 'none', 0) + `<rect x="${x + 15}" y="${y + 155}" width="12" height="6" fill="#fff"/>` + C(x + 21, y + 155, 6, 'none', B.ink, 0.8) + T(x + 32, y + 159, 'Singapore', { size: 9.5, w: 700, a: 'start', c: B.ink }) + T(x + w - 14, y + 159.5, '›', { size: 12, w: 700, c: B.soft });
      // what websites see + data
      g += T(x + 10, y + 184, 'Your IP address', { size: 8.5, w: 700, a: 'start', c: B.soft }) + T(x + w - 10, y + 184, 'hidden', { size: 8.5, w: 800, a: 'end', c: B.green });
      g += R(x + 18, y + h - 22, w - 36, 16, { r: 8, f: '#fff', s: B.line, sw: 1 }) + T(x + w / 2, y + h - 10.5, 'Disconnect', { size: 9, w: 700, c: B.soft });
      return g;
    });
    b += T(99, 272, 'a VPN app on a phone', { size: 11.5, w: 700, c: B.soft });
    // right: the path, left to right, every part labeled
    const ty = 104;
    b += T(335, 30, 'Where your data goes', { size: 12.5, w: 800, c: B.ink });
    b += phone2(208, ty - 24, 24, 44, screenLines()) + T(220, ty + 40, 'you', { size: 11, w: 700, c: B.ink });
    b += `<path d="M236 ${ty} L354 ${ty}" stroke="#8fb0dc" stroke-width="24" stroke-linecap="round" opacity="0.6"/>` + L(236, ty, 354, ty, B.blue, 2, ' stroke-dasharray="6 5"') + padlock2(284, ty - 6, false, HOT, 0.48);
    b += T(296, ty - 22, 'encrypted tunnel', { size: 11, w: 800, c: B.blueInk });
    b += serverR(360, ty - 28, 30, 52) + T(375, ty + 40, 'VPN server', { size: 11, w: 700, c: B.ink }) + T(375, ty + 53, '(VPN company)', { size: 9.5, w: 600, c: B.soft });
    b += ARROW(394, ty, 420, ty, B.ink, 2) + globe(440, ty, 15) + T(440, ty + 40, 'Internet', { size: 11, w: 700, c: B.ink }) + T(440, ty + 53, '(websites)', { size: 9.5, w: 600, c: B.soft });
    // the café Wi-Fi the tunnel passes through, with a stranger on it
    b += L(266, ty + 12, 266, ty + 62, '#9aa5b6', 1.6, ' stroke-dasharray="3 3"') + router2(236, ty + 70, 60) + T(266, ty + 112, 'café Wi-Fi', { size: 11, w: 700, c: B.ink });
    b += hacker2(336, ty + 80, 0.5) + bubble(356, ty + 74, 70, 24, 352, ty + 100) + T(391, ty + 90, '#%$&!?', { size: 10, w: 800, c: '#9c2f28', mono: true });
    b += T(336, ty + 140, 'a stranger on the café Wi-Fi', { size: 10, w: 700, c: '#9c2f28' }) + T(336, ty + 153, 'sees only scramble', { size: 10, w: 700, c: '#9c2f28' });
    alt = 'Left: a VPN app on a phone, called SafeLink VPN, with a big green button showing Connected for 00:12:45, the server location Singapore, your IP address hidden and a Disconnect button. Right, where your data goes: from you, through an encrypted tunnel that passes through the café Wi-Fi, to the VPN company\'s server, and from there to the Internet and websites. A stranger on the café Wi-Fi sees only scramble.';
  } else if (kind === 'https') {
    // chat 56: closer to a real Chrome window (2026): tab strip, back/forward/reload, address bar without "https://"
    // and with the "tune" (two-slider) icon that Chrome uses since 2023; tapping it opens the site-info box.
    H = 300;
    const tune = (x, y, c = B.soft) => L(x - 6, y - 3, x + 6, y - 3, c, 1.8) + L(x - 6, y + 3, x + 6, y + 3, c, 1.8) + C(x - 2, y - 3, 2.6, '#fff', c, 1.6) + C(x + 3, y + 3, 2.6, '#fff', c, 1.6);
    b = R(8, 8, 464, 284, { r: 12, f: '#fff', sw: 2 });
    // tab strip
    b += R(8, 8, 464, 34, { r: 12, f: '#dfe3ea', sw: 2 }) + `<rect x="10" y="30" width="460" height="11" fill="#dfe3ea"/>`;
    b += P('M20 42 L24 16 Q25 13 29 13 L178 13 Q182 13 183 16 L187 42 Z', '#fff', B.ink, 1.4) + C(38, 28, 6, B.blue, 'none', 0) + T(38, 31.5, 'P', { size: 8.5, w: 800, c: '#fff' }) + T(50, 32, 'PeraBank | Log in', { size: 11, w: 700, a: 'start', c: B.ink }) + T(172, 32, '×', { size: 12, w: 700, c: B.soft }) + T(200, 32, '+', { size: 15, w: 600, c: B.soft });
    // toolbar
    b += `<rect x="10" y="42" width="460" height="36" fill="#fff"/>` + L(10, 78, 470, 78, '#dfe3ea', 1.4);
    b += P('M30 60 L24 60 M24 60 L28 56 M24 60 L28 64', 'none', B.soft, 1.8) + P('M48 60 L54 60 M54 60 L50 56 M54 60 L50 64', 'none', '#b7bfcc', 1.8) + `<path d="M78 56 A5 5 0 1 0 79 62" fill="none" stroke="${B.soft}" stroke-width="1.8"/>` + P('M78 53 L79 57 L75 57', 'none', B.soft, 1.6);
    b += R(94, 47, 330, 26, { r: 13, f: '#eef1f5', s: 'none', sw: 0 }) + C(112, 60, 10, '#dfe9f6', 'none', 0) + tune(112, 60, B.ink);
    b += T(128, 64.5, 'perabank.com.ph', { size: 12.5, w: 700, a: 'start', c: B.ink }) + T(245, 64.5, '/login', { size: 12.5, w: 600, a: 'start', c: '#8a94a6' }) + T(408, 65, '☆', { size: 13, w: 600, c: B.soft });
    b += C(446, 60, 9, B.green, 'none', 0) + T(446, 64, 'M', { size: 9.5, w: 800, c: '#fff' });
    b += tapRing(112, 60, 12, B.blue);
    // page behind
    b += R(10, 79, 460, 30, { r: 0, f: B.blue, s: 'none', sw: 0 }) + T(26, 99, 'PeraBank', { size: 13, w: 800, a: 'start', c: '#fff' }) + T(456, 99, 'Help   Branches', { size: 10.5, w: 600, a: 'end', c: '#dfe9f6' });
    b += T(372, 136, 'Log in to your account', { size: 12, w: 800, c: B.ink }) + T(300, 158, 'Username', { size: 9.5, w: 700, a: 'start', c: B.soft }) + R(300, 162, 144, 20, { r: 4, f: '#fff', s: B.line, sw: 1.2 });
    b += T(300, 198, 'Password', { size: 9.5, w: 700, a: 'start', c: B.soft }) + R(300, 202, 144, 20, { r: 4, f: '#fff', s: B.line, sw: 1.2 }) + R(300, 234, 144, 24, { r: 6, f: B.blue, s: 'none', sw: 0 }) + T(372, 250, 'Log in', { size: 11, w: 800, c: '#fff' });
    // site-info box (what opens when you tap the icon)
    b += R(30, 88, 238, 190, { r: 10, f: 'rgba(24,35,58,0.12)', s: 'none', sw: 0 }) + R(26, 84, 238, 190, { r: 10, f: '#fff', sw: 1.8 });
    b += T(42, 106, 'perabank.com.ph', { size: 12.5, w: 800, a: 'start', c: B.ink }) + T(248, 106, '×', { size: 13, w: 700, c: B.soft });
    b += L(26, 116, 264, 116, '#e6eaf0', 1.2) + padlock2(42, 131, false, B.green, 0.36) + T(62, 139, 'Connection is secure', { size: 11.5, w: 700, a: 'start', c: '#2f6b45' }) + T(250, 139, '›', { size: 14, w: 700, c: B.soft });
    b += R(38, 150, 214, 62, { r: 8, f: '#f4f6f9', s: 'none', sw: 0 }) + R(46, 160, 12, 16, { r: 2, f: '#fff3c4', s: '#b88a1c', sw: 1.2 }) + C(52, 173, 3.2, B.amber, '#b88a1c', 1) + T(66, 170, 'Certificate is valid', { size: 11, w: 700, a: 'start', c: B.ink });
    b += T(66, 186, 'Issued to: perabank.com.ph', { size: 9.5, w: 600, a: 'start', c: B.soft }) + T(66, 200, 'By: a certificate authority', { size: 9.5, w: 600, a: 'start', c: B.soft });
    b += L(26, 222, 264, 222, '#e6eaf0', 1.2) + tune(46, 240) + T(62, 244, 'Site settings', { size: 11, w: 600, a: 'start', c: B.ink }) + T(62, 262, 'Cookies and site data', { size: 11, w: 600, a: 'start', c: B.ink });
    alt = 'A browser window close to real Chrome: a tab named PeraBank | Log in, back, forward and reload buttons, and an address bar showing perabank.com.ph/login with the two-slider site-info icon at its left. Tapping that icon opens a box: Connection is secure, Certificate is valid, issued to perabank.com.ph by a certificate authority, plus Site settings and Cookies and site data.';
  }
  return svgWrap(480, H, alt, b);
}

/** How an ATM skimmer works (chat 56, round 10: cleaner layout). ATM on the left; each part has a dotted leader line to its
 *  numbered note on the right, so the eye goes straight from the part to its meaning. 480 x 312. */
export function skimPic() {
  const num = (x, y, n) => C(x, y, 11, HOT, B.ink, 1.8) + T(x, y + 4.5, String(n), { size: 12.5, c: '#fff' });
  const lead = (x1, y1, x2, dot = true) => L(x1, y1, x2, y1, '#9aa5b6', 1.6, ' stroke-dasharray="3 4"') + (dot ? C(x1, y1, 3, B.ink, 'none', 0) : '');
  let b = '';
  // ATM body
  b += R(16, 12, 204, 288, { r: 14, f: '#d3dae5', sw: 2.2 });
  b += R(34, 28, 168, 32, { r: 7, f: '#56607a', sw: 1.8 }) + T(118, 49, 'PeraBank ATM', { size: 12.5, w: 800, c: '#fff' });
  // camera strip with pinhole (part 1)
  b += R(62, 70, 112, 12, { r: 4, f: '#b7c0cd', s: B.ink, sw: 1.4 }) + C(152, 76, 2.6, '#111827', 'none', 0) + C(152, 76, 6, 'none', HOT, 1.8);
  // screen
  b += R(42, 92, 152, 74, { r: 7, f: '#2b3446', sw: 2 }) + R(49, 99, 138, 60, { r: 3, f: '#e8f0fb', s: 'none', sw: 0 }) + T(118, 125, 'Please enter', { size: 12, w: 700, c: B.blueInk }) + T(118, 142, 'your PIN', { size: 12, w: 700, c: B.blueInk });
  // keypad
  b += R(42, 180, 94, 88, { r: 7, f: '#eef1f5', sw: 1.8 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) b += R(48 + c * 28, 186 + r * 20, 24, 16, { r: 3, f: '#fff', s: '#8a94a6', sw: 1.2 }) + T(60 + c * 28, 198 + r * 20, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'][r * 3 + c], { size: 10, w: 800, c: B.ink });
  // card slot (part 2): card going in, bulky orange fake slot over the real one
  b += R(160, 186, 26, 26, { r: 3, f: '#fff', sw: 1.6 }) + R(160, 191, 26, 5, { r: 0, f: '#2b3446', s: 'none', sw: 0 }) + R(165, 200, 8, 6, { r: 1, f: B.amber, s: B.ink, sw: 1 });
  b += R(148, 204, 50, 30, { r: 7, f: '#e27b3e', s: B.ink, sw: 2 }) + R(151, 207, 44, 5, { r: 2.5, f: 'rgba(255,255,255,0.35)', s: 'none', sw: 0 }) + R(156, 208, 34, 5, { r: 2, f: '#2b3446', s: 'none', sw: 0 });
  // cash slot
  b += R(42, 280, 152, 10, { r: 4, f: '#2b3446', sw: 1.6 });
  // leaders + notes (numbers share one left edge, text shares one left edge)
  const NX = 262, TX = 282;
  b += lead(160, 76, NX - 13, false) + num(NX, 76, 1);
  b += T(TX, 81, 'Hidden tiny camera', { size: 13, w: 800, a: 'start', c: B.ink }) + ['Records your PIN as you type.', 'Some use a fake keypad on', 'top of the real one instead.'].map((t, k) => T(TX, 101 + k * 16, t, { size: 12, w: 600, a: 'start', c: B.soft })).join('');
  b += lead(198, 219, NX - 13) + num(NX, 219, 2);
  b += T(TX, 224, 'Fake card slot (skimmer)', { size: 13, w: 800, a: 'start', c: B.ink }) + ['Fits over the real slot and', 'copies your card as it goes in.'].map((t, k) => T(TX, 244 + k * 16, t, { size: 12, w: 600, a: 'start', c: B.soft })).join('');
  b += R(NX - 11, 272, 216, 28, { r: 10, f: '#fdeee9', s: 'none', sw: 0 }) + T(NX + 97, 290.5, 'You notice nothing: cash comes out.', { size: 11, w: 800, c: '#9c2f28' });
  return svgWrap(480, 312, 'An ATM with a skimmer. 1: a hidden tiny camera in a strip above the screen records your PIN; some skimmers use a fake keypad on top of the real one instead. 2: an orange fake card slot fits over the real slot and copies your card as it goes in. You notice nothing: cash comes out.', b);
}

/** The physical chain when the IPS is its own box (chat 56): provider line -> modem -> firewall -> IPS -> switch -> office devices. 480 x 300. */
export function ipsChainPic() {
  const box = (x, y, w, h, f, txt, tc = '#fff', leds = 3) => R(x, y, w, h, { r: 4, f, s: B.ink, sw: 2 }) + R(x + 2, y + 2, w - 4, 4, { r: 2, f: 'rgba(255,255,255,0.3)', s: 'none', sw: 0 })
    + [...Array(leds)].map((_, k) => `<circle cx="${x + 9 + k * 7}" cy="${y + h - 7}" r="2" fill="${k === leds - 1 ? B.amber : B.green}"/>`).join('') + (txt ? T(x + w / 2, y + h / 2 + 1, txt, { size: 10, w: 800, c: tc }) : '');
  const name = (x, y, a, b2) => T(x, y, a, { size: 12, w: 800, c: B.ink }) + (b2 ? T(x, y + 15, b2, { size: 10.5, w: 600, c: B.soft }) : '');
  const cable = (x1, y1, x2, y2) => L(x1, y1, x2, y2, '#3b4659', 3) + ARROW(x1, y1, x2, y2, '#3b4659', 3);
  let b = '';
  // row 1, left to right: line from the pole -> modem -> firewall -> IPS (one box every 110 px, labels under each)
  const y1 = 56;
  b += L(40, 18, 40, 104, '#8a6a48', 6) + L(24, 26, 56, 26, '#8a6a48', 4) + P(`M56 26 Q86 28 104 ${y1 + 13}`, 'none', '#3b4659', 3) + name(40, 128, 'Fiber line', 'from the street');
  b += box(108, y1 - 2, 64, 30, '#f4f6f9', '', B.ink, 4) + T(140, y1 + 12, 'MODEM', { size: 9.5, w: 800, c: B.ink }) + name(140, 128, 'Modem (ONT)', 'brings Internet in');
  b += cable(174, y1 + 13, 210, y1 + 13);
  b += box(212, y1 - 2, 76, 30, '#56607a', 'FIREWALL') + name(250, 128, 'Firewall', 'checks the rules');
  b += cable(290, y1 + 13, 324, y1 + 13);
  b += box(326, y1 - 2, 68, 30, '#e27b3e', 'IPS') + name(360, 128, 'IPS', 'looks for attacks');
  // down to the switch
  b += P(`M396 ${y1 + 13} L420 ${y1 + 13} Q432 ${y1 + 13} 432 ${y1 + 25} L432 194`, 'none', '#3b4659', 3) + ARROW(432, 184, 432, 196, '#3b4659', 3);
  // row 2: switch on the right; one cable runs left, and each device hangs from it
  const y2 = 198;
  b += R(388, y2, 84, 26, { r: 4, f: '#f4f6f9', s: B.ink, sw: 2 }) + [...Array(7)].map((_, k) => R(396 + k * 10, y2 + 9, 7, 8, { r: 1, f: '#2b3446', s: 'none', sw: 0 })).join('') + name(430, y2 + 46, 'Switch', 'connects the office');
  // one cable per device, each from its own switch port (a star, as in Computer networks), not one shared line
  [[300, 18], [200, 13], [100, 8]].forEach(([x, dy]) => { b += P(`M388 ${y2 + dy} L${x + 6} ${y2 + dy} Q${x} ${y2 + dy} ${x} ${y2 + dy + 6} L${x} ${y2 + 34}`, 'none', '#3b4659', 2.2); });
  b += R(279, y2 + 34, 42, 28, { r: 3, f: '#2b3446', sw: 2 }) + R(282, y2 + 37, 36, 20, { r: 1, f: '#e8f0fb', s: 'none', sw: 0 }) + L(300, y2 + 62, 300, y2 + 68, B.ink, 2.4) + L(291, y2 + 69, 309, y2 + 69, B.ink, 2.4);
  b += laptop2(180, y2 + 36, 40, screenLines());
  b += R(78, y2 + 42, 44, 22, { r: 4, f: '#e4e8ee', s: B.ink, sw: 2 }) + R(86, y2 + 34, 28, 9, { r: 1, f: '#fff', s: B.ink, sw: 1.4 }) + R(86, y2 + 60, 28, 8, { r: 1, f: '#fff', s: B.ink, sw: 1.4 });
  b += name(200, y2 + 94, 'Office devices', 'computers, laptops, printer');
  // an IDS off to the side: not in the line; the switch sends it a COPY of the traffic (dashed)
  b += R(250, 154, 64, 26, { r: 4, f: '#f6e3a8', s: B.ink, sw: 2 }) + T(282, 171.5, 'IDS', { size: 10.5, w: 800, c: '#6e5108' }) + T(282, 194, 'gets a copy only', { size: 10.5, w: 700, c: B.soft });
  b += `<path d="M392 ${y2} Q392 167 320 167" fill="none" stroke="#c98a1c" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round"/>` + ARROW(328, 167, 318, 167, '#c98a1c', 2.2) + T(362, 190, 'copy', { size: 10.5, w: 800, c: '#8f6a0e' });
  return svgWrap(480, 312, 'The cable path when the IPS is its own box: the provider\'s fiber line from the street goes into the modem (ONT), then a cable to the firewall, which checks the rules, then a cable to the IPS, which looks for attacks, then to the switch, which connects the office computers, laptops, and printer, each with its own cable. Off to the side, an IDS box is not in the line; the switch sends it only a copy of the traffic. Every message passes through each box in order.', b);
}

/** VPN for the "From Computer networks" Peek in Lesson 1 (chat 56; replaces vpnTunnel there, the old lesson is untouched).
 *  You at home -> an encrypted tunnel through the public Internet -> the office network. 420 x 190. */
export function vpnPeekPic() {
  let b = R(4, 4, 412, 182, { r: 14, f: '#f1f4f8', s: 'none', sw: 0 });
  // you at home
  b += laptop2(20, 66, 70, screenLines()) + T(55, 136, 'you, at home', { size: 12, w: 700, c: B.ink });
  // office
  b += R(330, 50, 70, 78, { r: 4, f: '#dfe9f6', s: B.ink, sw: 2 }) + [0, 1, 2].map((r) => [0, 1, 2].map((c) => R(338 + c * 20, 58 + r * 20, 14, 12, { r: 1.5, f: '#fff', s: B.ink, sw: 1.2 })).join('')).join('') + R(357, 112, 16, 16, { r: 1, f: '#8fb0dc', s: B.ink, sw: 1.4 });
  b += T(365, 146, 'office network', { size: 12, w: 700, c: B.ink });
  // the public Internet band
  b += R(110, 40, 200, 104, { r: 52, f: '#e8ecf2', s: 'none', sw: 0 }) + T(210, 34, 'the public Internet', { size: 11.5, w: 700, c: B.soft });
  // the tunnel
  b += `<path d="M96 92 L326 92" stroke="#8fb0dc" stroke-width="30" stroke-linecap="round" opacity="0.55"/>` + L(96, 92, 326, 92, B.blue, 2, ' stroke-dasharray="6 5"') + padlock2(196, 88, false, HOT, 0.55);
  b += T(170, 126, 'encrypted tunnel', { size: 12, w: 800, c: B.blueInk });
  // a stranger who sees only scramble
  b += hacker2(236, 132, 0.42) + T(256, 164, 'sees only scramble', { size: 10.5, w: 700, a: 'start', c: '#9c2f28' });
  return svgWrap(420, 190, 'You at home connect to the office network through an encrypted tunnel across the public Internet. A stranger on the Internet sees only scrambled data.', b);
}

/** Organization precautions, one doodle per group (chat 56): people, access, watch, partners. 220 x 120. */
export function orgGroupPic(kind) {
  let b = '', alt = '';
  const doc = (x, y, w, h) => R(x, y, w, h, { r: 4, f: '#fff', sw: 2 }) + [0, 1, 2, 3].map((k) => check(x + 11, y + 14 + k * 15, 0.42) + R(x + 20, y + 11 + k * 15, w - 28, 4, { r: 2, f: '#c9d2df', s: 'none', sw: 0 })).join('');
  if (kind === 'people') {
    b = blob(110, 62, 100, 52, '#e3ecf8') + ground(110, 112, 80);
    b += person2(62, 22, 0.86, { shirt: B.blue }) + R(66, 70, 13, 16, { r: 2, f: '#fff', s: B.ink, sw: 1.2 }) + R(66, 70, 13, 5, { r: 2, f: B.blue, s: 'none', sw: 0 });
    b += doc(104, 22, 62, 76) + T(135, 18, 'RULES', { size: 10, w: 800, c: B.blueInk });
    b += C(180, 76, 11, '#fff', B.ink, 2) + L(188, 84, 198, 94, B.ink, 3) + C(180, 76, 6, '#dfe9f6', 'none', 0);
    alt = 'A new employee with an ID badge, a checklist of rules, and a magnifying glass for background checks.';
  } else if (kind === 'access') {
    b = blob(110, 62, 100, 52, '#fbe7da') + ground(110, 112, 84);
    b += R(30, 22, 52, 88, { r: 3, f: '#c9a27a', sw: 2 }) + C(74, 68, 2.6, B.ink, 'none', 0) + R(88, 52, 18, 28, { r: 4, f: '#2b3446', sw: 1.6 }) + C(97, 72, 3, B.green, 'none', 0);
    b += R(112, 44, 34, 22, { r: 3, f: '#fff', sw: 1.6 }) + R(112, 44, 34, 6, { r: 3, f: B.blue, sw: 1.6 }) + C(121, 58, 4, B.skin, B.ink, 1);
    b += check(97, 36, 0.62);
    b += R(158, 30, 44, 80, { r: 3, f: '#d8dee8', sw: 2 }) + padlock2(168, 60, false, B.red, 0.55) + cross(196, 30, 0.62);
    alt = 'An ID card opens the door the person needs; another door stays locked.';
  } else if (kind === 'watch') {
    b = blob(110, 62, 100, 52, '#dcefe2') + ground(110, 112, 70);
    b += laptop2(52, 18, 116, (x, y, w, h) => {
      let g = R(x, y, w, 10, { r: 0, f: '#1f2a44', s: 'none', sw: 0 }) + T(x + 4, y + 7.5, 'Activity log', { size: 6.5, w: 800, a: 'start', c: '#fff' });
      ['09:12  Lea  sales.xlsx', '10:40  Jon  report.docx', '02:13  ???  1,200 files', '11:05  Mia  menu.pdf'].forEach((t, k) => { const yy = y + 13 + k * 13; if (k === 2) g += R(x + 2, yy - 1, w - 4, 12, { r: 2, f: '#fdeee9', s: B.red, sw: 1 }); g += T(x + 5, yy + 8, t, { size: 6.5, w: 700, a: 'start', c: k === 2 ? '#9c2f28' : B.soft, mono: true }); });
      return g;
    });
    b += C(186, 30, 13, '#fff', B.ink, 2) + `<ellipse cx="186" cy="30" rx="8" ry="5" fill="#fff" stroke="${B.ink}" stroke-width="1.6"/>` + C(186, 30, 2.6, B.ink, 'none', 0);
    alt = 'A laptop showing an activity log; one line, 1,200 files opened at 2 a.m., is marked red as unusual.';
  } else {
    b = blob(110, 62, 100, 52, '#f6e3a8') + ground(110, 112, 90);
    const bld = (x, f, txt) => R(x, 36, 52, 70, { r: 3, f, sw: 2 }) + [0, 1].map((r) => [0, 1].map((c) => R(x + 8 + c * 22, 46 + r * 18, 14, 11, { r: 1.5, f: '#fff', s: B.ink, sw: 1.1 })).join('')).join('') + R(x + 19, 88, 14, 18, { r: 1, f: '#8fb0dc', s: B.ink, sw: 1.2 }) + T(x + 26, 30, txt, { size: 9.5, w: 800, c: B.ink });
    b += bld(22, '#dfe9f6', 'Your company') + bld(146, '#fbe2d2', 'Supplier');
    b += L(76, 70, 144, 70, B.ink, 2, ' stroke-dasharray="4 4"') + shield2(110, 46, 0.42, B.greenWash) + check(110, 66, 0.55);
    alt = 'Your company and a supplier connected by a line with a shield and a check mark: check the partner\'s security first.';
  }
  return svgWrap(220, 120, alt, b);
}

/* =====================================================================
   Lesson 2 story pictures (chat 57, her feedback: "Picture this" drawings bigger and in the Lesson 1 style;
   bot/botnet pictures better). Numbered soft panels stacked top to bottom (they stay readable on phones),
   one idea per panel, every part labeled, labels apart from the drawing. 480 wide.
   ===================================================================== */
const SOFT = '#f1f4f8';
const stHead = (x, y, n, txt, c = HOT) => C(x + 12, y + 12, 12, c, B.ink, 1.8) + T(x + 12, y + 17, String(n), { size: 13, c: '#fff' }) + T(x + 32, y + 17.5, txt, { size: 15, w: 800, a: 'start', c: B.ink });
const stPanel = (y, h, f = SOFT) => R(8, y, 464, h, { r: 14, f, s: 'none', sw: 0 });
const desk = (x, y, w) => R(x, y, w, 8, { r: 3, f: '#c8a27a', sw: 1.6 }) + L(x + 10, y + 8, x + 10, y + 26, B.ink, 2) + L(x + w - 10, y + 8, x + w - 10, y + 26, B.ink, 2);
const tower = (x, y, w = 26, h = 50) => R(x, y, w, h, { r: 4, f: '#3b4659', sw: 2 }) + R(x + 5, y + 7, w - 10, 4, { r: 2, f: '#6b7a94', s: 'none', sw: 0 }) + R(x + 5, y + 14, w - 10, 4, { r: 2, f: '#6b7a94', s: 'none', sw: 0 }) + C(x + w / 2, y + h - 10, 2.6, B.green, 'none', 0);
const usb = (x, y, s = 1) => R(x, y, 9 * s, 18 * s, { r: 2, f: B.blue, sw: 1.4 }) + R(x + 1.5 * s, y - 6 * s, 6 * s, 7 * s, { r: 1, f: '#c8ced8', sw: 1.2 });
const zoomLines = (x1, y1, x2, y2, x3, y3, x4, y4) => L(x1, y1, x3, y3, '#b7c3d6', 1.4) + L(x2, y2, x4, y4, '#b7c3d6', 1.4);
const winTitle = (x, y, w, title, f = '#e4e9f1') => R(x, y, w, 24, { r: 8, f, sw: 2 }) + `<rect x="${x + 1}" y="${y + 14}" width="${w - 2}" height="10" fill="${f}"/>` + [0, 1, 2].map((k) => C(x + 12 + k * 10, y + 12, 3, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('') + T(x + w / 2 + 14, y + 16.5, title, { size: 12, w: 700, c: B.soft });
const lockMini = (x, y, c = B.amber) => P(`M${x - 4} ${y - 2} L${x - 4} ${y - 6} Q${x - 4} ${y - 11} ${x} ${y - 11} Q${x + 4} ${y - 11} ${x + 4} ${y - 6} L${x + 4} ${y - 2}`, 'none', B.ink, 1.6) + R(x - 6.5, y - 3, 13, 10, { r: 2, f: c, sw: 1.4 });
const ransomScreen = (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#7a1f1a', s: 'none', sw: 0 }) + T(x + w / 2, y + h * 0.44, 'YOUR FILES ARE LOCKED', { size: Math.max(6, w * 0.066), c: '#fff', mono: true }) + T(x + w / 2, y + h * 0.66, 'Pay ₱50,000', { size: Math.max(6, w * 0.075), c: '#ffd2c7', mono: true }) + T(x + w / 2, y + h * 0.86, 'to unlock them', { size: Math.max(5.5, w * 0.06), w: 600, c: '#ffd2c7', mono: true });
const result = (x, y, txt, c = '#9c2f28') => T(x, y, txt, { size: 13.5, w: 800, a: 'start', c });
// A realistic email reading pane. o: { subject, name, email, badge, avatar, date, body:[lines], file, badgeColor, size }
const mailWin = (x, y, w, o) => {
  const pad = 18, L0 = x + pad, R0 = x + w - pad, lines = o.body || [];
  // lay the rows out, then size the window to the content with an even bottom margin
  const subY = y + 50, senY = y + 74, divY = y + 96, bodY = y + 118;
  const tileY = bodY + (lines.length - 1) * 16 + 14, tileH = 46, tw = w - 2 * pad;
  const h = (tileY + tileH + 16) - y;
  let g = winBox(x, y, w, h, 'Mail');
  g += T(L0, subY, o.subject, { size: 15, a: 'start', c: B.ink });
  g += `<path d="M0 0 l3 6 6.6 1 -4.8 4.6 1.1 6.6 -5.9 -3.1 -5.9 3.1 1.1 -6.6 -4.8 -4.6 6.6 -1 Z" transform="translate(${R0 - 16} ${subY - 13})" fill="none" stroke="#b7bfcc" stroke-width="1.4" stroke-linejoin="round"/>`;
  g += C(L0 + 11, senY, 11, o.avatar || '#6b7a94', 'none', 0) + T(L0 + 11, senY + 4, o.badge || 'A', { size: 11, c: '#fff' });
  g += T(L0 + 28, senY - 4, o.name, { size: 11.5, a: 'start', c: B.ink }) + T(L0 + 28, senY + 10, o.email, { size: 9.5, w: 600, a: 'start', c: B.greyInk });
  g += T(R0, senY - 4, o.date, { size: 9.5, w: 600, a: 'end', c: B.greyInk }) + T(R0, senY + 10, 'to: me', { size: 9.5, w: 600, a: 'end', c: B.greyInk });
  g += L(L0, divY, R0, divY, '#e4e8ee', 1.4);
  lines.forEach((ln, k) => { g += T(L0, bodY + k * 16, ln, { size: 11, w: 600, a: 'start', c: B.ink }); });
  g += R(L0, tileY, tw, tileH, { r: 8, f: '#f7f9fc', s: '#d3dbe6', sw: 1.4 });
  g += `<g transform="translate(${L0 + 14} ${tileY + 8})">` + P('M0 0 L18 0 L26 8 L26 31 L0 31 Z', '#fff', '#9aa6b8', 1.6) + P('M18 0 L18 8 L26 8', '#e4e9f1', '#9aa6b8', 1.4) + R(-2, 19, 32, 12, { r: 2, f: o.badgeColor || B.red, s: 'none', sw: 0 }) + T(14, 28.5, o.fileType || 'VBS', { size: 7.5, c: '#fff' }) + '</g>';
  g += T(L0 + 54, tileY + 19, o.file, { size: 10, a: 'start', c: B.ink, mono: true }) + T(L0 + 54, tileY + 34, o.size || '10 KB', { size: 9.5, w: 600, a: 'start', c: B.greyInk });
  g += `<g transform="translate(${R0 - 14} ${tileY + 15})">` + L(0, -4, 0, 8, '#6b7a94', 1.8) + P('M-5 3 L0 9 L5 3', 'none', '#6b7a94', 1.8) + L(-6, 13, 6, 13, '#6b7a94', 1.8) + '</g>';
  return g;
};

/** "Picture this" stories, 480 wide, 3 numbered panels. kind: shop (Part 1), mia (Part 2), bea (Part 3). */
export function storyPic(kind) {
  let b = '', alt = '', H = 500;
  if (kind === 'shop') {
    // chat 57 round 2: real-looking file window, more room around the panels and the locked monitor
    H = 624;
    // 1. the USB file
    b += stPanel(8, 222) + stHead(22, 20, 1, 'At the computer shop, she opens a file from her USB');
    b += girl(62, 84, 0.9, { shirt: B.orange }) + desk(24, 158, 210);
    b += pc2(100, 88, 92, (x, y, w, h) => R(x + 4, y + 6, w - 8, h - 12, { r: 3, f: '#fff', s: '#c9d2df', sw: 1 }) + R(x + 9, y + 12, 12, 12, { r: 2, f: '#8fb0dc', s: 'none', sw: 0 }) + R(x + 25, y + 15, w - 38, 5, { r: 2, f: '#f6c9a8', s: 'none', sw: 0 }) + R(x + 9, y + 30, 12, 12, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 }) + R(x + 25, y + 33, w - 46, 5, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 }));
    b += tower(198, 108) + usb(186, 132) + T(190, 178, 'USB drive', { size: 11.5, w: 700, c: B.soft });
    b += zoomLines(188, 94, 188, 134, 246, 52, 246, 172);
    // file explorer window: title bar, side panel, list of files
    b += R(246, 48, 222, 124, { r: 8, f: '#fff', sw: 2 }) + winTitle(246, 48, 222, 'USB drive (E:)');
    b += `<path d="M247 72 L316 72 L316 171 L254 171 Q247 171 247 164 Z" fill="#f4f6f9"/>` + L(316, 72, 316, 171, '#d3dbe6', 1.4);
    b += T(256, 92, 'This PC', { size: 10, w: 700, a: 'start', c: B.greyInk }) + R(252, 101, 58, 18, { r: 5, f: '#e3ecf8', s: 'none', sw: 0 }) + T(258, 114, 'USB (E:)', { size: 10, w: 800, a: 'start', c: B.blueInk }) + T(256, 136, 'Downloads', { size: 10, w: 700, a: 'start', c: B.greyInk });
    b += T(326, 90, 'Name', { size: 9.5, w: 700, a: 'start', c: B.greyInk }) + L(322, 96, 462, 96, '#e1e6ee', 1.2);
    b += P('M326 106 L333 106 L335 109 L344 109 L344 118 L326 118 Z', '#f2c14e', '#b8891d', 1.2) + T(350, 116, 'Photos', { size: 10.5, w: 700, a: 'start', c: B.ink });
    b += R(321, 123, 144, 20, { r: 4, f: '#d6e4f7', s: B.blue, sw: 1.2 }) + R(326, 127, 13, 12, { r: 2, f: '#3b4659', s: 'none', sw: 0 }) + R(328, 129, 9, 3, { r: 1, f: '#8fb0dc', s: 'none', sw: 0 }) + T(343, 137, 'Project_FINAL.exe', { size: 10, a: 'start', c: B.ink, mono: true });
    b += P('M326 148 L334 148 L338 152 L338 162 L326 162 Z', '#fff', B.greyInk, 1.2) + T(350, 159, 'notes.txt', { size: 10.5, w: 700, a: 'start', c: B.ink });
    b += P('M447 131 L447 147 L451 143 L455 151 L458 149 L454 141 L460 141 Z', '#fff', B.ink, 1.4);
    b += T(254, 196, 'She double-clicks it.', { size: 12, w: 700, a: 'start', c: B.soft }) + T(254, 213, 'Nothing seems to happen.', { size: 12, w: 700, a: 'start', c: B.soft });
    // 2. It spreads (panel starts at 248)
    b += stPanel(248, 172) + stHead(22, 260, 2, 'During the day, it spreads to the other computers');
    const xs = [40, 150, 260, 370];
    xs.forEach((x) => {
      b += pc2(x, 298, 70, screenLines()) + P(`M${x + 35} 352 Q${x + 35} 374 ${x + 35 < 240 ? 186 : 294} 374`, 'none', B.ink, 1.8) + bug(x + 66, 298, 0.6);
    });
    b += R(186, 362, 108, 24, { r: 6, f: '#e4e8ee', sw: 1.8 }) + T(240, 378.5, 'shop network', { size: 11, c: B.soft });
    b += ARROW(118, 316, 146, 316, B.red, 2.2) + ARROW(228, 316, 256, 316, B.red, 2.2) + ARROW(338, 316, 366, 316, B.red, 2.2);
    b += T(240, 408, 'It starts on her computer, then copies itself over the shop network.', { size: 12.5, w: 800, c: '#9c2f28' });
    // 3. Evening: locked (panel starts at 438)
    b += stPanel(438, 178) + stHead(22, 450, 3, 'By evening, the files are locked');
    b += pc2(44, 490, 136, ransomScreen) + lockMini(112, 509, B.amber);
    b += R(206, 488, 170, 96, { r: 8, f: '#fff', sw: 2 }) + winTitle(206, 488, 170, 'Files');
    ['thesis.docx.locked', 'photo1.jpg.locked', 'sales.xlsx.locked'].forEach((n, k) => { b += lockMini(222, 532 + k * 18, '#f2c48a') + T(234, 535 + k * 18, n, { size: 10.5, a: 'start', c: '#9c2f28', mono: true }); });
    b += person2(424, 494, 0.86, { shirt: '#7a8aa3', sad: true }) + T(424, 590, 'shop owner', { size: 11.5, w: 700, c: B.soft });
    alt = 'Three panels. 1: At a computer shop, a student opens Project_FINAL.exe from her USB drive; nothing seems to happen. 2: During the day, malware spreads over the shop network to the other computers. 3: By evening, a red screen says "Your files are locked. Pay ₱50,000 to unlock them," the files have strange names ending in .locked, and the shop owner looks worried.';
  } else if (kind === 'mia') {
    H = 516;
    // 1. the text
    b += stPanel(8, 176) + stHead(22, 20, 1, 'A text message arrives');
    b += girl(66, 56, 0.95, { shirt: B.blue, sad: true }) + phone2(82, 100, 30, 52, (x, y, w, h) => R(x + 2, y + 2, w - 4, 14, { r: 3, f: '#fdeee9', s: 'none', sw: 0 }));
    b += zoomLines(108, 104, 108, 140, 170, 50, 170, 170);
    b += R(170, 48, 288, 124, { r: 12, f: '#fff', sw: 2 }) + C(194, 72, 12, B.blue, 'none', 0) + T(194, 76.5, 'P', { size: 12, c: '#fff' }) + T(214, 70, 'PeraPay', { size: 13, a: 'start', c: B.ink }) + T(214, 84, 'Text message · now', { size: 10.5, w: 600, a: 'start', c: B.greyInk });
    b += R(182, 94, 264, 70, { r: 10, f: '#eef1f5', s: 'none', sw: 0 }) + T(192, 114, 'ALERT: Your account will be LOCKED', { size: 12, w: 700, a: 'start', c: B.ink }) + T(192, 132, 'in 2 hours. Verify now:', { size: 12, w: 700, a: 'start', c: B.ink }) + T(192, 152, 'perapay-verify.com', { size: 12, w: 700, a: 'start', c: B.blue, mono: true }).replace('<text', '<text text-decoration="underline"');
    // 2. the fake page
    b += stPanel(192, 166) + stHead(22, 204, 2, 'She taps the link and types her details');
    b += phone2(36, 234, 110, 116, (x, y, w, h) => R(x + 4, y, w - 8, 14, { r: 7, f: '#fff', s: '#b7bfcc', sw: 1 }) + T(x + w / 2, y + 10, 'perapay-verify.com', { size: 7, c: B.red, mono: true }) + R(x, y + 18, w, 16, { r: 0, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 30, 'PeraPay', { size: 10, c: '#fff' }) + [['0917 555 1234', 40], ['PIN  ••••', 56], ['Code  482916', 72]].map(([t, yy]) => R(x + 6, y + yy, w - 12, 13, { r: 3, f: '#fff', s: '#b7bfcc', sw: 1 }) + T(x + 10, y + yy + 9.5, t, { size: 7, w: 700, a: 'start', c: B.ink, mono: true })).join(''));
    b += label(214, 326, 'fake page', B.red, '#fdeee9', 12);
    b += P('M152 292 Q230 278 296 292', 'none', B.red, 2) + ARROW(286, 289, 298, 293, B.red, 2.2) + T(224, 274, 'copied to the scammer', { size: 11.5, w: 700, c: '#9c2f28' });
    b += laptop2(306, 244, 104, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#1f2a3d', s: 'none', sw: 0 }) + ['0917 555 1234', 'PIN: 4417', 'Code: 482916'].map((t, k) => T(x + 6, y + 14 + k * 14, t, { size: 8.5, a: 'start', c: '#ff9f8f', mono: true })).join('')) + hacker2(440, 254, 0.62);
    b += T(358, 348, 'scammer', { size: 11.5, w: 700, c: B.soft });
    // 3. ten minutes later
    b += stPanel(374, 134) + stHead(22, 386, 3, 'Ten minutes later, her money is gone');
    b += R(40, 418, 196, 80, { r: 12, f: '#fff', sw: 2 }) + R(40, 418, 196, 24, { r: 12, f: B.blue, sw: 2 }) + `<rect x="41" y="430" width="194" height="12" fill="${B.blue}"/>` + T(138, 435, 'PeraPay balance', { size: 12, c: '#fff' });
    b += T(98, 472, '₱8,450', { size: 17, c: B.soft, mono: true }) + L(64, 467, 132, 467, B.red, 2.4) + ARROW(140, 466, 160, 466, B.ink, 2) + T(198, 473, '₱0.00', { size: 19, c: B.red, mono: true });
    b += T(138, 492, 'Sent ₱8,450 to 0998 *** 1234', { size: 10, w: 700, c: B.soft });
    b += girl(412, 414, 0.95, { shirt: B.blue, sad: true }) + bubble(262, 420, 118, 46, 372, 478, '#fff') + T(321, 439, '"I never', { size: 12.5, w: 700, c: B.ink }) + T(321, 457, 'sent that!"', { size: 12.5, w: 700, c: B.ink });
    alt = 'Three panels. 1: Mia gets a text that looks like it is from PeraPay: "ALERT: Your account will be LOCKED in 2 hours. Verify now: perapay-verify.com". 2: She taps the link; a fake PeraPay page asks for her number, PIN, and the code just sent to her, and everything she types is copied to a scammer\'s laptop. 3: Ten minutes later, her balance drops from ₱8,450 to ₱0.00, sent to an unknown number.';
  } else {
    return beaStoryPic(); // chat 59: rebuilt with realistic phone screens
  }
  return svgWrap(480, H, alt, b);
}

/** Bots and botnets (redrawn chat 57). 1: one command reaches many bots. 2: the owner at home notices nothing. 480 x 520. */
export function botnetPic() {
  // chat 57 round 5 (her request): realistic control: the botherder uses a control panel; the order goes through a
  // command and control (C2) server, which the bots keep checking for new orders.
  let b = stPanel(8, 306) + stHead(22, 20, 1, 'The botherder sends one order to all the bots');
  // botherder at a laptop with a control panel (made-up name)
  b += hacker2(64, 50, 0.8) + laptop2(14, 126, 104, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#1f2a3d', s: 'none', sw: 0 }) + R(x, y, w, 11, { r: 0, f: '#33415c', s: 'none', sw: 0 }) + T(x + 4, y + 8.5, 'Control panel', { size: 7, a: 'start', c: '#c9d3e3' })
    + T(x + 4, y + 23, 'Bots online:', { size: 7.5, w: 700, a: 'start', c: '#c9d3e3' }) + T(x + w - 4, y + 23, '5,214', { size: 8.5, a: 'end', c: '#7fd39b', mono: true })
    + R(x + 4, y + 30, w - 8, 12, { r: 3, f: '#e27b3e', s: 'none', sw: 0 }) + T(x + w / 2, y + 39, 'Send spam', { size: 7.5, c: '#fff' }) + R(x + 4, y + 45, w - 8, 10, { r: 3, f: '#46536e', s: 'none', sw: 0 }) + T(x + w / 2, y + 52.5, 'Attack a website', { size: 6.5, w: 700, c: '#c9d3e3' }));
  b += label(66, 230, 'botherder', '#a6461f', '#fbe7da', 12.5);
  // C2 server in the middle
  b += ARROW(126, 160, 150, 160, B.red, 2.4) + server2(154, 128, 40, 70) + T(174, 218, 'C2 server', { size: 12, c: B.ink }) + T(174, 234, 'command and', { size: 10, w: 700, c: B.soft }) + T(174, 247, 'control server', { size: 10, w: 700, c: B.soft });
  // bot list
  const rows = [
    ['laptop', "Ana's laptop", 'at home'],
    ['phone', "Ben's old phone", 'in his pocket'],
    ['cam', 'a CCTV camera', 'weak password'],
    ['router', 'a Wi-Fi router', 'never updated'],
    ['tv', 'a smart TV', 'in a living room'],
  ];
  const y0 = 54, rh = 44;
  rows.forEach(([k, name, sub], i) => {
    const y = y0 + i * rh, cy = y + 19;
    b += P(`M196 163 C218 163 214 ${cy} 232 ${cy}`, 'none', '#d78a6a', 1.8) + C(232, cy, 2.6, '#d78a6a', 'none', 0);
    b += R(236, y, 184, 38, { r: 10, f: '#fff', s: '#c9d2df', sw: 1.4 });
    if (k === 'laptop') b += laptop2(246, y + 8, 30, screenLines());
    if (k === 'phone') b += phone2(254, y + 4, 17, 30);
    if (k === 'cam') b += cctv(248, y + 18, 0.62);
    if (k === 'router') b += `<g transform="translate(244 ${y + 9}) scale(0.6)">` + router2(0, 24, 60) + '</g>';
    if (k === 'tv') b += tv(246, y + 6, 32);
    b += T(294, y + 17, name, { size: 12.5, w: 800, a: 'start', c: B.ink }) + T(294, y + 31, sub, { size: 10.5, w: 700, a: 'start', c: B.greyInk });
    b += bug(278, y + 6, 0.48);
  });
  // brace: the botnet
  const top = y0, bot = y0 + 4 * rh + 38, mid = (top + bot) / 2;
  b += P(`M426 ${top} Q436 ${top} 436 ${top + 12} L436 ${mid - 10} Q436 ${mid} 446 ${mid} Q436 ${mid} 436 ${mid + 10} L436 ${bot - 12} Q436 ${bot} 426 ${bot}`, 'none', B.ink, 2);
  b += `<text x="458" y="${mid}" transform="rotate(-90 458 ${mid})" font-family="Nunito, system-ui, sans-serif" font-size="14" font-weight="800" fill="#9c2f28" text-anchor="middle">botnet</text>`;
  b += T(240, 286, 'Each device is a bot (zombie computer).', { size: 11.5, w: 700, c: B.soft }) + T(240, 303, 'The bots keep asking the C2 server for new orders.', { size: 11.5, w: 700, c: B.soft });
  b += '<g transform="translate(0 18)">';
  // 2. at home
  b += stPanel(314, 214) + stHead(22, 326, 2, 'At home, the owner notices nothing');
  b += girl(70, 368, 0.95, { shirt: '#f4f6f9' }) + desk(26, 462, 190);
  b += laptop2(108, 400, 92, (x, y, w, h) => R(x, y, w, 9, { r: 0, f: '#c9d8ee', s: 'none', sw: 0 }) + T(x + 4, y + 7.5, 'IT 110 Module 3', { size: 6, a: 'start', c: B.blueInk }) + R(x + 4, y + 14, w * 0.5, 4, { r: 2, f: '#b7c7e0', s: 'none', sw: 0 }) + R(x + 4, y + 22, w * 0.75, 4, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 }) + R(x + 4, y + 30, w * 0.65, 4, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 }) + R(x + 4, y + 38, w * 0.7, 4, { r: 2, f: '#d3dbe6', s: 'none', sw: 0 }));
  b += bubble(104, 354, 150, 28, 114, 386, '#fff') + T(179, 373, '"It\'s a bit slow today."', { size: 11.5, w: 700, c: B.ink });
  // hidden window
  b += zoomLines(200, 408, 200, 456, 252, 366, 252, 486);
  b += R(252, 360, 206, 128, { r: 10, f: '#fff', s: B.red, sw: 1.8, dash: '6 4' }) + T(355, 380, 'Hidden in the background', { size: 12, c: '#9c2f28' });
  b += R(266, 390, 178, 58, { r: 6, f: '#fdeee9', s: 'none', sw: 0 }) + T(276, 408, 'Sending messages…', { size: 11, w: 700, a: 'start', c: B.ink }) + R(276, 416, 158, 8, { r: 4, f: '#fff', s: '#e3b3a3', sw: 1 }) + R(276, 416, 112, 8, { r: 4, f: B.red, s: 'none', sw: 0 }) + T(276, 440, '4,812 spam messages sent', { size: 10.5, w: 700, a: 'start', c: '#9c2f28' });
  [[290, 468], [330, 462], [370, 468], [410, 462]].forEach(([x, y]) => { b += R(x - 11, y - 7, 22, 15, { r: 2, f: '#fff', sw: 1.4 }) + P(`M${x - 11} ${y - 7} L${x} ${y + 1} L${x + 11} ${y - 7}`, 'none', B.ink, 1.2); });
  b += T(240, 516, 'Her laptop is now part of a botnet, and she does not know it.', { size: 12.5, w: 800, c: '#9c2f28' });
  b += '</g>';
  return svgWrap(480, 554, 'Two panels. 1: A botherder clicks Send spam on a control panel that shows 5,214 bots online. The order goes to a command and control (C2) server, and from there to five infected devices, each with a malware bug: Ana\'s laptop at home, Ben\'s old phone, a CCTV camera with a weak password, a Wi-Fi router that was never updated, and a smart TV. Together they form a botnet. 2: At home, Ana studies on her laptop and says "It\'s a bit slow today." Hidden in the background, her laptop has sent 4,812 spam messages.', b);
}

/** The 3-2-1 backup rule (redrawn chat 57: harmonious grid, aligned baselines, realistic icons). 480 x 290. */
export function backupPic() {
  let b = '';
  const cw = 148, gap = 10, x0 = 8, cxs = [x0, x0 + cw + gap, x0 + 2 * (cw + gap)];
  // one rounded card per column, all the same size
  cxs.forEach((x) => { b += R(x, 8, cw, 240, { r: 16, f: '#f3f6fa', s: 'none', sw: 0 }); });
  // number badge, title and captions sit on the SAME baselines across all three columns
  const head = (x, n, title) => { const cx = x + cw / 2; return C(cx, 44, 18, B.blue, 'none', 0) + C(cx, 44, 18, 'none', '#1f4f8f', 1.5) + T(cx, 52, n, { size: 21, c: '#fff' }) + T(cx, 88, title, { size: 15, c: B.ink }); };
  const cap = (x, y, t, c = B.soft, sz = 11.5) => T(x + cw / 2, y, t, { size: sz, w: 700, c });
  b += head(cxs[0], '3', '3 copies') + head(cxs[1], '2', '2 kinds of storage') + head(cxs[2], '1', '1 copy kept away');
  // icon band: all three icons share the same vertical centre and a soft ground shadow
  const dcx = cxs[0] + cw / 2;
  b += ground(dcx, 176, 52);
  [[-34, '#dde7f5'], [-17, '#e9f0fa'], [0, '#fff']].forEach(([dx, f]) => { b += doc(dcx - 18 + dx + 34, 112, 40, 54, f); });
  b += label(dcx, 190, 'thesis.docx', B.blueInk, '#fff', 11) + cap(cxs[0], 220, 'the original and 2 backups');
  const lcx = cxs[1] + cw / 2;
  b += ground(lcx, 176, 58);
  b += laptop2(lcx - 54, 114, 64, screenLines());
  b += L(lcx + 14, 152, lcx + 30, 152, B.ink, 2) + R(lcx + 30, 120, 32, 50, { r: 7, f: '#3b4659', s: B.ink, sw: 2 }) + R(lcx + 36, 127, 20, 7, { r: 3, f: '#6b7a94', s: 'none', sw: 0 }) + C(lcx + 46, 160, 2.6, B.green, 'none', 0);
  b += cap(cxs[1], 192, 'laptop + external drive') + cap(cxs[1], 220, 'unplug the drive after', B.green);
  const ccx = cxs[2] + cw / 2;
  b += ground(ccx, 178, 50);
  b += P(`M${ccx - 44} ${166} Q${ccx - 60} ${166} ${ccx - 60} ${146} Q${ccx - 60} ${122} ${ccx - 32} ${124} Q${ccx - 26} ${100} ${ccx + 2} ${102} Q${ccx + 24} ${88} ${ccx + 42} ${108} Q${ccx + 60} ${108} ${ccx + 60} ${134} Q${ccx + 60} ${166} ${ccx + 38} ${166} Z`, '#e8f0fb', B.ink, 2.2) + check(ccx, 142, 1);
  b += cap(cxs[2], 192, 'cloud storage, or') + cap(cxs[2], 220, 'a drive at another place');
  return svgWrap(480, 256, 'The 3-2-1 backup rule, shown as three cards. Card 3: keep 3 copies of an important file such as thesis.docx, the original and 2 backups. Card 2: keep them on 2 kinds of storage, such as a laptop and an external drive you unplug after each backup. Card 1: keep 1 copy away, such as cloud storage or a drive kept at another place.', b);
}

/** If you were scammed: four steps, in order (redrawn chat 57: 2 x 2, bigger pictures and text). 480 x 432. */
export function reportPic() {
  let b = '';
  const box = (x, y, n, t1, a, c) => R(x, y, 228, 204, { r: 14, f: SOFT, s: 'none', sw: 0 }) + stHead(x + 12, y + 12, n, t1) + T(x + 44, y + 50, a, { size: 12, w: 700, a: 'start', c: B.soft }) + T(x + 44, y + 66, c, { size: 12, w: 700, a: 'start', c: B.soft });
  b += box(8, 8, 1, 'Call your bank', 'or e-wallet. Ask them to', 'freeze the account.') + box(244, 8, 2, 'Report to 1326', 'the national anti-scam', 'hotline (free, 24/7)');
  b += box(8, 220, 3, 'Change passwords', 'Start with your email.', 'Turn on MFA.') + box(244, 220, 4, 'Keep proof', 'Take screenshots.', 'Do not delete the chat.');
  // 1 bank / e-wallet frozen
  b += phone2(60, 84, 62, 116, walletScreen('FROZEN', B.red)) + person2(172, 112, 0.82, { shirt: B.green }) + bubble(136, 80, 90, 26, 166, 112, '#fff') + T(181, 97.5, 'Freeze it!', { size: 11.5, c: B.ink });
  // 2 call 1326
  b += phone2(318, 84, 62, 116, (x, y, w, h) => R(x, y, w, h, { r: 8, f: '#2f3d55', s: 'none', sw: 0 }) + T(x + w / 2, y + 30, '1326', { size: 17, c: '#fff', mono: true }) + T(x + w / 2, y + 46, 'calling…', { size: 9, w: 600, c: '#c9d3e3' }) + C(x + w / 2, y + h - 16, 9, '#d4422f', 'none', 0)) + [10, 18, 26].map((r) => P(`M${390 + r * 0.5} ${140 - r * 0.8} A${r} ${r} 0 0 1 ${390 + r * 0.5} ${140 + r * 0.8}`, 'none', B.blueMid, 2.4)).join('');
  // 3 new password + shield
  b += R(36, 300, 170, 34, { r: 17, f: '#fff', s: '#b7bfcc', sw: 1.6 }) + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => C(58 + k * 15, 317, 3.6, B.ink, 'none', 0)).join('') + shield2(84, 346, 0.7, B.greenWash) + check(104, 366, 0.8) + T(160, 378, 'new and long', { size: 12, w: 700, c: B.green });
  // 4 screenshots
  b += [0, 1, 2].map((k) => R(290 + k * 22, 292 + k * 10, 62, 100, { r: 7, f: '#fff', sw: 1.8 }) + R(296 + k * 22, 300 + k * 10, 50, 16, { r: 4, f: k === 2 ? '#fdeee9' : B.blueWash, s: 'none', sw: 0 }) + L(298 + k * 22, 328 + k * 10, 338 + k * 22, 328 + k * 10, B.line, 2.6) + L(298 + k * 22, 338 + k * 10, 330 + k * 22, 338 + k * 10, B.line, 2.6) + L(298 + k * 22, 348 + k * 10, 336 + k * 22, 348 + k * 10, B.line, 2.6)).join('');
  b += T(357, 328, 'scam link', { size: 8, c: B.red, mono: true }) + T(436, 360, 'proof', { size: 12, c: B.blueInk });
  return svgWrap(480, 432, 'Four steps after a scam: 1, call your bank or e-wallet and ask them to freeze the account; 2, report to 1326, the free 24/7 national anti-scam hotline; 3, change your passwords, starting with your email, and turn on MFA; 4, take screenshots as proof, and do not delete the chat.', b);
}

/* =====================================================================
   chat 57 round 7 (her request): each kind of malware, step by step, with realistic pictures
   (real-looking windows, file lists, phones). malwareStep(kind, i): i = 0 how it starts, 1 what happens next, 2 the result.
   480 x 260, one soft stage, labels apart from the drawing. Made-up names only.
   ===================================================================== */
const stage = () => R(4, 4, 472, 252, { r: 14, f: SOFT, s: 'none', sw: 0 });
const winBox = (x, y, w, h, title, f = '#e4e9f1') => R(x, y, w, h, { r: 8, f: '#fff', sw: 2 }) + winTitle(x, y, w, title, f);
// a program file: blue body with a name; virus = red strip of hidden code added at its end
const progFile = (x, y, name, virus = false, w = 108) => {
  let g = R(x, y, w, 30, { r: 6, f: '#fff', s: '#b7c3d6', sw: 1.4 }) + R(x + 7, y + 8, 14, 14, { r: 3, f: '#3b4659', s: 'none', sw: 0 }) + R(x + 9.5, y + 10.5, 9, 3.5, { r: 1, f: '#8fb0dc', s: 'none', sw: 0 });
  g += T(x + 27, y + 19.5, name, { size: 10.5, w: 700, a: 'start', c: B.ink, mono: true });
  if (virus) g += R(x + w - 14, y + 4, 9, 22, { r: 3, f: B.red, s: 'none', sw: 0 }) + bug(x + w - 4, y - 2, 0.38);
  return g;
};
const tag = (x, y, t, c = B.soft, size = 11.5, a = 'middle') => T(x, y, t, { size, w: 700, a, c });
const redTag = (x, y, t) => label(x, y, t, B.red, '#fdeee9', 11.5);
const okTag = (x, y, t) => label(x, y, t, B.green, '#e3f3e9', 11.5);
const pcMini = (x, y, state) => pc2(x, y, 52, (px, py, w, h) => R(px, py, w, h, { r: 0, f: state === 'bad' ? '#f6d5d0' : '#e8f0fb', s: 'none', sw: 0 }) + R(px + 3, py + 3, w * 0.6, 3, { r: 1, f: state === 'bad' ? '#e8a99f' : '#b7c7e0', s: 'none', sw: 0 }) + R(px + 3, py + 9, w * 0.4, 3, { r: 1, f: state === 'bad' ? '#e8a99f' : '#b7c7e0', s: 'none', sw: 0 }));
const dashArrow = (x1, y1, x2, y2, c = B.red) => `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/>` + ARROW(x1 + (x2 - x1) * 0.8, y1 + (y2 - y1) * 0.8, x2, y2, c, 2);

export function malwareStep(kind, i) {
  let b = stage(), alt = '';
  if (kind === 'virus') {
    if (i === 0) {
      // top: the email with the attachment
      b += winBox(14, 8, 300, 98, 'Mail');
      b += C(36, 48, 10, '#7a8aa3', 'none', 0) + T(36, 52, 'C', { size: 10, c: '#fff' }) + T(52, 46, 'Carlo (classmate)', { size: 11.5, a: 'start', c: B.ink }) + T(52, 61, 'Fun reviewer game for the exam!', { size: 10, w: 700, a: 'start', c: B.soft });
      b += progFile(26, 70, 'ReviewerGame.exe', false, 150) + tag(184, 89, '← she opens it', B.blueInk, 11, 'start');
      b += girl(360, 38, 0.8, { shirt: B.green });
      // split: what is inside the file
      b += R(14, 112, 452, 138, { r: 10, f: '#fff', s: '#c9d2df', sw: 1.4 }) + T(28, 132, 'Inside the file, there are two parts:', { size: 12, w: 700, a: 'start', c: B.ink });
      // left: the game she sees
      b += R(28, 144, 150, 96, { r: 8, f: '#dfe9f6', s: 'none', sw: 0 }) + T(103, 163, 'PART 1', { size: 10, c: B.blueInk }) + R(44, 172, 118, 40, { r: 5, f: '#fff', s: '#b7c7e0', sw: 1.2 }) + T(103, 190, 'the game', { size: 12, c: B.ink }) + T(103, 203, 'she sees it', { size: 9.5, w: 700, c: B.soft }) + T(103, 230, '(looks normal)', { size: 10.5, w: 700, c: B.soft });
      // right: the pretend hidden code, in a dark box (not a real program)
      b += R(192, 144, 262, 96, { r: 8, f: '#1f2a3d', s: 'none', sw: 0 }) + R(192, 144, 262, 18, { r: 8, f: '#2c3a54', s: 'none', sw: 0 }) + `<rect x="192" y="153" width="262" height="9" fill="#2c3a54"/>` + T(206, 157, 'PART 2: hidden code (not a real program)', { size: 9.5, w: 700, a: 'start', c: '#c9d5e6', mono: true });
      const vcode = [['when this file is opened:', '#7fd39b'], ['  1. start the game', '#c9d5e6'], ['  2. find other programs', '#c9d5e6'], ['  3. copy my code into them', '#ff9f8f'], ['  4. do this again each time', '#ff9f8f']];
      vcode.forEach(([t, c], k) => { b += T(206, 178 + k * 13.6, t, { size: 10, w: 600, a: 'start', c, mono: true }); });
      alt = 'An email from a classmate has an attachment, ReviewerGame.exe. Inside the file are two parts. Part 1 is the game she sees, which looks normal. Part 2 is hidden pretend code (not a real program) that reads: when this file is opened, start the game, find other programs, copy my code into them, and do this again each time.';
    } else if (i === 1) {
      b += winBox(24, 22, 270, 214, 'This PC > Programs');
      const files = [['ReviewerGame.exe', 1], ['Paint.exe', 1], ['Calculator.exe', 0], ['Notes.exe', 1], ['Typing.exe', 0]];
      files.forEach(([n, v], k) => { b += progFile(40, 58 + k * 35, n, v, 190); });
      b += redTag(370, 72, 'virus is running');
      [108, 178].forEach((y) => { b += P(`M232 73 Q272 ${(73 + y) / 2} 236 ${y}`, 'none', B.red, 1.8) + ARROW(244, y - 5, 236, y, B.red, 1.8); });
      b += tag(386, 120, 'It copies its code', B.ink, 12.5) + tag(386, 137, 'into other programs', B.ink, 12.5) + tag(386, 154, 'on her computer.', B.ink, 12.5);
      b += tag(386, 190, 'She notices nothing.', B.soft, 12) + tag(386, 207, 'The programs still work.', B.soft, 12);
      alt = 'A list of programs on her computer. The virus copies its red code into Paint.exe and Notes.exe. The programs still work, so she notices nothing.';
    } else {
      b += laptop2(30, 70, 110, (x, y, w, h) => R(x + 6, y + 8, w - 12, 26, { r: 4, f: '#fff', s: '#c9d2df', sw: 1 }) + T(x + w / 2, y + 25, 'Paint.exe', { size: 9, c: B.ink, mono: true }) + R(x + w - 18, y + 10, 5, 22, { r: 2, f: B.red, s: 'none', sw: 0 }));
      b += tag(85, 178, "Jessa's laptop", B.soft);
      b += R(176, 104, 12, 26, { r: 3, f: B.blue, sw: 1.6 }) + R(178.5, 96, 7, 9, { r: 1.5, f: '#c8ced8', sw: 1.2 }) + P('M146 118 L170 118', 'none', B.ink, 2) + ARROW(194, 118, 238, 118, B.red, 2.2) + tag(182, 150, 'USB or chat', B.soft);
      b += laptop2(250, 70, 110, (x, y, w, h) => R(x + 6, y + 8, w - 12, 26, { r: 4, f: '#fff', s: '#c9d2df', sw: 1 }) + T(x + w / 2, y + 25, 'Paint.exe', { size: 9, c: B.ink, mono: true }) + R(x + w - 18, y + 10, 5, 22, { r: 2, f: B.red, s: 'none', sw: 0 }));
      b += person2(410, 70, 0.9, { shirt: B.orange }) + tag(305, 178, "friend's laptop", B.soft);
      b += redTag(305, 52, 'opens it: infected');
      b += tag(240, 220, 'A virus spreads only when a person opens an infected file.', '#9c2f28', 12.5);
      alt = 'Jessa shares Paint.exe with a friend by USB or chat. The file has the virus code. When the friend opens it, the friend\'s laptop is infected too. A virus spreads only when a person opens an infected file.';
    }
  } else if (kind === 'worm') {
    const xs = [40, 120, 200, 280, 360];
    const upd = ['', 'missing update', 'updated', 'missing update', 'updated'];
    const tpts = [196, 221, 240, 259, 284]; // where each cable meets the TOP edge of the switch
    b += tag(240, 30, 'Office network', B.soft, 12);
    // cables first, each ending on the switch's top edge, so the switch (drawn after) covers the ends
    xs.forEach((x, k) => {
      b += P(`M${x + 34} 115 Q${x + 34} 190 ${tpts[k]} 198`, 'none', '#9aa6b8', 1.6);
    });
    // the switch, on top of the cable ends
    b += R(186, 196, 108, 24, { r: 6, f: '#e4e8ee', sw: 1.8 }) + T(240, 212.5, 'network switch', { size: 11, c: B.soft });
    // the computers and their labels
    xs.forEach((x, k) => {
      const st = i === 0 ? (k === 0 ? 'bad' : 'ok') : (k === 0 || k === 1 || k === 3 ? 'bad' : 'ok');
      b += pcMini(x + 8, 70, st);
      if (st === 'bad') b += bug(x + 58, 70, 0.5);
      if (k) b += tag(x + 34, 140, upd[k], upd[k] === 'updated' ? B.green : '#9c2f28', 10.5);
      else b += tag(x + 34, 140, 'infected first', '#9c2f28', 10.5);
    });
    if (i === 0) {
      b += envelope2(14, 150, 40, 26) + tag(34, 196, 'from email', B.soft, 10.5) + tag(34, 210, 'or Internet', B.soft, 10.5);
      b += tag(240, 244, 'The worm gets into one computer.', '#9c2f28', 12.5);
      alt = 'An office network of five computers on a switch. One computer is infected first, through an email or the Internet. Two other computers are missing an update; two are updated.';
    } else if (i === 1) {
      [120, 200, 280, 360].forEach((x, k) => { b += `<path d="M${78 + k * 4} 66 Q${(78 + x + 34) / 2} ${52 - k * 9} ${x + 30} 66" fill="none" stroke="${B.red}" stroke-width="1.6" stroke-dasharray="5 4"/>`; });
      [200, 360].forEach((x) => { b += check(x + 58, 74, 0.6); });
      b += tag(240, 244, 'It looks for the same security hole. No one clicks anything.', '#9c2f28', 12.5);
      alt = 'The infected computer sends copies of the worm to every computer on the network. The two computers missing an update get infected. The two updated computers block it.';
    } else {
      b = stage() + tag(240, 32, 'Each new copy does the same, over and over', B.ink, 13);
      // grid of many small computers, most infected
      for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) { const x = 34 + c * 42, y = 50 + r * 40, bad = (r * 10 + c) % 7 !== 3; b += R(x, y, 30, 20, { r: 3, f: bad ? '#f6d5d0' : '#e8f0fb', s: bad ? B.red : '#9aa6b8', sw: 1.4 }) + L(x + 15, y + 20, x + 15, y + 25, B.ink, 1.6) + L(x + 9, y + 26, x + 21, y + 26, B.ink, 1.6); }
      b += R(40, 214, 400, 34, { r: 10, f: '#fff', s: '#c9d2df', sw: 1.4 }) + T(240, 236, 'WannaCry worm, May 2017: over 200,000 computers in 150 countries', { size: 11.5, w: 800, c: '#9c2f28' });
      alt = 'A grid of 40 small computers, most of them red and infected. A note says the WannaCry worm in May 2017 infected over 200,000 computers in 150 countries.';
    }
  } else if (kind === 'trojan') {
    if (i === 0) {
      b += winBox(24, 20, 432, 226, 'free-softz.biz');
      b += R(40, 54, 400, 26, { r: 13, f: '#f1f3f6', s: '#b7bfcc', sw: 1.4 }) + T(56, 71.5, 'free-softz.biz/photo-editor-full-cracked', { size: 11, w: 700, a: 'start', c: B.ink, mono: true });
      b += T(240, 112, 'PhotoPro 2026 FULL VERSION', { size: 17, c: B.ink }) + T(240, 132, 'Free! No license needed (cracked)', { size: 12, w: 700, c: B.soft });
      b += R(160, 148, 160, 40, { r: 10, f: B.green, sw: 2 }) + T(240, 173, 'DOWNLOAD NOW', { size: 14, c: '#fff' }) + P('M300 176 L300 194 L304 190 L308 198 L311 196 L307 188 L313 188 Z', '#fff', B.ink, 1.4);
      b += tag(240, 220, 'A program that costs money, offered free on an unofficial site', '#9c2f28', 12);
      alt = 'A web page on free-softz.biz offers PhotoPro 2026 full version for free, cracked, with a big green Download now button.';
    } else if (i === 1) {
      b += winBox(24, 20, 220, 130, 'PhotoPro Setup') + T(134, 70, 'Installing PhotoPro…', { size: 12, c: B.ink }) + R(44, 84, 180, 12, { r: 6, f: '#eef1f5', s: '#c9d2df', sw: 1 }) + R(44, 84, 130, 12, { r: 6, f: B.green, s: 'none', sw: 0 }) + R(160, 112, 64, 24, { r: 5, f: '#e4e9f1', sw: 1.4 }) + T(192, 128.5, 'Next', { size: 11, c: B.ink });
      b += tag(134, 172, 'What she sees', B.soft, 12);
      b += R(270, 20, 186, 200, { r: 10, f: '#fff', s: B.red, sw: 1.8, dash: '6 4' }) + T(363, 42, 'What really happens', { size: 12, c: '#9c2f28' });
      b += R(286, 58, 154, 40, { r: 6, f: '#dfe9f6', s: 'none', sw: 0 }) + tag(363, 75, 'PhotoPro', B.blueInk, 12) + tag(363, 90, 'is installed', B.blueInk, 10.5);
      b += R(286, 108, 154, 58, { r: 6, f: '#fdeee9', s: 'none', sw: 0 }) + tag(363, 126, 'a hidden program', '#9c2f28', 12) + tag(363, 142, 'is installed too, and', '#9c2f28', 10.5) + tag(363, 156, 'starts with the computer', '#9c2f28', 10.5);
      b += tag(363, 188, 'It does not copy itself.', B.soft, 11) + tag(363, 204, 'She installed it herself.', B.soft, 11);
      alt = 'The installer shows a normal progress bar for PhotoPro. What really happens: PhotoPro is installed, and a hidden program is installed too, which starts every time the computer starts. A Trojan horse does not copy itself; she installed it herself.';
    } else {
      b += laptop2(30, 60, 120, (x, y, w, h) => R(x + 6, y + 8, w - 12, h - 16, { r: 3, f: '#fff', s: '#c9d2df', sw: 1 }) + T(x + w / 2, y + h / 2 + 3, 'PhotoPro', { size: 10, c: B.blueInk })) + tag(90, 178, 'her laptop', B.soft);
      b += dashArrow(162, 100, 300, 100) + R(176, 70, 116, 24, { r: 5, f: '#fdeee9', s: B.red, sw: 1.4 }) + T(234, 86.5, 'saved passwords', { size: 11, c: B.red });
      b += dashArrow(300, 140, 162, 140) + R(176, 146, 116, 24, { r: 5, f: '#fdeee9', s: B.red, sw: 1.4 }) + T(234, 162.5, 'remote control', { size: 11, c: B.red });
      b += laptop2(312, 70, 96, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#1f2a3d', s: 'none', sw: 0 }) + T(x + 5, y + 14, 'mia@... : Mia2007!', { size: 7.5, a: 'start', c: '#ff9f8f', mono: true }) + T(x + 5, y + 28, 'ben@... : ben1234', { size: 7.5, a: 'start', c: '#ff9f8f', mono: true })) + hacker2(436, 78, 0.6) + tag(380, 178, 'criminal', B.soft);
      b += tag(240, 222, 'The hidden program sends her passwords and lets the criminal in.', '#9c2f28', 12);
      alt = 'The hidden program on her laptop sends her saved passwords to the criminal and lets the criminal control her computer from far away.';
    }
  } else if (kind === 'ransom') {
    if (i === 0) {
      b += mailWin(18, 22, 266, { subject: 'URGENT: Unpaid invoice', name: 'Supplier Billing', email: 'billing@sup-vendor.ph', avatar: '#a6461f', badge: 'S', date: 'Today 9:12 AM', body: ['Good day. Please see the', 'attached invoice and pay', 'within 24 hours.'], file: 'Invoice_Nov.zip', fileType: 'ZIP', badgeColor: '#c77d12', size: '2.3 MB' });
      b += tag(372, 40, 'An office clerk', B.blueInk, 11.5) + tag(372, 56, 'opens it.', B.blueInk, 11.5) + person2(372, 82, 0.8, { shirt: '#7a8aa3' }) + ARROW(338, 108, 288, 120, B.blueInk, 2);
      b += tag(392, 176, 'Some gangs break in', B.soft, 11) + tag(392, 192, 'another way, through', B.soft, 11) + tag(392, 208, 'old servers that were', B.soft, 11) + tag(392, 224, 'never updated.', B.soft, 11);
      alt = 'An urgent email from Supplier Billing asks the clerk to pay an unpaid invoice today. The attachment is Invoice_Nov.zip. An office clerk opens it. Some gangs break in through old, unpatched servers instead.';
    } else if (i === 1) {
      b += winBox(24, 20, 230, 214, 'Shared folder: Office files');
      ['payroll.xlsx', 'contracts.pdf', 'clients.docx', 'photos.zip', 'report.docx'].forEach((n, k) => { const done = k < 3; b += lockMini(46, 70 + k * 32, done ? '#f2c48a' : '#d3dbe6') + T(60, 73 + k * 32, done ? n + '.locked' : n, { size: 11, a: 'start', c: done ? '#9c2f28' : B.ink, mono: true }); });
      b += tag(139, 228, 'locked one by one', '#9c2f28', 11.5);
      b += dashArrow(262, 70, 352, 70) + tag(306, 60, 'copies files out', '#9c2f28', 11) + server2(362, 40, 40, 66) + tag(382, 124, "gang's server", B.soft, 11);
      b += R(272, 150, 184, 58, { r: 8, f: '#fff', s: '#c9d2df', sw: 1.4 }) + tag(364, 172, 'backup copies on this PC', B.ink, 11.5) + tag(364, 192, 'deleted', '#9c2f28', 12) + cross(440, 186, 0.6);
      b += tag(364, 232, 'All of this happens quietly.', B.soft, 11.5);
      alt = 'Quietly, the ransomware copies the office files out to the gang\'s server, locks the files one by one (payroll.xlsx.locked, contracts.pdf.locked), and deletes the backup copies on the computer.';
    } else {
      b += pc2(40, 30, 220, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#7a1f1a', s: 'none', sw: 0 }) + T(x + w / 2, y + 26, 'YOUR FILES ARE LOCKED', { size: 13, c: '#fff', mono: true }) + T(x + w / 2, y + 50, 'Pay US$5,000 in bitcoin', { size: 10.5, c: '#ffd2c7', mono: true }) + T(x + w / 2, y + 68, 'or we post your files online.', { size: 9.5, c: '#ffd2c7', mono: true }) + R(x + w / 2 - 50, y + 80, 100, 24, { r: 4, f: '#4d1210', s: 'none', sw: 0 }) + T(x + w / 2, y + 97, '71:59:42', { size: 14, c: '#fff', mono: true }));
      b += tag(150, 196, 'the ransom note', B.soft);
      b += R(290, 40, 166, 150, { r: 10, f: '#fff', s: '#c9d2df', sw: 1.4 }) + T(373, 64, 'What to do', { size: 13, c: B.green });
      [['Unplug from the network', 0], ['Tell IT or the owner', 1], ['Restore from a backup', 2], ['Do not pay', 3]].forEach(([t, k]) => { b += check(306, 86 + k * 28, 0.55) + T(318, 90 + k * 28, t, { size: 11, w: 700, a: 'start', c: B.ink }); });
      b += tag(240, 232, 'Paying does not promise you get the files back.', '#9c2f28', 12);
      alt = 'A ransom note: your files are locked, pay US$5,000 in bitcoin or we post your files online, with a countdown timer. Beside it, what to do: unplug from the network, tell IT or the owner, restore from a backup, do not pay.';
    }
  } else if (kind === 'spyware') {
    if (i === 0) {
      b += girl(58, 64, 0.95, { shirt: B.blue }) + desk(14, 162, 210);
      b += pc2(100, 56, 120, (x, y, w, h) => R(x, y, w, 10, { r: 0, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 8, 'PeraBank', { size: 7, c: '#fff' }) + R(x + 10, y + 18, w - 20, 11, { r: 2, f: '#fff', s: '#b7bfcc', sw: 0.8 }) + T(x + 14, y + 26, 'mia.santos@...', { size: 6.5, w: 700, a: 'start', c: B.ink }) + R(x + 10, y + 34, w - 20, 11, { r: 2, f: '#fff', s: '#b7bfcc', sw: 0.8 }) + T(x + 14, y + 42, '••••••••', { size: 7, w: 700, a: 'start', c: B.ink }));
      b += tag(160, 204, 'a computer at a computer shop', B.soft);
      b += zoomLines(220, 70, 220, 120, 266, 40, 266, 190);
      b += R(266, 40, 190, 150, { r: 10, f: '#fff', s: B.red, sw: 1.8, dash: '6 4' }) + T(361, 62, 'Hidden on this computer', { size: 11.5, c: '#9c2f28' });
      b += R(280, 76, 162, 30, { r: 6, f: '#fdeee9', s: 'none', sw: 0 }) + T(361, 95.5, 'keylogger (running)', { size: 11, c: B.ink, mono: true });
      b += tag(361, 128, 'Someone installed it earlier,', B.soft, 11) + tag(361, 143, 'or it came with a free app.', B.soft, 11) + tag(361, 172, 'No window, no icon.', B.soft, 11);
      alt = 'Mia logs in to PeraBank on a computer at a computer shop. Hidden on the computer, a keylogger is running. Someone installed it earlier, or it came with a free app. It has no window and no icon.';
    } else if (i === 1) {
      b += winBox(24, 20, 270, 214, 'log.txt (hidden file)');
      ['09:41  perabank.ph', '09:41  mia.santos@mail.ph', '09:42  Mia2007!', '09:45  messenger.com', '09:46  "see you later"'].forEach((t, k) => { b += T(40, 70 + k * 30, t, { size: 11, w: 700, a: 'start', c: k === 2 ? B.red : B.ink, mono: true }); });
      b += R(34, 114, 242, 23, { r: 4, f: 'rgba(178,58,51,0.08)', s: B.red, sw: 1.4 });
      b += tag(386, 100, 'Every key she presses', B.ink, 12.5) + tag(386, 118, 'is saved, with the time.', B.ink, 12.5) + tag(386, 152, 'Some spyware also takes', B.soft, 11.5) + tag(386, 168, 'screenshots and records', B.soft, 11.5) + tag(386, 184, 'the sites she visits.', B.soft, 11.5);
      alt = 'A hidden file, log.txt, lists what Mia typed with the time: perabank.ph, her email, her password Mia2007!, and messages. Some spyware also takes screenshots and records the sites she visits.';
    } else {
      b += pc2(30, 60, 110, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#e8f0fb', s: 'none', sw: 0 }) + doc(x + 34, y + 8, 30, 38)) + tag(85, 160, 'shop computer', B.soft);
      b += dashArrow(150, 100, 290, 100) + T(220, 90, 'log.txt sent', { size: 11, c: '#9c2f28' });
      b += laptop2(300, 60, 100, (x, y, w, h) => R(x, y, w, 10, { r: 0, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 8, 'PeraBank', { size: 7, c: '#fff' }) + T(x + w / 2, y + 28, 'Welcome, Mia', { size: 8, c: B.ink }) + T(x + w / 2, y + 42, 'Send money ›', { size: 7.5, c: B.red })) + hacker2(434, 66, 0.62) + tag(370, 160, 'criminal, far away', B.soft);
      b += tag(240, 206, 'He logs in as Mia with the stolen password.', '#9c2f28', 12.5) + tag(240, 226, 'This is why MFA (a second proof) matters.', B.green, 12);
      alt = 'The log file is sent to a criminal far away, who logs in to PeraBank as Mia with the stolen password. A second proof, MFA, would stop him.';
    }
  } else {
    // mobile malware
    const phoneAt = (x, y, content) => phone2(x, y, 120, 210, content, '#f7f9fc');
    if (i === 0) {
      // a realistic Messages screen. A clean status bar covers the default phone stubs at the top.
      b += phoneAt(34, 18, (x, y, w, h) => {
        let g = R(x, y - 8, w, 54, { r: 16, f: '#f4f6f9', s: 'none', sw: 0 });
        // status bar: time + battery
        g += T(x + 14, y + 1, '9:41', { size: 7.5, a: 'start', c: B.ink });
        g += R(x + w - 26, y - 4, 13, 7, { r: 1.5, f: 'none', s: '#6b7a94', sw: 1 }) + R(x + w - 12, y - 2, 1.4, 3, { r: 0.6, f: '#6b7a94', s: 'none', sw: 0 }) + R(x + w - 24.5, y - 2.5, 9, 4, { r: 0.6, f: B.green, s: 'none', sw: 0 });
        // conversation header: back chevron, sender number, "Text Message"
        g += P(`M${x + 12} ${y + 22} l6 -5 M${x + 12} ${y + 22} l6 5`, 'none', B.blue, 2);
        g += T(x + w / 2, y + 20, '+63 905 712 3348', { size: 8, c: B.ink }) + T(x + w / 2, y + 31, 'Text Message', { size: 7, w: 600, c: B.greyInk });
        g += L(x, y + 38, x + w, y + 38, '#dbe1ea', 1);
        g += T(x + w / 2, y + 56, 'Today 9:41 AM', { size: 7, w: 600, c: B.greyInk });
        const bx = x + 8, bw = w - 26;
        g += R(bx, y + 64, bw, 72, { r: 12, f: '#e6ebf2', s: 'none', sw: 0 }) + P(`M${bx} ${y + 80} l-5 4 l5 4 Z`, '#e6ebf2', 'none', 0);
        g += T(bx + 10, y + 80, 'FREE ₱500 LOAD!', { size: 8.5, a: 'start', c: B.ink }) + T(bx + 10, y + 94, 'Claim your PeraBonus', { size: 7.5, w: 600, a: 'start', c: B.ink }) + T(bx + 10, y + 105, 'now. Get the app:', { size: 7.5, w: 600, a: 'start', c: B.ink });
        g += T(bx + 10, y + 122, 'perabonus.apk', { size: 8, a: 'start', c: '#2563c9', mono: true }) + L(bx + 10, y + 125, bx + 62, y + 125, '#2563c9', 0.9);
        return g;
      });
      b += tag(94, 246, 'a text from an unknown number', B.soft, 11);
      b += zoomLines(158, 124, 158, 140, 232, 74, 232, 182);
      // right: a clean "app file" card with an app icon, with room below the last line
      b += R(232, 52, 224, 166, { r: 12, f: '#fff', s: '#c9d2df', sw: 1.4 });
      b += R(250, 70, 44, 44, { r: 11, f: '#2e7d4f', s: B.ink, sw: 1.4 }) + C(272, 88, 4, '#fff', 'none', 0) + T(272, 106, '₱', { size: 17, c: '#fff' });
      b += T(306, 84, 'perabonus.apk', { size: 12.5, a: 'start', c: B.ink, mono: true }) + T(306, 102, 'Android app file (APK)', { size: 10, w: 600, a: 'start', c: B.greyInk });
      b += L(250, 126, 438, 126, '#eceff3', 1.4);
      b += R(250, 140, 18, 18, { r: 4, f: '#fdeee9', s: '#e3b3a3', sw: 1.2 }) + T(259, 153, '!', { size: 12, c: B.red });
      b += T(276, 147, 'It came from a link,', { size: 11, w: 700, a: 'start', c: '#9c2f28' }) + T(276, 161, 'not from Google Play.', { size: 11, w: 700, a: 'start', c: '#9c2f28' });
      b += T(250, 186, 'Real app stores check an app', { size: 10.5, w: 600, a: 'start', c: B.soft }) + T(250, 198, 'before you can install it.', { size: 10.5, w: 600, a: 'start', c: B.soft });
      alt = 'A text message from an unknown number says "FREE PHP 500 load! Claim your PeraBonus now. Get the app: perabonus.apk". A card on the right shows perabonus.apk is an Android app file (APK) that came from a link, not from Google Play, where apps are checked before you can install them.';
    } else if (i === 1) {
      b += phoneAt(40, 22, (x, y, w, h) => R(x, y, w, h, { r: 6, f: '#5d6880', s: 'none', sw: 0 }) + R(x + 6, y + 40, w - 12, 108, { r: 10, f: '#fff', s: 'none', sw: 0 }) + T(x + w / 2, y + 62, 'Install unknown', { size: 9, c: B.ink }) + T(x + w / 2, y + 74, 'apps?', { size: 9, c: B.ink }) + T(x + w / 2, y + 92, 'Your phone is safer', { size: 7.5, w: 700, c: B.soft }) + T(x + w / 2, y + 102, 'without them.', { size: 7.5, w: 700, c: B.soft }) + T(x + 28, y + 132, 'Cancel', { size: 8.5, c: B.blue }) + R(x + w - 52, y + 122, 42, 16, { r: 8, f: B.blue, s: 'none', sw: 0 }) + T(x + w - 31, y + 133, 'Allow', { size: 8.5, c: '#fff' }));
      b += tag(100, 250, 'warning 1: unknown apps', B.soft);
      b += phoneAt(250, 22, (x, y, w, h) => R(x, y, w, h, { r: 6, f: '#5d6880', s: 'none', sw: 0 }) + R(x + 6, y + 30, w - 12, 128, { r: 10, f: '#fff', s: 'none', sw: 0 }) + T(x + w / 2, y + 52, 'Allow PeraBonus to', { size: 8.5, c: B.ink }) + T(x + w / 2, y + 64, 'read your SMS?', { size: 8.5, c: B.ink }) + L(x + 14, y + 76, x + w - 14, y + 76, '#e1e6ee', 1) + T(x + w / 2, y + 94, 'Allow PeraBonus to', { size: 8.5, c: B.ink }) + T(x + w / 2, y + 106, 'control your screen?', { size: 8.5, c: B.ink }) + R(x + 16, y + 124, w - 32, 18, { r: 9, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 136.5, 'Allow', { size: 8.5, c: '#fff' }));
      b += tag(310, 250, 'warning 2: permissions', B.soft);
      b += tag(205, 128, 'He taps', '#9c2f28', 11.5) + tag(205, 144, 'Allow', '#9c2f28', 11.5) + tag(205, 160, 'twice.', '#9c2f28', 11.5);
      alt = 'Two phone screens. Warning 1: Install unknown apps? Your phone is safer without them, with Cancel and Allow. Warning 2: Allow PeraBonus to read your SMS? Allow PeraBonus to control your screen? He taps Allow both times.';
    } else {
      b += phoneAt(40, 22, (x, y, w, h) => R(x + 6, y + 6, w - 12, 46, { r: 8, f: '#e6ebf2', s: 'none', sw: 0 }) + T(x + 12, y + 20, 'PeraPay', { size: 8, a: 'start', c: B.soft }) + T(x + 12, y + 34, 'Your OTP is 482916.', { size: 8.5, a: 'start', c: B.ink }) + T(x + 12, y + 45, 'Do not share it.', { size: 7.5, w: 700, a: 'start', c: B.soft }) + [0, 1, 2, 3, 4, 5].map((k) => R(x + 12 + (k % 3) * 30, y + 70 + Math.floor(k / 3) * 34, 22, 22, { r: 6, f: ['#8fb0dc', '#9fd3ae', '#f2c48a', '#c9b3e6', '#f8c9c2', '#e8b94a'][k], s: 'none', sw: 0 })).join('') + T(x + w / 2, y + 152, 'no PeraBonus icon', { size: 7.5, w: 700, c: B.soft }));
      b += tag(100, 250, 'his phone', B.soft);
      b += dashArrow(168, 70, 316, 70) + T(242, 60, 'OTP copied', { size: 11, c: '#9c2f28' });
      b += laptop2(326, 50, 90, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#1f2a3d', s: 'none', sw: 0 }) + T(x + 5, y + 14, 'OTP: 482916', { size: 8, a: 'start', c: '#ff9f8f', mono: true }) + T(x + 5, y + 28, 'send ₱9,800', { size: 8, a: 'start', c: '#ff9f8f', mono: true })) + hacker2(440, 60, 0.55);
      b += tag(318, 152, 'The app hides its icon,', B.ink, 12) + tag(318, 170, 'reads his texts, and sends', B.ink, 12) + tag(318, 188, 'his OTPs to the criminal.', B.ink, 12) + tag(318, 216, 'The criminal moves his money.', '#9c2f28', 12);
      alt = 'His phone gets a PeraPay OTP text. The malware app has hidden its icon. It copies the OTP to the criminal, who uses it to send ₱9,800 from his account.';
    }
  }
  return svgWrap(480, 260, alt, b);
}

/* =====================================================================
   chat 57 round 12 (her request): a "featured case" card for a famous real incident, with a detailed drawing.
   iloveyouPic: the ILOVEYOU email worm (Manila, 2000). 480 x 250. House style, no photos.
   ===================================================================== */
export function iloveyouPic() {
  let b = stage();
  // left: a realistic email reading pane, with room to breathe inside the window
  b += winBox(10, 10, 294, 232, 'Mail');
  // subject line + star (sits below the title bar with a clear gap)
  b += T(30, 60, 'ILOVEYOU', { size: 15, a: 'start', c: B.ink }) + `<path d="M0 0 l3 6 6.6 1 -4.8 4.6 1.1 6.6 -5.9 -3.1 -5.9 3.1 1.1 -6.6 -4.8 -4.6 6.6 -1 Z" transform="translate(272 48)" fill="none" stroke="#b7bfcc" stroke-width="1.4" stroke-linejoin="round"/>`;
  // sender row: avatar, name, date; "to: me"
  b += C(40, 80, 11, '#6b7a94', 'none', 0) + T(40, 84, 'A', { size: 11, c: '#fff' }) + T(56, 76, 'Arnel Cruz', { size: 11.5, a: 'start', c: B.ink }) + T(56, 90, 'arnelcruz@email.ph', { size: 9.5, w: 600, a: 'start', c: B.greyInk });
  b += T(286, 76, 'May 4, 2000', { size: 9.5, w: 600, a: 'end', c: B.greyInk }) + T(286, 90, 'to: me', { size: 9.5, w: 600, a: 'end', c: B.greyInk });
  b += L(30, 102, 284, 102, '#e4e8ee', 1.4);
  // body text
  b += T(30, 122, 'Hi! kindly check the attached LOVE', { size: 11, w: 600, a: 'start', c: B.ink }) + T(30, 138, 'LETTER coming from me :-)', { size: 11, w: 600, a: 'start', c: B.ink });
  // attachment tile, like a real mail client
  b += R(30, 156, 258, 48, { r: 8, f: '#f7f9fc', s: '#d3dbe6', sw: 1.4 });
  // file icon: a document with a red .vbs type badge
  b += `<g transform="translate(44 165)">` + P('M0 0 L18 0 L26 8 L26 31 L0 31 Z', '#fff', '#9aa6b8', 1.6) + P('M18 0 L18 8 L26 8', '#e4e9f1', '#9aa6b8', 1.4) + R(-2, 19, 30, 12, { r: 2, f: B.red, s: 'none', sw: 0 }) + T(13, 28.5, 'VBS', { size: 8, c: '#fff' }) + '</g>';
  b += T(84, 176, 'LOVE-LETTER-FOR-YOU.TXT.vbs', { size: 10, a: 'start', c: B.ink, mono: true }) + T(84, 191, '10 KB', { size: 9.5, w: 600, a: 'start', c: B.greyInk });
  // download arrow
  b += `<g transform="translate(272 172)">` + L(0, -4, 0, 8, '#6b7a94', 1.8) + P('M-5 3 L0 9 L5 3', 'none', '#6b7a94', 1.8) + L(-6, 13, 6, 13, '#6b7a94', 1.8) + '</g>';
  // the real nature of the file
  b += T(30, 226, 'A file ending in .vbs is a program, not a letter.', { size: 10, w: 700, a: 'start', c: '#9c2f28' });
  // right: it mails itself out to the world. Clean, symmetric fan of envelopes from the globe edge.
  b += ARROW(300, 100, 326, 100, B.red, 2.4) + T(392, 40, 'When opened, it mails', { size: 11, w: 700, c: B.soft }) + T(392, 55, 'a copy of itself to', { size: 11, w: 700, c: B.soft }) + T(392, 70, 'everyone you know.', { size: 11, w: 700, c: B.soft });
  const gx = 392, gy = 150, gr = 34;
  const env = (x, y) => `<g transform="translate(${x} ${y})">` + R(-11, -8, 22, 16, { r: 2, f: '#fff', s: B.ink, sw: 1.6 }) + P('M-11 -8 L0 1 L11 -8', 'none', B.ink, 1.4) + '</g>';
  // four clean curved rays from the globe edge to four envelopes (no lines over the globe)
  const rays = [[-0.74, -0.67, 336, 104], [0.74, -0.67, 448, 104], [-0.74, 0.67, 336, 196], [0.74, 0.67, 448, 196]];
  rays.forEach(([ux, uy, ex, ey]) => { const sx = gx + ux * gr, sy = gy + uy * gr; b += P(`M${sx.toFixed(0)} ${sy.toFixed(0)} Q${((sx + ex) / 2).toFixed(0)} ${((sy + ey) / 2 - 6 * Math.sign(uy)).toFixed(0)} ${ex} ${ey}`, 'none', '#d78a6a', 1.6); });
  b += globe(gx, gy, gr);
  rays.forEach(([ux, uy, ex, ey]) => { b += env(ex, ey); });
  // Manila pin on the globe
  b += `<g transform="translate(${gx - 12} ${gy - 12})">` + P('M12 0 C5 0 0 5 0 12 C0 21 12 32 12 32 C12 32 24 21 24 12 C24 5 19 0 12 0 Z', B.red, B.ink, 1.6) + C(12, 11, 4.5, '#fff', 'none', 0) + '</g>';
  b += label(gx, 232, 'started in Manila', B.red, '#fff', 10.5);
  return svgWrap(480, 250, 'An email in an inbox from a classmate, with the subject ILOVEYOU and an attachment named LOVE-LETTER-FOR-YOU.TXT.vbs that hides a worm. When it is opened, it mails a copy of itself to everyone in the address book and spreads around the world. A pin marks Manila, where it started.', b);
}

/** Website defacement: the real site, then the same site changed by intruders. 480 x 250. */
export function defacePic() {
  let b = '';
  const browser = (x, y, w, hh, url, body, dark) => {
    let g = R(x, y, w, hh, { r: 10, f: dark ? '#1b1f2a' : '#fff', s: '#c9d2df', sw: 1.6 });
    g += R(x, y, w, 24, { r: 10, f: '#e9edf2', s: 'none', sw: 0 }) + `<rect x="${x + 1}" y="${y + 14}" width="${w - 2}" height="10" fill="#e9edf2"/>`;
    g += [0, 1, 2].map((k) => C(x + 12 + k * 10, y + 12, 3, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('');
    g += R(x + 46, y + 6, w - 58, 13, { r: 6.5, f: '#fff', s: '#cfd6e0', sw: 1 }) + T(x + 55, y + 16.5, url, { size: 8, a: 'start', c: dark ? '#6b7a94' : B.greyInk, mono: true });
    g += body(x, y + 24, w, hh - 24);
    return g;
  };
  // the real government site
  const realBody = (x, y, w, h) => {
    let g = R(x, y, w, 30, { r: 0, f: '#13407e', s: 'none', sw: 0 });
    g += C(x + 20, y + 15, 9, '#f2c94c', '#0d2e5c', 1) + `<path d="M${x + 20} ${y + 9} l1.6 3.3 3.6 .5 -2.6 2.5 .6 3.6 -3.2 -1.7 -3.2 1.7 .6 -3.6 -2.6 -2.5 3.6 -.5 Z" fill="#0d2e5c"/>`;
    g += T(x + 34, y + 13, 'Bureau of Public Records', { size: 8.5, a: 'start', c: '#fff' }) + T(x + 34, y + 24, 'Republic of the Philippines', { size: 7, w: 600, a: 'start', c: '#bcd0ea' });
    g += R(x, y + 30, w, 12, { r: 0, f: '#0d2e5c', s: 'none', sw: 0 }) + ['Home', 'Services', 'News', 'Contact'].map((t, k) => T(x + 12 + k * 34, y + 38.5, t, { size: 6.5, a: 'start', c: '#dbe6f4' })).join('');
    g += R(x + 12, y + 52, w - 24, 20, { r: 4, f: '#eef3fb', s: 'none', sw: 0 }) + T(x + 22, y + 65, 'Welcome to the official website', { size: 8, a: 'start', c: '#13407e' });
    [0, 1, 2].forEach((k) => { g += R(x + 12 + k * ((w - 24) / 3 + 2), y + 80, (w - 24) / 3 - 6, 34, { r: 4, f: '#fff', s: '#dbe1ea', sw: 1 }) + R(x + 16 + k * ((w - 24) / 3 + 2), y + 84, (w - 24) / 3 - 14, 10, { r: 2, f: '#cfe0f3', s: 'none', sw: 0 }) + L(x + 16 + k * ((w - 24) / 3 + 2), y + 100, x + 16 + k * ((w - 24) / 3 + 2) + (w - 24) / 3 - 16, y + 100, '#e1e6ee', 2) + L(x + 16 + k * ((w - 24) / 3 + 2), y + 107, x + 16 + k * ((w - 24) / 3 + 2) + (w - 24) / 3 - 24, y + 107, '#e1e6ee', 2); });
    return g;
  };
  // the defaced site
  const hackBody = (x, y, w, h) => {
    let g = R(x, y, w, h, { r: 0, f: '#141821', s: 'none', sw: 0 });
    g += C(x + w / 2, y + 30, 16, 'none', B.red, 2) + P(`M${x + w / 2 - 7} ${y + 24} l14 12 M${x + w / 2 + 7} ${y + 24} l-14 12`, 'none', B.red, 2.4);
    g += T(x + w / 2, y + 62, 'HACKED', { size: 20, c: '#e8514a' });
    g += T(x + w / 2, y + 82, 'Your website is not secure.', { size: 8.5, w: 600, c: '#c3ccda' });
    g += T(x + w / 2, y + 98, '#FIX_YOUR_SECURITY', { size: 8.5, c: '#5fae6b', mono: true });
    g += T(x + w / 2, y + 116, '— unknown group', { size: 7.5, w: 600, c: '#7a8596' });
    return g;
  };
  b += browser(8, 20, 224, 164, 'records.gov.ph', realBody, false) + label(120, 206, 'Before (the real site)', '#2f6b45', '#e3f3e9', 11.5);
  b += browser(248, 20, 224, 164, 'records.gov.ph', hackBody, true) + label(360, 206, 'After (changed by intruders)', B.red, '#fdeee9', 11.5);
  b += ARROW(232, 102, 248, 102, B.red, 2.6);
  return svgWrap(480, 230, 'Two browser windows side by side. On the left, labeled Before, the real website of a government office, the Bureau of Public Records, with a blue header and normal content. On the right, labeled After, the same web address shows a black page that says HACKED, your website is not secure, with a protest hashtag, left by an unknown group.', b);
}

/** How antivirus works: it scans files, flags a known threat, and moves it to quarantine. 480 x 232. */
export function antivirusPic() {
  let b = '';
  // left: a realistic "Security" app window scanning files
  b += R(10, 14, 268, 204, { r: 10, f: '#fff', s: '#c9d2df', sw: 1.6 }) + winTitle(10, 14, 268, 'Security');
  b += C(32, 56, 11, '#2e7d4f', 'none', 0) + P('M27 56 l3.5 3.5 l6 -7', 'none', '#fff', 2.4) + T(48, 52, 'Antivirus', { size: 12, a: 'start', c: B.ink }) + T(48, 66, 'Scanning your files…', { size: 9.5, w: 600, a: 'start', c: B.greyInk });
  b += R(48, 72, 214, 7, { r: 3.5, f: '#eef1f5', s: '#d3dbe6', sw: 1 }) + R(48, 72, 150, 7, { r: 3.5, f: '#2e7d4f', s: 'none', sw: 0 });
  const row = (y, name, bad) => {
    let g = R(24, y, 240, 32, { r: 7, f: bad ? '#fdeee9' : '#f7faf8', s: bad ? '#e3b3a3' : '#dbe6de', sw: 1.2 });
    g += `<g transform="translate(34 ${y + 6})">` + P('M0 0 L13 0 L19 6 L19 20 L0 20 Z', '#fff', '#9aa6b8', 1.4) + P('M13 0 L13 6 L19 6', '#e4e9f1', '#9aa6b8', 1.2) + '</g>';
    g += T(62, y + 20, name, { size: 10.5, a: 'start', c: B.ink, mono: true });
    if (bad) g += R(176, y + 7, 78, 18, { r: 9, f: B.red, s: 'none', sw: 0 }) + T(215, y + 19.5, 'threat', { size: 10, c: '#fff' });
    else g += C(246, y + 16, 9, '#2e7d4f', 'none', 0) + P(`M242 ${y + 16} l3 3 l6 -6.5`, 'none', '#fff', 2);
    return g;
  };
  b += row(92, 'photo.jpg', false) + row(130, 'notes.docx', false) + row(168, 'FreeGame.exe', true);
  // right: the threat is moved to a locked quarantine box
  b += ARROW(278, 184, 318, 150, B.red, 2.4) + T(392, 36, 'The threat is moved to', { size: 11, w: 700, c: B.soft }) + T(392, 51, 'a locked box, away from', { size: 11, w: 700, c: B.soft }) + T(392, 66, 'your other files.', { size: 11, w: 700, c: B.soft });
  b += R(322, 86, 140, 96, { r: 10, f: '#fdf3f1', s: '#e3b3a3', sw: 1.6 }) + padlock2(382, 96, false, B.amber, 0.7) + T(392, 150, 'Quarantine', { size: 12.5, c: '#9c2f28' });
  b += `<g transform="translate(366 118)">` + P('M0 0 L13 0 L19 6 L19 22 L0 22 Z', '#fff', '#9aa6b8', 1.4) + R(-2, 14, 24, 9, { r: 2, f: B.red, s: 'none', sw: 0 }) + T(10, 21, 'EXE', { size: 6.5, c: '#fff' }) + '</g>';
  b += T(392, 168, 'FreeGame.exe', { size: 9, w: 600, c: B.greyInk, mono: true });
  b += T(392, 206, 'Your other files stay safe.', { size: 11, w: 700, c: '#2f6b45' });
  return svgWrap(480, 232, 'An antivirus app called Security scans a list of files. photo.jpg and notes.docx are marked safe with green checks. FreeGame.exe is marked as a threat in red. The antivirus moves that file to a locked Quarantine box, away from the other files, so the rest stay safe.', b);
}

/* =====================================================================
   chat 58 (her choice): two more Featured-case pictures, PhilHealth (ransomware, 2023) and Colonial Pipeline (ransomware, 2021).
   480 x 260, soft panels, numbered steps, labels apart from the drawing. Real event names (factual), no logos.
   ===================================================================== */
const caseNum = (x, y, n, c = B.orange) => C(x, y, 12, c, B.ink, 2) + T(x, y + 5, String(n), { size: 13, c: '#fff' });

/** Featured case: the PhilHealth ransomware attack (September 2023). 480 x 260. */
export function philhealthPic() {
  let b = R(4, 4, 472, 252, { r: 14, f: SOFT, s: 'none', sw: 0 });
  // left: an office computer showing the ransom note
  b += R(18, 22, 214, 150, { r: 6, f: '#2b3446', sw: 2 }) + R(25, 29, 200, 136, { r: 3, f: '#2a1416', s: 'none', sw: 0 });
  b += R(25, 29, 200, 22, { r: 3, f: '#b3261e', s: 'none', sw: 0 }) + T(125, 44.5, 'YOUR FILES ARE LOCKED', { size: 11, c: '#fff' });
  b += padlock2(110, 68, false, B.red, 0.62);
  b += T(125, 108, 'Pay US$300,000, or we will', { size: 10, w: 700, c: '#f4d6d2' }) + T(125, 122, 'post your data online.', { size: 10, w: 700, c: '#f4d6d2' });
  b += R(66, 132, 118, 20, { r: 4, f: '#3c1d20', s: '#e06c5a', sw: 1.2 }) + T(125, 146, 'Time left  2d 23:59', { size: 9.5, c: '#ffb4a8', mono: true });
  b += L(125, 172, 125, 182, B.ink, 3) + R(95, 181, 60, 6, { r: 2, f: '#c8ced8', sw: 1.6 });
  b += T(125, 210, 'What PhilHealth staff saw', { size: 11, w: 700, c: B.soft }) + T(125, 226, 'on September 22, 2023', { size: 11, w: 700, c: B.soft });
  // right: three numbered steps
  const row = (y, n, l1, l2, icon) => caseNum(262, y + 18, n) + icon(286, y) + T(338, y + 14, l1, { size: 11.5, a: 'start', c: B.ink }) + T(338, y + 30, l2, { size: 10.5, w: 700, a: 'start', c: B.soft });
  b += row(20, 1, 'Computers locked', 'Online services stop.', (x, y) => server2(x + 6, y, 30, 40) + padlock2(x + 26, y + 22, false, B.red, 0.42));
  b += L(262, 62, 262, 92, '#c9d2df', 2);
  b += row(96, 2, 'US$300,000 asked', 'PhilHealth refuses to pay.', (x, y) => R(x, y + 6, 44, 26, { r: 3, f: '#cfe8d4', s: B.ink, sw: 1.8 }) + R(x + 4, y + 10, 36, 18, { r: 2, f: 'none', s: '#5fae6b', sw: 1.2 }) + C(x + 22, y + 19, 7, '#e6f4ea', '#5fae6b', 1.2) + T(x + 22, y + 23, '$', { size: 10, c: '#2f7a4b' }) + cross(x + 42, y + 34, 0.55));
  b += L(262, 138, 262, 168, '#c9d2df', 2);
  b += row(172, 3, 'Data posted online', 'About 13 million members', (x, y) => doc(x, y, 24, 32) + doc(x + 10, y + 6, 24, 32) + ARROW(x + 34, y + 4, x + 44, y - 4, B.red, 1.8));
  b += T(338, 218, 'are affected.', { size: 10.5, w: 700, a: 'start', c: B.soft });
  return svgWrap(480, 260, 'Left: an office computer shows a ransom note that says your files are locked, pay US$300,000 or we will post your data online, with a countdown timer. This is what PhilHealth staff saw on September 22, 2023. Right: three steps. 1, computers are locked and online services stop. 2, US$300,000 is asked, and PhilHealth refuses to pay. 3, the data is posted online, and about 13 million members are affected.', b);
}

/** Featured case: the Colonial Pipeline ransomware attack (May 2021). Rebuilt chat 58 round 7 in the realistic-window style of malwareStep
 *  (her feedback: the simple boxes looked amateur). Two stacked stages: 1 how they got in, 2 what happened next. 480 x 520. */
export function colonialPic() {
  let b = '';
  const stg = (y, h) => R(4, y, 472, h, { r: 14, f: SOFT, s: 'none', sw: 0 });
  const headRow = (y, n, t) => caseNum(28, y + 24, n, B.blue) + T(48, y + 29, t, { size: 14, a: 'start', c: B.ink });
  const capC = (y, t, c = B.soft) => T(240, y, t, { size: 12, w: 700, c });
  // ---- stage 1: a leaked password list, then the old VPN sign-in that asks for nothing else
  b += stg(4, 254) + headRow(4, 1, 'How the criminals got in');
  b += winBox(18, 48, 206, 160, 'leaked-passwords.txt', '#e4e9f1');
  const rows = [['maria.c', 'ilovecats'], ['ben.t', 'Ben12345'], ['vpn.user01', 'K7#river'], ['liza.m', 'summer19']];
  rows.forEach(([u, pw], k) => { const y = 96 + k * 26, hot = k === 2;
    if (hot) b += R(26, y - 15, 190, 22, { r: 4, f: '#fdeee9', s: B.red, sw: 1.4 });
    b += T(34, y, u, { size: 10.5, a: 'start', c: hot ? B.red : B.ink, mono: true }) + T(208, y, pw, { size: 10.5, a: 'end', c: hot ? B.red : B.soft, mono: true }); });
  b += ARROW(230, 128, 250, 128, '#8a94a6', 2.4);
  b += winBox(256, 48, 206, 160, 'Company VPN', '#e4e9f1');
  b += T(359, 92, 'Sign in to the office network', { size: 10.5, w: 700, c: B.soft });
  b += T(272, 110, 'Username', { size: 9, w: 700, a: 'start', c: B.soft }) + R(272, 114, 174, 22, { r: 4, f: '#fff', s: '#b7bfcc', sw: 1.4 }) + T(280, 129, 'vpn.user01', { size: 10.5, a: 'start', c: B.ink, mono: true });
  b += T(272, 150, 'Password', { size: 9, w: 700, a: 'start', c: B.soft }) + R(272, 154, 174, 22, { r: 4, f: '#fff', s: '#b7bfcc', sw: 1.4 }) + T(280, 169, '••••••••', { size: 11, a: 'start', c: B.ink, mono: true });
  b += R(272, 182, 174, 20, { r: 4, f: B.blue, s: 'none', sw: 0 }) + T(359, 196, 'Sign in', { size: 10.5, c: '#fff' });
  b += capC(232, 'The old account’s password was on a leaked list.') + capC(249, 'The account had no MFA, so the password alone was enough.', '#9c2f28');
  // ---- stage 2: the pipeline status screen, and a gas station with no fuel
  const y2 = 266;
  b += stg(y2, 250) + headRow(y2, 2, 'What happened next');
  b += winBox(18, y2 + 44, 206, 156, 'Pipeline status', '#e4e9f1');
  { const pts = [[44, y2 + 170], [96, y2 + 160], [140, y2 + 132], [198, y2 + 92]];
    const d = `M${pts[0][0]} ${pts[0][1]} Q${pts[1][0]} ${pts[1][1] + 6} ${pts[2][0]} ${pts[2][1]} T${pts[3][0]} ${pts[3][1]}`;
    b += `<path d="${d}" fill="none" stroke="#c8ced8" stroke-width="9" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${B.red}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 5"/>`;
    b += C(pts[0][0], pts[0][1], 5, '#fff', B.ink, 1.8) + C(pts[2][0], pts[2][1], 4, '#fff', B.ink, 1.6) + C(pts[3][0], pts[3][1], 5, '#fff', B.ink, 1.8);
    b += T(pts[0][0] - 6, pts[0][1] + 18, 'Texas', { size: 9, w: 700, a: 'start', c: B.soft }) + T(pts[2][0] + 8, pts[2][1] + 14, 'Atlanta', { size: 9, w: 700, a: 'start', c: B.soft }) + T(pts[3][0] - 10, pts[3][1] - 6, 'New Jersey', { size: 9, w: 700, a: 'end', c: B.soft });
    b += R(34, y2 + 76, 98, 20, { r: 10, f: '#fdeee9', s: B.red, sw: 1.4 }) + C(46, y2 + 86, 3.6, B.red, 'none', 0) + T(88, y2 + 90.5, 'STOPPED', { size: 10.5, c: B.red }); }
  // gas station: canopy, two pumps with paper signs, a line of cars
  { const gy = y2 + 186; // ground line
    b += ground(352, gy + 2, 110);
    b += R(244, y2 + 50, 112, 16, { r: 3, f: '#f4f6f9', sw: 1.8 }) + R(245, y2 + 60, 110, 6, { r: 0, f: '#d4422f', s: 'none', sw: 0 }) + L(244, y2 + 66, 356, y2 + 66, B.ink, 1.8);
    b += R(250, y2 + 66, 6, gy - y2 - 66, { r: 1, f: '#c8ced8', sw: 1.4 }) + R(344, y2 + 66, 6, gy - y2 - 66, { r: 1, f: '#c8ced8', sw: 1.4 });
    const pump = (x) => R(x, gy - 64, 30, 64, { r: 4, f: '#e86f5a', sw: 1.8 }) + R(x + 5, gy - 58, 22, 13, { r: 2, f: '#1f2a3d', s: 'none', sw: 0 }) + T(x + 16, gy - 48.5, '0.00', { size: 7.5, c: '#7fd1a0', mono: true })
      + R(x + 3, gy - 38, 26, 22, { r: 2, f: '#fff4c7', sw: 1.2 }) + T(x + 16, gy - 29, 'NO', { size: 8, c: B.red }) + T(x + 16, gy - 20, 'FUEL', { size: 8, c: B.red })
      + P(`M${x + 32} ${gy - 44} Q${x + 42} ${gy - 42} ${x + 40} ${gy - 26}`, 'none', B.ink, 2) + R(x - 3, gy - 4, 38, 5, { r: 2, f: '#9aa6b8', sw: 1.2 });
    b += pump(264) + pump(306);
    b += car2(360, gy - 23, 0.36, '#9fb4d3') + car2(414, gy - 23, 0.36, '#e8c07a'); }
  b += capC(y2 + 224, 'The company stopped the whole pipeline for about six days.') + capC(y2 + 241, 'Many gas stations ran out of fuel, and people lined up.', '#9c2f28');
  return svgWrap(480, 520, 'Two parts. 1, how the criminals got in: a text file of leaked passwords includes the password of vpn.user01, an old account; the company VPN sign-in page asks only for the username and password, with no MFA. 2, what happened next: the pipeline status screen shows the route from Texas through Atlanta to New Jersey marked STOPPED, and at a gas station the pumps show 0.00 with paper signs saying no fuel while cars wait in line.', b);
}

/* =====================================================================
   chat 59 (her feedback): digital certificate and digital signature shown as they REALLY look on screen
   (Chrome's certificate viewer, a PDF reader's signature bar and panel), and "If you were scammed" as a
   StepShow with realistic screens (afterScamStep 0-3). Made-up names only: PeraBank, PeraPay, TrustSeal CA, ShopMati.
   ===================================================================== */
const gchk = (x, y, s = 1) => C(x, y, 7 * s, B.green, 'none', 0) + P(`M${x - 3.2 * s} ${y} L${x - 0.8 * s} ${y + 2.6 * s} L${x + 3.6 * s} ${y - 2.8 * s}`, 'none', '#fff', 1.8 * s);
const rcross = (x, y, s = 1) => C(x, y, 7 * s, B.red, 'none', 0) + L(x - 2.8 * s, y - 2.8 * s, x + 2.8 * s, y + 2.8 * s, '#fff', 1.8 * s) + L(x + 2.8 * s, y - 2.8 * s, x - 2.8 * s, y + 2.8 * s, '#fff', 1.8 * s);
const callout = (x1, y1, x2, y2) => L(x1, y1, x2, y2, '#9aa6b8', 1.4) + C(x1, y1, 3, '#9aa6b8', 'none', 0);
const note2 = (x, y, a, b2, c = B.blueInk) => T(x, y, a, { size: 12, w: 800, a: 'start', c }) + (b2 ? T(x, y + 16, b2, { size: 11.5, w: 600, a: 'start', c: B.soft }) : '');

/** Chrome's Certificate Viewer for a made-up bank site, with callouts for its three main parts. 480 x 318. */
export function certViewPic() {
  let b = R(4, 4, 472, 310, { r: 14, f: SOFT, s: 'none', sw: 0 });
  const x = 18, y = 18, w = 292, h = 282;
  b += R(x, y, w, h, { r: 10, f: '#fff', sw: 2 });
  b += T(x + 16, y + 26, 'Certificate Viewer: perabank.com.ph', { size: 12, w: 800, a: 'start', c: B.ink }) + T(x + w - 16, y + 26, '×', { size: 15, w: 700, c: B.soft });
  b += T(x + 40, y + 54, 'General', { size: 11.5, w: 800, c: B.blue }) + R(x + 14, y + 60, 52, 3, { r: 1.5, f: B.blue, s: 'none', sw: 0 }) + T(x + 100, y + 54, 'Details', { size: 11.5, w: 700, c: B.greyInk }) + L(x + 1, y + 62, x + w - 1, y + 62, '#e2e6ed', 1.4);
  const sec = (yy, title, rows) => {
    let g = T(x + 16, yy, title, { size: 12, w: 800, a: 'start', c: B.ink });
    rows.forEach(([k, v], i) => { g += T(x + 24, yy + 20 + i * 18, k, { size: 10.5, w: 600, a: 'start', c: B.greyInk }) + T(x + 146, yy + 20 + i * 18, v, { size: 10.5, w: 700, a: 'start', c: B.ink }); });
    return g;
  };
  b += sec(y + 88, 'Issued To', [['Common Name (CN)', 'perabank.com.ph'], ['Organization (O)', 'PeraBank Inc.']]);
  b += sec(y + 160, 'Issued By', [['Common Name (CN)', 'TrustSeal CA'], ['Organization (O)', 'TrustSeal Inc.']]);
  b += sec(y + 232, 'Validity Period', [['Issued On', 'Mon, March 2, 2026'], ['Expires On', 'Wed, March 3, 2027']]);
  // highlight the address the certificate belongs to
  b += R(x + 140, y + 95, 108, 18, { r: 4, f: 'none', s: B.green, sw: 1.6 });
  // callouts on the right, each on the same line as its section
  b += callout(x + 252, y + 104, 326, y + 92) + note2(332, y + 88, 'The website\'s own', 'address');
  b += callout(x + 230, y + 176, 326, y + 164) + note2(332, y + 160, 'The certificate', 'authority that')+T(332, y + 192, 'checked the site', { size: 11.5, w: 600, a: 'start', c: B.soft });
  b += callout(x + 256, y + 252, 326, y + 236) + note2(332, y + 232, 'The dates when', 'it can be used');
  return svgWrap(480, 318, 'Chrome\'s Certificate Viewer for perabank.com.ph, General tab. Issued To: common name perabank.com.ph, organization PeraBank Inc. (labeled: the website\'s own address). Issued By: common name TrustSeal CA, organization TrustSeal Inc. (labeled: the certificate authority that checked it). Validity Period: issued on Monday, March 2, 2026, expires on Wednesday, March 3, 2027 (labeled: the dates when it can be used).', b);
}

/** A signed PDF in a PDF reader: green "signed and valid" bar, signature panel, and the signature box on the page.
 *  Below, the warning you get when someone changes the file after signing. 480 x 432. */
export function sigViewPic() {
  let b = R(4, 4, 472, 336, { r: 14, f: SOFT, s: 'none', sw: 0 });
  const x = 16, y = 16, w = 448, h = 312;
  b += winBox(x, y, w, h, 'Internship_Agreement.pdf');
  // the signature bar at the top
  b += R(x + 2, y + 25, w - 4, 30, { r: 0, f: '#e3f3e9', s: 'none', sw: 0 }) + gchk(x + 20, y + 40) + T(x + 34, y + 44.5, 'Signed and all signatures are valid.', { size: 11.5, w: 700, a: 'start', c: '#2a6643' });
  b += R(x + w - 118, y + 30, 104, 20, { r: 4, f: '#fff', s: '#9ccab0', sw: 1.2 }) + T(x + w - 66, y + 44, 'Signature Panel', { size: 10, w: 700, c: '#2a6643' });
  b += L(x + 2, y + 55, x + w - 2, y + 55, '#cfe5d7', 1.2);
  // left: the signature panel
  const px = x + 2, pw = 170;
  b += R(px, y + 56, pw, h - 58, { r: 0, f: '#f6f8fb', s: 'none', sw: 0 }) + L(px + pw, y + 56, px + pw, y + h - 2, '#e2e6ed', 1.4);
  b += T(px + 12, y + 78, 'Signatures', { size: 12, w: 800, a: 'start', c: B.ink });
  b += gchk(px + 18, y + 100) + T(px + 30, y + 104, 'Signed by Ana Cruz', { size: 10.5, w: 800, a: 'start', c: B.ink }) + T(px + 30, y + 119, 'Nov 21, 2026, 10:15 AM', { size: 9.5, w: 600, a: 'start', c: B.greyInk });
  const ok = (yy, lines) => gchk(px + 30, yy - 4, 0.75) + lines.map((t, k) => T(px + 40, yy + k * 13, t, { size: 9.5, w: 600, a: 'start', c: B.soft })).join('');
  b += ok(y + 144, ['The signature is valid.']);
  b += ok(y + 168, ['The signer\'s identity', 'is valid.']);
  b += R(px + 20, y + 196, 142, 50, { r: 8, f: '#e3f3e9', s: B.green, sw: 1.4 }) + ok(y + 212, ['The file has not been', 'changed since it was', 'signed.']);
  // right: the page
  const gx = px + pw + 20, gw = w - pw - 40, gy = y + 68;
  b += R(gx, gy, gw, 236, { r: 2, f: '#fff', s: '#cfd6e0', sw: 1.4 });
  b += T(gx + gw / 2, gy + 24, 'INTERNSHIP AGREEMENT', { size: 11.5, w: 800, c: B.ink });
  [44, 56, 68, 84, 96].forEach((dy, k) => { b += L(gx + 16, gy + dy, gx + gw - 16 - (k % 3) * 22, gy + dy, '#d5dbe4', 3); });
  // signature appearance (how e-signatures look on the page)
  const sx = gx + 16, sy = gy + 134, sw2 = gw - 32;
  b += R(sx, sy, sw2, 74, { r: 4, f: '#f4f8ff', s: '#8fb0dc', sw: 1.4 });
  b += P(`M${sx + 10} ${sy + 50} C${sx + 16} ${sy + 30} ${sx + 22} ${sy + 14} ${sx + 26} ${sy + 18} C${sx + 30} ${sy + 24} ${sx + 22} ${sy + 46} ${sx + 30} ${sy + 46} C${sx + 36} ${sy + 46} ${sx + 38} ${sy + 34} ${sx + 42} ${sy + 34} C${sx + 46} ${sy + 34} ${sx + 44} ${sy + 46} ${sx + 50} ${sy + 45} C${sx + 56} ${sy + 44} ${sx + 58} ${sy + 32} ${sx + 64} ${sy + 33} C${sx + 70} ${sy + 34} ${sx + 64} ${sy + 46} ${sx + 72} ${sy + 45} C${sx + 78} ${sy + 44} ${sx + 82} ${sy + 38} ${sx + 86} ${sy + 36} M${sx + 12} ${sy + 58} Q${sx + 50} ${sy + 52} ${sx + 90} ${sy + 56}`, 'none', B.blue, 2);
  b += T(sx + 104, sy + 22, 'Digitally signed', { size: 9.5, w: 700, a: 'start', c: B.ink }) + T(sx + 104, sy + 35, 'by Ana Cruz', { size: 9.5, w: 700, a: 'start', c: B.ink }) + T(sx + 104, sy + 52, 'Date 2026.11.21', { size: 9, w: 600, a: 'start', c: B.greyInk }) + T(sx + 104, sy + 64, '10:15 +08\'00\'', { size: 9, w: 600, a: 'start', c: B.greyInk });
  b += T(sx + 6, sy + 90, 'Ana Cruz, Supervisor', { size: 9.5, w: 600, a: 'start', c: B.soft });
  // labels
  b += label(sx + sw2 - 44, sy - 8, 'who signed', B.blueInk, '#e3ecf8', 11);
  b += L(px + 91, y + 246, px + 91, y + 262, B.green, 1.4) + label(px + 91, y + 278, 'not changed', '#2a6643', '#e3f3e9', 11);
  // the warning when the file was changed after signing
  b += R(4, 350, 472, 78, { r: 14, f: '#fdf1ee', s: 'none', sw: 0 }) + T(20, 374, 'If someone changes the file after it was signed, the app warns you.', { size: 12, w: 800, a: 'start', c: '#9c2f28' });
  b += R(20, 386, 440, 30, { r: 6, f: '#fbe0db', s: '#e3a59c', sw: 1.2 }) + rcross(38, 401) + T(52, 405.5, 'At least one signature is invalid.', { size: 11.5, w: 700, a: 'start', c: '#9c2f28' });
  return svgWrap(480, 432, 'A signed PDF file, Internship_Agreement.pdf, open in a PDF reader. A green bar at the top says: Signed and all signatures are valid. The signature panel on the left says the file was signed by Ana Cruz, the signature is valid, the file has not been changed since it was signed, and the signer\'s identity is valid (labeled: not changed). On the page, a signature box shows a handwritten-style signature and the words Digitally signed by Ana Cruz, with the date (labeled: who signed). Below: if someone changes the file after it was signed, the app shows a red bar that says: At least one signature is invalid.', b);
}

/** If you were scammed, step by step (StepShow). i = 0 call the bank/e-wallet, 1 report to 1326, 2 change passwords, 3 keep proof. 480 x 260. */
export function afterScamStep(i) {
  let b = stage(), alt = '';
  const phoneBig = (x, y, content, scr = '#fff') => phoneUI(x, y, 116, 228, content, { screen: scr, dark: scr !== '#fff' });
  if (i === 0) {
    // left: PeraPay app help screen; right: the call with the hotline
    b += phoneBig(44, 16, (x, y, w, h) => {
      let g = R(x, y, w, 30, { r: 0, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 20, 'PeraPay', { size: 12, w: 800, c: '#fff' });
      g += T(x + 10, y + 50, 'Help Center', { size: 11.5, w: 800, a: 'start', c: B.ink });
      [['Report a scam', false], ['Freeze account', false], ['Call hotline', true]].forEach(([t, hot], k) => {
        const yy = y + 62 + k * 34;
        g += R(x + 6, yy, w - 12, 28, { r: 6, f: hot ? '#e3ecf8' : '#f3f5f8', s: hot ? B.blue : 'none', sw: hot ? 1.4 : 0 }) + T(x + 14, yy + 18, t, { size: 9.5, w: 700, a: 'start', c: hot ? B.blueInk : B.ink }) + T(x + w - 14, yy + 18.5, '›', { size: 12, w: 700, c: B.greyInk });
      });
      return g;
    });
    b += tapRing(141, 187, 10, B.blue);
    b += ARROW(176, 130, 214, 130, B.soft, 2.2);
    b += phoneBig(226, 16, (x, y, w, h) => R(x, y, w, h, { r: 8, f: '#2f3d55', s: 'none', sw: 0 }) + C(x + w / 2, y + 40, 18, B.blue, 'none', 0) + T(x + w / 2, y + 45, 'P', { size: 15, w: 800, c: '#fff' })
      + T(x + w / 2, y + 82, 'PeraPay Hotline', { size: 11, w: 800, c: '#fff' }) + T(x + w / 2, y + 98, '01:24', { size: 10.5, w: 600, c: '#c9d3e3', mono: true })
      + C(x + w / 2, y + h - 24, 13, '#d4422f', 'none', 0) + R(x + w / 2 - 7, y + h - 26, 14, 4, { r: 2, f: '#fff', s: 'none', sw: 0 }), '#2f3d55');
    b += sayL(356, 54, 108, ['Please freeze', 'my account.'], B.ink, '#fff', 11.5) + sayL(356, 128, 108, ['Done. We froze', 'it for now.'], '#2a6643', '#e3f3e9', 11.5);
    alt = 'Left: the official PeraPay app open to its Help Center, with the options Report a scam, Freeze account, and Call hotline; Call hotline is tapped. Right: the phone is in a call with the PeraPay Hotline. The caller says, Please freeze my account. The hotline answers, Done. We froze it for now.';
  } else if (i === 1) {
    // left: dialer with 1326; right: what the hotline is
    b += phoneBig(44, 16, (x, y, w, h) => {
      let g = T(x + w / 2, y + 26, '1326', { size: 20, w: 800, c: B.ink, mono: true });
      const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
      keys.forEach((k, n) => { const cx = x + w / 2 + ((n % 3) - 1) * 30, cy = y + 50 + Math.floor(n / 3) * 27; g += C(cx, cy, 11, '#eef1f5', 'none', 0) + T(cx, cy + 4.5, k, { size: 12, w: 700, c: B.ink }); });
      g += C(x + w / 2, y + h - 26, 13, B.green, 'none', 0) + P(`M${x + w / 2 - 5} ${y + h - 30} Q${x + w / 2 - 6} ${y + h - 21} ${x + w / 2 + 5} ${y + h - 21}`, 'none', '#fff', 3);
      return g;
    });
    b += tapRing(102, 213, 14, B.green);
    b += R(214, 36, 246, 188, { r: 12, f: '#fff', sw: 2 });
    b += T(337, 80, '1326', { size: 34, w: 800, c: B.blue, mono: true }) + T(337, 108, 'National anti-scam hotline', { size: 13, w: 800, c: B.ink });
    const row = (yy, txt) => gchk(242, yy - 4) + T(256, yy, txt, { size: 12, w: 700, a: 'start', c: B.soft });
    b += L(232, 124, 442, 124, '#e2e6ed', 1.4) + row(148, 'The call is free.') + row(172, 'Open 24 hours, 7 days a week') + row(196, 'Run by the CICC');
    alt = 'Left: a phone dialer with the number 1326 typed in and the green call button tapped. Right: a card that says 1326, National anti-scam hotline. The call is free. Open 24 hours, 7 days a week. Run by the CICC.';
  } else if (i === 2) {
    // a realistic account security page in a browser window
    const x = 16, y = 14, w = 448, h = 232;
    b += winBox(x, y, w, h, 'Account security');
    b += R(x + 2, y + 25, w - 4, 26, { r: 0, f: '#f4f6f9', s: 'none', sw: 0 }) + T(x + 16, y + 42, 'mail.perapost.ph/settings/security', { size: 10.5, w: 600, a: 'start', c: B.greyInk, mono: true }) + lockMini(x + w - 22, y + 43, B.green);
    // left column: change password
    const lx = x + 16;
    b += T(lx, y + 76, 'Change password', { size: 12.5, w: 800, a: 'start', c: B.ink }) + T(lx, y + 96, 'New password', { size: 10, w: 700, a: 'start', c: B.greyInk });
    b += R(lx, y + 102, 190, 26, { r: 6, f: '#fff', s: '#b7bfcc', sw: 1.4 }) + [...Array(12)].map((_, k) => C(lx + 14 + k * 11, y + 115, 3, B.ink, 'none', 0)).join('');
    b += R(lx, y + 136, 190, 6, { r: 3, f: '#e2e6ed', s: 'none', sw: 0 }) + R(lx, y + 136, 160, 6, { r: 3, f: B.green, s: 'none', sw: 0 }) + T(lx, y + 158, 'Strong password', { size: 10, w: 700, a: 'start', c: '#2a6643' });
    b += R(lx, y + 172, 90, 28, { r: 14, f: B.blue, s: 'none', sw: 0 }) + T(lx + 45, y + 190, 'Save', { size: 11, w: 800, c: '#fff' });
    // right column: devices + 2-step verification
    const rx = x + 236;
    b += L(rx - 14, y + 62, rx - 14, y + h - 14, '#e2e6ed', 1.4);
    b += T(rx, y + 76, 'Where you are signed in', { size: 12.5, w: 800, a: 'start', c: B.ink });
    b += T(rx, y + 98, 'Phone, Mati City (this device)', { size: 10, w: 600, a: 'start', c: B.soft }) + T(rx, y + 116, 'Windows PC, unknown place', { size: 10, w: 700, a: 'start', c: '#9c2f28' });
    b += R(rx, y + 126, 196, 26, { r: 13, f: '#fff', s: B.blue, sw: 1.4 }) + T(rx + 98, y + 143, 'Sign out of all other devices', { size: 10, w: 800, c: B.blueInk });
    b += L(rx, y + 166, rx + 196, y + 166, '#e2e6ed', 1.2) + T(rx, y + 188, '2-Step Verification (MFA)', { size: 11, w: 800, a: 'start', c: B.ink }) + T(rx, y + 204, 'On', { size: 10, w: 700, a: 'start', c: '#2a6643' });
    b += R(rx + 160, y + 178, 36, 20, { r: 10, f: B.green, s: 'none', sw: 0 }) + C(rx + 186, y + 188, 7.5, '#fff', 'none', 0);
    alt = 'An email account\'s security page in a browser. Left: Change password, with a new password of 12 characters, a strength bar marked Strong password, and a Save button. Right: Where you are signed in lists the phone in Mati City (this device) and, in red, a Windows PC in an unknown place, with a button Sign out of all other devices. Below it, 2-Step Verification (MFA) is switched on.';
  } else {
    // left: phone with the scam chat, just after a screenshot (thumbnail at the bottom left, like a real phone); right: a folder of proof
    b += phoneBig(36, 16, (x, y, w, h) => {
      let g = appHead(x, y, w, 'ShopMati Seller', 'Active now');
      g += timeSep(x + w / 2, y + 42, 'Today 10:42 AM');
      g += bubbleL(x + 6, y + 47, 'Pay ₱2,500 now') + bubbleR(x + w - 6, y + 69, 'Sent via PeraPay') + bubbleL(x + 6, y + 91, 'Pay the fee here');
      g += R(x + 6, y + 113, 84, 18, { r: 9, f: '#eef1f5', s: 'none', sw: 0 }) + T(x + 13, y + 125.5, 'shopmati-pay.co', { size: 8, w: 700, a: 'start', c: B.red }) + L(x + 13, y + 127.5, x + 82, y + 127.5, B.red, 0.8);
      // screenshot thumbnail
      const tx = x + 7, ty = y + h - 60;
      g += R(tx + 2, ty + 2, 34, 50, { r: 5, f: 'rgba(17,24,39,0.18)', s: 'none', sw: 0 }) + R(tx, ty, 34, 50, { r: 5, f: '#fff', s: B.ink, sw: 1.6 });
      g += R(tx + 4, ty + 4, 26, 6, { r: 1.5, f: '#e6e9ef', s: 'none', sw: 0 }) + R(tx + 4, ty + 14, 15, 5, { r: 2.5, f: '#eef1f5', s: 'none', sw: 0 }) + R(tx + 14, ty + 22, 16, 5, { r: 2.5, f: '#2f6fd1', s: 'none', sw: 0 }) + R(tx + 4, ty + 30, 15, 5, { r: 2.5, f: '#eef1f5', s: 'none', sw: 0 }) + R(tx + 4, ty + 38, 17, 5, { r: 2.5, f: '#fdeee9', s: 'none', sw: 0 });
      return g;
    });
    b += lead(84, 214, 160, 214, '#9aa6b8') + label(198, 218, 'screenshot', B.blueInk, '#e3ecf8', 10.5);
    b += ARROW(170, 130, 236, 130, B.soft, 2.2);
    // the folder
    const x = 248, y = 30, w = 218;
    b += winBox(x, y, w, 200, 'Scam proof');
    const files = [['chat-1.png', 'img'], ['chat-2.png', 'img'], ['payment-receipt.png', 'img'], ['seller-profile.png', 'img'], ['scam-link.txt', 'txt']];
    files.forEach(([n, k], j) => { const yy = y + 38 + j * 31;
      b += R(x + 14, yy, 18, 22, { r: 3, f: k === 'img' ? '#dfe9f6' : '#fff', s: '#9aa6b8', sw: 1.2 }) + (k === 'img' ? P(`M${x + 17} ${yy + 18} L${x + 22} ${yy + 11} L${x + 26} ${yy + 15} L${x + 29} ${yy + 12}`, 'none', B.blue, 1.4) : L(x + 18, yy + 8, x + 28, yy + 8, '#9aa6b8', 1.2) + L(x + 18, yy + 13, x + 26, yy + 13, '#9aa6b8', 1.2));
      b += T(x + 42, yy + 15.5, n, { size: 11, w: 700, a: 'start', c: B.ink, mono: true }); });
    alt = 'Left: a phone shows the chat with a fake ShopMati seller: Pay 2,500 pesos now; Sent via PeraPay; Pay here, with the link shopmati-pay.co. A screenshot of the chat appears in the corner. Right: a folder named Scam proof holds chat-1.png, chat-2.png, payment-receipt.png, seller-profile.png, and scam-link.txt.';
  }
  return svgWrap(480, 260, alt, b);
}

/* ---------- chat 59: a cleaner, realistic phone (screen clipped to its rounded corners, status bar, Dynamic Island) ---------- */
let _clipN = 0;
const phoneUI = (x, y, w, h, content, o = {}) => {
  const id = 'phc' + (++_clipN), bz = 5, sx = x + bz, sy = y + bz, sw = w - 2 * bz, sh = h - 2 * bz, dark = !!o.dark;
  const scr = o.screen ?? (dark ? '#26324a' : '#fff'), ink = dark ? '#fff' : B.ink;
  let g = R(x + w - 0.5, y + 62, 3, 28, { r: 1.5, f: '#1f2633', s: 'none', sw: 0 }) + R(x, y, w, h, { r: 22, f: '#1f2633', sw: 2 });
  g += `<clipPath id="${id}"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="17"/></clipPath><g clip-path="url(#${id})">`;
  g += R(sx, sy, sw, sh, { r: 0, f: scr, s: 'none', sw: 0 });
  g += T(sx + 16, sy + 15, '9:41', { size: 8.5, w: 800, c: ink });
  g += [0, 1, 2].map((k) => R(sx + sw - 37 + k * 3.6, sy + 12 - k * 2, 2.6, 4 + k * 2, { r: 0.8, f: ink, s: 'none', sw: 0 })).join('');
  g += R(sx + sw - 25, sy + 8, 14, 7.5, { r: 2, f: 'none', s: ink, sw: 1 }) + R(sx + sw - 23.5, sy + 9.5, 9, 4.5, { r: 1, f: ink, s: 'none', sw: 0 }) + R(sx + sw - 10.5, sy + 10.5, 1.5, 2.5, { r: 0.5, f: ink, s: 'none', sw: 0 });
  g += R(sx + sw / 2 - 12, sy + 6, 24, 10, { r: 5, f: '#0d1117', s: 'none', sw: 0 });
  if (content) g += content(sx, sy + 22, sw, sh - 22);
  g += R(sx + sw / 2 - 20, sy + sh - 6, 40, 3, { r: 1.5, f: dark ? 'rgba(255,255,255,0.7)' : 'rgba(17,24,39,0.75)', s: 'none', sw: 0 });
  return g + '</g>';
};
// app header row inside a phone screen
const appHead = (x, y, w, title, sub = '', back = true) => R(x, y, w, 30, { r: 0, f: '#fff', s: 'none', sw: 0 }) + (back ? P(`M${x + 14} ${y + 10} L${x + 9} ${y + 15} L${x + 14} ${y + 20}`, 'none', B.ink, 1.6) : '')
  + T(x + (back ? 22 : 10), y + (sub ? 13 : 19), title, { size: 9.5, w: 800, a: 'start', c: B.ink }) + (sub ? T(x + (back ? 22 : 10), y + 24, sub, { size: 7.5, w: 600, a: 'start', c: B.greyInk }) : '') + L(x, y + 30, x + w, y + 30, '#e6e9ef', 1);
const avatar = (x, y, r, f) => C(x, y, r, f, 'none', 0) + `<ellipse cx="${x}" cy="${y + r * 0.15}" rx="${r * 0.42}" ry="${r * 0.48}" fill="${B.skin}"/>`;
const strangerAv = (x, y, r) => C(x, y, r, '#4a5266', 'none', 0) + `<ellipse cx="${x}" cy="${y + r * 0.2}" rx="${r * 0.45}" ry="${r * 0.5}" fill="${B.skin}"/>` + R(x - r * 0.45, y + r * 0.02, r * 0.9, r * 0.26, { r: 1, f: '#111827', s: 'none', sw: 0 });
const bubbleL = (x, y, t, f = '#eef1f5', c = B.ink, size = 8.5) => { const w = t.length * size * 0.52 + 14; return R(x, y, w, 18, { r: 9, f, s: 'none', sw: 0 }) + T(x + 7, y + 12.5, t, { size, w: 600, a: 'start', c }); };
const bubbleR = (xr, y, t, f = '#2f6fd1', c = '#fff', size = 8.5) => { const w = t.length * size * 0.52 + 14; return R(xr - w, y, w, 18, { r: 9, f, s: 'none', sw: 0 }) + T(xr - w + 7, y + 12.5, t, { size, w: 600, a: 'start', c }); };
const timeSep = (cx, y, t) => T(cx, y, t, { size: 7.5, w: 700, c: B.greyInk });
const lead = (x1, y1, x2, y2, c = B.red) => L(x1, y1, x2, y2, c, 1.4) + C(x1, y1, 2.6, c, 'none', 0);

/** Bea's story (chat 59, rebuilt): three stages with realistic phone screens. 480 x 826. */
function beaStoryPic() {
  let b = '';
  const P1 = 8, P2 = 280, P3 = 552, PH = 262;
  // ---- 1. the public post ----
  b += stPanel(P1, PH) + stHead(22, P1 + 12, 1, 'Bea posts a first-day-of-class photo');
  b += phoneUI(40, P1 + 46, 140, 206, (x, y, w, h) => {
    let g = avatar(x + 16, y + 14, 9, B.hair) + T(x + 30, y + 12, 'Bea Reyes', { size: 9, w: 800, a: 'start', c: B.ink });
    g += P(`M${x + 32} ${y + 18} C${x + 32} ${y + 15} ${x + 37} ${y + 15} ${x + 37} ${y + 18} C${x + 37} ${y + 20} ${x + 34.5} ${y + 22} ${x + 34.5} ${y + 23} C${x + 34.5} ${y + 22} ${x + 32} ${y + 20} ${x + 32} ${y + 18} Z`, B.red, 'none', 0);
    g += T(x + 40, y + 23, 'Purok 3, Dahican', { size: 7.5, w: 700, a: 'start', c: B.soft }) + T(x + w - 10, y + 14, '🌐', { size: 8, c: B.greyInk });
    // the photo: sky, ground, house with number 27, Bea in front
    const py = y + 30, ph = 84;
    g += R(x, py, w, ph, { r: 0, f: '#cfe3f3', s: 'none', sw: 0 }) + R(x, py + ph - 18, w, 18, { r: 0, f: '#cfe0bd', s: 'none', sw: 0 });
    g += `<ellipse cx="${x + 30}" cy="${py + 14}" rx="12" ry="5" fill="#fff" opacity="0.9"/><ellipse cx="${x + 40}" cy="${py + 12}" rx="9" ry="5" fill="#fff" opacity="0.9"/>`;
    g += houseD(x + 52, py + 8, 66);
    g += girl(x + 30, py + 34, 0.5, { shirt: B.green });
    g += P(`M${x + 12} ${py + ph + 10} C${x + 12} ${py + ph + 6} ${x + 17} ${py + ph + 5} ${x + 18} ${py + ph + 9} C${x + 19} ${py + ph + 5} ${x + 24} ${py + ph + 6} ${x + 24} ${py + ph + 10} C${x + 24} ${py + ph + 14} ${x + 18} ${py + ph + 17} ${x + 18} ${py + ph + 18} C${x + 18} ${py + ph + 17} ${x + 12} ${py + ph + 14} ${x + 12} ${py + ph + 10} Z`, '#e0245e', 'none', 0);
    g += R(x + 32, py + ph + 5, 12, 9, { r: 3, f: 'none', s: B.ink, sw: 1.2 }) + P(`M${x + 54} ${py + ph + 13} L${x + 64} ${py + ph + 6} L${x + 60} ${py + ph + 15} Z`, 'none', B.ink, 1.1);
    g += T(x + 10, py + ph + 30, '32 likes', { size: 8, w: 800, a: 'start', c: B.ink }) + T(x + 10, py + ph + 43, 'First day of class!', { size: 8, w: 600, a: 'start', c: B.ink });
    return g;
  });
  // what the post gives away
  b += lead(152, P1 + 94, 222, P1 + 94) + label(282, P1 + 98, 'location tag', B.red, '#fdeee9', 12);
  b += lead(162, P1 + 162, 222, P1 + 152) + label(290, P1 + 152, 'house number', B.red, '#fdeee9', 12);
  b += T(214, P1 + 196, 'The post is public, so anyone', { size: 12, w: 700, a: 'start', c: B.soft }) + T(214, P1 + 214, 'can see where she lives.', { size: 12, w: 700, a: 'start', c: B.soft });
  // ---- 2. the stranger ----
  b += stPanel(P2, PH) + stHead(22, P2 + 12, 2, 'An unknown account messages her every night');
  b += phoneUI(30, P2 + 46, 132, 206, (x, y, w, h) => {
    let g = appHead(x, y, w, 'Activity', '', false);
    ['liked your photo.', 'liked your photo.', 'liked your photo.', 'started following you.'].forEach((t, k) => {
      const yy = y + 42 + k * 34;
      g += strangerAv(x + 16, yy + 6, 9) + T(x + 30, yy + 4, 'user_x82', { size: 8, w: 800, a: 'start', c: B.ink }) + T(x + 30, yy + 15, t, { size: 7.5, w: 600, a: 'start', c: B.soft }) + T(x + w - 8, yy + 4, (k + 1) + 'h', { size: 7, w: 600, a: 'end', c: B.greyInk });
    });
    return g;
  });
  b += phoneUI(176, P2 + 46, 132, 206, (x, y, w, h) => {
    let g = appHead(x, y, w, 'user_x82', 'Message request');
    g += timeSep(x + w / 2, y + 44, 'Mon 11:02 PM') + bubbleL(x + 8, y + 49, 'hi bea');
    g += timeSep(x + w / 2, y + 80, 'Tue 12:15 AM') + bubbleL(x + 8, y + 85, 'why don\'t you reply?');
    g += timeSep(x + w / 2, y + 116, 'Wed 1:03 AM') + bubbleL(x + 8, y + 121, 'I know you saw this', '#fdeee9', '#9c2f28');
    g += R(x + 8, y + h - 26, w - 16, 16, { r: 8, f: '#f3f5f8', s: 'none', sw: 0 }) + T(x + 16, y + h - 15, 'Message...', { size: 7.5, w: 600, a: 'start', c: B.greyInk });
    return g;
  });
  b += moonWin(352, P2 + 66) + hacker2(410, P2 + 150, 0.82) + T(410, P2 + 236, 'an account she', { size: 11.5, w: 700, c: B.soft }) + T(410, P2 + 251, 'does not know', { size: 11.5, w: 700, c: B.soft });
  // ---- 3. the comment ----
  b += stPanel(P3, PH) + stHead(22, P3 + 12, 3, 'Then he comments on her photo');
  b += phoneUI(40, P3 + 46, 150, 206, (x, y, w, h) => {
    let g = appHead(x, y, w, 'Comments');
    const cm = (yy, name, txt, hot) => (hot ? R(x + 4, yy - 10, w - 8, 44, { r: 8, f: '#fdeee9', s: B.red, sw: 1.2 }) : '') + (hot ? strangerAv(x + 16, yy, 8) : avatar(x + 16, yy, 8, hot ? '#4a5266' : (name === 'maria.s' ? '#e8a1b5' : '#8fb0dc')))
      + T(x + 29, yy - 1, name, { size: 8, w: 800, a: 'start', c: hot ? '#9c2f28' : B.ink }) + txt.map((t, k) => T(x + 29, yy + 10 + k * 11, t, { size: 8, w: 600, a: 'start', c: hot ? '#9c2f28' : B.soft })).join('');
    g += cm(y + 46, 'maria.s', ['Congrats, Bea!']) + cm(y + 78, 'jun_d', ['Good luck this sem!']) + cm(y + 116, 'user_x82', ['Nice house.', 'Purok 3, right?'], true);
    return g;
  });
  b += girl(414, P3 + 84, 0.95, { shirt: B.green, sad: true });
  b += result(214, P3 + 110, 'She never told him') + result(214, P3 + 128, 'where she lives.');
  b += T(214, P3 + 152, 'He found it in her photo.', { size: 12, w: 700, a: 'start', c: B.soft });
  return svgWrap(480, 822, 'Three parts. 1: Bea posts a public photo for her first day of class. The post shows a location tag, Purok 3, Dahican, and her house with the number 27 behind her (labeled: location tag, house number). Anyone can see where she lives. 2: An account she does not know, user_x82, likes her photos and follows her, then sends her messages late at night: hi bea at 11:02 PM on Monday, why don\'t you reply at 12:15 AM on Tuesday, I know you saw this at 1:03 AM on Wednesday. 3: Under her photo, he comments: Nice house. Purok 3, right? She never told him where she lives. He found it in her photo.', b);
}

/* =====================================================================
   chat 59 round 3 (her feedback): more detailed Part 3 pictures, a detailed house, grooming pictures.
   ===================================================================== */
/** A detailed two-storey Filipino house: GI-sheet hip roof, painted upper floor with sliding windows and a small balcony,
 *  concrete ground floor with a grilled window, panel door, lamp, house-number plate, steps and potted plants.
 *  (x, y) = top-left of the roof line, w = width; height is about 1.0 * w. */
const houseD = (x, y, w, o = {}) => {
  const u = w / 100, X = (v) => (x + v * u).toFixed(1), Y = (v) => (y + v * u).toFixed(1), sw = Math.max(0.9, 1.6 * u);
  const wall = o.wall ?? '#f4dfb8', roof = o.roof ?? '#a9493a';
  let g = '';
  // roof (hip) with corrugation lines, fascia and gutter
  g += `<path d="M${X(-5)} ${Y(30)} L${X(18)} ${Y(6)} L${X(82)} ${Y(6)} L${X(105)} ${Y(30)} Z" fill="${roof}" stroke="${B.ink}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  for (let k = 0; k <= 12; k++) { const t = k / 12, xt = 18 + 64 * t, xb = -5 + 110 * t; g += `<line x1="${X(xt)}" y1="${Y(6.5)}" x2="${X(xb)}" y2="${Y(29.5)}" stroke="rgba(0,0,0,0.18)" stroke-width="${(0.7 * u).toFixed(2)}"/>`; }
  g += `<line x1="${X(18)}" y1="${Y(6)}" x2="${X(82)}" y2="${Y(6)}" stroke="#7d3328" stroke-width="${(2.2 * u).toFixed(1)}" stroke-linecap="round"/>`;
  g += `<rect x="${X(-6)}" y="${Y(30)}" width="${(112 * u).toFixed(1)}" height="${(4 * u).toFixed(1)}" rx="${u.toFixed(1)}" fill="#fff" stroke="${B.ink}" stroke-width="${sw * 0.8}"/>`;
  // upper floor
  g += `<rect x="${X(4)}" y="${Y(34)}" width="${(92 * u).toFixed(1)}" height="${(27 * u).toFixed(1)}" fill="${wall}" stroke="${B.ink}" stroke-width="${sw}"/>`;
  const win = (wx, wy, ww, wh) => `<rect x="${X(wx)}" y="${Y(wy)}" width="${(ww * u).toFixed(1)}" height="${(wh * u).toFixed(1)}" fill="#bcd6ee" stroke="${B.ink}" stroke-width="${sw * 0.8}"/>`
    + `<line x1="${X(wx + ww / 2)}" y1="${Y(wy)}" x2="${X(wx + ww / 2)}" y2="${Y(wy + wh)}" stroke="${B.ink}" stroke-width="${sw * 0.6}"/>`
    + `<path d="M${X(wx + 1.5)} ${Y(wy + wh - 2)} L${X(wx + ww / 2 - 3)} ${Y(wy + 2)}" stroke="rgba(255,255,255,0.8)" stroke-width="${(1.2 * u).toFixed(1)}"/>`
    + `<rect x="${X(wx + ww - 5)}" y="${Y(wy + 0.5)}" width="${(4 * u).toFixed(1)}" height="${((wh - 1) * u).toFixed(1)}" fill="#e8a1b5" opacity="0.85"/>`
    + `<rect x="${X(wx - 1.5)}" y="${Y(wy + wh)}" width="${((ww + 3) * u).toFixed(1)}" height="${(2 * u).toFixed(1)}" fill="#fff" stroke="${B.ink}" stroke-width="${sw * 0.6}"/>`;
  g += win(10, 38, 24, 15) + win(66, 38, 24, 15);
  // balcony door + railing
  g += `<rect x="${X(41)}" y="${Y(37)}" width="${(18 * u).toFixed(1)}" height="${(24 * u).toFixed(1)}" fill="#cfe0f2" stroke="${B.ink}" stroke-width="${sw * 0.8}"/><line x1="${X(50)}" y1="${Y(37)}" x2="${X(50)}" y2="${Y(61)}" stroke="${B.ink}" stroke-width="${sw * 0.6}"/>`;
  g += `<line x1="${X(37)}" y1="${Y(50)}" x2="${X(63)}" y2="${Y(50)}" stroke="${B.ink}" stroke-width="${sw}"/>`;
  for (let k = 0; k <= 8; k++) g += `<line x1="${X(37 + k * 3.25)}" y1="${Y(50)}" x2="${X(37 + k * 3.25)}" y2="${Y(61)}" stroke="${B.ink}" stroke-width="${sw * 0.55}"/>`;
  // floor slab
  g += `<rect x="${X(2)}" y="${Y(61)}" width="${(96 * u).toFixed(1)}" height="${(3.5 * u).toFixed(1)}" fill="#b9bdc4" stroke="${B.ink}" stroke-width="${sw * 0.8}"/>`;
  // ground floor (concrete)
  g += `<rect x="${X(4)}" y="${Y(64.5)}" width="${(92 * u).toFixed(1)}" height="${(29.5 * u).toFixed(1)}" fill="#e6e3dc" stroke="${B.ink}" stroke-width="${sw}"/>`;
  // grilled window
  g += `<rect x="${X(11)}" y="${Y(70)}" width="${(30 * u).toFixed(1)}" height="${(15 * u).toFixed(1)}" fill="#bcd6ee" stroke="${B.ink}" stroke-width="${sw * 0.8}"/>`;
  for (let k = 1; k < 6; k++) g += `<line x1="${X(11 + k * 5)}" y1="${Y(70)}" x2="${X(11 + k * 5)}" y2="${Y(85)}" stroke="#3b4659" stroke-width="${sw * 0.55}"/>`;
  g += `<line x1="${X(11)}" y1="${Y(77.5)}" x2="${X(41)}" y2="${Y(77.5)}" stroke="#3b4659" stroke-width="${sw * 0.55}"/><rect x="${X(9.5)}" y="${Y(85)}" width="${(33 * u).toFixed(1)}" height="${(2 * u).toFixed(1)}" fill="#fff" stroke="${B.ink}" stroke-width="${sw * 0.6}"/>`;
  // door with panels, knob, lamp
  g += `<rect x="${X(58)}" y="${Y(68)}" width="${(18 * u).toFixed(1)}" height="${(26 * u).toFixed(1)}" fill="#8a5a3a" stroke="${B.ink}" stroke-width="${sw * 0.9}"/>`;
  g += `<rect x="${X(60.5)}" y="${Y(70.5)}" width="${(13 * u).toFixed(1)}" height="${(9 * u).toFixed(1)}" fill="none" stroke="#6a4229" stroke-width="${sw * 0.6}"/><rect x="${X(60.5)}" y="${Y(82)}" width="${(13 * u).toFixed(1)}" height="${(9 * u).toFixed(1)}" fill="none" stroke="#6a4229" stroke-width="${sw * 0.6}"/>`;
  g += `<circle cx="${X(73)}" cy="${Y(81)}" r="${(1.1 * u).toFixed(1)}" fill="${B.amber}"/><rect x="${X(65.5)}" y="${Y(65)}" width="${(3 * u).toFixed(1)}" height="${(2.5 * u).toFixed(1)}" fill="#fff4c7" stroke="${B.ink}" stroke-width="${sw * 0.5}"/>`;
  // house-number plate
  const pw = Math.max(12, 10 * u), ph = Math.max(9, 7 * u), px = x + 79 * u, py = y + 70 * u;
  if (o.num !== false) g += R(px, py, pw, ph, { r: 1.5, f: '#fff', s: B.ink, sw: Math.max(0.9, sw * 0.7) }) + T(px + pw / 2, py + ph * 0.78, o.num ?? '27', { size: Math.max(6.5, ph * 0.78), w: 800, c: B.ink });
  // steps and plants
  g += `<rect x="${X(55)}" y="${Y(94)}" width="${(24 * u).toFixed(1)}" height="${(3 * u).toFixed(1)}" fill="#cfd3d9" stroke="${B.ink}" stroke-width="${sw * 0.7}"/><rect x="${X(53)}" y="${Y(97)}" width="${(28 * u).toFixed(1)}" height="${(3 * u).toFixed(1)}" fill="#cfd3d9" stroke="${B.ink}" stroke-width="${sw * 0.7}"/>`;
  const pot = (cx) => `<path d="M${X(cx - 4)} ${Y(93)} L${X(cx + 4)} ${Y(93)} L${X(cx + 3)} ${Y(100)} L${X(cx - 3)} ${Y(100)} Z" fill="#c8693e" stroke="${B.ink}" stroke-width="${sw * 0.6}"/>`
    + `<path d="M${X(cx)} ${Y(93)} Q${X(cx - 7)} ${Y(88)} ${X(cx - 5)} ${Y(83)} M${X(cx)} ${Y(93)} Q${X(cx + 1)} ${Y(86)} ${X(cx)} ${Y(81)} M${X(cx)} ${Y(93)} Q${X(cx + 7)} ${Y(88)} ${X(cx + 5)} ${Y(84)}" fill="none" stroke="#3f8a5a" stroke-width="${(1.6 * u).toFixed(1)}" stroke-linecap="round"/>`;
  g += pot(7) + pot(91);
  return g;
};

/* ----- definition doodles for Part 3 (160 x 120, detailed) ----- */
// a small TALL phone for 160 x 120 doodles (real phone shape, about 1 : 2): drawn at full size and scaled by s.
// content(x, y, w, h) draws in doodle units inside a 51 x 99 screen area.
const phoneS = (x, y, content, s = 0.45) => `<g transform="translate(${x} ${y}) scale(${s})">` + phoneUI(0, 0, 124, 252, (X, Y, w, h) => `<g transform="translate(${X} ${Y}) scale(${(1 / s).toFixed(4)})">` + content(0, 0, w * s, h * s) + '</g>') + '</g>';
// a small app header for doodle phones
const miniHead = (x, y, w, title, sub = '') => R(x, y, w, 21, { r: 0, f: '#fff', s: 'none', sw: 0 }) + T(x + 5, y + (sub ? 9 : 13), title, { size: 7, w: 800, a: 'start', c: B.ink }) + (sub ? T(x + 5, y + 17, sub, { size: 5.5, w: 600, a: 'start', c: B.greyInk }) : '') + L(x, y + 21, x + w, y + 21, '#e6e9ef', 0.8);
// a round profile picture with a real head and shoulders inside (person2 or girl, clipped to a circle)
const avatarP = (cx, cy, r, o = {}) => {
  const id = 'avp' + (++_clipN), sc = r / 26, fig = o.girl ? girl : person2;
  return `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>` + C(cx, cy, r, o.bg ?? '#dfe9f6', 'none', 0) + `<g clip-path="url(#${id})">` + fig(cx, cy - r * 0.15 - 19 * sc, sc, { shirt: o.shirt ?? B.blue, hair: o.hair, sad: o.sad }) + '</g>' + C(cx, cy, r, 'none', o.ring ?? 'none', o.ring ? 1 : 0);
};
// a laughing-with-tears emoji
const laughFace = (x, y, r = 5) => C(x, y, r, '#f7c948', '#c99a1c', 0.7) + P(`M${x - r * 0.62} ${y - r * 0.15} Q${x - r * 0.38} ${y - r * 0.5} ${x - r * 0.14} ${y - r * 0.15} M${x + r * 0.14} ${y - r * 0.15} Q${x + r * 0.38} ${y - r * 0.5} ${x + r * 0.62} ${y - r * 0.15}`, 'none', '#6b3a10', 0.8)
  + P(`M${x - r * 0.55} ${y + r * 0.12} L${x + r * 0.55} ${y + r * 0.12} Q${x} ${y + r * 0.95} ${x - r * 0.55} ${y + r * 0.12} Z`, '#7a2f12', 'none', 0) + C(x - r * 0.85, y + r * 0.1, r * 0.25, '#6fb3e8', 'none', 0) + C(x + r * 0.85, y + r * 0.1, r * 0.25, '#6fb3e8', 'none', 0);
const tinyPhone = (x, y, w, h, scr = '#cfdcf0', content = '') => R(x, y, w, h, { r: 3.5, f: '#1f2633', sw: 1.2 }) + R(x + 1.6, y + 2.2, w - 3.2, h - 4.4, { r: 2.2, f: scr, s: 'none', sw: 0 }) + content;
const mini = (x, y, t, o = {}) => T(x, y, t, { size: o.size ?? 6.5, w: o.w ?? 700, a: o.a ?? 'start', c: o.c ?? B.ink, mono: o.mono });
const chip = (x, y, w, t, f, c, size = 6) => R(x, y, w, 11, { r: 5.5, f, s: 'none', sw: 0 }) + T(x + 5, y + 8, t, { size, w: 700, a: 'start', c });
const chipR = (xr, y, w, t, f, c, size = 6) => chip(xr - w, y, w, t, f, c, size);
const banner = (x, y, w, t1, t2) => R(x, y, w, 15, { r: 5, f: '#fff', s: '#d3dbe6', sw: 0.9 }) + R(x + 4, y + 4, 7, 7, { r: 2, f: '#2f6fd1', s: 'none', sw: 0 }) + T(x + 15, y + 10.5, t1, { size: 6, w: 800, a: 'start', c: B.ink }) + T(x + w - 5, y + 10.5, t2, { size: 6.5, w: 800, a: 'end', c: B.red });

export function partThreeDef(kind) {
  let b = '', alt = '';
  if (kind === 'bully') {
    b = blob(84, 62, 72, 52, '#fbe7da') + ground(36, 116, 26) + ground(116, 116, 28);
    b += phoneS(10, 3, (x, y, w, h) => {
      let g = miniHead(x, y, w, 'BSIT 1A', '24 members');
      g += R(x + 4, y + 25, w - 8, 32, { r: 4, f: '#dfe9f6', s: 'none', sw: 0 }) + avatarP(x + w / 2, y + 42, 12, { shirt: B.green, bg: '#c9dbef' });
      g += P(`M${x + w / 2 - 8} ${y + 34} L${x + w / 2 - 11} ${y + 26.5} L${x + w / 2 - 4} ${y + 32} M${x + w / 2 + 8} ${y + 34} L${x + w / 2 + 11} ${y + 26.5} L${x + w / 2 + 4} ${y + 32}`, '#d4422f', '#d4422f', 0.8);
      g += R(x + w - 27, y + 48, 22, 8, { r: 2, f: '#d4422f', s: 'none', sw: 0 }) + mini(x + w - 25, y + 54.5, 'LOSER', { size: 5.5, c: '#fff' });
      g += laughFace(x + 9, y + 64, 4) + laughFace(x + 18, y + 64, 4) + mini(x + 25, y + 66.5, '12', { size: 6, c: B.soft });
      g += chipR(x + w - 4, y + 72, 32, 'hahaha', '#2f6fd1', '#fff');
      return g;
    });
    b += banner(76, 4, 80, 'BSIT 1A', 'lol') + banner(76, 21, 80, 'BSIT 1A', 'loser');
    b += girl(116, 42, 0.62, { shirt: B.blue, sad: true }) + tinyPhone(121, 74, 13, 22) + P('M120 56 Q121 60 119.5 62', 'none', '#6fa8dc', 1.4);
    alt = 'A class group chat on a phone shows an edited photo of a classmate with drawn horns and a LOSER sticker, with laughing reactions, hahaha, and ew. New notifications say lol and loser. The classmate holds her phone and looks sad: cyberbullying.';
  } else if (kind === 'stalk') {
    b = blob(84, 62, 72, 52, '#e3ecf8') + ground(36, 116, 26) + ground(126, 116, 30);
    b += phoneS(10, 3, (x, y, w, h) => {
      let g = R(x, y, w, h, { r: 0, f: '#eaf1e4', s: 'none', sw: 0 });
      g += R(x + 28, y + 6, 20, 18, { r: 2, f: '#cfe8c4', s: 'none', sw: 0 }) + `<path d="M${x} ${y + 64} Q${x + 26} ${y + 56} ${x + w} ${y + 70}" fill="none" stroke="#9cc6ea" stroke-width="6"/>`;
      g += `<path d="M${x} ${y + 30} L${x + w} ${y + 27} M${x + 18} ${y} L${x + 23} ${y + h} M${x} ${y + 84} L${x + w} ${y + 80} M${x + 42} ${y} L${x + 45} ${y + h}" stroke="#fff" stroke-width="3.5"/>`;
      [[9, 88], [15, 78], [20, 66], [22, 54], [22, 42]].forEach(([dx, dy]) => { g += C(x + dx, y + dy, 1.5, B.red, 'none', 0); });
      g += C(x + 22, y + 32, 6, 'rgba(47,111,209,0.25)', 'none', 0) + C(x + 22, y + 32, 3.2, '#2f6fd1', '#fff', 1);
      g += R(x + 27, y + 35, 20, 10, { r: 3, f: '#fff', s: B.line, sw: 0.7 }) + mini(x + 30, y + 42.5, 'Bea', { size: 6, c: B.blueInk });
      g += R(x + 3, y + 3, w - 6, 13, { r: 4, f: '#fff', s: B.line, sw: 0.7 }) + C(x + 9, y + 9.5, 2, B.red, 'none', 0) + mini(x + 14, y + 12, 'Live location', { size: 5.5, c: B.red });
      return g;
    });
    b += hacker2(126, 8, 0.56) + laptop2(102, 72, 48, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#eaf1e4', s: 'none', sw: 0 }) + L(x, y + h * 0.5, x + w, y + h * 0.4, '#fff', 2) + L(x + w * 0.4, y, x + w * 0.45, y + h, '#fff', 2) + C(x + w * 0.44, y + h * 0.46, 2.6, '#2f6fd1', '#fff', 1));
    alt = 'A phone map shares Bea\'s live location, with a trail of red dots showing where she went. A hooded stranger watches the same map on his laptop: cyberstalking.';
  } else if (kind === 'sextortion') {
    b = blob(84, 62, 72, 52, '#fbe7da') + ground(36, 116, 26) + ground(122, 116, 28);
    b += phoneS(10, 3, (x, y, w, h) => {
      let g = miniHead(x, y, w, 'x_99', 'Request');
      g += R(x + 4, y + 27, w - 8, 30, { r: 4, f: '#c9d3e3', s: 'none', sw: 0 }) + [0, 1, 2].map((k) => R(x + 7, y + 31 + k * 8, w - 14, 4, { r: 2, f: '#b4c0d3', s: 'none', sw: 0 })).join('');
      const ex = x + 15, ey = y + 47;
      g += C(ex, ey, 6, '#fff', 'none', 0) + P(`M${ex - 4.5} ${ey} Q${ex} ${ey - 4} ${ex + 4.5} ${ey} Q${ex} ${ey + 4} ${ex - 4.5} ${ey} Z`, 'none', B.soft, 0.8) + L(ex - 4, ey + 4, ex + 4, ey - 4, B.soft, 0.9);
      g += chip(x + 4, y + 62, 43, 'Pay ₱5,000 or', '#fdeee9', '#9c2f28', 5.8) + chip(x + 4, y + 75, 40, 'I share this.', '#fdeee9', '#9c2f28', 5.8);
      g += R(x + w - 30, y + 29, 24, 9, { r: 4.5, f: '#d4422f', s: 'none', sw: 0 }) + T(x + w - 18, y + 35.5, '24 hours', { size: 5.2, w: 800, c: '#fff' });
      return g;
    });
    b += hacker2(122, 18, 0.62) + tinyPhone(128, 60, 13, 22, '#2f3d55');
    alt = 'A message request from an unknown account shows a hidden private photo and says: Pay 5,000 pesos or I share this, within 24 hours. A hooded stranger holds his phone and waits: sextortion.';
  } else if (kind === 'doxx') {
    b = blob(84, 62, 72, 52, '#e3ecf8') + ground(54, 116, 48);
    b += R(6, 8, 102, 104, { r: 8, f: '#fff', sw: 1.8 }) + avatarP(18, 20, 6, { shirt: '#6b7a94', bg: '#d6dce6' }) + mini(28, 18, 'anon_user', { size: 6.5, w: 800 }) + mini(28, 26, 'Public · 2h', { size: 5.5, c: B.greyInk });
    b += avatarP(26, 48, 14, { girl: true, shirt: B.green, bg: '#cfe3f3' }) + mini(46, 40, 'Bea Reyes', { size: 8, w: 800 });
    const row = (y, icon, t) => icon + mini(54, y, t, { size: 6, c: B.red });
    b += row(52, P('M46 47 C46 44 51 44 51 47 C51 49 48.5 51 48.5 52 C48.5 51 46 49 46 47 Z', B.red, 'none', 0), 'Purok 3, Dahican');
    b += row(63, R(46, 56.5, 5, 8, { r: 1.2, f: 'none', s: B.red, sw: 0.9 }), '0917 123 ••••');
    b += row(74, P('M44.5 70.5 L48.5 68 L52.5 70.5 L48.5 73 Z', B.red, 'none', 0), 'DOrSU, BSIT 1A');
    b += L(12, 84, 102, 84, '#e6e9ef', 0.8) + mini(12, 96, '↗ 1.2K shares', { size: 6, c: B.soft }) + mini(60, 96, '342 likes', { size: 6, c: B.soft }) + R(12, 101, 56, 6, { r: 3, f: '#f3f5f8', s: 'none', sw: 0 });
    // the post spreads to many other phones
    [10, 45, 80].forEach((py) => {
      b += ARROW(110, 60, 125, py + 15, '#9aa6b8', 1.3);
      const sx = 132, sw = 20;
      b += tinyPhone(sx, py, sw, 32, '#fff', C(sx + 6, py + 8, 2.4, B.green, 'none', 0) + R(sx + 10, py + 6.8, 7, 2.4, { r: 1, f: B.ink, s: 'none', sw: 0 }) + [13, 18, 23].map((dy) => R(sx + 4, py + dy, sw - 8, 2.4, { r: 1.2, f: '#e79b93', s: 'none', sw: 0 })).join(''));
    });
    alt = 'An anonymous public post shares Bea\'s photo, her home in Purok 3, Dahican, her phone number, and her school and section. It has 1.2K shares, and the same post spreads to many other phones: doxxing.';
  } else if (kind === 'groom') {
    b = blob(84, 62, 72, 52, '#fbe7da') + ground(36, 116, 26) + ground(124, 116, 30);
    b += phoneS(10, 3, (x, y, w, h) => {
      let g = avatarP(x + w / 2, y + 20, 13, { shirt: B.orange, bg: '#cfe3f3', hair: '#5a3b22' });
      g += T(x + w / 2, y + 43, 'jay_16', { size: 7.5, w: 800, c: B.ink }) + T(x + w / 2, y + 52, '16, Grade 10', { size: 5.8, w: 600, c: B.greyInk });
      g += [60, 66].map((dy, k) => R(x + 8, y + dy, w - 16 - k * 8, 3, { r: 1.5, f: '#dfe3ea', s: 'none', sw: 0 })).join('');
      g += R(x + 5, y + 75, w - 10, 11, { r: 5.5, f: '#2f6fd1', s: 'none', sw: 0 }) + T(x + w / 2, y + 82.5, 'Message', { size: 6, w: 800, c: '#fff' });
      return g;
    });
    b += '<g transform="rotate(-12 50 64)">' + R(34, 57, 32, 13, { r: 2, f: 'rgba(255,255,255,0.85)', s: B.red, sw: 1.5 }) + T(50, 67, 'FAKE', { size: 8.5, w: 800, c: B.red }) + '</g>';
    b += `<path d="M66 50 L98 50" stroke="${B.red}" stroke-width="1.5" stroke-dasharray="3 2"/>` + ARROW(90, 50, 100, 50, B.red, 1.5);
    b += person2(126, 24, 0.52, { shirt: '#6b7a94', hair: '#7a7a7a' }) + R(118.5, 31, 5.5, 4.5, { r: 1.5, f: 'none', s: B.ink, sw: 0.9 }) + R(128.5, 31, 5.5, 4.5, { r: 1.5, f: 'none', s: B.ink, sw: 0.9 }) + L(124, 33, 128.5, 33, B.ink, 0.9);
    b += laptop2(106, 76, 40, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#dfe9f6', s: 'none', sw: 0 }) + C(x + w / 2, y + h / 2, 4, '#8fb0dc', 'none', 0)) + label(126, 12, 'real person', B.soft, '#fff', 6.5);
    alt = 'A friendly profile on a phone, jay_16, 16 years old, Grade 10, is stamped FAKE. The real person behind it is an adult at a laptop: an online predator using a fake identity.';
  }
  return svgWrap(160, 120, alt, b).replace('class="clean"', 'class="clean def-pic"');
}

/** Warning signs of grooming (pattern level only), four soft cards in the backupPic style. 480 x 360. */
export function groomSignsPic() {
  let b = '';
  const cw = 228, ch = 168, xs = [8, 244], ys = [8, 184];
  const card = (i, title, l1, l2) => { const x = xs[i % 2], y = ys[Math.floor(i / 2)]; return R(x, y, cw, ch, { r: 16, f: '#f3f6fa', s: 'none', sw: 0 }) + T(x + cw / 2, y + 26, title, { size: 13.5, w: 800, c: B.ink }) + T(x + cw / 2, y + ch - 30, l1, { size: 11, w: 700, c: B.soft }) + T(x + cw / 2, y + ch - 15, l2, { size: 11, w: 700, c: B.soft }); };
  b += card(0, 'Lots of attention and gifts', 'Sends gifts, load, or money', 'to make you feel special.');
  b += card(1, 'Asks you to keep it secret', 'Wants your chats hidden', 'from parents and friends.');
  b += card(2, 'Moves to a private app', 'Pulls you away from public', 'chats to private ones.');
  b += card(3, 'Asks for photos or a meeting', 'Asks for private photos,', 'or to meet you alone.');
  // 1 gifts: phone notification + gift
  b += R(36, 48, 172, 40, { r: 10, f: '#fff', s: B.line, sw: 1.2 }) + C(56, 68, 9, '#8fb0dc', 'none', 0) + T(72, 64, 'jay_16 sent you', { size: 10.5, w: 700, a: 'start', c: B.ink }) + T(72, 79, '₱200 load', { size: 10.5, w: 800, a: 'start', c: B.green });
  b += gift(100, 94, 40, 24) + heart(160, 104, 0.8) + heart(176, 96, 0.6);
  // 2 secret: chat bubble + shushing
  b += R(272, 52, 172, 34, { r: 12, f: '#fff', s: B.line, sw: 1.2 }) + T(358, 74, '"This is just between us."', { size: 10.5, w: 700, c: B.ink });
  b += '<g transform="translate(0 -8)">' + P('M330 100 L386 100 Q392 100 392 106 L392 126 Q392 132 386 132 L348 132 L338 140 L340 132 L330 132 Q324 132 324 126 L324 106 Q324 100 330 100 Z', '#fff', B.ink, 1.6) + [0, 1, 2].map((k) => C(344 + k * 14, 116, 3, B.greyInk, 'none', 0)).join('') + padlock2(384, 116, false, B.amber, 0.6) + '</g>';
  // 3 private app: public game chat -> lock chat
  b += R(30, 222, 78, 58, { r: 8, f: '#fff', s: B.line, sw: 1.2 }) + T(69, 238, 'Game chat', { size: 9.5, w: 800, c: B.ink }) + [0, 1, 2].map((k) => R(38, 246 + k * 10, 50 - k * 8, 6, { r: 3, f: '#dfe9f6', s: 'none', sw: 0 })).join('') + T(69, 296, 'public', { size: 9.5, w: 700, c: B.soft });
  b += ARROW(114, 251, 148, 251, B.red, 2.2);
  b += R(156, 222, 58, 58, { r: 14, f: '#2b3446', s: 'none', sw: 0 }) + padlock2(173, 258, false, B.amber, 0.7) + T(185, 296, 'private', { size: 9.5, w: 700, c: '#9c2f28' });
  // 4 photos or meeting: camera + lone pin
  b += R(272, 222, 70, 50, { r: 8, f: '#3b4659', sw: 1.6 }) + R(290, 214, 22, 10, { r: 3, f: '#3b4659', sw: 1.4 }) + C(307, 247, 15, '#8fb0dc', B.ink, 1.6) + C(307, 247, 7, '#2b3446', 'none', 0) + C(303, 243, 2.4, '#fff', 'none', 0);
  b += P('M400 232 C400 220 420 220 420 232 C420 242 410 250 410 258 C410 250 400 242 400 232 Z', B.red, B.ink, 1.6) + C(410, 232, 4, '#fff', 'none', 0) + T(410, 278, 'alone', { size: 10, w: 700, c: '#9c2f28' });
  return svgWrap(480, 360, 'Four warning signs of grooming. 1, lots of attention and gifts, such as a message that says jay_16 sent you 200 pesos load. 2, asks you to keep it secret, such as "This is just between us." 3, moves the chat from a public game chat to a private app. 4, asks for private photos, or asks to meet you alone.', b);
}

/** About 1 in 100 Filipino children (IJM Scale of Harm, 2023), redrawn chat 59: a clean 10 x 10 grid of dots with one dot
 *  highlighted and labeled, the number, and a one-line key. 480 x 236. */
export function oneInHundredPic() {
  let b = R(4, 4, 472, 214, { r: 16, f: SOFT, s: 'none', sw: 0 });
  const gx = 34, gy = 34, st = 17;
  b += R(gx - 16, gy - 16, st * 9 + 32, st * 9 + 32, { r: 14, f: '#fff', s: 'none', sw: 0 });
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
    const hot = r === 4 && c === 6;
    b += C(gx + c * st, gy + r * st, hot ? 6.2 : 5.2, hot ? B.orange : '#c9d2df', 'none', 0);
  }
  b += C(gx + 6 * st, gy + 4 * st, 10.5, 'none', B.orange, 1.6);
  b += T(232, 74, '1 in 100', { size: 38, w: 800, a: 'start', c: B.orangeInk });
  b += T(232, 104, 'Filipino children were sexually', { size: 13, w: 600, a: 'start', c: B.ink }) + T(232, 122, 'exploited online for money in', { size: 13, w: 600, a: 'start', c: B.ink }) + T(232, 140, '2022. That is nearly half a', { size: 13, w: 600, a: 'start', c: B.ink }) + T(232, 158, 'million children.', { size: 13, w: 600, a: 'start', c: B.ink });
  b += L(232, 178, 456, 178, '#dfe3ea', 1.2);
  b += T(232, 202, 'Source: IJM and University of Nottingham, 2023', { size: 10, w: 600, a: 'start', c: B.greyInk });
  return svgWrap(480, 222, 'A grid of 100 dots, each standing for one child. One dot is orange. 1 in 100 Filipino children were sexually exploited online for money in 2022, which is nearly half a million children. Source: International Justice Mission and the University of Nottingham, 2023.', b);
}
