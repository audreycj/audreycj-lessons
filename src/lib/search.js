// Linear and binary search: one picture builder + step builders, shared by the lesson's walkthroughs,
// its by-hand stepper, and the SearchLab (runs in the browser too, so no Rough.js here).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.mono ? '&quot;IBM Plex Mono&quot;, monospace' : 'Nunito, system-ui, sans-serif'}" font-size="${o.size ?? 13}" font-weight="${o.w ?? 800}" fill="${o.fill ?? '#1b2a2e'}" text-anchor="${o.anchor ?? 'middle'}">${esc(t)}</text>`;
const KIND = {
  '': ['#ffffff', '#1b2a2e', '#1b2a2e', ''],
  cur: ['#e8662e', '#b4461a', '#ffffff', ''],
  checked: ['#d7ece9', '#0e6b63', '#1b2a2e', ''],
  out: ['#eef2f2', '#9aa8aa', '#9aa8aa', ' stroke-dasharray="5 4"'],
  found: ['#2e7d4f', '#1f5a38', '#ffffff', ''],
};
export const BIN = [4, 9, 15, 21, 27, 34, 42, 56, 63, 71, 80, 88];
export const LIN = [42, 17, 8, 93, 25, 61];

/** The array with colored cells, index numbers, pointer labels under cells, a target chip, and a checks counter. */
export function searchPic(vals, o = {}) {
  const n = vals.length, w = Math.min(52, Math.floor(324 / n)), x0 = (340 - n * w) / 2, y = 46;
  let b = '';
  if (o.target != null) b += `<rect x="8" y="6" width="112" height="26" rx="6" fill="#fbdccc" stroke="#e8662e" stroke-width="1.8"/>` + T(64, 24, `target = ${o.target}`, { mono: true, size: 13, w: 700 });
  if (o.checks != null) b += T(332, 24, `checks: ${o.checks}`, { mono: true, size: 13, w: 700, fill: '#0b544e', anchor: 'end' });
  vals.forEach((v, i) => {
    const [f, s, t, d] = KIND[(o.kinds || {})[i] || ''], x = x0 + i * w;
    b += `<rect x="${x}" y="${y}" width="${w}" height="40" fill="${f}" stroke="${s}" stroke-width="2"${d}/>`;
    b += T(x + w / 2, y + 26, v, { mono: true, size: w < 32 ? 13 : 15, w: 700, fill: t });
    b += T(x + w / 2, y + 58, i, { mono: true, size: 11.5, w: 600, fill: '#37474a' });
  });
  const at = {};
  for (const [name, i] of Object.entries(o.ptr || {})) if (i != null && i >= 0 && i < n) (at[i] = at[i] || []).push(name);
  for (const [i, names] of Object.entries(at)) {
    const cx = x0 + (+i) * w + w / 2;
    b += `<path d="M${cx} 112 l-6 9 h12 Z" fill="#e8662e"/>`;
    names.forEach((nm, k) => { b += T(cx, 137 + k * 15, nm, { mono: true, size: 12.5, w: 700, fill: '#b4461a' }); });
  }
  if (o.note) b += T(170, 192, o.note, { size: 12.5, w: 800, fill: o.noteFill || '#37474a' });
  return `<svg class="objbox search-pic" viewBox="0 0 340 202" role="img" aria-label="${esc(o.alt || 'An array')}">${b}</svg>`;
}

const range = (a, b) => { const r = {}; for (let i = a; i <= b; i++) r[i] = 'out'; return r; };
const c = (s) => `<code>${s}</code>`;

/** Steps for the lab: linear search (arr may be unsorted). Each: { kinds, ptr, checks, say, note } */
export function linearSteps(arr, t) {
  const s = [], kinds = {};
  s.push({ kinds: {}, ptr: { i: 0 }, checks: 0, say: `Linear search for ${t}: start at index 0 and look at one value at a time.` });
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === t) {
      s.push({ kinds: { ...kinds, [i]: 'found' }, ptr: { i }, checks: i + 1, say: `Check index ${i}: ${arr[i]}. It is ${t}! <b>Found at index ${i}</b> after ${i + 1} check${i ? 's' : ''}. The search stops here.`, note: `found at index ${i}`, noteFill: '#1f5a38' });
      return s;
    }
    s.push({ kinds: { ...kinds, [i]: 'cur' }, ptr: { i }, checks: i + 1, say: `Check index ${i}: ${arr[i]}. Is it ${t}? No. Move on to index ${i + 1}.` });
    kinds[i] = 'checked';
  }
  s.push({ kinds: { ...kinds }, ptr: {}, checks: arr.length, say: `Every value was checked (${arr.length} checks) and none is ${t}. <b>Not found</b>: the search gives back -1.`, note: 'not found: -1', noteFill: '#b23a33' });
  return s;
}

