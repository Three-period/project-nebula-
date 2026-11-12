/* Cosmic-only decorative edge tracer. No card content, state, or layout is edited.
 * The overlay is created lazily when Cosmic becomes active, and reattached to
 * cards recreated by bilingual content/photography rendering. */
const CARD_SELECTOR = [
  '.project', '.document-card', '.article-row', '.capability-card',
  '.photography-theme-card', '.singu-ab-card', '.singu-left', '.singu-right'
].join(', ');
const SVG_NS = 'http://www.w3.org/2000/svg';

function makeGiltOutline() {
  // HTML [hidden] reliably hides the decoration after Cosmic CSS unloads.
  const holder = document.createElement('span');
  holder.hidden = true;
  holder.setAttribute('aria-hidden', 'true');
  holder.classList.add('cosmic-gilt-outline');
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('focusable', 'false');

  // SVG percentage dimensions track each responsive card without JS measuring.
  // pathLength normalizes the dash to a complete 100-unit rounded perimeter.
  for (const layer of ['glow', 'halo', 'core']) {
    const outline = document.createElementNS(SVG_NS, 'rect');
    outline.setAttribute('x', '0');
    outline.setAttribute('y', '0');
    outline.setAttribute('width', '100%');
    outline.setAttribute('height', '100%');
    outline.setAttribute('rx', '9');
    outline.setAttribute('pathLength', '100');
    outline.classList.add('cosmic-gilt-' + layer);
    svg.appendChild(outline);
  }
  holder.appendChild(svg);
  return holder;
}

export function initCosmicGilt() {
  const main = document.getElementById('main');
  if (!main) return;

  function syncCardOutlines() {
    if (document.documentElement.dataset.theme !== 'cosmic') return;
    for (const card of main.querySelectorAll(CARD_SELECTOR)) {
      if (card.querySelector(':scope > .cosmic-gilt-outline')) continue;
      card.appendChild(makeGiltOutline());
    }
  }
  // Theme loads asynchronously; attach only after its stylesheet is active.
  new MutationObserver(syncCardOutlines).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });
  // Rendering text in another language replaces many cards.
  new MutationObserver(syncCardOutlines).observe(main, {
    childList: true, subtree: true
  });
  syncCardOutlines();
}
