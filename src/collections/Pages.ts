import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { CanvasSection } from '@/blocks/CanvasSection/config'
import { seoFields } from '@/fields/seo'
import { revalidatePage } from '@/hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    listSearchableFields: ['title', 'slug'],
    livePreview: {
      url: ({ data }) => `/${data?.slug === 'home' ? '' : (data?.slug ?? '')}`,
    },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Use "home" for the homepage.',
      },
    },
    {
      name: 'showDesignControls',
      type: 'checkbox',
      label: 'Show layout & design controls',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Off by default so editing stays content-only. Turn on to reveal per-breakpoint placement, sizing and animation.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Sections',
              minRows: 0,
              blocks: [CanvasSection],
            },
          ],
        },
        {
          label: 'SEO',
          fields: seoFields,
        },
      ],
    },
  ],
}
