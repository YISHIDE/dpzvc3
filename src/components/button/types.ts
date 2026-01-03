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