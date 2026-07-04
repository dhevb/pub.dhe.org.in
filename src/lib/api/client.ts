const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://vie-rase-backend.onrender.com";

export function apiUrl(path: string): string {
  const base = API_BASE.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    next: init?.cache ? undefined : { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export function journalArticlesPath(apiPrefix: string): string {
  return `/api/${apiPrefix}_getallarticles`;
}

export function journalArticlePath(apiPrefix: string, id: string): string {
  return `/api/${apiPrefix}_getarticle/${id}`;
}
