'use client'

import { useRowLabel } from '@payloadcms/ui'

export const SocialRowLabel = () => {
  const { data } = useRowLabel<{ platform?: string; href?: string }>()
  return <span>{data?.platform ? `${data.platform} → ${data.href ?? ''}` : 'Social link'}</span>
}
