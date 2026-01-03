// src/components/textBar/types.ts
export interface TextBarProps {
  modelValue?: string | number
  type?: string
  placeholder?: string | number
  rows?: number
  autofocus?: boolean
  inputStyles?: Record<string, any>
  maxlength?: number
  name?: string
  readonly?: boolean
  disable?: boolean
}