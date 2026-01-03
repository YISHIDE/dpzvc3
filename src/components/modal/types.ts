// src/components/modal/types.ts
export type ModalProps ={
  modelValue?: boolean
  maskClosable?: boolean
  title?: string
  width?: string
  okText?: string
  cancleText?: string
  loading?: boolean
  styles?: Record<string, any>
  showHead?: boolean
  footerHide?: boolean
  body?: string
}
// modal函数调用 传参数与modal props类型声明合并
export type MergeOptions<T = ModalProps> = {
    [K in keyof T]: T[K]
} & {
    onOk?: () => void
    onCancle?: () => void
    onRemove?: () => void
    showCancle?: boolean,
    buttonLoading?: boolean,
}

// modal实例
export type ModalInstance = {
  confirm: (options: MergeOptions) => DefaultProps
  remove: () => void,
  info: (props: MergeOptions) => DefaultProps
}
//开启
export type DefaultProps = {
    show: (options: MergeOptions) => any,
    remove: () => void,
    component:  MergeOptions
} | null
//  visible: false,
//     modelValue: false,
//     width: '70%',
//     body: '',
//     title: '',
//     okText: '确定',
//     cancleText: '取消',
//     loading: false,
//     buttonLoading: false,
//     showCancle: true,
//     showHead: true,
//     onOk: () => {},
//     onCancle: () => {},
//     onRemove: () => {}