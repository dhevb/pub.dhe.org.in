import Link from "next/link";
import { SPECIAL_ISSUES } from "@/lib/content/homepage";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

export function SpecialIssuesSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="special-issues-heading">
      <div className="container-wide">
        <h2 id="special-issues-heading" className="heading-section mb-10 text-center">
          Special Issues
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {SPECIAL_ISSUES.map((issue) => (
            <Card key={issue.title}>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{issue.title}</CardTitle>
                <Badge variant={issue.status === "Open" ? "success" : "default"}>
                  {issue.status}
                </Badge>
              </div>
              <CardContent className="mt-2 text-sm text-text-muted">
                {issue.deadline}
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/vbe.rase/SubmitManuscript" className="font-medium text-primary hover:underline">
            Submit to a special issue →
          </Link>
        </p>
      </div>
    </section>
  );
}
