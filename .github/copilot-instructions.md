# Copilot Instructions for dpzvc3 monorepo

This repository is a pnpm-based monorepo that contains a UI component library and several demo apps. AI agents should understand the structure, build workflow and coding patterns before making changes.

## Big picture

- **packages/** hosts all packages that are published or consumed by apps.

  - `vue/` contains a Vue 3 component library (`@dpzvc3/vue`). Each component lives in `src/components/<name>`. Components are written in TSX + composition API with `defineComponent`. Types are defined in sibling `types.ts`. Many components export an `install` helper for Vue plugin registration; the `index.ts` just wraps the component.
  - `react/` contains a React counterpart (`@dpzvc3/react`). It currently includes Button, Cell, Popup and Spinner but now has skeleton directories for all other components. The pattern is:
    - `src/components/<name>/index.tsx`: a `React.FC` component with a `prefixCls` constant and placeholder `TODO` comment; imports associated CSS from `@dpzvc3/styles`.
    - `src/components/<name>/types.ts`: props interface stub (children only until ported).
    - `src/components/<name>/README.md`: notes pointing to the Vue implementation and reminding to port logic.
  - `styles/` contains the shared LESS/CSS utilities and component styles. After build the compiled CSS lives under `dist/components/*.css` which both Vue and React packages reference.

- **apps/** holds several demo applications that consume the libraries:

  - `views-vue/` – Vue 3 SPA with router and lazy-loaded views for each component. Example view: `src/views/ViewButton.vue` imports `@dpzvc3/vue/es/dp-button` and demonstrates props/slots.
  - `views-react/` – React SPA using `react-router-dom` and `react-transition-group`. Views live under `src/views`; `Guide.tsx` builds the component list, and we recently added `Button.tsx` showing the React Button with the same items as the Vue version.
  - `uniapp-vue3/` – Uni-app project for mobile (less relevant to AI agents unless editing shared code).

- The repository uses **pnpm workspaces** (`pnpm-workspace.yaml`) and each package/app has its own `package.json`. Common commands use filters, e.g., `pnpm --filter=@dpzvc3/react build`.

## Developer workflows

- **Building packages**

  - Run `pnpm` at the repo root to install.
  - Build all packages with `pnpm build`. For targeting one package use `pnpm --filter=<pkg> build`.
  - Vue package uses Vite to build library outputs (ESM/CJS/UMD) and dts. React package is also built via Vite.
  - Style package compiles LESS into `dist` and exposes `index.css`.

- **Running apps**

  - Navigate to the desired app folder (`apps/views-vue`, `apps/views-react`, etc.) and run `pnpm dev`.
  - Each app imports the local packages via workspace protocol (`@dpzvc3/vue` or `@dpzvc3/react`).

- **Adding or porting components**

  1. Copy the Vue component folder under `packages/vue/src/components` as a reference.
  2. In `packages/react/src/components`, either use the existing skeleton or create a new directory: `mkdir -p <name>`.
  3. Implement a `React.FC` with identical props and classnames; props interfaces should mirror those in the Vue `types.ts` but use React style (`React.CSSProperties`, `React.ReactNode`, event handlers receive `MouseEvent`, etc.).
  4. Add import for the corresponding CSS: `import '@dpzvc3/styles/dist/components/<name>.css';`.
  5. Update app views (e.g., `apps/views-react/src/views/<Name>.tsx`) to demonstrate the component. Look at `ViewButton.vue` and `Button.tsx` for patterns.
  6. Add an export for the component in `packages/react/src/index.ts` so it’s available to apps (`export { default as Foo } from './components/foo';`).
  7. Once the component is functional, update its `README.md` in the react package with prop descriptions and sample usage. Also add a Storybook story under `packages/react/src/stories` so the component can be previewed in isolation.

- **Testing & stories**

  - Storybook is configured inside packages/react (`*.stories.tsx` files). Use `pnpm --filter=@dpzvc3/react storybook` if available.

- **Linting & formatting**
  - Each package uses ESLint/TypeScript. Use `pnpm lint` or run `pnpm -r lint` from root.

## Project-specific conventions

- **Classnames** follow the prefix `dpzvc3-<component>` and combine modifiers via computed arrays in Vue or `useMemo` in React.
- Props often include `type`, `loading`, `disabled`, sizing options etc. Many components support manual slot/children placement (`left`, `right` slots in Vue become props in React).
- Component directories include a `README.md` listing props/slots/events – use these as source of truth when porting.

## Integration points

- `@dpzvc3/styles` is a peer dependency for both UI libraries. When building the React or Vue package, CSS imports point to the built `dist/components` files.
- Apps reference packages via workspace aliases; no external registry is required during local development.

## Tips for AI agents

- Always look at the Vue version when implementing or modifying React components – the logic is nearly identical aside from framework APIs.
- When editing `types.ts` files, keep them minimal; avoid free‑form comments that break the TypeScript parser.
- After making changes to a package, rebuild with the appropriate filter and check for type errors. The `pnpm build` output often shows which file is failing.
- For new components, add a demo view in both `views-vue` and `views-react` so cross‑platform parity is easy to verify.

> ⚠️ **Note**: This instructions file is generated automatically. Update it as the project evolves or when new patterns appear.
