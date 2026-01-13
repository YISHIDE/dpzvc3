import type { CellProps, CellEmits } from "./types";
export type { CellProps, CellEmits };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    value: null;
    label: StringConstructor;
    link: StringConstructor;
    hasMask: BooleanConstructor;
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    readonly touchstart: (value: TouchEvent) => void;
    readonly touchmove: (value: TouchEvent) => void;
    readonly touchend: (value: TouchEvent) => void;
    readonly click: (value: MouseEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    value: null;
    label: StringConstructor;
    link: StringConstructor;
    hasMask: BooleanConstructor;
}>> & Readonly<{
    onTouchstart?: ((value: TouchEvent) => any) | undefined;
    onTouchmove?: ((value: TouchEvent) => any) | undefined;
    onTouchend?: ((value: TouchEvent) => any) | undefined;
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    hasMask: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=cell.d.ts.map