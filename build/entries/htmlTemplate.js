export default function htmlTemplate(html, {
  reactDom = '<div />',
  reduxState,
  apolloState,
  helmetData,
  serviceWorker,
  graphqlUrl
}) {
  const headString = `
    ${helmetData.title.toString()}
    ${helmetData.meta.toString()}
    ${helmetData.link.toString()}
    ${helmetData.style.toString()}
  `
  const stateScript = `
    <script>
      window.__REDUX_STATE__ = ${JSON.stringify(reduxState)}
      window.__APOLLO_STATE__ = ${JSON.stringify(apolloState)}
      window.graphqlUrl = '${graphqlUrl}'

      ${serviceWorker ? `if ('serviceWorker' in navigator && location.protocol === 'https:') {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('${serviceWorker}').then(
            registration => {
              // Registration was successful
              console.log(
                'ServiceWorker registration successful with scope: ',
                registration.scope
              )
            },
            err => {
              // registration failed :(
              console.log('ServiceWorker registration failed: ', err)
            }
          )
        })
      }` : ''}
    </script>
  `

  return html
    .replace(
      '<div id="root"></div>',
      `${helmetData.noscript.toString()}<div id="root">${reactDom}</div>${stateScript}`
    )
    .replace('</head>', `${headString}</head>`)
    .replace('<body', `<body ${helmetData.bodyAttributes.toString()}`)
    .replace('<html', `<html ${helmetData.htmlAttributes.toString()}`)
    .replace('</body>', `${helmetData.script.toString()}</body>`)
}
