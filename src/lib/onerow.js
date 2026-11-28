// One-row method for BFS and DFS (Week 16 deck, chat 64).
// The queue (BFS) or stack (DFS) is written as ONE row of letters. A check mark goes above a letter
// when we are done with it. The finished row is the traversal order (the order the letters were WRITTEN).
// BFS: the next letter to check is the FIRST letter without a check; write ALL its new neighbors.
// DFS: you stand on the LAST letter without a check; write ONE new neighbor, or check it when stuck.
// Neighbors are taken in alphabetical order. Edges with cut: true (flooded roads) are not used.
import { svgGraph } from './graph.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Neighbors of id, alphabetical. Directed graphs: only vertices an arrow points TO. Cut edges are skipped. */
export function rowNbrs(g, id) {
  const out = new Set();
  for (const e of g.edges) {
    if (e.cut) continue;
    if (e.a === id) out.add(e.b);
    if (!g.directed && e.b === id) out.add(e.a);
  }
  return [...out].sort();
}
/** Vertices with an arrow pointing INTO id (directed graphs only). */
const intoIds = (g, id) => [...new Set(g.edges.filter((e) => !e.cut && e.b === id && e.a !== id).map((e) => e.a))].sort();

/** "A", "A and B", "A, B, and C" */
export function and(xs) {
  if (xs.length <= 1) return xs.join('');
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(', ')}, and ${xs[xs.length - 1]}`;
}
const isAre = (xs) => (xs.length === 1 ? 'is' : 'are');
const neither = (xs) => (xs.length === 1 ? `${xs[0]} is` : xs.length === 2 ? `Both ${xs[0]} and ${xs[1]} are` : `${and(xs)} are all`);

/* ---------------- BFS ---------------- */
export function bfsRow(g, start) {
  const row = [start], level = { [start]: 0 }, by = {}, checked = [];
  const steps = [];
  const snap = (now, fresh, look, say) => steps.push({ row: [...row], checked: [...checked], level: { ...level }, now, fresh: [...fresh], look: [...look], say });
  snap(null, [start], [], `Write the start, <b>${start}</b> (L0).`);
  while (checked.length < row.length) {
    const u = row.find((x) => !checked.includes(x));
    checked.push(u);
    const nb = rowNbrs(g, u);
    const fresh = nb.filter((v) => !row.includes(v));
    const old = nb.filter((v) => row.includes(v));
    for (const v of fresh) { row.push(v); level[v] = level[u] + 1; by[v] = u; }
    let s = `Check <b>${u}</b>. `;
    if (g.directed) s += nb.length > 1 ? `Its arrows go to ${and(nb)}. ` : nb.length ? `Its only arrow goes to ${nb[0]}. ` : 'No arrows go out of it. ';
    else s += nb.length === 1 ? `Its only neighbor is ${nb[0]}. ` : `Its neighbors are ${and(nb)}. `;
    if (fresh.length) {
      if (old.length) s += `${and(old)} ${isAre(old)} already written. `;
      s += `Write <b>${fresh.join(', ')}</b> (L${level[u] + 1}).`;
    } else if (nb.length) {
      s += `${neither(old)} already written, so write nothing.`;
    } else {
      s += 'Write nothing.';
    }
    if (checked.length === row.length) s += ` Every letter has a ✓. <b>BFS order: ${row.join(', ')}</b>.`;
    snap(u, fresh, nb, s);
  }
  const missed = g.nodes.map((n) => n.id).filter((x) => !row.includes(x)).sort();
  return { steps, order: row, level, by, missed };
}

/** The "wrong way" some students use: level by level, alphabetical within each level. */
export function bfsSorted(g, start) {
  const { level } = bfsRow(g, start);
  return Object.keys(level).sort((a, b) => level[a] - level[b] || (a < b ? -1 : 1));
}

/** A shortest path found by following "written by" back from target. */
export function bfsPath(run, target) {
  const p = [target];
  while (run.by[p[0]]) p.unshift(run.by[p[0]]);
  return p;
}

/** Every shortest path from start to target (fewest edges). */
export function allShortest(g, start, target) {
  const { level } = bfsRow(g, start);
  const back = (v) => {
    if (v === start) return [[start]];
    const prev = g.nodes.map((n) => n.id).filter((u) => level[u] === level[v] - 1 && rowNbrs(g, u).includes(v)).sort();
    return prev.flatMap((u) => back(u).map((p) => [...p, v]));
  };
  return level[target] == null ? [] : back(target);
}

/* ---------------- DFS ---------------- */
export function dfsRow(g, start) {
  const row = [start], checked = [];
  const steps = [];
  const top = () => [...row].reverse().find((x) => !checked.includes(x));
  const snap = (now, fresh, look, say) => steps.push({ row: [...row], checked: [...checked], level: {}, now, fresh: [...fresh], look: [...look], say });
  snap(start, [start], [], `Write the start, <b>${start}</b>. You are on ${start}.`);
  while (checked.length < row.length) {
    const u = top();
    const nb = rowNbrs(g, u);
    const fresh = nb.filter((v) => !row.includes(v));
    const old = nb.filter((v) => row.includes(v));
    let s = `On <b>${u}</b>. `;
    if (g.directed) s += nb.length > 1 ? `Its arrows go to ${and(nb)}. ` : nb.length ? `Its only arrow goes to ${nb[0]}. ` : 'No arrows go out of it. ';
    else s += nb.length === 1 ? `Its only neighbor is ${nb[0]}. ` : `Its neighbors are ${and(nb)}. `;
    if (fresh.length) {
      const v = fresh[0];
      row.push(v);
      if (old.length) s += `${and(old)} ${isAre(old)} already written. `;
      s += fresh.length > 1 ? `Write only the first new one, <b>${v}</b>, and move to it.` : `Write <b>${v}</b> and move to it.`;
      snap(v, [v], [v], s);
    } else {
      checked.push(u);
      if (nb.length) s += `${neither(old)} already written. `;
      const t = top();
      s += t ? `Stuck, so ✓ ${u} and step back to ${t}.` : `Stuck, so ✓ ${u}. Every letter has a ✓. <b>DFS order: ${row.join(', ')}</b>.`;
      snap(t || null, [], [], s);
    }
  }
  const missed = g.nodes.map((n) => n.id).filter((x) => !row.includes(x)).sort();
  return { steps, order: row, checkOrder: [...checked], missed };
}

/* ---------------- Pictures ---------------- */
/** The row of letters as an SVG: checks above, levels (BFS) below, "top" tag (DFS). */
export function rowSvg(st, mode, opts = {}) {
  const n = st.row.length, cw = 38, gap = 6, padX = 8;
  const W = Math.max(opts.minW || 0, padX * 2 + n * cw + (n - 1) * gap);
  const H = mode === 'bfs' ? 92 : 86;
  const y0 = 30;
  const topLetter = mode === 'dfs' ? [...st.row].reverse().find((x) => !st.checked.includes(x)) : null;
  let s = `<svg class="row-svg" viewBox="0 0 ${W} ${H}" style="max-width:${Math.round(W * 1.5)}px" role="img" aria-label="${esc(opts.label || `The ${mode === 'bfs' ? 'queue' : 'stack'} in one row: ${st.row.join(' ')}`)}">`;
  st.row.forEach((x, i) => {
    const cx = padX + i * (cw + gap) + cw / 2;
    const done = st.checked.includes(x);
    const cls = ['rw-cell', done ? 'is-done' : 'is-wait', st.now === x ? 'is-now' : '', st.fresh.includes(x) ? 'is-new' : ''].join(' ');
    s += `<g class="${cls}"><rect x="${cx - cw / 2}" y="${y0}" width="${cw}" height="${cw}" rx="6"/><text class="rw-l" x="${cx}" y="${y0 + cw / 2}">${x}</text>`;
    if (done) s += `<text class="rw-ck" x="${cx}" y="${y0 - 12}">✓</text>`;
    if (mode === 'bfs' && !opts.noRowLevels && st.level[x] != null) s += `<text class="rw-lv" x="${cx}" y="${y0 + cw + 18}">L${st.level[x]}</text>`;
    if (mode === 'dfs' && x === topLetter) s += `<text class="rw-top" x="${cx}" y="${y0 + cw + 16}">top</text>`;
    s += '</g>';
  });
  return s + '</svg>';
}

/** One step picture: the graph (colored) above the row. */
export function stepPic(g, st, mode, opts = {}) {
  const nodeMarks = {}, edgeMarks = {}, labels = {};
  for (const x of st.row) nodeMarks[x] = st.checked.includes(x) ? 'done' : (mode === 'bfs' ? 'queued' : 'onstack');
  if (st.now) nodeMarks[st.now] = 'current';
  if (mode === 'bfs') {
    for (const x of st.row) labels[x] = 'L' + st.level[x];
    if (st.now) for (const v of st.look) edgeMarks[`${st.now}-${v}`] = 'look';
  } else if (st.nbLook) {
    // chat 66: a 'we are on X' step, looking at X's neighbors before anything is written
    for (const v of st.nbLook) edgeMarks[`${st.now}-${v}`] = 'look';
  } else if (st.fresh.length && st.row.length > 1) {
    const v = st.fresh[0];
    const u = [...st.row.slice(0, -1)].reverse().find((x) => !st.checked.includes(x));
    if (u) edgeMarks[`${u}-${v}`] = 'look';
  }
  const graph = svgGraph(g, { nodeMarks, edgeMarks, labels, label: opts.label || `${mode.toUpperCase()} step`, fit: true, labelAt: opts.labelAt, padR: opts.padR });
  const title = mode === 'bfs' ? 'The queue, in one row' : 'The stack, in one row';
  const N = Math.max(g.nodes.length, 6), minW = 16 + N * 38 + (N - 1) * 6;
  return `<div class="row-pic"><div class="rp-g">${graph}</div><div class="rp-r"><p class="rp-t">${opts.title || title}</p>${rowSvg(st, mode, { minW, noRowLevels: opts.noRowLevels })}</div></div>`;
}

/** StepShow steps for a run. */
export function rowShow(g, run, mode, o = {}) {
  return run.steps.map((st, i) => ({ pic: stepPic(g, st, mode, { label: `${mode.toUpperCase()} step ${i + 1}`, ...o }), say: st.say }));
}

/* ---------------- Answer blocks (exam format) ---------------- */
export function levelTable(verts, level = null) {
  const head = verts.map((v) => `<th scope="col">${v}</th>`).join('');
  const cells = verts.map((v) => `<td>${level ? (level[v] == null ? '–' : level[v]) : ''}</td>`).join('');
  return `<div class="scroll-x"><table class="tbl lvl-tbl${level ? '' : ' is-blank'}"><tbody><tr><th scope="row">Vertex</th>${head}</tr><tr><th scope="row">Level</th>${cells}</tr></tbody></table></div>`;
}

/** svgGraph cropped to its vertices (bigger drawing in the two-column step pictures). */
const svgFit = (g, o = {}) => svgGraph(g, { ...o, fit: true });

/* ---------------- Storage examples (adjacency matrix + list, one edge per step) ---------------- */
const vids = (g) => g.nodes.map((n) => n.id).sort();
/** Matrix as HTML. cells: { 'A-B': value } (missing = 0). hot: keys to highlight. hotRow: a row to tint. */
export function matrixHtml(g, cells = {}, hot = [], hotRow = null, blank = false, colors = {}) {
  const I = vids(g);
  let s = `<div class="scroll-x"><table class="adj st-adj"><caption>Adjacency matrix (row = from, column = to)</caption><thead><tr><th></th>${I.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>`;
  for (const r of I) {
    s += `<tr${r === hotRow ? ' class="st-row"' : ''}><th scope="row">${r}</th>`;
    for (const c of I) {
      const k = `${r}-${c}`, v = cells[k] || 0;
      s += `<td class="${v ? 'one' : ''} ${hot.includes(k) ? 'st-hot' : ''} ${r === c ? 'diag' : ''} ${colors[k] || ''}">${blank ? '' : v}</td>`;
    }
    s += '</tr>';
  }
  return s + '</tbody></table></div>';
}
/** Adjacency list as HTML, deck style: A → B → C → null; weighted cells read "B,3". upTo: only these vertices' rows are filled. */
export function listHtml(g, upTo = null, hotRow = null, hotCells = []) {
  const I = vids(g);
  const nb = (id) => {
    const out = [];
    for (const e of g.edges) {
      if (e.a === id) out.push([e.b, e.w]);
      if (!g.directed && e.b === id) out.push([e.a, e.w]);
    }
    return out.sort((p, q) => (p[0] < q[0] ? -1 : 1));
  };
  let s = '<div class="adjlist st-list" role="list" aria-label="Adjacency list">';
  for (const r of I) {
    const show = !upTo || upTo.includes(r);
    s += `<div class="row${r === hotRow ? ' st-row' : ''}" role="listitem"><span class="head">${r}</span>`;
    if (show) {
      for (const [n, w] of nb(r)) s += `<span class="arr">→</span><span class="cell${hotCells.includes(`${r}-${n}`) ? ' st-hotc' : ''}"><b>${n}${g.weighted ? ',' + w : ''}</b><i></i></span>`;
      s += '<span class="arr">→</span><span class="null">null</span>';
    }
    s += '</div>';
  }
  return s + '</div>';
}
/** A box reference such as 'row A, column B', styled like the box in the picture (one = becomes 1, zero = stays 0). */
export const cref = (r, c, kind = 'one') => `<span class="cref cref-${kind}">row ${r}, column ${c}</span>`;
const twoUp = (left, right) => `<div class="st-pic"><div class="st-g">${left}</div><div class="st-m">${right}</div></div>`;

/** Steps for "write the matrix and the list from this drawing". */
export function storeSteps(g) {
  const I = vids(g), steps = [], cells = {};
  const n = g.edges.length;
  steps.push({
    pic: twoUp(svgFit(g, { label: 'The graph to store' }), matrixHtml(g, {})),
    say: `Write ${I.join(', ')} across the top and down the left side. Write 0 in every box.`,
  });
  g.edges.forEach((e, i) => {
    const v = g.weighted ? e.w : 1;
    const hot = [`${e.a}-${e.b}`];
    cells[`${e.a}-${e.b}`] = v;
    if (!g.directed) { cells[`${e.b}-${e.a}`] = v; hot.push(`${e.b}-${e.a}`); }
    const pic = twoUp(svgFit(g, { edgeMarks: { [`${e.a}-${e.b}`]: 'path' }, nodeMarks: { [e.a]: 'hl', [e.b]: 'hl' }, label: `Edge ${i + 1}` }), matrixHtml(g, { ...cells }, hot));
    const say = g.directed
      ? `Arrow <b>${e.a} → ${e.b}</b> (${i + 1} of ${n}). Only one box changes: ${cref(e.a, e.b)} becomes 1.`
      : `Line <b>${e.a}–${e.b}</b>${g.weighted ? `, weight ${e.w}` : ''} (${i + 1} of ${n}). Two boxes become ${v}: ${cref(e.a, e.b)} and ${cref(e.b, e.a)}.`;
    steps.push({ pic, say });
  });
  const ones = g.directed ? n : 2 * n;
  steps.push({
    pic: twoUp(svgFit(g, { label: 'The graph' }), matrixHtml(g, { ...cells })),
    say: `Count to check. There are ${n} ${g.directed ? 'arrows' : 'edges'}, so there must be ${ones} filled boxes${g.directed ? ' (one for each arrow)' : ' (two for each edge)'}. The count matches.`,
  });
  const got = [];
  for (const r of I) {
    got.push(r);
    const nbs = listHtml(g, [r]).match(/<b>([^<]+)<\/b>/g) || [];
    const names = nbs.map((x) => x.replace(/<\/?b>/g, ''));
    steps.push({
      pic: twoUp(svgFit(g, nbMarks(g, r, `Neighbors of ${r}`)), listHtml(g, [...got], r)),
      say: names.length
        ? `<b>${r}</b>'s list is ${names.join(' → ')} → null.`
        : `<b>${r}</b> has no ${g.directed ? 'arrows going out' : 'neighbors'}, so its list is just null.`,
    });
  }
  return steps;
}

