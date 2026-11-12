const VISIT_KEY = 'project-nebula-landscape-intro-seen';

export function initLandscapeIntro() {
  const element = document.getElementById('landscape-intro');
  if (!element) return { onHomeActivate() {} };
  let initialized = false;
  element.addEventListener('animationend', event => {
    if (event.animationName !== 'landscape-plants-in') return;
    element.classList.remove('is-playing');
    element.classList.add('is-ready');
  });

  function onHomeActivate() {
    if (initialized) return;
    initialized = true;
    let seen = false;
    try { seen = sessionStorage.getItem(VISIT_KEY) === '1'; }
    catch { /* Session storage may be disabled. */ }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reducedMotion) {
      element.classList.add('is-ready');
      return;
    }
    element.classList.add('is-playing');
    try { sessionStorage.setItem(VISIT_KEY, '1'); }
    catch { /* The animation remains a one-shot per page instance. */ }
  }

  return { onHomeActivate };
}
