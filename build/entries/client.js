import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Providers from './providers'
import routes from './routes'

const Root = () => (
  <Providers>
    <BrowserRouter>
      <Switch>
        {routes.map(route => <Route key={route.path} path={route.path === 'Home' ? '/' : '/'+route.path} component={route.component} />)}
      </Switch>
    </BrowserRouter>
  </Providers>
)

ReactDOM.hydrate(<Root />, document.getElementById('root'))
