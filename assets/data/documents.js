// Edit full text in the multiline body fields below.
export const documents = {
  "prd": {
    "type": "PRD",
    "title": "Project Nebula · 展示版产品需求文档",
    "url": "https://www.notion.so/Project-Nebula-PRD-330f9432042e816e9b28dd4596ec2b9e",
    "body": `<div class="dr-doc-content">
          <h2>一、产品定位与目标</h2>
          <h3>核心问题</h3>
          <p>传统简历只能静态呈现经历，无法有效展示 AI 时代真正关键的能力——是否具备 AI 产品思维、是否理解大模型边界、是否能把想法落地成可用产品。</p>
          <h3>一句话定位</h3>
          <p>一个以「能力星球系统」为核心交互界面的个人 AI 展示站——<strong>可探索、可交互、可对话的个人 AI 产品样机。</strong></p>
          <h3>产品目标</h3>
          <ul>
            <li>以高辨识度的产品形态替代传统简历式展示</li>
            <li>通过页面结构、交互逻辑与 Agent 能力，体现 AI 产品方向的系统思考与工程化落地能力</li>
            <li>让访问者在较短时间内建立对个人能力结构、作品体系与认知框架的整体认知</li>
            <li>为后续接入资料库、检索与 RAG 提供可扩展的产品框架</li>
          </ul>
          <div class="dr-tag-row">
            <span class="dr-tag">产品定位</span>
            <span class="dr-tag">AI 展示站</span>
            <span class="dr-tag">数字分身</span>
          </div>

          <h2>二、信息架构</h2>
          <h3>三层结构</h3>
          <ul>
            <li><strong>第一层 · 首屏引导页</strong>：建立气质与进入仪式感，5 秒自动切换</li>
            <li><strong>第二层 · 能力星球总览</strong>：星系结构直观表达个人能力系统，非线性导航</li>
            <li><strong>第三层 · 内容详情页系统</strong>：五颗星球各承载独立内容页，深度浏览与消费</li>
          </ul>
          <h3>星球定义</h3>
          <ul>
            <li><strong>AI 奇点 Singularity</strong>：数字分身与 Agent 核心，全局悬浮常驻</li>
            <li><strong>星工场 Forge</strong>：AI 作品与 MVP 展示，Builder 落地能力</li>
            <li><strong>造物星 Construct</strong>：规范化产品输出，PRD / 架构图 / 原型</li>
            <li><strong>聚变星 Fusion</strong>：过往履历结构化重构，可迁移能力模型</li>
            <li><strong>脉冲星 Pulsar</strong>：持续学习与独立判断，认知系统输出</li>
          </ul>
          <h3>探索顺序</h3>
          <p>AI 奇点 → 星工场 → 造物星 → 聚变星 → 脉冲星 → 联络中枢</p>
          <div class="dr-tag-row">
            <span class="dr-tag">信息架构</span>
            <span class="dr-tag">星球系统</span>
            <span class="dr-tag">叙事逻辑</span>
          </div>

          <h2>三、核心交互逻辑</h2>
          <h3>首屏引导</h3>
          <p>点击任意区域或停留 5 秒后自动切换至星球总览；发光标签组轻量露出身份亮点。</p>
          <h3>星球总览</h3>
          <ul>
            <li><strong>未查看星球</strong>：熄灭状态，亮度收敛</li>
            <li><strong>已查看星球</strong>：点亮状态，光环持续增强</li>
            <li>悬停触发：放大 + 发光增强 + 悬停文案</li>
            <li>点击行星：跳转对应内容详情页</li>
          </ul>
          <h3>内容详情页</h3>
          <ul>
            <li>顶部：返回能力星球按钮</li>
            <li>底部：探索下一个星球 + 返回上一站</li>
            <li>固定：底部联络中枢模块 + 全局悬浮 Agent</li>
          </ul>
          <h3>全局悬浮 Agent</h3>
          <p>以悬浮按钮形式固定于所有页面右下角，首次打开自动发送欢迎语，支持预设快捷问题与自由输入，接口预留后续接入 Coze / RAG。</p>
          <div class="dr-tag-row">
            <span class="dr-tag">交互逻辑</span>
            <span class="dr-tag">状态管理</span>
            <span class="dr-tag">Agent 接入</span>
          </div>

          <h2>四、技术实现路径</h2>
          <h3>工具链（Workflow Stack）</h3>
          <ul>
            <li><strong>方案共创</strong>：GPT / Gemini — 需求拆解、PRD 撰写、Prompt 迭代</li>
            <li><strong>视觉探索</strong>：Google Stitch — 前端风格方向</li>
            <li><strong>原型生成</strong>：Claude — 概念验证、前端代码生成</li>
            <li><strong>代码精修</strong>：Cursor / Codex — 代码融合、局部重构</li>
            <li><strong>Agent 搭建</strong>：Coze — 问答 Agent、知识库、RAG 接入</li>
            <li><strong>发布迭代</strong>：GitHub + Cloudflare Pages</li>
          </ul>
          <h3>版本规划</h3>
          <ul>
            <li><strong>V1（当前）</strong>：完整可运行版，5 页内容 + Agent 入口 + 部署上线</li>
            <li><strong>V2</strong>：增强交互，Agent 接入真实知识内容，探索进度反馈</li>
            <li><strong>V3</strong>：完整数字分身体验，RAG 能力接入，内容与 Agent 联动</li>
          </ul>
          <div class="dr-tag-row">
            <span class="dr-tag">工具链</span>
            <span class="dr-tag">版本规划</span>
            <span class="dr-tag">工程规范</span>
          </div>
          <p>📎 完整版 PRD 见 Notion 原文 ↗</p>
        </div>
      `,
    "historical": true
  },
  "design": {
    "type": "Design System",
    "title": "复古宇宙神秘风格 UI/UX 设计指南",
    "url": "https://heying-project-nebula.pages.dev/design-system",
    "body": `<div class="dr-doc-content">
          <h2>一、设计背景与目标</h2>
          <p>在 Project Nebula 的前端开发过程中，为解决多轮迭代中出现的视觉偏移与色彩不一致问题，先行输出一份完整的 UI 设计系统作为"视觉宪法"，确保整个产品在任何页面、任何组件上都保持统一的复古宇宙神秘美学。</p>
          <div class="dr-tag-row">
            <span class="dr-tag">设计系统</span>
            <span class="dr-tag">视觉规范</span>
            <span class="dr-tag">复古宇宙风</span>
          </div>
          <h2>二、色彩系统</h2>
          <h3>背景色族</h3>
          <ul>
            <li><strong>虚空黑 #080604</strong>：最深底色，全局背景</li>
            <li><strong>宇宙黑 #0F0B07</strong>：主背景，页面基础色</li>
            <li><strong>星云黑 #171108</strong>：卡片底色，内容区背景</li>
            <li><strong>晨曦黑 #201A0F</strong>：悬浮层，交互态背景</li>
          </ul>
          <h3>白金主色族</h3>
          <ul>
            <li><strong>月光白金 #F8F0D0</strong>：顶级强调，最亮文字</li>
            <li><strong>象牙白金 #F2E8B4</strong>：主标题，核心文字</li>
            <li><strong>浅金 #E4D080</strong>：次标题，说明文字</li>
            <li><strong>正金 #D0B84A</strong>：主 UI 元素，边框高亮</li>
            <li><strong>中金 #B09430</strong>：分割线，辅助边框</li>
          </ul>
          <h3>点缀色</h3>
          <ul>
            <li><strong>灼铜 #E86A28</strong>：CTA 按钮，最强视觉焦点</li>
            <li><strong>玫瑰浅金 #E8A080</strong>：轻柔高亮，造物星专属</li>
          </ul>
          <div class="dr-tag-row">
            <span class="dr-tag">黄金主色</span>
            <span class="dr-tag">铜橙点缀</span>
            <span class="dr-tag">深空背景</span>
          </div>
          <h2>三、字体系统</h2>
          <ul>
            <li><strong>Cinzel / Cinzel Decorative</strong>：标题、导航、英文装饰，古典神秘感</li>
            <li><strong>Cormorant Garamond</strong>：引语、长文阅读，优雅衬线体</li>
            <li><strong>Noto Serif SC</strong>：中文正文，与英文衬线协调统一</li>
          </ul>
          <h2>四、核心组件规范</h2>
          <h3>卡片</h3>
          <p>背景 bg-surface，边框 rgba(208,184,74,.15)，hover 边框升至 .3 + translateY(-2px) 轻浮动。</p>
          <h3>按钮</h3>
          <ul>
            <li><strong>主按钮</strong>：金色半透明底 + 金色边框，hover 发光晕散</li>
            <li><strong>轮廓按钮</strong>：透明底 + 金色边框，hover 背景加深</li>
          </ul>
          <h3>各页独立色调</h3>
          <ul>
            <li><strong>AI奇点</strong>：星光白金 + 淡铜光晕</li>
            <li><strong>星工场</strong>：灼铜橙 #E86A28</li>
            <li><strong>造物星</strong>：玫瑰金 #E8A080</li>
            <li><strong>聚变星</strong>：纯正暖金 #E4D080</li>
            <li><strong>脉冲星</strong>：深琥珀 #B09430</li>
          </ul>
          <div class="dr-tag-row">
            <span class="dr-tag">组件规范</span>
            <span class="dr-tag">交互状态</span>
            <span class="dr-tag">分页色彩</span>
          </div>
          <p>📎 完整可交互版设计指南见在线预览（链接待填写）</p>
        </div>
      `,
    "historical": true
  },
  "arch": {
    "type": "Architecture",
    "title": "业务架构 & 系统设计",
    "url": "https://heying-project-nebula.pages.dev/public/images/arch-3layer.svg",
    "body": `<div class="dr-img-wrap">

          <div class="dr-doc-content">
            <h2>三层叙事架构</h2>
            <p>产品整体分为三层：展示层建立第一印象，叙事层展现产品思维深度，Agent 层实现可对话的个人产品。</p>
          </div>
          <img src="/public/images/arch-3layer.svg" alt="三层叙事架构" loading="lazy">

          <div class="dr-doc-content">
            <h2>极客工具流 · Workflow Stack</h2>
            <p>从方案共创到发布迭代的完整 AI 工具链，每个阶段选用最合适的工具，形成高效的 AI 协同工作流。</p>
          </div>
          <img src="/public/images/arch-workflow.svg" alt="Workflow Stack" loading="lazy">

          <div class="dr-doc-content">
            <h2>用户浏览流程图</h2>
            <p>向访问者说明如何使用本站，从首屏进入到探索各星球内容的完整路径。</p>
          </div>
          <img src="/public/images/nebula-user-browsing-flow.png" alt="用户浏览流程图" loading="lazy">

          <div class="dr-doc-content">
            <h2>Agent 调用流程图</h2>
            <p>数字分身 Agent 的底层运行逻辑：从用户提问到知识库检索、结果生成的完整调用链路。</p>
          </div>
          <img src="/public/images/nebula-agent-invocation-flow.png" alt="Agent调用流程图" loading="lazy">

          <div class="dr-doc-content">
            <h2>产品生成流程图</h2>
            <p>整个产品从想法到上线的工具链流程，展示 AI 工作流协同产出的完整路径。</p>
          </div>
          <img src="/public/images/nebula-product-generation-flow.jpg" alt="产品生成流程图" loading="lazy">

          <div class="dr-tag-row">
            <span class="dr-tag">产品架构</span>
            <span class="dr-tag">工具链设计</span>
            <span class="dr-tag">流程梳理</span>
          </div>
        </div>
      `,
    "historical": true
  },
  "proto": {
    "type": "Prototype",
    "title": "高保真交互原型 · 全页面覆盖",
    "url": "https://heying-project-nebula.pages.dev/public/images/nebula-hero-section.png",
    "body": `<div class="dr-img-wrap">

          <div class="dr-doc-content">
            <h2>首屏欢迎页</h2>
            <p>极简文案建立气质，发光标签组轻量露出身份亮点，5秒自动过渡至星球总览。</p>
          </div>
          <img src="/public/images/nebula-hero-section.png" alt="首屏欢迎页原型" loading="lazy">

          <div class="dr-doc-content">
            <h2>能力星球总览页</h2>
            <p>以星系结构直观表达个人能力系统，中心恒星为 AI 奇点，4颗环绕行星各对应内容模块。</p>
          </div>
          <img src="/public/images/nebula-capability-planets-overview.png" alt="能力星球总览原型" loading="lazy">

          <div class="dr-doc-content">
            <h2>AI 奇点内容页</h2>
            <p>个人信息、能力标签、技能矩阵与数字分身聊天入口，左右版式均衡展示。</p>
          </div>
          <img src="/public/images/nebula-ai-singularity.png" alt="AI奇点页原型" loading="lazy">

          <div class="dr-doc-content">
            <h2>星工场内容页</h2>
            <p>AI 作品画廊形式展示，每张卡片包含项目封面、描述与外链入口。</p>
          </div>
          <img src="/public/images/nebula-star-workshop.png" alt="星工场页原型" loading="lazy">

          <div class="dr-doc-content">
            <h2>造物星内容页</h2>
            <p>产品文档画廊，点击可进入沉浸式文档阅读器查看 PRD、设计系统、架构图与原型图。</p>
          </div>
          <img src="/public/images/nebula-creator-planet.png" alt="造物星页原型" loading="lazy">

          <div class="dr-doc-content">
            <h2>聚变星内容页</h2>
            <p>左右时间轴结构，三段经历配合数字强化指标，呈现可迁移的底层能力模型。</p>
          </div>
          <img src="/public/images/nebula-fusion-planet.png" alt="聚变星页原型" loading="lazy">

          <div class="dr-doc-content">
            <h2>脉冲星内容页</h2>
            <p>洞察列表行 + 右侧滑出阅读抽屉，支持外链直达，展示持续输入与独立判断能力。</p>
          </div>
          <img src="/public/images/nebula-pulse-star.png" alt="脉冲星页原型" loading="lazy">

          <div class="dr-tag-row">
            <span class="dr-tag">规范输出</span>
            <span class="dr-tag">全页面覆盖</span>
            <span class="dr-tag">产品闭环</span>
          </div>
        </div>
      `,
    "historical": true
  },
  "agent": {
    "type": "Agent Design",
    "title": "个人数字分身 Agent 架构设计与落地指南",
    "url": "https://www.notion.so/Agent-32ff9432042e811cb110dde47c15e4a5",
    "body": `<div class="dr-doc-content">
          <h2>一、数据层：语料工程与 RAG 准备</h2>
          <h3>知识库信息架构</h3>
          <p>摒弃直接导入 PDF 的方案，通过 Notion 网页端建立四维知识库底座：</p>
          <ul>
            <li><strong>基础事实库</strong>：教育背景、履历时间轴、基本身份信息</li>
            <li><strong>深度战绩库</strong>：过往核心项目复盘与关键数据指标</li>
            <li><strong>行业认知库</strong>：AI PM 岗位理解、大模型边界与跨行业迁移优势</li>
            <li><strong>高频 Q&amp;A 库</strong>：针对面试核心关注点的预设攻防题库</li>
          </ul>
          <h3>格式规范与单点真实（SSOT）</h3>
          <p>所有底层语料统一采用 <strong>Markdown</strong> 格式，以 Notion 作为单一数据源。利用 Markdown 标题层级（H1/H2/H3）确保向量化切片时的最高语义连贯性，降低上下文丢失。</p>
          <h3>语料清洗管线</h3>
          <p>引入 Claude 作为语料预处理工具，通过结构化提取 Prompt 自动过滤冗余信息，完成数据降噪、打标与 Markdown 格式化重构。</p>
          <div class="dr-tag-row">
            <span class="dr-tag">RAG 工程</span>
            <span class="dr-tag">知识库架构</span>
            <span class="dr-tag">语料工程</span>
          </div>

          <h2>二、模型层：智能体中枢构建</h2>
          <h3>底层模型选型</h3>
          <p>基于 Coze（国内版）构建智能体核心。选用 <strong>Doubao-pro-32k</strong>，在保证逻辑推理能力的前提下，追求极致的首字响应时间，优化实时交互体验。</p>
          <h3>四重护栏设计</h3>
          <ul>
            <li><strong>防幻觉策略</strong>：强制 Closed-QA 机制，严格约束模型仅基于知识库作答，遇到盲区触发标准化兜底话术</li>
            <li><strong>身份一致性</strong>：锁定"数字分身与面试助理"人设，对闲聊或角色扮演类指令进行柔性拦截</li>
            <li><strong>输出格式规范</strong>：全局约束输出"总分结构"或"Bullet Points"，确保沟通的极简与高效</li>
            <li><strong>防越狱补丁</strong>：对试图覆盖设定的指令进行硬性拒绝并纠偏</li>
          </ul>
          <h3>工作流设计</h3>
          <p>接收意图 → RAG 向量检索 → 提取数据支撑 → 结构化输出 → <strong>主动抛出引导性追问</strong>，化被动问答为主动业务推演。</p>
          <h3>检索策略</h3>
          <p>建立 Coze 与 Notion 的 API 动态直连，实现语料实时热更新；采用智能自动分段，依托 Markdown 语法树实现高精度向量召回。</p>
          <div class="dr-tag-row">
            <span class="dr-tag">Prompt 工程</span>
            <span class="dr-tag">防幻觉策略</span>
            <span class="dr-tag">Workflow 设计</span>
          </div>

          <h2>三、接入层：工程集成与性能调优</h2>
          <h3>前端架构融合</h3>
          <p>采用 Web SDK 方案进行端侧接入，将 Agent 接口模块化注入前端应用，实现 UI 层与业务逻辑层的无缝解耦。</p>
          <h3>三项性能优化</h3>
          <ul>
            <li><strong>流式输出</strong>：全链路开启 Streaming 模式，打字机效果将体感响应时间压缩至 &lt;1s</li>
            <li><strong>网络预建连</strong>：前端声明 preconnect 策略，提前完成 API 域名 DNS 解析与 TLS 握手</li>
            <li><strong>召回阈值调优</strong>：RAG 最大召回分段数限制在 Top 3-5，平衡上下文丰富度与推理延迟</li>
          </ul>
          <div class="dr-tag-row">
            <span class="dr-tag">Web SDK 接入</span>
            <span class="dr-tag">流式输出</span>
            <span class="dr-tag">性能调优</span>
          </div>
          <p>📎 完整版文档见 Notion 原文 ↗</p>
        </div>
      `,
    "historical": false
  },
  "paper": {
    "type": "Design System",
    "title": "宣纸风设计规范",
    "url": "/design-system.html",
    "body": `<h2>视觉与阅读</h2><p>宣纸暖白作为全站底色，墨灰正文与低饱和朱砂构成阅读层级。左侧目录保持定位，正文连续展示，详情统一在右侧抽屉阅读。</p><h2>设计变量</h2><p>底色 #F6F3EB；主文字 #292824；次要文字 #77736B；强调色 #A6503C。字号、间距、内容宽度均在 tokens.css 统一管理。</p><h2>交互规范</h2><p>目录锚点定位与滚动高亮；抽屉支持 Esc、遮罩关闭、焦点约束与返回原位置；移动端使用折叠目录和全屏详情。</p>`
  }
};
