import { renderContent } from './content.js';
import { initDrawer } from './drawer.js';
import { initAgent } from './agent.js';
renderContent();
const drawer=initDrawer(),agent=initAgent();
const sidebar=document.querySelector('.sidebar'),menu=document.getElementById('menu-toggle');
const links=[...document.querySelectorAll('.toc-link')],sections=[...document.querySelectorAll('.resume-section')];
function collapseMenu(){sidebar.classList.remove('is-expanded');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const expanded=sidebar.classList.toggle('is-expanded');menu.setAttribute('aria-expanded',String(expanded));});
const aliases={singularity:'about',forge:'projects',construct:'projects',design:'projects',fusion:'experience',pulsar:'insights'};
function activate(raw,reset=true){
 const id=aliases[raw]||raw;
 const next=sections.find(s=>s.id===id)||sections[0];
 sections.forEach(s=>s.hidden=s!==next);
 links.forEach(a=>{if(a.hash==='#'+next.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 collapseMenu();if(reset)window.scrollTo({top:0,behavior:'instant'});
}
function go(id){history.pushState(null,'','#'+id);activate(id);}
document.addEventListener('click',event=>{
 const target=event.target.closest('button,a');if(!target)return;
 if(target.matches('a[href^="#"]')){const id=target.hash.slice(1);if(sections.some(s=>s.id===id)||aliases[id]){event.preventDefault();go(id);return;}collapseMenu();}
 if(target.dataset.jumpProject){go('projects');const card=document.querySelector('[data-project-id="'+target.dataset.jumpProject+'"]');card?.scrollIntoView({block:'center'});card?.querySelector('[data-project]')?.focus({preventScroll:true});return;}
 if(target.dataset.project){drawer.openProject(target.dataset.project);}
 else if(target.dataset.document){drawer.openDocument(target.dataset.document);}
 else if(target.dataset.article!==undefined){drawer.openArticle(Number(target.dataset.article));}
 switch(target.dataset.action){
  case 'chat':collapseMenu();agent.open();break;
  case 'close-chat':agent.close();break;
  case 'close-drawer':drawer.close();break;
  case 'prev-article':drawer.previous();break;
  case 'next-article':drawer.next();break;
 }
 const card=target.closest('.project,.document-card');
 if(card&&target.matches('button')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  card.classList.remove('is-orbiting');void card.offsetWidth;card.classList.add('is-orbiting');
  card.addEventListener('animationend',()=>card.classList.remove('is-orbiting'),{once:true});
 }
});
window.addEventListener('popstate',()=>activate(location.hash.slice(1)||'about'));
activate(location.hash.replace(/^#(?:view-)?/,'')||'about',false);
