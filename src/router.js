/**
 * 路由配置 - 按需加载版本
 */
const routers = [
  { path: '/', redirect: '/guide' },

  { path: '/guide', name: 'guide', component: () => import(/* webpackChunkName: "guide" */ './views/guide.vue'), meta: { title: 'guide' } },
  { path: '/ActionSheet', name: 'ActionSheet', component: () => import(/* webpackChunkName: "actionsheet" */ './views/ActionSheet.vue'), meta: { title: 'ActionSheet' } },
  { path: '/Badge', name: 'Badge', component: () => import(/* webpackChunkName: "badge" */ './views/Badge.vue'), meta: { title: 'Badge' } },
  { path: '/Button', name: 'Button', component: () => import(/* webpackChunkName: "button" */ './views/Button.vue'), meta: { title: 'Button' } },
  { path: '/Card', name: 'Card', component: () => import(/* webpackChunkName: "card" */ './views/Card.vue'), meta: { title: 'Card' } },
  { path: '/Cell', name: 'Cell', component: () => import(/* webpackChunkName: "cell" */ './views/Cell.vue'), meta: { title: 'Cell' } },
  { path: '/CellSwipe', name: 'CellSwipe', component: () => import(/* webpackChunkName: "cellswipe" */ './views/CellSwipe.vue'), meta: { title: 'CellSwipe' } },
  { path: '/CheckBox', name: 'CheckBox', component: () => import(/* webpackChunkName: "checkbox" */ './views/CheckBox.vue'), meta: { title: 'CheckBox' } },
  { path: '/Header', name: 'Header', component: () => import(/* webpackChunkName: "header" */ './views/Header.vue'), meta: { title: 'Header' } },
  { path: '/Indicator', name: 'Indicator', component: () => import(/* webpackChunkName: "indicator" */ './views/Indicator.vue'), meta: { title: 'Indicator' } },
  { path: '/LoadMore', name: 'LoadMore', component: () => import(/* webpackChunkName: "loadmore" */ './views/LoadMore.vue'), meta: { title: 'LoadMore' } },
  { path: '/Message', name: 'Message', component: () => import(/* webpackChunkName: "message" */ './views/Message.vue'), meta: { title: 'Message' } },
  { path: '/Modal', name: 'Modal', component: () => import(/* webpackChunkName: "modal" */ './views/Modal.vue'), meta: { title: 'Modal' } },
  { path: '/Picker', name: 'Picker', component: () => import(/* webpackChunkName: "picker" */ './views/Picker.vue'), meta: { title: 'Picker' } },
  { path: '/Popup', name: 'Popup', component: () => import(/* webpackChunkName: "popup" */ './views/Popup.vue'), meta: { title: 'Popup' } },
  { path: '/Progress', name: 'Progress', component: () => import(/* webpackChunkName: "progress" */ './views/Progress.vue'), meta: { title: 'Progress' } },
  { path: '/Prompt', name: 'Prompt', component: () => import(/* webpackChunkName: "prompt" */ './views/Prompt.vue'), meta: { title: 'Prompt' } },
  { path: '/RadioBox', name: 'RadioBox', component: () => import(/* webpackChunkName: "radiobox" */ './views/RadioBox.vue'), meta: { title: 'RadioBox' } },
  { path: '/Rater', name: 'Rater', component: () => import(/* webpackChunkName: "rater" */ './views/Rater.vue'), meta: { title: 'Rater' } },
  { path: '/SlideBar', name: 'SlideBar', component: () => import(/* webpackChunkName: "slidebar" */ './views/SlideBar.vue'), meta: { title: 'SlideBar' } },
  { path: '/Spinner', name: 'Spinner', component: () => import(/* webpackChunkName: "spinner" */ './views/Spinner.vue'), meta: { title: 'Spinner' } },
  { path: '/Swipe', name: 'Swipe', component: () => import(/* webpackChunkName: "swipe" */ './views/Swipe.vue'), meta: { title: 'Swipe' } },
  { path: '/SwitchBar', name: 'SwitchBar', component: () => import(/* webpackChunkName: "switchbar" */ './views/SwitchBar.vue'), meta: { title: 'SwitchBar' } },
  { path: '/Tab', name: 'Tab', component: () => import(/* webpackChunkName: "tab" */ './views/Tab.vue'), meta: { title: 'Tab' } },
  { path: '/Text', name: 'Text', component: () => import(/* webpackChunkName: "text" */ './views/Text.vue'), meta: { title: 'Text' } },
  { path: '/ToTop', name: 'ToTop', component: () => import(/* webpackChunkName: "totop" */ './views/ToTop.vue'), meta: { title: 'ToTop' } },
  { path: '/Upload', name: 'Upload', component: () => import(/* webpackChunkName: "upload" */ './views/Upload.vue'), meta: { title: 'Upload' } }
]

export default routers
