/**
 * Created by admin on 2025/10/15.
 */
import type { App } from "vue";
import Tab from "./tab";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Tab: IWithInstall<typeof Tab>;
export default _Tab;
export type { TabProps } from "./types";
//# sourceMappingURL=index.d.ts.map