// Hash tables: one table picture + step builders for separate chaining and open addressing
// (linear probing, quadratic probing, double hashing). Shared by the Hashing lesson's steppers,
// walkthroughs and the HashLab (runs in the browser too, so no Rough.js here).
// Course conventions: h(k) = k mod m; try i = 0, 1, 2, ...; linear (h + i) mod m; quadratic (h + i²) mod m;
// double (h + i × step) mod m with step(k) = R − (k mod R), R = the largest prime smaller than m;
// chaining adds a new key at the END of its chain.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.mono ? '&quot;IBM Plex Mono&quot;, monospace' : 'Nunito, system-ui, sans-serif'}" font-size="${o.size ?? 13}" font-weight="${o.w ?? 800}" fill="${o.fill ?? '#1b2a2e'}" text-anchor="${o.anchor ?? 'middle'}">${o.raw ? t : esc(t)}</text>`;
const c = (s) => `<code>${s}</code>`;

export const KEYS = [50, 700, 76, 85, 92, 73];
export const M = 7;
export const mod = (k, m) => ((k % m) + m) % m;
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
/** R for double hashing: the largest prime smaller than m (m = 7 → 5, m = 5 → 3, m = 11 → 7). */
export const rFor = (m) => { for (let r = m - 1; r > 1; r--) if (isPrime(r)) return r; return 1; };
export const stepOf = (k, r) => r - (k % r);

export const METHOD = {
  chain: 'Separate chaining',
  linear: 'Linear probing',
  quadratic: 'Quadratic probing',
  double: 'Double hashing',
};
/** The slot for try i (before and after mod), and the working as text. */
export function trySlot(method, k, i, m, r) {
  const h = mod(k, m);
  if (method === 'linear') return { raw: h + i, slot: mod(h + i, m), work: `(${h}+${i}) mod ${m}` };
  if (method === 'quadratic') return { raw: h + i * i, slot: mod(h + i * i, m), work: `(${h}+${i}²) mod ${m}` };
  const st = stepOf(k, r);
  return { raw: h + i * st, slot: mod(h + i * st, m), work: `(${h}+${i}×${st}) mod ${m}` };
}

const KIND = {
  '': ['#ffffff', '#1b2a2e', '#1b2a2e', ''],
  home: ['#fbdccc', '#e8662e', '#1b2a2e', ''],
  busy: ['#f6d5d2', '#b23a33', '#1b2a2e', ''],
  placed: ['#2e7d4f', '#1f5a38', '#ffffff', ''],
  found: ['#2e7d4f', '#1f5a38', '#ffffff', ''],
  stop: ['#ffffff', '#b23a33', '#1b2a2e', ' stroke-dasharray="5 4"'],
  cluster: ['#fdeccc', '#c98a12', '#1b2a2e', ''],
  cur: ['#e8662e', '#b4461a', '#ffffff', ''],
};
const STATUS = { taken: '#b23a33', free: '#1f5a38', found: '#1f5a38', empty: '#b23a33', deleted: '#5d6b6d', 'no': '#b23a33' };

/**
 * The hash table drawn as a column of m slots (index on the left), 340 wide.
 * o.mode 'chain' | 'open'; o.slots: chain = array of arrays, open = array of key | null | 'DEL';
 * o.head = up to 3 header lines [title, line2, line3]; o.kinds = { slot: kind } for the slot boxes;
 * o.nodeKinds = { 'slot:index': kind } for chain nodes; o.tries = [{ i, slot, work, status }] (open mode notes + left arcs);
 * o.note / o.noteFill = bottom line; o.fixed = true keeps the same height for any m (lab); o.alt = aria-label.
 */
