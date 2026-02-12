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

// 服务组件列表
// const serviceComponents = ['modal', 'message']
const kebabToPascal = (name: string) => {
  return name
    .split('-')               // ['check', 'box', 'group']
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // ['Check', 'Box', 'Group']
    .join('')                 // 'CheckBoxGroup'
}
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
  'dp-number',
  'check-box-group',
  'radio-box-group'
]
const serviceComponents = ['modal', 'message', 'indicator', 'prompt'];
const componentsGroup = ['check-box','check-box-group','radio-box','radio-box-group']
export const Dpzvc3Resolver = ():ComponentResolver => {
  return (name: string) => { 
    // console.log('Dpzvc3Resolver:',name);
    // 解决vercel部署indicator组件加载问题
    const servicesName: string = name.toLowerCase()
    // console.log('servicesName:',servicesName);
    if (serviceComponents.includes(servicesName)) { 
      // console.log('service component:',servicesName);
      return {
        name: 'default',
        from: `@dpzvc3/vue/es/${servicesName}`,
        sideEffects: [`@dpzvc3/styles/dist/components/${servicesName}.css`,
          `@dpzvc3/styles/dist/base/font.css`,
          `@dpzvc3/styles/dist/base/reset.css`,
          `@dpzvc3/styles/dist/utils/1px.css`,
          `@dpzvc3/styles/dist/utils/animation.css`,
          `@dpzvc3/styles/dist/utils/nowrap.css`
        ]
      }
    }
    const componentDir = name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1)
    if (!componentsStr.includes(componentDir)) return undefined
    if (componentsGroup.includes(componentDir)) { 
      if (componentDir === 'check-box-group' || componentDir === 'radio-box-group') { 
        const sliceComponentDir = componentDir.slice(0, componentDir.indexOf('-group'))
      //   console.dir({
      //   importName: kebabToPascal(componentDir),
      //   path: `@dpzvc3/vue/es/${sliceComponentDir}`,
      //   sideEffects: [`@dpzvc3/styles/dist/components/${sliceComponentDir}.css`,
      //     `@dpzvc3/styles/dist/base/font.css`,
      //     `@dpzvc3/styles/dist/base/reset.css`,
      //     `@dpzvc3/styles/dist/utils/1px.css`,
      //     `@dpzvc3/styles/dist/utils/animation.css`,
      //     `@dpzvc3/styles/dist/utils/nowrap.css`
      //   ]
      // }, 'Group component');
        return {
        // importName: kebabToPascal(componentDir),
        name: kebabToPascal(componentDir),
        // name:'*',
        from: `@dpzvc3/vue/es/${sliceComponentDir}`,
        sideEffects: [`@dpzvc3/styles/dist/components/${sliceComponentDir}.css`,
          `@dpzvc3/styles/dist/base/font.css`,
          `@dpzvc3/styles/dist/base/reset.css`,
          `@dpzvc3/styles/dist/utils/1px.css`,
          `@dpzvc3/styles/dist/utils/animation.css`,
          `@dpzvc3/styles/dist/utils/nowrap.css`
          ]
      }
      }
      // console.dir({
      //   importName: kebabToPascal(componentDir),
      //   path: `@dpzvc3/vue/es/${componentDir}`,
      //   sideEffects: [`@dpzvc3/styles/dist/components/${componentDir}.css`,
      //     `@dpzvc3/styles/dist/base/font.css`,
      //     `@dpzvc3/styles/dist/base/reset.css`,
      //     `@dpzvc3/styles/dist/utils/1px.css`,
      //     `@dpzvc3/styles/dist/utils/animation.css`,
      //     `@dpzvc3/styles/dist/utils/nowrap.css`
      //   ]
      // }, 'Single group component');
      return {
        // importName: kebabToPascal(componentDir),
        name: kebabToPascal(componentDir),
        // name:'*',
        from: `@dpzvc3/vue/es/${componentDir}`,
        sideEffects: [`@dpzvc3/styles/dist/components/${componentDir}.css`,
          `@dpzvc3/styles/dist/base/font.css`,
          `@dpzvc3/styles/dist/base/reset.css`,
          `@dpzvc3/styles/dist/utils/1px.css`,
          `@dpzvc3/styles/dist/utils/animation.css`,
          `@dpzvc3/styles/dist/utils/nowrap.css`
        ]
      }
    }
    const fullPath = path.join(basePath, 'dist/es', componentDir)

    if (fs.existsSync(fullPath)) {
      return {
        name: 'default',
        from: `@dpzvc3/vue/es/${componentDir}`,
        sideEffects: [`@dpzvc3/styles/dist/components/${componentDir}.css`,
          `@dpzvc3/styles/dist/base/font.css`,
          `@dpzvc3/styles/dist/base/reset.css`,
          `@dpzvc3/styles/dist/utils/1px.css`,
          `@dpzvc3/styles/dist/utils/animation.css`,
          `@dpzvc3/styles/dist/utils/nowrap.css`
        ]
      }
    }
    return undefined
  }
}

export const dpzvc3Globals = {
  Indicator: true,
  Modal: true,
  Message: true,
  Prompt: true,
}

// export const Dpzvc3ImportResolver = () => {
//   return (name: string) => { 
//     console.log('Dpzvc3Resolver:',name);
//   const servicesName: string = name.toLowerCase()
//     console.log('servicesName:',servicesName);
//     if (serviceComponents.includes(servicesName)) { 
//       console.log('service component:',servicesName);
//       return {
//         name: 'default',
//         from: `@dpzvc3/vue/es/${servicesName}`,
//          sideEffects: [`@dpzvc3/styles/dist/components/${servicesName}.css`,
//           `@dpzvc3/styles/dist/base/font.css`,
//           `@dpzvc3/styles/dist/base/reset.css`,
//           `@dpzvc3/styles/dist/utils/1px.css`,
//           `@dpzvc3/styles/dist/utils/animation.css`,
//           `@dpzvc3/styles/dist/utils/nowrap.css`
//         ]
//       }
//     }
//     return undefined
//   }
// }


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