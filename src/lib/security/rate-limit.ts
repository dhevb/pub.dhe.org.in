export interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

const store = new Map<string, { count: number; reset: number }>();

/** Per-route rate limits (requests per window per IP). */
export const ROUTE_RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/auth/login": { limit: 10, windowMs: 60_000 },
  "/api/auth/logout": { limit: 30, windowMs: 60_000 },
  "/api/auth/signup": { limit: 5, windowMs: 60_000 },
  "/api/auth/forgot-password": { limit: 5, windowMs: 60_000 },
  "/api/manuscripts": { limit: 60, windowMs: 60_000 },
  "/api/search": { limit: 120, windowMs: 60_000 },
  "/api/contact": { limit: 10, windowMs: 60_000 },
  "/api/csrf": { limit: 120, windowMs: 60_000 },
  "/login": { limit: 60, windowMs: 60_000 },
  "/signup": { limit: 30, windowMs: 60_000 },
  "/ForgotPassword": { limit: 20, windowMs: 60_000 },
  "/search": { limit: 180, windowMs: 60_000 },
  default: { limit: 120, windowMs: 60_000 },
};

const PREFIX_LIMITS: { prefix: string; config: RateLimitConfig }[] = [
  { prefix: "/api/auth/signup", config: ROUTE_RATE_LIMITS["/api/auth/signup"] },
  { prefix: "/signup", config: ROUTE_RATE_LIMITS["/signup"] },
  { prefix: "/ForgotPassword", config: ROUTE_RATE_LIMITS["/ForgotPassword"] },
];

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + config.windowMs });
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetAt: now + config.windowMs,
    };
  }

  if (entry.count >= config.limit) {
    return { allowed: false, remaining: 0, resetAt: entry.reset };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: config.limit - entry.count,
    resetAt: entry.reset,
  };
}

export function getRateLimitConfig(pathname: string): RateLimitConfig {
  if (ROUTE_RATE_LIMITS[pathname]) return ROUTE_RATE_LIMITS[pathname];
  for (const { prefix, config } of PREFIX_LIMITS) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return config;
    }
  }
  return ROUTE_RATE_LIMITS.default;
}

export function rateLimitKey(ip: string, pathname: string): string {
  return `${ip}:${pathname}`;
}
