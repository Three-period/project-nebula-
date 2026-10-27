import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { documentList } from '../data/document-list.js';
import { articles } from '../data/articles.js';
export function escapeHTML(value='') { return String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
const tags=items=>'<div class="tags">'+(items||[]).map(t=>'<span class="tag">'+escapeHTML(t)+'</span>').join('')+'</div>';
const preview=p=>p.cover?'<img class="project-cover" src="'+escapeHTML(p.cover)+'" alt="'+escapeHTML(p.title)+' 项目预览" loading="lazy">':'<div class="project-cover project-cover-placeholder" aria-hidden="true"><span>✧</span><small>PROJECT / '+escapeHTML(p.type)+'</small></div>';
function projectCard(p,i) {return '<article class="project" data-project-id="'+escapeHTML(p.id)+'">'+preview(p)+
'<div class="item-meta"><span class="item-number">'+String(i+1).padStart(2,'0')+'</span><span>'+escapeHTML(p.type)+'</span><span>'+escapeHTML(p.year)+'</span></div>'+
'<h3>'+escapeHTML(p.title)+'</h3><p class="project-description">'+escapeHTML(p.description)+'</p>'+
'<p class="project-stack">'+escapeHTML(p.stage)+'</p>'+tags(p.tags)+
'<div class="actions"><button class="button" data-project="'+escapeHTML(p.id)+'">查看项目详情 ↗</button>'+
(p.video?'<a class="button" href="'+escapeHTML(p.video)+'" target="_blank" rel="noopener noreferrer">演示视频 ↗</a>':'')+'</div></article>';}
export function renderContent(){
 document.getElementById('work-project-list').innerHTML=workProjects.map(projectCard).join('');
 document.getElementById('personal-project-list').innerHTML=personalProjects.map(projectCard).join('');
 document.getElementById('document-list').innerHTML=documentList.map(d=>'<article class="document-card"><div class="item-meta">'+escapeHTML(d.type)+' · 历史材料</div><h3>'+escapeHTML(d.title)+'</h3><p>'+escapeHTML(d.description)+'</p>'+tags(d.tags)+'<div class="actions"><button class="button" data-document="'+escapeHTML(d.key)+'">阅读原文 ↗</button></div></article>').join('');
 document.getElementById('article-list').innerHTML=articles.map((a,i)=>'<article class="article-row"><div class="article-meta"><span>'+escapeHTML(a.en)+'</span>'+(a.sample?'<span class="sample-label">示范内容 · 待替换</span>':'')+'</div><button class="article-open" data-article="'+i+'"><h3>'+escapeHTML(a.title)+' ↗</h3></button><p class="summary">'+escapeHTML(a.summary)+'</p><div class="article-bottom">'+tags(a.tags)+(a.url?'<a class="text-link" href="'+escapeHTML(a.url)+'" target="_blank" rel="noopener noreferrer">原文 ↗</a>':'')+'</div></article>').join('');
}
