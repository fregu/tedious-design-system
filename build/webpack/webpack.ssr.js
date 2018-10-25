const prodConfig = require('./webpack.dev')
const path = require('path')
const defaultConfig = require('./webpack.default')

module.exports = config => {
  const common = defaultConfig(config)
  return {
    ...common,
    entry: path.resolve(__dirname, '..', 'entries', 'server.js'),
    output: {
      publicPath: '/public/',
      library: 'ssr',
      libraryTarget: 'umd', // export as importable UMD-module
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'ssr.js'
    },
    target: 'node',
    mode: 'production',
    // Use loaders from webpack-config, except css loader
    module: {
      rules: [
        ...common.module.rules.filter(rule => !'.css'.match(rule.test)),
        { test: /\.css$/, use: ['null-loader'] },
        { test: /\.html$/, use: ['raw-loader'] }
      ]
    }
  }
}
