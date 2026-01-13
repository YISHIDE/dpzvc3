import { defineComponent, ref, watch, computed, PropType } from "vue";
import Spinner from "../spinner";
import type { IndicatorProps } from "./types";
export type { IndicatorProps };
const prefixCls = "dpzvc3-Indicator";

export default defineComponent({
  name: "Dpzvc3Indicator",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    type: {
      type: String as PropType<IndicatorProps["type"]>,
      default: "snake",
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 45,
    },
    text: {
      type: String,
      default: "加载中...",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    // watch modelValue 更新 visible
    watch(
      () => props.modelValue,
      (val) => {
        visible.value = val;
      },
    );

    // watch visible 更新 v-model
    watch(visible, (val) => {
      emit("update:modelValue", val);
    });

    const classes = computed(() => [prefixCls]);
    const containerClasses = computed(() => [`${prefixCls}-container`]);
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`]);

    return () => (
      <div>
        {visible.value && (
          <div
            class={classes.value}
            onTouchmove={(e: any) => e.preventDefault()}
          >
            <div class={containerClasses.value}>
              <div class={wrapperClasses.value}>
                <Spinner
                  size={props.size}
                  type={props.type}
                  color={props.color}
                />
                <span style={{ color: props.color }}>{props.text}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
});
