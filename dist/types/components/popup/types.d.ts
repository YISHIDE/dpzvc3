import type { CSSProperties } from "vue";
export interface PopupProps {
    modelValue?: boolean;
    position?: "top" | "bottom" | "right" | "left";
    showMask?: boolean;
    maskClosable?: boolean;
    width?: number | string;
    height?: number | string;
    styles?: CSSProperties;
}
export declare const inputEmits: {
    readonly "update:modelValue": (value: PopupProps["modelValue"]) => boolean;
};
export type PopupEmits = typeof inputEmits;
type PopupClassNamePosition = "top" | "bottom" | "right" | "left";
type PopupClassName = "dpzvc3-popup" | "dpzvc3-popup-mask" | "dpzvc3-popup-content" | `dpzvc3-popup-${PopupClassNamePosition}`;
export type PopupClassNameArray = PopupClassName[];
export {};
//# sourceMappingURL=types.d.ts.map