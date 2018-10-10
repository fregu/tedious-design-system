/**
  const tree = parseTree(__dirname)

  return flatMap(parseTree).map(extendComponent)
**/
const fs = require('fs')
const parseTree = require('directory-tree')
const ignoreFiles = ['dist', 'node_modules']
const watchFiles = [
  {
    type: 'file',
    test: /tds.config.json/,
    resolve(item, config) {
      const object = require(item.path)
      Object.keys(object).forEach(key => {
        config[key] = object[key]
      })
      return config;
    }
  },
  {
    type: 'file',
    test: /babelrc/,
    resolve(item, config) {
      config.babelrc = item.path
    }
  },
  {
    type: 'file',
    test: /webpack.config.js/,
    resolve(item, config) {
      config.webpack = item.path
    }
  },
  {
    type: 'directory',
    test: /^components|bricks$/i,
    resolve(item, config) {
      config.paths.bricks = item.path
      config.src.bricks = [...(config.src.bricks||[]), ...parseComponents(item.children, config)]
    }
  },
  {
    type: 'directory',
    test: /^containers|modeules|kits$/i,
    resolve(item, config) {
      config.paths.kits = item.path
      config.src.kits = [...(config.src.kits||[]), ...parseComponents(item.children, config)]
    }
  },
  {
    type: 'directory',
    test: /^views|pages|constructions$/i,
    resolve(item, config) {
      config.paths.constructions = item.path
      config.src.constructions = [...(config.src.constructions||[]), ...parseComponents(item.children, config)]
    }
  },
  {
    type: 'directory',
    test: /^patterns|base|instructions$/i,
    resolve(item, config) {
      config.paths.instructions = item.path
      config.src.instructions = [...(config.src.instructions||[]), ...parseComponents(item.children, config)]
    }
  },
  {
    type: 'directory',
    test: /^layouts?|plates$/i,
    resolve(item, config) {
      config.paths.plates = item.path
      config.src.plates = [...(config.src.plates||[]), ...parseComponents(item.children, config)]
    }
  }
]

const defaultConfig = { src: {}, paths: {}}

function parseComponents(components = [], config) {
  return components.map((item) => {
    if (item.children) {
      return item.children.reduce((component, subItem) => {
        if (subItem.type === 'file') {
          // Component has script component file
          if (subItem.name.match(new RegExp(`^(index|main|${item.name}).(jsx?|ts)$`))) {
            component.filePath = subItem.path
            component.name = item.name
            component.path = item.path
          }
          const content = fs.readFileSync(subItem.path).toString()
          component.files = [...(component.files||[]), {...subItem, content}]

        } else if (subItem.type === 'directory') {
          component.children = parseComponents(subItem.children, config)
        }
        return component
      }, {})
    } else if (item.type === 'file') {
      const content = fs.readFileSync(item.path).toString()
      return {...item, content}
    }
  })
}
function parseItems(items = [], config) {
  return items.forEach(item => {
    if (!ignoreFiles.includes(item.name)){
      const watchFile = watchFiles.find(watchCase => (!watchCase.type || watchCase.type === item.type) && watchCase.test.test(item.name))
      if (watchFile) {
        watchFile.resolve(item, config)
      } else if (item.children) {

        parseItems(item.children, config)
      }
    }
  })
}
module.exports = function(dir) {
  const tree = parseTree(dir)
  const config = {name: tree.name, path: tree.path, ...(defaultConfig || {}) }
  parseItems(tree.children, config)

  return config
  // get TDS config tds.config.js
  // files to add to config [.git/config .babelrc, webpack.config.js, flowconfig.js, \.?eslintrc(.js(on))?]


  // const config = {
  //   path: process.cwd(),
  //   title: "Example",
  //   description: "lorem ipsum",
  //   theme: "#ffffff",
  //   icon: undefined,
  //   offlineCapable: true,
  //   enableSSL: true,
  //   authentication: false,
  //   styleguide: true,
  //   remotes: [],
  //   enableGraphql: true,
  //   enableRedux: true,
  //   enableSSR: true,
  //   enableCMS: true,
  //   root: 'src/index.js',
  //   routes: {
  //     '/': 'src/views/HomeView',
  //     '/about/:id?': 'src/views/AboutView'
  //   },
  //   prettier: {},
  //   eslint: {},
  //   babel: {},
  //   postcss: {},
  //   webpack: {},
  //   graphql: {
  //     queries: [],
  //     mutations: [],
  //     schema: {},
  //     types: [],
  //     resolvers: {}
  //   },
  //   store: {
  //     actions: [],
  //     reducers: [],
  //     middlewares: []
  //   },
  //   paths: {
  //     guides: 'docs',
  //     instructions: 'src/base',
  //     bricks: 'src/components',
  //     kits: 'src/containers',
  //     creations: 'src/views',
  //     plates: 'src/layouts',
  //     tools: 'src/helpers',
  //   },
  //   src: {
  //     assets: [],       // src/static       || src/assets
  //     instructions: [], // src/instructions || src/base
  //     bricks: [{
  //       docs: '',
  //       tests: [],
  //       props: {},
  //       state: {},
  //       queries: [],
  //       redux: {
  //         actions: [],
  //         state: {}
  //       },
  //       files: {
  //         'index.js': 'path/to/file/index.js',
  //         'index.css': 'path/to/file/index.css',
  //
  //       }
  //     }],               // src/bricks       || src/components
  //     kits: [],         // src/kits         || src/containers
  //     creations: [],    // src/creations    || src/pages || src/views
  //     plates: [],       // src/plates       || src/layouts
  //     tools: []         // src/tools        || src/helpers
  //   },
  //   env: {}             // .env
  // }
  return config
}
