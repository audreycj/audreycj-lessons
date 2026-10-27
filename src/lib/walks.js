// Step lists for <CodeWalk>: each step highlights some lines and shows a picture of what they do.
import { node, buildBst, bstInsert, svgTree, layout } from './tree.js';
import { nodeBox } from './illus.js';

const v = (x) => `<code>${x}</code>`;

/** The TreeNode class, field by field, then what the constructor does for new TreeNode(50). */
export const treeNodeCode = String.raw`class TreeNode {
  int data;
  TreeNode left;    // left child
  TreeNode right;   // right child

  TreeNode(int value) {
    data = value;
    left = null;      // no children yet
    right = null;
  }
}`;
export function treeNodeSteps() {
  return [
    { lines: [1, 11], pic: nodeBox({ blueprint: true }), say: `${v('class TreeNode { ... }')} describes what <b>every</b> tree node will look like. It is only a <b>blueprint</b>: no node exists yet. <span class="cw-aside">In these pictures, we draw a node as a box split into parts, one part per variable inside it. The box is just a drawing to help you see it. Java does not draw anything.</span>` },
    { lines: [2], pic: nodeBox({ blueprint: true, hl: 'data' }), say: `${v('int data;')} Every node will have its own variable named ${v('data')}, for a whole number: the node's <b>value</b>. In the drawing, it is the top part.` },
    { lines: [3], pic: nodeBox({ blueprint: true, hl: 'left' }), say: `${v('TreeNode left;')} A variable whose type is ${v('TreeNode')}. It does not hold a number. It holds a <b>reference</b>: an arrow to another node, the <b>left child</b>.` },
    { lines: [4], pic: nodeBox({ blueprint: true, hl: 'right' }), say: `${v('TreeNode right;')} The same, for the <b>right child</b>. So every node has two separate child variables: ${v('left')} and ${v('right')}.` },
    { lines: [6], pic: nodeBox({ data: '', left: '', right: '', name: 'new TreeNode(50): a brand-new node', hl: 'all' }), vars: [['value', '= 50']], say: `The <b>constructor</b>. It runs when a program writes ${v('new TreeNode(50)')}. Java creates one real node from the blueprint, and the 50 is passed into the parameter ${v('value')}.` },
    { lines: [7], pic: nodeBox({ data: 50, left: '', right: '', name: 'new TreeNode(50)', hl: 'data' }), vars: [['value', '= 50']], say: `${v('data = value;')} copies 50 into this node's ${v('data')}.` },
    { lines: [8, 9], pic: nodeBox({ data: 50, left: 'null', right: 'null', name: 'new TreeNode(50)', hl: 'kids', note: 'a leaf: no children yet' }), say: `${v('left')} and ${v('right')} start as ${v('null')}, meaning "no node here." A brand-new node is a <b>leaf</b> until we attach children to it.` },
  ];
}

/** Building a small tree line by line, with the null slots drawn. */
export const buildCode = String.raw`TreeNode root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);`;
export function buildSteps() {
  // Every step is drawn with the FINAL tree's positions and size, so the picture does not jump around.
  const full = node(8); full.l = node(3); full.r = node(10); full.l.l = node(1);
  const F = layout(full);
  const r = node(8);
  const pic = (marks, label) => svgTree(r, { marks, showNil: true, tags: { 8: 'root' }, label, pos: F.pos, minW: F.w, minH: F.h });
  const s = [];
  s.push({ lines: [1], pic: pic({ 8: 'new' }, 'One node, 8, with two empty child slots'), say: `Make a node holding 8. The variable ${v('root')} refers to it. Its ${v('left')} and ${v('right')} are ${v('null')} (the small dashed boxes).` });
  r.l = node(3);
  s.push({ lines: [2], pic: pic({ 8: 'path', 3: 'new' }, '8 with 3 on its left'), say: `Read ${v('root.left')} as: go to the node ${v('root')} refers to (8), then to its ${v('left')}. A new node, 3, is stored there.` });
  r.r = node(10);
  s.push({ lines: [3], pic: pic({ 8: 'path', 10: 'new' }, '8 with 3 on its left and 10 on its right'), say: `${v('root.right')}: the ${v('right')} of 8 gets a new node, 10. Now 8 has two children.` });
  r.l.l = node(1);
  s.push({ lines: [4], pic: pic({ 8: 'path', 3: 'path', 1: 'new' }, '1 is the left child of 3'), say: `In the code, read ${v('root.left.left')} one dot (${v('.')}) at a time, from left to right: start at ${v('root')} (8), ${v('.left')} goes to 3, and the next ${v('.left')} goes to 3's left, which was ${v('null')}. The new node 1 goes there.` });
  return s;
}

/** BST search, one check at a time. */
export const searchCode = String.raw`static boolean search(TreeNode root, int target) {
  TreeNode current = root;
  while (current != null) {
    if (target == current.data) {
      return true;
    } else if (target < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}`;
