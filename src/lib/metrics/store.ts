import { getSupabaseServiceClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type MetricType = "view" | "download";

const memoryMetrics = new Map<string, { view: number; download: number }>();

function memoryKey(path: string): string {
  return path.replace(/\/$/, "");
}

export async function incrementMetric(
  articlePath: string,
  type: MetricType
): Promise<number> {
  const path = memoryKey(articlePath);

  if (isSupabaseConfigured()) {
    const client = getSupabaseServiceClient();
    if (client) {
      const { data: existing } = await client
        .from("article_metrics")
        .select("count")
        .eq("article_path", path)
        .eq("metric_type", type)
        .maybeSingle();

      const nextCount = (existing?.count ?? 0) + 1;

      await client.from("article_metrics").upsert(
        {
          article_path: path,
          metric_type: type,
          count: nextCount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "article_path,metric_type" }
      );

      return nextCount;
    }
  }

  const current = memoryMetrics.get(path) ?? { view: 0, download: 0 };
  current[type] += 1;
  memoryMetrics.set(path, current);
  return current[type];
}

export async function getMetrics(articlePath?: string): Promise<
  Record<string, { view: number; download: number }>
> {
  if (isSupabaseConfigured()) {
    const client = getSupabaseServiceClient();
    if (client) {
      let query = client.from("article_metrics").select("*");
      if (articlePath) query = query.eq("article_path", memoryKey(articlePath));

      const { data } = await query;
      const result: Record<string, { view: number; download: number }> = {};

      for (const row of data ?? []) {
        const key = row.article_path as string;
        if (!result[key]) result[key] = { view: 0, download: 0 };
        result[key][row.metric_type as MetricType] = Number(row.count);
      }
      return result;
    }
  }

  if (articlePath) {
    const key = memoryKey(articlePath);
    const m = memoryMetrics.get(key);
    return m ? { [key]: m } : {};
  }

  const result: Record<string, { view: number; download: number }> = {};
  memoryMetrics.forEach((v, k) => {
    result[k] = v;
  });
  return result;
}