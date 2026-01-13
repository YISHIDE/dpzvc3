"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const props = require("./props-e5gAEI2g.js");
const _pluginVue_exportHelper = require("./_plugin-vue_export-helper-DM9IkUGy.js");
const _sfc_main = vue.defineComponent({
  name: "Dpzvc3DoubleBounce",
  props: props.spinnerProps.props,
  setup(props$1) {
    const { spinnerStyle } = props.spinnerProps.setup(props$1);
    const bounceStyle = vue.computed(() => {
      return props$1.color ? { backgroundColor: props$1.color } : {};
    });
    return {
      spinnerStyle,
      bounceStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "dpzvc3-spinner-double-bounce",
    style: vue.normalizeStyle(_ctx.spinnerStyle)
  }, [
    (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i) => {
      return vue.createElementVNode("div", {
        key: i,
        class: vue.normalizeClass(["bounce", "bounce-" + i]),
        style: vue.normalizeStyle(_ctx.bounceStyle)
      }, null, 6);
    }), 64))
  ], 4);
}
const doubleBounce = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.default = doubleBounce;
//# sourceMappingURL=double-bounce-AsbN2eaV.js.map
