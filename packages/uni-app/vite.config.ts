import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue({
      // 小程序端使用源码时，编译器会自动处理，H5打包使用标准 Vue3 helper
      // 可以不加额外配置
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // H5/dist 打包入口
      name: 'UniComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `uni-components.${format}.js`
    },
    rollupOptions: {
      // H5/dist 外部化 Vue，避免打包 Vue
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    emptyOutDir: false // 防止小程序端源码也在 dist 时被清空
  }
})