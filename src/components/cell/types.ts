import { toValue } from "vue"

// src/components/cell/types.ts
export interface CellProps {
  title?: string
  value?: any
  label?: string
  link?: string
  hasMask?: boolean
}

// 事件 'touchstart', 'touchmove', 'touchend', 'click'
export const inputEmits = {
  touchstart: (value: TouchEvent) => {},
  touchmove: (value: TouchEvent) => { },
  touchend: (value: TouchEvent) => { },
  click: (value: MouseEvent) => { }
} as const

export type CellEmits = typeof inputEmits

// 类名
export type CellClassName = 'dpzvc3-cell' | 'dpzvc3-cell-mask' | 'dpzvc3-cell-left'
  | 'dpzvc3-cell-right' | 'dpzvc3-cell-main' | 'dpzvc3-1px-top'
  | 'dpzvc3-cell-main-title' | 'dpzvc3-cell-main-value' | 'dpzvc3-cell-main-label'
export type CellClassNameArray = CellClassName[]