/** Marks for a list step (chat 64): the current vertex orange, its edges orange, its neighbors teal. */
function nbMarks(g, r, label) {
  const nodeMarks = { [r]: 'current' }, edgeMarks = {};
  for (const e of g.edges) {
    if (e.a === e.b) continue;
    if (e.a === r) { edgeMarks[`${e.a}-${e.b}`] = 'path'; nodeMarks[e.b] = 'seen'; }
    else if (!g.directed && e.b === r) { edgeMarks[`${e.a}-${e.b}`] = 'path'; nodeMarks[e.a] = 'seen'; }
  }
  return { nodeMarks, edgeMarks, label };
}
/** Steps for "draw the graph from this matrix" (directed). */
export function fromMatrixSteps(g) {
  const I = vids(g), steps = [], cells = {};
  for (const e of g.edges) cells[`${e.a}-${e.b}`] = 1;
  const bare = { ...g, edges: [] };
  steps.push({
    pic: twoUp(svgFit(bare, { label: 'Four vertices, no arrows yet' }), matrixHtml(g, cells)),
    say: 'The matrix is not a mirror image (row A, column B is 1, but row B, column A is 0), so the graph is <b>directed</b>. Draw the vertices first.',
  });
  const drawn = [];
  for (const r of I) {
    const outs = g.edges.filter((e) => e.a === r).map((e) => e.b).sort();
    for (const b of outs) drawn.push({ a: r, b });
    const marks = Object.fromEntries(outs.map((b) => [`${r}-${b}`, 'path']));
    steps.push({
      pic: twoUp(svgFit({ ...g, edges: [...drawn] }, { edgeMarks: marks, nodeMarks: Object.assign(Object.fromEntries(outs.map((b) => [b, 'seen'])), { [r]: 'current' }), label: `Arrows from ${r}` }), matrixHtml(g, cells, outs.map((b) => `${r}-${b}`), r)),
      say: outs.length
        ? `Row <b>${r}</b> has a 1 under ${and(outs)}. Draw ${outs.map((b) => `${r} → ${b}`).join(' and ')}.`
        : `Row <b>${r}</b> is all 0s. No arrows leave ${r}.`,
    });
  }
  steps.push({
    pic: twoUp(svgFit(g, { label: 'The finished graph' }), listHtml(g)),
    say: `${g.edges.length} ones, ${g.edges.length} arrows. Now write the list: each vertex, then where its arrows point, then null.`,
  });
  return steps;
}