/** Steps for the lab: binary search (arr must be sorted). mid = (low + high) / 2, rounded down. */
export function binarySteps(arr, t) {
  const s = []; let low = 0, high = arr.length - 1, checks = 0, out = {};
  s.push({ kinds: {}, ptr: { low, high }, checks, say: `Binary search for ${t}. The list is sorted. Start with the whole list: low = 0, high = ${high}.` });
  while (low <= high) {
    const mid = Math.floor((low + high) / 2); checks++;
    const ptr = { low, mid, high };
    if (arr[mid] === t) {
      s.push({ kinds: { ...out, [mid]: 'found' }, ptr, checks, say: `mid = (${low} + ${high}) / 2 = ${mid}. Check index ${mid}: ${arr[mid]}. It is ${t}! <b>Found at index ${mid}</b> after ${checks} check${checks > 1 ? 's' : ''}.`, note: `found at index ${mid}`, noteFill: '#1f5a38' });
      return s;
    }
    s.push({ kinds: { ...out, [mid]: 'cur' }, ptr, checks, say: `mid = (${low} + ${high}) / 2 = ${mid}${(low + high) % 2 ? ' (rounded down)' : ''}. Check index ${mid}: ${arr[mid]}. Is it ${t}? No.` });
    if (arr[mid] < t) { out = { ...out, ...range(low, mid) }; low = mid + 1; s.push({ kinds: { ...out }, ptr: { low, high }, checks, say: `${arr[mid]} &lt; ${t}, so ${t} can only be to the <b>right</b> of index ${mid}. Rule out the left part: low = mid + 1 = ${low}.` }); }
    else { out = { ...out, ...range(mid, high) }; high = mid - 1; s.push({ kinds: { ...out }, ptr: { low, high }, checks, say: `${arr[mid]} &gt; ${t}, so ${t} can only be to the <b>left</b> of index ${mid}. Rule out the right part: high = mid - 1 = ${high}.` }); }
  }
  s.push({ kinds: { ...out }, ptr: {}, checks, say: `low (${low}) is now past high (${high}): nothing is left to check. <b>Not found</b> after ${checks} checks: the search gives back -1.`, note: 'not found: -1', noteFill: '#b23a33' });
  return s;
}

export const linearCode = String.raw`static int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return i;         // found: give back its index
    }
  }
  return -1;            // checked them all: not found
}`;

