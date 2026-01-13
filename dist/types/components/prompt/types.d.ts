import type { CSSProperties } from "vue";
type PromptValidator = RegExp | ((val: string) => boolean | string);
export interface PromptProps {
    value?: boolean;
    text?: string;
    closable?: boolean;
    maskClosable?: boolean;
    title?: string;
    width?: string;
    okText?: string;
    cancleText?: string;
    loading?: boolean;
    styles?: CSSProperties;
    spec?: string;
    validator?: PromptValidator | null;
    msg?: string;
    placeholderText?: string;
    onOk?: (val: string) => void;
    onCancle?: () => void;
}
export type MergePromptOptions<T = PromptProps> = {
    [K in keyof T]: T[K];
} & {
    onRemove?: () => void;
    showCancle?: boolean;
    message?: string;
};
export type PromptInstance = {
    remove: () => void;
    info: (props: MergePromptOptions) => any;
};
export type DefaultPromptProps = {
    show: (options: MergePromptOptions) => any;
    remove: () => void;
} | null;
export {};
//# sourceMappingURL=types.d.ts.map