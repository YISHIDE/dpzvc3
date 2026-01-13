export interface CellProps {
    title?: string;
    value?: any;
    label?: string;
    link?: string;
    hasMask?: boolean;
}
export declare const inputEmits: {
    readonly touchstart: (value: TouchEvent) => void;
    readonly touchmove: (value: TouchEvent) => void;
    readonly touchend: (value: TouchEvent) => void;
    readonly click: (value: MouseEvent) => void;
};
export type CellEmits = typeof inputEmits;
export type CellClassName = "dpzvc3-cell" | "dpzvc3-cell-mask" | "dpzvc3-cell-left" | "dpzvc3-cell-right" | "dpzvc3-cell-main" | "dpzvc3-1px-top" | "dpzvc3-cell-main-title" | "dpzvc3-cell-main-value" | "dpzvc3-cell-main-label";
export type CellClassNameArray = CellClassName[];
//# sourceMappingURL=types.d.ts.map