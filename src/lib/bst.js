// Plain BST step recorders for the tree lessons: search, insert (loop version), delete, traversals.
// Nodes carry an `id` (their original value) so a node keeps its place in animations even after
// deletion copies another value into it.
import { clone } from './tree.js';

let uid = 0;
export const mk = (v) => ({ id: typeof v === 'number' ? 'n' + v + '_' + uid++ : 'n' + v + '_' + uid++, v, l: null, r: null });

/** Build a BST by inserting values in order. */
export function build(values) {
  let root = null;
  for (const v of values) root = insertPlain(root, v);
  return root;
}
function insertPlain(root, v) {
  if (!root) return mk(v);
  let c = root;
  for (;;) {
    if (v === c.v) return root;
    const s = v < c.v ? 'l' : 'r';
    if (!c[s]) { c[s] = mk(v); return root; }
    c = c[s];
  }
}

/** Build any binary tree from a spec like "A(B(D,E(G,)),C(,F))". */
export function fromSpec(spec) {
  let i = 0;
  const num = /^-?\d+$/;
  function parse() {
    let tok = '';
    while (i < spec.length && !'(),'.includes(spec[i])) tok += spec[i++];
    tok = tok.trim();
    if (!tok) return null;
    const n = mk(num.test(tok) ? Number(tok) : tok);
    if (spec[i] === '(') { i++; n.l = parse(); if (spec[i] === ',') i++; n.r = parse(); if (spec[i] === ')') i++; }
    return n;
  }
  return parse();
}

const S = (root, caption, o = {}) => ({ tree: clone(root), caption, tag: o.tag || '', marks: o.marks || {}, tags: o.tags || {}, extra: o.extra || '', showBf: false });
const rel = (a, b) => (a < b ? '&lt;' : a > b ? '&gt;' : '=');
const pathMarks = (nodes, last, lastMark) => { const m = {}; nodes.forEach((n) => (m[n.id] = 'path')); if (last) m[last.id] = lastMark; return m; };
const vis = (nodes, tail) => `<p><b>Visited:</b> ${nodes.map((n) => n.v).join(' → ') || '(none)'}${tail || ''}</p>`;

/* ---------------- Search (Week 9) ---------------- */
export function searchSteps(root, t) {
  const steps = [];
  const seen = [];
  let c = root;
  steps.push(S(root, `Search for <b>${t}</b>. Start: <code>current = root</code>.`, { tag: 'Start', extra: vis([]) }));
  while (c) {
    seen.push(c);
    if (t === c.v) {
      steps.push(S(root, `Current node: <b>${c.v}</b>. ${t} = ${c.v} → <b>FOUND!</b> (return true)`, { tag: 'Found', marks: pathMarks(seen, c, 'found'), tags: { [c.id]: 'current' }, extra: vis(seen, ` &nbsp;(${seen.length} node${seen.length > 1 ? 's' : ''} checked)`) }));
      return { steps, found: true, visited: seen.map((n) => n.v) };
    }
    const left = t < c.v;
    steps.push(S(root, `Current node: <b>${c.v}</b>. ${t} ${rel(t, c.v)} ${c.v} → go <b>${left ? 'LEFT' : 'RIGHT'}</b>.`, { tag: left ? 'Go left' : 'Go right', marks: pathMarks(seen, c, 'cur'), tags: { [c.id]: 'current' }, extra: vis(seen) }));
    c = left ? c.l : c.r;
  }
  const last = seen[seen.length - 1];
  steps.push(S(root, `Current is <b>null</b> (an empty spot). <b>NOT FOUND:</b> ${t} is not in the tree (return false).`, { tag: 'Not found', marks: pathMarks(seen, null), extra: vis(seen, ' → null') }));
  return { steps, found: false, visited: seen.map((n) => n.v), last: last && last.v };
}

