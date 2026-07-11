export interface PlagiarismCheckRequest {
  manuscriptId: string;
  fileUrl: string;
  title: string;
}

export interface PlagiarismCheckResult {
  status: "queued" | "completed" | "failed";
  similarityScore?: number;
  reportUrl?: string;
  error?: string;
}

export async function submitPlagiarismCheck(
  _request: PlagiarismCheckRequest
): Promise<PlagiarismCheckResult> {
  if (!process.env.PLAGIARISM_API_KEY) return { status: "queued" };
  return { status: "queued", error: "Plagiarism provider adapter pending v1.2" };
}
