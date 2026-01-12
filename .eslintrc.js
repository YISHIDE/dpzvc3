// .eslintrc.js
// .eslintrc.js
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  // ✅ Vue SFC 解析
  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "@typescript-eslint/parser", // <script lang="ts">
    ecmaVersion: 2021,
    sourceType: "module",
  },

  plugins: ["vue", "@typescript-eslint"],

  extends: [
    "standard", // JS 基础规范
    "plugin:vue/vue3-recommended", // Vue3 推荐
    "plugin:@typescript-eslint/recommended", // TS 推荐
    "plugin:prettier/recommended", // ⚡ 让 Prettier 接管格式
  ],

  rules: {
    /* =====================
     * 🚫 禁止与 Prettier 冲突的格式规则
     * ===================== */
    indent: "off",
    "vue/html-indent": "off",

    /* =====================
     * ✅ JavaScript 质量规则
     * ===================== */
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: ["error", "always"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "eol-last": ["error", "always"],

    /* =====================
     * ✅ TypeScript
     * ===================== */
    "no-unused-vars": "off", // 交给 TS
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-expressions": "off",

    /* =====================
     * ✅ Vue
     * ===================== */
    "vue/no-unused-components": "error",
    "vue/no-mutating-props": "error",
    "vue/require-default-prop": "warn",
    "vue/no-v-for-template-key": "off", // SSR 场景安全
    "vue/multi-word-component-names": "off",

    /* =====================
     * ⚠️ 无法自动修复的规则（直接关）
     * ===================== */
    "multiline-ternary": "off",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
      },
    },
  ],

  ignorePatterns: [
    "node_modules/",
    "dist/",
    "dist-ssr/",
    "dist-prod/",
    ".output/",
  ],
};
// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true,
//     es2021: true
//   },
//   parser: 'vue-eslint-parser', // ✅ 必须先用 vue-eslint-parser
//   parserOptions: {
//     parser: '@typescript-eslint/parser', // ✅ 解析 <script lang="ts">
//     ecmaVersion: 2021,
//     sourceType: 'module',
//     extraFileExtensions: ['.vue']
//   },
//   plugins: ['vue', '@typescript-eslint'], // ✅ TS 和 Vue 插件
//   extends: [
//     'eslint:recommended', // JS 内置规则
//     'plugin:vue/vue3-recommended', // Vue3 官方推荐
//     'plugin:@typescript-eslint/recommended', // TS 推荐规则
//     'standard' // 你原来的风格覆盖
//   ],
//   ignorePatterns: ['node_modules/', 'dist/', 'dist-ssr/', 'dist-prod/'],
//   rules: {
//   // JS / 基础
//     'no-var': 'error',
//     'prefer-const': 'error',
//     'no-unused-vars': 'off', // 交给 TS 处理
//     camelcase: 'warn',
//     'no-undef': 'error',
//     eqeqeq: 'error',
//     indent: ['error', 2],

//     // Vue（组件库 + SSR 安全）
//     'vue/no-unused-components': 'error',
//     'vue/no-mutating-props': 'error',
//     'vue/require-default-prop': 'warn',

//     // 🚨 关键：关闭 SSR/模板冲突规则
//     'vue/no-v-for-template-key': 'off',

//     // 🚨 TSX / render 函数强烈建议关闭
//     'vue/html-indent': 'off',

//     // TS
//     '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//     // 关闭 vue/multi-word-component-names
//     'vue/multi-word-component-names': 'off'
//   },
//   overrides: [
//     {
//       files: ['*.ts', '*.tsx', '*.vue'],
//       rules: {
//         'no-unused-vars': 'off',
//         // '@typescript-eslint/no-unused-vars': ['error'],
//         '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//         // ✅ 风格规则
//         'no-multiple-empty-lines': ['error', { max: 1 }],
//         'eol-last': ['error', 'always']
//       }
//     }
//   ]
// }
