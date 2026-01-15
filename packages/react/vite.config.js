import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true })  // 自动生成类型声明文件
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'dpzvc3React',
      fileName: (format) => `dpzvc3-react.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // 不打包 React
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});