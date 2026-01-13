/**
 * Created by admin on 2017/7/7.
 */
import type { App } from "vue";
import Card from "./card";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Card: IWithInstall<typeof Card>;
export default _Card;
export type { CardProps } from "./types";
//# sourceMappingURL=index.d.ts.map