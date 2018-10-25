module.exports = (middlewares) => `
${middlewares.map(middleware => `export * from '${middleware}'
`).join('')}`
