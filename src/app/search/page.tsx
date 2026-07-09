import { PortalShell } from "@/components/layout/PortalShell";
import { SearchClient } from "@/components/search/SearchClient";
import { buildPaperSearchIndex } from "@/lib/content/search-index";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description:
    "Search published research articles, journals, and conference proceedings across Viksit Bharat Journal.",
  path: "/search",
});

export default async function SearchPage() {
  const index = await buildPaperSearchIndex();

  return (
    <PortalShell>
      <div className="container-wide section-padding">
        <header className="mb-10 text-center">
          <h1 className="heading-display mb-4">Global Search</h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            Search across all journal editions, published papers, and conference
            proceedings on the Viksit Bharat Journal platform.
          </p>
        </header>
        <SearchClient index={index} />
      </div>
    </PortalShell>
  );
}
