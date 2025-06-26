export default defineNuxtConfig({
  css: ["~/assets/global.css"],
  compatibilityDate: "2025-03-01",
  future: { compatibilityVersion: 4 },
  hub: {
    workers: true,
    database: true,
  },
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "nuxt-security",
  ],
  nitro: {
    experimental: {
      websocket: true,
    },
  },
});