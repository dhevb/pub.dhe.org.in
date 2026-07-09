import type { SearchIndexItem } from "@/lib/content/search-index";
import { BalShodhPreviewSection } from "./sections/BalShodhPreviewSection";
import { CallForPapersSection } from "./sections/CallForPapersSection";
import { ConferencePreviewSection } from "./sections/ConferencePreviewSection";
import { EditorialHighlightsSection } from "./sections/EditorialHighlightsSection";
import { FAQSection } from "./sections/FAQSection";
import { HeroSection } from "./sections/HeroSection";
import { JournalCardsSection } from "./sections/JournalCardsSection";
import { JournalFeaturesSection } from "./sections/JournalFeaturesSection";
import { LatestPapersSection } from "./sections/LatestPapersSection";
import { MissionSection } from "./sections/MissionSection";
import { NewsletterSection } from "./sections/NewsletterSection";
import { PartnersSection } from "./sections/PartnersSection";
import { PublicationProcessSection } from "./sections/PublicationProcessSection";
import { PublicationSearchSection } from "./sections/PublicationSearchSection";
import { ResearchDomainsSection } from "./sections/ResearchDomainsSection";
import { SpecialIssuesSection } from "./sections/SpecialIssuesSection";
import { StatsSection } from "./sections/StatsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { WhyPublishSection } from "./sections/WhyPublishSection";

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
