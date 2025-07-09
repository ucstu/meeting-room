import type { Config } from "stylelint";

export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-standard-vue/scss",
  ],
  plugins: ["stylelint-order"],
} satisfies Config;
