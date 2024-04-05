import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { nestedRelationSlug } from '../NestedRelationCollection'

export const relationSlug = 'relation'

export const RelationCollection: CollectionConfig = {
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['text', 'nested'],
    listSearchableFields: ['text', 'nested'],
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'nested',
      type: 'relationship',
      relationTo: nestedRelationSlug,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData.title
          },
        ],
        afterRead: [
          ({ data }) => {
            return `${data?.text} ${data?.nested}`
          },
        ],
      },
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
            const nested = data?.nested
            const text = data?.text?.replace(/ /g, '-').toLowerCase()
            const id = `${text}${nested ? `_${nested}` : null}`
            return id ?? value
          },
        ],
      },
    },
  ],
  slug: relationSlug,
}
