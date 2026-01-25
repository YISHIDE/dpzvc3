export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75,       // 设计稿基准
      propList: ['*'],    // 转换所有属性
      unitPrecision: 5,   // rem 小数精度
      selectorBlackList: [], // 不转换的选择器
      replace: true,
      mediaQuery: false,  // 是否转换媒体查询
      minPixelValue: 1    // 小于 1px 不转换
    }
  }
}