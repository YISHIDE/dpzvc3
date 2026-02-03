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
// import ssr from 'vite-plugin-ssr/plugin'
// import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router'
import { Dpzvc3Resolver } from '@dpzvc3/vue/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    // ssr({
    //   includeAssetsImportedByServer: true,
    // }),
    Components({
      resolvers: [Dpzvc3Resolver()],
      dts: 'src/components.d.ts',
  ]
    }),
    AutoImport({
      resolvers: [Dpzvc3Resolver()],
      imports: ['vue', {
        'vue-router': [
          'useRouter', 
           'useRoute',  
        'createRouter',
        'createWebHistory',
        'createWebHashHistory',
        'createMemoryHistory']}],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default false
        filepath: './.eslintrc-auto-import.json', // Default './.eslintrc-auto-import.json'
        globalsPropValue: true // Default 'true', (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
  })
  ],
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
    // cssCodeSplit: true, // 关键：提取 CSS
    // ssrManifest: true, // 关键：生成 SSR 清单
    outDir: "dist-ssr/client",
    ssr: false,
      // rollupOptions: {
      //   input: path.resolve(__dirname, "src/entry-client.ts"), // 🚫 不再是 indexSSR.html
      //   // output: {
      //   // // ⚠️ 自动避免拆分 vendor / common
      //   // manualChunks: () => null,
      //   // }
      //   output: {
      //     //  assetFileNames: 'assets/[name]-[hash][extname]', 
      //     entryFileNames: "[name].js",
      //     chunkFileNames: "[name]-[hash].js",
      //     assetFileNames: "[name]-[hash][extname]",
      //   },
      // },
    rollupOptions: {
      input: path.resolve(__dirname, "indexSSR.html"),
      output: {
        // format: "umd", // ⚡ 改成 UMD
        // name: "App", // ⚡ 浏览器访问 window.App
        // entryFileNames: "[name].js",
        // chunkFileNames: "[name]-[hash].js",
          manualChunks: (id) => { 
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      }
    },
    manifest: true,
  },
});
