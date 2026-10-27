// Step lists for <CodeWalk>: each step highlights some lines and shows a picture of what they do.
import { node, buildBst, bstInsert, svgTree, layout, clone } from './tree.js';
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
  `<div class="ba${bad ? ' is-bad' : ''}">${code ? `<p class="ba-run"><span class="ba-run-k">${bad ? 'The buggy line runs:' : 'This line runs:'}</span> <code>${code}</code></p>` : ''}` +
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

/* ---------------- BST deletion lesson: figures, step shows, walkthroughs ---------------- */

export const deleteCode = String.raw`static TreeNode deleteRec(TreeNode node,
                          int value) {
  if (node == null) {                            // not found
    return null;
  }
  if (value < node.data) {                       // search
    node.left = deleteRec(node.left, value);
  } else if (value > node.data) {
    node.right = deleteRec(node.right, value);
  } else {
    // found it
    if (node.left == null) {                     // case 1, 2
      return node.right;
    }
    if (node.right == null) {
      return node.left;
    }
    TreeNode successor = node.right;             // case 3
    while (successor.left != null) {
      successor = successor.left;
    }
    node.data = successor.data;
    node.right = deleteRec(node.right,
                           successor.data);
  }
  return node;
}`;

// Every node keeps an id (its first value), so a spot keeps its place and marks even after a new value is copied in.
const ids = (n) => { if (n) { n.id = n.v; ids(n.l); ids(n.r); } return n; };
export const T = (vals) => ids(buildBst(vals));
const edit = (n, id, f) => { if (!n) return n; if (String(n.id) === String(id)) return f(n); n.l = edit(n.l, id, f); n.r = edit(n.r, id, f); return n; };
const drop = (t, id) => edit(clone(t), id, () => null);
const lift = (t, id) => edit(clone(t), id, (n) => n.l || n.r);
const setv = (t, id, v) => edit(clone(t), id, (n) => ({ ...n, v }));

/** The sorted (in-order) list drawn under the tree, each box right below its node, with dotted lines. */
function sortedPic(t, del, next, label) {
  const L = layout(t), y0 = L.h + 16;
  let add = '';
  for (const [k, p] of Object.entries(L.pos)) {
    const m = String(k) === String(del) ? 'm-bad' : String(k) === String(next) ? 'm-moved' : '';
    add += `<line class="sl-dot" x1="${p.x}" y1="${p.y + 19}" x2="${p.x}" y2="${y0 - 2}"/><g class="t-node ${m}"><rect class="sl-box" x="${p.x - 17}" y="${y0}" width="34" height="28" rx="3"/><text x="${p.x}" y="${y0 + 14}">${p.n.v}</text></g>`;
    if (m === 'm-moved') add += `<text class="t-tag" x="${p.x}" y="${y0 + 44}">next value</text>`;
  }
  return svgTree(t, { marks: { [del]: 'bad', [next]: 'moved' }, minH: L.h + 64, label }).replace(/<\/svg>$/, add + '</svg>');
}

/** Linked-list delete: 60 → 50 → 45, then 60 skips 50 and points to 45. */
function listSkip() {
  const box = (x, y, val, cls = '') => `<g class="t-node ${cls}"><rect class="sl-box" x="${x}" y="${y}" width="52" height="34" rx="4"/><text x="${x + 26}" y="${y + 17}">${val}</text></g>`;
  const arr = (x1, x2, y) => `<line class="ls-arrow" x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}"/><path class="ls-head" d="M${x2} ${y} l-9 -5 v10 z"/>`;
  let s = `<svg class="tree-svg" viewBox="0 0 300 168" style="max-width:345px" role="img" aria-label="Before: 60 points to 50, and 50 points to 45. After: 60 skips 50 and points straight to 45.">`;
  s += `<text class="t-tag" x="10" y="16" style="text-anchor:start">before</text>` + box(10, 26, 60) + arr(62, 124, 43) + box(124, 26, 50, 'm-bad') + arr(176, 238, 43) + box(238, 26, 45);
  s += `<text class="t-tag" x="10" y="100" style="text-anchor:start">after</text>` + box(10, 116, 60) + box(124, 116, 50, 'm-skip') + box(238, 116, 45, 'm-moved');
  s += `<path class="ls-arrow" d="M36 116 Q 150 66 260 112" fill="none"/><path class="ls-head" d="M264 116 l-3 -10 l-7 7 z"/><text class="t-tag" x="150" y="96">skips 50</text>`;
  return s + '</svg>';
}

