export type ActionItem = {
    text: string;
    onClick?: (item: ActionItem, index: number) => void;
};
export interface ActionSheetProps {
    modelValue?: boolean;
    items?: ActionItem[];
    cancleText?: string;
}
export declare const inputEmits: {
    readonly "update:modelValue": (value: ActionSheetProps["modelValue"]) => boolean;
};
export type ActionSheetEmits = typeof inputEmits;
type ActionSheetClassName = "dpzvc3-actionSheet" | "dpzvc3-actionSheet-wrapper" | "dpzvc3-actionSheet-wrapper-action" | "dpzvc3-actionSheet-cancle";
export type ActionSheetClassNameArray = ActionSheetClassName[];
export {};
//# sourceMappingURL=types.d.ts.map