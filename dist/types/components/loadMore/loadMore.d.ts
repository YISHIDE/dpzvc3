import type { PropType, CSSProperties } from "vue";
import type { LoadmoreProps, LoadmoreEmits, LoadmoreUpStatus, LoadmoreDownStatus } from "./types";
export type { LoadmoreProps, LoadmoreEmits };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    height: {
        type: PropType<number | string>;
        default: string;
    };
    refresh: PropType<LoadmoreProps["refresh"]>;
    upLoadingText: {
        type: StringConstructor;
        default: string;
    };
    upDistance: {
        type: NumberConstructor;
        default: number;
    };
    upPullText: {
        type: StringConstructor;
        default: string;
    };
    upDropText: {
        type: StringConstructor;
        default: string;
    };
    maxDistance: {
        type: NumberConstructor;
        default: number;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    downEndText: {
        type: StringConstructor;
        default: string;
    };
    downDropText: {
        type: StringConstructor;
        default: string;
    };
    downLoadingText: {
        type: StringConstructor;
        default: string;
    };
    downDistance: {
        type: NumberConstructor;
        default: number;
    };
    loadMore: PropType<LoadmoreProps["loadMore"]>;
    hasMore: {
        type: BooleanConstructor;
        default: boolean;
    };
    styles: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    auto: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFill: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    readonly "on-change-up-status": (value: LoadmoreUpStatus) => void;
    readonly "on-change-down-status": (value: LoadmoreDownStatus) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    height: {
        type: PropType<number | string>;
        default: string;
    };
    refresh: PropType<LoadmoreProps["refresh"]>;
    upLoadingText: {
        type: StringConstructor;
        default: string;
    };
    upDistance: {
        type: NumberConstructor;
        default: number;
    };
    upPullText: {
        type: StringConstructor;
        default: string;
    };
    upDropText: {
        type: StringConstructor;
        default: string;
    };
    maxDistance: {
        type: NumberConstructor;
        default: number;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    downEndText: {
        type: StringConstructor;
        default: string;
    };
    downDropText: {
        type: StringConstructor;
        default: string;
    };
    downLoadingText: {
        type: StringConstructor;
        default: string;
    };
    downDistance: {
        type: NumberConstructor;
        default: number;
    };
    loadMore: PropType<LoadmoreProps["loadMore"]>;
    hasMore: {
        type: BooleanConstructor;
        default: boolean;
    };
    styles: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    auto: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFill: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onOn-change-up-status"?: ((value: LoadmoreUpStatus) => any) | undefined;
    "onOn-change-down-status"?: ((value: LoadmoreDownStatus) => any) | undefined;
}>, {
    styles: CSSProperties;
    height: string | number;
    auto: boolean;
    speed: number;
    upLoadingText: string;
    upDistance: number;
    upPullText: string;
    upDropText: string;
    maxDistance: number;
    downEndText: string;
    downDropText: string;
    downLoadingText: string;
    downDistance: number;
    hasMore: boolean;
    autoFill: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=loadMore.d.ts.map