export function delFigs() {
  const start = T(START), F = layout(start);
  const fx = (extra) => ({ pos: F.pos, minW: F.w, minH: F.h, ...extra });
  const wc = T([...START, 45]), ws = T([...START, 45, 42, 48]), w55 = T([...START, 55]);
  // Part 1: just removing 20 would cut off 10 and 30.
  let cutAfter = svgTree(drop(start, 20), fx({ label: 'After removing only 20: 40 has no left child, and 10 and 30 float alone, cut off from the tree' }));
  cutAfter = loose(loose(cutAfter, F.pos[10].x, F.pos[10].y, 10, 'cut off', 'skip'), F.pos[30].x, F.pos[30].y, 30, 'cut off', 'skip');
  const cut = pair('', svgTree(start, fx({ marks: { 20: 'bad' }, tags: { 20: 'remove?' }, label: 'The starting BST with 20 marked to remove' })), 'before: just remove 20?', cutAfter, 'after: 10 and 30 are cut off', true);
  // Case 1: delete 10.
  const case1 = pair('', svgTree(start, { marks: { 40: 'path', 20: 'path', 10: 'bad' }, tags: { 10: 'delete' }, label: 'Find 10: 40, then 20, then 10' }), 'before: delete 10 (a leaf)',
    svgTree(drop(start, 10), { showNil: true, spot: { key: 20, side: 'l' }, label: '10 is gone; 20\'s left is now null' }), 'after: 20\'s left is null');
  // Case 2: delete 50 (one child), then the same with a subtree under 45.
  const case2 = pair('', svgTree(wc, { marks: { 40: 'path', 60: 'path', 50: 'bad', 45: 'moved' }, tags: { 50: 'delete' }, label: 'Find 50: 40, then 60, then 50. 50 has one child, 45.' }), 'before: delete 50 (one child)',
    svgTree(lift(wc, 50), { marks: { 45: 'moved' }, tags: { 45: 'moved up' }, label: '45 moved up: 60\'s left is now 45' }), 'after: 60\'s left is 45');
  const case2sub = pair('', svgTree(ws, { marks: { 50: 'bad', 45: 'moved', 42: 'moved', 48: 'moved' }, tags: { 50: 'delete' }, label: 'Delete 50. Its one child, 45, has children 42 and 48.' }), 'before: delete 50',
    svgTree(lift(ws, 50), { marks: { 45: 'moved', 42: 'moved', 48: 'moved' }, label: '45, 42, and 48 moved up together' }), 'after: 45, 42, 48 moved up together');
  // Case 3 pictures.
  const two = svgTree(start, { marks: { 20: 'bad', 10: 'moved', 30: 'moved' }, tags: { 20: 'delete' }, label: '20 has two children, 10 and 30, but there is only one spot' });
  const sorted = sortedPic(start, 20, 30, 'The starting BST with its sorted list below; each node sits right above its box. The box right after 20 is 30.');
  const succ40 = svgTree(ws, { marks: { 40: 'bad', 60: 'path', 50: 'path', 45: 'path', 42: 'moved' }, tags: { 42: 'next value' }, label: 'Next value after 40: right to 60, then left to 50, 45, 42' });
  const why = svgTree(ws, { marks: { 40: 'bad', 60: 'wait', 50: 'wait', 70: 'wait', 45: 'wait', 48: 'wait', 42: 'new' }, tags: { 42: 'smallest' }, label: 'Everything on 40\'s right side is bigger than 40 (yellow). The node furthest left there, 42, is the smallest of them.' });
  const succ20 = svgTree(start, { marks: { 20: 'bad', 30: 'moved' }, tags: { 30: 'next value' }, label: 'For 20: right once to 30. No left child, so stop.' });
  const n55 = svgTree(w55, { marks: { 40: 'bad', 60: 'path', 50: 'moved', 55: 'wait' }, tags: { 50: 'next value', 55: 'right child' }, label: '50 is the next value after 40. It has no left child, only a right child, 55.' });
  // Java: when the next value has a child; why root = matters.
  const c55 = setv(w55, 40, 50);
  const with55 = pair('node.right = deleteRec(node.right, successor.data);',
    svgTree(c55, { marks: { 40: 'new', 50: 'bad', 55: 'moved' }, tags: { 40: 'copy', 50: 'old 50' }, label: 'Line 22 copied 50 into the root. The old 50 is still there, with its right child 55.' }), 'before: 50 copied into the root',
    svgTree(lift(c55, 50), { marks: { 40: 'new', 55: 'moved' }, tags: { 55: 'moved up' }, label: 'The old 50 is removed (case 2): 60\'s left is now 55' }), 'after: old 50 removed (case 2)');
  const rootPair = pair('root = deleteRec(root, 20);',
    svgTree(T([20, 30]), { marks: { 20: 'bad', 30: 'moved' }, tags: { 20: 'root' }, label: 'A small tree: root 20 with one right child, 30' }), 'before: root is 20',
    svgTree(T([30]), { marks: { 30: 'moved' }, tags: { 30: 'root' }, label: '30 is now the root' }), 'after: root is 30');
  // Mistakes.
  const m1 = pair('deleteRec(node.left, value);',
    svgTree(start, { marks: { 20: 'cur', 10: 'bad' }, tags: { 20: 'node', 10: 'delete' }, label: 'Delete 10. The call for 20 calls on its left child, 10.' }), 'before: delete 10',
    svgTree(start, { marks: { 20: 'cur', 10: 'bad' }, tags: { 20: 'node', 10: 'still here' }, label: 'The call for 10 returned null, but nobody saved it. 20\'s left still points to 10.' }), 'after: 10 is still there', true);
  const c20 = setv(start, 20, 30);
  const m2 = pair('node.data = successor.data;',
    svgTree(start, { marks: { 20: 'bad', 30: 'moved' }, tags: { 20: 'delete', 30: 'next value' }, label: 'Delete 20; its next value is 30' }), 'before: delete 20',
    svgTree(c20, { marks: { 20: 'bad', 30: 'bad' }, tags: { 20: 'copy', 30: 'old 30' }, label: '30 was copied into 20\'s spot, but the old 30 was never removed: 30 appears twice' }), 'after: 30 appears twice', true);
  const broken = { v: 60, id: 'r', l: T([20, 10, 30]), r: { v: 70, id: 70, l: { v: 50, id: 50, l: null, r: null }, r: null } };
  const m3 = pair('node.data = node.right.data;',
    svgTree(start, { marks: { 40: 'bad', 60: 'moved' }, tags: { 40: 'delete', 60: 'right child' }, label: 'Delete 40. Someone takes its right child, 60, as the new value.' }), 'before: delete 40',
    svgTree(broken, { marks: { r: 'new', 50: 'bad' }, tags: { r: 'root', 50: '50 < 60' }, label: 'The root is now 60, but 50 is in its right subtree, and 50 is less than 60. The BST rule is broken.' }), 'after: 50 is on the wrong side', true);
  return { cut, case1, case2, case2sub, list: listSkip(), two, sorted, succ40, why, succ20, n55, with55, rootPair, m1, m2, m3,
    startTree: svgTree(start, { label: 'The starting BST: 40; 20 and 60; 10, 30, 50, 70' }) };
}

