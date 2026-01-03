// src/components/picker/types.ts
export interface PickerProps {
  type?: 'DatePicker' | 'AreaPicker' | 'NormalPicker'
  modelValue?: boolean
  /** AreaPicker */
  addressValue?: string
  styles?: Record<string, any>
  valueSeparator?: string
  /** DatePicker */
  year?: boolean | any[]
  month?: boolean | any[]
  day?: boolean | any[]
  dateValue?: string
  /** NormalPicker */
  list?: any[]
  initArr?: any[]
}