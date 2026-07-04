import type { JournalId } from "@/lib/journals/config";
import { getJournal } from "@/lib/journals/config";
import type { PaperData } from "@/types/article";

function jsonLoader(
  importer: () => Promise<{ default: unknown }>
): () => Promise<PaperData> {
  return async () => {
    const mod = await importer();
    return mod.default as PaperData;
  };
}

const paperLoaders: Record<JournalId, Record<number, () => Promise<PaperData>>> = {
  vbe: {
    1: jsonLoader(() => import("@/app/vbe.rase/output/Paper1.json")),
    2: jsonLoader(() => import("@/app/vbe.rase/output/Paper2.json")),
    3: jsonLoader(() => import("@/app/vbe.rase/output/Paper3.json")),
    4: jsonLoader(() => import("@/app/vbe.rase/output/Paper4.json")),
    5: jsonLoader(() => import("@/app/vbe.rase/output/Paper5.json")),
  },
  vbh: {
    1: jsonLoader(() => import("@/app/vbh.rase/output/Paper1.json")),
    2: jsonLoader(() => import("@/app/vbh.rase/output/Paper2.json")),
    3: jsonLoader(() => import("@/app/vbh.rase/output/Paper3.json")),
    4: jsonLoader(() => import("@/app/vbh.rase/output/Paper4.json")),
    5: jsonLoader(() => import("@/app/vbh.rase/output/Paper5.json")),
  },
  vie: {
    1: jsonLoader(() => import("@/app/vie.rase/output/Paper1.json")),
    2: jsonLoader(() => import("@/app/vie.rase/output/Paper2.json")),
    3: jsonLoader(() => import("@/app/vie.rase/output/Paper3.json")),
    4: jsonLoader(() => import("@/app/vie.rase/output/Paper4.json")),
    5: jsonLoader(() => import("@/app/vie.rase/output/Paper5.json")),
  },
  vih: {
    1: jsonLoader(() => import("@/app/vih.rase/output/Paper1.json")),
    2: jsonLoader(() => import("@/app/vih.rase/output/Paper2.json")),
    3: jsonLoader(() => import("@/app/vih.rase/output/Paper3.json")),
    4: jsonLoader(() => import("@/app/vih.rase/output/Paper4.json")),
    5: jsonLoader(() => import("@/app/vih.rase/output/Paper5.json")),
  },
};

export async function loadPaper(
  journalId: JournalId,
  paperNum: number
): Promise<PaperData> {
  const loader = paperLoaders[journalId]?.[paperNum];
  if (!loader) throw new Error(`Paper ${paperNum} not found for ${journalId}`);
  return loader();
}

export function getJournalConfig(journalId: JournalId) {
  return getJournal(journalId);
}
