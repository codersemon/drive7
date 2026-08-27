/**
 * Homepage content, transcribed from drive7.com.
 *
 * Coordinates are the design-space values the original authoring tool stores
 * (offset from one of nine anchor origins, plus a box size), captured per
 * breakpoint: desktop is authored against 1280px, tablet against 1024px and
 * mobile against 360px. `lib/canvas.ts` turns them back into CSS.
 */

import type { Anchor } from '@/lib/design'

type SocialPlatform =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'whatsapp'
  | 'snapchat'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'

type Place = {
  anchor: Anchor
  x: number
  y: number
  w?: number
  h?: number
  fontSize?: number
  lineHeight?: number
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '900'
  letterSpacing?: number
  align?: 'right' | 'center' | 'left'
  color?: string
  visibility?: 'visible' | 'hidden'
}

/** Tablet/mobile overrides may also defer to the desktop value. */
type Override = Partial<Omit<Place, 'visibility'>> & {
  visibility?: 'visible' | 'hidden' | 'inherit'
}

export type SeedLayer = {
  type: 'text' | 'image' | 'button'
  label: string
  text?: string
  buttonLabel?: string
  variant?: 'solid' | 'outline'
  href?: string
  newTab?: boolean
  imageKey?: string
  imageAlt?: string
  objectFit?: 'contain' | 'cover' | 'fill'
  animation?: 'none' | 'fade' | 'up' | 'down' | 'left' | 'right'
  delay?: number
  desktop: Place
  tablet?: Override
  mobile?: Override
}

export type SeedSection = {
  title: string
  background?: string
  desktopHeight: number
  tabletHeight: number
  mobileHeight: number
  hideOnDesktop?: boolean
  hideOnTablet?: boolean
  hideOnMobile?: boolean
  layers: SeedLayer[]
}

const HIDDEN: Override = { visibility: 'hidden' }
/** Base placement for a layer that only exists on mobile. */
const MOBILE_ONLY: Place = { anchor: 'mc', x: 0, y: 0, visibility: 'hidden' }

/** Shared button geometry: the outline variant renders 4px taller on desktop. */
const HEADING = '#EBEBEB'
const MUTED = '#9A9A9A'

