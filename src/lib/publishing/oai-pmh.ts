import type { SearchIndexItem } from "@/lib/content/search-index";
import { SITE_URL } from "@/lib/site-url";
import { siteConfig } from "@/lib/seo/metadata";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildOaiIdentify(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/ http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="Identify">${SITE_URL}/api/oai</request>
  <Identify>
    <repositoryName>${escapeXml(siteConfig.name)}</repositoryName>
    <baseURL>${SITE_URL}/api/oai</baseURL>
    <protocolVersion>2.0</protocolVersion>
    <adminEmail>${escapeXml(siteConfig.email)}</adminEmail>
    <earliestDatestamp>2023-01-01T00:00:00Z</earliestDatestamp>
    <deletedRecord>no</deletedRecord>
    <granularity>YYYY-MM-DDThh:mm:ssZ</granularity>
  </Identify>
</OAI-PMH>`;
}

export function buildOaiListRecords(items: SearchIndexItem[]): string {
  const records = items
    .map(
      (item) => `<record>
    <header>
      <identifier>oai:pub.dhe.org.in:${escapeXml(item.id)}</identifier>
      <datestamp>${item.year ?? 2023}-01-01T00:00:00Z</datestamp>
    </header>
    <metadata>
      <oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title>${escapeXml(item.title)}</dc:title>
        <dc:creator>${escapeXml(item.authors?.join("; ") ?? "Unknown")}</dc:creator>
        <dc:identifier>${SITE_URL}${item.href}</dc:identifier>
        <dc:type>Text.Serial.Journal</dc:type>
        <dc:language>${item.journal.language === "hi" ? "hi" : "en"}</dc:language>
        <dc:publisher>${escapeXml(siteConfig.publisher)}</dc:publisher>
      </oai_dc:dc>
    </metadata>
  </record>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListRecords" metadataPrefix="oai_dc">${SITE_URL}/api/oai</request>
  <ListRecords>${records}</ListRecords>
</OAI-PMH>`;
}
