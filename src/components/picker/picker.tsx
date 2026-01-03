// src/components/picker/picker.tsx
import { defineComponent, ref, computed, watch, provide, PropType } from 'vue'
import Popup from '../popup'
import AreaPicker from './area-picker/area-picker.vue'
import DatePicker from './date-picker/date-picker.vue'
import NormalPicker from './normal-picker/normal-picker.vue'
import type { PickerProps } from './types'

export type { PickerProps }

const prefixCls = 'dpzvc3-picker'
const LIST = ['DatePicker', 'AreaPicker', 'NormalPicker']

export default defineComponent({
  name: 'Dpzvc3Picker',
  components: { Popup, AreaPicker, DatePicker, NormalPicker },
  props: {
    type: {
      type: String as PropType<PickerProps['type']>,
      default: 'DatePicker',
      validator: (val: string) => LIST.includes(val)
    },
    modelValue: { type: Boolean, default: false },
    /** AreaPicker props */
    addressValue: String,
    styles: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    valueSeparator: { type: String, default: '/' },
    /** DatePicker props */
    dateValue: String,
    year: { type: [Boolean, Array] as PropType<boolean | any[]>, default: true },
    month: { type: [Boolean, Array] as PropType<boolean | any[]>, default: true },
    day: { type: [Boolean, Array] as PropType<boolean | any[]>, default: true },
    /** NormalPicker props */
    list: { type: Array as PropType<any[]>, default: () => [] },
    initArr: { type: Array as PropType<any[]>, default: () => [] }
  },
  emits: ['update:modelValue', 'sure', 'cancle', 'normal-change'],
  setup(props, { emit, slots }) {
    const visible = ref(props.modelValue)

    watch(() => props.modelValue, val => {
      visible.value = val
    })

    watch(visible, val => {
      emit('update:modelValue', val)
    })

    const wrapperClass = computed(() => [`${prefixCls}-wrapper`])
    const contentClass = computed(() => [`${prefixCls}-content`])

    const onOk = (val: any) => {
      emit('update:modelValue', false)
      emit('sure', val)
    }

    const onFail = () => {
      emit('update:modelValue', false)
      emit('cancle')
    }

    const onNormalChange = (val: any) => {
      emit('normal-change', val)
    }

    provide('DpzVc3Picker', {
      pickerOnOk: onOk,
      pickeronFail: onFail,
      pickerOnNormalChange: onNormalChange
    })

    return () => (
      <Popup v-model={visible.value} height="284px" position="bottom">
        <div class={wrapperClass.value}>
          <div class={contentClass.value}>
            {props.type === 'AreaPicker' && (
              <AreaPicker
                styles={props.styles}
                address-value={props.addressValue}
                value-separator={props.valueSeparator}
                onOk={onOk}
                onFail={onFail}
              />
            )}

            {props.type === 'DatePicker' && (
              <DatePicker
                year={props.year}
                month={props.month}
                day={props.day}
                date-value={props.dateValue}
                value-separator={props.valueSeparator}
                onOk={onOk}
                onFail={onFail}
              />
            )}

            {props.type === 'NormalPicker' && (
              <NormalPicker
                list={props.list}
                init-arr={props.initArr}
                onOk={onOk}
                onFail={onFail}
                onScroll={onNormalChange}
              />
            )}
          </div>
        </div>
      </Popup>
    )
  }
})