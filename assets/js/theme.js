import { themeRegistry, availableThemes } from './theme-registry.js';

const THEME_STORAGE_KEY = 'project-nebula-theme';
const DEFAULT_THEME = 'landscape';
let latestRequest = 0;
export const themes = themeRegistry;

function usableTheme(id) {
  const item = themes[id];
  return item && item.status === 'active' && typeof item.stylesheet === 'string' ? item : null;
}

function rememberTheme(id) {
  try { localStorage.setItem(THEME_STORAGE_KEY, id); } catch { /* Storage can be disabled. */ }
}

function activateTheme(item, persist) {
  const themeId = item.id;
  document.documentElement.dataset.theme = themeId;
  if (persist) rememberTheme(themeId);
}

// The stylesheet is loaded before the theme attribute changes to avoid a blank/flickering palette.
// Planned themes cannot be selected until their CSS and preview have been implemented.
export async function setTheme(themeId, { persist = true } = {}) {
  const selected = usableTheme(themeId);
  if (!selected) return false;
  const request = ++latestRequest;
  const current = document.getElementById('theme-stylesheet');
  if (!current) return false;
  const nextUrl = new URL(selected.stylesheet, document.baseURI).href;
  if (current.href === nextUrl) {
    activateTheme(selected, persist);
    return true;
  }

  const next = document.createElement('link');
  next.rel = 'stylesheet';
  next.href = nextUrl;
  next.dataset.themeId = selected.id;
  const loaded = new Promise(resolve => {
    next.onload = () => resolve(true);
    next.onerror = () => resolve(false);
  });
  current.insertAdjacentElement('afterend', next);
  const success = await loaded;
  if (!success || request !== latestRequest) {
    next.remove();
    return false;
  }
  current.remove();
  next.id = 'theme-stylesheet';
  activateTheme(selected, persist);
  return true;
}

export function initTheme() {
  let preferred = DEFAULT_THEME;
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (usableTheme(saved)) preferred = saved;
  } catch { /* Default to the completed theme. */ }

  // The default stylesheet is already linked in index.html, before the module executes.
  if (preferred === DEFAULT_THEME) activateTheme(themes[DEFAULT_THEME], false);
  else void setTheme(preferred, { persist: false }).then(success => {
    if (!success) activateTheme(themes[DEFAULT_THEME], false);
  });

  return {
    get current() { return document.documentElement.dataset.theme || DEFAULT_THEME; },
    get available() { return availableThemes(); },
    setTheme
  };
}
