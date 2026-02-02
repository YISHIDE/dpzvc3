// app.ts
import { createSSRApp } from "vue";
import { createRouters } from "./router";
// import { createHead } from '@vueuse/head';
import App from "./App.vue";
// import "@dpzvc3/styles/dist/index.css";
// import dpzvc3 from "@dpzvc3/vue";
// const isSSR = typeof process !== 'undefined' && process.env.SSR === 'true'
export function createApp(isServer: boolean) {
  const app = createSSRApp(App);
  const router = createRouters(isServer);

  // app.use(dpzvc3);
  // ⚡ 创建 head 管理实例
  // const head = createHead();
  // app.use(head)
  app.use(router);

  return { app, router };
}
