// import { createSSRApp, h } from 'vue'
// import { createRouter } from './router'
// import App from './components/app.vue'
// import dpzvc3 from './index'
// const app = createSSRApp(App)
// // entry-client.js
// console.log(app._context.components, 'context') // 看 dpzvc3 的组件是否注册
// const router = createRouter(false)   // false 表示客户端模式
// console.log(router.getRoutes(), 'entry-client.ts 运行了')
// app.use(dpzvc3)
// app.use(router)

// router.isReady().then(() => {
//   app.mount('#app')
// })
import { createApp } from "./app";

const { app, router } = createApp(false);

console.log("🟢 app created");

router.beforeEach((to, from, next) => {
  console.log("➡️ route change", from.fullPath, "=>", to.fullPath);
  next();
});

router.isReady().then(() => {
  console.log("🟢 router ready, mount app");
  app.mount("#app");
  document.getElementById('skeleton')?.remove()
});
