import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Bal Shodh Patrika",
  description:
    "बाल शोध पत्रिका — A dedicated ecosystem for school students to publish projects, innovations, experiments, and creative research across Bharat.",
  path: "/bal-shodh-patrika",
});

const journal = getJournal("vbe");

const BAL_SHODH_FAQS = [
  {
    question: "Who can submit to Bal Shodh Patrika?",
    answer:
      "School students from Class 6 to 12, guided by teachers, can submit projects, innovations, experiments, and creative research.",
  },
  {
    question: "What types of work can be published?",
    answer:
      "Science projects, model making, community research, innovation reports, experiments, creative writing with research basis, and teacher-guided studies.",
  },
];

export default function BalShodhPatrikaPage() {
  return (
    <JournalShell journal={journal}>
      <JsonLd data={faqSchema(BAL_SHODH_FAQS)} />

      <section className="mb-12 text-center">
        <Badge variant="accent" className="mb-4">Student Research Initiative</Badge>
        <h1 className="heading-display mb-4">Bal Shodh Patrika</h1>
        <p className="font-devanagari text-2xl text-accent">बाल शोध पत्रिका</p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
          Because brilliant minds start young. A dedicated platform for school
          students to publish genuine research, guided by teachers and supported
          by schools across Bharat.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Science Projects", desc: "Experiments, lab work, and scientific investigations" },
          { title: "Innovation Reports", desc: "Original inventions and creative solutions" },
          { title: "Model Making", desc: "Working models and scientific exhibitions" },
          { title: "Community Research", desc: "Social surveys and community improvement studies" },
          { title: "Teacher-Guided Research", desc: "Mentored research with school faculty" },
          { title: "Student Awards", desc: "Recognition for outstanding young researchers" },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>{item.desc}</CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-16 text-center">
        <h2 className="heading-section mb-6">Ready to Publish Your Project?</h2>
        <Link href={`${journal.routePrefix}/SubmitManuscript`}>
          <Button>Submit Student Research</Button>
        </Link>
      </section>
    </JournalShell>
  );
}