export function searchSteps(values, t) {
  const root = buildBst(values);
  const seen = [];
  const pic = (cur, found = false) => {
    const marks = {};
    for (const x of seen) marks[x] = 'path';
    if (cur) marks[cur.v] = found ? 'found' : 'cur';
    return svgTree(root, { marks, tags: cur ? { [cur.v]: 'current' } : {}, label: 'The tree during the search', minW: 260 });
  };
  const vars = (cur) => [['target', `= ${t}`], ['current', cur ? `→ ${cur.v}` : '= null']];
  const s = [];
  s.push({ lines: [1], pic: pic(null), vars: [['target', `= ${t}`]], say: `We call ${v(`search(root, ${t})`)}. The method gets the tree (through ${v('root')}) and the value to look for: <b>${t}</b>.` });
  let cur = root;
  s.push({ lines: [2], pic: pic(cur), vars: vars(cur), say: `Start at the top: ${v('current')} refers to the root, <b>${cur.v}</b>.` });
  while (true) {
    if (!cur) {
      s.push({ lines: [3], pic: pic(null), vars: vars(null), say: `${v('current')} is ${v('null')}: we fell off the tree. The loop stops.` });
      s.push({ lines: [12], pic: pic(null), vars: vars(null), say: `${v('return false;')} <b>${t} is not in the tree.</b>` });
      break;
    }
    s.push({ lines: [3], pic: pic(cur), vars: vars(cur), say: `Is ${v('current')} null? No, it refers to ${cur.v}. So we go into the loop.` });
    if (t === cur.v) {
      s.push({ lines: [4], pic: pic(cur), vars: vars(cur), say: `Is ${t} == ${cur.v}? <b>Yes!</b>` });
      s.push({ lines: [5], pic: pic(cur, true), vars: vars(cur), say: `${v('return true;')} Found it. The method stops right here, even though the loop is not "finished."` });
      break;
    }
    s.push({ lines: [4], pic: pic(cur), vars: vars(cur), say: `Is ${t} == ${cur.v}? No.` });
    if (t < cur.v) {
      s.push({ lines: [6], pic: pic(cur), vars: vars(cur), say: `Is ${t} &lt; ${cur.v}? <b>Yes</b>, so ${t} can only be on the <b>left</b> side.` });
      seen.push(cur.v); cur = cur.l;
      s.push({ lines: [7], pic: pic(cur), vars: vars(cur), say: cur ? `${v('current = current.left;')} Move down to the left child: <b>${cur.v}</b>. Back to the top of the loop.` : `${v('current = current.left;')} There is no left child, so ${v('current')} becomes ${v('null')}.` });
    } else {
      s.push({ lines: [6], pic: pic(cur), vars: vars(cur), say: `Is ${t} &lt; ${cur.v}? No. So it must be larger: it can only be on the <b>right</b> side.` });
      seen.push(cur.v); cur = cur.r;
      s.push({ lines: [8, 9], pic: pic(cur), vars: vars(cur), say: cur ? `${v('else')}: ${v('current = current.right;')} Move down to the right child: <b>${cur.v}</b>. Back to the top of the loop.` : `${v('current = current.right;')} There is no right child, so ${v('current')} becomes ${v('null')}.` });
    }
  }
  return s;
}

/* ---------------- BST insertion (bst-insert lesson) ---------------- */

/** An empty tree: just the words "root = null", in a box the same size as the other pictures. */
function emptyPic(w, h, say = 'root = null (empty tree)') {
  return `<svg class="tree-svg" viewBox="0 0 ${w} ${h}" style="max-width:${Math.round(w * 1.15)}px" role="img" aria-label="${say}"><rect x="${w / 2 - 92}" y="${h / 2 - 18}" width="184" height="36" rx="8" fill="none" stroke="#37474a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="${w / 2}" y="${h / 2}" style="font-family:var(--font-mono);font-weight:600;font-size:14px">${say}</text></svg>`;
}

export const insertCode = String.raw`static TreeNode insert(TreeNode root,
                       int value) {
  if (root == null) {
    return new TreeNode(value);
  }
  TreeNode current = root;
  while (true) {
    if (value == current.data) {
      return root;
    } else if (value < current.data) {
      if (current.left == null) {
        current.left = new TreeNode(value);
        return root;
      }
      current = current.left;
    } else {
      if (current.right == null) {
        current.right = new TreeNode(value);
        return root;
      }
      current = current.right;
    }
  }
}`;

