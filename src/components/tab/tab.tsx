// src/components/tab/tab.tsx
import { defineComponent, ref, computed, watch, PropType } from 'vue'
import type { TabProps, TabItem } from './types'
import { RouterLink } from 'vue-router'

export type { TabProps }

const prefixCls = 'dpzvc3-tab'

export default defineComponent({
  name: 'Dpzvc3Tab',
  props: {
    items: { type: Array as PropType<TabItem[]>, default: () => [] },
    modelValue: { type: Boolean, default: true },
    index: { type: [Number, String], default: 0 },
    border: { type: Boolean, default: true },
    styles: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
  },
  setup(props) {
    const show = ref(props.modelValue)

    watch(() => props.modelValue, val => {
      show.value = val
    })

    const classes = computed(() => [prefixCls])
    const getStyles = computed(() => ({ ...props.styles }))

    const itemClass = (index: number) => {
      const _class = [`tab-item-${index}`]
      if (Number(props.index) === Number(index)) _class.push('cur')
      return _class
    }

    const getIconHtml = (index: number) => {
      const item = props.items[index]
      if (!item) return ''
      return Number(props.index) === Number(index) ? (item.iconCur || item.icon) : item.icon
    }

    return () => (
      show.value && (
        <div class={classes.value} style={getStyles.value}>
          <ul>
            {props.items?.map((item, idx) => {
              const isExternal = /^(http|https):\/\//i.test(item.path)
              const iconHtml = getIconHtml(idx)
              const cls = itemClass(idx)

              return (
                <li key={idx}>
                  {isExternal ? (
                    <a href={item.path} class={cls}>
                      <span innerHTML={iconHtml} />
                      <p>{item.name}</p>
                    </a>
                  ) : (
                    <RouterLink to={item.path} class={cls}>
                      <span innerHTML={iconHtml} />
                      <p>{item.name}</p>
                    </RouterLink>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )
    )
  }
})