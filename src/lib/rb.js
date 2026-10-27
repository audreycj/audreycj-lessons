// Red-black tree insertion, recorded as teaching steps (same snapshot format as the AVL lab).
// Rules (Cormen et al., Introduction to Algorithms, ch. 13):
//  1. Every node is red or black.  2. The root is black.  3. Every NIL (empty) leaf is black.
//  4. A red node has two black children (no red-red).  5. Every path from a node down to a NIL
//     leaf passes through the same number of black nodes.
// New nodes are inserted red. Fix-up looks at the UNCLE:
//  uncle red   -> recolor (parent + uncle black, grandparent red), continue from grandparent
//  uncle black -> triangle (LR/RL): rotate at parent first; line (LL/RR): rotate at grandparent, swap colors

const nn = (v) => ({ v, c: 'R', l: null, r: null, p: null });

export function rbClone(n) {
  return n ? { v: n.v, c: n.c, l: rbClone(n.l), r: rbClone(n.r) } : null;
}

function snap(root, caption, tag, marks = {}) {
  return { tree: rbClone(root), caption, tag, marks, showBf: false };
}

const C = (n) => (n && n.c === 'R' ? 'red' : 'black');
const word = { L: 'left', R: 'right' };

export function rbInsertSteps(root, v) {
  const steps = [];
  let t = { root };
  // re-link parents (snapshots are plain trees without parent links)
  (function link(n, p) { if (!n) return; n.p = p; link(n.l, n); link(n.r, n); })(t.root, null);

  if (!t.root) {
    t.root = nn(v);
    steps.push(snap(t.root, `<b>Step 1.</b> The tree is empty, so <b>${v}</b> becomes the root. New nodes start <b>red</b>.`, 'Insert', { [v]: 'new' }));
    t.root.c = 'B';
    steps.push(snap(t.root, `<b>Rule 2: the root must be black.</b> Color ${v} black. Done.`, 'Recolor root', { [v]: 'new' }));
    return { root: t.root, steps };
  }

  // 1. BST insert
  let c = t.root, talk = [], x;
  for (;;) {
    if (v === c.v) {
      steps.push(snap(t.root, `<b>${v}</b> is already in the tree. A red-black tree, like any BST, does not store duplicates. Nothing changes.`, 'Duplicate', { [v]: 'problem' }));
      return { root: t.root, steps };
    }
    const left = v < c.v;
    talk.push(`${v} ${left ? '&lt;' : '&gt;'} ${c.v}, go ${left ? 'left' : 'right'}`);
    const side = left ? 'l' : 'r';
    if (!c[side]) { x = nn(v); x.p = c; c[side] = x; break; }
    c = c[side];
  }
  steps.push(snap(t.root, `<b>Step 1. Insert ${v} like a normal BST, colored red.</b> ${talk.join('; ')}.`, 'BST insert', { [v]: 'new' }));

  const rotL = (z) => { const y = z.r; z.r = y.l; if (y.l) y.l.p = z; y.p = z.p; if (!z.p) t.root = y; else if (z === z.p.l) z.p.l = y; else z.p.r = y; y.l = z; z.p = y; };
  const rotR = (z) => { const y = z.l; z.l = y.r; if (y.r) y.r.p = z; y.p = z.p; if (!z.p) t.root = y; else if (z === z.p.r) z.p.r = y; else z.p.l = y; y.r = z; z.p = y; };

  // 2. Fix-up
  let first = true;
  for (;;) {
    const p = x.p;
    if (!p) {
      if (x.c === 'R') {
        x.c = 'B';
        steps.push(snap(t.root, `${x.v} is the root, and <b>the root must be black</b> (rule 2). Color it black. Done: all rules hold.`, 'Recolor root', { [x.v]: 'new' }));
      }
      break;
    }
    if (p.c === 'B') {
      steps.push(snap(t.root, first
        ? `<b>Step 2. Check the parent.</b> ${x.v}'s parent, ${p.v}, is <b>black</b>. A red node under a black node is fine, so <b>nothing to fix</b>.`
        : `${x.v}'s parent, ${p.v}, is <b>black</b>, so there is no red-red problem here. Done: all rules hold.`,
        'OK', { [x.v]: 'new' }));
      break;
    }
    // parent is red -> grandparent exists (root is black)
    const g = p.p;
    const pSide = p === g.l ? 'L' : 'R';
    const u = pSide === 'L' ? g.r : g.l;
    steps.push(snap(t.root, `<b>${first ? 'Step 2. ' : ''}Red-red problem!</b> ${x.v} is red and its parent ${p.v} is also red (breaks rule 4). Look at the <b>uncle</b>: ${p.v}'s sibling${u ? `, <b>${u.v}</b>, which is <b>${C(u)}</b>` : `, which is empty (NIL), so it counts as <b>black</b>`}.`,
      'Red-red', { [x.v]: 'problem', [p.v]: 'problem', ...(u ? { [u.v]: 'uncle' } : {}) }));
    first = false;

    if (u && u.c === 'R') {
      p.c = 'B'; u.c = 'B'; g.c = 'R';
      steps.push(snap(t.root, `<b>Uncle is red → recolor.</b> Parent ${p.v} and uncle ${u.v} become <b>black</b>, grandparent ${g.v} becomes <b>red</b>. No rotation. Now ${g.v} is red, so we check ${g.v} next.`,
        'Recolor', { [p.v]: 'pivot', [u.v]: 'pivot', [g.v]: 'new' }));
      x = g;
      continue;
    }
    // uncle black: triangle or line
    const xSide = x === p.l ? 'L' : 'R';
    const kase = pSide + xSide;
    if (pSide !== xSide) {
      steps.push(snap(t.root, `<b>Uncle is black → rotate.</b> From grandparent ${g.v}, the path goes <b>${word[pSide]}</b> (to ${p.v}), then <b>${word[xSide]}</b> (to ${x.v}). That is a <b>triangle</b> (the ${kase} shape, like in AVL). First, straighten it: rotate <b>${pSide === 'L' ? 'left' : 'right'}</b> at ${p.v}.`,
        kase + ' shape', { [x.v]: 'problem', [p.v]: 'problem', [g.v]: 'uncle' }));
      const moved = pSide === 'L' ? x.l : x.r;
      if (pSide === 'L') rotL(p); else rotR(p);
      steps.push(snap(t.root, `<b>Rotate ${pSide === 'L' ? 'left' : 'right'} at ${p.v}.</b> ${x.v} moves up and ${p.v} moves down.${moved ? ` ${moved.v} changes parent.` : ''} Now it is a straight line: ${p.v} under ${x.v} under ${g.v}. Colors have not changed yet.`,
        'Rotation 1 of 2', { [x.v]: 'pivot', [p.v]: 'problem', ...(moved ? { [moved.v]: 'moved' } : {}) }));
      x = p; // continue as a line with the old parent as the bottom node
    }
    const top = x.p; // the middle node of the line
    const gg = top.p;
    const lineKase = (top === gg.l ? 'L' : 'R') + (x === top.l ? 'L' : 'R');
    if (pSide === xSide) {
      steps.push(snap(t.root, `<b>Uncle is black → rotate.</b> From grandparent ${gg.v}, the path goes <b>${word[lineKase[0]]}</b>, then <b>${word[lineKase[1]]}</b>: a straight <b>line</b> (the ${lineKase} shape). Fix: rotate <b>${lineKase === 'LL' ? 'right' : 'left'}</b> at ${gg.v}, then swap the colors of ${top.v} and ${gg.v}.`,
        lineKase + ' shape', { [x.v]: 'problem', [top.v]: 'problem', [gg.v]: 'uncle' }));
    }
    const moved2 = lineKase === 'LL' ? top.r : top.l;
    if (lineKase === 'LL') rotR(gg); else rotL(gg);
    top.c = 'B'; gg.c = 'R';
    steps.push(snap(t.root, `<b>Rotate ${lineKase === 'LL' ? 'right' : 'left'} at ${gg.v}, then swap colors.</b> ${top.v} moves up and becomes <b>black</b>; ${gg.v} moves down and becomes <b>red</b>.${moved2 ? ` ${moved2.v} changes parent and becomes ${gg.v}'s ${lineKase === 'LL' ? 'left' : 'right'} child.` : ''} Done: no red-red, and the black counts still match.`,
      pSide !== xSide ? 'Rotation 2 of 2' : 'Rotation', { [top.v]: 'pivot', [gg.v]: 'new', ...(moved2 ? { [moved2.v]: 'moved' } : {}) }));
    break;
  }
  return { root: t.root, steps };
}

