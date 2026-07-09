import { PortalShell } from "@/components/layout/PortalShell";
import { AdvancedSearchClient } from "@/components/search/AdvancedSearchClient";
import { buildPaperSearchIndex } from "@/lib/content/search-index";
import { indexToSearchDocuments } from "@/lib/search/from-index";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description:
    "Full-text search with filters across journals, languages, years, authors, and keywords on Viksit Bharat Journal.",
  path: "/search",
});

export default async function SearchPage() {
  const index = await buildPaperSearchIndex();
  const documents = indexToSearchDocuments(index);

  return (
    <PortalShell>
      <div className="container-wide section-padding">
        <header className="mb-10 text-center">
          <h1 className="heading-display mb-4">Global Search</h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            Full-text search across all journal editions, published papers, and
            conference proceedings. Filter by journal, language, year, author,
            and keywords.
          </p>
        </header>
        <AdvancedSearchClient documents={documents} />
      </div>
    </PortalShell>
  );
}
