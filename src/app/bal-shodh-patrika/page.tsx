import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Bal Shodh Patrika",
  description:
    "बाल शोध पत्रिका — A dedicated ecosystem for school students to publish projects, innovations, experiments, and creative research across Bharat.",
  path: "/bal-shodh-patrika",
});

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
  {
    question: "How is Bal Shodh Patrika related to Viksit Bharat Journal?",
    answer:
      "Bal Shodh Patrika is the school research track within the Viksit Bharat Journal ecosystem — designed specifically for young researchers.",
  },
];

const CATEGORIES = [
  { title: "Science Projects", desc: "Experiments, lab work, and scientific investigations" },
  { title: "Innovation Reports", desc: "Original inventions and creative solutions" },
  { title: "Model Making", desc: "Working models and scientific exhibitions" },
  { title: "Community Research", desc: "Social surveys and community improvement studies" },
  { title: "Teacher-Guided Research", desc: "Mentored research with school faculty" },
  { title: "Student Awards", desc: "Recognition for outstanding young researchers" },
];

const SUBMISSION_STEPS = [
  "Register with teacher guidance",
  "Prepare project report or research paper",
  "Submit via manuscript portal",
  "Editorial review & feedback",
  "Publication in Bal Shodh Patrika",
];

export default function BalShodhPatrikaPage() {
  return (
    <PortalShell>
      <JsonLd data={faqSchema(BAL_SHODH_FAQS)} />

      <div className="container-wide section-padding">
        <section className="mb-16 text-center">
          <Badge variant="accent" className="mb-4">
            Student Research Initiative
          </Badge>
          <h1 className="heading-display mb-4">Bal Shodh Patrika</h1>
          <p className="font-devanagari text-2xl text-green">बाल शोध पत्रिका</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
            Because brilliant minds start young. A dedicated platform for school
            students to publish genuine research, guided by teachers and supported
            by schools across Bharat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/vbe.rase/SubmitManuscript">
              <Button>Submit Student Research</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">Author Guidelines</Button>
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="heading-section mb-8 text-center">Research Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>{item.desc}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-xl bg-gradient-to-br from-green/5 to-saffron/5 p-8 md:p-12">
          <h2 className="heading-section mb-8 text-center">Submission Process</h2>
          <ol className="mx-auto grid max-w-3xl gap-4 md:grid-cols-5">
            {SUBMISSION_STEPS.map((step, i) => (
              <li key={step} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green text-sm font-bold text-white">
                  {i + 1}
                </div>
                <p className="text-sm text-text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="text-center">
          <h2 className="heading-section mb-4">Archives</h2>
          <p className="mb-6 text-text-muted">
            Published student research is preserved in the permanent Viksit Bharat
            Journal archive alongside all journal editions.
          </p>
          <Link href="/search?q=bal">
            <Button variant="secondary">Browse Student Research</Button>
          </Link>
        </section>
      </div>
    </PortalShell>
  );
}
