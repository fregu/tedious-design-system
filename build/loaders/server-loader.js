const { getOptions } = require('loader-utils');
const serverTemplate = require('../templates/server')

module.exports = function(source) {
  const options = getOptions(this);
  const config = JSON.parse(this.resourceQuery.slice(1) || '{}')
  const routes = config.src.constructions

  return serverTemplate(routes)
}