/** Delete 20 and delete the root 40, by hand: five pictures each (find, next value, copy, remove old, done). */
export function caseThreeShows() {
  const start = T(START), F = layout(start);
  const p = (t, marks, tags, label) => svgTree(t, { marks, tags, pos: F.pos, minW: F.w, minH: F.h, label });
  const show = (d, nx, findPath, nextPath, findSay, nextSay) => {
    const c = setv(start, d, nx), done = drop(c, nx);
    return [
      { pic: p(start, { ...findPath, [d]: 'bad' }, { [d]: 'delete' }, `Find ${d}`), say: `<b>Step 1. Find ${d}.</b> ${findSay} It has two children: <span class="w-key">case 3</span>.` },
      { pic: p(start, { [d]: 'bad', ...nextPath, [nx]: 'moved' }, { [d]: 'delete', [nx]: 'next value' }, `The next value after ${d} is ${nx}`), say: `<b>Step 2. Find its next value.</b> ${nextSay}` },
      { pic: p(c, { [d]: 'new', [nx]: 'moved' }, { [d]: 'copy', [nx]: 'old ' + nx }, `${nx} copied into ${d}'s spot; ${nx} appears twice`), say: `<b>Step 3. Copy ${nx} into ${d}'s spot.</b> ${d} is gone. But now <b>${nx} appears twice</b>.` },
      { pic: p(c, { [d]: 'new', [nx]: 'bad' }, { [nx]: 'remove' }, `Remove the old ${nx}`), say: `<b>Step 4. Remove the old ${nx}.</b> It is a leaf, so this is just <span class="w-key">case 1</span>.` },
      { pic: p(done, { [d]: 'new' }, {}, `Done: ${nx} is in ${d}'s old spot`), say: `<b>Step 5. Done.</b> ${d}'s old spot now holds ${nx}. In-order: ${[10, 20, 30, 40, 50, 60, 70].filter((x) => x !== d).join(' ')}. Still sorted, and every node is still connected. ✓` },
    ];
  };
  return {
    del20: show(20, 30, { 40: 'path' }, {}, '20 &lt; 40, so go left. Found.', 'Right once to 30. 30 has no left child, so stop. The next value is <b>30</b>.'),
    del40: show(40, 50, {}, { 60: 'path' }, '40 is the root, so we find it right away.', 'Right once to 60. Then left to 50. 50 has no left child, so stop. The next value is <b>50</b>.'),
  };
}

