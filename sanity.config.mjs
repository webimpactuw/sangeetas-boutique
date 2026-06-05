import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { deskStructure } from './sanity/deskStructure.js'
import { schemaTypes } from './sanity/schemaTypes/index.js'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  name: 'default',
  title: "Sanji's Label — Website Editor",
  subtitle: 'Publish when done — changes appear on the live site in ~1 minute',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ybn5breb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure: deskStructure }),
    ...(isDev ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((t) => t.schemaType !== 'product'),
      {
        id: 'product-apparel',
        title: 'New apparel item',
        schemaType: 'product',
        value: {
          department: 'apparel',
          category: 'lehengas',
          published: true,
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: ['Blue', 'Red', 'Green', 'Cream'],
        },
      },
      {
        id: 'product-accessory',
        title: 'New jewelry / accessory',
        schemaType: 'product',
        value: {
          department: 'accessories',
          category: 'jewelry',
          published: true,
        },
      },
    ],
  },
})