export const homeSections: SeedSection[] = [
  {
    title: 'Top spacer',
    desktopHeight: 0,
    tabletHeight: 0,
    mobileHeight: 0,
    hideOnDesktop: true,
    hideOnTablet: true,
    hideOnMobile: true,
    layers: [],
  },

  {
    title: 'Window film — hero',
    desktopHeight: 740,
    tabletHeight: 700,
    mobileHeight: 740,
    hideOnMobile: true,
    layers: [
      {
        type: 'image',
        label: 'Tinted car',
        imageKey: 'hero-wf',
        imageAlt: 'التظليل الحراري من Drive7',
        objectFit: 'cover',
        desktop: { anchor: 'mr', x: 0, y: 62, w: 980, h: 612 },
        tablet: { anchor: 'mr', x: 0, y: 79, w: 866, h: 542 },
        mobile: HIDDEN,
      },
      {
        type: 'button',
        label: 'Book now',
        buttonLabel: 'احجز الآن',
        variant: 'solid',
        href: '/booking',
        animation: 'left',
        delay: 200,
        desktop: { anchor: 'ml', x: 195, y: -30, w: 132, h: 40, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'ml', x: 171, y: -70, w: 110, h: 40 },
        mobile: HIDDEN,
      },
      {
        type: 'button',
        label: 'Learn more',
        buttonLabel: 'اعرف أكثر',
        variant: 'outline',
        href: '/wf',
        animation: 'left',
        delay: 100,
        desktop: { anchor: 'mc', x: -234, y: -30, w: 132, h: 44, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'mc', x: -163, y: -70, w: 110, h: 40 },
        mobile: HIDDEN,
      },
      {
        type: 'image',
        label: 'Ultimate wordmark',
        imageKey: 'ultimate',
        objectFit: 'contain',
        animation: 'left',
        delay: 100,
        desktop: { anchor: 'ml', x: 231, y: -139, w: 206, h: 23 },
        tablet: { anchor: 'ml', x: 184, y: -172, w: 206, h: 23 },
        mobile: HIDDEN,
      },
      {
        type: 'text',
        label: 'Heading',
        text: 'التظـليل الحــراري',
        animation: 'up',
        desktop: {
          anchor: 'ml',
          x: 168,
          y: -200,
          w: 331,
          fontSize: 50,
          lineHeight: 60,
          fontWeight: '500',
          letterSpacing: -1.25,
          align: 'center',
          color: HEADING,
        },
        tablet: { anchor: 'ml', x: 70, y: -236, w: 434 },
        mobile: HIDDEN,
      },
    ],
  },

  {
    title: 'Care. Clarity. Control. (mobile)',
    desktopHeight: 740,
    tabletHeight: 700,
    mobileHeight: 500,
    hideOnDesktop: true,
    hideOnTablet: true,
    layers: [
      {
        type: 'text',
        label: 'Care.',
        text: 'Care.',
        animation: 'right',
        delay: 100,
        desktop: {
          anchor: 'mc',
          x: -97,
          y: -166,
          w: 118,
          fontSize: 40,
          lineHeight: 52,
          fontWeight: '700',
          align: 'left',
          color: MUTED,
        },
      },
      {
        type: 'text',
        label: 'Clairty.',
        text: 'Clairty.',
        animation: 'right',
        delay: 1000,
        desktop: {
          anchor: 'mc',
          x: -79,
          y: -117,
          w: 155,
          fontSize: 40,
          lineHeight: 52,
          fontWeight: '700',
          align: 'left',
          color: MUTED,
        },
      },
      {
        type: 'text',
        label: 'Control.',
        text: 'Control.',
        animation: 'right',
        delay: 2000,
        desktop: {
          anchor: 'mc',
          x: -73,
          y: -67,
          w: 168,
          fontSize: 40,
          lineHeight: 52,
          fontWeight: '700',
          align: 'left',
          color: '#CB0404',
        },
      },
      {
        type: 'text',
        label: 'Tagline line 1',
        text: 'نخــتار بعـناية، وننــفذ بـدقة،',
        animation: 'fade',
        delay: 2500,
        desktop: {
          anchor: 'mc',
          x: -1,
          y: 46,
          w: 304,
          fontSize: 27,
          lineHeight: 35.1,
          fontWeight: '500',
          align: 'right',
          color: MUTED,
        },
      },
      {
        type: 'text',
        label: 'Tagline line 2',
        text: 'ونتــقن كـل التفاصـــيل.',
        animation: 'fade',
        delay: 3000,
        desktop: {
          anchor: 'mc',
          x: -1,
          y: 82,
          w: 304,
          fontSize: 27,
          lineHeight: 35.1,
          fontWeight: '500',
          align: 'right',
          color: MUTED,
        },
      },
      {
        type: 'text',
        label: 'Body copy',
        text: 'كل طبــقة تُركّب بمــعايير عــالية، وكــل خــدمة مــدعومة بضــمان حقيقي وتجــربة تســتحق ثقــتك.\nلأن ما نقــدّمه هو عــناية متــكاملة… تصــنع فــرقًا ملمــوسًا في المــظهر، والأداء، وطــول العــمر.',
        animation: 'left',
        delay: 3000,
        desktop: {
          anchor: 'mc',
          x: -8,
          y: 161,
          w: 313,
          fontSize: 15,
          lineHeight: 21,
          fontWeight: '500',
          align: 'right',
          color: MUTED,
        },
      },
    ],
  },

  {
    title: 'Paint restoration / window film',
    background: '#000000',
    desktopHeight: 740,
    tabletHeight: 700,
    mobileHeight: 740,
    layers: [
      // Desktop + tablet
      {
        type: 'image',
        label: 'Detailer polishing',
        imageKey: 'ffff',
        objectFit: 'cover',
        imageAlt: 'استعادة بريق السيارة',
        desktop: { anchor: 'mr', x: 0, y: 191, w: 985, h: 656 },
        tablet: { anchor: 'mr', x: -37, y: 202, w: 900, h: 600 },
        mobile: HIDDEN,
      },
      {
        type: 'text',
        label: 'Heading',
        text: 'استـعادة البريـق',
        animation: 'up',
        desktop: {
          anchor: 'mc',
          x: -360,
          y: -237,
          w: 500,
          fontSize: 50,
          lineHeight: 60,
          fontWeight: '500',
          letterSpacing: -1,
          align: 'center',
          color: HEADING,
        },
        tablet: { anchor: 'mc', x: -268, y: -218, w: 381, fontSize: 40, lineHeight: 48 },
        mobile: HIDDEN,
      },
      {
        type: 'button',
        label: 'Book now',
        buttonLabel: 'احجز الآن',
        variant: 'solid',
        href: '/booking',
        desktop: { anchor: 'ml', x: 129, y: -26, w: 144, h: 40, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'ml', x: 102, y: -50, w: 136, h: 40 },
        mobile: HIDDEN,
      },
      {
        type: 'button',
        label: 'Learn more',
        buttonLabel: 'اعرف أكثر',
        variant: 'outline',
        href: '/polishing',
        newTab: true,
        desktop: { anchor: 'mc', x: -281, y: -26, w: 144, h: 44, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'mc', x: -192, y: -50, w: 136, h: 40 },
        mobile: HIDDEN,
      },
      {
        type: 'image',
        label: 'Factory Finish lockup',
        imageKey: 'polish-logo',
        animation: 'down',
        delay: 100,
        desktop: { anchor: 'ml', x: 177, y: -138, w: 207, h: 103 },
        tablet: { anchor: 'ml', x: 170, y: -135, w: 150, h: 74 },
        mobile: HIDDEN,
      },

      // Mobile — the source swaps in a different composition below 768px.
      {
        type: 'image',
        label: 'Audi — before (mobile)',
        imageKey: 'wf-audi-before',
        objectFit: 'cover',
        desktop: MOBILE_ONLY,
        mobile: { visibility: 'visible', anchor: 'ml', x: 0, y: 81, w: 359, h: 575 },
      },
      {
        type: 'image',
        label: 'Audi — after (mobile)',
        imageKey: 'wf-audi-after',
        objectFit: 'cover',
        animation: 'fade',
        delay: 2000,
        desktop: MOBILE_ONLY,
        mobile: { visibility: 'visible', anchor: 'ml', x: 0, y: 81, w: 359.3, h: 574 },
      },
      {
        type: 'button',
        label: 'Book now (mobile)',
        buttonLabel: 'احجز الآن',
        variant: 'solid',
        href: '/booking',
        animation: 'left',
        delay: 1500,
        desktop: MOBILE_ONLY,
        mobile: {
          visibility: 'visible',
          anchor: 'mr',
          x: 43,
          y: -96,
          w: 104,
          h: 40,
          fontSize: 13,
          fontWeight: '300',
        },
      },
      {
        type: 'button',
        label: 'Learn more (mobile)',
        buttonLabel: 'اعرف أكثر',
        variant: 'outline',
        href: '/wf',
        animation: 'left',
        delay: 1000,
        desktop: MOBILE_ONLY,
        mobile: {
          visibility: 'visible',
          anchor: 'mr',
          x: 41,
          y: -156,
          w: 106,
          h: 43,
          fontSize: 14,
          fontWeight: '300',
        },
      },
      {
        type: 'text',
        label: 'Subheading (mobile)',
        text: 'التظــليل الأعــلى عــزلاً للحـــرارة',
        animation: 'down',
        delay: 500,
        desktop: MOBILE_ONLY,
        mobile: {
          visibility: 'visible',
          anchor: 'ml',
          x: 9,
          y: -232,
          w: 305,
          fontSize: 15,
          lineHeight: 18,
          fontWeight: '300',
          letterSpacing: -0.375,
          align: 'right',
          color: MUTED,
        },
      },
      {
        type: 'image',
        label: 'Ultimate lockup (mobile)',
        imageKey: 'ultimate-logo2',
        animation: 'left',
        desktop: MOBILE_ONLY,
        mobile: { visibility: 'visible', anchor: 'mc', x: 17, y: -268, w: 278, h: 147 },
      },
    ],
  },

  {
    title: 'PPF — X-PRO',
    desktopHeight: 740,
    tabletHeight: 700,
    mobileHeight: 740,
    layers: [
      {
        type: 'image',
        label: 'PPF application',
        imageKey: 'ppf-car',
        imageAlt: 'حماية PPF',
        objectFit: 'cover',
        animation: 'left',
        desktop: { anchor: 'ml', x: 0, y: 0, w: 484, h: 740 },
        tablet: { anchor: 'ml', x: 0, y: 0, w: 458, h: 700 },
        mobile: { anchor: 'ml', x: 1, y: 167, w: 352, h: 406 },
      },
      {
        type: 'image',
        label: 'X-PRO logo',
        imageKey: 'xpro-logo',
        animation: 'down',
        desktop: { anchor: 'mr', x: 176, y: -219, w: 482, h: 220 },
        tablet: { anchor: 'mr', x: 62, y: -179, w: 438, h: 200 },
        mobile: { anchor: 'mr', x: 16, y: -277, w: 260, h: 118 },
      },
      {
        type: 'text',
        label: 'Heading',
        text: 'الحـــماية السميـــكة PPF',
        animation: 'up',
        delay: 500,
        desktop: {
          anchor: 'mc',
          x: 223,
          y: -93,
          w: 509,
          fontSize: 60,
          lineHeight: 72,
          fontWeight: '500',
          letterSpacing: -1,
          align: 'center',
          color: HEADING,
        },
        tablet: { anchor: 'mc', x: 223, y: -79, w: 381, fontSize: 40, lineHeight: 48 },
        mobile: {
          anchor: 'mc',
          x: -3,
          y: -235,
          w: 274,
          fontSize: 18,
          lineHeight: 23.4,
          fontWeight: '300',
          align: 'right',
          color: MUTED,
        },
      },
      {
        type: 'button',
        label: 'Book now',
        buttonLabel: 'احجز الآن',
        variant: 'solid',
        href: '/booking',
        animation: 'left',
        delay: 1500,
        desktop: { anchor: 'mc', x: 153, y: 150, w: 149, h: 40, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'mc', x: 147, y: 148, w: 143, h: 40 },
        mobile: { anchor: 'mr', x: 42, y: -123, w: 105, h: 35 },
      },
      {
        type: 'button',
        label: 'Learn more',
        buttonLabel: 'اعرف أكثر',
        variant: 'outline',
        href: '/ppf',
        animation: 'left',
        delay: 1000,
        desktop: { anchor: 'mr', x: 255, y: 150, w: 148, h: 44, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'mr', x: 141, y: 148, w: 143, h: 40 },
        mobile: { anchor: 'mr', x: 41, y: -171, w: 105, h: 37, fontSize: 12 },
      },
    ],
  },

  {
    title: 'Ceramic coating — CX',
    desktopHeight: 740,
    tabletHeight: 700,
    mobileHeight: 650,
    layers: [
      {
        type: 'image',
        label: 'Ceramic spray',
        imageKey: 'ceramic-car',
        objectFit: 'cover',
        imageAlt: 'سيراميك كواتينق',
        animation: 'left',
        desktop: { anchor: 'mr', x: 0, y: -384, w: 782, h: 1505 },
        tablet: { anchor: 'mr', x: 0, y: -341, w: 607, h: 1229 },
        mobile: { anchor: 'mr', x: 0, y: -78, w: 359, h: 722 },
      },
      {
        type: 'image',
        label: 'CX logo',
        imageKey: 'cx-logo',
        imageAlt: 'سيراميك كواتينق',
        animation: 'down',
        desktop: { anchor: 'ml', x: 114, y: -163, w: 360, h: 360 },
        tablet: { anchor: 'ml', x: 116, y: -181, w: 264, h: 264 },
        mobile: { anchor: 'mc', x: 0, y: -229, w: 167, h: 167 },
      },
      {
        type: 'text',
        label: 'Heading line 1',
        text: 'حـــافظ على بريقـــها',
        animation: 'up',
        desktop: {
          anchor: 'mc',
          x: -346,
          y: -36,
          w: 500,
          fontSize: 40,
          lineHeight: 48,
          fontWeight: '500',
          letterSpacing: -1,
          align: 'center',
          color: MUTED,
        },
        tablet: { anchor: 'mc', x: -264, y: -84, w: 448, fontSize: 30, lineHeight: 36 },
        mobile: { anchor: 'mc', x: 0, y: -166, w: 275, fontSize: 23, lineHeight: 29.9 },
      },
      {
        type: 'text',
        label: 'Heading line 2',
        text: 'مع طبـــقة الســـيراميك',
        animation: 'up',
        delay: 2000,
        desktop: {
          anchor: 'mc',
          x: -346,
          y: 18,
          w: 500,
          fontSize: 30,
          lineHeight: 36,
          fontWeight: '500',
          letterSpacing: -1,
          align: 'center',
          color: MUTED,
        },
        tablet: {
          anchor: 'mc',
          x: -264,
          y: -37,
          w: 448,
          fontSize: 20,
          lineHeight: 24,
          fontWeight: '300',
        },
        mobile: {
          anchor: 'mc',
          x: -1,
          y: -140,
          w: 275,
          fontSize: 15,
          lineHeight: 19.5,
          fontWeight: '300',
        },
      },
      {
        type: 'button',
        label: 'Book now',
        buttonLabel: 'احجز الآن',
        variant: 'solid',
        href: '/booking',
        animation: 'left',
        delay: 3000,
        desktop: { anchor: 'ml', x: 110, y: 223, w: 150, h: 40, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'ml', x: 77, y: 130, w: 150, h: 40 },
        mobile: { anchor: 'mc', x: 0, y: -14, w: 95, h: 32 },
      },
      {
        type: 'button',
        label: 'Learn more',
        buttonLabel: 'اعرف أكثر',
        variant: 'outline',
        href: '/ceramic',
        animation: 'left',
        delay: 2000,
        desktop: { anchor: 'ml', x: 273, y: 223, w: 150, h: 44, fontSize: 13, fontWeight: '300' },
        tablet: { anchor: 'mc', x: -201, y: 130, w: 150, h: 40 },
        mobile: { anchor: 'mc', x: 1, y: -68, w: 105, h: 37, fontSize: 12 },
      },
    ],
  },

  {
    title: 'Polishing (mobile)',
    desktopHeight: 740,
    tabletHeight: 700,
    mobileHeight: 740,
    hideOnDesktop: true,
    hideOnTablet: true,
    layers: [
      {
        type: 'image',
        label: 'Polishing',
        imageKey: 'polishing',
        imageAlt: 'polishing تلميع سيارات',
        objectFit: 'cover',
        animation: 'left',
        desktop: { anchor: 'ml', x: 0, y: -38, w: 360, h: 750 },
      },
      {
        type: 'button',
        label: 'Book now',
        buttonLabel: 'احجز الآن',
        variant: 'solid',
        href: '/booking',
        animation: 'left',
        delay: 1500,
        desktop: { anchor: 'mc', x: 0, y: 307, w: 120, h: 40, fontSize: 13, fontWeight: '300' },
      },
      {
        type: 'button',
        label: 'Learn more',
        buttonLabel: 'اعرف أكثر',
        variant: 'outline',
        href: '/polishing',
        newTab: true,
        animation: 'left',
        delay: 1000,
        desktop: { anchor: 'mc', x: 0, y: 246, w: 120, h: 43, fontSize: 13, fontWeight: '300' },
      },
      {
        type: 'image',
        label: 'Factory Finish lockup',
        imageKey: 'polish-logo',
        animation: 'down',
        delay: 100,
        desktop: { anchor: 'mc', x: 0, y: 103, w: 226, h: 108 },
      },
      {
        type: 'text',
        label: 'Heading',
        text: 'أعـد لـها بريقــها',
        animation: 'down',
        desktop: {
          anchor: 'mc',
          x: 22,
          y: 154,
          w: 144,
          fontSize: 20,
          lineHeight: 26,
          fontWeight: '500',
          align: 'right',
          color: MUTED,
        },
      },
      {
        type: 'text',
        label: 'Subheading',
        text: 'مــع خـــدمة إعــادة ألـــوان الوكــالة',
        animation: 'down',
        delay: 1000,
        desktop: {
          anchor: 'mc',
          x: -19,
          y: 185,
          w: 226,
          fontSize: 14,
          lineHeight: 18.2,
          fontWeight: '300',
          align: 'right',
          color: MUTED,
        },
      },
    ],
  },
]

