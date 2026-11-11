import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { projects } from '../assets/data/projects.js';
import { workProjects } from '../assets/data/work-projects.js';
import { personalProjects } from '../assets/data/personal-projects.js';
import { documents } from '../assets/data/documents.js';
import { articles } from '../assets/data/articles.js';
import { documentList } from '../assets/data/document-list.js';
import { siteI18n } from '../assets/data/site-i18n.js';
import { projectI18n } from '../assets/data/project-i18n.js';
import { documentI18n } from '../assets/data/document-i18n.js';
import { articleI18n } from '../assets/data/article-i18n.js';
import { readCozeStream } from '../assets/js/agent.js';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = [];
async function walk(dir) { for (const entry of await readdir(dir, { withFileTypes: true })) { const path = resolve(dir, entry.name); if (entry.isDirectory()) await walk(path); else files.push(path); } }
await walk(root);
for (const file of files.filter(f => /\.(js|mjs)$/.test(f))) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    if (match[1].startsWith('.')) await readFile(resolve(dirname(file), match[1]));
  }
}
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const mainSource = await readFile(resolve(root, 'assets/js/main.js'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
assert(!/\son\w+=/i.test(html), 'No inline handlers');
for (const id of ['about', 'projects', 'experience', 'insights', 'contact', 'work-project-list', 'personal-project-list', 'document-list', 'article-list']) assert(ids.includes(id));
for (const match of html.matchAll(/(?:href|src)="(assets\/[^"#]+)"/g)) await readFile(resolve(root, match[1]));
assert.equal(projects.length, 5);
assert.equal(workProjects.length, 5);
assert.equal(personalProjects.length, 2);
assert.equal(projects.filter(p => p.visibility === 'draft').length, 3);
assert(!html.includes('id="sae-input"'));
assert(!html.includes('id="design"'));
assert(html.includes('nebula-orbits-v2.svg'));
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
const style = await readFile(resolve(root, 'assets/css/main.css'), 'utf8');
assert(style.includes('grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr)'), 'Profile columns must use a balanced responsive grid');
assert(style.includes('backdrop-filter: blur(var(--surface-blur))') && style.includes('box-shadow: var(--shadow-card)'), 'Landscape cards need frosted glass and layered architectural shadows');
assert(style.includes('@media (max-width: 960px)') && style.includes('@media (max-width: 760px)') && style.includes('@media (max-width: 560px)'), 'Desktop, tablet and mobile breakpoints must be explicit');
assert(style.includes('global-language-switch') && style.includes('prefers-reduced-motion') && style.includes('100dvh'), 'Global language, reduced motion and dynamic viewport support');
assert(!style.includes('cosmic-orbit') && !style.includes('body::after') && !style.includes('rgba(178, 153, 93'), 'Legacy cosmic and parchment visuals must be removed');
assert(!style.includes('singu-photo') && !style.includes('about-language-switch'), 'Obsolete photo/language styles must be removed');
assert(!html.includes('class="cosmic-orbits"') && !mainSource.includes('is-orbiting'), 'Unused cosmic illustration and animation trigger must be removed');
assert(!tokens.includes('--paper:') && !tokens.includes('--ochre:') && !tokens.includes('--gold:'), 'Transitional legacy color aliases must be removed');
assert(!files.some(file => file.endsWith('/heying-photo.jpg')), 'Personal photo asset must be deleted');
const themeSource = await readFile(resolve(root, 'assets/js/theme.js'), 'utf8');
assert(themeSource.includes("landscape") && /document\.documentElement\.dataset\.theme\s*=\s*themeId/.test(themeSource), 'Landscape theme registry must initialize through the document theme attribute');
const tokens = await readFile(resolve(root, 'assets/css/tokens.css'), 'utf8');
for (const token of ['--color-page:', '--color-primary:', '--color-mist:', '--shadow-contact:', '--shadow-spatial:']) assert(tokens.includes(token), 'Missing landscape design token: ' + token);
assert(html.includes('data-theme="landscape"'), 'Landscape must be the default theme');
console.log('PASS: syntax/imports, global bilingual coverage, all stored translations, photo removal, responsive styles and SSE integration.');
