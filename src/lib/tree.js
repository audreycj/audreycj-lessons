// Tree logic + SVG drawing, shared by build-time figures and the in-browser labs.
// Height convention matches the Week 9 slides: height = edges from a node down to its
// deepest leaf. A leaf has height 0, so an empty (null) subtree counts as -1.
// Balance factor = height(left) - height(right).

export function node(v) { return { v, l: null, r: null }; }
export function height(n) { return n ? 1 + Math.max(height(n.l), height(n.r)) : -1; }
export function bf(n) { return height(n.l) - height(n.r); }
export function clone(n) { return n ? { v: n.v, l: clone(n.l), r: clone(n.r), ...(n.id != null ? { id: n.id } : {}) } : null; }
/** Layout key: a node's id if it has one (BST lessons), else its value. */
export const keyOf = (n) => (n.id != null ? n.id : n.v);

/** Plain BST insert (no balancing). Returns the root. */
export function bstInsert(root, v) {
  const n = node(v);
  if (!root) return n;
  let c = root;
  for (;;) {
    if (v === c.v) return root;
    const side = v < c.v ? 'l' : 'r';
    if (!c[side]) { c[side] = n; return root; }
    c = c[side];
  }
}
export function buildBst(values) { let r = null; for (const v of values) r = bstInsert(r, v); return r; }

function rotRight(z) { const y = z.l; z.l = y.r; y.r = z; return y; }
function rotLeft(z) { const y = z.r; z.r = y.l; y.l = z; return y; }

/** Snapshot = what one picture of the tree shows. */
function snap(root, caption, opts = {}) {
  return { tree: clone(root), caption, tag: opts.tag || '', marks: opts.marks || {}, showBf: !!opts.showBf };
}

const sign = (b) => (b > 0 ? '+' + b : b < 0 ? '−' + -b : '0');
export { sign };

/**
 * AVL insert, recorded as teaching steps.
 * Returns { root, steps } where each step is a snapshot with a caption (HTML).
 */
