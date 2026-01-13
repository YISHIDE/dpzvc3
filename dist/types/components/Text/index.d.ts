/**
 * Created by admin on 2025/9/24.
 */
import type { App } from "vue";
import Text from "./textBar";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Text: IWithInstall<typeof Text>;
export default _Text;
export type { TextBarProps } from "./types";
//# sourceMappingURL=index.d.ts.map