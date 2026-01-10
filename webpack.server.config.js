/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const nodeExternals = require('webpack-node-externals')
baseConfig.devtool = 'source-map'
module.exports = merge(baseConfig, {
  entry: './src/entry-server.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist-ssr/server'),
    filename: 'entry-server.js',
    libraryTarget: 'commonjs2'
  },
   cache: {
    type: 'filesystem', // 使用磁盘缓存
    buildDependencies: {
      config: [__filename] // webpack 配置文件变化会自动失效缓存
    },
    cacheDirectory: path.resolve(__dirname, '.temp_cache'), // 自定义缓存目录
    name: 'my-webpackentryserver-cache', // 可选，为缓存命名
  },
  externals: [nodeExternals()],
  resolve: { extensions: ['.ts', '.js', '.vue', '.tsx'] },
    plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.SSR': JSON.stringify(true)
    // })
  ]
})