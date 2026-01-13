/**
 * Created by admin on 2025/11/19.
 */
import type { App } from "vue";
import Picker from "./picker";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Picker: IWithInstall<typeof Picker>;
export default _Picker;
export type { PickerProps } from "./types";
//# sourceMappingURL=index.d.ts.map