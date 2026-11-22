
import { enterpriseProjects, featuredProjects, projectById, yijingProjects } from '../data/portfolio-projects.js';
import { documentList } from '../data/document-list.js';
import { articles } from '../data/articles.js';
import { getLocalizedRecord, getCurrentLanguage, t } from './i18n.js';

export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
const tags = items => '<div class="tags">' + (items || []).map(tag => '<span class="tag">' + escapeHTML(tag) + '</span>').join('') + '</div>';
const preview = p => p.cover
  ? '<img class="project-cover" src="' + escapeHTML(p.cover) + '" alt="' + escapeHTML(p.title + ' · ' + t('projectPreviewAlt')) + '" loading="lazy">'
  : '';

function projectCard(raw) {
  const p = getLocalizedRecord('project', raw.id, raw);
  const video = p.video && !p.media?.some(item => item.type === 'video') ? '<a class="button" href="' + escapeHTML(p.video) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a>' : '';
  const language = getCurrentLanguage();
  const materials = p.id === 'personal-nebula' ? renderNebulaMaterials(language) : '';
  return '<article class="project' + (p.cover ? ' project--with-cover' : ' project--text') + '" data-project-id="' + escapeHTML(p.id) + '">' + preview(p) +
    '<div class="project-content"><div class="item-meta"><span>' + escapeHTML(p.type) + '</span><span>' + escapeHTML(p.year) + '</span></div>' +
    '<h3>' + escapeHTML(p.title) + '</h3><p class="project-description">' + escapeHTML(p.description) + '</p>' +
    '<p class="project-stack">' + escapeHTML(p.stage) + '</p>' + tags(p.tags) +
    '<div class="actions"><button class="button" data-project="' + escapeHTML(p.id) + '">' + escapeHTML(t('projectDetails')) + '</button>' + materials + video + '</div></div></article>';
}

function renderNebulaMaterials(language) {
  return documentList.map(doc =>
    '<button type="button" class="button" data-document="' + escapeHTML(doc.key) + '">' +
    escapeHTML(language === 'en' ? doc.labelEn : doc.label) + '</button>'
  ).join('');
}

export function renderProjectLinks(ids, language = getCurrentLanguage()) {
  return (ids || []).map(id => {
    const raw = projectById.get(id);
    if (!raw) return '';
    const project = getLocalizedRecord('project', id, raw, language);
    return '<button type="button" class="button" data-project="' + escapeHTML(id) + '">' +
      escapeHTML(project.title) + ' ↗</button>';
  }).join('');
}

export function renderContent(language = getCurrentLanguage()) {
  for (const group of document.querySelectorAll('[data-skill-tags]')) {
    group.innerHTML = t(group.dataset.skillTags, language).split('|').map(tag =>
      '<span class="tag">' + escapeHTML(tag) + '</span>'
    ).join('');
  }

  document.getElementById('featured-project-list').innerHTML = featuredProjects.map(projectCard).join('');
  document.getElementById('enterprise-project-list').innerHTML = enterpriseProjects.map(projectCard).join('');
  document.getElementById('yijing-project-list').innerHTML = yijingProjects.map(projectCard).join('');

  document.getElementById('article-list').innerHTML = articles.map((raw, index) => {
    const article = getLocalizedRecord('article', String(index), raw, language);
    return '<article class="article-row"><div class="article-meta"><span>' + escapeHTML(article.en) + '</span></div>' +
      '<h3><button type="button" class="article-open" data-article="' + index + '">' + escapeHTML(article.title) + ' ↗</button></h3>' +
      '<p class="summary">' + escapeHTML(article.summary) + '</p><div class="article-bottom">' + tags(article.tags) +
      (article.url ? '<a class="text-link" href="' + escapeHTML(article.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('originalSource', language)) + '</a>' : '') +
      '</div></article>';
  }).join('');
}
