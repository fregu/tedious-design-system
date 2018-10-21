import { GraphQLSchema } from 'graphql'
export types from './types'
import parseSchema from './parseSchema'

// Export the schema with the query object
export default function createSchema(schema, config) {
  return new GraphQLSchema(schema)
}