/** insert(root, t), one check at a time. Pictures use the FINAL tree's positions, so nothing jumps. */
export function insertSteps(values, t) {
  const after = buildBst([...values, t]);
  const F = layout(after);
  const root = buildBst(values);
  const seen = [];
  let added = false;
  const pic = (cur, o = {}) => {
    if (!root) return emptyPic(Math.max(F.w, 260), F.h + 34);
    const marks = {};
    for (const x of seen) marks[x] = 'path';
    if (cur) marks[cur.v] = o.found ? 'found' : 'cur';
    if (added) marks[t] = 'new';
    return svgTree(root, { marks, showNil: true, spot: o.spot, tags: cur ? { [cur.v]: 'current' } : {}, label: 'The tree during the insert', pos: F.pos, minW: Math.max(F.w, 260), minH: F.h });
  };
  const vars = (cur) => [['value', `= ${t}`], ['current', cur ? `→ ${cur.v}` : '(not made yet)']];
  const s = [];
  s.push({ lines: [1, 2], pic: pic(null), vars: [['value', `= ${t}`]], say: `We call ${v(`insert(root, ${t})`)}. The method gets the tree (through ${v('root')}) and the value to add: <b>${t}</b>. <span class="cw-aside">The small dashed boxes are the empty (${v('null')}) child spots.</span>` });
  if (!root) {
    s.push({ lines: [3], pic: pic(null), vars: [['value', `= ${t}`], ['root', '= null']], say: `Is ${v('root')} null? <b>Yes</b>: the tree is empty.` });
    s.push({ lines: [4], pic: svgTree(buildBst([t]), { marks: { [t]: 'new' }, tags: { [t]: 'new root' }, label: `A tree with one node, ${t}` }), vars: [['value', `= ${t}`]], say: `${v(`return new TreeNode(${t});`)} The new node <b>is</b> the whole tree. The method gives it back, and the caller must save it with ${v('root = ...')} (Part 3).` });
    return s;
  }
  s.push({ lines: [3], pic: pic(null), vars: [['value', `= ${t}`]], say: `Is ${v('root')} null? No, the tree has nodes. So we skip lines 4 and 5.` });
  let cur = root;
  s.push({ lines: [6], pic: pic(cur), vars: vars(cur), say: `Start at the top, like search: ${v('current')} refers to the root, <b>${cur.v}</b>.` });
  s.push({ lines: [7], pic: pic(cur), vars: vars(cur), say: `${v('while (true)')} repeats <b>forever</b>, until a ${v('return')} ends the method. Every path through the loop either moves down or returns.` });
  while (true) {
    if (t === cur.v) {
      s.push({ lines: [8], pic: pic(cur, { found: true }), vars: vars(cur), say: `Is ${t} == ${cur.v}? <b>Yes</b>: ${t} is already in the tree.` });
      s.push({ lines: [9], pic: pic(cur, { found: true }), vars: vars(cur), say: `${v('return root;')} Nothing is added (our BSTs skip duplicates). The tree is the same as before.` });
      return s;
    }
    const left = t < cur.v, side = left ? 'l' : 'r', word = left ? 'left' : 'right';
    const kid = cur[side];
    s.push({ lines: [8, 10], pic: pic(cur), vars: vars(cur), say: `Is ${t} == ${cur.v}? No. Is ${t} &lt; ${cur.v}? <b>${left ? 'Yes' : 'No'}</b>, so ${t} belongs on the <span class="${left ? 'w-left' : 'w-right'}">${word}</span> side of ${cur.v}.` });
    const chk = left ? 11 : 17;
    if (kid) {
      s.push({ lines: left ? [chk] : [16, chk], pic: pic(cur), vars: vars(cur), say: `Is ${v(`current.${word}`)} null? No, ${cur.v} already has a ${word} child (<b>${kid.v}</b>). We cannot put ${t} there.` });
      seen.push(cur.v); cur = kid;
      s.push({ lines: [left ? 15 : 21], pic: pic(cur), vars: vars(cur), say: `${v(`current = current.${word};`)} <b>Move</b> down to ${cur.v}. The tree does not change, only the arrow ${v('current')} moves. Back to the top of the loop.` });
    } else {
      s.push({ lines: left ? [chk] : [16, chk], pic: pic(cur, { spot: { key: cur.v, side } }), vars: vars(cur), say: `Is ${v(`current.${word}`)} null? <b>Yes!</b> The ${word} spot of ${cur.v} is empty (yellow box). That is where ${t} goes.` });
      cur[side] = { v: t, l: null, r: null }; added = true;
      s.push({ lines: [chk + 1], pic: pic(cur), vars: vars(cur), say: `${v(`current.${word} = new TreeNode(${t});`)} <b>Connect</b>: the new node is stored in ${cur.v}'s ${v(word)}. Now the tree changes, but ${v('current')} still refers to ${cur.v}.` });
      s.push({ lines: [chk + 2], pic: pic(cur), vars: vars(cur), say: `${v('return root;')} Done. The method gives back the same top node (${root.v}). ${t} is a new <b>leaf</b>.` });
      return s;
    }
  }
}

export const loopCode = String.raw`int[] values = {40, 20, 60, 10, 30, 50, 70};
TreeNode root = null;
for (int i = 0; i < values.length; i++) {
  root = insert(root, values[i]);
}`;

