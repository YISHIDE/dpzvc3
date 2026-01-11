/**
 * Indicator - Vue 3 版本
 */
import { createVNode, render } from "vue";
import Indicator from "./Indicator";
import type { IndicatorProps, IndicatorInstance } from "./types";
type containerE = HTMLElement | null;
let instance: any = null;

let container: containerE;

function createInstance(props = {}) {
  container = document.createElement("div");
  document.body.appendChild(container);

  const defaultProps = {
    size: 45,
    type: "snake",
    color: "#ffffff",
    text: "加载中...",
    visible: false,
    ...props,
  };
  const vnode = createVNode(Indicator, {
    ...defaultProps,
    onRemove: destroyInstance,
  });
  render(vnode, container);
  instance = vnode.component;
  return instance;
}

function destroyInstance() {
  if (!instance || !container) return;
  render(null, container);
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
  instance = null;
  container = null;
}

function open(options: IndicatorProps) {
  if (!instance) {
    createInstance(options);
  }

  // 更新 props
  if (instance) {
    Object.keys(options).forEach((key) => {
      instance.props[key] = options[key as keyof IndicatorProps];
    });
    instance.props.modelValue = true;
  }
}

function close() {
  if (!instance) return;
  instance.props.modelValue = false;
  destroyInstance();
}

/* ================== 对外 API ================== */

// Indicator.open = open
// Indicator.remove = close

// Indicator.snake = function (props:IndicatorProps) {
//   props.type = 'snake'
//   open(props)
// }

// Indicator.blade = function (props:IndicatorProps) {
//   props.type = 'blade'
//   open(props)
// }

// Indicator.circle = function (props:IndicatorProps) {
//   props.type = 'fading-circle'
//   open(props)
// }

// Indicator.bounce = function (props:IndicatorProps) {
//   props.type = 'double-bounce'
//   open(props)
// }
// export default Indicator

const Indicators: IndicatorInstance = {
  open,
  remove: close,
  snake: (props: IndicatorProps = {}) => {
    props.type = "snake";
    open(props);
  },
  blade: (props: IndicatorProps = {}) => {
    props.type = "blade";
    open(props);
  },
  circle: (props: IndicatorProps = {}) => {
    props.type = "fading-circle";
    open(props);
  },
  bounce: (props: IndicatorProps = {}) => {
    props.type = "double-bounce";
    open(props);
  },
};

export default Indicators;
