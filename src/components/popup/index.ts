/**
 * Created by admin on 2025/11/19.
 */
import type { App } from 'vue'
import Popup from './popup'
Popup.install = (app: App): void => {
  app.component('Popup', Popup) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Popup = Popup as IWithInstall<typeof Popup>
export default _Popup
export type { PopupProps } from './types'
