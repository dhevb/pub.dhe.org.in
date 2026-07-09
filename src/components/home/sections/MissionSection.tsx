import { MISSION_PILLARS } from "@/lib/content/homepage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function MissionSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="mission-heading">
      <div className="container-wide">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="mission-heading" className="heading-section mb-4">
            Knowledge for Society
          </h2>
          <p className="text-lg text-text-muted">
            Research for nation building. Open collaboration. Inclusive publishing.
            Every knowledge creator deserves a platform.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {MISSION_PILLARS.map((pillar) => (
            <Card key={pillar.title} className="h-full">
              <CardHeader>
                <CardTitle className="text-primary">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>{pillar.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
