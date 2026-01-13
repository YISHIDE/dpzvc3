/**
 * Created by admin on 2025/09/26.
 */
import type { App } from "vue";
import SwitchBar from "./switchbar";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _SwitchBar: IWithInstall<typeof SwitchBar>;
export default _SwitchBar;
export type { SwitchBarProps } from "./types";
//# sourceMappingURL=index.d.ts.map