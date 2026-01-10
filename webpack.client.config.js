/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
baseConfig.devtool = 'source-map'
module.exports = merge(baseConfig, {
  entry: './src/entry-client.ts',
  output: {
    path: path.resolve(__dirname, 'dist-ssr/client'),
    filename: 'entry-client.js',
    module: true,
    library:{
      type: 'module'
    },
    publicPath: '/',
     clean: true
  },
   cache: {
    type: 'filesystem', // 使用磁盘缓存
    buildDependencies: {
      config: [__filename] // webpack 配置文件变化会自动失效缓存
    },
    cacheDirectory: path.resolve(__dirname, '.temp_cache'), // 自定义缓存目录
    name: 'my-webpackentryclient-cache', // 可选，为缓存命名
  },
  experiments: {
    outputModule: true
  },
  resolve: { extensions: ['.ts', '.js', '.vue', '.tsx'] },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      scriptLoading: 'module',
      inject: 'body'
    })
  ]
})