/** The loop that builds a whole BST, one insert per pass. */
export function loopSteps(values) {
  const F = layout(buildBst(values));
  const W = Math.max(F.w, 260);
  let root = null;
  const pic = (newV) => svgTree(root, { marks: newV != null ? { [newV]: 'new' } : {}, tags: { [root.v]: 'root' }, label: 'The tree so far', pos: F.pos, minW: W, minH: F.h });
  const s = [];
  s.push({ lines: [1], pic: emptyPic(W, F.h, 'nothing built yet'), say: `The values to insert, in this order.` });
  s.push({ lines: [2], pic: emptyPic(W, F.h), vars: [['root', '= null']], say: `Start with an <b>empty</b> tree: ${v('root')} refers to nothing.` });
  values.forEach((x, i) => {
    const wasEmpty = !root;
    root = bstInsert(root, x);
    const say = wasEmpty
      ? `${v('i = 0')}: ${v('insert(root, 40)')} on an empty tree returns a <b>new</b> node, 40. ${v('root =')} saves it. <span class="w-key">Without ${v('root =')}, this node would be lost.</span>`
      : `${v(`i = ${i}`)}: insert ${x}. It walks down from ${values[0]} and is connected at an empty spot. Insert gives back the same top node (${values[0]}), so ${v('root')} does not change.`;
    s.push({ lines: [3, 4], pic: pic(x), vars: [['i', `= ${i}`], ['values[i]', `= ${x}`], ['root', `→ ${root.v}`]], say });
  });
  s.push({ lines: [5], pic: pic(null), vars: [['root', `→ ${root.v}`]], say: `The loop ends after ${values.length} inserts. The earlier nodes never moved: each new value became a leaf.` });
  return s;
}

/**
 * Before/after pictures: the left picture is the tree BEFORE one line of code runs, the right one is AFTER.
 * The line that runs is printed above the pair, so the arrow between them means "after this line runs".
 */
export const pair = (code, a, aCap, b, bCap, bad = false) =>
  `<div class="ba${bad ? ' is-bad' : ''}"><p class="ba-run"><span class="ba-run-k">${bad ? 'The buggy line runs:' : 'This line runs:'}</span> <code>${code}</code></p>` +
  `<div class="ba-pair"><div class="ba-col"><p class="ba-cap">${aCap}</p>${a}</div><span class="ba-arrow" aria-label="after the line runs"><span class="ba-glyph">→</span><span class="ba-arrow-k">after</span></span><div class="ba-col"><p class="ba-cap">${bCap}</p>${b}</div></div></div>`;

/** Add a loose node (connected to nothing) to a tree SVG string, at (x, y). */
export const loose = (svg, x, y, val, tag, mark = 'bad') => svg.replace(/<\/svg>$/, `<g class="t-node m-${mark}"><circle class="body" cx="${x}" cy="${y}" r="17" style="stroke-dasharray:4 3"/><text x="${x}" y="${y}">${val}</text>${tag ? `<text class="t-tag" x="${x}" y="${y - 25}">${tag}</text>` : ''}</g></svg>`);

/** The variable root drawn as a box: empty (null), or with an arrow to a node. lost = a node nobody points to. */
function rootBox(o = {}) {
  const W = 240, H = 104;
  let s = `<svg class="tree-svg" viewBox="0 0 ${W} ${H}" style="max-width:${W * 1.15}px" role="img" aria-label="${o.label || 'The variable root'}">`;
  s += `<text x="58" y="22" style="font-family:var(--font-mono);font-size:13px;font-weight:600;fill:var(--teal-ink)">root</text>`;
  s += `<rect x="20" y="36" width="76" height="40" rx="4" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>`;
  if (o.to != null) {
    s += `<circle cx="58" cy="56" r="4" fill="var(--ink)"/><line x1="58" y1="56" x2="${o.x - 21}" y2="56" stroke="var(--ink)" stroke-width="2"/><path d="M${o.x - 19} 56 l-9 -5 v10 z" fill="var(--ink)"/>`;
    s += `<g class="t-node m-new"><circle class="body" cx="${o.x}" cy="56" r="17"/><text x="${o.x}" y="56">${o.to}</text></g>`;
  } else s += `<text x="58" y="56" style="font-family:var(--font-mono);font-size:14px;font-weight:600;fill:var(--ink-soft)">null</text>`;
  if (o.lost != null) s += `<g class="t-node m-bad"><circle class="body" cx="186" cy="56" r="17" style="stroke-dasharray:4 3"/><text x="186" y="56">${o.lost}</text><text class="t-tag" x="186" y="27">lost</text></g>`;
  return s + '</svg>';
}

