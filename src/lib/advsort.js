// Advanced sorting (merge, quick, heap) + the recursion tool they need: picture builders, step builders,
// CodeWalks, and work counters. Shared by the lesson's steppers and walkthroughs and the AdvSortLab
// (runs in the browser too, so plain SVG only, no Rough.js).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.mono ? '&quot;IBM Plex Mono&quot;, monospace' : 'Nunito, system-ui, sans-serif'}" font-size="${o.size ?? 13}" font-weight="${o.w ?? 800}" fill="${o.fill ?? '#1b2a2e'}" text-anchor="${o.anchor ?? 'middle'}">${esc(t)}</text>`;
const c = (s) => `<code>${s}</code>`;
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
export const SCORES = [29, 10, 14, 37, 13];
const INK = '#1b2a2e', SOFT = '#37474a', GREEN = '#1f5a38', RED = '#b23a33', TEALD = '#0b544e', ORANGE = '#e8662e';
// fill, stroke, text color, extra attributes
const KIND = {
  '': ['#ffffff', INK, INK, ''],
  cmp: ['#e8662e', '#b4461a', '#ffffff', ''],
  swap: ['#fbdccc', '#e8662e', INK, ''],
  pivot: ['#f8dc95', '#a87412', INK, ''],
  done: ['#dff0e3', '#2e7d4f', INK, ''],
  L: ['#d7ece9', '#0e6b63', INK, ''],      // left half / smaller part
  R: ['#dde8f7', '#2f6fa8', INK, ''],      // right half / bigger part
  used: ['#f4f5f3', '#b8c2c3', '#9aa8aa', ''],
  dim: ['#f4f5f3', '#c9d1d2', '#9aa8aa', ''],
  gap: ['#ffffff', '#9aa8aa', '#9aa8aa', ' stroke-dasharray="5 4"'],
  bad: ['#f6d6d0', RED, INK, ''],
};
const cellAt = (x, y, v, k = '', w = 48, h = 40, size) => {
  const [f, s, t, d] = KIND[k] || KIND[''];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="${s}" stroke-width="2"${d}/>` + (v == null || v === '' ? '' : T(x + w / 2, y + h / 2 + 6, v, { mono: true, size: size ?? (w < 34 ? 13 : 16), w: 700, fill: t }));
};
const arrowDown = (x, y, fill = ORANGE) => `<path d="M${x} ${y} l-6 9 h12 Z" fill="${fill}"/>`;
const counters = (o, y = 18) => o.comps == null ? '' : T(332, y, `comparisons: ${o.comps}`, { mono: true, size: 12.5, w: 700, fill: TEALD, anchor: 'end' }) + (o.moves == null ? '' : T(332, y + 17, `${o.moveWord ?? 'swaps'}: ${o.moves}`, { mono: true, size: 12.5, w: 700, fill: TEALD, anchor: 'end' }));
const chip = (o) => o.chip ? `<rect x="8" y="6" width="${o.chipW ?? 150}" height="26" rx="6" fill="#fbdccc" stroke="#e8662e" stroke-width="1.8"/>` + T(8 + (o.chipW ?? 150) / 2, 24, o.chip, { mono: true, size: 12.5, w: 700 }) : '';
const svg = (h, body, alt, cls = 'objbox sort-pic adv-pic') => `<svg class="${cls}" viewBox="0 0 340 ${h}" role="img" aria-label="${esc(alt)}">${body}</svg>`;
const geom = (n) => { const w = Math.min(56, Math.floor(324 / n)); return { w, x0: (340 - n * w) / 2 }; };

/* =====================================================================
   Recursion tool: printHalves(n) prints n, then calls itself with n / 2, until n is 0.
   ===================================================================== */
export const halvesCode = String.raw`static void printHalves(int n) {
  if (n == 0) {
    return;                    // base case: stop
  }
  System.out.print(n + " ");
  printHalves(n / 2);          // recursive case: a smaller job
}`;

/** Call-stack picture: frames (newest on top), each { label, state: run|wait|back|done }, plus printed output. */
export function stackPic(frames, out = '', o = {}) {
  const FR = { run: ['#e8662e', '#b4461a', '#ffffff', 'running'], wait: ['#f8dc95', '#a87412', INK, 'waiting'], back: ['#d7ece9', '#0e6b63', INK, 'returning'], bad: ['#f6d6d0', RED, INK, 'running'] };
  const top = 42, rowH = 30, maxRows = o.rows ?? 7, h = o.h ?? (top + maxRows * rowH + 64);
  let b = T(110, 24, 'Call stack', { size: 14 }) + T(110, 38, '(newest call on top)', { size: 11, w: 700, fill: SOFT });
  const list = [...frames].reverse();
  list.forEach((f, k) => {
    const [fill, st, tx, word] = FR[f.state] || FR.run, y = top + 8 + k * rowH;
    b += `<rect x="16" y="${y}" width="188" height="${rowH - 5}" rx="5" fill="${fill}" stroke="${st}" stroke-width="2"/>` + T(110, y + 17, f.label, { mono: true, size: 12.5, w: 700, fill: tx });
    b += T(212, y + 17, word, { size: 11, w: 800, fill: st, anchor: 'start' });
  });
  if (o.more) b += T(16, top + 8 + list.length * rowH + 14, o.more, { size: 12, w: 800, fill: RED, anchor: 'start' });
  if (!frames.length) b += T(110, top + 40, '(empty: every call has finished)', { size: 12, w: 700, fill: SOFT });
  b += `<rect x="16" y="${h - 50}" width="308" height="38" rx="6" fill="#1b2a2e"/>` + T(26, h - 26, 'Output: ' + out, { mono: true, size: 13, w: 600, fill: '#f8dc95', anchor: 'start' });
  return svg(h, b, o.alt || ('Call stack: ' + frames.map((f) => f.label).join(', ') + '. Output: ' + out), 'objbox adv-pic stack-pic');
}

export function halvesSteps() {
  const s = [], frames = [];
  let out = '';
  const pic = (more, alt) => stackPic(frames.map((f) => ({ ...f })), out, { rows: 6, more, alt });
  const ns = [20, 10, 5, 2, 1, 0];
  s.push({ lines: [1], pic: pic(), say: `${c('main')} calls ${c('printHalves(20)')}. Java starts a new <b>call</b> of the method with its own ${c('n')}, and puts it on the <b>call stack</b>.` });
  ns.forEach((n, k) => {
    frames.forEach((f) => { f.state = 'wait'; });
    frames.push({ label: `printHalves(${n})`, state: 'run' });
    if (n === 0) {
      s.push({ lines: [2, 3], vars: [['n', '= 0']], pic: pic(), say: `In this newest call, ${c('n')} is 0. ${c('n == 0')} is true: this is the <b>base case</b>. The method returns at once, without calling itself again.` });
      return;
    }
    s.push({ lines: [2], vars: [['n', `= ${n}`]], pic: pic(), say: `${k ? 'The new' : 'This'} call has ${c(`n = ${n}`)}. Is ${c(`${n} == 0`)}? No, so it does not stop yet.` });
    out += n + ' ';
    const half = Math.floor(n / 2);
    s.push({ lines: [5, 6], vars: [['n', `= ${n}`], ['n / 2', `= ${half}`]], pic: pic(), say: `It prints ${n}, then calls ${c(`printHalves(${half})`)}${n % 2 ? ` (${n} / 2 is ${half}: Java drops the .5 when dividing two ${c('int')}s)` : ''}. This call now <b>waits</b> (gold) until the new call is done.` });
  });
  frames.pop(); frames[frames.length - 1].state = 'back';
  s.push({ lines: [6, 7], pic: pic(), say: `${c('printHalves(0)')} is finished and leaves the stack. Java goes back to the call below it, ${c('printHalves(1)')}, right after the line that made the call. That was its last line, so this call ends too.` });
  frames.splice(1); frames[0].state = 'back';
  s.push({ lines: [7], pic: pic(), say: `The same happens to ${c('printHalves(2)')}, ${c('printHalves(5)')}, and ${c('printHalves(10)')}: each one picks up after its call, has nothing left to do, and leaves. Only the first call, ${c('printHalves(20)')}, is left.` });
  frames.pop();
  s.push({ lines: [7], pic: pic(), say: `${c('printHalves(20)')} ends, so the stack is empty and Java returns to ${c('main')}. Output: <b>20 10 5 2 1</b>. Six calls, one after another, each with a smaller job.` });
  // collapse: keep the unwinding short (one step per finishing call is enough)
  return s;
}

/** Missing base case: the stack grows until Java gives up. */
export function noBasePic() {
  const frames = [{ label: 'printHalves(20)', state: 'wait' }, { label: 'printHalves(10)', state: 'wait' }, { label: 'printHalves(5)', state: 'wait' }, { label: 'printHalves(2)', state: 'wait' }, { label: 'printHalves(1)', state: 'wait' }, { label: 'printHalves(0)', state: 'wait' }, { label: 'printHalves(0)', state: 'bad' }];
  return stackPic(frames, '20 10 5 2 1 0 0 0 0 …', { rows: 7, more: '… thousands more, until StackOverflowError', h: 340, alt: 'Without a base case, printHalves(0) keeps calling printHalves(0). The call stack grows: printHalves 20, 10, 5, 2, 1, then 0 again and again, thousands of calls, until Java stops the program with a StackOverflowError. The output keeps printing 0.' });
}

/* =====================================================================
   MERGE SORT
   ===================================================================== */

/** Merge picture: arr on top (current range lit, left half teal, right half blue, used cells faded),
 * temp underneath, pointers i / j under arr and k under temp. */
export function mergePic(st) {
  const n = st.vals.length, w = Math.min(50, Math.floor(270 / n)), x0 = (340 - n * w) / 2, y = 60, cx = (i) => x0 + i * w + w / 2;
  let b = chip(st) + counters(st);
  st.vals.forEach((v, i) => {
    let k = (st.kinds || {})[i];
    if (!k) k = st.range && (i < st.range[0] || i > st.range[1]) ? 'dim' : '';
    b += cellAt(x0 + i * w, y, v, k, w, 40);
    b += T(cx(i), y + 56, i, { mono: true, size: 11, w: 600, fill: SOFT });
  });
  b += T(x0 - 6, y + 25, 'arr', { mono: true, size: 12, w: 700, fill: SOFT, anchor: 'end' });
  if (st.halves) {
    const [lo, mid, hi] = st.halves, yb = y - 8;
    const br = (a, z, col, label) => `<path d="M${x0 + a * w + 3} ${yb + 5} V${yb} H${x0 + (z + 1) * w - 3} V${yb + 5}" fill="none" stroke="${col}" stroke-width="2.4"/>` + T((x0 + a * w + x0 + (z + 1) * w) / 2, yb - 5, label, { size: 11.5, w: 800, fill: col });
    // A one-box half is too narrow for "left half" / "right half" (the labels collided on 8 values): use the short word.
    const fit = (cells, long, short) => (cells * w >= long.length * 6.4 + 6 ? long : short);
    b += br(lo, mid, '#0e6b63', fit(mid - lo + 1, 'left half', 'left'));
    if (hi > mid) b += br(mid + 1, hi, '#2f6fa8', fit(hi - mid, 'right half', 'right'));
  }
  const at = {};
  for (const [nm, i] of Object.entries(st.ptr || {})) if (i != null) (at[i] = at[i] || []).push(nm);
  for (const [i, nms] of Object.entries(at)) {
    const ok = +i < n, px = ok ? cx(+i) : x0 + n * w + 14;
    b += arrowDown(px, y + 62, ok ? ORANGE : '#9aa8aa') + T(px, y + 84, nms.join(' '), { mono: true, size: 12, w: 700, fill: ok ? '#b4461a' : SOFT });
    if (!ok) b += T(px, y + 98, '(past the end)', { size: 10.5, w: 700, fill: SOFT });
  }
  if (st.temp) {
    const m = st.temp.length, ty = 170, tx0 = x0 + st.range[0] * w;
    b += T(tx0 - 6, ty + 25, 'temp', { mono: true, size: 12, w: 700, fill: SOFT, anchor: 'end' });
    st.temp.forEach((v, k) => {
      b += cellAt(tx0 + k * w, ty, v, v == null ? 'gap' : (st.tempNew === k ? 'swap' : 'done'), w, 40);
      b += T(tx0 + k * w + w / 2, ty + 54, k, { mono: true, size: 10.5, w: 600, fill: SOFT });
    });
    if (st.k != null && st.k < m) b += arrowDown(tx0 + st.k * w + w / 2, ty + 58, '#0e6b63') + T(tx0 + st.k * w + w / 2, ty + 80, 'k', { mono: true, size: 12, w: 700, fill: '#0e6b63' });
  }
  if (st.note) b += T(170, 262, st.note, { size: 12.5, w: 800, fill: st.noteFill || SOFT });
  return svg(272, b, st.alt || plain(st.say || ''));
}

/** Merge sort steps for the lab and by hand: split steps, one step per comparison, leftovers, copy back. */
export function mergeSteps(input) {
  const a = [...input], n = a.length, s = [];
  let comps = 0;
  const push = (o) => s.push({ vals: [...a], comps, ...o });
  push({ range: [0, n - 1], say: `Merge sort on ${a.join(', ')}. It <b>splits</b> the array in half again and again until each part has one value, then <b>merges</b> the sorted parts back together.` });
  const rec = (lo, hi) => {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    const part = (x, z) => a.slice(x, z + 1).join(', ');
    const ones = [lo === mid ? a[lo] : null, mid + 1 === hi ? a[hi] : null].filter((v) => v != null);
    push({ range: [lo, hi], halves: [lo, mid, hi], chip: `split ${lo}..${hi}`, say: `Split <b>${part(lo, hi)}</b> (index ${lo} to ${hi}). mid = (${lo} + ${hi}) / 2 = ${mid}, so the left half is <b>${part(lo, mid)}</b> and the right half is <b>${part(mid + 1, hi)}</b>.` + (ones.length ? ` ${ones.length === 2 ? `${ones[0]} and ${ones[1]} are` : `${ones[0]} is`} a single value: already sorted.` : '') });
    rec(lo, mid); rec(mid + 1, hi);
    // merge lo..mid with mid+1..hi
    const temp = new Array(hi - lo + 1).fill(null), kinds = () => { const r = {}; for (let x = lo; x <= hi; x++) r[x] = x <= mid ? 'L' : 'R'; return r; };
    let i = lo, j = mid + 1, k = 0;
    const used = new Set();
    const K = () => { const r = kinds(); used.forEach((x) => { r[x] = 'used'; }); return r; };
    push({ range: [lo, hi], halves: [lo, mid, hi], kinds: K(), temp: [...temp], k, ptr: { i, j }, chip: `merge ${lo}..${hi}`, say: `Now <b>merge</b> the two sorted halves, ${part(lo, mid)} and ${part(mid + 1, hi)}, into a new array ${c('temp')}. ${c('i')} points at the front of the left half, ${c('j')} at the front of the right half.` });
    while (i <= mid && j <= hi) {
      comps++;
      const L = a[i], R = a[j], takeL = L <= R;
      temp[k] = takeL ? L : R;
      const kk = K(); kk[i] = 'cmp'; kk[j] = 'cmp';
      used.add(takeL ? i : j);
      push({ range: [lo, hi], halves: [lo, mid, hi], kinds: kk, temp: [...temp], tempNew: k, k: k + 1, ptr: { i, j }, chip: `merge ${lo}..${hi}`, say: `Compare the two fronts: ${L} and ${R}. ${takeL ? `${L} &lt;= ${R}` : `${R} &lt; ${L}`}, so <b>${takeL ? L : R}</b> goes into ${c(`temp[${k}]`)}${takeL && L === R ? ' (on a tie, the LEFT one goes first)' : ''}, and ${c(takeL ? 'i' : 'j')} moves to the next value.` });
      if (takeL) i++; else j++;
      k++;
    }
    if (i <= mid || j <= hi) {
      const from = i <= mid ? [i, mid] : [j, hi], vals = a.slice(from[0], from[1] + 1);
      for (let x = from[0]; x <= from[1]; x++) { temp[k++] = a[x]; used.add(x); }
      push({ range: [lo, hi], halves: [lo, mid, hi], kinds: K(), temp: [...temp], k, ptr: i <= mid ? { i: mid + 1, j } : { i, j: hi + 1 }, chip: `merge ${lo}..${hi}`, say: `The ${i <= mid ? 'right' : 'left'} half is used up. The <b>leftovers</b> from the ${i <= mid ? 'left' : 'right'} half (${vals.join(', ')}) are already sorted, so they are copied to the end of ${c('temp')} with no more comparisons.` });
    }
    for (let x = 0; x < temp.length; x++) a[lo + x] = temp[x];
    const kd = {}; for (let x = lo; x <= hi; x++) kd[x] = 'done';
    push({ range: [lo, hi], kinds: kd, chip: `merge ${lo}..${hi}`, say: `Copy ${c('temp')} back into ${c('arr')}, index ${lo} to ${hi}: <b>${part(lo, hi)}</b> is now sorted.` });
  };
  rec(0, n - 1);
  const kd = {}; for (let x = 0; x < n; x++) kd[x] = 'done';
  push({ range: [0, n - 1], kinds: kd, note: 'sorted!', noteFill: GREEN, say: `The whole array is sorted: ${a.join(', ')}. Total: <b>${comps} comparisons</b>.` });
  return s;
}

/** By hand: merging two sorted piles, one comparison per step (no split steps). */
export function mergeOneSteps(left = [10, 14, 29], right = [13, 37]) {
  const all = [...left, ...right], s = mergeSteps(all).filter((st) => st.chip === `merge 0..${all.length - 1}`);
  const c0 = s[0].comps; // inner merges of already-sorted halves came first: count only this merge
  return s.map((st) => { const x = { ...st, comps: st.comps - c0, chip: 'merge two piles', say: st.say.replace('Copy <code>temp</code> back into <code>arr</code>, index 0 to ' + (all.length - 1) + ':', 'Copy <code>temp</code> back:') }; return { pic: mergePic(x), say: x.say }; });
}

/** The split-down / merge-up picture of merge sort (the paper method), revealing rows up to `upto`. */
export function mergeTreePic(input = SCORES, upto = 99, o = {}) {
  const n = input.length;
  const nodes = [];
  const build = (lo, hi, d) => { const nd = { lo, hi, d, leaf: lo >= hi }; nodes.push(nd); if (lo < hi) { const mid = Math.floor((lo + hi) / 2); nd.kids = [build(lo, mid, d + 1), build(mid + 1, hi, d + 1)]; } return nd; };
  build(0, n - 1, 0);
  const D = Math.max(...nodes.map((x) => x.d));
  const rowOf = (L) => nodes.filter((x) => x.d === L || (x.leaf && x.d < L));
  const rows = [];
  for (let L = 0; L <= D; L++) rows.push({ kind: 'split', L, groups: rowOf(L) });
  for (let L = D - 1; L >= 0; L--) rows.push({ kind: 'merge', L, groups: rowOf(L) });
  const cw = o.cw ?? 30, gap = o.gap ?? 10;
  // x of index i: cells shifted right by extra space at every split boundary of the deepest row
  const bounds = new Set(); nodes.forEach((x) => { if (x.kids) bounds.add(x.kids[1].lo); });
  const gx = (i) => { let extra = 0; bounds.forEach((bd) => { if (i >= bd) extra += gap; }); return i * cw + extra; };
  const total = gx(n - 1) + cw, x0 = (340 - total) / 2 + 26;
  const rowH = o.rowH ?? 58, top = 34;
  let b = '';
  rows.forEach((r, ri) => {
    if (ri > upto) return;
    const y = top + ri * rowH, lit = ri === upto && upto < rows.length;
    const label = r.kind === 'split' ? (r.L === 0 ? 'start' : 'split') : 'merge';
    b += T(8, y + 21, label, { size: 11.5, w: 800, fill: r.kind === 'split' ? '#b4461a' : '#0e6b63', anchor: 'start' });
    r.groups.forEach((g) => {
      const vals = r.kind === 'merge' && !g.leaf ? input.slice(g.lo, g.hi + 1).sort((p, q) => p - q) : input.slice(g.lo, g.hi + 1);
      const carried = g.leaf && g.d < r.L && r.kind === 'split' || (r.kind === 'merge' && g.leaf && g.d < r.L);
      const gx0 = x0 + gx(g.lo);
      vals.forEach((v, k) => { b += cellAt(gx0 + k * cw, y, v, carried ? 'dim' : (r.kind === 'merge' ? 'done' : (lit ? 'swap' : '')), cw, 30, 13); });
      // connector to the previous row
      if (ri > 0 && ri <= upto && !carried) {
        const py = y - rowH + 30, cy = y, mx = gx0 + (vals.length * cw) / 2;
        if (r.kind === 'split') { const par = nodes.find((p) => p.kids && p.kids.includes(g)); if (par) { const pmx = x0 + gx(par.lo) + ((par.hi - par.lo + 1) * cw) / 2; b += `<path d="M${pmx} ${py + 2} L${mx} ${cy - 2}" stroke="#b4461a" stroke-width="1.6" fill="none"/>`; } }
        else if (g.leaf) b += `<path d="M${mx} ${py + 2} L${mx} ${cy - 2}" stroke="#0e6b63" stroke-width="1.6" fill="none"/>`;
        else if (g.kids) g.kids.forEach((kd) => { const kmx = x0 + gx(kd.lo) + ((kd.hi - kd.lo + 1) * cw) / 2; b += `<path d="M${kmx} ${py + 2} L${mx} ${cy - 2}" stroke="#0e6b63" stroke-width="1.6" fill="none"/>`; });
      }
    });
  });
  const h = top + rows.length * rowH - 10;
  b = T(170, 20, o.title ?? 'Merge sort on paper: split down, then merge up', { size: 13.5 }) + b;
  return svg(h, b, o.alt || `Merge sort on ${input.join(', ')}: split rows going down until every part has one value, then merge rows going up, each merge putting two sorted parts together.`, 'objbox adv-pic mtree-pic');
}
const depthOf = (lo, hi) => (lo >= hi ? 0 : 1 + Math.max(depthOf(lo, Math.floor((lo + hi) / 2)), depthOf(Math.floor((lo + hi) / 2) + 1, hi)));
export const mergeTreeRows = (input = SCORES) => 2 * depthOf(0, input.length - 1) + 1;

export function mergeTreeSteps(input = SCORES) {
  const R = mergeTreeRows(input), s = [];
  const D = (R + 1) / 2 - 1;
  const says = [`Start with the whole array: ${input.join(', ')}.`];
  for (let r = 1; r <= D; r++) says.push(r === 1 ? 'Split it in half. With 5 values, the left half gets the extra one (mid = (0 + 4) / 2 = 2, so index 0 to 2 go left).' : (r === D ? 'Split again. Now every part has <b>one value</b>, and one value is always sorted. Splitting stops. (Gray parts were already single values and just come down.)' : 'Split each part in half again. A part with one value cannot be split, so it stays as it is (gray).'));
  for (let r = D + 1; r < R; r++) says.push(r === R - 1 ? 'The last merge puts the two sorted halves together. The whole array is sorted: <b>' + [...input].sort((p, q) => p - q).join(', ') + '</b>.' : (r === D + 1 ? 'Now go back up. <b>Merge</b> neighbors that were split apart: take the smaller front value each time. 29 and 10 become 10, 29.' : 'Merge again, one level up. Each merge joins two sorted parts into one sorted part.'));
  for (let r = 0; r < R; r++) s.push({ pic: mergeTreePic(input, r, { alt: plain(says[r]) }), say: says[r] });
  return s;
}

export const mergeSortCode = String.raw`static void mergeSort(int[] arr, int low, int high) {
  if (low >= high) {
    return;                          // base case: 0 or 1 value
  }
  int mid = (low + high) / 2;
  mergeSort(arr, low, mid);          // sort the left half
  mergeSort(arr, mid + 1, high);     // sort the right half
  merge(arr, low, mid, high);        // merge the two sorted halves
}`;

export const mergeCode = String.raw`static void merge(int[] arr, int low, int mid, int high) {
  int[] temp = new int[high - low + 1];
  int i = low;                       // next value in the left half
  int j = mid + 1;                   // next value in the right half
  int k = 0;                         // next empty slot in temp
  while (i <= mid && j <= high) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i];
      i++;
    } else {
      temp[k] = arr[j];
      j++;
    }
    k++;
  }
  while (i <= mid) {                 // leftovers from the left half
    temp[k] = arr[i];
    i++;
    k++;
  }
  while (j <= high) {                // leftovers from the right half
    temp[k] = arr[j];
    j++;
    k++;
  }
  for (k = 0; k < temp.length; k++) {
    arr[low + k] = temp[k];          // copy back into arr
  }
}`;

/** Picture for the mergeSort CodeWalk: the array (range lit) beside a small call stack. */
function msPic(vals, range, frames, kinds = {}, note) {
  const n = vals.length, w = 50, x0 = (340 - n * w) / 2, y = 34;
  let b = '';
  vals.forEach((v, i) => { b += cellAt(x0 + i * w, y, v, kinds[i] || (range && (i < range[0] || i > range[1]) ? 'dim' : 'swap'), w, 38) + T(x0 + i * w + w / 2, y + 54, i, { mono: true, size: 11, w: 600, fill: SOFT }); });
  b += T(x0 - 6, y + 24, 'arr', { mono: true, size: 12, w: 700, fill: SOFT, anchor: 'end' });
  b += T(170, 112, 'Call stack (newest on top)', { size: 12.5 });
  const FR = { run: ['#e8662e', '#b4461a', '#ffffff', 'running'], wait: ['#f8dc95', '#a87412', INK, 'waiting'], back: ['#d7ece9', '#0e6b63', INK, 'back here'] };
  [...frames].reverse().forEach((f, k) => {
    const [fill, st, tx, word] = FR[f.state], yy = 122 + k * 30;
    b += `<rect x="46" y="${yy}" width="196" height="25" rx="5" fill="${fill}" stroke="${st}" stroke-width="2"/>` + T(144, yy + 17, f.label, { mono: true, size: 12, w: 700, fill: tx }) + T(250, yy + 17, word, { size: 11, w: 800, fill: st, anchor: 'start' });
  });
  if (note) b += T(170, 236, note, { size: 12.5, w: 800, fill: GREEN });
  return svg(246, b, 'Array ' + vals.join(', ') + '. Call stack: ' + frames.map((f) => f.label).join(', '));
}

/** CodeWalk: mergeSort on 29, 10, 14 (3 values), to see the recursion. */
export function mergeSortWalk() {
  const s = [];
  const F = (...xs) => xs.map(([label, state]) => ({ label, state }));
  s.push({ lines: [1], pic: msPic([29, 10, 14], [0, 2], F(['mergeSort(0, 2)', 'run'])), vars: [['low', '= 0'], ['high', '= 2']], say: `To see the recursion, take a short array: 29, 10, 14. ${c('main')} calls ${c('mergeSort(arr, 0, 2)')}: sort index 0 to 2, the whole array.` });
  s.push({ lines: [2, 5], pic: msPic([29, 10, 14], [0, 2], F(['mergeSort(0, 2)', 'run'])), vars: [['mid', '= 1']], say: `Is ${c('0 >= 2')}? No: 3 values, so not the base case. ${c('mid = (0 + 2) / 2 = 1')}. The left half is index 0 to 1 (29, 10); the right half is index 2 (14).` });
  s.push({ lines: [6], pic: msPic([29, 10, 14], [0, 1], F(['mergeSort(0, 2)', 'wait'], ['mergeSort(0, 1)', 'run'])), vars: [['low', '= 0'], ['high', '= 1']], say: `Line 6 calls ${c('mergeSort(arr, 0, 1)')} to sort the left half. The first call <b>waits</b> on line 6 while the new call runs.` });
  s.push({ lines: [2, 5, 6], pic: msPic([29, 10, 14], [0, 0], F(['mergeSort(0, 2)', 'wait'], ['mergeSort(0, 1)', 'wait'], ['mergeSort(0, 0)', 'run'])), vars: [['mid', '= 0']], say: `In ${c('mergeSort(0, 1)')}: not the base case, ${c('mid = 0')}. It calls ${c('mergeSort(arr, 0, 0)')}, the part with only 29.` });
  s.push({ lines: [2, 3], pic: msPic([29, 10, 14], [0, 0], F(['mergeSort(0, 2)', 'wait'], ['mergeSort(0, 1)', 'wait'], ['mergeSort(0, 0)', 'run'])), vars: [['low', '= 0'], ['high', '= 0']], say: `${c('0 >= 0')} is true: one value, the <b>base case</b>. One value is already sorted, so this call returns right away.` });
  s.push({ lines: [7], pic: msPic([29, 10, 14], [1, 1], F(['mergeSort(0, 2)', 'wait'], ['mergeSort(0, 1)', 'wait'], ['mergeSort(1, 1)', 'run'])), vars: [['low', '= 1'], ['high', '= 1']], say: `Back in ${c('mergeSort(0, 1)')}, line 7 calls ${c('mergeSort(arr, 1, 1)')}: only 10. Base case again, it returns at once.` });
  s.push({ lines: [8], pic: msPic([10, 29, 14], [0, 1], F(['mergeSort(0, 2)', 'wait'], ['mergeSort(0, 1)', 'back']), { 0: 'done', 1: 'done' }), say: `Both halves of index 0 to 1 are "sorted" (one value each). Line 8 merges them: 10 is smaller, so it goes first. ${c('arr')} is now <b>10, 29</b>, 14. ${c('mergeSort(0, 1)')} is finished.` });
  s.push({ lines: [7], pic: msPic([10, 29, 14], [2, 2], F(['mergeSort(0, 2)', 'wait'], ['mergeSort(2, 2)', 'run']), { 0: 'done', 1: 'done' }), vars: [['low', '= 2'], ['high', '= 2']], say: `Back in the first call, at line 7: ${c('mergeSort(arr, 2, 2)')} sorts the right half, only 14. Base case: it returns at once.` });
  s.push({ lines: [8, 9], pic: msPic([10, 14, 29], [0, 2], F(['mergeSort(0, 2)', 'back']), { 0: 'done', 1: 'done', 2: 'done' }, 'sorted: 10, 14, 29'), say: `Line 8 merges 10, 29 with 14: 10 first, then 14 (smaller than 29), then 29. The array is <b>10, 14, 29</b>. The first call ends and Java returns to ${c('main')}. Each call did a smaller copy of the same job: that is <b>recursion</b>.` });
  return s;
}

/** CodeWalk: merge() on the final merge of the five scores: 10 14 29 | 13 37. */
export function mergeWalk() {
  const a = [10, 14, 29, 13, 37], lo = 0, mid = 2, hi = 4, s = [];
  const temp = [null, null, null, null, null], used = new Set();
  const P = (o = {}) => { const kk = {}; for (let x = lo; x <= hi; x++) kk[x] = x <= mid ? 'L' : 'R'; used.forEach((x) => { kk[x] = 'used'; }); Object.assign(kk, o.kinds || {}); return mergePic({ vals: a, range: [lo, hi], halves: [lo, mid, hi], temp: [...temp], ...o, kinds: kk, alt: o.alt || ('arr ' + a.join(', ') + '; temp ' + temp.map((v) => v ?? '_').join(', ')) }); };
  s.push({ lines: [1], pic: P({ comps: 0 }), vars: [['low', '= 0'], ['mid', '= 2'], ['high', '= 4']], say: `This is the last merge of the five scores. The left half (index 0 to 2) is already sorted: 10, 14, 29. So is the right half (index 3 to 4): 13, 37. ${c('merge')} must join them.` });
  s.push({ lines: [2], pic: P({ comps: 0, k: 0 }), vars: [['temp.length', '= 5']], say: `${c('new int[high - low + 1]')} makes an empty helper array ${c('temp')} with 4 - 0 + 1 = 5 slots, one for each value being merged.` });
  s.push({ lines: [3, 4, 5], pic: P({ comps: 0, k: 0, ptr: { i: 0, j: 3 } }), vars: [['i', '= 0'], ['j', '= 3'], ['k', '= 0']], say: `Three positions: ${c('i')} = 0 is the front of the left half, ${c('j')} = 3 is the front of the right half, and ${c('k')} = 0 is the next empty slot in ${c('temp')}.` });
  let i = 0, j = 3, k = 0, comps = 0;
  while (i <= mid && j <= hi) {
    comps++;
    const L = a[i], R = a[j], takeL = L <= R;
    temp[k] = takeL ? L : R; used.add(takeL ? i : j);
    s.push({ lines: takeL ? [6, 7, 8, 9] : [6, 7, 11, 12], pic: P({ comps, k: k + 1, tempNew: k, ptr: { i, j }, kinds: { [i]: 'cmp', [j]: 'cmp' } }), vars: [['arr[i]', `= ${L}`], ['arr[j]', `= ${R}`]], say: `Both halves still have values (line 6). Is ${c(`arr[i] <= arr[j]`)}, ${L} &lt;= ${R}? <b>${takeL ? 'Yes' : 'No'}</b>, so ${c(`temp[${k}] = ${takeL ? L : R}`)} and ${c(takeL ? 'i++' : 'j++')}.` });
    if (takeL) i++; else j++;
    k++;
    if (k === 1) s.push({ lines: [14], pic: P({ comps, k, ptr: { i, j } }), vars: [['k', `= ${k}`]], say: `${c('k++')}: the next free slot in ${c('temp')} is now index 1. This repeats: every round puts one value in ${c('temp')}.` });
  }
  s.push({ lines: [6], pic: P({ comps, k, ptr: { i, j } }), vars: [['i', `= ${i}`], ['j', `= ${j}`]], say: `${c('j')} is now 5, past ${c('high')}: the right half is used up, so ${c('j <= high')} is false and the loop on line 6 stops. 37 is not in ${c('temp')} yet!` });
  temp[k] = a[j]; used.add(j);
  s.push({ lines: [16, 21, 22, 23, 24], pic: P({ comps, k: k + 1, tempNew: k, ptr: { i, j } }), vars: [['k', `= ${k}`]], say: `Line 16: ${c('i <= mid')} (3 &lt;= 2) is false, the left half has no leftovers. Line 21: ${c('j <= high')}, 4 &lt;= 4, true: the leftover <b>37</b> goes into ${c('temp[4]')}. No comparison is needed: leftovers are already sorted and bigger than everything in ${c('temp')}.` });
  j++; k++;
  const done = [10, 13, 14, 29, 37];
  s.push({ lines: [26, 27], pic: mergePic({ vals: done, range: [0, 4], kinds: { 0: 'done', 1: 'done', 2: 'done', 3: 'done', 4: 'done' }, temp: [...temp], comps, note: 'sorted: 10, 13, 14, 29, 37', noteFill: GREEN, alt: 'arr is now 10, 13, 14, 29, 37' }), vars: [['k', '= 0 to 4']], say: `The ${c('for')} loop copies ${c('temp')} back into ${c('arr')}, slot by slot: ${c('arr[low + k] = temp[k]')}. The five scores are sorted after <b>${comps} comparisons</b> in this merge.` });
  return s;
}

/** Mistake: no leftover loops. temp keeps a 0 where 37 should be. */
export function leftoverBadPic() {
  return mergePic({ vals: [10, 13, 14, 29, 0], range: [0, 4], kinds: { 4: 'bad' }, temp: [10, 13, 14, 29, 0], tempNew: 4, note: '37 never reached temp; temp[4] was still 0', noteFill: RED, alt: 'Without the leftover loops, 37 is never copied. temp is 10, 13, 14, 29, 0 (a new int array starts with zeros), and arr becomes 10, 13, 14, 29, 0. The 37 is lost.' });
}

/* =====================================================================
   QUICK SORT (pivot = last value; Lomuto partition)
   ===================================================================== */
export function quickPic(st) {
  const n = st.vals.length, { w, x0 } = geom(n), y = 70, cx = (i) => x0 + i * w + w / 2;
  let b = chip(st) + counters(st);
  st.vals.forEach((v, i) => {
    let k = (st.kinds || {})[i];
    if (!k) k = st.range && (i < st.range[0] || i > st.range[1]) ? 'dim' : '';
    b += cellAt(x0 + i * w, y, v, k, w, 42);
    b += T(cx(i), y + 57, i, { mono: true, size: 11, w: 600, fill: SOFT });
  });
  if (st.range && st.range[0] <= st.range[1]) {
    const [lo, hi] = st.range, yb = y - 8;
    b += `<path d="M${x0 + lo * w + 2} ${yb + 5} V${yb} H${x0 + (hi + 1) * w - 2} V${yb + 5}" fill="none" stroke="#37474a" stroke-width="2"/>` + T((x0 + lo * w + x0 + (hi + 1) * w) / 2, yb - 6, st.rangeLabel ?? `working on index ${lo} to ${hi}`, { size: 11.5, w: 800, fill: SOFT });
  }
  if (st.swap && st.swap[0] !== st.swap[1]) {
    const [p, q] = st.swap, x1 = cx(Math.min(p, q)), x2 = cx(Math.max(p, q)), yy = y + 64, bot = yy + 10 + (x2 - x1) * 0.04;
    b += `<path d="M${x1 - 9} ${yy - 4} C${x1 - 9} ${bot} ${x2 + 9} ${bot} ${x2 + 9} ${yy - 4}" fill="none" stroke="#e8662e" stroke-width="2"/>` + `<path d="M${x1 - 9} ${yy - 8} l-5 8 h10 Z" fill="#e8662e"/><path d="M${x2 + 9} ${yy - 8} l-5 8 h10 Z" fill="#e8662e"/>`;
  }
  const at = {};
  for (const [nm, i] of Object.entries(st.ptr || {})) if (i != null) (at[i] = at[i] || []).push(nm);
  for (const [i, nms] of Object.entries(at)) { const px = cx(+i); b += arrowDown(px, 158) + T(px, 182, nms.join(' '), { mono: true, size: 12.5, w: 700, fill: '#b4461a' }); }
  if (st.pivotVal != null) b += T(8, 210, `pivot = ${st.pivotVal}`, { mono: true, size: 12.5, w: 700, fill: '#7a5208', anchor: 'start' });
  if (st.note) b += T(st.pivotVal != null ? 214 : 170, 210, st.note, { size: 12.5, w: 800, fill: st.noteFill || SOFT });
  return svg(222, b, st.alt || plain(st.say || ''));
}

export function quickSteps(input) {
  const a = [...input], n = a.length, s = [], done = new Set();
  let comps = 0, moves = 0;
  const base = () => { const r = {}; done.forEach((x) => { r[x] = 'done'; }); return r; };
  const push = (o) => s.push({ vals: [...a], comps, moves, ...o });
  push({ say: `Quick sort on ${a.join(', ')}. It picks one value, the <b>pivot</b> (here: the last value of the part), puts every smaller value to its left and every other value to its right, then sorts the two sides the same way.` });
  const rec = (lo, hi) => {
    if (lo > hi) return;
    if (lo === hi) { done.add(lo); push({ range: [lo, hi], kinds: base(), rangeLabel: `index ${lo}`, say: `The part at index ${lo} has one value, ${a[lo]}. One value is already in place: <b>base case</b>.` }); return; }
    const pivot = a[hi];
    let i = lo;
    const kinds = (j) => { const r = base(); for (let x = lo; x < i; x++) r[x] = 'L'; for (let x = i; x < j; x++) r[x] = 'R'; r[hi] = 'pivot'; return r; };
    push({ range: [lo, hi], kinds: kinds(lo), ptr: { i: lo }, pivotVal: pivot, chip: `partition ${lo}..${hi}`, say: `<b>Partition</b> index ${lo} to ${hi}. The pivot is the last value, <b>${pivot}</b> (gold). ${c('i')} marks where the next value smaller than ${pivot} will go.` });
    for (let j = lo; j < hi; j++) {
      comps++;
      const v = a[j];
      if (v < pivot) {
        const old = a[i]; a[i] = v; a[j] = old; if (i !== j) moves++;
        const k = kinds(j + 1); k[i] = 'swap'; if (i !== j) k[j] = 'swap';
        push({ range: [lo, hi], kinds: k, ptr: { i, j }, swap: [i, j], pivotVal: pivot, chip: `partition ${lo}..${hi}`, say: `Is ${v} &lt; ${pivot}? <b>Yes</b>: it belongs on the left. ${i === j ? `It is already at ${c('i')} (index ${i}), so it swaps with itself` : `Swap it with the value at ${c('i')} (index ${i})`}, then ${c('i')} moves right.` });
        i++;
      } else {
        const k = kinds(j); k[j] = 'cmp';
        push({ range: [lo, hi], kinds: k, ptr: { i, j }, pivotVal: pivot, chip: `partition ${lo}..${hi}`, say: `Is ${v} &lt; ${pivot}? <b>No</b>: it stays on the right side. Nothing moves; ${c('j')} goes on.` });
      }
    }
    const old = a[i]; a[i] = pivot; a[hi] = old; if (i !== hi) moves++;
    done.add(i);
    const k = base(); for (let x = lo; x < i; x++) if (!done.has(x)) k[x] = 'L'; for (let x = i + 1; x <= hi; x++) if (!done.has(x)) k[x] = 'R';
    push({ range: [lo, hi], kinds: k, ptr: { i }, swap: [i, hi], pivotVal: pivot, chip: `partition ${lo}..${hi}`, say: `Every value was checked. Swap the pivot into index ${i}, ${c('i')}'s spot. Now <b>${pivot} is in its final place</b> (green): ${i > lo ? `${a.slice(lo, i).join(', ')} on its left ${i - lo === 1 ? 'is' : 'are'} smaller` : 'nothing on its left is smaller'}, ${i < hi ? `${a.slice(i + 1, hi + 1).join(', ')} on its right ${hi - i === 1 ? 'is' : 'are'} not` : 'and nothing is on its right'}.` });
    rec(lo, i - 1); rec(i + 1, hi);
  };
  rec(0, n - 1);
  const kd = {}; for (let x = 0; x < n; x++) kd[x] = 'done';
  push({ kinds: kd, note: 'sorted!', noteFill: GREEN, say: `Every value has been a pivot or a one-value part, so every value is in its final place: ${a.join(', ')}. Total: <b>${comps} comparisons</b> and <b>${moves} swaps</b> (swaps of a value with itself not counted).` });
  return s;
}

