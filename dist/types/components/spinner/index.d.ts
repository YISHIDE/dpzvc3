/**
 * Created by admin on 2025/10/16.
 */
import type { App } from "vue";
import Spinner from "./spinner";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Spinner: IWithInstall<typeof Spinner>;
export default _Spinner;
export type { SpinnerProps } from "./types";
//# sourceMappingURL=index.d.ts.map