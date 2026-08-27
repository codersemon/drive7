import type { ArrayField, Field, GroupField } from 'payload'

import { ANCHORS, ANCHOR_LABELS } from '@/lib/design'

const anchorOptions = ANCHORS.map((value) => ({ label: ANCHOR_LABELS[value], value }))

/**
 * Per-breakpoint placement. `desktop` is the base; `tablet` and `mobile`
 * inherit any value left blank. Coordinates are authored in design-width pixels
 * and scaled at render time (see lib/design.ts).
 */
const placement = (
  name: 'desktop' | 'tablet' | 'mobile',
  { base }: { base: boolean },
): GroupField => ({
  name,
  type: 'group',
  label: `${name[0].toUpperCase()}${name.slice(1)}`,
  admin: {
    description: base
      ? 'Base placement. Coordinates are in design pixels (canvas width 1280).'
      : 'Leave a field blank to inherit the desktop value.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'visibility',
          type: 'select',
          label: 'Visibility',
          options: base
            ? [
                { label: 'Visible', value: 'visible' },
                { label: 'Hidden', value: 'hidden' },
              ]
            : [
                { label: 'Inherit from desktop', value: 'inherit' },
                { label: 'Visible', value: 'visible' },
                { label: 'Hidden', value: 'hidden' },
              ],
          defaultValue: base ? 'visible' : 'inherit',
          admin: { width: '50%' },
        },
        {
          name: 'anchor',
          type: 'select',
          options: anchorOptions,
          ...(base ? { defaultValue: 'mc', required: true } : {}),
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'x',
          type: 'number',
          label: 'Offset X (px)',
          ...(base ? { defaultValue: 0 } : {}),
          admin: { width: '25%' },
        },
        {
          name: 'y',
          type: 'number',
          label: 'Offset Y (px)',
          ...(base ? { defaultValue: 0 } : {}),
          admin: { width: '25%' },
        },
        { name: 'w', type: 'number', label: 'Width (px)', admin: { width: '25%' } },
        { name: 'h', type: 'number', label: 'Height (px)', admin: { width: '25%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fontSize', type: 'number', label: 'Font size (px)', admin: { width: '25%' } },
        { name: 'lineHeight', type: 'number', label: 'Line height (px)', admin: { width: '25%' } },
        {
          name: 'fontWeight',
          type: 'select',
          label: 'Font weight',
          options: ['100', '200', '300', '400', '500', '600', '700', '900'].map((v) => ({
            label: v,
            value: v,
          })),
          admin: { width: '25%' },
        },
        {
          name: 'letterSpacing',
          type: 'number',
          label: 'Letter spacing (px)',
          admin: { width: '25%', step: 0.05 },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'align',
          type: 'select',
          label: 'Text align',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'color',
          type: 'text',
          label: 'Colour (hex/rgba)',
          admin: { width: '50%', placeholder: '#EBEBEB' },
        },
      ],
    },
  ],
})

/**
 * Layout controls stay hidden unless "Show layout & design controls" is ticked
 * on the page, so day-to-day editing is content only.
 */
const designMode = (data?: Partial<{ showDesignControls: boolean }>) =>
  Boolean(data?.showDesignControls)

const typeIs =
  (...types: string[]) =>
  ({ siblingData }: { siblingData?: Partial<{ type: string }> }) =>
    types.includes(siblingData?.type ?? '')

const contentFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    required: true,
    defaultValue: 'text',
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Image', value: 'image' },
      { label: 'Button', value: 'button' },
    ],
    admin: { width: '50%' },
  },
  {
    name: 'label',
    type: 'text',
    label: 'Admin label',
    admin: { width: '50%', description: 'Only used to identify this layer in the admin list.' },
  },
  {
    name: 'text',
    type: 'textarea',
    label: 'Text',
    admin: {
      condition: typeIs('text'),
      description: 'Line breaks are preserved.',
    },
  },
  {
    name: 'buttonLabel',
    type: 'text',
    label: 'Button label',
    admin: { condition: typeIs('button') },
  },
  {
    name: 'variant',
    type: 'select',
    label: 'Button style',
    defaultValue: 'solid',
    options: [
      { label: 'Solid (red)', value: 'solid' },
      { label: 'Outline', value: 'outline' },
    ],
    admin: { condition: typeIs('button') },
  },
  {
    name: 'href',
    type: 'text',
    label: 'Link',
    admin: { condition: typeIs('button', 'image', 'text') },
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Open in a new tab',
    defaultValue: false,
    admin: { condition: typeIs('button', 'image', 'text') },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
    admin: { condition: typeIs('image') },
  },
  {
    name: 'imageAlt',
    type: 'text',
    label: 'Alt text override',
    admin: { condition: typeIs('image') },
  },
  {
    name: 'objectFit',
    type: 'select',
    defaultValue: 'contain',
    options: [
      { label: 'Contain', value: 'contain' },
      { label: 'Cover', value: 'cover' },
      { label: 'Fill', value: 'fill' },
    ],
    admin: { condition: typeIs('image') },
  },
]

const animationFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'animation',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Fade in', value: 'fade' },
          { label: 'Slide up', value: 'up' },
          { label: 'Slide down', value: 'down' },
          { label: 'Slide from left', value: 'left' },
          { label: 'Slide from right', value: 'right' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'delay',
        type: 'number',
        label: 'Delay (ms)',
        defaultValue: 0,
        admin: { width: '50%' },
      },
    ],
  },
]

export const canvasLayers: ArrayField = {
  name: 'layers',
  type: 'array',
  label: 'Layers',
  labels: { singular: 'Layer', plural: 'Layers' },
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/components/admin/LayerRowLabel#LayerRowLabel',
    },
  },
  fields: [
    { type: 'row', fields: contentFields.slice(0, 2) },
    ...contentFields.slice(2),
    {
      type: 'collapsible',
      label: 'Placement & size',
      admin: { condition: designMode },
      fields: [
        placement('desktop', { base: true }),
        placement('tablet', { base: false }),
        placement('mobile', { base: false }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Animation',
      admin: { condition: designMode },
      fields: animationFields,
    },
  ],
}
