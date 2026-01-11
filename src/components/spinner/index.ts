/**
 * Created by admin on 2025/10/16.
 */
import type { App } from 'vue'
import Spinner from './spinner'
Spinner.install = (app: App): void => {
  app.component('Spinner', Spinner) // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Spinner = Spinner as IWithInstall<typeof Spinner>
export default _Spinner
// export default Spinner
export type { SpinnerProps } from './types'
