import type { CSSProperties } from 'vue'
export interface PopupProps {
  modelValue?: boolean
  position?: 'top' | 'bottom' | 'right' | 'left'
  showMask?: boolean
  maskClosable?: boolean
  width?: number | string
  height?: number | string
  styles?: CSSProperties
}
// 事件
export const inputEmits = {
  'update:modelValue': (value: PopupProps['modelValue']) => true,
} as const

export type PopupEmits = typeof inputEmits

// 类名
type PopupClassNamePosition = 'top' | 'bottom' | 'right' | 'left'
type PopupClassName = 'dpzvc3-popup' | 'dpzvc3-popup-mask' | 'dpzvc3-popup-content' | `dpzvc3-popup-${PopupClassNamePosition}`
export type PopupClassNameArray = PopupClassName[]