/** Tap-a-node data: which case is each node? (tree with 45 under 50) */
export function caseTaps() {
  const t = T([...START, 45]);
  const out = {};
  (function walk(n) {
    if (!n) return;
    const kids = [n.l, n.r].filter(Boolean).map((k) => k.v);
    const marks = { [n.v]: 'bad' };
    let say;
    if (!kids.length) say = `<b>${n.v}</b> has no children: <span class="w-key">case 1</span>. Just remove it.`;
    else if (kids.length === 1) { marks[kids[0]] = 'moved'; say = `<b>${n.v}</b> has one child (${kids[0]}): <span class="w-key">case 2</span>. ${kids[0]} moves up into its place.`; }
    else { kids.forEach((k) => (marks[k] = 'wait')); say = `<b>${n.v}</b> has two children (${kids.join(' and ')}): <span class="w-key">case 3</span>. Both cannot move up into one spot, so the spot stays and gets a new value (Part 4).`; }
    out[n.v] = { pic: svgTree(t, { marks, label: `${n.v} is selected` }), say };
    walk(n.l); walk(n.r);
  })(t);
  return { base: svgTree(t, { label: 'A BST: 40; 20 and 60; 10, 30, 50, 70; 45 under 50' }), picks: out };
}

/** Tap-a-node data: the next value of each node (tree with 45, 42, 48). */
export function nextTaps() {
  const t = T([...START, 45, 42, 48]);
  const out = {};
  (function walk(n) {
    if (!n) return;
    const marks = { [n.v]: 'bad' }, tags = {};
    let say;
    if (!n.r) say = `<b>${n.v}</b> has no right child, so the rule cannot start. That is fine: deleting ${n.v} is case 1 or case 2, so we never need its next value.`;
    else {
      let s = n.r; const lefts = [];
      marks[s.v] = 'path';
      while (s.l) { s = s.l; lefts.push(s.v); marks[s.v] = 'path'; }
      marks[s.v] = 'moved'; tags[s.v] = 'next value';
      say = `Next value after <b>${n.v}</b>: right once (${n.r.v}), ${lefts.length ? `then left: ${lefts.join(', ')}. ${s.v} has no left child, so stop` : `${n.r.v} has no left child, so stop right away`}: <b>${s.v}</b>.`;
    }
    out[n.v] = { pic: svgTree(t, { marks, tags, label: `${n.v} is selected` }), say };
    walk(n.l); walk(n.r);
  })(t);
  return { base: svgTree(t, { label: 'A BST: 40; 20 and 60; 10, 30, 50, 70; 45 under 50; 42 and 48 under 45' }), picks: out };
}

/** Call stack + tree for deleteRec walkthroughs. fr: [[label, id, state, note], ...] newest first. */
function delPic(t, F, fr, o = {}) {
  const marks = { ...(o.marks || {}) };
  fr.forEach(([, id, st]) => { if (marks[id] == null) marks[id] = st === 'wait' ? 'wait' : 'cur'; });
  const tags = { ...(fr[0] ? { [fr[0][1]]: 'node' } : {}), ...(o.tags || {}) };
  let tree = svgTree(t, { marks, tags, pos: F.pos, minW: F.w, minH: F.h, label: o.label || 'The tree' });
  if (o.ghost) tree = loose(tree, F.pos[o.ghost].x, F.pos[o.ghost].y, o.ghost, 'cut out', 'skip');
  return stackPic({ tree, frames: fr.map(([lab, , st, note]) => [`call for ${lab}`, st, note]), rows: 3 });
}

