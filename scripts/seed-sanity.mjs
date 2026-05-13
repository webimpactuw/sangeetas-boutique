/**
 * Uploads images from /public and creates the two singleton documents
 * (ids: siteSettings, homePage) with the same text and photos the site shipped with.
 *
 * Usage:
 *   1. Create an API token at https://www.sanity.io/manage → project → API → Tokens
 *      (Editor permissions, or Developer with write).
 *   2. Add to .env.local:
 *        SANITY_API_WRITE_TOKEN=sk...
 *        NEXT_PUBLIC_SANITY_PROJECT_ID=ybn5breb   (optional if default)
 *        NEXT_PUBLIC_SANITY_DATASET=production   (optional if default)
 *   3. Ensure image files exist under public/images/ (see REQUIRED_IMAGES).
 *   4. Run: npm run sanity:seed
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  DEFAULT_HERO_SLIDES,
  getSanityHomePageInitialValue,
  getSanitySiteSettingsInitialValue,
} from '../app/lib/contentDefaults.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function loadEnvFile(path) {
  if (!existsSync(path)) return
  const text = readFileSync(path, 'utf8')
  for (const line of text.split('\n')) {
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

const REQUIRED_IMAGES = [
  'images/hero-main.png',
  'images/product-lehenga.png',
  'images/product-dress.png',
  'images/product-sari.png',
  'images/product-kurta.png',
]

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'ybn5breb'
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

const apiVersion = '2025-05-01'

function publicPath(relative) {
  return join(root, 'public', relative)
}

async function uploadImage(client, relativePath) {
  const full = publicPath(relativePath)
  if (!existsSync(full)) {
    throw new Error(`Missing image file: ${full}`)
  }
  const body = createReadStream(full)
  return client.assets.upload('image', body, {
    filename: basename(full),
  })
}

function imageField(asset, alt) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: alt || undefined,
  }
}

async function main() {
  if (!token) {
    console.error(
      'Set SANITY_API_WRITE_TOKEN in .env.local (or export it), then run again.\n' +
        'Create a token at https://www.sanity.io/manage → your project → API → Tokens.',
    )
    process.exit(1)
  }

  for (const rel of REQUIRED_IMAGES) {
    if (!existsSync(publicPath(rel))) {
      console.error(
        `Missing ${rel} under public/. The seed script uploads your real product photos into Sanity.\n` +
          'Copy your images into public/images/ (same names as the live site) and run again.',
      )
      process.exit(1)
    }
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })

  console.log(`Seeding dataset "${dataset}" in project "${projectId}"…`)

  const cache = new Map()
  async function img(rel, alt) {
    const key = rel
    if (cache.has(key)) return cache.get(key)
    const asset = await uploadImage(client, rel)
    cache.set(key, asset)
    return asset
  }

  const heroMain = await img('images/hero-main.png', 'Spring Saris collection')
  const lehenga = await img('images/product-lehenga.png', 'Lehenga collection')
  const dress = await img('images/product-dress.png', 'Dresses collection')
  const sari = await img('images/product-sari.png', 'Sari and jewelry')
  const kurta = await img('images/product-kurta.png', 'Kids wear')

  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...getSanitySiteSettingsInitialValue(),
  }

  const explorePhotos = [
    { _key: 'ej1', ...imageField(sari, 'Jewelry collection piece 1') },
    { _key: 'ej2', ...imageField(lehenga, 'Jewelry collection piece 2') },
    { _key: 'ej3', ...imageField(dress, 'Jewelry collection piece 3') },
  ]

  const baseHome = getSanityHomePageInitialValue()
  const heroAssets = [heroMain, lehenga, dress]
  const categoryAssets = [lehenga, dress, sari, kurta]

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    ...baseHome,
    heroSlides: baseHome.heroSlides.map((slide, i) => ({
      ...slide,
      photo: imageField(heroAssets[i], DEFAULT_HERO_SLIDES[i]?.alt ?? slide.title),
    })),
    shopCategories: baseHome.shopCategories.map((cat, i) => ({
      ...cat,
      photo: imageField(categoryAssets[i], cat.name),
    })),
    craftsmanshipPhoto: imageField(sari, 'Handcrafted sari embroidery work'),
    explorePhotos,
  }

  await client.createOrReplace(siteSettings)
  await client.createOrReplace(homePage)

  console.log('Done. Published documents: siteSettings, homePage (with uploaded images).')
  console.log('Open /studio → Website → Home page to review and click Publish if needed.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
