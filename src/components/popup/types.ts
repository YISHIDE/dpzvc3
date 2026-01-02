export type PopupProps = {
  modelValue?: boolean
  position?: 'top' | 'bottom' | 'right' | 'left'
  showMask?: boolean
  maskClosable?: boolean
  width?: number | string
  height?: number | string
  styles?: Record<string, string | number>
}