export const quickSortCode = String.raw`static void quickSort(int[] arr, int low, int high) {
  if (low >= high) {
    return;                          // base case: 0 or 1 value
  }
  int p = partition(arr, low, high); // the pivot's final index
  quickSort(arr, low, p - 1);        // sort the smaller values
  quickSort(arr, p + 1, high);       // sort the bigger values
}`;

export const partitionCode = String.raw`static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];             // the last value is the pivot
  int i = low;                       // where the next smaller value goes
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      int temp = arr[i];             // swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
    }
  }
  int temp = arr[i];                 // put the pivot in its place
  arr[i] = arr[high];
  arr[high] = temp;
  return i;
}`;

/** CodeWalk: partition(arr, 0, 4) on the five scores. */
export function partitionWalk() {
  const st = quickSteps(SCORES), s = [];
  const P = (x, o = {}) => quickPic({ ...x, ...o, chip: null, alt: plain(x.say) });
  const part = st.filter((x) => x.chip === 'partition 0..4');
  s.push({ lines: [1, 2], pic: P(part[0]), vars: [['low', '= 0'], ['high', '= 4'], ['pivot', '= 13']], say: `${c('quickSort')} calls ${c('partition(arr, 0, 4)')} on all five scores. Line 2: the pivot is the last value, ${c('arr[4]')} = <b>13</b>.` });
  s.push({ lines: [3], pic: P(part[0]), vars: [['i', '= 0']], say: `${c('i = low')} = 0: if a value smaller than 13 shows up, it goes to index 0. Everything left of ${c('i')} will be smaller than the pivot.` });
  const sayJ = ['29 &lt; 13? <b>No</b>. The if is skipped: 29 stays where it is. Only ' + c('j') + ' moves on.', '10 &lt; 13? <b>Yes</b>. Lines 6 to 8 swap ' + c('arr[0]') + ' (29) and ' + c('arr[1]') + ' (10), then line 9: ' + c('i++') + ', so ' + c('i') + ' = 1.', '14 &lt; 13? <b>No</b>. Skipped.', '37 &lt; 13? <b>No</b>. Skipped. ' + c('j++') + ' makes ' + c('j') + ' = 4, and ' + c('4 < high') + ' is false, so the loop ends. The pivot itself is never compared.'];
  part.slice(1, 5).forEach((x, k) => s.push({ lines: x.swap ? [4, 5, 6, 7, 8, 9] : [4, 5], pic: P(x), vars: [['j', `= ${k}`], ['arr[j]', `= ${[29, 10, 14, 37][k]}`]], say: sayJ[k] }));
  s.push({ lines: [12, 13, 14], pic: P(part[5]), vars: [['i', '= 1']], say: `Lines 12 to 14 swap the pivot into ${c('arr[i]')}: 13 trades places with 29. Now 10 (smaller) is on the left of 13, and 14, 37, 29 (bigger) are on its right.` });
  s.push({ lines: [15], pic: P(part[5], { note: '13 is in its final place', noteFill: GREEN }), vars: [['return', '1']], say: `${c('return i')} gives back 1, the pivot's final index. ${c('quickSort')} then calls itself on index 0 to 0 (just 10) and on index 2 to 4 (14, 37, 29), and each part is partitioned the same way.` });
  return s;
}

