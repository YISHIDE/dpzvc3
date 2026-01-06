// /**
//  * 路由配置 - 按需加载版本
//  */
// import { createRouter as _createRouter, createWebHistory, createMemoryHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
// const routers = [
//   { path: '/', redirect: '/guide' },

//   { path: '/guide', name: 'guide', component: () => import(/* webpackChunkName: "guide" */ './views/guide.vue'), meta: { title: 'guide' } },
//   { path: '/ActionSheet', name: 'ActionSheet', component: () => import(/* webpackChunkName: "actionsheet" */ './views/ActionSheet.vue'), meta: { title: 'ActionSheet' } },
//   { path: '/Badge', name: 'Badge', component: () => import(/* webpackChunkName: "badge" */ './views/Badge.vue'), meta: { title: 'Badge' } },
//   { path: '/Button', name: 'Button', component: () => import(/* webpackChunkName: "button" */ './views/Button.vue'), meta: { title: 'Button' } },
//   { path: '/Card', name: 'Card', component: () => import(/* webpackChunkName: "card" */ './views/Card.vue'), meta: { title: 'Card' } },
//   { path: '/Cell', name: 'Cell', component: () => import(/* webpackChunkName: "cell" */ './views/Cell.vue'), meta: { title: 'Cell' } },
//   { path: '/CellSwipe', name: 'CellSwipe', component: () => import(/* webpackChunkName: "cellswipe" */ './views/CellSwipe.vue'), meta: { title: 'CellSwipe' } },
//   { path: '/CheckBox', name: 'CheckBox', component: () => import(/* webpackChunkName: "checkbox" */ './views/CheckBox.vue'), meta: { title: 'CheckBox' } },
//   { path: '/Header', name: 'Header', component: () => import(/* webpackChunkName: "header" */ './views/Header.vue'), meta: { title: 'Header' } },
//   { path: '/Indicator', name: 'Indicator', component: () => import(/* webpackChunkName: "indicator" */ './views/Indicator.vue'), meta: { title: 'Indicator' } },
//   { path: '/LoadMore', name: 'LoadMore', component: () => import(/* webpackChunkName: "loadmore" */ './views/LoadMore.vue'), meta: { title: 'LoadMore' } },
//   { path: '/Message', name: 'Message', component: () => import(/* webpackChunkName: "message" */ './views/Message.vue'), meta: { title: 'Message' } },
//   { path: '/Modal', name: 'Modal', component: () => import(/* webpackChunkName: "modal" */ './views/Modal.vue'), meta: { title: 'Modal' } },
//   { path: '/Picker', name: 'Picker', component: () => import(/* webpackChunkName: "picker" */ './views/Picker.vue'), meta: { title: 'Picker' } },
//   { path: '/Popup', name: 'Popup', component: () => import(/* webpackChunkName: "popup" */ './views/Popup.vue'), meta: { title: 'Popup' } },
//   { path: '/Progress', name: 'Progress', component: () => import(/* webpackChunkName: "progress" */ './views/Progress.vue'), meta: { title: 'Progress' } },
//   { path: '/Prompt', name: 'Prompt', component: () => import(/* webpackChunkName: "prompt" */ './views/Prompt.vue'), meta: { title: 'Prompt' } },
//   { path: '/RadioBox', name: 'RadioBox', component: () => import(/* webpackChunkName: "radiobox" */ './views/RadioBox.vue'), meta: { title: 'RadioBox' } },
//   { path: '/Rater', name: 'Rater', component: () => import(/* webpackChunkName: "rater" */ './views/Rater.vue'), meta: { title: 'Rater' } },
//   { path: '/SlideBar', name: 'SlideBar', component: () => import(/* webpackChunkName: "slidebar" */ './views/SlideBar.vue'), meta: { title: 'SlideBar' } },
//   { path: '/Spinner', name: 'Spinner', component: () => import(/* webpackChunkName: "spinner" */ './views/Spinner.vue'), meta: { title: 'Spinner' } },
//   { path: '/Swipe', name: 'Swipe', component: () => import(/* webpackChunkName: "swipe" */ './views/Swipe.vue'), meta: { title: 'Swipe' } },
//   { path: '/SwitchBar', name: 'SwitchBar', component: () => import(/* webpackChunkName: "switchbar" */ './views/SwitchBar.vue'), meta: { title: 'SwitchBar' } },
//   { path: '/Tab', name: 'Tab', component: () => import(/* webpackChunkName: "tab" */ './views/Tab.vue'), meta: { title: 'Tab' } },
//   { path: '/Text', name: 'Text', component: () => import(/* webpackChunkName: "text" */ './views/Text.vue'), meta: { title: 'Text' } },
//   { path: '/ToTop', name: 'ToTop', component: () => import(/* webpackChunkName: "totop" */ './views/ToTop.vue'), meta: { title: 'ToTop' } },
//   { path: '/Upload', name: 'Upload', component: () => import(/* webpackChunkName: "upload" */ './views/Upload.vue'), meta: { title: 'Upload' } }
// ]

