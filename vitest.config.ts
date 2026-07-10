import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "json-summary"],
      include: [
        "src/lib/security/**",
        "src/lib/search/**",
        "src/lib/research/**",
        "src/lib/errors/**",
        "src/lib/seo/google-scholar.ts",
        "src/lib/cms/**",
        "src/lib/qa/**",
        "src/lib/monitoring/**",
        "src/lib/api/route-helpers.ts",
      ],
      exclude: [
        "**/index.ts",
        "src/lib/security/client.ts",
        "src/lib/search/types.ts",
        "src/lib/search/from-index.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 60,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
