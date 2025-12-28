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
        v-if="year"
        :list="yearList"
        :init-item="date.year.code"
        target="year"
        @change="change"
      />
      <PickerSlot
        v-if="month"
        :list="monthList"
        :init-item="date.month.code"
        target="month"
        @change="change"
      />
      <PickerSlot
        v-if="day"
        :list="dayList"
        :init-item="date.day.code"
        target="day"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, inject } from 'vue'
import PickerSlot from '../picker-slot.vue'
import props from './props'

const DAYS = {
  30: [4, 6, 9, 11],
  31: [1, 3, 5, 7, 8, 10, 12]
}
const prefixCls = 'dpzvc3-date-picker'

export default defineComponent({
  name: 'DatePicker',
  components: { PickerSlot },
  props: {
    ...props,
    dateValue: String,
    year: [Boolean, Array],
    month: [Boolean, Array],
    day: [Boolean, Array],
    valueSeparator: { type: String, default: '-' }
  },
  setup (props, { emit }) {
    const { pickerOnOk, pickeronFail } = inject('DpzVc3Picker')
    const currentValue = ref(props.dateValue || '')

    const date = ref({
      year: { code: new Date().getFullYear(), value: String(new Date().getFullYear()), target: 'year', index: 0 },
      month: { code: new Date().getMonth() + 1, value: String(new Date().getMonth() + 1), target: 'month', index: 0 },
      day: { code: new Date().getDate(), value: String(new Date().getDate()), target: 'day', index: 0 },
      formatDate: ''
    })

    const classes = computed(() => [prefixCls])

    const yearList = computed(() => {
      if (!props.year) return []
      let from = 1900
      let to = new Date().getFullYear()
      if (Array.isArray(props.year)) {
        from = props.year[0] ?? from
        to = props.year[1] ?? to
      }
      const list = []
      for (let i = from, index = 0; i <= to; i++, index++) {
        list.push({ code: i, value: String(i), target: 'year', index })
      }
      return list
    })

    const monthList = computed(() => {
      if (!props.month) return []
      let from = 1
      let to = 12
      if (Array.isArray(props.month)) {
        from = props.month[0] ?? from
        to = props.month[1] ?? to
      }
      const list = []
      for (let i = from, index = 0; i <= to; i++, index++) {
        list.push({ code: i, value: String(i), target: 'month', index })
      }
      return list
    })

    const dayList = computed(() => {
      if (!props.day) return []
      let from = 1
      let to = 31

      const month = Number(date.value.month.value)
      const year = Number(date.value.year.code)

      if (DAYS[30].includes(month)) to = 30
      else if (DAYS[31].includes(month)) to = 31
      else {
        // 二月
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) to = 29
        else to = 28
      }

      if (Array.isArray(props.day)) {
        from = props.day[0] ?? from
        to = props.day[1] ?? to
      }

      const list = []
      for (let i = from, index = 0; i <= to; i++, index++) {
        list.push({ code: i, value: String(i), target: 'day', index })
      }
      return list
    })

    watch(() => props.dateValue, (val) => {
      currentValue.value = val
      initVal()
    }, { immediate: true })

    function initVal () {
      if (!currentValue.value) return
      const [y = '', m = '', d = ''] = currentValue.value.split(props.valueSeparator)
      if (props.year) date.value.year = { ...date.value.year, code: Number(y), value: y }
      if (props.month) date.value.month = { ...date.value.month, code: Number(m), value: m }
      if (props.day) date.value.day = { ...date.value.day, code: Number(d), value: d }
    }

    function cancle () {
      // emit('cancle')
      pickeronFail()
    }

    function sure () {
      date.value.formatDate = [date.value.year.value, date.value.month.value, date.value.day.value]
        .filter(Boolean)
        .join(props.valueSeparator)
      // emit('sure', date.value)
      pickerOnOk(date.value)
    }

    function change (target, current) {
      if (target === 'year') date.value.year = { ...date.value.year, ...current }
      if (target === 'month') date.value.month = { ...date.value.month, ...current }
      if (target === 'day') date.value.day = { ...date.value.day, ...current }

      date.value.formatDate = [date.value.year.value, date.value.month.value, date.value.day.value]
        .filter(Boolean)
        .join(props.valueSeparator)

      emit('change', target, current)
    }

    return {
      classes,
      date,
      yearList,
      monthList,
      dayList,
      cancle,
      sure,
      change
    }
  }
})
</script>

<style lang="less">

</style>