export function insertFigs() {
  const big = [40, 20, 60, 10, 30, 50, 70];
  const FB = layout(buildBst([...big, 45]));
  const o = (extra) => ({ showNil: true, pos: FB.pos, minW: FB.w, minH: FB.h, ...extra });
  const t1 = buildBst(big);
  const t2 = buildBst([...big, 45]);
  // The two actions, on the starting tree. Both go LEFT, to match the code shown on the cards.
  const move = pair('current = current.left;',
    svgTree(t1, o({ marks: { 60: 'cur' }, tags: { 60: 'current' }, label: 'current refers to 60' })), 'before: current is at 60',
    svgTree(t1, o({ marks: { 60: 'path', 50: 'cur' }, tags: { 50: 'current' }, label: 'current now refers to 50; the tree is the same' })), 'after: same tree, current moved to 50');
  const connect = pair('current.left = new TreeNode(45);',
    svgTree(t1, o({ marks: { 50: 'cur' }, tags: { 50: 'current' }, spot: { key: 50, side: 'l' }, label: 'current refers to 50; its left spot is empty' })), 'before: 50\'s left is empty',
    svgTree(t2, o({ marks: { 50: 'cur', 45: 'new' }, tags: { 50: 'current' }, label: '45 is now the left child of 50; current still refers to 50' })), 'after: 45 added, current stayed at 50');
  // Mistake 1: insert's return value is not saved.
  const m1 = pair('insert(root, 25);',
    rootBox({ label: 'root is null: the tree is empty' }), 'before: empty tree',
    rootBox({ lost: 25, label: 'root is still null; node 25 was made and returned, but nothing refers to it' }), 'after: root is still null, 25 is lost', true);
  const m1fix = pair('root = insert(root, 25);',
    rootBox({ label: 'root is null: the tree is empty' }), 'before: empty tree',
    rootBox({ to: 25, x: 160, label: 'root now refers to node 25' }), 'after: root refers to 25');
  // Mistake 2: current is moved to the new node instead of connecting it.
  const W2 = FB.w + 64;
  const m2 = pair('current = new TreeNode(45);',
    svgTree(t1, o({ marks: { 50: 'cur' }, tags: { 50: 'current' }, spot: { key: 50, side: 'l' }, label: 'current refers to 50; its left spot is empty' })), 'before: current is at 50',
    loose(svgTree(t1, o({ minW: W2, spot: { key: 50, side: 'l' }, label: 'The tree is unchanged and 50\'s left is still empty. current now refers to a new node 45 off to the side, connected to nothing.' })), W2 - 26, FB.pos[45].y, 45, 'current'), 'after: 50\'s left is still empty', true);
  // Mistake 3: connecting without the null check overwrites 20 (and everything under it).
  const wrong = { v: 40, l: { v: 25, l: null, r: null }, r: buildBst([60, 50, 70]) };
  const m3 = pair('current.left = new TreeNode(25);',
    svgTree(t1, { marks: { 40: 'cur', 20: 'moved', 10: 'moved', 30: 'moved' }, tags: { 40: 'current' }, label: 'current refers to 40. Its left is NOT empty: it holds 20, with 10 and 30 below.' }), 'before: 40\'s left holds 20',
    `<div class="ba-stack">${svgTree(wrong, { marks: { 25: 'bad' }, label: 'After: 40\'s left is now 25' })}<p class="ba-cap">cut off, lost:</p>${svgTree(buildBst([20, 10, 30]), { marks: { 20: 'skip', 10: 'skip', 30: 'skip' }, label: '20, 10 and 30 are cut off from the tree' })}</div>`, 'after: 25 replaced 20', true);
  return { move, connect, m1, m1fix, m2, m3, startTree: svgTree(buildBst(big), { label: 'The starting BST: 40, 20, 60, 10, 30, 50, 70' }) };
}

/* ---------------- Recursion lesson: call-stack pictures and walkthroughs ---------------- */

/**
 * A call stack picture: optional tree on top, then the stack (newest call on top), then the output so far.
 * frames: [[name, 'run' | 'wait' | 'ret', note], ...], newest first. rows = how many frames to make room for.
 */
export function stackPic({ tree = '', frames = [], out, head = 'Call stack (newest on top)', rows = 4 }) {
  const li = frames.length
    ? frames.map(([n, st, note]) => `<li class="cs-f is-${st}"><code>${n}</code><span class="cs-note">${note}</span></li>`).join('')
    : '<li class="cs-empty">(empty: every call has finished)</li>';
  return `<div class="cs-pic">${tree ? `<div class="cs-tree">${tree}</div>` : ''}<div class="cs"><p class="cs-h">${head}</p><ol class="cs-list" style="--rows:${rows}">${li}</ol></div>` +
    (out != null ? `<p class="cs-out"><span>Output so far:</span> <span class="mono">${out || '&nbsp;'}</span></p>` : '') + '</div>';
}

export const countDownCode = String.raw`static void countDown(int n) {
  if (n == 0) {                  // base case
    System.out.println("Go!");
    return;
  }
  System.out.print(n + " ");
  countDown(n - 1);              // calls itself
}`;

