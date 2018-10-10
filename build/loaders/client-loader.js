const { getOptions } = require('loader-utils');
const clientTemplate = require('../templates/client')

module.exports = function(source) {
  const options = getOptions(this);
  const config = JSON.parse(this.resourceQuery.slice(1) || '{}')
  const routes = config.src.constructions

  return clientTemplate(routes)
}
