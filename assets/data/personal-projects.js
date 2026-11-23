export const personalProjects = [
  {
    "id": "personal-nebula",
    "title": "Project Nebula｜个人 AI 展示站",
    "year": "2025.11—至今",
    "type": "个人项目",
    "stage": "V1 已上线 · V2 持续迭代",
    "tags": [
      "产品 0→1",
      "视觉与组件规范",
      "独立上线迭代"
    ],
    "description": "从招聘方的阅读场景出发，独立完成一款可交互的个人展示产品，覆盖产品定义、视觉方案、组件规范与开发部署。",
    "defaultVersion": "v2",
    "versionGroupLabel": "项目版本",
    "versions": [
      {
        "id": "v2",
        "label": "V2 · 当前重构版",
        "stage": "持续迭代",
        "description": "从真实阅读反馈出发，重构内容层级与浏览路径，并补齐双主题、中英文、搜索、项目详情与媒体查看能力。",
        "body": "<div class=\"project-story\"><section><h3>重构动因</h3><p>V1 的星球式叙事具有辨识度，但招聘方需要更快定位经历、项目和方法。V2 将展示逻辑从非线性探索调整为五个清晰篇章，降低理解成本。</p></section><section><h3>内容与体验重构</h3><p>重新组织个人奇点、经历与成长、作品与实践、思考与方法、摄影作品五个页面；项目详情采用分层阅读，支持站内搜索、中英文切换、在线简历和媒体查看。</p></section><section><h3>视觉系统</h3><p>以共享组件承载景观白绿与神秘宇宙两套主题，统一字体、色彩、卡片、按钮、抽屉与响应式规则，并为不同主题保留独立的视觉语言。</p></section><section><h3>独立交付</h3><p>持续完成内容建模、交互设计、AI 辅助开发、代码检视、测试和 Cloudflare Pages 部署。当前数字分身暂停，V2 继续围绕阅读效率与项目证据迭代。</p></section></div>",
        "documents": [],
        "showCurrentDesignSystem": true,
        "useLegacyMedia": false
      },
      {
        "id": "v1",
        "label": "V1 · 数字分身版",
        "stage": "2026 年 3 月上线 · 历史版本",
        "description": "以能力星球为核心交互，将个人经历、项目材料与 Coze 数字分身整合为可探索、可交互、可对话的个人 AI 产品样机。",
        "body": "<div class=\"project-story\"><section><h3>产品机会</h3><p>传统简历难以完整展示项目判断、交付过程与 AI 产品能力，因此将个人能力重新组织为可探索的数字展示产品。</p></section><section><h3>能力星球架构</h3><p>以 AI 奇点、星工场、造物星、聚变星与脉冲星构成非线性信息架构，分别承载个人定位、项目、产品材料、经历与思考。</p></section><section><h3>数字分身</h3><p>基于 Coze、知识库与 RAG 搭建个人数字分身，围绕经历和项目提供问答，并通过 Prompt 护栏约束身份、信息边界和输出结构。</p></section><section><h3>独立交付</h3><p>完成 PRD、业务架构、交互原型、视觉规范、Agent 设计、前端开发与部署，2026 年 3 月上线 V1。该版本现作为历史产品材料保留。</p></section></div>",
        "documents": ["prd", "design", "arch", "proto", "agent"],
        "showCurrentDesignSystem": false,
        "useLegacyMedia": true
      }
    ],
    "cover": "/public/images/nebula-hero-section.png",
    "media": [
      {
        "type": "image",
        "src": "/public/images/nebula-hero-section.png",
        "title": "Project Nebula 首页视觉",
        "titleEn": "Project Nebula homepage visual",
        "alt": "Project Nebula 初版首页视觉",
        "altEn": "Original Project Nebula homepage visual"
      },
      {
        "type": "image",
        "src": "/public/images/nebula-capability-planets-overview.png",
        "title": "能力星球总览",
        "titleEn": "Capability planets overview",
        "alt": "Project Nebula 能力星球结构总览",
        "altEn": "Project Nebula capability system overview"
      },
      {
        "type": "image",
        "src": "/public/images/nebula-ai-singularity.png",
        "title": "个人奇点页面",
        "titleEn": "Personal singularity page",
        "alt": "Project Nebula 个人奇点页面",
        "altEn": "Project Nebula personal singularity page"
      },
      {
        "type": "image",
        "src": "/public/images/nebula-star-workshop.png",
        "title": "星工场作品页",
        "titleEn": "Star workshop projects page",
        "alt": "Project Nebula 星工场作品页",
        "altEn": "Project Nebula project showcase page"
      },
      {
        "type": "image",
        "src": "/public/images/nebula-agent-invocation-flow.png",
        "title": "Agent 调用流程",
        "titleEn": "Agent invocation flow",
        "alt": "Project Nebula Agent 调用流程图",
        "altEn": "Project Nebula Agent invocation flow"
      },
      {
        "type": "image",
        "src": "/public/images/nebula-user-browsing-flow.png",
        "title": "用户浏览流程",
        "titleEn": "Visitor browsing flow",
        "alt": "Project Nebula 用户浏览路径流程图",
        "altEn": "Project Nebula visitor browsing flow"
      },
      {
        "type": "image",
        "src": "/public/images/nebula-product-generation-flow.jpg",
        "title": "产品生成流程",
        "titleEn": "Product generation flow",
        "alt": "Project Nebula 产品生成流程示意",
        "altEn": "Project Nebula product generation workflow"
      },
      {
        "type": "video",
        "src": "https://www.bilibili.com/video/BV11TXPBUEtK/",
        "embedUrl": "https://player.bilibili.com/player.html?bvid=BV11TXPBUEtK&autoplay=0",
        "title": "Project Nebula V1 历史演示",
        "titleEn": "Project Nebula V1 archival demo",
        "alt": "Project Nebula 产品演示视频",
        "altEn": "Project Nebula product demo video"
      }
    ],
    "body": "<div class=\"project-story\"><section><h3>产品机会</h3><p>单页简历适合快速筛选，项目中的判断、交付与复盘需要更大的阅读空间。我把展示站设计成两条路径：先快速理解定位，再按兴趣展开案例。</p></section><section><h3>视觉与组件</h3><p>独立编写视觉方案、组件规范和交互设计。将主题色、字级与空间层次落实到卡片、按钮、抽屉和媒体查看器，再用共享组件支撑景观白绿和神秘宇宙两套主题。</p></section><section><h3>独立交付</h3><p>从 PRD、信息架构、UI/UX 到 AI 辅助开发、测试与部署均独立完成。2026 年 3 月上线 V1。</p></section><section><h3>V1 到 V2</h3><p>V1 将 Coze、知识库与 RAG 接入数字分身，用于回答项目与经历问题。V2 根据实际阅读问题缩短浏览路径，重组项目详情。当前网站继续迭代，数字分身已暂停。</p></section><section><h3>复盘</h3><p>首屏要让人快速知道可以从哪里读起。主题表达、项目深度和问答都可以建立在明确的浏览路径上。</p></section></div>",
    "documents": [],
    "video": "https://www.bilibili.com/video/BV11TXPBUEtK/"
  }
];
