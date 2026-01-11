/**
 * Created by admin on 2025/9/19.
 */
import type { App } from "vue";
import ActionSheet from "./actionSheet";
ActionSheet.install = (app: App): void => {
  app.component("ActionSheet", ActionSheet); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _ActionSheet = ActionSheet as IWithInstall<typeof ActionSheet>;
export default _ActionSheet;
// export default ActionSheet
export type { ActionSheetProps, ActionSheetEmits } from "./types";
