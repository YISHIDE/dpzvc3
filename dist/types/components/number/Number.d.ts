import { NumberEmits } from "./types";
export type { NumberProps } from "./types";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: (StringConstructor | NumberConstructor)[];
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    numberStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    containerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, NumberEmits[], NumberEmits, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: (StringConstructor | NumberConstructor)[];
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    numberStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    containerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onOn-input"?: ((...args: any[]) => any) | undefined;
}>, {
    max: string | number;
    width: number;
    height: number;
    min: string | number;
    step: number;
    numberStyle: Record<string, any>;
    containerStyle: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=Number.d.ts.map