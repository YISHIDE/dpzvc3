/**
 * Created by admin on 2017/7/4.
 */
import type { App } from "vue";
import CellSwipe from "./cellSwipe";
// export default CellSwipe
CellSwipe.install = (app: App): void => {
  app.component("CellSwipe", CellSwipe); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _CellSwipe = CellSwipe as IWithInstall<typeof CellSwipe>;
export default _CellSwipe;
export type { CellSwipeProps } from "./types";
