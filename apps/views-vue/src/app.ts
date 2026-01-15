// app.ts
import { createSSRApp } from "vue";
import { createRouter } from "./router";
import App from "./App.vue";
import dpzvc3 from "@dpzvc3/vue";
// const isSSR = typeof process !== 'undefined' && process.env.SSR === 'true'
export function createApp(isServer: boolean) {
  const app = createSSRApp(App);
  const router = createRouter(isServer);

  app.use(dpzvc3);
  app.use(router);

  return { app, router };
}
