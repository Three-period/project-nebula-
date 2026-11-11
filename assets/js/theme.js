const THEME_STORAGE_KEY = 'project-nebula-theme';

export const themes = Object.freeze({
  landscape: Object.freeze({
    id: 'landscape',
    name: '景观白绿',
    nameEn: 'Landscape White & Green',
    status: 'active'
  })
});

export function setTheme(themeId, { persist = true } = {}) {
  if (!Object.hasOwn(themes, themeId)) return false;

  document.documentElement.dataset.theme = themeId;
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // Theme selection remains available when browser storage is disabled.
    }
  }
  return true;
}

export function initTheme() {
  let preferred = 'landscape';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && Object.hasOwn(themes, stored)) preferred = stored;
  } catch {
    // The first-phase default theme is used when storage is unavailable.
  }
  setTheme(preferred, { persist: false });
  return {
    current: preferred,
    setTheme
  };
}
