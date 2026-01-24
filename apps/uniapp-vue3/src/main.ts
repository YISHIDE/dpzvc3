import { createSSRApp } from "vue";
import App from "./App.vue";
// import dpzvc3 from '@dpzvc3/uni-app/uni_modules/js_sdk/index.ts';
// import UniButton from '@dpzvc3/uni-app/src/components/UniButton.vue'
import DpzUI from './uni_modules/dpzvc3-ui/js_sdk';
export function createApp() {
  const app = createSSRApp(App);
  // console.log(UniButton);
  // app.use(UniComponents);
  // app.component('uni-button', UniButton);
  app.use(DpzUI);
  return {
    app,
  };
}
