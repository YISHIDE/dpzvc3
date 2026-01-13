/**
 * Created by admin on 2017/5/9.
 */
import type { App } from "vue";
import DpButton from "./button";
DpButton.install = (app: App): void => {
  app.component("DpButton", DpButton); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _DpButton = DpButton as IWithInstall<typeof DpButton>;
export default _DpButton;
// export default DpButton
export type { ButtonProps } from "./types";
