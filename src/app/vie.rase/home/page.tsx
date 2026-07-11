import { redirect } from "next/navigation";

/** Legacy route — permanent redirect to /vie */
export default function VieHomeLegacyPage() {
  redirect("/vie");
}
