/**
 * Created by admin on 2025/11/19.
 */
import type { App } from "vue";
import Popup from "./popup";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Popup: IWithInstall<typeof Popup>;
export default _Popup;
export type { PopupProps } from "./types";
//# sourceMappingURL=index.d.ts.map