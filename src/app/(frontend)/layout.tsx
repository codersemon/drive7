import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { COLORS } from '@/lib/design'
import { mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import type { Footer, Header, SiteSetting } from '@/payload-types'

import './globals.css'

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getGlobal<SiteSetting>('site-settings')
  const favicon = mediaUrl(settings.favicon)

  return {
    metadataBase: settings.siteUrl ? new URL(settings.siteUrl) : undefined,
    title: {
      default: settings.defaultTitle || settings.siteName || 'Drive7',
      template: settings.titleTemplate || `%s - ${settings.siteName || 'Drive7'}`,
    },
    description: settings.defaultDescription || undefined,
    openGraph: {
      siteName: settings.siteName || 'Drive7',
      locale: settings.locale || 'ar',
      type: 'website',
      images: mediaUrl(settings.defaultOgImage) ?? undefined,
    },
    icons: favicon ? { icon: favicon } : undefined,
    other: { 'theme-color': settings.themeColor || '#000000' },
  }
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const [header, footer, settings] = await Promise.all([
    getGlobal<Header>('header'),
    getGlobal<Footer>('footer'),
    getGlobal<SiteSetting>('site-settings'),
  ])

  const style = {
    '--body-bg': settings.bodyBackground || COLORS.black,
    '--brand-red': COLORS.red,
  } as CSSProperties

  return (
    <html lang={settings.locale || 'ar'} dir={settings.direction || 'rtl'}>
      <body style={style}>
        {settings.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <SiteHeader header={header} />
        <main>{children}</main>
        <SiteFooter footer={footer} />
        <WhatsAppFloat settings={settings} />
      </body>
    </html>
  )
}

export default RootLayout
