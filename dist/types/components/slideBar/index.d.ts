/**
 * Created by admin on 2017/4/21.
 */
import type { App } from "vue";
import SlideBar from "./slideBar";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _SlideBar: IWithInstall<typeof SlideBar>;
export default _SlideBar;
export type { SlideBarProps } from "./types";
//# sourceMappingURL=index.d.ts.map