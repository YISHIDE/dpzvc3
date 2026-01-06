/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
module.exports = merge(baseConfig, {
  entry: './src/entry-client.ts',
  output: {
    path: path.resolve(__dirname, 'dist-ssr/client'),
    filename: 'entry-client.js',
    publicPath: '/',
     clean: true
  },
  resolve: { extensions: ['.ts', '.js', '.vue', '.tsx'] },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
    })
  ]
})