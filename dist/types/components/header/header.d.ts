import { PropType } from "vue";
import type { HeaderProps } from "./types";
export type { HeaderProps };
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<boolean>;
        default: boolean;
    };
    fixed: {
        type: PropType<boolean>;
        default: boolean;
    };
    title: {
        type: PropType<string>;
        default: string;
    };
    wechat: {
        type: PropType<boolean>;
        default: boolean;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<boolean>;
        default: boolean;
    };
    fixed: {
        type: PropType<boolean>;
        default: boolean;
    };
    title: {
        type: PropType<string>;
        default: string;
    };
    wechat: {
        type: PropType<boolean>;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: boolean;
    fixed: boolean;
    title: string;
    wechat: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=header.d.ts.map