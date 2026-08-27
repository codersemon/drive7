import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Page } from '@/payload-types'

export const payloadClient = () => getPayload({ config })

/**
 * Cached reads, invalidated on demand by the Payload afterChange hooks. Caching
 * is skipped in development so edits (and drafts) show up immediately.
 */
const cached = <T>(fn: () => Promise<T>, keys: string[], tags: string[]) =>
  process.env.NODE_ENV === 'production'
    ? unstable_cache(fn, keys, { tags, revalidate: 3600 })()
    : fn()

export const getGlobal = <T>(slug: 'header' | 'footer' | 'site-settings', depth = 2) =>
  cached<T>(
    async () => {
      const payload = await payloadClient()
      return (await payload.findGlobal({ slug, depth })) as T
    },
    ['global', slug],
    [slug],
  )

export const getPageBySlug = (slug: string, draft = false) =>
  cached<Page | null>(
    async () => {
      const payload = await payloadClient()
      const result = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
        draft,
        overrideAccess: draft,
        pagination: false,
      })
      return result.docs[0] ?? null
    },
    ['page', slug, String(draft)],
    ['pages', `page:${slug}`],
  )

export const getAllPageSlugs = async (): Promise<string[]> => {
  const payload = await payloadClient()
  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 200,
    pagination: false,
    select: { slug: true },
  })
  return result.docs.map((doc) => doc.slug).filter(Boolean)
}
