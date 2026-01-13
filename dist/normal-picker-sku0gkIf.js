"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const pickerSlot = require("./picker-slot-CJILXROk.js");
const _pluginVue_exportHelper = require("./_plugin-vue_export-helper-DM9IkUGy.js");
const prefixCls = "dpzvc3-normal-picker";
const _sfc_main = vue.defineComponent({
  name: "NormalPicker",
  components: { PickerSlot: pickerSlot.PickerSlot },
  props: {
    list: { type: Array, default: () => [] },
    initArr: { type: Array, default: () => [] }
  },
  setup(props, { emit }) {
    const { pickerOnOk, pickeronFail } = vue.inject("DpzVc3Picker");
    const initItems = vue.ref(
      props.initArr.length ? [...props.initArr] : props.list.map((item) => item.list?.[0]?.code ?? "")
    );
    const normal = vue.ref({});
    const shadowList = vue.computed(() => {
      return props.list.map((item) => {
        const list = (item.list || []).map((child, index) => ({
          code: child.code ?? child.value,
          value: child.value,
          target: child.target ?? item.target,
          index
        }));
        return {
          ...item,
          list
        };
      });
    });
    const classes = vue.computed(() => [prefixCls]);
    vue.watch(
      () => props.initArr,
      (val) => {
        initItems.value = val.length > 0 ? [...val] : props.list.map((item) => item.list?.[0]?.code ?? "");
      }
    );
    function cancle() {
      pickeronFail();
    }
    function sure() {
      pickerOnOk(normal.value);
    }
    function change(target, current) {
      const index = shadowList.value.findIndex((i) => i.target === target);
      if (index !== -1) {
        initItems.value[index] = current.code;
      }
      normal.value = {
        ...normal.value,
        [target]: current
      };
      emit("scroll", current);
    }
    return {
      classes,
      shadowList,
      initItems,
      cancle,
      sure,
      change
    };
  }
});
const _hoisted_1 = { class: "header" };
const _hoisted_2 = { class: "main" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PickerSlot = vue.resolveComponent("PickerSlot");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.classes)
  }, [
    vue.createElementVNode("div", _hoisted_1, [
      vue.createElementVNode("div", {
        class: "left",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancle && _ctx.cancle(...args))
      }, "取消"),
      vue.createElementVNode("div", {
        class: "right",
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.sure && _ctx.sure(...args))
      }, "确定")
    ]),
    vue.createElementVNode("div", _hoisted_2, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.shadowList, (item, key) => {
        return vue.openBlock(), vue.createBlock(_component_PickerSlot, {
          key: item.target,
          target: item.target,
          "init-item": _ctx.initItems[key],
          list: item.list,
          onChange: _ctx.change
        }, null, 8, ["target", "init-item", "list", "onChange"]);
      }), 128))
    ])
  ], 2);
}
const normalPicker = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.default = normalPicker;
//# sourceMappingURL=normal-picker-sku0gkIf.js.map
