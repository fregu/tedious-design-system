import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
  GraphQLScalarType,
} from 'graphql'
import faker  from 'faker'

const Types = {
  String: { type: GraphQLString },
  Int: { type: GraphQLInt },
  Object: { type: GraphQLObjectType },
  Schema: { type: GraphQLSchema },
  List: { type: GraphQLList },
  Name: {
    type: GraphQLString,
    resolve(val, args) {
      return typeof val !== 'undefined' ? val : faker.name.findName()
    }
  },
  FirstName: {
    type: GraphQLString,
    resolve(val, args) {
      return typeof val !== 'undefined' ? val : faker.name.firstName()
    }
  },
  LastName: {
    type: GraphQLString,
    resolve(val, args) {
      return typeof val !== 'undefined' ? val : faker.name.lastName()
    }
  },
  Date: {
    type: GraphQLScalarType,
    resolve(val) {
      return typeof val !== 'undefined' ? val : faker.date.recent()
    }
  },
  FutureDate: {
    type: GraphQLScalarType,
    resolve(val) {
      return typeof val !== 'undefined' ? val : faker.date.future()
    }
  }
}
module.exports = Types
