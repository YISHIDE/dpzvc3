/**

 */
import type { App } from "vue";
import CheckBox from "./checkbox";
import CheckBoxGroup from "./checkbox-group";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _CheckBox: IWithInstall<typeof CheckBox>;
declare const _CheckBoxGroup: IWithInstall<typeof CheckBoxGroup>;
export { _CheckBox as CheckBox, _CheckBoxGroup as CheckBoxGroup };
export type { CheckBoxProps, CheckBoxGroupProps } from "./types";
//# sourceMappingURL=index.d.ts.map