/** The pivots of quick sort as a tree: each pivot splits its part into smaller | bigger. */
export function quickTreePic() {
  const box = (x, y, vals, pv, lab) => { let b = ''; const w = 30; vals.forEach((v, k) => { b += cellAt(x + k * w, y, v, v === pv ? 'pivot' : '', w, 30, 13); }); if (lab) b += T(x + (vals.length * w) / 2, y + 46, lab, { size: 11, w: 800, fill: '#7a5208' }); return b; };
  let b = T(170, 20, 'Each pivot splits its part in two', { size: 13.5 });
  b += box(95, 36, [29, 10, 14, 37, 13], 13, 'pivot 13');
  b += `<path d="M150 92 L66 112" stroke="#0e6b63" stroke-width="1.8"/><path d="M180 92 L236 112" stroke="#2f6fa8" stroke-width="1.8"/>`;
  b += T(84, 96, 'smaller', { size: 11, w: 800, fill: '#0e6b63' }) + T(240, 96, 'bigger', { size: 11, w: 800, fill: '#2f6fa8' });
  b += cellAt(50, 114, 10, 'L', 30, 30, 13) + T(65, 160, 'one value', { size: 11, w: 700, fill: SOFT });
  b += cellAt(155, 114, 13, 'done', 30, 30, 13) + T(170, 160, 'in place', { size: 11, w: 700, fill: GREEN });
  b += box(200, 114, [14, 37, 29], 29, 'pivot 29');
  b += `<path d="M228 166 L196 190" stroke="#0e6b63" stroke-width="1.8"/><path d="M262 166 L294 190" stroke="#2f6fa8" stroke-width="1.8"/>`;
  b += cellAt(178, 192, 14, 'L', 30, 30, 13) + cellAt(230, 192, 29, 'done', 30, 30, 13) + cellAt(282, 192, 37, 'R', 30, 30, 13);
  b += T(170, 250, 'Read the bottom from left to right:', { size: 12, w: 700, fill: SOFT });
  [10, 13, 14, 29, 37].forEach((v, k) => { b += cellAt(95 + k * 30, 260, v, 'done', 30, 30, 13); });
  return svg(302, b, 'Quick sort on 29, 10, 14, 37, 13. Pivot 13 splits it into 10 (smaller) and 14, 37, 29 (bigger). 10 is one value. Pivot 29 splits 14, 37, 29 into 14 and 37. Reading from left to right gives 10, 13, 14, 29, 37.', 'objbox adv-pic qtree-pic');
}

