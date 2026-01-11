// src/components/checkbox-group/CheckboxGroup.tsx
import { defineComponent, ref, watch, provide, PropType } from "vue";
import type {
  CheckBoxGroupProps,
  CheckBoxGroupValue,
  CheckBoxGroupExpose,
  CheckBoxGroupInject,
} from "./types";
export type { CheckBoxGroupProps };

const prefixCls = "dpzvc3-checkBoxGroup";

export default defineComponent({
  name: "DpzVcCheckBoxGroup",

  props: {
    modelValue: {
      type: Array as PropType<CheckBoxGroupValue>,
      default: () => [],
    },
    single: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "on-change"],

  setup(props, { emit, slots, expose }) {
    const currentValue = ref<CheckBoxGroupValue>([...props.modelValue]);

    /** 对外暴露给 checkbox 的方法 */
    const toggleOption = (value: CheckBoxGroupValue) => {
      let newValue: CheckBoxGroupValue = [];

      if (props.single) {
        // 单选模式，只保留第一个
        newValue = [value[0]];
      } else {
        newValue = [...value];
      }

      currentValue.value = newValue;
      emit("update:modelValue", newValue);
      emit("on-change", newValue);
    };

    /** 提供给子组件注入 */
    provide<CheckBoxGroupInject>("CheckBoxGroup", {
      currentValue,
      toggleOption,
      single: props.single,
    });

    /** watch 外部 modelValue 同步 */
    watch(
      () => props.modelValue,
      (val) => {
        currentValue.value = [...val];
      },
    );

    /** expose 给父组件通过 ref 调用 */
    expose<CheckBoxGroupExpose>({
      toggleOption,
    });

    return () => (
      <div class={[prefixCls, props.vertical ? `${prefixCls}-vertical` : ""]}>
        {slots.default?.()}
      </div>
    );
  },
});
