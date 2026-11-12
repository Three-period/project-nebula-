# Project Nebula · 景观白绿 Phase 1 验收清单 V1

**需求版本：** 用户确认的《景观白绿首期完善方案 V1》  
**更新日期：** 2026-11-12  
**分支：** `feat/landscape-phase1-completion-v1`  
**状态说明：** 「实现」表示代码已经提交；「通过」必须有执行证据；「待素材」不等同于缺陷。

| ID | 需求与验收条件 | 关键文件 | 当前状态 | 验收方法 |
| --- | --- | --- | --- | --- |
| M1-01 | PR #4–#8 已合并，历史审计状态修正 | `docs/phase-audit.md` | 已实现 | 核对 PR 与分支 |
| M1-02 | 开发 R1–R5 与主题 Phase 1–4 独立管理 | `docs/phase-audit.md` | 已实现 | 文档审核 |
| M2-01 | 五个主内容区和导航入口唯一且可访问 | `index.html`、`main.js` | 已实现 | DOM 检查、hash 切换 |
| M2-02 | 第五页中英标题、说明、交互文案齐全 | `site-i18n.js` | 已实现 | 翻译断言 |
| M3-01 | 四主题具有唯一 ID 和明确状态 | `theme-registry.js` | 已实现 | 注册表断言 |
| M3-02 | 仅 landscape 可选择，不加载其他主题资源 | `theme.js` | 已实现 | 状态检查、浏览器调试 |
| M3-03 | 主题样式动态加载失败可回退且不丢页面状态 | `theme.js` | 代码已实现，待交互实测 | 模拟资源失败、检查保留状态 |
| M4-01 | 预留摄影目录及四种示例分类 | `public/images/photography/` | 已实现 | 路径检查 |
| M4-02 | 摄影数据结构和独立中英文翻译 | `photography.js`、`photography-i18n.js` | 已实现 | 数据检查 |
| M4-03 | 左主题、右轮播；手机轮播在上 | `index.html`、`components.css`、`responsive.css` | 代码已实现，待实测 | 1440/820/390px |
| M4-04 | 主题卡片可打开二级图片抽屉 | `photography.js`、`drawer.js` | 代码已实现，待有照片端到端验证 | 无照片空状态；上传后回归 |
| M4-05 | 图片可进入三级大图、前后切换、键盘与触屏手势 | `viewer.js`、`main.js` | 代码已实现，待有照片端到端验证 | 上传后逐项操作 |
| M4-06 | 轮播 6 秒，可因用户交互/悬停/窗口隐藏暂停；减少动态效果停播 | `photography.js` | 代码已实现，待有照片端到端验证 | 时间、交互与偏好测试 |
| M4-07 | 不使用仓库项目图片冒充个人摄影；未上传时有中英空状态 | `photography.js`、`photography-i18n.js` | 已实现 | 查看空主题 |
| M5-01 | 首页网格→建筑轮廓→植物显现，约 1–1.5 秒 | `landscape-intro.js`、`landscape.css` | 代码已实现，待浏览器验收 | 清会话缓存后录屏 |
| M5-02 | 会话首次进入播放；切换页面/语言/抽屉不重播 | `landscape-intro.js` | 代码已实现，待浏览器验收 | 导航与语言切换 |
| M5-03 | 减少动态效果时有静态终态，首页文字始终可读 | `landscape.css`、`responsive.css` | 代码已实现，待浏览器验收 | prefers-reduced-motion |
| M6-01 | 神秘宇宙、小王子、烟紫均处 planned，不对访客展示 | `theme-registry.js` | 已实现 | 注册表检查 |
| Q-01 | 保留原有项目、文章、PDF 和 Agent 维修状态 | 原有 data、viewer、agent | 代码保留，待回归 | 项目抽屉/附件 |
| Q-02 | 完整 `npm run check` | `scripts/check.mjs` | 待执行 | Node 20+ |
| Q-03 | 桌面、平板、手机浏览器真实验证 | 所有页面 | 待人工验收 | 1440 / 820 / 390 |
| Q-04 | Cloudflare Pages 预览部署成功后用户确认 | PR 预览 | 待发布检查 | 分支预览地址 |

## 摄影照片上传说明

1. 将你本人拥有使用权的 JPG / WebP / AVIF 上传到 `public/images/photography/<分类>/`。
2. 在 `assets/data/photography.js` 的 `photos` 中增加 `id`、`src`、中文 `title`、描述性的 `alt` 和可选 `description`。
3. 在 `assets/data/photography-i18n.js` 的 `en.photos[id]` 中补充已确认的英文翻译；不修改原始图片内文字。
4. 运行 `npm run check`，预览图片加载和移动端裁切，再发布。

**提醒：** GitHub 仅上传文件不会自动修改页面数据；必须登记媒体数据并部署。四个目录只是分类建议，最终主题名称可根据真实摄影作品调整。

## 发布方式

从 `main` 创建独立开发分支 → 完成代码和测试 → Draft PR → Cloudflare Pages 分支预览 → 用户验收 → 再考虑合并 `main`。已有备份分支 `backup/main-before-nebula-rebuild-20261111` 和 `release/nebula-rebuild-v1-20261111` 均不修改。
