// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser", // ✅ Vue 文件解析器
  parserOptions: {
    parser: "@typescript-eslint/parser", // ✅ 解析 <script lang="ts">
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  extends: [
    "standard", // 原来的 JS 风格
    "plugin:vue/vue3-recommended", // Vue3 推荐规则
    "plugin:@typescript-eslint/recommended", // TS 推荐规则
    "plugin:prettier/recommended", // Prettier 集成，避免格式冲突
  ],
  rules: {
    // JS 基础规则
    "no-var": "error",
    "prefer-const": "error",
    "no-unused-vars": "off", // TS 来处理
    eqeqeq: "error",
    indent: ["error", 2],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "eol-last": ["error", "always"],

    // TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // Vue
    "vue/no-unused-components": "error",
    "vue/no-mutating-props": "error",
    "vue/require-default-prop": "warn",
    "vue/no-v-for-template-key": "off", // SSR 安全
    "vue/html-indent": ["error", 2],
    "vue/multi-word-component-names": "off", // ✅ 关闭组件必须多单词报错

    // 修复不了的规则可以关闭或 warn
    "multiline-ternary": "off", // ⚡ 三元表达式换行规则不可自动修复
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: {
        "no-unused-vars": "off", // 交给 TS 处理
        "@typescript-eslint/no-unused-vars": ["warn"],
      },
    },
  ],
  ignorePatterns: ["node_modules/", "dist/", "dist-ssr/", "dist-prod/"],
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