/** countDown(3), one line at a time, with the call stack growing and shrinking. */
export function countDownSteps() {
  const cd = (n) => `countDown(${n})`;
  const paused = (from) => [3, 2, 1].filter((k) => k > from).reverse().map((k) => [cd(k), 'wait', 'paused at line 7']);
  const pic = (top, note, out, st = 'run') => stackPic({ frames: top == null ? [] : [[cd(top), st, note], ...paused(top)], out });
  const s = [];
  s.push({ lines: [1], pic: pic(3, 'running', ''), vars: [['n', '= 3']], say: `Our program runs ${v('countDown(3);')}. Java starts one <b>call</b> of the method, with ${v('n')} = 3. <span class="cw-aside">The box lists every call that has started but not finished, newest on top. It is called the <b>call stack</b> (Part 2).</span>` });
  s.push({ lines: [2], pic: pic(3, 'running', ''), vars: [['n', '= 3']], say: `Is ${v('n == 0')}? No, ${v('n')} is 3. So Java skips lines 3 to 5.` });
  s.push({ lines: [6], pic: pic(3, 'running', '3'), vars: [['n', '= 3']], say: `Line 6 prints <b>3</b> and a space.` });
  let out = '3';
  for (const n of [3, 2, 1]) {
    const k = n - 1;
    s.push({ lines: [7], pic: pic(k, 'running', out), vars: [['n', `= ${k}`]], say: `${v('countDown(n - 1);')} The method <b>calls itself</b> with ${n} − 1 = ${k}. ${v(cd(n))} <b>pauses</b> at line 7, and a new call, ${v(cd(k))}, starts on top with its own ${v('n')} = ${k}.` });
    if (k > 0) {
      out += ` ${k}`;
      s.push({ lines: [2, 6], pic: pic(k, 'running', out), vars: [['n', `= ${k}`]], say: `${v('n')} is ${k}, not 0, so line 6 prints <b>${k}</b>.` });
    }
  }
  s.push({ lines: [2], pic: pic(0, 'running', out), vars: [['n', '= 0']], say: `Is ${v('n == 0')}? <b>Yes!</b> This is the <span class="w-key">base case</span>: the call that does not call itself again.` });
  out += ' Go!';
  s.push({ lines: [3], pic: pic(0, 'running', out), vars: [['n', '= 0']], say: `Line 3 prints <b>Go!</b>` });
  s.push({ lines: [4], pic: pic(0, 'ends here', out, 'ret'), vars: [['n', '= 0']], say: `${v('return;')} ends ${v(cd(0))}, and only that call. It leaves the stack, and ${v(cd(1))} continues after line 7, where it paused.` });
  s.push({ lines: [8], pic: pic(null, '', out), say: `${v(cd(1))} has nothing left to do: it reaches the closing ${v('}')} and finishes. Then ${v(cd(2))} finishes, then ${v(cd(3))}: newest first. The stack is empty. Output: <b>3 2 1 Go!</b>` });
  return s;
}

export const preOrderCode = String.raw`static void preOrder(TreeNode node) {
  if (node == null) { return; }        // stop
  System.out.print(node.data + " ");   // N
  preOrder(node.left);                 // L
  preOrder(node.right);                // R
}`;

