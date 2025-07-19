import tailwindcss from "@tailwindcss/vite";
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
  compatibilityDate: "2025-03-01",
  experimental: {
    typedPages: true,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  vite: {
    plugins: [
      ...(process.env.NODE_ENV === "development" ? [devtoolsJson()] : []),
      tailwindcss(),
    ],
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    },
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
