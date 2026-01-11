/**
 * Created by admin on 2025/9/24.
 */
import type { App } from 'vue'
import Text from './textBar'
// import Number from './Number'
// Text.Number = Number
Text.install = (app: App): void => {
  app.component('TextBar', Text) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Text = Text as IWithInstall<typeof Text>
export default _Text
export type { TextBarProps } from './types'
