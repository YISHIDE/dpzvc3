import type { App } from "vue";
import Number from "./Number";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Number: IWithInstall<typeof Number>;
export default _Number;
export type { NumberProps } from "./types";
//# sourceMappingURL=index.d.ts.map