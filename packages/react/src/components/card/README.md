# Card

React port of the `dpzvc3-card` component.

**Props**

- `width?: string` – card width, defaults to `100%`.
- `header?: React.ReactNode` – content displayed in the header area.
- `footer?: React.ReactNode` – content displayed in the footer area.
- `children?: React.ReactNode` – main body content.

Usage example:

```tsx
import { Card } from '@dpzvc3/react';

<Card width="90%" header={<div>Header</div>} footer={<div>Footer</div>}>
  Body content
</Card>;
```

See the Vue implementation for additional details: `packages/vue/src/components/card`.
