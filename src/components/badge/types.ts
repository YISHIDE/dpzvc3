// src/components/badge/types.ts
export type BadgeProps = {
  type?: 'normal' | 'danger' | 'warning' | 'success'
  size?: 'small' | 'normal' | 'large'
  dot?: boolean
  max?: number | string
  number?: number | string
}