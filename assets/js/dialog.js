// Native dialog handles focus containment and Escape; restore focus and reading position.
export function createDialog(element, initialFocus) {
  let opener;
  let scrollY = 0;
  let previousOverflow = '';
  let pointerStartedOutside = false;
  element.addEventListener('pointerdown', event => {
    const r = element.getBoundingClientRect();
    pointerStartedOutside = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
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
      // Keep one modal visible at a time. Dialog content is replaced, never nested.
      document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      opener = document.activeElement;
      scrollY = window.scrollY;
      previousOverflow = document.body.style.overflow;
      element.showModal();
      document.body.style.overflow = 'hidden';
      initialFocus?.focus({ preventScroll: true });
    },
    close() { element.close(); }
  };
}
