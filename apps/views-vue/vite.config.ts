import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslint from "vite-plugin-eslint";
// import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router'
import { Dpzvc3Resolver } from '@dpzvc3/vue/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [Dpzvc3Resolver()],
      dts: 'src/components.d.ts',
       types: [
    {
      from: '@dpzvc3/vue/es/check-box',
      names: ['CheckBox','CheckBoxGroup']
    },
    {
      from: '@dpzvc3/vue/es/radio-box',
      names: ['RadioBox','RadioBoxGroup']
    }
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
    // eslint({
    //   cache: false, // 关闭缓存，避免“改了不报错”
    //   include: ["src/**/*.ts", "src/**/*.vue", "src/**/*.tsx"],
    //   exclude: ["node_modules", "dist", "dist-ssr", "dist-prod"],
    //   failOnError: true,
    //   failOnWarning: false,
    // }),
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




// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { Dpzvc3Resolver } from '@dpzvc3/vue/resolvers'
// // import path from 'path'

// export default defineConfig(({ ssrBuild }) => {
//   const baseConfig = {
//     plugins: [
//       vue(),
//       Components({
//         resolvers: [Dpzvc3Resolver()],
//         dts: 'src/components.d.ts',
//       }),
//       AutoImport({
//         resolvers: [Dpzvc3Resolver()],
//         imports: [
//           'vue',
//           {
//             'vue-router': [
//               'useRouter',
//               'useRoute',
//               'createRouter',
//               'createWebHistory',
//               'createWebHashHistory',
//               'createMemoryHistory',
//             ],
//           },
//         ],
//         dts: 'src/auto-imports.d.ts',
//         eslintrc: {
//           enabled: true,
//           filepath: './.eslintrc-auto-import.json',
//           globalsPropValue: true,
//         },
//       }),
//     ],
//     // resolve: {
//     //   alias: { '@': path.resolve(__dirname, 'src') },
//     // },
//     css: {
//       preprocessorOptions: {
//         less: {
//           javascriptEnabled: true,
//         },
//       },
//     },
//   }

//   if (ssrBuild) {
//     // 🔹 SSR 构建
//     return {
//       ...baseConfig,
//       build: {
//         ssr: 'src/entry-server.ts',
//         outDir: 'dist-ssr/server',
//         rollupOptions: {
//           external: ['vue', 'vue-router'],
//           output: {
//             format: 'cjs',
//             entryFileNames: 'entry-server.cjs',
//           },
//         },
//       },
//     }
//   }

//   // 🔹 Client 构建
//   return {
//     ...baseConfig,
//     build: {
//       outDir: 'dist/client',
//       manifest: true,     // ✅ 用于 SSR 获取 CSS
//       cssCodeSplit: true, // ⚡ CSS 按需分割
//       rollupOptions: {
//         input: 'src/entry-client.ts',
//         output: {
//           assetFileNames: 'assets/[name]-[hash][extname]',
//         },
//       },
//     },
//   }
// })






















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
