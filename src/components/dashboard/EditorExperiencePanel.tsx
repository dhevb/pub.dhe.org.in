import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EditorialWorkflowPanel } from "./EditorialWorkflowPanel";

const QUEUE = [
  { label: "Pending submissions", value: "—", color: "text-primary" },
  { label: "Under review", value: "—", color: "" },
  { label: "Revision requested", value: "—", color: "" },
  { label: "Accepted", value: "—", color: "text-green-700" },
  { label: "Rejected", value: "—", color: "" },
  { label: "Published", value: "20", color: "text-primary" },
];

const ACTIVITY = [
  "New submission received — awaiting screening",
  "Reviewer invitation sent — pending response",
  "Editorial decision queue — API integration pending",
];

export function EditorExperiencePanel() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUEUE.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent editorial activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {ACTIVITY.map((a) => (
              <li key={a} className="border-l-2 border-primary/30 pl-3">
                {a}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <EditorialWorkflowPanel />
    </div>
  );
}