/** Bad pivot: sorted input, last value as pivot every time: one side always empty. */
export function quickWorstPic() {
  const vals = [10, 13, 14, 29, 37];
  let b = T(170, 20, 'Already sorted + last value as pivot', { size: 13.5 });
  for (let r = 0; r < 5; r++) {
    const y = 34 + r * 42;
    vals.forEach((v, k) => { b += cellAt(64 + k * 36, y, v, k > 4 - r ? 'done' : (k === 4 - r ? 'pivot' : (k < 4 - r ? 'L' : '')), 36, 30, 13); });
    b += T(58, y + 20, `${5 - r} left`, { size: 11, w: 800, fill: SOFT, anchor: 'end' });
    if (r < 4) b += T(250, y + 20, `${4 - r} comparison${r === 3 ? "" : "s"}`, { size: 11, w: 800, fill: '#b4461a', anchor: 'start' });
  }
  b += T(170, 250, 'Each pivot is the biggest: the "bigger" side is empty,', { size: 12, w: 700, fill: SOFT });
  b += T(170, 268, 'so each part is only one value shorter: 4 + 3 + 2 + 1.', { size: 12, w: 700, fill: SOFT });
  return svg(280, b, 'Quick sort on an already sorted array 10, 13, 14, 29, 37 with the last value as pivot. Each pivot is the biggest value in its part, so the bigger side is always empty and each part is just one value shorter: 4, 3, 2, 1 comparisons, like the basic sorts.', 'objbox adv-pic');
}

