/** International identifier and indexing registry types. */

export type IdentifierProviderId =
  | "doi"
  | "orcid"
  | "crossref"
  | "datacite"
  | "openalex"
  | "semantic-scholar"
  | "google-scholar"
  | "scopus"
  | "ugc-care"
  | "issn"
  | "isbn"
  | "archive";

export interface IdentifierProvider {
  id: IdentifierProviderId;
  name: string;
  description: string;
  status: "active" | "configured" | "placeholder";
  resolveUrl?: (value: string) => string;
  metadata?: Record<string, string>;
}

export interface ArticleIdentifiers {
  doi?: string;
  orcid?: string[];
  issn?: string;
  isbn?: string;
  openAlexId?: string;
  semanticScholarId?: string;
  scopusId?: string;
  archiveUrl?: string;
}
