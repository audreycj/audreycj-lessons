// Red-black insertion in Java: the ONE implementation the lesson shows, plus the starter file for the
// coding task (Part 8) and its built-in tests. The page and the QA scripts both read from here, so the
// code students read, the code they download, and the code we test can't drift apart.
// The rotateRight answer is NOT in this file (repo may be public); it is in "Claude outputs/rb-java/".

export const code1 = String.raw`static final boolean RED = true;    // final: never changes
static final boolean BLACK = false; // (a named constant)

static class RBNode {  // static: used by static methods
  int data;
  boolean color;
  RBNode left, right;
  RBNode parent;     // NEW: we need to go back up

  RBNode(int value) {
    data = value;
    color = RED;     // new nodes are always red
  }
}

static RBNode root = null;

// an empty spot (null) counts as black
static boolean isRed(RBNode node) {
  return node != null && node.color == RED;
}`;

export const code2 = String.raw`static void insert(int value) {
  // Step 1: normal BST insert
  RBNode parent = null;
  RBNode current = root;
  while (current != null) {
    parent = current;
    if (value < current.data) {
      current = current.left;
    } else if (value > current.data) {
      current = current.right;
    } else {
      return;               // duplicate: do nothing
    }
  }
  RBNode x = new RBNode(value);   // red
  x.parent = parent;
  if (parent == null) {
    root = x;
  } else if (value < parent.data) {
    parent.left = x;
  } else {
    parent.right = x;
  }
  fixUp(x);                 // Step 2: fix the colors
}`;

export const code3 = String.raw`static void fixUp(RBNode x) {
  while (isRed(x.parent)) {       // red-red problem
    RBNode p = x.parent;
    RBNode g = p.parent;          // grandparent
    if (p == g.left) {
      RBNode u = g.right;         // uncle
      if (isRed(u)) {             // uncle red: recolor
        p.color = BLACK;
        u.color = BLACK;
        g.color = RED;
        x = g;                    // check g next
      } else {                    // uncle black: rotate
        if (x == p.right) {       // triangle (LR)
          rotateLeft(p);
          x = p;
          p = x.parent;
        }
        rotateRight(g);           // line (LL)
        p.color = BLACK;
        g.color = RED;
      }
    } else {                      // mirror image
      RBNode u = g.left;
      if (isRed(u)) {
        p.color = BLACK;
        u.color = BLACK;
        g.color = RED;
        x = g;
      } else {
        if (x == p.left) {        // triangle (RL)
          rotateRight(p);
          x = p;
          p = x.parent;
        }
        rotateLeft(g);            // line (RR)
        p.color = BLACK;
        g.color = RED;
      }
    }
  }
  root.color = BLACK;             // rule 2
}`;

export const code4 = String.raw`static void rotateLeft(RBNode z) {
  RBNode y = z.right;             // y moves up
  z.right = y.left;               // moved child
  if (y.left != null) {
    y.left.parent = z;
  }
  y.parent = z.parent;            // y takes z's spot
  if (z.parent == null) {
    root = y;
  } else if (z == z.parent.left) {
    z.parent.left = y;
  } else {
    z.parent.right = y;
  }
  y.left = z;                     // z goes down, left
  z.parent = y;
}
// rotateRight is the mirror image:
// swap every "left" and "right" above.
// Writing it is your coding task (Part 8).`;

// Coding task (Part 8): write rotateRight. Everything else is supplied, with tests.
export const taskStub = String.raw`// ===== YOUR TASK: rotateRight =====
// The mirror image of rotateLeft above.
// Delete the "throw" line, then write the code.
static void rotateRight(RBNode z) {
  throw new UnsupportedOperationException(
      "rotateRight is not written yet");
}`;

