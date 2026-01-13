import { PropType } from "vue";
import type { RaterProps } from "./types";
export type { RaterProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<number>;
        default: number;
    };
    distance: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    size: {
        type: PropType<number>;
        default: number;
    };
    star: {
        type: PropType<string>;
        default: string;
    };
    defaultColor: {
        type: PropType<string>;
        default: string;
    };
    activeColor: {
        type: PropType<string>;
        default: string;
    };
    disabled: {
        type: PropType<boolean>;
        default: boolean;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<number>;
        default: number;
    };
    distance: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    size: {
        type: PropType<number>;
        default: number;
    };
    star: {
        type: PropType<string>;
        default: string;
    };
    defaultColor: {
        type: PropType<string>;
        default: string;
    };
    activeColor: {
        type: PropType<string>;
        default: string;
    };
    disabled: {
        type: PropType<boolean>;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    size: number;
    max: number;
    modelValue: number;
    disabled: boolean;
    distance: number;
    star: string;
    defaultColor: string;
    activeColor: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=raters.d.ts.map