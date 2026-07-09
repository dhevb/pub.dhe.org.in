/** Access + refresh token strategy (architecture). */

export const TOKEN_STRATEGY = {
  accessToken: {
    cookie: "token",
    maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days — matches current deployment
    httpOnly: true,
    sameSite: "lax" as const, // lax required for post-login redirects
  },
  refreshToken: {
    cookie: "refresh-token",
    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days when backend supports refresh
    httpOnly: true,
    sameSite: "strict" as const,
    status: "placeholder" as const,
  },
  csrf: {
    cookie: "csrf-token",
    maxAgeSeconds: 60 * 60 * 8,
    httpOnly: false,
    sameSite: "strict" as const,
    rotateOn: ["login", "logout"] as const,
  },
};
