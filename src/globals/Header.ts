import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateGlobal } from '@/hooks/revalidatePage'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Site' },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal('header')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'SVG or PNG. Falls back to the inline SVG below when empty.' },
            },
            {
              name: 'logoSvg',
              type: 'textarea',
              label: 'Inline SVG',
              admin: {
                rows: 6,
                description:
                  'Used when no logo image is set. Must include a viewBox; width/height are applied from the fields below.',
              },
            },
            {
              type: 'row',
              fields: [
                { name: 'logoHref', type: 'text', defaultValue: '/', admin: { width: '25%' } },
                {
                  name: 'logoWidthDesktop',
                  type: 'number',
                  label: 'Logo width — desktop',
                  defaultValue: 186,
                  admin: { width: '25%' },
                },
                {
                  name: 'logoWidthTablet',
                  type: 'number',
                  label: 'Logo width — tablet',
                  defaultValue: 186,
                  admin: { width: '25%' },
                },
                {
                  name: 'logoWidthMobile',
                  type: 'number',
                  label: 'Logo width — mobile',
                  defaultValue: 119,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logoOffsetYDesktop',
                  type: 'number',
                  label: 'Logo vertical nudge — desktop (px)',
                  defaultValue: -4,
                  admin: { width: '33%' },
                },
                {
                  name: 'logoOffsetYWidescreen',
                  type: 'number',
                  label: 'Logo vertical nudge — widescreen (px)',
                  defaultValue: -1,
                  admin: { width: '33%' },
                },
                {
                  name: 'logoOffsetYMobile',
                  type: 'number',
                  label: 'Logo vertical nudge — mobile (px)',
                  defaultValue: -2,
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logoMarginLeftWidescreen',
                  type: 'number',
                  label: 'Logo margin left — widescreen (px)',
                  defaultValue: 46,
                  admin: {
                    width: '50%',
                    description: 'Extra space the source site adds around the logo above 1760px.',
                  },
                },
                {
                  name: 'logoMarginRightWidescreen',
                  type: 'number',
                  label: 'Logo margin right — widescreen (px)',
                  defaultValue: 136,
                  admin: { width: '50%' },
                },
                {
                  name: 'navShiftWidescreen',
                  type: 'number',
                  label: 'Menu horizontal nudge — widescreen (px)',
                  defaultValue: 178,
                  admin: { description: 'Positive moves the menu right.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/NavRowLabel#NavRowLabel' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'href', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'newTab', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Style',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'background',
                  type: 'text',
                  defaultValue: '#000000',
                  admin: { width: '33%' },
                },
                {
                  name: 'linkColor',
                  type: 'text',
                  defaultValue: '#706E6E',
                  admin: { width: '33%' },
                },
                {
                  name: 'linkActiveColor',
                  type: 'text',
                  label: 'Link colour — hover / current page',
                  defaultValue: '#706E6E',
                  admin: {
                    width: '33%',
                    description: 'The source site uses the same colour, i.e. no hover effect.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'linkFontSize',
                  type: 'number',
                  label: 'Link font size (px)',
                  defaultValue: 20,
                  admin: { width: '25%' },
                },
                {
                  name: 'linkLineHeight',
                  type: 'number',
                  label: 'Link line height (px)',
                  defaultValue: 30,
                  admin: { width: '25%' },
                },
                {
                  name: 'linkPaddingX',
                  type: 'number',
                  label: 'Link padding X (px)',
                  defaultValue: 14,
                  admin: { width: '25%' },
                },
                {
                  name: 'linkPaddingY',
                  type: 'number',
                  label: 'Link padding Y (px)',
                  defaultValue: 13,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'navWidthPercent',
                  type: 'number',
                  label: 'Nav column width (% of viewport)',
                  defaultValue: 62.6,
                  admin: {
                    width: '50%',
                    description: 'The menu is centred inside this column, next to the logo.',
                  },
                },
                {
                  name: 'logoGap',
                  type: 'number',
                  label: 'Gap between menu and logo (px)',
                  defaultValue: 35,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heightWidescreen',
                  type: 'number',
                  label: 'Height — widescreen ≥1760px (px)',
                  defaultValue: 91.7,
                  admin: { width: '25%' },
                },
                {
                  name: 'heightDesktop',
                  type: 'number',
                  label: 'Height — desktop (px)',
                  defaultValue: 194.7,
                  admin: { width: '25%' },
                },
                {
                  name: 'heightTablet',
                  type: 'number',
                  label: 'Height — tablet (px)',
                  defaultValue: 194,
                  admin: { width: '25%' },
                },
                {
                  name: 'heightMobile',
                  type: 'number',
                  label: 'Height — mobile (px)',
                  defaultValue: 61,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              name: 'sticky',
              type: 'checkbox',
              label: 'Stick to the top on scroll',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
