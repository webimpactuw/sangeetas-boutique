import { cache } from 'react'

import { client } from './client'
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from './queries.js'

export const getSiteSettings = cache(async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY)
})

export const getHomePage = cache(async function getHomePage() {
  return client.fetch(HOME_PAGE_QUERY)
})
