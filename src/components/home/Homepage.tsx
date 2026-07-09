import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HeroSection } from "./sections/HeroSection";
import { MissionSection } from "./sections/MissionSection";
import { WhyPublishSection } from "./sections/WhyPublishSection";
import { StatsSection } from "./sections/StatsSection";
import { LatestPapersSection } from "./sections/LatestPapersSection";

const ResearchDomainsSection = dynamic(() =>
  import("./sections/ResearchDomainsSection").then((m) => m.ResearchDomainsSection)
);
const JournalFeaturesSection = dynamic(() =>
  import("./sections/JournalFeaturesSection").then((m) => m.JournalFeaturesSection)
);
const PublicationProcessSection = dynamic(() =>
  import("./sections/PublicationProcessSection").then((m) => m.PublicationProcessSection)
);
const EditorialHighlightsSection = dynamic(() =>
  import("./sections/EditorialHighlightsSection").then((m) => m.EditorialHighlightsSection)
);
const JournalCardsSection = dynamic(() =>
  import("./sections/JournalCardsSection").then((m) => m.JournalCardsSection)
);
const SpecialIssuesSection = dynamic(() =>
  import("./sections/SpecialIssuesSection").then((m) => m.SpecialIssuesSection)
);
const ConferencePreviewSection = dynamic(() =>
  import("./sections/ConferencePreviewSection").then((m) => m.ConferencePreviewSection)
);
const BalShodhPreviewSection = dynamic(() =>
  import("./sections/BalShodhPreviewSection").then((m) => m.BalShodhPreviewSection)
);
const CallForPapersSection = dynamic(() =>
  import("./sections/CallForPapersSection").then((m) => m.CallForPapersSection)
);
const PartnersSection = dynamic(() =>
  import("./sections/PartnersSection").then((m) => m.PartnersSection)
);
const TestimonialsSection = dynamic(() =>
  import("./sections/TestimonialsSection").then((m) => m.TestimonialsSection)
);
const FAQSection = dynamic(() =>
  import("./sections/FAQSection").then((m) => m.FAQSection)
);
const PublicationSearchSection = dynamic(() =>
  import("./sections/PublicationSearchSection").then((m) => m.PublicationSearchSection)
);
const NewsletterSection = dynamic(() =>
  import("./sections/NewsletterSection").then((m) => m.NewsletterSection)
);

export function Homepage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <WhyPublishSection />
      <StatsSection />
      <ResearchDomainsSection />
      <JournalFeaturesSection />
      <PublicationProcessSection />
      <EditorialHighlightsSection />
      <JournalCardsSection />
      <Suspense
        fallback={
          <section className="section-padding bg-background" aria-hidden>
            <div className="container-wide grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-32 rounded-xl" />
              ))}
            </div>
          </section>
        }
      >
        <LatestPapersSection />
      </Suspense>
      <SpecialIssuesSection />
      <ConferencePreviewSection />
      <BalShodhPreviewSection />
      <CallForPapersSection />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <PublicationSearchSection />
      <NewsletterSection />
    </>
  );
}
