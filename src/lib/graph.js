// Graph model, BFS/DFS step recorders, and SVG drawing.
// A graph: { directed, weighted, nodes: [{ id, x, y }], edges: [{ a, b, w? }] }
// Neighbors are always visited in alphabetical order (the usual exam rule when none is given).

export function hasEdge(g, a, b) {
  return g.edges.some((e) => (e.a === a && e.b === b) || (!g.directed && e.a === b && e.b === a));
}

export function neighbors(g, id) {
  const out = new Set();
  for (const e of g.edges) {
    if (e.a === id) out.add(e.b);
    if (!g.directed && e.b === id) out.add(e.a);
  }
  return [...out].sort();
}

export function ids(g) { return g.nodes.map((n) => n.id); }

export function matrix(g) {
  const I = ids(g);
  return I.map((a) => I.map((b) => {
    const e = g.edges.find((x) => (x.a === a && x.b === b) || (!g.directed && x.a === b && x.b === a));
    return e ? (g.weighted ? e.w : 1) : 0;
  }));
}

export function inDegree(g, id) { return g.edges.filter((e) => e.b === id).length; }
export function outDegree(g, id) { return g.edges.filter((e) => e.a === id).length; }
export function degree(g, id) { return g.edges.reduce((s, e) => s + (e.a === id ? 1 : 0) + (e.b === id ? 1 : 0), 0); }

/* ---------------- BFS ---------------- */
export function bfsSteps(g, start) {
  const steps = [];
  const seen = new Set([start]);
  const level = { [start]: 0 };
  const parent = {};
  const queue = [start];
  const order = [];
  const tree = [];
  const S = (caption, current = null, look = []) => steps.push({
    caption, current, look: [...look], ds: [...queue], order: [...order],
    seen: [...seen], level: { ...level }, tree: tree.map((t) => [...t]),
  });
  S(`Start at <b>${start}</b>. Mark it as seen and put it in the queue.`);
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    S(`<b>Dequeue ${u}</b> from the front of the queue and visit it. Visited so far: ${order.join(', ')}.`, u);
    const nb = neighbors(g, u);
    const added = [], skipped = [];
    for (const v of nb) {
      if (!seen.has(v)) { seen.add(v); level[v] = level[u] + 1; parent[v] = u; queue.push(v); tree.push([u, v]); added.push(v); }
      else skipped.push(v);
    }
    let cap = nb.length
      ? `Neighbors of ${u} (in alphabetical order): ${nb.join(', ')}. `
      : `${u} has no ${g.directed ? 'outgoing edges' : 'neighbors'}. `;
    if (added.length) cap += `<b>Enqueue ${added.join(', ')}</b> (not seen yet; level ${level[u] + 1}). `;
    if (skipped.length) cap += `Skip ${skipped.join(', ')} (already seen). `;
    if (!nb.length || (!added.length && nb.length)) cap += 'Nothing new to add.';
    if (nb.length) S(cap.trim(), u, nb); else S(cap.trim(), u);
  }
  const missed = ids(g).filter((x) => !seen.has(x));
  S(`The queue is empty, so BFS is done. <b>BFS order: ${order.join(', ')}</b>.${missed.length ? ` ${missed.join(', ')} ${missed.length > 1 ? 'were' : 'was'} never reached: there is no path from ${start}.` : ''}`, null);
  return { steps, order, level, parent, missed };
}

/* ---------------- DFS (recursive order, shown with an explicit stack of the current path) ---------------- */
export function dfsSteps(g, start) {
  const steps = [];
  const seen = new Set([start]);
  const stack = [start];
  const order = [start];
  const tree = [];
  const S = (caption, current = null, look = []) => steps.push({
    caption, current, look: [...look], ds: [...stack], order: [...order],
    seen: [...seen], level: {}, tree: tree.map((t) => [...t]),
  });
  S(`Start at <b>${start}</b>. Visit it and push it onto the stack.`, start);
  while (stack.length) {
    const u = stack[stack.length - 1];
    const nb = neighbors(g, u);
    const v = nb.find((x) => !seen.has(x));
    if (v) {
      seen.add(v); stack.push(v); order.push(v); tree.push([u, v]);
      const skipped = nb.slice(0, nb.indexOf(v));
      S(`At <b>${u}</b> (top of the stack). Neighbors: ${nb.join(', ')}. ${skipped.length ? `${skipped.join(', ')} already visited. ` : ''}The first unvisited one is <b>${v}</b>: go deeper. <b>Push ${v}</b> and visit it.`, v, []);
    } else {
      stack.pop();
      S(`At <b>${u}</b>. ${nb.length > 1 ? `All its neighbors (${nb.join(', ')}) are already visited.` : nb.length ? `Its only neighbor, ${nb[0]}, is already visited.` : `${u} has no ${g.directed ? 'outgoing edges' : 'neighbors'}.`} Dead end: <b>pop ${u}</b>${stack.length ? ` and go back to ${stack[stack.length - 1]}` : ''}.`, stack.length ? stack[stack.length - 1] : null, []);
    }
  }
  const missed = ids(g).filter((x) => !seen.has(x));
  steps[steps.length - 1].caption += ` The stack is empty, so DFS is done. <b>DFS order: ${order.join(', ')}</b>.${missed.length ? ` ${missed.join(', ')} ${missed.length > 1 ? 'were' : 'was'} never reached from ${start}.` : ''}`;
  return { steps, order, missed };
}

