import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslint from "vite-plugin-eslint";
// import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { Dpzvc3Resolver } from '@dpzvc3/vue/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [Dpzvc3Resolver()],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
    resolvers: [Dpzvc3Resolver()],
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
    eslintrc: {
      enabled: true, // Default false
      filepath: './.eslintrc-auto-import.json', // Default './.eslintrc-auto-import.json'
      globalsPropValue: true // Default 'true', (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  }),
    // eslint({
    //   cache: false, // 关闭缓存，避免“改了不报错”
    //   include: ["src/**/*.ts", "src/**/*.vue", "src/**/*.tsx"],
    //   exclude: ["node_modules", "dist", "dist-ssr", "dist-prod"],
    //   failOnError: true,
    //   failOnWarning: false,
    // })],
],
  css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,                  // 允许 Less 里用 JS 表达式
      // paths: [path.resolve(__dirname, 'node_modules')] // @import "~@dpzvc3/styles/xxx" 时查找路径
    }
  }
}
})


// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// import path from "path";
// import eslint from "vite-plugin-eslint";
// export default defineConfig(({ command, mode }) => {
//   const isProd = mode === "production";

//   return {
//     base: isProd ? "/dpzvc3" : "",
//     plugins: [
//       vue(),
//       vueJsx(),
//       eslint({
//         cache: false, // 关闭缓存，避免“改了不报错”
//         include: ["src/**/*.ts", "src/**/*.vue", "src/**/*.tsx"],
//         exclude: ["node_modules", "dist", "dist-ssr", "dist-prod"],
//         failOnError: true,
//         failOnWarning: false,
//       }),
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "src"),
//       },
//       extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
//     },

//     css: {
//       preprocessorOptions: {
//         less: {
//           javascriptEnabled: true,
//         },
//       },
//     },

//     define: {
//       __VUE_OPTIONS_API__: true,
//       __VUE_PROD_DEVTOOLS__: false,
//     },

//     server: {
//       port: 3000,
//       open: true,
//       hmr: true,
//     },

//     build: {
//       sourcemap: !isProd,
//       outDir: isProd ? "dist-prod" : "dist",
//       target: "es2018",
//     },
//   };
// });
