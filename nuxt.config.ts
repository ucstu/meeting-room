import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "nuxt-security",
    "nuxt-auth-utils",
    "@nuxtjs/i18n",
    "shadcn-nuxt",
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
  css: ["~/assets/css/main.css", "~/assets/css/tailwind.css"],

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
    plugins: [tailwindcss()],
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
      extensions: ["vue"], // 仅导入 Vue 文件
    },
  ],
  // shadcn: {
  //   /**
  //    * Prefix for all the imported component
  //    */
  //   prefix: "",
  //   /**
  //    * Directory that the component lives in.
  //    * @default "./components/ui"
  //    */
  //   componentDir: "./app/components/ui", // 确保这是一个目录
  // },
});
