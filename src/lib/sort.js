// Basic sorting (bubble, selection, insertion): one picture builder + step builders, shared by the lesson's
// walkthroughs, its by-hand steppers, and the SortLab (runs in the browser too, so no Rough.js here).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.mono ? '&quot;IBM Plex Mono&quot;, monospace' : 'Nunito, system-ui, sans-serif'}" font-size="${o.size ?? 13}" font-weight="${o.w ?? 800}" fill="${o.fill ?? '#1b2a2e'}" text-anchor="${o.anchor ?? 'middle'}">${esc(t)}</text>`;
// fill, stroke, text color, extra attributes
const KIND = {
  '': ['#ffffff', '#1b2a2e', '#1b2a2e', ''],
  cmp: ['#e8662e', '#b4461a', '#ffffff', ''],
  swap: ['#fbdccc', '#e8662e', '#1b2a2e', ''],
  min: ['#f8dc95', '#a87412', '#1b2a2e', ''],
  done: ['#dff0e3', '#2e7d4f', '#1b2a2e', ''],
  gap: ['#eef2f2', '#9aa8aa', '#9aa8aa', ' stroke-dasharray="5 4"'],
  bad: ['#f6d6d0', '#b23a33', '#1b2a2e', ''],
};
export const SCORES = [29, 10, 14, 37, 13];
const GREEN = '#1f5a38', RED = '#b23a33', SOFT = '#37474a';
const c = (s) => `<code>${s}</code>`;

/** The array with colored cells, index numbers, pointer labels under cells, a chip (key / pass), counters,
 * an optional swap arc (o.swap = [a, b]) or shift arrow (o.shift = [from, to]), and a note line. */
export function sortPic(vals, o = {}) {
  const n = vals.length, w = Math.min(56, Math.floor(324 / n)), x0 = (340 - n * w) / 2, y = 64;
  const cx = (i) => x0 + i * w + w / 2;
  let b = '';
  if (o.chip) b += `<rect x="8" y="6" width="${o.chipW ?? 104}" height="26" rx="6" fill="${o.chipFill ?? '#fbdccc'}" stroke="${o.chipStroke ?? '#e8662e'}" stroke-width="1.8"/>` + T(8 + (o.chipW ?? 104) / 2, 24, o.chip, { mono: true, size: 13, w: 700 });
  if (o.comps != null) {
    b += T(332, 18, `comparisons: ${o.comps}`, { mono: true, size: 12.5, w: 700, fill: '#0b544e', anchor: 'end' });
    b += T(332, 35, `${o.moveWord ?? 'swaps'}: ${o.moves ?? 0}`, { mono: true, size: 12.5, w: 700, fill: '#0b544e', anchor: 'end' });
  }
  if (o.swap && o.swap[0] !== o.swap[1]) {
    const [a, z] = o.swap, x1 = cx(Math.min(a, z)), x2 = cx(Math.max(a, z)), top = Math.max(40, y - 8 - (x2 - x1) * 0.18);
    b += `<path d="M${x1} ${y - 3} C${x1} ${top} ${x2} ${top} ${x2} ${y - 3}" fill="none" stroke="#e8662e" stroke-width="2"/>`;
    b += `<path d="M${x1} ${y - 1} l-5 -8 h10 Z" fill="#e8662e"/><path d="M${x2} ${y - 1} l-5 -8 h10 Z" fill="#e8662e"/>`;
  }
  if (o.shift) {
    const [f, t] = o.shift, x1 = cx(f), x2 = cx(t), top = y - 20;
    b += `<path d="M${x1} ${y - 3} C${x1} ${top} ${x2} ${top} ${x2} ${y - 6}" fill="none" stroke="#e8662e" stroke-width="2"/><path d="M${x2} ${y - 1} l-5 -8 h10 Z" fill="#e8662e"/>`;
  }
  vals.forEach((v, i) => {
    const [f, s, t, d] = KIND[(o.kinds || {})[i] || ''], x = x0 + i * w;
    b += `<rect x="${x}" y="${y}" width="${w}" height="42" fill="${f}" stroke="${s}" stroke-width="2"${d}/>`;
    if (v != null && v !== '') b += T(x + w / 2, y + 27, v, { mono: true, size: w < 34 ? 13 : 16, w: 700, fill: t });
    b += T(x + w / 2, y + 60, i, { mono: true, size: 11.5, w: 600, fill: SOFT });
  });
  if (o.ghost != null) { // a slot that does not exist (index -1 or n): red dashed
    const gi = o.ghost, x = x0 + gi * w;
    b += `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="36" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="4 4"/>` + T(x + w / 2, y + 28, '?', { size: 16, fill: RED });
    b += T(x + w / 2, y + 60, gi, { mono: true, size: 11.5, w: 700, fill: RED });
  }
  const at = {};
  for (const [name, i] of Object.entries(o.ptr || {})) if (i != null && i >= -1 && i <= n) (at[i] = at[i] || []).push(name);
  for (const [i, names] of Object.entries(at)) {
    const px = cx(+i);
    b += `<path d="M${px} 130 l-6 9 h12 Z" fill="#e8662e"/>`;
    names.forEach((nm, k) => { b += T(px, 155 + k * 15, nm, { mono: true, size: 12.5, w: 700, fill: '#b4461a' }); });
  }
  if (o.note) b += T(170, 202, o.note, { size: 12.5, w: 800, fill: o.noteFill || SOFT });
  return `<svg class="objbox sort-pic" viewBox="0 0 340 212" role="img" aria-label="${esc(o.alt || 'An array: ' + vals.join(', '))}">${b}</svg>`;
}

