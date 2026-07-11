import { redirect } from "next/navigation";

/** Legacy route — permanent redirect to /vbh */
export default function VbhHomeLegacyPage() {
  redirect("/vbh");
}
