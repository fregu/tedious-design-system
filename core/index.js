
/**

server.config({
  graphql: '/graphql',
  redux: true,
  styleguide: true,
  ssl: true,
  port: process.env.PORT || 4000
})
**/
const parser = require('@tds/parser')
const build = require('@tds/build')
const server = require('@tds/server')

// const git = require('@tds/git')


module.exports = function core(dir) {
  console.log('core', dir)
  const config = parser(dir)
  return {
    tree() {
      return JSON.stringify(config, null, 2);
    },
    init() {
      console.log('init tds');
    },
    start() {
      console.log('start tds');
    },
    build() {
      build(config).build()
      console.log('build tds');
    },
    devServer() {
      build(config).devServer()
      console.log('Starting dev server');
    },
    server() {
      server(build(config).config())
      console.log('Starting server');
    },
    start() {
      server(config)
      console.log('Starting tds server');
    }
  }
}

//
// module.exports = function (dir) {
//   const config = parser(dir)
//   return {
//     start() {
//       server(config)
//     },
//     build() {
//       build(config)
//     },
//     bump(scale = 'patch') { // major/minor/patch
//       console.log('bump semver version in package.json and trigger git new tag');
//       const newVersion = exec(`npm version ${scale}`) // bump and commit with --tag
//       //git(config).tag(newVersion)
//     },
//     restart() {
//       console.log('kill process and start again')
//     }
//   }
//
//
// }
