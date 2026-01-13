/**
 * Created by admin on 2017/5/9.
 */
import type { App } from "vue";
import DpButton from "./button";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _DpButton: IWithInstall<typeof DpButton>;
export default _DpButton;
export type { ButtonProps } from "./types";
//# sourceMappingURL=index.d.ts.map