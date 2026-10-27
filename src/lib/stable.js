// Keep interactive panels from jumping in height as their content changes.
//
// reserve(el, htmls): measure every piece of content the panel will show (for example, every caption of a
// step-by-step run) and set min-height to the tallest one, so stepping back and forth never resizes it.
// growOnly(el): for panels whose content cannot be listed in advance. The panel may grow once, but never shrinks.
// Any element with a data-grow attribute gets growOnly automatically (see Base.astro).

const reserved = new Map();

export function reserve(el, htmls) {
  if (!el || !el.parentElement) return;
  reserved.set(el, htmls);
  const w = el.getBoundingClientRect().width;
  if (!w) return;
  const probe = el.cloneNode(false);
  probe.removeAttribute('id');
  probe.setAttribute('aria-hidden', 'true');
  Object.assign(probe.style, { position: 'absolute', visibility: 'hidden', pointerEvents: 'none', left: '0', top: '0', width: w + 'px', minHeight: '0', height: 'auto', animation: 'none' });
  el.parentElement.appendChild(probe);
  let max = 0;
  for (const h of htmls) { probe.innerHTML = h || ''; max = Math.max(max, probe.getBoundingClientRect().height); }
  probe.remove();
  el.style.minHeight = Math.ceil(max) + 'px';
}

export function growOnly(el) {
  if (!el || el.dataset.growOn) return;
  el.dataset.growOn = '1';
  let max = 0, lastW = 0;
  const ro = new ResizeObserver(() => {
    const r = el.getBoundingClientRect();
    if (Math.abs(r.width - lastW) > 2) { lastW = r.width; max = 0; el.style.minHeight = ''; }
    const h = el.scrollHeight;
    if (h > max) { max = h; el.style.minHeight = h + 'px'; }
  });
  ro.observe(el);
}

let t = 0;
addEventListener('resize', () => {
  clearTimeout(t);
  t = setTimeout(() => reserved.forEach((htmls, el) => { el.style.minHeight = ''; reserve(el, htmls); }), 150);
});
