const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://vie-rase-backend.onrender.com";

export function apiUrl(path: string): string {
  const base = API_BASE.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`.replace(/([^:]\/)\/+/g, "$1");
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { cache?: RequestCache }
): Promise<T> {
  const { cache, ...rest } = init ?? {};
  const res = await fetch(apiUrl(path), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...rest.headers,
    },
    ...(cache ? { cache } : { next: { revalidate: 300 } }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API error: ${res.status} ${res.statusText}${body ? ` — ${body}` : ""}`);
  }

  return res.json() as Promise<T>;
}

export async function apiFetchWithAuth<T>(
  path: string,
  token: string,
  init?: RequestInit
): Promise<T> {
  return apiFetch<T>(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
}

export function journalArticlesPath(apiPrefix: string): string {
  return `/api/${apiPrefix}_getallarticles`;
}

export function journalArticlePath(apiPrefix: string, id: string): string {
  return `/api/${apiPrefix}_getarticle/${id}`;
}

export function journalAddArticlePath(apiPrefix: string): string {
  return `/api/${apiPrefix}_add-article`;
}

export function journalSubmitArticleDetailsPath(apiPrefix: string): string {
  return `/api/${apiPrefix}_submit-article-details`;
}

export function journalSubmitAuthorDetailsPath(apiPrefix: string): string {
  return `/api/${apiPrefix}_submit-author-details`;
}

export function journalSubmitManuscriptFilePath(apiPrefix: string): string {
  return `/api/${apiPrefix}_submit-manuscript-file`;
}

export function journalManuscriptsByUserPath(userId: string): string {
  return `/api/vbe_manuscripts/user/${userId}`;
}

export { API_BASE };
