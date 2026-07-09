export type AiModuleId =
  | "paper-recommendation"
  | "semantic-search"
  | "related-papers"
  | "citation-suggestions"
  | "research-assistant"
  | "research-summaries"
  | "reviewer-suggestion"
  | "duplicate-detection"
  | "plagiarism-adapter";

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
  {
    id: "research-summaries",
    name: "Research Summaries",
    description: "Generate structured abstracts and lay summaries from manuscripts.",
    status: "placeholder",
  },
  {
    id: "reviewer-suggestion",
    name: "Reviewer Suggestion",
    description: "Match manuscripts to qualified reviewers by expertise graph.",
    status: "placeholder",
  },
  {
    id: "duplicate-detection",
    name: "Duplicate Detection",
    description: "Detect overlapping submissions across journals and repositories.",
    status: "placeholder",
  },
  {
    id: "plagiarism-adapter",
    name: "Plagiarism Adapter",
    description: "Modular adapter for Turnitin, iThenticate, or open-source checkers.",
    status: "placeholder",
  },
];

export function getAiModule(id: AiModuleId): AiModule | undefined {
  return AI_MODULES.find((m) => m.id === id);
}
