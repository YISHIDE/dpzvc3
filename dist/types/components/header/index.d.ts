/**
 * Created by admin on 2025/5/4.
 */
import type { App } from "vue";
import DpHeader from "./header";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _DpzHeader: IWithInstall<typeof DpHeader>;
export default _DpzHeader;
export type { HeaderProps } from "./types";
//# sourceMappingURL=index.d.ts.map