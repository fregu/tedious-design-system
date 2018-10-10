#!/usr/bin/env node
const parser = require('@tds/parser')
const init = require('./init')
const core = require('@tds/core')

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case 'parse':
      console.log('parser', parser(process.cwd()))
      break;
    case 'init':
      init(process.cwd());
      break;
    case 'start':
      core(process.cwd()).start()
      break;
  }
} else {
  console.log('available commands...')
}
