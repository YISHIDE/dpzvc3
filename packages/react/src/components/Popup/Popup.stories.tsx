// Popup.stories.tsx
import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';
import Popup from './index';
import type { PopupProps } from './types';

export default {
  title: 'Components/Popup',
  component: Popup,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    showMask: { control: 'boolean' },
    maskClosable: { control: 'boolean' },
    height: { control: 'text' },
    width: { control: 'text' },
  },
} as Meta<typeof Popup>;

// --------------------
// 通用模板（受控 open）
// --------------------
const Template: Story<PopupProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setOpen(true)}>Open Popup</button>
      <Popup
        {...args}
        modelValue={open}
        onUpdateModelValue={setOpen}
      >
        <div style={{ padding: 16 }}>Popup content</div>
      </Popup>
    </div>
  );
};

// --------------------
// 基础示例
// --------------------
export const Basic = Template.bind({});
Basic.args = {
  position: 'bottom',
  height: '70%',
  showMask: true,
  maskClosable: true,
};

// --------------------
// 顶部弹出
// --------------------
export const Top = Template.bind({});
Top.args = {
  position: 'top',
  height: '70%',
  showMask: true,
};

// --------------------
// 左侧弹出
// --------------------
export const Left = Template.bind({});
Left.args = {
  position: 'left',
  width: '70%',
  showMask: true,
};

// --------------------
// 右侧弹出
// --------------------
export const Right = Template.bind({});
Right.args = {
  position: 'right',
  width: '70%',
  showMask: true,
};

// --------------------
// 点击遮罩不可关闭
// --------------------
export const NoMaskClosable = Template.bind({});
NoMaskClosable.args = {
  position: 'bottom',
  height: '70%',
  showMask: true,
  maskClosable: false,
};

// --------------------
// Playground（Controls 调试）
// --------------------
export const Playground = Template.bind({});
Playground.args = {
  position: 'bottom',
  showMask: true,
  maskClosable: true,
};