// // export default routers
// export function createRouter(isServer: boolean) {
//   return _createRouter({
//     history: isServer ? createMemoryHistory() : createWebHistory(),
//     routes: routers as RouteRecordRaw[],
//   })
// }

// export function createHashRouter() {
//   return _createRouter({
//     history: createWebHashHistory(),
//     routes: routers as RouteRecordRaw[],
//   })
// }
/**
 * 路由配置 - SSR 友好版本
 */
import { createRouter as _createRouter, createWebHistory, createMemoryHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 判断当前是否 SSR
const isSSR = typeof process !== 'undefined' && process.env.SSR === 'true'
// 辅助函数：SSR 同步加载，SPA 异步懒加载
function loadView(path: string) {
  if (isSSR) {
    // console.log(true)
    // SSR 服务端渲染，直接 require 同步加载
    return require(`./views/${path}.vue`).default
  } else {
    // SPA 客户端懒加载
    return (() => import(`./views/${path}.vue`))
  }
}

const routers: RouteRecordRaw[] = [
  { path: '/', redirect: '/guide' },

  { path: '/guide', name: 'guide', component: loadView('guide'), meta: { title: 'guide' } },
  { path: '/ActionSheet', name: 'ActionSheet', component: loadView('ViewActionSheet'), meta: { title: 'ViewActionSheet' } },
  { path: '/Badge', name: 'Badge', component: loadView('ViewBadge'), meta: { title: 'ViewBadge' } },
  { path: '/Button', name: 'Button', component: loadView('ViewButton'), meta: { title: 'ViewButton' } },
  { path: '/Card', name: 'Card', component: loadView('ViewCard'), meta: { title: 'ViewCard' } },
  { path: '/Cell', name: 'Cell', component: loadView('ViewCell'), meta: { title: 'ViewCell' } },
  { path: '/CellSwipe', name: 'CellSwipe', component: loadView('ViewCellSwipe'), meta: { title: 'ViewCellSwipe' } },
  { path: '/CheckBox', name: 'CheckBox', component: loadView('ViewCheckBox'), meta: { title: 'ViewCheckBox' } },
  { path: '/Header', name: 'Header', component: loadView('ViewHeader'), meta: { title: 'ViewHeader' } },
  { path: '/Indicator', name: 'Indicator', component: loadView('ViewIndicator'), meta: { title: 'ViewIndicator' } },
  { path: '/LoadMore', name: 'LoadMore', component: loadView('ViewLoadMore'), meta: { title: 'ViewLoadMore' } },
  { path: '/Message', name: 'Message', component: loadView('ViewMessage'), meta: { title: 'ViewMessage' } },
  { path: '/Modal', name: 'Modal', component: loadView('ViewModal'), meta: { title: 'ViewModal' } },
  { path: '/Picker', name: 'Picker', component: loadView('ViewPicker'), meta: { title: 'ViewPicker' } },
  { path: '/Popup', name: 'Popup', component: loadView('ViewPopup'), meta: { title: 'ViewPopup' } },
  { path: '/Progress', name: 'Progress', component: loadView('ViewProgress'), meta: { title: 'ViewProgress' } },
  { path: '/Prompt', name: 'Prompt', component: loadView('ViewPrompt'), meta: { title: 'ViewPrompt' } },
  { path: '/RadioBox', name: 'RadioBox', component: loadView('ViewRadioBox'), meta: { title: 'ViewRadioBox' } },
  { path: '/Rater', name: 'Rater', component: loadView('ViewRater'), meta: { title: 'ViewRater' } },
  { path: '/SlideBar', name: 'SlideBar', component: loadView('ViewSlideBar'), meta: { title: 'ViewSlideBar' } },
  { path: '/Spinner', name: 'Spinner', component: loadView('ViewSpinner'), meta: { title: 'ViewSpinner' } },
  { path: '/Swipe', name: 'Swipe', component: loadView('ViewSwipe'), meta: { title: 'ViewSwipe' } },
  { path: '/SwitchBar', name: 'SwitchBar', component: loadView('ViewSwitchBar'), meta: { title: 'ViewSwitchBar' } },
  { path: '/Tab', name: 'Tab', component: loadView('ViewTab'), meta: { title: 'ViewTab' } },
  { path: '/Text', name: 'Text', component: loadView('ViewText'), meta: { title: 'ViewText' } },
  { path: '/ToTop', name: 'ToTop', component: loadView('ViewToTop'), meta: { title: 'ViewToTop' } },
  { path: '/Upload', name: 'Upload', component: loadView('ViewUpload'), meta: { title: 'ViewUpload' } }
]

// 创建 SSR/SPA 路由
export function createRouter(isServer: boolean) {
  return _createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes: routers,
    scrollBehavior() {
    return { top: 0 }
    }
  })
}

// 创建 Hash 路由（可选）
export function createHashRouter() {
  return _createRouter({
    history: createWebHashHistory(),
    routes: routers,
    scrollBehavior() {
    return { top: 0 }
    }
  })
}