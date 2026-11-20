(() => {
  const storageKey = 'project-nebula-color-mode';
  const root = document.documentElement;

  // Restore the palette before the first render.
  try {
    if (localStorage.getItem(storageKey) === 'dark') root.dataset.colorMode = 'dark';
  } catch {
    // The toggle still works for the current page if storage is unavailable.
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('color-mode-toggle');
    toggle.setAttribute('aria-pressed', String(root.dataset.colorMode === 'dark'));
    toggle.addEventListener('click', () => {
      const dark = root.dataset.colorMode !== 'dark';
      root.dataset.colorMode = dark ? 'dark' : 'light';
      toggle.setAttribute('aria-pressed', String(dark));
      try {
        localStorage.setItem(storageKey, root.dataset.colorMode);
      } catch {
        // Keep the selected appearance for the current page.
      }
    });
  });
})();
