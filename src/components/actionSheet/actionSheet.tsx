// src/components/action-sheet/action-sheet.tsx
import { defineComponent, ref, computed, watch, PropType } from "vue";
import Popup from "../popup";
// import type { PopupProps } from '../popup/types'
import { inputEmits } from "./types";
import type {
  ActionSheetProps,
  ActionSheetEmits,
  ActionItem,
  ActionSheetClassNameArray,
} from "./types";
export type { ActionSheetProps, ActionSheetEmits };

const prefixCls = "dpzvc3-actionSheet";

export default defineComponent({
  name: "ActionSheet",
  props: {
    modelValue: { type: Boolean, default: false },
    items: { type: Array as PropType<Array<ActionItem>>, default: () => [] },
    cancleText: { type: String, default: "取消" },
  },
  emits: inputEmits,
  setup(props, { emit }) {
    const visible = ref<ActionSheetProps["modelValue"]>(props.modelValue);
    const actions = ref<ActionSheetProps["items"]>(props.items);

    // 同步 props.modelValue
    watch<ActionSheetProps["modelValue"]>(
      () => props.modelValue,
      (val) => {
        visible.value = val;
      },
    );
    // 同步 actions
    watch<ActionSheetProps["items"]>(
      () => props.items,
      (val) => {
        actions.value = val;
      },
    );

    const classes = computed<ActionSheetClassNameArray>(() => [prefixCls]);
    const wrapperClasses = computed<ActionSheetClassNameArray>(() => [
      `${prefixCls}-wrapper`,
    ]);
    const wrapperActionClass = computed<ActionSheetClassNameArray>(() => [
      `${prefixCls}-wrapper-action`,
    ]);
    const cancleClass = computed<ActionSheetClassNameArray>(() => [
      `${prefixCls}-cancle`,
    ]);

    const emitAction = (item: ActionItem, index: number) => {
      item.onClick?.(item, index);
      emit("update:modelValue", false);
    };

    const cancleClick = () => {
      emit("update:modelValue", false);
    };

    return () => (
      <div>
        <Popup
          v-model={visible.value}
          position="bottom"
          styles={{ background: "transparent" }}
        >
          <div class={classes.value}>
            <ul class={wrapperClasses.value}>
              {actions.value?.map((item, index) => (
                <li
                  key={index}
                  class={wrapperActionClass.value}
                  onClick={() => emitAction(item, index)}
                >
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            {props.cancleText && (
              <a
                href="javascript:;"
                class={cancleClass.value}
                onClick={cancleClick}
              >
                {props.cancleText}
              </a>
            )}
          </div>
        </Popup>
      </div>
    );
  },
});
