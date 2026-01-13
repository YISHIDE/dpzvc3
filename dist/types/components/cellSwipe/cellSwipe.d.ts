import type { CellSwipeProps, CellSwipeAction } from "./types";
export type { CellSwipeProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    value: null;
    label: StringConstructor;
    link: StringConstructor;
    hasMask: BooleanConstructor;
    left: {
        type: () => CellSwipeAction[];
        default: () => never[];
    };
    right: {
        type: () => CellSwipeAction[];
        default: () => never[];
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    value: null;
    label: StringConstructor;
    link: StringConstructor;
    hasMask: BooleanConstructor;
    left: {
        type: () => CellSwipeAction[];
        default: () => never[];
    };
    right: {
        type: () => CellSwipeAction[];
        default: () => never[];
    };
}>> & Readonly<{}>, {
    right: CellSwipeAction[];
    left: CellSwipeAction[];
    hasMask: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=cellSwipe.d.ts.map