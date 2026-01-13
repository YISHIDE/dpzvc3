/**
 * Created by admin on 2025/6/19.
 */
import type { App } from "vue";
import DpLoadMore from "./loadMore";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _DpLoadMore: IWithInstall<typeof DpLoadMore>;
export default _DpLoadMore;
export type { LoadmoreProps } from "./types";
//# sourceMappingURL=index.d.ts.map