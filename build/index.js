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
const fs = require('fs')
const requireFromString = require('require-from-string')

//import {clientAppLoader, serverAppLoader} from '@tds/app'

module.exports = function build(config) {
  const webpackConfigs = {
    development: require('./webpack/webpack.dev.js')(config),
    production: require('./webpack/webpack.prod.js')(config),
    ssr: require('./webpack/webpack.ssr.js')(config),
  }
  const mode = config.mode || 'development'


  const methods = {
    config() {
      return {...config, webpack: webpackConfigs.development}
    },
    devServer() {
      const devConfig = webpackConfigs.development
      const compiler = webpack(devConfig)
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

    ssr(memory) {
      const ssrConfig = webpackConfigs.ssr
      const ssrCompiler = webpack(ssrConfig)

      const fileSystem = memory ? new MemoryFileSystem() : fs
      if (memory) {
        ssrCompiler.outputFileSystem = fileSystem
      }

      return new Promise((resolve, reject) => {
        ssrCompiler.watch({
            aggregateTimeout: 300,
            poll: 1000,
            ignored: [/node_modules/, /dist/]
          }, (err, stats) => {
            if (err) {
              console.error(err.stack || err);
              if (err.details) {
                console.error(err.details);
              }
              return;
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
              console.error(info.errors);
            }

            if (stats.hasWarnings()) {
              console.warn(info.warnings);
            }

            const contents = fileSystem.readFileSync(
              path.resolve(ssrConfig.output.path || 'dist', ssrConfig.output.filename || 'main.js'),
              'utf8'
            )

            const html = fs.readFileSync(
              path.resolve(ssrConfig.output.path || 'dist', 'template.html'),
              'utf8'
            )

            const module = requireFromString(contents, ssrConfig.output.filename)

            resolve(module.default(config, html))
        })
      })
    },

    build(mode = 'development', memory) {
      const config = webpackConfigs[mode]
      const compiler = webpack(config)

      // const fileSystem = memory ? new MemoryFileSystem() : fs
      // compiler.outputFileSystem = fileSystem

      return new Promise((resolve, reject) => {
        compiler.watch({
            aggregateTimeout: 300,
            poll: 1000,
            ignored: [/node_modules/, /dist/]
          }, (err, stats) => {
            if (err) {
              console.error(err.stack || err);
              if (err.details) {
                console.error(err.details);
              }
              return;
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
              console.error('ERRORS:',info.errors);
            }

            if (stats.hasWarnings()) {
              console.warn('WARNINGS:', info.warnings);
            }
            if (!stats.hasErrors) {
              console.log('bundle ´finished')
            }

          resolve()
        })
      })
    },
    watch() {
      console.log('watch')
    },
  }
  return methods

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
