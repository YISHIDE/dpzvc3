// import { createApp } from "vue";
// import './style.css'
// import dpzvc3 from "@dpzvc3/vue";
// import "@dpzvc3/styles/dist/index.css";
// import "@dpzvc3/vue/dist/styles/dpzvc3.css"
import App from "./App.vue";
// import Modal from "@dpzvc3/vue/es/modal";
import { createHashRouters } from "./router";
const app = createApp(App);
// app.use(dpzvc3)
const router = createHashRouters();
app.use(router);
// app.use(Modal);
app.mount("#app");
