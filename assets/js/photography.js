import { photographyThemes } from '../data/photography.js';
import { getLocalizedPhotographyTheme } from '../data/photography-i18n.js';
import { getCurrentLanguage, t } from './i18n.js';
import { escapeHTML } from './content.js';

const AUTO_INTERVAL_MS = 6000;
const SWIPE_MIN_PX = 48;

export function initPhotography({ onOpenTheme = () => {} } = {}) {
  const list = document.getElementById('photography-theme-list');
  const stage = document.getElementById('photography-stage');
  if (!list || !stage) return { setLanguage() {}, setVisible() {} };
  let selectedId = photographyThemes[0]?.id ?? null;
  let currentIndex = 0;
  let visible = false;
  let pointerInside = false;
  let focusInside = false;
  let userPaused = false;
  let timer = null;
  let pointerOrigin = null;
  let lastSwipeAt = 0;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function selectedTheme() {
    return getLocalizedPhotographyTheme(selectedId, getCurrentLanguage());
  }

  function clearAuto() {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  }

  function syncAuto() {
    clearAuto();
    const count = selectedTheme()?.photos?.length ?? 0;
    if (!visible || document.hidden || pointerInside || focusInside || userPaused ||
        motionQuery.matches || count < 2) return;
    timer = window.setInterval(() => {
      const photos = selectedTheme()?.photos ?? [];
      if (photos.length < 2) return;
      currentIndex = (currentIndex + 1) % photos.length;
      renderStage();
    }, AUTO_INTERVAL_MS);
  }

  function renderThemeCards() {
    list.innerHTML = photographyThemes.map(raw => {
      const theme = getLocalizedPhotographyTheme(raw.id, getCurrentLanguage());
      const active = selectedId === raw.id;
      return '<button type="button" class="photography-theme-card" data-photography-theme="' +
        escapeHTML(raw.id) + '" aria-pressed="' + String(active) +
        '" aria-label="' + escapeHTML(t('photographyOpenTheme') + ': ' + theme.title) +
        '"><span class="photography-theme-card-title">' + escapeHTML(theme.title) +
        '</span><span class="photography-theme-card-desc">' + escapeHTML(theme.description) +
        '</span><span class="photography-theme-card-count">' +
        String(theme.photos.length) + ' ' + escapeHTML(t('photographyPhotoCount')) +
        '</span></button>';
    }).join('');
  }

  function renderStage() {
    const theme = selectedTheme();
    if (!theme) return;
    const photos = theme.photos;
    currentIndex = photos.length ? ((currentIndex % photos.length) + photos.length) % photos.length : 0;
    const heading = '<div class="photography-preview-heading"><div><p class="eyebrow">' +
      escapeHTML(t('photographyPreviewLabel')) + '</p><h3>' + escapeHTML(theme.title) +
      '</h3></div><button type="button" class="button" data-action="open-photo-theme" data-photo-theme="' +
      escapeHTML(theme.id) + '">' + escapeHTML(t('photographyOpenTheme')) + '</button></div>';

    if (!photos.length) {
      stage.innerHTML = heading + '<div class="photography-empty"><span class="photography-empty-symbol" aria-hidden="true">◎</span>' +
        '<h4>' + escapeHTML(t('photographyEmptyHeading')) + '</h4><p>' +
        escapeHTML(t('photographyEmptyText')) + '</p><p class="photography-empty-detail">' +
        escapeHTML(t('photographyThemeEmpty')) + '</p></div>';
      return;
    }

    const photo = photos[currentIndex];
    const alt = photo.alt || photo.title;
    stage.innerHTML = heading +
      '<div class="photography-frame"><button type="button" class="photography-stage-open" data-action="open-photo" data-photo-theme="' +
      escapeHTML(theme.id) + '" data-photo-index="' + currentIndex +
      '" aria-label="' + escapeHTML(t('photographyOpenPhoto') + ': ' + photo.title) +
      '"><img src="' + escapeHTML(photo.src) + '" alt="' + escapeHTML(alt) +
      '" loading="lazy" decoding="async"></button></div>' +
      '<div class="photography-stage-caption"><span>' + escapeHTML(photo.title) +
      '</span><span>' + (currentIndex + 1) + ' / ' + photos.length + '</span></div>' +
      '<div class="photography-controls"><button type="button" class="button" data-photo-step="-1" ' +
      (photos.length < 2 ? 'disabled ' : '') + 'aria-label="' + escapeHTML(t('photographyPrev')) +
      '">← ' + escapeHTML(t('photographyPrev')) + '</button><button type="button" class="button" data-photo-step="1" ' +
      (photos.length < 2 ? 'disabled ' : '') + 'aria-label="' + escapeHTML(t('photographyNext')) +
      '">' + escapeHTML(t('photographyNext')) + ' →</button></div>';
  }

  function selectTheme(id, openDrawer = false) {
    if (!photographyThemes.some(item => item.id === id)) return;
    selectedId = id;
    currentIndex = 0;
    userPaused = openDrawer;
    renderThemeCards();
    renderStage();
    syncAuto();
    if (openDrawer) onOpenTheme(id);
  }

  function step(delta) {
    const photos = selectedTheme()?.photos ?? [];
    if (photos.length < 2) return;
    currentIndex = ((currentIndex + delta) % photos.length + photos.length) % photos.length;
    renderStage();
    userPaused = true;
    syncAuto();
  }

  list.addEventListener('click', event => {
    const button = event.target.closest('[data-photography-theme]');
    if (button) selectTheme(button.dataset.photographyTheme, true);
  });

  stage.addEventListener('click', event => {
    if (Date.now() - lastSwipeAt < 350) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const button = event.target.closest('[data-photo-step]');
    if (button) step(Number(button.dataset.photoStep));
    if (event.target.closest('[data-action="open-photo-theme"]')) {
      userPaused = true;
      syncAuto();
    }
  });

  stage.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    pointerOrigin = { x: event.clientX, y: event.clientY };
    userPaused = true;
    syncAuto();
  });
  stage.addEventListener('pointerup', event => {
    if (!pointerOrigin) return;
    const dx = event.clientX - pointerOrigin.x;
    const dy = event.clientY - pointerOrigin.y;
    pointerOrigin = null;
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
      lastSwipeAt = Date.now();
      step(dx < 0 ? 1 : -1);
    }
  });
  stage.addEventListener('pointercancel', () => { pointerOrigin = null; });
  stage.addEventListener('pointerenter', () => { pointerInside = true; syncAuto(); });
  stage.addEventListener('pointerleave', () => { pointerInside = false; syncAuto(); });
  stage.addEventListener('focusin', () => { focusInside = true; syncAuto(); });
  stage.addEventListener('focusout', event => {
    if (!stage.contains(event.relatedTarget)) { focusInside = false; syncAuto(); }
  });
  stage.addEventListener('click', event => {
    if (event.target.closest('[data-action="open-photo"]')) {
      userPaused = true;
      syncAuto();
    }
  });
  document.addEventListener('visibilitychange', syncAuto);
  motionQuery.addEventListener?.('change', syncAuto);

  renderThemeCards();
  renderStage();
  return {
    setLanguage() {
      renderThemeCards();
      renderStage();
      syncAuto();
    },
    setVisible(next) {
      visible = Boolean(next);
      syncAuto();
    }
  };
}
