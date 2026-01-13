/**
 * Created by yishide on 2025/09/26.
 */
import type { App } from "vue";
import Progress from "./progress";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Progress: IWithInstall<typeof Progress>;
export default _Progress;
export type { ProgressProps } from "./types";
//# sourceMappingURL=index.d.ts.map