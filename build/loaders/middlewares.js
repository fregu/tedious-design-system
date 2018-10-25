const { getOptions } = require('loader-utils');
const middlewaresTemplate = require('../templates/middlewares')

module.exports = function(source) {
  const config = getOptions(this);
  const middlewares = config.store && config.store.middlewares
  const output = middlewares ? middlewaresTemplate(middlewares) : ''
  return output
}
