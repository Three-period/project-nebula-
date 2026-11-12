import { themes } from './theme.js';
import { getCurrentLanguage,t } from './i18n.js';
import { escapeHTML } from './content.js';

export function initThemePicker(themeManager) {
 const dialog=document.getElementById('theme-dialog');
 const grid=document.getElementById('theme-picker-grid');
 const status=document.getElementById('theme-picker-status');
 const close=dialog.querySelector('[data-action="close-theme"]');
 let opener=null;
 const order=['landscape','cosmic','littlePrince','smokyLavender'];
 function render(){
   const language=getCurrentLanguage(),active=themeManager.current;
   grid.innerHTML=order.map(id=>{
     const theme=themes[id],p=theme.preview||{},available=theme.status==='active'&&Boolean(theme.stylesheet);
     const name=language==='en'?theme.nameEn:theme.name;
     const marker=available?(active===id?t('themeCurrent'):t('themeSelect')):t('themePlanned');
     return '<button type="button" class="theme-option" data-theme-select="'+escapeHTML(id)+'"'+
       (!available?' disabled aria-disabled="true"':'')+
       (id===active?' aria-current="true"':'')+
       ' style="--preview-page:'+escapeHTML(p.page||'#fff')+';--preview-surface:'+escapeHTML(p.surface||'#eee')+
       ';--preview-accent:'+escapeHTML(p.accent||'#555')+';--preview-line:'+escapeHTML(p.line||'#ddd')+'">'+
       '<span class="theme-miniature" aria-hidden="true"><span class="theme-mini-card"><span class="theme-mini-line"></span><span class="theme-mini-button"></span></span></span>'+
       '<span class="theme-option-meta"><strong>'+escapeHTML(name)+'</strong><small>'+escapeHTML(marker)+'</small></span></button>';
   }).join('');
 }
 function open(){opener=document.activeElement;status.textContent='';render();dialog.showModal();close.focus();}
 grid.addEventListener('click',async event=>{
   const button=event.target.closest('[data-theme-select]');if(!button||button.disabled)return;
   const selected=button.dataset.themeSelect;
   if(selected===themeManager.current){dialog.close();return;}
   status.textContent=t('themeLoading');
   const ok=await themeManager.setTheme(selected);
   if(ok){dialog.close();}else{status.textContent=t('themeLoadError');render();}
 });
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
 return {open,setLanguage(){if(dialog.open)render();}};
}
