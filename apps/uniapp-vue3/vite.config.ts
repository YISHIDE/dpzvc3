import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
      alias: {
      "@": path.resolve(__dirname, "src"),
      // "@/uni_modules": path.resolve(__dirname, "uni_modules"),
      // "@": path.resolve(__dirname, "src"),
      '@uni_modules': path.resolve(__dirname, 'uni_modules')
      },
      extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
    },
});
