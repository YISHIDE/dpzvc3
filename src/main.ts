import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './components/app.vue'
import Routers from './router'
import Config from './config/config'
// import dpzvc3 from 'dpzvc3-ui'
import dpzvc3 from './index'
// import { count } from './utils/test'
// console.log(count)
// 1️⃣ 创建 app
const app = createApp(App)

// 2️⃣ 安装你的组件库
app.use(dpzvc3)

// 3️⃣ 挂载全局变量
app.config.globalProperties.$Config = Config

// 4️⃣ 创建 router（Vue Router 4）
const router = createRouter({
  history: createWebHashHistory(), // 等价于 Vue 2 的 mode: 'hash'
  routes: Routers,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 5️⃣ 使用路由
app.use(router)

// 6️⃣ 挂载
app.mount('#app')
