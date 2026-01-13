import { defineComponent, resolveComponent, createElementBlock, openBlock, normalizeClass, createElementVNode, createBlock, createCommentVNode, inject, ref, computed, watch } from "vue";
import { P as PickerSlot } from "./picker-slot-DdUE9HiA.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
const props = {
  props: {
    dateValue: String,
    year: {
      type: [Boolean, Array],
      default: true
    },
    month: {
      type: [Boolean, Array],
      default: true
    },
    day: {
      type: [Boolean, Array],
      default: true
    },
    valueSeparator: {
      type: String,
      default: "/"
    }
  }
};
const DAYS = {
  30: [4, 6, 9, 11],
  31: [1, 3, 5, 7, 8, 10, 12]
};
const prefixCls = "dpzvc3-date-picker";
const _sfc_main = defineComponent({
  name: "DatePicker",
  components: { PickerSlot },
  props: {
    ...props,
    dateValue: String,
    year: [Boolean, Array],
    month: [Boolean, Array],
    day: [Boolean, Array],
    valueSeparator: { type: String, default: "-" }
  },
  setup(props2, { emit }) {
    const { pickerOnOk, pickeronFail } = inject("DpzVc3Picker");
    const currentValue = ref(props2.dateValue || "");
    const date = ref({
      year: {
        code: (/* @__PURE__ */ new Date()).getFullYear(),
        value: String((/* @__PURE__ */ new Date()).getFullYear()),
        target: "year",
        index: 0
      },
      month: {
        code: (/* @__PURE__ */ new Date()).getMonth() + 1,
        value: String((/* @__PURE__ */ new Date()).getMonth() + 1),
        target: "month",
        index: 0
      },
      day: {
        code: (/* @__PURE__ */ new Date()).getDate(),
        value: String((/* @__PURE__ */ new Date()).getDate()),
        target: "day",
        index: 0
      },
      formatDate: ""
    });
    const classes = computed(() => [prefixCls]);
    const yearList = computed(() => {
      if (!props2.year) return [];
      let from = 1900;
      let to = (/* @__PURE__ */ new Date()).getFullYear();
      if (Array.isArray(props2.year)) {
        from = props2.year[0] ?? from;
        to = props2.year[1] ?? to;
      }
      const list = [];
      for (let i = from, index = 0; i <= to; i++, index++) {
        list.push({ code: i, value: String(i), target: "year", index });
      }
      return list;
    });
    const monthList = computed(() => {
      if (!props2.month) return [];
      let from = 1;
      let to = 12;
      if (Array.isArray(props2.month)) {
        from = props2.month[0] ?? from;
        to = props2.month[1] ?? to;
      }
      const list = [];
      for (let i = from, index = 0; i <= to; i++, index++) {
        list.push({ code: i, value: String(i), target: "month", index });
      }
      return list;
    });
    const dayList = computed(() => {
      if (!props2.day) return [];
      let from = 1;
      let to = 31;
      const month = Number(date.value.month.value);
      const year = Number(date.value.year.code);
      if (DAYS[30].includes(month)) to = 30;
      else if (DAYS[31].includes(month)) to = 31;
      else {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) to = 29;
        else to = 28;
      }
      if (Array.isArray(props2.day)) {
        from = props2.day[0] ?? from;
        to = props2.day[1] ?? to;
      }
      const list = [];
      for (let i = from, index = 0; i <= to; i++, index++) {
        list.push({ code: i, value: String(i), target: "day", index });
      }
      return list;
    });
    watch(
      () => props2.dateValue,
      (val) => {
        currentValue.value = val;
        initVal();
      },
      { immediate: true }
    );
    function initVal() {
      if (!currentValue.value) return;
      const [y = "", m = "", d = ""] = currentValue.value.split(
        props2.valueSeparator
      );
      if (props2.year)
        date.value.year = { ...date.value.year, code: Number(y), value: y };
      if (props2.month)
        date.value.month = { ...date.value.month, code: Number(m), value: m };
      if (props2.day)
        date.value.day = { ...date.value.day, code: Number(d), value: d };
    }
    function cancle() {
      pickeronFail();
    }
    function sure() {
      date.value.formatDate = [
        date.value.year.value,
        date.value.month.value,
        date.value.day.value
      ].filter(Boolean).join(props2.valueSeparator);
      pickerOnOk(date.value);
    }
    function change(target, current) {
      if (target === "year")
        date.value.year = { ...date.value.year, ...current };
      if (target === "month")
        date.value.month = { ...date.value.month, ...current };
      if (target === "day") date.value.day = { ...date.value.day, ...current };
      date.value.formatDate = [
        date.value.year.value,
        date.value.month.value,
        date.value.day.value
      ].filter(Boolean).join(props2.valueSeparator);
      emit("change", target, current);
    }
    return {
      classes,
      date,
      yearList,
      monthList,
      dayList,
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
      _ctx.year ? (openBlock(), createBlock(_component_PickerSlot, {
        key: 0,
        list: _ctx.yearList,
        "init-item": _ctx.date.year.code,
        target: "year",
        onChange: _ctx.change
      }, null, 8, ["list", "init-item", "onChange"])) : createCommentVNode("", true),
      _ctx.month ? (openBlock(), createBlock(_component_PickerSlot, {
        key: 1,
        list: _ctx.monthList,
        "init-item": _ctx.date.month.code,
        target: "month",
        onChange: _ctx.change
      }, null, 8, ["list", "init-item", "onChange"])) : createCommentVNode("", true),
      _ctx.day ? (openBlock(), createBlock(_component_PickerSlot, {
        key: 2,
        list: _ctx.dayList,
        "init-item": _ctx.date.day.code,
        target: "day",
        onChange: _ctx.change
      }, null, 8, ["list", "init-item", "onChange"])) : createCommentVNode("", true)
    ])
  ], 2);
}
const datePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  datePicker as default
};
//# sourceMappingURL=date-picker-CXDBHjhy.mjs.map
