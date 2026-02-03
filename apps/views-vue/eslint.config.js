// eslint.config.js
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import vueParser from "vue-eslint-parser";
import autoImportGlobals from "./.eslintrc-auto-import.json" with { type: "json" };
import { dpzvc3Globals } from "@dpzvc3/vue/resolvers";

export default [
  { files: ["**/*.{js,ts,tsx,vue}"] },
  /* 🌍 忽略 */
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "dist-ssr/**",
      "dist-prod/**",
      ".output/**",
    ],
  },

  /* 📦 JS / TS */
  js.configs.recommended,
  ...tseslint.configs.recommended,

  /* 🖼 Vue3 Flat Config 推荐 */
  ...vue.configs["flat/recommended"],

  /* 🎨 Prettier */
  {
    plugins: { prettier },
    rules: {
      "prettier/prettier": "warn",
    },
  },

  /* 🎯 核心规则 */
  {
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2021,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...autoImportGlobals.globals,
        ...dpzvc3Globals,
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      indent: "off",
      "vue/html-indent": "off",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "eol-last": ["error", "always"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "vue/no-unused-components": "error",
      "vue/no-mutating-props": "error",
      "vue/require-default-prop": "warn",
      "vue/no-v-for-template-key": "off",
      "vue/multi-word-component-names": "off",
      "multiline-ternary": "off",
    },
  },

  // /* 🔁 overrides */
  // {
  //   files: ['**/*.{ts,tsx,vue}'],
  //   rules: {
  //     'no-unused-vars': 'off',
  //     '@typescript-eslint/no-unused-vars': ['warn'],
  //   },
  // },
];
