// src/components/radio-group/types.ts
import type { Ref } from 'vue'

type RadioValue = string | number | boolean

export interface RadioGroupProps {
  modelValue?: RadioValue
  vertical?: boolean
}

export interface RadioGroupProvide {
  currentValue: Ref<RadioValue>
  change: (val: RadioValue) => void
}


type RadioBoxValue = string | number


export interface RadioBoxProps {
    label: RadioBoxValue
    modelValue?: boolean
    disable?: boolean
}