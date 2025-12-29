<template>
  <div>
    <Popup
      v-model="visible"
      position="bottom"
      :styles="{ background: 'transparent' }"
    >
      <div :class="classes">
        <ul :class="wrapperClasses">
          <li
            v-for="(item, key) in actions"
            :key="key"
            :class="wrapperActionClass"
            @click="emit(item, key)"
          >
            <span>{{ item.text }}</span>
          </li>
        </ul>
        <a
          v-if="cancleText"
          href="javascript:;"
          :class="cancleClass"
          @click="visible = false"
        >{{ cancleText }}</a>
      </div>
    </Popup>
  </div>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue'
import Popup from '../popup'

const prefixCls = 'dpzvc3-actionSheet'

export default defineComponent({
  name: 'ActionSheet',
  components: { Popup },
  props: {
    modelValue: { // Vue 3 v-model 默认绑定 modelValue
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    cancleText: {
      type: String,
      default: '取消'
    }
  },
  setup (props, { emit }) {
    // 内部状态
    const visible = ref(props.modelValue)
    const actions = ref(props.items)

    // 同步 props.modelValue
    watch(() => props.modelValue, (val) => {
      visible.value = val
    })

    // 监听 visible 改变，通知父组件
    // watch(visible, (val) => {
    //   emit('update:modelValue', val)
    // })

    // 样式类
    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])
    const wrapperActionClass = computed(() => [`${prefixCls}-wrapper-action`])
    const cancleClass = computed(() => [`${prefixCls}-cancle`])

    // 点击事件
    const emitAction = (item, index) => {
      if (item.onClick && typeof item.onClick === 'function') {
        item.onClick(item, index)
      }
      // visible.value = false
      emit('update:modelValue', false)
    }

    return {
      visible,
      actions,
      classes,
      wrapperClasses,
      wrapperActionClass,
      cancleClass,
      emit: emitAction
    }
  }
})
</script>
