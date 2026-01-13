/**
 * Created by admin on 2025/9/19.
 */
import type { App } from "vue";
import ActionSheet from "./actionSheet";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _ActionSheet: IWithInstall<typeof ActionSheet>;
export default _ActionSheet;
export type { ActionSheetProps, ActionSheetEmits } from "./types";
//# sourceMappingURL=index.d.ts.map