import React, { useEffect, useState, useMemo } from 'react';
import type { action_sheetProps, ActionItem } from './types';
import Popup from '../Popup';
import '@dpzvc3/styles/dist/components/action-sheet.css';

const prefixCls = 'dpzvc3-actionSheet';

const ActionSheet: React.FC<action_sheetProps> = (props) => {
  const {
    modelValue = false,
    items = [],
    cancleText = '取消',
    onUpdateModelValue,
  } = props;

  const [visible, setVisible] = useState<boolean>(modelValue);
  const [actions, setActions] = useState<ActionItem[]>(items);

  useEffect(() => {
    console.log('modelValue changed:', modelValue);
    setVisible(modelValue);
  }, [modelValue]);

  useEffect(() => {
    setActions(items);
  }, [items]);

  const classes = useMemo(() => prefixCls, []);
  const wrapperClasses = useMemo(() => `${prefixCls}-wrapper`, []);
  const wrapperActionClass = useMemo(() => `${prefixCls}-wrapper-action`, []);
  const cancleClass = useMemo(() => `${prefixCls}-cancle`, []);

  const emitAction = (item: ActionItem, index: number) => {
    item.onClick?.(item, index);
    handleClose();
  };

  const handleClose = () => {
    console.log('Closing ActionSheet');
    setVisible(false);
    onUpdateModelValue && onUpdateModelValue(false);
  };

  return (
    <Popup
      modelValue={visible}
      position="bottom"
      maskClosable={false}
      styles={{ background: 'transparent' }}
      onUpdateModelValue={(v) => {
        console.log('Popup visibility changed:', v);
        setVisible(v);
        onUpdateModelValue && onUpdateModelValue(v);
      }}
    >
      <div className={classes}>
        <ul className={wrapperClasses}>
          {actions.map((item, index) => (
            <li
              key={index}
              className={wrapperActionClass}
              onClick={() => emitAction(item, index)}
            >
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        {cancleText && (
          <a href="javascript:;" className={cancleClass} onClick={handleClose}>
            {cancleText}
          </a>
        )}
      </div>
      {props.children}
    </Popup>
  );
};

export type { action_sheetProps, ActionItem } from './types';
export default ActionSheet;
