import type { CSSProperties } from 'react'

import { DESIGN_WIDTH, type Anchor, type Breakpoint } from './design'

export type Placement = {
  visibility?: 'visible' | 'hidden' | 'inherit' | null
  anchor?: Anchor | string | null
  x?: number | null
  y?: number | null
  w?: number | null
  h?: number | null
  fontSize?: number | null
  lineHeight?: number | null
  fontWeight?: string | null
  letterSpacing?: number | null
  align?: string | null
  color?: string | null
}

/**
 * Every layer coordinate is authored against a design width and scales with the
 * canvas. `1cqw` is 1% of the canvas width, so a design length L renders as
 * `L / designWidth * 100` cqw — which is exactly `L * (canvasWidth / designWidth)`.
 * The canvas height stays fixed per breakpoint, matching the source site.
 */
const cqw = (value: number, designWidth: number): string =>
  `calc(${round((value / designWidth) * 100)} * 1cqw)`

const round = (n: number): number => Math.round(n * 10000) / 10000

const horizontal = (anchor: Anchor): 'l' | 'c' | 'r' => anchor[1] as 'l' | 'c' | 'r'
const vertical = (anchor: Anchor): 't' | 'm' | 'b' => anchor[0] as 't' | 'm' | 'b'

const isAnchor = (value: unknown): value is Anchor =>
  typeof value === 'string' && /^[tmb][lcr]$/.test(value)

/** `tablet` and `mobile` inherit every field left blank on `desktop`. */
export const resolvePlacement = (base: Placement, override?: Placement | null): Placement => {
  if (!override) return base
  const merged: Placement = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (value !== null && value !== undefined && value !== '' && value !== 'inherit') {
      ;(merged as Record<string, unknown>)[key] = value
    }
  }
  return merged
}

const PREFIX: Record<Breakpoint, string> = { desktop: 'd', tablet: 't', mobile: 'm' }

/**
 * Turns one resolved placement into the CSS custom properties consumed by
 * `.dp-layer` in globals.css. Auto width/height fall back to translate-based
 * centring so text can size itself.
 */
export const placementVars = (
  place: Placement,
  breakpoint: Breakpoint,
  designWidth = DESIGN_WIDTH[breakpoint],
): CSSProperties => {
  const p = PREFIX[breakpoint]
  const vars: Record<string, string> = {}
  const set = (key: string, value: string) => {
    vars[`--${p}-${key}`] = value
  }

  if (place.visibility === 'hidden') {
    set('display', 'none')
    return vars as CSSProperties
  }
  set('display', 'block')

  const anchor: Anchor = isAnchor(place.anchor) ? place.anchor : 'mc'
  const x = place.x ?? 0
  const y = place.y ?? 0
  const w = typeof place.w === 'number' ? place.w : null
  const h = typeof place.h === 'number' ? place.h : null

  const hx = horizontal(anchor)
  const vy = vertical(anchor)

  const translate: string[] = []

  // Edge anchors inset *into* the canvas: x grows rightwards from `l` and
  // leftwards from `r`; y grows downwards from `t` and upwards from `b`.
  // Centre anchors offset the element's own centre along the positive axis.
  if (hx === 'l') {
    set('left', cqw(x, designWidth))
  } else if (hx === 'c') {
    set(
      'left',
      w === null ? `calc(50% + ${cqw(x, designWidth)})` : `calc(50% + ${cqw(x - w / 2, designWidth)})`,
    )
    if (w === null) translate.push('-50%')
  } else {
    set(
      'left',
      w === null ? `calc(100% - ${cqw(x, designWidth)})` : `calc(100% - ${cqw(x + w, designWidth)})`,
    )
    if (w === null) translate.push('-100%')
  }
  if (translate.length === 0) translate.push('0')

  if (vy === 't') {
    set('top', cqw(y, designWidth))
    translate.push('0')
  } else if (vy === 'm') {
    set(
      'top',
      h === null ? `calc(50% + ${cqw(y, designWidth)})` : `calc(50% + ${cqw(y - h / 2, designWidth)})`,
    )
    translate.push(h === null ? '-50%' : '0')
  } else {
    set(
      'top',
      h === null ? `calc(100% - ${cqw(y, designWidth)})` : `calc(100% - ${cqw(y + h, designWidth)})`,
    )
    translate.push(h === null ? '-100%' : '0')
  }

  set('translate', translate.join(' '))
  set('width', w === null ? 'auto' : cqw(w, designWidth))
  set('height', h === null ? 'auto' : cqw(h, designWidth))

  if (place.fontSize) set('font-size', `${place.fontSize}px`)
  if (place.lineHeight) set('line-height', `${place.lineHeight}px`)
  if (place.fontWeight) set('font-weight', String(place.fontWeight))
  if (typeof place.letterSpacing === 'number') set('letter-spacing', `${place.letterSpacing}px`)
  if (place.align) set('text-align', place.align)
  if (place.color) set('color', place.color)

  return vars as CSSProperties
}

export const layerStyle = (layer: {
  desktop?: Placement | null
  tablet?: Placement | null
  mobile?: Placement | null
}): CSSProperties => {
  const base = layer.desktop ?? {}
  return {
    ...placementVars(base, 'desktop'),
    ...placementVars(resolvePlacement(base, layer.tablet), 'tablet'),
    ...placementVars(resolvePlacement(base, layer.mobile), 'mobile'),
  }
}
