<template>
  <div
    v-show="show"
    :class="classes"
    :style="getStyles"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <!-- 外部链接 -->
        <template v-if="/(http|https)/i.test(item.path)">
          <a
            :href="item.path"
            :class="itemClass(index)"
          >
            <span v-html="getIconHtml(index)" />
            <p>{{ item.name }}</p>
          </a>
        </template>

        <!-- 内部路由 -->
        <template v-else>
          <router-link
            :to="item.path"
            :class="itemClass(index)"
          >
            <slot name="item">
              <span v-html="getIconHtml(index)" />
              <p>{{ item.name }}</p>
            </slot>
          </router-link>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'

const prefixCls = 'dpzvc3-tab'

export default defineComponent({
  name: 'Dpzvc3Tab',
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: Boolean, default: true },
    index: { type: [Number, String], default: 0 },
    border: { type: Boolean, default: true },
    styles: { type: Object, default: () => ({}) }
  },
  setup (props) {
    // 控制显示
    const show = ref(props.modelValue)

    watch(() => props.modelValue, (val) => {
      show.value = val
    })

    // 计算类名和样式
    const classes = computed(() => [prefixCls])
    const getStyles = computed(() => ({ ...props.styles }))

    // tab item 样式
    const itemClass = (index) => {
      const _class = [`tab-item-${index}`]
      if (Number(props.index) === Number(index)) _class.push('cur')
      return _class
    }

    // icon 显示
    const getIconHtml = (index) => {
      const item = props.items[index]
      if (!item) return ''
      return Number(props.index) === Number(index) ? (item.iconCur || item.icon) : item.icon
    }

    return {
      show,
      classes,
      getStyles,
      itemClass,
      getIconHtml
    }
  }
})
</script>
