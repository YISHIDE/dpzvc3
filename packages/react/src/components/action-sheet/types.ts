export type ActionItem = {
  text: string;
  onClick?: (item: ActionItem, index: number) => void;
};

export interface action_sheetProps {
  modelValue?: boolean;
  items?: ActionItem[];
  cancleText?: string;
  children?: React.ReactNode;
  onUpdateModelValue?: (value: boolean) => void;
}
