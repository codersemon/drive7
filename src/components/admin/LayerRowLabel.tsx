'use client'

import { useRowLabel } from '@payloadcms/ui'

type LayerRow = {
  label?: string | null
  type?: string | null
  text?: string | null
  buttonLabel?: string | null
}

export const LayerRowLabel = () => {
  const { data, rowNumber } = useRowLabel<LayerRow>()
  const index = String((rowNumber ?? 0) + 1).padStart(2, '0')
  const name = data?.label || data?.text || data?.buttonLabel || data?.type || 'Layer'
  return <span>{`${index} — ${data?.type ?? '?'} · ${String(name).slice(0, 48)}`}</span>
}
