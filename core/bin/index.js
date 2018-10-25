#!/usr/bin/env node
const Core = require('../index.js');

if (process.argv.length > 2) {
  const command = process.argv[2];
  const specifier = process.argv[3] && !process.argv[3].match(/^-/) && process.argv[3]
  const flags = process.argv.filter(arg => arg.match(/^-/)).map(arg => arg.replace(/^--?/, ''))

  const tds = new Core(process.cwd())
  switch (command) {
    case 'parse':
      console.log('parser', tds.tree())
      break;
    case 'init':
      tds.init()
      break;
    case 'start':
      tds.start()
      break;

    case 'build':
      tds.build()
      break;

    case 'dev-server':
      tds.devServer()
      break;

    case 'server':
      tds.server()
      break;
  }
} else {
  console.log('available commands...')
}
