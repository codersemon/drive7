import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Next's cache helpers only work inside a request/render. The seed script and
 * other CLI entry points run outside one, so they opt out via DISABLE_REVALIDATE.
 */
const revalidationDisabled = () => process.env.DISABLE_REVALIDATE === 'true'

export const revalidatePage: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  if (revalidationDisabled()) return doc

  const slug = typeof doc?.slug === 'string' ? doc.slug : ''
  const path = slug === 'home' || slug === '' ? '/' : `/${slug}`

  try {
    revalidatePath(path)
    revalidateTag('pages', 'max')
    payload.logger.info(`Revalidated ${path}`)
  } catch (err) {
    payload.logger.error({ err }, `Failed to revalidate ${path}`)
  }

  return doc
}

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc, req: { payload } }) => {
    if (revalidationDisabled()) return doc

    try {
      revalidateTag(tag, 'max')
      revalidatePath('/', 'layout')
      payload.logger.info(`Revalidated global "${tag}"`)
    } catch (err) {
      payload.logger.error({ err }, `Failed to revalidate global "${tag}"`)
    }

    return doc
  }
