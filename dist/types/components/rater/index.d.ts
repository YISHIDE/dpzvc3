/**
 * Created by admin on 2025/10/31.
 */
import type { App } from "vue";
import Rater from "./raters";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Rater: IWithInstall<typeof Rater>;
export default _Rater;
export type { RaterProps } from "./types";
//# sourceMappingURL=index.d.ts.map