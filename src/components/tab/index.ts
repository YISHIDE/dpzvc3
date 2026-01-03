/**
 * Created by admin on 2025/10/15.
 */
import type { App } from 'vue'
import Tab from './tab'
Tab.install = (app: App): void => {
    app.component('Tab', Tab); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Tab=Tab as IWithInstall<typeof Tab>;
export default _Tab
export type { TabProps } from './types'