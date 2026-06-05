import { defineArrayMember, defineField, defineType } from 'sanity'

const imageAlt = defineField({
  name: 'alt',
  title: 'Describe the photo',
  type: 'string',
})

export default defineType({
  name: 'galleryPage',
  title: 'Gallery photos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      initialValue: 'Gallery',
    }),
    defineField({
      name: 'intro',
      title: 'Short intro text',
      type: 'text',
      rows: 3,
      initialValue:
        "Explore Sanji's signature designs, where timeless craftsmanship meets refined detail and modern elegance.",
    }),
    defineField({
      name: 'photos',
      title: 'Gallery photos',
      type: 'array',
      description: 'Drag to reorder. Newest looks can go first.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [imageAlt],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Gallery page' }
    },
  },
})
