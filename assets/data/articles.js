// Edit full text in the multiline body fields below.
export const articles = [
  {
    "en": "Model Insight · 2026.03",
    "title": "主流大模型能力边界对比：GPT / Claude / DeepSeek / 豆包",
    "tags": [
      "模型选型",
      "能力边界",
      "AI 产品判断"
    ],
    "body": `<h2>核心观点</h2>
        <p>大模型的竞争壁垒，不是谁"更聪明"，而是谁能在"对的场景"用"对的成本"解决"真实问题"。选型不是技术选择，是业务决策。</p>
        <h3>四款模型定位</h3>
        <ul>
          <li><strong>GPT-4o</strong>：通才型，多模态广度最全面，品牌认知最强，适合快速原型生成与 API 集成</li>
          <li><strong>Claude 3.5 Sonnet</strong>：长文本理解和逻辑推理最强，输出稳定性高，200K 上下文窗口，B 端文档场景首选</li>
          <li><strong>DeepSeek-R1</strong>：数学/代码/推理接近 o1 正式版，API 定价为 OpenAI 的 1/30，开源策略重塑全球竞争格局</li>
          <li><strong>豆包</strong>：依托字节系流量优势低成本获客，深度集成手机系统，C 端日常助理场景首选</li>
        </ul>
        <h3>PM 选型判断框架</h3>
        <ul>
          <li><strong>高频 API + 成本敏感</strong>：选 DeepSeek，性价比极致，国内延迟低</li>
          <li><strong>长文档 / 知识库 RAG</strong>：选 Claude 3.5，长上下文 + 输出格式最可控</li>
          <li><strong>Agent 工作流稳定性</strong>：选 Claude 3.5，Tool Use 文档完善，输出可预期</li>
          <li><strong>C 端产品原型</strong>：选 GPT-4o，多模态能力最全面</li>
          <li><strong>专业推理/数学代码</strong>：选 DeepSeek-R1，质量接近 o1，成本极低</li>
        </ul>
        <h3>核心判断</h3>
        <p>四款模型各有定位，并非强弱之分而是场景适配之分。对 AI PM 的核心启示：<em>先锁定场景，再匹配模型，再算成本。</em></p>
        <div class="fd-placeholder-note">🔎 完整对比分析见 Notion 原文记录</div>
      `,
    "summary": "从 PM 选型视角对比四款主流大模型的能力边界、擅长方向与成本结构，给出场景化选型判断框架。",
    "url": "https://www.notion.so/GPT-Claude-DeepSeek-330f9432042e817ea2e5c4fb473b021e",
    "sample": false
  },
  {
    "en": "AI Insight · 2026.03",
    "title": "Agent vs Workflow：AI 产品落地的两种核心范式",
    "tags": [
      "Agent",
      "Workflow",
      "AI 产品设计"
    ],
    "body": `<h2>核心观点</h2>
        <p>Agent 和 Workflow 不是非此即彼的关系，而是 AI 产品落地的两种互补范式。真正有价值的产品设计，往往是让两者在合适的位置各司其职。</p>
        <h3>两种范式的本质差异</h3>
        <p><strong>Agent（智能体）</strong>：有独立思考和行动能力的数字员工。公式：大脑（LLM）+ 记忆（Memory）+ 规划（Planning）+ 工具（Function Call）。更灵活、更智能，适合开放性、创意性、个性化场景。</p>
        <p><strong>Workflow（工作流）</strong>：在后台把 AI 的每一步都固定成流水线。更可控、更稳定、更准确，适合财务审批、法务合同分析等需要严格约束的场景。</p>
        <h3>最优解：Agentic Workflow</h3>
        <ul>
          <li><strong>Workflow 嵌套 Agent</strong>：大框架固定，小节点自由。适合企业级 B 端应用——如智能客服，整体流程固定但判断节点由 Agent 自主决策</li>
          <li><strong>Agent 调用 Workflow</strong>：大方向自由，敏感操作固定。适合 C 端个人助理——如旅行助理，自由规划行程但支付环节走固定安全流程</li>
        </ul>
        <h3>对 AI PM 的启示</h3>
        <p>核心判断标准：<em>这个节点的输出，能接受多大程度的不确定性？</em> 场景越开放偏 Agent，场景越标准偏 Workflow，大多数企业级应用走 Agentic Workflow。</p>
        <div class="fd-placeholder-note">🔎 完整内容见 Notion 原文</div>
      `,
    "summary": "从 AI PM 视角拆解 Agent 与 Workflow 的本质差异、嵌套玩法与选型判断标准。",
    "url": "https://www.notion.so/Agent-vs-Workflow-AI-bc97445e7ad7441c881722e928ab97dc",
    "sample": false
  },
  {
    "en": "PM Insight · 2026.03",
    "title": "AI PM 如何识别业务中的 AI 切入点：MAIR 模型",
    "tags": [
      "MAIR 模型",
      "AI PM",
      "需求挖掘"
    ],
    "body": `<h2>核心方法论：MAIR 模型</h2>
        <p>MAIR 模型是识别业务中 AI 切入点的核心框架，核心逻辑是「<strong>先僵化，再固化，再优化</strong>」。</p>
        <h3>四步流程</h3>
        <ul>
          <li><strong>M — Map Business Processes</strong>：完整拆解现有业务的每一个操作步骤</li>
          <li><strong>A — Assess Mental Labor</strong>：找出依赖人工判断、理解、创作的脑力劳动环节</li>
          <li><strong>I — Identify Value</strong>：评估脑力环节的频次、耗时和替代价值——高频 + 重复 + 可归纳 + 有历史样本，是 AI 切入的黄金组合</li>
          <li><strong>R — Replace with AI</strong>：设计具体的 AI 替代路径——Prompt 模板、Workflow 还是完整 Agent</li>
        </ul>
        <h3>AI PM 核心能力认知</h3>
        <p><strong>核心公式：场景 + AI 能力 + 需求满足 = 新产品</strong></p>
        <p>关注核心指标：任务成功率（Task Success Rate）、用户意图命中率、每次请求的 Token 成本利润率。</p>
        <p>AI PM 与传统 PM 的核心差异：需要额外判断「这个场景适不适合上 AI、模型能力能不能支撑、知识库和工作流要怎么设计」——关注的不只是功能，而是 AI 能否在业务里稳定运转。</p>
        <h3>验证 AI 替代是否成功</h3>
        <ul>
          <li><strong>双盲法</strong>：AI 输出给下一工序，若无负向反馈则验证通过</li>
          <li><strong>数据法</strong>：进入实际流程后关键指标波动在可接受范围内则验证通过</li>
        </ul>
        <div class="fd-placeholder-note">🔎 完整内容见 Notion 原文</div>
      `,
    "summary": "MAIR 四步法拆解业务中的 AI 机会点，结合 AI PM 核心能力认知与验证方法论。",
    "url": "https://www.notion.so/AI-PM-AI-MAIR-5dc84e875e9c4421b3817291162c318a",
    "sample": false
  },
  {
    "en": "Product Teardown · 2026.03",
    "title": "产品拆解：Perplexity 的 3 大体验壁垒",
    "tags": [
      "产品拆解",
      "搜索产品",
      "CUI 设计"
    ],
    "body": `<h2>核心观点</h2>
        <p>Perplexity 的本质不是"更好的搜索引擎"，而是一个<strong>答案生成界面</strong>——它把传统搜索的"找链接"变成了"得答案"。但这个转变带来了三个值得关注的体验壁垒。</p>
        <h3>壁垒一：信任断层</h3>
        <p>用户看到答案，但不确定来源是否可信。传统搜索通过 URL 列表建立可信度；Perplexity 的行内引用虽然存在，但视觉权重不足，导致<em>信任成本反而更高</em>。</p>
        <h3>壁垒二：追问路径不清晰</h3>
        <p>当答案不完整时，用户不知道该如何追问。界面缺乏明显的"深入探索"引导，导致会话深度浅、用户容易离开。</p>
        <h3>壁垒三：与习惯的摩擦</h3>
        <blockquote>用户十年的搜索肌肉记忆是"输入关键词→扫描链接"，Perplexity 要求用户切换为"提问→阅读段落"，改变成本被严重低估。</blockquote>
        <h2>产品启示</h2>
        <ul>
          <li>AI 产品的核心挑战不只是技术，更是<strong>习惯迁移的设计</strong></li>
          <li>信任构建需要显性化，不能依赖用户自己去找引用</li>
          <li>会话深度是 AI 搜索产品的核心留存指标</li>
        </ul>
        <div class="fd-placeholder-note">📌 这是示范性内容，替换为你的真实文章后删除此提示。</div>
      `,
    "summary": "从产品交互视角分析自然语言 UI 如何重塑搜索链路，以及 CUI 体验设计对用户留存的影响。",
    "url": null,
    "sample": true
  },
  {
    "en": "Model Insight · 2026.02",
    "title": "认知图谱：主流大模型能力边界与适用场景对比",
    "tags": [
      "模型评估",
      "选型策略",
      "能力边界"
    ],
    "body": `<h2>核心框架</h2>
        <p>评估一个大模型，不应只问"它能做什么"，而应问<strong>"它在什么条件下、以什么质量做什么"</strong>——这三个维度决定了选型的真实可靠性。</p>
        <h3>维度一：一致性</h3>
        <p>相同输入是否产生稳定输出？这决定了产品能否在生产环境中被信任。GPT-4o 在创意类任务上方差大，Claude 在逻辑推理上一致性更强。</p>
        <h3>维度二：成本效益比</h3>
        <p>不同模型的 API 调用成本差异可达 10 倍以上。对于高频、低复杂度任务，使用顶级模型是资源浪费；<em>国内模型在中文语境下的性价比被严重低估</em>。</p>
        <h3>维度三：工具调用稳定性</h3>
        <blockquote>Agent 产品的可靠性上限，取决于最弱一环的 Tool Use 稳定性，而不是模型的智能水平。</blockquote>
        <h2>选型建议</h2>
        <ul>
          <li><strong>创意生成 / 长文写作</strong>：Claude 3.5 Sonnet</li>
          <li><strong>复杂推理 / 代码</strong>：GPT-4o / o1</li>
          <li><strong>高频中文任务</strong>：Qwen / DeepSeek（成本优势显著）</li>
          <li><strong>Agent 工作流</strong>：优先考虑 Tool Use 文档完善度</li>
        </ul>
        <div class="fd-placeholder-note">📌 这是示范性内容，替换为你的真实分析后删除此提示。</div>
      `,
    "summary": "盘点 GPT-4o / Claude 3.5 / 国内大模型的选型策略与 API 调用成本分析，为产品选型提供判断依据。",
    "url": null,
    "sample": true
  },
  {
    "en": "Industry Signal · 2026.01",
    "title": "商业思考：AI 产品的壁垒在数据还是工作流？",
    "tags": [
      "商业化路径",
      "B 端产品",
      "PMF 验证"
    ],
    "body": `<h2>核心命题</h2>
        <p>AI 产品的竞争壁垒，究竟是<strong>数据</strong>（谁拥有更多私有数据）还是<strong>工作流**（谁更深度嵌入业务流程）？这个判断直接决定产品战略方向。</strong></p>
        <h3>数据壁垒的局限</h3>
        <p>数据壁垒的假设成立前提是：数据难以复制、且对模型效果有决定性影响。但现实是——大模型的通用能力在快速抹平数据优势，<em>没有独特业务场景的数据积累意义有限</em>。</p>
        <h3>工作流壁垒的逻辑</h3>
        <p>当 AI 深度嵌入用户日常工作流程后，迁移成本极高。这类似于 SaaS 的"黏性"逻辑，但 AI 版本更强——因为它还带着用户的使用习惯和历史上下文。</p>
        <blockquote>真正的 AI 产品壁垒，不是你有多少数据，而是用户有多难离开你的工作流。</blockquote>
        <h2>对 B 端 AI 产品的启示</h2>
        <ul>
          <li>优先验证"嵌入哪个工作节点"，而非"积累哪类数据"</li>
          <li>PMF 的信号是用户<strong>不用你会痛苦</strong>，而不是用你会兴奋</li>
          <li>套壳产品的死亡方式：大模型能力更新后，包装层失去差异化价值</li>
        </ul>
        <div class="fd-placeholder-note">📌 这是示范性内容，替换为你的真实思考后删除此提示。</div>
      `,
    "summary": "探讨原生 AI 应用的 PMF 验证路径，拒绝盲目套壳，深入 B 端真实痛点与商业化路径探索。",
    "url": null,
    "sample": true
  }
];
