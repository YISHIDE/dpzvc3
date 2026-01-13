/**
 * Created by admin on 2025/11/29.
 */
import type { App } from "vue";
import ToTop from "./toTop";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _ToTop: IWithInstall<typeof ToTop>;
export default _ToTop;
export type { ToTopProps } from "./types";
//# sourceMappingURL=index.d.ts.map