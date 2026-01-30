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
// 自动扫描 dist/es 下组件目录
const componentDirs = fs.readdirSync(path.join(basePath, 'dist/es')).filter((dir) => {
  const full = path.join(basePath, 'dist/es', dir)
  return fs.statSync(full).isDirectory()
})

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


export const Dpzvc3TypesResolver= (name: string) => {
  // 只处理 Props 或 Emits 类型
  console.log('Dpzvc3TypesResolver name:', name);
   if (typeof name !== 'string') return
  const matched = name.match(/^(.*)(Props|Emits)$/)
  if (!matched) return

  const componentName = matched[1] // e.g. ActionSheet
  const typeKind = matched[2]      // 'Props' 或 'Emits'

  // kebab-case
  const kebabName = componentName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1)

  if (!componentDirs.includes(kebabName)) return

  return {
    from: `@dpzvc3/vue/es/${kebabName}`, // 指向组件 es 入口
    name: `${componentName}${typeKind}`, // 🔑 必须显式指定
    type: true, // 🔑 自动 import 类型
  }
}