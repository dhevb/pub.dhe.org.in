import Image from "next/image";
import Link from "next/link";
import { JOURNAL_LIST } from "@/lib/journals/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const JournalCard = () => (
  <section className="section-padding" aria-labelledby="all-journals-heading">
    <div className="container-wide">
      <h1 id="all-journals-heading" className="heading-section mb-4 text-center">
        All Journals
      </h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-text-muted">
        Browse all Viksit Bharat and Viksit India journals — English and Hindi editions.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {JOURNAL_LIST.map((journal) => (
          <Card key={journal.id} className="flex h-full flex-col">
            <CardHeader>
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src={journal.logo}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-lg object-contain"
                />
                <Badge variant={journal.language === "hi" ? "accent" : "primary"}>
                  {journal.language === "hi" ? "हिंदी" : "English"}
                </Badge>
              </div>
              <CardTitle className="text-base leading-snug">{journal.name}</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col gap-2">
              <Link href={journal.entryRoute}>
                <Button variant="secondary" className="w-full">
                  Visit Journal
                </Button>
              </Link>
              <Link href={`${journal.routePrefix}/SubmitManuscript`}>
                <Button variant="ghost" className="w-full">
                  Submit Manuscript
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default JournalCard;
