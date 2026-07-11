import { redirect } from "next/navigation";

/** Legacy route — permanent redirect to /vbe */
export default function VbeHomeLegacyPage() {
  redirect("/vbe");
}
