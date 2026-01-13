import { PropType } from "vue";
import type { ActionSheetProps, ActionSheetEmits, ActionItem } from "./types";
export type { ActionSheetProps, ActionSheetEmits };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    items: {
        type: PropType<Array<ActionItem>>;
        default: () => never[];
    };
    cancleText: {
        type: StringConstructor;
        default: string;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    readonly "update:modelValue": (value: ActionSheetProps["modelValue"]) => boolean;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    items: {
        type: PropType<Array<ActionItem>>;
        default: () => never[];
    };
    cancleText: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
}>, {
    modelValue: boolean;
    items: ActionItem[];
    cancleText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=actionSheet.d.ts.map