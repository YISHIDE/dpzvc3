import React, { useState } from 'react';
import { Button, ActionSheet } from '@dpzvc3/react';
import type { ActionSheetProps, ActionItem } from '@dpzvc3/react';
import './ActionSheet.css';
// import '@dpzvc3/styles/dist/components/action-sheet.css';

const ViewActionSheet: React.FC = () => {
  const [visible, setVisible] = useState<ActionSheetProps['modelValue']>(false);
  const [actionSheet] = useState<ActionItem[]>([
    { text: '提交', onClick: () => console.log('点击了提交') },
    { text: '确定' },
  ]);

  return (
    <div className="ActionSheet">
      <Button width="50%" onClick={() => setVisible(true)}>
        打开
      </Button>
      <ActionSheet
        modelValue={visible}
        items={actionSheet}
        onUpdateModelValue={setVisible}
      />
    </div>
  );
};

export default ViewActionSheet;
