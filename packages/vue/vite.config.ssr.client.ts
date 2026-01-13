// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// import path from "path";

// export default defineConfig({
//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: { "@": path.resolve(__dirname, "src") },
//     extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
//   },
//   css: {
//     preprocessorOptions: {
//       less: { javascriptEnabled: true },
//     },
//   },
//   build: {
//     outDir: "dist-ssr/client",
//     rollupOptions: {
//       input: path.resolve(__dirname, "indexSSR.html"), // ⚡ 直接用 HTML 作为入口
//     },
//     manifest: true, // ⚡ 用于 SSR 注入客户端 JS
//     sourcemap: false,
//   },
// });

// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// import path from "path";

// export default defineConfig({
//   plugins: [vue(), vueJsx()],
// resolve: {
//   alias: { "@": path.resolve(__dirname, "src") },
//   extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
// },
// css: {
//   preprocessorOptions: {
//     less: { javascriptEnabled: true },
//   },
// },
//   build: {
//     outDir: "dist-ssr/client",
//     rollupOptions: {
//       input: path.resolve(__dirname, "indexSSR.html"), // HTML 入口
//       output: {
//         format: "cjs", // ⚡ 关键改动：打包成 CommonJS
//         entryFileNames: "[name].js",
//         chunkFileNames: "[name]-[hash].js",
//         assetFileNames: "[name]-[hash][extname]",
//       },
//     },
//     manifest: true, // ⚡ SSR 注入客户端 JS
//     sourcemap: false,
//   },
// });

// vite.client.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
  },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true },
    },
  },
  build: {
    outDir: "dist-ssr/client",
    rollupOptions: {
      input: path.resolve(__dirname, "indexSSR.html"),
      output: {
        format: "umd", // ⚡ 改成 UMD
        name: "App", // ⚡ 浏览器访问 window.App
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
    manifest: true,
  },
});