export function htPic(m, o = {}) {
  const rowH = o.fixed ? Math.min(40, Math.floor(330 / m)) : (m <= 7 ? 38 : 30);
  const top = 70, H = o.fixed ? top + 330 + 34 : top + m * rowH + 34;
  const xi = 46, x0 = 54, sw = 62, xr = x0 + sw + 10;
  let b = '';
  const hd = o.head || [];
  if (hd[0]) b += T(8, 18, hd[0], { size: 14, w: 800, fill: '#b4461a', anchor: 'start' });
  if (hd[1]) b += T(8, 37, hd[1], { mono: true, size: 12, w: 600, anchor: 'start' });
  if (hd[2]) b += T(8, 55, hd[2], { mono: true, size: 12, w: 600, fill: '#0b544e', anchor: 'start' });
  const yOf = (s) => top + s * rowH;
  for (let s = 0; s < m; s++) {
    const y = yOf(s), [f, st, tc, d] = KIND[(o.kinds || {})[s] || ''];
    b += T(xi, y + rowH / 2 + 4.5, s, { mono: true, size: 12.5, w: 600, fill: '#37474a', anchor: 'end' });
    b += `<rect x="${x0}" y="${y}" width="${sw}" height="${rowH}" fill="${f}" stroke="${st}" stroke-width="${f === '#ffffff' && st === '#1b2a2e' ? 1.6 : 2.2}"${d}/>`;
    const v = (o.slots || [])[s];
    if (o.mode === 'chain') {
      const chain = v || [];
      if (!chain.length) b += T(x0 + sw / 2, y + rowH / 2 + 4, 'null', { mono: true, size: 11, w: 500, fill: '#9aa8aa' });
      else {
        b += `<circle cx="${x0 + sw / 2}" cy="${y + rowH / 2}" r="3.6" fill="${tc}"/>`;
        const nw = 40, gap = 11, nh = rowH - 12, show = chain.length > 4 ? chain.slice(0, 3) : chain;
        b += `<path d="M${x0 + sw / 2 + 4} ${y + rowH / 2} H${xr + 1}" stroke="#1b2a2e" stroke-width="1.8"/><path d="M${xr + 6} ${y + rowH / 2} l-7 -4.5 v9 Z" fill="#1b2a2e"/>`;
        show.forEach((k, j) => {
          const x = xr + 6 + j * (nw + gap), [nf, ns, nt] = KIND[(o.nodeKinds || {})[`${s}:${j}`] || ''];
          b += `<rect x="${x}" y="${y + 6}" width="${nw}" height="${nh}" rx="5" fill="${nf}" stroke="${ns}" stroke-width="1.8"/>` + T(x + nw / 2, y + rowH / 2 + 4.5, k, { mono: true, size: 12.5, w: 700, fill: nt });
          if (j < show.length - 1) b += `<path d="M${x + nw} ${y + rowH / 2} h${gap - 5}" stroke="#1b2a2e" stroke-width="1.6"/><path d="M${x + nw + gap} ${y + rowH / 2} l-6 -4 v8 Z" fill="#1b2a2e"/>`;
        });
        if (chain.length > 4) { const x = xr + 6 + 3 * (nw + gap); b += `<path d="M${x - gap} ${y + rowH / 2} h${gap - 5}" stroke="#1b2a2e" stroke-width="1.6"/>` + T(x + 2, y + rowH / 2 + 4.5, `+${chain.length - 3} more`, { size: 11.5, w: 800, fill: '#b23a33', anchor: 'start' }); }
      }
    } else if (v === 'DEL') {
      b += T(x0 + sw / 2, y + rowH / 2 + 4, 'deleted', { size: 11, w: 800, fill: '#5d6b6d' });
    } else if (v != null) {
      b += T(x0 + sw / 2, y + rowH / 2 + 5.5, v, { mono: true, size: 15, w: 700, fill: tc });
    }
  }
  // tries: one note per slot (with every i that landed there) + a numbered badge (the i values) left of the index
  const tries = o.tries || [], at = {};
  tries.forEach((t) => { (at[t.slot] = at[t.slot] || []).push(t); });
  for (const list of Object.values(at)) {
    const t = list[list.length - 1], y = yOf(t.slot) + rowH / 2, is = list.map((x) => x.i).join(',');
    const lbl = list.length > 1 ? `i=${is}: all give ${t.slot}` : `i=${t.i}: ${t.work} = ${t.slot}`;
    b += `<text x="${xr}" y="${y + 4}" font-family="&quot;IBM Plex Mono&quot;, monospace" font-size="10.5" font-weight="600" fill="#1b2a2e">${esc(lbl)}<tspan dx="6" font-family="Nunito, system-ui, sans-serif" font-weight="800" font-size="11.5" fill="${STATUS[t.status] || '#1b2a2e'}">${esc(t.status)}</tspan></text>`;
    const col = t.status === 'free' || t.status === 'found' ? '#2e7d4f' : t.status === 'empty' ? '#b23a33' : '#e8662e', bw = Math.max(17, 8 + is.length * 7);
    b += `<rect x="${list.length > 1 ? 2 : 24 - bw}" y="${y - 8.5}" width="${bw}" height="17" rx="8.5" fill="${col}"/>` + T((list.length > 1 ? 2 : 24 - bw) + bw / 2, y + 4, is, { mono: true, size: 11, w: 700, fill: '#ffffff' });
  }
  if (o.note) b += T(170, H - 12, o.note, { size: 12.5, w: 800, fill: o.noteFill || '#37474a' });
  return `<svg class="objbox ht-pic" viewBox="0 0 340 ${H}" role="img" aria-label="${esc(o.alt || 'A hash table')}">${b}</svg>`;
}

