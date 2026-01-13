import type { ComponentPublicInstance } from "vue";
export interface MessageProps {
    name?: string | number;
    text?: string | number;
    duration?: number;
    showLeft?: boolean;
    rightHide?: boolean;
    type?: "success" | "loading" | "error" | "normal" | "warning" | "danger";
    position?: "top" | "bottom";
    onClose?: () => void;
}
export type MergeMessageOptions<T = MessageProps> = {
    [K in keyof T]: T[K];
} & {
    loading?: boolean;
    styles?: Record<string, any>;
};
export type MessageInstance = {
    show: (options: MergeMessageOptions) => any;
    success: (options: MergeMessageOptions) => any;
    error: (options: MergeMessageOptions) => any;
    loading: (options: MergeMessageOptions) => any;
    destroy: () => void;
};
export type MgInstance = {
    add: (options: any) => void;
    remove: (name: string | number) => void;
    closeAll: () => void;
    component: ComponentPublicInstance;
    destroy: () => void;
} | null;
//# sourceMappingURL=types.d.ts.map