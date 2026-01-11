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
      input: path.resolve(__dirname, "indexSSR.html"), // ⚡ 直接用 HTML 作为入口
    },
    manifest: true, // ⚡ 用于 SSR 注入客户端 JS
    sourcemap: false,
  },
});
