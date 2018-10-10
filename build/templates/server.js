module.exports = (routes) => `import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, Switch, Route } from 'react-router'

${routes.map(route => `import ${route.name} from '${route.path}'
`)}

const Root = () => (
  <StaticRouter context={}>
    <Switch>
      ${routes.map(route => `<Route path="/${route.name}" component={${route.name}} />
      `)}
    </Switch>
  </StaticRouter>
)

ReactDOMServer.renderToString(<Root />)
`
