// @flow
import createSchema, { types } from '@tds/graphql'
import Mutation from './root/mutation.gql'
const dummyString = 'hello'

const PostType = {
  title: String = dummyString,
  content: String = dummyString
}

export default {
  types,
  query: {
    getPosts({id: ID}, 'Get all the posts from database') {
      ...PostType
    }
  }
}
