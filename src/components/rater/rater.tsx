// src/components/rater/rater.tsx
import { defineComponent, ref, watch, computed, PropType } from 'vue'

import type { RaterProps } from './types'
export type { RaterProps } 
const prefixCls = 'dpzvc3-rater'

export default defineComponent({
  name: 'Dpzvc3Rater',
  props: {
    modelValue: { type: Number as PropType<number>, default: -1 },
    distance: { type: Number as PropType<number>, default: 10 },
    max: { type: Number as PropType<number>, default: 5 },
    size: { type: Number as PropType<number>, default: 18 },
    star: { type: String as PropType<string>, default: '★' },
    defaultColor: { type: String as PropType<string>, default: '#ccc' },
    activeColor: { type: String as PropType<string>, default: '#f5a623' },
    disabled: { type: Boolean as PropType<boolean>, default: false }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const currentValue = ref(props.modelValue)

    // 监听外部 v-model
    watch(() => props.modelValue, val => {
      currentValue.value = val
    })

    const classes = computed(() => [prefixCls])
    const starClass = computed(() => [`${prefixCls}-star`])

    // 点击选中星星
    const changeValue = (index: number) => {
      if (props.disabled) return
      currentValue.value = index + 1
      emit('update:modelValue', currentValue.value)
    }

    // 外层星星样式
    const parentStyles = (index: number) => {
      const style: Record<string, string> = {
        fontSize: `${props.size}px`,
        marginRight: index + 1 < props.max ? `${props.distance}px` : '0px',
        color: props.defaultColor!
      }
      return style
    }

    // 内层覆盖星样式（显示激活颜色和半星）
    const childStyles = (index: number) => {
      const style: Record<string, string> = {
        fontSize: `${props.size}px`,
        marginRight: index + 1 < props.max ? `${props.distance}px` : '0px'
      }

      const valueArr = String(currentValue.value).split('.')
      if (index + 1 <= Number(valueArr[0])) {
        style.color = props.activeColor!
      }

      if (valueArr.length > 1 && Number(valueArr[1]) >= 5 && index + 1 === Number(valueArr[0]) + 1) {
        style.width = '50%'
        style.color = props.activeColor!
      }

      return style
    }

    return () => (
      <div class={classes.value}>
        {Array.from({ length: props.max }, (_, index) => (
          <span class={starClass.value} style={parentStyles(index)} key={index}>
            {props.star}
            <span style={childStyles(index)} onClick={() => changeValue(index)}>
              {props.star}
            </span>
          </span>
        ))}
      </div>
    )
  }
})
// src/components/rater/rater.tsx
// src/components/rater/rater.tsx


// import { defineComponent, ref, watch, computed, PropType } from 'vue'
// import type { RaterProps } from './types'
// export type { RaterProps } 
// const prefixCls = 'dpzvc3-rater'

// export default defineComponent({
//   name: 'Dpzvc3Rater',

//   props: {
//     modelValue: { type: Number as PropType<number>, default: -1 },
//     distance: { type: Number as PropType<number>, default: 10 },
//     max: { type: Number as PropType<number>, default: 5 },
//     size: { type: Number as PropType<number>, default: 18 },
//     star: { type: String as PropType<string>, default: '★' },
//     defaultColor: { type: String as PropType<string>, default: '#ccc' },
//     activeColor: { type: String as PropType<string>, default: '#f5a623' },
//     disabled: { type: Boolean as PropType<boolean>, default: false }
//   },

//   emits: ['update:modelValue'],

//   setup(props, { emit }) {
//     const currentValue = ref(props.modelValue)

//     watch(() => props.modelValue, v => {
//       currentValue.value = v
//     })

//     const classes = computed(() => [prefixCls])
//     const starClass = `${prefixCls}-star`

//     /** ⭐️ 关键：提前算好 stars 数组 */
//     const stars = computed(() => {
//       return Array.from({ length: props.max }).map((_, index) => {
//         const baseStyle: Record<string, string> = {
//           fontSize: `${props.size}px`,
//           marginRight: index + 1 < props.max ? `${props.distance}px` : '0px',
//           color: props.defaultColor
//         }

//         const activeStyle: Record<string, string> = {
//           fontSize: `${props.size}px`,
//           marginRight: baseStyle.marginRight
//         }

//         const [int, decimal] = String(currentValue.value).split('.')

//         if (index + 1 <= Number(int)) {
//           activeStyle.color = props.activeColor
//         }

//         if (
//           decimal &&
//           Number(decimal) >= 5 &&
//           index + 1 === Number(int) + 1
//         ) {
//           activeStyle.width = '50%'
//           activeStyle.color = props.activeColor
//         }

//         return {
//           index,
//           baseStyle,
//           activeStyle
//         }
//       })
//     })

//     const onClickStar = (index: number) => {
//       if (props.disabled) return
//       const value = index + 1
//       currentValue.value = value
//       emit('update:modelValue', value)
//     }

//     /** ✅ render 里只“消费数据”，不计算 */
//     return () => (
//       <div class={classes.value}>
//         {stars.value.map(item => (
//           <span
//             key={item.index}
//             class={starClass}
//             style={item.baseStyle}
//           >
//             {props.star}
//             <span
//               style={item.activeStyle}
//               onClick={() => onClickStar(item.index)}
//             >
//               {props.star}
//             </span>
//           </span>
//         ))}
//       </div>
//     )
//   }
// })