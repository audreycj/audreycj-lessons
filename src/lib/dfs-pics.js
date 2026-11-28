// DFS lesson pictures (chat 66). Clean, realistic style that matches the Graphs/BFS pictures (giKit in illus.js).
const TEAL = '#0e6b63', ORANGE = '#e8662e', INK = '#1b2a2e', SOFT = '#55605f', RED = '#b23a33', BLUE = '#2f6fa8';
const SKY = '#cfe3f3', BUT = '#f8dc95', TW = '#d7ece9', OW = '#fbdccc', W = '#ffffff';
const F = "font-family='Nunito, sans-serif'";
const t = (x, y, s, q = {}) => `<text x="${x}" y="${y}" text-anchor="${q.a || 'middle'}" ${F} font-size="${q.size || 12}" font-weight="${q.w || 700}" fill="${q.c || INK}">${s}</text>`;
const tl = (x, y, s, q = {}) => t(x, y, s, { ...q, a: 'start' });
const r1 = (s) => s.replace(/(\d+\.\d)\d+/g, '$1');
const marker = (id, c, sz = 12) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="${sz}" markerHeight="${sz}" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`;
const pill = (x, y, l1, l2, c) => { const w = Math.max(l1.length * 7.4, (l2 || '').length * 6.6) + 26, h = l2 ? 40 : 26;
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="13" fill="${c}"/>` + (l2 ? t(x, y - 3, l1, { size: 12.5, w: 800, c: W }) + t(x, y + 13, l2, { size: 11, w: 700, c: W }) : t(x, y + 4.5, l1, { size: 12.5, w: 800, c: W })); };
const card = (x0, y0, w, h, title, c) => `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="14" fill="${W}" stroke="#dfe3e1" stroke-width="1.5"/><path d="M${x0} ${y0 + 14} A14 14 0 0 1 ${x0 + 14} ${y0} H${x0 + w - 14} A14 14 0 0 1 ${x0 + w} ${y0 + 14} V${y0 + 8} H${x0} Z" fill="${c}"/>` + tl(x0 + 18, y0 + 36, title, { size: 15, w: 800, c });