export function buildRb(values) { let r = null; for (const v of values) r = rbInsertSteps(r, v).root; return rbClone(r); }

/** Check the red-black rules. Returns { ok, reason, bh }. */
export function rbCheck(root) {
  if (root && root.c !== 'B') return { ok: false, rule: 2, reason: `The root (${root.v}) is red. Rule 2: the root must be black.` };
  let problem = null;
  function bh(n) {
    if (!n) return 1; // NIL is black
    if (n.c === 'R' && ((n.l && n.l.c === 'R') || (n.r && n.r.c === 'R'))) {
      const kid = n.l && n.l.c === 'R' ? n.l : n.r;
      problem = problem || { rule: 4, reason: `${n.v} and its child ${kid.v} are both red. Rule 4: a red node cannot have a red child.` };
    }
    const a = bh(n.l), b = bh(n.r);
    if (a !== b) problem = problem || { rule: 5, reason: `Below ${n.v}, one path has ${a - 1} black node${a - 1 === 1 ? '' : 's'} and another has ${b - 1} (not counting NIL). Rule 5: every path must have the same number of black nodes.` };
    return Math.max(a, b) + (n.c === 'B' ? 1 : 0);
  }
  const h = bh(root);
  return problem ? { ok: false, ...problem } : { ok: true, bh: h };
}