/* =====================================================================
   HEAP SORT (max-heap in the array: children 2i + 1 and 2i + 2)
   ===================================================================== */
const treeXY = (i) => { const lv = Math.floor(Math.log2(i + 1)), pos = i - (2 ** lv - 1), cnt = 2 ** lv; return [20 + (300 * (pos + 0.5)) / cnt, 54 + lv * 50]; };

/** Tree (top) + array (bottom). st: { vals, size (heap size), kinds, swap, chip, note, idx (show index under nodes) } */
export function heapPic(st) {
  const n = st.vals.length, size = st.size ?? n;
  let b = chip(st) + counters(st);
  for (let i = 1; i < n; i++) {
    const [x1, y1] = treeXY(Math.floor((i - 1) / 2)), [x2, y2] = treeXY(i), inHeap = i < size;
    b += `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${inHeap ? '#37474a' : '#b8c2c3'}" stroke-width="2"${inHeap ? '' : ' stroke-dasharray="4 4"'}/>`;
  }
  if (st.swap && st.swap[0] !== st.swap[1]) {
    const [p, q] = st.swap.map(treeXY);
    b += `<path d="M${p[0]} ${p[1]} L${q[0]} ${q[1]}" stroke="#e8662e" stroke-width="5" opacity="0.55"/>`;
  }
  st.vals.forEach((v, i) => {
    const [x, y] = treeXY(i), k = (st.kinds || {})[i] || (i >= size ? 'done' : ''), [f, s, t] = KIND[k];
    b += `<circle cx="${x}" cy="${y}" r="18" fill="${f}" stroke="${s}" stroke-width="2"${i >= size ? ' stroke-dasharray="4 3"' : ''}/>` + T(x, y + 5.5, v, { mono: true, size: 14, w: 700, fill: t });
    if (st.idx !== false) b += T(x, y + 31, i, { mono: true, size: 10, w: 700, fill: '#6b7a7c' });
  });
  const { w, x0 } = geom(n), ay = 248;
  if (x0 > 28) b += T(x0 - 6, ay + 25, 'arr', { mono: true, size: 12, w: 700, fill: SOFT, anchor: 'end' });
  st.vals.forEach((v, i) => { const k = (st.kinds || {})[i] || (i >= size ? 'done' : ''); b += cellAt(x0 + i * w, ay, v, k, w, 38) + T(x0 + i * w + w / 2, ay + 52, i, { mono: true, size: 11, w: 600, fill: SOFT }); });
  if (size < n && size > 0) { const xx = x0 + size * w; b += `<path d="M${xx} ${ay - 6} V${ay + 44}" stroke="#2e7d4f" stroke-width="3"/>` + T(xx + 4, ay - 10, 'sorted part →', { size: 11, w: 800, fill: GREEN, anchor: 'start' }); }
  if (st.note) b += T(170, 322, st.note, { size: 12.5, w: 800, fill: st.noteFill || SOFT });
  return svg(332, b, st.alt || plain(st.say || ''));
}

