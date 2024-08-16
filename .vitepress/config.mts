import { defineConfig } from "vitepress";
import topNav from "./topNav";
import sidebar from "./sidebar";
//@ts-ignore
import sidebarAuto from "../shell/sidebar-auto.js";

let base = "/blob_vitetest/";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blob_vitetest/",
  title: "kevin's文档",
  description: "欢迎来访",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: topNav,
    search: {
      provider: "local",
    },
    lastUpdatedText: "最后更新", // string

    //@ts-ignore
    // sidebar: {
    //   "/frontend/": sidebarAuto,
    // },
    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © kevin",
    },
  },
});
