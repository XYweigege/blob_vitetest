// docs/.vitepress/sidebar.js

module.exports = {
  "/frontend/": [
    {
      text: "前端",
      items: [
        { text: "介绍", link: "/frontend/" },
        {
          text: "HTML",
          link: "/frontend/html",
          items: [
            { text: "基础", link: "/frontend/html/basics" },
            { text: "进阶", link: "/frontend/html/advanced" },
            { text: "手写", link: "/frontend/html/shouxie" },
          ],
        },
        {
          text: "CSS",
          link: "/frontend/css/index",
          items: [
            { text: "基础", link: "/frontend/css/basics" },
            { text: "进阶", link: "/frontend/css/advanced" },
            { text: "手写", link: "/frontend/css/shouxie" },
          ],
        },
        { text: "JavaScript", link: "/frontend/javascript" },
      ],
    },
  ],
  "/backend/": [
    {
      text: "后端",
      items: [
        { text: "介绍", link: "/backend/" },
        { text: "Node.js", link: "/backend/nodejs" },
        { text: "数据库", link: "/backend/database" },
      ],
    },
  ],
};
