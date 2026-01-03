/**
 * Vue 3 组件库入口 ts 版本
 */

import type { App } from 'vue'

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
import LoadMore from './components/loadMore'
import Popup from './components/popup'
import Indicator from './components/Indicator'
import Progress from './components/progress'
import ToTop from './components/toTop'
import Cell from './components/cell'
import CellSwipe from './components/cellSwipe'
import Badge from './components/badge'
import Card from './components/card'
import Number from './components/number'

/* ========= Installable 泛型 ========= */
export type Installable<T> = T & {
  install?: (app: App) => void
}
export type Components = {
  [K in keyof typeof _components]: Installable<typeof _components[K]>
}
export const components: Components = {} as Components
/* ========= 组件集合 ========= */
const _components = {
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
  LoadMore,
  Popup,
  DpProgress: Progress,
  ToTop,
  Cell,
  CellSwipe,
  Badge,
  Card
}
/* typeof _component在ts输出
 // {
//   VButton: typeof VButton
//   CheckBox: typeof CheckBox
//   CheckBoxGroup: typeof CheckBoxGroup
// }
如果直接写[K in keyof _components]报错Type '_components' is not a type.  原因就是 _components 是 值，不是类型。
  •	keyof 只能作用在 类型上。
  •	所以必须先用 typeof 变成类型：keyof typeof _components。
*/
/* ========= 生成 Installable 类型组件集合 ========= */
// export const components: {
//   [K in keyof typeof _components]: Installable<typeof _components[K]>
// } = {} as any
// 遍历给组件加 install
Object.keys(_components).forEach((key) => {
  const component = _components[key as keyof typeof _components] as Installable<
    typeof _components[keyof typeof _components]
  >
  if (component && !component.install) {
    component.install = (app: App) => {
      app.component(key, component)
    }
  }
  components[key as keyof typeof _components] = component
})
/* ========= 服务组件 ========= */
export const services: Record<string, any> = {
  Message,
  Modal,
  Prompt,
  Indicator
}

Object.keys(services).forEach((key) => {
  const service = services[key]
  if (service && !service.install) {
    service.install = (app: App) => {
      app.config.globalProperties[`$${key}`] = service
    }
  }
})

/* ========= 全量 install ========= */
export const install = (app: App) => {
  if (!app) {
    console.warn(
      'dpzvc3 install: app is undefined, ensure you are using Vue 3 createApp'
    )
    return
  }
  // 注册组件
  Object.values(components).forEach((comp) => {
    if (comp.install) {
      comp.install(app)
    }
  })

  // 注册服务
  Object.values(services).forEach((srv) => {
    if (srv.install) {
      srv.install(app)
    }
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
  Swipe,
  Tab,
  SlideBar,
  TextBar,
  Upload,
  ActionSheet,
  SwitchBar,
  Rater,
  Spinner,
  LoadMore,
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
export default {
  install
}