/* ---------------- Insert, loop version (Week 10, Lesson 1) ---------------- */
export function insertSteps(root, v) {
  const steps = [];
  if (!root) {
    root = mk(v);
    steps.push(S(root, `The tree is empty (<code>root == null</code>, line 3). The new node <b>${v}</b> becomes the root (line 4). Remember: <code>root = insert(root, ${v});</code>`, { tag: 'Empty tree', marks: { [root.id]: 'new' } }));
    return { root, steps };
  }
  const seen = [];
  let c = root;
  steps.push(S(root, `Insert <b>${v}</b>. Line 6: <code>TreeNode current = root;</code> current refers to ${c.v}.`, { tag: 'Start', tags: { [c.id]: 'current' }, marks: { [c.id]: 'cur' } }));
  for (;;) {
    seen.push(c);
    if (v === c.v) {
      steps.push(S(root, `At ${c.v}: ${v} = ${c.v}. <b>Already in the tree</b>, so skip it (lines 8–9: <code>return root;</code>). Nothing changes.`, { tag: 'Equal', marks: pathMarks(seen, c, 'found'), tags: { [c.id]: 'current' } }));
      return { root, steps };
    }
    const left = v < c.v, side = left ? 'l' : 'r', word = left ? 'left' : 'right';
    const child = c[side];
    if (!child) {
      const n = mk(v); c[side] = n;
      steps.push(S(root, `At ${c.v}: ${v} ${rel(v, c.v)} ${c.v}, so look ${word}. ${c.v}'s ${word} is <b>null</b> → <b>connect</b>: <code>current.${word} = new TreeNode(${v});</code> (line ${left ? 12 : 18}), then <code>return root;</code>. current still refers to ${c.v}.`, { tag: 'Connect', marks: { ...pathMarks(seen, c, 'cur'), [n.id]: 'new' }, tags: { [c.id]: 'current' } }));
      steps.push(S(root, `Done. The path was ${seen.map((x) => x.v).join(' → ')}. <b>${v}</b> is the ${word} child of ${c.v}. Only this last step changed the tree.`, { tag: 'Done', marks: { [n.id]: 'new' } }));
      return { root, steps };
    }
    steps.push(S(root, `At ${c.v}: ${v} ${rel(v, c.v)} ${c.v}, so look ${word}. ${c.v}'s ${word} is ${child.v}, not null → <b>move</b>: <code>current = current.${word};</code> (line ${left ? 15 : 21}). The tree has not changed.`, { tag: 'Move ' + word, marks: { ...pathMarks(seen), [child.id]: 'cur' }, tags: { [child.id]: 'current' } }));
    c = child;
  }
}

