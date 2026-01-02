const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, 'src/main.ts')
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    static: { directory: path.resolve(__dirname, 'dist-dev') },
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/template/index.ejs'),
      inject: true,
      filename: 'index.html'
    })
  ]
})
