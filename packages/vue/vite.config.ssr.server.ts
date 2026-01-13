// // vite.config.ssr.server.ts
// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// import path from "path";

// export default defineConfig({
//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//     extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
//   },
//   css: {
//     preprocessorOptions: {
//       less: {
//         javascriptEnabled: true,
//       },
//     },
//   },
//   build: {
//     ssr: path.resolve(__dirname, "src/entry-server.ts"),
//     outDir: "dist-ssr/server",
//     rollupOptions: {
//       external: ["vue"],
//     },
//   },
// });
// vite.config.ssr.server.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    ssr: path.resolve(__dirname, "src/entry-server.ts"),
    outDir: "dist-ssr/server",
    rollupOptions: {
      external: ["vue"],
      output: {
        format: "cjs", // ⚡ 关键改动：SSR bundle 输出 CJS
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
});