/* ---------------- Delete (Week 10, Lesson 4) ---------------- */
export function deleteSteps(root, v) {
  const steps = [];
  const seen = [];
  let parent = null, c = root, side = null;
  const talk = [];
  while (c && c.v !== v) {
    seen.push(c);
    const left = v < c.v;
    talk.push(`${v} ${rel(v, c.v)} ${c.v}, go ${left ? 'left' : 'right'}`);
    parent = c; side = left ? 'l' : 'r'; c = c[side];
  }
  if (!c) {
    steps.push(S(root, `Find ${v}: ${talk.join('. ')}. We reached an empty spot: <b>${v} is not in the tree</b>. Nothing changes.`, { tag: 'Not found', marks: pathMarks(seen) }));
    return { root, steps };
  }
  steps.push(S(root, `<b>Step 1. Find ${v}.</b> ${talk.length ? talk.join('. ') + '. ' : `${v} is the root. `}Found.`, { tag: 'Find', marks: { ...pathMarks(seen), [c.id]: 'bad' } }));
  const kids = (c.l ? 1 : 0) + (c.r ? 1 : 0);
  const attach = (sub) => { if (!parent) root = sub; else parent[side] = sub; };

  if (kids === 0) {
    steps.push(S(root, `<b>Case 1: a leaf.</b> ${v} has no children, so we just remove it.`, { tag: 'Case 1', marks: { [c.id]: 'bad' } }));
    attach(null);
    steps.push(S(root, parent ? `Done. ${parent.v}'s ${side === 'l' ? 'left' : 'right'} link is now <b>null</b>. Every other node is still connected.` : `Done. It was the only node, so the tree is now empty.`, { tag: 'Done' }));
    return { root, steps };
  }
  if (kids === 1) {
    const child = c.l || c.r;
    steps.push(S(root, `<b>Case 2: one child.</b> ${v} has one child, ${child.v}. The child (with everything below it) moves up into ${v}'s place.`, { tag: 'Case 2', marks: { [c.id]: 'bad', [child.id]: 'moved' } }));
    attach(child);
    steps.push(S(root, parent ? `Done. ${parent.v}'s ${side === 'l' ? 'left' : 'right'} is now <b>${child.v}</b>: ${parent.v} skips over ${v}, like deleting from a linked list.` : `Done. ${child.v} moved up and is the new root.`, { tag: 'Done', marks: { [child.id]: 'moved' } }));
    return { root, steps };
  }
  // Case 3
  steps.push(S(root, `<b>Case 3: two children.</b> ${v} has two children, ${c.l.v} and ${c.r.v}, but there is only one spot. Keep ${v}'s spot and put a different value in it: the <b>next value</b> (in-order successor).`, { tag: 'Case 3', marks: { [c.id]: 'bad' } }));
  let sp = c, s = c.r;
  const trail = [s];
  while (s.l) { sp = s; s = s.l; trail.push(s); }
  const tm = {}; trail.forEach((n) => (tm[n.id] = 'path')); tm[s.id] = 'moved';
  steps.push(S(root, `<b>Step 2. Find the next value.</b> Right once to ${c.r.v}${trail.length > 1 ? `, then left, left… : ${trail.slice(1).map((n) => n.v).join(' → ')}` : ''}. ${s.v} has no left child, so stop. The next value is <b>${s.v}</b>.`, { tag: 'Next value', marks: { ...tm, [c.id]: 'bad' } }));
  const old = c.v;
  c.v = s.v;
  steps.push(S(root, `<b>Step 3. Copy ${s.v} into ${old}'s spot.</b> ${old} is gone, but now ${s.v} appears twice.`, { tag: 'Copy', marks: { [c.id]: 'new', [s.id]: 'moved' } }));
  const sc = s.r;
  if (sp === c) c.r = sc; else sp.l = sc;
  steps.push(S(root, `<b>Step 4. Remove the old ${s.v}.</b> ${sc ? `It has one child, ${sc.v}, so this is case 2: ${sc.v} moves up.` : 'It is a leaf, so this is just case 1.'} The next value never has a left child, so this is always easy.`, { tag: sc ? 'Case 2' : 'Case 1', marks: { [c.id]: 'new', ...(sc ? { [sc.id]: 'moved' } : {}) } }));
  steps.push(S(root, `Done. ${old}'s old spot now holds ${s.v}. The in-order list is still sorted, and every node is still connected.`, { tag: 'Done', marks: { [c.id]: 'new' } }));
  return { root, steps };
}

/* ---------------- Traversals by hand (Week 10, Lesson 2) ---------------- */
const ORD = { pre: ['N', 'L', 'R'], in: ['L', 'N', 'R'], post: ['L', 'R', 'N'] };
const NAME = { pre: 'Pre-order (N L R)', in: 'In-order (L N R)', post: 'Post-order (L R N)' };

export function traversalSteps(root, order) {
  const steps = [];
  const written = [], waiting = [], finished = new Set();
  const panel = () => `<p><b>Waiting</b> (we must come back): ${waiting.length ? waiting.slice().reverse().map((n) => n.v).join(', ') : 'nobody'}</p><p><b>Written:</b> <span class="written">${written.map((x) => `<span>${x}</span>`).join('') || '<i>(nothing yet)</i>'}</span></p>`;
  const marks = (cur) => { const m = {}; finished.forEach((id) => (m[id] = 'done')); waiting.forEach((n) => (m[n.id] = 'wait')); if (cur) m[cur.id] = 'cur'; return m; };
  const push = (cap, cur, tag) => steps.push(S(root, cap, { tag, marks: marks(cur), extra: panel() }));

  function walk(n, parent) {
    for (const t of ORD[order]) {
      if (t === 'N') {
        written.push(n.v);
        const why = order === 'pre' ? `We are at ${n.v}. Write ${n.v} first (N comes before L and R).`
          : order === 'in' ? (n.l ? `Back at ${n.v}. Its left side is done, so now write ${n.v}.` : `${n.v}'s left side is empty. Write ${n.v}.`)
          : (n.l || n.r ? `Both sides of ${n.v} are done. Now write ${n.v}.` : `${n.v} has no children, so both sides are done. Write ${n.v}.`);
        push(why, n, `Write ${n.v}`);
      } else {
        const ch = t === 'L' ? n.l : n.r;
        const w = t === 'L' ? 'left' : 'right';
        if (!ch) continue;
        let pre = '';
        if (t === 'R' && order === 'post' && n.l) pre = `${n.v}'s left side is done, but not its right side, so do not write ${n.v} yet. `;
        if (t === 'R' && !n.l && order !== 'pre') pre = `${n.v}'s left side is empty. `;
        if (t === 'L' && order !== 'pre') pre = `We are at ${n.v}. Do not write it yet: its left side comes first. `;
        waiting.push(n);
        push(`${pre}Go ${w} to <b>${ch.v}</b>.`, ch, `Go ${w}`);
        walk(ch, n);
        waiting.pop();
      }
    }
    finished.add(n.id);
    if (parent) push(`${n.v}'s whole subtree is finished. Go back up to ${parent.v}.`, parent, 'Back up');
  }
  push(`${NAME[order]}. Start at the root, <b>${root.v}</b>.`, root, 'Start');
  walk(root, null);
  push(`Done! Every node is finished. <b>${NAME[order].split(' (')[0]}: ${written.join(', ')}</b>`, null, 'Done');
  return { steps, out: written };
}