/** preOrder(root) on the tree 20(10,30): the six-step trace from the module, split into single lines. */
export function preOrderSteps() {
  const root = buildBst([20, 10, 30]);
  const F = layout(root);
  const p = (x) => `preOrder(${x})`;
  // fr: frames newest first, as [x, state, note]; printed: values printed so far; spot: an empty slot being called
  const pic = (fr, printed, spot) => {
    const marks = {};
    printed.forEach((x) => (marks[x] = 'path'));
    fr.forEach(([x, st]) => { if (x !== 'null') marks[x] = st === 'wait' ? 'wait' : 'cur'; });
    const top = fr[0];
    const tags = top && top[0] !== 'null' ? { [top[0]]: 'node' } : {};
    const tree = svgTree(root, { marks, tags, showNil: true, spot, pos: F.pos, minW: Math.max(F.w, 200), minH: F.h, label: 'The tree 20, with 10 on its left and 30 on its right' });
    return stackPic({ tree, frames: fr.map(([x, st, note]) => [p(x), st, note]), out: printed.join(' '), rows: 3 });
  };
  const nd = (x) => [['node', x === 'null' ? '= null' : `→ ${x}`]];
  return [
    { lines: [1], pic: pic([[20, 'run', 'running']], []), vars: nd(20), say: `We call ${v('preOrder(root);')}. A new call starts, and its ${v('node')} points to <b>20</b>. <span class="cw-aside">We name this call ${v('preOrder(20)')}: "the call working on 20." You cannot type that in Java, because ${v('preOrder')} needs a node, not a number.</span>` },
    { lines: [2], pic: pic([[20, 'run', 'running']], []), vars: nd(20), say: `Is ${v('node')} null? No, it points to 20. Keep going.` },
    { lines: [3], pic: pic([[20, 'run', 'running']], [20]), vars: nd(20), say: `<span class="tk">N</span> Print this node: <b>20</b>.` },
    { lines: [4], pic: pic([[10, 'run', 'running'], [20, 'wait', 'paused at line 4']], [20]), vars: nd(10), say: `<span class="tk">L</span> ${v('preOrder(node.left);')} starts a <b>new call</b> with 20's left child. ${v(p(20))} pauses at line 4. In the new call, ${v('node')} points to <b>10</b>, so 10 is now N.` },
    { lines: [2, 3], pic: pic([[10, 'run', 'running'], [20, 'wait', 'paused at line 4']], [20, 10]), vars: nd(10), say: `Like every call, it starts at line 2. 10 is not null, so line 3 prints <b>10</b>.` },
    { lines: [4], pic: pic([['null', 'run', 'running'], [10, 'wait', 'paused at line 4'], [20, 'wait', 'paused at line 4']], [20, 10], { key: 10, side: 'l' }), vars: nd('null'), say: `${v(p(10))} reaches line 4. 10's left spot is <b>empty</b> (yellow box), so the new call gets ${v('null')}.` },
    { lines: [2], pic: pic([['null', 'ret', 'line 2: return'], [10, 'wait', 'paused at line 4'], [20, 'wait', 'paused at line 4']], [20, 10], { key: 10, side: 'l' }), vars: nd('null'), say: `${v('node == null')}: the <span class="w-key">base case</span>. ${v('return;')} ends this call right away. Nothing is printed.` },
    { lines: [5], pic: pic([['null', 'ret', 'line 2: return'], [10, 'wait', 'paused at line 5'], [20, 'wait', 'paused at line 4']], [20, 10], { key: 10, side: 'r' }), vars: nd('null'), say: `${v(p(10))} continues at the next line, line 5. 10's right spot is empty too, so that call also returns at line 2.` },
    { lines: [6], pic: pic([[20, 'run', 'continues at line 5']], [20, 10]), vars: nd(20), say: `${v(p(10))} reaches ${v('}')} and finishes. Back in ${v(p(20))}: it continues at line 5, and its own ${v('node')} <b>still points to 20</b>.` },
    { lines: [5], pic: pic([[30, 'run', 'running'], [20, 'wait', 'paused at line 5']], [20, 10]), vars: nd(30), say: `<span class="tk">R</span> ${v('preOrder(node.right);')} starts a new call with 20's right child: <b>30</b>. ${v(p(20))} pauses at line 5.` },
    { lines: [2, 3], pic: pic([[30, 'run', 'running'], [20, 'wait', 'paused at line 5']], [20, 10, 30]), vars: nd(30), say: `30 is not null, so line 3 prints <b>30</b>.` },
    { lines: [4, 5], pic: pic([[30, 'run', 'running'], [20, 'wait', 'paused at line 5']], [20, 10, 30]), vars: nd(30), say: `30 is a leaf: its left and right calls both get ${v('null')} and return at line 2 right away, just like at 10.` },
    { lines: [6], pic: pic([], [20, 10, 30]), say: `${v(p(30))} finishes. Then ${v(p(20))} reaches line 6 and finishes too. The stack is empty. Output: <b>20 10 30</b>, the pre-order.` },
  ];
}

export const insertRecCode = String.raw`static TreeNode insertRec(TreeNode node,
                          int value) {
  if (node == null) {                          // base case
    return new TreeNode(value);
  }
  if (value < node.data) {
    node.left = insertRec(node.left, value);   // calls itself
  } else if (value > node.data) {
    node.right = insertRec(node.right, value); // calls itself
  }
  return node;
}`;

const START = [40, 20, 60, 10, 30, 50, 70];

