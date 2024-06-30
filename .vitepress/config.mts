import { defineConfig } from "vitepress";

let base = "/blob_vitetest/";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blob_vitetest/",
  title: "kevin's文档",
  description: "欢迎来访",
  lang: "zh-Hans",
  head: [
    // 添加 favicon
    ["link", { rel: "icon", href: "/assets/vitepress-logo-large.webp" }],
    // 添加logo
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "关于", link: "/about" },
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © kevin",
    },
  },
});
