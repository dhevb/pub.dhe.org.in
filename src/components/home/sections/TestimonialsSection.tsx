import { TESTIMONIALS } from "@/lib/content/homepage";
import { Card, CardContent } from "@/components/ui/Card";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="testimonials-heading">
      <div className="container-wide">
        <h2 id="testimonials-heading" className="heading-section mb-10 text-center">
          What Researchers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.author} glass className="h-full">
              <CardContent>
                <p className="italic leading-relaxed text-text-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-text">{t.author}</p>
                <p className="text-sm text-text-muted">{t.affiliation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
