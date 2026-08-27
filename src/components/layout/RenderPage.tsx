import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { CanvasSection } from '@/components/canvas/CanvasSection'
import { mediaUrl } from '@/lib/media'
import { getPageBySlug } from '@/lib/payload'

export const pageMetadata = async (slug: string): Promise<Metadata> => {
  const page = await getPageBySlug(slug)
  if (!page) return {}

  const meta = page.meta ?? {}
  return {
    title: meta.title || page.title,
    description: meta.description || undefined,
    robots: meta.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: meta.title || page.title,
      description: meta.description || undefined,
      images: mediaUrl(meta.image) ?? undefined,
    },
  }
}

export const renderPage = async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const page = await getPageBySlug(slug, draft)

  if (!page) notFound()

  return (
    <>
      {(page.layout ?? []).map((block, index) => {
        if (block.blockType === 'canvasSection') {
          return <CanvasSection key={block.id ?? index} section={block} index={index} />
        }
        return null
      })}
    </>
  )
}
