// Step lists for <CodeWalk>: each step highlights some lines and shows a picture of what they do.
import { node, buildBst, svgTree, layout } from './tree.js';
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
