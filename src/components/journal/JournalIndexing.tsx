import { INDEXING_DATABASES } from "@/lib/content/indexing";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export function JournalIndexing() {
  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="heading-section mb-4">Indexing & Abstracting</h1>
        <p className="mx-auto max-w-2xl text-text-muted">
          Viksit Bharat Journal is architected for international discoverability
          — Google Scholar, DOAJ, Crossref, UGC CARE, and major academic databases.
        </p>
      </header>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="success">Open Access</Badge>
            <Badge variant="primary">Peer Reviewed</Badge>
            <Badge variant="secondary">Google Scholar Ready</Badge>
          </div>
          <p className="text-text-muted">
            All published articles include structured metadata, citation tags, and
            JSON-LD scholarly article schema for indexing services.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {INDEXING_DATABASES.map((db) => (
          <div
            key={db}
            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text"
          >
            {db}
          </div>
        ))}
      </div>
    </div>
  );
}
