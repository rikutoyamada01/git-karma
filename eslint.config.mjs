import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import js from "@eslint/js";

const eslintConfig = defineConfig([
  // Base ESLint recommended rules for JavaScript
  js.configs.recommended,

  ...nextVitals,
  ...nextTs,

  // Custom overrides for specific files
  {
    files: ["**/*.js"], // Apply these rules only to .js files
    rules: {
      // Disable TypeScript-specific rules that don't apply to JS
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      // It's good practice to have some form of unused var check for JS too
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "check-db.js", // Ignore generated JS files
    "check-lib.js", // Ignore generated JS files
    "src/lib/prisma.js", // Ignore generated JS file
  ]),
]);

export default eslintConfig;
