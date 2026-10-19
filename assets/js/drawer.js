import { documents } from '../data/documents.js';
import { articles } from '../data/articles.js';
import { createDialog } from './dialog.js';

export function initDrawer() {
  const element = document.getElementById('detail-dialog');
  const controller = createDialog(element, element.querySelector('[data-action="close-drawer"]'));
  const body = document.getElementById('drawer-body');
  const external = document.getElementById('drawer-external');
  const previous = document.getElementById('article-prev');
  const next = document.getElementById('article-next');
  let currentArticle = -1;

  function show(item, articleIndex = -1) {
    if (!item) return;
    currentArticle = articleIndex;
    document.getElementById('drawer-type').textContent = item.type || item.en;
    document.getElementById('drawer-title').textContent = item.title;
    const notice = item.historical
      ? '<p class="drawer-notice">历史项目材料：以下保留改版前的方案、截图与设计记录。当前界面以宣纸风长页为准。</p>'
      : item.sample ? '<p class="drawer-notice">原站示范内容，尚待替换为真实分析。</p>' : '';
    body.innerHTML = notice + item.body;
    // Rich bodies are author-controlled content, never visitor/model output.
    body.querySelectorAll('a[target="_blank"]').forEach(a => a.rel = 'noopener noreferrer');
    const hasExternal = Boolean(item.url && item.url !== '#');
    external.hidden = !hasExternal;
    if (hasExternal) external.href = item.url;
    else external.removeAttribute('href');
    previous.parentElement.hidden = articleIndex < 0;
    previous.disabled = articleIndex <= 0;
    next.disabled = articleIndex >= articles.length - 1;
    controller.open();
    body.scrollTop = 0;
  }

  return {
    openDocument(key) { show(documents[key]); },
    openArticle(index) { show(articles[index], index); },
    previous() { if (currentArticle > 0) show(articles[currentArticle - 1], currentArticle - 1); },
    next() { if (currentArticle >= 0 && currentArticle < articles.length - 1) show(articles[currentArticle + 1], currentArticle + 1); },
    close: controller.close
  };
}
