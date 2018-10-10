import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
/**IMPORT_ROUTES**/

const Root = () => (
  <BrowserRouter>
    <Switch>
      /**DEFINE_ROUTES**/
    </Switch>
  </BrowserRouter>
)

ReactDOM.hydrate(<Root />, document.getElementById('root'))