/** CodeWalk: linear search for 93 in LIN. */
export function linearWalk() {
  const arr = LIN, t = 93, s = [];
  s.push({ lines: [1], pic: searchPic(arr, { target: t, checks: 0, alt: 'The array 42, 17, 8, 93, 25, 61. We look for 93.' }), vars: [['target', '= 93']], say: `We call ${c('linearSearch(arr, 93)')}. The method gets the array and the value to look for, the <b>target</b>: 93. The values are not in order, and that is fine for linear search.` });
  const kinds = {};
  for (let i = 0; i <= 3; i++) {
    s.push({ lines: [2], pic: searchPic(arr, { target: t, checks: i, kinds: { ...kinds }, ptr: { i }, alt: `i is ${i}.` }), vars: [['i', `= ${i}`]], say: i === 0 ? `The loop starts at ${c('i = 0')}, the first slot. Is ${c(`0 < arr.length`)} (6)? Yes, so the loop body runs.` : `${c('i++')} makes ${c('i')} = ${i}. Is ${c(`${i} < 6`)}? Yes.` });
    if (i < 3) {
      s.push({ lines: [3], pic: searchPic(arr, { target: t, checks: i + 1, kinds: { ...kinds, [i]: 'cur' }, ptr: { i }, alt: `Check index ${i}: ${arr[i]}, not 93.` }), vars: [['arr[i]', `= ${arr[i]}`]], say: `${c(`arr[${i}] == target`)}: is ${arr[i]} equal to 93? <b>No</b>, so ${c('return i;')} is skipped and the loop moves on.` });
      kinds[i] = 'checked';
    } else {
      s.push({ lines: [3], pic: searchPic(arr, { target: t, checks: 4, kinds: { ...kinds, 3: 'cur' }, ptr: { i: 3 }, alt: 'Check index 3: 93.' }), vars: [['arr[i]', '= 93']], say: `${c('arr[3] == target')}: is 93 equal to 93? <b>Yes!</b>` });
      s.push({ lines: [4], pic: searchPic(arr, { target: t, checks: 4, kinds: { ...kinds, 3: 'found' }, ptr: { i: 3 }, note: 'returns 3', noteFill: '#1f5a38', alt: 'Found at index 3; the method returns 3.' }), vars: [['returns', '3']], say: `${c('return i;')} gives back <b>3</b>, the index where 93 is, and the method stops right away. 25 and 61 are never checked. That took <b>4 checks</b>.` });
    }
  }
  s.push({ lines: [7], pic: searchPic(arr, { target: 50, checks: 6, kinds: { 0: 'checked', 1: 'checked', 2: 'checked', 3: 'checked', 4: 'checked', 5: 'checked' }, note: 'returns -1', noteFill: '#b23a33', alt: 'Searching for 50: all six values checked, not found, returns -1.' }), vars: [['returns', '-1']], say: `What if the target is <b>not</b> there? Say we search for 50. Every check says no, the loop ends after 6 checks, and line 7 runs: ${c('return -1;')}. -1 can never be a real index, so it means "not found".` });
  return s;
}

export const binaryCode = String.raw`static int binarySearch(int[] arr, int target) {
  int low = 0;
  int high = arr.length - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == target) {
      return mid;              // found
    } else if (arr[mid] < target) {
      low = mid + 1;           // target is to the right
    } else {
      high = mid - 1;          // target is to the left
    }
  }
  return -1;                   // nothing left: not found
}`;

