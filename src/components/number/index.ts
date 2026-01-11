import type { App } from 'vue'
import Number from './Number'
Number.install = (app: App): void => {
  app.component('Number', Number) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Number = Number as IWithInstall<typeof Number>
export default _Number
// export default Number
export type { NumberProps } from './types'
