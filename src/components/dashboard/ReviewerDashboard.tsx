import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getAnnouncements } from "@/lib/cms";

const GUIDELINES = [
  "Maintain confidentiality until publication.",
  "Declare conflicts of interest before accepting a review.",
  "Provide constructive, evidence-based feedback within 21 days.",
  "Use the scoring rubric: originality, methodology, clarity, significance.",
];

export function ReviewerDashboardView() {
  const announcements = getAnnouncements();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">—</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Assignments appear when editors invite you. API integration pending.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">—</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your submitted review history will appear here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Become a reviewer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-muted-foreground">
              Express interest to the editorial office with your ORCID and expertise area.
            </p>
            <a
              href="mailto:pub.dhe4@gmail.com?subject=Reviewer%20application"
              className="mt-2 inline-block text-primary hover:underline"
            >
              Apply via email →
            </a>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Review guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
            {GUIDELINES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {announcements.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Editorial notices</h2>
          <div className="space-y-3">
            {announcements.map((a) => (
              <Card key={a.id}>
                <CardContent className="pt-6">
                  <p className="font-medium">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  {a.href && (
                    <Link href={a.href} className="mt-2 inline-block text-sm text-primary hover:underline">
                      Learn more →
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
