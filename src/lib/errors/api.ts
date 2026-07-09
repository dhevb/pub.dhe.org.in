import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logEvent } from "@/lib/monitoring/logger";
import { AppError, type ApiErrorBody, type ApiErrorCode } from "./types";

const STATUS_BY_CODE: Record<ApiErrorCode, number> = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  CSRF_INVALID: 403,
  UPSTREAM_ERROR: 502,
  INTERNAL_ERROR: 500,
};

export function apiError(
  message: string,
  code: ApiErrorCode = "INTERNAL_ERROR",
  status?: number
): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: message, code },
    { status: status ?? STATUS_BY_CODE[code] }
  );
}

export function validationError(
  message: string,
  details?: unknown
): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: message, code: "VALIDATION_ERROR", details },
    { status: 400 }
  );
}

export function fromZodError(error: ZodError): NextResponse<ApiErrorBody> {
  const message = error.issues[0]?.message ?? "Invalid input";
  return validationError(message, error.flatten());
}

export function handleRouteError(
  error: unknown,
  context?: Record<string, unknown>
): NextResponse<ApiErrorBody> {
  if (error instanceof AppError) {
    if (error.status >= 500) {
      logEvent("error", error.message, { code: error.code, ...context });
    }
    return apiError(error.message, error.code, error.status);
  }

  if (error instanceof ZodError) {
    return fromZodError(error);
  }

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  const isUnauthorized =
    message.includes("401") || message.toLowerCase().includes("unauthorized");

  if (isUnauthorized) {
    return apiError("Unauthorized", "UNAUTHORIZED", 401);
  }

  logEvent("error", message, context);
  return apiError("Request failed. Please try again.", "INTERNAL_ERROR", 500);
}
