module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 忽略未使用的参数，通常 Vue 回调函数第一个参数未使用
    camelcase: 'warn',
    'no-undef': 'error',
    eqeqeq: 'error',
    indent: ['error', 2],
    // Vue
    'vue/no-unused-components': 'error',
    'vue/no-mutating-props': 'error',
    'vue/require-default-prop': 'warn', // 可选：未传 props 时提醒
    'vue/html-indent': ['error', 2] // Vue 模板缩进
  }
}
