import { aboutI18n } from '../data/about-i18n.js';
// Scope the language switch to the About section.
export function initAboutI18n() {
  const section = document.getElementById('about');
  if (!section) return;
  const tabs = [...section.querySelectorAll('.lang-tab')];
  const nodes = [...section.querySelectorAll('[data-i18n]')];
  function setLanguage(lang) {
    const copy = aboutI18n[lang];
    if (!copy) return;
    nodes.forEach(node => {
      const value = copy[node.dataset.i18n];
      if (typeof value === 'string') node.textContent = value;
    });
    section.lang = lang === 'en' ? 'en' : 'zh-CN';
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.lang === lang)));
  }
  tabs.forEach(tab => tab.addEventListener('click', () => setLanguage(tab.dataset.lang)));
  setLanguage('zh');
}
