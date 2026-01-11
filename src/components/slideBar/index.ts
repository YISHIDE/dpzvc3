/**
 * Created by admin on 2017/4/21.
 */
import type { App } from 'vue'
import SlideBar from './slideBar'
SlideBar.install = (app: App): void => {
  app.component('SlideBar', SlideBar) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _SlideBar = SlideBar as IWithInstall<typeof SlideBar>
export default _SlideBar
// export default SlideBar
export type { SlideBarProps } from './types'
