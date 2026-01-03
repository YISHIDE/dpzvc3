/**
 * Created by admin on 2025/11/19.
 */
import type { App } from 'vue'
import Picker from './picker'
Picker.install = (app: App): void => {
    app.component('Picker', Picker); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Picker=Picker as IWithInstall<typeof Picker>;
export default _Picker
export type { PickerProps } from './types'