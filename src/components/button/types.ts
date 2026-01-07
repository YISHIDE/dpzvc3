// src/components/button/types.ts
export interface ButtonProps {
  type?: 'success' | 'loading' | 'normal' | 'primary' | 'warning' | 'danger' | 'text'
  styles?: Record<string, any>
  circle?: boolean
  disabled?: boolean
  inline?: boolean
  width?: string
  height?: string
  loading?: boolean
  radius?: boolean
  border?: 'all' | 'top' | 'bottom' | 'left' | 'right' | 'none'
}

// 事件
// export interface ButtonEmits {
//   click: (event: MouseEvent) => true
// }

export const inputEmits = {
  click: (value: MouseEvent) => {},
} as const

export type ButtonEmits = typeof inputEmits

// 类名
export type ButtonClassName = 'dpzvc3-button' | 'dpzvc3-button-btn' | 'dpzvc3-button-circle' | 'dpzvc3-button-inline' | 'dpzvc3-button-success' | 'dpzvc3-button-loading' | 'dpzvc3-button-normal' | 'dpzvc3-button-primary' | 'dpzvc3-button-warning' | 'dpzvc3-button-danger' | 'dpzvc3-button-text' | 'dpzvc3-button-disabled' | 'dpzvc3-button-radius'
export type ButtonClassNameArray = ButtonClassName[]