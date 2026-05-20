import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { deskStructure } from './sanity/deskStructure.js'
import { schemaTypes } from './sanity/schemaTypes/index.js'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  name: 'default',
  title: "Sangeeta's Boutique",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ybn5breb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure: deskStructure }),
    ...(isDev ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
  },
})