export const navItems = [
  { label: 'الرئيسية', href: '/' },
  { label: 'العازل', href: '/wf' },
  { label: 'الحماية', href: '/ppf' },
  { label: 'السيراميك', href: '/ceramic' },
  { label: 'استعادة البريق', href: '/polishing' },
  { label: 'حــجز المــوعد', href: '/booking' },
  { label: 'الفروع', href: '/branches' },
  { label: 'أهدِ من تحب', href: '/gift' },
]

export const socialLinks: { platform: SocialPlatform; href: string }[] = [
  { platform: 'facebook', href: 'https://www.facebook.com/Drive7' },
  { platform: 'twitter', href: 'https://x.com/drive7sa' },
  { platform: 'instagram', href: 'https://www.instagram.com/drive7' },
  { platform: 'whatsapp', href: 'https://api.whatsapp.com/send?phone=966920000057' },
  { platform: 'snapchat', href: 'https://www.snapchat.com/@drive7' },
  { platform: 'tiktok', href: 'https://www.tiktok.com/@drive7.sa' },
]

export const footerLinks = [
  { label: 'سياسة الخصوصية', href: '/privacy-policy-2' },
  { label: 'تواصل معنا', href: 'https://api.whatsapp.com/send?phone=966920000057', newTab: true },
]

