import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SubmissionTimeline } from "./SubmissionTimeline";

const PLACEHOLDER_ITEMS = [
  { title: "Revision requests", status: "None pending", href: "#" },
  { title: "Reviewer comments", status: "Available after review", href: "#" },
  { title: "Acknowledgement letter", status: "Download after submission", href: "#" },
  { title: "Publication certificate", status: "After acceptance", href: "#" },
  { title: "Saved drafts", status: "Coming soon", href: "/vbe.rase/SubmitManuscript" },
];

export function AuthorExperiencePanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Publication timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <SubmissionTimeline currentStep="submitted" />
          <p className="mt-4 text-xs text-muted-foreground">
            Live status updates connect when editorial workflow API is available.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {PLACEHOLDER_ITEMS.map((item) => (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.status}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
