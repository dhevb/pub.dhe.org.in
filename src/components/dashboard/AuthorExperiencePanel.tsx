import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SubmissionTimeline } from "./SubmissionTimeline";
import { getSiteSettings } from "@/lib/cms";
import Link from "next/link";

const AUTHOR_FEATURES = [
  {
    title: "Revision requests",
    status: "None pending",
    href: "/dashboard",
  },
  {
    title: "Acceptance letter",
    status: "Available after editorial decision",
    href: "/dashboard",
  },
  {
    title: "Publication certificate",
    status: "Download after acceptance",
    href: "/dashboard",
  },
  {
    title: "Saved drafts",
    status: "Continue submission",
    href: "/vbe.rase/SubmitManuscript",
  },
  {
    title: "Bookmarks",
    status: "Save papers for later reading",
    href: "/search",
  },
  {
    title: "Notifications",
    status: "Email workflow architecture ready",
    href: "/dashboard",
  },
] as const;

export function AuthorExperiencePanel() {
  const site = getSiteSettings();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submission timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <SubmissionTimeline currentStep="submitted" />
          <p className="mt-4 text-xs text-muted-foreground">
            Status updates sync from the editorial workflow when Supabase is enabled.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Card className="border-primary/20">
          <CardContent className="grid gap-3 pt-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-medium">Profile completion</p>
              <p className="text-muted-foreground">Link ORCID in account settings</p>
            </div>
            <div>
              <p className="font-medium">ORCID</p>
              <p className="text-muted-foreground">
                {site.orcidEnabled ? "Integration ready" : "Not configured"}
              </p>
            </div>
            <div>
              <p className="font-medium">DOI status</p>
              <p className="text-muted-foreground">
                {site.crossrefReady ? "Crossref architecture ready" : "Pending DOI prefix"}
              </p>
            </div>
            <div>
              <p className="font-medium">Publication history</p>
              <p className="text-muted-foreground">20 papers in corpus</p>
            </div>
          </CardContent>
        </Card>

        {AUTHOR_FEATURES.map((item) => (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.status}</p>
              </div>
              <Link href={item.href} className="text-sm text-primary hover:underline">
                Open
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
