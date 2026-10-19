import { projects } from '../data/projects.js';
import { documentList } from '../data/document-list.js';
import { articles } from '../data/articles.js';

// Metadata is escaped; rich document bodies are trusted, repository-owned HTML.
export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
const tags = items => `<div class="tags">${items.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>`;
const detailButton = (kind, key, label) => `<button class="button" data-${kind}="${key}">${label} ↗</button>`;

export function renderContent() {
  document.getElementById('project-list').innerHTML = projects.map((p, i) => `
    <article class="project${p.pending ? ' pending' : ''}">
      <div class="item-meta"><span class="item-number">${String(i + 1).padStart(2, '0')}</span><span>${escapeHTML(p.type)}</span><span>${escapeHTML(p.year)}</span>${p.pending ? '<span class="pending-note">内容待补充</span>' : ''}</div>
      <h3>${escapeHTML(p.title)}</h3><p class="project-description">${escapeHTML(p.description)}</p>
      ${p.stack ? `<p class="project-stack">${escapeHTML(p.stack)}</p>` : ''}${tags(p.tags)}
      ${!p.pending ? `<div class="actions">${detailButton('document', p.document, '查看项目详情')}${p.video ? `<a class="button" href="${escapeHTML(p.video)}" target="_blank" rel="noopener noreferrer">演示视频 ↗</a>` : '<button class="button" data-action="chat">唤醒数字分身 ↗</button>'}</div>` : ''}
    </article>`).join('');

  document.getElementById('document-list').innerHTML = documentList.map(d => `
    <article class="document-card"><div class="item-meta">${escapeHTML(d.type)}${d.key !== 'paper' ? '<span>历史项目材料</span>' : ''}</div>
      <h3>${escapeHTML(d.title)}</h3><p>${escapeHTML(d.description)}</p>${tags(d.tags)}
      <div class="actions">${detailButton('document', d.key, '阅读详情')}</div>
    </article>`).join('');

  document.getElementById('article-list').innerHTML = articles.map((a, i) => `
    <article class="article-row"><div class="article-meta"><span>${escapeHTML(a.en)}</span>${a.sample ? '<span class="sample-label">示范内容 · 待替换</span>' : ''}</div>
      <button class="article-open" data-article="${i}"><h3>${escapeHTML(a.title)} <span aria-hidden="true">↗</span></h3></button>
      <p class="summary">${escapeHTML(a.summary)}</p><div class="article-bottom">${tags(a.tags)}
      ${a.url ? `<a class="text-link" href="${escapeHTML(a.url)}" target="_blank" rel="noopener noreferrer">Notion 原文 ↗</a>` : ''}</div>
    </article>`).join('');
}
