"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const props = require("./props-e5gAEI2g.js");
const _pluginVue_exportHelper = require("./_plugin-vue_export-helper-DM9IkUGy.js");
const _sfc_main = vue.defineComponent({
  name: "Dpzvc3Snake",
  props: props.spinnerProps.props,
  setup(props2) {
    const spinnerStyle = vue.computed(() => {
      const style = {};
      if (props2.size) {
        const borderSize = Math.ceil(props2.size / 8);
        style.height = props2.size + "px";
        style.width = props2.size + "px";
        style.borderWidth = borderSize + "px";
      }
      if (props2.color) {
        style.borderTopColor = props2.color;
        style.borderLeftColor = props2.color;
        style.borderBottomColor = props2.color;
      }
      return style;
    });
    return {
      spinnerStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "dpzvc3-spinner-snake",
    style: vue.normalizeStyle(_ctx.spinnerStyle)
  }, null, 4);
}
const snake = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.default = snake;
//# sourceMappingURL=snake-BQnyJzSs.js.map
