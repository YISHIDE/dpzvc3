import { defineComponent, createElementBlock, openBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass } from "vue";
import { s as spinnerProps } from "./props-CI3pQeT7.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const _sfc_main = defineComponent({
  name: "Dpzvc3FadingCircle",
  props: spinnerProps.props,
  setup(props) {
    const { spinnerStyle } = spinnerProps.setup(props);
    const blockStyle = (index) => {
      return {
        transform: `rotate(${30 * index}deg)`
      };
    };
    const circleStyle = (index) => {
      return {
        backgroundColor: props.color || "#39f",
        animationDelay: `${1.2 / 12 * index - 1.2}s`
      };
    };
    return {
      spinnerStyle,
      blockStyle,
      circleStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "dpzvc3-spinner-fading-circle",
    style: normalizeStyle(_ctx.spinnerStyle)
  }, [
    (openBlock(), createElementBlock(Fragment, null, renderList(12, (i) => {
      return createElementVNode("div", {
        key: i,
        class: normalizeClass(["block", "block-" + i]),
        style: normalizeStyle(_ctx.blockStyle(i - 1))
      }, [
        createElementVNode("div", {
          class: normalizeClass(["circle", "circle-" + i]),
          style: normalizeStyle(_ctx.circleStyle(i - 1))
        }, null, 6)
      ], 6);
    }), 64))
  ], 4);
}
const fadingCircle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  fadingCircle as default
};
//# sourceMappingURL=fading-circle-2WxM77-S.mjs.map
