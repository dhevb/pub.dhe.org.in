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
  { id: "oai-pmh", name: "OAI-PMH 2.0", mimeType: "text/xml", status: "placeholder" },
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

/** Placeholder — wire to Crossref REST API when credentials available. */
export async function registerDoi(
  _request: DoiRegistrationRequest
): Promise<{ status: "queued"; id: string }> {
  return { status: "queued", id: `pending-${Date.now()}` };
}
