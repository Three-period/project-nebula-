import { renderContent } from './content.js';
import { initDrawer } from './drawer.js';
import { initViewer } from './viewer.js';
import { initAgent } from './agent.js';
import { initGlobalI18n } from './i18n.js';
import { initTheme } from './theme.js';
import { initSearch } from './search.js';
import { initPhotography } from './photography.js';
import { initLandscapeIntro } from './landscape-intro.js';
initTheme();
const viewer=initViewer(),drawer=initDrawer(),agent=initAgent();
const photography=initPhotography({onOpenTheme:id=>drawer.openPhotographyTheme(id)});
const landscapeIntro=initLandscapeIntro();
const search=initSearch({onNavigate:item=>{
  go(item.pageId);
  if(item.kind==='project')drawer.openProject(item.recordId);
  if(item.kind==='document')drawer.openDocument(item.recordId);
  if(item.kind==='article')drawer.openArticle(Number(item.recordId));
  if(item.kind==='photoTheme')drawer.openPhotographyTheme(item.recordId);
  if(item.kind==='photo')viewer.openPhotography(item.recordId,item.photoIndex);
  if(item.kind==='capability')document.getElementById('capabilities-title')?.scrollIntoView({block:'start'});
}});
initGlobalI18n(language=>{
  renderContent(language);
  drawer.setLanguage(language);
  viewer.setLanguage(language);
  photography.setLanguage(language);
  search.setLanguage();
});
const sidebar=document.querySelector('.sidebar'),menu=document.getElementById('menu-toggle');
const links=[...document.querySelectorAll('.toc-link')],sections=[...document.querySelectorAll('.resume-section')];
function collapseMenu(){sidebar.classList.remove('is-expanded');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const expanded=sidebar.classList.toggle('is-expanded');menu.setAttribute('aria-expanded',String(expanded));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('is-expanded')){collapseMenu();menu.focus();}});
document.addEventListener('pointerdown',e=>{if(sidebar.classList.contains('is-expanded')&&!sidebar.contains(e.target)&&!menu.contains(e.target))collapseMenu();});
const aliases={singularity:'about',forge:'projects',construct:'projects',design:'projects',fusion:'experience',pulsar:'insights',gallery:'photography'};
function activate(raw,reset=true){
 const id=aliases[raw]||raw;
 const next=sections.find(s=>s.id===id)||sections[0];
 sections.forEach(s=>s.hidden=s!==next);
 links.forEach(a=>{if(a.hash==='#'+next.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 document.getElementById('projects-subnav').hidden=next.id!=='projects';
 collapseMenu();
 photography.setVisible(next.id==='photography');
 if(next.id==='about')landscapeIntro.onHomeActivate();
 if(reset)window.scrollTo({top:0,behavior:'instant'});
}
function go(id){history.pushState(null,'','#'+id);activate(id);}
document.addEventListener('click',event=>{
 const target=event.target.closest('button,a');if(!target)return;
 if(target.dataset.scrollTarget){document.getElementById(target.dataset.scrollTarget)?.scrollIntoView({block:'start'});collapseMenu();return;}
 if(target.matches('a[href^="#"]')){const id=target.hash.slice(1);if(sections.some(s=>s.id===id)||aliases[id]){event.preventDefault();go(id);return;}collapseMenu();}
 if(target.dataset.jumpProject){go('projects');const card=document.querySelector('[data-project-id="'+target.dataset.jumpProject+'"]');card?.scrollIntoView({block:'center'});card?.querySelector('[data-project]')?.focus({preventScroll:true});return;}
 if(target.dataset.project){drawer.openProject(target.dataset.project);}
 else if(target.dataset.document){drawer.openDocument(target.dataset.document);}
 else if(target.dataset.article!==undefined){drawer.openArticle(Number(target.dataset.article));}
 switch(target.dataset.action){
  case 'chat':collapseMenu();agent.open();break;
  case 'open-search':collapseMenu();search.open();break;
  case 'close-chat':agent.close();break;
  case 'close-drawer':drawer.close();break;
  case 'prev-article':drawer.previous();break;
  case 'next-article':drawer.next();break;
  case 'open-document-full':viewer.openDocument(target.dataset.documentFull);break;
  case 'open-media':viewer.openMedia(target.dataset.projectId,Number(target.dataset.mediaIndex));break;
  case 'preview-pdf':viewer.openPdf(target.dataset.pdfSrc);break;
  case 'close-viewer':viewer.close();break;
  case 'open-photo-theme':drawer.openPhotographyTheme(target.dataset.photoTheme);break;
  case 'open-photo':viewer.openPhotography(target.dataset.photoTheme,Number(target.dataset.photoIndex));break;
  case 'photo-viewer-prev':viewer.stepPhotography(-1);break;
  case 'photo-viewer-next':viewer.stepPhotography(1);break;
 }
});
window.addEventListener('popstate',()=>activate(location.hash.slice(1)||'about'));
activate(location.hash.replace(/^#(?:view-)?/,'')||'about',false);
