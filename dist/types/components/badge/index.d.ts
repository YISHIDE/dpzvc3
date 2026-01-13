/**
 * Created by admin on 2025/11/4.
 */
import type { App } from "vue";
import Badge from "./badge";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Badge: IWithInstall<typeof Badge>;
export default _Badge;
export type { BadgeProps } from "./types";
//# sourceMappingURL=index.d.ts.map