const listTxt = (a) => a.join(' → ');

/** Insert steps for separate chaining. Each step: { pic options, say }. */
export function chainSteps(keys, m) {
  const slots = Array.from({ length: m }, () => []), steps = [];
  steps.push({ o: { mode: 'chain', slots: slots.map((x) => [...x]), head: [`Empty table, m = ${m}`, `h(k) = k mod ${m}`], alt: `An empty hash table with ${m} buckets, 0 to ${m - 1}.` }, say: `An empty table with ${m} buckets (0 to ${m - 1}). Every bucket starts as ${c('null')}: no chain yet. We insert the keys in order: ${keys.join(', ')}.` });
  for (const k of keys) {
    const h = mod(k, m), had = [...slots[h]];
    slots[h].push(k);
    const say = had.length
      ? `${k} mod ${m} = ${h}. Bucket ${h} already holds ${listTxt(had)}: a <b>collision</b>. No problem: add ${k} at the <b>end</b> of bucket ${h}'s chain.`
      : `${k} mod ${m} = ${h}. Bucket ${h} is empty, so ${k} becomes the first node of its chain.`;
    steps.push({ o: { mode: 'chain', slots: slots.map((x) => [...x]), kinds: { [h]: 'home' }, nodeKinds: { [`${h}:${slots[h].length - 1}`]: 'placed' }, head: [`Insert ${k}`, `h(${k}) = ${k} mod ${m} = ${h}`], alt: `Insert ${k}: ${k} mod ${m} is ${h}. Bucket ${h} now holds ${listTxt(slots[h])}.` }, say, k, h });
  }
  const longest = Math.max(...slots.map((x) => x.length)), at = slots.findIndex((x) => x.length === longest);
  steps.push({ o: { mode: 'chain', slots: slots.map((x) => [...x]), head: [`Done: ${keys.length} keys in ${m} buckets`, `h(k) = k mod ${m}`], note: `longest chain: ${longest} (bucket ${at})`, noteFill: '#0b544e', alt: `All keys stored. The longest chain has ${longest} keys, in bucket ${at}.` }, say: `All ${keys.length} keys are stored. Nothing had to move to another bucket: each key sits in the bucket its hash gave it. The longest chain is bucket ${at} (${longest} key${longest > 1 ? 's' : ''}). To find a key later, compute its bucket and walk only that chain.` });
  return { steps, slots };
}