/* ---------------- Friends chart picture (Graphs lesson, Part 3; chat 64) ---------------- */
/** Four classmates and their friends chart (= the adjacency matrix of the small graph A-B, A-D, B-C, B-D). */
export function friendsChart() {
  const names = { A: 'Ana', B: 'Ben', C: 'Cris', D: 'Dan' };
  const P = { A: [52, 96], B: [168, 96], C: [168, 214], D: [52, 214] };
  const E = [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'D']];
  const ids = ['A', 'B', 'C', 'D'];
  const has = (r, c) => E.some(([a, b]) => (a === r && b === c) || (a === c && b === r));
  const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" dominant-baseline="central" font-family="Nunito, sans-serif" font-size="${o.s || 14}" font-weight="${o.w || 800}" fill="${o.c || 'var(--ink)'}">${t}</text>`;
  // left: the classmates
  let L = '<svg class="fc-pic" viewBox="0 0 220 260" role="img" aria-label="Four classmates, Ana (A), Ben (B), Cris (C), and Dan (D). Lines show friendships: Ana and Ben, Ana and Dan, Ben and Cris, Ben and Dan.">';
  L += T(110, 18, 'Who is friends with whom', { s: 15, c: 'var(--ink-soft)' });
  for (const [a, b] of E) {
    const hot = a === 'A' && b === 'B';
    L += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="${hot ? 'var(--orange)' : 'var(--ink)'}" stroke-width="${hot ? 5 : 2.2}" stroke-linecap="round"/>`;
  }
  for (const id of ids) {
    const [x, y] = P[id], hot = id === 'A' || id === 'B';
    L += `<circle cx="${x}" cy="${y}" r="22" fill="${hot ? 'var(--butter)' : 'var(--card)'}" stroke="var(--ink)" stroke-width="2.2"/>` + T(x, y, id, { s: 18 }) + T(x, y + (y < 150 ? -36 : 36), names[id], { s: 15, w: 700, c: 'var(--ink-soft)' });
  }
  L += '</svg>';
  // right: their chart
  const gx = 62, gy = 66, cw = 44;
  let R = '<svg class="fc-pic" viewBox="0 0 250 300" role="img" aria-label="Their friends chart: a 4 by 4 grid with the names down the side and across the top. A box is 1 if the row person and the column person are friends. The Ana-Ben friendship gives two 1s, in row Ana, column Ben, and in row Ben, column Ana.">';
  R += T(gx + cw * 2, 18, 'Their friends chart', { s: 15, c: 'var(--ink-soft)' });
  ids.forEach((c, j) => { R += T(gx + j * cw + cw / 2, gy - 26, c, { s: 16, c: 'var(--teal-ink)' }) + T(gx + j * cw + cw / 2, gy - 10, names[c], { s: 12, w: 700, c: 'var(--ink-soft)' }); });
  ids.forEach((r, i) => {
    const y = gy + i * cw;
    R += T(gx - 30, y + cw / 2 - 8, r, { s: 16, c: 'var(--teal-ink)' }) + T(gx - 30, y + cw / 2 + 9, names[r], { s: 12, w: 700, c: 'var(--ink-soft)' });
    ids.forEach((c, j) => {
      const x = gx + j * cw, v = has(r, c) ? 1 : 0;
      const hot = (r === 'A' && c === 'B') || (r === 'B' && c === 'A');
      const fill = hot ? 'var(--orange)' : v ? 'var(--butter)' : 'var(--card)';
      R += `<rect x="${x}" y="${y}" width="${cw}" height="${cw}" fill="${fill}" stroke="var(--line)" stroke-width="1.2"/>` + T(x + cw / 2, y + cw / 2, v, { s: 17, c: hot ? '#fff' : 'var(--ink)' });
    });
  });
  R += `<rect x="${gx}" y="${gy}" width="${cw * 4}" height="${cw * 4}" fill="none" stroke="var(--ink)" stroke-width="1.8"/>`;
  R += T(gx + cw * 2, gy + cw * 4 + 22, 'Ana–Ben is one friendship,', { s: 14, c: 'var(--orange-ink)' }) + T(gx + cw * 2, gy + cw * 4 + 42, 'so it fills two boxes.', { s: 14, c: 'var(--orange-ink)' });
  R += '</svg>';
  return `<div class="fc-wrap">${L}${R}</div>`;
}

/* ---------------- "How to" steppers for the Graphs lesson (chat 64) ---------------- */
/** The four matrix-writing steps on an undirected graph, plus one step showing the arrow version on a directed graph. */
export function matrixHowSteps(g) {
  // Each step = the general rule first, then "In this graph, ..." (her request, chat 64).
  // Each edge gets its own color; its box or boxes in the matrix get the same color.
  const I = vids(g), steps = [];
  const dir = !!g.directed, wt = !!g.weighted;
  const key = (e) => `${e.a}-${e.b}`;
  const boxes = (e) => (dir ? [`${e.a}-${e.b}`] : [`${e.a}-${e.b}`, `${e.b}-${e.a}`]);
  const col = (i) => `ec${(i % 5) + 1}`;
  const name = (e) => (dir ? `${e.a} → ${e.b}` : `${e.a}–${e.b}`);
  const word = (e, i) => `<span class="ecw ${col(i)}">${name(e)}</span>`;
  const val = (e) => (wt ? e.w : 1);
  const paint = (upTo) => {
    const cells = {}, colors = {}, marks = {};
    g.edges.slice(0, upTo).forEach((e, i) => { for (const k of boxes(e)) { cells[k] = val(e); colors[k] = col(i); } marks[key(e)] = col(i); });
    return { cells, colors, marks };
  };
  const thing = dir ? 'arrow' : 'edge';
  const BR = '<br><br>';
  steps.push({ label: 'Step 1 of 4', pic: twoUp(svgFit(g, { label: 'The graph' }), matrixHtml(g, {}, [], null, true)),
    say: `<b>Step 1 of 4.</b> Write the vertices of the graph across the top and down the left side, in alphabetical order (unless the problem says otherwise).${BR}In this graph, write ${I.join(', ')}.` });
  steps.push({ label: 'Step 2 of 4', pic: twoUp(svgFit(g, { label: 'The graph' }), matrixHtml(g, {})),
    say: '<b>Step 2 of 4.</b> Write 0 in every box.' });
  const first = g.edges[0], rest = g.edges.slice(1);
  const p1 = paint(1);
  let rule = '<b>Step 3 of 4.</b> Each box is for one pair of vertices, the one in its row and the one in its column. ';
  if (dir) rule += `The row is where an arrow <b>starts</b>, and the column is where it <b>points</b>. For each arrow, write ${wt ? 'its <b>weight</b>' : '1'} in its <b>one</b> box.`;
  else rule += `For each edge, write ${wt ? 'its <b>weight</b> (its number)' : '1'} in its <b>two</b> boxes, because an edge goes both ways.`;
  let ex;
  if (dir) ex = `In this graph, start with the arrow ${word(first, 0)}${wt ? `, weight ${first.w}` : ''}. It goes from ${first.a} to ${first.b}, so write ${val(first)} in ${cref(first.a, first.b, col(0))}. It does not go from ${first.b} to ${first.a}, so ${cref(first.b, first.a, 'zero')} stays 0.`;
  else ex = `In this graph, start with the edge ${word(first, 0)}${wt ? `, weight ${first.w}` : ''}. ${first.a} is connected to ${first.b}, so write ${val(first)} in ${cref(first.a, first.b, col(0))}. ${first.b} is connected to ${first.a}, so write ${val(first)} in ${cref(first.b, first.a, col(0))}.`;
  steps.push({ label: 'Step 3 of 4', pic: twoUp(svgFit(g, { edgeMarks: p1.marks, label: `${thing} ${name(first)}` }), matrixHtml(g, p1.cells, [], null, false, p1.colors)), say: rule + BR + ex });
  const pa = paint(g.edges.length);
  steps.push({ label: 'Step 3 of 4 (continued)', pic: twoUp(svgFit(g, { edgeMarks: pa.marks, label: `All ${thing}s done` }), matrixHtml(g, pa.cells, [], null, false, pa.colors)),
    say: `<b>Step 3 of 4, continued.</b> Do the same for every other ${thing}.${BR}In this graph, that is ${and(rest.map((e, i) => word(e, i + 1)))}. ${dir ? 'Each arrow\'s box is' : 'Each edge\'s two boxes are'} the same color as the ${thing}.` });
  const n = g.edges.length;
  const what = wt ? 'filled boxes (the boxes that are not 0)' : '1s';
  const per = dir ? `Each arrow gives <b>one</b> ${wt ? 'filled box' : '1'}.` : `Each edge gives <b>two</b> ${wt ? 'filled boxes' : '1s'}.`;
  const need = dir ? n : 2 * n;
  let s4 = `<b>Step 4 of 4.</b> Check by counting the ${what}. ${per} If the count is wrong, you missed ${dir ? 'an arrow' : 'an edge'} or wrote one twice.${BR}In this graph, there are ${n} ${thing}s, so there must be ${need} ${wt ? 'filled boxes' : 'ones'}. There are, so the matrix is done.`;
  if (!dir && !wt) s4 += ` Notice that the two halves match across the <b>diagonal</b> (the boxes from the top-left corner to the bottom-right corner). An undirected graph's matrix is always a <b>mirror image</b> like this.`;
  steps.push({ label: 'Step 4 of 4', pic: twoUp(svgFit(g, { edgeMarks: pa.marks, label: 'The finished graph' }), matrixHtml(g, pa.cells, [], null, false, pa.colors)), say: s4 });
  return steps;
}

