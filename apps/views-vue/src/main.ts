import { createApp } from 'vue'
// import './style.css'
import dpzvc3 from "@dpzvc3/vue";
// import "@dpzvc3/vue/dist/styles/dpzvc3.css"
import App from './App.vue'
import { createHashRouter } from "./router";
const app = createApp(App);
app.use(dpzvc3)

const router = createHashRouter();
app.use(router);
app.mount('#app')
