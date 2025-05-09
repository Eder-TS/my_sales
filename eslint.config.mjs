// eslint.config.js
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier"

export default defineConfig([
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    ignores: ["node_modules", "dist", "build", "/*.js"]
  },
  {
    name: "prettier-config",
    rules: { ...prettierConfig.rules }
  }
]);
