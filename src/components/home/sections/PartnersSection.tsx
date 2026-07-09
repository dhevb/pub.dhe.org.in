import { PARTNER_TYPES } from "@/lib/content/homepage";
import { Badge } from "@/components/ui/Badge";

export function PartnersSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="partners-heading">
      <div className="container-wide text-center">
        <h2 id="partners-heading" className="heading-section mb-4">
          Partner Institutions
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-text-muted">
          Collaborating with universities, schools, research institutions, NGOs,
          and innovation labs across Bharat.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {PARTNER_TYPES.map((partner) => (
            <Badge key={partner} variant="secondary" className="px-4 py-2 text-sm">
              {partner}
            </Badge>
          ))}
        </div>
        <p className="mt-8 text-sm text-text-muted">
          Interested in institutional membership?{" "}
          <a href="mailto:pub.dhe4@gmail.com" className="text-primary hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
}
