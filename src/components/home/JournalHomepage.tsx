"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { JournalConfig } from "@/lib/journals/config";
import {
  CONFERENCE_TRACKS,
  FAQS,
  JOURNAL_SCOPE,
  PAST_CONFERENCES,
  STATISTICS,
  TESTIMONIALS,
} from "@/lib/content/homepage";
import { paperRoute } from "@/lib/journals/config";
import Link from "next/link";
import { useState } from "react";

interface JournalHomepageProps {
  journal: JournalConfig;
}

export function JournalHomepage({ journal }: JournalHomepageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="container-wide section-padding relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="primary" className="mb-6 bg-primary/20 text-white">
              Open Access · Multidisciplinary · Bharatiya
            </Badge>
            <h1 className="heading-display mb-6 text-white animate-fade-in">
              {journal.name}
            </h1>
            <p className="font-devanagari mb-4 text-xl text-white/80">
              {journal.nameHindi}
            </p>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
              Democratizing research publication across every dimension of education.
              From school students to senior scholars — publish genuine research at
              nominal cost.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`${journal.routePrefix}/SubmitManuscript`}>
                <Button>Submit Your Research</Button>
              </Link>
              <Link href={`${journal.routePrefix}/ReadArticlePage`}>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                  Browse Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-warning to-accent" />
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To eliminate journal monopoly and make research publication affordable,
                accessible, and inclusive for every stakeholder in Bharat&apos;s education
                ecosystem — from Bal Shodh scholars to PhD researchers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To become Bharat&apos;s largest open, indigenous, multidisciplinary
                education research ecosystem — representing every dimension of education
                with global standards and Bharatiya identity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Publish */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <h2 className="heading-section mb-12 text-center">Why Publish With Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Open Access", desc: "CC BY 4.0 — free for all readers worldwide" },
              { title: "Nominal APC", desc: "Affordable fees — no journal monopoly" },
              { title: "Rapid Review", desc: "Transparent peer review in 4–6 weeks" },
              { title: "Global Reach", desc: "Indexed and discoverable globally" },
            ].map((item) => (
              <Card key={item.title}>
                <CardTitle className="mb-2 text-primary">{item.title}</CardTitle>
                <CardContent>{item.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Scope */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="heading-section mb-8 text-center">Multidisciplinary Scope</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {JOURNAL_SCOPE.map((scope) => (
              <Badge key={scope} variant="secondary">
                {scope}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Bal Shodh Patrika */}
      <section className="section-padding bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="container-wide">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <Badge variant="accent" className="mb-4">New Initiative</Badge>
              <h2 className="heading-section mb-4">Bal Shodh Patrika</h2>
              <p className="font-devanagari mb-4 text-lg text-accent">
                बाल शोध पत्रिका
              </p>
              <p className="mb-6 text-text-muted">
                A dedicated ecosystem for school students to publish projects,
                innovations, experiments, creative research, and teacher-guided
                research. Because brilliant minds start young.
              </p>
              <Link href="/bal-shodh-patrika">
                <Button variant="secondary">Explore Bal Shodh Patrika</Button>
              </Link>
            </div>
            <Card glass>
              <ul className="space-y-3 text-text-muted">
                <li>✦ School student projects & innovations</li>
                <li>✦ Scientific thinking & experiments</li>
                <li>✦ Creative & community research</li>
                <li>✦ Teacher-guided research</li>
                <li>✦ Model making & scientific exhibitions</li>
                <li>✦ Student awards & recognition</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Conferences */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <h2 className="heading-section mb-4 text-center">Multi-Track Conferences</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-text-muted">
            15 multi-track conferences covering every education discipline under
            the Shiksha Mahakumbh academic council.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CONFERENCE_TRACKS.map((track) => (
              <Card key={track.id} className="p-4 text-center">
                <p className="text-sm font-semibold text-text">{track.name}</p>
                <p className="font-devanagari mt-1 text-xs text-text-muted">
                  {track.nameHi}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/conferences">
              <Button variant="outline">View All Conferences</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="heading-section mb-8 text-center">Latest Articles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: journal.paperCount }, (_, i) => i + 1).map(
              (num) => (
                <Link key={num} href={paperRoute(journal, num)}>
                  <Card className="h-full transition-transform hover:-translate-y-1">
                    <Badge variant="primary" className="mb-2">
                      Vol. 1, Issue 1
                    </Badge>
                    <CardTitle>Paper {num}</CardTitle>
                    <CardContent className="mt-2">
                      Published research article — click to read full paper.
                    </CardContent>
                  </Card>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Past Conferences */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <h2 className="heading-section mb-8 text-center">Past Conferences</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PAST_CONFERENCES.map((conf) => (
              <Card key={conf.name}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{conf.name}</CardTitle>
                    <p className="mt-1 text-sm text-primary">{conf.theme}</p>
                  </div>
                  <Badge>{conf.year}</Badge>
                </div>
                <p className="mt-3 text-sm text-text-muted">
                  {conf.papers} papers published
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/conferences/past">
              <Button variant="ghost">View Full Archive →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-wide">
          <h2 className="heading-section mb-12 text-center text-white">
            Platform Statistics
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STATISTICS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl">{stat.icon}</div>
                <p className="mt-2 font-display text-3xl font-bold">{stat.value}</p>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Workflow */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="heading-section mb-12 text-center">Publication Process</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              "Submit",
              "Initial Review",
              "Peer Review",
              "Revision",
              "Publication",
            ].map((step, i) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="font-semibold text-text">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <h2 className="heading-section mb-8 text-center">What Researchers Say</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} glass>
                <p className="italic text-text-muted">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-semibold text-text">{t.author}</p>
                <p className="text-sm text-text-muted">{t.affiliation}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="heading-section mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Card key={i} className="cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text">{faq.question}</h3>
                  <span className="text-primary">{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && (
                  <p className="mt-3 text-text-muted">{faq.answer}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-narrow text-center">
          <h2 className="heading-section mb-4 text-white">Call for Papers</h2>
          <p className="mb-8 text-white/80">
            Submit your research to Bharat&apos;s indigenous multidisciplinary education journal.
          </p>
          <Link href={`${journal.routePrefix}/SubmitManuscript`}>
            <Button className="bg-white text-primary hover:bg-white/90">
              Submit Manuscript Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
