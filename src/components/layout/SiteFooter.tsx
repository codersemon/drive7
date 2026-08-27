import Link from 'next/link'
import { Fragment, type CSSProperties } from 'react'

import { SocialIcon } from '@/components/icons/social'
import type { Footer as FooterGlobal } from '@/payload-types'

export const SiteFooter = ({ footer }: { footer: FooterGlobal }) => {
  const style = {
    '--footer-bg': footer.background || '#3D3D3D',
    '--footer-overlay': footer.overlayColor || 'transparent',
    '--footer-overlay-opacity': String(footer.overlayOpacity ?? 0),
    '--icon-color': footer.iconColor || 'rgba(255,255,255,0.82)',
    '--footer-link-color': footer.linkColor || '#FFFFFF',
    '--icon-box': `${footer.iconBoxSize ?? 32.4}px`,
    '--icon-size': `${footer.iconSize ?? 18}px`,
    '--footer-link-fs': `${footer.linkFontSize ?? 18}px`,
    '--links-mt': `${footer.linksMarginTop ?? 15}px`,
    '--footer-pt': `${footer.padTopDesktop ?? 120}px`,
    '--footer-pb': `${footer.padBottomDesktop ?? 160}px`,
    '--footer-offset': `${footer.sideOffsetDesktop ?? 120}px`,
    '--footer-gutter': `${footer.gutterDesktop ?? 80}px`,
    '--footer-pt-tablet': `${footer.padTopTablet ?? 60}px`,
    '--footer-pb-tablet': `${footer.padBottomTablet ?? 80}px`,
    '--footer-offset-tablet': `${footer.sideOffsetTablet ?? 60}px`,
    '--footer-gutter-tablet': `${footer.gutterTablet ?? 20}px`,
    '--footer-pt-mobile': `${footer.padTopMobile ?? 60}px`,
    '--footer-pb-mobile': `${footer.padBottomMobile ?? 40}px`,
    '--footer-offset-mobile': `${footer.sideOffsetMobile ?? 0}px`,
    '--footer-gutter-mobile': `${footer.gutterMobile ?? 20}px`,
  } as CSSProperties

  const socials = footer.socialLinks ?? []
  const links = footer.links ?? []

  return (
    <footer className="site-footer" style={style}>
      <div className="site-footer__overlay" aria-hidden="true" />
      <div className="site-footer__inner">
        {socials.length > 0 && (
          <ul className="site-footer__social">
            {socials.map((social) => (
              <li key={`${social.platform}-${social.href}`}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">{social.platform}</span>
                  <SocialIcon platform={social.platform} />
                </a>
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="site-footer__links">
            {links.map((link, i) => (
              <Fragment key={`${link.href}-${link.label}`}>
                {i > 0 && <span aria-hidden="true">{footer.separator || '|'}</span>}
                <Link
                  href={link.href}
                  {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
