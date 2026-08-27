import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateGlobal } from '@/hooks/revalidatePage'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Site' },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal('site-settings')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'siteName',
                  type: 'text',
                  defaultValue: 'Drive7',
                  admin: { width: '50%' },
                },
                {
                  name: 'siteUrl',
                  type: 'text',
                  defaultValue: 'https://drive7.com',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'locale', type: 'text', defaultValue: 'ar', admin: { width: '50%' } },
                {
                  name: 'direction',
                  type: 'select',
                  defaultValue: 'rtl',
                  options: [
                    { label: 'Right to left', value: 'rtl' },
                    { label: 'Left to right', value: 'ltr' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'themeColor',
                  type: 'text',
                  defaultValue: '#000000',
                  admin: { width: '50%' },
                },
                {
                  name: 'bodyBackground',
                  type: 'text',
                  defaultValue: '#000000',
                  admin: { width: '50%' },
                },
              ],
            },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            { name: 'defaultTitle', type: 'text' },
            { name: 'titleTemplate', type: 'text', admin: { placeholder: '%s - Drive7' } },
            { name: 'defaultDescription', type: 'textarea' },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Floating button',
          fields: [
            { name: 'whatsappEnabled', type: 'checkbox', defaultValue: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'whatsappNumber',
                  type: 'text',
                  defaultValue: '966920000057',
                  admin: { width: '50%' },
                },
                {
                  name: 'whatsappColor',
                  type: 'text',
                  defaultValue: '#25D366',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'whatsappSize',
                  type: 'number',
                  defaultValue: 55,
                  admin: { width: '33%' },
                },
                {
                  name: 'whatsappIconSize',
                  type: 'number',
                  defaultValue: 35,
                  admin: { width: '33%' },
                },
                {
                  name: 'whatsappInset',
                  type: 'number',
                  label: 'Distance from the corner (px)',
                  defaultValue: 18,
                  admin: { width: '33%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            { name: 'gtmId', type: 'text', admin: { placeholder: 'GTM-XXXXXXX' } },
          ],
        },
      ],
    },
  ],
}
