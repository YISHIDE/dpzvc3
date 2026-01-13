/**
 * Created by admin on 2017/7/4.
 */
import type { App } from "vue";
import CellSwipe from "./cellSwipe";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _CellSwipe: IWithInstall<typeof CellSwipe>;
export default _CellSwipe;
export type { CellSwipeProps } from "./types";
//# sourceMappingURL=index.d.ts.map