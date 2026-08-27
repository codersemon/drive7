import 'dotenv/config'

// Next's revalidate helpers throw outside a render; the seed runs from the CLI.
process.env.DISABLE_REVALIDATE = 'true'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import config from '../payload.config.js'
import { getPayload } from 'payload'

import {
  LOGO_SVG,
  MEDIA_FILES,
  footerLinks,
  homeSections,
  navItems,
  socialLinks,
  type SeedLayer,
} from './home.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSET_DIR = path.resolve(dirname, '../../seed-assets')

const run = async () => {
  const payload = await getPayload({ config })

  /* ---------------------------------------------------------------- users */
  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  if (userCount === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@drive7.com'
    const password = process.env.SEED_ADMIN_PASSWORD || 'Drive7!admin'
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Drive7 Admin' },
    })
    payload.logger.info(`Created admin user ${email} (password: ${password})`)
  }

  /* ---------------------------------------------------------------- media */
  const mediaIds: Record<string, number> = {}

  for (const [key, { file, alt }] of Object.entries(MEDIA_FILES)) {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: file } },
      limit: 1,
      pagination: false,
    })

    if (existing.docs[0]) {
      mediaIds[key] = existing.docs[0].id as number
      continue
    }

    const filePath = path.join(ASSET_DIR, file)
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`Missing seed asset: ${filePath}`)
      continue
    }

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      filePath,
    })
    mediaIds[key] = doc.id as number
    payload.logger.info(`Uploaded ${file}`)
  }

  /* -------------------------------------------------------------- globals */
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Drive7',
      siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://drive7.com',
      locale: 'ar',
      direction: 'rtl',
      themeColor: '#000000',
      bodyBackground: '#000000',
      defaultTitle: 'العناية الفائقة بالسيارات - Drive7',
      titleTemplate: '%s - Drive7',
      defaultDescription:
        'Drive7 وجهتك الفاخرة لتظليل، تلميع وصيانة السيارات في السعودية. خدماتنا مصممة لأصحاب الذوق الرفيع، بجودة استثنائية، سرعة إنجاز، وعناية فائقة بسيارتك. احجز الآن',
      whatsappEnabled: true,
      whatsappNumber: '966920000057',
      whatsappColor: '#25D366',
      whatsappSize: 55,
      whatsappIconSize: 35,
      whatsappInset: 18,
      gtmId: 'GTM-NWLV5ZKJ',
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      logoSvg: LOGO_SVG,
      logoHref: '/',
      logoWidthDesktop: 186,
      logoWidthTablet: 186,
      logoWidthMobile: 119,
      logoOffsetYDesktop: -4,
      logoOffsetYWidescreen: -1,
      logoOffsetYMobile: -2,
      logoMarginLeftWidescreen: 46,
      logoMarginRightWidescreen: 136,
      navShiftWidescreen: 178,
      navItems,
      background: '#000000',
      linkColor: '#706E6E',
      linkActiveColor: '#706E6E',
      linkFontSize: 20,
      linkLineHeight: 30,
      linkPaddingX: 14,
      linkPaddingY: 13,
      navWidthPercent: 62.6,
      logoGap: 35,
      heightWidescreen: 91.7,
      heightDesktop: 194.7,
      heightTablet: 194,
      heightMobile: 61,
      sticky: false,
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      socialLinks,
      links: footerLinks,
      separator: '|',
      background: '#3D3D3D',
      overlayColor: '#0A0D14',
      overlayOpacity: 0.7,
      iconColor: '#FFFFFF',
      linkColor: '#FFFFFF',
      iconBoxSize: 32.4,
      iconSize: 18,
      linkFontSize: 18,
      linksMarginTop: 15,
      padTopDesktop: 120,
      padBottomDesktop: 160,
      sideOffsetDesktop: 120,
      gutterDesktop: 80,
      padTopTablet: 60,
      padBottomTablet: 80,
      sideOffsetTablet: 60,
      gutterTablet: 20,
      padTopMobile: 60,
      padBottomMobile: 40,
      sideOffsetMobile: 0,
      gutterMobile: 20,
    },
  })

  /* ----------------------------------------------------------- home page */
  const toLayer = (layer: SeedLayer) => ({
    type: layer.type,
    label: layer.label,
    text: layer.text,
    buttonLabel: layer.buttonLabel,
    variant: layer.variant ?? 'solid',
    href: layer.href,
    newTab: layer.newTab ?? false,
    image: layer.imageKey ? mediaIds[layer.imageKey] : undefined,
    imageAlt: layer.imageAlt,
    objectFit: layer.objectFit ?? 'contain',
    animation: layer.animation ?? 'none',
    delay: layer.delay ?? 0,
    desktop: layer.desktop,
    tablet: layer.tablet ?? {},
    mobile: layer.mobile ?? {},
  })

  const layout = homeSections.map((section) => ({
    blockType: 'canvasSection' as const,
    title: section.title,
    background: section.background,
    desktopHeight: section.desktopHeight,
    tabletHeight: section.tabletHeight,
    mobileHeight: section.mobileHeight,
    hideOnDesktop: section.hideOnDesktop ?? false,
    hideOnTablet: section.hideOnTablet ?? false,
    hideOnMobile: section.hideOnMobile ?? false,
    fullBleed: false,
    layers: section.layers.map(toLayer),
  }))

  const data = {
    title: 'العناية الفائقة بالسيارات',
    slug: 'home',
    showDesignControls: false,
    layout,
    meta: {
      title: 'العناية الفائقة بالسيارات - Drive7',
      description:
        'Drive7 وجهتك الفاخرة لتظليل، تلميع وصيانة السيارات في السعودية. خدماتنا مصممة لأصحاب الذوق الرفيع، بجودة استثنائية، سرعة إنجاز، وعناية فائقة بسيارتك. احجز الآن',
      noIndex: false,
    },
    _status: 'published' as const,
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    pagination: false,
  })

  if (existingPage.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data,
    })
    payload.logger.info('Updated the home page')
  } else {
    await payload.create({ collection: 'pages', data })
    payload.logger.info('Created the home page')
  }

  payload.logger.info('Seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
