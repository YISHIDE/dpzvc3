import { PropType } from "vue";
import type { ButtonProps, ButtonEmits } from "./types";
export type { ButtonProps, ButtonEmits };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<ButtonProps["type"]>;
        default: string;
        validator: (val: string) => boolean;
    };
    styles: {
        type: PropType<ButtonProps["styles"]>;
        default: () => {};
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    radius: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: PropType<ButtonProps["border"]>;
        default: string;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    readonly click: (value: MouseEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<ButtonProps["type"]>;
        default: string;
        validator: (val: string) => boolean;
    };
    styles: {
        type: PropType<ButtonProps["styles"]>;
        default: () => {};
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    radius: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: PropType<ButtonProps["border"]>;
        default: string;
    };
}>> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    loading: boolean;
    circle: boolean;
    type: "success" | "loading" | "normal" | "warning" | "danger" | "text" | "primary" | undefined;
    styles: Record<string, any> | undefined;
    width: string;
    height: string;
    inline: boolean;
    border: "top" | "bottom" | "right" | "left" | "none" | "all" | undefined;
    disabled: boolean;
    radius: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=button.d.ts.map