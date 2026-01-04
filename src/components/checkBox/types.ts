// src/components/checkbox-group/types.ts

// import checkboxGroup from "./checkbox-group"
// checkbox.types.ts
import type { Ref } from 'vue'

export type CheckBoxLabel = string | number | boolean

export interface CheckBoxProps {
  modelValue?: boolean
  label?: CheckBoxLabel
  disable?: boolean
}

export interface CheckBoxGroupInject {
  currentValue: Ref<Array<string | number>>
  toggleOption: (value: Array<string | number>) => void
  single?: boolean
}

// checkboxGroup.types.ts
export type CheckBoxGroupValue = Array<string | number>

export interface CheckBoxGroupProps {
  modelValue?: CheckBoxGroupValue
  single?: boolean
  vertical?: boolean
}

export interface CheckBoxGroupExpose {
  toggleOption: (value: CheckBoxGroupValue) => void
}