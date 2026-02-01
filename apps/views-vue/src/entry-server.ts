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





import { renderToString } from "@vue/server-renderer";
import { createApp } from "./app";

export async function render(url: string) {
  const { app, router } = createApp(true);

  await router.push(url);
  await router.isReady();
// console.log(app?.$style, 'appstyle');
  return renderToString(app);
}



// import { renderToString } from "@vue/server-renderer";
// import { createApp } from "./app";

// export async function render(
//   url: string,
//   manifest: Record<string, any>
// ) {
//   const { app, router } = createApp(true);

//   await router.push(url);
//   await router.isReady();

//   // ✅ 必须是 Set
//   const context: {
//     modules: Set<string>
//   } = {
//     modules: new Set()
//   };

//   const appHtml = await renderToString(app, context);

//   // ✅ Set → Array 再 map
//   const cssLinks = Array.from(context.modules)
//     .map((id: string) => {
//       const files = manifest[id]?.css || [];
//       return files
//         .map((f: string) => `<link rel="stylesheet" href="/${f}">`)
//         .join("");
//     })
//     .join("");
//   console.log('cssLinks', JSON.stringify(cssLinks));
//   return {
//     appHtml,
//     cssLinks,
//   };
// }