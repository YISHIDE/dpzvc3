import React, { useState } from 'react';
import { ActionSheet, Button } from '@dpzvc3/react';
import type { ActionItem } from '@dpzvc3/react';
import '@dpzvc3/styles/dist/components/action-sheet.css';
import '@dpzvc3/styles/dist/components/button.css';

export default {
  title: 'ActionSheet',
  component: ActionSheet,
};

export const Basic = () => {
  const [visible, setVisible] = useState(false);
  const actions: ActionItem[] = [
    { text: '提交', onClick: () => console.log('clicked submit') },
    { text: '确定' },
  ];
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <ActionSheet
        modelValue={visible}
        items={actions}
        onUpdateModelValue={setVisible}
      />
    </>
  );
};
