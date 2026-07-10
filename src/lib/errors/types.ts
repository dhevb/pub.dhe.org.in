/** Standard API error codes — stable contract for clients. */
export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "CSRF_INVALID"
  | "UPSTREAM_ERROR"
  | "INTERNAL_ERROR";

export interface ApiErrorBody {
  error: string;
  code?: ApiErrorCode;
  details?: unknown;
}

export interface AppErrorOptions {
  code?: ApiErrorCode;
  status?: number;
  cause?: unknown;
  details?: unknown;
}

export class AppError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = "AppError";
    this.code = options.code ?? "INTERNAL_ERROR";
    this.status = options.status ?? 500;
    this.details = options.details;
    if (options.cause) {
      this.cause = options.cause;
    }
  }
}
