import React from 'react';
import '@dpzvc3/styles/dist/components/cell.css'
import "@dpzvc3/styles/dist/utils/1px.css"

export interface CellProps {
    children: React.ReactNode;
    title: string;
    value?: string | number;
    label?: string;
    link?: string;
    hasMask?: boolean;
}
const Cell: React.FC<CellProps>  =({ children, title, label, value }) => { 
    return (
        <div className={'dpzvc3-cell'}>
            <div className={'dpzvc3-cell-left'}></div>
            <div className='dpzvc3-cell-main dpzvc3-1px-top'>
                <div className='dpzvc3-cell-main-title'>
                     <span>{title}</span>
                     <span className='dpzvc3-cell-main-label'>{label}</span>
                </div>
                <div className='dpzvc3-cell-main-value'><span>{value}</span></div>
            </div>
            <div className='dpzvc3-cell-right'></div>
        </div>
    )
}
export default Cell;