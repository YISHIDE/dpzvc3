/**
 * Created by admin on 2017/5/11.
 */
import type { App } from 'vue'
import Swipe from './swipe'
// export default Swipe
Swipe.install = (app: App): void => {
    app.component('Swipe', Swipe); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Swipe=Swipe as IWithInstall<typeof Swipe>;
export default _Swipe
export type { SwipeProps } from './types'