const doneFrom = (a, b) => { const r = {}; for (let i = a; i <= b; i++) r[i] = 'done'; return r; };
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

/* ---------- Step builders (by hand + lab). Each step: { vals, kinds, ptr, comps, moves, say, swap?, shift?, chip?, note? } ---------- */

/** Bubble sort: one step per comparison (a swap is shown on the same step). */
export function bubbleSteps(input) {
  const a = [...input], n = a.length, s = [];
  let comps = 0, moves = 0;
  s.push({ vals: [...a], kinds: {}, ptr: {}, comps, moves, say: `Bubble sort on ${a.join(', ')}. Compare each pair of <b>neighbors</b>, left to right. If the left one is bigger, swap them.` });
  for (let i = 0; i < n - 1; i++) {
    const done = doneFrom(n - i, n - 1);
    for (let j = 0; j < n - 1 - i; j++) {
      comps++;
      const L = a[j], R = a[j + 1], last = j === n - 2 - i;
      let say;
      if (L > R) {
        a[j] = R; a[j + 1] = L; moves++;
        say = `Pass ${i + 1}: compare ${L} and ${R}. ${L} &gt; ${R}, so <b>swap</b> them.`;
      } else say = `Pass ${i + 1}: compare ${L} and ${R}. Is ${L} &gt; ${R}? No: already in order, <b>no swap</b>.`;
      const kinds = { ...done, [j]: L > R ? 'swap' : 'cmp', [j + 1]: L > R ? 'swap' : 'cmp' };
      if (last) {
        kinds[j + 1] = 'done';
        say += ` That ends pass ${i + 1}: ${a[j + 1]} is the biggest of the unsorted part, so it is now in its <b>final place</b> (green).`;
      }
      s.push({ vals: [...a], kinds, ptr: { j, 'j+1': j + 1 }, comps, moves, swap: L > R ? [j, j + 1] : null, say });
    }
  }
  s.push({ vals: [...a], kinds: doneFrom(0, n - 1), ptr: {}, comps, moves, say: `After ${n - 1} passes the array is sorted: ${a.join(', ')}. Total: <b>${comps} comparisons</b> and <b>${moves} swaps</b>.`, note: 'sorted!', noteFill: GREEN });
  return s;
}

/** Selection sort: one step per comparison, plus one step per swap. */
export function selectionSteps(input) {
  const a = [...input], n = a.length, s = [];
  let comps = 0, moves = 0;
  s.push({ vals: [...a], kinds: {}, ptr: {}, comps, moves, say: `Selection sort on ${a.join(', ')}. Each pass <b>finds the smallest</b> value in the unsorted part and swaps it to the front of that part.` });
  for (let i = 0; i < n - 1; i++) {
    const done = doneFrom(0, i - 1);
    let m = i;
    for (let j = i + 1; j < n; j++) {
      comps++;
      const old = m, smaller = a[j] < a[m];
      if (smaller) m = j;
      const say = `Pass ${i + 1}: ${j === i + 1 ? `the smallest so far starts as ${a[i]} (index ${i}). Compare` : 'compare'} ${a[j]} with the smallest so far, ${a[old]}. ` + (smaller ? `${a[j]} is smaller, so the smallest so far is now <b>${a[j]}</b> (index ${j}).` : `${a[j]} is not smaller. Keep ${a[old]}.`);
      s.push({ vals: [...a], kinds: { ...done, [m]: 'min', ...(smaller ? {} : { [j]: 'cmp' }) }, ptr: { i, j, min: m }, comps, moves, say });
    }
    moves++;
    const before = a[i], low = a[m];
    a[i] = low; a[m] = before;
    s.push({ vals: [...a], kinds: { ...done, [i]: 'done', ...(m !== i ? { [m]: 'swap' } : {}) }, ptr: { i, min: m }, comps, moves, swap: [i, m],
      say: m !== i ? `End of pass ${i + 1}: <b>swap</b> the smallest, ${low}, with ${before} at index ${i}. ${low} is now in its <b>final place</b>.` : `End of pass ${i + 1}: the smallest, ${low}, is already at index ${i}. It "swaps" with itself, so nothing moves. It is in its <b>final place</b>.` });
  }
  s.push({ vals: [...a], kinds: doneFrom(0, n - 1), ptr: {}, comps, moves, say: `After ${n - 1} passes the last value is in place too. Sorted: ${a.join(', ')}. Total: <b>${comps} comparisons</b> and <b>${moves} swaps</b>.`, note: 'sorted!', noteFill: GREEN });
  return s;
}

