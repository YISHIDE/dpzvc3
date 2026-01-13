export type ModalProps = {
    modelValue?: boolean;
    maskClosable?: boolean;
    title?: string;
    width?: string;
    okText?: string;
    cancleText?: string;
    loading?: boolean;
    styles?: Record<string, any>;
    showHead?: boolean;
    footerHide?: boolean;
    body?: string;
};
export type MergeOptions<T = ModalProps> = {
    [K in keyof T]: T[K];
} & {
    onOk?: () => void;
    onCancle?: () => void;
    onRemove?: () => void;
    showCancle?: boolean;
    buttonLoading?: boolean;
};
export type ModalInstance = {
    confirm: (options: MergeOptions) => DefaultProps;
    remove: () => void;
    info: (props: MergeOptions) => DefaultProps;
};
export type DefaultProps = {
    show: (options: MergeOptions) => any;
    remove: () => void;
    component: MergeOptions;
} | null;
//# sourceMappingURL=types.d.ts.map