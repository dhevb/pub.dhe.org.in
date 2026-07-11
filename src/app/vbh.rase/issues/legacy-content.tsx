"use client";

import { LegacyIssuesContent } from "@/components/journal/legacy/LegacyIssuesContent";
import AlphabetList from "../../component/vbh_Component/AlphabetList";
import ResearchArticleCard from "../../component/vbh_Component/ResearchArticleCard";

export default function LegacyContent() {
  return (
    <LegacyIssuesContent
      AlphabetList={AlphabetList}
      ResearchArticleCard={ResearchArticleCard}
    />
  );
}