/** Insertion sort: take a key, shift bigger values right, drop the key into the gap. Moves = shifts. */
export function insertionSteps(input) {
  const a = [...input], n = a.length, s = [];
  let comps = 0, moves = 0;
  const sortedPart = (k) => doneFrom(0, k);
  s.push({ vals: [...a], kinds: { 0: 'done' }, ptr: {}, comps, moves, moveWord: 'shifts', say: `Insertion sort on ${a.join(', ')}. The first value alone counts as a sorted part (green). Each pass takes the next value, the <b>key</b>, and inserts it into the sorted part.` });
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    const v = [...a]; v[i] = null;
    s.push({ vals: v, kinds: { ...sortedPart(i - 1), [i]: 'gap' }, ptr: { i }, comps, moves, moveWord: 'shifts', chip: `key = ${key}`, say: `Pass ${i}: take out ${key}, the <b>key</b>. Its slot (index ${i}) is now a gap. Now compare the key with the sorted values on its left, from right to left.` });
        while (j >= 0) {
      comps++;
      if (a[j] > key) {
        a[j + 1] = a[j]; moves++;
        const w = [...a]; w[j] = null;
        s.push({ vals: w, kinds: { ...sortedPart(i), [j]: 'gap', [j + 1]: 'swap' }, ptr: { j }, comps, moves, moveWord: 'shifts', chip: `key = ${key}`, shift: [j, j + 1], say: `Compare ${a[j + 1]} with the key ${key}. ${a[j + 1]} &gt; ${key}, so <b>shift</b> ${a[j + 1]} one slot right. The gap moves left, to index ${j}.` });
        j--;
      } else break;
    }
    const stopWhy = j < 0 ? `There is nothing left on the left (j is -1), so stop.` : `Compare ${a[j]} with the key ${key}. Is ${a[j]} &gt; ${key}? No, so stop: ${key} belongs right after ${a[j]}.`;
    a[j + 1] = key;
    s.push({ vals: [...a], kinds: { ...sortedPart(i), [j + 1]: 'swap' }, ptr: { 'j+1': j + 1 }, comps, moves, moveWord: 'shifts', chip: `key = ${key}`, say: `${stopWhy} <b>Drop ${key}</b> into the gap at index ${j + 1}. The sorted part is now ${a.slice(0, i + 1).join(', ')}.` });
  }
  s.push({ vals: [...a], kinds: doneFrom(0, n - 1), ptr: {}, comps, moves, moveWord: 'shifts', say: `Every value has been inserted. Sorted: ${a.join(', ')}. Total: <b>${comps} comparisons</b> and <b>${moves} shifts</b>.`, note: 'sorted!', noteFill: GREEN });
  return s;
}

export const STEPS = { bubble: bubbleSteps, selection: selectionSteps, insertion: insertionSteps };

/** Totals only (for tables and the lab summary). */
export function countFor(kind, arr) { const s = STEPS[kind](arr); const l = s[s.length - 1]; return { comps: l.comps, moves: l.moves }; }

/** Picture for one step (shared by StepShow and the lab). */
export const stepPic = (st) => sortPic(st.vals, { ...st, alt: plain(st.say) });
/** StepShow steps by hand. */
export const handSteps = (kind, arr = SCORES) => STEPS[kind](arr).map((st) => ({ pic: stepPic(st), say: st.say }));

/* ---------- Java code + CodeWalks (same array, SCORES) ---------- */