export function avlInsertSteps(root, v) {
  const steps = [];
  if (!root) {
    root = node(v);
    steps.push(snap(root, `<b>${v}</b> is the first value, so it becomes the root. A single node is balanced (balance factor 0).`, { tag: 'Insert', marks: { [v]: 'new' }, showBf: true }));
    return { root, steps };
  }
  // 1. Normal BST insert, remembering the path.
  const path = [];
  let c = root;
  const talk = [];
  while (c) {
    if (v === c.v) {
      steps.push(snap(root, `<b>${v}</b> is already in the tree. Like a normal BST, an AVL tree does not store duplicates, so nothing changes.`, { tag: 'Duplicate', marks: { [v]: 'bad' }, showBf: true }));
      return { root, steps };
    }
    path.push(c);
    const goLeft = v < c.v;
    talk.push(`${v} ${goLeft ? '&lt;' : '&gt;'} ${c.v}, go ${goLeft ? 'left' : 'right'}`);
    const side = goLeft ? 'l' : 'r';
    if (!c[side]) { c[side] = node(v); break; }
    c = c[side];
  }
  const pathMarks = {};
  path.forEach((p) => (pathMarks[p.v] = 'path'));
  steps.push(snap(root, `<b>Step 1. Insert ${v} like a normal BST.</b> ${talk.join('; ')}. It becomes a new leaf.`, { tag: 'BST insert', marks: { ...pathMarks, [v]: 'new' } }));

  // 2. Walk back up: first (lowest) node with |bf| = 2.
  let zi = -1;
  for (let i = path.length - 1; i >= 0; i--) { if (Math.abs(bf(path[i])) > 1) { zi = i; break; } }
  if (zi < 0) {
    steps.push(snap(root, `<b>Step 2. Check balance factors from ${v} back up to the root.</b> Every node is −1, 0, or +1. The tree is still balanced, so <b>no rotation is needed</b>.`, { tag: 'Check', marks: { ...pathMarks, [v]: 'new' }, showBf: true }));
    return { root, steps };
  }
  const z = path[zi];
  const b = bf(z);
  steps.push(snap(root, `<b>Step 2. Check balance factors from ${v} back up.</b> Node <b>${z.v}</b> has balance factor <b>${sign(b)}</b>: its ${b > 0 ? 'left' : 'right'} side is too tall. This is the node we fix.`, { tag: 'Unbalanced', marks: { [z.v]: 'bad', [v]: 'new' }, showBf: true }));

  // 3. Name the case from the first two moves z -> y -> x toward the new value.
  const first = v < z.v ? 'L' : 'R';
  const y = first === 'L' ? z.l : z.r;
  const second = v < y.v ? 'L' : 'R';
  const kase = first + second;
  const word = { L: 'left', R: 'right' };
  const fixText = {
    LL: `one <b>right rotation</b> at ${z.v}`,
    RR: `one <b>left rotation</b> at ${z.v}`,
    LR: `a <b>left rotation</b> at ${y.v}, then a <b>right rotation</b> at ${z.v}`,
    RL: `a <b>right rotation</b> at ${y.v}, then a <b>left rotation</b> at ${z.v}`,
  }[kase];
  steps.push(snap(root, `<b>Step 3. Name the case.</b> From ${z.v}, the new value went <b>${word[first]}</b> (to ${y.v}), then <b>${word[second]}</b>. That is the <b>${kase} case</b>. Fix: ${fixText}.`, { tag: kase + ' case', marks: { [z.v]: 'bad', [y.v]: 'pivot', [v]: 'new' }, showBf: true }));

  const parent = zi > 0 ? path[zi - 1] : null;
  const attach = (sub) => {
    if (!parent) root = sub; else if (parent.l === z) parent.l = sub; else parent.r = sub;
  };

  if (kase === 'LR' || kase === 'RL') {
    // first rotation at y
    let x, moved;
    if (kase === 'LR') { x = y.r; moved = x.l; z.l = rotLeft(y); }
    else { x = y.l; moved = x.r; z.r = rotRight(y); }
    const mv = moved ? ` ${x.v}'s old ${kase === 'LR' ? 'left' : 'right'} child, <b>${moved.v}</b>, moves over to become ${y.v}'s ${kase === 'LR' ? 'right' : 'left'} child.` : '';
    steps.push(snap(root, `<b>Step 4a. Rotate ${kase === 'LR' ? 'left' : 'right'} at ${y.v}.</b> ${x.v} moves up and ${y.v} moves down to its ${kase === 'LR' ? 'left' : 'right'}.${mv} Now the shape is a straight line, the ${kase === 'LR' ? 'LL' : 'RR'} case.`, { tag: 'Rotation 1 of 2', marks: { [z.v]: 'bad', [x.v]: 'pivot', ...(moved ? { [moved.v]: 'moved' } : {}) }, showBf: true }));
    // second rotation at z
    const top = kase === 'LR' ? z.l : z.r; // == x
    const moved2 = kase === 'LR' ? top.r : top.l;
    const sub = kase === 'LR' ? rotRight(z) : rotLeft(z);
    attach(sub);
    const mv2 = moved2 ? ` ${top.v}'s old ${kase === 'LR' ? 'right' : 'left'} child, <b>${moved2.v}</b>, moves over to become ${z.v}'s ${kase === 'LR' ? 'left' : 'right'} child.` : '';
    steps.push(snap(root, `<b>Step 4b. Rotate ${kase === 'LR' ? 'right' : 'left'} at ${z.v}.</b> ${top.v} moves up to ${z.v}'s old spot, and ${z.v} moves down to its ${kase === 'LR' ? 'right' : 'left'}.${mv2}`, { tag: 'Rotation 2 of 2', marks: { [top.v]: 'pivot', [z.v]: 'down', ...(moved2 ? { [moved2.v]: 'moved' } : {}) }, showBf: true }));
  } else {
    const moved = kase === 'LL' ? y.r : y.l;
    const sub = kase === 'LL' ? rotRight(z) : rotLeft(z);
    attach(sub);
    const mv = moved ? ` ${y.v}'s old ${kase === 'LL' ? 'right' : 'left'} child, <b>${moved.v}</b>, moves over to become ${z.v}'s ${kase === 'LL' ? 'left' : 'right'} child (it still fits the BST rule there).` : '';
    steps.push(snap(root, `<b>Step 4. Rotate ${kase === 'LL' ? 'right' : 'left'} at ${z.v}.</b> ${y.v} moves up to ${z.v}'s old spot, and ${z.v} moves down to ${y.v}'s ${kase === 'LL' ? 'right' : 'left'}.${mv}`, { tag: 'Rotation', marks: { [y.v]: 'pivot', [z.v]: 'down', ...(moved ? { [moved.v]: 'moved' } : {}) }, showBf: true }));
  }
  steps.push(snap(root, `<b>Done.</b> Every balance factor is −1, 0, or +1 again, and the in-order list is still sorted. For insertion, <b>one fix is always enough</b>.`, { tag: 'Balanced', marks: {}, showBf: true }));
  return { root, steps };
}

export function buildAvl(values) {
  let r = null;
  for (const v of values) r = avlInsertSteps(r, v).root;
  return r;
}

