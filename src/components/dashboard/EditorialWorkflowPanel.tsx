import type { EditorialDecision, ManuscriptStatus } from "@/lib/editorial";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const DECISIONS: { id: EditorialDecision; label: string; variant: "default" | "success" | "primary" | "accent" }[] = [
  { id: "accept", label: "Accept", variant: "success" },
  { id: "minor_revision", label: "Minor Revision", variant: "accent" },
  { id: "major_revision", label: "Major Revision", variant: "primary" },
  { id: "reject", label: "Reject", variant: "default" },
];

const STATUS_FLOW: ManuscriptStatus[] = [
  "submitted",
  "screening",
  "under_review",
  "revision_requested",
  "accepted",
  "scheduled",
  "published",
];

export function EditorialWorkflowPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Review queue</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="mb-4">
            Production workflow architecture is ready. Connect to the editorial API
            to enable live reviewer assignment and decisions.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 pr-4 font-medium">Manuscript</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Status</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Reviewers</th>
                  <th scope="col" className="py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4">—</td>
                  <td className="py-3 pr-4">
                    <Badge>awaiting API</Badge>
                  </td>
                  <td className="py-3 pr-4">0 assigned</td>
                  <td className="py-3 text-primary">Assign reviewer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DECISIONS.map((d) => (
          <Card key={d.id}>
            <CardContent className="pt-6">
              <Badge variant={d.variant}>{d.label}</Badge>
              <p className="mt-2 text-xs text-muted-foreground">
                Decision type registered in editorial workflow module.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Decision timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-wrap gap-2" aria-label="Editorial status flow">
            {STATUS_FLOW.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-muted px-2 py-1 capitalize">
                  {s.replace(/_/g, " ")}
                </span>
                {i < STATUS_FLOW.length - 1 && (
                  <span aria-hidden className="text-muted-foreground">→</span>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
