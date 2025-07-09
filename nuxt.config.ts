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
    ],
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:"],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "'unsafe-eval'",
        ],
      },
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
