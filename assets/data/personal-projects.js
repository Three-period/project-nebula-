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
        "detail": {
          "highlights": [
            ["五个篇章", "重组内容与阅读入口"],
            ["双主题", "景观白绿与神秘宇宙"],
            ["中英双语", "主要内容与导航"]
          ],
          "sections": [
            ["项目概览", "V1 使用中暴露出浏览层级偏深的问题。V2 围绕招聘方的两项任务重构：快速了解定位与经历，再按需查阅项目细节和证据。"],
            ["我的职责与边界", "我独立完成信息架构重组、视觉交互、前端调整、测试和部署。数字分身因外部服务变化暂缓。"],
            ["让案例更快被找到", "将内容收进五个篇章，用目录、站内搜索和分层项目详情连接概览、案例和材料，减少在多层页面间反复跳转。"],
            ["复用组件，保留两套视觉语言", "用同一套卡片、按钮、抽屉和响应式规则支撑景观白绿与神秘宇宙，同步支持中英文、在线简历和媒体查看。"],
            ["结果", "V2 已更新到正式站。五个内容篇章、双主题、中英切换、站内搜索与在线简历均已提供。"],
            ["产品判断", "作品详情应把角色、成果和证据放在容易找到的位置。视觉特色可以贯穿整站，关键路径仍要按实际阅读任务设计。"]
          ]
        },
        "documents": [],
        "showCurrentDesignSystem": true,
        "useLegacyMedia": false
      },
      {
        "id": "v1",
        "label": "V1 · 数字分身版",
        "stage": "2026 年 3 月上线 · 历史版本",
        "description": "以能力星球为核心交互，将个人经历、项目材料与 Coze 数字分身整合为可探索、可交互、可对话的个人 AI 产品样机。",
        "detail": {
          "highlights": [
            ["2026.03", "V1 正式上线"],
            ["独立交付", "产品、设计、开发与部署"],
            ["Coze + RAG", "V1 数字分身"]
          ],
          "sections": [
            ["项目概览", "PDF 适合快速筛选，但很难同时呈现项目判断、交付证据和复盘。我面向真实求职场景，把项目与经历组织成可探索、可提问的展示站。"],
            ["我的职责与边界", "我独立完成定位、PRD、信息架构、视觉交互、AI 辅助开发和部署。数字分身使用 Coze 和外部模型服务。"],
            ["从能力星球到数字分身", "用星球导航串起经历、作品、产品材料和思考，再以 Coze、知识库与 RAG 承接问答。通过提示词明确身份、信息范围和回答结构。"],
            ["用真实求职场景检验", "把站点用于投递与项目沟通，观察招聘方如何寻找信息。星球导航有辨识度，但到达具体案例需要经过较多层级。"],
            ["结果", "V1 于 2026 年 3 月上线并用于实际求职。作品页保留这一版的原型、架构与演示视频。"],
            ["产品判断", "探索式界面能建立作品辨识度。招聘场景还要求读者快速找到重点，这一发现成了 V2 重构的起点。"]
          ]
        },
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
    "documents": [],
    "video": "https://www.bilibili.com/video/BV11TXPBUEtK/"
  }
];
