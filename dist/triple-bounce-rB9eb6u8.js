"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const props = require("./props-e5gAEI2g.js");
const vue = require("vue");
const _pluginVue_exportHelper = require("./_plugin-vue_export-helper-DM9IkUGy.js");
const _sfc_main = {
  mixins: [props.spinnerProps],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    unitSize() {
      if (this.size) {
        return Math.round(this.size / 6) * 2;
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    spinnerStyle() {
      if (this.size) {
        return {
          padding: (this.size - this.unitSize) / 2 + "px 0"
        };
      }
    },
    bounceStyle() {
      const style = {};
      if (this.size) {
        style.width = this.unitSize + "px";
        style.height = this.unitSize + "px";
      }
      if (this.color) {
        style.backgroundColor = this.color;
      }
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "dpzvc3-spinner-triple-bounce",
    style: vue.normalizeStyle($options.spinnerStyle)
  }, [
    (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(3, (i, key) => {
      return vue.createElementVNode("div", {
        key,
        class: vue.normalizeClass(["bounce", "bounce-" + i]),
        style: vue.normalizeStyle($options.bounceStyle)
      }, null, 6);
    }), 64))
  ], 4);
}
const tripleBounce = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.default = tripleBounce;
//# sourceMappingURL=triple-bounce-rB9eb6u8.js.map
