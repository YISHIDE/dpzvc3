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
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    camelcase: 'warn',
    'no-undef': 'error',
    eqeqeq: 'error',
    indent: ['error', 2],
    // Vue
    'vue/no-unused-components': 'error',
    'vue/no-mutating-props': 'error',
    'vue/require-default-prop': 'warn',
    'vue/html-indent': ['error', 2],
    // TS
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 可选：函数不强制写返回类型
    '@typescript-eslint/no-explicit-any': 'off' // 可选：允许 any，方便过渡
  }
}
