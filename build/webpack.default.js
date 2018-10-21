const path = require('path')
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [require('@babel/preset-env'), require("@babel/preset-react"), require("@babel/preset-flow")],
    plugins: [require('@babel/plugin-proposal-object-rest-spread')]
  }
}
module.exports = function(config) {
  return {
    resolveLoader: {
      modules: [ 'node_modules', path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'loaders') ],
      extensions: [ '.js', '.json' ],
      mainFields: [ 'loader', 'main' ]
    },
    module: {
      rules: [
        {
          test: /entries\/routes.js$/,
          use: [
            babelLoader,
            {
              loader: 'routes-loader',
              options: config
            }
          ]
        },
        {
          test: /entries\/providers.js$/,
          use: [
            babelLoader,
            {
              loader: 'provider-loader',
              options: config
            }
          ]
        },
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
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(txt|html)/,
          loader: 'raw-loader'
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
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.(woff|woff2|(o|t)tf|eot)$/i,
          loader: 'file-loader',
          query: {
            name: 'fonts/[name].[hash].[ext]'
          }
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          exclude: /icons/,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: 'img/[name].[hash].[ext]'
              }
            },
            'image-webpack-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('svg-inline-loader'),
              options: {
                removeTags: true,
                removeSVGTagAttrs: true,
                idPrefix: 'icon'
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                /* your options here */
              }
            }
          ]
        }
      ]
    }
  }
}
