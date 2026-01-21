// // src/index.ts
// import UniButton from './components/UniButton.vue'

// const components = {
//   UniButton
// }

// const install = (app: any) => {
//   Object.entries(components).forEach(([name, comp]) => {
//     // 注册小程序端用 kebab-case 名称
//     app.component(name, comp)
//     app.component(name.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
//     .toLowerCase()
// , comp)
//   })
// }

// export default {
//   install,
//   // ...components
// }


// packages/uni-app/src/index.ts
import type { App } from 'vue'
import UniButton from './components/UniButton.vue'

export default {
  install(app: App) {
    // ❗ 只注册一个名字，且是 kebab-case
    app.component('uni-button', UniButton)
  }
}

// 可选：按需引入（给 H5 / TS 用）
export { UniButton }