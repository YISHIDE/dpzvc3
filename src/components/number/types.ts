// Number/types.ts
export interface NumberProps {
  modelValue?: number | string
  min?: number | string
  max?: number | string
  step?: number
  width?: number
  height?: number
  numberStyle?: Record<string, any>
  containerStyle?: Record<string, any>
}

export type NumberEmits = 'update:modelValue' | 'input' | 'on-input'