/* ---------------- Traversal code with the call stack (Week 10, Lesson 3) ---------------- */
const LINES = { pre: { N: 3, L: 4, R: 5 }, in: { L: 3, N: 4, R: 5 }, post: { L: 3, R: 4, N: 5 } };
const FN = { pre: 'preOrder', in: 'inOrder', post: 'postOrder' };

export function callStackSteps(root, order) {
  const steps = [];
  const frames = []; const out = [];
  const fn = FN[order];
  const stack = () => `<p class="cs-title"><b>Call stack</b> (newest on top)</p><ol class="cstack">${frames.length ? frames.slice().reverse().map((f, i) => `<li class="${i === 0 ? 'run' : 'pause'}"><code>${fn}(${f.n ? f.n.v : 'null'})</code> <span>${i === 0 ? f.note : 'paused at line ' + f.line}</span></li>`).join('') : '<li class="empty">(empty: every call has finished)</li>'}</ol><p><b>Output so far:</b> <span class="mono">${out.join(' ') || '—'}</span></p>`;
  const marks = () => { const m = {}; frames.forEach((f, i) => { if (f.n) m[f.n.id] = i === frames.length - 1 ? 'cur' : 'wait'; }); return m; };
  const push = (cap, tag) => steps.push(S(root, cap, { tag, marks: marks(), extra: stack() }));

  let lead = '';
  function call(n, from) {
    const f = { n, line: 2, note: '' };
    frames.push(f);
    if (n) lead = from + ' ';
    if (!n) {
      f.note = 'line 2: node is null → return';
      push(`${from} The new call gets <b>null</b> (an empty spot). Line 2: <code>node == null</code>, so <b>return</b> right away. (Base case.)`, 'null → return');
      frames.pop();
      return;
    }
    for (const t of ORD[order]) {
      f.line = LINES[order][t];
      if (t === 'N') {
        out.push(n.v);
        f.note = `line ${f.line}: prints ${n.v}`;
        push(`${lead}${fn}(${n.v}) runs line ${f.line} and <b>prints ${n.v}</b>.`, `Print ${n.v}`);
        lead = '';
      } else {
        const ch = t === 'L' ? n.l : n.r;
        lead = '';
        call(ch, `${fn}(${n.v}) reaches line ${f.line} and calls <code>${fn}(node.${t === 'L' ? 'left' : 'right'})</code>. It pauses there.`);
      }
    }
    f.line = 6; f.note = 'line 6: finished';
    push(`${fn}(${n.v}) reaches line 6. This call is <b>finished</b> and is removed from the stack.${frames.length > 1 ? ` ${fn}(${frames[frames.length - 2].n.v}) continues where it paused.` : ''}`, 'Finished');
    frames.pop();
  }
  call(root, `We call <code>${fn}(root)</code>.`);
  push(`All calls are finished. <b>Output: ${out.join(' ')}</b>`, 'Done');
  return { steps, out };
}
