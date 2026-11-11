import { documents } from '../data/documents.js';
import { workProjects } from '../data/work-projects.js';
import { personalProjects } from '../data/personal-projects.js';
import { createDialog } from './dialog.js';
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

  element.addEventListener('close', () => { current = null; });

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
