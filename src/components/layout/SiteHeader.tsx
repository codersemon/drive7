import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import type { Header as HeaderGlobal } from '@/payload-types'
import { mediaSize, mediaUrl } from '@/lib/media'

import { MobileMenu } from './MobileMenu'

export const SiteHeader = ({ header }: { header: HeaderGlobal }) => {
  const items = (header.navItems ?? []).map((item) => ({
    label: item.label,
    href: item.href,
    newTab: item.newTab,
  }))

  const style = {
    '--header-bg': header.background || '#000000',
    '--header-gap': `${header.logoGap ?? 35}px`,
    '--header-h-widescreen': `${header.heightWidescreen ?? 91.7}px`,
    '--header-h-desktop': `${header.heightDesktop ?? 194.7}px`,
    '--header-h-tablet': `${header.heightTablet ?? 194}px`,
    '--header-h-mobile': `${header.heightMobile ?? 61}px`,
    '--logo-ml-widescreen': `${header.logoMarginLeftWidescreen ?? 46}px`,
    '--logo-mr-widescreen': `${header.logoMarginRightWidescreen ?? 136}px`,
    '--logo-offset-widescreen': `${header.logoOffsetYWidescreen ?? -1}px`,
    '--nav-shift-widescreen': `${header.navShiftWidescreen ?? 178}px`,
    '--nav-width': `${header.navWidthPercent ?? 62.6}%`,
    '--link-color': header.linkColor || '#706E6E',
    '--link-active-color': header.linkActiveColor || '#FFFFFF',
    '--link-fs': `${header.linkFontSize ?? 20}px`,
    '--link-lh': `${header.linkLineHeight ?? 30}px`,
    '--link-px': `${header.linkPaddingX ?? 14}px`,
    '--link-py': `${header.linkPaddingY ?? 13}px`,
    '--logo-w': `${header.logoWidthDesktop ?? 186}px`,
    '--logo-w-mobile': `${header.logoWidthMobile ?? 119}px`,
    '--logo-offset': `${header.logoOffsetYDesktop ?? -4}px`,
    '--logo-offset-mobile': `${header.logoOffsetYMobile ?? -2}px`,
  } as CSSProperties

  const logoSrc = mediaUrl(header.logo)
  const logoIntrinsic = mediaSize(header.logo)

  return (
    <header className="site-header" style={style} data-sticky={header.sticky ? 'true' : undefined}>
      {/* In RTL the first flex child sits on the right, so the logo comes first. */}
      <div className="site-header__inner">
        <Link href={header.logoHref || '/'} className="site-header__logo" aria-label="Drive7">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Drive7"
              width={logoIntrinsic?.width ?? 262}
              height={logoIntrinsic?.height ?? 39}
              priority
              unoptimized={logoSrc.toLowerCase().endsWith('.svg')}
            />
          ) : header.logoSvg ? (
            <span
              // The SVG comes from the admin-controlled Header global.
              dangerouslySetInnerHTML={{ __html: header.logoSvg }}
            />
          ) : null}
        </Link>

        <div className="site-header__nav">
          <nav aria-label="Menu">
            <ul className="site-header__menu">
              {items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  )
}
