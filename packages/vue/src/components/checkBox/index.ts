/**

 */
// CheckBox.group = CheckGroup
// export default CheckBox
import type { App } from "vue";
import CheckBox from "./checkbox";
import CheckBoxGroup from "./checkbox-group";

CheckBox.install = (app: App): void => {
  app.component("CheckBox", CheckBox); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _CheckBox = CheckBox as IWithInstall<typeof CheckBox>;

CheckBoxGroup.install = (app: App): void => {
  app.component("CheckBoxGroup", CheckBoxGroup); // 注册全局组件
};
const _CheckBoxGroup = CheckBoxGroup as IWithInstall<typeof CheckBoxGroup>;

export { _CheckBox as CheckBox, _CheckBoxGroup as CheckBoxGroup };
export type { CheckBoxProps, CheckBoxGroupProps } from "./types";
