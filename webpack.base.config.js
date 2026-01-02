const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js', // ✅ Vue 3 正确写法
      '@': path.resolve(__dirname, 'src')
      // 'dpzvc3-ui': path.resolve(__dirname, 'dist/dpzvc3.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true // 可选，提升开发编译速度
            }
            // options: {
            //   appendTsSuffixTo: [/\.vue$/] // 让 ts-loader 处理 .vue 中的 <script lang="ts">
            // }
          }],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff2?)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name].[hash:7][ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: true
    })
  ],
  devtool: 'source-map'
}
