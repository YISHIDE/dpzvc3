import { PropType } from "vue";
import type { SwipeItem, SwipeProps } from "./types";
export type { SwipeProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    auto: {
        type: BooleanConstructor;
        default: boolean;
    };
    list: {
        type: PropType<SwipeItem[]>;
        default: () => never[];
    };
    startIndex: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: PropType<number | string>;
        default: string;
    };
    dots: {
        type: PropType<"top" | "bottom">;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    distanceIndex: {
        type: NumberConstructor;
        default: number;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    perpage: {
        type: NumberConstructor;
        default: number;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    auto: {
        type: BooleanConstructor;
        default: boolean;
    };
    list: {
        type: PropType<SwipeItem[]>;
        default: () => never[];
    };
    startIndex: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: PropType<number | string>;
        default: string;
    };
    dots: {
        type: PropType<"top" | "bottom">;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    distanceIndex: {
        type: NumberConstructor;
        default: number;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    perpage: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    height: string | number;
    auto: boolean;
    multiple: boolean;
    list: SwipeItem[];
    startIndex: number;
    dots: "top" | "bottom";
    distanceIndex: number;
    loop: boolean;
    speed: number;
    perpage: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=swipe.d.ts.map