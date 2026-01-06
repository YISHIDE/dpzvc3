/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const nodeExternals = require('webpack-node-externals')
module.exports = merge(baseConfig, {
  entry: './src/entry-server.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist-ssr/server'),
    filename: 'entry-server.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  resolve: { extensions: ['.ts', '.js', '.vue', '.tsx'] },
    plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.SSR': JSON.stringify(true)
    // })
  ]
})