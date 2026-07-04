import { JournalHomepage } from "@/components/home/JournalHomepage";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";

const journal = getJournal("vbe");

export default function HomePage() {
  return (
    <JournalShell journal={journal}>
      <JournalHomepage journal={journal} />
    </JournalShell>
  );
}
