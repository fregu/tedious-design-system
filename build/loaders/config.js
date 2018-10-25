const { getOptions } = require('loader-utils');
const configTemplate = require('../templates/config')

module.exports = function() {
  const config = getOptions(this);
  const output = configTemplate(config);
  return output
}
