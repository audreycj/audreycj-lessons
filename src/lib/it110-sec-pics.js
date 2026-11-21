// IT 110 Network and Internet security pictures (chat 54). Clean SVG strings, same palette and helpers as it110-net-pics.js.
// No real brands: the bank, café, and app names are made up (PeraBank, Kape Mati). Example IPs stay in the documentation ranges.
import { B, T, R, ARROW, svgWrap } from './it110-illus.js';
import { laptopI, phoneI, pcI, routerI, serverI, cloudP, wifiArcs, houseI, personI, lockI, envelope } from './it110-net-pics.js';

const L = (x1, y1, x2, y2, c = B.ink, w = 2, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
const C = (cx, cy, r, f = B.card, s = B.ink, w = 2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${s}" stroke-width="${w}"/>`;
const P = (d, f = 'none', s = B.ink, w = 2) => `<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const lab = (x, y, s, o = {}) => T(x, y, s, { size: o.size ?? 13, w: o.w ?? 700, a: o.a ?? 'middle', c: o.c ?? B.soft, mono: o.mono });
const DASH = ' stroke-dasharray="5 5"';
const HOT = B.orange, AIR = B.blue;

/* ---------- small pieces ---------- */
// a person with a face (x = center, y = top of head)
const face = (x, y, s = 1, shirt = B.blue, hair = B.hair) =>
  P(`M${x - 17 * s} ${y + 58 * s} Q${x - 17 * s} ${y + 30 * s} ${x} ${y + 30 * s} Q${x + 17 * s} ${y + 30 * s} ${x + 17 * s} ${y + 58 * s} Z`, shirt, B.ink, 2)
  + C(x, y + 14 * s, 13 * s, B.skin, B.ink, 2) + P(`M${x - 13 * s} ${y + 12 * s} Q${x - 12 * s} ${y - 1 * s} ${x} ${y} Q${x + 12 * s} ${y - 1 * s} ${x + 13 * s} ${y + 12 * s} Q${x + 4 * s} ${y + 5 * s} ${x - 13 * s} ${y + 12 * s} Z`, hair, B.ink, 1.6)
  + C(x - 4.5 * s, y + 15 * s, 1.4 * s, B.ink, 'none', 0) + C(x + 4.5 * s, y + 15 * s, 1.4 * s, B.ink, 'none', 0);
// a hooded stranger (bad actor)
const hood = (x, y, s = 1) =>
  P(`M${x - 18 * s} ${y + 58 * s} Q${x - 18 * s} ${y + 28 * s} ${x} ${y + 28 * s} Q${x + 18 * s} ${y + 28 * s} ${x + 18 * s} ${y + 58 * s} Z`, '#4a5266', B.ink, 2)
  + P(`M${x - 16 * s} ${y + 30 * s} Q${x - 18 * s} ${y - 2 * s} ${x} ${y - 2 * s} Q${x + 18 * s} ${y - 2 * s} ${x + 16 * s} ${y + 30 * s} Z`, '#4a5266', B.ink, 2)
  + C(x, y + 16 * s, 10 * s, B.skin, B.ink, 1.6) + R(x - 9 * s, y + 11 * s, 18 * s, 5 * s, { r: 2, f: B.ink, s: 'none', sw: 0 });
const check = (x, y, s = 1, c = B.green) => C(x, y, 11 * s, c, 'none', 0) + P(`M${x - 5 * s} ${y} L${x - 1 * s} ${y + 4 * s} L${x + 6 * s} ${y - 5 * s}`, 'none', '#fff', 2.6);
const cross = (x, y, s = 1, c = B.red) => C(x, y, 11 * s, c, 'none', 0) + L(x - 4.5 * s, y - 4.5 * s, x + 4.5 * s, y + 4.5 * s, '#fff', 2.6) + L(x + 4.5 * s, y - 4.5 * s, x - 4.5 * s, y + 4.5 * s, '#fff', 2.6);
const key = (x, y, s = 1, c = B.amber) => C(x, y, 7 * s, c, B.ink, 1.8) + C(x, y, 2.4 * s, B.card, B.ink, 1.2) + P(`M${x + 7 * s} ${y} L${x + 24 * s} ${y} L${x + 24 * s} ${y + 6 * s} M${x + 18 * s} ${y} L${x + 18 * s} ${y + 5 * s}`, 'none', B.ink, 2.4);
// an open or closed padlock, body top-left at (x, y)
const padlock = (x, y, open = false, c = HOT, s = 1) =>
  P(open ? `M${x + 5 * s} ${y} L${x + 5 * s} ${y - 9 * s} Q${x + 5 * s} ${y - 19 * s} ${x + 14 * s} ${y - 19 * s} Q${x + 23 * s} ${y - 19 * s} ${x + 23 * s} ${y - 9 * s} L${x + 23 * s} ${y - 6 * s}`
    : `M${x + 5 * s} ${y} L${x + 5 * s} ${y - 8 * s} Q${x + 5 * s} ${y - 17 * s} ${x + 12 * s} ${y - 17 * s} Q${x + 19 * s} ${y - 17 * s} ${x + 19 * s} ${y - 8 * s} L${x + 19 * s} ${y}`, 'none', B.ink, 3 * s)
  + R(x, y, 24 * s, 19 * s, { r: 3, f: c, sw: 2 }) + C(x + 12 * s, y + 8 * s, 2.4 * s, B.ink, 'none', 0) + L(x + 12 * s, y + 9 * s, x + 12 * s, y + 14 * s, B.ink, 2);
const bubble = (x, y, w, h, tx, ty, f = B.card, s = B.ink) => R(x, y, w, h, { r: 10, f, s, sw: 1.8 }) + P(`M${tx - 7} ${y + h - 1} L${tx} ${ty} L${tx + 7} ${y + h - 1}`, f, s, 1.8) + L(tx - 6, y + h - 1, tx + 6, y + h - 1, f, 3);
const bubbleUp = (x, y, w, h, tx, ty, f = B.card, s = B.ink) => R(x, y, w, h, { r: 10, f, s, sw: 1.8 }) + P(`M${tx - 7} ${y + 1} L${tx} ${ty} L${tx + 7} ${y + 1}`, f, s, 1.8) + L(tx - 6, y + 1, tx + 6, y + 1, f, 3);
const fingerprint = (x, y, s = 1, c = B.blue) => [5, 10, 15, 20].map((r) => P(`M${x - r * s} ${y + 6 * s} Q${x - r * s} ${y - r * 1.2 * s} ${x} ${y - r * 1.25 * s} Q${x + r * s} ${y - r * 1.2 * s} ${x + r * s} ${y + 6 * s}`, 'none', c, 2.2)).join('') + L(x, y - 4 * s, x, y + 12 * s, c, 2.2);
const packet = (x, y, txt, f = B.card, c = B.ink, w = 92) => R(x, y, w, 24, { r: 4, f, s: c, sw: 1.8 }) + T(x + w / 2, y + 16.5, txt, { size: 12.5, w: 700, c, mono: true });
// a browser address bar: x, y, width, url, safe? (lock shown either way: HTTPS)
const addrBar = (x, y, w, url, c = B.ink) => R(x, y, w, 30, { r: 15, f: '#f1f3f6', s: '#b7bfcc', sw: 1.6 }) + lockI(x + 20, y + 13, 0.62, B.soft) + T(x + 34, y + 20, url, { size: 13, w: 700, a: 'start', c, mono: true });

/* ================= PART 1: WHY CARE ================= */

/* ================= PART 2: UNAUTHORIZED ACCESS AND USE ================= */

/* ================= PART 3: ACCESS CONTROL ================= */

/* ================= PART 4: FIREWALLS, ENCRYPTION, VPNs ================= */

/* =====================================================================
   DETAILED DOODLE KIT (chat 54, round 4: her request "more detailed, not just simplified shapes").
   Same clean style and palette, but with real-object details: shading, highlights, faces with
   features, clothes, keyboards, screens with content, soft backdrop blobs, ground shadows, sparkles.
   ===================================================================== */
const SHADE = 'rgba(24, 35, 58, 0.09)', GLOSS = 'rgba(255, 255, 255, 0.55)';
const blob = (cx, cy, rx, ry, f) => {
  const k = [1, 0.92, 1.06, 0.95, 1.03, 0.9, 1.05, 0.97], n = k.length;
  const pt = (i) => { const a = (i / n) * Math.PI * 2; return [cx + Math.cos(a) * rx * k[i % n], cy + Math.sin(a) * ry * k[i % n]]; };
  let d = '';
  for (let i = 0; i < n; i++) { const [x0, y0] = pt(i), [x1, y1] = pt(i + 1); const mx = (x0 + x1) / 2, my = (y0 + y1) / 2; d += (i ? '' : `M${mx.toFixed(1)} ${my.toFixed(1)}`); const [x2, y2] = pt(i + 2); d += ` Q${x1.toFixed(1)} ${y1.toFixed(1)} ${((x1 + x2) / 2).toFixed(1)} ${((y1 + y2) / 2).toFixed(1)}`; }
  return `<path d="${d} Z" fill="${f}"/>`;
};
const ground = (cx, y, rx) => `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${(rx * 0.16).toFixed(1)}" fill="${SHADE}"/>`;
const spark = (x, y, s = 1, c = B.amber) => P(`M${x} ${y - 6 * s} Q${x + 1 * s} ${y - 1 * s} ${x + 6 * s} ${y} Q${x + 1 * s} ${y + 1 * s} ${x} ${y + 6 * s} Q${x - 1 * s} ${y + 1 * s} ${x - 6 * s} ${y} Q${x - 1 * s} ${y - 1 * s} ${x} ${y - 6 * s} Z`, c, 'none', 0);
const dot = (x, y, r = 2, c = B.blueMid) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;

// A person with features. (x = center, y = top of head). About 84*s tall.
const person2 = (x, y, s = 1, o = {}) => {
  const shirt = o.shirt ?? B.blue, hair = o.hair ?? B.hair, skin = o.skin ?? B.skin, dark = o.shirtDark ?? 'rgba(0,0,0,0.16)';
  const S = (v) => (v * s).toFixed(1);
  let g = `<g transform="translate(${x} ${y})">`;
  // body
  g += P(`M${S(-22)} ${S(84)} Q${S(-22)} ${S(46)} ${S(-8)} ${S(42)} L${S(8)} ${S(42)} Q${S(22)} ${S(46)} ${S(22)} ${S(84)} Z`, shirt, B.ink, 2);
  g += P(`M${S(8)} ${S(42)} Q${S(22)} ${S(46)} ${S(22)} ${S(84)} L${S(12)} ${S(84)} Q${S(14)} ${S(56)} ${S(6)} ${S(44)} Z`, dark, 'none', 0);
  g += P(`M${S(-7)} ${S(42)} L${S(0)} ${S(52)} L${S(7)} ${S(42)}`, '#fff', B.ink, 1.6);
  g += P(`M${S(-14)} ${S(60)} L${S(-14)} ${S(84)} M${S(14)} ${S(60)} L${S(14)} ${S(84)}`, 'none', 'rgba(24,35,58,0.45)', 1.4);
  // neck + head
  g += R(-5 * s, 32 * s, 10 * s, 11 * s, { r: 2, f: skin, sw: 1.6 });
  g += `<ellipse cx="${S(-15)}" cy="${S(20)}" rx="${S(3.4)}" ry="${S(4.6)}" fill="${skin}" stroke="${B.ink}" stroke-width="1.6"/><ellipse cx="${S(15)}" cy="${S(20)}" rx="${S(3.4)}" ry="${S(4.6)}" fill="${skin}" stroke="${B.ink}" stroke-width="1.6"/>`;
  g += `<ellipse cx="0" cy="${S(19)}" rx="${S(15)}" ry="${S(17)}" fill="${skin}" stroke="${B.ink}" stroke-width="2"/>`;
  g += P(`M${S(-15.5)} ${S(16)} Q${S(-17)} ${S(-1)} ${S(0)} ${S(1)} Q${S(17)} ${S(-1)} ${S(15.5)} ${S(16)} Q${S(9)} ${S(8)} ${S(2)} ${S(10)} Q${S(-6)} ${S(5)} ${S(-15.5)} ${S(16)} Z`, hair, B.ink, 1.8);
  g += P(`M${S(-7)} ${S(4)} Q${S(-2)} ${S(2)} ${S(3)} ${S(3)}`, 'none', 'rgba(255,255,255,0.35)', 1.6);
  g += P(`M${S(-9)} ${S(16)} Q${S(-6)} ${S(14)} ${S(-3)} ${S(16)} M${S(3)} ${S(16)} Q${S(6)} ${S(14)} ${S(9)} ${S(16)}`, 'none', B.ink, 1.5);
  g += `<circle cx="${S(-6)}" cy="${S(20.5)}" r="${S(2)}" fill="${B.ink}"/><circle cx="${S(6)}" cy="${S(20.5)}" r="${S(2)}" fill="${B.ink}"/><circle cx="${S(-5.3)}" cy="${S(19.8)}" r="${S(0.7)}" fill="#fff"/><circle cx="${S(6.7)}" cy="${S(19.8)}" r="${S(0.7)}" fill="#fff"/>`;
  g += `<circle cx="${S(-10)}" cy="${S(26)}" r="${S(2.6)}" fill="#f2a8a0" opacity=".7"/><circle cx="${S(10)}" cy="${S(26)}" r="${S(2.6)}" fill="#f2a8a0" opacity=".7"/>`;
  g += P(o.sad ? `M${S(-4)} ${S(29)} Q${S(0)} ${S(26)} ${S(4)} ${S(29)}` : `M${S(-4.5)} ${S(27)} Q${S(0)} ${S(31)} ${S(4.5)} ${S(27)}`, 'none', B.ink, 1.6);
  return g + '</g>';
};
// A hooded stranger with dark glasses (x = center, y = top of hood). About 84*s tall.
const hacker2 = (x, y, s = 1) => {
  const S = (v) => (v * s).toFixed(1);
  let g = `<g transform="translate(${x} ${y})">`;
  g += P(`M${S(-24)} ${S(84)} Q${S(-24)} ${S(44)} ${S(0)} ${S(42)} Q${S(24)} ${S(44)} ${S(24)} ${S(84)} Z`, '#4a5266', B.ink, 2);
  g += P(`M${S(10)} ${S(46)} Q${S(24)} ${S(50)} ${S(24)} ${S(84)} L${S(14)} ${S(84)} Q${S(16)} ${S(58)} ${S(6)} ${S(46)} Z`, 'rgba(0,0,0,0.2)', 'none', 0);
  g += P(`M${S(-11)} ${S(70)} Q${S(0)} ${S(76)} ${S(11)} ${S(70)}`, 'none', '#2f3647', 1.6);
  g += P(`M${S(-20)} ${S(40)} Q${S(-24)} ${S(-2)} ${S(0)} ${S(-2)} Q${S(24)} ${S(-2)} ${S(20)} ${S(40)} Q${S(0)} ${S(48)} ${S(-20)} ${S(40)} Z`, '#56607a', B.ink, 2);
  g += `<ellipse cx="0" cy="${S(22)}" rx="${S(13)}" ry="${S(16)}" fill="#252b3a"/>`;
  g += `<ellipse cx="0" cy="${S(25)}" rx="${S(10)}" ry="${S(12)}" fill="${B.skin}"/>`;
  g += R(-11 * s, 18 * s, 22 * s, 7 * s, { r: 3, f: '#111827', s: 'none', sw: 0 }) + P(`M${S(-8)} ${S(20)} L${S(-4)} ${S(20)}`, 'none', 'rgba(255,255,255,0.6)', 1.4);
  g += P(`M${S(-4)} ${S(31)} L${S(4)} ${S(31)}`, 'none', B.ink, 1.5);
  g += L(-5 * s, 42 * s, -6 * s, 56 * s, '#d9dee6', 1.6) + L(5 * s, 42 * s, 6 * s, 56 * s, '#d9dee6', 1.6) + `<circle cx="${S(-6)}" cy="${S(57)}" r="${S(1.6)}" fill="#d9dee6"/><circle cx="${S(6)}" cy="${S(57)}" r="${S(1.6)}" fill="#d9dee6"/>`;
  return g + '</g>';
};
// A laptop with a keyboard and something on the screen. content(x, y, w, h) draws inside the screen.
const laptop2 = (x, y, w = 80, content = null, screen = '#e8f0fb') => {
  const h = w * 0.6, kb = w * 0.18;
  let g = R(x, y, w, h, { r: 5, f: '#2b3446', sw: 2 }) + R(x + 5, y + 5, w - 10, h - 9, { r: 2, f: screen, s: 'none', sw: 0 });
  g += `<circle cx="${x + w / 2}" cy="${y + 2.6}" r="1" fill="#8a94a6"/>`;
  if (content) g += content(x + 5, y + 5, w - 10, h - 9);
  g += P(`M${x + w * 0.62} ${y + 5} L${x + w * 0.78} ${y + 5} L${x + w * 0.5} ${y + h - 4} L${x + w * 0.34} ${y + h - 4} Z`, 'rgba(255,255,255,0.22)', 'none', 0);
  // base seen from the front and a little above (chat 56): the back edge (hinge) is as wide as the screen and the front
  // edge is wider, so the deck widens toward you; key rows widen the same way. Tiny laptops (w < 44) get a plain deck.
  // The base has real thickness: the top deck (keys) plus a front face below it, like the edge of a real laptop body.
  const top = y + h + 1, end = y + h + kb, th = Math.max(2.5, kb * 0.26), bot = end - th, sp = Math.max(4, w * 0.07), d = bot - top;
  g += P(`M${x - sp} ${bot} L${x + w + sp} ${bot} L${x + w + sp} ${end - 2} Q${x + w + sp} ${end} ${x + w + sp - 3} ${end} L${x - sp + 3} ${end} Q${x - sp} ${end} ${x - sp} ${end - 2} Z`, '#b7bfcc', B.ink, 2);
  if (w >= 44) g += R(x + w / 2 - w * 0.07, bot + th * 0.25, w * 0.14, Math.max(1.2, th * 0.3), { r: 1, f: '#a3acba', s: 'none', sw: 0 });
  g += P(`M${x} ${top} L${x + w} ${top} L${x + w + sp} ${bot} L${x - sp} ${bot} Z`, '#e4e8ee', B.ink, 2);
  if (w >= 44) {
    const rows = 4, kh = d * 0.15, gap = d * 0.065, y0 = top + d * 0.12, cx = x + w / 2, n = 13;
    const halfAt = (yy) => { const t = (yy - top) / (bot - top); return w / 2 - 5 + t * sp; };
    for (let r = 0; r < rows; r++) {
      const yy = y0 + r * (kh + gap), hT = halfAt(yy), hB = halfAt(yy + kh);
      const key = (c0, c1) => { const a0 = -hT + (2 * hT) * c0 / n, a1 = -hT + (2 * hT) * c1 / n, b0 = -hB + (2 * hB) * c0 / n, b1 = -hB + (2 * hB) * c1 / n;
        return `<path d="M${(cx + a0 + 0.7).toFixed(1)} ${yy.toFixed(1)} L${(cx + a1 - 0.7).toFixed(1)} ${yy.toFixed(1)} L${(cx + b1 - 0.7).toFixed(1)} ${(yy + kh).toFixed(1)} L${(cx + b0 + 0.7).toFixed(1)} ${(yy + kh).toFixed(1)} Z" fill="#c3cad6"/>`; };
      if (r < rows - 1) for (let c = 0; c < n; c++) g += key(c, c + 1);
      else { for (let c = 0; c < n; c++) if (c < 4 || c > 8) g += key(c, c + 1); g += key(4, 9); }
    }
    const py = y0 + rows * (kh + gap) + d * 0.03, ph = Math.max(2, bot - py - d * 0.1), pw = w * 0.26;
    g += P(`M${cx - pw / 2} ${py} L${cx + pw / 2} ${py} L${cx + pw / 2 + 1.5} ${py + ph} L${cx - pw / 2 - 1.5} ${py + ph} Z`, '#d3d9e2', '#b7bfcc', 0.8);
  }
  return g;
};
// A phone with a status bar and a notch. content(x, y, w, h) draws inside the screen.
const phone2 = (x, y, w = 40, h = 74, content = null, screen = '#e8f0fb') => {
  let g = R(x, y, w, h, { r: w * 0.2, f: '#2b3446', sw: 2 }) + R(x + w + 0.5, y + h * 0.22, 2, h * 0.14, { r: 1, f: '#2b3446', s: 'none', sw: 0 });
  g += R(x + 3.5, y + 4, w - 7, h - 8, { r: w * 0.14, f: screen, s: 'none', sw: 0 });
  g += R(x + w / 2 - w * 0.16, y + 6, w * 0.32, 3.4, { r: 1.7, f: '#2b3446', s: 'none', sw: 0 });
  g += R(x + 7, y + 7, 7, 2, { r: 1, f: '#8a94a6', s: 'none', sw: 0 }) + R(x + w - 14, y + 7, 7, 2.4, { r: 1, f: B.green, s: 'none', sw: 0 });
  if (content) g += content(x + 3.5, y + 12, w - 7, h - 18);
  g += R(x + w / 2 - w * 0.18, y + h - 7, w * 0.36, 1.8, { r: 0.9, f: '#8a94a6', s: 'none', sw: 0 });
  g += P(`M${x + w * 0.7} ${y + 4} L${x + w - 4} ${y + 4} L${x + w - 4} ${y + h * 0.35} Z`, 'rgba(255,255,255,0.25)', 'none', 0);
  return g;
};
// A shiny padlock (body top-left x, y). open = shackle lifted.
const padlock2 = (x, y, open = false, c = HOT, s = 1) => {
  const S = (v) => v * s;
  const sh = open ? `M${x + S(7)} ${y} L${x + S(7)} ${y - S(10)} Q${x + S(7)} ${y - S(22)} ${x + S(18)} ${y - S(22)} Q${x + S(29)} ${y - S(22)} ${x + S(29)} ${y - S(10)} L${x + S(29)} ${y - S(6)}`
    : `M${x + S(7)} ${y} L${x + S(7)} ${y - S(9)} Q${x + S(7)} ${y - S(20)} ${x + S(16)} ${y - S(20)} Q${x + S(25)} ${y - S(20)} ${x + S(25)} ${y - S(9)} L${x + S(25)} ${y}`;
  let g = P(sh, 'none', B.ink, S(6.4)) + P(sh, 'none', '#c9d1dc', S(3.6)) + P(sh, 'none', 'rgba(255,255,255,0.7)', S(1));
  g += R(x, y, S(32), S(25), { r: S(5), f: c, sw: 2 }) + R(x + 2, y + 2, S(32) - 4, S(6), { r: S(3), f: GLOSS, s: 'none', sw: 0 });
  g += `<circle cx="${x + S(16)}" cy="${y + S(12)}" r="${S(3.4)}" fill="${B.ink}"/>` + P(`M${x + S(16)} ${y + S(13)} L${x + S(16)} ${y + S(19)}`, 'none', B.ink, S(3));
  g += `<circle cx="${x + S(4.5)}" cy="${y + S(21)}" r="${S(1.1)}" fill="rgba(0,0,0,0.3)"/><circle cx="${x + S(27.5)}" cy="${y + S(21)}" r="${S(1.1)}" fill="rgba(0,0,0,0.3)"/>`;
  return g;
};
// A detailed key, bow at (x, y), pointing right.
const key2 = (x, y, s = 1, c = B.amber) => {
  const S = (v) => v * s;
  let g = `<circle cx="${x}" cy="${y}" r="${S(10)}" fill="${c}" stroke="${B.ink}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${S(4)}" fill="${B.paper}" stroke="${B.ink}" stroke-width="1.6"/>`;
  g += P(`M${x - S(6)} ${y - S(6)} Q${x - S(2)} ${y - S(9)} ${x + S(3)} ${y - S(8)}`, 'none', GLOSS, 1.8);
  g += R(x + S(9), y - S(3), S(28), S(6), { r: S(1.5), f: c, sw: 1.8 });
  g += P(`M${x + S(24)} ${y + S(3)} L${x + S(24)} ${y + S(9)} L${x + S(28)} ${y + S(9)} L${x + S(28)} ${y + S(6)} L${x + S(32)} ${y + S(6)} L${x + S(32)} ${y + S(10)} L${x + S(37)} ${y + S(10)} L${x + S(37)} ${y + S(3)}`, c, B.ink, 1.8);
  g += L(x + S(12), y - S(1), x + S(34), y - S(1), GLOSS, 1.2);
  return g;
};
const shield2 = (cx, y, s = 1, f = B.blueWash) => {
  const sh = (k) => `M${cx} ${y + k} L${cx + (36 - k) * s} ${y + (12 + k * 0.4) * s} L${cx + (36 - k) * s} ${y + 40 * s} Q${cx + (36 - k) * s} ${y + 66 * s} ${cx} ${y + (80 - k) * s} Q${cx - (36 - k) * s} ${y + 66 * s} ${cx - (36 - k) * s} ${y + 40 * s} L${cx - (36 - k) * s} ${y + (12 + k * 0.4) * s} Z`;
  return P(sh(0), f, B.ink, 2.4) + P(sh(5), 'none', '#fff', 2) + P(`M${cx - 26 * s} ${y + 22 * s} L${cx - 26 * s} ${y + 40 * s} Q${cx - 25 * s} ${y + 54 * s} ${cx - 14 * s} ${y + 64 * s}`, 'none', GLOSS, 3);
};
const envelope2 = (x, y, w = 76, h = 50) => {
  let g = R(x, y, w, h, { r: 4, f: '#f4f7fc', sw: 2 });
  g += P(`M${x + 2} ${y + h - 2} L${x + w * 0.4} ${y + h * 0.5} M${x + w - 2} ${y + h - 2} L${x + w * 0.6} ${y + h * 0.5}`, 'none', '#b7c3d6', 1.6);
  g += P(`M${x + 2} ${y + 2} L${x + w / 2} ${y + h * 0.58} L${x + w - 2} ${y + 2}`, '#dfe8f5', B.ink, 2);
  if (w >= 60) g += R(x + w - 18, y + 7, 11, 13, { r: 1, f: B.orangeWash, s: B.orangeInk, sw: 1.2 }) + L(x + w - 16, y + 12, x + w - 9, y + 12, B.orangeInk, 1) + L(x + w - 16, y + 15, x + w - 10, y + 15, B.orangeInk, 1);
  return g;
};
const server2 = (x, y, w = 38, h = 64) => {
  let g = R(x, y, w, h, { r: 5, f: '#3b4659', sw: 2 }) + R(x + 2, y + 2, 5, h - 4, { r: 2, f: 'rgba(255,255,255,0.12)', s: 'none', sw: 0 });
  for (let k = 0; k < 3; k++) {
    const yy = y + 7 + k * (h - 10) / 3;
    g += R(x + 8, yy, w - 14, (h - 10) / 3 - 5, { r: 2, f: '#2b3446', s: '#56607a', sw: 1 });
    g += [0, 1, 2].map((j) => L(x + 11, yy + 4 + j * 3.2, x + w - 16, yy + 4 + j * 3.2, '#6b7a94', 1)).join('');
    g += `<circle cx="${x + w - 10}" cy="${yy + 6}" r="1.8" fill="${k === 1 ? B.amber : B.green}"/>`;
  }
  return g;
};
const fingerprint2 = (x, y, s = 1, c = B.blue) => {
  let g = '';
  [4, 8, 12, 16, 20, 24].forEach((r, k) => { g += P(`M${x - r * s} ${y + (6 + k) * s} Q${x - r * s} ${y - r * 1.15 * s} ${x} ${y - r * 1.2 * s} Q${x + r * s} ${y - r * 1.15 * s} ${x + r * s} ${y + (4 + k * 1.5) * s}`, 'none', c, 2); });
  return g + P(`M${x} ${y - 2 * s} Q${x + 2 * s} ${y + 8 * s} ${x - 2 * s} ${y + 16 * s}`, 'none', c, 2);
};
const wifi2 = (x, y, c = AIR, s = 1) => [8, 15, 22].map((r) => P(`M${x - r * 0.78 * s} ${y - r * 0.62 * s} A${r * s} ${r * s} 0 0 1 ${x + r * 0.78 * s} ${y - r * 0.62 * s}`, 'none', c, 3.2)).join('') + C(x, y, 3 * s, c, 'none', 0);
const coin = (x, y, r = 12) => C(x, y, r, B.amber, B.ink, 2) + C(x, y, r - 3.5, 'none', '#c98a1c', 1.2) + T(x, y + r * 0.42, '₱', { size: r * 1.15, c: '#7a4e05' }) + P(`M${x - r * 0.55} ${y - r * 0.45} Q${x - r * 0.2} ${y - r * 0.75} ${x + r * 0.2} ${y - r * 0.7}`, 'none', GLOSS, 1.6);
const screenLines = (c = '#b7c7e0') => (x, y, w, h) => R(x, y, w, h * 0.18, { r: 0, f: '#c9d8ee', s: 'none', sw: 0 }) + [0, 1, 2].map((k) => C(x + 4 + k * 4, y + h * 0.09, 1.2, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('') + [0.35, 0.55, 0.75].map((t, k) => R(x + 5, y + h * t, w * [0.7, 0.5, 0.62][k], 3, { r: 1.5, f: c, s: 'none', sw: 0 })).join('');

/** CIA triad cards: 'c' confidentiality, 'i' integrity, 'a' availability. 220 x 120. */
export function ciaPic(kind) {
  let b = '', alt = '';
  if (kind === 'c') {
    b = blob(112, 62, 70, 46, '#e3ecf8') + ground(112, 100, 52) + envelope2(70, 44, 80, 52) + padlock2(126, 74, false, HOT, 0.9);
    b += hacker2(30, 26, 0.72) + cross(52, 30, 0.75) + person2(190, 24, 0.72, { shirt: B.green }) + check(208, 28, 0.75) + spark(160, 22, 0.9) + dot(84, 26, 2.4);
    alt = 'A sealed, locked envelope. Its owner, on the right, can open it; a hooded stranger, on the left, cannot.';
  } else if (kind === 'i') {
    b = blob(118, 62, 72, 48, '#fbe7da') + ground(130, 108, 46);
    b += R(98, 12, 76, 94, { r: 4, f: '#fff', sw: 2 }) + R(98, 12, 76, 20, { r: 4, f: B.blueWash, sw: 2 }) + T(136, 27, 'GRADES', { size: 11.5, c: B.blueInk });
    b += [['GE 1', '1.25'], ['IT 110', '1.50'], ['PE 1', '1.00']].map(([sub, g], k) => T(106, 50 + k * 17, sub, { size: 9.5, w: 700, a: 'start', c: B.soft }) + T(166, 50 + k * 17, g, { size: 11, a: 'end', c: B.ink, mono: true }) + L(106, 54 + k * 17, 166, 54 + k * 17, B.line, 1)).join('');
    b += R(150, 90, 22, 10, { r: 2, f: 'none', s: B.red, sw: 1.4 }) + T(161, 98, 'OK', { size: 8, c: B.red });
    b += check(178, 98, 0.8) + hacker2(44, 30, 0.72) + P('M64 70 L92 60', 'none', '#4a5266', 3) + P('M90 56 L98 62 L92 64 Z', B.amber, B.ink, 1.2) + cross(66, 34, 0.75) + spark(196, 30, 0.9, B.blueMid);
    alt = 'A grade sheet with a green check. A stranger trying to change it with a pencil is blocked.';
  } else {
    b = blob(110, 60, 74, 46, '#dcefe2') + ground(110, 104, 64) + server2(54, 26, 34, 72) + server2(92, 26, 34, 72);
    b += P('M132 70 Q142 70 148 62', 'none', HOT, 2.4) + ARROW(140, 64, 150, 58, HOT, 2.4);
    b += phone2(152, 30, 34, 62, (x, y, w, h) => C(x + w / 2, y + h * 0.42, 9, '#fff', B.blue, 2) + L(x + w / 2, y + h * 0.42, x + w / 2, y + h * 0.42 - 6, B.blue, 1.8) + L(x + w / 2, y + h * 0.42, x + w / 2 + 4, y + h * 0.42 + 2, B.blue, 1.8) + T(x + w / 2, y + h * 0.88, '24/7', { size: 8.5, c: B.blueInk }));
    b += check(44, 30, 0.8) + spark(196, 26, 0.9) + dot(36, 86, 2.4, B.green);
    alt = 'Two servers with green lights send an app to a phone; a clock shows it works 24/7.';
  }
  return svgWrap(220, 120, alt, b);
}

/** The three kinds of access control: 'know', 'have', 'are'. 220 x 120. */
export function factorPic(kind) {
  let b = '', alt = '';
  if (kind === 'know') {
    b = blob(110, 60, 80, 46, '#e3ecf8') + ground(110, 106, 70);
    b += R(30, 22, 160, 44, { r: 10, f: '#fff', s: B.blue, sw: 2.2 }) + T(42, 36, 'Password', { size: 9.5, w: 700, a: 'start', c: B.soft });
    b += [0, 1, 2, 3, 4, 5, 6, 7].map((k) => C(50 + k * 15, 50, 4.4, B.ink, 'none', 0)).join('') + L(172, 41, 172, 59, B.blue, 2);
    b += [0, 1, 2, 3].map((k) => R(52 + k * 30, 76, 24, 24, { r: 6, f: k < 2 ? B.blueWash : '#fff', s: B.ink, sw: 1.6 }) + (k < 2 ? C(64 + k * 30, 88, 3.4, B.ink, 'none', 0) : '')).join('');
    b += T(184, 94, 'PIN', { size: 11, c: B.blueInk }) + spark(196, 18, 0.9);
    alt = 'A password box with dots and a 4-digit PIN being typed: something you know.';
  } else if (kind === 'have') {
    b = blob(110, 60, 82, 46, '#fbe7da') + ground(110, 108, 76);
    b += phone2(26, 16, 40, 78, (x, y, w, h) => T(x + w / 2, y + h * 0.22, 'Code', { size: 7.5, w: 700, c: B.soft }) + T(x + w / 2, y + h * 0.48, '482', { size: 11, c: B.blueInk, mono: true }) + T(x + w / 2, y + h * 0.7, '913', { size: 11, c: B.blueInk, mono: true }));
    b += R(78, 36, 76, 50, { r: 6, f: '#fff', sw: 2 }) + R(78, 36, 76, 13, { r: 6, f: B.blue, s: B.ink, sw: 2 }) + T(116, 46, 'STUDENT ID', { size: 7.5, c: '#fff' });
    b += R(84, 54, 18, 22, { r: 2, f: B.blueWash, s: B.ink, sw: 1.2 }) + C(93, 61, 4, B.skin, 'none', 0) + P('M86 76 Q93 66 100 76', B.blue, 'none', 0) + R(108, 56, 16, 12, { r: 2, f: '#e8b94a', s: B.ink, sw: 1.2 }) + L(108, 74, 146, 74, B.line, 2) + L(108, 80, 136, 80, B.line, 2);
    b += R(164, 50, 24, 40, { r: 5, f: '#2b3446', sw: 2 }) + R(168, 32, 16, 20, { r: 2, f: '#d6dbe3', s: B.ink, sw: 1.6 }) + R(171, 37, 3, 6, { r: 0, f: B.ink, s: 'none', sw: 0 }) + R(178, 37, 3, 6, { r: 0, f: B.ink, s: 'none', sw: 0 }) + C(176, 72, 6, '#e8b94a', B.ink, 1.4) + C(176, 72, 2.4, '#fff3c4', 'none', 0);
    alt = 'A phone showing a one-time code, a student ID card with a chip, and a USB security key: something you have.';
  } else {
    b = blob(110, 60, 82, 46, '#dcefe2') + ground(110, 108, 76);
    b += R(30, 18, 66, 82, { r: 14, f: '#2b3446', sw: 2 }) + R(38, 26, 50, 66, { r: 10, f: '#e3ecf8', s: 'none', sw: 0 }) + fingerprint2(63, 60, 0.95, B.blue) + L(40, 46, 86, 46, 'rgba(63,138,90,0.6)', 2.4);
    b += C(152, 56, 30, '#fff', B.ink, 2) + `<ellipse cx="152" cy="58" rx="16" ry="19" fill="${B.skin}" stroke="${B.ink}" stroke-width="1.8"/>` + P('M136 54 Q137 37 152 38 Q167 37 168 54 Q160 46 152 47 Q144 46 136 54 Z', B.hair, B.ink, 1.6);
    b += C(146, 58, 1.8, B.ink, 'none', 0) + C(158, 58, 1.8, B.ink, 'none', 0) + P('M147 66 Q152 69 157 66', 'none', B.ink, 1.5);
    b += [[118, 22], [186, 22], [118, 90], [186, 90]].map(([x, y]) => P(`M${x} ${y + (y < 50 ? 10 : -10)} L${x} ${y} L${x + (x < 150 ? 10 : -10)} ${y}`, 'none', B.green, 2.8)).join('') + L(124, 56, 180, 56, 'rgba(63,138,90,0.45)', 2);
    alt = 'A fingerprint scanner and a face being scanned: something you are.';
  }
  return svgWrap(220, 120, alt, b);
}

/* ================= DOODLES FOR DEFINITION BOXES ================= */
/** A detailed doodle beside a definition. 160 x 120. */
export function defPic(kind) {
  let b = '', alt = '';
  const W = 160, H = 120;
  switch (kind) {
    case 'security':
      b = blob(84, 62, 66, 50, '#e3ecf8') + ground(86, 112, 50) + shield2(88, 14, 1.1) + laptop2(64, 46, 48, screenLines()) + check(124, 24, 0.85) + hacker2(24, 46, 0.58) + cross(40, 48, 0.62) + spark(136, 96, 0.9) + dot(54, 18, 2.4);
      alt = 'A shield protects a laptop; a hooded stranger is kept out.'; break;
    case 'cybercrime':
      b = blob(76, 64, 66, 48, '#fbe7da') + ground(70, 112, 52) + laptop2(26, 42, 76, (x, y, w, h) => R(x + 4, y + 4, w - 8, 10, { r: 2, f: '#fff', s: 'none', sw: 0 }) + T(x + 8, y + 12, 'e-wallet', { size: 7, w: 700, a: 'start', c: B.blueInk }) + T(x + w / 2, y + h * 0.75, '₱ 0.00', { size: 10, c: B.red, mono: true }));
      b += coin(110, 36, 11) + P('M96 46 Q102 40 106 40', 'none', B.red, 2, ' stroke-dasharray="3 3"') + hacker2(138, 26, 0.58) + spark(18, 30, 0.8, B.red);
      alt = 'An e-wallet on a laptop drops to zero as a coin flies to a hooded stranger.'; break;
    case 'access':
      b = blob(84, 62, 66, 50, '#fbe7da') + ground(84, 112, 60) + phone2(78, 14, 46, 88, (x, y, w, h) => R(x + 4, y + 4, w - 8, 12, { r: 3, f: B.blue, s: 'none', sw: 0 }) + T(x + w / 2, y + 13, 'Chats', { size: 7.5, c: '#fff' }) + [0, 1, 2].map((k) => C(x + 9, y + 26 + k * 13, 4, ['#f2a8a0', '#8fb0dc', '#9fd3ae'][k], 'none', 0) + R(x + 16, y + 23 + k * 13, w - 22, 3, { r: 1.5, f: '#b7c7e0', s: 'none', sw: 0 }) + R(x + 16, y + 28 + k * 13, w - 30, 2.4, { r: 1.2, f: '#d3dbe6', s: 'none', sw: 0 })).join(''));
      b += padlock2(110, 76, true, B.red, 0.62) + hacker2(38, 28, 0.72) + P('M58 74 Q68 66 76 62', 'none', '#4a5266', 4) + spark(140, 22, 0.9);
      alt = 'A stranger reaches into someone else\'s unlocked phone and reads the chats.'; break;
    case 'use':
      b = blob(84, 62, 68, 48, '#fbe7da') + ground(92, 112, 56);
      b += R(64, 16, 80, 54, { r: 5, f: '#2b3446', sw: 2 }) + R(69, 21, 70, 44, { r: 2, f: '#fff3e8', s: 'none', sw: 0 }) + T(104, 33, 'MY SHOP', { size: 9, c: B.orangeInk });
      b += [0, 1, 2].map((k) => R(73 + k * 22, 39, 18, 16, { r: 2, f: ['#fbe2d2', '#dfe9f6', '#dcefe2'][k], s: B.ink, sw: 1 }) + T(82 + k * 22, 61, '₱99', { size: 6.5, w: 700, c: B.soft })).join('');
      b += L(104, 70, 104, 82, B.ink, 3) + R(90, 82, 28, 4, { r: 2, f: '#9aa5b6', sw: 1.4 }) + person2(34, 30, 0.8, { shirt: B.blue }) + R(14, 96, 140, 8, { r: 2, f: '#d9b98c', sw: 1.6 });
      b += R(118, 6, 34, 16, { r: 4, f: B.redWash, s: B.red, sw: 1.6 }) + T(135, 18, 'NOT OK', { size: 7.5, c: B.red });
      alt = 'An office worker runs her own online shop on the office computer, which the company does not allow.'; break;
    case 'hacking':
      b = blob(80, 62, 70, 50, '#e6ebf3') + ground(80, 112, 60) + hacker2(44, 24, 0.82) + laptop2(62, 66, 52, (x, y, w, h) => [0, 1, 2].map((k) => T(x + 3, y + 7 + k * 7, ['>_ login', '01101 1', 'access'][k], { size: 5.5, w: 700, a: 'start', c: '#7fe0a0', mono: true })).join(''), '#121a2a');
      b += padlock2(118, 30, true, B.red, 0.8) + L(114, 26, 108, 18, B.ink, 2) + L(146, 26, 152, 18, B.ink, 2) + L(130, 16, 130, 8, B.ink, 2) + spark(20, 26, 0.8, B.red);
      alt = 'A hooded hacker types commands on a laptop, and a padlock breaks open.'; break;
    case 'wardrive':
      b = blob(80, 66, 72, 46, '#fbe7da') + ground(82, 110, 62);
      b += P('M22 92 L32 70 Q38 60 54 60 L104 60 Q118 60 126 70 L140 92 Z', '#9fb4d3', B.ink, 2) + P('M40 72 Q44 64 56 64 L76 64 L76 76 L38 76 Z M82 64 L102 64 Q112 64 118 72 L120 76 L82 76 Z', '#e8f0fb', B.ink, 1.6);
      b += R(14, 88, 134, 16, { r: 7, f: '#7f98bd', sw: 2 }) + L(80, 64, 80, 88, B.ink, 1.4) + R(140, 92, 6, 5, { r: 1, f: B.amber, s: 'none', sw: 0 });
      b += [42, 120].map((x) => C(x, 104, 10, '#2b3446', B.ink, 2) + C(x, 104, 4, '#c8ced8', 'none', 0)).join('') + laptop2(50, 66, 18, null, B.orangeWash);
      b += wifi2(96, 40, HOT, 0.8) + wifi2(130, 28, '#c3cad6', 0.6) + wifi2(40, 24, '#c3cad6', 0.6) + T(96, 14, '?', { size: 14, c: B.orangeInk });
      alt = 'A car with a laptop inside drives around looking for Wi-Fi signals.'; break;
    case 'piggyback':
      b = blob(80, 62, 74, 48, '#e3ecf8') + ground(44, 110, 40) + ground(126, 110, 34) + houseI(6, 38, 76) + wifi2(66, 48, AIR, 0.85);
      b += P('M84 42 Q100 30 114 44', 'none', B.blueMid, 2.2, ' stroke-dasharray="4 4"') + laptop2(106, 70, 38, screenLines(), B.orangeWash) + person2(132, 44, 0.42, { shirt: B.orange }) + cross(146, 40, 0.6);
      alt = 'A neighbor\'s laptop uses the Wi-Fi from the house next door without asking.'; break;
    case 'intercept':
      b = blob(80, 60, 72, 48, '#e3ecf8') + ground(120, 112, 30);
      b += L(6, 64, 154, 64, AIR, 2.2, DASH) + R(36, 52, 58, 24, { r: 5, f: '#fff', sw: 1.8 }) + envelope2(42, 56, 18, 14) + T(78, 69, 'data', { size: 10, c: B.ink, mono: true });
      b += C(66, 34, 18, 'rgba(223,233,246,0.6)', B.ink, 2.4) + P('M56 28 Q60 22 68 22', 'none', '#fff', 2.4) + P('M78 47 L96 66', 'none', '#8f4a34', 6) + P('M78 47 L96 66', 'none', B.ink, 1.6);
      b += hacker2(122, 52, 0.6) + spark(140, 22, 0.9);
      alt = 'A stranger holds a magnifying glass over data while it travels on a network.'; break;
    case 'twin': {
      const tw = (x, c, horns) => R(x - 30, 34, 60, 52, { r: 10, f: '#fff', s: c, sw: 2 }) + wifi2(x, 74, c, 1.05) + (horns ? P(`M${x - 22} 36 L${x - 18} 22 L${x - 12} 35 M${x + 22} 36 L${x + 18} 22 L${x + 12} 35`, B.red, B.ink, 1.6) + P(`M${x + 28} 70 Q${x + 40} 76 ${x + 36} 88 L${x + 40} 92 L${x + 32} 92 Z`, B.red, B.ink, 1.4) : '');
      b = blob(80, 64, 74, 48, '#fbe7da') + ground(42, 104, 26) + ground(118, 104, 26) + tw(42, B.blue, false) + tw(118, B.red, true);
      b += lab(42, 110, 'real', { size: 12.5, c: B.blue }) + lab(118, 110, 'fake', { size: 12.5, c: B.red }) + T(80, 66, '≈', { size: 18, c: B.soft });
      alt = 'Two Wi-Fi signs that look almost the same. The fake one has little devil horns and a tail.'; break;
    }
    case 'acl':
      b = blob(80, 62, 74, 48, '#dcefe2') + ground(64, 112, 58);
      b += R(10, 30, 12, 78, { r: 3, f: '#c8ced8', sw: 2 }) + R(106, 30, 12, 78, { r: 3, f: '#c8ced8', sw: 2 }) + C(16, 28, 7, '#9aa5b6', B.ink, 1.6) + C(112, 28, 7, '#9aa5b6', B.ink, 1.6);
      b += R(22, 48, 84, 8, { r: 2, f: B.amber, s: B.ink, sw: 1.6 }) + [0, 1, 2, 3, 4].map((k) => L(30 + k * 17, 56, 30 + k * 17, 106, B.ink, 2.4)).join('') + L(22, 80, 106, 80, B.ink, 1.6);
      b += R(116, 8, 40, 52, { r: 4, f: '#fff', sw: 1.8 }) + R(130, 4, 12, 7, { r: 2, f: '#9aa5b6', s: B.ink, sw: 1.2 }) + T(136, 22, 'ALLOWED', { size: 6.5, c: B.green });
      b += [0, 1, 2].map((k) => check(124, 31 + k * 10, 0.33) + L(130, 31 + k * 10, 150, 31 + k * 10, B.line, 2)).join('') + person2(136, 66, 0.48, { shirt: '#2f5f9e' });
      alt = 'A school gate with a guard holding the list of people allowed in.'; break;
    case 'ident':
      b = blob(80, 62, 64, 50, '#e3ecf8') + ground(80, 112, 40) + person2(80, 8, 0.95, { shirt: B.green, hair: '#3a2a20' });
      b += R(48, 70, 64, 34, { r: 6, f: '#fff', s: B.blue, sw: 2 }) + R(48, 70, 64, 11, { r: 6, f: B.blue, s: B.blue, sw: 2 }) + T(80, 79, 'HELLO, I AM', { size: 6.5, c: '#fff' }) + T(80, 97, 'Mia', { size: 14, c: B.ink }) + spark(130, 24, 0.9) + dot(30, 30, 2.4);
      alt = 'A girl with a name tag that says "Hello, I am Mia": who she says she is.'; break;
    case 'authn':
      b = blob(80, 62, 70, 48, '#dcefe2') + ground(80, 110, 60);
      b += R(18, 22, 58, 76, { r: 12, f: '#2b3446', sw: 2 }) + R(24, 28, 46, 64, { r: 8, f: '#e3ecf8', s: 'none', sw: 0 }) + fingerprint2(47, 62, 0.85, B.blue);
      b += key2(98, 58, 1.05) + check(136, 26, 0.95) + T(122, 92, 'proven!', { size: 11, c: B.green });
      alt = 'A fingerprint scanner and a key: proving you are who you say you are.'; break;
    case 'mfa':
      b = blob(80, 62, 74, 48, '#e3ecf8') + ground(80, 110, 66);
      b += R(6, 32, 76, 30, { r: 7, f: '#fff', s: B.blue, sw: 2 }) + [0, 1, 2, 3, 4, 5].map((k) => C(17 + k * 11, 47, 3.4, B.ink, 'none', 0)).join('');
      b += C(94, 47, 9, B.orangeWash, B.orangeInk, 1.6) + T(94, 52, '+', { size: 15, c: B.orangeInk });
      b += phone2(110, 12, 40, 76, (x, y, w, h) => T(x + w / 2, y + h * 0.25, 'Your code', { size: 6, w: 700, c: B.soft }) + T(x + w / 2, y + h * 0.5, '482', { size: 11, c: B.blueInk, mono: true }) + T(x + w / 2, y + h * 0.7, '913', { size: 11, c: B.blueInk, mono: true }));
      b += lab(44, 82, 'something', { size: 11 }) + lab(44, 96, 'you know', { size: 12, c: B.blueInk }) + lab(130, 104, 'you have', { size: 12, c: B.blueInk });
      alt = 'A password plus a code on a phone: two different kinds of proof.'; break;
    case 'passkey':
      b = blob(80, 62, 66, 50, '#dcefe2') + ground(80, 112, 40);
      b += phone2(54, 8, 52, 100, (x, y, w, h) => T(x + w / 2, y + 10, 'Sign in', { size: 7, w: 700, c: B.soft }) + C(x + w / 2, y + h * 0.48, 16, '#fff', B.green, 2) + fingerprint2(x + w / 2, y + h * 0.52, 0.55, B.green) + R(x + 5, y + h * 0.82, w - 10, 9, { r: 4.5, f: B.green, s: 'none', sw: 0 }) + T(x + w / 2, y + h * 0.82 + 7, 'passkey', { size: 6.5, c: '#fff' }));
      b += key2(112, 88, 0.85) + spark(40, 30, 0.9) + spark(128, 26, 0.7, B.green);
      alt = 'A phone signs in with a fingerprint and a passkey, with no password to type.'; break;
    case 'firewall': {
      b = blob(80, 62, 72, 50, '#fbe7da') + ground(80, 112, 30);
      b += R(62, 26, 36, 84, { r: 2, f: '#d06b45', sw: 2 });
      for (let r = 0, y = 26; y < 108; r++, y += 12) { b += L(62, y, 98, y, '#8f4a34', 1.3); b += L(r % 2 ? 74 : 86, y, r % 2 ? 74 : 86, Math.min(y + 12, 110), '#8f4a34', 1.3); }
      b += P('M66 26 Q64 14 72 8 Q72 18 78 16 Q76 6 84 2 Q86 14 92 12 Q96 20 94 26 Z', '#f6ad3a', B.ink, 1.6) + P('M72 26 Q72 18 78 20 Q80 12 86 14 Q88 22 88 26 Z', '#fde3a1', 'none', 0);
      b += ARROW(8, 44, 58, 44, B.green, 2.6) + ARROW(102, 44, 150, 44, B.green, 2.6) + envelope2(16, 30, 18, 13);
      b += ARROW(8, 88, 56, 88, B.red, 2.6) + cross(48, 74, 0.7) + T(30, 106, 'stranger', { size: 9.5, c: B.red });
      alt = 'A brick firewall lets mail you asked for through and stops a stranger.'; break;
    }
    case 'ips':
      b = blob(80, 62, 72, 48, '#e6ebf3') + ground(80, 112, 60);
      b += R(10, 10, 6, 26, { r: 2, f: '#9aa5b6', sw: 1.6 }) + L(16, 22, 34, 22, B.ink, 3) + P('M30 12 L92 20 L90 40 L28 34 Z', '#e6eaf0', B.ink, 2) + C(92, 30, 10, '#2b3446', B.ink, 2) + C(92, 30, 4.5, '#5a7fb8', 'none', 0) + C(90, 28, 1.6, '#fff', 'none', 0) + C(40, 24, 2.6, B.red, 'none', 0);
      b += P('M100 30 L140 14 L140 52 Z', 'rgba(238,176,74,0.25)', 'none', 0);
      b += R(84, 62, 66, 42, { r: 8, f: B.red, sw: 2 }) + R(88, 66, 58, 34, { r: 6, f: 'none', s: '#fff', sw: 1.6 }) + T(117, 88, 'BLOCKED', { size: 10.5, c: '#fff' }) + hacker2(40, 52, 0.6) + cross(58, 56, 0.6);
      alt = 'A security camera spots a stranger and a red sign blocks him right away.'; break;
    case 'encrypt':
      b = blob(80, 62, 74, 46, '#dcefe2') + ground(80, 108, 66);
      b += R(4, 42, 46, 30, { r: 6, f: '#fff', sw: 2 }) + T(27, 62, 'Hi!', { size: 13, c: B.ink, mono: true }) + T(27, 36, 'plaintext', { size: 8.5, w: 700, c: B.soft });
      b += ARROW(52, 57, 60, 57, B.ink, 2) + padlock2(62, 52, false, HOT, 0.72) + key2(68, 96, 0.55) + ARROW(88, 57, 104, 57, B.ink, 2);
      b += R(106, 42, 50, 30, { r: 6, f: B.greenWash, s: B.green, sw: 2 }) + T(131, 62, 'x#9@', { size: 13, c: B.green, mono: true }) + T(131, 36, 'ciphertext', { size: 8.5, w: 700, c: B.green });
      alt = 'The readable message "Hi!" goes through a lock with a key and comes out scrambled as "x#9@".'; break;
    case 'symmetric':
      b = blob(80, 58, 70, 46, '#fbe7da') + ground(80, 98, 50);
      b += padlock2(16, 52, false, HOT, 0.85) + key2(70, 54, 1.1) + padlock2(118, 52, true, HOT, 0.85);
      b += lab(30, 92, 'lock', { size: 11.5 }) + lab(132, 92, 'unlock', { size: 11.5 }) + lab(80, 112, 'the SAME secret key', { size: 12, c: B.orangeInk });
      alt = 'One key that both locks and unlocks the padlock.'; break;
    case 'asymmetric':
      b = blob(80, 58, 74, 46, '#e3ecf8') + ground(42, 92, 26) + ground(118, 92, 30);
      b += padlock2(26, 60, true, HOT, 1) + key2(98, 64, 1.05) + spark(140, 26, 0.8);
      b += lab(42, 104, 'public key', { size: 11.5, c: B.orangeInk }) + lab(42, 117, 'locks', { size: 11 }) + lab(118, 104, 'private key', { size: 11.5, c: B.orangeInk }) + lab(118, 117, 'unlocks', { size: 11 });
      alt = 'An open padlock (the public key, which locks) and a key (the private key, which unlocks).'; break;
  }
  return `<svg class="clean def-pic" viewBox="0 0 ${W} ${H + (kind === 'asymmetric' ? 2 : 0)}" role="img" aria-label="${alt.replace(/"/g, '&quot;')}">${b}</svg>`;
}

/* ================= BIG FIGURES REDRAWN WITH THE DETAILED KIT (chat 54, round 9) ================= */
const globe = (cx, cy, r) => C(cx, cy, r, '#dfe9f6', B.ink, 2.2) + P(`M${cx - r} ${cy} L${cx + r} ${cy} M${cx} ${cy - r} L${cx} ${cy + r}`, 'none', B.blue, 1.6)
  + `<ellipse cx="${cx}" cy="${cy}" rx="${r * 0.45}" ry="${r}" fill="none" stroke="${B.blue}" stroke-width="1.6"/>` + P(`M${cx - r * 0.86} ${cy - r * 0.5} Q${cx} ${cy - r * 0.3} ${cx + r * 0.86} ${cy - r * 0.5} M${cx - r * 0.86} ${cy + r * 0.5} Q${cx} ${cy + r * 0.3} ${cx + r * 0.86} ${cy + r * 0.5}`, 'none', B.blue, 1.4)
  + P(`M${cx - r * 0.55} ${cy - r * 0.62} Q${cx - r * 0.3} ${cy - r * 0.8} ${cx} ${cy - r * 0.78}`, 'none', GLOSS, 2.4);
const wall = (x, y, w, h) => {
  let g = R(x, y, w, h, { r: 3, f: '#c9653f', sw: 2.2 });
  for (let r = 0, yy = y; yy < y + h - 1; r++, yy += 16) {
    if (yy > y) g += L(x, yy, x + w, yy, '#8f4a34', 1.4);
    const offs = r % 2 ? [w * 0.33, w * 0.83] : [w * 0.58];
    offs.forEach((o) => { g += L(x + o, yy, x + o, Math.min(yy + 16, y + h), '#8f4a34', 1.4); });
    g += R(x + 3, yy + 3, w * 0.22, 3, { r: 1.5, f: 'rgba(255,255,255,0.22)', s: 'none', sw: 0 });
  }
  return g;
};
const lane = (x, y, w, txt, ok) => R(x, y, w, 34, { r: 17, f: ok ? '#e3f3e9' : '#fdeee9', s: ok ? '#3f8a5a' : '#b23a33', sw: 2 }) + T(x + w / 2 + 11, y + 22, txt, { size: 12.5, w: 600, c: ok ? '#2f6b45' : '#9c2f28' });

/** A firewall between the Internet and your network: two allowed messages pass, a stranger is stopped. 480 x 270. */
export function firewallPic() {
  // Roomier redraw (chat 56, her feedback: congested; the globe touched the lines). Short lane labels, clear gaps between parts.
  const ys = [36, 122, 208], LX = 112, LW = 176;
  let b = globe(42, 136, 26) + T(42, 184, 'the Internet', { size: 13.5, w: 700, c: B.ink });
  // dotted paths from the globe to each lane, starting a little away from the globe
  b += ys.map((y) => P(`M76 136 C92 136 92 ${y + 17} ${LX - 6} ${y + 17}`, 'none', '#9aa5b6', 1.8, ' stroke-dasharray="4 4"')).join('');
  b += lane(LX, ys[0], LW, 'page you asked for', true) + C(LX + 20, ys[0] + 17, 11, '#fff', '#3f8a5a', 1.8) + R(LX + 14, ys[0] + 10, 12, 14, { r: 1.5, f: '#fff', s: '#2f6b45', sw: 1.4 }) + L(LX + 17, ys[0] + 15, LX + 23, ys[0] + 15, '#2f6b45', 1.2) + L(LX + 17, ys[0] + 19, LX + 23, ys[0] + 19, '#2f6b45', 1.2);
  b += lane(LX, ys[1], LW, 'stranger breaking in', false) + C(LX + 20, ys[1] + 17, 11, '#fff', '#b23a33', 1.8) + C(LX + 20, ys[1] + 14, 3.6, '#4a5266', 'none', 0) + P(`M${LX + 13} ${ys[1] + 24} Q${LX + 20} ${ys[1] + 16} ${LX + 27} ${ys[1] + 24} Z`, '#4a5266', 'none', 0);
  b += lane(LX, ys[2], LW, 'your video call', true) + C(LX + 20, ys[2] + 17, 11, '#fff', '#3f8a5a', 1.8) + R(LX + 14, ys[2] + 12, 9, 10, { r: 2, f: '#3f8a5a', s: 'none', sw: 0 }) + P(`M${LX + 23} ${ys[2] + 17} L${LX + 28} ${ys[2] + 13} L${LX + 28} ${ys[2] + 21} Z`, '#3f8a5a', 'none', 0);
  // wall with a small flame
  const WX = 306;
  b += P(`M${WX + 4} 26 Q${WX} 10 ${WX + 10} 4 Q${WX + 10} 16 ${WX + 16} 14 Q${WX + 14} 4 ${WX + 24} 0 Q${WX + 28} 14 ${WX + 32} 12 Q${WX + 36} 20 ${WX + 32} 26 Z`, '#f6ad3a', B.ink, 1.6) + P(`M${WX + 10} 26 Q${WX + 10} 18 ${WX + 16} 19 Q${WX + 18} 12 ${WX + 24} 14 Q${WX + 26} 22 ${WX + 26} 26 Z`, '#fde3a1', 'none', 0);
  b += wall(WX, 26, 34, 236) + T(WX + 17, 284, 'firewall', { size: 13.5, w: 700, c: '#a6461f' });
  // through or stopped
  b += ARROW(LX + LW + 2, ys[0] + 17, 360, ys[0] + 17, '#3f8a5a', 2.6) + check(WX + 17, ys[0] + 17, 0.85) + ARROW(LX + LW + 2, ys[2] + 17, 360, ys[2] + 17, '#3f8a5a', 2.6) + check(WX + 17, ys[2] + 17, 0.85);
  b += L(LX + LW + 2, ys[1] + 17, WX - 2, ys[1] + 17, '#b23a33', 2.4) + cross(WX - 4, ys[1] + 17, 0.95);
  // your network
  b += R(366, 26, 106, 236, { r: 14, f: '#e3ecf8', s: B.blue, sw: 2 }) + laptop2(386, 48, 66, screenLines());
  b += phone2(384, 136, 30, 56, screenLines()) + R(424, 148, 38, 26, { r: 3, f: '#2b3446', sw: 2 }) + R(427, 151, 32, 20, { r: 1, f: '#e8f0fb', s: 'none', sw: 0 }) + L(443, 174, 443, 184, B.ink, 2.4) + L(434, 185, 452, 185, B.ink, 2.4);
  b += T(419, 240, 'your network', { size: 13.5, w: 700, c: B.blueInk });
  b = `<g transform="translate(0 8)">${b}</g>`;
  return svgWrap(480, 302, 'A firewall stands between the Internet and your network. The page you asked for and your video call pass through. A stranger trying to break in from outside is stopped at the wall.', b);
}

/** How a second factor stops a stolen password. step 0..3 (StepShow). 480 x 230. */
export function mfaPic(step) {
  let b = blob(240, 120, 230, 108, '#f6f8fb') + ground(70, 196, 50) + ground(406, 196, 46);
  b += step === 3 ? hacker2(66, 66, 1.05) + phone2(98, 116, 26, 48, screenLines()) : hacker2(56, 66, 1.05) + laptop2(78, 138, 56, (x, y, w, h) => R(x + 3, y + 3, w - 6, 5, { r: 1, f: '#c9d8ee', s: 'none', sw: 0 }), '#e8f0fb');
  // stolen password note
  b += R(16, 14, 112, 34, { r: 6, f: '#fff3c4', s: B.ink, sw: 1.6 }) + T(72, 36, 'pass: mia2007', { size: 13, w: 600, c: '#9c2f28', mono: true }) + P('M60 48 L58 60', 'none', B.ink, 1.4);
  // login window
  b += R(166, 20, 164, 150, { r: 10, f: '#fff', sw: 2 }) + R(166, 20, 164, 28, { r: 10, f: '#dfe9f6', sw: 2 }) + `<rect x="168" y="38" width="160" height="9" fill="#dfe9f6"/>` + [0, 1, 2].map((k) => C(180 + k * 11, 34, 3.4, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('') + T(270, 38, 'PeraBank', { size: 13, w: 600, c: B.blueInk });
  if (step === 0) {
    b += T(182, 72, 'Email', { size: 11, w: 600, a: 'start', c: B.soft }) + R(180, 78, 136, 24, { r: 6, f: '#f4f6f9', s: B.line, sw: 1.4 }) + T(188, 95, 'mia@mail.ph', { size: 12, w: 600, a: 'start', c: B.ink, mono: true });
    b += T(182, 120, 'Password', { size: 11, w: 600, a: 'start', c: B.soft }) + R(180, 126, 136, 24, { r: 6, f: '#f4f6f9', s: B.line, sw: 1.4 }) + [0, 1, 2, 3, 4, 5, 6].map((k) => C(192 + k * 12, 138, 3.4, B.ink, 'none', 0)).join('');
    b += ARROW(132, 112, 172, 112, '#b23a33', 2.6) + check(318, 138, 0.8);
  } else {
    b += T(248, 74, 'Enter the code we', { size: 12.5, w: 600, c: B.ink }) + T(248, 92, 'sent to your phone', { size: 12.5, w: 600, c: B.ink });
    b += [0, 1, 2, 3, 4, 5].map((k) => R(180 + k * 23, 108, 19, 28, { r: 5, f: '#f4f6f9', s: B.line, sw: 1.4 }) + (step === 3 ? T(189.5 + k * 23, 128, '?', { size: 14, w: 700, c: '#b23a33' }) : '')).join('');
    if (step === 2) b += cross(248, 156, 1);
    b += person2(406, 54, 1.0, { shirt: B.green, hair: '#3a2a20' }) + phone2(440, 104, 30, 54, (x, y, w, h) => T(x + w / 2, y + h * 0.45, '482', { size: 9.5, w: 700, c: B.blueInk, mono: true }) + T(x + w / 2, y + h * 0.75, '913', { size: 9.5, w: 700, c: B.blueInk, mono: true }));
    b += T(406, 214, 'Mia, at home', { size: 13, w: 600, c: B.soft });
    b += P('M334 100 Q384 70 432 112', 'none', HOT, 2.4, ' stroke-dasharray="5 4"') + ARROW(424, 104, 436, 114, HOT, 2.4);
    if (step === 3) {
      b += R(150, 176, 210, 44, { r: 12, f: '#fdeee9', s: '#b23a33', sw: 1.8 }) + P('M168 177 L150 158 L182 177', '#fdeee9', '#b23a33', 1.8) + L(170, 177, 180, 177, '#fdeee9', 3);
      b += T(255, 194, '"Hi, this is PeraBank. Please', { size: 12, w: 600, c: '#9c2f28' }) + T(255, 210, 'read me the code we sent."', { size: 12, w: 600, c: '#9c2f28' });
    }
  }
  return svgWrap(480, 230, ['A stranger has Mia\'s stolen password and types it into the PeraBank login page. The password is correct.', 'The site asks for a six-digit code and sends it to Mia\'s phone at home, not to the stranger.', 'The stranger has no code, so the login fails.', 'So the stranger calls Mia pretending to be the bank and asks her to read the code aloud.'][step], b);
}

/** Public key encryption as open padlocks. step 0..3 (StepShow). 480 x 230. */
export function padlockPic(step) {
  let b = blob(240, 116, 230, 104, '#f6f8fb') + ground(60, 200, 44) + ground(420, 200, 44) + ground(240, 214, 34);
  b += P('M43 112 Q38 142 46 150 L74 150 Q82 142 77 112 Z', '#3a2a20', B.ink, 1.8) + person2(60, 96, 1.05, { shirt: B.green, hair: '#3a2a20' }) + T(60, 222, 'Ana', { size: 14, w: 600, c: B.ink });
  b += person2(420, 96, 1.05, { shirt: B.blue }) + T(420, 222, 'Ben', { size: 14, w: 600, c: B.ink });
  b += hacker2(240, 140, 0.85);
  // Ana's private key on a tag
  b += key2(22, 52, 0.95) + R(14, 70, 92, 22, { r: 6, f: '#fff', s: B.amber, sw: 1.6 }) + T(60, 85, 'private key', { size: 11.5, w: 600, c: '#8f6a0e' });
  const box = (x, y, locked) => R(x, y, 68, 46, { r: 5, f: '#e9c88f', sw: 2 }) + L(x + 34, y, x + 34, y + 46, '#b8935a', 2) + R(x, y, 68, 10, { r: 5, f: 'rgba(255,255,255,0.25)', s: 'none', sw: 0 }) + T(x + 34, y + 32, 'secret', { size: 11, w: 600, c: '#6b4a1a' }) + (locked ? padlock2(x + 54, y + 20, false, HOT, 0.62) : '');
  if (step === 0) {
    b += [130, 172, 214].map((x) => padlock2(x, 74, true, HOT, 0.85)).join('') + T(198, 112, 'public key (open padlocks)', { size: 12, w: 600, c: '#a6461f' });
    b += P('M250 64 Q300 40 350 64', 'none', B.ink, 2, ' stroke-dasharray="5 4"') + ARROW(342, 58, 354, 66, B.ink, 2.2) + padlock2(352, 74, true, HOT, 0.85);
  } else if (step === 1) {
    b += box(330, 62, true) + T(364, 130, 'locked with', { size: 11.5, w: 600, c: B.soft }) + T(364, 145, 'Ana\'s padlock', { size: 11.5, w: 600, c: '#a6461f' });
  } else if (step === 2) {
    b += box(206, 56, true) + ARROW(328, 80, 284, 80, B.ink, 2.4) + ARROW(200, 80, 128, 80, B.ink, 2.4) + cross(284, 152, 0.9) + T(240, 40, 'traveling across the Internet', { size: 12, w: 600, c: B.soft });
  } else if (step === 4) {
    // the payoff: what travels in the locked box is a NEW SECRET KEY; afterwards both hold the same key
    b += R(206, 56, 68, 46, { r: 5, f: '#e9c88f', sw: 2 }) + L(240, 56, 240, 102, '#b8935a', 2) + key2(214, 86, 0.6, '#f2c94c') + padlock2(260, 76, false, HOT, 0.62);
    b += ARROW(328, 80, 284, 80, B.ink, 2.4) + ARROW(200, 80, 128, 80, B.ink, 2.4) + T(240, 40, 'a new secret key, locked', { size: 12, w: 700, c: B.soft });
    b += key2(96, 156, 0.6, '#f2c94c') + key2(352, 156, 0.6, '#f2c94c') + cross(284, 152, 0.9) + label(240, 226, 'now both have the same secret key', '#7a5a0c', '#fff3c4', 11.5);
  } else {
    b += box(110, 120, false) + padlock2(186, 128, true, HOT, 0.75) + key2(150, 106, 0.75) + check(214, 108, 0.9);
  }
  return svgWrap(480, step === 4 ? 240 : 230, ['Ana gives out open padlocks, her public key. Anyone may have one. She keeps the only key, her private key.', 'Ben puts his secret message in a box and snaps Ana\'s padlock shut.', 'The locked box travels across the Internet. A stranger sees it but cannot open it.', 'Ana opens the box with her private key, which only she has.', 'Ben locks a new secret key in the box with Ana\'s padlock and sends it. The stranger cannot open it. After Ana unlocks it, Ana and Ben both hold the same secret key.'][step], b);
}

/* ================= ROUND 15: the remaining figures, redrawn with the detailed kit ================= */
const router2 = (x, y, w = 70) => {
  let g = L(x + 12, y + 2, x + 6, y - 22, B.ink, 3.2) + L(x + w - 12, y + 2, x + w - 6, y - 22, B.ink, 3.2) + C(x + 6, y - 23, 2.4, B.ink, 'none', 0) + C(x + w - 6, y - 23, 2.4, B.ink, 'none', 0);
  g += R(x, y, w, 24, { r: 8, f: '#f4f6f9', sw: 2 }) + R(x + 3, y + 3, w - 6, 6, { r: 3, f: GLOSS, s: 'none', sw: 0 });
  g += [0, 1, 2, 3].map((k) => C(x + 14 + k * 11, y + 15, 2.6, k === 3 ? B.amber : B.green, 'none', 0)).join('');
  return g;
};
const car2 = (x, y, s = 1, body = '#9fb4d3') => {
  const S = (v) => v * s;
  let g = P(`M${x + S(8)} ${y + S(32)} L${x + S(18)} ${y + S(10)} Q${x + S(24)} ${y} ${x + S(40)} ${y} L${x + S(90)} ${y} Q${x + S(104)} ${y} ${x + S(112)} ${y + S(10)} L${x + S(126)} ${y + S(32)} Z`, body, B.ink, 2);
  g += P(`M${x + S(26)} ${y + S(12)} Q${x + S(30)} ${y + S(5)} ${x + S(42)} ${y + S(5)} L${x + S(62)} ${y + S(5)} L${x + S(62)} ${y + S(17)} L${x + S(24)} ${y + S(17)} Z M${x + S(68)} ${y + S(5)} L${x + S(88)} ${y + S(5)} Q${x + S(98)} ${y + S(5)} ${x + S(104)} ${y + S(13)} L${x + S(106)} ${y + S(17)} L${x + S(68)} ${y + S(17)} Z`, '#e8f0fb', B.ink, 1.6);
  g += R(x, y + S(28), S(134), S(16), { r: S(7), f: '#7f98bd', sw: 2 }) + L(x + S(65), y + S(5), x + S(65), y + S(28), B.ink, 1.4) + R(x + S(124), y + S(31), S(7), S(5), { r: 1, f: B.amber, s: 'none', sw: 0 }) + R(x + S(3), y + S(31), S(6), S(5), { r: 1, f: '#e06c5a', s: 'none', sw: 0 });
  g += [S(30), S(104)].map((dx) => C(x + dx, y + S(44), S(10), '#2b3446', B.ink, 2) + C(x + dx, y + S(44), S(4), '#c8ced8', 'none', 0)).join('');
  return g;
};
const label = (x, y, txt, c = B.ink, f = '#fff', size = 13) => { const w = txt.length * size * 0.56 + 18; return R(x - w / 2, y - size - 4, w, size + 12, { r: (size + 12) / 2, f, s: c, sw: 1.6 }) + T(x, y + 1, txt, { size, w: 600, c }); };

/** Wi-Fi piggybacking and war driving: one home router, a neighbor's laptop, and a car on the street. 480 x 300. */
export function wifiSteal() {
  // Redrawn chat 56 (her feedback: the old one was messy and unclear). Two separate, numbered scenes, one idea each.
  const head = (x, y, n, txt) => C(x + 12, y + 12, 12, HOT, B.ink, 1.8) + T(x + 12, y + 17, String(n), { size: 13, c: '#fff' }) + T(x + 32, y + 17.5, txt, { size: 15, w: 800, a: 'start', c: B.ink });
  const tone = '#f1f4f8';
  // ---------- 1. Wi-Fi piggybacking ----------
  let b = R(8, 8, 464, 214, { r: 14, f: tone, s: 'none', sw: 0 }) + head(22, 20, 1, 'Wi-Fi piggybacking');
  // Liza's room (cutaway), router on a shelf; its Wi-Fi goes through the wall, over the fence
  b += R(22, 52, 170, 140, { r: 10, f: '#eef3fb', sw: 2 }) + T(107, 70, "Liza's room", { size: 11.5, w: 700, c: B.soft }) + R(22, 178, 170, 14, { r: 0, f: '#d9e2ee', s: 'none', sw: 0 }) + L(22, 178, 192, 178, B.ink, 1.6);
  b += R(80, 150, 70, 8, { r: 2, f: '#d9b98c', sw: 1.6 }) + router2(84, 126, 62) + T(115, 172, "Liza's router", { size: 11, w: 700, c: B.blueInk });
  { const cx = 116, cy = 136, a1 = -32 * Math.PI / 180, a2 = 16 * Math.PI / 180;
    b += [40, 72, 104, 136].map((r) => P(`M${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a2)).toFixed(1)} ${(cy + r * Math.sin(a2)).toFixed(1)}`, 'none', '#7fa3d6', 3)).join(''); }
  b += R(214, 128, 6, 56, { r: 2, f: '#c9a27a', sw: 1.6 }) + R(232, 128, 6, 56, { r: 2, f: '#c9a27a', sw: 1.6 }) + L(204, 146, 248, 146, '#8a6a48', 3) + L(204, 166, 248, 166, '#8a6a48', 3) + T(226, 204, 'fence', { size: 11.5, w: 700, c: B.soft });
  // neighbor's room (cutaway)
  b += R(262, 52, 196, 140, { r: 10, f: '#fdf6ea', sw: 2 }) + T(360, 70, "neighbor's room", { size: 11.5, w: 700, c: B.soft }) + R(262, 178, 196, 14, { r: 0, f: '#e7d3b4', s: 'none', sw: 0 }) + L(262, 178, 458, 178, B.ink, 1.6);
  b += person2(432, 100, 0.68, { shirt: B.orange }) + R(300, 150, 150, 8, { r: 2, f: '#d9b98c', sw: 1.6 });
  b += laptop2(318, 104, 66, (x, y, w, h) => R(x, y, w, h, { r: 0, f: '#fff', s: 'none', sw: 0 }) + wifi2(x + 12, y + h * 0.72, AIR, 0.38) + R(x + 22, y + 9, w - 28, 4, { r: 2, f: '#9dbbe3', s: 'none', sw: 0 }) + R(x + 22, y + 18, w - 36, 4, { r: 2, f: B.green, s: 'none', sw: 0 }));
  b += label(350, 94, "Connected: Liza's Wi-Fi", '#2f6b45', '#fff', 11);
  b += T(360, 212, 'He uses it without asking.', { size: 12.5, w: 800, c: '#9c2f28' });
  // ---------- 2. War driving ----------
  const y0 = 232;
  b += R(8, y0, 464, 220, { r: 14, f: tone, s: 'none', sw: 0 }) + head(22, y0 + 12, 2, 'War driving');
  // street with small houses, each sending Wi-Fi
  [[22, HOT], [92, AIR], [162, HOT]].forEach(([x, c]) => { b += houseI(x, y0 + 52, 56) + wifi2(x + 28, y0 + 50, c, 0.55); });
  b += R(16, y0 + 128, 240, 34, { r: 4, f: '#8a94a6', s: 'none', sw: 0 }) + [0, 1, 2, 3, 4].map((k) => R(28 + k * 48, y0 + 143, 26, 4, { r: 2, f: '#fff', s: 'none', sw: 0 })).join('');
  b += car2(70, y0 + 102, 0.92) + phone2(132, y0 + 108, 12, 20, null, '#fbe2d2');
  b += P(`M48 ${y0 + 118} L30 ${y0 + 118} M52 ${y0 + 128} L36 ${y0 + 128}`, 'none', B.soft, 2);
  // zoomed phone screen: list of networks
  b += P(`M146 ${y0 + 114} L268 ${y0 + 96} M146 ${y0 + 124} L268 ${y0 + 160}`, 'none', '#b7c3d6', 1.6, ' stroke-dasharray="4 4"');
  b += R(268, y0 + 40, 192, 160, { r: 12, f: '#fff', sw: 2 }) + T(364, y0 + 62, 'Wi-Fi networks nearby', { size: 12, w: 800, c: B.ink });
  const nets = [["Liza's Wi-Fi", 'open', true], ['Cruz_Home', 'locked', false], ['SariSari_Store', 'open', true]];
  nets.forEach(([n, st, open], i) => {
    const y = y0 + 74 + i * 38;
    b += R(278, y, 172, 30, { r: 8, f: open ? '#fdeee5' : '#f4f6f9', s: open ? HOT : B.line, sw: open ? 1.8 : 1.2 }) + wifi2(294, y + 22, open ? HOT : '#8a94a6', 0.42) + T(308, y + 19.5, n, { size: 11.5, w: 700, a: 'start', c: B.ink });
    b += open ? T(442, y + 19.5, 'OPEN', { size: 10.5, w: 800, a: 'end', c: B.orangeInk }) : padlock2(426, y + 12, false, B.soft, 0.36);
  });
  b += T(136, y0 + 186, 'A driver goes around looking', { size: 12.5, w: 800, c: '#9c2f28' }) + T(136, y0 + 203, 'for open Wi-Fi to use.', { size: 12.5, w: 800, c: '#9c2f28' });
  return svgWrap(480, 460, "Two scenes. 1, Wi-Fi piggybacking: Liza's router is in her room. Its Wi-Fi reaches through the wall and over the fence into her neighbor's room, and his laptop says Connected: Liza's Wi-Fi. He uses it without asking. 2, War driving: a car drives down a street of houses while the phone inside lists nearby Wi-Fi networks, marking Liza's Wi-Fi and SariSari_Store as open. A driver goes around looking for open Wi-Fi to use.", b);
}

/** Interception on shared Wi-Fi. Top: not encrypted (readable). Bottom: encrypted (scrambled). 480 x 360. */
export function sniffPic() {
  // Redrawn chat 56 (her feedback: make the idea clearer). Same story twice: Mia sends her password over café Wi-Fi,
  // a stranger on the same Wi-Fi copies it. Only the result on HIS screen changes.
  let b = '';
  const row = (y, enc) => {
    const ink = enc ? '#2f6b45' : '#9c2f28';
    let o = R(8, y, 464, 204, { r: 14, f: enc ? '#eef6f0' : '#fbf0ed', s: 'none', sw: 0 });
    o += C(26, y + 22, 12, enc ? B.green : B.red, B.ink, 1.8) + T(26, y + 27, enc ? '2' : '1', { size: 13, c: '#fff' }) + T(46, y + 27.5, enc ? 'With encryption (HTTPS)' : 'Without encryption', { size: 15, w: 800, a: 'start', c: B.ink });
    // Mia's phone -> café router
    o += phone2(26, y + 44, 30, 54, screenLines()) + T(47, y + 114, "Mia's phone", { size: 11, w: 700, c: B.soft });
    o += router2(392, y + 70, 64) + wifi2(424, y + 58, AIR, 0.7) + T(424, y + 114, 'café Wi-Fi', { size: 11.5, w: 700, c: B.soft });
    o += L(64, y + 70, 384, y + 70, '#9dbbe3', 2.4, DASH) + ARROW(370, y + 70, 384, y + 70, '#7fa3d6', 2.4);
    o += R(150, y + 56, 150, 28, { r: 6, f: enc ? '#dcefe2' : '#fff', s: B.ink, sw: 1.8 }) + T(225, y + 75, enc ? 'x8#Qp!2v@7' : 'pass: mia2007', { size: 13, w: 700, c: B.ink, mono: true });
    // the stranger copies it
    o += P(`M225 ${y + 86} L225 ${y + 100}`, 'none', B.red, 2, ' stroke-dasharray="4 3"') + ARROW(225, y + 96, 225, y + 104, B.red, 2) + T(232, y + 98, 'he copies it', { size: 11, w: 700, a: 'start', c: '#9c2f28' });
    o += hacker2(122, y + 110, 0.76);
    o += T(106, y + 193, 'stranger, same Wi-Fi', { size: 10.5, w: 700, c: B.soft });
    o += laptop2(171, y + 108, 108, (x, yy, w, h) => R(x, yy, w, h, { r: 0, f: enc ? '#f4f6f9' : '#fff', s: 'none', sw: 0 }) + T(x + w / 2, yy + h * 0.62, enc ? 'x8#Qp!2v@7' : 'pass: mia2007', { size: 11.5, w: 700, c: enc ? '#8a94a6' : '#9c2f28', mono: true }));
    // result
    o += (enc ? check(330, y + 148, 0.95) : cross(330, y + 148, 0.95));
    o += T(348, y + 144, enc ? 'He sees only' : 'He can read', { size: 13, w: 800, a: 'start', c: ink }) + T(348, y + 162, enc ? 'scrambled letters.' : 'her password!', { size: 13, w: 800, a: 'start', c: ink });
    return o;
  };
  b += row(8, false) + row(222, true);
  return svgWrap(480, 434, 'Two cases. 1, without encryption: Mia sends pass: mia2007 from her phone over café Wi-Fi. A stranger on the same Wi-Fi copies it and his laptop shows pass: mia2007. He can read her password. 2, with encryption (HTTPS): the same message travels as x8#Qp!2v@7. The stranger copies it, but his laptop shows only scrambled letters.', b);
}

/** Evil twin hotspot: a phone's Wi-Fi list with a real and a fake café network, and the stranger nearby. 480 x 330. */
export function evilTwin() {
  let b = blob(240, 168, 232, 150, '#f6f8fb') + ground(130, 318, 88) + ground(392, 300, 60);
  b += phone2(40, 14, 180, 300, (x, y, w, h) => {
    let o = T(x + 14, y + 22, 'Wi-Fi', { size: 17, w: 700, a: 'start', c: B.ink }) + R(x + w - 48, y + 8, 34, 18, { r: 9, f: B.green, s: 'none', sw: 0 }) + C(x + w - 23, y + 17, 6.5, '#fff', 'none', 0);
    o += T(x + 14, y + 48, 'CHOOSE A NETWORK', { size: 9, w: 700, a: 'start', c: B.soft });
    const net = (yy, name, bars, locked, hi) => R(x + 8, yy, w - 16, 52, { r: 10, f: hi ? '#fdeee9' : '#fff', s: hi ? '#b23a33' : '#d6dfeb', sw: hi ? 2 : 1.4 })
      + T(x + 18, yy + 22, name, { size: 11.5, w: 700, a: 'start', c: B.ink }) + T(x + 18, yy + 39, locked ? 'secured' : 'open, no password', { size: 10, w: 600, a: 'start', c: hi ? '#b23a33' : B.soft })
      + [0, 1, 2, 3].map((k) => R(x + w - 44 + k * 6, yy + 34 - k * 5, 4, 6 + k * 5, { r: 1, f: k < bars ? B.green : '#d3d9e2', s: 'none', sw: 0 })).join('') + (locked ? padlock2(x + w - 22, yy + 15, false, '#8a94a6', 0.38) : '');
    o += net(y + 58, 'KapeMati_Guest', 2, true, false) + net(y + 118, 'KapeMati_Guest_FREE', 4, false, true) + net(y + 178, 'PLDT-HOME-4F2A', 1, true, false);
    return o;
  }, '#f4f6f9');
  b += P('M224 112 Q250 106 262 100', 'none', '#3f8a5a', 2) + label(340, 104, 'the café\'s real network', '#2f6b45', '#e3f3e9', 12.5);
  b += P('M224 172 Q250 176 262 182', 'none', '#b23a33', 2) + label(352, 188, 'a fake twin on a stranger\'s laptop', '#9c2f28', '#fdeee9', 12.5);
  b += hacker2(366, 214, 0.72) + laptop2(388, 248, 50, (x, y, w, h) => wifi2(x + w / 2, y + h * 0.8, '#ff9a8a', 0.45), '#121a2a');
  b += T(340, 74, 'Ask the staff for the exact name.', { size: 12.5, w: 600, c: B.ink });
  return svgWrap(480, 330, 'A phone lists Wi-Fi networks. KapeMati_Guest is the café\'s real network. KapeMati_Guest_FREE, open with the strongest signal, is a fake twin made by a stranger\'s laptop sitting nearby.', b);
}

/** Private (symmetric) key: the same key locks and unlocks. Toy example (shift each letter by 3). 480 x 200. */
export function symKeyPic() {
  // Round 2 (chat 56, her feedback: looked amateur): three tidy columns with the same structure, one per step.
  // Each column: who (top), what happens (middle, with the key), the result (bottom). One shared-key band at the bottom.
  const note = (cx, y, txt, c, f) => R(cx - 60, y, 120, 30, { r: 7, f, s: c, sw: 1.8 }) + T(cx, y + 19.5, txt, { size: 12, w: 700, c, mono: true });
  const head = (cx, n, txt) => C(cx - 50, 26, 10, HOT, B.ink, 1.6) + T(cx - 50, 30.5, String(n), { size: 11.5, c: '#fff' }) + T(cx - 34, 31, txt, { size: 12.5, w: 800, a: 'start', c: B.ink });
  const down = (cx, y, withKey) => L(cx, y, cx, y + 26, '#9aa5b6', 2) + ARROW(cx, y + 16, cx, y + 28, '#9aa5b6', 2) + (withKey ? key2(cx + 12, y + 13, 0.5) : '');
  const cols = [84, 240, 396];
  let b = cols.map((cx) => R(cx - 74, 8, 148, 250, { r: 14, f: '#f1f4f8', s: 'none', sw: 0 })).join('');
  // 1 Ana locks
  b += head(cols[0], 1, 'Ben locks it') + person2(cols[0], 44, 0.6, { shirt: B.blue }) + T(cols[0], 110, 'Ben', { size: 11.5, w: 700, c: B.soft });
  b += note(cols[0], 122, 'Kita tayo 3pm', B.ink, '#fff') + down(cols[0], 156, true) + note(cols[0], 188, 'Nlwd wdbr 3sp', '#2f6b45', '#e3f1e8');
  b += T(cols[0], 240, 'his key scrambles it', { size: 11, w: 700, c: B.soft });
  // 2 it travels; a stranger copies it
  b += head(cols[1], 2, 'It travels') + globe(cols[1], 72, 24) + T(cols[1], 110, 'the Internet', { size: 11.5, w: 700, c: B.soft });
  b += hacker2(cols[1] - 34, 124, 0.46) + R(cols[1] - 10, 132, 66, 26, { r: 8, f: '#fff', s: B.line, sw: 1.4 }) + T(cols[1] + 23, 149.5, '???', { size: 13, w: 800, c: '#9c2f28' });
  b += note(cols[1], 188, 'Nlwd wdbr 3sp', '#2f6b45', '#e3f1e8') + T(cols[1], 240, 'a stranger sees only this', { size: 11, w: 700, c: '#9c2f28' });
  // 3 Ben unlocks
  b += head(cols[2], 3, 'Ana unlocks it') + P(`M${cols[2] - 10} 52 Q${cols[2] - 13} 74 ${cols[2] - 8} 80 L${cols[2] + 8} 80 Q${cols[2] + 13} 74 ${cols[2] + 10} 52 Z`, '#3a2a20', B.ink, 1.6) + person2(cols[2], 44, 0.6, { shirt: B.green, hair: '#3a2a20' }) + T(cols[2], 110, 'Ana', { size: 11.5, w: 700, c: B.soft });
  b += note(cols[2], 122, 'Nlwd wdbr 3sp', '#2f6b45', '#e3f1e8') + down(cols[2], 156, true) + note(cols[2], 188, 'Kita tayo 3pm', B.ink, '#fff');
  b += T(cols[2], 240, 'her copy unscrambles it', { size: 11, w: 700, c: B.soft });
  // arrows between columns
  b += ARROW(146, 203, 172, 203, B.ink, 2) + ARROW(302, 203, 328, 203, B.ink, 2);
  // the shared-key band
  b += R(8, 268, 464, 34, { r: 12, f: '#fff3c4', s: 'none', sw: 0 }) + key2(92, 285, 0.55) + key2(378, 285, 0.55) + T(240, 290, 'Ben and Ana use the SAME secret key', { size: 12.5, w: 800, c: '#7a5a0c' });
  return svgWrap(480, 310, 'Private key encryption in three steps. 1, Ben locks it: his key turns "Kita tayo 3pm" into "Nlwd wdbr 3sp". 2, it travels over the Internet; a stranger who copies it sees only "Nlwd wdbr 3sp". 3, Ana unlocks it: her copy of the same key turns it back into "Kita tayo 3pm". Ben and Ana use the same key.', b);
}

/** HTTPS proves the connection is encrypted, not that the site is honest. 480 x 300. */
export function httpsPic() {
  let b = blob(240, 150, 232, 140, '#f6f8fb');
  const win = (y, url, ok) => {
    let o = R(14, y + 4, 452, 118, { r: 12, f: 'rgba(24,35,58,0.12)', s: 'none', sw: 0 }) + R(10, y, 452, 118, { r: 12, f: '#fff', sw: 2 });
    o += R(10, y, 452, 40, { r: 12, f: '#e6eaf0', sw: 2 }) + `<rect x="12" y="${y + 30}" width="448" height="9" fill="#e6eaf0"/>`;
    o += [26, 40, 54].map((x, k) => C(x, y + 20, 4.5, ['#e06c5a', '#eeb04a', '#5fae6b'][k], 'none', 0)).join('') + addrBar(70, y + 5, 300, url);
    o += C(42, y + 72, 15, ok ? B.blue : '#c2453b', B.ink, 1.8) + T(42, y + 77, 'P', { size: 14, w: 700, c: '#fff' }) + T(64, y + 70, 'PeraBank', { size: 14, w: 700, a: 'start', c: B.ink }) + T(64, y + 86, 'Log in to your account', { size: 10.5, w: 600, a: 'start', c: B.soft });
    o += R(200, y + 58, 120, 16, { r: 4, f: '#f4f6f9', s: B.line, sw: 1.2 }) + R(200, y + 80, 120, 16, { r: 4, f: '#f4f6f9', s: B.line, sw: 1.2 }) + R(330, y + 68, 64, 22, { r: 6, f: ok ? B.blue : '#c2453b', s: 'none', sw: 0 }) + T(362, y + 83, 'Log in', { size: 11, w: 700, c: '#fff' });
    o += (ok ? check : cross)(432, y + 78, 1.15);
    return o;
  };
  b += win(10, 'https://www.perabank.com.ph', true) + label(330, 150, 'real bank: encrypted AND honest', '#2f6b45', '#e3f3e9', 12.5);
  b += win(182, 'https://perabank-ph-verify.co', false) + label(320, 324, 'fake site: encrypted, but still a scam', '#9c2f28', '#fdeee9', 12.5);
  return svgWrap(480, 336, 'Two browser windows, both with HTTPS and a lock icon. The real bank\'s address is perabank.com.ph. The fake one, perabank-ph-verify.co, is also encrypted but is a scam.', b);
}

/** Layers of protection (defense in depth): data in a vault in the middle, rings around it, each with a small picture. 480 x 300. */
export function layersPic() {
  // Round 3 (chat 56, polish): a cleaner grid. Header row (names + icons) is separate from the soft, outline-free
  // layer columns; attacks are thin solid arrows from label chips in one aligned column, each ending at the face of
  // the layer that stops it. 480 x 286.
  const layers = [['People', 'training, rules', '#fbe2d2', '#a6461f'], ['Firewall', 'and IPS', '#f7e7bd', '#7a5a0c'], ['Access', 'control', '#dfe9f6', '#1c4479'], ['Encryption', 'scrambles data', '#dcefe2', '#2f6b45']];
  const X0 = 112, BW = 66, GAP = 8, BT = 104, BB = 272;
  const bx = (k) => X0 + k * (BW + GAP), bc = (k) => bx(k) + BW / 2;
  let b = '';
  // header row
  b += hacker2(50, 18, 0.5) + T(50, 80, 'intruder', { size: 11, w: 700, c: B.soft });
  layers.forEach(([t1, t2, f, c], k) => {
    b += C(bc(k), 36, 21, f, c, 1.8) + T(bc(k), 76, t1, { size: 11.5, w: 800, c }) + T(bc(k), 90, t2, { size: 9.5, w: 600, c: B.soft });
    b += R(bx(k), BT, BW, BB - BT, { r: 10, f, s: 'none', sw: 0 });
  });
  b += person2(bc(0), 20, 0.4, { shirt: B.orange }) + wall(bc(1) - 12, 24, 24, 24) + key2(bc(2) - 12, 36, 0.62) + padlock2(bc(3) - 10, 34, false, HOT, 0.62);
  // the data
  b += R(414, 162, 58, 44, { r: 8, f: '#c8ced8', sw: 1.8 }) + R(420, 168, 46, 32, { r: 5, f: '#e6eaf0', s: '#8a94a6', sw: 1.2 }) + C(443, 184, 9, '#fff', B.ink, 1.6) + C(443, 184, 2.4, B.ink, 'none', 0) + [0, 1, 2, 3].map((k) => L(443 + Math.cos(k * 1.57) * 3.5, 184 + Math.sin(k * 1.57) * 3.5, 443 + Math.cos(k * 1.57) * 8, 184 + Math.sin(k * 1.57) * 8, B.ink, 1.6)).join('');
  b += T(443, 222, 'your data', { size: 11, w: 800, c: B.ink });
  // attacks
  const RED = '#c2453b';
  [['fake email', 0], ['break-in try', 1], ['stolen password', 2], ['copied data', 3]].forEach(([txt, k], i) => {
    const y = 128 + i * 38, end = bx(k) + 6;
    b += R(6, y - 11, 94, 22, { r: 11, f: '#fff', s: RED, sw: 1.4 }) + T(53, y + 4, txt, { size: 10, w: 700, c: '#9c2f28' });
    if (k < 3) b += L(100, y, end - 9, y, RED, 2) + ARROW(end - 16, y, end - 7, y, RED, 2) + R(end - 4, y - 12, 4, 24, { r: 2, f: layers[k][3], s: 'none', sw: 0 }) + cross(end + 12, y, 0.55);
    else b += L(100, y, end + 14, y, RED, 2) + R(end + 18, y - 10, 38, 20, { r: 5, f: '#fff', s: '#2f6b45', sw: 1.4 }) + T(end + 37, y + 4, 'x8#?', { size: 10, w: 800, c: '#2f6b45', mono: true });
  });
  b += T(bc(3), 262, 'unreadable', { size: 9.5, w: 700, c: '#2f6b45' });
  return svgWrap(480, 286, 'Defense in depth: four layers stand between an intruder and your data: people (training and rules), the firewall and IPS, access control, and encryption. A fake email is stopped by trained people. A break-in try is stopped by the firewall. A stolen password is stopped by access control such as MFA. Data copied anyway is unreadable because of encryption.', b);
}

/** Securing a home router: a router with a settings checklist. 480 x 220. */
export function routerSettingsPic() {
  let b = blob(240, 112, 228, 96, '#f6f8fb') + ground(120, 196, 80);
  b += router2(50, 136, 110) + wifi2(105, 118, AIR, 1.2) + R(64, 168, 80, 10, { r: 3, f: '#c8ced8', sw: 1.4 });
  b += R(214, 14, 258, 192, { r: 12, f: 'rgba(24,35,58,0.1)', s: 'none', sw: 0 }) + R(210, 10, 258, 192, { r: 12, f: '#fff', sw: 2 }) + R(210, 10, 258, 34, { r: 12, f: '#dfe9f6', sw: 2 }) + `<rect x="212" y="34" width="254" height="9" fill="#dfe9f6"/>` + T(339, 32, 'Router settings', { size: 13.5, w: 700, c: B.blueInk });
  const rows = [['Security mode', 'WPA3'], ['Wi-Fi password', '16+ characters'], ['Admin password', 'changed'], ['Updates', 'automatic'], ['Guest network', 'on']];
  rows.forEach(([k, v], i) => { const y = 66 + i * 27; b += T(224, y, k, { size: 12, w: 600, a: 'start', c: B.soft }) + T(432, y, v, { size: 12, w: 700, a: 'end', c: B.ink }) + check(450, y - 4, 0.55) + (i < 4 ? L(224, y + 9, 456, y + 9, '#e6eaf0', 1.2) : ''); });
  return svgWrap(480, 214, 'A home router and its settings page: security mode WPA3, a Wi-Fi password of 16 or more characters, the admin password changed, automatic updates, and a guest network turned on.', b);
}

/** Precautions for organizations: an office scene with a staff-only door, an ID badge, and a locked payroll folder. 480 x 230. */
export function orgPic() {
  // Redrawn chat 56 (her feedback: amateur). Least privilege as three tidy columns: a person, their job, and what they can open.
  const cols = [[84, 'Clerk', B.blue, '#2a2420', false], [240, 'Payroll officer', B.green, '#3a2a20', true], [396, 'Visitor', B.orange, '#5a3a22', false]];
  const door = (x, y) => R(x, y, 18, 24, { r: 2, f: '#c9a27a', sw: 1.6 }) + C(x + 14, y + 13, 1.8, B.ink, 'none', 0);
  const folder = (x, y) => P(`M${x} ${y + 4} L${x + 8} ${y + 4} L${x + 11} ${y} L${x + 24} ${y} L${x + 24} ${y + 20} L${x} ${y + 20} Z`, '#f6d58a', B.ink, 1.6) + T(x + 12, y + 15, '₱', { size: 9, w: 800, c: '#7a5a0c' });
  const lobby = (x, y) => R(x, y + 4, 22, 18, { r: 2, f: '#dfe9f6', sw: 1.6 }) + P(`M${x - 2} ${y + 5} L${x + 11} ${y - 4} L${x + 24} ${y + 5}`, 'none', B.ink, 1.6);
  const row = (cx, y, icon, txt, ok) => icon(cx - 58, y) + T(cx - 30, y + 16, txt, { size: 11, w: 700, a: 'start', c: B.ink }) + (ok ? check(cx + 52, y + 11, 0.62) : cross(cx + 52, y + 11, 0.62));
  let b = '';
  cols.forEach(([cx, role, shirt, hair, pay], i) => {
    b += R(cx - 72, 8, 144, 236, { r: 14, f: '#f1f4f8', s: 'none', sw: 0 });
    if (i !== 0) b += P(`M${cx - 17} 32 Q${cx - 22} 62 ${cx - 13} 70 L${cx + 13} 70 Q${cx + 22} 62 ${cx + 17} 32 Z`, hair, B.ink, 1.4);
    b += person2(cx, 20, 0.92, { shirt, hair });
    b += R(cx + 5, 76, 15, 19, { r: 2, f: '#fff', s: B.ink, sw: 1.2 }) + R(cx + 5, 76, 15, 6, { r: 2, f: i === 2 ? B.orange : B.blue, s: 'none', sw: 0 });
    b += T(cx, 122, role, { size: 12.5, w: 800, c: B.ink });
    b += L(cx - 58, 132, cx + 58, 132, '#d3dae5', 1.4);
    b += row(cx, 142, lobby, 'Lobby', true);
    b += row(cx, 176, door, 'Staff room', i !== 2);
    b += row(cx, 210, folder, 'Payroll files', pay);
  });
  b += R(8, 254, 464, 34, { r: 12, f: '#e3ecf8', s: 'none', sw: 0 }) + T(240, 276, 'Each person can open only what their job needs: least privilege', { size: 12, w: 800, c: B.blueInk });
  return svgWrap(480, 296, 'Least privilege in an office. The clerk can enter the lobby and the staff room, but cannot open the payroll files. The payroll officer can open all three. A visitor can enter only the lobby.', b);
}

// Shared with it110-threat-pics.js (chat 55): the detailed doodle kit and small helpers.
export { L, C, P, lab, DASH, HOT, AIR, face, hood, check, cross, key, padlock, bubble, bubbleUp, packet, addrBar, SHADE, GLOSS, blob, ground, spark, dot, person2, hacker2, laptop2, phone2, padlock2, key2, shield2, envelope2, server2, fingerprint2, wifi2, coin, screenLines, globe, wall, router2, car2, label };

/** Private key encryption, step by step (chat 56). Same layout as padlockPic: Ben left (sender), Ana right (receiver),
 *  a stranger in the middle. step 0..3. 480 x 230. */
export function symStepPic(step) {
  // Same orientation as padlockPic (chat 56): Ana LEFT (receiver), Ben RIGHT (sender), stranger center.
  // The shared secret key is BLUE everywhere (Ana's private key in Kind 2 is amber), so the two never look alike.
  const note = (cx, y, txt, enc) => R(cx - 58, y, 116, 30, { r: 7, f: enc ? '#e3f1e8' : '#fff', s: enc ? '#2f6b45' : B.ink, sw: 1.8 }) + T(cx, y + 19.5, txt, { size: 12, w: 700, c: enc ? '#2f6b45' : B.ink, mono: true });
  const SK = '#8fb0dc';
  let b = blob(240, 116, 230, 104, '#f6f8fb') + ground(60, 200, 44) + ground(420, 200, 44) + ground(240, 214, 34);
  b += P('M43 112 Q38 142 46 150 L74 150 Q82 142 77 112 Z', '#3a2a20', B.ink, 1.8) + person2(60, 96, 1.05, { shirt: B.green, hair: '#3a2a20' }) + T(60, 222, 'Ana', { size: 14, w: 600, c: B.ink });
  b += person2(420, 96, 1.05, { shirt: B.blue }) + T(420, 222, 'Ben', { size: 14, w: 600, c: B.ink });
  b += hacker2(240, 140, 0.85);
  b += key2(20, 62, 0.85, SK) + key2(400, 62, 0.85, SK);
  if (step === 0) {
    b += label(240, 40, 'two copies of the SAME secret key', B.blueInk, '#e3ecf8', 12) + P('M62 62 Q240 92 396 62', 'none', '#7fa3d6', 2);
  } else if (step === 1) {
    b += T(310, 30, 'Ben\'s key scrambles it', { size: 12, w: 700, c: B.soft }) + note(310, 42, 'Kita tayo 3pm', false) + ARROW(310, 76, 310, 94, B.ink, 2) + key2(326, 85, 0.5, SK) + note(310, 98, 'Nlwd wdbr 3sp', true);
  } else if (step === 2) {
    b += note(240, 50, 'Nlwd wdbr 3sp', true) + ARROW(368, 65, 304, 65, B.ink, 2.2) + ARROW(176, 65, 112, 65, B.ink, 2.2) + T(240, 36, 'traveling across the Internet', { size: 12, w: 600, c: B.soft });
    b += bubble(268, 104, 64, 30, 262, 140) + T(300, 124, '???', { size: 14, w: 800, c: '#9c2f28' });
  } else {
    b += T(170, 30, 'the SAME key unscrambles it', { size: 12, w: 700, c: B.soft }) + note(170, 42, 'Nlwd wdbr 3sp', true) + ARROW(170, 76, 170, 94, B.ink, 2) + key2(186, 85, 0.5, SK) + note(170, 98, 'Kita tayo 3pm', false);
  }
  return svgWrap(480, 230, ['Ana and Ben each hold a copy of the same secret key.', 'Ben\'s key scrambles "Kita tayo 3pm" into "Nlwd wdbr 3sp".', 'The scrambled message travels across the Internet to Ana. A stranger copies it but sees only nonsense.', 'Ana uses her copy of the same key to turn "Nlwd wdbr 3sp" back into "Kita tayo 3pm".'][step], b);
}

/** Using both kinds together (chat 56): how Ben and Ana get the same secret key. Same layout as padlockPic
 *  (Ana left with her amber private key, Ben right). The shared secret key is BLUE. step 0..4. 480 x 230. */
export function keyShareStepPic(step) {
  const SK = '#8fb0dc';
  const card = (x, y, locked) => R(x, y, 72, 44, { r: 6, f: '#fff', s: B.ink, sw: 2 }) + key2(x + 12, y + 22, 0.6, SK) + (locked ? padlock2(x + 54, y + 18, false, HOT, 0.62) : '');
  let b = blob(240, 116, 230, 104, '#f6f8fb') + ground(60, 200, 44) + ground(420, 200, 44) + ground(240, 214, 34);
  b += P('M43 112 Q38 142 46 150 L74 150 Q82 142 77 112 Z', '#3a2a20', B.ink, 1.8) + person2(60, 96, 1.05, { shirt: B.green, hair: '#3a2a20' }) + T(60, 222, 'Ana', { size: 14, w: 600, c: B.ink });
  b += person2(420, 96, 1.05, { shirt: B.blue }) + T(420, 222, 'Ben', { size: 14, w: 600, c: B.ink });
  b += hacker2(240, 140, 0.85);
  // Ana's private key (amber), always with her
  b += key2(22, 52, 0.95) + R(14, 70, 92, 22, { r: 6, f: '#fff', s: B.amber, sw: 1.6 }) + T(60, 85, 'private key', { size: 11.5, w: 600, c: '#8f6a0e' });
  // Ben keeps his original secret key the whole time; what travels is a COPY
  if (step >= 1 && step <= 3) b += key2(392, 60, 0.85, SK);
  if (step === 0) {
    b += key2(372, 58, 0.95, SK) + spark(432, 50, 1, SK) + spark(362, 92, 0.7, SK) + label(400, 30, 'new secret key', B.blueInk, '#e3ecf8', 12);
  } else if (step === 1) {
    b += card(290, 58, true) + T(326, 52, 'a copy', { size: 11, w: 700, c: B.blueInk }) + T(326, 124, 'locked with', { size: 11.5, w: 600, c: B.soft }) + T(326, 139, 'Ana\'s public key', { size: 11.5, w: 700, c: '#a6461f' });
  } else if (step === 2) {
    b += card(204, 56, true) + T(240, 50, 'the copy', { size: 11, w: 700, c: B.blueInk }) + ARROW(330, 78, 284, 78, B.ink, 2.4) + ARROW(196, 78, 128, 78, B.ink, 2.4) + T(240, 30, 'traveling across the Internet', { size: 12, w: 600, c: B.soft }) + cross(284, 152, 0.9);
  } else if (step === 3) {
    b += card(112, 70, false) + padlock2(188, 78, true, HOT, 0.75) + check(214, 60, 0.9) + T(200, 44, 'Ana opens it with her private key', { size: 12, w: 700, c: B.soft });
  } else {
    b += key2(96, 150, 0.7, SK) + key2(352, 150, 0.7, SK) + label(240, 40, 'both have the same secret key', B.blueInk, '#e3ecf8', 12);
    b += R(186, 66, 108, 28, { r: 7, f: '#e3f1e8', s: '#2f6b45', sw: 1.8 }) + T(240, 84.5, 'Nlwd wdbr 3sp', { size: 11.5, w: 700, c: '#2f6b45', mono: true }) + ARROW(184, 80, 130, 80, B.ink, 2) + ARROW(296, 80, 350, 80, B.ink, 2) + T(240, 112, 'now: fast private key encryption', { size: 11.5, w: 700, c: B.soft });
  }
  return svgWrap(480, 230, ['Ben\'s computer makes a new secret key.', 'Ben keeps his secret key and locks a copy of it with Ana\'s public key, her open padlock.', 'The locked secret key travels across the Internet to Ana. A stranger copies it but cannot unlock it.', 'Ana unlocks it with her private key and gets the secret key.', 'Now Ana and Ben both have the same secret key, and they use fast private key encryption for their messages.'][step], b);
}
