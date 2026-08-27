import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    // `staticDir` is only used by the local disk adapter; the S3 adapter ignores it.
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*', 'font/*', 'application/pdf'],
    focalPoint: false,
    crop: false,
    imageSizes: [
      { name: 'thumbnail', width: 400, withoutEnlargement: true },
      { name: 'medium', width: 900, withoutEnlargement: true },
      { name: 'large', width: 1400, withoutEnlargement: true },
      { name: 'xlarge', width: 2000, withoutEnlargement: true },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Describe the image for screen readers and SEO.' },
    },
  ],
}
