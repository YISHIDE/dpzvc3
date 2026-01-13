// app.ts
import { createSSRApp } from "vue";
import { createRouter } from "./router";
import App from "./components/app.vue";
import dpzvc3 from "./index";
// const isSSR = typeof process !== 'undefined' && process.env.SSR === 'true'
export function createApp(isServer: boolean) {
  const app = createSSRApp(App);
  const router = createRouter(isServer);

  app.use(dpzvc3);
  app.use(router);

  return { app, router };
}