export const testsCode = String.raw`// ===== Tests: no need to change below =====
static int passed = 0, total = 0;
static boolean stopped = false;

// Tree as text: 20B(10R,30R) means 20 is black,
// its left child is 10 (red), its right is 30 (red).
// "-" is an empty spot.
static String text(RBNode n) {
  if (n == null) return "-";
  String s = n.data + (isRed(n) ? "R" : "B");
  if (n.left == null && n.right == null) return s;
  return s + "(" + text(n.left) + ","
           + text(n.right) + ")";
}

// Checks rules 2, 4, 5 and every parent link.
// Returns null if all is well, or what is wrong.
static String why;
static String problems() {
  why = null;
  if (isRed(root)) return "the root is red";
  blacks(root, null);
  return why;
}
static int blacks(RBNode n, RBNode parent) {
  if (n == null) return 1;          // NIL is black
  if (n.parent != parent && why == null)
    why = "wrong parent link at " + n.data;
  if (isRed(n) && isRed(parent) && why == null)
    why = "red-red at " + parent.data
        + " and " + n.data;
  int a = blacks(n.left, n);
  int b = blacks(n.right, n);
  if (a != b && why == null)
    why = "black counts differ below " + n.data;
  return a + (isRed(n) ? 0 : 1);
}

// Inserts the values one by one and checks the
// tree after each one. Stops after 2 seconds, in
// case of an endless loop. Returns null if all
// went well, or what went wrong.
static String tryInsert(int[] values) {
  root = null;
  String[] error = { null };
  Thread t = new Thread(() -> {
    try {
      for (int v : values) {
        insert(v);
        String p = problems();
        if (p != null) {
          error[0] = p + " (right after inserting "
                   + v + ")";
          return;
        }
      }
    } catch (StackOverflowError e) {
      error[0] = "the links form a loop (a node"
               + " points back up to its ancestor)";
    } catch (Throwable e) {
      error[0] = e.toString();
    }
  });
  t.setDaemon(true);
  t.start();
  try {
    t.join(2000);
  } catch (InterruptedException e) { }
  if (t.isAlive()) {
    stopped = true;
    return "still running after 2 seconds"
         + " (endless loop?). Tests stopped.";
  }
  return error[0];
}

static void test(String name, int[] values,
                 String expected) {
  if (stopped) return;
  total++;
  String error = tryInsert(values);
  String got = error == null ? text(root) : "";
  String bad = error != null ? error
      : !got.equals(expected) ? "wrong tree" : null;
  if (bad == null) {
    passed++;
    System.out.println("PASS  " + name);
  } else {
    System.out.println("FAIL  " + name + ": " + bad);
    if (error == null) {
      System.out.println("      expected " + expected);
      System.out.println("      got      " + got);
    }
  }
}

// 300 random lists, checked against the rules
// and against Java's own TreeSet.
static void randomTest() {
  if (stopped) return;
  total++;
  java.util.Random r = new java.util.Random(120);
  for (int t = 0; t < 300; t++) {
    int[] values = new int[r.nextInt(30)];
    java.util.TreeSet<Integer> set =
        new java.util.TreeSet<>();
    for (int i = 0; i < values.length; i++) {
      values[i] = r.nextInt(60);
      set.add(values[i]);
    }
    String bad = tryInsert(values);
    if (bad == null) {
      StringBuilder got = new StringBuilder();
      inOrder(root, got);
      StringBuilder want = new StringBuilder();
      for (int v : set) want.append(v).append(',');
      if (!got.toString().equals(want.toString()))
        bad = "in-order is not sorted, or values"
            + " are missing";
    }
    if (bad != null) {
      System.out.println("FAIL  300 random lists: "
          + bad);
      System.out.println("      list: "
          + java.util.Arrays.toString(values));
      return;
    }
  }
  passed++;
  System.out.println("PASS  300 random lists");
}
static void inOrder(RBNode n, StringBuilder sb) {
  if (n == null) return;
  inOrder(n.left, sb);
  sb.append(n.data).append(',');
  inOrder(n.right, sb);
}

// Prints the tree for your own numbers.
static void show(int[] values) {
  String error = tryInsert(values);
  System.out.println();
  System.out.println("Your numbers: "
      + java.util.Arrays.toString(values));
  if (error != null) {
    System.out.println("Error: " + error);
    return;
  }
  System.out.println("Tree: " + text(root));
  System.out.println("All rules hold.");
}

public static void main(String[] args) {
  test("Uncle red: recolor  (20, 10, 30, 5)",
       new int[] {20, 10, 30, 5}, "20B(10B(5R,-),30B)");
  test("Line RR  (10, 20, 30)",
       new int[] {10, 20, 30}, "20B(10R,30R)");
  test("Line LL  (30, 20, 10)",
       new int[] {30, 20, 10}, "20B(10R,30R)");
  test("Triangle LR  (30, 10, 20)",
       new int[] {30, 10, 20}, "20B(10R,30R)");
  test("Triangle RL  (10, 30, 20)",
       new int[] {10, 30, 20}, "20B(10R,30R)");
  test("Worked example (Part 4)",
       new int[] {5, 45, 25, 10, 35, 75, 70, 90, 60},
       "45B(25R(5B(-,10R),35B),75R(70B(60R,-),90B))");
  test("Problem 2 (Part 5)",
       new int[] {40, 30, 50, 20, 25, 10, 5},
       "40B(25R(10B(5R,20R),30B),50B)");
  randomTest();
  System.out.println();
  System.out.println(passed + " of " + total
      + " tests passed.");

  // Try your own numbers: change the list below.
  show(new int[] {50, 40, 30, 20, 10});
}`;

const indent = (s) => s.split('\n').map((l) => (l ? '  ' + l : l)).join('\n');

/** The whole file students copy into an online compiler. `rotateRight` replaces the stub (QA only). */
export function starterFile(rotateRight = taskStub) {
  return `// ITC 120 · Red-black tree insertion · coding task
// 1. Copy this whole file into an online Java
//    compiler. The class must be called Main.
// 2. Press Run once first. Some tests FAIL: that
//    is expected, because rotateRight is missing.
// 3. Find "YOUR TASK", write rotateRight, and run
//    again until every test says PASS.
public class Main {

${indent(code1)}

${indent(code2)}

${indent(code3)}

${indent(code4)}

${indent(rotateRight)}

${indent(testsCode)}
}
`;
}
