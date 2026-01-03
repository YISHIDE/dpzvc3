/**
 * Created by admin on 2017/7/7.
 */
import type { App } from 'vue'
import Card from './card'
Card.install = (app: App): void => {
    app.component('Card', Card); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Card = Card as IWithInstall<typeof Card>;
export default _Card
export type { CardProps } from './types'