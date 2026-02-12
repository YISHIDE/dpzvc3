/**
 * confirm.js - Vue 3 版本（修复 enter 过渡）
 */
import { h, createVNode, render, getCurrentInstance } from 'vue';
import Modal from './modal';
import VButton from '../dp-button';
import type { globalAppContextProp } from './types';
const prefixCls = 'dpzvc3-modal';

function createModalInstance(
  properties = {},
  appContext: globalAppContextProp = null
) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  let vnode = null;

  const defaultProps = {
    // visible: false,
    modelValue: false,
    width: '70%',
    body: '',
    title: '',
    okText: '确定',
    cancleText: '取消',
    loading: false,
    buttonLoading: false,
    showCancle: true,
    showHead: true,
    onOk: () => {},
    onCancle: () => {},
    onRemove: () => {},
  };

  const props = { ...defaultProps, ...properties };

  const updateVNode = () => {
    const footer = [
      props.showCancle
        ? h(
            VButton,
            { type: 'primary', radius: false, onClick: cancle },
            () => props.cancleText
          )
        : null,
      h(
        VButton,
        {
          type: 'normal',
          radius: false,
          loading: props.buttonLoading,
          onClick: ok,
        },
        () => props.okText
      ),
    ];

    vnode = createVNode(
      Modal,
      {
        modelValue: props.modelValue,
        width: props.width,
        showHead: props.showHead,
        footerHide: false,
        onOk: ok,
        onCancle: cancle,
        onRemove: remove,
      },
      {
        header: () =>
          h('div', {
            class: `${prefixCls}-header-inner ellipse-fir`,
            innerHTML: props.title,
          }),
        body: () =>
          h('div', {
            class: `${prefixCls}-body-inner`,
            innerHTML: props.body,
          }),
        footer: () => footer,
      }
    );
    // const appInstance = getCurrentInstance();
    // console.log(appInstance, 'adddadadsaddas');
    if (appContext !== null) {
      // console.log(appContext, 'Modal的appContext');
      vnode.appContext = appContext.appContext;
    }
    render(vnode, container);
  };

  const remove = () => {
    console.log('debug');
    props.modelValue = false;
    updateVNode();
    setTimeout(destroy, 300);
  };

  const destroy = () => {
    render(null, container);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    container.parentNode && container.parentNode.removeChild(container);
    props.onRemove();
  };

  const ok = () => {
    if (props.loading) {
      props.buttonLoading = true;
    } else {
      remove();
    }
    props.onOk();
  };

  const cancle = () => {
    remove();
    props.onCancle();
  };

  return {
    show(newProps = {}) {
      Object.assign(props, newProps);

      // 👇 关键：先 render hidden
      props.modelValue = false;
      updateVNode();

      // 👇 下一帧再显示，触发 enter
      requestAnimationFrame(() => {
        props.modelValue = true;
        updateVNode();
      });
    },
    remove,
    component: props,
  };
}
// const ModalMethods:ModalInstance = {
//   newInstance: createModalInstance,
// }
export { createModalInstance };
