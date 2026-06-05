/**
 * Creates empty Studio singletons (siteSettings, homePage, galleryPage) if missing.
 * No image uploads — safe to run before sanity:seed.
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 * Usage: npm run sanity:init
 */

import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  getSanityHomePageInitialValue,
  getSanitySiteSettingsInitialValue,
} from '../app/lib/contentDefaults.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function loadEnvFile(path) {
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

loadEnvFile(join(root, '.env.local'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ybn5breb'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

const singletons = [
  {
    id: 'siteSettings',
    type: 'siteSettings',
    value: getSanitySiteSettingsInitialValue(),
  },
  {
    id: 'homePage',
    type: 'homePage',
    value: getSanityHomePageInitialValue(),
  },
  {
    id: 'galleryPage',
    type: 'galleryPage',
    value: {
      title: 'Gallery',
      intro:
        "Explore Sanji's signature designs, where timeless craftsmanship meets refined detail and modern elegance.",
      photos: [],
    },
  },
]

async function main() {
  if (!token) {
    console.error(
      'Add SANITY_API_WRITE_TOKEN to .env.local (Sanity → API → Tokens → Editor).\n' +
        'Then run: npm run sanity:init',
    )
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2025-05-01',
    token,
    useCdn: false,
  })

  console.log(`Initializing Studio documents in ${projectId}/${dataset}…`)

  for (const doc of singletons) {
    const existing = await client.getDocument(doc.id).catch(() => null)
    if (existing) {
      console.log(`  skip ${doc.id} (already exists)`)
      continue
    }
    await client.create({
      _id: doc.id,
      _type: doc.type,
      ...doc.value,
    })
    console.log(`  created ${doc.id}`)
  }

  console.log('\nDone. Open /studio → Start here, then add products.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