/* ---------------- SVG ---------------- */
const NR = 17;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Level/name labels (chat 65): try top-right first, then other spots around the vertex; pick the first spot that
// stays clear of every edge, every vertex, and labels already placed (else the clearest one).
function segDist(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
  let t = L2 ? ((px - x1) * dx + (py - y1) * dy) / L2 : 0; t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}
function labelSpot(g, P, n, text, placed, box, at) {
  const W = text.length * 8.2 + 2, H = 14, x = n.x, y = n.y;
  const C = [[x + NR + 3, y - NR + 2], [x + NR + 3, y + NR - 2], [x - NR - 3 - W, y - NR + 2], [x - NR - 3 - W, y + NR - 2],
    [x - W / 2, y - NR - 11], [x - W / 2, y + NR + 11], [x + NR + 6, y], [x - NR - 6 - W, y]];
  const named = { tr: 0, br: 1, tl: 2, bl: 3, t: 4, b: 5, r: 6, l: 7 };
  if (at && named[at] != null) { const sp = C[named[at]]; placed.push([sp[0], sp[1], W]); return sp; }
  let best = C[0], bestC = -1e9;
  for (const [lx, ly] of C) {
    const pts = [];
    for (let i = 0; i <= 4; i++) for (const yy of [ly - H / 2, ly, ly + H / 2]) pts.push([lx + (W * i) / 4, yy]);
    let c = 1e9;
    if (box && (lx < box[0] + 2 || lx + W > box[0] + box[2] - 2 || ly - H / 2 < box[1] + 2 || ly + H / 2 > box[1] + box[3] - 2)) continue;
    for (const e of g.edges) { if (e.a === e.b) continue; const a = P[e.a], b = P[e.b]; for (const [px, py] of pts) c = Math.min(c, segDist(px, py, a.x, a.y, b.x, b.y) - 2); }
    for (const m of g.nodes) for (const [px, py] of pts) c = Math.min(c, Math.hypot(px - m.x, py - m.y) - NR);
    for (const q of placed) { const ox = Math.max(0, Math.max(q[0] - (lx + W), lx - (q[0] + q[2]))), oy = Math.max(0, Math.max(q[1] - H / 2 - (ly + H / 2), ly - H / 2 - (q[1] + H / 2))); c = Math.min(c, Math.hypot(ox, oy)); }
    if (c >= 3) { best = [lx, ly]; bestC = c; break; }
    if (c > bestC) { bestC = c; best = [lx, ly]; }
  }
  placed.push([best[0], best[1], W]);
  return best;
}

/**
 * opts: { nodeMarks: {id: class}, edgeMarks: {'A-B': class}, labels: {id: text}, label, w, h }
 * Edge mark keys use 'a-b' in the edge's own direction.
 */
