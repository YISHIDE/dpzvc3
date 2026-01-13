import { s as spinnerProps } from "./props-CI3pQeT7.mjs";
import { createElementBlock, openBlock, normalizeStyle, Fragment, renderList, createElementVNode, normalizeClass } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const _sfc_main = {
  mixins: [spinnerProps],
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
  return openBlock(), createElementBlock("div", {
    class: "dpzvc3-spinner-triple-bounce",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(), createElementBlock(Fragment, null, renderList(3, (i, key) => {
      return createElementVNode("div", {
        key,
        class: normalizeClass(["bounce", "bounce-" + i]),
        style: normalizeStyle($options.bounceStyle)
      }, null, 6);
    }), 64))
  ], 4);
}
const tripleBounce = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  tripleBounce as default
};
//# sourceMappingURL=triple-bounce-BmhCvepO.mjs.map
