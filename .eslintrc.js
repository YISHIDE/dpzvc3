module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser', // ✅ 必须先用 vue-eslint-parser
  parserOptions: {
    parser: '@typescript-eslint/parser', // ✅ 解析 <script lang="ts">
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'], // ✅ TS 和 Vue 插件
  extends: [
    'standard', // 你原来的风格
    'plugin:vue/recommended', // Vue 规则
    'plugin:@typescript-eslint/recommended' // TS 推荐规则
  ],
  rules: {
  // JS / 基础
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'off', // 交给 TS 处理
    camelcase: 'warn',
    'no-undef': 'error',
    eqeqeq: 'error',
    indent: ['error', 2],

    // Vue（组件库 + SSR 安全）
    'vue/no-unused-components': 'error',
    'vue/no-mutating-props': 'error',
    'vue/require-default-prop': 'warn',

    // 🚨 关键：关闭 SSR/模板冲突规则
    'vue/no-v-for-template-key': 'off',

    // 🚨 TSX / render 函数强烈建议关闭
    'vue/html-indent': 'off',

    // TS
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
