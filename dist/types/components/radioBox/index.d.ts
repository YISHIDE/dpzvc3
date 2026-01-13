/**
 * Created by admin on 2017/4/19.
 */
import type { App } from "vue";
import RadioBox from "./radiobox";
import RadioBoxGroup from "./radiobox-group";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _RadioBox: IWithInstall<typeof RadioBox>;
declare const _RadioBoxGroup: IWithInstall<typeof RadioBoxGroup>;
export { _RadioBox as RadioBox, _RadioBoxGroup as RadioBoxGroup };
export type { RadioBoxProps, RadioGroupProps } from "./types";
//# sourceMappingURL=index.d.ts.map