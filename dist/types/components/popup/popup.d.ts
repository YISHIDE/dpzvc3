import { PropType } from "vue";
import type { CSSProperties } from "vue";
import type { PopupProps, PopupEmits } from "./types";
export type { PopupProps, PopupEmits };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: PropType<PopupProps["position"]>;
        default: string;
    };
    showMask: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<number | string>;
        default: string;
    };
    height: {
        type: PropType<number | string>;
    };
    styles: {
        type: PropType<PopupProps["styles"]>;
        default: () => {};
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    readonly "update:modelValue": (value: PopupProps["modelValue"]) => boolean;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: PropType<PopupProps["position"]>;
        default: string;
    };
    showMask: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<number | string>;
        default: string;
    };
    height: {
        type: PropType<number | string>;
    };
    styles: {
        type: PropType<PopupProps["styles"]>;
        default: () => {};
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
}>, {
    modelValue: boolean;
    position: "top" | "bottom" | "right" | "left" | undefined;
    styles: CSSProperties | undefined;
    showMask: boolean;
    maskClosable: boolean;
    width: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=popup.d.ts.map