/** Insert steps for open addressing. Each key = one step with all its tries. */
export function openSteps(keys, m, method, r = rFor(m)) {
  const slots = Array(m).fill(null), steps = [];
  let total = 0, failed = [];
  const line3 = method === 'double' ? null : `slot = ${method === 'linear' ? '(h + i)' : '(h + i²)'} mod ${m}`;
  steps.push({ o: { mode: 'open', slots: [...slots], head: [`Empty table, m = ${m}`, `h(k) = k mod ${m}`, method === 'double' ? `step(k) = ${r} − (k mod ${r})` : line3], alt: `An empty table with ${m} slots.` }, say: `An empty table with ${m} slots (0 to ${m - 1}). Each slot holds at most <b>one</b> key. We insert ${keys.join(', ')} in order, with <b>${METHOD[method].toLowerCase()}</b>.` });
  for (const k of keys) {
    const h = mod(k, m), tries = [], kinds = {};
    let placed = -1;
    for (let i = 0; i < m; i++) {
      const t = trySlot(method, k, i, m, r);
      total++;
      if (slots[t.slot] == null) { tries.push({ i, slot: t.slot, work: t.work, status: 'free' }); placed = t.slot; break; }
      tries.push({ i, slot: t.slot, work: t.work, status: 'taken' });
      kinds[t.slot] = 'busy';
    }
    if (placed >= 0) { slots[placed] = k; kinds[placed] = 'placed'; } else failed.push(k);
    const st = method === 'double' ? stepOf(k, r) : null;
    const head = [`Insert ${k}`, `h(${k}) = ${k} mod ${m} = ${h}`, method === 'double' ? `step(${k}) = ${r} − (${k} mod ${r}) = ${st}` : line3];
    const taken = tries.filter((t) => t.status === 'taken');
    let say;
    if (placed < 0) say = `${k} mod ${m} = ${h}. All ${m} tries landed on taken slots, so ${k} <b>cannot be placed</b>, even though the table may still have an empty slot. (This is why quadratic probing wants a prime m and a table at most half full.)`;
    else if (!taken.length) say = `${k} mod ${m} = ${h}. Slot ${h} is free (try i = 0), so ${k} goes there. 1 try.`;
    else {
      const path = tries.map((t) => `slot ${t.slot}${t.status === 'taken' ? ' (taken)' : ' (free)'}`).join(', ');
      say = `${k} mod ${m} = ${h}, but slot ${h} is taken: a <b>collision</b>. ${method === 'double' ? `Its step is ${r} − (${k} mod ${r}) = ${st}. ` : ''}Keep trying: ${path}. ${k} goes into slot ${placed}. ${tries.length} tries.`;
      const wrap = tries.find((t) => trySlot(method, k, t.i, m, r).raw >= m);
      if (wrap) say += ` (Try i = ${wrap.i} went past slot ${m - 1}, so "mod ${m}" wrapped it around to slot ${wrap.slot}.)`;
    }
    steps.push({ o: { mode: 'open', slots: [...slots], kinds, tries, head, alt: `${say.replace(/<[^>]+>/g, '')}` }, say, k, tries, placed });
  }
  const used = slots.filter((x) => x != null).length;
  steps.push({ o: { mode: 'open', slots: [...slots], head: [`Done: ${METHOD[method]}`, `h(k) = k mod ${m}`, method === 'double' ? `step(k) = ${r} − (k mod ${r})` : line3], note: `${total} tries in all for ${keys.length} keys${failed.length ? `; could not place ${failed.join(', ')}` : ''}`, noteFill: failed.length ? '#b23a33' : '#0b544e', alt: `Final table. ${total} tries in all.` }, say: `${used} of ${keys.length} keys are stored, with <b>${total} tries</b> in all (the best possible is ${keys.length}: one try each).${failed.length ? ` ${failed.join(', ')} could not be placed.` : ''}` });
  return { steps, slots, total, failed };
}

/** Search steps for open addressing (keys never deleted unless 'DEL' is in slots). */
export function findTries(slots, k, m, method = 'linear', r = rFor(m), skipDel = true) {
  const tries = [];
  for (let i = 0; i < m; i++) {
    const t = trySlot(method, k, i, m, r), v = slots[t.slot];
    if (v == null) { tries.push({ i, slot: t.slot, work: t.work, status: 'empty' }); return { tries, at: -1 }; }
    if (v === k) { tries.push({ i, slot: t.slot, work: t.work, status: 'found' }); return { tries, at: t.slot }; }
    if (v === 'DEL' && !skipDel) { tries.push({ i, slot: t.slot, work: t.work, status: 'empty' }); return { tries, at: -1 }; }
    tries.push({ i, slot: t.slot, work: t.work, status: v === 'DEL' ? 'deleted' : 'no' });
  }
  return { tries, at: -1 };
}
const kindsOf = (tries) => { const k = {}; tries.forEach((t) => { k[t.slot] = t.status === 'found' ? 'found' : t.status === 'empty' ? 'stop' : 'busy'; }); return k; };

