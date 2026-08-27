/**
 * Design system constants shared by the CMS schema and the frontend renderer.
 *
 * The original drive7.com homepage is authored as a set of fixed-size design
 * canvases (one per section) whose layers are absolutely positioned against one
 * of nine anchor origins. Everything on the canvas scales proportionally with
 * the container width; font sizes do not scale and are set per breakpoint.
 * `CanvasSection` reproduces that model exactly.
 */

export type Breakpoint = 'desktop' | 'tablet' | 'mobile'

/** Width each breakpoint's layout was designed against. scale = canvasWidth / designWidth */
export const DESIGN_WIDTH: Record<Breakpoint, number> = {
  desktop: 1280,
  tablet: 1024,
  mobile: 360,
}

/** Max width of the boxed container the canvas lives in (desktop only). */
export const CONTAINER_MAX_WIDTH = 1280

/** Upper bound of each breakpoint, matching the source site's Elementor breakpoints. */
export const BREAKPOINT_MAX = {
  mobile: 767,
  tablet: 1024,
} as const

/**
 * The source site also defines a widescreen breakpoint. It does not change the
 * canvas layout — only the header, which collapses from 194.7px to 91.7px.
 */
export const BREAKPOINT_MIN = {
  widescreen: 1760,
} as const

export const MEDIA = {
  mobile: `(max-width: ${BREAKPOINT_MAX.mobile}px)`,
  tablet: `(min-width: ${BREAKPOINT_MAX.mobile + 1}px) and (max-width: ${BREAKPOINT_MAX.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINT_MAX.tablet + 1}px)`,
  widescreen: `(min-width: ${BREAKPOINT_MIN.widescreen}px)`,
} as const

/** Nine anchor origins: [t|m|b][l|c|r] — vertical first, then horizontal. */
export const ANCHORS = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'] as const
export type Anchor = (typeof ANCHORS)[number]

export const ANCHOR_LABELS: Record<Anchor, string> = {
  tl: 'Top Left',
  tc: 'Top Center',
  tr: 'Top Right',
  ml: 'Middle Left',
  mc: 'Middle Center',
  mr: 'Middle Right',
  bl: 'Bottom Left',
  bc: 'Bottom Center',
  br: 'Bottom Right',
}

export const COLORS = {
  black: '#000000',
  red: '#EE0606',
  redAlt: '#CB0404',
  heading: '#EBEBEB',
  muted: '#9A9A9A',
  navLink: '#706E6E',
  outline: '#707070',
  footerBg: '#3D3D3D',
  white: '#FFFFFF',
} as const
