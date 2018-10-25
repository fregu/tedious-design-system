const webpack = require('webpack')
const defaultConfig = require('./webpack.default')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = config => ({
    ...defaultConfig({...config, mode: 'development'}),
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, '..', 'entries', 'client.js'),
    output: {
      publicPath: '/public/',
      path: path.resolve(process.cwd(), 'dist'),
      filename: '[name].bundle.js'
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      inline: true,
      publicPath: '/',
      historyApiFallback: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),

      // Delete dist folder before every build
      new CleanWebpackPlugin('dist', { dry: true }),

      // Export html-file to dist/template.html
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '..', 'index.html'),
        filename: './template.html'
      })
    ]
})