/** StepShow: why open addressing cannot simply empty a slot on delete (linear probing, lesson keys). */
export function deleteShow() {
  const m = M, base = openSteps(KEYS, m, 'linear').slots, s = [];
  const pic = (slots, o) => htPic(m, { mode: 'open', slots, ...o });
  const f1 = findTries(base, 92, m);
  s.push({ pic: pic(base, { kinds: kindsOf(f1.tries), tries: f1.tries, head: ['find(92)', `h(92) = 92 mod ${m} = 1`, 'slot = (h + i) mod 7'], note: 'found at slot 3 after 3 tries', noteFill: '#1f5a38', alt: 'Finding 92: slot 1 holds 50, slot 2 holds 85, slot 3 holds 92: found.' }), say: `First, a normal search. 92 belongs in slot 1, but when it was inserted, slots 1 and 2 were taken, so it moved on to slot 3. A search must follow the <b>same path</b>: slot 1 (50, not it), slot 2 (85, not it), slot 3: <b>found</b>.` });
  const wrong = [...base]; wrong[2] = null;
  s.push({ pic: pic(wrong, { kinds: { 2: 'stop' }, head: ['delete(85): the wrong way', 'slot 2 is simply emptied'], note: 'slot 2 looks like it was never used', noteFill: '#b23a33', alt: 'Slot 2 is emptied to delete 85.' }), say: `Now delete 85 the <b>wrong</b> way: just empty slot 2. It looks harmless...` });
  const f2 = findTries(wrong, 92, m);
  s.push({ pic: pic(wrong, { kinds: kindsOf(f2.tries), tries: f2.tries, head: ['find(92) after the wrong delete', `h(92) = 92 mod ${m} = 1`, 'slot = (h + i) mod 7'], note: 'returns -1, but 92 is in slot 3!', noteFill: '#b23a33', alt: 'Searching for 92 stops at the empty slot 2 and says not found, but 92 is in slot 3.' }), say: `...until we search for 92 again. Slot 1: 50, not it. Slot 2: <b>empty</b>. An empty slot means "the path ends here", so the search stops and says <b>not found</b>. But 92 is sitting in slot 3!` });
  const right = [...base]; right[2] = 'DEL';
  s.push({ pic: pic(right, { kinds: { 2: 'cluster' }, head: ['delete(85): the right way', 'slot 2 gets a "deleted" mark'], note: 'deleted = "keep looking" for searches', noteFill: '#0b544e', alt: 'Slot 2 is marked deleted instead of emptied.' }), say: `The <b>right</b> way: leave a mark that says <b>deleted</b> (books also call it a <i>tombstone</i>). A search treats it as "something was here, keep going". An insert may reuse it as a free slot.` });
  const f3 = findTries(right, 92, m);
  s.push({ pic: pic(right, { kinds: kindsOf(f3.tries), tries: f3.tries, head: ['find(92) with the mark', `h(92) = 92 mod ${m} = 1`, 'slot = (h + i) mod 7'], note: 'found at slot 3 again', noteFill: '#1f5a38', alt: 'Searching for 92: slot 1 holds 50, slot 2 is marked deleted so the search keeps going, slot 3 holds 92: found.' }), say: `Search for 92 once more: slot 1 (50), slot 2 (<b>deleted</b>: keep going), slot 3: <b>found</b>. The mark kept the path unbroken.` });
  return s;
}

/** Turns a step list into StepShow steps. */
export const toShow = (m, steps) => steps.map((st) => ({ pic: htPic(m, st.o), say: st.say }));

/* ---------- Java walkthroughs ---------- */
export const chainInsertCode = String.raw`void insert(int key) {
  int i = key % m;               // which bucket?
  Node newNode = new Node(key);
  if (table[i] == null) {        // empty bucket
    table[i] = newNode;
    return;
  }
  Node current = table[i];
  while (current.next != null) { // walk to the last node
    current = current.next;
  }
  current.next = newNode;        // add at the end of the chain
}`;

/** CodeWalk: insert(92) into the chaining table that already holds 50, 700, 76, 85. */
export function chainInsertWalk() {
  const m = M, before = [[700], [50, 85], [], [], [], [], [76]], s = [];
  const P = (slots, o) => htPic(m, { mode: 'chain', slots, head: ['insert(92)', `i = 92 % ${m} = 1`], ...o });
  s.push({ lines: [1], pic: P(before, { alt: 'The table holds 700 in bucket 0, 50 then 85 in bucket 1, and 76 in bucket 6.' }), vars: [['key', '= 92']], say: `The table already holds 700, 50, 76 and 85 (bucket 1 has a chain of two). We call ${c('insert(92)')}.` });
  s.push({ lines: [2], pic: P(before, { kinds: { 1: 'home' }, alt: 'Bucket 1 is chosen.' }), vars: [['i', '= 1']], say: `${c('92 % 7')} is 1 (92 = 13 × 7 + 1). So 92 belongs in <b>bucket 1</b>. ${c('%')} is Java's "mod": the remainder.` });
  s.push({ lines: [3], pic: P(before, { kinds: { 1: 'home' }, alt: 'A new node for 92 is made.' }), vars: [['newNode', '→ [92]']], say: `Make a new node holding 92. It is not in the table yet: it is only in the variable ${c('newNode')}.` });
  s.push({ lines: [4], pic: P(before, { kinds: { 1: 'home' }, alt: 'Bucket 1 is not empty.' }), vars: [['table[1]', '→ 50']], say: `Is ${c('table[1] == null')}? No: bucket 1 already starts with 50. So the ${c('if')} is skipped. This is a <b>collision</b>.` });
  s.push({ lines: [8], pic: P(before, { kinds: { 1: 'home' }, nodeKinds: { '1:0': 'cur' }, alt: 'current points at 50.' }), vars: [['current', '→ 50']], say: `${c('current')} starts at the first node of the chain: 50.` });
  s.push({ lines: [9, 10], pic: P(before, { kinds: { 1: 'home' }, nodeKinds: { '1:1': 'cur' }, alt: 'current moves to 85.' }), vars: [['current', '→ 85']], say: `50 has a next node, so ${c('current = current.next')}: now ${c('current')} is at 85. (Same walk as in the Linked lists lesson.)` });
  s.push({ lines: [9], pic: P(before, { kinds: { 1: 'home' }, nodeKinds: { '1:1': 'cur' }, alt: '85 is the last node.' }), vars: [['current.next', '= null']], say: `85's ${c('next')} is ${c('null')}: 85 is the <b>last</b> node, so the loop stops here.` });
  const after = before.map((x) => [...x]); after[1].push(92);
  s.push({ lines: [12], pic: P(after, { kinds: { 1: 'home' }, nodeKinds: { '1:2': 'placed' }, note: 'bucket 1: 50 → 85 → 92', noteFill: '#1f5a38', alt: '92 is linked after 85.' }), vars: [['85.next', '→ 92']], say: `${c('current.next = newNode')} links 92 after 85. Done: bucket 1 is now 50 → 85 → 92. No other bucket was touched.` });
  return s;
}

