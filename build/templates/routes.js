module.exports = (routes) => `
${routes.map(route => `import ${route.name} from '${route.path}'
`).join('')}
export default [${routes.map((route, index) => `{path:'${route.name}', component:${route.name}}`)}]
`
