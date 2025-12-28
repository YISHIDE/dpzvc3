<template>
  <div :class="classes">
    <div class="header">
      <div
        class="left"
        @click="cancle"
      >
        取消
      </div>
      <div
        class="right"
        @click="sure"
      >
        确定
      </div>
    </div>
    <div class="main">
      <PickerSlot
        v-for="(item, key) in shadowList"
        :key="item.target"
        :target="item.target"
        :init-item="initItems[key]"
        :list="item.list"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, inject } from 'vue'
import PickerSlot from '../picker-slot.vue'

const prefixCls = 'dpzvc3-normal-picker'

export default defineComponent({
  name: 'NormalPicker',
  components: { PickerSlot },
  props: {
    list: { type: Array, default: () => [] },
    initArr: { type: Array, default: () => [] }
  },
  setup (props, { emit }) {
    const { pickerOnOk, pickeronFail } = inject('DpzVc3Picker')

    /** 初始化选中项 */
    const initItems = ref(
      props.initArr.length
        ? [...props.initArr]
        : props.list.map(item => item.list?.[0]?.code ?? '')
    )

    const normal = ref({})

    /**
     * ⚠️ 关键修复点：
     * - 不修改 props.list
     * - 返回全新对象
     */
    const shadowList = computed(() => {
      return props.list.map(item => {
        const list = (item.list || []).map((child, index) => ({
          code: child.code ?? child.value,
          value: child.value,
          target: child.target ?? item.target,
          index
        }))

        return {
          ...item,
          list
        }
      })
    })

    const classes = computed(() => [prefixCls])

    watch(
      () => props.initArr,
      val => {
        initItems.value =
          val.length > 0
            ? [...val]
            : props.list.map(item => item.list?.[0]?.code ?? '')
      }
    )

    function cancle () {
      pickeronFail()
    }

    function sure () {
      pickerOnOk(normal.value)
    }

    function change (target, current) {
      const index = shadowList.value.findIndex(i => i.target === target)
      if (index !== -1) {
        initItems.value[index] = current.code
      }

      normal.value = {
        ...normal.value,
        [target]: current
      }

      emit('scroll', current)
    }

    return {
      classes,
      shadowList,
      initItems,
      cancle,
      sure,
      change
    }
  }
})
</script>