export function heapSteps(input) {
  const a = [...input], n = a.length, s = [];
  let comps = 0, moves = 0, size = n;
  const push = (o) => s.push({ vals: [...a], comps, moves, size, ...o });
  push({ chip: 'the array as a tree', chipW: 170, say: `Heap sort on ${a.join(', ')}. First, read the array as a tree: index 0 is the root, and the children of index i are at 2i + 1 and 2i + 2. Step 1 turns it into a <b>max-heap</b> (every parent at least as big as its children).` });
  const sift = (i, phase) => {
    while (2 * i + 1 < size) {
      let ch = 2 * i + 1;
      const hasR = ch + 1 < size;
      let say = '';
      if (hasR) { comps++; say = `${a[i]}'s children are ${a[ch]} and ${a[ch + 1]}; the bigger one is <b>${Math.max(a[ch], a[ch + 1])}</b>. `; if (a[ch + 1] > a[ch]) ch++; }
      else say = `${a[i]} has one child, ${a[ch]}. `;
      comps++;
      const k = { [i]: 'cmp', [ch]: 'cmp' };
      if (a[i] >= a[ch]) { push({ kinds: k, chip: phase, say: say + `Is ${a[i]} &gt;= ${a[ch]}? <b>Yes</b>: this parent is big enough. Stop here.` }); return; }
      const p = a[i]; a[i] = a[ch]; a[ch] = p; moves++;
      push({ kinds: { [i]: 'swap', [ch]: 'swap' }, swap: [i, ch], chip: phase, say: say + `Is ${p} &gt;= ${a[i]}? <b>No</b>, so <b>swap</b> them: ${a[i]} moves up, ${p} moves down and keeps checking.` });
      i = ch;
    }
    push({ kinds: { [i]: 'L' }, chip: phase, say: `${a[i]} is at index ${i} and has no children inside the heap, so it stops here.` });
  };
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    push({ kinds: { [i]: 'pivot' }, chip: 'build heap', say: `Build the heap from the <b>last parent</b> back to the root. Index ${i} (${a[i]}) is next: <b>sift it down</b> until it is at least as big as its children.` });
    sift(i, 'build heap');
  }
  push({ kinds: { 0: 'pivot' }, chip: 'max-heap ready', chipW: 150, say: `It is a <b>max-heap</b> now: ${a.join(', ')}. The biggest value, ${a[0]}, is at the root. Step 2: take the biggest out, again and again.` });
  for (let end = n - 1; end > 0; end--) {
    const big = a[0], last = a[end];
    a[0] = last; a[end] = big; moves++;
    size = end;
    push({ kinds: { 0: 'swap', [end]: 'done' }, swap: [0, end], chip: 'take the biggest', chipW: 160, say: `Swap the root (${big}, the biggest) with the last value in the heap (${last}). <b>${big} is in its final place</b> at index ${end} and leaves the heap. The heap is now ${size} value${size > 1 ? 's' : ''}.` });
    if (size > 1) { push({ kinds: { 0: 'pivot' }, chip: 'take the biggest', chipW: 160, say: `${a[0]} at the root may be too small. Sift it down to repair the heap.` }); sift(0, 'take the biggest'); }
  }
  size = 0;
  push({ note: 'sorted!', noteFill: GREEN, say: `The heap is empty and the array is sorted: ${a.join(', ')}. Total: <b>${comps} comparisons</b> and <b>${moves} swaps</b>.` });
  return s;
}

