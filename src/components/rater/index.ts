/**
 * Created by admin on 2025/10/31.
 */
import type { App } from 'vue'
import Rater from './raters'
Rater.install = (app: App): void => {
  app.component('Rater', Rater) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Rater = Rater as IWithInstall<typeof Rater>
export default _Rater
export type { RaterProps } from './types'
