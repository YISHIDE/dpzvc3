import React from 'react';
import { useNavigate } from 'react-router-dom'
import '@dpzvc3/styles/dist/components/cell.css'
import "@dpzvc3/styles/dist/utils/1px.css"
import type { CellProps } from './types';

const Cell: React.FC<CellProps>  =({ children, title, label, value, link, hasMask }) => { 
    const navigate = useNavigate()
    const handleClick = () => {
        if (link) navigate(link)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!link) return
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigate(link)
        }
    }

    return (
        <div
            className='dpzvc3-cell'
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={link ? 'button' : undefined}
            tabIndex={link ? 0 : undefined}
            style={link ? { cursor: 'pointer' } as React.CSSProperties : undefined}
        >
            {hasMask && <span className='dpzvc3-cell-mask' />}
            <div className='dpzvc3-cell-left'></div>
            <div className='dpzvc3-cell-main dpzvc3-1px-top'>
                <div className='dpzvc3-cell-main-title'>
                     <span>{title}</span>
                     <span className='dpzvc3-cell-main-label'>{label}</span>
                </div>
                <div className='dpzvc3-cell-main-value'><span>{value}</span></div>
            </div>
            <div className='dpzvc3-cell-right'>{children}</div>
        </div>
    )
}
export default Cell;