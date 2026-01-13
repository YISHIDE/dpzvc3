import { defineComponent, resolveComponent, createElementBlock, openBlock, normalizeClass, createElementVNode, Fragment, renderList, createBlock, inject, ref, computed, watch } from "vue";
import { P as PickerSlot } from "./picker-slot-DdUE9HiA.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const prefixCls = "dpzvc3-normal-picker";
const _sfc_main = defineComponent({
  name: "NormalPicker",
  components: { PickerSlot },
  props: {
    list: { type: Array, default: () => [] },
    initArr: { type: Array, default: () => [] }
  },
  setup(props, { emit }) {
    const { pickerOnOk, pickeronFail } = inject("DpzVc3Picker");
    const initItems = ref(
      props.initArr.length ? [...props.initArr] : props.list.map((item) => item.list?.[0]?.code ?? "")
    );
    const normal = ref({});
    const shadowList = computed(() => {
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
    const classes = computed(() => [prefixCls]);
    watch(
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
  const _component_PickerSlot = resolveComponent("PickerSlot");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    createElementVNode("div", _hoisted_1, [
      createElementVNode("div", {
        class: "left",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancle && _ctx.cancle(...args))
      }, "取消"),
      createElementVNode("div", {
        class: "right",
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.sure && _ctx.sure(...args))
      }, "确定")
    ]),
    createElementVNode("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.shadowList, (item, key) => {
        return openBlock(), createBlock(_component_PickerSlot, {
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
const normalPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  normalPicker as default
};
//# sourceMappingURL=normal-picker-HPJk7HHC.mjs.map
