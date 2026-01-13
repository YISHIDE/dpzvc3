import { PropType } from "vue";
import type { TabProps, TabItem } from "./types";
export type { TabProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<TabItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    index: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    styles: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<TabItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    index: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    styles: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
}>> & Readonly<{}>, {
    modelValue: boolean;
    styles: Record<string, any>;
    border: boolean;
    items: TabItem[];
    index: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=tab.d.ts.map