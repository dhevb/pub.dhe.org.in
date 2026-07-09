export type LogLevel = "info" | "warn" | "error";

export interface LogEvent {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

const buffer: LogEvent[] = [];
const MAX = 200;

export function logEvent(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>
): void {
  const event: LogEvent = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };
  buffer.push(event);
  if (buffer.length > MAX) buffer.shift();

  if (process.env.SENTRY_DSN && level === "error") {
    // Sentry integration hook — enable when SENTRY_DSN is set
    console.error("[monitoring]", message, context);
  } else if (level === "error") {
    console.error("[monitoring]", message, context);
  }
}

export function getRecentLogs(): LogEvent[] {
  return [...buffer];
}
