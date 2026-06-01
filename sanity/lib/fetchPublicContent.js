import { cache } from 'react'

import { client } from './client'
import {
  GALLERY_PAGE_QUERY,
  HOME_PAGE_QUERY,
  PRODUCTS_QUERY,
  SITE_SETTINGS_QUERY,
} from './queries.js'

export const getSiteSettings = cache(async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY)
})

export const getHomePage = cache(async function getHomePage() {
  return client.fetch(HOME_PAGE_QUERY)
})

export const getSanityProducts = cache(async function getSanityProducts() {
  return client.fetch(PRODUCTS_QUERY)
})

export const getGalleryPage = cache(async function getGalleryPage() {
  return client.fetch(GALLERY_PAGE_QUERY)
})
