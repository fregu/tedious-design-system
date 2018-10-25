const { getOptions } = require('loader-utils');
const reducersTemplate = require('../templates/reducers')

module.exports = function(source) {
  const config = getOptions(this);
  const reducers = config.store && config.store.reducers
  const output = reducers ? reducersTemplate(reducers) : ''
  return output
}
