"use client";

import { LegacyManuscriptGate } from "@/components/journal/legacy/LegacyManuscriptGate";
import ManuscriptDetails from "../../component/vih_Component/ManuscriptDetails";
import Login from "../../component/vih_Component/Login";

export default function LegacyContent() {
  return (
    <LegacyManuscriptGate ManuscriptDetails={ManuscriptDetails} Login={Login} />
  );
}
