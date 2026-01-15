import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,                  // 允许 Less 里用 JS 表达式
      // paths: [path.resolve(__dirname, 'node_modules')] // @import "~@dpzvc3/styles/xxx" 时查找路径
    }
  }
}
})
