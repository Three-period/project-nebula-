// Stored English copy for Project Nebula document cards and full detail views.
export const documentI18n = {
  cards: {
    paper: { type: "HISTORICAL DESIGN", title: "Rice-Paper Reading Interface & Design Guidelines", description: "Notes from the previous rice-paper long-page redesign, retained as historical reference. The current visual standard is defined by the latest PRD.", tags: ["Flat Information Layout", "Unified Components", "Responsive Design"] },
    prd: { type: "PRD", title: "Product Requirements Document", description: "An end-to-end PRD from 0 to 1, covering product positioning, information architecture, interaction logic, and acceptance criteria. The site's PRD V7 is a representative work.", tags: ["Requirements Framing", "Scope Definition", "Product Closure"] },
    design: { type: "Design System", title: "Retro Cosmic UI/UX Design Guide", description: "The core visual specification for this site, defining the color system, typography, component styles, and interaction states to keep the experience visually consistent.", tags: ["Color System", "Component Standards", "Visual Consistency"] },
    arch: { type: "Architecture", title: "Business Architecture & System Design", description: "Maps business workflows, data flows, and system boundaries, translating complex business scenarios into a clear product model.", tags: ["Workflow Mapping", "Scope Definition", "Interaction Logic"] },
    proto: { type: "Prototype", title: "High-Fidelity Interactive Prototype · Full-Site Coverage", description: "High-fidelity screens, design standards, and interaction specifications, with an emphasis on implementation feasibility and clear communication.", tags: ["Specification Delivery", "Interaction Logic", "Product Closure"] },
    agent: { type: "AGENT DESIGN · HISTORICAL", title: "Personal Digital Twin Agent · Architecture & Implementation Guide", description: "Historical materials covering Coze, knowledge bases, Prompt design, and integration. The live Q&A service is currently under maintenance.", tags: ["Agent", "RAG", "Historical Technical Reference"] }
  },
  details: {
    prd: {
      type: "PRD",
      title: "Project Nebula · Product Requirements Document (Showcase Edition)",
      body: `<div class="dr-doc-content">
        <h2>1. Product Positioning & Objectives</h2>
        <h3>Core Problem</h3>
        <p>A traditional resume presents experience statically and cannot effectively demonstrate the capabilities that matter in the AI era: product thinking for AI, an understanding of large-model limitations, and the ability to turn ideas into usable products.</p>
        <h3>One-Sentence Positioning</h3>
        <p>A personal AI showcase built around an interactive “capability planet system”—a product prototype that can be <strong>explored, interacted with, and talked to.</strong></p>
        <h3>Product Objectives</h3>
        <ul>
          <li>Replace a conventional resume format with a distinctive product experience.</li>
          <li>Use page structure, interaction design, and Agent capabilities to demonstrate systematic AI product thinking and engineering execution.</li>
          <li>Help visitors quickly understand the overall structure of personal capabilities, work, and thinking.</li>
          <li>Provide an extensible foundation for future knowledge-base, retrieval, and RAG capabilities.</li>
        </ul>
        <div class="dr-tag-row"><span class="dr-tag">Product Positioning</span><span class="dr-tag">AI Showcase</span><span class="dr-tag">Digital Twin</span></div>
        <h2>2. Information Architecture</h2>
        <h3>Three Layers</h3>
        <ul>
          <li><strong>Layer 1 · Welcome Screen:</strong> Establishes the visual tone and a sense of entry; transitions automatically after five seconds.</li>
          <li><strong>Layer 2 · Capability Planet Overview:</strong> Uses a galaxy structure to express the personal capability system and support non-linear navigation.</li>
          <li><strong>Layer 3 · Content Details:</strong> Each of the five planets hosts an independent content area for deeper exploration.</li>
        </ul>
        <h3>Planet Definitions</h3>
        <ul>
          <li><strong>AI Singularity:</strong> The core of the digital twin and Agent, persistently available across the experience.</li>
          <li><strong>Forge:</strong> Showcases AI projects and MVPs, demonstrating builder execution.</li>
          <li><strong>Construct:</strong> Presents structured product deliverables such as PRDs, architecture diagrams, and prototypes.</li>
          <li><strong>Fusion:</strong> Reframes professional experience into a structured model of transferable capabilities.</li>
          <li><strong>Pulsar:</strong> Presents continuous learning, independent judgment, and outputs from a personal thinking system.</li>
        </ul>
        <h3>Exploration Sequence</h3>
        <p>AI Singularity → Forge → Construct → Fusion → Pulsar → Contact Hub</p>
        <div class="dr-tag-row"><span class="dr-tag">Information Architecture</span><span class="dr-tag">Planet System</span><span class="dr-tag">Narrative Structure</span></div>
        <h2>3. Core Interaction Logic</h2>
        <h3>Welcome Screen</h3>
        <p>A click anywhere or a five-second pause moves to the planet overview. A subtle set of glowing tags introduces key identity highlights.</p>
        <h3>Planet Overview</h3>
        <ul>
          <li><strong>Unvisited planet:</strong> Dimmed state with restrained brightness.</li>
          <li><strong>Visited planet:</strong> Illuminated state with an enhanced persistent halo.</li>
          <li>Hover: scale up, intensify the glow, and reveal contextual copy.</li>
          <li>Click: navigate to the corresponding content area.</li>
        </ul>
        <h3>Content Details</h3>
        <ul>
          <li>Top: a button to return to the capability overview.</li>
          <li>Bottom: explore the next planet or return to the previous stop.</li>
          <li>Persistent elements: a contact module at the bottom and a floating Agent available throughout the site.</li>
        </ul>
        <h3>Global Floating Agent</h3>
        <p>A floating button stays at the lower-right corner of every page. On first open, it sends a welcome message and supports suggested questions and free-form input. The interface reserves a future integration point for Coze / RAG.</p>
        <div class="dr-tag-row"><span class="dr-tag">Interaction Logic</span><span class="dr-tag">State Management</span><span class="dr-tag">Agent Integration</span></div>
        <h2>4. Technical Implementation Path</h2>
        <h3>Workflow Stack</h3>
        <ul>
          <li><strong>Product Co-Creation:</strong> GPT / Gemini — requirement breakdown, PRD drafting, and Prompt iteration.</li>
          <li><strong>Visual Exploration:</strong> Google Stitch — front-end visual direction.</li>
          <li><strong>Prototype Generation:</strong> Claude — concept validation and front-end code generation.</li>
          <li><strong>Code Refinement:</strong> Cursor / Codex — code integration and focused refactoring.</li>
          <li><strong>Agent Development:</strong> Coze — conversational Agent, knowledge base, and RAG integration.</li>
          <li><strong>Release & Iteration:</strong> GitHub + Cloudflare Pages.</li>
        </ul>
        <h3>Version Roadmap</h3>
        <ul>
          <li><strong>V1 (at the time of writing):</strong> A runnable release with five content areas, an Agent entry point, and deployment.</li>
          <li><strong>V2:</strong> Richer interactions, an Agent connected to real knowledge, and exploration progress feedback.</li>
          <li><strong>V3:</strong> A complete digital-twin experience with RAG integration and linked content.</li>
        </ul>
        <div class="dr-tag-row"><span class="dr-tag">Toolchain</span><span class="dr-tag">Version Roadmap</span><span class="dr-tag">Engineering Standards</span></div>
        <p>📎 See the full PRD in the original Notion document ↗</p>
      </div>`
    },
    design: {
      type: "Design System",
      title: "Retro Cosmic UI/UX Design Guide",
      body: `<div class="dr-doc-content">
        <h2>1. Design Context & Objectives</h2>
        <p>During Project Nebula's front-end development, multiple iterations introduced visual drift and inconsistent colors. This complete UI design system was created as a “visual constitution” to keep the retro, mysterious cosmic aesthetic consistent across every page and component.</p>
        <div class="dr-tag-row"><span class="dr-tag">Design System</span><span class="dr-tag">Visual Standards</span><span class="dr-tag">Retro Cosmic Style</span></div>
        <h2>2. Color System</h2>
        <h3>Background Palette</h3>
        <ul>
          <li><strong>Void Black #080604:</strong> Deepest base color and global background.</li>
          <li><strong>Cosmic Black #0F0B07:</strong> Main page background.</li>
          <li><strong>Nebula Black #171108:</strong> Card and content-area background.</li>
          <li><strong>Dawn Black #201A0F:</strong> Floating layers and interactive states.</li>
        </ul>
        <h3>Platinum & Gold Palette</h3>
        <ul>
          <li><strong>Moonlit Platinum #F8F0D0:</strong> Highest-emphasis, brightest text.</li>
          <li><strong>Ivory Platinum #F2E8B4:</strong> Primary headings and key text.</li>
          <li><strong>Light Gold #E4D080:</strong> Secondary headings and explanatory copy.</li>
          <li><strong>Pure Gold #D0B84A:</strong> Primary UI elements and highlighted borders.</li>
          <li><strong>Mid Gold #B09430:</strong> Dividers and secondary borders.</li>
        </ul>
        <h3>Accent Colors</h3>
        <ul>
          <li><strong>Burnished Copper #E86A28:</strong> CTA buttons and the strongest visual focal point.</li>
          <li><strong>Soft Rose Gold #E8A080:</strong> Gentle highlights dedicated to Construct.</li>
        </ul>
        <div class="dr-tag-row"><span class="dr-tag">Gold Palette</span><span class="dr-tag">Copper Accents</span><span class="dr-tag">Deep-Space Background</span></div>
        <h2>3. Typography</h2>
        <ul>
          <li><strong>Cinzel / Cinzel Decorative:</strong> Headings, navigation, and decorative English typography for a classical, mysterious tone.</li>
          <li><strong>Cormorant Garamond:</strong> Quotes and long-form reading, with an elegant serif character.</li>
          <li><strong>Noto Serif SC:</strong> Chinese body text, coordinated with the English serif typography.</li>
        </ul>
        <h2>4. Core Component Standards</h2>
        <h3>Cards</h3>
        <p>Use the bg-surface background and a border of rgba(208,184,74,.15). On hover, increase the border opacity to .3 and apply a subtle translateY(-2px) lift.</p>
        <h3>Buttons</h3>
        <ul>
          <li><strong>Primary button:</strong> Translucent gold fill with a gold border; hover produces a soft glow.</li>
          <li><strong>Outline button:</strong> Transparent fill with a gold border; hover deepens the background.</li>
        </ul>
        <h3>Distinct Page Accents</h3>
        <ul>
          <li><strong>AI Singularity:</strong> Starlit platinum with a soft copper halo.</li>
          <li><strong>Forge:</strong> Burnished copper orange #E86A28.</li>
          <li><strong>Construct:</strong> Rose gold #E8A080.</li>
          <li><strong>Fusion:</strong> Warm pure gold #E4D080.</li>
          <li><strong>Pulsar:</strong> Deep amber #B09430.</li>
        </ul>
        <div class="dr-tag-row"><span class="dr-tag">Component Standards</span><span class="dr-tag">Interaction States</span><span class="dr-tag">Page Color System</span></div>
        <p>📎 Open the interactive design guide in the online preview (link to be added).</p>
      </div>`
    },
    arch: {
      type: "Architecture",
      title: "Business Architecture & System Design",
      body: `<div class="dr-img-wrap">
        <div class="dr-doc-content"><h2>Three-Layer Narrative Architecture</h2><p>The product has three layers: the presentation layer creates the first impression, the narrative layer demonstrates product-thinking depth, and the Agent layer delivers a conversational personal product.</p></div>
        <img src="/public/images/arch-3layer.svg" alt="Three-layer narrative architecture" loading="lazy">
        <div class="dr-doc-content"><h2>Workflow Stack · Toolchain</h2><p>A complete AI toolchain from co-creating a solution to release and iteration. Each stage uses the tool best suited to the task, forming an efficient human–AI workflow.</p></div>
        <img src="/public/images/arch-workflow.svg" alt="Workflow Stack" loading="lazy">
        <div class="dr-doc-content"><h2>Visitor Journey</h2><p>Shows visitors how to use the site, from the welcome screen through the exploration of each planet's content.</p></div>
        <img src="/public/images/nebula-user-browsing-flow.png" alt="Visitor journey flowchart" loading="lazy">
        <div class="dr-doc-content"><h2>Agent Invocation Flow</h2><p>The underlying runtime of the digital-twin Agent, from a user's question through knowledge retrieval to response generation.</p></div>
        <img src="/public/images/nebula-agent-invocation-flow.png" alt="Agent invocation flowchart" loading="lazy">
        <div class="dr-doc-content"><h2>Product Generation Workflow</h2><p>The toolchain from an initial idea to launch, showing how AI workflows collaborate to produce the complete product.</p></div>
        <img src="/public/images/nebula-product-generation-flow.jpg" alt="Product generation workflow" loading="lazy">
        <div class="dr-tag-row"><span class="dr-tag">Product Architecture</span><span class="dr-tag">Toolchain Design</span><span class="dr-tag">Workflow Mapping</span></div>
      </div>`
    },
    proto: {
      type: "Prototype",
      title: "High-Fidelity Interactive Prototype · Full-Site Coverage",
      body: `<div class="dr-img-wrap">
        <div class="dr-doc-content"><h2>Welcome Screen</h2><p>Minimal copy establishes the tone; glowing tags introduce key identity highlights, followed by an automatic transition to the planet overview after five seconds.</p></div>
        <img src="/public/images/nebula-hero-section.png" alt="Welcome screen prototype" loading="lazy">
        <div class="dr-doc-content"><h2>Capability Planet Overview</h2><p>A galaxy structure visualizes the personal capability system, with AI Singularity at the center and four orbiting planets representing the content modules.</p></div>
        <img src="/public/images/nebula-capability-planets-overview.png" alt="Capability planet overview prototype" loading="lazy">
        <div class="dr-doc-content"><h2>AI Singularity Content</h2><p>Personal information, capability tags, a skills matrix, and an entry point to the digital-twin chat, arranged in a balanced two-column layout.</p></div>
        <img src="/public/images/nebula-ai-singularity.png" alt="AI Singularity page prototype" loading="lazy">
        <div class="dr-doc-content"><h2>Forge Content</h2><p>An AI project gallery in which each card includes a project cover, description, and external link.</p></div>
        <img src="/public/images/nebula-star-workshop.png" alt="Forge page prototype" loading="lazy">
        <div class="dr-doc-content"><h2>Construct Content</h2><p>A product-document gallery. Selecting an item opens an immersive reader for PRDs, the design system, architecture diagrams, and prototypes.</p></div>
        <img src="/public/images/nebula-creator-planet.png" alt="Construct page prototype" loading="lazy">
        <div class="dr-doc-content"><h2>Fusion Content</h2><p>A two-column timeline with three experience entries and quantified highlights, presenting a model of transferable foundational capabilities.</p></div>
        <img src="/public/images/nebula-fusion-planet.png" alt="Fusion page prototype" loading="lazy">
        <div class="dr-doc-content"><h2>Pulsar Content</h2><p>A list of insights with a reading drawer sliding in from the right. External links provide direct access, showcasing continuous learning and independent judgment.</p></div>
        <img src="/public/images/nebula-pulse-star.png" alt="Pulsar page prototype" loading="lazy">
        <div class="dr-tag-row"><span class="dr-tag">Specification Delivery</span><span class="dr-tag">Full-Site Coverage</span><span class="dr-tag">Product Closure</span></div>
      </div>`
    },
    agent: {
      type: "Agent Design",
      title: "Personal Digital Twin Agent · Architecture & Implementation Guide",
      body: `<div class="dr-doc-content">
        <h2>1. Data Layer: Corpus Engineering & RAG Preparation</h2>
        <h3>Knowledge-Base Architecture</h3>
        <p>Instead of importing PDFs directly, a four-dimensional knowledge-base foundation was created in Notion:</p>
        <ul>
          <li><strong>Foundational Facts:</strong> Education, career timeline, and basic identity information.</li>
          <li><strong>Project Evidence:</strong> Reviews of key past projects and their important metrics.</li>
          <li><strong>Industry Knowledge:</strong> Understanding of AI PM roles, large-model limitations, and cross-industry transferable strengths.</li>
          <li><strong>Frequently Asked Q&amp;A:</strong> Prepared questions and answers for key interview topics.</li>
        </ul>
        <h3>Format Standards & Single Source of Truth (SSOT)</h3>
        <p>All source materials use <strong>Markdown</strong>, with Notion serving as the single source of truth. Markdown heading levels (H1/H2/H3) preserve semantic continuity during vector chunking and reduce context loss.</p>
        <h3>Corpus-Cleaning Pipeline</h3>
        <p>Claude is used for corpus preprocessing. Structured extraction Prompts filter redundant information and support noise reduction, labeling, and Markdown restructuring.</p>
        <div class="dr-tag-row"><span class="dr-tag">RAG Engineering</span><span class="dr-tag">Knowledge-Base Architecture</span><span class="dr-tag">Corpus Engineering</span></div>
        <h2>2. Model Layer: Agent Core</h2>
        <h3>Base Model Selection</h3>
        <p>The Agent core was built on Coze (China edition), using <strong>Doubao-pro-32k</strong>. The selection balanced reasoning capability with a fast time to first token to improve real-time interaction.</p>
        <h3>Four-Layer Guardrail Design</h3>
        <ul>
          <li><strong>Hallucination Control:</strong> Enforced a Closed-QA mechanism so the model answers strictly from the knowledge base and uses a standardized fallback when information is unavailable.</li>
          <li><strong>Identity Consistency:</strong> Maintained the role of “digital twin and interview assistant,” with soft interception of casual-chat and role-play instructions.</li>
          <li><strong>Output Format:</strong> Constrained responses to a top-down structure or bullet points for concise, efficient communication.</li>
          <li><strong>Jailbreak Protection:</strong> Firmly rejected and corrected instructions attempting to override the system setup.</li>
        </ul>
        <h3>Workflow Design</h3>
        <p>Intent intake → RAG vector retrieval → evidence extraction → structured response → <strong>proactive follow-up question</strong>, turning passive Q&amp;A into active business reasoning.</p>
        <h3>Retrieval Strategy</h3>
        <p>Established a dynamic API connection between Coze and Notion for live corpus updates. Intelligent auto-chunking and the Markdown syntax tree supported high-precision vector retrieval.</p>
        <div class="dr-tag-row"><span class="dr-tag">Prompt Engineering</span><span class="dr-tag">Hallucination Control</span><span class="dr-tag">Workflow Design</span></div>
        <h2>3. Integration Layer: Engineering & Performance</h2>
        <h3>Front-End Integration</h3>
        <p>Used the Web SDK to modularize the Agent interface and integrate it into the front-end application, cleanly separating the UI layer from business logic.</p>
        <h3>Three Performance Optimizations</h3>
        <ul>
          <li><strong>Streaming Output:</strong> Enabled streaming end to end. A typewriter effect reduced perceived response time to under 1 second.</li>
          <li><strong>Connection Prewarming:</strong> Declared a front-end preconnect policy to complete DNS resolution and the TLS handshake with the API domain in advance.</li>
          <li><strong>Retrieval Threshold Tuning:</strong> Limited RAG retrieval to the top 3–5 chunks, balancing context richness and reasoning latency.</li>
        </ul>
        <div class="dr-tag-row"><span class="dr-tag">Web SDK Integration</span><span class="dr-tag">Streaming Output</span><span class="dr-tag">Performance Tuning</span></div>
        <p>📎 See the full guide in the original Notion document ↗</p>
      </div>`
    },
    paper: {
      type: "Design System",
      title: "Rice-Paper Reading Interface & Design Guidelines",
      body: `<h2>Visual Design & Reading</h2><p>A warm rice-paper white sets the page background, with ink-gray body text and muted cinnabar accents establishing the reading hierarchy. The left navigation keeps the reader oriented, the main content flows continuously, and detailed content opens in a right-side drawer.</p><h2>Design Tokens</h2><p>Background: #F6F3EB; primary text: #292824; secondary text: #77736B; accent: #A6503C. Typography, spacing, and content width are centrally managed in tokens.css.</p><h2>Interaction Standards</h2><p>Navigation anchors support section positioning and scroll highlighting. The drawer supports Escape, backdrop dismissal, focus containment, and return to the previous position. On mobile, navigation collapses and details use a full-screen layout.</p>`
    }
  }
};
