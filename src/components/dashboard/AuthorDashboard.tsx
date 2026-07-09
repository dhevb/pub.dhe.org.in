import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AuthorExperiencePanel } from "./AuthorExperiencePanel";
import { AuthorQuickLinks, ManuscriptList } from "./ManuscriptList";

export function AuthorDashboardView() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-semibold">Your submissions</h2>
        <ManuscriptList />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Submit to a journal</h2>
        <AuthorQuickLinks />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Author experience</h2>
        <AuthorExperiencePanel />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Legacy manuscript view</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Full detail view with co-authors is still available at the legacy route.</p>
            <Link
              href="/vbe.rase/ManuscriptDetails"
              className="mt-2 inline-block text-primary hover:underline"
            >
              Open Manuscript Details →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Publication certificates</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Certificates will be available here after editorial acceptance. Contact{" "}
            <a href="mailto:pub.dhe4@gmail.com" className="text-primary hover:underline">
              pub.dhe4@gmail.com
            </a>{" "}
            for assistance.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
