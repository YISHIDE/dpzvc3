import { createApp, h } from 'vue'
import { createRouter } from './router'
import App from './components/app.vue'
import dpzvc3 from './index'
const app = createApp(App)
const router = createRouter(false)   // false 表示客户端模式

app.use(router)
app.use(dpzvc3)

router.isReady().then(() => {
  app.mount('#app', true)
})