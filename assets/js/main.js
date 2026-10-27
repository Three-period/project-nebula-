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


const oldAnchors={singularity:'about',forge:'projects',construct:'projects',design:'projects',fusion:'experience',pulsar:'insights'};
function activate(raw){
 const id=oldAnchors[raw]||raw;
 const next=sections.find(s=>s.id===id)||sections[0];
 sections.forEach(s=>s.hidden=s!==next);
 links.forEach(a=>{if(a.hash==='#'+next.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 collapseMenu();
 window.scrollTo(0,0);
}
document.addEventListener('click',event=>{
 const a=event.target.closest('a[href^="#"]');
 if(!a)return;
 const id=a.hash.slice(1);
 if(sections.some(s=>s.id===id)||oldAnchors[id]){event.preventDefault();history.pushState(null,'','#'+id);activate(id);}
});
window.addEventListener('popstate',()=>activate(location.hash.slice(1)||'about'));
activate(location.hash.replace(/^#(?:view-)?/,'')||'about');
document.addEventListener('click',event=>{
 const target=event.target.closest('.project button,.document-card button');
 if(!target)return;
 const card=target.closest('.project,.document-card');
 card?.classList.remove('is-orbiting');
 void card?.offsetWidth;
 card?.classList.add('is-orbiting');
 card?.addEventListener('animationend',()=>card.classList.remove('is-orbiting'),{once:true});
});
