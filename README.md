# Project Nebula · 个人简历与作品集

原生 HTML、CSS 与 ES Modules，无前端框架、无第三方运行依赖、无构建步骤。

## 本地运行

在项目目录运行 `python -m http.server 8000`，浏览器打开 `http://localhost:8000`。
ES Modules 需要通过 HTTP 加载，不能双击 HTML 文件预览。

本地静态服务器不执行 Cloudflare Pages Functions；数字分身需在已配置环境变量的 Cloudflare 预览或正式环境验证。

## 修改入口

| 修改内容 | 文件 |
| --- | --- |
| 个人介绍、技能、履历、联系方式、目录名称 | `index.html` |
| 项目概述、技术栈、标签、演示视频 | `assets/data/projects.js` |
| 方案列表摘要和展示顺序 | `assets/data/document-list.js` |
| 文档完整正文 | `assets/data/documents.js` 的多行 `body` 字段 |
| 文章摘要、全文、日期与示范标记 | `assets/data/articles.js` |
| 配色、字号、间距、内容宽度 | `assets/css/tokens.css` |
| 布局、组件、手机适配 | `assets/css/main.css` |
| 列表渲染与文字转义 | `assets/js/content.js` |
| 目录定位、滚动高亮和按钮事件 | `assets/js/main.js` |
| 文档与文章详情 | `assets/js/drawer.js` |
| 通用模态框、阅读位置与焦点恢复 | `assets/js/dialog.js` |
| 聊天请求、流式解析和界面状态 | `assets/js/agent.js` |
| Coze 服务端代理 | `functions/api/chat.js` |
| 当前视觉规范展示 | `design-system.html` |

新增项目：往 `projects` 数组增加条目；`document` 引用 `documents` 中的键。新增文档时同时补充 `document-list.js` 中的摘要。新增文章只需在 `articles.js` 中新增完整条目。

数据中的 `body` 是作者维护的可信 HTML，允许标题、段落、列表与图片；不要放入脚本或事件属性。来自访客和模型的聊天文本始终通过 `textContent` 展示。

## 检查

Node.js 20+ 环境下运行 `npm run check`，无需安装依赖。覆盖模块语法与引用、HTML ID、内容关联、无行内事件，以及聊天流的 UTF-8 分片、CRLF、末尾事件和错误处理。

浏览器验收：检查五个章节连续显示、目录滚动高亮与深链接、文档与六篇文章抽屉、Esc/遮罩关闭、焦点和滚动位置恢复；检查 390px、820px 与桌面宽度；确认 PDF、图片与真实 Coze 连接。

## 部署

沿用现有 Cloudflare Pages 项目：静态目录为仓库根目录，无需构建命令，保留根目录 `functions/`。保留现有 `COZE_TOKEN`、`COZE_BOT_ID` 环境变量，预览环境也需配置。密钥不得写入前端代码。

## 内容边界与历史材料

本次改版调整信息架构、视觉和代码组织，没有新增履历事实。原站 5 个项目条目（含 3 个待补充条目）、5 份历史文档、6 篇文章和完整履历均迁移；新增 1 份当前设计规范。后 3 篇文章继续标记为示范内容。旧 PRD、设计指南、架构图与原型保留为历史材料，不代表当前界面。

原有图片和 PDF 沿用 `public/images/`。重复的 `.pdf.pdf` 与空占位文件未用于新版页面，暂未删除，避免影响既有外链。
