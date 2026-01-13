import type { PropType } from "vue";
import type { RadioBoxProps } from "./types";
export type { RadioBoxProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    label: {
        type: PropType<RadioBoxProps["label"]>;
        required: true;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    disable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "on-change")[], "update:modelValue" | "on-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: PropType<RadioBoxProps["label"]>;
        required: true;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    disable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onOn-change"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: boolean;
    disable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=radiobox.d.ts.map