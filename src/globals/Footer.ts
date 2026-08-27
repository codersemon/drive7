import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateGlobal } from '@/hooks/revalidatePage'

const SOCIAL_PLATFORMS = [
  'facebook',
  'twitter',
  'instagram',
  'whatsapp',
  'snapchat',
  'tiktok',
  'youtube',
  'linkedin',
] as const

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Site' },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal('footer')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Social',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              labels: { singular: 'Social link', plural: 'Social links' },
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/SocialRowLabel#SocialRowLabel' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: SOCIAL_PLATFORMS.map((value) => ({
                        label: value[0].toUpperCase() + value.slice(1),
                        value,
                      })),
                      admin: { width: '40%' },
                    },
                    { name: 'href', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Links',
          fields: [
            {
              name: 'links',
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
            {
              name: 'separator',
              type: 'text',
              label: 'Separator between links',
              defaultValue: '|',
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
                  defaultValue: '#3D3D3D',
                  admin: { width: '33%' },
                },
                {
                  name: 'iconColor',
                  type: 'text',
                  defaultValue: '#FFFFFF',
                  admin: { width: '33%' },
                },
                {
                  name: 'linkColor',
                  type: 'text',
                  defaultValue: '#FFFFFF',
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'overlayColor',
                  type: 'text',
                  label: 'Overlay colour',
                  defaultValue: '#0A0D14',
                  admin: { width: '50%', description: 'Tint laid over the background colour.' },
                },
                {
                  name: 'overlayOpacity',
                  type: 'number',
                  label: 'Overlay opacity (0-1)',
                  defaultValue: 0.7,
                  admin: { width: '50%', step: 0.05 },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'iconBoxSize',
                  type: 'number',
                  label: 'Icon box (px)',
                  defaultValue: 32.4,
                  admin: { width: '33%' },
                },
                {
                  name: 'iconSize',
                  type: 'number',
                  label: 'Icon glyph (px)',
                  defaultValue: 18,
                  admin: { width: '33%' },
                },
                {
                  name: 'linkFontSize',
                  type: 'number',
                  label: 'Link font size (px)',
                  defaultValue: 18,
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Spacing',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'padTopDesktop',
                      type: 'number',
                      defaultValue: 120,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'padBottomDesktop',
                      type: 'number',
                      defaultValue: 160,
                      admin: {
                        width: '25%',
                        description: 'Space below the links (120 + 40 on the source site).',
                      },
                    },
                    {
                      name: 'sideOffsetDesktop',
                      type: 'number',
                      defaultValue: 120,
                      admin: {
                        width: '25%',
                        description: 'Inline offset applied to the centred block.',
                      },
                    },
                    {
                      name: 'gutterDesktop',
                      type: 'number',
                      label: 'Side gutter',
                      defaultValue: 80,
                      admin: { width: '25%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'padTopTablet',
                      type: 'number',
                      defaultValue: 60,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'padBottomTablet',
                      type: 'number',
                      defaultValue: 80,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'sideOffsetTablet',
                      type: 'number',
                      defaultValue: 60,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'gutterTablet',
                      type: 'number',
                      label: 'Side gutter',
                      defaultValue: 20,
                      admin: { width: '25%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'padTopMobile',
                      type: 'number',
                      defaultValue: 60,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'padBottomMobile',
                      type: 'number',
                      defaultValue: 40,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'sideOffsetMobile',
                      type: 'number',
                      defaultValue: 0,
                      admin: { width: '25%' },
                    },
                    {
                      name: 'gutterMobile',
                      type: 'number',
                      label: 'Side gutter',
                      defaultValue: 20,
                      admin: { width: '25%' },
                    },
                  ],
                },
                {
                  name: 'linksMarginTop',
                  type: 'number',
                  label: 'Space between icons and links (px)',
                  defaultValue: 15,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
