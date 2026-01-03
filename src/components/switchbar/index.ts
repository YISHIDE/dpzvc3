/**
 * Created by admin on 2025/09/26.
 */
import type { App } from 'vue'
import SwitchBar from './switchbar'
SwitchBar.install = (app: App): void => {
    app.component('SwitchBar', SwitchBar); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _SwitchBar=SwitchBar as IWithInstall<typeof SwitchBar>;
export default _SwitchBar
// export default SwitchBar
export type { SwitchBarProps } from './types'