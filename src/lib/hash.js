// Java String.hashCode(), done the way you would by hand (Horner's method), with 32-bit int overflow.
//   h = 0; for each character c: h = 31 * h + (character code of c)
// Bucket index as taught in ITC 120: hash & (capacity - 1).

export function hashSteps(s) {
  let h = 0;
  const steps = [];
  for (const ch of s.split('')) {
    const code = ch.charCodeAt(0);
    const before = h;
    h = (Math.imul(31, h) + code) | 0;
    steps.push({ ch, code, before, after: h });
  }
  return { steps, hash: h };
}

export const javaHash = (s) => hashSteps(s).hash;

export function bucketIndex(h, capacity = 16) { return h & (capacity - 1); }

/** 32-bit binary of an int, grouped in 4s. */
export function bin32(h) {
  return (h >>> 0).toString(2).padStart(32, '0').replace(/(.{4})/g, '$1 ').trim();
}
/** Shortest binary of a non-negative int (at least 4 digits). */
export function binShort(h) {
  const b = (h >>> 0).toString(2);
  return h < 0 ? b : b.padStart(4, '0');
}
