import type { CSSProperties } from 'react'

import { Layer, type LayerData } from './Layer'

export type CanvasSectionData = {
  id?: string | null
  blockType?: string
  title?: string | null
  background?: string | null
  desktopHeight?: number | null
  tabletHeight?: number | null
  mobileHeight?: number | null
  hideOnDesktop?: boolean | null
  hideOnTablet?: boolean | null
  hideOnMobile?: boolean | null
  fullBleed?: boolean | null
  layers?: LayerData[] | null
}

export const CanvasSection = ({
  section,
  index = 0,
}: {
  section: CanvasSectionData
  index?: number
}) => {
  const style = {
    '--h-desktop': `${section.desktopHeight ?? 740}px`,
    '--h-tablet': `${section.tabletHeight ?? 700}px`,
    '--h-mobile': `${section.mobileHeight ?? 740}px`,
    background: section.background || undefined,
  } as CSSProperties

  return (
    <section
      className="dp-section"
      style={style}
      data-hide-desktop={section.hideOnDesktop ? 'true' : undefined}
      data-hide-tablet={section.hideOnTablet ? 'true' : undefined}
      data-hide-mobile={section.hideOnMobile ? 'true' : undefined}
      data-full-bleed={section.fullBleed ? 'true' : undefined}
      aria-label={section.title || undefined}
    >
      <div className="dp-canvas">
        {(section.layers ?? []).map((layer, i) => (
          <Layer key={layer.id ?? i} layer={layer} priority={index === 0 && i < 2} />
        ))}
      </div>
    </section>
  )
}
