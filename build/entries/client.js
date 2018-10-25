import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from '@tds/store'
import config from '../loaders/config'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from '../loaders/routes'
import * as reducers from '../loaders/reducers'
import * as middlewares from '../loaders/middlewares'

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const {graphql = {}, redux = {}} = config
const client = new ApolloClient({
  uri: graphql.endpoint,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__ || {}),
  headers: graphql.token ? { authorization: `Bearer ${graphql.token}` } : {}
})

const store = createStore(
  {...(redux.state || {}), ...(typeof window !== 'undefined' && window.__REDUX_STATE__ || {})},
  {
    reducers: {...reducers},
    middlewares: [...Object.values(middlewares)]
  }
)

const Root = () => (
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          {routes.map(route => <Route key={route.path} path={route.path === 'Home' ? '/' : '/'+route.path} component={route.component} />)}
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </ReduxProvider>
)

ReactDOM.hydrate(<Root />, document.getElementById('root'))
