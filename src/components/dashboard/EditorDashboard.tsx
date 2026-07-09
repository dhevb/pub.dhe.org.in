import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JOURNAL_LIST } from "@/lib/journals/config";
import { EditorExperiencePanel } from "./EditorExperiencePanel";

export function EditorDashboardView() {
  return (
    <div className="space-y-8">
      <EditorExperiencePanel />

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
