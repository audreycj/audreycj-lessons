// Java snippet helpers: escape HTML, grey out // comments, optional line numbers.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const line = (l) => esc(l).replace(/(\/\/.*)$/, '<span class="c">$1</span>');
export const hi = (src) => src.split('\n').map(line).join('\n');
/** With line numbers; `mark` = list of line numbers to highlight. */
export const hiN = (src, mark = []) => src.split('\n').map((l, i) => {
  const n = String(i + 1).padStart(2, ' ');
  const body = `<span class="ln">${n}</span>${line(l)}`;
  return mark.includes(i + 1) ? `<span class="hl-line">${body}</span>` : body;
}).join('\n');

/** Numbered code with the base case (green) and recursive case (blue) lines shaded, like the module. */
export const hiR = (src, base = [], rec = []) => src.split('\n').map((l, i) => {
  const n = String(i + 1).padStart(2, ' ');
  const body = `<span class="ln">${n}</span>${line(l)}`;
  const c = base.includes(i + 1) ? 'rg-base' : rec.includes(i + 1) ? 'rg-rec' : '';
  return c ? `<span class="${c}">${body}</span>` : body;
}).join('\n');
