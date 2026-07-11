import { HindiText } from "@/components/ui/HindiText";
import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { ABOUT_SECTIONS, AIM_AND_SCOPE } from "@/lib/content/about";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/metadata";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "About the Journal",
  description:
    "Learn about Viksit Bharat Journal — our mission, vision, open access policy, peer review process, publication ethics, and multidisciplinary aim & scope.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PortalShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ])}
      />

      <div className="container-wide section-padding">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="primary" className="mb-4">
            About Viksit Bharat Journal
          </Badge>
          <h1 className="heading-display mb-4">A Bharatiya Knowledge Journal</h1>
          <HindiText as="p" className="text-xl text-green">
            {siteConfig.nameHindi}
          </HindiText>
          <p className="mt-6 text-lg text-text-muted">
            {siteConfig.description}
          </p>
        </header>

        <div className="mx-auto max-w-4xl space-y-16">
          {ABOUT_SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="heading-section mb-4">{section.title}</h2>
              <p className="text-lg leading-relaxed text-text-muted">
                {section.content}
              </p>
            </section>
          ))}

          <section id="aim-scope" className="scroll-mt-24">
            <h2 className="heading-section mb-6">Aim & Scope</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {AIM_AND_SCOPE.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-muted">
                      <span className="text-primary" aria-hidden>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-xl bg-navy p-8 text-center text-white md:p-12">
            <h2 className="font-display text-2xl font-bold mb-4">
              Ready to Contribute?
            </h2>
            <p className="mb-6 text-white/70">
              Join researchers, teachers, students, and innovators publishing
              with Viksit Bharat Journal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/vbe.rase/SubmitManuscript">
                <Button>Submit Manuscript</Button>
              </Link>
              <Link href="/ContactUs">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-navy"
                >
                  Contact Editorial Office
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
