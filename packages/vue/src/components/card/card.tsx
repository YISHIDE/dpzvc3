// src/components/card/card.tsx
import { defineComponent, computed, PropType } from "vue";

// export type CardProps = {
//   width?: string
// }
import type { CardProps, CardClassNameArray } from "./types";
export type { CardProps };

const prefixCls = "dpzvc3-card";

export default defineComponent({
  name: "Dpzvc3Card",
  props: {
    width: { type: String as PropType<string>, default: "100%" },
  },
  setup(props, { slots }) {
    const classes = computed<CardClassNameArray>(() => [prefixCls]);
    const headerClass = computed<CardClassNameArray>(() => [
      `${prefixCls}-header`,
      "dpzvc3-1px-bottom",
    ]);
    const contentClass = computed<CardClassNameArray>(() => [
      `${prefixCls}-content`,
    ]);
    const footerClass = computed<CardClassNameArray>(() => [
      `${prefixCls}-footer`,
      "dpzvc3-1px-top",
    ]);
    const cardWidth = computed<CardProps["width"]>(() => props.width);

    return () => (
      <div class={classes.value} style={{ width: cardWidth.value }}>
        <div class={headerClass.value}>{slots.header?.()}</div>
        <div class={contentClass.value}>
          {slots.default ? slots.default() : <div class="main" />}
        </div>
        <div class={footerClass.value}>{slots.footer?.()}</div>
      </div>
    );
  },
});
