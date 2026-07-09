import dynamic from "next/dynamic";
import type { SearchIndexItem } from "@/lib/content/search-index";
import { HeroSection } from "./sections/HeroSection";
import { MissionSection } from "./sections/MissionSection";
import { WhyPublishSection } from "./sections/WhyPublishSection";
import { StatsSection } from "./sections/StatsSection";

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
const LatestPapersSection = dynamic(() =>
  import("./sections/LatestPapersSection").then((m) => m.LatestPapersSection)
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

interface HomepageProps {
  papers: SearchIndexItem[];
}

export function Homepage({ papers }: HomepageProps) {
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
      <LatestPapersSection papers={papers} />
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