export const heapSortCode = String.raw`static void heapSort(int[] arr) {
  int n = arr.length;
  for (int i = n / 2 - 1; i >= 0; i--) {
    siftDown(arr, i, n);             // step 1: build a max-heap
  }
  for (int end = n - 1; end > 0; end--) {
    int temp = arr[0];               // step 2: swap the root (biggest)
    arr[0] = arr[end];               //   with the last value in the heap
    arr[end] = temp;
    siftDown(arr, 0, end);           // repair the smaller heap
  }
}`;

export const siftDownCode = String.raw`static void siftDown(int[] arr, int i, int size) {
  while (2 * i + 1 < size) {         // while i has a left child
    int child = 2 * i + 1;           // the left child
    if (child + 1 < size && arr[child + 1] > arr[child]) {
      child++;                       // the right child is bigger
    }
    if (arr[i] >= arr[child]) {
      return;                        // parent is big enough: stop
    }
    int temp = arr[i];               // swap parent and bigger child
    arr[i] = arr[child];
    arr[child] = temp;
    i = child;                       // keep going down
  }
}`;

/** CodeWalk: siftDown(arr, 0, 4) right after 37 was swapped out: 13, 29, 14, 10 | 37. */
export function siftWalk() {
  const s = [], A = [13, 29, 14, 10, 37];
  const P = (vals, o = {}) => heapPic({ vals, size: 4, ...o, alt: o.alt || ('Heap ' + vals.slice(0, 4).join(', ') + ', sorted part 37') });
  s.push({ lines: [1], pic: P(A, { kinds: { 0: 'pivot' } }), vars: [['i', '= 0'], ['size', '= 4']], say: `Heap sort just swapped 37 out to index 4. Now 13 sits at the root, and it is too small. ${c('siftDown(arr, 0, 4)')} repairs the heap: start at index 0, and only index 0 to 3 are still in the heap.` });
  s.push({ lines: [2, 3], pic: P(A, { kinds: { 0: 'pivot', 1: 'cmp' } }), vars: [['2 * i + 1', '= 1'], ['child', '= 1']], say: `Line 2: ${c('2 * 0 + 1')} = 1, and 1 &lt; 4, so index 0 has a left child. Line 3: ${c('child')} = 1 (the value 29).` });
  s.push({ lines: [4], pic: P(A, { kinds: { 0: 'pivot', 1: 'cmp', 2: 'cmp' } }), vars: [['arr[2]', '= 14'], ['arr[1]', '= 29']], say: `Line 4: is there a right child (${c('2 < 4')}, yes) and is it bigger, ${c('14 > 29')}? No. So ${c('child')} stays 1: <b>29 is the bigger child</b>.` });
  s.push({ lines: [7], pic: P(A, { kinds: { 0: 'cmp', 1: 'cmp' } }), vars: [['arr[i]', '= 13'], ['arr[child]', '= 29']], say: `Line 7: is the parent big enough, ${c('13 >= 29')}? No, so we do not stop.` });
  const B = [29, 13, 14, 10, 37];
  s.push({ lines: [10, 11, 12, 13], pic: P(B, { kinds: { 0: 'swap', 1: 'swap' }, swap: [0, 1] }), vars: [['i', '= 1']], say: `Lines 10 to 12 swap 13 and 29: the bigger child moves up. Line 13: ${c('i = child')}, so we follow 13 down to index 1.` });
  s.push({ lines: [2, 3, 4], pic: P(B, { kinds: { 1: 'pivot', 3: 'cmp' } }), vars: [['child', '= 3']], say: `Back at line 2: ${c('2 * 1 + 1')} = 3 &lt; 4, so index 1 has a left child, index 3 (10). Line 4: is there a right child? Index 4 is <b>not</b> &lt; ${c('size')} (37 is no longer in the heap), so no.` });
  s.push({ lines: [7, 8], pic: P(B, { kinds: { 1: 'cmp', 3: 'cmp' }, note: 'heap repaired: 29 is at the root', noteFill: GREEN }), vars: [['arr[i]', '= 13'], ['arr[child]', '= 10']], say: `Line 7: ${c('13 >= 10')}? Yes: 13 is big enough for its spot, so the method returns. The heap is repaired: the next biggest, <b>29</b>, is at the root, ready to be swapped out next.` });
  return s;
}

