import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { projects } from '../assets/data/projects.js';
import { workProjects } from '../assets/data/work-projects.js';
import { personalProjects } from '../assets/data/personal-projects.js';
import { capabilityGroups } from '../assets/data/capabilities.js';
import { photographyThemes } from '../assets/data/photography.js';
import { photographyI18n, getLocalizedPhotographyTheme } from '../assets/data/photography-i18n.js';
import { themeRegistry, availableThemes } from '../assets/js/theme-registry.js';
import { documents } from '../assets/data/documents.js';
import { articles } from '../assets/data/articles.js';
import { documentList } from '../assets/data/document-list.js';
import { siteI18n } from '../assets/data/site-i18n.js';
import { projectI18n } from '../assets/data/project-i18n.js';
import { documentI18n } from '../assets/data/document-i18n.js';
import { articleI18n } from '../assets/data/article-i18n.js';
import { readCozeStream } from '../assets/js/agent.js';
import { buildSearchIndex, searchEntries } from '../assets/data/search-index.js';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = [];
async function walk(dir) { for (const entry of await readdir(dir, { withFileTypes: true })) { const path = resolve(dir, entry.name); if (entry.isDirectory()) await walk(path); else files.push(path); } }
await walk(root);
for (const file of files.filter(f => /\.(js|mjs)$/.test(f))) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const source = await readFile(file, 'utf8');
  // Resolve only static import/export statements, not quoted test assertions.
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:import|export)\s+.*?\s+from\s+['"]([^'"]+)['"]/);
    if (match?.[1]?.startsWith('.')) await readFile(resolve(dirname(file), match[1]));
  }
}
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const mainSource = await readFile(resolve(root, 'assets/js/main.js'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
assert(!/\son\w+=/i.test(html), 'No inline handlers');
for (const id of ['about', 'projects', 'experience', 'insights', 'contact', 'work-project-list', 'personal-project-list', 'document-list', 'article-list', 'capability-grid', 'photography', 'photography-theme-list', 'photography-stage', 'landscape-intro']) assert(ids.includes(id));
for (const match of html.matchAll(/(?:href|src)="(assets\/[^"#]+)"/g)) await readFile(resolve(root, match[1]));
assert.equal(projects.length, 5);
assert.equal(workProjects.length, 5);
assert.equal(personalProjects.length, 2);
assert.equal(projects.filter(p => p.visibility === 'draft').length, 3);
assert(!html.includes('id="sae-input"'));
assert(!html.includes('id="design"'));
assert(files.some(file => file.endsWith('/nebula-orbits-v2.svg')), 'Legacy orbit SVG must be preserved without being reintroduced into the default page');
const agentClient = await readFile(resolve(root, 'assets/js/agent.js'), 'utf8');
assert(!agentClient.includes("fetch('/api/chat'"), 'Agent maintenance mode must not fetch');
assert.equal(articles.length, 6);
for (const project of [...projects, ...workProjects, ...personalProjects]) if (project.document) assert(documents[project.document]);
for (const item of documentList) assert(documents[item.key]);
for (const item of Object.values(documents)) assert(!/\son\w+=/i.test(item.body));
// Streaming integration: UTF-8 splits, CRLF, final event, and service errors.
const encoder = new TextEncoder();
function streamResponse(text) {
  const bytes = encoder.encode(text);
  return new Response(new ReadableStream({ start(controller) { for (let i = 0; i < bytes.length; i += 3) controller.enqueue(bytes.slice(i, i + 3)); controller.close(); } }));
}
const updates = [];
const answer = await readCozeStream(streamResponse('event: conversation.message.delta\r\ndata: {"content":"你好"}\r\n\r\nevent: conversation.message.delta\ndata: {"content":"，世界"}'), value => updates.push(value));
assert.equal(answer, '你好，世界');
assert.equal(updates.length, 2);
await assert.rejects(() => readCozeStream(new Response('failure', { status: 502 }), () => {}));
await assert.rejects(() => readCozeStream(streamResponse('event: conversation.chat.failed\ndata: {}\n\n'), () => {}));

// V1.1 regression checks: photo removal, global language coverage and stored translations.
const translationKeys = [...html.matchAll(/\bdata-i18n="([^"]+)"/g)].map(match => match[1]);
assert(translationKeys.length > 0, 'Site-wide interface translations must be present');
for (const language of ['zh', 'en']) {
  for (const key of translationKeys) assert.equal(typeof siteI18n.ui[language][key], 'string', 'Missing ' + language + ' interface copy: ' + key);
}
assert(html.includes('data-language="zh"') && html.includes('data-language="en"'), 'Global language controls are required');
assert(!html.includes('heying-photo.jpg') && !html.includes('about-language-switch'), 'Profile photo and About-only language switch must be removed');
assert(!html.includes('class="cosmic-orbits"'), 'Obsolete cosmic illustration markup must be removed');
assert(html.includes('global-language-switch'), 'Global language switch must be in the navigation');
assert(html.includes('independent-project-resources'), 'Independent Nebula resources must be linked');
assert(html.indexOf('2026.04 — 至今') < html.indexOf('2026.01 — 至今') && html.indexOf('2026.01 — 至今') < html.indexOf('2024.07'), 'Experience order');
assert.equal(personalProjects.find(project => project.id === 'personal-nebula').year, '2026.01—至今');
assert(articles.every(article => !article.sample && !article.body.includes('这是示范性内容')), 'Insights are original articles');
assert.equal(Object.keys(projectI18n).length, workProjects.length + personalProjects.length, 'Every project needs stored English copy');
for (const project of [...workProjects, ...personalProjects]) {
  const translated = projectI18n[project.id];
  assert(translated && translated.title && translated.description && translated.stage && translated.body && translated.tags?.length, 'Incomplete project translation: ' + project.id);
}
assert.equal(Object.keys(documentI18n.cards).length, documentList.length, 'Every document card needs English copy');
assert.equal(Object.keys(documentI18n.details).length, Object.keys(documents).length, 'Every document detail needs English copy');
for (const [key, document] of Object.entries(documents)) assert(documentI18n.details[key]?.body && documentI18n.details[key]?.title, 'Incomplete document translation: ' + key);
assert.equal(articleI18n.length, articles.length, 'Every article needs English copy');
for (const [index, article] of articles.entries()) assert(articleI18n[index]?.body && articleI18n[index]?.title && articleI18n[index]?.summary, 'Incomplete article translation: ' + index);
const styleFiles = await Promise.all([
  'base.css', 'layout.css', 'components.css', 'responsive.css'
].map(file => readFile(resolve(root, 'assets/css', file), 'utf8')));
const style = styleFiles.join('\n');
const themeStyle = await readFile(resolve(root, 'assets/css/themes/landscape.css'), 'utf8');
const tokens = await readFile(resolve(root, 'assets/css/tokens.css'), 'utf8');
assert(style.includes('grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr)'), 'Profile columns must use a balanced responsive grid');
assert(style.includes('backdrop-filter: blur(var(--surface-blur))') && style.includes('box-shadow: var(--card-shadow-rest)') && themeStyle.includes('--card-shadow-hover:'), 'Landscape cards need frosted glass and layered architectural shadows');
assert(style.includes('@media (max-width: 1100px)') && style.includes('@media (max-width: 960px)') && style.includes('@media (max-width: 760px)') && style.includes('@media (max-width: 560px)'), 'Desktop, tablet and mobile breakpoints must be explicit');
assert(style.includes('global-language-switch') && style.includes('prefers-reduced-motion') && style.includes('100dvh'), 'Global language, reduced motion and dynamic viewport support');
assert(!style.includes('cosmic-orbit') && !style.includes('body::after') && !style.includes('rgba(178, 153, 93'), 'Legacy cosmic and parchment visuals must be removed');
assert(!style.includes('singu-photo') && !style.includes('about-language-switch'), 'Obsolete photo/language styles must be removed');
assert(!html.includes('class="cosmic-orbits"') && !mainSource.includes('is-orbiting'), 'Unused cosmic illustration and animation trigger must be removed');
assert(themeStyle.includes(':root[data-theme="landscape"]') && themeStyle.includes('--color-primary: #285C43'), 'Landscape palette must be isolated in its theme file');
assert(!tokens.includes('--color-primary:') && !tokens.includes('--paper:') && !tokens.includes('--ochre:'), 'Shared tokens must not contain theme palette or legacy aliases');
assert(!files.some(file => file.endsWith('/heying-photo') || file.endsWith('/heying-photo.jpg')), 'Personal photo asset and empty placeholder must be deleted');
const themeSource = await readFile(resolve(root, 'assets/js/theme.js'), 'utf8');
assert(themeSource.includes("landscape") && /document\.documentElement\.dataset\.theme\s*=\s*themeId/.test(themeSource), 'Landscape theme registry must initialize through the document theme attribute');
for (const token of ['--font-body:', '--sidebar-width:', '--surface-blur:', '--ease:']) assert(tokens.includes(token), 'Missing shared design token: ' + token);
for (const token of ['--color-page:', '--color-primary:', '--color-mist:', '--shadow-contact:', '--shadow-spatial:']) assert(themeStyle.includes(token), 'Missing landscape design token: ' + token);
assert(html.includes('data-theme="landscape"'), 'Landscape must be the default theme');

const viewerSource = await readFile(resolve(root, 'assets/js/viewer.js'), 'utf8');
const drawerSource = await readFile(resolve(root, 'assets/js/drawer.js'), 'utf8');
const dialogSource = await readFile(resolve(root, 'assets/js/dialog.js'), 'utf8');
const mediaProject = personalProjects.find(project => project.id === 'personal-nebula');
assert(mediaProject?.cover && mediaProject.media?.length, 'Project Nebula needs a real cover and media collection');
assert(mediaProject.media.some(item => item.type === 'image') && mediaProject.media.some(item => item.type === 'video'), 'Project Nebula image and video tabs must be available');
for (const item of mediaProject.media) {
  assert(['image', 'video', 'gif'].includes(item.type), 'Unsupported project media type: ' + item.type);
  assert(item.src && item.title && item.alt, 'Every media item needs a source, title, and accessible description');
  if (item.type === 'image' || item.type === 'gif') {
    const assetPath = resolve(root, item.src.startsWith('/') ? item.src.slice(1) : item.src);
    await readFile(assetPath);
  }
}
assert(html.includes('id="viewer-dialog"') && html.includes('data-action="preview-pdf"'), 'The tertiary viewer and PDF preview entry must exist');
assert(files.some(file => file.endsWith('/public/images/heying-cqu-AI-PM.pdf')), 'The referenced resume PDF must exist');
assert(mainSource.includes("from './viewer.js'") && mainSource.includes("viewer.setLanguage(language)"), 'Viewer must initialize and follow global language changes');
assert(drawerSource.includes('data-action="open-document-full"') && drawerSource.includes('renderProjectMedia'), 'Document summaries and project media must be available in drawers');
assert(viewerSource.includes("kind: 'document'") && viewerSource.includes("kind: 'media'") && viewerSource.includes("kind: 'pdf'"), 'Viewer must support full documents, project media, and PDFs');
assert(dialogSource.includes('stack = false') && dialogSource.includes('if (!stack)'), 'The viewer must stack above a drawer without closing it');
for (const key of ['previewResume', 'documentOverview', 'readFullDocument', 'mediaImages', 'mediaVideo', 'mediaGif', 'viewMediaFull', 'pdfViewerType']) {
  for (const language of ['zh', 'en']) assert.equal(typeof siteI18n.ui[language][key], 'string', 'Missing viewer translation: ' + language + '/' + key);
}


const capabilitySource = await readFile(resolve(root, 'assets/js/content.js'), 'utf8');
const designSystem = await readFile(resolve(root, 'design-system.html'), 'utf8');
const readme = await readFile(resolve(root, 'README.md'), 'utf8');
const projectIds = new Set([...workProjects, ...personalProjects].map(project => project.id));
assert.equal(capabilityGroups.length, 4, 'The capability map must contain four domains');
for (const group of capabilityGroups) {
  assert(group.id && group.number && group.titleKey && group.descriptionKey && group.skillsKey, 'Capability domain metadata is required');
  assert(group.evidence.length > 0, 'Every capability domain needs project evidence: ' + group.id);
  for (const id of group.evidence) assert(projectIds.has(id), 'Unknown capability evidence project: ' + id);
  for (const language of ['zh', 'en']) {
    for (const key of [group.titleKey, group.descriptionKey, group.skillsKey]) {
      assert.equal(typeof siteI18n.ui[language][key], 'string', 'Missing capability copy: ' + language + '/' + key);
    }
  }
}
for (const key of ['capabilitiesEyebrow', 'capabilitiesTitle', 'capabilitiesLead', 'capabilityEvidenceLabel', 'capabilityOpenEvidence']) {
  for (const language of ['zh', 'en']) assert.equal(typeof siteI18n.ui[language][key], 'string', 'Missing capability interface copy: ' + language + '/' + key);
}
assert(html.includes('<section class="capability-section"') && capabilitySource.includes('renderCapabilities(language)'), 'The evidence-linked capability map must render inside Projects');
assert(capabilitySource.includes('data-project="') && capabilitySource.includes('project.stage'), 'Capability evidence must open existing project records and show their actual status');
assert.equal((styleFiles[3].match(/\.viewer-dialog \{/g) || []).length, 1, 'Viewer mobile rules must not be duplicated');
assert(drawerSource.includes("event.key === 'ArrowRight'") && drawerSource.includes("event.key === 'ArrowLeft'") && drawerSource.includes("event.key === 'Home'") && drawerSource.includes("event.key === 'End'"), 'Media tabs must support keyboard navigation');
assert(drawerSource.includes('tabindex="') && drawerSource.includes('role="tabpanel"'), 'Media tabs need roving focus and an associated panel');
for (const token of ['--control-height: 40px;', '--control-height-compact: 36px;']) assert(tokens.includes(token), 'Missing control dimension token: ' + token);
assert(style.includes('min-height: var(--control-height)') && style.includes('min-height: var(--control-height-compact)'), 'Controls must consume shared height tokens');
assert(designSystem.includes('COLOR TOKENS') && designSystem.includes('TYPOGRAPHY') && designSystem.includes('COMPONENTS') && designSystem.includes('LAYOUT & RESPONSIVE'), 'The active design system must document real swatches, type, components, and layout');
assert(designSystem.includes('#285C43') && designSystem.includes('13.03:1') && designSystem.includes('7.77:1'), 'The design system must record the active palette and measured contrast');
assert(designSystem.includes('SECTION TITLE · 28–34px') && designSystem.includes('BODY · 16px / 1.75') && designSystem.includes('CARD SUMMARY · 13px'), 'The design system must document the current implemented typography hierarchy');

assert(styleFiles[2].includes('width: min(var(--modal-width), calc(100vw - 48px))'), 'The tertiary viewer must consume the shared modal-width token');





assert(designSystem.includes('METADATA · 10px') && designSystem.includes('CARD SUMMARY · 13px') && designSystem.includes('BODY · 16px / 1.75'), 'The active type scale must distinguish micro-metadata from readable supporting copy');
assert(style.includes('.button:disabled:hover') && style.includes('.media-tab:hover:not([aria-selected="true"])'), 'Disabled and inactive component states must be defined');


assert(!readme.includes('其他板块保留中文'), 'README must not contradict site-wide bilingual implementation');


/* Landscape Phase 1 completion: 5 sections, photography structure, theme scope and opening animation. */
const photoUI = await readFile(resolve(root, 'assets/js/photography.js'), 'utf8');
const photoDrawer = await readFile(resolve(root, 'assets/js/drawer.js'), 'utf8');
const photoViewer = await readFile(resolve(root, 'assets/js/viewer.js'), 'utf8');
const photoIntro = await readFile(resolve(root, 'assets/js/landscape-intro.js'), 'utf8');
const registrySrc = await readFile(resolve(root, 'assets/js/theme-registry.js'), 'utf8');
assert.equal([...html.matchAll(/class="toc-link"/g)].length, 5, 'Exactly five major navigation links');
assert.equal([...html.matchAll(/class="toc-icon"/g)].length, 5, 'Five navigation icons must use a consistent line SVG language');
for (const page of ['about', 'experience', 'projects', 'insights', 'photography'])
  assert(html.includes('id="' + page + '"'), 'Missing page: ' + page);
assert(html.includes('href="#photography"') && html.includes('data-i18n="photographyNav"'), 'Photography page must be navigable and translated');
assert(mainSource.includes("photography.setVisible(next.id==='photography')"), 'The carousel must pause outside its page');
assert(mainSource.includes('landscapeIntro.onHomeActivate()'), 'Home activation must trigger opening motion');
assert(html.includes('id="theme-stylesheet"'), 'An identifiable active theme stylesheet is required');
assert.equal(photographyThemes.length, 5, 'Five approved color photography series');
assert.deepEqual(photographyThemes.map(x => [x.id, x.photos.length, x.photos[0]?.id]), [
  ['verdant', 10, 'p34'], ['azure', 14, 'p14'], ['amber', 9, 'p07'],
  ['chroma', 6, 'p29'], ['earth', 6, 'p39']
], 'Photo series and first-image covers must follow the confirmed classification');
const names = new Set();
const photoIds = new Set();
for (const theme of photographyThemes) {
  assert(!names.has(theme.id), 'Duplicated photography theme: ' + theme.id);
  names.add(theme.id);
  const relative = 'public/images/photography/' + theme.folder + '/README.md';
  await readFile(resolve(root, relative), 'utf8');
  for (const language of ['zh', 'en']) {
    const translated = getLocalizedPhotographyTheme(theme.id, language);
    assert(translated?.title && translated.description, 'Missing photography category translation: ' + theme.id + '/' + language);
    assert(photographyI18n[language]?.themes[theme.id], 'Missing photography theme i18n entry');
  }
  for (const photo of theme.photos) {
    assert(photo.id && photo.title && photo.alt, 'Photography metadata is incomplete: ' + photo.id);
    assert(!photoIds.has(photo.id), 'Duplicate photo ID: ' + photo.id);
    photoIds.add(photo.id);
    assert(photo.src.startsWith('/public/images/photography/' + theme.folder + '/'), 'Photo must reside in its own directory: ' + photo.src);
    await readFile(resolve(root, photo.src.slice(1)));
    const translation = photographyI18n.en.photos[photo.id];
    assert(translation?.title && translation.alt, 'Published photo needs a confirmed English caption: ' + photo.id);
  }
}
assert.equal(photoIds.size, 45, 'All 45 approved photographs must appear exactly once');
assert.equal(Object.keys(photographyI18n.en.photos).length, 45, 'All published photos need English metadata');
const sourceMap = JSON.parse(await readFile(resolve(root, 'assets/data/photography-source-map.json'), 'utf8'));
assert.equal(sourceMap.photos.length, 45, 'Keep a complete source-to-WebP audit map');
for (const theme of photographyThemes) for (const photo of theme.photos) {
  const raw = await readFile(resolve(root, photo.src.slice(1)));
  assert.equal(raw.toString('ascii', 0, 4), 'RIFF', 'WebP asset must be a RIFF file: ' + photo.id);
  assert.equal(raw.toString('ascii', 8, 12), 'WEBP', 'WebP asset must be correctly encoded: ' + photo.id);
}
await readFile(resolve(root, 'public/images/photography/README.md'));
const visibleThemes = availableThemes();
assert.deepEqual(visibleThemes.map(theme=>theme.id).sort(),['cosmic','landscape'], 'Landscape and completed Cosmic must both be selectable');
assert.equal(Object.keys(themeRegistry).length, 4, 'All four future theme IDs must be reserved');
for (const item of Object.values(themeRegistry)) {
  assert(['active','planned'].includes(item.status), 'Invalid theme status');
  if (item.status === 'planned') assert.equal(item.stylesheet, null, 'Deferred themes must not load CSS');
}
assert(registrySrc.includes('stylesheet: null') && themeSource.includes('next.onerror') && themeSource.includes('next.remove()') && themeSource.includes('request !== latestRequest'), 'Theme loader must support load failure and out-of-order response rollback');
assert(photoUI.includes('AUTO_INTERVAL_MS = 6000') && photoUI.includes('motionQuery.matches') &&
  photoUI.includes('document.hidden') && photoUI.includes('pointerenter') && photoUI.includes('pointerup'),
  'Photography carousel must support motion preferences, visibility, pause and touch navigation');
assert(photoDrawer.includes('openPhotographyTheme') && photoDrawer.includes('photography-drawer-item'), 'Photography needs a second-level drawer');
assert(photoViewer.includes("current.kind === 'photography'") && photoViewer.includes('stepPhotography') &&
  photoViewer.includes('pointerup') && photoViewer.includes("ArrowRight"), 'Photography needs a third-level accessible viewer');
assert(html.includes('class="landscape-intro"') && themeStyle.includes('@keyframes landscape-grid-in') &&
  themeStyle.includes('@keyframes landscape-lines-draw') && themeStyle.includes('@keyframes landscape-plants-in'),
  'Opening animation must include grid, building, and plants');
assert(themeStyle.includes('.55s .75s') && themeStyle.includes('@media (prefers-reduced-motion: reduce)'), 'Opening animation should last ~1.3 seconds and reduce motion');
assert(photoIntro.includes('sessionStorage') && photoIntro.includes("prefers-reduced-motion"), 'Intro must play once per session with a static fallback');
for (const key of ['photographyNav', 'photographyEyebrow', 'photographyTitle', 'photographyLead',
  'photographyThemesLabel', 'photographyPreviewLabel', 'photographyEmptyHeading', 'photographyEmptyText',
  'photographyOpenPhoto', 'photographyOpenTheme', 'photographyPrev', 'photographyNext',
  'photographyViewerType', 'photographyDrawerType']) {
  for (const language of ['zh','en'])
    assert.equal(typeof siteI18n.ui[language][key], 'string', 'Missing photography translation: ' + language + '/' + key);
}
// Exercise bilingual photo metadata in memory; do not publish test images or fake gallery items.
const demo = { id: 'validation-only-photo', src: '/public/images/photography/nature/test-only.webp', title: '示例标题', alt: '虚拟测试描述' };
photographyThemes[0].photos.push(demo);
photographyI18n.en.photos[demo.id] = { title: 'Test caption', alt: 'Temporary validation image' };
try {
  const localized = getLocalizedPhotographyTheme('nature', 'en');
  assert.equal(localized.photos.at(-1).title, 'Test caption');
  assert.equal(localized.photos.at(-1).alt, 'Temporary validation image');
} finally {
  photographyThemes[0].photos.pop();
  delete photographyI18n.en.photos[demo.id];
}
// DOM-independent theme manager regression: planned themes must never switch the live palette.
const themeAPI = await import('../assets/js/theme.js');
const originalDocument = globalThis.document;
const originalLocalStorage = globalThis.localStorage;
try {
  const baseURL = 'https://example.test/';
  let activeLink;
  const attach = next => { activeLink = next; queueMicrotask(() => next.onload?.()); };
  const fakeLink = { href: baseURL + 'assets/css/themes/landscape.css',
    insertAdjacentElement: (_position, next) => attach(next), remove() {} };
  activeLink = fakeLink;
  globalThis.document = {
    baseURI: baseURL,
    documentElement: { dataset: { theme: 'landscape' } },
    getElementById: id => id === 'theme-stylesheet' ? activeLink : null,
    createElement: tag => {
      assert.equal(tag,'link');
      return { dataset: {}, remove() {}, insertAdjacentElement: (_position,next) => attach(next) };
    }
  };
  globalThis.localStorage = { getItem: () => 'littlePrince', setItem: () => {} };
  assert.equal((await themeAPI.setTheme('littlePrince')), false, 'An incomplete theme must not activate');
  assert.equal(globalThis.document.documentElement.dataset.theme, 'landscape');
  assert.equal((await themeAPI.setTheme('cosmic')), true, 'Completed Cosmic stylesheet must load');
  assert.equal(globalThis.document.documentElement.dataset.theme, 'cosmic');
  assert(activeLink.href.endsWith('assets/css/themes/cosmic.css'), 'Active CSS must match Cosmic');
  assert.equal((await themeAPI.setTheme('landscape')), true, 'Switching back to Landscape must work');
  assert.equal(globalThis.document.documentElement.dataset.theme, 'landscape');
  assert.equal(themeAPI.initTheme().current, 'landscape', 'Stored planned themes must fall back');
} finally {
  if (originalDocument === undefined) delete globalThis.document;
  else globalThis.document = originalDocument;
  if (originalLocalStorage === undefined) delete globalThis.localStorage;
  else globalThis.localStorage = originalLocalStorage;
}

const phaseAudit = await readFile(resolve(root, 'docs/phase-audit.md'), 'utf8');
const checklist = await readFile(resolve(root, 'docs/implementation-checklist.md'), 'utf8');
assert(phaseAudit.includes('PR #8') && phaseAudit.includes('已合并') && phaseAudit.includes('主题 Phase 1'), 'The audit baseline must reflect merged PRs and theme phases');
assert(checklist.includes('M1-01') && checklist.includes('M6-01'), 'Confirmed requirement acceptance matrix is missing');


/* V2 visual foundation remediation: enforce intended UI structure and real search behavior. */
for(const id of ['search-dialog','theme-dialog','search-input','search-results','search-trigger','theme-trigger','menu-toggle','projects-subnav']) {
 assert(ids.includes(id), 'Missing V2 UI control: '+id);
}
assert(html.includes('class="topbar"') && html.indexOf('class="topbar"') < html.indexOf('class="sidebar"'), 'TopBar must exist independently above the content sidebar');
assert(html.includes('data-action="open-search"') && html.includes('data-action="open-theme"'), 'Search and Theme must have working triggers');
assert(html.includes('id="projects-subnav"'), 'Projects subsections must be available');
assert(mainSource.includes("case 'open-search'") && mainSource.includes("case 'open-theme'"), 'Main app must initialize Search and ThemePicker');
assert(mainSource.includes("initThemePicker") && mainSource.includes("initSearch"), 'V2 functional controllers must be connected');
for (const language of ['zh','en']) {
 const all=buildSearchIndex(language);
 assert(all.length >= 5+7+6+6+4, 'V2 search index misses known content: '+language);
 assert(all.some(x=>x.kind==='page' && x.pageId==='photography'), 'Photography page must be indexed');
 assert(all.some(x=>x.kind==='project' && x.recordId==='personal-nebula'), 'Project Nebula must be indexed');
 assert(searchEntries(all,language==='zh'?'摄影':'Photography').length>0, 'Localized search must match');
 for (const key of ['topbarNavAria','searchTitle','searchPlaceholder','searchNoResults','themeDialogTitle','themePlanned','themeLoadError'])
  assert.equal(typeof siteI18n.ui[language][key],'string','Missing V2 UI copy: '+language+'/'+key);
}
assert(searchEntries(buildSearchIndex('en'),'NEBULA').some(x=>x.kind==='project'), 'Search should be case-insensitive');
assert.equal(searchEntries(buildSearchIndex('en'),'unlikely-search-token-123').length,0,'Search must support empty state');
for(const token of ['--motion-card:','--motion-drawer:','--motion-viewer:','--font-heading-en:'])
 assert(tokens.includes(token),'Missing V2 foundation token '+token);
for(const token of ['--card-surface:','--card-shadow-rest:','--card-shadow-hover:','--card-radius:','--button-secondary-bg:','--tag-surface:','--overlay-backdrop:'])
 assert(themeStyle.includes(token),'Missing landscape semantic token '+token);
assert(!style.includes('box-shadow: var(--shadow-spatial);'), 'Card hover must not discard the contact shadow');
assert(themeStyle.includes('drafting corners') && style.includes(':focus-within'), 'Landscape corner decorations and keyboard focus states must exist');
assert(html.includes('class="topbar-actions"') && html.includes('class="sidebar-subnav"'), 'Navigation needs top utilities and optional local sections');
const pickerSrc=await readFile(resolve(root,'assets/js/theme-picker.js'),'utf8');
assert(pickerSrc.includes('theme.status===\'active\'') && pickerSrc.includes('disabled aria-disabled'), 'Planned themes must remain disabled');
const searchSrc=await readFile(resolve(root,'assets/js/search.js'),'utf8');
assert(searchSrc.includes("event.key==='ArrowDown'") && searchSrc.includes("event.key==='Enter'"), 'Search must support keyboard selection');
assert(searchSrc.includes("event.ctrlKey||event.metaKey"), 'Search should provide a keyboard shortcut');

/* Phase 2: published Cosmic theme and compact cross-page navigation. */
const cosmicStyle=await readFile(resolve(root,'assets/css/themes/cosmic.css'),'utf8');
assert(themeRegistry.cosmic.status==='active' && themeRegistry.cosmic.stylesheet==='assets/css/themes/cosmic.css','Cosmic must be the second published theme');
for(const key of ['--color-page:#F3F1EE','--color-cosmic-ember:#874B42','--card-shadow-rest:inset','--card-shadow-hover:var(--card-shadow-rest)','--font-heading-zh:','--font-heading-en:','cosmic-chart-orbit','prefers-reduced-motion:reduce'])
 assert(cosmicStyle.includes(key),'Missing Cosmic theme contract: '+key);
assert(!cosmicStyle.includes('background-color:#000') && cosmicStyle.includes('light-grey astronomy'),'Cosmic must remain a light-grey, gold theme');
assert(html.includes('class="cosmic-intro"') && html.includes('id="landscape-intro"'),'Both theme art directions must retain a separate hero');
assert(html.includes('id="sidebar-collapse-toggle"') && html.includes('aria-controls="sidebar-content"'),'A real sidebar collapse button must be present');
assert(mainSource.includes('setSidebarCollapsed') && mainSource.includes('sidebar-is-collapsed') && mainSource.includes('SIDEBAR_COLLAPSE_KEY'),'Sidebar collapse must persist and be reversible');
assert(style.includes('.contact-section h2') && style.includes('font-size:clamp(16px,1.35vw,19px)'), 'All pages require a compact contact footer');
assert(style.includes(':root.sidebar-is-collapsed .sidebar') && style.includes(':root.sidebar-is-collapsed .main'), 'Collapsed sidebar must free desktop content width');
for(const language of ['zh','en'])for(const key of ['sidebarCollapseAria','sidebarExpandAria'])
 assert.equal(typeof siteI18n.ui[language][key],'string','Missing collapse i18n '+language+'/'+key);
for(const key of ['littlePrince','smokyLavender'])assert(themeRegistry[key].status==='planned' && themeRegistry[key].stylesheet===null,'Deferred themes must remain disabled: '+key);
/* Scoped visual polish: preserve two different visual languages and footer ownership. */
const landscapeHoverShadow = themeStyle.match(/--card-shadow-hover:\s*([^;]+);/)?.[1] ?? '';
assert.equal((landscapeHoverShadow.match(/rgba\(/g) || []).length, 2,
  'Landscape hover must have a contact and a separate spatial shadow');
assert(themeStyle.includes('repeating-linear-gradient(115deg') &&
  themeStyle.includes('backdrop-filter: blur(var(--card-blur))') &&
  themeStyle.includes('saturate(120%)'),
  'Landscape cards need an identifiable milk-frost material, not flat white');
assert(themeStyle.includes('Keep the two shadow layers on hover') &&
  themeStyle.includes(':focus-within'),
  'Landscape elevation must remain visible on hover/focus even with reduced motion');
const giltSource = await readFile(resolve(root, 'assets/js/cosmic-gilt.js'), 'utf8');
assert(cosmicStyle.includes('--cosmic-gilt-duration:3200ms') &&
  cosmicStyle.includes('stroke-dasharray: 10 90') &&
  cosmicStyle.includes('@keyframes cosmic-outline-trace') &&
  cosmicStyle.includes('stroke-dashoffset: 0; opacity: 0') &&
  cosmicStyle.includes('animation: cosmic-outline-trace var(--cosmic-gilt-duration) linear 1 both') &&
  cosmicStyle.includes('prefers-reduced-motion: no-preference') &&
  !cosmicStyle.includes('cosmic-gilt-sweep') &&
  !cosmicStyle.includes('conic-gradient('),
  'Cosmic must trace the real border, retain 3.2s one-shot motion and respect reduced motion');
assert(giltSource.includes("document.createElementNS") &&
  giltSource.includes("'pathLength', '100'") &&
  giltSource.includes("'width', '100%'") &&
  giltSource.includes("new MutationObserver(syncCardOutlines)") &&
  giltSource.includes("dataset.theme !== 'cosmic'") &&
  giltSource.includes('holder.hidden = true') &&
  giltSource.includes("holder.appendChild(svg)") &&
  mainSource.includes('initCosmicGilt()'),
  'Cosmic outline needs responsive SVG layers that survive theme/language updates without affecting Landscape');
assert(cosmicStyle.includes('--card-hover-lift:0px') &&
  cosmicStyle.includes('--card-shadow-hover:var(--card-shadow-rest)'),
  'Cosmic card hover must not gain heavier elevation');
assert(html.indexOf('class="sidebar-footer"') < html.indexOf('id="sidebar-collapse-toggle"'),
  'Sidebar collapse toggle must be after footer utilities at the lower-left');
assert(style.includes('.sidebar-content{min-height:0;overflow-y:auto}') &&
  style.includes('.sidebar{overflow:hidden;transition:width') &&
  style.includes(':root.sidebar-is-collapsed .sidebar-collapse-control{margin-top:auto'),
  'Collapse toggle must remain pinned to bottom while the menu scrolls');
assert(style.includes('.sidebar-footer .button.primary') &&
  style.includes('.sidebar-footer .utility-link') &&
  style.includes('min-height: 28px'),
  'Sidebar footer should show compact equal-weight utilities');
console.log('PASS: published landscape + cosmic, compact contact footer, collapsible sidebar, V2 foundation, navigation, search, photography, viewers, i18n and regression suites.');
