export const LEGACY_JOURNAL_SECTIONS = {
  AddArticle: {
    title: "Add Article",
    description: "Submit a new research article to the journal editorial system.",
  },
  ManuscriptDetails: {
    title: "Manuscript Details",
    description: "View and manage your submitted manuscript details and status.",
  },
  issues: {
    title: "Journal Issues",
    description: "Browse all published volumes and issues of the journal.",
  },
  issue: {
    title: "Current Issue",
    description: "Read articles from the current journal issue.",
  },
  table: {
    title: "Article Index",
    description: "Searchable index of all published articles.",
  },
  NewIssue: {
    title: "New Issue",
    description: "Latest journal issue and newly published articles.",
  },
} as const;

export type LegacySection = keyof typeof LEGACY_JOURNAL_SECTIONS;
