const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')

process.env.NODE_ENV = 'production'

module.exports = [
  // -------- UMD 输出 --------
  merge(webpackBaseConfig, {
    mode: 'production',
    entry: {
      main: path.resolve(__dirname, './src/index.js')
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'dpzvc3.min.js',
      library: 'dpzvc3',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      clean: false
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
      main: path.resolve(__dirname, './src/index.js')
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'dpzvc3.esm.min.js', // ESM 文件
      library: {
        type: 'module' // 核心 ESM 输出
      },
      clean: false
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
