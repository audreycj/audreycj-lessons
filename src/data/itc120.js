// ITC 120 lesson list. status: 'live' (on the site), 'soon' (being written), 'pdf' (use the PDF module/slides from Discord for now)
export const course = {
  code: 'ITC 120',
  title: 'Data Structures and Algorithms',
  who: 'BSIT 2nd Year · A.Y. 2026–2027, 1st Semester',
  href: '/itc120/',
};

export const terms = [
  {
    id: 'prelim',
    name: 'Prelim topics',
    note: 'Start here. These lessons are the base for everything after them.',
    units: [
      { name: 'Introduction to Data Structures and Algorithms', icon: 'book', lessons: [
        { title: 'Programming refresher', href: '/itc120/programming-refresher/', status: 'live', blurb: 'A quick Java review: variables, expressions, conditions, loops, methods, arrays, trace tables, and the three kinds of errors.' },
        { title: 'Introduction to DSA', href: '/itc120/intro/', status: 'live', blurb: 'Data vs. data structures, linear vs. non-linear structures, and what makes an algorithm. Race simple search against binary search.' },
      ] },
      { name: 'Linear data structures', icon: 'list', lessons: [
        { title: 'Arrays: the four operations', href: '/itc120/arrays/', status: 'live', kind: ['ds', 'algo'], blurb: 'Access, traversal, insertion, and deletion. Watch values shift, step by step.' },
        { title: 'Linked lists', href: '/itc120/linked-lists/', status: 'live', kind: ['ds', 'algo'], blurb: 'Nodes and references in Java. Insert and delete by changing arrows, and see what goes wrong in the wrong order.' },
        { title: 'Stacks', href: '/itc120/stacks/', status: 'live', kind: ['ds'], blurb: 'Last in, first out, like a pile of plates. Push, pop, and peek: traces, a walkthrough, and a stack in Java using an array.' },
        { title: 'Queues', href: '/itc120/queues/', status: 'live', kind: ['ds'], blurb: 'First in, first out, like a canteen line. Enqueue and dequeue with a linked list, then stacks vs. queues side by side.' },
      ] },
      { name: 'Sorting algorithms', icon: 'list', lessons: [
        { title: 'Basic sorting', href: '/itc120/sorting-basic/', status: 'live', kind: ['algo'], blurb: 'Bubble sort, selection sort, and insertion sort, step by step, and how much work each one does.' },
        { title: 'Advanced sorting', href: '/itc120/sorting-advanced/', status: 'live', kind: ['algo'], blurb: 'Merge sort, quick sort, and heap sort, and when each one is the best choice.' },
      ] },
    ],
  },
  {
    id: 'midterm',
    open: true,
    name: 'Midterm topics',
    note: 'Everything you need for the midterm exam. Go in order: each lesson builds on the one before it.',
    units: [
      { name: 'Searching algorithms', icon: 'list', lessons: [
        { title: 'Linear and binary search', href: '/itc120/searching/', status: 'live', kind: ['algo'], blurb: 'Check one by one, or halve the search each time. Both in Java, and how many checks each one needs.' },
      ] },
      { name: 'Trees and binary search trees', icon: 'tree', lessons: [
        { title: 'Trees and binary trees', href: '/itc120/trees/', status: 'live', kind: ['ds'], blurb: 'Root, parent, child, leaf, depth, height. Tap any node to see its family.' },
        { title: 'Binary search trees and BST search', href: '/itc120/bst/', status: 'live', kind: ['ds', 'algo'], blurb: 'The BST rule, searching by hand, and the search method in Java.' },
        { title: 'BST insertion', href: '/itc120/bst-insert/', status: 'live', kind: ['algo'], blurb: 'Inserting by hand, then the insert method in Java. Search, then attach at the null spot. Move current vs. connect a new node.' },
        { title: 'Tree traversals', href: '/itc120/traversals/', status: 'live', kind: ['algo'], blurb: 'Pre-order, in-order, and post-order, step by step.' },
        { title: 'Recursion and traversal code', href: '/itc120/recursion/', status: 'live', kind: ['tech'], blurb: 'Base case, recursive case, and the call stack. Traversals and insert in Java.' },
        { title: 'BST deletion', href: '/itc120/bst-delete/', status: 'live', kind: ['algo'], blurb: 'The three cases, the next value, and deleteRec in Java.' },
      ] },
      { name: 'Balanced trees', icon: 'balance', lessons: [
        { title: 'AVL trees', href: '/itc120/avl-trees/', status: 'live', kind: ['ds', 'algo'], blurb: 'Why a BST can lean, balance factors, and the four rotations. Insert your own numbers and watch the tree fix itself.' },
        { title: 'Red-black trees', href: '/itc120/red-black-trees/', status: 'live', kind: ['ds', 'algo'], blurb: 'The five color rules, and how to fix an insert: red uncle means recolor, black uncle means rotate.' },
      ] },
      { name: 'Graphs', icon: 'graph', lessons: [
        { title: 'Graphs, and how to store them', href: '/itc120/graphs/', status: 'live', kind: ['ds'], blurb: 'Vertices, edges, directed and weighted graphs. Build a graph by tapping an adjacency matrix and watch the list update.' },
        { title: 'Breadth-first search (BFS)', href: '/itc120/bfs/', status: 'live', kind: ['algo'], blurb: 'Visit a graph level by level with a queue. Find levels, shortest paths, and what can be reached.' },
        { title: 'Depth-first search (DFS)', href: '/itc120/dfs/', status: 'live', kind: ['algo'], blurb: 'Go deep with a stack, backtrack at dead ends. Find what is reachable, find a path, and compare with BFS.' },
      ] },
    ],
  },
  {
    id: 'final',
    name: 'Final topics',
    note: 'After the midterm: sets, maps, and hashing.',
    units: [
      { name: 'Sets and maps', icon: 'venn', lessons: [
        { title: 'Sets in Java', href: '/itc120/sets/', status: 'live', kind: ['adt'], blurb: 'Unique, unordered collections. Union, intersection, difference, and symmetric difference on a Venn diagram, then in Java.' },
        { title: 'Maps and hashing in Java', href: '/itc120/maps/', status: 'live', kind: ['adt', 'tech'], blurb: 'Key-value pairs with put, get, remove. Compute a hashCode and bucket index by hand, and look inside a HashMap.' },
      ] },
      { name: 'Hashing', icon: 'venn', lessons: [
        { title: 'Hashing and hash tables', href: '/itc120/hashing/', status: 'live', kind: ['tech', 'ds'], blurb: 'Hash functions, collisions, chaining and open addressing, and how fast a hash table really is.' },
      ] },
    ],
  },
];

/** What each lesson teaches (chips under the lesson title and on the course page). */
export const kindInfo = { ds: 'Data structure', algo: 'Algorithm', adt: 'Abstract data type (ADT)', tech: 'Technique' };
const allLessons = terms.flatMap((t) => t.units.flatMap((u) => u.lessons));
const trim = (p) => String(p).replace(/\/+$/, '');
export function kindOf(path) {
  const l = allLessons.find((x) => trim(path).endsWith(trim(x.href)));
  return (l && l.kind) || [];
}
export function kindLessons() { return allLessons.filter((l) => l.status === 'live' && l.kind); }
