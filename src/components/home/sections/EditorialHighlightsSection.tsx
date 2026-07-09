import Link from "next/link";
import { EDITORIAL_HIGHLIGHTS } from "@/lib/content/homepage";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

export function EditorialHighlightsSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="editorial-heading">
      <div className="container-wide">
        <h2 id="editorial-heading" className="heading-section mb-10 text-center">
          Editorial Excellence
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EDITORIAL_HIGHLIGHTS.map((item) => (
            <Link key={item.role} href={item.href}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.role}
                </p>
                <CardTitle className="mt-2 text-base">{item.name}</CardTitle>
                <CardContent className="mt-2 text-sm text-primary">
                  Learn more →
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
