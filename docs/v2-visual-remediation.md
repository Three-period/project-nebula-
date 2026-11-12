# Project Nebula · V2.0 视觉底座修缮交付与验收清单

> 设计基线：用户已确认的《个人作品站｜四主题统一视觉与主题切换架构 V2.0》与《V2.0 对照审计与修缮方案 V1.0》
>
> 开发基线：PR #9 HEAD `3c72101587eec30179bf8e4918b0baaccf128636`；独立分支 `feat/visual-foundation-v2-remediation`
>
> 保护边界：不修改 `main`，不改原始项目/文章/文档/摄影图片数据，不恢复维护中的 AI 数字分身，不开放另外三套主题。

## 交付范围和阶段状态

| 工作包 | 内容 | 核查依据 | 进度 |
| --- | --- | --- | --- |
| W0 | 独立分支，分包提交，叠加 PR | Git 提交历史；原 PR #9 不改 | 已提交 |
| W1 | 顶部功能导航与内容侧栏拆分，菜单、二级栏目 | `index.html`、`layout.css`、`responsive.css`、`main.js` | 代码提交，待浏览器 |
| W2 | 客户端双语搜索、关键词、键盘和原抽屉复用 | `search-index.js`、`search.js` | 代码提交，待浏览器 |
| W3 | 四主题共用语义 Token、ThemePicker 和 Planned 闸门 | `tokens.css`、`landscape.css`、`theme-registry.js`、`theme-picker.js` | 代码提交，待浏览器 |
| W4 | 卡片双阴影、建筑角线、焦点、按钮、标签 | `base.css`、`components.css`、`landscape.css` | 代码提交，待视觉 |
| W5 | 字体与动效时长、阅读状态、摄影淡入 | CSS、`viewer.js` | 代码提交，待浏览器 |
| W6 | 自动化脚本与源代码回归、部署预览 | `scripts/check.mjs`、GitHub Actions | CI 结果以 PR 检查为准 |

## 验收场景

1. 1440px 桌面：TopBar 固定于顶部且不遮挡左侧五栏目；卡片 hover/focus 双层阴影 + 两条角线可辨。
2. 820px 平板：顶部可看到 Home/Search/语言/Theme/Menu，菜单打开后显示五栏目、可关闭；无遮挡。
3. 390px 手机：同样五项功能可达，文字无横向溢出；PDF、抽屉、主题面板和 Search 可操作。
4. Search：中文/English，项目、文章、文档、摄影、能力搜索，空结果、上下键、Enter、Esc、Ctrl/Cmd+K，结果可进入正确内容。
5. Theme：四套预览，不可用主题不能点击；失败保留原主题；当前页面与语言不被清空。
6. 三级阅读：搜索打开文档、项目和摄影后，抽屉/查看器层级正确；语言切换不重载视频/PDF、不丢失文档阅读位置。
7. Motion：首页动画同会话不重播；摄影 6s 逻辑需有真实照片之后再端到端验证；系统 Reduced Motion 下无非必要动画。
8. 现有数据：项目、文章、PDF 与数字分身维修状态不变。

## 完成判定

- **源码修改：已提交**不等于**浏览器验收通过**。
- CI 必须实跑 `npm run check` 且通过；若失败需追加修复 commit 并更新此记录。
- Cloudflare Pages 预览可单独核验；Workers Builds 历史失败不应等同于 Pages 失败。
- 保留 PR #9，修缮 PR 先以 `feat/landscape-phase1-completion-v1` 为 base，审阅后再考虑合并；`main` 保持不变。
- 原有 `backup/main-before-nebula-rebuild-20261111` 和 `release/nebula-rebuild-v1-20261111` 均不修改。
