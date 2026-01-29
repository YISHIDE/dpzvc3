// src/resolvers/dpzvc3.ts
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module' // ✅ ESM 下可用
import type { ComponentResolver } from 'unplugin-vue-components'

// 在 ESM 中创建 require
const require = createRequire(import.meta.url)

// 获取 basePath
const basePath = path.dirname(
  require.resolve('@dpzvc3/vue/package.json')
)

export const Dpzvc3Resolver: ComponentResolver = {
  type: 'component',
  resolve(name) {
    const componentDir = name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1)

    const fullPath = path.join(basePath, 'dist/es', componentDir)

    if (fs.existsSync(fullPath)) {
      return {
        name: 'default',
        from: `@dpzvc3/vue/es/${componentDir}`
      }
    }
  }
}