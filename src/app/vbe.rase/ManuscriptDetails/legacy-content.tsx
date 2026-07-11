"use client";

import { LegacyManuscriptGate } from "@/components/journal/legacy/LegacyManuscriptGate";
import ManuscriptDetails from "../../component/vbe_Component/ManuscriptDetails";
import Login from "../../component/vbe_Component/Login";

export default function LegacyContent() {
  return (
    <LegacyManuscriptGate ManuscriptDetails={ManuscriptDetails} Login={Login} />
  );
}
