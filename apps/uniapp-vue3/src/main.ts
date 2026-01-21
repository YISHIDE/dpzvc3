import { createSSRApp } from "vue";
import App from "./App.vue";
// import UniComponents from '@dpzvc3/uni-app/src/index';
import UniButton from '@dpzvc3/uni-app/src/components/UniButton.vue'

export function createApp() {
  const app = createSSRApp(App);
  // console.log(UniButton);
  // app.use(UniComponents);
  app.component('uni-button', UniButton);
  return {
    app,
  };
}
