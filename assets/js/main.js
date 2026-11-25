import { renderContent } from './content.js';
import { initDrawer } from './drawer.js';
import { initViewer } from './viewer.js';
import { initAgent } from './agent.js';
import { initGlobalI18n } from './i18n.js';
import { initNavigation } from './navigation.js';
import { initTheme } from './theme.js';
import { initSearch } from './search.js';
import { initThemePicker } from './theme-picker.js';
import { initPhotography } from './photography.js';
import { initLandscapeIntro } from './landscape-intro.js';
import { initCosmicGilt } from './cosmic-gilt.js';
const themeManager=initTheme();
const themePicker=initThemePicker(themeManager);
const viewer=initViewer();
const drawer=initDrawer({onOpenMedia:viewer.openMedia});
const agent=initAgent();
const photography=initPhotography({onOpenTheme:id=>drawer.openPhotographyTheme(id)});
const landscapeIntro=initLandscapeIntro();
initCosmicGilt();
const navigation = initNavigation({
  onSectionChange(id) {
    photography.setVisible(id === 'photography');
    if (id === 'about') landscapeIntro.onHomeActivate();
  }
});
const search=initSearch({onNavigate:item=>{
  navigation.go(item.pageId);
  if(item.kind==='project')drawer.openProject(item.recordId);
  if(item.kind==='document')drawer.openDocument(item.recordId);
  if(item.kind==='article')drawer.openArticle(Number(item.recordId));
  if(item.kind==='photoTheme')drawer.openPhotographyTheme(item.recordId);
  if(item.kind==='photo'){drawer.openPhotographyTheme(item.recordId);viewer.openPhotography(item.recordId,item.photoIndex);}
  if(item.kind==='capability')document.getElementById('profile-tools')?.scrollIntoView({block:'center'});
  if(item.kind==='page')document.getElementById('main')?.focus({preventScroll:true});
}});
initGlobalI18n(language=>{
  renderContent(language);
  drawer.setLanguage(language);
  viewer.setLanguage(language);
  photography.setLanguage(language);
  search.setLanguage();
  themePicker.setLanguage();
  navigation.refreshLabels();
});
document.addEventListener('click',event=>{
 if(event.defaultPrevented)return;
 const target=event.target.closest('button,a');if(!target)return;
 if(target.dataset.jumpProject){navigation.go('projects');const card=document.querySelector('[data-project-id="'+target.dataset.jumpProject+'"]');card?.scrollIntoView({block:'center'});card?.querySelector('[data-project]')?.focus({preventScroll:true});return;}
 if(target.dataset.project){drawer.openProject(target.dataset.project,target.dataset.projectVersionOpen||null);}
 else if(target.dataset.document){drawer.openDocument(target.dataset.document);}
 else if(target.dataset.article!==undefined){drawer.openArticle(Number(target.dataset.article));}
 switch(target.dataset.action){
  case 'chat':navigation.collapseMenu();agent.open();break;
  case 'open-search':navigation.collapseMenu();search.open();break;
  case 'open-theme':navigation.collapseMenu();themePicker.open();break;
  case 'close-chat':agent.close();break;
  case 'close-drawer':drawer.close();break;
  case 'prev-article':drawer.previous();break;
  case 'next-article':drawer.next();break;
  case 'open-document-full':viewer.openDocument(target.dataset.documentFull);break;
  case 'preview-pdf':viewer.openPdf(target.dataset.pdfSrc);break;
  case 'close-viewer':viewer.close();break;
  case 'open-photo-theme':drawer.openPhotographyTheme(target.dataset.photoTheme);break;
  case 'open-photo':viewer.openPhotography(target.dataset.photoTheme,Number(target.dataset.photoIndex));break;
  case 'photo-viewer-prev':viewer.stepPhotography(-1);break;
  case 'photo-viewer-next':viewer.stepPhotography(1);break;
 }
});
navigation.start();
