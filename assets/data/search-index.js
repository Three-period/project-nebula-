/* Search index is rebuilt from the site's genuine bilingual content. No PDF binary scraping. */
import { workProjects } from './work-projects.js';
import { personalProjects } from './personal-projects.js';
import { articles } from './articles.js';
import { documentList } from './document-list.js';
import { capabilityGroups } from './capabilities.js';
import { photographyThemes } from './photography.js';
import { getLocalizedPhotographyTheme } from './photography-i18n.js';
import { getLocalizedRecord, t } from '../js/i18n.js';

const PAGES = [
  ['about','aboutNav','aboutHeadline'],
  ['experience','experienceNav','experienceLead'],
  ['projects','projectsNav','projectsLead'],
  ['insights','insightsNav','insightsLead'],
  ['photography','photographyNav','photographyLead']
];

export function buildSearchIndex(lang='zh') {
  const entries = PAGES.map(([pageId,titleKey,summaryKey])=>({
    id:'page:'+pageId,kind:'page',pageId,title:t(titleKey,lang),summary:t(summaryKey,lang)
  }));
  for (const project of [...workProjects,...personalProjects]) {
    const p=getLocalizedRecord('project',project.id,project,lang);
    entries.push({id:'project:'+project.id,kind:'project',pageId:'projects',recordId:project.id,
      title:p.title,summary:p.description||'',keywords:(p.tags||[]).join(' ')+' '+(p.type||'')});
  }
  articles.forEach((article,index)=>{
    const a=getLocalizedRecord('article',String(index),article,lang);
    entries.push({id:'article:'+index,kind:'article',pageId:'insights',recordId:index,
      title:a.title,summary:a.summary||'',keywords:(a.tags||[]).join(' ')});
  });
  for (const doc of documentList) {
    const d=getLocalizedRecord('documentCard',doc.key,doc,lang);
    entries.push({id:'document:'+doc.key,kind:'document',pageId:'projects',recordId:doc.key,
      title:d.title,summary:d.description||'',keywords:(d.tags||[]).join(' ')});
  }
  for (const group of capabilityGroups) {
    entries.push({id:'capability:'+group.id,kind:'capability',pageId:'projects',recordId:group.id,
      title:t(group.titleKey,lang),summary:t(group.descriptionKey,lang),keywords:t(group.skillsKey,lang)});
  }
  for (const theme of photographyThemes) {
    const localized=getLocalizedPhotographyTheme(theme.id,lang);
    entries.push({id:'photoTheme:'+theme.id,kind:'photoTheme',pageId:'photography',
      recordId:theme.id,title:localized.title,summary:localized.description});
    localized.photos.forEach((p,index)=>{
      entries.push({id:'photo:'+p.id,kind:'photo',pageId:'photography',recordId:theme.id,
        photoIndex:index,title:p.title,summary:p.description||p.alt||''});
    });
  }
  return entries;
}

export function searchEntries(entries,term,limit=24){
  const needle=String(term||'').trim().toLocaleLowerCase();
  if (!needle) return entries.filter(e=>e.kind==='page').slice(0,limit);
  return entries.map(item=>{
    const title=String(item.title||'').toLocaleLowerCase();
    const summary=String(item.summary||'').toLocaleLowerCase();
    const tags=String(item.keywords||'').toLocaleLowerCase();
    const score=title===needle?10:title.includes(needle)?6:tags.includes(needle)?3:summary.includes(needle)?1:0;
    return {item,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.item);
}
