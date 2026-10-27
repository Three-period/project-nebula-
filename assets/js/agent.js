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

export function initAgent(){
 const dialog=document.getElementById('chat-dialog');
 const controller=createDialog(dialog,dialog.querySelector('[data-action="close-chat"]'));
 // Current product decision: all public entry points are static maintenance messages.
 // Keep readCozeStream exported for historical tests; never call the API in this version.
 return {open:controller.open,close:controller.close,ask:controller.open};
}
