
import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { documentList } from '../data/document-list.js';
import { articles } from '../data/articles.js';
import { capabilityGroups } from '../data/capabilities.js';
import { getLocalizedRecord, getCurrentLanguage, t } from './i18n.js';

export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
const tags = items => '<div class="tags">' + (items || []).map(tag => '<span class="tag">' + escapeHTML(tag) + '</span>').join('') + '</div>';
const preview = p => p.cover
  ? '<img class="project-cover" src="' + escapeHTML(p.cover) + '" alt="' + escapeHTML(p.title + ' · ' + t('projectPreviewAlt')) + '" loading="lazy">'
  : '<div class="project-cover project-cover-placeholder" aria-hidden="true"><span>✧</span><small>PROJECT / ' + escapeHTML(p.type) + '</small></div>';

function projectCard(raw, index) {
  const p = getLocalizedRecord('project', raw.id, raw);
  const video = p.video && !p.media?.some(item => item.type === 'video') ? '<a class="button" href="' + escapeHTML(p.video) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a>' : '';
  return '<article class="project" data-project-id="' + escapeHTML(p.id) + '">' + preview(p) +
    '<div class="project-content"><div class="item-meta"><span class="item-number">' + String(index + 1).padStart(2, '0') + '</span><span>' + escapeHTML(p.type) + '</span><span>' + escapeHTML(p.year) + '</span></div>' +
    '<h3>' + escapeHTML(p.title) + '</h3><p class="project-description">' + escapeHTML(p.description) + '</p>' +
    '<p class="project-stack">' + escapeHTML(p.stage) + '</p>' + tags(p.tags) +
    '<div class="actions"><button class="button" data-project="' + escapeHTML(p.id) + '">' + escapeHTML(t('projectDetails')) + '</button>' + video + '</div></div></article>';
}

const projectById = new Map([...workProjects, ...personalProjects].map(project => [project.id, project]));

function renderCapabilities(language) {
  const target = document.getElementById('capability-grid');
  if (!target) return;
  target.innerHTML = capabilityGroups.map(group => {
    const skills = t(group.skillsKey, language).split('|').map(skill =>
      '<span class="tag">' + escapeHTML(skill.trim()) + '</span>'
    ).join('');
    const evidence = group.evidence.map(id => {
      const raw = projectById.get(id);
      if (!raw) return '';
      const project = getLocalizedRecord('project', id, raw, language);
      return '<button class="capability-evidence-item" type="button" data-project="' + escapeHTML(id) +
        '" aria-label="' + escapeHTML(t('capabilityOpenEvidence', language) + project.title) + '">' +
        '<strong>' + escapeHTML(project.title) + '</strong><small>' + escapeHTML(project.stage) + '</small></button>';
    }).filter(Boolean).join('');
    return '<article class="capability-card"><header><span class="capability-index">' +
      escapeHTML(group.number) + '</span><h4>' + escapeHTML(t(group.titleKey, language)) +
      '</h4></header><p class="capability-description">' +
      escapeHTML(t(group.descriptionKey, language)) + '</p><div class="capability-skills">' +
      skills + '</div><div class="capability-evidence"><p class="eyebrow">' +
      escapeHTML(t('capabilityEvidenceLabel', language)) + '</p><div class="capability-evidence-list">' +
      evidence + '</div></div></article>';
  }).join('');
}

export function renderContent(language = getCurrentLanguage()) {
  renderCapabilities(language);
  document.getElementById('work-project-list').innerHTML = workProjects.map(projectCard).join('');
  document.getElementById('personal-project-list').innerHTML = personalProjects.map(projectCard).join('');

  document.getElementById('document-list').innerHTML = documentList.map(raw => {
    const item = getLocalizedRecord('documentCard', raw.key, raw, language);
    return '<article class="document-card"><div class="document-copy"><div class="item-meta">' + escapeHTML(item.type) + ' · ' + escapeHTML(t('historicalMaterials', language)) + '</div>' +
      '<h3>' + escapeHTML(item.title) + '</h3><p>' + escapeHTML(item.description) + '</p>' + tags(item.tags) + '</div>' +
      '<div class="actions"><button class="button" data-document="' + escapeHTML(item.key) + '">' + escapeHTML(t('documentDetails', language)) + '</button></div></article>';
  }).join('');

  const nebula = getLocalizedRecord('project', 'personal-nebula', personalProjects.find(project => project.id === 'personal-nebula'), language);
  const materials = documentList.filter(doc => ['prd', 'design', 'arch', 'proto', 'agent'].includes(doc.key));
  const resources = document.getElementById('independent-project-resources');
  if (nebula && resources) {
    resources.innerHTML = '<button class="button primary" data-project="' + escapeHTML(nebula.id) + '">' + escapeHTML(t('projectDetails', language)) + '</button>' +
      materials.map(raw => {
        const item = getLocalizedRecord('documentCard', raw.key, raw, language);
        return '<button class="button" data-document="' + escapeHTML(item.key) + '">' + escapeHTML(item.title) + ' ↗</button>';
      }).join('') +
      (nebula.video ? '<a class="button" href="' + escapeHTML(nebula.video) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo', language)) + '</a>' : '') +
      (nebula.external ? '<a class="button" href="' + escapeHTML(nebula.external) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('onlineSite', language)) + '</a>' : '');
  }

  document.getElementById('article-list').innerHTML = articles.map((raw, index) => {
    const article = getLocalizedRecord('article', String(index), raw, language);
    return '<article class="article-row"><div class="article-meta"><span>' + escapeHTML(article.en) + '</span></div>' +
      '<button class="article-open" data-article="' + index + '"><h3>' + escapeHTML(article.title) + ' ↗</h3></button>' +
      '<p class="summary">' + escapeHTML(article.summary) + '</p><div class="article-bottom">' + tags(article.tags) +
      (article.url ? '<a class="text-link" href="' + escapeHTML(article.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('originalSource', language)) + '</a>' : '') +
      '</div></article>';
  }).join('');
}