/** How Step 3 changes for a directed graph: one arrow, one box (picture + matrix). */
export function directedHowPic(gDir) {
  const d = gDir.edges[0], k = `${d.a}-${d.b}`;
  return twoUp(svgFit(gDir, { edgeMarks: { [k]: 'path' }, nodeMarks: { [d.a]: 'hl', [d.b]: 'hl' }, label: `Arrow from ${d.a} to ${d.b}` }), matrixHtml(gDir, { [k]: 1 }, [k]));
}

/** Writing the adjacency list from a drawing, one vertex per step. */
export function listHowSteps(g) {
  // Each step = the general rule first, then "In this graph, ..." (her request, chat 64).
  const I = vids(g), steps = [], dir = !!g.directed, wt = !!g.weighted, BR = '<br><br>';
  steps.push({ label: 'Step 1 of 2', pic: twoUp(svgFit(g, { label: 'The graph' }), listHtml(g, [])),
    say: `<b>Step 1 of 2.</b> Write the vertices of the graph down the left side, one box each, in alphabetical order (unless the problem says otherwise).${BR}In this graph, write ${I.join(', ')}.` });
  const got = [];
  I.forEach((r, n) => {
    got.push(r);
    const outs = [];
    for (const e of g.edges) { if (e.a === r) outs.push([e.b, e.w]); if (!dir && e.b === r) outs.push([e.a, e.w]); }
    outs.sort((p, q) => (p[0] < q[0] ? -1 : 1));
    const names = outs.map(([v, w]) => (wt ? `${v},${w}` : v));
    const marks = Object.fromEntries(g.edges.filter((e) => e.a === r || (!dir && e.b === r)).map((e) => [`${e.a}-${e.b}`, 'path']));
    let say = '';
    if (n === 0) {
      say = `<b>Step 2 of 2.</b> For each vertex, write ${dir ? 'the vertices its arrows point to' : 'its adjacent vertices (its neighbors)'} after its box, in alphabetical order, then end with null.`;
      if (wt) say += ` Write each one with its weight. For example, B,7 means the ${dir ? 'arrow' : 'edge'} to B has weight 7.`;
      say += `${BR}In this graph, start with <span class="vchip">${r}</span>. `;
    } else {
      say = `Next, <span class="vchip">${r}</span>. `;
    }
    const listed = and(outs.map(([v, w]) => (wt ? `${v} (weight ${w})` : v)));
    if (outs.length) say += `${dir ? `Its ${outs.length > 1 ? 'arrows point' : 'arrow points'} to` : 'It is connected to'} ${listed}, so write ${names.join(', then ')}, then null.`;
    else say += `It has no ${dir ? 'arrows going out' : 'edges'}, so its list is just null.`;
    if (n === I.length - 1) say += `${BR}Every vertex has its list, so the adjacency list is done.`;
    steps.push({ label: `Step 2 of 2 (${r})`, pic: twoUp(svgFit(g, { edgeMarks: marks, nodeMarks: nbMarks(g, r, '').nodeMarks, label: `${r}'s ${dir ? 'arrows' : 'edges'}` }), listHtml(g, [...got], r)), say });
  });
  return steps;
}
