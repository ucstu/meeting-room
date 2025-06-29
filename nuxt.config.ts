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
    "@nuxtjs/i18n",
  ],
  devtools: {
    enabled: true,
  },
  future: { compatibilityVersion: 4 },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-03-01",

  // 开发服务器配置
  devServer: {
    host: "0.0.0.0",
    port: 3000,
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
  css: ["~/assets/css/main.css"],

  // 国际化配置
  i18n: {
    locales: [
      { code: "en", name: "English" },
      { code: "zh", name: "中文" },
    ],
    defaultLocale: "zh",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  // Vite配置
  vite: {
    optimizeDeps: {
      include: ["@iconify-json/lucide"],
    },
  },

  // 安全配置
  security: {
    headers: {
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    },
  },

  // 确保组件自动导入
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
