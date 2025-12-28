<template>
  <div class="Picker">
    <!-- AreaPicker -->
    <Picker
      v-model="AreaVisible"
      type="AreaPicker"
      @sure="pickerSure"
      @cancle="pickerCancle"
    />

    <!-- DatePicker -->
    <Picker
      v-model="DateVisible"
      type="DatePicker"
      :date-value="'2025/12/25'"
      @sure="pickerSure"
      @cancle="pickerCancle"
    />
    <!-- NormalPicker -->
    <Picker
      v-model="NormalVisible"
      type="NormalPicker"
      :list="listRef"
      :init-arr="initArrRef"
      @sure="pickerSure"
      @cancle="pickerCancle"
    />
    <div class="item">
      <VButton
        width="30%"
        @click="DateVisible = true"
      >
        日期选择器
      </VButton>
      <VButton
        width="30%"
        @click="AreaVisible = true"
      >
        地区选择器
      </VButton>
      <VButton
        width="30%"
        @click="NormalVisible = true"
      >
        通用选择器
      </VButton>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  name: 'ViewPicker',
  setup () {
    const AreaVisible = ref(false)
    const DateVisible = ref(false)
    const NormalVisible = ref(false)
    const initArrRef = ref([1, 3, 3])
    const listRef = ref([
      {
        target: 'targetA',
        list: [{ value: 'a', code: 1 }, { value: 2, code: 2 }, { value: 3, code: 3 }, {
          value: 4,
          code: 4
        }, { value: 5, code: 5 }, { value: 6, code: 6 }, { value: 7, code: 7 }, {
          value: 8,
          code: 8
        }, { value: 'c', code: 9 }, { value: 0, code: 0 }]
      },
      {
        target: 'targetB',
        list: [{ value: 'b', code: 1 }, { value: 2, code: 2 }, { value: 3, code: 3 }, {
          value: 4,
          code: 4
        }, { value: 5, code: 5 }, { value: 6, code: 6 }, { value: 7, code: 7 }, {
          value: 8,
          code: 8
        }, { value: 9, code: 9 }, { value: 0, code: 0 }]
      },
      {
        target: 'targetC',
        list: [{ value: 'c', code: 1 }, { value: 2, code: 2 }, { value: 3, code: 3 }, {
          value: 4,
          code: 4
        }, { value: 5, code: 5 }, { value: 6, code: 6 }, { value: 7, code: 7 }, {
          value: 8,
          code: 8
        }, { value: 9, code: 9 }, { value: 0, code: 0 }]
      }
    ]) // code为唯一值，value为显示出的具体文本
    const { proxy } = getCurrentInstance()
    // 选择确定回调
    function pickerSure (value) {
      // console.log(value)
      // 如果全局 $Modal 可用
      if (proxy) {
        proxy.$Modal.confirm({ body: value.formArea || value.formatDate || JSON.stringify(value) })
      }
      if (!value.formArea && !value.formatDate) {
        // console.log(value, 'value')
        initArrRef.value = [value.targetA.code, value.targetB.code, value.targetC.code]
      }
    }

    // 选择取消回调
    function pickerCancle () {
      if (proxy) {
        proxy.$Message.show({ text: '您选择了取消' })
      }
    }

    return {
      AreaVisible,
      DateVisible,
      NormalVisible,
      pickerSure,
      pickerCancle,
      listRef,
      initArrRef
    }
  }
}
</script>

<style lang="less" scoped>
.Picker {
  position: relative;
  height: 100%;

  .item {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 50px 0;
  }
}
</style>
