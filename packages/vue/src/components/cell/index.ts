/**
 * Created by admin on 2025/12/4.
 */
import type { App } from "vue";
import Cell from "./cell";
Cell.install = (app: App): void => {
  app.component("Cell", Cell); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _Cell = Cell as IWithInstall<typeof Cell>;
export default _Cell;
export type { CellProps } from "./types";
