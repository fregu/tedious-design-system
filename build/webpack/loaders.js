const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [require('@babel/preset-env'), require("@babel/preset-react"), require("@babel/preset-flow")],
    plugins: [require('@babel/plugin-proposal-object-rest-spread'), require('@babel/plugin-transform-runtime')]
  }
}

module.exports = config => ([
  {
    test: /loaders\/config.js$/,
    use: [
      babelLoader,
      {
        loader: 'config',
        options: config
      }
    ]
  },
  {
    test: /loaders\/routes.js$/,
    use: [
      babelLoader,
      {
        loader: 'routes',
        options: config
      }
    ]
  },
  {
    test: /loaders\/reducers.js$/,
    use: [
      babelLoader,
      {
        loader: 'reducers',
        options: config
      }
    ]
  },
  {
    test: /loaders\/middlewares.js$/,
    use: [
      babelLoader,
      {
        loader: 'middlewares',
        options: config
      }
    ]
  }
])
