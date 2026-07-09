import { JOURNAL_FEATURES } from "@/lib/content/homepage";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";

export function JournalFeaturesSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="features-heading">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 id="features-heading" className="heading-section mb-4">
            Journal Features
          </h2>
          <p className="text-lg text-text-muted">
            A production-grade platform built for Google Scholar indexing,
            international discoverability, and Bharatiya research identity.
          </p>
        </div>
        <Card>
          <ul className="grid gap-3 sm:grid-cols-2">
            {JOURNAL_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
