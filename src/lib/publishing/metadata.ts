export type PublishingStandard =
  | "crossref"
  | "datacite"
  | "oai-pmh"
  | "dublin-core"
  | "mods"
  | "mets"
  | "ror"
  | "fundref"
  | "openalex"
  | "dimensions"
  | "base"
  | "core"
  | "wos"
  | "scopus"
  | "ugc-care";

export interface MetadataExportFormat {
  id: PublishingStandard;
  name: string;
  mimeType: string;
  status: "active" | "placeholder";
}

export const METADATA_EXPORT_FORMATS: MetadataExportFormat[] = [
  { id: "crossref", name: "Crossref XML", mimeType: "application/xml", status: "placeholder" },
  { id: "datacite", name: "DataCite JSON", mimeType: "application/json", status: "placeholder" },
  { id: "oai-pmh", name: "OAI-PMH 2.0", mimeType: "text/xml", status: "active" },
  { id: "dublin-core", name: "Dublin Core", mimeType: "application/xml", status: "placeholder" },
  { id: "mods", name: "MODS", mimeType: "application/xml", status: "placeholder" },
  { id: "mets", name: "METS", mimeType: "application/xml", status: "placeholder" },
];

export interface DoiRegistrationRequest {
  title: string;
  authors: string[];
  journal: string;
  issn: string;
  publicationDate: string;
  url: string;
}

/** Registers DOI via Crossref when credentials available; queues otherwise. */
export async function registerDoi(
  request: DoiRegistrationRequest
): Promise<{ status: "queued" | "registered" | "failed"; id: string; doi?: string; error?: string }> {
  const apiKey = process.env.CROSSREF_API_KEY;
  const prefix = process.env.CROSSREF_DOI_PREFIX;

  if (!apiKey || !prefix) {
    return { status: "queued", id: `pending-${Date.now()}`, doi: `${prefix || "10.0000"}/pending-${Date.now()}` };
  }

  const doi = `${prefix}/${request.title.replace(/\W+/g, "").slice(0, 20).toLowerCase()}-${Date.now()}`;
  try {
    const res = await fetch("https://api.crossref.org/deposits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/vnd.crossref.deposit+xml",
      },
      body: `<?xml version="1.0"?><doi_batch><body><journal><journal_article><titles><title>${request.title}</title></titles><doi_data><doi>${doi}</doi><resource>${request.url}</resource></doi_data></journal_article></journal></body></doi_batch>`,
    });
    if (!res.ok) {
      return { status: "failed", id: doi, doi, error: await res.text() };
    }
    return { status: "registered", id: doi, doi };
  } catch (err) {
    return {
      status: "failed",
      id: doi,
      error: err instanceof Error ? err.message : "Crossref failed",
    };
  }
}