export function svgGraph(g, opts = {}) {
  const w = opts.w || 340, h = opts.h || 250;
  const P = Object.fromEntries(g.nodes.map((n) => [n.id, n]));
  const nm = opts.nodeMarks || {}, em = opts.edgeMarks || {}, lab = opts.labels || {};
  const uid = 'ah' + Math.random().toString(36).slice(2, 7);
  // opts.fit (chat 64): crop the drawing box to the vertices, so small graphs are drawn bigger.
  let vb = `0 0 ${w} ${h}`, mw = Math.round(w * 1.35);
  if (opts.fit) {
    const xs = g.nodes.map((n) => n.x), ys = g.nodes.map((n) => n.y), pad = 30;
    const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad, fw = Math.max(...xs) - Math.min(...xs) + 2 * pad + (opts.padR || 0), fh = Math.max(...ys) - Math.min(...ys) + 2 * pad;
    vb = `${x0} ${y0} ${fw} ${fh}`; mw = Math.round(fw * 1.6);
  }
  let s = `<svg class="graph-svg" viewBox="${vb}" style="max-width:${mw}px" role="img" aria-label="${esc(opts.label || 'Graph diagram')}">`;
  if (g.directed) {
    s += `<defs>${['', 'tree', 'look', 'path', 'ec1', 'ec2', 'ec3', 'ec4', 'ec5'].map((k) => `<marker id="${uid}${k}" viewBox="0 0 10 10" refX="9" refY="5" ${k.startsWith('ec') || k === 'path' || k === 'look' ? 'markerUnits="userSpaceOnUse" markerWidth="17" markerHeight="17"' : 'markerWidth="7" markerHeight="7"'} orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="ah ${k ? 'ah-' + k : ''}"/></marker>`).join('')}</defs>`;
  }
  for (const e of g.edges) {
    const a = P[e.a], b = P[e.b];
    const key = `${e.a}-${e.b}`, rkey = `${e.b}-${e.a}`;
    const mk = em[key] || (!g.directed ? em[rkey] : '') || '';
    const arrow = g.directed ? ` marker-end="url(#${uid}${mk})"` : '';
    if (e.a === e.b) { // self-loop
      // loop points outward, away from the middle of the graph (chat 64); straight up if no direction
      const cx = g.nodes.reduce((t, n) => t + n.x, 0) / g.nodes.length, cy = g.nodes.reduce((t, n) => t + n.y, 0) / g.nodes.length;
      let ux = a.x - cx, uy = a.y - cy; const ul = Math.hypot(ux, uy);
      if (ul < 1) { ux = 0; uy = -1; } else { ux /= ul; uy /= ul; }
      const px = -uy, py = ux, q = (n) => n.toFixed(1);
      const pt = (f, g2) => `${q(a.x + ux * f + px * g2)} ${q(a.y + uy * f + py * g2)}`;
      s += `<path class="g-edge ${mk ? 'e-' + mk : ''}" data-e="${e.a}-${e.b}" d="M ${pt(NR - 2, -8)} C ${pt(58, -30)}, ${pt(58, 30)}, ${pt(NR - 2, 8)}" fill="none"${arrow}/>`;
      if (g.weighted) s += `<text class="g-w" x="${q(a.x + ux * 52)}" y="${q(a.y + uy * 52)}">${e.w}</text>`;
      continue;
    }
    let dx = b.x - a.x, dy = b.y - a.y; const L = Math.hypot(dx, dy); dx /= L; dy /= L;
    let ox = 0, oy = 0;
    if (g.directed && g.edges.some((f) => f.a === e.b && f.b === e.a)) { ox = -dy * 5; oy = dx * 5; }
    const x1 = a.x + dx * NR + ox, y1 = a.y + dy * NR + oy;
    const x2 = b.x - dx * (NR + (g.directed ? 3 : 0)) + ox, y2 = b.y - dy * (NR + (g.directed ? 3 : 0)) + oy;
    s += `<line class="g-edge ${mk ? 'e-' + mk : ''}${e.cut ? ' e-cut' : ''}" data-e="${e.a}-${e.b}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"${arrow}/>`;
    if (e.cut) s += `<text class="g-cut" x="${((a.x + b.x) / 2).toFixed(1)}" y="${((a.y + b.y) / 2).toFixed(1)}">✗</text>`; // flooded road (chat 64)
    if (g.weighted) {
      const mx = (a.x + b.x) / 2 + ox * 2, my = (a.y + b.y) / 2 + oy * 2;
      s += `<g class="g-wbox"><rect x="${mx - 11}" y="${my - 9}" width="22" height="18" rx="4"/><text class="g-w" x="${mx}" y="${my}">${e.w}</text></g>`;
    }
  }
  const placed = [];
  for (const n of g.nodes) {
    const m = nm[n.id] || '';
    s += `<g class="g-node ${m ? 'n-' + m : ''}" data-id="${n.id}" data-v="${n.id}"><circle cx="${n.x}" cy="${n.y}" r="${NR}"/><text x="${n.x}" y="${n.y}">${n.id}</text>`;
    if (lab[n.id] != null) { const [lx, ly] = labelSpot(g, P, n, String(lab[n.id]), placed, vb.split(' ').map(Number), (opts.labelAt || {})[n.id]); s += `<text class="g-lab" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}">${lab[n.id]}</text>`; }
    s += '</g>';
  }
  return s + '</svg>';
}

/** Turn a traversal step into drawing options. */
export function stepMarks(g, st, mode) {
  const nodeMarks = {}, edgeMarks = {};
  for (const id of st.seen) nodeMarks[id] = 'seen';
  for (const id of st.order) nodeMarks[id] = 'done';
  if (mode === 'bfs') for (const id of st.ds) nodeMarks[id] = 'queued';
  if (mode === 'dfs') for (const id of st.ds) nodeMarks[id] = 'onstack';
  if (st.current) nodeMarks[st.current] = 'current';
  for (const [a, b] of st.tree) { edgeMarks[`${a}-${b}`] = 'tree'; edgeMarks[`${b}-${a}`] = edgeMarks[`${b}-${a}`] || (g.directed ? '' : 'tree'); }
  if (st.current) for (const v of st.look) { const k = `${st.current}-${v}`; if (!edgeMarks[k]) edgeMarks[k] = 'look'; if (!g.directed && !edgeMarks[`${v}-${st.current}`]) edgeMarks[`${v}-${st.current}`] = 'look'; }
  const labels = {};
  if (mode === 'bfs') for (const k in st.level) labels[k] = 'L' + st.level[k];
  return { nodeMarks, edgeMarks, labels };
}
