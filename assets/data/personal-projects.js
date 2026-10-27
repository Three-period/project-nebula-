// Current personal projects. Historic bodies remain in documents.js.
export const personalProjects = [
  {
    "id": "personal-nebula",
    "title": "Project Nebula｜个人 AI 在线简历",
    "year": "2026.02—至今",
    "type": "个人项目",
    "stage": "初版已上线 · 数字分身维修",
    "tags": [
      "AI 产品",
      "独立交付",
      "Agent / RAG",
      "版本迭代"
    ],
    "description": "将传统 PDF 简历转化为可交互的个人 AI 产品。",
    "body": "<div class=\"project-story\"><p><strong>产品定义与需求分析：</strong>围绕招聘场景下的信息展示与交互需求，重新设计简历的信息组织及交互方式，构建集项目展示、能力介绍与智能问答于一体的 AI 产品。</p><p><strong>全栈独立交付：</strong>完成 PRD 撰写、信息架构设计、前端开发、视觉系统搭建与部署上线，结合 GPT、Claude、Codex、Coze、GitHub 与 Cloudflare Pages，以零平台托管费用完成产品初版交付。</p><p><strong>Agent 与 RAG 应用实践：</strong>基于 Coze 构建 AI 数字分身，设计知识库结构与 System Prompt 约束，支持个人经历智能问答，并通过对话日志分析优化回复质量。</p><p><strong>产品体验与版本迭代：</strong>针对 V1 信息嵌套复杂、阅读路径冗长及 AI 回答不流畅等问题，重构 V2 信息架构，将多级嵌套调整为平铺式布局，优化内容检索与交互体验。</p></div>",
    "document": "prd",
    "video": "https://www.bilibili.com/video/BV11TXPBUEtK/",
    "external": "https://heying-project-nebula.pages.dev/",
    "historicalDescription": "将传统简历升级为可探索、可交互、可对话的 AI 产品样机。独立完成产品定义、PRD、前端实现与 Agent 接入，验证\"0 成本走通完整 AI 产品交付\"的产品命题。"
  },
  {
    "id": "personal-agent",
    "title": "个人数字分身 Agent · 从 0 到 1 搭建全流程",
    "year": "2025（历史资料）",
    "type": "个人项目",
    "stage": "历史项目 · 当前维修",
    "tags": [
      "RAG 工程化",
      "Prompt 设计",
      "Agent 落地"
    ],
    "description": "基于 Coze 平台搭建的个人 AI 面试助理——完整涵盖数据层语料工程、模型层四重护栏设计、前端 Web SDK 接入与性能调优，实现可对话的数字分身产品。",
    "body": "<div class=\"project-story\"><p><strong>历史项目介绍：</strong>基于 Coze 平台搭建的个人 AI 面试助理——完整涵盖数据层语料工程、模型层四重护栏设计、前端 Web SDK 接入与性能调优，实现可对话的数字分身产品。</p><p><strong>历史工具流：</strong>工具流：Coze · Notion · Doubao-pro-32k · RAG · Web SDK</p></div>",
    "document": "agent",
    "historical": true
  }
];
