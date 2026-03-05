import React from 'react';
import { Header } from '@dpzvc3/react';
import '@dpzvc3/styles/dist/components/dp-header.css';

export default {
  title: 'Header',
  component: Header,
};

export const Basic = () => (
  <Header title="页面标题" fixed>
    {{
      left: <span style={{ color: '#fff' }}>返回</span>,
      right: <span style={{ color: '#fff' }}>菜单</span>,
    }}
  </Header>
);
