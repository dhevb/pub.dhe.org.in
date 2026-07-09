import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JOURNAL_LIST } from "@/lib/journals/config";

export function EditorDashboardView() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submission queue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">—</p>
            <p className="mt-1 text-sm text-muted-foreground">
              New manuscripts for initial screening. Connects to editorial API when available.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Under review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">—</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Manuscripts with assigned peer reviewers.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Decisions pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">—</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Accept, revise, or reject after review completion.
            </p>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Journal editorial tools</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {JOURNAL_LIST.map((j) => (
            <Card key={j.id}>
              <CardHeader>
                <CardTitle className="text-base">{j.apiPrefix.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 text-sm">
                <Link
                  href={`/${j.apiPrefix}.rase/AddArticle`}
                  className="text-primary hover:underline"
                >
                  Add article
                </Link>
                <Link
                  href={`/${j.apiPrefix}.rase/issues`}
                  className="text-primary hover:underline"
                >
                  Manage issues
                </Link>
                <Link
                  href={`/${j.apiPrefix}.rase/table`}
                  className="text-primary hover:underline"
                >
                  Article table
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
