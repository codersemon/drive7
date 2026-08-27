import type { CSSProperties } from 'react'

import { SocialIcon } from '@/components/icons/social'
import type { SiteSetting } from '@/payload-types'

export const WhatsAppFloat = ({ settings }: { settings: SiteSetting }) => {
  if (!settings.whatsappEnabled || !settings.whatsappNumber) return null

  const style = {
    '--wa-color': settings.whatsappColor || '#25D366',
    '--wa-size': `${settings.whatsappSize ?? 55}px`,
    '--wa-icon': `${settings.whatsappIconSize ?? 35}px`,
    '--wa-inset': `${settings.whatsappInset ?? 18}px`,
  } as CSSProperties

  return (
    <a
      className="wa-float"
      style={style}
      href={`https://wa.me/${settings.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <SocialIcon platform="whatsapp" />
    </a>
  )
}
