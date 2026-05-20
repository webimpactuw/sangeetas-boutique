import { defineArrayMember, defineField, defineType } from 'sanity'

import { getSanitySiteSettingsInitialValue } from '../../app/lib/contentDefaults.js'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  initialValue: () => getSanitySiteSettingsInitialValue(),
  groups: [
    { name: 'banner', title: 'Top sale bar', default: true },
    { name: 'seo', title: 'Browser & Google' },
    { name: 'nav', title: 'Navigation bar' },
    { name: 'footer', title: 'Footer' },
    { name: 'help', title: 'Help bubble' },
  ],
  fields: [
    defineField({
      name: 'topBannerPrefix',
      title: 'Text before the promo code',
      type: 'string',
      group: 'banner',
      description:
        'Example: “Get 25% off when you use code:” — the code is entered separately on the right.',
    }),
    defineField({
      name: 'promoCode',
      title: 'Promo code',
      type: 'string',
      group: 'banner',
      description: 'Shown in bold after the text above (e.g. SANJI30).',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site title (browser tab)',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.required(),
      description: 'Appears in the browser tab and when the site is shared.',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Short description for Google',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'One or two sentences. Used for search results.',
    }),
    defineField({
      name: 'navbarShipToLine',
      title: '“Ship to” line (desktop)',
      type: 'string',
      group: 'nav',
      description:
        'Shown on the left under the white banner (e.g. Ship To: Issaquah, WA).',
    }),
    defineField({
      name: 'footerPhone',
      title: 'Phone number',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerEmail',
      title: 'Email',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerHours',
      title: 'Shop hours',
      type: 'array',
      group: 'footer',
      description: 'Add a row for each line (e.g. Mon–Fri / 9AM–8PM).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'hoursRow',
          fields: [
            defineField({
              name: 'label',
              title: 'Days',
              type: 'string',
              description: 'Left column, e.g. Mon – Fri',
            }),
            defineField({
              name: 'time',
              title: 'Hours',
              type: 'string',
              description: 'Right column, e.g. 9AM – 8PM',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Quick links (footer column)',
      type: 'array',
      group: 'footer',
      description: 'Links in the first footer column — label and where it goes.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Link text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL path',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Starts with / — e.g. /apparel',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerPolicies',
      title: 'Policy links',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'policyLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Link text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL path',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'copyrightLine',
      title: 'Copyright line',
      type: 'string',
      group: 'footer',
      description: 'Small text at the very bottom of the site.',
    }),
    defineField({
      name: 'helpTitle',
      title: 'First line',
      type: 'string',
      group: 'help',
      description: 'Floating help box in the corner.',
    }),
    defineField({
      name: 'helpCtaLabel',
      title: 'Link text',
      type: 'string',
      group: 'help',
    }),
    defineField({
      name: 'helpEmail',
      title: 'Email address',
      type: 'string',
      group: 'help',
      description: 'Where the link sends customers.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' }
    },
  },
})