/* ---------- people (front view, detailed) ---------- */
// Arm from shoulder to hand through an elbow; sleeve covers the first part of the upper arm.
function arm(sh, el, hd, q) {
  const o = `stroke-linecap="round" stroke-linejoin="round" fill="none"`;
  let s = `<path d="M${sh[0]} ${sh[1]} L${el[0]} ${el[1]} L${hd[0]} ${hd[1]}" stroke="${INK}" stroke-width="14.5" ${o}/><path d="M${sh[0]} ${sh[1]} L${el[0]} ${el[1]} L${hd[0]} ${hd[1]}" stroke="${q.skin}" stroke-width="11.5" ${o}/>`;
  const k = q.long ? 1 : 0.55, sx = sh[0] + (el[0] - sh[0]) * k, sy = sh[1] + (el[1] - sh[1]) * k;
  if (q.long) s += `<path d="M${sh[0]} ${sh[1]} L${el[0]} ${el[1]} L${el[0] + (hd[0] - el[0]) * 0.75} ${el[1] + (hd[1] - el[1]) * 0.75}" stroke="${INK}" stroke-width="17.5" ${o}/><path d="M${sh[0]} ${sh[1]} L${el[0]} ${el[1]} L${el[0] + (hd[0] - el[0]) * 0.75} ${el[1] + (hd[1] - el[1]) * 0.75}" stroke="${q.sleeve}" stroke-width="14.5" ${o}/>`;
  else s += `<path d="M${sh[0]} ${sh[1]} L${sx} ${sy}" stroke="${INK}" stroke-width="19" ${o}/><path d="M${sh[0]} ${sh[1]} L${sx} ${sy}" stroke="${q.sleeve}" stroke-width="16" ${o}/>`;
  return s;
}
const handAt = (x, y, skin, flip) => `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="6.5" fill="${skin}" stroke="${INK}" stroke-width="1.5"/><ellipse cx="${x + (flip ? 6 : -6)}" cy="${y - 4}" rx="3.2" ry="2.4" fill="${skin}" stroke="${INK}" stroke-width="1.3"/>`;
function face(x, hc, q) {
  let s = `<circle cx="${x - 22}" cy="${hc + 3}" r="5.5" fill="${q.skin}" stroke="${INK}" stroke-width="1.4"/><circle cx="${x + 22}" cy="${hc + 3}" r="5.5" fill="${q.skin}" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<ellipse cx="${x}" cy="${hc}" rx="22" ry="24" fill="${q.skin}" stroke="${INK}" stroke-width="1.6"/>`;
  for (const d of [-8.5, 8.5]) s += `<ellipse cx="${x + d}" cy="${hc + 2}" rx="3.6" ry="4.3" fill="${W}" stroke="${INK}" stroke-width="1"/><circle cx="${x + d + (q.look || 0)}" cy="${hc + 2.6}" r="2.5" fill="#3a2418"/><circle cx="${x + d + (q.look || 0) + 0.9}" cy="${hc + 1.6}" r="0.8" fill="${W}"/>`;
  s += `<path d="M${x - 12} ${hc - 6} q3.5 -2.5 7 -0.5 M${x + 5} ${hc - 6.5} q3.5 -2 7 0.5" fill="none" stroke="${q.brow || '#3a2418'}" stroke-width="1.8" stroke-linecap="round"/>`;
  s += `<path d="M${x - 0.5} ${hc + 5} q-2.5 4 0.5 5.5" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linecap="round"/>`;
  s += `<path d="M${x - 6} ${hc + 13} q6 5 12 0" fill="none" stroke="#8a3b2e" stroke-width="1.7" stroke-linecap="round"/>`;
  s += `<ellipse cx="${x - 13}" cy="${hc + 10}" rx="4" ry="2.4" fill="#f29c8f" opacity="0.45"/><ellipse cx="${x + 13}" cy="${hc + 10}" rx="4" ry="2.4" fill="#f29c8f" opacity="0.45"/>`;
  return s;
}
// A standing person, facing front. Hands meet a held plate at hand height.
function person(q) {
  const x = q.x, top = q.FY - q.H, hc = top + 27, S = top + 64, WA = top + 150;
  let s = '';
  // hair behind the head
  if (q.hair === 'pony') s += `<path d="M${x + 14} ${hc - 18} Q${x + 44} ${hc - 6} ${x + 38} ${hc + 30} Q${x + 34} ${hc + 50} ${x + 24} ${hc + 58} Q${x + 30} ${hc + 30} ${x + 18} ${hc + 4} Z" fill="${q.hairC}" stroke="${INK}" stroke-width="1.4"/>`;
  // legs
  if (q.skirt) {
    const sb = WA + 58;
    s += `<rect x="${x - 17}" y="${sb - 4}" width="12" height="${q.FY - sb - 4}" rx="5" fill="${q.skin}" stroke="${INK}" stroke-width="1.3"/><rect x="${x + 5}" y="${sb - 4}" width="12" height="${q.FY - sb - 4}" rx="5" fill="${q.skin}" stroke="${INK}" stroke-width="1.3"/>`;
    s += `<rect x="${x - 18}" y="${q.FY - 30}" width="14" height="22" rx="3" fill="${W}" stroke="${INK}" stroke-width="1.2"/><rect x="${x + 4}" y="${q.FY - 30}" width="14" height="22" rx="3" fill="${W}" stroke="${INK}" stroke-width="1.2"/>`;
    s += `<path d="M${x - 30} ${WA - 4} H${x + 30} L${x + 40} ${sb} H${x - 40} Z" fill="${q.skirt}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>` + [-20, -7, 7, 20].map((d) => `<line x1="${x + d * 0.8}" y1="${WA + 2}" x2="${x + d * 1.15}" y2="${sb - 2}" stroke="#20304f" stroke-width="1"/>`).join('');
  } else {
    s += `<path d="M${x - 29} ${WA - 4} H${x + 29} L${x + 27} ${q.FY - 10} H${x + 3} L${x} ${WA + 30} L${x - 3} ${q.FY - 10} H${x - 27} Z" fill="${q.pants}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
  }
  s += `<path d="M${x - 30} ${q.FY - 10} h24 q4 0 4 5 v5 h-34 q0 -10 6 -10 Z" fill="${q.shoe || INK}"/><path d="M${x + 6} ${q.FY - 10} h24 q6 0 6 10 h-34 v-5 q0 -5 4 -5 Z" fill="${q.shoe || INK}"/>`;
  // torso
  s += `<path d="M${x - 34} ${S + 16} Q${x - 34} ${S} ${x - 18} ${S} H${x + 18} Q${x + 34} ${S} ${x + 34} ${S + 16} L${x + 31} ${WA} H${x - 31} Z" fill="${q.shirt}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`;
  s += `<rect x="${x - 7}" y="${top + 46}" width="14" height="${S - top - 44}" fill="${q.skin}" stroke="${INK}" stroke-width="1.3"/>`;
  if (q.collar) s += `<path d="M${x - 12} ${S - 2} L${x} ${S + 12} L${x - 4} ${S + 18} L${x - 16} ${S + 6} Z M${x + 12} ${S - 2} L${x} ${S + 12} L${x + 4} ${S + 18} L${x + 16} ${S + 6} Z" fill="${W}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>`;
  if (q.lanyard) s += `<path d="M${x - 9} ${S} L${x - 2} ${S + 52} M${x + 9} ${S} L${x + 2} ${S + 52}" stroke="${BLUE}" stroke-width="2.4" fill="none"/><rect x="${x - 9}" y="${S + 50}" width="18" height="24" rx="2.5" fill="${W}" stroke="${INK}" stroke-width="1.2"/><rect x="${x - 9}" y="${S + 50}" width="18" height="7" rx="2" fill="${BLUE}"/><circle cx="${x}" cy="${S + 64}" r="3.5" fill="#e7c9a6"/>`;
  if (q.apron) s += `<path d="M${x - 9} ${S - 2} Q${x - 18} ${S + 14} ${x - 22} ${S + 30} M${x + 9} ${S - 2} Q${x + 18} ${S + 14} ${x + 22} ${S + 30}" stroke="${q.apron}" stroke-width="3" fill="none"/><path d="M${x - 24} ${S + 28} H${x + 24} V${WA + 52} Q${x} ${WA + 58} ${x - 24} ${WA + 52} Z" fill="${q.apron}" stroke="${INK}" stroke-width="1.4"/><rect x="${x - 12}" y="${WA + 6}" width="24" height="16" rx="3" fill="none" stroke="#c3c9c7" stroke-width="1.3"/><line x1="${x - 31}" y1="${WA - 6}" x2="${x + 31}" y2="${WA - 6}" stroke="${q.apron}" stroke-width="3"/>`;
  if (q.buttons) s += [S + 22, S + 34].map((y) => `<circle cx="${x}" cy="${y}" r="1.6" fill="${INK}"/>`).join('');
  // arms holding a plate in front of the chest
  const py = S + 42, hx = q.plateW / 2;
  s += arm([x - 30, S + 10], [x - 44, S + 70], [x - hx + 4, py + 4], { skin: q.armSkin || q.skin, sleeve: q.shirt, long: q.longSleeve });
  s += arm([x + 30, S + 10], [x + 44, S + 70], [x + hx - 4, py + 4], { skin: q.armSkin || q.skin, sleeve: q.shirt, long: q.longSleeve });
  // head
  s += face(x, hc, q);
  if (q.hair === 'pony') s += `<path d="M${x - 23} ${hc + 2} Q${x - 26} ${hc - 30} ${x} ${hc - 28} Q${x + 26} ${hc - 30} ${x + 23} ${hc + 2} Q${x + 18} ${hc - 12} ${x + 6} ${hc - 14} Q${x - 4} ${hc - 6} ${x - 16} ${hc - 10} Q${x - 20} ${hc - 6} ${x - 23} ${hc + 2} Z" fill="${q.hairC}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/><circle cx="${x + 20}" cy="${hc - 16}" r="4" fill="${ORANGE}" stroke="${INK}" stroke-width="1.2"/>`;
  if (q.hair === 'net') s += `<path d="M${x - 24} ${hc - 2} Q${x - 27} ${hc - 32} ${x} ${hc - 32} Q${x + 27} ${hc - 32} ${x + 24} ${hc - 2} Q${x + 12} ${hc - 12} ${x} ${hc - 12} Q${x - 12} ${hc - 12} ${x - 24} ${hc - 2} Z" fill="#f4f6f5" stroke="${INK}" stroke-width="1.4"/>` + [[-12, -22], [0, -25], [12, -22], [-6, -17], [6, -17], [-17, -12], [17, -12]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${hc + dy}" r="1" fill="#b9c0be"/>`).join('') + `<path d="M${x - 24} ${hc - 2} Q${x} ${hc - 16} ${x + 24} ${hc - 2}" fill="none" stroke="#c3c9c7" stroke-width="2"/>`;
  return { s, hands: [[x - hx + 4, py + 4], [x + hx - 4, py + 4]], plateY: py };
}

/* ---------- plates ---------- */
const PW = 80, PH = 10;
const plate = (cx, y, q = {}) => `<path d="M${cx - PW / 2} ${y} Q${cx - PW / 2 + 3} ${y + PH} ${cx - PW / 2 + 12} ${y + PH} H${cx + PW / 2 - 12} Q${cx + PW / 2 - 3} ${y + PH} ${cx + PW / 2} ${y} Z" fill="${W}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/><ellipse cx="${cx}" cy="${y}" rx="${PW / 2}" ry="4.5" fill="#f4f6f5" stroke="${INK}" stroke-width="1.3"/><ellipse cx="${cx}" cy="${y}" rx="${PW / 2 - 11}" ry="2.4" fill="none" stroke="${q.rim || TEAL}" stroke-width="1.6"/>`;
const badge = (x, y, n, c) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="${W}" stroke-width="1.8"/>` + t(x, y + 4, String(n), { size: 11, w: 800, c: W });

/** Part 2 "Recall the stack": a stack of plates at the canteen. A student has just taken the top plate (pop); a helper brings a clean plate to put on top (push). */
export function canteenStack() {
  const VW = 600, VH = 420, FY = 370, SKIN = '#f3cfa6', SKIN2 = '#c98e63';
  let s = `<svg class="objbox gi-pic" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="A stack of plates on a canteen counter. Plates 1 to 4 lie on top of each other, with plate 1 at the bottom. On the right, a student in a school uniform holds plate 5, which she just took off the top, because the plate put on last is taken first (pop). On the left, a canteen helper in an apron and hairnet holds a clean plate, 6, to put on top (push). Plate 1 went in first, so it comes out last."><defs>${marker('csT', TEAL)}${marker('csO', ORANGE)}<clipPath id="csClip"><rect x="0" y="0" width="${VW}" height="${VH}" rx="14"/></clipPath><linearGradient id="csSteel" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#dfe5e4"/><stop offset="1" stop-color="#b3bdbb"/></linearGradient></defs><g clip-path="url(#csClip)">`;
  // room
  s += `<rect width="${VW}" height="${FY}" fill="#fbf6ec"/><rect y="${FY - 120}" width="${VW}" height="120" fill="#f1e6d2"/><line x1="0" y1="${FY - 120}" x2="${VW}" y2="${FY - 120}" stroke="#e2d3b8" stroke-width="2"/>`;
  for (let i = 0; i < 13; i++) s += `<line x1="${i * 50}" y1="${FY - 118}" x2="${i * 50}" y2="${FY}" stroke="#eadcc3" stroke-width="1"/>`;
  s += `<rect y="${FY}" width="${VW}" height="${VH - FY}" fill="#e8ded0"/>` + Array.from({ length: 14 }, (_, i) => `<line x1="${i * 50}" y1="${FY}" x2="${i * 50 - 24}" y2="${VH}" stroke="#d9ccb9" stroke-width="1.2"/>`).join('');
  // wall: window, clock, shelf with cups
  s += `<rect x="452" y="36" width="118" height="84" rx="4" fill="#d6e8f5" stroke="#c9b99b" stroke-width="5"/><line x1="511" y1="36" x2="511" y2="120" stroke="#c9b99b" stroke-width="3.5"/><path d="M460 112 L486 86 L504 102 L520 90 L562 112 Z" fill="#b9d9c6"/><circle cx="478" cy="58" r="8" fill="#fff6d8"/>`;
  s += `<circle cx="300" cy="52" r="20" fill="${W}" stroke="${INK}" stroke-width="2.4"/><line x1="300" y1="52" x2="300" y2="39" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/><line x1="300" y1="52" x2="309" y2="56" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/><circle cx="300" cy="52" r="2" fill="${INK}"/>`;
  s += `<rect x="28" y="62" width="120" height="8" rx="2" fill="#b07a45" stroke="${INK}" stroke-width="1.3"/>` + [44, 72, 100, 128].map((x, i) => `<path d="M${x - 10} 38 H${x + 10} L${x + 8} 62 H${x - 8} Z" fill="${[TW, OW, SKY, BUT][i]}" stroke="${INK}" stroke-width="1.3"/>`).join('');
  // counter
  const CX = 300, TOPY = 228;
  s += `<rect x="${CX - 96}" y="${TOPY}" width="192" height="12" rx="4" fill="url(#csSteel)" stroke="${INK}" stroke-width="1.6"/><rect x="${CX - 88}" y="${TOPY + 12}" width="176" height="${FY - TOPY - 12}" fill="#c98f52" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<rect x="${CX - 80}" y="${TOPY + 22}" width="76" height="${FY - TOPY - 34}" rx="3" fill="#d29a5d" stroke="${INK}" stroke-width="1.2"/><rect x="${CX + 4}" y="${TOPY + 22}" width="76" height="${FY - TOPY - 34}" rx="3" fill="#d29a5d" stroke="${INK}" stroke-width="1.2"/><rect x="${CX - 16}" y="${TOPY + 40}" width="6" height="22" rx="3" fill="${INK}"/><rect x="${CX + 10}" y="${TOPY + 40}" width="6" height="22" rx="3" fill="${INK}"/>`;
  // the stack: plates 1-4
  const GAP = 17;
  for (let i = 0; i < 4; i++) { const y = TOPY - 6 - i * GAP; s += plate(CX, y) + badge(CX - PW / 2 - 16, y + 3, i + 1, INK); }
  const stackTop = TOPY - 6 - 3 * GAP;
  // helper (left) with clean plate 6
  const hp = person({ x: 112, FY, H: 300, skin: SKIN2, hair: 'net', shirt: '#f6c9b5', apron: W, pants: '#2f3b36', plateW: PW, longSleeve: false, look: 1.2 });
  s += hp.s + plate(112, hp.plateY, { rim: TEAL }) + handAt(...hp.hands[0], SKIN2, false) + handAt(...hp.hands[1], SKIN2, true) + badge(112 - PW / 2 - 14, hp.plateY - 6, 6, TEAL);
  // student (right) with plate 5, just taken off the top
  const st = person({ x: 482, FY, H: 286, skin: SKIN, hair: 'pony', hairC: '#3b2618', shirt: W, collar: true, lanyard: true, skirt: '#2c3e6b', plateW: PW, look: -1.2 });
  s += st.s + plate(482, st.plateY, { rim: ORANGE }) + handAt(...st.hands[0], SKIN, false) + handAt(...st.hands[1], SKIN, true) + badge(482 + PW / 2 + 14, st.plateY - 6, 5, ORANGE);
  // arrows: plate 6 down onto the top, plate 5 up off the top
  s += `<path d="M146 ${hp.plateY - 10} Q${CX - 66} ${stackTop - 110} ${CX - 12} ${stackTop - 14}" fill="none" stroke="${TEAL}" stroke-width="2.8" stroke-dasharray="7 5" stroke-linecap="round" marker-end="url(#csT)"/>`;
  s += `<path d="M${CX + 14} ${stackTop - 14} Q${CX + 66} ${stackTop - 110} 448 ${st.plateY - 12}" fill="none" stroke="${ORANGE}" stroke-width="2.8" stroke-linecap="round" marker-end="url(#csO)"/>`;
  s += pill(206, 62, 'goes on top', '(push)', TEAL) + pill(394, 62, 'taken first', '(pop)', ORANGE);
  s += pill(CX, VH - 24, 'Plate 1 went in first, so it comes out last.', '', SOFT);
  return r1(s + '</g></svg>');
}

/** Part 2 "Why DFS uses a stack": the stack standing up, then lying on its side as one row (top at the right). */
export function stackToRow() {
  const VW = 560, VH = 236;
  const box = (x, y, w, h, l, top) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${top ? ORANGE : TW}" stroke="${top ? '#b4461a' : TEAL}" stroke-width="2"/>` + t(x + w / 2, y + h / 2 + 6, l, { size: 17, w: 800, c: top ? W : INK });
  let s = `<svg class="objbox gi-pic stack-row-pic" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="On the left, a stack standing up: A at the bottom, then B, then E on top. Push puts a letter on top, and pop takes the top letter off. An arrow says lay it on its side. On the right, the same stack as one row: A, B, E, with A as the bottom on the left and E as the top on the right."><defs>${marker('srT', TEAL)}${marker('srO', ORANGE)}${marker('srS', SOFT, 13)}</defs>`;
  s += `<rect x="1" y="1" width="${VW - 2}" height="${VH - 2}" rx="14" fill="#fbf9f4" stroke="#e4e0d6" stroke-width="1.5"/>`;
  // left: the stack standing up
  s += t(135, 24, 'A stack standing up', { size: 13.5, w: 800, c: SOFT });
  const tx = 92, tw = 86, base = 210, bh = 38, g = 7;
  s += `<path d="M${tx} 80 V${base} H${tx + tw} V80" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`;
  ['A', 'B', 'E'].forEach((l, i) => { s += box(tx + 8, base - 6 - (i + 1) * bh - i * g + g, tw - 16, bh - 2, l, i === 2); });
  s += `<line x1="${tx + 22}" y1="38" x2="${tx + 22}" y2="74" stroke="${TEAL}" stroke-width="3" stroke-linecap="round" marker-end="url(#srT)"/>`;
  s += `<line x1="${tx + tw - 22}" y1="74" x2="${tx + tw - 22}" y2="38" stroke="${ORANGE}" stroke-width="3" stroke-linecap="round" marker-end="url(#srO)"/>`;
  s += t(tx - 12, 50, 'push', { size: 13.5, w: 800, c: TEAL, a: 'end' }) + t(tx - 12, 66, 'puts on top', { size: 11.5, w: 700, c: SOFT, a: 'end' });
  s += t(tx + tw + 12, 50, 'pop', { size: 13.5, w: 800, c: ORANGE, a: 'start' }) + t(tx + tw + 12, 66, 'takes the top off', { size: 11.5, w: 700, c: SOFT, a: 'start' });
  // middle: lay it on its side
  s += `<path d="M236 168 Q282 196 328 168" fill="none" stroke="${SOFT}" stroke-width="2.4" stroke-dasharray="6 5" stroke-linecap="round" marker-end="url(#srS)"/>`;
  s += t(282, 146, 'lay it on', { size: 12.5, w: 800, c: SOFT }) + t(282, 162, 'its side', { size: 12.5, w: 800, c: SOFT });
  // right: the row
  s += t(436, 24, 'The same stack as one row', { size: 13.5, w: 800, c: SOFT });
  const rx = 354, cw = 50, cg = 8, ry = 108;
  ['A', 'B', 'E'].forEach((l, i) => { s += box(rx + i * (cw + cg), ry, cw, 48, l, i === 2); });
  const ex = rx + 2 * (cw + cg) + cw / 2, ax = rx + cw / 2;
  s += `<line x1="${ex}" y1="196" x2="${ex}" y2="164" stroke="${ORANGE}" stroke-width="2.6" stroke-linecap="round" marker-end="url(#srO)"/>` + t(ex, 214, 'top', { size: 13.5, w: 800, c: ORANGE });
  s += `<line x1="${ax}" y1="196" x2="${ax}" y2="164" stroke="${SOFT}" stroke-width="2.2" stroke-linecap="round" marker-end="url(#srS)"/>` + t(ax, 214, 'bottom', { size: 13, w: 700, c: SOFT });
  return r1(s + '</svg>');
}

/* ---------- file manager ---------- */
const folderIcon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 3 Q0 0 3 0 H8 L10.5 2.5 H19 Q22 2.5 22 5.5 V15 Q22 17 20 17 H2 Q0 17 0 15 Z" fill="#e0a72e" stroke="#9a6c12" stroke-width="1"/><path d="M0 6 H22 V15 Q22 17 20 17 H2 Q0 17 0 15 Z" fill="#f6c552" stroke="#9a6c12" stroke-width="1"/><line x1="2" y1="7.6" x2="20" y2="7.6" stroke="#fde59a" stroke-width="1.1"/></g>`;
const fileIcon = (x, y, tag, c) => `<g transform="translate(${x} ${y})"><path d="M2 0 H12 L17 5 V20 Q17 21 16 21 H2 Q1 21 1 20 V1 Q1 0 2 0 Z" fill="${W}" stroke="#8d9593" stroke-width="1"/><path d="M12 0 V5 H17" fill="#e9eceb" stroke="#8d9593" stroke-width="1"/><rect x="-1" y="11" width="15" height="7" rx="1.5" fill="${c}"/><text x="6.5" y="16.6" text-anchor="middle" ${F} font-size="5.2" font-weight="800" fill="${W}">${tag}</text></g>`;

/** Part 1 "DFS in real life": a file manager in column view. Each column is one folder deeper; the numbers show the order the folders were opened. */
export function folderSearch() {
  const VW = 600, VH = 332, X0 = 12, Y0 = 40, X1 = 588, Y1 = 322, SB = 160, C2 = 306, C3 = 452, TB = Y0 + 42, ROW = 32;
  let s = `<svg class="objbox gi-pic" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="A file manager window in column view, looking for the Lab 3 file. 1, Documents is opened from the sidebar. 2, ITC120 is opened. 3, Week 9 is opened, but it is empty, so the Back button returns to ITC120. 4, Week 10 is opened, and Lab 3 is found inside it. Each column to the right is one folder deeper. The path bar at the bottom shows Documents, ITC120, Week 10.">`;
  s += `<defs>${marker('fsO', ORANGE)}<clipPath id="fsWin"><rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" rx="12"/></clipPath><filter id="fsSh" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.16"/></filter></defs>`;
  // "deeper" arrow above the columns
  s += `<line x1="${SB + 20}" y1="16" x2="${X1 - 14}" y2="16" stroke="${ORANGE}" stroke-width="2.6" stroke-linecap="round" marker-end="url(#fsO)"/>`;
  s += `<rect x="${(SB + X1) / 2 - 118}" y="5" width="236" height="22" rx="11" fill="#fbf6ec"/>` + t((SB + X1) / 2, 21, 'each column is one folder deeper', { size: 12.5, w: 800, c: ORANGE });
  // window
  s += `<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" rx="12" fill="${W}" stroke="#b9c0be" stroke-width="1.4" filter="url(#fsSh)"/><g clip-path="url(#fsWin)">`;
  s += `<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="42" fill="#eceff0"/><line x1="${X0}" y1="${TB}" x2="${X1}" y2="${TB}" stroke="#d3d8d7"/>`;
  s += ['#ef6b5b', '#f2c14e', '#5fbf6a'].map((c, i) => `<circle cx="${X0 + 20 + i * 18}" cy="${Y0 + 21}" r="6" fill="${c}" stroke="#00000022"/>`).join('');
  // back (teal, highlighted) and forward buttons
  s += `<rect x="${X0 + 82}" y="${Y0 + 8}" width="30" height="26" rx="7" fill="${TEAL}"/><path d="M${X0 + 102} ${Y0 + 21} H${X0 + 92} M${X0 + 97} ${Y0 + 15} L${X0 + 91} ${Y0 + 21} L${X0 + 97} ${Y0 + 27}" fill="none" stroke="${W}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<rect x="${X0 + 116}" y="${Y0 + 8}" width="30" height="26" rx="7" fill="#e2e6e5"/><path d="M${X0 + 126} ${Y0 + 21} H${X0 + 136} M${X0 + 131} ${Y0 + 15} L${X0 + 137} ${Y0 + 21} L${X0 + 131} ${Y0 + 27}" fill="none" stroke="#a9b1af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += folderIcon(X0 + 238, Y0 + 13) + tl(X0 + 266, Y0 + 27, 'Week 10', { size: 13.5, w: 800 });
  s += `<rect x="${X1 - 132}" y="${Y0 + 9}" width="118" height="24" rx="7" fill="${W}" stroke="#d3d8d7"/><circle cx="${X1 - 117}" cy="${Y0 + 20}" r="4.5" fill="none" stroke="#8d9593" stroke-width="1.6"/><line x1="${X1 - 113.5}" y1="${Y0 + 23.5}" x2="${X1 - 110}" y2="${Y0 + 27}" stroke="#8d9593" stroke-width="1.6" stroke-linecap="round"/>` + tl(X1 - 104, Y0 + 25.5, 'Search', { size: 12, w: 600, c: '#8d9593' });
  // sidebar
  const PB = Y1 - 34;
  s += `<rect x="${X0}" y="${TB}" width="${SB - X0}" height="${PB - TB}" fill="#f2f4f3"/><line x1="${SB}" y1="${TB}" x2="${SB}" y2="${PB}" stroke="#d3d8d7"/>`;
  s += tl(X0 + 14, TB + 22, 'Favorites', { size: 11.5, w: 800, c: '#8d9593' });
  const side = [['Desktop', 'desk'], ['Documents', 'docs'], ['Downloads', 'down'], ['Pictures', 'pic']];
  side.forEach(([n, k], i) => { const y = TB + 46 + i * 30;
    if (k === 'docs') s += `<rect x="${X0 + 6}" y="${y - 15}" width="${SB - X0 - 12}" height="26" rx="6" fill="#dfe4e3"/>`;
    const ix = X0 + 16, iy = y - 9;
    if (k === 'desk') s += `<rect x="${ix}" y="${iy}" width="16" height="11" rx="1.5" fill="none" stroke="${BLUE}" stroke-width="1.6"/><line x1="${ix + 8}" y1="${iy + 11}" x2="${ix + 8}" y2="${iy + 14}" stroke="${BLUE}" stroke-width="1.6"/><line x1="${ix + 4}" y1="${iy + 14.5}" x2="${ix + 12}" y2="${iy + 14.5}" stroke="${BLUE}" stroke-width="1.6" stroke-linecap="round"/>`;
    if (k === 'docs') s += `<path d="M${ix + 2} ${iy - 1} H${ix + 10} L${ix + 14} ${iy + 3} V${iy + 15} H${ix + 2} Z" fill="none" stroke="${BLUE}" stroke-width="1.6" stroke-linejoin="round"/><line x1="${ix + 5}" y1="${iy + 7}" x2="${ix + 11}" y2="${iy + 7}" stroke="${BLUE}" stroke-width="1.3"/><line x1="${ix + 5}" y1="${iy + 10.5}" x2="${ix + 11}" y2="${iy + 10.5}" stroke="${BLUE}" stroke-width="1.3"/>`;
    if (k === 'down') s += `<circle cx="${ix + 8}" cy="${iy + 7}" r="7.5" fill="none" stroke="${BLUE}" stroke-width="1.6"/><path d="M${ix + 8} ${iy + 2.5} V${iy + 10.5} M${ix + 4.5} ${iy + 7.5} L${ix + 8} ${iy + 11} L${ix + 11.5} ${iy + 7.5}" fill="none" stroke="${BLUE}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (k === 'pic') s += `<rect x="${ix}" y="${iy}" width="16" height="13" rx="2" fill="none" stroke="${BLUE}" stroke-width="1.6"/><path d="M${ix + 2} ${iy + 11} L${ix + 6} ${iy + 6} L${ix + 9} ${iy + 9} L${ix + 11} ${iy + 7} L${ix + 14} ${iy + 11}" fill="none" stroke="${BLUE}" stroke-width="1.3" stroke-linejoin="round"/>`;
    s += tl(X0 + 40, y + 2, n, { size: 12.5, w: k === 'docs' ? 800 : 600 }); });
  // columns
  s += `<line x1="${C2}" y1="${TB}" x2="${C2}" y2="${PB}" stroke="#e1e5e4"/><line x1="${C3}" y1="${TB}" x2="${C3}" y2="${PB}" stroke="#e1e5e4"/>`;
  const row = (x0, x1, i, name, kind, q = {}) => { const y = TB + 8 + i * ROW; let r = '';
    if (q.sel) r += `<rect x="${x0 + 5}" y="${y}" width="${x1 - x0 - 10}" height="${ROW - 4}" rx="6" fill="${q.sel}"/>`;
    r += kind === 'folder' ? folderIcon(x0 + 12, y + 5.5) : fileIcon(x0 + 14, y + 3.5, kind[0], kind[1]);
    r += tl(x0 + 42, y + 19, name, { size: 12.5, w: q.sel ? 800 : 600, c: q.dim ? '#8d9593' : INK });
    if (kind === 'folder') r += `<path d="M${x1 - 18} ${y + 9} L${x1 - 13} ${y + 14} L${x1 - 18} ${y + 19}" fill="none" stroke="#a9b1af" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
    return r; };
  const PATH = '#d7ece9';
  s += row(SB, C2, 0, 'ITC120', 'folder', { sel: PATH }) + row(SB, C2, 1, 'Photos', 'folder') + row(SB, C2, 2, 'Resume', ['DOCX', BLUE]);
  s += row(C2, C3, 0, 'Week 9', 'folder', { sel: '#eef1f0' }) + row(C2, C3, 1, 'Week 10', 'folder', { sel: PATH }) + row(C2, C3, 2, 'Syllabus', ['PDF', RED]);
  s += row(C3, X1, 0, 'Lab 3', ['JAVA', ORANGE], { sel: OW }) + row(C3, X1, 1, 'Notes', ['TXT', '#8d9593']);
  // Week 9 note
  const ny = TB + 112;
  s += `<rect x="${C2 + 8}" y="${ny}" width="${C3 - C2 - 16}" height="62" rx="10" fill="${TEAL}"/>` + tl(C2 + 20, ny + 20, 'Week 9 was empty,', { size: 12, w: 800, c: W }) + tl(C2 + 20, ny + 36, 'so we clicked Back', { size: 12, w: 700, c: W }) + tl(C2 + 20, ny + 52, 'to return to ITC120.', { size: 12, w: 700, c: W });
  // found tag
  s += `<rect x="${C3 + 14}" y="${TB + 84}" width="96" height="26" rx="13" fill="${ORANGE}"/>` + t(C3 + 62, TB + 101.5, 'found it!', { size: 12.5, w: 800, c: W }) + `<path d="M${C3 + 40} ${TB + 84} L${C3 + 46} ${TB + 74} L${C3 + 52} ${TB + 84} Z" fill="${ORANGE}"/>`;
  // path bar
  s += `<rect x="${X0}" y="${PB}" width="${X1 - X0}" height="${Y1 - PB}" fill="#f6f7f7"/><line x1="${X0}" y1="${PB}" x2="${X1}" y2="${PB}" stroke="#d3d8d7"/>`;
  let px = X0 + 16; const pyb = PB + 22;
  ['Documents', 'ITC120', 'Week 10'].forEach((n, i) => { s += folderIcon(px, pyb - 12, 0.75) + tl(px + 21, pyb, n, { size: 12, w: i === 2 ? 800 : 600 }); px += 21 + n.length * 7.2 + 6; if (i < 2) { s += tl(px, pyb, '›', { size: 13, w: 700, c: '#8d9593' }); px += 14; } });
  s += '</g>';
  // order badges
  const bd = (x, y, n) => `<circle cx="${x}" cy="${y}" r="11" fill="${ORANGE}" stroke="${W}" stroke-width="2"/>` + t(x, y + 4.5, String(n), { size: 12.5, w: 800, c: W });
  s += bd(SB - 16, TB + 76, 1) + bd(C2 - 36, TB + 22, 2) + bd(C3 - 36, TB + 22, 3) + bd(C3 - 36, TB + 54, 4);
  return r1(s + '</svg>');
}

/* ---------- where DFS is used ---------- */
// Seeded maze made by DFS itself (recursive backtracker). Cells [c, r]; open passages as a set of "c,r|c,r".
function makeMaze(C, R, seed, start) {
  let x = seed; const rnd = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
  const key = (a, b) => (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? `${a}|${b}` : `${b}|${a}`);
  const open = new Set(), seen = new Set([String(start)]), st = [start];
  while (st.length) {
    const [c, r] = st[st.length - 1];
    const nb = [[c + 1, r], [c - 1, r], [c, r + 1], [c, r - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < C && b < R && !seen.has(`${a},${b}`));
    if (!nb.length) { st.pop(); continue; }
    const n = nb[Math.floor(rnd() * nb.length)];
    open.add(key([c, r], n)); seen.add(String(n)); st.push(n);
  }
  const nbrs = (p) => [[p[0] + 1, p[1]], [p[0] - 1, p[1]], [p[0], p[1] + 1], [p[0], p[1] - 1]].filter((q) => open.has(key(p, q)));
  return { open, key, nbrs };
}
function pathBetween(M, a, b) {
  const prev = { [a]: null }, q = [a];
  while (q.length) { const p = q.shift(); if (String(p) === String(b)) break; for (const n of M.nbrs(p)) if (!(n in prev)) { prev[n] = p; q.push(n); } }
  const out = []; for (let p = b; p; p = prev[p]) out.unshift(p); return out;
}
// The longest way into a branch, starting at cell `from` and not stepping back to `not`.
function deepest(M, from, not) {
  let best = [from];
  for (const n of M.nbrs(from)) if (String(n) !== String(not)) { const d = [from, ...deepest(M, n, from)]; if (d.length > best.length) best = d; }
  return best;
}
const CAT = (kx, ky, sc) => { const outline = 'M38 98 C33 70 40 40 54 22 C68 28 83 40 93 50 C111 46 129 46 147 50 C157 40 172 28 186 22 C200 40 207 70 202 98 C214 114 212 150 180 162 C150 172 90 172 60 162 C28 150 26 114 38 98 Z';
  return `<g transform="translate(${kx} ${ky}) scale(${sc}) translate(-120 -100)"><clipPath id="dcat"><path d="${outline}"/></clipPath><path d="${outline}" fill="#ffb072"/><g clip-path="url(#dcat)"><path d="M108 52 L111 72 M120 50 L120 72 M132 52 L129 72" stroke="#d9773a" stroke-width="6" stroke-linecap="round"/></g><path d="${outline}" fill="none" stroke="#6e2a2a" stroke-width="7" stroke-linejoin="round"/><path d="M42 110 L12 104 M42 124 L12 128 M198 110 L228 104 M198 124 L228 128" stroke="#6e2a2a" stroke-width="5" stroke-linecap="round"/><ellipse cx="70" cy="128" rx="13" ry="7" fill="#f7a1a8" opacity=".9"/><ellipse cx="170" cy="128" rx="13" ry="7" fill="#f7a1a8" opacity=".9"/><ellipse cx="91" cy="109" rx="8.5" ry="10.5" fill="#4a1d1d"/><ellipse cx="155" cy="109" rx="8.5" ry="10.5" fill="#4a1d1d"/><circle cx="94" cy="105" r="2.6" fill="#fff"/><circle cx="158" cy="105" r="2.6" fill="#fff"/><path d="M110 122 q5 8 10 1 q5 7 10 -1" fill="none" stroke="#4a1d1d" stroke-width="4.5" stroke-linecap="round"/></g>`; };

/** Part 1 "When DFS is used": solving a maze (a real maze; try one way, dead end, back up, try the next way) and finding a cycle in a project plan. */
export function dfsUsesIT() {
  const VW = 550, CW = 542, H1 = 346, H2 = 392, GAP = 30, VH = H1 + H2 + GAP + 8;
  const PU = '#7d5ba6', PK = '#d6487e';
  let s = `<svg class="objbox gi-pic" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Two places where DFS is used. Solving a maze: the cat starts at the left. It tries one way (1) until it reaches a dead end (2), backs up to the last fork (3), and tries the next way (4), which leads to the goal. Finding a cycle in a project plan: Task A, Design the pages, waits for Task B, Build the pages. Task B waits for Task C, Test the pages. Task C waits for Task A. No task can start. DFS follows the waits-for arrows from Task A to B to C, and then reaches Task A again while A is still on its path, so it finds the cycle."><defs>${marker('duO', ORANGE)}${marker('duT', TEAL)}${marker('duB', BLUE)}${marker('duR', RED, 13)}</defs>`;
  // ---- card 1: maze
  { const x0 = 4, y0 = 4;
    s += card(x0, y0, CW, H1, 'Solving a maze', PU);
    const C = 10, R = 6, Z = 36, mx = x0 + 70, my = y0 + 60, start = [0, 2], goal = [C - 1, 2];
    // designed routes: the way to the goal, and one dead-end branch at the fork (3,2); the rest is filled at random
    const sol = [[0, 2], [1, 2], [2, 2], [3, 2], [3, 3], [3, 4], [4, 4], [5, 4], [6, 4], [6, 3], [7, 3], [8, 3], [8, 2], [9, 2]], fork = 3;
    const dead = [[3, 2], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]];
    const key = (a, b) => (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? `${a}|${b}` : `${b}|${a}`);
    const open = new Set(), seen = new Set(), grow = new Set();
    const link = (ps) => { for (let i = 0; i < ps.length; i++) { seen.add(String(ps[i])); if (i) open.add(key(ps[i - 1], ps[i])); } };
    link(sol); link(dead);
    sol.forEach((p, i) => { if (i !== fork) grow.add(String(p)); });
    let rs = 11; const rnd = () => ((rs = (rs * 1103515245 + 12345) % 2147483648) / 2147483648);
    for (;;) {
      const fr = [];
      for (const g of grow) { const [c, r] = g.split(',').map(Number); for (const n of [[c + 1, r], [c - 1, r], [c, r + 1], [c, r - 1]]) if (n[0] >= 0 && n[1] >= 0 && n[0] < C && n[1] < R && !seen.has(String(n))) fr.push([[c, r], n]); }
      if (!fr.length) break;
      const [from, n] = fr[Math.floor(rnd() * fr.length)];
      open.add(key(from, n)); seen.add(String(n)); grow.add(String(n));
    }
    const M = { open, key };
    const cx = (p) => mx + p[0] * Z + Z / 2, cy = (p) => my + p[1] * Z + Z / 2;
    s += `<rect x="${mx - 6}" y="${my - 6}" width="${C * Z + 12}" height="${R * Z + 12}" rx="8" fill="#efe6f7"/><rect x="${mx}" y="${my}" width="${C * Z}" height="${R * Z}" fill="#fffaf0"/>`;
    // walls
    let wl = '';
    for (let c = 0; c < C; c++) for (let r = 0; r < R; r++) {
      const X = mx + c * Z, Y = my + r * Z;
      if (c === C - 1 ? !(r === goal[1]) : !M.open.has(M.key([c, r], [c + 1, r]))) wl += `M${X + Z} ${Y} V${Y + Z}`;
      if (r === R - 1 || !M.open.has(M.key([c, r], [c, r + 1]))) wl += `M${X} ${Y + Z} H${X + Z}`;
      if (c === 0 && r !== start[1]) wl += `M${X} ${Y} V${Y + Z}`;
      if (r === 0) wl += `M${X} ${Y} H${X + Z}`;
    }
    const poly = (ps, dx = 0, dy = 0) => 'M' + ps.map((p) => `${cx(p) + dx} ${cy(p) + dy}`).join(' L');
    const tryOne = [...sol.slice(0, fork + 1), ...dead.slice(1)], back = [...dead].reverse(), tryTwo = sol.slice(fork);
    s += `<path d="${poly(tryTwo)} L${mx + C * Z + 22} ${cy(goal)}" fill="none" stroke="${BLUE}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#duB)"/>`;
    s += `<path d="M${mx - 22} ${cy(start)} L${poly(tryOne).slice(1)}" fill="none" stroke="${ORANGE}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path d="${poly(back, 7, 7)}" fill="none" stroke="${TEAL}" stroke-width="2.8" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#duT)"/>`;
    s += `<path d="${wl}" stroke="#4b3768" stroke-width="5" stroke-linecap="round" fill="none"/>`;
    const end = dead[dead.length - 1];
    s += `<path d="M${cx(end) - 8} ${cy(end) - 8} l16 16 M${cx(end) + 8} ${cy(end) - 8} l-16 16" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`;
    s += `<circle cx="${cx(sol[fork])}" cy="${cy(sol[fork])}" r="7" fill="${W}" stroke="${INK}" stroke-width="2.2"/>`;
    // cat at the start, flag at the goal
    s += CAT(mx - 40, cy(start), 0.21);
    const fx = mx + C * Z + 30, fy = cy(goal);
    s += `<line x1="${fx}" y1="${fy + 16}" x2="${fx}" y2="${fy - 20}" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M${fx} ${fy - 20} L${fx + 20} ${fy - 13} L${fx} ${fy - 6} Z" fill="${PK}" stroke="${INK}" stroke-width="1.3"/>`;
    s += t(fx + 6, fy + 34, 'Goal', { size: 12.5, w: 800, c: PK }) + t(mx - 40, cy(start) - 30, 'Start', { size: 12.5, w: 800, c: PU });
    // number badges on each part
    const mid = (ps) => ps[Math.floor(ps.length / 2)];
    const bd = (p, n, c, dx = 0, dy = 0) => `<circle cx="${cx(p) + dx}" cy="${cy(p) + dy}" r="11" fill="${c}" stroke="${W}" stroke-width="2"/>` + t(cx(p) + dx, cy(p) + dy + 4.5, String(n), { size: 12.5, w: 800, c: W });
    const at = (ps, f) => ps[Math.max(1, Math.min(ps.length - 2, Math.round((ps.length - 1) * f)))];
    s += bd(at(dead, 0.34), 1, ORANGE, -10, -10) + bd(end, 2, RED, 16, -16) + bd(at(back, 0.34), 3, TEAL, 12, 12) + bd(at(tryTwo, 0.5), 4, BLUE, -10, -10);
    // key
    const ky = my + R * Z + 30, kk = (x, n, c, l) => `<circle cx="${x}" cy="${ky - 4}" r="10" fill="${c}"/>` + t(x, ky + 0.5, String(n), { size: 11.5, w: 800, c: W }) + tl(x + 15, ky + 0.5, l, { size: 12.5, w: 700 });
    s += kk(x0 + 24, 1, ORANGE, 'Try one way.') + kk(x0 + 140, 2, RED, 'Dead end!') + kk(x0 + 238, 3, TEAL, 'Back up to the fork.') + kk(x0 + 394, 4, BLUE, 'Try the next way.');
    s += `<circle cx="${x0 + 26 + 0}" cy="${ky + 22}" r="6" fill="${W}" stroke="${INK}" stroke-width="2"/>` + tl(x0 + 41, ky + 26, 'The white dot is the fork, where the cat had two ways to choose from.', { size: 12, w: 600, c: SOFT });
  }
  // ---- card 2: cycle in a project plan
  { const x0 = 4, y0 = 4 + H1 + GAP;
    s += card(x0, y0, CW, H2, 'Finding a cycle in a project plan', RED);
    const task = (cx, cy, id, name, who, waits, col) => {
      const w = 168, h = 92, x = cx - w / 2, y = cy - h / 2;
      let r = `<rect x="${x}" y="${y + 3}" width="${w}" height="${h}" rx="10" fill="#00000012"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${W}" stroke="#d3d8d7" stroke-width="1.3"/><path d="M${x} ${y + 10} Q${x} ${y} ${x + 10} ${y} H${x + 6} V${y + h} H${x + 10} Q${x} ${y + h} ${x} ${y + h - 10} Z" fill="${col}"/><rect x="${x}" y="${y}" width="6" height="${h}" fill="${col}"/>`;
      r += tl(x + 16, y + 20, id, { size: 11.5, w: 800, c: SOFT }) + tl(x + 16, y + 38, name, { size: 13, w: 800 });
      r += `<circle cx="${x + w - 20}" cy="${y + 18}" r="10" fill="${who[1]}"/><circle cx="${x + w - 20}" cy="${y + 15}" r="4" fill="#f3cfa6"/><path d="M${x + w - 27} ${y + 25} Q${x + w - 20} ${y + 17} ${x + w - 13} ${y + 25}" fill="#f3cfa6"/>` + t(x + w - 20, y + 40, who[0], { size: 10, w: 700, c: SOFT });
      r += `<rect x="${x + 14}" y="${y + 52}" width="70" height="20" rx="10" fill="#fbe3e0"/><rect x="${x + 22}" y="${y + 61}" width="9" height="7" rx="1.5" fill="${RED}"/><path d="M${x + 24} ${y + 61} v-2.5 a2.5 2.5 0 0 1 5 0 v2.5" fill="none" stroke="${RED}" stroke-width="1.5"/>` + tl(x + 36, y + 66.5, 'Blocked', { size: 11, w: 800, c: RED });
      r += tl(x + 16, y + 86, 'waits for ' + waits, { size: 11, w: 700, c: SOFT });
      return r; };
    const A = [x0 + CW / 2, y0 + 108], B = [x0 + CW - 120, y0 + 236], Cc = [x0 + 120, y0 + 236];
    // waits-for arrows (drawn first, cards on top)
    s += `<path d="M${A[0] + 86} ${A[1] + 6} Q${B[0] + 14} ${A[1] + 10} ${B[0] + 6} ${B[1] - 50}" fill="none" stroke="${RED}" stroke-width="2.8" stroke-linecap="round" marker-end="url(#duR)"/>`;
    s += `<path d="M${B[0] - 86} ${B[1] + 10} Q${x0 + CW / 2} ${B[1] + 40} ${Cc[0] + 88} ${Cc[1] + 10}" fill="none" stroke="${RED}" stroke-width="2.8" stroke-linecap="round" marker-end="url(#duR)"/>`;
    s += `<path d="M${Cc[0] - 6} ${Cc[1] - 48} Q${Cc[0] - 14} ${A[1] + 10} ${A[0] - 88} ${A[1] + 6}" fill="none" stroke="${RED}" stroke-width="2.8" stroke-linecap="round" marker-end="url(#duR)"/>`;
    s += task(...A, 'Task A', 'Design the pages', ['Ana', SKY], 'Task B', TEAL) + task(...B, 'Task B', 'Build the pages', ['Ben', BUT], 'Task C', BLUE) + task(...Cc, 'Task C', 'Test the pages', ['Cris', OW], 'Task A', ORANGE);
    s += t(x0 + CW / 2, y0 + 210, 'Stuck!', { size: 16, w: 800, c: RED }) + t(x0 + CW / 2, y0 + 228, 'No task can start.', { size: 12.5, w: 700, c: RED });
    // DFS finds it
    const ry = y0 + H2 - 52;
    s += `<rect x="${x0 + 14}" y="${ry - 26}" width="${CW - 28}" height="66" rx="10" fill="#f6f7f7"/>` + tl(x0 + 28, ry - 7, 'DFS follows the waits-for arrows.', { size: 12, w: 800, c: SOFT });
    const chip = (x, l, c) => `<rect x="${x}" y="${ry + 2}" width="62" height="26" rx="7" fill="${c === RED ? W : TW}" stroke="${c}" stroke-width="2"/>` + t(x + 31, ry + 19.5, l, { size: 12.5, w: 800 });
    const X = [x0 + 28, x0 + 116, x0 + 204, x0 + 292];
    s += chip(X[0], 'Task A', TEAL) + chip(X[1], 'Task B', TEAL) + chip(X[2], 'Task C', TEAL) + chip(X[3], 'Task A', RED);
    for (let i = 0; i < 3; i++) s += `<line x1="${X[i] + 66}" y1="${ry + 15}" x2="${X[i + 1] - 6}" y2="${ry + 15}" stroke="${SOFT}" stroke-width="2" marker-end="url(#duT)"/>`;
    s += tl(X[3] + 72, ry + 12, 'A is still on the path,', { size: 12, w: 800, c: RED }) + tl(X[3] + 72, ry + 27, 'so there is a cycle.', { size: 12, w: 800, c: RED });
  }
  return r1(s + '</svg>');
}

