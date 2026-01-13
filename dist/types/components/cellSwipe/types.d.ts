export interface CellSwipeAction {
    content?: string;
    style?: Record<string, string>;
    handleClick?: () => void;
}
export interface CellSwipeProps {
    title?: string;
    value?: any;
    label?: string;
    link?: string;
    hasMask?: boolean;
    left?: CellSwipeAction[];
    right?: CellSwipeAction[];
}
//# sourceMappingURL=types.d.ts.map