export const bubbleCode = String.raw`static void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {          // one pass
    for (int j = 0; j < n - 1 - i; j++) {    // each pair of neighbors
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];                   // swap them
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;

export function bubbleWalk() {
  const a = [...SCORES], s = [];
  const P = (o = {}) => sortPic(o.vals || a, { comps: o.comps, moves: o.moves, ...o, alt: o.alt || (o.vals || a).join(', ') });
  s.push({ lines: [1, 2], pic: P({ comps: 0, moves: 0 }), vars: [['n', '= 5']], say: `We call ${c('bubbleSort(arr)')} on the five scores. ${c('n')} is the number of values: 5. The method is ${c('void')}: it gives nothing back; it changes the array itself.` });
  s.push({ lines: [3], pic: P({ comps: 0, moves: 0, chip: 'pass 1' }), vars: [['i', '= 0']], say: `The <b>outer loop</b> counts the passes. ${c('i = 0')} is pass 1. It runs while ${c('i < n - 1')}, so ${c('i')} goes 0, 1, 2, 3: four passes for five values.` });
  let comps = 0, moves = 0;
  for (let j = 0; j < 4; j++) {
    const L = a[j], R = a[j + 1]; comps++;
    s.push({ lines: [4, 5], pic: P({ vals: [...a], comps, moves, chip: 'pass 1', kinds: { [j]: 'cmp', [j + 1]: 'cmp' }, ptr: { j, 'j+1': j + 1 } }), vars: [['j', `= ${j}`], ['arr[j]', `= ${L}`], ['arr[j+1]', `= ${R}`]],
      say: (j === 0 ? `The <b>inner loop</b> walks along the neighbors with ${c('j')}. ` : `${c('j++')}: ${c('j')} = ${j}. `) + `Is ${c(`arr[${j}] > arr[${j + 1}]`)}, ${L} &gt; ${R}? <b>${L > R ? 'Yes' : 'No'}</b>.` + (L > R ? '' : ` They are in order, so the swap lines are skipped.`) });
    if (L > R) {
      a[j] = R; a[j + 1] = L; moves++;
      s.push({ lines: [6, 7, 8], pic: P({ vals: [...a], comps, moves, chip: 'pass 1', kinds: { [j]: 'swap', [j + 1]: 'swap' }, swap: [j, j + 1], ptr: { j, 'j+1': j + 1 } }), vars: [['temp', `= ${L}`]],
        say: `Swap with a helper variable: ${c(`temp = ${L}`)} saves the left value, ${c(`arr[${j}] = ${R}`)} copies the right value over it, and ${c(`arr[${j + 1}] = temp`)} puts ${L} back on the right.` });
    }
  }
  s.push({ lines: [4], pic: P({ vals: [...a], comps, moves, chip: 'pass 1', kinds: { 4: 'done' } }), vars: [['j', '= 4']], say: `${c('j')} = 4. Is ${c('4 < n - 1 - i')} (5 - 1 - 0 = 4)? No, so the inner loop ends. Pass 1 is done: <b>37</b>, the biggest, has "bubbled" to the end. It is in its final place.` });
  // passes 2-4 as summaries
  for (let i = 1; i < 4; i++) {
    const before = [...a]; let sw = 0;
    for (let j = 0; j < 4 - i; j++) { comps++; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; moves++; sw++; } }
    const lim = 4 - i;
    s.push({ lines: [3, 4, 5, 6, 7, 8], pic: P({ vals: [...a], comps, moves, chip: `pass ${i + 1}`, kinds: doneFrom(4 - i, 4) }), vars: [['i', `= ${i}`]],
      say: `Pass ${i + 1} (${c(`i = ${i}`)}): the inner loop runs while ${c(`j < ${lim}`)}, so it compares ${lim} pair${lim > 1 ? 's' : ''} and skips the ${i + 1} sorted value${i ? 's' : ''} at the end. ${before.join(', ')} becomes ${a.join(', ')} (${sw} swap${sw === 1 ? '' : 's'}).` });
  }
  s.push({ lines: [3, 12], pic: P({ vals: [...a], comps, moves, kinds: doneFrom(0, 4), note: 'sorted!', noteFill: GREEN }), vars: [['i', '= 4']], say: `${c('i++')} makes ${c('i')} = 4. Is ${c('4 < 4')}? No, so the outer loop ends and the method finishes. The array is sorted after <b>${comps} comparisons</b> and <b>${moves} swaps</b>.` });
  return s;
}

export const selectionCode = String.raw`static void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIndex = i;                   // smallest so far
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;                   // found a smaller one
      }
    }
    int temp = arr[i];                  // swap it to the front
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}`;

export function selectionWalk() {
  const a = [...SCORES], s = [];
  const P = (o = {}) => sortPic(o.vals || a, { ...o, alt: (o.vals || a).join(', ') });
  s.push({ lines: [1, 2], pic: P({ comps: 0, moves: 0 }), vars: [['n', '= 5']], say: `We call ${c('selectionSort(arr)')} on the same five scores. ${c('n')} = 5.` });
  s.push({ lines: [3, 4], pic: P({ comps: 0, moves: 0, chip: 'pass 1', kinds: { 0: 'min' }, ptr: { 'i min': 0 } }), vars: [['i', '= 0'], ['minIndex', '= 0']], say: `Pass 1 (${c('i = 0')}) fills index 0. Before looking, the method <b>assumes</b> the first value of the unsorted part is the smallest: ${c('minIndex = 0')} (the value 29).` });
  let m = 0, comps = 0;
  for (let j = 1; j < 5; j++) {
    comps++;
    const smaller = a[j] < a[m], old = m;
    s.push({ lines: [5, 6], pic: P({ comps, moves: 0, chip: 'pass 1', kinds: { [m]: 'min', [j]: 'cmp' }, ptr: { i: 0, j, ...(m ? { min: m } : {}) } }), vars: [['j', `= ${j}`], ['arr[j]', `= ${a[j]}`], ['arr[minIndex]', `= ${a[m]}`]],
      say: `${j === 1 ? `The inner loop starts right after ${c('i')}: ${c('j = 1')}. ` : `${c('j')} = ${j}. `}Is ${c('arr[j] < arr[minIndex]')}, ${a[j]} &lt; ${a[m]}? <b>${smaller ? 'Yes' : 'No'}</b>.` });
    if (smaller) {
      m = j;
      s.push({ lines: [7], pic: P({ comps, moves: 0, chip: 'pass 1', kinds: { [m]: 'min' }, ptr: { i: 0, 'j min': j } }), vars: [['minIndex', `= ${j}`]], say: `${c(`minIndex = ${j}`)}: the smallest so far is now ${a[j]}, at index ${j}. (${a[old]} is no longer the smallest.)` });
    }
  }
  [a[0], a[m]] = [a[m], a[0]];
  s.push({ lines: [10, 11, 12], pic: P({ comps, moves: 1, chip: 'pass 1', kinds: { 0: 'done', [m]: 'swap' }, swap: [0, m], ptr: { i: 0, min: m } }), vars: [['temp', '= 29']], say: `The inner loop has checked the whole unsorted part, so ${c('minIndex')} = ${m} is the real smallest. Swap ${c('arr[0]')} and ${c(`arr[${m}]`)} with ${c('temp')}: 10 goes to the front. Pass 1 is done: <b>one</b> swap.` });
  let moves = 1;
  const notes = [];
  for (let i = 1; i < 4; i++) {
    let mm = i; for (let j = i + 1; j < 5; j++) { comps++; if (a[j] < a[mm]) mm = j; }
    const self = mm === i, low = a[mm], was = a[i];
    [a[i], a[mm]] = [a[mm], a[i]]; moves++;
    s.push({ lines: [3, 4, 5, 6, 7, 10, 11, 12], pic: P({ vals: [...a], comps, moves, chip: `pass ${i + 1}`, kinds: { ...doneFrom(0, i), ...(self ? {} : { [mm]: 'swap' }) }, swap: self ? null : [i, mm] }), vars: [['i', `= ${i}`], ['minIndex', `= ${mm}`]],
      say: `Pass ${i + 1} (${c(`i = ${i}`)}): ${c('j')} looks at indexes ${i + 1} to 4 and finds the smallest, ${low}. ` + (self ? `It is already at index ${i}, so the swap swaps ${low} with itself: nothing moves.` : `Swap it with ${was} at index ${i}.`) });
  }
  s.push({ lines: [3, 14], pic: P({ vals: [...a], comps, moves, kinds: doneFrom(0, 4), note: 'sorted!', noteFill: GREEN }), vars: [['i', '= 4']], say: `${c('i')} = 4 and ${c('4 < 4')} is false, so the method ends. The last value, 37, is in place without a pass of its own. Total: <b>${comps} comparisons</b> and <b>${moves} swaps</b>.` });
  return s;
}

export const insertionCode = String.raw`static void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];                   // the value to insert
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];              // shift the bigger value right
      j--;
    }
    arr[j + 1] = key;                   // drop key into the gap
  }
}`;

export function insertionWalk() {
  const s = [];
  const P = (vals, o = {}) => sortPic(vals, { moveWord: 'shifts', ...o, alt: vals.map((v) => v ?? 'gap').join(', ') });
  s.push({ lines: [1], pic: P([29, 10, 14, 37, 13], { comps: 0, moves: 0, kinds: { 0: 'done' } }), vars: [], say: `We call ${c('insertionSort(arr)')} on the same scores. The first value, 29, alone is already a sorted part (green), so the loop starts at index 1.` });
  s.push({ lines: [2, 3, 4], pic: P([29, null, 14, 37, 13], { comps: 0, moves: 0, chip: 'key = 10', kinds: { 0: 'done', 1: 'gap' }, ptr: { j: 0, i: 1 } }), vars: [['i', '= 1'], ['key', '= 10'], ['j', '= 0']], say: `${c('i = 1')}: ${c('key = arr[1]')} saves 10 in a variable, so its slot can be used as a gap. ${c('j = i - 1')} = 0 points at the value just left of the gap.` });
  s.push({ lines: [5], pic: P([29, null, 14, 37, 13], { comps: 1, moves: 0, chip: 'key = 10', kinds: { 0: 'cmp', 1: 'gap' }, ptr: { j: 0 } }), vars: [['arr[j]', '= 29']], say: `Is ${c('j >= 0')}? Yes. Is ${c('arr[0] > key')}, 29 &gt; 10? Yes. Both are true, so the loop body runs.` });
  s.push({ lines: [6, 7], pic: P([null, 29, 14, 37, 13], { comps: 1, moves: 1, chip: 'key = 10', kinds: { 0: 'gap', 1: 'swap' }, shift: [0, 1], ptr: { j: -1 } }), vars: [['j', '= -1']], say: `${c('arr[1] = arr[0]')} shifts 29 one slot right; the gap is now at index 0. ${c('j--')} makes ${c('j')} = -1.` });
  s.push({ lines: [5], pic: P([null, 29, 14, 37, 13], { comps: 1, moves: 1, chip: 'key = 10', kinds: { 0: 'gap', 1: 'done' }, ptr: { j: -1 } }), vars: [['j', '= -1']], say: `Is ${c('j >= 0')}? <b>No</b> (-1). With ${c('&&')}, Java stops right there and never looks at ${c('arr[-1]')}, which does not exist. The loop ends.` });
  s.push({ lines: [9], pic: P([10, 29, 14, 37, 13], { comps: 1, moves: 1, chip: 'key = 10', kinds: { 0: 'swap', 1: 'done' }, ptr: { 'j+1': 0 } }), vars: [['arr[0]', '= 10']], say: `${c('arr[j + 1] = key')}: ${c('arr[0]')} = 10. The key drops into the gap. Sorted part: 10, 29.` });
  s.push({ lines: [2, 3, 4], pic: P([10, 29, null, 37, 13], { comps: 1, moves: 1, chip: 'key = 14', kinds: { 0: 'done', 1: 'done', 2: 'gap' }, ptr: { j: 1, i: 2 } }), vars: [['i', '= 2'], ['key', '= 14'], ['j', '= 1']], say: `${c('i = 2')}: the key is 14, and ${c('j')} = 1.` });
  s.push({ lines: [5, 6, 7], pic: P([10, null, 29, 37, 13], { comps: 2, moves: 2, chip: 'key = 14', kinds: { 0: 'done', 1: 'gap', 2: 'swap' }, shift: [1, 2], ptr: { j: 0 } }), vars: [['j', '= 0']], say: `29 &gt; 14, so shift 29 right. ${c('j')} becomes 0.` });
  s.push({ lines: [5], pic: P([10, null, 29, 37, 13], { comps: 3, moves: 2, chip: 'key = 14', kinds: { 0: 'cmp', 1: 'gap', 2: 'done' }, ptr: { j: 0 } }), vars: [['arr[j]', '= 10']], say: `${c('j >= 0')} is true. Is 10 &gt; 14? <b>No</b>, so the loop ends: everything left of the gap is smaller than the key.` });
  s.push({ lines: [9], pic: P([10, 14, 29, 37, 13], { comps: 3, moves: 2, chip: 'key = 14', kinds: { 0: 'done', 1: 'swap', 2: 'done' }, ptr: { 'j+1': 1 } }), vars: [['arr[1]', '= 14']], say: `${c('arr[1] = 14')}. Sorted part: 10, 14, 29.` });
  s.push({ lines: [2, 3, 4, 5, 9], pic: P([10, 14, 29, 37, 13], { comps: 4, moves: 2, chip: 'key = 37', kinds: doneFrom(0, 3), ptr: { i: 3 } }), vars: [['i', '= 3'], ['key', '= 37']], say: `${c('i = 3')}: the key is 37. One comparison, 29 &gt; 37? No. Nothing shifts, and 37 drops back into its own slot.` });
  s.push({ lines: [2, 3, 4, 5, 6, 7, 9], pic: P([10, 13, 14, 29, 37], { comps: 8, moves: 5, chip: 'key = 13', kinds: { ...doneFrom(0, 4), 1: 'swap' }, ptr: { 'j+1': 1, i: 4 } }), vars: [['i', '= 4'], ['key', '= 13']], say: `${c('i = 4')}: the key is 13. 37, 29, and 14 are bigger, so all three shift right. 10 &gt; 13 is false, so the loop stops and 13 drops in at index 1.` });
  s.push({ lines: [2, 11], pic: P([10, 13, 14, 29, 37], { comps: 8, moves: 5, kinds: doneFrom(0, 4), note: 'sorted!', noteFill: GREEN }), vars: [['i', '= 5']], say: `${c('i')} = 5 is not less than 5, so the method ends. Sorted after <b>8 comparisons</b> and <b>5 shifts</b>.` });
  return s;
}

/* ---------- Single pictures ---------- */

const cell = (x, y, v, k = '', w = 48, h = 40) => { const [f, s, t, d] = KIND[k]; return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="${s}" stroke-width="2"${d}/>` + (v === '' || v == null ? '' : T(x + w / 2, y + h / 2 + 6, v, { mono: true, size: 16, w: 700, fill: t })); };

