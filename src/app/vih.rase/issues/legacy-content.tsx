"use client";

import { LegacyIssuesContent } from "@/components/journal/legacy/LegacyIssuesContent";
import AlphabetList from "../../component/vih_Component/AlphabetList";
import ResearchArticleCard from "../../component/vih_Component/ResearchArticleCard";

export default function LegacyContent() {
  return (
    <LegacyIssuesContent
      AlphabetList={AlphabetList}
      ResearchArticleCard={ResearchArticleCard}
    />
  );
}
