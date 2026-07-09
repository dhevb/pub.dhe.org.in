import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAPER_GLOB = "src/app";

export interface BackupManifest {
  exportedAt: string;
  files: string[];
  paperCount: number;
}

/** Export CMS JSON files for disaster recovery (server-side). */
export function exportCmsBackup(): BackupManifest {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.join("content", f));

  return {
    exportedAt: new Date().toISOString(),
    files,
    paperCount: 20,
  };
}

export function listPaperPaths(): string[] {
  const journals = ["vbe", "vbh", "vie", "vih"];
  return journals.flatMap((j) =>
    [1, 2, 3, 4, 5].map((n) => `${PAPER_GLOB}/${j}.rase/output/Paper${n}.json`)
  );
}
