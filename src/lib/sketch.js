// Hand-drawn ("sketch") illustrations for real-life examples, drawn at build time with Rough.js.
// Same seed = same wobble on every build, so pages do not change between deploys.
// Keep each drawing about 320-360 units wide so it stays readable on a phone without shrinking.
import rough from 'roughjs';

export const C = {
  ink: '#1b2a2e', soft: '#37474a', paper: '#fbfaf6', card: '#ffffff',
  teal: '#0e6b63', tealWash: '#d7ece9', orange: '#e8662e', orangeWash: '#fbdccc',
  amber: '#f0a93b', butter: '#f8dc95', pink: '#f6d6d0', sky: '#d6e6f2', red: '#b23a33',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export class Sketch {
  constructor(w, h, seed = 7) {
    this.w = w; this.h = h; this.seed = seed; this.n = 0;
    this.g = rough.generator();
    this.parts = [];
  }
  opt(o = {}) {
    this.n++;
    return {
      seed: this.seed * 100 + this.n, roughness: o.rough ?? 1.1, bowing: o.bow ?? 0.8,
      stroke: o.stroke ?? C.ink, strokeWidth: o.sw ?? 2,
      fill: o.fill, fillStyle: o.fillStyle ?? 'solid', hachureGap: o.gap ?? 5, fillWeight: o.fw ?? 1.2,
      disableMultiStroke: o.single ?? false, preserveVertices: true,
    };
  }
  push(d, extra = '') {
    for (const p of this.g.toPaths(d)) {
      this.parts.push(`<path d="${p.d}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`);
    }
    return this;
  }
  rect(x, y, w, h, o = {}) { return this.push(this.g.rectangle(x, y, w, h, this.opt(o))); }
  round(x, y, w, h, r, o = {}) {
    const d = `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
    return this.push(this.g.path(d, this.opt(o)));
  }
  circle(cx, cy, d, o = {}) { return this.push(this.g.circle(cx, cy, d, this.opt(o))); }
  ellipse(cx, cy, w, h, o = {}) { return this.push(this.g.ellipse(cx, cy, w, h, this.opt(o))); }
  line(x1, y1, x2, y2, o = {}) { return this.push(this.g.line(x1, y1, x2, y2, this.opt(o))); }
  path(d, o = {}) { return this.push(this.g.path(d, this.opt(o))); }
  /** Line with a small open arrowhead at (x2, y2). */
  arrow(x1, y1, x2, y2, o = {}) {
    this.line(x1, y1, x2, y2, o);
    const a = Math.atan2(y2 - y1, x2 - x1), L = o.head ?? 9;
    for (const s of [-0.5, 0.5]) this.line(x2, y2, x2 - L * Math.cos(a + s), y2 - L * Math.sin(a + s), { ...o, single: true });
    return this;
  }
  /** Curved arrow from (x1,y1) to (x2,y2), bending by `bend` units. */
  curve(x1, y1, x2, y2, bend = 30, o = {}) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const cx = mx - (dy / len) * bend, cy = my + (dx / len) * bend;
    this.path(`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, o);
    const a = Math.atan2(y2 - cy, x2 - cx), L = o.head ?? 9;
    for (const s of [-0.5, 0.5]) this.line(x2, y2, x2 - L * Math.cos(a + s), y2 - L * Math.sin(a + s), { ...o, single: true });
    return this;
  }
  /** A folder icon with its name underneath. */
  folder(x, y, name, o = {}) {
    const w = o.w ?? 46, h = o.h ?? 34, fill = o.fill ?? C.butter;
    this.path(`M${x} ${y + 6} L${x} ${y} L${x + w * 0.38} ${y} L${x + w * 0.48} ${y + 6} Z`, { fill, sw: 1.8 });
    this.rect(x, y + 6, w, h - 6, { fill, sw: 1.8 });
    if (name) this.text(x + w / 2, y + h + 15, name, { size: o.size ?? 14, font: 'body', weight: 700 });
    return this;
  }
  text(x, y, str, o = {}) {
    const fam = { hand: 'Kalam, cursive', body: 'Nunito, system-ui, sans-serif', mono: '"IBM Plex Mono", monospace' }[o.font ?? 'hand'];
    const rot = o.rotate ? ` transform="rotate(${o.rotate} ${x} ${y})"` : '';
    this.parts.push(`<text x="${x}" y="${y}" font-family='${fam}' font-size="${o.size ?? 16}" font-weight="${o.weight ?? 700}" fill="${o.color ?? C.ink}" text-anchor="${o.anchor ?? 'middle'}"${o.italic ? ' font-style="italic"' : ''}${rot}>${esc(str)}</text>`);
    return this;
  }
  raw(svg) { this.parts.push(svg); return this; }
  svg(label, cls = '') {
    return `<svg class="sketch ${cls}" viewBox="0 0 ${this.w} ${this.h}" role="img" aria-label="${esc(label)}">${this.parts.join('')}</svg>`;
  }
}
