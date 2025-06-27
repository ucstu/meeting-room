export default defineNuxtConfig({
  compatibilityDate: "2025-03-01",
  future: { compatibilityVersion: 4 },
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "nuxt-security",
    "nuxt-auth-utils",
    "shadcn-nuxt",
  ],
  experimental: {
    typedPages: true,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  hub: {
    workers: true,
    database: true,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
