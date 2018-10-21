/**
devConfig
prodConfig
ssrConfig


compiler = (mode) => {}
devServer = (ctx, next) => {

}



<Provider>
  <Client />
</Provider>

Create clietEntryLoader and serverEntryLoader

**/
const webpack = require('webpack')
const path = require('path')
const MemoryFileSystem = require('memory-fs')
const requireFromString = require('require-from-string')

//import {clientAppLoader, serverAppLoader} from '@tds/app'

const webpackConfigPaths = {
  development: './webpack.dev.js',
  production: './webpack.prod.js',
  ssr: './webpack.ssr.js',

}
module.exports = function build(config) {
  const mode = config.mode || 'development'
  let webpackConfig = require(webpackConfigPaths[mode])
  const devConfig = {...webpackConfig(config), mode}//, mode, entry: path.resolve(__dirname, 'entries', 'client.js') + '?' + JSON.stringify(config), stats: 'verbose'}

  const compiler = webpack([
    devConfig
    //{...webpackConfig['ssr'], entry: './server.js'},
  ])
  return {
    config() {
      return {...config, webpack: devConfig}
    },
    devServer() {
      const webpackDevServer = require('webpack-dev-server');
      const devServerOptions = Object.assign({}, webpackConfig.devServer, {
        stats: {
          colors: true
        },
        contentBase: './dist',
        hot: true,
        host: 'localhost'
      });
      webpackDevServer.addDevServerEntrypoints(devConfig, devServerOptions);
      const server = new webpackDevServer(compiler, devServerOptions);
      const port = devServerOptions.port || 9000
      server.listen(port, '127.0.0.1', () => {
        console.log('Starting server on http://localhost:'+port);
      });
    },
    memory() {
      const memoryFs = new MemoryFileSystem()

      // Define file system to be in memory for compiler instead
      compiler.outputFileSystem = memoryFs

      return new Promise((resolve, reject) => {
        // Start the compiler and require the file from memory
        compiler.run((err, stats) => {
          if (err) {
            console.log('compiler error', err)
            throw err
          }

          const contents = memoryFs.readFileSync(
            path.resolve(webpackConfig.output.path || 'dist', ssrConfig.output.filename || 'main.js'),
            'utf8'
          )

          const module = requireFromString(contents, webpackConfig.output.filename || 'main.js')

          resolve(module.default || module)
        })
      })
    },
    build() {
      compiler.run((err, stats) => {
        if (err) {
          console.log('compiler error', err)
          throw err
        }
        console.log('success?', stats.toJson('verbose'))
      })
    },
    watch() {},
  }

  // if (options.memory) {
    // const memoryFs = new MemoryFileSystem()
    // //ServerCompiler.inputFileSystem = memoryFs
    //
    // // Define file system to be in memory for compiler instead
    // ServerCompiler.outputFileSystem = memoryFs
    //
    // return new Promise((resolve, reject) => {
    //   // Start the compiler and require the file from memory
    //   ServerCompiler.run((err, stats) => {
    //     if (err) {
    //       console.log('compiler error', err)
    //       throw err
    //     }
    //
    //     const contents = memoryFs.readFileSync(
    //       path.resolve(ssrConfig.output.path, ssrConfig.output.filename),
    //       'utf8'
    //     )
    //
    //     const module = requireFromString(contents, ssrConfig.output.filename)
    //
    //     // Use SSR from memory-fs
    //     resolve(module.default)
    //   })
  //   })
}