/** Clean: the swap with temp in three lines (and the bad swap without temp when bad = true). */
export function swapPic(bad = false) {
  const rows = bad
    ? [['start', [29, 10, ''], null], ['arr[j] = arr[j + 1];', [10, 10, ''], 0], ['arr[j + 1] = arr[j];', [10, 10, ''], 1]]
    : [['start', [29, 10, ''], null], ['int temp = arr[j];', [29, 10, 29], 2], ['arr[j] = arr[j + 1];', [10, 10, 29], 0], ['arr[j + 1] = temp;', [10, 29, 29], 1]];
  const H = 62;
  let b = T(56, 20, 'arr[j]', { mono: true, size: 11, w: 700, fill: SOFT }) + T(110, 20, 'arr[j+1]', { mono: true, size: 11, w: 700, fill: SOFT });
  if (!bad) b += T(166, 20, 'temp', { mono: true, size: 12, w: 700, fill: SOFT });
  rows.forEach(([label, v, hot], r) => {
    const y = 30 + r * H;
    v.forEach((val, k) => { if (bad && k === 2) return; const x = k === 2 ? 144 : 34 + k * 50; b += cell(x, y, val, hot === k ? (bad && r === 2 ? 'bad' : 'swap') : '', 44); });
    b += T(196, y + 25, label, { mono: true, size: 11.5, w: 700, fill: label === 'start' ? SOFT : '#b4461a', anchor: 'start' });
    b += T(14, y + 26, r ? `${r}` : '', { size: 13, w: 800, fill: '#e8662e' });
  });
  const yEnd = 30 + rows.length * H + 4;
  b += bad ? T(170, yEnd, '29 is gone: both slots hold 10.', { size: 13, w: 800, fill: RED }) : T(170, yEnd, 'Swapped: 10, 29. temp kept 29 safe.', { size: 13, w: 800, fill: GREEN });
  const alt = bad ? 'Swapping without temp: start 29, 10. After arr[j] = arr[j + 1], both are 10. After arr[j + 1] = arr[j], still both 10. 29 is gone.' : 'Swapping with temp: start 29, 10. temp = arr[j] saves 29. arr[j] = arr[j + 1] makes it 10, 10. arr[j + 1] = temp makes it 10, 29.';
  return `<svg class="objbox sort-pic" viewBox="0 0 340 ${yEnd + 12}" role="img" aria-label="${alt}">${b}</svg>`;
}

