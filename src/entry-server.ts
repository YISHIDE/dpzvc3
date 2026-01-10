// import { createSSRApp } from 'vue'
// import { createRouter } from './router'
// import App from './components/app.vue'
// import { renderToString } from '@vue/server-renderer'
// import dpzvc3 from './index'
// export async function render(url: string) {
//     // console.log('url', url)
//   const app = createSSRApp(App)
//   const router = createRouter(true)
//   app.use(dpzvc3)
//   app.use(router)
//   router.push(url)
//   await router.isReady()
//   return await renderToString(app)
// }

import { renderToString } from '@vue/server-renderer'
import { createApp } from './app'

export async function render(url: string) {
  const { app, router } = createApp(true)

  await router.push(url)
  await router.isReady()

  return renderToString(app)
}