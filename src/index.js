/**
 * Created by admin on 2025/12/25.
 * Vue 3 version
 */

/* ========= 组件引入 ========= */

import VButton from './components/button'
import CheckBox from './components/checkBox'
import DpHeader from './components/header'
import Message from './components/message'
import Modal from './components/modal'
import Picker from './components/picker'
import RadioBox from './components/radioBox'
import Swipe from './components/swipe'
import Tab from './components/tab'
import Prompt from './components/prompt'
import SlideBar from './components/slideBar'
import TextBar from './components/Text'
import Upload from './components/upload'
import ActionSheet from './components/action-sheet'
import SwitchBar from './components/switchbar'
import Rater from './components/rater'
import Spinner from './components/spinner'
import LoadMore from './components/loadMore'
import Popup from './components/popup'
import Indicator from './components/Indicator'
import Progress from './components/progress'
import ToTop from './components/toTop'
import Cell from './components/cell'
import CellSwipe from './components/cell-swipe'
import Badge from './components/badge'
import Card from './components/card'

/* ========= 组件集合 ========= */

const components = {
  VButton,
  CheckBox,
  CheckBoxGroup: CheckBox.group,
  RadioBox,
  RadioBoxGroup: RadioBox.group,
  DpHeader,
  Picker,
  Swipe,
  Tab,
  SlideBar,
  TextBar,
  Number: TextBar.Number,
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

/* ========= 服务组件 ========= */

const services = {
  Message,
  Modal,
  Prompt,
  Indicator
}

/* ========= 给单个组件补 install（Vue 3 写法） ========= */

Object.keys(components).forEach(key => {
  const component = components[key]
  if (component && !component.install) {
    component.install = (app) => {
      app.component(key, component)
    }
  }
})

Object.keys(services).forEach(key => {
  const service = services[key]
  if (service && !service.install) {
    service.install = (app) => {
      app.config.globalProperties[`$${key}`] = service
    }
  }
})

/* ========= 全量 install ========= */

const install = (app) => {
  // if (install.installed) return
  // install.installed = true
  if (!app) {
    console.warn('dpzvc3 install: app is undefined, ensure you are using Vue 3 createApp')
    return
  }
  // 注册组件
  Object.keys(components).forEach(key => {
    app.component(key, components[key])
  })

  // 注册服务
  Object.keys(services).forEach(key => {
    app.config.globalProperties[`$${key}`] = services[key]
  })
}

/* ========= 按需导出 ========= */

export {
  VButton,
  CheckBox,
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
