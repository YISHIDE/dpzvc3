/**
 * Vue 3 组件库入口 ts 版本
 */

import type { App, Plugin } from 'vue'

/* ========= 组件引入 ========= */
import DpButton from './components/button'
import { CheckBox, CheckBoxGroup } from './components/checkBox'
import DpHeader from './components/header'
import Message from './components/message'
import Modal from './components/modal'
import Picker from './components/picker'
import { RadioBox, RadioBoxGroup } from './components/radioBox'
import Swipe from './components/swipe'
import Tab from './components/tab'
import Prompt from './components/prompt'
import SlideBar from './components/slideBar'
import TextBar from './components/Text'
import Upload from './components/upload'
import ActionSheet from './components/actionSheet'
import SwitchBar from './components/switchbar'
import Rater from './components/rater'
import Spinner from './components/spinner'
import DpLoadMore from './components/loadMore'
import Popup from './components/popup'
import Indicator from './components/Indicator'
import Progress from './components/progress'
import ToTop from './components/toTop'
import Cell from './components/cell'
import CellSwipe from './components/cellSwipe'
import Badge from './components/badge'
import Card from './components/card'
import Number from './components/number'

/* ========= 组件集合 ========= */
const components = {
  DpButton,
  CheckBox,
  CheckBoxGroup,
  RadioBox,
  RadioBoxGroup,
  DpHeader,
  Picker,
  Swipe,
  Tab,
  SlideBar,
  TextBar,
  Number,
  Upload,
  ActionSheet,
  SwitchBar,
  Rater,
  Spinner,
  DpLoadMore,
  Popup,
  DpProgress: Progress,
  ToTop,
  Cell,
  CellSwipe,
  Badge,
  Card
} as const

/* ========= 服务组件 ========= */
const services = {
  Message,
  Modal,
  Prompt,
  Indicator
} as const

/* ========= 遍历注册组件 ========= */
Object.values(components).forEach((comp: any) => {
  if (comp && !comp.install) {
    comp.install = (app: App) => {
      app.component(comp.name, comp)
    }
  }
})

/* ========= 遍历注册服务 ========= */
Object.values(services).forEach((srv: any, idx) => {
  if (srv && !srv.install) {
    const key = Object.keys(services)[idx]
    srv.install = (app: App) => {
      app.config.globalProperties[`$${key}`] = srv
    }
  }
})

/* ========= 全量 install ========= */
export const install: Plugin['install'] = (app: App) => {
  Object.values(components).forEach((comp: any) => {
    comp.install?.(app)
  })
  Object.values(services).forEach((srv: any) => {
    srv.install?.(app)
  })
}

/* ========= 按需导出 ========= */
export {
  DpButton,
  CheckBox,
  CheckBoxGroup,
  DpHeader,
  Message,
  Modal,
  Prompt,
  Picker,
  RadioBox,
  RadioBoxGroup,
  Swipe,
  Tab,
  SlideBar,
  TextBar,
  Upload,
  ActionSheet,
  SwitchBar,
  Rater,
  Spinner,
  DpLoadMore,
  Popup,
  Indicator,
  Progress,
  ToTop,
  Cell,
  CellSwipe,
  Badge,
  Card
}

/* ========= 默认导出 ========= */
const Dpzvc3UI: Plugin = { install }
export default Dpzvc3UI


/**
 * Vue 3 组件库入口 ts 版本 - SSR 安全
 */
// import type { App, Plugin } from 'vue'

// /* ========= 组件集合（按需延迟引入） ========= */
// const components: Record<string, any> = {
//   DpButton: () => import('./components/button'),
//   CheckBox: () => import('./components/checkBox'),
//   CheckBoxGroup: () => import('./components/checkBox'),
//   RadioBox: () => import('./components/radioBox'),
//   RadioBoxGroup: () => import('./components/radioBox'),
//   DpHeader: () => import('./components/header'),
//   Picker: () => import('./components/picker'),
//   Swipe: () => import('./components/swipe'),
//   Tab: () => import('./components/tab'),
//   SlideBar: () => import('./components/slideBar'),
//   TextBar: () => import('./components/Text'),
//   Number: () => import('./components/number'),
//   Upload: () => import('./components/upload'),
//   ActionSheet: () => import('./components/actionSheet'),
//   SwitchBar: () => import('./components/switchbar'),
//   Rater: () => import('./components/rater'),
//   Spinner: () => import('./components/spinner'),
//   DpLoadMore: () => import('./components/loadMore'),
//   Popup: () => import('./components/popup'),
//   DpProgress: () => import('./components/progress'),
//   ToTop: () => import('./components/toTop'),
//   Cell: () => import('./components/cell'),
//   CellSwipe: () => import('./components/cellSwipe'),
//   Badge: () => import('./components/badge'),
//   Card: () => import('./components/card')
// }

// /* ========= 服务组件 ========= */
// const services: Record<string, any> = {
//   Message: () => import('./components/message'),
//   Modal: () => import('./components/modal'),
//   Prompt: () => import('./components/prompt'),
//   Indicator: () => import('./components/Indicator')
// }

// /* ========= 安装函数 ========= */
// export const install: Plugin['install'] = (app: App) => {
//   const isClient = typeof window !== 'undefined'

//   // 注册组件
//   if (isClient) {
//     Object.entries(components).forEach(async ([key, loader]) => {
//       const compModule = await loader()
//       const comp = compModule.default || compModule
//       if (!comp.install) {
//         comp.install = (app: App) => {
//           app.component(comp.name, comp)
//         }
//       }
//       comp.install(app)
//     })
//   }

//   // 注册服务（全局属性）
//   if (isClient) {
//     Object.entries(services).forEach(async ([key, loader]) => {
//       const srvModule = await loader()
//       const srv = srvModule.default || srvModule
//       if (!srv.install) {
//         srv.install = (app: App) => {
//           app.config.globalProperties[`$${key}`] = srv
//         }
//       }
//       srv.install(app)
//     })
//   }
// }

// /* ========= 按需导出 ========= */
// export * from './components/button'
// export * from './components/checkBox'
// export * from './components/header'
// export * from './components/message'
// export * from './components/modal'
// export * from './components/picker'
// export * from './components/radioBox'
// export * from './components/swipe'
// export * from './components/tab'
// export * from './components/slideBar'
// export * from './components/Text'
// export * from './components/upload'
// export * from './components/actionSheet'
// export * from './components/switchbar'
// export * from './components/rater'
// export * from './components/spinner'
// export * from './components/loadMore'
// export * from './components/popup'
// export * from './components/Indicator'
// export * from './components/progress'
// export * from './components/toTop'
// export * from './components/cell'
// export * from './components/cellSwipe'
// export * from './components/badge'
// export * from './components/card'

// /* ========= 默认导出 ========= */
// const Dpzvc3UI: Plugin = { install }
// export default Dpzvc3UI