import { documents } from '../data/documents.js';
import { documentList } from '../data/document-list.js';
import { articles } from '../data/articles.js';
import { projectById } from '../data/portfolio-projects.js';
import { createDialog } from './dialog.js';
import { getLocalizedPhotographyTheme } from '../data/photography-i18n.js';
import { escapeHTML, renderProjectLinks } from './content.js';
import { getLocalizedRecord, getCurrentLanguage, t } from './i18n.js';

const mediaLabels = { image: 'mediaImages', video: 'mediaVideo', gif: 'mediaGif' };

function mediaCopy(item, field) {
  return getCurrentLanguage() === 'en' ? (item[field + 'En'] || item[field] || '') : (item[field] || '');
}

function projectVersionView(raw, localized, activeId) {
  const versions = localized.versions || raw.versions || [];
  if (!versions.length) return { project: localized, versionId: null };
  const fallbackId = raw.defaultVersion || versions[0].id;
  const versionId = versions.some(version => version.id === activeId) ? activeId : fallbackId;
  const rawVersion = raw.versions.find(version => version.id === versionId) || raw.versions[0];
  const localizedVersion = versions.find(version => version.id === versionId) || rawVersion;
  return {
    versionId,
    project: {
      ...localized,
      ...localizedVersion,
      id: raw.id,
      versions,
      versionGroupLabel: localized.versionGroupLabel || raw.versionGroupLabel,
      media: rawVersion.useLegacyMedia ? (localized.media || raw.media || []) : (rawVersion.media || []),
      video: rawVersion.useLegacyMedia ? localized.video : null,
      documents: rawVersion.documents || [],
      showCurrentDesignSystem: Boolean(rawVersion.showCurrentDesignSystem)
    }
  };
}

function getProjectView(raw, versionId) {
  if (!raw) return null;
  const localized = getLocalizedRecord('project', raw.id, raw);
  return projectVersionView(raw, localized, versionId);
}

function renderProjectVersionSwitch(project, activeId) {
  if (!project.versions?.length) return '';
  const buttons = project.versions.map(version =>
    '<button class="button project-version-tab" type="button" data-project-version="' +
    escapeHTML(version.id) + '" aria-pressed="' + String(version.id === activeId) + '">' +
    escapeHTML(version.label) + '</button>'
  ).join('');
  return '<div class="project-version-switch" role="group" aria-label="' +
    escapeHTML(project.versionGroupLabel || 'Project versions') + '">' + buttons + '</div>';
}

function renderProjectIntroduction(project) {
  const tags = (project.tags || []).map(tag => '<span class="tag">' + escapeHTML(tag) + '</span>').join('');
  const overview = '<div class="project-overview"><p>' + escapeHTML(project.detail.description ?? project.description) + '</p></div>';
  const highlights = project.detail.highlights.map(([value, label]) =>
    '<div class="project-highlight"><dt>' + escapeHTML(label) + '</dt><dd>' + escapeHTML(value) + '</dd></div>'
  ).join('');
  return (tags ? '<div class="tags project-detail-tags">' + tags + '</div>' : '') +
    overview + (highlights ? '<dl class="project-highlights">' + highlights + '</dl>' : '');
}

