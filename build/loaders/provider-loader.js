const { getOptions } = require('loader-utils');
const providerTemplate = require('../templates/providers')

module.exports = function(source) {
  const config = getOptions(this);
  const reducers = config.store && config.store.reducers || []
  const middlewares = config.store && config.store.middlewares || []
  const { graphql } = config
  const output = providerTemplate({reducers, middlewares, graphql});

  return output
}
