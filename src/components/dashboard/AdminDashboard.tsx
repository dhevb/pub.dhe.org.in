import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  getAnnouncements,
  getCmsFaqs,
  getNewsItems,
  getSiteSettings,
} from "@/lib/cms";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AdminDashboardView() {
  const site = getSiteSettings();
  const announcements = getAnnouncements();
  const news = getNewsItems();
  const faqs = getCmsFaqs();

  return (
    <div className="space-y-8">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">File-based CMS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Site content is managed via JSON files in the <code className="rounded bg-muted px-1">content/</code> directory.
            Edit files and redeploy to update the platform.
          </p>
          <p>
            Read-only preview API:{" "}
            <Link href="/api/cms" className="text-primary hover:underline">
              /api/cms
            </Link>
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Site settings</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-medium">{site.siteName}</p>
            <p className="text-muted-foreground">{site.tagline}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              File: content/site.json
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{announcements.length}</p>
            <p className="text-xs text-muted-foreground">content/announcements.json</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">News items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{news.length}</p>
            <p className="text-xs text-muted-foreground">content/news.json</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{faqs.length}</p>
            <p className="text-xs text-muted-foreground">content/faqs.json</p>
          </CardContent>
        </Card>
      </div>

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
