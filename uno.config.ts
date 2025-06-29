import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        lucide: () =>
          import("@iconify-json/lucide/icons.json").then((i) => i.default),
      },
    }),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,500,600,700",
      },
    }),
  ],

  shortcuts: {
    // 按钮样式
    "btn-primary":
      "px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center justify-center",
    "btn-secondary":
      "px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer inline-flex items-center justify-center",

    // 卡片样式
    "card-shadow": "shadow-sm hover:shadow-lg transition-all duration-300",

    // 文本样式
    "text-title":
      "text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight",
    "text-subtitle": "text-lg md:text-xl text-slate-600 leading-relaxed",

    // 渐变背景
    "gradient-bg": "bg-gradient-to-br from-slate-50 to-slate-100",
    "gradient-primary": "bg-gradient-to-r from-blue-500 to-purple-600",

    // 容器
    "container-main": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

    // 动画
    "fade-in": "opacity-100 transition-all duration-500",
  },
});