/** Clean, bubble mistake: j < n reaches j + 1 = 5, a slot that does not exist. */
export function boundsPic() {
  return sortPic([10, 14, 29, 13, 37], { kinds: { 4: 'cmp' }, ptr: { j: 4, 'j+1': 5 }, ghost: 5, note: 'arr[5] does not exist: ArrayIndexOutOfBoundsException', noteFill: RED, alt: 'With j < n, j reaches 4 and the code reads arr[j + 1], which is arr[5]. The array has only indexes 0 to 4, so Java stops with ArrayIndexOutOfBoundsException.' }).replace('viewBox="0 0 340 212"', 'viewBox="-30 0 400 212"');
}

/** Clean, selection mistake: comparing with arr[i] instead of arr[minIndex]. */
export function wrongMinPic() {
  const a = sortPic([29, 10, 14, 37, 13], { kinds: { 0: 'cmp', 1: 'min', 2: 'min', 4: 'min' }, ptr: { i: 0, min: 4 }, note: '10, 14, 13 are all smaller than 29; the LAST one wins', noteFill: SOFT, alt: 'Pass 1 with the bug: every value is compared with arr[i], 29. 10, 14, and 13 are all smaller than 29, so minIndex ends at the last of them, index 4 (13).' });
  const b = sortPic([13, 10, 14, 37, 29], { kinds: { 0: 'bad', 1: 'bad' }, swap: [0, 4], ptr: { i: 0 }, note: '13 goes to the front, but 10 is smaller: wrong!', noteFill: RED, alt: 'Result of pass 1 with the bug: 13, 10, 14, 37, 29. 13 is at the front, but 10 is smaller, so the array will not end up sorted.' });
  return a + b;
}

