import type React from 'react';
export interface CellProps {
    children?: React.ReactNode;
    title: string;
    value?: string | number;
    label?: string;
    link?: string;
    hasMask?: boolean;
}