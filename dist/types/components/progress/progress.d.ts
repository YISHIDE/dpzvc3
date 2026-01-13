import type { PropType, CSSProperties } from "vue";
import type { ProgressProps } from "./types";
export type { ProgressProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    styles: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    modelValue: {
        type: PropType<number | string>;
        default: number;
    };
    barHeight: {
        type: PropType<number | string>;
        default: number;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    styles: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    modelValue: {
        type: PropType<number | string>;
        default: number;
    };
    barHeight: {
        type: PropType<number | string>;
        default: number;
    };
}>> & Readonly<{}>, {
    modelValue: string | number;
    styles: CSSProperties;
    barHeight: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=progress.d.ts.map