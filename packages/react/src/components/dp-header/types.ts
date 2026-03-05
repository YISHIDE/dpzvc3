export interface dp_headerProps {
  modelValue?: boolean;
  fixed?: boolean;
  title?: string;
  wechat?: boolean;
  children?: React.ReactNode;
  onUpdateModelValue?: (value: boolean) => void;
}
