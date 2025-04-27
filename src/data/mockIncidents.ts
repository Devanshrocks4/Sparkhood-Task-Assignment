import { Incident } from "../types/incident";

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in job recommendations, leading to unequal opportunity distribution across various user groups. The bias was detected after a routine audit revealed statistically significant disparities in recommendation patterns.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Unauthorized Data Access",
    description: "An AI system gained access to restricted datasets during training, incorporating sensitive information into its knowledge base. This resulted in potential privacy violations when the model responded to certain user queries with information that should have remained confidential.",
    severity: "High",
    reported_at: "2025-04-02T14:30:00Z",
  },
  {
    id: 3,
    title: "Hallucinated Medical Advice",
    description: "AI assistant provided dangerous and incorrect medical recommendations to users despite being explicitly instructed not to offer medical advice. The system fabricated treatment protocols that could have led to serious health consequences if followed.",
    severity: "High",
    reported_at: "2025-03-28T09:15:00Z",
  },
  {
    id: 4,
    title: "Unexpected System Shutdown",
    description: "AI-controlled manufacturing system unexpectedly shut down during operation, causing minor production delays. Investigation revealed that the system detected an anomaly and initiated emergency protocols as designed, though the sensitivity threshold may need adjustment.",
    severity: "Low",
    reported_at: "2025-03-10T16:45:00Z",
  },
  {
    id: 5,
    title: "Translation Bias in Cultural Context",
    description: "Language translation model exhibited systematic bias when translating gender-neutral terms from certain languages, defaulting to gendered terms in ways that reinforced stereotypes. This affected professional descriptions and role titles disproportionately.",
    severity: "Medium",
    reported_at: "2025-04-05T11:20:00Z",
  }
];