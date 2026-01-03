// src/components/spinner/spinner.tsx
import { defineComponent, computed, PropType } from 'vue'
// import type { DefineComponent } from 'vue'
import SpinnerBlade from './behavior/blade.vue'
import SpinnerSnake from './behavior/snake.vue'
import SpinnerDoubleBounce from './behavior/double-bounce.vue'
import SpinnerTripleBounce from './behavior/triple-bounce.vue'
import SpinnerFadingCircle from './behavior/fading-circle.vue'

import type { SpinnerProps, SpinnerType } from './types'
export type { SpinnerProps }

const SPINNERS = [
  'blade',
  'snake',
  'double-bounce',
  'triple-bounce',
  'fading-circle'
] as const

const SPINNER_MAP = {
  blade: SpinnerBlade,
  snake: SpinnerSnake,
  'double-bounce': SpinnerDoubleBounce,
  'triple-bounce': SpinnerTripleBounce,
  'fading-circle': SpinnerFadingCircle
} as const

function parseSpinner(type: SpinnerType | number): keyof typeof SPINNER_MAP {
  let value: string | number = type ?? 0

  // 数字类型（索引）
  if (typeof value === 'number' || /^\d+$/.test(String(value))) {
    const index = Number(value)
    if (index >= SPINNERS.length) {
      console.warn(`'${value}' spinner not found, use the default spinner.`)
      return SPINNERS[0]
    }
    return SPINNERS[index]
  }

  // 字符串类型
  if (!SPINNERS.includes(value as any)) {
    console.warn(`'${value}' spinner not found, use the default spinner.`)
    return SPINNERS[0]
  }

  return value as keyof typeof SPINNER_MAP
}
// type Compute<T> = { [K in keyof T]: Compute<T[K]> }; // 将类型展开方便提示
export default defineComponent({
  name: 'Dpzvc3Spinner',

  props: {
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 30
    },
    type: {
      type: [String, Number] as PropType<SpinnerType | number>,
      default: 'snake'
    },
    color: {
      type: String as PropType<string>,
      default: '#39f'
    }
  },

  setup(props) {
    const SpinnerComponent = computed(() => {
      const key = parseSpinner(props.type)
      return SPINNER_MAP[key]
    })
    return () => {
      const Comp = SpinnerComponent.value as any
      return (
        <Comp
          size={props.size}
          type={props.type}
          color={props.color}
        />
      )
    }
  }
})