const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const defaultConfig = require('./webpack.default')
const path = require('path')

module.exports = function(config) {
  return {...defaultConfig(config),
    entry: path.resolve(__dirname, 'entries', 'client.js'),
    mode: 'development',
    // devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      inline: true,
      publicPath: '/',
      historyApiFallback: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'index.html')
      })
  ]}
}
