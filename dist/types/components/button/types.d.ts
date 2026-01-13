export interface ButtonProps {
    type?: "success" | "loading" | "normal" | "primary" | "warning" | "danger" | "text";
    styles?: Record<string, any>;
    circle?: boolean;
    disabled?: boolean;
    inline?: boolean;
    width?: string;
    height?: string;
    loading?: boolean;
    radius?: boolean;
    border?: "all" | "top" | "bottom" | "left" | "right" | "none";
}
export declare const inputEmits: {
    readonly click: (value: MouseEvent) => void;
};
export type ButtonEmits = typeof inputEmits;
export type ButtonClassName = "dpzvc3-button" | "dpzvc3-button-btn" | "dpzvc3-button-circle" | "dpzvc3-button-inline" | "dpzvc3-button-success" | "dpzvc3-button-loading" | "dpzvc3-button-normal" | "dpzvc3-button-primary" | "dpzvc3-button-warning" | "dpzvc3-button-danger" | "dpzvc3-button-text" | "dpzvc3-button-disabled" | "dpzvc3-button-radius";
export type ButtonClassNameArray = ButtonClassName[];
//# sourceMappingURL=types.d.ts.map