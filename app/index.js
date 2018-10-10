/**

client = () => (
  <Providers>
    <Router>
      <Switch>
        {[...config.routes, ...config.src.creations.map()]}
      </Switch>
    </Router>
  </Providers>
)

ssr = () => (
  <Providers>
    <Router>
      <Switch>
        {[...config.reoutes, ...tree.views.map()]}
      </Switch>
    </Router>
  </Providers>
)
**/
