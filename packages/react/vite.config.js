import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
    exclude: [
      'src/**/*.stories.*',
      'src/stories/**',
      'src/**/*.test.*',
      'src/**/__tests__/**'
    ]
  }) // 自动生成类型声明文件（排除 story/test 文件）
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'dpzvc3React',
      fileName: format => `dpzvc3-react.${format}.js`
    },
    rollupOptions: {
      // Externalize packages and any sub-path imports (including CSS paths)
      // Also mark all local `.css` imports external so styles are not bundled into the library.
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^react-router-dom($|\/)/, /^@dpzvc3\/styles($|\/)*/, /\.css$/],
      // 不打包 React
      output: {
          globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          '@dpzvc3/styles': 'DPZVC3Styles'
        }
      }
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});