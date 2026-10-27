# Project Nebula · 浅色宇宙手记
本项目为纯 HTML、CSS 与原生 ES Modules 实现的个人 AI 展示站，无需构建步骤。

## 运行和验证
从仓库根目录运行 `python -m http.server 8000` 并打开 `http://localhost:8000`。
Node.js 20+ 环境下运行 `npm run check` 进行模块语法、数据引用、HTML ID 与历史流式解析测试。

## 维护入口
| 内容 | 文件 |
| --- | --- |
| 四板块结构、个人奇点和经历与成长 | `index.html` |
| 工作项目 V3 正文 | `assets/data/work-projects.js` |
| 个人项目 V3 正文 | `assets/data/personal-projects.js` |
| 旧项目卡与隐藏占位草稿原文 | `assets/data/projects.js` |
| 原有 Nebula / Agent 历史材料完整正文 | `assets/data/documents.js` |
| 材料入口与版本说明 | `assets/data/document-list.js` |
| 思考与方法六篇文章 | `assets/data/articles.js` |
| 内容卡片生成及 HTML 编码 | `assets/js/content.js` |
| 四板块目录、卡片反馈、交互委托 | `assets/js/main.js` |
| 项目 / 文档 / 文章阅读抽屉 | `assets/js/drawer.js` |
| 数字分身静态维修状态 | `assets/js/agent.js` |
| 视觉 tokens、布局与动效 | `assets/css/tokens.css`、`assets/css/main.css` |
| 星轨矢量插画 | `public/images/nebula-orbits-v2.svg` |

## 开发原则
- 目录点击仅显示当前板块，不使用旧版全站连续长页；深层详情统一从右侧抽屉打开。
- 五个工作项目与两个个人项目各自存储；三张历史占位项目仅保留在数据中不公开展示。
- PRD 中确认的 V3 内容是新增项目权威正文，历史文章及文档不擅自重写。
- 暂无实际附件链接的项目不制作假下载入口；PDF 沿用旧文件，不代表简历已更新。
- 数字分身处于维修模式，不调用后端 `/api/chat`；保留原 Pages Function 供未来重启。
- 静态站部署仍由原 Cloudflare Pages 项目从 `main` 自动发布，不新建站点。

## 验收重点
桌面及手机 390px / 820px：四板块切换、卡片交互和星轨反馈、项目／材料／文章抽屉、Esc／遮罩关闭、焦点与滚动恢复、外链、PDF 和维修提示。浏览器与正式站的实际手工验收需另行完成。
