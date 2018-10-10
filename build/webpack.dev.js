const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const defaultConfig = require('./webpack.default')
const path = require('path')

module.exports = {...defaultConfig,
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    inline: true,
    port: 9001,
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname,'index.html')
    })
]}
