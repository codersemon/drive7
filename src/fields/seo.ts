import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'meta',
    type: 'group',
    label: false,
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Meta title',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta description',
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Social share image',
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'Hide from search engines',
        defaultValue: false,
      },
    ],
  },
]
