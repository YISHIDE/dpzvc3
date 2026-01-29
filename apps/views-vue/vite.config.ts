import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
// import { Dpzvc3Resolver } from '@dpzvc3/vue/resolver'
// import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   resolvers: [Dpzvc3Resolver]
    // }),
    AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
    eslintrc: {
      enabled: true, // Default false
      filepath: './.eslintrc-auto-import.json', // Default './.eslintrc-auto-import.json'
      globalsPropValue: true // Default 'true', (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  })],
  css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,                  // 允许 Less 里用 JS 表达式
      // paths: [path.resolve(__dirname, 'node_modules')] // @import "~@dpzvc3/styles/xxx" 时查找路径
    }
  }
}
})
