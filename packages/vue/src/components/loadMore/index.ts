/**
 * Created by admin on 2025/6/19.
 */
import type { App } from "vue";
import DpLoadMore from "./loadMore";
// export default LoadMore
DpLoadMore.install = (app: App): void => {
  app.component("DpLoadMore", DpLoadMore); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _DpLoadMore = DpLoadMore as IWithInstall<typeof DpLoadMore>;
export default _DpLoadMore;
// export default LoadMore
export type { LoadmoreProps } from "./types";
