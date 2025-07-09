import devtoolsJson from "vite-plugin-devtools-json";

export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-security",
    "nuxt-auth-utils",
    "shadcn-nuxt",
  ],
  css: ["~/assets/css/tailwind.css"],
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
  vite: {
    plugins: [
      ...(process.env.NODE_ENV === "development" ? [devtoolsJson()] : []),
    ],
  },
  hub: {
    workers: true,
    database: true,
    ai: true,
  },
  shadcn: {
    prefix: "",
  },
});