/** Part 3 "How to remember BFS and DFS" (v2, flat with ink outlines like the canteen pictures; both scenes share one frame style).
 *  B is for Broad: a stone dropped in a pond, ripples spread wide one wave at a time. D is for Deep: an ant goes down one tunnel to its end, backs up, tries another. */
export function rememberBfsDfs() {
  const VW = 550, VH = 330, PW2 = 263, PH2 = 322;
  const O = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
  let s = `<svg class="objbox gi-pic" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Two pictures to remember BFS and DFS. B is for Broad: a stone dropped in a pond makes ripples that spread out wide, one wave at a time, like BFS with its queue. D is for Deep: an ant goes down one tunnel to its end, finds a dead end, backs up to the fork, and then tries the other tunnel, like DFS with its stack."><defs>${marker('rbO', ORANGE)}${marker('rbT', TEAL)}${marker('rbB', BLUE)}${marker('rbK', INK, 10)}<clipPath id="rbC1"><rect x="18" y="54" width="${PW2 - 28}" height="176" rx="10"/></clipPath><clipPath id="rbC2"><rect x="${283 + 14}" y="54" width="${PW2 - 28}" height="176" rx="10"/></clipPath></defs>`;
  const frame = (x) => `<rect x="${x + 14}" y="54" width="${PW2 - 28}" height="176" rx="10" fill="none" ${O}/>`;
  const chips = (x0, word, col, letters, topLast) => { const qy = 280; let r = tl(x0 + 26, qy + 17, 'uses a', { size: 12, w: 700, c: SOFT }) + tl(x0 + 26, qy + 32, word, { size: 12.5, w: 800, c: col });
    letters.forEach((l, i) => { const top = topLast && i === letters.length - 1; r += `<rect x="${x0 + 90 + i * 36}" y="${qy + 6}" width="30" height="28" rx="6" fill="${top ? ORANGE : (col === BLUE ? '#dceaf6' : TW)}" stroke="${top ? '#b4461a' : col}" stroke-width="1.6"/>` + t(x0 + 105 + i * 36, qy + 25, l, { size: 13, w: 800, c: top ? W : INK }); });
    return r; };
  // ---- B is for Broad (top view of a pond)
  { const x0 = 4, cx = x0 + PW2 / 2, cy = 142;
    s += card(x0, 4, PW2, PH2, 'B is for Broad', BLUE);
    s += `<g clip-path="url(#rbC1)"><rect x="18" y="54" width="${PW2 - 28}" height="176" fill="#cfe3b8"/>`;
    s += [[34, 70], [216, 214], [40, 210], [222, 74], [130, 222]].map(([x, y]) => `<path d="M${x} ${y} l3 -7 M${x + 5} ${y} l1 -8 M${x + 10} ${y} l-2 -7" stroke="#7aa35c" stroke-width="1.6" stroke-linecap="round"/>`).join('');
    s += `<path d="M${cx - 100} ${cy - 6} C${cx - 102} ${cy - 54} ${cx - 40} ${cy - 72} ${cx + 10} ${cy - 66} C${cx + 70} ${cy - 62} ${cx + 106} ${cy - 34} ${cx + 100} ${cy + 8} C${cx + 96} ${cy + 52} ${cx + 40} ${cy + 70} ${cx - 16} ${cy + 66} C${cx - 70} ${cy + 62} ${cx - 98} ${cy + 36} ${cx - 100} ${cy - 6} Z" fill="#a9d4ea" ${O}/>`;
    [[78, 48], [55, 34], [32, 20]].forEach(([rx, ry]) => { s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${W}" stroke-width="3"/>`; });
    s += `<ellipse cx="${cx - 70}" cy="${cy + 30}" rx="13" ry="7" fill="#8cc173" ${O}/><path d="M${cx - 70} ${cy + 30} L${cx - 58} ${cy + 26}" ${O}/><ellipse cx="${cx + 66}" cy="${cy - 36}" rx="10" ry="5.5" fill="#8cc173" ${O}/>`;
    s += [[cx - 104, cy - 34, 9], [cx + 96, cy + 34, 8], [cx + 104, cy + 18, 6]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#c9cfcd" ${O}/>`).join('');
    // the stone lands in the center: a splash crown (pointed ring of water) with teardrop drops flying out
    let crown = '';
    const N = 7, P = (ang, R) => [(cx + Math.cos(ang) * R * 1.5).toFixed(1), (cy + Math.sin(ang) * R * 0.9).toFixed(1)];
    for (let k = 0; k < N; k++) { const a0 = (k / N) * 2 * Math.PI - Math.PI / 2, am = a0 + Math.PI / N, a1 = a0 + 2 * Math.PI / N;
      const [x0, y0] = P(a0, 9), [xt, yt] = P(am, 15), [x1, y1] = P(a1, 9), [c1x, c1y] = P(am - 0.25, 12), [c2x, c2y] = P(am + 0.25, 12);
      crown += (k ? '' : 'M' + x0 + ' ' + y0) + ' Q' + c1x + ' ' + c1y + ' ' + xt + ' ' + yt + ' Q' + c2x + ' ' + c2y + ' ' + x1 + ' ' + y1; }
    s += `<ellipse cx="${cx}" cy="${cy}" rx="15" ry="9" fill="#e6f4fb" stroke="${INK}" stroke-width="1.3"/><ellipse cx="${cx}" cy="${cy}" rx="9" ry="5.5" fill="#a9d4ea" stroke="${INK}" stroke-width="1.2"/><ellipse cx="${cx}" cy="${cy - 0.5}" rx="5.5" ry="3.5" fill="#8d9593" stroke="${INK}" stroke-width="1.2"/>`;
    const drop = (x, y, ang) => `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 -6 C2.5 -2 4 1 4 3 A4 4 0 0 1 -4 3 C-4 1 -2.5 -2 0 -6 Z" fill="#d4ecf8" stroke="${INK}" stroke-width="1.1"/><circle cx="-1.3" cy="2.4" r="1" fill="${W}"/></g>`;
    s += drop(cx - 27, cy - 14, 120) + drop(cx - 10, cy - 24, 160) + drop(cx + 10, cy - 24, 200) + drop(cx + 26, cy - 15, 240);
    // the throw: a dashed arc from the bank to the center
    const tx = cx - 104, ty = cy - 40;
    s += `<path d="M${tx} ${ty} Q${cx - 62} ${cy - 84} ${cx - 18} ${cy - 18}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-dasharray="4 4" stroke-linecap="round" marker-end="url(#rbK)"/>`;
    s += '</g>' + frame(x0);
    s += `<rect x="${cx - 26}" y="${cy - 84}" width="120" height="22" rx="11" fill="${INK}"/>` + t(cx + 34, cy - 68.5, 'a stone is thrown in', { size: 11.5, w: 800, c: W });
    [[32, 1], [55, 2], [78, 3]].forEach(([rx, n]) => { s += `<circle cx="${cx + rx}" cy="${cy}" r="9" fill="${BLUE}" stroke="${W}" stroke-width="1.6"/>` + t(cx + rx, cy + 4, String(n), { size: 10.5, w: 800, c: W }); });
    s += t(cx, 252, 'Ripples spread out wide,', { size: 12.5, w: 800 }) + t(cx, 269, 'one wave at a time.', { size: 12.5, w: 800 });
    s += chips(x0, 'queue', BLUE, ['A', 'B', 'C', 'E'], false);
  }
  // ---- D is for Deep (side view of an ant nest)
  { const x0 = 283, gy = 92;
    s += card(x0, 4, PW2, PH2, 'D is for Deep', TEAL);
    s += `<g clip-path="url(#rbC2)"><rect x="${x0 + 14}" y="54" width="${PW2 - 28}" height="176" fill="#e3f0f7"/><rect x="${x0 + 14}" y="${gy}" width="${PW2 - 28}" height="${230 - gy}" fill="#c99a68"/>`;
    s += [[40, 118], [196, 128], [70, 214], [232, 150], [150, 176], [28, 176], [80, 126]].map(([dx, dy]) => `<ellipse cx="${x0 + dx}" cy="${dy}" rx="5" ry="3.5" fill="#a87a4c" stroke="${INK}" stroke-width="1"/>`).join('');
    const E = [x0 + 120, gy + 8], Fk = [x0 + 120, 140], D1 = [x0 + 202, 208], L1 = [x0 + 50, 200];
    const tun = `M${E[0]} ${E[1]} L${Fk[0]} ${Fk[1]} M${Fk[0]} ${Fk[1]} Q${Fk[0] + 50} ${Fk[1] + 10} ${D1[0]} ${D1[1]} M${Fk[0]} ${Fk[1]} Q${Fk[0] - 50} ${Fk[1] + 20} ${L1[0]} ${L1[1]}`;
    s += `<path d="${tun}" fill="none" stroke="${INK}" stroke-width="25" stroke-linecap="round"/><path d="${tun}" fill="none" stroke="#f1dcb3" stroke-width="21.8" stroke-linecap="round"/>`;
    s += `<rect x="${x0 + 14}" y="${gy - 8}" width="${PW2 - 28}" height="10" fill="#8cc173"/><path d="M${x0 + 14} ${gy + 2} H${E[0] - 12.5} M${E[0] + 12.5} ${gy + 2} H${x0 + PW2 - 14} M${x0 + 14} ${gy - 8} H${E[0] - 12.5} M${E[0] + 12.5} ${gy - 8} H${x0 + PW2 - 14}" ${O}/><rect x="${E[0] - 11}" y="${gy - 9}" width="22" height="16" fill="#f1dcb3"/><path d="M${E[0] - 12.5} ${gy - 8} V${gy + 6} M${E[0] + 12.5} ${gy - 8} V${gy + 6}" ${O}/>`;
    s += [40, 64, 196, 222].map((dx) => `<path d="M${x0 + dx} ${gy - 8} l-3 -9 M${x0 + dx + 4} ${gy - 8} l1 -11 M${x0 + dx + 8} ${gy - 8} l4 -8" stroke="#5f9a4c" stroke-width="1.8" stroke-linecap="round"/>`).join('');
    // the ant's way, each with a white halo so it shows on the tunnel: 1 down (orange), 2 dead end, 3 back up (teal dashed), 4 the other tunnel (blue)
    const halo = (d, w) => `<path d="${d}" fill="none" stroke="${W}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>`;
    const down = `M${E[0] + 3} ${gy + 52} L${Fk[0] + 3} ${Fk[1] - 6} Q${Fk[0] + 56} ${Fk[1] - 6} ${D1[0] + 2} ${D1[1] - 20}`;
    const up = `M${D1[0] - 16} ${D1[1] - 2} Q${Fk[0] + 38} ${Fk[1] + 22} ${Fk[0] + 10} ${Fk[1] + 9}`;
    const next = `M${Fk[0] - 8} ${Fk[1] + 4} Q${Fk[0] - 40} ${Fk[1] + 16} ${L1[0] + 18} ${L1[1] - 18}`;
    s += halo(down, 8) + `<path d="${down}" fill="none" stroke="${ORANGE}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#rbO)"/>`;
    s += halo(up, 8) + `<path d="${up}" fill="none" stroke="${TEAL}" stroke-width="3.4" stroke-dasharray="7 4" stroke-linecap="round" marker-end="url(#rbT)"/>`;
    s += halo(next, 8) + `<path d="${next}" fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" marker-end="url(#rbB)"/>`;
    s += `<path d="M${D1[0] + 2} ${D1[1] - 7} l12 12 M${D1[0] + 14} ${D1[1] - 7} l-12 12" stroke="${RED}" stroke-width="3.6" stroke-linecap="round"/>`;
    const nb = (x, y, n, c) => `<circle cx="${x}" cy="${y}" r="10" fill="${c}" stroke="${W}" stroke-width="2"/>` + t(x, y + 4, String(n), { size: 11.5, w: 800, c: W });
    s += nb(Fk[0] + 62, Fk[1] - 18, 1, ORANGE) + nb(D1[0] + 22, D1[1] - 20, 2, RED) + nb(Fk[0] + 42, Fk[1] + 46, 3, TEAL) + nb(Fk[0] - 44, Fk[1] + 4, 4, BLUE);
    // the ant (top view, outlined), walking down the shaft
    const ax = E[0], ay = gy + 22;
    s += `<g stroke="${INK}" stroke-width="1.5" stroke-linecap="round" fill="none">` + [-4, 2, 8].map((d, k) => `<path d="M${ax - 3} ${ay + d} l-7 ${k - 2} l-3 4 M${ax + 3} ${ay + d} l7 ${k - 2} l3 4"/>`).join('') + `<path d="M${ax - 2} ${ay + 20} q-3 6 -7 7 M${ax + 2} ${ay + 20} q3 6 7 7"/></g>`;
    s += `<ellipse cx="${ax}" cy="${ay - 9}" rx="5.5" ry="8" fill="#5a3a24" ${O}/><ellipse cx="${ax}" cy="${ay + 3}" rx="3.6" ry="6" fill="#5a3a24" ${O}/><circle cx="${ax}" cy="${ay + 14}" r="5" fill="#5a3a24" ${O}/>`;
    s += '</g>' + frame(x0);
    s += t(x0 + PW2 / 2, 252, 'Go down one tunnel to its end (1, 2),', { size: 12.5, w: 800 }) + t(x0 + PW2 / 2, 269, 'then back up (3) and try another (4).', { size: 12.5, w: 800 });
    s += chips(x0, 'stack', TEAL, ['A', 'B', 'E'], true) + tl(x0 + 200, 305, '← top', { size: 12, w: 800, c: ORANGE });
  }
  return r1(s + '</svg>');
}

/** Graphs lesson Part 2 "Connected and disconnected graphs" (v2, map style): the road networks of Luzon and of Mindanao are two separate pieces (two components).
 *  Coastlines are rough outlines from longitude/latitude points; not to scale. */
export function islandRoads() {
  // same scale both ways (1 degree of longitude is about 1 degree of latitude here), so the islands keep their real shape
  const VW = 540, VH = 650;
  const X = (lon) => +((lon - 117.2) * 46).toFixed(1), Y = (lat) => +((19.25 - lat) * 46).toFixed(1);
  const P = (pts) => 'M' + pts.map(([lo, la]) => `${X(lo)} ${Y(la)}`).join(' L') + ' Z';
  const smooth = (pts) => { // closed Catmull-Rom curve through the points
    const q = pts.map(([lo, la]) => [X(lo), Y(la)]), n = q.length; let d = `M${q[0][0]} ${q[0][1]}`;
    for (let i = 0; i < n; i++) { const p0 = q[(i - 1 + n) % n], p1 = q[i], p2 = q[(i + 1) % n], p3 = q[(i + 2) % n];
      d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`; }
    return d + ' Z'; };
  const luzon = [[120.85, 18.6], [121.5, 18.45], [122.15, 18.55], [122.3, 17.9], [122.2, 17.1], [122.1, 16.5], [121.55, 15.9], [121.6, 15.0], [121.95, 14.35], [122.6, 14.2], [123.15, 13.85], [123.9, 13.85], [124.2, 13.05], [123.95, 12.6], [123.55, 12.95], [123.0, 13.5], [122.45, 13.45], [121.85, 13.9], [121.3, 13.65], [120.7, 13.8], [120.6, 14.35], [120.9, 14.6], [120.5, 14.75], [120.15, 14.85], [119.95, 15.7], [119.8, 16.35], [120.3, 16.25], [120.35, 17.1], [120.45, 17.9], [120.55, 18.3]];
  const mind = [[122.05, 6.9], [122.25, 7.9], [122.9, 8.4], [123.5, 8.65], [123.9, 8.35], [124.25, 8.2], [124.5, 8.6], [124.85, 8.95], [125.45, 9.0], [125.6, 9.75], [126.05, 9.2], [126.35, 8.3], [126.55, 7.3], [126.3, 6.75], [126.15, 6.5], [125.8, 7.2], [125.6, 7.0], [125.4, 6.7], [125.25, 5.85], [124.8, 5.95], [124.2, 6.45], [124.0, 7.2], [123.6, 7.6], [123.35, 7.45], [122.85, 7.45], [122.45, 7.0]];
  const others = [
    [[120.4, 13.5], [121.0, 13.55], [121.5, 13.0], [121.4, 12.3], [120.9, 12.4], [120.5, 12.9]], // Mindoro
    [[124.3, 12.55], [125.2, 12.6], [125.7, 12.2], [125.6, 11.1], [125.0, 11.2], [124.5, 11.7]], // Samar
    [[124.4, 11.4], [124.9, 11.3], [125.2, 10.4], [124.9, 10.0], [124.6, 10.6], [124.3, 11.0]], // Leyte
    [[122.0, 11.9], [122.9, 11.5], [123.1, 10.9], [122.5, 10.5], [121.95, 10.6]], // Panay
    [[122.6, 10.8], [123.3, 10.95], [123.5, 10.0], [123.2, 9.1], [122.9, 9.4], [122.5, 10.0]], // Negros
    [[123.8, 11.2], [124.05, 11.0], [123.95, 10.2], [123.4, 9.45], [123.35, 9.7], [123.7, 10.5]], // Cebu
    [[123.85, 10.05], [124.55, 10.15], [124.5, 9.6], [123.9, 9.6]], // Bohol
  ];
  let s = `<svg class="objbox gi-pic" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="A simple map of the Philippines, not to scale. On Luzon, roads join Tuguegarao, Baguio, Manila, Naga, and Legazpi. On Mindanao, roads join Zamboanga, Cagayan de Oro, Davao, Mati, and General Santos. The sea is between the two islands, and no road crosses it. The road network of Luzon is one component, and the road network of Mindanao is another component."><defs><clipPath id="irC"><rect x="1" y="1" width="${VW - 2}" height="${VH - 2}" rx="14"/></clipPath><pattern id="irWave" width="40" height="22" patternUnits="userSpaceOnUse"><path d="M4 12 q6 -4 12 0 q6 4 12 0" fill="none" stroke="#b3d6e8" stroke-width="1.2" stroke-linecap="round"/></pattern></defs><g clip-path="url(#irC)">`;
  // sea
  s += `<rect width="${VW}" height="${VH}" fill="#cde5f1"/><rect width="${VW}" height="${VH}" fill="url(#irWave)" opacity="0.7"/>`;
  // shallow water band, then land
  const land = (d, fill, line) => `<path d="${d}" fill="none" stroke="#e3f1f8" stroke-width="12" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#d6ebf5" stroke-width="6" stroke-linejoin="round"/><path d="${d}" fill="${fill}" stroke="${line}" stroke-width="1.5" stroke-linejoin="round"/>`;
  for (const o of others) s += `<path d="${smooth(o)}" fill="#e9ede3" stroke="#b3bbb8" stroke-width="1.2"/>`;
  const dL = smooth(luzon), dM = smooth(mind);
  const halo = (d, c) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="14" stroke-linejoin="round" opacity="0.28"/>`;
  s += halo(dL, BLUE) + halo(dM, TEAL) + `<path d="${dL}" fill="#d8e8c2" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/><path d="${dM}" fill="#d8e8c2" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
  // terrain: mountain ranges and forests
  const mtn = (lo, la, sc = 1) => { const x = X(lo), y = Y(la), w = 9 * sc, h = 9 * sc; return `<path d="M${x - w} ${y + h / 2} L${x} ${y - h} L${x + w} ${y + h / 2} Z" fill="#b99b72" stroke="#6e5638" stroke-width="1" stroke-linejoin="round"/><path d="M${x - w * 0.32} ${y - h * 0.36} L${x} ${y - h} L${x + w * 0.32} ${y - h * 0.36} L${x + w * 0.1} ${y - h * 0.5} L${x - w * 0.1} ${y - h * 0.4} Z" fill="${W}"/>`; };
  const tree = (lo, la) => { const x = X(lo), y = Y(la); return `<rect x="${x - 1}" y="${y + 2}" width="2" height="4" fill="#6e5638"/><circle cx="${x}" cy="${y}" r="4" fill="#7fb36a" stroke="#4f7d3d" stroke-width="0.9"/>`; };
  s += [[121.0, 17.5, 1.1], [121.3, 16.9, 0.9], [124.6, 7.7, 1.1], [125.0, 8.05, 0.9]].map(([a, b, c]) => mtn(a, b, c)).join('');
  // roads (curvy) and towns
  const T = { Tug: [121.73, 17.61], Bag: [120.6, 16.41], Man: [120.98, 14.6], Nag: [123.18, 13.62], Leg: [123.74, 13.14], Zam: [122.08, 6.92], Cdo: [124.65, 8.48], Dav: [125.61, 7.07], Mat: [126.22, 6.95], Gen: [125.17, 6.11] };
  const pt = (k) => [X(T[k][0]), Y(T[k][1])];
  const road = (a, b, bend = 0) => { const [x1, y1] = pt(a), [x2, y2] = pt(b), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const d = `M${x1} ${y1} Q${(mx - dy / L * bend).toFixed(1)} ${(my + dx / L * bend).toFixed(1)} ${x2} ${y2}`;
    return `<path d="${d}" fill="none" stroke="#5b4636" stroke-width="5.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f5c96b" stroke-width="3.2" stroke-linecap="round"/>`; };
  s += road('Bag', 'Man', -8) + road('Man', 'Leg', 16);
  s += road('Zam', 'Cdo', 16) + road('Cdo', 'Dav', -10) + road('Dav', 'Mat', 6);
  const lab = (x, y, txt, a = 'start') => `<text x="${x}" y="${y}" text-anchor="${a}" ${F} font-size="12" font-weight="800" fill="${INK}" stroke="${W}" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke">${txt}</text>`;
  const pin = (k, name, a, dx, dy) => { const [x, y] = pt(k); return `<path d="M${x} ${y} C${x - 3} ${y - 6} ${x - 8} ${y - 9} ${x - 8} ${y - 15} A8 8 0 1 1 ${x + 8} ${y - 15} C${x + 8} ${y - 9} ${x + 3} ${y - 6} ${x} ${y} Z" fill="${ORANGE}" stroke="${INK}" stroke-width="1.3"/><circle cx="${x}" cy="${y - 15}" r="3" fill="${W}"/>` + lab(x + dx, y + dy, name, a); };
  s += pin('Bag', 'Baguio', 'end', -11, -12) + pin('Man', 'Manila', 'end', -11, -10) + pin('Leg', 'Legazpi', 'start', 11, -8);
  s += pin('Zam', 'Zamboanga', 'start', -6, 16) + pin('Cdo', 'Cagayan de Oro', 'middle', 0, -26) + pin('Dav', 'Davao', 'middle', 0, 16) + pin('Mat', 'Mati', 'start', 11, -8);
  // island names
  const big = (x, y, txt) => `<text x="${x}" y="${y}" text-anchor="middle" ${F} font-size="13" font-weight="800" letter-spacing="2" fill="#4f6b3f" stroke="${W}" stroke-width="3" paint-order="stroke">${txt}</text>`;
  s += big(X(118.7), Y(15.2), 'LUZON') + big(X(122.9), Y(6.0), 'MINDANAO');
  s += t(X(120.9), Y(10.6), 'other islands', { size: 11, w: 700, c: '#8d9593' });
  // components
  s += pill(X(125.3), Y(16.3), 'component 1', '', BLUE) + `<line x1="${X(125.3) - 58}" y1="${Y(16.3)}" x2="${X(122.4)}" y2="${Y(16.6)}" stroke="${BLUE}" stroke-width="2" stroke-linecap="round"/>`;
  s += pill(X(119.3), Y(7.6), 'component 2', '', TEAL) + `<line x1="${X(119.3) + 58}" y1="${Y(7.6)}" x2="${X(122.1)}" y2="${Y(7.6)}" stroke="${TEAL}" stroke-width="2" stroke-linecap="round"/>`;
  // no road across the sea: a dashed gap over open sea, east of the other islands
  s += `<path d="M${X(124.15)} ${Y(13.0)} Q${X(127.6)} ${Y(11.9)} ${X(126.0)} ${Y(9.55)}" fill="none" stroke="${RED}" stroke-width="2.4" stroke-dasharray="5 5"/>`;
  const xx = X(126.55), xy = Y(11.9);
  s += `<path d="M${xx - 7} ${xy - 7} l14 14 M${xx + 7} ${xy - 7} l-14 14" stroke="${RED}" stroke-width="3.4" stroke-linecap="round"/>` + pill(xx - 4, xy + 40, 'no road crosses', 'the sea', RED);
  // compass
  { const cx = VW - 40, cy = 50; s += `<circle cx="${cx}" cy="${cy}" r="20" fill="${W}" stroke="${INK}" stroke-width="1.3"/><path d="M${cx} ${cy - 16} L${cx + 5} ${cy} L${cx} ${cy + 16} L${cx - 5} ${cy} Z" fill="#d7dcdb" stroke="${INK}" stroke-width="1"/><path d="M${cx} ${cy - 16} L${cx + 5} ${cy} L${cx - 5} ${cy} Z" fill="${RED}"/>` + t(cx, cy - 25, 'N', { size: 11, w: 800 }); }
  s += t(VW - 40, VH - 14, 'not to scale', { size: 11, w: 700, c: SOFT });
  return r1(s + '</g></svg>');
}
