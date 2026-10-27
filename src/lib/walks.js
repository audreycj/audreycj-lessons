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

/** Small before/after pictures for the "two actions" and the mistakes. */
const pair = (a, aCap, b, bCap, mid = '→') => `<div class="ba-pair"><div class="ba-col"><p class="ba-cap">${aCap}</p>${a}</div><span class="ba-arrow" aria-hidden="true">${mid}</span><div class="ba-col"><p class="ba-cap">${bCap}</p>${b}</div></div>`;
export function insertFigs() {
  const small = [40, 20, 60, 50, 70];
  const F = layout(buildBst([...small, 45]));
  const o = (extra) => ({ showNil: true, pos: F.pos, minW: F.w, minH: F.h, ...extra });
  const t1 = buildBst(small);
  const move = pair(
    svgTree(t1, o({ marks: { 60: 'cur' }, tags: { 60: 'current' }, label: 'current refers to 60' })), 'before',
    svgTree(t1, o({ marks: { 50: 'cur' }, tags: { 50: 'current' }, label: 'current now refers to 50; the tree is the same' })), 'after: same tree, arrow moved');
  const t2 = buildBst([...small, 45]);
  const connect = pair(
    svgTree(t1, o({ marks: { 50: 'cur' }, tags: { 50: 'current' }, spot: { key: 50, side: 'l' }, label: 'current refers to 50; its left spot is empty' })), 'before',
    svgTree(t2, o({ marks: { 50: 'cur', 45: 'new' }, tags: { 50: 'current' }, label: '45 is now the left child of 50; current still refers to 50' })), 'after: 45 added, arrow stayed');
  // Mistake 2: 45 is made, but nothing connects it.
  const lost45 = pair(
    svgTree(t1, o({ marks: { 50: 'path' }, spot: { key: 50, side: 'l' }, label: '50 still has an empty left spot' })), 'the tree: 50\'s left is still null',
    svgTree(buildBst([45]), { marks: { 45: 'bad' }, tags: { 45: 'current' }, label: 'Node 45 floating alone, connected to nothing', minW: 110 }), 'node 45: nothing points to it', ' ');
  // Mistake 3: 25 written over 20, so 20, 10, 30 are cut off.
  const big = [40, 20, 60, 10, 30, 50, 70];
  const wrong = { v: 40, l: { v: 25, l: null, r: null }, r: buildBst([60, 50, 70]) };
  const cut = pair(
    svgTree(wrong, { marks: { 25: 'bad' }, label: 'The tree after the mistake: 40 with 25 on its left, and 60, 50, 70 on its right' }), 'the tree after the mistake',
    svgTree(buildBst([20, 10, 30]), { marks: { 20: 'skip', 10: 'skip', 30: 'skip' }, label: '20, 10 and 30 cut off from the tree' }), 'cut off: lost!', ' ');
  return { move, connect, lost45, cut, startTree: svgTree(buildBst(big), { label: 'The starting BST: 40, 20, 60, 10, 30, 50, 70' }) };
}
