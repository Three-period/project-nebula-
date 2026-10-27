import { documents } from '../data/documents.js';
import { articles } from '../data/articles.js';
import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { createDialog } from './dialog.js';
import { escapeHTML } from './content.js';
const projectMap=new Map([...workProjects,...personalProjects].map(p=>[p.id,p]));
export function initDrawer(){
 const element=document.getElementById('detail-dialog');
 const controller=createDialog(element,element.querySelector('[data-action="close-drawer"]'));
 const body=document.getElementById('drawer-body'), external=document.getElementById('drawer-external');
 const previous=document.getElementById('article-prev'),next=document.getElementById('article-next');
 let currentArticle=-1;let currentProject=null;
 function show(item,articleIndex=-1){
  if(!item)return;
  currentArticle=articleIndex;
  document.getElementById('drawer-type').textContent=item.type||item.en||'PROJECT';
  document.getElementById('drawer-title').textContent=item.title;
  const notice=item.historical?'<p class="drawer-notice">历史资料：原文保留供查阅，内容及技术描述不代表本次已核验或当前服务状态。</p>':item.sample?'<p class="drawer-notice">原站示范内容，尚待替换为真实分析。</p>':'';
  const returnLink=currentProject&&item!==projectMap.get(currentProject)?'<button class="button" data-project="'+escapeHTML(currentProject)+'">← 返回项目</button>':'';
  body.innerHTML=returnLink+notice+(item.body||'');
  body.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noopener noreferrer');
  const hasExternal=Boolean(item.url&&item.url!=='#');external.hidden=!hasExternal;
  if(hasExternal)external.href=item.url;else external.removeAttribute('href');
  previous.parentElement.hidden=articleIndex<0;previous.disabled=articleIndex<=0;next.disabled=articleIndex>=articles.length-1;
  controller.open();body.scrollTop=0;
 }
 return {
  openProject(id){
   const p=projectMap.get(id);if(!p)return;
   currentProject=id;
   const links=(p.document?'<button class="button" data-document="'+escapeHTML(p.document)+'">相关历史材料 ↗</button>':'')+
   (p.video?'<a class="button" href="'+escapeHTML(p.video)+'" target="_blank" rel="noopener noreferrer">演示视频 ↗</a>':'')+
   (p.external?'<a class="button" href="'+escapeHTML(p.external)+'" target="_blank" rel="noopener noreferrer">在线产品 ↗</a>':'');
   show({type:p.type,title:p.title,body:'<div class="project-detail-meta">'+escapeHTML(p.year)+' · '+escapeHTML(p.stage)+'</div><p>'+escapeHTML(p.description)+'</p>'+p.body+'<div class="actions">'+links+'</div>'});
  },
  openDocument(key){show({...documents[key],historical:true});},
  openArticle(index){currentProject=null;show(articles[index],index);},
  previous(){if(currentArticle>0)this.openArticle(currentArticle-1);},
  next(){if(currentArticle>=0&&currentArticle<articles.length-1)this.openArticle(currentArticle+1);},
  close:controller.close
 };
}
