import { PropType } from "vue";
import type { BadgeProps } from "./types";
export type { BadgeProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<BadgeProps["type"]>;
        default: string;
    };
    size: {
        type: PropType<BadgeProps["size"]>;
        default: string;
    };
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    number: {
        type: (StringConstructor | NumberConstructor)[];
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<BadgeProps["type"]>;
        default: string;
    };
    size: {
        type: PropType<BadgeProps["size"]>;
        default: string;
    };
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    number: {
        type: (StringConstructor | NumberConstructor)[];
    };
}>> & Readonly<{}>, {
    type: "success" | "normal" | "warning" | "danger" | undefined;
    size: "normal" | "small" | "large" | undefined;
    dot: boolean;
    max: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=badge.d.ts.map