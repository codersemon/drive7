'use client'

import { useRowLabel } from '@payloadcms/ui'

export const NavRowLabel = () => {
  const { data } = useRowLabel<{ label?: string; href?: string }>()
  return <span>{data?.label ? `${data.label} → ${data.href ?? ''}` : 'Link'}</span>
}
