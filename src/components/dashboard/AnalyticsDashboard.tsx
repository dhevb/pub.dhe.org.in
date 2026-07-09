import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PAPER_PATHS } from "@/lib/qa/paths";

export interface DashboardMetrics {
  totalPapers: number;
  totalViews: string;
  totalDownloads: string;
  acceptanceRate: string;
  submissionsThisMonth: string;
  topCountries: string[];
  searchKeywords: string[];
}

/** Static baseline metrics — replace with analytics backend when available. */
export function getDashboardMetrics(): DashboardMetrics {
  return {
    totalPapers: PAPER_PATHS.length,
    totalViews: "—",
    totalDownloads: "—",
    acceptanceRate: "—",
    submissionsThisMonth: "—",
    topCountries: ["India", "—", "—"],
    searchKeywords: ["education", "research", "bharat"],
  };
}

export function AnalyticsDashboard() {
  const m = getDashboardMetrics();

  const tiles = [
    { label: "Published papers", value: String(m.totalPapers) },
    { label: "Page views (30d)", value: m.totalViews },
    { label: "Downloads (30d)", value: m.totalDownloads },
    { label: "Acceptance rate", value: m.acceptanceRate },
    { label: "Submissions (month)", value: m.submissionsThisMonth },
    { label: "Reviewer stats", value: "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Card key={t.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{t.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top countries</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {m.topCountries.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {m.searchKeywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full bg-muted px-3 py-1 text-xs"
                >
                  {k}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
