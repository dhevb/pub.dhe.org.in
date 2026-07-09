import type { LogEvent } from "./logger";

/** Sentry integration hook — replace with @sentry/nextjs when DSN is configured. */
export function captureException(
  error: unknown,
  context?: Record<string, unknown>
): void {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  // Placeholder until @sentry/nextjs is added:
  // Sentry.captureException(error, { extra: context });
  console.error("[sentry-stub]", error, context);
}

export function captureMessage(
  message: string,
  context?: Record<string, unknown>
): void {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;
  console.warn("[sentry-stub]", message, context);
}

export type AuditAction =
  | "auth.login"
  | "auth.logout"
  | "auth.signup"
  | "manuscript.view"
  | "search.query"
  | "contact.submit"
  | "admin.action";

export interface AuditEntry {
  action: AuditAction;
  actorId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

const auditBuffer: AuditEntry[] = [];
const AUDIT_MAX = 500;

export function auditLog(
  action: AuditAction,
  actorId?: string,
  metadata?: Record<string, unknown>
): void {
  const entry: AuditEntry = {
    action,
    actorId,
    timestamp: new Date().toISOString(),
    metadata,
  };
  auditBuffer.push(entry);
  if (auditBuffer.length > AUDIT_MAX) auditBuffer.shift();
}

export function getRecentAuditLogs(): AuditEntry[] {
  return [...auditBuffer];
}

export type { LogEvent };
