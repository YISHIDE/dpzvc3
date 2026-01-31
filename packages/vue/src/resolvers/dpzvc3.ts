// src/resolvers/dpzvc3.ts
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module' // ✅ ESM 下可用
// import type { ComponentResolver } from 'unplugin-vue-components'

// 在 ESM 中创建 require
const require = createRequire(import.meta.url)

// 获取 basePath
const basePath = path.dirname(
  require.resolve('@dpzvc3/vue/package.json')
)

// 服务组件列表
// const serviceComponents = ['modal', 'message']

// 自动扫描 dist/es 下组件目录
const componentDirs = fs.readdirSync(path.join(basePath, 'dist/es')).filter((dir) => {
  const full = path.join(basePath, 'dist/es', dir)
  return fs.statSync(full).isDirectory()
})
const componentsStr = [
  'action-sheet',
  'badge',
  'dp-button',
  'card',
  'cell',
  'cell-swipe',
  'check-box',
  'dp-header',
  'indicator',
  'load-more',
  'picker',
  'popup',
  'progress',
  'prompt',
  'radio-box',
  'rater',
  'slide-bar',
  'spinner',
  'swipe',
  'switch-bar',
  'tab',
  'text-bar',
  'to-top',
  'upload',
  'modal',
  'message',
]
const serviceComponents = ['modal', 'message', 'indicator', 'prompt'];
export const Dpzvc3Resolver = () => {
  return (name: string) => { 
    console.log('Dpzvc3Resolver:',name);
    const servicesName: string = name.toLowerCase()
    console.log('servicesName:',servicesName);
    if (serviceComponents.includes(servicesName)) { 
      console.log('service component:',servicesName);
      return {
        name: 'default',
        from: `@dpzvc3/vue/es/${servicesName}`
      }
    }
    const componentDir = name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1)
    if (!componentsStr.includes(componentDir)) return undefined
    const fullPath = path.join(basePath, 'dist/es', componentDir)

    if (fs.existsSync(fullPath)) {
      return {
        name: 'default',
        from: `@dpzvc3/vue/es/${componentDir}`
      }
    }
    return undefined
  }
}

export const Dpzvc3ImportResolver = () => {
  return (name: string) => { 
    console.log('Dpzvc3Resolver:',name);
  const servicesName: string = name.toLowerCase()
    console.log('servicesName:',servicesName);
    if (serviceComponents.includes(servicesName)) { 
      console.log('service component:',servicesName);
      return {
        name: 'default',
        from: `@dpzvc3/vue/es/${servicesName}`
      }
    }
    return undefined
  }
}


// export const Dpzvc3TypesResolver= (name: string) => {
//   // 只处理 Props 或 Emits 类型
// const componentDir = name
//       .replace(/([A-Z])/g, '-$1')
//       .toLowerCase()
//       .slice(1)

//     const fullPath = path.join(basePath, 'dist/es', componentDir)

//     if (fs.existsSync(fullPath)) {
//       return {
//         name: 'default',
//         from: `@dpzvc3/vue/es/${componentDir}`
//       }
//     }

//   // return {
//   //   from: `@dpzvc3/vue/es/${kebabName}`, // 指向组件 es 入口
//   //   name: `${componentName}${typeKind}`, // 🔑 必须显式指定
//   //   type: true, // 🔑 自动 import 类型
//   // }
// }