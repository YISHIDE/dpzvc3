"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const props = require("./props-e5gAEI2g.js");
const _pluginVue_exportHelper = require("./_plugin-vue_export-helper-DM9IkUGy.js");
const _sfc_main = vue.defineComponent({
  name: "Dpzvc3FadingCircle",
  props: props.spinnerProps.props,
  setup(props$1) {
    const { spinnerStyle } = props.spinnerProps.setup(props$1);
    const blockStyle = (index) => {
      return {
        transform: `rotate(${30 * index}deg)`
      };
    };
    const circleStyle = (index) => {
      return {
        backgroundColor: props$1.color || "#39f",
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
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "dpzvc3-spinner-fading-circle",
    style: vue.normalizeStyle(_ctx.spinnerStyle)
  }, [
    (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(12, (i) => {
      return vue.createElementVNode("div", {
        key: i,
        class: vue.normalizeClass(["block", "block-" + i]),
        style: vue.normalizeStyle(_ctx.blockStyle(i - 1))
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["circle", "circle-" + i]),
          style: vue.normalizeStyle(_ctx.circleStyle(i - 1))
        }, null, 6)
      ], 6);
    }), 64))
  ], 4);
}
const fadingCircle = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.default = fadingCircle;
//# sourceMappingURL=fading-circle-BxAW6UGp.js.map
