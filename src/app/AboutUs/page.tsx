import { redirect } from "next/navigation";

/** Legacy route — permanent redirect to /about */
export default function AboutUsLegacyPage() {
  redirect("/about");
}
