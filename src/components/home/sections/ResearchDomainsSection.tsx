import { JOURNAL_SCOPE, RESEARCH_DOMAINS } from "@/lib/content/homepage";
import { Badge } from "@/components/ui/Badge";

export function ResearchDomainsSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="domains-heading">
      <div className="container-wide">
        <h2 id="domains-heading" className="heading-section mb-4 text-center">
          Research Domains
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-text-muted">
          Explore STEM, social sciences, education, Indian Knowledge Systems, and
          multidisciplinary research across Bharat.
        </p>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {RESEARCH_DOMAINS.map((domain) => (
            <Badge key={domain} variant="secondary" className="text-sm">
              {domain}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {JOURNAL_SCOPE.map((scope) => (
            <Badge key={scope} variant="primary" className="text-xs">
              {scope}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
