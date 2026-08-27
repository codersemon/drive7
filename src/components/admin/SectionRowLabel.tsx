'use client'

import { useRowLabel } from '@payloadcms/ui'

type SectionRow = {
  title?: string | null
  hideOnDesktop?: boolean | null
  hideOnTablet?: boolean | null
  hideOnMobile?: boolean | null
  layers?: unknown[] | null
}

/** Shows the section's own name and where it is visible, instead of "Untitled". */
export const SectionRowLabel = () => {
  const { data, rowNumber } = useRowLabel<SectionRow>()
  const index = String((rowNumber ?? 0) + 1).padStart(2, '0')

  const shown = [
    data?.hideOnDesktop ? null : 'desktop',
    data?.hideOnTablet ? null : 'tablet',
    data?.hideOnMobile ? null : 'mobile',
  ].filter(Boolean)

  const count = data?.layers?.length ?? 0
  const scope = shown.length === 3 ? 'all breakpoints' : shown.join(' + ') || 'hidden'

  return (
    <span>
      {`${index} — ${data?.title || 'Untitled section'}`}
      <span style={{ opacity: 0.5 }}>{`  ·  ${count} layer${count === 1 ? '' : 's'}  ·  ${scope}`}</span>
    </span>
  )
}
