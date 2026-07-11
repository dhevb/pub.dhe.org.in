import { redirect } from "next/navigation";

/** Legacy route — permanent redirect to /vih */
export default function VihHomeLegacyPage() {
  redirect("/vih");
}