function renderProjectStory(detail) {
  return '<div class="project-story">' + detail.sections.map(([title, paragraph]) =>
    '<section><h3>' + escapeHTML(title) + '</h3><p>' + escapeHTML(paragraph) + '</p></section>'
  ).join('') + '</div>';
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
    stage = '<button class="media-image-button" type="button" data-action="open-media" data-media-index="' + item.index + '" aria-label="' +
      escapeHTML(t('viewMediaFull')) + '"><img src="' + escapeHTML(item.src) + '" alt="' +
      escapeHTML(alt) + '" loading="lazy"></button>';
  } else if (type === 'video' && item.embedUrl) {
    stage = '<div class="media-video-frame"><iframe src="' + escapeHTML(item.embedUrl) +
      '" title="' + escapeHTML(title) +
      '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>' +
      '<div class="media-stage-actions"><button class="button" type="button" data-action="open-media" data-media-index="' + item.index + '">' +
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

export function initDrawer({ onOpenMedia } = {}) {
  const element = document.getElementById('detail-dialog');
  const controller = createDialog(element, element.querySelector('[data-action="close-drawer"]'));
  const body = document.getElementById('drawer-body');
  const external = document.getElementById('drawer-external');
  const previous = document.getElementById('article-prev');
  const next = document.getElementById('article-next');
  let currentArticle = -1;
  let currentProject = null;
  let activeProjectVersion = null;
  let currentView = null;
  let activeMediaType = null;
  let activeMediaIndex = 0;

  function show(item, articleIndex = -1, preserveScroll = false) {
    if (!item) return;
    const scrollTop = preserveScroll ? body.scrollTop : 0;
    currentArticle = articleIndex;
    document.getElementById('drawer-type').textContent = item.type || t('projectType');
    document.getElementById('drawer-title').textContent = item.title;
    const returnLink = currentProject && item.historical
      ? '<button class="button" type="button" data-project="' + escapeHTML(currentProject) + '">' +
        escapeHTML(t('returnToProject')) + '</button>' : '';
    body.innerHTML = returnLink + (item.body || '');
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
    const view = getProjectView(projectById.get(currentProject), activeProjectVersion);
    if (!view) return;
    const { project } = view;
    const section = body.querySelector('.project-media');
    if (section) section.outerHTML = renderProjectMedia(project, activeMediaType, activeMediaIndex);
  }

  body.addEventListener('click', event => {
    const mediaButton = event.target.closest('[data-action="open-media"]');
    if (mediaButton) {
      const raw = projectById.get(currentProject);
      const view = getProjectView(raw, activeProjectVersion);
      const media = view?.project.media?.[Number(mediaButton.dataset.mediaIndex)];
      if (media) {
        const { versionId } = view;
        onOpenMedia?.(media, () => getProjectView(raw, versionId).project.title);
      }
      return;
    }
    const version = event.target.closest('[data-project-version]');
    if (version && currentProject) {
      activeProjectVersion = version.dataset.projectVersion;
      activeMediaType = null;
      activeMediaIndex = 0;
      currentView = preserve => openProject(currentProject, preserve, activeProjectVersion);
      currentView(true);
      return;
    }
    const tab = event.target.closest('[data-media-tab]');
    if (tab) {
      activeMediaType = tab.dataset.mediaTab;
      activeMediaIndex = 0;
      refreshProjectMedia();
      return;
    }
    const step = event.target.closest('[data-media-step]');
    if (step) {
      const view = getProjectView(projectById.get(currentProject), activeProjectVersion);
      const count = (view?.project.media || []).filter(item => item.type === activeMediaType).length;
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

  function openProject(id, preserveScroll = false, requestedVersion = null) {
    const raw = projectById.get(id);
    if (!raw) return;
    const changingProject = currentProject !== id;
    if (!preserveScroll || changingProject) {
      activeMediaType = null;
      activeMediaIndex = 0;
    }
    if (raw.versions?.length) {
      const requestedExists = raw.versions.some(version => version.id === requestedVersion);
      if (requestedExists) activeProjectVersion = requestedVersion;
      else if (changingProject || !raw.versions.some(version => version.id === activeProjectVersion))
        activeProjectVersion = raw.defaultVersion || raw.versions[0].id;
    } else activeProjectVersion = null;
    currentProject = id;
    const view = getProjectView(raw, activeProjectVersion);
    const project = view.project;
    activeProjectVersion = view.versionId;
    const mediaTypes = ['image', 'video', 'gif'].filter(type => project.media?.some(item => item.type === type));
    if (!mediaTypes.includes(activeMediaType)) activeMediaType = mediaTypes[0] ?? null;
    const hasEmbeddedVideo = mediaTypes.includes('video');
    const projectDocuments =
      (project.showCurrentDesignSystem
        ? '<a class="button" href="./design-system.html" target="_blank" rel="noopener noreferrer">' +
          escapeHTML(t('currentDesignSystem')) + '</a>'
        : '') +
      (project.documents || []).map(key => {
        const rawDocument = documentList.find(item => item.key === key);
        const item = getLocalizedRecord('documentCard', key, rawDocument);
        return '<button class="button" type="button" data-document="' + escapeHTML(key) + '">' +
          escapeHTML(item.title) + ' ↗</button>';
      }).join('');
    const related = renderProjectLinks(project.relatedProjects);
    const links = projectDocuments +
      (project.video && !hasEmbeddedVideo ? '<a class="button" href="' + escapeHTML(project.video) +
        '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a>' : '') +
      (project.external ? '<a class="button" href="' + escapeHTML(project.external) +
        '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('onlineProduct')) + '</a>' : '');
    show({
      type: project.type,
      title: project.title,
      body: renderProjectVersionSwitch(project, activeProjectVersion) +
        '<div class="project-detail-meta">' + escapeHTML(project.year) + ' · ' +
        escapeHTML(project.stage) + '</div>' +
        renderProjectIntroduction(project) +
        renderProjectMedia(project, activeMediaType, activeMediaIndex) + renderProjectStory(project.detail) +
        (links ? '<section class="case-related"><h3>' + escapeHTML(t('relatedNebulaMaterials')) +
          '</h3><div class="actions">' + links + '</div></section>' : '') +
        (related ? '<section class="case-related"><h3>' + escapeHTML(t('relatedProjectsTitle')) +
          '</h3><div class="actions">' + related + '</div></section>' : '')
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
    const related = renderProjectLinks(article.relatedProjects);
    const relatedSection = related ? '<section class="case-related"><h3>' +
      escapeHTML(t('relatedArticleProjects')) + '</h3><div class="actions">' + related + '</div></section>' : '';
    show({ ...article, body: article.body + relatedSection }, index, preserveScroll);
  }

  return {
    openProject(id, versionId = null) {
      currentView = preserve => openProject(id, preserve, versionId);
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
      activeProjectVersion = null;
      controller.close();
    }
  };
}
