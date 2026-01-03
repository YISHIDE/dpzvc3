
export interface IndicatorProps {
  modelValue?: boolean
  color?: string
  type?: 'snake' | 'blade' | 'fading-circle' | 'double-bounce'
  size?: number | string
  text?: string
}
type IndicatorType = 'snake' | 'blade' | 'circle' | 'bounce'
export type IndicatorInstance = {
    [k in IndicatorType]: (options: IndicatorProps) => any
} & {
    open: (options: IndicatorProps) => any,
    remove: () => void,
}