# Errors Module

**Purpose:** Standardized API error responses, route error handling, and client error reporting.

## Architecture

| File | Role |
|------|------|
| `types.ts` | `AppError`, `ApiErrorCode` |
| `api.ts` | `apiError`, `validationError`, `handleRouteError` |
| `client.ts` | `reportClientError` for error boundaries |

## Usage

```ts
import { handleRouteError, validationError } from "@/lib/errors";

// In API routes (new endpoints)
return validationError("Invalid input");

// Catch block
return handleRouteError(error, { route: "/api/contact" });
```

## Limitations

- Legacy API routes retain original `{ error: string }` shape for backward compatibility.
- Sentry capture is stubbed until `@sentry/nextjs` is installed.

## Tests

`src/lib/errors/__tests__/`
