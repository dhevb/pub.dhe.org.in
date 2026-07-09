import type { ArticleIdentifiers, IdentifierProvider, IdentifierProviderId } from "./types";

export const IDENTIFIER_PROVIDERS: IdentifierProvider[] = [
  {
    id: "doi",
    name: "DOI (Digital Object Identifier)",
    description: "Crossref/DataCite persistent identifier for scholarly objects.",
    status: "configured",
    resolveUrl: (doi) => `https://doi.org/${doi}`,
  },
  {
    id: "orcid",
    name: "ORCID iD",
    description: "Author persistent identifier — OAuth integration planned.",
    status: "configured",
    resolveUrl: (id) => `https://orcid.org/${id}`,
  },
  {
    id: "crossref",
    name: "Crossref",
    description: "Metadata deposit and DOI registration via Crossref API.",
    status: "placeholder",
    metadata: { api: "https://api.crossref.org" },
  },
  {
    id: "datacite",
    name: "DataCite",
    description: "Dataset and research object DOI registration.",
    status: "placeholder",
    metadata: { api: "https://api.datacite.org" },
  },
  {
    id: "openalex",
    name: "OpenAlex",
    description: "Open bibliographic graph for works and institutions.",
    status: "placeholder",
    resolveUrl: (id) => `https://openalex.org/${id}`,
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    description: "AI-powered academic search and paper graph.",
    status: "placeholder",
    resolveUrl: (id) => `https://www.semanticscholar.org/paper/${id}`,
  },
  {
    id: "google-scholar",
    name: "Google Scholar",
    description: "Scholar indexing via citation meta tags on paper pages.",
    status: "active",
  },
  {
    id: "scopus",
    name: "Scopus",
    description: "Elsevier abstract and citation database indexing.",
    status: "placeholder",
  },
  {
    id: "ugc-care",
    name: "UGC CARE",
    description: "UGC-approved journal list compliance for Indian academia.",
    status: "placeholder",
  },
  {
    id: "issn",
    name: "ISSN",
    description: "International Standard Serial Number for the journal.",
    status: "configured",
    resolveUrl: (issn) => `https://portal.issn.org/resource/ISSN/${issn}`,
  },
  {
    id: "isbn",
    name: "ISBN",
    description: "Book and proceedings identifiers (Bal Shodh, conferences).",
    status: "placeholder",
  },
  {
    id: "archive",
    name: "Permanent Archive",
    description: "LOCKSS/CLOCKSS or institutional archive deposit.",
    status: "placeholder",
  },
];

export function getProvider(id: IdentifierProviderId): IdentifierProvider | undefined {
  return IDENTIFIER_PROVIDERS.find((p) => p.id === id);
}

/** Build DOI from configured prefix + journal/paper slug when no DOI in data. */
export function buildArticleDoi(
  doiPrefix: string,
  journalId: string,
  paperNum: number
): string | undefined {
  if (!doiPrefix) return undefined;
  return `${doiPrefix}/${journalId}.paper${paperNum}`;
}

export function resolveIdentifierLinks(ids: ArticleIdentifiers): Record<string, string> {
  const links: Record<string, string> = {};
  if (ids.doi) {
    const p = getProvider("doi");
    if (p?.resolveUrl) links.doi = p.resolveUrl(ids.doi);
  }
  if (ids.openAlexId) {
    const p = getProvider("openalex");
    if (p?.resolveUrl) links.openAlex = p.resolveUrl(ids.openAlexId);
  }
  return links;
}
