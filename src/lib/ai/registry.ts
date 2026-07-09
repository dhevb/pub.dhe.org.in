export type AiModuleId =
  | "paper-recommendation"
  | "semantic-search"
  | "related-papers"
  | "citation-suggestions"
  | "research-assistant";

export interface AiModule {
  id: AiModuleId;
  name: string;
  description: string;
  status: "placeholder" | "beta" | "active";
  /** Future: provider endpoint or model id */
  config?: Record<string, string>;
}

export const AI_MODULES: AiModule[] = [
  {
    id: "paper-recommendation",
    name: "AI Paper Recommendation",
    description: "Suggest related papers based on reading history and embeddings.",
    status: "placeholder",
  },
  {
    id: "semantic-search",
    name: "Semantic Search",
    description: "Vector-based full-text and concept search across the corpus.",
    status: "placeholder",
  },
  {
    id: "related-papers",
    name: "Related Papers",
    description: "Surface similar works by topic, citations, and co-authorship.",
    status: "placeholder",
  },
  {
    id: "citation-suggestions",
    name: "Citation Suggestions",
    description: "Recommend references while authoring manuscripts.",
    status: "placeholder",
  },
  {
    id: "research-assistant",
    name: "AI Research Assistant",
    description: "Guided help for authors, reviewers, and editors.",
    status: "placeholder",
  },
];

export function getAiModule(id: AiModuleId): AiModule | undefined {
  return AI_MODULES.find((m) => m.id === id);
}
