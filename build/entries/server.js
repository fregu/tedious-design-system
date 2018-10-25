import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'

//import config from '../loaders/config'
import routes from '../loaders/routes'

import { Provider as ReduxProvider } from 'react-redux'
import createStore from '@tds/store'
import * as reducers from '../loaders/reducers'
import * as middlewares from '../loaders/middlewares'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import fetch from 'node-fetch'

import htmlTemplate from './htmlTemplate'

export default  (config, html) => async (ctx, next) => {
  const { graphql = {}, redux = {}, context = {} } = config

  const apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: graphql.endpoint,
      fetch,
      headers: graphql.token ? { authorization: `Bearer ${graphql.token}` } : {}
    }),

    cache: new InMemoryCache(),
    ssrMode: true
  })

  const store = createStore(
    {...(redux.state || {})},
    {
      reducers: {...reducers},
      middlewares: [...Object.values(middlewares)]
    }
  )


  const Root = (
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <StaticRouter location={ctx.originalUrl} context={ctx}>
          <Switch>
            {routes.map(route => <Route key={route.path} path={route.path === 'Home' ? '/' : '/'+route.path} component={route.component} />)}
          </Switch>
        </StaticRouter>
      </ApolloProvider>
    </ReduxProvider>
  )

  await renderToStringWithData(Root)

  const reactDom = renderToString(Root)
  const reduxState = store.getState()
  const apolloState = apolloClient.extract()
  const helmetData = Helmet.renderStatic()

  ctx.type = 'text/html; charset=utf-8'
  ctx.status = 200

  // call template to render the HTML document
  ctx.body = htmlTemplate(html, {
    reactDom,
    reduxState,
    apolloState,
    helmetData,
    graphqlUrl: graphql.endpoint
  })
}
