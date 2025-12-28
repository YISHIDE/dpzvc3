<template>
  <Popup
    v-model="visible"
    height="284px"
    position="bottom"
  >
    <div :class="wrapperClass">
      <div :class="contentClass">
        <AreaPicker
          v-if="type === 'AreaPicker'"
          :styles="styles"
          :value-separator="valueSeparator"
          :address-value="addressValue"
          @ok="onOk"
          @fail="onFail"
        />

        <DatePicker
          v-if="type === 'DatePicker'"
          :year="year"
          :month="month"
          :day="day"
          :value-separator="valueSeparator"
          :date-value="dateValue"
          @ok="onOk"
          @fail="onFail"
        />

        <NormalPicker
          v-if="type === 'NormalPicker'"
          :list="list"
          :init-arr="initArr"
          @ok="onOk"
          @fail="onFail"
          @scroll="onNormalChange"
        />
      </div>
    </div>
  </Popup>
</template>

<script>
import { defineComponent, ref, watch, computed, provide } from 'vue'
import Popup from '../popup'
import AreaPicker from './area-picker/area-picker.vue'
import DatePicker from './date-picker/date-picker.vue'
import NormalPicker from './normal-picker/normal-picker.vue'
import areaProps from './area-picker/props'
import dateProps from './date-picker/props'
import normalProps from './normal-picker/props'

const LIST = ['DatePicker', 'AreaPicker', 'NormalPicker']
const prefixCls = 'dpzvc3-picker'

export default defineComponent({
  name: 'Dpzvc3Picker',
  components: { Popup, AreaPicker, DatePicker, NormalPicker },
  mixins: [areaProps, dateProps, normalProps],
  props: {
    type: {
      type: String,
      default: 'DatePicker',
      validator: (val) => LIST.includes(val)
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'sure', 'cancle', 'normal-change'],
  setup (props, { emit }) {
    const visible = ref(props.value)
    watch(() => props.modelValue, (val) => {
      visible.value = val
    })

    watch(visible, (val) => {
      emit('update:value', val)
    })
    const wrapperClass = computed(() => [`${prefixCls}-wrapper`])
    const contentClass = computed(() => [`${prefixCls}-content`])

    const onOk = (val) => {
      emit('update:modelValue', false)
      emit('sure', val)
    }

    const onFail = () => {
      emit('update:modelValue', false)
      emit('cancle')
    }

    const onNormalChange = (val) => {
      emit('normal-change', val)
    }
    provide('DpzVc3Picker', {
      pickerOnOk: onOk,
      pickeronFail: onFail,
      pickerOnNormalChange: onNormalChange
    })
    return {
      visible,
      wrapperClass,
      contentClass,
      onOk,
      onFail,
      onNormalChange
    }
  }
})
</script>