/** deleteRec(root, 50) where 50 has one child, 45: going down, case 2, coming back up. */
export function delete50Steps() {
  const t = T([...START, 45]), F = layout(t), after = lift(t, 50);
  const P = (fr, o) => delPic(o && o.after ? after : t, F, fr, o);
  const nd = (x) => [['node', `→ ${x}`], ['value', '= 50']];
  const w40 = ['40', 40, 'wait', 'paused at line 9'], w60 = ['60', 60, 'wait', 'paused at line 7'];
  return [
    { lines: [1, 2], pic: P([['40', 40, 'run', 'running']]), vars: nd(40), say: `We type ${v('root = deleteRec(root, 50);')} The first call gets ${v('node')} → <b>40</b> (the root) and ${v('value')} = 50. <span class="cw-aside">"Call for 40" is our name for the call whose ${v('node')} points to 40.</span>` },
    { lines: [3], pic: P([['40', 40, 'run', 'running']]), vars: nd(40), say: `Is ${v('node')} null? No. Skip line 4.` },
    { lines: [6, 8], pic: P([['40', 40, 'run', 'running']]), vars: nd(40), say: `Is 50 &lt; 40? No. Is 50 &gt; 40? <b>Yes</b>: 50 is on the <span class="w-right">right</span>.` },
    { lines: [9], pic: P([['60', 60, 'run', 'running'], w40]), vars: nd(60), say: `Line 9 makes a new call on 40's right child, <b>60</b>, with the same ${v('value')}, 50. The call for 40 pauses at line 9, waiting for a node to save in ${v('node.right')}.` },
    { lines: [3, 6], pic: P([['60', 60, 'run', 'running'], w40]), vars: nd(60), say: `At 60: not null. Is 50 &lt; 60? <b>Yes</b>: go <span class="w-left">left</span>.` },
    { lines: [7], pic: P([['50', 50, 'run', 'running'], w60, w40]), vars: nd(50), say: `Line 7 calls on 60's left child, <b>50</b>. The call for 60 pauses at line 7.` },
    { lines: [3, 6, 8, 10], pic: P([['50', 50, 'run', 'running'], w60, w40]), vars: nd(50), say: `At 50: not null, not smaller, not larger. So the ${v('else')} on line 10 runs: <b>found it</b>.` },
    { lines: [12], pic: P([['50', 50, 'run', 'running'], w60, w40], { marks: { 45: 'moved' } }), vars: nd(50), say: `Is 50's left null? No, it is 45. Skip line 13.` },
    { lines: [15, 16], pic: P([['50', 50, 'ret', 'returns 45'], w60, w40], { marks: { 50: 'bad', 45: 'moved' } }), vars: nd(50), say: `Is 50's right null? <b>Yes.</b> 50 has one child: <span class="w-key">case 2</span>. Line 16 gives back its left child, <b>45</b>: the node that takes 50's place.` },
    { lines: [7], pic: P([['60', 60, 'run', 'saves 45 as its left'], w40], { after: true, ghost: 50, marks: { 45: 'moved' } }), vars: nd(60), say: `Back in the call for 60, at line 7. The right side of ${v('=')} gave back 45, and ${v('node.left =')} stores it. 60's left is now 45: <b>50 is cut out</b>.` },
    { lines: [26], pic: P([['60', 60, 'ret', 'returns 60'], w40], { after: true, marks: { 45: 'moved' } }), vars: nd(60), say: `${v('return node;')} The call for 60 gives back <b>60</b>, its own node.` },
    { lines: [9, 26], pic: P([['40', 40, 'ret', 'returns 40']], { after: true, marks: { 45: 'moved' } }), vars: nd(40), say: `The call for 40 continues at line 9: it saves 60 as its right again (no change) and returns <b>40</b>. Finally ${v('root =')} saves 40, so the root stays 40.` },
  ];
}

