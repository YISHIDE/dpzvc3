/**
 * Created by admin on 2025/12/4.
 */
import type { App } from "vue";
import Cell from "./cell";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Cell: IWithInstall<typeof Cell>;
export default _Cell;
export type { CellProps } from "./types";
//# sourceMappingURL=index.d.ts.map