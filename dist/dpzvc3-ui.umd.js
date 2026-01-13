(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("vue-router")) : typeof define === "function" && define.amd ? define(["exports", "vue", "vue-router"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Dpzvc3UI = {}, global2.Vue, global2.VueRouter));
})(this, (function(exports2, vue, vueRouter) {
  "use strict";
  const SPINNERS = ["blade", "snake", "double-bounce", "triple-bounce", "fading-circle"];
  const SPINNER_MAP = {
    blade: vue.defineAsyncComponent(() => Promise.resolve().then(() => blade$1)),
    snake: vue.defineAsyncComponent(() => Promise.resolve().then(() => snake$1)),
    "double-bounce": vue.defineAsyncComponent(() => Promise.resolve().then(() => doubleBounce$1)),
    "triple-bounce": vue.defineAsyncComponent(() => Promise.resolve().then(() => tripleBounce$1)),
    "fading-circle": vue.defineAsyncComponent(() => Promise.resolve().then(() => fadingCircle$1))
  };
  function parseSpinner(type) {
    const value = type ?? 0;
    if (typeof value === "number" || /^\d+$/.test(String(value))) {
      const index = Number(value);
      if (index >= SPINNERS.length) {
        console.warn(`'${value}' spinner not found, use the default spinner.`);
        return SPINNERS[0];
      }
      return SPINNERS[index];
    }
    if (!SPINNERS.includes(value)) {
      console.warn(`'${value}' spinner not found, use the default spinner.`);
      return SPINNERS[0];
    }
    return value;
  }
  const Spinner = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Spinner",
    props: {
      size: {
        type: [Number, String],
        default: 30
      },
      type: {
        type: [String, Number],
        default: "snake"
      },
      color: {
        type: String,
        default: "#39f"
      }
    },
    setup(props2) {
      const SpinnerComponent = vue.computed(() => {
        const key = parseSpinner(props2.type);
        return SPINNER_MAP[key];
      });
      return () => {
        const Comp = SpinnerComponent.value;
        return vue.createVNode(Comp, {
          "size": props2.size,
          "type": props2.type,
          "color": props2.color
        }, null);
      };
    }
  });
  Spinner.install = (app) => {
    app.component("Spinner", Spinner);
  };
  const _Spinner = Spinner;
  const inputEmits$4 = {
    click: (value) => {
    }
  };
  const prefixCls$s = "dpzvc3-button";
  const DpButton = /* @__PURE__ */ vue.defineComponent({
    name: "VButton",
    props: {
      type: {
        type: String,
        default: "normal",
        validator: (val) => ["success", "loading", "normal", "primary", "warning", "danger", "text"].includes(val)
      },
      styles: {
        type: Object,
        default: () => ({})
      },
      circle: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inline: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "40px"
      },
      loading: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Boolean,
        default: true
      },
      border: {
        type: String,
        default: "all"
      }
    },
    emits: inputEmits$4,
    setup(props2, {
      emit,
      slots
    }) {
      const classes = vue.computed(() => [prefixCls$s, {
        [`${prefixCls$s}-circle`]: props2.circle,
        [`${prefixCls$s}-inline`]: props2.inline
      }]);
      const wrapperStyles = vue.computed(() => ({
        display: props2.inline ? "inline-block" : "block",
        width: props2.width,
        height: props2.height
      }));
      const buttonClass = vue.computed(() => [`${prefixCls$s}-btn`, [`dpzvc3-1px-${props2.border}`], {
        [`${prefixCls$s}-success`]: props2.type === "success",
        [`${prefixCls$s}-loading`]: props2.type === "loading",
        [`${prefixCls$s}-normal`]: props2.type === "normal",
        [`${prefixCls$s}-warning`]: props2.type === "warning",
        [`${prefixCls$s}-danger`]: props2.type === "danger",
        [`${prefixCls$s}-text`]: props2.type === "text",
        [`${prefixCls$s}-primary`]: props2.type === "primary",
        [`${prefixCls$s}-disabled`]: props2.disabled,
        [`${prefixCls$s}-radius`]: props2.radius
      }]);
      const handleClick = (e2) => {
        if (props2.disabled || props2.loading) return;
        emit("click", e2);
      };
      const loadingValue = vue.computed(() => props2.loading);
      return () => vue.createVNode("div", {
        "class": classes.value,
        "style": wrapperStyles.value
      }, [vue.createVNode("button", {
        "class": buttonClass.value,
        "style": props2.styles,
        "disabled": props2.disabled,
        "onClick": handleClick
      }, [slots.left ? slots.left() : loadingValue.value && vue.createVNode("span", {
        "class": "loading"
      }, [vue.createVNode(_Spinner, {
        "type": "blade",
        "size": 15,
        "color": "#ffffff"
      }, null)]), slots.default ? slots.default() : vue.createVNode("span", null, [vue.createTextVNode("确定")]), slots.right?.()])]);
    }
  });
  DpButton.install = (app) => {
    app.component("DpButton", DpButton);
  };
  const _DpButton = DpButton;
  const prefixCls$r = "dpzvc3-checkbox";
  const CheckBox = /* @__PURE__ */ vue.defineComponent({
    name: "DpzVcCheckBox",
    props: {
      disable: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      label: {
        type: [String, Number, Boolean]
      }
    },
    emits: ["update:modelValue", "on-change"],
    setup(props2, {
      emit,
      slots
    }) {
      const checkboxGroup = vue.inject("CheckBoxGroup", null);
      const isGroup = vue.ref(!!checkboxGroup);
      const currentValue = vue.ref(props2.modelValue);
      const show = vue.ref(true);
      const slotRef = vue.ref(null);
      const classes = vue.computed(() => [prefixCls$r]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$r}-wrapper`, {
        [`${prefixCls$r}-checked`]: currentValue.value,
        [`${prefixCls$r}-disable`]: props2.disable
      }]);
      const innerClasses = vue.computed(() => [`${prefixCls$r}-inner`]);
      vue.watch(() => props2.modelValue, (val) => {
        currentValue.value = val;
      });
      const change = (e2) => {
        if (props2.disable) return;
        const target = e2.target;
        const checked = target.checked;
        currentValue.value = checked;
        if (isGroup.value && checkboxGroup) {
          const value = [...checkboxGroup.currentValue.value];
          const index = value.indexOf(props2.label);
          if (checked && index === -1) value.push(props2.label);
          if (!checked && index > -1) value.splice(index, 1);
          checkboxGroup.toggleOption(value);
        } else {
          emit("update:modelValue", checked);
          emit("on-change", checked);
        }
      };
      vue.onMounted(() => {
        if (isGroup.value && checkboxGroup) {
          const value = [...checkboxGroup.currentValue.value];
          const index = value.indexOf(props2.label);
          if (index !== -1) currentValue.value = true;
        }
        if (slotRef.value && !slotRef.value.innerHTML) {
          show.value = false;
        }
      });
      return () => vue.createVNode("label", {
        "class": classes.value
      }, [vue.createVNode("span", {
        "class": wrapperClasses.value
      }, [vue.createVNode("span", {
        "class": innerClasses.value
      }, null), vue.createVNode("input", {
        "type": "checkbox",
        "class": `${prefixCls$r}-input noselect`,
        "disabled": props2.disable,
        "checked": currentValue.value,
        "onChange": change
      }, null)]), show.value && vue.createVNode("span", {
        "ref": slotRef
      }, [slots.default?.() ?? props2.label])]);
    }
  });
  const prefixCls$q = "dpzvc3-checkBoxGroup";
  const CheckBoxGroup = /* @__PURE__ */ vue.defineComponent({
    name: "DpzVcCheckBoxGroup",
    props: {
      modelValue: {
        type: Array,
        default: () => []
      },
      single: {
        type: Boolean,
        default: false
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "on-change"],
    setup(props2, {
      emit,
      slots,
      expose
    }) {
      const currentValue = vue.ref([...props2.modelValue]);
      const toggleOption = (value) => {
        let newValue = [];
        if (props2.single) {
          newValue = [value[0]];
        } else {
          newValue = [...value];
        }
        currentValue.value = newValue;
        emit("update:modelValue", newValue);
        emit("on-change", newValue);
      };
      vue.provide("CheckBoxGroup", {
        currentValue,
        toggleOption,
        single: props2.single
      });
      vue.watch(() => props2.modelValue, (val) => {
        currentValue.value = [...val];
      });
      expose({
        toggleOption
      });
      return () => vue.createVNode("div", {
        "class": [prefixCls$q, props2.vertical ? `${prefixCls$q}-vertical` : ""]
      }, [slots.default?.()]);
    }
  });
  CheckBox.install = (app) => {
    app.component("CheckBox", CheckBox);
  };
  const _CheckBox = CheckBox;
  CheckBoxGroup.install = (app) => {
    app.component("CheckBoxGroup", CheckBoxGroup);
  };
  const _CheckBoxGroup = CheckBoxGroup;
  const prefixCls$p = "dpzvc3-header";
  const DpHeader = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Header",
    props: {
      modelValue: {
        type: Boolean,
        default: true
      },
      fixed: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ""
      },
      wechat: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue"],
    setup(props2, {
      emit,
      slots
    }) {
      const visible = vue.ref(props2.modelValue);
      const isWechat = vue.ref(props2.wechat);
      const classes = vue.computed(() => [prefixCls$p, props2.fixed && `${prefixCls$p}-fixed`]);
      const isWeixin = vue.computed(() => /micromessenger/i.test(window.navigator.userAgent));
      const isPcWeixin = vue.computed(() => /windowswechat/i.test(window.navigator.userAgent));
      vue.watch(() => props2.modelValue, (val) => {
        visible.value = val;
      });
      vue.watch(() => props2.wechat, (val) => {
        isWechat.value = val;
      });
      vue.onMounted(() => {
        if ((isWeixin.value || isPcWeixin.value) && !isWechat.value) {
          emit("update:modelValue", false);
        }
      });
      const back = () => {
        window.history.back();
      };
      return () => visible.value ? vue.createVNode("div", {
        "class": classes.value
      }, [vue.createVNode("header", null, [vue.createVNode("div", {
        "class": "left",
        "onClick": back
      }, [slots.left ? slots.left() : vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
        "class": "arrow"
      }, null), vue.createVNode("span", {
        "class": "text"
      }, [vue.createTextVNode("返回")])])]), vue.createVNode("div", {
        "class": "title dpzvc3-nowrap"
      }, [props2.title]), vue.createVNode("div", {
        "class": "right"
      }, [slots.right ? slots.right() : vue.createVNode("div", null, null)])]), props2.fixed && vue.createVNode("div", {
        "class": "header-place"
      }, null)]) : null;
    }
  });
  DpHeader.install = (app) => {
    app.component("DpHeader", DpHeader);
  };
  const _DpzHeader = DpHeader;
  const prefixCls$o = "dpzvc3-message";
  const Message$1 = /* @__PURE__ */ vue.defineComponent({
    name: "DpzMessage",
    props: {
      name: {
        type: [String, Number],
        required: true
      },
      text: {
        type: [String, Number],
        default: ""
      },
      duration: {
        type: Number,
        default: 1.5
      },
      showLeft: {
        type: Boolean,
        default: false
      },
      rightHide: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "normal"
      },
      onClose: {
        type: Function,
        default: () => {
        }
      },
      position: {
        type: String,
        default: "top"
      }
    },
    setup(props2) {
      const remove = vue.inject("removeMessage");
      let timer = null;
      const classes = vue.computed(() => [prefixCls$o, `${prefixCls$o}-position-${props2.position}`]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$o}-text`]);
      const leftClasses = vue.computed(() => [`${prefixCls$o}-left`]);
      const rightClasses = vue.computed(() => [`${prefixCls$o}-right`]);
      const closeTimer = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
      const close2 = () => {
        closeTimer();
        remove?.(props2.name);
        props2.onClose?.();
      };
      vue.onMounted(() => {
        closeTimer();
        if (props2.duration !== 0) {
          timer = window.setTimeout(() => {
            close2();
          }, props2.duration * 1e3);
        }
      });
      vue.onBeforeUnmount(() => {
        closeTimer();
      });
      return () => vue.createVNode("div", {
        "class": classes.value
      }, [props2.showLeft && vue.createVNode("div", {
        "class": leftClasses.value
      }, [vue.createVNode(vue.resolveComponent("slot"), {
        "name": "message-left"
      }, {
        default: () => [vue.createVNode(_Spinner, {
          "size": "65",
          "type": "blade",
          "color": "#ffffff"
        }, null)]
      })]), vue.createVNode("p", {
        "class": wrapperClasses.value
      }, [props2.text]), !props2.rightHide && vue.createVNode("div", {
        "class": rightClasses.value
      }, [vue.createVNode(vue.resolveComponent("slot"), {
        "name": "message-right"
      }, null)])]);
    }
  });
  const MessageGroup = /* @__PURE__ */ vue.defineComponent({
    name: "MessageGroup",
    props: {
      styles: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props2, {
      expose
    }) {
      const messages = vue.ref([]);
      const add = (msgProps = {}) => {
        const message2 = {
          name: "",
          text: "",
          duration: 1.5,
          showLeft: false,
          rightHide: true,
          type: "normal",
          position: "top",
          onClose: () => {
          },
          ...msgProps
        };
        messages.value.push(message2);
      };
      const remove = (name) => {
        messages.value = messages.value.filter((item) => item.name !== name);
      };
      const closeAll = () => {
        messages.value = [];
      };
      vue.provide("removeMessage", remove);
      expose({
        add,
        closeAll,
        remove
      });
      return () => vue.createVNode("div", {
        "class": "dpzvc3-message-group",
        "style": props2.styles
      }, [messages.value.map((message2) => vue.createVNode(Message$1, {
        "key": message2.name,
        "name": message2.name,
        "text": message2.text,
        "duration": message2.duration,
        "show-left": message2.showLeft,
        "right-hide": message2.rightHide,
        "type": message2.type,
        "position": message2.position,
        "on-close": message2.onClose
      }, null))]);
    }
  });
  function createMessageInstance(props2 = {}) {
    const container2 = document.createElement("div");
    document.body.appendChild(container2);
    const vnode = vue.createVNode(MessageGroup, { ...props2 });
    vue.render(vnode, container2);
    const instance2 = vnode.component?.proxy;
    const { add, remove, closeAll } = vnode.component?.exposed || {};
    return {
      add(options) {
        add?.(options);
      },
      remove(name) {
        remove?.(name);
      },
      closeAll() {
        closeAll?.();
      },
      component: instance2,
      destroy() {
        closeAll?.();
        setTimeout(() => {
          vue.render(null, container2);
          container2.parentNode?.removeChild(container2);
        }, 500);
      }
    };
  }
  function randomStr(len = 32) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let str = "";
    const max = chars.length;
    for (let i2 = 0; i2 < len; i2++) {
      str += chars.charAt(Math.floor(Math.random() * max));
    }
    return str;
  }
  const JPEG = {
    JPEGEncoder: function(a2) {
    }
  };
  function scrollTop(el, from = 0, to, duration = 500) {
    if (typeof window !== "undefined" && !window.requestAnimationFrame) {
      window.requestAnimationFrame = window.requestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1e3 / 60);
      };
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);
    function scroll(start, end, step2) {
      if (start === end) return;
      const d2 = start < end ? Math.min(start + step2, end) : Math.max(start - step2, end);
      if (el === window) {
        window.scrollTo(d2, d2);
      } else {
        el.scrollTop = d2;
      }
      window.requestAnimationFrame(() => scroll(d2, end, step2));
    }
    scroll(from, to, step);
  }
  const defaultDuration = 1;
  const top = "0";
  let MGInstance = null;
  let seed = 1;
  const time = Date.now();
  function getName() {
    return `dpzvc3-message-group_${time}_${seed++}_${randomStr()}`;
  }
  function getNewInstance() {
    if (!MGInstance) {
      MGInstance = createMessageInstance({
        styles: {
          top,
          right: "0"
        }
      });
    }
    return MGInstance;
  }
  function message(props2) {
    const {
      text = "",
      name = getName(),
      duration = props2.duration === 0 ? 0 : props2.duration || defaultDuration,
      showLeft = false,
      rightHide = true,
      loading = false,
      onClose = () => {
      },
      styles = {},
      type = "normal",
      position = "center"
    } = props2;
    const instance2 = getNewInstance();
    instance2.add({
      name,
      text,
      duration,
      showLeft,
      rightHide,
      loading,
      onClose,
      styles,
      type,
      position
    });
    return function remove() {
      instance2.remove(name);
    };
  }
  const Message = {
    show(options) {
      return message(options);
    },
    success(options) {
      return message({
        ...options,
        type: "success"
      });
    },
    error(options) {
      return message({
        ...options,
        type: "error"
      });
    },
    loading(options) {
      return message({
        ...options,
        type: "loading",
        duration: 0,
        showLeft: true
      });
    },
    // config (options:MergeMessageOptions) {
    //   if (options?.top !== undefined) {
    //     top = options.top
    //   }
    //   if (options.duration !== undefined) {
    //     defaultDuration = options.duration
    //   }
    // },
    destroy() {
      if (!MGInstance) return;
      MGInstance.destroy();
      MGInstance = null;
    }
  };
  const prefixCls$n = "dpzvc3-modal";
  const Modal$1 = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Modal",
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      title: String,
      width: {
        type: String,
        default: "70%"
      },
      okText: {
        type: String,
        default: "确定"
      },
      cancleText: {
        type: String,
        default: "取消"
      },
      loading: {
        type: Boolean,
        default: false
      },
      styles: {
        type: Object,
        default: () => ({})
      },
      showHead: {
        type: Boolean,
        default: true
      },
      footerHide: {
        type: Boolean,
        default: false
      },
      body: String
    },
    emits: ["update:modelValue", "on-ok", "on-cancle"],
    setup(props2, {
      emit,
      slots
    }) {
      const visible = vue.ref(!!props2.modelValue);
      const isHead = vue.ref(!!props2.showHead);
      const buttonLoading = vue.ref(false);
      const getWrapperStyle = vue.computed(() => ({
        width: props2.width,
        ...props2.styles || {}
      }));
      vue.watch(() => props2.modelValue, (val) => visible.value = !!val);
      vue.watch(() => props2.showHead, (val) => isHead.value = !!val);
      const close2 = () => {
        emit("update:modelValue", false);
        emit("on-cancle");
      };
      const mask = () => {
        if (props2.maskClosable && !buttonLoading.value) {
          close2();
        }
      };
      const ok = () => {
        if (props2.loading) {
          buttonLoading.value = true;
        } else {
          emit("update:modelValue", false);
        }
        emit("on-ok");
      };
      return () => vue.createVNode(vue.Fragment, null, [vue.createVNode(vue.Transition, {
        "name": "dpzvc3-ani-fade"
      }, {
        default: () => visible.value && vue.createVNode("div", {
          "class": "dpzvc3-modal-mask",
          "onClick": mask,
          "onTouchstart": (e2) => e2.preventDefault(),
          "onTouchmove": (e2) => e2.preventDefault(),
          "onTouchend": (e2) => e2.preventDefault()
        }, null)
      }), vue.createVNode(vue.Transition, {
        "name": "dpzvc3-ani-scale"
      }, {
        default: () => visible.value && vue.createVNode("div", {
          "class": prefixCls$n,
          "style": getWrapperStyle.value
        }, [isHead.value && vue.createVNode("div", {
          "class": `${prefixCls$n}-header`
        }, [slots.header ? slots.header() : vue.createVNode("div", {
          "class": `${prefixCls$n}-header-inner ellipse-fir`
        }, [props2.title])]), vue.createVNode("div", {
          "class": `${prefixCls$n}-body`
        }, [slots.body ? slots.body() : props2.body]), !props2.footerHide && vue.createVNode("div", {
          "class": `${prefixCls$n}-footer`
        }, [slots.footer ? slots.footer() : vue.createVNode(vue.Fragment, null, [props2.cancleText && vue.createVNode(_DpButton, {
          "type": "primary",
          "onClick": close2
        }, {
          default: () => [props2.cancleText]
        }), vue.createVNode(_DpButton, {
          "type": "normal",
          "loading": buttonLoading.value,
          "onClick": ok
        }, {
          default: () => [props2.okText]
        })])])])
      })]);
    }
  });
  const prefixCls$m = "dpzvc3-modal";
  function createModalInstance(properties = {}) {
    const container2 = document.createElement("div");
    document.body.appendChild(container2);
    let vnode = null;
    const defaultProps = {
      // visible: false,
      modelValue: false,
      width: "70%",
      body: "",
      title: "",
      okText: "确定",
      cancleText: "取消",
      loading: false,
      buttonLoading: false,
      showCancle: true,
      showHead: true,
      onOk: () => {
      },
      onCancle: () => {
      },
      onRemove: () => {
      }
    };
    const props2 = { ...defaultProps, ...properties };
    const updateVNode = () => {
      const footer = [
        props2.showCancle ? vue.h(
          _DpButton,
          { type: "primary", radius: false, onClick: cancle },
          () => props2.cancleText
        ) : null,
        vue.h(
          _DpButton,
          {
            type: "normal",
            radius: false,
            loading: props2.buttonLoading,
            onClick: ok
          },
          () => props2.okText
        )
      ];
      vnode = vue.createVNode(
        Modal$1,
        {
          modelValue: props2.modelValue,
          width: props2.width,
          showHead: props2.showHead,
          footerHide: false,
          onOk: ok,
          onCancle: cancle
        },
        {
          header: () => vue.h("div", {
            class: `${prefixCls$m}-header-inner ellipse-fir`,
            innerHTML: props2.title
          }),
          body: () => vue.h("div", {
            class: `${prefixCls$m}-body-inner`,
            innerHTML: props2.body
          }),
          footer: () => footer
        }
      );
      vue.render(vnode, container2);
    };
    const remove = () => {
      props2.modelValue = false;
      updateVNode();
      setTimeout(destroy, 300);
    };
    const destroy = () => {
      vue.render(null, container2);
      container2.parentNode && container2.parentNode.removeChild(container2);
      props2.onRemove();
    };
    const ok = () => {
      if (props2.loading) {
        props2.buttonLoading = true;
      } else {
        remove();
      }
      props2.onOk();
    };
    const cancle = () => {
      remove();
      props2.onCancle();
    };
    return {
      show(newProps = {}) {
        Object.assign(props2, newProps);
        props2.modelValue = false;
        updateVNode();
        requestAnimationFrame(() => {
          props2.modelValue = true;
          updateVNode();
        });
      },
      remove,
      component: props2
    };
  }
  let modalInstance;
  function getModalInstance() {
    if (!modalInstance) {
      modalInstance = createModalInstance({
        showHead: true,
        // closable: true,
        maskClosable: false,
        footerHide: false
      });
    }
    return modalInstance;
  }
  function confirm$1(options) {
    const instance2 = getModalInstance();
    options.onRemove = () => {
      modalInstance = null;
    };
    instance2.show(options);
    return instance2;
  }
  const Modal = {
    info: (props2) => {
      props2.showCancle = true;
      props2.showHead = false;
      return confirm$1(props2);
    },
    confirm: (props2) => {
      props2.showCancle = false;
      props2.showHead = false;
      return confirm$1(props2);
    },
    remove: () => {
      if (!modalInstance) return false;
      const instance2 = getModalInstance();
      instance2.remove();
    }
  };
  const inputEmits$3 = {
    "update:modelValue": (value) => true
  };
  const prefixCls$l = "dpzvc3-popup";
  const Popup = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Popup",
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: "bottom"
      },
      showMask: {
        type: Boolean,
        default: true
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      width: {
        type: [Number, String],
        default: "100%"
      },
      height: {
        type: [Number, String]
      },
      styles: {
        type: Object,
        default: () => ({})
      }
    },
    emits: inputEmits$3,
    setup(props2, {
      emit,
      slots
    }) {
      const visible = vue.ref(props2.modelValue);
      const mask = vue.ref(props2.showMask);
      vue.watch(() => props2.modelValue, (val) => {
        visible.value = val;
      });
      vue.watch(visible, (val) => {
        emit("update:modelValue", val);
      });
      vue.watch(() => props2.showMask, (val) => {
        mask.value = val;
      });
      const classes = vue.computed(() => [prefixCls$l]);
      const popupClasses = vue.computed(() => [`${prefixCls$l}-${props2.position}`, `${prefixCls$l}-content`]);
      const contentStyle = vue.computed(() => {
        const heightValue = props2.height !== null ? props2.height : props2.position === "top" ? "auto" : "100%";
        return {
          ...props2.styles,
          width: props2.width,
          height: heightValue
        };
      });
      const close2 = () => {
        if (props2.maskClosable && mask.value) visible.value = false;
      };
      return () => vue.createVNode("div", {
        "class": classes.value
      }, [vue.createVNode(vue.Transition, {
        "name": "dpzvc3-ani-fade"
      }, {
        default: () => mask.value && visible.value && vue.createVNode("div", {
          "class": `${prefixCls$l}-mask`,
          "onClick": close2,
          "onTouchMove": (e2) => e2.preventDefault()
        }, null)
      }), vue.createVNode(vue.Transition, {
        "name": `dpzvc3-ani-${props2.position}`
      }, {
        default: () => visible.value && vue.createVNode("div", {
          "class": popupClasses.value,
          "style": contentStyle.value
        }, [slots.default?.()])
      })]);
    }
  });
  Popup.install = (app) => {
    app.component("Popup", Popup);
  };
  const _Popup = Popup;
  const AreaPicker = vue.defineAsyncComponent(() => Promise.resolve().then(() => areaPicker$1));
  const DatePicker = vue.defineAsyncComponent(() => Promise.resolve().then(() => datePicker$1));
  const NormalPicker = vue.defineAsyncComponent(() => Promise.resolve().then(() => normalPicker$1));
  const prefixCls$k = "dpzvc3-picker";
  const LIST = ["DatePicker", "AreaPicker", "NormalPicker"];
  const Picker = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Picker",
    components: {
      Popup: _Popup,
      AreaPicker,
      DatePicker,
      NormalPicker
    },
    props: {
      type: {
        type: String,
        default: "DatePicker",
        validator: (val) => LIST.includes(val)
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      /** AreaPicker props */
      addressValue: String,
      styles: {
        type: Object,
        default: () => ({})
      },
      valueSeparator: {
        type: String,
        default: "/"
      },
      /** DatePicker props */
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
      /** NormalPicker props */
      list: {
        type: Array,
        default: () => []
      },
      initArr: {
        type: Array,
        default: () => []
      }
    },
    emits: ["update:modelValue", "sure", "cancle", "normal-change"],
    setup(props2, {
      emit
    }) {
      const visible = vue.ref(props2.modelValue);
      vue.watch(() => props2.modelValue, (val) => {
        visible.value = val;
      });
      vue.watch(visible, (val) => {
        emit("update:modelValue", val);
      });
      const wrapperClass = vue.computed(() => [`${prefixCls$k}-wrapper`]);
      const contentClass = vue.computed(() => [`${prefixCls$k}-content`]);
      const onOk = (val) => {
        emit("update:modelValue", false);
        emit("sure", val);
      };
      const onFail = () => {
        emit("update:modelValue", false);
        emit("cancle");
      };
      const onNormalChange = (val) => {
        emit("normal-change", val);
      };
      vue.provide("DpzVc3Picker", {
        pickerOnOk: onOk,
        pickeronFail: onFail,
        pickerOnNormalChange: onNormalChange
      });
      return () => vue.createVNode(_Popup, {
        "modelValue": visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        "height": "284px",
        "position": "bottom"
      }, {
        default: () => [vue.createVNode("div", {
          "class": wrapperClass.value
        }, [vue.createVNode("div", {
          "class": contentClass.value
        }, [props2.type === "AreaPicker" && vue.createVNode(AreaPicker, {
          "styles": props2.styles,
          "address-value": props2.addressValue,
          "value-separator": props2.valueSeparator,
          "onOk": onOk,
          "onFail": onFail
        }, null), props2.type === "DatePicker" && vue.createVNode(DatePicker, {
          "year": props2.year,
          "month": props2.month,
          "day": props2.day,
          "date-value": props2.dateValue,
          "value-separator": props2.valueSeparator,
          "onOk": onOk,
          "onFail": onFail
        }, null), props2.type === "NormalPicker" && vue.createVNode(NormalPicker, {
          "list": props2.list,
          "init-arr": props2.initArr,
          "onOk": onOk,
          "onFail": onFail,
          "onScroll": onNormalChange
        }, null)])])]
      });
    }
  });
  Picker.install = (app) => {
    app.component("Picker", Picker);
  };
  const _Picker = Picker;
  const prefixCls$j = "dpzvc3-radiobox";
  const radioGroupKey = "radioBoxGroup";
  const RadioBox = /* @__PURE__ */ vue.defineComponent({
    name: "RadioBox",
    props: {
      label: {
        type: [String, Number],
        required: true
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "on-change"],
    setup(props2, {
      emit,
      slots
    }) {
      const slotEl = vue.ref(null);
      const show = vue.ref(true);
      const group = vue.inject(radioGroupKey, null);
      const isChecked = vue.computed(() => {
        if (group) {
          return group.currentValue.value === props2.label;
        }
        return !!props2.modelValue;
      });
      const classes = vue.computed(() => [prefixCls$j]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$j}-wrapper`, {
        [`${prefixCls$j}-checked`]: isChecked.value,
        [`${prefixCls$j}-disable`]: props2.disable
      }]);
      const innerClasses = vue.computed(() => [`${prefixCls$j}-inner`]);
      const inputClass = vue.computed(() => [`${prefixCls$j}-input`]);
      const handleChange = (e2) => {
        if (props2.disable) return;
        const checked = e2.target.checked;
        if (group) {
          group.change(props2.label);
        } else {
          emit("update:modelValue", checked);
          emit("on-change", checked);
        }
      };
      vue.onMounted(() => {
        if (!group) {
          if (slotEl.value && !slotEl.value.innerHTML) {
            show.value = false;
          }
        }
      });
      return () => vue.createVNode("label", {
        "class": classes.value
      }, [vue.createVNode("span", {
        "class": wrapperClasses.value
      }, [vue.createVNode("span", {
        "class": innerClasses.value
      }, [vue.createVNode("input", {
        "type": "radio",
        "disabled": props2.disable,
        "checked": isChecked.value,
        "class": inputClass.value,
        "onChange": handleChange
      }, null)])]), show.value && (slots.default ? slots.default() : vue.createVNode("span", {
        "ref": slotEl
      }, [props2.label]))]);
    }
  });
  const prefixCls$i = "dpzvc3-radioBoxGroup";
  const RadioBoxGroup = /* @__PURE__ */ vue.defineComponent({
    name: "DpzVcRadioGroup",
    props: {
      modelValue: {
        type: [String, Number, Boolean],
        default: ""
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "on-change", "on-form-change"],
    setup(props2, {
      emit,
      slots
    }) {
      const currentValue = vue.ref(props2.modelValue);
      const change = (val) => {
        currentValue.value = val;
        emit("update:modelValue", val);
        emit("on-change", val);
        emit("on-form-change", val);
      };
      vue.provide("radioBoxGroup", {
        currentValue,
        change
      });
      vue.watch(() => props2.modelValue, (val) => {
        currentValue.value = val;
      });
      const classes = vue.computed(() => [prefixCls$i, {
        [`${prefixCls$i}-vertical`]: props2.vertical
      }]);
      return () => vue.createVNode("div", {
        "class": classes.value
      }, [slots.default?.()]);
    }
  });
  RadioBox.install = (app) => {
    app.component("RadioBox", RadioBox);
  };
  const _RadioBox = RadioBox;
  RadioBoxGroup.install = (app) => {
    app.component("RadioBoxGroup", RadioBoxGroup);
  };
  const _RadioBoxGroup = RadioBoxGroup;
  const rafTimeout = (callback, delay) => {
    let start = null;
    let rafId;
    function loop(timestamp) {
      if (!start) start = timestamp;
      if (timestamp - start >= delay) {
        callback();
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  };
  const prefixCls$h = "dpzvc3-swipe";
  const Swipe = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Swipe",
    props: {
      auto: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        default: () => []
      },
      startIndex: {
        type: Number,
        default: 0
      },
      height: {
        type: [Number, String],
        default: "auto"
      },
      dots: {
        type: String,
        default: "bottom"
      },
      multiple: {
        type: Boolean,
        default: false
      },
      distanceIndex: {
        type: Number,
        default: 1.5
      },
      loop: {
        type: Boolean,
        default: true
      },
      speed: {
        type: Number,
        default: 2
      },
      perpage: {
        type: Number,
        default: 1
      }
    },
    setup(props2, {
      slots
    }) {
      const swipeRef = vue.ref(null);
      const wrapper = vue.ref(null);
      const clientWidth = vue.ref(0);
      const translateX = vue.ref(0);
      const currentTranslateX = vue.ref(0);
      const dragging = vue.ref(false);
      const autoSwipe = vue.ref(true);
      const startX = vue.ref(0);
      const distance = vue.ref(0);
      const slideIndex = vue.ref(props2.startIndex);
      const timer = vue.ref(null);
      const localList = vue.ref([...props2.list]);
      const transitionRef = vue.ref("transform .2s ease-out");
      const isMultiple = vue.computed(() => {
        if (props2.perpage <= 1) return false;
        const page = props2.perpage;
        const result = [];
        let temp = [];
        localList.value.forEach((item, idx) => {
          temp.push(item);
          if (temp.length === page || idx === localList.value.length - 1) {
            result.push(temp);
            temp = [];
          }
        });
        localList.value = result;
        return true;
      });
      const arrayList = vue.computed(() => {
        if (!localList.value.length) return [];
        return props2.loop ? [...localList.value, localList.value[0]] : localList.value;
      });
      const dotLength = vue.computed(() => localList.value.length);
      const minIndex = vue.computed(() => 0);
      const maxIndex = vue.computed(() => props2.loop ? arrayList.value.length - 2 : arrayList.value.length - 1);
      const classes = vue.computed(() => [prefixCls$h]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$h}-wrapper`, {
        [`${prefixCls$h}-dragging`]: dragging.value
      }]);
      const multipleClass = `${prefixCls$h}-multiple`;
      const singleClass = `${prefixCls$h}-single`;
      const itemClasses = vue.computed(() => [`${prefixCls$h}-item`, {
        multiple: isMultiple.value
      }]);
      const dotsClasses = vue.computed(() => [`${prefixCls$h}-dots`, {
        [`${prefixCls$h}-dots-bottom`]: props2.dots === "bottom",
        [`${prefixCls$h}-dots-top`]: props2.dots === "top"
      }]);
      const wrapperStyle = vue.computed(() => ({
        width: `${arrayList.value.length * clientWidth.value}px`,
        transform: `translate3d(${translateX.value}px,0,0)`,
        transition: transitionRef.value
      }));
      function choose(item, index, e2) {
        if (item.onClick) {
          item.onClick(item, index);
        } else if (item.link) {
          if (/https?:\/\//i.test(item.link)) {
            window.location.href = item.link;
          }
        }
      }
      function onTouchStart(e2) {
        dragging.value = true;
        autoSwipe.value = false;
        startX.value = e2.touches[0].clientX;
        currentTranslateX.value = translateX.value;
        distance.value = 0;
        clearTimer();
      }
      function onTouchMove(e2) {
        const currentX = e2.touches[0].clientX;
        distance.value = props2.distanceIndex ? (currentX - startX.value) / props2.distanceIndex : currentX - startX.value;
        translateX.value = currentTranslateX.value + distance.value;
      }
      function onTouchEnd() {
        if (distance.value < 0 && Math.abs(distance.value) > clientWidth.value / 5) {
          if (props2.loop) {
            onLoopSlideLeft();
          } else {
            onSlideLeft();
          }
        } else if (distance.value > 0 && Math.abs(distance.value) > clientWidth.value / 5) {
          if (props2.loop) {
            onLoopSlideRight();
          } else {
            onSlideRight();
          }
        } else {
          translateX.value = currentTranslateX.value;
        }
        dragging.value = false;
        autoSwipe.value = true;
        if (props2.auto) {
          autoSlide();
        }
      }
      function onSlideLeft() {
        if (slideIndex.value < maxIndex.value) slideIndex.value++;
        translateX.value = -slideIndex.value * clientWidth.value;
      }
      function onSlideRight() {
        if (slideIndex.value > minIndex.value) slideIndex.value--;
        translateX.value = -slideIndex.value * clientWidth.value;
      }
      function onLoopSlideLeft() {
        onSlideLeft();
        if (slideIndex.value > maxIndex.value) {
          slideIndex.value = maxIndex.value;
        }
      }
      function onLoopSlideRight() {
        onSlideRight();
        if (slideIndex.value < minIndex.value) {
          slideIndex.value = minIndex.value;
        }
      }
      function autoSlide() {
        timer.value = rafTimeout(() => {
          if (!dragging.value && autoSwipe.value) {
            translateX.value -= clientWidth.value;
            slideIndex.value++;
            if (slideIndex.value > maxIndex.value && props2.loop) {
              slideIndex.value = minIndex.value;
              wrapper.value?.addEventListener("transitionend", resetSlide, false);
            }
            autoSlide();
          }
        }, props2.speed < 1 ? 1e3 : props2.speed * 1e3);
      }
      function resetSlide() {
        wrapper.value?.removeEventListener("transitionend", resetSlide);
        slideIndex.value = minIndex.value;
        autoSwipe.value = false;
        transitionRef.value = "none";
        translateX.value = -slideIndex.value * clientWidth.value;
        setTimeout(() => {
          autoSwipe.value = true;
          transitionRef.value = "transform .2s ease-out";
        });
      }
      function clearTimer() {
        timer.value?.();
        timer.value = null;
      }
      function onResize() {
        clientWidth.value = swipeRef.value?.clientWidth || 0;
      }
      vue.onMounted(() => {
        clientWidth.value = swipeRef.value?.clientWidth || 0;
        if (props2.auto) {
          autoSlide();
        }
        wrapper.value?.addEventListener("touchstart", onTouchStart);
        wrapper.value?.addEventListener("touchmove", onTouchMove);
        wrapper.value?.addEventListener("touchend", onTouchEnd);
        window.addEventListener("resize", onResize);
      });
      vue.onBeforeUnmount(() => {
        wrapper.value?.removeEventListener("touchstart", onTouchStart);
        wrapper.value?.removeEventListener("touchmove", onTouchMove);
        wrapper.value?.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("resize", onResize);
        clearTimer();
      });
      return () => vue.createVNode("div", {
        "ref": swipeRef,
        "class": classes.value,
        "style": {
          height: props2.height
        }
      }, [vue.createVNode("div", {
        "ref": wrapper,
        "class": wrapperClasses.value,
        "style": wrapperStyle.value
      }, [arrayList.value.map((item, index) => vue.createVNode("div", {
        "key": index,
        "class": itemClasses.value
      }, [isMultiple.value ? item.map((sub, i2) => vue.createVNode("a", {
        "key": i2,
        "class": multipleClass,
        "onClick": (e2) => choose(sub, i2)
      }, [slots.default?.({
        item: sub,
        index: i2
      }) ?? vue.createVNode(vue.Fragment, null, [vue.createVNode("img", {
        "src": sub.image
      }, null), vue.createVNode("span", null, [sub.spec])])])) : vue.createVNode("a", {
        "class": singleClass,
        "onClick": (e2) => choose(item, index)
      }, [slots.default?.({
        item,
        index
      }) ?? vue.createVNode(vue.Fragment, null, [vue.createVNode("img", {
        "src": item.image
      }, null), vue.createVNode("span", null, [item.spec])])])]))]), vue.createVNode("div", {
        "class": dotsClasses.value
      }, [Array.from({
        length: dotLength.value
      }).map((_2, i2) => vue.createVNode("span", {
        "key": i2,
        "class": ["dpzvc3-swipe-dots-item", i2 === slideIndex.value ? "active" : ""]
      }, null))])]);
    }
  });
  Swipe.install = (app) => {
    app.component("Swipe", Swipe);
  };
  const _Swipe = Swipe;
  const prefixCls$g = "dpzvc3-tab";
  const Tab = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Tab",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Boolean,
        default: true
      },
      index: {
        type: [Number, String],
        default: 0
      },
      border: {
        type: Boolean,
        default: true
      },
      styles: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props2) {
      const show = vue.ref(props2.modelValue);
      vue.watch(() => props2.modelValue, (val) => {
        show.value = val;
      });
      const classes = vue.computed(() => [prefixCls$g]);
      const getStyles = vue.computed(() => ({
        ...props2.styles
      }));
      const itemClass = (index) => {
        const _class = [`tab-item-${index}`];
        if (Number(props2.index) === Number(index)) _class.push("cur");
        return _class;
      };
      const getIconHtml = (index) => {
        const item = props2.items[index];
        if (!item) return "";
        return Number(props2.index) === Number(index) ? item.iconCur || item.icon : item.icon;
      };
      return () => show.value && vue.createVNode("div", {
        "class": classes.value,
        "style": getStyles.value
      }, [vue.createVNode("ul", null, [props2.items?.map((item, idx) => {
        const isExternal = /^(http|https):\/\//i.test(item.path);
        const iconHtml = getIconHtml(idx);
        const cls = itemClass(idx);
        return vue.createVNode("li", {
          "key": idx
        }, [isExternal ? vue.createVNode("a", {
          "href": item.path,
          "class": cls
        }, [vue.createVNode("span", {
          "innerHTML": iconHtml
        }, null), vue.createVNode("p", null, [item.name])]) : vue.createVNode(vueRouter.RouterLink, {
          "to": item.path,
          "class": cls
        }, {
          default: () => [vue.createVNode("span", {
            "innerHTML": iconHtml
          }, null), vue.createVNode("p", null, [item.name])]
        })]);
      })])]);
    }
  });
  Tab.install = (app) => {
    app.component("Tab", Tab);
  };
  const _Tab = Tab;
  const prefixCls$f = "dpzvc3-textBar";
  const Text = /* @__PURE__ */ vue.defineComponent({
    name: "TextBar",
    props: {
      modelValue: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "text"
      },
      placeholder: {
        type: [String, Number],
        default: "请输入"
      },
      rows: Number,
      autofocus: {
        type: Boolean,
        default: true
      },
      inputStyles: {
        type: Object,
        default: () => ({})
      },
      maxlength: Number,
      name: String,
      readonly: {
        type: Boolean,
        default: false
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue", "input", "on-input", "on-enter", "on-change"],
    setup(props2, {
      emit
    }) {
      const currentVal = vue.ref(props2.modelValue);
      vue.watch(() => props2.modelValue, (val) => {
        currentVal.value = val;
      });
      vue.watch(currentVal, (val) => {
        emit("input", val);
        emit("on-input", val);
        emit("update:modelValue", val);
      });
      const classes = vue.computed(() => [prefixCls$f]);
      const inputClasses = vue.computed(() => [`${prefixCls$f}-input`]);
      const textareaClasses = vue.computed(() => [`${prefixCls$f}-textarea`]);
      const changeInput = (e2) => {
        const target = e2.target;
        currentVal.value = target.value;
        emit("input", currentVal.value);
        emit("on-input", e2);
        emit("update:modelValue", currentVal.value);
        emit("on-change", e2);
      };
      const enterInput = (e2) => {
        emit("on-enter", e2);
      };
      return () => {
        if (props2.type !== "textarea") {
          return vue.createVNode("div", {
            "class": classes.value,
            "style": props2.inputStyles
          }, [vue.createVNode("label", {
            "class": inputClasses.value,
            "style": props2.inputStyles
          }, [vue.createVNode("input", {
            "type": props2.type,
            "autofocus": props2.autofocus,
            "value": currentVal.value,
            "placeholder": String(props2.placeholder),
            "readonly": props2.readonly,
            "maxlength": props2.maxlength,
            "name": props2.name,
            "disabled": props2.disable,
            "onInput": changeInput,
            "onBlur": changeInput,
            "onFocus": changeInput,
            "onKeyup": (e2) => e2.key === "Enter" && enterInput(e2),
            "onChange": changeInput
          }, null)])]);
        } else {
          return vue.createVNode("div", {
            "class": classes.value,
            "style": props2.inputStyles
          }, [vue.createVNode("label", {
            "class": textareaClasses.value
          }, [vue.createVNode("textarea", {
            "autofocus": props2.autofocus,
            "value": currentVal.value,
            "placeholder": String(props2.placeholder),
            "readonly": props2.readonly,
            "maxlength": props2.maxlength,
            "name": props2.name,
            "rows": props2.rows,
            "disabled": props2.disable,
            "onInput": changeInput,
            "onBlur": changeInput,
            "onFocus": changeInput,
            "onKeyup": (e2) => e2.key === "Enter" && enterInput(e2),
            "onChange": changeInput
          }, null)])]);
        }
      };
    }
  });
  const Prompt$1 = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Prompt",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ""
      },
      closable: {
        type: Boolean,
        default: true
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      title: String,
      width: {
        type: String,
        default: "220px"
      },
      okText: {
        type: String,
        default: "确定"
      },
      cancleText: {
        type: String,
        default: "取消"
      },
      loading: {
        type: Boolean,
        default: false
      },
      styles: Object,
      spec: {
        type: String,
        default: "提示"
      },
      validator: {
        type: [RegExp, Function],
        default: null
      },
      msg: String,
      placeholderText: String,
      onOk: {
        type: Function,
        default: () => {
        }
      },
      onCancle: {
        type: Function,
        default: () => {
        }
      }
    },
    emits: ["update:value", "on-ok", "on-cancle"],
    setup(props2, {
      emit
    }) {
      const visible = vue.ref(props2.value);
      const texts = vue.ref(props2.text);
      const message2 = vue.ref(props2.msg || "");
      const placeholder = vue.ref(props2.placeholderText);
      const buttonLoading = vue.ref(false);
      vue.watch(() => props2.value, (val) => {
        visible.value = val;
      });
      vue.watch(() => props2.text, (val) => {
        texts.value = val;
      });
      vue.watch(() => props2.loading, (val) => {
        buttonLoading.value = val;
      });
      const ok = () => {
        let valid = true;
        if (props2.validator) {
          if (props2.validator instanceof RegExp) {
            valid = props2.validator.test(texts.value);
          } else if (typeof props2.validator === "function") {
            valid = props2.validator(texts.value);
          }
        }
        if (valid !== true) {
          message2.value = typeof valid === "string" ? valid : "";
          return;
        }
        emit("update:value", false);
        props2.onOk?.(texts.value);
        emit("on-ok", texts.value);
      };
      const cancle = () => {
        emit("update:value", false);
        props2.onCancle?.();
        emit("on-cancle");
      };
      return () => vue.createVNode(Modal$1, {
        "modelValue": visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        "width": props2.width,
        "title": props2.title,
        "style": props2.styles,
        "maskClosable": props2.maskClosable
      }, {
        header: () => vue.createVNode("div", {
          "class": "dpzvc3-modal-header-inner ellipse-fir",
          "innerHTML": props2.title
        }, null),
        body: () => vue.createVNode("div", {
          "class": "dpzvc3-prompt-body-inner"
        }, [vue.createVNode("div", {
          "class": "dpzvc3-prompt-content"
        }, [vue.createVNode("span", {
          "class": "dpzvc3-prompt-spec"
        }, [props2.spec]), vue.createVNode(Text, {
          "modelValue": texts.value,
          "onUpdate:modelValue": ($event) => texts.value = $event,
          "type": "text",
          "placeholder": placeholder.value
        }, null), message2.value && vue.createVNode("div", {
          "class": "dpzvc3-prompt-error",
          "innerHTML": message2.value
        }, null)])]),
        footer: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(DpButton, {
          "styles": {
            background: "#ffffff",
            color: "red"
          },
          "onClick": ok
        }, {
          "button-inner": () => props2.okText
        }), vue.createVNode(DpButton, {
          "styles": {
            background: "#ffffff",
            color: "#ccc"
          },
          "onClick": cancle
        }, {
          "button-inner": () => props2.cancleText
        })])
      });
    }
  });
  function createPromptInstance(properties = {}) {
    const container2 = document.createElement("div");
    document.body.appendChild(container2);
    const props2 = {
      value: false,
      text: "",
      placeholderText: "请输入",
      width: "70%",
      title: "",
      okText: "确定",
      cancleText: "取消",
      loading: false,
      showCancle: true,
      spec: "",
      message: "",
      validator: null,
      onOk: () => {
      },
      onCancle: () => {
      },
      ...properties
    };
    const mergeProps = (target, source) => {
      Object.keys(source).forEach((key) => {
        target[key] = source[key];
      });
    };
    const updateVNode = () => {
      const vnode = vue.createVNode(Prompt$1, {
        ...props2,
        // 给动态挂载组件绑定 update:value 事件
        "onUpdate:value": (val) => {
          if (val === false) {
            vnode.component.props.value = false;
            destroy();
          }
        },
        onRemove: destroy
      });
      vue.render(vnode, container2);
    };
    const destroy = () => {
      props2.value = false;
      setTimeout(() => {
        vue.render(null, container2);
      }, 300);
    };
    return {
      /**
       * 显示
       */
      show(options = {}) {
        mergeProps(props2, options);
        props2.value = true;
        updateVNode();
      },
      /**
       * 关闭
       */
      remove() {
        props2.value = false;
        destroy();
      }
      // component: instance
    };
  }
  let promptInstance;
  function getPromptInstance() {
    if (!promptInstance) {
      promptInstance = createPromptInstance({
        closable: true,
        maskClosable: false
        // footerHide: false
      });
    }
    return promptInstance;
  }
  function confirm(options = {}) {
    const instance2 = getPromptInstance();
    options.onRemove = () => {
      promptInstance = null;
    };
    instance2.show(options);
  }
  const Prompt = {
    info: (props2 = {}) => {
      props2.showCancle = true;
      return confirm(props2);
    },
    remove: () => {
      if (!promptInstance) return false;
      const instance2 = getPromptInstance();
      instance2.remove();
    }
  };
  const prefixCls$e = "dpzvc3-slideBar";
  const SlideBar = /* @__PURE__ */ vue.defineComponent({
    name: "SlideBar",
    props: {
      scrollHeight: {
        type: [String, Number],
        default: "30px"
      },
      height: {
        type: [String, Number],
        default: "100%"
      },
      styles: {
        type: Object,
        default: () => ({})
      },
      childWidth: {
        type: Number,
        default: 70
      },
      scrollColor: {
        type: String,
        default: "#036eb8"
      },
      textAlign: {
        type: String,
        default: "center"
      },
      flex: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "normal"
      },
      list: {
        type: Array,
        default: () => [{
          name: "1"
        }, {
          name: "2"
        }, {
          name: "3"
        }, {
          name: "4"
        }]
      },
      index: {
        type: Number,
        default: 0
      },
      distanceIndex: {
        type: Number,
        default: 1.5
      },
      canDrag: {
        type: Boolean,
        default: true
      }
    },
    emits: ["on-change"],
    setup(props2, {
      emit,
      slots
    }) {
      const headerRef = vue.ref(null);
      const contentRef = vue.ref(null);
      const startIndex = vue.ref(props2.index ?? 0);
      const clientWidth = vue.ref(0);
      const dragging = vue.ref(false);
      const distance = vue.ref(0);
      const startTranslateX = vue.ref(0);
      const startX = vue.ref(0);
      const items = vue.ref(props2.list ?? []);
      const isFlex = vue.ref(!!props2.flex);
      const fixed = vue.ref(false);
      const translateX = vue.ref(0);
      const getItemWidth = vue.computed(() => isFlex.value ? clientWidth.value / items.value.length : props2.childWidth);
      const classes = vue.computed(() => [prefixCls$e]);
      const headerClasses = vue.computed(() => [`${prefixCls$e}-header`, {
        fixed: fixed.value
      }]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$e}-wrapper`, isFlex.value ? `${prefixCls$e}-flex` : `${prefixCls$e}-slide`, {
        normal: props2.type === "normal" && isFlex.value,
        vertical: props2.type === "vertical" && isFlex.value
      }]);
      const contentClasses = vue.computed(() => [`${prefixCls$e}-content`, {
        [`${prefixCls$e}-dragging`]: dragging.value
      }]);
      const absoluteClass = vue.computed(() => [`${prefixCls$e}-wrapper-absolute`]);
      const containerClass = vue.computed(() => [`${prefixCls$e}-container`]);
      const getStyles = vue.computed(() => ({
        ...props2.styles
      }));
      const getContainerStyle = vue.computed(() => ({
        width: clientWidth.value * items.value.length + "px",
        transform: `translate3d(${translateX.value}px,0,0)`
      }));
      const getScrollStyle = vue.computed(() => ({
        width: getItemWidth.value + "px",
        transform: `translate3d(${startIndex.value * getItemWidth.value}px,0,0)`,
        backgroundColor: props2.scrollColor
      }));
      const maxIndex = vue.computed(() => items.value.length - 1);
      const changeBar = (index) => {
        if (startIndex.value === index) return;
        startIndex.value = index;
        translateX.value = -index * clientWidth.value;
        emit("on-change", index);
      };
      const onTouchStart = (e2) => {
        startTranslateX.value = translateX.value;
        distance.value = 0;
        startX.value = e2.touches[0].clientX;
        dragging.value = true;
      };
      const onTouchMove = (e2) => {
        const currentX = e2.touches[0].clientX;
        distance.value = props2.distanceIndex ? (currentX - startX.value) / props2.distanceIndex : currentX - startX.value;
        translateX.value = startTranslateX.value + distance.value;
      };
      const onTouchEnd = () => {
        if (distance.value < 0 && Math.abs(distance.value) > clientWidth.value / 2) {
          slideLeft();
        } else if (distance.value > 0 && Math.abs(distance.value) > clientWidth.value / 2) {
          slideRight();
        } else {
          translateX.value = startTranslateX.value;
        }
        dragging.value = false;
      };
      const slideLeft = () => {
        if (startIndex.value >= maxIndex.value) {
          translateX.value = startTranslateX.value;
        } else {
          startIndex.value++;
          translateX.value = startTranslateX.value - clientWidth.value;
        }
        emit("on-change", startIndex.value);
      };
      const slideRight = () => {
        if (startIndex.value <= 0) {
          translateX.value = startTranslateX.value;
        } else {
          startIndex.value--;
          translateX.value = startTranslateX.value + clientWidth.value;
        }
        emit("on-change", startIndex.value);
      };
      const onScroll = () => {
        if (!headerRef.value) return;
        fixed.value = headerRef.value.getBoundingClientRect().top <= 0;
      };
      const onResize = () => {
        if (!headerRef.value) return;
        clientWidth.value = headerRef.value.clientWidth;
      };
      vue.onMounted(() => {
        if (!headerRef.value) return;
        clientWidth.value = headerRef.value.clientWidth;
        translateX.value = -startIndex.value * clientWidth.value;
        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onScroll);
        if (props2.canDrag && contentRef.value) {
          contentRef.value.addEventListener("touchstart", onTouchStart);
          contentRef.value.addEventListener("touchmove", onTouchMove);
          contentRef.value.addEventListener("touchend", onTouchEnd);
        }
      });
      vue.onBeforeUnmount(() => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        if (props2.canDrag && contentRef.value) {
          contentRef.value.removeEventListener("touchstart", onTouchStart);
          contentRef.value.removeEventListener("touchmove", onTouchMove);
          contentRef.value.removeEventListener("touchend", onTouchEnd);
        }
      });
      return () => vue.createVNode("div", {
        "class": classes.value,
        "style": getStyles.value
      }, [vue.createVNode("div", {
        "ref": headerRef,
        "class": headerClasses.value
      }, [vue.createVNode("div", {
        "class": wrapperClasses.value,
        "style": {
          width: isFlex.value ? "auto" : items.value.length * getItemWidth.value + "px"
        }
      }, [items.value.map((item, key) => vue.createVNode("div", {
        "key": key,
        "class": ["dpzvc3-slideBar-child", startIndex.value === key && "active", !isFlex.value && "normalChild"],
        "style": {
          textAlign: props2.textAlign,
          width: getItemWidth.value + "px",
          height: props2.scrollHeight,
          lineHeight: String(props2.scrollHeight)
        },
        "onClick": () => changeBar(key)
      }, [slots[`slide-bar-header-${key}`] ? slots[`slide-bar-header-${key}`]() : vue.createVNode("a", {
        "class": "content ellipse-fir"
      }, [item.name])]))]), vue.createVNode("div", {
        "class": absoluteClass.value,
        "style": getScrollStyle.value
      }, null)]), vue.createVNode("div", {
        "class": containerClass.value,
        "style": {
          height: props2.height
        }
      }, [vue.createVNode("div", {
        "ref": contentRef,
        "class": contentClasses.value,
        "style": getContainerStyle.value
      }, [items.value.map((_2, index) => vue.createVNode("div", {
        "key": index,
        "class": ["dpzvc3-slideBar-content-item", startIndex.value === index && "active"],
        "style": {
          width: clientWidth.value + "px"
        }
      }, [slots[`slot-item-${index}`]?.()]))])])]);
    }
  });
  SlideBar.install = (app) => {
    app.component("SlideBar", SlideBar);
  };
  const _SlideBar = SlideBar;
  Text.install = (app) => {
    app.component("TextBar", Text);
  };
  const _Text = Text;
  var e = "undefined" != typeof self ? self : global;
  const t = "undefined" != typeof navigator, i = t && "undefined" == typeof HTMLImageElement, n = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node), s = e.Buffer, r = e.BigInt, a = !!s, o = (e2) => e2;
  function l(e2, t2 = o) {
    if (n) try {
      return "function" == typeof require ? Promise.resolve(t2(require(e2))) : import(
        /* webpackIgnore: true */
        e2
      ).then(t2);
    } catch (t3) {
      console.warn(`Couldn't load ${e2}`);
    }
  }
  let h = e.fetch;
  const u = (e2) => h = e2;
  if (!e.fetch) {
    const e2 = l("http", ((e3) => e3)), t2 = l("https", ((e3) => e3)), i2 = (n2, { headers: s2 } = {}) => new Promise((async (r2, a2) => {
      let { port: o2, hostname: l2, pathname: h2, protocol: u2, search: c2 } = new URL(n2);
      const f2 = { method: "GET", hostname: l2, path: encodeURI(h2) + c2, headers: s2 };
      "" !== o2 && (f2.port = Number(o2));
      const d2 = ("https:" === u2 ? await t2 : await e2).request(f2, ((e3) => {
        if (301 === e3.statusCode || 302 === e3.statusCode) {
          let t3 = new URL(e3.headers.location, n2).toString();
          return i2(t3, { headers: s2 }).then(r2).catch(a2);
        }
        r2({ status: e3.statusCode, arrayBuffer: () => new Promise(((t3) => {
          let i3 = [];
          e3.on("data", ((e4) => i3.push(e4))), e3.on("end", (() => t3(Buffer.concat(i3))));
        })) });
      }));
      d2.on("error", a2), d2.end();
    }));
    u(i2);
  }
  function c(e2, t2, i2) {
    return t2 in e2 ? Object.defineProperty(e2, t2, { value: i2, enumerable: true, configurable: true, writable: true }) : e2[t2] = i2, e2;
  }
  const f = (e2) => p(e2) ? void 0 : e2, d = (e2) => void 0 !== e2;
  function p(e2) {
    return void 0 === e2 || (e2 instanceof Map ? 0 === e2.size : 0 === Object.values(e2).filter(d).length);
  }
  function g(e2) {
    let t2 = new Error(e2);
    throw delete t2.stack, t2;
  }
  function m(e2) {
    return "" === (e2 = (function(e3) {
      for (; e3.endsWith("\0"); ) e3 = e3.slice(0, -1);
      return e3;
    })(e2).trim()) ? void 0 : e2;
  }
  function S(e2) {
    let t2 = (function(e3) {
      let t3 = 0;
      return e3.ifd0.enabled && (t3 += 1024), e3.exif.enabled && (t3 += 2048), e3.makerNote && (t3 += 2048), e3.userComment && (t3 += 1024), e3.gps.enabled && (t3 += 512), e3.interop.enabled && (t3 += 100), e3.ifd1.enabled && (t3 += 1024), t3 + 2048;
    })(e2);
    return e2.jfif.enabled && (t2 += 50), e2.xmp.enabled && (t2 += 2e4), e2.iptc.enabled && (t2 += 14e3), e2.icc.enabled && (t2 += 6e3), t2;
  }
  const C = (e2) => String.fromCharCode.apply(null, e2), y = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
  function b(e2) {
    return y ? y.decode(e2) : a ? Buffer.from(e2).toString("utf8") : decodeURIComponent(escape(C(e2)));
  }
  class I {
    static from(e2, t2) {
      return e2 instanceof this && e2.le === t2 ? e2 : new I(e2, void 0, void 0, t2);
    }
    constructor(e2, t2 = 0, i2, n2) {
      if ("boolean" == typeof n2 && (this.le = n2), Array.isArray(e2) && (e2 = new Uint8Array(e2)), 0 === e2) this.byteOffset = 0, this.byteLength = 0;
      else if (e2 instanceof ArrayBuffer) {
        void 0 === i2 && (i2 = e2.byteLength - t2);
        let n3 = new DataView(e2, t2, i2);
        this._swapDataView(n3);
      } else if (e2 instanceof Uint8Array || e2 instanceof DataView || e2 instanceof I) {
        void 0 === i2 && (i2 = e2.byteLength - t2), (t2 += e2.byteOffset) + i2 > e2.byteOffset + e2.byteLength && g("Creating view outside of available memory in ArrayBuffer");
        let n3 = new DataView(e2.buffer, t2, i2);
        this._swapDataView(n3);
      } else if ("number" == typeof e2) {
        let t3 = new DataView(new ArrayBuffer(e2));
        this._swapDataView(t3);
      } else g("Invalid input argument for BufferView: " + e2);
    }
    _swapArrayBuffer(e2) {
      this._swapDataView(new DataView(e2));
    }
    _swapBuffer(e2) {
      this._swapDataView(new DataView(e2.buffer, e2.byteOffset, e2.byteLength));
    }
    _swapDataView(e2) {
      this.dataView = e2, this.buffer = e2.buffer, this.byteOffset = e2.byteOffset, this.byteLength = e2.byteLength;
    }
    _lengthToEnd(e2) {
      return this.byteLength - e2;
    }
    set(e2, t2, i2 = I) {
      return e2 instanceof DataView || e2 instanceof I ? e2 = new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength) : e2 instanceof ArrayBuffer && (e2 = new Uint8Array(e2)), e2 instanceof Uint8Array || g("BufferView.set(): Invalid data argument."), this.toUint8().set(e2, t2), new i2(this, t2, e2.byteLength);
    }
    subarray(e2, t2) {
      return t2 = t2 || this._lengthToEnd(e2), new I(this, e2, t2);
    }
    toUint8() {
      return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
    }
    getUint8Array(e2, t2) {
      return new Uint8Array(this.buffer, this.byteOffset + e2, t2);
    }
    getString(e2 = 0, t2 = this.byteLength) {
      return b(this.getUint8Array(e2, t2));
    }
    getLatin1String(e2 = 0, t2 = this.byteLength) {
      let i2 = this.getUint8Array(e2, t2);
      return C(i2);
    }
    getUnicodeString(e2 = 0, t2 = this.byteLength) {
      const i2 = [];
      for (let n2 = 0; n2 < t2 && e2 + n2 < this.byteLength; n2 += 2) i2.push(this.getUint16(e2 + n2));
      return C(i2);
    }
    getInt8(e2) {
      return this.dataView.getInt8(e2);
    }
    getUint8(e2) {
      return this.dataView.getUint8(e2);
    }
    getInt16(e2, t2 = this.le) {
      return this.dataView.getInt16(e2, t2);
    }
    getInt32(e2, t2 = this.le) {
      return this.dataView.getInt32(e2, t2);
    }
    getUint16(e2, t2 = this.le) {
      return this.dataView.getUint16(e2, t2);
    }
    getUint32(e2, t2 = this.le) {
      return this.dataView.getUint32(e2, t2);
    }
    getFloat32(e2, t2 = this.le) {
      return this.dataView.getFloat32(e2, t2);
    }
    getFloat64(e2, t2 = this.le) {
      return this.dataView.getFloat64(e2, t2);
    }
    getFloat(e2, t2 = this.le) {
      return this.dataView.getFloat32(e2, t2);
    }
    getDouble(e2, t2 = this.le) {
      return this.dataView.getFloat64(e2, t2);
    }
    getUintBytes(e2, t2, i2) {
      switch (t2) {
        case 1:
          return this.getUint8(e2, i2);
        case 2:
          return this.getUint16(e2, i2);
        case 4:
          return this.getUint32(e2, i2);
        case 8:
          return this.getUint64 && this.getUint64(e2, i2);
      }
    }
    getUint(e2, t2, i2) {
      switch (t2) {
        case 8:
          return this.getUint8(e2, i2);
        case 16:
          return this.getUint16(e2, i2);
        case 32:
          return this.getUint32(e2, i2);
        case 64:
          return this.getUint64 && this.getUint64(e2, i2);
      }
    }
    toString(e2) {
      return this.dataView.toString(e2, this.constructor.name);
    }
    ensureChunk() {
    }
  }
  function P(e2, t2) {
    g(`${e2} '${t2}' was not loaded, try using full build of exifr.`);
  }
  class k extends Map {
    constructor(e2) {
      super(), this.kind = e2;
    }
    get(e2, t2) {
      return this.has(e2) || P(this.kind, e2), t2 && (e2 in t2 || (function(e3, t3) {
        g(`Unknown ${e3} '${t3}'.`);
      })(this.kind, e2), t2[e2].enabled || P(this.kind, e2)), super.get(e2);
    }
    keyList() {
      return Array.from(this.keys());
    }
  }
  var w = new k("file parser"), T = new k("segment parser"), A = new k("file reader");
  function D(e2, n2) {
    return "string" == typeof e2 ? O(e2, n2) : t && !i && e2 instanceof HTMLImageElement ? O(e2.src, n2) : e2 instanceof Uint8Array || e2 instanceof ArrayBuffer || e2 instanceof DataView ? new I(e2) : t && e2 instanceof Blob ? x(e2, n2, "blob", R) : void g("Invalid input argument");
  }
  function O(e2, i2) {
    return (s2 = e2).startsWith("data:") || s2.length > 1e4 ? v(e2, i2, "base64") : n && e2.includes("://") ? x(e2, i2, "url", M) : n ? v(e2, i2, "fs") : t ? x(e2, i2, "url", M) : void g("Invalid input argument");
    var s2;
  }
  async function x(e2, t2, i2, n2) {
    return A.has(i2) ? v(e2, t2, i2) : n2 ? (async function(e3, t3) {
      let i3 = await t3(e3);
      return new I(i3);
    })(e2, n2) : void g(`Parser ${i2} is not loaded`);
  }
  async function v(e2, t2, i2) {
    let n2 = new (A.get(i2))(e2, t2);
    return await n2.read(), n2;
  }
  const M = (e2) => h(e2).then(((e3) => e3.arrayBuffer())), R = (e2) => new Promise(((t2, i2) => {
    let n2 = new FileReader();
    n2.onloadend = () => t2(n2.result || new ArrayBuffer()), n2.onerror = i2, n2.readAsArrayBuffer(e2);
  }));
  class L extends Map {
    get tagKeys() {
      return this.allKeys || (this.allKeys = Array.from(this.keys())), this.allKeys;
    }
    get tagValues() {
      return this.allValues || (this.allValues = Array.from(this.values())), this.allValues;
    }
  }
  function U(e2, t2, i2) {
    let n2 = new L();
    for (let [e3, t3] of i2) n2.set(e3, t3);
    if (Array.isArray(t2)) for (let i3 of t2) e2.set(i3, n2);
    else e2.set(t2, n2);
    return n2;
  }
  function F(e2, t2, i2) {
    let n2, s2 = e2.get(t2);
    for (n2 of i2) s2.set(n2[0], n2[1]);
  }
  const E = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), G = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"], V = ["jfif", "xmp", "icc", "iptc", "ihdr"], z = ["tiff", ...V], H = ["ifd0", "ifd1", "exif", "gps", "interop"], j = [...z, ...H], W = ["makerNote", "userComment"], K = ["translateKeys", "translateValues", "reviveValues", "multiSegment"], X = [...K, "sanitize", "mergeOutput", "silentErrors"];
  class _ {
    get translate() {
      return this.translateKeys || this.translateValues || this.reviveValues;
    }
  }
  class Y extends _ {
    get needed() {
      return this.enabled || this.deps.size > 0;
    }
    constructor(e2, t2, i2, n2) {
      if (super(), c(this, "enabled", false), c(this, "skip", /* @__PURE__ */ new Set()), c(this, "pick", /* @__PURE__ */ new Set()), c(this, "deps", /* @__PURE__ */ new Set()), c(this, "translateKeys", false), c(this, "translateValues", false), c(this, "reviveValues", false), this.key = e2, this.enabled = t2, this.parse = this.enabled, this.applyInheritables(n2), this.canBeFiltered = H.includes(e2), this.canBeFiltered && (this.dict = E.get(e2)), void 0 !== i2) if (Array.isArray(i2)) this.parse = this.enabled = true, this.canBeFiltered && i2.length > 0 && this.translateTagSet(i2, this.pick);
      else if ("object" == typeof i2) {
        if (this.enabled = true, this.parse = false !== i2.parse, this.canBeFiltered) {
          let { pick: e3, skip: t3 } = i2;
          e3 && e3.length > 0 && this.translateTagSet(e3, this.pick), t3 && t3.length > 0 && this.translateTagSet(t3, this.skip);
        }
        this.applyInheritables(i2);
      } else true === i2 || false === i2 ? this.parse = this.enabled = i2 : g(`Invalid options argument: ${i2}`);
    }
    applyInheritables(e2) {
      let t2, i2;
      for (t2 of K) i2 = e2[t2], void 0 !== i2 && (this[t2] = i2);
    }
    translateTagSet(e2, t2) {
      if (this.dict) {
        let i2, n2, { tagKeys: s2, tagValues: r2 } = this.dict;
        for (i2 of e2) "string" == typeof i2 ? (n2 = r2.indexOf(i2), -1 === n2 && (n2 = s2.indexOf(Number(i2))), -1 !== n2 && t2.add(Number(s2[n2]))) : t2.add(i2);
      } else for (let i2 of e2) t2.add(i2);
    }
    finalizeFilters() {
      !this.enabled && this.deps.size > 0 ? (this.enabled = true, ee(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && ee(this.pick, this.deps);
    }
  }
  var $ = { jfif: false, tiff: true, xmp: false, icc: false, iptc: false, ifd0: true, ifd1: false, exif: true, gps: true, interop: false, ihdr: void 0, makerNote: false, userComment: false, multiSegment: false, skip: [], pick: [], translateKeys: true, translateValues: true, reviveValues: true, sanitize: true, mergeOutput: true, silentErrors: true, chunked: true, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 }, J = /* @__PURE__ */ new Map();
  class q extends _ {
    static useCached(e2) {
      let t2 = J.get(e2);
      return void 0 !== t2 || (t2 = new this(e2), J.set(e2, t2)), t2;
    }
    constructor(e2) {
      super(), true === e2 ? this.setupFromTrue() : void 0 === e2 ? this.setupFromUndefined() : Array.isArray(e2) ? this.setupFromArray(e2) : "object" == typeof e2 ? this.setupFromObject(e2) : g(`Invalid options argument ${e2}`), void 0 === this.firstChunkSize && (this.firstChunkSize = t ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
    }
    setupFromUndefined() {
      let e2;
      for (e2 of G) this[e2] = $[e2];
      for (e2 of X) this[e2] = $[e2];
      for (e2 of W) this[e2] = $[e2];
      for (e2 of j) this[e2] = new Y(e2, $[e2], void 0, this);
    }
    setupFromTrue() {
      let e2;
      for (e2 of G) this[e2] = $[e2];
      for (e2 of X) this[e2] = $[e2];
      for (e2 of W) this[e2] = true;
      for (e2 of j) this[e2] = new Y(e2, true, void 0, this);
    }
    setupFromArray(e2) {
      let t2;
      for (t2 of G) this[t2] = $[t2];
      for (t2 of X) this[t2] = $[t2];
      for (t2 of W) this[t2] = $[t2];
      for (t2 of j) this[t2] = new Y(t2, false, void 0, this);
      this.setupGlobalFilters(e2, void 0, H);
    }
    setupFromObject(e2) {
      let t2;
      for (t2 of (H.ifd0 = H.ifd0 || H.image, H.ifd1 = H.ifd1 || H.thumbnail, Object.assign(this, e2), G)) this[t2] = Z(e2[t2], $[t2]);
      for (t2 of X) this[t2] = Z(e2[t2], $[t2]);
      for (t2 of W) this[t2] = Z(e2[t2], $[t2]);
      for (t2 of z) this[t2] = new Y(t2, $[t2], e2[t2], this);
      for (t2 of H) this[t2] = new Y(t2, $[t2], e2[t2], this.tiff);
      this.setupGlobalFilters(e2.pick, e2.skip, H, j), true === e2.tiff ? this.batchEnableWithBool(H, true) : false === e2.tiff ? this.batchEnableWithUserValue(H, e2) : Array.isArray(e2.tiff) ? this.setupGlobalFilters(e2.tiff, void 0, H) : "object" == typeof e2.tiff && this.setupGlobalFilters(e2.tiff.pick, e2.tiff.skip, H);
    }
    batchEnableWithBool(e2, t2) {
      for (let i2 of e2) this[i2].enabled = t2;
    }
    batchEnableWithUserValue(e2, t2) {
      for (let i2 of e2) {
        let e3 = t2[i2];
        this[i2].enabled = false !== e3 && void 0 !== e3;
      }
    }
    setupGlobalFilters(e2, t2, i2, n2 = i2) {
      if (e2 && e2.length) {
        for (let e3 of n2) this[e3].enabled = false;
        let t3 = Q(e2, i2);
        for (let [e3, i3] of t3) ee(this[e3].pick, i3), this[e3].enabled = true;
      } else if (t2 && t2.length) {
        let e3 = Q(t2, i2);
        for (let [t3, i3] of e3) ee(this[t3].skip, i3);
      }
    }
    filterNestedSegmentTags() {
      let { ifd0: e2, exif: t2, xmp: i2, iptc: n2, icc: s2 } = this;
      this.makerNote ? t2.deps.add(37500) : t2.skip.add(37500), this.userComment ? t2.deps.add(37510) : t2.skip.add(37510), i2.enabled || e2.skip.add(700), n2.enabled || e2.skip.add(33723), s2.enabled || e2.skip.add(34675);
    }
    traverseTiffDependencyTree() {
      let { ifd0: e2, exif: t2, gps: i2, interop: n2 } = this;
      n2.needed && (t2.deps.add(40965), e2.deps.add(40965)), t2.needed && e2.deps.add(34665), i2.needed && e2.deps.add(34853), this.tiff.enabled = H.some(((e3) => true === this[e3].enabled)) || this.makerNote || this.userComment;
      for (let e3 of H) this[e3].finalizeFilters();
    }
    get onlyTiff() {
      return !V.map(((e2) => this[e2].enabled)).some(((e2) => true === e2)) && this.tiff.enabled;
    }
    checkLoadedPlugins() {
      for (let e2 of z) this[e2].enabled && !T.has(e2) && P("segment parser", e2);
    }
  }
  function Q(e2, t2) {
    let i2, n2, s2, r2, a2 = [];
    for (s2 of t2) {
      for (r2 of (i2 = E.get(s2), n2 = [], i2)) (e2.includes(r2[0]) || e2.includes(r2[1])) && n2.push(r2[0]);
      n2.length && a2.push([s2, n2]);
    }
    return a2;
  }
  function Z(e2, t2) {
    return void 0 !== e2 ? e2 : void 0 !== t2 ? t2 : void 0;
  }
  function ee(e2, t2) {
    for (let i2 of t2) e2.add(i2);
  }
  c(q, "default", $);
  class te {
    constructor(e2) {
      c(this, "parsers", {}), c(this, "output", {}), c(this, "errors", []), c(this, "pushToErrors", ((e3) => this.errors.push(e3))), this.options = q.useCached(e2);
    }
    async read(e2) {
      this.file = await D(e2, this.options);
    }
    setup() {
      if (this.fileParser) return;
      let { file: e2 } = this, t2 = e2.getUint16(0);
      for (let [i2, n2] of w) if (n2.canHandle(e2, t2)) return this.fileParser = new n2(this.options, this.file, this.parsers), e2[i2] = true;
      this.file.close && this.file.close(), g("Unknown file format");
    }
    async parse() {
      let { output: e2, errors: t2 } = this;
      return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t2.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t2.length > 0 && (e2.errors = t2), f(e2);
    }
    async executeParsers() {
      let { output: e2 } = this;
      await this.fileParser.parse();
      let t2 = Object.values(this.parsers).map((async (t3) => {
        let i2 = await t3.parse();
        t3.assignToOutput(e2, i2);
      }));
      this.options.silentErrors && (t2 = t2.map(((e3) => e3.catch(this.pushToErrors)))), await Promise.all(t2);
    }
    async extractThumbnail() {
      this.setup();
      let { options: e2, file: t2 } = this, i2 = T.get("tiff", e2);
      var n2;
      if (t2.tiff ? n2 = { start: 0, type: "tiff" } : t2.jpeg && (n2 = await this.fileParser.getOrFindSegment("tiff")), void 0 === n2) return;
      let s2 = await this.fileParser.ensureSegmentChunk(n2), r2 = this.parsers.tiff = new i2(s2, e2, t2), a2 = await r2.extractThumbnail();
      return t2.close && t2.close(), a2;
    }
  }
  async function ie(e2, t2) {
    let i2 = new te(t2);
    return await i2.read(e2), i2.parse();
  }
  var ne = Object.freeze({ __proto__: null, parse: ie, Exifr: te, fileParsers: w, segmentParsers: T, fileReaders: A, tagKeys: E, tagValues: B, tagRevivers: N, createDictionary: U, extendDictionary: F, fetchUrlAsArrayBuffer: M, readBlobAsArrayBuffer: R, chunkedProps: G, otherSegments: V, segments: z, tiffBlocks: H, segmentsAndBlocks: j, tiffExtractables: W, inheritables: K, allFormatters: X, Options: q });
  class se {
    constructor(e2, t2, i2) {
      c(this, "errors", []), c(this, "ensureSegmentChunk", (async (e3) => {
        let t3 = e3.start, i3 = e3.size || 65536;
        if (this.file.chunked) if (this.file.available(t3, i3)) e3.chunk = this.file.subarray(t3, i3);
        else try {
          e3.chunk = await this.file.readChunk(t3, i3);
        } catch (t4) {
          g(`Couldn't read segment: ${JSON.stringify(e3)}. ${t4.message}`);
        }
        else this.file.byteLength > t3 + i3 ? e3.chunk = this.file.subarray(t3, i3) : void 0 === e3.size ? e3.chunk = this.file.subarray(t3) : g("Segment unreachable: " + JSON.stringify(e3));
        return e3.chunk;
      })), this.extendOptions && this.extendOptions(e2), this.options = e2, this.file = t2, this.parsers = i2;
    }
    injectSegment(e2, t2) {
      this.options[e2].enabled && this.createParser(e2, t2);
    }
    createParser(e2, t2) {
      let i2 = new (T.get(e2))(t2, this.options, this.file);
      return this.parsers[e2] = i2;
    }
    createParsers(e2) {
      for (let t2 of e2) {
        let { type: e3, chunk: i2 } = t2, n2 = this.options[e3];
        if (n2 && n2.enabled) {
          let t3 = this.parsers[e3];
          t3 && t3.append || t3 || this.createParser(e3, i2);
        }
      }
    }
    async readSegments(e2) {
      let t2 = e2.map(this.ensureSegmentChunk);
      await Promise.all(t2);
    }
  }
  class re {
    static findPosition(e2, t2) {
      let i2 = e2.getUint16(t2 + 2) + 2, n2 = "function" == typeof this.headerLength ? this.headerLength(e2, t2, i2) : this.headerLength, s2 = t2 + n2, r2 = i2 - n2;
      return { offset: t2, length: i2, headerLength: n2, start: s2, size: r2, end: s2 + r2 };
    }
    static parse(e2, t2 = {}) {
      return new this(e2, new q({ [this.type]: t2 }), e2).parse();
    }
    normalizeInput(e2) {
      return e2 instanceof I ? e2 : new I(e2);
    }
    constructor(e2, t2 = {}, i2) {
      c(this, "errors", []), c(this, "raw", /* @__PURE__ */ new Map()), c(this, "handleError", ((e3) => {
        if (!this.options.silentErrors) throw e3;
        this.errors.push(e3.message);
      })), this.chunk = this.normalizeInput(e2), this.file = i2, this.type = this.constructor.type, this.globalOptions = this.options = t2, this.localOptions = t2[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
    }
    translate() {
      this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
    }
    get output() {
      return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
    }
    translateBlock(e2, t2) {
      let i2 = N.get(t2), n2 = B.get(t2), s2 = E.get(t2), r2 = this.options[t2], a2 = r2.reviveValues && !!i2, o2 = r2.translateValues && !!n2, l2 = r2.translateKeys && !!s2, h2 = {};
      for (let [t3, r3] of e2) a2 && i2.has(t3) ? r3 = i2.get(t3)(r3) : o2 && n2.has(t3) && (r3 = this.translateValue(r3, n2.get(t3))), l2 && s2.has(t3) && (t3 = s2.get(t3) || t3), h2[t3] = r3;
      return h2;
    }
    translateValue(e2, t2) {
      return t2[e2] || t2.DEFAULT || e2;
    }
    assignToOutput(e2, t2) {
      this.assignObjectToOutput(e2, this.constructor.type, t2);
    }
    assignObjectToOutput(e2, t2, i2) {
      if (this.globalOptions.mergeOutput) return Object.assign(e2, i2);
      e2[t2] ? Object.assign(e2[t2], i2) : e2[t2] = i2;
    }
  }
  c(re, "headerLength", 4), c(re, "type", void 0), c(re, "multiSegment", false), c(re, "canHandle", (() => false));
  function ae(e2) {
    return 192 === e2 || 194 === e2 || 196 === e2 || 219 === e2 || 221 === e2 || 218 === e2 || 254 === e2;
  }
  function oe(e2) {
    return e2 >= 224 && e2 <= 239;
  }
  function le(e2, t2, i2) {
    for (let [n2, s2] of T) if (s2.canHandle(e2, t2, i2)) return n2;
  }
  class he extends se {
    constructor(...e2) {
      super(...e2), c(this, "appSegments", []), c(this, "jpegSegments", []), c(this, "unknownSegments", []);
    }
    static canHandle(e2, t2) {
      return 65496 === t2;
    }
    async parse() {
      await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
    }
    setupSegmentFinderArgs(e2) {
      true === e2 ? (this.findAll = true, this.wanted = new Set(T.keyList())) : (e2 = void 0 === e2 ? T.keyList().filter(((e3) => this.options[e3].enabled)) : e2.filter(((e3) => this.options[e3].enabled && T.has(e3))), this.findAll = false, this.remaining = new Set(e2), this.wanted = new Set(e2)), this.unfinishedMultiSegment = false;
    }
    async findAppSegments(e2 = 0, t2) {
      this.setupSegmentFinderArgs(t2);
      let { file: i2, findAll: n2, wanted: s2, remaining: r2 } = this;
      if (!n2 && this.file.chunked && (n2 = Array.from(s2).some(((e3) => {
        let t3 = T.get(e3), i3 = this.options[e3];
        return t3.multiSegment && i3.multiSegment;
      })), n2 && await this.file.readWhole()), e2 = this.findAppSegmentsInRange(e2, i2.byteLength), !this.options.onlyTiff && i2.chunked) {
        let t3 = false;
        for (; r2.size > 0 && !t3 && (i2.canReadNextChunk || this.unfinishedMultiSegment); ) {
          let { nextChunkOffset: n3 } = i2, s3 = this.appSegments.some(((e3) => !this.file.available(e3.offset || e3.start, e3.length || e3.size)));
          if (t3 = e2 > n3 && !s3 ? !await i2.readNextChunk(e2) : !await i2.readNextChunk(n3), void 0 === (e2 = this.findAppSegmentsInRange(e2, i2.byteLength))) return;
        }
      }
    }
    findAppSegmentsInRange(e2, t2) {
      t2 -= 2;
      let i2, n2, s2, r2, a2, o2, { file: l2, findAll: h2, wanted: u2, remaining: c2, options: f2 } = this;
      for (; e2 < t2; e2++) if (255 === l2.getUint8(e2)) {
        if (i2 = l2.getUint8(e2 + 1), oe(i2)) {
          if (n2 = l2.getUint16(e2 + 2), s2 = le(l2, e2, n2), s2 && u2.has(s2) && (r2 = T.get(s2), a2 = r2.findPosition(l2, e2), o2 = f2[s2], a2.type = s2, this.appSegments.push(a2), !h2 && (r2.multiSegment && o2.multiSegment ? (this.unfinishedMultiSegment = a2.chunkNumber < a2.chunkCount, this.unfinishedMultiSegment || c2.delete(s2)) : c2.delete(s2), 0 === c2.size))) break;
          f2.recordUnknownSegments && (a2 = re.findPosition(l2, e2), a2.marker = i2, this.unknownSegments.push(a2)), e2 += n2 + 1;
        } else if (ae(i2)) {
          if (n2 = l2.getUint16(e2 + 2), 218 === i2 && false !== f2.stopAfterSos) return;
          f2.recordJpegSegments && this.jpegSegments.push({ offset: e2, length: n2, marker: i2 }), e2 += n2 + 1;
        }
      }
      return e2;
    }
    mergeMultiSegments() {
      if (!this.appSegments.some(((e3) => e3.multiSegment))) return;
      let e2 = (function(e3, t2) {
        let i2, n2, s2, r2 = /* @__PURE__ */ new Map();
        for (let a2 = 0; a2 < e3.length; a2++) i2 = e3[a2], n2 = i2[t2], r2.has(n2) ? s2 = r2.get(n2) : r2.set(n2, s2 = []), s2.push(i2);
        return Array.from(r2);
      })(this.appSegments, "type");
      this.mergedAppSegments = e2.map((([e3, t2]) => {
        let i2 = T.get(e3, this.options);
        if (i2.handleMultiSegments) {
          return { type: e3, chunk: i2.handleMultiSegments(t2) };
        }
        return t2[0];
      }));
    }
    getSegment(e2) {
      return this.appSegments.find(((t2) => t2.type === e2));
    }
    async getOrFindSegment(e2) {
      let t2 = this.getSegment(e2);
      return void 0 === t2 && (await this.findAppSegments(0, [e2]), t2 = this.getSegment(e2)), t2;
    }
  }
  c(he, "type", "jpeg"), w.set("jpeg", he);
  const ue = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
  class ce extends re {
    parseHeader() {
      var e2 = this.chunk.getUint16();
      18761 === e2 ? this.le = true : 19789 === e2 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
    }
    parseTags(e2, t2, i2 = /* @__PURE__ */ new Map()) {
      let { pick: n2, skip: s2 } = this.options[t2];
      n2 = new Set(n2);
      let r2 = n2.size > 0, a2 = 0 === s2.size, o2 = this.chunk.getUint16(e2);
      e2 += 2;
      for (let l2 = 0; l2 < o2; l2++) {
        let o3 = this.chunk.getUint16(e2);
        if (r2) {
          if (n2.has(o3) && (i2.set(o3, this.parseTag(e2, o3, t2)), n2.delete(o3), 0 === n2.size)) break;
        } else !a2 && s2.has(o3) || i2.set(o3, this.parseTag(e2, o3, t2));
        e2 += 12;
      }
      return i2;
    }
    parseTag(e2, t2, i2) {
      let { chunk: n2 } = this, s2 = n2.getUint16(e2 + 2), r2 = n2.getUint32(e2 + 4), a2 = ue[s2];
      if (a2 * r2 <= 4 ? e2 += 8 : e2 = n2.getUint32(e2 + 8), (s2 < 1 || s2 > 13) && g(`Invalid TIFF value type. block: ${i2.toUpperCase()}, tag: ${t2.toString(16)}, type: ${s2}, offset ${e2}`), e2 > n2.byteLength && g(`Invalid TIFF value offset. block: ${i2.toUpperCase()}, tag: ${t2.toString(16)}, type: ${s2}, offset ${e2} is outside of chunk size ${n2.byteLength}`), 1 === s2) return n2.getUint8Array(e2, r2);
      if (2 === s2) return m(n2.getString(e2, r2));
      if (7 === s2) return n2.getUint8Array(e2, r2);
      if (1 === r2) return this.parseTagValue(s2, e2);
      {
        let t3 = new ((function(e3) {
          switch (e3) {
            case 1:
              return Uint8Array;
            case 3:
              return Uint16Array;
            case 4:
              return Uint32Array;
            case 5:
              return Array;
            case 6:
              return Int8Array;
            case 8:
              return Int16Array;
            case 9:
              return Int32Array;
            case 10:
              return Array;
            case 11:
              return Float32Array;
            case 12:
              return Float64Array;
            default:
              return Array;
          }
        })(s2))(r2), i3 = a2;
        for (let n3 = 0; n3 < r2; n3++) t3[n3] = this.parseTagValue(s2, e2), e2 += i3;
        return t3;
      }
    }
    parseTagValue(e2, t2) {
      let { chunk: i2 } = this;
      switch (e2) {
        case 1:
          return i2.getUint8(t2);
        case 3:
          return i2.getUint16(t2);
        case 4:
          return i2.getUint32(t2);
        case 5:
          return i2.getUint32(t2) / i2.getUint32(t2 + 4);
        case 6:
          return i2.getInt8(t2);
        case 8:
          return i2.getInt16(t2);
        case 9:
          return i2.getInt32(t2);
        case 10:
          return i2.getInt32(t2) / i2.getInt32(t2 + 4);
        case 11:
          return i2.getFloat(t2);
        case 12:
          return i2.getDouble(t2);
        case 13:
          return i2.getUint32(t2);
        default:
          g(`Invalid tiff type ${e2}`);
      }
    }
  }
  class fe extends ce {
    static canHandle(e2, t2) {
      return 225 === e2.getUint8(t2 + 1) && 1165519206 === e2.getUint32(t2 + 4) && 0 === e2.getUint16(t2 + 8);
    }
    async parse() {
      this.parseHeader();
      let { options: e2 } = this;
      return e2.ifd0.enabled && await this.parseIfd0Block(), e2.exif.enabled && await this.safeParse("parseExifBlock"), e2.gps.enabled && await this.safeParse("parseGpsBlock"), e2.interop.enabled && await this.safeParse("parseInteropBlock"), e2.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
    }
    safeParse(e2) {
      let t2 = this[e2]();
      return void 0 !== t2.catch && (t2 = t2.catch(this.handleError)), t2;
    }
    findIfd0Offset() {
      void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
    }
    findIfd1Offset() {
      if (void 0 === this.ifd1Offset) {
        this.findIfd0Offset();
        let e2 = this.chunk.getUint16(this.ifd0Offset), t2 = this.ifd0Offset + 2 + 12 * e2;
        this.ifd1Offset = this.chunk.getUint32(t2);
      }
    }
    parseBlock(e2, t2) {
      let i2 = /* @__PURE__ */ new Map();
      return this[t2] = i2, this.parseTags(e2, t2, i2), i2;
    }
    async parseIfd0Block() {
      if (this.ifd0) return;
      let { file: e2 } = this;
      this.findIfd0Offset(), this.ifd0Offset < 8 && g("Malformed EXIF data"), !e2.chunked && this.ifd0Offset > e2.byteLength && g(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e2.byteLength}`), e2.tiff && await e2.ensureChunk(this.ifd0Offset, S(this.options));
      let t2 = this.parseBlock(this.ifd0Offset, "ifd0");
      return 0 !== t2.size ? (this.exifOffset = t2.get(34665), this.interopOffset = t2.get(40965), this.gpsOffset = t2.get(34853), this.xmp = t2.get(700), this.iptc = t2.get(33723), this.icc = t2.get(34675), this.options.sanitize && (t2.delete(34665), t2.delete(40965), t2.delete(34853), t2.delete(700), t2.delete(33723), t2.delete(34675)), t2) : void 0;
    }
    async parseExifBlock() {
      if (this.exif) return;
      if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset) return;
      this.file.tiff && await this.file.ensureChunk(this.exifOffset, S(this.options));
      let e2 = this.parseBlock(this.exifOffset, "exif");
      return this.interopOffset || (this.interopOffset = e2.get(40965)), this.makerNote = e2.get(37500), this.userComment = e2.get(37510), this.options.sanitize && (e2.delete(40965), e2.delete(37500), e2.delete(37510)), this.unpack(e2, 41728), this.unpack(e2, 41729), e2;
    }
    unpack(e2, t2) {
      let i2 = e2.get(t2);
      i2 && 1 === i2.length && e2.set(t2, i2[0]);
    }
    async parseGpsBlock() {
      if (this.gps) return;
      if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset) return;
      let e2 = this.parseBlock(this.gpsOffset, "gps");
      return e2 && e2.has(2) && e2.has(4) && (e2.set("latitude", de(...e2.get(2), e2.get(1))), e2.set("longitude", de(...e2.get(4), e2.get(3)))), e2;
    }
    async parseInteropBlock() {
      if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset)) return this.parseBlock(this.interopOffset, "interop");
    }
    async parseThumbnailBlock(e2 = false) {
      if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e2)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
    }
    async extractThumbnail() {
      if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1) return;
      let e2 = this.ifd1.get(513), t2 = this.ifd1.get(514);
      return this.chunk.getUint8Array(e2, t2);
    }
    get image() {
      return this.ifd0;
    }
    get thumbnail() {
      return this.ifd1;
    }
    createOutput() {
      let e2, t2, i2, n2 = {};
      for (t2 of H) if (e2 = this[t2], !p(e2)) if (i2 = this.canTranslate ? this.translateBlock(e2, t2) : Object.fromEntries(e2), this.options.mergeOutput) {
        if ("ifd1" === t2) continue;
        Object.assign(n2, i2);
      } else n2[t2] = i2;
      return this.makerNote && (n2.makerNote = this.makerNote), this.userComment && (n2.userComment = this.userComment), n2;
    }
    assignToOutput(e2, t2) {
      if (this.globalOptions.mergeOutput) Object.assign(e2, t2);
      else for (let [i2, n2] of Object.entries(t2)) this.assignObjectToOutput(e2, i2, n2);
    }
  }
  function de(e2, t2, i2, n2) {
    var s2 = e2 + t2 / 60 + i2 / 3600;
    return "S" !== n2 && "W" !== n2 || (s2 *= -1), s2;
  }
  c(fe, "type", "tiff"), c(fe, "headerLength", 10), T.set("tiff", fe);
  var pe = Object.freeze({ __proto__: null, default: ne, Exifr: te, fileParsers: w, segmentParsers: T, fileReaders: A, tagKeys: E, tagValues: B, tagRevivers: N, createDictionary: U, extendDictionary: F, fetchUrlAsArrayBuffer: M, readBlobAsArrayBuffer: R, chunkedProps: G, otherSegments: V, segments: z, tiffBlocks: H, segmentsAndBlocks: j, tiffExtractables: W, inheritables: K, allFormatters: X, Options: q, parse: ie });
  const ge = { ifd0: false, ifd1: false, exif: false, gps: false, interop: false, sanitize: false, reviveValues: true, translateKeys: false, translateValues: false, mergeOutput: false }, me = Object.assign({}, ge, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
  async function Se(e2) {
    let t2 = new te(me);
    await t2.read(e2);
    let i2 = await t2.parse();
    if (i2 && i2.gps) {
      let { latitude: e3, longitude: t3 } = i2.gps;
      return { latitude: e3, longitude: t3 };
    }
  }
  const Ce = Object.assign({}, ge, { tiff: false, ifd1: true, mergeOutput: false });
  async function ye(e2) {
    let t2 = new te(Ce);
    await t2.read(e2);
    let i2 = await t2.extractThumbnail();
    return i2 && a ? s.from(i2) : i2;
  }
  async function be(e2) {
    let t2 = await this.thumbnail(e2);
    if (void 0 !== t2) {
      let e3 = new Blob([t2]);
      return URL.createObjectURL(e3);
    }
  }
  const Ie = Object.assign({}, ge, { firstChunkSize: 4e4, ifd0: [274] });
  async function Pe(e2) {
    let t2 = new te(Ie);
    await t2.read(e2);
    let i2 = await t2.parse();
    if (i2 && i2.ifd0) return i2.ifd0[274];
  }
  const ke = Object.freeze({ 1: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
  let we = true, Te = true;
  if ("object" == typeof navigator) {
    let e2 = navigator.userAgent;
    if (e2.includes("iPad") || e2.includes("iPhone")) {
      let t2 = e2.match(/OS (\d+)_(\d+)/);
      if (t2) {
        let [, e3, i2] = t2, n2 = Number(e3) + 0.1 * Number(i2);
        we = n2 < 13.4, Te = false;
      }
    } else if (e2.includes("OS X 10")) {
      let [, t2] = e2.match(/OS X 10[_.](\d+)/);
      we = Te = Number(t2) < 15;
    }
    if (e2.includes("Chrome/")) {
      let [, t2] = e2.match(/Chrome\/(\d+)/);
      we = Te = Number(t2) < 81;
    } else if (e2.includes("Firefox/")) {
      let [, t2] = e2.match(/Firefox\/(\d+)/);
      we = Te = Number(t2) < 77;
    }
  }
  async function Ae(e2) {
    let t2 = await Pe(e2);
    return Object.assign({ canvas: we, css: Te }, ke[t2]);
  }
  class De extends I {
    constructor(...e2) {
      super(...e2), c(this, "ranges", new Oe()), 0 !== this.byteLength && this.ranges.add(0, this.byteLength);
    }
    _tryExtend(e2, t2, i2) {
      if (0 === e2 && 0 === this.byteLength && i2) {
        let e3 = new DataView(i2.buffer || i2, i2.byteOffset, i2.byteLength);
        this._swapDataView(e3);
      } else {
        let i3 = e2 + t2;
        if (i3 > this.byteLength) {
          let { dataView: e3 } = this._extend(i3);
          this._swapDataView(e3);
        }
      }
    }
    _extend(e2) {
      let t2;
      t2 = a ? s.allocUnsafe(e2) : new Uint8Array(e2);
      let i2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
      return t2.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t2, dataView: i2 };
    }
    subarray(e2, t2, i2 = false) {
      return t2 = t2 || this._lengthToEnd(e2), i2 && this._tryExtend(e2, t2), this.ranges.add(e2, t2), super.subarray(e2, t2);
    }
    set(e2, t2, i2 = false) {
      i2 && this._tryExtend(t2, e2.byteLength, e2);
      let n2 = super.set(e2, t2);
      return this.ranges.add(t2, n2.byteLength), n2;
    }
    async ensureChunk(e2, t2) {
      this.chunked && (this.ranges.available(e2, t2) || await this.readChunk(e2, t2));
    }
    available(e2, t2) {
      return this.ranges.available(e2, t2);
    }
  }
  class Oe {
    constructor() {
      c(this, "list", []);
    }
    get length() {
      return this.list.length;
    }
    add(e2, t2, i2 = 0) {
      let n2 = e2 + t2, s2 = this.list.filter(((t3) => xe(e2, t3.offset, n2) || xe(e2, t3.end, n2)));
      if (s2.length > 0) {
        e2 = Math.min(e2, ...s2.map(((e3) => e3.offset))), n2 = Math.max(n2, ...s2.map(((e3) => e3.end))), t2 = n2 - e2;
        let i3 = s2.shift();
        i3.offset = e2, i3.length = t2, i3.end = n2, this.list = this.list.filter(((e3) => !s2.includes(e3)));
      } else this.list.push({ offset: e2, length: t2, end: n2 });
    }
    available(e2, t2) {
      let i2 = e2 + t2;
      return this.list.some(((t3) => t3.offset <= e2 && i2 <= t3.end));
    }
  }
  function xe(e2, t2, i2) {
    return e2 <= t2 && t2 <= i2;
  }
  class ve extends De {
    constructor(e2, t2) {
      super(0), c(this, "chunksRead", 0), this.input = e2, this.options = t2;
    }
    async readWhole() {
      this.chunked = false, await this.readChunk(this.nextChunkOffset);
    }
    async readChunked() {
      this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
    }
    async readNextChunk(e2 = this.nextChunkOffset) {
      if (this.fullyRead) return this.chunksRead++, false;
      let t2 = this.options.chunkSize, i2 = await this.readChunk(e2, t2);
      return !!i2 && i2.byteLength === t2;
    }
    async readChunk(e2, t2) {
      if (this.chunksRead++, 0 !== (t2 = this.safeWrapAddress(e2, t2))) return this._readChunk(e2, t2);
    }
    safeWrapAddress(e2, t2) {
      return void 0 !== this.size && e2 + t2 > this.size ? Math.max(0, this.size - e2) : t2;
    }
    get nextChunkOffset() {
      if (0 !== this.ranges.list.length) return this.ranges.list[0].length;
    }
    get canReadNextChunk() {
      return this.chunksRead < this.options.chunkLimit;
    }
    get fullyRead() {
      return void 0 !== this.size && this.nextChunkOffset === this.size;
    }
    read() {
      return this.options.chunked ? this.readChunked() : this.readWhole();
    }
    close() {
    }
  }
  A.set("blob", class extends ve {
    async readWhole() {
      this.chunked = false;
      let e2 = await R(this.input);
      this._swapArrayBuffer(e2);
    }
    readChunked() {
      return this.chunked = true, this.size = this.input.size, super.readChunked();
    }
    async _readChunk(e2, t2) {
      let i2 = t2 ? e2 + t2 : void 0, n2 = this.input.slice(e2, i2), s2 = await R(n2);
      return this.set(s2, e2, true);
    }
  });
  var Me = Object.freeze({ __proto__: null, default: pe, Exifr: te, fileParsers: w, segmentParsers: T, fileReaders: A, tagKeys: E, tagValues: B, tagRevivers: N, createDictionary: U, extendDictionary: F, fetchUrlAsArrayBuffer: M, readBlobAsArrayBuffer: R, chunkedProps: G, otherSegments: V, segments: z, tiffBlocks: H, segmentsAndBlocks: j, tiffExtractables: W, inheritables: K, allFormatters: X, Options: q, parse: ie, gpsOnlyOptions: me, gps: Se, thumbnailOnlyOptions: Ce, thumbnail: ye, thumbnailUrl: be, orientationOnlyOptions: Ie, orientation: Pe, rotations: ke, get rotateCanvas() {
    return we;
  }, get rotateCss() {
    return Te;
  }, rotation: Ae });
  A.set("url", class extends ve {
    async readWhole() {
      this.chunked = false;
      let e2 = await M(this.input);
      e2 instanceof ArrayBuffer ? this._swapArrayBuffer(e2) : e2 instanceof Uint8Array && this._swapBuffer(e2);
    }
    async _readChunk(e2, t2) {
      let i2 = t2 ? e2 + t2 - 1 : void 0, n2 = this.options.httpHeaders || {};
      (e2 || i2) && (n2.range = `bytes=${[e2, i2].join("-")}`);
      let s2 = await h(this.input, { headers: n2 }), r2 = await s2.arrayBuffer(), a2 = r2.byteLength;
      if (416 !== s2.status) return a2 !== t2 && (this.size = e2 + a2), this.set(r2, e2, true);
    }
  });
  I.prototype.getUint64 = function(e2) {
    let t2 = this.getUint32(e2), i2 = this.getUint32(e2 + 4);
    return t2 < 1048575 ? t2 << 32 | i2 : void 0 !== typeof r ? (console.warn("Using BigInt because of type 64uint but JS can only handle 53b numbers."), r(t2) << r(32) | r(i2)) : void g("Trying to read 64b value but JS can only handle 53b numbers.");
  };
  class Re extends se {
    parseBoxes(e2 = 0) {
      let t2 = [];
      for (; e2 < this.file.byteLength - 4; ) {
        let i2 = this.parseBoxHead(e2);
        if (t2.push(i2), 0 === i2.length) break;
        e2 += i2.length;
      }
      return t2;
    }
    parseSubBoxes(e2) {
      e2.boxes = this.parseBoxes(e2.start);
    }
    findBox(e2, t2) {
      return void 0 === e2.boxes && this.parseSubBoxes(e2), e2.boxes.find(((e3) => e3.kind === t2));
    }
    parseBoxHead(e2) {
      let t2 = this.file.getUint32(e2), i2 = this.file.getString(e2 + 4, 4), n2 = e2 + 8;
      return 1 === t2 && (t2 = this.file.getUint64(e2 + 8), n2 += 8), { offset: e2, length: t2, kind: i2, start: n2 };
    }
    parseBoxFullHead(e2) {
      if (void 0 !== e2.version) return;
      let t2 = this.file.getUint32(e2.start);
      e2.version = t2 >> 24, e2.start += 4;
    }
  }
  class Le extends Re {
    static canHandle(e2, t2) {
      if (0 !== t2) return false;
      let i2 = e2.getUint16(2);
      if (i2 > 50) return false;
      let n2 = 16, s2 = [];
      for (; n2 < i2; ) s2.push(e2.getString(n2, 4)), n2 += 4;
      return s2.includes(this.type);
    }
    async parse() {
      let e2 = this.file.getUint32(0), t2 = this.parseBoxHead(e2);
      for (; "meta" !== t2.kind; ) e2 += t2.length, await this.file.ensureChunk(e2, 16), t2 = this.parseBoxHead(e2);
      await this.file.ensureChunk(t2.offset, t2.length), this.parseBoxFullHead(t2), this.parseSubBoxes(t2), this.options.icc.enabled && await this.findIcc(t2), this.options.tiff.enabled && await this.findExif(t2);
    }
    async registerSegment(e2, t2, i2) {
      await this.file.ensureChunk(t2, i2);
      let n2 = this.file.subarray(t2, i2);
      this.createParser(e2, n2);
    }
    async findIcc(e2) {
      let t2 = this.findBox(e2, "iprp");
      if (void 0 === t2) return;
      let i2 = this.findBox(t2, "ipco");
      if (void 0 === i2) return;
      let n2 = this.findBox(i2, "colr");
      void 0 !== n2 && await this.registerSegment("icc", n2.offset + 12, n2.length);
    }
    async findExif(e2) {
      let t2 = this.findBox(e2, "iinf");
      if (void 0 === t2) return;
      let i2 = this.findBox(e2, "iloc");
      if (void 0 === i2) return;
      let n2 = this.findExifLocIdInIinf(t2), s2 = this.findExtentInIloc(i2, n2);
      if (void 0 === s2) return;
      let [r2, a2] = s2;
      await this.file.ensureChunk(r2, a2);
      let o2 = 4 + this.file.getUint32(r2);
      r2 += o2, a2 -= o2, await this.registerSegment("tiff", r2, a2);
    }
    findExifLocIdInIinf(e2) {
      this.parseBoxFullHead(e2);
      let t2, i2, n2, s2, r2 = e2.start, a2 = this.file.getUint16(r2);
      for (r2 += 2; a2--; ) {
        if (t2 = this.parseBoxHead(r2), this.parseBoxFullHead(t2), i2 = t2.start, t2.version >= 2 && (n2 = 3 === t2.version ? 4 : 2, s2 = this.file.getString(i2 + n2 + 2, 4), "Exif" === s2)) return this.file.getUintBytes(i2, n2);
        r2 += t2.length;
      }
    }
    get8bits(e2) {
      let t2 = this.file.getUint8(e2);
      return [t2 >> 4, 15 & t2];
    }
    findExtentInIloc(e2, t2) {
      this.parseBoxFullHead(e2);
      let i2 = e2.start, [n2, s2] = this.get8bits(i2++), [r2, a2] = this.get8bits(i2++), o2 = 2 === e2.version ? 4 : 2, l2 = 1 === e2.version || 2 === e2.version ? 2 : 0, h2 = a2 + n2 + s2, u2 = 2 === e2.version ? 4 : 2, c2 = this.file.getUintBytes(i2, u2);
      for (i2 += u2; c2--; ) {
        let e3 = this.file.getUintBytes(i2, o2);
        i2 += o2 + l2 + 2 + r2;
        let u3 = this.file.getUint16(i2);
        if (i2 += 2, e3 === t2) return u3 > 1 && console.warn("ILOC box has more than one extent but we're only processing one\nPlease create an issue at https://github.com/MikeKovarik/exifr with this file"), [this.file.getUintBytes(i2 + a2, n2), this.file.getUintBytes(i2 + a2 + n2, s2)];
        i2 += u3 * h2;
      }
    }
  }
  class Ue extends Le {
  }
  c(Ue, "type", "heic");
  class Fe extends Le {
  }
  c(Fe, "type", "avif"), w.set("heic", Ue), w.set("avif", Fe), U(E, ["ifd0", "ifd1"], [[256, "ImageWidth"], [257, "ImageHeight"], [258, "BitsPerSample"], [259, "Compression"], [262, "PhotometricInterpretation"], [270, "ImageDescription"], [271, "Make"], [272, "Model"], [273, "StripOffsets"], [274, "Orientation"], [277, "SamplesPerPixel"], [278, "RowsPerStrip"], [279, "StripByteCounts"], [282, "XResolution"], [283, "YResolution"], [284, "PlanarConfiguration"], [296, "ResolutionUnit"], [301, "TransferFunction"], [305, "Software"], [306, "ModifyDate"], [315, "Artist"], [316, "HostComputer"], [317, "Predictor"], [318, "WhitePoint"], [319, "PrimaryChromaticities"], [513, "ThumbnailOffset"], [514, "ThumbnailLength"], [529, "YCbCrCoefficients"], [530, "YCbCrSubSampling"], [531, "YCbCrPositioning"], [532, "ReferenceBlackWhite"], [700, "ApplicationNotes"], [33432, "Copyright"], [33723, "IPTC"], [34665, "ExifIFD"], [34675, "ICC"], [34853, "GpsIFD"], [330, "SubIFD"], [40965, "InteropIFD"], [40091, "XPTitle"], [40092, "XPComment"], [40093, "XPAuthor"], [40094, "XPKeywords"], [40095, "XPSubject"]]), U(E, "exif", [[33434, "ExposureTime"], [33437, "FNumber"], [34850, "ExposureProgram"], [34852, "SpectralSensitivity"], [34855, "ISO"], [34858, "TimeZoneOffset"], [34859, "SelfTimerMode"], [34864, "SensitivityType"], [34865, "StandardOutputSensitivity"], [34866, "RecommendedExposureIndex"], [34867, "ISOSpeed"], [34868, "ISOSpeedLatitudeyyy"], [34869, "ISOSpeedLatitudezzz"], [36864, "ExifVersion"], [36867, "DateTimeOriginal"], [36868, "CreateDate"], [36873, "GooglePlusUploadCode"], [36880, "OffsetTime"], [36881, "OffsetTimeOriginal"], [36882, "OffsetTimeDigitized"], [37121, "ComponentsConfiguration"], [37122, "CompressedBitsPerPixel"], [37377, "ShutterSpeedValue"], [37378, "ApertureValue"], [37379, "BrightnessValue"], [37380, "ExposureCompensation"], [37381, "MaxApertureValue"], [37382, "SubjectDistance"], [37383, "MeteringMode"], [37384, "LightSource"], [37385, "Flash"], [37386, "FocalLength"], [37393, "ImageNumber"], [37394, "SecurityClassification"], [37395, "ImageHistory"], [37396, "SubjectArea"], [37500, "MakerNote"], [37510, "UserComment"], [37520, "SubSecTime"], [37521, "SubSecTimeOriginal"], [37522, "SubSecTimeDigitized"], [37888, "AmbientTemperature"], [37889, "Humidity"], [37890, "Pressure"], [37891, "WaterDepth"], [37892, "Acceleration"], [37893, "CameraElevationAngle"], [40960, "FlashpixVersion"], [40961, "ColorSpace"], [40962, "ExifImageWidth"], [40963, "ExifImageHeight"], [40964, "RelatedSoundFile"], [41483, "FlashEnergy"], [41486, "FocalPlaneXResolution"], [41487, "FocalPlaneYResolution"], [41488, "FocalPlaneResolutionUnit"], [41492, "SubjectLocation"], [41493, "ExposureIndex"], [41495, "SensingMethod"], [41728, "FileSource"], [41729, "SceneType"], [41730, "CFAPattern"], [41985, "CustomRendered"], [41986, "ExposureMode"], [41987, "WhiteBalance"], [41988, "DigitalZoomRatio"], [41989, "FocalLengthIn35mmFormat"], [41990, "SceneCaptureType"], [41991, "GainControl"], [41992, "Contrast"], [41993, "Saturation"], [41994, "Sharpness"], [41996, "SubjectDistanceRange"], [42016, "ImageUniqueID"], [42032, "OwnerName"], [42033, "SerialNumber"], [42034, "LensInfo"], [42035, "LensMake"], [42036, "LensModel"], [42037, "LensSerialNumber"], [42080, "CompositeImage"], [42081, "CompositeImageCount"], [42082, "CompositeImageExposureTimes"], [42240, "Gamma"], [59932, "Padding"], [59933, "OffsetSchema"], [65e3, "OwnerName"], [65001, "SerialNumber"], [65002, "Lens"], [65100, "RawFile"], [65101, "Converter"], [65102, "WhiteBalance"], [65105, "Exposure"], [65106, "Shadows"], [65107, "Brightness"], [65108, "Contrast"], [65109, "Saturation"], [65110, "Sharpness"], [65111, "Smoothness"], [65112, "MoireFilter"], [40965, "InteropIFD"]]), U(E, "gps", [[0, "GPSVersionID"], [1, "GPSLatitudeRef"], [2, "GPSLatitude"], [3, "GPSLongitudeRef"], [4, "GPSLongitude"], [5, "GPSAltitudeRef"], [6, "GPSAltitude"], [7, "GPSTimeStamp"], [8, "GPSSatellites"], [9, "GPSStatus"], [10, "GPSMeasureMode"], [11, "GPSDOP"], [12, "GPSSpeedRef"], [13, "GPSSpeed"], [14, "GPSTrackRef"], [15, "GPSTrack"], [16, "GPSImgDirectionRef"], [17, "GPSImgDirection"], [18, "GPSMapDatum"], [19, "GPSDestLatitudeRef"], [20, "GPSDestLatitude"], [21, "GPSDestLongitudeRef"], [22, "GPSDestLongitude"], [23, "GPSDestBearingRef"], [24, "GPSDestBearing"], [25, "GPSDestDistanceRef"], [26, "GPSDestDistance"], [27, "GPSProcessingMethod"], [28, "GPSAreaInformation"], [29, "GPSDateStamp"], [30, "GPSDifferential"], [31, "GPSHPositioningError"]]), U(B, ["ifd0", "ifd1"], [[274, { 1: "Horizontal (normal)", 2: "Mirror horizontal", 3: "Rotate 180", 4: "Mirror vertical", 5: "Mirror horizontal and rotate 270 CW", 6: "Rotate 90 CW", 7: "Mirror horizontal and rotate 90 CW", 8: "Rotate 270 CW" }], [296, { 1: "None", 2: "inches", 3: "cm" }]]);
  let Ee = U(B, "exif", [[34850, { 0: "Not defined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode" }], [37121, { 0: "-", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" }], [37383, { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" }], [37384, { 0: "Unknown", 1: "Daylight", 2: "Fluorescent", 3: "Tungsten (incandescent light)", 4: "Flash", 9: "Fine weather", 10: "Cloudy weather", 11: "Shade", 12: "Daylight fluorescent (D 5700 - 7100K)", 13: "Day white fluorescent (N 4600 - 5400K)", 14: "Cool white fluorescent (W 3900 - 4500K)", 15: "White fluorescent (WW 3200 - 3700K)", 17: "Standard light A", 18: "Standard light B", 19: "Standard light C", 20: "D55", 21: "D65", 22: "D75", 23: "D50", 24: "ISO studio tungsten", 255: "Other" }], [37385, { 0: "Flash did not fire", 1: "Flash fired", 5: "Strobe return light not detected", 7: "Strobe return light detected", 9: "Flash fired, compulsory flash mode", 13: "Flash fired, compulsory flash mode, return light not detected", 15: "Flash fired, compulsory flash mode, return light detected", 16: "Flash did not fire, compulsory flash mode", 24: "Flash did not fire, auto mode", 25: "Flash fired, auto mode", 29: "Flash fired, auto mode, return light not detected", 31: "Flash fired, auto mode, return light detected", 32: "No flash function", 65: "Flash fired, red-eye reduction mode", 69: "Flash fired, red-eye reduction mode, return light not detected", 71: "Flash fired, red-eye reduction mode, return light detected", 73: "Flash fired, compulsory flash mode, red-eye reduction mode", 77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89: "Flash fired, auto mode, red-eye reduction mode", 93: "Flash fired, auto mode, return light not detected, red-eye reduction mode", 95: "Flash fired, auto mode, return light detected, red-eye reduction mode" }], [41495, { 1: "Not defined", 2: "One-chip color area sensor", 3: "Two-chip color area sensor", 4: "Three-chip color area sensor", 5: "Color sequential area sensor", 7: "Trilinear sensor", 8: "Color sequential linear sensor" }], [41728, { 1: "Film Scanner", 2: "Reflection Print Scanner", 3: "Digital Camera" }], [41729, { 1: "Directly photographed" }], [41985, { 0: "Normal", 1: "Custom", 2: "HDR (no original saved)", 3: "HDR (original saved)", 4: "Original (for HDR)", 6: "Panorama", 7: "Portrait HDR", 8: "Portrait" }], [41986, { 0: "Auto", 1: "Manual", 2: "Auto bracket" }], [41987, { 0: "Auto", 1: "Manual" }], [41990, { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night", 4: "Other" }], [41991, { 0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down" }], [41996, { 0: "Unknown", 1: "Macro", 2: "Close", 3: "Distant" }], [42080, { 0: "Unknown", 1: "Not a Composite Image", 2: "General Composite Image", 3: "Composite Image Captured While Shooting" }]]);
  const Be = { 1: "No absolute unit of measurement", 2: "Inch", 3: "Centimeter" };
  Ee.set(37392, Be), Ee.set(41488, Be);
  const Ne = { 0: "Normal", 1: "Low", 2: "High" };
  function Ge(e2) {
    return "object" == typeof e2 && void 0 !== e2.length ? e2[0] : e2;
  }
  function Ve(e2) {
    let t2 = Array.from(e2).slice(1);
    return t2[1] > 15 && (t2 = t2.map(((e3) => String.fromCharCode(e3)))), "0" !== t2[2] && 0 !== t2[2] || t2.pop(), t2.join(".");
  }
  function ze(e2) {
    if ("string" == typeof e2) {
      var [t2, i2, n2, s2, r2, a2] = e2.trim().split(/[-: ]/g).map(Number), o2 = new Date(t2, i2 - 1, n2);
      return Number.isNaN(s2) || Number.isNaN(r2) || Number.isNaN(a2) || (o2.setHours(s2), o2.setMinutes(r2), o2.setSeconds(a2)), Number.isNaN(+o2) ? e2 : o2;
    }
  }
  function He(e2) {
    if ("string" == typeof e2) return e2;
    let t2 = [];
    if (0 === e2[1] && 0 === e2[e2.length - 1]) for (let i2 = 0; i2 < e2.length; i2 += 2) t2.push(je(e2[i2 + 1], e2[i2]));
    else for (let i2 = 0; i2 < e2.length; i2 += 2) t2.push(je(e2[i2], e2[i2 + 1]));
    return m(String.fromCodePoint(...t2));
  }
  function je(e2, t2) {
    return e2 << 8 | t2;
  }
  Ee.set(41992, Ne), Ee.set(41993, Ne), Ee.set(41994, Ne), U(N, ["ifd0", "ifd1"], [[50827, function(e2) {
    return "string" != typeof e2 ? b(e2) : e2;
  }], [306, ze], [40091, He], [40092, He], [40093, He], [40094, He], [40095, He]]), U(N, "exif", [[40960, Ve], [36864, Ve], [36867, ze], [36868, ze], [40962, Ge], [40963, Ge]]), U(N, "gps", [[0, (e2) => Array.from(e2).join(".")], [7, (e2) => Array.from(e2).join(":")]]);
  class We extends re {
    static canHandle(e2, t2) {
      return 225 === e2.getUint8(t2 + 1) && 1752462448 === e2.getUint32(t2 + 4) && "http://ns.adobe.com/" === e2.getString(t2 + 4, "http://ns.adobe.com/".length);
    }
    static headerLength(e2, t2) {
      return "http://ns.adobe.com/xmp/extension/" === e2.getString(t2 + 4, "http://ns.adobe.com/xmp/extension/".length) ? 79 : 4 + "http://ns.adobe.com/xap/1.0/".length + 1;
    }
    static findPosition(e2, t2) {
      let i2 = super.findPosition(e2, t2);
      return i2.multiSegment = i2.extended = 79 === i2.headerLength, i2.multiSegment ? (i2.chunkCount = e2.getUint8(t2 + 72), i2.chunkNumber = e2.getUint8(t2 + 76), 0 !== e2.getUint8(t2 + 77) && i2.chunkNumber++) : (i2.chunkCount = 1 / 0, i2.chunkNumber = -1), i2;
    }
    static handleMultiSegments(e2) {
      return e2.map(((e3) => e3.chunk.getString())).join("");
    }
    normalizeInput(e2) {
      return "string" == typeof e2 ? e2 : I.from(e2).getString();
    }
    parse(e2 = this.chunk) {
      if (!this.localOptions.parse) return e2;
      e2 = (function(e3) {
        let t3 = {}, i3 = {};
        for (let e4 of Ze) t3[e4] = [], i3[e4] = 0;
        return e3.replace(et, ((e4, n3, s2) => {
          if ("<" === n3) {
            let n4 = ++i3[s2];
            return t3[s2].push(n4), `${e4}#${n4}`;
          }
          return `${e4}#${t3[s2].pop()}`;
        }));
      })(e2);
      let t2 = Xe.findAll(e2, "rdf", "Description");
      0 === t2.length && t2.push(new Xe("rdf", "Description", void 0, e2));
      let i2, n2 = {};
      for (let e3 of t2) for (let t3 of e3.properties) i2 = Je(t3.ns, n2), _e(t3, i2);
      return (function(e3) {
        let t3;
        for (let i3 in e3) t3 = e3[i3] = f(e3[i3]), void 0 === t3 && delete e3[i3];
        return f(e3);
      })(n2);
    }
    assignToOutput(e2, t2) {
      if (this.localOptions.parse) for (let [i2, n2] of Object.entries(t2)) switch (i2) {
        case "tiff":
          this.assignObjectToOutput(e2, "ifd0", n2);
          break;
        case "exif":
          this.assignObjectToOutput(e2, "exif", n2);
          break;
        case "xmlns":
          break;
        default:
          this.assignObjectToOutput(e2, i2, n2);
      }
      else e2.xmp = t2;
    }
  }
  c(We, "type", "xmp"), c(We, "multiSegment", true), T.set("xmp", We);
  class Ke {
    static findAll(e2) {
      return qe(e2, /([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)=("[^"]*"|'[^']*')/gm).map(Ke.unpackMatch);
    }
    static unpackMatch(e2) {
      let t2 = e2[1], i2 = e2[2], n2 = e2[3].slice(1, -1);
      return n2 = Qe(n2), new Ke(t2, i2, n2);
    }
    constructor(e2, t2, i2) {
      this.ns = e2, this.name = t2, this.value = i2;
    }
    serialize() {
      return this.value;
    }
  }
  class Xe {
    static findAll(e2, t2, i2) {
      if (void 0 !== t2 || void 0 !== i2) {
        t2 = t2 || "[\\w\\d-]+", i2 = i2 || "[\\w\\d-]+";
        var n2 = new RegExp(`<(${t2}):(${i2})(#\\d+)?((\\s+?[\\w\\d-:]+=("[^"]*"|'[^']*'))*\\s*)(\\/>|>([\\s\\S]*?)<\\/\\1:\\2\\3>)`, "gm");
      } else n2 = /<([\w\d-]+):([\w\d-]+)(#\d+)?((\s+?[\w\d-:]+=("[^"]*"|'[^']*'))*\s*)(\/>|>([\s\S]*?)<\/\1:\2\3>)/gm;
      return qe(e2, n2).map(Xe.unpackMatch);
    }
    static unpackMatch(e2) {
      let t2 = e2[1], i2 = e2[2], n2 = e2[4], s2 = e2[8];
      return new Xe(t2, i2, n2, s2);
    }
    constructor(e2, t2, i2, n2) {
      this.ns = e2, this.name = t2, this.attrString = i2, this.innerXml = n2, this.attrs = Ke.findAll(i2), this.children = Xe.findAll(n2), this.value = 0 === this.children.length ? Qe(n2) : void 0, this.properties = [...this.attrs, ...this.children];
    }
    get isPrimitive() {
      return void 0 !== this.value && 0 === this.attrs.length && 0 === this.children.length;
    }
    get isListContainer() {
      return 1 === this.children.length && this.children[0].isList;
    }
    get isList() {
      let { ns: e2, name: t2 } = this;
      return "rdf" === e2 && ("Seq" === t2 || "Bag" === t2 || "Alt" === t2);
    }
    get isListItem() {
      return "rdf" === this.ns && "li" === this.name;
    }
    serialize() {
      if (0 === this.properties.length && void 0 === this.value) return;
      if (this.isPrimitive) return this.value;
      if (this.isListContainer) return this.children[0].serialize();
      if (this.isList) return $e(this.children.map(Ye));
      if (this.isListItem && 1 === this.children.length && 0 === this.attrs.length) return this.children[0].serialize();
      let e2 = {};
      for (let t2 of this.properties) _e(t2, e2);
      return void 0 !== this.value && (e2.value = this.value), f(e2);
    }
  }
  function _e(e2, t2) {
    let i2 = e2.serialize();
    void 0 !== i2 && (t2[e2.name] = i2);
  }
  var Ye = (e2) => e2.serialize(), $e = (e2) => 1 === e2.length ? e2[0] : e2, Je = (e2, t2) => t2[e2] ? t2[e2] : t2[e2] = {};
  function qe(e2, t2) {
    let i2, n2 = [];
    if (!e2) return n2;
    for (; null !== (i2 = t2.exec(e2)); ) n2.push(i2);
    return n2;
  }
  function Qe(e2) {
    if ((function(e3) {
      return null == e3 || "null" === e3 || "undefined" === e3 || "" === e3 || "" === e3.trim();
    })(e2)) return;
    let t2 = Number(e2);
    if (!Number.isNaN(t2)) return t2;
    let i2 = e2.toLowerCase();
    return "true" === i2 || "false" !== i2 && e2.trim();
  }
  const Ze = ["rdf:li", "rdf:Seq", "rdf:Bag", "rdf:Alt", "rdf:Description"], et = new RegExp(`(<|\\/)(${Ze.join("|")})`, "g");
  var tt = Object.freeze({ __proto__: null, default: Me, Exifr: te, fileParsers: w, segmentParsers: T, fileReaders: A, tagKeys: E, tagValues: B, tagRevivers: N, createDictionary: U, extendDictionary: F, fetchUrlAsArrayBuffer: M, readBlobAsArrayBuffer: R, chunkedProps: G, otherSegments: V, segments: z, tiffBlocks: H, segmentsAndBlocks: j, tiffExtractables: W, inheritables: K, allFormatters: X, Options: q, parse: ie, gpsOnlyOptions: me, gps: Se, thumbnailOnlyOptions: Ce, thumbnail: ye, thumbnailUrl: be, orientationOnlyOptions: Ie, orientation: Pe, rotations: ke, get rotateCanvas() {
    return we;
  }, get rotateCss() {
    return Te;
  }, rotation: Ae });
  let at = l("fs", ((e2) => e2.promises));
  A.set("fs", class extends ve {
    async readWhole() {
      this.chunked = false, this.fs = await at;
      let e2 = await this.fs.readFile(this.input);
      this._swapBuffer(e2);
    }
    async readChunked() {
      this.chunked = true, this.fs = await at, await this.open(), await this.readChunk(0, this.options.firstChunkSize);
    }
    async open() {
      void 0 === this.fh && (this.fh = await this.fs.open(this.input, "r"), this.size = (await this.fh.stat(this.input)).size);
    }
    async _readChunk(e2, t2) {
      void 0 === this.fh && await this.open(), e2 + t2 > this.size && (t2 = this.size - e2);
      var i2 = this.subarray(e2, t2, true);
      return await this.fh.read(i2.dataView, 0, t2, e2), i2;
    }
    async close() {
      if (this.fh) {
        let e2 = this.fh;
        this.fh = void 0, await e2.close();
      }
    }
  });
  A.set("base64", class extends ve {
    constructor(...e2) {
      super(...e2), this.input = this.input.replace(/^data:([^;]+);base64,/gim, ""), this.size = this.input.length / 4 * 3, this.input.endsWith("==") ? this.size -= 2 : this.input.endsWith("=") && (this.size -= 1);
    }
    async _readChunk(e2, t2) {
      let i2, n2, r2 = this.input;
      void 0 === e2 ? (e2 = 0, i2 = 0, n2 = 0) : (i2 = 4 * Math.floor(e2 / 3), n2 = e2 - i2 / 4 * 3), void 0 === t2 && (t2 = this.size);
      let o2 = e2 + t2, l2 = i2 + 4 * Math.ceil(o2 / 3);
      r2 = r2.slice(i2, l2);
      let h2 = Math.min(t2, this.size - e2);
      if (a) {
        let t3 = s.from(r2, "base64").slice(n2, n2 + h2);
        return this.set(t3, e2, true);
      }
      {
        let t3 = this.subarray(e2, h2, true), i3 = atob(r2), s2 = t3.toUint8();
        for (let e3 = 0; e3 < h2; e3++) s2[e3] = i3.charCodeAt(n2 + e3);
        return t3;
      }
    }
  });
  class ot extends se {
    static canHandle(e2, t2) {
      return 18761 === t2 || 19789 === t2;
    }
    extendOptions(e2) {
      let { ifd0: t2, xmp: i2, iptc: n2, icc: s2 } = e2;
      i2.enabled && t2.deps.add(700), n2.enabled && t2.deps.add(33723), s2.enabled && t2.deps.add(34675), t2.finalizeFilters();
    }
    async parse() {
      let { tiff: e2, xmp: t2, iptc: i2, icc: n2 } = this.options;
      if (e2.enabled || t2.enabled || i2.enabled || n2.enabled) {
        let e3 = Math.max(S(this.options), this.options.chunkSize);
        await this.file.ensureChunk(0, e3), this.createParser("tiff", this.file), this.parsers.tiff.parseHeader(), await this.parsers.tiff.parseIfd0Block(), this.adaptTiffPropAsSegment("xmp"), this.adaptTiffPropAsSegment("iptc"), this.adaptTiffPropAsSegment("icc");
      }
    }
    adaptTiffPropAsSegment(e2) {
      if (this.parsers.tiff[e2]) {
        let t2 = this.parsers.tiff[e2];
        this.injectSegment(e2, t2);
      }
    }
  }
  c(ot, "type", "tiff"), w.set("tiff", ot);
  let lt = l("zlib");
  const ht = ["ihdr", "iccp", "text", "itxt", "exif"];
  class ut extends se {
    constructor(...e2) {
      super(...e2), c(this, "catchError", ((e3) => this.errors.push(e3))), c(this, "metaChunks", []), c(this, "unknownChunks", []);
    }
    static canHandle(e2, t2) {
      return 35152 === t2 && 2303741511 === e2.getUint32(0) && 218765834 === e2.getUint32(4);
    }
    async parse() {
      let { file: e2 } = this;
      await this.findPngChunksInRange("PNG\r\n\n".length, e2.byteLength), await this.readSegments(this.metaChunks), this.findIhdr(), this.parseTextChunks(), await this.findExif().catch(this.catchError), await this.findXmp().catch(this.catchError), await this.findIcc().catch(this.catchError);
    }
    async findPngChunksInRange(e2, t2) {
      let { file: i2 } = this;
      for (; e2 < t2; ) {
        let t3 = i2.getUint32(e2), n2 = i2.getUint32(e2 + 4), s2 = i2.getString(e2 + 4, 4).toLowerCase(), r2 = t3 + 4 + 4 + 4, a2 = { type: s2, offset: e2, length: r2, start: e2 + 4 + 4, size: t3, marker: n2 };
        ht.includes(s2) ? this.metaChunks.push(a2) : this.unknownChunks.push(a2), e2 += r2;
      }
    }
    parseTextChunks() {
      let e2 = this.metaChunks.filter(((e3) => "text" === e3.type));
      for (let t2 of e2) {
        let [e3, i2] = this.file.getString(t2.start, t2.size).split("\0");
        this.injectKeyValToIhdr(e3, i2);
      }
    }
    injectKeyValToIhdr(e2, t2) {
      let i2 = this.parsers.ihdr;
      i2 && i2.raw.set(e2, t2);
    }
    findIhdr() {
      let e2 = this.metaChunks.find(((e3) => "ihdr" === e3.type));
      e2 && false !== this.options.ihdr.enabled && this.createParser("ihdr", e2.chunk);
    }
    async findExif() {
      let e2 = this.metaChunks.find(((e3) => "exif" === e3.type));
      e2 && this.injectSegment("tiff", e2.chunk);
    }
    async findXmp() {
      let e2 = this.metaChunks.filter(((e3) => "itxt" === e3.type));
      for (let t2 of e2) {
        "XML:com.adobe.xmp" === t2.chunk.getString(0, "XML:com.adobe.xmp".length) && this.injectSegment("xmp", t2.chunk);
      }
    }
    async findIcc() {
      let e2 = this.metaChunks.find(((e3) => "iccp" === e3.type));
      if (!e2) return;
      let { chunk: t2 } = e2, i2 = t2.getUint8Array(0, 81), s2 = 0;
      for (; s2 < 80 && 0 !== i2[s2]; ) s2++;
      let r2 = s2 + 2, a2 = t2.getString(0, s2);
      if (this.injectKeyValToIhdr("ProfileName", a2), n) {
        let e3 = await lt, i3 = t2.getUint8Array(r2);
        i3 = e3.inflateSync(i3), this.injectSegment("icc", i3);
      }
    }
  }
  c(ut, "type", "png"), w.set("png", ut), U(E, "interop", [[1, "InteropIndex"], [2, "InteropVersion"], [4096, "RelatedImageFileFormat"], [4097, "RelatedImageWidth"], [4098, "RelatedImageHeight"]]), F(E, "ifd0", [[11, "ProcessingSoftware"], [254, "SubfileType"], [255, "OldSubfileType"], [263, "Thresholding"], [264, "CellWidth"], [265, "CellLength"], [266, "FillOrder"], [269, "DocumentName"], [280, "MinSampleValue"], [281, "MaxSampleValue"], [285, "PageName"], [286, "XPosition"], [287, "YPosition"], [290, "GrayResponseUnit"], [297, "PageNumber"], [321, "HalftoneHints"], [322, "TileWidth"], [323, "TileLength"], [332, "InkSet"], [337, "TargetPrinter"], [18246, "Rating"], [18249, "RatingPercent"], [33550, "PixelScale"], [34264, "ModelTransform"], [34377, "PhotoshopSettings"], [50706, "DNGVersion"], [50707, "DNGBackwardVersion"], [50708, "UniqueCameraModel"], [50709, "LocalizedCameraModel"], [50736, "DNGLensInfo"], [50739, "ShadowScale"], [50740, "DNGPrivateData"], [33920, "IntergraphMatrix"], [33922, "ModelTiePoint"], [34118, "SEMInfo"], [34735, "GeoTiffDirectory"], [34736, "GeoTiffDoubleParams"], [34737, "GeoTiffAsciiParams"], [50341, "PrintIM"], [50721, "ColorMatrix1"], [50722, "ColorMatrix2"], [50723, "CameraCalibration1"], [50724, "CameraCalibration2"], [50725, "ReductionMatrix1"], [50726, "ReductionMatrix2"], [50727, "AnalogBalance"], [50728, "AsShotNeutral"], [50729, "AsShotWhiteXY"], [50730, "BaselineExposure"], [50731, "BaselineNoise"], [50732, "BaselineSharpness"], [50734, "LinearResponseLimit"], [50735, "CameraSerialNumber"], [50741, "MakerNoteSafety"], [50778, "CalibrationIlluminant1"], [50779, "CalibrationIlluminant2"], [50781, "RawDataUniqueID"], [50827, "OriginalRawFileName"], [50828, "OriginalRawFileData"], [50831, "AsShotICCProfile"], [50832, "AsShotPreProfileMatrix"], [50833, "CurrentICCProfile"], [50834, "CurrentPreProfileMatrix"], [50879, "ColorimetricReference"], [50885, "SRawType"], [50898, "PanasonicTitle"], [50899, "PanasonicTitle2"], [50931, "CameraCalibrationSig"], [50932, "ProfileCalibrationSig"], [50933, "ProfileIFD"], [50934, "AsShotProfileName"], [50936, "ProfileName"], [50937, "ProfileHueSatMapDims"], [50938, "ProfileHueSatMapData1"], [50939, "ProfileHueSatMapData2"], [50940, "ProfileToneCurve"], [50941, "ProfileEmbedPolicy"], [50942, "ProfileCopyright"], [50964, "ForwardMatrix1"], [50965, "ForwardMatrix2"], [50966, "PreviewApplicationName"], [50967, "PreviewApplicationVersion"], [50968, "PreviewSettingsName"], [50969, "PreviewSettingsDigest"], [50970, "PreviewColorSpace"], [50971, "PreviewDateTime"], [50972, "RawImageDigest"], [50973, "OriginalRawFileDigest"], [50981, "ProfileLookTableDims"], [50982, "ProfileLookTableData"], [51043, "TimeCodes"], [51044, "FrameRate"], [51058, "TStop"], [51081, "ReelName"], [51089, "OriginalDefaultFinalSize"], [51090, "OriginalBestQualitySize"], [51091, "OriginalDefaultCropSize"], [51105, "CameraLabel"], [51107, "ProfileHueSatMapEncoding"], [51108, "ProfileLookTableEncoding"], [51109, "BaselineExposureOffset"], [51110, "DefaultBlackRender"], [51111, "NewRawImageDigest"], [51112, "RawToPreviewGain"]]);
  let ct = [[273, "StripOffsets"], [279, "StripByteCounts"], [288, "FreeOffsets"], [289, "FreeByteCounts"], [291, "GrayResponseCurve"], [292, "T4Options"], [293, "T6Options"], [300, "ColorResponseUnit"], [320, "ColorMap"], [324, "TileOffsets"], [325, "TileByteCounts"], [326, "BadFaxLines"], [327, "CleanFaxData"], [328, "ConsecutiveBadFaxLines"], [330, "SubIFD"], [333, "InkNames"], [334, "NumberofInks"], [336, "DotRange"], [338, "ExtraSamples"], [339, "SampleFormat"], [340, "SMinSampleValue"], [341, "SMaxSampleValue"], [342, "TransferRange"], [343, "ClipPath"], [344, "XClipPathUnits"], [345, "YClipPathUnits"], [346, "Indexed"], [347, "JPEGTables"], [351, "OPIProxy"], [400, "GlobalParametersIFD"], [401, "ProfileType"], [402, "FaxProfile"], [403, "CodingMethods"], [404, "VersionYear"], [405, "ModeNumber"], [433, "Decode"], [434, "DefaultImageColor"], [435, "T82Options"], [437, "JPEGTables"], [512, "JPEGProc"], [515, "JPEGRestartInterval"], [517, "JPEGLosslessPredictors"], [518, "JPEGPointTransforms"], [519, "JPEGQTables"], [520, "JPEGDCTables"], [521, "JPEGACTables"], [559, "StripRowCounts"], [999, "USPTOMiscellaneous"], [18247, "XP_DIP_XML"], [18248, "StitchInfo"], [28672, "SonyRawFileType"], [28688, "SonyToneCurve"], [28721, "VignettingCorrection"], [28722, "VignettingCorrParams"], [28724, "ChromaticAberrationCorrection"], [28725, "ChromaticAberrationCorrParams"], [28726, "DistortionCorrection"], [28727, "DistortionCorrParams"], [29895, "SonyCropTopLeft"], [29896, "SonyCropSize"], [32781, "ImageID"], [32931, "WangTag1"], [32932, "WangAnnotation"], [32933, "WangTag3"], [32934, "WangTag4"], [32953, "ImageReferencePoints"], [32954, "RegionXformTackPoint"], [32955, "WarpQuadrilateral"], [32956, "AffineTransformMat"], [32995, "Matteing"], [32996, "DataType"], [32997, "ImageDepth"], [32998, "TileDepth"], [33300, "ImageFullWidth"], [33301, "ImageFullHeight"], [33302, "TextureFormat"], [33303, "WrapModes"], [33304, "FovCot"], [33305, "MatrixWorldToScreen"], [33306, "MatrixWorldToCamera"], [33405, "Model2"], [33421, "CFARepeatPatternDim"], [33422, "CFAPattern2"], [33423, "BatteryLevel"], [33424, "KodakIFD"], [33445, "MDFileTag"], [33446, "MDScalePixel"], [33447, "MDColorTable"], [33448, "MDLabName"], [33449, "MDSampleInfo"], [33450, "MDPrepDate"], [33451, "MDPrepTime"], [33452, "MDFileUnits"], [33589, "AdventScale"], [33590, "AdventRevision"], [33628, "UIC1Tag"], [33629, "UIC2Tag"], [33630, "UIC3Tag"], [33631, "UIC4Tag"], [33918, "IntergraphPacketData"], [33919, "IntergraphFlagRegisters"], [33921, "INGRReserved"], [34016, "Site"], [34017, "ColorSequence"], [34018, "IT8Header"], [34019, "RasterPadding"], [34020, "BitsPerRunLength"], [34021, "BitsPerExtendedRunLength"], [34022, "ColorTable"], [34023, "ImageColorIndicator"], [34024, "BackgroundColorIndicator"], [34025, "ImageColorValue"], [34026, "BackgroundColorValue"], [34027, "PixelIntensityRange"], [34028, "TransparencyIndicator"], [34029, "ColorCharacterization"], [34030, "HCUsage"], [34031, "TrapIndicator"], [34032, "CMYKEquivalent"], [34152, "AFCP_IPTC"], [34232, "PixelMagicJBIGOptions"], [34263, "JPLCartoIFD"], [34306, "WB_GRGBLevels"], [34310, "LeafData"], [34687, "TIFF_FXExtensions"], [34688, "MultiProfiles"], [34689, "SharedData"], [34690, "T88Options"], [34732, "ImageLayer"], [34750, "JBIGOptions"], [34856, "Opto-ElectricConvFactor"], [34857, "Interlace"], [34908, "FaxRecvParams"], [34909, "FaxSubAddress"], [34910, "FaxRecvTime"], [34929, "FedexEDR"], [34954, "LeafSubIFD"], [37387, "FlashEnergy"], [37388, "SpatialFrequencyResponse"], [37389, "Noise"], [37390, "FocalPlaneXResolution"], [37391, "FocalPlaneYResolution"], [37392, "FocalPlaneResolutionUnit"], [37397, "ExposureIndex"], [37398, "TIFF-EPStandardID"], [37399, "SensingMethod"], [37434, "CIP3DataFile"], [37435, "CIP3Sheet"], [37436, "CIP3Side"], [37439, "StoNits"], [37679, "MSDocumentText"], [37680, "MSPropertySetStorage"], [37681, "MSDocumentTextPosition"], [37724, "ImageSourceData"], [40965, "InteropIFD"], [40976, "SamsungRawPointersOffset"], [40977, "SamsungRawPointersLength"], [41217, "SamsungRawByteOrder"], [41218, "SamsungRawUnknown"], [41484, "SpatialFrequencyResponse"], [41485, "Noise"], [41489, "ImageNumber"], [41490, "SecurityClassification"], [41491, "ImageHistory"], [41494, "TIFF-EPStandardID"], [41995, "DeviceSettingDescription"], [42112, "GDALMetadata"], [42113, "GDALNoData"], [44992, "ExpandSoftware"], [44993, "ExpandLens"], [44994, "ExpandFilm"], [44995, "ExpandFilterLens"], [44996, "ExpandScanner"], [44997, "ExpandFlashLamp"], [46275, "HasselbladRawImage"], [48129, "PixelFormat"], [48130, "Transformation"], [48131, "Uncompressed"], [48132, "ImageType"], [48256, "ImageWidth"], [48257, "ImageHeight"], [48258, "WidthResolution"], [48259, "HeightResolution"], [48320, "ImageOffset"], [48321, "ImageByteCount"], [48322, "AlphaOffset"], [48323, "AlphaByteCount"], [48324, "ImageDataDiscard"], [48325, "AlphaDataDiscard"], [50215, "OceScanjobDesc"], [50216, "OceApplicationSelector"], [50217, "OceIDNumber"], [50218, "OceImageLogic"], [50255, "Annotations"], [50459, "HasselbladExif"], [50547, "OriginalFileName"], [50560, "USPTOOriginalContentType"], [50656, "CR2CFAPattern"], [50710, "CFAPlaneColor"], [50711, "CFALayout"], [50712, "LinearizationTable"], [50713, "BlackLevelRepeatDim"], [50714, "BlackLevel"], [50715, "BlackLevelDeltaH"], [50716, "BlackLevelDeltaV"], [50717, "WhiteLevel"], [50718, "DefaultScale"], [50719, "DefaultCropOrigin"], [50720, "DefaultCropSize"], [50733, "BayerGreenSplit"], [50737, "ChromaBlurRadius"], [50738, "AntiAliasStrength"], [50752, "RawImageSegmentation"], [50780, "BestQualityScale"], [50784, "AliasLayerMetadata"], [50829, "ActiveArea"], [50830, "MaskedAreas"], [50935, "NoiseReductionApplied"], [50974, "SubTileBlockSize"], [50975, "RowInterleaveFactor"], [51008, "OpcodeList1"], [51009, "OpcodeList2"], [51022, "OpcodeList3"], [51041, "NoiseProfile"], [51114, "CacheVersion"], [51125, "DefaultUserCrop"], [51157, "NikonNEFInfo"], [65024, "KdcIFD"]];
  F(E, "ifd0", ct), F(E, "exif", ct), U(B, "gps", [[23, { M: "Magnetic North", T: "True North" }], [25, { K: "Kilometers", M: "Miles", N: "Nautical Miles" }]]);
  class ft extends re {
    static canHandle(e2, t2) {
      return 224 === e2.getUint8(t2 + 1) && 1246120262 === e2.getUint32(t2 + 4) && 0 === e2.getUint8(t2 + 8);
    }
    parse() {
      return this.parseTags(), this.translate(), this.output;
    }
    parseTags() {
      this.raw = /* @__PURE__ */ new Map([[0, this.chunk.getUint16(0)], [2, this.chunk.getUint8(2)], [3, this.chunk.getUint16(3)], [5, this.chunk.getUint16(5)], [7, this.chunk.getUint8(7)], [8, this.chunk.getUint8(8)]]);
    }
  }
  c(ft, "type", "jfif"), c(ft, "headerLength", 9), T.set("jfif", ft), U(E, "jfif", [[0, "JFIFVersion"], [2, "ResolutionUnit"], [3, "XResolution"], [5, "YResolution"], [7, "ThumbnailWidth"], [8, "ThumbnailHeight"]]);
  class dt extends re {
    parse() {
      return this.parseTags(), this.translate(), this.output;
    }
    parseTags() {
      this.raw = new Map([[0, this.chunk.getUint32(0)], [4, this.chunk.getUint32(4)], [8, this.chunk.getUint8(8)], [9, this.chunk.getUint8(9)], [10, this.chunk.getUint8(10)], [11, this.chunk.getUint8(11)], [12, this.chunk.getUint8(12)], ...Array.from(this.raw)]);
    }
  }
  c(dt, "type", "ihdr"), T.set("ihdr", dt), U(E, "ihdr", [[0, "ImageWidth"], [4, "ImageHeight"], [8, "BitDepth"], [9, "ColorType"], [10, "Compression"], [11, "Filter"], [12, "Interlace"]]), U(B, "ihdr", [[9, { 0: "Grayscale", 2: "RGB", 3: "Palette", 4: "Grayscale with Alpha", 6: "RGB with Alpha", DEFAULT: "Unknown" }], [10, { 0: "Deflate/Inflate", DEFAULT: "Unknown" }], [11, { 0: "Adaptive", DEFAULT: "Unknown" }], [12, { 0: "Noninterlaced", 1: "Adam7 Interlace", DEFAULT: "Unknown" }]]);
  class pt extends re {
    static canHandle(e2, t2) {
      return 226 === e2.getUint8(t2 + 1) && 1229144927 === e2.getUint32(t2 + 4);
    }
    static findPosition(e2, t2) {
      let i2 = super.findPosition(e2, t2);
      return i2.chunkNumber = e2.getUint8(t2 + 16), i2.chunkCount = e2.getUint8(t2 + 17), i2.multiSegment = i2.chunkCount > 1, i2;
    }
    static handleMultiSegments(e2) {
      return (function(e3) {
        let t2 = (function(e4) {
          let t3 = e4[0].constructor, i2 = 0;
          for (let t4 of e4) i2 += t4.length;
          let n2 = new t3(i2), s2 = 0;
          for (let t4 of e4) n2.set(t4, s2), s2 += t4.length;
          return n2;
        })(e3.map(((e4) => e4.chunk.toUint8())));
        return new I(t2);
      })(e2);
    }
    parse() {
      return this.raw = /* @__PURE__ */ new Map(), this.parseHeader(), this.parseTags(), this.translate(), this.output;
    }
    parseHeader() {
      let { raw: e2 } = this;
      this.chunk.byteLength < 84 && g("ICC header is too short");
      for (let [t2, i2] of Object.entries(gt)) {
        t2 = parseInt(t2, 10);
        let n2 = i2(this.chunk, t2);
        "\0\0\0\0" !== n2 && e2.set(t2, n2);
      }
    }
    parseTags() {
      let e2, t2, i2, n2, s2, { raw: r2 } = this, a2 = this.chunk.getUint32(128), o2 = 132, l2 = this.chunk.byteLength;
      for (; a2--; ) {
        if (e2 = this.chunk.getString(o2, 4), t2 = this.chunk.getUint32(o2 + 4), i2 = this.chunk.getUint32(o2 + 8), n2 = this.chunk.getString(t2, 4), t2 + i2 > l2) return void console.warn("reached the end of the first ICC chunk. Enable options.tiff.multiSegment to read all ICC segments.");
        s2 = this.parseTag(n2, t2, i2), void 0 !== s2 && "\0\0\0\0" !== s2 && r2.set(e2, s2), o2 += 12;
      }
    }
    parseTag(e2, t2, i2) {
      switch (e2) {
        case "desc":
          return this.parseDesc(t2);
        case "mluc":
          return this.parseMluc(t2);
        case "text":
          return this.parseText(t2, i2);
        case "sig ":
          return this.parseSig(t2);
      }
      if (!(t2 + i2 > this.chunk.byteLength)) return this.chunk.getUint8Array(t2, i2);
    }
    parseDesc(e2) {
      let t2 = this.chunk.getUint32(e2 + 8) - 1;
      return m(this.chunk.getString(e2 + 12, t2));
    }
    parseText(e2, t2) {
      return m(this.chunk.getString(e2 + 8, t2 - 8));
    }
    parseSig(e2) {
      return m(this.chunk.getString(e2 + 8, 4));
    }
    parseMluc(e2) {
      let { chunk: t2 } = this, i2 = t2.getUint32(e2 + 8), n2 = t2.getUint32(e2 + 12), s2 = e2 + 16, r2 = [];
      for (let a2 = 0; a2 < i2; a2++) {
        let i3 = t2.getString(s2 + 0, 2), a3 = t2.getString(s2 + 2, 2), o2 = t2.getUint32(s2 + 4), l2 = t2.getUint32(s2 + 8) + e2, h2 = m(t2.getUnicodeString(l2, o2));
        r2.push({ lang: i3, country: a3, text: h2 }), s2 += n2;
      }
      return 1 === i2 ? r2[0].text : r2;
    }
    translateValue(e2, t2) {
      return "string" == typeof e2 ? t2[e2] || t2[e2.toLowerCase()] || e2 : t2[e2] || e2;
    }
  }
  c(pt, "type", "icc"), c(pt, "multiSegment", true), c(pt, "headerLength", 18);
  const gt = { 4: mt, 8: function(e2, t2) {
    return [e2.getUint8(t2), e2.getUint8(t2 + 1) >> 4, e2.getUint8(t2 + 1) % 16].map(((e3) => e3.toString(10))).join(".");
  }, 12: mt, 16: mt, 20: mt, 24: function(e2, t2) {
    const i2 = e2.getUint16(t2), n2 = e2.getUint16(t2 + 2) - 1, s2 = e2.getUint16(t2 + 4), r2 = e2.getUint16(t2 + 6), a2 = e2.getUint16(t2 + 8), o2 = e2.getUint16(t2 + 10);
    return new Date(Date.UTC(i2, n2, s2, r2, a2, o2));
  }, 36: mt, 40: mt, 48: mt, 52: mt, 64: (e2, t2) => e2.getUint32(t2), 80: mt };
  function mt(e2, t2) {
    return m(e2.getString(t2, 4));
  }
  T.set("icc", pt), U(E, "icc", [[4, "ProfileCMMType"], [8, "ProfileVersion"], [12, "ProfileClass"], [16, "ColorSpaceData"], [20, "ProfileConnectionSpace"], [24, "ProfileDateTime"], [36, "ProfileFileSignature"], [40, "PrimaryPlatform"], [44, "CMMFlags"], [48, "DeviceManufacturer"], [52, "DeviceModel"], [56, "DeviceAttributes"], [64, "RenderingIntent"], [68, "ConnectionSpaceIlluminant"], [80, "ProfileCreator"], [84, "ProfileID"], ["Header", "ProfileHeader"], ["MS00", "WCSProfiles"], ["bTRC", "BlueTRC"], ["bXYZ", "BlueMatrixColumn"], ["bfd", "UCRBG"], ["bkpt", "MediaBlackPoint"], ["calt", "CalibrationDateTime"], ["chad", "ChromaticAdaptation"], ["chrm", "Chromaticity"], ["ciis", "ColorimetricIntentImageState"], ["clot", "ColorantTableOut"], ["clro", "ColorantOrder"], ["clrt", "ColorantTable"], ["cprt", "ProfileCopyright"], ["crdi", "CRDInfo"], ["desc", "ProfileDescription"], ["devs", "DeviceSettings"], ["dmdd", "DeviceModelDesc"], ["dmnd", "DeviceMfgDesc"], ["dscm", "ProfileDescriptionML"], ["fpce", "FocalPlaneColorimetryEstimates"], ["gTRC", "GreenTRC"], ["gXYZ", "GreenMatrixColumn"], ["gamt", "Gamut"], ["kTRC", "GrayTRC"], ["lumi", "Luminance"], ["meas", "Measurement"], ["meta", "Metadata"], ["mmod", "MakeAndModel"], ["ncl2", "NamedColor2"], ["ncol", "NamedColor"], ["ndin", "NativeDisplayInfo"], ["pre0", "Preview0"], ["pre1", "Preview1"], ["pre2", "Preview2"], ["ps2i", "PS2RenderingIntent"], ["ps2s", "PostScript2CSA"], ["psd0", "PostScript2CRD0"], ["psd1", "PostScript2CRD1"], ["psd2", "PostScript2CRD2"], ["psd3", "PostScript2CRD3"], ["pseq", "ProfileSequenceDesc"], ["psid", "ProfileSequenceIdentifier"], ["psvm", "PS2CRDVMSize"], ["rTRC", "RedTRC"], ["rXYZ", "RedMatrixColumn"], ["resp", "OutputResponse"], ["rhoc", "ReflectionHardcopyOrigColorimetry"], ["rig0", "PerceptualRenderingIntentGamut"], ["rig2", "SaturationRenderingIntentGamut"], ["rpoc", "ReflectionPrintOutputColorimetry"], ["sape", "SceneAppearanceEstimates"], ["scoe", "SceneColorimetryEstimates"], ["scrd", "ScreeningDesc"], ["scrn", "Screening"], ["targ", "CharTarget"], ["tech", "Technology"], ["vcgt", "VideoCardGamma"], ["view", "ViewingConditions"], ["vued", "ViewingCondDesc"], ["wtpt", "MediaWhitePoint"]]);
  const St = { "4d2p": "Erdt Systems", AAMA: "Aamazing Technologies", ACER: "Acer", ACLT: "Acolyte Color Research", ACTI: "Actix Sytems", ADAR: "Adara Technology", ADBE: "Adobe", ADI: "ADI Systems", AGFA: "Agfa Graphics", ALMD: "Alps Electric", ALPS: "Alps Electric", ALWN: "Alwan Color Expertise", AMTI: "Amiable Technologies", AOC: "AOC International", APAG: "Apago", APPL: "Apple Computer", AST: "AST", "AT&T": "AT&T", BAEL: "BARBIERI electronic", BRCO: "Barco NV", BRKP: "Breakpoint", BROT: "Brother", BULL: "Bull", BUS: "Bus Computer Systems", "C-IT": "C-Itoh", CAMR: "Intel", CANO: "Canon", CARR: "Carroll Touch", CASI: "Casio", CBUS: "Colorbus PL", CEL: "Crossfield", CELx: "Crossfield", CGS: "CGS Publishing Technologies International", CHM: "Rochester Robotics", CIGL: "Colour Imaging Group, London", CITI: "Citizen", CL00: "Candela", CLIQ: "Color IQ", CMCO: "Chromaco", CMiX: "CHROMiX", COLO: "Colorgraphic Communications", COMP: "Compaq", COMp: "Compeq/Focus Technology", CONR: "Conrac Display Products", CORD: "Cordata Technologies", CPQ: "Compaq", CPRO: "ColorPro", CRN: "Cornerstone", CTX: "CTX International", CVIS: "ColorVision", CWC: "Fujitsu Laboratories", DARI: "Darius Technology", DATA: "Dataproducts", DCP: "Dry Creek Photo", DCRC: "Digital Contents Resource Center, Chung-Ang University", DELL: "Dell Computer", DIC: "Dainippon Ink and Chemicals", DICO: "Diconix", DIGI: "Digital", "DL&C": "Digital Light & Color", DPLG: "Doppelganger", DS: "Dainippon Screen", DSOL: "DOOSOL", DUPN: "DuPont", EPSO: "Epson", ESKO: "Esko-Graphics", ETRI: "Electronics and Telecommunications Research Institute", EVER: "Everex Systems", EXAC: "ExactCODE", Eizo: "Eizo", FALC: "Falco Data Products", FF: "Fuji Photo Film", FFEI: "FujiFilm Electronic Imaging", FNRD: "Fnord Software", FORA: "Fora", FORE: "Forefront Technology", FP: "Fujitsu", FPA: "WayTech Development", FUJI: "Fujitsu", FX: "Fuji Xerox", GCC: "GCC Technologies", GGSL: "Global Graphics Software", GMB: "Gretagmacbeth", GMG: "GMG", GOLD: "GoldStar Technology", GOOG: "Google", GPRT: "Giantprint", GTMB: "Gretagmacbeth", GVC: "WayTech Development", GW2K: "Sony", HCI: "HCI", HDM: "Heidelberger Druckmaschinen", HERM: "Hermes", HITA: "Hitachi America", HP: "Hewlett-Packard", HTC: "Hitachi", HiTi: "HiTi Digital", IBM: "IBM", IDNT: "Scitex", IEC: "Hewlett-Packard", IIYA: "Iiyama North America", IKEG: "Ikegami Electronics", IMAG: "Image Systems", IMI: "Ingram Micro", INTC: "Intel", INTL: "N/A (INTL)", INTR: "Intra Electronics", IOCO: "Iocomm International Technology", IPS: "InfoPrint Solutions Company", IRIS: "Scitex", ISL: "Ichikawa Soft Laboratory", ITNL: "N/A (ITNL)", IVM: "IVM", IWAT: "Iwatsu Electric", Idnt: "Scitex", Inca: "Inca Digital Printers", Iris: "Scitex", JPEG: "Joint Photographic Experts Group", JSFT: "Jetsoft Development", JVC: "JVC Information Products", KART: "Scitex", KFC: "KFC Computek Components", KLH: "KLH Computers", KMHD: "Konica Minolta", KNCA: "Konica", KODA: "Kodak", KYOC: "Kyocera", Kart: "Scitex", LCAG: "Leica", LCCD: "Leeds Colour", LDAK: "Left Dakota", LEAD: "Leading Technology", LEXM: "Lexmark International", LINK: "Link Computer", LINO: "Linotronic", LITE: "Lite-On", Leaf: "Leaf", Lino: "Linotronic", MAGC: "Mag Computronic", MAGI: "MAG Innovision", MANN: "Mannesmann", MICN: "Micron Technology", MICR: "Microtek", MICV: "Microvitec", MINO: "Minolta", MITS: "Mitsubishi Electronics America", MITs: "Mitsuba", MNLT: "Minolta", MODG: "Modgraph", MONI: "Monitronix", MONS: "Monaco Systems", MORS: "Morse Technology", MOTI: "Motive Systems", MSFT: "Microsoft", MUTO: "MUTOH INDUSTRIES", Mits: "Mitsubishi Electric", NANA: "NANAO", NEC: "NEC", NEXP: "NexPress Solutions", NISS: "Nissei Sangyo America", NKON: "Nikon", NONE: "none", OCE: "Oce Technologies", OCEC: "OceColor", OKI: "Oki", OKID: "Okidata", OKIP: "Okidata", OLIV: "Olivetti", OLYM: "Olympus", ONYX: "Onyx Graphics", OPTI: "Optiquest", PACK: "Packard Bell", PANA: "Matsushita Electric Industrial", PANT: "Pantone", PBN: "Packard Bell", PFU: "PFU", PHIL: "Philips Consumer Electronics", PNTX: "HOYA", POne: "Phase One A/S", PREM: "Premier Computer Innovations", PRIN: "Princeton Graphic Systems", PRIP: "Princeton Publishing Labs", QLUX: "Hong Kong", QMS: "QMS", QPCD: "QPcard AB", QUAD: "QuadLaser", QUME: "Qume", RADI: "Radius", RDDx: "Integrated Color Solutions", RDG: "Roland DG", REDM: "REDMS Group", RELI: "Relisys", RGMS: "Rolf Gierling Multitools", RICO: "Ricoh", RNLD: "Edmund Ronald", ROYA: "Royal", RPC: "Ricoh Printing Systems", RTL: "Royal Information Electronics", SAMP: "Sampo", SAMS: "Samsung", SANT: "Jaime Santana Pomares", SCIT: "Scitex", SCRN: "Dainippon Screen", SDP: "Scitex", SEC: "Samsung", SEIK: "Seiko Instruments", SEIk: "Seikosha", SGUY: "ScanGuy.com", SHAR: "Sharp Laboratories", SICC: "International Color Consortium", SONY: "Sony", SPCL: "SpectraCal", STAR: "Star", STC: "Sampo Technology", Scit: "Scitex", Sdp: "Scitex", Sony: "Sony", TALO: "Talon Technology", TAND: "Tandy", TATU: "Tatung", TAXA: "TAXAN America", TDS: "Tokyo Denshi Sekei", TECO: "TECO Information Systems", TEGR: "Tegra", TEKT: "Tektronix", TI: "Texas Instruments", TMKR: "TypeMaker", TOSB: "Toshiba", TOSH: "Toshiba", TOTK: "TOTOKU ELECTRIC", TRIU: "Triumph", TSBT: "Toshiba", TTX: "TTX Computer Products", TVM: "TVM Professional Monitor", TW: "TW Casper", ULSX: "Ulead Systems", UNIS: "Unisys", UTZF: "Utz Fehlau & Sohn", VARI: "Varityper", VIEW: "Viewsonic", VISL: "Visual communication", VIVO: "Vivo Mobile Communication", WANG: "Wang", WLBR: "Wilbur Imaging", WTG2: "Ware To Go", WYSE: "WYSE Technology", XERX: "Xerox", XRIT: "X-Rite", ZRAN: "Zoran", Zebr: "Zebra Technologies", appl: "Apple Computer", bICC: "basICColor", berg: "bergdesign", ceyd: "Integrated Color Solutions", clsp: "MacDermid ColorSpan", ds: "Dainippon Screen", dupn: "DuPont", ffei: "FujiFilm Electronic Imaging", flux: "FluxData", iris: "Scitex", kart: "Scitex", lcms: "Little CMS", lino: "Linotronic", none: "none", ob4d: "Erdt Systems", obic: "Medigraph", quby: "Qubyx Sarl", scit: "Scitex", scrn: "Dainippon Screen", sdp: "Scitex", siwi: "SIWI GRAFIKA", yxym: "YxyMaster" }, Ct = { scnr: "Scanner", mntr: "Monitor", prtr: "Printer", link: "Device Link", abst: "Abstract", spac: "Color Space Conversion Profile", nmcl: "Named Color", cenc: "ColorEncodingSpace profile", mid: "MultiplexIdentification profile", mlnk: "MultiplexLink profile", mvis: "MultiplexVisualization profile", nkpf: "Nikon Input Device Profile (NON-STANDARD!)" };
  U(B, "icc", [[4, St], [12, Ct], [40, Object.assign({}, St, Ct)], [48, St], [80, St], [64, { 0: "Perceptual", 1: "Relative Colorimetric", 2: "Saturation", 3: "Absolute Colorimetric" }], ["tech", { amd: "Active Matrix Display", crt: "Cathode Ray Tube Display", kpcd: "Photo CD", pmd: "Passive Matrix Display", dcam: "Digital Camera", dcpj: "Digital Cinema Projector", dmpc: "Digital Motion Picture Camera", dsub: "Dye Sublimation Printer", epho: "Electrophotographic Printer", esta: "Electrostatic Printer", flex: "Flexography", fprn: "Film Writer", fscn: "Film Scanner", grav: "Gravure", ijet: "Ink Jet Printer", imgs: "Photo Image Setter", mpfr: "Motion Picture Film Recorder", mpfs: "Motion Picture Film Scanner", offs: "Offset Lithography", pjtv: "Projection Television", rpho: "Photographic Paper Printer", rscn: "Reflective Scanner", silk: "Silkscreen", twax: "Thermal Wax Printer", vidc: "Video Camera", vidm: "Video Monitor" }]]);
  class yt extends re {
    static canHandle(e2, t2, i2) {
      return 237 === e2.getUint8(t2 + 1) && "Photoshop" === e2.getString(t2 + 4, 9) && void 0 !== this.containsIptc8bim(e2, t2, i2);
    }
    static headerLength(e2, t2, i2) {
      let n2, s2 = this.containsIptc8bim(e2, t2, i2);
      if (void 0 !== s2) return n2 = e2.getUint8(t2 + s2 + 7), n2 % 2 != 0 && (n2 += 1), 0 === n2 && (n2 = 4), s2 + 8 + n2;
    }
    static containsIptc8bim(e2, t2, i2) {
      for (let n2 = 0; n2 < i2; n2++) if (this.isIptcSegmentHead(e2, t2 + n2)) return n2;
    }
    static isIptcSegmentHead(e2, t2) {
      return 56 === e2.getUint8(t2) && 943868237 === e2.getUint32(t2) && 1028 === e2.getUint16(t2 + 4);
    }
    parse() {
      let { raw: e2 } = this, t2 = this.chunk.byteLength - 1, i2 = false;
      for (let n2 = 0; n2 < t2; n2++) if (28 === this.chunk.getUint8(n2) && 2 === this.chunk.getUint8(n2 + 1)) {
        i2 = true;
        let t3 = this.chunk.getUint16(n2 + 3), s2 = this.chunk.getUint8(n2 + 2), r2 = this.chunk.getLatin1String(n2 + 5, t3);
        e2.set(s2, this.pluralizeValue(e2.get(s2), r2)), n2 += 4 + t3;
      } else if (i2) break;
      return this.translate(), this.output;
    }
    pluralizeValue(e2, t2) {
      return void 0 !== e2 ? e2 instanceof Array ? (e2.push(t2), e2) : [e2, t2] : t2;
    }
  }
  c(yt, "type", "iptc"), c(yt, "translateValues", false), c(yt, "reviveValues", false), T.set("iptc", yt), U(E, "iptc", [[0, "ApplicationRecordVersion"], [3, "ObjectTypeReference"], [4, "ObjectAttributeReference"], [5, "ObjectName"], [7, "EditStatus"], [8, "EditorialUpdate"], [10, "Urgency"], [12, "SubjectReference"], [15, "Category"], [20, "SupplementalCategories"], [22, "FixtureIdentifier"], [25, "Keywords"], [26, "ContentLocationCode"], [27, "ContentLocationName"], [30, "ReleaseDate"], [35, "ReleaseTime"], [37, "ExpirationDate"], [38, "ExpirationTime"], [40, "SpecialInstructions"], [42, "ActionAdvised"], [45, "ReferenceService"], [47, "ReferenceDate"], [50, "ReferenceNumber"], [55, "DateCreated"], [60, "TimeCreated"], [62, "DigitalCreationDate"], [63, "DigitalCreationTime"], [65, "OriginatingProgram"], [70, "ProgramVersion"], [75, "ObjectCycle"], [80, "Byline"], [85, "BylineTitle"], [90, "City"], [92, "Sublocation"], [95, "State"], [100, "CountryCode"], [101, "Country"], [103, "OriginalTransmissionReference"], [105, "Headline"], [110, "Credit"], [115, "Source"], [116, "CopyrightNotice"], [118, "Contact"], [120, "Caption"], [121, "LocalCaption"], [122, "Writer"], [125, "RasterizedCaption"], [130, "ImageType"], [131, "ImageOrientation"], [135, "LanguageIdentifier"], [150, "AudioType"], [151, "AudioSamplingRate"], [152, "AudioSamplingResolution"], [153, "AudioDuration"], [154, "AudioOutcue"], [184, "JobID"], [185, "MasterDocumentID"], [186, "ShortDocumentID"], [187, "UniqueDocumentID"], [188, "OwnerID"], [200, "ObjectPreviewFileFormat"], [201, "ObjectPreviewFileVersion"], [202, "ObjectPreviewData"], [221, "Prefs"], [225, "ClassifyState"], [228, "SimilarityIndex"], [230, "DocumentNotes"], [231, "DocumentHistory"], [232, "ExifCameraInfo"], [255, "CatalogSets"]]), U(B, "iptc", [[10, { 0: "0 (reserved)", 1: "1 (most urgent)", 2: "2", 3: "3", 4: "4", 5: "5 (normal urgency)", 6: "6", 7: "7", 8: "8 (least urgent)", 9: "9 (user-defined priority)" }], [75, { a: "Morning", b: "Both Morning and Evening", p: "Evening" }], [131, { L: "Landscape", P: "Portrait", S: "Square" }]]);
  function detectSubsampling(img) {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (iw * ih > 1024 * 1024) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, -iw + 1, 0);
      return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    }
    return false;
  }
  function detectVerticalSquash(img, iw, ih) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data2 = ctx.getImageData(0, 0, 1, ih).data;
    let sy = 0;
    let ey = ih;
    let py = ih;
    while (py > sy) {
      const alpha = data2[(py - 1) * 4 + 3];
      if (alpha === 0) ey = py;
      else sy = py;
      py = ey + sy >> 1;
    }
    const ratio = py / ih;
    return ratio === 0 ? 1 : ratio;
  }
  function renderImageToDataURL(img, options, doSquash) {
    const canvas = document.createElement("canvas");
    renderImageToCanvas(img, canvas, options, doSquash);
    return canvas.toDataURL("image/jpeg", options.quality || 0.8);
  }
  function renderImageToCanvas(img, canvas, options, doSquash) {
    let iw = img.naturalWidth;
    let ih = img.naturalHeight;
    if (!(iw + ih)) return;
    const width = options.width;
    const height = options.height;
    const ctx = canvas.getContext("2d");
    ctx.save();
    transformCoordinate(canvas, ctx, width, height, options.orientation);
    const subsampled = detectSubsampling(img);
    if (subsampled) {
      iw /= 2;
      ih /= 2;
    }
    const d2 = 1024;
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = tmpCanvas.height = d2;
    const tmpCtx = tmpCanvas.getContext("2d");
    const vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
    const dw = Math.ceil(d2 * width / iw);
    const dh = Math.ceil(d2 * height / ih / vertSquashRatio);
    let sy = 0;
    let dy = 0;
    while (sy < ih) {
      let sx = 0;
      let dx = 0;
      while (sx < iw) {
        tmpCtx.clearRect(0, 0, d2, d2);
        tmpCtx.drawImage(img, -sx, -sy);
        ctx.drawImage(tmpCanvas, 0, 0, d2, d2, dx, dy, dw, dh);
        sx += d2;
        dx += dw;
      }
      sy += d2;
      dy += dh;
    }
    ctx.restore();
  }
  function transformCoordinate(canvas, ctx, width, height, orientation) {
    switch (orientation) {
      case 5:
      case 6:
      case 7:
      case 8:
        canvas.width = height;
        canvas.height = width;
        break;
      default:
        canvas.width = width;
        canvas.height = height;
    }
    switch (orientation) {
      case 2:
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
      case 4:
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
        break;
      case 7:
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
    }
  }
  const URL$1 = typeof window !== "undefined" ? window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null : null;
  class MegaPixImage {
    constructor(srcImage) {
      if (typeof window !== "undefined") {
        if (window.Blob && srcImage instanceof Blob) {
          if (!URL$1) throw Error("No createObjectURL function found");
          const img = new Image();
          img.src = URL$1.createObjectURL(srcImage);
          this.blob = srcImage;
          srcImage = img;
        }
        if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
          this.imageLoadListeners = [];
          const _this = this;
          srcImage.onload = srcImage.onerror = function() {
            const listeners = _this.imageLoadListeners;
            if (listeners) {
              _this.imageLoadListeners = null;
              listeners.forEach((fn) => fn());
            }
          };
        }
        this.srcImage = srcImage;
      }
    }
    render(target, options, callback) {
      if (this.imageLoadListeners) {
        this.imageLoadListeners.push(() => {
          this.render(target, options, callback);
        });
        return;
      }
      options = options || {};
      const imgWidth = this.srcImage.naturalWidth;
      const imgHeight = this.srcImage.naturalHeight;
      let width = options.width;
      let height = options.height;
      const maxWidth = options.maxWidth;
      const maxHeight = options.maxHeight;
      const doSquash = !this.blob || this.blob.type === "image/jpeg";
      if (width && !height) height = imgHeight * width / imgWidth << 0;
      else if (height && !width) width = imgWidth * height / imgHeight << 0;
      else {
        width = imgWidth;
        height = imgHeight;
      }
      if (maxWidth && width > maxWidth) {
        width = maxWidth;
        height = imgHeight * width / imgWidth << 0;
      }
      if (maxHeight && height > maxHeight) {
        height = maxHeight;
        width = imgWidth * height / imgHeight << 0;
      }
      const opt = { width, height, ...options };
      const tagName = target.tagName.toLowerCase();
      if (tagName === "img")
        target.src = renderImageToDataURL(this.srcImage, opt, doSquash);
      else if (tagName === "canvas")
        renderImageToCanvas(this.srcImage, target, opt, doSquash);
      if (typeof this.onrender === "function") this.onrender(target);
      if (callback) callback();
      if (this.blob) {
        this.blob = null;
        URL$1.revokeObjectURL(this.srcImage.src);
      }
    }
  }
  const prefixCls$d = "dpzvc3-upload";
  const Upload = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Upload",
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: "image/*"
      },
      styles: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ["on-change-file"],
    setup(props2, {
      emit,
      slots
    }) {
      const {
        proxy
      } = vue.getCurrentInstance();
      const files = vue.ref([]);
      const fileLength = vue.ref(0);
      const uploadRef = vue.ref(null);
      const classes = vue.computed(() => [prefixCls$d]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$d}-wrapper`]);
      vue.watch(files, (val) => {
        emit("on-change-file", val);
      });
      const showPhoto = async (e2) => {
        const input = e2.target;
        const fileList = input.files;
        if (!fileList || !proxy) return;
        proxy.$Indicator?.snake({
          text: "上传中"
        });
        files.value = [];
        fileLength.value = fileList.length;
        for (let i2 = 0; i2 < fileList.length; i2++) {
          const file = fileList[i2];
          try {
            const orientation = await tt.orientation(file);
            const dataURL = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
            });
            const img = new Image();
            img.src = dataURL;
            await new Promise((resolve) => {
              img.onload = () => {
                create(img, orientation);
                resolve();
              };
            });
          } catch (err) {
            console.error("读取图片失败", err);
          }
        }
        input.value = "";
      };
      const create = (file, orientation) => {
        const img = new Image();
        const mpImg = new MegaPixImage(file);
        mpImg.render(img, {
          maxWidth: 600,
          quality: 0.8
        });
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let data2 = canvas.toDataURL("image/jpeg", 0.8);
          if (/iphone/i.test(navigator.userAgent) && orientation && orientation !== 1) {
            rotateImg(img, orientation, canvas);
            data2 = canvas.toDataURL("image/jpeg", 0.8);
          }
          if (/android/i.test(navigator.userAgent)) {
            const encoder = new JPEG.JPEGEncoder();
            data2 = encoder.encode(ctx.getImageData(0, 0, canvas.width, canvas.height), 80);
          }
          files.value.push({
            base64: data2,
            clearBase64: data2.slice(data2.indexOf(",") + 1)
          });
          if (files.value.length === fileLength.value) {
            proxy.$Indicator?.remove();
          }
        };
      };
      const rotateImg = (img, orientation, canvas) => {
        const ctx = canvas.getContext("2d");
        const width = img.width;
        const height = img.height;
        switch (orientation) {
          case 6:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(img, 0, -height);
            break;
          case 8:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(-Math.PI / 2);
            ctx.drawImage(img, -width, 0);
            break;
          case 3:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(Math.PI);
            ctx.drawImage(img, -width, -height);
            break;
        }
      };
      return () => vue.createVNode("div", {
        "class": classes.value,
        "style": props2.styles
      }, [slots.default ? slots.default() : vue.createVNode("div", {
        "class": wrapperClasses.value
      }, [vue.createTextVNode("图片上传")]), vue.createVNode("input", {
        "ref": uploadRef,
        "type": "file",
        "accept": props2.accept,
        "multiple": props2.multiple,
        "onChange": showPhoto
      }, null)]);
    }
  });
  Upload.install = (app) => {
    app.component("Upload", Upload);
  };
  const _Upload = Upload;
  const inputEmits$2 = {
    "update:modelValue": (value) => true
  };
  const prefixCls$c = "dpzvc3-actionSheet";
  const ActionSheet = /* @__PURE__ */ vue.defineComponent({
    name: "ActionSheet",
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: () => []
      },
      cancleText: {
        type: String,
        default: "取消"
      }
    },
    emits: inputEmits$2,
    setup(props2, {
      emit
    }) {
      const visible = vue.ref(props2.modelValue);
      const actions = vue.ref(props2.items);
      vue.watch(() => props2.modelValue, (val) => {
        visible.value = val;
      });
      vue.watch(() => props2.items, (val) => {
        actions.value = val;
      });
      const classes = vue.computed(() => [prefixCls$c]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$c}-wrapper`]);
      const wrapperActionClass = vue.computed(() => [`${prefixCls$c}-wrapper-action`]);
      const cancleClass = vue.computed(() => [`${prefixCls$c}-cancle`]);
      const emitAction = (item, index) => {
        item.onClick?.(item, index);
        emit("update:modelValue", false);
      };
      const cancleClick = () => {
        emit("update:modelValue", false);
      };
      return () => vue.createVNode("div", null, [vue.createVNode(_Popup, {
        "modelValue": visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        "position": "bottom",
        "maskClosable": false,
        "styles": {
          background: "transparent"
        }
      }, {
        default: () => [vue.createVNode("div", {
          "class": classes.value
        }, [vue.createVNode("ul", {
          "class": wrapperClasses.value
        }, [actions.value?.map((item, index) => vue.createVNode("li", {
          "key": index,
          "class": wrapperActionClass.value,
          "onClick": () => emitAction(item, index)
        }, [vue.createVNode("span", null, [item.text])]))]), props2.cancleText && vue.createVNode("a", {
          "href": "javascript:;",
          "class": cancleClass.value,
          "onClick": cancleClick
        }, [props2.cancleText])])]
      })]);
    }
  });
  ActionSheet.install = (app) => {
    app.component("ActionSheet", ActionSheet);
  };
  const _ActionSheet = ActionSheet;
  const prefixCls$b = "dpzvc3-switch";
  const SwitchBar = /* @__PURE__ */ vue.defineComponent({
    name: "SwitchBar",
    props: {
      id: {
        type: String,
        default: null
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: "small"
      }
    },
    emits: ["update:modelValue"],
    setup(props2, {
      emit
    }) {
      const name = vue.ref(props2.id || "");
      const currentValue = vue.ref(props2.modelValue);
      vue.watch(() => props2.modelValue, (val) => {
        currentValue.value = val;
      });
      vue.watch(currentValue, (val) => {
        emit("update:modelValue", val);
      });
      vue.onMounted(() => {
        if (!props2.id) {
          name.value = Date.now() + "_" + randomStr();
        }
      });
      const classes = vue.computed(() => [prefixCls$b]);
      const inputCheckClasses = vue.computed(() => [`${prefixCls$b}-checkbox`, "hidden"]);
      const sizeClasses = vue.computed(() => [`${prefixCls$b}-ui`, {
        small: props2.size === "small"
      }]);
      return () => vue.createVNode("div", {
        "class": classes.value
      }, [vue.withDirectives(vue.createVNode("input", {
        "id": name.value,
        "type": "checkbox",
        "class": inputCheckClasses.value,
        "onUpdate:modelValue": ($event) => currentValue.value = $event
      }, null), [[vue.vModelCheckbox, currentValue.value]]), vue.createVNode("label", {
        "for": name.value,
        "class": sizeClasses.value
      }, null)]);
    }
  });
  SwitchBar.install = (app) => {
    app.component("SwitchBar", SwitchBar);
  };
  const _SwitchBar = SwitchBar;
  const prefixCls$a = "dpzvc3-rater";
  const Rater = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Rater",
    props: {
      modelValue: {
        type: Number,
        default: -1
      },
      distance: {
        type: Number,
        default: 10
      },
      max: {
        type: Number,
        default: 5
      },
      size: {
        type: Number,
        default: 18
      },
      star: {
        type: String,
        default: "★"
      },
      defaultColor: {
        type: String,
        default: "#ccc"
      },
      activeColor: {
        type: String,
        default: "#f5a623"
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:modelValue"],
    setup(props2, {
      emit
    }) {
      const currentValue = vue.ref(props2.modelValue);
      vue.watch(() => props2.modelValue, (v2) => {
        currentValue.value = v2;
      });
      const classes = vue.computed(() => [prefixCls$a]);
      const starClass = `${prefixCls$a}-star`;
      const stars = vue.computed(() => {
        return Array.from({
          length: props2.max
        }).map((_2, index) => {
          const baseStyle = {
            fontSize: `${props2.size}px`,
            marginRight: index + 1 < props2.max ? `${props2.distance}px` : "0px",
            color: props2.defaultColor
          };
          const activeStyle = {
            fontSize: `${props2.size}px`,
            marginRight: baseStyle.marginRight
          };
          const [int, decimal] = String(currentValue.value).split(".");
          if (index + 1 <= Number(int)) {
            activeStyle.color = props2.activeColor;
          }
          if (decimal && Number(decimal) >= 5 && index + 1 === Number(int) + 1) {
            activeStyle.width = "50%";
            activeStyle.color = props2.activeColor;
          }
          return {
            index,
            baseStyle,
            activeStyle
          };
        });
      });
      const onClickStar = (index) => {
        if (props2.disabled) return;
        const value = index + 1;
        currentValue.value = value;
        emit("update:modelValue", value);
      };
      return () => vue.createVNode("div", {
        "class": classes.value
      }, [stars.value.map((item) => vue.createVNode("span", {
        "key": item.index,
        "class": starClass,
        "style": item.baseStyle
      }, [props2.star, vue.createVNode("span", {
        "style": item.activeStyle,
        "onClick": () => onClickStar(item.index)
      }, [props2.star])]))]);
    }
  });
  Rater.install = (app) => {
    app.component("Rater", Rater);
  };
  const _Rater = Rater;
  const inputEmits$1 = {
    "on-change-up-status": (value) => {
    },
    "on-change-down-status": (value) => {
    }
  };
  const prefixCls$9 = "dpzvc3-loadmore";
  const DpLoadMore = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Loadmore",
    props: {
      height: {
        type: [Number, String],
        default: "100%"
      },
      refresh: Function,
      upLoadingText: {
        type: String,
        default: "加载中..."
      },
      upDistance: {
        type: Number,
        default: 70
      },
      upPullText: {
        type: String,
        default: "↓ 下拉刷新"
      },
      upDropText: {
        type: String,
        default: "↑ 释放更新"
      },
      maxDistance: {
        type: Number,
        default: 0
      },
      speed: {
        type: Number,
        default: 3
      },
      downEndText: {
        type: String,
        default: "没有更多了"
      },
      downDropText: {
        type: String,
        default: "↑ 上拉加载数据"
      },
      downLoadingText: {
        type: String,
        default: "加载中..."
      },
      downDistance: {
        type: Number,
        default: 50
      },
      loadMore: Function,
      hasMore: {
        type: Boolean,
        default: true
      },
      styles: {
        type: Object,
        default: () => ({})
      },
      auto: {
        type: Boolean,
        default: true
      },
      autoFill: {
        type: Boolean,
        default: true
      }
    },
    emits: inputEmits$1,
    setup(props2, {
      slots,
      emit,
      expose
    }) {
      const containerRef = vue.ref(null);
      const translateY = vue.ref(0);
      const startTranslateY = vue.ref(0);
      const currentY = vue.ref(0);
      const startY = vue.ref(0);
      const upStatus = vue.ref("");
      const downStatus = vue.ref("");
      const direction = vue.ref("");
      const upText = vue.ref("");
      const downText = vue.ref("");
      const down = vue.ref(false);
      const drag = vue.ref(false);
      const more = vue.ref(props2.hasMore);
      const containerClasses = vue.computed(() => [prefixCls$9]);
      const topClasses = vue.computed(() => [`${prefixCls$9}-top`, {
        [`${prefixCls$9}-drag`]: !drag.value
      }]);
      const bottomClasses = vue.computed(() => [`${prefixCls$9}-bottom`]);
      const contentClasses = vue.computed(() => [`${prefixCls$9}-content`]);
      const statusClass = vue.computed(() => [`${prefixCls$9}-status`]);
      vue.watch(upStatus, (val) => {
        switch (val) {
          case "pull":
            upText.value = props2.upPullText;
            break;
          case "drop":
            upText.value = props2.upDropText;
            break;
          case "loading":
            upText.value = props2.upLoadingText;
            break;
        }
        emit("on-change-up-status", val);
      });
      vue.watch(downStatus, (val) => {
        switch (val) {
          case "end":
            downText.value = props2.downEndText;
            break;
          case "drop":
            downText.value = props2.downDropText;
            break;
          case "loading":
            downText.value = props2.downLoadingText;
            break;
          default:
            downText.value = "";
            break;
        }
        emit("on-change-down-status", val);
      });
      vue.watch(() => props2.hasMore, (val) => {
        more.value = val;
        if (!val) downStatus.value = "end";
      });
      const isBottom = () => {
        const el = containerRef.value;
        return !!el && el.scrollHeight <= el.offsetHeight;
      };
      const onLoadOff = () => {
        translateY.value = 0;
        upStatus.value = "";
        downStatus.value = "";
        if (!more.value) downStatus.value = "end";
        setTimeout(() => {
          if (more.value && isBottom()) {
            direction.value = "up";
            downStatus.value = "loading";
            props2.loadMore?.();
          }
        }, 1e3);
      };
      const onScroll = (e2) => {
        e2.preventDefault();
        if (downStatus.value === "loading") return;
        const el = containerRef.value;
        if (!el || !props2.loadMore) return;
        const scrollTop2 = el.scrollTop;
        const absY = el.scrollHeight - (el.offsetHeight + scrollTop2);
        if (absY > props2.downDistance && downStatus.value === "drop") {
          downStatus.value = "";
        } else if (absY <= props2.downDistance) {
          downStatus.value = "loading";
          if (more.value) props2.loadMore();
          else setTimeout(onLoadOff, 1e3);
        }
      };
      const onTouchStart = (e2) => {
        if (upStatus.value === "loading") return;
        startY.value = e2.touches[0].clientY;
        startTranslateY.value = translateY.value;
        down.value = false;
      };
      const onTouchMove = (e2) => {
        const el = containerRef.value;
        if (!el || upStatus.value === "loading") return;
        currentY.value = e2.touches[0].clientY;
        const distance = (currentY.value - startY.value) / props2.speed;
        const scrollTop2 = el.scrollTop;
        direction.value = distance > 0 ? "down" : "up";
        if (currentY.value >= startY.value && props2.refresh && scrollTop2 === 0 && direction.value === "down") {
          e2.preventDefault();
          translateY.value = props2.maxDistance > 0 ? Math.min(distance - scrollTop2, props2.maxDistance) : distance - scrollTop2;
          if (translateY.value < 0) translateY.value = 0;
          upStatus.value = translateY.value >= props2.upDistance ? "drop" : "pull";
          drag.value = true;
          down.value = down.value || isBottom();
        }
      };
      const onTouchEnd = () => {
        const el = containerRef.value;
        if (!el || upStatus.value === "loading") return;
        if (direction.value === "down" && el.scrollTop <= 0) {
          if (upStatus.value === "drop") {
            translateY.value = 40;
            upStatus.value = "loading";
            props2.refresh?.();
          } else {
            translateY.value = 0;
          }
        }
        direction.value = "";
        drag.value = false;
      };
      vue.onMounted(() => {
        if (props2.auto && props2.refresh) {
          translateY.value = 40;
          upStatus.value = "loading";
          props2.refresh();
        }
        const el = containerRef.value;
        el?.addEventListener("touchstart", onTouchStart);
        el?.addEventListener("touchmove", onTouchMove);
        el?.addEventListener("touchend", onTouchEnd);
      });
      vue.onBeforeUnmount(() => {
        const el = containerRef.value;
        el?.removeEventListener("touchstart", onTouchStart);
        el?.removeEventListener("touchmove", onTouchMove);
        el?.removeEventListener("touchend", onTouchEnd);
      });
      expose({
        onLoadOff
      });
      return () => vue.createVNode("div", {
        "ref": containerRef,
        "class": containerClasses.value,
        "style": {
          height: props2.height,
          ...props2.styles
        },
        "onScroll": onScroll
      }, [props2.refresh && vue.createVNode("div", {
        "class": topClasses.value,
        "style": {
          height: `${translateY.value}px`
        }
      }, [vue.createVNode("div", {
        "class": statusClass.value
      }, [slots.top?.() ?? vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
        "class": "spinner"
      }, [upStatus.value === "loading" && vue.createVNode(_Spinner, {
        "size": "15",
        "type": "snake"
      }, null)]), vue.createVNode("span", {
        "class": "dpzvc3-loadmore-text"
      }, [upText.value])])])]), vue.createVNode("div", {
        "class": contentClasses.value
      }, [slots.default?.()]), props2.loadMore && vue.createVNode("div", {
        "class": bottomClasses.value
      }, [vue.createVNode("div", {
        "class": statusClass.value
      }, [slots.bottom?.() ?? vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
        "class": "spinner"
      }, [downStatus.value === "loading" && vue.createVNode(_Spinner, {
        "size": "15",
        "type": "snake"
      }, null)]), vue.createVNode("span", {
        "class": "dpzvc3-loadmore-text"
      }, [downText.value])])])])]);
    }
  });
  DpLoadMore.install = (app) => {
    app.component("DpLoadMore", DpLoadMore);
  };
  const _DpLoadMore = DpLoadMore;
  const prefixCls$8 = "dpzvc3-Indicator";
  const Indicator = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Indicator",
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: "#ffffff"
      },
      type: {
        type: String,
        default: "snake"
      },
      size: {
        type: [Number, String],
        default: 45
      },
      text: {
        type: String,
        default: "加载中..."
      }
    },
    emits: ["update:modelValue"],
    setup(props2, {
      emit
    }) {
      const visible = vue.ref(props2.modelValue);
      vue.watch(() => props2.modelValue, (val) => {
        visible.value = val;
      });
      vue.watch(visible, (val) => {
        emit("update:modelValue", val);
      });
      const classes = vue.computed(() => [prefixCls$8]);
      const containerClasses = vue.computed(() => [`${prefixCls$8}-container`]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$8}-wrapper`]);
      return () => vue.createVNode("div", null, [visible.value && vue.createVNode("div", {
        "class": classes.value,
        "onTouchmove": (e2) => e2.preventDefault()
      }, [vue.createVNode("div", {
        "class": containerClasses.value
      }, [vue.createVNode("div", {
        "class": wrapperClasses.value
      }, [vue.createVNode(_Spinner, {
        "size": props2.size,
        "type": props2.type,
        "color": props2.color
      }, null), vue.createVNode("span", {
        "style": {
          color: props2.color
        }
      }, [props2.text])])])])]);
    }
  });
  let instance = null;
  let container;
  function createInstance(props2 = {}) {
    container = document.createElement("div");
    document.body.appendChild(container);
    const defaultProps = {
      size: 45,
      type: "snake",
      color: "#ffffff",
      text: "加载中...",
      visible: false,
      ...props2
    };
    const vnode = vue.createVNode(Indicator, {
      ...defaultProps,
      onRemove: destroyInstance
    });
    vue.render(vnode, container);
    instance = vnode.component;
    return instance;
  }
  function destroyInstance() {
    if (!instance || !container) return;
    vue.render(null, container);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    instance = null;
    container = null;
  }
  function open(options) {
    if (!instance) {
      createInstance(options);
    }
    if (instance) {
      Object.keys(options).forEach((key) => {
        instance.props[key] = options[key];
      });
      instance.props.modelValue = true;
    }
  }
  function close() {
    if (!instance) return;
    instance.props.modelValue = false;
    destroyInstance();
  }
  const Indicators = {
    open,
    remove: close,
    snake: (props2 = {}) => {
      props2.type = "snake";
      open(props2);
    },
    blade: (props2 = {}) => {
      props2.type = "blade";
      open(props2);
    },
    circle: (props2 = {}) => {
      props2.type = "fading-circle";
      open(props2);
    },
    bounce: (props2 = {}) => {
      props2.type = "double-bounce";
      open(props2);
    }
  };
  const prefixCls$7 = "dpzvc3-progress";
  const Progress = /* @__PURE__ */ vue.defineComponent({
    name: "DpzVcProgress",
    props: {
      styles: {
        type: Object,
        default: () => ({})
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      barHeight: {
        type: [Number, String],
        default: 3
      }
    },
    setup(props2, {
      slots
    }) {
      const width = vue.ref(0);
      vue.watch(() => props2.modelValue, (val) => {
        const num = Number(val) || 0;
        width.value = num >= 100 ? 100 : num;
      }, {
        immediate: true
      });
      const classes = vue.computed(() => [prefixCls$7]);
      const outerClass = vue.computed(() => [`${prefixCls$7}-outer`]);
      const runawayClass = vue.computed(() => [`${prefixCls$7}-runaway`]);
      const progressClass = vue.computed(() => [`${prefixCls$7}-progress`]);
      const runawayStyle = vue.computed(() => ({
        height: `${props2.barHeight}px`
      }));
      const progressStyle = vue.computed(() => ({
        height: `${props2.barHeight}px`,
        width: `${width.value}%`
      }));
      return () => vue.createVNode("div", {
        "class": classes.value,
        "style": props2.styles
      }, [slots.left?.(), vue.createVNode("div", {
        "class": outerClass.value
      }, [vue.createVNode("div", {
        "class": runawayClass.value,
        "style": runawayStyle.value
      }, null), vue.createVNode("div", {
        "class": progressClass.value,
        "style": progressStyle.value
      }, null)]), slots.right?.()]);
    }
  });
  Progress.install = (app) => {
    app.component("DpProgress", Progress);
  };
  const _Progress = Progress;
  const prefixCls$6 = "dpzvc3-toTop";
  const ToTop = /* @__PURE__ */ vue.defineComponent({
    name: "ToTop",
    props: {
      distance: {
        type: Number,
        default: 200
      },
      bottom: {
        type: [Number, String],
        default: 30
      },
      right: {
        type: [Number, String],
        default: 30
      },
      duration: {
        type: Number,
        default: 1e3
      }
    },
    // as unknown as Record<keyof ToTopProps, any>
    setup(props2) {
      const back = vue.ref(false);
      const classes = vue.computed(() => [prefixCls$6]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$6}-wrapper`]);
      const positionStyles = vue.computed(() => ({
        bottom: typeof props2.bottom === "number" ? props2.bottom + "px" : props2.bottom,
        right: typeof props2.right === "number" ? props2.right + "px" : props2.right
      }));
      const scroll = () => {
        back.value = window.pageYOffset > (props2.distance || 0);
      };
      const toTopHandler = () => {
        scrollTop(window, window.pageYOffset, 0, props2.duration || 1e3);
      };
      vue.onMounted(() => {
        window.addEventListener("scroll", scroll, false);
        window.addEventListener("resize", scroll, false);
        scroll();
      });
      vue.onBeforeUnmount(() => {
        window.removeEventListener("scroll", scroll, false);
        window.removeEventListener("resize", scroll, false);
      });
      return () => {
        return back.value ? vue.createVNode("div", {
          "class": classes.value,
          "style": positionStyles.value,
          "onClick": toTopHandler
        }, [vue.createVNode(vue.resolveComponent("slot"), null, {
          default: () => [vue.createVNode("div", {
            "class": wrapperClasses.value
          }, null)]
        })]) : null;
      };
    }
  });
  ToTop.install = (app) => {
    app.component("ToTop", ToTop);
  };
  const _ToTop = ToTop;
  const inputEmits = {
    touchstart: (value) => {
    },
    touchmove: (value) => {
    },
    touchend: (value) => {
    },
    click: (value) => {
    }
  };
  const prefixCls$5 = "dpzvc3-cell";
  const Cell = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Cell",
    props: {
      title: String,
      value: null,
      label: String,
      link: String,
      hasMask: Boolean
    },
    emits: inputEmits,
    setup(props2, {
      emit,
      slots
    }) {
      const router = vueRouter.useRouter();
      const toLink = vue.computed(() => {
        if (typeof window === "undefined") {
          return "";
        }
        if (!props2.link) return "";
        const resolved = router.resolve(props2.link);
        return resolved.matched.length ? resolved.href : props2.link;
      });
      const classes = vue.computed(() => [prefixCls$5]);
      const maskClass = vue.computed(() => [`${prefixCls$5}-mask`]);
      const leftClasses = vue.computed(() => [`${prefixCls$5}-left`]);
      const rightClasses = vue.computed(() => [`${prefixCls$5}-right`]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$5}-main`, "dpzvc3-1px-top"]);
      const titleClass = vue.computed(() => [`${prefixCls$5}-main-title`]);
      const valueClass = vue.computed(() => [`${prefixCls$5}-main-value`]);
      const labelClass = vue.computed(() => [`${prefixCls$5}-main-label`]);
      const handleClick = (e2) => {
        if (props2.link) {
          router.push(props2.link);
        } else {
          emit("click", e2);
        }
      };
      const cellTouchStart = (e2) => emit("touchstart", e2);
      const cellTouchMove = (e2) => emit("touchmove", e2);
      const cellTouchEnd = (e2) => emit("touchend", e2);
      return () => vue.createVNode("div", {
        "data-href": toLink.value,
        "class": classes.value,
        "onClick": handleClick,
        "onTouchstart": cellTouchStart,
        "onTouchmove": cellTouchMove,
        "onTouchend": cellTouchEnd
      }, [props2.hasMask && vue.createVNode("span", {
        "class": maskClass.value
      }, null), vue.createVNode("div", {
        "class": leftClasses.value
      }, [slots.left?.()]), vue.createVNode("div", {
        "class": wrapperClasses.value
      }, [vue.createVNode("div", {
        "class": titleClass.value
      }, [slots.icon?.(), slots.title ? slots.title() : vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, [props2.title]), vue.createVNode("span", {
        "class": labelClass.value
      }, [props2.label])])]), vue.createVNode("div", {
        "class": valueClass.value
      }, [slots.value ? slots.value() : vue.createVNode("span", null, [props2.value])])]), vue.createVNode("div", {
        "class": rightClasses.value
      }, [slots.right?.()])]);
    }
  });
  Cell.install = (app) => {
    app.component("Cell", Cell);
  };
  const _Cell = Cell;
  const translate3d = (x2) => `translate3d(${x2}px,0,0)`;
  const CellSwipe = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3CellSwipe",
    props: {
      title: String,
      value: null,
      label: String,
      link: String,
      hasMask: Boolean,
      left: {
        type: Array,
        default: () => []
      },
      right: {
        type: Array,
        default: () => []
      }
    },
    setup(props2) {
      const cellRef = vue.ref(null);
      const leftRef = vue.ref(null);
      const rightRef = vue.ref(null);
      const state = vue.reactive({
        translate: 0,
        startX: 0,
        currentX: 0,
        direction: "",
        leftWidth: 0,
        rightWidth: 0,
        wrapper: null,
        leftEl: null,
        rightEl: null
      });
      const swipe = (translate = 0) => {
        state.translate = translate;
        state.wrapper && (state.wrapper.style.transform = translate3d(translate));
        state.leftEl && (state.leftEl.style.transform = translate3d(-state.leftWidth + translate));
        state.rightEl && (state.rightEl.style.transform = translate3d(state.rightWidth + translate));
      };
      const onTouchStart = (e2) => {
        state.startX = e2.touches[0].clientX;
      };
      const onTouchMove = (e2) => {
        e2.preventDefault();
        state.currentX = e2.touches[0].clientX;
        const diff = state.currentX - state.startX;
        state.direction = diff < 0 ? "left" : "right";
        if (state.direction === "left") {
          state.translate = Math.max(-state.rightWidth, diff);
        } else {
          state.translate = Math.min(state.leftWidth, diff);
        }
        vue.nextTick(() => swipe(state.translate));
      };
      const onTouchEnd = () => {
        if (state.direction === "right" && Math.abs(state.translate) > state.leftWidth / 2) {
          swipe(state.leftWidth);
        } else if (state.direction === "left" && Math.abs(state.translate) > state.rightWidth / 2) {
          swipe(-state.rightWidth);
        } else {
          swipe(0);
        }
      };
      vue.watch(() => props2.left, () => {
        vue.nextTick(() => {
          state.leftWidth = leftRef.value?.offsetWidth || 0;
          swipe();
        });
      });
      vue.watch(() => props2.right, () => {
        vue.nextTick(() => {
          state.rightWidth = rightRef.value?.offsetWidth || 0;
          swipe();
        });
      });
      vue.onMounted(() => {
        vue.nextTick(() => {
          if (!cellRef.value) return;
          const el = cellRef.value.$el;
          state.wrapper = el.querySelector(".dpzvc3-cell-main");
          state.leftEl = leftRef.value?.parentElement || null;
          state.rightEl = rightRef.value?.parentElement || null;
          state.leftWidth = state.leftEl?.offsetWidth || 0;
          state.rightWidth = state.rightEl?.offsetWidth || 0;
          state.leftEl && (state.leftEl.style.transform = translate3d(-state.leftWidth));
          state.rightEl && (state.rightEl.style.transform = translate3d(state.rightWidth + 1));
          state.wrapper && (state.wrapper.style.transform = translate3d(0));
        });
      });
      return () => vue.createVNode(_Cell, {
        "ref": cellRef,
        "title": props2.title,
        "value": props2.value,
        "label": props2.label,
        "link": props2.link,
        "hasMask": props2.hasMask,
        "onClick": () => swipe(0),
        "onTouchstart": onTouchStart,
        "onTouchmove": onTouchMove,
        "onTouchend": onTouchEnd
      }, {
        left: () => vue.createVNode("div", {
          "ref": leftRef,
          "class": "dpzvc3-cell-swipe-group"
        }, [props2.left?.map((item, index) => vue.createVNode("span", {
          "key": index,
          "class": "dpzvc3-cell-swipe-btn",
          "style": item.style,
          "innerHTML": item.content,
          "onClick": (e2) => {
            e2.stopPropagation();
            item.handleClick?.();
            swipe(0);
          }
        }, null))]),
        right: () => vue.createVNode("div", {
          "ref": rightRef,
          "class": "dpzvc3-cell-swipe-group"
        }, [props2.right?.map((item, index) => vue.createVNode("span", {
          "key": index,
          "class": "dpzvc3-cell-swipe-btn",
          "style": item.style,
          "innerHTML": item.content,
          "onClick": (e2) => {
            e2.stopPropagation();
            item.handleClick?.();
            swipe(0);
          }
        }, null))])
      });
    }
  });
  CellSwipe.install = (app) => {
    app.component("CellSwipe", CellSwipe);
  };
  const _CellSwipe = CellSwipe;
  const Badge = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Badge",
    props: {
      type: {
        type: String,
        default: "danger"
      },
      size: {
        type: String,
        default: "normal"
      },
      dot: {
        type: Boolean,
        default: false
      },
      max: {
        type: [Number, String],
        default: 99
      },
      number: {
        type: [Number, String]
      }
    },
    setup(props2, {
      slots
    }) {
      const prefixCls2 = "dpzvc3-badge";
      const visible = vue.ref(true);
      vue.watch(() => props2.number, (val) => {
        if (props2.dot) {
          visible.value = true;
        } else if (val === null || isNaN(Number(val))) {
          visible.value = false;
        } else {
          visible.value = true;
        }
      }, {
        immediate: true
      });
      const classes = vue.computed(() => [prefixCls2]);
      const supClasses = vue.computed(() => [`${prefixCls2}-${props2.type}`, {
        [`${prefixCls2}-size-${props2.size}`]: !props2.dot,
        [`${prefixCls2}-dot`]: props2.dot
      }]);
      const displayCount = vue.computed(() => {
        if (props2.dot) return "";
        const num = Number(props2.number);
        return num <= Number(props2.max) ? String(num) : `${props2.max}+`;
      });
      return () => vue.createVNode("span", {
        "class": classes.value
      }, [slots.default?.(), visible.value && vue.createVNode("sup", {
        "class": supClasses.value
      }, [displayCount.value])]);
    }
  });
  Badge.install = (app) => {
    app.component("Badge", Badge);
  };
  const _Badge = Badge;
  const prefixCls$4 = "dpzvc3-card";
  const Card = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Card",
    props: {
      width: {
        type: String,
        default: "100%"
      }
    },
    setup(props2, {
      slots
    }) {
      const classes = vue.computed(() => [prefixCls$4]);
      const headerClass = vue.computed(() => [`${prefixCls$4}-header`, "dpzvc3-1px-bottom"]);
      const contentClass = vue.computed(() => [`${prefixCls$4}-content`]);
      const footerClass = vue.computed(() => [`${prefixCls$4}-footer`, "dpzvc3-1px-top"]);
      const cardWidth = vue.computed(() => props2.width);
      return () => vue.createVNode("div", {
        "class": classes.value,
        "style": {
          width: cardWidth.value
        }
      }, [vue.createVNode("div", {
        "class": headerClass.value
      }, [slots.header?.()]), vue.createVNode("div", {
        "class": contentClass.value
      }, [slots.default ? slots.default() : vue.createVNode("div", {
        "class": "main"
      }, null)]), vue.createVNode("div", {
        "class": footerClass.value
      }, [slots.footer?.()])]);
    }
  });
  Card.install = (app) => {
    app.component("Card", Card);
  };
  const _Card = Card;
  const prefixCls$3 = "dpzvc3-number";
  const Number$1 = /* @__PURE__ */ vue.defineComponent({
    name: "Dpzvc3Number",
    props: {
      modelValue: [Number, String],
      min: {
        type: [Number, String],
        default: -Infinity
      },
      max: {
        type: [Number, String],
        default: Infinity
      },
      step: {
        type: Number,
        default: 1
      },
      width: {
        type: Number,
        default: 60
      },
      height: {
        type: Number,
        default: 35
      },
      numberStyle: {
        type: Object,
        default: () => ({})
      },
      containerStyle: {
        type: Object,
        default: () => ({})
      }
    },
    // 强制使用类型as unknown as Record<keyof NumberProps, any>
    emits: ["update:modelValue", "input", "on-input"],
    setup(props2, {
      emit,
      slots
    }) {
      const currentValue = vue.ref(props2.modelValue);
      const upDisabled = vue.ref(false);
      const downDisabled = vue.ref(false);
      const classes = vue.computed(() => [prefixCls$3]);
      const reduceClasses = vue.computed(() => [`${prefixCls$3}-changevalue`, "left", {
        disabled: downDisabled.value
      }]);
      const addtionClasses = vue.computed(() => [`${prefixCls$3}-changevalue`, "right", {
        disabled: upDisabled.value
      }]);
      const wrapperClasses = vue.computed(() => [`${prefixCls$3}-wrapper`]);
      const getChangeStyle = vue.computed(() => ({
        width: `${props2.height}px`,
        height: `${props2.height}px`,
        lineHeight: `${props2.height}px`
      }));
      const inputStyle = vue.computed(() => ({
        ...props2.numberStyle,
        width: `${props2.width}px`,
        height: `${props2.height}px`
      }));
      const changeVal = (val) => {
        const numberVal = Number(val);
        if (!isNaN(numberVal) || numberVal === 0) {
          upDisabled.value = numberVal + props2.step > Number(props2.max);
          downDisabled.value = numberVal - props2.step < Number(props2.min);
        } else {
          upDisabled.value = true;
          downDisabled.value = true;
        }
      };
      const setValue = (val) => {
        currentValue.value = val;
        emit("input", val);
        emit("update:modelValue", val);
      };
      const changeInput = (e2) => {
        const target = e2.target;
        let val = Number(target.value.trim());
        if (val < Number(props2.min)) val = Number(props2.min);
        if (val > Number(props2.max)) val = Number(props2.max);
        setValue(val);
        target.value = String(currentValue.value);
        emit("on-input", e2);
        emit("update:modelValue", val);
      };
      const change = (type, disabled) => {
        if (disabled) return;
        let val = Number(currentValue.value);
        if (isNaN(val)) return;
        if (type === "reduce") val -= props2.step;
        else val += props2.step;
        if (val < Number(props2.min)) val = Number(props2.min);
        if (val > Number(props2.max)) val = Number(props2.max);
        setValue(val);
      };
      vue.watch(() => props2.modelValue, (val) => {
        currentValue.value = val;
      });
      vue.watch(currentValue, (val) => {
        changeVal(val);
      });
      vue.onMounted(() => {
        changeVal(currentValue.value);
      });
      return () => vue.createVNode("div", {
        "class": classes.value,
        "style": props2.containerStyle
      }, [vue.createVNode("div", {
        "class": reduceClasses.value,
        "style": getChangeStyle.value,
        "onClick": () => change("reduce", downDisabled.value)
      }, [slots.reduce ? slots.reduce() : "-"]), vue.createVNode("div", {
        "class": wrapperClasses.value
      }, [vue.createVNode("input", {
        "type": "number",
        "style": inputStyle.value,
        "min": props2.min,
        "max": props2.max,
        "step": props2.step,
        "value": currentValue.value,
        "autocomplete": "off",
        "onInput": changeInput,
        "onFocus": changeInput,
        "onBlur": changeInput,
        "onChange": changeInput,
        "onKeyup": (e2) => {
          if (e2.key === "ArrowUp") change("add", upDisabled.value);
          if (e2.key === "ArrowDown") change("reduce", downDisabled.value);
        }
      }, null)]), vue.createVNode("div", {
        "class": addtionClasses.value,
        "style": getChangeStyle.value,
        "onClick": () => change("add", upDisabled.value)
      }, [slots.add ? slots.add() : "+"])]);
    }
  });
  Number$1.install = (app) => {
    app.component("Number", Number$1);
  };
  const _Number = Number$1;
  const components = {
    DpButton: _DpButton,
    CheckBox: _CheckBox,
    CheckBoxGroup: _CheckBoxGroup,
    RadioBox: _RadioBox,
    RadioBoxGroup: _RadioBoxGroup,
    DpHeader: _DpzHeader,
    Picker: _Picker,
    Swipe: _Swipe,
    Tab: _Tab,
    SlideBar: _SlideBar,
    TextBar: _Text,
    Number: _Number,
    Upload: _Upload,
    ActionSheet: _ActionSheet,
    SwitchBar: _SwitchBar,
    Rater: _Rater,
    Spinner: _Spinner,
    DpLoadMore: _DpLoadMore,
    Popup: _Popup,
    DpProgress: _Progress,
    ToTop: _ToTop,
    Cell: _Cell,
    CellSwipe: _CellSwipe,
    Badge: _Badge,
    Card: _Card
  };
  const services = {
    Message,
    Modal,
    Prompt,
    Indicator: Indicators
  };
  Object.values(components).forEach((comp) => {
    if (comp && !comp.install) {
      comp.install = (app) => {
        app.component(comp.name, comp);
      };
    }
  });
  Object.values(services).forEach((srv, idx) => {
    if (srv && !srv.install) {
      const key = Object.keys(services)[idx];
      srv.install = (app) => {
        app.config.globalProperties[`$${key}`] = srv;
      };
    }
  });
  const install = (app) => {
    Object.values(components).forEach((comp) => {
      comp.install?.(app);
    });
    Object.values(services).forEach((srv) => {
      srv.install?.(app);
    });
  };
  const Dpzvc3UI = { install };
  const spinnerProps = {
    props: {
      size: {
        type: [Number, String]
      },
      color: {
        type: String
      }
    },
    setup(props2) {
      const spinnerStyle = vue.computed(() => {
        if (props2.size) {
          return {
            height: typeof Number(props2.size) === "number" ? `${props2.size}px` : props2.size,
            width: typeof Number(props2.size) === "number" ? `${props2.size}px` : props2.size
          };
        }
        return {};
      });
      return {
        spinnerStyle
      };
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$8 = vue.defineComponent({
    name: "Dpzvc3Blade",
    props: spinnerProps.props,
    setup(props2) {
      const bladeStyle = vue.computed(() => {
        return props2.color ? { backgroundColor: props2.color } : {};
      });
      const { spinnerStyle } = spinnerProps.setup(props2);
      return {
        bladeStyle,
        spinnerStyle
      };
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "dpzvc3-spinner-blade",
      style: vue.normalizeStyle(_ctx.spinnerStyle)
    }, [
      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(12, (i2) => {
        return vue.createElementVNode("div", {
          key: i2,
          class: vue.normalizeClass(["blade", "blade-" + i2]),
          style: vue.normalizeStyle(_ctx.bladeStyle)
        }, null, 6);
      }), 64))
    ], 4);
  }
  const blade = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
  const blade$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: blade
  }, Symbol.toStringTag, { value: "Module" }));
  const _sfc_main$7 = vue.defineComponent({
    name: "Dpzvc3Snake",
    props: spinnerProps.props,
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "dpzvc3-spinner-snake",
      style: vue.normalizeStyle(_ctx.spinnerStyle)
    }, null, 4);
  }
  const snake = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
  const snake$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: snake
  }, Symbol.toStringTag, { value: "Module" }));
  const _sfc_main$6 = vue.defineComponent({
    name: "Dpzvc3DoubleBounce",
    props: spinnerProps.props,
    setup(props2) {
      const { spinnerStyle } = spinnerProps.setup(props2);
      const bounceStyle = vue.computed(() => {
        return props2.color ? { backgroundColor: props2.color } : {};
      });
      return {
        spinnerStyle,
        bounceStyle
      };
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "dpzvc3-spinner-double-bounce",
      style: vue.normalizeStyle(_ctx.spinnerStyle)
    }, [
      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(2, (i2) => {
        return vue.createElementVNode("div", {
          key: i2,
          class: vue.normalizeClass(["bounce", "bounce-" + i2]),
          style: vue.normalizeStyle(_ctx.bounceStyle)
        }, null, 6);
      }), 64))
    ], 4);
  }
  const doubleBounce = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
  const doubleBounce$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: doubleBounce
  }, Symbol.toStringTag, { value: "Module" }));
  const _sfc_main$5 = {
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "dpzvc3-spinner-triple-bounce",
      style: vue.normalizeStyle($options.spinnerStyle)
    }, [
      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(3, (i2, key) => {
        return vue.createElementVNode("div", {
          key,
          class: vue.normalizeClass(["bounce", "bounce-" + i2]),
          style: vue.normalizeStyle($options.bounceStyle)
        }, null, 6);
      }), 64))
    ], 4);
  }
  const tripleBounce = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
  const tripleBounce$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: tripleBounce
  }, Symbol.toStringTag, { value: "Module" }));
  const _sfc_main$4 = vue.defineComponent({
    name: "Dpzvc3FadingCircle",
    props: spinnerProps.props,
    setup(props2) {
      const { spinnerStyle } = spinnerProps.setup(props2);
      const blockStyle = (index) => {
        return {
          transform: `rotate(${30 * index}deg)`
        };
      };
      const circleStyle = (index) => {
        return {
          backgroundColor: props2.color || "#39f",
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "dpzvc3-spinner-fading-circle",
      style: vue.normalizeStyle(_ctx.spinnerStyle)
    }, [
      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(12, (i2) => {
        return vue.createElementVNode("div", {
          key: i2,
          class: vue.normalizeClass(["block", "block-" + i2]),
          style: vue.normalizeStyle(_ctx.blockStyle(i2 - 1))
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["circle", "circle-" + i2]),
            style: vue.normalizeStyle(_ctx.circleStyle(i2 - 1))
          }, null, 6)
        ], 6);
      }), 64))
    ], 4);
  }
  const fadingCircle = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
  const fadingCircle$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: fadingCircle
  }, Symbol.toStringTag, { value: "Module" }));
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var data;
  var hasRequiredData;
  function requireData() {
    if (hasRequiredData) return data;
    hasRequiredData = 1;
    data = {
      "86": {
        "110000": "北京市",
        "120000": "天津市",
        "130000": "河北省",
        "140000": "山西省",
        "150000": "内蒙古自治区",
        "210000": "辽宁省",
        "220000": "吉林省",
        "230000": "黑龙江省",
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省",
        "350000": "福建省",
        "360000": "江西省",
        "370000": "山东省",
        "410000": "河南省",
        "420000": "湖北省",
        "430000": "湖南省",
        "440000": "广东省",
        "450000": "广西壮族自治区",
        "460000": "海南省",
        "500000": "重庆市",
        "510000": "四川省",
        "520000": "贵州省",
        "530000": "云南省",
        "540000": "西藏自治区",
        "610000": "陕西省",
        "620000": "甘肃省",
        "630000": "青海省",
        "640000": "宁夏回族自治区",
        "650000": "新疆维吾尔自治区",
        "710000": "台湾省",
        "810000": "香港特别行政区",
        "820000": "澳门特别行政区"
      },
      "110000": {
        "110100": "市辖区"
      },
      "110100": {
        "110101": "东城区",
        "110102": "西城区",
        "110105": "朝阳区",
        "110106": "丰台区",
        "110107": "石景山区",
        "110108": "海淀区",
        "110109": "门头沟区",
        "110111": "房山区",
        "110112": "通州区",
        "110113": "顺义区",
        "110114": "昌平区",
        "110115": "大兴区",
        "110116": "怀柔区",
        "110117": "平谷区",
        "110118": "密云区",
        "110119": "延庆区"
      },
      "120000": {
        "120100": "市辖区"
      },
      "120100": {
        "120101": "和平区",
        "120102": "河东区",
        "120103": "河西区",
        "120104": "南开区",
        "120105": "河北区",
        "120106": "红桥区",
        "120110": "东丽区",
        "120111": "西青区",
        "120112": "津南区",
        "120113": "北辰区",
        "120114": "武清区",
        "120115": "宝坻区",
        "120116": "滨海新区",
        "120117": "宁河区",
        "120118": "静海区",
        "120119": "蓟州区"
      },
      "130000": {
        "130100": "石家庄市",
        "130200": "唐山市",
        "130300": "秦皇岛市",
        "130400": "邯郸市",
        "130500": "邢台市",
        "130600": "保定市",
        "130700": "张家口市",
        "130800": "承德市",
        "130900": "沧州市",
        "131000": "廊坊市",
        "131100": "衡水市",
        "139001": "定州市",
        "139002": "辛集市"
      },
      "130100": {
        "130102": "长安区",
        "130104": "桥西区",
        "130105": "新华区",
        "130107": "井陉矿区",
        "130108": "裕华区",
        "130109": "藁城区",
        "130110": "鹿泉区",
        "130111": "栾城区",
        "130121": "井陉县",
        "130123": "正定县",
        "130125": "行唐县",
        "130126": "灵寿县",
        "130127": "高邑县",
        "130128": "深泽县",
        "130129": "赞皇县",
        "130130": "无极县",
        "130131": "平山县",
        "130132": "元氏县",
        "130133": "赵县",
        "130183": "晋州市",
        "130184": "新乐市"
      },
      "130200": {
        "130202": "路南区",
        "130203": "路北区",
        "130204": "古冶区",
        "130205": "开平区",
        "130207": "丰南区",
        "130208": "丰润区",
        "130209": "曹妃甸区",
        "130223": "滦县",
        "130224": "滦南县",
        "130225": "乐亭县",
        "130227": "迁西县",
        "130229": "玉田县",
        "130281": "遵化市",
        "130283": "迁安市"
      },
      "130300": {
        "130302": "海港区",
        "130303": "山海关区",
        "130304": "北戴河区",
        "130306": "抚宁区",
        "130321": "青龙满族自治县",
        "130322": "昌黎县",
        "130324": "卢龙县"
      },
      "130400": {
        "130402": "邯山区",
        "130403": "丛台区",
        "130404": "复兴区",
        "130406": "峰峰矿区",
        "130421": "邯郸县",
        "130423": "临漳县",
        "130424": "成安县",
        "130425": "大名县",
        "130426": "涉县",
        "130427": "磁县",
        "130428": "肥乡县",
        "130429": "永年县",
        "130430": "邱县",
        "130431": "鸡泽县",
        "130432": "广平县",
        "130433": "馆陶县",
        "130434": "魏县",
        "130435": "曲周县",
        "130481": "武安市"
      },
      "130500": {
        "130502": "桥东区",
        "130503": "桥西区",
        "130521": "邢台县",
        "130522": "临城县",
        "130523": "内丘县",
        "130524": "柏乡县",
        "130525": "隆尧县",
        "130526": "任县",
        "130527": "南和县",
        "130528": "宁晋县",
        "130529": "巨鹿县",
        "130530": "新河县",
        "130531": "广宗县",
        "130532": "平乡县",
        "130533": "威县",
        "130534": "清河县",
        "130535": "临西县",
        "130581": "南宫市",
        "130582": "沙河市"
      },
      "130600": {
        "130602": "竞秀区",
        "130606": "莲池区",
        "130607": "满城区",
        "130608": "清苑区",
        "130609": "徐水区",
        "130623": "涞水县",
        "130624": "阜平县",
        "130626": "定兴县",
        "130627": "唐县",
        "130628": "高阳县",
        "130629": "容城县",
        "130630": "涞源县",
        "130631": "望都县",
        "130632": "安新县",
        "130633": "易县",
        "130634": "曲阳县",
        "130635": "蠡县",
        "130636": "顺平县",
        "130637": "博野县",
        "130638": "雄县",
        "130681": "涿州市",
        "130683": "安国市",
        "130684": "高碑店市"
      },
      "130700": {
        "130702": "桥东区",
        "130703": "桥西区",
        "130705": "宣化区",
        "130706": "下花园区",
        "130708": "万全区",
        "130709": "崇礼区",
        "130722": "张北县",
        "130723": "康保县",
        "130724": "沽源县",
        "130725": "尚义县",
        "130726": "蔚县",
        "130727": "阳原县",
        "130728": "怀安县",
        "130730": "怀来县",
        "130731": "涿鹿县",
        "130732": "赤城县"
      },
      "130800": {
        "130802": "双桥区",
        "130803": "双滦区",
        "130804": "鹰手营子矿区",
        "130821": "承德县",
        "130822": "兴隆县",
        "130823": "平泉县",
        "130824": "滦平县",
        "130825": "隆化县",
        "130826": "丰宁满族自治县",
        "130827": "宽城满族自治县",
        "130828": "围场满族蒙古族自治县"
      },
      "130900": {
        "130902": "新华区",
        "130903": "运河区",
        "130921": "沧县",
        "130922": "青县",
        "130923": "东光县",
        "130924": "海兴县",
        "130925": "盐山县",
        "130926": "肃宁县",
        "130927": "南皮县",
        "130928": "吴桥县",
        "130929": "献县",
        "130930": "孟村回族自治县",
        "130981": "泊头市",
        "130982": "任丘市",
        "130983": "黄骅市",
        "130984": "河间市"
      },
      "131000": {
        "131002": "安次区",
        "131003": "广阳区",
        "131022": "固安县",
        "131023": "永清县",
        "131024": "香河县",
        "131025": "大城县",
        "131026": "文安县",
        "131028": "大厂回族自治县",
        "131081": "霸州市",
        "131082": "三河市"
      },
      "131100": {
        "131102": "桃城区",
        "131103": "冀州区",
        "131121": "枣强县",
        "131122": "武邑县",
        "131123": "武强县",
        "131124": "饶阳县",
        "131125": "安平县",
        "131126": "故城县",
        "131127": "景县",
        "131128": "阜城县",
        "131182": "深州市"
      },
      "140000": {
        "140100": "太原市",
        "140200": "大同市",
        "140300": "阳泉市",
        "140400": "长治市",
        "140500": "晋城市",
        "140600": "朔州市",
        "140700": "晋中市",
        "140800": "运城市",
        "140900": "忻州市",
        "141000": "临汾市",
        "141100": "吕梁市"
      },
      "140100": {
        "140105": "小店区",
        "140106": "迎泽区",
        "140107": "杏花岭区",
        "140108": "尖草坪区",
        "140109": "万柏林区",
        "140110": "晋源区",
        "140121": "清徐县",
        "140122": "阳曲县",
        "140123": "娄烦县",
        "140181": "古交市"
      },
      "140200": {
        "140202": "城区",
        "140203": "矿区",
        "140211": "南郊区",
        "140212": "新荣区",
        "140221": "阳高县",
        "140222": "天镇县",
        "140223": "广灵县",
        "140224": "灵丘县",
        "140225": "浑源县",
        "140226": "左云县",
        "140227": "大同县"
      },
      "140300": {
        "140302": "城区",
        "140303": "矿区",
        "140311": "郊区",
        "140321": "平定县",
        "140322": "盂县"
      },
      "140400": {
        "140402": "城区",
        "140411": "郊区",
        "140421": "长治县",
        "140423": "襄垣县",
        "140424": "屯留县",
        "140425": "平顺县",
        "140426": "黎城县",
        "140427": "壶关县",
        "140428": "长子县",
        "140429": "武乡县",
        "140430": "沁县",
        "140431": "沁源县",
        "140481": "潞城市"
      },
      "140500": {
        "140502": "城区",
        "140521": "沁水县",
        "140522": "阳城县",
        "140524": "陵川县",
        "140525": "泽州县",
        "140581": "高平市"
      },
      "140600": {
        "140602": "朔城区",
        "140603": "平鲁区",
        "140621": "山阴县",
        "140622": "应县",
        "140623": "右玉县",
        "140624": "怀仁县"
      },
      "140700": {
        "140702": "榆次区",
        "140721": "榆社县",
        "140722": "左权县",
        "140723": "和顺县",
        "140724": "昔阳县",
        "140725": "寿阳县",
        "140726": "太谷县",
        "140727": "祁县",
        "140728": "平遥县",
        "140729": "灵石县",
        "140781": "介休市"
      },
      "140800": {
        "140802": "盐湖区",
        "140821": "临猗县",
        "140822": "万荣县",
        "140823": "闻喜县",
        "140824": "稷山县",
        "140825": "新绛县",
        "140826": "绛县",
        "140827": "垣曲县",
        "140828": "夏县",
        "140829": "平陆县",
        "140830": "芮城县",
        "140881": "永济市",
        "140882": "河津市"
      },
      "140900": {
        "140902": "忻府区",
        "140921": "定襄县",
        "140922": "五台县",
        "140923": "代县",
        "140924": "繁峙县",
        "140925": "宁武县",
        "140926": "静乐县",
        "140927": "神池县",
        "140928": "五寨县",
        "140929": "岢岚县",
        "140930": "河曲县",
        "140931": "保德县",
        "140932": "偏关县",
        "140981": "原平市"
      },
      "141000": {
        "141002": "尧都区",
        "141021": "曲沃县",
        "141022": "翼城县",
        "141023": "襄汾县",
        "141024": "洪洞县",
        "141025": "古县",
        "141026": "安泽县",
        "141027": "浮山县",
        "141028": "吉县",
        "141029": "乡宁县",
        "141030": "大宁县",
        "141031": "隰县",
        "141032": "永和县",
        "141033": "蒲县",
        "141034": "汾西县",
        "141081": "侯马市",
        "141082": "霍州市"
      },
      "141100": {
        "141102": "离石区",
        "141121": "文水县",
        "141122": "交城县",
        "141123": "兴县",
        "141124": "临县",
        "141125": "柳林县",
        "141126": "石楼县",
        "141127": "岚县",
        "141128": "方山县",
        "141129": "中阳县",
        "141130": "交口县",
        "141181": "孝义市",
        "141182": "汾阳市"
      },
      "150000": {
        "150100": "呼和浩特市",
        "150200": "包头市",
        "150300": "乌海市",
        "150400": "赤峰市",
        "150500": "通辽市",
        "150600": "鄂尔多斯市",
        "150700": "呼伦贝尔市",
        "150800": "巴彦淖尔市",
        "150900": "乌兰察布市",
        "152200": "兴安盟",
        "152500": "锡林郭勒盟",
        "152900": "阿拉善盟"
      },
      "150100": {
        "150102": "新城区",
        "150103": "回民区",
        "150104": "玉泉区",
        "150105": "赛罕区",
        "150121": "土默特左旗",
        "150122": "托克托县",
        "150123": "和林格尔县",
        "150124": "清水河县",
        "150125": "武川县"
      },
      "150200": {
        "150202": "东河区",
        "150203": "昆都仑区",
        "150204": "青山区",
        "150205": "石拐区",
        "150206": "白云鄂博矿区",
        "150207": "九原区",
        "150221": "土默特右旗",
        "150222": "固阳县",
        "150223": "达尔罕茂明安联合旗"
      },
      "150300": {
        "150302": "海勃湾区",
        "150303": "海南区",
        "150304": "乌达区"
      },
      "150400": {
        "150402": "红山区",
        "150403": "元宝山区",
        "150404": "松山区",
        "150421": "阿鲁科尔沁旗",
        "150422": "巴林左旗",
        "150423": "巴林右旗",
        "150424": "林西县",
        "150425": "克什克腾旗",
        "150426": "翁牛特旗",
        "150428": "喀喇沁旗",
        "150429": "宁城县",
        "150430": "敖汉旗"
      },
      "150500": {
        "150502": "科尔沁区",
        "150521": "科尔沁左翼中旗",
        "150522": "科尔沁左翼后旗",
        "150523": "开鲁县",
        "150524": "库伦旗",
        "150525": "奈曼旗",
        "150526": "扎鲁特旗",
        "150581": "霍林郭勒市"
      },
      "150600": {
        "150602": "东胜区",
        "150603": "康巴什区",
        "150621": "达拉特旗",
        "150622": "准格尔旗",
        "150623": "鄂托克前旗",
        "150624": "鄂托克旗",
        "150625": "杭锦旗",
        "150626": "乌审旗",
        "150627": "伊金霍洛旗"
      },
      "150700": {
        "150702": "海拉尔区",
        "150703": "扎赉诺尔区",
        "150721": "阿荣旗",
        "150722": "莫力达瓦达斡尔族自治旗",
        "150723": "鄂伦春自治旗",
        "150724": "鄂温克族自治旗",
        "150725": "陈巴尔虎旗",
        "150726": "新巴尔虎左旗",
        "150727": "新巴尔虎右旗",
        "150781": "满洲里市",
        "150782": "牙克石市",
        "150783": "扎兰屯市",
        "150784": "额尔古纳市",
        "150785": "根河市"
      },
      "150800": {
        "150802": "临河区",
        "150821": "五原县",
        "150822": "磴口县",
        "150823": "乌拉特前旗",
        "150824": "乌拉特中旗",
        "150825": "乌拉特后旗",
        "150826": "杭锦后旗"
      },
      "150900": {
        "150902": "集宁区",
        "150921": "卓资县",
        "150922": "化德县",
        "150923": "商都县",
        "150924": "兴和县",
        "150925": "凉城县",
        "150926": "察哈尔右翼前旗",
        "150927": "察哈尔右翼中旗",
        "150928": "察哈尔右翼后旗",
        "150929": "四子王旗",
        "150981": "丰镇市"
      },
      "152200": {
        "152201": "乌兰浩特市",
        "152202": "阿尔山市",
        "152221": "科尔沁右翼前旗",
        "152222": "科尔沁右翼中旗",
        "152223": "扎赉特旗",
        "152224": "突泉县"
      },
      "152500": {
        "152501": "二连浩特市",
        "152502": "锡林浩特市",
        "152522": "阿巴嘎旗",
        "152523": "苏尼特左旗",
        "152524": "苏尼特右旗",
        "152525": "东乌珠穆沁旗",
        "152526": "西乌珠穆沁旗",
        "152527": "太仆寺旗",
        "152528": "镶黄旗",
        "152529": "正镶白旗",
        "152530": "正蓝旗",
        "152531": "多伦县"
      },
      "152900": {
        "152921": "阿拉善左旗",
        "152922": "阿拉善右旗",
        "152923": "额济纳旗"
      },
      "210000": {
        "210100": "沈阳市",
        "210200": "大连市",
        "210300": "鞍山市",
        "210400": "抚顺市",
        "210500": "本溪市",
        "210600": "丹东市",
        "210700": "锦州市",
        "210800": "营口市",
        "210900": "阜新市",
        "211000": "辽阳市",
        "211100": "盘锦市",
        "211200": "铁岭市",
        "211300": "朝阳市",
        "211400": "葫芦岛市"
      },
      "210100": {
        "210102": "和平区",
        "210103": "沈河区",
        "210104": "大东区",
        "210105": "皇姑区",
        "210106": "铁西区",
        "210111": "苏家屯区",
        "210112": "浑南区",
        "210113": "沈北新区",
        "210114": "于洪区",
        "210115": "辽中区",
        "210123": "康平县",
        "210124": "法库县",
        "210181": "新民市"
      },
      "210200": {
        "210202": "中山区",
        "210203": "西岗区",
        "210204": "沙河口区",
        "210211": "甘井子区",
        "210212": "旅顺口区",
        "210213": "金州区",
        "210214": "普兰店区",
        "210224": "长海县",
        "210281": "瓦房店市",
        "210283": "庄河市"
      },
      "210300": {
        "210302": "铁东区",
        "210303": "铁西区",
        "210304": "立山区",
        "210311": "千山区",
        "210321": "台安县",
        "210323": "岫岩满族自治县",
        "210381": "海城市"
      },
      "210400": {
        "210402": "新抚区",
        "210403": "东洲区",
        "210404": "望花区",
        "210411": "顺城区",
        "210421": "抚顺县",
        "210422": "新宾满族自治县",
        "210423": "清原满族自治县"
      },
      "210500": {
        "210502": "平山区",
        "210503": "溪湖区",
        "210504": "明山区",
        "210505": "南芬区",
        "210521": "本溪满族自治县",
        "210522": "桓仁满族自治县"
      },
      "210600": {
        "210602": "元宝区",
        "210603": "振兴区",
        "210604": "振安区",
        "210624": "宽甸满族自治县",
        "210681": "东港市",
        "210682": "凤城市"
      },
      "210700": {
        "210702": "古塔区",
        "210703": "凌河区",
        "210711": "太和区",
        "210726": "黑山县",
        "210727": "义县",
        "210781": "凌海市",
        "210782": "北镇市"
      },
      "210800": {
        "210802": "站前区",
        "210803": "西市区",
        "210804": "鲅鱼圈区",
        "210811": "老边区",
        "210881": "盖州市",
        "210882": "大石桥市"
      },
      "210900": {
        "210902": "海州区",
        "210903": "新邱区",
        "210904": "太平区",
        "210905": "清河门区",
        "210911": "细河区",
        "210921": "阜新蒙古族自治县",
        "210922": "彰武县"
      },
      "211000": {
        "211002": "白塔区",
        "211003": "文圣区",
        "211004": "宏伟区",
        "211005": "弓长岭区",
        "211011": "太子河区",
        "211021": "辽阳县",
        "211081": "灯塔市"
      },
      "211100": {
        "211102": "双台子区",
        "211103": "兴隆台区",
        "211104": "大洼区",
        "211122": "盘山县"
      },
      "211200": {
        "211202": "银州区",
        "211204": "清河区",
        "211221": "铁岭县",
        "211223": "西丰县",
        "211224": "昌图县",
        "211281": "调兵山市",
        "211282": "开原市"
      },
      "211300": {
        "211302": "双塔区",
        "211303": "龙城区",
        "211321": "朝阳县",
        "211322": "建平县",
        "211324": "喀喇沁左翼蒙古族自治县",
        "211381": "北票市",
        "211382": "凌源市"
      },
      "211400": {
        "211402": "连山区",
        "211403": "龙港区",
        "211404": "南票区",
        "211421": "绥中县",
        "211422": "建昌县",
        "211481": "兴城市"
      },
      "220000": {
        "220100": "长春市",
        "220200": "吉林市",
        "220300": "四平市",
        "220400": "辽源市",
        "220500": "通化市",
        "220600": "白山市",
        "220700": "松原市",
        "220800": "白城市",
        "222400": "延边朝鲜族自治州"
      },
      "220100": {
        "220102": "南关区",
        "220103": "宽城区",
        "220104": "朝阳区",
        "220105": "二道区",
        "220106": "绿园区",
        "220112": "双阳区",
        "220113": "九台区",
        "220122": "农安县",
        "220182": "榆树市",
        "220183": "德惠市"
      },
      "220200": {
        "220202": "昌邑区",
        "220203": "龙潭区",
        "220204": "船营区",
        "220211": "丰满区",
        "220221": "永吉县",
        "220281": "蛟河市",
        "220282": "桦甸市",
        "220283": "舒兰市",
        "220284": "磐石市"
      },
      "220300": {
        "220302": "铁西区",
        "220303": "铁东区",
        "220322": "梨树县",
        "220323": "伊通满族自治县",
        "220381": "公主岭市",
        "220382": "双辽市"
      },
      "220400": {
        "220402": "龙山区",
        "220403": "西安区",
        "220421": "东丰县",
        "220422": "东辽县"
      },
      "220500": {
        "220502": "东昌区",
        "220503": "二道江区",
        "220521": "通化县",
        "220523": "辉南县",
        "220524": "柳河县",
        "220581": "梅河口市",
        "220582": "集安市"
      },
      "220600": {
        "220602": "浑江区",
        "220605": "江源区",
        "220621": "抚松县",
        "220622": "靖宇县",
        "220623": "长白朝鲜族自治县",
        "220681": "临江市"
      },
      "220700": {
        "220702": "宁江区",
        "220721": "前郭尔罗斯蒙古族自治县",
        "220722": "长岭县",
        "220723": "乾安县",
        "220781": "扶余市"
      },
      "220800": {
        "220802": "洮北区",
        "220821": "镇赉县",
        "220822": "通榆县",
        "220881": "洮南市",
        "220882": "大安市"
      },
      "222400": {
        "222401": "延吉市",
        "222402": "图们市",
        "222403": "敦化市",
        "222404": "珲春市",
        "222405": "龙井市",
        "222406": "和龙市",
        "222424": "汪清县",
        "222426": "安图县"
      },
      "230000": {
        "230100": "哈尔滨市",
        "230200": "齐齐哈尔市",
        "230300": "鸡西市",
        "230400": "鹤岗市",
        "230500": "双鸭山市",
        "230600": "大庆市",
        "230700": "伊春市",
        "230800": "佳木斯市",
        "230900": "七台河市",
        "231000": "牡丹江市",
        "231100": "黑河市",
        "231200": "绥化市",
        "232700": "大兴安岭地区"
      },
      "230100": {
        "230102": "道里区",
        "230103": "南岗区",
        "230104": "道外区",
        "230108": "平房区",
        "230109": "松北区",
        "230110": "香坊区",
        "230111": "呼兰区",
        "230112": "阿城区",
        "230113": "双城区",
        "230123": "依兰县",
        "230124": "方正县",
        "230125": "宾县",
        "230126": "巴彦县",
        "230127": "木兰县",
        "230128": "通河县",
        "230129": "延寿县",
        "230183": "尚志市",
        "230184": "五常市"
      },
      "230200": {
        "230202": "龙沙区",
        "230203": "建华区",
        "230204": "铁锋区",
        "230205": "昂昂溪区",
        "230206": "富拉尔基区",
        "230207": "碾子山区",
        "230208": "梅里斯达斡尔族区",
        "230221": "龙江县",
        "230223": "依安县",
        "230224": "泰来县",
        "230225": "甘南县",
        "230227": "富裕县",
        "230229": "克山县",
        "230230": "克东县",
        "230231": "拜泉县",
        "230281": "讷河市"
      },
      "230300": {
        "230302": "鸡冠区",
        "230303": "恒山区",
        "230304": "滴道区",
        "230305": "梨树区",
        "230306": "城子河区",
        "230307": "麻山区",
        "230321": "鸡东县",
        "230381": "虎林市",
        "230382": "密山市"
      },
      "230400": {
        "230402": "向阳区",
        "230403": "工农区",
        "230404": "南山区",
        "230405": "兴安区",
        "230406": "东山区",
        "230407": "兴山区",
        "230421": "萝北县",
        "230422": "绥滨县"
      },
      "230500": {
        "230502": "尖山区",
        "230503": "岭东区",
        "230505": "四方台区",
        "230506": "宝山区",
        "230521": "集贤县",
        "230522": "友谊县",
        "230523": "宝清县",
        "230524": "饶河县"
      },
      "230600": {
        "230602": "萨尔图区",
        "230603": "龙凤区",
        "230604": "让胡路区",
        "230605": "红岗区",
        "230606": "大同区",
        "230621": "肇州县",
        "230622": "肇源县",
        "230623": "林甸县",
        "230624": "杜尔伯特蒙古族自治县"
      },
      "230700": {
        "230702": "伊春区",
        "230703": "南岔区",
        "230704": "友好区",
        "230705": "西林区",
        "230706": "翠峦区",
        "230707": "新青区",
        "230708": "美溪区",
        "230709": "金山屯区",
        "230710": "五营区",
        "230711": "乌马河区",
        "230712": "汤旺河区",
        "230713": "带岭区",
        "230714": "乌伊岭区",
        "230715": "红星区",
        "230716": "上甘岭区",
        "230722": "嘉荫县",
        "230781": "铁力市"
      },
      "230800": {
        "230803": "向阳区",
        "230804": "前进区",
        "230805": "东风区",
        "230811": "郊区",
        "230822": "桦南县",
        "230826": "桦川县",
        "230828": "汤原县",
        "230881": "同江市",
        "230882": "富锦市",
        "230883": "抚远市"
      },
      "230900": {
        "230902": "新兴区",
        "230903": "桃山区",
        "230904": "茄子河区",
        "230921": "勃利县"
      },
      "231000": {
        "231002": "东安区",
        "231003": "阳明区",
        "231004": "爱民区",
        "231005": "西安区",
        "231025": "林口县",
        "231081": "绥芬河市",
        "231083": "海林市",
        "231084": "宁安市",
        "231085": "穆棱市",
        "231086": "东宁市"
      },
      "231100": {
        "231102": "爱辉区",
        "231121": "嫩江县",
        "231123": "逊克县",
        "231124": "孙吴县",
        "231181": "北安市",
        "231182": "五大连池市"
      },
      "231200": {
        "231202": "北林区",
        "231221": "望奎县",
        "231222": "兰西县",
        "231223": "青冈县",
        "231224": "庆安县",
        "231225": "明水县",
        "231226": "绥棱县",
        "231281": "安达市",
        "231282": "肇东市",
        "231283": "海伦市"
      },
      "232700": {
        "232721": "呼玛县",
        "232722": "塔河县",
        "232723": "漠河县"
      },
      "310000": {
        "310100": "市辖区"
      },
      "310100": {
        "310101": "黄浦区",
        "310104": "徐汇区",
        "310105": "长宁区",
        "310106": "静安区",
        "310107": "普陀区",
        "310109": "虹口区",
        "310110": "杨浦区",
        "310112": "闵行区",
        "310113": "宝山区",
        "310114": "嘉定区",
        "310115": "浦东新区",
        "310116": "金山区",
        "310117": "松江区",
        "310118": "青浦区",
        "310120": "奉贤区",
        "310151": "崇明区"
      },
      "320000": {
        "320100": "南京市",
        "320200": "无锡市",
        "320300": "徐州市",
        "320400": "常州市",
        "320500": "苏州市",
        "320600": "南通市",
        "320700": "连云港市",
        "320800": "淮安市",
        "320900": "盐城市",
        "321000": "扬州市",
        "321100": "镇江市",
        "321200": "泰州市",
        "321300": "宿迁市"
      },
      "320100": {
        "320102": "玄武区",
        "320104": "秦淮区",
        "320105": "建邺区",
        "320106": "鼓楼区",
        "320111": "浦口区",
        "320113": "栖霞区",
        "320114": "雨花台区",
        "320115": "江宁区",
        "320116": "六合区",
        "320117": "溧水区",
        "320118": "高淳区"
      },
      "320200": {
        "320205": "锡山区",
        "320206": "惠山区",
        "320211": "滨湖区",
        "320213": "梁溪区",
        "320214": "新吴区",
        "320281": "江阴市",
        "320282": "宜兴市"
      },
      "320300": {
        "320302": "鼓楼区",
        "320303": "云龙区",
        "320305": "贾汪区",
        "320311": "泉山区",
        "320312": "铜山区",
        "320321": "丰县",
        "320322": "沛县",
        "320324": "睢宁县",
        "320381": "新沂市",
        "320382": "邳州市"
      },
      "320400": {
        "320402": "天宁区",
        "320404": "钟楼区",
        "320411": "新北区",
        "320412": "武进区",
        "320413": "金坛区",
        "320481": "溧阳市"
      },
      "320500": {
        "320505": "虎丘区",
        "320506": "吴中区",
        "320507": "相城区",
        "320508": "姑苏区",
        "320509": "吴江区",
        "320581": "常熟市",
        "320582": "张家港市",
        "320583": "昆山市",
        "320585": "太仓市"
      },
      "320600": {
        "320602": "崇川区",
        "320611": "港闸区",
        "320612": "通州区",
        "320621": "海安县",
        "320623": "如东县",
        "320681": "启东市",
        "320682": "如皋市",
        "320684": "海门市"
      },
      "320700": {
        "320703": "连云区",
        "320706": "海州区",
        "320707": "赣榆区",
        "320722": "东海县",
        "320723": "灌云县",
        "320724": "灌南县"
      },
      "320800": {
        "320803": "淮安区",
        "320804": "淮阴区",
        "320812": "清江浦区",
        "320813": "洪泽区",
        "320826": "涟水县",
        "320830": "盱眙县",
        "320831": "金湖县"
      },
      "320900": {
        "320902": "亭湖区",
        "320903": "盐都区",
        "320904": "大丰区",
        "320921": "响水县",
        "320922": "滨海县",
        "320923": "阜宁县",
        "320924": "射阳县",
        "320925": "建湖县",
        "320981": "东台市"
      },
      "321000": {
        "321002": "广陵区",
        "321003": "邗江区",
        "321012": "江都区",
        "321023": "宝应县",
        "321081": "仪征市",
        "321084": "高邮市"
      },
      "321100": {
        "321102": "京口区",
        "321111": "润州区",
        "321112": "丹徒区",
        "321181": "丹阳市",
        "321182": "扬中市",
        "321183": "句容市"
      },
      "321200": {
        "321202": "海陵区",
        "321203": "高港区",
        "321204": "姜堰区",
        "321281": "兴化市",
        "321282": "靖江市",
        "321283": "泰兴市"
      },
      "321300": {
        "321302": "宿城区",
        "321311": "宿豫区",
        "321322": "沭阳县",
        "321323": "泗阳县",
        "321324": "泗洪县"
      },
      "330000": {
        "330100": "杭州市",
        "330200": "宁波市",
        "330300": "温州市",
        "330400": "嘉兴市",
        "330500": "湖州市",
        "330600": "绍兴市",
        "330700": "金华市",
        "330800": "衢州市",
        "330900": "舟山市",
        "331000": "台州市",
        "331100": "丽水市"
      },
      "330100": {
        "330102": "上城区",
        "330103": "下城区",
        "330104": "江干区",
        "330105": "拱墅区",
        "330106": "西湖区",
        "330108": "滨江区",
        "330109": "萧山区",
        "330110": "余杭区",
        "330111": "富阳区",
        "330122": "桐庐县",
        "330127": "淳安县",
        "330182": "建德市",
        "330185": "临安市"
      },
      "330200": {
        "330203": "海曙区",
        "330204": "江东区",
        "330205": "江北区",
        "330206": "北仑区",
        "330211": "镇海区",
        "330212": "鄞州区",
        "330225": "象山县",
        "330226": "宁海县",
        "330281": "余姚市",
        "330282": "慈溪市",
        "330283": "奉化市"
      },
      "330300": {
        "330302": "鹿城区",
        "330303": "龙湾区",
        "330304": "瓯海区",
        "330305": "洞头区",
        "330324": "永嘉县",
        "330326": "平阳县",
        "330327": "苍南县",
        "330328": "文成县",
        "330329": "泰顺县",
        "330381": "瑞安市",
        "330382": "乐清市"
      },
      "330400": {
        "330402": "南湖区",
        "330411": "秀洲区",
        "330421": "嘉善县",
        "330424": "海盐县",
        "330481": "海宁市",
        "330482": "平湖市",
        "330483": "桐乡市"
      },
      "330500": {
        "330502": "吴兴区",
        "330503": "南浔区",
        "330521": "德清县",
        "330522": "长兴县",
        "330523": "安吉县"
      },
      "330600": {
        "330602": "越城区",
        "330603": "柯桥区",
        "330604": "上虞区",
        "330624": "新昌县",
        "330681": "诸暨市",
        "330683": "嵊州市"
      },
      "330700": {
        "330702": "婺城区",
        "330703": "金东区",
        "330723": "武义县",
        "330726": "浦江县",
        "330727": "磐安县",
        "330781": "兰溪市",
        "330782": "义乌市",
        "330783": "东阳市",
        "330784": "永康市"
      },
      "330800": {
        "330802": "柯城区",
        "330803": "衢江区",
        "330822": "常山县",
        "330824": "开化县",
        "330825": "龙游县",
        "330881": "江山市"
      },
      "330900": {
        "330902": "定海区",
        "330903": "普陀区",
        "330921": "岱山县",
        "330922": "嵊泗县"
      },
      "331000": {
        "331002": "椒江区",
        "331003": "黄岩区",
        "331004": "路桥区",
        "331021": "玉环县",
        "331022": "三门县",
        "331023": "天台县",
        "331024": "仙居县",
        "331081": "温岭市",
        "331082": "临海市"
      },
      "331100": {
        "331102": "莲都区",
        "331121": "青田县",
        "331122": "缙云县",
        "331123": "遂昌县",
        "331124": "松阳县",
        "331125": "云和县",
        "331126": "庆元县",
        "331127": "景宁畲族自治县",
        "331181": "龙泉市"
      },
      "340000": {
        "340100": "合肥市",
        "340200": "芜湖市",
        "340300": "蚌埠市",
        "340400": "淮南市",
        "340500": "马鞍山市",
        "340600": "淮北市",
        "340700": "铜陵市",
        "340800": "安庆市",
        "341000": "黄山市",
        "341100": "滁州市",
        "341200": "阜阳市",
        "341300": "宿州市",
        "341500": "六安市",
        "341600": "亳州市",
        "341700": "池州市",
        "341800": "宣城市"
      },
      "340100": {
        "340102": "瑶海区",
        "340103": "庐阳区",
        "340104": "蜀山区",
        "340111": "包河区",
        "340121": "长丰县",
        "340122": "肥东县",
        "340123": "肥西县",
        "340124": "庐江县",
        "340181": "巢湖市"
      },
      "340200": {
        "340202": "镜湖区",
        "340203": "弋江区",
        "340207": "鸠江区",
        "340208": "三山区",
        "340221": "芜湖县",
        "340222": "繁昌县",
        "340223": "南陵县",
        "340225": "无为县"
      },
      "340300": {
        "340302": "龙子湖区",
        "340303": "蚌山区",
        "340304": "禹会区",
        "340311": "淮上区",
        "340321": "怀远县",
        "340322": "五河县",
        "340323": "固镇县"
      },
      "340400": {
        "340402": "大通区",
        "340403": "田家庵区",
        "340404": "谢家集区",
        "340405": "八公山区",
        "340406": "潘集区",
        "340421": "凤台县",
        "340422": "寿县"
      },
      "340500": {
        "340503": "花山区",
        "340504": "雨山区",
        "340506": "博望区",
        "340521": "当涂县",
        "340522": "含山县",
        "340523": "和县"
      },
      "340600": {
        "340602": "杜集区",
        "340603": "相山区",
        "340604": "烈山区",
        "340621": "濉溪县"
      },
      "340700": {
        "340705": "铜官区",
        "340706": "义安区",
        "340711": "郊区",
        "340722": "枞阳县"
      },
      "340800": {
        "340802": "迎江区",
        "340803": "大观区",
        "340811": "宜秀区",
        "340822": "怀宁县",
        "340824": "潜山县",
        "340825": "太湖县",
        "340826": "宿松县",
        "340827": "望江县",
        "340828": "岳西县",
        "340881": "桐城市"
      },
      "341000": {
        "341002": "屯溪区",
        "341003": "黄山区",
        "341004": "徽州区",
        "341021": "歙县",
        "341022": "休宁县",
        "341023": "黟县",
        "341024": "祁门县"
      },
      "341100": {
        "341102": "琅琊区",
        "341103": "南谯区",
        "341122": "来安县",
        "341124": "全椒县",
        "341125": "定远县",
        "341126": "凤阳县",
        "341181": "天长市",
        "341182": "明光市"
      },
      "341200": {
        "341202": "颍州区",
        "341203": "颍东区",
        "341204": "颍泉区",
        "341221": "临泉县",
        "341222": "太和县",
        "341225": "阜南县",
        "341226": "颍上县",
        "341282": "界首市"
      },
      "341300": {
        "341302": "埇桥区",
        "341321": "砀山县",
        "341322": "萧县",
        "341323": "灵璧县",
        "341324": "泗县"
      },
      "341500": {
        "341502": "金安区",
        "341503": "裕安区",
        "341504": "叶集区",
        "341522": "霍邱县",
        "341523": "舒城县",
        "341524": "金寨县",
        "341525": "霍山县"
      },
      "341600": {
        "341602": "谯城区",
        "341621": "涡阳县",
        "341622": "蒙城县",
        "341623": "利辛县"
      },
      "341700": {
        "341702": "贵池区",
        "341721": "东至县",
        "341722": "石台县",
        "341723": "青阳县"
      },
      "341800": {
        "341802": "宣州区",
        "341821": "郎溪县",
        "341822": "广德县",
        "341823": "泾县",
        "341824": "绩溪县",
        "341825": "旌德县",
        "341881": "宁国市"
      },
      "350000": {
        "350100": "福州市",
        "350200": "厦门市",
        "350300": "莆田市",
        "350400": "三明市",
        "350500": "泉州市",
        "350600": "漳州市",
        "350700": "南平市",
        "350800": "龙岩市",
        "350900": "宁德市"
      },
      "350100": {
        "350102": "鼓楼区",
        "350103": "台江区",
        "350104": "仓山区",
        "350105": "马尾区",
        "350111": "晋安区",
        "350121": "闽侯县",
        "350122": "连江县",
        "350123": "罗源县",
        "350124": "闽清县",
        "350125": "永泰县",
        "350128": "平潭县",
        "350181": "福清市",
        "350182": "长乐市"
      },
      "350200": {
        "350203": "思明区",
        "350205": "海沧区",
        "350206": "湖里区",
        "350211": "集美区",
        "350212": "同安区",
        "350213": "翔安区"
      },
      "350300": {
        "350302": "城厢区",
        "350303": "涵江区",
        "350304": "荔城区",
        "350305": "秀屿区",
        "350322": "仙游县"
      },
      "350400": {
        "350402": "梅列区",
        "350403": "三元区",
        "350421": "明溪县",
        "350423": "清流县",
        "350424": "宁化县",
        "350425": "大田县",
        "350426": "尤溪县",
        "350427": "沙县",
        "350428": "将乐县",
        "350429": "泰宁县",
        "350430": "建宁县",
        "350481": "永安市"
      },
      "350500": {
        "350502": "鲤城区",
        "350503": "丰泽区",
        "350504": "洛江区",
        "350505": "泉港区",
        "350521": "惠安县",
        "350524": "安溪县",
        "350525": "永春县",
        "350526": "德化县",
        "350527": "金门县",
        "350581": "石狮市",
        "350582": "晋江市",
        "350583": "南安市"
      },
      "350600": {
        "350602": "芗城区",
        "350603": "龙文区",
        "350622": "云霄县",
        "350623": "漳浦县",
        "350624": "诏安县",
        "350625": "长泰县",
        "350626": "东山县",
        "350627": "南靖县",
        "350628": "平和县",
        "350629": "华安县",
        "350681": "龙海市"
      },
      "350700": {
        "350702": "延平区",
        "350703": "建阳区",
        "350721": "顺昌县",
        "350722": "浦城县",
        "350723": "光泽县",
        "350724": "松溪县",
        "350725": "政和县",
        "350781": "邵武市",
        "350782": "武夷山市",
        "350783": "建瓯市"
      },
      "350800": {
        "350802": "新罗区",
        "350803": "永定区",
        "350821": "长汀县",
        "350823": "上杭县",
        "350824": "武平县",
        "350825": "连城县",
        "350881": "漳平市"
      },
      "350900": {
        "350902": "蕉城区",
        "350921": "霞浦县",
        "350922": "古田县",
        "350923": "屏南县",
        "350924": "寿宁县",
        "350925": "周宁县",
        "350926": "柘荣县",
        "350981": "福安市",
        "350982": "福鼎市"
      },
      "360000": {
        "360100": "南昌市",
        "360200": "景德镇市",
        "360300": "萍乡市",
        "360400": "九江市",
        "360500": "新余市",
        "360600": "鹰潭市",
        "360700": "赣州市",
        "360800": "吉安市",
        "360900": "宜春市",
        "361000": "抚州市",
        "361100": "上饶市"
      },
      "360100": {
        "360102": "东湖区",
        "360103": "西湖区",
        "360104": "青云谱区",
        "360105": "湾里区",
        "360111": "青山湖区",
        "360112": "新建区",
        "360121": "南昌县",
        "360123": "安义县",
        "360124": "进贤县"
      },
      "360200": {
        "360202": "昌江区",
        "360203": "珠山区",
        "360222": "浮梁县",
        "360281": "乐平市"
      },
      "360300": {
        "360302": "安源区",
        "360313": "湘东区",
        "360321": "莲花县",
        "360322": "上栗县",
        "360323": "芦溪县"
      },
      "360400": {
        "360402": "濂溪区",
        "360403": "浔阳区",
        "360421": "九江县",
        "360423": "武宁县",
        "360424": "修水县",
        "360425": "永修县",
        "360426": "德安县",
        "360428": "都昌县",
        "360429": "湖口县",
        "360430": "彭泽县",
        "360481": "瑞昌市",
        "360482": "共青城市",
        "360483": "庐山市"
      },
      "360500": {
        "360502": "渝水区",
        "360521": "分宜县"
      },
      "360600": {
        "360602": "月湖区",
        "360622": "余江县",
        "360681": "贵溪市"
      },
      "360700": {
        "360702": "章贡区",
        "360703": "南康区",
        "360721": "赣县",
        "360722": "信丰县",
        "360723": "大余县",
        "360724": "上犹县",
        "360725": "崇义县",
        "360726": "安远县",
        "360727": "龙南县",
        "360728": "定南县",
        "360729": "全南县",
        "360730": "宁都县",
        "360731": "于都县",
        "360732": "兴国县",
        "360733": "会昌县",
        "360734": "寻乌县",
        "360735": "石城县",
        "360781": "瑞金市"
      },
      "360800": {
        "360802": "吉州区",
        "360803": "青原区",
        "360821": "吉安县",
        "360822": "吉水县",
        "360823": "峡江县",
        "360824": "新干县",
        "360825": "永丰县",
        "360826": "泰和县",
        "360827": "遂川县",
        "360828": "万安县",
        "360829": "安福县",
        "360830": "永新县",
        "360881": "井冈山市"
      },
      "360900": {
        "360902": "袁州区",
        "360921": "奉新县",
        "360922": "万载县",
        "360923": "上高县",
        "360924": "宜丰县",
        "360925": "靖安县",
        "360926": "铜鼓县",
        "360981": "丰城市",
        "360982": "樟树市",
        "360983": "高安市"
      },
      "361000": {
        "361002": "临川区",
        "361021": "南城县",
        "361022": "黎川县",
        "361023": "南丰县",
        "361024": "崇仁县",
        "361025": "乐安县",
        "361026": "宜黄县",
        "361027": "金溪县",
        "361028": "资溪县",
        "361029": "东乡县",
        "361030": "广昌县"
      },
      "361100": {
        "361102": "信州区",
        "361103": "广丰区",
        "361121": "上饶县",
        "361123": "玉山县",
        "361124": "铅山县",
        "361125": "横峰县",
        "361126": "弋阳县",
        "361127": "余干县",
        "361128": "鄱阳县",
        "361129": "万年县",
        "361130": "婺源县",
        "361181": "德兴市"
      },
      "370000": {
        "370100": "济南市",
        "370200": "青岛市",
        "370300": "淄博市",
        "370400": "枣庄市",
        "370500": "东营市",
        "370600": "烟台市",
        "370700": "潍坊市",
        "370800": "济宁市",
        "370900": "泰安市",
        "371000": "威海市",
        "371100": "日照市",
        "371200": "莱芜市",
        "371300": "临沂市",
        "371400": "德州市",
        "371500": "聊城市",
        "371600": "滨州市",
        "371700": "菏泽市"
      },
      "370100": {
        "370102": "历下区",
        "370103": "市中区",
        "370104": "槐荫区",
        "370105": "天桥区",
        "370112": "历城区",
        "370113": "长清区",
        "370124": "平阴县",
        "370125": "济阳县",
        "370126": "商河县",
        "370181": "章丘市"
      },
      "370200": {
        "370202": "市南区",
        "370203": "市北区",
        "370211": "黄岛区",
        "370212": "崂山区",
        "370213": "李沧区",
        "370214": "城阳区",
        "370281": "胶州市",
        "370282": "即墨市",
        "370283": "平度市",
        "370285": "莱西市"
      },
      "370300": {
        "370302": "淄川区",
        "370303": "张店区",
        "370304": "博山区",
        "370305": "临淄区",
        "370306": "周村区",
        "370321": "桓台县",
        "370322": "高青县",
        "370323": "沂源县"
      },
      "370400": {
        "370402": "市中区",
        "370403": "薛城区",
        "370404": "峄城区",
        "370405": "台儿庄区",
        "370406": "山亭区",
        "370481": "滕州市"
      },
      "370500": {
        "370502": "东营区",
        "370503": "河口区",
        "370505": "垦利区",
        "370522": "利津县",
        "370523": "广饶县"
      },
      "370600": {
        "370602": "芝罘区",
        "370611": "福山区",
        "370612": "牟平区",
        "370613": "莱山区",
        "370634": "长岛县",
        "370681": "龙口市",
        "370682": "莱阳市",
        "370683": "莱州市",
        "370684": "蓬莱市",
        "370685": "招远市",
        "370686": "栖霞市",
        "370687": "海阳市"
      },
      "370700": {
        "370702": "潍城区",
        "370703": "寒亭区",
        "370704": "坊子区",
        "370705": "奎文区",
        "370724": "临朐县",
        "370725": "昌乐县",
        "370781": "青州市",
        "370782": "诸城市",
        "370783": "寿光市",
        "370784": "安丘市",
        "370785": "高密市",
        "370786": "昌邑市"
      },
      "370800": {
        "370811": "任城区",
        "370812": "兖州区",
        "370826": "微山县",
        "370827": "鱼台县",
        "370828": "金乡县",
        "370829": "嘉祥县",
        "370830": "汶上县",
        "370831": "泗水县",
        "370832": "梁山县",
        "370881": "曲阜市",
        "370883": "邹城市"
      },
      "370900": {
        "370902": "泰山区",
        "370911": "岱岳区",
        "370921": "宁阳县",
        "370923": "东平县",
        "370982": "新泰市",
        "370983": "肥城市"
      },
      "371000": {
        "371002": "环翠区",
        "371003": "文登区",
        "371082": "荣成市",
        "371083": "乳山市"
      },
      "371100": {
        "371102": "东港区",
        "371103": "岚山区",
        "371121": "五莲县",
        "371122": "莒县"
      },
      "371200": {
        "371202": "莱城区",
        "371203": "钢城区"
      },
      "371300": {
        "371302": "兰山区",
        "371311": "罗庄区",
        "371312": "河东区",
        "371321": "沂南县",
        "371322": "郯城县",
        "371323": "沂水县",
        "371324": "兰陵县",
        "371325": "费县",
        "371326": "平邑县",
        "371327": "莒南县",
        "371328": "蒙阴县",
        "371329": "临沭县"
      },
      "371400": {
        "371402": "德城区",
        "371403": "陵城区",
        "371422": "宁津县",
        "371423": "庆云县",
        "371424": "临邑县",
        "371425": "齐河县",
        "371426": "平原县",
        "371427": "夏津县",
        "371428": "武城县",
        "371481": "乐陵市",
        "371482": "禹城市"
      },
      "371500": {
        "371502": "东昌府区",
        "371521": "阳谷县",
        "371522": "莘县",
        "371523": "茌平县",
        "371524": "东阿县",
        "371525": "冠县",
        "371526": "高唐县",
        "371581": "临清市"
      },
      "371600": {
        "371602": "滨城区",
        "371603": "沾化区",
        "371621": "惠民县",
        "371622": "阳信县",
        "371623": "无棣县",
        "371625": "博兴县",
        "371626": "邹平县"
      },
      "371700": {
        "371702": "牡丹区",
        "371703": "定陶区",
        "371721": "曹县",
        "371722": "单县",
        "371723": "成武县",
        "371724": "巨野县",
        "371725": "郓城县",
        "371726": "鄄城县",
        "371728": "东明县"
      },
      "410000": {
        "410100": "郑州市",
        "410200": "开封市",
        "410300": "洛阳市",
        "410400": "平顶山市",
        "410500": "安阳市",
        "410600": "鹤壁市",
        "410700": "新乡市",
        "410800": "焦作市",
        "410900": "濮阳市",
        "411000": "许昌市",
        "411100": "漯河市",
        "411200": "三门峡市",
        "411300": "南阳市",
        "411400": "商丘市",
        "411500": "信阳市",
        "411600": "周口市",
        "411700": "驻马店市",
        "419001": "济源市"
      },
      "410100": {
        "410102": "中原区",
        "410103": "二七区",
        "410104": "管城回族区",
        "410105": "金水区",
        "410106": "上街区",
        "410108": "惠济区",
        "410122": "中牟县",
        "410181": "巩义市",
        "410182": "荥阳市",
        "410183": "新密市",
        "410184": "新郑市",
        "410185": "登封市"
      },
      "410200": {
        "410202": "龙亭区",
        "410203": "顺河回族区",
        "410204": "鼓楼区",
        "410205": "禹王台区",
        "410211": "金明区",
        "410212": "祥符区",
        "410221": "杞县",
        "410222": "通许县",
        "410223": "尉氏县",
        "410225": "兰考县"
      },
      "410300": {
        "410302": "老城区",
        "410303": "西工区",
        "410304": "瀍河回族区",
        "410305": "涧西区",
        "410306": "吉利区",
        "410311": "洛龙区",
        "410322": "孟津县",
        "410323": "新安县",
        "410324": "栾川县",
        "410325": "嵩县",
        "410326": "汝阳县",
        "410327": "宜阳县",
        "410328": "洛宁县",
        "410329": "伊川县",
        "410381": "偃师市"
      },
      "410400": {
        "410402": "新华区",
        "410403": "卫东区",
        "410404": "石龙区",
        "410411": "湛河区",
        "410421": "宝丰县",
        "410422": "叶县",
        "410423": "鲁山县",
        "410425": "郏县",
        "410481": "舞钢市",
        "410482": "汝州市"
      },
      "410500": {
        "410502": "文峰区",
        "410503": "北关区",
        "410505": "殷都区",
        "410506": "龙安区",
        "410522": "安阳县",
        "410523": "汤阴县",
        "410526": "滑县",
        "410527": "内黄县",
        "410581": "林州市"
      },
      "410600": {
        "410602": "鹤山区",
        "410603": "山城区",
        "410611": "淇滨区",
        "410621": "浚县",
        "410622": "淇县"
      },
      "410700": {
        "410702": "红旗区",
        "410703": "卫滨区",
        "410704": "凤泉区",
        "410711": "牧野区",
        "410721": "新乡县",
        "410724": "获嘉县",
        "410725": "原阳县",
        "410726": "延津县",
        "410727": "封丘县",
        "410728": "长垣县",
        "410781": "卫辉市",
        "410782": "辉县市"
      },
      "410800": {
        "410802": "解放区",
        "410803": "中站区",
        "410804": "马村区",
        "410811": "山阳区",
        "410821": "修武县",
        "410822": "博爱县",
        "410823": "武陟县",
        "410825": "温县",
        "410882": "沁阳市",
        "410883": "孟州市"
      },
      "410900": {
        "410902": "华龙区",
        "410922": "清丰县",
        "410923": "南乐县",
        "410926": "范县",
        "410927": "台前县",
        "410928": "濮阳县"
      },
      "411000": {
        "411002": "魏都区",
        "411023": "许昌县",
        "411024": "鄢陵县",
        "411025": "襄城县",
        "411081": "禹州市",
        "411082": "长葛市"
      },
      "411100": {
        "411102": "源汇区",
        "411103": "郾城区",
        "411104": "召陵区",
        "411121": "舞阳县",
        "411122": "临颍县"
      },
      "411200": {
        "411202": "湖滨区",
        "411203": "陕州区",
        "411221": "渑池县",
        "411224": "卢氏县",
        "411281": "义马市",
        "411282": "灵宝市"
      },
      "411300": {
        "411302": "宛城区",
        "411303": "卧龙区",
        "411321": "南召县",
        "411322": "方城县",
        "411323": "西峡县",
        "411324": "镇平县",
        "411325": "内乡县",
        "411326": "淅川县",
        "411327": "社旗县",
        "411328": "唐河县",
        "411329": "新野县",
        "411330": "桐柏县",
        "411381": "邓州市"
      },
      "411400": {
        "411402": "梁园区",
        "411403": "睢阳区",
        "411421": "民权县",
        "411422": "睢县",
        "411423": "宁陵县",
        "411424": "柘城县",
        "411425": "虞城县",
        "411426": "夏邑县",
        "411481": "永城市"
      },
      "411500": {
        "411502": "浉河区",
        "411503": "平桥区",
        "411521": "罗山县",
        "411522": "光山县",
        "411523": "新县",
        "411524": "商城县",
        "411525": "固始县",
        "411526": "潢川县",
        "411527": "淮滨县",
        "411528": "息县"
      },
      "411600": {
        "411602": "川汇区",
        "411621": "扶沟县",
        "411622": "西华县",
        "411623": "商水县",
        "411624": "沈丘县",
        "411625": "郸城县",
        "411626": "淮阳县",
        "411627": "太康县",
        "411628": "鹿邑县",
        "411681": "项城市"
      },
      "411700": {
        "411702": "驿城区",
        "411721": "西平县",
        "411722": "上蔡县",
        "411723": "平舆县",
        "411724": "正阳县",
        "411725": "确山县",
        "411726": "泌阳县",
        "411727": "汝南县",
        "411728": "遂平县",
        "411729": "新蔡县"
      },
      "420000": {
        "420100": "武汉市",
        "420200": "黄石市",
        "420300": "十堰市",
        "420500": "宜昌市",
        "420600": "襄阳市",
        "420700": "鄂州市",
        "420800": "荆门市",
        "420900": "孝感市",
        "421000": "荆州市",
        "421100": "黄冈市",
        "421200": "咸宁市",
        "421300": "随州市",
        "422800": "恩施土家族苗族自治州",
        "429004": "仙桃市",
        "429005": "潜江市",
        "429006": "天门市",
        "429021": "神农架林区"
      },
      "420100": {
        "420102": "江岸区",
        "420103": "江汉区",
        "420104": "硚口区",
        "420105": "汉阳区",
        "420106": "武昌区",
        "420107": "青山区",
        "420111": "洪山区",
        "420112": "东西湖区",
        "420113": "汉南区",
        "420114": "蔡甸区",
        "420115": "江夏区",
        "420116": "黄陂区",
        "420117": "新洲区"
      },
      "420200": {
        "420202": "黄石港区",
        "420203": "西塞山区",
        "420204": "下陆区",
        "420205": "铁山区",
        "420222": "阳新县",
        "420281": "大冶市"
      },
      "420300": {
        "420302": "茅箭区",
        "420303": "张湾区",
        "420304": "郧阳区",
        "420322": "郧西县",
        "420323": "竹山县",
        "420324": "竹溪县",
        "420325": "房县",
        "420381": "丹江口市"
      },
      "420500": {
        "420502": "西陵区",
        "420503": "伍家岗区",
        "420504": "点军区",
        "420505": "猇亭区",
        "420506": "夷陵区",
        "420525": "远安县",
        "420526": "兴山县",
        "420527": "秭归县",
        "420528": "长阳土家族自治县",
        "420529": "五峰土家族自治县",
        "420581": "宜都市",
        "420582": "当阳市",
        "420583": "枝江市"
      },
      "420600": {
        "420602": "襄城区",
        "420606": "樊城区",
        "420607": "襄州区",
        "420624": "南漳县",
        "420625": "谷城县",
        "420626": "保康县",
        "420682": "老河口市",
        "420683": "枣阳市",
        "420684": "宜城市"
      },
      "420700": {
        "420702": "梁子湖区",
        "420703": "华容区",
        "420704": "鄂城区"
      },
      "420800": {
        "420802": "东宝区",
        "420804": "掇刀区",
        "420821": "京山县",
        "420822": "沙洋县",
        "420881": "钟祥市"
      },
      "420900": {
        "420902": "孝南区",
        "420921": "孝昌县",
        "420922": "大悟县",
        "420923": "云梦县",
        "420981": "应城市",
        "420982": "安陆市",
        "420984": "汉川市"
      },
      "421000": {
        "421002": "沙市区",
        "421003": "荆州区",
        "421022": "公安县",
        "421023": "监利县",
        "421024": "江陵县",
        "421081": "石首市",
        "421083": "洪湖市",
        "421087": "松滋市"
      },
      "421100": {
        "421102": "黄州区",
        "421121": "团风县",
        "421122": "红安县",
        "421123": "罗田县",
        "421124": "英山县",
        "421125": "浠水县",
        "421126": "蕲春县",
        "421127": "黄梅县",
        "421181": "麻城市",
        "421182": "武穴市"
      },
      "421200": {
        "421202": "咸安区",
        "421221": "嘉鱼县",
        "421222": "通城县",
        "421223": "崇阳县",
        "421224": "通山县",
        "421281": "赤壁市"
      },
      "421300": {
        "421303": "曾都区",
        "421321": "随县",
        "421381": "广水市"
      },
      "422800": {
        "422801": "恩施市",
        "422802": "利川市",
        "422822": "建始县",
        "422823": "巴东县",
        "422825": "宣恩县",
        "422826": "咸丰县",
        "422827": "来凤县",
        "422828": "鹤峰县"
      },
      "430000": {
        "430100": "长沙市",
        "430200": "株洲市",
        "430300": "湘潭市",
        "430400": "衡阳市",
        "430500": "邵阳市",
        "430600": "岳阳市",
        "430700": "常德市",
        "430800": "张家界市",
        "430900": "益阳市",
        "431000": "郴州市",
        "431100": "永州市",
        "431200": "怀化市",
        "431300": "娄底市",
        "433100": "湘西土家族苗族自治州"
      },
      "430100": {
        "430102": "芙蓉区",
        "430103": "天心区",
        "430104": "岳麓区",
        "430105": "开福区",
        "430111": "雨花区",
        "430112": "望城区",
        "430121": "长沙县",
        "430124": "宁乡县",
        "430181": "浏阳市"
      },
      "430200": {
        "430202": "荷塘区",
        "430203": "芦淞区",
        "430204": "石峰区",
        "430211": "天元区",
        "430221": "株洲县",
        "430223": "攸县",
        "430224": "茶陵县",
        "430225": "炎陵县",
        "430281": "醴陵市"
      },
      "430300": {
        "430302": "雨湖区",
        "430304": "岳塘区",
        "430321": "湘潭县",
        "430381": "湘乡市",
        "430382": "韶山市"
      },
      "430400": {
        "430405": "珠晖区",
        "430406": "雁峰区",
        "430407": "石鼓区",
        "430408": "蒸湘区",
        "430412": "南岳区",
        "430421": "衡阳县",
        "430422": "衡南县",
        "430423": "衡山县",
        "430424": "衡东县",
        "430426": "祁东县",
        "430481": "耒阳市",
        "430482": "常宁市"
      },
      "430500": {
        "430502": "双清区",
        "430503": "大祥区",
        "430511": "北塔区",
        "430521": "邵东县",
        "430522": "新邵县",
        "430523": "邵阳县",
        "430524": "隆回县",
        "430525": "洞口县",
        "430527": "绥宁县",
        "430528": "新宁县",
        "430529": "城步苗族自治县",
        "430581": "武冈市"
      },
      "430600": {
        "430602": "岳阳楼区",
        "430603": "云溪区",
        "430611": "君山区",
        "430621": "岳阳县",
        "430623": "华容县",
        "430624": "湘阴县",
        "430626": "平江县",
        "430681": "汨罗市",
        "430682": "临湘市"
      },
      "430700": {
        "430702": "武陵区",
        "430703": "鼎城区",
        "430721": "安乡县",
        "430722": "汉寿县",
        "430723": "澧县",
        "430724": "临澧县",
        "430725": "桃源县",
        "430726": "石门县",
        "430781": "津市市"
      },
      "430800": {
        "430802": "永定区",
        "430811": "武陵源区",
        "430821": "慈利县",
        "430822": "桑植县"
      },
      "430900": {
        "430902": "资阳区",
        "430903": "赫山区",
        "430921": "南县",
        "430922": "桃江县",
        "430923": "安化县",
        "430981": "沅江市"
      },
      "431000": {
        "431002": "北湖区",
        "431003": "苏仙区",
        "431021": "桂阳县",
        "431022": "宜章县",
        "431023": "永兴县",
        "431024": "嘉禾县",
        "431025": "临武县",
        "431026": "汝城县",
        "431027": "桂东县",
        "431028": "安仁县",
        "431081": "资兴市"
      },
      "431100": {
        "431102": "零陵区",
        "431103": "冷水滩区",
        "431121": "祁阳县",
        "431122": "东安县",
        "431123": "双牌县",
        "431124": "道县",
        "431125": "江永县",
        "431126": "宁远县",
        "431127": "蓝山县",
        "431128": "新田县",
        "431129": "江华瑶族自治县"
      },
      "431200": {
        "431202": "鹤城区",
        "431221": "中方县",
        "431222": "沅陵县",
        "431223": "辰溪县",
        "431224": "溆浦县",
        "431225": "会同县",
        "431226": "麻阳苗族自治县",
        "431227": "新晃侗族自治县",
        "431228": "芷江侗族自治县",
        "431229": "靖州苗族侗族自治县",
        "431230": "通道侗族自治县",
        "431281": "洪江市"
      },
      "431300": {
        "431302": "娄星区",
        "431321": "双峰县",
        "431322": "新化县",
        "431381": "冷水江市",
        "431382": "涟源市"
      },
      "433100": {
        "433101": "吉首市",
        "433122": "泸溪县",
        "433123": "凤凰县",
        "433124": "花垣县",
        "433125": "保靖县",
        "433126": "古丈县",
        "433127": "永顺县",
        "433130": "龙山县"
      },
      "440000": {
        "440100": "广州市",
        "440200": "韶关市",
        "440300": "深圳市",
        "440400": "珠海市",
        "440500": "汕头市",
        "440600": "佛山市",
        "440700": "江门市",
        "440800": "湛江市",
        "440900": "茂名市",
        "441200": "肇庆市",
        "441300": "惠州市",
        "441400": "梅州市",
        "441500": "汕尾市",
        "441600": "河源市",
        "441700": "阳江市",
        "441800": "清远市",
        "441900": "东莞市",
        "442000": "中山市",
        "445100": "潮州市",
        "445200": "揭阳市",
        "445300": "云浮市"
      },
      "440100": {
        "440103": "荔湾区",
        "440104": "越秀区",
        "440105": "海珠区",
        "440106": "天河区",
        "440111": "白云区",
        "440112": "黄埔区",
        "440113": "番禺区",
        "440114": "花都区",
        "440115": "南沙区",
        "440117": "从化区",
        "440118": "增城区"
      },
      "440200": {
        "440203": "武江区",
        "440204": "浈江区",
        "440205": "曲江区",
        "440222": "始兴县",
        "440224": "仁化县",
        "440229": "翁源县",
        "440232": "乳源瑶族自治县",
        "440233": "新丰县",
        "440281": "乐昌市",
        "440282": "南雄市"
      },
      "440300": {
        "440303": "罗湖区",
        "440304": "福田区",
        "440305": "南山区",
        "440306": "宝安区",
        "440307": "龙岗区",
        "440308": "盐田区"
      },
      "440400": {
        "440402": "香洲区",
        "440403": "斗门区",
        "440404": "金湾区"
      },
      "440500": {
        "440507": "龙湖区",
        "440511": "金平区",
        "440512": "濠江区",
        "440513": "潮阳区",
        "440514": "潮南区",
        "440515": "澄海区",
        "440523": "南澳县"
      },
      "440600": {
        "440604": "禅城区",
        "440605": "南海区",
        "440606": "顺德区",
        "440607": "三水区",
        "440608": "高明区"
      },
      "440700": {
        "440703": "蓬江区",
        "440704": "江海区",
        "440705": "新会区",
        "440781": "台山市",
        "440783": "开平市",
        "440784": "鹤山市",
        "440785": "恩平市"
      },
      "440800": {
        "440802": "赤坎区",
        "440803": "霞山区",
        "440804": "坡头区",
        "440811": "麻章区",
        "440823": "遂溪县",
        "440825": "徐闻县",
        "440881": "廉江市",
        "440882": "雷州市",
        "440883": "吴川市"
      },
      "440900": {
        "440902": "茂南区",
        "440904": "电白区",
        "440981": "高州市",
        "440982": "化州市",
        "440983": "信宜市"
      },
      "441200": {
        "441202": "端州区",
        "441203": "鼎湖区",
        "441204": "高要区",
        "441223": "广宁县",
        "441224": "怀集县",
        "441225": "封开县",
        "441226": "德庆县",
        "441284": "四会市"
      },
      "441300": {
        "441302": "惠城区",
        "441303": "惠阳区",
        "441322": "博罗县",
        "441323": "惠东县",
        "441324": "龙门县"
      },
      "441400": {
        "441402": "梅江区",
        "441403": "梅县区",
        "441422": "大埔县",
        "441423": "丰顺县",
        "441424": "五华县",
        "441426": "平远县",
        "441427": "蕉岭县",
        "441481": "兴宁市"
      },
      "441500": {
        "441502": "城区",
        "441521": "海丰县",
        "441523": "陆河县",
        "441581": "陆丰市"
      },
      "441600": {
        "441602": "源城区",
        "441621": "紫金县",
        "441622": "龙川县",
        "441623": "连平县",
        "441624": "和平县",
        "441625": "东源县"
      },
      "441700": {
        "441702": "江城区",
        "441704": "阳东区",
        "441721": "阳西县",
        "441781": "阳春市"
      },
      "441800": {
        "441802": "清城区",
        "441803": "清新区",
        "441821": "佛冈县",
        "441823": "阳山县",
        "441825": "连山壮族瑶族自治县",
        "441826": "连南瑶族自治县",
        "441881": "英德市",
        "441882": "连州市"
      },
      "445100": {
        "445102": "湘桥区",
        "445103": "潮安区",
        "445122": "饶平县"
      },
      "445200": {
        "445202": "榕城区",
        "445203": "揭东区",
        "445222": "揭西县",
        "445224": "惠来县",
        "445281": "普宁市"
      },
      "445300": {
        "445302": "云城区",
        "445303": "云安区",
        "445321": "新兴县",
        "445322": "郁南县",
        "445381": "罗定市"
      },
      "450000": {
        "450100": "南宁市",
        "450200": "柳州市",
        "450300": "桂林市",
        "450400": "梧州市",
        "450500": "北海市",
        "450600": "防城港市",
        "450700": "钦州市",
        "450800": "贵港市",
        "450900": "玉林市",
        "451000": "百色市",
        "451100": "贺州市",
        "451200": "河池市",
        "451300": "来宾市",
        "451400": "崇左市"
      },
      "450100": {
        "450102": "兴宁区",
        "450103": "青秀区",
        "450105": "江南区",
        "450107": "西乡塘区",
        "450108": "良庆区",
        "450109": "邕宁区",
        "450110": "武鸣区",
        "450123": "隆安县",
        "450124": "马山县",
        "450125": "上林县",
        "450126": "宾阳县",
        "450127": "横县"
      },
      "450200": {
        "450202": "城中区",
        "450203": "鱼峰区",
        "450204": "柳南区",
        "450205": "柳北区",
        "450206": "柳江区",
        "450222": "柳城县",
        "450223": "鹿寨县",
        "450224": "融安县",
        "450225": "融水苗族自治县",
        "450226": "三江侗族自治县"
      },
      "450300": {
        "450302": "秀峰区",
        "450303": "叠彩区",
        "450304": "象山区",
        "450305": "七星区",
        "450311": "雁山区",
        "450312": "临桂区",
        "450321": "阳朔县",
        "450323": "灵川县",
        "450324": "全州县",
        "450325": "兴安县",
        "450326": "永福县",
        "450327": "灌阳县",
        "450328": "龙胜各族自治县",
        "450329": "资源县",
        "450330": "平乐县",
        "450331": "荔浦县",
        "450332": "恭城瑶族自治县"
      },
      "450400": {
        "450403": "万秀区",
        "450405": "长洲区",
        "450406": "龙圩区",
        "450421": "苍梧县",
        "450422": "藤县",
        "450423": "蒙山县",
        "450481": "岑溪市"
      },
      "450500": {
        "450502": "海城区",
        "450503": "银海区",
        "450512": "铁山港区",
        "450521": "合浦县"
      },
      "450600": {
        "450602": "港口区",
        "450603": "防城区",
        "450621": "上思县",
        "450681": "东兴市"
      },
      "450700": {
        "450702": "钦南区",
        "450703": "钦北区",
        "450721": "灵山县",
        "450722": "浦北县"
      },
      "450800": {
        "450802": "港北区",
        "450803": "港南区",
        "450804": "覃塘区",
        "450821": "平南县",
        "450881": "桂平市"
      },
      "450900": {
        "450902": "玉州区",
        "450903": "福绵区",
        "450921": "容县",
        "450922": "陆川县",
        "450923": "博白县",
        "450924": "兴业县",
        "450981": "北流市"
      },
      "451000": {
        "451002": "右江区",
        "451021": "田阳县",
        "451022": "田东县",
        "451023": "平果县",
        "451024": "德保县",
        "451026": "那坡县",
        "451027": "凌云县",
        "451028": "乐业县",
        "451029": "田林县",
        "451030": "西林县",
        "451031": "隆林各族自治县",
        "451081": "靖西市"
      },
      "451100": {
        "451102": "八步区",
        "451103": "平桂区",
        "451121": "昭平县",
        "451122": "钟山县",
        "451123": "富川瑶族自治县"
      },
      "451200": {
        "451202": "金城江区",
        "451221": "南丹县",
        "451222": "天峨县",
        "451223": "凤山县",
        "451224": "东兰县",
        "451225": "罗城仫佬族自治县",
        "451226": "环江毛南族自治县",
        "451227": "巴马瑶族自治县",
        "451228": "都安瑶族自治县",
        "451229": "大化瑶族自治县",
        "451281": "宜州市"
      },
      "451300": {
        "451302": "兴宾区",
        "451321": "忻城县",
        "451322": "象州县",
        "451323": "武宣县",
        "451324": "金秀瑶族自治县",
        "451381": "合山市"
      },
      "451400": {
        "451402": "江州区",
        "451421": "扶绥县",
        "451422": "宁明县",
        "451423": "龙州县",
        "451424": "大新县",
        "451425": "天等县",
        "451481": "凭祥市"
      },
      "460000": {
        "460100": "海口市",
        "460200": "三亚市",
        "460300": "三沙市",
        "460400": "儋州市",
        "469001": "五指山市",
        "469002": "琼海市",
        "469005": "文昌市",
        "469006": "万宁市",
        "469007": "东方市",
        "469021": "定安县",
        "469022": "屯昌县",
        "469023": "澄迈县",
        "469024": "临高县",
        "469025": "白沙黎族自治县",
        "469026": "昌江黎族自治县",
        "469027": "乐东黎族自治县",
        "469028": "陵水黎族自治县",
        "469029": "保亭黎族苗族自治县",
        "469030": "琼中黎族苗族自治县"
      },
      "460100": {
        "460105": "秀英区",
        "460106": "龙华区",
        "460107": "琼山区",
        "460108": "美兰区"
      },
      "460200": {
        "460202": "海棠区",
        "460203": "吉阳区",
        "460204": "天涯区",
        "460205": "崖州区"
      },
      "500000": {
        "500100": "市辖区"
      },
      "500100": {
        "500101": "万州区",
        "500102": "涪陵区",
        "500103": "渝中区",
        "500104": "大渡口区",
        "500105": "江北区",
        "500106": "沙坪坝区",
        "500107": "九龙坡区",
        "500108": "南岸区",
        "500109": "北碚区",
        "500110": "綦江区",
        "500111": "大足区",
        "500112": "渝北区",
        "500113": "巴南区",
        "500114": "黔江区",
        "500115": "长寿区",
        "500116": "江津区",
        "500117": "合川区",
        "500118": "永川区",
        "500119": "南川区",
        "500120": "璧山区",
        "500151": "铜梁区",
        "500152": "潼南区",
        "500153": "荣昌区",
        "500154": "开州区",
        "500228": "梁平县",
        "500229": "城口县",
        "500230": "丰都县",
        "500231": "垫江县",
        "500232": "武隆县",
        "500233": "忠县",
        "500235": "云阳县",
        "500236": "奉节县",
        "500237": "巫山县",
        "500238": "巫溪县",
        "500240": "石柱土家族自治县",
        "500241": "秀山土家族苗族自治县",
        "500242": "酉阳土家族苗族自治县",
        "500243": "彭水苗族土家族自治县"
      },
      "510000": {
        "510100": "成都市",
        "510300": "自贡市",
        "510400": "攀枝花市",
        "510500": "泸州市",
        "510600": "德阳市",
        "510700": "绵阳市",
        "510800": "广元市",
        "510900": "遂宁市",
        "511000": "内江市",
        "511100": "乐山市",
        "511300": "南充市",
        "511400": "眉山市",
        "511500": "宜宾市",
        "511600": "广安市",
        "511700": "达州市",
        "511800": "雅安市",
        "511900": "巴中市",
        "512000": "资阳市",
        "513200": "阿坝藏族羌族自治州",
        "513300": "甘孜藏族自治州",
        "513400": "凉山彝族自治州"
      },
      "510100": {
        "510104": "锦江区",
        "510105": "青羊区",
        "510106": "金牛区",
        "510107": "武侯区",
        "510108": "成华区",
        "510112": "龙泉驿区",
        "510113": "青白江区",
        "510114": "新都区",
        "510115": "温江区",
        "510116": "双流区",
        "510121": "金堂县",
        "510124": "郫县",
        "510129": "大邑县",
        "510131": "蒲江县",
        "510132": "新津县",
        "510181": "都江堰市",
        "510182": "彭州市",
        "510183": "邛崃市",
        "510184": "崇州市",
        "510185": "简阳市"
      },
      "510300": {
        "510302": "自流井区",
        "510303": "贡井区",
        "510304": "大安区",
        "510311": "沿滩区",
        "510321": "荣县",
        "510322": "富顺县"
      },
      "510400": {
        "510402": "东区",
        "510403": "西区",
        "510411": "仁和区",
        "510421": "米易县",
        "510422": "盐边县"
      },
      "510500": {
        "510502": "江阳区",
        "510503": "纳溪区",
        "510504": "龙马潭区",
        "510521": "泸县",
        "510522": "合江县",
        "510524": "叙永县",
        "510525": "古蔺县"
      },
      "510600": {
        "510603": "旌阳区",
        "510623": "中江县",
        "510626": "罗江县",
        "510681": "广汉市",
        "510682": "什邡市",
        "510683": "绵竹市"
      },
      "510700": {
        "510703": "涪城区",
        "510704": "游仙区",
        "510705": "安州区",
        "510722": "三台县",
        "510723": "盐亭县",
        "510725": "梓潼县",
        "510726": "北川羌族自治县",
        "510727": "平武县",
        "510781": "江油市"
      },
      "510800": {
        "510802": "利州区",
        "510811": "昭化区",
        "510812": "朝天区",
        "510821": "旺苍县",
        "510822": "青川县",
        "510823": "剑阁县",
        "510824": "苍溪县"
      },
      "510900": {
        "510903": "船山区",
        "510904": "安居区",
        "510921": "蓬溪县",
        "510922": "射洪县",
        "510923": "大英县"
      },
      "511000": {
        "511002": "市中区",
        "511011": "东兴区",
        "511024": "威远县",
        "511025": "资中县",
        "511028": "隆昌县"
      },
      "511100": {
        "511102": "市中区",
        "511111": "沙湾区",
        "511112": "五通桥区",
        "511113": "金口河区",
        "511123": "犍为县",
        "511124": "井研县",
        "511126": "夹江县",
        "511129": "沐川县",
        "511132": "峨边彝族自治县",
        "511133": "马边彝族自治县",
        "511181": "峨眉山市"
      },
      "511300": {
        "511302": "顺庆区",
        "511303": "高坪区",
        "511304": "嘉陵区",
        "511321": "南部县",
        "511322": "营山县",
        "511323": "蓬安县",
        "511324": "仪陇县",
        "511325": "西充县",
        "511381": "阆中市"
      },
      "511400": {
        "511402": "东坡区",
        "511403": "彭山区",
        "511421": "仁寿县",
        "511423": "洪雅县",
        "511424": "丹棱县",
        "511425": "青神县"
      },
      "511500": {
        "511502": "翠屏区",
        "511503": "南溪区",
        "511521": "宜宾县",
        "511523": "江安县",
        "511524": "长宁县",
        "511525": "高县",
        "511526": "珙县",
        "511527": "筠连县",
        "511528": "兴文县",
        "511529": "屏山县"
      },
      "511600": {
        "511602": "广安区",
        "511603": "前锋区",
        "511621": "岳池县",
        "511622": "武胜县",
        "511623": "邻水县",
        "511681": "华蓥市"
      },
      "511700": {
        "511702": "通川区",
        "511703": "达川区",
        "511722": "宣汉县",
        "511723": "开江县",
        "511724": "大竹县",
        "511725": "渠县",
        "511781": "万源市"
      },
      "511800": {
        "511802": "雨城区",
        "511803": "名山区",
        "511822": "荥经县",
        "511823": "汉源县",
        "511824": "石棉县",
        "511825": "天全县",
        "511826": "芦山县",
        "511827": "宝兴县"
      },
      "511900": {
        "511902": "巴州区",
        "511903": "恩阳区",
        "511921": "通江县",
        "511922": "南江县",
        "511923": "平昌县"
      },
      "512000": {
        "512002": "雁江区",
        "512021": "安岳县",
        "512022": "乐至县"
      },
      "513200": {
        "513201": "马尔康市",
        "513221": "汶川县",
        "513222": "理县",
        "513223": "茂县",
        "513224": "松潘县",
        "513225": "九寨沟县",
        "513226": "金川县",
        "513227": "小金县",
        "513228": "黑水县",
        "513230": "壤塘县",
        "513231": "阿坝县",
        "513232": "若尔盖县",
        "513233": "红原县"
      },
      "513300": {
        "513301": "康定市",
        "513322": "泸定县",
        "513323": "丹巴县",
        "513324": "九龙县",
        "513325": "雅江县",
        "513326": "道孚县",
        "513327": "炉霍县",
        "513328": "甘孜县",
        "513329": "新龙县",
        "513330": "德格县",
        "513331": "白玉县",
        "513332": "石渠县",
        "513333": "色达县",
        "513334": "理塘县",
        "513335": "巴塘县",
        "513336": "乡城县",
        "513337": "稻城县",
        "513338": "得荣县"
      },
      "513400": {
        "513401": "西昌市",
        "513422": "木里藏族自治县",
        "513423": "盐源县",
        "513424": "德昌县",
        "513425": "会理县",
        "513426": "会东县",
        "513427": "宁南县",
        "513428": "普格县",
        "513429": "布拖县",
        "513430": "金阳县",
        "513431": "昭觉县",
        "513432": "喜德县",
        "513433": "冕宁县",
        "513434": "越西县",
        "513435": "甘洛县",
        "513436": "美姑县",
        "513437": "雷波县"
      },
      "520000": {
        "520100": "贵阳市",
        "520200": "六盘水市",
        "520300": "遵义市",
        "520400": "安顺市",
        "520500": "毕节市",
        "520600": "铜仁市",
        "522300": "黔西南布依族苗族自治州",
        "522600": "黔东南苗族侗族自治州",
        "522700": "黔南布依族苗族自治州"
      },
      "520100": {
        "520102": "南明区",
        "520103": "云岩区",
        "520111": "花溪区",
        "520112": "乌当区",
        "520113": "白云区",
        "520115": "观山湖区",
        "520121": "开阳县",
        "520122": "息烽县",
        "520123": "修文县",
        "520181": "清镇市"
      },
      "520200": {
        "520201": "钟山区",
        "520203": "六枝特区",
        "520221": "水城县",
        "520222": "盘县"
      },
      "520300": {
        "520302": "红花岗区",
        "520303": "汇川区",
        "520304": "播州区",
        "520322": "桐梓县",
        "520323": "绥阳县",
        "520324": "正安县",
        "520325": "道真仡佬族苗族自治县",
        "520326": "务川仡佬族苗族自治县",
        "520327": "凤冈县",
        "520328": "湄潭县",
        "520329": "余庆县",
        "520330": "习水县",
        "520381": "赤水市",
        "520382": "仁怀市"
      },
      "520400": {
        "520402": "西秀区",
        "520403": "平坝区",
        "520422": "普定县",
        "520423": "镇宁布依族苗族自治县",
        "520424": "关岭布依族苗族自治县",
        "520425": "紫云苗族布依族自治县"
      },
      "520500": {
        "520502": "七星关区",
        "520521": "大方县",
        "520522": "黔西县",
        "520523": "金沙县",
        "520524": "织金县",
        "520525": "纳雍县",
        "520526": "威宁彝族回族苗族自治县",
        "520527": "赫章县"
      },
      "520600": {
        "520602": "碧江区",
        "520603": "万山区",
        "520621": "江口县",
        "520622": "玉屏侗族自治县",
        "520623": "石阡县",
        "520624": "思南县",
        "520625": "印江土家族苗族自治县",
        "520626": "德江县",
        "520627": "沿河土家族自治县",
        "520628": "松桃苗族自治县"
      },
      "522300": {
        "522301": "兴义市",
        "522322": "兴仁县",
        "522323": "普安县",
        "522324": "晴隆县",
        "522325": "贞丰县",
        "522326": "望谟县",
        "522327": "册亨县",
        "522328": "安龙县"
      },
      "522600": {
        "522601": "凯里市",
        "522622": "黄平县",
        "522623": "施秉县",
        "522624": "三穗县",
        "522625": "镇远县",
        "522626": "岑巩县",
        "522627": "天柱县",
        "522628": "锦屏县",
        "522629": "剑河县",
        "522630": "台江县",
        "522631": "黎平县",
        "522632": "榕江县",
        "522633": "从江县",
        "522634": "雷山县",
        "522635": "麻江县",
        "522636": "丹寨县"
      },
      "522700": {
        "522701": "都匀市",
        "522702": "福泉市",
        "522722": "荔波县",
        "522723": "贵定县",
        "522725": "瓮安县",
        "522726": "独山县",
        "522727": "平塘县",
        "522728": "罗甸县",
        "522729": "长顺县",
        "522730": "龙里县",
        "522731": "惠水县",
        "522732": "三都水族自治县"
      },
      "530000": {
        "530100": "昆明市",
        "530300": "曲靖市",
        "530400": "玉溪市",
        "530500": "保山市",
        "530600": "昭通市",
        "530700": "丽江市",
        "530800": "普洱市",
        "530900": "临沧市",
        "532300": "楚雄彝族自治州",
        "532500": "红河哈尼族彝族自治州",
        "532600": "文山壮族苗族自治州",
        "532800": "西双版纳傣族自治州",
        "532900": "大理白族自治州",
        "533100": "德宏傣族景颇族自治州",
        "533300": "怒江傈僳族自治州",
        "533400": "迪庆藏族自治州"
      },
      "530100": {
        "530102": "五华区",
        "530103": "盘龙区",
        "530111": "官渡区",
        "530112": "西山区",
        "530113": "东川区",
        "530114": "呈贡区",
        "530122": "晋宁县",
        "530124": "富民县",
        "530125": "宜良县",
        "530126": "石林彝族自治县",
        "530127": "嵩明县",
        "530128": "禄劝彝族苗族自治县",
        "530129": "寻甸回族彝族自治县",
        "530181": "安宁市"
      },
      "530300": {
        "530302": "麒麟区",
        "530303": "沾益区",
        "530321": "马龙县",
        "530322": "陆良县",
        "530323": "师宗县",
        "530324": "罗平县",
        "530325": "富源县",
        "530326": "会泽县",
        "530381": "宣威市"
      },
      "530400": {
        "530402": "红塔区",
        "530403": "江川区",
        "530422": "澄江县",
        "530423": "通海县",
        "530424": "华宁县",
        "530425": "易门县",
        "530426": "峨山彝族自治县",
        "530427": "新平彝族傣族自治县",
        "530428": "元江哈尼族彝族傣族自治县"
      },
      "530500": {
        "530502": "隆阳区",
        "530521": "施甸县",
        "530523": "龙陵县",
        "530524": "昌宁县",
        "530581": "腾冲市"
      },
      "530600": {
        "530602": "昭阳区",
        "530621": "鲁甸县",
        "530622": "巧家县",
        "530623": "盐津县",
        "530624": "大关县",
        "530625": "永善县",
        "530626": "绥江县",
        "530627": "镇雄县",
        "530628": "彝良县",
        "530629": "威信县",
        "530630": "水富县"
      },
      "530700": {
        "530702": "古城区",
        "530721": "玉龙纳西族自治县",
        "530722": "永胜县",
        "530723": "华坪县",
        "530724": "宁蒗彝族自治县"
      },
      "530800": {
        "530802": "思茅区",
        "530821": "宁洱哈尼族彝族自治县",
        "530822": "墨江哈尼族自治县",
        "530823": "景东彝族自治县",
        "530824": "景谷傣族彝族自治县",
        "530825": "镇沅彝族哈尼族拉祜族自治县",
        "530826": "江城哈尼族彝族自治县",
        "530827": "孟连傣族拉祜族佤族自治县",
        "530828": "澜沧拉祜族自治县",
        "530829": "西盟佤族自治县"
      },
      "530900": {
        "530902": "临翔区",
        "530921": "凤庆县",
        "530922": "云县",
        "530923": "永德县",
        "530924": "镇康县",
        "530925": "双江拉祜族佤族布朗族傣族自治县",
        "530926": "耿马傣族佤族自治县",
        "530927": "沧源佤族自治县"
      },
      "532300": {
        "532301": "楚雄市",
        "532322": "双柏县",
        "532323": "牟定县",
        "532324": "南华县",
        "532325": "姚安县",
        "532326": "大姚县",
        "532327": "永仁县",
        "532328": "元谋县",
        "532329": "武定县",
        "532331": "禄丰县"
      },
      "532500": {
        "532501": "个旧市",
        "532502": "开远市",
        "532503": "蒙自市",
        "532504": "弥勒市",
        "532523": "屏边苗族自治县",
        "532524": "建水县",
        "532525": "石屏县",
        "532527": "泸西县",
        "532528": "元阳县",
        "532529": "红河县",
        "532530": "金平苗族瑶族傣族自治县",
        "532531": "绿春县",
        "532532": "河口瑶族自治县"
      },
      "532600": {
        "532601": "文山市",
        "532622": "砚山县",
        "532623": "西畴县",
        "532624": "麻栗坡县",
        "532625": "马关县",
        "532626": "丘北县",
        "532627": "广南县",
        "532628": "富宁县"
      },
      "532800": {
        "532801": "景洪市",
        "532822": "勐海县",
        "532823": "勐腊县"
      },
      "532900": {
        "532901": "大理市",
        "532922": "漾濞彝族自治县",
        "532923": "祥云县",
        "532924": "宾川县",
        "532925": "弥渡县",
        "532926": "南涧彝族自治县",
        "532927": "巍山彝族回族自治县",
        "532928": "永平县",
        "532929": "云龙县",
        "532930": "洱源县",
        "532931": "剑川县",
        "532932": "鹤庆县"
      },
      "533100": {
        "533102": "瑞丽市",
        "533103": "芒市",
        "533122": "梁河县",
        "533123": "盈江县",
        "533124": "陇川县"
      },
      "533300": {
        "533301": "泸水市",
        "533323": "福贡县",
        "533324": "贡山独龙族怒族自治县",
        "533325": "兰坪白族普米族自治县"
      },
      "533400": {
        "533401": "香格里拉市",
        "533422": "德钦县",
        "533423": "维西傈僳族自治县"
      },
      "540000": {
        "540100": "拉萨市",
        "540200": "日喀则市",
        "540300": "昌都市",
        "540400": "林芝市",
        "540500": "山南市",
        "542400": "那曲地区",
        "542500": "阿里地区"
      },
      "540100": {
        "540102": "城关区",
        "540103": "堆龙德庆区",
        "540121": "林周县",
        "540122": "当雄县",
        "540123": "尼木县",
        "540124": "曲水县",
        "540126": "达孜县",
        "540127": "墨竹工卡县"
      },
      "540200": {
        "540202": "桑珠孜区",
        "540221": "南木林县",
        "540222": "江孜县",
        "540223": "定日县",
        "540224": "萨迦县",
        "540225": "拉孜县",
        "540226": "昂仁县",
        "540227": "谢通门县",
        "540228": "白朗县",
        "540229": "仁布县",
        "540230": "康马县",
        "540231": "定结县",
        "540232": "仲巴县",
        "540233": "亚东县",
        "540234": "吉隆县",
        "540235": "聂拉木县",
        "540236": "萨嘎县",
        "540237": "岗巴县"
      },
      "540300": {
        "540302": "卡若区",
        "540321": "江达县",
        "540322": "贡觉县",
        "540323": "类乌齐县",
        "540324": "丁青县",
        "540325": "察雅县",
        "540326": "八宿县",
        "540327": "左贡县",
        "540328": "芒康县",
        "540329": "洛隆县",
        "540330": "边坝县"
      },
      "540400": {
        "540402": "巴宜区",
        "540421": "工布江达县",
        "540422": "米林县",
        "540423": "墨脱县",
        "540424": "波密县",
        "540425": "察隅县",
        "540426": "朗县"
      },
      "540500": {
        "540502": "乃东区",
        "540521": "扎囊县",
        "540522": "贡嘎县",
        "540523": "桑日县",
        "540524": "琼结县",
        "540525": "曲松县",
        "540526": "措美县",
        "540527": "洛扎县",
        "540528": "加查县",
        "540529": "隆子县",
        "540530": "错那县",
        "540531": "浪卡子县"
      },
      "542400": {
        "542421": "那曲县",
        "542422": "嘉黎县",
        "542423": "比如县",
        "542424": "聂荣县",
        "542425": "安多县",
        "542426": "申扎县",
        "542427": "索县",
        "542428": "班戈县",
        "542429": "巴青县",
        "542430": "尼玛县",
        "542431": "双湖县"
      },
      "542500": {
        "542521": "普兰县",
        "542522": "札达县",
        "542523": "噶尔县",
        "542524": "日土县",
        "542525": "革吉县",
        "542526": "改则县",
        "542527": "措勤县"
      },
      "610000": {
        "610100": "西安市",
        "610200": "铜川市",
        "610300": "宝鸡市",
        "610400": "咸阳市",
        "610500": "渭南市",
        "610600": "延安市",
        "610700": "汉中市",
        "610800": "榆林市",
        "610900": "安康市",
        "611000": "商洛市"
      },
      "610100": {
        "610102": "新城区",
        "610103": "碑林区",
        "610104": "莲湖区",
        "610111": "灞桥区",
        "610112": "未央区",
        "610113": "雁塔区",
        "610114": "阎良区",
        "610115": "临潼区",
        "610116": "长安区",
        "610117": "高陵区",
        "610122": "蓝田县",
        "610124": "周至县",
        "610125": "户县"
      },
      "610200": {
        "610202": "王益区",
        "610203": "印台区",
        "610204": "耀州区",
        "610222": "宜君县"
      },
      "610300": {
        "610302": "渭滨区",
        "610303": "金台区",
        "610304": "陈仓区",
        "610322": "凤翔县",
        "610323": "岐山县",
        "610324": "扶风县",
        "610326": "眉县",
        "610327": "陇县",
        "610328": "千阳县",
        "610329": "麟游县",
        "610330": "凤县",
        "610331": "太白县"
      },
      "610400": {
        "610402": "秦都区",
        "610403": "杨陵区",
        "610404": "渭城区",
        "610422": "三原县",
        "610423": "泾阳县",
        "610424": "乾县",
        "610425": "礼泉县",
        "610426": "永寿县",
        "610427": "彬县",
        "610428": "长武县",
        "610429": "旬邑县",
        "610430": "淳化县",
        "610431": "武功县",
        "610481": "兴平市"
      },
      "610500": {
        "610502": "临渭区",
        "610503": "华州区",
        "610522": "潼关县",
        "610523": "大荔县",
        "610524": "合阳县",
        "610525": "澄城县",
        "610526": "蒲城县",
        "610527": "白水县",
        "610528": "富平县",
        "610581": "韩城市",
        "610582": "华阴市"
      },
      "610600": {
        "610602": "宝塔区",
        "610603": "安塞区",
        "610621": "延长县",
        "610622": "延川县",
        "610623": "子长县",
        "610625": "志丹县",
        "610626": "吴起县",
        "610627": "甘泉县",
        "610628": "富县",
        "610629": "洛川县",
        "610630": "宜川县",
        "610631": "黄龙县",
        "610632": "黄陵县"
      },
      "610700": {
        "610702": "汉台区",
        "610721": "南郑县",
        "610722": "城固县",
        "610723": "洋县",
        "610724": "西乡县",
        "610725": "勉县",
        "610726": "宁强县",
        "610727": "略阳县",
        "610728": "镇巴县",
        "610729": "留坝县",
        "610730": "佛坪县"
      },
      "610800": {
        "610802": "榆阳区",
        "610803": "横山区",
        "610821": "神木县",
        "610822": "府谷县",
        "610824": "靖边县",
        "610825": "定边县",
        "610826": "绥德县",
        "610827": "米脂县",
        "610828": "佳县",
        "610829": "吴堡县",
        "610830": "清涧县",
        "610831": "子洲县"
      },
      "610900": {
        "610902": "汉滨区",
        "610921": "汉阴县",
        "610922": "石泉县",
        "610923": "宁陕县",
        "610924": "紫阳县",
        "610925": "岚皋县",
        "610926": "平利县",
        "610927": "镇坪县",
        "610928": "旬阳县",
        "610929": "白河县"
      },
      "611000": {
        "611002": "商州区",
        "611021": "洛南县",
        "611022": "丹凤县",
        "611023": "商南县",
        "611024": "山阳县",
        "611025": "镇安县",
        "611026": "柞水县"
      },
      "620000": {
        "620100": "兰州市",
        "620200": "嘉峪关市",
        "620300": "金昌市",
        "620400": "白银市",
        "620500": "天水市",
        "620600": "武威市",
        "620700": "张掖市",
        "620800": "平凉市",
        "620900": "酒泉市",
        "621000": "庆阳市",
        "621100": "定西市",
        "621200": "陇南市",
        "622900": "临夏回族自治州",
        "623000": "甘南藏族自治州"
      },
      "620100": {
        "620102": "城关区",
        "620103": "七里河区",
        "620104": "西固区",
        "620105": "安宁区",
        "620111": "红古区",
        "620121": "永登县",
        "620122": "皋兰县",
        "620123": "榆中县"
      },
      "620300": {
        "620302": "金川区",
        "620321": "永昌县"
      },
      "620400": {
        "620402": "白银区",
        "620403": "平川区",
        "620421": "靖远县",
        "620422": "会宁县",
        "620423": "景泰县"
      },
      "620500": {
        "620502": "秦州区",
        "620503": "麦积区",
        "620521": "清水县",
        "620522": "秦安县",
        "620523": "甘谷县",
        "620524": "武山县",
        "620525": "张家川回族自治县"
      },
      "620600": {
        "620602": "凉州区",
        "620621": "民勤县",
        "620622": "古浪县",
        "620623": "天祝藏族自治县"
      },
      "620700": {
        "620702": "甘州区",
        "620721": "肃南裕固族自治县",
        "620722": "民乐县",
        "620723": "临泽县",
        "620724": "高台县",
        "620725": "山丹县"
      },
      "620800": {
        "620802": "崆峒区",
        "620821": "泾川县",
        "620822": "灵台县",
        "620823": "崇信县",
        "620824": "华亭县",
        "620825": "庄浪县",
        "620826": "静宁县"
      },
      "620900": {
        "620902": "肃州区",
        "620921": "金塔县",
        "620922": "瓜州县",
        "620923": "肃北蒙古族自治县",
        "620924": "阿克塞哈萨克族自治县",
        "620981": "玉门市",
        "620982": "敦煌市"
      },
      "621000": {
        "621002": "西峰区",
        "621021": "庆城县",
        "621022": "环县",
        "621023": "华池县",
        "621024": "合水县",
        "621025": "正宁县",
        "621026": "宁县",
        "621027": "镇原县"
      },
      "621100": {
        "621102": "安定区",
        "621121": "通渭县",
        "621122": "陇西县",
        "621123": "渭源县",
        "621124": "临洮县",
        "621125": "漳县",
        "621126": "岷县"
      },
      "621200": {
        "621202": "武都区",
        "621221": "成县",
        "621222": "文县",
        "621223": "宕昌县",
        "621224": "康县",
        "621225": "西和县",
        "621226": "礼县",
        "621227": "徽县",
        "621228": "两当县"
      },
      "622900": {
        "622901": "临夏市",
        "622921": "临夏县",
        "622922": "康乐县",
        "622923": "永靖县",
        "622924": "广河县",
        "622925": "和政县",
        "622926": "东乡族自治县",
        "622927": "积石山保安族东乡族撒拉族自治县"
      },
      "623000": {
        "623001": "合作市",
        "623021": "临潭县",
        "623022": "卓尼县",
        "623023": "舟曲县",
        "623024": "迭部县",
        "623025": "玛曲县",
        "623026": "碌曲县",
        "623027": "夏河县"
      },
      "630000": {
        "630100": "西宁市",
        "630200": "海东市",
        "632200": "海北藏族自治州",
        "632300": "黄南藏族自治州",
        "632500": "海南藏族自治州",
        "632600": "果洛藏族自治州",
        "632700": "玉树藏族自治州",
        "632800": "海西蒙古族藏族自治州"
      },
      "630100": {
        "630102": "城东区",
        "630103": "城中区",
        "630104": "城西区",
        "630105": "城北区",
        "630121": "大通回族土族自治县",
        "630122": "湟中县",
        "630123": "湟源县"
      },
      "630200": {
        "630202": "乐都区",
        "630203": "平安区",
        "630222": "民和回族土族自治县",
        "630223": "互助土族自治县",
        "630224": "化隆回族自治县",
        "630225": "循化撒拉族自治县"
      },
      "632200": {
        "632221": "门源回族自治县",
        "632222": "祁连县",
        "632223": "海晏县",
        "632224": "刚察县"
      },
      "632300": {
        "632321": "同仁县",
        "632322": "尖扎县",
        "632323": "泽库县",
        "632324": "河南蒙古族自治县"
      },
      "632500": {
        "632521": "共和县",
        "632522": "同德县",
        "632523": "贵德县",
        "632524": "兴海县",
        "632525": "贵南县"
      },
      "632600": {
        "632621": "玛沁县",
        "632622": "班玛县",
        "632623": "甘德县",
        "632624": "达日县",
        "632625": "久治县",
        "632626": "玛多县"
      },
      "632700": {
        "632701": "玉树市",
        "632722": "杂多县",
        "632723": "称多县",
        "632724": "治多县",
        "632725": "囊谦县",
        "632726": "曲麻莱县"
      },
      "632800": {
        "632801": "格尔木市",
        "632802": "德令哈市",
        "632821": "乌兰县",
        "632822": "都兰县",
        "632823": "天峻县"
      },
      "640000": {
        "640100": "银川市",
        "640200": "石嘴山市",
        "640300": "吴忠市",
        "640400": "固原市",
        "640500": "中卫市"
      },
      "640100": {
        "640104": "兴庆区",
        "640105": "西夏区",
        "640106": "金凤区",
        "640121": "永宁县",
        "640122": "贺兰县",
        "640181": "灵武市"
      },
      "640200": {
        "640202": "大武口区",
        "640205": "惠农区",
        "640221": "平罗县"
      },
      "640300": {
        "640302": "利通区",
        "640303": "红寺堡区",
        "640323": "盐池县",
        "640324": "同心县",
        "640381": "青铜峡市"
      },
      "640400": {
        "640402": "原州区",
        "640422": "西吉县",
        "640423": "隆德县",
        "640424": "泾源县",
        "640425": "彭阳县"
      },
      "640500": {
        "640502": "沙坡头区",
        "640521": "中宁县",
        "640522": "海原县"
      },
      "650000": {
        "650100": "乌鲁木齐市",
        "650200": "克拉玛依市",
        "650400": "吐鲁番市",
        "650500": "哈密市",
        "652300": "昌吉回族自治州",
        "652700": "博尔塔拉蒙古自治州",
        "652800": "巴音郭楞蒙古自治州",
        "652900": "阿克苏地区",
        "653000": "克孜勒苏柯尔克孜自治州",
        "653100": "喀什地区",
        "653200": "和田地区",
        "654000": "伊犁哈萨克自治州",
        "654200": "塔城地区",
        "654300": "阿勒泰地区",
        "659001": "石河子市",
        "659002": "阿拉尔市",
        "659003": "图木舒克市",
        "659004": "五家渠市",
        "659006": "铁门关市"
      },
      "650100": {
        "650102": "天山区",
        "650103": "沙依巴克区",
        "650104": "新市区",
        "650105": "水磨沟区",
        "650106": "头屯河区",
        "650107": "达坂城区",
        "650109": "米东区",
        "650121": "乌鲁木齐县"
      },
      "650200": {
        "650202": "独山子区",
        "650203": "克拉玛依区",
        "650204": "白碱滩区",
        "650205": "乌尔禾区"
      },
      "650400": {
        "650402": "高昌区",
        "650421": "鄯善县",
        "650422": "托克逊县"
      },
      "650500": {
        "650502": "伊州区",
        "650521": "巴里坤哈萨克自治县",
        "650522": "伊吾县"
      },
      "652300": {
        "652301": "昌吉市",
        "652302": "阜康市",
        "652323": "呼图壁县",
        "652324": "玛纳斯县",
        "652325": "奇台县",
        "652327": "吉木萨尔县",
        "652328": "木垒哈萨克自治县"
      },
      "652700": {
        "652701": "博乐市",
        "652702": "阿拉山口市",
        "652722": "精河县",
        "652723": "温泉县"
      },
      "652800": {
        "652801": "库尔勒市",
        "652822": "轮台县",
        "652823": "尉犁县",
        "652824": "若羌县",
        "652825": "且末县",
        "652826": "焉耆回族自治县",
        "652827": "和静县",
        "652828": "和硕县",
        "652829": "博湖县"
      },
      "652900": {
        "652901": "阿克苏市",
        "652922": "温宿县",
        "652923": "库车县",
        "652924": "沙雅县",
        "652925": "新和县",
        "652926": "拜城县",
        "652927": "乌什县",
        "652928": "阿瓦提县",
        "652929": "柯坪县"
      },
      "653000": {
        "653001": "阿图什市",
        "653022": "阿克陶县",
        "653023": "阿合奇县",
        "653024": "乌恰县"
      },
      "653100": {
        "653101": "喀什市",
        "653121": "疏附县",
        "653122": "疏勒县",
        "653123": "英吉沙县",
        "653124": "泽普县",
        "653125": "莎车县",
        "653126": "叶城县",
        "653127": "麦盖提县",
        "653128": "岳普湖县",
        "653129": "伽师县",
        "653130": "巴楚县",
        "653131": "塔什库尔干塔吉克自治县"
      },
      "653200": {
        "653201": "和田市",
        "653221": "和田县",
        "653222": "墨玉县",
        "653223": "皮山县",
        "653224": "洛浦县",
        "653225": "策勒县",
        "653226": "于田县",
        "653227": "民丰县"
      },
      "654000": {
        "654002": "伊宁市",
        "654003": "奎屯市",
        "654004": "霍尔果斯市",
        "654021": "伊宁县",
        "654022": "察布查尔锡伯自治县",
        "654023": "霍城县",
        "654024": "巩留县",
        "654025": "新源县",
        "654026": "昭苏县",
        "654027": "特克斯县",
        "654028": "尼勒克县"
      },
      "654200": {
        "654201": "塔城市",
        "654202": "乌苏市",
        "654221": "额敏县",
        "654223": "沙湾县",
        "654224": "托里县",
        "654225": "裕民县",
        "654226": "和布克赛尔蒙古自治县"
      },
      "654300": {
        "654301": "阿勒泰市",
        "654321": "布尔津县",
        "654322": "富蕴县",
        "654323": "福海县",
        "654324": "哈巴河县",
        "654325": "青河县",
        "654326": "吉木乃县"
      },
      "810000": {
        "810001": "中西區",
        "810002": "灣仔區",
        "810003": "東區",
        "810004": "南區",
        "810005": "油尖旺區",
        "810006": "深水埗區",
        "810007": "九龍城區",
        "810008": "黃大仙區",
        "810009": "觀塘區",
        "810010": "荃灣區",
        "810011": "屯門區",
        "810012": "元朗區",
        "810013": "北區",
        "810014": "大埔區",
        "810015": "西貢區",
        "810016": "沙田區",
        "810017": "葵青區",
        "810018": "離島區"
      },
      "820000": {
        "820001": "花地瑪堂區",
        "820002": "花王堂區",
        "820003": "望德堂區",
        "820004": "大堂區",
        "820005": "風順堂區",
        "820006": "嘉模堂區",
        "820007": "路氹填海區",
        "820008": "聖方濟各堂區"
      }
    };
    return data;
  }
  var dataExports = requireData();
  const CHINA_AREA = /* @__PURE__ */ getDefaultExportFromCjs(dataExports);
  const _sfc_main$3 = vue.defineComponent({
    name: "PickerSlot",
    props: {
      styles: Object,
      list: {
        type: Array,
        default: () => []
      },
      align: {
        type: String,
        default: "center"
      },
      target: {
        type: String,
        required: true
      },
      initItem: {
        type: [String, Number],
        default: ""
      }
    },
    setup(props2, { emit }) {
      const count = 7;
      const height = vue.ref(35);
      const current = vue.ref({});
      const translateY = vue.ref(0);
      const currentTranslateY = vue.ref(0);
      const dragging = vue.ref(false);
      const startX = vue.ref(0);
      const startY = vue.ref(0);
      const delta = vue.ref({ x: 0, y: 0 });
      const classes = vue.computed(() => ["dpzvc3-picker-slot"]);
      const draggingClass = vue.computed(() => ({
        "dpzvc3-picker-slot-dragging": dragging.value
      }));
      const wrapperHeight = vue.computed(() => count * height.value);
      const getStyles = vue.ref({});
      const updateStyles = () => {
        const styles = { ...props2.styles };
        if (styles.height) {
          height.value = styles.height / count;
        }
        getStyles.value = { ...styles, height: wrapperHeight.value + "px" };
      };
      const getSelectedIndex = () => {
        const maxIndex = props2.list.length - 1;
        let index = -Math.round(currentTranslateY.value / height.value);
        index = Math.max(index, 0);
        index = Math.min(index, maxIndex);
        return index;
      };
      updateStyles();
      vue.watch(
        () => props2.styles,
        () => {
          updateStyles();
        },
        { deep: true }
      );
      vue.watch(
        () => props2.list,
        (list) => {
          if (list.length) {
            let index = getSelectedIndex();
            if (index > list.length - 1) index = 0;
            current.value = { ...current.value, ...list[index] };
            emit("change", props2.target, current.value);
          } else {
            translateY.value = 0;
          }
        },
        { immediate: true }
      );
      const setSelectedItem = (index) => {
        translateY.value = currentTranslateY.value = -index * height.value;
        try {
          if (current.value.code === props2.list[index].code && current.value.value === props2.list[index].value) {
            return;
          }
          current.value = {
            code: props2.list[index].code,
            value: props2.list[index].value,
            target: props2.target,
            index
          };
        } catch (e2) {
          current.value = {
            code: "",
            value: "",
            target: props2.target,
            index: ""
          };
        }
        emit("change", props2.target, current.value);
      };
      const scrollToItem = (code) => {
        props2.list.forEach((item, i2) => {
          if (item.code === code) {
            currentTranslateY.value = translateY.value;
            setSelectedItem(i2);
          }
        });
      };
      const _onTouchStart = (e2) => {
        e2.preventDefault();
        e2.stopPropagation();
        currentTranslateY.value = translateY.value;
        startX.value = e2.touches[0].pageX;
        startY.value = e2.touches[0].pageY;
        dragging.value = true;
      };
      const _onTouchMove = (e2) => {
        e2.preventDefault();
        e2.stopPropagation();
        delta.value.x = e2.touches[0].pageX - startX.value;
        delta.value.y = e2.touches[0].pageY - startY.value;
        translateY.value = delta.value.y + currentTranslateY.value;
      };
      const _onTouchEnd = (e2) => {
        e2.preventDefault();
        e2.stopPropagation();
        dragging.value = false;
        currentTranslateY.value = translateY.value;
        const index = getSelectedIndex();
        setSelectedItem(index);
      };
      vue.watch(
        () => props2.initItem,
        (value) => {
          if (value === "" || value === null) {
            current.value = {
              code: "",
              target: props2.target,
              index: "",
              value: ""
            };
            emit("change", props2.target, current.value);
          } else {
            scrollToItem(value);
          }
        },
        { immediate: true }
      );
      vue.onMounted(() => {
        if (!props2.initItem && props2.initItem !== 0) {
          current.value = {
            code: "",
            target: props2.target,
            index: "",
            value: ""
          };
          emit("change", props2.target, current.value);
        } else {
          scrollToItem(props2.initItem);
        }
      });
      return {
        classes,
        draggingClass,
        translateY,
        height,
        current,
        _onTouchStart,
        _onTouchMove,
        _onTouchEnd,
        getStyles,
        getSelectedIndex
      };
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.classes),
      style: vue.normalizeStyle(_ctx.getStyles)
    }, [
      vue.createElementVNode("ul", {
        class: vue.normalizeClass(_ctx.draggingClass),
        style: vue.normalizeStyle({ transform: `translate3d(0,${_ctx.translateY}px,0)` }),
        onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx._onTouchStart && _ctx._onTouchStart(...args)),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx._onTouchMove && _ctx._onTouchMove(...args)),
        onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx._onTouchEnd && _ctx._onTouchEnd(...args))
      }, [
        vue.createElementVNode("li", {
          style: vue.normalizeStyle({ height: _ctx.height + "px" })
        }, null, 4),
        vue.createElementVNode("li", {
          style: vue.normalizeStyle({ height: _ctx.height + "px" })
        }, null, 4),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.list, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("li", {
            key: index,
            class: vue.normalizeClass({
              current: index === _ctx.current.index,
              level_1_1: index - _ctx.current.index === 1,
              level_2_1: index - _ctx.current.index === 2,
              level_3_1: index - _ctx.current.index >= 3,
              level_1: index - _ctx.current.index === -1,
              level_2: index - _ctx.current.index === -2,
              level_3: index - _ctx.current.index <= -3
            }),
            style: vue.normalizeStyle({ textAlign: _ctx.align, height: _ctx.height + "px" })
          }, vue.toDisplayString(item.value), 7);
        }), 128)),
        vue.createElementVNode("li", {
          style: vue.normalizeStyle({ height: _ctx.height + "px" })
        }, null, 4),
        vue.createElementVNode("li", {
          style: vue.normalizeStyle({ height: _ctx.height + "px" })
        }, null, 4)
      ], 38)
    ], 6);
  }
  const PickerSlot = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
  const props$1 = {
    props: {
      addressValue: String,
      styles: {
        type: Object,
        default: () => {
        }
      },
      valueSeparator: {
        type: String,
        default: "/"
      }
    }
  };
  const prefixCls$2 = "dpzvc3-picker";
  const rootCode = "86";
  const _sfc_main$2 = vue.defineComponent({
    name: "AreaPicker",
    components: { PickerSlot },
    props: {
      ...props$1,
      addressValue: String,
      valueSeparator: {
        type: String,
        default: "-"
      }
    },
    setup(props2, { emit }) {
      const { pickerOnOk, pickeronFail } = vue.inject("DpzVc3Picker");
      const currentValue = vue.ref(props2.addressValue || "");
      const province = vue.ref({
        value: "北京市",
        code: "110000",
        target: "province",
        index: 0
      });
      const city = vue.ref({
        value: "市辖区",
        code: "110100",
        target: "city",
        index: 0
      });
      const district = vue.ref({
        value: "东城区",
        code: "110101",
        target: "district",
        index: 0
      });
      const classes = vue.computed(() => [prefixCls$2]);
      const provinces = vue.computed(() => filter("province"));
      const citys = vue.computed(() => filter("city", province.value));
      const districts = vue.computed(() => filter("district", city.value));
      vue.watch(
        () => props2.addressValue,
        (val) => {
          currentValue.value = val;
          initVal();
        },
        { immediate: true }
      );
      function initVal() {
        if (!currentValue.value) return;
        const [provinceName, cityName, districtName] = currentValue.value.split(
          props2.valueSeparator
        );
        const provincesData = CHINA_AREA[rootCode];
        if (provincesData) {
          Object.keys(provincesData).forEach((item) => {
            if (provinceName === item || provinceName === provincesData[item]) {
              province.value.value = provincesData[item];
              province.value.code = item;
            }
          });
        }
        const cityData = CHINA_AREA[province.value.code];
        if (cityData) {
          Object.keys(cityData).forEach((item) => {
            if (cityName === item || cityName === cityData[item]) {
              city.value.value = cityData[item];
              city.value.code = item;
            }
          });
        }
        const districtData = CHINA_AREA[city.value.code];
        if (districtData) {
          Object.keys(districtData).forEach((item) => {
            if (districtName === item || districtName === districtData[item]) {
              district.value.value = districtData[item];
              district.value.code = item;
            }
          });
        }
      }
      function filter(target, val = {}) {
        switch (target) {
          case "province": {
            const data2 = CHINA_AREA[rootCode];
            if (!data2) return [];
            return Object.keys(data2).map((item, index) => ({
              code: item,
              value: data2[item],
              target,
              index
            }));
          }
          case "city":
          case "district": {
            const listData = CHINA_AREA[val.code];
            if (!listData) {
              if (target) {
                if (target === "city")
                  city.value = { value: "", code: "", target, index: 0 };
                if (target === "district")
                  district.value = { value: "", code: "", target, index: 0 };
              }
              return [];
            }
            return Object.keys(listData).map((item, index) => ({
              code: item,
              value: listData[item],
              target,
              index
            }));
          }
        }
      }
      function change(target, current) {
        if (target === "province")
          province.value = { ...province.value, ...current };
        if (target === "city") city.value = { ...city.value, ...current };
        if (target === "district")
          district.value = { ...district.value, ...current };
        emit(
          "update:addressValue",
          [province.value.value, city.value.value, district.value.value].filter(Boolean).join(props2.valueSeparator)
        );
        emit("change", {
          province: { code: province.value.code, name: province.value.value },
          city: { code: city.value.code, name: city.value.value },
          district: { code: district.value.code, name: district.value.value }
        });
      }
      function sure() {
        pickerOnOk({
          province: { code: province.value.code, name: province.value.value },
          city: { code: city.value.code, name: city.value.value },
          district: { code: district.value.code, name: district.value.value },
          formArea: [province.value.value, city.value.value, district.value.value].filter(Boolean).join(props2.valueSeparator)
        });
      }
      function cancle() {
        pickeronFail();
      }
      return {
        classes,
        province,
        city,
        district,
        provinces,
        citys,
        districts,
        currentValue,
        change,
        sure,
        cancle
      };
    }
  });
  const _hoisted_1$2 = { class: "header" };
  const _hoisted_2$2 = { class: "main" };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PickerSlot = vue.resolveComponent("PickerSlot");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.classes)
    }, [
      vue.createElementVNode("div", _hoisted_1$2, [
        vue.createElementVNode("div", {
          class: "left",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancle && _ctx.cancle(...args))
        }, "取消"),
        _cache[2] || (_cache[2] = vue.createElementVNode("div", { class: "title" }, "请选择区域", -1)),
        vue.createElementVNode("div", {
          class: "right",
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.sure && _ctx.sure(...args))
        }, "确定")
      ]),
      vue.createElementVNode("div", _hoisted_2$2, [
        vue.createVNode(_component_PickerSlot, {
          list: _ctx.provinces,
          "init-item": _ctx.province.code,
          target: "province",
          onChange: _ctx.change
        }, null, 8, ["list", "init-item", "onChange"]),
        vue.createVNode(_component_PickerSlot, {
          list: _ctx.citys,
          "init-item": _ctx.city.code,
          target: "city",
          onChange: _ctx.change
        }, null, 8, ["list", "init-item", "onChange"]),
        vue.createVNode(_component_PickerSlot, {
          list: _ctx.districts,
          "init-item": _ctx.district.code,
          target: "district",
          onChange: _ctx.change
        }, null, 8, ["list", "init-item", "onChange"])
      ])
    ], 2);
  }
  const areaPicker = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  const areaPicker$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: areaPicker
  }, Symbol.toStringTag, { value: "Module" }));
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
  const prefixCls$1 = "dpzvc3-date-picker";
  const _sfc_main$1 = vue.defineComponent({
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
      const { pickerOnOk, pickeronFail } = vue.inject("DpzVc3Picker");
      const currentValue = vue.ref(props2.dateValue || "");
      const date = vue.ref({
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
      const classes = vue.computed(() => [prefixCls$1]);
      const yearList = vue.computed(() => {
        if (!props2.year) return [];
        let from = 1900;
        let to = (/* @__PURE__ */ new Date()).getFullYear();
        if (Array.isArray(props2.year)) {
          from = props2.year[0] ?? from;
          to = props2.year[1] ?? to;
        }
        const list = [];
        for (let i2 = from, index = 0; i2 <= to; i2++, index++) {
          list.push({ code: i2, value: String(i2), target: "year", index });
        }
        return list;
      });
      const monthList = vue.computed(() => {
        if (!props2.month) return [];
        let from = 1;
        let to = 12;
        if (Array.isArray(props2.month)) {
          from = props2.month[0] ?? from;
          to = props2.month[1] ?? to;
        }
        const list = [];
        for (let i2 = from, index = 0; i2 <= to; i2++, index++) {
          list.push({ code: i2, value: String(i2), target: "month", index });
        }
        return list;
      });
      const dayList = vue.computed(() => {
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
        for (let i2 = from, index = 0; i2 <= to; i2++, index++) {
          list.push({ code: i2, value: String(i2), target: "day", index });
        }
        return list;
      });
      vue.watch(
        () => props2.dateValue,
        (val) => {
          currentValue.value = val;
          initVal();
        },
        { immediate: true }
      );
      function initVal() {
        if (!currentValue.value) return;
        const [y2 = "", m2 = "", d2 = ""] = currentValue.value.split(
          props2.valueSeparator
        );
        if (props2.year)
          date.value.year = { ...date.value.year, code: Number(y2), value: y2 };
        if (props2.month)
          date.value.month = { ...date.value.month, code: Number(m2), value: m2 };
        if (props2.day)
          date.value.day = { ...date.value.day, code: Number(d2), value: d2 };
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
  const _hoisted_1$1 = { class: "header" };
  const _hoisted_2$1 = { class: "main" };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PickerSlot = vue.resolveComponent("PickerSlot");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.classes)
    }, [
      vue.createElementVNode("div", _hoisted_1$1, [
        vue.createElementVNode("div", {
          class: "left",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancle && _ctx.cancle(...args))
        }, "取消"),
        vue.createElementVNode("div", {
          class: "right",
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.sure && _ctx.sure(...args))
        }, "确定")
      ]),
      vue.createElementVNode("div", _hoisted_2$1, [
        _ctx.year ? (vue.openBlock(), vue.createBlock(_component_PickerSlot, {
          key: 0,
          list: _ctx.yearList,
          "init-item": _ctx.date.year.code,
          target: "year",
          onChange: _ctx.change
        }, null, 8, ["list", "init-item", "onChange"])) : vue.createCommentVNode("", true),
        _ctx.month ? (vue.openBlock(), vue.createBlock(_component_PickerSlot, {
          key: 1,
          list: _ctx.monthList,
          "init-item": _ctx.date.month.code,
          target: "month",
          onChange: _ctx.change
        }, null, 8, ["list", "init-item", "onChange"])) : vue.createCommentVNode("", true),
        _ctx.day ? (vue.openBlock(), vue.createBlock(_component_PickerSlot, {
          key: 2,
          list: _ctx.dayList,
          "init-item": _ctx.date.day.code,
          target: "day",
          onChange: _ctx.change
        }, null, 8, ["list", "init-item", "onChange"])) : vue.createCommentVNode("", true)
      ])
    ], 2);
  }
  const datePicker = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const datePicker$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: datePicker
  }, Symbol.toStringTag, { value: "Module" }));
  const prefixCls = "dpzvc3-normal-picker";
  const _sfc_main = vue.defineComponent({
    name: "NormalPicker",
    components: { PickerSlot },
    props: {
      list: { type: Array, default: () => [] },
      initArr: { type: Array, default: () => [] }
    },
    setup(props2, { emit }) {
      const { pickerOnOk, pickeronFail } = vue.inject("DpzVc3Picker");
      const initItems = vue.ref(
        props2.initArr.length ? [...props2.initArr] : props2.list.map((item) => item.list?.[0]?.code ?? "")
      );
      const normal = vue.ref({});
      const shadowList = vue.computed(() => {
        return props2.list.map((item) => {
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
        () => props2.initArr,
        (val) => {
          initItems.value = val.length > 0 ? [...val] : props2.list.map((item) => item.list?.[0]?.code ?? "");
        }
      );
      function cancle() {
        pickeronFail();
      }
      function sure() {
        pickerOnOk(normal.value);
      }
      function change(target, current) {
        const index = shadowList.value.findIndex((i2) => i2.target === target);
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
  const normalPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  const normalPicker$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: normalPicker
  }, Symbol.toStringTag, { value: "Module" }));
  exports2.ActionSheet = _ActionSheet;
  exports2.Badge = _Badge;
  exports2.Card = _Card;
  exports2.Cell = _Cell;
  exports2.CellSwipe = _CellSwipe;
  exports2.CheckBox = _CheckBox;
  exports2.CheckBoxGroup = _CheckBoxGroup;
  exports2.DpButton = _DpButton;
  exports2.DpHeader = _DpzHeader;
  exports2.DpLoadMore = _DpLoadMore;
  exports2.Indicator = Indicators;
  exports2.Message = Message;
  exports2.Modal = Modal;
  exports2.Picker = _Picker;
  exports2.Popup = _Popup;
  exports2.Progress = _Progress;
  exports2.Prompt = Prompt;
  exports2.RadioBox = _RadioBox;
  exports2.RadioBoxGroup = _RadioBoxGroup;
  exports2.Rater = _Rater;
  exports2.SlideBar = _SlideBar;
  exports2.Spinner = _Spinner;
  exports2.Swipe = _Swipe;
  exports2.SwitchBar = _SwitchBar;
  exports2.Tab = _Tab;
  exports2.TextBar = _Text;
  exports2.ToTop = _ToTop;
  exports2.Upload = _Upload;
  exports2.default = Dpzvc3UI;
  exports2.install = install;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
}));
//# sourceMappingURL=dpzvc3-ui.umd.js.map
