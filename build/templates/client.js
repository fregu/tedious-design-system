module.exports = (routes) => `import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
${routes.map(route => `import ${route.name} from '${route.path}'
`).join('')}

const Root = () => (
  <BrowserRouter>
    <Switch>
      ${routes.map(route => `<Route path="/${route.name !== 'Home' ? route.name : ''}" component={${route.name}} />
      `).join('')}
    </Switch>
  </BrowserRouter>
)

ReactDOM.hydrate(<Root />, document.getElementById('root'))
`
