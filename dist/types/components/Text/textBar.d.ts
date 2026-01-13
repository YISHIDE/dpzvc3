import { PropType } from "vue";
import type { TextBarProps } from "./types";
export type { TextBarProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<string | number>;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: PropType<string | number>;
        default: string;
    };
    rows: NumberConstructor;
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputStyles: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    maxlength: NumberConstructor;
    name: StringConstructor;
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "input" | "on-input" | "on-enter" | "on-change")[], "update:modelValue" | "input" | "on-input" | "on-enter" | "on-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<string | number>;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: PropType<string | number>;
        default: string;
    };
    rows: NumberConstructor;
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputStyles: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    maxlength: NumberConstructor;
    name: StringConstructor;
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onOn-input"?: ((...args: any[]) => any) | undefined;
    "onOn-enter"?: ((...args: any[]) => any) | undefined;
    "onOn-change"?: ((...args: any[]) => any) | undefined;
}>, {
    type: string;
    modelValue: string | number;
    placeholder: string | number;
    autofocus: boolean;
    inputStyles: Record<string, any>;
    readonly: boolean;
    disable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=textBar.d.ts.map