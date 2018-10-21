/**
const app = koa()
app.use(cors())

app.use('/graphql', apolloServer(schema))

app.use('/login', passport.init())
app.use('/auth-callback', passport())

app.use('/api', api(fileTree))

app.use('/sandbox', sandbox(fileTree))
app.use('/styleguide', styleguide(fileTree))

app.use(webpackDevMiddleware(App.client())
app.use(App.ssr())


**/
const Koa = require('koa')
// const https = require('https')
const cors = require('koa-cors')
const websockify = require('koa-websocket')
// const apolloServer = require('koa-apollo-server')

// const graphql = require('@tds/graphql')
// const api = require('@tds/api')
// const styleguide = require('@tds/styleguide')
// const cms = require('@tds/cms')
// const provider = require('@tds/provider')
// const ssr = require('@tds/app')

const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const historyFallback = require('koa2-history-api-fallback')

module.exports = function server(config) {
  console.log('server', config)
  //const app = new Koa();
  const app = websockify(new Koa());
  app.use(cors())
  app.use(historyFallback())
  const compiler = webpack([config.webpack])

  // trigger webpack build on each startup

  //app.ws.use(api.socketHandler)

  // if (config.enableGraphql && config.graphql.schema) {
  //   app.use(config.graphqlEndpoint || '/graphql', apolloServer(config.graphql.schema))
  // }

  //if (config.mode === 'development') {
    app.use(webpackDevMiddleware(compiler))
    app.use(require("koa-webpack-hot-middleware")(compiler));
  //}

  // app.use('/api', api(config))
  // app.use('/styleguide', styleguide(config))
  // app.use(provider.server(app.server))

  //
  // if (config.enableSSL && config.mode === 'development') {
  //   const server = https(app)
  //   server.listen(config.env.sslPort || 1001)
  // }

  app.listen(config.env && config.env.port || 1000)
}
