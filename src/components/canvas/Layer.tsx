import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { layerStyle, type Placement } from '@/lib/canvas'
import { mediaAlt, mediaSize, mediaUrl, type MediaRef } from '@/lib/media'

export type LayerData = {
  id?: string | null
  type?: string | null
  label?: string | null
  text?: string | null
  buttonLabel?: string | null
  variant?: string | null
  href?: string | null
  newTab?: boolean | null
  image?: MediaRef
  imageAlt?: string | null
  objectFit?: string | null
  animation?: string | null
  delay?: number | null
  desktop?: Placement | null
  tablet?: Placement | null
  mobile?: Placement | null
}

/** Wraps `children` in a link when the layer has one, otherwise passes through. */
const withLink = (layer: LayerData, children: ReactNode, className: string): ReactNode => {
  if (!layer.href) return <span className={className}>{children}</span>

  const attrs = layer.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const external = /^(https?:)?\/\//.test(layer.href) || /^(mailto|tel):/.test(layer.href)

  return external ? (
    <a href={layer.href} className={className} {...attrs}>
      {children}
    </a>
  ) : (
    <Link href={layer.href} className={className} {...attrs}>
      {children}
    </Link>
  )
}

export const Layer = ({ layer, priority }: { layer: LayerData; priority?: boolean }) => {
  const style: CSSProperties = {
    ...layerStyle(layer),
    ...(layer.delay ? ({ '--anim-delay': `${layer.delay}ms` } as CSSProperties) : {}),
  }
  const animate = layer.animation && layer.animation !== 'none' ? layer.animation : 'none'

  if (layer.type === 'image') {
    const src = mediaUrl(layer.image)
    if (!src) return null
    const intrinsic = mediaSize(layer.image) ?? { width: 1600, height: 1000 }

    return (
      <div
        className="dp-layer dp-layer--image"
        data-animate={animate}
        style={{ ...style, ['--object-fit' as string]: layer.objectFit || 'contain' }}
      >
        {withLink(
          layer,
          <Image
            src={src}
            alt={layer.imageAlt || mediaAlt(layer.image)}
            width={intrinsic.width}
            height={intrinsic.height}
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 100vw, 1280px"
            priority={priority}
            unoptimized={src.toLowerCase().endsWith('.svg')}
          />,
          'dp-layer__link',
        )}
      </div>
    )
  }

  if (layer.type === 'button') {
    return (
      <div className="dp-layer dp-layer--button" data-animate={animate} style={style}>
        {withLink(
          layer,
          <span className="dp-button__label">{layer.buttonLabel}</span>,
          `dp-button dp-button--${layer.variant || 'solid'}`,
        )}
      </div>
    )
  }

  return (
    <div className="dp-layer dp-layer--text" data-animate={animate} style={style}>
      {withLink(layer, layer.text, 'dp-layer__text')}
    </div>
  )
}
