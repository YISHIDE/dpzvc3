import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

const outDir = "dist";

// 生成非压缩或压缩的配置
function createLibConfig(isMinify: boolean) {
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "Dpzvc3UI",
        formats: ["es", "cjs", "umd"],
      },
      outDir,
      sourcemap: !isMinify,
      minify: isMinify ? "terser" : false,
      emptyOutDir: false, // 不清空目录
      rollupOptions: {
        external: ["vue"],
        output: [
          {
            format: "es",
            entryFileNames: isMinify
              ? "dpzvc3-ui.es.min.js"
              : "dpzvc3-ui.es.js",
            globals: { vue: "Vue" },
            exports: "named",
          },
          {
            format: "cjs",
            entryFileNames: isMinify
              ? "dpzvc3-ui.cjs.min.js"
              : "dpzvc3-ui.cjs.js",
            globals: { vue: "Vue" },
            exports: "named",
          },
          {
            format: "umd",
            name: "Dpzvc3UI", // 全局变量名
            entryFileNames: isMinify
              ? "dpzvc3-ui.umd.min.js"
              : "dpzvc3-ui.umd.js",
            globals: { vue: "Vue" },
            exports: "named",
          },
        ],
      },
    },
  });
}

// 导出两个配置，npm script 通过 VITE_MINIFY 控制
export default defineConfig(({ command, mode }) => {
  const isMinify = process.env.VITE_MINIFY === "true";
  return createLibConfig(isMinify);
});
