import BooksCard from "../component/BookCard";
import { PortalShell } from "@/components/layout/PortalShell";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Books & Publications",
  description:
    "Featured books, conference reports, and publications from the Viksit Bharat Journal ecosystem.",
  path: "/Books",
});

export default function BooksPage() {
  return (
    <PortalShell>
      <BooksCard />
    </PortalShell>
  );
}
