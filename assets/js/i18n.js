import { siteI18n } from '../data/site-i18n.js';
import { projectI18n } from '../data/project-i18n.js';
import { documentI18n } from '../data/document-i18n.js';
import { articleI18n } from '../data/article-i18n.js';

let currentLanguage = 'zh';

export function getCurrentLanguage() {
  return currentLanguage;
}

export function t(key, language = currentLanguage) {
  return siteI18n.ui[language]?.[key] ?? siteI18n.ui.zh[key] ?? key;
}

export function getLocalizedRecord(kind, id, record, language = currentLanguage) {
  if (language !== 'en') return record;
  let translation;
  if (kind === 'project') translation = projectI18n[id];
  if (kind === 'documentCard') translation = documentI18n.cards[id];
  if (kind === 'document') translation = documentI18n.details[id];
  if (kind === 'article') translation = articleI18n[Number(id)];
  return translation ? { ...record, ...translation } : record;
}

export function initGlobalI18n(onChange = () => {}) {
  const buttons = [...document.querySelectorAll('[data-language]')];

  function setLanguage(language, persist = true) {
    if (!['zh', 'en'].includes(language)) return;
    currentLanguage = language;
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';

    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = t(node.dataset.i18n, language);
      if (value !== node.dataset.i18n) node.textContent = value;
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(node => {
      node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel, language));
    });

    const title = document.querySelector('[data-i18n-title]');
    if (title) document.title = t('pageTitle', language);
    const description = document.querySelector('[data-i18n-meta="pageDescription"]');
    if (description) description.setAttribute('content', t('pageDescription', language));

    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    if (persist) {
      try { localStorage.setItem('project-nebula-language', language); } catch { /* Storage may be unavailable. */ }
    }
    onChange(language);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  let initialLanguage = 'zh';
  try {
    const saved = localStorage.getItem('project-nebula-language');
    if (saved === 'en' || saved === 'zh') initialLanguage = saved;
  } catch { /* Default to Chinese when storage is unavailable. */ }
  setLanguage(initialLanguage, false);
  return setLanguage;
}
