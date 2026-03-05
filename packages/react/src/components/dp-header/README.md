# dp-header

React implementation of the `Header` component. Props mirror the Vue version:

| prop       | type    | default | description            |
| ---------- | ------- | ------- | ---------------------- |
| modelValue | boolean | true    | visibility             |
| fixed      | boolean | true    | header is fixed at top |
| title      | string  | ''      | title text             |
| wechat     | boolean | false   | hide in WeChat UA      |

Use it like:

```tsx
<Header title="Title" fixed>
  {{
    left: <span>Back</span>,
    right: <span>Menu</span>,
  }}
</Header>
```

See the Vue implementation in `packages/vue/src/components/dp-header` for reference and review `packages/react/src/stories/Header.tsx` for examples.