export const probeFindCode = String.raw`int find(int key) {
  int home = key % m;
  for (int i = 0; i < m; i++) {
    int slot = (home + i) % m;          // linear probing
    if (table[slot] == EMPTY) {
      return -1;                        // a never-used slot: stop
    }
    if (table[slot] == key) {
      return slot;                      // found it
    }
  }
  return -1;                            // tried every slot
}`;

/** CodeWalk: find(92) (found) and find(15) (not found) in the linear-probing table of the lesson keys. */
export function probeFindWalk() {
  const m = M, slots = openSteps(KEYS, m, 'linear').slots, s = [];
  const P = (o, k = 92) => htPic(m, { mode: 'open', slots, head: [`find(${k})`, `home = ${k} % ${m} = ${mod(k, m)}`, 'slot = (home + i) % 7'], ...o });
  s.push({ lines: [1], pic: P({ alt: 'The table after linear probing: 700, 50, 85, 92, 73, empty, 76.' }), vars: [['key', '= 92']], say: `This is the table we built with linear probing. We call ${c('find(92)')}. The method gives back the slot where 92 is, or -1 (like the searches in the Searching lesson).` });
  s.push({ lines: [2], pic: P({ kinds: { 1: 'home' }, alt: 'home is 1.' }), vars: [['home', '= 1']], say: `${c('92 % 7')} = 1. Slot 1 is 92's <b>home</b> slot: where an insert tried first.` });
  const t = findTries(slots, 92, m).tries;
  s.push({ lines: [3, 4], pic: P({ kinds: { 1: 'busy' }, tries: t.slice(0, 1), alt: 'i = 0, slot 1.' }), vars: [['i', '= 0'], ['slot', '= 1']], say: `${c('i = 0')}: ${c('slot = (1 + 0) % 7')} = 1.` });
  s.push({ lines: [5, 8], pic: P({ kinds: { 1: 'busy' }, tries: t.slice(0, 1), alt: 'Slot 1 holds 50.' }), vars: [['table[1]', '= 50']], say: `Slot 1 is not ${c('EMPTY')} and holds 50, not 92. Neither ${c('if')} returns, so the loop goes on.` });
  s.push({ lines: [3, 4, 5, 8], pic: P({ kinds: { 1: 'busy', 2: 'busy' }, tries: t.slice(0, 2), alt: 'i = 1, slot 2 holds 85.' }), vars: [['i', '= 1'], ['slot', '= 2']], say: `${c('i = 1')}: slot ${c('(1 + 1) % 7')} = 2. It holds 85, not 92. Keep going.` });
  s.push({ lines: [3, 4, 8], pic: P({ kinds: { 1: 'busy', 2: 'busy', 3: 'found' }, tries: t, alt: 'i = 2, slot 3 holds 92.' }), vars: [['i', '= 2'], ['slot', '= 3']], say: `${c('i = 2')}: slot 3. ${c('table[3] == key')}: 92 equals 92!` });
  s.push({ lines: [9], pic: P({ kinds: { 1: 'busy', 2: 'busy', 3: 'found' }, tries: t, note: 'returns 3', noteFill: '#1f5a38', alt: 'find returns 3.' }), vars: [['returns', '3']], say: `${c('return slot;')} gives back <b>3</b> after 3 tries. The search followed the same path the insert took.` });
  const t2 = findTries(slots, 15, m).tries, k2 = {};
  t2.forEach((x) => { k2[x.slot] = x.status === 'empty' ? 'stop' : 'busy'; });
  s.push({ lines: [5, 6], pic: P({ kinds: k2, tries: t2, note: 'returns -1', noteFill: '#b23a33', alt: 'find(15): slots 1, 2, 3, 4 are taken by other keys, slot 5 is empty: returns -1.' }, 15), vars: [['returns', '-1']], say: `Now ${c('find(15)')}: home = 15 % 7 = 1. Slots 1, 2, 3, 4 hold other keys. Slot 5 is ${c('EMPTY')}: if 15 had ever been inserted, it would have stopped there at the latest. So the method returns <b>-1</b> after 5 tries.` });
  return s;
}

