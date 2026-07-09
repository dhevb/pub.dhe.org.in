import dynamic from "next/dynamic";
import { PortalShell } from "@/components/layout/PortalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPaperSearchIndex } from "@/lib/content/search-index";
import { FAQS } from "@/lib/content/homepage";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, organizationSchema } from "@/lib/seo/schemas";
import type { Metadata } from "next";

const Homepage = dynamic(
  () => import("@/components/home/Homepage").then((m) => m.Homepage),
  { loading: () => <div className="container-wide section-padding animate-pulse">Loading…</div> }
);

export const metadata: Metadata = buildMetadata({
  title: "Viksit Bharat Journal — A Bharatiya Knowledge Journal",
  description:
    "Bharat's indigenous open-access multidisciplinary knowledge journal. Research for nation building — publishing education, innovation, policy, and IKS research for every knowledge creator.",
  path: "/",
});

export default async function HomePage() {
  const papers = await buildPaperSearchIndex();

  return (
    <PortalShell>
      <JsonLd data={[organizationSchema(), faqSchema(FAQS)]} />
      <Homepage papers={papers} />
    </PortalShell>
  );
}
