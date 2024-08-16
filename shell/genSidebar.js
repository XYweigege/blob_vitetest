const fs = require("fs");
const path = require("path");

// 获取文件夹下的所有文件与目录
function getFiles(dir, baseDir = "") {
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => !file.startsWith(".")) // 忽略隐藏文件
    .map((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      const relativePath = path.join(baseDir, file);

      if (stat.isDirectory()) {
        const children = getFiles(fullPath, relativePath);

        // 如果文件夹为空，不包含到侧边栏
        if (children.length > 0) {
          return {
            text: file,
            items: children,
          };
        }
        return null; // 忽略空文件夹
      } else if (file.endsWith(".md")) {
        // 特殊处理 index.md 文件
        const name =
          file === "index.md" ? baseDir || "index" : file.replace(".md", "");
        return {
          text: name,
          link: `/frontend/${relativePath
            .replace(/\\/g, "/")
            .replace(".md", "")}`,
        };
      }
    })
    .filter(Boolean); // 过滤掉 undefined 和 null
}

// 生成侧边栏配置
function generateSidebar(baseDir) {
  const sidebar = getFiles(baseDir);
  return sidebar;
}

// 指定扫描的文件夹
const baseDir = path.resolve(__dirname, "../frontend");
const sidebarConfig = generateSidebar(baseDir);

// 将结果写入文件
fs.writeFileSync(
  path.resolve(__dirname, "./sidebar-auto.js"),
  `module.exports = ${JSON.stringify(sidebarConfig, null, 2)};`
);
