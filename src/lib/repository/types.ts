export type RepositoryAssetType =
  | "dataset"
  | "code"
  | "supplementary"
  | "presentation"
  | "poster"
  | "video"
  | "image"
  | "project"
  | "book"
  | "book-chapter"
  | "thesis"
  | "dissertation"
  | "policy-paper"
  | "white-paper"
  | "innovation";

export interface RepositoryAsset {
  id: string;
  type: RepositoryAssetType;
  title: string;
  description?: string;
  href: string;
  doi?: string;
  relatedPaperId?: string;
  publishedAt?: string;
  license?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  institution: string;
  status: "active" | "completed" | "archived";
  assets: RepositoryAsset[];
}

/** Future: connect to institutional repository / Zenodo / OSF. */
export const REPOSITORY_PROVIDERS = [
  { id: "internal", name: "VBJ Research Repository", status: "architecture" },
  { id: "zenodo", name: "Zenodo", status: "placeholder" },
  { id: "osf", name: "Open Science Framework", status: "placeholder" },
] as const;
