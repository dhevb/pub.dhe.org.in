import { PortalShell } from "@/components/layout/PortalShell";
import AllArticle from "../component/AllArticle";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "All Articles",
  description:
    "Browse all open-access research articles published across Viksit Bharat Journal editions and conference proceedings.",
  path: "/AllArticle",
});

export default function AllArticlesPage() {
  return (
    <PortalShell>
      <div className="container-wide section-padding">
        <AllArticle />
      </div>
    </PortalShell>
  );
}
