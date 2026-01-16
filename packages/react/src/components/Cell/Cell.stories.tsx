// Cell.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import Cell, { CellProps } from './index';

export default {
  title: 'Components/Cell',
  component: Cell,
  argTypes: {
    title: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta<typeof Cell>;

// --------------------
// 基础示例
// --------------------
const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: '用户名',
  label: '必填',
  value: '张三',
};

// --------------------
// 带自定义内容的示例
// --------------------
export const CustomContent: Story<CellProps> = (args) => (
  <Cell {...args}>
    <span style={{ color: 'red' }}>这是自定义 children 内容</span>
  </Cell>
);

CustomContent.args = {
  title: '备注',
  label: '选填',
  value: '',
};

// --------------------
// 多个 Cell 组合示例
// --------------------
export const MultipleCells = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Cell title="用户名" label="必填" value="张三" />
    <Cell title="手机号" label="选填" value="13812345678" />
    <Cell title="邮箱" value="example@mail.com" />
  </div>
);