export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.319 19.604" role="img" aria-label="Drive7"><g transform="translate(-23.455)"><path d="M134.846,0h17.137s4.025,1.247,2.408,6.086L139.426,19.6h-7.5l16.278-14.81-8.315-.015-5.71-.045L134.853,0Z" fill="#e92629"/><path d="M131.1,4.591,131.829,0H114.916a3.4,3.4,0,0,0-3.092,2.908L109.172,19.6H128.71l.724-4.583H115.152l.46-2.915H129.9l.73-4.583H116.343l.467-2.923H131.1Z" fill="#7e7f7f"/><path d="M109.659,0,97.948,19.6h-8.1L84.35,0h5.859l4.316,15.591L102.6,2.014C103.272.932,104.017,0,105.153,0Z" fill="#7e7f7f"/><path d="M82.219,0,79.107,19.6h-5.25L76.5,2.938V2.915A3.412,3.412,0,0,1,79.594,0Z" fill="#7e7f7f"/><path d="M70.7,0H55A3.394,3.394,0,0,0,51.91,2.893L49.251,19.6h5.257l.825-5.215h8.626L65.421,19.6h5.8L69.7,14.134a4.958,4.958,0,0,0,2.983-3.787l.541-3.374.46-2.923C74.046,1.818,72.714,0,70.7,0ZM68.018,6.7l-.156.954v.015A2.473,2.473,0,0,1,65.61,9.806H56.064l.825-5.215h9.539A1.7,1.7,0,0,1,68.012,6.7Z" fill="#7e7f7f"/><path d="M44.942,0H29.192A3.392,3.392,0,0,0,26.1,2.923L23.455,19.6H41.837c2.645,0,5.175-2.382,5.642-5.327l.751-4.764.67-4.178C49.367,2.389,47.594,0,44.942,0ZM43.312,7.4l-.284,1.773-.48,3.028A3.266,3.266,0,0,1,39.57,15.02H29.429L31.08,4.6H41.221A2.236,2.236,0,0,1,43.3,7.409Z" fill="#7e7f7f"/></g></svg>`

