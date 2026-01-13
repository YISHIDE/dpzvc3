"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const props = require("./props-e5gAEI2g.js");
const _pluginVue_exportHelper = require("./_plugin-vue_export-helper-DM9IkUGy.js");
const _sfc_main = vue.defineComponent({
  name: "Dpzvc3Blade",
  props: props.spinnerProps.props,
  setup(props$1) {
    const bladeStyle = vue.computed(() => {
      return props$1.color ? { backgroundColor: props$1.color } : {};
    });
    const { spinnerStyle } = props.spinnerProps.setup(props$1);
    return {
      bladeStyle,
      spinnerStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "dpzvc3-spinner-blade",
    style: vue.normalizeStyle(_ctx.spinnerStyle)
  }, [
    (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(12, (i) => {
      return vue.createElementVNode("div", {
        key: i,
        class: vue.normalizeClass(["blade", "blade-" + i]),
        style: vue.normalizeStyle(_ctx.bladeStyle)
      }, null, 6);
    }), 64))
  ], 4);
}
const blade = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.default = blade;
//# sourceMappingURL=blade-DWu70HR2.js.map
