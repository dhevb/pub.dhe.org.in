import { apiFetch, apiFetchWithAuth, apiUrl } from "./client";
import {
  journalManuscriptsByUserPath,
  journalSubmitArticleDetailsPath,
  journalSubmitAuthorDetailsPath,
  journalSubmitManuscriptFilePath,
} from "./client";
import type { CoAuthor, ManuscriptRecord } from "./types";

/** Normalize nested Render API response shapes into a flat manuscript list. */
export function parseManuscriptsByUserResponse(data: unknown): ManuscriptRecord[] {
  if (!data || typeof data !== "object") return [];

  const root = data as Record<string, unknown>;
  const manuscripts = root.manuscripts;

  if (manuscripts && typeof manuscripts === "object" && !Array.isArray(manuscripts)) {
    const nested = (manuscripts as Record<string, unknown>).manuscripts;
    if (Array.isArray(nested)) {
      return normalizeManuscripts(nested);
    }
  }

  if (Array.isArray(manuscripts)) {
    return normalizeManuscripts(manuscripts);
  }

  if (Array.isArray(data)) {
    return normalizeManuscripts(data);
  }

  return [];
}

function normalizeManuscripts(items: unknown[]): ManuscriptRecord[] {
  return items.map((item) => {
    const m = item as ManuscriptRecord;
    let coAuthors: CoAuthor[] | undefined;

    if (typeof m.co_authors === "string") {
      try {
        coAuthors = JSON.parse(m.co_authors) as CoAuthor[];
      } catch {
        coAuthors = [];
      }
    } else if (Array.isArray(m.co_authors)) {
      coAuthors = m.co_authors;
    }

    return { ...m, co_authors: coAuthors };
  });
}

export async function getManuscriptsByUser(
  userId: string,
  token?: string
): Promise<ManuscriptRecord[]> {
  const path = journalManuscriptsByUserPath(userId);
  const data = token
    ? await apiFetchWithAuth<unknown>(path, token)
    : await apiFetch<unknown>(path, { cache: "no-store" });

  return parseManuscriptsByUserResponse(data);
}

export async function submitArticleDetails(
  apiPrefix: string,
  payload: Record<string, unknown>,
  token: string
): Promise<unknown> {
  return apiFetchWithAuth(journalSubmitArticleDetailsPath(apiPrefix), token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitAuthorDetails(
  apiPrefix: string,
  payload: Record<string, unknown>,
  token: string
): Promise<unknown> {
  return apiFetchWithAuth(journalSubmitAuthorDetailsPath(apiPrefix), token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitManuscriptFile(
  apiPrefix: string,
  formData: FormData,
  token: string
): Promise<unknown> {
  const res = await fetch(apiUrl(journalSubmitManuscriptFilePath(apiPrefix)), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Manuscript upload failed: ${res.status}`);
  }

  return res.json();
}

export { apiUrl };
