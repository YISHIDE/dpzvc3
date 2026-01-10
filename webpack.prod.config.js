/* eslint-disable */
const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')
baseConfig.devtool = 'source-map'
process.env.NODE_ENV = 'production'

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist-prod'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '',
    clean: true
  },
   cache: {
        type: 'filesystem', // 使用磁盘缓存
        buildDependencies: {
          config: [__filename] // webpack 配置文件变化会自动失效缓存
        },
        cacheDirectory: path.resolve(__dirname, '.temp_cache'), // 自定义缓存目录
        name: 'my-webpackdistprod-cache', // 可选，为缓存命名
      },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true, drop_debugger: true }
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.ejs',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
})