/* ---------- other clean pictures ---------- */
const miniRow = (x0, y, m, cells, kinds = {}, w = 30) => {
  let b = '';
  for (let s = 0; s < m; s++) {
    const x = x0 + s * w, [f, st, tc] = KIND[kinds[s] || ''];
    b += `<rect x="${x}" y="${y}" width="${w}" height="34" fill="${f}" stroke="${st}" stroke-width="1.8"/>`;
    const v = cells[s];
    if (Array.isArray(v) ? v.length : v != null) b += T(x + w / 2, y + 22, Array.isArray(v) ? (v.length > 1 ? `${v.length} keys` : v[0]) : v, { mono: true, size: Array.isArray(v) && v.length > 1 ? 9.5 : 12, w: 700, fill: tc });
    b += T(x + w / 2, y + 50, s, { mono: true, size: 11, w: 600, fill: '#37474a' });
  }
  return b;
};

/** Clean: prices that all end in 0, with m = 10 (all in slot 0) vs m = 7 (spread out). */
export function badHashPic() {
  const keys = [10, 20, 30, 40, 50];
  let b = T(170, 20, 'Keys: prices 10, 20, 30, 40, 50', { size: 14 });
  b += T(8, 52, 'm = 10: k mod 10', { size: 13, w: 800, fill: '#b23a33', anchor: 'start' });
  const r10 = Array.from({ length: 10 }, () => []); keys.forEach((k) => r10[k % 10].push(k));
  b += miniRow(20, 62, 10, r10.map((v) => (v.length ? [] : v)), { 0: 'busy' });
  b += `<path d="M24 97 V130 H52" fill="none" stroke="#b23a33" stroke-width="2"/><path d="M58 130 l-7 -4.5 v9 Z" fill="#b23a33"/>`;
  keys.forEach((k, j) => { const x = 60 + j * 52; b += `<rect x="${x}" y="118" width="40" height="24" rx="5" fill="#f6d5d2" stroke="#b23a33" stroke-width="1.6"/>` + T(x + 20, 135, k, { mono: true, size: 12.5, w: 700 }); if (j < 4) b += `<path d="M${x + 40} 130 h7" stroke="#b23a33" stroke-width="1.6"/><path d="M${x + 52} 130 l-6 -4 v8 Z" fill="#b23a33"/>`; });
  b += T(170, 164, 'All five land in slot 0. Slots 1 to 9 stay empty.', { size: 12.5, w: 700, fill: '#b23a33' });
  b += T(8, 200, 'm = 7 (a prime): k mod 7', { size: 13, w: 800, fill: '#1f5a38', anchor: 'start' });
  const r7 = Array(7).fill(null); keys.forEach((k) => { r7[k % 7] = k; });
  const kk = {}; keys.forEach((k) => { kk[k % 7] = 'placed'; });
  b += miniRow(65, 210, 7, r7, kk);
  b += T(170, 284, 'Spread out: 10→3, 20→6, 30→2, 40→5, 50→1.', { size: 12.5, w: 700, fill: '#1f5a38' });
  return `<svg class="objbox ht-pic" viewBox="0 0 340 298" role="img" aria-label="Keys 10, 20, 30, 40, 50. With m = 10, k mod 10 is 0 for all of them, so all five land in slot 0 and slots 1 to 9 stay empty. With m = 7, a prime, they spread out: 10 to slot 3, 20 to 6, 30 to 2, 40 to 5, 50 to 1.">${b}</svg>`;
}

