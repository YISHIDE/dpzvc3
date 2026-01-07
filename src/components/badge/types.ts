// src/components/badge/types.ts
export type BadgeProps = {
  type?: 'normal' | 'danger' | 'warning' | 'success'
  size?: 'small' | 'normal' | 'large'
  dot?: boolean
  max?: number | string
  number?: number | string
}

// 类名
export type BadgeClassName = 'dpzvc3-badge' | 'dpzvc3-badge-dot' | 'dpzvc3-badge-number' | 'dpzvc3-badge-normal' |
  'dpzvc3-badge-danger' | 'dpzvc3-badge-warning' | 'dpzvc3-badge-success' | 'dpzvc3-badge-small' | 'dpzvc3-badge-large'
  | 'dpzvc3-badge-size-small' | 'dpzvc3-badge-size-normal' | 'dpzvc3-badge-size-large'
export type BadgeClassNameArray = BadgeClassName[] 