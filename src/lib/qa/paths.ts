/** Paper file paths — shared between health check and QA (server-side). */

const JOURNALS = ["vbe", "vbh", "vie", "vih"] as const;

export const PAPER_PATHS = JOURNALS.flatMap((id) =>
  [1, 2, 3, 4, 5].map((n) => `src/app/${id}.rase/output/Paper${n}.json`)
);

export const PAPER_COUNT = PAPER_PATHS.length;
