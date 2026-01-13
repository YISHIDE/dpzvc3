import { defineComponent, createElementBlock, openBlock, normalizeStyle, computed } from "vue";
import { s as spinnerProps } from "./props-CI3pQeT7.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const _sfc_main = defineComponent({
  name: "Dpzvc3Snake",
  props: spinnerProps.props,
  setup(props) {
    const spinnerStyle = computed(() => {
      const style = {};
      if (props.size) {
        const borderSize = Math.ceil(props.size / 8);
        style.height = props.size + "px";
        style.width = props.size + "px";
        style.borderWidth = borderSize + "px";
      }
      if (props.color) {
        style.borderTopColor = props.color;
        style.borderLeftColor = props.color;
        style.borderBottomColor = props.color;
      }
      return style;
    });
    return {
      spinnerStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "dpzvc3-spinner-snake",
    style: normalizeStyle(_ctx.spinnerStyle)
  }, null, 4);
}
const snake = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  snake as default
};
//# sourceMappingURL=snake-DXN7O72C.mjs.map