/** CodeWalk: binary search for 20 in BIN (not found). */
export function binaryWalk() {
  const arr = BIN, t = 20, s = [];
  const P = (o) => searchPic(arr, { target: t, ...o });
  s.push({ lines: [1], pic: P({ checks: 0, alt: 'The sorted array of 12 values. We look for 20.' }), vars: [['target', '= 20']], say: `We call ${c('binarySearch(arr, 20)')} on the sorted array. 20 is not in it, so we will see how the method finds out.` });
  s.push({ lines: [2, 3], pic: P({ checks: 0, ptr: { low: 0, high: 11 }, alt: 'low is 0, high is 11.' }), vars: [['low', '= 0'], ['high', '= 11']], say: `${c('low')} and ${c('high')} mark the part that is still possible: the whole array, index 0 to ${c('arr.length - 1')} = 11.` });
  s.push({ lines: [4], pic: P({ checks: 0, ptr: { low: 0, high: 11 }, alt: 'low <= high.' }), vars: [['low', '= 0'], ['high', '= 11']], say: `Is ${c('0 <= 11')}? Yes: there is still something to check, so the loop body runs.` });
  s.push({ lines: [5], pic: P({ checks: 1, ptr: { low: 0, mid: 5, high: 11 }, kinds: { 5: 'cur' }, alt: 'mid is 5.' }), vars: [['mid', '= 5']], say: `${c('mid = (0 + 11) / 2')}. 11 / 2 with two ints is 5 (the decimal part is dropped). The middle value is ${c('arr[5]')} = 34.` });
  s.push({ lines: [6, 8], pic: P({ checks: 1, ptr: { low: 0, mid: 5, high: 11 }, kinds: { 5: 'cur' }, alt: '34 is not 20, and not less than 20.' }), vars: [['arr[mid]', '= 34']], say: `Is 34 == 20? No. Is 34 &lt; 20? No. So 34 is <b>bigger</b> than 20, and the ${c('else')} part runs.` });
  s.push({ lines: [11], pic: P({ checks: 1, ptr: { low: 0, high: 4 }, kinds: range(5, 11), alt: 'high is now 4; indexes 5 to 11 are ruled out.' }), vars: [['high', '= 4']], say: `${c('high = mid - 1')} = 4. Everything from index 5 to 11 is bigger than 34, so it is <b>ruled out</b> (dashed). One check removed 7 values.` });
  s.push({ lines: [4, 5], pic: P({ checks: 2, ptr: { low: 0, mid: 2, high: 4 }, kinds: { ...range(5, 11), 2: 'cur' }, alt: 'mid is 2.' }), vars: [['mid', '= 2']], say: `${c('0 <= 4')}, so loop again. ${c('mid = (0 + 4) / 2')} = 2. ${c('arr[2]')} = 15.` });
  s.push({ lines: [8, 9], pic: P({ checks: 2, ptr: { low: 3, high: 4 }, kinds: { ...range(0, 2), ...range(5, 11) }, alt: 'low is now 3.' }), vars: [['low', '= 3']], say: `15 &lt; 20, so 20 can only be to the right: ${c('low = mid + 1')} = 3. Only indexes 3 and 4 are left.` });
  s.push({ lines: [4, 5], pic: P({ checks: 3, ptr: { low: 3, mid: 3, high: 4 }, kinds: { ...range(0, 2), ...range(5, 11), 3: 'cur' }, alt: 'mid is 3.' }), vars: [['mid', '= 3']], say: `${c('3 <= 4')}, so loop again. ${c('mid = (3 + 4) / 2')} = 3 (7 / 2 rounds down). ${c('arr[3]')} = 21.` });
  s.push({ lines: [10, 11], pic: P({ checks: 3, ptr: { low: 3, high: 2 }, kinds: { ...range(0, 2), ...range(3, 11) }, alt: 'high is now 2, below low.' }), vars: [['high', '= 2']], say: `21 &gt; 20, so ${c('high = mid - 1')} = 2. Now ${c('high')} (2) is <b>below</b> ${c('low')} (3): every value is ruled out.` });
  s.push({ lines: [4, 14], pic: P({ checks: 3, kinds: { ...range(0, 11) }, note: 'returns -1', noteFill: '#b23a33', alt: 'The loop ends; the method returns -1.' }), vars: [['returns', '-1']], say: `Is ${c('3 <= 2')}? No, so the loop ends and ${c('return -1;')} runs: <b>not found</b>, after only <b>3 checks</b>. Linear search would have checked all 12 values.` });
  return s;
}

/** StepShow by hand: binary search for 71 in BIN. */
export function binaryHand() {
  return binarySteps(BIN, 71).map((st) => ({ pic: searchPic(BIN, { target: 71, checks: st.checks, kinds: st.kinds, ptr: st.ptr, note: st.note, noteFill: st.noteFill, alt: st.say.replace(/<[^>]+>/g, '') }), say: st.say }));
}

/** Clean: how fast halving shrinks 1,000 values: 10 checks at most. */
export function halvingPic() {
  const v = [1000, 500, 250, 125, 62, 31, 15, 7, 3, 1];
  let b = T(170, 20, 'Binary search on 1,000 sorted values', { size: 14 });
  b += T(170, 40, 'values still possible after each check (worst case)', { size: 12, w: 700, fill: '#37474a' });
  v.forEach((n, i) => {
    const row = i < 5 ? 0 : 1, col = i % 5, x = 14 + col * 64, y = 58 + row * 78;
    const w = 52, hot = i === v.length - 1;
    b += `<rect x="${x}" y="${y}" width="${w}" height="34" rx="6" fill="${hot ? '#2e7d4f' : '#d7ece9'}" stroke="${hot ? '#1f5a38' : '#0e6b63'}" stroke-width="1.8"/>` + T(x + w / 2, y + 22, n.toLocaleString('en-US'), { mono: true, size: 13, w: 700, fill: hot ? '#fff' : '#1b2a2e' });
    b += T(x + w / 2, y + 52, i === 0 ? 'start' : `after ${i}`, { size: 11.5, w: 700, fill: '#37474a' });
    if (col < 4 && i < v.length - 1) b += `<path d="M${x + w + 2} ${y + 17} h6" stroke="#e8662e" stroke-width="2"/><path d="M${x + w + 12} ${y + 17} l-5 -4 v8 Z" fill="#e8662e"/>`;
  });
  b += T(170, 230, 'About 10 checks, even with 1,000 values.', { size: 13, w: 800, fill: '#1f5a38' });
  b += T(170, 250, 'Linear search could need all 1,000.', { size: 13, w: 800, fill: '#b23a33' });
  return `<svg class="objbox search-pic" viewBox="0 0 340 262" role="img" aria-label="Binary search on 1,000 sorted values. In the worst case, the values still possible go 1,000, 500, 250, 125, 62, 31, 15, 7, 3, 1: about 10 checks. Linear search could need all 1,000.">${b}</svg>`;
}

