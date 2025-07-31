import type { Configuration } from "lint-staged";

export default {
  "*.{ts,tsx,vue}": () => "nuxt typecheck",
  "*.{js,ts,jsx,tsx,vue}": ["eslint --fix", "prettier --write"],
  "*.{vue,html,css,scss,sass}": ["stylelint --fix", "prettier --write"],
  "*.{json,md,yml}": "prettier --write",
} satisfies Configuration;
