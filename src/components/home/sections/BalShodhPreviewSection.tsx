import Link from "next/link";
import { HindiText } from "@/components/ui/HindiText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const BAL_SHODH_ITEMS = [
  "Science projects & experiments",
  "Innovation reports & inventions",
  "Model making & exhibitions",
  "Community research surveys",
  "Teacher-guided student research",
  "Student awards & recognition",
];

export function BalShodhPreviewSection() {
  return (
    <section
      className="section-padding bg-gradient-to-br from-green/5 via-background to-saffron/5"
      aria-labelledby="bal-shodh-heading"
    >
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge variant="accent" className="mb-4">
            Student Research Initiative
          </Badge>
          <h2 id="bal-shodh-heading" className="heading-section mb-2">
            Bal Shodh Patrika
          </h2>
          <HindiText as="p" className="mb-4 text-xl text-green">
            बाल शोध पत्रिका
          </HindiText>
          <p className="mb-6 text-text-muted">
            Because brilliant minds start young. A dedicated platform for school
            students to publish genuine research — guided by teachers and
            supported by schools across Bharat.
          </p>
          <Link href="/bal-shodh-patrika">
            <Button variant="secondary">Explore Bal Shodh Patrika</Button>
          </Link>
        </div>
        <Card glass>
          <ul className="space-y-3">
            {BAL_SHODH_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-text-muted">
                <span className="text-green" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
          <CardContent className="mt-6 border-t border-border pt-4 text-sm text-text-muted">
            Classes 6–12 · Teacher-guided submissions · School research track
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