/** seed asset filename → key used by `imageKey` above */
export const MEDIA_FILES: Record<string, { file: string; alt: string }> = {
  'hero-wf': {
    file: 'hero-wf.jpg',
    alt: 'التظليل الحراري من Drive7',
  },
  ultimate: { file: 'ultimate.png', alt: 'Ultimate Window Film' },
  ffff: { file: 'ffff.jpg', alt: 'استعادة بريق السيارة' },
  'polish-logo': { file: 'polsih-logo.png', alt: 'Drive7 Factory Finish' },
  'ultimate-logo2': { file: 'ultimate-logo2.png', alt: 'Ultimate Window Film' },
  'wf-audi-before': { file: 'wf-audi-before.jpg', alt: 'قبل التظليل' },
  'wf-audi-after': { file: 'wf-audi-after.jpg', alt: 'بعد التظليل' },
  'xpro-logo': { file: 'xpro-logo.png', alt: 'X-PRO Paint Protection Film' },
  'cx-logo': { file: 'CX-logo.png', alt: 'CX Ceramic Coating' },
  polishing: { file: 'polishing-تلميع-سيارات.jpg', alt: 'polishing تلميع سيارات' },
  'ppf-car': { file: 'ppf-application.jpg', alt: 'حماية PPF' },
  'ceramic-car': { file: 'ceramic-coating.jpg', alt: 'سيراميك كواتينق' },
}
