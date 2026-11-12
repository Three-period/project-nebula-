# Project Nebula · 景观白绿
本项目为纯 HTML、CSS 与原生 ES Modules 实现的个人 AI 展示站，无需构建步骤。

## 运行和验证
从仓库根目录运行 `python -m http.server 8000` 并打开 `http://localhost:8000`。
Node.js 20+ 环境下运行 `npm run check` 进行模块语法、数据引用、HTML ID 与历史流式解析测试。

## 维护入口
| 内容 | 文件 |
| --- | --- |
| 五页面结构、个人奇点、能力图谱、经历与成长和摄影作品 | `index.html` |
| 能力领域及其项目证据映射 | `assets/data/capabilities.js` |
| 工作项目 V3 正文 | `assets/data/work-projects.js` |
| 个人项目 V3 正文 | `assets/data/personal-projects.js` |
| 旧项目卡与隐藏占位草稿原文 | `assets/data/projects.js` |
| 原有 Nebula / Agent 历史材料完整正文 | `assets/data/documents.js` |
| 材料入口与版本说明 | `assets/data/document-list.js` |
| 思考与方法六篇文章 | `assets/data/articles.js` |
| 内容卡片生成及 HTML 编码 | `assets/js/content.js` |
| 五页面目录、卡片反馈、交互委托 | `assets/js/main.js` |
| 全站中文 / English 文案和切换 | `assets/data/about-i18n.js`、`assets/js/i18n.js` |
| 项目 / 文档 / 文章阅读抽屉 | `assets/js/drawer.js` |
| 全文、图片、GIF、视频与 PDF 第三级查看器 | `assets/js/viewer.js` |
| 原生弹窗与抽屉堆叠、焦点恢复 | `assets/js/dialog.js` |
| 数字分身静态维修状态 | `assets/js/agent.js` |
| 通用设计 tokens | `assets/css/tokens.css` |
| 景观白绿主题 tokens | `assets/css/themes/landscape.css` |
| 基础样式与控件 | `assets/css/base.css` |
| 页面布局 | `assets/css/layout.css` |
| 卡片、抽屉与内容组件 | `assets/css/components.css` |
| 响应式、无障碍与打印 | `assets/css/responsive.css` |
| 设计规范页 | `design-system.html` |

## 开发原则
- 目录点击仅显示当前板块，不使用旧版全站连续长页；深层详情统一从右侧抽屉打开。
- 全站导航、个人介绍、经历、项目、材料、文章与抽屉内容支持中文 / English 切换；中文为内容源语言，新增数据需同步维护对应翻译。Project Nebula 的经历入口复用原项目与材料数据，不复制正文。
- 五个工作项目与两个个人项目各自存储；三张历史占位项目仅保留在数据中不公开展示。
- 当前确认的 V3 项目内容是新增项目权威正文，历史文章及文档不擅自重写。
- 暂无实际附件链接的项目不制作假下载入口；PDF 沿用旧文件，不代表简历已更新。
- 数字分身处于维修模式，不调用后端 `/api/chat`；保留原 Pages Function 供未来重启。
- 静态站部署仍由原 Cloudflare Pages 项目从 `main` 自动发布，不新建站点。

## 验收重点
桌面及手机 390px / 820px：五页面切换、摄影空状态、卡片交互与首页空间动画、项目／材料／文章抽屉、Esc／遮罩关闭、焦点与滚动恢复、外链、PDF 和维修提示。浏览器与正式站的实际手工验收需另行完成。


## Global bilingual content (V1.1)

- Chinese remains the canonical source copy in the existing HTML and data files.
- English interface copy is stored in `assets/data/site-i18n.js`; project, document, and article translations are stored in the corresponding `*-i18n.js` files.
- The global language switch updates static sections, rendered cards, and open detail drawers. The selected language is remembered locally in the browser.
- When adding or editing content, update the matching English translation entry. Existing translations are stored in GitHub; no translation API, backend, or database is required.


## Landscape White & Green theme

- Default theme: `landscape`, initialized by `assets/js/theme.js` and `data-theme="landscape"`.
- Shared typography, spacing and layout tokens are maintained in `assets/css/tokens.css`; the landscape palette lives in `assets/css/themes/landscape.css`.
- Shared components consume semantic color variables, so future themes can change the palette without duplicating card, drawer or navigation behavior.
- Existing content, bilingual copy, navigation, drawers, and maintenance-mode behavior remain unchanged in this visual phase.
- The former cosmic orbit illustration remains in the repository as a historical asset but is hidden by the current theme.


## CSS maintenance structure

