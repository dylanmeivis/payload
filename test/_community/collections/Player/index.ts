import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { relationSlug } from '../RelationCollection'

export const playerSlug = 'players'

export const PlayersCollection: CollectionConfig = {
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'nested'],
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'relationHistory',
      label: 'History',
      type: 'array',
      admin: {
        components: {
          //@ts-expect-error
          RowLabel: ({ _data, index }) => {
            return `History ${String(index).padStart(2, '0')}`
          },
        },
      },
      fields: [
        {
          name: 'issue',
          type: 'relationship',
          relationTo: relationSlug,
          required: true,
        },
        {
          name: 'year',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'yyy',
            },
          },
        },
      ],
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
  slug: playerSlug,
}
