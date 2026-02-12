/**
 * index.js - Vue 3 版本
 */
import { createModalInstance } from './confirm';
import type {
  MergeOptions,
  DefaultProps,
  ModalInstance,
  globalAppContextProp,
} from './types';
declare module 'vue' {
  // export interface ElementAttrs {
  //   children?: any;
  // }
  interface ComponentCustomProperties {
    $Modal: ModalInstance;
  }
}
import type { App, AppContext } from 'vue';
import { getCurrentInstance } from 'vue';
// import { onBeforeRouteLeave } from 'vue-router'
let modalInstance: DefaultProps;
let globalAppContext: AppContext;
function getModalInstance(appContext: globalAppContextProp = null) {
  if (!modalInstance) {
    modalInstance = createModalInstance(
      {
        showHead: true,
        // closable: true,
        maskClosable: false,
        footerHide: false,
      },
      appContext
    );
  }
  return modalInstance;
}

function confirm(
  options: MergeOptions,
  appContext: globalAppContextProp = null
) {
  const instance = getModalInstance(appContext);

  options.onRemove = () => {
    modalInstance = null;
  };

  instance!.show(options);
  return instance;
}
const Modal: ModalInstance = {
  info: (props: MergeOptions) => {
    props.showCancle = true;
    props.showHead = false;
    return confirm(props, {
      appContext: globalAppContext,
    });
  },
  confirm: (props: MergeOptions) => {
    props.showCancle = false;
    props.showHead = false;
    return confirm(props, {
      appContext: globalAppContext,
    });
  },
  remove: () => {
    if (!modalInstance) return false;
    const instance = getModalInstance();
    instance!.remove();
  },
  useInit: () => {
    // console.log(getCurrentInstance(), '获取实例');
    if (getCurrentInstance() !== null) {
      globalAppContext = getCurrentInstance()!.appContext;
    }
  },
};

// onBeforeRouteLeave(() => {
//   console.log(Modal,'路由离开')
//   Modal && Modal.remove();
// })
// info 模态框，显示取消按钮
// Modal.info = function (props: MergeOptions) {
//   props.showCancle = true
//   props.showHead = false
//   return confirm(props)
// }

// confirm 模态框，不显示取消按钮
// Modal.confirm  = function (props: MergeOptions) {
//   props.showCancle = false
//   props.showHead = false
//   return confirm(props)
// }

// 移除当前 modal
// Modal.remove = function () {
//   if (!modalInstance) return false
//   const instance = getModalInstance()
//   instance!.remove()
// }
type IWithInstall<T> = T & { install(app: App): void };
const _Modal = Modal as IWithInstall<typeof Modal>;
_Modal.install = (app: App) => {
  globalAppContext = app._context;
  app.config.globalProperties[`$Modal`] = Modal;
};
export default _Modal;
