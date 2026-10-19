import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { projects } from '../assets/data/projects.js';
import { documents } from '../assets/data/documents.js';
import { articles } from '../assets/data/articles.js';
import { documentList } from '../assets/data/document-list.js';
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
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
assert(!/\son\w+=/i.test(html), 'No inline handlers');
for (const id of ['about', 'projects', 'design', 'experience', 'insights', 'contact']) assert(ids.includes(id));
for (const match of html.matchAll(/(?:href|src)="(assets\/[^"#]+)"/g)) await readFile(resolve(root, match[1]));
assert.equal(projects.length, 5);
assert.equal(articles.length, 6);
for (const project of projects) if (project.document) assert(documents[project.document]);
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
console.log('PASS: module syntax/imports, HTML structure, content references, SSE chunking and errors.');