/** Clean, mistake 1: return -1 inside the loop gives up after the first check. */
export function earlyReturnPic() {
  return searchPic(LIN, { target: 93, checks: 1, kinds: { 0: 'cur' }, ptr: { i: 0 }, note: 'returns -1 after 1 check, but 93 is at index 3!', noteFill: '#b23a33', alt: 'The buggy method checks only index 0 (42), then returns -1, even though 93 is at index 3.' });
}

/** Clean, mistake 2: binary search on an unsorted array misses a value that is there. */
export function unsortedPic() {
  const arr = [30, 10, 50, 20, 40];
  const a = searchPic(arr, { target: 20, checks: 1, kinds: { 2: 'cur' }, ptr: { low: 0, mid: 2, high: 4 }, note: '20 < 50, so it throws away the right side...', noteFill: '#37474a', alt: 'Unsorted array 30, 10, 50, 20, 40, target 20. mid is index 2, value 50. 20 is less than 50, so binary search rules out indexes 2 to 4.' });
  const b = searchPic(arr, { target: 20, checks: 2, kinds: { 0: 'cur', 2: 'out', 3: 'out', 4: 'out' }, ptr: { 'low mid': 0, high: 1 }, note: '...but 20 was at index 3. Result: -1 (wrong!)', noteFill: '#b23a33', alt: 'Next mid is index 0, value 30; 20 is less than 30, so high becomes -1 and the search returns -1, even though 20 is at index 3.' });
  return a + b;
}

/** Clean: binary search needs a jump to the middle, so it needs an array, not a linked list. */
export function jumpPic() {
  let b = T(14, 22, 'Array: jump straight to the middle', { size: 13.5, w: 800, fill: '#0b544e', anchor: 'start' });
  [4, 9, 15, 21, 27, 34, 42].forEach((v, i) => { const x = 14 + i * 44; b += `<rect x="${x}" y="34" width="44" height="36" fill="${i === 3 ? '#e8662e' : '#fff'}" stroke="#1b2a2e" stroke-width="2"/>` + T(x + 22, 57, v, { mono: true, size: 14, w: 700, fill: i === 3 ? '#fff' : '#1b2a2e' }); });
  b += T(14, 92, 'arr[3]: one step, like any index', { size: 12.5, w: 700, fill: '#37474a', anchor: 'start' });
  b += T(14, 128, 'Linked list: walk from head to reach it', { size: 13.5, w: 800, fill: '#b4461a', anchor: 'start' });
  [4, 9, 15, 21].forEach((v, i) => { const x = 14 + i * 80; b += `<rect x="${x}" y="140" width="44" height="36" fill="${i === 3 ? '#e8662e' : '#fff'}" stroke="#1b2a2e" stroke-width="2"/>` + T(x + 22, 163, v, { mono: true, size: 14, w: 700, fill: i === 3 ? '#fff' : '#1b2a2e' }); if (i < 3) b += `<path d="M${x + 46} 158 h26" stroke="#1b2a2e" stroke-width="2"/><path d="M${x + 78} 158 l-8 -5 v10 Z" fill="#1b2a2e"/>` + T(x + 61, 196, `hop ${i + 1}`, { size: 11.5, w: 700, fill: '#b4461a' }); });
  b += T(14, 222, 'Reaching the middle already costs half the list,', { size: 12.5, w: 700, fill: '#37474a', anchor: 'start' });
  b += T(14, 240, 'so binary search loses its speed.', { size: 12.5, w: 700, fill: '#37474a', anchor: 'start' });
  return `<svg class="objbox search-pic" viewBox="0 0 340 252" role="img" aria-label="Top: an array; arr[3] is reached in one step. Bottom: a linked list; reaching the fourth node takes three hops from head. Reaching the middle already costs half the list, so binary search loses its speed on a linked list.">${b}</svg>`;
}