/** deleteRec(root, 20): case 3, with the successor loop and the extra call that removes the old 30. */
export function delete20Steps() {
  const t = T(START), F = layout(t), c = setv(t, 20, 30), done = drop(c, 30);
  const nd = (x, val = 20) => [['node', `→ ${x}`], ['value', `= ${val}`]];
  const w40 = ['40', 40, 'wait', 'paused at line 7'], w20 = ['20', 20, 'wait', 'paused at line 23'];
  const run20 = ['20', 20, 'run', 'running'];
  const spot = [['node', '→ 20\'s spot'], ['value', '= 20']];
  return [
    { lines: [1, 2], pic: delPic(t, F, [['40', 40, 'run', 'running']]), vars: nd(40), say: `We type ${v('root = deleteRec(root, 20);')} The first call: ${v('node')} → 40, ${v('value')} = 20.` },
    { lines: [6, 7], pic: delPic(t, F, [run20, w40]), vars: nd(20), say: `20 &lt; 40, so line 7 calls on 40's left child, <b>20</b>. The call for 40 pauses at line 7.` },
    { lines: [3, 6, 8, 10], pic: delPic(t, F, [run20, w40]), vars: nd(20), say: `At 20: not null, not smaller, not larger: <b>found it</b>.` },
    { lines: [12, 15], pic: delPic(t, F, [run20, w40], { marks: { 10: 'wait', 30: 'wait' } }), vars: nd(20), say: `Is 20's left null? No (10). Is its right null? No (30). Two children: <span class="w-key">case 3</span>. Lines 13 and 16 do not run.` },
    { lines: [18], pic: delPic(t, F, [run20, w40], { marks: { 30: 'moved' }, tags: { 30: 'successor' } }), vars: [...nd(20), ['successor', '→ 30']], say: `Line 18 makes a new variable, ${v('successor')}, and starts it at 20's right child, <b>30</b>. That is "right once."` },
    { lines: [19], pic: delPic(t, F, [run20, w40], { marks: { 30: 'moved' }, tags: { 30: 'successor' } }), vars: [...nd(20), ['successor', '→ 30']], say: `Does 30 have a left child? No, so line 20 never runs. ${v('successor')} stays at 30: the next value. ("Left, left, left…" is zero steps here.)` },
    { lines: [22], pic: delPic(c, F, [run20, w40], { marks: { 20: 'new', 30: 'moved' }, tags: { 30: 'successor' } }), vars: [['node', '→ 20\'s spot'], ['node.data', '= 30']], say: `${v('node.data = successor.data;')} copies 30 into 20's spot. 20 is gone, but now <b>30 appears twice</b>.` },
    { lines: [23, 24], pic: delPic(c, F, [['old 30', 30, 'run', 'running'], w20, w40], { marks: { 20: 'new' } }), vars: nd('old 30', 30), say: `Lines 23–24 make one more call, on the right subtree, with ${v('value')} = ${v('successor.data')} = <b>30</b>. Its job: remove the old 30. <span class="cw-aside">The paused call for 20 still has ${v('value')} = 20, even though its ${v('node.data')} is now 30.</span>` },
    { lines: [3, 6, 8, 10, 12, 13], pic: delPic(c, F, [['old 30', 30, 'ret', 'returns null'], w20, w40], { marks: { 20: 'new', 30: 'bad' } }), vars: nd('old 30', 30), say: `In the new call, 30 is not smaller or larger than 30: found. Its left is null, so line 13 returns its right, which is also <b>null</b>. The old 30 is a leaf: <span class="w-key">case 1</span>.` },
    { lines: [23], pic: delPic(done, F, [['20', 20, 'run', 'saves null as its right'], w40], { marks: { 20: 'new' } }), vars: spot, say: `Back in the call for 20, ${v('node.right =')} saves that null. <b>The old 30 is gone.</b>` },
    { lines: [26], pic: delPic(done, F, [['20', 20, 'ret', 'returns its node (now 30)'], w40], { marks: { 20: 'new' } }), vars: spot, say: `${v('return node;')} gives back the same node: 20's old spot, which now holds 30.` },
    { lines: [7, 26], pic: delPic(done, F, [['40', 40, 'ret', 'returns 40']], { marks: { 20: 'new' } }), vars: nd(40), say: `The call for 40 saves that node as its left again (same node, no change) and returns 40. ${v('root =')} saves 40. In-order: <b>10 30 40 50 60 70</b> ✓` },
  ];
}
