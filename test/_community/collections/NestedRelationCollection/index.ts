import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

export const nestedRelationSlug = 'nested-relation-slug'

export const NestedRelationCollection: CollectionConfig = {
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text'],
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'id',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            return data?.text?.replace(/ /g, '-').toLowerCase() ?? value
          },
        ],
      },
    },
  ],
  slug: nestedRelationSlug,
}
