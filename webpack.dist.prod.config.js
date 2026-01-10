/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
webpackBaseConfig.devtool = 'source-map'
process.env.NODE_ENV = 'production'

module.exports = [
  // -------- UMD 输出 --------
  merge(webpackBaseConfig, {
    mode: 'production',
    entry: {
      main: path.resolve(__dirname, './src/index.ts')
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'dpzvc3.min.js',
      library: 'dpzvc3',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      clean: false
    },
    cache: {
    type: 'filesystem', // 使用磁盘缓存
    buildDependencies: {
      config: [__filename] // webpack 配置文件变化会自动失效缓存
    },
    cacheDirectory: path.resolve(__dirname, '.temp_cache'), // 自定义缓存目录
    name: 'my-webpackdistproumd-cache', // 可选，为缓存命名
  },
    externals: {
      vue: 'vue'

    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: true, drop_debugger: true },
            output: { comments: false }
          },
          extractComments: false
        })
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  }),
  merge(webpackBaseConfig, {
    mode: 'production',

    entry: {
      main: path.resolve(__dirname, './src/index.ts')
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'dpzvc3.esm.min.js', // ESM 文件
      library: {
        type: 'module' // 核心 ESM 输出
      },
      clean: false
    },
    cache: {
        type: 'filesystem', // 使用磁盘缓存
        buildDependencies: {
          config: [__filename] // webpack 配置文件变化会自动失效缓存
        },
        cacheDirectory: path.resolve(__dirname, '.temp_cache'), // 自定义缓存目录
        name: 'my-webpackdistproesm-cache', // 可选，为缓存命名
      },
    experiments: {
      outputModule: true
    },

    externals: {
      vue: 'vue'
    },

    optimization: {
      concatenateModules: false,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: true, drop_debugger: true },
            output: { comments: false }
          },
          extractComments: false
        })
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  })]
