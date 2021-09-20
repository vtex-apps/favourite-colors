import { queries as colorsQueries, mutations as colorsMutations } from './colors'

export const resolvers = {
  Query: {
    ...colorsQueries,
  },
  Mutation: {
    ...colorsMutations,
  }
}