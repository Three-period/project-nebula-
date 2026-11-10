// English translations for project records. Original Chinese data stays in the source data files.
export const projectI18n = {
  "work-rd-platform": {
    type: "Work Project",
    title: "R&D Digitalization Platform | B2B Product Planning",
    description: "Designed a digital platform solution around R&D workflows and cross-functional collaboration.",
    stage: "Product design delivered · Development not started",
    tags: ["B2B Product", "Requirements Analysis", "Multi-Agent", "High-Fidelity Prototype"],
    body: `<div class="project-story">
      <p><strong>Business Research & Requirements Analysis:</strong> Conducted one-on-one interviews, surveys, and data analysis to map the end-to-end software R&D process. Identified cross-role collaboration pain points and translated fragmented practices into standardized workflows and product requirements.</p>
      <p><strong>Competitive & Market Research:</strong> Evaluated ZenTao, TAPD, and Feishu Projects across positioning, feature architecture, business processes, and business models. Also participated in discussions with the Feishu Projects team, trial planning, and product evaluation.</p>
      <p><strong>Product Architecture & Solution Design:</strong> Planned a multi-agent digital platform around R&D business scenarios. Independently delivered the PRD, functional architecture, and high-fidelity prototypes, using Axure and AI-assisted interactive HTML to communicate the solution.</p>
      <p><strong>Cross-functional Collaboration & Validation:</strong> Aligned requirements and reviewed the solution with the Project Management Office and Group IT team. Design-stage deliverables were completed; development has not started due to resource constraints.</p>
    </div>`
  },
  "work-skillhub": {
    type: "Work Project",
    title: "SkillHub | Enterprise AI Capability Component Platform",
    description: "A standardized AI capability component platform for internal developers and product managers.",
    stage: "In internal use · Iteration paused",
    tags: ["Skills", "AI Components", "0-to-1 Platform", "Standardization"],
    body: `<div class="project-story">
      <p><strong>Platform Build from 0 to 1:</strong> Led the initial architecture planning for SkillHub. Referencing the capability organization model of Claude Skills, designed a standardized AI component system so internal AI developers and product managers could reuse high-frequency business capabilities.</p>
      <p><strong>Scenario Analysis & Productization:</strong> Worked with business stakeholders to identify recurring scenarios and translate enterprise knowledge and workflows into reusable Skill component requirements. Contributed to planning and standards for components such as Creator Skill and PRD Skill.</p>
      <p><strong>Product Iteration & Delivery:</strong> Participated in two platform iterations, improving product capabilities and documenting component standards. Produced materials including the Skill Packaging Guide and Skill Taxonomy Knowledge Notes. The platform entered internal use; further iteration was later paused following project changes.</p>
    </div>`
  },
  "work-code-review": {
    type: "Work Project",
    title: "AI Code Review | Vertical AI Application Exploration",
    description: "Exploring rule management, AI-assisted code review, and a human feedback loop.",
    stage: "In progress · Solution exploration",
    tags: ["Rule System", "Code Review", "AI Workflow"],
    body: `<div class="project-story">
      <p><strong>Business Analysis & Product Solution:</strong> Examined software development code-review scenarios, mapped engineering workflows, review rules, and business pain points. Explored a closed loop connecting rule management, AI-assisted review, human feedback, and version iteration, while advancing the AI workflow and product solution design.</p>
    </div>`
  },
  "work-huizhou-ip": {
    type: "Work Project",
    title: "Huizhou Sports Park | IP Product Incubation from 0 to 1",
    description: "Developed a client proposal by combining city identity, IP competitor research, and AI-assisted visual exploration.",
    stage: "Client deliverables completed",
    tags: ["Competitive Research", "IP Strategy", "AIGC", "Client Delivery"],
    body: `<div class="project-story">
      <p><strong>Requirements Framing & Competitive Analysis:</strong> Turned the ambiguous request to balance a lively feel with the city's cultural depth into a three-dimensional analysis framework covering scenario attributes, city identity, and communication value. Combined this with research into city IP examples to define a differentiated product position and design direction.</p>
      <p><strong>AIGC Workflow & Solution Delivery:</strong> Designed a workflow of “content distillation → AI style exploration → multimodal generation.” Delivered the IP character, 3D views, and scenario application concepts, using visual mock-ups to validate the direction quickly and complete the client handoff.</p>
    </div>`
  },
  "work-luoburen": {
    type: "Work Project",
    title: "Luoburen Village, Xinjiang | Early-Stage Tourism Product Planning",
    description: "Combined cultural, experiential, commercial, and operational insights into a structured tourism proposal.",
    stage: "Early-stage planning",
    tags: ["Tourism Planning", "Business Analysis", "Visual PoC", "SOP"],
    body: `<div class="project-story">
      <p><strong>Business Analysis & Product Planning:</strong> Consolidated fragmented information on cultural resources, visitor experience, commercial offerings, and operating strategy into a four-dimensional product-planning framework, producing a structured business proposal and client presentation materials.</p>
      <p><strong>Solution Validation & Knowledge Capture:</strong> Built a scenario-based visual proof of concept with Midjourney to help the client assess feasibility. Extracted lessons from projects with strong approval outcomes and independently created more than ten internal SOPs to standardize methods and enable team reuse.</p>
    </div>`
  },
  "personal-nebula": {
    type: "Personal Project",
    title: "Project Nebula | Personal AI Resume",
    description: "Transforming a traditional PDF resume into an interactive personal AI product.",
    stage: "Initial version launched · Digital twin under maintenance",
    tags: ["AI Product", "Independent Delivery", "Agent / RAG", "Version Iteration"],
    body: `<div class="project-story">
      <p><strong>Product Definition & Requirements Analysis:</strong> Reframed how personal information is presented and explored for recruiting scenarios. Redesigned the resume's information architecture and interactions to bring project showcases, capability profiles, and intelligent Q&amp;A together in one AI product.</p>
      <p><strong>End-to-End Independent Delivery:</strong> Delivered the PRD, information architecture, front-end implementation, visual system, and deployment. Combined GPT, Claude, Codex, Coze, GitHub, and Cloudflare Pages to launch the initial version with no platform hosting fees.</p>
      <p><strong>Agent & RAG Practice:</strong> Built an AI digital twin with Coze, designed its knowledge-base structure and System Prompt constraints, and enabled Q&amp;A about personal experience. Reviewed conversation logs to improve response quality.</p>
      <p><strong>Product Experience & Iteration:</strong> Addressed V1 issues including nested information, lengthy reading paths, and inconsistent AI responses. Restructured V2 into a flatter information architecture and improved content discovery and interaction.</p>
    </div>`
  },
  "personal-agent": {
    type: "Personal Project",
    title: "Personal Digital Twin Agent · End-to-End Build from 0 to 1",
    year: "2025 (historical project)",
    stage: "Historical project · Currently under maintenance",
    tags: ["RAG Engineering", "Prompt Design", "Agent Implementation"],
    description: "A personal AI interview assistant built on Coze, covering corpus engineering, a four-layer model guardrail design, front-end Web SDK integration, and performance tuning.",
    body: `<div class="project-story">
      <p><strong>Historical Project Overview:</strong> A personal AI interview assistant built on Coze. The implementation covered data-layer corpus engineering, four layers of model guardrails, front-end Web SDK integration, and performance tuning to deliver a conversational digital-twin experience.</p>
      <p><strong>Historical Toolchain:</strong> Coze · Notion · Doubao-pro-32k · RAG · Web SDK</p>
    </div>`
  }
};
