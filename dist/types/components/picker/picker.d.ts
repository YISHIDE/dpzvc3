import { PropType } from "vue";
import type { PickerProps } from "./types";
export type { PickerProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<PickerProps["type"]>;
        default: string;
        validator: (val: string) => boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** AreaPicker props */
    addressValue: StringConstructor;
    styles: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    valueSeparator: {
        type: StringConstructor;
        default: string;
    };
    /** DatePicker props */
    dateValue: StringConstructor;
    year: {
        type: PropType<boolean | any[]>;
        default: boolean;
    };
    month: {
        type: PropType<boolean | any[]>;
        default: boolean;
    };
    day: {
        type: PropType<boolean | any[]>;
        default: boolean;
    };
    /** NormalPicker props */
    list: {
        type: PropType<any[]>;
        default: () => never[];
    };
    initArr: {
        type: PropType<any[]>;
        default: () => never[];
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "sure" | "cancle" | "normal-change")[], "update:modelValue" | "sure" | "cancle" | "normal-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<PickerProps["type"]>;
        default: string;
        validator: (val: string) => boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** AreaPicker props */
    addressValue: StringConstructor;
    styles: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    valueSeparator: {
        type: StringConstructor;
        default: string;
    };
    /** DatePicker props */
    dateValue: StringConstructor;
    year: {
        type: PropType<boolean | any[]>;
        default: boolean;
    };
    month: {
        type: PropType<boolean | any[]>;
        default: boolean;
    };
    day: {
        type: PropType<boolean | any[]>;
        default: boolean;
    };
    /** NormalPicker props */
    list: {
        type: PropType<any[]>;
        default: () => never[];
    };
    initArr: {
        type: PropType<any[]>;
        default: () => never[];
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSure?: ((...args: any[]) => any) | undefined;
    onCancle?: ((...args: any[]) => any) | undefined;
    "onNormal-change"?: ((...args: any[]) => any) | undefined;
}>, {
    type: "DatePicker" | "AreaPicker" | "NormalPicker" | undefined;
    modelValue: boolean;
    styles: Record<string, any>;
    list: any[];
    valueSeparator: string;
    year: boolean | any[];
    month: boolean | any[];
    day: boolean | any[];
    initArr: any[];
}, {}, {
    Popup: {
        new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            position: {
                type: PropType<import("../popup").PopupProps["position"]>;
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
                type: PropType<import("../popup").PopupProps["styles"]>;
                default: () => {};
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
        }>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            readonly "update:modelValue": (value: import("../popup").PopupProps["modelValue"]) => boolean;
        }, import("vue").PublicProps, {
            modelValue: boolean;
            position: "top" | "bottom" | "right" | "left" | undefined;
            styles: import("vue").CSSProperties | undefined;
            showMask: boolean;
            maskClosable: boolean;
            width: string | number;
        }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            position: {
                type: PropType<import("../popup").PopupProps["position"]>;
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
                type: PropType<import("../popup").PopupProps["styles"]>;
                default: () => {};
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
        }>, () => any, {}, {}, {}, {
            modelValue: boolean;
            position: "top" | "bottom" | "right" | "left" | undefined;
            styles: import("vue").CSSProperties | undefined;
            showMask: boolean;
            maskClosable: boolean;
            width: string | number;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        position: {
            type: PropType<import("../popup").PopupProps["position"]>;
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
            type: PropType<import("../popup").PopupProps["styles"]>;
            default: () => {};
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
    }>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        readonly "update:modelValue": (value: import("../popup").PopupProps["modelValue"]) => boolean;
    }, string, {
        modelValue: boolean;
        position: "top" | "bottom" | "right" | "left" | undefined;
        styles: import("vue").CSSProperties | undefined;
        showMask: boolean;
        maskClosable: boolean;
        width: string | number;
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
        install(app: import("vue").App): void;
    };
    AreaPicker: import("vue").DefineComponent<any, any, any>;
    DatePicker: import("vue").DefineComponent<any, any, any>;
    NormalPicker: import("vue").DefineComponent<any, any, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=picker.d.ts.map