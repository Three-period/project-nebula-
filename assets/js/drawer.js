import { documents } from '../data/documents.js';
import { documentList } from '../data/document-list.js';
import { articles } from '../data/articles.js';
import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { createDialog } from './dialog.js';
import { getLocalizedPhotographyTheme } from '../data/photography-i18n.js';
import { escapeHTML } from './content.js';
import { getLocalizedRecord, getCurrentLanguage, t } from './i18n.js';

const projectMap = new Map([...workProjects, ...personalProjects].map(project => [project.id, project]));
const mediaLabels = { image: 'mediaImages', video: 'mediaVideo', gif: 'mediaGif' };

function mediaCopy(item, field) {
  return getCurrentLanguage() === 'en' ? (item[field + 'En'] || item[field] || '') : (item[field] || '');
}

function renderProjectMedia(project, activeType, activeIndex) {
  const media = project.media || [];
  if (!media.length) return '';
  const types = ['image', 'video', 'gif'].filter(type => media.some(item => item.type === type));
  const type = types.includes(activeType) ? activeType : types[0];
  const entries = media.map((item, index) => ({ ...item, index })).filter(item => item.type === type);
  const safeIndex = Math.max(0, Math.min(activeIndex, entries.length - 1));
  const item = entries[safeIndex];
  const title = mediaCopy(item, 'title') || project.title;
  const alt = mediaCopy(item, 'alt') || title;
  const tabs = types.map(tab => '<button class="media-tab" type="button" role="tab" aria-selected="' +
    String(tab === type) + '" id="media-tab-' + tab + '" tabindex="' + (tab === type ? '0' : '-1') + '" aria-controls="project-media-panel" data-media-tab="' + tab + '">' + escapeHTML(t(mediaLabels[tab])) + '</button>').join('');

  let stage = '';
  if (type === 'image' || type === 'gif') {
    stage = '<button class="media-image-button" type="button" data-action="open-media" data-project-id="' +
      escapeHTML(project.id) + '" data-media-index="' + item.index + '" aria-label="' +
      escapeHTML(t('viewMediaFull')) + '"><img src="' + escapeHTML(item.src) + '" alt="' +
      escapeHTML(alt) + '" loading="lazy"></button>';
  } else if (type === 'video' && item.embedUrl) {
    stage = '<div class="media-video-frame"><iframe src="' + escapeHTML(item.embedUrl) +
      '" title="' + escapeHTML(title) +
      '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>' +
      '<div class="media-stage-actions"><button class="button" type="button" data-action="open-media" data-project-id="' +
      escapeHTML(project.id) + '" data-media-index="' + item.index + '">' +
      escapeHTML(t('viewMediaFull')) + '</button><a class="text-link" href="' + escapeHTML(item.src) +
      '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a></div>';
  } else if (type === 'video' && item.src) {
    stage = '<div class="media-video-fallback"><a class="button" href="' + escapeHTML(item.src) +
      '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a></div>';
  }

  const controls = entries.length > 1
    ? '<div class="media-controls"><button class="button" type="button" data-media-step="-1">' +
      escapeHTML(t('previousMedia')) + '</button><span>' + (safeIndex + 1) + ' / ' + entries.length +
      '</span><button class="button" type="button" data-media-step="1">' +
      escapeHTML(t('nextMedia')) + '</button></div>'
    : '';

  return '<section class="project-media" aria-label="' + escapeHTML(t('mediaTabAria')) + '">' +
    '<div class="media-tabs" role="tablist" aria-label="' + escapeHTML(t('mediaTabAria')) + '">' + tabs + '</div>' +
    '<div id="project-media-panel" role="tabpanel" aria-labelledby="media-tab-' + type + '" class="media-stage' + (type === 'video' ? ' media-stage-video' : '') + '">' + stage + '</div>' +
    '<p class="media-caption">' + escapeHTML(title) + '</p>' + controls + '</section>';
}

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
  let activeMediaType = null;
  let activeMediaIndex = 0;

  function show(item, articleIndex = -1, preserveScroll = false) {
    if (!item) return;
    const scrollTop = preserveScroll ? body.scrollTop : 0;
    currentArticle = articleIndex;
    document.getElementById('drawer-type').textContent = item.type || t('projectType');
    document.getElementById('drawer-title').textContent = item.title;
    const notice = item.historical ? '<p class="drawer-notice">' + escapeHTML(t('historicalNotice')) + '</p>' : '';
    const returnLink = currentProject && item.historical
      ? '<button class="button" type="button" data-project="' + escapeHTML(currentProject) + '">' +
        escapeHTML(t('returnToProject')) + '</button>' : '';
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

  function refreshProjectMedia() {
    const raw = projectMap.get(currentProject);
    if (!raw) return;
    const project = getLocalizedRecord('project', currentProject, raw);
    const section = body.querySelector('.project-media');
    if (section) section.outerHTML = renderProjectMedia(project, activeMediaType, activeMediaIndex);
  }

  body.addEventListener('click', event => {
    const tab = event.target.closest('[data-media-tab]');
    if (tab) {
      activeMediaType = tab.dataset.mediaTab;
      activeMediaIndex = 0;
      refreshProjectMedia();
      return;
    }
    const step = event.target.closest('[data-media-step]');
    if (step) {
      const raw = projectMap.get(currentProject);
      const count = (raw?.media || []).filter(item => item.type === activeMediaType).length;
      if (!count) return;
      activeMediaIndex = (activeMediaIndex + Number(step.dataset.mediaStep) + count) % count;
      refreshProjectMedia();
    }
  });

  body.addEventListener('keydown', event => {
    const tab = event.target.closest?.('[data-media-tab]');
    if (!tab || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...body.querySelectorAll('[data-media-tab]')];
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex < 0 || tabs.length < 2) return;
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    event.preventDefault();
    activeMediaType = tabs[nextIndex].dataset.mediaTab;
    activeMediaIndex = 0;
    refreshProjectMedia();
    body.querySelector('[data-media-tab="' + activeMediaType + '"]')?.focus();
  });

  function openProject(id, preserveScroll = false) {
    const raw = projectMap.get(id);
    if (!raw) return;
    currentProject = id;
    activeMediaType = null;
    activeMediaIndex = 0;
    const project = getLocalizedRecord('project', id, raw);
    const hasEmbeddedVideo = project.media?.some(item => item.type === 'video');
    const links =
      (project.document ? '<button class="button" type="button" data-document="' + escapeHTML(project.document) + '">' +
        escapeHTML(t('relatedHistoricalMaterial')) + '</button>' : '') +
      (project.video && !hasEmbeddedVideo ? '<a class="button" href="' + escapeHTML(project.video) +
        '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a>' : '') +
      (project.external ? '<a class="button" href="' + escapeHTML(project.external) +
        '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('onlineProduct')) + '</a>' : '');
    show({
      type: project.type,
      title: project.title,
      body: '<div class="project-detail-meta">' + escapeHTML(project.year) + ' · ' +
        escapeHTML(project.stage) + '</div><p>' + escapeHTML(project.description) + '</p>' +
        renderProjectMedia(project, activeMediaType, activeMediaIndex) + project.body +
        '<div class="actions">' + links + '</div>'
    }, -1, preserveScroll);
  }

  function openDocument(key, preserveScroll = false) {
    const raw = documents[key];
    const cardRaw = documentList.find(item => item.key === key);
    if (!raw || !cardRaw) return;
    const card = getLocalizedRecord('documentCard', key, cardRaw);
    const item = getLocalizedRecord('document', key, raw);
    const tags = (card.tags || []).map(tag => '<span class="dr-tag">' + escapeHTML(tag) + '</span>').join('');
    const overview = '<section class="document-overview"><p class="eyebrow">' +
      escapeHTML(t('documentOverview')) + '</p><p>' + escapeHTML(card.description || '') +
      '</p><div class="dr-tag-row">' + tags + '</div><button class="button primary" type="button" data-action="open-document-full" data-document-full="' +
      escapeHTML(key) + '">' + escapeHTML(t('readFullDocument')) + '</button></section>';
    show({ ...item, body: overview, historical: true }, -1, preserveScroll);
  }

  function openPhotographyTheme(id, preserveScroll = false) {
    const theme = getLocalizedPhotographyTheme(id, getCurrentLanguage());
    if (!theme) return;
    currentProject = null;
    const photos = theme.photos.map((photo, index) =>
      '<button class="photography-drawer-item" type="button" data-action="open-photo" data-photo-theme="' +
      escapeHTML(id) + '" data-photo-index="' + index + '" aria-label="' +
      escapeHTML(t('photographyOpenPhoto') + ': ' + photo.title) + '">' +
      '<img src="' + escapeHTML(photo.src) + '" alt="' + escapeHTML(photo.alt || photo.title) +
      '" loading="lazy" decoding="async">' +
      '<span><strong>' + escapeHTML(photo.title) + '</strong>' +
      (photo.description ? '<small>' + escapeHTML(photo.description) + '</small>' : '') +
      '</span></button>'
    ).join('');
    const gallery = photos
      ? '<div class="photography-drawer-gallery">' + photos + '</div>'
      : '<div class="photography-drawer-empty"><p>' + escapeHTML(t('photographyThemeEmpty')) +
        '</p><p>' + escapeHTML(t('photographyNoPhotos')) + '</p></div>';
    show({
      type: t('photographyDrawerType'),
      title: theme.title,
      body: '<div class="photography-drawer-summary"><p>' +
        escapeHTML(theme.description) + '</p><span class="tag">' +
        theme.photos.length + ' ' + escapeHTML(t('photographyPhotoCount')) +
        '</span></div>' + gallery
    }, -1, preserveScroll);
  }

  function openArticle(index, preserveScroll = false) {
    currentProject = null;
    const raw = articles[index];
    if (!raw) return;
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
    openPhotographyTheme(id) {
      currentView = preserve => openPhotographyTheme(id, preserve);
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
