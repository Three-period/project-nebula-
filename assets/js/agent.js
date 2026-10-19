import { createDialog } from './dialog.js';

function cleanReply(text = '') {
  return text.replace(/https?:\/\/www\.notion\.so\/\S+/gi, '')
    .replace(/\[\d+\]/g, '')
    .replace(/[（(]?\[[^\[\]\n]{2,}\][）)]?/g, '')
    .replace(/(?:来源|参考资料)[:：].*/gi, '')
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

// Supports arbitrary network chunk boundaries, CRLF, and a final unterminated event.
export async function readCozeStream(response, onUpdate) {
  if (!response.ok || !response.body) throw new Error('聊天服务暂时不可用，请稍后重试。');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let output = '';
  function consume(block) {
    let event = '';
    const data = [];
    for (const raw of block.split('\n')) {
      const line = raw.replace(/\r$/, '');
      if (line.startsWith('event:')) event = line.slice(6).trim();
      if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
    }
    if (!data.length || data.join('') === '[DONE]') return;
    let payload;
    try { payload = JSON.parse(data.join('\n')); } catch { return; }
    if (event === 'error' || event === 'conversation.chat.failed') throw new Error('数字分身暂时无法回应，请稍后重试。');
    if (event === 'conversation.message.delta' && payload.content) {
      output += payload.content;
      onUpdate(cleanReply(output));
    }
  }
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      let separator;
      while ((separator = /\r?\n\r?\n/.exec(buffer))) {
        consume(buffer.slice(0, separator.index));
        buffer = buffer.slice(separator.index + separator[0].length);
      }
      if (done) break;
    }
    if (buffer.trim()) consume(buffer);
    return cleanReply(output);
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export function initAgent() {
  const dialog = document.getElementById('chat-dialog');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  const submit = document.getElementById('chat-send');
  const controller = createDialog(dialog, input);
  const visitor = `visitor_${crypto.randomUUID()}`;
  let pending = false;
  function add(text, user = false) {
    const message = document.createElement('p');
    message.className = `message ${user ? 'message-user' : 'message-ai'}`;
    message.textContent = text;
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }
  async function ask(question) {
    controller.open();
    const text = question.trim().slice(0, 2000);
    if (!text || pending) return;
    pending = true;
    submit.disabled = true;
    dialog.querySelectorAll('[data-question]').forEach(b => b.disabled = true);
    add(text, true);
    const reply = add('数字分身正在思考中…');
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 60000);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: abort.signal,
        body: JSON.stringify({ user_id: visitor, additional_messages: [{ role: 'user', content: text, content_type: 'text' }] })
      });
      const answer = await readCozeStream(response, value => {
        reply.textContent = value || '数字分身正在思考中…';
        messages.scrollTop = messages.scrollHeight;
      });
      reply.textContent = answer || '数字分身暂时没有返回内容，请稍后重试。';
    } catch (error) {
      reply.textContent = error.name === 'AbortError' ? '响应超时，请稍后重试。' : '网络或聊天服务异常，请稍后重试。';
    } finally {
      clearTimeout(timeout);
      pending = false;
      submit.disabled = false;
      dialog.querySelectorAll('[data-question]').forEach(b => b.disabled = false);
      messages.scrollTop = messages.scrollHeight;
    }
  }
  document.getElementById('chat-form').addEventListener('submit', event => {
    event.preventDefault();
    if (pending || !input.value.trim()) return;
    const question = input.value;
    input.value = '';
    ask(question);
  });
  return { open: controller.open, close: controller.close, ask };
}
