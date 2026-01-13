import { PropType } from "vue";
import type { CheckBoxProps, CheckBoxLabel } from "./types";
export type { CheckBoxProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    disable: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: PropType<CheckBoxLabel>;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "on-change")[], "update:modelValue" | "on-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    disable: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: PropType<CheckBoxLabel>;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onOn-change"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: boolean;
    disable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=checkbox.d.ts.map