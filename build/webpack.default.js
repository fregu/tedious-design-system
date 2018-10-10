const path = require('path')
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [require('@babel/preset-env'), require("@babel/preset-react"), require("@babel/preset-flow")],
    plugins: [require('@babel/plugin-proposal-object-rest-spread')]
  }
}
module.exports = {
  resolveLoader: {
    modules: [ 'node_modules', path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'loaders') ],
    extensions: [ '.js', '.json' ],
    mainFields: [ 'loader', 'main' ]
  },
  module: {
    rules: [
      {
        test: /client-entry.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [babelLoader, 'client-loader']
      },
      {
        test: /server-entry.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [babelLoader, 'server-loader']
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [babelLoader]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import')({ skipDuplicates: true }),
                require('postcss-preset-env')({
                  features: {
                    'nesting-rules': true,
                    'custom-media-queries': true
                  }
                })
              ],
              sourceMap: true,
              ident: 'postcss'
            }
          }
        ]
      }
    ]
  }
}
