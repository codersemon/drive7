import type { Block } from 'payload'

import { canvasLayers } from '@/fields/canvasLayer'

/**
 * A fixed-ratio design canvas with absolutely positioned layers — the building
 * block every homepage section is made of. Mirrors the authoring model of the
 * original site: layers are placed against one of nine anchor origins and the
 * whole canvas scales with the container.
 */
export const CanvasSection: Block = {
  slug: 'canvasSection',
  interfaceName: 'CanvasSectionBlock',
  labels: { singular: 'Canvas Section', plural: 'Canvas Sections' },
  admin: {
    components: {
      Label: '@/components/admin/SectionRowLabel#SectionRowLabel',
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section name',
          admin: { width: '50%', description: 'Admin only.' },
        },
        {
          name: 'background',
          type: 'text',
          label: 'Background colour',
          admin: {
            width: '50%',
            placeholder: 'transparent / #000000',
            condition: (data?: Partial<{ showDesignControls: boolean }>) =>
              Boolean(data?.showDesignControls),
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Canvas size & visibility',
      admin: {
        initCollapsed: true,
        condition: (data?: Partial<{ showDesignControls: boolean }>) =>
          Boolean(data?.showDesignControls),
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'desktopHeight',
              type: 'number',
              defaultValue: 740,
              required: true,
              admin: { width: '33%' },
            },
            {
              name: 'tabletHeight',
              type: 'number',
              defaultValue: 700,
              required: true,
              admin: { width: '33%' },
            },
            {
              name: 'mobileHeight',
              type: 'number',
              defaultValue: 740,
              required: true,
              admin: { width: '33%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'hideOnDesktop',
              type: 'checkbox',
              defaultValue: false,
              admin: { width: '33%' },
            },
            {
              name: 'hideOnTablet',
              type: 'checkbox',
              defaultValue: false,
              admin: { width: '33%' },
            },
            {
              name: 'hideOnMobile',
              type: 'checkbox',
              defaultValue: false,
              admin: { width: '33%' },
            },
          ],
        },
        {
          name: 'fullBleed',
          type: 'checkbox',
          label: 'Full bleed (ignore the 1280px container)',
          defaultValue: false,
        },
      ],
    },
    canvasLayers,
  ],
}
