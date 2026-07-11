/**
 * Trigger production Supabase setup via deployed API route.
 * Requires SUPABASE_SETUP_TOKEN in env (or pass as arg).
 * Usage: SUPABASE_SETUP_TOKEN=xxx node scripts/setup-supabase-remote.mjs
 */
const baseUrl =
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://pub.dhe.org.in";
const token = process.env.SUPABASE_SETUP_TOKEN || process.argv[2];

if (!token) {
  console.error("Missing SUPABASE_SETUP_TOKEN");
  process.exit(1);
}

const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/setup/supabase`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
});

const body = await res.json();
console.log(JSON.stringify(body, null, 2));
process.exit(res.ok ? 0 : 1);
