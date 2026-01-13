import { defineComponent, createElementBlock, openBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass, computed } from "vue";
import { s as spinnerProps } from "./props-CI3pQeT7.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const _sfc_main = defineComponent({
  name: "Dpzvc3DoubleBounce",
  props: spinnerProps.props,
  setup(props) {
    const { spinnerStyle } = spinnerProps.setup(props);
    const bounceStyle = computed(() => {
      return props.color ? { backgroundColor: props.color } : {};
    });
    return {
      spinnerStyle,
      bounceStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "dpzvc3-spinner-double-bounce",
    style: normalizeStyle(_ctx.spinnerStyle)
  }, [
    (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
      return createElementVNode("div", {
        key: i,
        class: normalizeClass(["bounce", "bounce-" + i]),
        style: normalizeStyle(_ctx.bounceStyle)
      }, null, 6);
    }), 64))
  ], 4);
}
const doubleBounce = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  doubleBounce as default
};
//# sourceMappingURL=double-bounce-Cmz4kO27.mjs.map
