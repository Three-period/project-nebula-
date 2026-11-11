// Stored English translations for all original insight cards and full article bodies.
export const articleI18n = [
  {
    title: "Comparing Leading LLMs: GPT, Claude, DeepSeek, and Doubao",
    summary: "A product-manager's comparison of the capability boundaries, strengths, and cost structures of four leading models, with a scenario-based selection framework.",
    tags: ["Model Selection", "Capability Boundaries", "AI Product Judgment"],
    body: `<h2>Key Takeaway</h2>
      <p>The competitive edge of a large language model is not simply which one is “smarter,” but which model solves a real problem in the right scenario at the right cost. Model selection is a business decision, not just a technical choice.</p>
      <h3>Positioning of Four Models</h3>
      <ul>
        <li><strong>GPT-4o:</strong> A generalist with broad multimodal capabilities and strong brand recognition; suitable for rapid prototyping and API integration.</li>
        <li><strong>Claude 3.5 Sonnet:</strong> Strong at long-context comprehension and logical reasoning, with consistent output and a 200K context window; a strong choice for enterprise document scenarios.</li>
        <li><strong>DeepSeek-R1:</strong> Competitive with the released o1 model in mathematics, coding, and reasoning. Its API pricing was around 1/30 of OpenAI's at the time of writing, while its open-source strategy reshaped the competitive landscape.</li>
        <li><strong>Doubao:</strong> Benefits from ByteDance's distribution reach and low-cost acquisition, with deep mobile-system integration; suited to everyday consumer-assistant scenarios.</li>
      </ul>
      <h3>A Selection Framework for Product Managers</h3>
      <ul>
        <li><strong>High-volume APIs with cost sensitivity:</strong> Consider DeepSeek for its cost efficiency and low latency in China.</li>
        <li><strong>Long documents / knowledge-base RAG:</strong> Consider Claude 3.5 for its long context and controllable output format.</li>
        <li><strong>Agent workflow reliability:</strong> Consider Claude 3.5, whose Tool Use documentation is mature and behavior more predictable.</li>
        <li><strong>Consumer product prototypes:</strong> Consider GPT-4o for its broad multimodal capabilities.</li>
        <li><strong>Specialized reasoning, mathematics, and coding:</strong> Consider DeepSeek-R1 for its reasoning quality and low cost.</li>
      </ul>
      <h3>Product Judgment</h3>
      <p>These models serve different scenarios; the question is fit, not a universal ranking. The key lesson for an AI product manager is: <em>define the scenario first, match the model second, and calculate the cost third.</em></p>
      <div class="fd-placeholder-note">🔎 See the complete comparison in the original Notion notes.</div>`
  },
  {
    title: "Agent vs. Workflow: Two Core Paradigms for AI Product Delivery",
    summary: "An AI product manager's breakdown of the fundamental differences between Agents and Workflows, how they can be combined, and how to choose between them.",
    tags: ["Agent", "Workflow", "AI Product Design"],
    body: `<h2>Key Takeaway</h2>
      <p>Agent and Workflow are not mutually exclusive. They are complementary paradigms for delivering AI products. Strong product design lets each play the role it is best suited for.</p>
      <h3>The Fundamental Difference</h3>
      <p><strong>Agent:</strong> A digital worker with the ability to reason and act independently. A useful model is Brain (LLM) + Memory + Planning + Tools (Function Calls). It is more flexible and adaptive, making it suitable for open-ended, creative, and personalized scenarios.</p>
      <p><strong>Workflow:</strong> A predefined pipeline that fixes each AI step in advance. It is more controllable, stable, and predictable, making it suitable for scenarios with strict constraints, such as financial approvals and legal contract analysis.</p>
      <h3>A Practical Combination: Agentic Workflow</h3>
      <ul>
        <li><strong>Agent inside a Workflow:</strong> Keep the overall framework fixed while allowing selected steps to make autonomous decisions. Suitable for enterprise applications—for example, a service workflow with a fixed process but Agent-led decisions at specific checkpoints.</li>
        <li><strong>Workflow invoked by an Agent:</strong> Keep the high-level direction flexible while locking sensitive operations into fixed procedures. Suitable for personal assistants—for example, a travel assistant that plans freely but uses a fixed, secure process for payment.</li>
      </ul>
      <h3>Implications for AI Product Managers</h3>
      <p>The key question is: <em>How much uncertainty can the output of this step tolerate?</em> The more open-ended the scenario, the more it favors an Agent; the more standardized the scenario, the more it favors a Workflow. Most enterprise applications benefit from an Agentic Workflow.</p>
      <div class="fd-placeholder-note">🔎 See the full article in the original Notion document.</div>`
  },
  {
    title: "Finding AI Opportunities in Business: The MAIR Model",
    summary: "A four-step MAIR framework for identifying AI opportunities in business, combined with core AI product management capabilities and validation methods.",
    tags: ["MAIR Model", "AI Product Management", "Opportunity Discovery"],
    body: `<h2>Core Method: The MAIR Model</h2>
      <p>MAIR is a framework for identifying where AI can create value in a business. Its underlying logic is: <strong>standardize first, solidify the process, then optimize.</strong></p>
      <h3>Four Steps</h3>
      <ul>
        <li><strong>M — Map Business Processes:</strong> Break down every step in the existing business process.</li>
        <li><strong>A — Assess Mental Labor:</strong> Identify tasks that depend on human judgment, comprehension, or creation.</li>
        <li><strong>I — Identify Value:</strong> Evaluate the frequency, time cost, and substitution value of those cognitive tasks. High frequency + repetition + clear patterns + historical examples form a strong combination for AI adoption.</li>
        <li><strong>R — Replace with AI:</strong> Design a concrete replacement path: a Prompt template, a Workflow, or a full Agent.</li>
      </ul>
      <h3>Core Capabilities of an AI Product Manager</h3>
      <p><strong>Core formula: Scenario + AI Capability + User Need Fulfillment = New Product</strong></p>
      <p>Key metrics include Task Success Rate, user-intent match rate, and the unit economics of token cost per request.</p>
      <p>The key difference between an AI PM and a traditional PM is the additional need to judge whether a scenario is suitable for AI, whether model capabilities can support it, and how the knowledge base and workflow should be designed. The focus is not just on features, but on whether AI can operate reliably in the business.</p>
      <h3>Validating AI Substitution</h3>
      <ul>
        <li><strong>Blind review:</strong> Send AI output to the next stage of the process. If it receives no negative feedback, the substitution passes this check.</li>
        <li><strong>Metric-based validation:</strong> Once integrated into the real workflow, key metrics must remain within an acceptable range.</li>
      </ul>
      <div class="fd-placeholder-note">🔎 See the full article in the original Notion document.</div>`
  },
  {
    title: "Product Teardown: Perplexity's Three Experience Barriers",
    summary: "An interaction-design analysis of how natural-language UI reshapes the search journey and how conversational UI affects user retention.",
    tags: ["Product Teardown", "Search Products", "Conversational UI"],
    body: `<h2>Key Takeaway</h2>
      <p>Perplexity is not simply a “better search engine”; it is an <strong>answer-generation interface</strong>. It changes traditional search from “finding links” to “getting answers.” That shift, however, introduces three experience barriers worth examining.</p>
      <h3>Barrier 1: A Trust Gap</h3>
      <p>Users see an answer but may not know whether its sources are reliable. Traditional search builds confidence through a list of URLs. Perplexity provides inline citations, but their visual prominence can be too low, making the <em>cost of trust higher rather than lower</em>.</p>
      <h3>Barrier 2: An Unclear Follow-up Path</h3>
      <p>When an answer is incomplete, users may not know what to ask next. Without a clear invitation to explore further, conversations remain shallow and users are more likely to leave.</p>
      <h3>Barrier 3: Friction Against Established Habits</h3>
      <blockquote>After ten years of search muscle memory—“enter keywords → scan links”—Perplexity asks users to switch to “ask a question → read paragraphs.” The cost of changing that habit is easy to underestimate.</blockquote>
      <h2>Product Implications</h2>
      <ul>
        <li>The central challenge for AI products is not only technology, but also <strong>the design of habit change</strong>.</li>
        <li>Trust must be made visible; products cannot rely on users to find citations on their own.</li>
        <li>Conversation depth is a key retention metric for AI search products.</li>
      </ul>`
  },
  {
    title: "A Capability Map of Leading LLMs and Their Best-Fit Scenarios",
    summary: "A comparison of GPT-4o, Claude 3.5, and leading domestic models, covering selection strategies and API costs to support product decisions.",
    tags: ["Model Evaluation", "Selection Strategy", "Capability Boundaries"],
    body: `<h2>Evaluation Framework</h2>
      <p>When evaluating a large language model, do not ask only “What can it do?” Ask instead: <strong>“Under what conditions, at what quality, can it do what?”</strong> These three dimensions determine whether a model is truly reliable for a use case.</p>
      <h3>Dimension 1: Consistency</h3>
      <p>Does the same input produce stable output? This determines whether a product can be trusted in production. GPT-4o may show greater variance on creative tasks, while Claude has shown stronger consistency in logical reasoning.</p>
      <h3>Dimension 2: Cost Efficiency</h3>
      <p>API costs can differ by more than tenfold across models. Using a frontier model for high-volume, low-complexity tasks wastes resources. <em>The cost-performance of domestic models in Chinese-language scenarios is often underestimated.</em></p>
      <h3>Dimension 3: Tool-Calling Reliability</h3>
      <blockquote>The reliability ceiling of an Agent product is determined by the weakest link in Tool Use stability—not simply by the intelligence of the model.</blockquote>
      <h2>Selection Recommendations</h2>
      <ul>
        <li><strong>Creative generation / long-form writing:</strong> Claude 3.5 Sonnet.</li>
        <li><strong>Complex reasoning / coding:</strong> GPT-4o / o1.</li>
        <li><strong>High-volume Chinese-language tasks:</strong> Qwen / DeepSeek, with significant cost advantages.</li>
        <li><strong>Agent workflows:</strong> Prioritize the maturity and completeness of Tool Use documentation.</li>
      </ul>`
  },
  {
    title: "Business Perspective: Is an AI Product's Moat Data or Workflow?",
    summary: "Explores PMF validation for native AI applications, avoiding superficial wrappers and focusing on real enterprise pain points and paths to monetization.",
    tags: ["Monetization", "B2B Products", "PMF Validation"],
    body: `<h2>The Core Question</h2>
      <p>Is the competitive moat of an AI product built on <strong>data</strong> (who owns more private data) or on <strong>workflow</strong> (who is more deeply embedded in business processes)? This judgment directly shapes product strategy.</p>
      <h3>Limits of a Data Moat</h3>
      <p>The data-moat assumption depends on data being difficult to replicate and having a decisive impact on model performance. In reality, the general capabilities of large models are rapidly narrowing data advantages. <em>Without a distinctive business scenario, accumulated data has limited value.</em></p>
      <h3>Why Workflow Can Be a Moat</h3>
      <p>When AI is deeply embedded in a user's daily workflow, switching costs become high. This resembles the “stickiness” of SaaS, but the AI version can be stronger because it also incorporates user habits and historical context.</p>
      <blockquote>The real moat of an AI product is not how much data it owns, but how difficult it is for users to leave its workflow.</blockquote>
      <h2>Implications for B2B AI Products</h2>
      <ul>
        <li>Validate <strong>which workflow step to embed in</strong> before deciding what data to accumulate.</li>
        <li>A PMF signal is that users <strong>would feel pain without the product</strong>, not merely excitement when using it.</li>
        <li>A common failure mode for thin wrappers: when the underlying model improves, the wrapper loses its differentiated value.</li>
      </ul>`
  }
];
