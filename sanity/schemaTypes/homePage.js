import { defineArrayMember, defineField, defineType } from 'sanity'

import { getSanityHomePageInitialValue } from '../../app/lib/contentDefaults.js'

const imageAltSubfield = defineField({
  name: 'alt',
  title: 'Describe the image for accessibility',
  type: 'string',
  description: 'Helps screen readers and Google understand the photo.',
})

export default defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  initialValue: () => getSanityHomePageInitialValue(),
  groups: [
    { name: 'hero', title: 'Hero carousel', default: true },
    { name: 'shop', title: 'Shop by category' },
    { name: 'elegance', title: 'Tagline strip' },
    { name: 'craft', title: 'Craftsmanship' },
    { name: 'reviews', title: 'Reviews' },
    { name: 'explore', title: 'Explore jewelry' },
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero slides',
      type: 'array',
      group: 'hero',
      description:
        'Large photos at the top of the home page — upload a photo for each slide (text below is pre-filled). Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'slide',
          fields: [
            defineField({
              name: 'title',
              title: 'Headline',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'cta',
              title: 'Button text',
              type: 'string',
              description: 'Usually SHOP NOW',
            }),
            defineField({
              name: 'href',
              title: 'Button link',
              type: 'string',
              description: 'Where the button goes. Use /apparel or #section — ask your developer if unsure.',
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [imageAltSubfield],
              description:
                'Upload so this slide appears on the site (otherwise the site falls back to default hero images).',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'photo' },
            prepare({ title, media }) {
              return { title: title || 'Slide', media }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'shopHeading',
      title: 'Section heading',
      type: 'string',
      group: 'shop',
      description: 'Large heading above the four category tiles.',
    }),
    defineField({
      name: 'shopCategories',
      title: 'Category cards',
      type: 'array',
      group: 'shop',
      description:
        'Four tiles on desktop — upload a photo per category (names and links are pre-filled).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'category',
          fields: [
            defineField({
              name: 'name',
              title: 'Name on the card',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link when they click',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [imageAltSubfield],
              description: 'Upload so this category uses your photo from Sanity (otherwise the site keeps the default picture).',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'photo' },
            prepare({ title, media }) {
              return { title: title || 'Category', media }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'eleganceWords',
      title: 'Three headline words',
      type: 'array',
      group: 'elegance',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.custom((words) => {
          if (!words?.length) return true
          if (words.length === 3) return true
          return 'Add exactly three words, or leave this empty to use the default.'
        }),
      description: 'Shown in a row with dots between them (e.g. ELEGANCE · BEAUTY · TRADITION). Leave empty to keep the default.',
    }),
    defineField({
      name: 'eleganceTagline',
      title: 'Paragraph under the words',
      type: 'text',
      rows: 3,
      group: 'elegance',
    }),
    defineField({
      name: 'craftsmanshipHeading',
      title: 'Heading',
      type: 'string',
      group: 'craft',
    }),
    defineField({
      name: 'craftsmanshipBody',
      title: 'Paragraph',
      type: 'text',
      rows: 4,
      group: 'craft',
    }),
    defineField({
      name: 'craftsmanshipCtaLabel',
      title: 'Button text',
      type: 'string',
      group: 'craft',
    }),
    defineField({
      name: 'craftsmanshipCtaHref',
      title: 'Button link',
      type: 'string',
      group: 'craft',
    }),
    defineField({
      name: 'craftsmanshipPhoto',
      title: 'Large photo',
      type: 'image',
      options: { hotspot: true },
      fields: [imageAltSubfield],
      group: 'craft',
      description: 'Leave empty only if you want the site to use the default photo.',
    }),
    defineField({
      name: 'reviewsHeading',
      title: 'Section heading',
      type: 'string',
      group: 'reviews',
    }),
    defineField({
      name: 'reviewsIntro',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      group: 'reviews',
    }),
    defineField({
      name: 'reviews',
      title: 'Quotes',
      type: 'array',
      group: 'reviews',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'review',
          fields: [
            defineField({
              name: 'name',
              title: 'Customer name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quote',
              title: 'What they said',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'exploreHeading',
      title: 'Heading',
      type: 'string',
      group: 'explore',
    }),
    defineField({
      name: 'exploreBody',
      title: 'Paragraph',
      type: 'text',
      rows: 4,
      group: 'explore',
    }),
    defineField({
      name: 'exploreCtaLabel',
      title: 'Button text',
      type: 'string',
      group: 'explore',
    }),
    defineField({
      name: 'exploreCtaHref',
      title: 'Button link',
      type: 'string',
      group: 'explore',
    }),
    defineField({
      name: 'explorePhotos',
      title: 'Photos (stacked on the right)',
      type: 'array',
      group: 'explore',
      description: 'Up to six images; three looks best on the current layout.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [imageAltSubfield],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home page' }
    },
  },
})
