export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "nuxt-security",
    "nuxt-auth-utils",
    "reka-ui/nuxt",
  ],
  future: { compatibilityVersion: 4 },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-03-01",
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  hub: {
    workers: true,
    database: true,
  },
});
