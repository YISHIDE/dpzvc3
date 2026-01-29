// vite.resolver.config.ts
// tsup.resolver.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    dpzvc3: 'src/resolvers/dpzvc3.ts'
  },
  outDir: 'dist/resolvers',
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'node',
  target: 'node16',
  external: [
    'fs',
    'path',
    'unplugin-vue-components',
    '@dpzvc3/vue'
  ]
})