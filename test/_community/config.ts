import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { devUser } from '../credentials'
import {
  NestedRelationCollection,
  nestedRelationSlug,
} from './collections/NestedRelationCollection'
import { PlayersCollection } from './collections/Player'
import { RelationCollection, relationSlug } from './collections/RelationCollection'
import { MenuGlobal } from './globals/Menu'

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [PlayersCollection, RelationCollection, NestedRelationCollection],
  globals: [
    MenuGlobal,
    // ...add more globals here
  ],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },

  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    const randomNested = new Array(100).fill(0).map((_, index) => `${index}`)
    const nestedPromises = randomNested.map((x) =>
      payload.create({
        collection: nestedRelationSlug,
        data: {
          text: x,
        },
      }),
    )
    await Promise.all(nestedPromises)

    const randomRelation = new Array(100).fill(0).map((_, index) => index)
    const relationPromises = randomRelation.map((x) =>
      payload.create({
        collection: relationSlug,
        data: {
          text: `${x}`,
          nested: `${Math.floor(Math.random() * 100)}`,
        },
      }),
    )
    await Promise.all(relationPromises)
  },
})
