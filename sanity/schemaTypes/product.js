import { defineArrayMember, defineField, defineType } from 'sanity'

import {
  SANITY_ACCESSORY_CATEGORY_OPTIONS,
  SANITY_APPAREL_CATEGORY_OPTIONS,
} from '../../app/lib/categories.js'
import CategoryInput from '../components/CategoryInput.jsx'

const imageAlt = defineField({
  name: 'alt',
  title: 'Describe the photo (for accessibility)',
  type: 'string',
})

export default defineType({
  name: 'product',
  title: 'Shop item',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'photos', title: 'Photos' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required().max(120),
      description: 'What customers see on the product card (e.g. “Gold silk lehenga”).',
    }),
    defineField({
      name: 'slug',
      title: 'Web address name',
      type: 'slug',
      group: 'basics',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Click “Generate” — used in the product link.',
    }),
    defineField({
      name: 'department',
      title: 'Shop section',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'Apparel', value: 'apparel' },
          { title: 'Accessories', value: 'accessories' },
        ],
        layout: 'radio',
      },
      initialValue: 'apparel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basics',
      description:
        'Pick the type that matches how you organize pieces (Lehengas, Sarees, Indo-Western, Readymade Sarees, or jewelry).',
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const dept = context.document?.department
          const apparelIds = SANITY_APPAREL_CATEGORY_OPTIONS.map((o) => o.value)
          const accessoryIds = SANITY_ACCESSORY_CATEGORY_OPTIONS.map((o) => o.value)
          if (dept === 'apparel' && !apparelIds.includes(value)) {
            return 'Choose an apparel category'
          }
          if (dept === 'accessories' && !accessoryIds.includes(value)) {
            return 'Choose an accessories category'
          }
          return true
        }),
      options: {
        layout: 'dropdown',
      },
      components: {
        input: CategoryInput,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      group: 'basics',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'published',
      title: 'Show on website',
      type: 'boolean',
      group: 'basics',
      initialValue: true,
      description: 'Turn off to hide while you are still adding photos or details.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main photo',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      fields: [imageAlt],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Extra photos (optional)',
      type: 'array',
      group: 'photos',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [imageAlt],
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'details',
    }),
    defineField({
      name: 'fabric',
      title: 'Fabric',
      type: 'string',
      group: 'details',
      options: {
        list: ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen', 'Other'],
      },
    }),
    defineField({
      name: 'colors',
      title: 'Available colors',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'sizes',
      title: 'Available sizes',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Examples: XS, S, M, L, XL, or Free size',
    }),
  ],
  orderings: [
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: published === false ? `${title} (hidden)` : title,
        subtitle,
        media,
      }
    },
  },
})
