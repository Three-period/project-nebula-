import { documents } from '../data/documents.js';
import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { createDialog } from './dialog.js';
import { getLocalizedPhotographyTheme } from '../data/photography-i18n.js';
import { escapeHTML } from './content.js';
import { getLocalizedRecord, getCurrentLanguage, t } from './i18n.js';

const projectMap = new Map([...workProjects, ...personalProjects].map(project => [project.id, project]));

function mediaCopy(item, field) {
  const language = getCurrentLanguage();
  return language === 'en' ? (item[field + 'En'] || item[field] || '') : (item[field] || '');
}

export function initViewer() {
  const element = document.getElementById('viewer-dialog');
  const closeButton = element.querySelector('[data-action="close-viewer"]');
  const controller = createDialog(element, closeButton, { stack: true });
  const type = document.getElementById('viewer-type');
  const title = document.getElementById('viewer-title');
  const body = document.getElementById('viewer-body');
  let current = null;

  function render() {
    if (!current) return;

    if (current.kind === 'document') {
      const item = getLocalizedRecord('document', current.key, documents[current.key]);
      type.textContent = t('documentViewerType');
      title.textContent = item.title;
      body.innerHTML = '<article class="viewer-document">' + (item.body || '') + '</article>';
      body.querySelectorAll('a[target="_blank"]').forEach(link => { link.rel = 'noopener noreferrer'; });
      return;
    }

    if (current.kind === 'media') {
      const raw = projectMap.get(current.projectId);
      const project = getLocalizedRecord('project', current.projectId, raw);
      const item = raw?.media?.[current.mediaIndex];
      if (!item) return;
      const mediaTitle = mediaCopy(item, 'title') || project.title;
      const alt = mediaCopy(item, 'alt') || mediaTitle;
      type.textContent = t('mediaViewerType');
      title.textContent = mediaTitle;

      if (item.type === 'image' || item.type === 'gif') {
        body.innerHTML = '<figure class="viewer-media-figure"><img class="viewer-media-image" src="' +
          escapeHTML(item.src) + '" alt="' + escapeHTML(alt) + '"><figcaption>' +
          escapeHTML(mediaTitle) + '</figcaption></figure>';
      } else if (item.type === 'video' && item.embedUrl) {
        body.innerHTML = '<div class="viewer-video-frame"><iframe src="' + escapeHTML(item.embedUrl) +
          '" title="' + escapeHTML(mediaTitle) +
          '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>' +
          '<p class="viewer-fallback"><a href="' + escapeHTML(item.src) +
          '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a></p>';
      } else if (item.type === 'video' && item.src) {
        body.innerHTML = '<p><a class="button" href="' + escapeHTML(item.src) +
          '" target="_blank" rel="noopener noreferrer">' + escapeHTML(t('demoVideo')) + '</a></p>';
      }
      return;
    }

    if (current.kind === 'photography') {
      const theme = getLocalizedPhotographyTheme(current.themeId, getCurrentLanguage());
      const photos = theme?.photos ?? [];
      if (!photos.length) return;
      current.index = ((current.index % photos.length) + photos.length) % photos.length;
      const photo = photos[current.index];
      type.textContent = t('photographyViewerType');
      title.textContent = photo.title;
      body.innerHTML = '<figure class="viewer-media-figure photography-viewer-figure">' +
        '<img class="viewer-media-image" src="' + escapeHTML(photo.src) + '" alt="' +
        escapeHTML(photo.alt || photo.title) + '">' +
        '<figcaption>' + escapeHTML(photo.description || photo.title) +
        '</figcaption></figure>' +
        '<nav class="photography-viewer-controls" aria-label="' +
        escapeHTML(t('photographyPreviewLabel')) + '">' +
        '<button type="button" class="button" data-action="photo-viewer-prev" ' +
        (photos.length < 2 ? 'disabled ' : '') + 'aria-label="' +
        escapeHTML(t('photographyPrev')) + '">← ' + escapeHTML(t('photographyPrev')) +
        '</button><span>' + (current.index + 1) + ' / ' + photos.length +
        '</span><button type="button" class="button" data-action="photo-viewer-next" ' +
        (photos.length < 2 ? 'disabled ' : '') + 'aria-label="' +
        escapeHTML(t('photographyNext')) + '">' + escapeHTML(t('photographyNext')) +
        ' →</button></nav>';
      return;
    }

    if (current.kind === 'pdf') {
      type.textContent = t('pdfViewerType');
      title.textContent = current.title || t('resumePdfTitle');
      body.innerHTML = '<iframe class="viewer-pdf-frame" src="' + escapeHTML(current.src) +
        '#view=FitH" title="' + escapeHTML(title.textContent) +
        '" loading="lazy"></iframe><p class="viewer-fallback"><a href="' +
        escapeHTML(current.src) + '" download>' + escapeHTML(t('downloadPdf')) + '</a></p>';
    }
  }

  function open(next) {
    current = next;
    render();
    controller.open();
  }

  function stepPhotography(delta) {
    if (current?.kind !== 'photography') return;
    const theme = getLocalizedPhotographyTheme(current.themeId, getCurrentLanguage());
    if (!theme || theme.photos.length < 2) return;
    const focusAction = document.activeElement?.dataset?.action;
    current.index = (current.index + delta + theme.photos.length) % theme.photos.length;
    render();
    if (focusAction === 'photo-viewer-prev' || focusAction === 'photo-viewer-next') {
      body.querySelector('[data-action="' + focusAction + '"]')?.focus({ preventScroll: true });
    }
  }

  let touchStart = null;
  body.addEventListener('pointerdown', event => {
    if (current?.kind === 'photography' && event.pointerType === 'touch')
      touchStart = { x: event.clientX, y: event.clientY };
  });
  body.addEventListener('pointerup', event => {
    if (!touchStart || current?.kind !== 'photography') return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2)
      stepPhotography(dx < 0 ? 1 : -1);
  });
  body.addEventListener('pointercancel', () => { touchStart = null; });
  element.addEventListener('keydown', event => {
    if (current?.kind !== 'photography' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    stepPhotography(event.key === 'ArrowRight' ? 1 : -1);
  });
  element.addEventListener('close', () => { current = null; touchStart = null; body.innerHTML = ''; });

  return {
    openDocument(key) {
      if (!documents[key]) return;
      open({ kind: 'document', key });
    },
    openMedia(projectId, mediaIndex) {
      const project = projectMap.get(projectId);
      if (!project?.media?.[mediaIndex]) return;
      open({ kind: 'media', projectId, mediaIndex });
    },
    openPhotography(themeId, index = 0) {
      const theme = getLocalizedPhotographyTheme(themeId, getCurrentLanguage());
      if (!theme || !theme.photos[Number(index)]) return;
      open({ kind: 'photography', themeId, index: Number(index) });
    },
    stepPhotography,
    openPdf(src, titleText = '') {
      if (typeof src !== 'string' || !src.startsWith('/public/') || !src.toLowerCase().endsWith('.pdf')) return;
      open({ kind: 'pdf', src, title: titleText });
    },
    setLanguage() {
      if (current) render();
    },
    close() {
      controller.close();
    }
  };
}