/** Clean: the three open-addressing results for the lesson keys, side by side. */
export function threeTablesPic() {
  const m = M, cols = ['linear', 'quadratic', 'double'], names = ['Linear', 'Quadratic', 'Double'];
  let b = T(170, 18, `Keys ${KEYS.join(', ')} · m = 7`, { size: 13.5 });
  cols.forEach((meth, j) => {
    const r = openSteps(KEYS, m, meth), x0 = 14 + j * 110, colors = { linear: '#b4461a', quadratic: '#0b544e', double: '#2f6fa8' };
    b += T(x0 + 44, 44, names[j], { size: 13, w: 800, fill: colors[meth] });
    r.slots.forEach((v, s) => {
      const y = 54 + s * 30;
      b += T(x0 + 12, y + 20, s, { mono: true, size: 11, w: 600, fill: '#37474a', anchor: 'end' });
      b += `<rect x="${x0 + 18}" y="${y}" width="56" height="30" fill="#ffffff" stroke="#1b2a2e" stroke-width="1.5"/>`;
      if (v != null) b += T(x0 + 46, y + 20, v, { mono: true, size: 13, w: 700 });
    });
    b += T(x0 + 44, 284, `${r.total} tries`, { size: 12.5, w: 800, fill: colors[meth] });
  });
  // shade the linear cluster (slots 0-4 filled in a row)
  return `<svg class="objbox ht-pic" viewBox="0 0 340 296" role="img" aria-label="The same keys with three methods. Linear probing: 700, 50, 85, 92, 73, empty, 76, 10 tries. Quadratic probing: 700, 50, 85, 73, empty, 92, 76, 9 tries. Double hashing: 700, 50, empty, 92, 85, 73, 76, 12 tries.">${b}</svg>`;
}

/** Clean: rehashing m = 5 (4 keys, load 0.8) into m = 11 (load 0.36). Linear probing in both. */
export function rehashPic() {
  const keys = [12, 27, 33, 17];
  const a = openSteps(keys, 5, 'linear').slots, z = openSteps(keys, 11, 'linear').slots;
  let b = T(80, 18, 'Before: m = 5', { size: 13.5, w: 800, fill: '#b23a33' }) + T(80, 36, 'load 4/5 = 0.8', { mono: true, size: 12, w: 600 });
  b += T(258, 18, 'After: m = 11', { size: 13.5, w: 800, fill: '#1f5a38' }) + T(258, 36, 'load 4/11 ≈ 0.36', { mono: true, size: 12, w: 600 });
  const col = (x0, slots, rowH) => slots.map((v, s) => {
    const y = 48 + s * rowH; let t = T(x0 - 6, y + rowH / 2 + 4, s, { mono: true, size: 11, w: 600, fill: '#37474a', anchor: 'end' });
    t += `<rect x="${x0}" y="${y}" width="56" height="${rowH}" fill="${v != null ? '#d7ece9' : '#ffffff'}" stroke="#1b2a2e" stroke-width="1.5"/>`;
    if (v != null) t += T(x0 + 28, y + rowH / 2 + 5, v, { mono: true, size: 13, w: 700 });
    return t;
  }).join('');
  b += col(52, a, 30) + col(230, z, 25);
  b += `<path d="M118 120 C150 120, 160 160, 190 160" fill="none" stroke="#e8662e" stroke-width="2.4"/><path d="M198 160 l-9 -5 v10 Z" fill="#e8662e"/>`;
  b += T(160, 108, 'insert every', { size: 11.5, w: 800, fill: '#b4461a' }) + T(160, 194, 'key again', { size: 11.5, w: 800, fill: '#b4461a' });
  b += T(80, 230, '12→2, 27→3 (2 taken),', { size: 11.5, w: 700, fill: '#37474a' }) + T(80, 246, '33→4 (3 taken),', { size: 11.5, w: 700, fill: '#37474a' }) + T(80, 262, '17→0 (2, 3, 4 taken)', { size: 11.5, w: 700, fill: '#37474a' });
  b += T(170, 346, 'New m, so new slots: 12→1, 27→5, 33→0, 17→6.', { size: 12.5, w: 800, fill: '#1f5a38' }) + T(170, 364, 'No collisions now.', { size: 12.5, w: 800, fill: '#1f5a38' });
  return `<svg class="objbox ht-pic" viewBox="0 0 340 376" role="img" aria-label="Rehashing. Before, m = 5 with linear probing: slot 0 holds 17, slot 2 holds 12, slot 3 holds 27, slot 4 holds 33; load 0.8, and 33 and 17 needed extra tries. After, m = 11: every key is inserted again with mod 11: 33 in slot 0, 12 in slot 1, 27 in slot 5, 17 in slot 6; load about 0.36, no collisions.">${b}</svg>`;
}
