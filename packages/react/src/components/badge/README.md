# badge

React implementation of the `Badge` component. Props mirror those of the Vue version and are defined in `types.ts`.

Refer to the source in `packages/vue/src/components/badge` for detailed behaviour and examples.

### Props summary

| prop   | type            | default  | description                     |
| ------ | --------------- | -------- | ------------------------------- | --------- | ---------- | ----------- |
| type   | 'normal'        | 'danger' | 'warning'                       | 'success' | 'danger'   | theme color |
| size   | 'small'         | 'normal' | 'large'                         | 'normal'  | badge size |
| dot    | boolean         | false    | show dot instead of number      |
| max    | number  string | 99       | maximum value before `+` suffix |
| number | number  string |          | value to display                |

Once the logic above is ported, import this component via:

```ts
import { Badge } from '@dpzvc3/react';
```
