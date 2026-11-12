import { buildSearchIndex,searchEntries } from '../data/search-index.js';
import { getCurrentLanguage,t } from './i18n.js';
import { escapeHTML } from './content.js';

export function initSearch({onNavigate=()=>{}}={}){
  const dialog=document.getElementById('search-dialog');
  const input=document.getElementById('search-input');
  const list=document.getElementById('search-results');
  if(!dialog||!input||!list)return {open(){},setLanguage(){}};
  let entries=[],results=[],opener=null,navigating=false;
  let activeIndex=0;
  const category={
    page:'searchKindPage',project:'searchKindProject',article:'searchKindArticle',
    document:'searchKindDocument',capability:'searchKindCapability',
    photoTheme:'searchKindPhotography',photo:'searchKindPhotography'
  };
  function render(){
    results=searchEntries(entries,input.value);
    activeIndex=0;
    if(!results.length){
      list.innerHTML='<p class="search-empty" role="status">'+escapeHTML(t('searchNoResults'))+'</p>';
      return;
    }
    list.innerHTML=results.map((item,index)=>'<button class="search-result" type="button" data-search-result="'+index+'">'+
      '<span class="search-result-kind">'+escapeHTML(t(category[item.kind]))+'</span>'+
      '<strong>'+escapeHTML(item.title||'')+'</strong>'+
      (item.summary?'<small>'+escapeHTML(item.summary)+'</small>':'')+'</button>').join('');
  }
  function focusResult(index){
    if(!results.length)return;
    activeIndex=(index+results.length)%results.length;
    list.querySelector('[data-search-result="'+activeIndex+'"]')?.focus();
  }
  function choose(index){
    const item=results[index];
    if(!item)return;
    navigating=true;
    dialog.close();
    onNavigate(item);
  }
  function setLanguage(){
    entries=buildSearchIndex(getCurrentLanguage());
    input.placeholder=t('searchPlaceholder');
    render();
  }
  function open(){
    if(dialog.open)return;
    opener=document.activeElement;
    setLanguage();
    dialog.showModal();
    input.focus();
    input.select();
  }
  dialog.addEventListener('close',()=>{if(!navigating)opener?.focus({preventScroll:true});navigating=false;});
  input.addEventListener('input',render);
  input.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'){event.preventDefault();focusResult(0);}
    if(event.key==='ArrowUp'){event.preventDefault();focusResult(results.length-1);}
    if(event.key==='Enter'){event.preventDefault();choose(activeIndex);}
  });
  list.addEventListener('click',event=>{
    const btn=event.target.closest('[data-search-result]');
    if(btn)choose(Number(btn.dataset.searchResult));
  });
  list.addEventListener('keydown',event=>{
    const btn=event.target.closest('[data-search-result]');
    if(!btn)return;
    const index=Number(btn.dataset.searchResult);
    if(event.key==='ArrowDown'){event.preventDefault();focusResult(index+1);}
    if(event.key==='ArrowUp'){event.preventDefault();focusResult(index-1);}
    if(event.key==='Home'){event.preventDefault();focusResult(0);}
    if(event.key==='End'){event.preventDefault();focusResult(results.length-1);}
    if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(index);}
  });
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  document.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
      event.preventDefault();open();
    }
  });
  dialog.querySelector('[data-action="close-search"]').addEventListener('click',()=>dialog.close());
  setLanguage();
  return {open,setLanguage};
}
