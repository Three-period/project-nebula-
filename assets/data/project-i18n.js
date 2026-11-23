// English project copy. Media and relationships are shared with the Chinese records.
export const projectI18n = {
  "work-rd-platform": {
    "type": "Work Project",
    "title": "Integrated R&D Platform",
    "description": "Product lead for a platform that connects fragmented R&D work, starting with online development, code submission, and AI review.",
    "stage": "First release live · In development",
    "tags": [
      "Multi-agent product architecture",
      "R&D process design",
      "Release scoping"
    ],
    "detail": {
      "description": "A unified platform for enterprise hardware and software R&D that connects work across approvals, documentation, development and project management throughout the lifecycle. Its planned multi-agent architecture defines how AI capabilities coordinate across stages, starting with an end-to-end workflow for online AI-assisted development and code review.",
      "highlights": [
        ["10–15 people", "Early release trial"],
        ["~1.5 weeks → 4–5 days", "Related workflow time · project observation"],
        ["~1 week", "Independently built the prototype"]
      ],
      "sections": [
        ["Project background | Fragmented systems made handoffs hard to verify","An R&D project moves across multiple systems from requirements and design through development, testing and release. Approvals live in workflow tools, design and test materials in document systems, and code and execution results in development tools. Teams switch tools and move files by hand, while project leads struggle to verify progress and delivery status in one place. Development can move ahead while approvals lag. At handoff, testers may have to check whether the design, code and review results refer to the same revision. After discovery, I defined a unified platform where each stage receives upstream deliverables, records its own results and establishes what must be true before work moves forward."],
        ["My role and scope","As product lead, I owned discovery, workflow redesign, business specifications, the PRD, acceptance and pilot operations. I independently built the HTML prototype. A project manager coordinated delivery, and an engineer implemented the production system."],
        ["Platform architecture | One R&D workflow with agents coordinated at each stage","The business layer connects requirements, design, development, testing, release and closure, defining owners, deliverables, status transitions and entry and exit criteria. The platform layer links documents, tasks, commits, review results and approvals by project and stage, giving each role a shared entry point. The AI layer is designed around central orchestration, domain agents, execution agents and skills. The platform supplies the task, related materials and workflow state. Agents act at their assigned stage and write results back so the responsible roles can handle exceptions and confirm decisions."],
        ["First release | Start with a working development loop","I led product planning, the target multi-agent architecture design and first-release scoping. The first release connects online AI-assisted development, GitLab submissions, automated AI review, report delivery and human review. Development and review agents have been used in this workflow. Full project, requirements and business asset management are planned for later stages."],
        ["Results","The first release went live within its defined scope and reached 10–15 trial users. Project observations put the related workflow at 4–5 days, down from about 1.5 weeks. I built the prototype in about a week."],
        ["Product judgment","The first release succeeds when roles, deliverables and workflow states agree across handoffs. An interactive prototype lets business, product and engineering teams verify those handoffs together."]
      ]
    }
  },
  "work-skillhub": {
    "type": "Work Project",
    "title": "SkillHub | Enterprise AI Capability Platform",
    "description": "Independently built a Skills distribution platform to improve discovery, update notifications, and access, and helped teams adopt Spec + Skill.",
    "stage": "Two releases completed · Internal pilot",
    "tags": [
      "Independent delivery",
      "Skills standardization",
      "Team adoption"
    ],
    "detail": {
      "highlights": [
        ["2 releases", "Limited internal use"],
        ["1 → ~9–11 people", "IDC team members who learned Spec + Skill"],
        ["20+ colleagues", "Reached through 5–6 training sessions"]
      ],
      "sections": [
        ["Project overview", "Teams shared Skills through chats and forwarded files. It was hard to tell which version was current or fit a task. Interviews and a survey surfaced gaps in discovery, updates and adoption."],
        ["My role and scope", "I independently owned discovery, design, development, release, adoption and iteration. A limited internal rollout supplied usage feedback."],
        ["From downloads to usable Skills", "V1 gave teams a single place to browse and download. V2 added descriptions, department categories, version information, update reminders and role-based access so people could find Skills suited to their work."],
        ["Helping teams put Skills to work", "I documented the Spec + Skill approach, wrote a usage guide and a Skill creation SOP, and ran hands-on training for frontend, backend, IDC and testing colleagues."],
        ["Results", "Both releases saw limited internal use. About 5–6 training sessions reached 20+ colleagues. The IDC group familiar with the standardized approach for embedded development grew from 1 to about 9–11 people."],
        ["Product judgment", "A shared entry point makes Skills available. Clear descriptions, update reminders and training help people apply them. I would include permission checks in the next release checklist."]
      ]
    }
  },
  "work-code-review": {
    "type": "Work Project",
    "title": "AI Code Review",
    "description": "Designed separate developer and reviewer workspaces so AI can screen rule-based issues, developers can resolve findings, and reviewers can sign off for testing.",
    "stage": "In use · Human sign-off",
    "tags": [
      "Human-in-the-loop",
      "Role-based workspaces",
      "Version consistency"
    ],
    "detail": {
      "highlights": [
        ["~1 week → 2–3 days", "Comparable review cycles · user feedback"],
        ["~2–3 → 7–8", "Projects reviewed per engineer per week · user feedback"],
        ["2 workspaces", "Developer and reviewer"]
      ],
      "sections": [
        ["Project overview", "Peer review relied on senior engineers while design documents, code revisions, test evidence and conclusions lived in separate tools. I defined a continuous flow from submission through issue resolution to approval for testing."],
        ["My role and scope", "I owned the business specification and designed both workspaces, dispute handling and sign-off. I helped the team organize the rule set. Engineers implemented the agent and workflow."],
        ["Who signs off after AI screening?", "Link the code revision to its design and smoke and self-test evidence. AI screens design alignment, file consistency, completeness and correctness. Developers resolve findings or raise disputes. Reviewers adjudicate disputes, cover high-risk and unscreened areas, and sample independently."],
        ["How the workspaces connect", "The developer workspace connects evidence, submission, reports and fixes. The reviewer workspace handles the queue, disputes, manual checks and sign-off. The gate checks issue closure and matches the decision to the revision going into testing."],
        ["Results", "Users reported that comparable reviews took 2–3 days instead of about a week and that weekly reviews per engineer rose from about 2–3 to 7–8 projects. Reviewers retain final sign-off."],
        ["Product judgment", "A review system can support quality control when it defines what AI screens, when people must intervene and which code revision the decision covers."]
      ]
    }
  },
  "work-huizhou-ip": {
    "type": "Work Project",
    "title": "Huizhou Sports Park | IP Concept & Visual Exploration",
    "description": "Helped turn visitor needs, local culture, and sports themes into a workable IP direction and visual concept.",
    "stage": "Concept and visuals delivered",
    "tags": [
      "Problem framing",
      "IP visual exploration"
    ],
    "detail": {
      "highlights": [
        ["~3–4 weeks → 1–2 weeks", "Visual development time · project observation"],
        ["Concept and visuals", "Team deliverables"]
      ],
      "sections": [
        ["Project overview", "The park wanted a character identity with both sporting energy and a sense of local history. The team needed to turn that broad brief into a visual direction the client could discuss."],
        ["My role and scope", "I contributed to the park proposal, character direction and client discussions, and helped produce scene imagery and 3D presentations. The wider landscape and character projects were team efforts."],
        ["Turn local identity into design criteria", "I organized the brief around settings, city identity and how the character would be used and shared. This connected local culture and sporting contexts to concrete design choices."],
        ["Use generated visuals to advance discussion", "I used Midjourney and ERNIE Bot to explore directions, then worked with imagery and 3D presentation to help the client understand and compare them."],
        ["Results", "The team delivered the concept and character visuals. Project observations put visual development at about 1–2 weeks, down from 3–4 weeks."],
        ["Product judgment", "Define which settings and local characteristics each direction must address before generating visuals. That gives the team a basis for comparing concepts."]
      ]
    }
  },
  "work-luoburen": {
    "type": "Work Project",
    "title": "Lop Nur Village | Tourism Concept Planning",
    "description": "Organized fragmented inputs into a four-part framework for culture, visitor experience, commercial programming, and operations.",
    "stage": "Concept planning delivered",
    "tags": [
      "Four-part planning framework",
      "Visual communication"
    ],
    "detail": {
      "highlights": [
        ["4-part planning framework", "Culture · experience · commercial mix · operations"],
        ["Scene visualization PoC", "Used in concept communication"]
      ],
      "sections": [
        ["Project overview", "Cultural, spatial and operating inputs were scattered, making it hard for the client to assess the concept. I organized early planning around four connected dimensions so discussions could focus on concrete visitor and business decisions."],
        ["My role and scope", "I independently built the planning framework, co-developed the wider concept with my lead, and contributed to client communication and scene presentation. Other team members designed the image prompts."],
        ["Connect culture, experience, commercial mix and operations", "I selected cultural resources relevant to the concept, mapped them to visitor touchpoints, linked experiences to commercial uses, and brought operating considerations into early planning."],
        ["Make the concept visible", "I translated the framework into a client presentation and helped communicate scenes through a visual proof of concept made with tools including Midjourney."],
        ["Results", "The team delivered the planning framework, early concept presentation and scene visualization proof of concept."],
        ["Product judgment", "Early planning should show how cultural resources shape experiences, how experiences support commercial uses, and how operations sustain them. Visual scenes give the client something concrete to assess."]
      ]
    }
  },
  "personal-nebula": {
    "type": "Personal Project",
    "title": "Project Nebula | Personal AI Portfolio",
    "description": "Independently built an interactive portfolio around how recruiters read, from product definition to the visual system, component guidelines, and deployment.",
    "stage": "V1 shipped · V2 in development",
    "versionGroupLabel": "Project versions",
    "versions": [
      {
        "id": "v2",
        "label": "V2 · Current rebuild",
        "stage": "In active iteration",
        "description": "Rebuilt the content hierarchy and reading path from real usage feedback, adding two themes, bilingual content, search, layered case details, and media viewing.",
        "detail": {
          "highlights": [
            ["Five sections", "Reorganized content and navigation"],
            ["Two themes", "Landscape and Cosmic"],
            ["Chinese and English", "Core content and navigation"]
          ],
          "sections": [
            ["Project overview", "V1 exposed a reading problem: some details sat too deep. V2 serves two hiring tasks: understand my role and experience quickly, then open the cases and evidence that matter."],
            ["My role and scope", "I independently reorganized the information architecture and handled interface design, frontend changes, testing and deployment."],
            ["Make cases easier to find", "I organized content into five sections and used navigation, search and layered details to connect summaries, cases and materials with fewer steps."],
            ["Shared components across two themes", "The Landscape and Cosmic themes share cards, buttons, drawers and responsive rules. The site also supports Chinese and English, online résumé access and media viewing."],
            ["Results", "V2 is live with five content sections, two themes, a language switch, site search and online résumé access."],
            ["Product judgment", "Put roles, outcomes and evidence where readers can find them. Let the actual reading task shape the path through the site."]
          ]
        },
        "documents": [],
        "showCurrentDesignSystem": true,
        "useLegacyMedia": false
      },
      {
        "id": "v1",
        "label": "V1 · Digital twin release",
        "stage": "Shipped March 2026 · Historical release",
        "description": "An explorable personal AI product built around capability planets, combining experience, project materials, and a Coze digital twin.",
        "detail": {
          "highlights": [
            ["March 2026", "V1 went live"],
            ["Independent delivery", "Product, design, development and deployment"],
            ["Coze + RAG", "V1 digital twin"]
          ],
          "sections": [
            ["Project overview", "A PDF works for initial screening but has little room for project decisions, evidence or lessons. I built an explorable portfolio with conversational access to my work for real hiring conversations."],
            ["My role and scope", "I independently handled positioning, the PRD, information architecture, interaction design, AI-assisted development and deployment. The digital twin relied on Coze and external model services."],
            ["From capability planets to a digital twin", "Planet navigation linked experience, cases, artifacts and writing. Coze, a knowledge base and RAG supported Q&A, with prompts defining identity, scope and answer structure."],
            ["Using V1 in real applications", "I used the site in applications and project conversations and examined how recruiters reached relevant information. The planet interface was distinctive, but individual cases took several steps to reach."],
            ["Results", "V1 went live in March 2026 and was used during the job search. Its prototypes, architecture and demo remain available here."],
            ["Product judgment", "An exploratory interface gives the portfolio a distinctive identity. Hiring readers also need a quick route to evidence, which became the starting point for V2."]
          ]
        },
        "documents": ["prd", "design", "arch", "proto", "agent"],
        "showCurrentDesignSystem": false,
        "useLegacyMedia": true
      }
    ],
    "tags": [
      "Zero-to-one product",
      "Visual & component system",
      "Independent delivery"
    ],
    "year": "Nov 2025—Present"
  }
};
