const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')

process.env.NODE_ENV = 'production'

module.exports = [merge(webpackBaseConfig, {
  mode: 'production',

  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'dpzvc3.js',
    library: 'dpzvc3',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    clean: false // webpack5 新增，每次构建清理旧文件
  },

  externals: {
    vue: 'vue'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  // Webpack 5 建议禁用多余 optimization，因为是库打包
  optimization: {
    minimize: false // 开发库打包通常不压缩
  }
}),
merge(webpackBaseConfig, {
  mode: 'production',

  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'dpzvc3.esm.js', // 改名，标识 ESM
    library: {
      type: 'module' // ✅ 核心改动
    },
    clean: false
  },

  experiments: {
    outputModule: true // ✅ 必须
  },

  externals: {
    vue: 'vue'

  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  optimization: {
    concatenateModules: false,
    minimize: false
  }
})]
