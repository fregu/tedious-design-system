module.exports = (reducers) => `
${reducers.map(reducer => `export * from '${reducer}'
`).join('')}`
