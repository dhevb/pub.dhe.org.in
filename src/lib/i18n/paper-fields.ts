import type { PaperData } from "@/types/article";

const LICENSE_MARKERS = [
  "Creative Commons",
  "creativecommons.org",
  "\u0915\u094d\u0930\u093f\u090f\u091f\u093f\u0935 \u0915\u0949\u092e\u0928\u094d\u0938",
];

function looksLikeLicenseNotice(value: string): boolean {
  return LICENSE_MARKERS.some((m) => value.includes(m));
}

/** CC license text was historically stored in the DOI field (OI-015). */
export function getPaperLicenseNotice(data: PaperData): string | undefined {
  if (data.LicenseNotice?.trim()) return data.LicenseNotice.trim();
  if (data.DOI && looksLikeLicenseNotice(data.DOI)) return data.DOI.trim();
  return undefined;
}

export function getPaperDoi(data: PaperData): string | undefined {
  if (!data.DOI?.trim()) return undefined;
  if (looksLikeLicenseNotice(data.DOI)) return undefined;
  return data.DOI.trim();
}
