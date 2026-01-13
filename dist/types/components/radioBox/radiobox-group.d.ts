import { PropType } from "vue";
import type { RadioGroupProps } from "./types";
export type { RadioGroupProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<RadioGroupProps["modelValue"]>;
        default: string;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "on-change" | "on-form-change")[], "update:modelValue" | "on-change" | "on-form-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<RadioGroupProps["modelValue"]>;
        default: string;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onOn-change"?: ((...args: any[]) => any) | undefined;
    "onOn-form-change"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: (string | number | boolean) | undefined;
    vertical: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=radiobox-group.d.ts.map