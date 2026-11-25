import { t } from './i18n.js';

const SIDEBAR_COLLAPSE_KEY = 'project-nebula-sidebar-collapsed';
const legacySections = new Map([
  ['singularity', 'about'],
  ['forge', 'projects'],
  ['construct', 'projects'],
  ['design', 'projects'],
  ['fusion', 'experience'],
  ['pulsar', 'insights'],
  ['gallery', 'photography']
]);

export function initNavigation({ onSectionChange }) {
  const root = document.documentElement;
  const sidebar = document.querySelector('.sidebar');
  const menu = document.getElementById('menu-toggle');
  const collapseToggle = document.getElementById('sidebar-collapse-toggle');
  const links = [...document.querySelectorAll('.toc-link')];
  const sections = new Map([...document.querySelectorAll('.resume-section')].map(section => [section.id, section]));

  function refreshLabels() {
    const collapsed = root.classList.contains('sidebar-is-collapsed');
    const label = t(collapsed ? 'sidebarExpandAria' : 'sidebarCollapseAria');
    collapseToggle.setAttribute('aria-label', label);
    collapseToggle.title = label;
    collapseToggle.setAttribute('aria-expanded', String(!collapsed));
  }

  let initiallyCollapsed = false;
  try {
    initiallyCollapsed = localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === '1';
  } catch {
    // Storage may be unavailable.
  }
  root.classList.toggle('sidebar-is-collapsed', initiallyCollapsed);
  refreshLabels();
  collapseToggle.addEventListener('click', () => {
    const collapsed = root.classList.toggle('sidebar-is-collapsed');
    refreshLabels();
    try {
      localStorage.setItem(SIDEBAR_COLLAPSE_KEY, collapsed ? '1' : '0');
    } catch {
      // The control still works for the current page.
    }
  });

  function collapseMenu() {
    sidebar.classList.remove('is-expanded');
    menu.setAttribute('aria-expanded', 'false');
  }

  menu.addEventListener('click', () => {
    const expanded = sidebar.classList.toggle('is-expanded');
    menu.setAttribute('aria-expanded', String(expanded));
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !sidebar.classList.contains('is-expanded')) return;
    collapseMenu();
    menu.focus();
  });
  document.addEventListener('pointerdown', event => {
    if (sidebar.classList.contains('is-expanded') && !sidebar.contains(event.target) && !menu.contains(event.target)) {
      collapseMenu();
    }
  });

  function activate(rawId, resetScroll = true) {
    const id = legacySections.get(rawId) ?? rawId;
    const next = sections.get(id) ?? sections.values().next().value;
    for (const section of sections.values()) section.hidden = section !== next;
    for (const link of links) {
      if (link.hash === '#' + next.id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    collapseMenu();
    onSectionChange(next.id);
    if (resetScroll) window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function go(id) {
    history.pushState(null, '', '#' + id);
    activate(id);
  }

  function currentSectionId() {
    return location.hash.replace(/^#(?:view-)?/, '') || 'about';
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.hash.slice(1);
    if (sections.has(id) || legacySections.has(id)) {
      event.preventDefault();
      go(id);
    } else {
      collapseMenu();
    }
  });
  window.addEventListener('popstate', () => activate(currentSectionId()));

  return { go, collapseMenu, refreshLabels, start: () => activate(currentSectionId(), false) };
}
