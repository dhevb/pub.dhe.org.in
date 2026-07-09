export const AUTH_COOKIE_NAMES = {
  token: "token",
  authToken: "auth-token",
  userId: "userId",
} as const;

export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const AUTH_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
};

export const AUTH_PATHS = [
  "/login",
  "/signup",
  "/ForgotPassword",
  "/forgot-password",
] as const;

export const PROTECTED_PREFIXES = ["/profile", "/dashboard"] as const;

/** Legacy localStorage keys — kept during migration for manuscript flows */
export const LEGACY_STORAGE_KEYS = {
  token: "token",
  authToken: "authToken",
  userId: "userId",
  institution: "institution",
  role: "role",
  areaOfStudy: "areaOfStudy",
  email: "email",
} as const;

export function persistLegacyAuth(data: {
  token: string;
  userId: string;
  email: string;
  institution?: string;
  role?: string;
  areaOfStudy?: string;
}): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LEGACY_STORAGE_KEYS.token, data.token);
  localStorage.setItem(LEGACY_STORAGE_KEYS.authToken, data.token);
  localStorage.setItem(LEGACY_STORAGE_KEYS.userId, data.userId);
  localStorage.setItem(LEGACY_STORAGE_KEYS.email, data.email);
  if (data.institution) {
    localStorage.setItem(LEGACY_STORAGE_KEYS.institution, data.institution);
  }
  if (data.role) localStorage.setItem(LEGACY_STORAGE_KEYS.role, data.role);
  if (data.areaOfStudy) {
    localStorage.setItem(LEGACY_STORAGE_KEYS.areaOfStudy, data.areaOfStudy);
  }
}

export function clearLegacyAuth(): void {
  if (typeof window === "undefined") return;
  Object.values(LEGACY_STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
