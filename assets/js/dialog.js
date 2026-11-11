// Native dialogs handle focus containment, Escape, backdrop dismissal and scroll restoration.
export function createDialog(element, initialFocus, { stack = false } = {}) {
  let opener;
  let scrollY = 0;
  let previousOverflow = '';
  let pointerStartedOutside = false;

  element.addEventListener('pointerdown', event => {
    const rect = element.getBoundingClientRect();
    pointerStartedOutside = event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  });

  element.addEventListener('click', event => {
    if (event.target === element && pointerStartedOutside) element.close();
    pointerStartedOutside = false;
  });

  element.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  });

  return {
    open() {
      if (element.open) return;
      // A viewer may stack above a drawer; ordinary drawers still replace other dialogs.
      if (!stack) document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      opener = document.activeElement;
      scrollY = window.scrollY;
      previousOverflow = document.body.style.overflow;
      element.showModal();
      document.body.style.overflow = 'hidden';
      initialFocus?.focus({ preventScroll: true });
    },
    close() {
      if (element.open) element.close();
    }
  };
}
