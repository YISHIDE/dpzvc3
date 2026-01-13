import { defineComponent, createElementBlock, openBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass, computed } from "vue";
import { s as spinnerProps } from "./props-CI3pQeT7.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const _sfc_main = defineComponent({
  name: "Dpzvc3Blade",
  props: spinnerProps.props,
  setup(props) {
    const bladeStyle = computed(() => {
      return props.color ? { backgroundColor: props.color } : {};
    });
    const { spinnerStyle } = spinnerProps.setup(props);
    return {
      bladeStyle,
      spinnerStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "dpzvc3-spinner-blade",
    style: normalizeStyle(_ctx.spinnerStyle)
  }, [
    (openBlock(), createElementBlock(Fragment, null, renderList(12, (i) => {
      return createElementVNode("div", {
        key: i,
        class: normalizeClass(["blade", "blade-" + i]),
        style: normalizeStyle(_ctx.bladeStyle)
      }, null, 6);
    }), 64))
  ], 4);
}
const blade = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  blade as default
};
//# sourceMappingURL=blade-C3Fjktmp.mjs.map