/** Clean, insertion mistake: arr[j] > key && j >= 0 reads arr[-1] first. */
export function negIndexPic() {
  return sortPic([null, 29, 14, 37, 13], { chip: 'key = 10', kinds: { 0: 'gap', 1: 'done' }, ptr: { j: -1 }, ghost: -1, note: 'arr[-1] is read before j >= 0 is checked: crash', noteFill: RED, alt: 'j is -1. With arr[j] > key written first, Java reads arr[-1], which does not exist, and stops with ArrayIndexOutOfBoundsException.' }).replace('viewBox="0 0 340 212"', 'viewBox="-30 0 400 212"');
}

/** Clean: why bubble and selection need about n x n / 2 comparisons (a staircase of dots). */
export function stairsPic() {
  let b = T(170, 20, 'Comparisons for 5 values (bubble or selection)', { size: 13.5 });
  const rows = [4, 3, 2, 1];
  rows.forEach((k, r) => {
    const y = 44 + r * 34;
    b += T(16, y + 5, `pass ${r + 1}`, { size: 12.5, w: 800, fill: SOFT, anchor: 'start' });
    for (let d = 0; d < k; d++) b += `<circle cx="${86 + d * 32}" cy="${y}" r="11" fill="#e8662e" stroke="#b4461a" stroke-width="1.6"/>`;
    b += T(228, y + 5, `${k} comparison${k > 1 ? 's' : ''}`, { size: 12.5, w: 700, fill: SOFT, anchor: 'start' });
  });
  b += `<path d="M16 186 H324" stroke="#1b2a2e" stroke-width="1.5"/>`;
  b += T(170, 210, '4 + 3 + 2 + 1 = 10 comparisons', { mono: true, size: 13.5, w: 700, fill: '#0b544e' });
  b += T(170, 236, 'For 1,000 values: 999 + 998 + … + 1 = 499,500', { size: 12.5, w: 800, fill: RED });
  return `<svg class="objbox sort-pic" viewBox="0 0 340 248" role="img" aria-label="A staircase of comparisons for 5 values: pass 1 has 4, pass 2 has 3, pass 3 has 2, pass 4 has 1, for 10 in total. For 1,000 values the same staircase adds up to 499,500 comparisons.">${b}</svg>`;
}

