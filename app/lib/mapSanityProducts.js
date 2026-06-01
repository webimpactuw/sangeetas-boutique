import { urlForImage } from '../../sanity/lib/image'

function imageUrl(img, width = 1200) {
  if (!img?.asset) return null
  return urlForImage(img).width(width).quality(85).auto('format').url()
}

/**
 * @param {import('@sanity/client').SanityDocument[]} rows
 */
export function mapSanityProducts(rows) {
  if (!rows?.length) return []

  return rows
    .filter((p) => p.published !== false && p.slug?.current)
    .map((p) => {
      const main = imageUrl(p.mainImage, 1000)
      if (!main) return null

      const extras = (p.gallery ?? [])
        .map((img) => imageUrl(img, 1200))
        .filter(Boolean)

      return {
        id: p.slug.current,
        name: p.name,
        price: Number(p.price) || 0,
        image: main,
        images: extras.length ? [main, ...extras] : [main],
        category: p.category,
        department: p.department === 'accessories' ? 'accessories' : 'apparel',
        fabric: p.fabric || undefined,
        colors: p.colors?.length ? p.colors : ['One size'],
        sizes: p.sizes?.length ? p.sizes : ['One size'],
        description:
          p.description?.trim() ||
          "Handcrafted piece from Sanji's Label. Contact us for sizing and availability.",
      }
    })
    .filter(Boolean)
}

/**
 * @param {import('@sanity/client').SanityDocument | null} doc
 * @param {string[]} fallbackUrls
 */
export function mapGalleryPage(doc, fallbackUrls = []) {
  const photos = (doc?.photos ?? [])
    .map((ph, i) => {
      const src = imageUrl(ph, 1400)
      if (!src) return null
      return {
        src,
        alt: ph.alt?.trim() || `Gallery photo ${i + 1}`,
      }
    })
    .filter(Boolean)

  if (photos.length) {
    return {
      title: doc?.title?.trim() || 'Gallery',
      intro: doc?.intro?.trim() || '',
      images: photos,
    }
  }

  return {
    title: 'Gallery',
    intro: '',
    images: fallbackUrls.map((src, i) => ({
      src,
      alt: `Gallery photo ${i + 1}`,
    })),
  }
}
