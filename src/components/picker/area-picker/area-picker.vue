<template>
  <div :class="classes">
    <div class="header">
      <div
        class="left"
        @click="cancle"
      >
        取消
      </div>
      <div class="title">
        请选择区域
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
        :list="provinces"
        :init-item="province.code"
        target="province"
        @change="change"
      />
      <PickerSlot
        :list="citys"
        :init-item="city.code"
        target="city"
        @change="change"
      />
      <PickerSlot
        :list="districts"
        :init-item="district.code"
        target="district"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, inject } from 'vue'
import CHINA_AREA from 'china-area-data'
import PickerSlot from '../picker-slot'
import props from './props'

const prefixCls = 'dpzvc3-picker'
const rootCode = '86'

export default defineComponent({
  name: 'AreaPicker',
  components: { PickerSlot },
  props: {
    ...props,
    addressValue: String,
    valueSeparator: {
      type: String,
      default: '-'
    }
  },
  setup (props, { emit }) {
    const { pickerOnOk, pickeronFail } = inject('DpzVc3Picker')
    const currentValue = ref(props.addressValue || '')

    const province = ref({
      value: '北京市',
      code: '110000',
      target: 'province',
      index: 0
    })

    const city = ref({
      value: '市辖区',
      code: '110100',
      target: 'city',
      index: 0
    })

    const district = ref({
      value: '东城区',
      code: '110101',
      target: 'district',
      index: 0
    })

    const classes = computed(() => [prefixCls])

    // 计算省、市、区列表
    const provinces = computed(() => filter('province'))
    const citys = computed(() => filter('city', province.value))
    const districts = computed(() => filter('district', city.value))

    watch(
      () => props.addressValue,
      (val) => {
        currentValue.value = val
        initVal()
      },
      { immediate: true }
    )

    function initVal () {
      if (!currentValue.value) return
      const [provinceName, cityName, districtName] = currentValue.value.split(
        props.valueSeparator
      )

      // 省份
      const provincesData = CHINA_AREA[rootCode]
      if (provincesData) {
        Object.keys(provincesData).forEach((item) => {
          if (provinceName === item || provinceName === provincesData[item]) {
            province.value.value = provincesData[item]
            province.value.code = item
          }
        })
      }

      // 城市
      const cityData = CHINA_AREA[province.value.code]
      if (cityData) {
        Object.keys(cityData).forEach((item) => {
          if (cityName === item || cityName === cityData[item]) {
            city.value.value = cityData[item]
            city.value.code = item
          }
        })
      }

      // 区县
      const districtData = CHINA_AREA[city.value.code]
      if (districtData) {
        Object.keys(districtData).forEach((item) => {
          if (districtName === item || districtName === districtData[item]) {
            district.value.value = districtData[item]
            district.value.code = item
          }
        })
      }
    }

    function filter (target, val = {}) {
      switch (target) {
      case 'province': {
        const data = CHINA_AREA[rootCode]
        if (!data) return []
        return Object.keys(data).map((item, index) => ({
          code: item,
          value: data[item],
          target,
          index
        }))
      }
      case 'city':
      case 'district': {
        const listData = CHINA_AREA[val.code]
        if (!listData) {
          if (target) {
            if (target === 'city') city.value = { value: '', code: '', target, index: 0 }
            if (target === 'district') district.value = { value: '', code: '', target, index: 0 }
          }
          return []
        }
        return Object.keys(listData).map((item, index) => ({
          code: item,
          value: listData[item],
          target,
          index
        }))
      }
      }
    }

    function change (target, current) {
      if (target === 'province') province.value = { ...province.value, ...current }
      if (target === 'city') city.value = { ...city.value, ...current }
      if (target === 'district') district.value = { ...district.value, ...current }

      emit('update:addressValue', [
        province.value.value,
        city.value.value,
        district.value.value
      ].filter(Boolean).join(props.valueSeparator))

      emit('change', {
        province: { code: province.value.code, name: province.value.value },
        city: { code: city.value.code, name: city.value.value },
        district: { code: district.value.code, name: district.value.value }
      })
    }

    function sure () {
      // emit('sure', {
      //   province: { code: province.value.code, name: province.value.value },
      //   city: { code: city.value.code, name: city.value.value },
      //   district: { code: district.value.code, name: district.value.value },
      //   formArea: [province.value.value, city.value.value, district.value.value].filter(Boolean).join(props.valueSeparator)
      // })
      pickerOnOk({
        province: { code: province.value.code, name: province.value.value },
        city: { code: city.value.code, name: city.value.value },
        district: { code: district.value.code, name: district.value.value },
        formArea: [province.value.value, city.value.value, district.value.value].filter(Boolean).join(props.valueSeparator)
      })
    }

    function cancle () {
      // emit('cancle')
      pickeronFail()
    }

    return {
      classes,
      province,
      city,
      district,
      provinces,
      citys,
      districts,
      currentValue,
      change,
      sure,
      cancle
    }
  }
})
</script>
