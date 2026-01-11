// src/components/cell/cell.tsx
import { defineComponent, computed, PropType } from "vue";
import { useRouter } from "vue-router";
import { inputEmits } from "./types";
import type { CellProps, CellEmits, CellClassNameArray } from "./types";
export type { CellProps, CellEmits };

const prefixCls = "dpzvc3-cell";

export default defineComponent({
  name: "Dpzvc3Cell",
  props: {
    title: String,
    value: null,
    label: String,
    link: String,
    hasMask: Boolean,
  },
  emits: inputEmits,
  setup(props, { emit, slots }) {
    const router = useRouter();

    // const toLink = computed<CellProps['link']>(() => {
    //   if (!props.link) return ''
    //   const resolved = router.resolve(props.link)
    //   return resolved.matched.length ? resolved.href : props.link
    // })
    const toLink = computed<CellProps["link"]>(() => {
      if (typeof window === "undefined") {
        return ""; // SSR 阶段不要依赖 props.link
      }
      if (!props.link) return "";
      const resolved = router.resolve(props.link);
      return resolved.matched.length ? resolved.href : props.link;
    });
    const classes = computed<CellClassNameArray>(() => [prefixCls]);
    const maskClass = computed<CellClassNameArray>(() => [`${prefixCls}-mask`]);
    const leftClasses = computed<CellClassNameArray>(() => [
      `${prefixCls}-left`,
    ]);
    const rightClasses = computed<CellClassNameArray>(() => [
      `${prefixCls}-right`,
    ]);
    const wrapperClasses = computed<CellClassNameArray>(() => [
      `${prefixCls}-main`,
      "dpzvc3-1px-top",
    ]);
    const titleClass = computed<CellClassNameArray>(() => [
      `${prefixCls}-main-title`,
    ]);
    const valueClass = computed<CellClassNameArray>(() => [
      `${prefixCls}-main-value`,
    ]);
    const labelClass = computed(() => [`${prefixCls}-main-label`]);

    const handleClick = (e: MouseEvent) => {
      if (props.link) {
        router.push(props.link);
      } else {
        emit("click", e);
      }
    };

    const cellTouchStart = (e: TouchEvent) => emit("touchstart", e);
    const cellTouchMove = (e: TouchEvent) => emit("touchmove", e);
    const cellTouchEnd = (e: TouchEvent) => emit("touchend", e);

    return () => (
      <div
        data-href={toLink.value}
        class={classes.value}
        onClick={handleClick}
        onTouchstart={cellTouchStart}
        onTouchmove={cellTouchMove}
        onTouchend={cellTouchEnd}
      >
        {props.hasMask && <span class={maskClass.value} />}

        <div class={leftClasses.value}>{slots.left?.()}</div>

        <div class={wrapperClasses.value}>
          <div class={titleClass.value}>
            {slots.icon?.()}
            {slots.title ? (
              slots.title()
            ) : (
              <>
                <span>{props.title}</span>
                <span class={labelClass.value}>{props.label}</span>
              </>
            )}
          </div>

          <div class={valueClass.value}>
            {slots.value ? slots.value() : <span>{props.value}</span>}
          </div>
        </div>

        <div class={rightClasses.value}>{slots.right?.()}</div>
      </div>
    );
  },
});
