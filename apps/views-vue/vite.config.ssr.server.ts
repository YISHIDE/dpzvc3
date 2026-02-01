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
// import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router'
import { Dpzvc3Resolver } from '@dpzvc3/vue/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [Dpzvc3Resolver()],
      dts: 'src/components.d.ts',
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
      external: ["vue","vue-router"],
      output: {
        format: "cjs", // ⚡ 关键改动：SSR bundle 输出 CJS
        entryFileNames: "[name].cjs",
        chunkFileNames: "[name]-[hash].cjs",
      },
    },
  },
});