/** insertRec(root, 45) on the starting BST: going down, the base case, then coming back up. */
export function insertRecSteps() {
  const before = buildBst(START), after = buildBst([...START, 45]);
  const F = layout(after), W = F.w + 64;
  const ir = (x) => `insertRec(${x}, 45)`;
  const pic = (fr, o = {}) => {
    const marks = {};
    fr.forEach(([x, st]) => { if (x !== 'null') marks[x] = st === 'wait' ? 'wait' : 'cur'; });
    if (o.done) marks[45] = 'new';
    const top = fr[0];
    const tags = top && top[0] !== 'null' ? { [top[0]]: 'node' } : {};
    let tree = svgTree(o.done ? after : before, { marks, tags, showNil: true, spot: o.spot, pos: F.pos, minW: W, minH: F.h, label: o.done ? 'The tree with 45 connected as the left child of 50' : 'The starting BST' });
    if (o.loose) tree = loose(tree, W - 26, F.pos[45].y, 45, 'returned', 'new');
    return stackPic({ tree, frames: fr.map(([x, st, note]) => [ir(x), st, note]) });
  };
  const nd = (x) => [['node', x === 'null' ? '= null' : `→ ${x}`], ['value', '= 45']];
  const w40 = [40, 'wait', 'paused at line 9'], w60 = [60, 'wait', 'paused at line 7'], w50 = [50, 'wait', 'paused at line 7'];
  return [
    { lines: [1, 2], pic: pic([[40, 'run', 'running']]), vars: nd(40), say: `We call ${v('root = insertRec(root, 45);')} The first call works on the root, <b>40</b>. <span class="cw-aside">${v(ir(40))} is our name for "the call working on 40."</span>` },
    { lines: [3], pic: pic([[40, 'run', 'running']]), vars: nd(40), say: `Is ${v('node')} null? No. Skip line 4.` },
    { lines: [6, 8], pic: pic([[40, 'run', 'running']]), vars: nd(40), say: `Is 45 &lt; 40? No. Is 45 &gt; 40? <b>Yes</b>: 45 belongs on the <span class="w-right">right</span> side of 40.` },
    { lines: [9], pic: pic([[60, 'run', 'running'], w40]), vars: nd(60), say: `Line 9 calls ${v('insertRec(node.right, value)')}: a new call on <b>60</b>. ${v(ir(40))} pauses at line 9. It is <b>waiting for an answer</b> to save in ${v('node.right')}.` },
    { lines: [3, 6], pic: pic([[60, 'run', 'running'], w40]), vars: nd(60), say: `At 60: not null. Is 45 &lt; 60? <b>Yes</b>: go <span class="w-left">left</span>.` },
    { lines: [7], pic: pic([[50, 'run', 'running'], w60, w40]), vars: nd(50), say: `Line 7 calls on 60's left: <b>50</b>. ${v(ir(60))} pauses at line 7, waiting for an answer to save in ${v('node.left')}.` },
    { lines: [3, 6], pic: pic([[50, 'run', 'running'], w60, w40]), vars: nd(50), say: `At 50: not null. Is 45 &lt; 50? <b>Yes</b>: go <span class="w-left">left</span> again.` },
    { lines: [7], pic: pic([['null', 'run', 'running'], w50, w60, w40], { spot: { key: 50, side: 'l' } }), vars: nd('null'), say: `Line 7 calls on 50's left. That spot is <b>empty</b> (yellow box), so the new call gets ${v('null')}. Four calls are on the stack now.` },
    { lines: [3, 4], pic: pic([['null', 'ret', 'returns new node 45'], w50, w60, w40], { spot: { key: 50, side: 'l' }, loose: true }), vars: nd('null'), say: `${v('node == null')}: the <span class="w-key">base case</span>. Line 4 creates node 45 and <b>returns</b> it. It is not connected to the tree yet (dashed).` },
    { lines: [7], pic: pic([[50, 'run', 'saves 45 as its left'], w60, w40], { done: true }), vars: nd(50), say: `Back in ${v(ir(50))}, at line 7. The call on the right of ${v('=')} is finished and gave back 45. ${v('node.left = ')} saves it: 50's left is now 45. <b>This connects 45.</b>` },
    { lines: [11], pic: pic([[50, 'ret', 'returns 50'], w60, w40], { done: true }), vars: nd(50), say: `${v('return node;')} Here ${v('node')} is 50, so this call returns <b>50</b>: the root of its own subtree.` },
    { lines: [7, 11], pic: pic([[60, 'ret', 'returns 60'], w40], { done: true }), vars: nd(60), say: `${v(ir(60))} continues at line 7: it saves 50 as its left again. 50 was already there, so <b>no change</b>. Line 11 returns <b>60</b>.` },
    { lines: [9, 11], pic: pic([[40, 'ret', 'returns 40']], { done: true }), vars: nd(40), say: `${v(ir(40))} continues at line 9: it saves 60 as its right again (no change) and returns <b>40</b>. ${v('root =')} saves 40 again, so 45 did <b>not</b> become the root. 45 is a new leaf.` },
  ];
}

/** Figures for the recursion lesson: the key step at 50, and the mistake pictures. */
export function recFigs() {
  const before = buildBst(START), after = buildBst([...START, 45]);
  const F = layout(after), W = F.w + 64;
  const o = (extra) => ({ showNil: true, pos: F.pos, minW: W, minH: F.h, ...extra });
  const withLoose = (svg, tag, mark) => loose(svg, W - 26, F.pos[45].y, 45, tag, mark);
  const beforePic = withLoose(svgTree(before, o({ marks: { 50: 'cur' }, tags: { 50: 'node' }, spot: { key: 50, side: 'l' }, label: 'node is 50; its left spot is empty; node 45 was just returned and is not connected yet' })), 'returned', 'new');
  const key = pair('node.left = insertRec(node.left, value);',
    beforePic, 'before: the call below returned 45',
    svgTree(after, o({ marks: { 50: 'cur', 45: 'new' }, tags: { 50: 'node' }, label: '45 is now the left child of 50' })), 'after: 50\'s left is 45');
  const m3 = pair('insertRec(node.left, value);',
    beforePic, 'before: the call below returned 45',
    withLoose(svgTree(before, o({ marks: { 50: 'cur' }, tags: { 50: 'node' }, spot: { key: 50, side: 'l' }, label: '50\'s left is still empty. Node 45 was returned, but nothing saved it, so it is lost.' })), 'lost', 'bad'), 'after: 50\'s left is still empty', true);
  const small = buildBst([20, 10, 30]);
  const m1 = svgTree(small, { marks: { 10: 'cur', 20: 'wait' }, showNil: true, spot: { key: 10, side: 'l' }, label: 'The call on 10\'s empty left spot gets null. Without the null check, it tries to read null.data and crashes.' });
  const m2 = svgTree(before, { marks: { 60: 'bad', 50: 'bad', 70: 'bad' }, label: 'The starting BST with 60, 50, and 70 marked: this right subtree is printed in the wrong order' });
  return { key, m1, m2, m3 };
}