/** Index rule picture: tree with index numbers + the array, arrows from index 1 to its children 3 and 4. */
export function heapIndexPic() {
  const vals = [37, 29, 14, 10, 13];
  let b = heapPic({ vals, size: 5, kinds: { 1: 'pivot', 3: 'L', 4: 'L', 0: 'R' } }).replace(/^<svg[^>]*>|<\/svg>$/g, '');
  b += T(170, 18, 'Parent at index i: children at 2i + 1 and 2i + 2', { size: 12.5, w: 800, fill: SOFT });
  b += T(170, 322, 'index 1 (29): children at 2·1 + 1 = 3 and 2·1 + 2 = 4', { size: 12, w: 800, fill: '#7a5208' });
  return svg(332, b, 'A max-heap 37, 29, 14, 10, 13 drawn as a tree and as an array. The root 37 is at index 0. Index 1 (29) has children at index 3 (10) and 4 (13): 2 times 1 plus 1 is 3, and 2 times 1 plus 2 is 4. Every parent is at least as big as its children.', 'objbox adv-pic heap-pic');
}

/** Heap or not: two small trees. */
export function heapOrNotPic() {
  const node = (x, y, v, k = '') => { const [f, s, t] = KIND[k]; return `<circle cx="${x}" cy="${y}" r="17" fill="${f}" stroke="${s}" stroke-width="2"/>` + T(x, y + 5, v, { mono: true, size: 13.5, w: 700, fill: t }); };
  const e = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#37474a" stroke-width="2"/>`;
  let b = '';
  b += `<rect x="6" y="6" width="160" height="200" rx="10" fill="#f1f8f3" stroke="#2e7d4f" stroke-width="1.8"/>` + T(86, 28, '✓ a max-heap', { size: 13.5, fill: GREEN });
  b += e(86, 64, 46, 118) + e(86, 64, 126, 118) + e(46, 118, 26, 168) + e(46, 118, 66, 168);
  b += node(86, 64, 40) + node(46, 118, 25) + node(126, 118, 31) + node(26, 168, 8) + node(66, 168, 25);
  b += `<rect x="174" y="6" width="160" height="200" rx="10" fill="#fbefed" stroke="#b23a33" stroke-width="1.8"/>` + T(254, 28, '✗ not a max-heap', { size: 13.5, fill: RED });
  b += e(254, 64, 214, 118) + e(254, 64, 294, 118) + e(214, 118, 194, 168) + e(214, 118, 234, 168);
  b += node(254, 64, 40) + node(214, 118, 25, 'bad') + node(294, 118, 31) + node(194, 168, 8) + node(234, 168, 30, 'bad');
  b += T(254, 198, '30 > its parent 25', { size: 11, w: 800, fill: RED });
  b += T(86, 198, 'each parent ≥ its children', { size: 11, w: 800, fill: GREEN });
  return svg(212, b, 'Left, a max-heap: 40 on top with children 25 and 31; 25 has children 8 and 25. Every parent is at least as big as its children (equal is fine). Right, not a max-heap: the same tree but 30 is under 25, and 30 is bigger than its parent.', 'objbox adv-pic');
}

/* =====================================================================
   Work: comparisons for all six sorts (plain loops, fast, any size)
   ===================================================================== */
export function countAll(input) {
  const r = {};
  { let c2 = 0; const a = [...input], n = a.length; for (let i = 0; i < n - 1; i++) for (let j = 0; j < n - 1 - i; j++) { c2++; if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]]; } r.bubble = c2; }
  { let c2 = 0; const a = [...input], n = a.length; for (let i = 0; i < n - 1; i++) { let m = i; for (let j = i + 1; j < n; j++) { c2++; if (a[j] < a[m]) m = j; } [a[i], a[m]] = [a[m], a[i]]; } r.selection = c2; }
  { let c2 = 0; const a = [...input], n = a.length; for (let i = 1; i < n; i++) { const key = a[i]; let j = i - 1; while (j >= 0) { c2++; if (a[j] > key) { a[j + 1] = a[j]; j--; } else break; } a[j + 1] = key; } r.insertion = c2; }
  { let c2 = 0; const a = [...input]; const ms = (lo, hi) => { if (lo >= hi) return; const mid = Math.floor((lo + hi) / 2); ms(lo, mid); ms(mid + 1, hi); const t = []; let i = lo, j = mid + 1; while (i <= mid && j <= hi) { c2++; t.push(a[i] <= a[j] ? a[i++] : a[j++]); } while (i <= mid) t.push(a[i++]); while (j <= hi) t.push(a[j++]); t.forEach((v, k) => { a[lo + k] = v; }); }; ms(0, a.length - 1); r.merge = c2; r.mergeOk = isSorted(a); }
  { let c2 = 0; const a = [...input]; const st = [[0, a.length - 1]]; while (st.length) { const [lo, hi] = st.pop(); if (lo >= hi) continue; const pv = a[hi]; let i = lo; for (let j = lo; j < hi; j++) { c2++; if (a[j] < pv) { [a[i], a[j]] = [a[j], a[i]]; i++; } } [a[i], a[hi]] = [a[hi], a[i]]; st.push([lo, i - 1], [i + 1, hi]); } r.quick = c2; r.quickOk = isSorted(a); }
  { let c2 = 0; const a = [...input], n = a.length; const sd = (i, size) => { while (2 * i + 1 < size) { let ch = 2 * i + 1; if (ch + 1 < size) { c2++; if (a[ch + 1] > a[ch]) ch++; } c2++; if (a[i] >= a[ch]) return; [a[i], a[ch]] = [a[ch], a[i]]; i = ch; } }; for (let i = Math.floor(n / 2) - 1; i >= 0; i--) sd(i, n); for (let e = n - 1; e > 0; e--) { [a[0], a[e]] = [a[e], a[0]]; sd(0, e); } r.heap = c2; r.heapOk = isSorted(a); }
  return r;
}
const isSorted = (a) => a.every((v, i) => i === 0 || a[i - 1] <= v);

/** Seeded random arrays (high bits of an LCG, so values really vary). */
export function seeded(n, seed = 7) { let x = seed >>> 0; const a = []; for (let i = 0; i < n; i++) { x = (Math.imul(x, 1103515245) + 12345) >>> 0; a.push(1 + ((x >>> 16) % 1000)); } return a; }

/** Levels picture: 8 values halve 3 times; every level touches all 8. */
export function levelsPic() {
  let b = T(170, 20, '8 values: 3 levels of halving', { size: 13.5 });
  const rows = [[8], [4, 4], [2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1]], cw = 24;
  rows.forEach((r, ri) => {
    const y = 36 + ri * 50, gap = ri === 0 ? 0 : 10, total = 8 * cw + (r.length - 1) * gap, x0 = (282 - total) / 2;
    let x = x0;
    r.forEach((len) => { for (let k = 0; k < len; k++) b += `<rect x="${x + k * cw}" y="${y}" width="${cw}" height="26" fill="${ri === 3 ? '#dff0e3' : '#ffffff'}" stroke="${ri === 3 ? '#2e7d4f' : INK}" stroke-width="1.8"/>`; x += len * cw + gap; });
    b += T(288, y + 18, ri === 0 ? 'start' : `level ${ri}`, { size: 11.5, w: 800, fill: '#b4461a', anchor: 'start' });
  });
  b += T(170, 252, 'Merging back up: 3 levels × 8 values each', { size: 12.5, w: 800, fill: TEALD });
  b += T(170, 272, '= about 24 steps. Doubling to 16 values adds only 1 level.', { size: 12, w: 700, fill: SOFT });
  return svg(284, b, '8 values are halved 3 times: 8, then 4 and 4, then four 2s, then eight 1s. Merging back up takes 3 levels, and each level handles all 8 values: about 3 times 8 = 24 steps. Doubling to 16 values adds only one level.', 'objbox adv-pic');
}

/* ---------- Lab helpers ---------- */
export const ADV = { merge: mergeSteps, quick: quickSteps, heap: heapSteps };
export const advPic = (mode, st) => (mode === 'merge' ? mergePic(st) : mode === 'quick' ? quickPic(st) : heapPic(st));
