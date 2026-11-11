// Evidence-linked capability domains. Project records remain the source of truth.
export const capabilityGroups = [
  {
    id: "business-modeling",
    number: "01",
    titleKey: "capabilityBusinessTitle",
    descriptionKey: "capabilityBusinessDescription",
    skillsKey: "capabilityBusinessSkills",
    evidence: ["work-rd-platform", "work-luoburen"]
  },
  {
    id: "product-design",
    number: "02",
    titleKey: "capabilityProductTitle",
    descriptionKey: "capabilityProductDescription",
    skillsKey: "capabilityProductSkills",
    evidence: ["work-rd-platform", "work-huizhou-ip"]
  },
  {
    id: "ai-engineering",
    number: "03",
    titleKey: "capabilityAiTitle",
    descriptionKey: "capabilityAiDescription",
    skillsKey: "capabilityAiSkills",
    evidence: ["work-skillhub", "personal-agent", "work-code-review"]
  },
  {
    id: "delivery-collaboration",
    number: "04",
    titleKey: "capabilityDeliveryTitle",
    descriptionKey: "capabilityDeliveryDescription",
    skillsKey: "capabilityDeliverySkills",
    evidence: ["personal-nebula", "work-skillhub"]
  }
];
