import type { Media } from '@/payload-types'

export type MediaRef = number | string | Media | null | undefined

export const asMedia = (ref: MediaRef): Media | null =>
  ref && typeof ref === 'object' ? (ref as Media) : null

export const mediaUrl = (ref: MediaRef): string | null => asMedia(ref)?.url ?? null

export const mediaAlt = (ref: MediaRef, fallback = ''): string => asMedia(ref)?.alt || fallback

export const mediaSize = (ref: MediaRef): { width: number; height: number } | null => {
  const media = asMedia(ref)
  if (!media?.width || !media?.height) return null
  return { width: media.width, height: media.height }
}
