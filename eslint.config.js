import pluginRouter from "@tanstack/eslint-plugin-router";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";

export default [
  ...pluginRouter.configs["flat/recommended"],
  perfectionist.configs["recommended-natural"],
  // Any other config...
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      // Your overrides here:
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
