import { renderContent } from './content.js';
import { initDrawer } from './drawer.js';
import { initAgent } from './agent.js';

renderContent();
const drawer = initDrawer();
const agent = initAgent();
const sidebar = document.querySelector('.sidebar');
const menu = document.getElementById('menu-toggle');
const links = [...document.querySelectorAll('.toc-link')];
const sections = [...document.querySelectorAll('.resume-section')];

function collapseMenu() {
  sidebar.classList.remove('is-expanded');
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => {
  const expanded = sidebar.classList.toggle('is-expanded');
  menu.setAttribute('aria-expanded', String(expanded));
});

// One delegated handler for content actions; no executable inline attributes.
document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.matches('a[href^="#"]')) collapseMenu();
  if (target.dataset.document) drawer.openDocument(target.dataset.document);
  if (target.dataset.article !== undefined) drawer.openArticle(Number(target.dataset.article));
  if (target.dataset.question) agent.ask(target.dataset.question);
  switch (target.dataset.action) {
    case 'chat': collapseMenu(); agent.open(); break;
    case 'close-chat': agent.close(); break;
    case 'close-drawer': drawer.close(); break;
    case 'prev-article': drawer.previous(); break;
    case 'next-article': drawer.next(); break;
    case 'ask-inline': askInline(); break;
  }
});
function askInline() {
  const input = document.getElementById('sae-input');
  if (!input.value.trim()) return;
  agent.ask(input.value);
  input.value = '';
}
document.getElementById('sae-input').addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); askInline(); }
});

// Use actual section positions so active navigation stays correct for long sections.
let scheduled = false;
function updateCurrent() {
  const threshold = innerWidth <= 820 ? 118 : 100;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  for (const link of links) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
function scheduleUpdate() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateCurrent); }
}
addEventListener('scroll', scheduleUpdate, { passive: true });
addEventListener('resize', scheduleUpdate);
updateCurrent();
// Resolve both current anchors and the original view identifiers when linked directly.
const oldAnchors = { singularity: 'about', forge: 'projects', construct: 'design', fusion: 'experience', pulsar: 'insights' };
const hash = location.hash.slice(1);
const anchor = oldAnchors[hash.replace(/^view-/, '')] || hash;
if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant' });