- `assets/css/tokens.css` stores theme-independent typography, spacing, radii, layout and motion tokens.
- `assets/css/themes/landscape.css` stores the Landscape White & Green semantic palette. Future themes can add a sibling theme file without rewriting shared components.
- `base.css`, `layout.css`, `components.css` and `responsive.css` separate global foundations, page structure, reusable UI and viewport-specific behavior. They are loaded in order by HTML link tags; no build tool or CSS import chain is required.
- The previous cosmic/parchment override stack and transitional color aliases have been removed from the active stylesheet. The orbit SVG remains an unreferenced asset for possible future theme work.
- Responsive behavior uses 1100px layout balancing, 960px tablet navigation, 760px single-column composition, 560px compact mobile refinements, and 380px narrow-screen refinements.
- Landscape cards use translucent frosted surfaces, restrained green borders, and two-layer contact/spatial shadows.


## Rich content presentation (V1)
- Project details use the existing right-side drawer as the second-level container. Project media is stored as typed records (image, video, gif) in the project data file; only available media types appear as tabs.
- The Project Nebula record reuses image assets already in public/images and its existing Bilibili demo link. No placeholder GIF or photography is fabricated.
- Document drawers show a short overview and tags. The full stored document opens in a third-level modal viewer; the modal can stack above the drawer and returns focus to the originating control when closed.
- The existing resume PDF has an online preview modal and retains its download link. Future PDFs can reuse the same viewer entry point.
- Full-document, media and PDF viewers follow the global Chinese / English setting. The photography portfolio is intentionally deferred until original photography assets and grouping information are supplied.


## Capability map (V1)
- The Projects section begins with four evidence-linked capability domains: business understanding/modeling, product definition/solution design, AI capability engineering, and end-to-end delivery/collaboration.
- Capability copy is bilingual and stored in `assets/data/site-i18n.js`; group definitions and evidence project IDs are stored in `assets/data/capabilities.js`.
- Each evidence item opens its existing project drawer. Project records remain the source of truth for titles, stages, and project descriptions; capability cards do not duplicate project narratives.
- Photography directories and data schemas are reserved; no stock, generated, or unrelated project images are presented as the owner's photography.


## Refactoring quality review
- `docs/phase-audit.md` distinguishes completed development PRs from theme phases; `docs/implementation-checklist.md` tracks the confirmed Phase 1 requirements and acceptance criteria.
- `design-system.html` is the active visual reference for the current Landscape White & Green theme, component dimensions, typography, and responsive rules.


## Photography page and upload workflow (Landscape Phase 1)
- The fifth page uses `#photography` with a theme list, carousel, theme detail drawer and fullscreen image viewer. Without original images, it shows an honest bilingual empty state.
- Reserve original photos under `public/images/photography/{nature,architecture,travel,details}/`. Read `public/images/photography/README.md` before uploading; actual category names remain provisional.
- `assets/data/photography.js` defines themes and photo records; `assets/data/photography-i18n.js` defines translated theme labels and future photo captions. Uploading a file alone does not publish it; add a data record and build/deploy.
- Desktop uses a theme list on the left and media carousel on the right. Mobile moves the carousel above the theme list. Image view and keyboard/swipe interactions reuse `drawer.js` and `viewer.js`.
- Autoplay is 6 seconds only with multiple photos, an active photography page and no hover, focus, manual interaction, reduced-motion preference, or hidden document.

## Theme registry and opening motion
- `assets/js/theme-registry.js` stores completed vs planned theme metadata. Only `landscape` is active; other theme palettes/styles and the theme choice UI remain deferred.
- `assets/js/theme.js` loads enabled CSS without losing page state and falls back when CSS loading fails.
- `assets/js/landscape-intro.js` handles the 1.3-second one-shot SVG grid/building/plant opening illustration, with session memory and reduced-motion fallback.
- No new framework, database, network API or external media content is required.


## V2 视觉底座修缮（叠加 PR）
本轮以景观白绿 Phase 1 PR #9 为基线，在 `feat/visual-foundation-v2-remediation` 独立分支提交，不覆盖 `main`。实施内容：
- 顶部 Home / Search / 中文 EN / Theme + 独立左侧五栏目内容导航；960px 以下目录改为顶部 Menu 弹出。
- 浏览器内静态双语搜索：五页面、项目、文档、文章、能力图谱、摄影分类/已登记照片，结果复用现有抽屉/查看器；不承诺解析 PDF 文件全文。
- 四主题视觉预览与注册表：景观白绿 active，神秘宇宙、小王子、冷调烟紫仍 planned/disabled。
- 分层视觉 Token、景观卡片双层悬停阴影/建筑角线、字体与按钮细节，以及阅读器语言切换状态保护。

修改前后可核查每个独立 commit；详见 `docs/v2-visual-remediation.md`。图片原图及另外三套主题的完整 CSS 仍属于后续阶段。自动化运行 `npm run check`；真实浏览器的 1440/820/390px 验收需另行记录。
