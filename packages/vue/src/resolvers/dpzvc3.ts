import fs from 'fs'
import path from 'path'
import type { ComponentResolver } from 'unplugin-vue-components'

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

    const fullPath = path.join(basePath, 'src/components', componentDir)

    if (fs.existsSync(fullPath)) {
      return {
        name: 'default',
        from: `@dpzvc3/vue/src/components/${componentDir}`
      }
    }
  }
}