import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  getAnnouncements,
  getCmsFaqs,
  getEditorialBoard,
  getNewsItems,
  getResearchCategories,
  getSiteSettings,
} from "@/lib/cms";
import { IDENTIFIER_PROVIDERS } from "@/lib/identifiers";
import { AI_MODULES } from "@/lib/ai";
import { getActiveProviders } from "@/lib/analytics";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CMS_FILES = [
  "content/site.json",
  "content/announcements.json",
  "content/news.json",
  "content/faqs.json",
  "content/editorial-board.json",
  "content/research-categories.json",
];

export function AdminDashboardView() {
  const site = getSiteSettings();
  const announcements = getAnnouncements();
  const news = getNewsItems();
  const faqs = getCmsFaqs();
  const board = getEditorialBoard();
  const research = getResearchCategories();
  const analytics = getActiveProviders();

  return (
    <div className="space-y-8">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">File-based CMS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Manage site settings, announcements, news, FAQs, editorial board,
            research categories, navigation, and SEO via JSON in{" "}
            <code className="rounded bg-muted px-1">content/</code>.
          </p>
          <p>
            Preview API:{" "}
            <Link href="/api/cms" className="text-primary hover:underline">
              /api/cms
            </Link>
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Site settings", value: site.siteName, file: "site.json" },
          { label: "Announcements", value: String(announcements.length), file: "announcements.json" },
          { label: "News", value: String(news.length), file: "news.json" },
          { label: "FAQs", value: String(faqs.length), file: "faqs.json" },
          { label: "Editorial board", value: String(board.length), file: "editorial-board.json" },
          { label: "Research categories", value: String(research.categories.length), file: "research-categories.json" },
        ].map((item) => (
          <Card key={item.file}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">content/{item.file}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">CMS files</h2>
        <Card>
          <CardContent className="grid gap-2 pt-6 text-sm md:grid-cols-2">
            {CMS_FILES.map((f) => (
              <code key={f} className="rounded bg-muted px-2 py-1">
                {f}
              </code>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Indexing &amp; AI architecture</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Identifier providers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {IDENTIFIER_PROVIDERS.map((p) => (
                <p key={p.id}>
                  <span className="font-medium">{p.name}</span> — {p.status}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI modules (placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {AI_MODULES.map((m) => (
                <p key={m.id}>{m.name}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Analytics</h2>
        <Card>
          <CardContent className="pt-6 text-sm">
            {analytics.length > 0 ? (
              <ul className="list-inside list-disc">
                {analytics.map((p) => (
                  <li key={p.id}>{p.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No analytics providers configured. See .env.example for GA, Clarity, Plausible, Matomo.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Active announcements</h2>
        <div className="space-y-3">
          {announcements.map((a) => (
            <Card key={a.id}>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium">{a.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(a.publishedAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Platform settings</h2>
        <Card>
          <CardContent className="grid gap-3 pt-6 text-sm md:grid-cols-2">
            <div>
              <span className="text-muted-foreground">Publisher</span>
              <p>{site.publisher}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email</span>
              <p>{site.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">ORCID</span>
              <p>{site.orcidEnabled ? "Enabled" : "Disabled"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Crossref ready</span>
              <p>{site.crossrefReady ? "Yes" : "No"}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Address</span>
              <p>{site.address}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
