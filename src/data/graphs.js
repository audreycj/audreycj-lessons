// Example graphs used across the Graphs lessons. Coordinates are in a 340 x 250 drawing box.
const N = (s) => s.trim().split(/\s+/).map((t) => { const [id, x, y] = t.split(','); return { id, x: +x, y: +y }; });
const E = (s, w) => s.trim().split(/\s+/).map((t, i) => { const [a, b] = t.split(''); return w ? { a, b, w: w[i] } : { a, b }; });

/** Main undirected example (7 vertices). */
export const city = {
  directed: false, weighted: false,
  nodes: N('A,50,50 B,170,40 C,290,55 D,45,185 E,165,150 F,290,175 G,190,228'),
  edges: E('AB AD BC BE CF DE EF EG FG'),
};

/** Directed example with a cycle and a vertex that only points out (F). */
export const oneWay = {
  directed: true, weighted: false,
  nodes: N('A,70,60 B,200,50 C,140,150 D,60,210 E,190,220 F,300,150'),
  edges: E('AB BC CA AD DE FD'),
};

/** Two separate pieces (not connected). */
export const islands = {
  directed: false, weighted: false,
  nodes: N('A,50,60 B,150,40 C,110,150 D,230,70 E,300,140 F,230,210 G,300,40'),
  edges: E('AB AC BC DE DF EF'),
};

/** Small undirected, for the first pictures. */
export const small = {
  directed: false, weighted: false,
  nodes: N('A,60,60 B,200,50 C,290,150 D,150,200'),
  edges: E('AB AD BC BD'),
};

/** Small directed (for reading a matrix and list). */
export const smallDir = {
  directed: true, weighted: false,
  nodes: N('A,60,60 B,200,50 C,290,150 D,150,200'),
  edges: E('AB AD BC CA DC'),
};

/** Weighted undirected: travel minutes between places (made-up numbers). */
export const weighted = {
  directed: false, weighted: true,
  nodes: N('A,60,60 B,200,50 C,290,150 D,150,200'),
  edges: E('AB AD BC BD', [7, 4, 12, 5]),
};

/** With a loop (self-edge) on C. */
export const withLoop = {
  directed: true, weighted: false,
  nodes: N('A,60,90 B,200,80 C,290,170 D,150,210'),
  edges: E('AB BC CC CD DA'),
};
