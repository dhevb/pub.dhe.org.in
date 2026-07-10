import { captureException } from "./sentry";

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

  if (level === "error") {
    captureException(new Error(message), context);
    console.error("[monitoring]", message, context);
  } else if (level === "warn") {
    console.warn("[monitoring]", message, context);
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[monitoring]", message, context);
  }
}

export function getRecentLogs(): LogEvent[] {
  return [...buffer];
}
