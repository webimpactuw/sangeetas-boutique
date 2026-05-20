import { createImageUrlBuilder } from '@sanity/image-url'

import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * @param {import('@sanity/image-url').SanityImageSource} source
 */
export function urlForImage(source) {
  return builder.image(source)
}
