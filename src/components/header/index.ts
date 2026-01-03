/**
 * Created by admin on 2025/5/4.
 */
import type { App } from 'vue'
import DpHeader from './header'
DpHeader.install = (app: App): void => {
    app.component('DpHeader', DpHeader); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _DpzHeader=DpHeader as IWithInstall<typeof DpHeader>;
export default _DpzHeader
export type { HeaderProps } from './types'
// export default DpHeader
