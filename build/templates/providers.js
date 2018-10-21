module.exports = ({reducers = [],middlewares = [], graphql}) => `import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from '@tds/store'
${reducers.map((reducerPath, index) => `import * as reducer${index+1} from '${reducerPath}'
`)}

${middlewares.map((middlewarePath, index) => `import * as middleware${index+1} from '${middlewarePath}'
`)}

${graphql ? `
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({
  uri: '${graphql.endpoint}'
})
` : ''}

const Providers = ({ children }) => {
  const store = createStore(
    (typeof window !== 'undefined' && window.__REDUX_STATE__) || {},
    {
      reducers: {${reducers.map((reducerPath, index) => `...reducer${index+1}`).join(', ')}},
      middlewares: [${middlewares.map((middlewarePath, index) => `...Object.values(middleware${index+1})`).join(', ')}]
    }
  )
  return (
    <ReduxProvider store={store}>
      ${graphql ? `<ApolloProvider client={client}>` : ''}
      {children}
      ${graphql ? `</ApolloProvider>` : ''}
    </ReduxProvider>
  )
}
export default Providers
`
