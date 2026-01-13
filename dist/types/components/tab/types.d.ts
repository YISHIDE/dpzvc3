export interface TabItem {
    name: string;
    path: string;
    icon?: string;
    iconCur?: string;
}
export interface TabProps {
    items?: TabItem[];
    modelValue?: boolean;
    index?: number | string;
    border?: boolean;
    styles?: Record<string, any>;
}
//# sourceMappingURL=types.d.ts.map