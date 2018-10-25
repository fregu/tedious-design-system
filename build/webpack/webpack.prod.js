const merge = require('webpack-merge')
const defaultConfig = require('./webpack.default.js')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

// gzip compression
const ZopfliPlugin = require('zopfli-webpack-plugin')
// br compression
const BrotliPlugin = require('brotli-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = config => ({
  ...defaultConfig({...config, mode: 'production'}),
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '..', 'entries', 'client.js'),
  output: {
    publicPath: '/public/',
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
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
    }),

    // Generate a webpack-manifest of all exported assets
    new ManifestPlugin({ fileName: 'webpack.manifest.json' }),

    // General options for loaders
    new webpack.LoaderOptionsPlugin({
      // Switch loaders to `minimize mode` where possible
      minimize: true,

      // Turn off `debug mode` where possible
      debug: false,
      options: {
        // The 'context' that our loaders will use as the root folder
        context: __dirname,

        // image-webpack-loader image crunching options
        imageWebpackLoader: {
          mozjpeg: {
            quality: 65
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          svgo: {
            plugins: [
              {
                removeViewBox: false
              },
              {
                removeEmptyAttrs: false
              }
            ]
          }
        }
      }
    }),

    // Minify and optimize CSS
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    // Compress assets into .gz files, for browsers with support
    new ZopfliPlugin(),

    // Also generate .br files, with Brotli compression-- often significantly smaller than the gzip equivalent, but not yet universally supported
    new BrotliPlugin()

    //new FaviconsWebpackPlugin('./src/assets/images/large-icon.png'),
    // new WebpackPwaManifest({
    //   name: 'Moviebox app',
    //   short_name: 'Moviebox',
    //   description: 'My awesome Progressive Web App!',
    //   theme_color: '#ffffff',
    //   display: 'standalone',
    //   background_color: '#ffffff',
    //   crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
    //   icons: [
    //     {
    //       src: path.resolve(__dirname, 'src/assets/images/large-icon.png'),
    //       sizes: [96, 114, 120, 128, 144, 152, 192, 256, 384, 512] // multiple sizes
    //     },
    //     {
    //       src: path.resolve(__dirname, 'src/assets/images/large-icon.png'),
    //       size: '1024x1024' // you can also use the specifications pattern
    //     }
    //   ],
    //   ios: true
    // }),
    // new CopyWebpackPlugin([{ from: 'src/sw.js', to: 'sw.js' }])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
})
