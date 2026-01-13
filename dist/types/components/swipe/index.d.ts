/**
 * Created by admin on 2017/5/11.
 */
import type { App } from "vue";
import Swipe from "./swipe";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Swipe: IWithInstall<typeof Swipe>;
export default _Swipe;
export type { SwipeProps } from "./types";
//# sourceMappingURL=index.d.ts.map