/** Clean: stability with three students (A-to-Z list sorted by grade, lowest first). */
export function stablePic() {
  const card = (x, y, nm, g, k = '') => { const [f, s] = KIND[k]; return `<rect x="${x}" y="${y}" width="96" height="44" rx="6" fill="${f}" stroke="${s}" stroke-width="2"/>` + T(x + 48, y + 19, nm, { size: 13.5, w: 800 }) + T(x + 48, y + 36, g, { mono: true, size: 13, w: 700, fill: SOFT }); };
  const row = (y, label, list, color) => { let r = T(14, y - 8, label, { size: 13, w: 800, fill: color, anchor: 'start' }); list.forEach(([nm, g, k], i) => { r += card(14 + i * 106, y, nm, g, k); }); return r; };
  let b = row(26, 'Start: A to Z', [['Ana', 85], ['Ben', 85], ['Cris', 80]], SOFT);
  b += row(110, 'Stable (insertion, bubble): Ana still before Ben', [['Cris', 80, 'done'], ['Ana', 85, 'done'], ['Ben', 85, 'done']], GREEN);
  b += row(194, 'Not stable (selection): Ben jumped ahead of Ana', [['Cris', 80, 'done'], ['Ben', 85, 'bad'], ['Ana', 85, 'bad']], RED);
  return `<svg class="objbox sort-pic" viewBox="0 0 340 250" role="img" aria-label="Start, in A-to-Z order: Ana 85, Ben 85, Cris 80. Sorted by grade, lowest first. Stable result from insertion or bubble sort: Cris 80, Ana 85, Ben 85; Ana and Ben keep their order. Selection sort result: Cris 80, Ben 85, Ana 85; the tie changed order, so it is not stable.">${b}</svg>`;
}
