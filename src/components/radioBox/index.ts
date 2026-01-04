/**
 * Created by admin on 2017/4/19.
 */
// import RadioBox from './radiobox.vue'
// import RadioBoxGroup from './radiobox-group.vue'

// RadioBox.group = RadioBoxGroup
// export default RadioBox
import type { App } from 'vue'
import RadioBox from './radiobox'
import RadioBoxGroup from './radiobox-group'

RadioBox.install = (app: App): void => {
    app.component('RadioBox', RadioBox); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _RadioBox = RadioBox as IWithInstall<typeof RadioBox>;



RadioBoxGroup.install = (app: App): void => {
    app.component('RadioBoxGroup', RadioBoxGroup); // 注册全局组件
}
const _RadioBoxGroup = RadioBoxGroup as IWithInstall<typeof RadioBoxGroup>;

export {
    _RadioBox as RadioBox,
    _RadioBoxGroup as RadioBoxGroup
}
// export {
//     RadioBox,
//     RadioBoxGroup
// }
export type { RadioBoxProps, RadioGroupProps } from './types'    