export function traverse(n, order, out = []) {
  if (!n) return out;
  if (order === 'pre') out.push(n.v);
  traverse(n.l, order, out);
  if (order === 'in') out.push(n.v);
  traverse(n.r, order, out);
  if (order === 'post') out.push(n.v);
  return out;
}

/* ---------------- Layout + SVG ---------------- */
export const GAP_X = 42, GAP_Y = 60, R = 17, PAD = 26;

/** Position by in-order index (x) and depth (y): never overlaps, keeps BST order left-to-right. */
export function layout(root) {
  const pos = {}, edges = [];
  let i = 0;
  (function walk(n, d, parent) {
    if (!n) return;
    walk(n.l, d + 1, n);
    pos[keyOf(n)] = { x: PAD + R + i * GAP_X, y: PAD + R + d * GAP_Y, n };
    i++;
    walk(n.r, d + 1, n);
    if (parent) edges.push([keyOf(parent), keyOf(n)]);
  })(root, 0, null);
  let maxD = 0;
  Object.values(pos).forEach((p) => (maxD = Math.max(maxD, p.y)));
  return { pos, edges, w: Math.max(2 * (PAD + R), PAD * 2 + R * 2 + (i - 1) * GAP_X), h: maxD + R + PAD };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/**
 * Draw a tree as an SVG string.
 * opts: { marks, showBf, showH, showNil, spot ({ key, side: 'l'|'r' }: highlight one empty slot), pos (override positions), alpha (per-node opacity), label, minW }
 * Red-black nodes carry n.c = 'R' or 'B'; their marks are drawn as a ring (halo) so the fill keeps its color.
 */
export function svgTree(root, opts = {}) {
  const L = layout(root);
  const pos = opts.pos || L.pos;
  const marks = opts.marks || {};
  const w = Math.max(L.w, opts.minW || 0), h = Math.max(L.h, opts.minH || 0);
  const off = opts.pos ? 0 : (w - L.w) / 2;
  const extra = (opts.showBf ? 6 : 0) + (opts.showNil ? 34 : 0);
  let s = `<svg class="tree-svg" viewBox="0 0 ${w} ${h + extra}" style="max-width:${Math.round(w * 1.15)}px" role="img" aria-label="${esc(opts.label || 'Tree diagram')}">`;
  s += '<g class="t-edges">';
  for (const [a, b] of L.edges) {
    const p = pos[a], q = pos[b];
    if (!p || !q) continue;
    s += `<line x1="${p.x + off}" y1="${p.y}" x2="${q.x + off}" y2="${q.y}" />`;
  }
  if (opts.showNil) {
    for (const key of Object.keys(L.pos)) {
      const p = pos[key]; if (!p) continue;
      const n = L.pos[key].n;
      [['l', -1], ['r', 1]].forEach(([side, d]) => {
        if (n[side]) return;
        const nx = p.x + off + d * 14, ny = p.y + 40;
        const sp = opts.spot && String(opts.spot.key) === String(key) && opts.spot.side === side ? ' is-spot' : '';
        s += `<line class="t-nil-edge${sp}" x1="${p.x + off}" y1="${p.y}" x2="${nx}" y2="${ny - 6}" /><rect class="t-nil${sp}" x="${nx - 7}" y="${ny - 6}" width="14" height="11" rx="1.5" />`;
      });
    }
  }
  s += '</g>';
  for (const key of Object.keys(L.pos)) {
    const p = pos[key]; if (!p) continue;
    const n = L.pos[key].n;
    const m = marks[key] || '';
    const a = opts.alpha && opts.alpha[key] != null ? opts.alpha[key] : 1;
    const x = p.x + off, y = p.y;
    const rb = n.c ? ' rb-' + n.c : '';
    s += `<g class="t-node${rb} ${m ? 'm-' + m : ''}" data-v="${n.v}" data-k="${key}" opacity="${a}">`;
    if (n.c && m) s += `<circle class="halo" cx="${x}" cy="${y}" r="${R + 6}" />`;
    s += `<circle class="body" cx="${x}" cy="${y}" r="${R}" />`;
    s += `<text x="${x}" y="${y}">${n.v}</text>`;
    if (opts.showBf) {
      const b = bf(n);
      const bad = Math.abs(b) > 1;
      s += `<text class="t-bf${bad ? ' is-bad' : ''}" x="${x + R + 2}" y="${y - R + 1}">${sign(b)}</text>`;
    }
    if (opts.showH) s += `<text class="t-h" x="${x}" y="${y + R + 11}">h=${height(n)}</text>`;
    if (opts.tags && opts.tags[key]) s += `<text class="t-tag" x="${x}" y="${y - R - 8}">${opts.tags[key]}</text>`;
    s += '</g>';
  }
  s += '</svg>';
  return s;
}
