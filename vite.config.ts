import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import eslint from "vite-plugin-eslint";
// eslint({
//         cache: false, // 关闭缓存，避免“改了不报错”
//         include: ["src/**/*.ts", "src/**/*.vue", "src/**/*.tsx"],
//         exclude: ["node_modules", "dist", "dist-ssr", "dist-prod"],
//         failOnError: true,
//         failOnWarning: false,
//       }),
export default defineConfig(({ command, mode }) => {
  const isProd = mode === "production";

  return {
    base: "/dpzvc3",
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

    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    },

    server: {
      port: 3000,
      open: true,
      hmr: true,
    },

    build: {
      sourcemap: !isProd,
      outDir: isProd ? "dist-prod" : "dist",
      target: "es2018",
    },
  };
});
