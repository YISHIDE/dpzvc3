/**
 * Created by yishide on 2025/09/26.
 */
import type { App } from 'vue'
import Progress from './progress'
Progress.install = (app: App): void => {
    app.component('DpProgress', Progress); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Progress=Progress as IWithInstall<typeof Progress>;
export default _Progress
export type { ProgressProps } from './types'