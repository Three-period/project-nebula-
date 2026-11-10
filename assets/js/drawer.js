import { documents } from '../data/documents.js';
import { articles } from '../data/articles.js';
import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { createDialog } from './dialog.js';
import { escapeHTML } from './content.js';
import { getLocalizedRecord, getCurrentLanguage, t } from './i18n.js';

const projectMap = new Map([...workProjects, ...personalProjects].map(project => [project.id, project]));

export function initDrawer() {
  const element = document.getElementById('detail-dialog');
  const controller = createDialog(element, element.querySelector('[data-action="close-drawer"]'));
  const body = document.getElementById('drawer-body');
  const external = document.getElementById('drawer-external');
  const previous = document.getElementById('article-prev');
  const next = document.getElementById('article-next');
  let currentArticle = -1;
  let currentProject = null;
  let currentView = null;

  function show(item, articleIndex = -1, preserveScroll = false) {
    if (!item) return;
    const scrollTop = preserveScroll ? body.scrollTop : 0;
    currentArticle = articleIndex;
    document.getElementById('drawer-type').textContent = item.type || t('projectType');
    document.getElementById('drawer-title').textContent = item.title;
    const notice = item.historical ? '<p class="drawer-notice">' + escapeHTML(t('historicalNotice')) + '</p>' : '';
    const returnLink = currentProject && item.type !== 'Work Project' && item.type !== 'Personal Project'
      ? '<button class="button" data-project="' + escapeHTML(currentProject) + '">' + escapeHTML(t('returnToProject')) + '</button>' : '';
    body.innerHTML = returnLink + notice + (item.body || '');
    body.querySelectorAll('a[target="_blank"]').forEach(link => { link.rel = 'noopener noreferrer'; });
    const hasExternal = Boolean(item.url && item.url !== '#');
    external.hidden = !hasExternal;
    if (hasExternal) external.href = item.url;
    else external.removeAttribute('href');
    previous.parentElement.hidden = articleIndex < 0;
    previous.disabled = articleIndex <= 0;
    next.disabled = articleIndex >= articles.length - 1;
    controller.open();
    body.scrollTop = scrollTop;
  }

  function openProject(id, preserveScroll = false) {
    const raw = projectMap.get(id);
    if (!raw) return;
    currentProject = id;
    const project = getLocalizedRecord('project', id, raw);
    const links =
      (project.document ? '<button class="button" data-document="' + escapeHTML(project.document) + '">' + escapeHTML(t('relatedHistoricalMaterial')) + '</button>' : '') +
      (project.video ? '<a class="button" href="' + escapeHTML(project.video) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a>' : '') +
      (project.external ? '<a class="button" href="' + escapeHTML(project.external) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('onlineProduct')) + '</a>' : '');
    show({
      type: project.type,
      title: project.title,
      body: '<div class="project-detail-meta">' + escapeHTML(project.year) + ' · ' + escapeHTML(project.stage) + '</div><p>' +
        escapeHTML(project.description) + '</p>' + project.body + '<div class="actions">' + links + '</div>'
    }, -1, preserveScroll);
  }

  function openDocument(key, preserveScroll = false) {
    const raw = documents[key];
    const item = getLocalizedRecord('document', key, raw);
    show({ ...item, historical: true }, -1, preserveScroll);
  }

  function openArticle(index, preserveScroll = false) {
    currentProject = null;
    const raw = articles[index];
    const article = getLocalizedRecord('article', String(index), raw);
    show(article, index, preserveScroll);
  }

  return {
    openProject(id) {
      currentView = preserve => openProject(id, preserve);
      currentView(false);
    },
    openDocument(key) {
      currentView = preserve => openDocument(key, preserve);
      currentView(false);
    },
    openArticle(index) {
      currentView = preserve => openArticle(index, preserve);
      currentView(false);
    },
    setLanguage() {
      if (currentView) currentView(true);
    },
    previous() { if (currentArticle > 0) this.openArticle(currentArticle - 1); },
    next() { if (currentArticle >= 0 && currentArticle < articles.length - 1) this.openArticle(currentArticle + 1); },
    close() {
      currentView = null;
      currentProject = null;
      controller.close();
    }
  };
}
