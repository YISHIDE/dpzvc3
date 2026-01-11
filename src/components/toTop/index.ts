/**
 * Created by admin on 2025/11/29.
 */
import type { App } from 'vue'
import ToTop from './toTop'
ToTop.install = (app: App): void => {
  app.component('ToTop', ToTop) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _ToTop = ToTop as IWithInstall<typeof ToTop>
export default _ToTop
// export default ToTop
export type { ToTopProps } from './types'
